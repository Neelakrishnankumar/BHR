import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        // paddingTop: 20,
        // paddingLeft: 20,
        // paddingRight: 20,
        // paddingBottom: 40,
        paddingTop: 90,     // space for header image
        paddingBottom: 80,  // space for footer image
        paddingHorizontal: 20,
        fontSize: 9,
    },

    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 2000,
        marginTop: 5,
        marginBottom: 15,
        color: "#000",
    },
    overheadTitle: {
        fontSize: 12,
        fontWeight: 2000,
        marginBottom: 6,
        color: "#000"
    },
    projectName: {
        fontSize: 11,
        marginBottom: 4,
        fontWeight: 2000,
        color: "#000",
    },
    table: {
        display: "table",
        width: "100%",
        marginBottom: 8,
        // borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0, // 🚀 remove bottom border
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#000",
        minHeight: 20,
        alignItems: "stretch",
    },
    headerCell: {
        // padding: 4,
        paddingVertical: 3,
        paddingHorizontal: 3,
        fontWeight: 2000,
        backgroundColor: "#f0f0f0",
        // borderRightWidth: 1,
        // borderColor: "#000",
        textAlign: "center",
    },
    headerCellstatus: {
        // padding: 4,
        paddingVertical: 3,
        paddingHorizontal: 3,
        fontWeight: 2000,
        backgroundColor: "#f0f0f0",
        // borderRightWidth: 1,
        borderColor: "#000",
        textAlign: "center",
    },
    cell: {
        // padding: 4,
        // borderRightWidth: 1,
        // borderColor: "#000",
        paddingVertical: 3,
        paddingHorizontal: 3,
        height: "100%",
    },
    rightCell: {
        // padding: 4,
        textAlign: "right",
        paddingVertical: 3,
        paddingHorizontal: 3,
        height: "100%",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        fontSize: 10,
        fontWeight: 2000,
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
        fontWeight: 2000,
        color: "#000",
    },
    footer: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 9,
        color: "grey",
    },
    headerContainer: {
        position: "absolute",
        top: 10,          // 🔥 move closer to top
        left: 0,
        right: 0,
        // bottom: 10,
        alignItems: "center",
        height: 60,
        justifyContent: "center",

    },
    logo: {
        width: 70,
        height: "auto",
        // marginLeft: "5px",
        objectFit: "contain",
    },
    footerWrapper: {
        position: "absolute",
        // bottom: 30,
        bottom: 30,
        left: 20,
        right: 20,
        height: 50,
    },

});

const groupByProduct = (rows) => {
    const result = {};
    rows.forEach((row) => {
        const product = row.Product || "";
        if (!result[product]) result[product] = [];
        result[product].push(row);
    });
    return result;
};


const groupByParty = (data) => {
    const result = {};
    data.forEach((row) => {
        const party = row.Party || "";
        if (!result[party]) result[party] = [];
        result[party].push(row);
    });
    return result;
};

const mergePartyRows = (rows) => {
    const map = {};

    rows.forEach((row) => {
        const key = [
            row.Party,
            row.OROrderDate,
            row.Price,          // Rate
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

const OrdEnqPartyPDF = ({ data = [], Product = [], Party = [], filters = {} }) => {
    // const productGroups = groupByProduct(data);
    // const partyGroups = groupByParty(data);
    const filteredData = data.filter(row => row.PurchaseCheckbox === "N");
    const partyGroups = groupByParty(filteredData);
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
    const hasDateRange = filters?.fromdate || filters?.todate;
    const getStatusDate = (row) => {
        const dateField = statusDateMap[row.Status];
        return dateField ? row[dateField] || "" : "";
    };
    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-GB") : "";
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>

                {/* HEADER */}
                <View style={styles.headerContainer} fixed>
                    {filters.HeaderImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                            style={styles.logo}
                        />
                    )}
                </View>
                <Text style={styles.title}>
                    {/* Order Enquiry - Party Based Report */}

                    {
                        !hasDateRange
                            ? "Order Enquiry - Party Based Report"
                            : `Order Enquiry - Party Based Report (${formatDate(filters?.fromdate || "")} - ${formatDate(filters?.todate || "")})`
                    }


                </Text>

                {Party?.length > 0 && (
                    <Text style={{ fontSize: 10, marginBottom: 4, fontWeight: "bold" }}>
                        Party : {Party.map(p => p.Name).join(", ")}
                    </Text>
                )}

                {Product?.length > 0 && (
                    <Text style={{ fontSize: 10, marginBottom: 8 }}>
                        Product : {Product.map(p => p.Name).join(", ")}
                    </Text>
                )}


                {/* ================= PARTY LOOP ================= */}
                {Object.entries(partyGroups).map(
                    ([partyName, partyRows], partyIndex) => {
                        const mergedRows = mergePartyRows(partyRows);
                        const partyTransactions = mergedRows.length;

                        const partyTotalAmount = partyRows.reduce(
                            (sum, r) => sum + Number(r.Amount || 0),
                            0
                        );

                        const chunkRows = (rows, size = 8) => {
                            const chunks = [];
                            for (let i = 0; i < rows.length; i += size) {
                                chunks.push(rows.slice(i, i + size));
                            }
                            return chunks;
                        };

                        const chunks = chunkRows(mergedRows, 8);

                        return (
                            <View key={partyIndex} style={{ marginBottom: 10 }}>

                                {/* ✅ HEADER + FIRST CHUNK TOGETHER */}
                                <View wrap={false}>
                                    <Text style={styles.overheadTitle}>
                                        Party Name : {partyName}
                                    </Text>

                                    <View style={styles.table}>
                                        {chunks.slice(0, 1).map((chunk, chunkIndex) => (
                                            <View key={chunkIndex}>

                                                {/* TABLE HEADER */}
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.headerCell, { flex: 0.5, borderRightWidth: 1 }]}>SL#</Text>
                                                    <Text style={[styles.headerCell, { flex: 1, borderRightWidth: 1 }]}>Date</Text>
                                                    <Text style={[styles.headerCell, { flex: 3.5, borderRightWidth: 1 }]}>Product</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.4, borderRightWidth: 1 }]}>Qty</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.8, borderRightWidth: 1 }]}>Rate</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.9, borderRightWidth: 1 }]}>Discount</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.7, borderRightWidth: 1 }]}>Value</Text>
                                                    {filters.ordertype === "" && (
                                                        <Text style={[styles.headerCell, { flex: 0.7, borderRightWidth: 1 }]}>
                                                            Order Type
                                                        </Text>
                                                    )}
                                                    <Text style={[styles.headerCellstatus, { flex: 1.5 }]}>Status</Text>
                                                </View>

                                                {/* ROWS */}
                                                {chunk.map((row, i) => (
                                                    <View key={i}
                                                        style={styles.tableRow}
                                                    // style={[
                                                    //     styles.tableRow,
                                                    //     i === chunk.length - 1 && { borderBottomWidth: 0 }
                                                    // ]}
                                                    >
                                                        <Text style={[styles.cell, { flex: 0.5, textAlign: "center", borderRightWidth: 1 }]}>
                                                            {i + 1}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 1, textAlign: "center", borderRightWidth: 1 }]}>
                                                            {formatDate(row.OROrderDate)}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 3.5, borderRightWidth: 1 }]}>
                                                            {row.Product}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 0.4, textAlign: "right", borderRightWidth: 1 }]}>
                                                            {row.Quantity}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 0.8, textAlign: "right", borderRightWidth: 1 }]}>
                                                            {row.Price}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 0.9, textAlign: "right", borderRightWidth: 1 }]}>
                                                            {row.Discount}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 0.7, textAlign: "right", borderRightWidth: 1 }]}>
                                                            {row.Amount ? row.Amount.toFixed(2) : ""}
                                                        </Text>
                                                        {filters.ordertype === "" && (
                                                            <Text style={[styles.cell, { flex: 0.7, borderRightWidth: 1 }]}>
                                                                {row.TypeOQ}
                                                            </Text>
                                                        )}
                                                        <Text style={[styles.cell, { flex: 1.5 }]}>
                                                            {row.Status}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* ✅ REMAINING CHUNKS */}
                                {chunks.slice(1).map((chunk, chunkIndex) => {
                                    const actualIndex = chunkIndex + 1;
                                    const isLastChunk = actualIndex === chunks.length - 1;

                                    return (
                                        <View key={actualIndex} wrap={false}>
                                            <View style={styles.table}>
                                                <View style={[styles.tableRow, { borderTopWidth: 1 }]}>
                                                    <Text style={[styles.headerCell, { flex: 0.5, borderRightWidth: 1 }]}>SL#</Text>
                                                    <Text style={[styles.headerCell, { flex: 1, borderRightWidth: 1 }]}>Date</Text>
                                                    <Text style={[styles.headerCell, { flex: 3.5, borderRightWidth: 1 }]}>Product</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.4, borderRightWidth: 1 }]}>Qty</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.8, borderRightWidth: 1 }]}>Rate</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.9, borderRightWidth: 1 }]}>Discount</Text>
                                                    <Text style={[styles.headerCell, { flex: 0.7, borderRightWidth: 1 }]}>Value</Text>
                                                    {filters.ordertype === "" && (
                                                        <Text style={[styles.headerCell, { flex: 0.7, borderRightWidth: 1 }]}>
                                                            Order Type
                                                        </Text>
                                                    )}
                                                    <Text style={[styles.headerCellstatus, { flex: 1.5 }]}>Status</Text>
                                                </View>

                                                {chunk.map((row, i) => {
                                                    const index = actualIndex * 8 + i;

                                                    return (
                                                        <View
                                                            key={i}
                                                            style={styles.tableRow}
                                                        // style={[
                                                        //     styles.tableRow,
                                                        //     i === chunk.length - 1 && { borderBottomWidth: 0 }
                                                        // ]}
                                                        >
                                                            <Text style={[styles.cell, { flex: 0.5, textAlign: "center", borderRightWidth: 1 }]}>
                                                                {index + 1}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 1, textAlign: "center", borderRightWidth: 1 }]}>
                                                                {formatDate(row.OROrderDate)}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 3.5, borderRightWidth: 1 }]}>
                                                                {row.Product}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 0.4, textAlign: "right", borderRightWidth: 1 }]}>
                                                                {row.Quantity}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 0.8, textAlign: "right", borderRightWidth: 1 }]}>
                                                                {row.Price}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 0.9, textAlign: "right", borderRightWidth: 1 }]}>
                                                                {row.Discount}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 0.7, textAlign: "right", borderRightWidth: 1 }]}>
                                                                {row.Amount}
                                                            </Text>
                                                            {filters.ordertype === "" && (
                                                                <Text style={[styles.cell, { flex: 0.7, borderRightWidth: 1 }]}>
                                                                    {row.TypeOQ}
                                                                </Text>
                                                            )}
                                                            <Text style={[styles.cell, { flex: 1.5 }]}>
                                                                {row.Status}
                                                            </Text>
                                                        </View>
                                                    );
                                                })}

                                                {isLastChunk && (
                                                    <View style={[styles.tableRow, { borderBottomWidth: 0 }]} wrap={false}>
                                                        <Text style={{ flex: 0.5 }} />
                                                        <Text style={{ flex: 1 }} />
                                                        <Text style={{ flex: 3.5, textAlign: "right", fontWeight: "bold" }}>
                                                            {/* Total */}
                                                        </Text>
                                                        <Text style={{ flex: 0.4 }} />
                                                        <Text style={{ flex: 0.8 }} />
                                                        <Text style={{ flex: 0.9 }} />
                                                        <Text style={{ flex: 0.7, textAlign: "right", fontWeight: "bold" }}>
                                                            {partyTotalAmount.toFixed(2)}
                                                        </Text>
                                                        {filters.ordertype === "" && <Text style={{ flex: 0.7 }} />}
                                                        <Text style={{ flex: 1.5 }} />
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    );
                                })}

                                {/* SUMMARY */}
                                <View wrap={false}>
                                    <View style={styles.projectSummary}>
                                        <Text>Party Name : {partyName}</Text>
                                        <Text>Transaction Count : {partyTransactions}</Text>
                                        <Text>Total Amount : {partyTotalAmount.toFixed(2)}</Text>
                                    </View>
                                </View>

                                <View style={styles.separator} />
                            </View>
                        );
                    }
                )}

                {/* FOOTER */}
                <View fixed style={styles.footerWrapper}>
                    {filters.FooterImg && (
                        <Image
                            src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                            style={{ width: "100%", height: 60 }}
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
            </Page >
        </Document>
    );
};

export default OrdEnqPartyPDF;
