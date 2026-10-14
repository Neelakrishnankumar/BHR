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
//    DESIGN TOKENS  (black & white only — no fills anywhere)
// ========================================================= */

// const COLORS = {
//   black: "#000000",
// };

// const BOLD = "Helvetica-Bold";

// /* =========================================================
//    STYLES
// ========================================================= */

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 88,
//     paddingBottom: 82,
//     paddingHorizontal: 20,
//     fontSize: 8,
//     color: COLORS.black,
//   },

//   summaryTableWrapper: {
//     width: "60%",
//   },

//   /* ---------- MASTHEAD ---------- */

//   masthead: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingBottom: 8,
//     borderBottomWidth: 1.5,
//     borderBottomColor: COLORS.black,
//     marginBottom: 12,
//   },

//   mastheadSpacer: { flex: 1 },

//   reportTitle: {
//     flex: 1,
//     fontFamily: BOLD,
//     fontSize: 15,
//     fontWeight: 700,
//     textAlign: "center",
//   },

//   metaBlock: {
//     flex: 1,
//     alignItems: "flex-end",
//   },

//   metaLine: {
//     fontSize: 7,
//     color: COLORS.black,
//     marginBottom: 2,
//   },

//   metaValue: {
//     fontFamily: BOLD,
//     color: COLORS.black,
//     fontWeight: 700,
//   },

//   /* ---------- SECTION TITLE ---------- */

//   sectionTitleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "baseline",
//     marginBottom: 8,
//   },

//   sectionTitleRowSpaced: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "baseline",
//     marginTop: 16,
//     marginBottom: 8,
//   },

//   sectionTitle: {
//     fontFamily: BOLD,
//     fontSize: 12,
//     fontWeight: 700,
//   },

//   /* ---------- SUMMARY STRIP (the 4 boxes) ---------- */

//   summaryStrip: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: COLORS.black,
//     marginBottom: 14,
//   },

//   summaryCell: {
//     flex: 1,
//     padding: 8,
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   summaryCellLast: {
//     flex: 1,
//     padding: 8,
//   },

//   summaryLabel: {
//     fontFamily: BOLD,
//     fontSize: 10,
//     color: COLORS.black,
//     fontWeight: 700,
//     marginBottom: 4,
//     textAlign: "center",
//   },

//   summaryValue: {
//     fontFamily: BOLD,
//     fontSize: 11,
//     fontWeight: 700,
//     textAlign: "right",
//   },

//   /* ---------- TABLE (shared) ----------
//      Full grid: the table owns the left + top border, every cell owns
//      its right border, and every row owns its bottom border. */

//   table: {
//     width: "100%",
//     borderLeftWidth: 1,
//     borderLeftColor: COLORS.black,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.black,
//   },

//   headerRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.black,
//   },

//   headerCell: {
//     fontFamily: BOLD,
//     color: COLORS.black,
//     fontSize: 9.5,
//     fontWeight: 700,
//     padding: 5,
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   dataRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.black,
//   },

//   cell: {
//     fontSize: 7,
//     padding: 5,
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   /* For empty filler cells (e.g. the blank Last Paid cell in the subtotal row) */
//   cellBorder: {
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   cellCenter: {
//     textAlign: "center",
//   },

//   cellNum: {
//     textAlign: "right",
//   },

//   /* Due amounts: no colour any more, so they are simply bold */
//   cellDue: {
//     fontFamily: BOLD,
//     color: COLORS.black,
//     fontWeight: 700,
//   },

//   /* ---------- GROUP DIVIDER (detail table) ----------
//      Month header ("August") or standard/section header
//      ("6th Standard A Sec"), whichever the report is grouped by. */

//   groupRow: {
//     flexDirection: "row",
//     paddingTop: 8,
//     paddingBottom: 4,
//     paddingHorizontal: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.black,
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   groupLabel: {
//     fontFamily: BOLD,
//     fontSize: 11,
//     fontWeight: 700,
//   },

//   /* ---------- SUBTOTAL ROW (detail table only) ---------- */

//   subtotalRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.black,
//   },

//   subtotalLabel: {
//     fontFamily: BOLD,
//     fontSize: 8,
//     fontWeight: 700,
//     color: COLORS.black,
//     padding: 5,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   subtotalValue: {
//     fontFamily: BOLD,
//     fontSize: 8,
//     fontWeight: 700,
//     color: COLORS.black,
//     padding: 5,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   /* ---------- GRAND TOTAL ROW ---------- */

//   grandRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.black,
//   },

//   grandValue: {
//     fontFamily: BOLD,
//     fontSize: 8.5,
//     fontWeight: 700,
//     color: COLORS.black,
//     padding: 6,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: COLORS.black,
//   },

//   /* ---------- COLUMN WIDTHS: DETAIL TABLE ----------
//      SL# | Invoice# | Date | Employee | Project/Month |
//      Amount | Paid | Due | Last Paid
//      Must sum to 100%. wLabelSpan must equal
//      wSL + wInvoice + wDate + wEmployee + wProject exactly,
//      since the subtotal row merges those five columns into one
//      "Total" label cell. */

//   wSL: { width: "3.5%" },
//   wInvoice: { width: "8.5%" },
//   wDate: { width: "7%" },
//   wEmployee: { width: "20%" },
//   wProject: { width: "24%" },
//   wAmount: { width: "9.5%" },
//   wPaid: { width: "9.5%" },
//   wDue: { width: "9.5%" },
//   wLastPaid: { width: "8.5%" },
//   wLabelSpan: { width: "63%" }, // = 3.5 + 8.5 + 7 + 20 + 24

//   /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
//      SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
//      Totals 100%. */

//   sSL: { width: "5%" },
//   sPrimary: { width: "20%" },
//   sSecondary: { width: "25%" },
//   sInv: { width: "10%" },
//   sAmt: { width: "13%" },
//   sPaid: { width: "13%" },
//   sDue: { width: "14%" },
//   sLabelSpan: { width: "50%" }, // SL + primary + secondary

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
//     color: COLORS.black,
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
//   // "Rs. " +
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

// /* Pulls the leading number out of a standard label so
//    "6th Standard A Sec" and "11th Standard A Sec" sort
//    numerically (6, 11) instead of alphabetically ("11" < "6"). */
// const standardSortKey = (label) => {
//   const match = String(label).match(/(\d+)/);
//   return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
// };

// /* =========================================================
//    GROUPING

//    mode "Month"    -> one group per selected month, dividers
//                       read like "August".
//    mode "Standard" -> one group per class/section, dividers
//                       read like "6th Standard A Sec", sorted
//                       ascending by the leading standard number.
// ========================================================= */

// const buildGroups = (data, mode, selectedMonthNames) => {
//   const selectedMonthNums = selectedMonthNames
//     .map((name) => MONTH_NAMES.indexOf(name) + 1)
//     .filter((n) => n > 0);

//   const filteredData =
//     selectedMonthNums.length > 0
//       ? data.filter((row) => selectedMonthNums.includes(Number(row?.BillableMonth)))
//       : data;

//   if (mode === "Standard") {
//     const byStd = {};
//     filteredData.forEach((row) => {
//       const key = getStandardLabel(row.Project);
//       if (!byStd[key]) byStd[key] = [];
//       byStd[key].push(row);
//     });
//     const labels = Object.keys(byStd).sort(
//       (a, b) => standardSortKey(a) - standardSortKey(b)
//     );
//     return labels.length > 0
//       ? labels.map((label) => ({ label, rows: byStd[label] }))
//       : [{ label: null, rows: filteredData }];
//   }

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

// // Rough "row slot" cost of appending the Summary block (section
// // title + summary header row + Grand Total row) onto the tail of
// // the last detail page. Bump it up if Summary ever visibly overflows
// // the last detail page.
// const SUMMARY_RESERVE_SLOTS = 3;

// const buildEntries = (groups) => {
//   const entries = [];
//   let totalInvoices = 0;
//   let grandAmount = 0;
//   let grandPaid = 0;
//   let grandDue = 0;

//   groups.forEach((group) => {
//     if (group.label) {
//       entries.push({ type: "group", label: group.label });
//     }

//     let groupSerial = 1; // SL# restarts at 1 for every group section
//     let mAmount = 0;
//     let mPaid = 0;
//     let mDue = 0;

//     group.rows.forEach((row) => {
//       mAmount += Number(row.TotalAmount || 0);
//       mPaid += Number(row.PaidAmount || 0);
//       mDue += Number(row.Due || 0);
//       entries.push({ type: "row", row, serial: groupSerial++ });
//       totalInvoices += 1;
//     });

//     if (group.label) {
//       entries.push({ type: "subtotal", label: group.label, mAmount, mPaid, mDue });
//     }

//     grandAmount += mAmount;
//     grandPaid += mPaid;
//     grandDue += mDue;
//   });

//   entries.push({ type: "grand", grandAmount, grandPaid, grandDue });

//   return { entries, grandAmount, grandPaid, grandDue, totalInvoices };
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

//    One row per (primary group, secondary breakdown) pair, with a
//    running SL# and one Grand Total at the end.

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
//    SUMMARY TABLE (shared markup, used both when it's appended
//    to the last detail page and when it needs its own page)
// ========================================================= */

// const SummaryTable = ({ flatSummary, summaryPrimaryHeader, summarySecondaryHeader }) => (
//   <View style={styles.table}>
//     <View style={styles.headerRow}>
//       <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
//       <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
//       <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
//       <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Invoices</Text>
//       <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
//       <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
//       <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
//     </View>

//     {flatSummary.rows.map((r, idx) => (
//       <View key={idx} style={styles.dataRow}>
//         <Text style={[styles.cell, styles.sSL, styles.cellCenter]}>{r.sl}</Text>
//         <Text style={[styles.cell, styles.sPrimary]}>{r.primary}</Text>
//         <Text style={[styles.cell, styles.sSecondary]}>{r.secondary}</Text>
//         <Text style={[styles.cell, styles.sInv, styles.cellCenter]}>{r.invoices}</Text>
//         <Text style={[styles.cell, styles.sAmt, styles.cellNum]}>{money(r.amount)}</Text>
//         <Text style={[styles.cell, styles.sPaid, styles.cellNum]}>{money(r.paid)}</Text>
//         <Text
//           style={[
//             styles.cell,
//             styles.sDue,
//             styles.cellNum,
//             r.due > 0 ? styles.cellDue : null,
//           ]}
//         >
//           {money(r.due)}
//         </Text>
//       </View>
//     ))}

//     <View style={styles.grandRow}>
//       <Text style={[styles.grandValue, styles.sLabelSpan]}>Grand Total</Text>
//       <Text style={[styles.grandValue, styles.sInv, styles.cellCenter]}>
//         {flatSummary.grandInvoices}
//       </Text>
//       <Text style={[styles.grandValue, styles.sAmt]}>{money(flatSummary.grandAmount)}</Text>
//       <Text style={[styles.grandValue, styles.sPaid]}>{money(flatSummary.grandPaid)}</Text>
//       <Text style={[styles.grandValue, styles.sDue]}>{money(flatSummary.grandDue)}</Text>
//     </View>
//   </View>
// );

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

//   const modeSuffix = mode === "Standard" ? "Standard Wise" : "Month Wise";
//   const reportTitleText = `Invoice Payment Report (${modeSuffix})`;

//   const selectedMonthNums = Array.isArray(selectedMonths)
//     ? selectedMonths
//         .map((m) => Number(m?.RecordID ?? m))
//         .filter((n) => Number.isFinite(n) && n > 0)
//     : String(selectedMonths || "")
//         .split(",")
//         .map((name) => MONTH_NAMES.indexOf(name.trim()) + 1)
//         .filter((n) => n > 0);

//   const groups = buildGroups(data, mode, selectedMonthNums);

//   const { entries, grandAmount, grandPaid, grandDue, totalInvoices } =
//     buildEntries(groups);
//   const detailPages = paginateEntries(entries);
//   const flatSummary = buildFlatSummary(groups, mode);

//   // Does the Summary block fit in the leftover space on the last
//   // detail page, or does it need its own page?
//   const lastPageCap = detailPages.length <= 1 ? FIRST_PAGE_COUNT : OTHER_PAGE_COUNT;
//   const lastDetailPage = detailPages[detailPages.length - 1] || [];
//   const leftoverOnLastPage = lastPageCap - lastDetailPage.length;
//   const summaryFitsOnLastPage =
//     leftoverOnLastPage >= flatSummary.rows.length + SUMMARY_RESERVE_SLOTS;

//   const generatedDate = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

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
//           selected (Month or Standard/Activities). Summary is
//           appended to the tail of the last detail page when it
//           fits; otherwise it falls back to its own page below.
//       ========================================================= */}
//       {detailPages.map((pageEntries, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         const isLastPage = pageIndex === detailPages.length - 1;

//         return (
//           <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
//             <HeaderImage />

//             {isFirstPage && (
//               <>
//                 <View style={styles.masthead}>
//                   <View style={styles.mastheadSpacer} />
//                   <Text style={styles.reportTitle}>{reportTitleText}</Text>
//                   <View style={styles.metaBlock}>
//                     <Text style={styles.metaLine}>
//                       Generated{"  "}
//                       <Text style={styles.metaValue}>{generatedDate}</Text>
//                     </Text>
//                   </View>
//                 </View>

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
//                     <Text style={styles.summaryValue}>{money(grandPaid)}</Text>
//                   </View>
//                   <View style={styles.summaryCellLast}>
//                     <Text style={styles.summaryLabel}>Total Due</Text>
//                     <Text style={styles.summaryValue}>{money(grandDue)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.sectionTitleRow}>
//                   <Text style={styles.sectionTitle}>Transaction Detail</Text>
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
//                 <Text style={[styles.headerCell, styles.wProject]}>
//                   {mode === "Standard"
//                     ? summarySecondaryHeader
//                     : (headerMap.Project || "Project")}
//                 </Text>
//                 <Text style={[styles.headerCell, styles.wAmount, styles.cellNum]}>Amount</Text>
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
//                   return (
//                     <View key={idx} style={styles.dataRow}>
//                       <Text style={[styles.cell, styles.wSL, styles.cellCenter]}>{entry.serial}</Text>
//                       <Text style={[styles.cell, styles.wInvoice, styles.cellCenter]}>
//                         {row?.InvoiceNo ?? ""}
//                       </Text>
//                       <Text style={[styles.cell, styles.wDate, styles.cellCenter]}>
//                         {row?.Date ?? ""}
//                       </Text>
//                       <Text style={[styles.cell, styles.wEmployee, styles.cellCenter]}>
//                         {row?.EmpCodeName ?? ""}
//                       </Text>
//                       <Text style={[styles.cell, styles.wProject, styles.cellCenter]}>
//                         {mode === "Month" ? (row?.Project ?? "") : row?.BillableMonthYear ?? ""}
//                       </Text>
//                       <Text style={[styles.cell, styles.wAmount, styles.cellNum]}>
//                         {money(row?.TotalAmount)}
//                       </Text>
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
//                       <Text style={[styles.cell, styles.wLastPaid, styles.cellCenter]}>
//                         {row?.LastPaidDate ?? ""}
//                       </Text>
//                     </View>
//                   );
//                 }

//                 if (entry.type === "subtotal") {
//                   return (
//                     <View key={idx} style={styles.subtotalRow}>
//                       <Text style={[styles.subtotalLabel, styles.wLabelSpan]}>Total</Text>
//                       <Text style={[styles.subtotalValue, styles.wAmount]}>{money(entry.mAmount)}</Text>
//                       <Text style={[styles.subtotalValue, styles.wPaid]}>{money(entry.mPaid)}</Text>
//                       <Text style={[styles.subtotalValue, styles.wDue]}>{money(entry.mDue)}</Text>
//                       <View style={[styles.wLastPaid, styles.cellBorder]} />
//                     </View>
//                   );
//                 }

//                 // "grand" entries are intentionally not rendered in the detail table
//                 // (the grand totals appear in the summary boxes / Summary section).
//                 return null;
//               })}
//             </View>

//             {/* Summary continues right here if there's room left on this page */}
//             {isLastPage && summaryFitsOnLastPage && (
//               <>
//                 <View style={styles.sectionTitleRowSpaced}>
//                   <Text style={styles.sectionTitle}>Summary</Text>
//                 </View>
//                 <View style={styles.summaryTableWrapper}>
//                   <SummaryTable
//                     flatSummary={flatSummary}
//                     summaryPrimaryHeader={summaryPrimaryHeader}
//                     summarySecondaryHeader={summarySecondaryHeader}
//                   />
//                 </View>
//               </>
//             )}

//             <PageNumber />
//             <FooterImage />
//           </Page>
//         );
//       })}

//       {/* =========================================================
//           FALLBACK SUMMARY PAGE — only rendered when Summary did
//           NOT fit on the tail of the last detail page above.
//       ========================================================= */}
//       {!summaryFitsOnLastPage && (
//         <Page size="A4" orientation="landscape" style={styles.page}>
//           <HeaderImage />

//           <View style={styles.sectionTitleRow}>
//             <Text style={styles.sectionTitle}>Summary</Text>
//           </View>
//           <View style={styles.summaryTableWrapper}>
//             <SummaryTable
//               flatSummary={flatSummary}
//               summaryPrimaryHeader={summaryPrimaryHeader}
//               summarySecondaryHeader={summarySecondaryHeader}
//             />
//           </View>

//           <PageNumber />
//           <FooterImage />
//         </Page>
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
      {/* <Text style={[styles.grandLabel, styles.sLabelSpan]}>Grand Total</Text> */}
      <Text style={[styles.grandValue, styles.sLabelSpan]}>Grand Total</Text>
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

  // const selectedMonthNames = selectedMonths
  //   ? selectedMonths.split(",").map((m) => m.trim()).filter(Boolean)
  //   : [];
  // const groups = buildGroups(data, mode, selectedMonthNames);

  const selectedMonthNums = Array.isArray(selectedMonths)
  ? selectedMonths
      .map((m) => Number(m?.RecordID ?? m))
      .filter((n) => Number.isFinite(n) && n > 0)
  : String(selectedMonths || "")
      .split(",")
      .map((name) => MONTH_NAMES.indexOf(name.trim()) + 1)
      .filter((n) => n > 0);

const groups = buildGroups(data, mode, selectedMonthNums);

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
                      <Text style={[styles.subtotalLabel, styles.wProject, styles.cellNum]}>Total</Text>
                      {/* <Text style={[styles.subtotalLabel, styles.wProject, styles.cellCenter]}>Total</Text> */}
                     <Text style={[styles.subtotalValue, styles.wAmount]}>{money(entry.mAmount)}</Text>
                      <Text style={[styles.subtotalValue, styles.wPaid]}>{money(entry.mPaid)}</Text>
                      <Text style={[styles.subtotalValue, styles.wDue]}>{money(entry.mDue)}</Text>
                      <Text style={styles.wLastPaid} />
                    </View>
                  );
                }

                // if (entry.type === "grand") {
                //   return (
                //     <View key={idx} style={styles.grandRow}>
                //       <Text style={styles.wLabelSpanNoProject} />
                //       <Text style={[styles.grandLabel, styles.wProject, styles.cellNum]}>Grand Total</Text>
                //       {/* <Text style={[styles.grandLabel, styles.wProject, styles.cellCenter]}>Grand Total</Text> */}
                //       <Text style={[styles.grandValue, styles.wAmount]}>{money(entry.grandAmount)}</Text>
                //       <Text style={[styles.grandValue, styles.wPaid]}>{money(entry.grandPaid)}</Text>
                //       <Text style={[styles.grandValue, styles.wDue]}>{money(entry.grandDue)}</Text>
                //       <Text style={styles.wLastPaid} />
                //     </View>
                //   );
                // }

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