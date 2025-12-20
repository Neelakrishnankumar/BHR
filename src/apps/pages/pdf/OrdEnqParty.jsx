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

    projectName: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 8,
    },

    overheadTitle: {
        fontSize: 10,
        // fontWeight: "bold",
        marginTop: 6,
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
        textAlign: "center",
        borderRightWidth: 1,
        borderColor: "#000",

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

    footerLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#000",
        marginTop: 10,
        marginBottom: 10,
    },

    projectSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
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
        fontWeight: "bold"
    },
});


// Group rows by overhead inside each project
const groupByOverhead = (rows) => {
    const result = {};
    rows.forEach((r) => {
        if (!result[r.Overheads]) result[r.Overheads] = [];
        result[r.Overheads].push(r);
    });
    return result;
};


const OrdEnqPartyPDF = ({ data = [], Project = [] }) => {
    const selectedProjects = Array.isArray(Project) ? Project : [Project];


    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>

                <Text style={styles.title}>
                    Onsite Activities - Project based Summary
                </Text>

                {/* {selectedProjects.map((proj, idx) => {
                    const projectRows = data.filter(
                        (r) => r.ProjectName === proj?.Name
                    );

                    const overheadGroups = groupByOverhead(projectRows);

                    const totalTransactions = projectRows.length;
                    const totalAmount = projectRows.reduce(
                        (sum, r) => sum + Number(r.Value || 0),
                        0
                    ); */}
                {selectedProjects.map((proj, idx) => {
                    const projectRows = data.filter(
                        (r) => r.ProjectName === proj?.Name
                    );

                    const overheadGroups = groupByOverhead(projectRows);

                    const totalTransactions = projectRows.length;
                    const totalAmount = projectRows.reduce(
                        (sum, r) => sum + Number(r.Value || 0),
                        0
                    );

                    if (totalTransactions === 0 && totalAmount === 0) {
                        return null;
                    }

                    return (
                        <View key={idx} style={{ marginBottom: 10 }}>

                            {/* Project Name */}
                            <Text style={styles.projectName}>
                                Project Name : {proj?.Name}
                            </Text>

                            {/* Each Overhead Section */}
                            {Object.entries(overheadGroups).map(
                                ([overheadName, rows], ohIndex) => {

                                    const overheadTotal = rows.reduce(
                                        (sum, r) => sum + Number(r.Value || 0),
                                        0
                                    );

                                    return (
                                        <View key={ohIndex}>
                                            <Text style={styles.overheadTitle}>
                                                Overhead Name : {overheadName}
                                            </Text>

                                            {/* Table */}
                                            {/* <View style={styles.table}>
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.headerCell, { flex: 1 }]}>S.No</Text>
                                                    <Text style={[styles.headerCell, { flex: 2 }]}>Date</Text>
                                                    <Text style={[styles.headerCell, { flex: 6 }]}>Comments</Text>
                                                    <Text style={[styles.rightCell, {
                                                        flex: 2, fontWeight: "bold", backgroundColor: "#f0f0f0",
                                                        textAlign: "center"
                                                    }]}>Amount</Text>
                                                </View>

                                                {rows.map((r, i) => (
                                                    <View key={i} style={styles.tableRow}>
                                                        <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>{i + 1}</Text>
                                                        <Text style={[styles.cell, { flex: 2, textAlign: "center" }]}>{r.Date}</Text>
                                                        <Text style={[styles.cell, { flex: 6 }]}>{r.Comments}</Text>
                                                        <Text style={[styles.rightCell, { flex: 2 }]}>{r.Value}</Text>
                                                    </View>
                                                ))}

                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.cell, { flex: 1 }]}></Text>
                                                    <Text style={[styles.cell, { flex: 2 }]}></Text>
                                                    <Text style={[styles.cell, { flex: 6, fontWeight: "bold", textAlign: "right" }]}>
                                                        Total
                                                    </Text>
                                                    <Text style={[styles.rightCell, { flex: 2, fontWeight: "bold" }]}>
                                                        {overheadTotal.toFixed(2)}
                                                    </Text>

                                                </View>
                                            </View> */}
                                            <View style={styles.table}>
                                                {/* Header Row */}
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.headerCell, { flex: 0.5 }]}>S.No</Text>
                                                    <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
                                                    <Text style={[styles.headerCell, { flex: 7.5 }]}>Comments</Text>
                                                    <Text
                                                        style={[
                                                            styles.rightCell,
                                                            {
                                                                flex: 1.5,
                                                                fontWeight: "bold",
                                                                backgroundColor: "#f0f0f0",
                                                                textAlign: "center"
                                                            }
                                                        ]}
                                                    >
                                                        Amount
                                                    </Text>
                                                </View>

                                                {/* Rows */}
                                                {rows.map((r, i) => (
                                                    <View key={i} style={styles.tableRow}>
                                                        <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
                                                            {i + 1}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 1, textAlign: "center" }]}>
                                                            {r.Date}
                                                        </Text>
                                                        <Text style={[styles.cell, { flex: 7.5 }]}>{r.Comments}</Text>
                                                        <Text style={[styles.rightCell, { flex: 1.5 }]}>{r.Value}</Text>
                                                    </View>
                                                ))}

                                                {/* Total Row */}
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.cell, { flex: 0.5 }]}></Text>
                                                    <Text style={[styles.cell, { flex: 1 }]}></Text>
                                                    <Text style={[styles.cell, { flex: 7.5, fontWeight: "bold", textAlign: "right" }]}>
                                                        Total
                                                    </Text>
                                                    <Text style={[styles.rightCell, { flex: 1.5, fontWeight: "bold" }]}>
                                                        {overheadTotal.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                    );
                                }
                            )}

                            {/* Project Summary Footer */}
                            <View style={styles.projectSummary}>
                                <Text>Project Name : {proj?.Name}</Text>
                                {/* <View style={styles.separator2} /> */}
                                <Text>Transaction Count : {totalTransactions}</Text>
                                {/* <View style={styles.separator2} /> */}
                                <Text>Total Amount : {totalAmount.toFixed(2)}</Text>
                            </View>
                            <View style={styles.separator} />

                        </View>
                    );
                })}

            </Page>
        </Document>
    );
};

export default OrdEnqPartyPDF;
