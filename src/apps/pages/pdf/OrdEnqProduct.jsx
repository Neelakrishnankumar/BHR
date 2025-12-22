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
        padding: 20,
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
        // fontWeight: "bold",
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
    separator2: {
    width: 1,
    backgroundColor: "#000",
    marginHorizontal: 8,
},

});

// GROUP BY OVERHEAD FIRST
const groupByOverhead = (data) => {
    const result = {};
    data.forEach((row) => {
        if (!result[row.Overheads]) {
            result[row.Overheads] = [];
        }
        result[row.Overheads].push(row);
    });
    return result;
};

// THEN GROUP A SINGLE OVERHEAD BY PRODUCT
const groupByProduct = (rows) => {
    const result = {};
    rows.forEach((r) => {
        if (!result[r.ProjectName]) result[r.ProjectName] = [];
        result[r.ProjectName].push(r);
    });
    return result;
};

const OrdEnqProductPDF = ({ data = [] }) => {
    const overheadGroups = groupByOverhead(data);

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>

                <Text style={styles.title}>
                    Onsite Activities- Overhead based Summary
                </Text>

                {Object.entries(overheadGroups).map(
                    ([overheadName, ohRows], ohIndex) => {

                        const totalTransactions = ohRows.length;
                        const totalAmount = ohRows.reduce(
                            (sum, r) => sum + Number(r.Value || 0),
                            0
                        );

                        // Group by product inside this overhead
                        const productGroups = groupByProduct(ohRows);

                        return (
                            <View key={ohIndex} style={{ marginBottom: 10 }}>

                                {/* Overhead Name */}
                                <Text style={styles.overheadTitle}>
                                    Overhead Name : {overheadName}
                                </Text>

                                {/* EACH PRODUCT TABLE */}
                                {Object.entries(productGroups).map(
                                    ([productName, productRows], pIndex) => {

                                        const productTotal = productRows.reduce(
                                            (sum, r) => sum + Number(r.Value || 0),
                                            0
                                        );

                                        return (
                                            <View key={pIndex} style={{ marginBottom: 10 }}>

                                                <Text style={styles.projectName}>
                                                    Project Name : {productName}
                                                </Text>

                                                {/* Table */}
                                                <View style={styles.table}>

                                                    <View style={styles.tableRow}>
                                                        <Text style={[styles.headerCell, { flex: 0.5 }]}>S.No</Text>
                                                        <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
                                                        <Text style={[styles.headerCell, { flex: 7.5 }]}>Comments</Text>
                                                        <Text style={[styles.rightCell, {
                                                            flex: 1.5, fontWeight: "bold", backgroundColor: "#f0f0f0",
                                                            textAlign: "center"
                                                        }]}>Amount</Text>
                                                    </View>

                                                    {productRows.map((row, i) => (
                                                        <View key={i} style={styles.tableRow}>
                                                            <Text
                                                                style={[styles.cell, { flex: 0.5, textAlign: "center" }]}
                                                            >
                                                                {i + 1}
                                                            </Text>
                                                            <Text
                                                                style={[styles.cell, { flex: 1, textAlign: "center" }]}
                                                            >
                                                                {row.Date}
                                                            </Text>
                                                            <Text style={[styles.cell, { flex: 7.5 }]}>
                                                                {row.Comments}
                                                            </Text>
                                                            <Text style={[styles.rightCell, { flex: 1.5 }]}>
                                                                {row.Value}
                                                            </Text>
                                                        </View>
                                                    ))}

                                                    <View style={styles.tableRow}>
                                                        <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                                                        <Text style={[styles.cell, { flex: 1 }]}></Text>
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
                                                                { flex: 1.5, fontWeight: "bold" },
                                                            ]}
                                                        >
                                                            {productTotal.toFixed(2)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }
                                )}

                                {/* Overhead Summary */}
                                {/* <View style={styles.summaryRow}>
                                    <Text>Overhead Name : {overheadName}</Text>
                                    <Text>Total Transaction : {totalTransactions}</Text>
                                    <Text>Total Amount : {totalAmount}</Text>
                                </View> */}
                                <View style={styles.summaryRow}>
                                    <Text>Overhead Name : {overheadName}</Text>

                                    {/* <View style={styles.separator2} /> */}

                                    <Text>Transaction Count : {totalTransactions}</Text>

                                    {/* <View style={styles.separator2} /> */}

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
