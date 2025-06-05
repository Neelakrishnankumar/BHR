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
  },headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
     marginBottom: 10
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
    width: 30,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    textAlign: "center",
  },
    tableCol1: {
    width: 30,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    textAlign: "right",
  },
  tableColHeader: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    textAlign: "center",
  },
  tableColHeaderLast: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    textAlign: "center",
  },
  tableCol: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
  },
  tableColLast: {
    flex: 1,
    padding: 5,
  },
});

// Split data: 20 on first page, 26 afterwards
const paginateData = (data) => {
  const firstPage = data.slice(0, 31);
  const otherPages = [];

  for (let i =31; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }

  return [firstPage, ...otherPages];
};

const AttendancePDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {pageIndex === 0 && (
          <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
          {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
          </Text>
        </View>
        
          )}

          {/* Table Header */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>S.NO</Text>
              <Text style={styles.tableColHeader}>Check In</Text>
              <Text style={styles.tableColHeader}>Check Out</Text>
              <Text style={styles.tableColHeader}>Hours Worked</Text>
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
                  <Text style={styles.tableCol}>{row.EmplyeeCheckInDateTime}</Text>
                  <Text style={styles.tableCol}>{row.EmplyeeCheckOutDateTime}</Text>
                  <Text style={styles.tableCol}>{row.NumberOfHoursWorked}</Text>
                  <Text style={styles.tableColLast}>{row.Status}</Text>
                </View>
              );
            })}
          </View>
          <View
                      fixed
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: 10,
                      }}
                    >
                      <Text>Page {pageIndex + 1} of {pages.length}</Text>
                    </View>
        </Page>
      ))}
    </Document>
  );
};

export default AttendancePDF;
