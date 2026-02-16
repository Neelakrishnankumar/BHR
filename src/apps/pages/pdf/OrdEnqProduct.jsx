import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
const ROWS_PER_PAGE = 15;
const styles = StyleSheet.create({
    // page: {
    //    // paddingTop: 20,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    //    // paddingBottom: 40,
    //     paddingTop: 50,     // Header space
    // paddingBottom: 80, 
    //     fontSize: 9,
    // },
    page: {
  paddingTop: 120,      // 👈 enough space for header image
  paddingBottom: 120,   // 👈 enough space for footer image
  paddingLeft: 20,
  paddingRight: 20,
},

    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 15,
    },
    overheadTitle: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 6,
    },
    projectName: {
        fontSize: 10,
        marginBottom: 4,
        fontWeight: "bold",
    },
    table: {
        display: "table",
        width: "100%",
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#000",
    },
    headerCell: {
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        borderRightWidth: 1,
        borderColor: "#000",
        textAlign: "center",
    },
    headerCellstatus: {
        padding: 4,
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        // borderRightWidth: 1,
        borderColor: "#000",
        textAlign: "center",
    },
    cell: {
        padding: 4,
        borderRightWidth: 1,
        borderColor: "#000",
    },
    rightCell: {
        padding: 4,
        textAlign: "right",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        fontSize: 10,
        fontWeight: "bold",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#000",
        marginTop: 12,
        marginBottom: 12,
    },
    projectSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
        fontSize: 10,
        fontWeight: "bold",
    },
    footer: {
        position: "absolute",
        // bottom: 15,
            bottom: 85,   // slightly above footer

        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 9,
        color: "#000",
    },

       /* HEADER */
//   headerWrapper: {
//     position: "absolute",
//     top: 15,
//     left: 20,
//     right: 20,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
 headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,   // exact header height
  },
  headerImage: {
    width: "100%",
    height: 50,
    objectFit: "contain",
  },

 /* FOOTER */
    // footerWrapper: {
    //     position: "absolute",
    //     bottom: 30,
    //     left: 5,
    //     right: 5,     // forces full width
    //     height: 80,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
     footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // height: 80,  // exact footer height
  },

    footerImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
    },

});


const groupByProduct = (data) => {
    const result = {};
    data.forEach((row) => {
        const product = row.Product || "";
        if (!result[product]) result[product] = [];
        result[product].push(row);
    });
    return result;
};

const groupByParty = (rows) => {
    const result = {};
    rows.forEach((row) => {
        const party = row.Party || "";
        if (!result[party]) result[party] = [];
        result[party].push(row);
    });
    return result;
};
const mergeProductRows = (rows) => {
    const map = {};

    rows.forEach((row) => {
        const key = [
            row.Party,
            row.OROrderDate,
            row.Price,     // Rate
            row.Discount,
            row.Status,
        ].join("|");

        if (!map[key]) {
            map[key] = {
                ...row,
                Quantity: Number(row.Quantity || 0),
                Amount: Number(row.Amount || 0),
            };
        } else {
            map[key].Quantity += Number(row.Quantity || 0);
            map[key].Amount += Number(row.Amount || 0);
        }
    });

    return Object.values(map);
};

const OrdEnqProductPDF = ({ data = [], Product = [], Party = [], filters = {} }) => {
    const productGroups = groupByProduct(data);
    // console.log("productGroups");
    const statusDateMap = {
        Created: "OROrderDate",
        Process: "ORProcessDate",
        ReadyToDeliver: "ORTentativeDate",
        YetToDeliver: "ORTentativeDate",
        Picked: "ORPickedDate",
        Scheduled: "ORTentativeDate",
        Delivered: "ORDeliveryDate",
        Paid: "ORPaidDate",
    };

console.log(productGroups,"---log productGroups");

    const getStatusDate = (row) => {
        const dateField = statusDateMap[row.Status];
        return dateField ? row[dateField] || "" : "";
    };
    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-GB") : "";

    return (
    //     <Document>
    //         <Page size="A4" orientation="landscape" style={styles.page}>
    //    {/* HEADER */}
    //                 <View fixed style={styles.headerWrapper}>
    //                   {filters.HeaderImg && (
    //                     <Image
    //                       src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
    //                       style={styles.headerImage}
    //                     />
    //                   )}
    //                 </View>
    //             <Text style={styles.title}>
    //                 <Text style={styles.title}>
    //                     {`Order Enquiry - Product Based Report (${formatDate(filters?.fromdate || "")} - ${formatDate(filters?.todate || "")})`}
    //                 </Text>
    //                 {/* Order Enquiry - Product Based Report */}
    //             </Text>

    //             {Product?.length > 0 && (
    //                 <Text style={{ fontSize: 10, marginBottom: 4, fontWeight: "bold" }}>
    //                     Product : {Product.map(p => p.Name).join(", ")}
    //                 </Text>
    //             )}

    //             {Party?.length > 0 && (
    //                 <Text style={{ fontSize: 10, marginBottom: 8 }}>
    //                     Party : {Party.map(p => p.Name).join(", ")}
    //                 </Text>
    //             )}

    //             {/* ================= PRODUCT LOOP ================= */}
    //             {Object.entries(productGroups).map(
    //                 ([productName, productRows], productIndex) => {
    //                     const mergedRows = mergeProductRows(productRows);

    //                     const totalTransactions = mergedRows.length;
    //                     const totalAmount = mergedRows.reduce(
    //                         (sum, r) => sum + Number(r.Amount || 0),
    //                         0
    //                     );

    //                     // const totalTransactions = productRows.length;
    //                     // const totalAmount = productRows.reduce(
    //                     //     (sum, r) => sum + Number(r.Amount || 0),
    //                     //     0
    //                     // );

    //                     return (
    //                         <View key={productIndex} style={{ marginBottom: 12 }}>

    //                             <Text style={styles.overheadTitle}>
    //                                 Product Name : {productName}
    //                             </Text>

    //                             {/* SINGLE TABLE FOR ALL PARTIES */}
    //                             <View style={styles.table}>

    //                                 {/* HEADER */}
    //                                 <View style={styles.tableRow}>
    //                                     <Text style={[styles.headerCell, { flex: 0.5 }]}>SL#</Text>
    //                                     <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
    //                                     <Text style={[styles.headerCell, { flex: 3.5 }]}>Party</Text>
    //                                     <Text style={[styles.headerCell, { flex: 0.4 }]}>Qty</Text>
    //                                     <Text style={[styles.headerCell, { flex: 0.8 }]}>Rate</Text>
    //                                     <Text style={[styles.headerCell, { flex: 0.9 }]}>Discount</Text>
    //                                     <Text style={[styles.headerCell, { flex: 0.7 }]}>Value</Text>
    //                                     {filters.ordertype == "" ? (<Text style={[styles.headerCell, { flex: 0.7 }]}>Order Type</Text>) : null}
    //                                     <Text
    //                                         style={[
    //                                             styles.headerCellstatus,
    //                                             { flex: 1.5, textAlign: "center" },
    //                                         ]}
    //                                     >
    //                                         Status
    //                                     </Text>
    //                                 </View>

    //                                 {/* ROWS (ALL PARTIES TOGETHER) */}
    //                                 {/* {productRows.map((row, i) => ( */}
    //                                 {mergedRows.map((row, i) => (

    //                                     <View key={i} style={styles.tableRow}>
    //                                         <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
    //                                             {i + 1}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>
    //                                             {/* {formatDate(getStatusDate(row))} */}
    //                                             {formatDate(row.OROrderDate)}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 3.5, textAlign: "left" }]}>
    //                                             {row.Party}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 0.4, textAlign: "right" }]}>
    //                                             {row.Quantity}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 0.8, textAlign: "right" }]}>
    //                                             {row.Price}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 0.9, textAlign: "right" }]}>
    //                                             {row.Discount}
    //                                         </Text>

    //                                         <Text style={[styles.cell, { flex: 0.7, textAlign: "right" }]}>
    //                                             {row.Amount}
    //                                         </Text>
    //                                         {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.7, textAlign: "left" }]}>
    //                                             {row.TypeOQ}
    //                                         </Text>) : null}
    //                                         <Text style={[styles.cell, { flex: 1.5, textAlign: "left", borderRightWidth: 0 }]}>
    //                                             {row.Status}
    //                                         </Text>
    //                                     </View>
    //                                 ))}

    //                                 {/* PRODUCT TOTAL */}
    //                                 <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
    //                                     <Text style={[styles.cell, { flex: 0.5 }]} />
    //                                     <Text style={[styles.cell, { flex: 1 }]} />
    //                                     <Text
    //                                         style={[
    //                                             styles.cell,
    //                                             { flex: 3.5, fontWeight: "bold", textAlign: "right" },
    //                                         ]}
    //                                     >
    //                                         Total
    //                                     </Text>
    //                                     <Text style={[styles.cell, { flex: 0.4 }]} />
    //                                     <Text style={[styles.cell, { flex: 0.8 }]} />
    //                                     <Text style={[styles.cell, { flex: 0.9 }]} />
    //                                     <Text
    //                                         style={[
    //                                             styles.cell,
    //                                             { flex: 0.7, fontWeight: "bold", textAlign: "right" },
    //                                         ]}
    //                                     >
    //                                         {totalAmount.toFixed(2)}
    //                                     </Text>
    //                                     {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.7 }]} />) : null}
    //                                     <Text style={[styles.cell, { flex: 1.5, borderRightWidth: 0 }]} />
    //                                 </View>
    //                             </View>

    //                             {/* PRODUCT SUMMARY */}
    //                             <View style={styles.projectSummary}>
    //                                 <Text>Product Name : {productName}</Text>
    //                                 <Text>Transaction Count : {totalTransactions}</Text>
    //                                 <Text>Total Amount : {totalAmount.toFixed(2)}</Text>
    //                             </View>

    //                             <View style={styles.separator} />
    //                         </View>
    //                     );
    //                 }
    //             )}

    //                {/* FOOTER */}
    //                                             <View fixed style={styles.footerWrapper}>
    //                                               {filters.FooterImg && (
    //                                                 <Image
    //                                                   src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
    //                                                   style={styles.footerImage}
    //                                                 />
    //                                               )}
    //                                             </View>
    //             <Text
    //                 style={styles.footer}
    //                 fixed
    //                 render={({ pageNumber, totalPages }) =>
    //                     `Page ${pageNumber} of ${totalPages}`
    //                 }
    //             />


    //         </Page>
    //     </Document>
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>

        {/* ================= HEADER ================= */}
        <View fixed style={styles.headerWrapper}>
          {filters.HeaderImg && (
            <Image
              src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
              style={styles.headerImage}
            />
          )}
        </View>

        {/* ================= TITLE ================= */}
        <Text style={styles.title}>
          {`Order Enquiry - Product Based Report (${formatDate(
            filters?.fromdate
          )} - ${formatDate(filters?.todate)})`}
        </Text>

        {Product?.length > 0 && (
          <Text style={{ fontSize: 9, marginBottom: 4 }}>
            Product : {Product.map((p) => p.Name).join(", ")}
          </Text>
        )}

        {Party?.length > 0 && (
          <Text style={{ fontSize: 9, marginBottom: 8 }}>
            Party : {Party.map((p) => p.Name).join(", ")}
          </Text>
        )}

        {/* ================= PRODUCT LOOP ================= */}
       {/* ================= PRODUCT LOOP ================= */}
{Object.entries(productGroups).map(
  ([productName, productRows], productIndex) => {
    const mergedRows = mergeProductRows(productRows);

    const totalTransactions = mergedRows.length;
    const totalAmount = mergedRows.reduce(
      (sum, r) => sum + Number(r.Amount || 0),
      0
    );

    // 🔹 Split rows into chunks (15 per page)
    const chunks = [];
    for (let i = 0; i < mergedRows.length; i += ROWS_PER_PAGE) {
      chunks.push(mergedRows.slice(i, i + ROWS_PER_PAGE));
    }

    return chunks.map((chunk, chunkIndex) => {
      const isLastPage = chunkIndex === chunks.length - 1;

      return (
        <View
          key={`${productIndex}-${chunkIndex}`}
          break={chunkIndex !== 0} // 🔥 Start new page after 15 rows
          style={{ marginBottom: 12 }}
        >
          {/* ================= PRODUCT TITLE ================= */}
          <Text style={styles.overheadTitle}>
            Product Name : {productName}
          </Text>

          {/* ================= TABLE ================= */}
          <View style={styles.table}>
            {/* TABLE HEADER */}
            <View style={styles.tableRow}>
              <Text style={[styles.headerCell, { flex: 0.5 }]}>SL#</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
              <Text style={[styles.headerCell, { flex: 3 }]}>Party</Text>
              <Text style={[styles.headerCell, { flex: 0.6 }]}>Qty</Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>Rate</Text>
              <Text style={[styles.headerCell, { flex: 0.9 }]}>
                Discount
              </Text>
              <Text style={[styles.headerCell, { flex: 0.8 }]}>
                Value
              </Text>

              {filters.ordertype === "" && (
                <Text style={[styles.headerCell, { flex: 0.9 }]}>
                  Order Type
                </Text>
              )}

              <Text
                style={[
                  styles.headerCellstatus,
                  { flex: 1.2, textAlign: "center" },
                ]}
              >
                Status
              </Text>
            </View>

            {/* ================= TABLE ROWS ================= */}
            {chunk.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <Text
                  style={[
                    styles.cell,
                    { flex: 0.5, textAlign: "center" },
                  ]}
                >
                  {chunkIndex * ROWS_PER_PAGE + i + 1}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { flex: 1, textAlign: "center" },
                  ]}
                >
                  {formatDate(row.OROrderDate)}
                </Text>

                <Text style={[styles.cell, { flex: 3 }]}>
                  {row.Party}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { flex: 0.6, textAlign: "right" },
                  ]}
                >
                  {row.Quantity}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { flex: 0.8, textAlign: "right" },
                  ]}
                >
                  {row.Price}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { flex: 0.9, textAlign: "right" },
                  ]}
                >
                  {row.Discount}
                </Text>

                <Text
                  style={[
                    styles.cell,
                    { flex: 0.8, textAlign: "right" },
                  ]}
                >
                  {row.Amount}
                </Text>

                {filters.ordertype === "" && (
                  <Text style={[styles.cell, { flex: 0.9 }]}>
                    {row.TypeOQ}
                  </Text>
                )}

                <Text
                  style={[
                    styles.cell,
                    { flex: 1.2, borderRightWidth: 0 },
                  ]}
                >
                  {row.Status}
                </Text>
              </View>
            ))}

            {/* ================= PRODUCT TOTAL (Only Last Page) ================= */}
            {isLastPage && (
              <View style={styles.tableRow}>
                <Text style={[styles.cell, { flex: 0.5 }]} />
                <Text style={[styles.cell, { flex: 1 }]} />
                <Text
                  style={[
                    styles.cell,
                    {
                      flex: 3,
                      fontWeight: "bold",
                      textAlign: "right",
                    },
                  ]}
                >
                  Total
                </Text>
                <Text style={[styles.cell, { flex: 0.6 }]} />
                <Text style={[styles.cell, { flex: 0.8 }]} />
                <Text style={[styles.cell, { flex: 0.9 }]} />
                <Text
                  style={[
                    styles.cell,
                    {
                      flex: 0.8,
                      fontWeight: "bold",
                      textAlign: "right",
                    },
                  ]}
                >
                  {totalAmount.toFixed(2)}
                </Text>

                {filters.ordertype === "" && (
                  <Text style={[styles.cell, { flex: 0.9 }]} />
                )}

                <Text
                  style={[
                    styles.cell,
                    { flex: 1.2, borderRightWidth: 0 },
                  ]}
                />
              </View>
            )}
          </View>

          {/* ================= PRODUCT SUMMARY (Only Last Page) ================= */}
          {isLastPage && (
            <>
              <View style={styles.projectSummary}>
                <Text>
                  Transaction Count : {totalTransactions}
                </Text>
                <Text>
                  Total Amount : {totalAmount.toFixed(2)}
                </Text>
              </View>

              <View style={styles.separator} />
            </>
          )}
        </View>
      );
    });
  }
)}


        {/* ================= FOOTER ================= */}
        <View fixed style={styles.footerWrapper}>
          {filters.FooterImg && (
            <Image
              src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
              style={styles.footerImage}
            />
          )}
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
    );
};

export default OrdEnqProductPDF;

// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* =========================
//    SETTINGS
// ========================= */

// const DATA_ROWS_PER_PAGE = 11; // 11 + Total + Summary = 13 rows

// /* =========================
//    STYLES
// ========================= */

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 70,
//     paddingHorizontal: 20,
//     paddingBottom: 60,
//     fontSize: 9,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },

//   overheadTitle: {
//     fontSize: 11,
//     fontWeight: "bold",
//     marginBottom: 6,
//   },

//   table: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#000",
//   },

//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     minHeight: 20,
//     alignItems: "center",
//   },

//   headerCell: {
//     padding: 4,
//     fontWeight: "bold",
//     backgroundColor: "#f0f0f0",
//     borderRightWidth: 1,
//     borderColor: "#000",
//     textAlign: "center",
//   },

//   cell: {
//     padding: 4,
//     borderRightWidth: 1,
//     borderColor: "#000",
//   },

//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 6,
//     fontWeight: "bold",
//   },

//   footer: {
//     position: "absolute",
//     bottom: 15,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     fontSize: 9,
//   },

//   headerWrapper: {
//     position: "absolute",
//     top: 15,
//     left: 20,
//     right: 20,
//     height: 50,
//   },

//   footerWrapper: {
//     position: "absolute",
//     bottom: 30,
//     left: 20,
//     right: 20,
//     height: 60,
//   },
// });

// /* =========================
//    HELPERS
// ========================= */

// const groupByProduct = (data) => {
//   const result = {};
//   data.forEach((row) => {
//     const product = row.Product || "";
//     if (!result[product]) result[product] = [];
//     result[product].push(row);
//   });
//   return result;
// };

// const mergeProductRows = (rows) => {
//   const map = {};

//   rows.forEach((row) => {
//     const key = [
//       row.Party,
//       row.OROrderDate,
//       row.Price,
//       row.Discount,
//       row.Status,
//     ].join("|");

//     if (!map[key]) {
//       map[key] = {
//         ...row,
//         Quantity: Number(row.Quantity || 0),
//         Amount: Number(row.Amount || 0),
//       };
//     } else {
//       map[key].Quantity += Number(row.Quantity || 0);
//       map[key].Amount += Number(row.Amount || 0);
//     }
//   });

//   return Object.values(map);
// };

// const formatDate = (date) =>
//   date ? new Date(date).toLocaleDateString("en-GB") : "";

// /* =========================
//    MAIN COMPONENT
// ========================= */

// const OrdEnqProductPDF = ({ data = [], filters = {} }) => {
//   const productGroups = groupByProduct(data);

//   return (
//     <Document>
//       {Object.entries(productGroups).map(
//         ([productName, productRows], productIndex) => {
//           const mergedRows = mergeProductRows(productRows);

//           const totalTransactions = mergedRows.length;
//           const totalAmount = mergedRows.reduce(
//             (sum, r) => sum + Number(r.Amount || 0),
//             0
//           );

//           // 🔥 Split into pages (11 data rows each)
//           const chunks = [];
//           for (let i = 0; i < mergedRows.length; i += DATA_ROWS_PER_PAGE) {
//             chunks.push(mergedRows.slice(i, i + DATA_ROWS_PER_PAGE));
//           }

//           return chunks.map((chunk, chunkIndex) => {
//             const pageTotal = chunk.reduce(
//               (sum, r) => sum + Number(r.Amount || 0),
//               0
//             );

//             return (
//               <Page
//                 key={`${productIndex}-${chunkIndex}`}
//                 size="A4"
//                 orientation="landscape"
//                 style={styles.page}
//               >
//                 {/* HEADER */}
//                 <View fixed style={styles.headerWrapper}>
//                   {filters.HeaderImg && (
//                     <Image
//                       src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                       style={{ width: "100%", height: 50 }}
//                     />
//                   )}
//                 </View>

//                 {/* TITLE ONLY FIRST PAGE */}
//                 {productIndex === 0 && chunkIndex === 0 && (
//                   <Text style={styles.title}>
//                     Order Enquiry - Product Based Report
//                   </Text>
//                 )}

//                 {/* PRODUCT NAME */}
//                 <Text style={styles.overheadTitle}>
//                   Product Name : {productName}
//                 </Text>

//                 {/* TABLE */}
//                 <View style={styles.table} wrap={false}>
//                   {/* HEADER */}
//                   <View style={styles.tableRow}>
//                     <Text style={[styles.headerCell, { flex: 0.5 }]}>SL#</Text>
//                     <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
//                     <Text style={[styles.headerCell, { flex: 3.5 }]}>Party</Text>
//                     <Text style={[styles.headerCell, { flex: 0.6 }]}>Qty</Text>
//                     <Text style={[styles.headerCell, { flex: 0.8 }]}>Rate</Text>
//                     <Text style={[styles.headerCell, { flex: 0.9 }]}>Disc</Text>
//                     <Text style={[styles.headerCell, { flex: 0.9 }]}>Value</Text>
//                     <Text style={[styles.headerCell, { flex: 1.5 }]}>Status</Text>
//                   </View>

//                   {/* DATA ROWS */}
//                   {chunk.map((row, i) => (
//                     <View key={i} style={styles.tableRow}>
//                       <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
//                         {chunkIndex * DATA_ROWS_PER_PAGE + i + 1}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>
//                         {formatDate(row.OROrderDate)}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 3.5 }]}>
//                         {row.Party}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 0.6, textAlign: "right" }]}>
//                         {row.Quantity}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 0.8, textAlign: "right" }]}>
//                         {row.Price}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 0.9, textAlign: "right" }]}>
//                         {row.Discount}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 0.9, textAlign: "right" }]}>
//                         {row.Amount}
//                       </Text>
//                       <Text style={[styles.cell, { flex: 1.5, borderRightWidth: 0 }]}>
//                         {row.Status}
//                       </Text>
//                     </View>
//                   ))}

//                   {/* TOTAL ROW */}
//                   <View style={styles.tableRow}>
//                     <Text style={[styles.cell, { flex: 6.3 }]} />
//                     <Text
//                       style={[
//                         styles.cell,
//                         { flex: 1.5, textAlign: "right", fontWeight: "bold", borderRightWidth: 0 },
//                       ]}
//                     >
//                       {pageTotal.toFixed(2)}
//                     </Text>
//                   </View>
//                 </View>

//                 {/* SUMMARY LINE */}
//                 <View style={styles.summaryRow}>
//                   <Text>Product Name : {productName}</Text>
//                   <Text>Transaction Count : {totalTransactions}</Text>
//                   <Text>Total Amount : {totalAmount.toFixed(2)}</Text>
//                 </View>

//                 {/* FOOTER */}
//                 <View fixed style={styles.footerWrapper}>
//                   {filters.FooterImg && (
//                     <Image
//                       src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                       style={{ width: "100%", height: 60 }}
//                     />
//                   )}
//                 </View>

//                 <Text
//                   style={styles.footer}
//                   fixed
//                   render={({ pageNumber, totalPages }) =>
//                     `Page ${pageNumber} of ${totalPages}`
//                   }
//                 />
//               </Page>
//             );
//           });
//         }
//       )}
//     </Document>
//   );
// };

// export default OrdEnqProductPDF;

