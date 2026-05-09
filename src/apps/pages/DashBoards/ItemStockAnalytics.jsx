import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Employeeautocomplete, Employeeautocomplete_v1 } from "../../../ui-components/global/Autocomplete";
import { getConfig } from "../../../config";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomisedCaptionGet, ItemstockAnalyticsGET } from "../../../store/reducers/Formapireducer";
import { Formik } from "formik";

const theme = createTheme({
  palette: {
    primary: { main: "#52cfd3" },
    background: { default: "#F5F3EE", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 8, fontWeight: 500 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 20 } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid #E8E5DE", padding: "12px 16px" },
        head: {
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#888780",
          textTransform: "uppercase",
          background: "#FAFAF8",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            background: "#fff",
            "& fieldset": { borderColor: "#D3D1C7" },
            "&:hover fieldset": { borderColor: "#1D6B4E" },
            "&.Mui-focused fieldset": { borderColor: "#1D6B4E" },
          },
        },
      },
    },
  },
});

// ── data ────────────────────────────────────────────────────────────────────
const ALL_RECORDS = [
  { id: "01", date: "15/04/2026", raw: "2026-04-15", emp: "Lalitha Parameshwari", av: "LP", dept: "Warehouse", items: 2, status: "Completed" },
  { id: "02", date: "28/04/2026", raw: "2026-04-28", emp: "Ravi Kumar",            av: "RK", dept: "Logistics",   items: 4, status: "Pending"   },
  { id: "03", date: "29/04/2026", raw: "2026-04-29", emp: "Lalitha Parameshwari", av: "LP", dept: "Warehouse",   items: 2, status: "Completed" },
  { id: "04", date: "02/05/2026", raw: "2026-05-02", emp: "Sneha Nair",            av: "SN", dept: "Procurement", items: 3, status: "Pending"   },
  { id: "05", date: "04/05/2026", raw: "2026-05-04", emp: "Ravi Kumar",            av: "RK", dept: "Logistics",   items: 1, status: "Completed" },
  { id: "06", date: "06/05/2026", raw: "2026-05-06", emp: "Arjun Mehta",           av: "AM", dept: "Warehouse",   items: 5, status: "In Review" },
  { id: "07", date: "06/05/2026", raw: "2026-05-06", emp: "Sneha Nair",            av: "SN", dept: "Procurement", items: 2, status: "Completed" },
];

const OFFICERS = [
  { name: "Lalitha Parameshwari", av: "LP", dept: "Warehouse" },
  { name: "Ravi Kumar",           av: "RK", dept: "Logistics"   },
  { name: "Sneha Nair",           av: "SN", dept: "Procurement" },
  { name: "Arjun Mehta",          av: "AM", dept: "Warehouse"   },
];

// avatar bg per initials
const avColor = (av) =>
  ({ LP: "#C8EAD8", RK: "#BDD8F5", SN: "#E0DBFA", AM: "#FAE5CC" }[av] ?? "#E8E5DE");
const avText = (av) =>
  ({ LP: "#0f4d5c", RK: "#0C407C", SN: "#3C3489", AM: "#633806" }[av] ?? "#444");

// status chip styles
const statusStyle = (s) => {
  if (s === "Completed") return { bg: "#D4F0E4", color: "#0B5E38" };
  if (s === "Pending")   return { bg: "#FAECC8", color: "#7A4D0A" };
  return                        { bg: "#DAE9FB", color: "#0C407C" };
};

// KPI config
// const KPI_CONFIG = [
//   { key: "stockIn", label: "Stock in",  Icon: Inventory2OutlinedIcon,       bg: "#D4F0E4", color: "#0B5E38" },
//   { key: "orders",  label: "Orders",    Icon: ShoppingCartOutlinedIcon,      bg: "#DAE9FB", color: "#0C407C" },
//   { key: "returns", label: "Returns",   Icon: ReplayOutlinedIcon,            bg: "#E8E5DE", color: "#5F5E5A" },
//   { key: "pending", label: "Pending",   Icon: HourglassEmptyOutlinedIcon,    bg: "#FAECC8", color: "#7A4D0A" },
//   { key: "removed", label: "Removed",   Icon: DeleteOutlineOutlinedIcon,     bg: "#FAD9D9", color: "#8C2222" },
// ];

// ── component ────────────────────────────────────────────────────────────────
export default function ItemStokAnalytics() {

 const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const config = getConfig();
  const baseurlUAAM = config.UAAM_URL;
  var accessID = params.accessID;
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";

      const EmpName = sessionStorage.getItem("EmpName");
      const EmpId = sessionStorage.getItem("EmpId");
      const CompanyID = sessionStorage.getItem("compID");
      const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    
   useEffect(() => {
      if (Subscriptionlastthree && accessID) {
        dispatch(
          CustomisedCaptionGet({
            Vertical: Subscriptionlastthree,
            AccessID: accessID,
          })
        );
      }
    }, [Subscriptionlastthree, accessID, dispatch]);


 const [empData, setempData] = useState(null);

  const [empQuery,   setEmpQuery]   = useState(OFFICERS[0].name);
  const [fromDate,   setFromDate]   = useState("");
  const [toDate,     setToDate]     = useState("");
  const [statusTab,  setStatusTab]  = useState("All");

  

  const filtered = useMemo(() => {
    const q = empQuery.trim().toLowerCase();
    return ALL_RECORDS.filter((r) => {
      const empMatch = !q || r.emp.toLowerCase().includes(q);
      const fromMatch = !fromDate || r.raw >= fromDate;
      const toMatch   = !toDate   || r.raw <= toDate;
      const tabMatch  = statusTab === "All" || r.status === statusTab;
      return empMatch && fromMatch && toMatch && tabMatch;
    });
  }, [empQuery, fromDate, toDate, statusTab]);


  // header date display
  // const fmt = (iso) => (iso ? iso.split("-").reverse().join("/") : "—");


const handleApply = (values) => {
  console.log("Formik Values:", values);

  dispatch(
    ItemstockAnalyticsGET({
      EmployeeID: values.Employee?.RecordID || "",
      CompanyID: CompanyID,
      FromDate: values.fromDate,
      ToDate: values.toDate,
      
    })
  );
};

const itemstockDataAnalytics = useSelector((state) => state.formApi.itemstockDataAnalytics || []);
console.log(itemstockDataAnalytics, "--Find itemstockDataAnalytics");

//=================================================step one================================ 
const [officerIdx, setOfficerIdx] = useState(0);

// Reset officer index when data changes
useEffect(() => {
  setOfficerIdx(0);
}, [itemstockDataAnalytics.length]);

const officer = itemstockDataAnalytics[officerIdx] || null;

const switchOfficer = () => {
  setOfficerIdx((prev) => (prev + 1) % itemstockDataAnalytics.length);
};
// Helper: generate initials from name
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

// Avatar colors cycling
const AVATAR_COLORS = [
  { bg: "#C8EAD8", color: "#0f4d5c" },
  { bg: "#BDD8F5", color: "#0C407C" },
  { bg: "#E0DBFA", color: "#3C3489" },
  { bg: "#FAE5CC", color: "#633806" },
  { bg: "#D4F0E4", color: "#0B5E38" },
  { bg: "#FAF0C8", color: "#7A4D0A" },
];
const getAvatarStyle = (idx) => AVATAR_COLORS[idx % AVATAR_COLORS.length];

//==========================count displays the icon step 2==============================
// Replace kpiValues with direct officer values:
const kpiValues = officer
  ? {
      stockIn:  officer.StockTakeCount,
      orders:   officer.StockRequirementCount,
      returns:  officer.StockRearrangementCount,
      pending:  officer.StockExpiryCount,
      removed:  officer.StockScrapCount,
    }
  : { stockIn: 0, orders: 0, returns: 0, pending: 0, removed: 0 };

// Also update KPI_CONFIG labels to match:
const KPI_CONFIG = [
  { key: "stockIn", label: "Stock Take",     Icon: Inventory2OutlinedIcon,    bg: "#D4F0E4", color: "#0B5E38" },
  { key: "orders",  label: "Requirements",   Icon: ShoppingCartOutlinedIcon,  bg: "#DAE9FB", color: "#0C407C" },
  { key: "returns", label: "Rearrangement",  Icon: ReplayOutlinedIcon,        bg: "#E8E5DE", color: "#5F5E5A" },
  { key: "pending", label: "Expiry",         Icon: HourglassEmptyOutlinedIcon,bg: "#FAECC8", color: "#7A4D0A" },
  { key: "removed", label: "Scrap",          Icon: DeleteOutlineOutlinedIcon, bg: "#FAD9D9", color: "#8C2222" },
];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: "#F5F3EE", minHeight: "100vh", p: 2, fontFamily: "Inter, sans-serif" }}>
        <Paper 
        elevation={0} 
        sx={{
  width: "100%",
  minHeight: "calc(100vh - 20px)",
}}
         >

          {/* ── TOP BAR ───────────────────────────────────────────────── */}
          <Box sx={{ background: "#1d8077", px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "#7FD4AA", textTransform: "uppercase" }}>
                Stock Activity
              </Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                Reports
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", border: "1px solid rgba(255,255,255,.25)", borderRadius: 2, overflow: "hidden" }}>
              {["FROM", "TO"].map((lbl, i) => (
                <Box key={lbl} sx={{ px: 2.5, py: 1, borderLeft: i ? "1px solid rgba(255,255,255,.25)" : "none" }}>
                  <Typography sx={{ fontSize: 10, letterSpacing: ".09em", color: "#7FD4AA", fontWeight: 600 }}>{lbl}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#fff", mt: "2px" }}>
                    {i === 0 ? fmt(fromDate) : fmt(toDate)}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: "flex", alignItems: "center", px: 1.5, borderLeft: "1px solid rgba(255,255,255,.25)" }}>
                <IconButton size="small" sx={{ color: "#fff", p: 0.5 }}>
                  <PictureAsPdfOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box> */}
          </Box>

          {/* ── FILTER BAR ────────────────────────────────────────────── */}
          <Box sx={{ background: "#F0EDE5", px: 3, py: 2, borderBottom: "1px solid #E0DDD6" }}>
         <Formik
  initialValues={{
    Employee: null,
    fromDate: "",
    toDate: "",
  }}
  onSubmit={(values) => {
    handleApply(values);
  }}
>
  {({  errors,
                            touched,
                            handleBlur,
                            handleChange,
                            isSubmitting,
                            values,
                            handleSubmit,
                            setFieldValue
                           }) => (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          background: "#F0EDE5",
          px: 3,
          py: 2,
          borderBottom: "1px solid #E0DDD6",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-end">

          {/* Employee */}
          <Box flex={1}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".09em",
                color: "#888780",
                mb: 0.75,
                textTransform: "uppercase",
              }}
            >
              Personnel
            </Typography>

            <Employeeautocomplete_v1
              sx={{ width: 350 }}
              name="Employee"
              id="Employee"
              value={values.Employee}
              onChange={(newValue) => {
                setFieldValue("Employee", newValue);
              }}
              url={`${listViewurl}?data=${encodeURIComponent(
                JSON.stringify({
                  Query: {
                    AccessID: "2117",
                    VerticalLicense: Subscriptionlastthree,
                    ScreenName: "Employee",
                    Filter: `CompanyID='${CompanyID}'`,
                    Any: "",
                    CompId: "",
                  },
                })
              )}`}
            />
          </Box>

          {/* From Date */}
          <Box sx={{ width: 190 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".09em",
                color: "#888780",
                mb: 0.75,
                textTransform: "uppercase",
              }}
            >
              From Date
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="date"
              name="fromDate"
              value={values.fromDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* To Date */}
          <Box sx={{ width: 190 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".09em",
                color: "#888780",
                mb: 0.75,
                textTransform: "uppercase",
              }}
            >
              To Date
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="date"
              name="toDate"
              value={values.toDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Apply Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1d8077",
              color: "#fff",
              height: 40,
              "&:hover": {
                backgroundColor: "#17665f",
              },
            }}
          >
            APPLY
          </Button>

          {/* Reset Button */}
          <Button
            type="reset"
            variant="contained"
            color="error"
            sx={{ height: 40 }}
            // onClick={() => handleReset(resetForm)}
          >
            RESET
          </Button>
        </Stack>
      </Box>
    </form>
  )}
</Formik>
          </Box>

          
        {/* ── OFFICER STRIP ─────────────────────────────────────────── */}
{officer && (
  <Box sx={{ px: 3, py: 1.75, display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid #E0DDD6", background: "#fff" }}>
    <Avatar
      sx={{
        width: 44, height: 44,
        background: getAvatarStyle(officerIdx).bg,
        color: getAvatarStyle(officerIdx).color,
        fontWeight: 600, fontSize: 14,
        border: "2px solid #5DCAA5",
      }}
    >
      {getInitials(officer.EmployeeName)}
    </Avatar>
    <Box flex={1}>
      <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: ".09em", color: "#888780", textTransform: "uppercase" }}>
        Current Officer
      </Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>
        {officer.EmployeeName}
      </Typography>
      {/* <Typography sx={{ fontSize: 12, color: "#888780" }}>
        {officer.EmployeeCode} · ID {officer.EmployeeID}
      </Typography> */}
    </Box>
    <Chip
      label={`${officer.StockTakeCount + officer.StockRequirementCount + officer.StockRearrangementCount + officer.StockExpiryCount + officer.StockScrapCount} activities`}
      variant="outlined"
      sx={{ borderColor: "#1D6B4E", color: "#1D6B4E", fontWeight: 500, fontSize: 13 }}
    />
    <Button
      variant="outlined"
      startIcon={<SwapHorizIcon />}
      onClick={switchOfficer}
      disabled={itemstockDataAnalytics.length <= 1}
      sx={{ borderColor: "#D3D1C7", color: "#444", "&:hover": { borderColor: "#1D6B4E" } }}
    >
      Switch ({officerIdx + 1}/{itemstockDataAnalytics.length})
    </Button>
  </Box>
)}

          {/* ── KPI ROW ───────────────────────────────────────────────── */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid #E0DDD6", background: "#fff" }}>
            {KPI_CONFIG.map(({ key, label, Icon, bg, color }, i) => (
              <Box
                key={key}
                sx={{
                  py: 2.5, textAlign: "center",
                  borderRight: i < 4 ? "1px solid #E0DDD6" : "none",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75,
                }}
              >
                <Box sx={{ width: 40, height: 40, background: bg, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon sx={{ fontSize: 20, color }} />
                </Box>
                <Typography sx={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1 }}>
                  {kpiValues[key]}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#888780" }}>{label}</Typography>
              </Box>
            ))}
          </Box>

          {/* ── TOTAL ROW ─────────────────────────────────────────────── */}
          <Box sx={{ px: 3, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F8F6F1", borderBottom: "1px solid #E0DDD6" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#444" }}>Total activities</Typography>
            <Box sx={{ background: "#1D6B4E", color: "#fff", fontWeight: 700, fontSize: 16, width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {filtered.length}
            </Box>
          </Box>

          {/* ── LIST HEADER ───────────────────────────────────────────── */}
          <Box sx={{ px: 3, py: 1.25, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #E0DDD6" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Stock take</Typography>
              {["All", "Completed", "Pending", "In Review"].map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  onClick={() => setStatusTab(s)}
                  sx={{
                    fontWeight: 500, fontSize: 12, cursor: "pointer",
                    background: statusTab === s ? "#1D6B4E" : "transparent",
                    color: statusTab === s ? "#fff" : "#555",
                    border: statusTab === s ? "1px solid #1D6B4E" : "1px solid #D3D1C7",
                  }}
                />
              ))}
            </Stack>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{ borderColor: "#D3D1C7", color: "#555", fontSize: 12, "&:hover": { borderColor: "#1D6B4E" } }}
            >
              Export
            </Button>
          </Box>

          {/* ── TABLE ─────────────────────────────────────────────────── */}
          <TableContainer sx={{ background: "#fff" }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 48 }}>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell sx={{ width: 48 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#B4B2A9", fontSize: 14 }}>
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row, i) => {
                    const { bg, color } = statusStyle(row.status);
                    return (
                      <TableRow key={row.id} hover sx={{ "&:hover": { background: "#F5FBF7" }, cursor: "pointer" }}>
                        <TableCell sx={{ color: "#B4B2A9", fontSize: 13, fontWeight: 500 }}>
                          {String(i + 1).padStart(2, "0")}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <FiberManualRecordIcon sx={{ fontSize: 10, color: "#1D9E75" }} />
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{row.date}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar sx={{ width: 30, height: 30, fontSize: 11, fontWeight: 600, background: avColor(row.av), color: avText(row.av) }}>
                              {row.av}
                            </Avatar>
                            <Typography sx={{ fontSize: 13 }}>{row.emp}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: "#666" }}>{row.dept}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{ background: bg, color, fontWeight: 600, fontSize: 11, border: "none" }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
                          {row.items}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ border: "1px solid #E0DDD6", borderRadius: 1.5, color: "#E24B4A" }}>
                            <PictureAsPdfOutlinedIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
      </Box>
    </ThemeProvider>
  );
}