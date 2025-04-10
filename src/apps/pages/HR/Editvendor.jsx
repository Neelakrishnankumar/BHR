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
    Paper, Breadcrumbs
} from "@mui/material";
import Resizer from "react-image-file-resizer";
import store from "../../../index";
import { fileUpload, fnImageUpload, imageUpload } from "../../../store/reducers/Imguploadreducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import * as Yup from 'yup';
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
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";

const Editvendor = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    // Redux state
    const data = useSelector((state) => state.formApi.Data);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const [panImage, setPanImage] = useState("");
    const [panUrl, setPanUrl] = useState(null);
    const [gstImage, setGstImage] = useState("");  
    const [gstUrl, setGstUrl] = useState(null);
    console.log(panImage, "panImage");
    console.log(panImage.name, "panImage");
    console.log(gstImage, "gstImage");
    console.log(gstImage.name, "gstImage");
    
    const getFilepanChange = async (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();

        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (event) => {
            let fileInput = !!event.target.result;
            if (fileInput) {
                try {
                    Resizer.imageFileResizer(
                        files[0],
                        150,
                        150,
                        "JPEG",
                        100,
                        0,
                        async (uri) => {
                            const formData = { image: uri, type: "images" };
                            const fileData = await dispatch(imageUpload({ formData }));
                            console.log("Uploaded File Response:", fileData);

                            if (fileData?.payload?.Status === "Y") {
                                toast.success(fileData.payload.Msg); 
                                setPanImage(fileData.payload.name);
                            } else {
                                toast.error("File upload failed."); 
                            }
                        },
                        "base64",
                        150,
                        150
                    );
                } catch (err) {
                    console.log(err);
                    toast.error("An error occurred during file processing.");
                }
            }
        };
    };
    console.log(panImage,"does");
    const getFilegstChange = async (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();

        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (event) => {
            let fileInput = !!event.target.result;
            if (fileInput) {
                try {
                    Resizer.imageFileResizer(
                        files[0],
                        150,
                        150,
                        "JPEG",
                        100,
                        0,
                        async (uri) => {
                            const formData = { image: uri, type: "images" };
                            const fileData = await dispatch(imageUpload({ formData }));
                            console.log("Uploaded File Response:", fileData);

                            if (fileData?.payload?.Status === "Y") {
                                toast.success(fileData.payload.Msg); 
                                setGstImage(fileData.payload.name);
                            } else {
                                toast.error("File upload failed."); 
                            }
                        },
                        "base64",
                        150,
                        150
                    );
                } catch (err) {
                    console.log(err);
                    toast.error("An error occurred during file processing.");
                }
            }
        };
    };
    // Page params
    const recID = params.id;
    const mode = params.Mode;
    const accessID = params.accessID;

    useEffect(() => {
       
        if (recID && mode === "E") {
            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
        else {
            dispatch(getFetchData({ accessID, get: "", recID }));
        }
    }, [location.key, recID, mode]);

    
    if (!data && getLoading) {
        return <LinearProgress />;
    }

    const validationSchema = Yup.object({
        Pancardnumber: Yup.string()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Card Number")
            .required("PAN card number is required"),
        gstnumber: Yup.string()
            .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number")
            .required("GST number is required"),
    });
    const InitialValue = {
        code: data.Code || "",
        name: data.Name || "",
        Pancardnumber: data.PanCardNo || "",
        PanImg: data.PanImg || "",
        GstImg: data.gstImage || "",
        gstnumber: data.GstNo || "",
        mobilenumber: data.MobileNo || "",
        date: data.RegistrationDate || "",
        verifieddate: data.VerifyConfirmDate || "",
        emailid: data.EmailID || "",
    };
    console.log(data.PanImg, "dooo");
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
            Code: values.code,
            Name: values.name,
            PanCardNo: values.Pancardnumber,
            PanImg: panImage,
            GstNo: values.gstnumber,
            GstImg: gstImage,
            MobileNo: values.mobilenumber,
            RegistrationDate: values.date,
            VerifyConfirmDate: values.verifieddate,
            EmailID: values.emailid,
            CompanyID
        };

        try {
            const response = await dispatch(postData({ accessID, action, idata }));

            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                navigate("/Apps/TR243/Vendor");
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("An error occurred while saving data.");
        } finally {
            setLoading(false);
        }
    };

    const fnLogOut = (props) => {
        Swal.fire({
            title: `Do you want ${props}?`,
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
                    navigate("/Apps/TR243/Vendor");
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
                                    Vendor
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
                            setFieldValue
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
                                        name="code"
                                        type="text"
                                        id="code"
                                        label="Code"
                                        variant="standard"
                                        focused
                                        required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="name"
                                        type="text"
                                        id="name"
                                        label="Name"
                                        variant="standard"
                                        focused
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="Pancardnumber"
                                        label="Pan Card Number"
                                        variant="standard"
                                        focused
                                        value={values.Pancardnumber}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            const input = e.target.value.toUpperCase();
                                            if (/^[A-Z0-9]*$/.test(input) || input === "") {
                                                handleChange({
                                                    target: {
                                                        name: "Pancardnumber",
                                                        value: input,
                                                    },
                                                });
                                            }
                                        }}
                                        error={!!touched.Pancardnumber && !!errors.Pancardnumber}
                                        helperText={touched.Pancardnumber && errors.Pancardnumber}
                                        sx={{
                                            backgroundColor: "#ffffff",
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="gstnumber"
                                        label="GST Number"
                                        variant="standard"
                                        focused
                                        value={values.gstnumber}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            const input = e.target.value.toUpperCase();
                                            if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                                // This updates Formik value correctly
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
                                        sx={{
                                            backgroundColor: "#ffffff",
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="mobilenumber"
                                        type="tel"
                                        id="mobilenumber"
                                        label="Contact Mobile Number"
                                        variant="standard"
                                        focused
                                        value={values.mobilenumber}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Only allow numbers and max 10 digits
                                            if (/^\d{0,10}$/.test(value)) {
                                                handleChange(e);
                                            }
                                        }}
                                        error={!!touched.mobilenumber && !!errors.mobilenumber}
                                        helperText={touched.mobilenumber && errors.mobilenumber}
                                        inputProps={{ maxLength: 10 }}
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    />


                                    <TextField
                                        name="emailid"
                                        type="text"
                                        id="emailid"
                                        label="Contact Email id"
                                        variant="standard"
                                        focused
                                        value={values.emailid}
                                        onBlur={handleBlur}
                                        onChange={handleChange}

                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="date"
                                        type="date"
                                        id="date"
                                        label="Date of Registration"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.date && !!errors.date}
                                        helperText={touched.date && errors.date}
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                    //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                                    />
                                    <TextField
                                        name="verifieddate"
                                        type="date"
                                        id="verifieddate"
                                        label="Date of verification & confirmation"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.verifieddate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.date && !!errors.date}
                                        helperText={touched.date && errors.date}
                                        sx={{

                                            backgroundColor: "#ffffff",
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ",
                                            }
                                        }}

                                    />


                                    {/* panimage */}


                                   
                                </Box>

                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                               
                                    <Tooltip title="PAN Upload">
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
                                                data.PanImg || panImage
                                                    ? window.open(
                                                        panImage
                                                            ? store.getState().globalurl.attachmentUrl +
                                                            panImage
                                                            : store.getState().globalurl.attachmentUrl +
                                                            data.PanImg,
                                                        "_blank"
                                                    )
                                                    : toast.error("Please Upload File");
                                            }}
                                        >
                                           PAN Image View
                                        </Button>                                                                                              
                                        {/* GSTimage */}
                                        <Tooltip title="GST Upload">
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
                                            GST Image View
                                        </Button>


                                    
                                    {YearFlag == "true" ? (
                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoading}
                                        >
                                            Save
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            disabled={true}
                                        >
                                            Save
                                        </Button>
                                    )} {YearFlag == "true" ? (
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                                Fnsave(values, "harddelete");
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        <Button
                                            color="error"
                                            variant="contained"
                                            disabled={true}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/Apps/TR243/Vendor");
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

export default Editvendor;
