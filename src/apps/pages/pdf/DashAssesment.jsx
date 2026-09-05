import React from "react";
import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    PDFDownloadLink,
    Image
} from "@react-pdf/renderer";

/* ------------------------------------------------------------------ */
/*  SHARED STYLES                                                     */
/* ------------------------------------------------------------------ */

const COLORS = {
    teal: "#0f766e",
    tealLight: "#e6f4f2",
    coral: "#e85d5d",
    coralLight: "#fdeceb",
    amber: "#c98a1b",
    amberLight: "#faf1de",
    ink: "#1f2937",
    sub: "#6b7280",
    line: "#e5e7eb",
    rowAlt: "#f9fafb",
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 32,
        paddingBottom: 40,
        paddingHorizontal: 32,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: COLORS.ink,
    },

    /* ---------- Header ---------- */
    headerBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottomWidth: 2,
        borderBottomColor: COLORS.ink,
        paddingBottom: 12,
        marginBottom: 18,
    },
    brand: {
        fontSize: 9,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: COLORS.ink,
    },
    headerRight: {
        alignItems: "flex-end",
    },
    headerRightLabel: {
        fontSize: 8,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    headerRightValue: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        marginTop: 2,
    },

    /* ---------- Student info strip ---------- */
    infoStrip: {
        flexDirection: "row",
        marginBottom: 20,
    },
    infoItem: {
        flex: 1,
        borderLeftWidth: 2,
        borderLeftColor: COLORS.line,
        paddingLeft: 10,
        marginRight: 14,
    },
    infoLabel: {
        fontSize: 8,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
    },

    /* ---------- Summary cards ---------- */
    summary: {
        flexDirection: "row",
        marginBottom: 22,
    },
    summaryBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.line,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    summaryBoxLast: {
        marginRight: 0,
    },
    summaryAccent: {
        height: 3,
        width: 26,
        borderRadius: 2,
        marginBottom: 8,
    },
    summaryTitle: {
        fontSize: 8.5,
        color: COLORS.sub,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    summaryValue: {
        marginTop: 6,
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
    },

    /* ---------- Section heading ---------- */
    sectionHead: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    sectionDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    sectionTitle: {
        fontSize: 11.5,
        fontFamily: "Helvetica-Bold",
    },

    /* ---------- Table ---------- */
    table: {
        borderWidth: 1,
        borderColor: COLORS.line,
        borderRadius: 3,
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.line,
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    rowAlt: {
        backgroundColor: COLORS.rowAlt,
    },
    headRow: {
        backgroundColor: COLORS.teal,
    },
    headCell: {
        color: "#ffffff",
        fontFamily: "Helvetica-Bold",
        fontSize: 9,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    cell: {
        fontSize: 9.5,
        paddingVertical: 7,
        paddingHorizontal: 8,
        justifyContent: "center",
    },
    cellText: {
        fontSize: 9.5,
    },

    /* column widths — reused across tables */
    colWide: { flex: 2.4 },
    colNum: { flex: 1, textAlign: "right" },
    colCenter: { flex: 1, textAlign: "center" },

    textLeft: { textAlign: "left" },
    textRight: { textAlign: "right" },
    textCenter: { textAlign: "center" },

    gradeChip: {
        alignSelf: "flex-end",
        fontSize: 8.5,
        fontFamily: "Helvetica-Bold",
        color: COLORS.teal,
        backgroundColor: COLORS.tealLight,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 8,
    },

    totalsRow: {
        flexDirection: "row",
        backgroundColor: "#f3f4f6",
        borderTopWidth: 1,
        borderTopColor: COLORS.line,
    },
    totalsCell: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    /* ---------- Footer ---------- */
    footer: {
        position: "absolute",
        bottom: 18,
        left: 32,
        right: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: COLORS.line,
        paddingTop: 8,
    },
    footerText: {
        fontSize: 8,
        color: COLORS.sub,
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
});

/* ------------------------------------------------------------------ */
/*  SMALL HELPERS                                                     */
/* ------------------------------------------------------------------ */

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
                    {/* <Text style={styles.brand}>Student Dashboard</Text> */}
                    <Text style={styles.title}>{title}</Text>
                </View>
                {rightValue !== undefined && (
                    <View style={styles.headerRight}>
                        <Text style={styles.headerRightLabel}>{rightLabel}</Text>
                        <Text style={styles.headerRightValue}>{rightValue}</Text>
                    </View>
                )}
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
                <View style={[styles.infoItem, { marginRight: 0 }]}>
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

/* ------------------------------------------------------------------ */
/*  ASSESSMENT REPORT                                                  */
/* ------------------------------------------------------------------ */

export default function AssessmentReportPDF({ footerHeight, filters, studentName, academicYear, termLabel, assessments }) {
    const scores = assessments.map((a) => a.percent ?? a.score ?? 0);
    const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const highest = scores.length ? Math.max(...scores) : 0;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View fixed style={styles.headerWrapper}>
                    {filters?.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>
                <ReportHeader
                    title="Assessment Report"
                    studentName={studentName}
                    academicYear={academicYear}
                    rightLabel="Term"
                    rightValue={termLabel}
                />

                <View style={styles.summary}>
                    <View style={styles.summaryBox}>
                        {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.amber }]} /> */}
                        <Text style={styles.summaryTitle}>Average Score</Text>
                        <Text style={styles.summaryValue}>{avg.toFixed(1)}%</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.teal }]} /> */}
                        <Text style={styles.summaryTitle}>Highest Score</Text>
                        <Text style={styles.summaryValue}>{highest}%</Text>
                    </View>
                    <View style={[styles.summaryBox, styles.summaryBoxLast]}>
                        {/* <View style={[styles.summaryAccent, { backgroundColor: COLORS.coral }]} /> */}
                        <Text style={styles.summaryTitle}>Subjects Assessed</Text>
                        <Text style={styles.summaryValue}>{assessments.length}</Text>
                    </View>
                </View>

                <View style={styles.sectionHead}>
                    <View style={[styles.sectionDot, { backgroundColor: COLORS.amber }]} />
                    <Text style={styles.sectionTitle}>Subject-wise Scores</Text>
                </View>

                <View style={styles.table}>
                    <View style={[styles.row, styles.headRow]}>
                        <Text style={[styles.headCell, styles.colWide, styles.textLeft]}>Subject</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Score</Text>
                        <Text style={[styles.headCell, styles.colNum]}>Percentage</Text>
                        <Text style={[styles.headCell, styles.colCenter]}>Grade</Text>
                    </View>

                    {assessments.map((a, i) => {
                        const isLast = i === assessments.length - 1;
                        const subject = a.subject || a.subjectName || a.name || "—";
                        const percent = a.percent ?? a.score ?? 0;
                        const grade = a.grade || "—";
                        return (
                            <View
                                key={`${subject}-${i}`}
                                style={[styles.row, i % 2 === 1 ? styles.rowAlt : null, isLast ? styles.rowLast : null]}
                            >
                                <View style={[styles.cell, styles.colWide]}>
                                    <Text style={[styles.cellText, styles.textLeft]}>{subject}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{a.score ?? a.percent ?? 0}</Text>
                                </View>
                                <View style={[styles.cell, styles.colNum]}>
                                    <Text style={[styles.cellText, styles.textRight]}>{percent}%</Text>
                                </View>
                                <View style={[styles.cell, styles.colCenter]}>
                                    <Text style={styles.gradeChip}>{grade}</Text>
                                </View>
                            </View>
                        );
                    })}

                    <View style={styles.totalsRow}>
                        <Text style={[styles.totalsCell, styles.colWide, styles.textLeft]}>Average</Text>
                        <Text style={[styles.totalsCell, styles.colNum]}></Text>
                        <Text style={[styles.totalsCell, styles.colNum]}>{avg.toFixed(1)}%</Text>
                        <Text style={[styles.totalsCell, styles.colCenter]}></Text>
                    </View>
                </View>

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
}

/* ------------------------------------------------------------------ */
/*  USAGE (unchanged trigger pattern from your dashboard)             */
/* ------------------------------------------------------------------ */
//
// <PDFDownloadLink
//   document={
//     <AttendanceReportPDF
//       studentName={student.name}
//       academicYear={academicYear}
//       attendancePercentage={pctAttendance}
//       months={months}
//     />
//   }
//   fileName="Attendance_Report.pdf"
// >
//   {({ loading }) => (loading ? "Preparing..." : "Download")}
// </PDFDownloadLink>
//
// <PDFDownloadLink
//   document={
//     <AssessmentReportPDF
//       studentName={student.name}
//       academicYear={academicYear}
//       termLabel={activeTermLabel}
//       assessments={assessmentsToShow}
//     />
//   }
//   fileName="Assessment_Report.pdf"
// >
//   {({ loading }) => (loading ? "Preparing..." : "Download")}
// </PDFDownloadLink>