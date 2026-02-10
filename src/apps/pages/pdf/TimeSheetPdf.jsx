// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10,
//   },
//   section: {
//     marginBottom: 10,
//   },
//   headerContainer: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//     marginTop: 20,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
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
//     width: "35px",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableCol1: {
//     width: "35px",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableColHeader: {
//     flex: 1,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableColHeaderDescription: {
//     flex: 2.5,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableColHeaderLast: {
//     flex: 1,
//     padding: 5,
//     fontWeight: "bold",
//     backgroundColor: "#EEE",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableCol: {
//     flex: 1,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableColDescription: {
//     flex: 2.5,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
//   tableColLast: {
//     flex: 1,
//     padding: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
// });

// // Split data: 20 on first page, 26 afterwards
// const paginateData = (data) => {
//   const firstPage = data.slice(0, 20);
//   const otherPages = [];

//   for (let i = 20; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };

// const TimeSheetPDF = ({ data = [], filters = {} }) => {
//   const pages = paginateData(data);

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" style={styles.page} key={pageIndex}>
//           {pageIndex === 0 && (
//             <View style={styles.headerContainer}>
//               <Text style={styles.headerText}>
//                 {`TimeSheet - ${filters.EmployeeID} (${filters.Month} - ${filters.Year})`}
//               </Text>
//             </View>
//           )}

//           {/* Table Header */}
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <Text style={styles.tableColHeader1}>SLNO</Text>
//               <Text style={styles.tableColHeader}>CheckInDate</Text>
//               <Text style={styles.tableColHeader}>Employee</Text>
//               <Text style={styles.tableColHeader}>Project</Text>
//               <Text style={styles.tableColHeader}>Function</Text>
//               <Text style={styles.tableColHeaderDescription}>Description</Text>
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
//                   <Text style={styles.tableCol}>{row.CheckInDate}</Text>
//                   <Text style={styles.tableCol}>{row.EmployeeName}</Text>
//                   <Text style={styles.tableCol}>{row.ProjectName}</Text>
//                   <Text style={styles.tableCol}>{row.FuntionsName}</Text>
//                   <Text style={styles.tableColDescription}>
//                     {row.Description}
//                   </Text>
//                   <Text style={styles.tableColLast}>{row.Status}</Text>
//                 </View>
//               );
//             })}
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );
// };

// export default TimeSheetPDF;


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
  page: {
    padding: 20,
    fontSize: 10,
    paddingTop: 80,
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
  //   tableColHeader1: {
  //     width: "30px",
  //     borderRightWidth: 1,
  //     borderRightColor: "#000",
  //     padding: 5,
  //     fontWeight: "bold",
  //     backgroundColor: "#EEE",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "center",
  //   },
  //   tableCol1: {
  //     width: "30px",
  //     borderRightWidth: 1,
  //     borderRightColor: "#000",
  //     padding: 5,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "right",
  //   },
  //   tableColHeader: {
  //     width: "100px",
  //     flex: 1,
  //     borderRightWidth: 1,
  //     borderRightColor: "#000",
  //     padding: 5,
  //     fontWeight: "bold",
  //     backgroundColor: "#EEE",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "center",
  //   },
  //   tableColHeaderDescription: {
  //     width: "500px",
  //     flex: 2.5,
  //     borderRightWidth: 1,
  //     borderRightColor: "#000",
  //     padding: 5,
  //     fontWeight: "bold",
  //     backgroundColor: "#EEE",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "center",
  //   },

  //   tableCol: {
  //     width: "100px",
  //     flex: 1,
  //     borderRightWidth: 1,
  //     borderRightColor: "#000",
  //     padding: 5,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     textAlign: "left",
  //   },

  //  tableColDescription: {
  //   width: "500px",
  //   flex: 2.5,
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   textAlign: "left",       
  //   alignItems: "flex-start",  
  //   justifyContent: "center",  
  // },

  // tableColHeader1: {
  //   width: "30px", // keep S.No column narrow
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   fontWeight: "bold",
  //   backgroundColor: "#EEE",
  //   textAlign: "center",
  // },
  // tableCol1: {
  //   width: "30px", // keep it narrow
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   textAlign: "right",
  // },
  // tableColHeader: {
  //   flex: 1, // Allow responsive layout
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   fontWeight: "bold",
  //   backgroundColor: "#EEE",
  //   textAlign: "center",
  // },
  // tableColHeaderDescription: {
  //   flex: 2.5, // Give more space to Description
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   fontWeight: "bold",
  //   backgroundColor: "#EEE",
  //   textAlign: "center",
  // },
  // tableCol: {
  //   flex: 1, // Responsive width for general cells
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   textAlign: "left",
  // },
  // tableColDescription: {
  //   flex: 2.5, // Give more space to Description
  //   borderRightWidth: 1,
  //   borderRightColor: "#000",
  //   padding: 5,
  //   textAlign: "left",
  // },
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

 /* FOOTER */
    footerWrapper: {
        position: "absolute",
        bottom: 30,
        left: 5,
        right: 5,     // forces full width
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },

    footerImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
    },
  //   footerWrapper: {
  //   position: "absolute",
  //   bottom: 25,
  //   left: 5,
  //   right: 5,
  //   height: 60,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // footerImage: {
  //   width: "100%",
  //   height: 60,
  //   objectFit: "cover",
  // },

});

// Split data: 20 on first page, 26 afterwards
const paginateData = (data) => {
  const firstPageCount = 13;
  const otherPageCount = 15;

  const pages = [];

  // First page
  pages.push(data.slice(0, firstPageCount));

  // Remaining pages
  for (let i = firstPageCount; i < data.length; i += otherPageCount) {
    pages.push(data.slice(i, i + otherPageCount));
  }

  return pages;
};


//const TimeSheetPDF = ({ data = [], filters = {} }) => {
const TimeSheetPDF = ({ data = [], filters = {}, projectName = "", managerName = "" }) => {
  const pages = paginateData(data);
  pages.forEach((page, i) => {
    console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
  });
  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}-${month}-${year}`;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <Document>

      {pages.map((pageData, pageIndex) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
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

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {`TimeSheet - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
              </Text>
             

              <Text style={styles.subHeaderText}>
                {`Project: ${projectName}`}
              </Text>
              {/* <Text style={styles.subHeaderText}>
             {`Manager: ${managerName}`}
           </Text> */}
              {managerName !== "" && (
                <Text style={styles.subHeaderText}>
                  {`Manager: ${managerName}`}
                </Text>
             )} 
              <Text style={styles.subHeaderText}>
                {"Comp -> Completed ||Appr -> Approved"}
              </Text>
            </View>

          )}
          {/* Table Header */}
          {/* <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>S.No</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Project</Text>
              <Text style={styles.tableColHeaderDescription}>Description</Text>
              <Text style={styles.tableColHeader}>Comp Date</Text>
              <Text style={styles.tableColHeader}>Appr By</Text>
              <Text style={styles.tableColHeader}>Appr Date</Text>
            </View>

           
            {pageData.map((row, rowIndex) => {
              const isLast = rowIndex === pageData.length - 1;
              return (
                <View
                  key={rowIndex}
                  style={isLast ? styles.tableRowLast : styles.tableRow}
                >
                  <Text style={styles.tableCol1}>{rowIndex + 1}</Text>
                  <Text style={styles.tableCol}>{row.DaliytaskCorrectDate}</Text>
                  <Text style={styles.tableCol}>{row.ProjectCode}</Text>
                  <Text style={styles.tableColDescription}>
                    {row.Description}
                  </Text>
                  <Text style={styles.tableCol}>{row.CompletedDate?.split(" ")[0]}</Text>
                  <Text style={styles.tableCol}>{row.ManagerCode}</Text>
                  <Text style={styles.tableCol}>{row.ApprovedDate}</Text>
                </View>
              );
            })}
          </View> */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>S.No</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeaderSmall}>Project</Text>
              <Text style={styles.tableColHeaderDescription}>Description</Text>
              <Text style={styles.tableColHeader}>Comp Date</Text>
              <Text style={styles.tableColHeaderSmall}>Appr By</Text>
              <Text style={styles.tableColHeader}>Appr Date</Text>
            </View>

            {pageData.map((row, rowIndex) => {
              const isLast = rowIndex === pageData.length - 1;
              return (
                <View
                  key={rowIndex}
                  style={isLast ? styles.tableRowLast : styles.tableRow}
                >
                  <Text style={styles.tableCol1}>{rowIndex + 1}</Text>
                  <Text style={styles.tableCol}>{row.DaliytaskCorrectDate}</Text>
                  <Text style={styles.tableColSmall}>{row.ProjectCode}</Text>
                  <Text style={styles.tableColDescription}>{row.Description}</Text>
                  <Text style={styles.tableCol}>{row.CompletedDate?.split(" ")[0]}</Text>
                  <Text style={styles.tableColSmall}>{row.ManagerCode}</Text>
                  <Text style={styles.tableCol}>{row.ApprovedDate}</Text>
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

export default TimeSheetPDF;

