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
    Tooltip
} from "@mui/material";
import React, { useEffect, useState } from "react";

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
import { Productautocomplete } from "../../ui-components/global/Autocomplete";

const Geoconfiguration = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const Subscriptioncode = sessionStorage.getItem("SubscriptionCode");
    const YearFlag = sessionStorage.getItem("YearFlag");
    const CompanyID = sessionStorage.getItem("compID");
    const Username = sessionStorage.getItem("UserName");
    const data = useSelector((state) => state.formApi.Data) || {};
    console.log(data, "--data");
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [loction, setLoction] = useState(null);
    const [gate, setGate] = useState(null);
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");

    const [locgate, setLocgate] = useState(null);

    useEffect(() => {
        if (data) {

            setlatitude(data.Latitude || "");
            setlongitude(data.Longitude || "");
            // setLoction("");
            // setGate("");
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

        latitude: data.Latitude,
        longitude: data.Longitude,


    };

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
            // ApplicationName: Appname,
            // Authorization: author,
            Latitude: latitude,
            Longitude: longitude,
            LocationRecID: loction.RecordID || 0,
            GateRecID: gate.RecordID || 0,
            // Input: Input,
            // DailyTime: time,
            // PullingCycle: pulling

        };

        const response = await dispatch(BiometricpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate("/Apps/bioconfiguration");
        } else {
            toast.error(response.payload.Msg);
        }
    };


    return (
        <React.Fragment>
            <Box m="10px">
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold" marginBottom={3}>
                    Geo Fencing
                </Typography>
                <Paper elevation={3} sx={{ margin: "1px" }}>
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
                            resetForm,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>

                                {/* <Divider variant="fullWidth" sx={{ mt: "20px" }} /> */}
                                {/* <Typography variant="h5" padding={1}>Biometric Integration:</Typography> */}

                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                    gap={formGap}
                                    padding={1}
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
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
                                    {/* <FormControl
                                        sx={{

                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Productautocomplete
                                            name="location"
                                            label="Location"
                                            id="location"
                                            value={values.location}
                                            onChange={(newValue) => {
                                                setFieldValue("location", newValue);
                                                setLocgate(newValue.RecordID);
                                                console.log(newValue.RecordID, "recid");

                                            }}

                                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID=${CompanyID}","Any":""}}`}
                                        />
                                    </FormControl>

                                    <FormControl
                                        sx={{

                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Productautocomplete
                                            name="gate"
                                            label="Gate"
                                            id="gate"
                                            value={values.gate}
                                            onChange={(newValue) => {
                                                setFieldValue("gate", newValue)

                                            }}
                                            //  onChange={handleSelectionFunctionname}
                                            // defaultValue={selectedFunctionName}
                                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID=${locgate}","Any":""}}`}
                                        //url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID=${locgate} AND CompanyID=${CompId}","Any":""}}`}

                                        />
                                    </FormControl> */}

                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Productautocomplete
                                            name="location"
                                            label="Location"
                                            id="location"
                                            value={loction}
                                            onChange={(newValue) => {
                                                console.log("Selected Location:", newValue);
                                                setLoction(newValue);
                                                setLocgate(newValue?.RecordID || "");
                                                setGate(null); // Reset gate when location changes
                                            }}
                                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID=${CompanyID}","Any":""}}`}
                                        />

                                    </FormControl>

                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Productautocomplete
                                            name="gate"
                                            label="Gate"
                                            id="gate"
                                            value={gate}
                                            onChange={(newValue) => {
                                                setGate(newValue);
                                            }}
                                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID=${locgate}","Any":""}}`}
                                        />
                                    </FormControl>
                                   
                                    <TextField
                                        name="latitude"
                                        type="number"
                                        id="latitude"
                                        label="Latitude"
                                        variant="standard"
                                        focused
                                        value={latitude}
                                        onBlur={handleBlur}
                                        onChange={(e) => setlatitude(e.target.value)}
                                        error={!!touched.latitude && !!errors.latitude}
                                        helperText={touched.latitude && errors.latitude}
                                        sx={{ gridColumn: "span 1" }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                    />

                                    <TextField
                                        name="longitude"
                                        type="number"
                                        id="longitude"
                                        label="Longitude"
                                        variant="standard"
                                        focused
                                        value={longitude}
                                        onBlur={handleBlur}
                                        onChange={(e) => setlongitude(e.target.value)}
                                        error={!!touched.longitude && !!errors.longitude}
                                        helperText={touched.longitude && errors.longitude}
                                        sx={{ gridColumn: "span 1" }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                    />
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
            </Box>
        </React.Fragment>
    );
};
export default Geoconfiguration;
