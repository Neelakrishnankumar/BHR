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
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

const CreateQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuestion = location.state?.question || {};
  const qGroup = location.state?.qGroup; // comes from parent
  //const mode = location.state?.mode || "edit";

  const questionType = selectedQuestion.qtype || qGroup;

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const mode = params.Mode;
  const Assessmentid = params.parentID2;
  const QuestionID = params.parentID1;
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;
  console.log(answerType, "answertype");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        let schema = {};

        schema.Code = Yup.string().required("Please Enter the Code");

        schema.Question = Yup.string().required("Please Enter the Question");

        const markValidation = Yup.number()
          .typeError(data?.Questions?.number)
          .required(data?.Questions?.Marks);

        if (answerType === "T/F") {
          ["True", "False"].forEach((label, i) => {
            schema[`Rate${i + 1}`] = markValidation;
          });
        }
        if (answerType === "Y/N") {
          ["Yes", "No"].forEach((label, i) => {
            schema[`Rate${i + 1}`] = markValidation;
          });
        }

        if (answerType === "1/4" || answerType === "Any/4") {
          Array.from({ length: 4 }).forEach((_, i) => {
            const optionKey = `Option${i + 1}`;
            schema[optionKey] = Yup.string().required(
              data?.Questions?.[optionKey]
            );

            schema[`Rate${i + 1}`] = markValidation;
          });
        }

        if (answerType === "5Rates") {
          Array.from({ length: 5 }).forEach((_, i) => {
            schema[`Option${i + 1}`] = Yup.string().required(
              data?.Questions?.option
            );
            schema[`Rate${i + 1}`] = markValidation;
          });
        }

        if (answerType === "10Rates") {
          Array.from({ length: 10 }).forEach((_, i) => {
            schema[`Option${i + 1}`] = Yup.string().required(
              data?.Questions?.option
            );
            schema[`Rate${i + 1}`] = markValidation;
          });
        }

        if (answerType === "Text") {
          schema.Option1 = Yup.string().required(data?.Questions?.option);
          schema.Rate1 = Yup.number()
            .typeError(data?.Questions?.number)
            .required(data?.Questions?.Marks);
        }
        if (answerType === "Number") {
          //schema.Option1 = Yup.number().required(data?.Questions?.option);
          schema.Option1 = Yup.number()
            .typeError(data?.Questions?.numbertype) // <- friendly error instead of NaN
            .required(data?.Questions?.option);
          schema.Rate1 = markValidation;
        }

        setValidationSchema(Yup.object().shape(schema));
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, answerType]);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const QuestionSaveFn = async (values) => {
    let action =
      mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";

    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      AssessmentID: Assessmentid,
      QuestionGroupID: QuestionID,
      Code: values.Code,
      Question: values.Question,
      AnserType: values.AnserType,
      SortOrder: values.SortOrder || "0",
      Disable: isCheck,
      Option1: values.Option1,
      Rate1: values.Rate1,
      Option2: values.Option2,
      Rate2: values.Rate2,
      Option3: values.Option3,
      Rate3: values.Rate3,
      Option4: values.Option4,
      Rate4: values.Rate4,
      Option5: values.Option5,
      Rate5: values.Rate5,
      Option6: values.Option6,
      Rate6: values.Rate6,
      Option7: values.Option7,
      Rate7: values.Rate7,
      Option8: values.Option8,
      Rate8: values.Rate8,
      Option9: values.Option9,
      Rate9: values.Rate9,
      Option10: values.Option10,
      Rate10: values.Rate10,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
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

  const initialValues = {
    Code: Data.Code || "",
    Question: Data.Question || "",
    AnserType: answerType !== "" ? answerType : Data.AnserType || "",
    SortOrder: Data.SortOrder || "",
    Disable: Data.Disable == "Y" ? true : false,
    Option1: Data.Option1 || "",
    Option2: Data.Option2 || "",
    Option3: Data.Option3 || "",
    Option4: Data.Option4 || "",
    Option5: Data.Option5 || "",
    Option6: Data.Option6 || "",
    Option7: Data.Option7 || "",
    Option8: Data.Option8 || "",
    Option9: Data.Option9 || "",
    Option10: Data.Option10 || "",
    Rate1: Data.Rate1 || "",
    Rate2: Data.Rate2 || "",
    Rate3: Data.Rate3 || "",
    Rate4: Data.Rate4 || "",
    Rate5: Data.Rate5 || "",
    Rate6: Data.Rate6 || "",
    Rate7: Data.Rate7 || "",
    Rate8: Data.Rate8 || "",
    Rate9: Data.Rate9 || "",
    Rate10: Data.Rate10 || "",
  };

  // const validationSchema = Yup.object({
  //   Code: Yup.string().required("Please Enter Code Here"),
  //   Question: Yup.string().required("Please Enter Question Here"),
  //   //AnserType: Yup.string().required("Choose at least one AnswerType"),
  //   SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   Disable: Yup.boolean(),
  // });
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
                    onClick={() =>
                      navigate("/Apps/TR278/List%20Of%20Categories")
                    }
                  >
                    List Of Category ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID3}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List Of Assessment ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR281/List%20Of%20Question%20Groups/${params.parentID3}/${params.parentID2}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List Of Question Groups ({state.BreadCrumb3})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Questions
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
                  QuestionSaveFn(values, resetForm);
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
                      name="Code"
                      id="Code"
                      type="text"
                      variant="standard"
                      label="Code"
                      //placeholder="Code"
                      value={values.Code}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {/* TEXTFIELD */}
                    <TextField
                      variant="standard"
                      type="text"
                      label="Question"
                      name="Question"
                      id="Question"
                      //placeholder="Question"
                      value={values.Question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focused
                      error={!!touched.Question && !!errors.Question}
                      helperText={touched.Question && errors.Question}
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
                      name="SortOrder"
                      id="SortOrder"
                      type="number"
                      label="Sort Order"
                      value={values.SortOrder}
                      onChange={handleChange}
                      onBlur={handleBlur}
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

                    {/* CHECKBOX */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Disable"
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
                  <Box padding={2}>
                    {/* <Typography variant="h3" gutterBottom>
                            Question Details
                          </Typography> */}
                    <Typography variant="h3" gutterBottom>
                      Expected Answer
                      {/* For ({answerType}) */}
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
                    {answerType === "Text" || answerType === "Number" ? (
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
                          gap: "14px",
                        }}
                      >
                        <Box sx={{ width: "40px", textAlign: "left" }}>SL#</Box>
                        <Box sx={{ flex: 1 }}>Option</Box>
                        <Box sx={{ width: "155px" }}>Marks</Box>
                      </Box>
                    )}

                    {answerType === "1/4" &&
                      Array.from({ length: 4 }).map((_, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
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
                              fullWidth
                              name={`Option${idx + 1}`}
                              label={`Option ${idx + 1}`}
                              id="Option"
                              type="text"
                              variant="standard"
                              //label="Code"
                              //placeholder="Code"
                              //value={values.Code}
                              value={values[`Option${idx + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              focused
                              error={
                                touched[`Option${idx + 1}`] &&
                                Boolean(errors[`Option${idx + 1}`])
                              }
                              helperText={
                                touched[`Option${idx + 1}`] &&
                                errors[`Option${idx + 1}`]
                              }
                              sx={{
                                // backgroundColor: "#ffffff", // Set the background to white
                                "& .MuiFilledInput-root": {
                                  backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                },
                              }}
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${idx + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${idx + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${idx + 1}`] &&
                                Boolean(errors[`Rate${idx + 1}`])
                              }
                              helperText={
                                touched[`Rate${idx + 1}`] &&
                                errors[`Rate${idx + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}

                    {answerType === "Any/4" &&
                      Array.from({ length: 4 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
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
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={values[`Option${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Option${i + 1}`] &&
                                Boolean(errors[`Option${i + 1}`])
                              }
                              helperText={
                                touched[`Option${i + 1}`] &&
                                errors[`Option${i + 1}`]
                              }
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    {answerType === "10Rates" &&
                      Array.from({ length: 10 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
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
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={values[`Option${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Option${i + 1}`] &&
                                Boolean(errors[`Option${i + 1}`])
                              }
                              helperText={
                                touched[`Option${i + 1}`] &&
                                errors[`Option${i + 1}`]
                              }
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    {answerType === "5Rates" &&
                      Array.from({ length: 5 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
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
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={values[`Option${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Option${i + 1}`] &&
                                Boolean(errors[`Option${i + 1}`])
                              }
                              helperText={
                                touched[`Option${i + 1}`] &&
                                errors[`Option${i + 1}`]
                              }
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}

                    {/* {answerType === "T/F" &&
                      Array.from({ length: 2 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
                          }}
                        >
                         
                          <Box sx={{ width: "40px", textAlign: "center" }}>
                            <Typography variant="body1">{i + 1}</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={values[`Option${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Option${i + 1}`] &&
                                Boolean(errors[`Option${i + 1}`])
                              }
                              helperText={
                                touched[`Option${i + 1}`] &&
                                errors[`Option${i + 1}`]
                              }
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))} */}
                    {/* {answerType === "Y/N" &&
                      Array.from({ length: 2 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
                          }}
                        >
                         
                          <Box sx={{ width: "40px", textAlign: "center" }}>
                            <Typography variant="body1">{i + 1}</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={values[`Option${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Option${i + 1}`] &&
                                Boolean(errors[`Option${i + 1}`])
                              }
                              helperText={
                                touched[`Option${i + 1}`] &&
                                errors[`Option${i + 1}`]
                              }
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))} */}

                    {answerType === "T/F" &&
                      ["True", "False"].map((label, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            alignItems: "end",
                          }}
                        >
                          <Box sx={{ width: "40px", textAlign: "center" }}>
                            <Typography variant="body1">{i + 1}</Typography>
                          </Box>

                          {/* Fixed Option TextField */}
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={label} // always True / False
                              InputProps={{
                                readOnly: true, // user can’t change
                              }}
                            />
                          </Box>

                          {/* Marks Field */}
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    {answerType === "Y/N" &&
                      ["Yes", "No"].map((label, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            mb: 1,
                            gap: 2,
                            //alignItems: "center",
                            alignItems: "end",
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
                            <Typography variant="body1">{i + 1}</Typography>
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              fullWidth
                              name={`Option${i + 1}`}
                              label={`Option ${i + 1}`}
                              variant="standard"
                              value={label} // always Yes / NO
                              InputProps={{
                                readOnly: true, // user can’t change
                              }}
                            />
                          </Box>
                          <Box sx={{ width: "155px" }}>
                            <TextField
                              fullWidth
                              name={`Rate${i + 1}`}
                              label="Marks"
                              variant="standard"
                              value={values[`Rate${i + 1}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[`Rate${i + 1}`] &&
                                Boolean(errors[`Rate${i + 1}`])
                              }
                              helperText={
                                touched[`Rate${i + 1}`] &&
                                errors[`Rate${i + 1}`]
                              }
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: "right" },
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ))}

                    {(answerType === "Text" || answerType === "Number") && (
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
                            fullWidth
                            name="Option1"
                            label="Option"
                            variant="standard"
                            value={values.Option1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Option1 && Boolean(errors.Option1)}
                            helperText={touched.Option1 && errors.Option1}
                          />
                        </Box>

                        {/* Marks field */}
                        <Box sx={{ width: "155px" }}>
                          <TextField
                            fullWidth
                            name="Rate1"
                            label="Marks"
                            variant="standard"
                            value={values.Rate1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Rate1 && Boolean(errors.Rate1)}
                            helperText={touched.Rate1 && errors.Rate1}
                            sx={{
                              "& .MuiInputBase-input": { textAlign: "right" },
                            }}
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
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color={mode == "D" ? "error" : "secondary"}
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
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
      </React.Fragment>
    </>
  );
};

export default CreateQuestion;
