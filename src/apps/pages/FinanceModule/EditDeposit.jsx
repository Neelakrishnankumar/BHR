import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    FormControlLabel,
    Tooltip,
    Checkbox,
    MenuItem,
    InputLabel,
    Select,
    LinearProgress,
    Paper,
    Breadcrumbs
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import {
    CustomisedCaptionGet,
    fetchApidata,
    getFetchCashData,
    getFetchData,
    postApidata,
    postData,
} from "../../../store/reducers/Formapireducer";
import store from "../../../index";
import { fileUpload, imageUpload } from "../../../store/reducers/Imguploadreducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import {  HsnSchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/global/utils";
import { CheckinAutocomplete, Productautocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import CryptoJS from "crypto-js";
const Editdepositcash = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const UserName = sessionStorage.getItem("UserName");
    const data = useSelector((state) => state.formApi.Data);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyID = sessionStorage.getItem("compID");
    const location = useLocation();
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const [logoimage, setlogoimage] = useState("");
    const [fileName, setFileName] = useState("");
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree) ? lastThree : "";
    const UserRecordid = sessionStorage.getItem("loginrecordID");

    // Sync fileName when edit mode data loads
    useEffect(() => {
        if (mode === "E" && data.Attachment) {
            setFileName(data.Attachment.split("/").pop());
            setlogoimage(data.Attachment);
        }
    }, [data.Attachment]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({
                    depositdate: Yup.string().required(data.DepositCash.depositdate).nullable(),
                    amount: Yup.string().required(data.DepositCash.amount).nullable(),
                    // AccountNumber: Yup.string().required(data.DepositCash.AccountNumber).nullable(),
                    // IfscCode: Yup.string().required(data.DepositCash.IfscCode).nullable(),
                    IfscCode: Yup.string()
                        .required(data.DepositCash.IfscCode)
                        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
                    AccountNumber: Yup.string()
                        .required(data.DepositCash.AccountNumber)
                        .matches(/^\d{9,18}$/, "Invalid Account Number"),
                    AccountHoldersName: Yup.string().required(data.DepositCash.AccountHoldersName).nullable(),
                    branchName: Yup.string().required(data.DepositCash.branchName).nullable(),
                });
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);

    useEffect(() => {
        dispatch(getFetchCashData({ accessID, get: "get", recID, CompanyID }));
    }, [location.key]);

    useEffect(() => {
        if (Subscriptionlastthree && accessID) {
            dispatch(CustomisedCaptionGet({ Vertical: Subscriptionlastthree, AccessID: accessID }));
        }
    }, [Subscriptionlastthree, accessID, dispatch]);

    // ── Summary Cards ──────────────────────────────────────────
    const SummaryCards = ({ openingBalance, todaysCollection, inHandAmount }) => {
        const cards = [
            { label: "Opening Balance", value: openingBalance },
            { label: "Today's Collection", value: todaysCollection },
            { label: "In Hand Amount", value: inHandAmount },
        ];
        const formatAmount = (amount) =>
            `₹ ${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
        const cardColors = [
            "#E3F2FD", // light blue
            "#E8F5E9", // light green
            "#FFF3E0", // light orange          
        ];
        const borderColors = [
            "#9dd4fb", // light blue
            "#a2f5a9", // light green
            "#fbdaa5", // light orange          
        ];

        return (
            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap="12px"
                p={2}
                pb={0}
            >
                {cards.map(({ label, value }, index) => (
                    <Paper
                        key={label}
                        elevation={0}
                        sx={{
                            border: `2px solid ${borderColors[index % borderColors.length]}`,
                            borderRadius: "12px",
                            padding: "1rem 1.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            backgroundColor: cardColors[index % cardColors.length],
                        }}
                    >
                        <Box display="flex" alignItems="center" gap="6px">
                            <Typography variant="h7" fontWeight={300}>{label}</Typography>
                        </Box>
                        <Typography variant="h5" fontWeight={500}>{formatAmount(value)}</Typography>
                    </Paper>
                ))}
            </Box>
        );
    };

    // ── InitialValue mapped to GET response ────────────────────
    const InitialValue = {
        depositdate: mode === "E" ? data.DepositDate : "",
        employee: mode === "E" ? data.EmployeeName : UserName,   // display only
        employeeID: data.EmployeeID || "",
        transactionID: data.TransactionID || "",
        description: mode === "E" ? data.Description : "",
        amount: mode === "E" ? data.Amount : "",
        balamount: data.BalanceAmount || "",  // auto-computed
        AccountNumber: mode === "E" ? data.AccountNo : "",
        IfscCode: mode === "E" ? data.IFSCCode : "",
        AccountHoldersName: mode === "E" ? data.HolderName : "",
        branchName: mode === "E" ? data.BranchName : "",
    };

    // ── Save mapped to POST structure ─────────────────────────
    const Fnsave = async (values, del) => {
        let action =
            mode === "A" && !del ? "insert" :
                mode === "E" && del ? "harddelete" :
                    "update";

        const idata = {
            RecordID: recID || "",
            DepositDate: values.depositdate,
            TransactionID: values.transactionID,
            CategoryID: params.type || 0,
            EmployeeID: UserRecordid || 0,
            Amount: Number(values.amount),
            AccountNo: values.AccountNumber,
            IFSCCode: values.IfscCode,
            HolderName: values.AccountHoldersName,
            Attachment: logoimage || "",
            BalanceAmount: Number(values.balamount),
            BranchName: values.branchName,
        };

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);
            dispatch(getFetchCashData({ accessID, get: "get", recID, CompanyID }));

            navigate(-1);
        } else {
            toast.error(response.payload.Msg);
            dispatch(getFetchCashData({ accessID, get: "get", recID, CompanyID }));

        }
    };

    // ── File Upload ───────────────────────────────────────────
    const getFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setlogoimage(fileData.payload.name);
        sessionStorage.setItem("logoimage", fileData.payload.name);
        if (fileData.payload.Status === "Y") toast.success(fileData.payload.Msg);
    };

    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: props,
        }).then((result) => {
            if (result.isConfirmed) {
                if (props === "Logout") navigate("/");
                if (props === "Close") navigate(-1);
            }
        });
    };

    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}

            {/* ── Header ── */}
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
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "pointer" }}
                                onClick={() => navigate(-1)}
                            >
                                Deposit Details
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

                    {/* ── Summary Cards ── */}
                    <SummaryCards
                        openingBalance={data.OpeningBalance}
                        todaysCollection={data.CollectedAmount}
                        inHandAmount={data.InHandAmount}
                    />

                    <Formik
                        initialValues={InitialValue}
                        validationSchema={validationSchema}
                        onSubmit={(values) => { setTimeout(() => Fnsave(values), 100); }}
                        enableReinitialize={true}
                    >
                        {({ errors, touched, handleBlur, handleChange, values, handleSubmit, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={2}
                                    gridTemplateColumns="repeat(2, minmax(0,1fr))"
                                    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
                                >
                                    {/* Deposit Date */}
                                    <TextField
                                        name="depositdate"
                                        type="date"
                                        id="depositdate"
                                        label={<>Date <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        value={values.depositdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        error={!!touched.depositdate && !!errors.depositdate}
                                        helperText={touched.depositdate && errors.depositdate}
                                    />

                                    {/* Employee (read-only) */}
                                    <TextField
                                        name="employee"
                                        type="text"
                                        id="employee"
                                        label="Employee"
                                        variant="standard"
                                        focused
                                        value={values.employee}
                                        InputProps={{ readOnly: true }}
                                    />

                                    {/* Description */}
                                    {/* <TextField
                                        name="description"
                                        type="text"
                                        id="description"
                                        label={<>Description <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        focused
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}s
                                        error={!!touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                    /> */}

                                    {/* Amount */}
                                    <TextField
                                        name="amount"
                                        type="number"
                                        id="amount"
                                        label={<>Amount <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        focused
                                        value={values.amount}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            // BalanceAmount = InHandAmount - Amount
                                            const entered = parseFloat(e.target.value) || 0;
                                            const inHand = parseFloat(data.InHandAmount) || 0;
                                            setFieldValue("balamount", (inHand - entered).toFixed(2));
                                        }}
                                        error={!!touched.amount && !!errors.amount}
                                        helperText={touched.amount && errors.amount}
                                        autoFocus
                                        InputProps={{ inputProps: { min: 0 } }}
                                        onWheel={(e) => e.target.blur()}
                                    />

                                    {/* Balance Amount (read-only, auto-computed) */}
                                    <TextField
                                        name="balamount"
                                        type="text"
                                        id="balamount"
                                        label="Balance Amount"
                                        variant="standard"
                                        focused
                                        value={values.balamount}
                                        InputProps={{ readOnly: true }}
                                    // sx={{
                                    //     "& .MuiInputBase-input": {
                                    //         color: "#0d6e3f",
                                    //         fontWeight: 500,
                                    //     }
                                    // }}
                                    />

                                    {/* ── Bank Details Section ── */}
                                    <Typography variant="h5" sx={{ gridColumn: "span 2", mt: 2 }}>
                                        Bank Details:
                                    </Typography>

                                    {/* Account Number */}
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        id="AccountNumber"
                                        name="AccountNumber"
                                        value={values.AccountNumber}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label={<>Account Number <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        focused
                                        error={touched.AccountNumber && Boolean(errors.AccountNumber)}
                                        helperText={touched.AccountNumber && errors.AccountNumber}
                                        onWheel={(e) => e.target.blur()}
                                    />

                                    {/* IFSC Code */}
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="IfscCode"
                                        name="IfscCode"
                                        value={values.IfscCode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label={<>IFSC Code <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        focused
                                        error={touched.IfscCode && Boolean(errors.IfscCode)}
                                        helperText={touched.IfscCode && errors.IfscCode}
                                    />

                                    {/* Account Holder Name */}
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="AccountHoldersName"
                                        name="AccountHoldersName"
                                        value={values.AccountHoldersName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label={<>Account Holder Name <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        focused
                                        error={touched.AccountHoldersName && Boolean(errors.AccountHoldersName)}
                                        helperText={touched.AccountHoldersName && errors.AccountHoldersName}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="branchName"
                                        name="branchName"
                                        value={values.branchName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label={<>Branch Name <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        focused
                                        error={touched.branchName && Boolean(errors.branchName)}
                                        helperText={touched.branchName && errors.branchName}
                                    />

                                    {/* ── Attachment Section ── */}
                                    <Typography variant="h5" sx={{ gridColumn: "span 2", mt: 2 }}>
                                        Attachment:
                                    </Typography>

                                    <Box sx={{ gridColumn: "span 2" }}>
                                        {fileName ? (
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                border: "0.5px solid",
                                                borderColor: "divider",
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1.2,
                                                background: "#fff",
                                            }}>
                                                <InsertDriveFileOutlinedIcon sx={{ color: "#185FA5", fontSize: 20 }} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ flex: 1, cursor: logoimage ? "pointer" : "default", color: logoimage ? "#185FA5" : "inherit" }}
                                                    onClick={() => {
                                                        if (logoimage) {
                                                            window.open(
                                                                store.getState().globalurl.attachmentUrl + logoimage,
                                                                "_blank"
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {fileName}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => { setFileName(""); setlogoimage(""); }}
                                                >
                                                    <CloseIcon sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <label style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 8,
                                                border: "0.5px dashed #bbb",
                                                borderRadius: 8,
                                                padding: "9px 14px",
                                                cursor: "pointer",
                                                width: "100%",
                                                fontSize: 13,
                                                color: "#666",
                                                boxSizing: "border-box",
                                            }}>
                                                <UploadOutlinedIcon sx={{ fontSize: 18 }} />
                                                <span>Click to upload file</span>
                                                <input hidden type="file" onChange={getFileChange} />
                                            </label>
                                        )}
                                    </Box>
                                </Box>

                                {/* ── Action Buttons ── */}
                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                                    <LoadingButton
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        loading={isLoading}
                                    >
                                        Confirm Deposit
                                    </LoadingButton>
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : false}
        </React.Fragment>
    );
};

export default Editdepositcash;

