import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// function formatDate(date = new Date()) {
//   return date.toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }
function getFinancialYear(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth is 0-based

  // If month is Jan, Feb, or Mar → financial year belongs to previous year
  if (month <= 3) {
    return `${year - 1}-${String(year).slice(2)}`;
  } else {
    return `${year}-${String(year + 1).slice(2)}`;
  }
}
// Styles
const styles = StyleSheet.create({
  page: {
    // backgroundColor: "#f9f9f9ff",
    padding: 20,
    fontFamily: "Helvetica",
  },
  borderBox: {
    border: "3px solid #1E90FF",
    // border: "3px solid #000509",
    // padding: 20,
    height: "100%",
    width: "100%",
    position: "relative",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 70,
  },
  qr: {
    width: 80,
    height: 80,
  },
  brand: {
    fontSize: 18, // bigger font for Beyondexs
    fontWeight: "bold",
    marginTop: "20px",
  },
  tagline: {
    fontSize: 10, // smaller font for other text
  },
  tagline1: {
    fontSize: 10, // smaller font for other text
    marginTop: "5px",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "red",
    marginBottom: 20,
  },
  body: {
    textAlign: "center",
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
  },
  text1: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  approved: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  footerLeft: {
    fontSize: 12,
  },
  footerRight: {
    textAlign: "right",
  },
  skillLogo: {
    width: 100,
    height: 35,
    marginBottom: 5,
  },
  skillFooter: {
    width: "100%",
    height: 70,
  },
  signName: {
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: "20px",
  },
  signRole: {
    fontSize: 10,
    // marginLeft: "20px",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  // Address Footer
  addressBox: {
    marginTop: 20,
    textAlign: "center",
    // paddingHorizontal: 30,
  },
  addressText: {
    fontSize: 9,
    color: "#444",
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#595a5cff", // blue line
    marginVertical: 2,
    // width:300
  },
});

// const Certificate = ({ EmpName, AssessmentName, IssueDate}) => 
const Certificate = ({ EmpName, AssessmentName, IssueDate, baseurlUAAMS, HeaderImgS, FooterImgS, CompanySignatureS }) => {
    const QR_BASE_URL = `${baseurlUAAMS}/uploads/images/`;
  const headerPath = HeaderImgS
      ? `${QR_BASE_URL}${HeaderImgS}`
      : null;
  const footerPath = FooterImgS
      ? `${QR_BASE_URL}${FooterImgS}`
      : null;
  const CompanySignatures = CompanySignatureS
      ? `${QR_BASE_URL}${CompanySignatureS}`
      : null;
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.borderBox}>
          {/* Background watermark (worker silhouettes) */}
          <View style={styles.background}>
            <Image
              style={styles.bgImage}
              src="https://via.placeholder.com/1200x800.png?text=Background+Watermark" // Replace with faded silhouettes
            />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image
              style={{ width: 100, height: 80 }}
              // src="/Logo.png" // Replace with QR code
            src={headerPath} // Replace with QR code
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.brand}>Beyondexs</Text>
              <Text style={styles.tagline1}>Skill Development</Text>
              {/* <Text
                style={styles.tagline}
              >
                and development
              </Text> */}
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Certificate Of Assessment</Text>
          {/* <Text style={styles.subtitle}></Text> */}

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.text}>This is to certify that</Text>
            <Text style={styles.companyName}>{EmpName}</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#444", // blue line
                marginVertical: 1,
                // width:300
              }}
            />
            <Text style={styles.text1}>
              successfully completed and received a passing grade in
            </Text>
            <Text style={styles.approved}>{AssessmentName}</Text>
            {/* <Text style={styles.text}>
            conducted by Beyondex Solutions Pvt Ltd
          </Text>
          <Text style={styles.text}>for the financial year {getFinancialYear()}</Text> */}
            <Text style={styles.text}>
              conducted by{" "}
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Beyondex Solutions Pvt Ltd
              </Text>
            </Text>
            <Text style={styles.text}>
              for the financial year{" "}
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {getFinancialYear()}
              </Text>
            </Text>
          </View>

          {/* Footer (Date + Signature + Skill India) */}
          <View style={styles.footer}>
            {/* <Text style={styles.footerLeft}>Date of Issue: {formatDate(new Date())}</Text> */}
            <Text style={styles.footerLeft}>Date of Issue: {IssueDate}</Text>
            <View style={styles.footerRight}>
              <Image
                style={styles.skillLogo}
                // src="/ESIGN.png" // Replace with NSDC logo
              src={CompanySignatures} // Replace with NSDC logo
              />
              <Text style={styles.signName}>Govindaraj</Text>
              <Text style={styles.signRole}>Authorized Signature</Text>
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.addressBox}>
            {/* <Text style={styles.addressText}>
              Door#: 25/31, Lakshmi Nagar II Main Road, Porur, Chennai, Tamil Nadu
              - 600116
            </Text>
            <Text style={styles.addressText}>
              Website: https://beyondexs.com | Email: govee@beyondexs.com
            </Text> */}
            {/* <Text style={styles.addressText}>
            To verify NSDC training partner affiliation, visit www.nsdcindia.org/partner
          </Text> */}
           <Image
                style={styles.skillFooter}
                // src="/ESIGN.png" // Replace with NSDC logo
              src={footerPath} // Replace with NSDC logo
              />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
