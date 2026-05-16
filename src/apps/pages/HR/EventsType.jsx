// School Events Management System — Categories + Forms
// ─────────────────────────────────────────────────────────────────────────
// USAGE: This component receives yearId and yearLabel as props from the
//        Academic Year list page (your separate module).
//
//        <EventsType yearId={1} yearLabel="2026-27" />
//
// Page flow inside this component:
//   "cat"  → Category card grid  (GET /academic-years/:yearId/categories)
//   "form" → Event add form      (POST /events/:category)
// ─────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import {
  Box, AppBar, Toolbar, Breadcrumbs, Link, Button, IconButton,
  Typography, Grid, Card, CardContent, Paper, Chip, TextField,
  MenuItem, Select, FormControl, InputLabel, Alert, Autocomplete,
  Avatar, Tooltip, InputAdornment, Switch, Divider,
  ToggleButton, ToggleButtonGroup, Snackbar, CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ── API SERVICE ───────────────────────────────────────────────────────────
// All data lives here as mock. When real API is ready:
//   1. Set BASE_URL to your API root
//   2. Uncomment the fetch() lines and remove the mock return blocks
const BASE_URL = "https://your-api.com/api"; // 🔁 update when API is ready

const ApiService = {

  // GET /academic-years/:yearId/categories
  getCategories: async (yearId) => {
    // 🔁 REAL: return fetch(`${BASE_URL}/academic-years/${yearId}/categories`).then(r => r.json())
    return {
      success: true,
      data: [
        { key: "emergency", label: "Emergency",   icon: "🚨", description: "School closure, evacuation, medical, transport alerts", eventCount: 2, color: "#C62828", bgColor: "#FFEBEE" },
        { key: "academic",  label: "Academic",    icon: "📚", description: "Exams, results, PTA meetings, syllabus notifications",  eventCount: 6, color: "#1565C0", bgColor: "#E3F2FD" },
        { key: "sports",    label: "Sports",      icon: "🏆", description: "Sports day, tournaments, athletics, inter-school",      eventCount: 4, color: "#2E7D32", bgColor: "#E8F5E9" },
        { key: "cultural",  label: "Cultural",    icon: "🎭", description: "Annual day, talent show, dance, drama, music",          eventCount: 3, color: "#6A1B9A", bgColor: "#F3E5F5" },
        { key: "holiday",   label: "Holiday",     icon: "🏖️", description: "National, regional, school holidays and special leaves", eventCount: 5, color: "#E65100", bgColor: "#FFF3E0" },
        { key: "circular",  label: "Circular",    icon: "📋", description: "Fee reminders, uniform notices, general announcements", eventCount: 2, color: "#37474F", bgColor: "#ECEFF1" },
        { key: "pta",       label: "PTA Meeting", icon: "🤝", description: "Parent-teacher meetings, board meetings, committees",   eventCount: 1, color: "#F57F17", bgColor: "#FFFDE7" },
        { key: "workshop",  label: "Workshop",    icon: "🔬", description: "Training sessions, seminars, skill development",        eventCount: 1, color: "#00695C", bgColor: "#E0F2F1" },
      ],
    };
  },

  // GET /students?standard=:std
  getStudentsByStandard: async (standard) => {
    // 🔁 REAL: return fetch(`${BASE_URL}/students?standard=${standard}`).then(r => r.json())
    const MOCK = {
      "1":  [{ id:"STU-1-001", name:"Aarav Kumar",    rollNo:"01", section:"A", standard:"1" }, { id:"STU-1-002", name:"Priya Devi",     rollNo:"02", section:"A", standard:"1" }, { id:"STU-1-003", name:"Karthik R",     rollNo:"03", section:"B", standard:"1" }, { id:"STU-1-004", name:"Divya S",        rollNo:"04", section:"B", standard:"1" }, { id:"STU-1-005", name:"Mohammed Ali",  rollNo:"05", section:"A", standard:"1" }],
      "2":  [{ id:"STU-2-001", name:"Sneha Rajan",    rollNo:"01", section:"A", standard:"2" }, { id:"STU-2-002", name:"Arjun Nair",     rollNo:"02", section:"A", standard:"2" }, { id:"STU-2-003", name:"Kavya P",       rollNo:"03", section:"B", standard:"2" }, { id:"STU-2-004", name:"Rahul V",        rollNo:"04", section:"B", standard:"2" }, { id:"STU-2-005", name:"Ananya M",      rollNo:"05", section:"C", standard:"2" }],
      "3":  [{ id:"STU-3-001", name:"Vishnu T",       rollNo:"01", section:"A", standard:"3" }, { id:"STU-3-002", name:"Lakshmi G",     rollNo:"02", section:"A", standard:"3" }, { id:"STU-3-003", name:"Sanjay K",      rollNo:"03", section:"B", standard:"3" }, { id:"STU-3-004", name:"Nithya R",      rollNo:"04", section:"B", standard:"3" }, { id:"STU-3-005", name:"Arun S",        rollNo:"05", section:"A", standard:"3" }],
      "4":  [{ id:"STU-4-001", name:"Deepa M",        rollNo:"01", section:"A", standard:"4" }, { id:"STU-4-002", name:"Suresh P",      rollNo:"02", section:"B", standard:"4" }, { id:"STU-4-003", name:"Meena K",       rollNo:"03", section:"A", standard:"4" }, { id:"STU-4-004", name:"Ravi J",         rollNo:"04", section:"C", standard:"4" }, { id:"STU-4-005", name:"Pooja N",       rollNo:"05", section:"B", standard:"4" }],
      "5":  [{ id:"STU-5-001", name:"Ganesh R",       rollNo:"01", section:"A", standard:"5" }, { id:"STU-5-002", name:"Uma S",         rollNo:"02", section:"A", standard:"5" }, { id:"STU-5-003", name:"Bala K",        rollNo:"03", section:"B", standard:"5" }, { id:"STU-5-004", name:"Sindhu V",      rollNo:"04", section:"B", standard:"5" }, { id:"STU-5-005", name:"Mani T",        rollNo:"05", section:"C", standard:"5" }],
      "6":  [{ id:"STU-6-001", name:"Ajith Kumar",    rollNo:"01", section:"A", standard:"6" }, { id:"STU-6-002", name:"Revathi S",     rollNo:"02", section:"A", standard:"6" }, { id:"STU-6-003", name:"Prasad M",      rollNo:"03", section:"B", standard:"6" }, { id:"STU-6-004", name:"Nisha K",       rollNo:"04", section:"B", standard:"6" }, { id:"STU-6-005", name:"Vijay R",       rollNo:"05", section:"C", standard:"6" }],
      "7":  [{ id:"STU-7-001", name:"Surya P",        rollNo:"01", section:"A", standard:"7" }, { id:"STU-7-002", name:"Keerthana M",   rollNo:"02", section:"A", standard:"7" }, { id:"STU-7-003", name:"Dinesh R",      rollNo:"03", section:"B", standard:"7" }, { id:"STU-7-004", name:"Pavithra K",    rollNo:"04", section:"B", standard:"7" }, { id:"STU-7-005", name:"Sathish V",     rollNo:"05", section:"A", standard:"7" }],
      "8":  [{ id:"STU-8-001", name:"Harish N",       rollNo:"01", section:"A", standard:"8" }, { id:"STU-8-002", name:"Indira K",      rollNo:"02", section:"B", standard:"8" }, { id:"STU-8-003", name:"Lokesh R",      rollNo:"03", section:"A", standard:"8" }, { id:"STU-8-004", name:"Malar S",       rollNo:"04", section:"C", standard:"8" }, { id:"STU-8-005", name:"Naresh T",      rollNo:"05", section:"B", standard:"8" }],
      "9":  [{ id:"STU-9-001", name:"Oviya M",        rollNo:"01", section:"A", standard:"9" }, { id:"STU-9-002", name:"Prakash R",     rollNo:"02", section:"A", standard:"9" }, { id:"STU-9-003", name:"Ragavi K",      rollNo:"03", section:"B", standard:"9" }, { id:"STU-9-004", name:"Senthil S",     rollNo:"04", section:"B", standard:"9" }, { id:"STU-9-005", name:"Tamizh V",      rollNo:"05", section:"C", standard:"9" }],
      "10": [{ id:"STU-10-001", name:"Usha P",        rollNo:"01", section:"A", standard:"10" }, { id:"STU-10-002", name:"Vasanth K",   rollNo:"02", section:"A", standard:"10" }, { id:"STU-10-003", name:"Yamini R",    rollNo:"03", section:"B", standard:"10" }, { id:"STU-10-004", name:"Zuber M",     rollNo:"04", section:"B", standard:"10" }, { id:"STU-10-005", name:"Abinaya S",   rollNo:"05", section:"A", standard:"10" }],
      "11": [{ id:"STU-11-001", name:"Bharath R",     rollNo:"01", section:"A", standard:"11" }, { id:"STU-11-002", name:"Chitra M",    rollNo:"02", section:"B", standard:"11" }, { id:"STU-11-003", name:"Durai K",     rollNo:"03", section:"A", standard:"11" }, { id:"STU-11-004", name:"Elavarasi P", rollNo:"04", section:"C", standard:"11" }, { id:"STU-11-005", name:"Fathima N",   rollNo:"05", section:"B", standard:"11" }],
      "12": [{ id:"STU-12-001", name:"Gokul S",       rollNo:"01", section:"A", standard:"12" }, { id:"STU-12-002", name:"Hema K",      rollNo:"02", section:"A", standard:"12" }, { id:"STU-12-003", name:"Ilayaraja R", rollNo:"03", section:"B", standard:"12" }, { id:"STU-12-004", name:"Janani V",    rollNo:"04", section:"B", standard:"12" }, { id:"STU-12-005", name:"Kalaivani M", rollNo:"05", section:"C", standard:"12" }],
    };
    return { success: true, data: MOCK[standard] || [], meta: { standard, total: (MOCK[standard] || []).length } };
  },

  // POST /events/:category
  submitEvent: async (category, payload) => {
    // 🔁 REAL:
    // return fetch(`${BASE_URL}/events/${category}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // }).then(r => r.json())
    console.log(`[Mock] POST /events/${category}`, payload);
    return { success: true, message: "Event published successfully", data: { eventId: `EVT-MOCK-${Date.now()}` } };
  },
};

// ── THEME ─────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00897B", dark: "#00695C", light: "#E0F2F1", contrastText: "#fff" },
    secondary: { main: "#C62828" },
    error: { main: "#C62828" },
    background: { default: "#F0F4F8", paper: "#FFFFFF" },
    text: { primary: "#1C2331", secondary: "#718096" },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
    fontSize: 13,
    h6: { fontWeight: 700, fontSize: "1.1rem" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, fontSize: 13 } } },
    MuiTableCell: { styleOverrides: { head: { background: "#00897B", color: "#fff", fontWeight: 700, fontSize: 12 }, body: { fontSize: 13 } } },
    MuiTextField: { defaultProps: { size: "small" } },
    MuiSelect: { defaultProps: { size: "small" } },
    MuiFormControl: { defaultProps: { size: "small" } },
    MuiCard: { styleOverrides: { root: { boxShadow: "0 1px 3px rgba(0,0,0,.08)" } } },
  },
});

// ── CONSTANTS (UI-only, no API needed) ────────────────────────────────────
const STANDARDS = Array.from({ length: 12 }, (_, i) => ({ label: `Std ${i + 1}`, value: `${i + 1}` }));
const SUBJECTS  = ["Tamil", "English", "Maths", "Science", "Social Science", "Computer", "Hindi", "Physics", "Chemistry", "Biology"];
const CAT_LABELS = { emergency: "Emergency Alert", academic: "Academic Event", sports: "Sports Event", cultural: "Cultural Event", holiday: "Holiday", circular: "Circular", pta: "PTA Meeting", workshop: "Workshop / Training" };

const initials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

// ── TOPBAR ────────────────────────────────────────────────────────────────
// Breadcrumbs: "Categories — {yearLabel}"  ›  "{Event Type}" (on form page)
// "Categories" crumb links back from form → card view
function TopBar({ crumbs, addLabel, onAdd }) {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#fff", borderBottom: "1px solid #E2E8F0", color: "text.primary" }}>
      <Toolbar sx={{ gap: 1.5, minHeight: "60px !important" }}>
        <Breadcrumbs separator="›" sx={{ flex: 1 }}>
          {crumbs.map((c, i) =>
            i === crumbs.length - 1
              ? <Typography key={i} sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>{c.label}</Typography>
              : <Link key={i} underline="hover" sx={{ fontSize: 13, color: "text.secondary", cursor: "pointer", "&:hover": { color: "primary.main" } }} onClick={c.onClick}>{c.label}</Link>
          )}
        </Breadcrumbs>
        <Button variant="outlined" size="small" sx={{ color: "text.secondary", borderColor: "#E2E8F0", fontSize: 12 }}>⬇ Export</Button>
        <Button variant="contained" size="small" onClick={onAdd} disableElevation>+ {addLabel}</Button>
      </Toolbar>
    </AppBar>
  );
}

// ── PAGE: CATEGORIES (card grid) ──────────────────────────────────────────
// Fetches: GET /academic-years/:yearId/categories
// Response shape: { success, data: [ { key, label, icon, description, eventCount, color, bgColor } ] }
function CatPage({ yearId, yearLabel, onSelectCat }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    setLoading(true);
    // 🔁 yearId scopes the eventCount per academic year
    ApiService.getCategories(yearId).then(res => {
      if (res.success) setCategories(res.data);
      setLoading(false);
    });
  }, [yearId]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}><CircularProgress color="primary" /></Box>;

  return (
    <Box>
      <Typography variant="h6">Event Categories — {yearLabel}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: .4 }}>Select a category to create or manage events</Typography>
      <Grid container spacing={2} sx={{ mt: .5 }}>
        {categories.map(cat => (
          <Grid item xs={12} sm={6} md={3} key={cat.key}>
            <Card onClick={() => onSelectCat(cat.key)} sx={{
              cursor: "pointer", position: "relative", overflow: "visible", border: "1px solid #E2E8F0",
              transition: "all .2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,.12)", borderColor: "transparent" },
              // color + bgColor come from API response
              "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "10px 10px 0 0", background: cat.color },
            }}>
              <CardContent sx={{ p: "20px !important" }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, mb: 1.5, bgcolor: cat.bgColor }}>{cat.icon}</Box>
                <Typography fontWeight={700} fontSize={14} mb={.5}>{cat.label}</Typography>
                <Typography fontSize={11} color="text.secondary" lineHeight={1.5}>{cat.description}</Typography>
                {/* eventCount is scoped to the selected yearId */}
                <Chip label={`${cat.eventCount} event${cat.eventCount !== 1 ? "s" : ""}`} size="small"
                  sx={{ mt: 1.5, bgcolor: cat.bgColor, color: cat.color, fontWeight: 600, fontSize: 11 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ── SHARED FORM WIDGETS ───────────────────────────────────────────────────
function FormHeader({ icon, title, subtitle, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: "18px 22px", background: color, borderRadius: "10px 10px 0 0" }}>
      <Avatar sx={{ bgcolor: "rgba(255,255,255,.2)", width: 40, height: 40, fontSize: 20 }}>{icon}</Avatar>
      <Box>
        <Typography fontWeight={700} fontSize={16} color="#fff">{title}</Typography>
        <Typography fontSize={12} sx={{ color: "rgba(255,255,255,.75)", mt: .3 }}>{subtitle}</Typography>
      </Box>
    </Box>
  );
}

function SLabel({ children }) {
  return <Typography sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: .8, mb: 1.2 }}>{children}</Typography>;
}

function TRow({ label, sub, checked, onChange }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.1, borderBottom: "1px solid #E2E8F0" }}>
      <Box>
        <Typography fontSize={13} fontWeight={500}>{label}</Typography>
        {sub && <Typography fontSize={11} color="text.secondary" mt={.3}>{sub}</Typography>}
      </Box>
      <Switch checked={checked} onChange={e => onChange(e.target.checked)} size="small" color="primary" />
    </Box>
  );
}

function ClassChips({ selected, onToggle, color = "#00897B" }) {
  const all = ["All school", ...STANDARDS.map(s => s.label), "Staff"];
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: .8, mb: 2 }}>
      {all.map(c => {
        const on = selected.includes(c);
        return <Chip key={c} label={c} size="small" clickable onClick={() => onToggle(c)}
          sx={{ bgcolor: on ? color : "transparent", color: on ? "#fff" : "text.secondary", border: `1px solid ${on ? color : "#E2E8F0"}`, fontWeight: on ? 600 : 400, transition: "all .15s" }} />;
      })}
    </Box>
  );
}

function UploadBox({ label }) {
  return (
    <Box sx={{ border: "1px dashed #E2E8F0", borderRadius: 1.5, p: 1.5, textAlign: "center", color: "text.secondary", fontSize: 12, mb: 2, cursor: "pointer", "&:hover": { borderColor: "primary.main", color: "primary.main" } }}>
      📎 {label || "Click to upload — PDF up to 10MB"}
    </Box>
  );
}

// ── STUDENT PICKER ────────────────────────────────────────────────────────
// Fetches: GET /students?standard=:std
// Response shape: { success, data: [ { id, name, rollNo, section, standard } ] }
function StudentPicker({ onPick, onClear, pickedStudent }) {
  const [stdVal, setStdVal]       = useState(null);
  const [stuVal, setStuVal]       = useState(null);
  const [stuOptions, setStuOptions] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const handleStdChange = async (_, v) => {
    setStdVal(v); setStuVal(null); onClear();
    if (!v) { setStuOptions([]); return; }
    setLoadingStudents(true);
    const res = await ApiService.getStudentsByStandard(v.value);
    if (res.success) setStuOptions(res.data.map(s => ({ ...s, label: `${s.name} — Roll ${s.rollNo} · Sec ${s.section}` })));
    setLoadingStudents(false);
  };

  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Autocomplete size="small" options={STANDARDS} value={stdVal} onChange={handleStdChange}
            renderInput={p => <TextField {...p} label="Standard *" />}
            renderOption={(props, opt) => (
              <li {...props}>
                <Avatar sx={{ width: 26, height: 26, fontSize: 10, fontWeight: 700, bgcolor: "#E0F2F1", color: "#00695C", mr: 1 }}>{opt.label.replace("Std ", "S")}</Avatar>
                <Box><Typography fontSize={13}>{opt.label}</Typography><Typography fontSize={11} color="text.secondary">Tap to load students</Typography></Box>
              </li>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete size="small" options={stuOptions} value={stuVal} disabled={!stdVal || loadingStudents} loading={loadingStudents}
            onChange={(_, v) => { if (v) { setStuVal(v); onPick({ ...v, std: stdVal?.value }); } }}
            renderInput={p => <TextField {...p} label="Student *" placeholder={stdVal ? `Search in ${stdVal.label}…` : "Select standard first"} />}
            renderOption={(props, opt) => (
              <li {...props}>
                <Avatar sx={{ width: 26, height: 26, fontSize: 11, fontWeight: 700, bgcolor: "#E0F2F1", color: "#00695C", mr: 1 }}>{initials(opt.name)}</Avatar>
                <Box flex={1}>
                  {/* 🔁 API fields: name, rollNo, section */}
                  <Typography fontSize={13}>{opt.name}</Typography>
                  <Typography fontSize={11} color="text.secondary">Roll {opt.rollNo} · Sec {opt.section}</Typography>
                </Box>
              </li>
            )}
          />
        </Grid>
      </Grid>
      {pickedStudent && (
        <Alert severity="error"
          icon={<Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 700, bgcolor: "#C62828", color: "#fff" }}>{initials(pickedStudent.name)}</Avatar>}
          action={<Button color="error" size="small" onClick={() => { onClear(); setStdVal(null); setStuVal(null); setStuOptions([]); }}>✕ Change</Button>}
          sx={{ mb: 2, bgcolor: "#FFEBEE", border: "1px solid #FFCDD2", ".MuiAlert-message": { flex: 1 }, ".MuiAlert-icon": { alignItems: "center" } }}>
          <Typography fontWeight={600} fontSize={14} color="error.main">{pickedStudent.name}</Typography>
          <Typography fontSize={11} sx={{ color: "#E57373" }}>Std {pickedStudent.standard} · Section {pickedStudent.section} · Roll No. {pickedStudent.rollNo}</Typography>
        </Alert>
      )}
    </Box>
  );
}

// ── FORMS ─────────────────────────────────────────────────────────────────
// Each form receives academicYearId (from prop) and calls ApiService.submitEvent on submit.
// Payload shape matches mock_api.json → POST /events/:category

function EmergencyForm({ academicYearId, onSubmitSuccess }) {
  const [emType, setEmType]         = useState("");
  const [priority, setPriority]     = useState("Critical");
  const [scope, setScope]           = useState("broad");
  const [msg, setMsg]               = useState("");
  const [actionRequired, setAction] = useState("");
  const [contactPerson, setContact] = useState("");
  const [pickedStu, setPickedStu]   = useState(null);
  const [selC, setSelC]             = useState(["All school"]);
  const [n, setN]                   = useState({ push: true, whatsapp: true, sms: true, ack: false });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      academicYearId, category: "emergency", emergencyType: emType, priority, scope,
      targetClasses: scope === "broad" ? selC : [],
      student: scope === "student" && pickedStu
        ? { studentId: pickedStu.id, name: pickedStu.name, standard: pickedStu.standard, section: pickedStu.section, rollNo: pickedStu.rollNo }
        : null,
      message: msg, actionRequired, contactPerson,
      notifications: { push: n.push, whatsapp: n.whatsapp, sms: n.sms, acknowledgementRequired: n.ack },
    };
    setSubmitting(true);
    const res = await ApiService.submitEvent("emergency", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🚨" title="Emergency Alert" subtitle="Sends immediately across all channels" color="linear-gradient(135deg,#C62828,#E53935)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Alert severity="error" sx={{ mb: 2, bgcolor: "#FFEBEE", border: "1px solid #FFCDD2", ".MuiAlert-icon": { color: "#C62828" } }}>
          Push, SMS and WhatsApp are ON by default. Fill in the details and hit Send Now.
        </Alert>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Emergency Type *</InputLabel>
              <Select value={emType} onChange={e => setEmType(e.target.value)} label="Emergency Type *">
                <MenuItem value="">Select type</MenuItem>
                {["Weather / Flood / School closure", "Safety issue", "Medical / Student injured", "Transport issue", "Other"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Priority *</InputLabel>
              <Select value={priority} onChange={e => setPriority(e.target.value)} label="Priority *">
                {["Critical", "High", "Medium"].map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <SLabel>Who is this about?</SLabel>
        <ToggleButtonGroup exclusive value={scope} onChange={(_, v) => v && setScope(v)} fullWidth
          sx={{ mb: 2, ".MuiToggleButton-root": { textTransform: "none", fontSize: 13, fontWeight: 500, "&.Mui-selected": { bgcolor: "#C62828", color: "#fff", "&:hover": { bgcolor: "#B71C1C" } } } }}>
          <ToggleButton value="broad">👥 Whole school / Class</ToggleButton>
          <ToggleButton value="student">👤 Specific Student</ToggleButton>
        </ToggleButtonGroup>
        {scope === "broad"
          ? <><SLabel>Notify</SLabel><ClassChips selected={selC} onToggle={c => setSelC(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} color="#C62828" /></>
          : <StudentPicker pickedStudent={pickedStu}
              onPick={s => { setPickedStu(s); if (!msg) setMsg(`Student ${s.name} (Std ${s.standard} · Sec ${s.section}) requires immediate attention.`); }}
              onClear={() => setPickedStu(null)} />
        }
        <TextField fullWidth multiline rows={3} label="Message *" placeholder="Describe the emergency clearly..." value={msg} onChange={e => setMsg(e.target.value)} sx={{ mb: 2 }} />
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Action Required" value={actionRequired} onChange={e => setAction(e.target.value)} placeholder="e.g. Stay home, await further notice" /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Contact Person & Number" value={contactPerson} onChange={e => setContact(e.target.value)} placeholder="e.g. Mr. Rajan – 98765 43210" /></Grid>
        </Grid>
        <Divider sx={{ my: 2 }} /><SLabel>Notify via</SLabel>
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="💬 WhatsApp" checked={n.whatsapp} onChange={v => setN(p => ({ ...p, whatsapp: v }))} />
        <TRow label="✉️ SMS" checked={n.sms} onChange={v => setN(p => ({ ...p, sms: v }))} />
        <TRow label="✅ Acknowledgement Required" sub="Parent must confirm they read this alert" checked={n.ack} onChange={v => setN(p => ({ ...p, ack: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#C62828", "&:hover": { bgcolor: "#B71C1C" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🚨 Send Emergency Alert Now"}
        </Button>
      </Paper>
    </Box>
  );
}

function AcademicForm({ academicYearId, onSubmitSuccess }) {
  const [title, setTitle]           = useState("");
  const [eventType, setEventType]   = useState("Unit Test");
  const [date, setDate]             = useState("");
  const [startTime, setStartTime]   = useState("");
  const [endTime, setEndTime]       = useState("");
  const [resultDate, setResultDate] = useState("");
  const [passCriteria, setPass]     = useState("");
  const [prepNotes, setPrep]        = useState("");
  const [selC, setSelC]             = useState([]);
  const [selS, setSelS]             = useState(["Maths", "Science"]);
  const [n, setN]                   = useState({ portal: true, push: true, sms: false, email: true });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      academicYearId, category: "academic", title, eventType, date, startTime, endTime,
      resultPublishDate: resultDate, passingCriteria: passCriteria,
      subjectsCovered: selS, preparationNotes: prepNotes, syllabusFileUrl: null,
      targetClasses: selC,
      notifications: { studentPortal: n.portal, push: n.push, sms: n.sms, email: n.email },
    };
    setSubmitting(true);
    const res = await ApiService.submitEvent("academic", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="📚" title="Academic Event" subtitle="Exams, result day, PTA meetings, circulars" color="linear-gradient(135deg,#1565C0,#1976D2)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Event Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Quarterly Exam – Term 1" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Event Type *</InputLabel>
              <Select label="Event Type *" value={eventType} onChange={e => setEventType(e.target.value)}>
                {["Unit Test", "Quarterly Exam", "Half-Yearly Exam", "Annual Exam", "Result Day", "PTA Meeting"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Start Time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="End Time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Result Publish Date" type="date" value={resultDate} onChange={e => setResultDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Passing Criteria" value={passCriteria} onChange={e => setPass(e.target.value)} placeholder="e.g. Minimum 35 marks" /></Grid>
        </Grid>
        <SLabel>Subjects Covered</SLabel>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: .8, mb: 2 }}>
          {SUBJECTS.map(s => { const on = selS.includes(s); return <Chip key={s} label={s} size="small" clickable onClick={() => setSelS(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])} sx={{ bgcolor: on ? "#1565C0" : "transparent", color: on ? "#fff" : "text.secondary", border: `1px solid ${on ? "#1565C0" : "#E2E8F0"}`, fontWeight: on ? 600 : 400, transition: "all .15s" }} />; })}
        </Box>
        <TextField fullWidth multiline rows={2} label="Preparation Notes" value={prepNotes} onChange={e => setPrep(e.target.value)} placeholder="Topics, tips, reference material..." sx={{ mb: 2 }} />
        <UploadBox label="Click to upload Syllabus PDF (up to 10MB)" />
        <Divider sx={{ my: 2 }} /><SLabel>Applicable to</SLabel>
        <ClassChips selected={selC} onToggle={c => setSelC(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} />
        <Divider sx={{ my: 2 }} /><SLabel>Notifications</SLabel>
        <TRow label="Student Portal" sub="Visible in student dashboard" checked={n.portal} onChange={v => setN(p => ({ ...p, portal: v }))} />
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="✉️ SMS" checked={n.sms} onChange={v => setN(p => ({ ...p, sms: v }))} />
        <TRow label="📧 Email" checked={n.email} onChange={v => setN(p => ({ ...p, email: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#1565C0", "&:hover": { bgcolor: "#0D47A1" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "📚 Publish Academic Event"}
        </Button>
      </Paper>
    </Box>
  );
}

function SportsForm({ academicYearId, onSubmitSuccess }) {
  const [title, setTitle]       = useState("");
  const [sportType, setSport]   = useState("Athletics");
  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [venue, setVenue]       = useState("");
  const [desc, setDesc]         = useState("");
  const [selC, setSelC]         = useState([]);
  const [n, setN]               = useState({ push: true, wa: true, sms: false });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "sports", title, sportType, date, time, venue, description: desc, targetClasses: selC, notifications: { push: n.push, whatsapp: n.wa, sms: n.sms } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("sports", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🏆" title="Sports Event" subtitle="Sports day, tournaments & athletics" color="linear-gradient(135deg,#2E7D32,#388E3C)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Event Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Annual Sports Day" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Sport Type</InputLabel>
              <Select label="Sport Type" value={sportType} onChange={e => setSport(e.target.value)}>
                {["Athletics", "Cricket", "Football", "Basketball", "Volleyball", "Badminton", "Chess", "Kabaddi", "Inter-school"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Time" type="time" value={time} onChange={e => setTime(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Venue" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. School ground" /></Grid>
        </Grid>
        <TextField fullWidth multiline rows={3} label="Description" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Event details, rules, participation criteria..." sx={{ mb: 2 }} />
        <Divider sx={{ my: 2 }} /><SLabel>Applicable Classes</SLabel>
        <ClassChips selected={selC} onToggle={c => setSelC(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} color="#2E7D32" />
        <Divider sx={{ my: 2 }} /><SLabel>Notifications</SLabel>
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="💬 WhatsApp" checked={n.wa} onChange={v => setN(p => ({ ...p, wa: v }))} />
        <TRow label="✉️ SMS" checked={n.sms} onChange={v => setN(p => ({ ...p, sms: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1B5E20" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🏆 Publish Sports Event"}
        </Button>
      </Paper>
    </Box>
  );
}

function CulturalForm({ academicYearId, onSubmitSuccess }) {
  const [title, setTitle]       = useState("");
  const [progType, setProg]     = useState("Annual Day");
  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [guest, setGuest]       = useState("");
  const [desc, setDesc]         = useState("");
  const [selC, setSelC]         = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "cultural", title, programmeType: progType, date, time, chiefGuest: guest, description: desc, targetClasses: selC, notifications: { push: true, whatsapp: true, sms: false, email: false } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("cultural", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🎭" title="Cultural Event" subtitle="Annual day, performances & cultural programmes" color="linear-gradient(135deg,#6A1B9A,#7B1FA2)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Event Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Annual Day 2026" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Programme Type</InputLabel>
              <Select label="Programme Type" value={progType} onChange={e => setProg(e.target.value)}>
                {["Annual Day", "Talent Show", "Dance Programme", "Drama", "Music Concert", "Debate", "Art Exhibition"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Time" type="time" value={time} onChange={e => setTime(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Chief Guest" value={guest} onChange={e => setGuest(e.target.value)} placeholder="Name & designation" /></Grid>
        </Grid>
        <TextField fullWidth multiline rows={3} label="Description" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Event programme, schedule details..." sx={{ mb: 2 }} />
        <Divider sx={{ my: 2 }} /><SLabel>Applicable Classes</SLabel>
        <ClassChips selected={selC} onToggle={c => setSelC(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])} color="#6A1B9A" />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#6A1B9A", "&:hover": { bgcolor: "#4A148C" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🎭 Publish Cultural Event"}
        </Button>
      </Paper>
    </Box>
  );
}

function HolidayForm({ academicYearId, onSubmitSuccess }) {
  const [name, setName]           = useState("");
  const [holType, setHolType]     = useState("National");
  const [fromDate, setFrom]       = useState("");
  const [toDate, setTo]           = useState("");
  const [reopens, setReopens]     = useState("");
  const [reason, setReason]       = useState("");
  const [n, setN]                 = useState({ comp: false, push: true, wa: true });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "holiday", name, holidayType: holType, fromDate, toDate, reopensOn: reopens, reason, compensatoryWorkingDay: n.comp, notifications: { push: n.push, whatsapp: n.wa } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("holiday", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🏖️" title="Holiday" subtitle="National, regional & school holidays" color="linear-gradient(135deg,#E65100,#F57C00)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Holiday Name *" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Diwali Holiday" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Holiday Type</InputLabel>
              <Select label="Holiday Type" value={holType} onChange={e => setHolType(e.target.value)}>
                {["National", "Regional", "School", "Religious", "Exam Leave", "Optional"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="From Date *" type="date" value={fromDate} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="To Date *" type="date" value={toDate} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="School Re-opens" type="date" value={reopens} onChange={e => setReopens(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
        <TextField fullWidth multiline rows={2} label="Reason / Note" value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason for holiday..." sx={{ mb: 2 }} />
        <Divider sx={{ my: 2 }} />
        <TRow label="Compensatory Working Day" sub="A makeup day is scheduled" checked={n.comp} onChange={v => setN(p => ({ ...p, comp: v }))} />
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="💬 WhatsApp" checked={n.wa} onChange={v => setN(p => ({ ...p, wa: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#E65100", "&:hover": { bgcolor: "#BF360C" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🏖️ Notify All & Publish"}
        </Button>
      </Paper>
    </Box>
  );
}

function CircularForm({ academicYearId, onSubmitSuccess }) {
  const [circNo, setCircNo]       = useState("");
  const [date, setDate]           = useState("");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [addrTo, setAddrTo]       = useState("Parents & Students");
  const [validUntil, setValid]    = useState("");
  const [n, setN]                 = useState({ ack: false, push: true, email: true });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "circular", circularNumber: circNo, date, subject, message, circularFileUrl: null, addressedTo: addrTo, validUntil, notifications: { acknowledgementRequired: n.ack, push: n.push, email: n.email } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("circular", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="📋" title="Circular" subtitle="Fee reminders, uniform notices, general announcements" color="linear-gradient(135deg,#37474F,#546E7A)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Circular Number" value={circNo} onChange={e => setCircNo(e.target.value)} placeholder="e.g. CIRC-2026-045" /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
        <TextField fullWidth label="Subject *" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Fee payment reminder – Term 2" sx={{ mb: 2 }} />
        <TextField fullWidth multiline rows={3} label="Message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Circular content or instructions..." sx={{ mb: 2 }} />
        <UploadBox label="Click to upload official circular — PDF up to 10MB" />
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Addressed To</InputLabel>
              <Select label="Addressed To" value={addrTo} onChange={e => setAddrTo(e.target.value)}>
                {["Parents & Students", "Parents only", "Staff only", "All"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}><TextField fullWidth label="Valid Until" type="date" value={validUntil} onChange={e => setValid(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <TRow label="Acknowledgement Required" sub="Parent confirms receipt" checked={n.ack} onChange={v => setN(p => ({ ...p, ack: v }))} />
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="📧 Email" checked={n.email} onChange={v => setN(p => ({ ...p, email: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#37474F", "&:hover": { bgcolor: "#263238" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "📋 Publish Circular"}
        </Button>
      </Paper>
    </Box>
  );
}

function PTAForm({ academicYearId, onSubmitSuccess }) {
  const groups = ["All Parents", "Std 1–5", "Std 6–8", "Std 9–12"];
  const [title, setTitle]         = useState("");
  const [meetType, setMeetType]   = useState("PTA Meeting");
  const [date, setDate]           = useState("");
  const [startTime, setStart]     = useState("");
  const [venue, setVenue]         = useState("");
  const [agenda, setAgenda]       = useState("");
  const [selG, setSelG]           = useState(["All Parents"]);
  const [n, setN]                 = useState({ rsvp: true, push: true, wa: true, email: true });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "pta", title, meetingType: meetType, date, startTime, venue, agenda, applicableTo: selG, notifications: { rsvp: n.rsvp, push: n.push, whatsapp: n.wa, email: n.email } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("pta", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🤝" title="PTA Meeting" subtitle="Parent-teacher meetings, board meetings, committees" color="linear-gradient(135deg,#F57F17,#F9A825)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Meeting Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Term 1 PTA Meeting" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Meeting Type</InputLabel>
              <Select label="Meeting Type" value={meetType} onChange={e => setMeetType(e.target.value)}>
                {["PTA Meeting", "Board Meeting", "Committee Review", "Orientation"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Start Time" type="time" value={startTime} onChange={e => setStart(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Venue" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. School hall" /></Grid>
        </Grid>
        <TextField fullWidth multiline rows={3} label="Agenda / Description" value={agenda} onChange={e => setAgenda(e.target.value)} placeholder="Meeting agenda, topics to be discussed..." sx={{ mb: 2 }} />
        <SLabel>Applicable to</SLabel>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: .8, mb: 2 }}>
          {groups.map(g => { const on = selG.includes(g); return <Chip key={g} label={g} size="small" clickable onClick={() => setSelG(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g])} sx={{ bgcolor: on ? "#F57F17" : "transparent", color: on ? "#fff" : "text.secondary", border: `1px solid ${on ? "#F57F17" : "#E2E8F0"}`, fontWeight: on ? 600 : 400, transition: "all .15s" }} />; })}
        </Box>
        <Divider sx={{ my: 2 }} />
        <TRow label="RSVP / Attendance Confirmation" sub="Parents confirm attendance" checked={n.rsvp} onChange={v => setN(p => ({ ...p, rsvp: v }))} />
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <TRow label="💬 WhatsApp" checked={n.wa} onChange={v => setN(p => ({ ...p, wa: v }))} />
        <TRow label="📧 Email" checked={n.email} onChange={v => setN(p => ({ ...p, email: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#F57F17", "&:hover": { bgcolor: "#E65100" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🤝 Publish & Notify Parents"}
        </Button>
      </Paper>
    </Box>
  );
}

function WorkshopForm({ academicYearId, onSubmitSuccess }) {
  const [title, setTitle]         = useState("");
  const [type, setType]           = useState("Student Workshop");
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("");
  const [venue, setVenue]         = useState("");
  const [facilitator, setFacil]   = useState("");
  const [limit, setLimit]         = useState("");
  const [desc, setDesc]           = useState("");
  const [n, setN]                 = useState({ reg: true, cert: false, push: true });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = { academicYearId, category: "workshop", title, type, date, time, venue, facilitator, participantLimit: Number(limit), description: desc, registrationRequired: n.reg, certificateProvided: n.cert, notifications: { push: n.push } };
    setSubmitting(true);
    const res = await ApiService.submitEvent("workshop", payload);
    setSubmitting(false);
    if (res.success) onSubmitSuccess(res.message);
  };

  return (
    <Box maxWidth={820}>
      <FormHeader icon="🔬" title="Workshop / Training" subtitle="Seminars, skill development, training sessions" color="linear-gradient(135deg,#00695C,#00897B)" />
      <Paper elevation={0} sx={{ borderRadius: "0 0 10px 10px", border: "1px solid #E2E8F0", borderTop: "none", p: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Workshop Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Science Innovation Workshop" /></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth><InputLabel>Type</InputLabel>
              <Select label="Type" value={type} onChange={e => setType(e.target.value)}>
                {["Student Workshop", "Teacher Training", "Parent Session", "Seminar"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}><TextField fullWidth label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Time" type="time" value={time} onChange={e => setTime(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Venue" value={venue} onChange={e => setVenue(e.target.value)} placeholder="Lab / Hall / Online" /></Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6}><TextField fullWidth label="Facilitator / Speaker" value={facilitator} onChange={e => setFacil(e.target.value)} placeholder="Name & organisation" /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Participant Limit" type="number" value={limit} onChange={e => setLimit(e.target.value)} placeholder="e.g. 50" /></Grid>
        </Grid>
        <TextField fullWidth multiline rows={3} label="Description" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Workshop objectives, topics covered, materials needed..." sx={{ mb: 2 }} />
        <Divider sx={{ my: 2 }} />
        <TRow label="Registration Required" checked={n.reg} onChange={v => setN(p => ({ ...p, reg: v }))} />
        <TRow label="Certificate Provided" checked={n.cert} onChange={v => setN(p => ({ ...p, cert: v }))} />
        <TRow label="📱 Push Notification" checked={n.push} onChange={v => setN(p => ({ ...p, push: v }))} />
        <Button fullWidth variant="contained" size="large" disableElevation disabled={submitting} onClick={handleSubmit}
          sx={{ mt: 2.5, py: 1.5, fontSize: 14, fontWeight: 700, bgcolor: "#00695C", "&:hover": { bgcolor: "#004D40" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "🔬 Publish Workshop"}
        </Button>
      </Paper>
    </Box>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────
// Props:
//   yearId    {number} — ID of the selected academic year (from your Academic Year page)
//   yearLabel {string} — Display label e.g. "2026-27"
//   onBack    {func}   — Optional: called when user clicks the "Categories" breadcrumb on the form page,
//                        if your router handles back navigation instead. If not passed, internal state handles it.

export default function EventsType({ yearId = 1, yearLabel = "2026-27", onBack }) {
  const [page, setPage]         = useState("cat");   // "cat" | "form"  (no "year" page here)
  const [currentCat, setCurrentCat] = useState(null);
  const [snack, setSnack]       = useState({ open: false, message: "" });

  const goCat  = () => setPage("cat");
  const goForm = (cat) => { setCurrentCat(cat); setPage("form"); };

  // Breadcrumbs:
  //   cat page  → "Categories — 2026-27"
  //   form page → "Categories — 2026-27"  ›  "Emergency Alert"
  const crumbs = page === "cat"
    ? [{ label: `Categories — ${yearLabel}` }]
    : [{ label: `Categories — ${yearLabel}`, onClick: goCat }, { label: CAT_LABELS[currentCat] || currentCat }];

  const addLabel = page === "cat" ? "Add Category" : "Save Draft";

  const FORM_MAP = {
    emergency: <EmergencyForm academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    academic:  <AcademicForm  academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    sports:    <SportsForm    academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    cultural:  <CulturalForm  academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    holiday:   <HolidayForm   academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    circular:  <CircularForm  academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    pta:       <PTAForm       academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
    workshop:  <WorkshopForm  academicYearId={yearId} onSubmitSuccess={msg => setSnack({ open: true, message: msg })} />,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          <TopBar crumbs={crumbs} addLabel={addLabel} onAdd={() => setSnack({ open: true, message: "Action triggered!" })} />
          <Box sx={{ flex: 1, overflowY: "auto", p: 3, bgcolor: "background.default" }}>
            {page === "cat"  && <CatPage yearId={yearId} yearLabel={yearLabel} onSelectCat={goForm} />}
            {page === "form" && FORM_MAP[currentCat]}
          </Box>
        </Box>
      </Box>
      <Snackbar open={snack.open} autoHideDuration={2500} onClose={() => setSnack({ open: false, message: "" })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" onClose={() => setSnack({ open: false, message: "" })} sx={{ width: "100%" }}>{snack.message}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}