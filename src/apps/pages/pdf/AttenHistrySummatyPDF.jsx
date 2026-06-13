// import React from "react";
// import {
//   Page, Text, View, Document, StyleSheet, Image
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 5, fontSize: 6, flexDirection: "column" },
//   section: { marginBottom: 10 },
//   firstPageSection: { marginTop: 80 },
//   table: {
//     display: "table", width: "100%", borderWidth: 1,
//     borderColor: "#000", borderStyle: "solid", borderBottomWidth: 0, borderRightWidth: 0
//   },
//   tableRow: {
//     flexDirection: "row", borderBottomWidth: 1,
//     borderBottomColor: "#000", borderBottomStyle: "solid",
//   },
//   headerCell: { flex: 6, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerCell2: { flex: 1, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerText: { fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   headerTextsum: { fontSize: 12, fontWeight: "bold", textAlign: "left", marginTop: 4, marginBottom: 2 },
//   cell: { flex: 6, padding: 2, textAlign: "left", borderRightWidth: 1, borderColor: "#000" },
//   cell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   cell2: { flex: 1, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   legendContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 6, gap: 10 },
//   headerWrapper: { position: "absolute", top: 10, left: 20, right: 20, height: 60, justifyContent: "center", alignItems: "center" },
//   headerImage: { width: "100%", height: 60, objectFit: "contain" },
// });

// // ✅ Attendance pagination
// const paginateData = (data, firstPageRows = 28, otherPageRows = 30) => {
//   if (!Array.isArray(data)) return [];
//   const pages = [];
//   pages.push(data.slice(0, firstPageRows));
//   let index = firstPageRows;
//   while (index < data.length) {
//     pages.push(data.slice(index, index + otherPageRows));
//     index += otherPageRows;
//   }
//   return pages;
// };

// // ✅ Summary pagination
// const paginateSummary = (data, rowsPerPage = 23) => {
//   if (!Array.isArray(data)) return [];
//   const pages = [];
//   for (let i = 0; i < data.length; i += rowsPerPage) {
//     pages.push(data.slice(i, i + rowsPerPage));
//   }
//   return pages;
// };

// const AttenHistrySummatyPDF = ({ data = [], filters = {}, footerHeight }) => {
//   const pages = paginateData(data, 28, 30);
//   const summaryPages = paginateSummary(data, 28); // ✅ computed once here
//   const totalPages = pages.length + (summaryPages.length - 1);

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   // ✅ Reusable header
//   const renderHeader = () => (
//     <View fixed style={styles.headerWrapper}>
//       {filters.HeaderImg && (
//         <Image
//           src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//           style={styles.headerImage}
//         />
//       )}
//     </View>
//   );

//   // ✅ Reusable footer
//   const renderFooter = (pageNum) => (
//     <>
//       <View fixed style={{
//         height: footerHeight, position: "absolute", bottom: 30, left: 5, right: 5,
//       }}>
//         {filters.FooterImg && (
//           <Image
//             src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//             style={{ width: "100%", height: "100%" }}
//           />
//         )}
//       </View>
//       <View fixed style={{
//         position: "absolute", bottom: 10, left: 0, right: 0,
//         textAlign: "center", fontSize: 10,
//       }}>
//         <Text>Page {pageNum} of {totalPages}</Text>
//       </View>
//     </>
//   );

//   // ✅ Reusable summary table body
//   const renderSummaryTable = (rows) => (
//     <View style={[styles.table, { marginTop: 5 }]}>
//       <View style={styles.tableRow}>
//         <Text style={styles.headerCell1}>SL#</Text>
//         <Text style={styles.headerCell}>EMPLOYEE</Text>
//         <Text style={styles.headerCell2}>P</Text>
//         <Text style={styles.headerCell2}>UL</Text>
//         <Text style={styles.headerCell2}>SL</Text>
//         <Text style={styles.headerCell2}>HOL</Text>
//         <Text style={styles.headerCell2}>WO</Text>
//         <Text style={styles.headerCell2}>Total</Text>
//       </View>
//       {rows.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.tableRow}>
//           <Text style={styles.cell1}>{row.SLNO}</Text>
//           <Text style={styles.cell}>{row.Name}</Text>
//           <Text style={styles.cell2}>{row.Present}</Text>
//           <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
//           <Text style={styles.cell2}>{row.PaidLeave}</Text>
//           <Text style={styles.cell2}>{row.Holidays}</Text>
//           <Text style={styles.cell2}>{row.Weekoff}</Text>
//           <Text style={styles.cell2}>{row.Total}</Text>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <Document>

//       {/* ✅ ATTENDANCE PAGES */}
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={`att-${pageIndex}`}>
//           {renderHeader()}

//           {/* Title on first page only */}
//           {pageIndex === 0 && (
//             <View style={[styles.section, styles.firstPageSection]}>
//               <Text style={styles.headerText}>
//                 {`Monthly Attendance Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text>
//             </View>
//           )}

//           {/* Legend */}
//           <View style={[styles.legendContainer, pageIndex !== 0 && styles.firstPageSection]}>
//             <Text>{"P -> Present"}</Text>
//             <Text>{"UL -> Unscheduled Leave"}</Text>
//             <Text>{"SH -> Second Half"}</Text>
//             <Text>{"M -> Medical Leave"}</Text>
//             <Text>{"HO -> Holiday"}</Text>
//             <Text>{"WO -> Week Off"}</Text>
//             <Text>{"CL -> Casual Leave"}</Text>
//             <Text>{"IR -> IR Regular"}</Text>
//           </View>

//           {/* Attendance Table */}
//           {/* <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <Text style={styles.headerCell1}>SL#</Text>
//               <Text style={styles.headerCell}>EMPLOYEE</Text>
//               {[...Array(31)].map((_, i) => (
//                 <Text key={i} style={styles.headerCell1}>{i + 1}</Text>
//               ))}
//               <Text style={styles.headerCell2}>P</Text>
//               <Text style={styles.headerCell2}>UL</Text>
//               <Text style={styles.headerCell2}>SL</Text>
//               <Text style={styles.headerCell2}>HOL</Text>
//               <Text style={styles.headerCell2}>WO</Text>
//               <Text style={styles.headerCell2}>Total</Text>
//             </View>
//             {pageData.map((row, rowIndex) => (
//               <View key={rowIndex} style={styles.tableRow}>
//                 <Text style={styles.cell1}>{row.SLNO}</Text>
//                 <Text style={styles.cell}>{row.Name}</Text>
//                 {[...Array(31)].map((_, i) => (
//                   <Text key={i} style={styles.cell1}>{row[`Day${i + 1}`]}</Text>
//                 ))}
//                 <Text style={styles.cell2}>{row.Present}</Text>
//                 <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
//                 <Text style={styles.cell2}>{row.PaidLeave}</Text>
//                 <Text style={styles.cell2}>{row.Holidays}</Text>
//                 <Text style={styles.cell2}>{row.Weekoff}</Text>
//                 <Text style={styles.cell2}>{row.Total}</Text>
//               </View>
//             ))}
//           </View> */}

//           {/* ✅ First 23 summary rows on LAST attendance page */}
//           {/* {summaryPages.length > 0 && ( */}
//             <>
//               <View>
//                 <Text style={styles.headerTextsum}>Summary Report</Text>
//               </View>
//               {renderSummaryTable(summaryPages[0])}
//             </>
//           {/* )} */}

//           {renderFooter(pageIndex + 1)}
//         </Page>
//       ))}

//       {/* ✅ EXTRA SUMMARY PAGES (when employees > 23) */}
//       {summaryPages.slice(1).map((summaryPageData, i) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={`sum-${i}`}>
//           {renderHeader()}

//           <View style={styles.firstPageSection}>
//             <Text style={styles.headerTextsum}>Summary Report</Text>
//           </View>

//           {renderSummaryTable(summaryPageData)}

//           {renderFooter(pages.length + i + 1)}
//         </Page>
//       ))}

//     </Document>
//   );
// };

// export default AttenHistrySummatyPDF;

import React from "react";
import {
  Page, Text, View, Document, StyleSheet, Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 5, fontSize: 6, flexDirection: "column" },
  section: { marginBottom: 10 },
  firstPageSection: { marginTop: 80 },
  table: {
    display: "table", width: "100%", borderWidth: 1,
    borderColor: "#000", borderStyle: "solid", borderBottomWidth: 0, borderRightWidth: 0
  },
  tableRow: {
    flexDirection: "row", borderBottomWidth: 1,
    borderBottomColor: "#000", borderBottomStyle: "solid",
  },
  headerCell:  { flex: 6,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerCell2: { flex: 1,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerText:    { fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  headerTextsum: { fontSize: 10, fontWeight: "bold", textAlign: "left", marginTop: 6, marginBottom: 2 },
  cell:  { flex: 6,   padding: 2, textAlign: "left",   borderRightWidth: 1, borderColor: "#000" },
  cell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  cell2: { flex: 1,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  legendContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4, gap: 8 },
  headerWrapper: { position: "absolute", top: 10, left: 20, right: 20, height: 60, justifyContent: "center", alignItems: "center" },
  headerImage: { width: "100%", height: 60, objectFit: "contain" },
});

// How many summary rows fit on the first page (shared with title + legend)
const SUMMARY_FIRST_PAGE = 23;
const SUMMARY_OTHER_PAGE = 28;

const paginateSummary = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const pages = [];
  // First page: fewer rows because title + legend take space
  pages.push(data.slice(0, SUMMARY_FIRST_PAGE));
  let index = SUMMARY_FIRST_PAGE;
  while (index < data.length) {
    pages.push(data.slice(index, index + SUMMARY_OTHER_PAGE));
    index += SUMMARY_OTHER_PAGE;
  }
  return pages;
};

const AttenHistrySummatyPDF = ({ data = [], filters = {}, footerHeight = 60 }) => {
  const summaryPages = paginateSummary(data);
  const totalPages   = summaryPages.length;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  /* ── shared header ── */
  const renderHeader = () => (
    <View fixed style={styles.headerWrapper}>
      {filters.HeaderImg && (
        <Image
          src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
          style={styles.headerImage}
        />
      )}
    </View>
  );

  /* ── shared footer ── */
  const renderFooter = (pageNum) => (
    <>
      <View fixed style={{
        height: footerHeight, position: "absolute",
        bottom: 30, left: 5, right: 5,
      }}>
        {filters.FooterImg && (
          <Image
            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
      <View fixed style={{
        position: "absolute", bottom: 10,
        left: 0, right: 0, textAlign: "center", fontSize: 10,
      }}>
        <Text>Page {pageNum} of {totalPages}</Text>
      </View>
    </>
  );

  /* ── summary table body ── */
  const renderSummaryTable = (rows) => (
    <View style={styles.table}>
      {/* Header row */}
      <View style={styles.tableRow}>
        <Text style={styles.headerCell1}>SL#</Text>
        <Text style={styles.headerCell}>EMPLOYEE</Text>
        <Text style={styles.headerCell2}>P</Text>
        <Text style={styles.headerCell2}>UL</Text>
        <Text style={styles.headerCell2}>SL</Text>
        <Text style={styles.headerCell2}>HOL</Text>
        <Text style={styles.headerCell2}>WO</Text>
        <Text style={styles.headerCell2}>Total</Text>
      </View>
      {/* Data rows */}
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          <Text style={styles.cell1}>{row.SLNO}</Text>
          <Text style={styles.cell}>{row.Name}</Text>
          <Text style={styles.cell2}>{row.Present}</Text>
          <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
          <Text style={styles.cell2}>{row.PaidLeave}</Text>
          <Text style={styles.cell2}>{row.Holidays}</Text>
          <Text style={styles.cell2}>{row.Weekoff}</Text>
          <Text style={styles.cell2}>{row.Total}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Document>

      {summaryPages.map((pageData, pageIndex) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={`sum-${pageIndex}`}>
          {renderHeader()}

          <View style={styles.firstPageSection}>

            {/* ── Title + legend only on page 1 ── */}
            {pageIndex === 0 && (
              <>
                <Text style={styles.headerText}>
                  {`Monthly Attendance Summary Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
                </Text>
          
              </>
            )}

         <View style={styles.legendContainer}>
                          <Text style={styles.legendText}>{"P -> Present"}</Text>
                          <Text style={styles.legendText}>{"SH -> Second Half"}</Text>
                          <Text style={styles.legendText}>{"CL -> Casual Leave"}</Text>
                          <Text style={styles.legendText}>{"M -> Medical Leave"}</Text>
                          <Text style={styles.legendText}>{"UL -> Unscheduled Leave"}</Text>
                          <Text style={styles.legendText}>{"HO -> Holiday"}</Text>
                          <Text style={styles.legendText}>{"WO -> Week Off"}</Text>
                          <Text style={styles.legendText}>{"IR -> IR Regular"}</Text>
                        </View>

            {/* ── Table rows start immediately ── */}
            {renderSummaryTable(pageData)}

          </View>

          {renderFooter(pageIndex + 1)}
        </Page>
      ))}

    </Document>
  );
};

export default AttenHistrySummatyPDF;

