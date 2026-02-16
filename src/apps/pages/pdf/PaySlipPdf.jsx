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


const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 9,
        border: "1px solid #000",
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
        fontSize: 12,
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
        width: "40%",
        fontSize: 8,
        fontWeight: "bold"
    },
    spaceColon: {
        width: "5%",
        textAlign: "center",
        fontSize: 8
    },

    value: {
        width: "55%",
        textAlign: "left",
        fontSize: 8
    },

    /* ---------------- TABLES ---------------- */

    table: {
        borderLeft: "1px solid #000",
        // borderRight: "1px solid #000",
        // borderBottom: "1px solid #000",
        fontSize: 8
    },

    table1: {
        // border: "1px solid #000",
        borderLeft: "1px solid #000",
        // borderBottom: "1px solid #000",
        // borderTop: "1px solid #000",
        // fontSize: 8,
        // marginTop: "5px"
    },

    tableHeaderMain: {
        flexDirection: "row",
        borderBottom: "1px solid #000",
        borderRight: "1px solid #000",
        fontWeight: "bold",
    },
    tableHeader: {
        flexDirection: "row",
        borderBottom: "1px solid #000",
        borderRight: "1px solid #000",
        // padding: 5,
        fontWeight: "bold",
        // display: "flex",
        // justifyContent: "center"
    },

    tableRow: {
        flexDirection: "row",
        borderBottom: "1px solid #000",
        borderRight: "1px solid #000",
        // borderRight: "1px solid #000",
        // padding: 5,
        // paddingVertical: 6,  // equal height rows
        // paddingHorizontal: 5,
        minHeight: 20,
    },

    col1: {
        width: "5%",
        borderRight: "1px solid black",
        padding: 5,
        textAlign: "center"
    },
    col2: {
        width: "80%",
        borderRight: "1px solid black",
        padding: 5,
    },

    col3: {
        width: "15%",
        textAlign: "right",
        padding: 5,
    },
    Transsactioncol1: {
        width: "5%",
        borderRight: "1px solid black",
        padding: 5,
        textAlign: "center"
    },
    Transsactioncol2: {
        width: "65%",
        borderRight: "1px solid black",
        padding: 5,
    },

    Transsactioncol3: {
        width: "15%",
        textAlign: "right",
        borderRight: "1px solid black",
        padding: 5,
    },
    Transsactioncol4: {
        width: "15%",
        textAlign: "right",
        padding: 5,
    },

    headerColMain: {
        width: "100%",
        textAlign: "left",
        fontWeight: "bold",
        // borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
    },
    headerCol1: {
        width: "5%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
    },

    headerCol2: {
        width: "80%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
        // paddingLeft: "45px"
    },

    headerCol3: {
        width: "15%",
        textAlign: "center",
        fontWeight: "bold",
        // borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
    },
    TransactionheaderCol1: {
        width: "5%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
    },

    TransactionheaderCol2: {
        width: "65%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black",
        padding: 5,
        // paddingLeft: "45px",
        fontSize: 10
    },

    TransactionheaderCol3: {
        width: "15%",
        textAlign: "center",
        fontWeight: "bold",
        borderRight: "1px solid black",
        padding: 5,
        fontSize: 10
    },
    TransactionheaderCol4: {
        width: "15%",
        textAlign: "center",
        fontWeight: "bolder",
        padding: 5,
        fontSize: 10
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
        fontWeight: "bold",
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
        flexDirection: "row",
        // textAlign: "justify"
    },

    BankDetails: {
        flex: 1,
        paddingRight: 15,
    },
    bankTitle: {
        fontWeight: "900",
        marginBottom: 4,
        fontSize: 10,

    },

    bankRow: {
        flexDirection: "row",
        marginBottom: 3,
    },

    bankLabel: {
        width: "30%",
    },

    bankColon: {
        width: "5%",
        textAlign: "center",
    },

    bankValue: {
        width: "65%",
    },

    signatureColumn: {
        // flex: 1,
        width: "35%",
        // display: "flex",
        alignItems: "flex-end",   // pushes signature to right side
        justifyContent: "center",
    },

    signatureContainer1: {
        alignItems: "flex-start",   // pushes whole block to right
    },
    signatureContainer: {
        alignItems: "flex-end",   // pushes whole block to right
    },

    signatureBlock: {
        width: 120,               // same width as image
        alignItems: "center",
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

const PayslipPdf = ({ data = {}, filters }) => {

    const QR_BASE_URL = `${filters?.Imageurl}/uploads/images/`;
    const headerPath = filters?.HeaderImg
        ? `${QR_BASE_URL}${filters.HeaderImg}`
        : null;
    const CompanySignature = filters?.CompanySignature
        ? `${QR_BASE_URL}${filters.CompanySignature}`
        : null;

    const normalizeRows = (rows, minRows = 3) => {
        const filled = [...rows];
        while (filled.length < minRows) {
            filled.push({ label: "", amount: "" });
        }
        return filled.slice(0, minRows);
    };


    // const allowanceRows = normalizeRows([
    //     { Sl: "1", label: "BASIC PAY", amount: "12000" },
    //     { Sl: "2", label: "HOUSE RENT ALLOWANCE", amount: "4800" },
    // ]);
    const allowanceRows = normalizeRows(
        (data?.Allowances || []).map((item, index) => ({
            Sl: index + 1,
            label: item.component,
            amount: item.amount
        }))
    );


    // const deductionRows = normalizeRows([
    //     { Sl: "1", label: "PF AMOUNT", amount: "1800" },
    //     { Sl: "2", label: "INSURANCE", amount: "1875" },
    // ]);

    const deductionRows = normalizeRows(
        (data?.Deductions || []).map((item, index) => ({
            Sl: index + 1,
            label: item.component,
            amount: item.amount,
        }))
    );

    // const transactionRows = normalizeRows([
    //     { Sl: "1", label: "PF AMOUNT", amount: "1800" },
    //     { Sl: "2", label: "INSURANCE", amount: "1875" },
    // ]);

    // const transactionRows = normalizeRows(
    //     (data?.transactions || []).map((item, index) => ({
    //         Sl: index + 1,
    //         title: item.component,
    //         credit: item.amount,
    //         debit: item.debit
    //     }))
    // );
    const transactionRows = normalizeRows(
        (data?.transactions || []).map((item, index) => ({
            Sl: index + 1,
            title: item.component,
            credit: item.type?.toLowerCase() === "credit"
                ? item.amount
                : "--",

            debit: item.type?.toLowerCase() === "debit"
                ? item.amount
                : "--"
        }))
    );


    const Netpayable = data?.Totals?.NetPay || ""
    // const numberToWordsInRupees = (num) => {
    //     if (!num) return "Zero Rupees Only";

    //     const a = [
    //         "",
    //         "One",
    //         "Two",
    //         "Three",
    //         "Four",
    //         "Five",
    //         "Six",
    //         "Seven",
    //         "Eight",
    //         "Nine",
    //         "Ten",
    //         "Eleven",
    //         "Twelve",
    //         "Thirteen",
    //         "Fourteen",
    //         "Fifteen",
    //         "Sixteen",
    //         "Seventeen",
    //         "Eighteen",
    //         "Nineteen",
    //     ];
    //     const b = [
    //         "",
    //         "",
    //         "Twenty",
    //         "Thirty",
    //         "Forty",
    //         "Fifty",
    //         "Sixty",
    //         "Seventy",
    //         "Eighty",
    //         "Ninety",
    //     ];

    //     const toWords = (n) => {
    //         if (n < 20) return a[n];
    //         if (n < 100)
    //             return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    //         if (n < 1000)
    //             return (
    //                 a[Math.floor(n / 100)] +
    //                 " Hundred" +
    //                 (n % 100 ? " " + toWords(n % 100) : "")
    //             );
    //         if (n < 100000)
    //             return (
    //                 toWords(Math.floor(n / 1000)) +
    //                 " Thousand" +
    //                 (n % 1000 ? " " + toWords(n % 1000) : "")
    //             );
    //         if (n < 10000000)
    //             return (
    //                 toWords(Math.floor(n / 100000)) +
    //                 " Lakh" +
    //                 (n % 100000 ? " " + toWords(n % 100000) : "")
    //             );
    //         return (
    //             toWords(Math.floor(n / 10000000)) +
    //             " Crore" +
    //             (n % 10000000 ? " " + toWords(n % 10000000) : "")
    //         );
    //     };

    //     return toWords(parseInt(num)) + " Rupees Only";
    // };

    const numberToWordsInRupees = (num) => {
  if (!num) return "Zero Rupees Only";

  // ✅ Remove commas and convert to number
  const cleanNum = Number(String(num).replace(/,/g, ""));
  const n = Math.floor(cleanNum); // remove decimals

  const a = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen",
  ];

  const b = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy",
    "Eighty", "Ninety",
  ];

  const toWords = (x) => {
    if (x < 20) return a[x];
    if (x < 100)
      return b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : "");
    if (x < 1000)
      return (
        a[Math.floor(x / 100)] +
        " Hundred" +
        (x % 100 ? " " + toWords(x % 100) : "")
      );
    if (x < 100000)
      return (
        toWords(Math.floor(x / 1000)) +
        " Thousand" +
        (x % 1000 ? " " + toWords(x % 1000) : "")
      );
    if (x < 10000000)
      return (
        toWords(Math.floor(x / 100000)) +
        " Lakh" +
        (x % 100000 ? " " + toWords(x % 100000) : "")
      );

    return (
      toWords(Math.floor(x / 10000000)) +
      " Crore" +
      (x % 10000000 ? " " + toWords(x % 10000000) : "")
    );
  };

  return toWords(n) + " Rupees Only";
};

    const payableInWords = numberToWordsInRupees(Netpayable);
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>

                {/* ---------------- COMPANY HEADER ---------------- */}
                <View style={styles.companyHeader}>
                    <View style={styles.companyText}>
                        <Text>{data?.CompanyName}</Text>
                        <Text>{data?.CompanyAddress}</Text>
                        <Text>{data?.CompanyPinCode}</Text>
                    </View>

                    {headerPath && (
                        <Image
                            src={headerPath}
                            style={{ width: 80, height: "auto" }}
                        />
                    )}
                </View>

                {/* ---------------- TITLE ---------------- */}
                <View style={styles.titleSection}>
                    <Text>Pay Slip for the month of {data?.Month || ""} {data?.Finyear || ""}</Text>
                </View>

                {/* ---------------- EMPLOYEE DETAILS GRID ---------------- */}
                <View style={styles.gridContainer}>
                    <View style={styles.gridColumn}>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Employee.No</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeCode}</Text>
                        </View>
                        {/* <View style={styles.gridRow}>
                            <Text style={styles.label}>Position</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>Developer</Text>
                        </View> */}
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Grade</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeLevel}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Department</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeDepartment}</Text>
                        </View>

                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Father's Name (Mr.)</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.FatherName}</Text>
                        </View>
                    </View>

                    <View style={styles.gridColumn}>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Employee Name</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeName}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Designation</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeDesignation}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Division</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeDivision}</Text>
                        </View>
                        {/* <View style={styles.gridRow}>
                            <Text style={styles.label}>Section</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeName}</Text>
                        </View> */}
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Work Location</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.WorkLocation}</Text>
                        </View>
                    </View>

                    <View style={[styles.gridColumn, { borderRight: 0 }]}>

                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Date Of Joining</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeDateOfJoin}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Date Of Birth</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.EmployeeDob}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Total Paid Days</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.TotalPaidDays}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <Text style={styles.label}>Basic Pay</Text>
                            <Text style={styles.spaceColon}>:</Text>
                            <Text style={styles.value}>{data?.Salary}</Text>
                        </View>
                    </View>

                </View>

                {/* ---------------- EARNINGS TABLE ---------------- */}
                <View style={styles.table}>
                    <View style={styles.tableHeaderMain}>
                        <Text style={styles.headerColMain}>Allowances</Text>
                    </View>
                    <View style={styles.tableHeader} fixed>
                        <Text style={styles.headerCol1}>SL#</Text>
                        <Text style={styles.headerCol2}>Title</Text>
                        <Text style={styles.headerCol3}>Amount</Text>
                    </View>

                    {allowanceRows.map((row, index) => (
                        <View style={styles.tableRow} key={index} wrap={false}>
                            <Text style={styles.col1}>{row.Sl}</Text>
                            <Text style={styles.col2}>{row.label}</Text>
                            <Text style={styles.col3}>{row.amount}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}></Text>
                        <Text style={styles.col2}>Gross Total</Text>
                        <Text style={styles.col3}>{data?.Totals?.SumOfAllowances}</Text>
                    </View>
                </View>

                {/* ---------------- OTHER ALLOWANCES ---------------- */}
                {/* <View style={styles.table1}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerCol1}>OTHER ALLOWANCES</Text>
                        <Text style={styles.headerCol2}>AMOUNT</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Conveyance</Text>
                        <Text style={styles.col2}>3675</Text>
                    </View>
                </View> */}
                {/* ---------------- DEDUCTIONS ---------------- */}
                <View style={styles.table1}>
                    <View style={styles.tableHeaderMain}>
                        <Text style={styles.headerColMain}>Deductions</Text>
                    </View>
                    <View style={styles.tableHeader} fixed>
                        <Text style={styles.headerCol1}>SL#</Text>
                        <Text style={styles.headerCol2}>Title</Text>
                        <Text style={styles.headerCol3}>Amount</Text>
                    </View>

                    {deductionRows.map((row, index) => (
                        <View style={styles.tableRow} key={index} wrap={false}>
                            <Text style={styles.col1}>{row.Sl}</Text>
                            <Text style={styles.col2}>{row.label}</Text>
                            <Text style={styles.col3}>{row.amount}</Text>
                        </View>
                    ))}

                    <View style={styles.tableRow}>
                        <Text style={styles.col1}></Text>
                        <Text style={styles.col2}>Gross Total</Text>
                        <Text style={styles.col3}>{data?.Totals?.SumOfDeductions}</Text>
                    </View>
                </View>

                {/* ---------------- OTHER DEDUCTIONS ---------------- */}
                {/* <View style={styles.table1}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerCol1}>OTHER DEDUCTIONS</Text>
                        <Text style={styles.headerCol2}>AMOUNT</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Conveyance</Text>
                        <Text style={styles.col2}>3675</Text>
                    </View>
                </View> */}


                {/* ---------------- TRANSACTIONS ---------------- */}
                <View style={styles.table1}>
                    <View style={styles.tableHeaderMain}>
                        <Text style={styles.headerColMain}>Transactions</Text>
                    </View>
                    <View style={styles.tableHeader} fixed>
                        <Text style={styles.TransactionheaderCol1}>SL#</Text>
                        <Text style={styles.TransactionheaderCol2}>Title</Text>
                        <Text style={styles.TransactionheaderCol3}>Credit</Text>
                        <Text style={styles.TransactionheaderCol4}>Debit</Text>
                    </View>
                    {transactionRows.map((row, index) => (
                        <View style={styles.tableRow} key={index} wrap={false}>
                            <Text style={styles.Transsactioncol1}>{row.Sl}</Text>
                            <Text style={styles.Transsactioncol2}>{row.title}</Text>
                            <Text style={styles.Transsactioncol3}>{row.credit}</Text>
                            <Text style={styles.Transsactioncol4}>{row.debit}</Text>
                        </View>
                    ))}

                    <View style={styles.tableRow}>
                        <Text style={styles.Transsactioncol1}></Text>
                        <Text style={styles.Transsactioncol2}>Gross Total</Text>
                        <Text style={styles.Transsactioncol3}>{data?.Totals?.SumOfCreditTransactions}</Text>
                        <Text style={styles.Transsactioncol4}>{data?.Totals?.SumOfDebitTransactions}</Text>
                    </View>
                </View>

                <View break={false}>
                    {/* ---------------- NET PAY ---------------- */}
                    <View style={styles.netPaySection}>
                        <View style={styles.netPayRow}>
                            <Text>Net Pay = Basic Pay + Allowances + Other Allowances - Deductions - Other Deductions</Text>
                            <Text>{data?.Totals?.NetPay}</Text>
                        </View>
                        <Text style={styles.amountWords}>
                            ({payableInWords}).
                        </Text>
                    </View>

                    {/* ---------------- DECLARATION ---------------- */}
                    {/* <View style={styles.declaration}>
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
                </View> */}
                    <View style={styles.declaration}>
                        <View style={styles.BankDetails}>

                            <Text style={styles.bankTitle}>
                                Bank Details:
                            </Text>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Account Holder Name</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{data?.AccountHolderName}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Account Number</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{data?.AccountNumber}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>IFSC Code</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{data?.IfscCode}</Text>
                            </View>

                            <View style={styles.bankRow}>
                                <Text style={styles.bankLabel}>Branch</Text>
                                <Text style={styles.bankColon}>:</Text>
                                <Text style={styles.bankValue}>{data?.Branch}</Text>
                            </View>

                        </View>

                        <View style={styles.signatureColumn}>
                            <View style={styles.signatureBlock}>
                                <Text style={{ textAlign: "center", marginBottom: "2px" }}>
                                    Authorised Signature
                                </Text>
                                {CompanySignature ? (
                                    <Image
                                        src={CompanySignature}
                                        // src="/BexATM.png"
                                        style={{ width: 120, height: 40 }}
                                    />) : null}
                            </View>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.footerNote}>
                    <Text>
                        This is a system generated pay slip. Hence, signature is not needed
                    </Text>
                </View> */}

            </Page>
        </Document>
    );
};

export default PayslipPdf;
