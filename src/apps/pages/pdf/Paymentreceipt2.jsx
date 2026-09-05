
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Current Date
const currentDate = new Date().toLocaleDateString("en-GB");

// Styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 80,
        paddingBottom: 70,
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
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        overflow: "hidden",
        display: "flex",
    },

    footerImage: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
    },

    // ── Title ──────────────────────────────────────────────────────────
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

    // ── Receiver / Contact Section ─────────────────────────────────────
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
        marginTop: 16,          // slight upward shift for better vertical alignment
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
    },

    columnLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    // ── Colon-aligned rows ─────────────────────────────────────────────
    // Usage: <InfoRow label="Pupil Name" value={data.FilterEmployee} />
    infoRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },

    infoLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        width: 72,          // fixed label width → colons line up
    },

    infoColon: {
        fontSize: 9,
        fontWeight: 'bold',
        width: 10,          // fixed colon column
        textAlign: 'center',
    },

    infoValue: {
        fontSize: 9,
        flex: 1,            // takes remaining space
    },

    // ── Invoice Details ────────────────────────────────────────────────
    invoiceDetailsSection: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 2,
    },

    invoiceDetailBox: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: '#cccccc',
    },

    invoiceDetailBoxLast: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },

    invoiceLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
        letterSpacing: 0.5,
        paddingBottom: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
    },

    invoiceValue: {
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 4,
    },

    invoiceTextValue: {
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 4,
    },

    previousBalanceValue: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#d97706',
        textAlign: 'right',
        marginTop: 4,
    },

    // ── Table ──────────────────────────────────────────────────────────
    tableSection: {
        marginTop: 5,
        marginBottom: 10,
    },

    tableTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    table: {
        borderWidth: 1,
        borderColor: '#000',
    },

    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
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

    tableHeaderCell: {
        fontSize: 10,
        padding: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },

    tableDataCell: {
        fontSize: 9,
        padding: 6,
        textAlign: 'center',
        borderRightWidth: 1,
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

    // ── Signature ──────────────────────────────────────────────────────
    signatureBox: {
        width: 100,
        textAlign: 'center',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },

    signatureLogo: {
        width: 70,
        height: 40,
        objectFit: 'contain',
        marginVertical: 4,
    },

    // ── Footer text ────────────────────────────────────────────────────
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


// ── Reusable colon-aligned info row ───────────────────────────────────────────
const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoColon}>:</Text>
        <Text style={styles.infoValue}>{value || ''}</Text>
    </View>
);


// ── Table components ──────────────────────────────────────────────────────────
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
        {/* Last column — no right border */}
        <View style={[styles.dueAmountColumn, styles.tableHeaderCell, { borderRightWidth: 0 }]}>
            <Text>Due Amount</Text>
        </View>
    </View>
);

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
        {/* Last column — no right border */}
        <View style={[styles.dueAmountColumn, styles.tableDataCell, styles.amountCell, { borderRightWidth: 0 }]}>
            <Text>{rowData.DueAmount}</Text>
        </View>
    </View>
);


// ── Main PDF ──────────────────────────────────────────────────────────────────
const PaymentReceipt = ({ data, filters, footerHeight }) => {
    const signaturePath = filters?.CompanySignature
        ? `${filters?.Imageurl}/uploads/images/${filters.CompanySignature}`
        : null;

    return (
        <Document>
            <Page
                size="A4"
                // style={styles.page}
                style={{
                    fontFamily: "Helvetica",
                    //   fontSize: 8,
                    backgroundColor: "#ffffff",
                    paddingTop: 80,
                    // paddingBottom: 36,
                    paddingBottom: footerHeight,
                    paddingHorizontal: 30,
                }}
            >

                {/* ── Header Image ── */}
                <View fixed style={styles.headerWrapper}>
                    {filters?.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>

                <View style={styles.container}>

                    {/* ── Title ── */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>
                            Payment Receipt ({currentDate})
                        </Text>
                    </View>

                    {/* ── Receiver & Contact ── */}
                    <View style={styles.receiverContactSection}>

                        {/* Left — receiver details */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.columnLabel}>Receiver Details:</Text>
                            <InfoRow label="Enroll No" value={data.EmployeeID} />
                            <InfoRow label="Pupil Name" value={data.FilterEmployee} />
                            <InfoRow label="Parent Name" value={data.Employee} />
                        </View>

                        {/* Right — contact info */}
                        <View style={styles.rightColumn}>
                            <InfoRow label="Email" value={data.EmailID} />
                            <InfoRow label="Mobile" value={data.MobileNo} />
                            <InfoRow label="Address" value={data.Address} />
                        </View>

                    </View>

                    {/* ── Invoice Details ── */}
                    <View style={styles.invoiceDetailsSection}>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Invoice No.</Text>
                            <Text style={styles.invoiceTextValue}>{data.InvoiceNo}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Payment Mode</Text>
                            <Text style={styles.invoiceTextValue}>{data.PaymentMode}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Amount</Text>
                            <Text style={styles.invoiceValue}>{data.InvoiceAmount}</Text>
                        </View>

                        <View style={styles.invoiceDetailBoxLast}>
                            <Text style={styles.invoiceLabel}>Already Paid</Text>
                            <Text style={styles.previousBalanceValue}>{data.PreviouslyPaid}</Text>
                        </View>

                    </View>

                    {/* ── Payment Details Table ── */}
                    <View style={styles.tableSection}>
                        <Text style={styles.tableTitle}>Payment Details</Text>
                        <View style={styles.table}>
                            <TableHeader />
                            {(data?.paymentDetails || []).map((row, i) => (
                                <TableRow key={i} rowData={row} />
                            ))}
                        </View>
                    </View>

                    {/* ── Signature ── */}
                    <View style={styles.signatureBox}>
                        <Text style={styles.tableTitle}>{`For ${data?.CompanyName || ""}`}</Text>
                        {signaturePath ? (
                            <Image src={signaturePath} style={styles.signatureLogo} />
                        ) : (
                            <View style={{ width: 75, height: 15, backgroundColor: '#eee' }} />
                        )}
                        <Text style={styles.tableTitle}>Authorized Signature</Text>
                    </View>

                    {/* ── Footer Text ── */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Thank you for your payment!</Text>
                    </View>

                </View>

                {/* ── Footer Image ── */}
                <View
                    fixed
                    // style={styles.footerWrapper}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: footerHeight, // 🔥 dynamic
                    }}
                >
                    {filters?.FooterImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                            // style={styles.footerImage}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    )}
                </View>

            </Page>
        </Document>
    );
};

export default PaymentReceipt;


