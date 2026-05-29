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

import {
  getFetchData,
  postData,
} from "../../../store/reducers/Formapireducer";

import { fileUpload } from "../../../store/reducers/Imguploadreducer";

import { EditAutoComplete, PartySingleSelect } from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProSidebar } from "react-pro-sidebar";
import * as Yup from "yup";
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

  const listViewurl = useSelector(
    (state) => state.globalurl.listViewurl
  );

  const compID = sessionStorage.getItem("compID");

  const loginrecordID =
    sessionStorage.getItem("loginrecordID");

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
      })
    );

  }, [dispatch, recID, mode]);

  // =========================================
  // EDIT IMAGE
  // =========================================

  useEffect(() => {
    if (mode === "E" && data) {
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

    FeedbacksResponse:
      data?.FeedbackResponse || "",

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
      toast.error(
        "Only Images, PDF and DOCX files are allowed"
      );
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", "images");

    const fileData = await dispatch(
      fileUpload({ formData })
    );

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
    const action =
      mode === "A"
        ? "insert"
        : mode === "E"
          ? "update"
          : "insert";

    const idata = {
      RecordID: recID,

      CompanyID: compID,

      CategoryID: "1",

      StandardID:
        values.Standard?.RecordID || 0,

      StudentID:
        values.Student?.EmployeeID || 0,

      // StudentName:values.Student?.Name || "",

      Title: values.Title || "",

      Priority: values.Priority || "Low",

      Description:
        values.Description || "",

      FeedbacksResponse:
        values.FeedbacksResponse || "",

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
      })
    );

    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);

      navigate(-1);
    } else {
      toast.error(
        response?.payload?.Msg ||
        "Something went wrong"
      );
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
          navigate("/Apps/TR391/RaiseComplaints");
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

      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
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
                  // navigate("/Apps/TR243/Party");
                  navigate("/Apps/TR391/RaiseComplaints");
                }}
              >
                {mode === "E" ? `List Of Feedback/Complaints(${state.Breadcrumb1 || ""})` : `List Of Feedback/Complaints`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {mode === "E" ? "Edit Feedback/Complaint" : mode === "V" ? "View Feedback/Complaint" : "Add Feedback/Complaint"}
              </Typography>
            </Breadcrumbs>
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
        <Paper
          elevation={3}
          sx={{
            margin: "10px",
            p: 3,
            background: "#fff",
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
                <Box
                  display="flex"
                  flexDirection="column"
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
                      variant="standard"
                      focused
                      name="Title"
                      id="Title"
                      label="Title"
                       label={
                        <>
                          Title
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      value={values.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Title && !!errors.Title}
                      helperText={touched.Title && errors.Title}
                    />

                    {/* PRIORITY */}

                    <TextField
                      fullWidth
                      select
                      variant="standard"
                      focused
                      name="Priority"
                      id="Priority"
                      // label="Priority"
                       label={
                        <>
                          Priority
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      value={values.Priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                       error={!!touched.Priority && !!errors.Priority}
                      helperText={touched.Priority && errors.Priority}
                    >
                      <MenuItem value="Low">
                        Low
                      </MenuItem>

                      <MenuItem value="Medium">
                        Medium
                      </MenuItem>

                      <MenuItem value="High">
                        High
                      </MenuItem>
                    </TextField>

                    {/* STANDARD */}

                    <PartySingleSelect
                      id="Standard"
                      name="Standard"
                      label={
                        <>
                          Standard/Activities
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
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
                    />

                    {/* STUDENT */}

                    <PartySingleSelect
                      id="Student"
                      name="Student"
                      label={
                        <>
                          Student
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
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
                    />
                  </Box>

                  {/* DESCRIPTION */}

                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="standard"
                    focused
                    name="Description"
                    id="Description"
                    // label="Description"
                    label={
                        <>
                          Description
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                    value={values.Description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Description && !!errors.Description}
                    helperText={touched.Description && errors.Description}
                  />

                  {/* FEEDBACK */}

                  {mode !== "A" && (
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      variant="standard"
                      focused
                      name="FeedbacksResponse"
                      label="Feedback Response"
                      value={
                        values.FeedbacksResponse
                      }
                      onChange={handleChange}
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
                        border:
                          "1px dashed #D1D5DB",
                        borderRadius: "10px",
                        backgroundColor:
                          "#F9FAFB",
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
                      />

                      <Typography
                        fontSize="14px"
                        color="#6B7280"
                      >
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
                        const file =
                          ptaImage ||
                          data?.Attachements;

                        if (file) {
                          window.open(
                            store.getState()
                              .globalurl
                              .attachmentUrl + file,
                            "_blank"
                          );
                        } else {
                          toast.error(
                            "Please Upload File"
                          );
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
                      color="primary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </LoadingButton>

                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        navigate(-1)
                      }
                    >
                      Back To List View
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}
    </>
  );
};

export default RaiseComplaints;