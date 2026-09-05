import { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnalyticsDashboardGet } from "../../../store/reducers/Formapireducer";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadIcon from "@mui/icons-material/Download";
import AttendanceReportPDF from "../../pages/pdf/DashAttendance";
import AssessmentReportPDF from "../../pages/pdf/DashAssesment";
import PromotionReportPDF from "../../pages/pdf/DashPromotion";
import PaymentReceipt from "../../pages/pdf/Paymentreceipt2";
import DashPaymentReceipt from "../../pages/pdf/DashPaymentpdf";

import { getConfig } from "../../../config";
import React from "react";
const PROMOTION_RULES = {
  minAttendancePercent: 75,
  minAssessmentPercent: 40,
};

const DEFAULT_REACTION_EMOJIS = ["🌟", "👏", "💡", "🎨", "🤝", "✨"];

const maxAttendanceBarHeight = 130; // px, height of the tallest attendance bar

function parseDMY(dateStr) {
  // "06-08-2026" -> Date object for 6 Aug 2026
  if (!dateStr) return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [day, month, year] = parts;
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatShortDate(dateStr) {
  // "06-08-2026" -> "06 Aug"
  const d = parseDMY(dateStr);
  if (!d) return dateStr || "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function formatLongDate(dateStr) {
  // "06-08-2026" -> "06 Aug 2026"
  const d = parseDMY(dateStr);
  if (!d) return dateStr || "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatFileSize(kb) {
  if (!kb) return null; // hide instead of showing "0 KB"
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function formatCurrency(amount, currency = "INR") {
  if (amount === null || amount === undefined || amount === "") return "—";
  const num = Number(amount);
  if (Number.isNaN(num)) return `${amount}`;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${amount}`;
  }
}

function safeEmoji(raw, idx = 0) {
  if (raw && raw.trim() && raw !== "?") return raw;
  return DEFAULT_REACTION_EMOJIS[idx % DEFAULT_REACTION_EMOJIS.length];
}

function splitTeacherName(raw) {
  // "Yuva shree || EMP00033" -> { name: "Yuva shree", code: "EMP00033" }
  if (!raw) return { name: "Teacher", code: "" };
  const [name, code] = raw.split("||").map((s) => s.trim());
  return { name: name || raw, code: code || "" };
}

function invoiceStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "paid" || s === "completed" || s === "fully paid") return "status-paid";
  if (s.includes("partial")) return "status-partial";
  if (s === "pending") return "status-pending";
  return "status-neutral";
}

// ---- Invoice HEADER helpers -------------------------------------------------
// The header record itself doesn't carry an InvoiceNo/InvoiceStatus - those
// live on the DetailData rows underneath it (every DetailData row for a given
// header shares the same InvoiceNo). We derive header-level display values
// from the header's own totals + the first detail row.
function getHeaderInvoiceNo(inv) {
  return inv?.DetailData?.[0]?.InvoiceNo || `IH${String(inv?.RecordID ?? "").padStart(5, "0")}`;
}

function getHeaderPurpose(inv) {
  // "P00004 || 6th Standard A Sec || Month Fee" -> "Month Fee"
  if (!inv?.Project) return "Fee";
  const parts = inv.Project.split("||").map((s) => s.trim()).filter(Boolean);
  return parts[parts.length - 1] || "Fee";
}

function getHeaderStatus(inv) {
  const due = Number(inv?.Due ?? 0);
  const paid = Number(inv?.PaidAmount ?? 0);
  if (due <= 0) return "Paid";
  if (paid > 0) return "Partially Paid";
  return "Pending";
}

// function emojiForRating(r) {
//   if (r >= 9) return "🤩";
//   if (r >= 7) return "🙂";
//   if (r >= 5) return "😐";
//   if (r >= 3) return "😕";
//   return "😣";
// }
const ratingEmojis = ["😡", "😞", "😟", "😕", "😐", "🙂", "😊", "😃", "😄", "🤩"];

const emojiForRating = (rating) => {
  const num = Number(rating);
  if (!num || num < 1) return "😡";
  return ratingEmojis[Math.min(num, 10) - 1];
};

function derivePromotionStatus(kpis, apiPromotion) {
  if (apiPromotion && apiPromotion.status) {
    return { isComputedLocally: false, ...apiPromotion };
  }

  const attendancePct = Number(kpis?.attendance?.percent ?? 0);
  const assessmentPct = Number(kpis?.assessment?.percent ?? 0);
  const attendanceOk = attendancePct >= PROMOTION_RULES.minAttendancePercent;
  const assessmentOk = assessmentPct >= PROMOTION_RULES.minAssessmentPercent;

  let status = "Under Review";
  if (attendanceOk && assessmentOk) status = "Promoted";
  else if (!attendanceOk && !assessmentOk) status = "Not Promoted";
  else status = "At Risk";

  return {
    isComputedLocally: true,
    status,
    nextStandardName: null,
    remarks: null,
    criteria: [
      {
        label: `Attendance ≥ ${PROMOTION_RULES.minAttendancePercent}%`,
        met: attendanceOk,
        actual: `${attendancePct}%`,
      },
      {
        label: `Assessment average ≥ ${PROMOTION_RULES.minAssessmentPercent}%`,
        met: assessmentOk,
        actual: `${assessmentPct}%`,
      },
    ],
  };
}

const PROMOTION_STYLES = {
  Promoted: { badgeClass: "promo-badge promoted", icon: "🎉" },
  "At Risk": { badgeClass: "promo-badge at-risk", icon: "⚠️" },
  "Not Promoted": { badgeClass: "promo-badge not-promoted", icon: "⛔" },
  "Under Review": { badgeClass: "promo-badge pending", icon: "⏳" },
};

/* ============================================================================
   3. SMALL REUSABLE COMPONENTS
   ============================================================================ */

function DotsMenu({ id, openMenu, setOpenMenu, label, onDownload }) {
  const open = openMenu === id;
  return (
    <Box className="menu-wrap">
      <Box
        component="button"
        className="dots-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(open ? null : id);
        }}
      >
        <MoreVertIcon style={{ fontSize: 18 }} />
      </Box>
      <Box className={`dropdown${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <label>From</label>
        <Box className="range-row">
          <input type="date" defaultValue="2026-07-01" />
        </Box>
        <label>To</label>
        <Box className="range-row">
          <input type="date" defaultValue="2027-06-30" />
        </Box>
        <Box
          component="button"
          className="dropdown-btn"
          onClick={() => {
            if (onDownload) onDownload();
            setOpenMenu(null);
          }}
        >
          <FileDownloadIcon style={{ fontSize: 16 }} />
          Download {label} PDF
        </Box>
      </Box>
    </Box>
  );
}

function EmptyState({ text }) {
  return (
    <Box style={{ padding: "28px 4px", textAlign: "center", color: "var(--slate-light)", fontSize: 13, fontWeight: 500 }}>
      {text}
    </Box>
  );
}

// Promotion marksheet — final subject-wise marks table, styled to match the
// reference design: teal header row, striped body rows, and a teal footer
// bar with a "x–y of n" count plus prev/next pagination controls.
function PromotionMarksheet({ marks, openMenu, setOpenMenu }) {
  const pageSize = 5;
  const [page, setPage] = useState(0);

  const rows = Array.isArray(marks) ? marks : [];

  const totalPages = Math.max(
    1,
    Math.ceil(rows.length / pageSize)
  );

  useEffect(() => {
    setPage(0);
  }, [rows.length]);

  const start = page * pageSize;

  const visible = rows.slice(
    start,
    start + pageSize
  );

  const from = rows.length === 0
    ? 0
    : start + 1;

  const to = Math.min(
    start + pageSize,
    rows.length
  );

  return (
    <>
      {rows.length === 0 ? (
        <EmptyState text="No promotion marks recorded yet." />
      ) : (
        <Box className="promo-table-wrap">
          <table className="promo-table">
            <thead>
              <tr>
                <th style={{ width: 70 }}>SL#</th>
                <th>Subjects</th>
                <th>Marks</th>
                <th>Out Of Marks</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((m, i) => (
                <tr
                  key={
                    m.RecordID ??
                    m.SubjectID ??
                    start + i
                  }
                >
                  <td>{start + i + 1}</td>

                  <td className="subj-cell">
                    {m.Subject || "-"}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {m.Marks ?? 0}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {m.OutOfMarks ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={2}>
                  {from}-{to} of {rows.length}
                </td>

                <td colSpan={2}>
                  <Box className="promo-pagination">
                    <Box
                      component="button"
                      className="promo-page-btn"
                      disabled={page === 0}
                      onClick={() =>
                        setPage((p) =>
                          Math.max(0, p - 1)
                        )
                      }
                    >
                      <ChevronLeftIcon
                        style={{ fontSize: 16 }}
                      />
                    </Box>

                    <Box
                      component="button"
                      className="promo-page-btn"
                      disabled={
                        page >= totalPages - 1
                      }
                      onClick={() =>
                        setPage((p) =>
                          Math.min(
                            totalPages - 1,
                            p + 1
                          )
                        )
                      }
                    >
                      <ChevronRightIcon
                        style={{ fontSize: 16 }}
                      />
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </table>
        </Box>
      )}
    </>
  );
}

function SkeletonBlock({ style }) {
  return <Box className="sk-block" style={style} />;
}

function SkeletonCard({ height = 220 }) {
  return (
    <Box className="card">
      <Box className="card-head">
        <Box style={{ flex: 1 }}>
          <SkeletonBlock style={{ width: 160, height: 16, marginBottom: 8 }} />
          <SkeletonBlock style={{ width: 220, height: 12 }} />
        </Box>
        <SkeletonBlock style={{ width: 96, height: 32, borderRadius: 9 }} />
      </Box>
      <SkeletonBlock style={{ width: "100%", height, marginTop: 16, borderRadius: 14 }} />
    </Box>
  );
}

function DashboardSkeleton() {
  return (
    <Box className="shd">
      <Box className="wrap">
        {/* Profile bar */}
        <Box className="sk-profile-bar">
          <Box className="profile-left">
            <Box className="sk-block sk-avatar" />
            <Box>
              <SkeletonBlock style={{ width: 160, height: 18, marginBottom: 8, background: "rgba(255,255,255,.25)" }} />
              <SkeletonBlock style={{ width: 200, height: 12, background: "rgba(255,255,255,.18)" }} />
            </Box>
          </Box>
          <SkeletonBlock style={{ width: 120, height: 34, borderRadius: 100, background: "rgba(255,255,255,.18)" }} />
        </Box>

        {/* Year row */}
        <Box className="year-row">
          <SkeletonBlock style={{ width: 220, height: 44, borderRadius: 12 }} />
          <SkeletonBlock style={{ width: 190, height: 40, borderRadius: 10 }} />
        </Box>

        {/* KPI row */}
        <Box className="kpi-row">
          {[0, 1, 2, 3].map((i) => (
            <Box className="kpi" key={i}>
              <SkeletonBlock style={{ width: 90, height: 11, marginBottom: 10 }} />
              <SkeletonBlock style={{ width: 70, height: 24, marginBottom: 8 }} />
              <SkeletonBlock style={{ width: 120, height: 11 }} />
            </Box>
          ))}
        </Box>

        {/* Section cards */}
        {[
          { dot: "var(--teal-500)", height: 260 },
          { dot: "var(--amber)", height: 200 },
          { dot: "var(--teal-900)", height: 160 },
          { dot: "var(--violet)", height: 220 },
        ].map((s, i) => (
          <Box className="section" key={i}>
            <Box className="section-label">
              <Box component="span" className="dot" style={{ background: s.dot }}></Box>
              <SkeletonBlock style={{ width: 140, height: 14 }} />
            </Box>
            <Box className="panel">
              <SkeletonCard height={s.height} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
class PdfErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("PDF render error:", error, info);
  }
  componentDidUpdate(prevProps) {
    // reset the boundary when the term changes so it can try again
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box component="button" className="dl-btn" type="button" disabled>
          Download unavailable
        </Box>
      );
    }
    return this.props.children;
  }
}
export default function StudentHistoryDashboard() {
  const params = useParams();
  const dispatch = useDispatch();
  const recID = params.id;
  const CompanyID = sessionStorage.getItem("compID");
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [monthDrillIdx, setMonthDrillIdx] = useState(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(null);
  const [skillDrillIdx, setSkillDrillIdx] = useState(null);
  const [selectedTermIdx, setSelectedTermIdx] = useState(-1);
  const [footerHeight, setFooterHeight] = useState(60);
  const config = getConfig();
  const baseurl1 = config.UAAM_URL;
  const getTodayDate = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const getCurrentAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = String(currentYear + 1).slice(-2);

    return `${currentYear}-${nextYear}`;
  };

  // 2026-27
  const analyticsState = useSelector((state) => state.formApi?.AnalyticsDashboardGetData) || {};
  const apiData = Object.keys(analyticsState).length > 0 ? analyticsState : null;
  const loading = !apiData;
  const error = null;

  const academicYear = selectedYear || apiData?.activeYear || getCurrentAcademicYear();

  useEffect(() => {
    dispatch(
      AnalyticsDashboardGet({

        data: { CompanyID, StudentID: recID, AcademicYear: academicYear },
      })
    );

  }, [recID, selectedYear]);

  useEffect(() => {
    setMonthDrillIdx(null);
    setSkillDrillIdx(null);
    setSelectedTermIdx(null);
  }, [academicYear, apiData?.attendance?.months]);

  const activities = (apiData?.skills?.activities || []).filter(
    (a) => a.label && a.label.trim()
  );
  useEffect(() => {
    if (currentActivityIndex === null && activities.length > 0) {
      setCurrentActivityIndex(0);
    }
  }, [activities, currentActivityIndex]);

  // ---- derive everything the UI needs from the raw API payload ----
  const student = apiData?.student || {};
  const kpis = apiData?.kpis || {};
  const months = apiData?.attendance?.months || [];
  // Header-only invoice list (each item may carry a DetailData[] array with
  // the underlying transactions/payments for that header).
  const invoices = apiData?.invoices || [];
  const teacherWall = apiData?.teacherWall || [];
  const availableYears = apiData?.availableYears?.length
    ? apiData.availableYears
    : academicYear
      ? [academicYear]
      : [];

  const promotionMarks = apiData?.Promotion || [];

  const assessmentPerformance = apiData?.assessmentPerformance || {};
  const assessmentTerms = assessmentPerformance.terms || [];
  const assessmentOverall = assessmentPerformance.overall || [];
  const legacyAssessments = apiData?.assessments || [];
console.log(legacyAssessments,"legacyAssessments")
  useEffect(() => {
    // Reset to Overall whenever academic year/data changes
    setSelectedTermIdx(-1);
  }, [academicYear, assessmentTerms.length]);

  const activeTerm =
    selectedTermIdx >= 0 ? assessmentTerms[selectedTermIdx] : null;

  const termSubjects =
    activeTerm?.subjects || activeTerm?.assessments || [];

  const assessmentsToShow =
    selectedTermIdx === -1
      ? assessmentOverall.length > 0
        ? assessmentOverall
        : legacyAssessments
      : termSubjects;

  const assessmentData = useMemo(() => {
    const list = Array.isArray(assessmentsToShow) ? assessmentsToShow : [];
    return list.map((item) => ({
      subject: item?.subject ?? item?.subjectName ?? item?.name ?? "-",
      percent: Number.isFinite(Number(item?.percent ?? item?.score))
        ? Number(item?.percent ?? item?.score)
        : 0,
      grade: item?.grade ?? "—",
    }));
  }, [assessmentsToShow]);
  const activeTermLabel =
    selectedTermIdx === -1
      ? "Overall"
      : activeTerm?.label || activeTerm?.term || activeTerm?.name || null;

  const promotion = useMemo(
    () => derivePromotionStatus(kpis, apiData?.promotion),
    [kpis, apiData]
  );

  const pctAttendance = kpis?.attendance?.percent ?? 0;
  const ringR = 66;
  const ringCirc = 2 * Math.PI * ringR;
  const ringOffset = ringCirc * (1 - pctAttendance / 100);

  const selectedMonth = monthDrillIdx !== null ? months[monthDrillIdx] || null : null;
  const dayGrid = selectedMonth?.days || [];
  const dayCounts = dayGrid.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Weekday (0=Sun..6=Sat) that day 1 of the selected month falls on,
  // used to pad the grid so real days line up under the correct weekday.
  const leadingBlanks = selectedMonth
    ? new Date(`${selectedMonth.fullLabel} 1, ${selectedMonth.year}`).getDay()
    : 0;
  const activeActivity = currentActivityIndex !== null ? activities[currentActivityIndex] : activities[0];
  const monthlyRatings = activeActivity?.monthlyRatings || [];
  const sessionsByMonth = activeActivity?.sessions || [];

  const ratedMonths = monthlyRatings
    .map((m, i) => ({ ...m, i }))
    .filter((m) => m.rating !== null && m.rating !== undefined);
  const ratingValues = ratedMonths.map((m) => m.rating);
  const skCurrent = activeActivity?.stats?.currentRating ??
    (ratingValues.length ? ratingValues[ratingValues.length - 1] : null);
  const skHigh = activeActivity?.stats?.highest ??
    (ratingValues.length ? Math.max(...ratingValues) : null);
  const skLow = activeActivity?.stats?.lowest ??
    (ratingValues.length ? Math.min(...ratingValues) : null);
  const skAvg = activeActivity?.stats?.sixMonthAvg ??
    (ratingValues.length ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1) : null);

  const chartW = 620, chartH = 150, padX = 30, padTop = 20, padBottom = 10;
  const usableW = chartW - padX * 2;
  const usableH = chartH - padTop - padBottom;

  const pts = ratedMonths.map((m) => ({
    x: padX + (monthlyRatings.length > 1 ? (m.i / (monthlyRatings.length - 1)) * usableW : usableW / 2),
    y: padTop + (1 - (m.rating - 1) / 9) * usableH,
    r: m.rating,
    i: m.i,
    label: m.label,
  }));
  const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" ");
  const areaPath = pts.length > 1
    ? `${linePath} L${pts[pts.length - 1].x.toFixed(1)} ${chartH - padBottom} L${pts[0].x.toFixed(1)} ${chartH - padBottom} Z`
    : "";
  const sessionLog = skillDrillIdx !== null ? sessionsByMonth[skillDrillIdx] || [] : [];

  function refetch() {
    dispatch(AnalyticsDashboardGet({ data: { CompanyID, StudentID: recID, AcademicYear: selectedYear } }));
  }

  // ---- loading / error guards (kept simple on purpose) ----
  if (loading && !apiData) {
    return (
      <Box onClick={() => setOpenMenu(null)}>
        <style>{SHD_STYLES}</style>
        <DashboardSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="shd">
        <style>{SHD_STYLES}</style>
        <Box className="wrap">
          <Box className="card" style={{ textAlign: "center", padding: 40 }}>
            <Box style={{ fontWeight: 700, marginBottom: 8 }}>Couldn't load this student's history</Box>
            <Box className="sub" style={{ marginBottom: 16 }}>
              {typeof error === "string" ? error : "Please try again."}
            </Box>
            <Box component="button" className="export-btn" onClick={refetch}>Retry</Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box onClick={() => setOpenMenu(null)}>
      <style>{SHD_STYLES}</style>

      <Box className="shd">
        <Box className="wrap">

          {/* Profile bar */}
          <Box className="profile-bar">
            <Box className="profile-left">
              <Box className="avatar">{student.initials || "—"}</Box>
              <Box>
                <h1>{student.name || "Student"}</h1>
                <Box className="meta">
                  {student.standards?.[0]?.StandardName || "—"} &nbsp;·&nbsp; {student.school || "—"}
                </Box>
              </Box>
            </Box>
            <Box className="profile-right">
              <Box component="span" className="id-chip">{student.code || "—"}</Box>
              <Box component="button" className="back-pill" onClick={() => navigate(-1)}>
                <ArrowBackIcon style={{ fontSize: 15 }} />
                Back to list
              </Box>
            </Box>
          </Box>

          {/* Year selector + export */}
          <Box className="year-row">
            <Box className="year-tabs">
              {availableYears.map((y) => (
                <Box
                  component="button"
                  key={y}
                  className={`year-tab${academicYear === y ? " active" : ""}`}
                  onClick={() => setSelectedYear(y)}
                >
                  {y}
                </Box>
              ))}
            </Box>
          </Box>

          {/* KPI summary */}
          <Box className="kpi-row">
            <Box className="kpi accent-teal">
              <Box className="label">Attendance</Box>
              <Box className="value">{kpis.attendance?.percent ?? 0}%</Box>
              <Box className="sub">
                {kpis.attendance?.presentDays ?? 0} / {kpis.attendance?.totalDays ?? 0} days present
              </Box>
            </Box>
            <Box className="kpi accent-amber">
              <Box className="label">Avg. Assessment</Box>
              <Box className="value">{kpis.assessment?.grade ?? "—"}</Box>
              <Box className="sub">{kpis.assessment?.percent ?? 0}% across {kpis.assessment?.subjectCount ?? 0} subjects</Box>
            </Box>
            <Box className="kpi accent-violet">
              <Box className="label">Skill Growth</Box>
              <Box className="value">
                {kpis.skillGrowth?.percentChange > 0 ? "+" : ""}{kpis.skillGrowth?.percentChange ?? 0}%
              </Box>
              <Box className="sub">vs. {(kpis.skillGrowth?.comparedTo || "previous term").replace(/_/g, " ")}</Box>
            </Box>
            <Box className="kpi accent-coral">
              <Box className="label">Fees Paid</Box>
              <Box className="value mono">{formatCurrency(kpis.fees?.paidAmount, kpis.fees?.currency)}</Box>
              <Box className="sub">
                {kpis.fees?.dueAmount > 0 ? `${formatCurrency(kpis.fees.dueAmount, kpis.fees.currency)} due` : "Fully paid"}
              </Box>
            </Box>
          </Box>

          {/* ATTENDANCE SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: "var(--teal-500)" }}></Box><h2>Attendance</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Attendance overview</h3>
                    <Box className="sub">
                      Click a month to see day-by-day attendance
                    </Box>
                  </Box>

                  <PDFDownloadLink
                    document={
                      <AttendanceReportPDF
                        studentName={student.name}
                        academicYear={academicYear}
                        attendancePercentage={pctAttendance}
                        months={months}
                        filters={{
                          Imageurl: baseurl1,
                          HeaderImg: sessionStorage.getItem("CompanyHeader"),
                          FooterImg: sessionStorage.getItem("CompanyFooter"),
                          CompanySignature: sessionStorage.getItem("CompanySignature"),
                        }}
                        footerHeight={footerHeight}
                      />
                    }
                    fileName="Attendance_Report.pdf"
                    style={{ textDecoration: "none" }}
                  >
                    {({ loading }) => (
                      <Box component="button" className="dl-btn">
                        <FileDownloadIcon style={{ fontSize: 15 }} />
                        {loading ? "Preparing..." : "Download"}
                      </Box>
                    )}
                  </PDFDownloadLink>
                </Box>

                {months.length === 0 ? (
                  <EmptyState text="No attendance records for this academic year yet." />
                ) : !selectedMonth ? (
                  // Overview: month-by-month bar chart. Keyed so React always fully
                  // swaps this subtree out for the drilldown below rather than
                  // reconciling between two very different layouts.
                  <Box key="overview" className="attendance-layout">
                    <Box className="ring-box">
                      <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r={ringR} fill="none" stroke="#eef4f3" strokeWidth="16" />
                        <circle cx="80" cy="80" r={ringR} fill="none" stroke="var(--teal-500)" strokeWidth="16"
                          strokeDasharray={ringCirc.toFixed(1)} strokeDashoffset={ringOffset.toFixed(1)}
                          strokeLinecap="round" transform="rotate(-90 80 80)" />
                        <text x="80" y="76" textAnchor="middle" className="big">{pctAttendance}%</text>
                        <text x="80" y="96" textAnchor="middle" className="cap">PRESENT</text>
                      </svg>
                      <Box className="legend">
                        <Box component="span"><i style={{ background: "var(--teal-500)" }}></i>Present</Box>
                        <Box component="span"><i style={{ background: "var(--coral)" }}></i>Absent</Box>
                      </Box>
                    </Box>

                    <Box className="bars">
                      {months.map((month, i) => {
                        const total = month.present + month.absent;
                        const pH = total ? (month.present / total) * maxAttendanceBarHeight : 0;
                        const aH = total ? (month.absent / total) * maxAttendanceBarHeight : 0;
                        return (
                          <Box key={month.label + month.year} className="bar-col" onClick={() => setMonthDrillIdx(i)}>
                            <Box className="bar-stack" style={{ height: pH + aH }}>
                              <Box className="bar-absent" style={{ height: aH }}></Box>
                              <Box className="bar-present" style={{ height: pH }}></Box>
                            </Box>
                            <Box className="m">{month.label}</Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ) : (
                  <Box key={`drill-${monthDrillIdx}`}>
                    <Box className="crumbs">
                      <Box component="span" className="back-link" onClick={() => setMonthDrillIdx(null)}>
                        <ArrowBackIcon style={{ fontSize: 14 }} />
                        Back to overview
                      </Box>
                      <Box component="span">›</Box>
                      <Box component="span" style={{ color: "var(--ink)" }}>
                        {selectedMonth.fullLabel} {selectedMonth.year}
                      </Box>
                    </Box>
                    <Box className="drill-summary">
                      <Box className="drill-stat">Present <b>{dayCounts.present || 0} days</b></Box>
                      <Box className="drill-stat">Absent <b>{dayCounts.absent || 0} days</b></Box>
                      <Box className="drill-stat">Holidays <b>{dayCounts.holiday || 0} days</b></Box>
                    </Box>

                    {/* Weekday header row */}
                    <Box className="weekday-header">
                      {WEEKDAY_LABELS.map((wd) => (
                        <Box key={wd} className="weekday-label">{wd}</Box>
                      ))}
                    </Box>

                    {/* Calendar grid: leading blanks + actual days */}
                    <Box className="day-grid">
                      {Array.from({ length: leadingBlanks }).map((_, i) => (
                        <Box key={`blank-${i}`} className="day-cell empty" />
                      ))}
                      {dayGrid.map((d) => (
                        <Box key={d.day} className={`day-cell ${d.status}`}
                          data-tip={`${selectedMonth.label} ${d.day} · ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}`}>
                          {d.day}
                        </Box>
                      ))}
                    </Box>

                    <Box className="day-legend">
                      <Box component="span"><i style={{ background: "var(--teal-100)" }}></i>Present</Box>
                      <Box component="span"><i style={{ background: "var(--coral-100)" }}></i>Absent</Box>
                      <Box component="span"><i style={{ background: "#b9ecee" }}></i>Holiday</Box>
                      <Box component="span"><i style={{ background: "#9f818596", border: "1px dashed var(--line)" }}></i>Weekend</Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* ASSESSMENT SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: "var(--amber)" }}></Box><h2>Assessment</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Assessment performance</h3>
                    <Box className="sub">
                      Subject-wise scores · {activeTermLabel}
                    </Box>
                  </Box>
                  <PdfErrorBoundary resetKey={selectedTermIdx}>
                    {assessmentData.length > 0 && (
                      <PDFDownloadLink
                        key={selectedTermIdx} // forces clean remount per tab
                        document={
                          <AssessmentReportPDF
                            studentName={student?.name || ""}
                            academicYear={academicYear || ""}
                            termLabel={activeTermLabel || "Overall"}
                            assessments={assessmentData}
                            filters={{
                              Imageurl: baseurl1,
                              HeaderImg: sessionStorage.getItem("CompanyHeader"),
                              FooterImg: sessionStorage.getItem("CompanyFooter"),
                              CompanySignature: sessionStorage.getItem("CompanySignature"),
                            }}
                            footerHeight={footerHeight}
                          />
                        }
                        fileName="Assessment_Report.pdf"
                        style={{ textDecoration: "none" }}
                      >
                        {({ loading, error }) =>
                          error ? (
                            <Box className="dl-btn">Download unavailable</Box>
                          ) : (
                            <Box component="button" className="dl-btn" type="button">
                              <FileDownloadIcon style={{ fontSize: 15 }} />
                              {loading ? "Preparing..." : "Download"}
                            </Box>
                          )
                        }
                      </PDFDownloadLink>
                    )}
                  </PdfErrorBoundary>
                </Box>

                {(assessmentOverall.length > 0 || assessmentTerms.length > 0) && (
                  <Box className="activity-tabs" style={{ marginTop: 14 }}>
                    {/* Overall Tab */}
                    <Box
                      component="button"
                      className={`activity-tab${selectedTermIdx === -1 ? " active" : ""}`}
                      onClick={() => setSelectedTermIdx(-1)}
                    >
                      Overall
                    </Box>

                    {/* Term Tabs */}
                    {assessmentTerms.map((t, i) => (
                      <Box
                        component="button"
                        key={t.termId ?? t.id ?? i}
                        className={`activity-tab${selectedTermIdx === i ? " active" : ""}`}
                        onClick={() => setSelectedTermIdx(i)}
                      >
                        {t.label || t.term || t.name || `Term ${i + 1}`}
                      </Box>
                    ))}
                  </Box>
                )}

                {assessmentData.length === 0 ? (
                  <EmptyState text="No assessment scores recorded yet." />
                ) : (
                  <Box className="assess-list">
                    {assessmentData.map((a, i) => (
                      <Box
                        key={`${a.subject}-${i}`}
                        className="assess-row"
                      >
                        <Box className="subj">
                          {a.subject}
                        </Box>

                        <Box className="track">
                          <Box
                            className="fill"
                            style={{
                              width: `${Math.min(
                                Math.max(a.percent, 0),
                                100
                              )}%`,
                            }}
                          />
                        </Box>

                        <Box className="pct">
                          {a.percent}%
                        </Box>

                        <Box className="grade-chip">
                          {a.grade}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* PROMOTION SECTION */}
          <Box className="section">

            <Box className="section-label">
              <Box
                component="span"
                className="dot"
                style={{
                  background: "var(--teal-900)",
                }}
              />

              <h2>Promotion</h2>
            </Box>

            <Box
              className="panel"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <Box className="card">

                {/* Card Header */}
                <Box
                  className="card-head"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <h3>Promotion Marksheet</h3>

                    <Box className="sub">
                      Final subject-wise marks
                    </Box>
                  </Box>

                  {/* PDF Download Button */}
                  {promotionMarks.length > 0 && (
                    <PDFDownloadLink
                      document={
                        <PromotionReportPDF
                          studentName={student?.name || ""}
                          academicYear={academicYear || ""}
                          promotionMarks={promotionMarks}
                          filters={{
                            Imageurl: baseurl1,
                            HeaderImg:
                              sessionStorage.getItem("CompanyHeader"),
                            FooterImg:
                              sessionStorage.getItem("CompanyFooter"),
                            CompanySignature:
                              sessionStorage.getItem("CompanySignature"),
                          }}
                          footerHeight={footerHeight}
                        />
                      }
                      fileName="Promotion_Marksheet.pdf"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      {({ loading }) => (
                        <Box
                          component="button"
                          className="dl-btn"
                          type="button"
                        >
                          <FileDownloadIcon
                            style={{ fontSize: 15 }}
                          />

                          {loading
                            ? "Preparing..."
                            : "Download"}
                        </Box>
                      )}
                    </PDFDownloadLink>
                  )}
                </Box>

                {/* Promotion Table */}
                <PromotionMarksheet
                  marks={promotionMarks}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />

              </Box>
            </Box>

          </Box>

          {/* SKILLS SECTION */}
          <Box className="section">
            <Box className="section-label">
              <Box component="span" className="dot" style={{ background: "var(--violet)" }}></Box><h2>Skill Identification</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Skill identification</h3>
                    <Box className="sub">Observed by teachers across the year</Box>
                  </Box>
                </Box>

                {activities.length === 0 ? (
                  <EmptyState text="No skill observations recorded for this student yet." />
                ) : (
                  <>
                    <Box className="activity-tabs">
                      {activities.map((act, i) => (
                        <Box component="button" key={`${act.key || "activity"}-${i}`} className={`activity-tab${currentActivityIndex === i ? " active" : ""}`}
                          onClick={() => { setCurrentActivityIndex(i); setSkillDrillIdx(null); }}>
                          <Box component="span" className="ico">{act.icon}</Box>{act.label}
                        </Box>
                      ))}
                    </Box>

                    {skillDrillIdx === null ? (
                      <Box>
                        <Box className="skill-stats">
                          <Box className="skill-stat">Current rating<b>{skCurrent ?? "—"} {skCurrent !== null && emojiForRating(skCurrent)}</b></Box>
                          <Box className="skill-stat">Highest<b>{skHigh ?? "—"}</b></Box>
                          <Box className="skill-stat">Lowest<b>{skLow ?? "—"}</b></Box>
                          <Box className="skill-stat">Avg<b>{skAvg ?? "—"}</b></Box>
                        </Box>
                        {pts.length === 0 ? (
                          <EmptyState text="No monthly ratings recorded for this activity yet." />
                        ) : (
                          <Box className="chart-box">
                            <svg width="100%" height="150" viewBox="0 0 620 150" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                              <defs>
                                <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
                                  <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d={areaPath} fill="url(#skillGrad)" stroke="none"></path>
                              <path d={linePath} fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path>
                              {pts.map((p) => (
                                <g key={p.i} style={{ cursor: "pointer" }} onClick={() => setSkillDrillIdx(p.i)}>
                                  <circle className="chart-pt" cx={p.x} cy={p.y} r="4" fill="#fff" stroke="var(--violet)" strokeWidth="2.5" />
                                  <text className="chart-pt-emoji" x={p.x} y={p.y - 14}>{emojiForRating(p.r)}</text>
                                </g>
                              ))}
                            </svg>
                            <Box className="chart-month-labels">
                              {monthlyRatings.map((m) => <Box component="span" key={m.label}>{m.label}</Box>)}
                            </Box>
                          </Box>
                        )}
                        <Box className="sub" style={{ marginTop: 10 }}>Click a point to see individual session ratings for that month.</Box>
                      </Box>
                    ) : (
                      <Box>
                        <Box className="crumbs">
                          <Box component="span" className="back-link" onClick={() => setSkillDrillIdx(null)}>
                            <ArrowBackIcon style={{ fontSize: 14 }} />
                            Back to trend
                          </Box>
                          <Box component="span">›</Box>
                          <Box component="span" style={{ color: "var(--ink)" }}>
                            {activeActivity.icon} {activeActivity.label} · {monthlyRatings[skillDrillIdx]?.label} {monthlyRatings[skillDrillIdx]?.year} sessions
                          </Box>
                        </Box>
                        {sessionLog.length === 0 ? (
                          <EmptyState text="No individual sessions logged for this month." />
                        ) : (
                          <Box className="log-list">
                            {sessionLog.map((s, idx) => (
                              <Box key={idx} className="log-row">
                                <Box className="log-left">
                                  <Box component="span" className="log-emoji">{emojiForRating(s.rating)}</Box>
                                  <Box>
                                    <Box className="log-date">{formatLongDate(s.date)}</Box>
                                    <Box className="log-note">{s.note}</Box>
                                  </Box>
                                </Box>
                                <Box className="log-rating">{s.rating}/10</Box>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* TEACHER WALL SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: "#f26d6d" }}></Box><h2>Teacher Wall</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Teacher wall</h3>
                    <Box className="sub">Reactions & appreciation from subject teachers</Box>
                  </Box>
                </Box>
                {teacherWall.length === 0 ? (
                  <EmptyState text="No teacher reactions yet." />
                ) : (
                  <Box className="wall">
                    {teacherWall.map((r, idx) => {
                      const { name } = splitTeacherName(r.teacherName);
                      return (
                        <Box key={r.id ?? idx} className="react-card">
                          <Box className="react-top">
                            <Box component="span" className="emoji">{safeEmoji(r.emoji, idx)}</Box>
                            <Box component="span" className="react-date">{formatShortDate(r.date)}</Box>
                          </Box>
                          <Box className="react-teacher">{name}</Box>
                          <Box className="react-subj">{r.subject}</Box>
                          <Box className="react-note">{r.note}</Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* INVOICES SECTION — one row per HEADER only. Each header row gets
              its own "Download" button producing a separate PDF that lists
              every DetailData transaction under that header. */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: "#3fb1e0" }}></Box><h2>Invoices</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Fee Records</h3>
                    <Box className="sub">{academicYear} academic year</Box>
                  </Box>
                </Box>

                {invoices.length === 0 ? (
                  <EmptyState text="No invoices raised for this academic year yet." />
                ) : (
                  <Box className="fee-table-wrap">
                    <table className="fee-table">
                      <thead>
                        <tr>
                          <th>Invoice No</th>
                          <th>Invoice Date</th>
                          <th>Purpose</th>
                          <th style={{ textAlign: "right" }}>Total Amount</th>
                          <th style={{ textAlign: "right" }}>Paid</th>
                          <th style={{ textAlign: "right" }}>Due</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => {
                          const invoiceNo = getHeaderInvoiceNo(inv);
                          const status = getHeaderStatus(inv);
                          const purpose = getHeaderPurpose(inv);
                          const detailRows = inv.DetailData || [];
                          const first = detailRows[0] || {};

                          return (
                            <tr key={inv.RecordID}>
                              <td className="mono">{invoiceNo}</td>
                              <td>{formatLongDate(inv.InvoiceDate)}</td>
                              <td className="fee-purpose-cell">{purpose}</td>
                              <td className="mono" style={{ textAlign: "right" }}>{formatCurrency(inv.TotalAmount)}</td>
                              <td className="mono" style={{ textAlign: "right" }}>{formatCurrency(inv.PaidAmount)}</td>
                              <td className="mono" style={{ textAlign: "right" }}>{formatCurrency(inv.Due)}</td>
                              <td>
                                <Box component="span" className={`status-chip ${invoiceStatusClass(status)}`}>{status}</Box>
                              </td>
                              <td>
                                {detailRows.length > 0 && (
                                  <PdfErrorBoundary resetKey={inv.RecordID}>
                                    <PDFDownloadLink
                                      document={
                                        <DashPaymentReceipt
                                          header={inv}
                                          detailData={detailRows}
                                          filters={{
                                            Imageurl: baseurl1,
                                            HeaderImg: sessionStorage.getItem("CompanyHeader"),
                                            FooterImg: sessionStorage.getItem("CompanyFooter"),
                                            CompanySignature: sessionStorage.getItem("CompanySignature"),
                                          }}
                                          footerHeight={footerHeight}
                                        />
                                      }
                                      fileName={`Invoice_${invoiceNo}_${first.FilterEmployee || "Student"}.pdf`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      {({ loading }) => (
                                        <Box component="button" className="dl-btn-sm" type="button">
                                          <FileDownloadIcon style={{ fontSize: 13 }} />
                                          {loading ? "..." : "Download"}
                                        </Box>
                                      )}
                                    </PDFDownloadLink>
                                  </PdfErrorBoundary>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>


        </Box>
      </Box>
    </Box>
  );
}

/* ============================================================================
   4. STYLES
   Pulled into a constant so both the skeleton and the loaded page can share
   exactly the same CSS.
   ============================================================================ */

const SHD_STYLES = `
  :root{
    --teal-900:#0a5f56; --teal-700:#0f9b8e; --teal-500:#17b8a6; --teal-100:#e3f5f2;
    --ink:#1c2b2a; --slate:#66787a; --slate-light:#93a3a4; --paper:#f4f8f7; --card:#ffffff;
    --line:#e2ebe9; --amber:#f2a93b; --amber-100:#fdf1dc; --coral:#ef6f6c; --coral-100:#fde9e8;
    --violet:#7c6cf0; --violet-100:#ecebfd;
    --shadow: 0 1px 2px rgba(15,45,42,.04), 0 8px 24px -12px rgba(15,45,42,.12);
  }
  .shd *{box-sizing:border-box;}
  .shd{ margin:0; background:var(--paper); color:var(--ink); font-family:'Inter',sans-serif; -webkit-font-smoothing:antialiased; }
  .shd h1,.shd h2,.shd h3{ font-family:'Lexend',sans-serif; }
  .shd .mono{ font-family:'JetBrains Mono',monospace; letter-spacing:-.02em; }
  .shd .wrap{ max-width:1180px; margin:0 auto; padding:28px 24px 60px; }

  .shd .profile-bar{ background:linear-gradient(135deg,var(--teal-900),var(--teal-700)); border-radius:20px; padding:22px 26px; color:#fff; display:flex; align-items:center; justify-content:space-between; gap:20px; box-shadow:var(--shadow); }
  .shd .profile-left{ display:flex; align-items:center; gap:16px; }
  .shd .avatar{ width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,.16); display:flex; align-items:center; justify-content:center; font-family:'Lexend',sans-serif; font-weight:700; font-size:18px; border:1px solid rgba(255,255,255,.25); }
  .shd .profile-left h1{ margin:0; font-size:20px; font-weight:700; }
  .shd .profile-left .meta{ margin-top:3px; font-size:13px; color:rgba(255,255,255,.75); font-weight:500; }
  .shd .profile-right{ display:flex; align-items:center; gap:10px; }
  .shd .id-chip{ font-size:12px; font-weight:600; background:rgba(255,255,255,.14); padding:6px 12px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
  .shd .back-pill{ display:flex; align-items:center; gap:6px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.25); color:#fff; padding:8px 14px; border-radius:100px; font-size:13px; font-weight:600; cursor:pointer; }

  .shd .year-row{ display:flex; align-items:center; justify-content:space-between; margin-top:26px; flex-wrap:wrap; gap:14px; }
  .shd .year-tabs{ display:flex; gap:6px; background:var(--card); padding:5px; border-radius:12px; border:1px solid var(--line); }
  .shd .year-tab{ border:none; background:transparent; padding:9px 16px; border-radius:9px; font-size:13.5px; font-weight:600; color:var(--slate); cursor:pointer; font-family:'Inter',sans-serif; }
  .shd .year-tab.active{ background:var(--teal-700); color:#fff; }
  .shd .export-btn{ display:flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); color:var(--teal-900); font-weight:600; font-size:13.5px; padding:10px 16px; border-radius:10px; cursor:pointer; }
  .shd .export-btn svg{ width:15px; height:15px; }

  .shd .kpi-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:18px; }
  .shd .kpi{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px 20px; box-shadow:var(--shadow); }
  .shd .kpi .label{ font-size:12px; color:var(--slate); font-weight:600; text-transform:uppercase; letter-spacing:.04em; }
  .shd .kpi .value{ font-family:'Lexend',sans-serif; font-size:25px; font-weight:700; margin-top:6px; }
  .shd .kpi .sub{ font-size:12px; color:var(--slate-light); margin-top:2px; font-weight:500; }
  .shd .kpi.accent-teal .value{ color:var(--teal-700); }
  .shd .kpi.accent-amber .value{ color:#c07d0f; }
  .shd .kpi.accent-violet .value{ color:var(--violet); }
  .shd .kpi.accent-coral .value{ color:#c94b48; }

  .shd .section{ margin-top:28px; }
  .shd .section-label{ display:flex; align-items:center; gap:9px; margin-bottom:12px; padding-left:2px; }
  .shd .section-label .dot{ width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .shd .section-label h2{ margin:0; font-size:15px; font-weight:700; color:var(--ink); }

  .shd .panel{ animation:fade .25s ease; }
  @keyframes fade{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:none;} }

  .shd .card{ background:var(--card); border:1px solid var(--line); border-radius:18px; padding:22px 24px; box-shadow:var(--shadow); position:relative; }
  .shd .card-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
  .shd .card-head h3{ margin:0; font-size:16px; font-weight:700; }
  .shd .card-head .sub{ font-size:12.5px; color:var(--slate); margin-top:2px; }

  .shd .dots-btn{ width:32px; height:32px; border-radius:9px; border:1px solid var(--line); background:var(--paper); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--slate); }
  .shd .dots-btn:hover{ background:var(--teal-100); color:var(--teal-900); }
  .shd .menu-wrap{ position:relative; }
  .shd .dropdown{ position:absolute; right:0; top:40px; width:280px; background:#fff; border:1px solid var(--line); border-radius:14px; box-shadow:0 12px 32px -8px rgba(15,45,42,.22); padding:16px; z-index:20; display:none; }
  .shd .dropdown.open{ display:block; }
  .shd .dropdown label{ font-size:11.5px; font-weight:700; color:var(--slate); text-transform:uppercase; letter-spacing:.03em; }
  .shd .range-row{ display:flex; gap:8px; margin-top:6px; margin-bottom:14px; }
  .shd .range-row input{ flex:1; border:1px solid var(--line); border-radius:9px; padding:8px 10px; font-size:12.5px; font-family:'JetBrains Mono',monospace; color:var(--ink); min-width:0; }
  .shd .dropdown-btn{ width:100%; background:var(--teal-700); color:#fff; border:none; padding:10px; border-radius:10px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; }
  .shd .dropdown-btn svg{ width:14px; height:14px; }

  .shd .attendance-layout{ display:grid; grid-template-columns:200px 1fr; gap:28px; margin-top:16px; align-items:center; }
  .shd .ring-box{ display:flex; flex-direction:column; align-items:center; }
  .shd .ring-box .big{ font-family:'Lexend',sans-serif; font-size:28px; font-weight:800; fill:var(--teal-900); }
  .shd .ring-box .cap{ font-size:11px; fill:var(--slate); font-weight:600; }
  .shd .legend{ display:flex; gap:16px; margin-top:12px; font-size:12px; color:var(--slate); }
  .shd .legend span{ display:flex; align-items:center; gap:6px; font-weight:600; }
  .shd .legend i{ width:9px; height:9px; border-radius:2px; display:inline-block; }
  .shd .bars{ display:flex; align-items:flex-end; gap:8px; height:150px; padding-top:10px; flex:1; justify-content:space-between; }
  .shd .bar-col{ display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; height:100%; justify-content:flex-end; cursor:pointer; border-radius:8px; transition:background .15s; padding:6px 4px 0; }
  .shd .bar-col:hover{ background:var(--teal-100); }
  .shd .bar-stack{ width:16px; border-radius:5px 5px 3px 3px; overflow:hidden; display:flex; flex-direction:column-reverse; }
  .shd .bar-present{ background:var(--teal-500); }
  .shd .bar-absent{ background:var(--coral); }
  .shd .bar-col .m{ font-size:10.5px; color:var(--slate-light); font-weight:600; transition:color .15s; }
  .shd .bar-col:hover .m{ color:var(--teal-900); }

  .shd .crumbs{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--slate); font-weight:600; margin:16px 0 14px; }
  .shd .crumbs .back-link{ display:flex; align-items:center; gap:5px; color:var(--teal-700); cursor:pointer; }
  .shd .crumbs .back-link:hover{ text-decoration:underline; }
  .shd .crumbs svg{ width:13px; height:13px; }
  .shd .drill-summary{ display:flex; gap:22px; margin-bottom:16px; }
  .shd .drill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; display:flex; align-items:center; gap:6px; }
  .shd .drill-stat b{ font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--ink); }
  .shd .day-grid{ display:grid; grid-template-columns:repeat(7,1fr); gap:7px; }
  .shd .day-cell{ aspect-ratio:1; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; cursor:default; position:relative; }
  .shd .day-cell.present{ background:var(--teal-100); color:var(--teal-900); }
  .shd .day-cell.absent{ background:var(--coral-100); color:#c94b48; }
  .shd .day-cell.holiday{ background:#b9ecee; color:#0a5f56; }
  .shd .day-cell.weekend{ background:#9f818596; color:#5a4548; border:1px dashed var(--line); }
  .shd .day-cell:hover::after{ content:attr(data-tip); position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:var(--ink); color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:10.5px; padding:4px 8px; border-radius:6px; white-space:nowrap; z-index:5; }
  .shd .day-legend{ display:flex; gap:16px; margin-top:16px; font-size:11.5px; color:var(--slate); font-weight:600; }
  .shd .day-legend span{ display:flex; align-items:center; gap:6px; }
  .shd .day-legend i{ width:9px; height:9px; border-radius:3px; display:inline-block; }

  .shd .activity-tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
  .shd .activity-tab{ border:1px solid var(--line); background:var(--paper); padding:9px 15px; border-radius:11px; font-size:13px; font-weight:600; color:var(--slate); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; }
  .shd .activity-tab .ico{ font-size:15px; }
  .shd .activity-tab.active{ background:var(--violet-100); border-color:var(--violet); color:var(--violet); }
  .shd .skill-stats{ display:flex; gap:24px; margin-bottom:14px; flex-wrap:wrap; }
  .shd .skill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; }
  .shd .skill-stat b{ font-family:'JetBrains Mono',monospace; font-size:14px; color:var(--ink); display:block; margin-top:2px; }
  .shd .chart-box{ position:relative; padding-top:6px; }
  .shd .chart-pt{ cursor:pointer; }
  .shd .chart-pt-emoji{ font-size:15px; text-anchor:middle; cursor:pointer; }
  .shd .chart-month-labels{ display:flex; margin-top:4px; }
  .shd .chart-month-labels span{ flex:1; text-align:center; font-size:10.5px; color:var(--slate-light); font-weight:600; }

  .shd .log-list{ display:flex; flex-direction:column; gap:10px; }
  .shd .log-row{ display:flex; align-items:center; justify-content:space-between; padding:11px 14px; background:var(--paper); border:1px solid var(--line); border-radius:12px; }
  .shd .log-left{ display:flex; align-items:center; gap:12px; }
  .shd .log-emoji{ font-size:20px; }
  .shd .log-date{ font-size:12.5px; font-weight:700; }
  .shd .log-note{ font-size:11.5px; color:var(--slate); margin-top:1px; }
  .shd .log-rating{ font-family:'JetBrains Mono',monospace; font-weight:700; font-size:14px; color:var(--violet); }

  .shd .assess-list{ margin-top:16px; display:flex; flex-direction:column; gap:14px; }
  .shd .assess-row{ display:grid; grid-template-columns:130px 1fr 46px 60px; align-items:center; gap:14px; }
  .shd .assess-row .subj{ font-size:13px; font-weight:600; }
  .shd .track{ background:var(--teal-100); border-radius:100px; height:9px; overflow:hidden; }
  .shd .fill{ height:100%; border-radius:100px; background:linear-gradient(90deg,var(--teal-500),var(--teal-700)); }
  .shd .assess-row .pct{ font-family:'JetBrains Mono',monospace; font-size:12.5px; text-align:right; color:var(--slate); }
  .shd .grade-chip{ font-size:11.5px; font-weight:700; text-align:center; padding:4px 0; border-radius:7px; background:var(--teal-100); color:var(--teal-900); }

  /* ---- Promotion status card ---- */
  .shd .promo-badge{ display:flex; align-items:center; gap:12px; margin-top:16px; padding:14px 16px; border-radius:14px; }
  .shd .promo-badge.promoted{ background:var(--teal-100); color:var(--teal-900); }
  .shd .promo-badge.at-risk{ background:var(--amber-100); color:#8a5a10; }
  .shd .promo-badge.not-promoted{ background:var(--coral-100); color:#c94b48; }
  .shd .promo-badge.pending{ background:var(--violet-100); color:var(--violet); }
  .shd .criteria-list{ display:flex; flex-direction:column; gap:8px; margin-top:16px; }
  .shd .criteria-row{ display:flex; align-items:center; gap:10px; font-size:13px; }
  .shd .criteria-icon{ width:20px; height:20px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
  .shd .criteria-icon.ok{ background:var(--teal-100); color:var(--teal-900); }
  .shd .criteria-icon.bad{ background:var(--coral-100); color:#c94b48; }
  .shd .promo-remarks{ margin-top:14px; font-size:13px; color:var(--ink); background:var(--paper); padding:12px 14px; border-radius:12px; font-style:italic; }

  /* ---- Promotion marksheet table ---- */
  .shd .promo-table-wrap{ margin-top:16px; border-radius:14px; overflow:hidden; border:1px solid var(--line); }
  .shd .promo-table{ width:100%; border-collapse:collapse; }
  .shd .promo-table thead tr{ background:var(--teal-700); }
  .shd .promo-table thead th{ color:#fff; text-align:left; padding:13px 20px; font-size:12.5px; font-weight:700; letter-spacing:.01em; }
  .shd .promo-table tbody td{ padding:13px 20px; font-size:13.5px; color:var(--ink); }
  .shd .promo-table tbody tr:nth-child(odd){ background:#eef1f0; }
  .shd .promo-table tbody tr:nth-child(even){ background:var(--teal-100); }
  .shd .promo-table td.subj-cell{ color:var(--teal-700); font-weight:700; }
  .shd .promo-table tfoot tr{ background:var(--teal-700); }
  .shd .promo-table tfoot td{ padding:12px 20px; color:#fff; font-size:12px; font-weight:600; }
  .shd .promo-pagination{ display:flex; align-items:center; gap:8px; justify-content:flex-end; }
  .shd .promo-page-btn{ width:26px; height:26px; border-radius:50%; border:none; background:rgba(255,255,255,.18); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  .shd .promo-page-btn svg{ width:15px; height:15px; }
  .shd .promo-page-btn:disabled{ opacity:.4; cursor:default; }
  .shd .promo-page-btn:hover:not(:disabled){ background:rgba(255,255,255,.3); }

  .shd .wall{ display:flex; gap:14px; margin-top:16px; overflow-x:auto; padding-bottom:6px; }
  .shd .react-card{ min-width:220px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:8px; }
  .shd .react-top{ display:flex; align-items:center; justify-content:space-between; }
  .shd .emoji{ font-size:26px; }
  .shd .react-teacher{ font-size:12.5px; font-weight:700; }
  .shd .react-subj{ font-size:11px; color:var(--slate); font-weight:600; }
  .shd .react-note{ font-size:12.5px; color:var(--ink); line-height:1.45; }
  .shd .react-date{ font-size:10.5px; color:var(--slate-light); font-family:'JetBrains Mono',monospace; }

  /* ---- Invoices: HEADER-only fee table ---- */
  .shd .fee-table-wrap{ margin-top:12px; border-radius:14px; overflow:hidden; border:1px solid var(--line); overflow-x:auto; }
  .shd .fee-table{ width:100%; border-collapse:collapse; min-width:760px; }
  .shd .fee-table thead tr{ background:var(--teal-700); }
  .shd .fee-table thead th{ color:#fff; text-align:left; padding:12px 16px; font-size:11.5px; font-weight:700; letter-spacing:.02em; text-transform:uppercase; white-space:nowrap; }
  .shd .fee-table tbody td{ padding:12px 16px; font-size:13px; color:var(--ink); white-space:nowrap; }
  .shd .fee-table tbody tr:nth-child(odd){ background:#eef1f0; }
  .shd .fee-table tbody tr:nth-child(even){ background:var(--teal-100); }
  .shd .fee-table .fee-purpose-cell{ font-weight:600; white-space:normal; }
  .shd .dl-btn-sm{ background:var(--teal-700); color:#fff; border:none; font-size:11px; font-weight:700; padding:6px 11px; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; gap:5px; }
  .shd .dl-btn-sm svg{ width:12px; height:12px; }

  .shd .status-chip{ font-size:11px; font-weight:700; padding:5px 10px; border-radius:100px; white-space:nowrap; }
  .shd .status-paid{ background:#e3f6ea; color:#1f8a4c; }
  .shd .status-partial{ background:var(--amber-100); color:#8a5a10; }
  .shd .status-pending{ background:var(--coral-100); color:#c94b48; }
  .shd .status-neutral{ background:#f1f3f2; color:var(--slate); }
  .shd .dl-btn{ background:var(--teal-700); color:#fff; border:none; font-size:12px; font-weight:600; padding:8px 14px; border-radius:9px; cursor:pointer; display:flex; align-items:center; gap:6px; }
  .shd .dl-btn svg{ width:13px; height:13px; }

  /* ---- Skeleton loading ---- */
  .shd .sk-block{
    background: linear-gradient(90deg, #e4e9e8 25%, #eef2f1 37%, #e4e9e8 63%);
    background-size: 400% 100%;
    border-radius: 6px;
    animation: sk-shimmer 1.4s ease infinite;
  }
  @keyframes sk-shimmer{
    0%{ background-position: 100% 50%; }
    100%{ background-position: 0% 50%; }
  }
  .shd .sk-profile-bar{
    background: linear-gradient(135deg,var(--teal-900),var(--teal-700));
    border-radius:20px; padding:22px 26px; display:flex; align-items:center;
    justify-content:space-between; gap:20px; box-shadow:var(--shadow);
  }
  .shd .sk-avatar{ width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,.22) !important; animation:none; }
  .shd .sk-profile-bar .profile-left{ display:flex; align-items:center; gap:16px; }

  @media (max-width:780px){
    .shd .kpi-row{ grid-template-columns:repeat(2,1fr); }
    .shd .attendance-layout{ grid-template-columns:1fr; }
    .shd .assess-row{ grid-template-columns:90px 1fr 40px 52px; }
  }
  .shd .weekday-header{
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:7px;
    margin-bottom:8px;
  }
  .shd .weekday-label{
    text-align:center;
    font-size:11px;
    font-weight:700;
    color:var(--slate);
    text-transform:uppercase;
    letter-spacing:.04em;
  }
  .shd .day-cell.empty{
    background:transparent;
    border:none;
    cursor:default;
    pointer-events:none;
  }
`;
// import { useState, useEffect, useMemo } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { AnalyticsDashboardGet } from "../../../store/reducers/Formapireducer";
// import { useNavigate } from "react-router-dom";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import DownloadIcon from "@mui/icons-material/Download";
// import AttendanceReportPDF from "../../pages/pdf/DashAttendance";
// import AssessmentReportPDF from "../../pages/pdf/DashAssesment";
// import PromotionReportPDF from "../../pages/pdf/DashPromotion";
// import PaymentReceipt from "../../pages/pdf/Paymentreceipt2";
// import DashPaymentReceipt from "../../pages/pdf/DashPaymentpdf";

// import { getConfig } from "../../../config";
// import React from "react";
// const PROMOTION_RULES = {
//   minAttendancePercent: 75,
//   minAssessmentPercent: 40,
// };

// const DEFAULT_REACTION_EMOJIS = ["🌟", "👏", "💡", "🎨", "🤝", "✨"];

// const maxAttendanceBarHeight = 130; // px, height of the tallest attendance bar

// function parseDMY(dateStr) {
//   // "06-08-2026" -> Date object for 6 Aug 2026
//   if (!dateStr) return null;
//   const parts = dateStr.split("-").map(Number);
//   if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
//   const [day, month, year] = parts;
//   const d = new Date(year, month - 1, day);
//   return Number.isNaN(d.getTime()) ? null : d;
// }

// function formatShortDate(dateStr) {
//   // "06-08-2026" -> "06 Aug"
//   const d = parseDMY(dateStr);
//   if (!d) return dateStr || "—";
//   return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
// }

// function formatLongDate(dateStr) {
//   // "06-08-2026" -> "06 Aug 2026"
//   const d = parseDMY(dateStr);
//   if (!d) return dateStr || "—";
//   return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// }

// function formatFileSize(kb) {
//   if (!kb) return null; // hide instead of showing "0 KB"
//   return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
// }

// function formatCurrency(amount, currency = "INR") {
//   if (amount === null || amount === undefined) return "—";
//   try {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   } catch {
//     return `${amount}`;
//   }
// }

// function safeEmoji(raw, idx = 0) {
//   if (raw && raw.trim() && raw !== "?") return raw;
//   return DEFAULT_REACTION_EMOJIS[idx % DEFAULT_REACTION_EMOJIS.length];
// }

// function splitTeacherName(raw) {
//   // "Yuva shree || EMP00033" -> { name: "Yuva shree", code: "EMP00033" }
//   if (!raw) return { name: "Teacher", code: "" };
//   const [name, code] = raw.split("||").map((s) => s.trim());
//   return { name: name || raw, code: code || "" };
// }

// function invoiceStatusClass(status) {
//   const s = (status || "").toLowerCase();
//   if (s === "paid" || s === "completed") return "status-paid";
//   if (s.includes("partial")) return "status-partial";
//   if (s === "pending") return "status-pending";
//   return "status-neutral";
// }

// // function emojiForRating(r) {
// //   if (r >= 9) return "🤩";
// //   if (r >= 7) return "🙂";
// //   if (r >= 5) return "😐";
// //   if (r >= 3) return "😕";
// //   return "😣";
// // }
// const ratingEmojis = ["😡", "😞", "😟", "😕", "😐", "🙂", "😊", "😃", "😄", "🤩"];

// const emojiForRating = (rating) => {
//   const num = Number(rating);
//   if (!num || num < 1) return "😡";
//   return ratingEmojis[Math.min(num, 10) - 1];
// };

// function derivePromotionStatus(kpis, apiPromotion) {
//   if (apiPromotion && apiPromotion.status) {
//     return { isComputedLocally: false, ...apiPromotion };
//   }

//   const attendancePct = Number(kpis?.attendance?.percent ?? 0);
//   const assessmentPct = Number(kpis?.assessment?.percent ?? 0);
//   const attendanceOk = attendancePct >= PROMOTION_RULES.minAttendancePercent;
//   const assessmentOk = assessmentPct >= PROMOTION_RULES.minAssessmentPercent;

//   let status = "Under Review";
//   if (attendanceOk && assessmentOk) status = "Promoted";
//   else if (!attendanceOk && !assessmentOk) status = "Not Promoted";
//   else status = "At Risk";

//   return {
//     isComputedLocally: true,
//     status,
//     nextStandardName: null,
//     remarks: null,
//     criteria: [
//       {
//         label: `Attendance ≥ ${PROMOTION_RULES.minAttendancePercent}%`,
//         met: attendanceOk,
//         actual: `${attendancePct}%`,
//       },
//       {
//         label: `Assessment average ≥ ${PROMOTION_RULES.minAssessmentPercent}%`,
//         met: assessmentOk,
//         actual: `${assessmentPct}%`,
//       },
//     ],
//   };
// }

// const PROMOTION_STYLES = {
//   Promoted: { badgeClass: "promo-badge promoted", icon: "🎉" },
//   "At Risk": { badgeClass: "promo-badge at-risk", icon: "⚠️" },
//   "Not Promoted": { badgeClass: "promo-badge not-promoted", icon: "⛔" },
//   "Under Review": { badgeClass: "promo-badge pending", icon: "⏳" },
// };

// /* ============================================================================
//    3. SMALL REUSABLE COMPONENTS
//    ============================================================================ */

// function DotsMenu({ id, openMenu, setOpenMenu, label, onDownload }) {
//   const open = openMenu === id;
//   return (
//     <Box className="menu-wrap">
//       <Box
//         component="button"
//         className="dots-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpenMenu(open ? null : id);
//         }}
//       >
//         <MoreVertIcon style={{ fontSize: 18 }} />
//       </Box>
//       <Box className={`dropdown${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
//         <label>From</label>
//         <Box className="range-row">
//           <input type="date" defaultValue="2026-07-01" />
//         </Box>
//         <label>To</label>
//         <Box className="range-row">
//           <input type="date" defaultValue="2027-06-30" />
//         </Box>
//         <Box
//           component="button"
//           className="dropdown-btn"
//           onClick={() => {
//             if (onDownload) onDownload();
//             setOpenMenu(null);
//           }}
//         >
//           <FileDownloadIcon style={{ fontSize: 16 }} />
//           Download {label} PDF
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// function EmptyState({ text }) {
//   return (
//     <Box style={{ padding: "28px 4px", textAlign: "center", color: "var(--slate-light)", fontSize: 13, fontWeight: 500 }}>
//       {text}
//     </Box>
//   );
// }

// // function PromotionCard({ promotion }) {
// //   const style = PROMOTION_STYLES[promotion.status] || PROMOTION_STYLES["Under Review"];

// //   return (
// //     <Box className="card">
// //       <Box className="card-head">
// //         <Box>
// //           <h3>Promotion status</h3>
// //           <Box className="sub">
// //             {promotion.isComputedLocally
// //               ? "Estimated from this year's attendance & assessment scores"
// //               : "Confirmed by the class teacher"}
// //           </Box>
// //         </Box>
// //       </Box>

// //       <Box className={style.badgeClass}>
// //         <Box component="span" style={{ fontSize: 22, lineHeight: 1 }}>{style.icon}</Box>
// //         <Box>
// //           <Box style={{ fontWeight: 700, fontSize: 15 }}>{promotion.status}</Box>
// //           {promotion.nextStandardName && (
// //             <Box style={{ fontSize: 12.5, opacity: 0.85, marginTop: 2 }}>
// //               Moving to {promotion.nextStandardName}
// //             </Box>
// //           )}
// //         </Box>
// //       </Box>

// //       {promotion.criteria?.length > 0 && (
// //         <Box className="criteria-list">
// //           {promotion.criteria.map((c, i) => (
// //             <Box key={i} className="criteria-row">
// //               <Box component="span" className={`criteria-icon ${c.met ? "ok" : "bad"}`}>
// //                 {c.met ? "✓" : "✕"}
// //               </Box>
// //               <Box style={{ flex: 1 }}>{c.label}</Box>
// //               <Box className="mono" style={{ fontSize: 12.5, color: "var(--slate)" }}>{c.actual}</Box>
// //             </Box>
// //           ))}
// //         </Box>
// //       )}

// //       {promotion.remarks && (
// //         <Box className="promo-remarks">“{promotion.remarks}”</Box>
// //       )}

// //       {promotion.status === "Promoted" && (
// //         <Box component="button" className="dl-btn" style={{ marginTop: 16 }}>
// //           <FileDownloadIcon style={{ fontSize: 15 }} />
// //           Download promotion letter
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // }

// // Promotion marksheet — final subject-wise marks table, styled to match the
// // reference design: teal header row, striped body rows, and a teal footer
// // bar with a "x–y of n" count plus prev/next pagination controls.
// function PromotionMarksheet({ marks, openMenu, setOpenMenu }) {
//   const pageSize = 5;
//   const [page, setPage] = useState(0);

//   const rows = Array.isArray(marks) ? marks : [];

//   const totalPages = Math.max(
//     1,
//     Math.ceil(rows.length / pageSize)
//   );

//   useEffect(() => {
//     setPage(0);
//   }, [rows.length]);

//   const start = page * pageSize;

//   const visible = rows.slice(
//     start,
//     start + pageSize
//   );

//   const from = rows.length === 0
//     ? 0
//     : start + 1;

//   const to = Math.min(
//     start + pageSize,
//     rows.length
//   );

//   return (
//     <>
//       {rows.length === 0 ? (
//         <EmptyState text="No promotion marks recorded yet." />
//       ) : (
//         <Box className="promo-table-wrap">
//           <table className="promo-table">
//             <thead>
//               <tr>
//                 <th style={{ width: 70 }}>SL#</th>
//                 <th>Subjects</th>
//                 <th>Marks</th>
//                 <th>Out Of Marks</th>
//               </tr>
//             </thead>

//             <tbody>
//               {visible.map((m, i) => (
//                 <tr
//                   key={
//                     m.RecordID ??
//                     m.SubjectID ??
//                     start + i
//                   }
//                 >
//                   <td>{start + i + 1}</td>

//                   <td className="subj-cell">
//                     {m.Subject || "-"}
//                   </td>

//                   <td style={{ textAlign: "center" }}>
//                     {m.Marks ?? 0}
//                   </td>

//                   <td style={{ textAlign: "center" }}>
//                     {m.OutOfMarks ?? 0}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//             <tfoot>
//               <tr>
//                 <td colSpan={2}>
//                   {from}-{to} of {rows.length}
//                 </td>

//                 <td colSpan={2}>
//                   <Box className="promo-pagination">
//                     <Box
//                       component="button"
//                       className="promo-page-btn"
//                       disabled={page === 0}
//                       onClick={() =>
//                         setPage((p) =>
//                           Math.max(0, p - 1)
//                         )
//                       }
//                     >
//                       <ChevronLeftIcon
//                         style={{ fontSize: 16 }}
//                       />
//                     </Box>

//                     <Box
//                       component="button"
//                       className="promo-page-btn"
//                       disabled={
//                         page >= totalPages - 1
//                       }
//                       onClick={() =>
//                         setPage((p) =>
//                           Math.min(
//                             totalPages - 1,
//                             p + 1
//                           )
//                         )
//                       }
//                     >
//                       <ChevronRightIcon
//                         style={{ fontSize: 16 }}
//                       />
//                     </Box>
//                   </Box>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </Box>
//       )}
//     </>
//   );
// }

// function SkeletonBlock({ style }) {
//   return <Box className="sk-block" style={style} />;
// }

// function SkeletonCard({ height = 220 }) {
//   return (
//     <Box className="card">
//       <Box className="card-head">
//         <Box style={{ flex: 1 }}>
//           <SkeletonBlock style={{ width: 160, height: 16, marginBottom: 8 }} />
//           <SkeletonBlock style={{ width: 220, height: 12 }} />
//         </Box>
//         <SkeletonBlock style={{ width: 96, height: 32, borderRadius: 9 }} />
//       </Box>
//       <SkeletonBlock style={{ width: "100%", height, marginTop: 16, borderRadius: 14 }} />
//     </Box>
//   );
// }

// function DashboardSkeleton() {
//   return (
//     <Box className="shd">
//       <Box className="wrap">
//         {/* Profile bar */}
//         <Box className="sk-profile-bar">
//           <Box className="profile-left">
//             <Box className="sk-block sk-avatar" />
//             <Box>
//               <SkeletonBlock style={{ width: 160, height: 18, marginBottom: 8, background: "rgba(255,255,255,.25)" }} />
//               <SkeletonBlock style={{ width: 200, height: 12, background: "rgba(255,255,255,.18)" }} />
//             </Box>
//           </Box>
//           <SkeletonBlock style={{ width: 120, height: 34, borderRadius: 100, background: "rgba(255,255,255,.18)" }} />
//         </Box>

//         {/* Year row */}
//         <Box className="year-row">
//           <SkeletonBlock style={{ width: 220, height: 44, borderRadius: 12 }} />
//           <SkeletonBlock style={{ width: 190, height: 40, borderRadius: 10 }} />
//         </Box>

//         {/* KPI row */}
//         <Box className="kpi-row">
//           {[0, 1, 2, 3].map((i) => (
//             <Box className="kpi" key={i}>
//               <SkeletonBlock style={{ width: 90, height: 11, marginBottom: 10 }} />
//               <SkeletonBlock style={{ width: 70, height: 24, marginBottom: 8 }} />
//               <SkeletonBlock style={{ width: 120, height: 11 }} />
//             </Box>
//           ))}
//         </Box>

//         {/* Section cards */}
//         {[
//           { dot: "var(--teal-500)", height: 260 },
//           { dot: "var(--amber)", height: 200 },
//           { dot: "var(--teal-900)", height: 160 },
//           { dot: "var(--violet)", height: 220 },
//         ].map((s, i) => (
//           <Box className="section" key={i}>
//             <Box className="section-label">
//               <Box component="span" className="dot" style={{ background: s.dot }}></Box>
//               <SkeletonBlock style={{ width: 140, height: 14 }} />
//             </Box>
//             <Box className="panel">
//               <SkeletonCard height={s.height} />
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }
// class PdfErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }
//   componentDidCatch(error, info) {
//     console.error("PDF render error:", error, info);
//   }
//   componentDidUpdate(prevProps) {
//     // reset the boundary when the term changes so it can try again
//     if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
//       this.setState({ hasError: false });
//     }
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box component="button" className="dl-btn" type="button" disabled>
//           Download unavailable
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }
// export default function StudentHistoryDashboard() {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const recID = params.id;
//   const CompanyID = sessionStorage.getItem("compID");
//   const navigate = useNavigate();

//   const [selectedYear, setSelectedYear] = useState(null);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [monthDrillIdx, setMonthDrillIdx] = useState(null);
//   const [currentActivityIndex, setCurrentActivityIndex] = useState(null);
//   const [skillDrillIdx, setSkillDrillIdx] = useState(null);
//   const [selectedTermIdx, setSelectedTermIdx] = useState(-1);
//   const [footerHeight, setFooterHeight] = useState(60);
//   const config = getConfig();
//   const baseurl1 = config.UAAM_URL;
//   const getTodayDate = () => {
//     const today = new Date();

//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const year = today.getFullYear();

//     return `${day}/${month}/${year}`;
//   };
//   const getCurrentAcademicYear = () => {
//     const currentYear = new Date().getFullYear();
//     const nextYear = String(currentYear + 1).slice(-2);

//     return `${currentYear}-${nextYear}`;
//   };

//   console.log(getCurrentAcademicYear());
//   // 2026-27
//   const analyticsState = useSelector((state) => state.formApi?.AnalyticsDashboardGetData) || {};
//   const apiData = Object.keys(analyticsState).length > 0 ? analyticsState : null;
//   const loading = !apiData;
//   const error = null;

//   const academicYear = selectedYear || apiData?.activeYear || getCurrentAcademicYear();

//   useEffect(() => {
//     dispatch(
//       AnalyticsDashboardGet({

//         data: { CompanyID, StudentID: recID, AcademicYear: academicYear },
//       })
//     );

//   }, [recID, selectedYear]);

//   useEffect(() => {
//     setMonthDrillIdx(null);
//     setSkillDrillIdx(null);
//     setSelectedTermIdx(null);
//   }, [academicYear, apiData?.attendance?.months]);

//   const activities = (apiData?.skills?.activities || []).filter(
//     (a) => a.label && a.label.trim()
//   );
//   useEffect(() => {
//     if (currentActivityIndex === null && activities.length > 0) {
//       setCurrentActivityIndex(0);
//     }
//   }, [activities, currentActivityIndex]);

//   // ---- derive everything the UI needs from the raw API payload ----
//   const student = apiData?.student || {};
//   const kpis = apiData?.kpis || {};
//   const months = apiData?.attendance?.months || [];
//   const invoices = apiData?.invoices || [];
//   const teacherWall = apiData?.teacherWall || [];
//   const availableYears = apiData?.availableYears?.length
//     ? apiData.availableYears
//     : academicYear
//       ? [academicYear]
//       : [];

//   const promotionMarks = apiData?.Promotion || [];

//   const assessmentPerformance = apiData?.assessmentPerformance || {};
//   const assessmentTerms = assessmentPerformance.terms || [];
//   const assessmentOverall = assessmentPerformance.overall || [];
//   const legacyAssessments = apiData?.assessments || [];

//   useEffect(() => {
//     // Reset to Overall whenever academic year/data changes
//     setSelectedTermIdx(-1);
//   }, [academicYear, assessmentTerms.length]);

//   const activeTerm =
//     selectedTermIdx >= 0 ? assessmentTerms[selectedTermIdx] : null;

//   const termSubjects =
//     activeTerm?.subjects || activeTerm?.assessments || [];

//   const assessmentsToShow =
//     selectedTermIdx === -1
//       ? assessmentOverall.length > 0
//         ? assessmentOverall
//         : legacyAssessments
//       : termSubjects;
//   // const assessmentData = Array.isArray(assessmentsToShow)
//   //   ? assessmentsToShow.map((item) => ({
//   //     subject:
//   //       item?.subject ??
//   //       item?.subjectName ??
//   //       item?.name ??
//   //       "-",

//   //     percent: Number(
//   //       item?.percent ??
//   //       item?.score ??
//   //       0
//   //     ),

//   //     grade: item?.grade ?? "—",
//   //   }))
//   //   : [];
//   const assessmentData = useMemo(() => {
//     const list = Array.isArray(assessmentsToShow) ? assessmentsToShow : [];
//     return list.map((item) => ({
//       subject: item?.subject ?? item?.subjectName ?? item?.name ?? "-",
//       percent: Number.isFinite(Number(item?.percent ?? item?.score))
//         ? Number(item?.percent ?? item?.score)
//         : 0,
//       grade: item?.grade ?? "—",
//     }));
//   }, [assessmentsToShow]);
//   console.log(assessmentData, "assessmentData")
//   const activeTermLabel =
//     selectedTermIdx === -1
//       ? "Overall"
//       : activeTerm?.label || activeTerm?.term || activeTerm?.name || null;

//   const promotion = useMemo(
//     () => derivePromotionStatus(kpis, apiData?.promotion),
//     [kpis, apiData]
//   );

//   const pctAttendance = kpis?.attendance?.percent ?? 0;
//   const ringR = 66;
//   const ringCirc = 2 * Math.PI * ringR;
//   const ringOffset = ringCirc * (1 - pctAttendance / 100);

//   const selectedMonth = monthDrillIdx !== null ? months[monthDrillIdx] || null : null;
//   const dayGrid = selectedMonth?.days || [];
//   const dayCounts = dayGrid.reduce((acc, d) => {
//     acc[d.status] = (acc[d.status] || 0) + 1;
//     return acc;
//   }, {});
//   const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Weekday (0=Sun..6=Sat) that day 1 of the selected month falls on,
//   // used to pad the grid so real days line up under the correct weekday.
//   const leadingBlanks = selectedMonth
//     ? new Date(`${selectedMonth.fullLabel} 1, ${selectedMonth.year}`).getDay()
//     : 0;
//   const activeActivity = currentActivityIndex !== null ? activities[currentActivityIndex] : activities[0];
//   const monthlyRatings = activeActivity?.monthlyRatings || [];
//   const sessionsByMonth = activeActivity?.sessions || [];

//   const ratedMonths = monthlyRatings
//     .map((m, i) => ({ ...m, i }))
//     .filter((m) => m.rating !== null && m.rating !== undefined);
//   const ratingValues = ratedMonths.map((m) => m.rating);
//   const skCurrent = activeActivity?.stats?.currentRating ??
//     (ratingValues.length ? ratingValues[ratingValues.length - 1] : null);
//   const skHigh = activeActivity?.stats?.highest ??
//     (ratingValues.length ? Math.max(...ratingValues) : null);
//   const skLow = activeActivity?.stats?.lowest ??
//     (ratingValues.length ? Math.min(...ratingValues) : null);
//   const skAvg = activeActivity?.stats?.sixMonthAvg ??
//     (ratingValues.length ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1) : null);

//   const chartW = 620, chartH = 150, padX = 30, padTop = 20, padBottom = 10;
//   const usableW = chartW - padX * 2;
//   const usableH = chartH - padTop - padBottom;

//   const pts = ratedMonths.map((m) => ({
//     x: padX + (monthlyRatings.length > 1 ? (m.i / (monthlyRatings.length - 1)) * usableW : usableW / 2),
//     y: padTop + (1 - (m.rating - 1) / 9) * usableH,
//     r: m.rating,
//     i: m.i,
//     label: m.label,
//   }));
//   const linePath = pts.map((p, i) => (i === 0 ? "M" : "L") + p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" ");
//   const areaPath = pts.length > 1
//     ? `${linePath} L${pts[pts.length - 1].x.toFixed(1)} ${chartH - padBottom} L${pts[0].x.toFixed(1)} ${chartH - padBottom} Z`
//     : "";
//   const sessionLog = skillDrillIdx !== null ? sessionsByMonth[skillDrillIdx] || [] : [];

//   function refetch() {
//     dispatch(AnalyticsDashboardGet({ data: { CompanyID, StudentID: recID, AcademicYear: selectedYear } }));
//   }

//   // ---- loading / error guards (kept simple on purpose) ----
//   if (loading && !apiData) {
//     return (
//       <Box onClick={() => setOpenMenu(null)}>
//         <style>{SHD_STYLES}</style>
//         <DashboardSkeleton />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box className="shd">
//         <style>{SHD_STYLES}</style>
//         <Box className="wrap">
//           <Box className="card" style={{ textAlign: "center", padding: 40 }}>
//             <Box style={{ fontWeight: 700, marginBottom: 8 }}>Couldn't load this student's history</Box>
//             <Box className="sub" style={{ marginBottom: 16 }}>
//               {typeof error === "string" ? error : "Please try again."}
//             </Box>
//             <Box component="button" className="export-btn" onClick={refetch}>Retry</Box>
//           </Box>
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box onClick={() => setOpenMenu(null)}>
//       <style>{SHD_STYLES}</style>

//       <Box className="shd">
//         <Box className="wrap">

//           {/* Profile bar */}
//           <Box className="profile-bar">
//             <Box className="profile-left">
//               <Box className="avatar">{student.initials || "—"}</Box>
//               <Box>
//                 <h1>{student.name || "Student"}</h1>
//                 <Box className="meta">
//                   {student.standards?.[0]?.StandardName || "—"} &nbsp;·&nbsp; {student.school || "—"}
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="profile-right">
//               <Box component="span" className="id-chip">{student.code || "—"}</Box>
//               <Box component="button" className="back-pill" onClick={() => navigate(-1)}>
//                 <ArrowBackIcon style={{ fontSize: 15 }} />
//                 Back to list
//               </Box>
//             </Box>
//           </Box>

//           {/* Year selector + export */}
//           <Box className="year-row">
//             <Box className="year-tabs">
//               {availableYears.map((y) => (
//                 <Box
//                   component="button"
//                   key={y}
//                   className={`year-tab${academicYear === y ? " active" : ""}`}
//                   onClick={() => setSelectedYear(y)}
//                 >
//                   {y}
//                 </Box>
//               ))}
//             </Box>
//             {/* <Box component="button" className="export-btn">
//               <FileDownloadIcon style={{ fontSize: 16 }} />
//               Export full year report
//             </Box> */}
//           </Box>

//           {/* KPI summary */}
//           <Box className="kpi-row">
//             <Box className="kpi accent-teal">
//               <Box className="label">Attendance</Box>
//               <Box className="value">{kpis.attendance?.percent ?? 0}%</Box>
//               <Box className="sub">
//                 {kpis.attendance?.presentDays ?? 0} / {kpis.attendance?.totalDays ?? 0} days present
//               </Box>
//             </Box>
//             <Box className="kpi accent-amber">
//               <Box className="label">Avg. Assessment</Box>
//               <Box className="value">{kpis.assessment?.grade ?? "—"}</Box>
//               <Box className="sub">{kpis.assessment?.percent ?? 0}% across {kpis.assessment?.subjectCount ?? 0} subjects</Box>
//             </Box>
//             <Box className="kpi accent-violet">
//               <Box className="label">Skill Growth</Box>
//               <Box className="value">
//                 {kpis.skillGrowth?.percentChange > 0 ? "+" : ""}{kpis.skillGrowth?.percentChange ?? 0}%
//               </Box>
//               <Box className="sub">vs. {(kpis.skillGrowth?.comparedTo || "previous term").replace(/_/g, " ")}</Box>
//             </Box>
//             <Box className="kpi accent-coral">
//               <Box className="label">Fees Paid</Box>
//               <Box className="value mono">{formatCurrency(kpis.fees?.paidAmount, kpis.fees?.currency)}</Box>
//               <Box className="sub">
//                 {kpis.fees?.dueAmount > 0 ? `${formatCurrency(kpis.fees.dueAmount, kpis.fees.currency)} due` : "Fully paid"}
//               </Box>
//             </Box>
//           </Box>

//           {/* ATTENDANCE SECTION */}
//           <Box className="section">
//             <Box className="section-label"><Box component="span" className="dot" style={{ background: "var(--teal-500)" }}></Box><h2>Attendance</h2></Box>
//             <Box className="panel">
//               <Box className="card">
//                 <Box className="card-head">
//                   <Box>
//                     <h3>Attendance overview</h3>
//                     <Box className="sub">
//                       Click a month to see day-by-day attendance
//                     </Box>
//                   </Box>

//                   <PDFDownloadLink
//                     document={
//                       <AttendanceReportPDF
//                         studentName={student.name}
//                         academicYear={academicYear}
//                         attendancePercentage={pctAttendance}
//                         months={months}
//                         filters={{
//                           Imageurl: baseurl1,
//                           HeaderImg: sessionStorage.getItem("CompanyHeader"),
//                           FooterImg: sessionStorage.getItem("CompanyFooter"),
//                           CompanySignature: sessionStorage.getItem("CompanySignature"),
//                         }}
//                         footerHeight={footerHeight}
//                       />
//                     }
//                     fileName="Attendance_Report.pdf"
//                     style={{ textDecoration: "none" }}
//                   >
//                     {({ loading }) => (
//                       <Box component="button" className="dl-btn">
//                         <FileDownloadIcon style={{ fontSize: 15 }} />
//                         {loading ? "Preparing..." : "Download"}
//                       </Box>
//                     )}
//                   </PDFDownloadLink>
//                 </Box>

//                 {months.length === 0 ? (
//                   <EmptyState text="No attendance records for this academic year yet." />
//                 ) : !selectedMonth ? (
//                   // Overview: month-by-month bar chart. Keyed so React always fully
//                   // swaps this subtree out for the drilldown below rather than
//                   // reconciling between two very different layouts.
//                   <Box key="overview" className="attendance-layout">
//                     <Box className="ring-box">
//                       <svg width="160" height="160" viewBox="0 0 160 160">
//                         <circle cx="80" cy="80" r={ringR} fill="none" stroke="#eef4f3" strokeWidth="16" />
//                         <circle cx="80" cy="80" r={ringR} fill="none" stroke="var(--teal-500)" strokeWidth="16"
//                           strokeDasharray={ringCirc.toFixed(1)} strokeDashoffset={ringOffset.toFixed(1)}
//                           strokeLinecap="round" transform="rotate(-90 80 80)" />
//                         <text x="80" y="76" textAnchor="middle" className="big">{pctAttendance}%</text>
//                         <text x="80" y="96" textAnchor="middle" className="cap">PRESENT</text>
//                       </svg>
//                       <Box className="legend">
//                         <Box component="span"><i style={{ background: "var(--teal-500)" }}></i>Present</Box>
//                         <Box component="span"><i style={{ background: "var(--coral)" }}></i>Absent</Box>
//                       </Box>
//                     </Box>

//                     <Box className="bars">
//                       {months.map((month, i) => {
//                         const total = month.present + month.absent;
//                         const pH = total ? (month.present / total) * maxAttendanceBarHeight : 0;
//                         const aH = total ? (month.absent / total) * maxAttendanceBarHeight : 0;
//                         return (
//                           <Box key={month.label + month.year} className="bar-col" onClick={() => setMonthDrillIdx(i)}>
//                             <Box className="bar-stack" style={{ height: pH + aH }}>
//                               <Box className="bar-absent" style={{ height: aH }}></Box>
//                               <Box className="bar-present" style={{ height: pH }}></Box>
//                             </Box>
//                             <Box className="m">{month.label}</Box>
//                           </Box>
//                         );
//                       })}
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box key={`drill-${monthDrillIdx}`}>
//                     <Box className="crumbs">
//                       <Box component="span" className="back-link" onClick={() => setMonthDrillIdx(null)}>
//                         <ArrowBackIcon style={{ fontSize: 14 }} />
//                         Back to overview
//                       </Box>
//                       <Box component="span">›</Box>
//                       <Box component="span" style={{ color: "var(--ink)" }}>
//                         {selectedMonth.fullLabel} {selectedMonth.year}
//                       </Box>
//                     </Box>
//                     <Box className="drill-summary">
//                       <Box className="drill-stat">Present <b>{dayCounts.present || 0} days</b></Box>
//                       <Box className="drill-stat">Absent <b>{dayCounts.absent || 0} days</b></Box>
//                       <Box className="drill-stat">Holidays <b>{dayCounts.holiday || 0} days</b></Box>
//                     </Box>

//                     {/* Weekday header row */}
//                     <Box className="weekday-header">
//                       {WEEKDAY_LABELS.map((wd) => (
//                         <Box key={wd} className="weekday-label">{wd}</Box>
//                       ))}
//                     </Box>

//                     {/* Calendar grid: leading blanks + actual days */}
//                     <Box className="day-grid">
//                       {Array.from({ length: leadingBlanks }).map((_, i) => (
//                         <Box key={`blank-${i}`} className="day-cell empty" />
//                       ))}
//                       {dayGrid.map((d) => (
//                         <Box key={d.day} className={`day-cell ${d.status}`}
//                           data-tip={`${selectedMonth.label} ${d.day} · ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}`}>
//                           {d.day}
//                         </Box>
//                       ))}
//                     </Box>

//                     <Box className="day-legend">
//                       <Box component="span"><i style={{ background: "var(--teal-100)" }}></i>Present</Box>
//                       <Box component="span"><i style={{ background: "var(--coral-100)" }}></i>Absent</Box>
//                       <Box component="span"><i style={{ background: "#b9ecee" }}></i>Holiday</Box>
//                       <Box component="span"><i style={{ background: "#9f818596", border: "1px dashed var(--line)" }}></i>Weekend</Box>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//             {/* <AttendanceReportPDF
//               studentName={student.name}
//               academicYear={academicYear}
//               attendancePercentage={pctAttendance}
//               months={months}
//               selectedMonth={selectedMonth}
//               dayGrid={dayGrid}
//             /> */}
//           </Box>

//           {/* ASSESSMENT SECTION */}
//           <Box className="section">
//             <Box className="section-label"><Box component="span" className="dot" style={{ background: "var(--amber)" }}></Box><h2>Assessment</h2></Box>
//             <Box className="panel">
//               <Box className="card">
//                 <Box className="card-head">
//                   <Box>
//                     <h3>Assessment performance</h3>
//                     <Box className="sub">
//                       Subject-wise scores · {activeTermLabel}
//                     </Box>
//                   </Box>
//                   <PdfErrorBoundary resetKey={selectedTermIdx}>
//                     {assessmentData.length > 0 && (
//                       <PDFDownloadLink
//                         key={selectedTermIdx} // forces clean remount per tab
//                         document={
//                           <AssessmentReportPDF
//                             studentName={student?.name || ""}
//                             academicYear={academicYear || ""}
//                             termLabel={activeTermLabel || "Overall"}
//                             assessments={assessmentData}
//                             filters={{
//                               Imageurl: baseurl1,
//                               HeaderImg: sessionStorage.getItem("CompanyHeader"),
//                               FooterImg: sessionStorage.getItem("CompanyFooter"),
//                               CompanySignature: sessionStorage.getItem("CompanySignature"),
//                             }}
//                             footerHeight={footerHeight}
//                           />
//                         }
//                         fileName="Assessment_Report.pdf"
//                         style={{ textDecoration: "none" }}
//                       >
//                         {({ loading, error }) =>
//                           error ? (
//                             <Box className="dl-btn">Download unavailable</Box>
//                           ) : (
//                             <Box component="button" className="dl-btn" type="button">
//                               <FileDownloadIcon style={{ fontSize: 15 }} />
//                               {loading ? "Preparing..." : "Download"}
//                             </Box>
//                           )
//                         }
//                       </PDFDownloadLink>
//                     )}
//                   </PdfErrorBoundary>
//                   {/* <DotsMenu id="assessment" openMenu={openMenu} setOpenMenu={setOpenMenu} label="assessment" /> */}
//                 </Box>

//                 {(assessmentOverall.length > 0 || assessmentTerms.length > 0) && (
//                   <Box className="activity-tabs" style={{ marginTop: 14 }}>
//                     {/* Overall Tab */}
//                     <Box
//                       component="button"
//                       className={`activity-tab${selectedTermIdx === -1 ? " active" : ""}`}
//                       onClick={() => setSelectedTermIdx(-1)}
//                     >
//                       Overall
//                     </Box>

//                     {/* Term Tabs */}
//                     {assessmentTerms.map((t, i) => (
//                       <Box
//                         component="button"
//                         key={t.termId ?? t.id ?? i}
//                         className={`activity-tab${selectedTermIdx === i ? " active" : ""}`}
//                         onClick={() => setSelectedTermIdx(i)}
//                       >
//                         {t.label || t.term || t.name || `Term ${i + 1}`}
//                       </Box>
//                     ))}
//                   </Box>
//                 )}

//                 {assessmentData.length === 0 ? (
//                   <EmptyState text="No assessment scores recorded yet." />
//                 ) : (
//                   <Box className="assess-list">
//                     {assessmentData.map((a, i) => (
//                       <Box
//                         key={`${a.subject}-${i}`}
//                         className="assess-row"
//                       >
//                         <Box className="subj">
//                           {a.subject}
//                         </Box>

//                         <Box className="track">
//                           <Box
//                             className="fill"
//                             style={{
//                               width: `${Math.min(
//                                 Math.max(a.percent, 0),
//                                 100
//                               )}%`,
//                             }}
//                           />
//                         </Box>

//                         <Box className="pct">
//                           {a.percent}%
//                         </Box>

//                         <Box className="grade-chip">
//                           {a.grade}
//                         </Box>
//                       </Box>
//                     ))}
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Box>

//           {/* PROMOTION SECTION */}
//           <Box className="section">

//             <Box className="section-label">
//               <Box
//                 component="span"
//                 className="dot"
//                 style={{
//                   background: "var(--teal-900)",
//                 }}
//               />

//               <h2>Promotion</h2>
//             </Box>

//             <Box
//               className="panel"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 16,
//               }}
//             >
//               <Box className="card">

//                 {/* Card Header */}
//                 <Box
//                   className="card-head"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Box>
//                     <h3>Promotion Marksheet</h3>

//                     <Box className="sub">
//                       Final subject-wise marks
//                     </Box>
//                   </Box>

//                   {/* PDF Download Button */}
//                   {promotionMarks.length > 0 && (
//                     <PDFDownloadLink
//                       document={
//                         <PromotionReportPDF
//                           studentName={student?.name || ""}
//                           academicYear={academicYear || ""}
//                           promotionMarks={promotionMarks}
//                           filters={{
//                             Imageurl: baseurl1,
//                             HeaderImg:
//                               sessionStorage.getItem("CompanyHeader"),
//                             FooterImg:
//                               sessionStorage.getItem("CompanyFooter"),
//                             CompanySignature:
//                               sessionStorage.getItem("CompanySignature"),
//                           }}
//                           footerHeight={footerHeight}
//                         />
//                       }
//                       fileName="Promotion_Marksheet.pdf"
//                       style={{
//                         textDecoration: "none",
//                       }}
//                     >
//                       {({ loading }) => (
//                         <Box
//                           component="button"
//                           className="dl-btn"
//                           type="button"
//                         >
//                           <FileDownloadIcon
//                             style={{ fontSize: 15 }}
//                           />

//                           {loading
//                             ? "Preparing..."
//                             : "Download"}
//                         </Box>
//                       )}
//                     </PDFDownloadLink>
//                   )}
//                 </Box>

//                 {/* Promotion Table */}
//                 <PromotionMarksheet
//                   marks={promotionMarks}
//                   openMenu={openMenu}
//                   setOpenMenu={setOpenMenu}
//                 />

//               </Box>
//             </Box>

//           </Box>
//           {/* <Box className="section">
//             <Box className="section-label">
//               <Box component="span" className="dot" style={{ background: "var(--teal-900)" }}></Box><h2>Promotion</h2></Box>

//             <Box className="panel" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               <PromotionMarksheet marks={promotionMarks} openMenu={openMenu} setOpenMenu={setOpenMenu} />
//             </Box>
//           </Box> */}

//           {/* SKILLS SECTION */}
//           <Box className="section">
//             <Box className="section-label">
//               <Box component="span" className="dot" style={{ background: "var(--violet)" }}></Box><h2>Skill Identification</h2></Box>
//             <Box className="panel">
//               <Box className="card">
//                 <Box className="card-head">
//                   <Box>
//                     <h3>Skill identification</h3>
//                     <Box className="sub">Observed by teachers across the year</Box>
//                   </Box>
//                   {/* <DotsMenu id="skills" openMenu={openMenu} setOpenMenu={setOpenMenu} label="skill report" /> */}

//                 </Box>

//                 {activities.length === 0 ? (
//                   <EmptyState text="No skill observations recorded for this student yet." />
//                 ) : (
//                   <>
//                     <Box className="activity-tabs">
//                       {activities.map((act, i) => (
//                         <Box component="button" key={`${act.key || "activity"}-${i}`} className={`activity-tab${currentActivityIndex === i ? " active" : ""}`}
//                           onClick={() => { setCurrentActivityIndex(i); setSkillDrillIdx(null); }}>
//                           <Box component="span" className="ico">{act.icon}</Box>{act.label}
//                         </Box>
//                       ))}
//                     </Box>

//                     {skillDrillIdx === null ? (
//                       <Box>
//                         <Box className="skill-stats">
//                           <Box className="skill-stat">Current rating<b>{skCurrent ?? "—"} {skCurrent !== null && emojiForRating(skCurrent)}</b></Box>
//                           <Box className="skill-stat">Highest<b>{skHigh ?? "—"}</b></Box>
//                           <Box className="skill-stat">Lowest<b>{skLow ?? "—"}</b></Box>
//                           <Box className="skill-stat">Avg<b>{skAvg ?? "—"}</b></Box>
//                         </Box>
//                         {pts.length === 0 ? (
//                           <EmptyState text="No monthly ratings recorded for this activity yet." />
//                         ) : (
//                           <Box className="chart-box">
//                             <svg width="100%" height="150" viewBox="0 0 620 150" preserveAspectRatio="none" style={{ overflow: "visible" }}>
//                               <defs>
//                                 <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
//                                   <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
//                                   <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
//                                 </linearGradient>
//                               </defs>
//                               <path d={areaPath} fill="url(#skillGrad)" stroke="none"></path>
//                               <path d={linePath} fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path>
//                               {pts.map((p) => (
//                                 <g key={p.i} style={{ cursor: "pointer" }} onClick={() => setSkillDrillIdx(p.i)}>
//                                   <circle className="chart-pt" cx={p.x} cy={p.y} r="4" fill="#fff" stroke="var(--violet)" strokeWidth="2.5" />
//                                   <text className="chart-pt-emoji" x={p.x} y={p.y - 14}>{emojiForRating(p.r)}</text>
//                                 </g>
//                               ))}
//                             </svg>
//                             <Box className="chart-month-labels">
//                               {monthlyRatings.map((m) => <Box component="span" key={m.label}>{m.label}</Box>)}
//                             </Box>
//                           </Box>
//                         )}
//                         <Box className="sub" style={{ marginTop: 10 }}>Click a point to see individual session ratings for that month.</Box>
//                       </Box>
//                     ) : (
//                       <Box>
//                         <Box className="crumbs">
//                           <Box component="span" className="back-link" onClick={() => setSkillDrillIdx(null)}>
//                             <ArrowBackIcon style={{ fontSize: 14 }} />
//                             Back to trend
//                           </Box>
//                           <Box component="span">›</Box>
//                           <Box component="span" style={{ color: "var(--ink)" }}>
//                             {activeActivity.icon} {activeActivity.label} · {monthlyRatings[skillDrillIdx]?.label} {monthlyRatings[skillDrillIdx]?.year} sessions
//                           </Box>
//                         </Box>
//                         {sessionLog.length === 0 ? (
//                           <EmptyState text="No individual sessions logged for this month." />
//                         ) : (
//                           <Box className="log-list">
//                             {sessionLog.map((s, idx) => (
//                               <Box key={idx} className="log-row">
//                                 <Box className="log-left">
//                                   <Box component="span" className="log-emoji">{emojiForRating(s.rating)}</Box>
//                                   <Box>
//                                     <Box className="log-date">{formatLongDate(s.date)}</Box>
//                                     <Box className="log-note">{s.note}</Box>
//                                   </Box>
//                                 </Box>
//                                 <Box className="log-rating">{s.rating}/10</Box>
//                               </Box>
//                             ))}
//                           </Box>
//                         )}
//                       </Box>
//                     )}
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </Box>

//           {/* TEACHER WALL SECTION */}
//           <Box className="section">
//             <Box className="section-label"><Box component="span" className="dot" style={{ background: "#f26d6d" }}></Box><h2>Teacher Wall</h2></Box>
//             <Box className="panel">
//               <Box className="card">
//                 <Box className="card-head">
//                   <Box>
//                     <h3>Teacher wall</h3>
//                     <Box className="sub">Reactions & appreciation from subject teachers</Box>
//                   </Box>
//                   {/* <DotsMenu id="reactions" openMenu={openMenu} setOpenMenu={setOpenMenu} label="teacher wall" /> */}
//                 </Box>
//                 {teacherWall.length === 0 ? (
//                   <EmptyState text="No teacher reactions yet." />
//                 ) : (
//                   <Box className="wall">
//                     {teacherWall.map((r, idx) => {
//                       const { name } = splitTeacherName(r.teacherName);
//                       return (
//                         <Box key={r.id ?? idx} className="react-card">
//                           <Box className="react-top">
//                             <Box component="span" className="emoji">{safeEmoji(r.emoji, idx)}</Box>
//                             <Box component="span" className="react-date">{formatShortDate(r.date)}</Box>
//                           </Box>
//                           <Box className="react-teacher">{name}</Box>
//                           <Box className="react-subj">{r.subject}</Box>
//                           <Box className="react-note">{r.note}</Box>
//                         </Box>
//                       );
//                     })}
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Box>

//           {/* INVOICES SECTION */}
//            <Box className="section">
//             <Box className="section-label"><Box component="span" className="dot" style={{ background: "#3fb1e0" }}></Box><h2>Invoices</h2></Box>
//             <Box className="panel">
//               <Box className="card">
//                 <Box className="card-head">
//                   <Box>
//                     <h3>Fee Records</h3>
//                     <Box className="sub">{academicYear} academic year</Box>
//                   </Box>

//                   {/* ---- ONE consolidated PDF for the whole section ---- */}
//                   {invoices.length > 0 && (
//                     <PDFDownloadLink
//                       document={
//                         <DashPaymentReceipt
//                           data={{
//                             Employee: invoices[0]?.ReceiverName,
//                             EmployeeID: invoices[0]?.EmployeeCode,
//                             FilterEmployee: invoices[0]?.FilterEmployee,
//                             MobileNo: invoices[0]?.ReceiverMobileNo,
//                             EmailID: invoices[0]?.ReceiverEmailID,
//                             Address: invoices[0]?.ReceiverAddress,
//                             CompanyName: invoices[0]?.CompanyName,
//                             AcademicYear: academicYear,
//                             invoices: invoices,
//                           }}
//                           filters={{
//                             Imageurl: baseurl1,
//                             HeaderImg: sessionStorage.getItem("CompanyHeader"),
//                             FooterImg: sessionStorage.getItem("CompanyFooter"),
//                             CompanySignature: sessionStorage.getItem("CompanySignature"),
//                           }}
//                           footerHeight={footerHeight}
//                         />
//                       }
//                       fileName={`Fee_Records_${invoices[0]?.FilterEmployee || "Student"}_${academicYear}.pdf`}
//                       style={{ textDecoration: "none" }}
//                     >
//                       {({ loading }) => (
//                         <Box component="button" className="dl-btn">
//                           <FileDownloadIcon style={{ fontSize: 15 }} />
//                           {loading ? "Preparing..." : "Download"}
//                         </Box>
//                       )}
//                     </PDFDownloadLink>
//                   )}
//                 </Box>
//                 {invoices.length === 0 ? (
//                   <EmptyState text="No invoices raised for this academic year yet." />
//                 ) : (
//                   <Box>
//                     {invoices.map((inv) => {
//                       const size = formatFileSize(inv.fileSizeKb);
//                       return (
//                         <Box key={inv.id} className="inv-row">
//                           <Box className="inv-left">
//                             <Box className="inv-icon">
//                               {inv.kind === "doc" ? (
//                                 <DescriptionOutlinedIcon style={{ fontSize: 18 }} />
//                               ) : (
//                                 <CheckCircleOutlineIcon style={{ fontSize: 18 }} />
//                               )}
//                             </Box>
//                             <Box>
//                               <Box className="inv-title">{inv.title}</Box>
//                               <Box className="inv-date">
//                                 {formatLongDate(inv.issuedDate)}{size ? ` · ${size}` : ""}
//                               </Box>
//                             </Box>
//                           </Box>
//                           <Box className="inv-right">
//                             <Box component="span" className={`status-chip ${invoiceStatusClass(inv.PaidAmount)}`}>{inv.PaidAmount}</Box>
//                             <Box component="span" className={`status-chip ${invoiceStatusClass(inv.InvoiceStatus)}`}>{inv.InvoiceStatus}</Box>
//                           </Box>
//                         </Box>
//                       );
//                     })}
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Box>


//         </Box>
//       </Box>
//     </Box>
//   );
// }

// /* ============================================================================
//    4. STYLES
//    Pulled into a constant so both the skeleton and the loaded page can share
//    exactly the same CSS (added: .sk-* skeleton/shimmer rules at the bottom,
//    .promo-table-* rules for the new promotion marksheet).
//    ============================================================================ */

// const SHD_STYLES = `
//   :root{
//     --teal-900:#0a5f56; --teal-700:#0f9b8e; --teal-500:#17b8a6; --teal-100:#e3f5f2;
//     --ink:#1c2b2a; --slate:#66787a; --slate-light:#93a3a4; --paper:#f4f8f7; --card:#ffffff;
//     --line:#e2ebe9; --amber:#f2a93b; --amber-100:#fdf1dc; --coral:#ef6f6c; --coral-100:#fde9e8;
//     --violet:#7c6cf0; --violet-100:#ecebfd;
//     --shadow: 0 1px 2px rgba(15,45,42,.04), 0 8px 24px -12px rgba(15,45,42,.12);
//   }
//   .shd *{box-sizing:border-box;}
//   .shd{ margin:0; background:var(--paper); color:var(--ink); font-family:'Inter',sans-serif; -webkit-font-smoothing:antialiased; }
//   .shd h1,.shd h2,.shd h3{ font-family:'Lexend',sans-serif; }
//   .shd .mono{ font-family:'JetBrains Mono',monospace; letter-spacing:-.02em; }
//   .shd .wrap{ max-width:1180px; margin:0 auto; padding:28px 24px 60px; }

//   .shd .profile-bar{ background:linear-gradient(135deg,var(--teal-900),var(--teal-700)); border-radius:20px; padding:22px 26px; color:#fff; display:flex; align-items:center; justify-content:space-between; gap:20px; box-shadow:var(--shadow); }
//   .shd .profile-left{ display:flex; align-items:center; gap:16px; }
//   .shd .avatar{ width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,.16); display:flex; align-items:center; justify-content:center; font-family:'Lexend',sans-serif; font-weight:700; font-size:18px; border:1px solid rgba(255,255,255,.25); }
//   .shd .profile-left h1{ margin:0; font-size:20px; font-weight:700; }
//   .shd .profile-left .meta{ margin-top:3px; font-size:13px; color:rgba(255,255,255,.75); font-weight:500; }
//   .shd .profile-right{ display:flex; align-items:center; gap:10px; }
//   .shd .id-chip{ font-size:12px; font-weight:600; background:rgba(255,255,255,.14); padding:6px 12px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
//   .shd .back-pill{ display:flex; align-items:center; gap:6px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.25); color:#fff; padding:8px 14px; border-radius:100px; font-size:13px; font-weight:600; cursor:pointer; }

//   .shd .year-row{ display:flex; align-items:center; justify-content:space-between; margin-top:26px; flex-wrap:wrap; gap:14px; }
//   .shd .year-tabs{ display:flex; gap:6px; background:var(--card); padding:5px; border-radius:12px; border:1px solid var(--line); }
//   .shd .year-tab{ border:none; background:transparent; padding:9px 16px; border-radius:9px; font-size:13.5px; font-weight:600; color:var(--slate); cursor:pointer; font-family:'Inter',sans-serif; }
//   .shd .year-tab.active{ background:var(--teal-700); color:#fff; }
//   .shd .export-btn{ display:flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); color:var(--teal-900); font-weight:600; font-size:13.5px; padding:10px 16px; border-radius:10px; cursor:pointer; }
//   .shd .export-btn svg{ width:15px; height:15px; }

//   .shd .kpi-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:18px; }
//   .shd .kpi{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px 20px; box-shadow:var(--shadow); }
//   .shd .kpi .label{ font-size:12px; color:var(--slate); font-weight:600; text-transform:uppercase; letter-spacing:.04em; }
//   .shd .kpi .value{ font-family:'Lexend',sans-serif; font-size:25px; font-weight:700; margin-top:6px; }
//   .shd .kpi .sub{ font-size:12px; color:var(--slate-light); margin-top:2px; font-weight:500; }
//   .shd .kpi.accent-teal .value{ color:var(--teal-700); }
//   .shd .kpi.accent-amber .value{ color:#c07d0f; }
//   .shd .kpi.accent-violet .value{ color:var(--violet); }
//   .shd .kpi.accent-coral .value{ color:#c94b48; }

//   .shd .section{ margin-top:28px; }
//   .shd .section-label{ display:flex; align-items:center; gap:9px; margin-bottom:12px; padding-left:2px; }
//   .shd .section-label .dot{ width:9px; height:9px; border-radius:50%; flex-shrink:0; }
//   .shd .section-label h2{ margin:0; font-size:15px; font-weight:700; color:var(--ink); }

//   .shd .panel{ animation:fade .25s ease; }
//   @keyframes fade{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:none;} }

//   .shd .card{ background:var(--card); border:1px solid var(--line); border-radius:18px; padding:22px 24px; box-shadow:var(--shadow); position:relative; }
//   .shd .card-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
//   .shd .card-head h3{ margin:0; font-size:16px; font-weight:700; }
//   .shd .card-head .sub{ font-size:12.5px; color:var(--slate); margin-top:2px; }

//   .shd .dots-btn{ width:32px; height:32px; border-radius:9px; border:1px solid var(--line); background:var(--paper); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--slate); }
//   .shd .dots-btn:hover{ background:var(--teal-100); color:var(--teal-900); }
//   .shd .menu-wrap{ position:relative; }
//   .shd .dropdown{ position:absolute; right:0; top:40px; width:280px; background:#fff; border:1px solid var(--line); border-radius:14px; box-shadow:0 12px 32px -8px rgba(15,45,42,.22); padding:16px; z-index:20; display:none; }
//   .shd .dropdown.open{ display:block; }
//   .shd .dropdown label{ font-size:11.5px; font-weight:700; color:var(--slate); text-transform:uppercase; letter-spacing:.03em; }
//   .shd .range-row{ display:flex; gap:8px; margin-top:6px; margin-bottom:14px; }
//   .shd .range-row input{ flex:1; border:1px solid var(--line); border-radius:9px; padding:8px 10px; font-size:12.5px; font-family:'JetBrains Mono',monospace; color:var(--ink); min-width:0; }
//   .shd .dropdown-btn{ width:100%; background:var(--teal-700); color:#fff; border:none; padding:10px; border-radius:10px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; }
//   .shd .dropdown-btn svg{ width:14px; height:14px; }

//   .shd .attendance-layout{ display:grid; grid-template-columns:200px 1fr; gap:28px; margin-top:16px; align-items:center; }
//   .shd .ring-box{ display:flex; flex-direction:column; align-items:center; }
//   .shd .ring-box .big{ font-family:'Lexend',sans-serif; font-size:28px; font-weight:800; fill:var(--teal-900); }
//   .shd .ring-box .cap{ font-size:11px; fill:var(--slate); font-weight:600; }
//   .shd .legend{ display:flex; gap:16px; margin-top:12px; font-size:12px; color:var(--slate); }
//   .shd .legend span{ display:flex; align-items:center; gap:6px; font-weight:600; }
//   .shd .legend i{ width:9px; height:9px; border-radius:2px; display:inline-block; }
//   .shd .bars{ display:flex; align-items:flex-end; gap:8px; height:150px; padding-top:10px; flex:1; justify-content:space-between; }
//   .shd .bar-col{ display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; height:100%; justify-content:flex-end; cursor:pointer; border-radius:8px; transition:background .15s; padding:6px 4px 0; }
//   .shd .bar-col:hover{ background:var(--teal-100); }
//   .shd .bar-stack{ width:16px; border-radius:5px 5px 3px 3px; overflow:hidden; display:flex; flex-direction:column-reverse; }
//   .shd .bar-present{ background:var(--teal-500); }
//   .shd .bar-absent{ background:var(--coral); }
//   .shd .bar-col .m{ font-size:10.5px; color:var(--slate-light); font-weight:600; transition:color .15s; }
//   .shd .bar-col:hover .m{ color:var(--teal-900); }

//   .shd .crumbs{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--slate); font-weight:600; margin:16px 0 14px; }
//   .shd .crumbs .back-link{ display:flex; align-items:center; gap:5px; color:var(--teal-700); cursor:pointer; }
//   .shd .crumbs .back-link:hover{ text-decoration:underline; }
//   .shd .crumbs svg{ width:13px; height:13px; }
//   .shd .drill-summary{ display:flex; gap:22px; margin-bottom:16px; }
//   .shd .drill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; display:flex; align-items:center; gap:6px; }
//   .shd .drill-stat b{ font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--ink); }
//   .shd .day-grid{ display:grid; grid-template-columns:repeat(7,1fr); gap:7px; }
//   .shd .day-cell{ aspect-ratio:1; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; cursor:default; position:relative; }
//   .shd .day-cell.present{ background:var(--teal-100); color:var(--teal-900); }
//   .shd .day-cell.absent{ background:var(--coral-100); color:#c94b48; }
//   .shd .day-cell.holiday{ background:#b9ecee; color:#0a5f56; }
//   .shd .day-cell.weekend{ background:#9f818596; color:#5a4548; border:1px dashed var(--line); }
//   .shd .day-cell:hover::after{ content:attr(data-tip); position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:var(--ink); color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:10.5px; padding:4px 8px; border-radius:6px; white-space:nowrap; z-index:5; }
//   .shd .day-legend{ display:flex; gap:16px; margin-top:16px; font-size:11.5px; color:var(--slate); font-weight:600; }
//   .shd .day-legend span{ display:flex; align-items:center; gap:6px; }
//   .shd .day-legend i{ width:9px; height:9px; border-radius:3px; display:inline-block; }

//   .shd .activity-tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
//   .shd .activity-tab{ border:1px solid var(--line); background:var(--paper); padding:9px 15px; border-radius:11px; font-size:13px; font-weight:600; color:var(--slate); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; }
//   .shd .activity-tab .ico{ font-size:15px; }
//   .shd .activity-tab.active{ background:var(--violet-100); border-color:var(--violet); color:var(--violet); }
//   .shd .skill-stats{ display:flex; gap:24px; margin-bottom:14px; flex-wrap:wrap; }
//   .shd .skill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; }
//   .shd .skill-stat b{ font-family:'JetBrains Mono',monospace; font-size:14px; color:var(--ink); display:block; margin-top:2px; }
//   .shd .chart-box{ position:relative; padding-top:6px; }
//   .shd .chart-pt{ cursor:pointer; }
//   .shd .chart-pt-emoji{ font-size:15px; text-anchor:middle; cursor:pointer; }
//   .shd .chart-month-labels{ display:flex; margin-top:4px; }
//   .shd .chart-month-labels span{ flex:1; text-align:center; font-size:10.5px; color:var(--slate-light); font-weight:600; }

//   .shd .log-list{ display:flex; flex-direction:column; gap:10px; }
//   .shd .log-row{ display:flex; align-items:center; justify-content:space-between; padding:11px 14px; background:var(--paper); border:1px solid var(--line); border-radius:12px; }
//   .shd .log-left{ display:flex; align-items:center; gap:12px; }
//   .shd .log-emoji{ font-size:20px; }
//   .shd .log-date{ font-size:12.5px; font-weight:700; }
//   .shd .log-note{ font-size:11.5px; color:var(--slate); margin-top:1px; }
//   .shd .log-rating{ font-family:'JetBrains Mono',monospace; font-weight:700; font-size:14px; color:var(--violet); }

//   .shd .assess-list{ margin-top:16px; display:flex; flex-direction:column; gap:14px; }
//   .shd .assess-row{ display:grid; grid-template-columns:130px 1fr 46px 60px; align-items:center; gap:14px; }
//   .shd .assess-row .subj{ font-size:13px; font-weight:600; }
//   .shd .track{ background:var(--teal-100); border-radius:100px; height:9px; overflow:hidden; }
//   .shd .fill{ height:100%; border-radius:100px; background:linear-gradient(90deg,var(--teal-500),var(--teal-700)); }
//   .shd .assess-row .pct{ font-family:'JetBrains Mono',monospace; font-size:12.5px; text-align:right; color:var(--slate); }
//   .shd .grade-chip{ font-size:11.5px; font-weight:700; text-align:center; padding:4px 0; border-radius:7px; background:var(--teal-100); color:var(--teal-900); }

//   /* ---- Promotion status card ---- */
//   .shd .promo-badge{ display:flex; align-items:center; gap:12px; margin-top:16px; padding:14px 16px; border-radius:14px; }
//   .shd .promo-badge.promoted{ background:var(--teal-100); color:var(--teal-900); }
//   .shd .promo-badge.at-risk{ background:var(--amber-100); color:#8a5a10; }
//   .shd .promo-badge.not-promoted{ background:var(--coral-100); color:#c94b48; }
//   .shd .promo-badge.pending{ background:var(--violet-100); color:var(--violet); }
//   .shd .criteria-list{ display:flex; flex-direction:column; gap:8px; margin-top:16px; }
//   .shd .criteria-row{ display:flex; align-items:center; gap:10px; font-size:13px; }
//   .shd .criteria-icon{ width:20px; height:20px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
//   .shd .criteria-icon.ok{ background:var(--teal-100); color:var(--teal-900); }
//   .shd .criteria-icon.bad{ background:var(--coral-100); color:#c94b48; }
//   .shd .promo-remarks{ margin-top:14px; font-size:13px; color:var(--ink); background:var(--paper); padding:12px 14px; border-radius:12px; font-style:italic; }

//   /* ---- Promotion marksheet table ---- */
//   .shd .promo-table-wrap{ margin-top:16px; border-radius:14px; overflow:hidden; border:1px solid var(--line); }
//   .shd .promo-table{ width:100%; border-collapse:collapse; }
//   .shd .promo-table thead tr{ background:var(--teal-700); }
//   .shd .promo-table thead th{ color:#fff; text-align:left; padding:13px 20px; font-size:12.5px; font-weight:700; letter-spacing:.01em; }
//   .shd .promo-table tbody td{ padding:13px 20px; font-size:13.5px; color:var(--ink); }
//   .shd .promo-table tbody tr:nth-child(odd){ background:#eef1f0; }
//   .shd .promo-table tbody tr:nth-child(even){ background:var(--teal-100); }
//   .shd .promo-table td.subj-cell{ color:var(--teal-700); font-weight:700; }
//   .shd .promo-table tfoot tr{ background:var(--teal-700); }
//   .shd .promo-table tfoot td{ padding:12px 20px; color:#fff; font-size:12px; font-weight:600; }
//   .shd .promo-pagination{ display:flex; align-items:center; gap:8px; justify-content:flex-end; }
//   .shd .promo-page-btn{ width:26px; height:26px; border-radius:50%; border:none; background:rgba(255,255,255,.18); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; }
//   .shd .promo-page-btn svg{ width:15px; height:15px; }
//   .shd .promo-page-btn:disabled{ opacity:.4; cursor:default; }
//   .shd .promo-page-btn:hover:not(:disabled){ background:rgba(255,255,255,.3); }

//   .shd .wall{ display:flex; gap:14px; margin-top:16px; overflow-x:auto; padding-bottom:6px; }
//   .shd .react-card{ min-width:220px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:8px; }
//   .shd .react-top{ display:flex; align-items:center; justify-content:space-between; }
//   .shd .emoji{ font-size:26px; }
//   .shd .react-teacher{ font-size:12.5px; font-weight:700; }
//   .shd .react-subj{ font-size:11px; color:var(--slate); font-weight:600; }
//   .shd .react-note{ font-size:12.5px; color:var(--ink); line-height:1.45; }
//   .shd .react-date{ font-size:10.5px; color:var(--slate-light); font-family:'JetBrains Mono',monospace; }

//   .shd .inv-row{ display:flex; align-items:center; justify-content:space-between; padding:14px 4px; border-bottom:1px solid var(--line); }
//   .shd .inv-row:last-child{ border-bottom:none; }
//   .shd .inv-left{ display:flex; align-items:center; gap:12px; }
//   .shd .inv-icon{ width:36px; height:36px; border-radius:10px; background:var(--teal-100); color:var(--teal-900); display:flex; align-items:center; justify-content:center; }
//   .shd .inv-title{ font-size:13.5px; font-weight:700; }
//   .shd .inv-date{ font-size:11.5px; color:var(--slate-light); margin-top:2px; font-family:'JetBrains Mono',monospace; }
//   .shd .inv-right{ display:flex; align-items:center; gap:10px; }
//   .shd .status-chip{ font-size:11px; font-weight:700; padding:5px 10px; border-radius:100px; }
//   .shd .status-paid{ background:#e3f6ea; color:#1f8a4c; }
//   .shd .status-partial{ background:var(--amber-100); color:#8a5a10; }
//   .shd .status-pending{ background:var(--coral-100); color:#c94b48; }
//   .shd .status-neutral{ background:#f1f3f2; color:var(--slate); }
//   .shd .dl-btn{ background:var(--teal-700); color:#fff; border:none; font-size:12px; font-weight:600; padding:8px 14px; border-radius:9px; cursor:pointer; display:flex; align-items:center; gap:6px; }
//   .shd .dl-btn svg{ width:13px; height:13px; }

//   /* ---- Skeleton loading ---- */
//   .shd .sk-block{
//     background: linear-gradient(90deg, #e4e9e8 25%, #eef2f1 37%, #e4e9e8 63%);
//     background-size: 400% 100%;
//     border-radius: 6px;
//     animation: sk-shimmer 1.4s ease infinite;
//   }
//   @keyframes sk-shimmer{
//     0%{ background-position: 100% 50%; }
//     100%{ background-position: 0% 50%; }
//   }
//   .shd .sk-profile-bar{
//     background: linear-gradient(135deg,var(--teal-900),var(--teal-700));
//     border-radius:20px; padding:22px 26px; display:flex; align-items:center;
//     justify-content:space-between; gap:20px; box-shadow:var(--shadow);
//   }
//   .shd .sk-avatar{ width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,.22) !important; animation:none; }
//   .shd .sk-profile-bar .profile-left{ display:flex; align-items:center; gap:16px; }

//   @media (max-width:780px){
//     .shd .kpi-row{ grid-template-columns:repeat(2,1fr); }
//     .shd .attendance-layout{ grid-template-columns:1fr; }
//     .shd .assess-row{ grid-template-columns:90px 1fr 40px 52px; }
//   }
//   /* ADD THIS (it was missing entirely): */
// .shd .weekday-header{
//   display:grid;
//   grid-template-columns:repeat(7,1fr);
//   gap:7px;
//   margin-bottom:8px;
// }
// .shd .weekday-label{
//   text-align:center;
//   font-size:11px;
//   font-weight:700;
//   color:var(--slate);
//   text-transform:uppercase;
//   letter-spacing:.04em;
// }
// .shd .day-cell.empty{
//   background:transparent;
//   border:none;
//   cursor:default;
//   pointer-events:none;
// }   
// `;

