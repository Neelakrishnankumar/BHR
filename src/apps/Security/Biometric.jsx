import {
    Box,
    Checkbox,
    useTheme,
    Divider,
    Paper,
    Stack,
    TextField,
    FormControl,
    Popover,
    MenuItem,
    Select,
    InputLabel,
    IconButton,
    FormControlLabel,
    FormLabel,
    Button,
    Typography,
    InputBase,
    InputAdornment,
    Avatar,
    Tooltip,
    Breadcrumbs
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import store from "../..";
import { fileUpload, imageUpload } from "../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import { tokens } from "../../Theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import Header from "../../ui-components/Header";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Footer from "../../ui-components/Footer";
import ChGPassWord from "../../assets/img/ChGPassWord.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { formGap } from "../../ui-components/utils";
import { Settingsvalidation } from "./validation";
import { BiometricpostData, CompanydetailpostData, getBiometricData, getSettingsData, SettingspostData } from "../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useProSidebar } from "react-pro-sidebar";

const Biometricconfiguration = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const Subscriptioncode = sessionStorage.getItem("SubscriptionCode");
    const YearFlag = sessionStorage.getItem("YearFlag");
    const CompanyID = sessionStorage.getItem("compID");
    const Username = sessionStorage.getItem("UserName");
    const data = useSelector((state) => state.formApi.Data) || {};
    console.log(data, "--data");
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [Appname, setAppname] = useState("");
    const [author, setauthor] = useState("");
    const [Apikey, setApikey] = useState("");
    const [Url, setUrl] = useState("");
    const [Input, setInput] = useState("");
    const [pulling, setpulling] = useState("");
    const [time, settime] = useState("");
    const [errorMsgData, setErrorMsgData] = useState(null);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    useEffect(() => {
        if (data) {
            setAppname(data.ApplicationName);
            setauthor(data.Authorization || "");
            setApikey(data.ApiKey || "");
            setUrl(data.Url || "");
            setInput(data.Input || "");
            setpulling(data.PullingCycle || "");
            settime(data.DailyTime || "");
        }
    }, [data]);

    useEffect(() => {
        dispatch(getBiometricData({
            CompanyID
        }));
    }, [location.key]);



    const isNonMobile = useMediaQuery("(min-width:600px)");
    const style = {
        height: "55px",
        borderBottom: "2px solid #1769aa ",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
    };
    const initialvalues = {
        appname: data.ApplicationName,
        authorization: data.Authorization,
        apikey: data.ApiKey,
        url: data.Url,
        input: data.Input,
        time: data.DailyTime,
        pulling: data.PullingCycle == "D" ? "Daily" : "Hourly",
    };
    console.log(data.ApplicationName, "Application");
    console.log(Appname, "Appname");
    // const [value, setValues] = React.useState({
    //     showPassword: false,
    // });
    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...value,
    //         showPassword: !value.showPassword,
    //     });
    // };


    //settings password save 
    const fnSave = async (values) => {
        // let action = mode === "A" ? "insert" : "update";
        // let action =
        // mode === "A" && !del
        //   ? "insert"
        //   : mode === "E" && del
        //   ? "harddelete"
        //   : "update";
        //let action = "update";

        const idata = {
            action: "update",
            CompanyID,
            ApplicationName: Appname,
            Authorization: author,
            ApiKey: Apikey,
            Url: Url,
            Input: Input,
            DailyTime: time,
            PullingCycle: pulling

        };

        const response = await dispatch(BiometricpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            // navigate("/Apps/bioconfiguration");
        } else {
            toast.error(response.payload.Msg);
        }
    };
    const fnLogOut = (props) => {
        //   if(Object.keys(ref.current.touched).length === 0){
        //     if(props === 'Logout'){
        //       navigate("/")}
        //       if(props === 'Close'){
        //         navigate("/Apps/TR022/Bank Master")
        //       }

        //       return
        //  }
        Swal.fire({
            title: errorMsgData.Warningmsg[props],
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
                    //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
                    navigate("/Apps/HR");
                }
            } else {
                return;
            }
        });
    };

    return (
        <React.Fragment>
            {/* <Box m="10px">
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold" marginBottom={3}>
                    Biometric Integration
                </Typography> */}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        {broken && !rtl && (
                            <IconButton onClick={() => toggleSidebar()}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                        <Breadcrumbs
                            maxItems={3}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                        >

                            <Typography
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                variant="h5"

                            >
                                Biometric Integration
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
            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Formik
                    initialValues={initialvalues}
                    onSubmit={(values, setSubmitting, resetForm) => {
                        setTimeout(() => {
                            fnSave(values);
                            resetForm(); // Reset form after submission
                        }, 100);
                    }}
                    // onSubmit={(values, setSubmitting) => {
                    //     setTimeout(() => {
                    //         fnSave(values);
                    //     }, 100);
                    // }}
                    validationSchema={Settingsvalidation}
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
                        setFieldTouched,
                        resetForm
                    }) => (
                        <form onSubmit={handleSubmit}>

                            {/* <Divider variant="fullWidth" sx={{ mt: "20px" }} /> */}
                            {/* <Typography variant="h5" padding={1}>Biometric Integration:</Typography> */}

                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4",
                                    },
                                }}
                            >
                                {/* <TextField
                                        name="appname"
                                        type="text"
                                        id="appname"
                                        label="Application Name"
                                        variant="standard"
                                        focused
                                        value={Appname}
                                        onBlur={handleBlur}
                                        onChange={(e) => setAppname(e.target.value)}
                                        error={!!touched.appname && !!errors.appname}
                                        helperText={touched.appname && errors.appname}
                                        sx={{ gridColumn: "span 2" }}
                                    /> */}
                                <TextField
                                    name="appname"
                                    type="text"
                                    id="appname"
                                    label="Application Name"
                                    variant="standard"
                                    focused
                                    value={Appname}
                                    onChange={(e) => setAppname(e.target.value)}
                                    autoFocus
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    name="authorization"
                                    type="text"
                                    id="authorization"
                                    label="Authorization"
                                    variant="standard"
                                    focused
                                    value={author}
                                    onBlur={handleBlur}
                                    onChange={(e) => setauthor(e.target.value)}
                                    error={!!touched.authorization && !!errors.authorization}
                                    helperText={touched.authorization && errors.authorization}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    name="apikey"
                                    type="text"
                                    id="apikey"
                                    label="API Key"
                                    variant="standard"
                                    focused
                                    value={Apikey}
                                    onBlur={handleBlur}
                                    onChange={(e) => setApikey(e.target.value)}
                                    error={!!touched.apikey && !!errors.apikey}
                                    helperText={touched.apikey && errors.apikey}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    name="url"
                                    type="text"
                                    id="url"
                                    label="URL"
                                    variant="standard"
                                    focused
                                    value={Url}
                                    onBlur={handleBlur}
                                    onChange={(e) => setUrl(e.target.value)}
                                    error={!!touched.url && !!errors.url}
                                    helperText={touched.url && errors.url}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    name="input"
                                    type="text"
                                    id="input"
                                    label="Input"
                                    variant="outlined"
                                    focused
                                    rows={3}
                                    multiline
                                    value={Input}
                                    onChange={(e) => setInput(e.target.value)}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {/* <TextField
                                        name="input"
                                        type="text"
                                        id="input"
                                        label="Input Templates"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        fullWidth
                                        focused
                                        required
                                        value={values.input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onBlur={handleBlur}
                                        error={!!touched.input && !!errors.input}
                                        helperText={touched.input && errors.input}
                                        sx={{ gridColumn: "span 2" }}
                                    /> */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 2,
                                        gridColumn: "span 2",
                                        mt: 2, // margin top for spacing
                                    }}
                                >
                                    {/* Pulling Cycle Select */}
                                    <FormControl fullWidth focused>
                                        <InputLabel id="pulling">Pulling Cycle</InputLabel>
                                        <Select
                                            labelId="pulling"
                                            id="pulling"
                                            name="pulling"
                                            value={pulling}
                                            onBlur={handleBlur}
                                            onChange={(e) => setpulling(e.target.value)}
                                            label="Pulling Cycle"
                                        >
                                            <MenuItem value="D">Daily</MenuItem>
                                            <MenuItem value="H">Hourly</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {/* Time Input Field - Only when pulling is "D" */}
                                    {pulling === "D" && (
                                        <TextField
                                            name="time"
                                            type="time"
                                            id="time"
                                            label="Time"
                                            variant="standard"
                                            value={time}
                                            onBlur={handleBlur}
                                            onChange={(e) => settime(e.target.value)}
                                            focused
                                            fullWidth
                                        />
                                    )}
                                </Box>

                            </Box>

                            <Box
                                display="flex"
                                padding={1}
                                justifyContent="end"
                                mt="20px"
                                gap="20px"
                            >

                                <LoadingButton
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                    loading={isLoading}
                                    onClick={fnSave}
                                >
                                    Save
                                </LoadingButton>



                                <Button
                                    color={"warning"}
                                    variant="contained"
                                    onClick={() => resetForm()}
                                // onClick={() => {
                                //   navigate("/Apps/TR213/LeaveType");
                                // }}
                                >
                                    Cancel
                                </Button>
                            </Box>

                        </form>
                    )}
                </Formik>
            </Paper>
            {/* </Box> */}
        </React.Fragment>
    );
};
export default Biometricconfiguration;
