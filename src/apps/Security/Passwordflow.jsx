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
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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

      <Box
        sx={{
          position: "absolute",
          bottom: 75,
          width: "100%",
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
        <Button
          variant="contained"
          color="primary"
          disabled={!agreed}
            onClick={() => {
                navigate("/ChangeyourPassword_2")
            }
        }
        >
          Agree
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeyourPassword_1;
//         