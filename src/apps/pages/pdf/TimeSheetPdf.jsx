import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableColHeader1: {
    width: "35px",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableCol1: {
    width: "35px",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableColHeader: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableColHeaderDescription: {
    flex: 2.5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableColHeaderLast: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableCol: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableColDescription: {
    flex: 2.5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tableColLast: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

// Split data: 20 on first page, 26 afterwards
const paginateData = (data) => {
  const firstPage = data.slice(0, 20);
  const otherPages = [];

  for (let i = 20; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }

  return [firstPage, ...otherPages];
};

const TimeSheetPDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {pageIndex === 0 && (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                {`TimeSheet - ${filters.EmployeeID} (${filters.Month} - ${filters.Year})`}
              </Text>
            </View>
          )}

          {/* Table Header */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>SLNO</Text>
              <Text style={styles.tableColHeader}>CheckInDate</Text>
              <Text style={styles.tableColHeader}>Employee</Text>
              <Text style={styles.tableColHeader}>Project</Text>
              <Text style={styles.tableColHeader}>Function</Text>
              <Text style={styles.tableColHeaderDescription}>Description</Text>
              <Text style={styles.tableColHeaderLast}>Status</Text>
            </View>

            {/* Table Body */}
            {pageData.map((row, rowIndex) => {
              const isLast = rowIndex === pageData.length - 1;
              return (
                <View
                  key={rowIndex}
                  style={isLast ? styles.tableRowLast : styles.tableRow}
                >
                  <Text style={styles.tableCol1}>{row.SLNO}</Text>
                  <Text style={styles.tableCol}>{row.CheckInDate}</Text>
                  <Text style={styles.tableCol}>{row.EmployeeName}</Text>
                  <Text style={styles.tableCol}>{row.ProjectName}</Text>
                  <Text style={styles.tableCol}>{row.FuntionsName}</Text>
                  <Text style={styles.tableColDescription}>
                    {row.Description}
                  </Text>
                  <Text style={styles.tableColLast}>{row.Status}</Text>
                </View>
              );
            })}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default TimeSheetPDF;
