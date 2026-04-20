import React, { useState, useMemo } from "react";
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
import SchoolIcon from "@mui/icons-material/School";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {
    Chart, ArcElement, Tooltip as CJTooltip, Legend,
    CategoryScale, LinearScale, BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import { useDispatch } from "react-redux";
import { InvoiceAnalyticsget } from "../../../store/reducers/Formapireducer";

Chart.register(ArcElement, CJTooltip, Legend, CategoryScale, LinearScale, BarElement);

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
// const C = {
//   bg:       "#0F1117",
//   surface:  "#181C26",
//   surface2: "#1F2433",
//   border:   "rgba(255,255,255,0.07)",
//   border2:  "rgba(255,255,255,0.12)",
//   text:     "#E8EAF0",
//   muted:    "#7A8099",
//   accent:   "#4F8EF7",
//   green:    "#34D399",
//   red:      "#F87171",
//   amber:    "#FBBF24",
//   purple:   "#A78BFA",
//   teal:     "#2DD4BF",
//   orange:   "#FB923C",
// };
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
// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const CATEGORIES = [
    { id: "std_1a", label: "Standard - 1 A", type: "STANDARD" },
    { id: "std_1b", label: "Standard - 1 B", type: "STANDARD" },
    { id: "std_2a", label: "Standard - 2 A", type: "STANDARD" },
    { id: "std_2b", label: "Standard - 2 B", type: "STANDARD" },
    { id: "act_music", label: "Activity - Music Class", type: "ACTIVITY" },
    { id: "act_dance", label: "Activity - Dance Class", type: "ACTIVITY" },
    { id: "act_karate", label: "Activity - Karate", type: "ACTIVITY" },
];
const STAFF = [
    { id: "priya", name: "Priya Sharma" },
    { id: "ravi", name: "Ravi Kumar" },
    { id: "meena", name: "Meena Nair" },
    { id: "anand", name: "Anand Raj" },
];
const MOCK_STUDENTS = [
    { student_id: 101, student_name: "Arun Kumar", admission_no: "ST101", category: "Standard - 1 A", category_id: "std_1a", category_type: "STANDARD", staff: "Priya Sharma", staff_id: "priya", invoice: 12000, paid: 8000, pending: 4000, due_date: "2026-04-15", status: "Partial", avatar_color: C.accent },
    { student_id: 102, student_name: "Divya Priya", admission_no: "ST102", category: "Activity - Dance Class", category_id: "act_dance", category_type: "ACTIVITY", staff: "Meena Nair", staff_id: "meena", invoice: 8500, paid: 0, pending: 8500, due_date: "2026-03-31", status: "Overdue", avatar_color: C.red },
    { student_id: 103, student_name: "Karthik Rajan", admission_no: "ST103", category: "Standard - 1 B", category_id: "std_1b", category_type: "STANDARD", staff: "Ravi Kumar", staff_id: "ravi", invoice: 10000, paid: 5000, pending: 5000, due_date: "2026-04-20", status: "Partial", avatar_color: C.green },
    { student_id: 104, student_name: "Ananya Suresh", admission_no: "ST104", category: "Activity - Music Class", category_id: "act_music", category_type: "ACTIVITY", staff: "Anand Raj", staff_id: "anand", invoice: 6000, paid: 1500, pending: 4500, due_date: "2026-04-10", status: "Overdue", avatar_color: C.amber },

];
const MOCK_INVOICES = {
    101: {
        summary: { invoice_total: 12000, paid_total: 8000, pending_total: 4000 }, details: [
            { invoice_no: "INV-1001", invoice_date: "2026-01-10", description: "Term Fee - Q1", invoice_amount: 6000, paid_amount: 6000, pending_amount: 0, due_date: "2026-01-31", status: "Paid" },
            { invoice_no: "INV-1002", invoice_date: "2026-03-05", description: "Term Fee - Q2", invoice_amount: 6000, paid_amount: 2000, pending_amount: 4000, due_date: "2026-04-15", status: "Partial" },
        ]
    },
    102: {
        summary: { invoice_total: 8500, paid_total: 0, pending_total: 8500 }, details: [
            { invoice_no: "INV-1021", invoice_date: "2026-02-01", description: "Dance Class - Term Fee", invoice_amount: 5000, paid_amount: 0, pending_amount: 5000, due_date: "2026-03-31", status: "Overdue" },
            { invoice_no: "INV-1022", invoice_date: "2026-02-01", description: "Costume & Materials", invoice_amount: 3500, paid_amount: 0, pending_amount: 3500, due_date: "2026-03-31", status: "Overdue" },
        ]
    },
    103: {
        summary: { invoice_total: 10000, paid_total: 5000, pending_total: 5000 }, details: [
            { invoice_no: "INV-1031", invoice_date: "2026-01-15", description: "Annual Fee", invoice_amount: 10000, paid_amount: 5000, pending_amount: 5000, due_date: "2026-04-20", status: "Partial" },
        ]
    },
    104: {
        summary: { invoice_total: 6000, paid_total: 1500, pending_total: 4500 }, details: [
            { invoice_no: "INV-1041", invoice_date: "2026-01-20", description: "Music Class Term Fee", invoice_amount: 4000, paid_amount: 1500, pending_amount: 2500, due_date: "2026-04-10", status: "Partial" },
            { invoice_no: "INV-1042", invoice_date: "2026-02-10", description: "Instrument Rental", invoice_amount: 2000, paid_amount: 0, pending_amount: 2000, due_date: "2026-04-10", status: "Overdue" },
        ]
    },
    105: {
        summary: { invoice_total: 14000, paid_total: 11000, pending_total: 3000 }, details: [
            { invoice_no: "INV-1051", invoice_date: "2026-01-05", description: "Term Fee Q1", invoice_amount: 7000, paid_amount: 7000, pending_amount: 0, due_date: "2026-02-28", status: "Paid" },
            { invoice_no: "INV-1052", invoice_date: "2026-03-01", description: "Term Fee Q2", invoice_amount: 7000, paid_amount: 4000, pending_amount: 3000, due_date: "2026-04-28", status: "Partial" },
        ]
    },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const inits = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const AVATAR_COLORS = [C.accent, C.green, C.red, C.purple, C.amber, C.teal, C.orange];
const getAvatarColor = id => AVATAR_COLORS[id % AVATAR_COLORS.length];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const STATUS_STYLE = {
    Paid: { bg: "rgba(52,211,153,0.12)", color: C.green, border: "rgba(52,211,153,0.2)", icon: "✓" },
    Partial: { bg: "rgba(251,191,36,0.12)", color: C.amber, border: "rgba(251,191,36,0.2)", icon: "◑" },
    Due: { bg: "rgba(248,113,113,0.12)", color: C.red, border: "rgba(248,113,113,0.2)", icon: "○" },
    Overdue: { bg: "rgba(239,68,68,0.2)", color: "#FC8181", border: "rgba(239,68,68,0.3)", icon: "!" },
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
    <Box sx={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "12px",
        ...sx,
    }}>
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
                height: "3px", background: topColor, borderRadius: "3px 3px 0 0"
            },
        }}>
            <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", mb: "8px" }}>
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
    const chartData = {
        labels: data.labels,
        datasets: [
            { label: "Invoiced", data: data.invoice, backgroundColor: "rgba(79,142,247,0.7)", borderRadius: 5, borderSkipped: false },
            { label: "Collected", data: data.paid, backgroundColor: "rgba(52,211,153,0.7)", borderRadius: 5, borderSkipped: false },
            { label: "Pending", data: data.pending, backgroundColor: "rgba(248,113,113,0.7)", borderRadius: 5, borderSkipped: false },
        ],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => fmt(ctx.parsed.y) } },
        },
        scales: {
            x: { ticks: { color: C.muted, font: { size: 10 }, maxRotation: 30 }, grid: { color: "rgba(255,255,255,0.04)" }, border: { color: C.border } },
            y: { ticks: { color: C.muted, callback: v => "₹" + (v >= 1000 ? (v / 1000) + "K" : v), font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { color: C.border } },
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
                {[["Invoiced", "#4F8EF7"], ["Collected", "#34D399"], ["Pending", "#F87171"]].map(([l, col]) => (
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
    const chartData = {
        labels: data.map(d => d.name),
        datasets: [{
            data: data.map(d => d.due),
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
                <Box display="flex" flexDirection="column" gap="7px">
                    {data.map((d, i) => (
                        <Box key={d.name} display="flex" justifyContent="space-between" alignItems="center" gap="8px">
                            <Box display="flex" alignItems="center" gap="6px">
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: DOUGHNUT_COLORS[i], flexShrink: 0 }} />
                                <Typography sx={{ fontSize: "11px", color: C.muted, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {d.name}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: C.text }}>{fmt(d.due)}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </SurfaceCard>
    );
}

// ─── STUDENT MODAL ────────────────────────────────────────────────────────────
function StudentModal({ student, onClose }) {
    const inv = MOCK_INVOICES[student.student_id] || {
        summary: { invoice_total: student.invoice, paid_total: student.paid, pending_total: student.pending },
        details: [],
    };
    const s = inv.summary;
    const thStyle = {
        fontSize: "11px", fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em",
        background: C.surface2, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap", py: "10px", px: "12px"
    };
    const tdStyle = { fontSize: "12px", color: C.text, borderBottom: `1px solid ${C.border}`, py: "12px", px: "12px" };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth PaperProps={{
            sx: { background: C.surface, border: `1px solid ${C.border2}`, borderRadius: "16px", color: C.text },
        }}>
            {/* Header */}
            <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                px: "24px", py: "16px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.surface, zIndex: 1
            }}>
                <Box display="flex" alignItems="center" gap="12px">
                    <Avatar sx={{
                        width: 38, height: 38, fontSize: "13px", fontWeight: 700,
                        background: student.avatar_color || getAvatarColor(student.student_id)
                    }}>
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
                            <Typography sx={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", mb: "3px" }}>{l}</Typography>
                            {l === "Status"
                                ? <StatusBadge status={student.status} />
                                : <Typography sx={{ fontSize: "13px", fontWeight: 500, color: C.text }}>{v}</Typography>}
                        </Box>
                    ))}
                </Box>

                {/* Summary cards */}
                <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap="10px" px="24px" py="16px"
                    sx={{ borderBottom: `1px solid ${C.border}` }}>
                    {[["Total Invoice", fmt(s.invoice_total), C.text], ["Total Paid", fmt(s.paid_total), C.green], ["Total Pending", fmt(s.pending_total), C.red]].map(([l, v, col]) => (
                        <Box key={l} sx={{ background: C.surface2, borderRadius: "8px", p: "12px 14px" }}>
                            <Typography sx={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", mb: "4px" }}>{l}</Typography>
                            <Typography sx={{ fontSize: "20px", fontWeight: 700, color: col }}>{v}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* Invoice detail table */}
                <Box px="24px" py="20px">
                    <Typography sx={{ fontSize: "12px", color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", mb: "12px" }}>
                        Invoice Details
                    </Typography>
                    <Box sx={{ overflowX: "auto" }}>
                        <Table size="small" sx={{ width: "100%", borderCollapse: "collapse" }}>
                            <TableHead>
                                <TableRow>
                                    {["Invoice No", "Date", "Description", "Invoice Amt", "Paid", "Pending", "Due Date", "Status"].map(h => (
                                        <TableCell key={h} sx={thStyle}>{h}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inv.details.length ? inv.details.map((d, i) => (
                                    <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                                        <TableCell sx={{ ...tdStyle, fontWeight: 600, color: C.accent }}>{d.invoice_no}</TableCell>
                                        <TableCell sx={tdStyle}>{d.invoice_date}</TableCell>
                                        <TableCell sx={tdStyle}>{d.description}</TableCell>
                                        <TableCell sx={tdStyle}>{fmt(d.invoice_amount)}</TableCell>
                                        <TableCell sx={{ ...tdStyle, color: C.green }}>{fmt(d.paid_amount)}</TableCell>
                                        <TableCell sx={{ ...tdStyle, color: d.pending_amount > 0 ? C.red : C.muted }}>{fmt(d.pending_amount)}</TableCell>
                                        <TableCell sx={tdStyle}>{d.due_date}</TableCell>
                                        <TableCell sx={tdStyle}><StatusBadge status={d.status} /></TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{ textAlign: "center", py: "40px", fontSize: "13px", color: C.muted, border: 0 }}>
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
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

    // Filter state
    const [filters, setFilters] = useState({ term: "Select", category: "all", staff: "all" });
    const [applied, setApplied] = useState(filters);
    const [termData, setTermData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    // Table state
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [sortCol, setSortCol] = useState("pending");
    const [sortDir, setSortDir] = useState("desc");
    const [timeproData, settimeproData] = useState(null);
    const [modal, setModal] = useState(null);
    const [attempData, setattempData] = useState(null);
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
    const is003Subscription = SubscriptionCode.endsWith("003");
    console.log(SubscriptionCode, is003Subscription, "SubscriptionCode");
    const EMPID = sessionStorage.getItem("EmpId");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const CompanyID = sessionStorage.getItem("companyId");
const dispatch = useDispatch();
    // ── Derived data ──────────────────────────────────────────────────────────
    const filtered = useMemo(() =>
        MOCK_STUDENTS.filter(s => {
            if (applied.category !== "all" && s.category_id !== applied.category) return false;
            if (applied.staff !== "all" && s.staff_id !== applied.staff) return false;
            if (search) {
                const q = search.toLowerCase();
                return s.student_name.toLowerCase().includes(q)
                    || s.admission_no.toLowerCase().includes(q)
                    || s.category.toLowerCase().includes(q)
                    || s.staff.toLowerCase().includes(q);
            }
            return true;
        }), [applied, search]);

    const sorted = useMemo(() => [...filtered].sort((a, b) => {
        let av = a[sortCol], bv = b[sortCol];
        if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
        return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    }), [filtered, sortCol, sortDir]);

    const summary = useMemo(() => ({
        total_invoice: filtered.reduce((s, r) => s + r.invoice, 0),
        total_paid: filtered.reduce((s, r) => s + r.paid, 0),
        total_pending: filtered.reduce((s, r) => s + r.pending, 0),
    }), [filtered]);

    const barData = useMemo(() => {
        const cats = {};
        filtered.forEach(s => {
            if (!cats[s.category]) cats[s.category] = { invoice: 0, paid: 0, pending: 0 };
            cats[s.category].invoice += s.invoice;
            cats[s.category].paid += s.paid;
            cats[s.category].pending += s.pending;
        });
        const labels = Object.keys(cats).map(k => k.replace("Standard - ", "").replace("Activity - ", ""));
        return { labels, invoice: Object.values(cats).map(v => v.invoice), paid: Object.values(cats).map(v => v.paid), pending: Object.values(cats).map(v => v.pending) };
    }, [filtered]);

    const doughnutData = useMemo(() => {
        const cats = {};
        filtered.forEach(s => { cats[s.category] = (cats[s.category] || 0) + s.pending; });
        return Object.entries(cats)
            .map(([name, due]) => ({ name: name.replace("Standard - ", "").replace("Activity - ", ""), due }))
            .filter(d => d.due > 0);
    }, [filtered]);

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
        fontSize: "11px", fontWeight: 600, color: C.muted, textTransform: "uppercase",
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
    const handleApply = async () => {
        console.log("Apply clicked");

        const payload = {
            CompanyID: "502",
            // CompanyID || "",
            staffID: attempData?.RecordID || "",
            CategoryID: "562",
            // categoryData?.RecordID || "",
            fromPeriod: "",
            // termData?.FromDate || "",
            toPeriod: ""
            // termData?.ToDate || "",
        };

        console.log("Payload:", payload);

        try {
            const result = await dispatch(InvoiceAnalyticsget(payload)).unwrap();
            console.log("🎉 FINAL RESULT:", result);
            setPage(0);
        } catch (error) {
            console.error("❌ ERROR:", error);
        }
    };
    return (
        <Box sx={{ background: C.bg, minHeight: "100vh", p: { xs: "16px", sm: "28px 24px" }, maxWidth: 1440, mx: "auto" }}>

            {/* ── HEADER ── */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="28px">
                <Typography sx={{ fontSize: "22px", fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>
                    Invoice <Box component="span" sx={{ color: C.accent }}>Analytics</Box> Dashboard
                </Typography>
                <Box sx={{
                    fontSize: "11px", px: "10px", py: "4px", background: "rgba(79,142,247,0.12)", color: C.accent,
                    borderRadius: "20px", border: "1px solid rgba(79,142,247,0.25)", fontWeight: 500
                }}>
                    Live Data
                </Box>
            </Box>

            {/* ── FILTER BAR ── */}
            <SurfaceCard sx={{ p: "16px 20px", mb: "24px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
                {/* From Period */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Term</Typography>

                    <Employeeautocomplete
                        name="Term"
                        // label={is003Subscription ? "Standard" : "Project"}
                        id="Term"
                        value={termData}
                        onChange={(newValue) => {
                            setTermData(newValue);
                            setFilters(f => ({ ...f, term: newValue?.value || "" }));
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2155","ScreenName":"Terms","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                    />

                </Box>
                {/* Category */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={160}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{is003Subscription ? "Standard/Activities" : "Project"}</Typography>
                    <Employeeautocomplete
                        name="category"
                        // label={is003Subscription ? "Standard" : "Project"}
                        id="category"
                        value={categoryData}
                        onChange={(newValue) => {
                            setCategoryData(newValue);
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2119","ScreenName":"Project","Filter":"parentID=${CompanyID} AND EmployeeID=${EMPID}","Any":""}}`}
                    />

                </Box>
                {/* Staff */}
                <Box display="flex" flexDirection="column" gap="5px" flex={1} minWidth={140}>
                    <Typography sx={{ fontSize: "11px", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Staff</Typography>
                    <Employeeautocomplete
                        name="Employee"
                        // label="Personnel"
                        id="Employee"
                        value={attempData}
                        onChange={(newValue) => {
                            setattempData(newValue);
                            if (newValue)
                                sessionStorage.setItem("attempData", JSON.stringify(newValue));
                            else
                                sessionStorage.removeItem("attempData");
                        }}

                        url={`${listViewurl}?data={"Query":{"AccessID":"2115","ScreenName":"Employee","Filter": "ParentID=${EMPID}","Any":""}}`}

                        fullWidth
                    />

                </Box>
                {/* Search btn */}
                <Button
                    variant="contained"
                    onClick={() => handleApply()}
                    sx={{
                        height: "40px",
                        px: "24px",
                        background: C.accent,
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        textTransform: "none",
                        letterSpacing: "0.02em",
                        "&:hover": { background: C.accent, opacity: 0.9 },
                        whiteSpace: "nowrap",
                    }}
                >
                    Apply
                </Button>
            </SurfaceCard>

            {/* ── METRIC CARDS ── */}
            <Box display="grid" gridTemplateColumns={isTablet ? "1fr" : "repeat(3,1fr)"} gap="14px" mb="24px">
                <MetricCard label="Total Invoiced" value={fmt(summary.total_invoice)} sub={`${filtered.length} student(s)`}
                    color={C.accent} topColor={`linear-gradient(90deg,${C.accent},#7DB4FB)`} />
                <MetricCard label="Total Collected" value={fmt(summary.total_paid)}
                    sub={`${pct(summary.total_paid, summary.total_invoice)}% collection rate`}
                    color={C.green} topColor={`linear-gradient(90deg,${C.green},#6EE7B7)`} />
                <MetricCard label="Total Pending" value={fmt(summary.total_pending)}
                    sub={`${filtered.filter(s => s.status === "Overdue").length} overdue student(s)`}
                    color={C.red} topColor={`linear-gradient(90deg,${C.red},#FCA5A5)`} />
            </Box>

            {/* ── CHARTS ── */}
            <Box display="grid" gridTemplateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="16px" mb="24px">
                <BarChartCard data={barData} />
                <DoughnutCard data={doughnutData} />
            </Box>

            {/* ── TABLE SECTION ── */}
            <Box>
                {/* Controls */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb="14px" flexWrap="wrap" gap="10px">
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", color: C.text }}>Due Students</Typography>
                    <Box display="flex" alignItems="center" gap="10px" flexWrap="wrap">
                        <TextField size="small" placeholder="Search students..."
                            value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ fontSize: 14, color: C.muted }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ ...filterInputSx, width: 200, "& input": { fontSize: "13px" } }}
                        />
                        <Select size="small" value={perPage}
                            onChange={e => { setPerPage(Number(e.target.value)); setPage(0); }}
                            sx={{ ...filterInputSx, minWidth: 110 }}>
                            {[5, 8, 10, 20].map(n => (
                                <MenuItem key={n} value={n} sx={{ fontSize: "13px" }}>{n} / page</MenuItem>
                            ))}
                        </Select>
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
                                            {c.label}<SortIcon col={c.key} />
                                        </TableCell>
                                    ))}
                                    <TableCell sx={thSx}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sorted.slice(page * perPage, (page + 1) * perPage).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} sx={{ textAlign: "center", py: "40px", fontSize: "13px", color: C.muted, border: 0 }}>
                                            No records found
                                        </TableCell>
                                    </TableRow>
                                ) : sorted.slice(page * perPage, (page + 1) * perPage).map(s => {
                                    const isOverdue = s.status === "Overdue";
                                    const pendingPct = pct(s.pending, s.invoice);
                                    return (
                                        <TableRow key={s.student_id} onClick={() => setModal(s)}
                                            sx={{
                                                cursor: "pointer",
                                                background: isOverdue ? "rgba(248,113,113,0.04)" : "transparent",
                                                "&:hover td": { background: isOverdue ? "rgba(248,113,113,0.08)" : C.surface2 },
                                                "&:last-child td": { borderBottom: 0 },
                                            }}>
                                            {/* Student name + avatar */}
                                            <TableCell sx={tdSx}>
                                                <Box display="flex" alignItems="center" gap="8px">
                                                    <Avatar sx={{
                                                        width: 30, height: 30, fontSize: "11px", fontWeight: 700,
                                                        background: s.avatar_color || getAvatarColor(s.student_id)
                                                    }}>
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
                                                    ...(s.category_type === "STANDARD"
                                                        ? { background: "rgba(79,142,247,0.1)", color: C.accent, border: `1px solid rgba(79,142,247,0.2)` }
                                                        : { background: "rgba(167,139,250,0.1)", color: C.purple, border: `1px solid rgba(167,139,250,0.2)` })
                                                }}>
                                                    {s.category_type === "STANDARD" ? "🎒" : "🎯"} {s.category.replace("Standard - ", "").replace("Activity - ", "")}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={tdSx}>{s.staff}</TableCell>
                                            <TableCell sx={{ ...tdSx, fontWeight: 500 }}>{fmt(s.invoice)}</TableCell>
                                            <TableCell sx={{ ...tdSx, color: C.green }}>{fmt(s.paid)}</TableCell>
                                            {/* Pending + bar */}
                                            <TableCell sx={tdSx}>
                                                <Typography sx={{ color: C.red, fontWeight: 600, fontSize: "13px" }}>{fmt(s.pending)}</Typography>
                                                <Box sx={{ width: 70, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden", mt: "4px" }}>
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
                                                <Box component="button" onClick={() => setModal(s)} sx={{
                                                    px: "12px", py: "5px", borderRadius: "8px", border: `1px solid ${C.border2}`,
                                                    background: "transparent", color: C.accent, cursor: "pointer", fontSize: "12px",
                                                    fontFamily: "inherit", fontWeight: 500, transition: "all .15s",
                                                    "&:hover": { background: "rgba(79,142,247,0.1)", borderColor: C.accent },
                                                }}>
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
