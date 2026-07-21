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
// import {
//   ManagerAppraisalPayload,
//   PeerAppraisalPayload,
//   SelfAppraisalPayload,
//   SingleFormikSkillAutocomplete,
//   SingleFormikSkillAutocompletePayload,
//   SubordinateAppraisalPayload,
// } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import { breadcrumbStyles } from "../../../Theme";

const EditHSNMaster = () => {
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
  const HSNCategoryID = params.parentID1;

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
        const schema = Yup.object().shape({
          Description: Yup.string().trim().required(data.HSNMaster.Description),
          Code: Yup.string().trim().required(data.HSNMaster.Code),
          HSNIGST: Yup.number().typeError(data.HSNMaster.HSNIGST).required(data.HSNMaster.HSNIGST),
          HSNCGST: Yup.number().typeError(data.HSNMaster.HSNCGST).required(data.HSNMaster.HSNCGST),
          HSNSGST: Yup.number().typeError(data.HSNMaster.HSNSGST).required(data.HSNMaster.HSNSGST),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const curDate = new Date().toISOString().split("T")[0];
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
      CompanyID: CompanyID,
      Code: values.Code,
      HSNCategoryID: HSNCategoryID,
      Description: values.Description || "",
      IGST: values.HSNIGST,
      CGST: values.HSNCGST,
      SGST: values.HSNSGST,
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
          navigate(`/Apps/Secondarylistview/HSN/${params.accessID}/${screenName}/${params.parentID2}/${params.parentID1}`,
            { state: state }
          );
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
    Description: Data.Description || "",
    HSNIGST: Data.IGST || "0.00",
    HSNCGST: Data.CGST || "0.00",
    HSNSGST: Data.SGST || "0.00",
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };

  return (
    <>
      <React.Fragment> 
              <Box sx={{ height: "100vh", overflow: "auto" }}>
        
        <Paper
          elevation={0}
          sx={{
            mx: 2,
            mt: 2,
            mb: 1,
            p: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            background: "#fff",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
 <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    // mb: 0.2,
                    px: 1,
                    py: 0.2,
                  }}
                >
                  {mode === "A"
                    ? "New HSN Master"
                    : mode === "E"
                      ? "Edit HSN Master"
                      : "View HSN Master"}
                </Typography>
              <Breadcrumbs
             separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                             sx={breadcrumbStyles.separator}
              >
                <Typography
                   sx={breadcrumbStyles.item}
                  onClick={() =>
                    navigate("/Apps/TR316/HSN%20Category")
                  }
                >
                  List Of HSN Category ({state.BreadCrumb1})
                </Typography>

                <Typography
                   sx={breadcrumbStyles.item}
                  onClick={() => navigate(-1)}
                >
                  {mode === "E"
                    ? `List Of HSN Master (${state.BreadCrumb2})`
                    : "List Of HSN Master"}
                </Typography>

                <Typography
                   sx={breadcrumbStyles.active}
                >
                  {mode === "A"
                    ? "New"
                    : mode === "E"
                      ? "Edit"
                      : "View"}
                </Typography>
              </Breadcrumbs>
            </Box>
    </Box>
            <Box display="flex" gap={1}>
              <Tooltip title="Close">
                <IconButton
                  onClick={() => fnLogOut("Close")}
                  sx={{
                    bgcolor: "#FEF2F2",
                    color: "#DC2626",
                    "&:hover": {
                      bgcolor: "#FEE2E2",
                    },
                  }}
                >
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Logout">
                <IconButton
                  onClick={() => fnLogOut("Logout")}
                  sx={{
                    bgcolor: "#FEF2F2",
                    color: "#DC2626",
                    "&:hover": {
                      bgcolor: "#FEE2E2",
                    },
                  }}
                >
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        {!getLoading ? (
          <Paper
            elevation={0}
            sx={{
              m: 2,
              p: 2,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              background: "#fff",
            }}
          >
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
                      {/* ----- CARD HEADER ----- */}
                                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                          <Box
                                            sx={{
                                              width: 32,
                                              height: 32,
                                              borderRadius: "50%",
                                              backgroundColor: "#EFF6FF",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <Typography sx={{ fontSize: 16 }}>🏷️</Typography>
                                          </Box>
                                          <Box>
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight={700}
                                              color="#0D94885"
                                            >
                                             HSN Master
                                            </Typography>
                  
                                            <Typography variant="body2" color="text.secondary">
                                              Manage HSN codes, GST classifications, and product tax categories.
                                            </Typography>
                                          </Box>
                                        </Box>
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
                    {/* {CompanyAutoCode == "Y" ? (
                      <TextField
                        name="Code"
                        type="text"
                        id="Code"
                        label="Code"
                        placeholder="Auto"
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        sx={{
                          backgroundColor: "#ffffff",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ",
                          },
                        }}
                        InputProps={{ readOnly: true }}
                      // autoFocus
                      />
                    ) : ( */}
                    <TextField
                      name="Code"
                      type="text"
                      id="Code"
                      label={
                        <>
                          HSN Master Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      //focused
                      // required
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      sx={{
                        backgroundColor: "#ffffff",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ",
                        },
                      }}
                      autoFocus
                    />
                    {/* )} */}
                    <TextField
                      name="Description"
                      type="text"
                      id="Description"
                      label={
                        <span>
                          HSN Master Description{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="outlined"
                      size="small"
                      //focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                    />

                    <TextField
                      name="HSNCGST"
                      type="number"
                      id="HSNCGST"
                      label="CGST(In Percentage)"
                      // label={
                      //   <span>
                      //     CGST(In Percentage)
                      //     <span style={{
                      //       fontSize: "20px",
                      //       color: "red"
                      //     }}>
                      //       *
                      //     </span>
                      //   </span>
                      // }
                      variant="outlined"
                      size="small"
                      //focused
                      value={values.HSNCGST}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(val)) {
                          setFieldValue("HSNCGST", val);
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        let val = e.target.value;
                        if (val === "" || val === ".") {
                          setFieldValue("HSNCGST", "0.00");
                          return;
                        }
                        if (!val.includes(".")) {
                          val = `${val}.00`;
                        }
                        const num = Number(val);
                        setFieldValue("HSNCGST", num.toFixed(2));
                      }}
                      error={!!touched.HSNCGST && !!errors.HSNCGST}
                      helperText={touched.HSNCGST && errors.HSNCGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNSGST"
                      type="number"
                      id="HSNSGST"
                      label="SGST(In Percentage)"
                      // label={
                      //   <span>
                      //     SGST(In Percentage)
                      //     <span style={{
                      //       fontSize: "20px",
                      //       color: "red"
                      //     }}>
                      //       *
                      //     </span>
                      //   </span>
                      // }
                      variant="outlined"
                      size="small"
                      //focused
                      value={values.HSNSGST}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(val)) {
                          setFieldValue("HSNSGST", val);
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        let val = e.target.value;
                        if (val === "" || val === ".") {
                          setFieldValue("HSNSGST", "0.00");
                          return;
                        }
                        if (!val.includes(".")) {
                          val = `${val}.00`;
                        }
                        const num = Number(val);
                        setFieldValue("HSNSGST", num.toFixed(2));
                      }}
                      error={!!touched.HSNSGST && !!errors.HSNSGST}
                      helperText={touched.HSNSGST && errors.HSNSGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNIGST"
                      type="number"
                      id="HSNIGST"
                      label="IGST(In Percentage)"
                      // label={
                      //   <span>
                      //     IGST(In Percentage)
                      //     <span style={{
                      //       fontSize: "20px",
                      //       color: "red"
                      //     }}>
                      //       *
                      //     </span>
                      //   </span>
                      // }
                      variant="outlined"
                      size="small"
                      value={values.HSNIGST}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(val)) {
                          setFieldValue("HSNIGST", val);
                        }
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        let val = e.target.value;
                        if (val === "" || val === ".") {
                          setFieldValue("HSNIGST", "0.00");
                          return;
                        }
                        if (!val.includes(".")) {
                          val = `${val}.00`;
                        }
                        const num = Number(val);
                        setFieldValue("HSNIGST", num.toFixed(2));
                      }}
                      error={!!touched.HSNIGST && !!errors.HSNIGST}
                      helperText={touched.HSNIGST && errors.HSNIGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
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
                      //focused
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
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
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={4}
                  >
                    <LoadingButton
                      loading={isLoading}
                      type="submit"
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#0D9488",
                        "&:hover": {
                          bgcolor: "#0F766E",
                        },
                      }}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        </Box>
      </React.Fragment>
    </>
  );
};

export default EditHSNMaster;

