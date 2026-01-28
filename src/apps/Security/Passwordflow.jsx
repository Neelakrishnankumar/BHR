
// import React, { useState } from "react";
// import BackOfficelogoV2 from "../../assets/img/boswrkflow.PNG";
// import BackOfficelogoV1 from "../../assets/img/Back office Configuration.jpg";
// import termsData from "./Terms.json";
// import {
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const ChangeyourPassword_1 = () => {
//   const [agreed, setAgreed] = useState(false);
//   const navigate = useNavigate();
//   const bootstrapSection = termsData.sections.find(
//     (section) =>
//       section.heading === "Back Office System Configuration – Bootstrap"
//   );

//   const otherSections = termsData.sections.filter(
//     (section) =>
//       section.heading !== "Back Office System Configuration – Bootstrap"
//   );

//   return (

//     <Box
//       sx={{
//         height: "90vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* 🔹 Main Content */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//         }}
//       >
//         {/* LEFT SECTION – Logo & Welcome */}
//         {/* LEFT SECTION – Bootstrap Text (from JSON) */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             padding: 4,
//             borderRight: "1px solid #e0e0e0",
//             overflowY: "auto",
//           }}
//         >
//           {/* Page Title */}
//           <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
//             Welcome to Beyondexs Agile Task Manager
//           </Typography>

//           {/* 🔹 Back Office Configuration Heading */}
//           <Typography
//             variant="subtitle1"
//             fontWeight="bold"
//             mb={1.5}
//             sx={{ textDecoration: "underline" }}
//           >
//             {bootstrapSection.heading}
//           </Typography>

//           {bootstrapSection.points.map((point, index) => {
//             // PURPOSE (always first item)
//             if (index === 0) {
//               return (
//                 <Box key={index} sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     Purpose
//                   </Typography>
//                   <Typography variant="body2" sx={{ ml: 2 }}>
//                     {point.text}
//                   </Typography>
//                 </Box>
//               );
//             }

//             // OTHER CONFIGURATION ITEMS
//             const fullText = point.text
//               ? point.text
//               : point.textParts.map((p) => p.text).join("");

//             const [title, ...descParts] = fullText.split(":");
//             const description = descParts.join(":").trim();

//             return (
//               <Box key={index} sx={{ mb: 1.5 }}>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {index}. {title}
//                 </Typography>

//                 <Typography variant="body2" sx={{ ml: 2 }}>
//                   {point.textParts ? (
//                     point.textParts.map((part, idx) => (
//                       <span
//                         key={idx}
//                         style={{ fontWeight: part.bold ? 700 : 400 }}
//                       >
//                         {part.text}
//                       </span>
//                     ))
//                   ) : (
//                     description
//                   )}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>


//         {/* RIGHT SECTION – Terms & Conditions */}
//         <Box
//           sx={{
//             flex: 1,
//             padding: 4,
//             overflowY: "auto",
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" mb={1}>
//             {termsData.title}
//           </Typography>

//           {otherSections.map((section, index) => (
//             <Box key={index} mb={2}>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 {section.heading}
//               </Typography>

//               {section.points.map((point, i) => (
//                 <Typography key={i} variant="body2" sx={{ ml: 2, mt: 0.5 }}>
//                   •{" "}
//                   {point.textParts
//                     ? point.textParts.map((part, idx) => (
//                       <span
//                         key={idx}
//                         style={{ fontWeight: part.bold ? 700 : 400 }}
//                       >
//                         {part.text}
//                       </span>
//                     ))
//                     : point.text}
//                 </Typography>
//               ))}
//             </Box>
//           ))}

//           <FormControlLabel
//             sx={{ mt: -2 }}
//             control={
//               <Checkbox
//                 checked={agreed}
//                 onChange={(e) => setAgreed(e.target.checked)}
//               />
//             }
//             label="I agree to the Terms & Conditions"
//           />
//         </Box>

//       </Box>

//       {/* 🔹 Footer Buttons (Closer to checkbox) */}
//       <Box
//         display="flex"
//         gap={2}
//         justifyContent="flex-end"
//         alignItems="center"
//         px={3}
//         py={0}
//         mt={-3}  // ⬅ reduced padding
//       >
//         <Button
//           variant="contained"
//           color="success"
//           disabled={!agreed}
//           onClick={() => navigate("/Apps/ChangeyourPassword_2")}
//         >
//           Agree
//         </Button>

//         <Button
//           variant="contained"
//           color="warning"
//           onClick={() => navigate(-1)}
//         >
//           Cancel
//         </Button>
//       </Box>
//     </Box>

//   );
// };

// export default ChangeyourPassword_1;
import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import termsData from "./Terms.json";

const ChangeyourPassword_1 = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  // Bootstrap section
  const bootstrapSection = termsData.sections.find(
    (section) =>
      section.heading === "Back Office System Configuration – Bootstrap"
  );

  // Other sections
  const otherSections = termsData.sections.filter(
    (section) =>
      section.heading !== "Back Office System Configuration – Bootstrap"
  );

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, display: "flex" }}>
        {/* LEFT SECTION */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 4,
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            textAlign="center"
          >
            Welcome to Beyondexs Agile Task Manager
          </Typography>

          {/* Back Office Configuration Heading */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={1.5}
            sx={{ textDecoration: "underline" }}
          >
            {bootstrapSection?.heading}
          </Typography>

          {bootstrapSection?.points.map((point, index) => {
            // PURPOSE (first item)
            if (index === 0) {
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Purpose
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {point.text}
                  </Typography>
                </Box>
              );
            }

            // Other items
            const fullText = point.text
              ? point.text
              : point.textParts.map((p) => p.text).join("");

            const [title, ...descParts] = fullText.split(":");
            const description = descParts.join(":").trim();

            return (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {index}. {title}
                </Typography>

                <Typography variant="body2" sx={{ ml: 2 }}>
                  {point.textParts ? (
                    point.textParts.map((part, idx) => (
                      <span
                        key={idx}
                        style={{ fontWeight: part.bold ? 700 : 400 }}
                      >
                        {part.text}
                      </span>
                    ))
                  ) : (
                    description
                  )}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* RIGHT SECTION */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 4,
            minWidth: 0, // 🔑 prevents extra column
          }}
        >
          {/* Scrollable Terms */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              pr: 1,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={1}>
              {termsData.title}
            </Typography>

            {otherSections.map((section, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {section.heading}
                </Typography>

                {section.points.map((point, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{ ml: 2, mt: 0.5 }}
                  >
                    •{" "}
                    {point.textParts
                      ? point.textParts.map((part, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontWeight: part.bold ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))
                      : point.text}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>

          {/* RIGHT SECTION FOOTER */}
          <Box
            sx={{
              borderTop: "1px solid #e0e0e0",
              pt: 1,
              mt: 1,
              flexShrink: 0, // 🔑 keeps footer in same column
            }}
          >
            <FormControlLabel
             sx={{
                "& .MuiFormControlLabel-label": {
                  fontWeight: 700, // ✅ bold label
                },
              }}
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              }
              label="I agree to the Terms & Conditions"
            />

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mt={1}
            >
              <Button
                variant="contained"
                color="success"
                disabled={!agreed}
                onClick={() =>
                  navigate("/Apps/ChangeyourPassword_2")
                }
              >
                Agree
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeyourPassword_1;

