import * as XLSX from "xlsx-js-style";

export const OrderEnqProdandPartyExcel = (
  data = [],
  filters = {}
) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data available to export");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);

  let currentRow = 0;

  /* ================= TITLE ================= */

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "";

  const title = `Order Enquiry - Product Based Report (${formatDate(
    filters?.fromdate
  )} - ${formatDate(filters?.todate)})`;

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: `A${currentRow + 1}` });

  ws[`A${currentRow + 1}`].s = {
    font: { bold: true, sz: 16 },
    alignment: { horizontal: "center", vertical: "center" },
  };

  ws["!merges"] = [
    { s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 8 } },
  ];

  currentRow += 2;

  /* ================= GROUP BY PRODUCT ================= */

  const groupByProduct = (data) => {
    const result = {};
    data.forEach((row) => {
      const product = row.Product || "";
      if (!result[product]) result[product] = [];
      result[product].push(row);
    });
    return result;
  };

  const productGroups = groupByProduct(data);

  /* ================= LOOP PRODUCTS ================= */

  Object.entries(productGroups).forEach(
    ([productName, productRows]) => {
      const totalTransactions = productRows.length;
      const totalAmount = productRows.reduce(
        (sum, r) => sum + Number(r.Amount || 0),
        0
      );

      /* ===== PRODUCT NAME ===== */

      XLSX.utils.sheet_add_aoa(
        ws,
        [[`Product Name : ${productName}`]],
        { origin: `A${currentRow + 1}` }
      );

      ws[`A${currentRow + 1}`].s = {
        font: { bold: true },
      };

      ws["!merges"].push({
        s: { r: currentRow, c: 0 },
        e: { r: currentRow, c: 8 },
      });

      currentRow++;

      /* ===== TABLE HEADER ===== */

      const headers = [
        "SL#",
        "Date",
        "Party",
        "Product Name",
        // "Party Name",
        "Qty",
        "Rate",
        "Discount",
        "Value",
        "Order Type",
        "Status",
      ];

      XLSX.utils.sheet_add_aoa(ws, [headers], {
        origin: `A${currentRow + 1}`,
      });

      headers.forEach((_, colIndex) => {
        const cell = XLSX.utils.encode_cell({
          r: currentRow,
          c: colIndex,
        });

        ws[cell].s = {
          font: { bold: true },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      });

      currentRow++;

      /* ===== TABLE DATA ===== */

      productRows.forEach((row, index) => {
        const rowData = [
          index + 1,
          formatDate(row.OROrderDate),
          row.Party,
          row.Name,
          row.Quantity,
          row.Price,
          row.Discount,
          row.Amount,
          row.TypeOQ,
          row.Status,
        ];

        XLSX.utils.sheet_add_aoa(ws, [rowData], {
          origin: `A${currentRow + 1}`,
        });

        rowData.forEach((_, colIndex) => {
          const cell = XLSX.utils.encode_cell({
            r: currentRow,
            c: colIndex,
          });

          ws[cell].s = {
            alignment: {
              horizontal:
                colIndex >= 3 && colIndex <= 6 ? "right" : "left",
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

      /* ===== TOTAL ROW ===== */

      XLSX.utils.sheet_add_aoa(
        ws,
        [["", "", "Total", "", "", "", totalAmount.toFixed(2)]],
        { origin: `A${currentRow + 1}` }
      );

      ws[`C${currentRow + 1}`].s = { font: { bold: true } };
      ws[`G${currentRow + 1}`].s = {
        font: { bold: true },
        alignment: { horizontal: "right" },
      };

      currentRow++;

      /* ===== SUMMARY ROW ===== */

      XLSX.utils.sheet_add_aoa(
        ws,
        [[
          `Product Name : ${productName}`,
          "",
          `Transaction Count : ${totalTransactions}`,
          "",
          "",
          "",
          "",
          "",
          `Total Amount : ${totalAmount.toFixed(2)}`
        ]],
        { origin: `A${currentRow + 1}` }
      );

      ws["!merges"].push(
        { s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } },
        { s: { r: currentRow, c: 2 }, e: { r: currentRow, c: 4 } },
        { s: { r: currentRow, c: 5 }, e: { r: currentRow, c: 8 } }
      );

      currentRow += 2;
    }
  );

  /* ================= COLUMN WIDTH ================= */

  ws["!cols"] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 25 },
    { wch: 25 },
    { wch: 8 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 14 },
    { wch: 15 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Order Enquiry");
  XLSX.writeFile(wb, "Order_Enquiry_Product_Report.xlsx");
};

export default OrderEnqProdandPartyExcel;
