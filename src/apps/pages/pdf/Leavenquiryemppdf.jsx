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
    const firstPage = data.slice(0, 20);
    const otherPages = [];

    for (let i = 20; i < data.length; i += 26) {
        otherPages.push(data.slice(i, i + 26));
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

        // Count unique permission days
        const uniqueDays = new Set(
            data.map(d => d.DisplayPermissionDate)
        ).size;

        // Sum total hours
        const totalHours = data.reduce(
            (sum, d) => sum + Number(d.NumofHrsday || 0),
            0
        );

        return {
            days: uniqueDays,
            hours: totalHours,
        };
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

                    {isPermission && permissionSummary && (
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
                    {!isPermission && (
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
                                    <Text style={styles.cell}>Casual Leave</Text>
                                    <Text style={styles.cell}>{totalLeave.CL}</Text>
                                    <Text style={styles.cell}>{takenLeave.CL}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {balancMeave.CL}
                                    </Text>
                                </View>

                                {/* SL */}
                                <View style={styles.row}>
                                    <Text style={styles.cell}>Sick Leave</Text>
                                    <Text style={styles.cell}>{totalLeave.G}</Text>
                                    <Text style={styles.cell}>{takenLeave.G}</Text>
                                    <Text style={[styles.cell, styles.lastCell]}>
                                        {balancMeave.G}
                                    </Text>
                                </View>

                                {/* EL */}
                                <View style={styles.row}>
                                    <Text style={styles.cell}>Emergency Leave</Text>
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
