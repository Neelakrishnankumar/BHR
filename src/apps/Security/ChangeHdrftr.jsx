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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { formGap } from "../../ui-components/utils";
import { Settingsvalidation } from "./validation";
import { CompanydetailpostData, getSettingsData, SettingspostData } from "../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useRef } from "react";


const Changehdrftr = () => {
    const formikRef = useRef();
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
    const [headerPreview, setHeaderPreview] = useState(""); // blob preview url
    const [footerPreview, setFooterPreview] = useState("");
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
            setheaderImage(data.CM_HEADER || "");
            setfooterImage(data.CM_FOOTER || "");
            setAutocode(data.CM_AUTOCODE === "Y");
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

    // const getFilepanChange = async (event) => {
    //     setlogoimage(event.target.files[0]);
    //     setheaderImage(event.target.files[0]);
    //     setHeaderPreview(URL.createObjectURL(event.target.files[0]));
    //     console.log(event.target.files[0]);

    //     const formData = new FormData();
    //     formData.append("file", event.target.files[0]);
    //     formData.append("type", "images");

    //     const fileData = await dispatch(fileUpload({ formData }));
    //     setlogoimage(fileData.payload.name);
    //     sessionStorage.setItem("logoimage", fileData.payload.name);
    //     console.log(">>>", fileData.payload);
    //     console.log(
    //         "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
    //         fileData
    //     );
    //     if (fileData.payload.Status == "Y") {
    //         // console.log("I am here");
    //         toast.success(fileData.payload.Msg);
    //     }
    // };
    const panImageSrc = headerPreview
        ? headerPreview
        : data?.CM_HEADER
            ? store.getState().globalurl.imageUrl + data?.CM_HEADER
            : null;
    const getFilepanChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setHeaderPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));

        if (fileData.payload?.Status === "Y") {
            const uploadedFile = fileData.payload.name;

            setheaderImage(uploadedFile);
            sessionStorage.setItem("headerimg", uploadedFile);
            toast.success(fileData.payload.Msg);
            await saveCompanyDetails(formikRef.current.values, {
                headerImage: uploadedFile,
            });
        }
        else {
            toast.error(fileData.payload?.Msg || "Upload failed");
        }

    };


    // const getFilegstChange = async (event) => {
    //     setGstImage(event.target.files[0]);
    //     setfooterImage(event.target.files[0]);
    //     setFooterPreview(URL.createObjectURL(event.target.files[0]));
    //     console.log(event.target.files[0]);

    //     const formData = new FormData();
    //     formData.append("file", event.target.files[0]);
    //     formData.append("type", "images");

    //     const fileData = await dispatch(fileUpload({ formData }));
    //     setGstImage(fileData.payload.name);
    //     console.log(">>>", fileData.payload);
    //     console.log(
    //         "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
    //         fileData
    //     );
    //     if (fileData.payload.Status == "Y") {
    //         // console.log("I am here");
    //         toast.success(fileData.payload.Msg);
    //     }
    // };
    const gstImageSrc = footerPreview
        ? footerPreview
        : data?.CM_FOOTER
            ? store.getState().globalurl.imageUrl + data?.CM_FOOTER
            : null;
    const getFilegstChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFooterPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));

        if (fileData.payload?.Status === "Y") {
            const uploadedFile = fileData.payload.name;

            setfooterImage(uploadedFile);
            toast.success(fileData.payload.Msg);

            await saveCompanyDetails(formikRef.current.values, {
                footerImage: uploadedFile,
            });
        }
        else {
            toast.error(fileData.payload?.Msg || "Upload failed");
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
        gstnumber: data.CM_GST,
        // address: data?.address || "", // Set default value if data.address is undefined
        // gstnumber: data?.gstnumber || "",
        logoimage: data.HeaderImg,
        GstImg: data.FooterImg,

        // checkbox: data.CM_AUTOCODE === "Y" ? "Y" : "N",

    };
    console.log(data.HeaderImg, "logo");
    console.log(data.FooterImg, "GST");
    const saveCompanyDetails = async (values, overrides = {}) => {
        const idata = {
            action: "update",
            CompanyRecordID: compID,
            Address: offaddress,
            GstNo: gst,
            Image: logoimage,
            GstImage: gstImage,
            AutoCode: autocode ? "Y" : "N",
            HeaderImg: overrides.headerImage ?? headerImage,
            FooterImg: overrides.footerImage ?? footerImage,

            CompanyName: data.CM_NAME
        };

        // return dispatch(CompanydetailpostData({ idata }));
        const response = await dispatch(CompanydetailpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate("/Apps/ChangeyourPassword_3")
        } else {
            toast.error(response.payload.Msg);
        }

    };
    // const fnSave = async (values, overrides = {}) => {

    //     const idata = {
    //         action: "update",
    //         CompanyRecordID: compID,
    //         Address: offaddress,
    //         GstNo: gst,
    //         Image: logoimage,
    //         GstImage: gstImage,
    //         AutoCode: autocode ? "Y" : "N",
    //         // HeaderImg: headerImage,
    //         // FooterImg: footerImage,
    //         HeaderImg: overrides.headerImage ?? headerImage,
    //         FooterImg: overrides.footerImage ?? footerImage,
    //         CompanyName: data.CM_NAME
    //     };
    //     // navigate("/#")
    //     console.log(offaddress, "Address");
    //     console.log(gst, "gst");
    //     const response = await dispatch(CompanydetailpostData({ idata }));
    //     if (response.payload.Status == "Y") {
    //         toast.success(response.payload.Msg);

    //     } else {
    //         toast.error(response.payload.Msg);
    //     }
    // };
    const fnSave = async (values) => {
        const response = await saveCompanyDetails(values);

        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);
            navigate("/#");
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
                                Header & Footer Setup
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
                    innerRef={formikRef}
                    initialValues={initialvalues}
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

                                {/* ===== LOGO COLUMN ===== */}
                                <Box sx={{ gridColumn: "span 1" }}>


                                    <Box mt={1}>
                                        {panImageSrc ? (
                                            <img
                                                src={panImageSrc}
                                                width={175}
                                                height={175}
                                                style={{
                                                    objectFit: "contain",
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 175,
                                                    height: 175,
                                                    border: "1px solid #ccc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "red",
                                                }}
                                            >
                                                Please upload image
                                            </Box>
                                        )}

                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Tooltip title="Upload Header">
                                            <IconButton size="small" color="warning" component="label">
                                                <input hidden type="file" accept="all/*" onChange={getFilepanChange} />
                                                <PictureAsPdfOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => {
                                                data.logoimage || headerImage
                                                    ? window.open(
                                                        store.getState().globalurl.attachmentUrl +
                                                        (headerImage || data.logoimage),
                                                        "_blank"
                                                    )
                                                    : toast.error("Please Upload File");
                                            }}
                                        >
                                            View Header
                                        </Button>
                                    </Box>
                                </Box>

                                {/* ===== GST COLUMN ===== */}
                                <Box sx={{ gridColumn: "span 1" }}>


                                    <Box mt={1}>
                                        {gstImageSrc ? (
                                            <img
                                                src={gstImageSrc}
                                                width={175}
                                                height={175}
                                                style={{
                                                    objectFit: "contain",
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 175,
                                                    height: 175,
                                                    border: "1px solid #ccc",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "red",
                                                }}
                                            >
                                                Please upload image
                                            </Box>
                                        )}

                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Tooltip title="Upload Footer">
                                            <IconButton size="small" color="warning" component="label">
                                                <input hidden type="file" accept="all/*" onChange={getFilegstChange} />
                                                <PictureAsPdfOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => {
                                                data.GstImg || footerImage
                                                    ? window.open(
                                                        store.getState().globalurl.attachmentUrl +
                                                        (footerImage || data.GstImg),
                                                        "_blank"
                                                    )
                                                    : toast.error("Please Upload File");
                                            }}
                                        >
                                            View Footer
                                        </Button>
                                    </Box>
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
                                    color="warning"
                                    variant="contained"
                                    // onClick={() => resetForm()}
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    Cancel
                                </Button>
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

                            </Box>

                        </form>
                    )}
                </Formik>
            </Paper>
        </React.Fragment>
    );
};
export default Changehdrftr;
