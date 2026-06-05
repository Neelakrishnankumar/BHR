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

const Editdebitcash = () => {
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
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree) ? lastThree : "";
    const UserRecordid = sessionStorage.getItem("loginrecordID");

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({
                    date: Yup.string().required(data.DebitCash.depositdate).nullable(),
                    description: Yup.string().required(data.DebitCash.description).nullable(),
                    amount: Yup.string().required(data.DebitCash.amount).nullable(),
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
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="12px" p={2} pb={0}>
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
                            <Typography variant="h7" fontWeight={300}>
                                {label}
                            </Typography>
                        </Box>
                        <Typography variant="h5" fontWeight={500}>
                            {formatAmount(value)}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        );
    };

    // ── InitialValue mapped to GET response ────────────────────
    const InitialValue = {
        date: mode === "E" ? data.DebitDate : "",
        employee: mode === "E" ? data.EmployeeName : UserName,
        employeeID: mode === "E" ? data.EmployeeID : "",
        transactionID: data.TransactionID || "",
        description: mode === "E" ? data.Description : "",
        amount: mode === "E" ? data.Amount : "",
        balamount: data.BalanceAmount || "",

    };

    // ── Save mapped to POST structure ─────────────────────────
    const Fnsave = async (values, del) => {
        let action =
            mode === "A" && !del ? "insert" :
                mode === "E" && del ? "harddelete" :
                    "update";

        const idata = {
            RecordID: recID || "-1",
            DebitDate: values.date,
            TransactionID: values.transactionID,
            CategoryID: params.type || 0,
            EmployeeID: UserRecordid || 0,
            Description: values.description,
            Amount: Number(values.amount),
            BalanceAmount: Number(values.balamount),
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
                                Debit Details
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
                        onSubmit={(values) => {
                            setTimeout(() => Fnsave(values), 100);
                        }}
                        validationSchema={validationSchema}
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
                                    {/* Debit Date */}
                                    <TextField
                                        name="date"
                                        type="date"
                                        id="date"
                                        label={<>Date <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        value={values.date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        focused
                                        error={!!touched.date && !!errors.date}
                                        helperText={touched.date && errors.date}
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
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.employee && !!errors.employee}
                                        helperText={touched.employee && errors.employee}
                                        InputProps={{ readOnly: true }}
                                    />

                                    {/* Description */}
                                    <TextField
                                        name="description"
                                        type="text"
                                        id="description"
                                        label={<>Description <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        focused
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                    />

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
                                            // Auto-compute BalanceAmount = InHandAmount - Amount
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

                                    {/* InHand at entry (read-only, from GET) */}
                                    {/* <TextField
                                        name="inhandentry"
                                        type="text"
                                        id="inhandentry"
                                        label="InHand at entry"
                                        variant="standard"
                                        focused
                                        value={data.InHandAmount ? `₹ ${Number(data.InHandAmount).toLocaleString("en-IN")}` : ""}
                                        InputProps={{ readOnly: true }}
                                        sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
                                    />

                                    <TextField
                                        name="balentry"
                                        type="text"
                                        id="balentry"
                                        label="Balance at entry"
                                        variant="standard"
                                        focused
                                        value={data.BalanceAmount ? `₹ ${Number(data.BalanceAmount).toLocaleString("en-IN")}` : ""}
                                        InputProps={{ readOnly: true }}
                                        sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
                                    /> */}
                                </Box>

                                {/* ── Action Buttons ── */}
                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                                    <LoadingButton
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        loading={isLoading}
                                    >
                                        Confirm Debit
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

export default Editdebitcash;

