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
import React, { useCallback, useEffect, useState } from "react";
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
import { AppraisalAutocompletePayload } from "./SkillGlowAutocomplete";
import { fetchListview } from "../../../store/reducers/Listviewapireducer";

const CreateCompliance = () => {
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const state = location.state || {};
  console.log(state, "--------------");

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const BreadCrumb = state.BreadCrumb1;
  const AssessmentType = state.AssessmentType;
  console.log("🚀 ~ CreateSkill ~ AssessmentType:", AssessmentType);
  const mode = params.Mode;
  const CatId = params.parentID1;
  const CompanyID = sessionStorage.getItem("compID");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  // useEffect(() => {
  //   fetch(process.env.PUBLIC_URL + "/validationcms.json")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch validationcms.json");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setErrorMsgData(data);
  //       const schema = Yup.object().shape({
  //         //Code: Yup.string().required(data.ListofAssessment.Code),
  //         Name: Yup.string().required(data.ListofAssessment.Name),
  //         Duration: Yup.string().required(data.ListofAssessment.Duration),
  //         Permittedtimes: Yup.number().required(
  //           data.ListofAssessment.Permittedtimes
  //         ),
  //         Minimumscore: Yup.number().required(
  //           data.ListofAssessment.Minimumscore
  //         ),
  //         //Noofquestion: Yup.number().required(data.ListofAssessment.Noofquestion),
  //         Date: Yup.date().nullable().required(data.ListofAssessment.Date),
  //       });
  //       if (CompanyAutoCode === "N") {
  //         schema = schema.shape({
  //           Code: Yup.string().required(data.ListofAssessment.Code),
  //         });
  //       }

  //    if (state.BreadCrumb1 === "Appraisal") {
  //       schema = schema.concat(
  //         Yup.object().shape({
  //           DesignationID: Yup.object()
  //             .nullable()
  //             .shape({
  //               RecordID: Yup.string().required(data.ListofAssessment.DesignationID),
  //               Name: Yup.string().required(),
  //             })
  //             .required(data.ListofAssessment.DesignationID),
  //           AppraisalType: Yup.string().required(data.ListofAssessment.AppraisalType),
  //         })
  //       );
  //     }
  //       setValidationSchema(schema);
  //     })
  //     .catch((err) => console.error("Error loading validationcms.json:", err));
  // }, [CompanyAutoCode, BreadCrumb]);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        let schema = Yup.object().shape({
          Name: Yup.string().required(data.ListofAssessment.Name),
          Duration: Yup.string().required(data.ListofAssessment.Duration),
          DesignationID: Yup.object()
            .nullable()
            .shape({
              RecordID: Yup.string().required(
                data.ListofAssessment.DesignationID
              ),
              Name: Yup.string().nullable(), // optional
            })
            .required(data.ListofAssessment.DesignationID),
          // AppraisalType: Yup.string().required(
          //   data.ListofAssessment.AppraisalType
          // ),
          Permittedtimes: Yup.number().required(
            data.ListofAssessment.Permittedtimes
          ),
          Minimumscore: Yup.number().required(
            data.ListofAssessment.Minimumscore
          ),
          Date: Yup.date().nullable().required(data.ListofAssessment.Date),
        });

        if (CompanyAutoCode === "N") {
          schema = schema.concat(
            Yup.object().shape({
              Code: Yup.string().required(data.ListofAssessment.Code),
            })
          );
        }

        // if (AssessmentType === "Appraisal") {
        //   schema = schema.concat(
        //     Yup.object().shape({
        //       // DesignationID: Yup.object()
        //       //   .nullable()
        //       //   .shape({
        //       //     RecordID: Yup.string().required(data.ListofAssessment.DesignationID),
        //       //     Name: Yup.string().required(),
        //       //   })
        //       //   .required(data.ListofAssessment.DesignationID),
        //       DesignationID: Yup.object()
        //         .nullable()
        //         .shape({
        //           RecordID: Yup.string().required(
        //             data.ListofAssessment.DesignationID
        //           ),
        //           Name: Yup.string().nullable(), // optional
        //         })
        //         .required(data.ListofAssessment.DesignationID),

        //       AppraisalType: Yup.string().required(
        //         data.ListofAssessment.AppraisalType
        //       ),
        //     })
        //   );
        // }

        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);

  const AssessementSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
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
      SortOrder: values.SortOrder || "0",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",

      Answertype: values.Answertype,
      DesignationID: values.DesignationID?.RecordID || "0",

      AppraisalType: "Self",
      Date: values.Date,
      Minimumscore: values.Minimumscore,
      //Noofquestion: "0",
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
      title: errorMsgData.Warningmsg[props],
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
    //Noofquestion: Data.Noofquestion || "",
    NoOfQuestionGroup: Data.NoOfQuestionGroup || "0",
    TotalNoOfQuestion: Data.NoOfQuestions || "0",
    Minimumscore: Data.Minimumscore || "",
    Permittedtimes: Data.Permittedtimes || "",
    //cutOff: Data.cutOff || "",
    SortOrder: Data.SortOrder || "",
    //Designation: Data.DesignationID || "",
    DesignationID: Data.DesignationID
      ? {
          RecordID: Data.DesignationID,
          Name: Data.DesignationName, // used for dropdown display
        }
      : null,
    AppraisalType: Data.AppraisalType || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };
  const memoizedUrl = useCallback(() => {
    return `${listViewurl}?data=${encodeURIComponent(
      JSON.stringify({
        Query: {
          AccessID: "2047",
          ScreenName: "Designation",
          Filter: `parentID='${CompanyID}'`,
          Any: "",
        },
      })
    )}`;
  }, [CompanyID]);

  // const validationSchema = Yup.object({
  //   Code: Yup.string().required("Please Enter Code Here"),
  //   Name: Yup.string().required("Please Enter Name Here"),
  //   //Answertype: Yup.string().required("Choose at least one Answertype"),
  //   Duration: Yup.string().required("Choose Duation"),
  //   Permittedtimes: Yup.number().required("Choose a number"),
  //   Minimumscore: Yup.number().required("Choose a Score"),
  //   Noofquestion: Yup.number().required("Choose a number"),
  //   Date: Yup.date().nullable().required("Please enter Date"),
  //   // cutOff: Yup.number()
  //   //   .min(0, "No negative numbers")
  //   //   .nullable()
  //   //   .required("Please choose Cut Off Cut (In Minutes)"),
  //   SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   Disable: Yup.boolean(),
  // });

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
                            maxItems={2}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                          >
                            <Typography
                              variant="h5"
                              color="#0000D1"
                              sx={{ cursor: "default" }}
                              onClick={() => {
                                navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                              }}
                            >
                              List of Assessment Type ({state.BreadCrumb1})
                            </Typography>
                            <Typography
                              variant="h5"
                              color="#0000D1"
                              sx={{ cursor: "default" }}
                              onClick={() => {
                                navigate(`/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                                  {state: {...state}}
                                );
                              }}
                            
                            >
                              List of Category ({state.BreadCrumb2})
                            </Typography>
                            <Typography
                              variant="h5"
                              color="#0000D1"
                              sx={{ cursor: "default" }}
                            onClick={() => {
                              navigate(-1);
                            }}
                            >
                              List of Assessment
                            </Typography>
                            <Typography
                              variant="h5"
                              color="#0000D1"
                              sx={{ cursor: "default" }}
                            >
                              {mode == "A" ? "New" : "Edit"}
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
                {/* {JSON.stringify(errors)} */}
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
                  {CompanyAutoCode === "Y" ? (
                    <TextField
                      // fullWidth
                      variant="standard"
                      type="text"
                      label="Code"
                      placeholder="Auto"
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
                      InputProps={{ readOnly: true }}
                    />
                  ) : (
                    <TextField
                      // fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
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
                      autoFocus
                    />
                  )}

                  <TextField
                    // fullWidth
                    variant="standard"
                    type="text"
                    label={
                      <>
                        Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
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
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  {/* <FormControl
                    focused
                    variant="standard"
                    sx={{ background: "#ffffff" }}
                    error={!!touched.Answertype && !!errors.Answertype}
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
                  </FormControl> */}
                  {/* <TextField
                    // fullWidth
                    variant="standard"
                    type="number"
                    // label="No. Of Questions"
                    label={
                      <>No. Of Questions<span style={{color:"red",fontSize:"20px"}}>*</span></>
                    }
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
                    // InputProps={{
                    //   inputProps: {
                    //     style: { textAlign: "right" },
                    //   },
                    // }}
                  /> */}
                  <TextField
                    // fullWidth
                    variant="standard"
                    type="number"
                    // label="Duration (In Days)"
                    label={
                      <>
                        Duration (In Days)
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
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
                        backgroundColor: "#f5f5f5 ",
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    // fullWidth
                    variant="standard"
                    type="text"
                    // label="Mininum Score"
                    label={
                      <>
                        Minimum Score
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
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
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="Date"
                    type="date"
                    id="Date"
                    label={
                      <>
                        Date
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
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
                    // label="No. Of Attempts Permitted"
                    label={
                      <>
                        No. Of Attempts Permitted
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
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
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  {(mode == "E" || mode == "D") && (
                    <>
                      {/* NO OF QUESTION GROUP */}
                      <TextField
                        // fullWidth
                        variant="standard"
                        type="number"
                        // label="No. Of Attempts Permitted"
                        label="No. Of Question Groups"
                        //placeholder="Enter Your Skills Here......"
                        value={values.NoOfQuestionGroup}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="NoOfQuestionGroup"
                        name="NoOfQuestionGroup"
                        focused
                        error={
                          !!touched.NoOfQuestionGroup &&
                          !!errors.NoOfQuestionGroup
                        }
                        helperText={
                          touched.NoOfQuestionGroup && errors.NoOfQuestionGroup
                        }
                        disabled
                        sx={{
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            //readOnly:true
                          },
                        }}
                      />

                      {/* TOTAL NO OF QUESTIONS */}

                      <TextField
                        // fullWidth
                        variant="standard"
                        type="number"
                        // label="No. Of Attempts Permitted"
                        label="No. Of Questions"
                        //placeholder="Enter Your Skills Here......"
                        value={values.TotalNoOfQuestion}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="TotalNoOfQuestion"
                        name="TotalNoOfQuestion"
                        focused
                        error={
                          !!touched.TotalNoOfQuestion &&
                          !!errors.TotalNoOfQuestion
                        }
                        helperText={
                          touched.TotalNoOfQuestion && errors.TotalNoOfQuestion
                        }
                        disabled
                        sx={{
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            //readOnly:true
                          },
                        }}
                      />
                    </>
                  )}
                  {/* {AssessmentType === "Appraisal" ? ( */}
                  <>
                    <AppraisalAutocompletePayload
                      name="DesignationID"
                      label={
                        <span>
                          Designation{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </span>
                      }
                      id="DesignationID"
                      value={values.DesignationID}
                      // onChange={(newValue) =>
                      //   setFieldValue("DesignationID", newValue)
                      // }
                      onChange={(newValue) =>
                        setFieldValue(
                          "DesignationID",
                          newValue
                            ? {
                                RecordID: newValue.RecordID,
                                Name: newValue.Name,
                              }
                            : null
                        )
                      }
                      onBlur={() => setFieldTouched("DesignationID", true)}
                      error={!!touched.DesignationID && !!errors.DesignationID}
                      helperText={touched.DesignationID && errors.DesignationID}
                      //params={{ CompanyID: CompanyID }}
                      //state={{ globalurl }}
                      // url={(state, params) =>
                      //   `${listViewurl}?data=${encodeURIComponent(
                      //     JSON.stringify({
                      //       Query: {
                      //         AccessID: "2047",
                      //         ScreenName: "Designation",
                      //         Filter: `parentID='${CompanyID}'`,
                      //         Any: "",
                      //       },
                      //     })
                      //   )}`
                      // }
                      url={memoizedUrl}
                    />

                    {/* <TextField
                      focused
                      variant="standard"
                      label={
                        <>
                          Appraisal Type
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      name="AppraisalType"
                      id="AppraisalType"
                      value={values.AppraisalType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                      error={!!touched.AppraisalType && !!errors.AppraisalType}
                      helperText={touched.AppraisalType && errors.AppraisalType}
                    >
                      <MenuItem value={"Self"}>Self</MenuItem>
                      <MenuItem value={"Manager"}>Manager</MenuItem>
                      <MenuItem value={"Peer"}>Peer</MenuItem>
                      <MenuItem value={"Subordinate"}>Subordinate</MenuItem>
                    </TextField> */}

                    {/* <FormControl
                        focused
                        variant="standard"
                        sx={{ background: "#ffffff" }}
                        error={
                          !!touched.AppraisalType && !!errors.AppraisalType
                        }
                        // sx={{ gridColumn: "span 2", background: "#f5f5f5"  }}
                      >
                        <InputLabel id="AppraisalType">
                          <span>
                            Appraisal Type{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        </InputLabel>
                       
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="AppraisalType"
                          name="AppraisalType"
                          required
                          value={values.AppraisalType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value={"Self"}>Self</MenuItem>
                          <MenuItem value={"Manager"}>Manager</MenuItem>
                          <MenuItem value={"Peer"}>Peer</MenuItem>
                        </Select>
                      </FormControl> */}
                  </>
                  {/* ) : (
                    false
                  )} */}
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
                    // error={!!touched.SortOrder && !!errors.SortOrder}
                    // helperText={touched.SortOrder && errors.SortOrder}
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

                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="DeleteFlag"
                          checked={values.DeleteFlag}
                          onChange={handleChange}
                        />
                      }
                      label="Delete"
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
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>

                  {/* {mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: errorMsgData.Warningmsg.Delete,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            AssessementSaveFn(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : null} */}

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

export default CreateCompliance;
