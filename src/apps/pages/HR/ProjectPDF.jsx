import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeaderSL: {
    width: "5%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 5,
    textAlign: "center",
  },
  tableColSL: {
    width: "5%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColHeader: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: { fontWeight: "bold", fontSize: 12, textAlign: "center" },
  tableCell: { fontSize: 10 },
  tableCell1: { fontSize: 10, textAlign: "right" },
  row: { flexDirection: "row", marginBottom: 8 },
  fieldGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    paddingRight: 20,
  },
  fieldGroupRight: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 20,
  },
  label: { fontSize: 12, fontWeight: "bold", width: "45%", paddingRight: 5 },
  colon: { width: "5%", fontSize: 12, textAlign: "center" },
  value: { fontSize: 12, width: "50%" },
  legendColumn:{
    flexDirection:"row",
    marginTop:"15px"
  },
  legend:{
    fontSize:"12px",
    fontWeight:"bold"
  }
});

const ProjectPDF = ({ data,UserName }) => {
  // const rows = Array.from({ length: 50 }).map((_, i) => ({
  //   sl: i + 1,
  //   name: "Neela Krishnan",
  //   estHours: "30.00000",
  //   estCost: "25.00000",
  //   actHours: "22.00000",
  //   actCost: "25.00000",
  // }));
  const header = data?.HeaderData || {};
  const rows = header.DetailData || [];
 const userName = UserName.toUpperCase() || "Admin"
const issueDate = new Date().toLocaleDateString("en-GB");

  const rowsPerPage = 15;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const pages = Array.from({ length: totalPages }).map((_, pageIndex) =>
    rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
  );

  return (
    <Document>
      {pages.map((pageRows, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          orientation="landscape"
          style={styles.page}
          wrap
        >
          <Text style={styles.header}>
            {header?.projectname} - Costing Report
          </Text>

          {/* Budget / Project Cost */}
          <View style={styles.row}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Budget</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{header?.budget}</Text>
            </View>
            <View style={styles.fieldGroupRight}>
              <Text style={styles.label}>Actual Cost</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{header?.actualcost}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Scheduled Cost</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{header?.schedulecost}</Text>
            </View>

            <View style={styles.fieldGroupRight}>
              <Text style={styles.label}>Other Expenses</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{header?.otherexpenses}</Text>
            </View>
          </View>

<View style={styles.legendColumn}>
<Text style={styles.legend}>Est - Esitmated || Act - Actual </Text>
</View>

          {/* Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow} fixed>
              <View style={styles.tableColHeaderSL}>
                <Text style={styles.tableCellHeader}>SL#</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "45%" }]}>
                <Text style={styles.tableCellHeader}>Employee Name</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Est Hours</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "15%" }]}>
                <Text style={styles.tableCellHeader}>Est Hours Cost</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Act Hours</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "15%" }]}>
                <Text style={styles.tableCellHeader}>Act Hours Cost</Text>
              </View>
            </View>

            {/* Table Rows */}
            {pageRows.map((row) => (
              <View style={styles.tableRow} key={row.sl}>
                <View style={styles.tableColSL}>
                  <Text style={styles.tableCell1}>{row.slno}</Text>
                </View>
                <View style={[styles.tableCol, { width: "45%" }]}>
                  <Text style={styles.tableCell}>{row.empname}</Text>
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.estimatehours}</Text>
                </View>
                <View style={[styles.tableCol, { width: "15%" }]}>
                  <Text style={styles.tableCell1}>{row.estimatecosting}</Text>
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.actualhours}</Text>
                </View>
                <View style={[styles.tableCol, { width: "15%" }]}>
                  <Text style={styles.tableCell1}>{row.actualcosting}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Footer */}
          {/* <Text style={styles.footer}>
            Page {pageIndex + 1} of {totalPages}
          </Text> */}
          {/* Footer */}
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 10,
              color: "grey",
            }}
          >
            <Text>Issue Date: {issueDate}</Text>
            <Text>
              Page {pageIndex + 1} of {totalPages}
            </Text>
            <Text>Prepared by: {userName}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default ProjectPDF;
