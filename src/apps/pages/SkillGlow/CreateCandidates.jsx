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
import {
  ManagerAppraisalPayload,
  PeerAppraisalPayload,
  SelfAppraisalPayload,
  SingleFormikSkillAutocomplete,
  SingleFormikSkillAutocompletePayload,
  SubordinateAppraisalPayload,
} from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";

const CreateCandidates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  //const accessID = "TR283";
  const screenName = params.screenName;
  const mode = params.Mode;
  const EmpId = params.parentID3;
  const QuestionID = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;

  const AssessmentType = state.AssessmentType;
  console.log("🚀 ~ CreateCandidates ~ AssessmentType:", AssessmentType);
  const DesignationID = state.DesignationID;
  console.log("🚀 ~ CreateCandidates ~ DesignationID:", DesignationID);

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector(
    (state) => state.globalurl.AssessmentAutoUrl
  );
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
        // const schema = Yup.object().shape({
        //   // assessment: Yup.object()
        //   //   .required(data.ListofAssessCat.assessment)
        //   //   .nullable(),
        //   Date: Yup.string().required(data.ListofAssessCat.Date),
        //   // sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
        //   // disable: Yup.boolean(),
        // });
        const appraisalSchema = Yup.object().shape({
          Date: Yup.string()
            .required(data.ListofAssessCat.Date)
            .test(
              "valid-date",
              "Invalid Date",
              (value) => !!value && !isNaN(new Date(value))
            ),
          SelfRecordID: Yup.object()
            .nullable()
            .test(
              "self-required",
              data.ListofAssessCat.SelfRecordID,
              (value) => value && value.RecordID
            ),
          ManagerRecordID: Yup.object()
            .nullable()
            .test(
              "manager-required",
              data.ListofAssessCat.ManagerRecordID,
              (value) => value && value.RecordID
            ),
          PeerRecordID: Yup.object()
            .nullable()
            .test(
              "peer-required",
              data.ListofAssessCat.PeerRecordID,
              (value) => value && value.RecordID
            ),
          SubordinateRecordID: Yup.object()
            .nullable()
            .test(
              "sub-required",
              data.ListofAssessCat.SubordinateRecordID,
              (value) => value && value.RecordID
            ),
        });

        const normalSchema = Yup.object().shape({
          Date: Yup.string()
            .required(data.ListofAssessCat.Date)
            .test(
              "valid-date",
              "Invalid Date",
              (value) => !!value && !isNaN(new Date(value))
            ),
          assessment: Yup.object()
            .nullable()
            .test(
              "assessment-required",
              data.ListofAssessCat.assessment,
              (value) => value && value.RecordID
            ),
        });

        // Pick schema based on AssessmentType
        const schema =
          AssessmentType === "Appraisal" ? appraisalSchema : normalSchema;

        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const ScheduleSaveFn = async (values, delAction) => {
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
      AssessmentID: values?.assessment?.RecordID || 0,
      EmployeeID: EmpId,
      Date: values.Date,
      AssessmentType: AssessmentType || "",
      SelfRecordID: values?.SelfRecordID?.RecordID || 0,
      DesignationRecordID: DesignationID || 0,
      ManagerRecordID: values?.ManagerRecordID?.RecordID || 0,
      SubordinateRecordID: values?.SubordinateRecordID?.RecordID || 0,
      PeerRecordID: values?.PeerRecordID?.RecordID || 0,
      Sortorder: values.Sortorder || "0",
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
    AssessmentType: AssessmentType || "",
    assessment: Data.AssessmentID
      ? { RecordID: Data.AssessmentID, Name: Data.AssessmentName }
      : null,
    // Date: Data.Date || new Date().toISOString().split("T")[0],
    //Date: mode == "A" ? new Date().toISOString().split("T")[0] : Data.Date,
    Date:
      mode === "A"
        ? new Date().toISOString().split("T")[0] // today
        : Data.Date || new Date().toISOString().split("T")[0],
    SelfRecordID: Data.SelfRecordID
      ? { RecordID: Data.SelfRecordID, Name: Data.SelfName }
      : null,

    ManagerRecordID: Data.ManagerRecordID
      ? { RecordID: Data.ManagerRecordID, Name: Data.ManagerName }
      : null,
    PeerRecordID: Data.PeerRecordID
      ? { RecordID: Data.PeerRecordID, Name: Data.PeerName }
      : null,
    SubordinateRecordID: Data.SubordinateRecordID
      ? { RecordID: Data.SubordinateRecordID, Name: Data.SubordinateName }
      : null,
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };

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
                        `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.parentID3}`,
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
                    {mode == "A" ? "New" : mode == "E" ? "Edit" : "View"}
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
                    {AssessmentType === "Appraisal" ? (
                      <>
                        <SelfAppraisalPayload
                          name="SelfRecordID"
                          label={
                            <span>
                              Self{" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          id="SelfRecordID"
                          value={values.SelfRecordID}
                          onChange={(newValue) => {
                            setFieldValue("SelfRecordID", newValue);
                          }}
                          error={
                            !!touched.SelfRecordID && !!errors.SelfRecordID
                          }
                          helperText={
                            touched.SelfRecordID && errors.SelfRecordID
                          }
                          url={`${listViewurl}?data=${encodeURIComponent(
                            JSON.stringify({
                              Query: {
                                AccessID: "2122",
                                ScreenName: "List+Of+Question+Groups",
                                Filter: `AssessmentType='${AssessmentType}' AND DesignationID='${DesignationID}' AND AppraisalType='Self'`,
                                Any: "",
                              },
                            })
                          )}`}

                          //url={listViewurl}
                          // payload={{
                          //   AssessmentType: AssessmentType,
                          //   DesignationID: DesignationID,
                          //   AppraisalType: "Self",
                          // }}
                          //inputProps={{ disabled: mode == "V" }}
                        />

                        <ManagerAppraisalPayload
                          name="ManagerRecordID"
                          label={
                            <span>
                              Manager{" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          id="ManagerRecordID"
                          value={values.ManagerRecordID}
                          onChange={(newValue) => {
                            setFieldValue("ManagerRecordID", newValue);
                          }}
                          error={
                            !!touched.ManagerRecordID &&
                            !!errors.ManagerRecordID
                          }
                          helperText={
                            touched.ManagerRecordID && errors.ManagerRecordID
                          }
                          url={`${listViewurl}?data=${encodeURIComponent(
                            JSON.stringify({
                              Query: {
                                AccessID: "2123",
                                ScreenName: "List+Of+Question+Groups",
                                Filter: `AssessmentType='${AssessmentType}' AND DesignationID='${DesignationID}' AND AppraisalType='Manager'`,
                                Any: "",
                              },
                            })
                          )}`}
                        />

                        <PeerAppraisalPayload
                          name="PeerRecordID"
                          label={
                            <span>
                              Peer{" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          id="PeerRecordID"
                          value={values.PeerRecordID}
                          onChange={(newValue) => {
                            setFieldValue("PeerRecordID", newValue);
                          }}
                          error={
                            !!touched.PeerRecordID && !!errors.PeerRecordID
                          }
                          helperText={
                            touched.PeerRecordID && errors.PeerRecordID
                          }
                          url={`${listViewurl}?data=${encodeURIComponent(
                            JSON.stringify({
                              Query: {
                                AccessID: "2125",
                                ScreenName: "List+Of+Question+Groups",
                                Filter: `AssessmentType='${AssessmentType}' AND DesignationID='${DesignationID}' AND AppraisalType='Peer'`,
                                Any: "",
                              },
                            })
                          )}`}
                        />

                        <SubordinateAppraisalPayload
                          name="SubordinateRecordID"
                          label={
                            <span>
                              Subordinate{" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          id="SubordinateRecordID"
                          value={values.SubordinateRecordID}
                          onChange={(newValue) => {
                            setFieldValue("SubordinateRecordID", newValue);
                          }}
                          error={
                            !!touched.SubordinateRecordID &&
                            !!errors.SubordinateRecordID
                          }
                          helperText={
                            touched.SubordinateRecordID &&
                            errors.SubordinateRecordID
                          }
                          url={`${listViewurl}?data=${encodeURIComponent(
                            JSON.stringify({
                              Query: {
                                AccessID: "2124",
                                ScreenName: "List+Of+Question+Groups",
                                Filter: `AssessmentType='${AssessmentType}' AND DesignationID='${DesignationID}' AND AppraisalType='Subordinate'`,
                                Any: "",
                              },
                            })
                          )}`}
                        />
                      </>
                    ) : (
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
                        payload={{
                          SkillCategorieID: params.parentID1,
                          EmployeeID: EmpId,
                        }}
                        //inputProps={{ disabled: mode == "V" }}
                      />
                    )}

                    <TextField
                      name="Date"
                      type="date"
                      id="Date"
                      label={
                        <>
                          Date
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
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
                      InputProps={{
                        readOnly: mode === "A",
                      }}
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
                          //readOnly: mode == "V",
                        },
                      }}
                    />

                    {/* CHECKBOX */}
                    <Box>
                     {/* {AssessmentType === "Appraisal" ? (false) : (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
                      />
                     )} */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
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
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
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
                      //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>

                    {/* {(mode == "E" && AssessmentType === "Appraisal") ? (
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
                              ScheduleSaveFn(values, "harddelete");
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
