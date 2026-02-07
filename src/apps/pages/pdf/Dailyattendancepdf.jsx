import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,Image
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
    // page: {
    //     padding: 20,
    //     fontSize: 10,
    // },
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10
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
    tableColHeader: {
        width: "20%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableCol3Header: {
        width: "30%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableCol2Header: {
        width: "10%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableColHeader1: {
        width: "5%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    tableColHeaderLast: {
        width: "15%",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#EEE",
        textAlign: "center",
    },
    tableCol3: {
        width: "30%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    tableCol: {
        width: "20%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    tableCol2: {
        width: "10%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        textAlign: "left",
    },
    tableCol1: {
        width: "5%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "right",
    },
    tableColLast: {
        width: "15%",
        padding: 5,
    },
        /* HEADER */
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
});



// Split data: 20 on first page, 26 afterwards
const paginateData = (data) => {
    const firstPage = data.slice(0, 20);
    const otherPages = [];

    for (let i = 20; i < data.length; i += 0) {
        otherPages.push(data.slice(i, i + 20));
    }

    return [firstPage, ...otherPages];
};

const DailyattendancePDF = ({ data = [], filters = {} }) => {
    const pages = paginateData(data);
    pages.forEach((page, i) => {
        console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
    });
    const formattedDate = filters.Date
        ? filters.Date.split("-").reverse().join("-")
        : "";
    const isSelf = filters.Self === "Y";


    const dynamicHeaderStyles = {
        col1: {
            ...styles.tableColHeader1,
            width: "8%"
        },
        colDate: {
            ...styles.tableColHeader,
            width: "14%"
        },
        colCheckIn: {
            ...styles.tableColHeader,
            width: "15%"
        },
        colCheckOut: {
            ...styles.tableColHeader,
            width: "20%"
        },
        colHours: {
            ...styles.tableCol2Header,
            width: "23%"
        },
        colStatus: {
            ...styles.tableColHeaderLast,
            width: "20%"
        },
        colName: {
            ...styles.tableCol3Header,
            display: filters.Self === "Y" ? "none" : "block"
        }
    };

    const dynamicRowStyles = {
        col1: {
            ...styles.tableCol1,
            width: "8%"
        },
        colDate: {
            ...styles.tableCol,
            width: "14%"
        },
        colCheckIn: {
            ...styles.tableCol,
            width: "15%"
        },
        colCheckOut: {
            ...styles.tableCol,
            width: "20%"
        },
        colHours: {
            ...styles.tableCol2,
            width: "23%"
        },
        colStatus: {
            ...styles.tableColLast,
            width: "20%"
        },
        colName: {
            ...styles.tableCol3,
            display: filters.Self === "Y" ? "none" : "block"
        }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <Document>
            {pages.map((pageData, pageIndex) => (
                <Page size="A4" style={styles.page} key={pageIndex}>
                    
                      <View fixed style={styles.headerWrapper}>
                                  {filters.HeaderImg && (
                                    <Image
                                      src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                                      style={styles.headerImage}
                                    />
                                  )}
                                </View>
                    {pageIndex === 0 && (
                        <View style={styles.headerContainer}>
                            {/* <Text style={styles.headerText}>
                {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
              </Text> */}
                            {/* <Text style={styles.headerText}>
                {filters.Date
                  ? `Attendance Report ${filters.EmployeeID} (${formattedDate})`
                  : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
              </Text> */}
                            <Text style={styles.headerText}>
                                {filters.Self === "Y"
                                    ? `Daily Attendance Report - (${formattedDate})`
                                    : filters.Self === "N"
                                        ? `Daily Attendance Report - (${formattedDate})`
                                        : `Daily Attendance Report - (${formattedDate})`}
                            </Text>


                        </View>

                    )}

                    {/* Table Header */}
                    <View style={styles.table}>
                        {/* <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>S.No</Text>
              {filters.Self === "N" && ( <Text style={styles.tableCol3Header}>Employee Name</Text>)}
              <Text style={dynamicStyles.colCheckIn}>Check In</Text>
              <Text style={dynamicStyles.colCheckOut}>Check Out</Text>
              <Text style={dynamicStyles.colHours}>Hrs</Text>
              <Text style={dynamicStyles.colStatus}>Status</Text>
            </View> */}
                        <View style={styles.tableRow}>
                            <Text style={dynamicHeaderStyles.col1}>SL#</Text>
                            <Text style={dynamicHeaderStyles.colDate}>Name</Text>
                            <Text style={dynamicHeaderStyles.colCheckIn}>Check In Date Time</Text>
                            <Text style={dynamicHeaderStyles.colCheckOut}>Check Out Date Time</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Worked Hours</Text>
                            <Text style={dynamicHeaderStyles.colStatus}>Status</Text>
                        </View>

                        {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1;
                            return (
                                <View key={rowIndex} style={isLast ? styles.tableRowLast : styles.tableRow}>
                                    <Text style={dynamicRowStyles.col1}>{row.SLNO}</Text>
                                    <Text style={dynamicRowStyles.colDate}>{row.Name}</Text>
                                    <Text style={dynamicRowStyles.colCheckIn}>{row.EmplyeeCheckInDateTime}</Text>
                                    <Text style={dynamicRowStyles.colCheckOut}>{row.EmplyeeCheckOutDateTime}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.NumberOfHoursWorked}</Text>
                                    <Text style={dynamicRowStyles.colStatus}>{row.Status}</Text>
                                    {/* <Text style={dynamicRowStyles.colStatus}>{row.Comments}</Text> */}
                                </View>
                            );
                        })}

                    </View>

                       {/* FOOTER */}
                                    <View fixed style={styles.footerWrapper}>
                                      {filters.FooterImg && (
                                        <Image
                                          src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                                          style={styles.footerImage}
                                        />
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

export default DailyattendancePDF;
