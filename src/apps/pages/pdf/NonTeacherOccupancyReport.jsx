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
  // page: {
  //   paddingTop: 70,
  //   // paddingBottom: 70,
  //   paddingBottom: footerHeight,
  //   paddingHorizontal: 20,
  //   fontSize: 10,
  //   fontFamily: "Helvetica",
  //   backgroundColor: "#fff",
  // },

  // ─── Fixed Header / Footer Images ───
  headerWrapper: {
    position: "absolute", top: 8, left: 0, right: 0,
    height: 60, alignItems: "center", justifyContent: "center",
  },
  headerImage: { width: "100%", height: 60, marginBottom: 10, objectFit: "contain" },

  // footerWrapper: {
  //   position: "absolute", bottom: 0, left: 0, right: 0,
  //   height: 55, alignItems: "center", justifyContent: "center",
  // },
  // footerImage: { width: "100%", height: 55, objectFit: "cover" },
  footerWrapper: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: 60,
    overflow: "hidden",
    display: "flex",
  },
  // footerImage: {
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "fill",   // ← stretches to fill both width & height exactly, no gaps
  // },
  footerImage: {
    width: "100%",
    height: "auto",      // 🔥 KEY FIX
    objectFit: "contain" // 🔥 NO crop, NO stretch
  },

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
  timetableTitleSep: { fontSize: 11, color: "#94A3B8", marginHorizontal: 6 },
  timetableTitleSub: { fontSize: 10, color: "#64748B" },

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
  dataRowAlt: { backgroundColor: "#FAFBFF" },

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
  subjectName: { fontSize: 7, fontWeight: "bold", color: "#92400E", marginBottom: 1 },
  subjectGrade: { fontSize: 6, color: "#F59E0B" },
  emptyDash: { fontSize: 8, color: "#CBD5E1", textAlign: "center" },

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
  statValue: { fontSize: 18, fontWeight: "bold", color: "#1e1e3a", marginBottom: 4 },
  statLabel: { fontSize: 8, color: "#64748B", textAlign: "center" },
  statValueOccupied: { color: "#FB923C" },
  statValueFree: { color: "#10B981" },

  overallSummaryTable: {
    marginBottom: 20, border: "1px solid #E2E8F0", borderRadius: 4,
  },
  overallSummaryHeaderRow: {
    flexDirection: "row", backgroundColor: "#EEF2FF",
    borderBottomWidth: 1, borderBottomColor: "#E2E8F0",
  },
  overallSummaryRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  overallSummaryRowLast: { flexDirection: "row" },
  overallSummaryRowAlt: { backgroundColor: "#F8FAFC" },

  colTeacher: { width: "28%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
  colSubjects: { width: "32%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0" },
  colTotal: { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
  colOccupied: { width: "13%", padding: 8, borderRightWidth: 1, borderRightColor: "#E2E8F0", textAlign: "center" },
  colFree: { width: "14%", padding: 8, textAlign: "center" },

  overallHeaderText: { fontSize: 9, fontWeight: "bold", textAlign: "center", color: "#000" },
  overallCellText: { fontSize: 9, color: "#334155" },
  overallCellOccupied: { fontSize: 9, color: "#FB923C", fontWeight: "bold" },
  overallCellFree: { fontSize: 9, color: "#10B981", fontWeight: "bold" },
  overallCellTeacher: { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },

  grandTotalRow: { flexDirection: "row", backgroundColor: "#EEF2FF", borderTopWidth: 1, borderTopColor: "#1e1e3a" },
  grandTotalText: { fontSize: 9, fontWeight: "bold", color: "#1e1e3a" },
  grandTotalOccupied: { fontSize: 9, fontWeight: "bold", color: "#FB923C" },
  grandTotalFree: { fontSize: 9, fontWeight: "bold", color: "#10B981" },

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
  subjectTagsRow: { flexDirection: "row", flexWrap: "wrap" },
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

const PageFooter = ({ filters, footerHeight }) => {
  if (!filters?.FooterImg) return null;
  return (
    <View
      fixed
      // style={styles.footerWrapper}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: footerHeight, // 🔥 dynamic
      }}
    >
      <Image
        src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
        // style={styles.footerImage} 
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
};

// ─── TIMETABLE TABLE ─────────────────────────────────────────────────────────
// Layout: Days = rows | Period slots = columns
// Column headers: Period label (from BreakSlots) + full "fromTime - toTime"
const TeacherTimetableTable = ({ teacher, summary }) => {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { timeSlots, BreakSlots, BreakSlotsList, schedule, StaffName } = teacher;

//   const breakTexts = new Set(BreakSlotsList.map((b) => b.SlotText));
  const breakTexts = new Set(
  (BreakSlotsList || []).map((b) => b.SlotText)
);
//   const periodSlots = [...timeSlots]
//     .filter((s) => !breakTexts.has(s))
//     .sort((a, b) => parseTime(a.split(" - ")[0]) - parseTime(b.split(" - ")[0]));

    const periodSlots = [...(timeSlots || [])]
  .filter((s) => !breakTexts.has(s))
  .sort(
    (a, b) =>
      parseTime(a.split(" - ")[0]) -
      parseTime(b.split(" - ")[0])
  );

  const dayMap = {};
  schedule.forEach((d) => { dayMap[d.day] = d.slots; });

  return (
    <View style={styles.timetableContainer}>
 {/* ── Teacher name title row ── */}
      <View style={[styles.timetableTitleRow, { justifyContent: "space-between" }]}>

        {/* Left: Name | Timetable */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.timetableTitleText}>{StaffName}</Text>
          <Text style={styles.timetableTitleSep}>|</Text>
          <Text style={styles.timetableTitleSub}>Timetable</Text>
        </View>

        {/* Right: Total / Occupied / Free from matched summary */}
        {summary && (
          <View style={{ flexDirection: "row", gap: 6 }}>

            {/* TOTAL */}
            <View style={{
              backgroundColor: "#E8EDF5",
              borderRadius: 4,
              paddingHorizontal: 7,
              paddingVertical: 3,
              alignItems: "center",
              minWidth: 52,
            }}>
              <Text style={{ fontSize: 7, color: "#64748B", fontWeight: "bold", marginBottom: 2 }}>
                Total
              </Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#1e1e3a" }}>
                {summary.TotalHours}
              </Text>
            </View>

            {/* OCCUPIED */}
            <View style={{
              backgroundColor: "#E8EDF5",
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              alignItems: "center",
              minWidth: 60,
            }}>
              <Text style={{ fontSize: 7, color: "#64748B", fontWeight: "bold", marginBottom: 2 }}>
                Occupied
              </Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#FB923C" }}>
                {summary.OccupiedHours}
              </Text>
            </View>

            {/* FREE */}
            <View style={{
              backgroundColor: "#E8EDF5",
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              alignItems: "center",
              minWidth: 56,
            }}>
              <Text style={{ fontSize: 7, color: "#64748B", fontWeight: "bold", marginBottom: 2 }}>
                Free
              </Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#10B981" }}>
                {summary.FreeHours}
              </Text>
            </View>

          </View>
        )}
      </View>

      {/* ── Column header row ── */}
      <View style={styles.timetableHeaderRow}>
        {/* Corner "Day" cell */}
        <View style={styles.dayCornerCell}>
          <Text style={styles.dayCornerText}>Day</Text>
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
            const cellText = dayMap[day]?.[slot] ?? "";
            const parts = cellText
              ? cellText.split(/\s*\(\s*|\s*\)/).filter(Boolean)
              : [];
            const subjectPart = parts[0] || "";
            const gradePart = parts[1] || "";

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
                    {gradePart && <Text style={styles.subjectName}>{gradePart}</Text>}
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
const OverallSummaryPage = ({ apiData, filters, footerHeight }) => {
  const summaries = apiData.Summaries || [];

  const parseMins = (str = "0h 0m") => {
    const [hPart, mPart] = str.split("h ");
    return (parseInt(hPart) || 0) * 60 + (parseInt((mPart || "0m").replace("m", "")) || 0);
  };
  const toHM = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

  const totalOccupied = summaries.reduce((s, r) => s + parseMins(r.OccupiedHours), 0);
  const totalFree = summaries.reduce((s, r) => s + parseMins(r.FreeHours), 0);

  return (
    <Page
      // style={styles.page}
      style={{
        paddingTop: 70,
        // paddingBottom: 70,
        paddingBottom: footerHeight,
        paddingHorizontal: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
        backgroundColor: "#fff",
      }}
    >
      <PageHeader filters={filters} footerHeight={footerHeight} />
      <Text style={styles.summaryPageTitle}>Overall Summary</Text>

      <View style={styles.overviewCard}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{apiData?.Staff?.length}</Text>
          <Text style={styles.statLabel}>Total Non Teaching Staffs</Text>
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

      <Text style={styles.sectionLabel}>Non Teaching Staff-wise Breakdown</Text>
      <View style={styles.overallSummaryTable}>
        <View style={styles.overallSummaryHeaderRow}>
          <View style={styles.colTeacher}><Text style={styles.overallHeaderText}>Non Teaching Staff</Text></View>
          <View style={styles.colSubjects}><Text style={styles.overallHeaderText}>Activities</Text></View>
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
              <Text style={styles.overallCellTeacher}>{s.StaffName}</Text>
              <Text style={[styles.overallCellText, { fontSize: 8, color: "#94A3B8", marginTop: 2 }]}>
                {s.Activities}
              </Text>
            </View>
            <View style={styles.colSubjects}><Text style={styles.overallCellText}>{s.Activities}</Text></View>
            <View style={styles.colTotal}><Text style={styles.overallCellText}>{s.TotalHours}</Text></View>
            <View style={styles.colOccupied}><Text style={styles.overallCellOccupied}>{s.OccupiedHours}</Text></View>
            <View style={styles.colFree}><Text style={styles.overallCellFree}>{s.FreeHours}</Text></View>
          </View>
        ))}

        <View style={styles.grandTotalRow}>
          <View style={styles.colTeacher}><Text style={styles.grandTotalText}>Grand Total</Text></View>
          <View style={styles.colSubjects}><Text style={styles.grandTotalText}>{summaries.length} Non Teaching Staffs</Text></View>
          <View style={styles.colTotal}><Text style={styles.grandTotalText}>—</Text></View>
          <View style={styles.colOccupied}><Text style={styles.grandTotalOccupied}>{toHM(totalOccupied)}</Text></View>
          <View style={styles.colFree}><Text style={styles.grandTotalFree}>{toHM(totalFree)}</Text></View>
        </View>
      </View>
      <View
        // style={styles.subjectBreakdownSection}
        // wrap
        style={{
          marginTop: 20,
        }}
      >
        <Text style={styles.subjectBreakdownTitle}>Activity Details per Non Teaching Staff</Text>
        {summaries.map((s) => (
          <View key={s.EmployeeID}
            // style={styles.teacherSubjectBlock}
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#F8FAFC", borderRadius: 4, border: "1px solid #E2E8F0",
            }}
          >
            <Text style={styles.teacherSubjectBlockName}>
              {s.StaffName}{"  "}
              <Text style={{ color: "#64748B", fontWeight: "normal" }}>
                ({s.OccupiedHours} occupied / {s.FreeHours} free)
              </Text>
            </Text>
            <View style={styles.subjectTagsRow}>
              {(s.ActivityDetails || []).map((sd, i) => (
                <View key={i} style={styles.subjectTag}>
                  <Text style={styles.subjectTagText}>{sd.SubjectName} — {sd.Standards}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: footerHeight }} />
      <PageFooter filters={filters} footerHeight={footerHeight} />
    </Page>
  );
};


  
// ─── MAIN PDF DOCUMENT ────────────────────────────────────────────────────────
const NonTeacherOccupancyPDF = ({ apiData, filters = {}, footerHeight }) => {

  const summaryMap = {};
  (apiData.Summaries || []).forEach((s) => {
    summaryMap[s.EmployeeID] = s;
  });

  if (!apiData || !apiData.Staff) {
    return (
      <Document>
        <Page style={styles.page}><Text>No data available</Text></Page>
      </Document>
    );
  }

  return (
    <Document>
      {apiData.Staff.map((teacher, index) => (
        <Page
          key={teacher.EmployeeID}
          // style={styles.page}
          style={{
            paddingTop: 70,
            // paddingBottom: 70,
            paddingBottom: footerHeight,
            paddingHorizontal: 20,
            fontSize: 10,
            fontFamily: "Helvetica",
            backgroundColor: "#fff",
          }}
        >
          <PageHeader filters={filters} />

          {/* Report title — first page only */}
          {index === 0 && (
            <Text style={styles.reportTitle}>
              {filters.TitleName}
              {/* Teacher Productivity Report */}
              </Text>
          )}

          <TeacherTimetableTable
           teacher={teacher}
            summary={summaryMap[teacher.EmployeeID]} 
            />

          <PageFooter filters={filters} footerHeight={footerHeight} />
        </Page>
      ))}

      <OverallSummaryPage apiData={apiData} filters={filters} footerHeight={footerHeight}/>
    </Document>
  );
};

export default NonTeacherOccupancyPDF;


