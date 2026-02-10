import * as XLSX from "xlsx-js-style";

export const LeaveEntryRegisterExcel = (data = [], filters = {}) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const ws = XLSX.utils.aoa_to_sheet([]);

  /* ================= TITLE ================= */
  const title = `Leave Report (From ${filters.FromDate} to ${filters.ToDate})`;

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });

  ws["A1"].s = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } },
  };

  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // A1:F1
  ];

  /* ================= TABLE HEADER ================= */
  const tableHeaderRow = 3;

  const tableHeaders = [
    "SL#",
    "Employee",
    "Leave Type",
    "From",
    "To",
    "Status",
  ];

  XLSX.utils.sheet_add_aoa(ws, [tableHeaders], { origin: "A4" });

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "EEF3FB" } },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  for (let c = 0; c < tableHeaders.length; c++) {
    ws[XLSX.utils.encode_cell({ r: tableHeaderRow, c })].s = headerStyle;
  }

  /* ================= TABLE DATA ================= */
  const tableData = data.map((row, i) => [
    i + 1,
    row.Employee || "",
    row.LeaveName || "",
    row.FromDate || "",
    row.ToDate || "",
    row.Status || "",
  ]);

  const tableStartRow = tableHeaderRow + 1;

  XLSX.utils.sheet_add_aoa(ws, tableData, { origin: "A5" });

  const tableEndRow = tableStartRow + tableData.length - 1;

  for (let r = tableStartRow; r <= tableEndRow; r++) {
    for (let c = 0; c < tableHeaders.length; c++) {
      ws[XLSX.utils.encode_cell({ r, c })].s = {
        alignment: { horizontal: c === 0 ? "center" : "left" },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    }
  }

  /* ================= SUMMARY DATA ================= */
  const summaryMap = {};

  data.forEach(row => {
    if (!summaryMap[row.EmployeeID]) {
      summaryMap[row.EmployeeID] = {
        Employee: row.Employee,
        TotalLeave: Number(row.TotalLeaveDays || 0),
        ApprovedLeaveTaken: 0,
      };
    }

    if (row.Status === "Approved") {
      summaryMap[row.EmployeeID].ApprovedLeaveTaken +=
        Number(row.NumofHrsday || 0);
    }
  });

  const summaryRows = Object.values(summaryMap).map((row, i) => [
    i + 1,
    row.Employee,
    row.TotalLeave.toFixed(2),
    row.ApprovedLeaveTaken.toFixed(2),
    (row.TotalLeave - row.ApprovedLeaveTaken).toFixed(2),
  ]);

  /* ================= SUMMARY SECTION ================= */
  const summaryTitleRow = tableEndRow + 3;

  XLSX.utils.sheet_add_aoa(ws, [["Summary"]], {
    origin: XLSX.utils.encode_cell({ r: summaryTitleRow, c: 0 }),
  });

  ws["!merges"].push({
    s: { r: summaryTitleRow, c: 0 },
    e: { r: summaryTitleRow, c: 4 },
  });

  ws[XLSX.utils.encode_cell({ r: summaryTitleRow, c: 0 })].s = {
    font: { bold: true, sz: 14 },
  };

  const summaryHeaderRow = summaryTitleRow + 1;

  const summaryHeaders = [
    "SL#",
    "Employee",
    "Total Leave",
    "Leave Taken",
    "Leave Balance",
  ];

  XLSX.utils.sheet_add_aoa(ws, [summaryHeaders], {
    origin: XLSX.utils.encode_cell({ r: summaryHeaderRow, c: 0 }),
  });

  for (let c = 0; c < summaryHeaders.length; c++) {
    ws[XLSX.utils.encode_cell({ r: summaryHeaderRow, c })].s = headerStyle;
  }

  XLSX.utils.sheet_add_aoa(ws, summaryRows, {
    origin: XLSX.utils.encode_cell({ r: summaryHeaderRow + 1, c: 0 }),
  });

  for (let r = summaryHeaderRow + 1; r <= summaryHeaderRow + summaryRows.length; r++) {
    for (let c = 0; c < summaryHeaders.length; c++) {
      ws[XLSX.utils.encode_cell({ r, c })].s = {
        alignment: {
          horizontal: c === 0 ? "center" : c === 1 ? "left" : "right",
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    }
  }

  /* ================= COLUMN WIDTH ================= */
  ws["!cols"] = [
    { wch: 6 },
    { wch: 28 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
  ];

  /* ================= EXPORT ================= */
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leave Register");
  XLSX.writeFile(wb, "Leave_Register_Report.xlsx");
};

export default LeaveEntryRegisterExcel;
