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
import * as Yup from "yup";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../..";
// import CryptoJS from "crypto-js";
const EditSports = () => {
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

    const [buttonValue, setButtonValue] = useState("whole");
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [sportsImage, setSportsImage] = useState("");

    useEffect(() => {
        dispatch(EventsgetData({ accessID: "TR385", get: "get", recID, Type: "S" }));
        setSportsImage(mode === "A" ? "" : data?.Attachment || "");
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
                    EventTitle: Yup.string()
                        .typeError(data.EventSports.EventTitle)
                        .required(data.EventSports.EventTitle),

                    EventDate: Yup.string()
                        .typeError(data.EventSports.EventDate)
                        .required(data.EventSports.EventDate),

                    EventType: Yup.string()
                        .typeError(data.EventSports.EventType)
                        .required(data.EventSports.EventType),

                    EventStartTime: Yup.string()
                        .typeError(data.EventSports.EventStartTime)
                        .required(data.EventSports.EventStartTime),
                    Venue: Yup.string()
                        .typeError(data.EventSports.Venue)
                        .required(data.EventSports.Venue),
                    Message: Yup.string()
                        .typeError(data.EventSports.Message)
                        .required(data.EventSports.Message),
                    ApplicableTo: Yup.array()
                        .min(1, data.EventSports.ApplicableTo)
                        .required(data.EventSports.ApplicableTo),

                };
                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];

    const InitialValue = {
        EventTitle: data.EventTitle || "",
        EventType: data.EventType || "",
        EventDate: data.EventDate || "",
        ApplicableTo: Array.isArray(data?.StdActivitiesID)
            ? data?.StdActivitiesID.map((d) => ({
                RecordID: String(d.StdActivitiesID),
                Name: d.StdActivitiesName,
                Code: d.StdActivitiesCode,
            }))
            : [],
        Message: data.Description || "",
        ParticipationLimit: data.ParticipantLimit || "",
        EventStartTime: data.StartTime || "",
        Venue: data.Venue || "",
        Format: data.Format || "",
        AgeGroup: data.AgeGroup || "",
        WhatsApp: mode === "E" ? (data?.NotifyWhatsapp === "Y" ? true : false) : true,
        // Email: mode === "E" ? (data?.NotifyWhatsapp === "Y" ? true : false) : true,
        RegistrationRequired: mode === "E" ? (data?.RegistrationRequired === "Y" ? true : false) : true,
        // SyllabusFile: null,
    };

    const Fnsave = async (values, del, override = {}) => {
        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";
        var isCheck = "N";
        if (values.disable == true) {
            isCheck = "Y";
        }

        const idata = {
            RecordID: recID,
            EventCategoryID: params.parentID2,
            EventTitle: values.EventTitle || "",
            EventDate: values.EventDate || "",
            EventType: values.EventType || "",
            StdActivitiesID:
                values?.ApplicableTo
                    ?.map((item) => item.RecordID)
                    .join(",")
                || "",
            Description: values.Message || "",
            ParticipantLimit: values.ParticipationLimit || "",
            StartTime: values.EventStartTime || "",
            Venue: values.Venue || "",
            Format: values.Format || "",
            AgeGroup: values.AgeGroup || "",
            NotifyWhatsapp: values.WhatsApp === true ? "Y" : "N",
            // NotifyEmail: values.Email === true ? "Y" : "N",
            RegistrationRequired: values.RegistrationRequired === true ? "Y" : "N",
            Attachment: sportsImage || ""
        };

        const response = await dispatch(EventspostData({ accessID: "TR385", action, idata, Type: "S" }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg);

        }
    };


    const handleButtonClick = (value) => {
        setButtonValue(value);
    }

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
        setSportsImage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setSportsImage(fileData.payload.name);
        // sessionStorage.setItem("sportsImage", fileData.payload.name);
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/S`, {
                                        state: { ...state }
                                    })
                                }}
                            >
                                {`Event(${state.BreadCrumb2 || ""})`}
                            </Typography>

                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                            >
                                {mode === "E" ? "Add (Sports Event)" : "Edit (Sports Event)"}
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
                                                // label="Sport Type"
                                                label={
                                                    <>
                                                        Sport Type
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
                                                <MenuItem value="Athletics">Athletics</MenuItem>
                                                <MenuItem value="Cricket">Cricket</MenuItem>
                                                <MenuItem value="Football">Foot Ball</MenuItem>
                                                <MenuItem value="Basketball">Basket Ball</MenuItem>
                                                <MenuItem value="Chess">Chess</MenuItem>
                                                <MenuItem value="Volleyball">Volley Ball</MenuItem>
                                                <MenuItem value="Throwball">Throw Ball</MenuItem>
                                                <MenuItem value="Others">Others</MenuItem>
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
                                                onChange={handleChange}
                                                error={!!touched.EventDate && !!errors.EventDate}
                                                helperText={touched.EventDate && errors.EventDate}
                                            />
                                            <TextField
                                                fullWidth
                                                type="time"
                                                variant="standard"
                                                focused
                                                name="EventStartTime"
                                                // label="Event Date"
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
                                                type="text"
                                                variant="standard"
                                                focused
                                                name="Venue"
                                                // label="Venue"
                                                label={
                                                    <>
                                                        Venue
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                id="Venue"
                                                placeholder="eg. Ground/Hall"
                                                value={values.Venue}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.Venue && !!errors.Venue}
                                                helperText={touched.Venue && errors.Venue}
                                            />


                                        </Box>
                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <TextField
                                                fullWidth
                                                select
                                                variant="standard"
                                                focused
                                                name="Format"
                                                id="Format"
                                                label="Format"
                                                value={values.Format}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Individual">Individual</MenuItem>
                                                <MenuItem value="Team">Team</MenuItem>
                                                <MenuItem value="Both">Both</MenuItem>

                                            </TextField>
                                            <TextField
                                                fullWidth
                                                select
                                                variant="standard"
                                                focused
                                                name="AgeGroup"
                                                id="AgeGroup"
                                                label="Age Group"
                                                value={values.AgeGroup}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="All">Individual</MenuItem>
                                                <MenuItem value="U-10">U-10</MenuItem>
                                                <MenuItem value="U-12">U-12</MenuItem>
                                                <MenuItem value="U-14">U-14</MenuItem>
                                                <MenuItem value="Open">Open</MenuItem>

                                            </TextField>

                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="standard"
                                                focused
                                                name="ParticipationLimit"
                                                label="Participation Limit"
                                                placeholder="eg. 100"
                                                value={values.ParticipationLimit}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.ParticipationLimit && !!errors.ParticipationLimit}
                                                helperText={touched.ParticipationLimit && errors.ParticipationLimit}
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
                                            label="Prizes/Awards"
                                            placeholder="Gold, Silver, Bronze, Participation certificate.."
                                            value={values.Message}
                                            onChange={handleChange}
                                        />

                                        {/* ACTION + CONTACT */}
                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr" : "1fr"}
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
                                                    Attach Files (PDF)
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
                                                        marginTop: "10px",
                                                        width: "100%"
                                                    }}
                                                    onClick={() => {
                                                        data?.Attachment || sportsImage
                                                            ? window.open(
                                                                sportsImage
                                                                    ? store.getState().globalurl.attachmentUrl +
                                                                    sportsImage
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
                                                        label: "Registration Required",
                                                        field: "RegistrationRequired",
                                                    },
                                                    // {
                                                    //     label: "Mail",
                                                    //     field: "Email",
                                                    // },
                                                    {
                                                        label: "WhatsApp",
                                                        field: "WhatsApp",
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
                                                Open Registrarion & Publish
                                            </LoadingButton>
                                            <Button
                                                startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/S`,
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

export default EditSports;
