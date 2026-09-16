
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Divider,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SchoolIcon from "@mui/icons-material/School";

// ---- design tokens -------------------------------------------------
const NAVY = "#2f6483";
// const NAVY = "#3aaab3";
const NAVY_DARK = "#122A56";
// const NAVY_DARK = "#99f0f0";
const GOLD = "#D9A441";
const LIGHT_BLUE_BG = "#EAF1FB";
const LINE_GREY = "#9FB3CC";
const BORDER_GREY = "#8A8A8A"; 

// ---- reusable pieces -------------------------------------------------

/** A single "n. Label : ____ value ____" row, matching the PDF's numbered list */
function DetailRow({ index, label, children }) {
  return (
    <Grid container spacing={1} alignItems="flex-end" sx={{ mb: 1.4 }}>
      <Grid item xs={0.6}>
        <Typography sx={{ fontSize: 13, color: NAVY_DARK }}>
          {index}.
        </Typography>
      </Grid>
      <Grid item xs={4.4}>
        <Typography sx={{ fontSize: 13, color: NAVY_DARK }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={0.3}>
        <Typography sx={{ fontSize: 13, color: NAVY_DARK }}>:</Typography>
      </Grid>
      <Grid item xs={6.7}>
        {children}
      </Grid>
    </Grid>
  );
}

/** Underlined fill-in-the-blank field (MUI "standard" TextField gives the underline) */
function BlankField({ placeholder, width = "100%" }) {
  return (
    <TextField
      variant="standard"
      placeholder={placeholder}
      fullWidth
      sx={{
        width,
        "& .MuiInput-underline:before": { borderBottomColor: LINE_GREY },
        "& .MuiInputBase-input": { fontSize: 13, color: NAVY_DARK, py: 0.2 },
      }}
    />
  );
}

/** Section header bar, e.g. "STUDENT DETAILS" */
function SectionBar({ children }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        bgcolor: NAVY,
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: 0.4,
        px: 2.2,
        py: 0.7,
        borderRadius: "4px 16px 4px 4px",
        mb: 2,
      }}
    >
      {children}
    </Box>
  );
}

/** Signature block: line + role label + "Signature:" */
function SignatureBlock({ role }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ borderBottom: `1.5px solid ${NAVY_DARK}`, width: "85%", mx: "auto", mb: 0.7 }} />
      <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: NAVY_DARK }}>
        {role}
      </Typography>
      <Typography sx={{ fontSize: 11, color: NAVY_DARK, mt: 0.4 }}>
        Signature: ______________
      </Typography>
    </Box>
  );
}

// ---- main component -------------------------------------------------

export default function TransferCertificate() {
  const fields = [
    { label: "Name of the Student", type: "text" },
    { label: "Father's / Guardian's Name", type: "text" },
    { label: "Mother's Name", type: "text" },
    { label: "Date of Birth", type: "date" },
    { label: "Date of Birth in Words", type: "text" },
    { label: "Nationality", type: "text" },
    { label: "Religion / Community", type: "text" },
    { label: "Admission Date", type: "date" },
    { label: "Class Last Studied", type: "text" },
    { label: "Academic Year", type: "text" },
    { label: "Medium of Instruction", type: "text" },
    { label: "Whether Qualified for Promotion to the Next Class", type: "yesno" },
    { label: "Whether the Student Has Paid All Fees and Dues", type: "yesno" },
    { label: "Attendance", type: "attendance" },
    { label: "Date of Leaving the School", type: "date" },
    { label: "Reason for Leaving", type: "text" },
    { label: "Conduct and Character", type: "text" },
    { label: "Date of Issue of Transfer Certificate", type: "date" },
  ];

  return (
    <Box sx={{ bgcolor: "#EEF1F5", p: { xs: 2, md: 4 }, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 900,
          p: { xs: 3, md: 5 },
        //   border: `2.5px solid ${NAVY}`,
        // border: `2.5px solid ${BORDER_GREY}`,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* decorative corner accents */}
        <Box sx={{
          position: "absolute", top: -40, left: -40, width: 110, height: 110,
          bgcolor: "#BFD6F5", transform: "rotate(45deg)", zIndex: 0,
        }} />
        <Box sx={{
          position: "absolute", top: -50, right: -50, width: 130, height: 130,
          bgcolor: GOLD, transform: "rotate(45deg)", zIndex: 0, opacity: 0.85,
        }} />
        <Box sx={{
          position: "absolute", bottom: -60, left: -30, width: 220, height: 90,
          bgcolor: NAVY, borderRadius: "0 100px 0 0", zIndex: 0,
        }} />
        <Box sx={{
          position: "absolute", bottom: -40, right: -30, width: 220, height: 70,
          bgcolor: GOLD, borderRadius: "100px 0 0 0", zIndex: 0, opacity: 0.9,
        }} />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* ---------- Header ---------- */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 72, height: 72, mx: "auto", borderRadius: "50%",
                  bgcolor: NAVY, display: "flex", alignItems: "center",
                  justifyContent: "center", border: `2px solid ${GOLD}`,
                }}
              >
                <SchoolIcon sx={{ color: "#fff", fontSize: 34 }} />
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Typography sx={{
                fontFamily: "'Times New Roman', serif", fontWeight: 700,
                fontSize: { xs: 26, md: 34 }, color: NAVY, lineHeight: 1.1,
              }}>
                ABC PUBLIC SCHOOL
              </Typography>
              <Typography sx={{
                fontSize: 12.5, letterSpacing: 3, color: NAVY, fontWeight: 600, mt: 0.4,
              }}>
                LEARN &nbsp;•&nbsp; GROW &nbsp;•&nbsp; SUCCEED
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#444", mt: 0.5 }}>
                123 Green Park Road, Chennai - 600 001
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#444" }}>
                Ph: 044 - 1234 5678 &nbsp;|&nbsp; Email: info@abcschool.edu.in &nbsp;|&nbsp; www.abcschool.edu.in
              </Typography>
            </Grid>
          </Grid>

          {/* ---------- TC No / Admission No / Date ---------- */}
          <Grid container sx={{ mb: 2 }}>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY_DARK }}>
                Transfer Certificate No. : <span style={{ fontWeight: 400 }}>______________</span>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY_DARK }}>
                Admission No. : <span style={{ fontWeight: 400 }}>______________</span>
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY_DARK }}>
                Date : <span style={{ fontWeight: 400 }}>___ / ___ / ______</span>
              </Typography>
            </Grid>
          </Grid>

          {/* ---------- Ribbon title ---------- */}
          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flex: 1, borderColor: GOLD, borderBottomWidth: 2 }} />
            <Box
              sx={{
                bgcolor: NAVY, color: "#fff", px: 5, py: 1.2, mx: 2,
                border: `2px solid ${GOLD}`, borderRadius: 1,
                clipPath: "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)",
              }}
            >
              <Typography sx={{
                fontFamily: "'Times New Roman', serif", fontWeight: 700,
                fontSize: { xs: 18, md: 24 }, letterSpacing: 2, textAlign: "center",
              }}>
                TRANSFER CERTIFICATE
              </Typography>
            </Box>
            <Divider sx={{ flex: 1, borderColor: GOLD, borderBottomWidth: 2 }} />
          </Box>

          {/* ---------- Student details ---------- */}
          <SectionBar>STUDENT DETAILS</SectionBar>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8.5}>
              {fields.map((f, i) => (
                <DetailRow key={f.label} index={i + 1} label={f.label}>
                  {f.type === "yesno" ? (
                    <Typography sx={{ fontSize: 13, color: NAVY_DARK }}>
                      Yes &nbsp;/&nbsp; No
                    </Typography>
                  ) : f.type === "attendance" ? (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Typography sx={{ fontSize: 12.5, color: NAVY_DARK, whiteSpace: "nowrap" }}>
                        Total Working Days:
                      </Typography>
                      <BlankField />
                      <Typography sx={{ fontSize: 12.5, color: NAVY_DARK, whiteSpace: "nowrap" }}>
                        Days Present:
                      </Typography>
                      <BlankField />
                    </Box>
                  ) : f.type === "date" ? (
                    <Typography sx={{ fontSize: 13, color: NAVY_DARK }}>
                      ___ / ___ / ______
                    </Typography>
                  ) : (
                    <BlankField />
                  )}
                </DetailRow>
              ))}
            </Grid>

            {/* Photo placeholder */}
            <Grid item xs={12} md={3.5}>
              <Box
                sx={{
                  border: `2px dashed ${LINE_GREY}`, borderRadius: 2,
                  height: 150, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", bgcolor: "#F7F9FC",
                }}
              >
                <CameraAltOutlinedIcon sx={{ color: LINE_GREY, fontSize: 34, mb: 1 }} />
                <Typography sx={{ fontSize: 12, color: "#7A8AA0", textAlign: "center" }}>
                  Student Photo<br />(Optional)
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ---------- Certification ---------- */}
          <Box sx={{ mt: 4 }}>
            <SectionBar>CERTIFICATION</SectionBar>
            <Paper
              variant="outlined"
              sx={{
                bgcolor: LIGHT_BLUE_BG, border: `1px solid ${LINE_GREY}`,
                borderRadius: 2, p: 2.5,
              }}
            >
              <Typography sx={{ fontSize: 13, color: NAVY_DARK, lineHeight: 1.7 }}>
                Certified that the above-mentioned student was a bonafide student of this school
                and has been relieved from the school on the date mentioned above.
                <br />
                We wish the student all the best for future studies and career.
              </Typography>
            </Paper>
          </Box>

          {/* ---------- Signatures ---------- */}
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={4}><SignatureBlock role="Class Teacher" /></Grid>
            <Grid item xs={4}><SignatureBlock role="School Office" /></Grid>
            <Grid item xs={4}><SignatureBlock role="Principal / Head of Institution" /></Grid>
          </Grid>

          {/* ---------- Seal ---------- */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {/* <Box
              sx={{
                width: 90, height: 90, borderRadius: "50%",
                border: `1.5px dashed ${NAVY}`, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: 10, fontWeight: 700, color: NAVY, textAlign: "center" }}>
                SCHOOL<br />SEAL
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}