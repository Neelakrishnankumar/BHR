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
    LinearProgress,
    Paper,
    MenuItem,
    Breadcrumbs,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
    DefaultProductDeliveryChargeGet,
    fetchApidata,
    getFetchData,
    OHPaymentUpdateController,
    PartyOrderPendingGet,
    postApidata,
    postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { dataGridHeaderFooterHeight, dataGridRowHeight, formGap } from "../../../ui-components/utils";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Rating from "@mui/material/Rating";
import * as Yup from "yup";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { InputAdornment } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { dataGridHeight } from "../../../ui-components/global/utils";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
import { CheckinAutocomplete, PartySingleSelect, SettlementSingleSelect } from "../../../ui-components/global/Autocomplete";

// import CryptoJS from "crypto-js";
const EditSettlements = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const data = useSelector((state) => state.formApi.Data) || {};
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const LoginID = sessionStorage.getItem("loginrecordID");
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const location = useLocation();
    const state = location.state || {};
    const ViewStatus = state.ViewStatus;
    console.log("🚀 ~ EditOrder ~ ViewStatus:", ViewStatus);

    const PartyRecordID = state.PartyID;
    console.log("🚀 ~ EditOrderitem ~ PartyRecordID:", PartyRecordID);
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = React.useState(10);

    const [showDueGrid, setShowDueGrid] = useState(false);
    const [dueRows, setDueRows] = useState([]);
    const [dueLoading, setDueLoading] = useState(false);

    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                let schemaFields = {
                    Amount: Yup.number()
                        .typeError(data.Settlement.Amount)
                        .required(data.Settlement.Amount)
                        .moreThan(0, "Amount must be greater than 0"),

                    paymentmode: Yup.string()
                        .typeError(data.Settlement.paymentmode)
                        .required(data.Settlement.paymentmode),
                    Date: Yup.string()
                        .typeError(data.Settlement.Date)
                        .required(data.Settlement.Date),
                    GiverID: Yup.object()
                        .typeError(data.Settlement.GiverID)
                        .required(data.Settlement.GiverID)
                        .nullable(),
                    ReceiverID: Yup.object()
                        .typeError(data.Settlement.ReceiverID)
                        .required(data.Settlement.ReceiverID)
                        .nullable(),
                };

                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);

    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split("T")[0];
    const handleDateChange = (e, handleChange) => {
        const value = e.target.value;

        // allow empty
        if (!value) {
            handleChange(e);
            return;
        }

        // allow only YYYY-MM-DD typing structure
        if (!/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)) {
            return;
        }

        const parts = value.split("-");

        const month = parts[1];
        const day = parts[2];

        // validate month/day ranges
        if (
            (month && Number(month) > 12) ||
            (day && Number(day) > 31)
        ) {
            return;
        }

        handleChange(e);
    };
    const InitialValue = {

        CompanyID: CompanyID,
        ReceiverID: data.ReceiverID
            ? {
                RecordID: data.ReceiverID,
                Code: data.ReceiverCode,
                Name: data.ReceiverName,
            }
            : null,

        GiverID: data.GiverID
            ? {
                RecordID: data.GiverID,
                Code: data.GiverCode,
                Name: data.GiverName,
            }
            : null,
        Date: data.SettlementDate || currentDate,
        paymentmode: data.ModeofPayment || "",
        Remarks: data.Remark || "",
        Amount: data.Amount || 0
    };


    const Fnsave = async (values, del, override = {}) => {

        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";

        const idata = {
            RecordID: recID,
            CompanyID: CompanyID,
            GiverID: values.GiverID.RecordID || 0,
            ReceiverID: values.ReceiverID.RecordID || 0,
            SettlementDate: values.Date || "",
            ModeofPayment: values.paymentmode || "",
            Remarks: values.Remarks || "",
            Sortorder: "0",
            Disable: "N",
            DeleteFlag: "N",
            Amount: values.Amount || "0.00"
        };

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg);

            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
    };

    const fnLogOut = (props) => {
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
                    navigate(-1);
                }
            } else {
                return;
            }
        });
    };



    return (
        <React.Fragment>

            {/* //Breadcrumbs and Header Section */}
            {getLoading ? <LinearProgress /> : false}
            <Paper
                elevation={0}
                sx={{
                    mx: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    bgcolor: "#fff",
                    overflow: "hidden", 
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={2}
                >
                    {/* LEFT SIDE */}
                    <Box display="flex" alignItems="center" gap={2}>
                        {broken && !rtl && (
                            <IconButton
                                onClick={() => toggleSidebar()}
                                sx={{
                                    bgcolor: "#F3F4F6",
                                    "&:hover": { bgcolor: "#E5E7EB" },
                                }}
                            >
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: "#111827",
                                    lineHeight: 1.2,
                                }}
                            >
                                Settlement
                            </Typography>

                            <Breadcrumbs
                                maxItems={2}
                                separator={
                                    <NavigateNextIcon sx={{ color: "#9CA3AF", fontSize: 18 }} />
                                }
                            >
                                <Typography
                                    sx={{
                                        color: "#2563EB",
                                        cursor: "pointer",
                                        fontSize: 14,
                                        fontWeight: 500,
                                    }}
                                    onClick={() => navigate("/Apps/TR380/Settlements")}
                                >
                                    List Of Settlement
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#6B7280",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate(-1)}
                                >
                                    {mode === "E"
                                        ? "Edit"
                                        : "New"}
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>

                    {/* RIGHT SIDE */}
                    <Box display="flex" gap={1}>
                        <Tooltip title="Close">
                            <IconButton
                                onClick={() => fnLogOut("Close")}
                                sx={{
                                    borderRadius: 2,
                                    color: "#DC2626",
                                    "&:hover": { bgcolor: "#FEE2E2" },
                                }}
                            >
                                <ResetTvIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Logout">
                            <IconButton
                                onClick={() => fnLogOut("Logout")}
                                sx={{
                                    borderRadius: 2,
                                    color: "#DC2626",
                                    "&:hover": { bgcolor: "#FEE2E2" },
                                }}
                            >
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            {!getLoading ? (
                <Paper
                    elevation={0}
                    sx={{
                        m: 2,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        background: "#fff",
                    }}
                >
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
                            values,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit}>

                                {/* GRID */}
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(2, minmax(0,1fr))"
                                    gap={2.5}
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >

                                    {/* DATE BOX */}
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="Date"
                                        label={
                                            <>
                                                Date <span style={{ color: "red" }}>*</span>
                                            </>
                                        }
                                        variant="outlined"
                                        focused
                                        value={values.Date}
                                        onBlur={handleBlur}
                                        onChange={(e) => handleDateChange(e, handleChange)}
                                        error={!!touched.Date && !!errors.Date}
                                        helperText={touched.Date && errors.Date}
                                    />


                                    {/* GIVER BOX */}

                                    <SettlementSingleSelect
                                        name="GiverID"
                                        label={
                                            <>
                                                Giver <span style={{ color: "red" }}>*</span>
                                            </>
                                        }
                                        value={values.GiverID}
                                        onChange={(newValue) =>
                                            setFieldValue("GiverID", newValue)
                                        }
                                        error={!!touched.GiverID && !!errors.GiverID}
                                        helperText={touched.GiverID && errors.GiverID}
                                        url={`${listViewurl}?data=${JSON.stringify({
                                            Query: {
                                                AccessID: "2179",
                                                ScreenName: "SETTLEMENTGIVER",
                                                VerticalLicense: Subscriptionlastthree,
                                                Filter: `CompanyID=${CompanyID}`,
                                                Any: "",
                                            },
                                        })}`}
                                    />


                                    {/* RECEIVER BOX */}
                                    <SettlementSingleSelect
                                        name="ReceiverID"
                                        label={
                                            <>
                                                Receiver <span style={{ color: "red" }}>*</span>
                                            </>
                                        }
                                        value={values.ReceiverID}
                                        onChange={(newValue) =>
                                            setFieldValue("ReceiverID", newValue)
                                        }
                                        error={!!touched.ReceiverID && !!errors.ReceiverID}
                                        helperText={touched.ReceiverID && errors.ReceiverID}
                                        url={`${listViewurl}?data=${JSON.stringify({
                                            Query: {
                                                AccessID: "2178",
                                                ScreenName: "SETTLEMENTRECEIVER",
                                                VerticalLicense: Subscriptionlastthree,
                                                Filter: `CompanyID=${CompanyID}`,
                                                Any: "",
                                            },
                                        })}`}
                                    />


                                    {/* PAYMENT MODE BOX */}
                                    <TextField
                                        select
                                        fullWidth
                                        name="paymentmode"
                                        label={
                                            <>
                                                Mode Of Payment <span style={{ color: "red" }}>*</span>
                                            </>
                                        }
                                        value={values.paymentmode}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            sessionStorage.setItem("paymentmode", e.target.value);
                                        }}
                                        error={!!touched.paymentmode && !!errors.paymentmode}
                                        helperText={touched.paymentmode && errors.paymentmode}
                                        variant="outlined"
                                        focused
                                    >
                                        <MenuItem value="COD">Cash On Delivery</MenuItem>
                                        <MenuItem value="UPI">UPI</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </TextField>

                                    {/* AMOUNT BOX */}
                                    <TextField
                                        fullWidth
                                        name="Amount"
                                        label={
                                            <>
                                                Amount <span style={{ color: "red" }}>*</span>
                                            </>
                                        }
                                        value={values.Amount}
                                        variant="outlined"
                                        focused
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*\.?\d*$/.test(val)) {
                                                setFieldValue("Amount", val);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const num = parseFloat(e.target.value);
                                            if (!isNaN(num)) {
                                                setFieldValue("Amount", num.toFixed(2));
                                            }
                                        }}
                                        error={!!touched.Amount && !!errors.Amount}
                                        helperText={touched.Amount && errors.Amount}
                                        InputProps={{
                                            inputProps: { style: { textAlign: "right" } },
                                        }}
                                    />

                                    {/* REMARKS BOX */}
                                    <TextField
                                        fullWidth
                                        name="Remarks"
                                        label="Remarks"
                                        value={values.Remarks}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.Remarks && !!errors.Remarks}
                                        helperText={touched.Remarks && errors.Remarks}
                                        variant="outlined"
                                        focused
                                    />

                                </Box>

                                {/* BUTTONS */}
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={2}
                                    mt={4}
                                >
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        loading={isLoading}
                                        sx={{
                                            bgcolor: "#0D9488",
                                            "&:hover": { bgcolor: "#0F766E" },
                                            borderRadius: 2,
                                            px: 4,
                                        }}
                                    >
                                        Save
                                    </LoadingButton>

                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(-1)}
                                        sx={{
                                            bgcolor: "#F97316",
                                            "&:hover": { bgcolor: "#EA580C" },
                                            borderRadius: 2,
                                            px: 4,
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

export default EditSettlements;
