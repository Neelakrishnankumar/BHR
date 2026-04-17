// import React from "react";
// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet,Image
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//     // page: {
//     //     padding: 20,
//     //     fontSize: 10,
//     // },
//       page: {
//         paddingTop: 90,
//         paddingBottom: 80,
//         paddingHorizontal: 20,
//         fontSize: 10,
//     },
//     section: {
//         marginBottom: 10,
//     },
//     headerContainer: {
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         marginTop: 20,
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
//         /* HEADER */
//     headerWrapper: {
//         position: "absolute",
//         top: 20,
//         left: 20,
//         right: 20,
//         height: 60,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     headerImage: {
//         width: "100%",
//         height: 60,
//         objectFit: "contain",
//     },
//     /* FOOTER */
//     footerWrapper: {
//         position: "absolute",
//         bottom: 30,
//         left: 5,
//         right: 5,     // forces full width
//         height: 60,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     footerImage: {
//         width: "100%",
//         height: 100,
//         objectFit: "cover",
//     },
// });



// // Split data: 20 on first page, 26 afterwards
// const paginateData = (data) => {
//     const firstPage = data.slice(0, 20);
//     const otherPages = [];

//     for (let i = 20; i < data.length; i += 0) {
//         otherPages.push(data.slice(i, i + 20));
//     }

//     return [firstPage, ...otherPages];
// };

// const DailyattendancePDF = ({ data = [], filters = {} }) => {
//     const pages = paginateData(data);
//     pages.forEach((page, i) => {
//         console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
//     });
//     const formattedDate = filters.Date
//         ? filters.Date.split("-").reverse().join("-")
//         : "";
//     const isSelf = filters.Self === "Y";


//     const dynamicHeaderStyles = {
//         col1: {
//             ...styles.tableColHeader1,
//             width: "8%"
//         },
//         colDate: {
//             ...styles.tableColHeader,
//             width: "14%"
//         },
//         colCheckIn: {
//             ...styles.tableColHeader,
//             width: "15%"
//         },
//         colCheckOut: {
//             ...styles.tableColHeader,
//             width: "20%"
//         },
//         colHours: {
//             ...styles.tableCol2Header,
//             width: "23%"
//         },
//         colStatus: {
//             ...styles.tableColHeaderLast,
//             width: "20%"
//         },
//         colName: {
//             ...styles.tableCol3Header,
//             display: filters.Self === "Y" ? "none" : "block"
//         }
//     };

//     const dynamicRowStyles = {
//         col1: {
//             ...styles.tableCol1,
//             width: "8%"
//         },
//         colDate: {
//             ...styles.tableCol,
//             width: "14%"
//         },
//         colCheckIn: {
//             ...styles.tableCol,
//             width: "15%"
//         },
//         colCheckOut: {
//             ...styles.tableCol,
//             width: "20%"
//         },
//         colHours: {
//             ...styles.tableCol2,
//             width: "23%"
//         },
//         colStatus: {
//             ...styles.tableColLast,
//             width: "20%"
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
//                 <Page size="A4" style={styles.page} key={pageIndex}>
                    
//                       <View fixed style={styles.headerWrapper}>
//                                   {filters.HeaderImg && (
//                                     <Image
//                                       src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                                       style={styles.headerImage}
//                                     />
//                                   )}
//                                 </View>
//                     {pageIndex === 0 && (
//                         <View style={styles.headerContainer}>
//                             {/* <Text style={styles.headerText}>
//                 {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text> */}
//                             {/* <Text style={styles.headerText}>
//                 {filters.Date
//                   ? `Attendance Report ${filters.EmployeeID} (${formattedDate})`
//                   : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text> */}
//                             <Text style={styles.headerText}>
//                                 {filters.Self === "Y"
//                                     ? `Daily Attendance Report - (${formattedDate})`
//                                     : filters.Self === "N"
//                                         ? `Daily Attendance Report - (${formattedDate})`
//                                         : `Daily Attendance Report - (${formattedDate})`}
//                             </Text>


//                         </View>

//                     )}

//                     {/* Table Header */}
//                     <View style={styles.table}>
//                         {/* <View style={styles.tableRow}>
//               <Text style={styles.tableCol1}>S.No</Text>
//               {filters.Self === "N" && ( <Text style={styles.tableCol3Header}>Employee Name</Text>)}
//               <Text style={dynamicStyles.colCheckIn}>Check In</Text>
//               <Text style={dynamicStyles.colCheckOut}>Check Out</Text>
//               <Text style={dynamicStyles.colHours}>Hrs</Text>
//               <Text style={dynamicStyles.colStatus}>Status</Text>
//             </View> */}
//                         <View style={styles.tableRow}>
//                             <Text style={dynamicHeaderStyles.col1}>SL#</Text>
//                             <Text style={dynamicHeaderStyles.colDate}>Name</Text>
//                             <Text style={dynamicHeaderStyles.colCheckIn}>Check In Date Time</Text>
//                             <Text style={dynamicHeaderStyles.colCheckOut}>Check Out Date Time</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Worked Hours</Text>
//                             <Text style={dynamicHeaderStyles.colStatus}>Status</Text>
//                         </View>

//                         {pageData.map((row, rowIndex) => {
//                             const isLast = rowIndex === pageData.length - 1;
//                             return (
//                                 <View key={rowIndex} style={isLast ? styles.tableRowLast : styles.tableRow}>
//                                     <Text style={dynamicRowStyles.col1}>{row.SLNO}</Text>
//                                     <Text style={dynamicRowStyles.colDate}>{row.Name}</Text>
//                                     <Text style={dynamicRowStyles.colCheckIn}>{row.EmplyeeCheckInDateTime}</Text>
//                                     <Text style={dynamicRowStyles.colCheckOut}>{row.EmplyeeCheckOutDateTime}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.NumberOfHoursWorked}</Text>
//                                     <Text style={dynamicRowStyles.colStatus}>{row.Status}</Text>
//                                     {/* <Text style={dynamicRowStyles.colStatus}>{row.Comments}</Text> */}
//                                 </View>
//                             );
//                         })}

//                     </View>

//                        {/* FOOTER */}
//                                     <View fixed style={styles.footerWrapper}>
//                                       {filters.FooterImg && (
//                                         <Image
//                                           src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                                           style={styles.footerImage}
//                                         />
//                                       )}
//                                     </View>
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

// export default DailyattendancePDF;

import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

// Optimized Styles - More rows per page, better spacing
const styles = StyleSheet.create({
    page: {
        paddingTop: 70,
        paddingBottom: 70,
        paddingHorizontal: 15,
        fontSize: 9,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: "center",
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
    // Header Cells - OPTIMIZED WIDTHS
    tableColHeader1: {
        width: "5%",  // SL# - smaller
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader2: {
        width: "25%",  // Name - WIDER (was 20%)
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader3: {
        width: "18%",  // Check In
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader4: {
        width: "18%",  // Check Out
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeader5: {
        width: "10%",  // Hours
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    tableColHeaderLast: {
        width: "24%",  // Status - WIDER for consistency
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#CCCCCC",
        textAlign: "center",
        fontSize: 8,
    },
    // Data Cells - OPTIMIZED WIDTHS
    tableCol1: {
        width: "5%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        fontSize: 8,
    },
    tableCol2: {
        width: "25%",  // Name - WIDER
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "left",
        fontSize: 7,
    },
    tableCol3: {
        width: "18%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        fontSize: 7,
    },
    tableCol4: {
        width: "18%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        fontSize: 7,
    },
    tableCol5: {
        width: "10%",
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        fontSize: 7,
    },
    tableColLast: {
        width: "24%",
        padding: 3,
        textAlign: "left",
        fontSize: 7,
    },
    // Header & Footer
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
    footerWrapper: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        height: 60,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    footerImage: {
        width: "100%",
        height: 60,
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
  sectionContainer: {
    marginTop: 10,
  padding: 10,
  breakInside: "avoid", 
  },

  SummheaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#0B3D91",
    // textDecoration: "underline",
  },

  card: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc",
    backgroundColor: "#F9FBFF",
  },

  listTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1A237E",
    borderBottom: "1px solid #ddd",
    paddingBottom: 2,
  },

  listText: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
    color: "#333",
  },

  emptyText: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#999",
    marginLeft: 10,
  },
});

// ✅ FIXED: Proper pagination - fit more rows per page
// const paginateData = (data) => {
//     if (!data || data.length === 0) return [];

//     const pageSize = 30;  // ✅ INCREASED from 20 to 30 rows per page
//     const pages = [];

//     for (let i = 0; i < data.length; i += pageSize) {
//         pages.push(data.slice(i, i + pageSize));
//     }

//     return pages;
// };
const paginateData = (data) => {
  if (!data || data.length === 0) return [];

  const pageSize = 30;
  const lastPageSize = 18; // 👈 leave space for summary

  const pages = [];

  for (let i = 0; i < data.length; i += pageSize) {
    pages.push(data.slice(i, i + pageSize));
  }

  // 👇 Adjust last page
  const lastPage = pages[pages.length - 1];

  if (lastPage.length > lastPageSize) {
    const extra = lastPage.slice(lastPageSize);
    pages[pages.length - 1] = lastPage.slice(0, lastPageSize);
    pages.push(extra); // push overflow to new page
  }

  return pages;
};

const DailyattendancePDF = ({ data = [], filters = {} }) => {
    const pages = paginateData(data);

    if (!pages || pages.length === 0) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text>No attendance data available</Text>
                </Page>
            </Document>
        );
    }

    const formattedDate = filters.Date
        ? filters.Date.split("-").reverse().join("-")
        : "";



// Helper function for dd-mm-yyyy
const formatDateDisplay = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  const datePart = dateStr.split(" ")[0]; 
  const [year, month, day] = datePart.split("-");
  return `${day}-${month}-${year}`;
};

// Update mappings to use 'name' and 'date'
const permissionList = data
  .filter(r => r.Permission && r.Permission !== "00:00")
  .map(r => {
    console.log(r, "--hii permissionList");  // ✅ valid here

    return {
      name: r.EmpName,
      date: formatDateDisplay(r.CheckInDate)
    };
  });

const scheduledLeaveList = data
  .filter(r => r.Status === "Leave")
  .map(r => ({ 
    name: r.EmpName, 
    date: formatDateDisplay(r.CheckInDate) 
  }));

const unscheduledLeaveList = data
  .filter(r => r.Status === "Absent")
  .map(r => ({ 
    name: r.EmpName, 
    date: formatDateDisplay(r.CheckInDate) 
  }));

    return (
        <Document>
            {pages.map((pageData, pageIndex) => (
                <Page size="A4" style={styles.page} key={pageIndex}>
                    
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
                            <Text style={styles.headerText}>
                                Daily Attendance Report - ({formattedDate})
                            </Text>
                        </View>
                    )}

                    {/* Data Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader1}>SL#</Text>
                            <Text style={styles.tableColHeader2}>Name</Text>
                            <Text style={styles.tableColHeader3}>Check In</Text>
                            <Text style={styles.tableColHeader4}>Check Out</Text>
                            <Text style={styles.tableColHeader5}>Hours</Text>
                            <Text style={styles.tableColHeaderLast}>Status</Text>
                        </View>

                        {/* Table Rows */}
                        {pageData.map((row, rowIndex) => {
                            const isLast = rowIndex === pageData.length - 1;
                            return (
                                <View 
                                    key={`${pageIndex}-${rowIndex}`} 
                                    style={isLast ? styles.tableRowLast : styles.tableRow}
                                >
                                    <Text style={styles.tableCol1}>
                                        {row.SLNO || rowIndex + 1}
                                    </Text>
                                    <Text style={styles.tableCol2}>
                                        {row.Name || "-"}
                                    </Text>
                                    <Text style={styles.tableCol3}>
                                        {row.EmplyeeCheckInDateTime || "-"}
                                    </Text>
                                    <Text style={styles.tableCol4}>
                                        {row.EmplyeeCheckOutDateTime || "-"}
                                    </Text>
                                    <Text style={styles.tableCol5}>
                                        {row.NumberOfHoursWorked || "-"}
                                    </Text>
                                    <Text style={styles.tableColLast}>
                                        {row.Status || "-"}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>



                    {/* Footer Image - Optional */}
                    {filters.FooterImg && 
                     filters.FooterImg.length > 0 &&
                     filters.FooterImg.length < 100000 && (
                        <View fixed style={styles.footerWrapper}>
                            <Image
                                src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                                style={styles.footerImage}
                            />
                        </View>
                    )}

                    {/* Page Number */}
                    <Text fixed style={styles.pageNumber}>
                        Page {pageIndex + 1} of {pages.length}
                    </Text>

         {/* ✅ Summary Page (NEW) */}
{/* ✅ Summary Page Section */}
{pageIndex === pages.length - 1 && (
  <View style={styles.sectionContainer}>
    <Text style={styles.SummheaderText}>Summary</Text>

    {/* ✅ Permission */}
    {permissionList?.length > 0 && (
      <View style={styles.card} wrap={false}>
        <Text style={styles.listTitle}>
          Permission List ({permissionList.length})
        </Text>
        {permissionList.map((item, i) => (
          <Text key={i} style={styles.listText}>
            • {item.name}
          </Text>
        ))}
      </View>
    )}

    {/* ✅ Scheduled Leave */}
    {scheduledLeaveList?.length > 0 && (
      <View style={styles.card} wrap={false}>
        <Text style={styles.listTitle}>
          Scheduled Leave ({scheduledLeaveList.length})
        </Text>
        {scheduledLeaveList.map((item, i) => (
          <Text key={i} style={styles.listText}>
            • {item.name}
          </Text>
        ))}
      </View>
    )}

    {/* ✅ Unscheduled Leave */}
    {unscheduledLeaveList?.length > 0 && (
      <View style={styles.card} wrap={false}>
        <Text style={styles.listTitle}>
          Unscheduled Leave ({unscheduledLeaveList.length})
        </Text>
        {unscheduledLeaveList.map((item, i) => (
          <Text key={i} style={styles.listText}>
            • {item.name}
          </Text>
        ))}
      </View>
    )}
  </View>
)}

                </Page>

         
            ))}


    
        </Document>
    );
};

export default DailyattendancePDF;

