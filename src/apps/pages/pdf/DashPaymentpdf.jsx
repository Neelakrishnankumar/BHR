import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Current Date
const currentDate = new Date().toLocaleDateString("en-GB");

// Styles
const styles = StyleSheet.create({
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

    subTitle: {
        fontSize: 9,
        color: '#666666',
        textAlign: 'center',
        marginTop: 3,
    },

    // ── Invoice header details (Invoice No / Date / Purpose / Status) ──
    headerDetailsSection: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    headerDetailsColumn: {
        flex: 1,
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
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
    },

    columnLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    // ── Colon-aligned rows ─────────────────────────────────────────────
    infoRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },

    infoLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        width: 72,
    },

    infoColon: {
        fontSize: 9,
        fontWeight: 'bold',
        width: 10,
        textAlign: 'center',
    },

    infoValue: {
        fontSize: 9,
        flex: 1,
    },

    // ── Summary (header totals: amount / paid / due) ────────────────────
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
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 4,
    },

    invoiceTextValue: {
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
    },

    previousBalanceValue: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#d97706',
        textAlign: 'right',
        marginTop: 4,
    },

    // ── Table (one row per DetailData payment transaction) ─────────────
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

    tableFooterRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#000',
    },

    // Column widths — must sum to 100%
    snoColumn: { width: '7%' },
    titleColumn: { width: '17%' },
    dateColumn: { width: '11%' },
    paymentModeColumn: { width: '14%' },
    referenceColumn: { width: '20%' },
    paidColumn: { width: '13%' },
    dueColumn: { width: '10%' },
    statusColumn: { width: '8%' },

    tableHeaderCell: {
        fontSize: 9,
        padding: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },

    tableDataCell: {
        fontSize: 8,
        padding: 6,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },

    titleCell: {
        textAlign: 'left',
        paddingLeft: 5,
    },

    referenceCell: {
        textAlign: 'left',
        paddingLeft: 5,
    },

    amountCell: {
        textAlign: 'right',
        paddingRight: 4,
    },

    tableFooterLabelCell: {
        fontSize: 9,
        fontWeight: 'bold',
        padding: 6,
        textAlign: 'right',
        paddingRight: 8,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },

    tableFooterValueCell: {
        fontSize: 8,
        fontWeight: 'bold',
        padding: 6,
        textAlign: 'right',
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
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

// ── Reusable colon-aligned info row ───────────────────────────────────────
const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoColon}>:</Text>
        <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
);

// Formats a number as a plain 2-decimal amount string, defaulting to "0.00"
const fmtAmount = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toFixed(2);
};

// "P00004 || 6th Standard A Sec || Month Fee" -> "Month Fee"
const getPurpose = (header) => {
    if (!header?.Project) return "Fee";
    const parts = header.Project.split("||").map((s) => s.trim()).filter(Boolean);
    return parts[parts.length - 1] || "Fee";
};

// Every DetailData row for a header shares the same InvoiceNo. Fall back to
// a generated one from the header's RecordID if DetailData is ever empty.
const getInvoiceNo = (header, detailData) =>
    detailData?.[0]?.InvoiceNo || `IH${String(header?.RecordID ?? "").padStart(5, "0")}`;

const getStatus = (header) => {
    const due = Number(header?.Due ?? 0);
    const paid = Number(header?.PaidAmount ?? 0);
    if (due <= 0) return "Paid";
    if (paid > 0) return "Partially Paid";
    return "Pending";
};

// "EMP00009 || Sathish" -> "Sathish"
const splitName = (raw) => {
    if (!raw) return "";
    const [name] = raw.split("||").map((s) => s.trim());
    return name || raw;
};

// ── Table components ────────────────────────────────────────────────────
const TableHeader = () => (
    <View style={styles.tableHeader}>
        <View style={[styles.snoColumn, styles.tableHeaderCell]}>
            <Text>S.No</Text>
        </View>
        <View style={[styles.titleColumn, styles.tableHeaderCell]}>
            <Text>Title</Text>
        </View>
        <View style={[styles.dateColumn, styles.tableHeaderCell]}>
            <Text>Date</Text>
        </View>
        <View style={[styles.paymentModeColumn, styles.tableHeaderCell]}>
            <Text>Mode</Text>
        </View>
        <View style={[styles.referenceColumn, styles.tableHeaderCell]}>
            <Text>Reference</Text>
        </View>
        <View style={[styles.paidColumn, styles.tableHeaderCell]}>
            <Text>Paid</Text>
        </View>
        <View style={[styles.dueColumn, styles.tableHeaderCell]}>
            <Text>Due</Text>
        </View>
        {/* Last column — no right border */}
        <View style={[styles.statusColumn, styles.tableHeaderCell, { borderRightWidth: 0 }]}>
            <Text>Status</Text>
        </View>
    </View>
);

const TableRow = ({ rowData, sno }) => (
    <View style={styles.tableRow}>
        <View style={[styles.snoColumn, styles.tableDataCell]}>
            <Text>{sno}</Text>
        </View>
        <View style={[styles.titleColumn, styles.tableDataCell, styles.titleCell]}>
            <Text>{rowData.InvoiceTitle || "-"}</Text>
        </View>
        <View style={[styles.dateColumn, styles.tableDataCell]}>
            <Text>{rowData.InvoiceDate || "-"}</Text>
        </View>
        <View style={[styles.paymentModeColumn, styles.tableDataCell,{textAlign: 'left'}]}>
            <Text>{rowData.PaymentMode || "-"}</Text>
        </View>
        <View style={[styles.referenceColumn, styles.tableDataCell, styles.referenceCell]}>
            <Text>{rowData.PaymentRefereance || "-"}</Text>
        </View>
        <View style={[styles.paidColumn, styles.tableDataCell, styles.amountCell, { textAlign: 'right' }]}>
            <Text>{fmtAmount(rowData.PaidAmount)}</Text>
        </View>
        <View style={[styles.dueColumn, styles.tableDataCell, styles.amountCell, { textAlign: 'right' }]}>
            <Text>{fmtAmount(rowData.Due)}</Text>
        </View>
        {/* Last column — no right border */}
        <View style={[styles.statusColumn, styles.tableDataCell, {textAlign: 'left',borderRightWidth: 0 }]}>
            <Text>{rowData.InvoiceStatus || "-"}</Text>
        </View>
    </View>
);

const TableFooter = ({ totalPaid, finalDue }) => (
    <View style={styles.tableFooterRow}>
        <View style={[{ width: '69%' }, styles.tableFooterLabelCell]}>
            <Text>Total</Text>
        </View>
        <View style={[styles.paidColumn, styles.tableFooterValueCell, { textAlign: 'right' }]}>
            <Text>{fmtAmount(totalPaid)}</Text>
        </View>
        <View style={[styles.dueColumn, styles.tableFooterValueCell, { textAlign: 'right' }]}>
            <Text>{fmtAmount(finalDue)}</Text>
        </View>
        {/* Last column — no right border */}
        <View style={[styles.statusColumn, styles.tableFooterValueCell, { borderRightWidth: 0 }]}>
            <Text></Text>
        </View>
    </View>
);

// ── Main PDF: ONE document per invoice header, listing every DetailData
// payment transaction underneath it ─────────────────────────────────────
const DashPaymentReceipt = ({ header, detailData, filters, footerHeight }) => {
    const signaturePath = filters?.CompanySignature
        ? `${filters?.Imageurl}/uploads/images/${filters.CompanySignature}`
        : null;

    const rows = Array.isArray(detailData) ? detailData : [];
    const firstRow = rows[0] || {};

    if (!header) {
        return (
            <Document>
                <Page size="A4" style={{ padding: 30, fontSize: 10 }}>
                    <Text>No invoice data available</Text>
                </Page>
            </Document>
        );
    }

    const invoiceNo = getInvoiceNo(header, rows);
    const purpose = getPurpose(header);
    const status = getStatus(header);

    // Sum of each transaction's paid amount, as a cross-check against the
    // header's own PaidAmount total.
    const totalPaid = rows.reduce((sum, r) => sum + (parseFloat(r.PaidAmount) || 0), 0);
    const finalDue = rows.length > 0 ? rows[rows.length - 1].Due : header.Due;

    return (
        <Document>
            <Page
                size="A4"
                style={{
                    fontFamily: "Helvetica",
                    backgroundColor: "#ffffff",
                    paddingTop: 80,
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
                        {/* <Text style={styles.subTitle}>
                            Invoice No: {invoiceNo}
                        </Text> */}
                    </View>

                    {/* ── Invoice header details: No / Date / Purpose / Status ── */}
                    <View style={styles.headerDetailsSection}>
                        <View style={styles.headerDetailsColumn}>
                            <InfoRow label="Invoice No" value={invoiceNo} />
                            <InfoRow label="Invoice Date" value={header.InvoiceDate} />
                        </View>
                        <View style={styles.headerDetailsColumn}>
                            <InfoRow label="Purpose" value={purpose} />
                            <InfoRow label="Status" value={status} />
                        </View>
                    </View>

                    {/* ── Receiver & Contact (from the DetailData rows) ── */}
                    <View style={styles.receiverContactSection}>

                        {/* Left — receiver details */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.columnLabel}>Receiver Details:</Text>
                            <InfoRow label="Enroll No" value={firstRow.EmployeeCode || header.EmployeeID} />
                            <InfoRow label="Pupil Name" value={header.FilterEmployee} />
                            <InfoRow label="Parent Name" value={splitName(header.Employee)} />
                        </View>

                        {/* Right — contact info */}
                        <View style={styles.rightColumn}>
                            <InfoRow label="Email" value={firstRow.ReceiverEmailID} />
                            <InfoRow label="Mobile" value={firstRow.ReceiverMobileNo} />
                            <InfoRow label="Address" value={firstRow.ReceiverAddress} />
                        </View>

                    </View>

                    {/* ── Header Summary: Total / Paid / Due ── */}
                    <View style={styles.invoiceDetailsSection}>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Total Amount</Text>
                            <Text style={styles.invoiceValue}>{fmtAmount(header.TotalAmount)}</Text>
                        </View>

                        <View style={styles.invoiceDetailBox}>
                            <Text style={styles.invoiceLabel}>Total Paid</Text>
                            <Text style={styles.invoiceValue}>{fmtAmount(header.PaidAmount)}</Text>
                        </View>

                        <View style={styles.invoiceDetailBoxLast}>
                            <Text style={styles.invoiceLabel}>Total Due</Text>
                            <Text style={styles.previousBalanceValue}>{fmtAmount(header.Due)}</Text>
                        </View>

                    </View>

                    {/* ── Detail Table — one row per DetailData transaction ── */}
                    <View style={styles.tableSection}>
                        <Text style={styles.tableTitle}>Payment Transactions</Text>
                        {rows.length === 0 ? (
                            <Text style={{ fontSize: 9, color: '#666666' }}>
                                No payment transactions recorded for this invoice yet.
                            </Text>
                        ) : (
                            <View style={styles.table}>
                                <TableHeader />
                                {rows.map((row, i) => (
                                    <TableRow key={row.RecordID ?? i} rowData={row} sno={i + 1} />
                                ))}
                                <TableFooter totalPaid={totalPaid} finalDue={finalDue} />
                            </View>
                        )}
                    </View>

                    {/* ── Signature ── */}
                    <View style={styles.signatureBox}>
                        <Text style={styles.tableTitle}>{`For ${firstRow.CompanyName || ""}`}</Text>
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
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    {filters?.FooterImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
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

export default DashPaymentReceipt;
// import React from 'react';
// import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// // Current Date
// const currentDate = new Date().toLocaleDateString("en-GB");

// // Styles
// const styles = StyleSheet.create({
//     page: {
//         paddingTop: 80,
//         paddingBottom: 70,
//         paddingHorizontal: 30,
//         backgroundColor: '#ffffff',
//         fontFamily: 'Helvetica',
//     },

//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//     },

//     headerWrapper: {
//         position: "absolute",
//         top: 10,
//         left: 30,
//         right: 30,
//         height: 50,
//         alignItems: "center",
//     },

//     headerImage: {
//         width: "100%",
//         height: 60,
//         objectFit: "contain",
//     },

//     footerWrapper: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 60,
//         overflow: "hidden",
//         display: "flex",
//     },

//     footerImage: {
//         width: "100%",
//         height: "100%",
//         objectFit: "fill",
//     },

//     // ── Title ──────────────────────────────────────────────────────────
//     titleSection: {
//         marginBottom: 15,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#cccccc',
//     },

//     title: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },

//     subTitle: {
//         fontSize: 9,
//         color: '#666666',
//         textAlign: 'center',
//         marginTop: 3,
//     },

//     // ── Receiver / Contact Section ─────────────────────────────────────
//     receiverContactSection: {
//         flexDirection: 'row',
//         marginBottom: 12,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },

//     leftColumn: {
//         flex: 1,
//         paddingRight: 20,
//     },

//     rightColumn: {
//         flex: 1,
//         paddingLeft: 20,
//         marginTop: 16,
//         borderLeftWidth: 1,
//         borderLeftColor: '#e0e0e0',
//     },

//     columnLabel: {
//         fontSize: 10,
//         fontWeight: 'bold',
//         marginBottom: 6,
//     },

//     // ── Colon-aligned rows ─────────────────────────────────────────────
//     infoRow: {
//         flexDirection: 'row',
//         marginBottom: 3,
//     },

//     infoLabel: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         width: 72,
//     },

//     infoColon: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         width: 10,
//         textAlign: 'center',
//     },

//     infoValue: {
//         fontSize: 9,
//         flex: 1,
//     },

//     // ── Summary (aggregate totals across all invoices) ───────────────────
//     invoiceDetailsSection: {
//         flexDirection: 'row',
//         marginBottom: 15,
//         paddingBottom: 10,
//         borderWidth: 1,
//         borderColor: '#cccccc',
//         borderRadius: 2,
//     },

//     invoiceDetailBox: {
//         flex: 1,
//         paddingVertical: 8,
//         paddingHorizontal: 10,
//         borderRightWidth: 1,
//         borderRightColor: '#cccccc',
//     },

//     invoiceDetailBoxLast: {
//         flex: 1,
//         paddingVertical: 8,
//         paddingHorizontal: 10,
//     },

//     invoiceLabel: {
//         fontSize: 10,
//         fontWeight: 'bold',
//         marginBottom: 4,
//         textAlign: 'center',
//         letterSpacing: 0.5,
//         paddingBottom: 4,
//         borderBottomWidth: 0.5,
//         borderBottomColor: '#cccccc',
//     },

//     invoiceValue: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         textAlign: 'right',
//         marginTop: 4,
//     },

//     invoiceTextValue: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         textAlign: 'left',
//         marginTop: 4,
//     },

//     previousBalanceValue: {
//         fontSize: 9,
//         fontWeight: 'bold',
//         color: '#d97706',
//         textAlign: 'right',
//         marginTop: 4,
//     },

//     // ── Table (one row per invoice) ───────────────────────────────────────
//     tableSection: {
//         marginTop: 5,
//         marginBottom: 10,
//     },

//     tableTitle: {
//         fontSize: 10,
//         fontWeight: 'bold',
//         marginBottom: 6,
//     },

//     table: {
//         borderWidth: 1,
//         borderColor: '#000',
//     },

//     tableHeader: {
//         flexDirection: 'row',
//         backgroundColor: '#f5f5f5',
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//     },

//     tableRow: {
//         flexDirection: 'row',
//         borderBottomWidth: 0.5,
//         borderBottomColor: '#e0e0e0',
//     },

//     tableFooterRow: {
//         flexDirection: 'row',
//         backgroundColor: '#f5f5f5',
//         borderTopWidth: 1,
//         borderTopColor: '#000',
//     },

//     // Column widths — must sum to 100%
//     snoColumn: { width: '7%' },
//     purposeColumn: { width: '19%' },
//     invoiceNoColumn: { width: '10%' },
//     dateColumn: { width: '10%' },
//     paymentModeColumn: { width: '10%' },
//     amountColumn: { width: '12%' },
//     paidColumn: { width: '12%' },
//     dueColumn: { width: '10%' },
//     statusColumn: { width: '10%' },

//     tableHeaderCell: {
//         fontSize: 10,
//         padding: 6,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         borderRightWidth: 1,
//         borderRightColor: '#000',
//     },

//     tableDataCell: {
//         fontSize: 8,
//         padding: 6,
//         textAlign: 'center',
//         borderRightWidth: 1,
//         borderRightColor: '#000',
//     },

//     purposeCell: {
//         textAlign: 'left',
//         paddingLeft: 5,
//     },

//     amountCell: {
//         textAlign: 'right',
//         paddingRight: 4,
//     },

//     tableFooterLabelCell: {
//         fontSize: 10,
//         fontWeight: 'bold',
//         padding: 6,
//         textAlign: 'right',
//         paddingRight: 8,
//         borderRightWidth: 1,
//         borderRightColor: '#000',
//     },

//     tableFooterValueCell: {
//         fontSize: 8,
//         fontWeight: 'bold',
//         padding: 6,
//         textAlign: 'right',
//         paddingRight: 5,
//         borderRightWidth: 1,
//         borderRightColor: '#000',
//     },

//     // ── Signature ──────────────────────────────────────────────────────
//     signatureBox: {
//         width: 100,
//         textAlign: 'center',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         alignSelf: 'flex-end',
//     },

//     signatureLogo: {
//         width: 70,
//         height: 40,
//         objectFit: 'contain',
//         marginVertical: 4,
//     },

//     // ── Footer text ────────────────────────────────────────────────────
//     footer: {
//         marginTop: 10,
//         paddingTop: 8,
//         textAlign: 'center',
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//     },

//     footerText: {
//         fontSize: 8,
//         color: '#666666',
//     },
// });


// // ── Reusable colon-aligned info row ───────────────────────────────────────────
// const InfoRow = ({ label, value }) => (
//     <View style={styles.infoRow}>
//         <Text style={styles.infoLabel}>{label}</Text>
//         <Text style={styles.infoColon}>:</Text>
//         <Text style={styles.infoValue}>{value || ''}</Text>
//     </View>
// );

// // Formats a number as a plain 2-decimal amount string, defaulting to "0.00"
// const fmtAmount = (val) => {
//     const num = parseFloat(val);
//     return isNaN(num) ? "0.00" : num.toFixed(2);
// };


// // ── Table components ──────────────────────────────────────────────────────────
// const TableHeader = () => (
//     <View style={styles.tableHeader}>
//         <View style={[styles.snoColumn, styles.tableHeaderCell]}>
//             <Text>S.No</Text>
//         </View>
//         <View style={[styles.purposeColumn, styles.tableHeaderCell]}>
//             <Text>Purpose</Text>
//         </View>
//         <View style={[styles.invoiceNoColumn, styles.tableHeaderCell]}>
//             <Text>Invoice No</Text>
//         </View>
//         <View style={[styles.dateColumn, styles.tableHeaderCell]}>
//             <Text>Date</Text>
//         </View>
//         <View style={[styles.paymentModeColumn, styles.tableHeaderCell]}>
//             <Text>Mode</Text>
//         </View>
//         <View style={[styles.amountColumn, styles.tableHeaderCell]}>
//             <Text>Amount</Text>
//         </View>
//         <View style={[styles.paidColumn, styles.tableHeaderCell]}>
//             <Text>Paid</Text>
//         </View>
//         <View style={[styles.dueColumn, styles.tableHeaderCell]}>
//             <Text>Due</Text>
//         </View>
//         {/* Last column — no right border */}
//         <View style={[styles.statusColumn, styles.tableHeaderCell, { borderRightWidth: 0 }]}>
//             <Text>Status</Text>
//         </View>
//     </View>
// );

// const TableRow = ({ rowData, sno }) => (
//     <View style={styles.tableRow}>
//         <View style={[styles.snoColumn, styles.tableDataCell]}>
//             <Text>{sno}</Text>
//         </View>
//         <View style={[styles.purposeColumn, styles.tableDataCell, styles.purposeCell]}>
//             <Text>{rowData.title}</Text>
//         </View>
//         <View style={[styles.invoiceNoColumn, styles.tableDataCell]}>
//             <Text>{rowData.InvoiceNo}</Text>
//         </View>
//         <View style={[styles.dateColumn, styles.tableDataCell]}>
//             <Text>{rowData.issuedDate}</Text>
//         </View>
//         <View style={[styles.paymentModeColumn, styles.tableDataCell]}>
//             <Text>{rowData.PaymentMode}</Text>
//         </View>
//         <View style={[styles.amountColumn, styles.tableDataCell, styles.amountCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(rowData.InvoiceAmount)}</Text>
//         </View>
//         <View style={[styles.paidColumn, styles.tableDataCell, styles.amountCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(rowData.PaidAmount)}</Text>
//         </View>
//         <View style={[styles.dueColumn, styles.tableDataCell, styles.amountCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(rowData.Due)}</Text>
//         </View>
//         {/* Last column — no right border */}
//         <View style={[styles.statusColumn, styles.tableDataCell, { borderRightWidth: 0 }]}>
//             <Text>{rowData.InvoiceStatus}</Text>
//         </View>
//     </View>
// );

// const TableFooter = ({ totalAmount, totalPaid, totalDue }) => (
//     <View style={styles.tableFooterRow}>
//         <View style={[{ width: '56%' }, styles.tableFooterLabelCell]}>
//             <Text>Total</Text>
//         </View>
//         <View style={[styles.amountColumn, styles.tableFooterValueCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(totalAmount)}</Text>
//         </View>
//         <View style={[styles.paidColumn, styles.tableFooterValueCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(totalPaid)}</Text>
//         </View>
//         <View style={[styles.dueColumn, styles.tableFooterValueCell, { textAlign: 'right' }]}>
//             <Text>{fmtAmount(totalDue)}</Text>
//         </View>
//         {/* Last column — no right border */}
//         <View style={[styles.statusColumn, styles.tableFooterValueCell, { borderRightWidth: 0 }]}>
//             <Text></Text>
//         </View>
//     </View>
// );


// // ── Main PDF: ONE document listing every invoice as a row ─────────────────────
// const DashPaymentReceipt = ({ data, filters, footerHeight }) => {
//     const signaturePath = filters?.CompanySignature
//         ? `${filters?.Imageurl}/uploads/images/${filters.CompanySignature}`
//         : null;

//     const invoiceList = data?.invoices || [];

//     // Aggregate totals across every invoice in the list
//     const totals = invoiceList.reduce(
//         (acc, inv) => {
//             acc.amount += parseFloat(inv.InvoiceAmount) || 0;
//             acc.paid += parseFloat(inv.PaidAmount) || 0;
//             acc.due += parseFloat(inv.Due) || 0;
//             return acc;
//         },
//         { amount: 0, paid: 0, due: 0 },
//     );

//     return (
//         <Document>
//             <Page
//                 size="A4"
//                 style={{
//                     fontFamily: "Helvetica",
//                     backgroundColor: "#ffffff",
//                     paddingTop: 80,
//                     paddingBottom: footerHeight,
//                     paddingHorizontal: 30,
//                 }}
//             >

//                 {/* ── Header Image ── */}
//                 <View fixed style={styles.headerWrapper}>
//                     {filters?.HeaderImg && (
//                         <Image
//                             src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                             style={styles.headerImage}
//                         />
//                     )}
//                 </View>

//                 <View style={styles.container}>

//                     {/* ── Title ── */}
//                     <View style={styles.titleSection}>
//                         <Text style={styles.title}>
//                             Fee Payment Statement ({currentDate})
//                         </Text>
//                         {data?.AcademicYear ? (
//                             <Text style={styles.subTitle}>
//                                 Academic Year: {data.AcademicYear}
//                             </Text>
//                         ) : null}
//                     </View>

//                     {/* ── Receiver & Contact ── */}
//                     <View style={styles.receiverContactSection}>

//                         {/* Left — receiver details */}
//                         <View style={styles.leftColumn}>
//                             <Text style={styles.columnLabel}>Receiver Details:</Text>
//                             <InfoRow label="Enroll No" value={data.EmployeeID} />
//                             <InfoRow label="Pupil Name" value={data.FilterEmployee} />
//                             <InfoRow label="Parent Name" value={data.Employee} />
//                         </View>

//                         {/* Right — contact info */}
//                         <View style={styles.rightColumn}>
//                             <InfoRow label="Email" value={data.EmailID} />
//                             <InfoRow label="Mobile" value={data.MobileNo} />
//                             <InfoRow label="Address" value={data.Address} />
//                         </View>

//                     </View>

//                     {/* ── Aggregate Summary (across all invoices) ── */}
//                     <View style={styles.invoiceDetailsSection}>

//                         {/* <View style={styles.invoiceDetailBox}>
//                             <Text style={styles.invoiceLabel}>Total Invoices</Text>
//                             <Text style={styles.invoiceTextValue}>{invoiceList.length}</Text>
//                         </View> */}

//                         <View style={styles.invoiceDetailBox}>
//                             <Text style={styles.invoiceLabel}>Total Amount</Text>
//                             <Text style={styles.invoiceValue}>{fmtAmount(totals.amount)}</Text>
//                         </View>

//                         <View style={styles.invoiceDetailBox}>
//                             <Text style={styles.invoiceLabel}>Total Paid</Text>
//                             <Text style={styles.invoiceValue}>{fmtAmount(totals.paid)}</Text>
//                         </View>

//                         <View style={styles.invoiceDetailBoxLast}>
//                             <Text style={styles.invoiceLabel}>Total Due</Text>
//                             <Text style={styles.previousBalanceValue}>{fmtAmount(totals.due)}</Text>
//                         </View>

//                     </View>

//                     {/* ── Invoice Table — one row per invoice ── */}
//                     <View style={styles.tableSection}>
//                         <Text style={styles.tableTitle}>Payment Details</Text>
//                         <View style={styles.table}>
//                             <TableHeader />
//                             {invoiceList.map((row, i) => (
//                                 <TableRow key={row.id ?? i} rowData={row} sno={i + 1} />
//                             ))}
//                             <TableFooter
//                                 totalAmount={totals.amount}
//                                 totalPaid={totals.paid}
//                                 totalDue={totals.due}
//                             />
//                         </View>
//                     </View>

//                     {/* ── Signature ── */}
//                     <View style={styles.signatureBox}>
//                         <Text style={styles.tableTitle}>{`For ${data?.CompanyName || ""}`}</Text>
//                         {signaturePath ? (
//                             <Image src={signaturePath} style={styles.signatureLogo} />
//                         ) : (
//                             <View style={{ width: 75, height: 15, backgroundColor: '#eee' }} />
//                         )}
//                         <Text style={styles.tableTitle}>Authorized Signature</Text>
//                     </View>

//                     {/* ── Footer Text ── */}
//                     <View style={styles.footer}>
//                         <Text style={styles.footerText}>Thank you for your payment!</Text>
//                     </View>

//                 </View>

//                 {/* ── Footer Image ── */}
//                 <View
//                     fixed
//                     style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         // height: footerHeight,
//                     }}
//                 >
//                     {filters?.FooterImg && (
//                         <Image
//                             src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                             style={{
//                                 width: "100%",
//                                 height: "100%",
//                             }}
//                         />
//                     )}
//                 </View>

//             </Page>
//         </Document>
//     );
// };

// export default DashPaymentReceipt;