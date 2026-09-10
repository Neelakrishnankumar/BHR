import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

/* =========================================================
   DESIGN TOKENS
========================================================= */

const COLORS = {
    ink: "#17233B",
    paper: "#F7F5F0",
    surface: "#FFFFFF",
    rule: "#D8D3C7",
    ruleStrong: "#B9B2A0",
    muted: "#5B6472",
    amber: "#B8862F",
    amberTint: "#FBF3E4",
    due: "#A6432E",
    headerText: "#EFE9DC",
    muted_v1: "#343941",
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
    page: {
        paddingTop: 88,
        paddingBottom: 82,
        paddingHorizontal: 20,
        fontSize: 8,
        color: COLORS.ink,
        backgroundColor: COLORS.paper,
    },

    /* ---------- MASTHEAD ---------- */
summaryTableWrapper: {
  width: "60%",
},
    masthead: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingBottom: 8,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.ink,
        marginBottom: 12,
    },

    reportTitle: {
        fontSize: 15,
        fontWeight: 700,
        textAlign: "center",
    },

    /* Absolutely positioned so the title is always centered on the
       page regardless of how wide the meta block on the right is. */
    reportTitleAbs: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        fontSize: 15,
        fontWeight: 700,
        textAlign: "center",
    },

    metaBlock: {
        alignItems: "flex-end",
    },

    metaLine: {
        fontSize: 7,
        color: COLORS.muted,
        marginBottom: 2,
    },

    metaValue: {
        color: COLORS.ink,
        fontWeight: 600,
    },

    /* ---------- SECTION TITLE ---------- */

    sectionTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 8,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: 700,
    },

    sectionSubtitle: {
        fontSize: 7.5,
        color: COLORS.muted,
    },

    /* ---------- SUMMARY STRIP (the 4 boxes) ---------- */

    summaryStrip: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.rule,
        marginBottom: 14,
    },

    summaryCell: {
        flex: 1,
        padding: 8,
        borderRightWidth: 1,
        borderRightColor: COLORS.rule,
        backgroundColor: COLORS.surface,
    },

    summaryCellLast: {
        flex: 1,
        padding: 8,
        backgroundColor: COLORS.surface,
    },

    summaryLabel: {
        fontSize: 10,
        color: COLORS.ink,
        marginBottom: 4,
        textAlign: "center",
        fontWeight: 600,
    },

    summaryValue: {
        fontSize: 11,
        fontWeight: 600,
        textAlign: "right",
    },

    summaryValuePaid: {
        color: COLORS.amber,
    },

    summaryValueDue: {
        color: COLORS.due,
    },

    /* ---------- TABLE (shared) ---------- */

    table: {
        width: "100%",
    },

    headerRow: {
        flexDirection: "row",
        backgroundColor: COLORS.ink,
    },

    headerCell: {
        color: COLORS.headerText,
        fontSize: 6.5,
        fontWeight: 600,
        padding: 5,
        textAlign: "center",
    },

    dataRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.rule,
    },

    dataRowZebra: {
        backgroundColor: "#FBFAF7",
    },

    cell: {
        fontSize: 7,
        padding: 5,
    },

    cellCenter: {
        textAlign: "center",
    },

    cellNum: {
        textAlign: "right",
    },

    cellDue: {
        color: COLORS.due,
        fontWeight: 600,
    },

    /* ---------- GROUP DIVIDER (detail table) ----------
       Reused for either a month header ("August 2026") or a
       standard/section header ("6th Standard A Sec"),
       whichever the report is currently grouped by. */

    groupRow: {
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 4,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.ink,
        backgroundColor: COLORS.paper,
    },

    groupLabel: {
        fontSize: 9,
        fontWeight: 700,
    },

    groupSuffix: {
        fontSize: 9,
        fontWeight: 400,
        color: COLORS.muted,
        marginLeft: 4,
    },

    /* ---------- SUBTOTAL ROW (detail table only) ---------- */

    subtotalRow: {
        flexDirection: "row",
        backgroundColor: COLORS.amberTint,
        borderTopWidth: 1,
        borderTopColor: COLORS.amber,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.amber,
    },

       subtotalLabel: {
        fontSize: 7,
        fontWeight: 600,
        color: COLORS.muted,
        padding: 5,
        textAlign: "right",
    },

    subtotalValue: {
        fontSize: 7,
        fontWeight: 600,
        padding: 5,
        textAlign: "right",
    },

    /* ---------- GRAND TOTAL ROW ---------- */

    grandRow: {
        flexDirection: "row",
        backgroundColor: COLORS.ink,
    },

    grandLabel: {
        fontSize: 8,
        fontWeight: 700,
        color: COLORS.paper,
        padding: 6,
    },

    grandValue: {
        fontSize: 8,
        fontWeight: 700,
        color: COLORS.paper,
        padding: 6,
        textAlign: "right",
    },

    /* ---------- COLUMN WIDTHS: DETAIL TABLE ----------
       Two of these columns swap meaning depending on report type:
       - wProject / wProjectNarrow  → "Standard/Activities" (Month mode)
                                       or "Billable Month/Year" (Standard mode)
       - wEmployee / wEmployeeNarrow → "Student"
       The *Narrow variants are used in Standard mode, since that
       column's content ("September || 2026") and the Student column
       are both shorter there; the freed-up width is redistributed to
       Paid / Due / Paid Date so each mode's row still lines up.
       NOTE: the Amount column itself has been removed from the header
       and data rows entirely (see wAmount / wAmountWide below — they
       are now unused by the header/data rows and are only kept around
       in case the column is restored later). ---------- */

    wSL: { width: "3.5%" },
    wInvoice: { width: "7%" },
    wDate: { width: "7%" },

    wEmployee: { width: "18%" },        // Student — Month mode
    wEmployeeNarrow: { width: "15%" },  // Student — Standard mode

    wProject: { width: "20%" },         // Standard/Activities — Month mode
    wProjectNarrow: { width: "14%" },   // Billable Month/Year — Standard mode

    wAmount: { width: "10%" },
    wAmountWide: { width: "12%" },

    wPaid: { width: "10%" },
    wPaidWide: { width: "12%" },

    wDue: { width: "10%" },
    wDueWide: { width: "12%" },

    wLastPaid: { width: "7.5%" },
    wLastPaidWide: { width: "10.5%" },

    // SL + Invoice + Receipt + Date + Project + Student
    // (this already excludes the removed Amount column, so it lines
    // up directly with Paid on both the header row and data rows)
    wLabelSpan: { width: "62.5%" },        // Month mode
    wLabelSpanNarrow: { width: "53.5%" },  // Standard mode

    /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
       SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
       primary/secondary are Month & Standard/Activities, order
       depends on the report's grouping mode. The Amount column on
       this summary page is unrelated to the detail-table one above
       and has NOT been removed. */

    sSL: { width: "5%" },
    sPrimary: { width: "20%" },
    sSecondary: { width: "25%" },
    sInv: { width: "10%" },
    sAmt: { width: "13%" },
    sPaid: { width: "13%" },
    sDue: { width: "14%" },
    sLabelSpan: { width: "50%" }, // SL + primary + secondary, for the grand-total row

    /* ---------- IMAGES ---------- */

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

    footerWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
    },

    footerImage: {
        width: "100%",
        height: 70,
        objectFit: "cover",
    },

    pageNumber: {
        position: "absolute",
        bottom: 72,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 8,
        color: COLORS.muted,
    },
});
/* =========================================================
   CONSTANTS / HELPERS
========================================================= */

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const money = (n) =>
    // "Rs. " +
    new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(n || 0));


const getStandardLabel = (projectStr = "") => {
    const parts = String(projectStr).split("||").map((p) => p.trim());
    return parts.length >= 2 ? parts[1] : projectStr || "—";
};

const monthYearLabel = (row) => {
    const mNum = Number(row?.BillableMonth);
    const mName = MONTH_NAMES[mNum - 1] || "";
    const year = row?.BillableYear || "";
    return `${mName} ${year}`.trim() || "—";
};


const HEADER_ID_FIELD = "InvoiceHeaderID";

const getHeaderId = (row) => row?.[HEADER_ID_FIELD] ?? row?.InvoiceNo;


const sumUniqueByHeader = (rows, field) => {
    const maxByHeader = new Map();
    rows.forEach((row) => {
        const headerId = getHeaderId(row);
        const val = Number(row?.[field] || 0);
        const prev = maxByHeader.get(headerId);
        if (prev === undefined || val > prev) {
            maxByHeader.set(headerId, val);
        }
    });
    let total = 0;
    maxByHeader.forEach((v) => {
        total += v;
    });
    return total;
};

const sumUniqueInvoiceAmount = (rows) => sumUniqueByHeader(rows, "InvoiceAmount");

const buildGroups = (data, mode, selectedMonthNames) => {
    const selectedMonthNums = selectedMonthNames
        .map((name) => MONTH_NAMES.indexOf(name) + 1)
        .filter((n) => n > 0);

    const filteredData =
        selectedMonthNums.length > 0
            ? data.filter((row) => selectedMonthNums.includes(Number(row?.BillableMonth)))
            : data;

    if (mode === "Standard") {
        const byStd = {};
        filteredData.forEach((row) => {
            const key = getStandardLabel(row.Project);
            if (!byStd[key]) byStd[key] = [];
            byStd[key].push(row);
        });
        const labels = Object.keys(byStd);
        return labels.length > 0
            ? labels.map((label) => ({ label, rows: byStd[label] }))
            : [{ label: null, rows: filteredData }];
    }

    // mode === "Month"
    const monthsPresent = [
        ...new Set(filteredData.map((row) => Number(row?.BillableMonth))),
    ]
        .filter((n) => n > 0)
        .sort((a, b) => a - b);

    return monthsPresent.length > 0
        ? monthsPresent.map((num) => ({
            label: MONTH_NAMES[num - 1],
            rows: filteredData.filter((row) => Number(row?.BillableMonth) === num),
        }))
        : [{ label: null, rows: filteredData }];
};


const FIRST_PAGE_COUNT = 14;
const OTHER_PAGE_COUNT = 22;

const buildEntries = (groups) => {
    const entries = [];
    let totalRows = 0;
    let grandPaid = 0;

    groups.forEach((group) => {
        if (group.label) {
            entries.push({ type: "group", label: group.label });
        }

        let mPaid = 0;
        // Serial number restarts at 1 for every section (Month or
        // Standard group), rather than continuing across sections.
        let sl = 1;

        group.rows.forEach((row) => {
            mPaid += Number(row.PaidAmount || 0);
            entries.push({ type: "row", row, serial: sl++ });
            totalRows += 1;
        });

        // Amount & Due subtotal per group: sum the unique-header-id
        // value, NOT a plain sum of every row's InvoiceAmount/Due — a
        // single invoice can have several payment rows against it, each
        // repeating that invoice's total amount and outstanding due.
        const mAmount = sumUniqueInvoiceAmount(group.rows);
        const mDue = mAmount - mPaid;

        if (group.label) {
            entries.push({ type: "subtotal", label: group.label, mAmount, mPaid, mDue });
        }

        grandPaid += mPaid;
    });

    // Grand invoice amount & due: de-duplicated across the *entire*
    // filtered dataset, not a sum of the per-group subtotals above —
    // this keeps a header whose payments happen to land in different
    // groups from being counted more than once.
    const allRows = groups.flatMap((g) => g.rows);
    const grandAmount = sumUniqueInvoiceAmount(allRows);
    const grandDue = grandAmount - grandPaid;

    entries.push({ type: "grand", grandAmount, grandPaid, grandDue });

    // totalInvoices is the true count of every row across every
    // section (independent of the per-section serial numbers above).
    return { entries, grandAmount, grandPaid, grandDue, totalInvoices: totalRows };
};

const paginateEntries = (entries) => {
    const pages = [];
    let i = 0;
    let cap = FIRST_PAGE_COUNT;

    while (i < entries.length) {
        let end = Math.min(i + cap, entries.length);

        while (end > i + 1 && entries[end - 1].type === "group") {
            end -= 1;
        }

        pages.push(entries.slice(i, end));
        i = end;
        cap = OTHER_PAGE_COUNT;
    }

    return pages;
};


const buildFlatSummary = (groups, mode) => {
    const rows = [];
    let sl = 1;
    let grandPaid = 0;
    let grandInvoices = 0;

    groups.forEach((group) => {
        const bySecondary = {};

        group.rows.forEach((row) => {
            const key = mode === "Standard" ? monthYearLabel(row) : getStandardLabel(row.Project);
            if (!bySecondary[key]) {
                bySecondary[key] = { label: key, invoices: 0, paid: 0, rows: [] };
            }
            bySecondary[key].invoices += 1;
            bySecondary[key].paid += Number(row.PaidAmount || 0);
            bySecondary[key].rows.push(row);
        });

        Object.values(bySecondary).forEach((r) => {
            // amount is the unique-header-id sum within this
            // (primary, secondary) bucket, not a plain per-row sum.
            // due is derived as amount − paid, not read from the Due
            // column (see note above sumUniqueInvoiceAmount).
            const amount = sumUniqueInvoiceAmount(r.rows);
            const due = amount - r.paid;
            rows.push({
                sl: sl++,
                primary: group.label || "—",
                secondary: r.label,
                invoices: r.invoices,
                amount,
                paid: r.paid,
                due,
            });
            grandPaid += r.paid;
            grandInvoices += r.invoices;
        });
    });

    // Grand amount de-duplicated across the whole dataset, same as in
    // buildEntries; grand due derived from it the same way, so the two
    // pages of the report always agree.
    const allRows = groups.flatMap((g) => g.rows);
    const grandAmount = sumUniqueInvoiceAmount(allRows);
    const grandDue = grandAmount - grandPaid;

    return { rows, grandAmount, grandPaid, grandDue, grandInvoices };
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const InvpaymentPDF = ({
    data = [],
    columndata = [],
    filters = {},
    selectedMonths = "",
    periodLabel = "",
}) => {
    const headerMap = columndata.reduce((acc, col) => {
        if (col?.field) acc[col.field] = col.headerName;
        return acc;
    }, {});

    // "Month" (default) or "Standard" — from the Type dropdown in the filter panel.
    const mode = filters?.PDFType === "Standard" ? "Standard" : "Month";

    // Column widths for the detail table swap based on report type — see
    // the STYLES section above for why. Picked once here and reused
    // across the header row, data rows, subtotal row, and grand row so
    // everything lines up.
    const colW = {
        project: mode === "Standard" ? styles.wProjectNarrow : styles.wProject,
        employee: mode === "Standard" ? styles.wEmployeeNarrow : styles.wEmployee,
        paid: mode === "Standard" ? styles.wPaidWide : styles.wPaid,
        due: mode === "Standard" ? styles.wDueWide : styles.wDue,
        lastPaid: mode === "Standard" ? styles.wLastPaidWide : styles.wLastPaid,
        labelSpan: mode === "Standard" ? styles.wLabelSpanNarrow : styles.wLabelSpan,
    };

    // Suffix shown in the report title so the reader can tell at a
    // glance whether the report is grouped Month wise or Standard wise.
    const modeSuffix = mode === "Standard" ? "Standard Wise" : "Month Wise";
    const reportTitleText = `Invoice Enquiry Report (${modeSuffix})`;

    const selectedMonthNames = selectedMonths
        ? selectedMonths.split(",").map((m) => m.trim()).filter(Boolean)
        : [];

    const groups = buildGroups(data, mode, selectedMonthNames);

    const { entries, grandAmount, grandPaid, grandDue, totalInvoices } =
        buildEntries(groups);
    const detailPages = paginateEntries(entries);
    const flatSummary = buildFlatSummary(groups, mode);

    const derivedPeriod = (() => {
        if (mode !== "Month") return "";
        const labeled = groups.filter((g) => g.label && g.rows.length);
        if (labeled.length === 0) return "";
        const first = labeled[0].label;
        const last = labeled[labeled.length - 1].label;
        const year = labeled[labeled.length - 1].rows[0]?.BillableYear ?? "";
        return first === last ? `${first} ${year}` : `${first} – ${last} ${year}`;
    })();

    const generatedDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const detailGroupWord = mode === "Standard" ? "Standard/Activities" : "Month";
    const summaryPrimaryHeader = mode === "Standard" ? "Standard/Activities" : "Month";
    const summarySecondaryHeader = mode === "Standard" ? "Month" : "Standard/Activities";

    const HeaderImage = () => (
        <View fixed style={styles.headerWrapper}>
            {filters?.HeaderImg && (
                <Image
                    src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
                    style={styles.headerImage}
                />
            )}
        </View>
    );

    const FooterImage = () => (
        <View fixed style={styles.footerWrapper}>
            {filters?.FooterImg && (
                <Image
                    src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
                    style={styles.footerImage}
                />
            )}
        </View>
    );

    const PageNumber = () => (
        <View fixed style={styles.pageNumber}>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
    );

    return (
        <Document>
            {/* =========================================================
          PAGE 1..N — masthead + the 4 boxes (first page only),
          then TRANSACTION DETAIL, grouped by whichever mode is
          selected (Month or Standard/Activities).
      ========================================================= */}
            {detailPages.map((pageEntries, pageIndex) => {
                const isFirstPage = pageIndex === 0;
                return (
                    <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
                        <HeaderImage />

                        {isFirstPage && (
                            <>
                                <View style={styles.masthead}>
                                    {/* Absolutely positioned so it stays centered on the
                                        page regardless of the meta block's width. */}
                                    <Text style={styles.reportTitleAbs}>{reportTitleText}</Text>

                                    <View style={styles.metaBlock}>
                                        {/* <Text style={styles.metaLine}>
                                            Period{"  "}
                                            <Text style={styles.metaValue}>{periodLabel || derivedPeriod || "—"}</Text>
                                        </Text> */}
                                        <Text style={styles.metaLine}>
                                            Generated{"  "}
                                            <Text style={styles.metaValue}>{generatedDate}</Text>
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.summaryStrip}>
                                    <View style={styles.summaryCell}>
                                        <Text style={styles.summaryLabel}>Receipts</Text>
                                        <Text style={styles.summaryValue}>{totalInvoices}</Text>
                                    </View>
                                    <View style={styles.summaryCell}>
                                        <Text style={styles.summaryLabel}>Total Invoice Amount</Text>
                                        <Text style={styles.summaryValue}>{money(grandAmount)}</Text>
                                    </View>
                                    <View style={styles.summaryCell}>
                                        <Text style={styles.summaryLabel}>Total Paid</Text>
                                        <Text style={[styles.summaryValue, styles.summaryValuePaid]}>
                                            {money(grandPaid)}
                                        </Text>
                                    </View>
                                    <View style={styles.summaryCellLast}>
                                        <Text style={styles.summaryLabel}>Total Due</Text>
                                        <Text style={[styles.summaryValue, styles.summaryValueDue]}>
                                            {money(grandDue)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.sectionTitleRow}>
                                    <Text style={styles.sectionTitle}>Transaction Detail</Text>
                                    {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
                                </View>
                            </>
                        )}

                        <View style={styles.table}>
                            <View style={styles.headerRow}>
                                <Text style={[styles.headerCell, styles.wSL, styles.cellCenter]}>SL#</Text>
                                <Text style={[styles.headerCell, styles.wInvoice]}>Invoice#</Text>
                                <Text style={[styles.headerCell, styles.wInvoice]}>Receipt#</Text>
                                <Text style={[styles.headerCell, styles.wDate]}>Date</Text>
                                {mode === "Month" && (
                                    <Text style={[styles.headerCell, colW.project]}>
                                    Standard/Activities
                                </Text>
                                )}
                                {mode === "Standard" && (
                                <Text style={[styles.headerCell, colW.project, styles.cellCenter]}>Billable Month/Year</Text>
                                )}
                                <Text style={[styles.headerCell, colW.employee]}>
                                    Student
                                </Text>

                                {/* <Text style={[styles.headerCell, colW.amount, styles.cellNum]}>Amount</Text> */}
                                <Text style={[styles.headerCell, colW.paid, styles.cellNum]}>Paid Amount</Text>
                                <Text style={[styles.headerCell, colW.due, styles.cellNum]}>Due</Text>
                                <Text style={[styles.headerCell, colW.lastPaid]}>Paid Date</Text>
                            </View>

                            {pageEntries.map((entry, idx) => {
                                if (entry.type === "group") {
                                    return (
                                        <View key={idx} style={styles.groupRow}>
                                            <Text style={styles.groupLabel}>{entry.label}</Text>
                                        </View>
                                    );
                                }

                                if (entry.type === "row") {
                                    const row = entry.row;
                                    const zebra = entry.serial % 2 === 0 ? styles.dataRowZebra : null;
                                    return (
                                        <View key={idx} style={[styles.dataRow, zebra]}>
                                            <Text style={[styles.cell, styles.wSL, styles.cellCenter]}>{entry.serial}</Text>
                                            <Text style={[styles.cell, styles.wInvoice]}>{row?.InvoiceNo ?? ""}</Text>
                                            <Text style={[styles.cell, styles.wInvoice]}>{row?.ReceiptNo ?? ""}</Text>
                                            <Text style={[styles.cell, styles.wDate]}>{row?.InvoiceDate ?? ""}</Text>
                                            {mode === "Month" && (
                                                <Text style={[styles.cell, colW.project]}>{row?.Project ?? ""}</Text>
                                            )}
                                            {mode === "Standard" && (
                                            <Text style={[styles.cell, colW.project]}>{row?.BillableMonthYear ?? ""}</Text>
                                            )}
                                            <Text style={[styles.cell, colW.employee]}>{row?.Employee ?? ""}</Text>
                                            {/* <Text style={[styles.cell, colW.amount, styles.cellNum]}>
                                                {money(row?.InvoiceAmount)}
                                            </Text> */}
                                            {/* <Text style={[styles.cell, styles.wBillYr, styles.cellCenter]}>
                        {row?.BillableYear ?? ""}
                      </Text> */}
                                            <Text style={[styles.cell, colW.paid, styles.cellNum]}>
                                                {money(row?.PaidAmount)}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cell,
                                                    colW.due,
                                                    styles.cellNum,
                                                    Number(row?.Due) > 0 ? styles.cellDue : null,
                                                ]}
                                            >
                                                {money(row?.Due)}
                                            </Text>
                                            <Text style={[styles.cell, colW.lastPaid, { textAlign: "center" }]}>{row?.PaidDate ?? ""}</Text>
                                        </View>
                                    );
                                }

                                if (entry.type === "subtotal") {
                                    return (
                                        <View key={idx} style={styles.subtotalRow}>
                                            <Text style={[styles.subtotalLabel, colW.labelSpan]}>
                                                Total
                                            </Text>

                                            <Text style={[styles.subtotalValue, colW.paid]}>
                                                {money(entry.mPaid)}
                                            </Text>

                                            <Text style={[styles.subtotalValue, colW.due]}>
                                                {money(entry.mDue)}
                                            </Text>

                                            <Text style={colW.lastPaid} />
                                        </View>
                                    );
                                }

                                if (entry.type === "grand") {
                                    return (
                                        <View key={idx} style={styles.grandRow}>
                                            <Text style={[styles.grandLabel, colW.labelSpan]}>
                                                Grand Total
                                            </Text>

                                            <Text style={[styles.grandValue, colW.paid]}>
                                                {money(entry.grandPaid)}
                                            </Text>

                                            <Text style={[styles.grandValue, colW.due]}>
                                                {money(entry.grandDue)}
                                            </Text>

                                            <Text style={colW.lastPaid} />
                                        </View>
                                    );
                                }

                                return null;
                            })}
                        </View>

                        <PageNumber />
                        <FooterImage />
                    </Page>
                );
            })}

            {/* =========================================================
          LAST PAGE — SUMMARY
          Single flat table: SL# | <primary> | <secondary> |
          Invoices | Amount | Paid | Due. Column order flips
          with the grouping mode. No per-group subtotal rows —
          just one Grand Total row at the bottom. This page's
          Amount column is separate from the detail table and is
          still shown.
      ========================================================= */}
            <Page size="A4" orientation="landscape" style={styles.page}>
                <HeaderImage />

                <View style={styles.sectionTitleRow}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
                </View>
   <View style={styles.summaryTableWrapper}>   
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
                        <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
                        <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
                        <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Receipts</Text>
                        <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
                        <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
                        <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
                    </View>
</View>
                    {flatSummary.rows.map((r, idx) => {
                        const zebra = idx % 2 === 1 ? styles.dataRowZebra : null;
                        return (
                            <View key={idx} style={[styles.dataRow, zebra]}>
                                <Text style={[styles.cell, styles.sSL, styles.cellCenter]}>{r.sl}</Text>
                                <Text style={[styles.cell, styles.sPrimary]}>{r.primary}</Text>
                                <Text style={[styles.cell, styles.sSecondary]}>{r.secondary}</Text>
                                <Text style={[styles.cell, styles.sInv, styles.cellCenter]}>{r.invoices}</Text>
                                <Text style={[styles.cell, styles.sAmt, styles.cellNum]}>{money(r.amount)}</Text>
                                <Text style={[styles.cell, styles.sPaid, styles.cellNum]}>{money(r.paid)}</Text>
                                <Text
                                    style={[
                                        styles.cell,
                                        styles.sDue,
                                        styles.cellNum,
                                        r.due > 0 ? styles.cellDue : null,
                                    ]}
                                >
                                    {money(r.due)}
                                </Text>
                            </View>
                        );
                    })}

                    <View style={styles.grandRow}>
                        <Text style={[styles.grandLabel, styles.sLabelSpan]}>Grand Total</Text>
                        <Text style={[styles.grandValue, styles.sInv, styles.cellCenter]}>
                            {flatSummary.grandInvoices}
                        </Text>
                        <Text style={[styles.grandValue, styles.sAmt]}>{money(flatSummary.grandAmount)}</Text>
                        <Text style={[styles.grandValue, styles.sPaid]}>{money(flatSummary.grandPaid)}</Text>
                        <Text style={[styles.grandValue, styles.sDue]}>{money(flatSummary.grandDue)}</Text>
                    </View>
                </View>

                <PageNumber />
                <FooterImage />
            </Page>
        </Document>
    );
};

export default InvpaymentPDF;


// import React from "react";
// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet,
//     Image,
// } from "@react-pdf/renderer";

// /* =========================================================
//    DESIGN TOKENS
// ========================================================= */

// const COLORS = {
//     ink: "#17233B",
//     paper: "#F7F5F0",
//     surface: "#FFFFFF",
//     rule: "#D8D3C7",
//     ruleStrong: "#B9B2A0",
//     muted: "#5B6472",
//     amber: "#B8862F",
//     amberTint: "#FBF3E4",
//     due: "#A6432E",
//     headerText: "#EFE9DC",
//     muted_v1: "#343941",
// };

// /* =========================================================
//    STYLES
// ========================================================= */

// const styles = StyleSheet.create({
//     page: {
//         paddingTop: 88,
//         paddingBottom: 82,
//         paddingHorizontal: 20,
//         fontSize: 8,
//         color: COLORS.ink,
//         backgroundColor: COLORS.paper,
//     },

//     /* ---------- MASTHEAD ---------- */
// summaryTableWrapper: {
//   width: "60%",
// },
//     masthead: {
//         position: "relative",
//         flexDirection: "row",
//         justifyContent: "flex-end",
//         alignItems: "flex-end",
//         paddingBottom: 8,
//         borderBottomWidth: 1.5,
//         borderBottomColor: COLORS.ink,
//         marginBottom: 12,
//     },

//     reportTitle: {
//         fontSize: 15,
//         fontWeight: 700,
//         textAlign: "center",
//     },

//     /* Absolutely positioned so the title is always centered on the
//        page regardless of how wide the meta block on the right is. */
//     reportTitleAbs: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         fontSize: 15,
//         fontWeight: 700,
//         textAlign: "center",
//     },

//     metaBlock: {
//         alignItems: "flex-end",
//     },

//     metaLine: {
//         fontSize: 7,
//         color: COLORS.muted,
//         marginBottom: 2,
//     },

//     metaValue: {
//         color: COLORS.ink,
//         fontWeight: 600,
//     },

//     /* ---------- SECTION TITLE ---------- */

//     sectionTitleRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "baseline",
//         marginBottom: 8,
//     },

//     sectionTitle: {
//         fontSize: 11,
//         fontWeight: 700,
//     },

//     sectionSubtitle: {
//         fontSize: 7.5,
//         color: COLORS.muted,
//     },

//     /* ---------- SUMMARY STRIP (the 4 boxes) ---------- */

//     summaryStrip: {
//         flexDirection: "row",
//         borderWidth: 1,
//         borderColor: COLORS.rule,
//         marginBottom: 14,
//     },

//     summaryCell: {
//         flex: 1,
//         padding: 8,
//         borderRightWidth: 1,
//         borderRightColor: COLORS.rule,
//         backgroundColor: COLORS.surface,
//     },

//     summaryCellLast: {
//         flex: 1,
//         padding: 8,
//         backgroundColor: COLORS.surface,
//     },

//     summaryLabel: {
//         fontSize: 10,
//         color: COLORS.ink,
//         marginBottom: 4,
//         textAlign: "center",
//         fontWeight: 600,
//     },

//     summaryValue: {
//         fontSize: 11,
//         fontWeight: 600,
//         textAlign: "right",
//     },

//     summaryValuePaid: {
//         color: COLORS.amber,
//     },

//     summaryValueDue: {
//         color: COLORS.due,
//     },

//     /* ---------- TABLE (shared) ---------- */

//     table: {
//         width: "100%",
//     },

//     headerRow: {
//         flexDirection: "row",
//         backgroundColor: COLORS.ink,
//     },

//     headerCell: {
//         color: COLORS.headerText,
//         fontSize: 6.5,
//         fontWeight: 600,
//         padding: 5,
//         textAlign: "center",
//     },

//     dataRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.rule,
//     },

//     dataRowZebra: {
//         backgroundColor: "#FBFAF7",
//     },

//     cell: {
//         fontSize: 7,
//         padding: 5,
//     },

//     cellCenter: {
//         textAlign: "center",
//     },

//     cellNum: {
//         textAlign: "right",
//     },

//     cellDue: {
//         color: COLORS.due,
//         fontWeight: 600,
//     },

//     /* ---------- GROUP DIVIDER (detail table) ----------
//        Reused for either a month header ("August 2026") or a
//        standard/section header ("6th Standard A Sec"),
//        whichever the report is currently grouped by. */

//     groupRow: {
//         flexDirection: "row",
//         paddingTop: 8,
//         paddingBottom: 4,
//         paddingHorizontal: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.ink,
//         backgroundColor: COLORS.paper,
//     },

//     groupLabel: {
//         fontSize: 9,
//         fontWeight: 700,
//     },

//     groupSuffix: {
//         fontSize: 9,
//         fontWeight: 400,
//         color: COLORS.muted,
//         marginLeft: 4,
//     },

//     /* ---------- SUBTOTAL ROW (detail table only) ---------- */

//     subtotalRow: {
//         flexDirection: "row",
//         backgroundColor: COLORS.amberTint,
//         borderTopWidth: 1,
//         borderTopColor: COLORS.amber,
//         borderBottomWidth: 1.5,
//         borderBottomColor: COLORS.amber,
//     },

//        subtotalLabel: {
//         fontSize: 7,
//         fontWeight: 600,
//         color: COLORS.muted,
//         padding: 5,
//         textAlign: "right",
//     },

//     subtotalValue: {
//         fontSize: 7,
//         fontWeight: 600,
//         padding: 5,
//         textAlign: "right",
//     },

//     /* ---------- GRAND TOTAL ROW ---------- */

//     grandRow: {
//         flexDirection: "row",
//         backgroundColor: COLORS.ink,
//     },

//     grandLabel: {
//         fontSize: 8,
//         fontWeight: 700,
//         color: COLORS.paper,
//         padding: 6,
//     },

//     grandValue: {
//         fontSize: 8,
//         fontWeight: 700,
//         color: COLORS.paper,
//         padding: 6,
//         textAlign: "right",
//     },

//     /* ---------- COLUMN WIDTHS: DETAIL TABLE ----------
//        Two of these columns swap meaning depending on report type:
//        - wProject / wProjectNarrow  → "Standard/Activities" (Month mode)
//                                        or "Billable Month/Year" (Standard mode)
//        - wEmployee / wEmployeeNarrow → "Student"
//        The *Narrow variants are used in Standard mode, since that
//        column's content ("September || 2026") and the Student column
//        are both shorter there; the freed-up width is redistributed to
//        Paid / Due / Paid Date so each mode's row still lines up.
//        NOTE: the Amount column itself has been removed from the header
//        and data rows entirely (see wAmount / wAmountWide below — they
//        are now unused by the header/data rows and are only kept around
//        in case the column is restored later). ---------- */

//     wSL: { width: "3.5%" },
//     wInvoice: { width: "7%" },
//     wDate: { width: "7%" },

//     wEmployee: { width: "18%" },        // Student — Month mode
//     wEmployeeNarrow: { width: "15%" },  // Student — Standard mode

//     wProject: { width: "20%" },         // Standard/Activities — Month mode
//     wProjectNarrow: { width: "14%" },   // Billable Month/Year — Standard mode

//     wAmount: { width: "10%" },
//     wAmountWide: { width: "12%" },

//     wPaid: { width: "10%" },
//     wPaidWide: { width: "12%" },

//     wDue: { width: "10%" },
//     wDueWide: { width: "12%" },

//     wLastPaid: { width: "7.5%" },
//     wLastPaidWide: { width: "10.5%" },

//     // SL + Invoice + Receipt + Date + Project + Student
//     // (this already excludes the removed Amount column, so it lines
//     // up directly with Paid on both the header row and data rows)
//     wLabelSpan: { width: "62.5%" },        // Month mode
//     wLabelSpanNarrow: { width: "53.5%" },  // Standard mode

//     /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
//        SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
//        primary/secondary are Month & Standard/Activities, order
//        depends on the report's grouping mode. The Amount column on
//        this summary page is unrelated to the detail-table one above
//        and has NOT been removed. */

//     sSL: { width: "5%" },
//     sPrimary: { width: "20%" },
//     sSecondary: { width: "25%" },
//     sInv: { width: "10%" },
//     sAmt: { width: "13%" },
//     sPaid: { width: "13%" },
//     sDue: { width: "14%" },
//     sLabelSpan: { width: "50%" }, // SL + primary + secondary, for the grand-total row

//     /* ---------- IMAGES ---------- */

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

//     footerWrapper: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 70,
//     },

//     footerImage: {
//         width: "100%",
//         height: 70,
//         objectFit: "cover",
//     },

//     pageNumber: {
//         position: "absolute",
//         bottom: 72,
//         left: 0,
//         right: 0,
//         textAlign: "center",
//         fontSize: 8,
//         color: COLORS.muted,
//     },
// });
// /* =========================================================
//    CONSTANTS / HELPERS
// ========================================================= */

// const MONTH_NAMES = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
// ];

// const money = (n) =>
//     // "Rs. " +
//     new Intl.NumberFormat("en-IN", {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//     }).format(Number(n || 0));


// const getStandardLabel = (projectStr = "") => {
//     const parts = String(projectStr).split("||").map((p) => p.trim());
//     return parts.length >= 2 ? parts[1] : projectStr || "—";
// };

// const monthYearLabel = (row) => {
//     const mNum = Number(row?.BillableMonth);
//     const mName = MONTH_NAMES[mNum - 1] || "";
//     const year = row?.BillableYear || "";
//     return `${mName} ${year}`.trim() || "—";
// };


// const HEADER_ID_FIELD = "InvoiceHeaderID";

// const getHeaderId = (row) => row?.[HEADER_ID_FIELD] ?? row?.InvoiceNo;


// const sumUniqueByHeader = (rows, field) => {
//     const maxByHeader = new Map();
//     rows.forEach((row) => {
//         const headerId = getHeaderId(row);
//         const val = Number(row?.[field] || 0);
//         const prev = maxByHeader.get(headerId);
//         if (prev === undefined || val > prev) {
//             maxByHeader.set(headerId, val);
//         }
//     });
//     let total = 0;
//     maxByHeader.forEach((v) => {
//         total += v;
//     });
//     return total;
// };

// const sumUniqueInvoiceAmount = (rows) => sumUniqueByHeader(rows, "InvoiceAmount");

// // Reorders a section's rows so that every payment belonging to the
// // same invoice (InvoiceHeaderID) sits together, sorted by RecordID
// // ascending. Since each successive payment against an invoice reduces
// // its Due, this makes the Due column read in decreasing order within
// // each invoice. Invoices themselves keep whatever order they first
// // appeared in within the section — only the payments *inside* each
// // invoice get reordered.
// const orderRowsByHeaderThenRecordId = (rows) => {
//     const headerOrder = [];
//     const byHeader = new Map();

//     rows.forEach((row) => {
//         const headerId = getHeaderId(row);
//         if (!byHeader.has(headerId)) {
//             byHeader.set(headerId, []);
//             headerOrder.push(headerId);
//         }
//         byHeader.get(headerId).push(row);
//     });

//     const ordered = [];
//     headerOrder.forEach((headerId) => {
//         const headerRows = byHeader.get(headerId).slice();
//         headerRows.sort((a, b) => Number(a?.RecordID) - Number(b?.RecordID));
//         ordered.push(...headerRows);
//     });

//     return ordered;
// };

// const buildGroups = (data, mode, selectedMonthNames) => {
//     const selectedMonthNums = selectedMonthNames
//         .map((name) => MONTH_NAMES.indexOf(name) + 1)
//         .filter((n) => n > 0);

//     const filteredData =
//         selectedMonthNums.length > 0
//             ? data.filter((row) => selectedMonthNums.includes(Number(row?.BillableMonth)))
//             : data;

//     if (mode === "Standard") {
//         const byStd = {};
//         filteredData.forEach((row) => {
//             const key = getStandardLabel(row.Project);
//             if (!byStd[key]) byStd[key] = [];
//             byStd[key].push(row);
//         });
//         const labels = Object.keys(byStd);
//         return labels.length > 0
//             ? labels.map((label) => ({ label, rows: byStd[label] }))
//             : [{ label: null, rows: filteredData }];
//     }

//     // mode === "Month"
//     const monthsPresent = [
//         ...new Set(filteredData.map((row) => Number(row?.BillableMonth))),
//     ]
//         .filter((n) => n > 0)
//         .sort((a, b) => a - b);

//     return monthsPresent.length > 0
//         ? monthsPresent.map((num) => ({
//             label: MONTH_NAMES[num - 1],
//             rows: filteredData.filter((row) => Number(row?.BillableMonth) === num),
//         }))
//         : [{ label: null, rows: filteredData }];
// };


// const FIRST_PAGE_COUNT = 14;
// const OTHER_PAGE_COUNT = 22;

// const buildEntries = (groups) => {
//     const entries = [];
//     let totalRows = 0;
//     let grandPaid = 0;

//     groups.forEach((group) => {
//         if (group.label) {
//             entries.push({ type: "group", label: group.label });
//         }

//         let mPaid = 0;
//         // Serial number restarts at 1 for every section (Month or
//         // Standard group), rather than continuing across sections.
//         let sl = 1;

//         // Payments for the same invoice are grouped together and
//         // ordered by RecordID ascending, so Due reads in decreasing
//         // order as you go down each invoice's payments.
//         const orderedRows = orderRowsByHeaderThenRecordId(group.rows);

//         orderedRows.forEach((row) => {
//             mPaid += Number(row.PaidAmount || 0);
//             entries.push({ type: "row", row, serial: sl++ });
//             totalRows += 1;
//         });

//         // Amount & Due subtotal per group: sum the unique-header-id
//         // value, NOT a plain sum of every row's InvoiceAmount/Due — a
//         // single invoice can have several payment rows against it, each
//         // repeating that invoice's total amount and outstanding due.
//         const mAmount = sumUniqueInvoiceAmount(group.rows);
//         const mDue = mAmount - mPaid;

//         if (group.label) {
//             entries.push({ type: "subtotal", label: group.label, mAmount, mPaid, mDue });
//         }

//         grandPaid += mPaid;
//     });

//     // Grand invoice amount & due: de-duplicated across the *entire*
//     // filtered dataset, not a sum of the per-group subtotals above —
//     // this keeps a header whose payments happen to land in different
//     // groups from being counted more than once.
//     const allRows = groups.flatMap((g) => g.rows);
//     const grandAmount = sumUniqueInvoiceAmount(allRows);
//     const grandDue = grandAmount - grandPaid;

//     entries.push({ type: "grand", grandAmount, grandPaid, grandDue });

//     // totalInvoices is the true count of every row across every
//     // section (independent of the per-section serial numbers above).
//     return { entries, grandAmount, grandPaid, grandDue, totalInvoices: totalRows };
// };

// const paginateEntries = (entries) => {
//     const pages = [];
//     let i = 0;
//     let cap = FIRST_PAGE_COUNT;

//     while (i < entries.length) {
//         let end = Math.min(i + cap, entries.length);

//         while (end > i + 1 && entries[end - 1].type === "group") {
//             end -= 1;
//         }

//         pages.push(entries.slice(i, end));
//         i = end;
//         cap = OTHER_PAGE_COUNT;
//     }

//     return pages;
// };


// const buildFlatSummary = (groups, mode) => {
//     const rows = [];
//     let sl = 1;
//     let grandPaid = 0;
//     let grandInvoices = 0;

//     groups.forEach((group) => {
//         const bySecondary = {};

//         group.rows.forEach((row) => {
//             const key = mode === "Standard" ? monthYearLabel(row) : getStandardLabel(row.Project);
//             if (!bySecondary[key]) {
//                 bySecondary[key] = { label: key, invoices: 0, paid: 0, rows: [] };
//             }
//             bySecondary[key].invoices += 1;
//             bySecondary[key].paid += Number(row.PaidAmount || 0);
//             bySecondary[key].rows.push(row);
//         });

//         Object.values(bySecondary).forEach((r) => {
//             // amount is the unique-header-id sum within this
//             // (primary, secondary) bucket, not a plain per-row sum.
//             // due is derived as amount − paid, not read from the Due
//             // column (see note above sumUniqueInvoiceAmount).
//             const amount = sumUniqueInvoiceAmount(r.rows);
//             const due = amount - r.paid;
//             rows.push({
//                 sl: sl++,
//                 primary: group.label || "—",
//                 secondary: r.label,
//                 invoices: r.invoices,
//                 amount,
//                 paid: r.paid,
//                 due,
//             });
//             grandPaid += r.paid;
//             grandInvoices += r.invoices;
//         });
//     });

//     // Grand amount de-duplicated across the whole dataset, same as in
//     // buildEntries; grand due derived from it the same way, so the two
//     // pages of the report always agree.
//     const allRows = groups.flatMap((g) => g.rows);
//     const grandAmount = sumUniqueInvoiceAmount(allRows);
//     const grandDue = grandAmount - grandPaid;

//     return { rows, grandAmount, grandPaid, grandDue, grandInvoices };
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const InvpaymentPDF = ({
//     data = [],
//     columndata = [],
//     filters = {},
//     selectedMonths = "",
//     periodLabel = "",
// }) => {
//     const headerMap = columndata.reduce((acc, col) => {
//         if (col?.field) acc[col.field] = col.headerName;
//         return acc;
//     }, {});

//     // "Month" (default) or "Standard" — from the Type dropdown in the filter panel.
//     const mode = filters?.PDFType === "Standard" ? "Standard" : "Month";

//     // Column widths for the detail table swap based on report type — see
//     // the STYLES section above for why. Picked once here and reused
//     // across the header row, data rows, subtotal row, and grand row so
//     // everything lines up.
//     const colW = {
//         project: mode === "Standard" ? styles.wProjectNarrow : styles.wProject,
//         employee: mode === "Standard" ? styles.wEmployeeNarrow : styles.wEmployee,
//         paid: mode === "Standard" ? styles.wPaidWide : styles.wPaid,
//         due: mode === "Standard" ? styles.wDueWide : styles.wDue,
//         lastPaid: mode === "Standard" ? styles.wLastPaidWide : styles.wLastPaid,
//         labelSpan: mode === "Standard" ? styles.wLabelSpanNarrow : styles.wLabelSpan,
//     };

//     // Suffix shown in the report title so the reader can tell at a
//     // glance whether the report is grouped Month wise or Standard wise.
//     const modeSuffix = mode === "Standard" ? "Standard Wise" : "Month Wise";
//     const reportTitleText = `Invoice Enquiry Report (${modeSuffix})`;

//     const selectedMonthNames = selectedMonths
//         ? selectedMonths.split(",").map((m) => m.trim()).filter(Boolean)
//         : [];

//     const groups = buildGroups(data, mode, selectedMonthNames);

//     const { entries, grandAmount, grandPaid, grandDue, totalInvoices } =
//         buildEntries(groups);
//     const detailPages = paginateEntries(entries);
//     const flatSummary = buildFlatSummary(groups, mode);

//     const derivedPeriod = (() => {
//         if (mode !== "Month") return "";
//         const labeled = groups.filter((g) => g.label && g.rows.length);
//         if (labeled.length === 0) return "";
//         const first = labeled[0].label;
//         const last = labeled[labeled.length - 1].label;
//         const year = labeled[labeled.length - 1].rows[0]?.BillableYear ?? "";
//         return first === last ? `${first} ${year}` : `${first} – ${last} ${year}`;
//     })();

//     const generatedDate = new Date().toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });

//     const detailGroupWord = mode === "Standard" ? "Standard/Activities" : "Month";
//     const summaryPrimaryHeader = mode === "Standard" ? "Standard/Activities" : "Month";
//     const summarySecondaryHeader = mode === "Standard" ? "Month" : "Standard/Activities";

//     const HeaderImage = () => (
//         <View fixed style={styles.headerWrapper}>
//             {filters?.HeaderImg && (
//                 <Image
//                     src={`${filters.Imageurl}/uploads/images/${filters.HeaderImg}`}
//                     style={styles.headerImage}
//                 />
//             )}
//         </View>
//     );

//     const FooterImage = () => (
//         <View fixed style={styles.footerWrapper}>
//             {filters?.FooterImg && (
//                 <Image
//                     src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                     style={styles.footerImage}
//                 />
//             )}
//         </View>
//     );

//     const PageNumber = () => (
//         <View fixed style={styles.pageNumber}>
//             <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
//         </View>
//     );

//     return (
//         <Document>
//             {/* =========================================================
//           PAGE 1..N — masthead + the 4 boxes (first page only),
//           then TRANSACTION DETAIL, grouped by whichever mode is
//           selected (Month or Standard/Activities).
//       ========================================================= */}
//             {detailPages.map((pageEntries, pageIndex) => {
//                 const isFirstPage = pageIndex === 0;
//                 return (
//                     <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
//                         <HeaderImage />

//                         {isFirstPage && (
//                             <>
//                                 <View style={styles.masthead}>
//                                     {/* Absolutely positioned so it stays centered on the
//                                         page regardless of the meta block's width. */}
//                                     <Text style={styles.reportTitleAbs}>{reportTitleText}</Text>

//                                     <View style={styles.metaBlock}>
//                                         {/* <Text style={styles.metaLine}>
//                                             Period{"  "}
//                                             <Text style={styles.metaValue}>{periodLabel || derivedPeriod || "—"}</Text>
//                                         </Text> */}
//                                         <Text style={styles.metaLine}>
//                                             Generated{"  "}
//                                             <Text style={styles.metaValue}>{generatedDate}</Text>
//                                         </Text>
//                                     </View>
//                                 </View>

//                                 <View style={styles.summaryStrip}>
//                                     <View style={styles.summaryCell}>
//                                         <Text style={styles.summaryLabel}>Receipts</Text>
//                                         <Text style={styles.summaryValue}>{totalInvoices}</Text>
//                                     </View>
//                                     <View style={styles.summaryCell}>
//                                         <Text style={styles.summaryLabel}>Total Invoice Amount</Text>
//                                         <Text style={styles.summaryValue}>{money(grandAmount)}</Text>
//                                     </View>
//                                     <View style={styles.summaryCell}>
//                                         <Text style={styles.summaryLabel}>Total Paid</Text>
//                                         <Text style={[styles.summaryValue, styles.summaryValuePaid]}>
//                                             {money(grandPaid)}
//                                         </Text>
//                                     </View>
//                                     <View style={styles.summaryCellLast}>
//                                         <Text style={styles.summaryLabel}>Total Due</Text>
//                                         <Text style={[styles.summaryValue, styles.summaryValueDue]}>
//                                             {money(grandDue)}
//                                         </Text>
//                                     </View>
//                                 </View>

//                                 <View style={styles.sectionTitleRow}>
//                                     <Text style={styles.sectionTitle}>Transaction Detail</Text>
//                                     {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
//                                 </View>
//                             </>
//                         )}

//                         <View style={styles.table}>
//                             <View style={styles.headerRow}>
//                                 <Text style={[styles.headerCell, styles.wSL, styles.cellCenter]}>SL#</Text>
//                                 <Text style={[styles.headerCell, styles.wInvoice]}>Invoice#</Text>
//                                 <Text style={[styles.headerCell, styles.wInvoice]}>Receipt#</Text>
//                                 <Text style={[styles.headerCell, styles.wDate]}>Date</Text>
//                                 {mode === "Month" && (
//                                     <Text style={[styles.headerCell, colW.project]}>
//                                     Standard/Activities
//                                 </Text>
//                                 )}
//                                 {mode === "Standard" && (
//                                 <Text style={[styles.headerCell, colW.project, styles.cellCenter]}>Billable Month/Year</Text>
//                                 )}
//                                 <Text style={[styles.headerCell, colW.employee]}>
//                                     Student
//                                 </Text>

//                                 {/* <Text style={[styles.headerCell, colW.amount, styles.cellNum]}>Amount</Text> */}
//                                 <Text style={[styles.headerCell, colW.paid, styles.cellNum]}>Paid Amount</Text>
//                                 <Text style={[styles.headerCell, colW.due, styles.cellNum]}>Due</Text>
//                                 <Text style={[styles.headerCell, colW.lastPaid]}>Paid Date</Text>
//                             </View>

//                             {pageEntries.map((entry, idx) => {
//                                 if (entry.type === "group") {
//                                     return (
//                                         <View key={idx} style={styles.groupRow}>
//                                             <Text style={styles.groupLabel}>{entry.label}</Text>
//                                         </View>
//                                     );
//                                 }

//                                 if (entry.type === "row") {
//                                     const row = entry.row;
//                                     const zebra = entry.serial % 2 === 0 ? styles.dataRowZebra : null;
//                                     return (
//                                         <View key={idx} style={[styles.dataRow, zebra]}>
//                                             <Text style={[styles.cell, styles.wSL, styles.cellCenter]}>{entry.serial}</Text>
//                                             <Text style={[styles.cell, styles.wInvoice]}>{row?.InvoiceNo ?? ""}</Text>
//                                             <Text style={[styles.cell, styles.wInvoice]}>{row?.ReceiptNo ?? ""}</Text>
//                                             <Text style={[styles.cell, styles.wDate]}>{row?.InvoiceDate ?? ""}</Text>
//                                             {mode === "Month" && (
//                                                 <Text style={[styles.cell, colW.project]}>{row?.Project ?? ""}</Text>
//                                             )}
//                                             {mode === "Standard" && (
//                                             <Text style={[styles.cell, colW.project]}>{row?.BillableMonthYear ?? ""}</Text>
//                                             )}
//                                             <Text style={[styles.cell, colW.employee]}>{row?.Employee ?? ""}</Text>
//                                             {/* <Text style={[styles.cell, colW.amount, styles.cellNum]}>
//                                                 {money(row?.InvoiceAmount)}
//                                             </Text> */}
//                                             {/* <Text style={[styles.cell, styles.wBillYr, styles.cellCenter]}>
//                         {row?.BillableYear ?? ""}
//                       </Text> */}
//                                             <Text style={[styles.cell, colW.paid, styles.cellNum]}>
//                                                 {money(row?.PaidAmount)}
//                                             </Text>
//                                             <Text
//                                                 style={[
//                                                     styles.cell,
//                                                     colW.due,
//                                                     styles.cellNum,
//                                                     Number(row?.Due) > 0 ? styles.cellDue : null,
//                                                 ]}
//                                             >
//                                                 {money(row?.Due)}
//                                             </Text>
//                                             <Text style={[styles.cell, colW.lastPaid, { textAlign: "center" }]}>{row?.PaidDate ?? ""}</Text>
//                                         </View>
//                                     );
//                                 }

//                                 if (entry.type === "subtotal") {
//                                     return (
//                                         <View key={idx} style={styles.subtotalRow}>
//                                             <Text style={[styles.subtotalLabel, colW.labelSpan]}>
//                                                 Total
//                                             </Text>

//                                             <Text style={[styles.subtotalValue, colW.paid]}>
//                                                 {money(entry.mPaid)}
//                                             </Text>

//                                             <Text style={[styles.subtotalValue, colW.due]}>
//                                                 {money(entry.mDue)}
//                                             </Text>

//                                             <Text style={colW.lastPaid} />
//                                         </View>
//                                     );
//                                 }

//                                 if (entry.type === "grand") {
//                                     return (
//                                         <View key={idx} style={styles.grandRow}>
//                                             <Text style={[styles.grandLabel, colW.labelSpan]}>
//                                                 Grand Total
//                                             </Text>

//                                             <Text style={[styles.grandValue, colW.paid]}>
//                                                 {money(entry.grandPaid)}
//                                             </Text>

//                                             <Text style={[styles.grandValue, colW.due]}>
//                                                 {money(entry.grandDue)}
//                                             </Text>

//                                             <Text style={colW.lastPaid} />
//                                         </View>
//                                     );
//                                 }

//                                 return null;
//                             })}
//                         </View>

//                         <PageNumber />
//                         <FooterImage />
//                     </Page>
//                 );
//             })}

//             {/* =========================================================
//           LAST PAGE — SUMMARY
//           Single flat table: SL# | <primary> | <secondary> |
//           Invoices | Amount | Paid | Due. Column order flips
//           with the grouping mode. No per-group subtotal rows —
//           just one Grand Total row at the bottom. This page's
//           Amount column is separate from the detail table and is
//           still shown.
//       ========================================================= */}
//             <Page size="A4" orientation="landscape" style={styles.page}>
//                 <HeaderImage />

//                 <View style={styles.sectionTitleRow}>
//                     <Text style={styles.sectionTitle}>Summary</Text>
//                     {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
//                 </View>
//    <View style={styles.summaryTableWrapper}>   
//                 <View style={styles.table}>
//                     <View style={styles.headerRow}>
//                         <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
//                         <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
//                         <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
//                         <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Receipts</Text>
//                         <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
//                         <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
//                         <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
//                     </View>
// </View>
//                     {flatSummary.rows.map((r, idx) => {
//                         const zebra = idx % 2 === 1 ? styles.dataRowZebra : null;
//                         return (
//                             <View key={idx} style={[styles.dataRow, zebra]}>
//                                 <Text style={[styles.cell, styles.sSL, styles.cellCenter]}>{r.sl}</Text>
//                                 <Text style={[styles.cell, styles.sPrimary]}>{r.primary}</Text>
//                                 <Text style={[styles.cell, styles.sSecondary]}>{r.secondary}</Text>
//                                 <Text style={[styles.cell, styles.sInv, styles.cellCenter]}>{r.invoices}</Text>
//                                 <Text style={[styles.cell, styles.sAmt, styles.cellNum]}>{money(r.amount)}</Text>
//                                 <Text style={[styles.cell, styles.sPaid, styles.cellNum]}>{money(r.paid)}</Text>
//                                 <Text
//                                     style={[
//                                         styles.cell,
//                                         styles.sDue,
//                                         styles.cellNum,
//                                         r.due > 0 ? styles.cellDue : null,
//                                     ]}
//                                 >
//                                     {money(r.due)}
//                                 </Text>
//                             </View>
//                         );
//                     })}

//                     <View style={styles.grandRow}>
//                         <Text style={[styles.grandLabel, styles.sLabelSpan]}>Grand Total</Text>
//                         <Text style={[styles.grandValue, styles.sInv, styles.cellCenter]}>
//                             {flatSummary.grandInvoices}
//                         </Text>
//                         <Text style={[styles.grandValue, styles.sAmt]}>{money(flatSummary.grandAmount)}</Text>
//                         <Text style={[styles.grandValue, styles.sPaid]}>{money(flatSummary.grandPaid)}</Text>
//                         <Text style={[styles.grandValue, styles.sDue]}>{money(flatSummary.grandDue)}</Text>
//                     </View>
//                 </View>

//                 <PageNumber />
//                 <FooterImage />
//             </Page>
//         </Document>
//     );
// };

// export default InvpaymentPDF;