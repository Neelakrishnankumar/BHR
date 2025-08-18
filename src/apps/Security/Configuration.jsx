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

const Configuration = () => {
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
    const [gstImage, setGstImage] = useState("");
    const [offaddress, setOffaddress] = useState("");
    const [gst, setGst] = useState("");
    const [autocode, setAutocode] = useState(data?.CM_AUTOCODE === "Y");
    const { toggleSidebar, broken, rtl } = useProSidebar();


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
        console.log(checked,"CompanyAutoCode")
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
        logoimage: data.CM_IMAGE,
        GstImg: data.CM_GSTIMAGE,
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
            Address: offaddress,
            GstNo: gst,
            Image: logoimage,
            GstImage: gstImage,
            AutoCode: autocode ? "Y" : "N"

        };
        console.log(offaddress, "Address");
        console.log(gst, "gst");
        const response = await dispatch(CompanydetailpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate("/Apps/configuration");
        } else {
            toast.error(response.payload.Msg);
        }
    };


    return (
        <React.Fragment>
            {/* <Box m="10px">
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold" marginBottom={3}>
                    Company Configuration
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
                                    Company Configuration
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
                        // onSubmit={(values, setSubmitting, resetForm) => {
                        //     setTimeout(() => {
                        //         fnSave(values);
                        //         resetForm(); // Reset form after submission
                        //     }, 100);
                        // }}
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

                                <Typography variant="h5" padding={1}>Subscriptions:</Typography>

                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                                    gap={formGap}
                                    padding={1}
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
                                        },
                                    }}
                                >
                                    <FormControl
                                        fullWidth
                                        sx={{ gridColumn: "span 2", gap: formGap }}
                                    >
                                        <TextField
                                            name="subscriptionStartDate"
                                            type="date"
                                            id="subscriptionStartDate"
                                            label="Subscription Start Date"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => handleChangesub(e, Setsubfromdate)}
                                            // value={subfromdate}

                                            value={values.subscriptionStartDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionPeriod && !!errors.subscriptionPeriod}
                                            // helperText={touched.subscriptionPeriod && errors.subscriptionPeriod}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />

                                        <TextField
                                            name="subscriptionperiod"
                                            type="number"
                                            id="subscriptionperiod"
                                            label="Subscription Period (in months)"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.subscriptionperiod}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionperiod && !!errors.subscriptionperiod}
                                            // helperText={touched.subscriptionperiod && errors.subscriptionperiod}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="retainDate"
                                            type="date"
                                            id="retainDate"
                                            label="Retain Date"
                                            variant="standard"
                                            focused
                                            value={values.retainDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.retainDate && !!errors.retainDate}
                                            // helperText={touched.retainDate && errors.retainDate}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="noofusers"
                                            type="number"
                                            id="noofusers"
                                            label="No of Users"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.noofusers}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.noofusers && !!errors.noofusers}
                                            // helperText={touched.noofusers && errors.noofusers}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />

                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        sx={{ gridColumn: "span 2", gap: formGap }}
                                    >
                                        <TextField
                                            name="subscriptionEndDate"
                                            type="date"
                                            id="subscriptionEndDate"
                                            label="Subscription End Date"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => handleChangesub(e, SetsubEnddate)}
                                            // value={subEnddate}

                                            value={values.subscriptionEndDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionEndDate && !!errors.subscriptionEndDate}
                                            // helperText={touched.subscriptionEndDate && errors.subscriptionEndDate}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />

                                        <TextField
                                            name="notificationDate"
                                            type="date"
                                            id="notificationDate"
                                            label="Notification Date"
                                            variant="standard"
                                            focused
                                            value={values.notificationDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={
                                            //   !!touched.notificationDate && !!errors.notificationDate
                                            // }
                                            // helperText={
                                            //   touched.notificationDate && errors.notificationDate
                                            // }
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="noofemployee"
                                            type="number"
                                            id="noofemployee"
                                            label="No of Employee"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.noofemployee}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.noofemployee && !!errors.noofemployee}
                                            // helperText={touched.noofemployee && errors.noofemployee}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />



                                    </FormControl>
                                </Box>


                                <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                                <Typography variant="h5" padding={1}>Company Details:</Typography>

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
                                    <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}>
                                        {/* <TextField
                                            name="address"
                                            type="text"
                                            id="address"
                                            label="Office Address"
                                            variant="standard"
                                            multiline
                                            rows={3}
                                            focused
                                            value={values.address}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.address && !!errors.address}
                                            helperText={touched.address && errors.address}
                                            autoFocus
                                        /> */}
                                        <TextField
                                            name="address"
                                            type="text"
                                            id="address"
                                            label="Office Address"
                                            variant="standard"
                                            multiline
                                            rows={3}
                                            focused
                                            value={offaddress}
                                            onChange={(e) => setOffaddress(e.target.value)}
                                            autoFocus
                                        />


                                        {/* <TextField
                                            name="gstnumber"
                                            label="GST Number"
                                            variant="standard"
                                            focused
                                            value={values.gstnumber}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                const input = e.target.value.toUpperCase();
                                                if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                                    handleChange({
                                                        target: {
                                                            name: "gstnumber",
                                                            value: input,
                                                        },
                                                    });
                                                }
                                            }}
                                            error={!!touched.gstnumber && !!errors.gstnumber}
                                            helperText={touched.gstnumber && errors.gstnumber}
                                            sx={{ backgroundColor: "#ffffff" }}
                                        /> */}
                                        <TextField
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
                                        />

                                    </FormControl>
                                    <Box>
                                        {/* <Checkbox
                                            checked={autocode}
                                            onChange={(e) => setAutocode(e.target.checked)}
                                            id="checkbox"
                                            name="checkbox"
                                        />
                                        <FormLabel htmlFor="checkbox" focused={false}>
                                            Autocode
                                        </FormLabel> */}
                                        <Checkbox
                                            checked={autocode}
                                            onChange={handleAutocodeChange}
                                            id="checkbox"
                                            name="checkbox"
                                        />
                                        <FormLabel htmlFor="checkbox" focused={false}>
                                            Autocode
                                        </FormLabel>

                                    </Box>
                                </Box>

                                <Box
                                    display="flex"
                                    padding={1}
                                    justifyContent="end"
                                    mt="20px"
                                    gap="20px"
                                >
                                    {/* <Box display="flex" alignItems="center" gap={formGap}> */}
                                    <Tooltip title="Upload Logo">
                                        <IconButton
                                            size="small"
                                            color="warning"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="all/*"
                                                type="file"
                                                onChange={getFilepanChange}
                                            />
                                            <PictureAsPdfOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        component={"a"}
                                        onClick={() => {
                                            data.logoimage || logoimage
                                                ? window.open(
                                                    logoimage
                                                        ? store.getState().globalurl.attachmentUrl +
                                                        logoimage
                                                        : store.getState().globalurl.attachmentUrl +
                                                        data.logoimage,
                                                    "_blank"
                                                )
                                                : toast.error("Please Upload File");
                                        }}
                                    >
                                        View Logo
                                    </Button>
                                    <Tooltip title="Upload GST">
                                        <IconButton
                                            size="small"
                                            color="warning"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="all/*"
                                                type="file"
                                                onChange={getFilegstChange}
                                            />
                                            <PictureAsPdfOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        component={"a"}
                                        onClick={() => {
                                            data.GstImg || gstImage
                                                ? window.open(
                                                    gstImage
                                                        ? store.getState().globalurl.attachmentUrl +
                                                        gstImage
                                                        : store.getState().globalurl.attachmentUrl +
                                                        data.GstImg,
                                                    "_blank"
                                                )
                                                : toast.error("Please Upload File");
                                        }}
                                    >
                                        View GST
                                    </Button>
                                    {/* <IconButton
                      size="large"
                      color="warning"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="all/*"
                        type="file"
                        onChange={getFilegstChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                       data.GstImg || gstImage
                          ? window.open(
                            gstImage
                              ? store.getState().globalurl.attachmentUrl +
                              gstImage
                              : store.getState().globalurl.attachmentUrl +
                             data.GstImg,
                            "_blank"
                          )
                          : toast.error("Please Upload File");
                      }}
                    >
                      View
                    </Button> */}

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
export default Configuration;
