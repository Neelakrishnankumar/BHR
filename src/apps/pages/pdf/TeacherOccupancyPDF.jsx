// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// // ─── STYLES ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 70,
//     paddingBottom: 70,
//     paddingHorizontal: 20,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     backgroundColor: "#fff",
//   },

//   // ─── Fixed Header Image ───
//   headerWrapper: {
//     position: "absolute",
//     top: 8,
//     left: 0,
//     right: 0,
//     height: 60,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerImage: {
//     width: "100%",
//     height: 60,
//     objectFit: "contain",
//     marginBottom: 12,
//   },

//   // ─── Fixed Footer Image ───
//   footerWrapper: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   footerImage: {
//     width: "100%",
//     height: 55,
//     objectFit: "cover",
//   },

//   // ─── Report Title (first page only) ───
//   reportTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e1e3a",
//     textAlign: "center",
//     marginBottom: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: "#1e1e3a",
//   },

//   // ─── Timetable ───
//   timetableContainer: {
//     marginBottom: 15,
//     border: "1px solid #E2E8F0",
//     borderRadius: 4,
//   },

//   // ─── Teacher Name + "Timetable" title row (spans full width) ───
//   timetableTitleRow: {
//     flexDirection: "row",
//     backgroundColor: "#EEF2FF",
//     // "#1e1e3a",
//     padding: 8,
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//   },
//   timetableTitleText: {
//     fontSize: 11,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   timetableTitleSep: {
//     fontSize: 11,
//     color: "#94A3B8",
//     marginHorizontal: 6,
//   },
//   timetableTitleSub: {
//     fontSize: 10,
//     color: "#000",
//     marginTop: 1,
//   },

//   // ─── Column Header Row ───
//   timetableHeader: {
//     backgroundColor: "#F8FAFC",
//     borderBottomWidth: 2,
//     borderBottomColor: "#1e1e3a",
//   },
//   timetableHeaderCell: {
//     padding: 6,
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#1e1e3a",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderRightColor: "#E2E8F0",
//   },
//   timetableHeaderCellLast: {
//     borderRightWidth: 0,
//   },

//   // ─── Time & Day Cells ───
//   timeCell: {
//     padding: 8,
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#334155",
//     textAlign: "left",
//     borderRightWidth: 1,
//     borderRightColor: "#F1F5F9",
//     width: "12%",
//     minWidth: 80,
//   },
//   dayCell: {
//     padding: 8,
//     fontSize: 9,
//     color: "#475569",
//     textAlign: "center",
//     borderRightWidth: 1,
//     borderRightColor: "#F1F5F9",
//     flex: 1,
//     minHeight: 40,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dayCellLast: { borderRightWidth: 0 },
//   breakCell:   { backgroundColor: "#F1F5F9" },

//   // ─── Subject Cell ───
//   subjectCellBox: {
//     padding: 6,
//     backgroundColor: "#FFFBEB",
//     borderLeftWidth: 3,
//     borderLeftColor: "#F59E0B",
//     borderRadius: 3,
//     fontSize: 8,
//     textAlign: "center",
//   },
//   subjectName:  { fontWeight: "bold", color: "#92400E", marginBottom: 2 },
//   subjectGrade: { fontSize: 8, color: "#F59E0B" },

//   // ─── Summary Page Title ───
//   summaryPageTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e1e3a",
//     marginTop: 8,
//     marginBottom: 6,
//     textAlign: "center",
//     paddingBottom: 10,
//   },

//   // ─── Stat Cards ───
//   overviewCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     gap: 8,
//   },
//   statCard: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: "#F8FAFC",
//     border: "1px solid #E2E8F0",
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   statValue:         { fontSize: 18, fontWeight: "bold", color: "#1e1e3a", marginBottom: 4 },
//   statLabel:         { fontSize: 8, color: "#64748B", textAlign: "center" },
//   statValueOccupied: { color: "#FB923C" },
//   statValueFree:     { color: "#10B981" },

//   // ─── Overall Summary Table ───
//   overallSummaryTable: {
//     marginBottom: 20,
//     border: "1px solid #E2E8F0",
//     borderRadius: 4,
//   },
//   overallSummaryHeaderRow: {
//     flexDirection: "row",
//     backgroundColor: "#EEF2FF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },
//   overallSummaryRow:     { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
//   overallSummaryRowLast: { flexDirection: "row" },
//   overallSummaryRowAlt:  { backgroundColor: "#F8FAFC" },

//   colTeacher:  { width: "28%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
//   colSubjects: { width: "32%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
//   colTotal:    { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
//   colOccupied: { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
//   colFree:     { width: "14%", padding: 8, textAlign: "center" },

//   overallHeaderText:   { fontSize: 9, fontWeight: "bold",textAlign: "center", color: "#000" },
//   overallCellText:     { fontSize: 9, color: "#334155" },
//   overallCellOccupied: { fontSize: 9, color: "#FB923C", fontWeight: "bold" },
//   overallCellFree:     { fontSize: 9, color: "#10B981", fontWeight: "bold" },
//   overallCellTeacher:  { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },

//   // ─── Grand Total Row ───
//   grandTotalRow:      { flexDirection: "row", backgroundColor: "#EEF2FF", borderTopWidth: 1, borderTopColor: "#1e1e3a" },
//   grandTotalText:     { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },
//   grandTotalOccupied: { fontSize: 9, fontWeight: "bold", color: "#FB923C" },
//   grandTotalFree:     { fontSize: 9, fontWeight: "bold", color: "#10B981" },

//   // ─── Subject Breakdown ───
//   subjectBreakdownSection: { marginTop: 20 },
//   subjectBreakdownTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#1e1e3a",
//     marginBottom: 10,
//     paddingBottom: 6,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },
//   teacherSubjectBlock: {
//     marginBottom: 14,
//     padding: 10,
//     backgroundColor: "#F8FAFC",
//     borderRadius: 4,
//     border: "1px solid #E2E8F0",
//   },
//   teacherSubjectBlockName: { fontSize: 10, fontWeight: "bold", color: "#1e1e3a", marginBottom: 6 },
//   subjectTagsRow:          { flexDirection: "row", flexWrap: "wrap" },
//   subjectTag: {
//     backgroundColor: "#EEF2FF",
//     border: "0.5px solid #6366F1",
//     padding: 4,
//     marginRight: 6,
//     marginBottom: 4,
//     borderRadius: 3,
//   },
//   subjectTagText: { fontSize: 8, color: "#3730A3", fontWeight: 600 },

//   sectionLabel: {
//     fontSize: 11,
//     fontWeight: "bold",
//     color: "#1e1e3a",
//     marginBottom: 10,
//     marginTop: 4,
//   },
// });

// // ─── REUSABLE HEADER ─────────────────────────────────────────────────────────
// const PageHeader = ({ filters }) => {
//   if (!filters?.HeaderImg) return null;
//   return (
//     <View fixed style={styles.headerWrapper}>
//       <Image
//         src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//         style={styles.headerImage}
//       />
//     </View>
//   );
// };

// // ─── REUSABLE FOOTER ─────────────────────────────────────────────────────────
// const PageFooter = ({ filters }) => {
//   if (!filters?.FooterImg) return null;
//   return (
//     <View fixed style={styles.footerWrapper}>
//       <Image
//         src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//         style={styles.footerImage}
//       />
//     </View>
//   );
// };

// // ─── TIMETABLE TABLE ──────────────────────────────────────────────────────────
// // teacherName is shown as a full-width title row at the top of the table
// const TeacherTimetableTable = ({ teacher }) => {
//   const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const { timeSlots, BreakSlotsList, schedule, TeacherName } = teacher;

//   const parseTime = (t) => {
//     if (!t) return 0;
//     const parts = t.trim().split(" ");
//     const ampm = parts[1];
//     let [h, m] = parts[0].split(":").map(Number);
//     if (ampm === "PM" && h !== 12) h += 12;
//     if (ampm === "AM" && h === 12) h = 0;
//     return h * 60 + m;
//   };

//   const allSlotKeys = [
//     ...timeSlots,
//     ...BreakSlotsList.map((b) => b.SlotText),
//   ].sort((a, b) => parseTime(a.split(" - ")[0]) - parseTime(b.split(" - ")[0]));

//   const dayMap = {};
//   schedule.forEach((d) => { dayMap[d.day] = d.slots; });

//   const breakTexts = new Set(BreakSlotsList.map((b) => b.SlotText));

//   return (
//     <View style={styles.timetableContainer}>

//       {/* ── Full-width Teacher Name + "Timetable" title row ── */}
//       <View style={styles.timetableTitleRow}>
//         <Text style={styles.timetableTitleText}>{TeacherName}</Text>
//         <Text style={styles.timetableTitleSep}>|</Text>
//         <Text style={styles.timetableTitleSub}>Timetable</Text>
//       </View>

//       {/* ── Column Header Row (Time | Mon | Tue …) ── */}
//       <View style={[styles.timetableHeader, { flexDirection: "row" }]}>
//         <View style={styles.timeCell}>
//           <Text>Time</Text>
//         </View>
//         {DAYS.map((day, idx) => (
//           <View
//             key={day}
//             style={[
//               styles.timetableHeaderCell,
//               idx === DAYS.length - 1 && styles.timetableHeaderCellLast,
//               { flex: 1 },
//             ]}
//           >
//             <Text>{day.slice(0, 3)}</Text>
//           </View>
//         ))}
//       </View>

//       {/* ── Data Rows ── */}
//       {allSlotKeys.map((slotKey) => {
//         const isBreak  = breakTexts.has(slotKey);
//         const [fromTime] = slotKey.split(" - ");
//         const breakInfo  = isBreak
//           ? BreakSlotsList.find((b) => b.SlotText === slotKey)
//           : null;

//         return (
//           <View
//             key={slotKey}
//             style={[
//               { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
//               isBreak && styles.breakCell,
//             ]}
//           >
//             {/* Time Column */}
//             <View style={[styles.timeCell, isBreak && styles.breakCell]}>
//               {isBreak ? (
//                 <>
//                   <Text style={{ fontSize: 8, fontWeight: "bold", marginBottom: 2 }}>
//                     {breakInfo?.SlotName}
//                   </Text>
//                   <Text style={{ fontSize: 8 }}>{fromTime}</Text>
//                 </>
//               ) : (
//                 <Text>{fromTime}</Text>
//               )}
//             </View>

//             {/* Day Cells */}
//             {DAYS.map((day, idx) => {
//               const cellText    = isBreak ? "" : (dayMap[day]?.[slotKey] ?? "");
//               const parts       = cellText
//                 ? cellText.split(/\s*\(\s*|\s*\)/).filter(Boolean)
//                 : [];
//               const subjectPart = parts[0];
//               const gradePart   = parts[1];

//               return (
//                 <View
//                   key={day}
//                   style={[
//                     styles.dayCell,
//                     idx === DAYS.length - 1 && styles.dayCellLast,
//                     isBreak && styles.breakCell,
//                     { flex: 1 },
//                   ]}
//                 >
//                   {!isBreak && cellText && (
//                     <View style={styles.subjectCellBox}>
//                       {gradePart   && <Text style={styles.subjectName}>{gradePart}</Text>}
//                       {subjectPart && <Text style={styles.subjectGrade}>{subjectPart}</Text>}
//                     </View>
//                   )}
//                 </View>
//               );
//             })}
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// // ─── OVERALL SUMMARY PAGE ─────────────────────────────────────────────────────
// const OverallSummaryPage = ({ apiData, filters }) => {
//   const summaries = apiData.Summaries || [];

//   const parseMins = (str = "0h 0m") => {
//     const [hPart, mPart] = str.split("h ");
//     return (parseInt(hPart) || 0) * 60 + (parseInt((mPart || "0m").replace("m", "")) || 0);
//   };
//   const toHM = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

//   const totalOccupied = summaries.reduce((s, r) => s + parseMins(r.OccupiedHours), 0);
//   const totalFree     = summaries.reduce((s, r) => s + parseMins(r.FreeHours), 0);

//   return (
//     <Page style={styles.page}>
//       <PageHeader filters={filters} />

//       <Text style={styles.summaryPageTitle}>Overall Summary</Text>

//       {/* Stat Cards */}
//       <View style={styles.overviewCard}>
//         <View style={styles.statCard}>
//           <Text style={styles.statValue}>{apiData.Teachers.length}</Text>
//           <Text style={styles.statLabel}>Total Teachers</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={[styles.statValue, styles.statValueOccupied]}>
//             {toHM(totalOccupied)}
//           </Text>
//           <Text style={styles.statLabel}>Total Occupied Hours</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={[styles.statValue, styles.statValueFree]}>
//             {toHM(totalFree)}
//           </Text>
//           <Text style={styles.statLabel}>Total Free Hours</Text>
//         </View>
//       </View>

//       {/* Teacher-wise Breakdown Table */}
//       <Text style={styles.sectionLabel}>Teacher-wise Breakdown</Text>
//       <View style={styles.overallSummaryTable}>
//         <View style={styles.overallSummaryHeaderRow}>
//           <View style={styles.colTeacher}>
//             <Text style={styles.overallHeaderText}>Teacher</Text>
//           </View>
//           <View style={styles.colSubjects}>
//             <Text style={styles.overallHeaderText}>Subjects</Text>
//           </View>
//           <View style={styles.colTotal}>
//             <Text style={styles.overallHeaderText}>Total Hrs</Text>
//           </View>
//           <View style={styles.colOccupied}>
//             <Text style={styles.overallHeaderText}>Occupied</Text>
//           </View>
//           <View style={styles.colFree}>
//             <Text style={styles.overallHeaderText}>Free Hrs</Text>
//           </View>
//         </View>

//         {summaries.map((s, idx) => {
//           const isLast = idx === summaries.length - 1;
//           const isAlt  = idx % 2 === 1;
//           return (
//             <View
//               key={s.EmployeeID}
//               style={[
//                 isLast ? styles.overallSummaryRowLast : styles.overallSummaryRow,
//                 isAlt && styles.overallSummaryRowAlt,
//               ]}
//             >
//               <View style={styles.colTeacher}>
//                 <Text style={styles.overallCellTeacher}>{s.TeacherName}</Text>
//                 <Text style={[styles.overallCellText, { fontSize: 8, color: "#94A3B8", marginTop: 2 }]}>
//                   {s.Standards}
//                 </Text>
//               </View>
//               <View style={styles.colSubjects}>
//                 <Text style={styles.overallCellText}>{s.Subjects}</Text>
//               </View>
//               <View style={styles.colTotal}>
//                 <Text style={styles.overallCellText}>{s.TotalHours}</Text>
//               </View>
//               <View style={styles.colOccupied}>
//                 <Text style={styles.overallCellOccupied}>{s.OccupiedHours}</Text>
//               </View>
//               <View style={styles.colFree}>
//                 <Text style={styles.overallCellFree}>{s.FreeHours}</Text>
//               </View>
//             </View>
//           );
//         })}

//         {/* Grand Total */}
//         <View style={styles.grandTotalRow}>
//           <View style={styles.colTeacher}>
//             <Text style={styles.grandTotalText}>Grand Total</Text>
//           </View>
//           <View style={styles.colSubjects}>
//             <Text style={styles.grandTotalText}>{summaries.length} Teachers</Text>
//           </View>
//           <View style={styles.colTotal}>
//             <Text style={styles.grandTotalText}>—</Text>
//           </View>
//           <View style={styles.colOccupied}>
//             <Text style={styles.grandTotalOccupied}>{toHM(totalOccupied)}</Text>
//           </View>
//           <View style={styles.colFree}>
//             <Text style={styles.grandTotalFree}>{toHM(totalFree)}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Subject Details per Teacher */}
//       <View style={styles.subjectBreakdownSection}>
//         <Text style={styles.subjectBreakdownTitle}>Subject Details per Teacher</Text>
//         {summaries.map((s) => (
//           <View key={s.EmployeeID} style={styles.teacherSubjectBlock}>
//             <Text style={styles.teacherSubjectBlockName}>
//               {s.TeacherName}{"  "}
//               <Text style={{ color: "#64748B", fontWeight: "normal" }}>
//                 ({s.OccupiedHours} occupied / {s.FreeHours} free)
//               </Text>
//             </Text>
//             <View style={styles.subjectTagsRow}>
//               {(s.SubjectStandardDetails || []).map((sd, i) => (
//                 <View key={i} style={styles.subjectTag}>
//                   <Text style={styles.subjectTagText}>
//                     {sd.SubjectName} — {sd.Standards}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         ))}
//       </View>

//       <PageFooter filters={filters} />
//     </Page>
//   );
// };

// // ─── MAIN PDF DOCUMENT ────────────────────────────────────────────────────────
// const TeacherOccupancyPDF = ({ apiData, filters = {} }) => {
//   if (!apiData || !apiData.Teachers) {
//     return (
//       <Document>
//         <Page style={styles.page}>
//           <Text>No data available</Text>
//         </Page>
//       </Document>
//     );
//   }

//   const summaryMap = {};
//   (apiData.Summaries || []).forEach((s) => {
//     summaryMap[s.EmployeeID] = s;
//   });

//   return (
//     <Document>
//       {/* ── One page per Teacher ── */}
//       {apiData.Teachers.map((teacher, index) => (
//         <Page key={teacher.EmployeeID} style={styles.page}>
//           <PageHeader filters={filters} />

//           {/* "Teacher Occupancy Report" title — FIRST PAGE ONLY */}
//           {index === 0 && (
//             <Text style={styles.reportTitle}>Teacher Occupancy Report</Text>
//           )}

//           {/* Timetable — teacher name shown as title row inside the table */}
//           <TeacherTimetableTable teacher={teacher} />

//           <PageFooter filters={filters} />
//         </Page>
//       ))}

//       {/* ── Final Page: Overall Summary ── */}
//       <OverallSummaryPage apiData={apiData} filters={filters} />
//     </Document>
//   );
// };

// export default TeacherOccupancyPDF;
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingBottom: 70,
    paddingHorizontal: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },

  // ─── Fixed Header / Footer Images ───
  headerWrapper: {
    position: "absolute", top: 8, left: 0, right: 0,
    height: 60, alignItems: "center", justifyContent: "center",
  },
  headerImage: { width: "100%", height: 60, marginBottom: 10, objectFit: "contain" },

  footerWrapper: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: 55, alignItems: "center", justifyContent: "center",
  },
  footerImage: { width: "100%", height: 55, objectFit: "cover" },

  // ─── Report Title (first page only) ───
  reportTitle: {
    fontSize: 16, fontWeight: "bold", color: "#1e1e3a",
    textAlign: "center", marginBottom: 10,
    paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#1e1e3a",
  },

  // ─── Timetable wrapper ───
  timetableContainer: {
    marginBottom: 15,
    border: "1px solid #E2E8F0",
    borderRadius: 4,
  },

  // ─── Teacher name title row ───
  timetableTitleRow: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignItems: "center",
  },
  timetableTitleText: { fontSize: 11, fontWeight: "bold", color: "#1e1e3a" },
  timetableTitleSep:  { fontSize: 11, color: "#94A3B8", marginHorizontal: 6 },
  timetableTitleSub:  { fontSize: 10, color: "#64748B" },

  // ─── Column Header Row (time slot headers) ───
  timetableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  // "Day" corner cell
  dayCornerCell: {
    width: 36,
    flexShrink: 0,
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  dayCornerText: { fontSize: 7, fontWeight: "bold", color: "#5d6878" },

  // Each time-slot header cell
  slotHeaderCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  slotHeaderCellLast: { borderRightWidth: 0 },

  // Period label e.g. "Period 1"
  slotPeriodLabel: {
    fontSize: 7, fontWeight: "bold",
    color: "#1e1e3a", textAlign: "center",
    marginBottom: 2,
  },
  // Full time range e.g. "9:15 AM - 10:00 AM"
  slotTimeRange: {
    fontSize: 6, color: "#64748B",
    textAlign: "center", lineHeight: 1.3,
  },

  // ─── Data rows (one per day) ───
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    minHeight: 40,
  },
  dataRowLast: { borderBottomWidth: 0 },
  dataRowAlt:  { backgroundColor: "#FAFBFF" },

  // Day name cell (first column)
  dayNameCell: {
    width: 36,
    flexShrink: 0,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  dayNameText: { fontSize: 8, fontWeight: "bold", color: "#1e1e3a", textAlign: "center" },

  // Subject data cell
  dataCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#F1F5F9",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  dataCellLast: { borderRightWidth: 0 },

  // Subject pill
  subjectCellBox: {
    padding: 4,
    backgroundColor: "#FFFBEB",
    borderLeftWidth: 3,
    borderLeftColor: "#F59E0B",
    borderRadius: 3,
    width: "100%",
  },
  subjectName:  { fontSize: 7, fontWeight: "bold", color: "#92400E", marginBottom: 1 },
  subjectGrade: { fontSize: 6, color: "#F59E0B" },
  emptyDash:    { fontSize: 8, color: "#CBD5E1", textAlign: "center" },

  // ─── Summary Page ───
  summaryPageTitle: {
    fontSize: 16, fontWeight: "bold", color: "#1e1e3a",
    marginTop: 8, marginBottom: 6,
    textAlign: "center", paddingBottom: 10,
  },
  overviewCard: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: 20, gap: 8,
  },
  statCard: {
    flex: 1, padding: 12,
    backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0",
    borderRadius: 6, alignItems: "center",
  },
  statValue:         { fontSize: 18, fontWeight: "bold", color: "#1e1e3a", marginBottom: 4 },
  statLabel:         { fontSize: 8, color: "#64748B", textAlign: "center" },
  statValueOccupied: { color: "#FB923C" },
  statValueFree:     { color: "#10B981" },

  overallSummaryTable: {
    marginBottom: 20, border: "1px solid #E2E8F0", borderRadius: 4,
  },
  overallSummaryHeaderRow: {
    flexDirection: "row", backgroundColor: "#EEF2FF",
    borderBottomWidth: 1, borderBottomColor: "#E2E8F0",
  },
  overallSummaryRow:     { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  overallSummaryRowLast: { flexDirection: "row" },
  overallSummaryRowAlt:  { backgroundColor: "#F8FAFC" },

  colTeacher:  { width: "28%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
  colSubjects: { width: "32%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
  colTotal:    { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
  colOccupied: { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
  colFree:     { width: "14%", padding: 8, textAlign: "center" },

  overallHeaderText:   { fontSize: 9, fontWeight: "bold", textAlign: "center", color: "#000" },
  overallCellText:     { fontSize: 9, color: "#334155" },
  overallCellOccupied: { fontSize: 9, color: "#FB923C", fontWeight: "bold" },
  overallCellFree:     { fontSize: 9, color: "#10B981", fontWeight: "bold" },
  overallCellTeacher:  { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },

  grandTotalRow:      { flexDirection: "row", backgroundColor: "#EEF2FF", borderTopWidth: 1, borderTopColor: "#1e1e3a" },
  grandTotalText:     { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },
  grandTotalOccupied: { fontSize: 9, fontWeight: "bold", color: "#FB923C" },
  grandTotalFree:     { fontSize: 9, fontWeight: "bold", color: "#10B981" },

  subjectBreakdownSection: { marginTop: 20 },
  subjectBreakdownTitle: {
    fontSize: 12, fontWeight: "bold", color: "#1e1e3a",
    marginBottom: 10, paddingBottom: 6,
    borderBottomWidth: 1, borderBottomColor: "#E2E8F0",
  },
  teacherSubjectBlock: {
    marginBottom: 14, padding: 10,
    backgroundColor: "#F8FAFC", borderRadius: 4, border: "1px solid #E2E8F0",
  },
  teacherSubjectBlockName: { fontSize: 10, fontWeight: "bold", color: "#1e1e3a", marginBottom: 6 },
  subjectTagsRow:          { flexDirection: "row", flexWrap: "wrap" },
  subjectTag: {
    backgroundColor: "#EEF2FF", border: "0.5px solid #6366F1",
    padding: 4, marginRight: 6, marginBottom: 4, borderRadius: 3,
  },
  subjectTagText: { fontSize: 8, color: "#3730A3", fontWeight: 600 },

  sectionLabel: {
    fontSize: 11, fontWeight: "bold", color: "#1e1e3a",
    marginBottom: 10, marginTop: 4,
  },
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const parseTime = (t) => {
  if (!t) return 0;
  const parts = t.trim().split(" ");
  const ampm = parts[1];
  let [h, m] = parts[0].split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
};

// ─── REUSABLE HEADER / FOOTER ────────────────────────────────────────────────
const PageHeader = ({ filters }) => {
  if (!filters?.HeaderImg) return null;
  return (
    <View fixed style={styles.headerWrapper}>
      <Image src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`} style={styles.headerImage} />
    </View>
  );
};

const PageFooter = ({ filters }) => {
  if (!filters?.FooterImg) return null;
  return (
    <View fixed style={styles.footerWrapper}>
      <Image src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`} style={styles.footerImage} />
    </View>
  );
};

// ─── TIMETABLE TABLE ─────────────────────────────────────────────────────────
// Layout: Days = rows | Period slots = columns
// Column headers: Period label (from BreakSlots) + full "fromTime - toTime"
const TeacherTimetableTable = ({ teacher }) => {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { timeSlots, BreakSlots, BreakSlotsList, schedule, TeacherName } = teacher;

  // Exclude break/assembly/lunch/activity — keep only actual teaching periods
  const breakTexts  = new Set(BreakSlotsList.map((b) => b.SlotText));
  const periodSlots = [...timeSlots]
    .filter((s) => !breakTexts.has(s))
    .sort((a, b) => parseTime(a.split(" - ")[0]) - parseTime(b.split(" - ")[0]));

  const dayMap = {};
  schedule.forEach((d) => { dayMap[d.day] = d.slots; });

  return (
    <View style={styles.timetableContainer}>

      {/* ── Teacher name title row ── */}
      <View style={styles.timetableTitleRow}>
        <Text style={styles.timetableTitleText}>{TeacherName}</Text>
        <Text style={styles.timetableTitleSep}>|</Text>
        <Text style={styles.timetableTitleSub}>Timetable</Text>
      </View>

      {/* ── Column header row ── */}
      <View style={styles.timetableHeaderRow}>
        {/* Corner "Day" cell */}
        <View style={styles.dayCornerCell}>
          <Text style={styles.dayCornerText}>DAY</Text>
        </View>

        {/* One column header per period slot */}
        {periodSlots.map((slot, idx) => {
          // Period label from BreakSlots map e.g. "Period 1"; fallback to P<n>
          const periodLabel = (BreakSlots && BreakSlots[slot]) ? BreakSlots[slot] : `P${idx + 1}`;
          const [fromTime, toTime] = slot.split(" - ");
          return (
            <View
              key={slot}
              style={[
                styles.slotHeaderCell,
                idx === periodSlots.length - 1 && styles.slotHeaderCellLast,
              ]}
            >
              <Text style={styles.slotPeriodLabel}>{periodLabel}</Text>
              <Text style={styles.slotTimeRange}>{fromTime} – {toTime}</Text>
              {/* <Text style={styles.slotTimeRange}></Text> */}
            </View>
          );
        })}
      </View>

      {/* ── Data rows (one per day) ── */}
      {DAYS.map((day, dayIdx) => (
        <View
          key={day}
          style={[
            styles.dataRow,
            dayIdx === DAYS.length - 1 && styles.dataRowLast,
            dayIdx % 2 === 1 && styles.dataRowAlt,
          ]}
        >
          {/* Day name cell */}
          <View style={[styles.dayNameCell, dayIdx % 2 === 1 && { backgroundColor: "#F1F5F9" }]}>
            <Text style={styles.dayNameText}>{day.slice(0, 3)}</Text>
          </View>

          {/* Subject cell per period */}
          {periodSlots.map((slot, slotIdx) => {
            const cellText    = dayMap[day]?.[slot] ?? "";
            const parts       = cellText
              ? cellText.split(/\s*\(\s*|\s*\)/).filter(Boolean)
              : [];
            const subjectPart = parts[0] || "";
            const gradePart   = parts[1] || "";

            return (
              <View
                key={slot}
                style={[
                  styles.dataCell,
                  slotIdx === periodSlots.length - 1 && styles.dataCellLast,
                ]}
              >
                {cellText ? (
                  <View style={styles.subjectCellBox}>
                    {gradePart   && <Text style={styles.subjectName}>{gradePart}</Text>}
                    {subjectPart && <Text style={styles.subjectGrade}>{subjectPart}</Text>}
                  </View>
                ) : (
                  <Text style={styles.emptyDash}>—</Text>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

// ─── OVERALL SUMMARY PAGE ────────────────────────────────────────────────────
const OverallSummaryPage = ({ apiData, filters }) => {
  const summaries = apiData.Summaries || [];

  const parseMins = (str = "0h 0m") => {
    const [hPart, mPart] = str.split("h ");
    return (parseInt(hPart) || 0) * 60 + (parseInt((mPart || "0m").replace("m", "")) || 0);
  };
  const toHM = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

  const totalOccupied = summaries.reduce((s, r) => s + parseMins(r.OccupiedHours), 0);
  const totalFree     = summaries.reduce((s, r) => s + parseMins(r.FreeHours), 0);

  return (
    <Page style={styles.page}>
      <PageHeader filters={filters} />
      <Text style={styles.summaryPageTitle}>Overall Summary</Text>

      <View style={styles.overviewCard}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{apiData.Teachers.length}</Text>
          <Text style={styles.statLabel}>Total Teachers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, styles.statValueOccupied]}>{toHM(totalOccupied)}</Text>
          <Text style={styles.statLabel}>Total Occupied Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, styles.statValueFree]}>{toHM(totalFree)}</Text>
          <Text style={styles.statLabel}>Total Free Hours</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Teacher-wise Breakdown</Text>
      <View style={styles.overallSummaryTable}>
        <View style={styles.overallSummaryHeaderRow}>
          <View style={styles.colTeacher}><Text style={styles.overallHeaderText}>Teacher</Text></View>
          <View style={styles.colSubjects}><Text style={styles.overallHeaderText}>Subjects</Text></View>
          <View style={styles.colTotal}><Text style={styles.overallHeaderText}>Total Hrs</Text></View>
          <View style={styles.colOccupied}><Text style={styles.overallHeaderText}>Occupied</Text></View>
          <View style={styles.colFree}><Text style={styles.overallHeaderText}>Free Hrs</Text></View>
        </View>

        {summaries.map((s, idx) => (
          <View
            key={s.EmployeeID}
            style={[
              idx === summaries.length - 1 ? styles.overallSummaryRowLast : styles.overallSummaryRow,
              idx % 2 === 1 && styles.overallSummaryRowAlt,
            ]}
          >
            <View style={styles.colTeacher}>
              <Text style={styles.overallCellTeacher}>{s.TeacherName}</Text>
              <Text style={[styles.overallCellText, { fontSize: 8, color: "#94A3B8", marginTop: 2 }]}>
                {s.Standards}
              </Text>
            </View>
            <View style={styles.colSubjects}><Text style={styles.overallCellText}>{s.Subjects}</Text></View>
            <View style={styles.colTotal}><Text style={styles.overallCellText}>{s.TotalHours}</Text></View>
            <View style={styles.colOccupied}><Text style={styles.overallCellOccupied}>{s.OccupiedHours}</Text></View>
            <View style={styles.colFree}><Text style={styles.overallCellFree}>{s.FreeHours}</Text></View>
          </View>
        ))}

        <View style={styles.grandTotalRow}>
          <View style={styles.colTeacher}><Text style={styles.grandTotalText}>Grand Total</Text></View>
          <View style={styles.colSubjects}><Text style={styles.grandTotalText}>{summaries.length} Teachers</Text></View>
          <View style={styles.colTotal}><Text style={styles.grandTotalText}>—</Text></View>
          <View style={styles.colOccupied}><Text style={styles.grandTotalOccupied}>{toHM(totalOccupied)}</Text></View>
          <View style={styles.colFree}><Text style={styles.grandTotalFree}>{toHM(totalFree)}</Text></View>
        </View>
      </View>

      <View style={styles.subjectBreakdownSection}>
        <Text style={styles.subjectBreakdownTitle}>Subject Details per Teacher</Text>
        {summaries.map((s) => (
          <View key={s.EmployeeID} style={styles.teacherSubjectBlock}>
            <Text style={styles.teacherSubjectBlockName}>
              {s.TeacherName}{"  "}
              <Text style={{ color: "#64748B", fontWeight: "normal" }}>
                ({s.OccupiedHours} occupied / {s.FreeHours} free)
              </Text>
            </Text>
            <View style={styles.subjectTagsRow}>
              {(s.SubjectStandardDetails || []).map((sd, i) => (
                <View key={i} style={styles.subjectTag}>
                  <Text style={styles.subjectTagText}>{sd.SubjectName} — {sd.Standards}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <PageFooter filters={filters} />
    </Page>
  );
};

// ─── MAIN PDF DOCUMENT ────────────────────────────────────────────────────────
const TeacherOccupancyPDF = ({ apiData, filters = {} }) => {
  if (!apiData || !apiData.Teachers) {
    return (
      <Document>
        <Page style={styles.page}><Text>No data available</Text></Page>
      </Document>
    );
  }

  return (
    <Document>
      {apiData.Teachers.map((teacher, index) => (
        <Page key={teacher.EmployeeID} style={styles.page}>
          <PageHeader filters={filters} />

          {/* Report title — first page only */}
          {index === 0 && (
            <Text style={styles.reportTitle}>Teacher Occupancy Report</Text>
          )}

          <TeacherTimetableTable teacher={teacher} />

          <PageFooter filters={filters} />
        </Page>
      ))}

      <OverallSummaryPage apiData={apiData} filters={filters} />
    </Document>
  );
};

export default TeacherOccupancyPDF;


