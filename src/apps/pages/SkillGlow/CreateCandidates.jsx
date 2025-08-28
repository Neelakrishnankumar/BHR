import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { formGap } from "../../../ui-components/utils";

const CreateCandidates = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };
  const handleClick2 = () => {
    navigate("/Apps/SkillGlow/SkillGlowList/CandidateList");
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
  //   FOR DROPDWON
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    candidate: "",
    targetScore: "0",
    targetAttempt: "0",
    //cutOff: "",
    expiryDate: null,
    sortOrder: "",
    disable: false,
  };

  const validationSchema = Yup.object({
    candidate: Yup.string().required("Please Enter Candidate Here"),
    expiryDate: Yup.string().required("Choose a date"),
    sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
    targetScore: Yup.number()
      .min(0, "No negative numbers")
      .nullable()
      .required("Please choose a Score"),
    targetAttempt: Yup.number()
      .min(0, "No negative numbers")
      .nullable()
      .required("Please choose No.Of Attempts"),
    // cutOff: Yup.number()
    //   .min(0, "No negative numbers")
    //   .nullable()
    //   .required("Please choose Cut Off Cut (In Minutes)"),
    disable: Yup.boolean(),
  });
  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
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
                    onClick={() =>
                      navigate(
                        "/Apps/SkillGlow/Assessment/Schedule/EmployeeSchedule"
                      )
                    }
                  >
                    List Of Employees (EMP01)
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate("/Apps/SkillGlow/CandidateMain")}
                  >
                    List Of Assessment Categories (CAT01)
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate("/Apps/SkillGlow/SkillGlowList/CandidateList")}
                  >
                    List Of Schedule
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    //onClick={() => navigate("/Apps/SkillGlow/SkillGlowList/CandidateList")}
                  >
                    New
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
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {/* DROPDOWN */}

                  {/* <FormControl
                    focused
                    variant="standard"
                    sx={{ background: "#ffffff" }}
                  >
                    <InputLabel id="candidate">Select Candidate</InputLabel>
                    <Select
                      labelId="question-type-label"
                      // value={values.QType}
                      // onChange={handleChange}
                      label="Select Candidate"
                      name="candidate"
                      id="candidate"
                      required
                      value={values.candidate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // MenuProps={{
                      //   PaperProps: {
                      //     sx: {
                      //       mt: 1, // Add space so the top border doesn’t get cut
                      //     },
                      //   },
                      // }}
                    >
                      <MenuItem value={10}>Neela Krishnan</MenuItem>
                      <MenuItem value={20}>Mani</MenuItem>
                      <MenuItem value={30}>Sudha</MenuItem>
                    </Select>
                  </FormControl> */}
                  <FormControl
                    focused
                    variant="standard"
                    sx={{ background: "#ffffff" }}
                  >
                    <InputLabel id="candidate">Select Assessment</InputLabel>
                    <Select
                      labelId="question-type-label"
                      // value={values.QType}
                      // onChange={handleChange}
                      label="Select Candidate"
                      name="candidate"
                      id="candidate"
                      required
                      value={values.candidate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // MenuProps={{
                      //   PaperProps: {
                      //     sx: {
                      //       mt: 1, // Add space so the top border doesn’t get cut
                      //     },
                      //   },
                      // }}
                    >
                      <MenuItem value={10}>Quality Assurance</MenuItem>
                      <MenuItem value={20}>React JS</MenuItem>
                      <MenuItem value={30}>React Native</MenuItem>
                      <MenuItem value={40}>Basic Office Skills</MenuItem>
                    </Select>
                  </FormControl>

                  {/* TARGET ATTEMPT */}

                  {/* <TextField
                    variant="standard"
                    focused
                    type="number"
                    name="targetAttempt"
                    label="No.Of Attempts"
                    id="targetAttempt"
                    value={values.targetAttempt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.targetAttempt && !!errors.targetAttempt}
                    helperText={touched.targetAttempt && errors.targetAttempt}
                    disabled
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  /> */}

                  {/* TARGET SCORE */}
                  {/* <TextField
                    name="targetScore"
                    id="targetScore"
                    focused
                    variant="standard"
                    label="Score"
                    type="number"
                    value={values.targetScore}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.targetScore && !!errors.targetScore}
                    helperText={touched.targetScore && errors.targetScore}
                    disabled
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  /> */}

                  {/* CUT OFF */}
                  {/* 
                  <TextField
                    name="cutOff"
                    id="cutOff"
                    focused
                    variant="standard"
                    label="Cut Off (In Minutes)"
                    type="number"
                    value={values.cutOff}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.cutOff && !!errors.cutOff}
                    helperText={touched.cutOff && errors.cutOff}
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  /> */}

                  {/* DATE PICKER */}
                  <TextField
                    name="expiryDate"
                    type="date"
                    id="expiryDate"
                    label="Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    //value={values.expiryDate}
                    // value={
                    //   new Date(Date.now() + 2 * 86400000)
                    //     .toISOString()
                    //     .split("T")[0]
                    // } // current date + 1 day
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.expiryDate && !!errors.expiryDate}
                    helperText={touched.expiryDate && errors.expiryDate}
                    sx={{ background: "" }}
                    // required
                    //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />

                  {/* SORT ORDER */}
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="Sort Order"
                    value={values.sortOrder}
                    id="sortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="sortOrder"
                    error={!!touched.sortOrder && !!errors.sortOrder}
                    helperText={touched.sortOrder && errors.sortOrder}
                    sx={{ background: "" }}
                    focused
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  {/* CHECKBOX */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="disable"
                        checked={values.disable}
                        onChange={handleChange}
                      />
                    }
                    label="Disable"
                    sx={{
                      marginTop: "20px",
                      "@media (max-width:500px)": {
                        marginTop: 0,
                      },
                    }}
                  />
                </Box>
                {/* BUTTONS */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <Button type="submit" variant="contained" color="secondary">
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      navigate("/Apps/SkillGlow/SkillGlowList/CandidateList")
                    }
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </React.Fragment>
    </>
  );
};

export default CreateCandidates;
