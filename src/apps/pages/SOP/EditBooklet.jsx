import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    Paper,
    IconButton,
    Tooltip,
    LinearProgress,
    TableRow,
    TableCell,
    TableHead,
    Table,
    TableContainer,
    TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Form, Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { useProSidebar } from "react-pro-sidebar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { formGap } from "../../../ui-components/utils";
import { SOPDocLookup, SOPEMPLookup } from "../../../ui-components/global/Autocomplete";
import { SOPfileUpload } from "../../../store/reducers/Imguploadreducer";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import store from "../../../index";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const EditBooklet = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const location = useLocation();
    const state = location.state || {};
    const recID = params.id;
    const accessID = params.accessID;
    const mode = params.Mode;

    const CompanyID = sessionStorage.getItem("compID");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { toggleSidebar, broken, rtl } = useProSidebar();

    const data = useSelector((state) => state.formApi.Data);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);

    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");

    const [validationSchema, setValidationSchema] = useState(null);

    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const rowSx = { height: 36, '& td, & th': { py: 0.5 } };
    const [SOPFileLoading, setSOPFileLoading] = useState(false);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({
                    DocumentName: Yup.string().trim().required(data.QCSOPDoc.DocumentName),
                    PdfAttach: Yup.string().required(data.QCSOPDoc.PdfAttach),
                    DocType: Yup.object().required(data.QCSOPDoc.DocType).nullable(),
                });
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode]);
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, []);

    const [empData, setempData] = useState(null);
    const [empData1, setempData1] = useState(null);

    let employeeFilter = `CompanyID='${CompanyID}'`;

    const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
        JSON.stringify({
            Query: {
                AccessID: "2117",
                ScreenName: "Employee",
                Filter: employeeFilter,
                Any: "",
                CompId: "",
            },
        }),
    )}`;
    const SOPInitialValues = {
        AnnexureNo: data.AnnexureNo || "",
        RequestDate: data.RequestDate || "",
        NoOfCopyIssue: data.NoOfCopyIssue || "",
        IssueLogBookNo: data.IssueLogBookNo || "",
        IssuedBy: data.IssuedBy || "",
        ReceivedBy: data.ReceivedBy || "",
        AdditionalInfo: data.AdditionalInfo || "",
        SortOrder: data.SortOrder || "0",
        Disable: data.Disable === "Y" ? true : false,
    }
    const SOPSaveFn = async (values) => {

        let action = "";

        if (mode === "A") action = "insert";
        else if (mode === "E") action = "update";

        const idata = {
            RecordID: recID,
            CompanyID: CompanyID,
            SopDocumentListID: params.parentID2 || 0,
            AnnexureNo: values.AnnexureNo || "",
            RequestDate: values.RequestDate || "",
            NoOfCopyIssue: values.NoOfCopyIssue || "",
            IssueLogBookNo: values.IssueLogBookNo || "",
            IssuedBy: values.IssuedBy?.RecordID || null,
            ReceivedBy: values.ReceivedBy?.RecordID || null,
            AdditionalInfo: values.AdditionalInfo || "",
            SortOrder: values.SortOrder || "0",
            Disable: values.Disable ? "Y" : "N",
        };

        const response = await dispatch(postData({ accessID, action, idata }));

        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg || "Error");
        }
    };
    const [errorMsgData, setErrorMsgData] = useState(null);

    const fnLogOut = (props) => {
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
                    navigate("/Apps/TR336/List%20Of%20SOPs");
                }
            } else {
                return;
            }
        });
    };

    return (
        <>
            <React.Fragment
                sx={{
                    p: 2,
                    height: "100vh",
                }}
            >
                {/* BREADCRUMBS */}
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
                                        onClick={() => navigate("/Apps/TR336/List%20Of%20SOPs")}
                                    >
                                        List of SOPs ({state.BreadCrumb1 || ""})
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                        onClick={() => navigate(-1)}
                                    >
                                        List of SOP Document
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                    // onClick={() => navigate(-1)}
                                    >
                                        List of Booklet
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                    >
                                        {mode == "A" ? "New" : mode == "E" ? `Edit ${(state.BreadCrumb2) ? `- ${state.BreadCrumb2}` : ""}` : "View"}
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
                {getLoading ? (<LinearProgress />) : false}
                {SOPFileLoading ? (<LinearProgress />) : false}

                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={SOPInitialValues}
                        onSubmit={(values) => {
                            SOPSaveFn(values);
                        }}
                        enableReinitialize
                    // validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >

                                    {/* <SOPDocLookup
                    id="DocType"
                    name="DocType"
                    label={
                      <>
                        Type Of Document
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="outlined"
                    value={values.DocType}
                    onChange={(newValue) => {
                      setFieldValue("DocType", newValue);
                      console.log(newValue, "--newvalue DocType");
                      console.log(newValue.RecordID, "DocType RecordID");
                    }}
                    error={!!touched.DocType && !!errors.DocType}
                    helperText={touched.DocType && errors.DocType}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2146","ScreenName":"DocType","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                  /> */}

                                    <TextField
                                        name="AnnexureNo"
                                        type="text"
                                        id="AnnexureNo"
                                        value={values.AnnexureNo}
                                        label={
                                            <>
                                                Annexure No
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.AnnexureNo && !!errors.AnnexureNo}
                                        helperText={touched.AnnexureNo && errors.AnnexureNo}
                                        autoFocus
                                    />
                                    <TextField
                                        name="RequestDate"
                                        type="date"
                                        id="RequestDate"
                                        value={values.RequestDate}
                                        label={
                                            <>
                                                Request Date
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.RequestDate && !!errors.RequestDate}
                                        helperText={touched.RequestDate && errors.RequestDate}
                                        autoFocus
                                    />
                                    <TextField
                                        name="NoOfCopyIssue"
                                        type="text"
                                        id="NoOfCopyIssue"
                                        value={values.NoOfCopyIssue}
                                        label={
                                            <>
                                                No Of Copies Issued
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.NoOfCopyIssue && !!errors.NoOfCopyIssue}
                                        helperText={touched.NoOfCopyIssue && errors.NoOfCopyIssue}
                                        autoFocus
                                    />
                                    <TextField
                                        name="IssueLogBookNo"
                                        type="text"
                                        id="IssueLogBookNo"
                                        value={values.IssueLogBookNo}
                                        label={
                                            <>
                                                Issued Log Book No
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.IssueLogBookNo && !!errors.IssueLogBookNo}
                                        helperText={touched.IssueLogBookNo && errors.IssueLogBookNo}
                                        autoFocus
                                    />
                                    {/* <TextField
                                        name="IssuedBy"
                                        type="text"
                                        id="IssuedBy"
                                        value={values.IssuedBy}
                                        label={
                                            <>
                                                Issued By
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.IssuedBy && !!errors.IssuedBy}
                                        helperText={touched.IssuedBy && errors.IssuedBy}
                                        autoFocus
                                    />
                                    <TextField
                                        name="ReceivedBy"
                                        type="text"
                                        id="ReceivedBy"
                                        value={values.ReceivedBy}
                                        label={
                                            <>
                                                Received By
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.ReceivedBy && !!errors.ReceivedBy}
                                        helperText={touched.ReceivedBy && errors.ReceivedBy}
                                        autoFocus
                                    /> */}
                                    <SOPEMPLookup
                                        name="IssuedBy"
                                        label="IssuedBy"
                                        id="IssuedBy"
                                        value={values.IssuedBy}
                                        onChange={(newValue) => {
                                            setFieldValue("IssuedBy", newValue);
                                            console.log(newValue, "--newvalue IssuedBy");
                                            console.log(newValue.RecordID, "IssuedBy RecordID");
                                        }}
                                        error={!!touched.IssuedBy && !!errors.IssuedBy}
                                        helperText={touched.IssuedBy && errors.IssuedBy}
                                        disablePortal={false}
                                        PopperProps={{
                                            sx: {
                                                zIndex: 1500,
                                            },
                                        }}
                                        url={employeeUrl}
                                    />
                                    <SOPEMPLookup
                                        name="ReceivedBy"
                                        label="ReceivedBy"
                                        id="ReceivedBy"
                                        value={values.ReceivedBy}
                                        onChange={(newValue) => {
                                            setFieldValue("ReceivedBy", newValue);
                                            console.log(newValue, "--newvalue ReceivedBy");
                                            console.log(newValue.RecordID, "ReceivedBy RecordID");
                                        }}
                                        error={!!touched.ReceivedBy && !!errors.ReceivedBy}
                                        helperText={touched.ReceivedBy && errors.ReceivedBy}
                                        disablePortal={false}
                                        PopperProps={{
                                            sx: {
                                                zIndex: 1500,
                                            },
                                        }}
                                        url={employeeUrl}
                                    />

                                    <TextField
                                        name="AdditionalInfo"
                                        type="text"
                                        id="AdditionalInfo"
                                        value={values.AdditionalInfo}
                                        label={
                                            <>
                                                Additional Info
                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.AdditionalInfo && !!errors.AdditionalInfo}
                                        helperText={touched.AdditionalInfo && errors.AdditionalInfo}
                                        autoFocus
                                    />

                                    {/* SORT ORDER */}
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        label="Sort Order"
                                        value={values.SortOrder}
                                        id="SortOrder"
                                        name="SortOrder"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        onWheel={(e) => e.target.blur()}
                                        onInput={(e) => {
                                            e.target.value = Math.max(
                                                0,
                                                parseInt(e.target.value || 0)
                                            )
                                                .toString()
                                                .slice(0, 8);
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                    />

                                    {/* DISABLE CHECKBOX */}
                                    <Box display="flex" alignItems="center">
                                        <FormControlLabel
                                            control={<Checkbox name="Disable"
                                                checked={values.Disable}
                                                onChange={handleChange} />}
                                            label="Disable"
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    padding={1}
                                    gap={2}
                                >
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        loading={isLoading}
                                    >
                                        Save
                                    </LoadingButton>

                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>

                            </Form>


                        )}
                    </Formik>
                </Paper>

            </React.Fragment>
        </>
    )
}

export default EditBooklet;
