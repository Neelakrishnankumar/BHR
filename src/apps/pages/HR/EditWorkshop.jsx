import React from "react";
import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    Tooltip,
    Checkbox,
    LinearProgress,
    useMediaQuery,
    useTheme,
    Paper, Breadcrumbs,
    MenuItem
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Field, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { postData, getFetchData } from "../../../store/reducers/Formapireducer";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import store from "../../..";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";

const EditWorkshop = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();

    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    // Redux state
    const data = useSelector((state) => state.formApi.Data);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");

    // Page params
    const recID = params.id;
    const mode = params.Mode;
    const accessID = params.accessID;
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [gstImage, setGstImage] = useState("");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({

                    Date: Yup.string().required(data.Holidaylist.Date),
                    subject: Yup.string().trim().required(data.Holidaylist.subject),
                    name: Yup.string().trim().required(data.Holidaylist.name),

                });

                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    useEffect(() => {
        if (data) {
            setGstImage(data.CM_GSTIMAGE || "");
        }
    }, [data]);
    useEffect(() => {
        // Fetch data only when the recID or mode changes
        if (recID && mode === "E") {
            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
        else {
            dispatch(getFetchData({ accessID, get: "get", recID }));

        }
    }, [location.key, recID, mode]);

    // Ensure data is available before rendering form
    if (!data && getLoading) {
        return <LinearProgress />;
    }

    const InitialValue = {
        subject: data?.Occasion || "",
        comments: data?.Description || "",
        Date: data?.Date || "",
        circularno: data?.SortOrder || "",
        PushNotification: data?.Disable === "Y" ? true : false,
        Acknowledgement: data.DeleteFlag === "Y" ? true : false,
        email: data.Email === "Y" ? true : false

    };

    const Fnsave = async (values, del) => {
        setLoading(true);

        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";

        const isCheck = values.disable ? "Y" : "N";

        const idata = {
            RecordID: recID,
            Occasion: values.subject,
            Description: values.comments,
            HolidayDate: values.Date,
            SortOrder: values.circularno || 0,
            Disable: isCheck,
            DeleteFlag: values.delete == true ? "Y" : "N",
            Finyear,
            CompanyID,
        };

        try {
            const response = await dispatch(postData({ accessID, action, idata }));

            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                navigate(-1);
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("An error occurred while saving data.");
        } finally {
            setLoading(false);
        }
    };
    const getFile = async (event) => {
        setGstImage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setGstImage(fileData.payload.name);
        console.log(">>>", fileData.payload);
        console.log(
            "fileData:",
            fileData
        );
        if (fileData.payload.Status == "Y") {
            // console.log("I am here");
            toast.success(fileData.payload.Msg);
        }
    };
    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData.Warningmsg[props],
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
                    navigate("/Apps/TR218/Holiday List");
                }
            }
        });
    };

    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : null}

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

                                >
                                    Workshop Event
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
                        initialValues={InitialValue}
                        onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                                Fnsave(values);
                            }, 100);
                        }}
                        // validationSchema={validationSchema}
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
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    // gap="30px"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >
                                    <TextField
                                        name="workshoptitle"
                                        type="text"
                                        id="workshoptitle"
                                        label={
                                            <>
                                                Workshop Title<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        value={values.workshoptitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.workshoptitle && !!errors.workshoptitle}
                                        helperText={touched.workshoptitle && errors.workshoptitle}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        select
                                        label="Type"
                                        id="meetingtype"
                                        name="meetingtype"
                                        value={values.meetingtype}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        variant="standard"
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    >
                                        <MenuItem value="A">Student Workshop</MenuItem>
                                        <MenuItem value="B">Teacher Training</MenuItem>
                                        <MenuItem value="C">Parent Session</MenuItem>
                                        <MenuItem value="D">Seminar</MenuItem>

                                    </TextField>
                                    <TextField
                                        name="Date"
                                        type="date"
                                        id="Date"
                                        label={
                                            <>
                                                Date<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.Date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.Date && !!errors.Date}
                                        helperText={touched.Date && errors.Date}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="starttime"
                                        type="time"
                                        id="starttime"
                                        label="Start Time"
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.starttime}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.starttime && !!errors.starttime}
                                        helperText={touched.starttime && errors.starttime}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="venue"
                                        type="text"
                                        id="venue"
                                        label="Venue"
                                        variant="standard"
                                        focused
                                        value={values.venue}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.venue && !!errors.venue}
                                        helperText={touched.venue && errors.venue}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="facilitator"
                                        type="text"
                                        id="facilitator"
                                        label="Facilitator/Speaker"
                                        variant="standard"
                                        focused
                                        value={values.facilitator}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.facilitator && !!errors.facilitator}
                                        helperText={touched.facilitator && errors.facilitator}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        type="number"
                                        label="Participant Limit"
                                        id="limit"
                                        name="limit"
                                        value={values.limit}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        variant="standard"
                                    />
                                    <TextField
                                        name="description"
                                        type="text"
                                        id="description"
                                        label="Description"
                                        variant="standard"
                                        focused
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />

                                </Box>
                                <Box>
                                    <Field
                                        //  size="small"
                                        type="checkbox"
                                        name="registration"
                                        id="registration"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Registration Required"
                                    />

                                    <FormLabel focused={false}>Registration Required</FormLabel>

                                    <Field
                                        type="checkbox"
                                        name="Certification"
                                        id="Certification"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Certification Provided"
                                    />
                                    <FormLabel focused={false}>Certification Provided</FormLabel>
                                   
                                    <Field
                                        type="checkbox"
                                        name="Pushnotification"
                                        id="Pushnotification"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Push Notification"
                                    />
                                    <FormLabel focused={false}>Push Notification</FormLabel>
                                </Box>
                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                                    {YearFlag == "true" ? (
                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            loading={loading}
                                        >
                                            Publish
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            disabled={true}
                                        >
                                            Publish
                                        </Button>
                                    )}

                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : (
                false
            )}

        </React.Fragment>
    );
};

export default EditWorkshop;
