import { useState } from "react";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ---------- static mock data (same as the design) ----------
const monthNames = ['July','August','September','October','November','December','January','February','March','April','May','June'];
const monthShort  = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
const monthYear   = [2026,2026,2026,2026,2026,2026,2027,2027,2027,2027,2027,2027];
const present = [22, 20, 21, 22, 18, 14, 19, 17, 22, 20, 21, 15];
const absent  = [ 1,  2,  1,  2,  2,  1,  1,  2,  1,  1,  1,  1];
const daysInMonth = [23, 22, 22, 24, 20, 15, 20, 19, 23, 21, 22, 16];
const maxH = 130;

const skillData = {
  karate:   { icon: '🥋', label: 'Karate',   ratings: [6, 7, 8, 10, 8, 6, 7, 9, 8, 9, 10, 9] },
  keyboard: { icon: '🎹', label: 'Keyboard',  ratings: [5, 6, 6, 7, 8, 7, 8, 7, 9, 8, 9, 9] },
  abacus:   { icon: '🧮', label: 'Abacus',    ratings: [7, 6, 9, 8, 10, 9, 8, 7, 9, 10, 9, 10] },
};

const assessments = [
  { subj: 'Mathematics',    pct: 92, grade: 'A+' },
  { subj: 'Science',        pct: 88, grade: 'A' },
  { subj: 'English',        pct: 84, grade: 'A' },
  { subj: 'Social Studies', pct: 79, grade: 'B+' },
  { subj: 'Computer Sci.',  pct: 95, grade: 'A+' },
  { subj: 'Art & Craft',    pct: 90, grade: 'A' },
];

const teacherWall = [
  { emoji: '🌟', date: '18 Nov', teacher: 'Mrs. Kavitha Iyer', subj: 'Mathematics', note: 'Solved the entire olympiad set independently — real conceptual clarity.' },
  { emoji: '👏', date: '05 Nov', teacher: 'Mr. Arvind Menon', subj: 'Science', note: 'Great lab discipline and a thoughtful hypothesis this week.' },
  { emoji: '💡', date: '22 Oct', teacher: 'Ms. Priya Das', subj: 'Computer Science', note: 'Came up with a clever shortcut in the logic assignment.' },
  { emoji: '🎨', date: '14 Oct', teacher: 'Ms. Leela Nair', subj: 'Art & Craft', note: 'Lovely use of colour in the mural project — keep going!' },
  { emoji: '🤝', date: '02 Oct', teacher: 'Mr. Sathish Rao', subj: 'Social Studies', note: 'Helped a classmate catch up on the unit — great team spirit.' },
];

const invoices = [
  { title: 'Term 1 Fee Invoice', date: '05 Jul 2026 · 186 KB', status: 'Paid', kind: 'doc' },
  { title: 'Term 2 Fee Invoice', date: '08 Jan 2027 · 181 KB', status: 'Paid', kind: 'doc' },
  { title: 'Library Clearance Certificate', date: '20 Jun 2027 · 48 KB', status: 'Completed', kind: 'check' },
];

// ---------- helpers ----------
function emojiFor(r) {
  if (r >= 9) return '🤩';
  if (r >= 7) return '🙂';
  if (r >= 5) return '😐';
  if (r >= 3) return '😕';
  return '😣';
}

function buildMonthDays(monthIdx) {
  const total = daysInMonth[monthIdx];
  const absentTarget = absent[monthIdx];
  const days = [];
  let absentPlaced = 0;
  for (let d = 1; d <= total; d++) {
    const dow = (d + monthIdx * 3) % 7;
    const isWeekend = dow === 0 || dow === 6;
    let status = 'present';
    if (isWeekend) {
      status = 'weekend';
    } else if (d % 12 === 0 && (monthIdx === 5 || monthIdx === 9)) {
      status = 'holiday';
    } else if (absentPlaced < absentTarget && d % 9 === (monthIdx + 2) % 9) {
      status = 'absent';
      absentPlaced++;
    }
    days.push({ day: d, status });
  }
  return days;
}

function buildSessionLog(activity, monthIdx) {
  const base = skillData[activity].ratings[monthIdx];
  const offsets = [-1, 1, 0, 2, -2];
  const weekDates = [4, 11, 18, 25, 29];
  return offsets.map((off, idx) => {
    let r = base + off;
    r = Math.max(1, Math.min(10, r));
    return {
      date: `${monthShort[monthIdx]} ${weekDates[idx]}`,
      year: monthYear[monthIdx],
      rating: r,
      note: r >= 9 ? 'Excellent session, strong focus.' : r <= 5 ? 'Off day, needed extra encouragement.' : 'Steady, consistent effort.',
    };
  });
}

// ---------- small reusable bits ----------
function DotsMenu({ id, openMenu, setOpenMenu, label }) {
  const open = openMenu === id;
  return (
    <Box className="menu-wrap">
      <Box component="button"
        className="dots-btn"
        onClick={(e) => { e.stopPropagation(); setOpenMenu(open ? null : id); }}
      >
        <MoreVertIcon style={{ fontSize: 18 }} />
      </Box>
      <Box className={`dropdown${open ? ' open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <label>From</label>
        <Box className="range-row"><input type="date" defaultValue="2026-07-01" /></Box>
        <label>To</label>
        <Box className="range-row"><input type="date" defaultValue="2027-06-30" /></Box>
        <Box component="button" className="dropdown-btn" onClick={() => { console.log('Download requested for', id); setOpenMenu(null); }}>
          <FileDownloadIcon style={{ fontSize: 16 }} />
          Download {label} PDF
        </Box>
      </Box>
    </Box>
  );
}

export default function StudentHistoryDashboard() {
  const [activeYear, setActiveYear] = useState('2026-27');
  const [openMenu, setOpenMenu] = useState(null);
  const [monthDrillIdx, setMonthDrillIdx] = useState(null);
  const [currentActivity, setCurrentActivity] = useState('karate');
  const [skillDrillIdx, setSkillDrillIdx] = useState(null);

  // attendance totals
  const totalPresent = present.reduce((a, b) => a + b, 0);
  const totalAbsent = absent.reduce((a, b) => a + b, 0);
  const totalDays = totalPresent + totalAbsent;
  const pctAttendance = Math.round((totalPresent / totalDays) * 100);
  const ringR = 66;
  const ringCirc = 2 * Math.PI * ringR;
  const ringOffset = ringCirc * (1 - pctAttendance / 100);

  // skill chart points
  const ratings = skillData[currentActivity].ratings;
  const skCurrent = ratings[ratings.length - 1];
  const skHigh = Math.max(...ratings);
  const skLow = Math.min(...ratings);
  const skAvg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

  const chartW = 620, chartH = 150, padX = 30, padTop = 20, padBottom = 10;
  const usableW = chartW - padX * 2;
  const usableH = chartH - padTop - padBottom;
  const pts = ratings.map((r, i) => ({
    x: padX + (i / (ratings.length - 1)) * usableW,
    y: padTop + (1 - (r - 1) / 9) * usableH,
    r, i,
  }));
  const linePath = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)} ${chartH - padBottom} L${pts[0].x.toFixed(1)} ${chartH - padBottom} Z`;

  const dayGrid = monthDrillIdx !== null ? buildMonthDays(monthDrillIdx) : [];
  const dayCounts = dayGrid.reduce((acc, d) => { acc[d.status] = (acc[d.status] || 0) + 1; return acc; }, {});
  const sessionLog = skillDrillIdx !== null ? buildSessionLog(currentActivity, skillDrillIdx) : [];

  return (
    <Box onClick={() => setOpenMenu(null)}>
      <style>{`
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
        .shd .day-grid{ display:grid; grid-template-columns:repeat(10,1fr); gap:7px; }
        .shd .day-cell{ aspect-ratio:1; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; cursor:default; position:relative; }
        .shd .day-cell.present{ background:var(--teal-100); color:var(--teal-900); }
        .shd .day-cell.absent{ background:var(--coral-100); color:#c94b48; }
        .shd .day-cell.holiday{ background:#f1f3f2; color:var(--slate-light); }
        .shd .day-cell.weekend{ background:transparent; color:var(--slate-light); border:1px dashed var(--line); }
        .shd .day-cell:hover::after{ content:attr(data-tip); position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:var(--ink); color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:10.5px; padding:4px 8px; border-radius:6px; white-space:nowrap; z-index:5; }
        .shd .day-legend{ display:flex; gap:16px; margin-top:16px; font-size:11.5px; color:var(--slate); font-weight:600; }
        .shd .day-legend span{ display:flex; align-items:center; gap:6px; }
        .shd .day-legend i{ width:9px; height:9px; border-radius:3px; display:inline-block; }

        .shd .activity-tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
        .shd .activity-tab{ border:1px solid var(--line); background:var(--paper); padding:9px 15px; border-radius:11px; font-size:13px; font-weight:600; color:var(--slate); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; }
        .shd .activity-tab .ico{ font-size:15px; }
        .shd .activity-tab.active{ background:var(--violet-100); border-color:var(--violet); color:var(--violet); }
        .shd .skill-stats{ display:flex; gap:24px; margin-bottom:14px; }
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

        .shd .wall{ display:flex; gap:14px; margin-top:16px; overflow-x:auto; padding-bottom:6px; }
        .shd .react-card{ min-width:220px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:8px; }
        .shd .react-top{ display:flex; align-items:center; justify-content:space-between; }
        .shd .emoji{ font-size:26px; }
        .shd .react-teacher{ font-size:12.5px; font-weight:700; }
        .shd .react-subj{ font-size:11px; color:var(--slate); font-weight:600; }
        .shd .react-note{ font-size:12.5px; color:var(--ink); line-height:1.45; }
        .shd .react-date{ font-size:10.5px; color:var(--slate-light); font-family:'JetBrains Mono',monospace; }

        .shd .inv-row{ display:flex; align-items:center; justify-content:space-between; padding:14px 4px; border-bottom:1px solid var(--line); }
        .shd .inv-row:last-child{ border-bottom:none; }
        .shd .inv-left{ display:flex; align-items:center; gap:12px; }
        .shd .inv-icon{ width:36px; height:36px; border-radius:10px; background:var(--teal-100); color:var(--teal-900); display:flex; align-items:center; justify-content:center; }
        .shd .inv-title{ font-size:13.5px; font-weight:700; }
        .shd .inv-date{ font-size:11.5px; color:var(--slate-light); margin-top:2px; font-family:'JetBrains Mono',monospace; }
        .shd .inv-right{ display:flex; align-items:center; gap:10px; }
        .shd .status-chip{ font-size:11px; font-weight:700; padding:5px 10px; border-radius:100px; }
        .shd .status-paid{ background:#e3f6ea; color:#1f8a4c; }
        .shd .dl-btn{ background:var(--teal-700); color:#fff; border:none; font-size:12px; font-weight:600; padding:8px 14px; border-radius:9px; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .shd .dl-btn svg{ width:13px; height:13px; }

        @media (max-width:780px){
          .shd .kpi-row{ grid-template-columns:repeat(2,1fr); }
          .shd .attendance-layout{ grid-template-columns:1fr; }
          .shd .assess-row{ grid-template-columns:90px 1fr 40px 52px; }
        }
      `}</style>

      <Box className="shd">
        <Box className="wrap">

          {/* Profile bar */}
          <Box className="profile-bar">
            <Box className="profile-left">
              <Box className="avatar">AK</Box>
              <Box>
                <h1>Aditya Krishnan</h1>
                <Box className="meta">Grade 8 · Section A &nbsp;·&nbsp; Global Kids Academy</Box>
              </Box>
            </Box>
            <Box className="profile-right">
              <Box component="span" className="id-chip">EMP00203 · Percy</Box>
              <Box component="button" className="back-pill">
                <ArrowBackIcon style={{ fontSize: 15 }} />
                Back to list
              </Box>
            </Box>
          </Box>

          {/* Year selector + export */}
          <Box className="year-row">
            <Box className="year-tabs">
              {['2026-27', '2025-26', '2024-25'].map((y) => (
                <Box component="button" key={y} className={`year-tab${activeYear === y ? ' active' : ''}`} onClick={() => setActiveYear(y)}>{y}</Box>
              ))}
            </Box>
            <Box component="button" className="export-btn">
              <FileDownloadIcon style={{ fontSize: 16 }} />
              Export full year report
            </Box>
          </Box>

          {/* KPI summary */}
          <Box className="kpi-row">
            <Box className="kpi accent-teal">
              <Box className="label">Attendance</Box>
              <Box className="value">{pctAttendance}%</Box>
              <Box className="sub">{totalPresent} / {totalDays} days present</Box>
            </Box>
            <Box className="kpi accent-amber">
              <Box className="label">Avg. Assessment</Box>
              <Box className="value">A-</Box>
              <Box className="sub">87% across 6 subjects</Box>
            </Box>
            <Box className="kpi accent-violet">
              <Box className="label">Skill Growth</Box>
              <Box className="value">+18%</Box>
              <Box className="sub">vs. previous term</Box>
            </Box>
            <Box className="kpi accent-coral">
              <Box className="label">Fees Paid</Box>
              <Box className="value mono">₹1,86,000</Box>
              <Box className="sub">of ₹1,86,000 due</Box>
            </Box>
          </Box>

          {/* ATTENDANCE SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: 'var(--teal-500)' }}></Box><h2>Attendance</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Attendance overview</h3>
                    <Box className="sub">Click a month to see day-by-day attendance</Box>
                  </Box>
                  <DotsMenu id="attendance" openMenu={openMenu} setOpenMenu={setOpenMenu} label="attendance" />
                </Box>

                {monthDrillIdx === null ? (
                  <Box className="attendance-layout">
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
                        <Box component="span"><i style={{ background: 'var(--teal-500)' }}></i>Present</Box>
                        <Box component="span"><i style={{ background: 'var(--coral)' }}></i>Absent</Box>
                      </Box>
                    </Box>

                    <Box className="bars">
                      {monthShort.map((m, i) => {
                        const total = present[i] + absent[i];
                        const pH = (present[i] / total) * maxH;
                        const aH = (absent[i] / total) * maxH;
                        return (
                          <Box key={m} className="bar-col" onClick={() => setMonthDrillIdx(i)}>
                            <Box className="bar-stack" style={{ height: pH + aH }}>
                              <Box className="bar-absent" style={{ height: aH }}></Box>
                              <Box className="bar-present" style={{ height: pH }}></Box>
                            </Box>
                            <Box className="m">{m}</Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box className="crumbs">
                      <Box component="span" className="back-link" onClick={() => setMonthDrillIdx(null)}>
                        <ArrowBackIcon style={{ fontSize: 14 }} />
                        Back to overview
                      </Box>
                      <Box component="span">›</Box>
                      <Box component="span" style={{ color: 'var(--ink)' }}>{monthNames[monthDrillIdx]} {monthYear[monthDrillIdx]}</Box>
                    </Box>
                    <Box className="drill-summary">
                      <Box className="drill-stat">Present <b>{dayCounts.present || 0} days</b></Box>
                      <Box className="drill-stat">Absent <b>{dayCounts.absent || 0} days</b></Box>
                      <Box className="drill-stat">Holidays <b>{dayCounts.holiday || 0} days</b></Box>
                    </Box>
                    <Box className="day-grid">
                      {dayGrid.map((d) => (
                        <Box key={d.day} className={`day-cell ${d.status}`}
                          data-tip={`${monthShort[monthDrillIdx]} ${d.day} · ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}`}>
                          {d.day}
                        </Box>
                      ))}
                    </Box>
                    <Box className="day-legend">
                      <Box component="span"><i style={{ background: 'var(--teal-100)' }}></i>Present</Box>
                      <Box component="span"><i style={{ background: 'var(--coral-100)' }}></i>Absent</Box>
                      <Box component="span"><i style={{ background: '#f1f3f2' }}></i>Holiday</Box>
                      <Box component="span"><i style={{ background: 'transparent', border: '1px dashed var(--line)' }}></i>Weekend</Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* ASSESSMENT SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: 'var(--amber)' }}></Box><h2>Assessment</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Assessment performance</h3>
                    <Box className="sub">Subject-wise scores · latest term</Box>
                  </Box>
                  <DotsMenu id="assessment" openMenu={openMenu} setOpenMenu={setOpenMenu} label="assessment" />
                </Box>
                <Box className="assess-list">
                  {assessments.map((a) => (
                    <Box key={a.subj} className="assess-row">
                      <Box className="subj">{a.subj}</Box>
                      <Box className="track"><Box className="fill" style={{ width: `${a.pct}%` }}></Box></Box>
                      <Box className="pct">{a.pct}%</Box>
                      <Box className="grade-chip">{a.grade}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* SKILLS SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: 'var(--violet)' }}></Box><h2>Skill Identification</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Skill identification</h3>
                    <Box className="sub">Observed by teachers across the year</Box>
                  </Box>
                  <DotsMenu id="skills" openMenu={openMenu} setOpenMenu={setOpenMenu} label="skill report" />
                </Box>

                <Box className="activity-tabs">
                  {Object.entries(skillData).map(([key, d]) => (
                    <Box component="button" key={key} className={`activity-tab${currentActivity === key ? ' active' : ''}`}
                      onClick={() => { setCurrentActivity(key); setSkillDrillIdx(null); }}>
                      <Box component="span" className="ico">{d.icon}</Box>{d.label}
                    </Box>
                  ))}
                </Box>

                {skillDrillIdx === null ? (
                  <Box>
                    <Box className="skill-stats">
                      <Box className="skill-stat">Current rating<b>{skCurrent} {emojiFor(skCurrent)}</b></Box>
                      <Box className="skill-stat">Highest<b>{skHigh}</b></Box>
                      <Box className="skill-stat">Lowest<b>{skLow}</b></Box>
                      <Box className="skill-stat">6-month avg<b>{skAvg}</b></Box>
                    </Box>
                    <Box className="chart-box">
                      <svg width="100%" height="150" viewBox="0 0 620 150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#skillGrad)" stroke="none"></path>
                        <path d={linePath} fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path>
                        {pts.map((p) => (
                          <g key={p.i} style={{ cursor: 'pointer' }} onClick={() => setSkillDrillIdx(p.i)}>
                            <circle className="chart-pt" cx={p.x} cy={p.y} r="4" fill="#fff" stroke="var(--violet)" strokeWidth="2.5" />
                            <text className="chart-pt-emoji" x={p.x} y={p.y - 14}>{emojiFor(p.r)}</text>
                          </g>
                        ))}
                      </svg>
                      <Box className="chart-month-labels">
                        {monthShort.map((m) => <Box component="span" key={m}>{m}</Box>)}
                      </Box>
                    </Box>
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
                      <Box component="span" style={{ color: 'var(--ink)' }}>
                        {skillData[currentActivity].icon} {skillData[currentActivity].label} · {monthShort[skillDrillIdx]} {monthYear[skillDrillIdx]} sessions
                      </Box>
                    </Box>
                    <Box className="log-list">
                      {sessionLog.map((s, idx) => (
                        <Box key={idx} className="log-row">
                          <Box className="log-left">
                            <Box component="span" className="log-emoji">{emojiFor(s.rating)}</Box>
                            <Box>
                              <Box className="log-date">{s.date}, {s.year}</Box>
                              <Box className="log-note">{s.note}</Box>
                            </Box>
                          </Box>
                          <Box className="log-rating">{s.rating}/10</Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* TEACHER WALL SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: '#f26d6d' }}></Box><h2>Teacher Wall</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Teacher wall</h3>
                    <Box className="sub">Reactions & appreciation from subject teachers</Box>
                  </Box>
                  <DotsMenu id="reactions" openMenu={openMenu} setOpenMenu={setOpenMenu} label="teacher wall" />
                </Box>
                <Box className="wall">
                  {teacherWall.map((r, idx) => (
                    <Box key={idx} className="react-card">
                      <Box className="react-top"><Box component="span" className="emoji">{r.emoji}</Box><Box component="span" className="react-date">{r.date}</Box></Box>
                      <Box className="react-teacher">{r.teacher}</Box>
                      <Box className="react-subj">{r.subj}</Box>
                      <Box className="react-note">{r.note}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* INVOICES SECTION */}
          <Box className="section">
            <Box className="section-label"><Box component="span" className="dot" style={{ background: '#3fb1e0' }}></Box><h2>Invoices</h2></Box>
            <Box className="panel">
              <Box className="card">
                <Box className="card-head">
                  <Box>
                    <h3>Invoices & fee records</h3>
                    <Box className="sub">2026-27 academic year</Box>
                  </Box>
                  <DotsMenu id="invoices" openMenu={openMenu} setOpenMenu={setOpenMenu} label="invoice report" />
                </Box>
                <Box>
                  {invoices.map((inv, idx) => (
                    <Box key={idx} className="inv-row">
                      <Box className="inv-left">
                        <Box className="inv-icon">
                          {inv.kind === 'doc' ? (
                            <DescriptionOutlinedIcon style={{ fontSize: 18 }} />
                          ) : (
                            <CheckCircleOutlineIcon style={{ fontSize: 18 }} />
                          )}
                        </Box>
                        <Box>
                          <Box className="inv-title">{inv.title}</Box>
                          <Box className="inv-date">{inv.date}</Box>
                        </Box>
                      </Box>
                      <Box className="inv-right">
                        <Box component="span" className="status-chip status-paid">{inv.status}</Box>
                        <Box component="button" className="dl-btn">
                          <FileDownloadIcon style={{ fontSize: 15 }} />
                          Download
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
// import { useState } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// // ---------- static mock data (same as the design) ----------
// const monthNames = ['July','August','September','October','November','December','January','February','March','April','May','June'];
// const monthShort  = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
// const monthYear   = [2026,2026,2026,2026,2026,2026,2027,2027,2027,2027,2027,2027];
// const present = [22, 20, 21, 22, 18, 14, 19, 17, 22, 20, 21, 15];
// const absent  = [ 1,  2,  1,  2,  2,  1,  1,  2,  1,  1,  1,  1];
// const daysInMonth = [23, 22, 22, 24, 20, 15, 20, 19, 23, 21, 22, 16];
// const maxH = 130;

// const skillData = {
//   karate:   { icon: '🥋', label: 'Karate',   ratings: [6, 7, 8, 10, 8, 6, 7, 9, 8, 9, 10, 9] },
//   keyboard: { icon: '🎹', label: 'Keyboard',  ratings: [5, 6, 6, 7, 8, 7, 8, 7, 9, 8, 9, 9] },
//   abacus:   { icon: '🧮', label: 'Abacus',    ratings: [7, 6, 9, 8, 10, 9, 8, 7, 9, 10, 9, 10] },
// };

// const assessments = [
//   { subj: 'Mathematics',    pct: 92, grade: 'A+' },
//   { subj: 'Science',        pct: 88, grade: 'A' },
//   { subj: 'English',        pct: 84, grade: 'A' },
//   { subj: 'Social Studies', pct: 79, grade: 'B+' },
//   { subj: 'Computer Sci.',  pct: 95, grade: 'A+' },
//   { subj: 'Art & Craft',    pct: 90, grade: 'A' },
// ];

// const teacherWall = [
//   { emoji: '🌟', date: '18 Nov', teacher: 'Mrs. Kavitha Iyer', subj: 'Mathematics', note: 'Solved the entire olympiad set independently — real conceptual clarity.' },
//   { emoji: '👏', date: '05 Nov', teacher: 'Mr. Arvind Menon', subj: 'Science', note: 'Great lab discipline and a thoughtful hypothesis this week.' },
//   { emoji: '💡', date: '22 Oct', teacher: 'Ms. Priya Das', subj: 'Computer Science', note: 'Came up with a clever shortcut in the logic assignment.' },
//   { emoji: '🎨', date: '14 Oct', teacher: 'Ms. Leela Nair', subj: 'Art & Craft', note: 'Lovely use of colour in the mural project — keep going!' },
//   { emoji: '🤝', date: '02 Oct', teacher: 'Mr. Sathish Rao', subj: 'Social Studies', note: 'Helped a classmate catch up on the unit — great team spirit.' },
// ];

// const invoices = [
//   { title: 'Term 1 Fee Invoice', date: '05 Jul 2026 · 186 KB', status: 'Paid', kind: 'doc' },
//   { title: 'Term 2 Fee Invoice', date: '08 Jan 2027 · 181 KB', status: 'Paid', kind: 'doc' },
//   { title: 'Library Clearance Certificate', date: '20 Jun 2027 · 48 KB', status: 'Completed', kind: 'check' },
// ];

// // ---------- helpers ----------
// function emojiFor(r) {
//   if (r >= 9) return '🤩';
//   if (r >= 7) return '🙂';
//   if (r >= 5) return '😐';
//   if (r >= 3) return '😕';
//   return '😣';
// }

// function buildMonthDays(monthIdx) {
//   const total = daysInMonth[monthIdx];
//   const absentTarget = absent[monthIdx];
//   const days = [];
//   let absentPlaced = 0;
//   for (let d = 1; d <= total; d++) {
//     const dow = (d + monthIdx * 3) % 7;
//     const isWeekend = dow === 0 || dow === 6;
//     let status = 'present';
//     if (isWeekend) {
//       status = 'weekend';
//     } else if (d % 12 === 0 && (monthIdx === 5 || monthIdx === 9)) {
//       status = 'holiday';
//     } else if (absentPlaced < absentTarget && d % 9 === (monthIdx + 2) % 9) {
//       status = 'absent';
//       absentPlaced++;
//     }
//     days.push({ day: d, status });
//   }
//   return days;
// }

// function buildSessionLog(activity, monthIdx) {
//   const base = skillData[activity].ratings[monthIdx];
//   const offsets = [-1, 1, 0, 2, -2];
//   const weekDates = [4, 11, 18, 25, 29];
//   return offsets.map((off, idx) => {
//     let r = base + off;
//     r = Math.max(1, Math.min(10, r));
//     return {
//       date: `${monthShort[monthIdx]} ${weekDates[idx]}`,
//       year: monthYear[monthIdx],
//       rating: r,
//       note: r >= 9 ? 'Excellent session, strong focus.' : r <= 5 ? 'Off day, needed extra encouragement.' : 'Steady, consistent effort.',
//     };
//   });
// }

// // ---------- small reusable bits ----------
// function DotsMenu({ id, openMenu, setOpenMenu, label }) {
//   const open = openMenu === id;
//   return (
//     <div className="menu-wrap">
//       <button
//         className="dots-btn"
//         onClick={(e) => { e.stopPropagation(); setOpenMenu(open ? null : id); }}
//       >
//         <MoreVertIcon style={{ fontSize: 18 }} />
//       </button>
//       <div className={`dropdown${open ? ' open' : ''}`} onClick={(e) => e.stopPropagation()}>
//         <label>From</label>
//         <div className="range-row"><input type="date" defaultValue="2026-07-01" /></div>
//         <label>To</label>
//         <div className="range-row"><input type="date" defaultValue="2027-06-30" /></div>
//         <button className="dropdown-btn" onClick={() => { console.log('Download requested for', id); setOpenMenu(null); }}>
//           <FileDownloadIcon style={{ fontSize: 16 }} />
//           Download {label} PDF
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function StudentHistoryDashboard() {
//   const [activeYear, setActiveYear] = useState('2026-27');
//   const [openMenu, setOpenMenu] = useState(null);
//   const [monthDrillIdx, setMonthDrillIdx] = useState(null);
//   const [currentActivity, setCurrentActivity] = useState('karate');
//   const [skillDrillIdx, setSkillDrillIdx] = useState(null);

//   // attendance totals
//   const totalPresent = present.reduce((a, b) => a + b, 0);
//   const totalAbsent = absent.reduce((a, b) => a + b, 0);
//   const totalDays = totalPresent + totalAbsent;
//   const pctAttendance = Math.round((totalPresent / totalDays) * 100);
//   const ringR = 66;
//   const ringCirc = 2 * Math.PI * ringR;
//   const ringOffset = ringCirc * (1 - pctAttendance / 100);

//   // skill chart points
//   const ratings = skillData[currentActivity].ratings;
//   const skCurrent = ratings[ratings.length - 1];
//   const skHigh = Math.max(...ratings);
//   const skLow = Math.min(...ratings);
//   const skAvg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

//   const chartW = 620, chartH = 150, padX = 30, padTop = 20, padBottom = 10;
//   const usableW = chartW - padX * 2;
//   const usableH = chartH - padTop - padBottom;
//   const pts = ratings.map((r, i) => ({
//     x: padX + (i / (ratings.length - 1)) * usableW,
//     y: padTop + (1 - (r - 1) / 9) * usableH,
//     r, i,
//   }));
//   const linePath = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ');
//   const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)} ${chartH - padBottom} L${pts[0].x.toFixed(1)} ${chartH - padBottom} Z`;

//   const dayGrid = monthDrillIdx !== null ? buildMonthDays(monthDrillIdx) : [];
//   const dayCounts = dayGrid.reduce((acc, d) => { acc[d.status] = (acc[d.status] || 0) + 1; return acc; }, {});
//   const sessionLog = skillDrillIdx !== null ? buildSessionLog(currentActivity, skillDrillIdx) : [];

//   return (
//     <div onClick={() => setOpenMenu(null)}>
//       <style>{`
//         :root{
//           --teal-900:#0a5f56; --teal-700:#0f9b8e; --teal-500:#17b8a6; --teal-100:#e3f5f2;
//           --ink:#1c2b2a; --slate:#66787a; --slate-light:#93a3a4; --paper:#f4f8f7; --card:#ffffff;
//           --line:#e2ebe9; --amber:#f2a93b; --amber-100:#fdf1dc; --coral:#ef6f6c; --coral-100:#fde9e8;
//           --violet:#7c6cf0; --violet-100:#ecebfd;
//           --shadow: 0 1px 2px rgba(15,45,42,.04), 0 8px 24px -12px rgba(15,45,42,.12);
//         }
//         .shd *{box-sizing:border-box;}
//         .shd{ margin:0; background:var(--paper); color:var(--ink); font-family:'Inter',sans-serif; -webkit-font-smoothing:antialiased; }
//         .shd h1,.shd h2,.shd h3{ font-family:'Lexend',sans-serif; }
//         .shd .mono{ font-family:'JetBrains Mono',monospace; letter-spacing:-.02em; }
//         .shd .wrap{ max-width:1180px; margin:0 auto; padding:28px 24px 60px; }

//         .shd .profile-bar{ background:linear-gradient(135deg,var(--teal-900),var(--teal-700)); border-radius:20px; padding:22px 26px; color:#fff; display:flex; align-items:center; justify-content:space-between; gap:20px; box-shadow:var(--shadow); }
//         .shd .profile-left{ display:flex; align-items:center; gap:16px; }
//         .shd .avatar{ width:56px; height:56px; border-radius:16px; background:rgba(255,255,255,.16); display:flex; align-items:center; justify-content:center; font-family:'Lexend',sans-serif; font-weight:700; font-size:18px; border:1px solid rgba(255,255,255,.25); }
//         .shd .profile-left h1{ margin:0; font-size:20px; font-weight:700; }
//         .shd .profile-left .meta{ margin-top:3px; font-size:13px; color:rgba(255,255,255,.75); font-weight:500; }
//         .shd .profile-right{ display:flex; align-items:center; gap:10px; }
//         .shd .id-chip{ font-size:12px; font-weight:600; background:rgba(255,255,255,.14); padding:6px 12px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
//         .shd .back-pill{ display:flex; align-items:center; gap:6px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.25); color:#fff; padding:8px 14px; border-radius:100px; font-size:13px; font-weight:600; cursor:pointer; }

//         .shd .year-row{ display:flex; align-items:center; justify-content:space-between; margin-top:26px; flex-wrap:wrap; gap:14px; }
//         .shd .year-tabs{ display:flex; gap:6px; background:var(--card); padding:5px; border-radius:12px; border:1px solid var(--line); }
//         .shd .year-tab{ border:none; background:transparent; padding:9px 16px; border-radius:9px; font-size:13.5px; font-weight:600; color:var(--slate); cursor:pointer; font-family:'Inter',sans-serif; }
//         .shd .year-tab.active{ background:var(--teal-700); color:#fff; }
//         .shd .export-btn{ display:flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); color:var(--teal-900); font-weight:600; font-size:13.5px; padding:10px 16px; border-radius:10px; cursor:pointer; }
//         .shd .export-btn svg{ width:15px; height:15px; }

//         .shd .kpi-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:18px; }
//         .shd .kpi{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:18px 20px; box-shadow:var(--shadow); }
//         .shd .kpi .label{ font-size:12px; color:var(--slate); font-weight:600; text-transform:uppercase; letter-spacing:.04em; }
//         .shd .kpi .value{ font-family:'Lexend',sans-serif; font-size:25px; font-weight:700; margin-top:6px; }
//         .shd .kpi .sub{ font-size:12px; color:var(--slate-light); margin-top:2px; font-weight:500; }
//         .shd .kpi.accent-teal .value{ color:var(--teal-700); }
//         .shd .kpi.accent-amber .value{ color:#c07d0f; }
//         .shd .kpi.accent-violet .value{ color:var(--violet); }
//         .shd .kpi.accent-coral .value{ color:#c94b48; }

//         .shd .section{ margin-top:28px; }
//         .shd .section-label{ display:flex; align-items:center; gap:9px; margin-bottom:12px; padding-left:2px; }
//         .shd .section-label .dot{ width:9px; height:9px; border-radius:50%; flex-shrink:0; }
//         .shd .section-label h2{ margin:0; font-size:15px; font-weight:700; color:var(--ink); }

//         .shd .panel{ animation:fade .25s ease; }
//         @keyframes fade{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:none;} }

//         .shd .card{ background:var(--card); border:1px solid var(--line); border-radius:18px; padding:22px 24px; box-shadow:var(--shadow); position:relative; }
//         .shd .card-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
//         .shd .card-head h3{ margin:0; font-size:16px; font-weight:700; }
//         .shd .card-head .sub{ font-size:12.5px; color:var(--slate); margin-top:2px; }

//         .shd .dots-btn{ width:32px; height:32px; border-radius:9px; border:1px solid var(--line); background:var(--paper); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--slate); }
//         .shd .dots-btn:hover{ background:var(--teal-100); color:var(--teal-900); }
//         .shd .menu-wrap{ position:relative; }
//         .shd .dropdown{ position:absolute; right:0; top:40px; width:280px; background:#fff; border:1px solid var(--line); border-radius:14px; box-shadow:0 12px 32px -8px rgba(15,45,42,.22); padding:16px; z-index:20; display:none; }
//         .shd .dropdown.open{ display:block; }
//         .shd .dropdown label{ font-size:11.5px; font-weight:700; color:var(--slate); text-transform:uppercase; letter-spacing:.03em; }
//         .shd .range-row{ display:flex; gap:8px; margin-top:6px; margin-bottom:14px; }
//         .shd .range-row input{ flex:1; border:1px solid var(--line); border-radius:9px; padding:8px 10px; font-size:12.5px; font-family:'JetBrains Mono',monospace; color:var(--ink); min-width:0; }
//         .shd .dropdown-btn{ width:100%; background:var(--teal-700); color:#fff; border:none; padding:10px; border-radius:10px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; }
//         .shd .dropdown-btn svg{ width:14px; height:14px; }

//         .shd .attendance-layout{ display:grid; grid-template-columns:200px 1fr; gap:28px; margin-top:16px; align-items:center; }
//         .shd .ring-box{ display:flex; flex-direction:column; align-items:center; }
//         .shd .ring-box .big{ font-family:'Lexend',sans-serif; font-size:28px; font-weight:800; fill:var(--teal-900); }
//         .shd .ring-box .cap{ font-size:11px; fill:var(--slate); font-weight:600; }
//         .shd .legend{ display:flex; gap:16px; margin-top:12px; font-size:12px; color:var(--slate); }
//         .shd .legend span{ display:flex; align-items:center; gap:6px; font-weight:600; }
//         .shd .legend i{ width:9px; height:9px; border-radius:2px; display:inline-block; }
//         .shd .bars{ display:flex; align-items:flex-end; gap:8px; height:150px; padding-top:10px; flex:1; justify-content:space-between; }
//         .shd .bar-col{ display:flex; flex-direction:column; align-items:center; gap:8px; flex:1; height:100%; justify-content:flex-end; cursor:pointer; border-radius:8px; transition:background .15s; padding:6px 4px 0; }
//         .shd .bar-col:hover{ background:var(--teal-100); }
//         .shd .bar-stack{ width:16px; border-radius:5px 5px 3px 3px; overflow:hidden; display:flex; flex-direction:column-reverse; }
//         .shd .bar-present{ background:var(--teal-500); }
//         .shd .bar-absent{ background:var(--coral); }
//         .shd .bar-col .m{ font-size:10.5px; color:var(--slate-light); font-weight:600; transition:color .15s; }
//         .shd .bar-col:hover .m{ color:var(--teal-900); }

//         .shd .crumbs{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--slate); font-weight:600; margin:16px 0 14px; }
//         .shd .crumbs .back-link{ display:flex; align-items:center; gap:5px; color:var(--teal-700); cursor:pointer; }
//         .shd .crumbs .back-link:hover{ text-decoration:underline; }
//         .shd .crumbs svg{ width:13px; height:13px; }
//         .shd .drill-summary{ display:flex; gap:22px; margin-bottom:16px; }
//         .shd .drill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; display:flex; align-items:center; gap:6px; }
//         .shd .drill-stat b{ font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--ink); }
//         .shd .day-grid{ display:grid; grid-template-columns:repeat(10,1fr); gap:7px; }
//         .shd .day-cell{ aspect-ratio:1; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; cursor:default; position:relative; }
//         .shd .day-cell.present{ background:var(--teal-100); color:var(--teal-900); }
//         .shd .day-cell.absent{ background:var(--coral-100); color:#c94b48; }
//         .shd .day-cell.holiday{ background:#f1f3f2; color:var(--slate-light); }
//         .shd .day-cell.weekend{ background:transparent; color:var(--slate-light); border:1px dashed var(--line); }
//         .shd .day-cell:hover::after{ content:attr(data-tip); position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:var(--ink); color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:10.5px; padding:4px 8px; border-radius:6px; white-space:nowrap; z-index:5; }
//         .shd .day-legend{ display:flex; gap:16px; margin-top:16px; font-size:11.5px; color:var(--slate); font-weight:600; }
//         .shd .day-legend span{ display:flex; align-items:center; gap:6px; }
//         .shd .day-legend i{ width:9px; height:9px; border-radius:3px; display:inline-block; }

//         .shd .activity-tabs{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
//         .shd .activity-tab{ border:1px solid var(--line); background:var(--paper); padding:9px 15px; border-radius:11px; font-size:13px; font-weight:600; color:var(--slate); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; }
//         .shd .activity-tab .ico{ font-size:15px; }
//         .shd .activity-tab.active{ background:var(--violet-100); border-color:var(--violet); color:var(--violet); }
//         .shd .skill-stats{ display:flex; gap:24px; margin-bottom:14px; }
//         .shd .skill-stat{ font-size:12.5px; color:var(--slate); font-weight:600; }
//         .shd .skill-stat b{ font-family:'JetBrains Mono',monospace; font-size:14px; color:var(--ink); display:block; margin-top:2px; }
//         .shd .chart-box{ position:relative; padding-top:6px; }
//         .shd .chart-pt{ cursor:pointer; }
//         .shd .chart-pt-emoji{ font-size:15px; text-anchor:middle; cursor:pointer; }
//         .shd .chart-month-labels{ display:flex; margin-top:4px; }
//         .shd .chart-month-labels span{ flex:1; text-align:center; font-size:10.5px; color:var(--slate-light); font-weight:600; }

//         .shd .log-list{ display:flex; flex-direction:column; gap:10px; }
//         .shd .log-row{ display:flex; align-items:center; justify-content:space-between; padding:11px 14px; background:var(--paper); border:1px solid var(--line); border-radius:12px; }
//         .shd .log-left{ display:flex; align-items:center; gap:12px; }
//         .shd .log-emoji{ font-size:20px; }
//         .shd .log-date{ font-size:12.5px; font-weight:700; }
//         .shd .log-note{ font-size:11.5px; color:var(--slate); margin-top:1px; }
//         .shd .log-rating{ font-family:'JetBrains Mono',monospace; font-weight:700; font-size:14px; color:var(--violet); }

//         .shd .assess-list{ margin-top:16px; display:flex; flex-direction:column; gap:14px; }
//         .shd .assess-row{ display:grid; grid-template-columns:130px 1fr 46px 60px; align-items:center; gap:14px; }
//         .shd .assess-row .subj{ font-size:13px; font-weight:600; }
//         .shd .track{ background:var(--teal-100); border-radius:100px; height:9px; overflow:hidden; }
//         .shd .fill{ height:100%; border-radius:100px; background:linear-gradient(90deg,var(--teal-500),var(--teal-700)); }
//         .shd .assess-row .pct{ font-family:'JetBrains Mono',monospace; font-size:12.5px; text-align:right; color:var(--slate); }
//         .shd .grade-chip{ font-size:11.5px; font-weight:700; text-align:center; padding:4px 0; border-radius:7px; background:var(--teal-100); color:var(--teal-900); }

//         .shd .wall{ display:flex; gap:14px; margin-top:16px; overflow-x:auto; padding-bottom:6px; }
//         .shd .react-card{ min-width:220px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:8px; }
//         .shd .react-top{ display:flex; align-items:center; justify-content:space-between; }
//         .shd .emoji{ font-size:26px; }
//         .shd .react-teacher{ font-size:12.5px; font-weight:700; }
//         .shd .react-subj{ font-size:11px; color:var(--slate); font-weight:600; }
//         .shd .react-note{ font-size:12.5px; color:var(--ink); line-height:1.45; }
//         .shd .react-date{ font-size:10.5px; color:var(--slate-light); font-family:'JetBrains Mono',monospace; }

//         .shd .inv-row{ display:flex; align-items:center; justify-content:space-between; padding:14px 4px; border-bottom:1px solid var(--line); }
//         .shd .inv-row:last-child{ border-bottom:none; }
//         .shd .inv-left{ display:flex; align-items:center; gap:12px; }
//         .shd .inv-icon{ width:36px; height:36px; border-radius:10px; background:var(--teal-100); color:var(--teal-900); display:flex; align-items:center; justify-content:center; }
//         .shd .inv-title{ font-size:13.5px; font-weight:700; }
//         .shd .inv-date{ font-size:11.5px; color:var(--slate-light); margin-top:2px; font-family:'JetBrains Mono',monospace; }
//         .shd .inv-right{ display:flex; align-items:center; gap:10px; }
//         .shd .status-chip{ font-size:11px; font-weight:700; padding:5px 10px; border-radius:100px; }
//         .shd .status-paid{ background:#e3f6ea; color:#1f8a4c; }
//         .shd .dl-btn{ background:var(--teal-700); color:#fff; border:none; font-size:12px; font-weight:600; padding:8px 14px; border-radius:9px; cursor:pointer; display:flex; align-items:center; gap:6px; }
//         .shd .dl-btn svg{ width:13px; height:13px; }

//         @media (max-width:780px){
//           .shd .kpi-row{ grid-template-columns:repeat(2,1fr); }
//           .shd .attendance-layout{ grid-template-columns:1fr; }
//           .shd .assess-row{ grid-template-columns:90px 1fr 40px 52px; }
//         }
//       `}</style>

//       <div className="shd">
//         <div className="wrap">

//           {/* Profile bar */}
//           <div className="profile-bar">
//             <div className="profile-left">
//               <div className="avatar">AK</div>
//               <div>
//                 <h1>Aditya Krishnan</h1>
//                 <div className="meta">Grade 8 · Section A &nbsp;·&nbsp; Global Kids Academy</div>
//               </div>
//             </div>
//             <div className="profile-right">
//               <span className="id-chip">EMP00203 · Percy</span>
//               <button className="back-pill">
//                 <ArrowBackIcon style={{ fontSize: 15 }} />
//                 Back to list
//               </button>
//             </div>
//           </div>

//           {/* Year selector + export */}
//           <div className="year-row">
//             <div className="year-tabs">
//               {['2026-27', '2025-26', '2024-25'].map((y) => (
//                 <button key={y} className={`year-tab${activeYear === y ? ' active' : ''}`} onClick={() => setActiveYear(y)}>{y}</button>
//               ))}
//             </div>
//             <button className="export-btn">
//               <FileDownloadIcon style={{ fontSize: 16 }} />
//               Export full year report
//             </button>
//           </div>

//           {/* KPI summary */}
//           <div className="kpi-row">
//             <div className="kpi accent-teal">
//               <div className="label">Attendance</div>
//               <div className="value">{pctAttendance}%</div>
//               <div className="sub">{totalPresent} / {totalDays} days present</div>
//             </div>
//             <div className="kpi accent-amber">
//               <div className="label">Avg. Assessment</div>
//               <div className="value">A-</div>
//               <div className="sub">87% across 6 subjects</div>
//             </div>
//             <div className="kpi accent-violet">
//               <div className="label">Skill Growth</div>
//               <div className="value">+18%</div>
//               <div className="sub">vs. previous term</div>
//             </div>
//             <div className="kpi accent-coral">
//               <div className="label">Fees Paid</div>
//               <div className="value mono">₹1,86,000</div>
//               <div className="sub">of ₹1,86,000 due</div>
//             </div>
//           </div>

//           {/* ATTENDANCE SECTION */}
//           <div className="section">
//             <div className="section-label"><span className="dot" style={{ background: 'var(--teal-500)' }}></span><h2>Attendance</h2></div>
//             <div className="panel">
//               <div className="card">
//                 <div className="card-head">
//                   <div>
//                     <h3>Attendance overview</h3>
//                     <div className="sub">Click a month to see day-by-day attendance</div>
//                   </div>
//                   <DotsMenu id="attendance" openMenu={openMenu} setOpenMenu={setOpenMenu} label="attendance" />
//                 </div>

//                 {monthDrillIdx === null ? (
//                   <div className="attendance-layout">
//                     <div className="ring-box">
//                       <svg width="160" height="160" viewBox="0 0 160 160">
//                         <circle cx="80" cy="80" r={ringR} fill="none" stroke="#eef4f3" strokeWidth="16" />
//                         <circle cx="80" cy="80" r={ringR} fill="none" stroke="var(--teal-500)" strokeWidth="16"
//                           strokeDasharray={ringCirc.toFixed(1)} strokeDashoffset={ringOffset.toFixed(1)}
//                           strokeLinecap="round" transform="rotate(-90 80 80)" />
//                         <text x="80" y="76" textAnchor="middle" className="big">{pctAttendance}%</text>
//                         <text x="80" y="96" textAnchor="middle" className="cap">PRESENT</text>
//                       </svg>
//                       <div className="legend">
//                         <span><i style={{ background: 'var(--teal-500)' }}></i>Present</span>
//                         <span><i style={{ background: 'var(--coral)' }}></i>Absent</span>
//                       </div>
//                     </div>

//                     <div className="bars">
//                       {monthShort.map((m, i) => {
//                         const total = present[i] + absent[i];
//                         const pH = (present[i] / total) * maxH;
//                         const aH = (absent[i] / total) * maxH;
//                         return (
//                           <div key={m} className="bar-col" onClick={() => setMonthDrillIdx(i)}>
//                             <div className="bar-stack" style={{ height: pH + aH }}>
//                               <div className="bar-absent" style={{ height: aH }}></div>
//                               <div className="bar-present" style={{ height: pH }}></div>
//                             </div>
//                             <div className="m">{m}</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="crumbs">
//                       <span className="back-link" onClick={() => setMonthDrillIdx(null)}>
//                         <ArrowBackIcon style={{ fontSize: 14 }} />
//                         Back to overview
//                       </span>
//                       <span>›</span>
//                       <span style={{ color: 'var(--ink)' }}>{monthNames[monthDrillIdx]} {monthYear[monthDrillIdx]}</span>
//                     </div>
//                     <div className="drill-summary">
//                       <div className="drill-stat">Present <b>{dayCounts.present || 0} days</b></div>
//                       <div className="drill-stat">Absent <b>{dayCounts.absent || 0} days</b></div>
//                       <div className="drill-stat">Holidays <b>{dayCounts.holiday || 0} days</b></div>
//                     </div>
//                     <div className="day-grid">
//                       {dayGrid.map((d) => (
//                         <div key={d.day} className={`day-cell ${d.status}`}
//                           data-tip={`${monthShort[monthDrillIdx]} ${d.day} · ${d.status.charAt(0).toUpperCase() + d.status.slice(1)}`}>
//                           {d.day}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="day-legend">
//                       <span><i style={{ background: 'var(--teal-100)' }}></i>Present</span>
//                       <span><i style={{ background: 'var(--coral-100)' }}></i>Absent</span>
//                       <span><i style={{ background: '#f1f3f2' }}></i>Holiday</span>
//                       <span><i style={{ background: 'transparent', border: '1px dashed var(--line)' }}></i>Weekend</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ASSESSMENT SECTION */}
//           <div className="section">
//             <div className="section-label"><span className="dot" style={{ background: 'var(--amber)' }}></span><h2>Assessment</h2></div>
//             <div className="panel">
//               <div className="card">
//                 <div className="card-head">
//                   <div>
//                     <h3>Assessment performance</h3>
//                     <div className="sub">Subject-wise scores · latest term</div>
//                   </div>
//                   <DotsMenu id="assessment" openMenu={openMenu} setOpenMenu={setOpenMenu} label="assessment" />
//                 </div>
//                 <div className="assess-list">
//                   {assessments.map((a) => (
//                     <div key={a.subj} className="assess-row">
//                       <div className="subj">{a.subj}</div>
//                       <div className="track"><div className="fill" style={{ width: `${a.pct}%` }}></div></div>
//                       <div className="pct">{a.pct}%</div>
//                       <div className="grade-chip">{a.grade}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SKILLS SECTION */}
//           <div className="section">
//             <div className="section-label"><span className="dot" style={{ background: 'var(--violet)' }}></span><h2>Skill Identification</h2></div>
//             <div className="panel">
//               <div className="card">
//                 <div className="card-head">
//                   <div>
//                     <h3>Skill identification</h3>
//                     <div className="sub">Observed by teachers across the year</div>
//                   </div>
//                   <DotsMenu id="skills" openMenu={openMenu} setOpenMenu={setOpenMenu} label="skill report" />
//                 </div>

//                 <div className="activity-tabs">
//                   {Object.entries(skillData).map(([key, d]) => (
//                     <button key={key} className={`activity-tab${currentActivity === key ? ' active' : ''}`}
//                       onClick={() => { setCurrentActivity(key); setSkillDrillIdx(null); }}>
//                       <span className="ico">{d.icon}</span>{d.label}
//                     </button>
//                   ))}
//                 </div>

//                 {skillDrillIdx === null ? (
//                   <div>
//                     <div className="skill-stats">
//                       <div className="skill-stat">Current rating<b>{skCurrent} {emojiFor(skCurrent)}</b></div>
//                       <div className="skill-stat">Highest<b>{skHigh}</b></div>
//                       <div className="skill-stat">Lowest<b>{skLow}</b></div>
//                       <div className="skill-stat">6-month avg<b>{skAvg}</b></div>
//                     </div>
//                     <div className="chart-box">
//                       <svg width="100%" height="150" viewBox="0 0 620 150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
//                         <defs>
//                           <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
//                             <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
//                           </linearGradient>
//                         </defs>
//                         <path d={areaPath} fill="url(#skillGrad)" stroke="none"></path>
//                         <path d={linePath} fill="none" stroke="var(--violet)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"></path>
//                         {pts.map((p) => (
//                           <g key={p.i} style={{ cursor: 'pointer' }} onClick={() => setSkillDrillIdx(p.i)}>
//                             <circle className="chart-pt" cx={p.x} cy={p.y} r="4" fill="#fff" stroke="var(--violet)" strokeWidth="2.5" />
//                             <text className="chart-pt-emoji" x={p.x} y={p.y - 14}>{emojiFor(p.r)}</text>
//                           </g>
//                         ))}
//                       </svg>
//                       <div className="chart-month-labels">
//                         {monthShort.map((m) => <span key={m}>{m}</span>)}
//                       </div>
//                     </div>
//                     <div className="sub" style={{ marginTop: 10 }}>Click a point to see individual session ratings for that month.</div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="crumbs">
//                       <span className="back-link" onClick={() => setSkillDrillIdx(null)}>
//                         <ArrowBackIcon style={{ fontSize: 14 }} />
//                         Back to trend
//                       </span>
//                       <span>›</span>
//                       <span style={{ color: 'var(--ink)' }}>
//                         {skillData[currentActivity].icon} {skillData[currentActivity].label} · {monthShort[skillDrillIdx]} {monthYear[skillDrillIdx]} sessions
//                       </span>
//                     </div>
//                     <div className="log-list">
//                       {sessionLog.map((s, idx) => (
//                         <div key={idx} className="log-row">
//                           <div className="log-left">
//                             <span className="log-emoji">{emojiFor(s.rating)}</span>
//                             <div>
//                               <div className="log-date">{s.date}, {s.year}</div>
//                               <div className="log-note">{s.note}</div>
//                             </div>
//                           </div>
//                           <div className="log-rating">{s.rating}/10</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* TEACHER WALL SECTION */}
//           <div className="section">
//             <div className="section-label"><span className="dot" style={{ background: '#f26d6d' }}></span><h2>Teacher Wall</h2></div>
//             <div className="panel">
//               <div className="card">
//                 <div className="card-head">
//                   <div>
//                     <h3>Teacher wall</h3>
//                     <div className="sub">Reactions & appreciation from subject teachers</div>
//                   </div>
//                   <DotsMenu id="reactions" openMenu={openMenu} setOpenMenu={setOpenMenu} label="teacher wall" />
//                 </div>
//                 <div className="wall">
//                   {teacherWall.map((r, idx) => (
//                     <div key={idx} className="react-card">
//                       <div className="react-top"><span className="emoji">{r.emoji}</span><span className="react-date">{r.date}</span></div>
//                       <div className="react-teacher">{r.teacher}</div>
//                       <div className="react-subj">{r.subj}</div>
//                       <div className="react-note">{r.note}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* INVOICES SECTION */}
//           <div className="section">
//             <div className="section-label"><span className="dot" style={{ background: '#3fb1e0' }}></span><h2>Invoices</h2></div>
//             <div className="panel">
//               <div className="card">
//                 <div className="card-head">
//                   <div>
//                     <h3>Invoices & fee records</h3>
//                     <div className="sub">2026-27 academic year</div>
//                   </div>
//                   <DotsMenu id="invoices" openMenu={openMenu} setOpenMenu={setOpenMenu} label="invoice report" />
//                 </div>
//                 <div>
//                   {invoices.map((inv, idx) => (
//                     <div key={idx} className="inv-row">
//                       <div className="inv-left">
//                         <div className="inv-icon">
//                           {inv.kind === 'doc' ? (
//                             <DescriptionOutlinedIcon style={{ fontSize: 18 }} />
//                           ) : (
//                             <CheckCircleOutlineIcon style={{ fontSize: 18 }} />
//                           )}
//                         </div>
//                         <div>
//                           <div className="inv-title">{inv.title}</div>
//                           <div className="inv-date">{inv.date}</div>
//                         </div>
//                       </div>
//                       <div className="inv-right">
//                         <span className="status-chip status-paid">{inv.status}</span>
//                         <button className="dl-btn">
//                           <FileDownloadIcon style={{ fontSize: 15 }} />
//                           Download
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
