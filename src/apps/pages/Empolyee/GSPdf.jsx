import React from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Times-Roman",
  },

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
  },

  header: {
    fontWeight: "bold",
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
  },

  center: {
    textAlign: "center",
  },
});

const GSPdf = () => {
  const rejectionList = [
    "Vial Washing Rejection",
    "Depyrogenation Tunnel Rejection",
    "After Depyrogenation Before Filling Rejection",
    "Filling Rejection",
    "Row by Row Rejection",
    "Lyophilizer Unloading Rejection",
    "Capping Rejection",
    "Visual Inspection Rejection",
    "QC Finished Product Sampling",
    "Labeling Rejection",
  ];

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>

            {/* Top Section */}
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={[styles.cell, { width: "35%" }]}>
                  <Text style={styles.bold}>Name of the Product</Text>
                </View>
                <View style={[styles.cell, { width: "30%" }]} />
                <View style={[styles.cell, { width: "5%" }]}>
                  <Text style={styles.center}>IP ☐</Text>
                </View>
                <View style={[styles.cell, { width: "5%" }]}>
                  <Text style={styles.center}>BP ☐</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.bold}>Batch No</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.cell, { width: "35%" }]}>
                  <Text style={styles.bold}>Manufacturing Date</Text>
                </View>
                <View style={[styles.cell, { width: "30%" }]} />
                <View style={[styles.cell, { width: "10%" }]} />
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.bold}>Expiry Date</Text>
                </View>
              </View>
            </View>

            {/* Main Table Header */}
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={[styles.cell, { width: "8%" }]}>
                  <Text style={[styles.header]}>S.No</Text>
                </View>
                <View style={[styles.cell, { width: "72%" }]}>
                  <Text style={styles.header}>Description</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]}>
                  <Text style={styles.header}>Number of Vials</Text>
                </View>
              </View>

              {/* Row 1 */}
              <View style={styles.row}>
                <View style={[styles.cell, { width: "8%" }]}>
                  <Text style={styles.center}>1</Text>
                </View>
                <View style={[styles.cell, { width: "72%" }]}>
                  <Text style={styles.bold}>
                    Total Number of Vials Received from Stores (A)
                  </Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]} />
              </View>

              {/* Rejection List */}
              {rejectionList.map((item, index) => (
                <View style={styles.row} key={index}>
                  <View style={[styles.cell, { width: "8%" }]}>
                    <Text style={styles.center}>
                      {index === 0 ? "2" : ""}
                    </Text>
                  </View>
                  <View style={[styles.cell, { width: "72%" }]}>
                    <Text>{item}</Text>
                  </View>
                  <View style={[styles.cell, { width: "20%" }]} />
                </View>
              ))}

              {/* Total Rejection */}
              <View style={styles.row}>
                <View style={[styles.cell, { width: "8%" }]} />
                <View style={[styles.cell, { width: "72%" }]}>
                  <Text style={styles.bold}>Total Rejections (B)</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]} />
              </View>

              {/* Continue Rows 3 - 10 */}
              {[
                "CDL + GMSD Samples",
                "Retention Samples",
                "Other Samples",
                "Total Samples (C)",
                "Total Rejections and QC Samples (D = B + C)",
                "Total Number of Vials Ready for Release as per Summary Protocol Total = (A) - (D)",
                "VVM Rejection",
                "Total Number of Vials after VVM Activity",
                "Packing Rejection",
                "Overall Rejection (E) = (D) + VVM Rejection + Packing Rejection",
                "Total Number of Vials Ready for Release = (A) - (E)",
              ].map((item, i) => (
                <View style={styles.row} key={i}>
                  <View style={[styles.cell, { width: "8%" }]}>
                    <Text style={styles.center}>
                      {i + 3 <= 10 ? i + 3 : ""}
                    </Text>
                  </View>
                  <View style={[styles.cell, { width: "72%" }]}>
                    <Text>{item}</Text>
                  </View>
                  <View style={[styles.cell, { width: "20%" }]} />
                </View>
              ))}
            </View>

            {/* Approval Section */}
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.header}>Description</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.header}>Prepared By</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.header}>Reviewed By (PD)</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.header}>Approved By (QA)</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.bold}>Name</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]} />
                <View style={[styles.cell, { width: "25%" }]} />
                <View style={[styles.cell, { width: "25%" }]} />
              </View>

              <View style={styles.row}>
                <View style={[styles.cell, { width: "25%" }]}>
                  <Text style={styles.bold}>Sign & Date</Text>
                </View>
                <View style={[styles.cell, { width: "25%" }]} />
                <View style={[styles.cell, { width: "25%" }]} />
                <View style={[styles.cell, { width: "25%" }]} />
              </View>
            </View>

          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default GSPdf;