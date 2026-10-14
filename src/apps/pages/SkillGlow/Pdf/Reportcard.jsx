import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Svg,
  Rect,
  Polygon,
  StyleSheet,
} from "@react-pdf/renderer";

/* ---------- Colours ---------- */
const C = {
  paper: "#F7F4EF",
  title: "#B93A6F",
  sub: "#8A2F56",
  head: "#6E2646",
  label: "#4F2340",
  peach: "#F2B57C",
  text: "#3B2C28",
  pen: "#222B5E",
  line: "#C97A2B",
  dot: "#E58A2F",
  pink: "#D9446F",
  orange: "#F2A03A",
};
const PEN = "Helvetica-Oblique";
const up = (v) => String(v ?? "").toUpperCase();
const isAbsolute = (u) => /^(https?:|data:|blob:)/i.test(u || "");

/* ---------- Styles ---------- */
const s = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    fontFamily: "Helvetica",
    paddingTop: 24,
    paddingHorizontal: 34,
    paddingBottom: 108, // keeps content clear of the pencils
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    letterSpacing: 2,
    color: C.title,
    flex: 1,
  },
  logo: { width: 44, height: 44, objectFit: "contain", marginLeft: 12 },
  location: {
    fontSize: 11,
    letterSpacing: 1.6,
    color: C.sub,
    marginTop: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 12,
  },
  reportTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 23,
    color: C.head,
  },
  termBadge: {
    backgroundColor: C.peach,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 3,
  },
  termBadgeText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 1,
    color: C.head,
  },

  /* fields */
  row: { flexDirection: "row", justifyContent: "space-between" },
  fLabel: { fontFamily: "Helvetica-Bold", fontSize: 9, color: C.label },
  fLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: C.line,
    minHeight: 24,
    justifyContent: "flex-end",
    paddingLeft: 8,
    paddingBottom: 2,
    marginTop: 3,
  },
  fDot: {
    position: "absolute",
    left: 0,
    bottom: -3.5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.dot,
  },
  fValue: { fontFamily: PEN, fontSize: 12.5, letterSpacing: 1, color: C.pen },

  /* table: Subject | Marks | Grade */
  tableRow: { flexDirection: "row", marginTop: 24 },
  subjectBox: {
    flex: 1,
    backgroundColor: C.peach,
    borderRadius: 12,
    paddingLeft: 11,
    paddingBottom: 6,
  },
  colBox: {
    width: 120,
    backgroundColor: C.peach,
    borderRadius: 12,
    marginLeft: 8,
    paddingBottom: 6,
    alignItems: "center",
  },
  headCell: { height: 30, justifyContent: "center" },
  headText: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: "#4A3A36" },
  subjectText: { fontSize: 10, color: C.text },
  markText: { fontFamily: PEN, fontSize: 13, color: C.pen },
  outOfText: { fontSize: 8, color: "#6B5A55" },
  gradeText: { fontFamily: "Helvetica-BoldOblique", fontSize: 15, color: C.pen },

  /* legend + remarks */
  bottomRow: { flexDirection: "row", marginTop: 18 },
  leftCol: { width: 232 },
  rightCol: { flex: 1, marginLeft: 18 },
  sectionLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1,
    color: C.label,
    marginBottom: 6,
  },
  legendBox: {
    backgroundColor: C.peach,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  legendRow: { flexDirection: "row", marginBottom: 3 },
  legendGrade: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.label,
    width: 28,
  },
  legendText: { fontSize: 7.5, color: C.text },
  remarksBox: {
    backgroundColor: C.peach,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 6,
    minHeight: 100,
    justifyContent: "space-between",
  },
  remarksLine: {
    height: 21,
    borderBottomWidth: 0.8,
    borderBottomColor: "#B8763A",
  },

  /* signatures (single term -> one box each) */
  sigWrap: { flexDirection: "row", justifyContent: "space-between", marginTop: 26 },
  sigBox: { width: 190 },
  sigImg: { height: 24, objectFit: "contain" },
  sigSpace: { height: 24 },
  sigLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
    borderBottomStyle: "dashed",
  },
  sigLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: C.label,
    textAlign: "center",
    marginTop: 4,
  },

  /* pencils */
  pencilRow: {
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

/* ---------- Pieces ---------- */
const Field = ({ label, value, width, right }) => (
  <View style={[{ width }, right ? { marginLeft: "auto" } : {}]}>
    <Text style={s.fLabel}>{label}</Text>
    <View style={s.fLine}>
      <View style={s.fDot} />
      <Text style={s.fValue}>{up(value)}</Text>
    </View>
  </View>
);

const Pencil = ({ w, h, color, stripe, lead }) => {
  const th = w * 0.85;
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Rect
        x={0.5}
        y={th - 2}
        width={w - 1}
        height={h - th + 2}
        fill={color}
        stroke={C.head}
        strokeWidth={0.8}
      />
      <Rect x={w * 0.34} y={th - 2} width={w * 0.32} height={h - th + 2} fill={stripe} />
      <Polygon points={`0.5,${th} ${w / 2},1 ${w - 0.5},${th}`} fill="#F7DDBE" />
      <Polygon
        points={`${w * 0.36},${th * 0.42} ${w / 2},1 ${w * 0.64},${th * 0.42}`}
        fill={lead}
      />
    </Svg>
  );
};

const PINK = { color: C.pink, stripe: "#F9C9D6", lead: C.head };
const ORANGE = { color: C.orange, stripe: "#FFD9A0", lead: "#8A4B12" };

const Sig = ({ src, label }) => (
  <View style={s.sigBox}>
    {src ? <Image src={src} style={s.sigImg} /> : <View style={s.sigSpace} />}
    <View style={s.sigLine} />
    <Text style={s.sigLabel}>{label}</Text>
  </View>
);

/* ---------- Document ----------
   Props:
     data      – the API response (either the whole { Status, Data } object or just Data)
     assetBase – base URL for relative files such as school.logoUrl
                 e.g. "https://yourserver.com/uploads/images/"
     signatures (optional) – { parent: <img url>, teacher: <img url> }
*/
export default function ReportCard({ data, assetBase = "", signatures = {} }) {
  const d = data?.Data ?? data ?? {};
  const school = d.school || {};
  const student = d.student || {};
  const term = d.term || {};
  const subjects = d.subjects || [];
  const gradingScale = d.gradingScale || [];

  const logoSrc = school.logoUrl
    ? isAbsolute(school.logoUrl)
      ? school.logoUrl
      : assetBase
      ? assetBase + school.logoUrl
      : null
    : null;

  const cellH = subjects.length > 9 ? 24 : subjects.length > 7 ? 28 : subjects.length > 5 ? 34 : 44;
  const cell = { height: cellH, justifyContent: "center" };
  const centerCell = { ...cell, alignItems: "center" };

  return (
    <Document
      title={`Report Card - ${student.name || ""} - ${term.termName || ""}`}
      author={school.name}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.headerRow}>
          <Text style={s.title}>{up(school.name)}</Text>
          {logoSrc ? <Image src={logoSrc} style={s.logo} /> : null}
        </View>
        {school.location ? <Text style={s.location}>{up(school.location)}</Text> : null}

        <View style={s.titleRow}>
          <Text style={s.reportTitle}>REPORT CARD</Text>
          {term.termName ? (
            <View style={s.termBadge}>
              <Text style={s.termBadgeText}>{up(term.termName)}</Text>
            </View>
          ) : null}
        </View>

        {/* Student details */}
        <View style={[s.row, { marginTop: 14 }]}>
          <Field label="Student's Name:" value={student.name} width={300} />
          <Field label="Class" value={d.className} width={190} right />
        </View>
        <View style={[s.row, { marginTop: 18 }]}>
          <Field label="Student ID:" value={student.empcode} width={140} />
          <Field label="Year" value={d.academicYear} width={110} />
          <Field label="Class Teacher" value={d.classTeacher} width={200} />
        </View>

        {/* Subjects – one term only */}
        <View style={s.tableRow}>
          <View style={s.subjectBox}>
            <View style={s.headCell}>
              <Text style={s.headText}>Subject List</Text>
            </View>
            {subjects.map((sub) => (
              <View key={sub.subjectID || sub.name} style={cell}>
                <Text style={s.subjectText}>{sub.name}</Text>
              </View>
            ))}
          </View>

          <View style={s.colBox}>
            <View style={s.headCell}>
              <Text style={s.headText}>Marks</Text>
            </View>
            {subjects.map((sub) => (
              <View key={sub.subjectID || sub.name} style={centerCell}>
                <Text style={s.markText}>{sub.marks}</Text>
                <Text style={s.outOfText}>out of {sub.outOfMarks}</Text>
              </View>
            ))}
          </View>

          <View style={s.colBox}>
            <View style={s.headCell}>
              <Text style={s.headText}>Grade</Text>
            </View>
            {subjects.map((sub) => (
              <View key={sub.subjectID || sub.name} style={centerCell}>
                <Text style={s.gradeText}>{sub.grade}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Scoring metrics + blank remarks */}
        <View style={s.bottomRow} wrap={false}>
          <View style={s.leftCol}>
            <Text style={s.sectionLabel}>SCORING METRICS</Text>
            <View style={s.legendBox}>
              {gradingScale.map((g) => (
                <View key={g.grade} style={s.legendRow}>
                  <Text style={s.legendGrade}>{g.grade}</Text>
                  <Text style={s.legendText}>- {g.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={s.rightCol}>
            <Text style={s.sectionLabel}>Remarks</Text>
            {/* left empty on purpose – filled in by hand after printing */}
            <View style={s.remarksBox}>
              <View style={s.remarksLine} />
              <View style={s.remarksLine} />
              <View style={s.remarksLine} />
              <View style={s.remarksLine} />
            </View>
          </View>
        </View>

        {/* Signatures – one per person for this term */}
        <View style={s.sigWrap} wrap={false}>
          <Sig src={signatures.parent} label="Parent's Signature" />
          <Sig src={signatures.teacher} label="Class Teacher's Signature" />
        </View>

        {/* Pencils on every page */}
        <View style={s.pencilRow} fixed>
          <Pencil w={52} h={98} {...PINK} />
          <Pencil w={34} h={84} {...ORANGE} />
          <Pencil w={52} h={100} {...PINK} />
          <Pencil w={34} h={74} {...ORANGE} />
          <Pencil w={52} h={98} {...PINK} />
          <Pencil w={34} h={82} {...ORANGE} />
          <Pencil w={52} h={96} {...PINK} />
        </View>
      </Page>
    </Document>
  );
}
// import React from "react";
// import {
//   Document,
//   Page,
//   View,
//   Text,
//   Image,
//   Svg,
//   Rect,
//   Polygon,
//   StyleSheet,
// } from "@react-pdf/renderer";

// /* ---------- Colours (picked from the photo) ---------- */
// const C = {
//   paper: "#F7F4EF",
//   title: "#B93A6F",
//   sub: "#8A2F56",
//   head: "#6E2646",
//   label: "#4F2340",
//   peach: "#F2B57C",
//   text: "#3B2C28",
//   pen: "#222B5E", // "handwritten" ink colour
//   line: "#C97A2B",
//   dot: "#E58A2F",
//   pink: "#D9446F",
//   orange: "#F2A03A",
// };
// const PEN = "Helvetica-Oblique"; // slanted font to mimic handwriting
// const up = (v) => String(v ?? "").toUpperCase();

// /* ---------- Styles ---------- */
// const s = StyleSheet.create({
//   page: {
//     backgroundColor: C.paper,
//     fontFamily: "Helvetica",
//     paddingTop: 30,
//     paddingHorizontal: 34,
//   },
//   title: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 19,
//     letterSpacing: 2.6,
//     color: C.title,
//   },
//   location: {
//     fontSize: 12,
//     letterSpacing: 1.8,
//     color: C.sub,
//     textAlign: "right",
//     marginTop: 8,
//     marginRight: 18,
//   },
//   reportTitle: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 25,
//     color: C.head,
//     marginTop: 18,
//   },

//   /* fields */
//   row: { flexDirection: "row", justifyContent: "space-between" },
//   fLabel: { fontFamily: "Helvetica-Bold", fontSize: 9, color: C.label },
//   fLine: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: C.line,
//     minHeight: 24,
//     justifyContent: "flex-end",
//     paddingLeft: 8,
//     paddingBottom: 2,
//     marginTop: 3,
//   },
//   fDot: {
//     position: "absolute",
//     left: 0,
//     bottom: -3.5,
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: C.dot,
//   },
//   fValue: { fontFamily: PEN, fontSize: 12.5, letterSpacing: 1, color: C.pen },

//   /* table */
//   tableRow: { flexDirection: "row", marginTop: 34 },
//   subjectBox: {
//     width: 184,
//     backgroundColor: C.peach,
//     borderRadius: 12,
//     paddingLeft: 11,
//     paddingBottom: 6,
//   },
//   termBox: {
//     width: 106,
//     backgroundColor: C.peach,
//     borderRadius: 12,
//     marginLeft: 8,
//     paddingBottom: 6,
//     alignItems: "center",
//   },
//   headCell: { height: 36, justifyContent: "center" },
//   headText: { fontSize: 9.5, color: "#4A3A36" },
//   cell: { height: 40, justifyContent: "center" },
//   subjectText: { fontSize: 9.5, color: C.text },
//   gradeText: { fontFamily: PEN, fontSize: 14, color: C.pen },

//   /* legend + remarks */
//   bottomRow: { flexDirection: "row", marginTop: 16 },
//   leftCol: { width: 232 },
//   rightCol: { flex: 1, marginLeft: 18 },
//   sectionLabel: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 8.5,
//     letterSpacing: 1,
//     color: C.label,
//     marginBottom: 6,
//   },
//   legendBox: {
//     backgroundColor: C.peach,
//     borderRadius: 12,
//     paddingVertical: 11,
//     paddingHorizontal: 12,
//   },
//   legendText: { fontSize: 7.5, color: C.text, marginBottom: 3 },
//   remarkItem: { flexDirection: "row", marginBottom: 4 },
//   star: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 12,
//     color: C.pen,
//     width: 11,
//   },
//   remarkText: {
//     flex: 1,
//     fontFamily: PEN,
//     fontSize: 10,
//     lineHeight: 1.35,
//     color: C.pen,
//   },

//   /* signatures */
//   sigWrap: { flexDirection: "row", marginTop: 26 },
//   sigGroup: { width: "50%", paddingHorizontal: 8 },
//   sigTitle: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 9,
//     color: C.label,
//     textAlign: "center",
//     marginBottom: 4,
//   },
//   sigPair: { flexDirection: "row" },
//   sigBox: { width: "50%", paddingHorizontal: 8 },
//   sigImg: { height: 30, objectFit: "contain" },
//   sigSpace: { height: 30 },
//   sigLine: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#444444",
//     borderBottomStyle: "dashed",
//   },
//   sigLabel: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 7.5,
//     color: C.label,
//     textAlign: "center",
//     marginTop: 4,
//   },

//   /* pencils */
//   pencilRow: {
//     position: "absolute",
//     bottom: 0,
//     left: 12,
//     right: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   },
// });

// /* ---------- Pieces ---------- */
// const Field = ({ label, value, width, right }) => (
//   <View style={[{ width }, right ? { marginLeft: "auto" } : {}]}>
//     <Text style={s.fLabel}>{label}</Text>
//     <View style={s.fLine}>
//       <View style={s.fDot} />
//       <Text style={s.fValue}>{up(value)}</Text>
//     </View>
//   </View>
// );

// const Pencil = ({ w, h, color, stripe, lead }) => {
//   const th = w * 0.85;
//   return (
//     <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
//       <Rect
//         x={0.5}
//         y={th - 2}
//         width={w - 1}
//         height={h - th + 2}
//         fill={color}
//         stroke={C.head}
//         strokeWidth={0.8}
//       />
//       <Rect x={w * 0.34} y={th - 2} width={w * 0.32} height={h - th + 2} fill={stripe} />
//       <Polygon points={`0.5,${th} ${w / 2},1 ${w - 0.5},${th}`} fill="#F7DDBE" />
//       <Polygon
//         points={`${w * 0.36},${th * 0.42} ${w / 2},1 ${w * 0.64},${th * 0.42}`}
//         fill={lead}
//       />
//     </Svg>
//   );
// };

// const PINK = { color: C.pink, stripe: "#F9C9D6", lead: C.head };
// const ORANGE = { color: C.orange, stripe: "#FFD9A0", lead: "#8A4B12" };

// const Sig = ({ src, label }) => (
//   <View style={s.sigBox}>
//     {src ? <Image src={src} style={s.sigImg} /> : <View style={s.sigSpace} />}
//     <View style={s.sigLine} />
//     <Text style={s.sigLabel}>{label}</Text>
//   </View>
// );

// /* ---------- Document ---------- */
// export default function ReportCard({ data }) {
//   const { school, student, academicYear, className, classTeacher } = data;
//   const sig = data.signatures || { parent: {}, teacher: {} };

//   return (
//     <Document title={`Report Card - ${student.name}`} author={school.name}>
//       <Page size="A4" style={s.page}>
//         {/* Title */}
//         <Text style={s.title}>{up(school.name)}</Text>
//         <Text style={s.location}>{up(school.location)}</Text>
//         <Text style={s.reportTitle}>REPORT CARD</Text>

//         {/* Student details */}
//         <View style={[s.row, { marginTop: 14 }]}>
//           <Field label="Student's Name:" value={student.name} width={242} />
//           <Field label="Class" value={className} width={150} right />
//         </View>
//         <View style={[s.row, { marginTop: 22 }]}>
//           <Field label="Year:" value={academicYear} width={242} />
//           <Field label="Class Teacher" value={classTeacher} width={262} right />
//         </View>

//         {/* Subjects + terms */}
//         <View style={s.tableRow}>
//           <View style={s.subjectBox}>
//             <View style={s.headCell}>
//               <Text style={s.headText}>Subject List</Text>
//             </View>
//             {data.subjects.map((sub) => (
//               <View key={sub.name} style={s.cell}>
//                 <Text style={s.subjectText}>{sub.name}</Text>
//               </View>
//             ))}
//           </View>

//           {[
//             ["First Term", "firstTerm"],
//             ["Second Term", "secondTerm"],
//             ["Annual", "annual"],
//           ].map(([title, key]) => (
//             <View key={key} style={s.termBox}>
//               <View style={s.headCell}>
//                 <Text style={s.headText}>{title}</Text>
//               </View>
//               {data.subjects.map((sub) => (
//                 <View key={sub.name} style={s.cell}>
//                   <Text style={s.gradeText}>{sub.grades[key]}</Text>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </View>

//         {/* Scoring metrics + remarks */}
//         <View style={s.bottomRow}>
//           <View style={s.leftCol}>
//             <Text style={s.sectionLabel}>SCORING METRICS</Text>
//             <View style={s.legendBox}>
//               {data.gradingScale.map((g) => (
//                 <Text key={g.grade} style={s.legendText}>
//                   {g.grade} - {g.label}
//                 </Text>
//               ))}
//             </View>
//           </View>
//           <View style={s.rightCol}>
//             <Text style={s.sectionLabel}>Remarks</Text>
//             {data.remarks.map((r, i) => (
//               <View key={i} style={s.remarkItem}>
//                 <Text style={s.star}>*</Text>
//                 <Text style={s.remarkText}>{r.text}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Signatures */}
//         <View style={s.sigWrap}>
//           <View style={s.sigGroup}>
//             <Text style={s.sigTitle}>Parent's Signature</Text>
//             <View style={s.sigPair}>
//               <Sig src={sig.parent?.firstTerm} label="First term." />
//               <Sig src={sig.parent?.secondTerm} label="Second term." />
//             </View>
//           </View>
//           <View style={s.sigGroup}>
//             <Text style={s.sigTitle}>Teacher's signature</Text>
//             <View style={s.sigPair}>
//               <Sig src={sig.teacher?.firstTerm} label="First term." />
//               <Sig src={sig.teacher?.secondTerm} label="Second term." />
//             </View>
//           </View>
//         </View>

//         {/* Pencils along the bottom edge */}
//         <View style={s.pencilRow}>
//           <Pencil w={52} h={98} {...PINK} />
//           <Pencil w={34} h={84} {...ORANGE} />
//           <Pencil w={52} h={100} {...PINK} />
//           <Pencil w={34} h={74} {...ORANGE} />
//           <Pencil w={52} h={98} {...PINK} />
//           <Pencil w={34} h={82} {...ORANGE} />
//           <Pencil w={52} h={96} {...PINK} />
//         </View>
//       </Page>
//     </Document>
//   );
// }


// import React from "react";
// import {
//   Document,
//   Page,
//   View,
//   Text,
//   Image,
//   Svg,
//   Rect,
//   Polygon,
//   Circle,
//   StyleSheet,
// } from "@react-pdf/renderer";

// /* ---------- Design tokens ---------- */
// const C = {
//   ink: "#26304B",
//   paper: "#FFFCF5",
//   coral: "#F0685F",
//   sun: "#FFC247",
//   mint: "#2FB38A",
//   sky: "#4A9FD8",
//   line: "#E8E2D4",
//   soft: "#F6F1E4",
//   muted: "#6B7289",
// };

// // Grade -> chip colours. Add / rename keys to match your gradingScale.
// const GRADE_COLORS = {
//   "A++": { bg: "#1F9D74", fg: "#FFFFFF" },
//   "A+": { bg: "#58C29C", fg: "#10382B" },
//   A: { bg: "#A9DDC8", fg: "#10382B" },
//   "B+": { bg: "#FFC247", fg: "#4A3500" },
//   B: { bg: "#FFDDA0", fg: "#4A3500" },
// };
// const gradeStyle = (g) => GRADE_COLORS[g] || { bg: C.line, fg: C.ink };

// /* ---------- Styles ---------- */
// const s = StyleSheet.create({
//   page: {
//     backgroundColor: C.paper,
//     fontFamily: "Helvetica",
//     color: C.ink,
//     paddingBottom: 96,
//   },

//   /* header */
//   header: {
//     backgroundColor: C.ink,
//     paddingTop: 30,
//     paddingHorizontal: 34,
//     paddingBottom: 26,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerLeft: { flexDirection: "row", alignItems: "center" },
//   logo: { width: 46, height: 46, borderRadius: 23, marginRight: 12 },
//   logoFallback: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: C.sun,
//     marginRight: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoFallbackText: { fontFamily: "Helvetica-Bold", fontSize: 20, color: C.ink },
//   schoolName: { fontFamily: "Helvetica-Bold", fontSize: 17, color: "#FFFFFF" },
//   schoolSub: { fontSize: 9, color: "#B9C0D6", marginTop: 3 },
//   badge: {
//     backgroundColor: C.sun,
//     borderRadius: 14,
//     paddingVertical: 7,
//     paddingHorizontal: 14,
//   },
//   badgeTitle: { fontFamily: "Helvetica-Bold", fontSize: 11, color: C.ink },
//   badgeSub: { fontSize: 8, color: C.ink, marginTop: 1, textAlign: "center" },
//   stripe: { flexDirection: "row", height: 6 },

//   body: { paddingHorizontal: 34 },

//   /* student card */
//   studentCard: {
//     marginTop: -18,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: C.line,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: { width: 62, height: 62, borderRadius: 31, marginRight: 16 },
//   avatarFallback: {
//     width: 62,
//     height: 62,
//     borderRadius: 31,
//     marginRight: 16,
//     backgroundColor: C.coral,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { fontFamily: "Helvetica-Bold", fontSize: 24, color: "#FFFFFF" },
//   studentName: { fontFamily: "Helvetica-Bold", fontSize: 18 },
//   studentMeta: { flexDirection: "row", marginTop: 8 },
//   metaItem: { marginRight: 26 },
//   metaLabel: { fontSize: 8, color: C.muted },
//   metaValue: { fontFamily: "Helvetica-Bold", fontSize: 10.5, marginTop: 2 },

//   /* section title */
//   sectionTitle: {
//     fontFamily: "Helvetica-Bold",
//     fontSize: 12,
//     marginTop: 20,
//     marginBottom: 8,
//   },

//   /* grade table */
//   table: {
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: C.line,
//     overflow: "hidden",
//     backgroundColor: "#FFFFFF",
//   },
//   tHead: { flexDirection: "row", backgroundColor: C.soft, paddingVertical: 9 },
//   tHeadText: { fontFamily: "Helvetica-Bold", fontSize: 9, color: C.muted },
//   tRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 9,
//     borderTopWidth: 1,
//     borderTopColor: C.line,
//   },
//   colSubject: { width: "37%", paddingLeft: 14 },
//   colTerm: { width: "21%", alignItems: "center" },
//   colAnnual: {
//     width: "21%",
//     alignItems: "center",
//   },
//   subjectRow: { flexDirection: "row", alignItems: "center" },
//   dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
//   subjectText: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
//   chip: {
//     minWidth: 38,
//     borderRadius: 11,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     alignItems: "center",
//   },
//   chipText: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },

//   /* two columns */
//   twoCol: { flexDirection: "row", marginTop: 4 },
//   colLeft: { width: "36%", marginRight: 14 },
//   colRight: { width: "64%" },
//   legendBox: {
//     backgroundColor: C.soft,
//     borderRadius: 12,
//     padding: 12,
//   },
//   legendRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
//   legendChip: {
//     width: 32,
//     borderRadius: 8,
//     paddingVertical: 2,
//     alignItems: "center",
//     marginRight: 8,
//   },
//   legendChipText: { fontFamily: "Helvetica-Bold", fontSize: 8.5 },
//   legendText: { fontSize: 8.5 },

//   remarkBox: {
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: C.line,
//     backgroundColor: "#FFFFFF",
//     padding: 12,
//   },
//   remarkItem: {
//     flexDirection: "row",
//     marginBottom: 8,
//   },
//   remarkBar: { width: 3, borderRadius: 2, marginRight: 9 },
//   remarkTerm: { fontFamily: "Helvetica-Bold", fontSize: 8.5, color: C.muted },
//   remarkText: { fontSize: 10, lineHeight: 1.45, marginTop: 2 },

//   /* signatures */
//   sigRow: { flexDirection: "row", marginTop: 26 },
//   sigBox: { width: "25%", paddingRight: 12, alignItems: "center" },
//   sigImg: { height: 28, objectFit: "contain" },
//   sigSpace: { height: 28 },
//   sigLine: {
//     width: "100%",
//     borderTopWidth: 1,
//     borderTopColor: C.ink,
//     marginTop: 3,
//   },
//   sigLabel: { fontSize: 8, color: C.muted, marginTop: 4, textAlign: "center" },

//   /* footer */
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 34,
//   },
//   pencilRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   },
//   footNote: {
//     textAlign: "center",
//     fontSize: 7.5,
//     color: C.muted,
//     paddingVertical: 6,
//   },
// });

// /* ---------- Small pieces ---------- */
// const Pencil = ({ color, height = 56 }) => (
//   <Svg width={22} height={height} viewBox="0 0 22 70">
//     <Rect x="0" y="0" width="22" height="9" rx="3" fill={C.coral} />
//     <Rect x="0" y="9" width="22" height="7" fill="#C9CED9" />
//     <Rect x="0" y="16" width="22" height="32" fill={color} />
//     <Rect x="7" y="16" width="3" height="32" fill="#FFFFFF" opacity={0.35} />
//     <Polygon points="0,48 22,48 11,70" fill="#F4D7A8" />
//     <Polygon points="7.5,62 14.5,62 11,70" fill={C.ink} />
//   </Svg>
// );

// const Chip = ({ grade }) => {
//   const g = gradeStyle(grade);
//   return (
//     <View style={[s.chip, { backgroundColor: g.bg }]}>
//       <Text style={[s.chipText, { color: g.fg }]}>{grade || "-"}</Text>
//     </View>
//   );
// };

// const Signature = ({ src, label }) => (
//   <View style={s.sigBox}>
//     {src ? <Image src={src} style={s.sigImg} /> : <View style={s.sigSpace} />}
//     <View style={s.sigLine} />
//     <Text style={s.sigLabel}>{label}</Text>
//   </View>
// );

// const SUBJECT_DOTS = [C.coral, C.sky, C.sun, C.mint, "#9B7EDE", "#F59E4B"];
// const REMARK_COLORS = [C.sky, C.mint, C.coral];

// /* ---------- Document ---------- */
// export default function ReportCard({ data }) {
//   const { school, student, academicYear, className, classTeacher } = data;
//   const initials = (student.name || "?")
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <Document title={`Report Card - ${student.name}`} author={school.name}>
//       <Page size="A4" style={s.page}>
//         {/* Header */}
//         <View style={s.header}>
//           <View style={s.headerLeft}>
//             {school.logoUrl ? (
//               <Image src={school.logoUrl} style={s.logo} />
//             ) : (
//               <View style={s.logoFallback}>
//                 <Text style={s.logoFallbackText}>{school.name[0]}</Text>
//               </View>
//             )}
//             <View>
//               <Text style={s.schoolName}>{school.name}</Text>
//               <Text style={s.schoolSub}>{school.location}</Text>
//             </View>
//           </View>
//           <View style={s.badge}>
//             <Text style={s.badgeTitle}>Report Card</Text>
//             <Text style={s.badgeSub}>{academicYear}</Text>
//           </View>
//         </View>
//         <View style={s.stripe}>
//           {[C.coral, C.sun, C.mint, C.sky].map((c) => (
//             <View key={c} style={{ flex: 1, backgroundColor: c }} />
//           ))}
//         </View>

//         <View style={s.body}>
//           {/* Student card */}
//           <View style={s.studentCard}>
//             {student.photoUrl ? (
//               <Image src={student.photoUrl} style={s.avatar} />
//             ) : (
//               <View style={s.avatarFallback}>
//                 <Text style={s.avatarText}>{initials}</Text>
//               </View>
//             )}
//             <View>
//               <Text style={s.studentName}>{student.name}</Text>
//               <View style={s.studentMeta}>
//                 {[
//                   ["Class", className],
//                   ["Class teacher", classTeacher],
//                   ["Academic year", academicYear],
//                   student.rollNo ? ["Roll no.", student.rollNo] : null,
//                 ]
//                   .filter(Boolean)
//                   .map(([l, v]) => (
//                     <View key={l} style={s.metaItem}>
//                       <Text style={s.metaLabel}>{l}</Text>
//                       <Text style={s.metaValue}>{v}</Text>
//                     </View>
//                   ))}
//               </View>
//             </View>
//           </View>

//           {/* Grades */}
//           <Text style={s.sectionTitle}>How {student.name.split(" ")[0]} is doing</Text>
//           <View style={s.table}>
//             <View style={s.tHead}>
//               <View style={s.colSubject}>
//                 <Text style={s.tHeadText}>Subject</Text>
//               </View>
//               <View style={s.colTerm}>
//                 <Text style={s.tHeadText}>First term</Text>
//               </View>
//               <View style={s.colTerm}>
//                 <Text style={s.tHeadText}>Second term</Text>
//               </View>
//               <View style={s.colAnnual}>
//                 <Text style={s.tHeadText}>Annual</Text>
//               </View>
//             </View>
//             {data.subjects.map((sub, i) => (
//               <View
//                 key={sub.name}
//                 style={[s.tRow, i % 2 === 1 ? { backgroundColor: "#FDFAF2" } : {}]}
//               >
//                 <View style={s.colSubject}>
//                   <View style={s.subjectRow}>
//                     <View
//                       style={[s.dot, { backgroundColor: SUBJECT_DOTS[i % SUBJECT_DOTS.length] }]}
//                     />
//                     <Text style={s.subjectText}>{sub.name}</Text>
//                   </View>
//                 </View>
//                 <View style={s.colTerm}>
//                   <Chip grade={sub.grades.firstTerm} />
//                 </View>
//                 <View style={s.colTerm}>
//                   <Chip grade={sub.grades.secondTerm} />
//                 </View>
//                 <View style={s.colAnnual}>
//                   <Chip grade={sub.grades.annual} />
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* Legend + Remarks */}
//           <View style={[s.twoCol, { marginTop: 8 }]}>
//             <View style={s.colLeft}>
//               <Text style={s.sectionTitle}>Grading key</Text>
//               <View style={s.legendBox}>
//                 {data.gradingScale.map((g) => {
//                   const gs = gradeStyle(g.grade);
//                   return (
//                     <View key={g.grade} style={s.legendRow}>
//                       <View style={[s.legendChip, { backgroundColor: gs.bg }]}>
//                         <Text style={[s.legendChipText, { color: gs.fg }]}>{g.grade}</Text>
//                       </View>
//                       <Text style={s.legendText}>{g.label}</Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//             <View style={s.colRight}>
//               <Text style={s.sectionTitle}>Teacher's remarks</Text>
//               <View style={s.remarkBox}>
//                 {data.remarks.map((r, i) => (
//                   <View key={r.term} style={s.remarkItem}>
//                     <View
//                       style={[s.remarkBar, { backgroundColor: REMARK_COLORS[i % 3] }]}
//                     />
//                     <View style={{ flex: 1 }}>
//                       <Text style={s.remarkTerm}>{r.term}</Text>
//                       <Text style={s.remarkText}>{r.text}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>

//           {/* Signatures */}
//           <View style={s.sigRow}>
//             <Signature src={data.signatures.parent.firstTerm} label="Parent, first term" />
//             <Signature src={data.signatures.parent.secondTerm} label="Parent, second term" />
//             <Signature src={data.signatures.teacher.firstTerm} label="Teacher, first term" />
//             <Signature src={data.signatures.teacher.secondTerm} label="Teacher, second term" />
//           </View>
//         </View>

//         {/* Footer pencils */}
//         <View style={s.footer} fixed>
//           <View style={s.pencilRow}>
//             {[C.coral, C.sun, C.mint, C.sky, C.coral, C.sun, C.mint, C.sky, C.coral, C.sun].map(
//               (c, i) => (
//                 <Pencil key={i} color={c} height={i % 2 ? 48 : 58} />
//               )
//             )}
//           </View>
//           <Text style={s.footNote}>
//             {school.name} · {school.location}
//           </Text>
//         </View>
//       </Page>
//     </Document>
//   );
// }