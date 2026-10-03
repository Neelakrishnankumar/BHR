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


export default function PromotionReportPDF({
    footerHeight,
    filters,
    studentName,
    academicYear,
    promotionMarks = [],
}) {
    const marks = Array.isArray(promotionMarks)
        ? promotionMarks
        : [];

    const percentageData = marks.map((item) => {
        const obtained = Number(item?.Marks) || 0;
        const outOf = Number(item?.OutOfMarks) || 0;

        const percentage =
            outOf > 0
                ? (obtained / outOf) * 100
                : 0;

        return {
            ...item,
            obtained,
            outOf,
            percentage,
        };
    });

    const avg = percentageData.length
        ? percentageData.reduce(
            (sum, item) =>
                sum + item.percentage,
            0
        ) / percentageData.length
        : 0;

    const highest = percentageData.length
        ? Math.max(
            ...percentageData.map(
                (item) => item.percentage
            )
        )
        : 0;
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header Image */}
                <View fixed style={styles.headerWrapper}>
                    {filters?.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>

                {/* Report Header */}
                <ReportHeader
                    title="Promotion Marksheet"
                    studentName={studentName}
                    academicYear={academicYear}
                    rightLabel="Report"
                    rightValue="Promotion"
                />

                {/* Summary */}
                <View style={styles.summary}>

                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>
                            Average Percentage
                        </Text>

                        <Text style={styles.summaryValue}>
                            {avg.toFixed(1)}%
                        </Text>
                    </View>

                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>
                            Highest Percentage
                        </Text>

                        <Text style={styles.summaryValue}>
                            {highest.toFixed(1)}%
                        </Text>
                    </View>

                    <View style={[styles.summaryBox, styles.summaryBoxLast]}>
                        <Text style={styles.summaryTitle}>
                            Subjects
                        </Text>

                        <Text style={styles.summaryValue}>
                            {marks.length}
                        </Text>
                    </View>

                </View>

                {/* Section Heading */}
                <View style={styles.sectionHead}>
                    <View
                        style={[
                            styles.sectionDot,
                            { backgroundColor: COLORS.amber },
                        ]}
                    />

                    <Text style={styles.sectionTitle}>
                        Subject-wise Promotion Marks
                    </Text>
                </View>

                {/* Table */}
                <View style={styles.table}>

                    {/* Header */}
                    <View style={[styles.row, styles.headRow]}>

                        <Text
                            style={[
                                styles.headCell,
                                { flex: 0.6 },
                                styles.textCenter,
                            ]}
                        >
                            SL#
                        </Text>

                        <Text
                            style={[
                                styles.headCell,
                                styles.colWide,
                                styles.textLeft,
                            ]}
                        >
                            Subject
                        </Text>

                        <Text
                            style={[
                                styles.headCell,
                                styles.colNum,
                                styles.textCenter,
                            ]}
                        >
                            Marks
                        </Text>

                        <Text
                            style={[
                                styles.headCell,
                                styles.colNum,
                                styles.textCenter,
                            ]}
                        >
                            Out Of Marks
                        </Text>

                        <Text
                            style={[
                                styles.headCell,
                                styles.colNum,
                                styles.textCenter,
                            ]}
                        >
                            Percentage
                        </Text>

                    </View>

                    {/* Rows */}
                    {percentageData.map((item, index) => (
                        <View
                            key={item.RecordID ?? index}
                            style={[
                                styles.row,
                                index % 2 === 1
                                    ? styles.rowAlt
                                    : null,
                                index === percentageData.length - 1
                                    ? styles.rowLast
                                    : null,
                            ]}
                        >

                            <View
                                style={[
                                    styles.cell,
                                    { flex: 0.6 },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        styles.textCenter,
                                    ]}
                                >
                                    {index + 1}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.cell,
                                    styles.colWide,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        styles.textLeft,
                                    ]}
                                >
                                    {item.Subject || "-"}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.cell,
                                    styles.colNum,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        styles.textCenter,
                                    ]}
                                >
                                    {item.obtained}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.cell,
                                    styles.colNum,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        styles.textCenter,
                                    ]}
                                >
                                    {item.outOf}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.cell,
                                    styles.colNum,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.cellText,
                                        styles.textCenter,
                                    ]}
                                >
                                    {item.percentage.toFixed(1)}%
                                </Text>
                            </View>

                        </View>
                    ))}
                    {/* Total / Average */}
                    <View style={styles.totalsRow}>

                        <Text
                            style={[
                                styles.totalsCell,
                                {
                                    flex: 3.0,
                                },
                                styles.textLeft,
                            ]}
                        >
                            Average
                        </Text>

                        <Text
                            style={[
                                styles.totalsCell,
                                styles.colNum,
                            ]}
                        />

                        <Text
                            style={[
                                styles.totalsCell,
                                styles.colNum,
                            ]}
                        />

                        <Text
                            style={[
                                styles.totalsCell,
                                styles.colNum,
                                styles.textCenter,
                            ]}
                        >
                            {avg.toFixed(1)}%
                        </Text>

                    </View>

                </View>

                {/* Footer Image */}
                <View
                    fixed
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: footerHeight,
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
