// import React from "react";
// import {
//   Document,
//   Page,
//   View,
//   Text,
//   StyleSheet,
//   Svg,
//   Path,
//   Rect,
//   Circle,
//   Image,
// } from "@react-pdf/renderer";

// // ---- design tokens (same palette as the MUI version) -----------------
// const NAVY = "#2f6483";
// const NAVY_DARK = "#122A56";
// const GOLD = "#D9A441";
// const LIGHT_BLUE_BG = "#EAF1FB";
// const LINE_GREY = "#9FB3CC";
// const CORNER_BLUE = "#BFD6F5";

// // A single blank space used as a filler for empty values. Real text is
// // never falsy here — the border-bottom on detailValueWrap is already the
// // "blank line" for the reader to see, so we must NOT also print a dashed
// // placeholder string (that produced two visible lines stacked on top of
// // each other when the API sent null/empty). "\u00A0" keeps the row's
// // height/baseline identical to a row that does have text, without
// // drawing a second line.
// const BLANK = "\u00A0";

// // ---- styles --------------------------------------------------------------
// // NOTE: sizes below are deliberately compact (vs. the first draft) so the
// // whole certificate — header, 17 detail rows, certification block and
// // signatures — reliably fits on a single A4 page without react-pdf
// // auto-creating a second page. If you add more rows/fields later and it
// // spills over, shave a bit more off detailRow.marginBottom / fontSize
// // first, since that's the section with the most repeated vertical cost.
// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#EEF1F5",
//     padding: 22,
//     fontFamily: "Times-Roman",
//     fontSize: 9,
//   },
//   paper: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 18,
//     position: "relative",
//     overflow: "hidden",
//   },
//   content: {
//     flex: 1,
//     flexDirection: "column",
//     position: "relative",
//   },
//   spacer: {
//     flexGrow: 1,
//   },

//   // -------- decorative corners --------
//   cornerTopLeft: {
//     position: "absolute",
//     top: -40,
//     left: -40,
//     width: 100,
//     height: 100,
//     backgroundColor: CORNER_BLUE,
//     transform: "rotate(45deg)",
//   },
//   cornerTopRight: {
//     position: "absolute",
//     top: -46,
//     right: -46,
//     width: 118,
//     height: 118,
//     backgroundColor: GOLD,
//     opacity: 0.85,
//     transform: "rotate(45deg)",
//   },
//   cornerBottomLeft: {
//     position: "absolute",
//     bottom: -50,
//     left: -26,
//     width: 200,
//     height: 78,
//     backgroundColor: NAVY,
//     borderTopRightRadius: 90,
//   },
//   cornerBottomRight: {
//     position: "absolute",
//     bottom: -34,
//     right: -26,
//     width: 200,
//     height: 60,
//     backgroundColor: GOLD,
//     opacity: 0.9,
//     borderTopLeftRadius: 90,
//   },

//   // -------- header --------
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   logoWrap: {
//     width: 78,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoCircle: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerText: {
//     flex: 1,
//   },
//   schoolName: {
//     fontFamily: "Times-Bold",
//     fontSize: 19,
//     color: NAVY,
//     lineHeight: 1.05,
//   },
//   tagline: {
//     fontSize: 7.5,
//     letterSpacing: 1.5,
//     color: NAVY,
//     fontFamily: "Times-Bold",
//     marginTop: 2,
//   },
//   addressLine: {
//     fontSize: 7.5,
//     color: "#444444",
//     marginTop: 2,
//   },

//   // -------- TC no / admission no / date --------
//   metaRow: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },
//   metaLeft: {
//     flex: 1.4,
//   },
//   metaRight: {
//     flex: 2,
//   },
//   metaLabel: {
//     fontSize: 8.5,
//     fontFamily: "Times-Bold",
//     color: NAVY_DARK,
//     marginBottom: 1,
//   },
//   metaValue: {
//     fontFamily: "Times-Roman",
//     fontWeight: "normal",
//   },

//   // -------- ribbon title --------
//   ribbonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   ribbonLine: {
//     flex: 1,
//     borderBottomWidth: 2,
//     borderBottomColor: GOLD,
//   },
//   ribbonBadge: {
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 22,
//     marginHorizontal: 10,
//   },
//   ribbonText: {
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 13,
//     letterSpacing: 1.5,
//     textAlign: "center",
//   },

//   // -------- section bar --------
//   sectionBar: {
//     alignSelf: "flex-start",
//     backgroundColor: NAVY,
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 8.5,
//     letterSpacing: 0.4,
//     paddingVertical: 3.5,
//     paddingHorizontal: 11,
//     borderTopLeftRadius: 3,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 3,
//     borderBottomLeftRadius: 3,
//     marginBottom: 7,
//   },

//   // -------- detail rows --------
//   detailsRow: {
//     flexDirection: "row",
//   },
//   detailsColLeft: {
//     flex: 8.5,
//     paddingRight: 10,
//   },
//   detailsColRight: {
//     flex: 3.5,
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 6,
//   },
//   detailIndex: {
//     width: 13,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailLabel: {
//     width: 172,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailColon: {
//     width: 8,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailValueWrap: {
//     flex: 1,
//     borderBottomWidth: 0.75,
//     borderBottomColor: LINE_GREY,
//     paddingBottom: 1.5,
//   },
//   detailValueText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },

//   // -------- photo placeholder --------
//   photoBox: {
//     borderWidth: 1.3,
//     borderStyle: "dashed",
//     borderColor: LINE_GREY,
//     borderRadius: 7,
//     height: 96,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F7F9FC",
//   },
//   photoCaption: {
//     fontSize: 7.5,
//     color: "#7A8AA0",
//     textAlign: "center",
//     marginTop: 5,
//   },

//   // -------- certification --------
//   certWrap: {
//     marginTop: 8,
//   },
//   certBox: {
//     backgroundColor: LIGHT_BLUE_BG,
//     borderWidth: 1,
//     borderColor: LINE_GREY,
//     borderRadius: 5,
//     padding: 8,
//   },
//   certText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     lineHeight: 1.45,
//   },

//   // -------- signatures --------
//   signRow: {
//     flexDirection: "row",
//     marginTop: 16,
//     // The navy/gold decorative corner shapes intrude ~8-10pt past the
//     // card's padding at the bottom, so this margin keeps the signature
//     // row clear of them instead of sitting flush on the bottom edge.
//     marginBottom: 26,
//   },
//   signCol: {
//     flex: 1,
//     alignItems: "center",
//   },
//   signSpace: {
//     // Blank room to physically sign, above the underline.
//     height: 26,
//   },
//   signLine: {
//     borderBottomWidth: 1.3,
//     borderBottomColor: NAVY_DARK,
//     width: "80%",
//     marginBottom: 14,
//   },
//   signRole: {
//     fontFamily: "Times-Bold",
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     textAlign: "center",
//   },
//   signCaption: {
//     fontSize: 7.5,
//     color: NAVY_DARK,
//     marginTop: 2,
//     textAlign: "center",
//   },
//   photoBoxFilled: {
//     borderStyle: "solid",
//   },
//   photoImage: {
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//     borderRadius: 6,
//   },
//   logoImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 23,
//     objectFit: "cover",
//   },
// });

// // ---- small icon substitutes (react-pdf has no icon-font support) ------

// /** Simple graduation-cap glyph drawn with basic shapes */
// function SchoolGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" fill="#FFFFFF" />
//       <Path d="M5 10.18v3.64L12 17l7-3.18v-3.64L12 13.5 5 10.18z" fill="#FFFFFF" opacity={0.85} />
//     </Svg>
//   );
// }

// /** Simple camera glyph for the photo placeholder */
// function CameraGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Rect x={3} y={7} width={18} height={13} rx={2} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Path d="M9 7l1.5-2h3L15 7" fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Circle cx={12} cy={13.5} r={3.5} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//     </Svg>
//   );
// }

// // ---- reusable pieces ----------------------------------------------------

// function DetailRow({ index, label, children }) {
//   return (
//     <View style={styles.detailRow} wrap={false}>
//       <Text style={styles.detailIndex}>{index}.</Text>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <View style={styles.detailValueWrap}>{children}</View>
//     </View>
//   );
// }

// function SectionBar({ children }) {
//   return <Text style={styles.sectionBar}>{children}</Text>;
// }

// function SignatureBlock({ role }) {
//   return (
//     <View style={styles.signCol}>
//       <View style={styles.signSpace} />
//       <View style={styles.signLine} />
//       <Text style={styles.signRole}>{role}</Text>
//       <Text style={styles.signCaption}>Signature: ______________</Text>
//     </View>
//   );
// }
// function getCurrentDate() {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const year = today.getFullYear();
//   return `${day}-${month}-${year}`;
// }
// // ---- main component -------------------------------------------------------

// export default function TransferCertificate({ url, data, UserName }) {
//   const getValue = (value) =>
//     value === null || value === undefined || value === "" ? "" : value;
//   const IMAGE_BASE_URL = `${url}/uploads/Images/`;
//   const studentImageUrl = data?.StudentImage
//     ? `${IMAGE_BASE_URL}${data.StudentImage}`
//     : null;
//   const schoolLogoUrl = `${url}/uploads/Images/${data.CompanyLogo}`;
//   const fields = [
//     {
//       label: "Name of the Student",
//       type: "text",
//       value: getValue(data?.EmployeeName),
//     },
//     {
//       label: "Parent / Guardian's Name",
//       type: "text",
//       value: getValue(data?.FathersName),
//     },
//     // {
//     //   label: "Mother's Name",
//     //   type: "text",
//     //   value: getValue(data?.MothersName),
//     // },
//     {
//       label: "Date of Birth",
//       type: "date",
//       value: getValue(data?.DateOfBirth),
//     },
//     {
//       label: "Nationality",
//       type: "text",
//       value: getValue(data?.Nationality),
//     },
//     {
//       label: "Religion / Community",
//       type: "text",
//       value: getValue(data?.["Relegion / Community"]),
//     },
//     {
//       // Now mapped from the API's AdmissionDate field.
//       label: "Admission Date",
//       type: "date",
//       value: getValue(data?.AdmissionDate),
//     },
//     {
//       // Now mapped from the API's ClassLastStudied field.
//       label: "Class Last Studied",
//       type: "text",
//       value: getValue(data?.ClassLastStudied),
//     },
//     {
//       label: "Academic Year",
//       type: "text",
//       value: getValue(data?.AcademicYear),
//     },
//     // {
//     //   // Still not sent by the API — remains blank until backend adds it.
//     //   label: "Medium of Instruction",
//     //   type: "text",
//     //   value: "",
//     // },
//     {
//       label: "Whether Qualified for Promotion to the Next Class",
//       type: "yesno",
//       value: data?.QualifiedForPromotion === "Y" ? "Yes" : "No",
//     },
//     {
//       label: "Whether the Student Has Paid All Fees and Dues",
//       type: "yesno",
//       value: data?.NoDue === "Y" ? "Yes" : "No",
//     },
//     {
//       // Replaced "Total Working Days / Days Present" with the single
//       // AttendancePercent value the API actually sends (e.g. "0.4000%").
//       label: "Attendance Percentage",
//       type: "text",
//       value: getValue(data?.AttendancePercent),
//     },
//     {
//       label: "Date of Leaving the School",
//       type: "date",
//       value: getValue(data?.DateOfLeaving),
//     },
//     {
//       label: "Reason for Leaving",
//       type: "text",
//       value: getValue(data?.ReasonForLeaving),
//     },
//     {
//       label: "Conduct and Character",
//       type: "text",
//       value: getValue(data?.ConductAndCharacter),
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Date of Issue of Transfer Certificate",
//       type: "date",
//       value: getCurrentDate(),
//     },
//   ];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.paper} wrap={false}>
//           {/* decorative corner accents */}
//           <View style={styles.cornerTopLeft} />
//           <View style={styles.cornerTopRight} />
//           <View style={styles.cornerBottomLeft} />
//           <View style={styles.cornerBottomRight} />

//           <View style={styles.content}>
//             {/* ---------- Header ---------- */}
//             <View style={styles.headerRow}>
//               {/* <View style={styles.logoWrap}>
//                 <View style={styles.logoCircle}>
//                   <SchoolGlyph />
//                 </View>
//               </View> */}
//               <View style={styles.logoWrap}>
//                 <View style={styles.logoCircle}>
//                   {schoolLogoUrl ? (
//                     <Image style={styles.logoImage} src={schoolLogoUrl} />
//                   ) : (
//                     <SchoolGlyph />
//                   )}
//                 </View>
//               </View>
//               <View style={styles.headerText}>
//                 <Text style={styles.schoolName}>{data?.CompanyName}</Text>
//                 <Text style={styles.tagline}>LEARN  •  GROW  •  SUCCEED</Text>
//                 <Text style={styles.addressLine}>
//                   {data?.Address}
//                 </Text>
//                 <Text style={styles.addressLine}>
//                   {`Ph: ${data?.MobileNumber}  |  Email: ${data?.MailID}`}
//                 </Text>
//               </View>
//             </View>

//             {/* ---------- TC No / Admission No / Date ---------- */}
//             {/* <View style={styles.metaRow}>
//               <View style={styles.metaLeft}>
//                 <Text style={styles.metaLabel}>
//                   Transfer Certificate No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//               </View>
//               <View style={styles.metaRight}>
//                 <Text style={styles.metaLabel}>
//                   Admission No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//                 <Text style={styles.metaLabel}>
//                   Date : <Text style={styles.metaValue}>{getCurrentDate()}</Text>
//                 </Text>
//               </View>
//             </View> */}

//             {/* ---------- Ribbon title ---------- */}
//             <View style={styles.ribbonRow}>
//               <View style={styles.ribbonLine} />
//               <View style={styles.ribbonBadge}>
//                 <Text style={styles.ribbonText}>TRANSFER CERTIFICATE</Text>
//               </View>
//               <View style={styles.ribbonLine} />
//             </View>

//             {/* ---------- Student details ---------- */}
//             <SectionBar>STUDENT DETAILS</SectionBar>

//             <View style={styles.detailsRow}>
//               <View style={styles.detailsColLeft}>
//                 {fields.map((f, i) => (
//                   <DetailRow key={f.label} index={i + 1} label={f.label}>
//                     {/* Every branch below falls back to BLANK ("\u00A0")
//                         instead of a dashed placeholder string, because
//                         detailValueWrap already draws a border-bottom line
//                         for the reader to write on. Printing placeholder
//                         dashes/text on top of that border produced two
//                         visible lines whenever the API sent null/empty. */}
//                     <Text style={styles.detailValueText}>
//                       {f.value || BLANK}
//                     </Text>
//                   </DetailRow>
//                 ))}
//               </View>

//               {/* Photo placeholder */}
//               <View style={styles.detailsColRight}>
//                 <View
//                   style={
//                     studentImageUrl
//                       ? [styles.photoBox, styles.photoBoxFilled]
//                       : styles.photoBox
//                   }
//                 >
//                   {studentImageUrl ? (
//                     <Image style={styles.photoImage} src={studentImageUrl} />
//                   ) : (
//                     <>
//                       <CameraGlyph />
//                       <Text style={styles.photoCaption}>
//                         Student Photo{"\n"}(Optional)
//                       </Text>
//                     </>
//                   )}
//                 </View>
//               </View>
//               {/* <View style={styles.detailsColRight}>
//                 <View style={styles.photoBox}>
//                   <CameraGlyph />
//                   <Text style={styles.photoCaption}>
//                     Student Photo{"\n"}(Optional)
//                   </Text>
//                 </View>
//               </View> */}
//             </View>

//             {/* ---------- Certification ---------- */}
//             <View style={styles.certWrap} wrap={false}>
//               <SectionBar>CERTIFICATION</SectionBar>
//               <View style={styles.certBox}>
//                 <Text style={styles.certText}>
//                   Certified that the above-mentioned student was a bonafide
//                   student of this school and has been relieved from the
//                   school on the date mentioned above.
//                   {"\n"}
//                   We wish the student all the best for future studies and
//                   career.
//                 </Text>
//               </View>
//             </View>

//             {/* Flexible spacer: absorbs the leftover page height here so the
//                 white card fills the whole A4 page instead of leaving a
//                 grey gap below it, and the signature row sits near the
//                 bottom like a real certificate. */}
//             <View style={styles.spacer} />

//             {/* ---------- Signatures ---------- */}
//             <View style={styles.signRow} wrap={false}>
//               <SignatureBlock role="Class Teacher" />
//               <SignatureBlock role="School Office" />
//               <SignatureBlock role="Principal / Head of Institution" />
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// }
//with header
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Circle,
  Image,
} from "@react-pdf/renderer";

// ---- design tokens (same palette as the MUI version) -----------------
const NAVY = "#2f6483";
const NAVY_DARK = "#122A56";
const GOLD = "#D9A441";
const LIGHT_BLUE_BG = "#EAF1FB";
const LINE_GREY = "#9FB3CC";

// A single blank space used as a filler for empty values. Real text is
// never falsy here — the border-bottom on detailValueWrap is already the
// "blank line" for the reader to see, so we must NOT also print a dashed
// placeholder string (that produced two visible lines stacked on top of
// each other when the API sent null/empty). "\u00A0" keeps the row's
// height/baseline identical to a row that does have text, without
// drawing a second line.
const BLANK = "\u00A0";

// ---- layout budget (why the numbers below are what they are) -------------
// A4 usable height ≈ 842 - (page.padding * 2) = 842 - 44 = 798pt.
// Of that, the header banner (52) + footer banner (40) now take 92pt that
// the old logo-in-header layout didn't spend, so every other block below
// was trimmed a little (row spacing, font sizes, signature gaps) to keep
// the 17 detail rows + photo + certification + signatures on one page.
// If you add more student-detail rows later, shave `detailRow.marginBottom`
// or `HEADER_BANNER_HEIGHT` / `FOOTER_BANNER_HEIGHT` first.
const HEADER_BANNER_HEIGHT = 40;
const FOOTER_BANNER_HEIGHT = 60;

// ---- styles --------------------------------------------------------------
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#EEF1F5",
    padding: 22,
    fontFamily: "Times-Roman",
    fontSize: 9,
  },
  paper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden", // clips the edge-to-edge header/footer banners to the card's rounded corners
    flexDirection: "column",
  },

  // -------- header / footer banner images --------
headerBanner: {
  width: "100%",
  marginTop: 1,
  height: HEADER_BANNER_HEIGHT,
  objectFit: "contain",     // was "cover" — stops it from cropping/zooming
  objectPosition: "center", // keeps it centered horizontally & vertically
},
  // Reserves the same height as the real banner when the API hasn't sent
  // an image yet, so the one-page layout budget never shifts — but paints
  // no color, since the image is always meant to supply the visuals.
  headerBannerPlaceholder: {
    width: "100%",
    height: HEADER_BANNER_HEIGHT,
  },
  footerBanner: {
    width: "100%",
    height: FOOTER_BANNER_HEIGHT,
    objectFit: "cover",
  },
  footerBannerPlaceholder: {
    width: "100%",
    height: FOOTER_BANNER_HEIGHT,
  },

  // -------- padded content area between the two banners --------
  content: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    padding: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  spacer: {
    flexGrow: 1,
  },

  // -------- header text (logo removed — school name/tagline/address only) --------
  headerTextRow: {
    marginBottom: 7,
    alignItems: "center",
  },
  schoolName: {
    fontFamily: "Times-Bold",
    fontSize: 19,
    color: NAVY,
    lineHeight: 1.05,
    textAlign: "center",
  },
  tagline: {
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: NAVY,
    fontFamily: "Times-Bold",
    marginTop: 2,
    textAlign: "center",
  },
  addressLine: {
    fontSize: 7.5,
    color: "#444444",
    marginTop: 2,
    textAlign: "center",
  },

  // -------- ribbon title --------
  ribbonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },
  ribbonLine: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
  },
  ribbonBadge: {
    backgroundColor: NAVY,
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 22,
    marginHorizontal: 10,
  },
  ribbonText: {
    color: "#FFFFFF",
    fontFamily: "Times-Bold",
    fontSize: 13,
    letterSpacing: 1.5,
    textAlign: "center",
  },

  // -------- section bar --------
  sectionBar: {
    alignSelf: "flex-start",
    backgroundColor: NAVY,
    color: "#FFFFFF",
    fontFamily: "Times-Bold",
    fontSize: 8.5,
    letterSpacing: 0.4,
    paddingVertical: 3.5,
    paddingHorizontal: 11,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    marginBottom: 6,
  },

  // -------- detail rows --------
  detailsRow: {
    flexDirection: "row",
  },
  detailsColLeft: {
    flex: 8.5,
    paddingRight: 10,
  },
  detailsColRight: {
    flex: 3.5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5.2,
  },
  detailIndex: {
    width: 13,
    fontSize: 8.2,
    color: NAVY_DARK,
  },
  detailLabel: {
    width: 172,
    fontSize: 8.2,
    color: NAVY_DARK,
  },
  detailColon: {
    width: 8,
    fontSize: 8.2,
    color: NAVY_DARK,
  },
  detailValueWrap: {
    flex: 1,
    borderBottomWidth: 0.75,
    borderBottomColor: LINE_GREY,
    paddingBottom: 1.5,
  },
  detailValueText: {
    fontSize: 8.2,
    color: NAVY_DARK,
  },

  // -------- photo placeholder --------
  photoBox: {
    borderWidth: 1.3,
    borderStyle: "dashed",
    borderColor: LINE_GREY,
    borderRadius: 7,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F9FC",
  },
  photoBoxFilled: {
    borderStyle: "solid",
  },
  photoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 6,
  },
  photoCaption: {
    fontSize: 7.5,
    color: "#7A8AA0",
    textAlign: "center",
    marginTop: 5,
  },

  // -------- certification --------
  certWrap: {
    marginTop: 7,
  },
  certBox: {
    backgroundColor: LIGHT_BLUE_BG,
    borderWidth: 1,
    borderColor: LINE_GREY,
    borderRadius: 5,
    padding: 8,
  },
  certText: {
    fontSize: 8.2,
    color: NAVY_DARK,
    lineHeight: 1.4,
  },

  // -------- signatures --------
  signRow: {
    flexDirection: "row",
    marginTop: 14,
    marginBottom: 4, // footer banner now closes off the card, so this can be small
  },
  signCol: {
    flex: 1,
    alignItems: "center",
  },
  signSpace: {
    height: 24, // room to physically sign, above the underline
  },
  signLine: {
    borderBottomWidth: 1.3,
    borderBottomColor: NAVY_DARK,
    width: "80%",
    marginBottom: 12,
  },
  signRole: {
    fontFamily: "Times-Bold",
    fontSize: 8.2,
    color: NAVY_DARK,
    textAlign: "center",
  },
  signCaption: {
    fontSize: 7.5,
    color: NAVY_DARK,
    marginTop: 2,
    textAlign: "center",
  },
});

// ---- small icon substitute (react-pdf has no icon-font support) ---------

/** Simple camera glyph for the photo placeholder */
function CameraGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Rect x={3} y={7} width={18} height={13} rx={2} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
      <Path d="M9 7l1.5-2h3L15 7" fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
      <Circle cx={12} cy={13.5} r={3.5} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
    </Svg>
  );
}

// ---- reusable pieces ----------------------------------------------------

function DetailRow({ index, label, children }) {
  return (
    <View style={styles.detailRow} wrap={false}>
      <Text style={styles.detailIndex}>{index}.</Text>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailColon}>:</Text>
      <View style={styles.detailValueWrap}>{children}</View>
    </View>
  );
}

function SectionBar({ children }) {
  return <Text style={styles.sectionBar}>{children}</Text>;
}

function SignatureBlock({ role }) {
  return (
    <View style={styles.signCol}>
      <View style={styles.signSpace} />
      <View style={styles.signLine} />
      <Text style={styles.signRole}>{role}</Text>
      <Text style={styles.signCaption}>Signature: ______________</Text>
    </View>
  );
}

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

// ---- main component -------------------------------------------------------

export default function TransferCertificate({ url, data, UserName }) {
  const getValue = (value) =>
    value === null || value === undefined || value === "" ? "" : value;

  const IMAGE_BASE_URL = `${url}/uploads/Images/`;

  const studentImageUrl = data?.StudentImage
    ? `${IMAGE_BASE_URL}${data.StudentImage}`
    : null;

  // Header/footer banner images now come from the API instead of the
  // small circular logo next to the school name. Field names below
  // (HeaderImage / FooterImage) — rename to match whatever your API
  // actually returns if different.
  const headerImageUrl = data?.HeaderImage
    ? `${IMAGE_BASE_URL}${data.HeaderImage}`
    : null;
  const footerImageUrl = data?.FooterImage
    ? `${IMAGE_BASE_URL}${data.FooterImage}`
    : null;

  const fields = [
    {
      label: "Name of the Student",
      type: "text",
      value: getValue(data?.EmployeeName),
    },
    {
      label: "Parent / Guardian's Name",
      type: "text",
      value: getValue(data?.FathersName),
    },
    {
      label: "Date of Birth",
      type: "date",
      value: getValue(data?.DateOfBirth),
    },
    {
      label: "Nationality",
      type: "text",
      value: getValue(data?.Nationality),
    },
    {
      label: "Religion / Community",
      type: "text",
      value: getValue(data?.["Relegion / Community"]),
    },
    {
      label: "Admission Date",
      type: "date",
      value: getValue(data?.AdmissionDate),
    },
    {
      label: "Class Last Studied",
      type: "text",
      value: getValue(data?.ClassLastStudied),
    },
    {
      label: "Academic Year",
      type: "text",
      value: getValue(data?.AcademicYear),
    },
    {
      label: "Whether Qualified for Promotion to the Next Class",
      type: "yesno",
      value: data?.QualifiedForPromotion === "Y" ? "Yes" : "No",
    },
    {
      label: "Whether the Student Has Paid All Fees and Dues",
      type: "yesno",
      value: data?.NoDue === "Y" ? "Yes" : "No",
    },
    {
      label: "Attendance Percentage",
      type: "text",
      value: getValue(data?.AttendancePercent),
    },
    {
      label: "Date of Leaving the School",
      type: "date",
      value: getValue(data?.DateOfLeaving),
    },
    {
      label: "Reason for Leaving",
      type: "text",
      value: getValue(data?.ReasonForLeaving),
    },
    {
      label: "Conduct and Character",
      type: "text",
      value: getValue(data?.ConductAndCharacter),
    },
    {
      label: "Date of Issue of Transfer Certificate",
      type: "date",
      value: getCurrentDate(),
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.paper} wrap={false}>
          {/* ---------- Header banner image (from API) ---------- */}
          {headerImageUrl ? (
            <Image style={styles.headerBanner} src={headerImageUrl} />
          ) : (
            <View style={styles.headerBannerPlaceholder} />
          )}

          <View style={styles.content}>
            {/* ---------- School name / tagline / address (no logo) ---------- */}
            <View style={styles.headerTextRow}>
              <Text style={styles.schoolName}>{data?.CompanyName}</Text>
              <Text style={styles.tagline}>LEARN  •  GROW  •  SUCCEED</Text>
              <Text style={styles.addressLine}>{data?.Address}</Text>
              <Text style={styles.addressLine}>
                {`Ph: ${data?.MobileNumber}  |  Email: ${data?.MailID}`}
              </Text>
            </View>

            {/* ---------- Ribbon title ---------- */}
            <View style={styles.ribbonRow}>
              <View style={styles.ribbonLine} />
              <View style={styles.ribbonBadge}>
                <Text style={styles.ribbonText}>TRANSFER CERTIFICATE</Text>
              </View>
              <View style={styles.ribbonLine} />
            </View>

            {/* ---------- Student details ---------- */}
            <SectionBar>STUDENT DETAILS</SectionBar>

            <View style={styles.detailsRow}>
              <View style={styles.detailsColLeft}>
                {fields.map((f, i) => (
                  <DetailRow key={f.label} index={i + 1} label={f.label}>
                    {/* Every branch below falls back to BLANK ("\u00A0")
                        instead of a dashed placeholder string, because
                        detailValueWrap already draws a border-bottom line
                        for the reader to write on. Printing placeholder
                        dashes/text on top of that border produced two
                        visible lines whenever the API sent null/empty. */}
                    <Text style={styles.detailValueText}>
                      {f.value || BLANK}
                    </Text>
                  </DetailRow>
                ))}
              </View>

              {/* Photo placeholder */}
              <View style={styles.detailsColRight}>
                <View
                  style={
                    studentImageUrl
                      ? [styles.photoBox, styles.photoBoxFilled]
                      : styles.photoBox
                  }
                >
                  {studentImageUrl ? (
                    <Image style={styles.photoImage} src={studentImageUrl} />
                  ) : (
                    <>
                      <CameraGlyph />
                      <Text style={styles.photoCaption}>
                        Student Photo{"\n"}(Optional)
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>

            {/* ---------- Certification ---------- */}
            <View style={styles.certWrap} wrap={false}>
              <SectionBar>CERTIFICATION</SectionBar>
              <View style={styles.certBox}>
                <Text style={styles.certText}>
                  Certified that the above-mentioned student was a bonafide
                  student of this school and has been relieved from the
                  school on the date mentioned above.
                  {"\n"}
                  We wish the student all the best for future studies and
                  career.
                </Text>
              </View>
            </View>

            {/* Flexible spacer: absorbs leftover height here so the
                signature row sits just above the footer banner regardless
                of how much text the detail values actually take up. */}
            <View style={styles.spacer} />

            {/* ---------- Signatures ---------- */}
            <View style={styles.signRow} wrap={false}>
              <SignatureBlock role="Class Teacher" />
              <SignatureBlock role="School Office" />
              <SignatureBlock role="Principal / Head of Institution" />
            </View>
          </View>

          {/* ---------- Footer banner image (from API) ---------- */}
          {footerImageUrl ? (
            <Image style={styles.footerBanner} src={footerImageUrl} />
          ) : (
            <View style={styles.footerBannerPlaceholder} />
          )}
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
//   StyleSheet,
//   Svg,
//   Path,
//   Rect,
//   Circle,
//   Image,
// } from "@react-pdf/renderer";

// // ---- design tokens (same palette as the MUI version) -----------------
// const NAVY = "#2f6483";
// const NAVY_DARK = "#122A56";
// const GOLD = "#D9A441";
// const LIGHT_BLUE_BG = "#EAF1FB";
// const LINE_GREY = "#9FB3CC";
// const CORNER_BLUE = "#BFD6F5";

// // A single blank space used as a filler for empty values. Real text is
// // never falsy here — the border-bottom on detailValueWrap is already the
// // "blank line" for the reader to see, so we must NOT also print a dashed
// // placeholder string (that produced two visible lines stacked on top of
// // each other when the API sent null/empty). "\u00A0" keeps the row's
// // height/baseline identical to a row that does have text, without
// // drawing a second line.
// const BLANK = "\u00A0";

// // ---- styles --------------------------------------------------------------
// // NOTE: sizes below are deliberately compact (vs. the first draft) so the
// // whole certificate — header, 17 detail rows, certification block and
// // signatures — reliably fits on a single A4 page without react-pdf
// // auto-creating a second page. If you add more rows/fields later and it
// // spills over, shave a bit more off detailRow.marginBottom / fontSize
// // first, since that's the section with the most repeated vertical cost.
// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#EEF1F5",
//     padding: 22,
//     fontFamily: "Times-Roman",
//     fontSize: 9,
//   },
//   paper: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 18,
//     position: "relative",
//     overflow: "hidden",
//   },
//   content: {
//     flex: 1,
//     flexDirection: "column",
//     position: "relative",
//   },
//   spacer: {
//     flexGrow: 1,
//   },

//   // -------- decorative corners --------
//   cornerTopLeft: {
//     position: "absolute",
//     top: -40,
//     left: -40,
//     width: 100,
//     height: 100,
//     backgroundColor: CORNER_BLUE,
//     transform: "rotate(45deg)",
//   },
//   cornerTopRight: {
//     position: "absolute",
//     top: -46,
//     right: -46,
//     width: 118,
//     height: 118,
//     backgroundColor: GOLD,
//     opacity: 0.85,
//     transform: "rotate(45deg)",
//   },
//   cornerBottomLeft: {
//     position: "absolute",
//     bottom: -50,
//     left: -26,
//     width: 200,
//     height: 78,
//     backgroundColor: NAVY,
//     borderTopRightRadius: 90,
//   },
//   cornerBottomRight: {
//     position: "absolute",
//     bottom: -34,
//     right: -26,
//     width: 200,
//     height: 60,
//     backgroundColor: GOLD,
//     opacity: 0.9,
//     borderTopLeftRadius: 90,
//   },

//   // -------- header --------
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   logoWrap: {
//     width: 78,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoCircle: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerText: {
//     flex: 1,
//   },
//   schoolName: {
//     fontFamily: "Times-Bold",
//     fontSize: 19,
//     color: NAVY,
//     lineHeight: 1.05,
//   },
//   tagline: {
//     fontSize: 7.5,
//     letterSpacing: 1.5,
//     color: NAVY,
//     fontFamily: "Times-Bold",
//     marginTop: 2,
//   },
//   addressLine: {
//     fontSize: 7.5,
//     color: "#444444",
//     marginTop: 2,
//   },

//   // -------- TC no / admission no / date --------
//   metaRow: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },
//   metaLeft: {
//     flex: 1.4,
//   },
//   metaRight: {
//     flex: 2,
//   },
//   metaLabel: {
//     fontSize: 8.5,
//     fontFamily: "Times-Bold",
//     color: NAVY_DARK,
//     marginBottom: 1,
//   },
//   metaValue: {
//     fontFamily: "Times-Roman",
//     fontWeight: "normal",
//   },

//   // -------- ribbon title --------
//   ribbonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   ribbonLine: {
//     flex: 1,
//     borderBottomWidth: 2,
//     borderBottomColor: GOLD,
//   },
//   ribbonBadge: {
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 22,
//     marginHorizontal: 10,
//   },
//   ribbonText: {
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 13,
//     letterSpacing: 1.5,
//     textAlign: "center",
//   },

//   // -------- section bar --------
//   sectionBar: {
//     alignSelf: "flex-start",
//     backgroundColor: NAVY,
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 8.5,
//     letterSpacing: 0.4,
//     paddingVertical: 3.5,
//     paddingHorizontal: 11,
//     borderTopLeftRadius: 3,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 3,
//     borderBottomLeftRadius: 3,
//     marginBottom: 7,
//   },

//   // -------- detail rows --------
//   detailsRow: {
//     flexDirection: "row",
//   },
//   detailsColLeft: {
//     flex: 8.5,
//     paddingRight: 10,
//   },
//   detailsColRight: {
//     flex: 3.5,
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 6,
//   },
//   detailIndex: {
//     width: 13,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailLabel: {
//     width: 172,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailColon: {
//     width: 8,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailValueWrap: {
//     flex: 1,
//     borderBottomWidth: 0.75,
//     borderBottomColor: LINE_GREY,
//     paddingBottom: 1.5,
//   },
//   detailValueText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },

//   // -------- photo placeholder --------
//   photoBox: {
//     borderWidth: 1.3,
//     borderStyle: "dashed",
//     borderColor: LINE_GREY,
//     borderRadius: 7,
//     height: 96,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F7F9FC",
//   },
//   photoCaption: {
//     fontSize: 7.5,
//     color: "#7A8AA0",
//     textAlign: "center",
//     marginTop: 5,
//   },

//   // -------- certification --------
//   certWrap: {
//     marginTop: 8,
//   },
//   certBox: {
//     backgroundColor: LIGHT_BLUE_BG,
//     borderWidth: 1,
//     borderColor: LINE_GREY,
//     borderRadius: 5,
//     padding: 8,
//   },
//   certText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     lineHeight: 1.45,
//   },

//   // -------- signatures --------
//   signRow: {
//     flexDirection: "row",
//     marginTop: 16,
//     // The navy/gold decorative corner shapes intrude ~8-10pt past the
//     // card's padding at the bottom, so this margin keeps the signature
//     // row clear of them instead of sitting flush on the bottom edge.
//     marginBottom: 26,
//   },
//   signCol: {
//     flex: 1,
//     alignItems: "center",
//   },
//   signSpace: {
//     // Blank room to physically sign, above the underline.
//     height: 26,
//   },
//   signLine: {
//     borderBottomWidth: 1.3,
//     borderBottomColor: NAVY_DARK,
//     width: "80%",
//     marginBottom: 14,
//   },
//   signRole: {
//     fontFamily: "Times-Bold",
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     textAlign: "center",
//   },
//   signCaption: {
//     fontSize: 7.5,
//     color: NAVY_DARK,
//     marginTop: 2,
//     textAlign: "center",
//   },
//   photoBoxFilled: {
//     borderStyle: "solid",
//   },
//   photoImage: {
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//     borderRadius: 6,
//   },
//   logoImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 23,
//     objectFit: "cover",
//   },
// });

// // ---- small icon substitutes (react-pdf has no icon-font support) ------

// /** Simple graduation-cap glyph drawn with basic shapes */
// function SchoolGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" fill="#FFFFFF" />
//       <Path d="M5 10.18v3.64L12 17l7-3.18v-3.64L12 13.5 5 10.18z" fill="#FFFFFF" opacity={0.85} />
//     </Svg>
//   );
// }

// /** Simple camera glyph for the photo placeholder */
// function CameraGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Rect x={3} y={7} width={18} height={13} rx={2} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Path d="M9 7l1.5-2h3L15 7" fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Circle cx={12} cy={13.5} r={3.5} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//     </Svg>
//   );
// }

// // ---- reusable pieces ----------------------------------------------------

// function DetailRow({ index, label, children }) {
//   return (
//     <View style={styles.detailRow} wrap={false}>
//       <Text style={styles.detailIndex}>{index}.</Text>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <View style={styles.detailValueWrap}>{children}</View>
//     </View>
//   );
// }

// function SectionBar({ children }) {
//   return <Text style={styles.sectionBar}>{children}</Text>;
// }

// function SignatureBlock({ role }) {
//   return (
//     <View style={styles.signCol}>
//       <View style={styles.signSpace} />
//       <View style={styles.signLine} />
//       <Text style={styles.signRole}>{role}</Text>
//       <Text style={styles.signCaption}>Signature: ______________</Text>
//     </View>
//   );
// }
// function getCurrentDate() {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const year = today.getFullYear();
//   return `${day}-${month}-${year}`;
// }
// // ---- main component -------------------------------------------------------

// export default function TransferCertificate({ url, data, UserName }) {
//   const getValue = (value) =>
//     value === null || value === undefined || value === "" ? "" : value;
//   const IMAGE_BASE_URL = `${url}/uploads/Images/`;
//   const studentImageUrl = data?.StudentImage
//     ? `${IMAGE_BASE_URL}${data.StudentImage}`
//     : null;
//   const schoolLogoUrl = `${url}/uploads/Images/${data.CompanyLogo}`;
//   const fields = [
//     {
//       label: "Name of the Student",
//       type: "text",
//       value: getValue(data?.EmployeeName),
//     },
//     {
//       label: "Parent / Guardian's Name",
//       type: "text",
//       value: getValue(data?.FathersName),
//     },
//     // {
//     //   label: "Mother's Name",
//     //   type: "text",
//     //   value: getValue(data?.MothersName),
//     // },
//     {
//       label: "Date of Birth",
//       type: "date",
//       value: getValue(data?.DateOfBirth),
//     },
//     {
//       label: "Nationality",
//       type: "text",
//       value: getValue(data?.Nationality),
//     },
//     {
//       label: "Religion / Community",
//       type: "text",
//       value: getValue(data?.["Relegion / Community"]),
//     },
//     {
//       // Now mapped from the API's AdmissionDate field.
//       label: "Admission Date",
//       type: "date",
//       value: getValue(data?.AdmissionDate),
//     },
//     {
//       // Now mapped from the API's ClassLastStudied field.
//       label: "Class Last Studied",
//       type: "text",
//       value: getValue(data?.ClassLastStudied),
//     },
//     {
//       label: "Academic Year",
//       type: "text",
//       value: getValue(data?.AcademicYear),
//     },
//     // {
//     //   // Still not sent by the API — remains blank until backend adds it.
//     //   label: "Medium of Instruction",
//     //   type: "text",
//     //   value: "",
//     // },
//     {
//       label: "Whether Qualified for Promotion to the Next Class",
//       type: "yesno",
//       value: data?.QualifiedForPromotion === "Y" ? "Yes" : "No",
//     },
//     {
//       label: "Whether the Student Has Paid All Fees and Dues",
//       type: "yesno",
//       value: data?.NoDue === "Y" ? "Yes" : "No",
//     },
//     {
//       // Replaced "Total Working Days / Days Present" with the single
//       // AttendancePercent value the API actually sends (e.g. "0.4000%").
//       label: "Attendance Percentage",
//       type: "text",
//       value: getValue(data?.AttendancePercent),
//     },
//     {
//       label: "Date of Leaving the School",
//       type: "date",
//       value: getValue(data?.DateOfLeaving),
//     },
//     {
//       label: "Reason for Leaving",
//       type: "text",
//       value: getValue(data?.ReasonForLeaving),
//     },
//     {
//       label: "Conduct and Character",
//       type: "text",
//       value: getValue(data?.ConductAndCharacter),
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Date of Issue of Transfer Certificate",
//       type: "date",
//       value: getCurrentDate(),
//     },
//   ];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.paper} wrap={false}>
//           {/* decorative corner accents */}
//           <View style={styles.cornerTopLeft} />
//           <View style={styles.cornerTopRight} />
//           <View style={styles.cornerBottomLeft} />
//           <View style={styles.cornerBottomRight} />

//           <View style={styles.content}>
//             {/* ---------- Header ---------- */}
//             <View style={styles.headerRow}>
//               {/* <View style={styles.logoWrap}>
//                 <View style={styles.logoCircle}>
//                   <SchoolGlyph />
//                 </View>
//               </View> */}
//               <View style={styles.logoWrap}>
//                 <View style={styles.logoCircle}>
//                   {schoolLogoUrl ? (
//                     <Image style={styles.logoImage} src={schoolLogoUrl} />
//                   ) : (
//                     <SchoolGlyph />
//                   )}
//                 </View>
//               </View>
//               <View style={styles.headerText}>
//                 <Text style={styles.schoolName}>{data?.CompanyName}</Text>
//                 <Text style={styles.tagline}>LEARN  •  GROW  •  SUCCEED</Text>
//                 <Text style={styles.addressLine}>
//                   {data?.Address}
//                 </Text>
//                 <Text style={styles.addressLine}>
//                   {`Ph: ${data?.MobileNumber}  |  Email: ${data?.MailID}`}
//                 </Text>
//               </View>
//             </View>

//             {/* ---------- TC No / Admission No / Date ---------- */}
//             {/* <View style={styles.metaRow}>
//               <View style={styles.metaLeft}>
//                 <Text style={styles.metaLabel}>
//                   Transfer Certificate No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//               </View>
//               <View style={styles.metaRight}>
//                 <Text style={styles.metaLabel}>
//                   Admission No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//                 <Text style={styles.metaLabel}>
//                   Date : <Text style={styles.metaValue}>{getCurrentDate()}</Text>
//                 </Text>
//               </View>
//             </View> */}

//             {/* ---------- Ribbon title ---------- */}
//             <View style={styles.ribbonRow}>
//               <View style={styles.ribbonLine} />
//               <View style={styles.ribbonBadge}>
//                 <Text style={styles.ribbonText}>TRANSFER CERTIFICATE</Text>
//               </View>
//               <View style={styles.ribbonLine} />
//             </View>

//             {/* ---------- Student details ---------- */}
//             <SectionBar>STUDENT DETAILS</SectionBar>

//             <View style={styles.detailsRow}>
//               <View style={styles.detailsColLeft}>
//                 {fields.map((f, i) => (
//                   <DetailRow key={f.label} index={i + 1} label={f.label}>
//                     {/* Every branch below falls back to BLANK ("\u00A0")
//                         instead of a dashed placeholder string, because
//                         detailValueWrap already draws a border-bottom line
//                         for the reader to write on. Printing placeholder
//                         dashes/text on top of that border produced two
//                         visible lines whenever the API sent null/empty. */}
//                     <Text style={styles.detailValueText}>
//                       {f.value || BLANK}
//                     </Text>
//                   </DetailRow>
//                 ))}
//               </View>

//               {/* Photo placeholder */}
//               <View style={styles.detailsColRight}>
//                 <View
//                   style={
//                     studentImageUrl
//                       ? [styles.photoBox, styles.photoBoxFilled]
//                       : styles.photoBox
//                   }
//                 >
//                   {studentImageUrl ? (
//                     <Image style={styles.photoImage} src={studentImageUrl} />
//                   ) : (
//                     <>
//                       <CameraGlyph />
//                       <Text style={styles.photoCaption}>
//                         Student Photo{"\n"}(Optional)
//                       </Text>
//                     </>
//                   )}
//                 </View>
//               </View>
//               {/* <View style={styles.detailsColRight}>
//                 <View style={styles.photoBox}>
//                   <CameraGlyph />
//                   <Text style={styles.photoCaption}>
//                     Student Photo{"\n"}(Optional)
//                   </Text>
//                 </View>
//               </View> */}
//             </View>

//             {/* ---------- Certification ---------- */}
//             <View style={styles.certWrap} wrap={false}>
//               <SectionBar>CERTIFICATION</SectionBar>
//               <View style={styles.certBox}>
//                 <Text style={styles.certText}>
//                   Certified that the above-mentioned student was a bonafide
//                   student of this school and has been relieved from the
//                   school on the date mentioned above.
//                   {"\n"}
//                   We wish the student all the best for future studies and
//                   career.
//                 </Text>
//               </View>
//             </View>

//             {/* Flexible spacer: absorbs the leftover page height here so the
//                 white card fills the whole A4 page instead of leaving a
//                 grey gap below it, and the signature row sits near the
//                 bottom like a real certificate. */}
//             <View style={styles.spacer} />

//             {/* ---------- Signatures ---------- */}
//             <View style={styles.signRow} wrap={false}>
//               <SignatureBlock role="Class Teacher" />
//               <SignatureBlock role="School Office" />
//               <SignatureBlock role="Principal / Head of Institution" />
//             </View>
//           </View>
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
//   StyleSheet,
//   Svg,
//   Path,
//   Rect,
//   Circle,
// } from "@react-pdf/renderer";

// // ---- design tokens (same palette as the MUI version) -----------------
// const NAVY = "#2f6483";
// const NAVY_DARK = "#122A56";
// const GOLD = "#D9A441";
// const LIGHT_BLUE_BG = "#EAF1FB";
// const LINE_GREY = "#9FB3CC";
// const CORNER_BLUE = "#BFD6F5";

// // ---- styles --------------------------------------------------------------
// // NOTE: sizes below are deliberately compact (vs. the first draft) so the
// // whole certificate — header, 18 detail rows, certification block and
// // signatures — reliably fits on a single A4 page without react-pdf
// // auto-creating a second page. If you add more rows/fields later and it
// // spills over, shave a bit more off detailRow.marginBottom / fontSize
// // first, since that's the section with the most repeated vertical cost.
// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#EEF1F5",
//     padding: 22,
//     fontFamily: "Times-Roman",
//     fontSize: 9,
//   },
//   paper: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 18,
//     position: "relative",
//     overflow: "hidden",
//   },
//   content: {
//     flex: 1,
//     flexDirection: "column",
//     position: "relative",
//   },
//   spacer: {
//     flexGrow: 1,
//   },

//   // -------- decorative corners --------
//   cornerTopLeft: {
//     position: "absolute",
//     top: -40,
//     left: -40,
//     width: 100,
//     height: 100,
//     backgroundColor: CORNER_BLUE,
//     transform: "rotate(45deg)",
//   },
//   cornerTopRight: {
//     position: "absolute",
//     top: -46,
//     right: -46,
//     width: 118,
//     height: 118,
//     backgroundColor: GOLD,
//     opacity: 0.85,
//     transform: "rotate(45deg)",
//   },
//   cornerBottomLeft: {
//     position: "absolute",
//     bottom: -50,
//     left: -26,
//     width: 200,
//     height: 78,
//     backgroundColor: NAVY,
//     borderTopRightRadius: 90,
//   },
//   cornerBottomRight: {
//     position: "absolute",
//     bottom: -34,
//     right: -26,
//     width: 200,
//     height: 60,
//     backgroundColor: GOLD,
//     opacity: 0.9,
//     borderTopLeftRadius: 90,
//   },

//   // -------- header --------
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   logoWrap: {
//     width: 78,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoCircle: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerText: {
//     flex: 1,
//   },
//   schoolName: {
//     fontFamily: "Times-Bold",
//     fontSize: 19,
//     color: NAVY,
//     lineHeight: 1.05,
//   },
//   tagline: {
//     fontSize: 7.5,
//     letterSpacing: 1.5,
//     color: NAVY,
//     fontFamily: "Times-Bold",
//     marginTop: 2,
//   },
//   addressLine: {
//     fontSize: 7.5,
//     color: "#444444",
//     marginTop: 2,
//   },

//   // -------- TC no / admission no / date --------
//   metaRow: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },
//   metaLeft: {
//     flex: 1.4,
//   },
//   metaRight: {
//     flex: 1,
//   },
//   metaLabel: {
//     fontSize: 8.5,
//     fontFamily: "Times-Bold",
//     color: NAVY_DARK,
//     marginBottom: 1,
//   },
//   metaValue: {
//     fontFamily: "Times-Roman",
//     fontWeight: "normal",
//   },

//   // -------- ribbon title --------
//   ribbonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   ribbonLine: {
//     flex: 1,
//     borderBottomWidth: 2,
//     borderBottomColor: GOLD,
//   },
//   ribbonBadge: {
//     backgroundColor: NAVY,
//     borderWidth: 2,
//     borderColor: GOLD,
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 22,
//     marginHorizontal: 10,
//   },
//   ribbonText: {
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 13,
//     letterSpacing: 1.5,
//     textAlign: "center",
//   },

//   // -------- section bar --------
//   sectionBar: {
//     alignSelf: "flex-start",
//     backgroundColor: NAVY,
//     color: "#FFFFFF",
//     fontFamily: "Times-Bold",
//     fontSize: 8.5,
//     letterSpacing: 0.4,
//     paddingVertical: 3.5,
//     paddingHorizontal: 11,
//     borderTopLeftRadius: 3,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 3,
//     borderBottomLeftRadius: 3,
//     marginBottom: 7,
//   },

//   // -------- detail rows --------
//   detailsRow: {
//     flexDirection: "row",
//   },
//   detailsColLeft: {
//     flex: 8.5,
//     paddingRight: 10,
//   },
//   detailsColRight: {
//     flex: 3.5,
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 4,
//   },
//   detailIndex: {
//     width: 13,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailLabel: {
//     width: 172,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailColon: {
//     width: 8,
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },
//   detailValueWrap: {
//     flex: 1,
//     borderBottomWidth: 0.75,
//     borderBottomColor: LINE_GREY,
//     paddingBottom: 1.5,
//   },
//   detailValueText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//   },

//   // attendance inline row
//   attendanceRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     flexWrap: "wrap",
//   },
//   attendanceLabel: {
//     fontSize: 8,
//     color: NAVY_DARK,
//     marginRight: 3,
//   },
//   attendanceBlank: {
//     width: 46,
//     borderBottomWidth: 0.75,
//     borderBottomColor: LINE_GREY,
//     marginRight: 10,
//   },

//   // -------- photo placeholder --------
//   photoBox: {
//     borderWidth: 1.3,
//     borderStyle: "dashed",
//     borderColor: LINE_GREY,
//     borderRadius: 7,
//     height: 96,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F7F9FC",
//   },
//   photoCaption: {
//     fontSize: 7.5,
//     color: "#7A8AA0",
//     textAlign: "center",
//     marginTop: 5,
//   },

//   // -------- certification --------
//   certWrap: {
//     marginTop: 8,
//   },
//   certBox: {
//     backgroundColor: LIGHT_BLUE_BG,
//     borderWidth: 1,
//     borderColor: LINE_GREY,
//     borderRadius: 5,
//     padding: 8,
//   },
//   certText: {
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     lineHeight: 1.45,
//   },

//   // -------- signatures --------
//   signRow: {
//     flexDirection: "row",
//     marginTop: 16,
//     // The navy/gold decorative corner shapes intrude ~8-10pt past the
//     // card's padding at the bottom, so this margin keeps the signature
//     // row clear of them instead of sitting flush on the bottom edge.
//     marginBottom: 26,
//   },
//   signCol: {
//     flex: 1,
//     alignItems: "center",
//   },
//   signSpace: {
//     // Blank room to physically sign, above the underline.
//     height: 26,
//   },
//   signLine: {
//     borderBottomWidth: 1.3,
//     borderBottomColor: NAVY_DARK,
//     width: "80%",
//     marginBottom: 14,
//   },
//   signRole: {
//     fontFamily: "Times-Bold",
//     fontSize: 8.3,
//     color: NAVY_DARK,
//     textAlign: "center",
//   },
//   signCaption: {
//     fontSize: 7.5,
//     color: NAVY_DARK,
//     marginTop: 2,
//     textAlign: "center",
//   },
// });

// // ---- small icon substitutes (react-pdf has no icon-font support) ------

// /** Simple graduation-cap glyph drawn with basic shapes */
// function SchoolGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" fill="#FFFFFF" />
//       <Path d="M5 10.18v3.64L12 17l7-3.18v-3.64L12 13.5 5 10.18z" fill="#FFFFFF" opacity={0.85} />
//     </Svg>
//   );
// }

// /** Simple camera glyph for the photo placeholder */
// function CameraGlyph() {
//   return (
//     <Svg width={24} height={24} viewBox="0 0 24 24">
//       <Rect x={3} y={7} width={18} height={13} rx={2} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Path d="M9 7l1.5-2h3L15 7" fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//       <Circle cx={12} cy={13.5} r={3.5} fill="none" stroke={LINE_GREY} strokeWidth={1.5} />
//     </Svg>
//   );
// }

// // ---- reusable pieces ----------------------------------------------------

// function DetailRow({ index, label, children }) {
//   return (
//     <View style={styles.detailRow} wrap={false}>
//       <Text style={styles.detailIndex}>{index}.</Text>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <View style={styles.detailValueWrap}>{children}</View>
//     </View>
//   );
// }

// function SectionBar({ children }) {
//   return <Text style={styles.sectionBar}>{children}</Text>;
// }

// function SignatureBlock({ role }) {
//   return (
//     <View style={styles.signCol}>
//       <View style={styles.signSpace} />
//       <View style={styles.signLine} />
//       <Text style={styles.signRole}>{role}</Text>
//       <Text style={styles.signCaption}>Signature: ______________</Text>
//     </View>
//   );
// }

// // ---- main component -------------------------------------------------------

// export default function TransferCertificate({ data, UserName }) {
//   const getValue = (value) =>
//     value === null || value === undefined || value === "" ? "" : value;

//   const fields = [
//     {
//       label: "Name of the Student",
//       type: "text",
//       value: getValue(data?.EmployeeName),
//     },
//     {
//       label: "Father's / Guardian's Name",
//       type: "text",
//       value: getValue(data?.FathersName),
//     },
//     {
//       label: "Mother's Name",
//       type: "text",
//       value: getValue(data?.MothersName),
//     },
//     {
//       label: "Date of Birth",
//       type: "date",
//       value: getValue(data?.DateOfBirth),
//     },
//     // {
//     //   // Not sent by the API today — always blank until backend adds it.
//     //   label: "Date of Birth in Words",
//     //   type: "text",
//     //   value: "",
//     // },
//     {
//       label: "Nationality",
//       type: "text",
//       value: getValue(data?.Nationality),
//     },
//     {
//       label: "Religion / Community",
//       type: "text",
//       value: getValue(data?.["Relegion / Community"]),
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Admission Date",
//       type: "date",
//       value: "",
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Class Last Studied",
//       type: "text",
//       value: "",
//     },
//     {
//       label: "Academic Year",
//       type: "text",
//       value: getValue(data?.AcademicYear),
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Medium of Instruction",
//       type: "text",
//       value: "",
//     },
//     {
//       label: "Whether Qualified for Promotion to the Next Class",
//       type: "yesno",
//       value: data?.QualifiedForPromotion === "Y" ? "Yes" : "No",
//     },
//     {
//       label: "Whether the Student Has Paid All Fees and Dues",
//       type: "yesno",
//       value: data?.NoDue === "Y" ? "Yes" : "No",
//     },
//     {
//       // Total Working Days / Days Present are not sent by the API today.
//       label: "Attendance",
//       type: "attendance",
//     },
//     {
//       label: "Date of Leaving the School",
//       type: "date",
//       value: getValue(data?.DateOfLeaving),
//     },
//     {
//       label: "Reason for Leaving",
//       type: "text",
//       value: getValue(data?.ReasonForLeaving),
//     },
//     {
//       label: "Conduct and Character",
//       type: "text",
//       value: getValue(data?.ConductAndCharacter),
//     },
//     {
//       // Not sent by the API today — always blank until backend adds it.
//       label: "Date of Issue of Transfer Certificate",
//       type: "date",
//       value: "",
//     },
//   ];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.paper} wrap={false}>
//           {/* decorative corner accents */}
//           <View style={styles.cornerTopLeft} />
//           <View style={styles.cornerTopRight} />
//           <View style={styles.cornerBottomLeft} />
//           <View style={styles.cornerBottomRight} />

//           <View style={styles.content}>
//             {/* ---------- Header ---------- */}
//             <View style={styles.headerRow}>
//               <View style={styles.logoWrap}>
//                 <View style={styles.logoCircle}>
//                   <SchoolGlyph />
//                 </View>
//               </View>
//               <View style={styles.headerText}>
//                 <Text style={styles.schoolName}>ABC PUBLIC SCHOOL</Text>
//                 <Text style={styles.tagline}>LEARN  •  GROW  •  SUCCEED</Text>
//                 <Text style={styles.addressLine}>
//                   123 Green Park Road, Chennai - 600 001
//                 </Text>
//                 <Text style={styles.addressLine}>
//                   Ph: 044 - 1234 5678  |  Email: info@abcschool.edu.in  |  www.abcschool.edu.in
//                 </Text>
//               </View>
//             </View>

//             {/* ---------- TC No / Admission No / Date ---------- */}
//             <View style={styles.metaRow}>
//               <View style={styles.metaLeft}>
//                 <Text style={styles.metaLabel}>
//                   Transfer Certificate No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//               </View>
//               <View style={styles.metaRight}>
//                 <Text style={styles.metaLabel}>
//                   Admission No. :{" "}
//                   <Text style={styles.metaValue}>______________</Text>
//                 </Text>
//                 <Text style={styles.metaLabel}>
//                   Date :{" "}
//                   <Text style={styles.metaValue}>___ / ___ / ______</Text>
//                 </Text>
//               </View>
//             </View>

//             {/* ---------- Ribbon title ---------- */}
//             <View style={styles.ribbonRow}>
//               <View style={styles.ribbonLine} />
//               <View style={styles.ribbonBadge}>
//                 <Text style={styles.ribbonText}>TRANSFER CERTIFICATE</Text>
//               </View>
//               <View style={styles.ribbonLine} />
//             </View>

//             {/* ---------- Student details ---------- */}
//             <SectionBar>STUDENT DETAILS</SectionBar>

//             <View style={styles.detailsRow}>
//               <View style={styles.detailsColLeft}>
//                 {fields.map((f, i) => (
//                   <DetailRow key={f.label} index={i + 1} label={f.label}>
//                     {f.type === "yesno" ? (
//                       <Text style={styles.detailValueText}>
//                         {f.value || "Yes / No"}
//                       </Text>
//                     ) : f.type === "attendance" ? (
//                       <View style={styles.attendanceRow}>
//                         <Text style={styles.attendanceLabel}>
//                           Total Working Days:
//                         </Text>
//                         <View style={styles.attendanceBlank} />
//                         <Text style={styles.attendanceLabel}>
//                           Days Present:
//                         </Text>
//                         <View style={styles.attendanceBlank} />
//                       </View>
//                     ) : f.type === "date" ? (
//                       <Text style={styles.detailValueText}>
//                         {f.value || "___ / ___ / ______"}
//                       </Text>
//                     ) : (
//                       // Plain text field — this branch was accidentally
//                       // returning `null` before, which is why Name,
//                       // Father's Name, Nationality, Religion/Community,
//                       // Academic Year etc. were showing blank even though
//                       // the API had values for them. Restored here.
//                       <Text style={styles.detailValueText}>
//                         {f.value || "____________________________"}
//                       </Text>
//                     )}
//                   </DetailRow>
//                 ))}
//               </View>

//               {/* Photo placeholder */}
//               <View style={styles.detailsColRight}>
//                 <View style={styles.photoBox}>
//                   <CameraGlyph />
//                   <Text style={styles.photoCaption}>
//                     Student Photo{"\n"}(Optional)
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* ---------- Certification ---------- */}
//             <View style={styles.certWrap} wrap={false}>
//               <SectionBar>CERTIFICATION</SectionBar>
//               <View style={styles.certBox}>
//                 <Text style={styles.certText}>
//                   Certified that the above-mentioned student was a bonafide
//                   student of this school and has been relieved from the
//                   school on the date mentioned above.
//                   {"\n"}
//                   We wish the student all the best for future studies and
//                   career.
//                 </Text>
//               </View>
//             </View>

//             {/* Flexible spacer: absorbs the leftover page height here so the
//                 white card fills the whole A4 page instead of leaving a
//                 grey gap below it, and the signature row sits near the
//                 bottom like a real certificate. */}
//             <View style={styles.spacer} />

//             {/* ---------- Signatures ---------- */}
//             <View style={styles.signRow} wrap={false}>
//               <SignatureBlock role="Class Teacher" />
//               <SignatureBlock role="School Office" />
//               <SignatureBlock role="Principal / Head of Institution" />
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// }
