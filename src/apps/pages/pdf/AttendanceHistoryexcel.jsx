import * as XLSX from "xlsx-js-style";

export const AttendanceHistoryExcel = (data, filters, empData) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const worksheet = XLSX.utils.aoa_to_sheet([]);

  /* ================= HEADER ================= */
  const headerInfo = [
    ["Attendance Report"],
    // [`Employee: ${empData?.Name || "All Employees"}`],
    [`Month: ${monthNames[filters.month - 1]} - Year: ${filters.year}`],
   
  ];

  XLSX.utils.sheet_add_aoa(worksheet, headerInfo, { origin: "A1" });

  const reportHeaderStyle = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "left", indent: 70 },
    fill: { fgColor: { rgb: "BDD7EE" } }
  };

  //if add one colum need A3
  ["A1", "A2"].forEach(cell => {
    worksheet[cell].s = reportHeaderStyle;
  });

  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 40 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 40 } },
    // { s: { r: 2, c: 0 }, e: { r: 2, c: 40 } }
  ];

  /* ================= DATA ================= */
  const excelData = data.map(row => ({
    SLNO: row.SLNO,
    Employee: row.Name,
    ...Array.from({ length: 31 }, (_, i) => ({
      [`Day${i + 1}`]: row[`Day${i + 1}`]
    })).reduce((a, b) => ({ ...a, ...b }), {}),
    Present: row.Present,
    Absent: row.Absent,
    Holidays: row.HOLIDAYS,
    Weekoff: row.Weekoff,
    Total: row.Total
  }));

  XLSX.utils.sheet_add_json(worksheet, excelData, { origin: "A4" });

  /* ================= STYLES ================= */
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  const tableHeaderStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "D9D9D9" } },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    }
  };

  const oddRowStyle = {
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "FFFFFF" } },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    }
  };

  const evenRowStyle = {
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "EEF3FB" } }, // 👈 zebra color
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    }
  };

  /* Table Header Row (row 5 → index 4) */
  for (let C = range.s.c; C <= range.e.c; C++) {
    const headerCell = XLSX.utils.encode_cell({ r: 3, c: C });
    if (worksheet[headerCell]) worksheet[headerCell].s = tableHeaderStyle;
  }

  /* Table Body (Odd / Even rows) */
  for (let R = 4; R <= range.e.r; R++) {
    const rowStyle = (R % 2 === 0) ? evenRowStyle : oddRowStyle;

    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = XLSX.utils.encode_cell({ r: R, c: C });
      if (worksheet[cell]) worksheet[cell].s = rowStyle;
    }
  }

  /* ================= COLUMN WIDTH ================= */
  worksheet["!cols"] = [
    { wch: 6 },   // SLNO
    { wch: 20 },  // Employee
    ...Array(31).fill({ wch: 5 }),
    { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }
  ];

  /* ================= WORKBOOK ================= */
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
