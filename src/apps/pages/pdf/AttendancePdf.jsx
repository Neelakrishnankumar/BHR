// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10,
//   },
//   section: {
//     marginBottom: 10,
//   }, headerContainer: {
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginTop: 20,
//   },
//   headerText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderStyle: "solid",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     borderBottomStyle: "solid",
//   },
//   tableRowLast: {
//     flexDirection: "row",
//   },
//   tableColHeader1: {
//     width: "10%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },
//   tableCol1: {
//     width: "10%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     textAlign: "right",
//   },

//   tableColHeader: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableCol: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },

//   tableColHeader2: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableCol2: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },

//   tableColHeader3: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableCol3: {
//     width: "12%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//   },

//   tableColHeaderLast: {
//     width: "12%",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     textAlign: "center",
//   },

//   tableColLast: {
//     width: "12%",
//     padding: 5,
//   },

// });

// // Split data: 20 on first page, 26 afterwards
// // const ROWS_PER_PAGE = 31;

// // const paginateData = (data) => {
// //   const pages = [];
// //   for (let i = 0; i < data.length; i += ROWS_PER_PAGE) {
// //     pages.push(data.slice(i, i + ROWS_PER_PAGE));
// //   }
// //   return pages;
// // };

// const paginateData = (data) => {
//   const firstPage = data.slice(0, 31);
//   const otherPages = [];

//   for (let i = 31; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };

// // const AttendancePDF = ({ data = [], filters = {} }) => {
// //   const pages = paginateData(data);
// //   const formattedDate = filters.Date
// //     ? filters.Date.split("-").reverse().join("-")
// //     : "";
// //   const monthNames = [
// //     "January", "February", "March", "April", "May", "June",
// //     "July", "August", "September", "October", "November", "December"
// //   ];
// //   return (
// //     <Document>
// //       {pages.map((pageData, pageIndex) => (
// //         <Page size="A4" style={styles.page} key={pageIndex}>
// //           {pageIndex === 0 && (
// //             <View style={styles.headerContainer}>
// //               {/* <Text style={styles.headerText}>
// //           {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
// //           </Text> */}
// //               {/* <Text style={styles.headerText}>
// //                 {filters.Date
// //                   ? `Attendance Report - ${filters.EmployeeID} (${formattedDate})`
// //                   : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
// //               </Text> */}
// //               <Text style={styles.headerText}>
// //                 {filters.Date
// //                   ? `Attendance Report - (${formattedDate})`
// //                   : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
// //               </Text>
// //             </View>

// //           )}

// //           {/* Table Header */}
// //           <View style={styles.table}>
// //             <View style={styles.tableRow}>
// //               <Text style={styles.tableColHeader1}>S.No</Text>
// //               {filters.Date && (
// //                 <Text style={styles.tableColHeader2}>Employee Name</Text>
// //               )}
// //               <Text style={styles.tableColHeader}>Check In</Text>
// //               <Text style={styles.tableColHeader}>Check Out</Text>
// //               <Text style={styles.tableColHeader3}>Hrs</Text>
// //               <Text style={styles.tableColHeaderLast}>Status</Text>
// //             </View>

// //             {/* Table Body */}
// //             {pageData.map((row, rowIndex) => {
// //               const isLast = rowIndex === pageData.length - 1;
// //               return (
// //                 <View
// //                   key={rowIndex}
// //                   style={isLast ? styles.tableRowLast : styles.tableRow}
// //                 >
// //                   <Text style={styles.tableCol1}>{row.SLNO}</Text>
// //                    {filters.Date && (
// //                   <Text style={styles.tableCol2}>{row.Name}</Text>)}
// //                   <Text style={styles.tableCol}>{row.EmplyeeCheckInDateTime}</Text>
// //                   <Text style={styles.tableCol}>{row.EmplyeeCheckOutDateTime}</Text>
// //                   <Text style={styles.tableCol3}>{row.NumberOfHoursWorked}</Text>
// //                   <Text style={styles.tableColLast}>{row.Status}</Text>
// //                 </View>
// //               );
// //             })}
// //           </View>
// //           <View
// //             fixed
// //             style={{
// //               position: "absolute",
// //               bottom: 10,
// //               left: 0,
// //               right: 0,
// //               textAlign: "center",
// //               fontSize: 10,
// //             }}
// //           >
// //             <Text>Page {pageIndex + 1} of {pages.length}</Text>
// //           </View>
// //         </Page>
// //       ))}
// //     </Document>
// //   );
// // };
// const AttendancePDF = ({ data = [], filters = {} }) => {
//   const pages = paginateData(data);
//   const formattedDate = filters.Date
//     ? filters.Date.split("-").reverse().join("-")
//     : "";
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const includeName = !!filters.Date;

//   // Adjust column widths based on presence of Employee Name column
//   const colWidths = includeName
//     ? { col: "20%", col3: "10%", last: "15%" } // With Employee Name
//     : { col: "30%", col3: "15%", last: "20%" }; // Without Employee Name

//   const dynamicStyles = StyleSheet.create({
//     tableColHeader: {
//       width: colWidths.col,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableColHeader3: {
//       width: colWidths.col3,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableColHeaderLast: {
//       width: colWidths.last,
//       padding: 5,
//       fontWeight: "bold",
//       backgroundColor: "#EEE",
//       textAlign: "center",
//     },
//     tableCol: {
//       width: colWidths.col,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//     },
//     tableCol3: {
//       width: colWidths.col3,
//       borderRightWidth: 1,
//       borderRightColor: "#000",
//       padding: 5,
//     },
//     tableColLast: {
//       width: colWidths.last,
//       padding: 5,
//     },
//   });

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" style={styles.page} key={pageIndex}>
//           {pageIndex === 0 && (
//             <View style={styles.headerContainer}>
//               <Text style={styles.headerText}>
//                 {filters.Date
//                   ? `Attendance Report - (${formattedDate})`
//                   : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text>
//             </View>
//           )}

//           {/* Table Header */}
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableColHeader1}>SL#</Text>
//               {includeName && (
//                 <Text style={styles.tableColHeader2}>Employee Name</Text>
//               )}
//               <Text style={dynamicStyles.tableColHeader}>Check In Date</Text>
//               <Text style={dynamicStyles.tableColHeader}>Check In Time</Text>
//               <Text style={dynamicStyles.tableColHeader}>Check Out Date</Text>
//               <Text style={dynamicStyles.tableColHeader}>Check Out Time</Text>
//               <Text style={dynamicStyles.tableColHeader3}>Hrs</Text>
//               <Text style={dynamicStyles.tableColHeader}>Permission (In Hrs)</Text>
//               <Text style={dynamicStyles.tableColHeaderLast}>Status</Text>
//             </View>

//             {/* Table Body */}
//             {pageData.map((row, rowIndex) => {
//               const isLast = rowIndex === pageData.length - 1;
//               return (
//                 <View
//                   key={rowIndex}
//                   style={isLast ? styles.tableRowLast : styles.tableRow}
//                 >
//                   <Text style={styles.tableCol1}>{row.SLNO}</Text>
//                   {includeName && (
//                     <Text style={styles.tableCol2}>{row.Name}</Text>
//                   )}
//                   <Text style={dynamicStyles.tableCol}>
//                     {row.MonthDate}
//                   </Text>
//                   <Text style={dynamicStyles.tableCol}>
//                     {row.EmployeeCheckInTime}
//                   </Text>
//                   <Text style={dynamicStyles.tableCol}>
//                     {row.EmployeeCheckOutDate}
//                   </Text>
//                   <Text style={dynamicStyles.tableCol}>
//                     {row.EmployeeCheckOutTime}
//                   </Text>
//                   <Text style={dynamicStyles.tableCol3}>
//                     {row.NumberOfHoursWorked}
//                   </Text>
//                   <Text style={dynamicStyles.tableCol}>
//                     {row.PermissionHours}
//                   </Text>
//                   <Text style={dynamicStyles.tableColLast}>
//                     {row.Status}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>

//           {/* Footer */}
//           <View
//             fixed
//             style={{
//               position: "absolute",
//               bottom: 10,
//               left: 0,
//               right: 0,
//               textAlign: "center",
//               fontSize: 10,
//             }}
//           >
//             <Text
//               render={({ pageNumber, totalPages }) =>
//                 `Page ${pageNumber} / ${totalPages}`
//               }
//             />
//           </View>

//         </Page>
//       ))}
//     </Document>
//   );
// };

// export default AttendancePDF;
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

// ===================== STYLES =====================
const styles = StyleSheet.create({
  page: {
    paddingTop: 80,
    paddingBottom: 70,
    paddingHorizontal: 20,
    fontSize: 9,
  },

  /* HEADER */
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

  headerContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  headerText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
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
  footerImage: {
    width: "100%",
    height: 100,
    objectFit: "cover",
  },

  pageNumber: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
  },

  /* TABLE */
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },

  /* HEADERS */
  tableColHeader: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 3,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    textAlign: "center",
  },
  tableColHeaderLast: {
    padding: 3,
    fontWeight: "bold",
    backgroundColor: "#EEE",
    textAlign: "center",
  },

  /* BODY */
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 3,
    textAlign: "center",
  },
  tableColLast: {
    padding: 3,
    textAlign: "left",
  },
  // For attendance summary css
  summaryContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#000",
  },
  summaryRow: {
    flexDirection: "row",
  },
  summaryHeaderCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: "#EEE",
  },
  summaryValueCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "right",
    borderRightWidth: 1,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 6,
  },

  prmText: {
    width: "100%",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
  },
});

// ===================== PAGINATION =====================
const paginateData = (data) => {
  const firstPage = data.slice(0, 31);
  const otherPages = [];
  for (let i = 31; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }
  return [firstPage, ...otherPages];
};

// ===================== COMPONENT =====================
const AttendancePDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);
  const isSelf = filters.Self === "Y";
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const totalPresent = data.filter(r => r.Status === "Present").length;
  const totalAbsent = data.filter(r => r.Status === "Absent").length;
  const totalHolidays = data.filter(r => r.Status === "Holiday").length;
  const totalWeekOffs = data.filter(r => r.Status === "Week Off").length;
const totalPermission = data.filter(r => r.PermissionHours).length;

  // Leave segregation (example)
  const leaveSummary = {
    CL: data.filter(r => r.Status === "Casual Leave").length,
    SL: data.filter(r => r.Status === "Sick leave").length,
    EL: data.filter(r => r.Status === "Medical Leave").length,
  };
  return (
    <Document>
      {pages.map((pageData, pageIndex) => {
        const filteredRows = pageData.filter(
          row => row.Status !== "Week Off" && row.Status !== "Leave"
        );

        return (
          <Page size="A4" style={styles.page} key={pageIndex}>
            {/* HEADER */}
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
                  {/* {`Attendance Report - ${filters.employee} (${monthNames[filters.month - 1]} - ${filters.year})`} */}
                  {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
                  {/* {filters.Self === "Y"
                    ? `Attendance Report - ${filters.employee}`
                    : `Attendance Report - Reporting to ${filters.employee}`} */}
                </Text>
                <Text style={styles.prmText}>
                  Prm - Permission
                </Text>
              </View>
            )}

            {/* TABLE */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableColHeader, { width: "6%" }]}>SL#</Text>

                <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  In Date
                </Text>
                <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  In Time
                </Text>
                {/* <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  Check Out Date
                </Text> */}
                <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  Out Time
                </Text>
                <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  Hours
                </Text>
                <Text style={[styles.tableColHeader, { width: "15%" }]}>
                  Prm (In Hrs)
                </Text>
                <Text style={[styles.tableColHeaderLast, { width: "19%" }]}>
                  Status
                </Text>
              </View>


              {filteredRows.map((row, i) => (
                <View 
                  style={[
                    styles.tableRow,
                    i === filteredRows.length - 1 && { borderBottomWidth: 0 }
                  ]}
                // style={styles.tableRow}
                >
                  <Text style={[styles.tableCol, { width: "6%" }]}>
                    {i + 1}
                  </Text>

                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.MonthDate}
                  </Text>
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.EmployeeCheckInTime}
                  </Text>
                  {/* <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.EmployeeCheckOutDate}
                  </Text> */}
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.EmployeeCheckOutTime}
                  </Text>
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.NumberOfHoursWorked}
                  </Text>
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {row.PermissionHours}
                  </Text>
                  <Text style={[styles.tableColLast, { width: "19%" }]}>
                    {row.Status}
                  </Text>
                </View>

              ))}
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

            <Text fixed style={styles.pageNumber}>
              Page {pageIndex + 1} of {pages.length}
            </Text>
            {pageIndex === 0 && (
              <View break>

                {/* Attendance Summary Title */}

                <Text style={styles.summaryTitle}>Attendance Total Summary</Text>
                <View style={styles.summaryContainer}>

                  {/* Header Row */}
                  {/* <View style={styles.summaryRow}>
                    <Text style={styles.summaryHeaderCell}>Present</Text>
                    <Text style={styles.summaryHeaderCell}>Absent</Text>
                    <Text style={styles.summaryHeaderCell}>Holidays</Text>
                    <Text style={styles.summaryHeaderCell}>Week Off</Text>
                    <Text style={styles.summaryHeaderCell}>Casual Leave</Text>
                    <Text style={styles.summaryHeaderCell}>Sick Leave</Text>
                    <Text style={styles.summaryHeaderCell}>Medical Leave</Text>
                  </View> */}
       <View style={styles.summaryRow}>
                    {["Present", "Absent", "Holidays", "Week Off", "Casual Leave", "Sick Leave", "Medical Leave", "Permission"]
                      .map((item, index, arr) => (
                        <Text
                          key={index}
                          style={[
                            styles.summaryHeaderCell,
                            index === arr.length - 1 && { borderRightWidth: 0 }
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                  </View>
 
                  {/* Value Row */}
                  {/* <View style={styles.summaryRow}>
                    <Text style={styles.summaryValueCell}>{totalPresent}</Text>
                    <Text style={styles.summaryValueCell}>{totalAbsent}</Text>
                    <Text style={styles.summaryValueCell}>{totalHolidays}</Text>
                    <Text style={styles.summaryValueCell}>{totalWeekOffs}</Text>
                    <Text style={styles.summaryValueCell}>{leaveSummary.CL}</Text>
                    <Text style={styles.summaryValueCell}>{leaveSummary.SL}</Text>
                    <Text style={styles.summaryValueCell}>{leaveSummary.EL}</Text>
                  </View> */}
             
 
                  <View style={styles.summaryRow}>
                    {[totalPresent, totalAbsent, totalHolidays, totalWeekOffs, leaveSummary.CL, leaveSummary.SL, leaveSummary.EL,totalPermission]
                      .map((val, index, arr) => (
                        <Text
                          key={index}
                          style={[
                            styles.summaryValueCell,
                            index === arr.length - 1 && { borderRightWidth: 0 }
                          ]}
                        >
                          {val}
                        </Text>
                      ))}
                  </View>

                </View>
              </View>
            )}
          </Page>

        );
      })}
    </Document>
  );
};

export default AttendancePDF;

