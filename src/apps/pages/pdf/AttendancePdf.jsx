import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  }, headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
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
 tableColHeader1: {
  width: "10%",               
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
  fontWeight: "bold",
  backgroundColor: "#EEE",
  textAlign: "center",
},
 tableCol1: {
  width: "10%",               
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
  textAlign: "right",
},

tableColHeader: {
  width: "12%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
  fontWeight: "bold",
  backgroundColor: "#EEE",
  textAlign: "center",
},

  tableCol: {
  width: "10%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
},

tableColHeader2: {
  width: "12%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
  fontWeight: "bold",
  backgroundColor: "#EEE",
  textAlign: "center",
},

tableCol2: {
  width: "12%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
},

tableColHeader3: {
  width: "12%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
  fontWeight: "bold",
  backgroundColor: "#EEE",
  textAlign: "center",
},

tableCol3: {
  width: "12%",           
  borderRightWidth: 1,
  borderRightColor: "#000",
  padding: 5,
},

tableColHeaderLast: {
  width: "12%",           
  padding: 5,
  fontWeight: "bold",
  backgroundColor: "#EEE",
  textAlign: "center",
},

tableColLast: {
  width: "12%",           
  padding: 5,
},

});

// Split data: 20 on first page, 26 afterwards
const paginateData = (data) => {
  const firstPage = data.slice(0, 31);
  const otherPages = [];

  for (let i = 31; i < data.length; i += 26) {
    otherPages.push(data.slice(i, i + 26));
  }

  return [firstPage, ...otherPages];
};

// const AttendancePDF = ({ data = [], filters = {} }) => {
//   const pages = paginateData(data);
//   const formattedDate = filters.Date
//     ? filters.Date.split("-").reverse().join("-")
//     : "";
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" style={styles.page} key={pageIndex}>
//           {pageIndex === 0 && (
//             <View style={styles.headerContainer}>
//               {/* <Text style={styles.headerText}>
//           {`Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//           </Text> */}
//               {/* <Text style={styles.headerText}>
//                 {filters.Date
//                   ? `Attendance Report - ${filters.EmployeeID} (${formattedDate})`
//                   : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text> */}
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
//               <Text style={styles.tableColHeader1}>S.No</Text>
//               {filters.Date && (
//                 <Text style={styles.tableColHeader2}>Employee Name</Text>
//               )}
//               <Text style={styles.tableColHeader}>Check In</Text>
//               <Text style={styles.tableColHeader}>Check Out</Text>
//               <Text style={styles.tableColHeader3}>Hrs</Text>
//               <Text style={styles.tableColHeaderLast}>Status</Text>
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
//                    {filters.Date && (
//                   <Text style={styles.tableCol2}>{row.Name}</Text>)}
//                   <Text style={styles.tableCol}>{row.EmplyeeCheckInDateTime}</Text>
//                   <Text style={styles.tableCol}>{row.EmplyeeCheckOutDateTime}</Text>
//                   <Text style={styles.tableCol3}>{row.NumberOfHoursWorked}</Text>
//                   <Text style={styles.tableColLast}>{row.Status}</Text>
//                 </View>
//               );
//             })}
//           </View>
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
//             <Text>Page {pageIndex + 1} of {pages.length}</Text>
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );
// };
const AttendancePDF = ({ data = [], filters = {} }) => {
  const pages = paginateData(data);
  const formattedDate = filters.Date
    ? filters.Date.split("-").reverse().join("-")
    : "";
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const includeName = !!filters.Date;

  // Adjust column widths based on presence of Employee Name column
  const colWidths = includeName
    ? { col: "20%", col3: "10%", last: "15%" } // With Employee Name
    : { col: "30%", col3: "15%", last: "20%" }; // Without Employee Name

  const dynamicStyles = StyleSheet.create({
    tableColHeader: {
      width: colWidths.col,
      borderRightWidth: 1,
      borderRightColor: "#000",
      padding: 5,
      fontWeight: "bold",
      backgroundColor: "#EEE",
      textAlign: "center",
    },
    tableColHeader3: {
      width: colWidths.col3,
      borderRightWidth: 1,
      borderRightColor: "#000",
      padding: 5,
      fontWeight: "bold",
      backgroundColor: "#EEE",
      textAlign: "center",
    },
    tableColHeaderLast: {
      width: colWidths.last,
      padding: 5,
      fontWeight: "bold",
      backgroundColor: "#EEE",
      textAlign: "center",
    },
    tableCol: {
      width: colWidths.col,
      borderRightWidth: 1,
      borderRightColor: "#000",
      padding: 5,
    },
    tableCol3: {
      width: colWidths.col3,
      borderRightWidth: 1,
      borderRightColor: "#000",
      padding: 5,
    },
    tableColLast: {
      width: colWidths.last,
      padding: 5,
    },
  });

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {pageIndex === 0 && (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                {filters.Date
                  ? `Attendance Report - (${formattedDate})`
                  : `Attendance Report - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
              </Text>
            </View>
          )}

          {/* Table Header */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>SL#</Text>
              {includeName && (
                <Text style={styles.tableColHeader2}>Employee Name</Text>
              )}
              <Text style={dynamicStyles.tableColHeader}>Check In Date</Text>
              <Text style={dynamicStyles.tableColHeader}>Check In Time</Text>
              <Text style={dynamicStyles.tableColHeader}>Check Out Date</Text>
              <Text style={dynamicStyles.tableColHeader}>Check Out Time</Text>
              <Text style={dynamicStyles.tableColHeader3}>Hrs</Text>
              <Text style={dynamicStyles.tableColHeader}>Permission (In Hrs)</Text>
              <Text style={dynamicStyles.tableColHeaderLast}>Status</Text>
            </View>

            {/* Table Body */}
            {pageData.map((row, rowIndex) => {
              const isLast = rowIndex === pageData.length - 1;
              return (
                <View
                  key={rowIndex}
                  style={isLast ? styles.tableRowLast : styles.tableRow}
                >
                  <Text style={styles.tableCol1}>{row.SLNO}</Text>
                  {includeName && (
                    <Text style={styles.tableCol2}>{row.Name}</Text>
                  )}
                  <Text style={dynamicStyles.tableCol}>
                    {row.MonthDate}
                  </Text>
                   <Text style={dynamicStyles.tableCol}>
                    {row.EmployeeCheckInTime}
                  </Text>
                  <Text style={dynamicStyles.tableCol}>
                    {row.EmployeeCheckOutDate}
                  </Text>
                  <Text style={dynamicStyles.tableCol}>
                    {row.EmployeeCheckOutTime}
                  </Text>
                  <Text style={dynamicStyles.tableCol3}>
                    {row.NumberOfHoursWorked}
                  </Text>
                   <Text style={dynamicStyles.tableCol}>
                    {row.PermissionHours}
                  </Text>
                  <Text style={dynamicStyles.tableColLast}>
                    {row.Status}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Footer */}
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
            <Text>
              Page {pageIndex + 1} of {pages.length}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default AttendancePDF;
