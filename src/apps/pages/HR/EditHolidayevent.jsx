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

const EditHolidayevent = () => {
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
    const state = location.state || {};
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
                                    navigate(`/Apps/SecondarylistView/TR384/Event%20Category/${params.parentID3}/Events/TR385/${params.parentID2}/HO`, {
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
                                {mode === "E" ? "Add (Holiday)" : "Edit (Holiday)"}
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
                                        name="holidayname"
                                        type="text"
                                        id="holidayname"
                                        label={
                                            <>
                                                Holiday Name<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        value={values.holidayname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.holidayname && !!errors.holidayname}
                                        helperText={touched.holidayname && errors.holidayname}
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
                                        label="Holiday Type"
                                        id="holidaytype"
                                        name="holidaytype"
                                        value={values.holidaytype}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        variant="standard"
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    >
                                        <MenuItem value="A">National</MenuItem>
                                        <MenuItem value="B">Regional</MenuItem>
                                        <MenuItem value="C">School</MenuItem>
                                        <MenuItem value="D">Religious</MenuItem>
                                        <MenuItem value="E">Exam Leave</MenuItem>

                                    </TextField>
                                    <TextField
                                        name="fromdate"
                                        type="date"
                                        id="fromdate"
                                        label={
                                            <>
                                                From Date<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.fromdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.fromdate && !!errors.fromdate}
                                        helperText={touched.fromdate && errors.fromdate}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />

                                    <TextField
                                        name="todate"
                                        type="date"
                                        id="todate"
                                        label="To Date"
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.todate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.todate && !!errors.todate}
                                        helperText={touched.todate && errors.todate}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="schoolreopen"
                                        type="date"
                                        id="schoolreopen"
                                        label="School Reopens"
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.schoolreopen}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.schoolreopen && !!errors.schoolreopen}
                                        helperText={touched.schoolreopen && errors.schoolreopen}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5",
                                            }
                                        }}
                                        autoFocus
                                    />

                                    <TextField
                                        name="reason"
                                        type="text"
                                        id="reason"
                                        label="Reason/Note"
                                        variant="standard"
                                        focused
                                        value={values.reason}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        error={!!touched.reason && !!errors.reason}
                                        helperText={touched.reason && errors.reason}
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
                                        name="compensatoryworking"
                                        id="compensatoryworking"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Compensatory Working day"
                                    />

                                    <FormLabel focused={false}>Compensatory Working day</FormLabel>

                                    <Field
                                        type="checkbox"
                                        name="PushNotification"
                                        id="PushNotification"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Push Notification"
                                    />
                                    <FormLabel focused={false}>Push Notification</FormLabel>
                                    <Field
                                        //  size="small"
                                        type="checkbox"
                                        name="Whatsapp"
                                        id="Whatsapp"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as={Checkbox}
                                        label="Whatsapp"
                                    />

                                    <FormLabel focused={false}>Whatsapp</FormLabel>

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
                                            Publish Circular
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

export default EditHolidayevent;
