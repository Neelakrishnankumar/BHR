import {
  Box,
  Breadcrumbs,
  Button,
  Tooltip,
  IconButton,
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
  Grid,
  Paper,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useProSidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import { formGap } from "../../../ui-components/utils";

const StyledTextarea = styled(TextareaAutosize)(({ theme, error }) => ({
  width: "500px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.3s ease",
  "&:focus": {
    // borderColor: theme.palette.primary.main,
    // boxShadow: `0 0 5px ${theme.palette.primary.main}`,
    borderColor: error ? "red" : theme.palette.primary.main,
    boxShadow: error ? "0 0 5px red" : `0 0 5px ${theme.palette.primary.main}`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "350px", // ✅ smaller width on small screens
  },
}));

const StyledTypography = styled(Typography)(() => ({
  //fontSize: "20px",
}));
const CreateSkill = () => {
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };

  const { state } = useLocation();
  const mode = state?.mode || "create";
  const skillData = state?.skillData || {};
  //   FOR DROPDWON
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);
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
      underline="none"
      key="2"
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
    >
      Create Skill
    </Link>,
  ];

  const initialValues = {
    code: skillData.code || "",
    name: skillData.name || "",
    QType: skillData.QType || "",
    expiryDate: skillData.expiryDate ? dayjs(skillData.expiryDate) : null,
    Duration: skillData.Duration || "",
    NoOfAttempts: skillData.NoOfAttempts || "",
    NoOfQuestions: skillData.NoOfQuestions || "",
    cutOff: skillData.cutOff || "",
    sortOrder: skillData.sortOrder || "",
    disable: skillData.disable || false,
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Please Enter Code Here"),
    name: Yup.string().required("Please Enter Name Here"),
    QType: Yup.string().required("Choose at least one Q.Type"),
    Duration: Yup.string().required("Choose Duation"),
    NoOfAttempts: Yup.number().required("Choose a number"),
    NoOfQuestions: Yup.number().required("Choose a number"),
    expiryDate: Yup.date().nullable().required("Please enter expiry date"),
    cutOff: Yup.number()
      .min(0, "No negative numbers")
      .nullable()
      .required("Please choose Cut Off Cut (In Minutes)"),
    sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
    disable: Yup.boolean(),
  });

  return (
    <React.Fragment>
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
                  List Of Assessment (XXX)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
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
            const stored = JSON.parse(localStorage.getItem("skills") || "[]");
            if (mode === "create") {
              const newSkill = {
                id: stored.length ? stored[stored.length - 1].id + 1 : 1,
                Skill: values.skills,
                QType: values.QType,
                expiryDate: values.expiryDate
                  ? dayjs(values.expiryDate).toISOString()
                  : null,
                sortOrder: values.sortOrder,
                disable: values.disable,
              };
              localStorage.setItem(
                "skills",
                JSON.stringify([...stored, newSkill])
              );
              console.log(newSkill);
            } else {
              const updated = stored.map((s) =>
                s.id === skillData.id
                  ? {
                      ...s,
                      Skill: values.skills,
                      QType: values.QType,
                      expiryDate: values.expiryDate
                        ? dayjs(values.expiryDate).toISOString()
                        : null,
                      sortOrder: values.sortOrder,
                      disable: values.disable,
                    }
                  : s
              );
              localStorage.setItem("skills", JSON.stringify(updated));
              console.log(updated);
            }
            navigate("/Apps/SkillGlow/SkillGlowList");
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
            <form onSubmit={handleSubmit}>
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
                <TextField
                  // fullWidth
                  variant="standard"
                  type="text"
                  label="Code"
                  //placeholder="Enter Your Skills Here......"
                  value={values.code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="code"
                  name="code"
                  focused
                  error={!!touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                  sx={{
                    // backgroundColor: "#ffffff", // Set the background to white
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                    },
                  }}
                />
                <TextField
                  // fullWidth
                  variant="standard"
                  type="text"
                  label="Name"
                  //placeholder="Enter Your Skills Here......"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="name"
                  name="name"
                  focused
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{
                    // backgroundColor: "#ffffff", // Set the background to white
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                    },
                  }}
                />
 <FormControl
                  focused
                  variant="standard"
                  sx={{ background: "#ffffff" }}
                  // sx={{ gridColumn: "span 2", background: "#f5f5f5"  }}
                >
                  <InputLabel id="QType">Answer Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="QType"
                    name="QType"
                    required
                    value={values.QType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>1 of 4</MenuItem>
                    <MenuItem value={20}>Any Of 4</MenuItem>
                    <MenuItem value={30}>Text</MenuItem>
                    <MenuItem value={40}>Number</MenuItem>
                    <MenuItem value={50}>10 Rates</MenuItem>
                    <MenuItem value={60}>5 Rates</MenuItem>
                    <MenuItem value={70}>True or false</MenuItem>
                    <MenuItem value={80}>Yes or No</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  // fullWidth
                  variant="standard"
                  type="number"
                  label="No. Of Questions"
                  //placeholder="Enter Your NoOfQuestions Here......"
                  value={values.NoOfQuestions}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="NoOfQuestions"
                  name="NoOfQuestions"
                  focused
                  error={!!touched.NoOfQuestions && !!errors.NoOfQuestions}
                  helperText={touched.NoOfQuestions && errors.NoOfQuestions}
                  sx={{
                    // backgroundColor: "#ffffff", // Set the background to white
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                    },
                  }}
                />
                <TextField
                  // fullWidth
                  variant="standard"
                  type="number"
                  label="Duration"
                  //placeholder="Enter Your Skills Here......"
                  value={values.Duration}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="Duration"
                  name="Duration"
                  focused
                  error={!!touched.Duration && !!errors.Duration}
                  helperText={touched.Duration && errors.Duration}
                  sx={{
                    // backgroundColor: "#ffffff", // Set the background to white
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                    },
                  }}
                />
               
                <TextField
                  // fullWidth
                  variant="standard"
                  type="number"
                  label="No. Of Attempts Permitted"
                  //placeholder="Enter Your Skills Here......"
                  value={values.NoOfAttempts}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="NoOfAttempts"
                  name="NoOfAttempts"
                  focused
                  error={!!touched.NoOfAttempts && !!errors.NoOfAttempts}
                  helperText={touched.NoOfAttempts && errors.NoOfAttempts}
                  sx={{
                    // backgroundColor: "#ffffff", // Set the background to white
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                    },
                  }}
                />

                {/* CUT OFF */}

                {/* <TextField
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
                {/* <TextField
                  name="expiryDate"
                  type="date"
                  id="expiryDate"
                  label="Expiry Date"
                  variant="standard"
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.expiryDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.expiryDate && !!errors.expiryDate}
                  helperText={touched.expiryDate && errors.expiryDate}
                  sx={{ background: "" }}
                  // required
                  //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                /> */}

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
              <Box display="flex" justifyContent="flex-end" padding={1} gap={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  //  loading={loading}
                  //  onClick={() => {
                  //    fnSave(values, false);
                  //  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/Apps/SkillGlow/SkillGlowList")}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default CreateSkill;
