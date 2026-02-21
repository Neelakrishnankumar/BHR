import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,Image
} from "@react-pdf/renderer";


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
  tableColApprDate: {
     width: 70,
    // borderRightWidth: 1,
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
  tablerowApprDate : {
width: 70,
    // borderRightWidth: 1,
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
});


// Split data: 20 on first page, 26 afterwards
// const paginateData = (data) => {
//   const firstPage = data.slice(0, 30);
//   const otherPages = [];

//   for (let i = 30; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };
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
// const paginateData = (data) => {
//   if (!Array.isArray(data)) return [];

//   const pages = [];

//   // First page → 13 rows
//   pages.push(data.slice(0, 13));

//   // Remaining pages → 15 rows each
//   for (let i = 13; i < data.length; i += 15) {
//     pages.push(data.slice(i, i + 15));
//   }

//   return pages;
// };



//const TimeSheetreportpdf = ({ data = [], filters = {} }) => {
const TimeSheetreportpdf = ({ data = [], filters = {}, projectName = "", managerName = "" }) => {
  const pages = paginateData(data);
// const pages = paginateData(data, 13, 15);

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
  console.log(filters.EmployeeID, "EMP");
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
            // <View style={styles.headerContainer}>
            //   <Text style={styles.headerText}>

            //     {`TimeSheet - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
            //   </Text>
            // </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {`Timesheet - ${filters.EmployeeID} (${monthNames[filters.Month - 1]} - ${filters.Year})`}
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
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader1}>SL#</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeaderSmall}>Project</Text>
              <Text style={styles.tableColHeaderDescription}>Description</Text>
              <Text style={styles.tableColHeader}>Comp Date</Text>
              <Text style={styles.tableColHeaderSmall}>Appr By</Text>
              <Text style={styles.tableColApprDate}>Appr Date</Text>
            </View>

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
                  <Text style={styles.tableCol1}>{globalIndex}</Text>
                  {/* <Text style={styles.tableCol1}>{rowIndex + 1}</Text> */}
                  <Text style={styles.tableCol}>{row.Date}</Text>
                  <Text style={styles.tableColSmall}>{row.ProjectCode}</Text>
                  <Text style={styles.tableColDescription}>{row.Description}</Text>
                  <Text style={styles.tableCol}>{row.CompletedDate?.split(" ")[0]}</Text>
                  <Text style={styles.tableColSmall}>{row.ManagerCode}</Text>
                  <Text style={styles.tablerowApprDate}>{row.ApprovedDate}</Text>
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

export default TimeSheetreportpdf;
