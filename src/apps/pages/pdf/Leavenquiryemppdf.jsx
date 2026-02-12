import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
        paddingTop: 90,
        paddingBottom: 80,
        paddingHorizontal: 20,
        fontSize: 10,
    },
    section: {
        marginBottom: 10,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20,
        marginBottom: 20
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    subHeaderText: {
        fontSize: 10,
        fontWeight: "bold",
        //textAlign: "center",
        marginBottom: 5
    },
    table: {
        display: "table",
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        marginTop: 10
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
    headerTextContainer: {
        alignItems: "center",
        marginBottom: 10,
    },

    headerCMl1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    headerCMl: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    headerCMlDesc: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    cMl1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "center",
    },

    cMl: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "center",
    },

    cMlDesc: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },

    tableColHeader1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableCol1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "right",
    },
    tableColHeader: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableColHeaderSmall: {
        width: 50,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableColHeaderDescription: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableCol: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    tableColSmall: {
        width: 50,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    tableColDescription: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    headerWrapper: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },

    headerImage: {
        width: "100%",
        height: 60,
        objectFit: "contain",
    },

    titleContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },

    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    summaryText: {
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
    },

    /* FOOTER */
    footerWrapper: {
        position: "absolute",
        bottom: 30,
        left: 5,
        right: 5,     // forces full width
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },

    footerImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
    },

    pageNumber: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 9,
    },
    table: {
        display: "table",
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 6,
    },
    row: {
        flexDirection: "row",
    },
    headerCell: {
        flex: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "#EEE",
        padding: 4,
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "center",
        fontweight: "bold",
    },
    cell: {
        flex: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        padding: 4,
        fontSize: 9,
        textAlign: "right",
    },
    lastCell: {
        borderRightWidth: 0,
    },
});


const paginateData = (data) => {
    const firstPage = data.slice(0, 18);
    const otherPages = [];

    for (let i = 18; i < data.length; i += 24) {
        otherPages.push(data.slice(i, i + 24));
    }

    return [firstPage, ...otherPages];
};
const LeaveenqempPDF = ({ data = [], filters = {} }) => {
    const isPermission = filters?.permission === "Y";
    const QR_BASE_URL = `${filters?.Imageurl}/uploads/images/`;  // your image folder path
    // const QR_BASE_URL = "https://uaam.beyondexs.com/uploads/images/";
    const headerPath = filters?.HeaderImg
        ? `${QR_BASE_URL}${filters.HeaderImg}`
        : null;
    const footerPath = filters?.FooterImg
        ? `${QR_BASE_URL}${filters.FooterImg}`
        : null;
    const pages = paginateData(data);
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
    };
    const permissionSummary = React.useMemo(() => {
        if (!isPermission || !data.length) return null;

        // filter only approved permissions
        const approvedData = data.filter(
            d => d.Status === "Approved"
        );

        // count unique approved permission days
        const uniqueDays = new Set(
            approvedData.map(d => d.DisplayPermissionDate)
        ).size;

        // sum approved hours only
        const totalHours = approvedData.reduce(
            (sum, d) => sum + Number(d.NumofHrsday || 0),
            0
        );

        return {
            days: uniqueDays,
            hours: totalHours,
        };
    }, [data, isPermission]);
    // const permissionSummaryNew = React.useMemo(() => {
    //     if (!isPermission || !data.length) return null;

    //     const summary = {
    //         Applied: { days: new Set(), hours: 0 },
    //         Approved: { days: new Set(), hours: 0 },
    //         Query: { days: new Set(), hours: 0 },
    //         Rejected: { days: new Set(), hours: 0 },
    //         // Reconsider: { days: new Set(), hours: 0 },
    //         // Completed: { days: new Set(), hours: 0 },
    //         // Assigned: { days: new Set(), hours: 0 },
    //         // Scheduled: { days: new Set(), hours: 0 },
    //     };

    //     data.forEach((item) => {
    //         const status = item.Status;
    //         const convertToDecimalHours = (value) => {
    //             if (!value) return 0;

    //             const parts = value.toString().split(".");
    //             const hours = Number(parts[0] || 0);
    //             const minutes = Number(parts[1] || 0);

    //             return hours + (minutes / 60);
    //         };

    //         const convertHHMMToReadable = (value) => {
    //             if (!value) return "0 hr 0 min";

    //             const parts = value.toString().split(".");
    //             const hours = Number(parts[0] || 0);
    //             const minutes = Number(parts[1] || 0);

    //             return `${hours} hr ${minutes} min`;
    //         };


    //         if (summary[status]) {
    //             summary[status].days.add(item.DisplayPermissionDate);
    //             // summary[status].hours += Number(item.NumofHrsday || 0);
    //             summary[status].hours += convertHHMMToReadable(item.NumofHrsday);


    //         }
    //     });

    //     // convert Set → count
    //     Object.keys(summary).forEach(status => {
    //         summary[status].days = summary[status].days.size;
    //     });

    //     return summary;
    // }, [data, isPermission]);

const permissionSummaryNew = React.useMemo(() => {
    if (!isPermission || !data.length) return null;

    const summary = {
        Applied: { days: new Set(), minutes: 0 },
        Approved: { days: new Set(), minutes: 0 },
        Query: { days: new Set(), minutes: 0 },
        Rejected: { days: new Set(), minutes: 0 },
    };

    data.forEach((item) => {
        const status = item.Status;

        if (summary[status]) {
            summary[status].days.add(item.DisplayPermissionDate);

            // Convert HH.MM to total minutes
            const parts = item.NumofHrsday?.toString().split(".") || [];
            const hours = Number(parts[0] || 0);
            const mins = Number(parts[1] || 0);

            summary[status].minutes += (hours * 60) + mins;
        }
    });

    // Convert minutes back to HH.MM format
    Object.keys(summary).forEach(status => {
        const totalMinutes = summary[status].minutes;

        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;

        summary[status].hours =
            `${hours}:${mins.toString().padStart(2, "0")}`;

        summary[status].days = summary[status].days.size;
    });

    return summary;
}, [data, isPermission]);


    const totalLeave = { CL: 0, G: 0, M: 0 };
    const takenLeave = { CL: 0, G: 0, M: 0 };
    const balancMeave = { CL: 0, G: 0, M: 0 };

    data.forEach((row) => {
        const type = row.Category; // CL / G / M
        if (!totalLeave.hasOwnProperty(type)) return;

        //  take total leave from API (same for all rows of same type)
        totalLeave[type] = Number(row.TotalLeaveDays || 0);

        //  count approved rows as taken leave
        if (row.Status === "Approved") {
            takenLeave[type] += 1;
        }
    });

    //  calculate balance from count
    Object.keys(totalLeave).forEach((type) => {
        balancMeave[type] = totalLeave[type] - takenLeave[type];
    });

    //  totals
    const totalLeaveDays =
        totalLeave.CL + totalLeave.G + totalLeave.M;

    const takenLeaveDays =
        takenLeave.CL + takenLeave.G + takenLeave.M;

    const balancMeaveDays =
        balancMeave.CL + balancMeave.G + balancMeave.M;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <Document>

            {pages.map((pageData, pageIndex) => (
                <Page size="A4" orientation="portrait" style={styles.page} key={pageIndex}>
                    <View fixed style={styles.headerWrapper}>
                        {headerPath ? (
                            <Image src={headerPath} style={styles.headerImage} />
                        ) : (
                            <View style={{ width: "100%", height: 60, backgroundColor: "#eee" }} />
                        )}
                    </View>

                    {pageIndex === 0 && (
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                {filters.permission === "Y"
                                    ? `Permission Enquiry Report - ${filters?.EmpName} (${formatDate(filters.fromdate)} - ${formatDate(filters.todate)})`
                                    : `Leave Enquiry Report - ${filters?.EmpName} (${formatDate(filters.fromdate)} - ${formatDate(filters.todate)})`
                                }
                            </Text>
                        </View>
                    )}

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.headerCMl1}>SL#</Text>

                            {isPermission ? (
                                <>
                                    <Text style={styles.headerCMl}>Date</Text>
                                    <Text style={styles.headerCMl}>From</Text>
                                    <Text style={styles.headerCMl}>To</Text>
                                    <Text style={styles.headerCMl}>Hours</Text>
                                    <Text style={styles.headerCMlDesc}>Reason</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.headerCMl}>Leave Type</Text>
                                    <Text style={styles.headerCMl}>From</Text>
                                    <Text style={styles.headerCMl}>To</Text>
                                    {/* <Text style={styles.headerCMl}>Days</Text> */}
                                    <Text style={styles.headerCMlDesc}>Reason</Text>
                                </>
                            )}

                            <Text style={styles.headerCMl}>Status</Text>
                        </View>

                        {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1;

                            return (
                                <View
                                    key={rowIndex}
                                    style={isLast ? styles.tableRowLast : styles.tableRow}
                                >
                                    <Text style={styles.cMl1}>{rowIndex + 1}</Text>
                                    {isPermission ? (
                                        <>
                                            <Text style={styles.cMl}>{row.DisplayPermissionDate}</Text>
                                            <Text style={styles.cMl}>{row.FromDate}</Text>
                                            <Text style={styles.cMl}>{row.ToDate}</Text>
                                            <Text style={styles.cMl}>{row.NumofHrsday}</Text>
                                            <Text style={styles.cMlDesc}>{row.Reason}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.cMl}>{row.LeaveName}</Text>
                                            <Text style={styles.cMl}>{row.FromDate}</Text>
                                            <Text style={styles.cMl}>{row.ToDate}</Text>
                                            <Text style={styles.cMlDesc}>{row.Comments}</Text>
                                        </>
                                    )}

                                    <Text style={styles.cMl}>{row.Status}</Text>
                                </View>
                            );
                        })}

                    </View>

                    {/* WORKING AS ON 09/02/2026 */}
                    {/* {isPermission && permissionSummary && (
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
                                Permission Summary
                            </Text>

                            <View style={styles.table}>
                                <View style={styles.row}>
                                    <Text style={styles.headerCell}>No of Days</Text>
                                    <Text style={[styles.headerCell, styles.lastCell]}>
                                        No of Hours
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.cell}>{permissionSummary.days}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {permissionSummary.hours}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    )} */}

                    {/* NEW */}
                    {isPermission && permissionSummaryNew && pageIndex === pages.length - 1 && (
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
                                Permission Summary
                            </Text>

                            <View style={styles.table}>
                                {/* Header */}
                                <View style={styles.row}>
                                    <Text style={styles.headerCell}>Status</Text>
                                    <Text style={styles.headerCell}>No of Days</Text>
                                    <Text style={[styles.headerCell, styles.lastCell]}>
                                        No of Hours
                                    </Text>
                                </View>

                                {Object.entries(permissionSummaryNew).map(([status, values]) => (
                                    <View style={styles.row} key={status}>
                                        <Text style={[styles.cell, { textAlign: "left" }]}>
                                            {status}
                                        </Text>
                                        <Text style={styles.cell}>{values.days}</Text>
                                        <Text style={[styles.cell, styles.lastCell]}>
                                            {/* {values.hours.toFixed(2)} */}
                                            {values.hours}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* {isPermission && permissionSummary && (
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
                                Permission Summary
                            </Text>

                            <Text style={{ fontSize: 9, marginBottom: 2 }}>
                                No of Days : {permissionSummary.days}
                            </Text>

                            <Text style={{ fontSize: 9, marginBottom: 2 }}>
                                No of Hours : {permissionSummary.hours}
                            </Text>

                            {filters.leaveBalance && (
                                <Text style={{ fontSize: 9, marginTop: 4 }}>
                                    Balance Leave Days :{" "}
                                    {Object.entries(filters.leaveBalance)
                                        .map(([type, days]) => `${type} - ${days}`)
                                        .join(", ")}
                                </Text>
                            )}
                        </View>
                    )} */}
                    {/* LEAVE SUMMARY – TEXT ONLY */}
                    {!isPermission && pageIndex === pages.length - 1 && (
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
                                Leave Summary
                            </Text>

                            <View style={styles.table}>
                                {/* HEADER */}
                                <View style={styles.row}>
                                    <Text style={styles.headerCell}>Leave Type</Text>
                                    <Text style={styles.headerCell}>Total</Text>
                                    <Text style={styles.headerCell}>Taken</Text>
                                    <Text style={[styles.headerCell, styles.lastCell]}>
                                        Balance
                                    </Text>
                                </View>

                                {/* CL */}
                                <View style={styles.row}>
                                    <Text style={[styles.cell, { textAlign: "left" }]}>Casual Leave</Text>
                                    <Text style={styles.cell}>{totalLeave.CL}</Text>
                                    <Text style={styles.cell}>{takenLeave.CL}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {balancMeave.CL}
                                    </Text>
                                </View>

                                {/* SL */}
                                <View style={styles.row}>
                                    <Text style={[styles.cell, { textAlign: "left" }]}>Sick Leave</Text>
                                    <Text style={styles.cell}>{totalLeave.G}</Text>
                                    <Text style={styles.cell}>{takenLeave.G}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {balancMeave.G}
                                    </Text>
                                </View>

                                {/* EL */}
                                <View style={styles.row}>
                                    <Text style={[styles.cell, { textAlign: "left" }]}>Medical Leave</Text>
                                    <Text style={styles.cell}>{totalLeave.M}</Text>
                                    <Text style={styles.cell}>{takenLeave.M}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {balancMeave.M}
                                    </Text>
                                </View>
                            </View>

                            {/* OPTIONAL TOTAL LINE */}
                            <Text style={{ fontSize: 9, marginTop: 4 }}>
                                Total Leave Days: {totalLeaveDays}, Leave Taken Days: {takenLeaveDays},
                                Balance Leave Days: {balancMeaveDays}
                            </Text>
                        </View>
                    )}

                    {/* </View> */}
                    {/* RIGHT — QR IMAGE */}
                    <View fixed style={styles.footerWrapper}>
                        {footerPath ? (
                            <Image src={footerPath} style={styles.footerImage} />
                        ) : (
                            <View style={{ width: "100%", height: 50, backgroundColor: "#eee" }} />
                        )}
                    </View>

                    <View
                        fixed
                        style={{
                            position: "absolute",
                            bottom: 10,
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            fontSize: 10,
                        }}
                    >
                        <Text>Page {pageIndex + 1} of {pages.length}</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default LeaveenqempPDF;
