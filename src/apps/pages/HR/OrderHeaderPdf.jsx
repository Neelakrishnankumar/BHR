import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import store from "../../..";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: 10,
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
    marginTop: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeaderSL: {
    width: "5%",
    borderColor: "#000",
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
    borderTopWidth: 1,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#000",
    padding: 5,
  },
  tableCellHeader: { fontWeight: "bold", fontSize: 10, textAlign: "center" },
  tableCell: { fontSize: 10 },
  tableCell1: { fontSize: 10, textAlign: "right" },
  tableCell2: { fontSize: 10, textAlign: "center" },
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
  headerRowLeft: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    borderLeft: "1px solid #000",
    // no borderRight here — avoids doubling with the right column's borderLeft
  },
  headerRowLeft1: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    borderLeft: "1px solid #000",
    borderTop: "1px solid #000",
    // no borderRight
  },
  headerCellLabel: {
    width: "30%",
    padding: 6,
    borderRight: "1px solid #000",
    fontSize: 10,
    fontWeight: "bold",
  },

  headerCellValue: {
    width: "70%",
    padding: 6,
    fontSize: 10,
  },
  headerCellValue1: {
    width: "70%",
    padding: 6,
    fontSize: 10,
    height: "45px",
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 0,
  },

  logo: {
    width: 70,
    height: "auto",
    marginLeft: "5px",
    objectFit: "contain",
  },
  Footerlogo: {
    width: "100%",
    height: 50,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
  },
  headerTableWrapper: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    gap: 0,
  },

  headerColumn: {
    width: "50%",
  },

  // ---- Summary / totals table (row-paired so label & value can never desync) ----
  summaryBlock: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#000",
    flexDirection: "row",
  },
  summaryWordsCell: {
    width: "5%",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  summaryWordsText: {
    width: "60%",
    borderRightWidth: 1,
    borderColor: "#000",
    fontSize: 10,
    padding: 5,
  },
  summaryTotalsCol: {
    width: "35%",
  },
  summaryRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  summaryRowLast: {
    flexDirection: "row",
  },
  summaryLabelCell: {
    width: "57%",
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontSize: 10,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  summaryValueCell: {
    width: "43%",
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontSize: 10,
    textAlign: "right",
  },

  // ---- Bank details ----
  bankBlock: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderTopWidth: 0,
  },
  bankHeaderBar: {
    width: "100%",
    padding: 4,
  },
  bankContentRow: {
    flexDirection: "row",
    width: "100%",
    padding: 4,
  },
  bankLeftCol: { width: "65%", flexDirection: "row" },
  bankLabelCol: { width: "40%" },
  bankValueCol: { width: "60%" },
  bankLine: { fontSize: 10, paddingVertical: 3 },
  bankRightCol: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const OrderHeaderPdf = ({ data, UserName, OrderType }) => {
  const OrderNo = data?.HeaderData?.OrderCode || "";
  const OrderDate = data?.HeaderData?.OrderDate || "";
  const PartyName = data?.HeaderData?.PartyName || "";
  const PartyMobile = data?.HeaderData?.MobileNo || "";
  const PartyEmail = data?.HeaderData?.EmailID || "";
  const PartyAdd = data?.HeaderData?.PartyAddress || "";
  const PartyGST = data?.HeaderData?.PartyGstNo || "";
  const PartyPAN = data?.HeaderData?.PartyPanNo || "";
  const total = data?.HeaderData?.TotalData?.Total || "";
  const grossTotal = data?.HeaderData?.TotalData?.TotalAmount || "";
  const discount = data?.HeaderData?.TotalData?.Discount || "";
  const igstamount = data?.HeaderData?.TotalData?.InterGstAmount || "";
  const cgstamount = data?.HeaderData?.TotalData?.CentralGstAmount || "";
  const sgstamount = data?.HeaderData?.TotalData?.StateGstAmount || "";
  const igstPct = data?.HeaderData?.TotalData?.InterGstPercent || 0;
  const cgstPct = data?.HeaderData?.TotalData?.CentralGstPercent || 0;
  const sgstPct = data?.HeaderData?.TotalData?.StateGstPercent || 0;
  const payable = data?.HeaderData?.TotalData?.Payable || "";
  const deliveryCharges = data?.HeaderData?.TotalData?.DeliveryCharges || "";
  const BankName = data?.HeaderData?.CompanyDetail?.BankName || "";
  const BankBranchName = data?.HeaderData?.CompanyDetail?.BankBranchName || "";
  const BankAccountHolderName =
    data?.HeaderData?.CompanyDetail?.BankAccountHolderName || "";
  const BankAccountNo = data?.HeaderData?.CompanyDetail?.BankAccountNo || "";
  const BankIfsc = data?.HeaderData?.CompanyDetail?.BankIfsc || "";
  const BankBranchNameSafe = BankBranchName;
  const Base_ImageUrl = store.getState().globalurl.imageUrlUAAM;

  const QrCodeImage = data?.HeaderData?.CompanyDetail?.QrCode
    ? Base_ImageUrl + data.HeaderData.CompanyDetail.QrCode
    : null;
  const HeaderImage = data?.HeaderData?.CompanyDetail?.CmHeader
    ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmHeader
    : null;
  const FooterImage = data?.HeaderData?.CompanyDetail?.CmFooter
    ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmFooter
    : null;

  const rows = data?.HeaderData.DetailData || [];

  const numberToWordsInRupees = (num) => {
    if (!num) return "Zero Rupees Only";

    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
      "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen",
    ];
    const b = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
      "Eighty", "Ninety",
    ];

    const toWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + toWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          toWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + toWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          toWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + toWords(n % 100000) : "")
        );
      return (
        toWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + toWords(n % 10000000) : "")
      );
    };

    return toWords(parseInt(num)) + " Rupees Only";
  };

  const payableInWords = numberToWordsInRupees(payable);

  // ---------------- PAGE SPLITTING LOGIC ----------------
  // The summary block (Payable in Words + Total/Discount/GST/Net Payable +
  // Bank Details + QR) is a single non-breakable unit that must render on
  // the SAME page as the last chunk of item rows. To guarantee it never
  // gets pushed onto a fresh page, we cap how many item rows are allowed
  // on the page that carries the summary block, leaving guaranteed room.
  const firstPageRows = 13;
  const otherPageRows = 17;
  const LAST_PAGE_ROW_LIMIT = 10; // reserved capacity for the summary block
  const MIN_ROWS = LAST_PAGE_ROW_LIMIT;

  const firstPage = rows.slice(0, firstPageRows);
  const remainingRows = rows.slice(firstPageRows);

  const otherPages = [];
  for (let i = 0; i < remainingRows.length; i += otherPageRows) {
    otherPages.push(remainingRows.slice(i, i + otherPageRows));
  }

  let pages = [firstPage, ...otherPages];

  // If the page that would carry the summary block has too many rows to
  // leave room for it, peel the overflow off into a new final page.
  if (pages.length > 0) {
    const lastIdx = pages.length - 1;
    if (pages[lastIdx].length > LAST_PAGE_ROW_LIMIT) {
      const keep = pages[lastIdx].slice(0, LAST_PAGE_ROW_LIMIT);
      const overflow = pages[lastIdx].slice(LAST_PAGE_ROW_LIMIT);
      pages[lastIdx] = keep;
      pages.push(overflow);
    }
  }

  const totalPages = pages.length;

  // Summary rows definition - label & value live in ONE row together so
  // they can never fall out of alignment regardless of text wrapping.
  // const summaryRows = [
  //   { label: "Total", value: total },
  //   { label: "Discount", value: discount },
  //   ...(Number(igstPct) !== 0
  //     ? [{ label: `IGST (${igstPct}%)`, value: igstamount }]
  //     : []),
  //   ...(Number(cgstPct) !== 0
  //     ? [{ label: `CGST (${cgstPct}%)`, value: cgstamount }]
  //     : []),
  //   ...(Number(sgstPct) !== 0
  //     ? [{ label: `SGST (${sgstPct}%)`, value: sgstamount }]
  //     : []),
  //   { label: "Total Net Price", value: grossTotal },
  //   { label: "Delivery Charges", value: deliveryCharges },
  //   { label: "Net Payable", value: payable },
  // ];
  const summaryRows = [
    { label: "Total", value: total },
    ...(Number(discount) !== 0
      ? [{ label: "Discount", value: discount }]
      : []),
    ...(Number(igstPct) !== 0
      ? [{ label: `IGST (${igstPct}%)`, value: igstamount }]
      : []),
    ...(Number(cgstPct) !== 0
      ? [{ label: `CGST (${cgstPct}%)`, value: cgstamount }]
      : []),
    ...(Number(sgstPct) !== 0
      ? [{ label: `SGST (${sgstPct}%)`, value: sgstamount }]
      : []),
    { label: "Total Net Price", value: grossTotal },
    ...(Number(deliveryCharges) !== 0
      ? [{ label: "Delivery Charges", value: deliveryCharges }]
      : []),
    { label: "Net Payable", value: payable },
  ];

  return (
    <Document>
      {pages.map((pageRows, pageIndex) => {
        const isLastPage = pageIndex === totalPages - 1;
        let emptyRowsCount = 0;
        if (isLastPage && pageRows.length < MIN_ROWS) {
          emptyRowsCount = MIN_ROWS - pageRows.length;
        }

        return (
          <Page
            key={pageIndex}
            size="A4"
            orientation="portrait"
            style={styles.page}
            wrap
          >
            <View style={styles.headerContainer} fixed>
              {HeaderImage && <Image src={HeaderImage} style={styles.logo} />}
              <Text style={styles.headerTitle}>
                {OrderType === "O" ? "Order" : "Quotation"}
              </Text>
            </View>

            {/* HEADER TABLE */}
            {pageIndex === 0 && (
              <View style={styles.headerTableWrapper}>
                {/* <View style={styles.headerColumn}>
                  <View style={styles.headerRow1}>
                    <View style={styles.headerCellLabel}>
                      <Text>{OrderType === "O" ? "Order No." : "Quotation No."}</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{OrderNo}</Text>
                    </View>
                  </View>

                  <View style={styles.headerRow}>
                    <View style={styles.headerCellLabel}>
                      <Text>{OrderType === "O" ? "Order Date" : "Quotation Date"}</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{OrderDate}</Text>
                    </View>
                  </View>

                  <View style={styles.headerRow}>
                    <View style={styles.headerCellLabel}>
                      <Text>Party Name</Text>
                    </View>
                    <View style={styles.headerCellValue1}>
                      <Text>{PartyName}</Text>
                    </View>
                  </View>
                  <View style={styles.headerRow}>
                    <View style={styles.headerCellLabel}>
                      <Text>Gst No.</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{PartyGST}</Text>
                    </View>
                  </View>
                </View> */}
                <View style={styles.headerColumn}>
                  <View style={styles.headerRowLeft1}>
                    <View style={styles.headerCellLabel}>
                      <Text>{OrderType === "O" ? "Order No." : "Quotation No."}</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{OrderNo}</Text>
                    </View>
                  </View>

                  <View style={styles.headerRowLeft}>
                    <View style={styles.headerCellLabel}>
                      <Text>{OrderType === "O" ? "Order Date" : "Quotation Date"}</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{OrderDate}</Text>
                    </View>
                  </View>

                  <View style={styles.headerRowLeft}>
                    <View style={styles.headerCellLabel}>
                      <Text>Party Name</Text>
                    </View>
                    <View style={styles.headerCellValue1}>
                      <Text>{PartyName}</Text>
                    </View>
                  </View>
                  <View style={styles.headerRowLeft}>
                    <View style={styles.headerCellLabel}>
                      <Text>Gst No.</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{PartyGST}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.headerColumn}>
                  <View style={styles.headerRow1}>
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
                    <View style={styles.headerCellValue1}>
                      <Text>{PartyAdd}</Text>
                    </View>
                  </View>
                  <View style={styles.headerRow}>
                    <View style={styles.headerCellLabel}>
                      <Text>Pan No.</Text>
                    </View>
                    <View style={styles.headerCellValue}>
                      <Text>{PartyPAN}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Item Table */}
            <View style={styles.table} wrap>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderSL}>
                  <Text style={styles.tableCellHeader}>SL#</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "35%" }]}>
                  <Text style={styles.tableCellHeader}>Item Name</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "10%" }]}>
                  <Text style={styles.tableCellHeader}>Price</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "15%" }]}>
                  <Text style={styles.tableCellHeader}>Discount</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "10%" }]}>
                  <Text style={styles.tableCellHeader}>Net Price</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "10%" }]}>
                  <Text style={styles.tableCellHeader}>Quantity</Text>
                </View>
                <View style={[styles.tableColHeader, { width: "15%" }]}>
                  <Text style={styles.tableCellHeader}>Total Amount</Text>
                </View>
              </View>

              {pageRows.map((row, i) => (
                <View style={styles.tableRow} key={i} wrap={false}>
                  <View style={styles.tableColSL}>
                    <Text style={styles.tableCell2}>{row.slno}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "35%" }]}>
                    <Text style={styles.tableCell}>{row.ItemName}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "10%" }]}>
                    <Text style={styles.tableCell1}>{row.Price}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "15%" }]}>
                    <Text style={styles.tableCell1}>{row.Discount}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "10%" }]}>
                    <Text style={styles.tableCell1}>{row.NetPrice}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "10%" }]}>
                    <Text style={styles.tableCell1}>{row.Quantity}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: "15%" }]}>
                    <Text style={styles.tableCell1}>{row.ItemTotal}</Text>
                  </View>
                </View>
              ))}

              {/* Filler rows so the last page's table always reaches MIN_ROWS,
                  keeping the table height consistent right up to the summary block */}
              {isLastPage &&
                Array.from({ length: emptyRowsCount > 0 ? emptyRowsCount : 0 }).map(
                  (_, idx) => (
                    <View style={styles.tableRow} key={"empty" + idx} wrap={false}>
                      <View style={styles.tableColSL}>
                        <Text style={styles.tableCell2}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "35%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "10%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "15%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "10%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "10%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "15%" }]}>
                        <Text style={styles.tableCell1}> </Text>
                      </View>
                    </View>
                  )
                )}
            </View>

            {/* SUMMARY + BANK DETAILS — one atomic block (wrap={false}) so it
                can never be split across pages or land on a fresh page. */}
            {isLastPage && (
              <View wrap={false}>
                <View style={styles.summaryBlock}>
                  <View style={styles.summaryWordsCell} />
                  <Text style={styles.summaryWordsText}>
                    Payable in Words: {payableInWords}
                  </Text>

                  <View style={styles.summaryTotalsCol}>
                    {summaryRows.map((item, idx) => (
                      <View
                        key={item.label}
                        style={
                          idx === summaryRows.length - 1
                            ? styles.summaryRowLast
                            : styles.summaryRow
                        }
                      >
                        <Text style={styles.summaryLabelCell}>{item.label}</Text>
                        <Text style={styles.summaryValueCell}>{item.value}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* BANK DETAILS + QR */}
                <View style={styles.bankBlock}>
                  <View style={styles.bankHeaderBar}>
                    <Text style={{ fontSize: 11, fontWeight: "bolder", textAlign: "left" }}>
                      Bank Details
                    </Text>
                  </View>

                  <View style={styles.bankContentRow}>
                    <View style={styles.bankLeftCol}>
                      <View style={styles.bankLabelCol}>
                        <Text style={styles.bankLine}>Bank Name</Text>
                        <Text style={styles.bankLine}>Account Name</Text>
                        <Text style={styles.bankLine}>Account Number</Text>
                        <Text style={styles.bankLine}>IFSC Code</Text>
                        <Text style={styles.bankLine}>Branch</Text>
                      </View>
                      <View style={styles.bankValueCol}>
                        <Text style={styles.bankLine}>: {BankName}</Text>
                        <Text style={styles.bankLine}>: {BankAccountHolderName}</Text>
                        <Text style={styles.bankLine}>: {BankAccountNo}</Text>
                        <Text style={styles.bankLine}>: {BankIfsc}</Text>
                        <Text style={styles.bankLine}>: {BankBranchNameSafe}</Text>
                      </View>
                    </View>

                    <View style={styles.bankRightCol}>
                      {QrCodeImage && (
                        <Image
                          src={QrCodeImage}
                          style={{ width: "100%", height: 60, objectFit: "contain" }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Footer */}
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                right: 10,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 10,
                color: "grey",
              }}
              fixed
            >
              {FooterImage && <Image src={FooterImage} style={styles.Footerlogo} />}
              <Text style={{ color: "#000" }}>
                Page {pageIndex + 1} of {totalPages}
              </Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default OrderHeaderPdf;

// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";
// import store from "../../..";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     paddingBottom: 60,
//     paddingHorizontal: 20,
//   },
//   header: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     right: 20,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     textAlign: "center",
//     fontSize: 10,
//     color: "grey",
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     marginTop: 10,
//   },
//   tableRow: { flexDirection: "row" },
//   tableColHeaderSL: {
//     width: "5%",
//     borderColor: "#000",
//     borderWidth: 1,
//     borderLeftWidth: 1,
//     borderTopWidth: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 5,
//     textAlign: "center",
//   },
//   tableColSL: {
//     width: "5%",
//     borderWidth: 1,
//     borderLeftWidth: 1,
//     borderTopWidth: 0,
//     padding: 5,
//   },
//   tableColHeader: {
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 5,
//   },
//   tableCol: {
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderColor: "#000",
//     padding: 5,
//   },
//   tableCellHeader: { fontWeight: "bold", fontSize: 10, textAlign: "center" },
//   tableCell: { fontSize: 10 },
//   tableCell1: { fontSize: 10, textAlign: "right" },
//   tableCell2: { fontSize: 10, textAlign: "center" },
//   row: { flexDirection: "row", marginBottom: 8 },
//   fieldGroup: {
//     flexDirection: "row",
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingRight: 20,
//   },
//   fieldGroupRight: {
//     flexDirection: "row",
//     flex: 1,
//     justifyContent: "flex-end",
//     paddingLeft: 20,
//   },
//   label: { fontSize: 12, fontWeight: "bold", width: "45%", paddingRight: 5 },
//   colon: { width: "5%", fontSize: 12, textAlign: "center" },
//   value: { fontSize: 12, width: "50%" },
//   legendColumn: {
//     flexDirection: "column",
//     marginTop: "15px",
//   },
//   legend: {
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   headerTable: {
//     display: "table",
//     width: "100%",
//     marginTop: 10,
//   },

//   headerRow: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//     borderLeft: "1px solid #000",
//     borderRight: "1px solid #000",
//   },
//   headerRow1: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//     borderLeft: "1px solid #000",
//     borderTop: "1px solid #000",
//     borderRight: "1px solid #000",
//   },

//   headerCellLabel: {
//     width: "30%",
//     padding: 6,
//     borderRight: "1px solid #000",
//     fontSize: 10,
//     fontWeight: "bold",
//   },

//   headerCellValue: {
//     width: "70%",
//     padding: 6,
//     fontSize: 10,
//   },
//   headerCellValue1: {
//     width: "70%",
//     padding: 6,
//     fontSize: 10,
//     height: "45px",
//   },
//   headerContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     marginTop: 0,
//   },

//   logo: {
//     width: 70,
//     height: "auto",
//     marginLeft: "5px",
//     objectFit: "contain",
//   },
//   Footerlogo: {
//     width: "100%",
//     height: 50,
//   },

//   headerTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: "10px",
//   },
//   headerTableWrapper: {
//     flexDirection: "row",
//     width: "100%",
//     marginTop: 10,
//     gap: 0,
//   },

//   headerColumn: {
//     width: "50%",
//   },

//   // ---- Summary / totals table (row-paired so label & value can never desync) ----
//   summaryBlock: {
//     borderWidth: 1,
//     borderTopWidth: 0,
//     borderColor: "#000",
//     flexDirection: "row",
//   },
//   summaryWordsCell: {
//     width: "5%",
//     borderRightWidth: 1,
//     borderColor: "#000",
//   },
//   summaryWordsText: {
//     width: "60%",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontSize: 10,
//     padding: 5,
//   },
//   summaryTotalsCol: {
//     width: "35%",
//   },
//   summaryRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#000",
//   },
//   summaryRowLast: {
//     flexDirection: "row",
//   },
//   summaryLabelCell: {
//     width: "57%",
//     paddingVertical: 3,
//     paddingHorizontal: 4,
//     fontSize: 10,
//     borderRightWidth: 1,
//     borderColor: "#000",
//   },
//   summaryValueCell: {
//     width: "43%",
//     paddingVertical: 3,
//     paddingHorizontal: 4,
//     fontSize: 10,
//     textAlign: "right",
//   },

//   // ---- Bank details ----
//   bankBlock: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderTopWidth: 0,
//   },
//   bankHeaderBar: {
//     width: "100%",
//     padding: 4,
//   },
//   bankContentRow: {
//     flexDirection: "row",
//     width: "100%",
//     padding: 4,
//   },
//   bankLeftCol: { width: "65%", flexDirection: "row" },
//   bankLabelCol: { width: "40%" },
//   bankValueCol: { width: "60%" },
//   bankLine: { fontSize: 10, paddingVertical: 3 },
//   bankRightCol: {
//     width: "35%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// const OrderHeaderPdf = ({ data, UserName, OrderType }) => {
//   const OrderNo = data?.HeaderData?.OrderCode || "";
//   const OrderDate = data?.HeaderData?.OrderDate || "";
//   const PartyName = data?.HeaderData?.PartyName || "";
//   const PartyMobile = data?.HeaderData?.MobileNo || "";
//   const PartyEmail = data?.HeaderData?.EmailID || "";
//   const PartyAdd = data?.HeaderData?.PartyAddress || "";
//   const PartyGST = data?.HeaderData?.PartyGstNo || "";
//   const PartyPAN = data?.HeaderData?.PartyPanNo || "";
//   const total = data?.HeaderData?.TotalData?.Total || "";
//   const grossTotal = data?.HeaderData?.TotalData?.TotalAmount || "";
//   const discount = data?.HeaderData?.TotalData?.Discount || "";
//   const igstamount = data?.HeaderData?.TotalData?.InterGstAmount || "";
//   const cgstamount = data?.HeaderData?.TotalData?.CentralGstAmount || "";
//   const sgstamount = data?.HeaderData?.TotalData?.StateGstAmount || "";
//   const igstPct = data?.HeaderData?.TotalData?.InterGstPercent || 0;
//   const cgstPct = data?.HeaderData?.TotalData?.CentralGstPercent || 0;
//   const sgstPct = data?.HeaderData?.TotalData?.StateGstPercent || 0;
//   const payable = data?.HeaderData?.TotalData?.Payable || "";
//   const deliveryCharges = data?.HeaderData?.TotalData?.DeliveryCharges || "";
//   const BankName = data?.HeaderData?.CompanyDetail?.BankName || "";
//   const BankBranchName = data?.HeaderData?.CompanyDetail?.BankBranchName || "";
//   const BankAccountHolderName =
//     data?.HeaderData?.CompanyDetail?.BankAccountHolderName || "";
//   const BankAccountNo = data?.HeaderData?.CompanyDetail?.BankAccountNo || "";
//   const BankIfsc = data?.HeaderData?.CompanyDetail?.BankIfsc || "";
//   const BankBranchNameSafe = BankBranchName;
//   const Base_ImageUrl = store.getState().globalurl.imageUrlUAAM;

//   const QrCodeImage = data?.HeaderData?.CompanyDetail?.QrCode
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.QrCode
//     : null;
//   const HeaderImage = data?.HeaderData?.CompanyDetail?.CmHeader
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmHeader
//     : null;
//   const FooterImage = data?.HeaderData?.CompanyDetail?.CmFooter
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmFooter
//     : null;

//   const rows = data?.HeaderData.DetailData || [];

//   const numberToWordsInRupees = (num) => {
//     if (!num) return "Zero Rupees Only";

//     const a = [
//       "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
//       "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
//       "Sixteen", "Seventeen", "Eighteen", "Nineteen",
//     ];
//     const b = [
//       "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
//       "Eighty", "Ninety",
//     ];

//     const toWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100)
//         return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return (
//           a[Math.floor(n / 100)] +
//           " Hundred" +
//           (n % 100 ? " " + toWords(n % 100) : "")
//         );
//       if (n < 100000)
//         return (
//           toWords(Math.floor(n / 1000)) +
//           " Thousand" +
//           (n % 1000 ? " " + toWords(n % 1000) : "")
//         );
//       if (n < 10000000)
//         return (
//           toWords(Math.floor(n / 100000)) +
//           " Lakh" +
//           (n % 100000 ? " " + toWords(n % 100000) : "")
//         );
//       return (
//         toWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + toWords(n % 10000000) : "")
//       );
//     };

//     return toWords(parseInt(num)) + " Rupees Only";
//   };

//   const payableInWords = numberToWordsInRupees(payable);

//   // ---------------- PAGE SPLITTING LOGIC ----------------
//   // The summary block (Payable in Words + Total/Discount/GST/Net Payable +
//   // Bank Details + QR) is a single non-breakable unit that must render on
//   // the SAME page as the last chunk of item rows. To guarantee it never
//   // gets pushed onto a fresh page, we cap how many item rows are allowed
//   // on the page that carries the summary block, leaving guaranteed room.
//   const firstPageRows = 13;
//   const otherPageRows = 17;
//   const LAST_PAGE_ROW_LIMIT = 10; // reserved capacity for the summary block
//   const MIN_ROWS = LAST_PAGE_ROW_LIMIT;

//   const firstPage = rows.slice(0, firstPageRows);
//   const remainingRows = rows.slice(firstPageRows);

//   const otherPages = [];
//   for (let i = 0; i < remainingRows.length; i += otherPageRows) {
//     otherPages.push(remainingRows.slice(i, i + otherPageRows));
//   }

//   let pages = [firstPage, ...otherPages];

//   // If the page that would carry the summary block has too many rows to
//   // leave room for it, peel the overflow off into a new final page.
//   if (pages.length > 0) {
//     const lastIdx = pages.length - 1;
//     if (pages[lastIdx].length > LAST_PAGE_ROW_LIMIT) {
//       const keep = pages[lastIdx].slice(0, LAST_PAGE_ROW_LIMIT);
//       const overflow = pages[lastIdx].slice(LAST_PAGE_ROW_LIMIT);
//       pages[lastIdx] = keep;
//       pages.push(overflow);
//     }
//   }

//   const totalPages = pages.length;

//   // Summary rows definition - label & value live in ONE row together so
//   // they can never fall out of alignment regardless of text wrapping.
//   const summaryRows = [
//     { label: "Total", value: total },
//     { label: "Discount", value: discount },
//     { label: `IGST (${igstPct}%)`, value: igstamount },
//     { label: `CGST (${cgstPct}%)`, value: cgstamount },
//     { label: `SGST (${sgstPct}%)`, value: sgstamount },
//     { label: "Total Net Price", value: grossTotal },
//     { label: "Delivery Charges", value: deliveryCharges },
//     { label: "Net Payable", value: payable },
//   ];

//   return (
//     <Document>
//       {pages.map((pageRows, pageIndex) => {
//         const isLastPage = pageIndex === totalPages - 1;
//         let emptyRowsCount = 0;
//         if (isLastPage && pageRows.length < MIN_ROWS) {
//           emptyRowsCount = MIN_ROWS - pageRows.length;
//         }

//         return (
//           <Page
//             key={pageIndex}
//             size="A4"
//             orientation="portrait"
//             style={styles.page}
//             wrap
//           >
//             <View style={styles.headerContainer} fixed>
//               {HeaderImage && <Image src={HeaderImage} style={styles.logo} />}
//               <Text style={styles.headerTitle}>
//                 {OrderType === "O" ? "Order" : "Quotation"}
//               </Text>
//             </View>

//             {/* HEADER TABLE */}
//             {pageIndex === 0 && (
//               <View style={styles.headerTableWrapper}>
//                 <View style={styles.headerColumn}>
//                   <View style={styles.headerRow1}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>{OrderType === "O" ? "Order No." : "Quotation No."}</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{OrderNo}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>{OrderType === "O" ? "Order Date" : "Quotation Date"}</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{OrderDate}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Party Name</Text>
//                     </View>
//                     <View style={styles.headerCellValue1}>
//                       <Text>{PartyName}</Text>
//                     </View>
//                   </View>
//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Gst No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyGST}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={styles.headerColumn}>
//                   <View style={styles.headerRow1}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Mobile No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyMobile}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Email Id</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyEmail}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Party Address</Text>
//                     </View>
//                     <View style={styles.headerCellValue1}>
//                       <Text>{PartyAdd}</Text>
//                     </View>
//                   </View>
//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Pan No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyPAN}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}

//             {/* Item Table */}
//             <View style={styles.table} wrap>
//               <View style={styles.tableRow}>
//                 <View style={styles.tableColHeaderSL}>
//                   <Text style={styles.tableCellHeader}>SL#</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "35%" }]}>
//                   <Text style={styles.tableCellHeader}>Item Name</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Price</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "15%" }]}>
//                   <Text style={styles.tableCellHeader}>Discount</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Net Price</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Quantity</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "15%" }]}>
//                   <Text style={styles.tableCellHeader}>Total Amount</Text>
//                 </View>
//               </View>

//               {pageRows.map((row, i) => (
//                 <View style={styles.tableRow} key={i} wrap={false}>
//                   <View style={styles.tableColSL}>
//                     <Text style={styles.tableCell2}>{row.slno}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "35%" }]}>
//                     <Text style={styles.tableCell}>{row.ItemName}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.Price}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "15%" }]}>
//                     <Text style={styles.tableCell1}>{row.Discount}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.NetPrice}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.Quantity}</Text>
//                   </View>
//                   <View style={[styles.tableCol, { width: "15%" }]}>
//                     <Text style={styles.tableCell1}>{row.ItemTotal}</Text>
//                   </View>
//                 </View>
//               ))}

//               {/* Filler rows so the last page's table always reaches MIN_ROWS,
//                   keeping the table height consistent right up to the summary block */}
//               {isLastPage &&
//                 Array.from({ length: emptyRowsCount > 0 ? emptyRowsCount : 0 }).map(
//                   (_, idx) => (
//                     <View style={styles.tableRow} key={"empty" + idx} wrap={false}>
//                       <View style={styles.tableColSL}>
//                         <Text style={styles.tableCell2}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "35%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "10%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "15%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "10%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "10%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                       <View style={[styles.tableCol, { width: "15%" }]}>
//                         <Text style={styles.tableCell1}> </Text>
//                       </View>
//                     </View>
//                   )
//                 )}
//             </View>

//             {/* SUMMARY + BANK DETAILS — one atomic block (wrap={false}) so it
//                 can never be split across pages or land on a fresh page. */}
//             {isLastPage && (
//               <View wrap={false}>
//                 <View style={styles.summaryBlock}>
//                   <View style={styles.summaryWordsCell} />
//                   <Text style={styles.summaryWordsText}>
//                     Payable in Words: {payableInWords}
//                   </Text>

//                   <View style={styles.summaryTotalsCol}>
//                     {summaryRows.map((item, idx) => (
//                       <View
//                         key={item.label}
//                         style={
//                           idx === summaryRows.length - 1
//                             ? styles.summaryRowLast
//                             : styles.summaryRow
//                         }
//                       >
//                         <Text style={styles.summaryLabelCell}>{item.label}</Text>
//                         <Text style={styles.summaryValueCell}>{item.value}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 </View>

//                 {/* BANK DETAILS + QR */}
//                 <View style={styles.bankBlock}>
//                   <View style={styles.bankHeaderBar}>
//                     <Text style={{ fontSize: 11, fontWeight: "bolder", textAlign: "left" }}>
//                       Bank Details
//                     </Text>
//                   </View>

//                   <View style={styles.bankContentRow}>
//                     <View style={styles.bankLeftCol}>
//                       <View style={styles.bankLabelCol}>
//                         <Text style={styles.bankLine}>Bank Name</Text>
//                         <Text style={styles.bankLine}>Account Name</Text>
//                         <Text style={styles.bankLine}>Account Number</Text>
//                         <Text style={styles.bankLine}>IFSC Code</Text>
//                         <Text style={styles.bankLine}>Branch</Text>
//                       </View>
//                       <View style={styles.bankValueCol}>
//                         <Text style={styles.bankLine}>: {BankName}</Text>
//                         <Text style={styles.bankLine}>: {BankAccountHolderName}</Text>
//                         <Text style={styles.bankLine}>: {BankAccountNo}</Text>
//                         <Text style={styles.bankLine}>: {BankIfsc}</Text>
//                         <Text style={styles.bankLine}>: {BankBranchNameSafe}</Text>
//                       </View>
//                     </View>

//                     <View style={styles.bankRightCol}>
//                       {QrCodeImage && (
//                         <Image
//                           src={QrCodeImage}
//                           style={{ width: "100%", height: 60, objectFit: "contain" }}
//                         />
//                       )}
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}

//             {/* Footer */}
//             <View
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: 10,
//                 right: 10,
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: 10,
//                 color: "grey",
//               }}
//               fixed
//             >
//               {FooterImage && <Image src={FooterImage} style={styles.Footerlogo} />}
//               <Text style={{ color: "#000" }}>
//                 Page {pageIndex + 1} of {totalPages}
//               </Text>
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// };

// export default OrderHeaderPdf;





// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";
// import store from "../../..";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     paddingBottom: 60,
//     paddingHorizontal: 20,
//   },
//   header: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     right: 20,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     textAlign: "center",
//     fontSize: 10,
//     color: "grey",
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     // borderStyle: "solid",
//     // borderWidth: 1,
//     // borderRightWidth: 0,
//     // borderBottomWidth: 0,
//     marginTop: 10,
//   },
//   tableRow: { flexDirection: "row" },
//   tableColHeaderSL: {
//     width: "5%",
//     borderColor: "#000",
//     borderWidth: 1,
//     borderLeftWidth: 1,
//     borderTopWidth: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 5,
//     textAlign: "center",
//   },
//   tableColSL: {
//     width: "5%",
//     borderWidth: 1,
//     borderLeftWidth: 1,
//     borderTopWidth: 0,
//     padding: 5,
//   },
//   tableColHeader: {
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 1,
//     backgroundColor: "#f0f0f0",
//     padding: 5,
//   },
//   tableCol: {
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderColor: "#000",
//     padding: 5,
//   },
//   tableCellHeader: { fontWeight: "bold", fontSize: 10, textAlign: "center" },
//   tableCell: { fontSize: 10 },
//   tableCell1: { fontSize: 10, textAlign: "right" },
//   tableCell2: { fontSize: 10, textAlign: "center" },
//   row: { flexDirection: "row", marginBottom: 8 },
//   fieldGroup: {
//     flexDirection: "row",
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingRight: 20,
//   },
//   fieldGroupRight: {
//     flexDirection: "row",
//     flex: 1,
//     justifyContent: "flex-end",
//     paddingLeft: 20,
//   },
//   label: { fontSize: 12, fontWeight: "bold", width: "45%", paddingRight: 5 },
//   colon: { width: "5%", fontSize: 12, textAlign: "center" },
//   value: { fontSize: 12, width: "50%" },
//   legendColumn: {
//     flexDirection: "column",
//     marginTop: "15px",
//   },
//   legend: {
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   headerTable: {
//     display: "table",
//     width: "100%",
//     marginTop: 10,
//   },

//   headerRow: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//     borderLeft: "1px solid #000",
//     borderRight: "1px solid #000",
//   },
//   headerRow1: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//     borderLeft: "1px solid #000",
//     borderTop: "1px solid #000",
//     borderRight: "1px solid #000",
//   },

//   headerCellLabel: {
//     width: "30%",
//     padding: 6,
//     borderRight: "1px solid #000",
//     fontSize: 10,
//     fontWeight: "bold",
//   },

//   headerCellValue: {
//     width: "70%",
//     padding: 6,
//     fontSize: 10,
//   },
//   headerCellValue1: {
//     width: "70%",
//     padding: 6,
//     fontSize: 10,
//     height: "45px"
//   },
//   headerContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     marginTop: 0,
//   },

//   logo: {
//     width: 70,
//     height: "auto",
//     marginLeft: "5px",
//     objectFit: "contain",
//   },
//   Footerlogo: {
//     width: "100%",
//     height: 50,
//     //objectFit:"cover"
//   },

//   headerTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: "10px",
//   },
//   headerTableWrapper: {
//     flexDirection: "row",
//     width: "100%",
//     marginTop: 10,
//     gap: 0,
//   },

//   headerColumn: {
//     width: "50%", // 2 equal columns
//   },
// });

// const OrderHeaderPdf = ({ data, UserName, OrderType }) => {
//   const OrderNo = data?.HeaderData?.OrderCode || "";
//   const OrderDate = data?.HeaderData?.OrderDate || "";
//   //const OrderDate = new Date().toLocaleDateString("en-GB");
//   const PartyName = data?.HeaderData?.PartyName || "";
//   const PartyMobile = data?.HeaderData?.MobileNo || "";
//   const PartyEmail = data?.HeaderData?.EmailID || "";
//   const PartyAdd = data?.HeaderData?.PartyAddress || "";
//   const PartyGST = data?.HeaderData?.PartyGstNo || "";
//   const PartyPAN = data?.HeaderData?.PartyPanNo || "";
//   const total = data?.HeaderData?.TotalData?.Total || "";
//   const grossTotal = data?.HeaderData?.TotalData?.TotalAmount || "";
//   const discount = data?.HeaderData?.TotalData?.Discount || "";
//   const igstamount = data?.HeaderData?.TotalData?.IgstAmount || "";
//   const cgstamount = data?.HeaderData?.TotalData?.CgstAmount || "";
//   const sgstamount = data?.HeaderData?.TotalData?.SgstAmount || "";
//   const payable = data?.HeaderData?.TotalData?.Payable || "";
//   const deliveryCharges = data?.HeaderData?.TotalData?.DeliveryCharges || "";
//   const BankName = data?.HeaderData?.CompanyDetail?.BankName || "";
//   const BankBranchName = data?.HeaderData?.CompanyDetail?.BankBranchName || "";
//   const BankAccountHolderName =
//     data?.HeaderData?.CompanyDetail?.BankAccountHolderName || "";
//   const BankAccountNo = data?.HeaderData?.CompanyDetail?.BankAccountNo || "";
//   const BankIfsc = data?.HeaderData?.CompanyDetail?.BankIfsc || "";
//   const BankLocation = data?.HeaderData?.CompanyDetail?.BankLocation || "";
//   const BankAddress = data?.HeaderData?.CompanyDetail?.BankAddress || "";
//   //const QrCodeImage = data?.HeaderData?.CompanyDetail?.QrCode || "";
//   const Base_ImageUrl = store.getState().globalurl.imageUrlUAAM;

//   const QrCodeImage = data?.HeaderData?.CompanyDetail?.QrCode
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.QrCode
//     : null;
//   const HeaderImage = data?.HeaderData?.CompanyDetail?.CmHeader
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmHeader
//     : null;
//   const FooterImage = data?.HeaderData?.CompanyDetail?.CmFooter
//     ? Base_ImageUrl + data.HeaderData.CompanyDetail.CmFooter
//     : null;
//   // const rows = Array.from({ length: 50 }).map((_, i) => ({
//   //   sl: i + 1,
//   //   name: "Neela Krishnan",
//   //   price: "250.00",
//   //   discount: "10",
//   //   netprice: "10",
//   //   netamount: "9",
//   //   discount: "10",
//   //   qty: "2",
//   // }));

//   const rows = data?.HeaderData.DetailData || [];
//   // const totalCount = {
//   //   total: "200",
//   //   discount: "10",
//   //   payable: "5",
//   //   deliveryCharges: "10",
//   // };
//   const userName = "Admin";
//   const issueDate = new Date().toLocaleDateString("en-GB");

//   // const rowsPerPage = 10;
//   // const totalPages = 4;
//   // const pages = Array.from({ length: totalPages }).map((_, pageIndex) =>
//   //   rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
//   // );
//   // PAGE SPLITTING LOGIC
//   const firstPageRows = 13;
//   const otherPageRows = 17;
//   const MIN_ROWS = 13; // how tall table should be on last page

//   const firstPage = rows.slice(0, firstPageRows);
//   const remainingRows = rows.slice(firstPageRows);

//   const otherPages = [];
//   for (let i = 0; i < remainingRows.length; i += otherPageRows) {
//     otherPages.push(remainingRows.slice(i, i + otherPageRows));
//   }

//   const pages = [firstPage, ...otherPages];
//   const totalPages = pages.length;
//   //LOGO
//   const LogoUrl = "publicLogo.png";
//   const numberToWordsInRupees = (num) => {
//     if (!num) return "Zero Rupees Only";

//     const a = [
//       "",
//       "One",
//       "Two",
//       "Three",
//       "Four",
//       "Five",
//       "Six",
//       "Seven",
//       "Eight",
//       "Nine",
//       "Ten",
//       "Eleven",
//       "Twelve",
//       "Thirteen",
//       "Fourteen",
//       "Fifteen",
//       "Sixteen",
//       "Seventeen",
//       "Eighteen",
//       "Nineteen",
//     ];
//     const b = [
//       "",
//       "",
//       "Twenty",
//       "Thirty",
//       "Forty",
//       "Fifty",
//       "Sixty",
//       "Seventy",
//       "Eighty",
//       "Ninety",
//     ];

//     const toWords = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100)
//         return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//       if (n < 1000)
//         return (
//           a[Math.floor(n / 100)] +
//           " Hundred" +
//           (n % 100 ? " " + toWords(n % 100) : "")
//         );
//       if (n < 100000)
//         return (
//           toWords(Math.floor(n / 1000)) +
//           " Thousand" +
//           (n % 1000 ? " " + toWords(n % 1000) : "")
//         );
//       if (n < 10000000)
//         return (
//           toWords(Math.floor(n / 100000)) +
//           " Lakh" +
//           (n % 100000 ? " " + toWords(n % 100000) : "")
//         );
//       return (
//         toWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + toWords(n % 10000000) : "")
//       );
//     };

//     return toWords(parseInt(num)) + " Rupees Only";
//   };

//   const payableInWords = numberToWordsInRupees(payable);

//   return (
//     <Document>
//       {pages.map((pageRows, pageIndex) => {
//         let emptyRowsCount = 0;
//         if (pageIndex === totalPages - 1 && pageRows.length < MIN_ROWS) {
//           emptyRowsCount = MIN_ROWS - pageRows.length;
//         }

//         return (
//           <Page
//             key={pageIndex}
//             size="A4"
//             orientation="portrait"
//             style={styles.page}
//             wrap
//           >
//             <View style={styles.headerContainer} fixed>
//               {HeaderImage && <Image src={HeaderImage} style={styles.logo} />}
//               {/* <Text style={styles.headerTitle}>Invoice</Text> */}
//               <Text style={styles.headerTitle}>{OrderType === "O" ? "Order" : "Quotation"}</Text>
//             </View>

//             {/* HEADER TABLE */}
//             {pageIndex === 0 && (
//               <View style={styles.headerTableWrapper}>
//                 {/* LEFT COLUMN */}
//                 <View style={styles.headerColumn}>
//                   <View style={styles.headerRow1}>
//                     <View style={styles.headerCellLabel}>
//                       {/* <Text>Order No.</Text> */}
//                       <Text>{OrderType === "O" ? "Order No." : "Quotation No."}</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{OrderNo}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>{OrderType === "O" ? "Order Date" : "Quotation Date"}</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{OrderDate}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Party Name</Text>
//                     </View>
//                     <View style={styles.headerCellValue1}>
//                       <Text>{PartyName}</Text>
//                     </View>
//                   </View>
//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Gst No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyGST}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* RIGHT COLUMN */}
//                 <View style={styles.headerColumn}>
//                   <View style={styles.headerRow1}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Mobile No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyMobile}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Email Id</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyEmail}</Text>
//                     </View>
//                   </View>

//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Party Address</Text>
//                     </View>
//                     <View style={styles.headerCellValue1}>
//                       <Text>{PartyAdd}</Text>
//                     </View>
//                   </View>
//                   <View style={styles.headerRow}>
//                     <View style={styles.headerCellLabel}>
//                       <Text>Pan No.</Text>
//                     </View>
//                     <View style={styles.headerCellValue}>
//                       <Text>{PartyPAN}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}

//             {/* Table */}
//             <View style={styles.table} wrap>
//               {/* Table Header */}
//               <View style={styles.tableRow}>
//                 <View style={styles.tableColHeaderSL}>
//                   <Text style={styles.tableCellHeader}>SL#</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "35%" }]}>
//                   <Text style={styles.tableCellHeader}>Item Name</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Price</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "15%" }]}>
//                   <Text style={styles.tableCellHeader}>Discount</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Net Price</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "10%" }]}>
//                   <Text style={styles.tableCellHeader}>Quantity</Text>
//                 </View>
//                 <View style={[styles.tableColHeader, { width: "15%" }]}>
//                   <Text style={styles.tableCellHeader}>Total Amount</Text>
//                 </View>
//                 {/* <View style={[styles.tableColHeader, { width: "10%" }]}>
//                 <Text style={styles.tableCellHeader}>Net Amount</Text>
//               </View> */}
//               </View>

//               {/* Table Rows */}
//               {pageRows.map((row, i) => (
//                 <View style={styles.tableRow} key={i} wrap={false}>
//                   <View style={styles.tableColSL}>
//                     <Text style={styles.tableCell2}>{row.slno}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.sl}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "35%" }]}>
//                     <Text style={styles.tableCell}>{row.ItemName}</Text>
//                     {/* <Text style={styles.tableCell}>{rows.name}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.Price}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.price}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "15%" }]}>
//                     <Text style={styles.tableCell1}>{row.Discount}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.discount}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.NetPrice}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.netprice}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "10%" }]}>
//                     <Text style={styles.tableCell1}>{row.Quantity}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.qty}</Text> */}
//                   </View>
//                   <View style={[styles.tableCol, { width: "15%" }]}>
//                     <Text style={styles.tableCell1}>{row.ItemTotal}</Text>
//                     {/* <Text style={styles.tableCell1}>{rows.netamount}</Text> */}
//                   </View>
//                   {/* <View style={[styles.tableCol, { width: "10%" }]}>
//                   <Text style={styles.tableCell1}>{row.NetAmount}</Text>
//                 </View> */}
//                 </View>
//               ))}

//               {/* FILLER ROWS FOR LAST PAGE */}
//               {pageIndex === totalPages - 1 &&
//                 Array.from({
//                   length:
//                     MIN_ROWS - pageRows.length > 0
//                       ? MIN_ROWS - pageRows.length
//                       : 0,
//                 }).map((_, idx) => (
//                   <View
//                     style={styles.tableRow}
//                     key={"empty" + idx}
//                     wrap={false}
//                   >
//                     <View style={styles.tableColSL}>
//                       <Text style={styles.tableCell2}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "35%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "10%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "15%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "10%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "10%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                     <View style={[styles.tableCol, { width: "15%" }]}>
//                       <Text style={styles.tableCell1}> </Text>
//                     </View>
//                   </View>
//                 ))}
//             </View>

//             {pageIndex === totalPages - 1 && (
//               <>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     borderWidth: 1,
//                     borderTopWidth: 0,
//                     borderColor: "#000",
//                   }}
//                 >
//                   {/* Empty columns to align under table */}
//                   <View
//                     style={{
//                       width: "5%",
//                       borderRightWidth: 1,
//                       //borderColor: "#000",
//                       padding: 5,
//                       textAlign: "center",
//                     }}
//                   ></View>
//                   <View
//                     style={{
//                       width: "60%",
//                       borderRightWidth: 1,
//                       //borderColor: "#000",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         //borderBottomWidth: 1,
//                         // paddingVertical: 3,
//                         // paddingHorizontal: 2,
//                         padding: 5,
//                       }}
//                     >
//                       Payable in Words: {payableInWords}
//                     </Text>
//                   </View>
//                   {/* <View
//                 style={{
//                   width: "10%",
//                   borderRightWidth: 1,
//                   borderColor: "#000",
//                 }}
//               ></View>
//               <View
//                 style={{
//                   width: "15%",
//                   borderRightWidth: 1,
//                   borderColor: "#000",
//                 }}
//               ></View> */}
//                   <View
//                     style={{
//                       width: "20%",
//                       borderRightWidth: 1,
//                       //borderColor: "#000",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       Total
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       Discount
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       IGST({data?.HeaderData?.TotalData?.Igst} %)
//                     </Text>
//                      <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       CGST({data?.HeaderData?.TotalData?.Cgst} %)
//                     </Text>
//                      <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       SGST({data?.HeaderData?.TotalData?.Sgst} %)
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       Total Net Price
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         paddingVertical: 3,
//                         borderBottomWidth: 1,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       Delivery Charges
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         paddingVertical: 3,
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       Net Payable
//                     </Text>
//                   </View>

//                   <View style={{ width: "15%" }}>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {total}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {discount}
//                     </Text>
//                      <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {igstamount}
//                     </Text>
//                      <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {cgstamount}
//                     </Text>
//                      <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {sgstamount}
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         borderBottomWidth: 1,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {grossTotal}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: 10,
//                         paddingVertical: 3,
//                         borderBottomWidth: 1,
//                         textAlign: "right",
//                       }}
//                     >
//                       {deliveryCharges}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: 10,
//                         paddingVertical: 3,
//                         textAlign: "right",
//                       }}
//                     >
//                       {payable}
//                     </Text>
//                   </View>
//                 </View>
//                 {/* BANK DETAILS + FOOTER LOGO ROW */}
//                 <View
//                   style={{
//                     width: "100%",
//                     borderWidth: 1,
//                     borderColor: "#000",
//                     borderTopWidth: 0,
//                   }}
//                 >
//                   {/* HEADER BAR */}
//                   <View
//                     style={{
//                       width: "100%",
//                       padding: 4,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 11,
//                         fontWeight: "bolder",
//                         textAlign: "left",
//                       }}
//                     >
//                       Bank Details
//                     </Text>
//                   </View>

//                   {/* CONTENT ROW (Bank Left + Logo Right) */}
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       width: "100%",
//                       padding: 4,
//                     }}
//                   >
//                     {/* LEFT — 65% BANK DETAILS */}
//                     <View style={{ width: "65%", flexDirection: "row" }}>
//                       {/* Labels */}
//                       <View style={{ width: "40%" }}>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           Bank Name
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           Account Name
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           Account Number
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           IFSC Code
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           Branch
//                         </Text>
//                       </View>

//                       {/* Values */}
//                       <View style={{ width: "60%" }}>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           {": "}
//                           {BankName}
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           {": "}
//                           {BankAccountHolderName}
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           {": "}
//                           {BankAccountNo}
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           {": "}
//                           {BankIfsc}
//                         </Text>
//                         <Text style={{ fontSize: 10, paddingVertical: 3 }}>
//                           {": "}
//                           {BankBranchName}
//                         </Text>
//                       </View>
//                     </View>

//                     {/* RIGHT — 35% QR / LOGO */}
//                     <View
//                       style={{
//                         width: "35%",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       {QrCodeImage && (
//                         <Image
//                           //src="/CompQR.png"
//                           src={QrCodeImage}
//                           style={{
//                             width: "100%",
//                             height: 60,
//                             objectFit: "contain",
//                           }}
//                         />
//                       )}
//                     </View>
//                   </View>
//                 </View>
//               </>
//             )}

//             {/* Footer */}
//             {/* <Text style={styles.footer}>
//             Page {pageIndex + 1} of {totalPages}
//           </Text> */}
//             {/* Footer */}
//             <View
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: 10,
//                 right: 10,
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: 10,
//                 color: "grey",
//               }}
//               fixed
//             >
//               {/* <Text>Issue Date: {issueDate}</Text> */}

//               {FooterImage && (
//                 <Image src={FooterImage} style={styles.Footerlogo} />
//               )}
//               <Text
//                 style={{
//                   color: "#000"
//                 }}
//               >
//                 Page {pageIndex + 1} of {totalPages}
//               </Text>
//               {/* <Text>Prepared by: {userName}</Text> */}
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// };

// export default OrderHeaderPdf;
