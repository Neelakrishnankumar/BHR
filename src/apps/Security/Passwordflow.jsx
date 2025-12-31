import React, { useState } from "react";
import BackOfficelogoV1 from "../../assets/img/boswrkflow.PNG";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ChangeyourPassword_1 = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    // <Box
    //   sx={{
    //     height: "100vh",
    //     position: "relative",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //     marginTop: "-75px",
    //   }}
    // >
    <Box
      sx={{
        height: "90vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden", // ✅ important
      }}
    >
      <img
        src={BackOfficelogoV1}
        alt="Logo"
        style={{
          width: "300px",
          height: "auto",
          objectFit: "contain",
        }}
      />

      {/* <Box
        sx={{
          position: "absolute",
          bottom: 75,
          width: "100%",
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      > */}
      <Box
        sx={{
          position: "absolute",
          bottom: 75,
          left: 0,
          right: 0,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
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
        />
        <Box gap={2} display="flex">
          <Button
            variant="contained"
            color="success"
            disabled={!agreed}
            onClick={() => {
              // navigate("/ChangeyourPassword_3")
              navigate("/ChangeyourPassword_2")
            }
            }
          >
            Agree
          </Button>
          <Button
            color={"warning"}
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeyourPassword_1;
//         