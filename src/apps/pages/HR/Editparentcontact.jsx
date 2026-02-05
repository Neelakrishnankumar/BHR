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
    Breadcrumbs,
    Grid
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import store from "../../../index";
import { imageUpload } from "../../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import { tokens } from "../../../Theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useProSidebar } from "react-pro-sidebar";
import { PartyContactget } from "../../../store/reducers/Formapireducer";
import * as Yup from "yup";
const Editparentcontact = () => {
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
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");

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
    const [ID1Image, setID1Image] = useState("");
    const [ID2Image, setID2Image] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationSchema2, setValidationSchema2] = useState(null);
    const partyContactgetdata = useSelector(
        (state) => state.formApi.partyContactgetdata
    );
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);

                let schemaFields = {
                    name: Yup.string().trim().required(data.Party.name),

                    mobilenumber: Yup.string()
                        .required(data.Party.mobilenumber)
                        .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),

                    emailid: Yup.string()
                        .nullable()
                        .notRequired()
                        .trim()
                        .test(
                            "email-or-empty",
                            "Invalid Email ID",
                            (value) => !value || Yup.string().email().isValidSync(value)
                        ),
                };
                // locality: Yup.object().required(data.Party.locality).nullable(),
                //ReferenceBy: Yup.object().required(data.Party.ReferenceBy).nullable(),
                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().required(data.Party.code);
                }
                const schema2 = Yup.object().shape({
                    bankname: Yup.string().trim().required(data.BankDetails.bankname),
                    branchname: Yup.string().trim().required(data.BankDetails.branchname),
                    Accounttype: Yup.string().trim().required(data.BankDetails.Accounttype),
                    ifsc: Yup.string()
                        .required(data.BankDetails.ifsc)
                        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
                    accountnumber: Yup.string()
                        .required(data.BankDetails.accountnumber)
                        .matches(/^\d{9,18}$/, "Invalid Account Number"),
                    bankloc: Yup.string().trim().required(data.BankDetails.bankloc),
                    accountholdname: Yup.string().trim().required(
                        data.BankDetails.accountholdname
                    ),
                    bankaddress: Yup.string().trim().required(data.BankDetails.bankaddress),
                });

                setValidationSchema2(schema2);

            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode]);
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

    // useEffect(() => {
    //     dispatch(getBiometricData({
    //         CompanyID
    //     }));
    // }, [location.key]);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const style = {
        height: "55px",
        borderBottom: "2px solid #1769aa ",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
    };
    const contactInitialValue = {
        code: partyContactgetdata.Code || "",
        name: partyContactgetdata.Name || "",
        name1: partyContactgetdata.ContactPerson1 || "",
        name2: partyContactgetdata.ContactPerson2 || "",
        emailid1: partyContactgetdata.ContactPersonEmailID1 || "",
        emailid2: partyContactgetdata.ContactPersonEmailID2 || "",
        mobileno1: partyContactgetdata.ContactPersonMobileNo1 || "",
        mobileno2: partyContactgetdata.ContactPersonMobileNo2 || "",
        aadharcardnumber1: partyContactgetdata.AadhatNo1 || "",
        aadharcardnumber2: partyContactgetdata.AadhatNo2 || "",
        ContactPersonIDProofImg1:
            partyContactgetdata.ContactPersonIDProofImg1 || "",
        ContactPersonIDProofImg2:
            partyContactgetdata.ContactPersonIDProofImg2 || "",
    };
    const contactsave = async (values, del) => {
        setLoading(true);

        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";

        const idata = {
            VendorID: recID,
            ContactPerson1: values.name1,
            ContactPerson2: values.name2,
            ContactPersonEmailID1: values.emailid1,
            ContactPersonEmailID2: values.emailid2,
            ContactPersonMobileNo1: values.mobileno1,
            ContactPersonMobileNo2: values.mobileno2,
            AadhatNo1: values.aadharcardnumber1,
            AadhatNo2: values.aadharcardnumber2,
            // ContactPersonIDProofImg1: data.ContactPersonIDProofImg1 || ID1Image,
            // ContactPersonIDProofImg2: data.ContactPersonIDProofImg2 || ID2Image,
            ContactPersonIDProofImg1: ID1Image || partyContactgetdata.ContactPersonIDProofImg1,
            ContactPersonIDProofImg2: ID2Image || partyContactgetdata.ContactPersonIDProofImg2,
        };

        try {
            const response = await dispatch(PartyContactget({ action, idata }));

            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                // navigate("/Apps/TR243/Party");
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("An error occurred while saving data.");
        } finally {
            setLoading(false);
        }
    };
    const getFileID1Change = async (e) => {
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
                                setID1Image(fileData.payload.name);
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
    const getFileID2Change = async (e) => {
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
                                setID2Image(fileData.payload.name);
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
                                Parent Contact Details
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
                    initialValues={contactInitialValue}
                    onSubmit={(values, setSubmitting) => {
                        setTimeout(() => {
                            contactsave(values);
                        }, 100);
                    }}
                    // validationSchema={validationSchema3}
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
                                {CompanyAutoCode == "Y" ? (
                                    <TextField
                                        name="code"
                                        type="text"
                                        id="code"
                                        label="Code"
                                        variant="standard"
                                        placeholder="Auto"
                                        focused
                                        // required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        sx={{
                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            },
                                        }}
                                        InputProps={{ readOnly: true }}
                                    // autoFocus
                                    />
                                ) : (
                                    <TextField
                                        name="code"
                                        type="text"
                                        id="code"
                                        label={
                                            <>
                                                Code
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        sx={{
                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            },
                                        }}
                                        autoFocus
                                    />
                                )}
                                <TextField
                                    name="name"
                                    type="text"
                                    id="name"
                                    label={
                                        <>
                                            Name
                                            {/* <span style={{ color: "red", fontSize: "20px" }}>
                                  *
                                </span> */}
                                        </>
                                    }
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
                                        },
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            readOnly: true,
                                        },
                                    }}
                                    // required
                                    autoFocus={CompanyAutoCode == "Y"}
                                />
                                <Box
                                    sx={{
                                        padding: 1.5,
                                        backgroundColor: "#b2dfdb", // light green
                                        borderRadius: 1,
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        Contact Person 1
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        padding: 1.5,
                                        backgroundColor: "#b2dfdb",
                                        borderRadius: 1,
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        Contact Person 2
                                    </Typography>
                                </Box>
                                {/* </Box> */}

                                {/* <Typography>Contact Person 2</Typography> */}
                                <TextField
                                    name="name1"
                                    label={
                                        <>
                                            Name
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </>
                                    }
                                    variant="standard"
                                    focused
                                    value={values.name1}
                                    // required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name1 && !!errors.name1}
                                    helperText={touched.name1 && errors.name1}
                                    sx={{
                                        backgroundColor: "#ffffff",
                                    }}
                                    autoFocus
                                />
                                <TextField
                                    name="name2"
                                    label="Name"
                                    variant="standard"
                                    focused
                                    value={values.name2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name2 && !!errors.name2}
                                    helperText={touched.name2 && errors.name2}
                                    sx={{
                                        backgroundColor: "#ffffff",
                                    }}
                                    autoFocus
                                />
                                <TextField
                                    name="emailid1"
                                    type="tel"
                                    id="emailid1"
                                    label={
                                        <>
                                            Email ID
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </>
                                    }
                                    variant="standard"
                                    // required
                                    focused
                                    value={values.emailid1}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // onChange={(e) => {
                                    //   const value = e.target.value;
                                    //   // Only allow numbers and max 10 digits
                                    //   if (/^\d{0,10}$/.test(value)) {
                                    //     handleChange(e);
                                    //   }
                                    // }}
                                    error={!!touched.emailid1 && !!errors.emailid1}
                                    helperText={touched.emailid1 && errors.emailid1}
                                    // inputProps={{ maxLength: 10 }}
                                    sx={{
                                        backgroundColor: "#ffffff", // Set the background to white
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                        },
                                    }}
                                    autoFocus
                                />

                                <TextField
                                    name="emailid2"
                                    type="text"
                                    id="emailid2"
                                    label="Email ID"
                                    variant="standard"
                                    focused
                                    value={values.emailid2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: "#ffffff", // Set the background to white
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                        },
                                    }}
                                    autoFocus
                                />
                                <TextField
                                    name="mobileno1"
                                    type="tel"
                                    id="mobileno1"
                                    label={
                                        <>
                                            Mobile No
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </>
                                    }
                                    variant="standard"
                                    focused
                                    value={values.mobileno1}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.mobileno1 && !!errors.mobileno1}
                                    helperText={touched.mobileno1 && errors.mobileno1}
                                    // required
                                    inputProps={{ maxLength: 10 }}
                                    sx={{
                                        backgroundColor: "#ffffff", // Set the background to white
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                        },
                                    }}
                                    autoFocus
                                />
                                <TextField
                                    name="mobileno2"
                                    type="tel"
                                    id="mobileno2"
                                    label="Mobile No"
                                    variant="standard"
                                    focused
                                    inputProps={{ maxLength: 10 }}
                                    value={values.mobileno2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: "#ffffff", // Set the background to white
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                        },
                                    }}
                                    autoFocus
                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    id="aadharcardnumber1"
                                    name="aadharcardnumber1"
                                    value={values.aadharcardnumber1}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Aadhar Card No"
                                    focused
                                    // onWheel={(e) => e.target.blur()}
                                    error={
                                        touched.aadharcardnumber1 &&
                                        Boolean(errors.aadharcardnumber1)
                                    }
                                    helperText={
                                        touched.aadharcardnumber1 && errors.aadharcardnumber1
                                    }
                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    id="aadharcardnumber2"
                                    name="aadharcardnumber2"
                                    value={values.aadharcardnumber2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Aadhar Card No"
                                    focused
                                    // onWheel={(e) => e.target.blur()}
                                    error={
                                        touched.aadharcardnumber2 &&
                                        Boolean(errors.aadharcardnumber2)
                                    }
                                    helperText={
                                        touched.aadharcardnumber2 && errors.aadharcardnumber2
                                    }
                                />
                            </Box>
                            <Grid container spacing={2}>
                                {/* ID Proof (Left side – 50%) */}
                                <Grid item xs={12} md={6}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Tooltip title="ID Proof">
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
                                                    // onChange={getFilepanChange}
                                                    onChange={getFileID1Change}
                                                />
                                                <PictureAsPdfOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => {
                                                partyContactgetdata.ContactPersonIDProofImg1 || ID1Image
                                                    ? window.open(
                                                        ID1Image
                                                            ? store.getState().globalurl.attachmentUrl +
                                                            ID1Image
                                                            : store.getState().globalurl.attachmentUrl +
                                                            partyContactgetdata.ContactPersonIDProofImg1,
                                                        "_blank"
                                                    )
                                                    : toast.error("Please Upload File");
                                            }}
                                        >
                                            ID Proof View
                                        </Button>
                                    </Box>
                                </Grid>

                                {/* GST Proof (Right side – 50%) */}
                                <Grid item xs={12} md={6}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Tooltip title="ID Proof">
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
                                                    // onChange={getFilegstChange}
                                                    onChange={getFileID2Change}
                                                />
                                                <PictureAsPdfOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => {
                                                partyContactgetdata.ContactPersonIDProofImg2 || ID2Image
                                                    ? window.open(
                                                        ID2Image
                                                            ? store.getState().globalurl.attachmentUrl +
                                                            ID2Image
                                                            : store.getState().globalurl.attachmentUrl +
                                                            partyContactgetdata.ContactPersonIDProofImg2,
                                                        "_blank"
                                                    )
                                                    : toast.error("Please Upload File");
                                            }}
                                        >
                                            ID Proof View
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                padding={1}
                                gap="20px"
                            >
                                {/* GSTimage */}

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
                                )}

                                <Button
                                    color="warning"
                                    variant="contained"
                                    onClick={() => {
                                        navigate(-1)
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
export default Editparentcontact;
