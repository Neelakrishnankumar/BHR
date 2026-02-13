import * as XLSX from "xlsx-js-style";

export const LeavenquiryemExcel = (data = [], filters = {}) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const ws = XLSX.utils.aoa_to_sheet([]);
  ws["!merges"] = [];

  const isPermission = filters?.permission === "Y";

  /* ================= DATE FORMAT ================= */

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  /* ================= HEADER TITLE ================= */

  const title = isPermission
    ? `Permission Enquiry Report - ${filters?.EmpName} (${formatDate(filters.fromdate)} - ${formatDate(filters.todate)})`
    : `Leave Enquiry Report - ${filters?.EmpName} (${formatDate(filters.fromdate)} - ${formatDate(filters.todate)})`;

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });

  ws["!merges"].push({
    s: { r: 0, c: 0 },
    e: { r: 0, c: isPermission ? 6 : 5 },
  });

  ws["A1"].s = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "BDD7EE" } },
  };

  /* ================= EMPTY ROW AFTER HEADER ================= */
  // Row 2 automatically empty (we start table at row 3)

  /* ================= MAIN TABLE ================= */

  const headerRowNumber = 3;

  const headerRow = isPermission
    ? ["SL#", "Date", "From", "To", "Hours", "Reason", "Status"]
    : ["SL#", "Leave Type", "From", "To", "Reason", "Status"];

  XLSX.utils.sheet_add_aoa(ws, [headerRow], {
    origin: `A${headerRowNumber}`,
  });

  headerRow.forEach((_, c) => {
    const cell = XLSX.utils.encode_cell({ r: headerRowNumber - 1, c });
    ws[cell].s = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      fill: { fgColor: { rgb: "EEEEEE" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };
  });

  /* ================= TABLE DATA ================= */

  const tableData = data.map((row, i) =>
    isPermission
      ? [
          i + 1,
          row.DisplayPermissionDate || "",
          row.FromDate || "",
          row.ToDate || "",
          row.NumofHrsday || "",
          row.Reason || "",
          row.Status || "",
        ]
      : [
          i + 1,
          row.LeaveName || "",
          row.FromDate || "",
          row.ToDate || "",
          row.Comments || "",
          row.Status || "",
        ]
  );

  const dataStartRow = headerRowNumber + 1;

  XLSX.utils.sheet_add_aoa(ws, tableData, {
    origin: `A${dataStartRow}`,
  });

  tableData.forEach((row, rIndex) => {
    row.forEach((_, cIndex) => {
      const cell = XLSX.utils.encode_cell({
        r: dataStartRow - 1 + rIndex,
        c: cIndex,
      });

      if (!ws[cell]) return;

      ws[cell].s = {
        alignment: {
          horizontal:
            cIndex === 0 || cIndex === headerRow.length - 1
              ? "center"
              : "left",
          vertical: "center",
          wrapText: true,
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    });
  });

  const endRow = dataStartRow + tableData.length - 1;

  /* =========================================================
   ================= SUMMARY SECTION ========================
   ========================================================= */

const summaryCaptionRow = endRow + 2;
const summaryHeaderRow = summaryCaptionRow + 2;

/* ================= PERMISSION SUMMARY ================= */

if (isPermission) {

  const summary = {
    Applied: { days: new Set(), minutes: 0 },
    Approved: { days: new Set(), minutes: 0 },
    Query: { days: new Set(), minutes: 0 },
    Rejected: { days: new Set(), minutes: 0 },
  };

  /* ===== Calculate ===== */
  data.forEach((item) => {
    const status = item.Status;

    if (!summary[status]) return;

    // Unique days
    summary[status].days.add(item.DisplayPermissionDate);

    // Convert HH.MM to minutes
    const parts = item.NumofHrsday?.toString().split(".") || [];
    const hours = Number(parts[0] || 0);
    const mins = Number(parts[1] || 0);

    summary[status].minutes += (hours * 60) + mins;
  });

  /* ===== Convert minutes back to HH:MM ===== */
  Object.keys(summary).forEach((status) => {
    const totalMinutes = summary[status].minutes;

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    summary[status].formattedHours =
      `${hours}:${mins.toString().padStart(2, "0")}`;

    summary[status].totalDays =
      summary[status].days.size;
  });

  /* ===== Caption ===== */
  /* ===== Caption ===== */

XLSX.utils.sheet_add_aoa(ws, [["Permission Summary"]], {
  origin: `B${summaryCaptionRow}`,
});

/* Merge B → D */
ws["!merges"].push({
  s: { r: summaryCaptionRow - 1, c: 1 }, // B column (index 1)
  e: { r: summaryCaptionRow - 1, c: 3 }, // D column (index 3)
});

const captionCell = `B${summaryCaptionRow}`;

ws[captionCell].s = {
  font: { bold: true, sz: 12 },
  alignment: { horizontal: "left", vertical: "center" },
  fill: { fgColor: { rgb: "BDD7EE" } },
//   border: {
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//     left: { style: "thin" },
//     right: { style: "thin" },
//   },
};

//   XLSX.utils.sheet_add_aoa(ws, [["Permission Summary"]], {
//     origin: `B${summaryCaptionRow}`,
//   });

//   ws[`B${summaryCaptionRow}`].s = {
//     font: { bold: true, sz: 12 },
//     fill: { fgColor: { rgb: "BDD7EE" } },
//   };

  /* ===== Header ===== */
  XLSX.utils.sheet_add_aoa(
    ws,
    [["Status", "No of Days", "No of Hours"]],
    { origin: `B${summaryHeaderRow}` }
  );

  ["B", "C", "D"].forEach((col) => {
    ws[`${col}${summaryHeaderRow}`].s = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "E7E6E6" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };
  });

  /* ===== Fixed Order Rows ===== */
  const statusOrder = ["Applied", "Approved", "Query", "Rejected"];

  let currentRow = summaryHeaderRow + 1;

  statusOrder.forEach((status) => {

    const rowData = [
      status,
      summary[status].totalDays,
      summary[status].formattedHours
    ];

    XLSX.utils.sheet_add_aoa(ws, [rowData], {
      origin: `B${currentRow}`,
    });

    ["B", "C", "D"].forEach((col, i) => {
      ws[`${col}${currentRow}`].s = {
        alignment: {
          horizontal: i === 0 ? "left" : "center",
          vertical: "center",
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    });

    currentRow++;
  });
}


/* ================= LEAVE SUMMARY ================= */

if (!isPermission) {

  const totalLeave = { CL: 0, G: 0, M: 0 };
  const takenLeave = { CL: 0, G: 0, M: 0 };
  const balanceLeave = { CL: 0, G: 0, M: 0 };

  /* ===== Calculate From Data ===== */
  data.forEach((row) => {
    const type = row.Category; // CL / G / M

    if (!totalLeave.hasOwnProperty(type)) return;

    // Total leave from API
    totalLeave[type] = Number(row.TotalLeaveDays || 0);

    // Count approved rows
    if (row.Status === "Approved") {
      takenLeave[type] += 1;
    }
  });

  /* ===== Calculate Balance ===== */
  Object.keys(totalLeave).forEach((type) => {
    balanceLeave[type] = totalLeave[type] - takenLeave[type];
  });

  /* ===== Grand Totals ===== */
  const totalLeaveDays =
    totalLeave.CL + totalLeave.G + totalLeave.M;

  const takenLeaveDays =
    takenLeave.CL + takenLeave.G + takenLeave.M;

  const balanceLeaveDays =
    balanceLeave.CL + balanceLeave.G + balanceLeave.M;

  /* ===== Caption ===== */
  XLSX.utils.sheet_add_aoa(ws, [["Leave Summary"]], {
    origin: `B${summaryCaptionRow}`,
  });

  ws[`B${summaryCaptionRow}`].s = {
    font: { bold: true, sz: 12 },
    fill: { fgColor: { rgb: "BDD7EE" } },
  };

  /* ===== Header ===== */
  XLSX.utils.sheet_add_aoa(
    ws,
    [["Leave Type", "Total", "Taken", "Balance"]],
    { origin: `B${summaryHeaderRow}` }
  );

  ["B", "C", "D", "E"].forEach((col) => {
    ws[`${col}${summaryHeaderRow}`].s = {
      font: { bold: true },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "E7E6E6" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };
  });

  /* ===== Data Rows ===== */
  const summaryData = [
    ["Casual Leave", totalLeave.CL, takenLeave.CL, balanceLeave.CL],
    ["Sick Leave", totalLeave.G, takenLeave.G, balanceLeave.G],
    ["Medical Leave", totalLeave.M, takenLeave.M, balanceLeave.M],
  ];

  let currentRow = summaryHeaderRow + 1;

  summaryData.forEach((rowData) => {
    XLSX.utils.sheet_add_aoa(ws, [rowData], {
      origin: `B${currentRow}`,
    });

    ["B", "C", "D", "E"].forEach((col, i) => {
      ws[`${col}${currentRow}`].s = {
        alignment: {
          horizontal: i === 0 ? "left" : "center",
          vertical: "center",
        },
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    });

    currentRow++;
  });

  /* ===== Total Line ===== */
  XLSX.utils.sheet_add_aoa(
    ws,
    [[
      `Total Leave Days: ${totalLeaveDays}, Leave Taken Days: ${takenLeaveDays}, Balance Leave Days: ${balanceLeaveDays}`
    ]],
    { origin: `B${currentRow + 1}` }
  );
}


  /* ================= COLUMN WIDTH ================= */

  ws["!cols"] = isPermission
    ? [
        { wch: 4 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 },
        { wch: 10 },
        { wch: 35 },
        { wch: 15 },
      ]
    : [
        { wch: 4 },
        { wch: 18 },
        { wch: 12 },
        { wch: 12 },
        { wch: 35 },
        { wch: 15 },
      ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    ws,
    isPermission
      ? "Permission Enquiry Report"
      : "Leave Enquiry Report"
  );

  XLSX.writeFile(
    wb,
    isPermission
      ? "Permission Enquiry Report.xlsx"
      : "Leave Enquiry Report.xlsx"
  );
};

export default LeavenquiryemExcel;
