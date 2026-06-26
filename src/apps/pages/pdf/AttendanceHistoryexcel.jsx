// import * as XLSX from "xlsx-js-style";

// export const AttendanceHistoryExcel = (data, filters, empData) => {
//   if (!Array.isArray(data) || data.length === 0) return;

//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   const worksheet = XLSX.utils.aoa_to_sheet([]);

//   /* ================= HEADER ================= */
//   const headerInfo = [
//     ["Attendance Report"],
//     // [`Employee: ${empData?.Name || "All Employees"}`],
//     [`Month: ${monthNames[filters.month - 1]} - Year: ${filters.year}`],
   
//   ];

//   XLSX.utils.sheet_add_aoa(worksheet, headerInfo, { origin: "A1" });

//   const reportHeaderStyle = {
//     font: { bold: true, sz: 14 },
//     alignment: { horizontal: "left", indent: 70 },
//     fill: { fgColor: { rgb: "BDD7EE" } }
//   };

//   //if add one colum need A3
//   ["A1", "A2"].forEach(cell => {
//     worksheet[cell].s = reportHeaderStyle;
//   });

//   worksheet["!merges"] = [
//     { s: { r: 0, c: 0 }, e: { r: 0, c: 40 } },
//     { s: { r: 1, c: 0 }, e: { r: 1, c: 40 } },
//     // { s: { r: 2, c: 0 }, e: { r: 2, c: 40 } }
//   ];

//   /* ================= DATA ================= */
//   const excelData = data.map(row => ({
//     SLNO: row.SLNO,
//     Employee: row.Name,
//     ...Array.from({ length: 31 }, (_, i) => ({
//       [`Day${i + 1}`]: row[`Day${i + 1}`]
//     })).reduce((a, b) => ({ ...a, ...b }), {}),
//     Present: row.Present,
//     "Unscheduled Leave": row.UnPaidLeave,
//     "Scheduled Leave": row.PaidLeave,
//     Holidays: row.Holidays,
//     Weekoff: row.Weekoff,
//     Total: row.Total
//   }));

//   XLSX.utils.sheet_add_json(worksheet, excelData, { origin: "A4" });

//   /* ================= STYLES ================= */
//   const range = XLSX.utils.decode_range(worksheet["!ref"]);

//   const tableHeaderStyle = {
//     font: { bold: true },
//     alignment: { horizontal: "center" },
//     fill: { fgColor: { rgb: "D9D9D9" } },
//     border: {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" }
//     }
//   };

//   const oddRowStyle = {
//     alignment: { horizontal: "center" },
//     fill: { fgColor: { rgb: "FFFFFF" } },
//     border: {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" }
//     }
//   };

//   const evenRowStyle = {
//     alignment: { horizontal: "center" },
//     fill: { fgColor: { rgb: "EEF3FB" } }, // 👈 zebra color
//     border: {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" }
//     }
//   };

//   /* Table Header Row (row 5 → index 4) */
//   for (let C = range.s.c; C <= range.e.c; C++) {
//     const headerCell = XLSX.utils.encode_cell({ r: 3, c: C });
//     if (worksheet[headerCell]) worksheet[headerCell].s = tableHeaderStyle;
//   }

//   /* Table Body (Odd / Even rows) */
//   for (let R = 4; R <= range.e.r; R++) {
//     const rowStyle = (R % 2 === 0) ? evenRowStyle : oddRowStyle;

//     for (let C = range.s.c; C <= range.e.c; C++) {
//       const cell = XLSX.utils.encode_cell({ r: R, c: C });
//       if (worksheet[cell]) worksheet[cell].s = rowStyle;
//     }
//   }

//   /* ================= COLUMN WIDTH ================= */
// worksheet["!cols"] = [
//   { wch: 6 },   // SLNO
//   { wch: 20 },  // Employee
//   ...Array(31).fill({ wch: 5 }),
//   { wch: 10 },  // Present
//   { wch: 17 },  // Unscheduled Leave  ← wider
//   { wch: 15 },  // Scheduled Leave    ← wider
//   { wch: 10 },  // Holidays
//   { wch: 10 },  // Weekoff
//   { wch: 10 },  // Total
// ];

//   /* ================= WORKBOOK ================= */
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

//   XLSX.writeFile(
//     workbook,
//     `Attendance_${monthNames[filters.month - 1]}_${filters.year}.xlsx`
//   );
// };

// export default AttendanceHistoryExcel;








import * as XLSX from "xlsx-js-style";

export const AttendanceHistoryExcel = (data, filters, empData) => {
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
    // fill: { fgColor: { rgb: "4472C4" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      // top:    { style: "thin" },
      // bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const legendTextStyle = {
    font: { sz: 10 },
    fill: { fgColor: { rgb: "F2F2F2" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      // top:    { style: "thin" },
      // bottom: { style: "thin" },
      left:   { style: "thin" },
      right:  { style: "thin" }
    }
  };

  const summaryHeadingStyle = {
    font: { bold: true, sz: 11, color: { rgb: "4472C4" } },
    // fill: { fgColor: { rgb: "375623" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      // top:    { style: "thin" },
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
  const LAST_ATT_COL  = 38;
  const SUMMARY_LAST_COL = 7; // A(0)..H(7)

  /* ===============================================================
     ROW 1 — REPORT HEADER
  =============================================================== */
  const titleCell = "A1";
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [[`Monthly Attendance Report (${monthNames[filters.month - 1]} - ${filters.year})`]],
    { origin: titleCell }
  );
  worksheet[titleCell].s = reportHeaderStyle;
  merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: LAST_ATT_COL } });

  /* ===============================================================
     ROW 3 — ATTENDANCE TABLE  (0-indexed row 2)
     Uses sheet_add_aoa so column order is GUARANTEED:
     SL# | Employee | Day1..Day31 | P | UL | SL | HOL | WO | Total
  =============================================================== */
  const ATT_HEADER_ROW = 2; // 0-indexed → Excel row 3

  const attHeaderRow = [
    "SL#", "Employee",
    ...Array.from({ length: 31 }, (_, i) => i + 1),
    "P", "UL", "SL", "HOL", "WO", "Total"
  ];

  const attDataRows = data.map(row => [
    row.SLNO,
    row.Name,
    ...Array.from({ length: 31 }, (_, i) => row[`Day${i + 1}`] ?? ""),
    row.Present,
    row.UnPaidLeave,
    row.PaidLeave,
    row.Holidays,
    row.Weekoff,
    row.Total
  ]);

  XLSX.utils.sheet_add_aoa(
    worksheet,
    [attHeaderRow, ...attDataRows],
    { origin: { r: ATT_HEADER_ROW, c: 0 } }
  );

  // Style — header row
  attHeaderRow.forEach((_, C) => {
    const cell = XLSX.utils.encode_cell({ r: ATT_HEADER_ROW, c: C });
    if (worksheet[cell]) worksheet[cell].s = tableHeaderStyle;
  });

  // Style — data rows (zebra)
  const ATT_BODY_END = ATT_HEADER_ROW + data.length; // last attendance data row (0-indexed)
  for (let R = ATT_HEADER_ROW + 1; R <= ATT_BODY_END; R++) {
    const base = (R % 2 === 0) ? evenRowStyle : oddRowStyle;
    for (let C = 0; C < attHeaderRow.length; C++) {
      const cell = XLSX.utils.encode_cell({ r: R, c: C });
      if (worksheet[cell]) {
        worksheet[cell].s = (C === 1) ? leftAlignStyle(base) : base;
      }
    }
  }

  /* ===============================================================
     LEGEND SECTION  (2 rows below last attendance row)
  =============================================================== */
  const LEGEND_HEADING_ROW = ATT_BODY_END + 2;
  const LEGEND_TEXT_ROW    = LEGEND_HEADING_ROW + 1;

  // "Legend" heading
  const legendHeadCell = XLSX.utils.encode_cell({ r: LEGEND_HEADING_ROW, c: 0 });
  worksheet[legendHeadCell] = { v: "Legend", t: "s", s: legendHeadingStyle };
  merges.push({ s: { r: LEGEND_HEADING_ROW, c: 0 }, e: { r: LEGEND_HEADING_ROW, c: LAST_ATT_COL } });

  // Single-row legend text (matches image — all items on one line)
  const legendText =
    "P -> Present          UL -> Unscheduled Leave          SH -> Second Half          " +
    "M -> Medical Leave          HO -> Holiday          WO -> Week Off          " +
    "CL -> Casual Leave          IR -> IR Regular";

  const legendTextCell = XLSX.utils.encode_cell({ r: LEGEND_TEXT_ROW, c: 0 });
  worksheet[legendTextCell] = { v: legendText, t: "s", s: legendTextStyle };
  merges.push({ s: { r: LEGEND_TEXT_ROW, c: 0 }, e: { r: LEGEND_TEXT_ROW, c: LAST_ATT_COL } });

  /* ===============================================================
     SUMMARY SECTION  (2 rows below legend text)
  =============================================================== */
  const SUM_HEADING_ROW = LEGEND_TEXT_ROW + 2;
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

  // Summary data rows (zebra, columns A–H only, center aligned)
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
     COLUMN WIDTHS
     Index:  0=SL#  1=Employee  2-32=Day1-31  33=P  34=UL  35=SL
             36=HOL  37=WO  38=Total
     Note:   Col index 7 is also the "Total" col in the summary
             section (A–H), so we give it a wider width.
  =============================================================== */
  worksheet["!cols"] = [
    { wch: 6  },                   // 0:  SL#
    { wch: 22 },                   // 1:  Employee
    ...Array(31).fill({ wch: 4 }), // 2-32: Day 1–31
    { wch: 7  },                   // 33: P
    { wch: 18 },                   // 34: UL (Unscheduled Leave)
    { wch: 15 },                   // 35: SL (Scheduled Leave)
    { wch: 7  },                   // 36: HOL
    { wch: 7  },                   // 37: WO
    { wch: 12 },                   // 38: Total
  ];
  // Col 7 (H) = "Total" in summary table — needs extra width
  worksheet["!cols"][7] = { wch: 15 };

  /* ===============================================================
     SHEET REF + MERGES
  =============================================================== */
  const LAST_ROW = SUM_HEADER_ROW + data.length;
  worksheet["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: LAST_ROW, c: LAST_ATT_COL }
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

export default AttendanceHistoryExcel;











// import * as XLSX from "xlsx";

// export const AttendanceHistoryExcel = (data, filters, empData) => {
//   if (!Array.isArray(data) || data.length === 0) return;

//   const monthNames = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   const worksheet = XLSX.utils.aoa_to_sheet([]);


//   const headerInfo = [
//     ["Attendance Report"],
//     [`Employee: ${empData?.Name || "All Employees"}`],
//     [`Month: ${monthNames[filters.month - 1]}  Year: ${filters.year}`],
//     []
//   ];

//   XLSX.utils.sheet_add_aoa(worksheet, headerInfo, {
//     origin: "I1"
//   });

//   const excelData = data.map((row) => ({
//     SLNO: row.SLNO,
//     Employee: row.Name,
//     Day1: row.Day1,
//     Day2: row.Day2,
//     Day3: row.Day3,
//     Day4: row.Day4,
//     Day5: row.Day5,
//     Day6: row.Day6,
//     Day7: row.Day7,
//     Day8: row.Day8,
//     Day9: row.Day9,
//     Day10: row.Day10,
//     Day11: row.Day11,
//     Day12: row.Day12,
//     Day13: row.Day13,
//     Day14: row.Day14,
//     Day15: row.Day15,
//     Day16: row.Day16,
//     Day17: row.Day17,
//     Day18: row.Day18,
//     Day19: row.Day19,
//     Day20: row.Day20,
//     Day21: row.Day21,
//     Day22: row.Day22,
//     Day23: row.Day23,
//     Day24: row.Day24,
//     Day25: row.Day25,
//     Day26: row.Day26,
//     Day27: row.Day27,
//     Day28: row.Day28,
//     Day29: row.Day29,
//     Day30: row.Day30,
//     Day31: row.Day31,
//     Present: row.Present,
//     "Unpaid Leave": row.UNPAID_LEAVE,
//     Absent: row.Absent,
//     Holidays: row.HOLIDAYS,
//     Weekoff: row.Weekoff,
//     Total: row.Total,
//   }));

//   XLSX.utils.sheet_add_json(worksheet, excelData, {
//     origin: "A5"
//   });

//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

//   XLSX.writeFile(
//     workbook,
//     `Attendance_${monthNames[filters.month - 1]}_${filters.year}.xlsx`
//   );
// };

// export default AttendanceHistoryExcel;
