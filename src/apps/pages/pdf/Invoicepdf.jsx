import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
// import Pdflogo from "../../assets/img/Pdflogo.jpg";
import { Image } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    logo: { width: 60, height: 60, marginBottom: 5 },
    header: { fontSize: 16, textAlign: "center", fontWeight: "bold", marginBottom: 10 },
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
    },
    header: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "uppercase",
    },
    subHeader: {
        marginBottom: 10,
    },
    boldText: {
        fontWeight: "bold",
    },
    table: {
        display: "table",
        width: "100%",
        border: "1px solid black",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        borderBottom: "1px solid black",
    },
    cell: {
        padding: 4,
        borderRight: "1px solid black",
    },
    col: {
        flexGrow: 1,
        textAlign: "left",
    },
    amountSection: {
        marginBottom: 10,
    },
    section: {
        marginBottom: 8,
    },
    footerNote: {
        fontSize: 9,
        marginTop: 5,
    },
    bankDetails: {
        marginBottom: 5,
    },
    hsnRow: {
        flexDirection: "row",
        borderBottom: "1px solid black",
    },
});
const paginateData = (data) => {
  const firstPage = data.slice(0, 20);
  const otherPages = [];

  for (let i = 20; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }
   return [firstPage, ...otherPages];
};
// Sample PDF component
const InvoicePDF = ({ data = []}) => {
     const pages = paginateData(data);
  pages.forEach((page, i) => {
    console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
  });
    return (
        <Document>
             {pages.map((pageData, pageIndex) => (
            <Page size="A4" style={styles.page}>
                <View style={{ alignItems: "center",marginBottom:"10" }}>
                   {/* <img
                  src={ESS}
                  style={{ height: "100px", width: "140px" }}
                 /> */}
                    <Text style={styles.header}>GST PURCHASE INVOICE</Text>
                </View>
                {/* <Text style={styles.header}>GST PURCHASE INVOICE</Text> */}
                {/* Top Info Table (Reference No, Date, Place of Supply) */}
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>

                    {/* Left Column: To-Supplier */}
                    <View style={{ width: "50%", borderWidth: 1, borderColor: "#000", padding: 5 }}>
                        <Text>To-Supplier</Text>
                        <Text>Manoj Kumar</Text>
                        <Text>55/1, linghi chetty Street, Mannady</Text>
                        <Text>GSTIN: 22AAAAA0000A1Z5</Text>
                    </View>

                    {/* Right Column: Table Details */}
                    <View style={{ width: "50%" }}>
                        {/* Row 1 */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, borderWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text>Reference No: D2345</Text>
                            </View>
                            <View style={{ flex: 1, borderWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text>Date: 2025-05-23</Text>
                            </View>
                        </View>

                        {/* Row 2 */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, borderWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text>Time: 11:40:23</Text>
                            </View>
                            <View style={{ flex: 1, borderWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text>Place of Supply: Tambaram</Text>
                            </View>
                        </View>

                        {/* Row 3 */}
                        <View style={{ borderWidth: 1, borderColor: "#000", padding: 5 }}>
                            <Text>REFERENCE IF ANY: Online</Text>
                        </View>
                    </View>



                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}>S.No</Text>
                            <Text style={[styles.cell, { flex: 2 }]}>Employee Name</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>Effort</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>Hours</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>HSN</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>Price</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>CGST</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>SGST</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>IGST</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>Amount</Text>

                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}>1</Text>
                            <Text style={[styles.cell, { flex: 2 }]}>Jayakavitha</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>5</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>210690</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1700.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>765.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>765.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>765.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>8500.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}>2</Text>
                            <Text style={[styles.cell, { flex: 2 }]}>Priya</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>5</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>HSN567</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>2000.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1200.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1200.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>1200.00</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>10000.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                            <Text style={[styles.cell, { flex: 2 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                             <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                            <Text style={[styles.cell, { flex: 2 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                             <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                            <Text style={[styles.cell, { flex: 2 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                             <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                            <Text style={[styles.cell, { flex: 1 }]}></Text>
                        </View>
                        {/* Total Row */}
                        {/* <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#000" }}>
                            <View style={{ flex: 7, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>Total</Text>
                            </View>
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>1965.00</Text>
                            </View>
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>1965.00</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ padding: 5 }}>18500.00</Text>
                            </View>
                        </View> */}
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#000" }}>
                            {/* "Total" label spans the first 6.5 flex units */}
                            <View style={{ flex: 6.5, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>Total</Text>
                            </View>

                            {/* CGST total */}
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>1965.00</Text>
                            </View>

                            {/* SGST total */}
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: "#000" }}>
                                <Text style={{ padding: 5 }}>1965.00</Text>
                            </View>

                            {/* Amount total */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ padding: 5 }}>18500.00</Text>
                            </View>
                        </View>


                        {/* Amount in Words + Summary Amounts */}
                        <View style={{ flexDirection: "row", borderWidth: 1, borderColor: "#000" }}>
                            {/* Left: Amount in Words */}
                            <View style={{ width: "50%", borderRightWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>Amount in Words:</Text>
                                <Text>Twenty-Two Thousand Four Hundred And Thirty Only</Text>
                            </View>

                            {/* Right: Amount Summary */}
                            <View style={{ width: "50%" }}>
                                {/* Amounts and Roundoff */}
                                <View style={{ borderBottomWidth: 1, borderColor: "#000", padding: 5 }}>
                                    <Text>Amounts: 22430.00</Text>
                                    <Text>Roundoff: 0.00</Text>
                                </View>

                                {/* Net Amount (Split inside box) */}
                                <View style={{ flexDirection: "row", borderTopWidth: 1, borderColor: "#000" }}>
                                    {/* Net Amount Label */}
                                    <View style={{ width: "50%", borderRightWidth: 1, borderColor: "#000", padding: 5 }}>
                                        <Text style={{ fontWeight: "bold" }}>Net Amount</Text>
                                    </View>

                                    {/* Net Amount Value */}
                                    <View style={{ width: "50%", padding: 5 }}>
                                        <Text>22430.00</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* Terms and Bank Details Section */}
                        {/* Terms and Bank Section */}
                        <View style={{ flexDirection: "row", borderWidth: 1, borderColor: "#000" }}>
                            {/* Terms */}
                            <View style={{ width: "50%", borderRightWidth: 1, borderColor: "#000", padding: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>Terms & Conditions:</Text>
                                <Text>Payment due within 30 days. No returns after delivery.</Text>
                                <Text>Please verify the quantities before confirming the order.</Text>
                                <Text>Delivery will be scheduled after payment confirmation.</Text>
                                <Text>For any queries, contact support at mailto:bex@gmail.com</Text>
                            </View>

                            {/* Right side: Bank Details + Footer inside column */}
                            <View style={{ width: "50%" }}>
                                {/* Bank Details (UNCHANGED as per your instruction) */}
                                <View style={{ flexDirection: "column", padding: 5 }}>
                                    <Text style={{ fontWeight: "bold" }}>Company's Bank details:</Text>
                                    <Text>Bank Name: HDFC</Text>
                                    <Text>Bank Account No: 11309223488888</Text>
                                    <Text>Bank Account Type: Savings</Text>
                                    <Text>Bank IFSC Code: IFSC0005543</Text>
                                    <Text>Bank Branch Name: Porur</Text>
                                    <Text>Bank Location: CHENNAI</Text>
                                    <Text>Bank Address: 18 MOUNT ROAD</Text>
                                    <Text>CHENNAI</Text>
                                </View>

                                {/* Footer note with top border (inside the right 50%) */}
                                <View style={{ borderTopWidth: 1, borderColor: "#000", padding: 5 }}>
                                    <Text>For Beyondexs Solutions</Text>
                                </View>
                            </View>
                        </View>
                        {/* HSN SUMMARY TABLE */}
                        <View style={{ borderWidth: 1, borderColor: "#000" }}>
                            {/* Header */}
                            <View style={{ backgroundColor: "#EEE", padding: 5, borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ fontWeight: "bold", textAlign: "center" }}>HSN SUMMARY</Text>
                            </View>

                            {/* Table Header Row */}
                            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>S.NO</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>CODE</Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>DESCRIPTION</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>CGST</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>IGST</Text>
                                <Text style={{ flex: 2, padding: 5 }}>SGST</Text>
                            </View>

                            {/* Table Rows */}
                            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>1</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>210690</Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>9.00</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>9.00</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>0.00</Text>
                                <Text style={{ flex: 2, padding: 5 }}>9.00</Text>
                            </View>

                             <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>2</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>HSN567</Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>12.00</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>12.00</Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}>10.00</Text>
                                <Text style={{ flex: 2, padding: 5 }}>12.00</Text>
                            </View>
                             <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, padding: 5 }}></Text>
                            </View>
                             <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, padding: 5 }}></Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ flex: 1, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 3, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, borderRightWidth: 1, borderColor: "#000", padding: 5 }}></Text>
                                <Text style={{ flex: 2, padding: 5 }}></Text>
                            </View>
                        </View>





                    </View>
                </View>
                <View style={{ marginTop: 10, padding: 5, borderTopWidth: 1, borderColor: "#000", textAlign: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>BEYONDEX SOLUTIONS PRIVATE LIMITED</Text>
                    <Text># 25/31, Lakshmi Nagar, 2nd Main Road, Porur, Chennai – 600 116, Tamil Nadu, India</Text>
                    <Text>Phone: 044 – 45072474, Email: govee@beyondexs.com, Web: www.beyondexs.com</Text>
                    <Text>GSTIN Number: 33AACCB4155A1ZE, Customer Care: 9444 808 804</Text>
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

export default InvoicePDF;
