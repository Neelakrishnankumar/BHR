// import React from "react";
// import {
//     Document,
//     Page,
//     Text,
//     View,
//     StyleSheet,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//     page: {
//         padding: 15,
//         fontSize: 8,
//     },

//     bold: { fontWeight: "bold" },
//     center: { textAlign: "center" },

//     row: { flexDirection: "row" },

//     table: {
//         borderWidth: 1,
//         borderColor: "#000",
//         marginTop: 20,
//     },

//     cell: {
//         borderRightWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#000",
//         padding: 3,
//         justifyContent: "center",
//     },

//     headerCell: {
//         borderRightWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#000",
//         padding: 3,
//         textAlign: "center",
//         fontWeight: "bold",
//     },

//     right: {
//         textAlign: "right",
//     },

//     // Column widths
//     w3: { width: "3%" },
//     w4: { width: "4%" },
//     w5: { width: "5%" },
//     w6: { width: "6%" },
//     w7: { width: "7%" },
//     w8: { width: "8%" },
//     w10: { width: "10%" },
//     w12: { width: "12%" },
//     groupHeader: {
//         borderWidth: 1,
//         borderColor: "#000",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "Helvetica-Bold",
//         fontSize: 9,
//     },

//     subRow: {
//         flexDirection: "row",
//     },
//     verticalWrap: {
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     verticalText: {
//         transform: "rotate(-90deg)",
//         fontSize: 8,
//         textAlign: "center",
//     },

// });

// const RegisterOfWagesPDF = ({ data = [] }) => {

//     // ================= TOTAL CALCULATION =================
//     const totals = data.reduce(
//         (acc, row) => {
//             acc.basic += Number(row.basic || 0);
//             acc.da += Number(row.da || 0);
//             acc.gross += Number(row.gross || 0);
//             acc.pf += Number(row.pf || 0);
//             acc.esi += Number(row.esi || 0);
//             acc.advance += Number(row.advance || 0);
//             acc.fines += Number(row.fines || 0);
//             acc.totalDed += Number(row.totalDed || 0);
//             acc.net += Number(row.net || 0);
//             return acc;
//         },
//         {
//             basic: 0,
//             da: 0,
//             gross: 0,
//             pf: 0,
//             esi: 0,
//             advance: 0,
//             fines: 0,
//             totalDed: 0,
//             net: 0,
//         }
//     );

//     return (
//         <Document>
//             <Page size="A4" orientation="landscape" style={styles.page}>

//                 {/* ===== HEADER ===== */}

//                 <Text style={[styles.center, styles.bold, { marginBottom: 20, fontSize: 12 }]}>
//                     Register of Wages
//                 </Text>

//                 <View style={[styles.row, { justifyContent: "space-between" }]}>
//                     <View>
//                         <Text style={[styles.bold, { fontSize: 10 }]}>Name of the Establishment:</Text>
//                         <Text>Tata Consultancy Services Ltd</Text>
//                         <Text>TRIL, Taramani</Text>
//                     </View>

//                     <View>
//                         <Text style={[styles.bold, { fontSize: 10 }]}>
//                             Name and Address of the Contractor:
//                         </Text>
//                         <Text>Beyondexs</Text>
//                         <Text>No.181,Lakshmi Nagar,First main road, Porur</Text>
//                         <Text>Chennai - 600116</Text>
//                     </View>

//                     <View>
//                         <Text style={[styles.bold, { fontSize: 10 }]}>Month: December</Text>
//                         <Text style={[styles.bold, { fontSize: 10 }]}>Year: 2025</Text>
//                     </View>
//                 </View>

//                 {/* ================= TABLE ================= */}
//                 <View style={styles.table}>

//                     {/* HEADER ROW */}
//                     {/* <View style={styles.row}>
//             <Text style={[styles.headerCell, styles.w3,{fontSize: 10}]}>S.No</Text>
//             <Text style={[styles.headerCell, styles.w10,{fontSize: 10}]}>Name of the Workman</Text>
//             <Text style={[styles.headerCell, styles.w3,{fontSize: 10}]}>Sex</Text>
//             <Text style={[styles.headerCell, styles.w6,{fontSize: 10}]}>Designation</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Wages Period/Week/FN/Month</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Units of work done/No of Days worked</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Daily rate of wages</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Overtime rate</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Basic</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>DA</Text>
//             <Text style={[styles.headerCell, styles.w6,{fontSize: 10}]}>Gross wages</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>PF</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>ESI</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Advance</Text>
//             <Text style={[styles.headerCell, styles.w5,{fontSize: 10}]}>Fines(if any)</Text>
//             <Text style={[styles.headerCell, styles.w6,{fontSize: 10}]}>Total Deduction</Text>
//             <Text style={[styles.headerCell, styles.w6,{fontSize: 10}]}>Net Wages</Text>
//             <Text style={[styles.headerCell, styles.w8,{fontSize: 10}]}>
//               Bank A/c No.
//                Signature
//             </Text>
//             <Text style={[styles.headerCell, styles.w6,{fontSize: 10}]}>
//               Total unpaid amounts accumulated
//             </Text>
//           </View> */}
//                     <View style={styles.row}>

//                         <Text style={[styles.headerCell, styles.w3]}>S.No</Text>
//                         <Text style={[styles.headerCell, styles.w10]}>Name of the Workman</Text>
//                         <Text style={[styles.headerCell, styles.w3]}>Sex</Text>
//                         <Text style={[styles.headerCell, styles.w6]}>Designation</Text>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>Wages Period/Week/FN/Month</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>Units of work done/No of Days worked</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>Daily rate of wages</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>Overtime rate</Text>
//                         </View>

//                         {/* WAGES EARNED GROUP */}
//                         <View style={[styles.headerCell, styles.w16]}>
//                             <Text style={styles.bold}>WAGES EARNED</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>PF</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w5, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>ESI</Text>
//                         </View>

//                         {/* DEDUCTIONS GROUP */}
//                         <View style={[styles.headerCell, styles.w16]}>
//                             <Text style={styles.bold}>DEDUCTIONS</Text>
//                         </View>

//                         <View style={[styles.headerCell, styles.w6, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>Net Wages</Text>
//                         </View>

//                         <Text style={[styles.headerCell, styles.w8]}>
//                             Bank A/c No. Signature
//                         </Text>

//                         <View style={[styles.headerCell, styles.w6, styles.verticalWrap]}>
//                             <Text style={styles.verticalText}>
//                                 Total unpaid amounts accumulated
//                             </Text>
//                         </View>

//                     </View>
//                     {/* ================= HEADER END ================= */}

//                     {/* SUB HEADER ROW */}
//                     <View style={styles.subRow}>

//                         {/* Empty for previous columns */}
//                         <Text style={[styles.headerCell, styles.w3]}></Text>
//                         <Text style={[styles.headerCell, styles.w10]}></Text>
//                         <Text style={[styles.headerCell, styles.w3]}></Text>
//                         <Text style={[styles.headerCell, styles.w6]}></Text>
//                         <Text style={[styles.headerCell, styles.w5]}></Text>
//                         <Text style={[styles.headerCell, styles.w5]}></Text>
//                         <Text style={[styles.headerCell, styles.w5]}></Text>
//                         <Text style={[styles.headerCell, styles.w5]}></Text>

//                         {/* WAGES EARNED SUB COLUMNS */}
//                         <Text style={[styles.headerCell, styles.w5]}>Basic</Text>
//                         <Text style={[styles.headerCell, styles.w5]}>DA</Text>
//                         <Text style={[styles.headerCell, styles.w6]}>Gross Wages</Text>

//                         <Text style={[styles.headerCell, styles.w5]}></Text>
//                         <Text style={[styles.headerCell, styles.w5]}></Text>

//                         {/* DEDUCTIONS SUB COLUMNS */}
//                         <Text style={[styles.headerCell, styles.w5]}>Advance</Text>
//                         <Text style={[styles.headerCell, styles.w5]}>
//                             Fines (if any)
//                         </Text>
//                         <Text style={[styles.headerCell, styles.w6]}>
//                             Total Deductions
//                         </Text>

//                         <Text style={[styles.headerCell, styles.w6]}></Text>
//                         <Text style={[styles.headerCell, styles.w8]}></Text>
//                         <Text style={[styles.headerCell, styles.w6]}></Text>

//                     </View>

//                     {/* DATA ROWS */}
//                     {data.map((row, index) => (
//                         <View style={styles.row} key={index}>
//                             <Text style={[styles.cell, styles.w3]}>
//                                 {index + 1}
//                             </Text>
//                             <Text style={[styles.cell, styles.w10]}>
//                                 {row.name}
//                             </Text>
//                             <Text style={[styles.cell, styles.w3]}>
//                                 {row.sex}
//                             </Text>
//                             <Text style={[styles.cell, styles.w6]}>
//                                 {row.designation}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5]}>
//                                 {row.wagePeriod}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.days}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.dailyRate || ""}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.otRate || ""}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.basic}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.da}
//                             </Text>
//                             <Text style={[styles.cell, styles.w6, styles.right]}>
//                                 {row.gross}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.pf}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.esi}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.advance || ""}
//                             </Text>
//                             <Text style={[styles.cell, styles.w5, styles.right]}>
//                                 {row.fines || ""}
//                             </Text>
//                             <Text style={[styles.cell, styles.w6, styles.right]}>
//                                 {row.totalDed}
//                             </Text>
//                             <Text style={[styles.cell, styles.w6, styles.right]}>
//                                 {row.net}
//                             </Text>
//                             <Text style={[styles.cell, styles.w8]}></Text>
//                             <Text style={[styles.cell, styles.w6]}>Nil</Text>
//                         </View>
//                     ))}

//                     {/* TOTAL ROW */}
//                     <View style={styles.row}>
//                         <Text style={[styles.cell, styles.w3]}></Text>
//                         <Text style={[styles.cell, styles.w10, { fontSize: 10 }]}>Total</Text>
//                         <Text style={[styles.cell, styles.w3]}></Text>
//                         <Text style={[styles.cell, styles.w6]}></Text>
//                         <Text style={[styles.cell, styles.w5]}></Text>
//                         <Text style={[styles.cell, styles.w5]}></Text>
//                         <Text style={[styles.cell, styles.w5]}></Text>
//                         <Text style={[styles.cell, styles.w5]}></Text>

//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.basic}
//                         </Text>
//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.da}
//                         </Text>
//                         <Text style={[styles.cell, styles.w6, styles.bold, styles.right]}>
//                             {totals.gross}
//                         </Text>
//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.pf}
//                         </Text>
//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.esi}
//                         </Text>
//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.advance}
//                         </Text>
//                         <Text style={[styles.cell, styles.w5, styles.bold, styles.right]}>
//                             {totals.fines}
//                         </Text>
//                         <Text style={[styles.cell, styles.w6, styles.bold, styles.right]}>
//                             {totals.totalDed}
//                         </Text>
//                         <Text style={[styles.cell, styles.w6, styles.bold, styles.right]}>
//                             {totals.net}
//                         </Text>
//                         <Text style={[styles.cell, styles.w8]}></Text>
//                         <Text style={[styles.cell, styles.w6]}></Text>
//                     </View>

//                 </View>

//                 {/* FOOTER */}
//                 <View style={{ marginTop: 25, textAlign: "right" }}>
//                     {/* <Text>For Beyondexs</Text> */}
//                     <Text style={{ marginTop: 20 }}>
//                         Signature of Employer / Manager / Authorised Person
//                     </Text>
//                 </View>

//             </Page>
//         </Document>
//     );
// };

// export default RegisterOfWagesPDF;
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 15,
        fontSize: 8,
    },

    bold: { fontWeight: "bold" },
    center: { textAlign: "center" },
    right: { textAlign: "right" },

    table: {
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 30,
    },

    row: { flexDirection: "row" },

    headerRow: {
        flexDirection: "row",
        height: 85,
    },

    subHeaderRow: {
        flexDirection: "row",
        height: 25,
    },

    cell: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 3,
        justifyContent: "center",
    },

    headerCell: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        fontWeight: "bold",
        textAlign: "center",
    },

    verticalText: {
        transform: "rotate(-90deg)",
        transformOrigin: "center",
        textAlign: "center",
    },

    // WIDTHS (TOTAL = 100%)
    w3: { width: "3%" },
    w12: { width: "12%" },
    w6: { width: "6%" },
    w5: { width: "5%" },
    w4: { width: "4%" },
    w8: { width: "8%" },
    w2: { width: "3%" },
    noBottomBorder: {
        borderBottomWidth: 0,
    },
    noRightBorder: {
        borderRightWidth: 0,
    },
});

const RegisterOfWagesPDF = ({ data = [] }) => {
    const totals = data.reduce(
        (acc, row) => {
            acc.basic += Number(row.basic || 0);
            acc.da += Number(row.da || 0);
            acc.gross += Number(row.gross || 0);
            acc.pf += Number(row.pf || 0);
            acc.esi += Number(row.esi || 0);
            acc.advance += Number(row.advance || 0);
            acc.fines += Number(row.fines || 0);
            acc.totalDed += Number(row.totalDed || 0);
            acc.net += Number(row.net || 0);
            return acc;
        },
        {
            basic: 0,
            da: 0,
            gross: 0,
            pf: 0,
            esi: 0,
            advance: 0,
            fines: 0,
            totalDed: 0,
            net: 0,
        }
    );

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <Text style={[styles.center, styles.bold, { fontSize: 12, marginBottom: 20 }]}>
                    Register of Wages
                </Text>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View>
                        <Text style={[styles.bold, { fontSize: 10 }]}>Name of the Establishment:</Text>
                        <Text>Tata Consultancy Services Ltd</Text>
                        <Text>TRIL, Taramani</Text>
                    </View>

                    <View>
                        <Text style={[styles.bold, { fontSize: 10 }]}>
                            Name and Address of the Contractor:
                        </Text>
                        <Text>Fillets Refreshment</Text>
                        <Text>No.8,East Mada Street,Velachery</Text>
                        <Text>Chennai - 600042</Text>
                    </View>

                    <View>
                        <Text style={[styles.bold, { fontSize: 10 }]}>Month: December</Text>
                        <Text style={[styles.bold, { fontSize: 10 }]}>Year: 2025</Text>
                    </View>
                </View>

                <View style={styles.table}>

                    {/* MAIN HEADER */}
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerCell, styles.w3]}>S.No</Text>
                        <Text style={[styles.headerCell, styles.w12]}>Name of Workman</Text>
                        <Text style={[styles.headerCell, styles.w3]}>Sex</Text>

                        <View style={[styles.headerCell, styles.w6]}>
                            <Text style={styles.verticalText}>Designation</Text>
                        </View>

                        <View style={[styles.headerCell, styles.w5]}>
                            <Text style={styles.verticalText}>Wage Period</Text>
                        </View>

                        <View style={[styles.headerCell, styles.w5]}>
                            <Text style={styles.verticalText}>Units of work done/No of Days worked</Text>
                        </View>

                        <View style={[styles.headerCell, styles.w5]}>
                            <Text style={styles.verticalText}>Daily rate of wages</Text>
                        </View>

                        <View style={[styles.headerCell, styles.w5]}>
                            <Text style={styles.verticalText}>Overtime rate</Text>
                        </View>

                        <Text style={[styles.headerCell, { width: "16%" }]}>
                            WAGES EARNED
                        </Text>

                        <View style={[styles.headerCell, styles.w4]}>
                            <Text style={styles.verticalText}>PF</Text>
                        </View>

                        <View style={[styles.headerCell, styles.w4]}>
                            <Text style={styles.verticalText}>ESI</Text>
                        </View>

                        <Text style={[styles.headerCell, { width: "16%" }]}>
                            DEDUCTIONS
                        </Text>

                        <View style={[styles.headerCell, styles.w6]}>
                            <Text style={styles.verticalText}>Net wages</Text>
                        </View>

                        <Text style={[styles.headerCell, styles.w8]}>
                            Bank A/c No. Signature
                        </Text>

                        <View style={[styles.headerCell, styles.w2, styles.noRightBorder]}>
                            <Text style={styles.verticalText}>Unpaid Amount</Text>
                        </View>
                    </View>

                    {/* SUB HEADER */}
                    <View style={styles.subHeaderRow}>
                        <Text style={[styles.headerCell, styles.w3]} />
                        <Text style={[styles.headerCell, styles.w12]} />
                        <Text style={[styles.headerCell, styles.w3]} />
                        <Text style={[styles.headerCell, styles.w6]} />
                        <Text style={[styles.headerCell, styles.w5]} />
                        <Text style={[styles.headerCell, styles.w5]} />
                        <Text style={[styles.headerCell, styles.w5]} />
                        <Text style={[styles.headerCell, styles.w5]} />

                        <Text style={[styles.headerCell, styles.w5]}>Basic</Text>
                        <Text style={[styles.headerCell, styles.w5]}>DA</Text>
                        <Text style={[styles.headerCell, styles.w6]}>Gross</Text>

                        <Text style={[styles.headerCell, styles.w4]} />
                        <Text style={[styles.headerCell, styles.w4]} />

                        <Text style={[styles.headerCell, styles.w5]}>Advance</Text>
                        <Text style={[styles.headerCell, styles.w5]}>Fines</Text>
                        <Text style={[styles.headerCell, styles.w6]}>Total Ded</Text>

                        <Text style={[styles.headerCell, styles.w6]} />
                        <Text style={[styles.headerCell, styles.w8]} />
                        <Text style={[styles.headerCell, styles.w2, styles.noRightBorder]} />
                    </View>

                    {/* DATA */}
                    {data.map((row, i) => (
                        <View style={styles.row} key={i}>
                            <Text style={[styles.cell, styles.w3]}>{i + 1}</Text>
                            <Text style={[styles.cell, styles.w12]}>{row.name}</Text>
                            <Text style={[styles.cell, styles.w3]}>{row.sex}</Text>
                            <Text style={[styles.cell, styles.w6]}>{row.designation}</Text>
                            <Text style={[styles.cell, styles.w5]}>{row.wagePeriod}</Text>
                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.days}</Text>
                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.dailyRate}</Text>
                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.otRate}</Text>

                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.basic}</Text>
                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.da}</Text>
                            <Text style={[styles.cell, styles.w6, styles.right]}>{row.gross}</Text>

                            <Text style={[styles.cell, styles.w4, styles.right]}>{row.pf}</Text>
                            <Text style={[styles.cell, styles.w4, styles.right]}>{row.esi}</Text>

                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.advance}</Text>
                            <Text style={[styles.cell, styles.w5, styles.right]}>{row.fines}</Text>
                            <Text style={[styles.cell, styles.w6, styles.right]}>{row.totalDed}</Text>

                            <Text style={[styles.cell, styles.w6, styles.right]}>{row.net}</Text>
                            <Text style={[styles.cell, styles.w8]} />
                            <Text style={[styles.cell, styles.w2, styles.noRightBorder]}>Nil</Text>
                        </View>
                    ))}
                    {/* TOTAL ROW */}
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.w3,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w12, styles.bold,styles.noBottomBorder]}>Total</Text>
                        <Text style={[styles.cell, styles.w3,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w6,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w5,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w5,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w5,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w5,styles.noBottomBorder]} />

                        <Text style={[styles.cell, styles.w5, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.basic}
                        </Text>
                        <Text style={[styles.cell, styles.w5, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.da}
                        </Text>
                        <Text style={[styles.cell, styles.w6, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.gross}
                        </Text>

                        <Text style={[styles.cell, styles.w4, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.pf}
                        </Text>
                        <Text style={[styles.cell, styles.w4, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.esi}
                        </Text>

                        <Text style={[styles.cell, styles.w5, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.advance}
                        </Text>
                        <Text style={[styles.cell, styles.w5, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.fines}
                        </Text>
                        <Text style={[styles.cell, styles.w6, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.totalDed}
                        </Text>

                        <Text style={[styles.cell, styles.w6, styles.bold, styles.right,styles.noBottomBorder]}>
                            {totals.net}
                        </Text>

                        <Text style={[styles.cell, styles.w8,styles.noBottomBorder]} />
                        <Text style={[styles.cell, styles.w2,styles.noBottomBorder, styles.noRightBorder]} />
                    </View>

                </View>
                <View style={{ marginTop: 25, textAlign: "right" }}>
                    {/* <Text>For Beyondexs</Text> */}
                    <Text style={{ marginTop: 20 }}>
                        Signature of Employer / Manager / Authorised Person
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default RegisterOfWagesPDF;