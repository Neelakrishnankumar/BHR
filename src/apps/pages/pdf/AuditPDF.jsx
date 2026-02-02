// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10,
//   },
//   section: {
//     marginBottom: 10,
//   }, 
//   headerContainer: {
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginTop: 20,
//   },
//   headerText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderStyle: "solid",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     borderBottomStyle: "solid",
//   },
//   tableRowLast: {
//     flexDirection: "row",
//   },
//   tableColHeader1: {
//     width: "9%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },
//   tableCol1: {
//     width: "7.3%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     textAlign: "right",
//   },
//   tableColHeader: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },
//   tableColHeader2: {
//     width: "35%",
//     // flex: 1,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },
//   tableColHeader3: {
//     width:"10%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },
//      tableColHeader4: {
//     width:"10%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//     },
//   tableColHeaderLast: {
  
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//      width: "15%",
//   },
//   tableCol: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },
//   tableCol2: {
//     width: "16.4%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },
//    tableCol3: {
//     width: "30%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },
//   tableColLast: {
//     padding: 5,
//     width: "15%",
//   },
// });

// // Split data: 20 on first page, 26 afterwards
// const paginateData = (data) => {
//   const firstPage = data.slice(0, 31);
//   const otherPages = [];

//   for (let i = 31; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };



// const AuditPDF = ({ data = [], filters = {} }) => {
//   const pages = paginateData(data);
//   const formattedDate = filters.Date
//     ? filters.Date.split("-").reverse().join("-")
//     : "";
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const includeName = !!filters.Date;

//   // Adjust column widths based on presence of Employee Name column
//   const colWidths = includeName
//     ? { col: "25%", col3: "10%", last: "15%" } // With Employee Name
//     : { col: "30%", col3: "15%", last: "20%" }; // Without Employee Name

//   const dynamicStyles = StyleSheet.create({
//     tableColHeader: {
//       width: colWidths.col,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableColHeader3: {
//       width: colWidths.col3,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableColHeader4: {
//       width: colWidths.col3,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableColHeaderLast: {
//       width: colWidths.last,
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableCol: {
//       width: colWidths.col,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//     },
//     tableCol3: {
//       width: colWidths.col3,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//     },
//     tableColLast: {
//       width: colWidths.last,
//       padding: 5,
//     },
//   });

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" style={styles.page} key={pageIndex}>
//           {pageIndex === 0 && (
//             <View style={styles.headerContainer}>
//               <Text style={styles.headerText}>
//                 {filters.Date
//                   ? `Audit Report - (${formattedDate})`
//                   : `Audit Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text>
//             </View>
//           )}

//           {/* Table Header */}
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableColHeader1}>S.No</Text>
//               {/* {includeName && ( */}
//                 <Text style={styles.tableColHeader}>Date</Text>
//               {/* )} */}
//               <Text style={dynamicStyles.tableColHeader}>Company</Text>
//               <Text style={dynamicStyles.tableColHeader}>Screen Name</Text>
//                <Text style={dynamicStyles.tableColHeader}>Name</Text>
//               <Text style={dynamicStyles.tableColHeader}>Activity</Text>
//               <Text style={dynamicStyles.tableColHeaderLast}>Module</Text>
//               {/* <Text style={dynamicStyles.tableColHeader3}>Name</Text>
//               <Text style={dynamicStyles.tableColHeader4}>Activity</Text>
//                <Text style={dynamicStyles.tableColHeaderLast}>Module</Text> */}
//             </View>

//             {/* Table Body */}
//             {pageData.map((row, rowIndex) => {
//               const isLast = rowIndex === pageData.length - 1;
//               return (
//                 <View
//                   key={rowIndex}
//                   style={isLast ? styles.tableRowLast : styles.tableRow}
//                 >
//                   <Text style={styles.tableCol1}>{row.SLNO}</Text>
//                   {/* {includeName && ( */}
//                     <Text style={styles.tableCol2}>{row.Date}</Text>
//                   {/* )} */}
//                   <Text style={styles.tableCol3}>
//                     {row.CompanyName}
//                   </Text>
//                   <Text style={styles.tableCol3}>
//                     {row.ScreenName}
//                   </Text>
//                   <Text style={styles.tableCol3}>
//                     {row.Name}
//                   </Text>
//                   <Text style={styles.tableCol3}>
//                     {row.Activity}
//                   </Text>
//                    <Text style={dynamicStyles.tableColLast}>
//                     {row.Module}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>

//           {/* Footer */}
//           <View
//             fixed
//             style={{
//               position: "absolute",
//               bottom: 10,
//               left: 0,
//               right: 0,
//               textAlign: "center",
//               fontSize: 10,
//             }}
//           >
//             <Text>
//               Page {pageIndex + 1} of {pages.length}
//             </Text>
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );
// };

// export default AuditPDF;


import React from "react";
import { Page, Text, View, Document, StyleSheet,Image } from "@react-pdf/renderer";

// ================= STYLES =================
const styles = StyleSheet.create({
  // page: { padding: 20, fontSize: 10 },
  page: {
    paddingTop: 80,
    paddingBottom: 70,
    paddingHorizontal: 20,
    fontSize: 9,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
    /* HEADER */
  headerWrapper: {
    position: "absolute",
    top: 15,
    left: 20,
    right: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 50,
    objectFit: "contain",
  },
    /* FOOTER */
  footerWrapper: {
    position: "absolute",
    bottom: 25,
    left: 5,
    right: 5,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  footerImage: {
    width: "100%",
    height: 60,
    objectFit: "cover",
  },

  // HEADER COLUMNS
  h_sno: { width: "5%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_date: { width: "12%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_company: { width: "18%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_screen: { width: "20%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_name: { width: "15%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_activity: { width: "15%", borderRightWidth: 1, padding: 5, fontWeight: "bold" },
  h_module: { width: "15%", padding: 5, fontWeight: "bold" },

  // BODY COLUMNS (MUST MATCH HEADER WIDTHS)
  c_sno: { width: "5%", borderRightWidth: 1, padding: 5 },
  c_date: { width: "12%", borderRightWidth: 1, padding: 5 },
  c_company: { width: "18%", borderRightWidth: 1, padding: 5, textWrap: "wrap" },
  c_screen: { width: "20%", borderRightWidth: 1, padding: 5, textWrap: "wrap" },
  c_name: { width: "15%", borderRightWidth: 1, padding: 5 },
  c_activity: { width: "15%", borderRightWidth: 1, padding: 5 },
  c_module: { width: "15%", padding: 5 },
});

// ================= PAGINATION =================
const paginateData = (data) => {


  const firstPage = data.slice(0, 31);
  const otherPages = [];
  for (let i = 31; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }
  return [firstPage, ...otherPages];
};

// ================= PDF COMPONENT =================
const AuditPDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);

  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
};
  const formatedfromDate = formatDate(filters.FromDate);
  const formatedtoDate = formatDate(filters.ToDate);

  console.log(formatedfromDate, formatedfromDate, "---filters formatedfromDate");
console.log(filters.HeaderImage,filters.FooterImage, "---HeaderImage FooterImage" );
  
  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>

          {/* HEADER */}
  <View fixed style={styles.headerWrapper}>
              {filters.HeaderImg && (
                <Image
                  src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                  // src="https://uaamuat.beyondexs.com/uploads/images/20260108_095454_bexlogo.jpg"
                  style={styles.headerImage}
                />
              )}
            </View>

          {pageIndex === 0 && (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
              {`Audit Report (From ${formatedfromDate} - To ${formatedtoDate})`}  
              </Text>
            </View>
          )}

          {/* TABLE */}
          <View style={styles.table}>

            {/* TABLE HEADER */}
            <View style={styles.tableRow}>
              <Text style={styles.h_sno}>S.No</Text>
              <Text style={styles.h_date}>Date</Text>
              <Text style={styles.h_company}>Company</Text>
              <Text style={styles.h_screen}>Screen Name</Text>
              <Text style={styles.h_name}>Name</Text>
              <Text style={styles.h_activity}>Activity</Text>
              <Text style={styles.h_module}>Module</Text>
            </View>

            {/* TABLE BODY */}
            {pageData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.c_sno}>{row.SLNO}</Text>
                <Text style={styles.c_date}>{row.Date}</Text>
                <Text style={styles.c_company}>{row.CompanyName}</Text>
                <Text style={styles.c_screen}>{row.ScreenName}</Text>
                <Text style={styles.c_name}>{row.Name}</Text>
                <Text style={styles.c_activity}>{row.Activity}</Text>
                <Text style={styles.c_module}>{row.Module}</Text>
              </View>
            ))}

          </View>
       {/* FOOTER */}
               <View fixed style={styles.footerWrapper}>
                 {filters.FooterImg && (
                   <Image
                     src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                     style={styles.footerImage}
                   />
                 )}
               </View>
          <View fixed style={{ position: "absolute", bottom: 10, width: "100%", textAlign: "center" }}>
            <Text>Page {pageIndex + 1} of {pages.length}</Text>
          </View>

        </Page>
      ))}
    </Document>
  );
};

export default AuditPDF;
