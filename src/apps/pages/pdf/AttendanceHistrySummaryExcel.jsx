// import * as XLSX from "xlsx-js-style";

// export const AttendanceHistrySummaryExcel = (data, filters, empData) => {
//   if (!Array.isArray(data) || data.length === 0) return;

//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   const worksheet = XLSX.utils.aoa_to_sheet([]);
//   const merges = [];

//   /* ===============================================================
//      STYLES
//   =============================================================== */
//   const reportHeaderStyle = {
//     font: { bold: true, sz: 14 },
//     alignment: { horizontal: "center", vertical: "center" },
//     fill: { fgColor: { rgb: "BDD7EE" } }
//   };

//   const tableHeaderStyle = {
//     font: { bold: true },
//     alignment: { horizontal: "center", vertical: "center" },
//     fill: { fgColor: { rgb: "D9D9D9" } },
//     border: {
//       top:    { style: "thin" },
//       bottom: { style: "thin" },
//       left:   { style: "thin" },
//       right:  { style: "thin" }
//     }
//   };

//   const oddRowStyle = {
//     alignment: { horizontal: "center", vertical: "center" },
//     fill: { fgColor: { rgb: "FFFFFF" } },
//     border: {
//       top:    { style: "thin" },
//       bottom: { style: "thin" },
//       left:   { style: "thin" },
//       right:  { style: "thin" }
//     }
//   };

//   const evenRowStyle = {
//     alignment: { horizontal: "center", vertical: "center" },
//     fill: { fgColor: { rgb: "EEF3FB" } },
//     border: {
//       top:    { style: "thin" },
//       bottom: { style: "thin" },
//       left:   { style: "thin" },
//       right:  { style: "thin" }
//     }
//   };

//   const leftAlignStyle = (base) => ({
//     ...base,
//     alignment: { horizontal: "left", vertical: "center" }
//   });

//   const legendHeadingStyle = {
//     font: { bold: true, sz: 11, color: { rgb: "4472C4" } },
//     alignment: { horizontal: "left", vertical: "center" },
//     border: {
//       left:  { style: "thin" },
//       right: { style: "thin" }
//     }
//   };

//   const legendTextStyle = {
//     font: { sz: 10 },
//     fill: { fgColor: { rgb: "F2F2F2" } },
//     alignment: { horizontal: "left", vertical: "center" },
//     border: {
//       left:  { style: "thin" },
//       right: { style: "thin" }
//     }
//   };

//   const summaryHeadingStyle = {
//     font: { bold: true, sz: 11, color: { rgb: "4472C4" } },
//     alignment: { horizontal: "left", vertical: "center" },
//     border: {
//       bottom: { style: "thin" },
//       left:   { style: "thin" },
//       right:  { style: "thin" }
//     }
//   };

//   const summaryColHeaderStyle = {
//     font: { bold: true, sz: 10 },
//     fill: { fgColor: { rgb: "E2EFDA" } },
//     alignment: { horizontal: "center", vertical: "center" },
//     border: {
//       top:    { style: "thin" },
//       bottom: { style: "thin" },
//       left:   { style: "thin" },
//       right:  { style: "thin" }
//     }
//   };

//   /* ===============================================================
//      CONSTANTS
//      Columns: 0=SL# | 1=Employee | 2-32=Day1-31 | 33=P | 34=UL |
//               35=SL | 36=HOL | 37=WO | 38=Total  → last col = 38
//   =============================================================== */
//   const LAST_ATT_COL   = 38;
//   const SUMMARY_LAST_COL = 7; // A(0)..H(7)

//   /* ===============================================================
//      ROW 1 — REPORT HEADER  (0-indexed row 0)
//   =============================================================== */
//   const titleCell = "A1";
//   XLSX.utils.sheet_add_aoa(
//     worksheet,
//     [[`Monthly Attendance Report (${monthNames[filters.month - 1]} - ${filters.year})`]],
//     { origin: titleCell }
//   );
//   worksheet[titleCell].s = reportHeaderStyle;
//   merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: LAST_ATT_COL } });

//   /* ===============================================================
//      ROW 3 — ATTENDANCE TABLE HEADER  (0-indexed row 2)
//      One empty row (row 1 / Excel row 2) between title and table
//   =============================================================== */
//   const ATT_HEADER_ROW = 2; // 0-indexed → Excel row 3

//   const attHeaderRow = [
//     "SL#", "Employee",
//     ...Array.from({ length: 31 }, (_, i) => i + 1),
//     "P", "UL", "SL", "HOL", "WO", "Total"
//   ];

//   const attDataRows = data.map(row => [
//     row.SLNO,
//     row.Name,
//     ...Array.from({ length: 31 }, (_, i) => row[`Day${i + 1}`] ?? ""),
//     row.Present,
//     row.UnPaidLeave,
//     row.PaidLeave,
//     row.Holidays,
//     row.Weekoff,
//     row.Total
//   ]);

//   // Write header + data rows together
//   XLSX.utils.sheet_add_aoa(
//     worksheet,
//     [attHeaderRow, ...attDataRows],
//     { origin: { r: ATT_HEADER_ROW, c: 0 } }
//   );

//   // Style attendance header row
//   attHeaderRow.forEach((_, C) => {
//     const cell = XLSX.utils.encode_cell({ r: ATT_HEADER_ROW, c: C });
//     if (worksheet[cell]) worksheet[cell].s = tableHeaderStyle;
//   });

//   // Style attendance data rows (zebra striping)
//   const ATT_BODY_END = ATT_HEADER_ROW + data.length; // last attendance data row (0-indexed)
//   for (let R = ATT_HEADER_ROW + 1; R <= ATT_BODY_END; R++) {
//     const base = (R % 2 === 0) ? evenRowStyle : oddRowStyle;
//     for (let C = 0; C < attHeaderRow.length; C++) {
//       const cell = XLSX.utils.encode_cell({ r: R, c: C });
//       if (worksheet[cell]) {
//         worksheet[cell].s = (C === 1) ? leftAlignStyle(base) : base;
//       }
//     }
//   }

//   /* ===============================================================
//      LEGEND SECTION  (1 row below last attendance row — no extra gap)
//   =============================================================== */
//   const LEGEND_HEADING_ROW = ATT_BODY_END + 1; // ← was +2, now +1 (removes empty row)
//   const LEGEND_TEXT_ROW    = LEGEND_HEADING_ROW + 1;

//   // "Legend" heading
//   const legendHeadCell = XLSX.utils.encode_cell({ r: LEGEND_HEADING_ROW, c: 0 });
//   worksheet[legendHeadCell] = { v: "Legend", t: "s", s: legendHeadingStyle };
//   merges.push({ s: { r: LEGEND_HEADING_ROW, c: 0 }, e: { r: LEGEND_HEADING_ROW, c: LAST_ATT_COL } });

//   // Single-row legend text
//   const legendText =
//     "P -> Present          UL -> Unscheduled Leave          SH -> Second Half          " +
//     "M -> Medical Leave          HO -> Holiday          WO -> Week Off          " +
//     "CL -> Casual Leave          IR -> IR Regular";

//   const legendTextCell = XLSX.utils.encode_cell({ r: LEGEND_TEXT_ROW, c: 0 });
//   worksheet[legendTextCell] = { v: legendText, t: "s", s: legendTextStyle };
//   merges.push({ s: { r: LEGEND_TEXT_ROW, c: 0 }, e: { r: LEGEND_TEXT_ROW, c: LAST_ATT_COL } });

//   /* ===============================================================
//      SUMMARY SECTION  (1 row below legend text — no extra gap)
//   =============================================================== */
//   const SUM_HEADING_ROW = LEGEND_TEXT_ROW + 1; // ← was +2, now +1 (removes empty row)
//   const SUM_HEADER_ROW  = SUM_HEADING_ROW + 1;

//   // "Summary Report" heading
//   const sumHeadCell = XLSX.utils.encode_cell({ r: SUM_HEADING_ROW, c: 0 });
//   worksheet[sumHeadCell] = { v: "Summary Report", t: "s", s: summaryHeadingStyle };
//   merges.push({ s: { r: SUM_HEADING_ROW, c: 0 }, e: { r: SUM_HEADING_ROW, c: SUMMARY_LAST_COL } });

//   // Summary column headers
//   const summaryHeaders = ["SL#", "Employee", "P", "UL", "SL", "HOL", "WO", "Total"];
//   summaryHeaders.forEach((h, c) => {
//     const cell = XLSX.utils.encode_cell({ r: SUM_HEADER_ROW, c });
//     worksheet[cell] = { v: h, t: "s", s: summaryColHeaderStyle };
//   });

//   // Summary data rows (zebra, columns A–H only)
//   data.forEach((row, idx) => {
//     const R = SUM_HEADER_ROW + 1 + idx;
//     const base = (idx % 2 === 0) ? oddRowStyle : evenRowStyle;
//     const vals = [
//       row.SLNO,
//       row.Name,
//       row.Present,
//       row.UnPaidLeave,
//       row.PaidLeave,
//       row.Holidays,
//       row.Weekoff,
//       row.Total
//     ];
//     vals.forEach((val, c) => {
//       const cell = XLSX.utils.encode_cell({ r: R, c });
//       worksheet[cell] = {
//         v: val ?? "",
//         t: typeof val === "number" ? "n" : "s",
//         s: (c === 1) ? leftAlignStyle(base) : base
//       };
//     });
//   });

//   /* ===============================================================
//      COLUMN WIDTHS
//   =============================================================== */
//   worksheet["!cols"] = [
//     { wch: 6  },                   // 0:  SL#
//     { wch: 22 },                   // 1:  Employee
//     ...Array(31).fill({ wch: 4 }), // 2-32: Day 1–31
//     { wch: 7  },                   // 33: P
//     { wch: 18 },                   // 34: UL
//     { wch: 15 },                   // 35: SL
//     { wch: 7  },                   // 36: HOL
//     { wch: 7  },                   // 37: WO
//     { wch: 12 },                   // 38: Total
//   ];
//   // Col 7 (H) = "Total" in summary table
//   worksheet["!cols"][7] = { wch: 15 };

//   /* ===============================================================
//      SHEET REF + MERGES
//   =============================================================== */
//   const LAST_ROW = SUM_HEADER_ROW + data.length;
//   worksheet["!ref"] = XLSX.utils.encode_range({
//     s: { r: 0, c: 0 },
//     e: { r: LAST_ROW, c: LAST_ATT_COL }
//   });
//   worksheet["!merges"] = merges;

//   /* ===============================================================
//      EXPORT
//   =============================================================== */
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
//   XLSX.writeFile(
//     workbook,
//     `Attendance_${monthNames[filters.month - 1]}_${filters.year}.xlsx`
//   );
// };

// export default AttendanceHistrySummaryExcel;

import * as XLSX from "xlsx-js-style";

export const AttendanceHistrySummaryExcel = (data, filters, empData) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  const merges = [];

  /* ===============================================================
     STYLES
  =============================================================== */
  const reportHeaderStyle = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } }
  };

  const tableHeaderStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "D9D9D9" } },
    border: {
      top:    { style: "thin" },
      bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const oddRowStyle = {
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "FFFFFF" } },
    border: {
      top:    { style: "thin" },
      bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const evenRowStyle = {
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "EEF3FB" } },
    border: {
      top:    { style: "thin" },
      bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const leftAlignStyle = (base) => ({
    ...base,
    alignment: { horizontal: "left", vertical: "center" }
  });

  const legendHeadingStyle = {
    font: { bold: true, sz: 11, color: { rgb: "4472C4" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      left:  { style: "thin" },
      right: { style: "thin" }
    }
  };

  const legendTextStyle = {
    font: { sz: 10 },
    fill: { fgColor: { rgb: "F2F2F2" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      left:  { style: "thin" },
      right: { style: "thin" }
    }
  };

  const summaryHeadingStyle = {
    font: { bold: true, sz: 11, color: { rgb: "4472C4" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const summaryColHeaderStyle = {
    font: { bold: true, sz: 10 },
    fill: { fgColor: { rgb: "E2EFDA" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top:    { style: "thin" },
      bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  /* ===============================================================
     CONSTANTS
     Columns: 0=SL# | 1=Employee | 2-32=Day1-31 | 33=P | 34=UL |
              35=SL | 36=HOL | 37=WO | 38=Total  → last col = 38
  =============================================================== */
  const LAST_ATT_COL   = 38;
  const SUMMARY_LAST_COL = 7; // A(0)..H(7)

  /* ===============================================================
     ROW 1 — REPORT HEADER  (0-indexed row 0)
  =============================================================== */
  const titleCell = "A1";
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [[`Monthly Attendance Report (${monthNames[filters.month - 1]} - ${filters.year})`]],
    { origin: titleCell }
  );
  worksheet[titleCell].s = reportHeaderStyle;
  merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: SUMMARY_LAST_COL } });

  /* ===============================================================
     LEGEND SECTION  (row 2, directly after title + 1 empty row)
  =============================================================== */
  const LEGEND_HEADING_ROW = 2; // Excel row 3
  const LEGEND_TEXT_ROW    = LEGEND_HEADING_ROW + 1;

  // "Legend" heading
  const legendHeadCell = XLSX.utils.encode_cell({ r: LEGEND_HEADING_ROW, c: 0 });
  worksheet[legendHeadCell] = { v: "Legend", t: "s", s: legendHeadingStyle };
  merges.push({ s: { r: LEGEND_HEADING_ROW, c: 0 }, e: { r: LEGEND_HEADING_ROW, c: SUMMARY_LAST_COL } });

  // Legend text row 1
  const legendLine1 = "P -> Present     UL -> Unscheduled Leave     SH -> Second Half     M -> Medical Leave";
  const legendTextCell1 = XLSX.utils.encode_cell({ r: LEGEND_TEXT_ROW, c: 0 });
  worksheet[legendTextCell1] = { v: legendLine1, t: "s", s: legendTextStyle };
  merges.push({ s: { r: LEGEND_TEXT_ROW, c: 0 }, e: { r: LEGEND_TEXT_ROW, c: SUMMARY_LAST_COL } });

  // Legend text row 2
  const LEGEND_TEXT_ROW2 = LEGEND_TEXT_ROW + 1;
  const legendLine2 = "HO -> Holiday     WO -> Week Off     CL -> Casual Leave     IR -> IR Regular";
  const legendTextCell2 = XLSX.utils.encode_cell({ r: LEGEND_TEXT_ROW2, c: 0 });
  worksheet[legendTextCell2] = { v: legendLine2, t: "s", s: legendTextStyle };
  merges.push({ s: { r: LEGEND_TEXT_ROW2, c: 0 }, e: { r: LEGEND_TEXT_ROW2, c: SUMMARY_LAST_COL } });

  /* ===============================================================
     SUMMARY SECTION  (1 empty row after legend text row 2)
  =============================================================== */
  const SUM_HEADING_ROW = LEGEND_TEXT_ROW2 + 2; // +1 empty row gap
  const SUM_HEADER_ROW  = SUM_HEADING_ROW + 1;

  // "Summary Report" heading
  const sumHeadCell = XLSX.utils.encode_cell({ r: SUM_HEADING_ROW, c: 0 });
  worksheet[sumHeadCell] = { v: "Summary Report", t: "s", s: summaryHeadingStyle };
  merges.push({ s: { r: SUM_HEADING_ROW, c: 0 }, e: { r: SUM_HEADING_ROW, c: SUMMARY_LAST_COL } });

  // Summary column headers
  const summaryHeaders = ["SL#", "Employee", "P", "UL", "SL", "HOL", "WO", "Total"];
  summaryHeaders.forEach((h, c) => {
    const cell = XLSX.utils.encode_cell({ r: SUM_HEADER_ROW, c });
    worksheet[cell] = { v: h, t: "s", s: summaryColHeaderStyle };
  });

  // Summary data rows (zebra, columns A–H only)
  data.forEach((row, idx) => {
    const R = SUM_HEADER_ROW + 1 + idx;
    const base = (idx % 2 === 0) ? oddRowStyle : evenRowStyle;
    const vals = [
      row.SLNO,
      row.Name,
      row.Present,
      row.UnPaidLeave,
      row.PaidLeave,
      row.Holidays,
      row.Weekoff,
      row.Total
    ];
    vals.forEach((val, c) => {
      const cell = XLSX.utils.encode_cell({ r: R, c });
      worksheet[cell] = {
        v: val ?? "",
        t: typeof val === "number" ? "n" : "s",
        s: (c === 1) ? leftAlignStyle(base) : base
      };
    });
  });

  /* ===============================================================
     COLUMN WIDTHS  (only 8 columns needed for summary: A–H)
  =============================================================== */
  worksheet["!cols"] = [
    { wch: 6  },  // 0: SL#
    { wch: 22 },  // 1: Employee
    { wch: 7  },  // 2: P
    { wch: 7  },  // 3: UL
    { wch: 7  },  // 4: SL
    { wch: 7  },  // 5: HOL
    { wch: 7  },  // 6: WO
    { wch: 15 },  // 7: Total
  ];

  /* ===============================================================
     SHEET REF + MERGES
  =============================================================== */
  const LAST_ROW = SUM_HEADER_ROW + data.length;
  worksheet["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: LAST_ROW, c: SUMMARY_LAST_COL }
  });
  worksheet["!merges"] = merges;

  /* ===============================================================
     EXPORT
  =============================================================== */
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  XLSX.writeFile(
    workbook,
    `Attendance_${monthNames[filters.month - 1]}_${filters.year}.xlsx`
  );
};

export default AttendanceHistrySummaryExcel;