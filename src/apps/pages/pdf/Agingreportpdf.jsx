import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// ===================== STYLES (Black & White only) =====================
const styles = StyleSheet.create({
    page: {
        paddingTop: 80,
        paddingBottom: 70,
        paddingHorizontal: 20,
        fontSize: 9,
        color: "#000",
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

    headerContainer: {
        alignItems: "center",
        marginTop: 15,
        marginBottom: 8,
    },
    headerText: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
        color: "#000",
    },
    subHeaderText: {
        fontSize: 9,
        textAlign: "center",
        marginBottom: 8,
        color: "#000",
    },

    /* FOOTER */
    footerWrapper: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    pageNumber: {
        position: "absolute",
        bottom: 8,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 8,
        color: "#000",
    },

    /* TABLE
       NOTE: no border on the outer container - a bordered container that
       gets split across a page break only draws its border on the first
       fragment in react-pdf, so continuation pages would be missing the
       top edge. Instead every row carries its own left/right border, and
       the header row additionally carries the top border, so each page
       fragment is fully self-bordered. */
    table: {
        display: "table",
        width: "100%",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        borderLeftWidth: 1,
        borderLeftColor: "#000",
        borderRightWidth: 1,
        borderRightColor: "#000",
    },

    tableHeaderRow: {
        borderTopWidth: 1,
        borderTopColor: "#000",
    },

    /* HEADERS - no background color, just black border/text */
    tableColHeader: {
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        fontSize: 10,
    },
    tableColHeaderLast: {
        padding: 3,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        fontSize: 10,
    },

    /* BODY */
    tableCol: {
        borderRightWidth: 1,
        borderRightColor: "#000",
        padding: 3,
        textAlign: "center",
        color: "#000",
    },
    tableColLast: {
        padding: 3,
        textAlign: "right",
        color: "#000",
    },

    /* SUMMARY */
    summaryContainer: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#000",
    },
    summaryRow: {
        flexDirection: "row",
    },
    summaryHeaderCell: {
        flex: 1,
        padding: 6,
        fontSize: 10,
        fontWeight: 700,
        textAlign: "center",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        color: "#000",
    },
    summaryValueCell: {
        flex: 1,
        padding: 6,
        fontSize: 10,
        textAlign: "center",
        borderRightWidth: 1,
        borderColor: "#000",
        color: "#000",
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
        marginBottom: 6,
        color: "#000",
    },
});

const toFixed2 = (val) => Number(val || 0).toFixed(2);

// Table header row, rendered with `fixed` so react-pdf re-draws it
// at the top of every page the table overflows onto.
const TableHeaderRow = () => (
    <View style={[styles.tableRow, styles.tableHeaderRow]} fixed>
        <Text style={[styles.tableColHeader, { width: "5%" }]}>SL#</Text>
        <Text style={[styles.tableColHeader, { width: "40%" }]}>Party Name</Text>
        <Text style={[styles.tableColHeader, { width: "15%" }]}>Order Date</Text>
        <Text style={[styles.tableColHeader, { width: "10%" }]}>Days</Text>
        <Text style={[styles.tableColHeader, { width: "15%" }]}>Balance</Text>
        <Text style={[styles.tableColHeaderLast, { width: "15%" }]}>
            Mobile Number
        </Text>
    </View>
);

const AgingPdf = ({ data = [], filters = {}, footerHeight = 60 }) => {
    const totalBalance = data.reduce((sum, r) => sum + Number(r.Balance || 0), 0);
    const totalParties = data.length;

    const sortLabel =
        filters.PartySort === "ByDays"
            ? "By Days"
            : filters.PartySort === "ByAmount"
                ? "By Amount"
                : "";

    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <Document>
            {/*
              Single Page with wrap enabled (default). react-pdf will
              automatically create additional physical pages whenever the
              content (table rows / summary) overflows, and will repeat
              anything marked `fixed` (header image, table header row,
              footer image, page number) on each new page it creates.
            */}
            <Page
                size="A4"
                wrap
                style={{
                    fontSize: 9,
                    color: "#000",
                    paddingTop: 80,
                    paddingBottom: footerHeight + 25,
                    paddingHorizontal: 20,
                }}
            >
                {/* HEADER IMAGE - repeats on every page */}
                <View fixed style={styles.headerWrapper}>
                    {filters.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.headerImage}
                        />
                    )}
                </View>

                {/* TITLE - not fixed, so it naturally appears once, at the
                    start of the flow (top of page 1) and does not repeat */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Aging Report</Text>
                    {sortLabel ? (
                        <Text style={styles.subHeaderText}>
                            Party Aging Details {sortLabel} as on {currentDate}
                        </Text>
                    ) : null}
                </View>

                {/* TABLE */}
                <View style={styles.table}>
                    <TableHeaderRow />

                    {data.map((row, i) => {
                        const balanceValue = Number(row.Balance || 0);
                        const displayBalance =
                            (balanceValue < 0 ? "-" : "") +
                            Math.abs(balanceValue).toFixed(2);

                        return (
                            <View
                                key={row.RecordID ?? i}
                                // wrap={false} keeps a single row intact -
                                // react-pdf will push the whole row to the
                                // next page instead of splitting it in half
                                wrap={false}
                                style={styles.tableRow}
                            >
                                <Text
                                    style={[
                                        styles.tableCol,
                                        { width: "5%", textAlign: "right" },
                                    ]}
                                >
                                    {i + 1}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        { width: "40%", textAlign: "left" },
                                    ]}
                                >
                                    {row.PartyName}
                                </Text>
                                <Text style={[styles.tableCol, { width: "15%" }]}>
                                    {row.OrderDate}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        { width: "10%", textAlign: "right" },
                                    ]}
                                >
                                    {row.DaysDiff}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        { width: "15%", textAlign: "right" },
                                    ]}
                                >
                                    {displayBalance}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableColLast,
                                        { width: "15%", textAlign: "right" },
                                    ]}
                                >
                                    {row.PartyMobileNo}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* SUMMARY - not fixed, so it flows naturally right after
                    the last row, wherever that ends up landing */}
                <View style={{ marginTop: 4 }} wrap={false}>
                    <Text style={styles.summaryTitle}>Aging Summary</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryHeaderCell}>
                                Total Parties
                            </Text>
                            <Text
                                style={[
                                    styles.summaryHeaderCell,
                                    { borderRightWidth: 0 },
                                ]}
                            >
                                Total Balance
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryValueCell}>
                                {totalParties}
                            </Text>
                            <Text
                                style={[
                                    styles.summaryValueCell,
                                    { borderRightWidth: 0 },
                                ]}
                            >
                                {toFixed2(totalBalance)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* FOOTER IMAGE - repeats on every page */}
                <View
                    fixed
                    style={{
                        position: "absolute",
                        bottom: 25,
                        left: 0,
                        right: 0,
                        height: footerHeight,
                    }}
                >
                    {filters.FooterImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                </View>

                {/* PAGE NUMBER - repeats on every page, with correct
                    dynamic total page count via the render prop */}
                <Text
                    fixed
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `Page ${pageNumber} of ${totalPages}`
                    }
                />
            </Page>
        </Document>
    );
};

export default AgingPdf;


// import React from "react";
// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet,
//     Image,
// } from "@react-pdf/renderer";

// // ===================== STYLES (Black & White only) =====================
// const styles = StyleSheet.create({
//     page: {
//         paddingTop: 80,
//         paddingBottom: 70,
//         paddingHorizontal: 20,
//         fontSize: 9,
//         color: "#000",
//     },

//     /* HEADER */
//     headerWrapper: {
//         position: "absolute",
//         top: 15,
//         left: 20,
//         right: 20,
//         height: 50,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     headerImage: {
//         width: "100%",
//         height: 50,
//         objectFit: "contain",
//     },

//     headerContainer: {
//         alignItems: "center",
//         marginTop: 15,
//     },
//     headerText: {
//         fontSize: 13,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 8,
//         color: "#000",
//     },
//     subHeaderText: {
//         fontSize: 9,
//         textAlign: "center",
//         marginBottom: 8,
//         color: "#000",
//     },

//     /* FOOTER */
//     footerWrapper: {
//         position: "absolute",
//         bottom: 25,
//         left: 0,
//         right: 0,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     pageNumber: {
//         position: "absolute",
//         bottom: 8,
//         left: 0,
//         right: 0,
//         textAlign: "center",
//         fontSize: 8,
//         color: "#000",
//     },

//     /* TABLE */
//     table: {
//         display: "table",
//         width: "100%",
//         borderWidth: 1,
//         borderColor: "#000",
//     },

//     tableRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: "#000",
//     },

//     /* HEADERS - no background color, just black border/text */
//     tableColHeader: {
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 3,
//         fontWeight: "bold",
//         textAlign: "center",
//         color: "#000",
//         fontSize: 10,

//     },
//     tableColHeaderLast: {
//         padding: 3,
//         fontWeight: "bold",
//         textAlign: "center",
//         color: "#000",
//         fontSize: 10
//     },

//     /* BODY */
//     tableCol: {
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 3,
//         textAlign: "center",
//         color: "#000",
//     },
//     tableColLast: {
//         padding: 3,
//         textAlign: "right",
//         color: "#000",
//     },

//     /* SUMMARY */
//     summaryContainer: {
//         marginTop: 12,
//         borderWidth: 1,
//         borderColor: "#000",
//     },
//     summaryRow: {
//         flexDirection: "row",
//     },
//     summaryHeaderCell: {
//         flex: 1,
//         padding: 6,
//         fontSize: 10,
//         fontWeight: 700,
//         textAlign: "center",
//         borderRightWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#000",
//         color: "#000",
//     },
//     summaryValueCell: {
//         flex: 1,
//         padding: 6,
//         fontSize: 10,
//         textAlign: "center",
//         borderRightWidth: 1,
//         borderColor: "#000",
//         color: "#000",
//     },
//     summaryTitle: {
//         fontSize: 12,
//        fontWeight:"bold",
//         textAlign: "center",
//         marginTop: 15,
//         marginBottom: 6,
//         color: "#000",
//     },
// });

// const paginateData = (data) => {
//     const firstPage = data.slice(0, 30);
//     const otherPages = [];
//     for (let i = 30; i < data.length; i += 38) {
//         otherPages.push(data.slice(i, i + 38));
//     }
//     return [firstPage, ...otherPages];
// };


// const toFixed2 = (val) => Number(val || 0).toFixed(2);

// const AgingPdf = ({ data = [], filters = {}, footerHeight = 60 }) => {
//     const pages = paginateData(data);

//     const totalBalance = data.reduce((sum, r) => sum + Number(r.Balance || 0), 0);
//     const totalParties = data.length;

//     const sortLabel =
//         filters.PartySort === "ByDays"
//             ? "By Days"
//             : filters.PartySort === "ByAmount"
//                 ? "By Amount"
//                 : "";
//     const currentDate = new Date().toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//     });
//     return (
//         <Document>
//             {pages.map((pageData, pageIndex) => (
//                 <Page
//                     size="A4"
//                     key={pageIndex}
//                     style={{
//                         fontSize: 9,
//                         color: "#000",
//                         paddingTop: 80,
//                         paddingBottom: footerHeight + 25,
//                         paddingHorizontal: 20,
//                     }}
//                 >
//                     {/* HEADER IMAGE */}
//                     <View fixed style={styles.headerWrapper}>
//                         {filters.HeaderImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                                 style={styles.headerImage}
//                             />
//                         )}
//                     </View>

//                     {pageIndex === 0 && (
//                         <View style={styles.headerContainer}>
//                             <Text style={styles.headerText}>Aging Report
//                             </Text>

//                             {sortLabel ? (
//                                 <Text style={styles.subHeaderText}>Party Aging Details {sortLabel} as on {currentDate}
//                                 </Text>
//                             ) : null}
//                         </View>
//                     )}

//                     {/* TABLE */}
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <Text style={[styles.tableColHeader, { width: "5%", fontWeight: 700, }]}>SL#</Text>
//                             <Text style={[styles.tableColHeader, { width: "40%", fontWeight: 700 }]}>
//                                 Party Name
//                             </Text>
//                             <Text style={[styles.tableColHeader, { width: "15%", fontWeight: 700 }]}>
//                                 Order Date
//                             </Text>
//                             <Text style={[styles.tableColHeader, { width: "10%", fontWeight: 700 }]}>
//                                 Days
//                             </Text>
//                             <Text style={[styles.tableColHeader, { width: "15%", fontWeight: 700 }]}>
//                                 Balance
//                             </Text>
//                             <Text style={[styles.tableColHeaderLast, { width: "15%", fontWeight: 700 }]}>
//                                 Mobile Number
//                             </Text>
//                         </View>

//                         {pageData.map((row, i) => {
//                             const isLast = i === pageData.length - 1;
//                             const balanceValue = Number(row.Balance || 0);
//                             const displayBalance =
//                                 (balanceValue < 0 ? "-" : "") + Math.abs(balanceValue).toFixed(2);

//                             return (
//                                 <View
//                                     key={row.RecordID ?? i}
//                                     style={[styles.tableRow, isLast && { borderBottomWidth: 0 }]}
//                                 >
//                                     <Text style={[styles.tableCol, { width: "5%",textAlign: "right" }]}>
//                                         {(pageIndex === 0 ? 0 : 30 + (pageIndex - 1) * 38) + i + 1}
//                                     </Text>
//                                     <Text
//                                         style={[
//                                             styles.tableCol,
//                                             { width: "40%", textAlign: "left" },
//                                         ]}
//                                     >
//                                         {row.PartyName}
//                                     </Text>
//                                     <Text style={[styles.tableCol, { width: "15%" }]}>
//                                         {row.OrderDate}
//                                     </Text>
//                                     <Text style={[styles.tableCol, { width: "10%", textAlign: "right" }]}>
//                                         {row.DaysDiff}
//                                     </Text>
//                                     <Text style={[styles.tableCol, { width: "15%",textAlign: "right" }]}>
//                                         {displayBalance}
//                                     </Text>
//                                      <Text style={[styles.tableColLast, { width: "15%", textAlign: "right" }]}>
//                                         {row.PartyMobileNo}
//                                     </Text>
//                                 </View>
//                             );
//                         })}
//                     </View>

//                     {/* FOOTER IMAGE */}
//                     <View
//                         fixed
//                         style={{
//                             position: "absolute",
//                             bottom: 25,
//                             left: 0,
//                             right: 0,
//                             height: footerHeight,
//                         }}
//                     >
//                         {filters.FooterImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                                 style={{ width: "100%", height: "100%" }}
//                             />
//                         )}
//                     </View>

//                     <Text fixed style={styles.pageNumber}>
//                         Page {pageIndex + 1} of {pages.length}
//                     </Text>

//                     {/* SUMMARY - only on the last page */}
//                     {pageIndex === pages.length - 1 && (
//                         <View break={pages.length > 1 && pageData.length > 25}>
//                             <Text style={styles.summaryTitle}>Aging Summary</Text>
//                             <View style={styles.summaryContainer}>
//                                 <View style={styles.summaryRow}>
//                                     <Text style={styles.summaryHeaderCell}>Total Parties</Text>
//                                     <Text
//                                         style={[styles.summaryHeaderCell, { borderRightWidth: 0 }]}
//                                     >
//                                         Total Balance
//                                     </Text>
//                                 </View>
//                                 <View style={styles.summaryRow}>
//                                     <Text style={styles.summaryValueCell}>{totalParties}</Text>
//                                     <Text
//                                         style={[styles.summaryValueCell, { borderRightWidth: 0 }]}
//                                     >
//                                         {toFixed2(totalBalance)}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     )}
//                 </Page>
//             ))}
//         </Document>
//     );
// };

// export default AgingPdf;
