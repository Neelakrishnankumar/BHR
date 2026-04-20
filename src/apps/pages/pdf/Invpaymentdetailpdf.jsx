import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
    page: {
        // padding: 20,
        // fontSize: 10,
        paddingTop: 90,   // ⬅ space for header
        paddingBottom: 80, // ⬅ space for footer
        paddingHorizontal: 20,
        fontSize: 10,
    },
    section: {
        marginBottom: 10,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -3,
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

    /*HEADER*/
    headerWrapper: {
        position: "absolute",
        top: 15,
        left: 20,
        right: 20,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        width: "100%",
        height: 50,
        objectFit: "contain",
    },
    /* FOOTER */
    footerWrapper: {
        position: "absolute",
        bottom: 25,
        left: 5,
        right: 5,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    footerWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
    },

    footerImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
    },

    // footerImage: {
    //     width: "100%",
    //     height: "100%",
    //     objectFit: "cover",
    // },

});



// Split data: 20 on first page, 26 afterwards
// const paginateData = (data) => {
//   const firstPage = data.slice(0, 31);
//   const otherPages = [];

//   for (let i = 31; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };
const paginateData = (data, rowsPerPage = 25) => {
    const pages = [];

    for (let i = 0; i < data.length; i += rowsPerPage) {
        pages.push(data.slice(i, i + rowsPerPage));
    }

    return pages;
};

const InvpaymentPDF = ({ data = [], filters = {} }) => {
    // const pages = paginateData(data, 25);
    // const pages = paginateData(data);
     const FIRST_PAGE_COUNT = 13;
    const OTHER_PAGE_COUNT = 15;

    const paginateData = (data) => {
        const pages = [];

        // First page
        pages.push(data.slice(0, FIRST_PAGE_COUNT));

        // Remaining pages
        for (
            let i = FIRST_PAGE_COUNT;
            i < data.length;
            i += OTHER_PAGE_COUNT
        ) {
            pages.push(data.slice(i, i + OTHER_PAGE_COUNT));
        }

        return pages;
    };
    const pages = paginateData(data);
    pages.forEach((page, i) => {
        console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
    });
    const formattedfromDate = filters.fromDate
        ? filters.fromDate.split("-").reverse().join("-")
        : "";
    const formattedtoDate = filters.toDate
        ? filters.toDate.split("-").reverse().join("-")
        : "";


    const dynamicHeaderStyles = {
        col1: {
            ...styles.tableColHeader1,
            width: "4.5%"
        },
        colDate: {
            ...styles.tableColHeader,
            width: "7.5%"
        },
        colCheckIn: {
            ...styles.tableColHeader,
            width: "20%"
        },
        colCheckOut: {
            ...styles.tableColHeader,
            width: "20%"
        },
        colHours: {
            ...styles.tableCol2Header,
            width: "8%"
        },
        colStatus: {
            ...styles.tableColHeaderLast,
            width: "8%"
        },
        colName: {
            ...styles.tableCol3Header,
            display: filters.Self === "Y" ? "none" : "block"
        }
    };

    const dynamicRowStyles = {
        col1: {
            ...styles.tableCol1,
            width: "4.5%"
        },
        colDate: {
            ...styles.tableCol,
            width: "7.5%"
        },
        colCheckIn: {
            ...styles.tableCol,
            width: "20%"
        },
        colCheckOut: {
            ...styles.tableCol,
            width: "20%"
        },
        colHours: {
            ...styles.tableCol2,
            width: "8%",
            textAlign: "right"

        },
        colStatus: {
            ...styles.tableColLast,
            width: "8%"
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
                <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
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
                            <Text style={styles.headerText}>
                                {`Invoice Payment Report - (${formattedfromDate} - ${formattedtoDate})`}
                            </Text>
                        </View>

                    )}

                    <View style={styles.table}>

                        <View style={styles.tableRow}>
                            <Text style={dynamicHeaderStyles.col1}>SL#</Text>
                            <Text style={dynamicHeaderStyles.colDate}>Date</Text>
                            <Text style={dynamicHeaderStyles.colCheckIn}>Employee</Text>
                            <Text style={dynamicHeaderStyles.colCheckOut}>Project</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Amount</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Billing Month</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Billing Year</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Paid Amount</Text>
                            <Text style={dynamicHeaderStyles.colHours}>Due</Text>
                            <Text style={dynamicHeaderStyles.colStatus}>Last Paid Date</Text>
                        </View>

                        {/* {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1; */}

                        {pageData.map((row, rowIndex) => {
                            const globalIndex =
                                pageIndex === 0
                                    ? rowIndex + 1
                                    : FIRST_PAGE_COUNT +
                                    (pageIndex - 1) * OTHER_PAGE_COUNT +
                                    rowIndex +
                                    1;

                            const isLast = rowIndex === pageData.length - 1;
                            return (
                                <View
                                    key={rowIndex}
                                    style={isLast ? styles.tableRowLast : styles.tableRow}
                                >
                                    <Text style={dynamicRowStyles.col1}>{globalIndex}</Text>
                                    <Text style={dynamicRowStyles.colDate}>{row.Date}</Text>
                                    <Text style={dynamicRowStyles.colCheckIn}>{row.Employee}</Text>
                                    <Text style={dynamicRowStyles.colCheckOut}>{row.Project}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.TotalAmount}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.BillableMonth}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.BillableYear}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.PaidAmount}</Text>
                                    <Text style={dynamicRowStyles.colHours}>{row.Due}</Text>
                                    <Text style={dynamicRowStyles.colStatus}>{row.LastPaidDate}</Text>
                                </View>
                            );
                        })}

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
                        <Text
                            render={({ pageNumber, totalPages }) =>
                                `Page ${pageNumber} of ${totalPages}`
                            }
                        />
                    </View>

                    <View fixed style={styles.footerWrapper}>
                        {filters.FooterImg && (
                            <Image
                                src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                                style={styles.footerImage}
                            />
                        )}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default InvpaymentPDF;
