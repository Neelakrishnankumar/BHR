import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

// Styles mirror Dailyattendancepdf.jsx (same header/footer image handling,
// table borders, and page numbering) but laid out for the 4 reminder
// columns: SL#, Name, Classification, Event Date.
const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
    },
    subHeaderText: {
        fontSize: 9,
        textAlign: "center",
        color: "#444",
        marginTop: 2,
    },
    table: {
        display: "table",
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        borderBottomStyle: "solid",
    },
    tableRowLast: {
        flexDirection: "row",
    },
    // Header cells
    tableColHeader1: {
        width: "5%", // SL#
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader2: {
        width: "40%", // Name
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader3: {
        width: "30%", // Classification
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeaderLast: {
        width: "25%", // Event Date
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    // Data cells
    tableCol1: {
        width: "5%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        fontSize: 8,
    },
    tableCol2: {
        width: "40%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "left",
        fontSize: 7,
    },
    tableCol3: {
        width: "30%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "left",
        fontSize: 7,
    },
    tableColLast: {
        width: "25%",
        padding: 3,
        textAlign: "center",
        fontSize: 7,
    },
    // Header & footer images
    headerWrapper: {
        position: "absolute",
        top: 10,
        left: 15,
        right: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        width: "100%",
        height: 50,
        objectFit: "contain",
    },
    pageNumber: {
        position: "absolute",
        bottom: 5,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 7,
    },
});

// Same fixed page-size chunking approach as Dailyattendancepdf.jsx, minus
// the "leave room for the summary" adjustment on the last page since this
// report has no summary section.
const paginateData = (data) => {
    if (!data || data.length === 0) return [];

    const pageSize = 35;
    const pages = [];

    for (let i = 0; i < data.length; i += pageSize) {
        pages.push(data.slice(i, i + pageSize));
    }

    return pages;
};

// "1980-07-23" -> "23-07-1980". Also tolerates a trailing time part
// ("1980-07-23 00:00:00") the same way Dailyattendancepdf.jsx does.
const formatDateDisplay = (dateStr) => {
    if (!dateStr || dateStr === "-") return "-";
    const datePart = dateStr.split(" ")[0];
    const [year, month, day] = datePart.split("-");
    if (!year || !month || !day) return dateStr;
    return `${day}-${month}-${year}`;
};

const BirthdayAnniversaryPDF = ({ data = [], filters = {}, footerHeight }) => {
    const pages = paginateData(data);
    const isBirthday = filters.Category === "Birthday";

    if (!pages || pages.length === 0) {
        return (
            <Document>
                <Page size="A4" style={{ padding: 20, fontSize: 10 }}>
                    <Text>No reminders available</Text>
                </Page>
            </Document>
        );
    }

    const reportTitle = isBirthday
        ? "Birthday Reminders"
        : "Work Anniversary Reminders";
    const eventDateHeader = isBirthday ? "Date of Birth" : "Date of Join";

    return (
        <Document>
            {pages.map((pageData, pageIndex) => (
                <Page
                    size="A4"
                    style={{
                        fontFamily: "Helvetica",
                        backgroundColor: "#ffffff",
                        paddingTop: 70,
                        paddingBottom: footerHeight,
                        paddingHorizontal: 15,
                        fontSize: 9,
                    }}
                    key={pageIndex}
                >
                    {/* Header Image - Optional */}
                    {filters.HeaderImg &&
                        filters.HeaderImg.length > 0 &&
                        filters.HeaderImg.length < 100000 && (
                            <View fixed style={styles.headerWrapper}>
                                <Image
                                    src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                                    style={styles.headerImage}
                                />
                            </View>
                        )}

                    {/* Title - Only on first page */}
                    {pageIndex === 0 && (
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{reportTitle}</Text>
                            {filters.Period && (
                                <Text style={styles.subHeaderText}>
                                    {filters.Period} - ({filters.Date})
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Data Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader1}>SL#</Text>
                            <Text style={styles.tableColHeader2}>Name</Text>
                            <Text style={styles.tableColHeader3}>Classification</Text>
                            <Text style={styles.tableColHeaderLast}>{eventDateHeader}</Text>
                        </View>

                        {/* Table Rows */}
                        {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1;
                            const slNo = pageIndex * 35 + rowIndex + 1;
                            const eventDate = isBirthday
                                ? row.DateOfBirth
                                : row.DateOfJoining;

                            return (
                                <View
                                    key={row.RecordID ?? `${pageIndex}-${rowIndex}`}
                                    style={isLast ? styles.tableRowLast : styles.tableRow}
                                >
                                    <Text style={styles.tableCol1}>{slNo}</Text>
                                    <Text style={styles.tableCol2}>{row.Name || "-"}</Text>
                                    <Text style={styles.tableCol3}>
                                        {row.ClassificationDesc || "-"}
                                    </Text>
                                    <Text style={styles.tableColLast}>
                                        {eventDate}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Footer Image - Optional */}
                    {filters.FooterImg &&
                        filters.FooterImg.length > 0 &&
                        filters.FooterImg.length < 100000 && (
                            <View
                                fixed
                                style={{
                                    position: "absolute",
                                    bottom: 15,
                                    left: 0,
                                    right: 0,
                                    height: footerHeight, // dynamic, same as Dailyattendancepdf.jsx
                                }}
                            >
                                <Image
                                    src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </View>
                        )}

                    {/* Page Number */}
                    <Text fixed style={styles.pageNumber}>
                        Page {pageIndex + 1} of {pages.length}
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default BirthdayAnniversaryPDF;
