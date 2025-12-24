import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 9 },
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
});


const groupByProduct = (data) => {
    const result = {};
    data.forEach((row) => {
        const product = row.ProductName || "";
        if (!result[product]) result[product] = [];
        result[product].push(row);
    });
    return result;
};

const groupByParty = (rows) => {
    const result = {};
    rows.forEach((row) => {
        const party = row.PartyName || "Unknown Party";
        if (!result[party]) result[party] = [];
        result[party].push(row);
    });
    return result;
};

const OrdEnqProductPDF = ({ data = [], Product = [], Party = [] }) => {
    const productGroups = groupByProduct(data);

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>

                <Text style={styles.title}>
                    Order Enquiry Product Based Report
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

                        const overheadGroups = groupByParty(productRows);

                        // ✅ PRODUCT LEVEL TOTALS
                        const totalTransactions = productRows.length;
                        const totalAmount = productRows.reduce(
                            (sum, r) => sum + Number(r.Amount || 0),
                            0
                        );

                        return (
                            <View key={productIndex} style={{ marginBottom: 10 }}>

                                <Text style={styles.overheadTitle}>
                                    Product Name : {productName}
                                </Text>

                                {Object.entries(overheadGroups).map(
                                    ([overheadName, overheadRows], ohIndex) => {

                                        const overheadTotal = overheadRows.reduce(
                                            (sum, r) => sum + Number(r.Amount || 0),
                                            0
                                        );

                                        return (
                                            <View key={ohIndex} style={{ marginBottom: 10 }}>

                                                <Text style={styles.projectName}>
                                                    Party Name : {overheadName}
                                                </Text>

                                                <View style={styles.table}>

                                                    <View style={styles.tableRow}>
                                                        <Text style={[styles.headerCell, { flex: 0.5 }]}>S.No</Text>
                                                        <Text style={[styles.headerCell, { flex: 4.5 }]}>Name</Text>
                                                        <Text style={[styles.headerCell, { flex: 1 }]}>Qty</Text>
                                                        <Text style={[styles.headerCell, { flex: 1 }]}>Rate</Text>
                                                        <Text style={[styles.headerCell, { flex: 1 }]}>Value</Text>
                                                        <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
                                                    </View>

                                                    {overheadRows.map((row, i) => (
                                                        <View key={i} style={styles.tableRow}>
                                                            <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
                                                                {i + 1}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 4.5, textAlign: "center" }]}>
                                                                {row.PartyName}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 1, textAlign: "right" }]}>{row.Quantity}</Text>
                                                            <Text style={[styles.cell, { flex: 1, textAlign: "right" }]}>{row.Price}</Text>
                                                            <Text style={[styles.cell, { flex: 1, textAlign: "right" }]}>{row.Amount}</Text>
                                                            <Text style={[styles.cell, { flex: 2, textAlign: "center" }]}>
                                                                {row.Status}
                                                            </Text>
                                                        </View>
                                                    ))}

                                                    <View style={styles.tableRow}>
                                                        <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                                                        {/* <Text style={[styles.cell, { flex: 1 }]}></Text> */}
                                                        <Text
                                                            style={[
                                                                styles.cell,
                                                                { flex: 7.5, fontWeight: "bold", textAlign: "right" },
                                                            ]}
                                                        >
                                                            Total
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.rightCell,
                                                                { flex: 2, fontWeight: "bold" },
                                                            ]}
                                                        >
                                                            {overheadTotal.toFixed(2)}
                                                        </Text>
                                                    </View>

                                                </View>

                                            </View>
                                        );
                                    }
                                )}
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

            </Page>
        </Document>
    );
};

export default OrdEnqProductPDF;
