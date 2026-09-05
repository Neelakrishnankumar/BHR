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
    CircularProgress
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
import { breadcrumbStyles } from "../../../Theme";
import CloseIcon from "@mui/icons-material/Close";
// import CryptoJS from "crypto-js";
const EditGeneral = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    var Type = params.Type;
    console.log("  EditEmergency  Type:", Type);
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

    const [buttonValue, setButtonValue] = useState("Y");
    console.log("  EditEmergency  buttonValue:", buttonValue);
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);

    // ---------------- SEPARATE UPLOAD SLOTS ----------------
const [emergencyImage1, setEmergencyImage1] = useState("");
const [emergencyImage2, setEmergencyImage2] = useState("");
const [emergencyImage3, setEmergencyImage3] = useState("");
const [emergencyvideo, setEmergencyvideo] = useState("");

const [uploadingSlot, setUploadingSlot] = useState(null);

    console.log("  EditEmergency  emergencyImage1:", emergencyImage1);
    console.log("  EditEmergency  emergencyImage2:", emergencyImage2);
    console.log("  EditEmergency  emergencyImage3:", emergencyImage3);
    console.log("  EditEmergency  emergencyvideo:", emergencyvideo);

        useEffect(() => {
        if (mode === "E" || mode === "V" || mode === "A") {
            dispatch(
            EventsgetData({
                accessID: "TR385",
                get: "get",
                recID,
                Type: "G",
            })
            );
        }
        }, [mode, recID, dispatch]);

        // Set states AFTER API response
        useEffect(() => {
        if (!data) return;

        if (mode === "A") {
            setEmergencyImage1("");
            setEmergencyImage2("");
            setEmergencyImage3("");
            setEmergencyvideo("");
            return;
        }

        setButtonValue(data?.SchoolorSpecific || "Y");

        setEmergencyImage1(data?.Attachment1 || "");
        setEmergencyImage2(data?.Attachment2 || "");
        setEmergencyImage3(data?.Attachment3 || "");
        setEmergencyvideo(data?.Video || "");
        }, [data, mode]);
console.log(emergencyImage1,emergencyImage2,emergencyImage3,emergencyvideo,"emergencyvideo");
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                let schemaFields = {
                    Eventtype: Yup.string()
                        .typeError(data.EventGeneral.Eventtype)
                        .required(data.EventGeneral.Eventtype),

                    EventDate: Yup.string()
                        .typeError(data.EventGeneral.EventDate)
                        .required(data.EventGeneral.EventDate),

                    Message: Yup.string()
                        .typeError(data.EventGeneral.Message)
                        .required(data.EventGeneral.Message),

                    Title: Yup.string()
                        .typeError(data.EventGeneral.Title)
                        .required(data.EventGeneral.Title),
                };

                if (buttonValue === "Y") {
                    schemaFields.Standard1 = Yup.array()
                        .min(1, data.EventGeneral.Standard1)
                        .required(data.EventGeneral.Standard1);
                }

                if (buttonValue === "N") {
                    schemaFields.Standard = Yup.object()
                        .typeError(data.EventGeneral.Standard)
                        .required(data.EventGeneral.Standard)
                        .nullable();

                    schemaFields.Student = Yup.object()
                        .typeError(data.EventGeneral.Student)
                        .required(data.EventGeneral.Student)
                        .nullable();
                }

                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [buttonValue]);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];
    const handleRemoveFile = (slot) => {
        if (uploadingSlot === slot.key) return;

        slot.setValue("");
    };
    const InitialValue = {
        Title: data?.Title || "",
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
        // AddressedTo: data.AddressedTo || "",
        Eventtype: data?.Category || "",
        EventDate: data?.CreatedDate || currentDate,

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
            Title: values.Title || "",
            Category: values.Eventtype || "",
            CreatedDate: values.EventDate || currentDate,
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
            Attachment1: emergencyImage1,
            Attachment2: emergencyImage2,
            Attachment3: emergencyImage3,
            Video: emergencyvideo,
            // Attachment1: emergencyImage1 || data?.Attachment1,
            // Attachment2: emergencyImage2 || data?.Attachment2,
            // Attachment3: emergencyImage3 || data?.Attachment3,
            // Video: emergencyvideo || data?.Video,
            CreatedBy: LoginID,
            // AddressedTo: values.AddressedTo || "",
        };
console.log(idata, "idata");
        const response = await dispatch(
            EventspostData({
                accessID: "TR385",
                action,
                Type: "G",
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

    // ---------------- SEPARATE UPLOAD HANDLERS ----------------
    const handleImageSlotChange = async (
        event,
        setImageValue,
        slotKey
    ) => {
        const file = event.target.files[0];

        if (!file) return;

        const fileType = file.type;

        const isAllowed =
            fileType.startsWith("image/") ||
            fileType === "application/pdf" ||
            fileType ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        if (!isAllowed) {
            toast.error(
                "Only Images, PDF and DOCX files are allowed"
            );
            return;
        }

        try {
            // IMPORTANT: set this BEFORE dispatch
            setUploadingSlot(slotKey);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "images");

            const fileData = await dispatch(
                fileUpload({ formData })
            );

            if (fileData.payload.Status === "Y") {
                setImageValue(fileData.payload.name);
                toast.success(fileData.payload.Msg);
            } else {
                toast.error(fileData.payload.Msg);
            }
        } catch (error) {
            toast.error("File upload failed");
        } finally {
            setUploadingSlot(null);
        }
    };

    // Dedicated handler for the single video slot (accepts video only)
    const handleVideoSlotChange = async (
        event,
        slotKey
    ) => {
        const file = event.target.files[0];

        if (!file) return;

        const fileType = file.type;

        if (!fileType.startsWith("video/")) {
            toast.error("Only Video files are allowed");
            return;
        }

        try {
            setUploadingSlot(slotKey);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "videos");

            const fileData = await dispatch(
                fileUpload({ formData })
            );

            if (fileData.payload.Status === "Y") {
                setEmergencyvideo(fileData.payload.name);
                toast.success(fileData.payload.Msg);
            } else {
                toast.error(fileData.payload.Msg);
            }
        } catch (error) {
            toast.error("File upload failed");
        } finally {
            setUploadingSlot(null);
        }
    };

    // Config-driven list of the 4 upload slots so they can be rendered in a single row
    const uploadSlots = [
        {
            key: "image1",
            label: "Image 1",
            value: emergencyImage1,
            setValue: setEmergencyImage1,
            accept: "image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            kind: "image",
            urlKey: "attachmentUrl",
            fallback: data?.Attachment1 || data?.Attachment,
        },
        {
            key: "image2",
            label: "Image 2",
            value: emergencyImage2,
            setValue: setEmergencyImage2,
            accept: "image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            kind: "image",
            urlKey: "attachmentUrl",
            fallback: data?.Attachment2,
        },
        {
            key: "image3",
            label: "Image 3",
            value: emergencyImage3,
            setValue: setEmergencyImage3,
            accept: "image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            kind: "image",
            urlKey: "attachmentUrl",
            fallback: data?.Attachment3,
        },
        {
            key: "video",
            label: "Video",
            value: emergencyvideo,
            setValue: setEmergencyvideo,
            accept: "video/*",
            kind: "video",
            urlKey: "videoAttachmentUrl",
            fallback: data?.Video,
        },
    ];

    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}
            {imageLoading ? <LinearProgress /> : false}
            {/* <Box sx={{ height: "100vh", overflow: "auto" }}> */}
            {/* <Box sx={{ p: 1, backgroundColor: "#F8F9FB", minHeight: "100vh" }}> */}
            {/* <Box sx={{ p: 2, borderRadius: 3 }}> */}
            <Paper elevation={0}
                sx={{
                    mx: 2,
                    mt: 1,
                    mb: 1,
                    p: 1,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    bgcolor: "#fff",
                }}>
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
                                {mode === "E"
                                    ? "Edit General"
                                    : mode === "V"
                                        ? "View General"
                                        : "Add General"}
                            </Typography>

                            <Breadcrumbs
                                maxItems={2}
                                aria-label="breadcrumb"
                                separator={
                                    <NavigateNextIcon
                                        sx={{
                                            fontSize: 18,
                                            color: "#94A3B8",
                                            margin: "0 4px",
                                        }}
                                    />
                                }
                            >
                                <Typography
                                    sx={breadcrumbStyles.item}
                                    onClick={() => {
                                        // navigate("/Apps/TR243/Party");
                                        navigate("/Apps/TR383/Academic%20Year");
                                    }}
                                >
                                    {`Academic Year(${state.AcademicYear || ""})`}
                                </Typography>
                                <Typography
                                    // sx={breadcrumbStyles.item}
                                    sx={
                                        {
                                            cursor: "pointer",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#475569",
                                            transition: "all 0.25s ease",
                                            display: "inline-flex",
                                            alignItems: "center",

                                            "&:hover": {
                                                color: "#fff",
                                                background: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
                                                boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
                                            },
                                        }
                                    }
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
                                    sx={
                                        {
                                            cursor: "pointer",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#475569",
                                            transition: "all 0.25s ease",
                                            display: "inline-flex",
                                            alignItems: "center",

                                            "&:hover": {
                                                color: "#fff",
                                                background: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
                                                boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
                                            },
                                        }
                                    }
                                    onClick={() => {
                                        // navigate("/Apps/TR243/Party");
                                        navigate(
                                            `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
                                            {
                                                state: { ...state },
                                            },
                                        );
                                    }}
                                    //  sx={breadcrumbStyles.item}
                                    onClick={() => {
                                        // navigate("/Apps/TR243/Party");
                                        navigate(
                                            `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/G`,
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
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 2,
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#fff",
                                        background: "linear-gradient(135deg, #0D9488, #14B8A6)",
                                        boxShadow: "0 2px 8px rgba(13,148,136,0.4)",
                                    }}
                                    onClick={() => {
                                        // navigate("/Apps/TR243/Party");
                                        navigate(
                                            `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
                                            {
                                                state: { ...state },
                                            },
                                        );
                                    }}
                                // sx={breadcrumbStyles.active}
                                >
                                    {mode === "E"
                                        ? "Edit General Event"
                                        : mode === "V"
                                            ? "View General Event"
                                            : "Add General Event"}
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
            {/* </Box> */}
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
                                            setFieldValue("NotifyClasses", [
                                                ...currentValues,
                                                item,
                                            ]);
                                        }
                                    };
                                    return (
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
                                                    <Typography sx={{ fontSize: 18 }}>📅</Typography>
                                                </Box>

                                                {/* TITLE + SUBTITLE */}
                                                <Box>
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={700}
                                                        color="#0D94885"
                                                    >
                                                        General
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Publish announcements, events, and general updates for students and staff
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                gap={3}
                                                padding={3}
                                            >
                                                {/* TOP ROW */}
                                                <Box
                                                    display="grid"
                                                    gridTemplateColumns={
                                                        isNonMobile ? "1fr 1fr" : "1fr"
                                                    }
                                                    gap={2}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        type="date"
                                                        variant="outlined"
                                                        size="small"
                                                        focused
                                                        name="EventDate"
                                                        // label="Event Date"
                                                        label={
                                                            <>
                                                                Event Date
                                                                <span
                                                                    style={{ color: "red", fontSize: "20px" }}
                                                                >
                                                                    *
                                                                </span>
                                                            </>
                                                        }
                                                        value={values.EventDate}
                                                        inputFormat="YYYY-MM-DD"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}                                                       
                                                        error={
                                                            !!touched.EventDate && !!errors.EventDate
                                                        }
                                                        helperText={
                                                            touched.EventDate && errors.EventDate
                                                        }
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
                                                    <TextField
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
                                                        fullWidth
                                                        select
                                                        variant="outlined"
                                                        size="small"
                                                        focused
                                                        name="Eventtype"
                                                        // label="Eventtype"
                                                        label={
                                                            <>
                                                                Event Category
                                                                <span
                                                                    style={{ color: "red", fontSize: "20px" }}
                                                                >
                                                                    *
                                                                </span>
                                                            </>
                                                        }
                                                        id="Eventtype"
                                                        value={values.Eventtype}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        error={!!touched.Eventtype && !!errors.Eventtype}
                                                        helperText={touched.Eventtype && errors.Eventtype}
                                                    >
                                                        <MenuItem value="Sports">Sports</MenuItem>
                                                        <MenuItem value="Cultural">Cultural</MenuItem>
                                                        <MenuItem value="Workshop">Workshop</MenuItem>
                                                        <MenuItem value="Meeting">Meeting</MenuItem>
                                                        <MenuItem value="Others">Others</MenuItem>

                                                    </TextField>
                                                   
                                                </Box>
  <TextField
                                                        fullWidth
                                                        type="text"
                                                        variant="outlined"
                                                        size="small"
                                                        focused
                                                        name="Title"
                                                        // label="Event Date"
                                                        label={
                                                            <>
                                                                Event Title
                                                                <span
                                                                    style={{ color: "red", fontSize: "20px" }}
                                                                >
                                                                    *
                                                                </span>
                                                            </>
                                                        }
                                                        value={values.Title}
                                                        inputFormat="YYYY-MM-DD"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}                                                       
                                                        error={
                                                            !!touched.Title && !!errors.Title
                                                        }
                                                        helperText={
                                                            touched.Title && errors.Title
                                                        }
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
                                                        Share To?
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
                                                            color={
                                                                buttonValue === "Y" ? "info" : "inherit"
                                                            }
                                                            onClick={() => handleButtonClick("Y")}
                                                        >
                                                            Whole School / Class
                                                        </Button>

                                                        <Button
                                                            color={
                                                                buttonValue === "N" ? "error" : "inherit"
                                                            }
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
                                                            id="Standard1"
                                                            name="Standard1"
                                                            label={
                                                                <>
                                                                    Standard/Activities
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                            fontSize: "20px",
                                                                        }}
                                                                    >
                                                                        *
                                                                    </span>
                                                                </>
                                                            }
                                                            variant="outlined"
                                                            size="small"
                                                            focused
                                                            value={values.Standard1}
                                                            onChange={(event, newValue) => {
                                                                setFieldValue("Standard1", newValue);
                                                                // setFieldTouched("Standard1", true);
                                                            }}
                                                            error={
                                                                !!touched.Standard1 && !!errors.Standard1
                                                            }
                                                            helperText={
                                                                touched.Standard1 && errors.Standard1
                                                            }
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
                                                        gridTemplateColumns={
                                                            isNonMobile ? "1fr 1fr" : "1fr"
                                                        }
                                                        gap={2}
                                                    >
                                                        <PartySingleSelect
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
                                                            id="Standard"
                                                            name="Standard"
                                                            label={
                                                                <>
                                                                    Standard/Activities
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                            fontSize: "20px",
                                                                        }}
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
                                                            error={
                                                                !!touched.Standard && !!errors.Standard
                                                            }
                                                            helperText={
                                                                touched.Standard && errors.Standard
                                                            }
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
                                                            id="Student"
                                                            name="Student"
                                                            label={
                                                                <>
                                                                    Student
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                            fontSize: "20px",
                                                                        }}
                                                                    >
                                                                        *
                                                                    </span>
                                                                </>
                                                            }
                                                            variant="outlined"
                                                            size="small"
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
 {/* <Box
                                                        display="grid"
                                                        gridTemplateColumns={
                                                            isNonMobile ? "1fr 1fr" : "1fr"
                                                        }
                                                        gap={2}
                                                    > */}
                                                {/* MESSAGE */}
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    variant="outlined"
                                                    size="small"
                                                    focused
                                                    rows={2}
                                                    name="Message"
                                                    // label="Message"
                                                    label={
                                                        <>
                                                            Message
                                                            <span
                                                                style={{ color: "red", fontSize: "20px" }}
                                                            >
                                                                *
                                                            </span>
                                                        </>
                                                    }
                                                    placeholder="Enter the event details (date, time, venue, and important instructions)"
                                                    value={values.Message}
                                                    onChange={handleChange}
                                                    error={!!touched.Message && !!errors.Message}
                                                    helperText={touched.Message && errors.Message}
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

                                             
                                                {/* <TextField
                                                    fullWidth
                                                    select
                                                    variant="outlined"
                                                    size="small"
                                                    focused
                                                    name="AddressedTo"
                                                    // label="Event Type"
                                                    label={
                                                        <>
                                                            Addressed To
                                                            <span
                                                                style={{ color: "red", fontSize: "20px" }}
                                                            >
                                                                *
                                                            </span>
                                                        </>
                                                    }
                                                    value={values.AddressedTo}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={
                                                        !!touched.AddressedTo && !!errors.AddressedTo
                                                    }
                                                    helperText={
                                                        touched.AddressedTo && errors.AddressedTo
                                                    }
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
                                                    <MenuItem value="All">All</MenuItem>
                                                    <MenuItem value="Parents&Students">
                                                        Parents & Students
                                                    </MenuItem>
                                                    <MenuItem value="ParentsOnly">
                                                        Parents Only
                                                    </MenuItem>
                                                    <MenuItem value="StaffOnly">
                                                        Staff Only
                                                    </MenuItem>
                                                </TextField> */}
{/* </Box> */}
                                                {/* ---------------- ATTACHMENTS ROW: 3 Images + 1 Video ---------------- */}
                                                <Box>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            mb: 1,
                                                            fontWeight: 600,
                                                            color: "#6B7280",
                                                        }}
                                                    >
                                                        Attachments
                                                    </Typography>

                                                    <Box
                                                        display="grid"
                                                        gridTemplateColumns={
                                                            isNonMobile
                                                                ? "repeat(4, 1fr)"
                                                                : "1fr"
                                                        }
                                                        gap={2}
                                                    >
                                                        {uploadSlots.map((slot) => (
                                                            <Box key={slot.key}>
                                                                <Typography
                                                                    fontSize="13px"
                                                                    fontWeight={600}
                                                                    color="#6B7280"
                                                                    mb={0.5}
                                                                >
                                                                    {slot.label}
                                                                </Typography>

                                                                {/* UPLOAD / FILE NAME / LOADING */}
                                                                {uploadingSlot === slot.key ? (
                                                                    // While uploading
                                                                    <Box
                                                                        sx={{
                                                                            height: "40px",
                                                                            border: "1px solid #D1D5DB",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "#F9FAFB",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            gap: 1,
                                                                        }}
                                                                    >
                                                                        <CircularProgress
                                                                            size={18}
                                                                            thickness={4}
                                                                        />

                                                                        <Typography
                                                                            fontSize="12px"
                                                                            color="#6B7280"
                                                                        >
                                                                            Uploading...
                                                                        </Typography>
                                                                    </Box>
                                                                ) : slot.value ? (
                                                                    // File uploaded
                                                                    <Box
                                                                        sx={{
                                                                            height: "40px",
                                                                            border: "1px solid #D1D5DB",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "#F9FAFB",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                            px: 1,
                                                                            gap: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            fontSize="12px"
                                                                            color="#374151"
                                                                            noWrap
                                                                            title={slot.value}
                                                                            sx={{
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                flex: 1,
                                                                            }}
                                                                        >
                                                                            {slot.value}
                                                                        </Typography>

                                                                        {mode !== "V" && (
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() =>
                                                                                    handleRemoveFile(slot)
                                                                                }
                                                                                sx={{
                                                                                    p: 0.3,
                                                                                    color: "#EF4444",
                                                                                    "&:hover": {
                                                                                        backgroundColor: "#FEE2E2",
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <CloseIcon
                                                                                    sx={{
                                                                                        fontSize: 17,
                                                                                    }}
                                                                                />
                                                                            </IconButton>
                                                                        )}
                                                                    </Box>
                                                                ) : (
                                                                    // Upload new file
                                                                    <Box
                                                                        component="label"
                                                                        sx={{
                                                                            border: "1px dashed #D1D5DB",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "#F9FAFB",
                                                                            height: "40px",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            cursor:
                                                                                mode === "V"
                                                                                    ? "default"
                                                                                    : "pointer",
                                                                            px: 1,
                                                                        }}
                                                                    >
                                                                        <input
                                                                            hidden
                                                                            type="file"
                                                                            accept={slot.accept}
                                                                            disabled={
                                                                                mode === "V" ||
                                                                                uploadingSlot !== null
                                                                            }
                                                                            onChange={(event) =>
                                                                                slot.kind === "video"
                                                                                    ? handleVideoSlotChange(
                                                                                        event,
                                                                                        slot.key
                                                                                    )
                                                                                    : handleImageSlotChange(
                                                                                        event,
                                                                                        slot.setValue,
                                                                                        slot.key
                                                                                    )
                                                                            }
                                                                        />

                                                                        <Typography
                                                                            fontSize="12px"
                                                                            color="#6B7280"
                                                                        >
                                                                            Upload {slot.label}
                                                                        </Typography>
                                                                    </Box>
                                                                )}

                                                                {/* VIEW BUTTON - ALWAYS SHOWN */}
                                                                <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    sx={{
                                                                        marginTop: "6px",
                                                                        width: "100%",
                                                                        fontSize: "12px",
                                                                    }}
                                                                    disabled={!slot.value}
                                                                    onClick={() => {
                                                                        if (!slot.value) {
                                                                            toast.error(
                                                                                `Please Upload ${slot.label}`
                                                                            );
                                                                            return;
                                                                        }

                                                                        window.open(
                                                                            store.getState().globalurl[
                                                                                slot.urlKey
                                                                            ] + slot.value,
                                                                            "_blank"
                                                                        );
                                                                    }}
                                                                >
                                                                    View
                                                                </Button>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>

                                                {/* NOTIFY OPTIONS */}
                                                {/* <Box>
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
                                                                    color="success"
                                                                    checked={values[item.field]}
                                                                    onChange={(e) =>
                                                                        setFieldValue(
                                                                            item.field,
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box> */}

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
                                                        disabled={mode === "V" || imageLoading}
                                                    >
                                                        Save
                                                    </LoadingButton>
                                                    <Button
                                                        startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                                                        variant="outlined"
                                                        sx={{
                                                            textTransform: "none",
                                                            borderRadius: 2,
                                                            px: 4,
                                                            bgcolor: "#F97316",
                                                            color: "#ffff",
                                                            "&:hover": {
                                                                bgcolor: "#EA580C",
                                                                color: "#ffff",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            navigate(
                                                                `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/G`,
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
                    </Box>
                </Box>
            ) : (
                false
            )}
            {/* </Box>
      </Box> */}
        </React.Fragment>
    );
};

export default EditGeneral;
// import {
//     TextField,
//     Box,
//     Typography,
//     FormControl,
//     FormLabel,
//     Button,
//     IconButton,
//     FormControlLabel,
//     Tooltip,
//     Checkbox,
//     LinearProgress,
//     Paper,
//     MenuItem,
//     Breadcrumbs,
//     ButtonGroup,
//     Badge,
//     Chip,
//     FormGroup,
//     Switch,
// } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import { Field, Formik } from "formik";
// import { ArrowBack, CheckBox } from "@mui/icons-material";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { gradeSchema } from "../../Security/validation";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//     DefaultProductDeliveryChargeGet,
//     EventsgetData,
//     EventspostData,
//     fetchApidata,
//     getFetchData,
//     postApidata,
//     postData,
// } from "../../../store/reducers/Formapireducer";
// import React, { useState, useEffect, useRef } from "react";
// import { LoadingButton } from "@mui/lab";
// import Swal from "sweetalert2";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import { formGap } from "../../../ui-components/utils";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import {
//     EventsmultiSelect,
//     PartySingleSelect,
// } from "../../../ui-components/global/Autocomplete";
// import * as Yup from "yup";
// import { fileUpload } from "../../../store/reducers/Imguploadreducer";
// import store from "../../..";
// import { breadcrumbStyles } from "../../../Theme";
// // import CryptoJS from "crypto-js";
// const EditGeneral = () => {
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const navigate = useNavigate();
//     let params = useParams();
//     const dispatch = useDispatch();
//     var recID = params.id;
//     var mode = params.Mode;
//     var accessID = params.accessID;
//     var Type = params.Type;
//     console.log("  EditEmergency  Type:", Type);
//     const data = useSelector((state) => state.formApi.Data) || {};
//     const Status = useSelector((state) => state.formApi.Status);
//     const Msg = useSelector((state) => state.formApi.msg);
//     const isLoading = useSelector((state) => state.formApi.postLoading);
//     const getLoading = useSelector((state) => state.formApi.getLoading);
//     const imageLoading = useSelector((state) => state.imageApi.imgLoading);
//     const uploadLoading = useSelector((state) => state.imageApi.videoLoading);
//     const listViewurl = useSelector((state) => state.globalurl.listViewurl);
//     const YearFlag = sessionStorage.getItem("YearFlag");
//     const Year = sessionStorage.getItem("year");
//     const Finyear = sessionStorage.getItem("YearRecorid");
//     const CompanyID = sessionStorage.getItem("compID");
//     const LoginID = sessionStorage.getItem("loginrecordID");
//     const { toggleSidebar, broken, rtl } = useProSidebar();
//     const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
//     const location = useLocation();
//     const state = location.state || {};

//     const [buttonValue, setButtonValue] = useState("");
//     console.log("  EditEmergency  buttonValue:", buttonValue);
//     const [validationSchema, setValidationSchema] = useState(null);
//     const [errorMsgData, setErrorMsgData] = useState(null);
//     const [emergencyImage, setEmergencyImage] = useState("");
//     const [emergencyvideo, setEmergencyvideo] = useState("");
//     const [emergencyaudio, setEmergencyaudio] = useState("");

//     console.log("  EditEmergency  emergencyImage:", emergencyImage);
//     console.log("  EditEmergency  emergencyvideo:", emergencyvideo);
//     console.log("  EditEmergency  emergencyaudio:", emergencyaudio);

//     useEffect(() => {
//         dispatch(
//             EventsgetData({ accessID: "TR385", get: "get", recID, Type: "G" }),
//         );
//         setButtonValue(mode === "A" ? "Y" : data?.SchoolorSpecific || "Y");
//         setEmergencyImage(mode === "A" ? "" : data?.Attachment || "");
//         setEmergencyvideo(mode === "A" ? "" : data?.Video || "");
//         setEmergencyaudio(mode === "A" ? "" : data?.Audio || "");
//     }, [location.key, mode]);

//     useEffect(() => {
//         fetch(process.env.PUBLIC_URL + "/validationcms.json")
//             .then((res) => {
//                 if (!res.ok) throw new Error("Failed to fetch validationcms.json");
//                 return res.json();
//             })
//             .then((data) => {
//                 setErrorMsgData(data);
//                 let schemaFields = {
//                     EmergencyTitle: Yup.string()
//                         .typeError(data.EventGeneral.EmergencyTitle)
//                         .required(data.EventGeneral.EmergencyTitle),

//                     Priority: Yup.string()
//                         .typeError(data.EventGeneral.Priority)
//                         .required(data.EventGeneral.Priority),

//                     Message: Yup.string()
//                         .typeError(data.EventGeneral.Message)
//                         .required(data.EventGeneral.Message),

//                     ContactPersonAndNumber: Yup.string()
//                         .typeError(data.EventGeneral.ContactPersonAndNumber)
//                         .required(data.EventGeneral.ContactPersonAndNumber),
//                 };

//                 if (buttonValue === "Y") {
//                     schemaFields.Standard1 = Yup.array()
//                         .min(1, data.EventGeneral.Standard1)
//                         .required(data.EventGeneral.Standard1);
//                 }

//                 if (buttonValue === "N") {
//                     schemaFields.Standard = Yup.object()
//                         .typeError(data.EventGeneral.Standard)
//                         .required(data.EventGeneral.Standard)
//                         .nullable();

//                     schemaFields.Student = Yup.object()
//                         .typeError(data.EventGeneral.Student)
//                         .required(data.EventGeneral.Student)
//                         .nullable();
//                 }

//                 const schema = Yup.object().shape(schemaFields);
//                 setValidationSchema(schema);
//             })
//             .catch((err) => console.error("Error loading validationcms.json:", err));
//     }, [buttonValue]);
//     // *************** INITIALVALUE  *************** //
//     const currentDate = new Date().toISOString().split("T")[0];

//     const InitialValue = {
//         EmergencyTitle: data?.Title || "",
//         Priority: data?.Priority || "",
//         NotifyClasses: [],
//         Standard1: Array.isArray(data?.StandardID)
//             ? data?.StandardID.map((d) => ({
//                 RecordID: String(d.StandardID),
//                 Name: d.StandardCode,
//                 Code: d.StandardName,
//             }))
//             : [],
//         Standard: data?.SpecificStdActID
//             ? {
//                 RecordID: data?.SpecificStdActID,
//                 Code: data?.SpecificStdActCode,
//                 Name: data?.SpecificStdActName,
//             }
//             : null,
//         Student: data?.StudentID
//             ? {
//                 // RecordID: data?.StudentID,
//                 EmployeeID: data?.StudentID,
//                 Code: data?.StudentCode,
//                 Name: data?.StudentName,
//             }
//             : null,
//         Message: data?.Description || "",
//         ActionRequired: data?.ActionRequired || "",
//         ContactPersonAndNumber: data?.MobileNumber || "",
//         Email: mode === "E" ? (data?.NotifyEmail === "Y" ? true : false) : true,
//         WhatsApp:
//             mode === "E" ? (data?.NotifyWhatsapp === "Y" ? true : false) : true,
//         SMS: mode === "E" ? (data?.NotifySms === "Y" ? true : false) : true,
//         Acknowledgement:
//             mode === "E"
//                 ? data?.AcknowledgementRequired === "Y"
//                     ? true
//                     : false
//                 : true,
//         AddressedTo: data.AddressedTo || "",

//     };

//     const Fnsave = async (values, del, override = {}) => {
//         let action =
//             mode === "A" && !del
//                 ? "insert"
//                 : mode === "E" && del
//                     ? "harddelete"
//                     : "update";

//         const idata = {
//             RecordID: recID,
//             EventCategoryID: params.parentID2,
//             Title: values.EmergencyTitle || "",
//             CreatedDate: currentDate,
//             StdActivitiesID:
//                 buttonValue === "Y"
//                     ? values?.Standard1?.map((item) => item.RecordID).join(",")
//                     : "" || "",
//             SpecificStdActID:
//                 buttonValue === "N" ? values?.Standard?.RecordID : 0 || 0,
//             StudentID: buttonValue === "N" ? values?.Student?.EmployeeID : "" || "",
//             Priority: values.Priority || "",
//             SchoolorSpecific: buttonValue || "",
//             Description: values.Message || "",
//             ActionRequired: values.ActionRequired || "",
//             MobileNumber: values.ContactPersonAndNumber || "",
//             NotifyWhatsapp: values.WhatsApp === true ? "Y" : "N",
//             NotifySms: values.SMS === true ? "Y" : "N",
//             NotifyEmail: values.Email === true ? "Y" : "N",
//             AcknowledgementRequired: values.Acknowledgement === true ? "Y" : "N",
//             // Attachment: emergencyImage || "",
//             Attachment:
//                 fileCategory === "images" || fileCategory === "document"
//                     ? emergencyImage
//                     : "",
//             Video: fileCategory === "videos" ? emergencyvideo : "",
//             Audio: fileCategory === "audios" ? emergencyaudio : "",
//             CreatedBy: LoginID,
//             AddressedTo: values.AddressedTo || "",
//         };

//         const response = await dispatch(
//             EventspostData({
//                 accessID: "TR385",
//                 action,
//                 Type: "G",
//                 idata,
//                 CompanyID,
//             }),
//         );
//         if (response.payload.Status == "Y") {
//             toast.success(response.payload.Msg);
//             navigate(-1);
//             // navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/E`, {
//             //     state: { ...state }
//             // })
//         } else {
//             toast.error(response.payload.Msg);

//             // dispatch(EventsgetData({ accessI:"TR385", get: "get", recID, Type: "E" }));
//             // setButtonValue(data?.SchoolorSpecific ? data?.SchoolorSpecific : "Y")
//         }
//     };

//     const handleButtonClick = (value) => {
//         setButtonValue(value);
//     };

//     const fnLogOut = (props) => {
//         Swal.fire({
//             title: `Do you want ${props}?`,
//             // text:data.payload.Msg,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: props,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 if (props === "Logout") {
//                     navigate("/");
//                 }
//                 if (props === "Close") {
//                     navigate("/Apps/TR232/Role");
//                 }
//             } else {
//                 return;
//             }
//         });
//     };
//     const [fileCategory, setFileCategory] = useState(""); // image | video | audio | document

//     const getFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const fileType = file.type;

//         let category = "";

//         if (
//             fileType.startsWith("image/") || // covers jpeg, png, jpg, webp
//             fileType === "application/pdf" ||
//             fileType ===
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         ) {
//             category = "images";
//         } else if (fileType.startsWith("video/")) {
//             category = "videos";
//         } else if (fileType.startsWith("audio/")) {
//             category = "audios";
//         }

//         if (!category) {
//             toast.error("Unsupported file type");
//             return;
//         }

//         setFileCategory(category); // ✅ store type

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("type", category); // ✅ dynamic

//         const fileData = await dispatch(fileUpload({ formData }));

//         if (fileData.payload.Status === "Y") {
//             setEmergencyImage(fileData.payload.name); // store file name
//             setEmergencyvideo(fileData.payload.name);
//             setEmergencyaudio(fileData.payload.name);
//             toast.success(fileData.payload.Msg);
//         }
//     };
//     // const getFileChange = async (event) => {
//     //     // setEmergencyImage(event.target.files[0]);

//     //     // console.log(event.target.files[0]);
//     //     const file = event.target.files[0];

//     //     if (!file) return;

//     //     // const allowedTypes = [
//     //     //     "application/pdf",
//     //     //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     //     //     "image/jpeg",
//     //     //     "image/png",
//     //     //     "image/jpg",
//     //     //     "image/webp",
//     //     // ];

//     //     // if (!allowedTypes.includes(file.type)) {
//     //     //     toast.error(
//     //     //         "Only Images, PDF and DOCX files are allowed"
//     //     //     );
//     //     //     return;
//     //     // }

//     //      const fileType = file.type;

//     // // Allow: images, videos, audio + specific docs
//     // const isAllowed =
//     //     fileType.startsWith("image/") ||
//     //     fileType.startsWith("video/") ||
//     //     fileType.startsWith("audio/") ||
//     //     fileType === "application/pdf" ||
//     //     fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

//     // if (!isAllowed) {
//     //     toast.error("Only Images, Videos, Audio, PDF and DOCX files are allowed");
//     //     return;
//     // }

//     //     setEmergencyImage(file);

//     //     const formData = new FormData();
//     //     formData.append("file", event.target.files[0]);
//     //     formData.append("type", "images");

//     //     const fileData = await dispatch(fileUpload({ formData }));
//     //     setEmergencyImage(fileData.payload.name);
//     //     // sessionStorage.setItem("emergencyImage", fileData.payload.name);
//     //     console.log(">>>", fileData.payload);
//     //     console.log(
//     //         "  file: Editdeliverychalan.jsx:1143  getFileChange  fileData:",
//     //         fileData
//     //     );
//     //     if (fileData.payload.Status == "Y") {
//     //         // console.log("I am here");
//     //         toast.success(fileData.payload.Msg);
//     //     }
//     // };
//     return (
//         <React.Fragment>
//             {getLoading ? <LinearProgress /> : false}
//             {imageLoading ? <LinearProgress /> : false}
//             {/* <Box sx={{ height: "100vh", overflow: "auto" }}> */}
//             {/* <Box sx={{ p: 1, backgroundColor: "#F8F9FB", minHeight: "100vh" }}> */}
//             {/* <Box sx={{ p: 2, borderRadius: 3 }}> */}
//             <Paper elevation={0}
//                 sx={{
//                     mx: 2,
//                     mt: 1,
//                     mb: 1,
//                     p: 1,
//                     borderRadius: 3,
//                     border: "1px solid #E5E7EB",
//                     bgcolor: "#fff",
//                 }}>
//                 <Box display="flex" justifyContent="space-between">
//                     <Box display="flex" borderRadius="3px" alignItems="center">
//                         {broken && !rtl && (
//                             <IconButton onClick={() => toggleSidebar()}>
//                                 <MenuOutlinedIcon />
//                             </IconButton>
//                         )}
//                         <Box>
//                             <Typography
//                                 sx={{
//                                     fontSize: 20,
//                                     fontWeight: 700,
//                                     color: "#111827",
//                                     // mb: 0.2,
//                                     px: 1,
//                                     py: 0.2,
//                                 }}
//                             >
//                                 {mode === "E"
//                                     ? "Edit General"
//                                     : mode === "V"
//                                         ? "View General"
//                                         : "Add General"}
//                             </Typography>

//                             <Breadcrumbs
//                                 maxItems={2}
//                                 aria-label="breadcrumb"
//                                 separator={
//                                     <NavigateNextIcon
//                                         sx={{
//                                             fontSize: 18,
//                                             color: "#94A3B8",
//                                             margin: "0 4px",
//                                         }}
//                                     />
//                                 }
//                             >
//                                 <Typography
//                                     sx={breadcrumbStyles.item}
//                                     onClick={() => {
//                                         // navigate("/Apps/TR243/Party");
//                                         navigate("/Apps/TR383/Academic%20Year");
//                                     }}
//                                 >
//                                     {`Academic Year(${state.AcademicYear || ""})`}
//                                 </Typography>
//                                 <Typography
//                                     // sx={breadcrumbStyles.item}
//                                     sx={
//                                         {
//                                             cursor: "pointer",
//                                             px: 1.5,
//                                             py: 0.5,
//                                             borderRadius: 2,
//                                             fontSize: 13,
//                                             fontWeight: 600,
//                                             color: "#475569",
//                                             transition: "all 0.25s ease",
//                                             display: "inline-flex",
//                                             alignItems: "center",

//                                             "&:hover": {
//                                                 color: "#fff",
//                                                 background: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
//                                                 boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
//                                             },
//                                         }
//                                     }
//                                     onClick={() => {
//                                         // navigate("/Apps/TR243/Party");
//                                         navigate(
//                                             `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
//                                             {
//                                                 state: { ...state },
//                                             },
//                                         );
//                                     }}
//                                 >
//                                     {`Event Category(${state.BreadCrumb1 || ""})`}
//                                 </Typography>
//                                 <Typography
//                                     sx={
//                                         {
//                                             cursor: "pointer",
//                                             px: 1.5,
//                                             py: 0.5,
//                                             borderRadius: 2,
//                                             fontSize: 13,
//                                             fontWeight: 600,
//                                             color: "#475569",
//                                             transition: "all 0.25s ease",
//                                             display: "inline-flex",
//                                             alignItems: "center",

//                                             "&:hover": {
//                                                 color: "#fff",
//                                                 background: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
//                                                 boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
//                                             },
//                                         }
//                                     }
//                                     onClick={() => {
//                                         // navigate("/Apps/TR243/Party");
//                                         navigate(
//                                             `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
//                                             {
//                                                 state: { ...state },
//                                             },
//                                         );
//                                     }}
//                                     //  sx={breadcrumbStyles.item}
//                                     onClick={() => {
//                                         // navigate("/Apps/TR243/Party");
//                                         navigate(
//                                             `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/G`,
//                                             {
//                                                 state: { ...state },
//                                             },
//                                         );
//                                     }}
//                                 >
//                                     {mode === "E" || mode === "V"
//                                         ? `Event(${state.BreadCrumb2 || ""})`
//                                         : "Events"}
//                                 </Typography>

//                                 <Typography
//                                     sx={{
//                                         px: 1.5,
//                                         py: 0.5,
//                                         borderRadius: 2,
//                                         fontSize: 13,
//                                         fontWeight: 700,
//                                         color: "#fff",
//                                         background: "linear-gradient(135deg, #0D9488, #14B8A6)",
//                                         boxShadow: "0 2px 8px rgba(13,148,136,0.4)",
//                                     }}
//                                     onClick={() => {
//                                         // navigate("/Apps/TR243/Party");
//                                         navigate(
//                                             `/Apps/SecondarylistView/TR384/Event%20Category/${params.leaderID}`,
//                                             {
//                                                 state: { ...state },
//                                             },
//                                         );
//                                     }}
//                                 // sx={breadcrumbStyles.active}
//                                 >
//                                     {mode === "E"
//                                         ? "Edit General Event"
//                                         : mode === "V"
//                                             ? "View General Event"
//                                             : "Add General Event"}
//                                 </Typography>
//                             </Breadcrumbs>
//                         </Box>
//                     </Box>
//                     <Box display="flex">
//                         <Tooltip title="Close">
//                             <IconButton onClick={() => fnLogOut("Close")} color="error">
//                                 <ResetTvIcon />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Logout">
//                             <IconButton
//                                 color="error"
//                                 onClick={() => fnLogOut("Logout")}
//                             >
//                                 <LogoutOutlinedIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Paper>
//             {/* </Box> */}
//             {!getLoading ? (
//                 <Box
//                     display="flex"
//                     gap={3}
//                     alignItems="flex-start"
//                     flexWrap="wrap"
//                     sx={{ p: 1 }}
//                 >
//                     <Box
//                         flex={1}
//                         minWidth={0}
//                         display="flex"
//                         flexDirection="column"
//                         gap={3}
//                     >
//                         <Paper
//                             elevation={3}
//                             sx={{
//                                 margin: "10px",
//                                 backgroundColor: "#ffff",
//                                 border: "1px solid #b9bcc0",
//                                 borderRadius: 3,
//                             }}
//                         >
//                             <Formik
//                                 initialValues={InitialValue}
//                                 onSubmit={(values, setSubmitting) => {
//                                     setTimeout(() => {
//                                         Fnsave(values);
//                                     }, 100);
//                                 }}
//                                 validationSchema={validationSchema}
//                                 enableReinitialize={true}
//                             >
//                                 {({
//                                     errors,
//                                     touched,
//                                     handleBlur,
//                                     handleChange,
//                                     isSubmitting,
//                                     values,
//                                     handleSubmit,
//                                     setFieldValue,
//                                     setFieldTouched,
//                                 }) => {
//                                     const handleChipClick = (item) => {
//                                         const currentValues = values.NotifyClasses || [];

//                                         if (currentValues.includes(item)) {
//                                             setFieldValue(
//                                                 "NotifyClasses",
//                                                 currentValues.filter((val) => val !== item),
//                                             );
//                                         } else {
//                                             setFieldValue("NotifyClasses", [
//                                                 ...currentValues,
//                                                 item,
//                                             ]);
//                                         }
//                                     };
//                                     return (
//                                         <form onSubmit={handleSubmit}>
//                                             {/* ----- CARD HEADER ----- */}
//                                             <Box
//                                                 display="flex"
//                                                 alignItems="center"
//                                                 gap={1.5}
//                                                 mb={1}
//                                                 sx={{ px: 2, pt: 2 }}
//                                             >
//                                                 {/* ICON */}
//                                                 <Box
//                                                     sx={{
//                                                         width: 36,
//                                                         height: 36,
//                                                         borderRadius: "50%",
//                                                         backgroundColor: "#EFF6FF",
//                                                         display: "flex",
//                                                         alignItems: "center",
//                                                         justifyContent: "center",
//                                                     }}
//                                                 >
//                                                     <Typography sx={{ fontSize: 18 }}>📅</Typography>
//                                                 </Box>

//                                                 {/* TITLE + SUBTITLE */}
//                                                 <Box>
//                                                     <Typography
//                                                         variant="subtitle1"
//                                                         fontWeight={700}
//                                                         color="#0D94885"
//                                                     >
//                                                         General
//                                                     </Typography>

//                                                     <Typography
//                                                         variant="body2"
//                                                         color="text.secondary"
//                                                     >
//                                                         Publish announcements, events, and general updates for students and staff
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                             <Box
//                                                 display="flex"
//                                                 flexDirection="column"
//                                                 gap={3}
//                                                 padding={3}
//                                             >
//                                                 {/* TOP ROW */}
//                                                 <Box
//                                                     display="grid"
//                                                     gridTemplateColumns={
//                                                         isNonMobile ? "1fr 1fr" : "1fr"
//                                                     }
//                                                     gap={2}
//                                                 >
//                                                     <TextField
//                                                         fullWidth
//                                                         type="date"
//                                                         variant="outlined"
//                                                         size="small"
//                                                         focused
//                                                         name="EventDate"
//                                                         // label="Event Date"
//                                                         label={
//                                                             <>
//                                                                 Event Date
//                                                                 <span
//                                                                     style={{ color: "red", fontSize: "20px" }}
//                                                                 >
//                                                                     *
//                                                                 </span>
//                                                             </>
//                                                         }
//                                                         value={values.EventDate}
//                                                         inputFormat="YYYY-MM-DD"
//                                                         onBlur={handleBlur}
//                                                         onChange={handleChange}                                                       
//                                                         error={
//                                                             !!touched.EventDate && !!errors.EventDate
//                                                         }
//                                                         helperText={
//                                                             touched.EventDate && errors.EventDate
//                                                         }
//                                                         sx={{
//                                                             "& .MuiOutlinedInput-root": {
//                                                                 backgroundColor: "#fff",
//                                                                 borderRadius: "6px",

//                                                                 "& fieldset": {
//                                                                     borderColor: "#d1d5db", // 👈 light grey border
//                                                                 },
//                                                                 "&:hover fieldset": {
//                                                                     borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                                 },
//                                                                 "&.Mui-focused fieldset": {
//                                                                     borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                     borderWidth: "1px",
//                                                                 },
//                                                             },

//                                                             "& .MuiInputLabel-root": {
//                                                                 color: "#6b7280", // label grey
//                                                             },
//                                                             "& .MuiInputLabel-root.Mui-focused": {
//                                                                 color: "#6b7280", // keep same on focus
//                                                             },
//                                                         }}
//                                                     />
//                                                     <TextField
//                                                         sx={{
//                                                             "& .MuiOutlinedInput-root": {
//                                                                 backgroundColor: "#fff",
//                                                                 borderRadius: "6px",

//                                                                 "& fieldset": {
//                                                                     borderColor: "#d1d5db", // 👈 light grey border
//                                                                 },
//                                                                 "&:hover fieldset": {
//                                                                     borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                                 },
//                                                                 "&.Mui-focused fieldset": {
//                                                                     borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                     borderWidth: "1px",
//                                                                 },
//                                                             },

//                                                             "& .MuiInputLabel-root": {
//                                                                 color: "#6b7280", // label grey
//                                                             },
//                                                             "& .MuiInputLabel-root.Mui-focused": {
//                                                                 color: "#6b7280", // keep same on focus
//                                                             },
//                                                         }}
//                                                         fullWidth
//                                                         select
//                                                         variant="outlined"
//                                                         size="small"
//                                                         focused
//                                                         name="Eventtype"
//                                                         // label="Eventtype"
//                                                         label={
//                                                             <>
//                                                                 Event Category
//                                                                 <span
//                                                                     style={{ color: "red", fontSize: "20px" }}
//                                                                 >
//                                                                     *
//                                                                 </span>
//                                                             </>
//                                                         }
//                                                         id="Eventtype"
//                                                         value={values.Eventtype}
//                                                         onBlur={handleBlur}
//                                                         onChange={handleChange}
//                                                         error={!!touched.Eventtype && !!errors.Eventtype}
//                                                         helperText={touched.Eventtype && errors.Eventtype}
//                                                     >
//                                                         <MenuItem value="Sports">Sports</MenuItem>
//                                                         <MenuItem value="Cultural">Cultural</MenuItem>
//                                                         <MenuItem value="Workshop">Workshop</MenuItem>
//                                                         <MenuItem value="Meeting">Meeting</MenuItem>
//                                                     </TextField>
                                                   
//                                                 </Box>

//                                                 {/* WHO IS THIS ABOUT */}
//                                                 <Box>
//                                                     <Typography
//                                                         variant="subtitle2"
//                                                         sx={{
//                                                             mb: 1,
//                                                             fontWeight: 600,
//                                                             color: "#6B7280",
//                                                         }}
//                                                     >
//                                                         Share To?
//                                                     </Typography>

//                                                     <ButtonGroup
//                                                         fullWidth
//                                                         variant="contained"
//                                                         sx={{
//                                                             "& .MuiButton-root": {
//                                                                 py: 1.2,
//                                                                 fontWeight: 600,
//                                                                 borderRadius: 0,
//                                                             },
//                                                         }}
//                                                     >
//                                                         <Button
//                                                             color={
//                                                                 buttonValue === "Y" ? "info" : "inherit"
//                                                             }
//                                                             onClick={() => handleButtonClick("Y")}
//                                                         >
//                                                             Whole School / Class
//                                                         </Button>

//                                                         <Button
//                                                             color={
//                                                                 buttonValue === "N" ? "error" : "inherit"
//                                                             }
//                                                             onClick={() => handleButtonClick("N")}
//                                                         >
//                                                             Specific Student
//                                                         </Button>
//                                                     </ButtonGroup>
//                                                 </Box>

//                                                 {/* CLASS CHIPS */}
//                                                 {buttonValue === "Y" ? (
//                                                     <Box>
                                                       
//                                                         <EventsmultiSelect
//                                                             sx={{
//                                                                 "& .MuiOutlinedInput-root": {
//                                                                     backgroundColor: "#fff",
//                                                                     borderRadius: "6px",

//                                                                     "& fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 light grey border
//                                                                     },
//                                                                     "&:hover fieldset": {
//                                                                         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                                     },
//                                                                     "&.Mui-focused fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                         borderWidth: "1px",
//                                                                     },
//                                                                 },

//                                                                 "& .MuiInputLabel-root": {
//                                                                     color: "#6b7280", // label grey
//                                                                 },
//                                                                 "& .MuiInputLabel-root.Mui-focused": {
//                                                                     color: "#6b7280", // keep same on focus
//                                                                 },
//                                                             }}
//                                                             id="Standard1"
//                                                             name="Standard1"
//                                                             label={
//                                                                 <>
//                                                                     Standard/Activities
//                                                                     <span
//                                                                         style={{
//                                                                             color: "red",
//                                                                             fontSize: "20px",
//                                                                         }}
//                                                                     >
//                                                                         *
//                                                                     </span>
//                                                                 </>
//                                                             }
//                                                             variant="outlined"
//                                                             size="small"
//                                                             focused
//                                                             value={values.Standard1}
//                                                             onChange={(event, newValue) => {
//                                                                 setFieldValue("Standard1", newValue);
//                                                                 // setFieldTouched("Standard1", true);
//                                                             }}
//                                                             error={
//                                                                 !!touched.Standard1 && !!errors.Standard1
//                                                             }
//                                                             helperText={
//                                                                 touched.Standard1 && errors.Standard1
//                                                             }
//                                                             InputLabelProps={{
//                                                                 shrink: true, // ✅ prevents overlap
//                                                             }}
//                                                             url={`${listViewurl}?data=${JSON.stringify({
//                                                                 Query: {
//                                                                     AccessID: "2183",
//                                                                     ScreenName: "Standard",
//                                                                     VerticalLicense: "003",
//                                                                     Filter: `CompanyID='${CompanyID}'`,
//                                                                     Any: "",
//                                                                 },
//                                                             })}`}
//                                                         />
//                                                     </Box>
//                                                 ) : (
//                                                     <Box
//                                                         display="grid"
//                                                         gridTemplateColumns={
//                                                             isNonMobile ? "1fr 1fr" : "1fr"
//                                                         }
//                                                         gap={2}
//                                                     >
//                                                         <PartySingleSelect
//                                                             sx={{
//                                                                 "& .MuiOutlinedInput-root": {
//                                                                     backgroundColor: "#fff",
//                                                                     borderRadius: "6px",

//                                                                     "& fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 light grey border
//                                                                     },
//                                                                     "&:hover fieldset": {
//                                                                         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                                     },
//                                                                     "&.Mui-focused fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                         borderWidth: "1px",
//                                                                     },
//                                                                 },

//                                                                 "& .MuiInputLabel-root": {
//                                                                     color: "#6b7280", // label grey
//                                                                 },
//                                                                 "& .MuiInputLabel-root.Mui-focused": {
//                                                                     color: "#6b7280", // keep same on focus
//                                                                 },
//                                                             }}
//                                                             id="Standard"
//                                                             name="Standard"
//                                                             label={
//                                                                 <>
//                                                                     Standard/Activities
//                                                                     <span
//                                                                         style={{
//                                                                             color: "red",
//                                                                             fontSize: "20px",
//                                                                         }}
//                                                                     >
//                                                                         *
//                                                                     </span>
//                                                                 </>
//                                                             }
//                                                             variant="outlined"
//                                                             value={values.Standard}
//                                                             onChange={(newValue) => {
//                                                                 setFieldValue("Standard", newValue);
//                                                                 setFieldValue("Student", null);
//                                                             }}
//                                                             error={
//                                                                 !!touched.Standard && !!errors.Standard
//                                                             }
//                                                             helperText={
//                                                                 touched.Standard && errors.Standard
//                                                             }
//                                                             focused
//                                                             InputLabelProps={{
//                                                                 shrink: true, // ✅ prevents overlap
//                                                             }}
//                                                             url={`${listViewurl}?data=${JSON.stringify({
//                                                                 Query: {
//                                                                     AccessID: "2183",
//                                                                     ScreenName: "Standard",
//                                                                     VerticalLicense: "003",
//                                                                     Filter: `CompanyID='${CompanyID}'`,
//                                                                     Any: "",
//                                                                 },
//                                                             })}`}
//                                                         />

//                                                         <PartySingleSelect
//                                                             sx={{
//                                                                 "& .MuiOutlinedInput-root": {
//                                                                     backgroundColor: "#fff",
//                                                                     borderRadius: "6px",

//                                                                     "& fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 light grey border
//                                                                     },
//                                                                     "&:hover fieldset": {
//                                                                         borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                                     },
//                                                                     "&.Mui-focused fieldset": {
//                                                                         borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                         borderWidth: "1px",
//                                                                     },
//                                                                 },

//                                                                 "& .MuiInputLabel-root": {
//                                                                     color: "#6b7280", // label grey
//                                                                 },
//                                                                 "& .MuiInputLabel-root.Mui-focused": {
//                                                                     color: "#6b7280", // keep same on focus
//                                                                 },
//                                                             }}
//                                                             id="Student"
//                                                             name="Student"
//                                                             label={
//                                                                 <>
//                                                                     Student
//                                                                     <span
//                                                                         style={{
//                                                                             color: "red",
//                                                                             fontSize: "20px",
//                                                                         }}
//                                                                     >
//                                                                         *
//                                                                     </span>
//                                                                 </>
//                                                             }
//                                                             variant="outlined"
//                                                             size="small"
//                                                             focused
//                                                             value={values.Student}
//                                                             onChange={(newValue) => {
//                                                                 setFieldValue("Student", newValue);
//                                                                 // setFieldTouched("Student", true);
//                                                             }}
//                                                             error={!!touched.Student && !!errors.Student}
//                                                             helperText={touched.Student && errors.Student}
//                                                             InputLabelProps={{
//                                                                 shrink: true, // ✅ prevents overlap
//                                                             }}
//                                                             url={`${listViewurl}?data=${JSON.stringify({
//                                                                 Query: {
//                                                                     AccessID: "2182",
//                                                                     ScreenName: "Student",
//                                                                     VerticalLicense: "003",
//                                                                     Filter: `CompanyID='${CompanyID}' AND ProjectID='${values?.Standard?.RecordID ? values?.Standard?.RecordID : ""}'`,
//                                                                     Any: "",
//                                                                 },
//                                                             })}`}
//                                                         />
//                                                     </Box>
//                                                 )}

//                                                 {/* MESSAGE */}
//                                                 <TextField
//                                                     fullWidth
//                                                     multiline
//                                                     variant="outlined"
//                                                     size="small"
//                                                     focused
//                                                     rows={2}
//                                                     name="Message"
//                                                     // label="Message"
//                                                     label={
//                                                         <>
//                                                             Message
//                                                             <span
//                                                                 style={{ color: "red", fontSize: "20px" }}
//                                                             >
//                                                                 *
//                                                             </span>
//                                                         </>
//                                                     }
//                                                     placeholder="Enter the event details (date, time, venue, and important instructions)"
//                                                     value={values.Message}
//                                                     onChange={handleChange}
//                                                     error={!!touched.Message && !!errors.Message}
//                                                     helperText={touched.Message && errors.Message}
//                                                     sx={{
//                                                         "& .MuiOutlinedInput-root": {
//                                                             backgroundColor: "#fff",
//                                                             borderRadius: "6px",

//                                                             "& fieldset": {
//                                                                 borderColor: "#d1d5db", // 👈 light grey border
//                                                             },
//                                                             "&:hover fieldset": {
//                                                                 borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                             },
//                                                             "&.Mui-focused fieldset": {
//                                                                 borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                 borderWidth: "1px",
//                                                             },
//                                                         },

//                                                         "& .MuiInputLabel-root": {
//                                                             color: "#6b7280", // label grey
//                                                         },
//                                                         "& .MuiInputLabel-root.Mui-focused": {
//                                                             color: "#6b7280", // keep same on focus
//                                                         },
//                                                     }}
//                                                 />

                                             
//                                                 <TextField
//                                                     fullWidth
//                                                     select
//                                                     variant="outlined"
//                                                     size="small"
//                                                     focused
//                                                     name="AddressedTo"
//                                                     // label="Event Type"
//                                                     label={
//                                                         <>
//                                                             Addressed To
//                                                             <span
//                                                                 style={{ color: "red", fontSize: "20px" }}
//                                                             >
//                                                                 *
//                                                             </span>
//                                                         </>
//                                                     }
//                                                     value={values.AddressedTo}
//                                                     onBlur={handleBlur}
//                                                     onChange={handleChange}
//                                                     error={
//                                                         !!touched.AddressedTo && !!errors.AddressedTo
//                                                     }
//                                                     helperText={
//                                                         touched.AddressedTo && errors.AddressedTo
//                                                     }
//                                                     sx={{
//                                                         "& .MuiOutlinedInput-root": {
//                                                             backgroundColor: "#fff",
//                                                             borderRadius: "6px",

//                                                             "& fieldset": {
//                                                                 borderColor: "#d1d5db", // 👈 light grey border
//                                                             },
//                                                             "&:hover fieldset": {
//                                                                 borderColor: "#bfc4cc", // 👈 slightly darker on hover
//                                                             },
//                                                             "&.Mui-focused fieldset": {
//                                                                 borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
//                                                                 borderWidth: "1px",
//                                                             },
//                                                         },

//                                                         "& .MuiInputLabel-root": {
//                                                             color: "#6b7280", // label grey
//                                                         },
//                                                         "& .MuiInputLabel-root.Mui-focused": {
//                                                             color: "#6b7280", // keep same on focus
//                                                         },
//                                                     }}
//                                                 >
//                                                     <MenuItem value="All">All</MenuItem>
//                                                     <MenuItem value="Parents&Students">
//                                                         Parents & Students
//                                                     </MenuItem>
//                                                     <MenuItem value="ParentsOnly">
//                                                         Parents Only
//                                                     </MenuItem>
//                                                     <MenuItem value="StaffOnly">
//                                                         Staff Only
//                                                     </MenuItem>
//                                                 </TextField>
//                                                 <Box
//                                                     display="grid"
//                                                     gridTemplateColumns={isNonMobile ? "1fr" : "1fr"}
//                                                     gap={2}
//                                                 >
//                                                     <Box>
//                                                         <Typography
//                                                             variant="subtitle2"
//                                                             sx={{
//                                                                 mb: 1,
//                                                                 fontWeight: 600,
//                                                                 color: "#6B7280",
//                                                             }}
//                                                         >
//                                                             Attach General
//                                                         </Typography>

//                                                         <Box
//                                                             component="label"
//                                                             sx={{
//                                                                 border: "1px dashed #D1D5DB",
//                                                                 borderRadius: "10px",
//                                                                 backgroundColor: "#F9FAFB",
//                                                                 height: "56px",
//                                                                 display: "flex",
//                                                                 alignItems: "center",
//                                                                 justifyContent: "center",
//                                                                 cursor: "pointer",
//                                                                 transition: "0.2s",
//                                                                 "&:hover": {
//                                                                     backgroundColor: "#F3F4F6",
//                                                                 },
//                                                             }}
//                                                         >
//                                                             <input
//                                                                 hidden
//                                                                 type="file"
//                                                                 accept="image/*,video/*,audio/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                                                                 // accept="image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                                                                 // onChange={(event) => {
//                                                                 //     const file = event.currentTarget.files[0];
//                                                                 //     setFieldValue("SyllabusFile", file);
//                                                                 // }}
//                                                                 onChange={getFileChange}
//                                                             />

//                                                             <Typography fontSize="14px" color="#6B7280">
//                                                                 Click to upload file
//                                                             </Typography>
//                                                         </Box>

//                                                         <Button
//                                                             // size="small"
//                                                             variant="contained"
//                                                             component={"a"}
//                                                             sx={{
//                                                                 marginTop: "10px",
//                                                                 width: "100%",
//                                                             }}
//                                                             onClick={() => {
//                                                                 data?.Attachment || emergencyImage
//                                                                     ? window.open(
//                                                                         emergencyImage
//                                                                             ? store.getState().globalurl
//                                                                                 .attachmentUrl + emergencyImage
//                                                                             : store.getState().globalurl
//                                                                                 .attachmentUrl +
//                                                                             data?.Attachment,
//                                                                         "_blank",
//                                                                     )
//                                                                     : data?.Video || emergencyvideo
//                                                                         ? window.open(
//                                                                             emergencyvideo
//                                                                                 ? store.getState().globalurl
//                                                                                     .videoAttachmentUrl +
//                                                                                 emergencyvideo
//                                                                                 : store.getState().globalurl
//                                                                                     .videoAttachmentUrl +
//                                                                                 data?.Video,
//                                                                             "_blank",
//                                                                         )
//                                                                         : data?.Audio || emergencyaudio
//                                                                             ? window.open(
//                                                                                 emergencyaudio
//                                                                                     ? store.getState().globalurl
//                                                                                         .audioAttachmentUrl +
//                                                                                     emergencyaudio
//                                                                                     : store.getState().globalurl
//                                                                                         .audioAttachmentUrl +
//                                                                                     data?.Audio,
//                                                                                 "_blank",
//                                                                             )
//                                                                             : toast.error("Please Upload File");
//                                                             }}
//                                                         >
//                                                             View Uploaded File
//                                                         </Button>
//                                                     </Box>
//                                                 </Box>
//                                                 {/* NOTIFY OPTIONS */}
//                                                 <Box>
//                                                     <Typography
//                                                         variant="subtitle2"
//                                                         sx={{
//                                                             mb: 2,
//                                                             fontWeight: 600,
//                                                             color: "#6B7280",
//                                                         }}
//                                                     >
//                                                         Notify Via
//                                                     </Typography>

//                                                     <Box
//                                                         display="flex"
//                                                         flexDirection="column"
//                                                         gap={1.5}
//                                                     >
//                                                         {[
//                                                             {
//                                                                 label: "Mail",
//                                                                 field: "Email",
//                                                             },
//                                                             {
//                                                                 label: "WhatsApp",
//                                                                 field: "WhatsApp",
//                                                             },
//                                                             {
//                                                                 label: "SMS",
//                                                                 field: "SMS",
//                                                             },
//                                                             {
//                                                                 label: "Acknowledgement Required",
//                                                                 field: "Acknowledgement",
//                                                             },
//                                                         ].map((item) => (
//                                                             <Box
//                                                                 key={item.field}
//                                                                 display="flex"
//                                                                 justifyContent="space-between"
//                                                                 alignItems="center"
//                                                                 sx={{
//                                                                     borderBottom: "1px solid #E5E7EB",
//                                                                     pb: 1,
//                                                                 }}
//                                                             >
//                                                                 <Typography fontSize="14px">
//                                                                     {item.label}
//                                                                 </Typography>

//                                                                 <Switch
//                                                                     color="success"
//                                                                     checked={values[item.field]}
//                                                                     onChange={(e) =>
//                                                                         setFieldValue(
//                                                                             item.field,
//                                                                             e.target.checked,
//                                                                         )
//                                                                     }
//                                                                 />
//                                                             </Box>
//                                                         ))}
//                                                     </Box>
//                                                 </Box>

//                                                 {/* BUTTONS */}
//                                                 <Box
//                                                     display="flex"
//                                                     justifyContent="flex-end"
//                                                     gap={2}
//                                                     mt={2}
//                                                 >
//                                                     <LoadingButton
//                                                         sx={{
//                                                             textTransform: "none",
//                                                             borderRadius: 2,
//                                                             px: 4,
//                                                             bgcolor: "#0D9488",
//                                                             "&:hover": {
//                                                                 bgcolor: "#0F766E",
//                                                             },
//                                                         }}
//                                                         variant="contained"
//                                                         type="submit"
//                                                         loading={isLoading}
//                                                         disabled={mode === "V" || imageLoading}
//                                                     >
//                                                         Save
//                                                     </LoadingButton>
//                                                     <Button
//                                                         startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
//                                                         variant="outlined"
//                                                         sx={{
//                                                             textTransform: "none",
//                                                             borderRadius: 2,
//                                                             px: 4,
//                                                             bgcolor: "#F97316",
//                                                             color: "#ffff",
//                                                             "&:hover": {
//                                                                 bgcolor: "#EA580C",
//                                                                 color: "#ffff",
//                                                             },
//                                                         }}
//                                                         onClick={() =>
//                                                             navigate(
//                                                                 `/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.leaderID}/Events/${params.secondaryAccessID}/${params.parentID2}/G`,
//                                                                 { state: { ...state } },
//                                                             )
//                                                         }
//                                                     >
//                                                         Back To Events List
//                                                     </Button>
//                                                 </Box>
//                                             </Box>
//                                         </form>
//                                     );
//                                 }}
//                             </Formik>
//                         </Paper>
//                     </Box>
//                 </Box>
//             ) : (
//                 false
//             )}
//             {/* </Box>
//       </Box> */}
//         </React.Fragment>
//     );
// };

// export default EditGeneral;
