import React, { useState,useEffect, useMemo } from "react";
import {
    Box, Typography, Paper, TextField, Select, MenuItem,
    Button, IconButton, Tooltip, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Dialog, DialogTitle,
    DialogContent, Avatar, Chip, LinearProgress, InputAdornment,
    Stack, Divider, useTheme, useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
    Chart, ArcElement, Tooltip as CJTooltip, Legend,
    CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Employeeautocomplete, MultiFormikOptimizedselectAutocomplete } from "../../../ui-components/global/Autocomplete";
import { InvoiceAnalyticsget } from "../../../store/reducers/Formapireducer";

Chart.register(ArcElement, CJTooltip, Legend, CategoryScale, LinearScale, BarElement);

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
const C = {
    bg: "#F7F8FA",
    surface: "#FFFFFF",
    surface2: "#F1F3F7",
    border: "rgba(0,0,0,0.08)",
    border2: "rgba(0,0,0,0.12)",
    text: "#1F2937",
    muted: "#6B7280",
    accent: "#2563EB",
    green: "#16A34A",
    red: "#DC2626",
    amber: "#D97706",
    purple: "#7C3AED",
    teal: "#0D9488",
    orange: "#EA580C",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = n => "₹" + Number(n || 0).toLocaleString("en-IN");
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const inits = n => (n || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const AVATAR_COLORS = [C.accent, C.green, C.red, C.purple, C.amber, C.teal, C.orange];
const getAvatarColor = id => AVATAR_COLORS[(id || 0) % AVATAR_COLORS.length];

/**
 * ─── API → FLAT STUDENT NORMALISER ───────────────────────────────────────────
 *
 * API student shape:
 * {
 *   student_id, student_name, admission_no,
 *   category: { id, name, type },
 *   staff:    { id, name },
 *   financials: { invoice, paid, pending },
 *   due_date, status,
 *   invoices: { summary: {...}, details: [...] }
 * }
 *
 * Component expects flat shape — this function bridges the gap.
 */
const normaliseStudent = (s) => ({
    student_id: s.student_id,
    student_name: s.student_name || "Unknown",
    admission_no: s.admission_no || "-",
    // category fields — API sends nested object, may have null id/name
    category: s.category?.name || s.category?.type || "—",
    category_id: s.category?.id || null,
    category_type: s.category?.type || "Standard",
    // staff fields — API sends nested object, may have null values
    staff: s.staff?.name || "—",
    staff_id: s.staff?.id || null,
    // financials — API wraps these under financials{}
    invoice: s.financials?.invoice || 0,
    paid: s.financials?.paid || 0,
    pending: s.financials?.pending || 0,
    due_date: s.due_date || "—",
    status: s.status || "Due",
    avatar_color: getAvatarColor(s.student_id),
    // keep raw invoices object for modal
    invoices: s.invoices || { summary: {}, details: [] },
});

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const STATUS_STYLE = {
    Paid: { bg: "rgba(22,163,74,0.10)", color: C.green, border: "rgba(22,163,74,0.20)", icon: "✓" },
    Partial: { bg: "rgba(217,119,6,0.10)", color: C.amber, border: "rgba(217,119,6,0.20)", icon: "◑" },
    Due: { bg: "rgba(220,38,38,0.10)", color: C.red, border: "rgba(220,38,38,0.20)", icon: "○" },
    Overdue: { bg: "rgba(220,38,38,0.18)", color: "#EF4444", border: "rgba(220,38,38,0.30)", icon: "!" },
};
function StatusBadge({ status }) {
    const s = STATUS_STYLE[status] || STATUS_STYLE.Due;
    return (
        <Box component="span" sx={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            px: "9px", py: "3px", borderRadius: "20px", fontSize: "11px", fontWeight: 500,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        }}>
            {s.icon} {status}
        </Box>
    );
}

// ─── SURFACE CARD ─────────────────────────────────────────────────────────────
const SurfaceCard = ({ children, sx = {} }) => (
    <Box sx={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", ...sx }}>
        {children}
    </Box>
);

// ─── METRIC CARD ──────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, color, topColor }) {
    return (
        <SurfaceCard sx={{
            p: "18px 20px", position: "relative", overflow: "hidden",
            "&::before": {
                content: '""', position: "absolute", top: 0, left: 0, right: 0,
                height: "3px", background: topColor, borderRadius: "3px 3px 0 0",
            },
        }}>
            <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em", mb: "8px" }}>
                {label}
            </Typography>
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {value}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: C.muted, mt: "4px" }}>{sub}</Typography>
        </SurfaceCard>
    );
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function BarChartCard({ data }) {
    /**
     * API bar_chart shape: [{ category, invoice, paid, pending }]
     * category may be empty string — show "All" in that case.
     */
    const labels = data.map(d => d.category || "All");
    const chartData = {
        labels,
        datasets: [
            { label: "Invoiced", data: data.map(d => d.invoice), backgroundColor: "rgba(37,99,235,0.70)", borderRadius: 5, borderSkipped: false },
            { label: "Collected", data: data.map(d => d.paid), backgroundColor: "rgba(22,163,74,0.70)", borderRadius: 5, borderSkipped: false },
            { label: "Pending", data: data.map(d => d.pending), backgroundColor: "rgba(220,38,38,0.70)", borderRadius: 5, borderSkipped: false },
        ],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => fmt(ctx.parsed.y) } },
        },
        scales: {
            x: { ticks: { color: C.muted, font: { size: 10 }, maxRotation: 30 }, grid: { color: "rgba(0,0,0,0.04)" }, border: { color: C.border } },
            y: { ticks: { color: C.muted, callback: v => "₹" + (v >= 1000 ? (v / 1000) + "K" : v), font: { size: 10 } }, grid: { color: "rgba(0,0,0,0.04)" }, border: { color: C.border } },
        },
    };
    return (
        <SurfaceCard sx={{ p: "20px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: C.text, mb: "16px" }}>
                Invoice Financial Summary
            </Typography>
            <Box sx={{ height: "220px", position: "relative" }}>
                <Bar data={chartData} options={options} />
            </Box>
            <Box display="flex" flexWrap="wrap" gap="10px" mt="14px">
                {[["Invoiced", "#2563EB"], ["Collected", "#16A34A"], ["Pending", "#DC2626"]].map(([l, col]) => (
                    <Box key={l} display="flex" alignItems="center" gap="6px">
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: col }} />
                        <Typography sx={{ fontSize: "11px", color: C.muted }}>{l}</Typography>
                    </Box>
                ))}
            </Box>
        </SurfaceCard>
    );
}

// ─── DOUGHNUT CHART ───────────────────────────────────────────────────────────
const DOUGHNUT_COLORS = [C.accent, C.green, C.red, C.purple, C.amber, C.teal, C.orange];
function DoughnutCard({ data }) {
    /**
     * API doughnut_chart shape: [{ category, pending }]
     * category may be empty string — show "All" in that case.
     */
    const labels = data.map(d => d.category || "All");
    const chartData = {
        labels,
        datasets: [{
            data: data.map(d => d.pending),
            backgroundColor: DOUGHNUT_COLORS.slice(0, data.length),
            borderWidth: 2, borderColor: C.surface, hoverBorderColor: C.surface,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${fmt(ctx.parsed)}` } },
        },
    };
    return (
        <SurfaceCard sx={{ p: "20px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: C.text, mb: "16px" }}>
                Due Distribution by Category
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="16px" alignItems="center">
                <Box sx={{ height: "180px", position: "relative" }}>
                    <Doughnut data={chartData} options={options} />
                </Box>
                <Box display="flex" flexDirection="column" gap="2px">
                    {data.map((d, i) => (
                        <Box key={i} display="flex" justifyContent="space-between" alignItems="center" gap="8px">
                            <Box display="flex" alignItems="center" gap="6px">
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: DOUGHNUT_COLORS[i], flexShrink: 0 }} />
                                <Typography sx={{ fontSize: "11px", color: C.muted, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {d.category || "All"}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: C.text }}>{fmt(d.pending)}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </SurfaceCard>
    );
}

// ─── STUDENT MODAL ────────────────────────────────────────────────────────────
function StudentModal({ student, onClose }) {
    /**
     * Invoice data now lives directly on the normalised student object
     * under student.invoices — no need for a separate MOCK_INVOICES lookup.
     */
    const inv = student.invoices || { summary: {}, details: [] };
    const s = inv.summary || {};

    const thStyle = {
        fontSize: "11px", fontWeight: 600, color: C.muted,  letterSpacing: "0.05em",
        background: C.surface2, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", py: "10px", px: "12px",
    };
    const tdStyle = { fontSize: "12px", color: C.text, borderBottom: `1px solid ${C.border}`, py: "12px", px: "12px" };

    return (
        <Dialog open onClose={onClose} maxWidth="lg" fullWidth PaperProps={{
            sx: { background: C.surface, border: `1px solid ${C.border2}`, borderRadius: "16px", color: C.text },
        }}>
            {/* Header */}
            <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                px: "24px", py: "16px", borderBottom: `1px solid ${C.border}`,
                position: "sticky", top: 0, background: C.surface, zIndex: 1,
            }}>
                <Box display="flex" alignItems="center" gap="12px">
                    <Avatar sx={{ width: 38, height: 38, fontSize: "13px", fontWeight: 700, background: student.avatar_color }}>
                        {inits(student.student_name)}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: C.text }}>{student.student_name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: C.muted }}>Invoice Breakdown · {student.admission_no}</Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small"
                    sx={{ border: `1px solid ${C.border2}`, color: C.muted, "&:hover": { background: C.surface2, color: C.text } }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {/* Meta grid */}
                <Box display="grid" gridTemplateColumns="repeat(4,1fr)" gap="10px" px="24px" py="16px"
                    sx={{ borderBottom: `1px solid ${C.border}` }}>
                    {[["Admission No", student.admission_no], ["Category", student.category], ["Staff", student.staff], ["Status", null]].map(([l, v]) => (
                        <Box key={l}>
                            <Typography sx={{ fontSize: "10px", color: C.muted,  letterSpacing: "0.05em", mb: "3px" }}>{l}</Typography>
                            {l === "Status"
                                ? <StatusBadge status={student.status} />
                                : <Typography sx={{ fontSize: "13px", fontWeight: 500, color: C.text }}>{v}</Typography>}
                        </Box>
                    ))}
                </Box>

                {/* Summary cards */}
                <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap="10px" px="24px" py="16px"
                    sx={{ borderBottom: `1px solid ${C.border}` }}>
                    {[
                        ["Total Invoice", fmt(s.invoice_total ?? student.invoice), C.text],
                        ["Total Paid", fmt(s.paid_total ?? student.paid), C.green],
                        ["Total Pending", fmt(s.pending_total ?? student.pending), C.red],
                    ].map(([l, v, col]) => (
                        <Box key={l} sx={{ background: C.surface2, borderRadius: "8px", p: "12px 14px" }}>
                            <Typography sx={{ fontSize: "10px", color: C.muted,  letterSpacing: "0.05em", mb: "4px" }}>{l}</Typography>
                            <Typography sx={{ fontSize: "20px", fontWeight: 700, color: col }}>{v}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* Invoice detail table */}
                <Box px="24px" py="20px">
                    <Typography sx={{ fontSize: "12px", color: C.muted, fontWeight: 600,  letterSpacing: "0.05em", mb: "12px" }}>
                        Invoice Details
                    </Typography>
                    <Box sx={{ overflowX: "auto" }}>
                        <Table size="small" sx={{ width: "100%", borderCollapse: "collapse" }}>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Invoice No", "Date", "Description",
                                        "Invoice Amt", "Paid", "Pending",
                                        "Last Paid Date", "Payment Mode", "Reference",
                                        "Due Date", "Status",
                                    ].map(h => (
                                        <TableCell key={h} sx={thStyle}>{h}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inv.details?.length ? inv.details.map((d, i) => (
                                    <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                                        <TableCell sx={{ ...tdStyle, fontWeight: 600, color: C.accent }}>{d.invoice_no}</TableCell>
                                        <TableCell sx={tdStyle}>{d.invoice_date}</TableCell>
                                        {/* description can be null from API */}
                                        <TableCell sx={{ ...tdStyle, color: d.description ? C.text : C.muted }}>
                                            {d.description || "—"}
                                        </TableCell>
                                        <TableCell sx={tdStyle}>{fmt(d.invoice_amount)}</TableCell>
                                        <TableCell sx={{ ...tdStyle, color: C.green }}>{fmt(d.paid_amount)}</TableCell>
                                        <TableCell sx={{ ...tdStyle, color: d.pending_amount > 0 ? C.red : C.muted }}>
                                            {fmt(d.pending_amount)}
                                        </TableCell>
                                        {/* NEW fields from API */}
                                        <TableCell sx={{ ...tdStyle, color: C.muted }}>{d.last_paid_date || "—"}</TableCell>
                                        <TableCell sx={tdStyle}>{d.payment_mode || "—"}</TableCell>
                                        <TableCell sx={{ ...tdStyle, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            <Tooltip title={d.payment_reference || ""} placement="top">
                                                <span>{d.payment_reference || "—"}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={tdStyle}>{d.due_date}</TableCell>
                                        <TableCell sx={tdStyle}><StatusBadge status={d.status} /></TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={11} sx={{ textAlign: "center", py: "40px", fontSize: "13px", color: C.muted, border: 0 }}>
                                            No invoice data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function InvoiceAnalytics() {
    const isTablet = useMediaQuery("(max-width:900px)");

    // Filter state
    const [termData, setTermData] = useState(null);
//     const [fromPeriod, setFromPeriod] = useState("");
// const [toPeriod, setToPeriod] = useState("");
    // const [categoryData, setCategoryData] = useState(null);
    // const [attempData, setAttempData] = useState(null);

    // API result state
    const [apiData, setApiData] = useState(null);  // full API response
    const [loading, setLoading] = useState(false);
// ── Date helpers ─────────────────────────────────────────────────────────────
const getDefaultDates = () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const fmt = d => d.toISOString().split("T")[0]; // "YYYY-MM-DD"
    return { from: fmt(threeMonthsAgo), to: fmt(today) };
};

const { from: defaultFrom, to: defaultTo } = getDefaultDates();

// Filter state
const [fromPeriod, setFromPeriod] = useState(defaultFrom);   // last 3 months
const [toPeriod,   setToPeriod]   = useState(defaultTo);     // today
const [categoryData, setCategoryData] = useState(null);      // empty
const [attempData,   setAttempData]   = useState(null);      // empty
    // Table state
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [sortCol, setSortCol] = useState("pending");
    const [sortDir, setSortDir] = useState("desc");
    const [modal, setModal] = useState(null);
    const EMPID = sessionStorage.getItem("EmpId");
    const CompanyID = sessionStorage.getItem("compID");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const dispatch = useDispatch();
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    // ── Normalised student list from API ────────────────────────────────────
    const students = useMemo(() =>
        (apiData?.students || []).map(normaliseStudent),
        [apiData]);

    // ── Filtered + sorted list ───────────────────────────────────────────────
    const filtered = useMemo(() =>
        students.filter(s => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
                s.student_name.toLowerCase().includes(q) ||
                s.admission_no.toLowerCase().includes(q) ||
                s.category.toLowerCase().includes(q) ||
                s.staff.toLowerCase().includes(q)
            );
        }),
        [students, search]);
// ── Auto-fetch on mount with default date range ───────────────────────────
useEffect(() => {
    handleApply({ fromPeriod: defaultFrom, toPeriod: defaultTo ,CompanyID: CompanyID,
        staffID: "",
        CategoryID: "",});
}, []); // eslint-disable-line react-hooks/exhaustive-deps
    const sorted = useMemo(() =>
        [...filtered].sort((a, b) => {
            let av = a[sortCol], bv = b[sortCol];
            if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
        }),
        [filtered, sortCol, sortDir]);

    // ── Summary — prefer API summary, fall back to derived ──────────────────
    const summary = useMemo(() => ({
        total_invoice: apiData?.summary?.total_invoice ?? filtered.reduce((s, r) => s + r.invoice, 0),
        total_paid: apiData?.summary?.total_paid ?? filtered.reduce((s, r) => s + r.paid, 0),
        total_pending: apiData?.summary?.total_pending ?? filtered.reduce((s, r) => s + r.pending, 0),
        total_students: apiData?.summary?.total_students ?? filtered.length,
        overdue_count: apiData?.summary?.overdue_students ?? filtered.filter(s => s.status === "Overdue").length,
        collection_pct: apiData?.summary?.collection_percentage ?? 0,
    }), [apiData, filtered]);

    // ── Chart data — comes directly from API now ─────────────────────────────
    const barData = apiData?.charts?.bar_chart || [];
    const doughnutData = apiData?.charts?.doughnut_chart || [];

    // ── Sort handler ─────────────────────────────────────────────────────────
    const handleSort = col => {
        if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortCol(col); setSortDir("desc"); }
    };

    const SortIcon = ({ col }) => {
        if (sortCol !== col) return <UnfoldMoreIcon sx={{ fontSize: 13, opacity: .5, verticalAlign: "middle", ml: "3px" }} />;
        return sortDir === "asc"
            ? <ArrowUpwardIcon sx={{ fontSize: 12, color: C.accent, verticalAlign: "middle", ml: "3px" }} />
            : <ArrowDownwardIcon sx={{ fontSize: 12, color: C.accent, verticalAlign: "middle", ml: "3px" }} />;
    };

    // ── Apply / fetch ────────────────────────────────────────────────────────
    const handleApply = async () => {
    const payload = {
        CompanyID: CompanyID || "",
        staffID: attempData?.RecordID || "",
        CategoryID: categoryData?.RecordID || "",
        fromPeriod: fromPeriod || "",   // was: termData?.FromDate || ""
        toPeriod: toPeriod || "",       // was: termData?.ToDate || ""
    };

        setLoading(true);
        try {
            const result = await dispatch(InvoiceAnalyticsget(payload)).unwrap();
            // result is the full API response object
            setApiData(result);
            setPage(0);
            setSearch("");
        } catch (error) {
            console.error("Invoice Analytics Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ── Table columns ────────────────────────────────────────────────────────
    const COLS = [
        { key: "student_name", label: "Student Name" },
        { key: "admission_no", label: "Admission No" },
        { key: "category", label: "Category" },
        { key: "staff", label: "Staff" },
        { key: "invoice", label: "Total Invoice" },
        { key: "paid", label: "Paid" },
        { key: "pending", label: "Pending" },
        { key: "due_date", label: "Due Date" },
        { key: "status", label: "Status" },
    ];

    const thSx = {
        fontSize: "11px", fontWeight: 600, color: C.muted, 
        letterSpacing: "0.05em", background: C.surface2, borderBottom: `1px solid ${C.border}`,
        whiteSpace: "nowrap", py: "12px", px: "16px", cursor: "pointer",
        userSelect: "none", "&:hover": { color: C.text },
    };
    const tdSx = { fontSize: "13px", color: C.text, borderBottom: `1px solid ${C.border}`, py: "13px", px: "16px", whiteSpace: "nowrap" };

    const filterInputSx = {
        "& .MuiInputBase-root": { background: C.surface2, borderRadius: "8px" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: C.border2 },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: C.border2 },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: C.accent },
        "& input, & .MuiSelect-select": { color: C.text, fontSize: "13px" },
        "& .MuiSvgIcon-root": { color: C.muted },
    };

    return (
        <Box sx={{ background: C.bg, minHeight: "100vh", p: { xs: "16px", sm: "28px 24px" }, maxWidth: 1440, mx: "auto" }}>

            {/* ── HEADER ── */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="10px">
                <Typography sx={{ fontSize: "22px", fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>
                    Invoice Analytics Dashboard
                </Typography>
                {/* <Box sx={{
                    fontSize: "11px", px: "10px", py: "4px",
                    background: "rgba(37,99,235,0.12)", color: C.accent,
                    borderRadius: "20px", border: "1px solid rgba(37,99,235,0.25)", fontWeight: 500,
                }}>
                    Live Data
                </Box> */}
            </Box>

            {/* ── FILTER BAR ── */}
            <SurfaceCard sx={{ p: "16px 20px", mb: "24px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
                {/* Term */}
                {/* <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em" }}>Term</Typography>
                    <Employeeautocomplete
                        name="Term"
                        id="Term"
                        value={termData}
                        onChange={(newValue) => setTermData(newValue)}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2155","ScreenName":"Terms","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                    />
                </Box> */}
                {/* From period */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em" }}>
                        From Period
                    </Typography>
                    <TextField
                        type="date"
                        size="small"
                        value={fromPeriod}
                        onChange={e => setFromPeriod(e.target.value)}
                        sx={filterInputSx}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                {/* To period */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em" }}>
                        To Period
                    </Typography>
                    <TextField
                        type="date"
                        size="small"
                        value={toPeriod}
                        onChange={e => setToPeriod(e.target.value)}
                        sx={filterInputSx}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                {/* Category */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={160}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em" }}>
                        {is003Subscription ? "Standard/Activities" : "Project"}
                    </Typography>
                                         {/* <MultiFormikOptimizedselectAutocomplete                         */}

                     <Employeeautocomplete
                     
                        name="category"
                        id="category"
                        value={categoryData}
                        onChange={(newValue) => setCategoryData(newValue)}
                        url={`${listViewurl}?data=${JSON.stringify({
                            Query: {
                                AccessID: "2054",
                                ScreenName: "Project",
                                VerticalLicense: Subscriptionlastthree,
                                Filter: `parentID='${CompanyID}'`,
                                Any: "",
                            },
                        })}`} />
                </Box>

                {/* Staff */}
                {/* <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500,  letterSpacing: "0.05em" }}>Staff</Typography>
                    <Employeeautocomplete
                        name="Employee"
                        id="Employee"
                        value={attempData}
                        onChange={(newValue) => {
                            setAttempData(newValue);
                            if (newValue) sessionStorage.setItem("attempData", JSON.stringify(newValue));
                            else sessionStorage.removeItem("attempData");
                        }}
                        // url={`${listViewurl}?data={"Query":{"AccessID":"2115","ScreenName":"Employee","Filter":"ParentID=${EMPID}","Any":""}}`}
                        url={`${listViewurl}?data=${JSON.stringify({
                            Query: {
                                AccessID: "2116",
                                ScreenName: "Personnel",
                                VerticalLicense: Subscriptionlastthree,
                                Filter: `CompanyID='${CompanyID}'`,
                                Any: "",
                            },
                        })}`}
                        fullWidth
                    />
                </Box> */}

                {/* Apply */}
                <Button
                    variant="contained"
                    onClick={handleApply}
                    disabled={loading}
                    sx={{
                        height: "40px", px: "24px", background: C.accent,
                        borderRadius: "8px", fontWeight: 600, fontSize: "13px",
                        textTransform: "none", letterSpacing: "0.02em",
                        "&:hover": { background: C.accent, opacity: 0.9 },
                        whiteSpace: "nowrap",
                    }}
                >
                    {loading ? "Loading…" : "Apply"}
                </Button>
            </SurfaceCard>

            {/* ── METRIC CARDS ── */}
            <Box display="grid" gridTemplateColumns={isTablet ? "1fr" : "repeat(3,1fr)"} gap="14px" mb="24px">
                <MetricCard
                    label="Total Invoiced"
                    value={fmt(summary.total_invoice)}
                    sub={`${summary.total_students} student(s)`}
                    color={C.accent}
                    topColor={`linear-gradient(90deg,${C.accent},#7DB4FB)`}
                />
                <MetricCard
                    label="Total Collected"
                    value={fmt(summary.total_paid)}
                    sub={`${summary.collection_pct}% collection rate`}
                    color={C.green}
                    topColor={`linear-gradient(90deg,${C.green},#6EE7B7)`}
                />
                <MetricCard
                    label="Total Pending"
                    value={fmt(summary.total_pending)}
                    sub={`${summary.overdue_count} overdue student(s)`}
                    color={C.red}
                    topColor={`linear-gradient(90deg,${C.red},#FCA5A5)`}
                />
            </Box>

            {/* ── CHARTS ── */}
            {(barData.length > 0 || doughnutData.length > 0) && (
                <Box display="grid" gridTemplateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="16px" mb="24px">
                    {barData.length > 0 && <BarChartCard data={barData} />}
                    {doughnutData.length > 0 && <DoughnutCard data={doughnutData} />}
                </Box>
            )}

            {/* ── TABLE SECTION ── */}
            <Box>
                {/* Controls */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb="14px" flexWrap="wrap" gap="10px">
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", color: C.text }}>Due Students</Typography>
                    <Box display="flex" alignItems="center" gap="10px" flexWrap="wrap">
                        <TextField
                            size="small"
                            placeholder="Search"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(0); }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ fontSize: 14, color: C.muted }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ ...filterInputSx, width: 200, "& input": { fontSize: "13px" } }}
                        />
                        {/* <Select
                            size="small"
                            value={perPage}
                            onChange={e => { setPerPage(Number(e.target.value)); setPage(0); }}
                            sx={{ ...filterInputSx, minWidth: 110 }}
                        >
                            {[5, 8, 10, 20].map(n => (
                                <MenuItem key={n} value={n} sx={{ fontSize: "13px" }}>{n} / page</MenuItem>
                            ))}
                        </Select> */}
                    </Box>
                </Box>

                {/* Table */}
                <SurfaceCard sx={{ overflow: "hidden" }}>
                    <Box sx={{ overflowX: "auto" }}>
                        <Table size="small" sx={{ width: "100%", borderCollapse: "collapse" }}>
                            <TableHead>
                                <TableRow>
                                    {COLS.map(c => (
                                        <TableCell key={c.key} onClick={() => handleSort(c.key)} sx={thSx}>
                                            {c.label}
                                            <SortIcon col={c.key} />
                                        </TableCell>
                                    ))}
                                    <TableCell sx={thSx}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sorted.slice(page * perPage, (page + 1) * perPage).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} sx={{ textAlign: "center", py: "40px", fontSize: "13px", color: C.muted, border: 0 }}>
                                            {apiData ? "No records found" : "Apply filters to load data"}
                                        </TableCell>
                                    </TableRow>
                                ) : sorted.slice(page * perPage, (page + 1) * perPage).map(s => {
                                    const isOverdue = s.status === "Overdue";
                                    const pendingPct = pct(s.pending, s.invoice);
                                    return (
                                        <TableRow
                                            key={s.student_id}
                                            onClick={() => setModal(s)}
                                            sx={{
                                                cursor: "pointer",
                                                background: isOverdue ? "rgba(220,38,38,0.04)" : "transparent",
                                                "&:hover td": { background: isOverdue ? "rgba(220,38,38,0.08)" : C.surface2 },
                                                "&:last-child td": { borderBottom: 0 },
                                            }}
                                        >
                                            {/* Student name + avatar */}
                                            <TableCell sx={tdSx}>
                                                <Box display="flex" alignItems="center" gap="8px">
                                                    <Avatar sx={{ width: 30, height: 30, fontSize: "11px", fontWeight: 700, background: s.avatar_color }}>
                                                        {inits(s.student_name)}
                                                    </Avatar>
                                                    <Typography sx={{ fontWeight: 500, fontSize: "13px", color: C.text }}>{s.student_name}</Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell sx={{ ...tdSx, color: C.muted }}>{s.admission_no}</TableCell>

                                            {/* Category badge */}
                                            <TableCell sx={tdSx}>
                                                <Box component="span" sx={{
                                                    display: "inline-flex", alignItems: "center", gap: "4px",
                                                    px: "9px", py: "3px", borderRadius: "20px", fontSize: "11px", fontWeight: 500,
                                                    ...(s.category_type === "Standard"
                                                        ? { background: "rgba(37,99,235,0.10)", color: C.accent, border: `1px solid rgba(37,99,235,0.20)` }
                                                        : { background: "rgba(124,58,237,0.10)", color: C.purple, border: `1px solid rgba(124,58,237,0.20)` }),
                                                }}>
                                                    {s.category_type === "Standard"} {s.category}
                                                </Box>
                                            </TableCell>

                                            <TableCell sx={tdSx}>{s.staff}</TableCell>
                                            <TableCell sx={{ ...tdSx, fontWeight: 500 }}>{fmt(s.invoice)}</TableCell>
                                            <TableCell sx={{ ...tdSx, color: C.green }}>{fmt(s.paid)}</TableCell>

                                            {/* Pending + progress bar */}
                                            <TableCell sx={tdSx}>
                                                <Typography sx={{ color: C.red, fontWeight: 600, fontSize: "13px" }}>{fmt(s.pending)}</Typography>
                                                <Box sx={{ width: 70, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: "2px", overflow: "hidden", mt: "4px" }}>
                                                    <Box sx={{ width: `${pendingPct}%`, height: "100%", background: C.red, borderRadius: "2px" }} />
                                                </Box>
                                            </TableCell>

                                            <TableCell sx={{ ...tdSx, color: isOverdue ? C.red : C.muted, fontSize: "12px" }}>
                                                {isOverdue && <WarningAmberIcon sx={{ fontSize: 12, mr: "3px", verticalAlign: "middle" }} />}
                                                {s.due_date}
                                            </TableCell>

                                            <TableCell sx={tdSx}><StatusBadge status={s.status} /></TableCell>

                                            {/* Action */}
                                            <TableCell sx={tdSx} onClick={e => e.stopPropagation()}>
                                                <Box
                                                    component="button"
                                                    onClick={() => setModal(s)}
                                                    sx={{
                                                        px: "12px", py: "5px", borderRadius: "8px",
                                                        border: `1px solid ${C.border2}`,
                                                        background: "transparent", color: C.accent,
                                                        cursor: "pointer", fontSize: "12px",
                                                        fontFamily: "inherit", fontWeight: 500, transition: "all .15s",
                                                        "&:hover": { background: "rgba(37,99,235,0.10)", borderColor: C.accent },
                                                    }}
                                                >
                                                    View
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>

                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={sorted.length}
                        page={page}
                        rowsPerPage={perPage}
                        rowsPerPageOptions={[5, 8, 10, 20]}
                        onPageChange={(_, p) => setPage(p)}
                        onRowsPerPageChange={e => { setPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                        sx={{
                            borderTop: `1px solid ${C.border}`,
                            color: C.muted,
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { fontSize: "12px", color: C.muted },
                            "& .MuiTablePagination-select": { color: C.text, fontSize: "12px" },
                            "& .MuiIconButton-root": { color: C.muted, "&:hover": { color: C.text } },
                            "& .MuiIconButton-root.Mui-disabled": { color: `${C.muted}55` },
                        }}
                    />
                </SurfaceCard>
            </Box>

            {/* ── MODAL ── */}
            {modal && <StudentModal student={modal} onClose={() => setModal(null)} />}
        </Box>
    );
}
