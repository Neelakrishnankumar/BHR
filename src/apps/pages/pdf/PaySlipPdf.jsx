import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import React from "react";
import { Font } from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    fonts: [
        { src: "/fonts/Roboto-Regular.ttf" },
        { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" }
    ]
});


const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 9,
        border: "1px solid #000"
    },

    /* ---------------- HEADER ---------------- */

    companyHeader: {
        border: "1px solid #000",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    companyText: {
        textAlign: "center",
        flex: 1,
    },

    titleSection: {
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        padding: 6,
        textAlign: "center",
        fontSize: 11,
        color: "#1a237e",
        fontWeight: "bold"
    },

    /* ---------------- EMPLOYEE GRID ---------------- */

    gridContainer: {
        flexDirection: "row",
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
    },

    gridColumn: {
        flex: 1,
        padding: 6,
        borderRight: "1px solid #000",
    },

    gridRow: {
        flexDirection: "row",
        marginBottom: 3,
        paddingVertical: 3,
    },

    label: {
        width: "50%",
        fontSize: 8,
        fontWeight: "bold"
    },
    spaceColon: {
        width: "5%",
        textAlign: "center",
        fontSize: 8
    },

    value: {
        width: "45%",
        textAlign: "left",
        fontSize: 8
    },

    /* ---------------- TABLES ---------------- */

    table: {
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        fontSize: 8
    },

    table1: {
        border: "1px solid #000",
        fontSize: 8,
        marginTop:"5px"
    },

    tableHeader: {
        flexDirection: "row",
        borderBottom: "1px solid #000",
        borderRight: "1px solid #000",
        padding: 5,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center"
    },

    tableRow: {
        flexDirection: "row",
        borderBottom: "1px solid #000",
        // borderRight: "1px solid #000",
        // padding: 5,
        paddingVertical: 6,  // equal height rows
        paddingHorizontal: 5,
        // minHeight: 18,    
    },

    col1: {
        width: "70%",
        borderRight: "1px solid black",
        paddingRight: 5,
    },

    col2: {
        width: "30%",
        textAlign: "right",
        paddingRight: 5,
    },

    headerCol1: {
        width: "70%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black"
    },

    headerCol2: {
        width: "30%",
        textAlign: "center",
        fontWeight: "bold",
    },


    /* ---------------- NET PAY ---------------- */

    netPaySection: {
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        padding: 6,
    },

    netPayRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        fontWeight: "bold"
    },

    amountWords: {
        marginTop: 4,
        fontSize: 8
    },

    /* ---------------- DECLARATION ---------------- */

    declaration: {
        borderLeft: "1px solid #000",
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        padding: 8,
        fontSize: 8,
        textAlign: "justify"
    },

    signatureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },

    footerNote: {
        border: "1px solid #000",
        borderTop: "none",
        padding: 5,
        fontSize: 8,
        fontStyle: "italic"
    }
});

const PayslipPdf = ({ data, filters }) => {

    const QR_BASE_URL = `${filters?.Imageurl}/uploads/images/`;
    const headerPath = filters?.HeaderImg
        ? `${QR_BASE_URL}${filters.HeaderImg}`
        : null;


    const normalizeRows = (rows, minRows = 6) => {
        const filled = [...rows];
        while (filled.length < minRows) {
            filled.push({ label: "", amount: "" });
        }
        return filled.slice(0, minRows);
    };


    const allowanceRows = normalizeRows([
        { label: "BASIC PAY", amount: "12000" },
        { label: "HOUSE RENT ALLOWANCE", amount: "4800" },
    ]);


    const deductionRows = normalizeRows([
        { label: "PF AMOUNT", amount: "1800" },
    ]);


    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* ---------------- COMPANY HEADER ---------------- */}
                <View style={styles.companyHeader}>
                    <View style={styles.companyText}>
                        <Text>PANASONIC APPLIANCES INDIA COMPANY LIMITED</Text>
                        <Text>
                            I FLOOR, NEW NO.68, OLD NO.35, ETHIRAJULU SALAI,
                        </Text>
                        <Text>CHENNAI - 600088</Text>
                    </View>

                    {/* {headerPath && (
            <Image
              src={headerPath}
              style={{ width: 120, height: 40 }}
            />
          )} */}

                    <Image
                        src="/BexATM.png"
                        style={{ width: 120, height: 40 }}
                    />
                </View>

                {/* ---------------- TITLE ---------------- */}
                <View style={styles.titleSection}>
                    <Text>Pay Slip for the month of February 2026</Text>
                </View>

                {/* ---------------- EMPLOYEE DETAILS GRID ---------------- */}
                <View style={styles.gridContainer}>

                    <View style={styles.gridColumn}>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Employee.No</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>TIC0861</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Position</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Developer</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Grade</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>II</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Department</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>IT</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Work Location</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Chennai</Text>
                        </View>
                    </View>

                    <View style={styles.gridColumn}>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Employee Name</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Subramani</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Designation</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Developer</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Division</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Web</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Section</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>IT</Text>
                        </View>
                    </View>

                    <View style={[styles.gridColumn, { borderRight: 0 }]}>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Father's Name(Mr.)</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Ramswamy</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Date Of Joining</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>01-OCT-2022</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Date Of Birth</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>22-OCT-2000</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Total Paid Days</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>31</Text>
                        </View>
                    </View>

                </View>

                {/* ---------------- EARNINGS TABLE ---------------- */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerCol1}>ALLOWANCES</Text>
                        <Text style={styles.headerCol2}>AMOUNT</Text>
                    </View>

                    {allowanceRows.map((row, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.col1}>{row.label}</Text>
                            <Text style={styles.col2}>{row.amount}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>GROSS TOTAL</Text>
                        <Text style={styles.col2}>27293</Text>
                    </View>
                </View>

                {/* ---------------- DEDUCTIONS ---------------- */}
                <View style={styles.table1}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerCol1}>DEDUCTIONS</Text>
                        <Text style={styles.headerCol2}>AMOUNT</Text>
                    </View>

                    {deductionRows.map((row, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.col1}>{row.label}</Text>
                            <Text style={styles.col2}>{row.amount}</Text>
                        </View>
                    ))}

                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>GROSS TOTAL</Text>
                        <Text style={styles.col2}>3675</Text>
                    </View>
                </View>

                {/* ---------------- NET PAY ---------------- */}
                <View style={styles.netPaySection}>
                    <View style={styles.netPayRow}>
                        <Text>NET PAY</Text>
                        <Text>25418</Text>
                    </View>
                    <Text style={styles.amountWords}>
                        (Twenty Five Thousand Four Hundred And Eighteen only).
                    </Text>
                </View>

                {/* ---------------- DECLARATION ---------------- */}
                <View style={styles.declaration}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        Declaration By The Receiver
                    </Text>
                    <Text>
                        I, the undersigned, hereby state that I have received the above
                        said amount as my full and final settlement...
                    </Text>

                    <View style={styles.signatureRow}>
                        <Text>Prepared By:</Text>
                        <Text>Team Leader:</Text>
                        <Text>Checked By:</Text>
                        <Text>Authorised By:</Text>
                    </View>

                    <View style={{ marginTop: 20, textAlign: "right" }}>
                        <Text>Receiver's Signature</Text>
                    </View>
                </View>

                <View style={styles.footerNote}>
                    <Text>
                        This is a system generated pay slip. Hence, signature is not needed
                    </Text>
                </View>

            </Page>
        </Document>
    );
};

export default PayslipPdf;
