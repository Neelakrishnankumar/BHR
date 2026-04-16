import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
    Image,
} from '@react-pdf/renderer';


Font.register({
    family: 'Helvetica-Bold',
    fonts: [{ src: undefined, fontWeight: 'bold' }],
});

const styles = StyleSheet.create({
    page: {
        padding: 16,
        fontSize: 10,
        fontFamily: 'Helvetica',
        lineHeight: 1.25,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    logo: {
        width: 560,
        height: 90,
        objectFit: 'contain',
    },
    footerImage: {
        width: '100%',
        height: 70,
        objectFit: 'contain',
    },
    companyInfo: {
        flex: 1,
        textAlign: 'center',
        marginLeft: 5,
    },
    companyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    small: {
        fontSize: 8,
        marginTop: 8,

    },
    invoiceBox: {
        width: 220,
        borderWidth: 1,
        borderColor: '#000',
        padding: 6,
    },
    billingHeader: {
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 4,
        paddingLeft: 6,
    },

    billingRow: {
        flexDirection: 'row',
        marginBottom: 3,
    },

    billingLabel: {
        width: 80,
        fontSize: 9,
        fontWeight: 'bold',
    },

    billingColon: {
        width: 5,
        fontSize: 9,
        textAlign: 'center',
    },

    billingValue: {
        flex: 1,
        fontSize: 9,
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 8,
    },
    tableHeaderRow: {
        textAlign: 'center',
        flexDirection: 'row',
        // backgroundColor: '#48a115ff',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        // color: '#FFFFFF',
        color: '#000',
        
    },

    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    tableRowBelow: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#000' },
    cell: { padding: 4, borderRightWidth: 1, borderRightColor: '#ddd' },
    cellSmall: { width: 30 },
    cellMedium: { width: 80 },
    cellLarge: { flex: 1 },
    spacer: {
        flexGrow: 1,
    },

    footer: {
        paddingTop: 6,
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    footerBox: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 6,
        width: '100%',
    },
    // footerBox2: {
    //   width: '100%',       
    //   alignItems: 'center',
    // },

    signatureBox: {
        width: 150,
        textAlign: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    signatureLogo: {
        width: 70,
        height: 40,
        objectFit: 'contain',
        marginVertical: 4,
    },

    footerTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    terms: {
        fontSize: 8,
        marginBottom: 2,
    },

    bankBox: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 6,
        borderRadius: 4,
        marginTop: 3,
    },

    bankRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bankLabel: {
        width: 120,
        fontSize: 8,
        marginBottom: 2,
    },
    bankColon: {
        width: 10,
        fontSize: 10,
    },
    bankValue: {
        fontSize: 8,
    },
    qrImage: {
        width: 80,
        height: 80,
        marginTop: 4,
    },
    footerContainer: {
        backgroundColor: '#147A9B',    // Teal background
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderTopWidth: 8,
        borderTopColor: '#F5C542',     // Yellow top strip
        marginTop: 10,
    },

    footerTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 6,
    },

    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',  // center entire row
        marginBottom: 3,
    },

    icon: {
        width: 10,
        height: 10,
        marginRight: 4,
        marginTop: 2,
    },

    footerText: {
        fontSize: 10,
        color: '#ffffff',
        textAlign: 'center',
    },
    attendanceContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#000",
        padding: 8,
    },

    attendanceHeader: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 6,
        textAlign: "center",
        // textTransform: "uppercase",
    },

    attendanceTable: {
        width: "70%",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
    },

    attendanceTableWrapper: {
        width: "100%",
        alignItems: "center", // centers the table horizontally
        marginTop: 10
    },
    attendanceRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },

    attendanceRowLast: {
        flexDirection: "row",
    },

    colheader1: { width: "7%", padding: 4, fontSize: 10, fontWeight: 'bold', borderRightWidth: 1, textAlign: "center", justifyContent: "center" },
    // colheaderName: { width: 120, padding: 4, fontSize: 10, fontWeight: 'bold', borderRightWidth: 1, textAlign: "center", justifyContent: "center" },
    colheaderDate: { width: "30%", padding: 4, fontSize: 10, fontWeight: 'bold', borderRightWidth: 1, textAlign: "center", justifyContent: "center" },
    colheaderCheckIn: { width: "25%", padding: 4, fontSize: 10, fontWeight: 'bold', borderRightWidth: 1, textAlign: "center", justifyContent: "center" },
    colheaderCheckOut: { width: "25%", padding: 4, fontSize: 10, fontWeight: 'bold', borderRightWidth: 1, textAlign: "center", justifyContent: "center" },
    colheaderHours: { width: "13%", padding: 4, fontSize: 10, fontWeight: 'bold', textAlign: "center", justifyContent: "center" },
    // colheaderStatus: { width: 100, padding: 4, fontSize: 10, fontWeight: 'bold', textAlign: "center", justifyContent: "center" },

    col1: { width: "7%", padding: 4, fontSize: 9, borderRightWidth: 1 },
    // colName: { width: 120, padding: 4, fontSize: 9, borderRightWidth: 1 },
    colheaderdate: { width: "30%", padding: 4, fontSize: 9, borderRightWidth: 1 },
    colCheckIn: { width: "25%", padding: 4, fontSize: 9, borderRightWidth: 1 },
    colCheckOut: { width: "25%", padding: 4, fontSize: 9, borderRightWidth: 1 },
    colHours: { width: "13%", padding: 4, fontSize: 9, textAlign: "center" },
    // colStatus: { width: 100, padding: 4, fontSize: 9 },

    summaryContainer: {
        marginTop: 10,
        padding: 6,
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    summaryText: {
        fontSize: 10,
        fontWeight: "bold",
    },

});
const staticAttendanceRows = [
    {
        SLNO: 1,
        Name: "John Doe",
        EmplyeeCheckInDateTime: "09:05 AM",
        EmplyeeCheckOutDateTime: "05:45 PM",
        NumberOfHoursWorked: "08:40",
        Status: "Present",
    },
    {
        SLNO: 2,
        Name: "Arun Kumar",
        EmplyeeCheckInDateTime: "09:30 AM",
        EmplyeeCheckOutDateTime: "04:15 PM",
        NumberOfHoursWorked: "06:45",
        Status: "Permission",
    },
    {
        SLNO: 3,
        Name: "Meena",
        EmplyeeCheckInDateTime: "09:30 AM",
        EmplyeeCheckOutDateTime: "04:15 PM",
        NumberOfHoursWorked: "06:45",
        Status: "Present",
    },

];

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export default function ContractCashMemo({ invoice = [], detailData = [], logoUrl, qrUrl, totalHours, signUrl, headerUrl, footerUrl, data = [], withannexure,
    filters = {} }) {

    const formattedDate = filters.Date
        ? filters.Date.split("-").reverse().join("-")
        : "";
    const isGSTZero = invoice?.CGST === "0.00";

    const items = Array.isArray(invoice) ? invoice : [invoice];
    const attendancedata = Array.isArray(detailData) ? detailData : [detailData];
    // const QR_BASE_URL = "https://uaam.beyondexs.com/uploads/images/";  // your image folder path
    const QR_BASE_URL = `${filters.baseUrl}uploads/images/`;  

    const qrFullPath = invoice?.QRCode
        ? `${QR_BASE_URL}${invoice.QRCode}`
        : null;
    const signaturePath = invoice?.Signature
        ? `${QR_BASE_URL}${invoice.Signature}`
        : null;
    const headerPath = invoice?.Header
        ? `${QR_BASE_URL}${invoice.Header}`
        : null;
    const footerPath = invoice?.Footer
        ? `${QR_BASE_URL}${invoice.Footer}`
        : null;

    // const inWords = (n) => {
    //     if (n < 20) return a[n];
    //     if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    //     if (n < 1000)
    //         return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + inWords(n % 100) : "");
    //     if (n < 100000)
    //         return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    //     if (n < 10000000)
    //         return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
    //     return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
    // };
    const inWords = (num) => {
        num = Number(num);

        if (isNaN(num)) return "Zero";
        if (num === 0) return "Zero";

        num = Math.floor(num);

        const a = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
            "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
            "Sixteen", "Seventeen", "Eighteen", "Nineteen"
        ];

        const b = [
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
            "Eighty", "Ninety"
        ];

        const helper = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
            if (n < 1000)
                return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + helper(n % 100) : "");
            if (n < 100000)
                return helper(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + helper(n % 1000) : "");
            if (n < 10000000)
                return helper(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + helper(n % 100000) : "");
            return helper(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + helper(n % 10000000) : "");
        };

        return helper(num);
    };





    //  const items = invoice.length ? [invoice[0]] : [];

    //  const items = Array.isArray(invoice) ? invoice : [invoice];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    {headerPath ? (
                        <Image src={headerPath} style={styles.logo} />
                    ) : (
                        <View style={{ width: "200%", height: 60, backgroundColor: '#eee', marginRight: 8 }} />
                    )}
                </View>
                <Text style={styles.attendanceHeader}>
                    Cash Memo
                    {/* {invoice?.BillingType === "CashMemo" ? "Cash Memo" : "Invoice"} */}
                </Text>

                {/* Billing Section */}
                <View style={styles.billingSection}>

                    {/* ONE HEADER */}
                    <Text style={styles.billingHeader}>Billing To:</Text>

                    {/* TWO COLUMNS BELOW HEADER */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>

                        {/* LEFT COLUMN */}
                        <View style={{ flex: 1, marginRight: 20 }}>
                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Enroll No</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.EnrollNumber || ''}
                                </Text>
                            </View>
                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Pupil Name</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.PupilName || ''}
                                </Text>
                            </View>

                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Parent Name</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.ParentName || ''}
                                </Text>
                            </View>

                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Address</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.ParentAddress || ''}
                                </Text>
                            </View>

                        </View>

                        {/* RIGHT COLUMN */}
                        <View style={{ width: 220 }}>



                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Invoice No</Text>
                                <Text style={styles.billingColon}>:</Text>.
                                <Text style={styles.billingValue}>
                                    {invoice?.InvoiceNumber || ''}
                                </Text>
                            </View>

                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Invoice Date</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.InvoiceDate || ''}
                                </Text>
                            </View>

                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Mobile</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.ParentMobileNumber || ''}
                                </Text>
                            </View>

                            <View style={styles.billingRow}>
                                <Text style={styles.billingLabel}>Email</Text>
                                <Text style={styles.billingColon}>:</Text>
                                <Text style={styles.billingValue}>
                                    {invoice?.ParentMailID || ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ITEMS TABLE */}
                <View style={styles.table}>

                    {/* HEADER ROW */}
                    <View style={styles.tableHeaderRow}>
                        <Text style={[styles.cell, { width: 30, fontWeight: "bold" }]}>SL#</Text>

                        <Text style={[styles.cell, { width: 220, fontWeight: "bold" }]}>
                            Description
                        </Text>

                        <Text style={[styles.cell, { width: 70, fontWeight: "bold" }]}>
                            Unit
                        </Text>
                        <Text style={[styles.cell, { width: 80, fontWeight: "bold" }]}>Qty</Text>
                        <Text style={[styles.cell, { width: 80, fontWeight: "bold" }]}>Rate</Text>
                        <Text style={[styles.cell, { width: 90, fontWeight: "bold" }]}>Total</Text>
                    </View>

                    {/* DATA ROWS */}
                    {items.map((it, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={[styles.cell, { width: 30 }]}>{idx + 1}</Text>

                            <Text style={[styles.cell, { width: 220 }]}>{it.Title}</Text>

                            <Text style={[styles.cell, { width: 70 }]}>{it.BillUnits}</Text>
                            <Text style={[styles.cell, { width: 80, textAlign: "right" }]}>
                                {it.BillUnits === "Hours"
                                    ? it.TotalHours
                                    : it.BillUnits === "Day"
                                        ? it.TotalPresentDays
                                        : "1"}
                            </Text>

                            <Text style={[styles.cell, { width: 80, textAlign: "right" }]}>{it.PerHourRate}</Text>

                            <Text style={[styles.cell, { width: 90, textAlign: "right" }]}>
                                {it.BillUnits === "Day"
                                    ? it.TotalPresentAmount
                                    : it.BillUnits === "Hours"
                                        ? it.Total
                                        : it.TotalMonthAmount}
                            </Text>
                        </View>
                    ))}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>

                        {/* LEFT SIDE → Total Hours */}
                        <View style={{ flex: 1 }}>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={[styles.small, { fontWeight: 'bold' }]}>Total hours in Decimal: </Text>
                <Text style={styles.small}>{invoice?.TotalHours}</Text>
              </View> */}

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={[styles.small, { fontWeight: 'bold' }]}>Net Total in Words: </Text>
                                {/* <Text style={styles.small}>
                                    {`${numberToWords(
                                        Math.round(
                                            invoice?.BillUnits === "Day"
                                                ? Number(invoice?.TotalPresentAmount || 0)
                                                : invoice?.BillUnits === "Hours"
                                                    ? Number(invoice?.Total || 0)
                                                    : Number(invoice?.TotalMonthAmount || 0)
                                        )
                                    )} Only`}
                                </Text> */}
                                <Text style={styles.small}>
                                    {`${inWords(
                                        Math.round(
                                            invoice?.BillUnits === "Day"
                                                ? Number(invoice?.TotalPresentAmount || 0)
                                                : invoice?.BillUnits === "Hours"
                                                    ? Number(invoice?.Total || 0)
                                                    : Number(invoice?.TotalMonthAmount || 0)
                                        )
                                    )} Only`}
                                </Text>
                            </View>

                        </View>

                        <View style={{ width: 200 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.small}>Sub-Total</Text>
                                <Text style={styles.small}>
                                    {invoice?.BillUnits === "Day"
                                        ? invoice?.TotalPresentAmount
                                        : invoice?.BillUnits === "Hours"
                                            ? invoice?.Total
                                            : invoice?.TotalMonthAmount}
                                </Text>
                            </View>


                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.small, { fontWeight: 'bold' }]}>Net Total</Text>
                <Text style={[styles.small, { fontWeight: 'bold' }]}>
                  {Math.round(Number(invoice?.TotalAmount || 0)).toFixed(2)}
                </Text>
              </View> */}
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.small, { fontWeight: 'bold' }]}>Net Total</Text>
                                <Text style={[styles.small, { fontWeight: 'bold' }]}>
                                    {Math.round(
                                        Number(
                                            invoice?.BillUnits === "Day"
                                                ? invoice?.TotalPresentAmount
                                                : invoice?.BillUnits === "Hours"
                                                    ? invoice?.Total
                                                    : invoice?.TotalMonthAmount
                                        )
                                    ).toFixed(2)}
                                </Text>

                            </View> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.small, { fontWeight: 'bold' }]}>Net Total</Text>

                                <Text style={[styles.small, { fontWeight: 'bold' }]}>
                                    {(
                                        Number(
                                            String(
                                                invoice?.BillUnits === "Day"
                                                    ? invoice?.TotalPresentAmount
                                                    : invoice?.BillUnits === "Hours"
                                                        ? invoice?.Total
                                                        : invoice?.TotalMonthAmount
                                            ).replace(/[^0-9.]/g, "")
                                        ) || 0
                                    ).toFixed(2)}
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>
                <View style={styles.footerRow}>

                    {/* Terms & Conditions Box */}
                    <View style={styles.footerBox}>
                        <Text style={[styles.bankLabel, { fontWeight: 'bold' }]}>Terms and Conditions :</Text>
                        <Text style={styles.terms}>1) Payment can be done through any mode.</Text>
                        <Text style={styles.terms}>2) Any claim for refund is not entertained.</Text>
                        <Text style={styles.terms}>3) Invoices must be paid in full.</Text>
                        <Text style={styles.terms}>4) Additional charges may apply for extra services.</Text>
                        <Text style={styles.terms}>5) Services are provided as per the agreement.</Text>
                        <Text style={styles.terms}>6) Partial payments will not be accepted.</Text>
                        <Text style={styles.terms}>
                            7) This is a computer-generated bill, not a GST bill. Claiming it as an offense is incorrect.
                        </Text>

                    </View>

                    {/* Signature Box */}
                    <View style={styles.signatureBox}>
                        {/* <Text>For YJ Elite Academy</Text> */}
                        <Text>{`For ${invoice?.CompanyName || ""}`}</Text>
                        {signaturePath ? (
                            <Image src={signaturePath} style={styles.signatureLogo} />
                        ) : (
                            <View style={{ width: 100, height: 25, backgroundColor: '#eee' }} />
                        )}

                        <Text>Authorized Signature</Text>
                    </View>

                </View>
                <View style={styles.bankBox}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>

                        {/* LEFT — BANK DETAILS */}
                        <View style={{ width: '70%' }}>
                            <Text style={[styles.bankLabel, { fontWeight: 'bold' }]}>Bank Account Details :</Text>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Bank Name</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{invoice?.BankName}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Account Name</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{invoice?.AccountName}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Account Number</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{invoice?.AccountNo}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>IFSC Code</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{invoice?.IFSCCode}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Branch</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{invoice?.Branch}</Text>
                            </View>
                        </View>

                        {/* RIGHT — QR IMAGE */}
                        <View style={{
                            width: '28%',
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            {qrFullPath ? (
                                <Image src={qrFullPath} style={styles.qrImage} />
                            ) : (
                                <View style={{ width: 80, height: 80, backgroundColor: '#eee' }} />
                            )}
                        </View>

                    </View>

                </View>


                {/* FOOTER */}
                <View style={styles.spacer} />
                <View style={{ width: '100%' }}>

                    {footerPath ? (
                        <Image src={footerPath} style={styles.footerImage} />
                    ) : (
                        <View style={{ width: "200%", height: 60, backgroundColor: '#eee' }} />
                    )}
                </View>

            </Page>
            {withannexure && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        {headerPath ? (
                            <Image src={headerPath} style={styles.logo} />
                        ) : (
                            <View style={{ width: "200%", height: 60, backgroundColor: '#eee', marginRight: 8 }} />
                        )}
                    </View>

                    {/* <View style={styles.attendanceContainer}> */}
                    <Text style={styles.attendanceHeader}>
                        {filters.Self === "Y"
                            ? `Attendance Report - ${filters.EmployeeID} (${formattedDate})`
                            : filters.Self === "N"
                                ? `Attendance Report - Reporting to ${filters.EmployeeID} (${formattedDate})`
                                : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
                    </Text>

                    <View style={styles.attendanceTableWrapper}>
                        <View style={styles.attendanceTable}>
                            <View style={styles.attendanceRow}>
                                <Text style={styles.colheader1}>SL#</Text>


                                <Text style={styles.colheaderDate}>Date</Text>
                                <Text style={styles.colheaderCheckIn}>From Time</Text>
                                <Text style={styles.colheaderCheckOut}>To Time</Text>
                                <Text style={styles.colheaderHours}>Hours</Text>
                            </View>

                            {attendancedata.map((row, i) => {
                                const isLast = i === attendancedata.length - 1;

                                return (

                                    <View
                                        key={i}
                                        style={isLast ? styles.attendanceRowLast : styles.attendanceRow}
                                    >
                                        <Text style={styles.col1}>{i + 1}</Text>
                                        <Text style={styles.colheaderdate}>{row.DetailDate}</Text>
                                        <Text style={styles.colCheckIn}>{row.FromTime}</Text>
                                        <Text style={styles.colCheckOut}>{row.ToTime}</Text>
                                        <Text style={styles.colHours}>{row.TotalHours}</Text>
                                    </View>
                                );
                            })}

                        </View>
                    </View>
                    {/* </View> */}
                    <View style={styles.spacer} />
                    <View style={{ width: '100%' }}>
                        {footerPath ? (
                            <Image src={footerPath} style={styles.footerImage} />
                        ) : (
                            <View style={{ width: "200%", height: 60, backgroundColor: '#eee' }} />
                        )}
                    </View>

                </Page>
            )}
        </Document>
    );
}
