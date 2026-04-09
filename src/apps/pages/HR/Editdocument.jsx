import {
    Typography,
    Box,
    Button,
    TextField,
    Stack,
    IconButton,
    Avatar,
    Menu,
    FormControl,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormGroup,
    RadioGroup,
    Radio,
    FormLabel,
    Tooltip,
    LinearProgress,
    Paper,
    Breadcrumbs,
    Divider,
    CircularProgress
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { deptSchema } from "../../Security/validation";
import wallet from "../../../assets/img/wallet.jpg";
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import { CheckinAutocomplete, MultiFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Department

// ***********************************************
const Editdocument = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    console.log(CompanyAutoCode, "CompanyAutoCode");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = "TR362";
    const Data = useSelector((state) => state.formApi.Data) || {};
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [selectedPro, setSelectedPro] = useState([]);
    const [selectedParty, setSelectedParty] = useState([]);
    // const [image, setimage] = useState("");
    const [image, setimage] = useState("");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const [uploading, setUploading] = useState("");
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);

                let schemaFields = {
                    Name: Yup.string().trim().required(data.Document.Name),
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.Code = Yup.string().trim().required(data.Document.Code);
                }

                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode]);

    // const getFilepanChange = async (event) => {
    //     const file = event.target.files[0];

    //     if (!file) return;

    //     const maxSize = 1 * 1024 * 1024;

    //     // if (file.size > maxSize) {
    //     //     toast.error("File size must be less than or equal to 1 MB");
    //     //     event.target.value = "";
    //     //     return;
    //     // }

    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("type", "images");

    //     const fileData = await dispatch(fileUpload({ formData }));

    //     if (fileData.payload.Status === "Y") {
    //         const filename = fileData.payload.name;

    //         setimage(filename);
    //         sessionStorage.setItem("image", filename);

    //         toast.success(fileData.payload.Msg);

    //         const fileUrl =
    //             store.getState().globalurl.attachmentUrl + filename;

    //         window.open(fileUrl, "_blank");
    //     } else {
    //         toast.error("File Upload Failed");
    //     }
    // };
    const getFilepanChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "images");

            const fileData = await dispatch(fileUpload({ formData }));

            if (fileData.payload.Status === "Y") {
                const filename = fileData.payload.name;

                setimage(filename);
                sessionStorage.setItem("image", filename);

                toast.success(fileData.payload.Msg);
            } else {
                toast.error("File Upload Failed");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (recID) {
            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
    }, [recID]);
    useEffect(() => {
        if (Data?.Attachments) {
            setimage(Data.Attachments);
        } else {
            setimage("");
        }
    }, [Data]);
    const [ini, setIni] = useState(true);
    const [loading, setLoading] = useState(false);
    // var apiData = "";
    // apiData = {
    //     Code: Data.Code,
    //     Name: Data.Name,
    //     Loc: Data.Loc,
    //     SortOrder: Data.SortOrder,
    //     Disable: Data.Disable,
    // };
    //*******Assign Department values from Database in  Yup initial value******* */
    const initialValues = {
        Code: Data.Code,
        Name: Data.Description,
        SortOrder: Data.SortOrder || 0,
        checkbox: Data.Disable === "Y" ? true : false,
        delete: Data.IsDelete === "Y" ? true : false,
        project:
            Data.Projects?.map((item) => ({
                RecordID: item.ProjectID,
                Code: item.ProjectCode,
                Name: item.ProjectName
            })) || [],

        Designation:
            Data.Designations?.map((item) => ({
                RecordID: item.DesignationID,
                Code: item.DesignationCode,
                Name: item.DesignationName
            })) || [],

        Unit:
            Data.Unit?.map((item) => ({
                RecordID: item.UnitID,
                Code: item.UnitCode,
                Name: item.UnitName
            })) || [],
        Employee: Data.Employees?.map((item) => ({
            RecordID: item.EmployeeID,
            Code: item.EmployeeCode,
            Name: item.EmployeeName
        })) || [],

        Party: Data.Parties?.map((item) => ({
            RecordID: item.PartyID,
            Code: item.PartyCode,
            Name: item.PartyName
        })) || []

    };
    // const initialValues = {
    //     Code: Data.Code,
    //     Name: Data.Name,
    //     SortOrder: Data.SortOrder || 0,
    //     checkbox: Data.Disable === "Y",
    //     delete: Data.DeleteFlag === "Y",

    //     Party: Data.Parties?.map((item) => ({
    //         RecordID: item.PartyID,
    //         Code: item.PartyCode,
    //         Name: item.PartyName,
    //     })) || [],

    //     project: Data.Projects?.map((item) => ({
    //         RecordID: item.ProjectID,
    //         Code: item.ProjectCode,
    //         Name: item.ProjectName,
    //     })) || [],

    //     Designation: Data.Designations?.map((item) => ({
    //         RecordID: item.DesignationID,
    //         Code: item.DesignationCode,
    //         Name: item.DesignationName,
    //     })) || [],

    //     Employees: Data.Employees?.map((item) => ({
    //         RecordID: item.EmployeeID,
    //         Code: item.EmployeeCode,
    //         Name: item.EmployeeName,
    //     })) || []
    // };
    // **********Save Function*****************
    // const projecIDs = selectedPro.map((ProName) => ProName.RecordID).join(",");
    // const partyIDs = selectedParty.map((ProName) => ProName.RecordID).join(",");

    const fnSave = async (values, del) => {
        const projecIDs = values.Employee?.map((item) => item.RecordID).join(",");
        const partyIDs = values.Party?.map((item) => item.RecordID).join(",");
        const projectIDs = values.project?.map(x => x.RecordID).join(",");
        const designationIDs = values.Designation?.map(x => x.RecordID).join(",");
        const unitIDs = values.Unit?.map(x => x.RecordID).join(",");
        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";
        var isCheck = "N";
        if (values.disable == true) {
            isCheck = "Y";
        }

        console.log(values);

        var idata = {
            RecordID: recID,
            Description: values.Name,
            Code: values.Code,
            DocumentCategoryID: params.parentID1,
            // ProjectID: values.project.RecordID || 0,
            // DesignationID: values.Designation.RecordID || 0,
            // UnitID: values?.Unit?.RecordID || 0,
            EmployeeID: projecIDs || 0,
            PartyID: partyIDs || 0,
            ProjectID: projectIDs || 0,
            DesignationID: designationIDs || 0,
            UnitID: unitIDs || 0,
            Sortorder: values.SortOrder || 0,
            Disable: values.checkbox === true ? "Y" : "N",
            DeleteFlag: values.delete == true ? "Y" : "N",
            CompanyID,
            Attachments: image || "",
        };

        const data = await dispatch(postData({ accessID, action, idata }));
        if (data.payload.Status == "Y") {
            toast.success(data.payload.Msg);
            setLoading(false);
            // navigate(`/Apps/Secondarylistview/Document%20Category/TR362/Document/${data.payload.DocumentCategoryID},`);
            navigate(-1);
        } else {
            toast.error(data.payload.Msg);
            setLoading(false);
        }
    };

    const ref = useRef(null);
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
                    navigate(-1);
                }
            } else {
                return;
            }
        });
    };
    //  console.log("dept",deptSchema);
    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}
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
                                    Document
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
            {/* {!getLoading ? ( */}
            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            fnSave(values);
                        }, 100);
                    }}
                    validationSchema={validationSchema}
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

                                {CompanyAutoCode == "Y" ? (
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        label="Code"
                                        placeholder="Auto"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Code}
                                        id="Code"
                                        name="Code"
                                        error={!!touched.Code && !!errors.Code}
                                        helperText={touched.Code && errors.Code}
                                        InputProps={{ readOnly: true }}
                                        // required
                                        focused
                                        // autoFocus
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        inputProps={{ maxLength: 8 }}
                                        onInvalid={(e) => {
                                            e.target.setCustomValidity("Please Fill The Code");
                                        }}
                                        onInput={(e) => {
                                            e.target.setCustomValidity("");
                                        }}
                                    />
                                ) : (
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        label={
                                            <>
                                                Code<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                            </>
                                        }
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Code}
                                        id="Code"
                                        name="Code"
                                        error={!!touched.Code && !!errors.Code}
                                        helperText={touched.Code && errors.Code}
                                        // required
                                        focused
                                        autoFocus
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        inputProps={{ maxLength: 8 }}
                                        onInvalid={(e) => {
                                            e.target.setCustomValidity("Please Fill The Code");
                                        }}
                                        onInput={(e) => {
                                            e.target.setCustomValidity("");
                                        }}
                                    />
                                )}
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    type="text"
                                    label={
                                        <>
                                            Name<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                        </>
                                    }
                                    value={values.Name}
                                    id="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="Name"
                                    error={!!touched.Name && !!errors.Name}
                                    helperText={touched.Name && errors.Name}
                                    focused
                                    autoFocus={CompanyAutoCode === "Y"}
                                    sx={{

                                        backgroundColor: "#ffffff", // Set the background to white
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                        }
                                    }}
                                    // required
                                    inputProps={{ maxLength: 90 }}
                                    multiline
                                    onInvalid={(e) => {
                                        e.target.setCustomValidity(
                                            "Please fill the Name"
                                        );
                                    }}
                                    onInput={(e) => {
                                        e.target.setCustomValidity("");
                                    }}
                                />
                                {/* <CheckinAutocomplete
                                    id="project"
                                    name="project"
                                    label={
                                        <>
                                            Project
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </>
                                    }
                                    variant="outlined"
                                    value={values.project}
                                    onChange={(newValue) => {
                                        setFieldValue("project", {
                                            RecordID: newValue.RecordID,
                                            Code: newValue.Code,
                                            Name: newValue.Name,
                                        });
                                    }}
                                    error={!!touched.project && !!errors.project}
                                    helperText={touched.project && errors.project}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                /> */}
                                {/* <TextField
                                    select
                                    fullWidth
                                    variant="standard"
                                    label={
                                        <span>
                                            Unit
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </span>
                                    }
                                    value={values.BillingType}
                                    id="Unit"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="Unit"
                                    error={!!touched.Unit && !!errors.Unit}
                                    helperText={touched.Unit && errors.Unit}
                                    // required
                                    focused
                                >
                                    <MenuItem value="Unit1">Unit 1</MenuItem>
                                    <MenuItem value="Unit2">Unit 2</MenuItem>
                                </TextField> */}
                                {/* <CheckinAutocomplete
                                    id="Unit"
                                    name="Unit"
                                    label={
                                        <>
                                            Unit
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </>
                                    }
                                    variant="outlined"
                                    value={values.Unit}
                                    onChange={(newValue) => {
                                        setFieldValue("Unit", {
                                            RecordID: newValue.RecordID,
                                            Code: newValue.Code,
                                            Name: newValue.Name,
                                        });
                                    }}
                                    error={!!touched.Unit && !!errors.Unit}
                                    helperText={touched.Unit && errors.Unit}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2158","ScreenName":"Unit","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                                />
                                <CheckinAutocomplete
                                    name="Designation"
                                    label={
                                        <span>
                                            Designation
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </span>
                                    }
                                    variant="outlined"
                                    id="Designation"
                                    value={values.Designation}
                                    onChange={(newValue) => {
                                        setFieldValue("Designation", newValue);
                                    }}
                                    error={!!touched.Designation && !!errors.Designation}
                                    helperText={touched.Designation && errors.Designation}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2047","ScreenName":"Designation","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                /> */}
                                <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="project"
                                    label="Project"
                                    id="project"
                                    value={values.project || []}
                                    onChange={(e, newValue) => {
                                        setFieldValue("project", newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                />
                                <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Unit"
                                    label="Unit"
                                    id="Unit"
                                    value={values.Unit || []}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Unit", newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2158","ScreenName":"Unit","Filter":"ProjectID='${values.project?.map(x => x.RecordID).join(",")}' AND CompanyID='${CompanyID}'","Any":""}}`}
                                />
                                <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Designation"
                                    label="Designation"
                                    id="Designation"
                                    value={values.Designation || []}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Designation", newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2047","ScreenName":"Designation","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                />
                                {/* <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Employee"
                                    label="Employee"
                                    id="Employee"
                                    value={selectedPro}
                                    // onChange={(e, newValue) => {
                                    //     setFieldValue("block", newValue);
                                    //     setSelectedPro(newValue);
                                    // }}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Employee", newValue);
                                        setSelectedPro(newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2116","ScreenName":"EMPLOYEETEAMS","Filter":"CompanyID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}
                                /> */}
                                <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Employee"
                                    label="Personnel"
                                    id="Employee"
                                    value={values.Employee || []}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Employee", newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2116","ScreenName":"EMPLOYEETEAMS","Filter":"CompanyID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}

                                />
                                {/* <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Party"
                                    label="Party"
                                    id="Party"
                                    value={selectedParty}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Party", newValue);
                                        setSelectedParty(newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Party","Filter":"parentID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}
                                /> */}
                                <MultiFormikOptimizedAutocomplete
                                    sx={{ width: "100%" }}
                                    name="Party"
                                    label="Party"
                                    id="Party"
                                    value={values.Party || []}
                                    onChange={(e, newValue) => {
                                        setFieldValue("Party", newValue);
                                    }}
                                    url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Party","Filter":"parentID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}

                                />
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    type="Number"
                                    label="Sort Order"
                                    value={values.SortOrder}
                                    id="SortOrder"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="SortOrder"
                                    error={!!touched.SortOrder && !!errors.SortOrder}
                                    helperText={touched.SortOrder && errors.SortOrder}

                                    focused
                                    onWheel={(e) => e.target.blur()}
                                    InputProps={{
                                        inputProps: {
                                            style: { textAlign: "right", background: "" },
                                        },
                                    }}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 8);
                                    }}
                                />
                                {/* Upload Section */}

                                <FormControl>
                                    <Box>
                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="delete"
                                            id="delete"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Delete"
                                        />

                                        <FormLabel focused={false}>Delete</FormLabel>
                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="checkbox"
                                            id="checkbox"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Disable"
                                        />

                                        <FormLabel focused={false}>Disable</FormLabel>

                                    </Box>
                                </FormControl>

                            </Box>
                            <Paper
                                elevation={2}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    background: "#fafafa"
                                }}
                            >
                                <Typography variant="h5" sx={{ mb: 1,color: "#3924f9" }}>
                                    Attachment
                                </Typography>

                                {/* <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">

                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="small"
                                    >
                                        Upload File
                                        <input
                                            hidden
                                            type="file"
                                            accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={getFilepanChange}
                                        />
                                    </Button>

                                    {!!image && (
                                        <Box
                                            sx={{
                                                border: "1px solid #dcdcdc",
                                                borderRadius: 1,
                                                px: 2,
                                                py: 0.5,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                background: "#fff"
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: 220,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {image}
                                            </Typography>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => {
                                                    const fileUrl =
                                                        store.getState().globalurl.attachmentUrl + image;

                                                    window.open(fileUrl, "_blank");
                                                }}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    )}

                                </Box> */}
                                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">

                                    {/* Upload Button */}
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="small"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Uploading..." : "Upload File"}
                                        <input
                                            hidden
                                            type="file"
                                            accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={getFilepanChange}
                                        />
                                    </Button>

                                    {/* File Name Box (Always Visible) */}
                                    <Box
                                        sx={{
                                            border: "1px solid #dcdcdc",
                                            borderRadius: 1,
                                            px: 2,
                                            py: 0.5,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            background: "#fff",
                                            minWidth: 250
                                        }}
                                    >
                                        {/* File Name */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                flex: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {uploading
                                                ? "Uploading..."
                                                : image
                                                    ? image
                                                    : "No file chosen"}
                                        </Typography>

                                        {/* Loader OR View Button */}
                                        {uploading ? (
                                            <CircularProgress size={18} />
                                        ) : (
                                            image && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => {
                                                        const fileUrl =
                                                            store.getState().globalurl.attachmentUrl + image;

                                                        window.open(fileUrl, "_blank");
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            )
                                        )}
                                    </Box>

                                </Box>

                                <Typography variant="caption" color="text.secondary">
                                    Allowed: Video, Audio, Image, PDF, Excel, Word
                                </Typography>
                            </Paper>
                            <Box display="flex" justifyContent="end" padding={1} gap={2}>
                                {/* <Tooltip title="Upload Logo">
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
                                        Data?.Attachments || image
                                            ? window.open(
                                                image
                                                    ? store.getState().globalurl.attachmentUrl +
                                                    image
                                                    : store.getState().globalurl.attachmentUrl +
                                                    Data.image,
                                                "_blank"
                                            )
                                            : toast.error("Please Upload File");
                                    }}
                                >
                                    View
                                </Button> */}
                                {YearFlag == "true" ? (
                                    <LoadingButton
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        loading={loading}
                                    // onClick={() => {
                                    //   fnSave(values);
                                    // }}
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
            {/* ) : (
        false
      )} */}
        </React.Fragment>
    );
};

export default Editdocument;
