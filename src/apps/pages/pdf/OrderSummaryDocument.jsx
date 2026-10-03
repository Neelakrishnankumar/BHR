import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/**
 * OrderSummaryDocument — pure PDF layout. No API calls, no form logic.
 * Consumed by OrderSummaryPdfPage.jsx, fed with data that Orders.jsx
 * fetched and passed along via router state.
 *
 * FIX (alignment / empty space on Paid-style pages):
 * react-pdf was orphaning section headers ("Party detail",
 * "Payment mode - party split") at the bottom of a page while the
 * table/group content that belongs under them got pushed to the next
 * page, leaving a large blank gap. Fixed by adding `minPresenceAhead`
 * to those headers so react-pdf only renders them on a page if enough
 * of what follows also fits — otherwise both move to the next page
 * together. Applied consistently across all four page types.
 */

/* =========================================================
   PDF COLORS + STYLES
========================================================= */

const colors = {
  text: "#1A1D1F",
  muted: "#6B7280",
  lightMuted: "#9CA3AF",
  border: "#E5E7EB",
  neutral: "#F3F4F6",
  greenBg: "#DCFCE7",
  green: "#166534",
  blueBg: "#DBEAFE",
  blue: "#1E40AF",
  amberBg: "#FEF3C7",
  amber: "#92400E",
  redBg: "#FEE2E2",
  red: "#B91C1C",
  zebra: "#FAFAFB",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 52,
    paddingHorizontal: 34,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.text,
    backgroundColor: "#FFFFFF",
  },
  letterhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: colors.text,
    paddingBottom: 9,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 9, color: colors.muted, marginTop: 4 },
  businessBlock: { alignItems: "flex-end" },
  businessName: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  tagRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 14 },
  tag: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  tagRange: { backgroundColor: colors.neutral, color: "#4B5563" },
  tagDelivered: { backgroundColor: colors.blueBg, color: colors.blue },
  tagPaid: { backgroundColor: colors.greenBg, color: colors.green },
  tagPartial: { backgroundColor: colors.amberBg, color: colors.amber },
  metrics: { flexDirection: "row", marginBottom: 22 },
  metric: { flex: 1, borderRadius: 7, padding: 11 },
  metricLeft: { marginRight: 5 },
  metricRight: { marginLeft: 5 },
  metricNeutral: { backgroundColor: colors.neutral },
  metricPrimary: { backgroundColor: colors.greenBg },
  metricLabel: { fontSize: 8, textTransform: "uppercase", letterSpacing: 0.4, color: "#4B5563", marginBottom: 4 },
  metricLabelPrimary: { color: colors.green },
  metricAmount: { fontSize: 17, fontFamily: "Helvetica-Bold" },
  metricAmountPrimary: { color: colors.green },
  metricSmallAmount: { fontSize: 11, lineHeight: 1.35 },
  metricMeta: { fontSize: 8, color: colors.muted, marginTop: 5 },
  metricMetaPrimary: { color: colors.green },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#4B5563",
    marginTop: 10,
    marginBottom: 7,
  },
  table: { width: "100%" },
  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 0.6,
    borderLeftWidth: 0.6,
    borderRightWidth: 0.6,
    borderBottomWidth: 1.2,
    borderColor: colors.border,
    borderBottomColor: colors.text,
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderLeftWidth: 0.6,
    borderRightWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tableRowAlt: {
    backgroundColor: colors.zebra,
  },
  tableText: { fontSize: 8.5 },
  tableHeaderText: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#4B5563" },
  left: { textAlign: "left" },
  right: { textAlign: "right" },
  group: { marginBottom: 12 },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  groupHeaderText: { fontSize: 8.5, fontFamily: "Helvetica-Bold" },
  groupCod: { backgroundColor: colors.greenBg, color: colors.green },
  groupUpi: { backgroundColor: colors.blueBg, color: colors.blue },
  groupOthers: { backgroundColor: colors.amberBg, color: colors.amber },
  groupPending: { backgroundColor: colors.redBg, color: colors.red },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  dotCod: { backgroundColor: "#22C55E" },
  dotUpi: { backgroundColor: "#3B82F6" },
  dotOthers: { backgroundColor: "#F59E0B" },
  dotPending: { backgroundColor: "#EF4444" },
  groupTable: {},
  balanceRed: { color: colors.red, fontFamily: "Helvetica-Bold" },
  balanceZero: { color: colors.lightMuted },
  collectedGood: { color: colors.green, fontFamily: "Helvetica-Bold" },
  collectedMid: { color: colors.amber, fontFamily: "Helvetica-Bold" },
  collectedLow: { color: colors.red, fontFamily: "Helvetica-Bold" },
  emptyBox: { borderWidth: 1, borderColor: colors.border, borderRadius: 5, padding: 15, alignItems: "center" },
  emptyText: { fontSize: 9, color: colors.muted },
  footer: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.6,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  footerText: { fontSize: 7.5, color: colors.lightMuted },
  mb12: { marginBottom: 12 },
});

/* =========================================================
   DATA HELPERS
========================================================= */

const normalizeStatus = (status) => String(status || "").replace(/\s+/g, "").trim().toLowerCase();

const normalizePaymentMode = (mode) => {
  const value = String(mode || "").trim().toLowerCase();
  if (value === "cod" || value.includes("cash")) return "COD";
  if (value === "upi" || value.includes("gpay") || value.includes("google pay") || value.includes("phonepe") || value.includes("paytm")) return "UPI";
  return "Others";
};

const getNumber = (...values) => {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      const cleaned = typeof value === "string" ? value.replace(/,/g, "") : value;
      const num = Number(cleaned);
      if (!Number.isNaN(num)) return num;
    }
  }
  return 0;
};

const getQuantity = (item) => getNumber(item.Quantity, item.Qty, item.OrderQuantity, item.ORQuantity);
const getBalanceAmount = (item) => getNumber(item.BalanceAmount, item.Balance, item.PendingAmount, item.RemainingAmount);

const getPaidAmount = (item) => {
  const direct = getNumber(item.PaidAmount, item.PaymentAmount, item.AmountPaid, item.CollectedAmount, item.ReceivedAmount);
  if (direct > 0) return direct;
  const total = getNumber(item.TotalAmount, item.OrderAmount, item.NetAmount, item.GrandTotal, item.InvoiceAmount);
  const balance = getBalanceAmount(item);
  return total > 0 ? Math.max(total - balance, 0) : 0;
};

export const getPartyID = (item) =>
  String(item.PartyRecordID || item.VendorCode || item.VendorName || "-").trim();
export const getPartyName = (item) => String(item.VendorName || "-").trim();
const getPaymentMode = (item) => normalizePaymentMode(item.PaymentMode || item.ModeOfPayment || item.PaymentType || item.PayMode || item.Mode);

const getOrderID = (item) =>
  String(
    item.OrderRecordID || item.OrderID || item.OrderNo || item.OrderNumber || item.ORRecordID ||
      `${getPartyID(item)}-${item.STATUS || ""}-${getQuantity(item)}-${getBalanceAmount(item)}-${getPaidAmount(item)}`
  );

// Exported: Orders.jsx uses these to client-side-filter the API response by
// product / order type, since the legacy server-side filter has no column
// wired up for either. Adjust field names once you can see a sample payload.
export const getProductID = (item) => String(item.ProductRecordID || item.ProductCode || item.ProductID || "").trim();
export const getProductName = (item) =>
  String(item.ProductName || item.ProductTitle || item.ProductDescription || item.ProductDesc || "-").trim();
export const getOrderTypeCode = (item) => String(item.OrderTypeCode || item.OrderType || item.TransactionType || "").trim();

const formatAmount = (amount) => getNumber(amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (amount) => formatAmount(amount);

const formatDisplayDate = (value) => {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const getCurrentDateTime = () =>
  new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
  });

const getUniqueOrders = (data = []) => {
  const map = new Map();
  data.forEach((item, index) => {
    const key = getOrderID(item) || String(index);
    if (!map.has(key)) map.set(key, item);
  });
  return Array.from(map.values());
};

const getValidData = (data = []) => data.filter((item) => getQuantity(item) > 0 || getBalanceAmount(item) > 0 || getPaidAmount(item) > 0);
const getTotalQuantity = (data = []) => data.reduce((t, item) => t + getQuantity(item), 0);
const getTotalBalance = (data = []) => data.reduce((t, item) => t + getBalanceAmount(item), 0);
const getTotalPaid = (data = []) => data.reduce((t, item) => t + getPaidAmount(item), 0);
const getUniquePartyCount = (data = []) => new Set(data.map((item) => getPartyID(item))).size;

const groupByParty = (data = []) =>
  data.reduce((result, item) => {
    const partyID = getPartyID(item);
    if (!result[partyID]) result[partyID] = { partyID, party: getPartyName(item), qty: 0, paid: 0, balance: 0 };
    result[partyID].qty += getQuantity(item);
    result[partyID].paid += getPaidAmount(item);
    result[partyID].balance += getBalanceAmount(item);
    return result;
  }, {});

const groupByPaymentMode = (data = []) =>
  data.reduce((result, item) => {
    const mode = getPaymentMode(item);
    const partyID = getPartyID(item);
    if (!result[mode]) result[mode] = { mode, partyIDs: new Set(), qty: 0, paid: 0, balance: 0 };
    result[mode].partyIDs.add(partyID);
    result[mode].qty += getQuantity(item);
    result[mode].paid += getPaidAmount(item);
    result[mode].balance += getBalanceAmount(item);
    return result;
  }, {});

const getCollectedPercentage = (paidAmount, balanceAmount) => {
  const total = paidAmount + balanceAmount;
  return total <= 0 ? 0 : Math.round((paidAmount / total) * 100);
};

// Collection-rate color coding: red under 50% (needs follow-up), amber
// 50-79% (in progress), green 80%+ (mostly collected) — so the number
// that matters most in the payment-mode table carries its own meaning
// at a glance instead of reading as plain black text like every other cell.
const getCollectedStyle = (percentage) => {
  if (percentage >= 80) return styles.collectedGood;
  if (percentage >= 50) return styles.collectedMid;
  return styles.collectedLow;
};

const createPartyRows = (data, includePaid = false, includeBalance = true) => {
  const grouped = groupByParty(data);
  return Object.values(grouped)
    .filter((item) => item.qty > 0 || item.paid > 0 || item.balance > 0)
    .sort((a, b) => (includeBalance ? b.balance - a.balance : b.paid - a.paid))
    .map((item) => {
      const row = { party: item.party, qty: String(item.qty) };
      if (includePaid) row.paid = money(item.paid);
      if (includeBalance) {
        row.balance = item.balance > 0 ? money(item.balance) : "Fully paid";
        row.styles = { balance: item.balance > 0 ? styles.balanceRed : styles.balanceZero };
      }
      return row;
    });
};

const createPaymentSummaryRows = (data, includeBalance = true) => {
  const grouped = groupByPaymentMode(data);
  return ["COD", "UPI", "Others"]
    .map((mode) => grouped[mode])
    .filter(Boolean)
    .map((item) => {
      const row = { mode: item.mode, parties: String(item.partyIDs.size), qty: String(item.qty), paid: money(item.paid) };
      if (includeBalance) {
        const collectedPct = getCollectedPercentage(item.paid, item.balance);
        row.balance = money(item.balance);
        row.collected = `${collectedPct}%`;
        row.styles = {
          balance: item.balance > 0 ? styles.balanceRed : styles.balanceZero,
          collected: getCollectedStyle(collectedPct),
        };
      }
      return row;
    });
};

const getModeData = (data, mode) => data.filter((item) => getPaymentMode(item) === mode);

/* =========================================================
   PDF COMPONENTS
========================================================= */

function Header() {
  return (
    <View style={styles.letterhead}>
      <View>
        <Text style={styles.title}>Order Enquiry Summary</Text>
        <Text style={styles.subtitle}>Generated {getCurrentDateTime()}</Text>
      </View>
    </View>
  );
}

function Tags({ delivered = false, paid = false, partial = false, fromDate, toDate }) {
  return (
    <View style={styles.tagRow}>
      <Text style={[styles.tag, styles.tagRange]}>
        {formatDisplayDate(fromDate)} - {formatDisplayDate(toDate)}
      </Text>
      {delivered && <Text style={[styles.tag, styles.tagDelivered]}>Delivered</Text>}
      {partial && <Text style={[styles.tag, styles.tagPartial]}>Partially paid</Text>}
      {paid && <Text style={[styles.tag, styles.tagPaid]}>Paid</Text>}
    </View>
  );
}

function Metric({ label, amount, meta, primary = false, small = false, right = false }) {
  return (
    <View style={[styles.metric, right ? styles.metricRight : styles.metricLeft, primary ? styles.metricPrimary : styles.metricNeutral]}>
      <Text style={[styles.metricLabel, primary && styles.metricLabelPrimary]}>{label}</Text>
      <Text style={[styles.metricAmount, primary && styles.metricAmountPrimary, small && styles.metricSmallAmount]}>{amount}</Text>
      {meta ? <Text style={[styles.metricMeta, primary && styles.metricMetaPrimary]}>{meta}</Text> : null}
    </View>
  );
}

function Dot({ type }) {
  const dotStyle = { cod: styles.dotCod, upi: styles.dotUpi, others: styles.dotOthers, pending: styles.dotPending };
  return <View style={[styles.dot, dotStyle[type] || styles.dotOthers]} />;
}

function SimpleTable({ columns, rows = [], style }) {
  return (
    <View style={[styles.table, style]}>
      <View style={styles.tableHeader} fixed>
        {columns.map((column) => (
          <Text key={column.key} style={[styles.tableHeaderText, { width: column.width }, column.align === "right" ? styles.right : styles.left]}>
            {column.label}
          </Text>
        ))}
      </View>
      {rows.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      ) : (
        rows.map((row, rowIndex) => (
          <View
            style={[styles.tableRow, rowIndex % 2 === 1 ? styles.tableRowAlt : null]}
            key={`${rowIndex}-${row.party || row.mode || ""}`}
            wrap={false}
          >
            {columns.map((column) => {
              const value = row[column.key] ?? "";
              const cellStyle = row.styles?.[column.key];
              return (
                <Text key={column.key} style={[styles.tableText, { width: column.width }, column.align === "right" ? styles.right : styles.left, cellStyle]}>
                  {String(value)}
                </Text>
              );
            })}
          </View>
        ))
      )}
    </View>
  );
}

// `wrap={false}` keeps a short group (header + its rows) glued together as
// one block so react-pdf either fits the whole thing on the current page or
// moves the whole thing to the next — no more lone header with an empty
// page beneath it. Only safe for groups whose total row count is small
// enough to plausibly fit on a single page; large groups (e.g. 17-row COD
// tables) intentionally do NOT get this so they can still paginate mid-table
// rather than being shoved, in full, onto a mostly-blank page.
const SHORT_GROUP_ROW_THRESHOLD = 6;

function Group({ type, title, columns, rows }) {
  const groupStyle = { cod: styles.groupCod, upi: styles.groupUpi, others: styles.groupOthers, pending: styles.groupPending };
  const keepTogether = rows.length > 0 && rows.length <= SHORT_GROUP_ROW_THRESHOLD;
  return (
    <View style={styles.group} wrap={!keepTogether}>
      <View style={[styles.groupHeader, groupStyle[type] || styles.groupOthers]} wrap={false}>
        <Dot type={type} />
        <Text style={styles.groupHeaderText}>{title}</Text>
      </View>
      <SimpleTable columns={columns} rows={rows} style={styles.groupTable} />
    </View>
  );
}

function Footer({ title }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} - ${title}`} />
      <Text style={styles.footerText}>Auto-generated report - not a tax invoice</Text>
    </View>
  );
}

const partyBalanceColumns = [
  { key: "party", label: "Party", width: "60%" },
  { key: "qty", label: "Qty", width: "15%", align: "right" },
  { key: "balance", label: "Balance", width: "25%", align: "right" },
];
const paymentColumns = [
  { key: "mode", label: "Mode", width: "18%" },
  { key: "parties", label: "Parties", width: "12%", align: "right" },
  { key: "qty", label: "Qty", width: "12%", align: "right" },
  { key: "paid", label: "Paid", width: "20%", align: "right" },
  { key: "balance", label: "Balance", width: "22%", align: "right" },
  { key: "collected", label: "Collected", width: "16%", align: "right" },
];
const detailColumns = [
  { key: "party", label: "Party", width: "48%" },
  { key: "qty", label: "Qty", width: "14%", align: "right" },
  { key: "paid", label: "Paid", width: "19%", align: "right" },
  { key: "balance", label: "Balance", width: "19%", align: "right" },
];
const paidSummaryColumns = [
  { key: "mode", label: "Mode", width: "28%" },
  { key: "parties", label: "Parties", width: "18%", align: "right" },
  { key: "qty", label: "Qty", width: "20%", align: "right" },
  { key: "paid", label: "Paid", width: "34%", align: "right" },
];
const paidDetailColumns = [
  { key: "party", label: "Party", width: "58%" },
  { key: "qty", label: "Qty", width: "16%", align: "right" },
  { key: "paid", label: "Paid", width: "26%", align: "right" },
];
const remainingColumns = [
  { key: "party", label: "Party", width: "42%" },
  { key: "mode", label: "Mode", width: "18%" },
  { key: "qty", label: "Qty", width: "14%", align: "right" },
  { key: "balance", label: "Balance", width: "26%", align: "right" },
];

function DeliveredPage({ orderData = [], fromDate, toDate }) {
  const uniqueOrders = getUniqueOrders(orderData);
  const deliveredData = getValidData(uniqueOrders.filter((item) => normalizeStatus(item.STATUS) === "delivered"));
  const rows = createPartyRows(deliveredData, false, true);
  const totalQuantity = getTotalQuantity(deliveredData);
  const totalBalance = getTotalBalance(deliveredData);
  const partyCount = getUniquePartyCount(deliveredData);

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      <Tags delivered fromDate={fromDate} toDate={toDate} />
      <View style={styles.metrics}>
        <Metric label="Total balance" amount={money(totalBalance)} meta={`Qty ${totalQuantity} - ${partyCount} parties pending`} />
        <Metric right label="Orders delivered" amount={`${totalQuantity} units`} meta={`Across ${partyCount} parties`} />
      </View>
      <Text style={styles.sectionTitle} minPresenceAhead={60}>Pending balance by party</Text>
      <Group type="pending" title={`Pending - ${partyCount} parties - Qty ${totalQuantity} - Bal ${money(totalBalance)}`} columns={partyBalanceColumns} rows={rows} />
      <Footer title="Delivered" />
    </Page>
  );
}

function PartialPage({ orderData = [], fromDate, toDate, companyName }) {
  const uniqueOrders = getUniqueOrders(orderData);
  const partialData = getValidData(uniqueOrders.filter((item) => normalizeStatus(item.STATUS) === "partiallypaid"));
  const paymentRows = createPaymentSummaryRows(partialData, true);
  const codData = getModeData(partialData, "COD");
  const upiData = getModeData(partialData, "UPI");
  const othersData = getModeData(partialData, "Others");
  const codRows = createPartyRows(codData, true, true);
  const upiRows = createPartyRows(upiData, true, true);
  const othersRows = createPartyRows(othersData, true, true);
  const totalQuantity = getTotalQuantity(partialData);
  const totalBalance = getTotalBalance(partialData);
  const partyCount = getUniquePartyCount(partialData);
  const avgBalancePerParty = partyCount > 0 ? totalBalance / partyCount : 0;

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      <Tags partial fromDate={fromDate} toDate={toDate} />
      <View style={styles.metrics}>
        <Metric label="Total balance" amount={money(totalBalance)} meta={`Qty ${totalQuantity} - ${partyCount} parties`} />
        <Metric right label="Avg balance / party" amount={money(avgBalancePerParty)} meta="Outstanding, per partially paid party" />
      </View>
      <Text style={styles.sectionTitle} minPresenceAhead={40}>Payment mode - party split</Text>
      <SimpleTable columns={paymentColumns} rows={paymentRows} style={styles.mb12} />
      <Text style={styles.sectionTitle} minPresenceAhead={60}>Party detail</Text>
      {codRows.length > 0 && <Group type="cod" title={`COD - ${getUniquePartyCount(codData)} parties`} columns={detailColumns} rows={codRows} />}
      {upiRows.length > 0 && <Group type="upi" title={`UPI - ${getUniquePartyCount(upiData)} parties`} columns={detailColumns} rows={upiRows} />}
      {othersRows.length > 0 && <Group type="others" title={`Others - ${getUniquePartyCount(othersData)} parties`} columns={detailColumns} rows={othersRows} />}
      {partialData.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No partially paid orders found</Text>
        </View>
      )}
      <Footer title="Partially Paid" />
    </Page>
  );
}

function PaidPage({ orderData = [], fromDate, toDate, companyName }) {
  const uniqueOrders = getUniqueOrders(orderData);
  const paidData = getValidData(uniqueOrders.filter((item) => normalizeStatus(item.STATUS) === "paid"));
  const paymentRows = createPaymentSummaryRows(paidData, false);
  const codData = getModeData(paidData, "COD");
  const upiData = getModeData(paidData, "UPI");
  const othersData = getModeData(paidData, "Others");
  const codRows = createPartyRows(codData, true, false);
  const upiRows = createPartyRows(upiData, true, false);
  const othersRows = createPartyRows(othersData, true, false);
  const totalQuantity = getTotalQuantity(paidData);
  const totalPaid = getTotalPaid(paidData);
  const partyCount = getUniquePartyCount(paidData);
  const totalBalance = getTotalBalance(paidData);
  const collectionRate = getCollectedPercentage(totalPaid, totalBalance);

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      <Tags paid fromDate={fromDate} toDate={toDate} />
      <View style={styles.metrics}>
        <Metric primary label="Total paid amount" amount={money(totalPaid)} meta={`Qty ${totalQuantity} - ${partyCount} parties`} />
        <Metric right label="Collection rate" amount={`${collectionRate}%`} meta={totalBalance <= 0 ? "No balance on filtered orders" : `Balance ${money(totalBalance)}`} />
      </View>
      <Text style={styles.sectionTitle} minPresenceAhead={40}>Payment mode - party split</Text>
      <SimpleTable columns={paidSummaryColumns} rows={paymentRows} style={styles.mb12} />
      <Text style={styles.sectionTitle} minPresenceAhead={60}>Party detail</Text>
      {codRows.length > 0 && <Group type="cod" title={`COD - ${getUniquePartyCount(codData)} parties`} columns={paidDetailColumns} rows={codRows} />}
      {upiRows.length > 0 && <Group type="upi" title={`UPI - ${getUniquePartyCount(upiData)} parties`} columns={paidDetailColumns} rows={upiRows} />}
      {othersRows.length > 0 && <Group type="others" title={`Others - ${getUniquePartyCount(othersData)} parties`} columns={paidDetailColumns} rows={othersRows} />}
      {paidData.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No paid orders found</Text>
        </View>
      )}
      <Footer title="Paid" />
    </Page>
  );
}

function PaidAndPartialPage({ orderData = [], fromDate, toDate, companyName }) {
  const uniqueOrders = getUniqueOrders(orderData);
  const paidAndPartialData = getValidData(
    uniqueOrders.filter((item) => {
      const status = normalizeStatus(item.STATUS);
      return status === "paid" || status === "partiallypaid";
    })
  );
  const paymentRows = createPaymentSummaryRows(paidAndPartialData, true);
  const partialOnlyData = paidAndPartialData.filter((item) => normalizeStatus(item.STATUS) === "partiallypaid" && getBalanceAmount(item) > 0);
  const remainingRows = createRemainingRows(partialOnlyData);
  const totalQuantity = getTotalQuantity(paidAndPartialData);
  const totalPaid = getTotalPaid(paidAndPartialData);
  const totalBalance = getTotalBalance(partialOnlyData);
  const partyCount = getUniquePartyCount(paidAndPartialData);

  return (
    <Page size="A4" style={styles.page}>
      <Header />
      <Tags paid partial fromDate={fromDate} toDate={toDate} />
      <View style={styles.metrics}>
        <Metric primary label="Total paid amount" amount={money(totalPaid)} meta={`Qty ${totalQuantity} - ${partyCount} parties`} />
        <Metric right label="Balance remaining" amount={money(totalBalance)} meta="On partially paid orders only" />
      </View>
      <Text style={styles.sectionTitle} minPresenceAhead={40}>Payment mode - party split</Text>
      <SimpleTable columns={paymentColumns} rows={paymentRows} style={styles.mb12} />
      <Text style={styles.sectionTitle} minPresenceAhead={60}>Parties with a remaining balance</Text>
      <Group type="pending" title={`Across all modes - ${getUniquePartyCount(partialOnlyData)} parties`} columns={remainingColumns} rows={remainingRows} />
      <Footer title="Paid + Partially Paid" />
    </Page>
  );
}

function createRemainingRows(data = []) {
  const grouped = data.reduce((result, item) => {
    const partyID = getPartyID(item);
    const mode = getPaymentMode(item);
    const key = `${partyID}-${mode}`;
    if (!result[key]) result[key] = { party: getPartyName(item), mode, qty: 0, balance: 0 };
    result[key].qty += getQuantity(item);
    result[key].balance += getBalanceAmount(item);
    return result;
  }, {});

  return Object.values(grouped)
    .filter((item) => item.qty > 0 || item.balance > 0)
    .sort((a, b) => b.balance - a.balance)
    .map((item) => ({
      party: item.party,
      mode: item.mode,
      qty: String(item.qty),
      balance: money(item.balance),
      styles: { balance: item.balance > 0 ? styles.balanceRed : styles.balanceZero },
    }));
}

/* =========================================================
   DOCUMENT
========================================================= */

export const OrderSummaryDocument = ({ orderData = [], fromDate, toDate, selectedStatuses = [], companyName }) => {
  const normalizedStatuses = selectedStatuses.map(normalizeStatus);
  const showDelivered = normalizedStatuses.includes("delivered");
  const showPartial = normalizedStatuses.includes("partiallypaid");
  const showPaid = normalizedStatuses.includes("paid");
  const showCombined = showPartial && showPaid;
  const noStatusSelected = !showDelivered && !showPartial && !showPaid;

  return (
    <Document title="Order Enquiry Summary" subject="Dynamic order enquiry summary">
      {(showDelivered || noStatusSelected) && <DeliveredPage orderData={orderData} fromDate={fromDate} toDate={toDate} companyName={companyName} />}
      {(showPartial || noStatusSelected) && <PartialPage orderData={orderData} fromDate={fromDate} toDate={toDate} companyName={companyName} />}
      {(showPaid || noStatusSelected) && <PaidPage orderData={orderData} fromDate={fromDate} toDate={toDate} companyName={companyName} />}
      {(showCombined || noStatusSelected) && <PaidAndPartialPage orderData={orderData} fromDate={fromDate} toDate={toDate} companyName={companyName} />}
    </Document>
  );
};

export default OrderSummaryDocument;