import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  LinearProgress,
  IconButton,
  Breadcrumbs,
  Tooltip,
} from "@mui/material";

import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getFetchData, postData } from "../../../store/reducers/Formapireducer";

import { fileUpload } from "../../../store/reducers/Imguploadreducer";

import {
  EditAutoComplete,
  PartySingleSelect,
} from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProSidebar } from "react-pro-sidebar";
import * as Yup from "yup";
import { breadcrumbStyles } from "../../../Theme";
const RaiseComplaints = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const mode = params.Mode;
  const recID = params.id;

  const location = useLocation();
  const state = location.state || {};
  const data = useSelector((state) => state.formApi.Data || {});
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const imageLoading = useSelector((state) => state.imageApi.imgLoading);

  const listViewurl = useSelector((state) => state.globalurl.listViewurl);

  const compID = sessionStorage.getItem("compID");

  const loginrecordID = sessionStorage.getItem("loginrecordID");

  const Subscriptionlastthree =
    sessionStorage.getItem("SubscriptionCode")?.slice(-3) || "";

  const { toggleSidebar, broken, rtl } = useProSidebar();

  const [ptaImage, setPtaImage] = useState("");
  const [validationSchema, setValidationSchema] = useState(null);
  const [errorMsgData, setErrorMsgData] = useState(null);
  // =========================================
  // FETCH
  // =========================================

  useEffect(() => {
    dispatch(
      getFetchData({
        accessID: "TR391",
        get: "get",
        recID,
      }),
    );
  }, [dispatch, recID, mode]);

  // =========================================
  // EDIT IMAGE
  // =========================================

  useEffect(() => {
    if ((mode === "E" || mode === "V") && data) {
      setPtaImage(data.Attachements || "");
    }
  }, [data, mode]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        let schemaFields = {
          Title: Yup.string()
            .typeError(data.RaiseComplaints.EventTitle)
            .required(data.RaiseComplaints.EventTitle),

          Priority: Yup.string()
            .typeError(data.RaiseComplaints.Priority)
            .required(data.RaiseComplaints.Priority),

          Description: Yup.string()
            .typeError(data.RaiseComplaints.Description)
            .required(data.RaiseComplaints.Description),
          Standard: Yup.object()
            .typeError(data.RaiseComplaints.Standard)
            .required(data.RaiseComplaints.Standard)
            .nullable(),

          Student: Yup.object()
            .typeError(data.RaiseComplaints.Student)
            .required(data.RaiseComplaints.Student)
            .nullable(),
        };
        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  // =========================================
  // INITIAL VALUES
  // =========================================

  const InitialValues = {
    Title: data?.Title || "",

    Priority: data?.Priority || "",

    Description: data?.Description || "",

    FeedbacksResponse: data?.FeedbackResponse || "",

    Standard: data?.StandardID
      ? {
          RecordID: data.StandardID,
          Name: data.StandardName,
          Code: data.StandardCode,
        }
      : null,

    Student: data?.StudentID
      ? {
          // RecordID: data.StudentID,
          EmployeeID: data.StudentID,
          Name: data.StudentName,
          Code: data.StudentCode || "",
        }
      : null,
    Teacher: data?.TeacherID
      ? {
          // RecordID: data.TeacherID,
          EmployeeID: data.TeacherID,
          Name: data.TeacherName,
          Code: data.TeacherCode || "",
        }
      : null,
  };

  // =========================================
  // FILE UPLOAD
  // =========================================

  const getFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only Images, PDF and DOCX files are allowed");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", "images");

    const fileData = await dispatch(fileUpload({ formData }));

    if (fileData.payload.Status === "Y") {
      setPtaImage(fileData.payload.name);

      toast.success(fileData.payload.Msg);
    } else {
      toast.error(fileData.payload.Msg);
    }
  };

  // =========================================
  // SAVE
  // =========================================

  const Fnsave = async (values) => {
    const action = mode === "A" ? "insert" : mode === "E" ? "update" : "insert";

    const idata = {
      RecordID: recID,

      CompanyID: compID,

      CategoryID: "1",

      StandardID: values.Standard?.RecordID || 0,

      StudentID: values.Student?.EmployeeID || 0,

      // StudentName:values.Student?.Name || "",

      Title: values.Title || "",

      Priority: values.Priority || "Low",

      Description: values.Description || "",

      FeedbacksResponse: values.FeedbacksResponse || "",

      Attachments: ptaImage,

      SortOrder: "1",

      Disable: "N",

      DeleteFlag: "N",

      GivenBy: loginrecordID,

      Status: "Applied",

      Type: "T",
    };

    console.log("SUBMIT DATA", idata);

    const response = await dispatch(
      postData({
        accessID: "TR391",
        action,
        idata,
      }),
    );

    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);

      navigate(-1);
    } else {
      toast.error(response?.payload?.Msg || "Something went wrong");
    }
  };

  const fnLogOut = (props) => {
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
          navigate("/Apps/TR391/Escalation");
        }
      } else {
        return;
      }
    });
  };
  return (
    <>
      {getLoading && <LinearProgress />}
      {imageLoading && <LinearProgress />}
      <Box sx={{ height: "100vh", overflow: "auto" }}>
           <Paper
                          elevation={0}
                          sx={{
                            mx: 2,
                            mt: 1,
                            mb: 1,
                            p: 1,
                            borderRadius: 3,
                            border: "1px solid #E5E7EB",
                            bgcolor: "#fff",
                          }}
                        >
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" borderRadius="3px" alignItems="center">
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
                                                             {mode === "A" ? "New Escalation" : mode === "V" ? "View Escalation" : "Edit Escalation"}
                                                           </Typography>
                  <Breadcrumbs
                  sx={breadcrumbStyles.separator}
                    maxItems={2}
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                  >
                    <Typography
                     sx={breadcrumbStyles.item}
                      onClick={() => {
                        // navigate("/Apps/TR243/Party");
                        navigate("/Apps/TR391/Escalation");
                      }}
                    >
                      {/* {mode === "E" || mode === "V" ? `List Of Feedback/Complaints(${state.Breadcrumb1 || ""})` : `List Of Feedback/Complaints`} */}
                      {mode === "E" || mode === "V"
                        ? `List Of Escalation(${state.Breadcrumb1 || ""})`
                        : `List Of Escalation`}
                    </Typography>
                    <Typography
                     sx={breadcrumbStyles.active}
                    >
                      {/* {mode === "E" ? "Edit Feedback/Complaint" : mode === "V" ? "View Feedback/Complaint" : "Add Feedback/Complaint"} */}
                      {mode === "E"
                        ? "Edit Escalation"
                        : mode === "V"
                          ? "View Escalation"
                          : "Add Escalation"}
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
                    <IconButton
                      color="error"
                      onClick={() => fnLogOut("Logout")}
                    >
                      <LogoutOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
      
          {!getLoading ? (
            <Box
              display="flex"
              gap={3}
              alignItems="flex-start"
              flexWrap="wrap"
              sx={{ p: 1 }}
            >
              <Box
                flex={1}
                minWidth={0}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <Paper
                  elevation={3}
                  sx={{
                    margin: "10px",
                    backgroundColor: "#ffff",
                    border: "1px solid #b9bcc0",
                    borderRadius: 3,
                  }}
                >
                  <Formik
                    initialValues={InitialValues}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      Fnsave(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      errors,
                      touched,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        {/* ----- CARD HEADER ----- */}
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1.5}
                          mb={1}
                          sx={{ px: 2, pt: 2 }}
                        >
                          {/* ICON */}
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              backgroundColor: "#EFF6FF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography sx={{ fontSize: 18 }}>⚠️</Typography>
                          </Box>

                          {/* TITLE + SUBTITLE */}
                          <Box>
                            <Typography
                              variant="subtitle1"
                              fontWeight={700}
                              color="#0D94885"
                            >
                              Escalation
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              Manage and track escalated issues efficiently
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          padding={1}
                          gap={3}
                        >
                          {/* FORM */}

                          <Box
                            display="grid"
                            gridTemplateColumns={{
                              xs: "1fr",
                              md: "1fr 1fr",
                            }}
                            gap={3}
                          >
                            {/* TITLE */}

                            <TextField
                              fullWidth
                              variant="outlined"
                              size="small"
                              focused
                              name="Title"
                              id="Title"
                              label="Title"
                              label={
                                <>
                                  Title
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              value={values.Title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={!!touched.Title && !!errors.Title}
                              helperText={touched.Title && errors.Title}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            />

                            {/* PRIORITY */}

                            <TextField
                              fullWidth
                              select
                              variant="outlined"
                              size="small"
                              focused
                              name="Priority"
                              id="Priority"
                              // label="Priority"
                              label={
                                <>
                                  Priority
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              value={values.Priority}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={!!touched.Priority && !!errors.Priority}
                              helperText={touched.Priority && errors.Priority}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            >
                              <MenuItem value="Low">Low</MenuItem>

                              <MenuItem value="Medium">Medium</MenuItem>

                              <MenuItem value="High">High</MenuItem>
                            </TextField>

                            {/* STANDARD */}

                            <PartySingleSelect
                              id="Standard"
                              name="Standard"
                              label={
                                <>
                                  Standard/Activities
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              variant="outlined"
                              value={values.Standard}
                              onChange={(newValue) => {
                                setFieldValue("Standard", newValue);
                                setFieldValue("Student", null);
                              }}
                              error={!!touched.Standard && !!errors.Standard}
                              helperText={touched.Standard && errors.Standard}
                              focused
                              InputLabelProps={{
                                shrink: true, // ✅ prevents overlap
                              }}
                              url={`${listViewurl}?data=${JSON.stringify({
                                Query: {
                                  AccessID: "2183",
                                  ScreenName: "Standard",
                                  VerticalLicense: "003",
                                  Filter: `CompanyID='${compID}'`,
                                  Any: "",
                                },
                              })}`}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            />

                            {/* STUDENT */}

                            <PartySingleSelect
                              id="Student"
                              name="Student"
                              label={
                                <>
                                  Student
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              variant="outlined"
                              focused
                              value={values.Student}
                              onChange={(newValue) => {
                                setFieldValue("Student", newValue);
                                // setFieldTouched("Student", true);
                              }}
                              error={!!touched.Student && !!errors.Student}
                              helperText={touched.Student && errors.Student}
                              InputLabelProps={{
                                shrink: true, // ✅ prevents overlap
                              }}
                              url={`${listViewurl}?data=${JSON.stringify({
                                Query: {
                                  AccessID: "2182",
                                  ScreenName: "Student",
                                  VerticalLicense: "003",
                                  Filter: `CompanyID='${compID}' AND ProjectID='${values?.Standard?.RecordID ? values?.Standard?.RecordID : ""}'`,
                                  Any: "",
                                },
                              })}`}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            />
                            <PartySingleSelect
                              id="Teacher"
                              name="Teacher"
                              label={
                                <>
                                  Teacher
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              variant="outlined"
                              focused
                              value={values.Teacher}
                              onChange={(newValue) => {
                                setFieldValue("Teacher", newValue);
                                // setFieldTouched("Teacher", true);
                              }}
                              error={!!touched.Teacher && !!errors.Teacher}
                              helperText={touched.Teacher && errors.Teacher}
                              InputLabelProps={{
                                shrink: true, // ✅ prevents overlap
                              }}
                              url={`${listViewurl}?data=${JSON.stringify({
                                Query: {
                                  AccessID: "2194",
                                  ScreenName: "Teacher",
                                  VerticalLicense: "003",
                                  Filter: `CompanyID='${compID}' AND ProjectID='${values?.Standard?.RecordID ? values?.Standard?.RecordID : ""}'`,
                                  Any: "",
                                },
                              })}`}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            />
                          </Box>

                          {/* DESCRIPTION */}

                          <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            focused
                            name="Description"
                            id="Description"
                            // label="Description"
                            label={
                              <>
                                Description
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </>
                            }
                            value={values.Description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              !!touched.Description && !!errors.Description
                            }
                            helperText={
                              touched.Description && errors.Description
                            }
                            disabled={mode === "V"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#fff",
                                borderRadius: "6px",

                                "& fieldset": {
                                  borderColor: "#d1d5db", // 👈 light grey border
                                },
                                "&:hover fieldset": {
                                  borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                  borderWidth: "1px",
                                },
                              },

                              "& .MuiInputLabel-root": {
                                color: "#6b7280", // label grey
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#6b7280", // keep same on focus
                              },
                            }}
                          />

                          {/* FEEDBACK */}

                          {mode !== "A" && (
                            <TextField
                              fullWidth
                              multiline
                              variant="outlined"
                              size="small"
                              focused
                              name="FeedbacksResponse"
                              label="Feedback Response"
                              value={values.FeedbacksResponse}
                              onChange={handleChange}
                              disabled={mode === "V"}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                            />
                          )}

                          {/* FILE */}

                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: "#6B7280",
                              }}
                            >
                              Upload Attachment
                            </Typography>

                            <Box
                              component="label"
                              sx={{
                                border: "1px dashed #D1D5DB",
                                borderRadius: "10px",
                                backgroundColor: "#F9FAFB",
                                height: "56px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                hidden
                                type="file"
                                accept="image/*,.pdf,.docx"
                                onChange={getFileChange}
                                disabled={mode === "V"}
                              />

                              <Typography fontSize="14px" color="#6B7280">
                                Click to upload file
                              </Typography>
                            </Box>

                            <Button
                              variant="contained"
                              sx={{
                                mt: 2,
                                width: "100%",
                              }}
                              onClick={() => {
                                const file = ptaImage || data?.Attachements;

                                if (file) {
                                  window.open(
                                    store.getState().globalurl.EssurlimageUrl +
                                      file,
                                    "_blank",
                                  );
                                } else {
                                  toast.error("Please Upload File");
                                }
                              }}
                            >
                              View Uploaded File
                            </Button>
                          </Box>

                          {/* BUTTONS */}

                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            gap={2}
                            mt={2}
                          >
                            <LoadingButton
                              sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                px: 4,
                                bgcolor: "#0D9488",
                                "&:hover": {
                                  bgcolor: "#0F766E",
                                },
                              }}
                              variant="contained"
                              type="submit"
                              loading={isLoading}
                              disabled={mode === "V"}
                            >
                              Save
                            </LoadingButton>

                            <Button
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                px: 4,
                                bgcolor: "#F97316",
                                "&:hover": {
                                  bgcolor: "#EA580C",
                                },
                              }}
                              onClick={() => navigate(-1)}
                            >
                              Back To List View
                            </Button>
                          </Box>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Paper>
              </Box>
            </Box>
          ) : (
            false
          )}
        </Box>
   
    </>
  );
};

export default RaiseComplaints;
