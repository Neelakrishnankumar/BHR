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
        bottom: 15,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 9,
        color: "grey",
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
                    <Text style={styles.title}>
                        {`Order Enquiry - Product Based Report (${formatDate(filters?.fromdate || "")} - ${formatDate(filters?.todate || "")})`}
                    </Text>
                    {/* Order Enquiry - Product Based Report */}
                </Text>

                {Product?.length > 0 && (
                    <Text style={{ fontSize: 10, marginBottom: 4, fontWeight: "bold" }}>
                        Product : {Product.map(p => p.Name).join(", ")}
                    </Text>
                )}

                {Party?.length > 0 && (
                    <Text style={{ fontSize: 10, marginBottom: 8 }}>
                        Party : {Party.map(p => p.Name).join(", ")}
                    </Text>
                )}

                {/* ================= PRODUCT LOOP ================= */}
                {Object.entries(productGroups).map(
                    ([productName, productRows], productIndex) => {
                        const mergedRows = mergeProductRows(productRows);

                        const totalTransactions = mergedRows.length;
                        const totalAmount = mergedRows.reduce(
                            (sum, r) => sum + Number(r.Amount || 0),
                            0
                        );

                        // const totalTransactions = productRows.length;
                        // const totalAmount = productRows.reduce(
                        //     (sum, r) => sum + Number(r.Amount || 0),
                        //     0
                        // );

                        return (
                            <View key={productIndex} style={{ marginBottom: 12 }}>

                                <Text style={styles.overheadTitle}>
                                    Product Name : {productName}
                                </Text>

                                {/* SINGLE TABLE FOR ALL PARTIES */}
                                <View style={styles.table}>

                                    {/* HEADER */}
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.headerCell, { flex: 0.5 }]}>S.No</Text>
                                        <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
                                        <Text style={[styles.headerCell, { flex: 3.5 }]}>Party</Text>
                                        <Text style={[styles.headerCell, { flex: 0.4 }]}>Qty</Text>
                                        <Text style={[styles.headerCell, { flex: 0.8 }]}>Rate</Text>
                                        <Text style={[styles.headerCell, { flex: 0.9 }]}>Discount</Text>
                                        <Text style={[styles.headerCell, { flex: 0.7 }]}>Value</Text>
                                        {filters.ordertype == "" ? (<Text style={[styles.headerCell, { flex: 0.7 }]}>Order Type</Text>) : null}
                                        <Text
                                            style={[
                                                styles.headerCell,
                                                { flex: 1.5, textAlign: "center" },
                                            ]}
                                        >
                                            Status
                                        </Text>
                                    </View>

                                    {/* ROWS (ALL PARTIES TOGETHER) */}
                                    {/* {productRows.map((row, i) => ( */}
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
                                                {row.Party}
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
                                            {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.7, textAlign: "left" }]}>
                                                {row.TypeOQ}
                                            </Text>) : null}
                                            <Text style={[styles.cell, { flex: 1.5, textAlign: "left", borderRightWidth: 0 }]}>
                                                {row.Status}
                                            </Text>
                                        </View>
                                    ))}

                                    {/* PRODUCT TOTAL */}
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
                                            {totalAmount.toFixed(2)}
                                        </Text>
                                        {filters.ordertype == "" ? (<Text style={[styles.cell, { flex: 0.7 }]} />) : null}
                                        <Text style={[styles.cell, { flex: 1.5, borderRightWidth: 0 }]} />
                                    </View>
                                </View>

                                {/* PRODUCT SUMMARY */}
                                <View style={styles.projectSummary}>
                                    <Text>Product Name : {productName}</Text>
                                    <Text>Transaction Count : {totalTransactions}</Text>
                                    <Text>Total Amount : {totalAmount.toFixed(2)}</Text>
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

export default OrdEnqProductPDF;
