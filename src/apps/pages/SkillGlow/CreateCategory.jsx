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
  fontSize: "20px",
}));
const CreateCategory = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };
  const handleClick2 = () => {
    navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory");
  };

  //   FOR DROPDWON
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
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
  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

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
      underline="none"
      key="2"
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
    >
      Create Category
    </Link>,
  ];

  const initialValues = {
    code: "",
    name: "",
    AType: "",

    sortOrder: "",
    disable: false,
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Please Enter Code Here"),
    name: Yup.string().required("Please Enter Name Here"),
    AType: Yup.string().required("Choose at least one A.Type"),
    sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
    disable: Yup.boolean(),
  });
  return (
    <>
      <React.Fragment>
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
                    List Of Question Groups (XXX)
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Create Question Group
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
                  {/* TEXTFIELD */}
                  <TextField
                    variant="standard"
                    name="code"
                    id="code"
                    //placeholder="Code"
                    label="Code"
                    type="text"
                    focused
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  />

                  {/* TEXTFIELD */}
                  <TextField
                    variant="standard"
                    type="text"
                    label="Name"
                    name="name"
                    id="name"
                    //placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  {/* DROPDOWN */}

                  <FormControl
                    focused
                    variant="standard"
                    sx={{ background: "#ffffff" }}
                  >
                    <InputLabel id="AType">Answer Type</InputLabel>
                    <Select
                      labelId="question-type-label"
                      // value={values.QType}
                      // onChange={handleChange}
                      label="Question Type"
                      name="AType"
                      id="AType"
                      value={values.AType}
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
                      navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory")
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

export default CreateCategory;
