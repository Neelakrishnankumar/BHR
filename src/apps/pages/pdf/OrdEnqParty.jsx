import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        fontSize: 9,
    },

    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 2000,
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
        fontWeight: 2000,
        backgroundColor: "#f0f0f0",
        borderRightWidth: 1,
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
    const partyGroups = groupByParty(data);
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
    const getStatusDate = (row) => {
        const dateField = statusDateMap[row.Status];
        return dateField ? row[dateField] || "" : "";
    };
    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-GB") : "";
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>

                <Text style={styles.title}>
                    {/* Order Enquiry - Party Based Report */}
                    {`Order Enquiry - Party Based Report (${formatDate(filters?.fromdate || "")} - ${formatDate(filters?.todate || "")})`}

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

                        // PARTY LEVEL TOTALS
                        // const partyTransactions = partyRows.length;
                        const partyTotalAmount = partyRows.reduce(
                            (sum, r) => sum + Number(r.Amount || 0),
                            0
                        );

                        return (
                            <View key={partyIndex} style={{ marginBottom: 14 }}>

                                <Text style={styles.overheadTitle}>
                                    Party Name : {partyName}
                                </Text>

                                {/* SINGLE TABLE FOR ALL PRODUCTS */}
                                <View style={styles.table}>

                                    {/* TABLE HEADER */}
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.headerCell, { flex: 0.5 }]}>S.No</Text>
                                        <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
                                        <Text style={[styles.headerCell, { flex: 3.5 }]}>Product</Text>
                                        <Text style={[styles.headerCell, { flex: 0.4 }]}>Qty</Text>
                                        <Text style={[styles.headerCell, { flex: 0.8 }]}>Rate</Text>
                                        <Text style={[styles.headerCell, { flex: 0.9 }]}>Discount</Text>
                                        <Text style={[styles.headerCell, { flex: 0.7 }]}>Value</Text>
                                        {filters.ordertype == "" ? (<Text style={[styles.headerCell, { flex: 0.7 }]}>Order Type</Text>) : null}

                                        <Text
                                            style={[styles.headerCell, { flex: 1.5, textAlign: "center" }]}
                                        >
                                            Status
                                        </Text>
                                    </View>

                                    {/* {partyRows.map((row, i) => (
                                        <View key={i} style={styles.tableRow}>
                                            <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
                                                {i + 1}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>
                                                
                                                {formatDate(row.OROrderDate)}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 3.5, textAlign: "left" }]}>
                                                {row.Product}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.4, textAlign: "right" }]}>
                                                {row.Quantity}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.8, textAlign: "right" }]}>
                                                {row.Price}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.9, textAlign: "right" }]}>
                                                {row.Discount}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 1, textAlign: "right" }]}>
                                                {row.Amount}
                                            </Text>
                                            {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.4, textAlign: "right" }]}>
                                                {row.TypeOQ}
                                            </Text>) : null}
                                            <Text
                                                style={[
                                                    styles.cell,
                                                    { flex: 1.5, textAlign: "left", borderRightWidth: 0 },
                                                ]}
                                            >
                                                {row.Status}
                                            </Text>
                                        </View>
                                    ))} */}
                                    {mergedRows.map((row, i) => (
                                        <View key={i} style={styles.tableRow}>
                                            <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
                                                {i + 1}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>
                                                {/* {formatDate(getStatusDate(row))} */}                                                
                                                {formatDate(row.OROrderDate)}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 3.5, textAlign: "left" }]}>
                                                {row.Product}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.4, textAlign: "right" }]}>
                                                {row.Quantity}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.8, textAlign: "right" }]}>
                                                {row.Price}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.9, textAlign: "right" }]}>
                                                {row.Discount}
                                            </Text>

                                            <Text style={[styles.cell, { flex: 0.7, textAlign: "right" }]}>
                                                {row.Amount}
                                            </Text>

                                            {filters.ordertype === "" && (
                                                <Text style={[styles.cell, { flex: 0.7, textAlign: "left" }]}>
                                                    {row.TypeOQ}
                                                </Text>
                                            )}

                                            <Text style={[styles.cell, { flex: 1.5, borderRightWidth: 0 }]}>
                                                {row.Status}
                                            </Text>
                                        </View>
                                    ))}


                                    {/* PARTY TOTAL */}
                                    <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                                        <Text style={[styles.cell, { flex: 0.5 }]} />
                                        <Text style={[styles.cell, { flex: 1 }]} />
                                        <Text
                                            style={[
                                                styles.cell,
                                                { flex: 3.5, fontWeight: "bold", textAlign: "right" },
                                            ]}
                                        >
                                            Total
                                        </Text>
                                        <Text style={[styles.cell, { flex: 0.4 }]} />
                                        <Text style={[styles.cell, { flex: 0.8 }]} />
                                        <Text style={[styles.cell, { flex: 0.9 }]} />
                                        <Text
                                            style={[
                                                styles.cell,
                                                { flex: 0.7, fontWeight: "bold", textAlign: "right" },
                                            ]}
                                        >
                                            {partyTotalAmount.toFixed(2)}
                                        </Text>
                                        {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.7 }]} />) : null}
                                        <Text style={[styles.cell, { flex: 1.5, borderRightWidth: 0 }]} />
                                    </View>
                                </View>

                                {/* PARTY SUMMARY */}
                                <View style={styles.projectSummary}>
                                    <Text>Party Name : {partyName}</Text>
                                    <Text>Transaction Count : {partyTransactions}</Text>
                                    <Text>Total Amount : {partyTotalAmount.toFixed(2)}</Text>
                                </View>

                                <View style={styles.separator} />
                            </View>
                        );
                    }
                )}

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

export default OrdEnqPartyPDF;
