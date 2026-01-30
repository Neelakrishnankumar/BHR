import { Page, Image, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    paddingTop: 90,
    paddingBottom: 80,
    paddingHorizontal: 20,
    fontSize: 10,
  },

  /* HEADER */
  headerWrapper: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  headerImage: {
    width: "100%",
    height: 60,
    objectFit: "contain",
  },

  titleContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* FOOTER */
  footerWrapper: {
    position: "absolute",
    bottom: 30,
    left: 5,
    right: 5,     // forces full width
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  footerImage: {
    width: "100%",
    height: 100,
    objectFit: "cover",
  },

  pageNumber: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
  },
  header: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  header1: {
    fontSize: 11,
    textAlign: "left",
    fontWeight: "bold",
    display: "block",
    marginTop: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  table1: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    textAlign: "end",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  headerCell: {
    padding: 5,
    backgroundColor: "#eee",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold",
  },
  headerCell1: {
    padding: 3,
    backgroundColor: "#eee",
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontWeight: "bold",
    fontSize: 9,
  },
  cell: {
    padding: 5,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  cell1: {
    padding: 5,
    textAlign: "left",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  cell2: {
    padding: 3,
    textAlign: "left",
    borderRightWidth: 1,
    borderColor: "#000",
    fontSize: 8,
  },
  cell3: {
    padding: 3,
    textAlign: "right",
    borderRightWidth: 1,
    borderColor: "#000",
    fontSize: 8,
  },
  cell4: {
    padding: 3,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    fontSize: 8,
  },

  // column widths
  colSlno: { width: "7%" },
  colEmp: { width: "36%" },
  colTime: { width: "15%" },
  colReason: { width: "27%" },
  colStatus: { width: "15%" },

  colSlno1: { width: "7%" },
  colEmp1: { width: "33%" },
  colTime1: { width: "20%" },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "grey",
  },
  summaryWrapper: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",   // moves table to right
  },

});

// Pagination – 20 rows per page
const paginateData = (data) => {
  const pages = [];
  for (let i = 0; i < data.length; i += 20) {
    pages.push(data.slice(i, i + 20));
  }
  return pages;
};

const LeaveEntryPdf = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);
  const QR_BASE_URL = `${filters?.Imageurl}/uploads/images/`;  // your image folder path
  // const QR_BASE_URL = "https://uaam.beyondexs.com/uploads/images/";
  const headerPath = filters?.HeaderImg
    ? `${QR_BASE_URL}${filters.HeaderImg}`
    : null;
  const footerPath = filters?.FooterImg
    ? `${QR_BASE_URL}${filters.FooterImg}`
    : null;

  const employeeSummary = Object.values(
    data.reduce((acc, row) => {
      if (!acc[row.EmployeeID]) {
        acc[row.EmployeeID] = {
          EmployeeID: row.EmployeeID,
          Employee: row.Employee,
          TotalLeave: Number(row.TotalLeaveDays || 0),
          LeavesTaken: Number(row.LeaveTakenDays || 0),
          BalanceLeave: Number(row.BalanceLeaveDays || 0),
        };
      }
      return acc;
    }, {})
  );

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page
          size="A4"
          orientation="portrait"
          style={styles.page}
          key={pageIndex}
        >
          <View fixed style={styles.headerWrapper}>
            {headerPath ? (
              <Image src={headerPath} style={styles.headerImage} />
            ) : (
              <View style={{ width: "100%", height: 60, backgroundColor: "#eee" }} />
            )}
          </View>
          {/* Header only on first page */}
          {pageIndex === 0 && (
            <>
              <Text style={styles.header}>Leave Report (From {filters.FromDate} to {filters.ToDate})</Text>
              {/* <Text style={styles.header1}>(Leave taken from {filters.FromDate} to {filters.ToDate})</Text> */}
            </>
          )}

          {/* Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.row}>
              <Text style={[styles.headerCell, styles.colSlno]}>SL#</Text>
              <Text style={[styles.headerCell, styles.colEmp]}>
                Employee
              </Text>
              <Text style={[styles.headerCell, styles.colReason]}>
                Leave Type
              </Text>
              <Text style={[styles.headerCell, styles.colTime]}>From</Text>
              <Text style={[styles.headerCell, styles.colTime]}>To</Text>
              <Text style={[styles.headerCell, styles.colStatus]}>Status</Text>
            </View>

            {/* Table Body */}
            {/* Table Body */}
            {pageData.map((row, index) => {
              const serialNo = pageIndex * 20 + index + 1;

              return (
                <View key={index} style={styles.row}>
                  <Text style={[styles.cell, styles.colSlno]}>{serialNo}</Text>
                  <Text style={[styles.cell1, styles.colEmp]}>
                    {row.Employee}
                  </Text>
                  <Text style={[styles.cell1, styles.colReason]}>
                    {row.LeaveName}
                  </Text>
                  <Text style={[styles.cell, styles.colTime]}>
                    {row.FromDate}
                  </Text>
                  <Text style={[styles.cell, styles.colTime]}>
                    {row.ToDate}
                  </Text>

                  <Text style={[styles.cell1, styles.colStatus]}>
                    {row.Status}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* <View style={styles.table1}>
            <View style={styles.row}>
              <Text style={[styles.headerCell1, styles.colSlno1]}>SL#</Text>
              <Text style={[styles.headerCell1, styles.colEmp1]}>Employee</Text>
              <Text style={[styles.headerCell1, styles.colTime1]}>Total</Text>
              <Text style={[styles.headerCell1, styles.colTime1]}>Taken</Text>
              <Text style={[styles.headerCell1, styles.colTime1]}>Balance</Text>
            </View>

            {employeeSummary.map((row, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.cell2, styles.colSlno1]}>{index + 1}</Text>
                <Text style={[styles.cell2, styles.colEmp1]}>
                  {row.Employee}
                </Text>
                <Text style={[styles.cell3, styles.colTime1]}>{row.TotalLeave}</Text>
                <Text style={[styles.cell3, styles.colTime1]}>{row.LeavesTaken}</Text>
                <Text style={[styles.cell3, styles.colTime1]}>{row.BalanceLeave}</Text>
              </View>
            ))}
          </View> */}
          {/* SUMMARY TABLE — ONLY ON LAST PAGE */}
          {pageIndex === pages.length - 1 && (
            <React.Fragment>
              <Text style={styles.header1}>Summary:</Text>
              <View style={styles.summaryWrapper}>
                <View style={styles.table1}>
                  {/* Summary Header */}
                  <View style={styles.row}>
                    <Text style={[styles.headerCell1, styles.colSlno1]}>SL#</Text>
                    <Text style={[styles.headerCell1, styles.colEmp1]}>Employee</Text>
                    <Text style={[styles.headerCell1, styles.colTime1]}>Total Leave</Text>
                    <Text style={[styles.headerCell1, styles.colTime1]}>Leave Taken</Text>
                    <Text style={[styles.headerCell1, styles.colTime1]}>Leave Balance</Text>
                  </View>

                  {/* Summary Rows */}
                  {employeeSummary.map((row, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={[styles.cell4, styles.colSlno1]}>{index + 1}</Text>
                      <Text style={[styles.cell2, styles.colEmp1]}>
                        {row.Employee}
                      </Text>
                      <Text style={[styles.cell3, styles.colTime1]}>{row.TotalLeave}</Text>
                      <Text style={[styles.cell3, styles.colTime1]}>{row.LeavesTaken}</Text>
                      <Text style={[styles.cell3, styles.colTime1]}>{row.BalanceLeave}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </React.Fragment>
          )}

          <View fixed style={styles.footerWrapper}>
            {footerPath ? (
              <Image src={footerPath} style={styles.footerImage} />
            ) : (
              <View style={{ width: "100%", height: 50, backgroundColor: "#eee" }} />
            )}
          </View>
          <Text
            style={styles.footer}
            fixed
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </Page>
      ))}
    </Document>
  );
};

export default LeaveEntryPdf;
