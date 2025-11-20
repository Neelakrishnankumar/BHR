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
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeaderSL: {
    width: "5%",
    borderColor:"#000",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#f0f0f0",
    padding: 5,
    textAlign: "center",
  },
  tableColSL: {
    width: "5%",
    borderWidth: 1,
    borderLeftWidth: 1,
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
  tableCell2: { fontSize: 10, textAlign:"center"},
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
  legendColumn: {
    flexDirection: "column",
    marginTop: "15px",
  },
  legend: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  headerTable: {
    display: "table",
    width: "100%",
    marginTop: 10,
  },

  headerRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
  },
  headerRow1: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    borderLeft: "1px solid #000",
    borderTop: "1px solid #000",
    borderRight: "1px solid #000",
  },

  headerCellLabel: {
    width: "25%",
    padding: 6,
    borderRight: "1px solid #000",
    fontSize: 12,
    fontWeight: "bold",
  },

  headerCellValue: {
    width: "75%",
    padding: 6,
    fontSize: 12,
  },
});

const OrderHeaderPdf = ({ data, UserName }) => {
  // const rows = Array.from({ length: 50 }).map((_, i) => ({
  //   sl: i + 1,
  //   name: "Neela Krishnan",
  //   estHours: "30.00000",
  //   estCost: "25.00000",
  //   actHours: "22.00000",
  //   actCost: "25.00000",
  // }));
  //   const header = data?.HeaderData || {};
  //   const rows = header.DetailData || [];
  //  const userName = UserName.toUpperCase() || "Admin"
  // const issueDate = new Date().toLocaleDateString("en-GB");

  //   const rowsPerPage = 15;
  //   const totalPages = Math.ceil(rows.length / rowsPerPage);
  //   const pages = Array.from({ length: totalPages }).map((_, pageIndex) =>
  //     rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
  //   );

  const OrderNo = data?.HeaderData?.OrderCode || "";
  const OrderDate = data?.HeaderData?.OrderDate || "";
  //const OrderDate = new Date().toLocaleDateString("en-GB");
  const PartyName = data?.HeaderData?.PartyName || "";
  const PartyMobile = data?.HeaderData?.MobileNo || "";
  const PartyEmail = data?.HeaderData?.EmailID || "";
  const PartyAdd = data?.HeaderData?.PartyAddress || "";
  const total = data?.HeaderData?.TotalData?.Total || "";
  const grossTotal = data?.HeaderData?.TotalData?.TotalAmount || "";
  const discount = data?.HeaderData?.TotalData?.Discount || "";
  const payable = data?.HeaderData?.TotalData?.Payable || "";
  const deliveryCharges = data?.HeaderData?.TotalData?.DeliveryCharges || "";
  // const rows = Array.from({ length: 50 }).map((_, i) => ({
  //   sl: i + 1,
  //   name: "Neela Krishnan",
  //   price: "250.00",
  //   discount: "10",
  //   netprice: "10",
  //   netamount: "9",
  //   discount: "10",
  //   qty: "2",
  // }));

  const rows = data?.HeaderData.DetailData || [];
  // const totalCount = {
  //   total: "200",
  //   discount: "10",
  //   payable: "5",
  //   deliveryCharges: "10",
  // };
  const userName = "Admin";
  const issueDate = new Date().toLocaleDateString("en-GB");

  // const rowsPerPage = 10;
  // const totalPages = 4;
  // const pages = Array.from({ length: totalPages }).map((_, pageIndex) =>
  //   rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
  // );
  // PAGE SPLITTING LOGIC
  const firstPageRows = 10;
  const otherPageRows = 15;

  const firstPage = rows.slice(0, firstPageRows);
  const remainingRows = rows.slice(firstPageRows);

  const otherPages = [];
  for (let i = 0; i < remainingRows.length; i += otherPageRows) {
    otherPages.push(remainingRows.slice(i, i + otherPageRows));
  }

  const pages = [firstPage, ...otherPages];
  const totalPages = pages.length;

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
          <Text style={styles.header} fixed>
            {/* {header?.projectname} - Order Details */}
            Order Details
          </Text>

          {/* HEADER TABLE */}
          {pageIndex === 0 && (
            <View style={styles.headerTable}>
              <View style={styles.headerRow1}>
                <View style={styles.headerCellLabel}>
                  <Text>Order No.</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{OrderNo}</Text>
                </View>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.headerCellLabel}>
                  <Text>Order Date</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{OrderDate}</Text>
                </View>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.headerCellLabel}>
                  <Text>Party Name</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{PartyName}</Text>
                </View>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.headerCellLabel}>
                  <Text>Mobile No.</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{PartyMobile}</Text>
                </View>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.headerCellLabel}>
                  <Text>Email Id</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{PartyEmail}</Text>
                </View>
              </View>

              <View style={styles.headerRow}>
                <View style={styles.headerCellLabel}>
                  <Text>Party Address</Text>
                </View>
                <View style={styles.headerCellValue}>
                  <Text>{PartyAdd}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Table */}
          <View style={styles.table} wrap>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableColHeaderSL}>
                <Text style={styles.tableCellHeader}>SL#</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "45%" }]}>
                <Text style={styles.tableCellHeader}>Item Name</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Price</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Discount</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Net Price</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
              </View>
              <View style={[styles.tableColHeader, { width: "10%" }]}>
                <Text style={styles.tableCellHeader}>Net Amount</Text>
              </View>
            </View>

            {/* Table Rows */}
            {pageRows.map((row) => (
              <View style={styles.tableRow} key={row.sl} wrap={false}>
                <View style={styles.tableColSL}>
                  <Text style={styles.tableCell2}>{row.slno}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.sl}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "45%" }]}>
                  <Text style={styles.tableCell}>{row.ItemName}</Text>
                  {/* <Text style={styles.tableCell}>{rows.name}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.Price}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.price}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.Discount}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.discount}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.NetPrice}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.netprice}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.Quantity}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.qty}</Text> */}
                </View>
                <View style={[styles.tableCol, { width: "10%" }]}>
                  <Text style={styles.tableCell1}>{row.NetAmount}</Text>
                  {/* <Text style={styles.tableCell1}>{rows.netamount}</Text> */}
                </View>
              </View>
            ))}
          </View>

          {pageIndex === totalPages - 1 && (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: "#000",
              }}
            >
              {/* Empty columns to align under table */}
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "#000",
                }}
              ></View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "#000",
                }}
              ></View>
              <View
                style={{
                  width: "10%",
                  borderRightWidth: 1,
                  borderColor: "#000",
                }}
              ></View>
              <View
                style={{
                  width: "10%",
                  borderRightWidth: 1,
                  borderColor: "#000",
                }}
              ></View>

              <View
                style={{
                  width: "20%",
                  borderRightWidth: 1,
                  borderColor: "#000",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingleft: 2,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingleft: 2,
                  }}
                >
                  Discount
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingleft: 2,
                  }}
                >
                  Gross Total
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderBottomWidth: 1,
                    paddingleft: 2,
                  }}
                >
                  Delivery Charges
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingleft: 2,
                  }}
                >
                  Net Payable
                </Text>
              </View>

              {/* TOTAL BOX (stacked inside last column area) */}
              <View style={{ width: "10%" }}>
                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: "right",
                  }}
                >
                  {total}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: "right",
                  }}
                >
                  {discount}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    borderBottomWidth: 1,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: "right",
                  }}
                >
                  {grossTotal}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderBottomWidth: 1,
                    textAlign: "right",
                  }}
                >
                  {deliveryCharges}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: "right",
                  }}
                >
                  {payable}
                </Text>
              </View>
            </View>
          )}

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
            fixed
          >
            <Text>Issue Date: {issueDate}</Text>
            <Text>
              Page {pageIndex + 1} of {totalPages}
            </Text>
            {/* <Text>Prepared by: {userName}</Text> */}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default OrderHeaderPdf;
