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
import { EventsmultiSelect, PartySingleSelect } from "../../../ui-components/global/Autocomplete";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../..";
import * as Yup from "yup";

// import CryptoJS from "crypto-js";
const EditAcademicsForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const data = useSelector((state) => state.formApi.Data) || {};
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
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
    const ViewStatus = state.ViewStatus;
    console.log("🚀 ~ EditOrder ~ ViewStatus:", ViewStatus)
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [academyImage, setAcademyImage] = useState("");

    useEffect(() => {
        dispatch(EventsgetData({ accessID: "TR385", get: "get", recID, Type: "A" }));
        setAcademyImage(mode === "A" ? "" : data?.Attachment || "");
    }, [location.key,mode]);


    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                let schemaFields = {
                    EventTitle: Yup.string()
                        .typeError(data.EventAcademics.EventTitle)
                        .required(data.EventAcademics.EventTitle),

                    EventDate: Yup.string()
                        .typeError(data.EventAcademics.EventDate)
                        .required(data.EventAcademics.EventDate),

                    EventType: Yup.string()
                        .typeError(data.EventAcademics.EventType)
                        .required(data.EventAcademics.EventType),

                    EventStartTime: Yup.string()
                        .typeError(data.EventAcademics.EventStartTime)
                        .required(data.EventAcademics.EventStartTime),
                    EventEndTime: Yup.string()
                        .typeError(data.EventAcademics.EventEndTime)
                        .required(data.EventAcademics.EventEndTime),
                    Message: Yup.string()
                        .typeError(data.EventAcademics.Message)
                        .required(data.EventAcademics.Message),
                    ApplicableTo: Yup.array()
                        .min(1, data.EventAcademics.ApplicableTo)
                        .required(data.EventAcademics.ApplicableTo),
                    Subject: Yup.array()
                        .min(1, data.EventAcademics.Subject)
                        .required(data.EventAcademics.Subject),
                    // PassingCriteria: Yup.string()
                    //     .typeError(data.EventAcademics.PassingCriteria)
                    //     .required(data.EventAcademics.PassingCriteria),
                };
                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];

    const InitialValue = {
        EventTitle: data.Title || "",
        EventType: data.Type || "",
        ApplicableTo: Array.isArray(data?.StdActivitiesID)
            ? data?.StdActivitiesID.map((d) => ({
                RecordID: String(d.StdActivitiesID),
                Name: d.StdActivitiesName,
                Code: d.StdActivitiesCode,
            }))
            : [],
        Subject: Array.isArray(data?.SubjectID)
            ? data?.SubjectID.map((d) => ({
                RecordID: String(d.SubjectID),
                Name: d.SubjectName,
                Code: d.SubjectCode,
            }))
            : [],
        Message: data.Description || "",
        PassingCriteria: data.PassingCriteria || "",
        ResultPublishdate: data.ResultPublishDate || "",
        EventDate: data.EventDate || "",
        EventStartTime: data.StartTime || "",
        EventEndTime: data.EndTime || "",
        WhatsApp: mode === "E" ? (data.NotifyWhatsapp === "Y" ? true : false) : true,
        Email: mode === "E" ? (data.NotifyEmail === "Y" ? true : false) : true,
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
            Title: values.EventTitle || "",
            EventDate: values.EventDate || "",
            EventType: values.EventType || "",
            StartTime: values.EventStartTime || "",
            EndTime: values.EventEndTime || "",
            ResultPublishDate: values.ResultPublishdate || "",
            PassingCriteria: values.PassingCriteria || "",
            Description: values.Message || "",
            Attachment: academyImage || "",
            StdActivitiesID:
                values?.ApplicableTo
                    ?.map((item) => item.RecordID)
                    .join(",")
                || "",
            SubjectID:
                values?.Subject
                    ?.map((item) => item.RecordID)
                    .join(",")
                || "",
            NotifyWhatsapp: values.WhatsApp === true ? "Y" : "N",
            NotifyEmail: values.Email === true ? "Y" : "N",
        };

        const response = await dispatch(EventspostData({ accessID: "TR385", action, Type: "A", idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg);

        }
    };

    const handleDateChange = (e, handleChange) => {
        const value = e.target.value;

        // allow empty
        if (!value) {
            handleChange(e);
            return;
        }

        // allow only YYYY-MM-DD typing structure
        if (!/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)) {
            return;
        }

        const parts = value.split("-");

        const month = parts[1];
        const day = parts[2];

        // validate month/day ranges
        if (
            (month && Number(month) > 12) ||
            (day && Number(day) > 31)
        ) {
            return;
        }

        handleChange(e);
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

    const getFileChange = async (event) => {
        setAcademyImage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setAcademyImage(fileData.payload.name);
        // sessionStorage.setItem("academyImage", fileData.payload.name);
        console.log(">>>", fileData.payload);
        console.log(
            "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
            fileData
        );
        if (fileData.payload.Status == "Y") {
            // console.log("I am here");
            toast.success(fileData.payload.Msg);
        }
    };
    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}`, {
                                        state: { ...state }
                                    })
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/A`, {
                                        state: { ...state }
                                    })
                                }}
                            >
                                {mode === "E" ? `Event(${state.BreadCrumb2 || ""})` : "Events"}
                            </Typography>

                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                            >
                                {mode === "E" ? "Add (Academic Event)" : "Edit (Academic Event)"}
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
                        }) => {
                            const handleChipClick = (item) => {
                                const currentValues = values.NotifyClasses || [];

                                if (currentValues.includes(item)) {
                                    setFieldValue(
                                        "NotifyClasses",
                                        currentValues.filter((val) => val !== item)
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
                                                name="EventTitle"
                                                // label="Event Title"
                                                label={
                                                    <>
                                                        Event Title
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventTitle}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.EventTitle && !!errors.EventTitle}
                                                helperText={touched.EventTitle && errors.EventTitle}
                                            />

                                            <TextField
                                                fullWidth
                                                select
                                                variant="standard"
                                                focused
                                                name="EventType"
                                                // label="Event Type"
                                                label={
                                                    <>
                                                        Event Type
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventType}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.EventType && !!errors.EventType}
                                                helperText={touched.EventType && errors.EventType}
                                            >
                                                <MenuItem value="UnitTest">Unit Test</MenuItem>
                                                <MenuItem value="Quaterly">Quaterly Exam</MenuItem>
                                                <MenuItem value="HalfYearly">Half Yearly Exam</MenuItem>
                                                <MenuItem value="Annual">Annual Exam</MenuItem>
                                                <MenuItem value="ResultDay">Result Day</MenuItem>
                                            </TextField>
                                        </Box>
                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <TextField
                                                fullWidth
                                                type="date"
                                                variant="standard"
                                                focused
                                                name="EventDate"
                                                // label="Event Date"
                                                label={
                                                    <>
                                                        Event Date
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventDate}
                                                inputFormat="YYYY-MM-DD"
                                                onBlur={handleBlur}
                                                // onChange={handleChange}
                                                onChange={(e) => handleDateChange(e, handleChange)}
                                                error={!!touched.EventDate && !!errors.EventDate}
                                                helperText={touched.EventDate && errors.EventDate}
                                            />
                                            <TextField
                                                fullWidth
                                                type="time"
                                                variant="standard"
                                                focused
                                                name="EventStartTime"
                                                // label="Start Time"
                                                label={
                                                    <>
                                                        Start Time
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventStartTime}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.EventStartTime && !!errors.EventStartTime}
                                                helperText={touched.EventStartTime && errors.EventStartTime}
                                            />
                                            <TextField
                                                fullWidth
                                                type="time"
                                                variant="standard"
                                                focused
                                                name="EventEndTime"
                                                // label="End Time"
                                                label={
                                                    <>
                                                        End Time
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventEndTime}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    const endTime = e.target.value;
                                                    const startTime = values.EventStartTime;

                                                    if (!startTime) {
                                                        handleChange(e);
                                                        return;
                                                    }

                                                    const start = new Date(`1970-01-01T${startTime}`);
                                                    const end = new Date(`1970-01-01T${endTime}`);

                                                    if (end <= start) {
                                                        setFieldValue("EventEndTime", "");
                                                        toast.error("End Time cannot be lesser than or equal to Start Time")
                                                        return;
                                                    }

                                                    handleChange(e);
                                                }}
                                                error={!!touched.EventEndTime && !!errors.EventEndTime}
                                                helperText={touched.EventEndTime && errors.EventEndTime}
                                            />


                                        </Box>
                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <TextField
                                                fullWidth
                                                type="date"
                                                variant="standard"
                                                focused
                                                name="ResultPublishdate"
                                                label="Result Publish date"
                                                id="ResultPublishdate"
                                                value={values.ResultPublishdate}
                                                inputFormat="YYYY-MM-DD"
                                                onBlur={handleBlur}
                                                // onChange={handleChange}
                                                onChange={(e) => handleDateChange(e, handleChange)}
                                                error={!!touched.ResultPublishdate && !!errors.ResultPublishdate}
                                                helperText={touched.ResultPublishdate && errors.ResultPublishdate}
                                            />
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="standard"
                                                focused
                                                name="PassingCriteria"
                                                id="PassingCriteria"
                                                placeholder="eg. Enter Minimum Marks"
                                                label="Passing Criteria"
                                                // label={
                                                //     <>
                                                //         Passing Criteria
                                                //         <span style={{ color: "red", fontSize: "20px" }}>
                                                //             *
                                                //         </span>
                                                //     </>
                                                // }
                                                value={values.PassingCriteria}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.PassingCriteria && !!errors.PassingCriteria}
                                                helperText={touched.PassingCriteria && errors.PassingCriteria}
                                            />

                                        </Box>

                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                                            gap={2}
                                        >


                                            <EventsmultiSelect
                                                id="ApplicableTo"
                                                name="ApplicableTo"
                                                label={
                                                    <>
                                                        Applicable To
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                variant="standard"
                                                focused
                                                value={values.ApplicableTo}
                                                onChange={(event, newValue) => {
                                                    setFieldValue("ApplicableTo", newValue);
                                                }}
                                                error={!!touched.ApplicableTo && !!errors.ApplicableTo}
                                                helperText={touched.ApplicableTo && errors.ApplicableTo}
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

                                            <EventsmultiSelect
                                                id="Subject"
                                                name="Subject"
                                                label={
                                                    <>
                                                        Subjects
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                variant="standard"
                                                focused
                                                value={values.Subject}
                                                onChange={(event, newValue) => {
                                                    setFieldValue("Subject", newValue);
                                                }}
                                                error={!!touched.Subject && !!errors.Subject}
                                                helperText={touched.Subject && errors.Subject}
                                                InputLabelProps={{
                                                    shrink: true, // ✅ prevents overlap
                                                }}
                                                url={`${listViewurl}?data=${JSON.stringify({
                                                    Query: {
                                                        AccessID: "2184",
                                                        ScreenName: "Subjects",
                                                        VerticalLicense: "003",
                                                        Filter: `parentID='${CompanyID}' AND ProjectID IN (${values?.ApplicableTo
                                                            ?.map((item) => item.RecordID)
                                                            ?.join(",") || ""})`,
                                                        Any: "",
                                                    },
                                                })}`}
                                            />
                                        </Box>

                                        {/* MESSAGE */}
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="standard"
                                            focused
                                            rows={2}
                                            name="Message"
                                            // label="Preparation Notes"
                                            label={
                                                <>
                                                    Preparation Notes
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
                                                </>
                                            }
                                            placeholder="Topics, tips, reference materials.."
                                            value={values.Message}
                                            onChange={handleChange}
                                            error={!!touched.Message && !!errors.Message}
                                            helperText={touched.Message && errors.Message}
                                        />

                                        {/* ACTION + CONTACT */}
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
                                                    Attach Syllabus (PDF)
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
                                                        accept=".pdf"
                                                        // onChange={(event) => {
                                                        //     const file = event.currentTarget.files[0];
                                                        //     setFieldValue("SyllabusFile", file);
                                                        // }}
                                                        onChange={getFileChange}
                                                    />

                                                    <Typography
                                                        fontSize="14px"
                                                        color="#6B7280"
                                                    >
                                                        Click to upload PDF
                                                    </Typography>
                                                </Box>

                                                <Button
                                                    // size="small"
                                                    variant="contained"
                                                    component={"a"}
                                                    sx={{
                                                        marginTop:"10px",
                                                        width:"100%"
                                                    }}
                                                    onClick={() => {
                                                        data?.Attachment || academyImage
                                                            ? window.open(
                                                                academyImage
                                                                    ? store.getState().globalurl.attachmentUrl +
                                                                    academyImage
                                                                    : store.getState().globalurl.attachmentUrl +
                                                                    data?.Attachment,
                                                                "_blank"
                                                            )
                                                            : toast.error("Please Upload File");
                                                    }}
                                                >
                                                    View Uploaded File
                                                </Button>

                                            </Box>
                                        </Box>
                                        {/* <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <PartySingleSelect
                                                id="ApplicableTo"
                                                name="ApplicableTo"
                                                label={
                                                    <>
                                                        Applicable To
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                variant="standard"
                                                focused
                                                value={values.ApplicableTo}
                                                onChange={(newValue) => {
                                                    setFieldValue("ApplicableTo", newValue);
                                                }}
                                                error={!!touched.ApplicableTo && !!errors.ApplicableTo}
                                                helperText={touched.ApplicableTo && errors.ApplicableTo}
                                                InputLabelProps={{
                                                    shrink: true, // ✅ prevents overlap
                                                }}
                                                url={`${listViewurl}?data=${JSON.stringify({
                                                    Query: {
                                                        AccessID: "2183",
                                                        ScreenName: "Subjects",
                                                        VerticalLicense: "003",
                                                        Filter: `CompanyID='${CompanyID}'`,
                                                        Any: "",
                                                    },
                                                })}`}
                                            />
                                        </Box> */}

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

                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                gap={1.5}
                                            >
                                                {[

                                                    {
                                                        label: "WhatsApp",
                                                        field: "WhatsApp",
                                                    },
                                                    {
                                                        label: "Email",
                                                        field: "Email",
                                                    },
                                                    // {
                                                    //     label: "Acknowledgement Required",
                                                    //     field: "Acknowledgement",
                                                    // },
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
                                                            color="primary"
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
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                loading={isLoading}
                                            >
                                                Publish Academic Event
                                            </LoadingButton>
                                            <Button
                                                startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/A`,
                                                    { state: { ...state } }
                                                )}
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

export default EditAcademicsForm;
