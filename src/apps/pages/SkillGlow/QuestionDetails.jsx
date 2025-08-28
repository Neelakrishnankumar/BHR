// QuestionDetails.jsx
import {
  Box,
  Typography,
  TextField,
  Radio,
  FormControlLabel,
  Rating,
  Card,
  Button,
  Breadcrumbs,
  Stack,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { formGap } from "../../../ui-components/utils";

const QuestionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuestion = location.state?.question;

  const qGroup = location.state?.qGroup;

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };
  const handleClick2 = () => {
    navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory");
  };

  const fnLogOut = (props) => {
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }

    //       return
    //  }
    Swal.fire({
      title: `Do you want ${props}?`,
      // text:data.payload.Msg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") {
          navigate("/");
        }
        if (props === "Close") {
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  if (!selectedQuestion) {
    return <Typography>No question selected</Typography>;
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      onClick={handleClick}
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
    >
      List Of Skills
    </Link>,
    <Link
      underline="hover"
      key="1"
      onClick={handleClick2}
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
    >
      List Of Question Group
    </Link>,
    <Link
      underline="hover"
      key="2"
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
      onClick={() =>
        navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList")
      }
    >
      List Of Questions
    </Link>,
    <Link
      underline="none"
      key="2"
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
    >
      Question Details
    </Link>,
  ];
  return (
    <>
      {/* BREADCRUMBS */}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => navigate("/Apps/SkillGlow/CategoryMain")}
                >
            List Of Category (CAT01)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => navigate("/Apps/SkillGlow/SkillGlowList")}
                >
            List Of Assessment (Quality Assurance)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() =>
                    navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory")
                  }
                >
                 List Of Question Groups (QG001)

                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() =>
                    navigate(
                      "/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList",
                      { state: { qGroup } } // pass it back
                    )
                  }
                >
                  List Of Questions (1 of 4)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Expected Answer
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            <Tooltip title="Close">
              <IconButton onClick={() => fnLogOut("Close")} color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="error" onClick={() => fnLogOut("Logout")}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          p: 4,
          height: "100vh",
        }}
      >
        <Paper sx={{ padding: "20px" }}>
          {/* <Typography variant="h3" gutterBottom>
            Question Details
          </Typography> */}
          <Typography variant="h3" gutterBottom>
           Expected Answer
          </Typography>
          <Typography variant="h6" gutterBottom>
            Question <b> - {selectedQuestion.name}</b>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Question Type<b> - {selectedQuestion.qtype}</b>
          </Typography>

          {/* Table-style header */}
          {/* <Box sx={{ display: "flex", my: 2, fontWeight: "bold", gap: "10px" }}>
            <Box >S.no</Box>
            <Box sx={{flex:1}}>Options</Box>
            <Box>Mark</Box>
            
          </Box> */}
          {/* Table-style header */}
          {selectedQuestion.qtype === "Text" ||
          selectedQuestion.qtype === "Number" ? (
            <Box
              sx={{ display: "flex", my: 2, fontWeight: "bold", gap: "10px" }}
            >
              <Box sx={{ flex: 1 }}>Expected Answer</Box>
              <Box sx={{ width:"155px" }}>Marks</Box>
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", my: 2, fontWeight: "bold", gap: "10px" }}
            >
              <Box sx={{ width: "40px", textAlign: "left" }}>S.no</Box>
              <Box sx={{ flex: 1 }}>Option</Box>
              <Box sx={{ width: "155px" }}>Marks</Box>
            </Box>
          )}

          {selectedQuestion.qtype === "1 Of 4" &&
            ["A", "B", "C", "D"].map((label, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={label}
                    control={<Radio />}
                    label={`Option ${label}`}
                  />
                </Box> */}
                {/* Number label */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{idx + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}

          {selectedQuestion.qtype === "Any Of 4" &&
            Array.from({ length: 4 }).map((_, i) => (
              <Box
                key={i}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={`Option ${i + 1}`}
                    control={<Radio />}
                    label={`Option ${i + 1}`}
                  />
                </Box> */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{i + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}
          {selectedQuestion.qtype === "10 Rates" &&
            Array.from({ length: 10 }).map((_, i) => (
              <Box
                key={i}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={`Option ${i + 1}`}
                    control={<Radio />}
                    label={`Option ${i + 1}`}
                  />
                </Box> */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{i + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}
          {selectedQuestion.qtype === "5 Rates" &&
            Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={`Option ${i + 1}`}
                    control={<Radio />}
                    label={`Option ${i + 1}`}
                  />
                </Box> */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{i + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}

          {selectedQuestion.qtype === "True / False" &&
            ["True", "False"].map((label, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={label}
                    control={<Radio />}
                    label={label}
                  />
                </Box> */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{idx + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}
          {selectedQuestion.qtype === "Yes/No" &&
            ["Yes", "No"].map((label, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}
              >
                {/* <Box sx={{ flex: 1 }}>
                  <FormControlLabel
                    value={label}
                    control={<Radio />}
                    label={label}
                  />
                </Box> */}
                <Box sx={{ width: "40px", textAlign: "center" }}>
                  <Typography variant="body1">{idx + 1}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Option"
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: "155px" }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter Marks"
                    fullWidth
                  />
                </Box>
              </Box>
            ))}

          {selectedQuestion.qtype === "Rating" && (
            <Box sx={{ display: "flex", mb: 1 }}>
              {/* <Box sx={{ flex: 1 }}>
                <Rating name="rating" size="large" />
              </Box> */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter Rating"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter mark"
                  fullWidth
                />
              </Box>
            </Box>
          )}

          {(selectedQuestion.qtype === "Text" ||
            selectedQuestion.qtype === "Number") && (
            <Box sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}>
              {/* Expected Answer field */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter Expected Answer"
                  fullWidth
                />
              </Box>

              {/* Marks field */}
              <Box sx={{ width:"155px" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter Marks"
                  fullWidth
                />
              </Box>
            </Box>
          )}

          {/* BUTTONS */}
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={2}
            sx={{ padding: "8px 0px", gap:"18px" }}
          >
            <Button type="submit" variant="contained" color="secondary">
              Save
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() =>
                navigate(
                  "/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList",
                  { state: { qGroup } } // pass it back
                )
              }
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default QuestionDetails;
