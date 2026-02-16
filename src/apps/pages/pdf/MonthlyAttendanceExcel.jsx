import * as XLSX from "xlsx-js-style";

export const MonthlyAttendanceExcel = (data, filters = {}) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const ws = XLSX.utils.aoa_to_sheet([]);

  /* ================= TITLE ================= */
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthIndex = Number(filters.month) - 1;
  const monthName = monthNames[monthIndex] || "";

  const title = `Attendance Report - ${filters.employee} (${monthName} - ${filters.year})`;

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });

  ws["A1"].s = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } }
  };

  /* 🔴 FIX: Merge must go till column I */
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }, // A1:I1
    { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } }  // A2:I2
  ];

  /* ================= PRM TEXT ================= */
  XLSX.utils.sheet_add_aoa(ws, [["Prm - Permission"]], { origin: "A2" });
  ws["A2"].s = { font: { bold: true } };

  /* ================= TABLE HEADER ================= */
  const tableHeader = [[
    "SL#",
    "In Date",
    "In Time",
    "Out Time",
    "Hours",
    "Prm (In Hrs)",
    "Status"
  ]];

  XLSX.utils.sheet_add_aoa(ws, tableHeader, { origin: "A4" });

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "EEF3FB" } },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    }
  };

  for (let c = 0; c <= 6; c++) {
    const cell = XLSX.utils.encode_cell({ r: 3, c });
    ws[cell].s = headerStyle;
  }

  /* ================= TABLE DATA ================= */
  const tableData = data.map((row, i) => [
    i + 1,
    row.MonthDate || "",
    row.EmployeeCheckInTime || "",
    row.EmployeeCheckOutTime || "",
    row.NumberOfHoursWorked || "",
    row.PermissionHours || "",
    row.Status || ""
  ]);

  XLSX.utils.sheet_add_aoa(ws, tableData, { origin: "A5" });

  const startRow = 4;
  const endRow = startRow + tableData.length;

  for (let r = startRow; r < endRow; r++) {
    for (let c = 0; c <= 6; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      if (!ws[cell]) continue;

      ws[cell].s = {
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        },
        alignment: {
          horizontal: c === 0 || c >= 5 ? "center" : "left"
        }
      };
    }
  }

  /* ================= SUMMARY CALCULATIONS ================= */
  const totalPresent    = data.filter(r => r.Status === "Present").length;
  const totalAbsent     = data.filter(r => r.Status === "Absent").length;
  const totalHolidays   = data.filter(r => r.Status === "Holiday").length;
  const totalWeekOffs   = data.filter(r => r.Status === "Week Off").length;
  const totalCL         = data.filter(r => r.Status === "Casual Leave").length;
  const totalSL         = data.filter(r => r.Status === "Sick Leave").length;
  const totalML         = data.filter(r => r.Status === "Medical Leave").length;
const totalPermission = data.filter(r => r.PermissionHours).length;
  // Leave segregation (example)
  const leaveSummary = {
    CL: data.filter(r => r.Status === "Casual Leave").length,
    SL: data.filter(r => r.Status === "Sick leave").length,
    EL: data.filter(r => r.Status === "Medical Leave").length,
  };
  /* ================= SUMMARY SECTION ================= */
  const summaryTitleRow  = endRow + 2;
  const summaryHeaderRow = summaryTitleRow + 2;
  const summaryValueRow  = summaryHeaderRow + 1;

  const summaryColStart = 1; // B
  const summaryColEnd   = summaryColStart + 7; // B → I

  /* ===== Summary Title ===== */
  XLSX.utils.sheet_add_aoa(
    ws,
    [["Attendance Total Summary"]],
    { origin: XLSX.utils.encode_cell({ r: summaryTitleRow, c: summaryColStart }) }
  );

  ws["!merges"].push({
    s: { r: summaryTitleRow, c: summaryColStart },
    e: { r: summaryTitleRow, c: summaryColEnd }
  });

  ws[XLSX.utils.encode_cell({ r: summaryTitleRow, c: summaryColStart })].s = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } }
  };

  /* ===== Summary Headers ===== */
  const summaryHeaders = [
    "Present",
    "Absent",
    "Holidays",
    "Week Off",
    "Casual Leave",
    "Sick Leave",
    "Medical Leave",
    "Permission"
  ];

  XLSX.utils.sheet_add_aoa(
    ws,
    [summaryHeaders],
    { origin: XLSX.utils.encode_cell({ r: summaryHeaderRow, c: summaryColStart }) }
  );

  /* ===== Summary Values ===== */
  const summaryValues = [
    totalPresent,
    totalAbsent,
    totalHolidays,
    totalWeekOffs,
    leaveSummary.CL, 
    leaveSummary.SL, 
    leaveSummary.EL,
    totalPermission
  ];

  XLSX.utils.sheet_add_aoa(
    ws,
    [summaryValues],
    { origin: XLSX.utils.encode_cell({ r: summaryValueRow, c: summaryColStart }) }
  );

  /* ===== Summary Styling ===== */
  for (let r = summaryHeaderRow; r <= summaryValueRow; r++) {
    for (let c = summaryColStart; c <= summaryColEnd; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      const isHeader = r === summaryHeaderRow;

      ws[cell].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { bold: isHeader },
        fill: isHeader ? { fgColor: { rgb: "F2F2F2" } } : null,
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        }
      };
    }
  }

  /* ================= COLUMN WIDTH ================= */
  ws["!cols"] = [
    { wch: 7 },   // A
    { wch: 14 },  // B
    { wch: 20 },  // C
    { wch: 18 },  // D
    { wch: 14 },  // E
    { wch: 13 },  // F
    { wch: 12 },  // G
    { wch: 16 },  // H
    { wch: 14 }   // I (Permission)
  ];

  /* ================= EXPORT ================= */
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Monthly Attendance");
  XLSX.writeFile(wb, "Attendance_Report.xlsx");
};

export default MonthlyAttendanceExcel;
