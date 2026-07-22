import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const filters = [
  { id: "all", label: "All" },
  { id: "invoice", label: "Invoices" },
  { id: "attendance", label: "Attendance" },
  { id: "academic", label: "Academic" },
  { id: "other", label: "Others" },
];

// Shared input styling, lifted from the Department screen so both
// modules share the same look and feel.
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "6px",
    "& fieldset": {
      borderColor: "#d1d5db",
    },
    "&:hover fieldset": {
      borderColor: "#bfc4cc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d1d5db",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#6b7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6b7280",
  },
};

const statusColors = {
  good: { bg: "#ECFDF5", color: "#0D9488" },
  warn: { bg: "#FFF7ED", color: "#F97316" },
};

export default function StudentReports() {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const state = location.state || {};
  const reportsData = [
    {
      year: "2025-26",
      stats: [
        { label: "Fees Paid", value: "₹1,86,000", sub: "of ₹1,86,000" },
        { label: "Attendance", value: "96%", sub: "182 / 189 Days" },
        { label: "Reports", value: "11", sub: "Generated" },
      ],
      reports: [
        {
          type: "invoice",
          title: "Term 1 Fee Invoice",
          date: "12 Jun 2026",
          size: "186 KB",
          status: { text: "Paid", cls: "good" },
        },
        {
          type: "invoice",
          title: "Term 2 Fee Invoice",
          date: "11 Oct 2025",
          size: "181 KB",
          status: { text: "Paid", cls: "good" },
        },
        {
          type: "attendance",
          title: "Attendance Summary - Quarter 1",
          date: "05 Jul 2026",
          size: "65 KB",
          status: { text: "96% Present", cls: "good" },
        },
        {
          type: "attendance",
          title: "Attendance Summary - Quarter 2",
          date: "08 Oct 2025",
          size: "61 KB",
          status: { text: "95% Present", cls: "good" },
        },
        {
          type: "academic",
          title: "Mid-Term Progress Report",
          date: "20 Jun 2026",
          size: "340 KB",
          status: { text: "Grade A", cls: "good" },
        },
        {
          type: "academic",
          title: "Final Examination Report",
          date: "28 Mar 2026",
          size: "410 KB",
          status: { text: "Grade A+", cls: "good" },
        },
        {
          type: "other",
          title: "Library Clearance Certificate",
          date: "15 Jun 2026",
          size: "48 KB",
          status: { text: "Completed", cls: "good" },
        },
      ],
    },
    {
      year: "2024-25",
      stats: [
        { label: "Fees Paid", value: "₹1,72,500", sub: "Completed" },
        { label: "Attendance", value: "91%", sub: "173 Days" },
        { label: "Reports", value: "14", sub: "Generated" },
      ],
      reports: [
        {
          type: "invoice",
          title: "Annual Fee Invoice",
          date: "12 Apr 2025",
          size: "180 KB",
          status: { text: "Paid", cls: "good" },
        },
        {
          type: "attendance",
          title: "Annual Attendance Report",
          date: "30 Apr 2025",
          size: "80 KB",
          status: { text: "91%", cls: "warn" },
        },
        {
          type: "academic",
          title: "Annual Report Card",
          date: "01 May 2025",
          size: "430 KB",
          status: { text: "Grade A", cls: "good" },
        },
        {
          type: "other",
          title: "Sports Certificate",
          date: "10 Dec 2024",
          size: "120 KB",
          status: { text: "Issued", cls: "good" },
        },
      ],
    },
    {
      year: "2023-24",
      stats: [
        { label: "Fees Paid", value: "₹1,58,000", sub: "Completed" },
        { label: "Attendance", value: "88%", sub: "168 Days" },
        { label: "Reports", value: "9", sub: "Generated" },
      ],
      reports: [
        {
          type: "invoice",
          title: "Annual Fee Invoice",
          date: "11 Apr 2024",
          size: "176 KB",
          status: { text: "Paid", cls: "good" },
        },
        {
          type: "attendance",
          title: "Attendance Report",
          date: "30 Apr 2024",
          size: "76 KB",
          status: { text: "88%", cls: "warn" },
        },
        {
          type: "academic",
          title: "Final Report Card",
          date: "02 May 2024",
          size: "400 KB",
          status: { text: "Grade B+", cls: "warn" },
        },
        {
          type: "other",
          title: "Medical Certificate",
          date: "04 Jun 2023",
          size: "50 KB",
          status: { text: "Available", cls: "good" },
        },
      ],
    },
  ];

  const currentYear = reportsData[selectedYear];

  const filteredReports = useMemo(() => {
    return currentYear.reports.filter((item) => {
      const matchType = selectedFilter === "all" || item.type === selectedFilter;
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [currentYear, selectedFilter, search]);

  const groupedReports = useMemo(() => {
    return filteredReports.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [filteredReports]);

  return (
    <Box sx={{ height: "100vh", overflow: "auto" }}>
      <Box sx={{ backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
        {/* MAIN HEADER */}
        <Box sx={{ p: 1.5, borderRadius: 3 }}>
          <Paper sx={{ borderRadius: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
              p={2}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    px: 1,
                    py: 0.2,
                  }}
                >
                  {`Academic Report(${state.Employee})`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  View and download all generated reports.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  border: "1px solid #d1d5db",
                  borderRadius: 3,
                }}
              >
                <Avatar sx={{ bgcolor: "#0D9488" }}>AK</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>
                    Aditya Krishnan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Grade 8 • Section A
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ px: 1.5, pb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Year Tabs */}
          <Paper
            sx={{
              borderRadius: 3,
              border: "1px solid #b9bcc0",
              p: 1,
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            //   justifyContent:"space-between",alignItems:"center",
            }}
          >
            {reportsData.map((year, index) => (
              <Button
                key={year.year}
                onClick={() => {
                  setSelectedYear(index);
                  setSelectedFilter("all");
                  setSearch("");
                }}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  color: selectedYear === index ? "#fff" : "#374151",
                  bgcolor: selectedYear === index ? "#0D9488" : "transparent",
                  "&:hover": {
                    bgcolor: selectedYear === index ? "#0F766E" : "#F3F4F6",
                  },
                }}
              >
                {year.year}
              </Button>
            ))}
          </Paper>

          {/* Stats */}
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{
              xs: "repeat(1, minmax(0,1fr))",
              sm: "repeat(3, minmax(0,1fr))",
            }}
          >
            {currentYear.stats.map((item) => (
              <Paper
                key={item.label}
                elevation={3}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #b9bcc0",
                  p: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.sub}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Toolbar */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              border: "1px solid #b9bcc0",
              p: 2,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" gap={1} flexWrap="wrap">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: 5,
                    px: 2,
                    color: selectedFilter === filter.id ? "#fff" : "#374151",
                    bgcolor: selectedFilter === filter.id ? "#0D9488" : "#F3F4F6",
                    "&:hover": {
                      bgcolor: selectedFilter === filter.id ? "#0F766E" : "#E5E7EB",
                    },
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </Stack>

            <TextField
              size="small"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ...fieldSx, minWidth: 220 }}
            />
          </Paper>

          {/* Groups */}
          {Object.keys(groupedReports).length === 0 && (
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                border: "1px solid #b9bcc0",
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography color="text.secondary">No reports found.</Typography>
            </Paper>
          )}

          {Object.entries(groupedReports).map(([group, reports]) => (
            <Paper
              key={group}
              elevation={3}
              sx={{
                borderRadius: 3,
                border: "1px solid #b9bcc0",
                p: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#111827",
                  mb: 1.5,
                  px: 0.5,
                }}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)} Reports
              </Typography>

              <Box display="flex" flexDirection="column" gap={1.5}>
                {reports.map((report) => (
                  <Paper
                    key={report.title}
                    elevation={0}
                    sx={{
                      border: "1px solid #d1d5db",
                      borderRadius: 2,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 1.5,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: 18 }}>📄</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>
                          {report.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {report.date} • {report.size}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 5,
                          fontSize: 12,
                          fontWeight: 600,
                          bgcolor: statusColors[report.status.cls]?.bg,
                          color: statusColors[report.status.cls]?.color,
                        }}
                      >
                        {report.status.text}
                      </Box>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => alert(`Downloading ${report.title}.pdf`)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 2,
                          bgcolor: "#0D9488",
                          "&:hover": { bgcolor: "#0F766E" },
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          ))}

          {/* Footer */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              border: "1px solid #b9bcc0",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography color="text.secondary">
              {filteredReports.length} of {currentYear.reports.length} Reports
            </Typography>

            <Button
              variant="contained"
              onClick={() => alert("Downloading all reports...")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                bgcolor: "#F97316",
                "&:hover": { bgcolor: "#EA580C" },
              }}
            >
              Download All
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
// import React, { useMemo, useState } from "react";
// import "../../../Styles/StudentReports.css"

// const filters = [
//     { id: "all", label: "All" },
//     { id: "invoice", label: "Invoices" },
//     { id: "attendance", label: "Attendance" },
//     { id: "academic", label: "Academic" },
//     { id: "other", label: "Others" },
// ];

// export default function StudentReports() {
//     const [selectedYear, setSelectedYear] = useState(0);
//     const [selectedFilter, setSelectedFilter] = useState("all");
//     const [search, setSearch] = useState("");
//     const reportsData = [
//         {
//             year: "2025-26",

//             stats: [
//                 {
//                     label: "Fees Paid",
//                     value: "₹1,86,000",
//                     sub: "of ₹1,86,000",
//                 },
//                 {
//                     label: "Attendance",
//                     value: "96%",
//                     sub: "182 / 189 Days",
//                 },
//                 {
//                     label: "Reports",
//                     value: "11",
//                     sub: "Generated",
//                 },
//             ],

//             reports: [
//                 {
//                     type: "invoice",
//                     title: "Term 1 Fee Invoice",
//                     date: "12 Jun 2026",
//                     size: "186 KB",
//                     status: {
//                         text: "Paid",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "invoice",
//                     title: "Term 2 Fee Invoice",
//                     date: "11 Oct 2025",
//                     size: "181 KB",
//                     status: {
//                         text: "Paid",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "attendance",
//                     title: "Attendance Summary - Quarter 1",
//                     date: "05 Jul 2026",
//                     size: "65 KB",
//                     status: {
//                         text: "96% Present",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "attendance",
//                     title: "Attendance Summary - Quarter 2",
//                     date: "08 Oct 2025",
//                     size: "61 KB",
//                     status: {
//                         text: "95% Present",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "academic",
//                     title: "Mid-Term Progress Report",
//                     date: "20 Jun 2026",
//                     size: "340 KB",
//                     status: {
//                         text: "Grade A",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "academic",
//                     title: "Final Examination Report",
//                     date: "28 Mar 2026",
//                     size: "410 KB",
//                     status: {
//                         text: "Grade A+",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "other",
//                     title: "Library Clearance Certificate",
//                     date: "15 Jun 2026",
//                     size: "48 KB",
//                     status: {
//                         text: "Completed",
//                         cls: "good",
//                     },
//                 },
//             ],
//         },

//         {
//             year: "2024-25",

//             stats: [
//                 {
//                     label: "Fees Paid",
//                     value: "₹1,72,500",
//                     sub: "Completed",
//                 },
//                 {
//                     label: "Attendance",
//                     value: "91%",
//                     sub: "173 Days",
//                 },
//                 {
//                     label: "Reports",
//                     value: "14",
//                     sub: "Generated",
//                 },
//             ],

//             reports: [
//                 {
//                     type: "invoice",
//                     title: "Annual Fee Invoice",
//                     date: "12 Apr 2025",
//                     size: "180 KB",
//                     status: {
//                         text: "Paid",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "attendance",
//                     title: "Annual Attendance Report",
//                     date: "30 Apr 2025",
//                     size: "80 KB",
//                     status: {
//                         text: "91%",
//                         cls: "warn",
//                     },
//                 },

//                 {
//                     type: "academic",
//                     title: "Annual Report Card",
//                     date: "01 May 2025",
//                     size: "430 KB",
//                     status: {
//                         text: "Grade A",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "other",
//                     title: "Sports Certificate",
//                     date: "10 Dec 2024",
//                     size: "120 KB",
//                     status: {
//                         text: "Issued",
//                         cls: "good",
//                     },
//                 },
//             ],
//         },

//         {
//             year: "2023-24",

//             stats: [
//                 {
//                     label: "Fees Paid",
//                     value: "₹1,58,000",
//                     sub: "Completed",
//                 },
//                 {
//                     label: "Attendance",
//                     value: "88%",
//                     sub: "168 Days",
//                 },
//                 {
//                     label: "Reports",
//                     value: "9",
//                     sub: "Generated",
//                 },
//             ],

//             reports: [
//                 {
//                     type: "invoice",
//                     title: "Annual Fee Invoice",
//                     date: "11 Apr 2024",
//                     size: "176 KB",
//                     status: {
//                         text: "Paid",
//                         cls: "good",
//                     },
//                 },

//                 {
//                     type: "attendance",
//                     title: "Attendance Report",
//                     date: "30 Apr 2024",
//                     size: "76 KB",
//                     status: {
//                         text: "88%",
//                         cls: "warn",
//                     },
//                 },

//                 {
//                     type: "academic",
//                     title: "Final Report Card",
//                     date: "02 May 2024",
//                     size: "400 KB",
//                     status: {
//                         text: "Grade B+",
//                         cls: "warn",
//                     },
//                 },

//                 {
//                     type: "other",
//                     title: "Medical Certificate",
//                     date: "04 Jun 2023",
//                     size: "50 KB",
//                     status: {
//                         text: "Available",
//                         cls: "good",
//                     },
//                 },
//             ],
//         },
//     ];
//     const currentYear = reportsData[selectedYear];

//     const filteredReports = useMemo(() => {
//         return currentYear.reports.filter((item) => {
//             const matchType =
//                 selectedFilter === "all" || item.type === selectedFilter;

//             const matchSearch = item.title
//                 .toLowerCase()
//                 .includes(search.toLowerCase());

//             return matchType && matchSearch;
//         });
//     }, [currentYear, selectedFilter, search]);

//     const groupedReports = useMemo(() => {
//         return filteredReports.reduce((acc, item) => {
//             if (!acc[item.type]) acc[item.type] = [];
//             acc[item.type].push(item);
//             return acc;
//         }, {});
//     }, [filteredReports]);


//     return (
//         <div className="student-page">
//             {/* Header */}

//             <div className="header">
//                 <div>
//                     <h1>Student Reports</h1>
//                     <p>View and download all generated reports.</p>
//                 </div>

//                 <div className="student-card">
//                     <div className="avatar">AK</div>

//                     <div>
//                         <h3>Aditya Krishnan</h3>
//                         <span>Grade 8 • Section A</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Tabs */}

//             <div className="tabs">
//                 {reportsData.map((year, index) => (
//                     <button
//                         key={year.year}
//                         className={selectedYear === index ? "active" : ""}
//                         onClick={() => {
//                             setSelectedYear(index);
//                             setSelectedFilter("all");
//                             setSearch("");
//                         }}
//                     >
//                         {year.year}
//                     </button>
//                 ))}
//             </div>

//             {/* Stats */}

//             <div className="stats">
//                 {currentYear.stats.map((item) => (
//                     <div className="stat-card" key={item.label}>
//                         <span>{item.label}</span>

//                         <h2>{item.value}</h2>

//                         <small>{item.sub}</small>
//                     </div>
//                 ))}
//             </div>

//             {/* Filter */}

//             <div className="toolbar">
//                 <div className="chips">
//                     {filters.map((filter) => (
//                         <button
//                             key={filter.id}
//                             className={
//                                 selectedFilter === filter.id
//                                     ? "chip active-chip"
//                                     : "chip"
//                             }
//                             onClick={() => setSelectedFilter(filter.id)}
//                         >
//                             {filter.label}
//                         </button>
//                     ))}
//                 </div>

//                 <input
//                     type="text"
//                     placeholder="Search reports..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>

//             {/* Groups */}

//             {Object.keys(groupedReports).length === 0 && (
//                 <div className="empty">
//                     No reports found.
//                 </div>
//             )}

//             {Object.entries(groupedReports).map(([group, reports]) => (
//                 <div className="group" key={group}>
//                     <div className="group-title">
//                         {group.charAt(0).toUpperCase() + group.slice(1)} Reports
//                     </div>

//                     {reports.map((report) => (
//                         <div className="report-card" key={report.title}>
//                             <div className="left">
//                                 <div className="file-icon">📄</div>

//                                 <div>
//                                     <h4>{report.title}</h4>

//                                     <span>
//                                         {report.date} • {report.size}
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="right">
//                                 <span
//                                     className={`status ${report.status.cls}`}
//                                 >
//                                     {report.status.text}
//                                 </span>

//                                 <button
//                                     className="download-btn"
//                                     onClick={() =>
//                                         alert(
//                                             `Downloading ${report.title}.pdf`
//                                         )
//                                     }
//                                 >
//                                     Download
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ))}

//             {/* Footer */}

//             <div className="footer">
//                 <span>
//                     {filteredReports.length} of{" "}
//                     {currentYear.reports.length} Reports
//                 </span>

//                 <button className="download-all">
//                     Download All
//                 </button>
//             </div>
//         </div>
//     );
// }