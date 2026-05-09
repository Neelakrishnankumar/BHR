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
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";

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

    // useEffect(() => {
    //     dispatch(getFetchData({ accessID, get: "get", recID }));
    // }, [location.key]);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                let schemaFields = {
                    paidamount: Yup.number()
                        .typeError(data.OHPayment.paidamount)
                        .required(data.OHPayment.paidamount),

                    paymentmode: Yup.string()
                        .typeError(data.OHPayment.paymentmode)
                        .required(data.OHPayment.paymentmode),
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
        GiverID: data.GiverID || 0,
        ReceiverID: data.ReceiverID || 0,
        Date: data.Date || "",
        paymentmode: data.paymentmode || "",
        Remarks: data.Remarks || "",
        Amount: data.Amount || 0
    };


    const Fnsave = async (values, del, override = {}) => {

        const idata = {
            PaymentMethod: values.paymentmode || "",
            ReceiverName: values.receivername || "",
            ReceiverMobile: values.mobilenumber || "",
            OrderHeaderID: recID,
            EmpID: LoginID,
            DeliveryComments: values.DeliveryComments || "",
            PaidComments: values.PaidComments || "",
            NextOrdDate: values.NextOrdDate || "",
            // ToBePaid: toBePaid || 0,
            PaidAmount: values.paidamount || 0,
            Rating: values.Rating || 0,
            Comments: values.RatingComments || "",
            AmountType: "P",
        };

        const response = await dispatch(OHPaymentUpdateController(idata));
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
            {getLoading ? <LinearProgress /> : false}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        {broken && !rtl && (
                            <IconButton onClick={() => toggleSidebar()}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                        <Breadcrumbs
                            maxItems={2}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                        >
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate("/Apps/TR380/Settlements");
                                }}
                            >
                                List Of Settlement
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                {mode === "E"
                                    ? `Settlement (${state.Code || ""} )`
                                    : `Settlement(New)` || ""}
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
                            setFieldValue,
                        }) => {

                            return (
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
                                            name="Date"
                                            type="date"
                                            id="Date"
                                            label="Date"
                                            variant="standard"
                                            focused
                                            inputFormat="YYYY-MM-DD"
                                            value={values.Date}
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            onChange={(e) => handleDateChange(e, handleChange)}
                                            error={!!touched.Date && !!errors.Date}
                                            helperText={touched.Date && errors.Date}
                                        // required
                                        //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                                        />
                                        <CheckinAutocomplete
                                            name="GiverID"
                                            label={
                                                <span>
                                                    Giver Name
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            variant="outlined"
                                            id="GiverID"
                                            value={values.GiverID}
                                            onChange={(newValue) => {
                                                setFieldValue("GiverID", {
                                                    RecordID: newValue.RecordID,
                                                    Code: newValue.Code,
                                                    Name: newValue.Name,
                                                });
                                            }}
                                            error={
                                                !!touched.GiverID && !!errors.GiverID
                                            }
                                            helperText={
                                                touched.GiverID && errors.GiverID
                                            }
                                            url={`${listViewurl}?data=${JSON.stringify({
                                                Query: {
                                                    AccessID: "2048",
                                                    ScreenName: "GiverID",
                                                    VerticalLicense: Subscriptionlastthree,
                                                    Filter: `CompanyID=${CompanyID}`,
                                                    Any: "",
                                                },
                                            })}`}
                                        />
                                        <CheckinAutocomplete
                                            name="ReceiverID"
                                            label={
                                                <span>
                                                    Receiver Name
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            variant="outlined"
                                            id="ReceiverID"
                                            value={values.ReceiverID}
                                            onChange={(newValue) => {
                                                setFieldValue("ReceiverID", {
                                                    RecordID: newValue.RecordID,
                                                    Code: newValue.Code,
                                                    Name: newValue.Name,
                                                });
                                            }}
                                            error={
                                                !!touched.ReceiverID && !!errors.ReceiverID
                                            }
                                            helperText={
                                                touched.ReceiverID && errors.ReceiverID
                                            }
                                            url={`${listViewurl}?data=${JSON.stringify({
                                                Query: {
                                                    AccessID: "2048",
                                                    ScreenName: "ReceiverID",
                                                    VerticalLicense: Subscriptionlastthree,
                                                    Filter: `CompanyID=${CompanyID}`,
                                                    Any: "",
                                                },
                                            })}`}
                                        />
                                        <TextField
                                            select
                                            label="Payment Mode"
                                            id="paymentmode"
                                            name="paymentmode"
                                            value={values.paymentmode}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e); // update form state (Formik)
                                                sessionStorage.setItem(
                                                    "paymentmode",
                                                    e.target.value
                                                ); // save to sessionStorage
                                            }}
                                            error={!!touched.paymentmode && !!errors.paymentmode}
                                            helperText={touched.paymentmode && errors.paymentmode}
                                            focused
                                            variant="standard"

                                        >
                                            <MenuItem value="COD">Cash On Delivery</MenuItem>
                                            <MenuItem value="UPI">UPI</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </TextField>
                                        <TextField
                                            name="Amount"
                                            id="Amount"
                                            label="Amount"
                                            type="text"
                                            inputMode="decimal"
                                            variant="standard"
                                            focused
                                            value={values.Amount}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.Amount && !!errors.Amount}
                                            helperText={touched.Amount && errors.Amount}
                                            InputProps={{
                                                inputProps: {
                                                    style: { textAlign: "right" },
                                                },
                                            }}
                                            autoFocus
                                        />
                                        <TextField
                                            name="Remarks"
                                            type="text"
                                            id="Remarks"
                                            label="Remarks"
                                            variant="standard"
                                            focused
                                            value={values.Remarks}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.Remarks && !!errors.Remarks}
                                            helperText={touched.Remarks && errors.Remarks}
                                            autoFocus
                                        />

                                    </Box>
                                    <Box
                                        display="flex"
                                        justifyContent="end"
                                        padding={1}
                                        gap="20px"
                                    >

                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoading}
                                        >
                                            Save
                                        </LoadingButton>

                                        <Button
                                            color="warning"
                                            variant="contained"
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </form>
                            );
                        }}
                    </Formik>
                </Paper>
            ) : (
                false
            )}
        </React.Fragment>
    );
};

export default EditSettlements;
