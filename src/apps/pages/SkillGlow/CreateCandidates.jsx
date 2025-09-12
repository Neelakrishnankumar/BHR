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
import { SingleFormikSkillAutocomplete, SingleFormikSkillAutocompletePayload } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";

const CreateCandidates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const mode = params.Mode;
  const EmpId = params.parentID2;
  const QuestionID = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector((state) => state.globalurl.AssessmentAutoUrl);
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
          assessment: Yup.object().required(data.ListofAssessCat.assessment).nullable(),
          Date: Yup.string().required(data.ListofAssessCat.Date),
          // sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
          // disable: Yup.boolean(),
        })
        setValidationSchema(schema)
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const ScheduleSaveFn = async (values) => {
    let action =
      mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";

    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      AssessmentID: values?.assessment?.RecordID || 0,
      //AssessmentName: values?.assessment?.Name || "",
      EmployeeID: EmpId,
      Date: values.Date,
      // Targeteddate: values.Targeteddate,
      // Sessionstartdate: values.Sessionstartdate,
      // Firstattdate: values.Firstattdate,
      // Firstattscore: values.Firstattscore,
      // Firstattduration: values.Firstattduration,
      // Lastattdate: values.Lastattdate,
      // Lastattscore: values.Lastattscore,
      // Lastattduration: values.Lastattduration,
      // Status: values.Status,
      Sortorder: values.Sortorder || "0",
      Disable: isCheck,
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
    assessment: Data.AssessmentID
      ? { RecordID: Data.AssessmentID, Name: Data.AssessmentName }
      : null,
    // Date: Data.Date || new Date().toISOString().split("T")[0],
    Date: mode == "A" ? new Date().toISOString().split("T")[0] : Data.Date,
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
  };

  // const validationSchema = Yup.object({
  //   //assessment: Yup.string().required("Please Enter Candidate Here"),
  //   //Date: Yup.string().required("Choose a date"),
  //   sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   disable: Yup.boolean(),
  // });
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
                      navigate("/Apps/TR286/List%20of%20Employees")
                    }
                  >
                    List Of Employees ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.parentID2}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List Of Assessment Categories ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Schedule
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "D" ? "Delete" : "View"}
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
                  ScheduleSaveFn(values, resetForm);
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
                    <SingleFormikSkillAutocompletePayload
                      name="assessment"
                      label={
                        <span>
                          Assessment{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </span>
                      }
                      id="assessment"
                      value={values.assessment}
                      onChange={(newValue) => {
                        setFieldValue("assessment", newValue);
                      }}
                      error={!!touched.assessment && !!errors.assessment}
                      helperText={touched.assessment && errors.assessment}
                      // url={`${listViewurl}?data={"Query":{"AccessID":"2120","ScreenName":"Location","Filter":"SkillCategorieID=${params.parentID1}","Any":""}}`}
                      url={AssessmentAutoUrl}
                      payload={{ "SkillCategorieID": params.parentID1, "EmployeeID": EmpId }}
                    //inputProps={{ disabled: mode == "V" }}

                    />
                    <TextField
                      name="Date"
                      type="date"
                      id="Date"
                      label={
                        <>
                          Date<span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.Date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Date && !!errors.Date}
                      helperText={touched.Date && errors.Date}
                      sx={{ background: "" }}
                      inputProps={{ readOnly: true }}
                    />

                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Sort Order"
                      value={values.Sortorder}
                      id="Sortorder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Sortorder"
                      // error={!!touched.Sortorder && !!errors.Sortorder}
                      // helperText={touched.Sortorder && errors.Sortorder}
                      
                      
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
                          readOnly: mode == "V",
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
                      inputProps={{ readOnly: mode == "V" }}
                    />
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
                      disabled={mode == "V" ? true : false}
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

export default CreateCandidates;
