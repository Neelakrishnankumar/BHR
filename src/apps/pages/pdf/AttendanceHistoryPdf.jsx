import React from "react";
import {
  Page, Text, View, Document, StyleSheet, Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 5, fontSize: 6, flexDirection: "column" },
  section: { marginBottom: 10 },
  firstPageSection: { marginTop: 80 },
  locationSection: { marginTop: 10, marginBottom: -2 }, // heading block for a location that starts mid-page (not at the top)
  table: {
    display: "table", width: "100%", borderWidth: 1,
    borderColor: "#000", borderStyle: "solid", borderBottomWidth: 0, borderRightWidth: 0
  },
  tableRow: {
    flexDirection: "row", borderBottomWidth: 1,
    borderBottomColor: "#000", borderBottomStyle: "solid",
  },
  headerCell: { flex: 3, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerCell2: { flex: 1, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  headerText: { fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  locationHeaderText: { fontSize: 11, fontWeight: "bold", textAlign: "left", marginBottom: -2 },
  headerTextsum: { fontSize: 12, fontWeight: "bold", textAlign: "left", marginTop: 4, marginBottom: 2 },
  cell: { flex: 3, padding: 2, textAlign: "left", borderRightWidth: 1, borderColor: "#000" },
  cell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  cell2: { flex: 1, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
  legendContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 6, gap: 10 },
  legendText: { fontSize: 6 },
  headerWrapper: { position: "absolute", top: 10, left: 20, right: 20, height: 60, justifyContent: "center", alignItems: "center" },
  headerImage: { width: "100%", height: 60, objectFit: "contain" },

summaryTableWrapper: { width: "40%" },

sumHeaderCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" }, // SL#
sumHeaderCell:  { flex: 3,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" }, // Employee / Designation
sumHeaderCell2: { flex: 1,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" }, // P / UL / SL / HOL / WO / Total

sumCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
sumCell:  { flex: 3,   padding: 2, textAlign: "left", borderRightWidth: 1, borderColor: "#000" },
sumCell2: { flex: 1,   padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },

});

// ============================================================================
// LAYOUT SAFETY MARGINS
// ----------------------------------------------------------------------------
// The header image is a `fixed` view pinned to the TOP of every page
// (top: 10, height: 60 -> bottom edge sits at y = 70).
// The footer image is a `fixed` view pinned near the BOTTOM of every page
// (bottom: 30, height: footerHeight -> its top edge sits at
//  y = pageHeight - 30 - footerHeight), and the "Page X of Y" text sits
// even lower (bottom: 10).
//
// Because these are absolutely positioned, normal flow content (the grid)
// does NOT automatically avoid them — it will happily render underneath
// and get visually hidden/overlapped unless we reserve that space
// ourselves via padding on the Page.
//
// HEADER_CLEARANCE must stay >= header bottom edge (70). We keep the
// existing 80 used by firstPageSection as that clearance.
// FOOTER_BUFFER is extra breathing room added on top of the dynamic
// footerHeight so the last table row never touches the footer image.
// ============================================================================
const HEADER_CLEARANCE = 80;
const FOOTER_BUFFER = 35; // extra space below the last row, above the footer image

// ============================================================================
// PACKING MODEL
// ----------------------------------------------------------------------------
// Instead of pagination running per-location (which always forces a fresh
// page whenever a new location starts, even if the current page is mostly
// empty), we treat the whole document as ONE continuous stream of rows and
// track how much room is left on the "current" page as we go.
//
// - FULL_PAGE_ROWS is how many data rows fit on a page that has no heading
//   text on it (i.e. it's a pure continuation of a location's table).
// - LOCATION_HEADER_ROWS is how many "row units" the heading block costs,
//   charged only once per location, on whichever page that location's
//   first chunk lands.
//
// NOTE: if you change footerHeight significantly or the fonts/row heights,
// re-tune FULL_PAGE_ROWS against real rendered output so rows never spill
// into the footer-reserved area (see FOOTER_BUFFER above).
//
// IMPORTANT: if FULL_PAGE_ROWS is set too high (more rows than physically
// fit), react-pdf will overflow that page's content onto its OWN
// auto-generated extra page rather than one of ours — and that
// auto-generated page can end up without the intended heading placement,
// since our code never knew that page would exist. Always tune this DOWN
// from real rendered output rather than up; err on the side of fewer rows
// per page. If you see a page break happening earlier or later than this
// constant predicts, that's the signal to adjust it.
// ============================================================================
// Tuned from real rendered output: with this font size / row height /
// footer height, ~20-22 data rows plus one heading comfortably fit on an
// A4 landscape page before the footer-reserved zone. Re-check against your
// own rendered PDF and nudge down further if a page ever looks tight.
const FULL_PAGE_ROWS = 22;
const LOCATION_HEADER_ROWS = 3;

/**
 * Flows a list of {locationName, employees[]} groups into pages, packing
 * a new location onto the current page's remaining space whenever it fits,
 * and only breaking to a new page when there truly isn't room left.
 * Never splits an individual row across pages.
 *
 * Returns: Array<Array<{ locationName, showHeading, rows }>>
 *   - outer array = pages
 *   - inner array = ordered sections placed on that page (usually 1, but
 *     multiple when several locations share a page)
 */
const buildFlowPages = (locationGroups, fullPageRows = FULL_PAGE_ROWS, headerRows = LOCATION_HEADER_ROWS) => {
  const pages = [];
  let currentSections = [];
  let remaining = fullPageRows;

  const pushPage = () => {
    if (currentSections.length > 0) {
      pages.push(currentSections);
    }
    currentSections = [];
    remaining = fullPageRows;
  };

  locationGroups.forEach((group) => {
    let rows = group.employees;
    let isFirstChunk = true; // true only for this location's very first placed chunk (i.e. where heading + legend go)

    while (rows.length > 0) {
      // Heading (report title + "Location: X") and the legend are only
      // drawn on a location's very first chunk — never repeated when that
      // same location's table continues onto a later page. The header
      // IMAGE still renders on every page unconditionally (see
      // renderHeader()); it's only the title/caption/legend text that
      // should appear once, on the true first page for that location.
      const headingCost = isFirstChunk ? headerRows : 0;
      let available = remaining - headingCost;

      // Not enough room left on the current page -> start a fresh page.
      if (available <= 0) {
        pushPage();
        available = remaining - headingCost;
      }

      const take = Math.min(available, rows.length);
      const chunk = rows.slice(0, take);
      rows = rows.slice(take);

      currentSections.push({
        locationName: group.locationName,
        showHeading: isFirstChunk,
        rows: chunk,
      });

      remaining -= (headingCost + take);
      isFirstChunk = false;

      // Page is exactly full and this location still has more rows left
      // -> continue it on a fresh page (no heading/legend there — just the
      // header image and the table continuing straight away).
      if (rows.length > 0) {
        pushPage();
      }
      // If rows.length === 0 but `remaining` > 0, we deliberately do NOT
      // push a page here — the next location (if any) will pack into the
      // leftover space on this same page.
    }
  });

  if (currentSections.length > 0) pages.push(currentSections);
  return pages;
};

// Groups the flat employee list by LocationName, sorts locations A-Z,
// and sorts employees A-Z within each location, renumbering SLNO per location.

//old_design
// const groupByLocationAZ = (data) => {
//   if (!Array.isArray(data)) return [];

//   const groups = {};
//   data.forEach((row) => {
//     const key = row.LocationName || "Unassigned Location";
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(row);
//   });

//   return Object.keys(groups)
//     .sort((a, b) => a.localeCompare(b)) // locations A-Z
//     .map((locationName) => {
//       const sortedEmployees = [...groups[locationName]].sort((a, b) =>
//         (a.Name || "").localeCompare(b.Name || "") // employees A-Z within this location
//       );
//       return {
//         locationName,
//         employees: sortedEmployees.map((row, idx) => ({ ...row, SLNO: idx + 1 })), // SLNO restarts per location
//       };
//     });
// };

//changed by Radhika_7/9/2026
const groupByLocationAZ = (data) => {
  if (!Array.isArray(data)) return [];

  const groups = {};
  const locationOrder = []; // track first-seen order of locations

  data.forEach((row) => {
    const key = row.LocationName || "Unassigned Location";
    if (!groups[key]) {
      groups[key] = [];
      locationOrder.push(key); // preserves the order locations first appear in the data
    }
    groups[key].push(row);
  });

  return locationOrder.map((locationName) => ({
    locationName,
    // No .sort() here — employees stay in the exact order the API returned them,
    // matching whatever SortByFilters (Name/Sortorder/DesignationRank/DateOfJoin)
    // was applied on the screen. Only SLNO is renumbered per location.
    employees: groups[locationName].map((row, idx) => ({ ...row, SLNO: idx + 1 })),
  }));
};

const AttendanceHistoryPDF = ({ data = [], filters = {}, footerHeight = 0 }) => {
  const locationGroups = React.useMemo(() => groupByLocationAZ(data), [data]);

  // Each entry is one PDF page's worth of packed sections.
  const attendancePages = React.useMemo(
    () => buildFlowPages(locationGroups, FULL_PAGE_ROWS, LOCATION_HEADER_ROWS),
    [locationGroups]
  );
  const summaryPages = React.useMemo(
    () => buildFlowPages(locationGroups, FULL_PAGE_ROWS, LOCATION_HEADER_ROWS),
    [locationGroups]
  );

  // Reserve space at the bottom of every page so the grid never renders
  // underneath the fixed footer image / page-number text.
  const pageStyle = [
    styles.page,
    { paddingBottom: (footerHeight || 0) + FOOTER_BUFFER },
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // ✅ Reusable header
  // const renderHeader = () => (
  //   <View fixed style={styles.headerWrapper}>
  //     {filters.HeaderImg && (
  //       <Image
  //         src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
  //         style={styles.headerImage}
  //       />
  //     )}
  //   </View>
  // );

  const renderHeader = () => {
  console.log(
    `${filters.Imageurl}/uploads/images/${filters.HeaderImg}`,
    "find header image"
  );

  return (
    <View fixed style={styles.headerWrapper}>
      {filters.HeaderImg && (
        <Image
          src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
          style={styles.headerImage}
        />
      )}
    </View>
  );
};
  // ✅ Reusable footer
  // NOTE: the page number is rendered with react-pdf's `render` prop, which
  // is evaluated at actual layout time against the REAL rendered pages —
  // not from our own precomputed `pageIndex`/`totalPages` JS values. If a
  // page's real content is taller than our FULL_PAGE_ROWS estimate assumed
  // (e.g. long designation text wraps to 2 lines, a footer/header image is
  // taller than expected, etc.), react-pdf will silently insert its own
  // extra overflow page to fit everything. A hardcoded pageIndex has no way
  // to know that extra page exists, so it prints a stale/wrong number on
  // it. `render={({ pageNumber, totalPages }) => ...}` always reflects
  // what actually got printed, so the number is correct even when our
  // manual row-packing estimate is slightly off.
  const renderFooter = () => (
    <>
      <View fixed style={{
        height: footerHeight, position: "absolute", bottom: 30, left: 5, right: 5,
      }}>
        {filters.FooterImg && (
          <Image
            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
      <View fixed style={{
        position: "absolute", bottom: 10, left: 0, right: 0,
        textAlign: "center", fontSize: 10,
      }}>
        <Text
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </>
  );

  // showTitle controls whether the big report title is drawn.
  // It should only be true ONCE per page (the page's very first section),
  // never again for additional locations packed onto the same page —
  // otherwise "Monthly Attendance Report (...)" repeats per location.
  const renderAttendanceHeading = (locationName, showTitle = true) => (
    <View style={styles.section}>
      {showTitle && (
        <Text style={styles.headerText}>
          {`Monthly Attendance Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
        </Text>
      )}
      <Text style={styles.locationHeaderText}>{`Location: ${locationName}`}</Text>
    </View>
  );

  const renderAttendanceLegend = () => (
    <View style={styles.legendContainer}>
      <Text>{"P -> Present"}</Text>
      <Text>{"UL -> Unscheduled Leave"}</Text>
      <Text>{"SH -> Second Half"}</Text>
      <Text>{"M -> Medical Leave"}</Text>
      <Text>{"HO -> Holiday"}</Text>
      <Text>{"WO -> Week Off"}</Text>
      <Text>{"CL -> Casual Leave"}</Text>
      <Text>{"IR -> IR Regular"}</Text>
    </View>
  );

  const renderAttendanceTable = (rows) => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.headerCell1}>SL#</Text>
        <Text style={styles.headerCell}>Employee</Text>
        <Text style={styles.headerCell}>Designation</Text>
        {[...Array(31)].map((_, i) => (
          <Text key={i} style={styles.headerCell1}>{i + 1}</Text>
        ))}
        <Text style={styles.headerCell2}>P</Text>
        <Text style={styles.headerCell2}>UL</Text>
        <Text style={styles.headerCell2}>SL</Text>
        <Text style={styles.headerCell2}>HOL</Text>
        <Text style={styles.headerCell2}>WO</Text>
        <Text style={styles.headerCell2}>Total</Text>
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          <Text style={styles.cell1}>{row.SLNO}</Text>
          <Text style={styles.cell}>{row.Name}</Text>
          <Text style={styles.cell}>{row.Designation}</Text>
          {[...Array(31)].map((_, i) => (
            <Text key={i} style={styles.cell1}>{row[`Day${i + 1}`]}</Text>
          ))}
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

  const renderSummaryHeading = (locationName, showTitle = true) => (
    <View style={styles.section}>
      {showTitle && (
        <Text style={styles.headerText}>
          {`Summary Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
        </Text>
      )}
      <Text style={styles.locationHeaderText}>{`Location: ${locationName}`}</Text>
    </View>
  );

  const renderSummaryLegend = () => (
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
  );


  const renderSummaryTable = (rows) => (
  <View style={[styles.table, styles.summaryTableWrapper, { marginTop: 5 }]}>
    <View style={styles.tableRow}>
      <Text style={styles.sumHeaderCell1}>SL#</Text>
      <Text style={styles.sumHeaderCell}>Employee</Text>
      <Text style={styles.sumHeaderCell}>Designation</Text>
      <Text style={styles.sumHeaderCell2}>P</Text>
      <Text style={styles.sumHeaderCell2}>UL</Text>
      <Text style={styles.sumHeaderCell2}>SL</Text>
      <Text style={styles.sumHeaderCell2}>HOL</Text>
      <Text style={styles.sumHeaderCell2}>WO</Text>
      <Text style={styles.sumHeaderCell2}>Total</Text>
    </View>
    {rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.tableRow}>
        <Text style={styles.sumCell1}>{row.SLNO}</Text>
        <Text style={styles.sumCell}>{row.Name}</Text>
        <Text style={styles.sumCell}>{row.Designation}</Text>
        <Text style={styles.sumCell2}>{row.Present}</Text>
        <Text style={styles.sumCell2}>{row.UnPaidLeave}</Text>
        <Text style={styles.sumCell2}>{row.PaidLeave}</Text>
        <Text style={styles.sumCell2}>{row.Holidays}</Text>
        <Text style={styles.sumCell2}>{row.Weekoff}</Text>
        <Text style={styles.sumCell2}>{row.Total}</Text>
      </View>
    ))}
  </View>
);

  // const renderSummaryTable = (rows) => (
  //   <View style={[styles.table, { marginTop: 5 }]}>
  //     <View style={styles.tableRow}>
  //       <Text style={styles.headerCell1}>SL#</Text>
  //       <Text style={styles.headerCell}>Employee</Text>
  //       <Text style={styles.headerCell}>Designation</Text>
  //       <Text style={styles.headerCell2}>P</Text>
  //       <Text style={styles.headerCell2}>UL</Text>
  //       <Text style={styles.headerCell2}>SL</Text>
  //       <Text style={styles.headerCell2}>HOL</Text>
  //       <Text style={styles.headerCell2}>WO</Text>
  //       <Text style={styles.headerCell2}>Total</Text>
  //     </View>
  //     {rows.map((row, rowIndex) => (
  //       <View key={rowIndex} style={styles.tableRow}>
  //         <Text style={styles.cell1}>{row.SLNO}</Text>
  //         <Text style={styles.cell}>{row.Name}</Text>
  //         <Text style={styles.cell}>{row.Designation}</Text>
  //         <Text style={styles.cell2}>{row.Present}</Text>
  //         <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
  //         <Text style={styles.cell2}>{row.PaidLeave}</Text>
  //         <Text style={styles.cell2}>{row.Holidays}</Text>
  //         <Text style={styles.cell2}>{row.Weekoff}</Text>
  //         <Text style={styles.cell2}>{row.Total}</Text>
  //       </View>
  //     ))}
  //   </View>
  // );

  return (
    <Document>

      {/* ==================== ATTENDANCE PAGES (packed across locations) ==================== */}
      {attendancePages.map((sections, pageIndex) => {
        const topSection = sections[0];
        return (
          <Page size="A4" orientation="landscape" style={pageStyle} key={`att-${pageIndex}`}>
            {renderHeader()}

            {/* Whatever is first on the page always sits below the fixed
                logo via firstPageSection's marginTop — but the title,
                location caption, and legend are only drawn when this is a
                location's true FIRST chunk. A page that only continues a
                broken table shows just the header image and the table,
                nothing repeated. */}
            <View style={styles.firstPageSection}>
              {topSection.showHeading && (
                <>
                  {renderAttendanceHeading(topSection.locationName, true)}
                  {renderAttendanceLegend()}
                </>
              )}
            </View>

            {sections.map((section, idx) => (
              <View key={idx}>
                {idx > 0 && section.showHeading && (
                  <View style={styles.locationSection}>
                    {/* showTitle=false: the report title already printed once
                        at the top of this page — only show the location line. */}
                    {renderAttendanceHeading(section.locationName, false)}
                  </View>
                )}
                {renderAttendanceTable(section.rows)}
              </View>
            ))}

            {renderFooter()}
          </Page>
        );
      })}

      {/* ==================== SUMMARY PAGES (packed across locations) ==================== */}
      {summaryPages.map((sections, pageIndex) => {
        const topSection = sections[0];
        return (
          <Page size="A4" orientation="landscape" style={pageStyle} key={`sum-${pageIndex}`}>
            {renderHeader()}

            <View style={styles.firstPageSection}>
              {topSection.showHeading && (
                <>
                  {renderSummaryHeading(topSection.locationName, true)}
                  {renderSummaryLegend()}
                </>
              )}
            </View>

            {sections.map((section, idx) => (
              <View key={idx}>
                {idx > 0 && section.showHeading && (
                  <View style={styles.locationSection}>
                    {renderSummaryHeading(section.locationName, false)}
                  </View>
                )}
                {renderSummaryTable(section.rows)}
              </View>
            ))}

            {renderFooter()}
          </Page>
        );
      })}

    </Document>
  );
};

export default AttendanceHistoryPDF;




// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet, Image
// } from "@react-pdf/renderer";


// const styles = StyleSheet.create({
//   page: {
//     padding: 5,
//     fontSize: 6,
//     flexDirection: "column",
//   },
//   // page: {
//   //   paddingTop: 90,   // space for header
//   //   paddingBottom: 80, // space for footer
//   //   paddingHorizontal: 10,
//   //   fontSize: 6,
//   //   flexDirection: "column",
//   // },

//   section: {
//     marginBottom: 10,
//     //  marginTop: 60,
//   },
//   firstPageSection: {
//     //  marginBottom: 10,
//     marginTop: 80, // 👈 extra space only for first page
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//     borderStyle: "solid",
//     borderBottomWidth: 0,
//     borderRightWidth: 0
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     borderBottomStyle: "solid",
//   },
//   headerCell: {
//     flex: 6,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   headerCell1sum: {
// flex: 0.3,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold",
//   },
//   headerCell1: {
//     flex: 0.5,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   headerText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10

//   },
//   headerTextsum: {
//      fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "left",
//     marginTop: 4,
//     marginBottom: 2
//   },
//   headerCell2: {
//     flex: 1,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   cell: {
//     flex: 6,
//     padding: 2,
//     textAlign: 'left',
//     borderRightWidth: 1,
//     borderColor: "#000",
//   },
//   cell1: {
//     flex: 0.5,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   cell2: {
//     flex: 1,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   legendContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 6,
//     gap: 10,
//     //  marginTop: 60,
//   },

//   /* HEADER */
//   headerWrapper: {
//     position: "absolute",
//     top: 10,
//     left: 20,
//     right: 20,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   headerImage: {
//     width: "100%",
//     height: 60,
//     objectFit: "contain",
//   },
//   /* FOOTER */
//   footerWrapper: {
//     position: "absolute",
//     bottom: 30,
//     left: 5,
//     right: 5,
//     height: 80,
//   },

//   footerImage: {
//     width: "100%",
//     height: 100,
//     objectFit: "cover",
//   },


// });

// // const paginateData = (data) => {
// //   if (!Array.isArray(data)) return [];
// //   const firstPage = data.slice(0, 40);
// //   const otherPages = [];

// //   for (let i = 40; i < data.length; i += 26) {
// //     otherPages.push(data.slice(i, i + 26));
// //   }

// //   return [firstPage, ...otherPages];
// // };

// // const paginateData = (data, rowsPerPage = 30) => {
// //   if (!Array.isArray(data)) return [];

// //   const pages = [];
// //   for (let i = 0; i < data.length; i += rowsPerPage) {
// //     pages.push(data.slice(i, i + rowsPerPage));
// //   }

// //   return pages;
// // };

// const paginateData = (
//   data,
//   firstPageRows = 28,
//   otherPageRows = 30
// ) => {
//   if (!Array.isArray(data)) return [];

//   const pages = [];

//   // ✅ First page
//   pages.push(data.slice(0, firstPageRows));

//   // ✅ Remaining pages
//   let index = firstPageRows;
//   while (index < data.length) {
//     pages.push(data.slice(index, index + otherPageRows));
//     index += otherPageRows;
//   }

//   return pages;
// };



// const AttendanceHistoryPDF = ({ data = [], filters = {}, footerHeight }) => {
//   // const pages = paginateData(data);
//   const pages = paginateData(data, 28, 30);

//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
// //summary 
// // Add this alongside your existing paginateData function
// const paginateSummary = (data, rowsPerPage = 23) => {
//   if (!Array.isArray(data)) return [];
//   const pages = [];
//   for (let i = 0; i < data.length; i += rowsPerPage) {
//     pages.push(data.slice(i, i + rowsPerPage));
//   }
//   return pages;
// };
//  const summaryPages = paginateSummary(data, 23); // 👈 compute once





//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
//           {/* HEADER */}
//           <View fixed style={styles.headerWrapper}>
//             {filters.HeaderImg && (
//               <Image
//                 src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                 style={styles.headerImage}
//               />
//             )}
//           </View>

//           {pageIndex === 0 && (
//             <View
//               // style={styles.section}
//               style={[
//                 styles.section,
//                 pageIndex === 0 && styles.firstPageSection
//               ]}
//             >
//               {/* <Text style={{ fontSize: 10, marginBottom: 4 }}>Attendance Report</Text>
//               <Text>Month: {monthNames[filters.Month - 1]}</Text>
//               <Text>Year: {filters.Year}</Text> */}
//               <Text style={styles.headerText}>
//                 {`Monthly Attendance Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//               </Text>
//             </View>
//           )}
//           <View style={[styles.legendContainer,
//           pageIndex !== 0 && styles.firstPageSection,
//             //  pageIndex === pages.length - 1 && { marginTop: 100 }
//           ]}


//           >
//             <Text style={styles.legendText}>{"P -> Present"}</Text>
//             <Text style={styles.legendText}>{"UL -> Unscheduled Leave"}</Text>
//             <Text style={styles.legendText}>{"SH -> Second Half"}</Text>
//             <Text style={styles.legendText}>{"M -> Medical Leave"}</Text>
//             <Text style={styles.legendText}>{"HO -> Holiday"}</Text>
//             <Text style={styles.legendText}>{"WO -> Week Off"}</Text>
//             <Text style={styles.legendText}>{"CL -> Casual Leave"}</Text>
//             <Text style={styles.legendText}>{"IR -> IR Regular"}</Text>
//           </View>
//           <View style={styles.table}>
//             {/* Header Row */}
//             <View style={styles.tableRow}>
//               <Text style={styles.headerCell1}>SL#</Text>
//               <Text style={styles.headerCell}>EMPLOYEE</Text>
//               <Text style={styles.headerCell1}>1</Text>
//               <Text style={styles.headerCell1}>2</Text>
//               <Text style={styles.headerCell1}>3</Text>
//               <Text style={styles.headerCell1}>4</Text>
//               <Text style={styles.headerCell1}>5</Text>
//               <Text style={styles.headerCell1}>6</Text>
//               <Text style={styles.headerCell1}>7</Text>
//               <Text style={styles.headerCell1}>8</Text>
//               <Text style={styles.headerCell1}>9</Text>
//               <Text style={styles.headerCell1}>10</Text>
//               <Text style={styles.headerCell1}>11</Text>
//               <Text style={styles.headerCell1}>12</Text>
//               <Text style={styles.headerCell1}>13</Text>
//               <Text style={styles.headerCell1}>14</Text>
//               <Text style={styles.headerCell1}>15</Text>
//               <Text style={styles.headerCell1}>16</Text>
//               <Text style={styles.headerCell1}>17</Text>
//               <Text style={styles.headerCell1}>18</Text>
//               <Text style={styles.headerCell1}>19</Text>
//               <Text style={styles.headerCell1}>20</Text>
//               <Text style={styles.headerCell1}>21</Text>
//               <Text style={styles.headerCell1}>22</Text>
//               <Text style={styles.headerCell1}>23</Text>
//               <Text style={styles.headerCell1}>24</Text>
//               <Text style={styles.headerCell1}>25</Text>
//               <Text style={styles.headerCell1}>26</Text>
//               <Text style={styles.headerCell1}>27</Text>
//               <Text style={styles.headerCell1}>28</Text>
//               <Text style={styles.headerCell1}>29</Text>
//               <Text style={styles.headerCell1}>30</Text>
//               <Text style={styles.headerCell1}>31</Text>
//               {/* <Text style={styles.headerCell}>Present</Text>
//       <Text style={styles.headerCell}>Leave</Text>
//       <Text style={styles.headerCell}>UNPAIDLEAVE</Text>
//       <Text style={styles.headerCell}>Absent</Text>
//       <Text style={styles.headerCell}>IRREGULAR</Text>
//       <Text style={styles.headerCell}>HOLIDAYS</Text>
//       <Text style={styles.headerCell}>Weekoff</Text> */}
//               <Text style={styles.headerCell2}>P</Text>
//               {/* <Text style={styles.headerCell2}>L</Text> */}
//               <Text style={styles.headerCell2}>UL</Text>
//               <Text style={styles.headerCell2}>SL</Text>
//               {/* <Text style={styles.headerCell2}>IR</Text> */}
//               <Text style={styles.headerCell2}>HOL</Text>
//               <Text style={styles.headerCell2}>WO</Text>
//               <Text style={styles.headerCell2}>Total</Text>
//             </View>

//             {/* Table Body */}
//             {pageData.map((row, rowIndex) => (
//               <View key={rowIndex} style={styles.tableRow}>
//                 <Text style={styles.cell1}>{row.SLNO}</Text>
//                 <Text style={styles.cell}>{row.Name}</Text>
//                 <Text style={styles.cell1}>{row.Day1}</Text>
//                 <Text style={styles.cell1}>{row.Day2}</Text>
//                 <Text style={styles.cell1}>{row.Day3}</Text>
//                 <Text style={styles.cell1}>{row.Day4}</Text>
//                 <Text style={styles.cell1}>{row.Day5}</Text>
//                 <Text style={styles.cell1}>{row.Day6}</Text>
//                 <Text style={styles.cell1}>{row.Day7}</Text>
//                 <Text style={styles.cell1}>{row.Day8}</Text>
//                 <Text style={styles.cell1}>{row.Day9}</Text>
//                 <Text style={styles.cell1}>{row.Day10}</Text>
//                 <Text style={styles.cell1}>{row.Day11}</Text>
//                 <Text style={styles.cell1}>{row.Day12}</Text>
//                 <Text style={styles.cell1}>{row.Day13}</Text>
//                 <Text style={styles.cell1}>{row.Day14}</Text>
//                 <Text style={styles.cell1}>{row.Day15}</Text>
//                 <Text style={styles.cell1}>{row.Day16}</Text>
//                 <Text style={styles.cell1}>{row.Day17}</Text>
//                 <Text style={styles.cell1}>{row.Day18}</Text>
//                 <Text style={styles.cell1}>{row.Day19}</Text>
//                 <Text style={styles.cell1}>{row.Day20}</Text>
//                 <Text style={styles.cell1}>{row.Day21}</Text>
//                 <Text style={styles.cell1}>{row.Day22}</Text>
//                 <Text style={styles.cell1}>{row.Day23}</Text>
//                 <Text style={styles.cell1}>{row.Day24}</Text>
//                 <Text style={styles.cell1}>{row.Day25}</Text>
//                 <Text style={styles.cell1}>{row.Day26}</Text>
//                 <Text style={styles.cell1}>{row.Day27}</Text>
//                 <Text style={styles.cell1}>{row.Day28}</Text>
//                 <Text style={styles.cell1}>{row.Day29}</Text>
//                 <Text style={styles.cell1}>{row.Day30}</Text>
//                 <Text style={styles.cell1}>{row.Day31}</Text>
//                 <Text style={styles.cell2}>{row.Present}</Text>
//                 {/* <Text style={styles.cell2}>{row.Leave}</Text> */}
//                 <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
//                 <Text style={styles.cell2}>{row.PaidLeave}</Text>
//                 {/* <Text style={styles.cell2}>{row.IRREGULAR}</Text> */}
//                 <Text style={styles.cell2}>{row.Holidays}</Text>
//                 <Text style={styles.cell2}>{row.Weekoff}</Text>
//                 <Text style={styles.cell2}>{row.Total}</Text>
//               </View>
//             ))}
//  </View>

//   {/* --- Summary table --- */}
//   {pageIndex === pages.length - 1 && (
//     <>
//      <View>
//       <Text style={styles.headerTextsum}>
//         Summary Report
//       </Text>
//     </View>
//           <View style={[styles.table, { marginTop: 5 }]}>
           
//             <View style={styles.tableRow}>
//               <Text style={styles.headerCell1}>SL#</Text>
//               <Text style={styles.headerCell}>EMPLOYEE</Text>
//               <Text style={styles.headerCell2}>P</Text>
//               <Text style={styles.headerCell2}>UL</Text>
//               <Text style={styles.headerCell2}>SL</Text>
//               <Text style={styles.headerCell2}>HOL</Text>
//               <Text style={styles.headerCell2}>WO</Text>
//               <Text style={styles.headerCell2}>Total</Text>
//             </View>

//             {(data, 23).slice(1).map((row, rowIndex) => (
//               <View key={rowIndex} style={styles.tableRow}>
//                 <Text style={styles.cell1}>{row.SLNO}</Text>
//                 <Text style={styles.cell}>{row.Name}</Text>
//                 <Text style={styles.cell2}>{row.Present}</Text>
//                 <Text style={styles.cell2}>{row.UnPaidLeave}</Text>
//                 <Text style={styles.cell2}>{row.PaidLeave}</Text>
//                 <Text style={styles.cell2}>{row.Holidays}</Text>
//                 <Text style={styles.cell2}>{row.Weekoff}</Text>
//                 <Text style={styles.cell2}>{row.Total}</Text>
//               </View>
//             ))}
//           </View>
//           </>
//  )}

   





          

//           {/* FOOTER */}
//           <View fixed
//             // style={styles.footerWrapper}
//             style={{
//               height: footerHeight, // 🔥 dynamic
//               position: "absolute",
//               bottom: 30,
//               left: 5,
//               right: 5,
//             }}
//           >
//             {filters.FooterImg && (
//               <Image
//                 src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                 // style={styles.footerImage}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             )}
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

// export default AttendanceHistoryPDF;

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
//   headerCell: { flex: 3, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerCell1: { flex: 0.5, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerCell2: { flex: 1, padding: 2, backgroundColor: "#eee", textAlign: "center", borderRightWidth: 1, borderColor: "#000", fontWeight: "bold" },
//   headerText: { fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   headerTextsum: { fontSize: 12, fontWeight: "bold", textAlign: "left", marginTop: 4, marginBottom: 2 },
//   cell: { flex: 3, padding: 2, textAlign: "left", borderRightWidth: 1, borderColor: "#000" },
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
// const paginateSummary = (data, rowsPerPage = 28) => {
//   if (!Array.isArray(data)) return [];
//   const pages = [];
//   for (let i = 0; i < data.length; i += rowsPerPage) {
//     pages.push(data.slice(i, i + rowsPerPage));
//   }
//   return pages;
// };

// const AttendanceHistoryPDF = ({ data = [], filters = {}, footerHeight }) => {
//   const pages = paginateData(data, 28, 30);
//   const summaryPages = paginateSummary(data, 28);

//   // ✅ FIXED: attendance pages + ALL summary pages (each on its own page)
//   const totalPages = pages.length + summaryPages.length;

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

//   // ✅ Reusable summary table
//   const renderSummaryTable = (rows) => (
//     <View style={[styles.table, { marginTop: 5 }]}>
//       <View style={styles.tableRow}>
//         <Text style={styles.headerCell1}>SL#</Text>
//         <Text style={styles.headerCell}>Employee</Text>
//         <Text style={styles.headerCell}>Designation</Text>
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
//             <Text style={styles.cell}>{row.Designation}</Text>
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

//       {/* ==================== ATTENDANCE PAGES ==================== */}
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={`att-${pageIndex}`}>
//           {renderHeader()}

//           {/* Title — first page only */}
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

//           {/* Attendance Table — NO summary here anymore */}
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <Text style={styles.headerCell1}>SL#</Text>
//               <Text style={styles.headerCell}>Employee</Text>
//               <Text style={styles.headerCell}>Designation</Text>
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
//                 <Text style={styles.cell}>{row.Designation}</Text>
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
//           </View>

//           {renderFooter(pageIndex + 1)}
//         </Page>
//       ))}

//       {/* ==================== SUMMARY PAGES (all of them, each on a new page) ==================== */}
//       {summaryPages.map((summaryPageData, i) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={`sum-${i}`}>
//           {renderHeader()}

//           <View style={styles.firstPageSection}>
//             <Text style={styles.headerText}>
//               {`Summary Report (${monthNames[filters.Month - 1]} - ${filters.Year})`}
//             </Text>
//           </View>
          
//     {/* Legends */}
//           <View style={styles.legendContainer}>
//             <Text style={styles.legendText}>{"P -> Present"}</Text>
//             <Text style={styles.legendText}>{"SH -> Second Half"}</Text>
//             <Text style={styles.legendText}>{"CL -> Casual Leave"}</Text>
//             <Text style={styles.legendText}>{"M -> Medical Leave"}</Text>
//             <Text style={styles.legendText}>{"UL -> Unscheduled Leave"}</Text>
//             <Text style={styles.legendText}>{"HO -> Holiday"}</Text>
//             <Text style={styles.legendText}>{"WO -> Week Off"}</Text>
//             <Text style={styles.legendText}>{"IR -> IR Regular"}</Text>
//           </View>

//           {renderSummaryTable(summaryPageData)}

//           {renderFooter(pages.length + i + 1)}
//         </Page>
//       ))}

//     </Document>
//   );
// };

// export default AttendanceHistoryPDF;
//=========================================RECENT LAST CODE FOR CORRECTED SNIP=============================
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

// const AttendanceHistoryPDF = ({ data = [], filters = {}, footerHeight }) => {
//   const pages = paginateData(data, 28, 30);
//   const summaryPages = paginateSummary(data, 23); // ✅ computed once here
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
//           <View style={styles.table}>
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
//           </View>

//           {/* ✅ First 23 summary rows on LAST attendance page */}
//           {pageIndex === pages.length - 1 && summaryPages.length > 0 && (
//             <>
//               <View>
//                 <Text style={styles.headerTextsum}>Summary Report</Text>
//               </View>
//               {renderSummaryTable(summaryPages[0])}
//             </>
//           )}

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

// export default AttendanceHistoryPDF;

// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
// } from "@react-pdf/renderer";


// const styles = StyleSheet.create({
//   page: {
//     padding: 5,
//     fontSize: 6,
//     flexDirection: "column",
//   },
//   section: {
//     marginBottom: 10,
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
//   headerCell: {
//     flex: 1,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   headerCell1 : {
//     flex: 0.5,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
//   cell: {
//     flex: 1,
//     padding: 2,
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//   },
//   cell1 : {
//     flex: 0.5,
//     padding: 2,
//     backgroundColor: "#eee",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     fontWeight: "bold", // BOLD header text
//   },
// });

// const paginateData = (data) => {
//   if (!Array.isArray(data)) return [];
//   const firstPage = data.slice(0, 20);
//   const otherPages = [];

//   for (let i = 20; i < data.length; i += 26) {
//     otherPages.push(data.slice(i, i + 26));
//   }

//   return [firstPage, ...otherPages];
// };

// const AttendanceHistoryPDF = ({ data = [], filters = {} }) => {
//   const pages = paginateData(data);

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => (
//         <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
//           {pageIndex === 0 && (
//             <View style={styles.section}>
//               <Text style={{ fontSize: 10, marginBottom: 4 }}>Attendance Report</Text>
//               <Text>Month: {filters.Month}</Text>
//               <Text>Year: {filters.Year}</Text>
//             </View>
//           )}
// <View style={styles.table}>
//   {/* Header Row */}
//   <View style={styles.tableRow}>
//     <Text style={styles.headerCell1}>SL.NO</Text>
//     <Text style={styles.headerCell}>EMPLOYEE</Text>
//     <Text style={styles.headerCell1}>1</Text>
//     <Text style={styles.headerCell1}>2</Text>
// <Text style={styles.headerCell1}>3</Text>
// <Text style={styles.headerCell1}>4</Text>
// <Text style={styles.headerCell1}>5</Text>
// <Text style={styles.headerCell1}>6</Text>
// <Text style={styles.headerCell1}>7</Text>
// <Text style={styles.headerCell1}>8</Text>
// <Text style={styles.headerCell1}>9</Text>
// <Text style={styles.headerCell1}>10</Text>
// <Text style={styles.headerCell1}>11</Text>
// <Text style={styles.headerCell1}>12</Text>
// <Text style={styles.headerCell1}>13</Text>
// <Text style={styles.headerCell1}>14</Text>
// <Text style={styles.headerCell1}>15</Text>
// <Text style={styles.headerCell1}>16</Text>
// <Text style={styles.headerCell1}>17</Text>
// <Text style={styles.headerCell1}>18</Text>
// <Text style={styles.headerCell1}>19</Text>
// <Text style={styles.headerCell1}>20</Text>
// <Text style={styles.headerCell1}>21</Text>
// <Text style={styles.headerCell1}>22</Text>
// <Text style={styles.headerCell1}>23</Text>
// <Text style={styles.headerCell1}>24</Text>
// <Text style={styles.headerCell1}>25</Text>
// <Text style={styles.headerCell1}>26</Text>
// <Text style={styles.headerCell1}>27</Text>
// <Text style={styles.headerCell1}>28</Text>
// <Text style={styles.headerCell1}>29</Text>
// <Text style={styles.headerCell1}>30</Text>
// <Text style={styles.headerCell1}>31</Text>
//        <Text style={styles.headerCell}>Present</Text>
//       <Text style={styles.headerCell}>Leave</Text>
//       <Text style={styles.headerCell}>UNPAIDLEAVE</Text>
//       <Text style={styles.headerCell}>Absent</Text>
//       <Text style={styles.headerCell}>IRREGULAR</Text>
//       <Text style={styles.headerCell}>HOLIDAYS</Text>
//       <Text style={styles.headerCell}>Weekoff</Text>
//       <Text style={styles.headerCell}>Total</Text>
//   </View>

//   {/* Table Body */}
//   {pageData.map((row, rowIndex) => (
//     <View key={rowIndex} style={styles.tableRow}>
//       <Text style={styles.cell1}>{row.SLNO}</Text>
//       <Text style={styles.cell}>{row.Name}</Text>
//       <Text style={styles.cell1}>{row.Day1}</Text>
// <Text style={styles.cell1}>{row.Day2}</Text>
// <Text style={styles.cell1}>{row.Day3}</Text>
// <Text style={styles.cell1}>{row.Day4}</Text>
// <Text style={styles.cell1}>{row.Day5}</Text>
// <Text style={styles.cell1}>{row.Day6}</Text>
// <Text style={styles.cell1}>{row.Day7}</Text>
// <Text style={styles.cell1}>{row.Day8}</Text>
// <Text style={styles.cell1}>{row.Day9}</Text>
// <Text style={styles.cell1}>{row.Day10}</Text>
// <Text style={styles.cell1}>{row.Day11}</Text>
// <Text style={styles.cell1}>{row.Day12}</Text>
// <Text style={styles.cell1}>{row.Day13}</Text>
// <Text style={styles.cell1}>{row.Day14}</Text>
// <Text style={styles.cell1}>{row.Day15}</Text>
// <Text style={styles.cell1}>{row.Day16}</Text>
// <Text style={styles.cell1}>{row.Day17}</Text>
// <Text style={styles.cell1}>{row.Day18}</Text>
// <Text style={styles.cell1}>{row.Day19}</Text>
// <Text style={styles.cell1}>{row.Day20}</Text>
// <Text style={styles.cell1}>{row.Day21}</Text>
// <Text style={styles.cell1}>{row.Day22}</Text>
// <Text style={styles.cell1}>{row.Day23}</Text>
// <Text style={styles.cell1}>{row.Day24}</Text>
// <Text style={styles.cell1}>{row.Day25}</Text>
// <Text style={styles.cell1}>{row.Day26}</Text>
// <Text style={styles.cell1}>{row.Day27}</Text>
// <Text style={styles.cell1}>{row.Day28}</Text>
// <Text style={styles.cell1}>{row.Day29}</Text>
// <Text style={styles.cell1}>{row.Day30}</Text>
// <Text style={styles.cell1}>{row.Day31}</Text>
//       <Text style={styles.cell}>{row.Present}</Text>
//       <Text style={styles.cell}>{row.Leave}</Text>
//       <Text style={styles.cell}>{row.UNPAID_LEAVE}</Text>
//       <Text style={styles.cell}>{row.Absent}</Text>
//       <Text style={styles.cell}>{row.IRREGULAR}</Text>
//       <Text style={styles.cell}>{row.HOLIDAYS}</Text>
//       <Text style={styles.cell}>{row.Weekoff}</Text>
//       <Text style={styles.cell}>{row.Total}</Text>
//     </View>
//   ))}
// </View>

//         </Page>
//       ))}
//     </Document>
//   );
// };

// export default AttendanceHistoryPDF;