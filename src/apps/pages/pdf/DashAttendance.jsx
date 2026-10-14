import React from "react";
import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

/* =========================================================
   DESIGN TOKENS  (black & white only — no fills anywhere)
========================================================= */

const COLORS = {
    black: "#000000",
};

const BOLD = "Helvetica-Bold";
const REGULAR = "Helvetica";

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 32,
        fontSize: 10,
        fontFamily: REGULAR,
        color: COLORS.black,
    },

    /* ---------- Header (title row) ---------- */
    headerBar: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "flex-start",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: COLORS.black,
        paddingBottom: 12,
        marginBottom: 18,
    },
    title: {
        fontFamily: BOLD,
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.black,
    },
    headerRight: {
        alignItems: "flex-end",
    },
    headerRightLabel: {
        fontFamily: BOLD,
        fontSize: 9,
        fontWeight: 700,
        color: COLORS.black,
    },
    headerRightValue: {
        fontFamily: BOLD,
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.black,
        marginTop: 2,
    },

    /* ---------- Student info strip (one bordered strip with dividers) ---------- */
    infoStrip: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.black,
        marginBottom: 20,
    },
    infoItem: {
        flex: 1,
        padding: 8,
        borderRightWidth: 1,
        borderRightColor: COLORS.black,
    },
    infoItemLast: {
        flex: 1,
        padding: 8,
    },
    infoLabel: {
        fontFamily: BOLD,
        fontSize: 9,
        fontWeight: 700,
        color: COLORS.black,
        marginBottom: 3,
    },
    infoValue: {
        fontFamily: BOLD,
        fontSize: 11,
        fontWeight: 700,
        color: COLORS.black,
    },

    /* ---------- Summary boxes (one bordered strip with dividers) ---------- */
    summary: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.black,
        marginBottom: 22,
    },
    summaryBox: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRightWidth: 1,
        borderRightColor: COLORS.black,
    },
    summaryBoxLast: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    summaryTitle: {
        fontFamily: BOLD,
        fontSize: 10,
        fontWeight: 700,
        color: COLORS.black,
    },
    summaryValue: {
        fontFamily: BOLD,
        marginTop: 6,
        fontSize: 18,
        fontWeight: 700,
        color: COLORS.black,
    },

    /* ---------- Section heading ---------- */
    sectionHead: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontFamily: BOLD,
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.black,
    },

    /* ---------- TABLE (full grid) ----------
       The table owns the left + top border, every cell owns its
       right border, and every row owns its bottom border. */
    table: {
        borderLeftWidth: 1,
        borderLeftColor: COLORS.black,
        borderTopWidth: 1,
        borderTopColor: COLORS.black,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
    },
    headCell: {
        fontFamily: BOLD,
        color: COLORS.black,
        fontWeight: 700,
        fontSize: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderRightColor: COLORS.black,
    },
    cell: {
        fontSize: 10,
        paddingVertical: 7,
        paddingHorizontal: 8,
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: COLORS.black,
    },
    cellText: {
        fontSize: 10,
        color: COLORS.black,
    },

    /* column widths — reused across rows */
    colWide: { flex: 2.4 },
    colNum: { flex: 1, textAlign: "right" },

    textLeft: { textAlign: "left" },
    textRight: { textAlign: "right" },

    totalsRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
    },
    totalsCell: {
        fontFamily: BOLD,
        fontSize: 10.5,
        fontWeight: 700,
        color: COLORS.black,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRightWidth: 1,
        borderRightColor: COLORS.black,
    },

    /* ---------- Footer text (page numbers) ---------- */
    footer: {
        position: "absolute",
        bottom: 18,
        left: 32,
        right: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: COLORS.black,
        paddingTop: 8,
    },
    footerText: {
        fontSize: 8,
        color: COLORS.black,
    },

    /* ---------- Header / footer images ---------- */
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
});

/* =========================================================
   SMALL HELPERS
========================================================= */

const fmtDate = () =>
    new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function ReportHeader({ title, studentName, academicYear, rightLabel, rightValue }) {
    return (
        <>
            <View style={styles.headerBar}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {/* {rightValue !== undefined && (
                    <View style={styles.headerRight}>
                        <Text style={styles.headerRightLabel}>{rightLabel}</Text>
                        <Text style={styles.headerRightValue}>{rightValue}</Text>
                    </View>
                )} */}
            </View>

            <View style={styles.infoStrip}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Student</Text>
                    <Text style={styles.infoValue}>{studentName}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Academic Year</Text>
                    <Text style={styles.infoValue}>{academicYear}</Text>
                </View>
                <View style={styles.infoItemLast}>
                    <Text style={styles.infoLabel}>Generated On</Text>
                    <Text style={styles.infoValue}>{fmtDate()}</Text>
                </View>
            </View>
        </>
    );
}

function Footer({ pageLabel }) {
    return (
        <View style={styles.footer} fixed>
            <Text style={styles.footerText}>Generated by Student Dashboard</Text>
            <Text
                style={styles.footerText}
                render={({ pageNumber, totalPages }) => `${pageLabel} · Page ${pageNumber} of ${totalPages}`}
            />
        </View>
    );
}

/* =========================================================
   ATTENDANCE REPORT
========================================================= */

export default function AttendanceReportPDF({
    footerHeight,
    filters,
    studentName,
    academicYear,
    attendancePercentage,
    months,
}) {
    const totalPresent = months.reduce((a, b) => a + b.present, 0);
    const totalAbsent = months.reduce((a, b) => a + b.absent, 0);
    const totalHoliday = months.reduce((a, b) => a + b.holidays, 0);
    const totalDays = totalPresent + totalAbsent + totalHoliday;

    // Leave room for the header / footer images so they never overlap the content.
    const pagePadding = {
        paddingTop: filters?.HeaderImg ? 78 : 32,
        paddingBottom: filters?.FooterImg ? (footerHeight || 60) + 10 : 40,
    };

    return (
        <Document>
            <Page size="A4" style={[styles.page, pagePadding]}>
                <View fixed style={styles.headerWrapper}>
                    {filters?.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>

                <ReportHeader
                    title="Attendance Report"
                    studentName={studentName}
                    academicYear={academicYear}
                    rightLabel="Overall Attendance"
                    rightValue={`${attendancePercentage}%`}
                />

                <View style={styles.summary}>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>Attendance %</Text>
                        <Text style={styles.summaryValue}>{attendancePercentage}%</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>Months Recorded</Text>
                        <Text style={styles.summaryValue}>{months.length}</Text>
                    </View>
                    <View style={styles.summaryBoxLast}>
                        <Text style={styles.summaryTitle}>Total Present Days</Text>
                        <Text style={styles.summaryValue}>{totalPresent}</Text>
                    </View>
                </View>

                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Month-wise Breakdown</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.headCell, styles.colWide, styles.textLeft]}>Month</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Present</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Absent</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Holiday</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Attendance %</Text>
                    </View>

                    {months.map((m) => {
                        const total = m.present + m.absent + m.holidays;
                        const percent = total ? ((m.present / total) * 100).toFixed(1) : "0.0";
                        return (
                            <View key={`${m.label}-${m.year}`} style={styles.row} wrap={false}>
                                <View style={[styles.cell, styles.colWide]}>
                                    <Text style={[styles.cellText, styles.textLeft]}>{m.label} {m.year}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{m.present}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{m.absent}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{m.holidays}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{percent}%</Text>
                                </View>
                            </View>
                        );
                    })}

                    <View style={styles.totalsRow} wrap={false}>
                        <Text style={[styles.totalsCell, styles.colWide, styles.textLeft]}>Total</Text>
                        <Text style={[styles.totalsCell, styles.colNum]}>{totalPresent}</Text>
                        <Text style={[styles.totalsCell, styles.colNum]}>{totalAbsent}</Text>
                        <Text style={[styles.totalsCell, styles.colNum]}>{totalHoliday}</Text>
                        <Text style={[styles.totalsCell, styles.colNum]}>
                            {totalDays ? ((totalPresent / totalDays) * 100).toFixed(1) : "0.0"}%
                        </Text>
                    </View>
                </View>

                <View
                    fixed
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: footerHeight || 60,
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
}
// import React from "react";
// import {
//     Document,
//     Page,
//     View,
//     Text,
//     StyleSheet,
//     PDFDownloadLink,
//     Image
// } from "@react-pdf/renderer";

// /* ------------------------------------------------------------------ */
// /*  SHARED STYLES                                                     */
// /* ------------------------------------------------------------------ */

// const COLORS = {
//     teal: "#0f766e",
//     tealLight: "#e6f4f2",
//     coral: "#e85d5d",
//     coralLight: "#fdeceb",
//     amber: "#c98a1b",
//     amberLight: "#faf1de",
//     ink: "#1f2937",
//     sub: "#6b7280",
//     line: "#e5e7eb",
//     rowAlt: "#f9fafb",
// };

// const styles = StyleSheet.create({
//     page: {
//         paddingTop: 32,
//         paddingBottom: 40,
//         paddingHorizontal: 32,
//         fontSize: 10,
//         fontFamily: "Helvetica",
//         color: COLORS.ink,
//     },

//     /* ---------- Header ---------- */
//     headerBar: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         borderBottomWidth: 2,
//         borderBottomColor: COLORS.ink,
//         paddingBottom: 12,
//         marginBottom: 18,
//     },
//     brand: {
//         fontSize: 9,
//         color: COLORS.sub,
//         //textTransform: "uppercase",,
//         letterSpacing: 1,
//         marginBottom: 4,
//     },
//     title: {
//         fontSize: 18,
//         fontFamily: "Helvetica-Bold",
//         color: COLORS.ink,
//     },
//     headerRight: {
//         alignItems: "flex-end",
//     },
//     headerRightLabel: {
//         fontSize: 8,
//         color: COLORS.sub,
//         //textTransform: "uppercase",,
//         letterSpacing: 0.5,
//     },
//     headerRightValue: {
//         fontSize: 11,
//         fontFamily: "Helvetica-Bold",
//         marginTop: 2,
//     },

//     /* ---------- Student info strip ---------- */
//     infoStrip: {
//         flexDirection: "row",
//         marginBottom: 20,
//     },
//     infoItem: {
//         flex: 1,
//         borderLeftWidth: 2,
//         borderLeftColor: COLORS.line,
//         paddingLeft: 10,
//         marginRight: 14,
//     },
//     infoLabel: {
//         fontSize: 8,
//         color: COLORS.sub,
//         //textTransform: "uppercase",,
//         letterSpacing: 0.5,
//         marginBottom: 3,
//     },
//     infoValue: {
//         fontSize: 11,
//         fontFamily: "Helvetica-Bold",
//     },

//     /* ---------- Summary cards ---------- */
//     summary: {
//         flexDirection: "row",
//         marginBottom: 22,
//     },
//     summaryBox: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: COLORS.line,
//         borderRadius: 4,
//         paddingVertical: 10,
//         paddingHorizontal: 12,
//         marginRight: 10,
//     },
//     summaryBoxLast: {
//         marginRight: 0,
//     },
//     summaryAccent: {
//         height: 3,
//         width: 26,
//         borderRadius: 2,
//         marginBottom: 8,
//     },
//     summaryTitle: {
//         fontSize: 8.5,
//         color: COLORS.sub,
//         //textTransform: "uppercase",,
//         letterSpacing: 0.5,
//     },
//     summaryValue: {
//         marginTop: 6,
//         fontSize: 18,
//         fontFamily: "Helvetica-Bold",
//     },

//     /* ---------- Section heading ---------- */
//     sectionHead: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     sectionDot: {
//         width: 6,
//         height: 6,
//         borderRadius: 3,
//         marginRight: 6,
//     },
//     sectionTitle: {
//         fontSize: 11.5,
//         fontFamily: "Helvetica-Bold",
//     },

//     /* ---------- Table ---------- */
//     table: {
//         borderWidth: 1,
//         borderColor: COLORS.line,
//         borderRadius: 3,
//         overflow: "hidden",
//     },
//     row: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.line,
//     },
//     rowLast: {
//         borderBottomWidth: 0,
//     },
//     rowAlt: {
//         backgroundColor: COLORS.rowAlt,
//     },
//     headRow: {
//         backgroundColor: COLORS.teal,
//     },
//     headCell: {
//         color: "#ffffff",
//         fontFamily: "Helvetica-Bold",
//         fontSize: 9,
//         paddingVertical: 8,
//         paddingHorizontal: 8,
//     },
//     cell: {
//         fontSize: 9.5,
//         paddingVertical: 7,
//         paddingHorizontal: 8,
//         justifyContent: "center",
//     },
//     cellText: {
//         fontSize: 9.5,
//     },

//     /* column widths — reused across tables */
//     colWide: { flex: 2.4 },
//     colNum: { flex: 1, textAlign: "right" },
//     colCenter: { flex: 1, textAlign: "center" },

//     textLeft: { textAlign: "left" },
//     textRight: { textAlign: "right" },
//     textCenter: { textAlign: "center" },

//     gradeChip: {
//         alignSelf: "flex-end",
//         fontSize: 8.5,
//         fontFamily: "Helvetica-Bold",
//         color: COLORS.teal,
//         backgroundColor: COLORS.tealLight,
//         paddingVertical: 2,
//         paddingHorizontal: 8,
//         borderRadius: 8,
//     },

//     totalsRow: {
//         flexDirection: "row",
//         backgroundColor: "#f3f4f6",
//         borderTopWidth: 1,
//         borderTopColor: COLORS.line,
//     },
//     totalsCell: {
//         fontSize: 9.5,
//         fontFamily: "Helvetica-Bold",
//         paddingVertical: 8,
//         paddingHorizontal: 8,
//     },

//     /* ---------- Footer ---------- */
//     footer: {
//         position: "absolute",
//         bottom: 18,
//         left: 32,
//         right: 32,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         borderTopWidth: 1,
//         borderTopColor: COLORS.line,
//         paddingTop: 8,
//     },
//     footerText: {
//         fontSize: 8,
//         color: COLORS.sub,
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
// });

// /* ------------------------------------------------------------------ */
// /*  SMALL HELPERS                                                     */
// /* ------------------------------------------------------------------ */

// const fmtDate = () =>
//     new Date().toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });

// function ReportHeader({ title, studentName, academicYear, rightLabel, rightValue }) {
//     return (
//         <>
//             <View style={styles.headerBar}>
//                 <View>
//                     {/* <Text style={styles.brand}>Student Dashboard</Text> */}
//                     <Text style={styles.title}>{title}</Text>
//                 </View>
//                 {rightValue !== undefined && (
//                     <View style={styles.headerRight}>
//                         <Text style={styles.headerRightLabel}>{rightLabel}</Text>
//                         <Text style={styles.headerRightValue}>{rightValue}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={styles.infoStrip}>
//                 <View style={styles.infoItem}>
//                     <Text style={styles.infoLabel}>Student</Text>
//                     <Text style={styles.infoValue}>{studentName}</Text>
//                 </View>
//                 <View style={styles.infoItem}>
//                     <Text style={styles.infoLabel}>Academic Year</Text>
//                     <Text style={styles.infoValue}>{academicYear}</Text>
//                 </View>
//                 <View style={[styles.infoItem, { marginRight: 0 }]}>
//                     <Text style={styles.infoLabel}>Generated On</Text>
//                     <Text style={styles.infoValue}>{fmtDate()}</Text>
//                 </View>
//             </View>
//         </>
//     );
// }

// function Footer({ pageLabel }) {
//     return (
//         <View style={styles.footer} fixed>
//             <Text style={styles.footerText}>Generated by Student Dashboard</Text>
//             <Text
//                 style={styles.footerText}
//                 render={({ pageNumber, totalPages }) => `${pageLabel} · Page ${pageNumber} of ${totalPages}`}
//             />
//         </View>
//     );
// }

// /* ------------------------------------------------------------------ */
// /*  ATTENDANCE REPORT                                                  */
// /* ------------------------------------------------------------------ */

// export default function AttendanceReportPDF({ footerHeight,filters, studentName, academicYear, attendancePercentage, months }) {
//     const totalPresent = months.reduce((a, b) => a + b.present, 0);
//     const totalAbsent = months.reduce((a, b) => a + b.absent, 0);
//     const totalHoliday = months.reduce((a, b) => a + b.holidays, 0);
//     const totalDays = totalPresent + totalAbsent + totalHoliday;

//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View fixed style={styles.headerWrapper}>
//                     {filters?.HeaderImg && (
//                         <Image
//                             src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                             style={styles.headerImage}
//                         />
//                     )}
//                 </View>
//                 <ReportHeader
//                     title="Attendance Report"
//                     studentName={studentName}
//                     academicYear={academicYear}
//                     rightLabel="Overall Attendance"
//                     rightValue={`${attendancePercentage}%`}
//                 />

//                 <View style={styles.summary}>
//                     <View style={styles.summaryBox}>
//                         {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.teal }]} /> */}
//                         <Text style={styles.summaryTitle}>Attendance %</Text>
//                         <Text style={styles.summaryValue}>{attendancePercentage}%</Text>
//                     </View>
//                     <View style={styles.summaryBox}>
//                         {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.amber }]} /> */}
//                         <Text style={styles.summaryTitle}>Months Recorded</Text>
//                         <Text style={styles.summaryValue}>{months.length}</Text>
//                     </View>
//                     <View style={[styles.summaryBox, styles.summaryBoxLast]}>
//                         {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.coral }]} /> */}
//                         <Text style={styles.summaryTitle}>Total Present Days</Text>
//                         <Text style={styles.summaryValue}>{totalPresent}</Text>
//                     </View>
//                 </View>

//                 <View style={styles.sectionHead}>
//                     <View style={[styles.sectionDot, { backgroundColor: COLORS.teal }]} />
//                     <Text style={styles.sectionTitle}>Month-wise Breakdown</Text>
//                 </View>

//                 <View style={styles.table}>
//                     <View style={[styles.row, styles.headRow]}>
//                         <Text style={[styles.headCell, styles.colWide, styles.textLeft]}>Month</Text>
//                         <Text style={[styles.headCell, styles.colNum]}>Present</Text>
//                         <Text style={[styles.headCell, styles.colNum]}>Absent</Text>
//                         <Text style={[styles.headCell, styles.colNum]}>Holiday</Text>
//                         <Text style={[styles.headCell, styles.colNum]}>Attendance %</Text>
//                     </View>

//                     {months.map((m, i) => {
//                         const total = m.present + m.absent + m.holidays;
//                         const percent = total ? ((m.present / total) * 100).toFixed(1) : "0.0";
//                         const isLast = i === months.length - 1;
//                         return (
//                             <View
//                                 key={`${m.label}-${m.year}`}
//                                 style={[styles.row, i % 2 === 1 ? styles.rowAlt : null, isLast ? styles.rowLast : null]}
//                             >
//                                 <View style={[styles.cell, styles.colWide]}>
//                                     <Text style={[styles.cellText, styles.textLeft]}>{m.label} {m.year}</Text>
//                                 </View>
//                                 <View style={[styles.cell, styles.colNum]}>
//                                     <Text style={[styles.cellText, styles.textRight]}>{m.present}</Text>
//                                 </View>
//                                 <View style={[styles.cell, styles.colNum]}>
//                                     <Text style={[styles.cellText, styles.textRight]}>
//                                         {m.absent}
//                                     </Text>
//                                 </View>
//                                 <View style={[styles.cell, styles.colNum]}>
//                                     <Text style={[styles.cellText, styles.textRight]}>
//                                         {m.holidays}
//                                     </Text>
//                                 </View>
//                                 <View style={[styles.cell, styles.colNum]}>
//                                     <Text style={[styles.cellText, styles.textRight]}>{percent}%</Text>
//                                 </View>
//                             </View>
//                         );
//                     })}

//                     <View style={styles.totalsRow}>
//                         <Text style={[styles.totalsCell, styles.colWide, styles.textLeft]}>Total</Text>
//                         <Text style={[styles.totalsCell, styles.colNum]}>{totalPresent}</Text>
//                         <Text style={[styles.totalsCell, styles.colNum]}>{totalAbsent}</Text>
//                         <Text style={[styles.totalsCell, styles.colNum]}>{totalHoliday}</Text>
//                         <Text style={[styles.totalsCell, styles.colNum]}>
//                             {totalDays ? ((totalPresent / totalDays) * 100).toFixed(1) : "0.0"}%
//                         </Text>
//                     </View>
//                 </View>

//                 <View
//                     fixed
//                     // style={styles.footerWrapper}
//                     style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         // height: footerHeight, // 🔥 dynamic
//                     }}
//                 >
//                     {filters?.FooterImg && (
//                         <Image
//                             src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                             // style={styles.footerImage}
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
// }


// /* ------------------------------------------------------------------ */
// /*  USAGE (unchanged trigger pattern from your dashboard)             */
// /* ------------------------------------------------------------------ */
// //
// // <PDFDownloadLink
// //   document={
// //     <AttendanceReportPDF
// //       studentName={student.name}
// //       academicYear={academicYear}
// //       attendancePercentage={pctAttendance}
// //       months={months}
// //     />
// //   }
// //   fileName="Attendance_Report.pdf"
// // >
// //   {({ loading }) => (loading ? "Preparing..." : "Download")}
// // </PDFDownloadLink>
// //
// // <PDFDownloadLink
// //   document={
// //     <AssessmentReportPDF
// //       studentName={student.name}
// //       academicYear={academicYear}
// //       termLabel={activeTermLabel}
// //       assessments={assessmentsToShow}
// //     />
// //   }
// //   fileName="Assessment_Report.pdf"
// // >
// //   {({ loading }) => (loading ? "Preparing..." : "Download")}
// // </PDFDownloadLink>