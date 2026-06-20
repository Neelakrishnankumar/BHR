import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  LinearProgress,
  Paper,
  MenuItem,
  Breadcrumbs,
  ButtonGroup,
  Badge,
  Chip,
  FormGroup,
  Switch,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { ArrowBack, CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  DefaultProductDeliveryChargeGet,
  EventsgetData,
  EventspostData,
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  EventsmultiSelect,
  PartySingleSelect,
} from "../../../ui-components/global/Autocomplete";
import * as Yup from "yup";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../..";
// import CryptoJS from "crypto-js";
const EditOtherEvents = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var Type = params.Type;
  console.log("🚀 ~ Editothers ~ Type:", Type);
  const data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const imageLoading = useSelector((state) => state.imageApi.imgLoading);
  const uploadLoading = useSelector((state) => state.imageApi.videoLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const LoginID = sessionStorage.getItem("loginrecordID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const location = useLocation();
  const state = location.state || {};

  const [buttonValue, setButtonValue] = useState("");
  console.log("🚀 ~ Editothers ~ buttonValue:", buttonValue);
  const [validationSchema, setValidationSchema] = useState(null);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [othersImage, setothersImage] = useState("");
  const [othersvideo, setothersvideo] = useState("");
    const [othersaudio, setothersaudio] = useState("");

  console.log("🚀 ~ Editothers ~ othersImage:", othersImage);
  console.log("🚀 ~ Editothers ~ othersvideo:", othersvideo);
  console.log("🚀 ~ Editothers ~ othersaudio:", othersaudio);

  useEffect(() => {
    dispatch(
      EventsgetData({ accessID: "TR385", get: "get", recID, Type: "O" }),
    );
    setButtonValue(mode === "A" ? "Y" : data?.SchoolorSpecific || "Y");
    setothersImage(mode === "A" ? "" : data?.Attachment || "");
    setothersvideo(mode === "A" ? "" : data?.Video || "");
    setothersaudio (mode === "A" ? "" : data?.Audio || "");
  }, [location.key, mode]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        let schemaFields = {
          othersTitle: Yup.string()
            .typeError(data.Eventothers.othersTitle)
            .required(data.Eventothers.othersTitle),

          Priority: Yup.string()
            .typeError(data.Eventothers.Priority)
            .required(data.Eventothers.Priority),

          Message: Yup.string()
            .typeError(data.Eventothers.Message)
            .required(data.Eventothers.Message),

          ContactPersonAndNumber: Yup.string()
            .typeError(data.Eventothers.ContactPersonAndNumber)
            .required(data.Eventothers.ContactPersonAndNumber),
        };

        if (buttonValue === "Y") {
          schemaFields.Standard1 = Yup.array()
            .min(1, data.Eventothers.Standard1)
            .required(data.Eventothers.Standard1);
        }

        if (buttonValue === "N") {
          schemaFields.Standard = Yup.object()
            .typeError(data.Eventothers.Standard)
            .required(data.Eventothers.Standard)
            .nullable();

          schemaFields.Student = Yup.object()
            .typeError(data.Eventothers.Student)
            .required(data.Eventothers.Student)
            .nullable();
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [buttonValue]);
  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split("T")[0];

  const InitialValue = {
    othersTitle: data?.Title || "",
    Priority: data?.Priority || "",
    NotifyClasses: [],
    Standard1: Array.isArray(data?.StandardID)
      ? data?.StandardID.map((d) => ({
          RecordID: String(d.StandardID),
          Name: d.StandardCode,
          Code: d.StandardName,
        }))
      : [],
    Standard: data?.SpecificStdActID
      ? {
          RecordID: data?.SpecificStdActID,
          Code: data?.SpecificStdActCode,
          Name: data?.SpecificStdActName,
        }
      : null,
    Student: data?.StudentID
      ? {
          // RecordID: data?.StudentID,
          EmployeeID: data?.StudentID,
          Code: data?.StudentCode,
          Name: data?.StudentName,
        }
      : null,
    Message: data?.Description || "",
    ActionRequired: data?.ActionRequired || "",
    ContactPersonAndNumber: data?.MobileNumber || "",
    Email: mode === "E" ? (data?.NotifyEmail === "Y" ? true : false) : true,
    WhatsApp:
      mode === "E" ? (data?.NotifyWhatsapp === "Y" ? true : false) : true,
    SMS: mode === "E" ? (data?.NotifySms === "Y" ? true : false) : true,
    Acknowledgement:
      mode === "E"
        ? data?.AcknowledgementRequired === "Y"
          ? true
          : false
        : true,
  };

  const Fnsave = async (values, del, override = {}) => {
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      RecordID: recID,
      EventCategoryID: params.parentID2,
      Title: values.othersTitle || "",
      CreatedDate: currentDate,
      StdActivitiesID:
        buttonValue === "Y"
          ? values?.Standard1?.map((item) => item.RecordID).join(",")
          : "" || "",
      SpecificStdActID:
        buttonValue === "N" ? values?.Standard?.RecordID : 0 || 0,
      StudentID: buttonValue === "N" ? values?.Student?.EmployeeID : "" || "",
      Priority: values.Priority || "",
      SchoolorSpecific: buttonValue || "",
      Description: values.Message || "",
      ActionRequired: values.ActionRequired || "",
      MobileNumber: values.ContactPersonAndNumber || "",
      NotifyWhatsapp: values.WhatsApp === true ? "Y" : "N",
      NotifySms: values.SMS === true ? "Y" : "N",
      NotifyEmail: values.Email === true ? "Y" : "N",
      AcknowledgementRequired: values.Acknowledgement === true ? "Y" : "N",
      // Attachment: othersImage || "",
      Attachment:
        fileCategory === "images" || fileCategory === "document"
          ? othersImage
          : "",
      Video: fileCategory === "videos" ? othersvideo : "",
      Audio: fileCategory === "audios" ? othersaudio : "",
      CreatedBy: LoginID,
    };

    const response = await dispatch(
      EventspostData({
        accessID: "TR385",
        action,
        Type: "O",
        idata,
        CompanyID,
      }),
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
      // navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/E`, {
      //     state: { ...state }
      // })
    } else {
      toast.error(response.payload.Msg);

      // dispatch(EventsgetData({ accessI:"TR385", get: "get", recID, Type: "E" }));
      // setButtonValue(data?.SchoolorSpecific ? data?.SchoolorSpecific : "Y")
    }
  };

  const handleButtonClick = (value) => {
    setButtonValue(value);
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
          navigate("/Apps/TR232/Role");
        }
      } else {
        return;
      }
    });
  };
  const [fileCategory, setFileCategory] = useState(""); // image | video | audio | document

  const getFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;

    let category = "";

 if (
  fileType.startsWith("image/") || // covers jpeg, png, jpg, webp
  fileType === "application/pdf" ||
  fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
) {
      category = "images";
    } else if (fileType.startsWith("video/")) {
      category = "videos";
    } else if (fileType.startsWith("audio/")) {
      category = "audios";
    }

    if (!category) {
      toast.error("Unsupported file type");
      return;
    }

    setFileCategory(category); // ✅ store type

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", category); // ✅ dynamic

    const fileData = await dispatch(fileUpload({ formData }));

    if (fileData.payload.Status === "Y") {
      setothersImage(fileData.payload.name); // store file name
      setothersvideo(fileData.payload.name);
      setothersaudio(fileData.payload.name);
      toast.success(fileData.payload.Msg);
    }
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      {imageLoading ? <LinearProgress /> : false}
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
                  navigate("/Apps/TR383/Academic%20Year");
                }}
              >
                {`Academic Year(${state.AcademicYear || ""})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  // navigate("/Apps/TR243/Party");
                  navigate(
                    `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
                    {
                      state: { ...state },
                    },
                  );
                }}
              >
                {`Event Category(${state.BreadCrumb1 || ""})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  // navigate("/Apps/TR243/Party");
                  navigate(
                    `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/E`,
                    {
                      state: { ...state },
                    },
                  );
                }}
              >
                {mode === "E" || mode === "V"
                  ? `Event(${state.BreadCrumb2 || ""})`
                  : "Events"}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {mode === "E"
                  ? "Edit Other Event"
                  : mode === "V"
                    ? "View Other Event"
                    : "Add Other Event"}
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
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
            }) => {
              const handleChipClick = (item) => {
                const currentValues = values.NotifyClasses || [];

                if (currentValues.includes(item)) {
                  setFieldValue(
                    "NotifyClasses",
                    currentValues.filter((val) => val !== item),
                  );
                } else {
                  setFieldValue("NotifyClasses", [...currentValues, item]);
                }
              };
              return (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    padding={3}
                  >
                    {/* TOP ROW */}
                    <Box
                      display="grid"
                      gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        focused
                        name="othersTitle"
                        // label="others Type"
                        label={
                          <>
                            Other Event Title
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.othersTitle}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.othersTitle && !!errors.othersTitle
                        }
                        helperText={
                          touched.othersTitle && errors.othersTitle
                        }
                      />

                      <TextField
                        fullWidth
                        select
                        variant="standard"
                        focused
                        name="Priority"
                        // label="Priority"
                        label={
                          <>
                            Priority
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        id="Priority"
                        value={values.Priority}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Priority && !!errors.Priority}
                        helperText={touched.Priority && errors.Priority}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                      </TextField>
                    </Box>

                    {/* WHO IS THIS ABOUT */}
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          fontWeight: 600,
                          color: "#6B7280",
                        }}
                      >
                        Who is this about?
                      </Typography>

                      <ButtonGroup
                        fullWidth
                        variant="contained"
                        sx={{
                          "& .MuiButton-root": {
                            py: 1.2,
                            fontWeight: 600,
                            borderRadius: 0,
                          },
                        }}
                      >
                        <Button
                          color={buttonValue === "Y" ? "primary" : "inherit"}
                          onClick={() => handleButtonClick("Y")}
                        >
                          Whole School / Class
                        </Button>

                        <Button
                          color={buttonValue === "N" ? "primary" : "inherit"}
                          onClick={() => handleButtonClick("N")}
                        >
                          Specific Student
                        </Button>
                      </ButtonGroup>
                    </Box>

                    {/* CLASS CHIPS */}
                    {buttonValue === "Y" ? (
                      <Box>
                        <EventsmultiSelect
                          id="Standard1"
                          name="Standard1"
                          label={
                            <>
                              Standard/Activities
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          variant="standard"
                          focused
                          value={values.Standard1}
                          onChange={(event, newValue) => {
                            setFieldValue("Standard1", newValue);
                            // setFieldTouched("Standard1", true);
                          }}
                          error={!!touched.Standard1 && !!errors.Standard1}
                          helperText={touched.Standard1 && errors.Standard1}
                          InputLabelProps={{
                            shrink: true, // ✅ prevents overlap
                          }}
                          url={`${listViewurl}?data=${JSON.stringify({
                            Query: {
                              AccessID: "2183",
                              ScreenName: "Standard",
                              VerticalLicense: "003",
                              Filter: `CompanyID='${CompanyID}'`,
                              Any: "",
                            },
                          })}`}
                        />
                      </Box>
                    ) : (
                      <Box
                        display="grid"
                        gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                        gap={2}
                      >
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
                              Filter: `CompanyID='${CompanyID}'`,
                              Any: "",
                            },
                          })}`}
                        />

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
                              Filter: `CompanyID='${CompanyID}' AND ProjectID='${values?.Standard?.RecordID ? values?.Standard?.RecordID : ""}'`,
                              Any: "",
                            },
                          })}`}
                        />
                      </Box>
                    )}

                    {/* MESSAGE */}
                    <TextField
                      fullWidth
                      multiline
                      variant="standard"
                      focused
                      rows={2}
                      name="Message"
                      // label="Message"
                      label={
                        <>
                          Message
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      placeholder="Describe the others clearly"
                      value={values.Message}
                      onChange={handleChange}
                      error={!!touched.Message && !!errors.Message}
                      helperText={touched.Message && errors.Message}
                    />

                    {/* ACTION + CONTACT */}
                    <Box
                      display="grid"
                      gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        name="ActionRequired"
                        variant="standard"
                        focused
                        label="Action Required"
                        placeholder="eg. Stay home, await notice"
                        value={values.ActionRequired}
                        onChange={handleChange}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        focused
                        name="ContactPersonAndNumber"
                        // label="Contact Person & Number"
                        label={
                          <>
                            Contact Person & Number
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        placeholder="eg. Ramesh- 8596748596"
                        value={values.ContactPersonAndNumber}
                        onChange={handleChange}
                        error={
                          !!touched.ContactPersonAndNumber &&
                          !!errors.ContactPersonAndNumber
                        }
                        helperText={
                          touched.ContactPersonAndNumber &&
                          errors.ContactPersonAndNumber
                        }
                      />
                    </Box>

                    <Box
                      display="grid"
                      gridTemplateColumns={isNonMobile ? "1fr" : "1fr"}
                      gap={2}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#6B7280",
                          }}
                        >
                          Attach others
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
                            transition: "0.2s",
                            "&:hover": {
                              backgroundColor: "#F3F4F6",
                            },
                          }}
                        >
                          <input
                            hidden
                            type="file"
                            accept="image/*,video/*,audio/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            // accept="image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            // onChange={(event) => {
                            //     const file = event.currentTarget.files[0];
                            //     setFieldValue("SyllabusFile", file);
                            // }}
                            onChange={getFileChange}
                          />

                          <Typography fontSize="14px" color="#6B7280">
                            Click to upload file
                          </Typography>
                        </Box>

                        <Button
                          // size="small"
                          variant="contained"
                          component={"a"}
                          sx={{
                            marginTop: "10px",
                            width: "100%",
                          }}
                          onClick={() => {
                            data?.Attachment || othersImage
                              ? window.open(
                                  othersImage
                                    ? store.getState().globalurl.attachmentUrl +
                                        othersImage
                                    : store.getState().globalurl.attachmentUrl +
                                        data?.Attachment,
                                  "_blank",
                                )
                              : data?.Video || othersvideo
                                ? window.open(
                                    othersvideo
                                      ? store.getState().globalurl
                                          .videoAttachmentUrl + othersvideo
                                      : store.getState().globalurl
                                          .videoAttachmentUrl + data?.Video,
                                    "_blank",
                                  )
                                : data?.Audio || othersaudio
                                  ? window.open(
                                      othersaudio
                                        ? store.getState().globalurl
                                            .audioAttachmentUrl + othersaudio
                                        : store.getState().globalurl
                                            .audioAttachmentUrl + data?.Audio,
                                      "_blank",
                                    )
                                  : toast.error("Please Upload File");
                          }}
                        >
                          View Uploaded File
                        </Button>
                      </Box>
                    </Box>
                    {/* NOTIFY OPTIONS */}
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: "#6B7280",
                        }}
                      >
                        Notify Via
                      </Typography>

                      <Box display="flex" flexDirection="column" gap={1.5}>
                        {[
                          {
                            label: "Mail",
                            field: "Email",
                          },
                          {
                            label: "WhatsApp",
                            field: "WhatsApp",
                          },
                          {
                            label: "SMS",
                            field: "SMS",
                          },
                          {
                            label: "Acknowledgement Required",
                            field: "Acknowledgement",
                          },
                        ].map((item) => (
                          <Box
                            key={item.field}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              borderBottom: "1px solid #E5E7EB",
                              pb: 1,
                            }}
                          >
                            <Typography fontSize="14px">
                              {item.label}
                            </Typography>

                            <Switch
                              color="error"
                              checked={values[item.field]}
                              onChange={(e) =>
                                setFieldValue(item.field, e.target.checked)
                              }
                            />
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* BUTTONS */}
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      gap={2}
                      mt={2}
                    >
                      <LoadingButton
                        color="error"
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        disabled={mode === "V" || imageLoading}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                        variant="outlined"
                        color="warning"
                        onClick={() =>
                          navigate(
                            `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/E`,
                            { state: { ...state } },
                          )
                        }
                      >
                        Back To Events List
                      </Button>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditOtherEvents;
