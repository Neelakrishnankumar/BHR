// import React, { useState } from "react";
// import BackOfficelogoV1 from "../../assets/img/boswrkflow.PNG";
// import {
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// const ChangeyourPassword_1 = () => {
//   const [agreed, setAgreed] = useState(false);
//   const navigate = useNavigate();

//   return (

//     <Box
//       sx={{
//         height: "90vh",
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         overflow: "hidden", // ✅ important
//       }}
//     >
//       <img
//         src={BackOfficelogoV1}
//         alt="Logo"
//         style={{
//           width: "300px",
//           height: "auto",
//           objectFit: "contain",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 75,
//           left: 0,
//           right: 0,
//           px: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginTop: "10px",
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={agreed}
//               onChange={(e) => setAgreed(e.target.checked)}
//             />
//           }
//           label="I agree to Terms & Conditions"
//         />
//         <Box gap={2} display="flex">
//           <Button
//             variant="contained"
//             color="success"
//             disabled={!agreed}
//             onClick={() => {
//               // navigate("/ChangeyourPassword_3")
//               navigate("/ChangeyourPassword_2")
//             }
//             }
//           >
//             Agree
//           </Button>
//           <Button
//             color={"warning"}
//             variant="contained"
//             onClick={() => {
//               navigate(-1);
//             }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChangeyourPassword_1;


import React, { useState } from "react";
import BackOfficelogoV1 from "../../assets/img/boswrkflow.PNG";
import termsData from "./Terms.json";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChangeyourPassword_1 = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔹 Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
        }}
      >
        {/* LEFT SECTION – Flow Diagram */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <img
            src={BackOfficelogoV1}
            alt="Flow Diagram"
            style={{
              width: "80%",
              maxWidth: "350px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* RIGHT SECTION – Terms & Conditions */}
        <Box
          sx={{
            flex: 1,
            padding: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {termsData.title}
          </Typography>

          {/* {termsData.sections.map((section, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {section.heading}
              </Typography>

             
              {section.points.map((point, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{ ml: 2, mt: 0.5, fontWeight: point.bold ? "bold" : "normal" }}
                >
                  • {point.text}
                </Typography>
              ))}

            </Box>
          ))} */}
          {termsData.sections.map((section, index) => (
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
                        style={{ fontWeight: part.bold ? 700 : 400,  }}
                      >
                        {part.text}
                      </span>
                    ))
                    : (
                      <span style={{ fontWeight: point.bold ? 700 : 400 }}>
                        {point.text}
                      </span>
                    )}
                </Typography>
              ))}
            </Box>
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            }
            label="I Agree to Terms & Conditions"
          />
        </Box>
      </Box>

      {/* 🔹 Bottom Actions */}
      {/* <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          }
          label="I agree to Terms & Conditions"
        /> */}

      <Box display="flex" gap={2}
        justifyContent="flex-end"
        alignItems="center"
        padding={2}
      >
        <Button
          variant="contained"
          color="success"
          disabled={!agreed}
          onClick={() => navigate("/Apps/ChangeyourPassword_2")}
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
      {/* </Box> */}
    </Box>
  );
};

export default ChangeyourPassword_1;
