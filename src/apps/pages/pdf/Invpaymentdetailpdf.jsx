// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet,
//     Image,
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//     page: {
//         // padding: 20,
//         // fontSize: 10,
//         paddingTop: 90,   // ⬅ space for header
//         paddingBottom: 80, // ⬅ space for footer
//         paddingHorizontal: 20,
//         fontSize: 10,
//     },
//     section: {
//         marginBottom: 10,
//     },
//     headerContainer: {
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         marginTop: -3,
//     },
//     headerText: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         textAlign: "center",
//         marginBottom: 10
//     },
//     table: {
//         display: "table",
//         width: "100%",
//         borderWidth: 1,
//         borderColor: "#000",
//         borderStyle: "solid",
//     },
//     tableRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: "#000",
//         borderBottomStyle: "solid",
//     },
//     tableRowLast: {
//         flexDirection: "row",
//     },
//     tableColHeader: {
//         width: "20%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol3Header: {
//         width: "30%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol2Header: {
//         width: "10%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableColHeader1: {
//         width: "5%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//     },
//     tableColHeaderLast: {
//         width: "15%",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol3: {
//         width: "30%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol: {
//         width: "20%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol2: {
//         width: "10%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol1: {
//         width: "5%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "right",
//     },
//     tableColLast: {
//         width: "15%",
//         padding: 5,
//     },

//     /*HEADER*/
//     headerWrapper: {
//         position: "absolute",
//         top: 15,
//         left: 20,
//         right: 20,
//         height: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     headerImage: {
//         width: "100%",
//         height: 50,
//         objectFit: "contain",
//     },
//     /* FOOTER */
//     footerWrapper: {
//         position: "absolute",
//         bottom: 25,
//         left: 5,
//         right: 5,
//         height: 60,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     footerWrapper: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 70,
//     },

//     footerImage: {
//         width: "100%",
//         height: 100,
//         objectFit: "cover",
//     },

//     // footerImage: {
//     //     width: "100%",
//     //     height: "100%",
//     //     objectFit: "cover",
//     // },

// });



// // Split data: 20 on first page, 26 afterwards
// // const paginateData = (data) => {
// //   const firstPage = data.slice(0, 31);
// //   const otherPages = [];

// //   for (let i = 31; i < data.length; i += 26) {
// //     otherPages.push(data.slice(i, i + 26));
// //   }

// //   return [firstPage, ...otherPages];
// // };
// const paginateData = (data, rowsPerPage = 25) => {
//     const pages = [];

//     for (let i = 0; i < data.length; i += rowsPerPage) {
//         pages.push(data.slice(i, i + rowsPerPage));
//     }

//     return pages;
// };

// const InvpaymentPDF = ({ data = [], columndata = [], filters = {} }) => {
//     console.log(columndata,data, "-find listViewcolumn");

//       // Build { field: headerName } map from the columndata array
//   const headerMap = columndata.reduce((acc, col) => {
//     acc[col.field] = col.headerName;
//     return acc;
//   }, {});
//   console.log(headerMap, "--find headerMap");
  
//     // const pages = paginateData(data, 25);
//     // const pages = paginateData(data);
//      const FIRST_PAGE_COUNT = 13;
//     const OTHER_PAGE_COUNT = 15;

//     const paginateData = (data) => {
//         const pages = [];

//         // First page
//         pages.push(data.slice(0, FIRST_PAGE_COUNT));

//         // Remaining pages
//         for (
//             let i = FIRST_PAGE_COUNT;
//             i < data.length;
//             i += OTHER_PAGE_COUNT
//         ) {
//             pages.push(data.slice(i, i + OTHER_PAGE_COUNT));
//         }

//         return pages;
//     };
//     const pages = paginateData(data);
//     pages.forEach((page, i) => {
//         console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
//     });
//     const formattedfromDate = filters.fromDate
//         ? filters.fromDate.split("-").reverse().join("-")
//         : "";
//     const formattedtoDate = filters.toDate
//         ? filters.toDate.split("-").reverse().join("-")
//         : "";


//     const dynamicHeaderStyles = {
//         col1: {
//             ...styles.tableColHeader1,
//             width: "4.5%"
//         },
//         colDate: {
//             ...styles.tableColHeader,
//             width: "7.5%"
//         },
//         colCheckIn: {
//             ...styles.tableColHeader,
//             width: "20%"
//         },
//         colCheckOut: {
//             ...styles.tableColHeader,
//             width: "20%"
//         },
//         colHours: {
//             ...styles.tableCol2Header,
//             width: "8%"
//         },
//         colStatus: {
//             ...styles.tableColHeaderLast,
//             width: "8%"
//         },
//         colName: {
//             ...styles.tableCol3Header,
//             display: filters.Self === "Y" ? "none" : "block"
//         }
//     };

//     const dynamicRowStyles = {
//         col1: {
//             ...styles.tableCol1,
//             width: "4.5%"
//         },
//         colDate: {
//             ...styles.tableCol,
//             width: "7.5%"
//         },
//         colCheckIn: {
//             ...styles.tableCol,
//             width: "20%"
//         },
//         colCheckOut: {
//             ...styles.tableCol,
//             width: "20%"
//         },
//         colHours: {
//             ...styles.tableCol2,
//             width: "8%",
//             textAlign: "right"

//         },
//         colStatus: {
//             ...styles.tableColLast,
//             width: "8%"
//         },
//         colName: {
//             ...styles.tableCol3,
//             display: filters.Self === "Y" ? "none" : "block"
//         }
//     };
   
//     const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];
//     return (
//         <Document>
//             {pages.map((pageData, pageIndex) => (
//                 <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
//                     <View fixed style={styles.headerWrapper}>
//                         {filters.HeaderImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                                 style={styles.headerImage}
//                             />
//                         )}
//                     </View>
//                     {pageIndex === 0 && (
//                         <View style={styles.headerContainer}>
//                             <Text style={styles.headerText}>
//                                 {/* {`Invoice Payment Report - (${formattedfromDate} - ${formattedtoDate})`} */}
//                                  {`Invoice Payment Report`}
//                             </Text>
//                         </View>

//                     )}

//                     <View style={styles.table}>

//                         <View style={styles.tableRow}>
//                             <Text style={dynamicHeaderStyles.col1}>SL#</Text>
//                              <Text style={dynamicHeaderStyles.colDate}>Invoice No</Text>
//                             <Text style={dynamicHeaderStyles.colDate}>Date</Text>
//                             {/* <Text style={dynamicHeaderStyles.colCheckIn}>Employee</Text> */}
//                            <Text style={dynamicHeaderStyles.colCheckIn}>
//                 {headerMap.Employee || "Employee"}
//               </Text>
//               <Text style={dynamicHeaderStyles.colCheckOut}>
//                 {headerMap.Project || "Project"}
//               </Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Amount</Text>
//                             {/* <Text style={dynamicHeaderStyles.colHours}>Billing Month</Text> */}
//                             <Text style={dynamicHeaderStyles.colHours}>Billing Year</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Paid Amount</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Due</Text>
//                             <Text style={dynamicHeaderStyles.colStatus}>Last Paid Date</Text>
//                         </View>

//                         {/* {pageData.map((row, rowIndex) => {
//                             const isLast = rowIndex === pageData.length - 1; */}

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
//                                     <Text style={dynamicRowStyles.col1}>{globalIndex}</Text>
//                                     <Text style={dynamicRowStyles.colDate}>{row.InvoiceNo}</Text>
//                                     <Text style={dynamicRowStyles.colDate}>{row.Date}</Text>
//                                     <Text style={dynamicRowStyles.colCheckIn}>{row.Employee}</Text>
//                                     <Text style={dynamicRowStyles.colCheckOut}>{row.Project}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.TotalAmount}</Text>
//                                     {/* <Text style={dynamicRowStyles.colHours}>{row.BillableMonth}</Text> */}
//                                     <Text style={dynamicRowStyles.colHours}>{row.BillableYear}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.PaidAmount}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.Due}</Text>
//                                     <Text style={dynamicRowStyles.colStatus}>{row.LastPaidDate}</Text>
//                                 </View>
//                             );
//                         })}

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
//                         <Text
//                             render={({ pageNumber, totalPages }) =>
//                                 `Page ${pageNumber} of ${totalPages}`
//                             }
//                         />
//                     </View>

//                     <View fixed style={styles.footerWrapper}>
//                         {filters.FooterImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                                 style={styles.footerImage}
//                             />
//                         )}
//                     </View>
//                 </Page>
//             ))}
//         </Document>
//     );
// };

// export default InvpaymentPDF;


// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* =========================================================
//    STYLES
// ========================================================= */

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 88,
//     paddingBottom: 82,
//     paddingHorizontal: 20,
//     fontSize: 8,
//   },

//   /* =========================
//      REPORT TITLE
//   ========================= */

//   headerContainer: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 0,
//     marginBottom: 4,
//   },

//   headerText: {
//     fontSize: 12,
//     fontWeight: 700,
//     textAlign: "center",
//     marginBottom: 4,
//   },

//   /* =========================
//      MONTH TITLE
//   ========================= */
  

//   monthHeaderContainer: {
//     width: "100%",
//     alignItems: "left",
//     justifyContent: "left",
//     marginBottom: 5,
//   },

//   monthHeaderText: {
//     fontSize: 10,
//     fontWeight: 600,
//     textAlign: "left",
//   },

//   /* =========================
//      TABLE
//   ========================= */

//   table: {
//     width: "100%",
//     borderWidth: 1,
//     // borderColor: "#000000",
//     borderStyle: "solid",
//   },

//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000000",
//     borderBottomStyle: "solid",
//   },

//   /*
//     Important:
//     Last row must also have bottom border.
//     This closes the table correctly.
//   */
//   tableRowLast: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     // borderBottomColor: "#000000",
//     borderBottomStyle: "solid",
//   },

//   /* =========================
//      HEADER COLUMNS
//   ========================= */

//   tableColHeader1: {
//     width: "4.5%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     fontWeight: "bold",
//     backgroundColor: "#EEEEEE",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },

//   tableColHeaderDate: {
//     width: "7.5%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     fontWeight: "bold",
//     backgroundColor: "#EEEEEE",
//     textAlign: "center",
//   },

//   tableColHeader20: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     fontWeight: "bold",
//     backgroundColor: "#EEEEEE",
//     textAlign: "center",
//   },

//   tableColHeader8: {
//     width: "8%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     fontWeight: "bold",
//     backgroundColor: "#EEEEEE",
//     textAlign: "center",
//   },

//   tableColHeader8Last: {
//     width: "8%",
//     padding: 3,
//     fontWeight: "bold",
//     backgroundColor: "#EEEEEE",
//     textAlign: "center",
//   },

//   /* =========================
//      BODY COLUMNS
//   ========================= */

//   tableCol1: {
//     width: "4.5%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },

//   tableColDate: {
//     width: "7.5%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     textAlign: "left",
//   },

//   tableCol20: {
//     width: "20%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     textAlign: "left",
//   },

//   tableCol8: {
//     width: "8%",
//     borderRightWidth: 1,
//     borderRightColor: "#000000",
//     padding: 3,
//     textAlign: "right",
//   },

//   tableCol8Last: {
//     width: "8%",
//     padding: 3,
//     textAlign: "right",
//   },

//   /* =========================
//      TOP HEADER IMAGE
//   ========================= */

//   headerWrapper: {
//     position: "absolute",
//     top: 15,
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

//   /* =========================
//      FOOTER
//   ========================= */

//   footerWrapper: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//   },

//   footerImage: {
//     width: "100%",
//     height: 70,
//     objectFit: "cover",
//   },

//   /* =========================
//      PAGE NUMBER
//   ========================= */

//   pageNumber: {
//     position: "absolute",
//     bottom: 72,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     fontSize: 8,
//   },
// });

// /* =========================================================
//    MONTH NAMES
// ========================================================= */

// const MONTH_NAMES = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// /* =========================================================
//    PAGINATION

//    First page:
//    - Report title
//    - Month title
//    - Table header
//    - Therefore fewer rows

//    Other pages:
//    - Only table
//    - Therefore more rows
// ========================================================= */

// const FIRST_PAGE_COUNT = 13;
// const OTHER_PAGE_COUNT = 17;

// /* =========================================================
//    PAGINATE MONTH ROWS
// ========================================================= */

// const paginateRows = (rows = []) => {
//   if (!rows || rows.length === 0) {
//     return [];
//   }

//   const pages = [];

//   /* -------------------------
//      FIRST PAGE
//   ------------------------- */

//   pages.push(rows.slice(0, FIRST_PAGE_COUNT));

//   /* -------------------------
//      CONTINUATION PAGES
//   ------------------------- */

//   for (
//     let i = FIRST_PAGE_COUNT;
//     i < rows.length;
//     i += OTHER_PAGE_COUNT
//   ) {
//     pages.push(rows.slice(i, i + OTHER_PAGE_COUNT));
//   }

//   return pages;
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const InvpaymentPDF = ({
//   data = [],
//   columndata = [],
//   filters = {},
//   selectedMonths = "",
// }) => {
//   /* =======================================================
//      DEBUG
//   ======================================================= */

//   console.log("Invoice Payment PDF data:", data);
//   console.log("Invoice Payment PDF columns:", columndata);
//   console.log("Selected months:", selectedMonths);

//   /* =======================================================
//      BUILD COLUMN HEADER MAP

//      Example:

//      [
//        {
//          field: "Employee",
//          headerName: "Employee Name"
//        }
//      ]

//      becomes:

//      {
//        Employee: "Employee Name"
//      }
//   ======================================================= */

//   const headerMap = columndata.reduce((acc, col) => {
//     if (col?.field) {
//       acc[col.field] = col.headerName;
//     }

//     return acc;
//   }, {});

//   console.log("headerMap:", headerMap);

//   /* =======================================================
//      SELECTED MONTHS

//      Example:

//      "May,July,August"

//      becomes:

//      ["May", "July", "August"]
//   ======================================================= */

//   const selectedMonthNames = selectedMonths
//     ? selectedMonths
//         .split(",")
//         .map((month) => month.trim())
//         .filter(Boolean)
//     : [];

//   /* =======================================================
//      GROUP DATA BY MONTH
//   ======================================================= */

//   let groups = [];

//   if (selectedMonthNames.length > 0) {
//     groups = selectedMonthNames
//       .map((monthName) => {
//         const monthNum = MONTH_NAMES.indexOf(monthName) + 1;

//         const rows = data.filter(
//           (row) => Number(row?.BillableMonth) === monthNum
//         );

//         return {
//           label: monthName,
//           rows,
//         };
//       })
//       .filter((group) => group.rows.length > 0);
//   } else {
//     /*
//       If no month selected,
//       display all data without month grouping.
//     */

//     groups = [
//       {
//         label: null,
//         rows: data,
//       },
//     ];
//   }

//   console.log("PDF groups:", groups);

//   /* =======================================================
//      CREATE PDF PAGES
//   ======================================================= */

//   const pdfPages = [];

//   groups.forEach((group, groupIndex) => {
//     const groupPages = paginateRows(group.rows);

//     groupPages.forEach((pageData, pageIndexInGroup) => {
//       pdfPages.push({
//         group,
//         groupIndex,
//         pageData,
//         pageIndexInGroup,
//       });
//     });
//   });

//   /* =======================================================
//      RETURN PDF
//   ======================================================= */

//   return (
//     <Document>
//       {pdfPages.map(
//         ({ group, groupIndex, pageData, pageIndexInGroup }) => {
//           /* -----------------------------------------------
//              PAGE CONDITIONS
//           ------------------------------------------------ */

//           const isFirstPageOfGroup = pageIndexInGroup === 0;

//           const isFirstPageOfDocument =
//             groupIndex === 0 && pageIndexInGroup === 0;

//           /* -----------------------------------------------
//              SERIAL NUMBER

//              Example:

//              First page:
//              1 - 13

//              Second page:
//              14 - 30

//              Third page:
//              31 - 47
//           ------------------------------------------------ */

//           const getSerialNumber = (rowIndex) => {
//             if (pageIndexInGroup === 0) {
//               return rowIndex + 1;
//             }

//             return (
//               FIRST_PAGE_COUNT +
//               (pageIndexInGroup - 1) * OTHER_PAGE_COUNT +
//               rowIndex +
//               1
//             );
//           };

//           return (
//             <Page
//               key={`${groupIndex}-${pageIndexInGroup}`}
//               size="A4"
//               orientation="landscape"
//               style={styles.page}
//             >
//               {/* =================================================
//                   HEADER IMAGE
//               ================================================= */}

//               <View fixed style={styles.headerWrapper}>
//                 {filters?.HeaderImg && (
//                   <Image
//                     src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                     style={styles.headerImage}
//                   />
//                 )}
//               </View>

//               {/* =================================================
//                   REPORT TITLE

//                   ONLY FIRST PAGE OF COMPLETE PDF
//               ================================================= */}

//               {isFirstPageOfDocument && (
//                 <View style={styles.headerContainer}>
//                   <Text style={styles.headerText}>
//                     Invoice Payment Report
//                   </Text>
//                 </View>
//               )}

//               {/* =================================================
//                   MONTH TITLE

//                   ONLY FIRST PAGE OF EACH MONTH
//               ================================================= */}

//               {isFirstPageOfGroup && group.label && (
//                 <View style={styles.monthHeaderContainer}>
//                   <Text style={styles.monthHeaderText}>
//                     {group.label}
//                     {group.rows?.[0]?.BillableYear
//                       ? ` ${group.rows[0].BillableYear}`
//                       : ""}
//                   </Text>
//                 </View>
//               )}

//               {/* =================================================
//                   TABLE
//               ================================================= */}

//               <View style={styles.table}>
//                 {/* =================================================
//                     TABLE HEADER
//                 ================================================= */}

//                 <View style={styles.tableRow}>
//                   <Text style={styles.tableColHeader1}>
//                     SL#
//                   </Text>

//                   <Text style={styles.tableColHeaderDate}>
//                     Invoice No
//                   </Text>

//                   <Text style={styles.tableColHeaderDate}>
//                     Date
//                   </Text>

//                   <Text style={styles.tableColHeader20}>
//                     {headerMap.Employee || "Employee"}
//                   </Text>

//                   <Text style={styles.tableColHeader20}>
//                     {headerMap.Project || "Project"}
//                   </Text>

//                   <Text style={styles.tableColHeader8}>
//                     Amount
//                   </Text>

//                   <Text style={styles.tableColHeader8}>
//                     Billing Year
//                   </Text>

//                   <Text style={styles.tableColHeader8}>
//                     Paid Amount
//                   </Text>

//                   <Text style={styles.tableColHeader8}>
//                     Due
//                   </Text>

//                   <Text style={styles.tableColHeader8Last}>
//                     Last Paid Date
//                   </Text>
//                 </View>

//                 {/* =================================================
//                     TABLE DATA
//                 ================================================= */}

//                 {pageData.map((row, rowIndex) => {
//                   const serialNumber =
//                     getSerialNumber(rowIndex);

//                   const isLastRow =
//                     rowIndex === pageData.length - 1;

//                   return (
//                     <View
//                       key={`${groupIndex}-${pageIndexInGroup}-${rowIndex}`}
//                       style={
//                         isLastRow
//                           ? styles.tableRowLast
//                           : styles.tableRow
//                       }
//                     >
//                       {/* SL# */}

//                       <Text style={styles.tableCol1}>
//                         {serialNumber}
//                       </Text>

//                       {/* Invoice No */}

//                       <Text style={styles.tableColDate}>
//                         {row?.InvoiceNo ?? ""}
//                       </Text>

//                       {/* Date */}

//                       <Text style={styles.tableColDate}>
//                         {row?.Date ?? ""}
//                       </Text>

//                       {/* Employee */}

//                       <Text style={styles.tableCol20}>
//                         {row?.Employee ?? ""}
//                       </Text>

//                       {/* Project */}

//                       <Text style={styles.tableCol20}>
//                         {row?.Project ?? ""}
//                       </Text>

//                       {/* Amount */}

//                       <Text style={styles.tableCol8}>
//                         {row?.TotalAmount ?? ""}
//                       </Text>

//                       {/* Billing Year */}

//                       <Text style={styles.tableCol8}>
//                         {row?.BillableYear ?? ""}
//                       </Text>

//                       {/* Paid Amount */}

//                       <Text style={styles.tableCol8}>
//                         {row?.PaidAmount ?? ""}
//                       </Text>

//                       {/* Due */}

//                       <Text style={styles.tableCol8}>
//                         {row?.Due ?? ""}
//                       </Text>

//                       {/* Last Paid Date */}

//                       <Text style={styles.tableCol8Last}>
//                         {row?.LastPaidDate ?? ""}
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </View>

//               {/* =================================================
//                   PAGE NUMBER
//               ================================================= */}

//               <View fixed style={styles.pageNumber}>
//                 <Text
//                   render={({ pageNumber, totalPages }) =>
//                     `Page ${pageNumber} of ${totalPages}`
//                   }
//                 />
//               </View>

//               {/* =================================================
//                   FOOTER IMAGE
//               ================================================= */}

//               <View fixed style={styles.footerWrapper}>
//                 {filters?.FooterImg && (
//                   <Image
//                     src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                     style={styles.footerImage}
//                   />
//                 )}
//               </View>
//             </Page>
//           );
//         }
//       )}
//     </Document>
//   );
// };

// export default InvpaymentPDF;

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

/* =========================================================
   DESIGN TOKENS
========================================================= */

const COLORS = {
  ink: "#17233B",
  paper: "#F7F5F0",
  surface: "#FFFFFF",
  rule: "#D8D3C7",
  ruleStrong: "#B9B2A0",
  muted: "#5B6472",
  muted_v1: "#343941",
  amber: "#B8862F",
  amberTint: "#FBF3E4",
  due: "#A6432E",
  headerText: "#EFE9DC",
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  page: {
    paddingTop: 88,
    paddingBottom: 82,
    paddingHorizontal: 20,
    fontSize: 8,
    color: COLORS.ink,
    backgroundColor: COLORS.paper,
  },
summaryTableWrapper: {
  width: "60%",
},
  /* ---------- MASTHEAD ---------- */

  masthead: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.ink,
    marginBottom: 12,
  },

  mastheadSpacer: { flex: 1 },

  reportTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
  },

  metaBlock: {
    flex: 1,
    alignItems: "flex-end",
  },

  metaLine: {
    fontSize: 7,
    color: COLORS.muted,
    marginBottom: 2,
  },

  metaValue: {
    color: COLORS.ink,
    fontWeight: 600,
  },

  /* ---------- SECTION TITLE ---------- */

  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },

  sectionTitleRowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 16,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
  },

  sectionSubtitle: {
    fontSize: 7.5,
    color: COLORS.muted,
  },

  /* ---------- SUMMARY STRIP (the 4 boxes) ---------- */

  summaryStrip: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.rule,
    marginBottom: 14,
  },

  summaryCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: COLORS.rule,
    backgroundColor: COLORS.surface,
  },

  summaryCellLast: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.surface,
  },

  summaryLabel: {
    fontSize: 10,
    color: COLORS.ink,
    fontWeight: 600,
    marginBottom: 4,
    textAlign: "center",
  },

  summaryValue: {
    fontSize: 11,
    fontWeight: 600,
    textAlign: "right",
  },

  summaryValuePaid: {
    color: COLORS.amber,
  },

  summaryValueDue: {
    color: COLORS.due,
  },

  /* ---------- TABLE (shared) ---------- */

  table: {
    width: "100%",
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: COLORS.ink,
  },

  headerCell: {
    color: COLORS.headerText,
    fontSize: 6.5,
    fontWeight: 600,
    padding: 5,
    textAlign: "center",
  },

  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.rule,
  },

  dataRowZebra: {
    backgroundColor: "#FBFAF7",
  },

  cell: {
    fontSize: 7,
    padding: 5,
  },

  cellCenter: {
    textAlign: "center",
  },

  cellNum: {
    textAlign: "right",
  },

  cellDue: {
    color: COLORS.due,
    fontWeight: 600,
  },

  /* ---------- GROUP DIVIDER (detail table) ----------
     Reused for either a month header ("August 2026") or a
     standard/section header ("6th Standard A Sec"),
     whichever the report is currently grouped by. */

  groupRow: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ink,
    backgroundColor: COLORS.paper,
  },

  groupLabel: {
    fontSize: 9,
    fontWeight: 700,
  },

  groupSuffix: {
    fontSize: 9,
    fontWeight: 400,
    color: COLORS.muted,
    marginLeft: 4,
  },

  /* ---------- SUBTOTAL ROW (detail table only) ---------- */

  subtotalRow: {
    flexDirection: "row",
    backgroundColor: COLORS.amberTint,
    borderTopWidth: 1,
    borderTopColor: COLORS.amber,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.amber,
  },

  subtotalLabel: {
    fontSize: 7,
    fontWeight: 600,
    color: COLORS.muted_v1,
    padding: 5,
  },

  subtotalValue: {
    fontSize: 7,
    fontWeight: 600,
    padding: 5,
    textAlign: "right",
  },

  /* ---------- GRAND TOTAL ROW ---------- */

  grandRow: {
    flexDirection: "row",
    backgroundColor: COLORS.ink,
  },

  grandLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.paper,
    padding: 6,
  },

  grandValue: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.paper,
    padding: 6,
    textAlign: "right",
  },

  /* ---------- COLUMN WIDTHS: DETAIL TABLE ----------
     SL# | Invoice# | Date | Employee | Project/Month |
     Amount | Paid | Due | Last Paid
     Must sum to 100%. wLabelSpan must equal
     wSL + wInvoice + wDate + wEmployee + wProject exactly,
     since subtotal/grand rows span those five columns as
     one merged label cell. */

  wSL: { width: "3.5%" },
  wInvoice: { width: "8.5%" },
  wDate: { width: "7%" },
  wEmployee: { width: "20%" },
  wProject: { width: "24%" },
  wAmount: { width: "9.5%" },
  wPaid: { width: "9.5%" },
  wDue: { width: "9.5%" },
  wLastPaid: { width: "8.5%" },
  wLabelSpan: { width: "63%" }, // = wSL(3.5) + wInvoice(8.5) + wDate(7) + wEmployee(20) + wProject(24)
  wLabelSpanNoProject: { width: "39%" }, // = wSL(3.5) + wInvoice(8.5) + wDate(7) + wEmployee(20) — leaves wProject free for the "Total" label

  /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
     SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
     primary/secondary are Month & Standard/Activities, order
     depends on the report's grouping mode. */

  sSL: { width: "5%" },
  sPrimary: { width: "20%" },
  sSecondary: { width: "25%" },
  sInv: { width: "10%" },
  sAmt: { width: "13%" },
  sPaid: { width: "13%" },
  sDue: { width: "14%" },
  sLabelSpan: { width: "50%" }, // SL + primary + secondary, for the grand-total row

  /* ---------- IMAGES ---------- */

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

  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },

  footerImage: {
    width: "100%",
    height: 70,
    objectFit: "cover",
  },

  pageNumber: {
    position: "absolute",
    bottom: 72,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: COLORS.muted,
  },
});

/* =========================================================
   CONSTANTS / HELPERS
========================================================= */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const money = (n) =>
  // "Rs. " +
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n || 0));

/* Pulls the middle "6th Standard A Sec" segment out of
   "P0004 || 6th Standard A Sec || Month Fee" so grouping/summary
   works off the class/section, not every fee-type variant. */
const getStandardLabel = (projectStr = "") => {
  const parts = String(projectStr).split("||").map((p) => p.trim());
  return parts.length >= 2 ? parts[1] : projectStr || "—";
};

const monthYearLabel = (row) => {
  const mNum = Number(row?.BillableMonth);
  const mName = MONTH_NAMES[mNum - 1] || "";
  const year = row?.BillableYear || "";
  return `${mName} ${year}`.trim() || "—";
};

/* Pulls the leading number out of a standard label so
   "6th Standard A Sec" and "11th Standard A Sec" sort
   numerically (6, 11) instead of alphabetically ("11" < "6"). */
const standardSortKey = (label) => {
  const match = String(label).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

/* =========================================================
   GROUPING

   mode "Month"    -> one group per selected month, dividers
                      read like "August 2026".
   mode "Standard" -> one group per class/section, dividers
                      read like "6th Standard A Sec", sorted
                      ascending by the leading standard number.

   Everything downstream (buildEntries, paginateEntries,
   buildFlatSummary) works off `groups` generically — it
   doesn't care what the group label means.
========================================================= */

const buildGroups = (data, mode, selectedMonthNames) => {
  const selectedMonthNums = selectedMonthNames
    .map((name) => MONTH_NAMES.indexOf(name) + 1)
    .filter((n) => n > 0);

  const filteredData =
    selectedMonthNums.length > 0
      ? data.filter((row) => selectedMonthNums.includes(Number(row?.BillableMonth)))
      : data;

  if (mode === "Standard") {
    const byStd = {};
    filteredData.forEach((row) => {
      const key = getStandardLabel(row.Project);
      if (!byStd[key]) byStd[key] = [];
      byStd[key].push(row);
    });
    const labels = Object.keys(byStd).sort(
      (a, b) => standardSortKey(a) - standardSortKey(b)
    );
    return labels.length > 0
      ? labels.map((label) => ({ label, rows: byStd[label] }))
      : [{ label: null, rows: filteredData }];
  }

  // mode === "Month"
  const monthsPresent = [
    ...new Set(filteredData.map((row) => Number(row?.BillableMonth))),
  ]
    .filter((n) => n > 0)
    .sort((a, b) => a - b);

  return monthsPresent.length > 0
    ? monthsPresent.map((num) => ({
        label: MONTH_NAMES[num - 1],
        rows: filteredData.filter((row) => Number(row?.BillableMonth) === num),
      }))
    : [{ label: null, rows: filteredData }];
};

/* =========================================================
   PAGINATION (transaction detail pages)
========================================================= */

const FIRST_PAGE_COUNT = 14;
const OTHER_PAGE_COUNT = 22;

// Rough "row slot" cost of appending the Summary block (section
// title + summary header row + Grand Total row) onto the tail of
// the last detail page. Summary data rows use a different row
// height than detail rows, so this is an approximation — bump it
// up if Summary ever visibly overflows the last detail page.
const SUMMARY_RESERVE_SLOTS = 3;

const buildEntries = (groups) => {
  const entries = [];
  let totalInvoices = 0; // global count, used only for the "Invoices" summary box
  let grandAmount = 0;
  let grandPaid = 0;
  let grandDue = 0;

  groups.forEach((group) => {
    if (group.label) {
      entries.push({ type: "group", label: group.label });
    }

    let groupSerial = 1; // SL# restarts at 1 for every group section
    let mAmount = 0;
    let mPaid = 0;
    let mDue = 0;

    group.rows.forEach((row) => {
      mAmount += Number(row.TotalAmount || 0);
      mPaid += Number(row.PaidAmount || 0);
      mDue += Number(row.Due || 0);
      entries.push({ type: "row", row, serial: groupSerial++ });
      totalInvoices += 1;
    });

    if (group.label) {
      entries.push({ type: "subtotal", label: group.label, mAmount, mPaid, mDue });
    }

    grandAmount += mAmount;
    grandPaid += mPaid;
    grandDue += mDue;
  });

  entries.push({ type: "grand", grandAmount, grandPaid, grandDue });

  return { entries, grandAmount, grandPaid, grandDue, totalInvoices };
};

const paginateEntries = (entries) => {
  const pages = [];
  let i = 0;
  let cap = FIRST_PAGE_COUNT;

  while (i < entries.length) {
    let end = Math.min(i + cap, entries.length);

    while (end > i + 1 && entries[end - 1].type === "group") {
      end -= 1;
    }

    pages.push(entries.slice(i, end));
    i = end;
    cap = OTHER_PAGE_COUNT;
  }

  return pages;
};

/* =========================================================
   FLAT SUMMARY TABLE

   One row per (primary group, secondary breakdown) pair, in
   group order, running SL# across the whole table, no
   per-group subtotal rows — just one Grand Total at the end.

   mode "Month"    -> primary = month,    secondary = standard
   mode "Standard" -> primary = standard, secondary = month
========================================================= */

const buildFlatSummary = (groups, mode) => {
  const rows = [];
  let sl = 1;
  let grandAmount = 0;
  let grandPaid = 0;
  let grandDue = 0;
  let grandInvoices = 0;

  groups.forEach((group) => {
    const bySecondary = {};

    group.rows.forEach((row) => {
      const key = mode === "Standard" ? monthYearLabel(row) : getStandardLabel(row.Project);
      if (!bySecondary[key]) {
        bySecondary[key] = { label: key, invoices: 0, amount: 0, paid: 0, due: 0 };
      }
      bySecondary[key].invoices += 1;
      bySecondary[key].amount += Number(row.TotalAmount || 0);
      bySecondary[key].paid += Number(row.PaidAmount || 0);
      bySecondary[key].due += Number(row.Due || 0);
    });

    Object.values(bySecondary).forEach((r) => {
      rows.push({
        sl: sl++,
        primary: group.label || "—",
        secondary: r.label,
        invoices: r.invoices,
        amount: r.amount,
        paid: r.paid,
        due: r.due,
      });
      grandAmount += r.amount;
      grandPaid += r.paid;
      grandDue += r.due;
      grandInvoices += r.invoices;
    });
  });

  return { rows, grandAmount, grandPaid, grandDue, grandInvoices };
};

/* =========================================================
   SUMMARY TABLE (shared markup, used both when it's appended
   to the last detail page and when it needs its own page)
========================================================= */

const SummaryTable = ({ flatSummary, summaryPrimaryHeader, summarySecondaryHeader }) => (
  <View style={styles.table}>
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
      <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
      <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
      <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Invoices</Text>
      <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
      <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
      <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
    </View>

    {flatSummary.rows.map((r, idx) => {
      const zebra = idx % 2 === 1 ? styles.dataRowZebra : null;
      return (
        <View key={idx} style={[styles.dataRow, zebra]}>
          <Text style={[styles.cell, styles.sSL, styles.cellCenter]}>{r.sl}</Text>
          <Text style={[styles.cell, styles.sPrimary]}>{r.primary}</Text>
          <Text style={[styles.cell, styles.sSecondary]}>{r.secondary}</Text>
          <Text style={[styles.cell, styles.sInv, styles.cellCenter]}>{r.invoices}</Text>
          <Text style={[styles.cell, styles.sAmt, styles.cellNum]}>{money(r.amount)}</Text>
          <Text style={[styles.cell, styles.sPaid, styles.cellNum]}>{money(r.paid)}</Text>
          <Text
            style={[
              styles.cell,
              styles.sDue,
              styles.cellNum,
              r.due > 0 ? styles.cellDue : null,
            ]}
          >
            {money(r.due)}
          </Text>
        </View>
      );
    })}

    <View style={styles.grandRow}>
      <Text style={[styles.grandLabel, styles.sLabelSpan]}>Grand Total</Text>
      <Text style={[styles.grandValue, styles.sInv, styles.cellCenter]}>
        {flatSummary.grandInvoices}
      </Text>
      <Text style={[styles.grandValue, styles.sAmt]}>{money(flatSummary.grandAmount)}</Text>
      <Text style={[styles.grandValue, styles.sPaid]}>{money(flatSummary.grandPaid)}</Text>
      <Text style={[styles.grandValue, styles.sDue]}>{money(flatSummary.grandDue)}</Text>
    </View>
  </View>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */

const InvpaymentPDF = ({
  data = [],
  columndata = [],
  filters = {},
  selectedMonths = "",
  periodLabel = "",
}) => {
  const headerMap = columndata.reduce((acc, col) => {
    if (col?.field) acc[col.field] = col.headerName;
    return acc;
  }, {});

  // "Month" (default) or "Standard" — from the Type dropdown in the filter panel.
  const mode = filters?.PDFType === "Standard" ? "Standard" : "Month";

  const modeSuffix = mode === "Standard" ? "Standard Wise" : "Month Wise";
  const reportTitleText = `Invoice Payment Report (${modeSuffix})`;

  const selectedMonthNames = selectedMonths
    ? selectedMonths.split(",").map((m) => m.trim()).filter(Boolean)
    : [];

  const groups = buildGroups(data, mode, selectedMonthNames);

  const { entries, grandAmount, grandPaid, grandDue, totalInvoices } =
    buildEntries(groups);
  const detailPages = paginateEntries(entries);
  const flatSummary = buildFlatSummary(groups, mode);

  // Does the Summary block fit in the leftover space on the last
  // detail page, or does it need its own page?
  const lastPageCap = detailPages.length <= 1 ? FIRST_PAGE_COUNT : OTHER_PAGE_COUNT;
  const lastDetailPage = detailPages[detailPages.length - 1] || [];
  const leftoverOnLastPage = lastPageCap - lastDetailPage.length;
  const summaryFitsOnLastPage =
    leftoverOnLastPage >= flatSummary.rows.length + SUMMARY_RESERVE_SLOTS;

  const derivedPeriod = (() => {
    const labeled = groups.filter((g) => g.label && g.rows.length);
    if (labeled.length === 0) return "";

    const first = labeled[0].label;
    const last = labeled[labeled.length - 1].label;

    if (mode === "Month") {
      const year = labeled[labeled.length - 1].rows[0]?.BillableYear ?? "";
      return first === last ? `${first} ${year}` : `${first} – ${last} ${year}`;
    }

    // Standard mode — show the selected standard/activity label(s)
    return first === last ? `${first}` : `${first} – ${last}`;
  })();

  const generatedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const detailGroupWord = mode === "Standard" ? "Standard/Activities" : "Month";
  const summaryPrimaryHeader = mode === "Standard" ? "Standard/Activities" : "Month";
  const summarySecondaryHeader = mode === "Standard" ? "Billable Month" : "Standard/Activities";

  const HeaderImage = () => (
    <View fixed style={styles.headerWrapper}>
      {filters?.HeaderImg && (
        <Image
          src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
          style={styles.headerImage}
        />
      )}
    </View>
  );

  const FooterImage = () => (
    <View fixed style={styles.footerWrapper}>
      {filters?.FooterImg && (
        <Image
          src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
          style={styles.footerImage}
        />
      )}
    </View>
  );

  const PageNumber = () => (
    <View fixed style={styles.pageNumber}>
      <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );

  return (
    <Document>
      {/* =========================================================
          PAGE 1..N — masthead + the 4 boxes (first page only),
          then TRANSACTION DETAIL, grouped by whichever mode is
          selected (Month or Standard/Activities). Summary is
          appended to the tail of the last detail page when it
          fits; otherwise it falls back to its own page below.
      ========================================================= */}
      {detailPages.map((pageEntries, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === detailPages.length - 1;

        return (
          <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
            <HeaderImage />

            {isFirstPage && (
              <>
                <View style={styles.masthead}>
                  <View style={styles.mastheadSpacer} />
                  <Text style={styles.reportTitle}>{reportTitleText}</Text>
                  <View style={styles.metaBlock}>
                    <Text style={styles.metaLine}>
                      Generated{"  "}
                      <Text style={styles.metaValue}>{generatedDate}</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.summaryStrip}>
                  <View style={styles.summaryCell}>
                    <Text style={styles.summaryLabel}>Invoices</Text>
                    <Text style={styles.summaryValue}>{totalInvoices}</Text>
                  </View>
                  <View style={styles.summaryCell}>
                    <Text style={styles.summaryLabel}>Total Billed</Text>
                    <Text style={styles.summaryValue}>{money(grandAmount)}</Text>
                  </View>
                  <View style={styles.summaryCell}>
                    <Text style={styles.summaryLabel}>Total Paid</Text>
                    <Text style={[styles.summaryValue, styles.summaryValuePaid]}>
                      {money(grandPaid)}
                    </Text>
                  </View>
                  <View style={styles.summaryCellLast}>
                    <Text style={styles.summaryLabel}>Total Due</Text>
                    <Text style={[styles.summaryValue, styles.summaryValueDue]}>
                      {money(grandDue)}
                    </Text>
                  </View>
                </View>

                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Transaction Detail</Text>
                </View>
              </>
            )}

            <View style={styles.table}>
              <View style={styles.headerRow}>
                <Text style={[styles.headerCell, styles.wSL, styles.cellCenter]}>SL#</Text>
                <Text style={[styles.headerCell, styles.wInvoice]}>Invoice#</Text>
                <Text style={[styles.headerCell, styles.wDate]}>Date</Text>
                <Text style={[styles.headerCell, styles.wEmployee]}>
                  {headerMap.Employee || "Employee"}
                </Text>
                <Text style={[styles.headerCell, styles.wProject]}>
                  {mode === "Standard"
                    ? summarySecondaryHeader
                    : (headerMap.Project || "Project")}
                </Text>
                <Text style={[styles.headerCell, styles.wAmount, styles.cellNum]}>Amount</Text>
                <Text style={[styles.headerCell, styles.wPaid, styles.cellNum]}>Paid</Text>
                <Text style={[styles.headerCell, styles.wDue, styles.cellNum]}>Due</Text>
                <Text style={[styles.headerCell, styles.wLastPaid]}>Last Paid</Text>
              </View>

              {pageEntries.map((entry, idx) => {
                if (entry.type === "group") {
                  return (
                    <View key={idx} style={styles.groupRow}>
                      <Text style={styles.groupLabel}>{entry.label}</Text>
                    </View>
                  );
                }

                if (entry.type === "row") {
                  const row = entry.row;
                  const zebra = entry.serial % 2 === 0 ? styles.dataRowZebra : null;
                  return (
                    <View key={idx} style={[styles.dataRow, zebra]}>
                      <Text style={[styles.cell, styles.wSL, styles.cellCenter]}>{entry.serial}</Text>
                      <Text style={[styles.cell, styles.wInvoice, styles.cellCenter]}>
                        {row?.InvoiceNo ?? ""}
                      </Text>
                      <Text style={[styles.cell, styles.wDate, styles.cellCenter]}>
                        {row?.Date ?? ""}
                      </Text>
                      <Text style={[styles.cell, styles.wEmployee, styles.cellCenter]}>
                        {row?.EmpCodeName ?? ""}
                      </Text>
                      <Text style={[styles.cell, styles.wProject, styles.cellCenter]}>
                        {mode === "Month" ? (row?.Project ?? "") : row?.BillableMonthYear ?? ""}
                      </Text>
                      <Text style={[styles.cell, styles.wAmount, styles.cellNum]}>
                        {money(row?.TotalAmount)}
                      </Text>
                      <Text style={[styles.cell, styles.wPaid, styles.cellNum]}>
                        {money(row?.PaidAmount)}
                      </Text>
                      <Text
                        style={[
                          styles.cell,
                          styles.wDue,
                          styles.cellNum,
                          Number(row?.Due) > 0 ? styles.cellDue : null,
                        ]}
                      >
                        {money(row?.Due)}
                      </Text>
                      <Text style={[styles.cell, styles.wLastPaid, styles.cellCenter]}>
                        {row?.LastPaidDate ?? ""}
                      </Text>
                    </View>
                  );
                }

                if (entry.type === "subtotal") {
                  return (
                    <View key={idx} style={styles.subtotalRow}>
                      <Text style={styles.wLabelSpanNoProject} />
                      <Text style={[styles.subtotalLabel, styles.wProject, styles.cellCenter]}>Total</Text>
                      <Text style={[styles.subtotalValue, styles.wAmount]}>{money(entry.mAmount)}</Text>
                      <Text style={[styles.subtotalValue, styles.wPaid]}>{money(entry.mPaid)}</Text>
                      <Text style={[styles.subtotalValue, styles.wDue]}>{money(entry.mDue)}</Text>
                      <Text style={styles.wLastPaid} />
                    </View>
                  );
                }

                if (entry.type === "grand") {
                  return (
                    <View key={idx} style={styles.grandRow}>
                      <Text style={styles.wLabelSpanNoProject} />
                      <Text style={[styles.grandLabel, styles.wProject, styles.cellCenter]}>Grand Total</Text>
                      <Text style={[styles.grandValue, styles.wAmount]}>{money(entry.grandAmount)}</Text>
                      <Text style={[styles.grandValue, styles.wPaid]}>{money(entry.grandPaid)}</Text>
                      <Text style={[styles.grandValue, styles.wDue]}>{money(entry.grandDue)}</Text>
                      <Text style={styles.wLastPaid} />
                    </View>
                  );
                }

                return null;
              })}
            </View>

            {/* Summary continues right here if there's room left on this page */}
            {isLastPage && summaryFitsOnLastPage && (
              <>
                <View style={styles.sectionTitleRowSpaced}>
                  <Text style={styles.sectionTitle}>Summary</Text>
                </View>
                 <View style={styles.summaryTableWrapper}>
                <SummaryTable
                  flatSummary={flatSummary}
                  summaryPrimaryHeader={summaryPrimaryHeader}
                  summarySecondaryHeader={summarySecondaryHeader}
                />
                </View>
              </>
            )}

            <PageNumber />
            <FooterImage />
          </Page>
        );
      })}

      {/* =========================================================
          FALLBACK SUMMARY PAGE — only rendered when Summary did
          NOT fit on the tail of the last detail page above.
      ========================================================= */}
      {!summaryFitsOnLastPage && (
        <Page size="A4" orientation="landscape" style={styles.page}>
          <HeaderImage />

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Summary</Text>
          </View>
  <View style={styles.summaryTableWrapper}>
          <SummaryTable
            flatSummary={flatSummary}
            summaryPrimaryHeader={summaryPrimaryHeader}
            summarySecondaryHeader={summarySecondaryHeader}
          />
</View>
          <PageNumber />
          <FooterImage />
        </Page>
      )}
    </Document>
  );
};

export default InvpaymentPDF;
// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* =========================================================
//    DESIGN TOKENS
// ========================================================= */

// const COLORS = {
//   ink: "#17233B",
//   paper: "#F7F5F0",
//   surface: "#FFFFFF",
//   rule: "#D8D3C7",
//   ruleStrong: "#B9B2A0",
//   muted: "#5B6472",
//   amber: "#B8862F",
//   amberTint: "#FBF3E4",
//   due: "#A6432E",
//   headerText: "#EFE9DC",
// };

// /* =========================================================
//    STYLES
// ========================================================= */

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 88,
//     paddingBottom: 82,
//     paddingHorizontal: 20,
//     fontSize: 8,
//     color: COLORS.ink,
//     backgroundColor: COLORS.paper,
//   },

//   /* ---------- MASTHEAD ---------- */

//   // masthead: {
//   //   flexDirection: "row",
//   //   justifyContent: "space-between",
//   //   alignItems: "flex-end",
//   //   paddingBottom: 8,
//   //   borderBottomWidth: 1.5,
//   //   borderBottomColor: COLORS.ink,
//   //   marginBottom: 12,
//   // },

//   // reportTitle: {
//   //   fontSize: 15,
//   //   fontWeight: 700,
//   //   textAlign: "center"
//   // },
// masthead: {
//   flexDirection: "row",
//   alignItems: "flex-end",
//   paddingBottom: 8,
//   borderBottomWidth: 1.5,
//   borderBottomColor: COLORS.ink,
//   marginBottom: 12,
// },
// mastheadSpacer: { flex: 1 },
// reportTitle: {
//   flex: 1,
//   fontSize: 15,
//   fontWeight: 700,
//   textAlign: "center",
// },
// metaBlock: {
//   flex: 1,
//   alignItems: "flex-end",
// },

//   // metaBlock: {
//   //   alignItems: "flex-end",
//   // },

//   metaLine: {
//     fontSize: 7,
//     color: COLORS.muted,
//     marginBottom: 2,
//   },

//   metaValue: {
//     color: COLORS.ink,
//     fontWeight: 600,
//   },

//   /* ---------- SECTION TITLE ---------- */

//   sectionTitleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "baseline",
//     marginBottom: 8,
//   },

//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: 700,
//   },

//   sectionSubtitle: {
//     fontSize: 7.5,
//     color: COLORS.muted,
//   },

//   /* ---------- SUMMARY STRIP (the 4 boxes) ---------- */

//   summaryStrip: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: COLORS.rule,
//     marginBottom: 14,
//   },

//   summaryCell: {
//     flex: 1,
//     padding: 8,
//     borderRightWidth: 1,
//     borderRightColor: COLORS.rule,
//     backgroundColor: COLORS.surface,
//   },

//   summaryCellLast: {
//     flex: 1,
//     padding: 8,
//     backgroundColor: COLORS.surface,
//   },

//   summaryLabel: {
//     fontSize: 7,
//    color: COLORS.ink,
//     fontWeight: 600,
//     marginBottom: 4,
//     textAlign: "center",
   
//   },

//   summaryValue: {
//     fontSize: 11,
//     fontWeight: 600,
//     textAlign: "right"
//   },

//   summaryValuePaid: {
//     color: COLORS.amber,
//   },

//   summaryValueDue: {
//     color: COLORS.due,
//   },

//   /* ---------- TABLE (shared) ---------- */

//   table: {
//     width: "100%",
//   },

//   headerRow: {
//     flexDirection: "row",
//     backgroundColor: COLORS.ink,
//   },

//   headerCell: {
//     color: COLORS.headerText,
//     fontSize: 6.5,
//     fontWeight: 600,
//     padding: 5,
//     textAlign: "center"
//   },

//   dataRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.rule,
//   },

//   dataRowZebra: {
//     backgroundColor: "#FBFAF7",
//   },

//   cell: {
//     fontSize: 7,
//     padding: 5,
//   },

//   cellCenter: {
//     textAlign: "center",
//   },

//   cellNum: {
//     textAlign: "right",
//   },

//   cellDue: {
//     color: COLORS.due,
//     fontWeight: 600,
//   },

//   /* ---------- GROUP DIVIDER (detail table) ----------
//      Reused for either a month header ("August 2026") or a
//      standard/section header ("6th Standard A Sec"),
//      whichever the report is currently grouped by. */

//   groupRow: {
//     flexDirection: "row",
//     paddingTop: 8,
//     paddingBottom: 4,
//     paddingHorizontal: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.ink,
//     backgroundColor: COLORS.paper,
//   },

//   groupLabel: {
//     fontSize: 9,
//     fontWeight: 700,
//   },

//   groupSuffix: {
//     fontSize: 9,
//     fontWeight: 400,
//     color: COLORS.muted,
//     marginLeft: 4,
//   },

//   /* ---------- SUBTOTAL ROW (detail table only) ---------- */

//   subtotalRow: {
//     flexDirection: "row",
//     backgroundColor: COLORS.amberTint,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.amber,
//     borderBottomWidth: 1.5,
//     borderBottomColor: COLORS.amber,
//   },

//   subtotalLabel: {
//     fontSize: 7,
//     fontWeight: 600,
//     color: COLORS.muted,
//     padding: 5,
//   },

//   subtotalValue: {
//     fontSize: 7,
//     fontWeight: 600,
//     padding: 5,
//     textAlign: "right",
//   },

//   /* ---------- GRAND TOTAL ROW ---------- */

//   grandRow: {
//     flexDirection: "row",
//     backgroundColor: COLORS.ink,
//   },

//   grandLabel: {
//     fontSize: 8,
//     fontWeight: 700,
//     color: COLORS.paper,
//     padding: 6,
//   },

//   grandValue: {
//     fontSize: 8,
//     fontWeight: 700,
//     color: COLORS.paper,
//     padding: 6,
//     textAlign: "right",
//   },

//   /* ---------- COLUMN WIDTHS: DETAIL TABLE ---------- */

//   // wSL: { width: "3.5%" },
//   // wInvoice: { width: "8%" },
//   // wDate: { width: "7%" },
//   // wEmployee: { width: "18%" },
//   // wProject: { width: "22%" },
//   // wAmount: { width: "9%" },
//   // wBillYr: { width: "6%" },
//   // wPaid: { width: "9%" },
//   // wDue: { width: "9%" },
//   // wLastPaid: { width: "8.5%" },
//   // wLabelSpan: { width: "58.5%" },
//   wSL: { width: "3.5%" },
// wInvoice: { width: "8.5%" },   // +0.5
// wDate: { width: "7%" },
// wEmployee: { width: "20%" },   // +2
// wProject: { width: "24%" },    // +2
// wAmount: { width: "9.5%" },    // +0.5
// wPaid: { width: "9.5%" },      // +0.5
// wDue: { width: "9.5%" },       // +0.5
// wLastPaid: { width: "8.5%" },
// wLabelSpan: { width: "63%" }, // must equal wSL+wInvoice+wDate+wEmployee+wProject

//   /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
//      SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
//      primary/secondary are Month & Standard/Activities, order
//      depends on the report's grouping mode. */

//   sSL: { width: "5%" },
//   sPrimary: { width: "20%" },
//   sSecondary: { width: "25%" },
//   sInv: { width: "10%" },
//   sAmt: { width: "13%" },
//   sPaid: { width: "13%" },
//   sDue: { width: "14%" },
//   sLabelSpan: { width: "50%" }, // SL + primary + secondary, for the grand-total row

//   /* ---------- IMAGES ---------- */

//   headerWrapper: {
//     position: "absolute",
//     top: 15,
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

//   footerWrapper: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//   },

//   footerImage: {
//     width: "100%",
//     height: 70,
//     objectFit: "cover",
//   },

//   pageNumber: {
//     position: "absolute",
//     bottom: 72,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     fontSize: 8,
//     color: COLORS.muted,
//   },
// });

// /* =========================================================
//    CONSTANTS / HELPERS
// ========================================================= */

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// const money = (n) =>
//   "Rs. " +
//   new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(Number(n || 0));

// /* Pulls the middle "6th Standard A Sec" segment out of
//    "P0004 || 6th Standard A Sec || Month Fee" so grouping/summary
//    works off the class/section, not every fee-type variant. */
// const getStandardLabel = (projectStr = "") => {
//   const parts = String(projectStr).split("||").map((p) => p.trim());
//   return parts.length >= 2 ? parts[1] : projectStr || "—";
// };

// const monthYearLabel = (row) => {
//   const mNum = Number(row?.BillableMonth);
//   const mName = MONTH_NAMES[mNum - 1] || "";
//   const year = row?.BillableYear || "";
//   return `${mName} ${year}`.trim() || "—";
// };

// /* =========================================================
//    GROUPING

//    mode "Month"    -> one group per selected month, dividers
//                       read like "August 2026".
//    mode "Standard" -> one group per class/section, dividers
//                       read like "6th Standard A Sec".

//    Everything downstream (buildEntries, paginateEntries,
//    buildFlatSummary) works off `groups` generically — it
//    doesn't care what the group label means.
// ========================================================= */

// const buildGroups = (data, mode, selectedMonthNames) => {
//   const selectedMonthNums = selectedMonthNames
//     .map((name) => MONTH_NAMES.indexOf(name) + 1)
//     .filter((n) => n > 0);

//   const filteredData =
//     selectedMonthNums.length > 0
//       ? data.filter((row) => selectedMonthNums.includes(Number(row?.BillableMonth)))
//       : data;

//       const standardSortKey = (label) => {
//   const match = String(label).match(/(\d+)/);
//   return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
// };
// if (mode === "Standard") {
//   const byStd = {};
//   filteredData.forEach((row) => {
//     const key = getStandardLabel(row.Project);
//     if (!byStd[key]) byStd[key] = [];
//     byStd[key].push(row);
//   });
//   const labels = Object.keys(byStd).sort(
//     (a, b) => standardSortKey(a) - standardSortKey(b)
//   );
//   return labels.length > 0
//     ? labels.map((label) => ({ label, rows: byStd[label] }))
//     : [{ label: null, rows: filteredData }];
// }

//   // if (mode === "Standard") {
//   //   const byStd = {};
//   //   filteredData.forEach((row) => {
//   //     const key = getStandardLabel(row.Project);
//   //     if (!byStd[key]) byStd[key] = [];
//   //     byStd[key].push(row);
//   //   });
//   //   const labels = Object.keys(byStd);
//   //   return labels.length > 0
//   //     ? labels.map((label) => ({ label, rows: byStd[label] }))
//   //     : [{ label: null, rows: filteredData }];
//   // }

//   // mode === "Month"
//   const monthsPresent = [
//     ...new Set(filteredData.map((row) => Number(row?.BillableMonth))),
//   ]
//     .filter((n) => n > 0)
//     .sort((a, b) => a - b);

//   return monthsPresent.length > 0
//     ? monthsPresent.map((num) => ({
//         label: MONTH_NAMES[num - 1],
//         rows: filteredData.filter((row) => Number(row?.BillableMonth) === num),
//       }))
//     : [{ label: null, rows: filteredData }];
// };

// /* =========================================================
//    PAGINATION (transaction detail pages)
// ========================================================= */

// const FIRST_PAGE_COUNT = 14;
// const OTHER_PAGE_COUNT = 22;

// const buildEntries = (groups) => {
//   const entries = [];
//   let sl = 1;
//   let grandAmount = 0;
//   let grandPaid = 0;
//   let grandDue = 0;

//   groups.forEach((group) => {
//     if (group.label) {
//       entries.push({ type: "group", label: group.label });
//     }

//     let mAmount = 0;
//     let mPaid = 0;
//     let mDue = 0;

//     group.rows.forEach((row) => {
//       mAmount += Number(row.TotalAmount || 0);
//       mPaid += Number(row.PaidAmount || 0);
//       mDue += Number(row.Due || 0);
//       entries.push({ type: "row", row, serial: sl++ });
//     });

//     if (group.label) {
//       entries.push({ type: "subtotal", label: group.label, mAmount, mPaid, mDue });
//     }

//     grandAmount += mAmount;
//     grandPaid += mPaid;
//     grandDue += mDue;
//   });

//   entries.push({ type: "grand", grandAmount, grandPaid, grandDue });

//   return { entries, grandAmount, grandPaid, grandDue, totalInvoices: sl - 1 };
// };

// const paginateEntries = (entries) => {
//   const pages = [];
//   let i = 0;
//   let cap = FIRST_PAGE_COUNT;

//   while (i < entries.length) {
//     let end = Math.min(i + cap, entries.length);

//     while (end > i + 1 && entries[end - 1].type === "group") {
//       end -= 1;
//     }

//     pages.push(entries.slice(i, end));
//     i = end;
//     cap = OTHER_PAGE_COUNT;
//   }

//   return pages;
// };

// /* =========================================================
//    FLAT SUMMARY TABLE

//    One row per (primary group, secondary breakdown) pair, in
//    group order, running SL# across the whole table, no
//    per-group subtotal rows — just one Grand Total at the end.

//    mode "Month"    -> primary = month,    secondary = standard
//    mode "Standard" -> primary = standard, secondary = month
// ========================================================= */

// const buildFlatSummary = (groups, mode) => {
//   const rows = [];
//   let sl = 1;
//   let grandAmount = 0;
//   let grandPaid = 0;
//   let grandDue = 0;
//   let grandInvoices = 0;

//   groups.forEach((group) => {
//     const bySecondary = {};

//     group.rows.forEach((row) => {
//       const key = mode === "Standard" ? monthYearLabel(row) : getStandardLabel(row.Project);
//       if (!bySecondary[key]) {
//         bySecondary[key] = { label: key, invoices: 0, amount: 0, paid: 0, due: 0 };
//       }
//       bySecondary[key].invoices += 1;
//       bySecondary[key].amount += Number(row.TotalAmount || 0);
//       bySecondary[key].paid += Number(row.PaidAmount || 0);
//       bySecondary[key].due += Number(row.Due || 0);
//     });

//     Object.values(bySecondary).forEach((r) => {
//       rows.push({
//         sl: sl++,
//         primary: group.label || "—",
//         secondary: r.label,
//         invoices: r.invoices,
//         amount: r.amount,
//         paid: r.paid,
//         due: r.due,
//       });
//       grandAmount += r.amount;
//       grandPaid += r.paid;
//       grandDue += r.due;
//       grandInvoices += r.invoices;
//     });
//   });

//   return { rows, grandAmount, grandPaid, grandDue, grandInvoices };
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const InvpaymentPDF = ({
//   data = [],
//   columndata = [],
//   filters = {},
//   selectedMonths = "",
//   periodLabel = "",
// }) => {
//   const headerMap = columndata.reduce((acc, col) => {
//     if (col?.field) acc[col.field] = col.headerName;
//     return acc;
//   }, {});

//   // "Month" (default) or "Standard" — from the Type dropdown in the filter panel.
//   const mode = filters?.PDFType === "Standard" ? "Standard" : "Month";

//     const modeSuffix = mode === "Standard" ? "Standard Wise" : "Month Wise";
//     const reportTitleText = `Invoice Payment Report (${modeSuffix})`;

//   const selectedMonthNames = selectedMonths
//     ? selectedMonths.split(",").map((m) => m.trim()).filter(Boolean)
//     : [];

//   const groups = buildGroups(data, mode, selectedMonthNames);

//   const { entries, grandAmount, grandPaid, grandDue, totalInvoices } =
//     buildEntries(groups);
//   const detailPages = paginateEntries(entries);
//   const flatSummary = buildFlatSummary(groups, mode);

//   const derivedPeriod = (() => {
//     if (mode !== "Month") return "";
//     const labeled = groups.filter((g) => g.label && g.rows.length);
//     if (labeled.length === 0) return "";
//     const first = labeled[0].label;
//     const last = labeled[labeled.length - 1].label;
//     const year = labeled[labeled.length - 1].rows[0]?.BillableYear ?? "";
//     return first === last ? `${first} ${year}` : `${first} – ${last} ${year}`;
//   })();

//   const generatedDate = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   const detailGroupWord = mode === "Standard" ? "Standard/Activities" : "Month";
//   const summaryPrimaryHeader = mode === "Standard" ? "Standard/Activities" : "Month";
//   const summarySecondaryHeader = mode === "Standard" ? "Billable Month" : "Standard/Activities";

//   const HeaderImage = () => (
//     <View fixed style={styles.headerWrapper}>
//       {filters?.HeaderImg && (
//         <Image
//           src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//           style={styles.headerImage}
//         />
//       )}
//     </View>
//   );

//   const FooterImage = () => (
//     <View fixed style={styles.footerWrapper}>
//       {filters?.FooterImg && (
//         <Image
//           src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//           style={styles.footerImage}
//         />
//       )}
//     </View>
//   );

//   const PageNumber = () => (
//     <View fixed style={styles.pageNumber}>
//       <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
//     </View>
//   );

//   return (
//     <Document>
//       {/* =========================================================
//           PAGE 1..N — masthead + the 4 boxes (first page only),
//           then TRANSACTION DETAIL, grouped by whichever mode is
//           selected (Month or Standard/Activities).
//       ========================================================= */}
//       {detailPages.map((pageEntries, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         return (
//           <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
//             <HeaderImage />

//             {isFirstPage && (
//               <>
//           <View style={styles.masthead}>
//   <View style={styles.mastheadSpacer} />
//   <Text style={styles.reportTitle}>{reportTitleText}</Text>
//   <View style={styles.metaBlock}>
//     <Text style={styles.metaLine}>
//       Generated{"  "}
//       <Text style={styles.metaValue}>{generatedDate}</Text>
//     </Text>
//   </View>
// </View>

//                 <View style={styles.summaryStrip}>
//                   <View style={styles.summaryCell}>
//                     <Text style={styles.summaryLabel}>Invoices</Text>
//                     <Text style={styles.summaryValue}>{totalInvoices}</Text>
//                   </View>
//                   <View style={styles.summaryCell}>
//                     <Text style={styles.summaryLabel}>Total Billed</Text>
//                     <Text style={styles.summaryValue}>{money(grandAmount)}</Text>
//                   </View>
//                   <View style={styles.summaryCell}>
//                     <Text style={styles.summaryLabel}>Total Paid</Text>
//                     <Text style={[styles.summaryValue, styles.summaryValuePaid]}>
//                       {money(grandPaid)}
//                     </Text>
//                   </View>
//                   <View style={styles.summaryCellLast}>
//                     <Text style={styles.summaryLabel}>Total Due</Text>
//                     <Text style={[styles.summaryValue, styles.summaryValueDue]}>
//                       {money(grandDue)}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.sectionTitleRow}>
//                   <Text style={styles.sectionTitle}>Transaction Detail</Text>
//                   {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
//                 </View>
//               </>
//             )}

//             <View style={styles.table}>
//               <View style={styles.headerRow}>
//                 <Text style={[styles.headerCell, styles.wSL, styles.cellCenter]}>SL#</Text>
//                 <Text style={[styles.headerCell, styles.wInvoice]}>Invoice#</Text>
//                 <Text style={[styles.headerCell, styles.wDate]}>Date</Text>
//                 <Text style={[styles.headerCell, styles.wEmployee]}>
//                   {headerMap.Employee || "Employee"}
//                 </Text>
             
              
//               <Text style={[styles.headerCell, styles.wProject]}>
//   {mode === "Standard"
//     ? summarySecondaryHeader
//     : (headerMap.Project || "Project")}
// </Text>
//                 <Text style={[styles.headerCell, styles.wAmount, styles.cellNum]}>Amount</Text>
//                 {/* <Text style={[styles.headerCell, styles.wBillYr, styles.cellCenter]}>Bill Yr</Text> */}
//                 <Text style={[styles.headerCell, styles.wPaid, styles.cellNum]}>Paid</Text>
//                 <Text style={[styles.headerCell, styles.wDue, styles.cellNum]}>Due</Text>
//                 <Text style={[styles.headerCell, styles.wLastPaid]}>Last Paid</Text>
//               </View>

//               {pageEntries.map((entry, idx) => {
//                 if (entry.type === "group") {
//                   return (
//                     <View key={idx} style={styles.groupRow}>
//                       <Text style={styles.groupLabel}>{entry.label}</Text>
//                     </View>
//                   );
//                 }

//                 if (entry.type === "row") {
//                   const row = entry.row;
//                   const zebra = entry.serial % 2 === 0 ? styles.dataRowZebra : null;
//                   return (
//                     <View key={idx} style={[styles.dataRow, zebra]}>
//                       <Text style={[styles.cell, styles.wSL, styles.cellCenter]}>{entry.serial}</Text>
//                       <Text style={[styles.cell, styles.wInvoice, styles.cellCenter]}>{row?.InvoiceNo ?? ""}</Text>
//                       <Text style={[styles.cell, styles.wDate, styles.cellCenter]}>{row?.Date ?? ""}</Text>
//                       <Text style={[styles.cell, styles.wEmployee, styles.cellCenter]}>{row?.EmpCodeName ?? ""}</Text>
                      
//                       <Text style={[styles.cell, styles.wProject, styles.cellCenter]}>
//                          {mode === "Month" ? (row?.Project ?? "") : row?.BillableMonthYear ?? ""}
//                         </Text>
                      
//                       <Text style={[styles.cell, styles.wAmount, styles.cellNum]}>
//                         {money(row?.TotalAmount)}
//                       </Text>
//                       {/* <Text style={[styles.cell, styles.wBillYr, styles.cellCenter]}>
//                         {row?.BillableYear ?? ""}
//                       </Text> */}
//                       <Text style={[styles.cell, styles.wPaid, styles.cellNum]}>
//                         {money(row?.PaidAmount)}
//                       </Text>
//                       <Text
//                         style={[
//                           styles.cell,
//                           styles.wDue,
//                           styles.cellNum,
//                           Number(row?.Due) > 0 ? styles.cellDue : null,
//                         ]}
//                       >
//                         {money(row?.Due)}
//                       </Text>
//                       <Text style={[styles.cell, styles.wLastPaid, styles.cellCenter]}>{row?.LastPaidDate ?? ""}</Text>
//                     </View>
//                   );
//                 }
// if (entry.type === "subtotal") {
//   return (
//     <View key={idx} style={styles.subtotalRow}>
//       <Text style={[styles.subtotalLabel, styles.wLabelSpan]}>Total</Text>
//       <Text style={[styles.subtotalValue, styles.wAmount]}>{money(entry.mAmount)}</Text>
//       <Text style={[styles.subtotalValue, styles.wPaid]}>{money(entry.mPaid)}</Text>
//       <Text style={[styles.subtotalValue, styles.wDue]}>{money(entry.mDue)}</Text>
//       <Text style={styles.wLastPaid} />
//     </View>
//   );
// }

// if (entry.type === "grand") {
//   return (
//     <View key={idx} style={styles.grandRow}>
//       <Text style={[styles.grandLabel, styles.wLabelSpan]}>Grand Total</Text>
//       <Text style={[styles.grandValue, styles.wAmount]}>{money(entry.grandAmount)}</Text>
//       <Text style={[styles.grandValue, styles.wPaid]}>{money(entry.grandPaid)}</Text>
//       <Text style={[styles.grandValue, styles.wDue]}>{money(entry.grandDue)}</Text>
//       <Text style={styles.wLastPaid} />
//     </View>
//   );
// }

//                 // if (entry.type === "subtotal") {
//                 //   return (
//                 //     <View key={idx} style={styles.subtotalRow}>
//                 //       <Text style={[styles.subtotalLabel, styles.wLabelSpan]}>Total</Text>
//                 //       <Text style={[styles.subtotalValue, styles.wAmount]}>{money(entry.mAmount)}</Text>
//                 //       <Text style={styles.wBillYr} />
//                 //       <Text style={[styles.subtotalValue, styles.wPaid]}>{money(entry.mPaid)}</Text>
//                 //       <Text style={[styles.subtotalValue, styles.wDue]}>{money(entry.mDue)}</Text>
//                 //       <Text style={styles.wLastPaid} />
//                 //     </View>
//                 //   );
//                 // }

//                 // if (entry.type === "grand") {
//                 //   return (
//                 //     <View key={idx} style={styles.grandRow}>
//                 //       <Text style={[styles.grandLabel, styles.wLabelSpan]}>Grand Total</Text>
//                 //       <Text style={[styles.grandValue, styles.wAmount]}>{money(entry.grandAmount)}</Text>
//                 //       <Text style={styles.wBillYr} />
//                 //       <Text style={[styles.grandValue, styles.wPaid]}>{money(entry.grandPaid)}</Text>
//                 //       <Text style={[styles.grandValue, styles.wDue]}>{money(entry.grandDue)}</Text>
//                 //       <Text style={styles.wLastPaid} />
//                 //     </View>
//                 //   );
//                 // }

//                 return null;
//               })}
//             </View>

//             <PageNumber />
//             <FooterImage />
//           </Page>
//         );
//       })}

//       {/* =========================================================
//           LAST PAGE — SUMMARY
//           Single flat table: SL# | <primary> | <secondary> |
//           Invoices | Amount | Paid | Due. Column order flips
//           with the grouping mode. No per-group subtotal rows —
//           just one Grand Total row at the bottom.
//       ========================================================= */}
//       <Page size="A4" orientation="landscape" style={styles.page}>
//         <HeaderImage />

//         <View style={styles.sectionTitleRow}>
//           <Text style={styles.sectionTitle}>Summary</Text>
//           {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
//         </View>

//         <View style={styles.table}>
//           <View style={styles.headerRow}>
//             <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
//             <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
//             <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
//             <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Invoices</Text>
//             <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
//             <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
//             <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
//           </View>

//           {flatSummary.rows.map((r, idx) => {
//             const zebra = idx % 2 === 1 ? styles.dataRowZebra : null;
//             return (
//               <View key={idx} style={[styles.dataRow, zebra]}>
//                 <Text style={[styles.cell, styles.sSL, styles.cellCenter]}>{r.sl}</Text>
//                 <Text style={[styles.cell, styles.sPrimary]}>{r.primary}</Text>
//                 <Text style={[styles.cell, styles.sSecondary]}>{r.secondary}</Text>
//                 <Text style={[styles.cell, styles.sInv, styles.cellCenter]}>{r.invoices}</Text>
//                 <Text style={[styles.cell, styles.sAmt, styles.cellNum]}>{money(r.amount)}</Text>
//                 <Text style={[styles.cell, styles.sPaid, styles.cellNum]}>{money(r.paid)}</Text>
//                 <Text
//                   style={[
//                     styles.cell,
//                     styles.sDue,
//                     styles.cellNum,
//                     r.due > 0 ? styles.cellDue : null,
//                   ]}
//                 >
//                   {money(r.due)}
//                 </Text>
//               </View>
//             );
//           })}

//           <View style={styles.grandRow}>
//             <Text style={[styles.grandLabel, styles.sLabelSpan]}>Grand Total</Text>
//             <Text style={[styles.grandValue, styles.sInv, styles.cellCenter]}>
//               {flatSummary.grandInvoices}
//             </Text>
//             <Text style={[styles.grandValue, styles.sAmt]}>{money(flatSummary.grandAmount)}</Text>
//             <Text style={[styles.grandValue, styles.sPaid]}>{money(flatSummary.grandPaid)}</Text>
//             <Text style={[styles.grandValue, styles.sDue]}>{money(flatSummary.grandDue)}</Text>
//           </View>
//         </View>

//         <PageNumber />
//         <FooterImage />
//       </Page>
//     </Document>
//   );
// };

// export default InvpaymentPDF;
