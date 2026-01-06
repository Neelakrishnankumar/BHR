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
import { useProSidebar } from "react-pro-sidebar";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { formGap } from "../../ui-components/utils";
import { CompanySettingsValidation, Settingsvalidation } from "./validation";
import { CompanydetailpostData, getSettingsData, SettingspostData } from "../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const Logochange = () => {
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
    const compID = sessionStorage.getItem("compID");
    const Username = sessionStorage.getItem("UserName");
    const data = useSelector((state) => state.formApi.Data) || {};
    console.log(data, "--data");
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [logoimage, setlogoimage] = useState("");
    console.log("Nowlogo", logoimage);
    const company = sessionStorage.getItem("company");
    const [gstImage, setGstImage] = useState("");
    const [offaddress, setOffaddress] = useState("");
    const [headerImage, setheaderImage] = useState("");
    const [footerImage, setfooterImage] = useState("")
    const [gst, setGst] = useState("");
    const [autocode, setAutocode] = useState(data?.CM_AUTOCODE === "Y");
    // const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
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
    }, [CompanyAutoCode]);

    // const handleCheckboxChange = (event) => {
    //     setAutocode(event.target.checked ? "Y" : "N");
    // };
    useEffect(() => {
        if (data) {
            setOffaddress(data.CM_ADDRESS || "");
            setGst(data.CM_GST || "");
            setlogoimage(data.CM_IMAGE || "");
            setGstImage(data.CM_GSTIMAGE || "");
            setAutocode(data.CM_AUTOCODE === "Y");
            setheaderImage(data.CM_HEADER || "")
            setfooterImage(data.CM_FOOTER || "")
        }
    }, [data]);

    useEffect(() => {
        dispatch(getSettingsData({
            SubscriptionCode: Subscriptioncode,
        }));
    }, [location.key]);
    const handleAutocodeChange = (e) => {
        const checked = e.target.checked;
        setAutocode(checked);
        sessionStorage.setItem("CompanyAutoCode", checked ? "Y" : "N");
        console.log(checked, "CompanyAutoCode")
    };

    // useEffect(() => {
    //     if (initialvalues?.gstnumber) {
    //       setGst(initialvalues.gstnumber);
    //     }
    //   }, [initialvalues]);

    // const getFilepanChange = async (e) => {
    //     let files = e.target.files;
    //     let fileReader = new FileReader();

    //     fileReader.readAsDataURL(files[0]);
    //     fileReader.onload = (event) => {
    //         let fileInput = !!event.target.result;
    //         if (fileInput) {
    //             try {
    //                 Resizer.imageFileResizer(
    //                     files[0],
    //                     150,
    //                     150,
    //                     "JPEG",
    //                     100,
    //                     0,
    //                     async (uri) => {
    //                         const formData = { image: uri, type: "images" };
    //                         const fileData = await dispatch(imageUpload({ formData }));
    //                         console.log("Uploaded File Response:", fileData);

    //                         if (fileData?.payload?.Status === "Y") {
    //                             toast.success(fileData.payload.Msg);
    //                             setlogoimage(fileData.payload.name);
    //                         } else {
    //                             toast.error("File upload failed.");
    //                         }
    //                     },
    //                     "base64",
    //                     150,
    //                     150
    //                 );
    //             } catch (err) {
    //                 console.log(err);
    //                 toast.error("An error occurred during file processing.");
    //             }
    //         }
    //     };
    // };
    // const getFilegstChange = async (e) => {
    //     let files = e.target.files;
    //     let fileReader = new FileReader();

    //     fileReader.readAsDataURL(files[0]);
    //     fileReader.onload = (event) => {
    //         let fileInput = !!event.target.result;
    //         if (fileInput) {
    //             try {
    //                 Resizer.imageFileResizer(
    //                     files[0],
    //                     150,
    //                     150,
    //                     "JPEG",
    //                     100,
    //                     0,
    //                     async (uri) => {
    //                         const formData = { image: uri, type: "images" };
    //                         const fileData = await dispatch(fileUpload({ formData }));
    //                         console.log("Uploaded File Response:", fileData);

    //                         if (fileData?.payload?.Status === "Y") {
    //                             toast.success(fileData.payload.Msg);
    //                             setGstImage(fileData.payload.name);
    //                         } else {
    //                             toast.error("File upload failed.");
    //                         }
    //                     },
    //                     "base64",
    //                     150,
    //                     150
    //                 );
    //             } catch (err) {
    //                 console.log(err);
    //                 toast.error("An error occurred during file processing.");
    //             }
    //         }
    //     };
    // };
    const getFilepanChange = async (event) => {
        setlogoimage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setlogoimage(fileData.payload.name);
        sessionStorage.setItem("logoimage", fileData.payload.name);
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
    const getFilegstChange = async (event) => {
        setGstImage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setGstImage(fileData.payload.name);
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

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const style = {
        height: "55px",
        borderBottom: "2px solid #1769aa ",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
    };
    const initialvalues = {
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
        subscriptionStartDate: data.SBS_STARTDATE,
        subscriptionperiod: data.SBS_NOOFMONTH,
        retainDate: data.SBS_RETAINDATE,
        subscriptionEndDate: data.SBS_ENDDATE,
        notificationDate: data.SBS_NOTIFICATIONDATE,
        noofusers: data.CM_NOOFUSER,
        noofemployee: data.CM_NOOFEMP,
        address: data.CM_ADDRESS,
        gstnumber: data.CM_GST || "",
        // address: data?.address || "", // Set default value if data.address is undefined
        // gstnumber: data?.gstnumber || "",
        logoimage: data.CM_IMAGE,
        GstImg: data.CM_GSTIMAGE,
        Name: data.CM_NAME
        // checkbox: data.CM_AUTOCODE === "Y" ? "Y" : "N",

    };
    console.log(data.CM_IMAGE, "logo");
    console.log(data.CM_GSTIMAGE, "GST");
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
            CompanyRecordID: compID,
            Address: values.address,
            GstNo: values.gstnumber || "",
            Image: logoimage,
            GstImage: gstImage,
            AutoCode: autocode ? "Y" : "N",
            HeaderImg: headerImage,
            FooterImg: footerImage,
            CompanyName: values.Name ? values.Name : company

        };
        console.log(offaddress, "Address");
        console.log(gst, "gst");
        const response = await dispatch(CompanydetailpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate("/Apps/ChangeyourPassword_3")
        } else {
            toast.error(response.payload.Msg);
        }
    };


    return (
        <React.Fragment>

            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        <Breadcrumbs
                            maxItems={3}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                        >

                            <Typography
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                variant="h7"

                            >
                                Company Configuration
                            </Typography>

                        </Breadcrumbs>
                    </Box>

                    {/* <Box display="flex">
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
                    </Box> */}
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Formik
                    initialValues={initialvalues}
                    validationSchema={CompanySettingsValidation}
                    enableReinitialize={true}
                    onSubmit={(values) => {

                        fnSave(values);
                    }}
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

                                {/* LEFT: Address */}
                                <FormControl
                                    fullWidth
                                    gap={formGap}
                                    padding={1}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        label="Company Name"
                                        value={values.Name}
                                        id="Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="Name"
                                        error={!!touched.Name && !!errors.Name}
                                        helperText={touched.Name && errors.Name}
                                        sx={{
                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "",
                                            },
                                        }}
                                        focused
                                        inputProps={{ maxLength: 90 }}

                                    />
                                    <TextField
                                        name="address"
                                        type="text"
                                        id="address"
                                        label="Office Address"
                                        variant="standard"
                                        multiline
                                        rows={3}
                                        focused
                                        value={values.address}
                                        // onChange={(e) => setOffaddress(e.target.value)}
                                        onChange={handleChange}
                                        sx={{ marginTop: "5px" }}
                                    />
                                </FormControl>


                                {/* RIGHT: GST + Autocode (stacked vertically) */}
                                <Box
                                    sx={{
                                        gridColumn: "span 2",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: formGap,
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    {/* <TextField
                                        name="gstnumber"
                                        label="GST Number"
                                        variant="standard"
                                        focused
                                        value={gst}
                                        onChange={(e) => {
                                            const input = e.target.value.toUpperCase();
                                            if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                                setGst(input);
                                            }
                                        }}
                                        sx={{ backgroundColor: "#ffffff" }}
                                    /> */}
                                    <TextField
                                        name="gstnumber"
                                        label="GST Number"
                                        variant="standard"
                                        focused
                                        value={values.gstnumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.gstnumber && Boolean(errors.gstnumber)}
                                        helperText={touched.gstnumber && errors.gstnumber}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={autocode}
                                                onChange={handleAutocodeChange}
                                            />
                                        }
                                        label="Autocode"
                                    />
                                </Box>
                            </Box>

                            <Box
                                display="flex"
                                padding={1}
                                justifyContent="end"
                                mt="20px"
                                gap="20px"
                            >
                                <Button
                                    color="success"
                                    variant="contained"
                                    // onClick={() => resetForm()}
                                    onClick={() => {
                                        navigate("/Apps/ChangeyourPassword_3");
                                    }}
                                >
                                    Skip
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    loading={isLoading}
                                    color="secondary"
                                    variant="contained"
                                >
                                    Save
                                </LoadingButton>

                                <Button
                                    color="warning"
                                    variant="contained"
                                    // onClick={() => resetForm()}
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
        </React.Fragment>
    );
};
export default Logochange;
