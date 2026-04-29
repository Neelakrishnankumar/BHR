// import React from "react";
// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet, Image
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 80,
//     paddingBottom: 80,
//     paddingHorizontal: 20,
//     fontSize: 10,
//   },

//   section: {
//     marginBottom: 10,
//   },

//   /* HEADER TEXT */
//   headerTextContainer: {
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   headerText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   subHeaderText: {
//     fontSize: 10,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },

//   /* TABLE */
//   table: {
//     display: "table",
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderStyle: "solid",
//     marginTop: 10,
//   },

//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//   },

//   tableRowLast: {
//     flexDirection: "row",
//   },

//   /* COLUMN HEADERS */
//   tableColHeader1: {
//     width: "8%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableColHeader: {
//     width: "25%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableColHeaderSmall: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableColHeaderLast: {
//     width: "47%",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   /* TABLE CELLS */
//   tableCol1: {
//     width: "8%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     textAlign: "center",
//   },

//   tableCol: {
//     width: "25%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     textAlign: "left",
//   },

//   tableColSmall: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     textAlign: "left",
//   },

//   tableColLast: {
//     width: "47%",
//     padding: 5,
//     textAlign: "left",
//     wordBreak: "break-all", // prevents overflow
//   },

//   /* HEADER IMAGE */
//   headerWrapper: {
//     position: "absolute",
//     top: 10,
//     left: 20,
//     right: 20,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   headerImage: {
//     width: "100%",
//     height: 50,
//     objectFit: "contain",
//   },

//   /* FOOTER IMAGE */
//   footerWrapper: {
//     position: "absolute",
//     bottom: 25,
//     left: 10,
//     right: 10,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   footerImage: {
//     width: "100%",
//     height: 60,
//     objectFit: "cover",
//   },

//   /* PAGE NUMBER */
//   pageNumber: {
//     position: "absolute",
//     bottom: 10,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     fontSize: 10,
//   },
// });

// // Split data: 20 on first page, 26 afterwards
// const FIRST_PAGE_COUNT = 13;
// const OTHER_PAGE_COUNT = 15;

// const paginateData = (data) => {
//     const pages = [];

//     // First page
//     pages.push(data.slice(0, FIRST_PAGE_COUNT));

//     // Remaining pages
//     for (
//         let i = FIRST_PAGE_COUNT;
//         i < data.length;
//         i += OTHER_PAGE_COUNT
//     ) {
//         pages.push(data.slice(i, i + OTHER_PAGE_COUNT));
//     }

//     return pages;
// };

// const EnquiryPDF = ({ data = [], filters = {}, projectName = "", managerName = "" }) => {
//     const pages = paginateData(data);
//     pages.forEach((page, i) => {
//         console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
//     });
//     const formatDate = (inputDate) => {
//         if (!inputDate) return "";
//         const [year, month, day] = inputDate.split("-");
//         return `${day}-${month}-${year}`;
//     };

//     const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];
//     return (
//         <Document>

//             {pages.map((pageData, pageIndex) => (
//                 <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
//                     {/* HEADER */}
//                     <View fixed style={styles.headerWrapper}>
//                         {filters.HeaderImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                                 style={styles.headerImage}
//                             />
//                         )}
//                     </View>
//                     {pageIndex === 0 && (

//                         <View style={styles.headerTextContainer}>
//                             <Text style={styles.headerText}>
//                                 {`Enquiry (DME) - ${filters.EnquiryStatus} (${filters.fromdate} - ${filters.todate})`}
//                             </Text>
//                         </View>

//                     )}

//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <Text style={styles.tableColHeader1}>SL#</Text>
//                             <Text style={styles.tableColHeader}>Date</Text>
//                             <Text style={styles.tableColHeaderSmall}>Type</Text>
//                             <Text style={styles.tableColHeader}>Mobile No</Text>
//                             {/* <Text style={styles.tableColHeaderApprDate}>Appr Date</Text> */}
//                         </View>

//                         {pageData.map((row, rowIndex) => {
//                             const globalIndex =
//                                 pageIndex === 0
//                                     ? rowIndex + 1
//                                     : FIRST_PAGE_COUNT +
//                                     (pageIndex - 1) * OTHER_PAGE_COUNT +
//                                     rowIndex +
//                                     1;

//                             const isLast = rowIndex === pageData.length - 1;
//                             return (
//                                 <View
//                                     key={rowIndex}
//                                     style={isLast ? styles.tableRowLast : styles.tableRow}
//                                 >
//                                     {/* <Text style={styles.tableCol1}>{rowIndex + 1}</Text> */}

//                                     <Text style={styles.tableCol1}>{globalIndex}</Text>
//                                     <Text style={styles.tableCol}>{row.Date}</Text>
//                                     <Text style={styles.tableColSmall}>{row.Type}</Text>
//                                     <Text style={styles.tableCol}>{row.MobileNo}</Text>
//                                     {/* <Text style={styles.tableColApprDate}>{row.ApprovedDate}</Text> */}
//                                 </View>
//                             );
//                         })}
//                     </View>


//                     {/* FOOTER */}
//                     <View fixed style={styles.footerWrapper}>
//                         {filters.FooterImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                                 style={styles.footerImage}
//                             />
//                         )}
//                     </View>
//                     <View
//                         fixed
//                         style={{
//                             position: "absolute",
//                             bottom: 10,
//                             left: 0,
//                             right: 0,
//                             textAlign: "center",
//                             fontSize: 10,
//                         }}
//                     >
//                         <Text>Page {pageIndex + 1} of {pages.length}</Text>
//                     </View>
//                 </Page>
//             ))}
//         </Document>
//     );
// };

// export default EnquiryPDF;

import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        paddingTop: 80,
        paddingBottom: 80,
        paddingHorizontal: 20,
        fontSize: 10,
    },

    headerTextContainer: {
        alignItems: "center",
        marginBottom: 10,
    },

    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    subheaderText: {
        marginTop: 3,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "left",
    },

    /* TABLE */
    table: {
        display: "table",
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },

    tableRowLast: {
        flexDirection: "row",
    },

    /* HEADERS */
    colHeaderSL: {
        width: "8%",
        borderRightWidth: 1,
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEE",
    },

    colHeaderDate: {
        width: "18%",
        borderRightWidth: 1,
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEE",
    },

    colHeaderType: {
        width: "22%",
        borderRightWidth: 1,
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEE",
    },

    colHeaderName: {
        width: "30%",
        borderRightWidth: 1,
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEE",
    },

    colHeaderMobile: {
        width: "22%",
        padding: 5,
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEE",
    },

    /* CELLS */
    colSL: {
        width: "8%",
        borderRightWidth: 1,
        padding: 5,
        textAlign: "center",
    },

    colDate: {
        width: "18%",
        borderRightWidth: 1,
        padding: 5,
    },

    colType: {
        width: "22%",
        borderRightWidth: 1,
        padding: 5,
    },

    colName: {
        width: "30%",
        borderRightWidth: 1,
        padding: 5,
    },

    colMobile: {
        width: "22%",
        padding: 5,
        wordBreak: "break-all",
    },

    /* HEADER IMAGE */
    headerWrapper: {
        position: "absolute",
        top: 10,
        left: 20,
        right: 20,
        height: 50,
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
        left: 10,
        right: 10,
        height: 60,
        alignItems: "center",
    },

    footerImage: {
        width: "100%",
        height: 60,
        objectFit: "cover",
    },

    pageNumber: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
    },
});

/* PAGINATION */
const FIRST_PAGE_COUNT = 13;
const OTHER_PAGE_COUNT = 15;

const paginateData = (data) => {
    const pages = [];
    pages.push(data.slice(0, FIRST_PAGE_COUNT));

    for (let i = FIRST_PAGE_COUNT; i < data.length; i += OTHER_PAGE_COUNT) {
        pages.push(data.slice(i, i + OTHER_PAGE_COUNT));
    }

    return pages;
};

const EnquiryPDF = ({ data = [], filters = {} }) => {
    const pages = paginateData(data);

    const formatDate = (date) => {
        if (!date) return "";
        const [y, m, d] = date.split("-");
        return `${d}-${m}-${y}`;
    };
    //   const formatDate = (inputDate) => {
    //     if (!inputDate) return "";
    //     const [year, month, day] = inputDate.split("-");
    //     return `${day}-${month}-${year}`;
    //   };
    return (
        <Document>
            {pages.map((pageData, pageIndex) => (
                <Page size="A4" orientation="portrait" style={styles.page} key={pageIndex}>

                    {/* HEADER */}
                    <View fixed style={styles.headerWrapper}>
                        {filters.HeaderImg && (
                            <Image
                                src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                                style={styles.headerImage}
                            />
                        )}
                    </View>

                    {/* TITLE */}
                    {pageIndex === 0 && (
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                {`Enquiry (DME) - ${filters.EnquiryStatus || ""}${filters.fromdate || filters.todate
                                        ? ` (${formatDate(filters.fromdate)} - ${formatDate(filters.todate)})`
                                        : ""
                                    }`}
                            </Text>
                        </View>
                    )}
                    <View>
                        {filters.Type?.length > 0 && (
                            <Text style={styles.subheaderText}>
                                {`Filter Type - ${filters.Type}`}
                            </Text>
                        )}
                    </View>
                    {/* TABLE */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.colHeaderSL}>SL#</Text>
                            <Text style={styles.colHeaderDate}>Date</Text>
                            <Text style={styles.colHeaderName}>Name</Text>
                            <Text style={styles.colHeaderType}>Type</Text>
                            <Text style={styles.colHeaderMobile}>Mobile No</Text>
                        </View>

                        {pageData.map((row, rowIndex) => {
                            const globalIndex =
                                pageIndex === 0
                                    ? rowIndex + 1
                                    : FIRST_PAGE_COUNT +
                                    (pageIndex - 1) * OTHER_PAGE_COUNT +
                                    rowIndex +
                                    1;

                            return (
                                <View key={rowIndex} style={styles.tableRow}>
                                    <Text style={styles.colSL}>{globalIndex}</Text>
                                    <Text style={styles.colDate}>{row.Date}</Text>
                                    <Text style={styles.colName}>{row.Name}</Text>
                                    <Text style={styles.colType}>{row.Type}</Text>
                                    <Text style={styles.colMobile}>{row.MobileNo}</Text>
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

                    {/* PAGE NUMBER */}
                    <Text style={styles.pageNumber}>
                        Page {pageIndex + 1} of {pages.length}
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default EnquiryPDF;