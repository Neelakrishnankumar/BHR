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
import { useLocation, useNavigate } from "react-router-dom";
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

const CreateQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuestion = location.state?.question || {};
  const qGroup = location.state?.qGroup; // comes from parent
  const mode = location.state?.mode || "edit";

  const questionType = selectedQuestion.qtype || qGroup;

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
  //   FOR DROPDWON
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //const qGroup = location.state?.qGroup;
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
      underline="hover"
      key="1"
      onClick={() =>
        navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList")
      }
      sx={{
        fontSize: "20px",
        color: "primary",
      }}
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
      Create Questions
    </Link>,
  ];

  const initialValues = {
    code: "",
    name: "",
    //QType: "",
    sortOrder: "",
    disable: false,
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Please Enter Code Here"),
    name: Yup.string().required("Please Enter Name Here"),
    //QType: Yup.string().required("Choose at least one Q.Type"),
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
                    List Of Questions (XXX)
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Create Question
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
                    name="code"
                    id="code"
                    type="text"
                    variant="standard"
                    label="Code"
                    //placeholder="Code"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

                  {/* <FormControl
                    focused
                    variant="standard"
                    sx={{ background: "#ffffff" }}
                  >
                    <InputLabel id="QType">Please Select Q.Type</InputLabel>
                    <Select
                      labelId="question-type-label"
                      // value={values.QType}
                      // onChange={handleChange}
                      label="Please Select Q.Type"
                      name="QType"
                      id="QType"
                      value={values.QType}
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
                  </FormControl> */}

                  {/* SORT ORDER */}
                  <TextField
                    variant="standard"
                    name="sortOrder"
                    id="sortOrder"
                    type="number"
                    label="Sort Order"
                    value={values.sortOrder}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                <Box padding={2}>
                  {/* <Typography variant="h3" gutterBottom>
                            Question Details
                          </Typography> */}
                  <Typography variant="h3" gutterBottom>
                    Expected Answer
                  </Typography>
                  {/* <Typography variant="h6" gutterBottom>
                    Question Type<b> - {questionType}</b>
                  </Typography> */}

                  {/* Table-style header */}
                  {/* <Box sx={{ display: "flex", my: 2, fontWeight: "bold", gap: "10px" }}>
                            <Box >S.no</Box>
                            <Box sx={{flex:1}}>Options</Box>
                            <Box>Mark</Box>
                            
                          </Box> */}
                  {/* Table-style header */}
                  {questionType === "Text" || questionType === "Number" ? (
                    <Box
                      sx={{
                        display: "flex",
                        my: 2,
                        fontWeight: "bold",
                        gap: "10px",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>Expected Answer</Box>
                      <Box sx={{ width: "155px" }}>Marks</Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        my: 2,
                        fontWeight: "bold",
                        gap: "10px",
                      }}
                    >
                      <Box sx={{ width: "40px", textAlign: "left" }}>S.no</Box>
                      <Box sx={{ flex: 1 }}>Option</Box>
                      <Box sx={{ width: "155px" }}>Marks</Box>
                    </Box>
                  )}

                  {questionType === "1 Of 4" &&
                    ["A", "B", "C", "D"].map((label, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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

                  {questionType === "Any Of 4" &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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
                  {questionType === "10 Rates" &&
                    Array.from({ length: 10 }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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
                  {questionType === "5 Rates" &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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

                  {questionType === "True / False" &&
                    ["True", "False"].map((label, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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
                  {questionType === "Yes/No" &&
                    ["Yes", "No"].map((label, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          mb: 1,
                          gap: 2,
                          alignItems: "center",
                        }}
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

                  {questionType === "Rating" && (
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

                  {(questionType === "Text" || questionType === "Number") && (
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1,
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
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
                      <Box sx={{ width: "155px" }}>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder="Enter Marks"
                          fullWidth
                        />
                      </Box>
                    </Box>
                  )}
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
                      navigate(
                        "/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList",
                        { state: { qGroup } } // pass it back
                      )
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

export default CreateQuestion;
