import * as XLSX from "xlsx-js-style";

export const TimesheetReportExcel = (
  data = [],
  filters = {},
  projectName = "",
  managerName = ""
) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data available to export");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const title = `Time Sheet - ${filters.EmployeeID || ""} (${monthNames[filters.Month - 1]} - ${filters.Year})`;

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });

  ws["A1"].s = {
    font: { bold: true, sz: 16 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } }
  };

  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];
  ws["!rows"] = [{ hpt: 30 }];

  XLSX.utils.sheet_add_aoa(
    ws,
    [
      [`Project: ${projectName}`],
      [`Manager: ${managerName}`],
      ["Comp → Completed || Appr → Approved"]
    ],
    { origin: "A3" }
  );

  ws["!merges"].push(
    { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: 6 } },
    { s: { r: 4, c: 0 }, e: { r: 4, c: 6 } }
  );

  ["A3", "A4", "A5"].forEach(cell => {
    ws[cell].s = { font: { bold: true } };
  });

  const headers = [
    "SL#", "Date", "Project", "Description",
    "Comp Date", "Appr By", "Appr Date"
  ];

  XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A7" });

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "EEF3FB" } },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    }
  };

  for (let c = 0; c < headers.length; c++) {
    ws[XLSX.utils.encode_cell({ r: 6, c })].s = headerStyle;
  }

  const tableData = data.map((row, i) => ([
    i + 1,
    row.Date || "",
    row.ProjectCode || "",
    [row.Description?.trim(), row.Comments?.trim()].filter(Boolean).join(" || "),
    row.CompletedDate?.split(" ")[0] || "",
    row.ManagerCode || "--",
    row.ApprovedDate || ""
  ]));

  XLSX.utils.sheet_add_aoa(ws, tableData, { origin: "A8" });

  const range = XLSX.utils.decode_range(ws["!ref"]);

  for (let r = 7; r <= range.e.r; r++) {
    for (let c = 0; c < headers.length; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      if (!ws[cell]) continue;

      ws[cell].s = {
        alignment: {
          horizontal: c === 3 ? "left" : "center",
          vertical: "center",
          wrapText: true
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" }
        }
      };
    }
  }

  ws["!cols"] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 12 },
    { wch: 92 },
    { wch: 12 },
    { wch: 14 },
    { wch: 14 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Timesheet_Report");

  XLSX.writeFile(
    wb,
    `Timesheet_${monthNames[filters.Month - 1]}_${filters.Year}.xlsx`
  );
};

export default TimesheetReportExcel;
