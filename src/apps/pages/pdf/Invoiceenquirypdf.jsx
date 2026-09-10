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
                                        <Text style={styles.summaryLabel}>Invoices</Text>
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
                        <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Invoices</Text>
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
//         fontSize: 8,
//         // color: COLORS.muted,
//         marginBottom: 4,
//         textAlign: "center",
//         fontWeight: 700,
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

//     subtotalLabel: {
//         fontSize: 7,
//         fontWeight: 600,
//         color: COLORS.muted,
//         padding: 5,
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

//     /* ---------- COLUMN WIDTHS: DETAIL TABLE ---------- */

//     wSL: { width: "3.5%" },
//     wInvoice: { width: "7%" },
//     wDate: { width: "7%" },
//     wEmployee: { width: "18%" },
//     wProject: { width: "20%" },
//     wAmount: { width: "10%" },
//     wPaid: { width: "10%" },
//     wDue: { width: "10%" },
//     wLastPaid: { width: "7.5%" },

//     // SL + Invoice + Receipt + Date + Project + Student
//     wLabelSpan: { width: "62.5%" },

//     /* ---------- COLUMN WIDTHS: SUMMARY TABLE ----------
//        SL# | <primary> | <secondary> | Invoices | Amount | Paid | Due
//        primary/secondary are Month & Standard/Activities, order
//        depends on the report's grouping mode. */

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

// /* ---------- INVOICE-HEADER DE-DUPLICATION ----------
//    One invoice (one InvoiceHeaderId) can have several rows in `data` —
//    one per payment/receipt made against it. InvoiceAmount is the same
//    invoice's total each time, so it must only be counted ONCE per
//    header id, not once per row. We take the highest InvoiceAmount seen
//    for that header id (in case of any rounding/display differences
//    between its rows) and sum those unique values.

//    NOTE: adjust HEADER_ID_FIELD below if your data uses a different
//    field name for the invoice header id (e.g. "HeaderId", "InvHeaderId"). */
// const HEADER_ID_FIELD = "InvoiceHeaderID";

// const getHeaderId = (row) => row?.[HEADER_ID_FIELD] ?? row?.InvoiceNo;

// // Generic version: sums `field` (InvoiceAmount, Due, ...) counting each
// // unique header id once, using the highest value seen for that header id
// // across its rows (both InvoiceAmount and the outstanding Due repeat
// // per payment row for the same invoice, so a plain per-row sum
// // over-counts them).
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

// // Due is deliberately NOT read from each row's `Due` field for any
// // subtotal/grand-total figure. That field is a per-payment snapshot and
// // isn't reliable to sum or max across a header's rows. Instead every
// // aggregate Due below is derived as (unique-header Amount) − (summed
// // Paid), which is the only calculation that's guaranteed consistent:
// // Total Invoice Amount − Total Paid = Total Due.


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

// /* =========================================================
//    PAGINATION (transaction detail pages)
// ========================================================= */

// const FIRST_PAGE_COUNT = 14;
// const OTHER_PAGE_COUNT = 22;

// const buildEntries = (groups) => {
//     const entries = [];
//     let sl = 1;
//     let grandPaid = 0;

//     groups.forEach((group) => {
//         if (group.label) {
//             entries.push({ type: "group", label: group.label });
//         }

//         let mPaid = 0;

//         group.rows.forEach((row) => {
//             mPaid += Number(row.PaidAmount || 0);
//             entries.push({ type: "row", row, serial: sl++ });
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

//     return { entries, grandAmount, grandPaid, grandDue, totalInvoices: sl - 1 };
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
//                                         <Text style={styles.summaryLabel}>Invoices</Text>
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
//                                     <Text style={[styles.headerCell, styles.wProject]}>
//                                     Standard/Activities
//                                 </Text>
//                                 )}
//                                 {mode === "Standard" && (
//                                 <Text style={[styles.headerCell, styles.wProject, styles.cellCenter]}>Billable Month/Year</Text>
//                                 )}
//                                 <Text style={[styles.headerCell, styles.wEmployee]}>
//                                     Student
//                                 </Text>

//                                 <Text style={[styles.headerCell, styles.wAmount, styles.cellNum]}>Amount</Text>
//                                 <Text style={[styles.headerCell, styles.wPaid, styles.cellNum]}>Paid Amount</Text>
//                                 <Text style={[styles.headerCell, styles.wDue, styles.cellNum]}>Due</Text>
//                                 <Text style={[styles.headerCell, styles.wLastPaid]}>Paid Date</Text>
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
//                                                 <Text style={[styles.cell, styles.wProject]}>{row?.Project ?? ""}</Text>
//                                             )}
//                                             {mode === "Standard" && (
//                                             <Text style={[styles.cell, styles.wProject]}>{row?.BillableMonthYear ?? ""}</Text>
//                                             )}
//                                             <Text style={[styles.cell, styles.wEmployee]}>{row?.Employee ?? ""}</Text>
//                                             <Text style={[styles.cell, styles.wAmount, styles.cellNum]}>
//                                                 {money(row?.InvoiceAmount)}
//                                             </Text>
//                                             {/* <Text style={[styles.cell, styles.wBillYr, styles.cellCenter]}>
//                         {row?.BillableYear ?? ""}
//                       </Text> */}
//                                             <Text style={[styles.cell, styles.wPaid, styles.cellNum]}>
//                                                 {money(row?.PaidAmount)}
//                                             </Text>
//                                             <Text
//                                                 style={[
//                                                     styles.cell,
//                                                     styles.wDue,
//                                                     styles.cellNum,
//                                                     Number(row?.Due) > 0 ? styles.cellDue : null,
//                                                 ]}
//                                             >
//                                                 {money(row?.Due)}
//                                             </Text>
//                                             <Text style={[styles.cell, styles.wLastPaid]}>{row?.PaidDate ?? ""}</Text>
//                                         </View>
//                                     );
//                                 }

//                                 if (entry.type === "subtotal") {
//                                     return (
//                                         <View key={idx} style={styles.subtotalRow}>
//                                             <Text style={[styles.subtotalLabel, styles.wLabelSpan]}>
                                                
//                                             </Text>

//                                             <Text style={[styles.subtotalValue, styles.wAmount]}>
//                                                 Total
//                                             </Text>

//                                             <Text style={[styles.subtotalValue, styles.wPaid]}>
//                                                 {money(entry.mPaid)}
//                                             </Text>

//                                             <Text style={[styles.subtotalValue, styles.wDue]}>
//                                                 {money(entry.mDue)}
//                                             </Text>

//                                             <Text style={styles.wLastPaid} />
//                                         </View>
//                                     );
//                                 }

//                                 if (entry.type === "grand") {
//                                     return (
//                                         <View key={idx} style={styles.grandRow}>
//                                             <Text style={[styles.grandLabel, styles.wLabelSpan]}>
//                                                 Grand Total
//                                             </Text>

//                                             <Text style={[styles.grandValue, styles.wAmount]}>
//                                                 {money(entry.grandAmount)}
//                                             </Text>

//                                             <Text style={[styles.grandValue, styles.wPaid]}>
//                                                 {money(entry.grandPaid)}
//                                             </Text>

//                                             <Text style={[styles.grandValue, styles.wDue]}>
//                                                 {money(entry.grandDue)}
//                                             </Text>

//                                             <Text style={styles.wLastPaid} />
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
//           just one Grand Total row at the bottom.
//       ========================================================= */}
//             <Page size="A4" orientation="landscape" style={styles.page}>
//                 <HeaderImage />

//                 <View style={styles.sectionTitleRow}>
//                     <Text style={styles.sectionTitle}>Summary</Text>
//                     {/* <Text style={styles.sectionSubtitle}>Grouped by {detailGroupWord}</Text> */}
//                 </View>

//                 <View style={styles.table}>
//                     <View style={styles.headerRow}>
//                         <Text style={[styles.headerCell, styles.sSL, styles.cellCenter]}>SL#</Text>
//                         <Text style={[styles.headerCell, styles.sPrimary]}>{summaryPrimaryHeader}</Text>
//                         <Text style={[styles.headerCell, styles.sSecondary]}>{summarySecondaryHeader}</Text>
//                         <Text style={[styles.headerCell, styles.sInv, styles.cellCenter]}>Invoices</Text>
//                         <Text style={[styles.headerCell, styles.sAmt, styles.cellNum]}>Amount</Text>
//                         <Text style={[styles.headerCell, styles.sPaid, styles.cellNum]}>Paid</Text>
//                         <Text style={[styles.headerCell, styles.sDue, styles.cellNum]}>Due</Text>
//                     </View>

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


// import {
//     Page,
//     Text,
//     View,
//     Document,
//     StyleSheet,
//     Image,
// } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//     page: {
//         // padding: 20,
//         // fontSize: 10,
//         paddingTop: 90,   // ⬅ space for header
//         paddingBottom: 80, // ⬅ space for footer
//         paddingHorizontal: 20,
//         fontSize: 10,
//     },
//     section: {
//         marginBottom: 10,
//     },
//     headerContainer: {
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         marginTop: -3,
//     },
//     headerText: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         textAlign: "center",
//         marginBottom: 10
//     },
//     table: {
//         display: "table",
//         width: "100%",
//         borderWidth: 1,
//         borderColor: "#000",
//         borderStyle: "solid",
//     },
//     tableRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: "#000",
//         borderBottomStyle: "solid",
//     },
//     tableRowLast: {
//         flexDirection: "row",
//     },
//     tableColHeader: {
//         width: "20%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol3Header: {
//         width: "30%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol2Header: {
//         width: "10%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableColHeader1: {
//         width: "5%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//     },
//     tableColHeaderLast: {
//         width: "15%",
//         padding: 5,
//         fontWeight: "bold",
//         backgroundColor: "#EEE",
//         textAlign: "center",
//     },
//     tableCol3: {
//         width: "30%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol: {
//         width: "20%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol2: {
//         width: "10%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         textAlign: "left",
//     },
//     tableCol1: {
//         width: "5%",
//         borderRightWidth: 1,
//         borderRightColor: "#000",
//         padding: 5,
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "right",
//     },
//     tableColLast: {
//         width: "15%",
//         padding: 5,
//     },

//     /*HEADER*/
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
//     /* FOOTER */
//     footerWrapper: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 70,
//     },

//     footerImage: {
//         width: "100%",
//         height: 100,
//         objectFit: "cover",
//     },
// });

// const InvenquiryPDF = ({ data = [], filters = {} }) => {
//     const FIRST_PAGE_COUNT = 13;
//     const OTHER_PAGE_COUNT = 15;

//     const paginateData = (data) => {
//         const pages = [];

//         // First page
//         pages.push(data.slice(0, FIRST_PAGE_COUNT));

//         // Remaining pages
//         for (
//             let i = FIRST_PAGE_COUNT;
//             i < data.length;
//             i += OTHER_PAGE_COUNT
//         ) {
//             pages.push(data.slice(i, i + OTHER_PAGE_COUNT));
//         }

//         return pages;
//     };
//     const pages = paginateData(data);
//     pages.forEach((page, i) => {
//         console.log(`Page ${i + 1} first row index:`, data.indexOf(page[0]));
//     });
//     const formattedfromDate = filters.fromDate
//         ? filters.fromDate.split("-").reverse().join("-")
//         : "";
//     const formattedtoDate = filters.toDate
//         ? filters.toDate.split("-").reverse().join("-")
//         : "";

//     // Whether to show Invoice No & Receipt No columns.
//     // Type === "Month"    -> hide them
//     // Type === "Standard" -> show them
//     const showInvoiceReceipt = filters.Type !== "Month";

//     const dynamicHeaderStyles = {
//         col1: {
//             ...styles.tableColHeader1,
//             width: "4.5%"
//         },
//         colInvoiceReceipt: {
//             ...styles.tableColHeader,
//             width: "7.5%"
//         },
//         colDate: {
//             ...styles.tableColHeader,
//             width: showInvoiceReceipt ? "7.5%" : "9%"
//         },
//         colCheckIn: {
//             ...styles.tableColHeader,
//             width: showInvoiceReceipt ? "20%" : "28%"
//         },
//         colCheckOut: {
//             ...styles.tableColHeader,
//             width: showInvoiceReceipt ? "20%" : "28%"
//         },
//         colHours: {
//             ...styles.tableCol2Header,
//             width: "8%"
//         },
//         colStatus: {
//             ...styles.tableColHeaderLast,
//             width: "8%"
//         },
//         colName: {
//             ...styles.tableCol3Header,
//             display: filters.Self === "Y" ? "none" : "block"
//         }
//     };

//     const dynamicRowStyles = {
//         col1: {
//             ...styles.tableCol1,
//             width: "4.5%"
//         },
//         colInvoiceReceipt: {
//             ...styles.tableCol,
//             width: "7.5%"
//         },
//         colDate: {
//             ...styles.tableCol,
//             width: showInvoiceReceipt ? "7.5%" : "9%"
//         },
//         colCheckIn: {
//             ...styles.tableCol,
//             width: showInvoiceReceipt ? "20%" : "28%"
//         },
//         colCheckOut: {
//             ...styles.tableCol,
//             width: showInvoiceReceipt ? "20%" : "28%"
//         },
//         colHours: {
//             ...styles.tableCol2,
//             width: "8%",
//             textAlign: "right"
//         },
//         colStatus: {
//             ...styles.tableColLast,
//             width: "8%"
//         },
//         colName: {
//             ...styles.tableCol3,
//             display: filters.Self === "Y" ? "none" : "block"
//         }
//     };

//     const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];
//     return (
//         <Document>
//             {pages.map((pageData, pageIndex) => (
//                 <Page size="A4" orientation="landscape" style={styles.page} key={pageIndex}>
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
//                             <Text style={styles.headerText}>
//                                 Invoice Enquiry Report
//                             </Text>
//                         </View>

//                     )}

//                     <View style={styles.table}>

//                         <View style={styles.tableRow}>
//                             <Text style={dynamicHeaderStyles.col1}>SL#</Text>
//                             {showInvoiceReceipt && (
//                                 <>
//                                     <Text style={dynamicHeaderStyles.colInvoiceReceipt}>Invoice No</Text>
//                                     <Text style={dynamicHeaderStyles.colInvoiceReceipt}>Receipt No</Text>
//                                 </>
//                             )}
//                             <Text style={dynamicHeaderStyles.colDate}>Date</Text>
//                             <Text style={dynamicHeaderStyles.colCheckOut}>Standard/Activity</Text>
//                             <Text style={dynamicHeaderStyles.colCheckIn}>Student</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Billable Month/Year</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Amount</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Paid Amount</Text>
//                             <Text style={dynamicHeaderStyles.colHours}>Due</Text>
//                         </View>

//                         {pageData.map((row, rowIndex) => {
//                             const globalIndex =
//                                 pageIndex === 0
//                                     ? rowIndex + 1
//                                     : FIRST_PAGE_COUNT +
//                                     (pageIndex - 1) * OTHER_PAGE_COUNT +
//                                     rowIndex +
//                                     1;

//                             const isLast = rowIndex === pageData.length - 1;
//                             return (
//                                 <View
//                                     key={rowIndex}
//                                     style={isLast ? styles.tableRowLast : styles.tableRow}
//                                 >
//                                     <Text style={dynamicRowStyles.col1}>{globalIndex}</Text>
//                                     {showInvoiceReceipt && (
//                                         <>
//                                             <Text style={dynamicRowStyles.colInvoiceReceipt}>{row.invno}</Text>
//                                             <Text style={dynamicRowStyles.colInvoiceReceipt}>{row.Receiptno}</Text>
//                                         </>
//                                     )}
//                                     <Text style={dynamicRowStyles.colDate}>{row.Date}</Text>
//                                     <Text style={dynamicRowStyles.colCheckIn}>{row.Employee}</Text>
//                                     <Text style={dynamicRowStyles.colCheckOut}>{row.Project}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.BillableMonth}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.TotalAmount}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.PaidAmount}</Text>
//                                     <Text style={dynamicRowStyles.colHours}>{row.Due}</Text>
//                                 </View>
//                             );
//                         })}

//                     </View>
//                     <View
//                         fixed
//                         style={{
//                             position: "absolute",
//                             bottom: 10,
//                             left: 0,
//                             right: 0,
//                             textAlign: "center",
//                             fontSize: 10,
//                         }}
//                     >
//                         <Text
//                             render={({ pageNumber, totalPages }) =>
//                                 `Page ${pageNumber} of ${totalPages}`
//                             }
//                         />
//                     </View>

//                     <View fixed style={styles.footerWrapper}>
//                         {filters.FooterImg && (
//                             <Image
//                                 src={`${filters.Imageurl}/uploads/images/${filters.FooterImg}`}
//                                 style={styles.footerImage}
//                             />
//                         )}
//                     </View>
//                 </Page>
//             ))}
//         </Document>
//     );
// };

// export default InvenquiryPDF;