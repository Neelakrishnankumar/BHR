import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  Chip,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import DeckIcon from "@mui/icons-material/Deck";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-hot-toast";
import { FaFileExcel } from "react-icons/fa";

import {
  dataGridHeaderFooterHeight,
  dataGridRowHeight,
} from "../../../ui-components/global/utils";
import {
  resetTrackingData,
  Attendance,
  CustomisedCaptionGet,
  AttendanceSyncGet,
} from "../../../store/reducers/Formapireducer";
import { tokens } from "../../../Theme";
import AttendancePDF from "../pdf/AttendancePdf";
import MonthlyAttendanceExcel from "../pdf/MonthlyAttendanceExcel";
import { TimeSheetEmployeeautocomplete } from "../../../ui-components/global/Autocomplete";
import { getConfig } from "../../../config";

/* -------------------------------------------------------------------------- */
/*  Constants & helpers (outside the component so identities stay stable)     */
/* -------------------------------------------------------------------------- */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Shared look for every input in the filter bar
const fieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "6px",
    "& fieldset": { borderColor: "#d1d5db" },
    "&:hover fieldset": { borderColor: "#bfc4cc" },
    "&.Mui-focused fieldset": { borderColor: "#d1d5db", borderWidth: "1px" },
  },
  "& .MuiInputLabel-root": { color: "#6b7280" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
};

// Session storage is namespaced per mode so the two "screens" never leak
// month / project / employee / classification into each other.
const readSession = (prefix, key) => {
  try {
    const raw = sessionStorage.getItem(prefix + key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeSession = (prefix, key, value) => {
  try {
    if (value === null || value === undefined || value === "") {
      sessionStorage.removeItem(prefix + key);
    } else {
      sessionStorage.setItem(prefix + key, JSON.stringify(value));
    }
  } catch {
    /* storage unavailable - ignore */
  }
};

// The autocomplete is used with both onChange(newValue) and
// onChange(event, newValue) in this file's history - accept either.
const pickValue = (a, b) => (b !== undefined ? b : a) ?? null;

// "Week Off", "WeekOff", "week off" -> "weekoff"
const getStatusType = (status) => {
  const s = (status || "").toString().replace(/\s+/g, "").toLowerCase();
  if (s === "weekoff") return "weekoff";
  if (s === "holiday") return "holiday";
  if (["casualleave", "sickleave", "medicalleave"].includes(s)) return "leave";
  return null;
};

const defaultCloseTitles = {
  Close: "Are you sure you want to close this screen?",
  Logout: "Are you sure you want to log out?",
};

function AttendanceTool() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}
    >
      <Typography>Attendance</Typography>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const EditAttendance = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  /* ---- route / mode ---- */
  const accessID = params.accessID;
  const mode = params.Mode;
  const isClassMode = mode === "M"; // "M" screen = classification based
  const prefix = `att_${mode || "default"}_`;

  /* ---- session / config ---- */
  const CompanyID = sessionStorage.getItem("compID");
  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode.slice(-3);
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  const is003Subscription = SubscriptionCode.endsWith("003");
  const baseurlUAAM = getConfig().UAAM_URL;

  /* ---- redux ---- */
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  const AttendanceDataLoading = useSelector(
    (state) => state.formApi.AttendanceDataLoading
  );
  const Customisedcaptiondata = useSelector(
    (state) => state.formApi.CustomisedCaptionGetData
  );
  const rows = Array.isArray(AttendanceData) ? AttendanceData : [];

  /* ---- local state ---- */
  const [pageSize, setPageSize] = useState(31);
  const [footerHeight, setFooterHeight] = useState(60);
  const [proData, setproData] = useState(null);
  const [empData, setempData] = useState(null);
  const [classification, setClassification] = useState(null);

  const now = new Date();
  const currentMonthNumber = now.getMonth() + 1;
  const currentYear = now.getFullYear();
// Narrow variants for Month / Year
const monthSx = { ...fieldSx, width: 160 };
const yearSx = { ...fieldSx, width: 100 };
const flexFieldSx = { ...fieldSx, flex: "1 1 0", minWidth: 0, width: "auto" };
  const initialFilters = useMemo(
    () => ({
      attmonth: String(
        location.state?.Month ??
          readSession(prefix, "month") ??
          currentMonthNumber
      ),
      attyear: Number(
        location.state?.Year ?? readSession(prefix, "year") ?? currentYear
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefix, location.key]
  );

  /* ---- captions ---- */
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

  const captionArray = Array.isArray(Customisedcaptiondata)
    ? Customisedcaptiondata
    : Customisedcaptiondata?.data || [];

  const getBusinessCaption = (CaptionID, defaultCaption) =>
    captionArray.find((item) => item.CAPTIONID === CaptionID)?.CAPTION ||
    defaultCaption;

  /* ---- footer image height for the PDF ---- */
  useEffect(() => {
    if (!FooterImg) return;
    const img = new Image();
    img.onload = () => {
      const pageWidth = 595;
      const MAX_FOOTER_HEIGHT = 80;
      setFooterHeight(
        Math.min(pageWidth * (img.height / img.width), MAX_FOOTER_HEIGHT)
      );
    };
    img.src = `${baseurlUAAM}/uploads/images/${FooterImg}`;
  }, [FooterImg, baseurlUAAM]);

  /* ---- one place that builds the API payload (same shape in both modes) ---- */
  const buildPayload = ({ month, year, emp, pro, cls }) => ({
    Month: String(month ?? ""),
    Year: year ?? "",
    EmployeeID: emp?.RecordID ?? "",
    ProjectID: pro?.RecordID ?? "",
    ...(isClassMode ? { ClassificationID: cls?.RecordID ?? "" } : {}),
    CompanyID,
  });

  /* ---- (re)load whenever the mode changes, including same-component route swaps ---- */
  useEffect(() => {
    const pro = readSession(prefix, "project");
    const emp = readSession(prefix, "employee");
    const cls = isClassMode ? readSession(prefix, "classification") : null;

    setproData(pro);
    setempData(emp);
    setClassification(cls);

    dispatch(resetTrackingData());
    dispatch(
      Attendance({
        data: buildPayload({
          month: initialFilters.attmonth,
          year: initialFilters.attyear,
          emp,
          pro,
          cls,
        }),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  /* ---- handlers ---- */
  const fetchAttendance = (values, overrides = {}) =>
    dispatch(
      Attendance({
        data: buildPayload({
          month: values.attmonth,
          year: values.attyear,
          emp: empData,
          pro: proData,
          cls: classification,
          ...overrides,
        }),
      })
    );

  const handleSync = async (values) => {
    try {
      const res = await dispatch(AttendanceSyncGet({ CompanyID })).unwrap();
      if (res?.status === "success") {
        fetchAttendance(values);
      } else {
        toast.error(res?.message || "Sync failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Sync failed");
    }
  };

  const handleProjectChange = (a, b) => {
    const value = pickValue(a, b);
    setproData(value);
    writeSession(prefix, "project", value);
  };

  const handleEmployeeChange = (a, b) => {
    const value = pickValue(a, b);
    setempData(value);
    writeSession(prefix, "employee", value);
  };

  // The employee list depends on the classification, so a previously picked
  // employee may no longer be valid -> clear it.
  const handleClassificationChange = (a, b) => {
    const value = pickValue(a, b);
    setClassification(value);
    writeSession(prefix, "classification", value);
    setempData(null);
    writeSession(prefix, "employee", null);
  };

  const handleReset = (resetForm) => {
    ["month", "year", "project", "employee", "classification"].forEach((k) =>
      writeSession(prefix, k, null)
    );
    setproData(null);
    setempData(null);
    setClassification(null);
    resetForm({
      values: { attmonth: String(currentMonthNumber), attyear: currentYear },
    });
    dispatch(resetTrackingData());
  };

  const handleMore = (values) => {
    navigate("/Apps/TR217/EditAttendance/M", {
      state: { Month: values.attmonth, Year: values.attyear },
    });
  };

  const fnLogOut = (action) => {
    Swal.fire({
      title: defaultCloseTitles[action],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: action,
    }).then((result) => {
      if (!result.isConfirmed) return;
      if (action === "Logout") navigate("/");
      if (action === "Close") navigate("/Apps/TR217/EditAttendance");
    });
  };

  /* ---- employee lookup url (changes with project / classification) ---- */
  const employeeFilter = useMemo(() => {
    const conditions = [`CompanyID='${CompanyID}'`];

    if (proData?.RecordID) {
      conditions.push(`ProjectID='${proData.RecordID}'`);
    }

    if (isClassMode && classification?.RecordID) {
      conditions.push(`ClassificationID='${classification.RecordID}'`);
    }

    // GROUP BY must always be last
    return `${conditions.join(" AND ")} GROUP BY RecordID`;
  }, [CompanyID, proData, classification, isClassMode]);

  const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: proData ? "2024" : "2117",
        VerticalLicense: Subscriptionlastthree,
        ScreenName: "Employee",
        Filter: employeeFilter,
        Any: "",
        CompId: "",
      },
    })
  )}`;

  const classificationUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: "2209",
        ScreenName: "Classification",
        VerticalLicense: Subscriptionlastthree,
        Filter: `CompanyID='${CompanyID}'`,
        Any: "",
      },
    })
  )}`;

  const projectUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: "2054",
        ScreenName: "Project",
        VerticalLicense: Subscriptionlastthree,
        Filter: `parentID='${CompanyID}'`,
        Any: "",
      },
    })
  )}`;

  /* ---- grid columns (flex + minWidth: fills desktop, scrolls on mobile) ---- */
  const centered = { headerAlign: "center", align: "center" };
  const AttColumn = [
    {
      field: "slno",
      headerName: "SL#",
      width: 60,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      disableColumnMenu: true,
      valueGetter: (p) => p.api.getRowIndexRelativeToVisibleRows(p.id) + 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerAlign: "center",
      sortable: false,
      renderCell: (p) => {
        switch (getStatusType(p.row.Status)) {
          case "weekoff":
            return <AlarmOffIcon color="primary" titleAccess="Week Off" />;
          case "holiday":
            return <DeckIcon color="primary" titleAccess="Holiday" />;
          case "leave":
            return <ExitToAppIcon color="primary" titleAccess="Leave" />;
          default:
            return null;
        }
      },
    },
    { field: "MonthDate", headerName: "In Date", flex: 1, minWidth: 110, ...centered },
    { field: "EmployeeCheckInTime", headerName: "In Time", flex: 1, minWidth: 100, ...centered },
    { field: "EmployeeCheckOutTime", headerName: "Out Time", flex: 1, minWidth: 100, ...centered },
    { field: "NumberOfHoursWorked", headerName: "Worked Hours", flex: 1, minWidth: 120, ...centered },
    { field: "PermissionInMinutes", headerName: "Permission", flex: 1, minWidth: 110, ...centered },
    { field: "Status", headerName: "Status", flex: 1, minWidth: 120, headerAlign: "center" },
    { field: "Commend", headerName: "Comments", flex: 1, minWidth: 140, headerAlign: "center" },
  ];

  const filtersForExport = (values) => ({
    Month: values.attmonth,
    Year: values.attyear,
    EmployeeID: empData?.Name,
    Imageurl: baseurlUAAM,
    HeaderImg,
    FooterImg,
  });

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                */
  /* ---------------------------------------------------------------------- */
  return (
    <Box sx={{ height: "100vh", overflow: "auto", backgroundColor: "#F8F9FB" }}>
      <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
        {/* ---------- page header ---------- */}
        <Paper sx={{ borderRadius: 3, border: "1px solid #E5E7EB" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            p={{ xs: 1.5, sm: 2 }}
          >
            <Box display="flex" alignItems="center">
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
              <Typography
                sx={{
                  fontSize: { xs: 17, sm: 20 },
                  fontWeight: 700,
                  color: "#111827",
                  px: 1,
                }}
              >
                Monthly Attendance
              </Typography>
            </Box>
            <Box display="flex">
              <Tooltip title="Close">
                <IconButton onClick={() => fnLogOut("Close")} color="error">
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="error" onClick={() => fnLogOut("Logout")}>
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        {/* ---------- filter card + grid ---------- */}
        <Box sx={{ p: { xs: 0, sm: 1 }, pt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 3,
              p: { xs: 1.5, sm: 3 },
            }}
          >
            <Formik
              initialValues={initialFilters}
              enableReinitialize
              onSubmit={(values) => fetchAttendance(values)}
            >
              {({ values, handleSubmit, handleChange, handleBlur, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  {/* card heading */}
                  <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        borderRadius: "50%",
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: 18 }}>📋</Typography>
                    </Box>
                    <Box minWidth={0}>
                      <Typography variant="subtitle1" fontWeight={700} color="#0D9488">
                        Monthly Attendance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monthly Attendance Summary Report
                      </Typography>
                    </Box>
                   <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1.5,
                      ml: "auto", // Changed: Push the entire button group to the right
                      "& .MuiButton-root": {
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        flex: { xs: "1 1 40%", sm: "0 0 auto" },
                      },
                    }}
                  >
                    {!isClassMode && (
                      <Button
                        startIcon={<AutorenewIcon />}
                        onClick={() => handleSync(values)}
                        sx={{
                          backgroundColor: "#2971f5",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#085bd6" },
                        }}
                      >
                        Sync
                      </Button>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: "#0D9488", "&:hover": { bgcolor: "#0F766E" } }}
                    >
                      Apply
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => handleReset(resetForm)}
                    >
                      Reset
                    </Button>

                    {!isClassMode && is003Subscription && (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => handleMore(values)}
                        sx={{ bgcolor: "#2196f3", "&:hover": { bgcolor: "#0f8cf2" } }}
                      >
                        More
                      </Button>
                    )}

                    {isClassMode && (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => navigate(-1)}
                        sx={{ bgcolor: "#F97316", color: "#fff", "&:hover": { bgcolor: "#EA580C" } }}
                      >
                        Back
                      </Button>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        ml: { xs: 0, sm: 1 },
                      }}
                    >
                      {AttendanceDataLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        rows.length > 0 && (
                          <>
                            <PDFDownloadLink
                              document={
                                <AttendancePDF
                                  data={rows}
                                  filters={filtersForExport(values)}
                                  footerHeight={footerHeight}
                                />
                              }
                              fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
                              style={{ color: "#d32f2f", cursor: "pointer" }}
                            >
                              {({ loading }) => (
                                <PictureAsPdfIcon
                                  sx={{ fontSize: 24, opacity: loading ? 0.5 : 1 }}
                                />
                              )}
                            </PDFDownloadLink>

                            <FaFileExcel
                              size={20}
                              color="#1D6F42"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                MonthlyAttendanceExcel(rows, {
                                  month: values.attmonth,
                                  year: values.attyear,
                                  employee: empData?.Name,
                                })
                              }
                            />
                          </>
                        )
                      )}
                    </Box>
                  </Box>
                  </Box>

                  {/* filters: 1 col on phones, 2 on tablets, 3 on desktop, 4 on wide screens */}
                  {/* <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: {
                        xs: "minmax(0,1fr)",
                        sm: "repeat(2, minmax(0,1fr))",
                        md: "repeat(3, minmax(0,1fr))",
                        xl: "repeat(4, minmax(0,1fr))",
                      },
                    }}
                  > */}
                    {/* <TextField
                      select
                      size="small"
                      id="attmonth"
                      name="attmonth"
                      label="Month"
                      value={values.attmonth}
                      onChange={(e) => {
                        handleChange(e);
                        writeSession(prefix, "month", e.target.value);
                      }}
                      onBlur={handleBlur}
                      sx={fieldSx}
                    >
                      {MONTHS.map((name, i) => (
                        <MenuItem key={name} value={String(i + 1)}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      size="small"
                      type="number"
                      id="attyear"
                      name="attyear"
                      label="Year"
                      value={values.attyear}
                      inputProps={{ min: 1900, max: 2100, step: 1 }}
                      onChange={(e) => {
                        handleChange(e);
                        writeSession(prefix, "year", e.target.value);
                      }}
                      onBlur={handleBlur}
                      sx={fieldSx}
                    /> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <TextField
                      select
                      size="small"
                      id="attmonth"
                      name="attmonth"
                      label="Month"
                      value={values.attmonth}
                      onChange={(e) => {
                        handleChange(e);
                        writeSession(prefix, "month", e.target.value);
                      }}
                      onBlur={handleBlur}
                      sx={monthSx}
                    >
                      {MONTHS.map((name, i) => (
                        <MenuItem key={name} value={String(i + 1)}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      size="small"
                      type="number"
                      id="attyear"
                      name="attyear"
                      label="Year"
                      value={values.attyear}
                      inputProps={{ min: 1900, max: 2100, step: 1 }}
                      onChange={(e) => {
                        handleChange(e);
                        writeSession(prefix, "year", e.target.value);
                      }}
                      onBlur={handleBlur}
                      sx={yearSx}
                    />

                    {isClassMode && (
                      <TimeSheetEmployeeautocomplete
                        sx={flexFieldSx}
                        name="classification"
                        label="Classification"
                        id="classification"
                        value={classification}
                        onChange={handleClassificationChange}
                        url={classificationUrl}
                      />
                    )}

                    <TimeSheetEmployeeautocomplete
                      sx={flexFieldSx}
                      name="ProName"
                      label={getBusinessCaption("Project", "Project")}
                      id="ProName"
                      value={proData}
                      onChange={handleProjectChange}
                      url={projectUrl}
                    />

                    <TimeSheetEmployeeautocomplete
                      key={employeeUrl}
                      sx={flexFieldSx}
                      name="Employee"
                      label="Personnel"
                      id="Employee"
                      value={empData}
                      onChange={handleEmployeeChange}
                      url={employeeUrl}
                    />
                  </Box>
 {/* </Box> */}
                  {/* actions */}
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      gap: 1.5,
                      mt: 2,
                      "& .MuiButton-root": {
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        flex: { xs: "1 1 40%", sm: "0 0 auto" },
                      },
                    }}
                  >
                    {!isClassMode && (
                      <Button
                        startIcon={<AutorenewIcon />}
                        onClick={() => handleSync(values)}
                        sx={{
                          backgroundColor: "#2971f5",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#085bd6" },
                        }}
                      >
                        Sync
                      </Button>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: "#0D9488", "&:hover": { bgcolor: "#0F766E" } }}
                    >
                      Apply
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => handleReset(resetForm)}
                    >
                      Reset
                    </Button>

                    {!isClassMode && is003Subscription && (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => handleMore(values)}
                        sx={{ bgcolor: "#2196f3", "&:hover": { bgcolor: "#0f8cf2" } }}
                      >
                        More
                      </Button>
                    )}

                    {isClassMode && (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => navigate(-1)}
                        sx={{ bgcolor: "#F97316", color: "#fff", "&:hover": { bgcolor: "#EA580C" } }}
                      >
                        Back
                      </Button>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        ml: { xs: 0, sm: 1 },
                      }}
                    >
                      {AttendanceDataLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        rows.length > 0 && (
                          <>
                            <PDFDownloadLink
                              document={
                                <AttendancePDF
                                  data={rows}
                                  filters={filtersForExport(values)}
                                  footerHeight={footerHeight}
                                />
                              }
                              fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
                              style={{ color: "#d32f2f", cursor: "pointer" }}
                            >
                              {({ loading }) => (
                                <PictureAsPdfIcon
                                  sx={{ fontSize: 24, opacity: loading ? 0.5 : 1 }}
                                />
                              )}
                            </PDFDownloadLink>

                            <FaFileExcel
                              size={20}
                              color="#1D6F42"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                MonthlyAttendanceExcel(rows, {
                                  month: values.attmonth,
                                  year: values.attyear,
                                  employee: empData?.Name,
                                })
                              }
                            />
                          </>
                        )
                      )}
                    </Box>
                  </Box> */}

                  {/* grid */}
                  <Box
                    sx={{
                      mt: 2,
                      height: { xs: 420, md: 500 },
                      width: "100%",
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[800],
                      },
                      "& .MuiDataGrid-columnHeaderTitle": {
                        color: colors.blueAccent[900],
                        fontWeight: 600,
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                      },
                      "& .MuiDataGrid-footerContainer": {
                        backgroundColor: colors.blueAccent[800],
                        height: dataGridHeaderFooterHeight,
                        minHeight: dataGridHeaderFooterHeight,
                      },
                      "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectIcon, & .MuiTablePagination-actions button":
                        { color: "#fff" },
                      "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                      },
                      "& .even-row": { backgroundColor: "#d0edec" },
                      "& .weekoff-row": { backgroundColor: "#f2acb7", color: "#b71c1c" },
                      "& .holiday-row": { backgroundColor: "#c9f5cc", color: "#1b5e20" },
                      "& .leave-row": { backgroundColor: "#f3cd9b", color: "#a16a03" },
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={AttColumn}
                      getRowId={(row) => row.SLNO ?? row.MonthDate}
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      disableSelectionOnClick
                      pagination
                      pageSize={pageSize}
                      onPageSizeChange={(size) => setPageSize(size)}
                      rowsPerPageOptions={[5, 10, 20, 31]}
                      loading={AttendanceDataLoading}
                      components={{ Toolbar: AttendanceTool }}
                      componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                      getRowClassName={(p) => {
                        const type = getStatusType(p.row.Status);
                        if (type) return `${type}-row`;
                        return p.indexRelativeToCurrentPage % 2 === 0
                          ? "odd-row"
                          : "even-row";
                      }}
                    />
                  </Box>

                  {/* legend */}
                  <Box display="flex" flexWrap="wrap" gap={1.5} pt={2}>
                    <Chip
                      icon={<AlarmOffIcon color="primary" />}
                      label="Week Off"
                      variant="outlined"
                      sx={{ backgroundColor: "#f2acb7", borderColor: "#ef5350" }}
                    />
                    <Chip
                      icon={<DeckIcon color="primary" />}
                      label="Holiday"
                      variant="outlined"
                      sx={{ backgroundColor: "#c9f5cc", borderColor: "#66bb6a" }}
                    />
                    <Chip
                      icon={<ExitToAppIcon color="primary" />}
                      label="Leave"
                      variant="outlined"
                      sx={{ backgroundColor: "#f3cd9b", borderColor: "#a16a03" }}
                    />
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default EditAttendance;


//old - 14/10/26

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Paper,
//   Button,
//   IconButton,
//   Tooltip,
//   Stack,
//   useTheme,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Chip,
// } from "@mui/material";
// import AlarmOffIcon from "@mui/icons-material/AlarmOff";
// import DeckIcon from "@mui/icons-material/Deck";
// import {
//   dataGridHeaderFooterHeight,
//   dataGridHeight,
//   dataGridRowHeight,
//   formGap,
// } from "../../../ui-components/global/utils";
// import {
//   resetTrackingData,
//   Attendance,
//   AttendanceProcess,
//   paySlipGet,
//   CustomisedCaptionGet,
//   AttendanceSyncGet,
// } from "../../../store/reducers/Formapireducer";
// import CircularProgress from "@mui/material/CircularProgress";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
// import { Formik } from "formik";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { DataGrid } from "@mui/x-data-grid";
// import { useProSidebar } from "react-pro-sidebar";
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import { tokens } from "../../../Theme";
// import { useDispatch } from "react-redux";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import AttendancePDF from "../pdf/AttendancePdf";
// import { toast } from "react-hot-toast";
// import { Employeeautocomplete, TimeSheetEmployeeautocomplete } from "../../../ui-components/global/Autocomplete";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { useEffect } from "react";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { getConfig } from "../../../config";
// import { FaFileExcel } from "react-icons/fa";
// import MonthlyAttendanceExcel from "../pdf/MonthlyAttendanceExcel";
// import PayslipPdf from "../pdf/PaySlipPdf";
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// const EditAttendance = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   const params = useParams();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isManager = sessionStorage.getItem("isManager");
//   var recID = params.id;
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const EmpName = sessionStorage.getItem("EmpName");
//   const EmpId = sessionStorage.getItem("EmpId");
//   const CompanyID = sessionStorage.getItem("compID");
//   const listViewurl = useSelector((state) => state.globalurl.listViewurl);
// const [classification, setClassification] = useState(null);
//   const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
//   console.log("AttendanceData", AttendanceData);
//   const AttendanceDataLoading = useSelector((state) => state.formApi.AttendanceDataLoading)
//   const getLoading = useSelector((state) => state.formApi.AttendanceDataLoading);
//   //PAYSLIP
//   const paySlipdata = useSelector((state) => state.formApi.paySlipdata);
//   const paySliploading = useSelector((state) => state.formApi.paySliploading);
//   const data = useSelector((state) => state.formApi.Data);
//   const isLoading = useSelector((state) => state.formApi.loading);
//   const [page, setPage] = React.useState(0);
//   const [pageSize, setPageSize] = useState(31);
//   const [rowCount, setRowCount] = useState(0);
//   const [show, setScreen] = React.useState("0");
//   const [footerHeight, setFooterHeight] = useState(60);
//   const [isReady, setIsReady] = useState(false);
//   const EMPID = sessionStorage.getItem("EmpId");
//   const theme = useTheme();
//   const [loading, setLoading] = useState(false);
//   const colors = tokens(theme.palette.mode);
//   const [errorMsgData, setErrorMsgData] = useState(null);
//   const HeaderImg = sessionStorage.getItem("CompanyHeader");
//   const FooterImg = sessionStorage.getItem("CompanyFooter");
//   const CompanySignature = sessionStorage.getItem("CompanySignature");
//   console.log("🚀 ~ EditAttendance ~ CompanySignature:", CompanySignature)
//   console.log("HeaderImg", HeaderImg, FooterImg);
//   const config = getConfig();
//   const baseurlUAAM = config.UAAM_URL;
//   useEffect(() => {
//     if (!FooterImg) return;

//     const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

//     const img = new Image();
//     img.src = url;

//     img.onload = () => {
//       const aspectRatio = img.height / img.width;

//       const pageWidth = 595;
//       const MAX_FOOTER_HEIGHT = 80; // 🔥 IMPORTANT

//       const calculatedHeight = Math.min(
//         pageWidth * aspectRatio,
//         MAX_FOOTER_HEIGHT
//       );

//       setFooterHeight(calculatedHeight);
//       setIsReady(true);
//     };
//   }, [FooterImg]);
//     const handleClick = (values) => {
//     console.log(values.timemonth, "Month");
//     console.log(values.timeyear, "Year");

//     navigate("/Apps/TR217/EditAttendance/M", {
//       state: { Month: values.timemonth, Year: values.timeyear },
//     });
//   };
//   var accessID = params.accessID;
//   var mode = params.Mode;
//   const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
//   const lastThree = SubscriptionCode?.slice(-3) || "";
//   const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
//     ? lastThree
//     : "";
//   const is003Subscription = SubscriptionCode.endsWith("003");
//   useEffect(() => {
//     if (Subscriptionlastthree && accessID) {
//       dispatch(
//         CustomisedCaptionGet({
//           Vertical: Subscriptionlastthree,
//           AccessID: accessID,
//         })
//       );
//     }
//   }, [Subscriptionlastthree, accessID, dispatch]);
//   const Customisedcaptiondata = useSelector(
//     (state) => state.formApi.CustomisedCaptionGetData
//   );
//   // Ensure it's always an array
//   const captionArray = Array.isArray(Customisedcaptiondata)
//     ? Customisedcaptiondata
//     : Customisedcaptiondata?.data || [];
//   console.log(Customisedcaptiondata, captionArray, "Customisedcaptiondata");
//   const getBusinessCaption = (CaptionID, defaultCaption) => {
//     const match = captionArray?.find(
//       (item) => item.CAPTIONID === CaptionID
//     );

//     return match?.CAPTION || defaultCaption;
//   };
//   // useEffect(() => {
//   //   fetch(process.env.PUBLIC_URL + "/validationcms.json")
//   //     .then((res) => {
//   //       if (!res.ok) throw new Error("Failed to fetch validationcms.json");
//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       setErrorMsgData(data);
//   //     })
//   //     .catch((err) => console.error("Error loading validationcms.json:", err));
//   // }, []);
//   useEffect(() => {

//     const savedProData = sessionStorage.getItem("proData");
//     const savedEmpData = sessionStorage.getItem("empData");
//     const savedMonth = sessionStorage.getItem("attmonth");
//     const savedYear = Number(sessionStorage.getItem("attyear"));

//     const pro = savedProData ? JSON.parse(savedProData) : null;
//     const emp = savedEmpData ? JSON.parse(savedEmpData) : null;

//     const month = savedMonth || currentMonthNumber;
//     const year = savedYear || currentYear;

//     setproData(pro);
//     setempData(emp);

//     const data = {
//       Month: month,
//       Year: year,
//       EmployeeID: emp?.RecordID || "",
//       ProjectID: pro?.RecordID || "",
//       CompanyID
//     };

//     console.log("Dispatching Attendance on load:", data);

//     dispatch(Attendance({ data }));
//   }, [EMPID, dispatch]);


//   function AttendanceTool() {
//     return (
//       <GridToolbarContainer
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Typography>Attendance</Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <GridToolbarQuickFilter />
//         </Box>
//       </GridToolbarContainer>
//     );
//   }
//   const [proData, setproData] = useState(null);

//   const handleSelectionProjectChange = (newValue) => {
//     if (newValue) {
//       setproData(newValue);
//     } else {
//       setproData(null);
//     }
//   };
//    const handleSync = async (values) => {
//      const data = {
//       Month: values.attmonth?.toString() ?? "",
//       Year: values.attyear ?? "",
//       EmployeeID: useCurrentEmp
//         ? EMPID
//         : empData?.RecordID ?? "",
//       ProjectID: proData?.RecordID ?? "",
//       CompanyID

//     };
//     try {
//       const res = await dispatch(
//         AttendanceSyncGet({
//          CompanyID:CompanyID
//         })
//       ).unwrap();

//       if (res.status === "success") {
//            dispatch(Attendance({ data }));

//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const AttColumn = [
//     // {
//     //   field: "SLNO",
//     //   headerName: "SL#",
//     //   width:50
//     // },
//     // {
//     //   field: "slno",
//     //   headerName: "SL#",
//     //   width: 50,
//     //   sortable: false,
//     //   filterable: false,
//     //   valueGetter: (params) =>
//     //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
//     // },
//     {
//       field: "slno",
//       headerName: "SL#",
//       width: 60,
//       sortable: false,
//       filterable: false,
//       headerAlign: "center",
//       disableColumnMenu: true,
//       valueGetter: (params) => {
//         const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

//         const totalVisibleRows = params.api.getAllRowIds().length;
//         const totalAllRows = params.api.getRowsCount();

//         if (totalVisibleRows < totalAllRows) {
//           return index + 1;
//         } else {
//           return page * pageSize + index + 1;
//         }
//       },
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 60,
//       headerAlign: "center",
//       renderCell: (params) => {
//         if (params.row.Status === "Week Off") {
//           return <AlarmOffIcon color="primary" titleAccess="Week Off" />;
//         }
//         if (params.row.Status === "Holiday") {
//           return <DeckIcon color="primary" titleAccess="Holiday" />;
//         }
//         if (params.row.Status === "Casual Leave" || params.row.Status === "Sick leave" || params.row.Status === "Medical leave") {
//           return <ExitToAppIcon color="primary" titleAccess="Leave" />;
//         }
//         return null;
//       },
//     },
//     {
//       field: "MonthDate",
//       headerName: "In Date",
//       // flex: 1,
//       width: 130,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "EmployeeCheckInTime",
//       headerName: "In Time",
//       // flex: 1,
//       width: 130,
//       headerAlign: "center",
//       align: "center",
//     },
//     // {
//     //   field: "EmployeeCheckOutDate",
//     //   headerName: "Check Out Date",
//     //   flex: 1,
//     //   headerAlign: "center",
//     // },
//     {
//       field: "EmployeeCheckOutTime",
//       headerName: "Out Time",
//       // flex: 1,
//       width: 130,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "NumberOfHoursWorked",
//       headerName: "Worked Hours",
//       // flex: 1,
//       width: 130,
//       headerAlign: "center",
//       align: "center",

//     },
//     {
//       field: "PermissionInMinutes",
//       headerName: "Permission",
//       // headerName: "Permission (In Hours)",
//       // flex: 1,
//       width: 150,
//       headerAlign: "center",
//       align: "center",
//     },

//     {
//       field: "Status",
//       headerName: "Status",
//       // flex: 1,
//       width: 150,
//       headerAlign: "center",
//     },
//     {
//       field: "Commend",
//       headerName: "Comments",
//       width: 150,
//       headerAlign: "center",

//     },
//   ];

//   /***********Attendance ************/

//   const currentMonthNumber = new Date().getMonth() + 1;
//   const currentYear = new Date().getFullYear();
//   const AttInitialvalues = {
//     // code: data.Code,
//     // description: data.Name,
//     // Sal: data.Sal,
//     // month: currentMonthNumber,
//     // year: currentYear,
//     attmonth: sessionStorage.getItem("attmonth") || currentMonthNumber,
//     attyear: Number(sessionStorage.getItem("attyear")) || currentYear,

//   };
//   // const attendaceFnSave = async (values) => {
//   //   const data = {
//   //     Month: values.attmonth.toString(),
//   //     Year: values.attyear,
//   //     EmployeeID: useCurrentEmp ? EMPID : empData.RecordID,
//   //     // ProjectID: proData.RecordID
//   //     ProjectID: proData && proData.RecordID ? proData.RecordID : 0,
//   //     CompanyID
//   //   };
//   //   console.log(data, "=====DATA");
//   //   dispatch(Attendance({ data }));

//   //   // setButtonVisible(true)
//   // };
//   const attendaceFnSave = async (values) => {
//     const data = {
//       // Month: values.attmonth.toString(),
//       // Year: values.attyear,
//       // EmployeeID: useCurrentEmp ? EMPID : empData.RecordID,
//       // // ProjectID: proData.RecordID
//       // ProjectID: proData && proData.RecordID ? proData.RecordID : 0,
//       // CompanyID

//       Month: values.attmonth?.toString() ?? "",
//       Year: values.attyear ?? "",
//       EmployeeID: useCurrentEmp
//         ? EMPID
//         : empData?.RecordID ?? "",
//       ProjectID: proData?.RecordID ?? "",
//       ClassificationID: classification?.RecordID ?? "",
//       CompanyID

//     };
//     console.log(data, "=====DATA");
//     const response = await dispatch(Attendance({ data }));
//     // if (response.payload.Status === "Y") {
//     //   toast.success(response.payload.Msg);
//     // }
//     // else {
//     //   toast.error(response.payload.Msg);
//     // }
//     // const payslip = {
//     //   Month: values.attmonth?.toString() ?? "",
//     //   Finyear: values.attyear,
//     //   EmployeeID: empData?.RecordID || 0,
//     //   CompanyID
//     // }

//     // const paySlipResponse = await dispatch(paySlipGet(payslip))

//     // if (paySlipResponse.payload.Status === "Y") {
//     //   toast.success(paySlipResponse.payload.Message);
//     // }
//     // else {
//     //   toast.error(paySlipResponse.payload.Message);
//     // }
//     // setButtonVisible(true)
//   };

//   const exploreLoading = useSelector((state) => state.exploreApi.loading);

//   const fnLogOut = (props) => {
//     Swal.fire({
//       title: errorMsgData.Warningmsg[props],
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (props === "Logout") navigate("/");
//         if (props === "Close") navigate("/Apps/TR217/EditAttendance");
//       }
//     });
//   };
//   const [empData, setempData] = useState(null);

//   //PAYSLIP 

//   const handleSelectionEmployeeChange = (newValue) => {
//     if (newValue) {
//       setempData(newValue);
//       console.log(newValue.RecordID, "--selectedproductid");
//     } else {
//       setempData(null);
//     }
//     setUseCurrentEmp(false);
//   };

//   let employeeFilter = `CompanyID='${CompanyID}'`;
//   if (proData) {
//     employeeFilter += ` AND ProjectID='${proData.RecordID}' GROUP BY RecordID`;
//   }
//   if (!proData) {
//     employeeFilter = `CompanyID='${CompanyID}' GROUP BY RecordID`;
//   }
//   if(!proData && mode === "M") {
//     employeeFilter = `CompanyID='${CompanyID}' GROUP BY RecordID AND ClassificationID='${classification?.RecordID}'`;
//   }

//   const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
//     JSON.stringify({
//       Query: {
//         AccessID: proData ? "2024" : "2117", // or "2101" if you're using EMPLOYEETEAMS
//         VerticalLicense: Subscriptionlastthree,
//         ScreenName: "Employee",
//         Filter: employeeFilter,
//         Any: "",
//         CompId: "",
//       },
//     })
//   )}`;

//   console.log(proData, "--find proData");

//   const [useCurrentEmp, setUseCurrentEmp] = useState(false);



//   const handlePdfClick = () => {
//     navigate("/Apps/GSPdf");
//   };

//   return (
//     <React.Fragment>
//      <Box sx={{ height: "100vh", overflow: "auto" }}>
//               <Box sx={{ p: 1.5, backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
//                      <Paper sx={{ borderRadius: 3, border: "1px solid #E5E7EB" }}>
//         <Box display="flex" justifyContent="space-between" p={2}>
//           <Box display="flex" borderRadius="3px" alignItems="center">
//             {broken && !rtl && (
//               <IconButton onClick={() => toggleSidebar()}>
//                 <MenuOutlinedIcon />
//               </IconButton>
//             )}
//             <Typography 
//              sx={{
//                     fontSize: 20,
//                     fontWeight: 700,
//                     color: "#111827",
//                     // mb: 0.2,
//                     px: 1,
//                     py: 0.2,
//                   }}
//             >Monthly Attendance</Typography>
//           </Box>
//           <Box display="flex">
//             <Tooltip title="Close">
//               <IconButton onClick={() => fnLogOut("Close")} color="error">
//                 <ResetTvIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Logout">
//               <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                 <LogoutOutlinedIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>
//       </Paper>

//       <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
//                <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
//              <Paper elevation={0} sx={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 3, p: 3 }}>
//                <Formik
//           initialValues={AttInitialvalues}
//           enableReinitialize={true}
//           onSubmit={(values, { resetForm }) => {
//             setTimeout(() => {
//               attendaceFnSave(values, resetForm);
//             }, 100);
//           }}
//         >
//           {({
//             errors,
//             touched,
//             handleBlur,
//             handleChange,
//             isSubmitting,
//             values,
//             handleSubmit,
//             resetForm,
//             setFieldValue
//           }) => (
//             <form
//               onSubmit={handleSubmit}
//               onReset={() => {
//                 resetForm();
//                 setproData(null);
//                 setempData(null);
//                 setFieldValue("attmonth", currentMonthNumber)
//                 setFieldValue("attyear", currentYear)
//                 sessionStorage.removeItem("attmonth");
//                 sessionStorage.removeItem("attyear");
//                 sessionStorage.removeItem("empData");
//                 sessionStorage.removeItem("proData");
//                 dispatch(resetTrackingData());
//               }}
//             >

//                   {/* ----- CARD HEADER ----- */}
//                                                               <Box
//                               display="flex"
//                               alignItems="center"
//                               gap={1.5}
//                               mb={1}
//                               // sx={{ px: 2, pt: 2 }}
//                             >
//                               {/* ICON */}
//                               <Box
//                                 sx={{
//                                   width: 36,
//                                   height: 36,
//                                   borderRadius: "50%",
//                                   backgroundColor: "#EFF6FF",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 <Typography sx={{ fontSize: 18 }}>
//                                  📋
//                                 </Typography>
//                               </Box>
                            
//                               {/* TITLE + SUBTITLE */}
//                               <Box>
//                                 <Typography
//                                   variant="subtitle1"
//                                   fontWeight={700}
//                                   color="#0D94885"
//                                 >
//                                   Monthly Attendance
//                                 </Typography>
                            
//                                 <Typography variant="body2" color="text.secondary">
//                                  Monthly Attendance Summary Report
//                                 </Typography>
//                               </Box>
//                             </Box>


//               <Box
//                 display="grid"
//                 gridTemplateColumns="repeat(2 , minMax(0,1fr))"
//                 gap={formGap}
//                 padding={1}
//                 sx={{
//                   "& > div": {
//                     gridColumn: isNonMobile ? undefined : "span 4",
//                   },
//                 }}
//               >
//                 <Stack direction="row" spacing={2}>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     type="text"
//                     id="attmonth"
//                     name="attmonth"
//                     label="Month"
//                     value={values.attmonth}
//                     focused
//                     // onChange={handleChange}
//                     onChange={(e) => {
//                       handleChange(e);
//                       sessionStorage.setItem("attmonth", e.target.value);
//                     }}
//                     onBlur={handleBlur}
//                     select
//                     sx={{
//                        "& .MuiOutlinedInput-root": {
//       backgroundColor: "#fff",
//       borderRadius: "6px",

//       "& fieldset": {
//         borderColor: "#d1d5db", // 👈 light grey border
//       },
//       "&:hover fieldset": {
//         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//         borderWidth: "1px",
//       },
//     },

//     "& .MuiInputLabel-root": {
//       color: "#6b7280", // label grey
//     },
//     "& .MuiInputLabel-root.Mui-focused": {
//       color: "#6b7280", // keep same on focus
//     },
//                       width: 200,
//                     }}
//                   >
//                     <MenuItem value={"1"}>January</MenuItem>
//                     <MenuItem value={"2"}>February</MenuItem>
//                     <MenuItem value={"3"}>March</MenuItem>
//                     <MenuItem value={"4"}>April</MenuItem>
//                     <MenuItem value={"5"}>May</MenuItem>
//                     <MenuItem value={"6"}>June</MenuItem>
//                     <MenuItem value={"7"}>July</MenuItem>
//                     <MenuItem value={"8"}>August</MenuItem>
//                     <MenuItem value={"9"}>September</MenuItem>
//                     <MenuItem value={"10"}>October</MenuItem>
//                     <MenuItem value={"11"}>November</MenuItem>
//                     <MenuItem value={"12"}>December</MenuItem>
//                   </TextField>

//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     type="number"
//                     id="attyear"
//                     name="attyear"
//                     label="Year"
//                     value={values.attyear}
//                     inputProps={{ min: "1900", max: "2100", step: "1" }}
//                     focused
//                     // onChange={handleChange}
//                     onChange={(e) => {
//                       handleChange(e);
//                       sessionStorage.setItem("attyear", e.target.value);
//                     }}
//                     onBlur={handleBlur}
//                     sx={{
//                        "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#fff",
//                       borderRadius: "6px",

//                       "& fieldset": {
//                         borderColor: "#d1d5db", // 👈 light grey border
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                         borderWidth: "1px",
//                       },
//                     },

//                     "& .MuiInputLabel-root": {
//                       color: "#6b7280", // label grey
//                     },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#6b7280", // keep same on focus
//                     },
//                       width: 200,
//                     }}
//                   />
//                  {mode === "M" && (
//                         <TimeSheetEmployeeautocomplete
//                         sx={{
//                             width: "100%",
//                             "& .MuiOutlinedInput-root": {
//                                 borderRadius: "10px",
//                                 backgroundColor: "#fff",
//                                 minHeight: "40px",
//                             },
//                             "& .MuiInputLabel-root": {
//                                 fontSize: "14px",
//                             },
//                         }}
//                         name="classification"
//                         label="Classification"
//                         id="classification"
//                         value={values.classification}
//                         onChange={(e, newValue) => {
//                           setClassification(newValue)
//                             setFieldValue(
//                                 "classification",
//                                 newValue,
//                                 true,
//                             )
//                         }}
//                         url={`${listViewurl}?data=${JSON.stringify(
//                             {
//                                 Query: {
//                                     AccessID: "2209",
//                                     ScreenName: "Classification",
//                                     VerticalLicense:
//                                         Subscriptionlastthree,
//                                         Filter: `CompanyID=${CompanyID}`,                      
//                                     // Filter: `CompanyID=${CompanyID} AND Name <> 'Student'`,
//                                     Any: "",
//                                 },
//                             },
//                         )}`}
//                     />
//                       )}
//                   {/* <Employeeautocomplete */}
//                   <TimeSheetEmployeeautocomplete
//                     sx={{ 
//                       width: 400,
//                   "& .MuiOutlinedInput-root": {
//                         backgroundColor: "#fff",
//                         borderRadius: "6px",

//                         "& fieldset": {
//                           borderColor: "#d1d5db", // 👈 light grey border
//                         },
//                         "&:hover fieldset": {
//                           borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                           borderWidth: "1px",
//                         },
//                       },

//                       "& .MuiInputLabel-root": {
//                         color: "#6b7280", // label grey
//                       },
//                       "& .MuiInputLabel-root.Mui-focused": {
//                         color: "#6b7280", // keep same on focus
//                       },
//                      }}
//                     name="ProName"
//                     label={getBusinessCaption("Project", "Project")}
//                     id="ProName"
//                     value={proData}
//                     // onChange={handleSelectionProjectChange}
//                     onChange={(newValue) => {
//                       setproData(newValue);
//                       if (newValue)
//                         sessionStorage.setItem("proData", JSON.stringify(newValue));
//                       else
//                         sessionStorage.removeItem("proData");
//                     }}
//                     error={!!touched.ProName && !!errors.ProName}
//                     helperText={touched.ProName && errors.ProName}
//                     // url={`${listViewurl}?data=${encodeURIComponent(
//                     //   JSON.stringify({
//                     //     Query: {
//                     //       AccessID: "2054",
//                     //       ScreenName: "Project",
//                     //       Filter: `parentID=${CompanyID}`,
//                     //       Any: "",
//                     //     },
//                     //   })
//                     // )}`}
//                     url={`${listViewurl}?data=${JSON.stringify({
//                       Query: {
//                         AccessID: "2054",
//                         ScreenName: "Project",
//                         VerticalLicense: Subscriptionlastthree,
//                         Filter: `parentID='${CompanyID}'`,
//                         Any: "",
//                       },
//                     })}`}
//                   />

//                   {/* <Employeeautocomplete */}
//                   <TimeSheetEmployeeautocomplete
//                     sx={{ width: 400,
//                        "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#fff",
//                       borderRadius: "6px",

//                       "& fieldset": {
//                         borderColor: "#d1d5db", // 👈 light grey border
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                         borderWidth: "1px",
//                       },
//                     },

//                     "& .MuiInputLabel-root": {
//                       color: "#6b7280", // label grey
//                     },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                       color: "#6b7280", // keep same on focus
//                     },

//                      }}
//                     name="Employee"
//                     label="Personnel"
//                     id="Employee"
//                     value={empData}
//                     // onChange={handleSelectionEmployeeChange}
//                     onChange={(newValue) => {
//                       setempData(newValue);
//                       if (newValue)
//                         sessionStorage.setItem("empData", JSON.stringify(newValue));
//                       else
//                         sessionStorage.removeItem("empData");
//                     }}
//                     url={employeeUrl}
//                   />

                  
//                 </Stack>
//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   display="flex"
//                   padding={1}
//                   justifyContent="end"
//                 >
//                   {/* <PDFDownloadLink
//                     document={<PayslipPdf data={paySlipdata}
//                       filters={{
//                         Imageurl: baseurlUAAM,
//                         HeaderImg: HeaderImg,
//                         CompanySignature: CompanySignature,
//                       }}
//                     />}
//                     fileName="payslip.pdf"
//                     style={{ textDecoration: "none" }}
//                   >
//                     <Button
//                       variant="contained"
//                       color="success"
//                       startIcon={<FileDownloadOutlinedIcon />}
//                     // disabled={loading}
//                     >
//                       Payslip
//                     </Button>

//                   </PDFDownloadLink> */}
//                    {mode != "M" && (
//                   <Button
//                   startIcon={<AutorenewIcon />}
//                   // onClick={() =>
//                   //   dispatch(
//                   //     PartySync({
//                   //       accessid: "TR321",
//                   //       action: "sync",
//                   //     })
//                   //   )
//                   // }
//                   onClick={()=>handleSync(values)}
//                   sx={{
//                     backgroundColor: "#2971f5",
//                     color: "#fff",
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: "none",
//                     "&:hover": {
//                       backgroundColor: "#085bd6",
//                     },
//                   }}
//                 >
//                   Sync
//                 </Button>
//                    )}
//                   <Button 
//                   type="submit" 
//                   variant="contained" 
//                   sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 4,
//                         bgcolor: "#0D9488",
//                         "&:hover": {
//                           bgcolor: "#0F766E",
//                         },
//                       }}
//                   >
//                     Apply
//                   </Button>
//                   <Button 
//                   type="reset" 
//                   variant="contained" 
//                   color="error"
//                   sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 4,
//                         // bgcolor: "#0D9488",
//                         // "&:hover": {
//                         //   bgcolor: "#0F766E",
//                         // },
//                       }}
//                   >
//                     Reset
//                   </Button>
//                   {mode != "M" && is003Subscription && (
//                   <Button
//                     type="reset"
//                     variant="contained"
//                     // color="error"
//                      sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 4,
//                         bgcolor: "#2196f3",
//                         "&:hover": {
//                           bgcolor: "#0f8cf2",
//                         },
//                       }}
//                     // sx={{ color: "white", backgroundColor: "#2196f3" }}
//                     // style={{ color: "#2196f3"}}
//                     size="small"
//                     onClick={() => handleClick(values)}
//                   >
//                     More
//                   </Button>
                  
//                   )}
//                   {mode === "M" && (
//                   <Button
//                       variant="contained"
//                       onClick={() => navigate(-1)}
//                       sx={{
//                         px: 4,
//                         borderRadius: 2,
//                         textTransform: "none",
//                         bgcolor: "#F97316",
//                         color: "#fff",
//                         "&:hover": {
//                           bgcolor: "#EA580C",
//                         },
//                       }}
//                     >
//                       Back
//                     </Button>
//                   )}
//                   {AttendanceDataLoading ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     AttendanceData?.length > 0 && (
//                       <>
//                         <PDFDownloadLink
//                           document={
//                             <AttendancePDF
//                               data={AttendanceData}
//                               filters={{
//                                 Month: values.attmonth,
//                                 Year: values.attyear,
//                                 EmployeeID: empData?.Name,
//                                 Imageurl: baseurlUAAM,
//                                 HeaderImg: HeaderImg,
//                                 FooterImg: FooterImg,
//                               }}
//                               footerHeight={footerHeight}
//                             />
//                           }
//                           fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
//                           style={{ color: "#d32f2f", cursor: "pointer" }}
//                         >
//                           {({ loading }) =>
//                             loading ? (
//                               <PictureAsPdfIcon
//                                 sx={{ fontSize: 24, opacity: 0.5 }}
//                               />
//                             ) : (
//                               <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                             )
//                           }
//                         </PDFDownloadLink>

//                         <FaFileExcel
//                           size={20}
//                           color="#1D6F42"
//                           style={{ cursor: "pointer" }}
//                           onClick={() =>
//                             MonthlyAttendanceExcel(AttendanceData, {
//                               month: values.attmonth,
//                               year: values.attyear,
//                               employee: empData?.Name,
//                             })
//                           }
//                         />
//                       </>
//                     )
//                   )}
//                   {/* {AttendanceData?.length > 0 && (
//                     <PDFDownloadLink
//                       document={
//                         <AttendancePDF
//                           data={AttendanceData}
//                           filters={{
//                             Month: values.attmonth,
//                             Year: values.attyear,
//                             EmployeeID: empData?.Name,
//                             Imageurl: baseurlUAAM,
//                             HeaderImg: HeaderImg,
//                             FooterImg: FooterImg,
//                           }}
//                           footerHeight={footerHeight}
//                         />
//                       }
//                       fileName={`Attendance_Report_${empData?.Name || "Employee"
//                         }.pdf`}
//                       style={{ color: "#d32f2f", cursor: "pointer" }}
//                     >
//                       {({ loading }) =>
//                         loading ? (
//                           <PictureAsPdfIcon
//                             sx={{ fontSize: 24, opacity: 0.5 }}
//                           />
//                         ) : (
//                           <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                         )
//                       }
//                     </PDFDownloadLink>
//                   )}
//                   {AttendanceData?.length > 0 && (
//                     <FaFileExcel
//                       size={20}
//                       color="#1D6F42"
//                       style={{ cursor: "pointer" }}
//                       onClick={() =>
//                         MonthlyAttendanceExcel(
//                           AttendanceData,
//                           {
//                             month: values.attmonth,   // ✅ match Excel.jsx
//                             year: values.attyear,     // ✅ match Excel.jsx
//                             employee: empData?.Name   // ✅ match Excel.jsx
//                           }
//                         )
//                       }
//                     />
//                     //  <FaFileExcel
//                     //     size={20}
//                     //     color="#1D6F42"
//                     //     style={{ cursor: "pointer", }}
//                     //     onClick={() =>
//                     //     MonthlyAttendanceExcel(
//                     //         AttendanceData,
//                     //         {
//                     //          Month: values.attmonth,
//                     //          Year: values.attyear,
//                     //          EmployeeID: empData?.Name, 
//                     //         },
//                     //         empData
//                     //       )
//                     //     }
//                     //   />

//                   )} */}

//                   {/* //For SOP PDF */}
//                   {/* <Tooltip title="View PDF">
//                     <IconButton onClick={handlePdfClick}>
//                       <PictureAsPdfIcon sx={{ fontSize: 24, color: "#d32f2f" }} />
//                     </IconButton>
//                   </Tooltip> */}


//                 </Stack>
//               </Box>
//               <Box sx={{ gridColumn: "span 4" }}>
//                 <Box
//                   // padding={1}
//                   height="500px"
//                   // height={dataGridHeight}
//                   marginTop={2}
//                   sx={{
//                     "& .MuiDataGrid-root": {
//                       // border: "none",
//                     },
//                     "& .MuiDataGrid-cell": {
//                       // borderBottom: "none",
//                     },
//                     "& .name-column--cell": {
//                       color: colors.greenAccent[300],
//                     },
//                     "& .MuiDataGrid-columnHeaders": {
//                       backgroundColor: colors.blueAccent[800],
//                       // borderBottom: "none",
//                     },
//                     "& .MuiDataGrid-virtualScroller": {
//                       backgroundColor: colors.primary[400],
//                     },
//                     "& .MuiDataGrid-footerContainer": {
//                       // borderTop: "none",
//                       backgroundColor: colors.blueAccent[800],
//                     },
//                     "& .MuiCheckbox-root": {
//                       color: `${colors.greenAccent[200]} !important`,
//                     },
//                     "& .odd-row": {
//                       backgroundColor: "",
//                       color: "", // Color for odd rows
//                     },
//                     "& .even-row": {
//                       backgroundColor: "#d0edec",
//                       color: "", // Color for even rows
//                     },
//                     "& .weekoff-row": {
//                       backgroundColor: "#f2acb7", // light red
//                       color: "#b71c1c", // dark red text
//                     },
//                     "& .holiday-row": {
//                       backgroundColor: "#c9f5cc", // light green
//                       color: "#1b5e20", // dark green text
//                     },
//                     "& .leave-row": {
//                       backgroundColor: "#f3cd9b", // light green
//                       color: "#a16a03", // dark green text
//                     },
//                     "& .MuiDataGrid-columnHeaderTitle": {
//                               color: colors.blueAccent[900],
//                               fontWeight: 600,
//                             },
//                             "& .MuiTablePagination-root": {
//                               color: colors.blueAccent[900],
//                             },
//                             /* ✅ PAGINATION STYLES (WHITE COLOR) */
//                             "& .MuiTablePagination-root": {
//                               color: "#fff",
//                             },

//                             "& .MuiTablePagination-selectLabel": {
//                               color: "#fff",
//                             },

//                             "& .MuiTablePagination-displayedRows": {
//                               color: "#fff",
//                             },

//                             /* Dropdown icon */
//                             "& .MuiTablePagination-selectIcon": {
//                               color: "#fff",
//                             },

//                             /* Left & Right arrow buttons */
//                             "& .MuiTablePagination-actions button": {
//                               color: "#fff",
//                             },
//                   }}
//                 >
//                   <DataGrid
//                     sx={{
//                       "& .MuiDataGrid-footerContainer": {
//                         height: dataGridHeaderFooterHeight,
//                         minHeight: dataGridHeaderFooterHeight,
//                       },
//                     }}
//                     rowHeight={dataGridRowHeight}
//                     headerHeight={dataGridHeaderFooterHeight}
//                     rows={AttendanceData}
//                     columns={AttColumn}
//                     disableSelectionOnClick
//                     getRowId={(row) => row.SLNO}
//                     pageSize={pageSize}
//                     page={page}
//                     onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                     onPageChange={(newPage) => setPage(newPage)}
//                     onCellClick={(params) => { }}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     pagination
//                     components={{
//                       Toolbar: AttendanceTool,
//                     }}
//                     onStateChange={(stateParams) =>
//                       setRowCount(stateParams.pagination.rowCount)
//                     }
//                     loading={getLoading}
//                     componentsProps={{
//                       toolbar: {
//                         showQuickFilter: true,
//                         quickFilterProps: { debounceMs: 500 },
//                       },
//                     }}
//                     // getRowClassName={(params) =>
//                     //   params.indexRelativeToCurrentPage % 2 === 0
//                     //     ? "odd-row"
//                     //     : "even-row"
//                     // }
//                     // getRowClassName={(params) => {
//                     //   const status = params.row.Status;
//                     //   if (status === "WeekOff") return "weekoff-row";
//                     //   if (status === "Holiday") return "holiday-row";
//                     //   if (status === "Casual Leave" || status === "Sick leave" || status === "Medical leave") return "leave-row";
//                     //   return params.indexRelativeToCurrentPage % 2 === 0
//                     //     ? "odd-row"
//                     //     : "even-row";
//                     // }}
//                     getRowClassName={(params) => {
//                       const status = params.row.Status;
//                       if (status === "Week Off") return "weekoff-row";
//                       if (status === "Holiday") return "holiday-row";
//                       // if (status === "Casual leave" || status === "Sick leave" || status === "Medical leave") return "leave-row";
//                       const leaveStatuses = [
//                         "casual leave",
//                         "sick leave",
//                         "medical leave",
//                       ];

//                       if (leaveStatuses.includes(status?.trim().toLowerCase())) {
//                         return "leave-row";
//                       }

//                       return params.indexRelativeToCurrentPage % 2 === 0
//                         ? "odd-row"
//                         : "even-row";
//                     }}
//                   />
//                 </Box>
//                 <Box
//                   display="flex"
//                   flexDirection="row"
//                   padding="15px"
//                   gap={formGap}
//                 >
//                   <Chip
//                     icon={<AlarmOffIcon color="primary" />}
//                     label="Week Off"
//                     variant="outlined"
//                     sx={{
//                       backgroundColor: "#f2acb7",
//                       borderColor: "#ef5350",
//                     }}
//                   />
//                   <Chip
//                     icon={<DeckIcon color="primary" />}
//                     label="Holiday"
//                     variant="outlined"
//                     sx={{
//                       backgroundColor: "#c9f5cc",
//                       borderColor: "#66bb6a",
//                     }}
//                   />
//                   <Chip
//                     icon={<ExitToAppIcon color="primary" />}
//                     label="Leave"
//                     variant="outlined"
//                     sx={{ backgroundColor: "#f3cd9b", borderColor: "#a16a03", }}
//                   />
//                 </Box>
//               </Box>
//             </form>
//           )}
//         </Formik>
//       </Paper>
//           </Box>
//                         </Box>
//                             </Box>
//                                           </Box>
//     </React.Fragment>
//   );
// };

// export default EditAttendance;
