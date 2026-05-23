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
const Circular = () => {
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
    const imageLoading = useSelector((state) => state.imageApi.imgLoading);
    const uploadLoading = useSelector((state) => state.imageApi.videoLoading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const EmployeeID = sessionStorage.getItem("empID");
    const LoginID = sessionStorage.getItem("loginrecordID");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const location = useLocation();
    const state = location.state || {};
    const ViewStatus = state.ViewStatus;
    console.log("🚀 ~ EditOrder ~ ViewStatus:", ViewStatus)
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [circularImage, setCircularImage] = useState("");

    useEffect(() => {
        dispatch(EventsgetData({ accessID: "TR385", get: "get", recID, Type: "CI" }));
        setCircularImage(mode === "A" ? "" : data?.Attachment || "");
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

                    StartDate: Yup.string()
                        .typeError(data.EventCircular.StartDate)
                        .required(data.EventCircular.StartDate),
                    EndDate: Yup.string()
                        .typeError(data.EventCircular.EndDate)
                        .required(data.EventCircular.EndDate),
                    StartTime: Yup.string()
                        .typeError(data.EventCircular.StartTime)
                        .required(data.EventCircular.StartTime),

                    EndTime: Yup.string()
                        .typeError(data.EventCircular.EndTime)
                        .required(data.EventCircular.EndTime),
                    Message: Yup.string()
                        .typeError(data.EventCircular.Message)
                        .required(data.EventCircular.Message),
                    EventTitle: Yup.string()
                        .typeError(data.EventCircular.EventTitle)
                        .required(data.EventCircular.EventTitle),
                    AddressedTo: Yup.string()
                        .typeError(data.EventCircular.AddressedTo)
                        .required(data.EventCircular.AddressedTo),
                };
                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];

    const InitialValue = {
        StartDate: data.StartDate || "",
        EndDate: data.EndDate || "",
        CircularNumber: data.CircularNumber || "",
        EventTitle: data.EventTitle || "",
        Message: data.Description || "",
        StartTime: data.StartTime || "",
        EndTime: data.EndTime || "",
        AddressedTo: data.AddressedTo || "",
        AcknowledgementRequired: mode === "E" ? (data.AcknowledgementRequired === "Y" ? true : false) : true,
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
            CircularNumber: data.CircularNumber || "",
            EventTitle: values.EventTitle || "",
            StartDate: values.StartDate || "",
            EndDate: values.EndDate || "",
            StartTime: values.StartTime || "",
            EndTime: values.EndTime || "",
            AddressedTo: values.AddressedTo || "",
            Description: values.Message || "",
            Attachment: circularImage || "",
            AcknowledgementRequired: values.AcknowledgementRequired === true ? "Y" : "N",
            NotifyEmail: values.Email === true ? "Y" : "N",
            CreatedBy: LoginID,
            // CompanyID:CompanyID
        };

        const response = await dispatch(EventspostData({ accessID: "TR385", action, Type: "CI", idata, CompanyID }));
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
        // setCircularImage(event.target.files[0]);

        // console.log(event.target.files[0]);

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

        setCircularImage(file);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setCircularImage(fileData.payload.name);
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/CI`, {
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
                                {mode === "E" ? "Add Circular" : "Edit Circular"}
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
                                        gap={1.5}
                                        padding={3}
                                    >
                                        {/* TOP ROW */}
                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            {CompanyAutoCode == "Y" ? (
                                                <TextField
                                                    name="CircularNumber"
                                                    type="text"
                                                    id="CircularNumber"
                                                    label="Circular Number"
                                                    placeholder="Auto"
                                                    variant="standard"
                                                    focused
                                                    // required
                                                    value={values.CircularNumber}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.CircularNumber && !!errors.CircularNumber}
                                                    helperText={touched.CircularNumber && errors.CircularNumber}
                                                    sx={{
                                                        backgroundColor: "#ffffff",
                                                        "& .MuiFilledInput-root": {
                                                            backgroundColor: "#f5f5f5 ",
                                                        },
                                                    }}
                                                    InputProps={{ readOnly: true }}
                                                // autoFocus
                                                />
                                            ) : (
                                                <TextField
                                                    name="CircularNumber"
                                                    type="text"
                                                    id="CircularNumber"
                                                    label={
                                                        <>
                                                            Circular Number
                                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                                *
                                                            </span>
                                                        </>
                                                    }
                                                    variant="standard"
                                                    focused
                                                    // required
                                                    value={values.CircularNumber}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.CircularNumber && !!errors.CircularNumber}
                                                    helperText={touched.CircularNumber && errors.CircularNumber}
                                                    sx={{
                                                        backgroundColor: "#ffffff",
                                                        "& .MuiFilledInput-root": {
                                                            backgroundColor: "#f5f5f5 ",
                                                        },
                                                    }}
                                                    autoFocus
                                                />
                                            )}

                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant="standard"
                                                focused
                                                name="EventTitle"
                                                label={
                                                    <>
                                                        Subject
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EventTitle}
                                                placeholder="eg. Fee Payment remainder - Term 2"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.EventTitle && !!errors.EventTitle}
                                                helperText={touched.EventTitle && errors.EventTitle}
                                            />
                                            <TextField
                                                fullWidth
                                                type="date"
                                                variant="standard"
                                                focused
                                                name="StartDate"
                                                // label="Event Date"
                                                label={
                                                    <>
                                                        Start Date
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.StartDate}
                                                inputFormat="YYYY-MM-DD"
                                                onBlur={handleBlur}
                                                // onChange={handleChange}
                                                onChange={(e) => handleDateChange(e, handleChange)}
                                                error={!!touched.StartDate && !!errors.StartDate}
                                                helperText={touched.StartDate && errors.StartDate}
                                            />
                                            <TextField
                                                fullWidth
                                                type="date"
                                                variant="standard"
                                                focused
                                                name="EndDate"
                                                // label="Event Date"
                                                label={
                                                    <>
                                                        End Date
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EndDate}
                                                inputFormat="YYYY-MM-DD"
                                                onBlur={handleBlur}
                                                // onChange={handleChange}
                                                onChange={(e) => handleDateChange(e, handleChange)}
                                                error={!!touched.EndDate && !!errors.EndDate}
                                                helperText={touched.EndDate && errors.EndDate}
                                                InputProps={{
                                                    inputProps: {
                                                        min: values.StartDate || ""
                                                    }
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                type="time"
                                                variant="standard"
                                                focused
                                                name="StartTime"
                                                // label="Time"
                                                label={
                                                    <>
                                                        Start Time
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.StartTime}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.StartTime && !!errors.StartTime}
                                                helperText={touched.StartTime && errors.StartTime}
                                            />
                                            <TextField
                                                fullWidth
                                                type="time"
                                                variant="standard"
                                                focused
                                                name="EndTime"
                                                // label="End Time"
                                                label={
                                                    <>
                                                        End Time
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.EndTime}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    const endTime = e.target.value;
                                                    const startTime = values.StartTime;

                                                    if (!startTime) {
                                                        handleChange(e);
                                                        return;
                                                    }

                                                    const start = new Date(`1970-01-01T${startTime}`);
                                                    const end = new Date(`1970-01-01T${endTime}`);

                                                    if (end <= start) {
                                                        setFieldValue("EndTime", "");
                                                        toast.error("End Time cannot be lesser than or equal to Start Time")
                                                        return;
                                                    }

                                                    handleChange(e);
                                                }}
                                                error={!!touched.EndTime && !!errors.EndTime}
                                                helperText={touched.EndTime && errors.EndTime}
                                            />
                                        </Box>

                                        <Box
                                            display="grid"
                                            gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
                                            gap={2}
                                        >
                                            <TextField
                                                fullWidth
                                                select
                                                variant="standard"
                                                focused
                                                name="AddressedTo"
                                                // label="Event Type"
                                                label={
                                                    <>
                                                        Addressed To
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                value={values.AddressedTo}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.AddressedTo && !!errors.AddressedTo}
                                                helperText={touched.AddressedTo && errors.AddressedTo}
                                            >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Parents&Students">Parents & Students</MenuItem>
                                                <MenuItem value="ParentsOnly">Parents Only</MenuItem>
                                                <MenuItem value="StaffOnly">Staff Only</MenuItem>

                                            </TextField>
                                            {/* MESSAGE */}
                                            <TextField
                                                fullWidth
                                                // multiline
                                                variant="standard"
                                                focused
                                                rows={2}
                                                name="Message"
                                                // label="Preparation Notes"
                                                label={
                                                    <>
                                                        Message
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                placeholder="eg. Workshop objectives, topics covered, reason for meeting.."
                                                value={values.Message}
                                                onChange={handleChange}
                                                error={!!touched.Message && !!errors.Message}
                                                helperText={touched.Message && errors.Message}
                                            />
                                        </Box>


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
                                                    Attach file
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
                                                        // accept=".pdf"
                                                        accept="image/*,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                                                        Click to upload file
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
                                                        data?.Attachment || circularImage
                                                            ? window.open(
                                                                circularImage
                                                                    ? store.getState().globalurl.attachmentUrl +
                                                                    circularImage
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

                                                    // {
                                                    //     label: "WhatsApp",
                                                    //     field: "WhatsApp",
                                                    // },
                                                    {
                                                        label: "Email",
                                                        field: "Email",
                                                    },
                                                    {
                                                        label: "Acknowledgement Required",
                                                        field: "AcknowledgementRequired",
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
                                                disabled={imageLoading || mode === "V"}
                                            >
                                                Save
                                            </LoadingButton>
                                            <Button
                                                startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/CI`,
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

export default Circular;
