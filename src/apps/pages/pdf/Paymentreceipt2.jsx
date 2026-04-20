import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Current Date
const currentDate = new Date().toLocaleDateString("en-GB");

// Styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 80,
        paddingBottom: 60,
        paddingHorizontal: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
    },

    headerWrapper: {
        position: "absolute",
        top: 10,
        left: 30,
        right: 30,
        height: 50,
        alignItems: "center",
    },

    headerImage: {
        width: "100%",
        height: 60,
        objectFit: "contain",
    },

    footerWrapper: {
        position: "absolute",
        bottom: 25,
        left: 5,
        right: 5,
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },

    footerImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
    },

    // Title
    titleSection: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Receiver Section
    receiverContactSection: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    leftColumn: {
        flex: 1,
        paddingRight: 20,
    },

    rightColumn: {
        flex: 1,
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
    },

    columnLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    receiverName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },

    detailText: {
        fontSize: 9,
        marginBottom: 2,
        lineHeight: 1.2,
    },

    // Invoice Section
    invoiceDetailsSection: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    invoiceDetailBox: {
        flex: 1,
    },

    invoiceLabel: {
        fontSize: 8,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    invoiceValue: {
        fontSize: 11,
        fontWeight: 'bold',
    },

    previousBalanceValue: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#d97706',
    },

    // Table
    tableSection: {
        marginTop: 5,
        marginBottom: 10,
    },

    tableTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    // table: {
    //     borderWidth: 1,
    //     borderColor: '#cccccc',
    // },
    table: {
        borderWidth: 1,
        borderColor: '#000',   // darker for clarity
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
    },

    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    },

    snoColumn: { width: '10%' },
    purposeColumn: { width: '50%' },
    paidAmountColumn: { width: '20%' },
    dueAmountColumn: { width: '20%' },

    // tableHeaderCell: {
    //     fontSize: 8,
    //     padding: 6,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },
    tableHeaderCell: {
        fontSize: 8,
        padding: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRightWidth: 1,     // ✅ vertical line
        borderRightColor: '#000',
    },
    // tableDataCell: {
    //     fontSize: 9,
    //     padding: 6,
    //     textAlign: 'center',
    // },
    tableDataCell: {
        fontSize: 9,
        padding: 6,
        textAlign: 'center',
        borderRightWidth: 1,     // ✅ vertical line
        borderRightColor: '#000',
    },
    purposeCell: {
        textAlign: 'left',
        paddingLeft: 5,
    },

    amountCell: {
        textAlign: 'right',
        paddingRight: 8,
    },
    signatureBox: {
        width: 100,
        textAlign: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',   // ✅ THIS LINE FIXES IT
    },

    signatureLogo: {
        width: 70,
        height: 40,
        objectFit: 'contain',
        marginVertical: 4,
    },
    footer: {
        marginTop: 10,
        paddingTop: 8,
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },

    footerText: {
        fontSize: 8,
        color: '#666666',
    },
});

// Table Header
// const TableHeader = () => (
//     <View style={styles.tableHeader}>
//         <View style={[styles.snoColumn, styles.tableHeaderCell]}><Text>S.No</Text></View>
//         <View style={[styles.purposeColumn, styles.tableHeaderCell]}><Text>Purpose</Text></View>
//         <View style={[styles.paidAmountColumn, styles.tableHeaderCell]}><Text>Paid</Text></View>
//         <View style={[styles.dueAmountColumn, styles.tableHeaderCell]}><Text>Due</Text></View>
//     </View>
// );
const TableHeader = () => (
    <View style={styles.tableHeader}>
        <View style={[styles.snoColumn, styles.tableHeaderCell]}>
            <Text>S.No</Text>
        </View>

        <View style={[styles.purposeColumn, styles.tableHeaderCell]}>
            <Text>Purpose</Text>
        </View>

        <View style={[styles.paidAmountColumn, styles.tableHeaderCell]}>
            <Text>Paid Amount</Text>
        </View>

        {/* ❗ Last column → NO right border */}
        <View style={[styles.dueAmountColumn, styles.tableHeaderCell, { borderRightWidth: 0 }]}>
            <Text>Due Amount</Text>
        </View>
    </View>
);
// Table Row
// const TableRow = ({ rowData }) => (
//     <View style={styles.tableRow}>
//         <View style={[styles.snoColumn, styles.tableDataCell]}>
//             <Text>{rowData.sno}</Text>
//         </View>
//         <View style={[styles.purposeColumn, styles.tableDataCell, styles.purposeCell]}>
//             <Text>{rowData.PaymentReference}</Text>
//         </View>
//         <View style={[styles.paidAmountColumn, styles.tableDataCell, styles.amountCell]}>
//             <Text>{rowData.PaidAmount}</Text>
//         </View>
//         <View style={[styles.dueAmountColumn, styles.tableDataCell, styles.amountCell]}>
//             <Text>{rowData.DueAmount}</Text>
//         </View>
//     </View>
// );
const TableRow = ({ rowData }) => (
    <View style={styles.tableRow}>
        <View style={[styles.snoColumn, styles.tableDataCell]}>
            <Text>{rowData.sno}</Text>
        </View>

        <View style={[styles.purposeColumn, styles.tableDataCell, styles.purposeCell]}>
            <Text>{rowData.PaymentReference}</Text>
        </View>

        <View style={[styles.paidAmountColumn, styles.tableDataCell, styles.amountCell]}>
            <Text>{rowData.PaidAmount}</Text>
        </View>

        {/* ❗ Last column → NO right border */}
        <View style={[styles.dueAmountColumn, styles.tableDataCell, styles.amountCell, { borderRightWidth: 0 }]}>
            <Text>{rowData.DueAmount}</Text>
        </View>
    </View>
);

// Main PDF
const PaymentReceipt = ({ data, filters }) => {
    const signaturePath = filters?.CompanySignature
        ? `${filters?.Imageurl}/uploads/images/${filters.CompanySignature}`
        : null;
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View fixed style={styles.headerWrapper}>
                    {filters?.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>

                <View style={styles.container}>

                    {/* Title */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>
                            PAYMENT RECEIPT ({currentDate})
                        </Text>
                    </View>

                    {/* Receiver */}
                    <View style={styles.receiverContactSection}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.columnLabel}>Receiver Name</Text>
                            <Text style={styles.receiverName}>{data.Employee}</Text>
                        </View>

                        <View style={styles.rightColumn}>
                            <Text style={styles.columnLabel}>Contact Details</Text>
                            <Text style={styles.detailText}>{data.EmailID}</Text>
                            <Text style={styles.detailText}>{data.MobileNo}</Text>
                            <Text style={styles.detailText}>{data.Address}</Text>
                        </View>
                    </View>

                    {/* Invoice */}
                    <View style={styles.invoiceDetailsSection}>
                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Invoice No</Text>
                            <Text style={styles.invoiceValue}>{data.InvoiceNo}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Payment Mode</Text>
                            <Text style={styles.invoiceValue}>{data.PaymentMode}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Amount</Text>
                            <Text style={styles.invoiceValue}>{data.InvoiceAmount}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Already Paid</Text>
                            <Text style={styles.previousBalanceValue}>{data.PreviouslyPaid}</Text>
                        </View>
                    </View>

                    {/* Table */}
                    <View style={styles.tableSection}>
                        <Text style={styles.tableTitle}>Payment Details</Text>
                        <View style={styles.table}>
                            <TableHeader />
                            {(data?.paymentDetails || []).map((row, i) => (
                                <TableRow key={i} rowData={row} />
                            ))}
                        </View>
                    </View>
                    {/* Signature Box */}
                    <View style={styles.signatureBox}>
                        {/* <Text>For YJ Elite Academy</Text> */}
                        <Text style={styles.tableTitle}>{`For ${data?.CompanyName || ""}`}</Text>

                        {signaturePath ? (
                            <Image src={signaturePath} style={styles.signatureLogo} />
                        ) : (
                            <View style={{ width: 75, height: 15, backgroundColor: '#eee' }} />
                        )}

                        <Text style={styles.tableTitle}>Authorized Signature</Text>
                    </View>
                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Thank you for your payment!</Text>
                    </View>

                </View>

                {/* Footer Image */}
                <View fixed style={styles.footerWrapper}>
                    {filters?.FooterImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                            style={styles.footerImage}
                        />
                    )}
                </View>

            </Page>
        </Document>
    );
};

export default PaymentReceipt;

