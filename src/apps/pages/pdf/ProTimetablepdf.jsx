import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  headerBg: "#1e1e3a",
  headerText: "#c8d0ea",
  dayBg: "#f0f0f8",
  dayText: "#1e1e3a",
  cellBg: "#f0f2ff",
  cellText: "#3a3a6e",
  oddRow: "#f8f8fc",
  evenRow: "#ffffff",
  border: "#e8e8f0",
  dayBorder: "#d0d0e8",
  intervalBg: "#1e1e3a",
  intervalLabel: "#a8b2d8",
  intervalValue: "#dde2f5",
  titleText: "#1e1e3a",
  mutedText: "#64748b",
  accent: "#3a3a6e",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    backgroundColor: "#ffffff",
    paddingTop: 80,
    paddingBottom: 36,
    paddingHorizontal: 0,
  },

  // ── Header banner ──
  headerBanner: {
    backgroundColor: C.headerBg,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  headerLogoBox: {
    width: 60,
    height: 36,
  },
  headerLogo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 9,
    color: C.headerText,
    marginTop: 3,
  },
  headerRight: {
    fontSize: 8,
    color: C.headerText,
    textAlign: "right",
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
    bottom: 15,
    left: 5,
    right: 5,     // forces full width
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover",
  },

  footerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  // ── Content wrapper ──
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // ── Section heading ──
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.mutedText,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
 headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  // ── Timetable grid ──
  table: {
    borderRadius: 4,
    border: `1 solid ${C.border}`,
    overflow: "hidden",
    marginBottom: 16,
  },

  // Header row of the grid
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: C.headerBg,
    minHeight: 28,
  },
  tableHeaderDayCell: {
    width: 52,
    flexShrink: 0,
    borderRightWidth: 2,
    borderRightColor: "#2e2e50",
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaderDayCellText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.headerText,
    letterSpacing: 0.4,
  },
  tableHeaderCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#2e2e50",
    paddingHorizontal: 3,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaderCellLast: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaderCellText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.headerText,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  tableHeaderCellTime: {
    fontSize: 6,
    color: "#8890b8",
    textAlign: "center",
    marginTop: 2,
  },

  // Data rows
  tableRow: {
    flexDirection: "row",
    minHeight: 36,
    borderTopWidth: 0.5,
    borderTopColor: C.border,
  },
  oddRow: { backgroundColor: C.oddRow },
  evenRow: { backgroundColor: C.evenRow },

  tableDayCell: {
    width: 52,
    flexShrink: 0,
    backgroundColor: C.dayBg,
    borderRightWidth: 2,
    borderRightColor: C.dayBorder,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tableDayCellText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.dayText,
  },

  tableDataCell: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: C.border,
    paddingHorizontal: 3,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tableDataCellLast: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cellChip: {
    backgroundColor: C.cellBg,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cellChipText: {
    fontSize: 7,
    color: C.cellText,
    textAlign: "center",
    lineHeight: 1.4,
  },

  // ── Intervals section ──
  intervalsHeading: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#444444",
    marginBottom: 8,
  },
  intervalsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  intervalPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.intervalBg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  intervalLabel: {
    fontSize: 8,
    color: C.intervalLabel,
  },
  intervalArrow: {
    fontSize: 9,
    color: "#5a6080",
    marginHorizontal: 4,
  },
  intervalValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.intervalValue,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 12,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    paddingTop: 6,
  },
  footerLeft: {
    fontSize: 7,
    color: C.mutedText,
  },
  footerRight: {
    fontSize: 7,
    color: C.mutedText,
  },
  footerLogo: {
    height: 22,
    objectFit: "contain",
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format today's date as "DD MMM YYYY" */
const today = () => {
  const d = new Date();
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const extractColumns = (columns = []) =>
  (columns || []).map((col) => ({
    field: col.field,
    headerName: col.headerName || col.field,
  }));

const splitSlotKey = (key = "") => {
  const parts = key.split(" - ");
  if (parts.length === 2) return { from: parts[0].trim(), to: parts[1].trim() };
  return { from: key, to: "" };
};


const TableHeaderRow = ({ columns }) => (
  <View style={s.tableHeaderRow}>
    {/* Day corner */}
    <View style={s.tableHeaderDayCell}>
      <Text style={s.tableHeaderDayCellText}>DAY</Text>
    </View>

    {/* Period columns */}
    {columns.map((col, idx) => {
      const isLast = idx === columns.length - 1;
      const { from, to } = splitSlotKey(col.headerName);
      return (
        <View key={col.field} style={isLast ? s.tableHeaderCellLast : s.tableHeaderCell}>
          <Text style={s.tableHeaderCellText}>{from}</Text>
          {to ? <Text style={s.tableHeaderCellTime}>{to}</Text> : null}
        </View>
      );
    })}
  </View>
);

const TableDataRow = ({ row, columns, rowIndex }) => {
  const isOdd = rowIndex % 2 !== 0;
  // The first column is always the "Day" column (field: "day" or similar)
  const [dayCol, ...periodCols] = columns;
  const dayValue = row[dayCol?.field] ?? "";

  return (
    <View style={[s.tableRow, isOdd ? s.oddRow : s.evenRow]}>
      {/* Day cell */}
      <View style={s.tableDayCell}>
        <Text style={s.tableDayCellText}>
          {String(dayValue).slice(0, 3).toUpperCase()}
        </Text>
      </View>

      {/* Period cells */}
      {periodCols.map((col, idx) => {
        const isLast = idx === periodCols.length - 1;
        const cellValue = row[col.field] ?? "";
        return (
          <View key={col.field} style={isLast ? s.tableDataCellLast : s.tableDataCell}>
            {cellValue ? (
              <View style={s.cellChip}>
                <Text style={s.cellChipText}>{cellValue}</Text>
              </View>
            ) : (
              <Text style={{ fontSize: 7, color: "#cbd5e1" }}>—</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const ProjectTimeTablePDF = ({
  rows = [],
  columns = [],
  breakSlots = [],
  projectName = "",
  termName = "",
  filters = {},
}) => {
  const pdfColumns = extractColumns(columns);

  return (
    <Document
      title="Timetable"
    >
      <Page
        size="A4"
        orientation="landscape"
        style={s.page}
      >
        {/* ── Header Banner ── */}
        <View fixed style={s.headerWrapper}>
          {filters.HeaderImg && (
            <Image
              src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
              style={s.headerImage}
            />
          )}
        </View>
        <View style={s.headerTextContainer}>
            <Text style={s.headerText}>
              {`Timetable (${projectName || ""}${projectName && termName ? " - " : ""}${termName || ""})`}
            </Text>          
        </View>
        {/* ── Content ── */}
        <View style={s.content}>
          {/* Timetable grid */}
          {pdfColumns.length > 0 && (
            <>
              <Text style={s.sectionLabel}>Weekly Schedule</Text>
              <View style={s.table}>
                <TableHeaderRow columns={pdfColumns} />
                {rows.map((row, idx) => (
                  <TableDataRow
                    key={row.id ?? idx}
                    row={row}
                    columns={pdfColumns}
                    rowIndex={idx}
                  />
                ))}
              </View>
            </>
          )}

          {/* Intervals / Break slots */}
          {breakSlots.length > 0 && (
            <>
              <Text style={s.intervalsHeading}>Intervals</Text>
              <View style={s.intervalsList}>
                {breakSlots.map((slot, idx) => (
                  <View key={idx} style={s.intervalPill}>
                    <Text style={s.intervalLabel}>{slot.SlotText}</Text>
                    <Text style={s.intervalArrow}> → </Text>
                    <Text style={s.intervalValue}>{slot.SlotName}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* ── Footer ── */}
        <View fixed style={s.footerWrapper}>
          {filters.FooterImg && (
            <Image
              src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
              style={s.footerImage}
            />
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ProjectTimeTablePDF;
