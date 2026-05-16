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
import { PartySingleSelect } from "../../../ui-components/global/Autocomplete";
import * as Yup from "yup";
// import CryptoJS from "crypto-js";
const EditCulturals = () => {
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

    const [buttonValue, setButtonValue] = useState("whole");
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [culturalImage, setCulturalImage] = useState("");
    const [validationSchema, setValidationSchema] = useState(null);
    // useEffect(() => {
    //     dispatch(EventsgetData({ accessID: "TR385", get: "get", recID, Type: "C" }));
    //     setCulturalImage(mode === "A" ? "" : data?.Attachment || "");
    // }, [location.key, mode]);


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
                        .typeError(data.EventCulturals.EventTitle)
                        .required(data.EventCulturals.EventTitle),

                    EventDate: Yup.string()
                        .typeError(data.EventCulturals.EventDate)
                        .required(data.EventCulturals.EventDate),

                    EventType: Yup.string()
                        .typeError(data.EventCulturals.EventType)
                        .required(data.EventCulturals.EventType),

                    EventStartTime: Yup.string()
                        .typeError(data.EventCulturals.EventStartTime)
                        .required(data.EventCulturals.EventStartTime),
                   
                    Message: Yup.string()
                        .typeError(data.EventCulturals.Message)
                        .required(data.EventCulturals.Message),
                    Venue: Yup.string()
                        .typeError(data.EventCulturals.Venue)
                        .required(data.EventCulturals.Venue),
                   
                };
                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];

    const InitialValue = {
        EventTitle: "",
        EventType: "",
        EventDate:"",
        EventStartTime:"",
        Venue:"",
        Theme:"",
        ChiefGuest:"",
        Message:"",
        NotifyMail:"",
        TicketEntryRequired:""
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
            Attachment: culturalImage || "",
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

        const response = await dispatch(EventspostData({ accessID: "TR385", action, Type: "C", idata }));
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/C`, {
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
                                {mode === "E" ? "Add (Culturals)" : "Edit (Culturals)"}
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
                        // onSubmit={(values, setSubmitting) => {
                        //     setTimeout(() => {
                        //         Fnsave(values);
                        //     }, 100);
                        // }}
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
                                                // label="Programme Type"
                                                 label={
                                                    <>
                                                        Programme Type
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
                                                <MenuItem value="AnnualDay">Annual Day</MenuItem>
                                                <MenuItem value="Dance">Dance</MenuItem>
                                                <MenuItem value="Drama">Drama</MenuItem>
                                                <MenuItem value="Music">Music</MenuItem>
                                                <MenuItem value="ArtExhibition">Art Exhibition</MenuItem>
                                                <MenuItem value="Elocution">Elocution</MenuItem>
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
                                                // label="Time"
                                                 label={
                                                    <>
                                                        Time
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
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="standard"
                                                focused
                                                name="Theme"
                                                label="Theme"
                                                id="Theme"
                                                placeholder="eg. Unity In Diversity"
                                                value={values.Theme}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.Theme && !!errors.Theme}
                                                helperText={touched.Theme && errors.Theme}
                                            />
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="standard"
                                                focused
                                                name="ChiefGuest"
                                                label="Chief Guest"
                                                id="ChiefGuest"
                                                placeholder="Name & Designation"
                                                value={values.ChiefGuest}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.ChiefGuest && !!errors.ChiefGuest}
                                                helperText={touched.ChiefGuest && errors.ChiefGuest}
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
                                            // label="Programme Schedule"
                                             label={
                                                    <>
                                                        Programme Schedule
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                            placeholder="List Of performances, timings..."
                                            value={values.Message}
                                            onChange={handleChange}
                                        />

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
                                                        label: "Mail",
                                                        field: "PushNotification",
                                                    },
                                                    {
                                                        label: "WhatsApp",
                                                        field: "WhatsApp",
                                                    },
                                                    {
                                                        label: "TicketEntryPass",
                                                        field: "Ticket / Entry Pass Required",
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
                                                Notify & Publish
                                            </LoadingButton>
                                            <Button
                                                startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/C`,
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

export default EditCulturals;
