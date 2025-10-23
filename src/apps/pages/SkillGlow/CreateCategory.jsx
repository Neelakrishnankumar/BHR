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
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };
  const handleClick2 = () => {
    navigate("/Apps/SkillGlow/SkillGlowList/SkillCategory");
  };

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  const accessID1 = params.accessID1;
  const screenName = params.screenName;
  const mode = params.Mode;
  console.log(params, "-------------");

  const Assessmentid = params.parentID1;
  const CategoryId = params.parentID2;
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const CompanyID = sessionStorage.getItem("compID");
  const location = useLocation();
  const state = location.state || {};

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
        const schema = Yup.object().shape({
          //Code: Yup.string().required(data.ListofQuestiongroup.Code),
          Name: Yup.string().required(data.ListofQuestiongroup.Name),
          AnswerType: Yup.string().required(
            data.ListofQuestiongroup.AnswerType
          ),
          NoOfQuestions: Yup.string().required(
            data.ListofQuestiongroup.NoOfQuestions
          ),
          // SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
          // Disable: Yup.boolean(),
        });

        if (CompanyAutoCode === "N") {
          schema = schema.shape({
            Code: Yup.string().required(data.ListofQuestiongroup.Code),
          });
        }
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const QuestionGrpSaveFn = async (values, delAction) => {
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
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      AssessmentRecordID: Assessmentid,
      Code: values.Code,
      Name: values.Name,
      NoOfQuestions: values.NoOfQuestions,
      Answertype: values.AnswerType,
      SortOrder: values.SortOrder || "0",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",
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
  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    Code: Data.Code || "",
    Name: Data.Name || "",
    NoOfQuestions: Data.NoOfQuestions || "",
    AnswerType: Data.AnswerType || "",
    AvailableNoOfQuestion: Data.AvailableNoOfQues || "",
    SortOrder: Data.SortOrder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };

  // const validationSchema = Yup.object({
  //   Code: Yup.string().required("Please Enter Code Here"),
  //   Name: Yup.string().required("Please Enter Name Here"),
  //   AnswerType: Yup.string().required("Choose at least one A.Type"),
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
                {/* <Breadcrumbs
                  maxItems={3}
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() =>
                      navigate(`/Apps/TR278/List%20Of%20Categories`)
                    }
                  >
                    List Of Category ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() =>
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR280/List Of Assessment/${params.parentID2}`,
                        {
                          state: { ...state },
                        }
                      )
                    }
                  >
                    List Of Assessment ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Question Group
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "D" ? "Delete" : Data.Name}
                  </Typography>
                </Breadcrumbs> */}
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
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}`,
                        { state: { ...state } }
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
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}/${accessID1}/${params.parentID2}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List of Assessment ({state.BreadCrumb3})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    List of Question Groups
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "D" ? "Delete" : Data.Name}
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
                  QuestionGrpSaveFn(values, resetForm);
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
                    {/* TEXTFIELD */}

                    {CompanyAutoCode === "Y" ? (
                      <TextField
                        variant="standard"
                        name="Code"
                        id="Code"
                        placeholder="Auto"
                        label="Code"
                        type="text"
                        focused
                        value={values.Code}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        variant="standard"
                        name="Code"
                        id="Code"
                        //placeholder="Code"
                        label={
                          <>
                            Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        type="text"
                        focused
                        value={values.Code}
                        onChange={handleChange}
                        onBlur={handleBlur}
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

                    {/* TEXTFIELD */}
                    <TextField
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
                      name="Name"
                      id="Name"
                      //placeholder="Name"
                      value={values.Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
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

                    <TextField
                      // fullWidth
                      variant="standard"
                      type="number"
                      // label="No. Of Questions"
                      label={
                        <>
                          Assessment No. Of Questions
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
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
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    {/* DROPDOWN */}

                    {/* <FormControl
                      focused
                      variant="standard"
                      sx={{ background: "#ffffff" }}
                      error={!!touched.AnswerType && !!errors.AnswerType}

                    >
                      <InputLabel id="AnswerType">Answer Type</InputLabel> */}
                    <TextField
                      focused
                      variant="standard"
                      label={
                        <>
                          Answer Type
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      name="AnswerType"
                      id="AnswerType"
                      value={values.AnswerType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                      error={!!touched.AnswerType && !!errors.AnswerType}
                      helperText={touched.AnswerType && errors.AnswerType}
                      // required
                      //error={!!touched.AnswerType && !!errors.AnswerType}
                      //helperText={touched.AnswerType && errors.AnswerType}
                      // MenuProps={{
                      //   PaperProps: {
                      //     sx: {
                      //       mt: 1, // Add space so the top border doesn’t get cut
                      //     },
                      //   },
                      // }}
                    >
                      <MenuItem value={"1/4"}>One Of Four</MenuItem>
                      <MenuItem value={"Any/4"}>Any Of Four</MenuItem>
                      <MenuItem value={"Text"}>Text</MenuItem>
                      <MenuItem value={"Number"}>Number</MenuItem>
                      {/* <MenuItem value={"10Rates"}>10 Rates</MenuItem>
                      <MenuItem value={"5Rates"}>5 Rates</MenuItem> */}
                      <MenuItem value={"T/F"}>True or False</MenuItem>
                      <MenuItem value={"Y/N"}>Yes or No</MenuItem>
                    </TextField>
                    {/* </FormControl> */}

                    {(mode === "E" || mode === "D") && (
                      <TextField
                        // fullWidth
                        variant="standard"
                        type="number"
                        // label="No. Of Attempts Permitted"
                        label="Available No. Of Questions"
                        //placeholder="Enter Your Skills Here......"
                        value={values.AvailableNoOfQuestion}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="AvailableNoOfQuestion"
                        name="AvailableNoOfQuestion"
                        focused
                        error={
                          !!touched.AvailableNoOfQuestion &&
                          !!errors.AvailableNoOfQuestion
                        }
                        helperText={
                          touched.AvailableNoOfQuestion &&
                          errors.AvailableNoOfQuestion
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
                    )}

                    {/* SORT ORDER */}
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
                      {/* CHECKBOX */}
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
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                      />
                    </Box>
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
                      color="secondary"
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
                            QuestionGrpSaveFn(values, "harddelete");
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
    </>
  );
};

export default CreateCategory;
