import { useEffect, useState } from "react";
import {
  Button, IconButton, Typography, Box, Tooltip,
  Paper, useMediaQuery, Breadcrumbs,
} from "@mui/material";
import { Formik } from "formik";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useProSidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { formGap } from "../../../ui-components/utils";
import {
  CheckinAutocomplete,
  MultiFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import { NonTeacherOccupancyget, TeacherOccupancyget } from "../../../store/reducers/Formapireducer";
import TeacherOccupancyPDF from "../pdf/TeacherOccupancyPDF";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getConfig } from "../../../config";
import NonTeacherOccupancyPDF from "../pdf/NonTeacherOccupancyReport";

// ─── COLOUR PALETTE ───────────────────────────────────────────────────────────
const SUBJECT_COLORS = [
  { bg: "#FFFBEB", border: "#F59E0B", text: "#92400E" },
  { bg: "#FDF2F8", border: "#EC4899", text: "#9D174D" },
  { bg: "#EEF2FF", border: "#6366F1", text: "#3730A3" },
  { bg: "#ECFDF5", border: "#10B981", text: "#065F46" },
  { bg: "#EFF6FF", border: "#3B82F6", text: "#1E40AF" },
  { bg: "#FEF9C3", border: "#EAB308", text: "#713F12" },
  { bg: "#FFF1F2", border: "#F43F5E", text: "#9F1239" },
  { bg: "#F0FDF4", border: "#22C55E", text: "#14532D" },
];

const getSubjectColor = (text) => {
  if (!text) return null;
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
  return SUBJECT_COLORS[Math.abs(hash) % SUBJECT_COLORS.length];
};

const parseTime = (t) => {
  if (!t) return 0;
  const parts = t.trim().split(" ");
  const ampm = parts[1];
  let [h, m] = parts[0].split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
};

// ─── SUBJECT CELL ─────────────────────────────────────────────────────────────
const SubjectCell = ({ text }) => {
  if (!text) return (
    <Box sx={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Box sx={{ width: 20, height: 1.5, background: "#E2E8F0", borderRadius: 1 }} />
    </Box>
  );
  const col = getSubjectColor(text);
  const match = text.match(/^(.*?)\s*\(\s*(.*?)\s*\)$/);
  const gradePart = match ? match[1].trim() : text;
  const subjectPart = match ? match[2].trim() : "";
  return (
    <Box sx={{
      width: "100%",
      background: col.bg,
      borderLeft: `4px solid ${col.border}`,
      borderRadius: "6px",
      px: "8px", py: "6px",
      display: "flex", flexDirection: "column",
      justifyContent: "center", gap: "2px",
    }}>
      {subjectPart && (
        <Typography sx={{ fontSize: "11px", fontWeight: 700, color: col.text, lineHeight: 1.3 }}>
          {subjectPart}
        </Typography>
      )}
      <Typography sx={{ fontSize: "10px", color: col.border, lineHeight: 1.2, fontWeight: 600 }}>
        {gradePart}
      </Typography>
    </Box>
  );
};

// ─── SINGLE TEACHER TIMETABLE ─────────────────────────────────────────────────
// Days = rows | Period slots = columns (breaks excluded)
// Column headers show: Period label + full "fromTime - toTime"
const TeacherTimetable = ({ Staff, summary }) => {
  // const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const { timeSlots, BreakSlots, BreakSlotsList, schedule } = Staff;
  const DAYS = schedule.map((s) => s.day);
  // Only period slots (exclude break/assembly/lunch/activity)
  const breakTexts = new Set(BreakSlotsList.map((b) => b.SlotText));
  const periodSlots = [...timeSlots]
    .filter((s) => !breakTexts.has(s))
    .sort((a, b) => parseTime(a.split(" - ")[0]) - parseTime(b.split(" - ")[0]));


  const dayMap = {};
  schedule.forEach((d) => { dayMap[d.day] = d.slots; });

  // Day column: fixed width. Period columns: flex:1 to fill the full container width.
  const DAY_COL_W = 80; // px

  return (
    <Box sx={{
      mb: 3,
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #E2E8F0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    }}>
      {/* ── Teacher header ── */}
      <Box sx={{
        background: "linear-gradient(135deg, #1e1e3a 0%, #2d2d5e 100%)",
        px: 3, py: "12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 1,
      }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>
            {Staff.StaffName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </Box>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              {Staff.StaffName}
            </Typography>
            {summary && (
              <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.3 }}>
                {summary.Activities}
              </Typography>
            )}
          </Box>
        </Box>

        {summary && (
          <Box display="flex" gap={1} flexWrap="wrap">
            {[
              { label: "Total", value: summary.TotalHours, color: "#94A3B8" },
              { label: "Occupied", value: summary.OccupiedHours, color: "#FB923C" },
              { label: "Free", value: summary.FreeHours, color: "#4ADE80" },
            ].map(({ label, value, color }) => (
              <Box key={label} sx={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px", px: "14px", py: "5px", textAlign: "center",
              }}>
                <Typography sx={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 700, color }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* ── Grid ── */}
      {/* No overflowX scroll — let columns flex to fill 100% width naturally */}
      <Box sx={{ background: "#fff", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

          {/* ── Column header row ── */}
          <Box sx={{
            display: "flex",
            borderBottomColor: "#E2E8F0",
            background: "#F8FAFC",
            width: "100%"
          }}>
            {/* Corner: "Day" label */}
            <Box sx={{
              width: DAY_COL_W,
              minWidth: DAY_COL_W,
              flexShrink: 0,
              borderRight: "1px solid #E2E8F0",
              px: "10px", py: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.06em" }}>
                Day
              </Typography>
            </Box>

            {/* Period column headers — flex:1 each so they fill all remaining width equally */}
            {periodSlots.map((slotKey, idx) => {
              const periodLabel = BreakSlots?.[slotKey] || `P${idx + 1}`;
              const [fromTime, toTime] = slotKey.split(" - ");
              return (
                <Box
                  key={slotKey}
                  sx={{
                    flex: 1,                         // fills remaining width equally
                    minWidth: 0,                     // allows flex to shrink below content
                    borderRight: "1px solid #E2E8F0",
                    px: "6px", py: "8px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  {/* Period label e.g. "Period 1" */}
                  <Typography sx={{
                    fontSize: "11px", fontWeight: 800,
                    color: "#1e1e3a", letterSpacing: "0.04em",
                    lineHeight: 1.2,
                  }}>
                    {periodLabel}
                  </Typography>
                  {/* Full time range e.g. "9:15 AM - 10:00 AM" */}
                  <Typography sx={{
                    fontSize: "10px", color: "#000",
                    lineHeight: 1.2, fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}>
                    {fromTime} — {toTime}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* ── Day rows ── */}
          {DAYS.map((day, dayIdx) => (
            <Box
              key={day}
              sx={{
                display: "flex",
                borderBottom: dayIdx === DAYS.length - 1 ? "none" : "1px solid #F1F5F9",
                minHeight: 64,
                background: dayIdx % 2 === 0 ? "#fff" : "#FAFBFF",
                width: "100%",
              }}
            >
              {/* Day name cell */}
              <Box sx={{
                width: DAY_COL_W,
                minWidth: DAY_COL_W,
                flexShrink: 0,
                borderRight: "1px solid #E2E8F0",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dayIdx % 2 === 0 ? "#F8FAFC" : "#F1F5F9",
              }}>
                <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
                  {day.slice(0, 3)}
                </Typography>
              </Box>

              {/* Subject cells — flex:1 each, matching header columns */}
              {periodSlots.map((slotKey, slotIdx) => {
                const cellText = dayMap[day]?.[slotKey] ?? "";
                return (
                  <Box
                    key={slotKey}
                    sx={{
                      flex: 1,                       // ✅ matches header flex:1
                      minWidth: 0,
                      borderRight: "1px solid #F1F5F9",
                      p: "6px 8px",
                      display: "flex",
                      alignItems: "center",
                      "&:last-child": { borderRight: "none" },
                    }}
                  >
                    <SubjectCell text={cellText} />
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Subject legend ── */}
      {summary?.SubjectStandardDetails?.length > 0 && (
        <Box sx={{
          px: 2, py: "10px",
          borderTop: "1px solid #E2E8F0",
          background: "#F8FAFC",
          display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center",
        }}>
          <Typography sx={{ fontSize: "11px", color: "#94A3B8", fontWeight: 700, letterSpacing: "0.06em", mr: 0.5 }}>
            Subjects:
          </Typography>
          {summary.SubjectStandardDetails.map((s) => {
            const col = getSubjectColor(s.SubjectName);
            return (
              <Box key={s.SubjectName} sx={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: col.bg,
                border: `1px solid ${col.border}`,
                borderRadius: "20px", px: "10px", py: "3px",
              }}>
                <Typography sx={{ fontSize: "11px", fontWeight: 700, color: col.text }}>
                  {s.SubjectName}
                </Typography>
                <Typography sx={{ fontSize: "10px", color: col.border, fontWeight: 500 }}>
                  {s.Standards}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const NonTeacherOccupancy = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);

  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const is003Subscription = SubscriptionCode.endsWith("003");
  const sliceSubcriptionCode = SubscriptionCode.slice(-3);
  const companyId = sessionStorage.getItem("compID");

  const [apiData, setApiData] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [footerHeight, setFooterHeight] = useState(60);
  const [isReady, setIsReady] = useState(false);
  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  console.log("HeaderImg:", HeaderImg);
  const FooterImg = sessionStorage.getItem("CompanyFooter");
  const config = getConfig();
  const baseurlUAAM = config.UAAM_URL;
  useEffect(() => {
    if (!FooterImg) return;

    const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      const aspectRatio = img.height / img.width;

      const pageWidth = 595;
      const MAX_FOOTER_HEIGHT = 70; // 🔥 IMPORTANT

      const calculatedHeight = Math.min(
        pageWidth * aspectRatio,
        MAX_FOOTER_HEIGHT
      );

      setFooterHeight(calculatedHeight);
      setIsReady(true);
    };
  }, [FooterImg]);
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") navigate("/");
        if (props === "Close") navigate("/Apps/TR232/Role");
      }
    });
  };

  const handleApply = async (values) => {
    const payload = {
      TermsID: values?.terms?.RecordID || "",
      EmployeeIDs: values?.Teacher?.map((t) => t.RecordID) || [],
      SlotGroupID: values?.Slotgroup?.RecordID || "",
      CompanyID: companyId,
    };
    setApiLoading(true);
    try {
      const result = await dispatch(NonTeacherOccupancyget(payload)).unwrap();
      setApiData(result);
    } catch (err) {
      console.error("TeacherOccupancy error:", err);
    } finally {
      setApiLoading(false);
    }
  };

  const summaryMap = {};
  (apiData?.Summaries || []).forEach((s) => { summaryMap[s.EmployeeID] = s; });

  return (
    <>
      {/* ── TOP BAR ── */}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={1}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            {isNonMobile && (
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }} onClick={() => navigate(-1)}>
                  Non Teacher Productivity
                </Typography>
              </Breadcrumbs>
            )}
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

      <Paper elevation={3} sx={{ margin: "10px", p: 0 }}>
        <Formik
          initialValues={{ terms: null, Teacher: [] }}
          onSubmit={(values) => { setTimeout(() => handleApply(values), 100); }}
          enableReinitialize
        >
          {({ values, handleSubmit, setFieldValue, resetForm }) => (
            <form onSubmit={handleSubmit}>
              {/* ── FILTERS ── */}
              <Box
                display="grid"
                gap={formGap}
                p={1}
                gridTemplateColumns={
                  isNonMobile
                    ? "repeat(3, minmax(0,1fr))"
                    : "repeat(1, minmax(0,1fr))"
                }
                // gridTemplateColumns="repeat(2, minMax(0,1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
              >
                <MultiFormikOptimizedAutocomplete
                  name="Teacher"
                  label={
                    <>
                      Non Teachers
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </>
                  }
                  id="Teacher"
                  value={values.Teacher}
                  onChange={(e, newValue) => {
                    setFieldValue("Teacher", newValue);
                    if (newValue) sessionStorage.setItem("Teacher", JSON.stringify(newValue));
                    else sessionStorage.removeItem("Teacher");
                  }}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2167", ScreenName: "Teacher",
                      Filter: `CompanyID='${companyId}' AND ClassificationID IN(${params.id})`,
                      Any: "", VerticalLicense: is003Subscription ? (sliceSubcriptionCode || "") : "",
                    },
                  })}`}
                />

                <CheckinAutocomplete
                  name="terms"
                  label={
                    <>
                      Term
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </>
                  }
                  id="terms"
                  value={values.terms}
                  onChange={(newValue) => {
                    if (newValue) {
                      setFieldValue("terms", {
                        RecordID: newValue.RecordID,
                        Code: newValue.Code,
                        Name: newValue.Name,
                      })
                    } else {
                      setFieldValue("terms", newValue);
                    }
                  }}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2202",
                      ScreenName: "Staff Terms",
                      Filter: values?.Teacher
                        ? `EmployeeID IN ('${Array.isArray(values.Teacher)
                          ? values.Teacher.map(t => t.RecordID).join("','")
                          : values.Teacher.RecordID
                        }') AND CompanyID='${companyId}' GROUP BY RecordID`
                        : `CompanyID='${companyId}'`,
                      Any: "",
                      VerticalLicense: sliceSubcriptionCode || "",
                    },
                  })}`}
                />

                <CheckinAutocomplete
                  name="Slotgroup"
                  label={
                    <>
                      Slot Group
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </>
                  }
                  id="Slotgroup"
                  value={values.Slotgroup}
                  onChange={(newValue) =>
                    setFieldValue("Slotgroup", {
                      RecordID: newValue.RecordID,
                      Code: newValue.Code,
                      Name: newValue.Name,
                    })
                  }
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2203",
                      ScreenName: "Slotgroup",
                      Filter: values?.Teacher
                        ? `EmployeeID IN ('${Array.isArray(values.Teacher)
                          ? values.Teacher.map(t => t.RecordID).join("','")
                          : values.Teacher.RecordID
                        }') AND CompanyID='${companyId}' GROUP BY RecordID`
                        : `CompanyID='${companyId}' GROUP BY RecordID`,
                      // Filter: `CompanyID='${companyId}'`,
                      Any: "",
                      VerticalLicense: sliceSubcriptionCode || "",
                    },
                  })}`}
                />
              </Box>

              {/* ── ACTION BUTTONS ── */}
              <Box display="flex" justifyContent="flex-end" p={1} gap="12px" flexWrap="wrap">
                <Button color="secondary" variant="contained" type="submit" disabled={apiLoading}>
                  {apiLoading ? "Loading…" : "Apply"}
                </Button>
                {/* ✅ RESET BUTTON — clears everything */}
                <Button
                  color="error"
                  variant="contained"
                  // disabled={apiLoading}
                  onClick={() => {
                    resetForm();          // resets Teacher & terms to initial values
                    setApiData(null);     // hides PDF icon, summary chips, timetables
                  }}
                >
                  Reset
                </Button>


                {apiData && apiData.Staff && apiData.Staff.length > 0 && (
                  <PDFDownloadLink
                    document={
                      <NonTeacherOccupancyPDF
                        apiData={apiData}
                        filters={{
                          Imageurl: baseurlUAAM,
                          HeaderImg: HeaderImg,
                          FooterImg: FooterImg,
                          TitleName: "Non Teacher Productivity Report"
                        }}
                        footerHeight={footerHeight}
                        reportTitle="Non Teacher Productivity Report"
                      />
                    }
                    fileName={`Non_Teacher_Productivity_Report_${getFormattedDate()}.pdf`}
                    style={{ color: "#d32f2f", cursor: "pointer" }}
                  >
                    {({ loading }) =>
                      loading
                        ? <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                        : <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                    }
                  </PDFDownloadLink>
                )}

                <Button color="warning" variant="contained" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>

              {/* ── SUMMARY CHIPS ── */}
              {apiData?.Summaries?.length > 0 && (
                <Box display="flex" flexWrap="wrap" gap={1} px={2} pb={1}>
                  {apiData.Summaries.map((s) => (
                    <Box key={s.EmployeeID} sx={{
                      display: "inline-flex", alignItems: "center", gap: 1,
                      background: "#F1F5F9", border: "1px solid #E2E8F0",
                      borderRadius: "8px", px: 1.5, py: 0.75,
                    }}>
                      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#1e1e3a" }}>
                        {s.StaffName}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                        {s.OccupiedHours} / {s.TotalHours}
                      </Typography>
                      <Box sx={{
                        fontSize: "10px", px: "8px", py: "1px",
                        background: "#DCFCE7", color: "#16A34A",
                        borderRadius: "20px", fontWeight: 700,
                      }}>
                        {s.FreeHours} free
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* ── TIMETABLES ── */}
              {apiData?.Staff?.length > 0 && (
                <Box sx={{ px: 2, pb: 2 }}>
                  {apiData.Staff.map((Staff) => (
                    <TeacherTimetable
                      key={Staff.EmployeeID}
                      Staff={Staff}
                      summary={summaryMap[Staff.EmployeeID] || null}
                    />
                  ))}
                </Box>
              )}

              {apiData && (!apiData.Staff || apiData.Staff.length === 0) && (
                <Box sx={{ textAlign: "center", py: 6, color: "#94A3B8" }}>
                  <Typography sx={{ fontSize: "14px" }}>No timetable data found.</Typography>
                </Box>
              )}

              {!apiData && !apiLoading && (
                <Box sx={{ textAlign: "center", py: 5, color: "#CBD5E1" }}>
                  <Typography sx={{ fontSize: "13px" }}>No Timetable Data</Typography>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default NonTeacherOccupancy;

