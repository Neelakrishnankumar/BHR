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
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const CreateSkill = () => {
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };

  const { state } = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const mode = params.Mode;
  const CatId = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");

  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const AssessementSaveFn = async (values) => {
    let action =
      mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";

    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      SkillcategoriesID: CatId,
      Code: values.Code,
      Name: values.Name,
      SortOrder: values.SortOrder,
      Disable: isCheck,
      Answertype: values.Answertype,
      Date: values.Date,
      Minimumscore: values.Minimumscore,
      Noofquestion: values.Noofquestion,
      Duration: values.Duration,
      Permittedtimes: values.Permittedtimes,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };
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
  const initialValues = {
    Code: Data.Code || "",
    Name: Data.Name || "",
    Answertype: Data.Answertype || "",
    Date: Data.Date || "",
    Duration: Data.Duration || "",
    MinimumScore: Data.MinimumScore || "",
    //NoOfAttempts: Data.NoOfAttempts || "",
    Noofquestion: Data.Noofquestion || "",
    Minimumscore: Data.Minimumscore || "",
    Permittedtimes: Data.Permittedtimes || "",
    //cutOff: Data.cutOff || "",
    SortOrder: Data.SortOrder || "",
    Disable: Data.disable || false,
  };

  const validationSchema = Yup.object({
    Code: Yup.string().required("Please Enter Code Here"),
    Name: Yup.string().required("Please Enter Name Here"),
    Answertype: Yup.string().required("Choose at least one Answertype"),
    Duration: Yup.string().required("Choose Duation"),
    Permittedtimes: Yup.number().required("Choose a number"),
    Minimumscore: Yup.number().required("Choose a Score"),
    Noofquestion: Yup.number().required("Choose a number"),
    Date: Yup.date().nullable().required("Please enter Date"),
    // cutOff: Yup.number()
    //   .min(0, "No negative numbers")
    //   .nullable()
    //   .required("Please choose Cut Off Cut (In Minutes)"),
    SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
    Disable: Yup.boolean(),
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
                  onClick={() => navigate("/Apps/TR278/List%20Of%20Categories")}
                >
                  List Of Category
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => navigate(-1)}
                >
                  List Of Assessment
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {mode == "A" ? "New" : mode=="D" ? "Delete" : Data.Name}
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
      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                AssessementSaveFn(values, resetForm);
              }, 100);
            }}
            enableReinitialize={true}
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
                  {/* {JSON.stringify(errors)} */}
                  <TextField
                    // fullWidth
                    variant="standard"
                    type="text"
                    label="Code"
                    //placeholder="Enter Your Skills Here......"
                    value={values.Code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="Code"
                    name="Code"
                    focused
                    error={!!touched.Code && !!errors.Code}
                    helperText={touched.Code && errors.Code}
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
                    value={values.Name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="Name"
                    name="Name"
                    focused
                    error={!!touched.Name && !!errors.Name}
                    helperText={touched.Name && errors.Name}
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
                    <InputLabel id="Answertype">Answer Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="Answertype"
                      name="Answertype"
                      required
                      value={values.Answertype}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value={'1/4'}>1 of 4</MenuItem>
                      <MenuItem value={'Any/4'}>Any Of 4</MenuItem>
                      <MenuItem value={'Text'}>Text</MenuItem>
                      <MenuItem value={'Number'}>Number</MenuItem>
                      <MenuItem value={'10Rates'}>10 Rates</MenuItem>
                      <MenuItem value={'5Rates'}>5 Rates</MenuItem>
                      <MenuItem value={'T/F'}>True or false</MenuItem>
                      <MenuItem value={'Y/N'}>Yes or No</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    // fullWidth
                    variant="standard"
                    type="number"
                    label="No. Of Questions"
                    //placeholder="Enter Your NoOfQuestions Here......"
                    value={values.Noofquestion}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="Noofquestion"
                    name="Noofquestion"
                    focused
                    error={!!touched.Noofquestion && !!errors.Noofquestion}
                    helperText={touched.Noofquestion && errors.Noofquestion}
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
                    label="Duration (In Days)"
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
                    type="text"
                    label="Mininum Score"
                    //placeholder="Enter Your Skills Here......"
                    value={values.Minimumscore}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="Minimumscore"
                    name="Minimumscore"
                    focused
                    error={!!touched.Minimumscore && !!errors.Minimumscore}
                    helperText={touched.Minimumscore && errors.Minimumscore}
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  />
                  <TextField
                    name="Date"
                    type="date"
                    id="Date"
                    label="Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.Date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Date && !!errors.Date}
                    helperText={touched.Date && errors.Date}
                    sx={{ background: "" }}
                    // required
                    //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />
                  <TextField
                    // fullWidth
                    variant="standard"
                    type="number"
                    label="No. Of Attempts Permitted"
                    //placeholder="Enter Your Skills Here......"
                    value={values.Permittedtimes}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="Permittedtimes"
                    name="Permittedtimes"
                    focused
                    error={!!touched.Permittedtimes && !!errors.Permittedtimes}
                    helperText={touched.Permittedtimes && errors.Permittedtimes}
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  />


                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="Sort Order"
                    value={values.SortOrder}
                    id="SortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="SortOrder"
                    error={!!touched.SortOrder && !!errors.SortOrder}
                    helperText={touched.SortOrder && errors.SortOrder}
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
                        checked={values.Disable}
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
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <LoadingButton
                    color={mode == "D" ? "error" : "secondary"}
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                     {mode == "D" ? "Delete" : "Save"} 
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default CreateSkill;
