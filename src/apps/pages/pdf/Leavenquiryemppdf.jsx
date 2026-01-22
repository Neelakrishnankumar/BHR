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

    headerCell1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    headerCell: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    headerCellDesc: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },

    cell1: {
        width: 30,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "center",
    },

    cell: {
        width: 70,
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "center",
    },

    cellDesc: {
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
        height: 50,
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

                    {/* <View style={styles.table}> */}
                    {/* <View style={styles.tableRow}>
                            <Text style={styles.headerCell1}>S.No</Text>
                            <Text style={styles.headerCell}>From Date</Text>
                            <Text style={styles.headerCell}>To Date</Text>
                            <Text style={styles.headerCell}>Permission Date</Text>
                            <Text style={styles.headerCellDesc}>Reason</Text>
                            <Text style={styles.headerCell}>Status</Text>
                        </View> */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.headerCell1}>SL#</Text>

                            {isPermission ? (
                                <>
                                    <Text style={styles.headerCell}>Permission Date</Text>
                                    <Text style={styles.headerCell}>From Time</Text>
                                    <Text style={styles.headerCell}>To Time</Text>
                                    <Text style={styles.headerCellDesc}>Reason</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.headerCell}>Leave Type</Text>
                                    <Text style={styles.headerCell}>From Date</Text>
                                    <Text style={styles.headerCell}>To Date</Text>
                                    <Text style={styles.headerCellDesc}>Reason</Text>
                                </>
                            )}

                            <Text style={styles.headerCell}>Status</Text>
                        </View>



                        {/* {pageData.map((row, rowIndex) => {
                                const isLast = rowIndex === pageData.length - 1;
                                return (
                                    <View
                                        key={rowIndex}
                                        style={isLast ? styles.tableRowLast : styles.tableRow}
                                    >
                                        <Text style={styles.cell1}>{rowIndex + 1}</Text>
                                        <Text style={styles.cell}>{row.FromDate}</Text>
                                        <Text style={styles.cell}>{row.ToDate}</Text>
                                        <Text style={styles.cell}>{row.PermissionDate}</Text>
                                        <Text style={styles.cellDesc}>{row.Reason}</Text>
                                        <Text style={styles.cell}>{row.Status}</Text>
                                    </View>

                                );
                            })} */}
                        {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1;

                            return (
                                <View
                                    key={rowIndex}
                                    style={isLast ? styles.tableRowLast : styles.tableRow}
                                >
                                    <Text style={styles.cell1}>{rowIndex + 1}</Text>

                                    {isPermission ? (
                                        <>
                                            <Text style={styles.cell}>{row.DisplayPermissionDate}</Text>
                                            <Text style={styles.cell}>{row.FromDate}</Text>
                                            <Text style={styles.cell}>{row.ToDate}</Text>
                                            <Text style={styles.cellDesc}>{row.Reason}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.cell}>{row.LeaveName}</Text>
                                            <Text style={styles.cell}>{row.FromDate}</Text>
                                            <Text style={styles.cell}>{row.ToDate}</Text>
                                            <Text style={styles.cellDesc}>{row.Comments}</Text>
                                        </>
                                    )}

                                    <Text style={styles.cell}>{row.Status}</Text>
                                </View>
                            );
                        })}

                    </View>
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
