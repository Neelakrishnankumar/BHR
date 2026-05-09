/**
 * CRM Party Analytics — React + Material UI + Chart.js
 *
 * HOW TO USE WITH REAL API
 * ─────────────────────────
 * 1. Replace the `import mockData from './mockData.json'` with your API calls.
 * 2. Three API endpoints you'll need:
 *      GET /api/parties                          → returns mockData.parties[]
 *      GET /api/orders?partyId=&from=&to=        → returns orders array
 *      GET /api/payments?partyId=&from=&to=      → returns payments array
 * 3. See the TODO comments throughout for exact swap-in points.
 *
 * DEPENDENCIES (add to package.json)
 * ────────────────────────────────────
 *   @mui/material @mui/icons-material @emotion/react @emotion/styled
 *   chart.js react-chartjs-2
 */

import { useState, useEffect, useMemo, useRef } from "react";
import {
    Box, Typography, TextField, Select, MenuItem, FormControl,
    InputLabel, Button, Chip, Avatar, Card, CardContent,
    Table, TableHead, TableBody, TableRow, TableCell,
    InputAdornment, LinearProgress, Divider, Stack, Paper,
    IconButton, Tooltip, OutlinedInput, alpha, useTheme,
    createTheme, ThemeProvider, CssBaseline,
    CircularProgress
} from "@mui/material";
import {
    Search, ArrowBack, BarChart as BarChartIcon, Add,
    Inventory2Outlined, CreditCardOutlined, HourglassEmptyOutlined,
    TrendingUpOutlined, FilterAlt
} from "@mui/icons-material";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS, ArcElement, Tooltip as ChartTooltip,
    Legend, CategoryScale, LinearScale, BarElement
} from "chart.js";
import { PartyAnalytics, resetPartyAnalyticsdata } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Navigate, useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement);


// ─── DARK THEME ──────────────────────────────────────────────────────────────
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: { default: "#0B0E18", paper: "#131826" },
        primary: { main: "#3D8EF0" },
        success: { main: "#2EC99A" },
        error: { main: "#F06464" },
        warning: { main: "#F5B942" },
    },
    typography: {
        fontFamily: "'DM Sans', sans-serif",
        h5: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
        h6: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
        subtitle1: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    },
    components: {
        MuiCard: { styleOverrides: { root: { backgroundImage: "none", border: "1px solid rgba(255,255,255,0.06)" } } },
        MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
        MuiTableCell: { styleOverrides: { head: { color: "#6B7A99", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", borderColor: "rgba(255,255,255,0.06)" }, body: { borderColor: "rgba(255,255,255,0.06)", fontSize: 13 } } },
        MuiOutlinedInput: { styleOverrides: { root: { "& fieldset": { borderColor: "rgba(255,255,255,0.11)" } } } },
        MuiChip: { styleOverrides: { root: { fontFamily: "'DM Sans', sans-serif" } } },
        MuiButton: { styleOverrides: { root: { textTransform: "none", fontFamily: "'Syne', sans-serif", fontWeight: 700 } } },
    },
});
const mockData = {
    "parties": [
        { "id": "p01", "name": "Arjun Traders", "type": "Customer", "city": "Chennai", "color": "#3D8EF0", "gstin": "33AAACT1234A1Z5", "phone": "9841001122" },
        { "id": "p02", "name": "Sri Venkateswara Co", "type": "Supplier", "city": "Coimbatore", "color": "#2EC99A", "gstin": "33AABCV5678B1Z3", "phone": "9842334455" },
        { "id": "p03", "name": "Meenakshi Wholesale", "type": "Customer", "city": "Madurai", "color": "#F5B942", "gstin": "33AACCM9012C1Z1", "phone": "9843556677" },
        { "id": "p04", "name": "Raja Enterprises", "type": "Supplier", "city": "Salem", "color": "#9B7EF5", "gstin": "33AADCR3456D1Z7", "phone": "9844778899" },
        { "id": "p05", "name": "Kavya Distributors", "type": "Customer", "city": "Trichy", "color": "#22C9C9", "gstin": "33AAECK7890E1Z9", "phone": "9845990011" },
        { "id": "p06", "name": "Murugan Supplies", "type": "Supplier", "city": "Tirunelveli", "color": "#F06464", "gstin": "33AAFCM2345F1Z2", "phone": "9846112233" },
        { "id": "p07", "name": "Pooja Retail Hub", "type": "Customer", "city": "Vellore", "color": "#F07A42", "gstin": "33AAGCP6789G1Z4", "phone": "9847334455" },
        { "id": "p08", "name": "Karthik & Bros", "type": "Supplier", "city": "Erode", "color": "#3D8EF0", "gstin": "33AAHCK0123H1Z6", "phone": "9848556677" }
    ],

    "orders": {
        "p01": [
            { "id": "O-1001", "date": "2026-01-08", "ref": "PO-441", "product": "Steel Pipes 2\" x 20ft", "qty": 50, "unit": "pcs", "rate": 1800, "amount": 90000, "status": "Delivered" },
            { "id": "O-1002", "date": "2026-01-22", "ref": "PO-452", "product": "Galvanized Sheets 4mm", "qty": 30, "unit": "sheets", "rate": 3500, "amount": 105000, "status": "Delivered" },
            { "id": "O-1003", "date": "2026-02-10", "ref": "PO-461", "product": "MS Angle 40x40x5", "qty": 80, "unit": "kg", "rate": 95, "amount": 7600, "status": "Delivered" },
            { "id": "O-1004", "date": "2026-02-28", "ref": "PO-478", "product": "Copper Wire 2.5mm", "qty": 200, "unit": "mtr", "rate": 62, "amount": 12400, "status": "Processing" },
            { "id": "O-1005", "date": "2026-03-14", "ref": "PO-495", "product": "PVC Conduit 25mm", "qty": 500, "unit": "mtr", "rate": 28, "amount": 14000, "status": "Pending" },
            { "id": "O-1006", "date": "2026-04-02", "ref": "PO-511", "product": "Aluminum Extrusion", "qty": 40, "unit": "kg", "rate": 410, "amount": 16400, "status": "Pending" }
        ],
        "p02": [
            { "id": "O-2001", "date": "2026-01-12", "ref": "SO-201", "product": "Industrial Bolts M12", "qty": 2000, "unit": "pcs", "rate": 4.5, "amount": 9000, "status": "Delivered" },
            { "id": "O-2002", "date": "2026-02-05", "ref": "SO-218", "product": "Heavy Duty Bearings", "qty": 100, "unit": "pcs", "rate": 380, "amount": 38000, "status": "Delivered" },
            { "id": "O-2003", "date": "2026-03-01", "ref": "SO-234", "product": "Precision Gears Set", "qty": 25, "unit": "sets", "rate": 2800, "amount": 70000, "status": "Delivered" },
            { "id": "O-2004", "date": "2026-03-20", "ref": "SO-249", "product": "Hydraulic Seals Kit", "qty": 50, "unit": "kits", "rate": 650, "amount": 32500, "status": "Processing" },
            { "id": "O-2005", "date": "2026-04-10", "ref": "SO-261", "product": "SS Fasteners Box", "qty": 30, "unit": "boxes", "rate": 1200, "amount": 36000, "status": "Pending" }
        ],
        "p03": [
            { "id": "O-3001", "date": "2026-01-05", "ref": "PO-321", "product": "Basmati Rice 25kg", "qty": 200, "unit": "bags", "rate": 1400, "amount": 280000, "status": "Delivered" },
            { "id": "O-3002", "date": "2026-02-01", "ref": "PO-338", "product": "Refined Oil 15L", "qty": 150, "unit": "tins", "rate": 2100, "amount": 315000, "status": "Delivered" },
            { "id": "O-3003", "date": "2026-03-08", "ref": "PO-354", "product": "Sugar 50kg Sacks", "qty": 80, "unit": "sacks", "rate": 1950, "amount": 156000, "status": "Delivered" },
            { "id": "O-3004", "date": "2026-04-01", "ref": "PO-371", "product": "Wheat Flour 30kg", "qty": 120, "unit": "bags", "rate": 900, "amount": 108000, "status": "Pending" }
        ],
        "p04": [
            { "id": "O-4001", "date": "2026-01-18", "ref": "SO-401", "product": "Lathe Machine Parts", "qty": 10, "unit": "sets", "rate": 12000, "amount": 120000, "status": "Delivered" },
            { "id": "O-4002", "date": "2026-02-14", "ref": "SO-417", "product": "CNC Tooling Kit", "qty": 5, "unit": "kits", "rate": 28000, "amount": 140000, "status": "Delivered" },
            { "id": "O-4003", "date": "2026-03-25", "ref": "SO-432", "product": "Drill Bits HSS Set", "qty": 20, "unit": "sets", "rate": 3400, "amount": 68000, "status": "Processing" },
            { "id": "O-4004", "date": "2026-04-12", "ref": "SO-448", "product": "Milling Cutters", "qty": 15, "unit": "pcs", "rate": 4800, "amount": 72000, "status": "Pending" }
        ],
        "p05": [
            { "id": "O-5001", "date": "2026-01-09", "ref": "PO-551", "product": "Paracetamol 500mg", "qty": 10000, "unit": "strips", "rate": 12, "amount": 120000, "status": "Delivered" },
            { "id": "O-5002", "date": "2026-02-20", "ref": "PO-567", "product": "Vitamin C Tablets", "qty": 5000, "unit": "strips", "rate": 18, "amount": 90000, "status": "Delivered" },
            { "id": "O-5003", "date": "2026-03-15", "ref": "PO-582", "product": "Antiseptic Cream 50g", "qty": 2000, "unit": "tubes", "rate": 45, "amount": 90000, "status": "Pending" },
            { "id": "O-5004", "date": "2026-04-05", "ref": "PO-597", "product": "Bandage Rolls 5cm", "qty": 3000, "unit": "rolls", "rate": 22, "amount": 66000, "status": "Pending" }
        ],
        "p06": [
            { "id": "O-6001", "date": "2026-01-14", "ref": "SO-601", "product": "Teak Wood Planks", "qty": 500, "unit": "sqft", "rate": 180, "amount": 90000, "status": "Delivered" },
            { "id": "O-6002", "date": "2026-02-08", "ref": "SO-618", "product": "Plywood 18mm BWR", "qty": 200, "unit": "sheets", "rate": 1850, "amount": 370000, "status": "Delivered" },
            { "id": "O-6003", "date": "2026-03-12", "ref": "SO-633", "product": "Laminate Sheets 1mm", "qty": 300, "unit": "sheets", "rate": 420, "amount": 126000, "status": "Delivered" },
            { "id": "O-6004", "date": "2026-04-08", "ref": "SO-648", "product": "MDF Board 12mm", "qty": 150, "unit": "sheets", "rate": 680, "amount": 102000, "status": "Processing" },
            { "id": "O-6005", "date": "2026-04-18", "ref": "SO-662", "product": "Veneer Sheets 0.5mm", "qty": 100, "unit": "sheets", "rate": 340, "amount": 34000, "status": "Pending" }
        ],
        "p07": [
            { "id": "O-7001", "date": "2026-01-20", "ref": "PO-701", "product": "Men Casual Shirts", "qty": 500, "unit": "pcs", "rate": 480, "amount": 240000, "status": "Delivered" },
            { "id": "O-7002", "date": "2026-02-15", "ref": "PO-718", "product": "Ladies Kurtis", "qty": 400, "unit": "pcs", "rate": 650, "amount": 260000, "status": "Delivered" },
            { "id": "O-7003", "date": "2026-03-10", "ref": "PO-733", "product": "Kids Jeans Set", "qty": 300, "unit": "pcs", "rate": 380, "amount": 114000, "status": "Pending" },
            { "id": "O-7004", "date": "2026-04-05", "ref": "PO-749", "product": "School Uniforms", "qty": 600, "unit": "sets", "rate": 520, "amount": 312000, "status": "Pending" }
        ],
        "p08": [
            { "id": "O-8001", "date": "2026-01-25", "ref": "SO-801", "product": "Raw Cotton 100kg", "qty": 50, "unit": "bales", "rate": 5500, "amount": 275000, "status": "Delivered" },
            { "id": "O-8002", "date": "2026-02-22", "ref": "SO-818", "product": "Polyester Yarn", "qty": 1000, "unit": "kg", "rate": 155, "amount": 155000, "status": "Delivered" },
            { "id": "O-8003", "date": "2026-03-28", "ref": "SO-833", "product": "Dye Chemicals Set", "qty": 200, "unit": "kg", "rate": 320, "amount": 64000, "status": "Processing" },
            { "id": "O-8004", "date": "2026-04-15", "ref": "SO-849", "product": "Fabric Softener 20L", "qty": 100, "unit": "drums", "rate": 1800, "amount": 180000, "status": "Pending" }
        ]
    },

    "payments": {
        "p01": [
            { "id": "RCP-1001", "date": "2026-01-20", "mode": "NEFT", "ref": "TXN00441", "amount": 90000, "order_ref": "O-1001", "status": "Cleared" },
            { "id": "RCP-1002", "date": "2026-02-05", "mode": "Cheque", "ref": "CHQ00112", "amount": 80000, "order_ref": "O-1002", "status": "Cleared" },
            { "id": "RCP-1003", "date": "2026-02-28", "mode": "NEFT", "ref": "TXN00891", "amount": 25000, "order_ref": "O-1002", "status": "Cleared" },
            { "id": "RCP-1004", "date": "2026-03-18", "mode": "UPI", "ref": "UPI441221", "amount": 7600, "order_ref": "O-1003", "status": "Cleared" },
            { "id": "RCP-1005", "date": "2026-04-08", "mode": "NEFT", "ref": "TXN01204", "amount": 10000, "order_ref": "O-1004", "status": "Pending" }
        ],
        "p02": [
            { "id": "RCP-2001", "date": "2026-01-28", "mode": "RTGS", "ref": "RTGS00201", "amount": 9000, "order_ref": "O-2001", "status": "Cleared" },
            { "id": "RCP-2002", "date": "2026-02-20", "mode": "NEFT", "ref": "TXN00552", "amount": 38000, "order_ref": "O-2002", "status": "Cleared" },
            { "id": "RCP-2003", "date": "2026-03-15", "mode": "Cheque", "ref": "CHQ00198", "amount": 70000, "order_ref": "O-2003", "status": "Cleared" },
            { "id": "RCP-2004", "date": "2026-04-05", "mode": "NEFT", "ref": "TXN01100", "amount": 20000, "order_ref": "O-2004", "status": "Pending" }
        ],
        "p03": [
            { "id": "RCP-3001", "date": "2026-01-18", "mode": "RTGS", "ref": "RTGS00321", "amount": 280000, "order_ref": "O-3001", "status": "Cleared" },
            { "id": "RCP-3002", "date": "2026-02-15", "mode": "RTGS", "ref": "RTGS00338", "amount": 315000, "order_ref": "O-3002", "status": "Cleared" },
            { "id": "RCP-3003", "date": "2026-03-22", "mode": "NEFT", "ref": "TXN00874", "amount": 100000, "order_ref": "O-3003", "status": "Cleared" },
            { "id": "RCP-3004", "date": "2026-04-10", "mode": "Cheque", "ref": "CHQ00244", "amount": 50000, "order_ref": "O-3003", "status": "Pending" }
        ],
        "p04": [
            { "id": "RCP-4001", "date": "2026-02-01", "mode": "RTGS", "ref": "RTGS00401", "amount": 120000, "order_ref": "O-4001", "status": "Cleared" },
            { "id": "RCP-4002", "date": "2026-02-28", "mode": "NEFT", "ref": "TXN00788", "amount": 140000, "order_ref": "O-4002", "status": "Cleared" },
            { "id": "RCP-4003", "date": "2026-04-10", "mode": "Cheque", "ref": "CHQ00289", "amount": 40000, "order_ref": "O-4003", "status": "Pending" }
        ],
        "p05": [
            { "id": "RCP-5001", "date": "2026-01-25", "mode": "NEFT", "ref": "TXN00551", "amount": 120000, "order_ref": "O-5001", "status": "Cleared" },
            { "id": "RCP-5002", "date": "2026-03-08", "mode": "UPI", "ref": "UPI567881", "amount": 90000, "order_ref": "O-5002", "status": "Cleared" },
            { "id": "RCP-5003", "date": "2026-04-01", "mode": "Cheque", "ref": "CHQ00312", "amount": 40000, "order_ref": "O-5003", "status": "Pending" }
        ],
        "p06": [
            { "id": "RCP-6001", "date": "2026-01-30", "mode": "RTGS", "ref": "RTGS00601", "amount": 90000, "order_ref": "O-6001", "status": "Cleared" },
            { "id": "RCP-6002", "date": "2026-02-22", "mode": "RTGS", "ref": "RTGS00618", "amount": 370000, "order_ref": "O-6002", "status": "Cleared" },
            { "id": "RCP-6003", "date": "2026-03-28", "mode": "NEFT", "ref": "TXN00991", "amount": 126000, "order_ref": "O-6003", "status": "Cleared" },
            { "id": "RCP-6004", "date": "2026-04-18", "mode": "Cheque", "ref": "CHQ00341", "amount": 60000, "order_ref": "O-6004", "status": "Pending" }
        ],
        "p07": [
            { "id": "RCP-7001", "date": "2026-02-05", "mode": "RTGS", "ref": "RTGS00701", "amount": 240000, "order_ref": "O-7001", "status": "Cleared" },
            { "id": "RCP-7002", "date": "2026-03-02", "mode": "NEFT", "ref": "TXN00821", "amount": 200000, "order_ref": "O-7002", "status": "Cleared" },
            { "id": "RCP-7003", "date": "2026-04-12", "mode": "Cheque", "ref": "CHQ00378", "amount": 80000, "order_ref": "O-7003", "status": "Pending" }
        ],
        "p08": [
            { "id": "RCP-8001", "date": "2026-02-10", "mode": "RTGS", "ref": "RTGS00801", "amount": 275000, "order_ref": "O-8001", "status": "Cleared" },
            { "id": "RCP-8002", "date": "2026-03-10", "mode": "NEFT", "ref": "TXN00912", "amount": 155000, "order_ref": "O-8002", "status": "Cleared" },
            { "id": "RCP-8003", "date": "2026-04-20", "mode": "Cheque", "ref": "CHQ00399", "amount": 30000, "order_ref": "O-8003", "status": "Pending" }
        ]
    }
}


// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
const fmtShort = n => n >= 100000 ? "₹" + (n / 100000).toFixed(1) + "L" : n >= 1000 ? "₹" + (n / 1000).toFixed(0) + "K" : "₹" + n;
const pct = (a, b) => b ? Math.round((a / b) * 100) : 0;
const initials = s => s.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
// const inRange = (d, from, to) => !from || !to ? true : d >= from && d <= to;
const inRange = (d, from, to) => {
    if (!from || !to) return true;
    return new Date(d) >= new Date(from) && new Date(d) <= new Date(to);
};
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ─── STATUS CHIP ─────────────────────────────────────────────────────────────
// const STATUS_COLORS = {
//     Delivered: { bg: "rgba(46,201,154,0.12)", color: "#2EC99A", border: "rgba(46,201,154,0.22)" },
//     Cleared: { bg: "rgba(46,201,154,0.12)", color: "#2EC99A", border: "rgba(46,201,154,0.22)" },
//     Processing: { bg: "rgba(61,142,240,0.12)", color: "#3D8EF0", border: "rgba(61,142,240,0.22)" },
//     Pending: { bg: "rgba(240,100,100,0.12)", color: "#F06464", border: "rgba(240,100,100,0.22)" },
//     Cancelled: { bg: "rgba(107,122,153,0.12)", "color": "#6B7A99", border: "rgba(107,122,153,0.22)" },
//     Overdue: { bg: "rgba(240,100,100,0.2)", color: "#FF8080", border: "rgba(240,100,100,0.35)" },
//     Partial: { bg: "rgba(245,185,66,0.12)", color: "#F5B942", border: "rgba(245,185,66,0.22)" },
// };
const STATUS_ICONS = { Delivered: "✓", Pending: "◷", Processing: "↻", Cancelled: "✕", Cleared: "✓", Overdue: "!", Partial: "◑" };

function StatusChip({ status, statusColors }) {
    const s = statusColors[status] || {};
    return (
        <Box component="span" sx={{
            display: "inline-flex", alignItems: "center", gap: 0.5,
            px: 1.25, py: 0.25, borderRadius: "20px", fontSize: 11, fontWeight: 500,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap"
        }}>
            {STATUS_ICONS[status]} {status || "N/A"}
        </Box>
    );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, sub, topColor }) {
    return (
        <Card sx={{
            position: "relative", overflow: "hidden",
            // bgcolor: "#131826" 
        }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: topColor }} />
            <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{
                    width: 32, height: 32, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
                    background: alpha(topColor.includes("F0") ? "#3D8EF0" : topColor.includes("C9") ? "#2EC99A" : topColor.includes("F0646") ? "#F06464" : "#F5B942", 0.12),
                    mb: 1.5, fontSize: 14
                }}>{icon}</Box>
                <Typography variant="caption" sx={{
                    color: "#6B7A99",
                    // textTransform: "uppercase", 
                    letterSpacing: "0.05em", fontWeight: 500
                }}>{label}</Typography>
                <Typography variant="h5" sx={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", mt: 0.5 }}>{value}</Typography>
                <Typography variant="caption" sx={{ color: "#6B7A99" }}>{sub}</Typography>
            </CardContent>
        </Card>
    );
}

// ─── PIE CHART ────────────────────────────────────────────────────────────────
function FinancialPieChart({ totalOrders, totalPayments, totalDue }) {
    const data = {
        labels: ["Total Orders", "Payments Received", "Outstanding Due"],
        datasets: [{
            data: [totalOrders, totalPayments, Math.max(0, totalDue)],
            backgroundColor: ["rgba(61,142,240,0.82)", "rgba(46,201,154,0.82)", "rgba(240,100,100,0.82)"],
            borderColor: ["#3D8EF0", "#2EC99A", "#F06464"],
            borderWidth: 2,
            hoverOffset: 8,
        }],
    };
    const opts = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${fmt(ctx.parsed)}` } },
        },
    };
    return <Pie data={data} options={opts} />;
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function MonthlyBarChart({ orders }) {
    const monthMap = {};
    orders.forEach(o => {
        const m = o.date.slice(0, 7);
        if (!monthMap[m]) monthMap[m] = { ordered: 0, delivered: 0 };
        monthMap[m].ordered += o.amount;
        if (o.status === "Delivered") monthMap[m].delivered += o.amount;
    });
    const sortedKeys = Object.keys(monthMap).sort();
    const labels = sortedKeys.map(m => { const [, mo] = m.split("-"); return MONTH_NAMES[parseInt(mo) - 1]; });
    const ordered = sortedKeys.map(m => monthMap[m].ordered);
    const delivered = sortedKeys.map(m => monthMap[m].delivered);

    const data = {
        labels,
        datasets: [
            { label: "Order Value", data: ordered, backgroundColor: "rgba(61,142,240,0.7)", borderRadius: 5 },
            { label: "Delivered", data: delivered, backgroundColor: "rgba(46,201,154,0.7)", borderRadius: 5 },
        ],
    };
    const opts = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` } },
        },
        scales: {
            x: { ticks: { color: "#6B7A99", font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { color: "rgba(255,255,255,0.07)" } },
            // y: { ticks: { color: "#6B7A99", callback: v => fmtShort(v), font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { color: "rgba(255,255,255,0.07)" } },
            y: { ticks: { color: "#6B7A99", callback: v => v, font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { color: "rgba(255,255,255,0.07)" } },
        },
    };
    return <Bar data={data} options={opts} />;
}

// ─── PARTY LIST PAGE ──────────────────────────────────────────────────────────
function PartyListPage({ parties, orders: allOrders, payments: allPayments, onOpenAnalytics, onApply, loading, filters, setFilters }) {
    // const [search, setSearch] = useState("");
    // const [typeFilter, setTypeFilter] = useState("all");
    // const [paymentStatus, setPaymentStatus] = useState("all");
    // const [from, setFrom] = useState("");
    // const [to, setTo] = useState("");
    const { search, typeFilter, paymentStatus, from, to } = filters;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // TODO: Replace with: const { data: parties } = useSWR('/api/parties', fetcher);
    // const filtered = parties.filter(p => {
    //     const q = search.toLowerCase();
    //     return ((p.name || "").toLowerCase().includes(q) ||
    //         (p.city || "").toLowerCase().includes(q))
    //         && (typeFilter === "all" || p.type.toLowerCase() === typeFilter);
    // });


    const ALLOWED_STATUSES = [
        "created",
        "processing",
        "picked",
        "ready to deliver",
        "pending",
        "paid"
    ];

    const normalizeStatus = (s) =>
        (s || "").trim().toLowerCase();

    const getLatestStatus = (partyOrders) => {
        if (!partyOrders || partyOrders.length === 0) {
            return "created";
        }

        const latestOrder = partyOrders.reduce((latest, curr) => {
            const d1 = new Date(latest.date.split("-").reverse().join("-"));
            const d2 = new Date(curr.date.split("-").reverse().join("-"));
            return d2 > d1 ? curr : latest;
        });

        const status = normalizeStatus(latestOrder.status);

        return ALLOWED_STATUSES.includes(status)
            ? status
            : "created";
    };
    const statusList = ALLOWED_STATUSES;

    const statusCounts = useMemo(() => {
        const counts = {};

        parties.forEach(p => {
            const q = search.toLowerCase();

            const matchesSearch =
                (p.name || "").toLowerCase().includes(q) ||
                (p.city || "").toLowerCase().includes(q);

            const matchesType =
                typeFilter === "all" || p.type.toLowerCase() === typeFilter;

            if (!(matchesSearch && matchesType)) return;

            const partyOrders = allOrders[p.id] || [];

            const finalStatus = getLatestStatus(partyOrders);

            counts[finalStatus] = (counts[finalStatus] || 0) + 1;
        });

        return counts;
    }, [parties, allOrders, search, typeFilter]);


    // const filtered = parties.filter(p => {
    //     const q = search.toLowerCase();

    //     const matchesSearch =
    //         (p.name || "").toLowerCase().includes(q) ||
    //         (p.city || "").toLowerCase().includes(q);

    //     const matchesType =
    //         typeFilter === "all" || p.type.toLowerCase() === typeFilter;

    //     // 👉 Compute totals
    //     const partyOrders = allOrders[p.id] || [];
    //     const partyPayments = allPayments[p.id] || [];


    //     const ordersTotal = partyOrders.reduce((s, o) => s + o.amount, 0);
    //     const paidTotal = partyPayments
    //         .filter(r => r.status === "Cleared")
    //         .reduce((s, r) => s + r.amount, 0);

    //     const due = partyOrders.reduce((sum, o) => sum + (o.due || 0), 0);
    //     // const due = Math.max(0, ordersTotal - paidTotal);

    //     // 👉 Payment status logic
    //     // let matchesPayment = true;

    //     // if (paymentStatus === "paid") {
    //     //     matchesPayment = ordersTotal > 0 && due === 0;
    //     // } else if (paymentStatus === "due") {
    //     //     matchesPayment = due > 0;
    //     // } else if (paymentStatus === "created") {
    //     //     matchesPayment = ordersTotal === 0;
    //     // }
    //     let matchesPayment = true;

    //     if (paymentStatus === "paid") {
    //         matchesPayment = ordersTotal > 0 && due === 0;
    //     }
    //     else if (paymentStatus === "due") {
    //         matchesPayment = due > 0;
    //     }
    //     else if (paymentStatus !== "all") {
    //         matchesPayment = partyOrders.some(
    //             o => normalizeStatus(o.status) === paymentStatus
    //         );
    //     }

    //     return matchesSearch && matchesType && matchesPayment;
    // });

    const filtered = parties.filter(p => {
        const q = search.toLowerCase();

        const matchesSearch =
            (p.name || "").toLowerCase().includes(q) ||
            (p.city || "").toLowerCase().includes(q);

        const matchesType =
            typeFilter === "all" || p.type.toLowerCase() === typeFilter;

        const partyOrders = allOrders[p.id] || [];

        const finalStatus = getLatestStatus(partyOrders);

        let matchesPayment = true;

        if (paymentStatus !== "all") {
            matchesPayment = finalStatus === paymentStatus;
        }

        return matchesSearch && matchesType && matchesPayment;
    });
    const customerCount = parties.filter(p => p.type === "Customer").length;
    const supplierCount = parties.filter(p => p.type === "Supplier").length;

    const baseCounts = useMemo(() => {
        let all = 0;

        parties.forEach(p => {
            const q = search.toLowerCase();

            const matchesSearch =
                (p.name || "").toLowerCase().includes(q) ||
                (p.city || "").toLowerCase().includes(q);

            const matchesType =
                typeFilter === "all" || p.type.toLowerCase() === typeFilter;

            if (!(matchesSearch && matchesType)) return;

            all++;
        });

        return { all };
    }, [parties, search, typeFilter]);
    const allCounts = {
        all: baseCounts.all,
        ...statusCounts
    };
    const allFilters = [
        "all",
        ...ALLOWED_STATUSES
    ];
    // const allFilters = ALLOWED_STATUSES;
    const paymentCounts = useMemo(() => {
        let all = 0;
        let paid = 0;
        let dueCount = 0;
        let created = 0;
        let processing = 0;
        let picked = 0;

        parties.forEach(p => {
            const partyOrders = allOrders[p.id] || [];
            const partyPayments = allPayments[p.id] || [];

            const ordersTotal = partyOrders.reduce((s, o) => s + o.amount, 0);
            const paidTotal = partyPayments
                .filter(r => r.status === "Cleared")
                .reduce((s, r) => s + r.amount, 0);

            const due = partyOrders.reduce((sum, o) => sum + (o.due || 0), 0);
            // const due = Math.max(0, ordersTotal - paidTotal);

            // Apply SAME filters (search + type)
            const q = search.toLowerCase();
            const matchesSearch =
                (p.name || "").toLowerCase().includes(q) ||
                (p.city || "").toLowerCase().includes(q);

            const matchesType =
                typeFilter === "all" || p.type.toLowerCase() === typeFilter;

            if (!(matchesSearch && matchesType)) return;

            all++;

            if (ordersTotal === 0) {
                created++;
            } else
                if (due === 0) {
                    paid++;
                } else {
                    dueCount++;
                }
        });

        return {
            all,
            paid,
            due: dueCount,
            created
        };
    }, [parties, allOrders, allPayments, search, typeFilter]);

    const formatLabel = (s) =>
        s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    return (
        <Box>
            {/* App Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {/* <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #3D8EF0, #6BAFFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</Box> */}
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: 20, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                            {/* <Box component="span" sx={{ color: "primary.main" }}>Party</Box> Analytics */}
                            Party Analytics<Box component="span" sx={{ color: "#6B7A99", fontSize: 13, fontWeight: 400, ml: 1 }}>({parties.length}) parties</Box>
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6B7A99" }}>Order · Payment · Outstanding Due</Typography>
                    </Box>
                </Box>
                <Chip
                    label={`${customerCount} Customers · ${supplierCount} Suppliers`}
                    size="small"
                    sx={{ background: "rgba(61,142,240,0.1)", color: "primary.main", border: "1px solid rgba(61,142,240,0.22)", fontWeight: 600, fontSize: 11 }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/Apps/TR321/Party")}
                    sx={{
                        mb: 2.5,
                        color: "#6B7A99",
                        borderColor: "rgba(255,255,255,0.11)",
                        display: "flex",
                        justifyContent: "flex-end",
                        "&:hover":
                        {
                            borderColor: "primary.main",
                            color: "text.primary"
                        }
                    }}
                >Back to Party List</Button>
            </Box>
            {/* Topbar */}
            {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontSize: 17 }}>
                    Party List <Box component="span" sx={{ color: "#6B7A99", fontSize: 13, fontWeight: 400, ml: 1 }}>{parties.length} parties</Box>
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<BarChartIcon />}
                        onClick={() => onOpenAnalytics(null)}
                        sx={{ borderColor: "rgba(155,126,245,0.28)", color: "#9B7EF5", "&:hover": { background: "rgba(155,126,245,0.1)", borderColor: "rgba(155,126,245,0.4)" } }}
                    >Order Analytics</Button>
                    <Button variant="contained" startIcon={<Add />}>Add Party</Button>
                </Stack>
            </Box> */}

            {/* Search & Filter */}
            <Stack
                direction={{ xs: "column", sm: "row" }}   // 👈 key
                spacing={1.5}
                sx={{ mb: 2.5 }}
                flexWrap="wrap"
                alignItems={{ xs: "stretch", sm: "center" }}
            >

                {/* Search */}
                <TextField
                    size="small"
                    placeholder="Search party.."
                    value={search}
                    // onChange={e => setSearch(e.target.value)}
                    onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    sx={{
                        flex: 1,
                        minWidth: { xs: "100%", sm: 200 }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ fontSize: 16, color: "#6B7A99" }} />
                            </InputAdornment>
                        )
                    }}
                />

                {/* Type */}
                <FormControl
                    size="small"
                    sx={{
                        minWidth: { xs: "100%", sm: 140 }
                    }}
                >
                    <Select value={typeFilter}
                        // onChange={e => setTypeFilter(e.target.value)}
                        onChange={e => setFilters(prev => ({ ...prev, typeFilter: e.target.value }))
                        }
                    >
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="supplier">Supplier</MenuItem>
                    </Select>
                </FormControl>

                {/* From */}
                <TextField
                    size="small"
                    type="date"
                    label="From"
                    value={from}
                    // onChange={(e) => setFrom(e.target.value)}
                    onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        minWidth: { xs: "100%", sm: 160 }
                    }}
                />

                {/* To */}
                <TextField
                    size="small"
                    type="date"
                    label="To"
                    value={to}
                    // onChange={(e) => setTo(e.target.value)}
                    onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
                    inputProps={{ min: from || undefined }}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        minWidth: { xs: "100%", sm: 160 }
                    }}
                />

                {/* Buttons container */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: { xs: "space-between", sm: "flex-start" }
                    }}
                >
                    <Button
                        variant="contained"
                        fullWidth={false}
                        // onClick={() => onApply({ search, typeFilter, from, to })}
                        onClick={() => onApply(filters)}
                        sx={{
                            flex: { xs: 1, sm: "unset" }
                        }}
                    >
                        Apply
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => 
                            dispatch(resetPartyAnalyticsdata())}
                        sx={{
                            flex: { xs: 1, sm: "unset" },
                            background: "linear-gradient(135deg, #ef3f1c, #ed664b)"
                        }}
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>


            <Box sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">

                    {/* Label */}
                    <Typography sx={{ fontSize: 12, color: "#6B7A99", fontWeight: 600 }}>
                        {/* Payment Status: */}
                        Order Status:
                    </Typography>

                    {/* Chips */}
                    {/* {
                        [
                            { label: "All", value: "all", count: paymentCounts.all },
                            { label: "Paid", value: "paid", count: paymentCounts.paid },
                            { label: "Due", value: "due", count: paymentCounts.due },
                            { label: "Created", value: "created", count: paymentCounts.created },
                            { label: "Picked", value: "picked", count: paymentCounts.picked },
                            { label: "Processing", value: "processing", count: paymentCounts.processing }
                        ].map(opt => (
                            <Chip
                                key={opt.value}
                                label={`${opt.label} (${opt.count ?? 0})`}
                                size="small"
                                onClick={() => setPaymentStatus(opt.value)}
                                sx={{
                                    fontSize: 11,
                                    height: 24,
                                    cursor: "pointer",
                                    px: 1,

                                    background:
                                        paymentStatus === opt.value
                                            ? "rgba(61,142,240,0.15)"
                                            : "rgba(255,255,255,0.05)",

                                    color:
                                        paymentStatus === opt.value
                                            ? "#3D8EF0"
                                            : "#6B7A99",

                                    border:
                                        paymentStatus === opt.value
                                            ? "1px solid rgba(61,142,240,0.4)"
                                            : "1px solid rgba(255,255,255,0.08)",

                                    "&:hover": {
                                        background: "rgba(61,142,240,0.12)"
                                    }
                                }}
                            />
                        ))} */}
                    {allFilters.map(status => (
                        <Chip
                            key={status}
                            // label={`${status.toUpperCase()} (${allCounts[status] ?? 0})`}
                            label={`${formatLabel(status)} (${allCounts[status] ?? 0})`}
                            // onClick={() => setPaymentStatus(status)}
                            onClick={() =>
                                setFilters(prev => ({
                                    ...prev,
                                    paymentStatus: status
                                }))
                            }
                            sx={{
                                fontSize: 11,
                                height: 24,
                                cursor: "pointer",
                                px: 0.5,

                                background:
                                    paymentStatus === status
                                        ? "rgba(61,142,240,0.15)"
                                        : "rgba(255,255,255,0.05)",

                                color:
                                    paymentStatus === status
                                        ? "#3D8EF0"
                                        : "#6B7A99",

                                border:
                                    paymentStatus === status
                                        ? "1px solid rgba(61,142,240,0.4)"
                                        : "1px solid rgba(255,255,255,0.08)"
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Party Cards Grid */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: "20px 0 0 20px" }}>
                {loading ? <CircularProgress /> : false}</Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 1.75 }}>
                {filtered.map(p => {
                    // TODO: Replace with API computed summary per party
                    const ordersTotal = (allOrders[p.id] || []).reduce((s, o) => s + o.amount, 0);
                    const paidTotal = (allPayments[p.id] || []).filter(r => r.status === "Cleared").reduce((s, r) => s + r.amount, 0);
                    const due = allOrders[p.id].reduce((sum, o) => sum + (o.due || 0), 0);
                    // const due = Math.max(0, ordersTotal - paidTotal);
                    const collPct = pct(paidTotal, ordersTotal);
                    const orderCount = (allOrders[p.id] || []).length;
                    const barColor = collPct >= 80 ? "#2EC99A" : collPct >= 50 ? "#F5B942" : "#F06464";

                    return (
                        <Card key={p.id} onClick={() => onOpenAnalytics(p)} sx={{
                            cursor: "pointer", position: "relative",
                            overflow: "hidden",
                            //   bgcolor: "#131826",
                            transition: "all 0.2s", "&:hover": {
                                transform: "translateY(-2px)", boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                                // borderColor: "rgba(255,255,255,0.11)"
                            },
                            "&::after": { content: '""', position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }
                        }}>
                            <CardContent sx={{ pb: "16px !important" }}>
                                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                                    <Avatar sx={{ width: 42, height: 42, borderRadius: "11px", bgcolor: p.color, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, mr: 1.5 }}>
                                        {initials(p.name)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontSize: 14, lineHeight: 1.3 }}>{p.name}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.4 }}>
                                            <Chip label={p.type} size="small" sx={{
                                                height: 18, fontSize: 10, fontWeight: 600,
                                                background: p.type === "Customer" ? "rgba(61,142,240,0.12)" : "rgba(46,201,154,0.12)",
                                                color: p.type === "Customer" ? "#3D8EF0" : "#2EC99A",
                                                border: `1px solid ${p.type === "Customer" ? "rgba(61,142,240,0.2)" : "rgba(46,201,154,0.2)"}`,
                                            }} />
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                                                <LocationOnOutlinedIcon sx={{ width: 14, height: 14, mr: 0.5, color: "#da1111" }} />
                                                <Typography variant="caption" sx={{ color: "#6B7A99", fontSize: 11 }}> {p.city}</Typography>

                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.25, pt: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                    {/* {[["Orders", fmtShort(ordersTotal), "#3D8EF0"], ["Paid", fmtShort(paidTotal), "#2EC99A"], ["Due", fmtShort(due), due > 0 ? "#F06464" : "#6B7A99"]].map(([lbl, val, clr]) => ( */}
                                    {[["Orders", fmt(ordersTotal), "#3D8EF0"], ["Paid", fmt(paidTotal), "#2EC99A"], ["Pending", fmt(due), due > 0 ? "#F06464" : "#6B7A99"]].map(([lbl, val, clr]) => (
                                        <Box key={lbl}>
                                            <Typography sx={{
                                                fontSize: 10, color: "#6B7A99",
                                                // textTransform: "uppercase", 
                                                letterSpacing: "0.05em", mb: 0.5
                                            }}>{lbl}</Typography>
                                            {/* <Typography variant="subtitle1" sx={{ fontSize: 15, color: clr }}>₹{val ? val.toFixed(2) : "0.00"}</Typography> */}
                                            <Typography variant="subtitle1" sx={{ fontSize: 15, color: clr }}>{val}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Box sx={{ mt: 1.5 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                                        <Typography variant="caption" sx={{ color: "#6B7A99", fontSize: 11 }}>Collection {collPct}%</Typography>
                                        <Typography variant="caption" sx={{ color: "#6B7A99", fontSize: 11 }}>{orderCount} orders</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={collPct}
                                        sx={{
                                            height: 4, borderRadius: 2, bgcolor: "rgba(255,255,255,0.07)",
                                            "& .MuiLinearProgress-bar": { borderRadius: 2, bgcolor: barColor }
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
                {filtered.length === 0 && (
                    <Box sx={{ gridColumn: "1/-1", textAlign: "center", py: 6, color: "#6B7A99" }}>No parties found</Box>
                )}
            </Box>
        </Box>
    );
}

// ─── PARTY ANALYTICS PAGE ────────────────────────────────────────────────────
function PartyAnalyticsPage({ parties, allOrders, allPayments, preselected, onBack, statusColors }) {
    const [selPartyId, setSelPartyId] = useState(preselected?.id || "");
    // const [from, setFrom] = useState("2026-01-01");
    // const [to, setTo] = useState("2026-04-30");
    const getToday = () => new Date().toISOString().split("T")[0];
    const today = getToday();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [result, setResult] = useState(preselected ? { partyId: preselected.id, from: from, to: to } : null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    // TODO: Replace ORDERS[result.partyId] with an API call:
    //   const { data: orders } = useSWR(result ? `/api/orders?partyId=${result.partyId}&from=${result.from}&to=${result.to}` : null, fetcher);
    const party = parties.find(p => p.id === result?.partyId);
    const orders = useMemo(() => result ? (allOrders[result.partyId] || []).filter(o => inRange(o.date, result.from, result.to)) : [], [result, allOrders]);
    const payments = useMemo(() => result ? (allPayments[result.partyId] || []).filter(r => inRange(r.date, result.from, result.to)) : [], [result, allPayments]);

    const cellBorder = {
        border: "1px solid rgba(255,255,255,0.12) !important"
    };
    const totalOrders = orders.reduce((s, o) => s + o.amount, 0);
    const totalPayments = payments.filter(r => r.status === "Cleared").reduce((s, r) => s + r.amount, 0);
    const totalDue = orders.reduce((sum, o) => sum + (o.due || 0), 0);
    // const totalDue = Math.max(0, totalOrders - totalPayments);
    const pendingOrders = orders.filter(o => o.status !== "Delivered");
    const overdueOrders = orders.filter(o => o.status === "Pending");

    const handleApply = () => { if (selPartyId) setResult({ partyId: selPartyId, from, to }); };

    const customers = parties.filter(p => p.type === "Customer");
    const suppliers = parties.filter(p => p.type === "Supplier");
    const handleRowClick = (orderId) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };
    return (
        <Box>
            {/* App Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, pb: 1, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {/* <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #3D8EF0, #6BAFFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏢</Box> */}
                    <Box>
                        {/* <Typography variant="h6" sx={{ fontSize: 20, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                            CRM <Box component="span" sx={{ color: "primary.main" }}>Party</Box> Analytics
                        </Typography> */}
                        <Typography variant="h6" sx={{ fontSize: 20, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                            Party Analytics
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6B7A99" }}>Order · Payment · Outstanding Due</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                    variant="outlined"
                    size="small"
                    onClick={onBack}
                    sx={{
                        mb: 2.5,
                        color: "#6B7A99",
                        borderColor: "rgba(255,255,255,0.11)",
                        display: "flex",
                        justifyContent: "flex-end",
                        "&:hover":
                        {
                            borderColor: "primary.main",
                            color: "text.primary"
                        }
                    }}
                >Back to Party List</Button>
            </Box>
            {/* Filter Panel */}
            {/* <Card sx={{
                mb: 2.75
            }}>
                <CardContent>
                    <Typography variant="caption" sx={{ color: "#6B7A99", letterSpacing: "0.07em", fontWeight: 600, display: "block", mb: 1.75 }}>
                        Party Order Analytics — Filter
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.75} alignItems={{ sm: "flex-end" }} flexWrap="wrap">
                        <FormControl size="small" sx={{ minWidth: 240, flex: 2 }}>
                            <InputLabel>Select Party</InputLabel>
                            <Select value={selPartyId} onChange={e => setSelPartyId(e.target.value)} label="Select Party">
                                <MenuItem value="" disabled>— Choose a Party —</MenuItem>
                                <MenuItem disabled sx={{ fontSize: 11, color: "#6B7A99", fontWeight: 600 }}>── Customers ──</MenuItem>
                                {customers.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                                <MenuItem disabled sx={{ fontSize: 11, color: "#6B7A99", fontWeight: 600 }}>── Suppliers ──</MenuItem>
                                {suppliers.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField size="small" label="From Date" type="date" value={from} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ flex: 1, minWidth: 160 }} />
                        <TextField size="small" label="To Date" type="date" value={to} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ flex: 1, minWidth: 160 }} />
                        <Button
                            variant="contained"
                            onClick={handleApply}
                            disabled={!selPartyId}
                            sx={{ height: 40, px: 3.5, background: "linear-gradient(135deg, #3D8EF0, #6BAFFF)", fontWeight: 700, letterSpacing: "0.03em", "&:hover": { opacity: 0.9, boxShadow: "0 4px 14px rgba(61,142,240,0.35)" } }}
                        >Apply</Button>
                    </Stack>
                </CardContent>
            </Card> */}

            {/* Empty state */}
            {!result && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Box sx={{ fontSize: 44, mb: 1.75, opacity: 0.35 }}>📊</Box>
                    <Typography sx={{ color: "#6B7A99" }}>Select a party and date range, then click <strong style={{ color: "#E6EAF4" }}>Apply</strong> to view analytics.</Typography>
                </Box>
            )}

            {/* Analytics Content */}
            {result && party && (
                <>
                    {/* Party Header Card */}
                    <Card sx={{
                        //  bgcolor: "#131826",
                        mb: 2.5
                    }}>
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ width: 48, height: 48, borderRadius: "12px", bgcolor: party.color, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17 }}>
                                    {initials(party.name)}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontSize: 18 }}>{party.name}</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                                        <Chip label={party.type} size="small" sx={{
                                            height: 18, fontSize: 10, fontWeight: 600,
                                            //   background: party.type === "Customer" ? "rgba(61,142,240,0.12)" : "rgba(46,201,154,0.12)",
                                            color: party.type === "Customer" ? "#3D8EF0" : "#2EC99A",
                                        }} />
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                                            <LocationOnOutlinedIcon sx={{ width: 14, height: 14, mr: 0.5, color: "#da1111" }} />
                                            <Typography variant="caption" sx={{ color: "#6B7A99" }}>{party.city || "---"}</Typography>

                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                                            <AddIcCallOutlinedIcon sx={{ width: 14, height: 14, mr: 0.5, color: "#da1111" }} />
                                            <Typography variant="caption" sx={{ color: "#6B7A99" }}>{party.phone || "---"}</Typography>

                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                                            <ReceiptOutlinedIcon sx={{ width: 14, height: 14, mr: 0.5, color: "#da1111" }} />
                                            <Typography variant="caption" sx={{ color: "#6B7A99" }}>GSTIN: {party.gstin || "---"}</Typography>
                                        </Box>

                                    </Box>
                                </Box>
                                {/* <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                                    <Typography variant="caption" sx={{ color: "#6B7A99", letterSpacing: "0.06em" }}>Period</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>{result.from} → {result.to}</Typography>
                                </Box> */}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Metric Cards */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1.75, mb: 2.5, "@media (max-width:960px)": { gridTemplateColumns: "1fr 1fr" }, "@media (max-width:600px)": { gridTemplateColumns: "1fr" } }}>
                        <MetricCard icon={<InventoryOutlinedIcon />} label="Total Orders" value={fmt(totalOrders)} sub={`${orders.length} order(s)`} topColor="linear-gradient(90deg, #3D8EF0, #6BAFFF)" />
                        <MetricCard icon={<CurrencyRupeeOutlinedIcon />} label="Payments Received" value={fmt(totalPayments)} sub={`${payments.filter(r => r.status === "Cleared").length} cleared`} topColor="linear-gradient(90deg, #2EC99A, #7CE8C7)" />
                        <MetricCard icon={<PendingActionsOutlinedIcon />} label="Outstanding Due" value={fmt(totalDue)} sub={`${overdueOrders.length} pending order(s)`} topColor="linear-gradient(90deg, #F06464, #FFAAAA)" />
                        <MetricCard icon={<ShowChartOutlinedIcon />} label="Collection Rate" value={`${pct(totalPayments, totalOrders)}%`} sub={`${pendingOrders.length} in progress`} topColor="linear-gradient(90deg, #F5B942, #FFD98A)" />
                    </Box>

                    {/* Charts */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, mb: 2.5, "@media (max-width:960px)": { gridTemplateColumns: "1fr" } }}>
                        {/* Pie Chart */}
                        {/* <Card sx={{
                            // bgcolor: "#131826"
                        }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontSize: 14, mb: 2 }}>Financial Breakdown</Typography>
                                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, alignItems: "center" }}>
                                    <Box sx={{ height: 200, position: "relative" }}>
                                        <FinancialPieChart totalOrders={totalOrders} totalPayments={totalPayments} totalDue={totalDue} />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                        {[["Total Orders", "#3D8EF0", fmt(totalOrders)], ["Payments Received", "#2EC99A", fmt(totalPayments)], ["Outstanding Due", "#F06464", fmt(totalDue)]].map(([l, c, v]) => (
                                            <Box key={l}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c, flexShrink: 0 }} />
                                                    <Typography variant="caption" sx={{ color: "#6B7A99" }}>{l}</Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 15, fontWeight: 700, color: c, pl: 2.25, mt: 0.25 }}>{v}</Typography>
                                            </Box>
                                        ))}
                                        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: "#6B7A99" }}>Collection Rate</Typography>
                                            <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#F5B942", fontFamily: "'Syne', sans-serif" }}>{pct(totalPayments, totalOrders)}%</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card> */}

                        {/* Bar Chart */}
                        <Card sx={{
                            // bgcolor: "#131826"
                        }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontSize: 14, mb: 2 }}>Monthly Order vs Delivery</Typography>
                                <Box sx={{ height: 210, position: "relative" }}>
                                    <MonthlyBarChart orders={orders} />
                                </Box>
                                <Stack direction="row" spacing={1.5} sx={{ mt: 1.75 }}>
                                    {[["Order Value", "#3D8EF0"], ["Delivered", "#2EC99A"]].map(([l, c]) => (
                                        <Box key={l} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                            <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: c }} />
                                            <Typography variant="caption" sx={{ color: "#6B7A99" }}>{l}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Orders Table */}
                    <DataTableCard
                        icon={<InventoryOutlinedIcon />} iconBg="rgba(61,142,240,0.12)" label="Orders"
                        total={fmt(totalOrders)} totalColor="#3D8EF0" count={`${orders.length} records`}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {/* {["Order ID", "Date", "Ref No", "Product / Item", "Qty", "Rate", "Amount", "Status"].map(h => <TableCell key={h}>{h}</TableCell>)} */}
                                    {["SL#", "Order ID", "Date", "Amount", "Status"].map(h => <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.length ? orders.map((o, index) => (
                                    <>
                                        <TableRow
                                            key={o.id}
                                            onClick={() => handleRowClick(o.id)}
                                            sx={{ cursor: "pointer" }}
                                            sx={{
                                                "&:hover td": {
                                                    // bgcolor: "#1A2035"
                                                    bgcolor: "#c2cbe9"
                                                }
                                            }}>
                                            <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "#3D8EF0" }}>{o.id}</TableCell>
                                            <TableCell sx={{ color: "#6B7A99", fontSize: 12 }}>{o.date}</TableCell>
                                            {/* <TableCell sx={{ color: "#6B7A99", fontSize: 12 }}>{o.ref}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{o.product}</TableCell>
                                        <TableCell>{o.qty} {o.unit}</TableCell>
                                        <TableCell>{fmt(o.rate)}</TableCell> */}
                                            <TableCell sx={{ fontWeight: 600 }}>{fmt(o.amount)}</TableCell>
                                            <TableCell><StatusChip status={o.status} statusColors={statusColors} /></TableCell>
                                        </TableRow>

                                        {/* EXPANDED ROW */}
                                        {expandedOrderId === o.id && (

                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "#3D8EF0" }}>
                                                            {/* Items ({o.items.length}) - <span style={{fontWeight: 600, color: "#3D8EF0" }}>{o.id}</span> */}
                                                            Order ID - {o.id} || Items ({o.items.length})
                                                        </Typography>

                                                        {!o.items.length ? (
                                                            <Table size="small">
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell colSpan={6} align="center">
                                                                            No items to display
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>) : (<Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell sx={{ fontWeight: 600 }}>SL#</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600 }}>Discount</TableCell>
                                                                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                                                                    </TableRow>
                                                                </TableHead>

                                                                <TableBody>
                                                                    {o.items.map((item, itemIndex) => (
                                                                        <TableRow
                                                                            key={item.item_id}
                                                                            sx={{
                                                                                "&:hover td": {
                                                                                    bgcolor: "#c2cbe9"
                                                                                }
                                                                            }}
                                                                        >
                                                                            <TableCell>{itemIndex + 1}</TableCell>
                                                                            <TableCell>{item.product_name}</TableCell>
                                                                            <TableCell>{item.qty}</TableCell>
                                                                            <TableCell>₹{item.rate}</TableCell>
                                                                            <TableCell>{item.discount}%</TableCell>
                                                                            <TableCell>₹{item.amount}</TableCell>
                                                                        </TableRow>
                                                                    ))}

                                                                    {/* {!o.items.length ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={6} align="center">
                                                                            <Typography sx={{ color: "#6B7A99", fontSize: 13 }}>
                                                                                No items in this order
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    o.items.map((item, itemIndex) => (
                                                                        <TableRow
                                                                            key={item.item_id}
                                                                            sx={{
                                                                                "&:hover td": {
                                                                                    bgcolor: "#c2cbe9"
                                                                                }
                                                                            }}
                                                                        >
                                                                            <TableCell>{itemIndex + 1}</TableCell>
                                                                            <TableCell>{item.product_name}</TableCell>
                                                                            <TableCell>{item.qty}</TableCell>
                                                                            <TableCell>₹{item.rate}</TableCell>
                                                                            <TableCell>{item.discount}%</TableCell>
                                                                            <TableCell>₹{item.amount}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                )} */}
                                                                </TableBody>
                                                            </Table>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </>
                                )) : <EmptyRow colSpan={8} />}
                            </TableBody>
                        </Table>
                    </DataTableCard>

                    {/* Payments Table */}
                    <DataTableCard
                        icon={<CurrencyRupeeOutlinedIcon />} iconBg="rgba(46,201,154,0.12)" label="Payments Received"
                        total={fmt(totalPayments)} totalColor="#2EC99A" count={`${payments.length} records`}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {["SL#", "Receipt ID", "Date", "Mode", "Reference", "Against Order", "Amount", "Status"].map(h => <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.length ? payments.map((r, index) => (
                                    <TableRow key={r.id} sx={{
                                        "&:hover td": {
                                            // bgcolor: "#1A2035"
                                            bgcolor: "#c2cbe9"
                                        }
                                    }}>
                                        <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: "#2EC99A" }}>{r.id}</TableCell>
                                        <TableCell sx={{ color: "#6B7A99", fontSize: 12 }}>{r.date}</TableCell>
                                        <TableCell>
                                            <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: 0.5, fontSize: 11 }}>{r.mode}</Box>
                                        </TableCell>
                                        <TableCell sx={{ color: "#6B7A99", fontSize: 12 }}>{r.ref}</TableCell>
                                        <TableCell sx={{ color: "#3D8EF0", fontSize: 12, fontWeight: 600 }}>{r.order_ref}</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>{fmt(r.amount)}</TableCell>
                                        <TableCell><StatusChip status={r.status} statusColors={statusColors} /></TableCell>
                                    </TableRow>
                                )) : <EmptyRow colSpan={7} />}
                            </TableBody>
                        </Table>
                    </DataTableCard>

                    {/* Outstanding Dues Table */}
                    <DataTableCard
                        icon={<PendingActionsOutlinedIcon />} iconBg="rgba(240,100,100,0.12)" label="Outstanding Dues"
                        total={fmt(totalDue)} totalColor="#F06464" count={`${pendingOrders.length} items`}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {/* {["Order ID", "Date", "Product / Item", "Order Amt", "Paid", "Balance Due", "Status"].map(h => <TableCell key={h}>{h}</TableCell>)} */}
                                    {["SL#", "Order ID", "Date", "Order Amt", "Paid", "Balance Due", "Status"].map(h => <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingOrders.length ? pendingOrders.map((o, index) => {
                                    const paidAmt = (allPayments[result.partyId] || []).filter(r => r.order_ref === o.id && r.status === "Cleared").reduce((s, r) => s + r.amount, 0);
                                    // const bal = Math.max(0, o.amount - paidAmt);
                                    // const balPct = pct(bal, o.amount);
                                    // const bal = (allPayments[result.partyId] || []).reduce((sum, o) => sum + (o.due || 0), 0);
                                    const bal = o.due || 0;
                                    const balPct = pct(bal, o.amount);
                                    return (
                                        <TableRow key={o.id} sx={{
                                            "&:hover td": {
                                                // bgcolor: "#1A2035"
                                                bgcolor: "#c2cbe9"
                                            }
                                        }}>
                                            <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: "#F5B942" }}>{o.id}</TableCell>
                                            <TableCell sx={{ color: "#6B7A99", fontSize: 12 }}>{o.date}</TableCell>
                                            {/* <TableCell sx={{ fontWeight: 500 }}>{o.product}</TableCell> */}
                                            <TableCell>{fmt(o.amount)}</TableCell>
                                            <TableCell sx={{ color: "#2EC99A" }}>{fmt(paidAmt)}</TableCell>
                                            <TableCell>
                                                <Typography sx={{ color: "#F06464", fontWeight: 700, fontSize: 13 }}>{fmt(bal)}</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={balPct}
                                                    sx={{
                                                        width: 80, height: 4, mt: 0.5, borderRadius: 2,
                                                        //  bgcolor: "rgba(255,255,255,0.07)",
                                                        "& .MuiLinearProgress-bar": { bgcolor: "#F06464", borderRadius: 2 }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell><StatusChip status={o.status} statusColors={statusColors} /></TableCell>
                                        </TableRow>
                                    );
                                }) : (
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ textAlign: "center", py: 4.5, color: "#2EC99A" }}>
                                            ✓ All orders fully settled — no outstanding dues
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DataTableCard>
                </>
            )}
        </Box>
    );
}

// ─── DATA TABLE WRAPPER ───────────────────────────────────────────────────────
function DataTableCard({ icon, iconBg, label, total, totalColor, count, children }) {
    return (
        <Card sx={{
            // bgcolor: "#131826",
            mb: 2, overflow: "hidden"
        }}>
            <Box sx={{
                display: "flex", alignItems: "center", gap: 1.25, px: 2.25, py: 1.75, borderBottom: "1px solid rgba(255,255,255,0.06)",
                //  bgcolor: "#1A2035" 
            }}>
                <Box sx={{ width: 30, height: 30, borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: iconBg, flexShrink: 0 }}>{icon}</Box>
                <Typography variant="subtitle1" sx={{ fontSize: 13 }}>{label}</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: totalColor, ml: 1 }}>{total}</Typography>
                <Box sx={{ ml: "auto", fontSize: 11, px: 1.25, py: 0.375, borderRadius: "12px", background: "rgba(255,255,255,0.05)", color: "#6B7A99", fontWeight: 500 }}>{count}</Box>
            </Box>
            <Box sx={{ overflowX: "auto" }}>{children}</Box>
        </Card>
    );
}

function EmptyRow({ colSpan }) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} sx={{ textAlign: "center", py: 4.5, color: "#6B7A99" }}>No records in selected range</TableCell>
        </TableRow>
    );
}

export default function CRMPartyAnalytics() {
    // const parties = mockData.parties;
    // const orders = mockData.orders;
    // const payments = mockData.payments

    const dispatch = useDispatch();
    const [view, setView] = useState("list");
    const [selectedParty, setSelectedParty] = useState(null);
    const CompanyID = sessionStorage.getItem("compID");
    // const OldCompanyID = sessionStorage.getItem("OldCompanyID");
    console.log("🚀 ~ CRMPartyAnalytics ~ CompanyID:", CompanyID)
    // console.log("🚀 ~ CRMPartyAnalytics ~ OldCompanyID:", OldCompanyID)

    const PartyAnalyticsData = useSelector((state) => state.formApi.PartyAnalyticsdata);
    const PartyAnalyticsloading = useSelector((state) => state.formApi.PartyAnalyticsloading);
    const STATUS_COLORS = PartyAnalyticsData?.data?.STATUS_COLORS || {};
    const parties = PartyAnalyticsData?.data?.parties || [];
    const orders = PartyAnalyticsData?.data?.orders || {};
    const payments = PartyAnalyticsData?.data?.payments || {};
    console.log("🚀 ~ CRMPartyAnalytics ~ PartyAnalyticsData:", parties, orders, payments)
    // useEffect(() => {
    //     if (CompanyID) {
    //         dispatch(PartyAnalytics({ Data: { CompanyID } }));
    //     }
    // }, [dispatch, CompanyID]);
    // useEffect(() => {
    //     if (CompanyID && CompanyID !== OldCompanyID) {
    //         dispatch(resetPartyAnalyticsdata());  
    //     }
    // }, [CompanyID]);
    useEffect(() => {
        if (CompanyID) {
            dispatch(resetPartyAnalyticsdata());  
        }
    }, [CompanyID]);
    const handleApply = (filters) => {
        if (CompanyID) {
            dispatch(PartyAnalytics({ Data: { CompanyID, ...filters } }));
            // sessionStorage.setItem("OldCompanyID", CompanyID);
        }
    };

    const openAnalytics = (party) => {
        setSelectedParty(party);
        setView("analytics");
    };

    const goBack = () => {
        setView("list");
        setSelectedParty(null);
    };


    const [filters, setFilters] = useState({
        search: "",
        typeFilter: "all",
        paymentStatus: "all",
        from: "",
        to: ""
    });
    return (
        <ThemeProvider
        // theme={darkTheme}
        >
            <CssBaseline />
            <Box sx={{
                // bgcolor: "#0B0E18", 
                minHeight: "100vh"
            }}>
                <Box sx={{ maxWidth: 1480, mx: "auto", px: { xs: 2, md: 3 }, py: 3.5 }}>
                    {view === "list" && (
                        <PartyListPage
                            parties={parties}
                            orders={orders}
                            payments={payments}
                            onOpenAnalytics={openAnalytics}
                            onApply={handleApply}
                            loading={PartyAnalyticsloading}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    )}

                    {view === "analytics" && (
                        <PartyAnalyticsPage
                            statusColors={STATUS_COLORS}
                            parties={parties}
                            allOrders={orders}
                            allPayments={payments}
                            preselected={selectedParty}
                            onBack={goBack}
                        />
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
