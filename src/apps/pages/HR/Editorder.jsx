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
    Breadcrumbs
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
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import CryptoJS from "crypto-js";
const EditOrder = () => {
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
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const location = useLocation();
    const state = location.state || {};
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split('T')[0];

    const InitialValue = {
        orderno: data.Code,
        orderdate: mode == "A" ? currentDate : data.OrderDate,
        partyname: data.PartyName,
        // sortorder: data.SortOrder,
        // disable: data.Disable === "Y" ? true : false,
        delivercharges: data.DeliveryCharges || 0,
        totalprice: data.TotalPrice || 0,
        tentativedeliverdate: data.TentativeDeliveryDate,
        deliverby: mode == "A" ? "Yes" : data.DeliveryYesorNo === "Yes" ? "Yes" : "No",
        paid: mode == "A" ? "Yes" : data.PaidYesorNo === "Yes" ? "Yes" : "No",
        processdate: data.ProcessDate,
        paiddate: data.PaidDate,
        deliverydate: data.DeliveryDate,
        paidamount: data.PaidAmount || 0,
        Status:
            mode === "A" ? "Ordercreated" : data.ORStatus === "Ordercreated"
                ? "Ordercreated"
                : data.ORStatus === "ProcessedReadyfordelivery"
                    ? "ProcessedReadyfordelivery"
                    : data.ORStatus === "Picked"
                        ? "Picked"
                        : data.ORStatus === "Delivered"
                            ? "Delivered"
                            : data.ORStatus === "Paid"
                                ? "Paid"
                                // : ""
                                : "",
        // status: mode == "A" ? "Ordercreated": data.Status,
        paymentmode: data.PaymentMode,
        receivername: data.ReceiverName,
        mobilenumber: data.ReceiverMobileNumber,
        // paid: "Yes",
        // deliverby: "Yes"
    };

    const Fnsave = async (values, del) => {
        // let action = mode === "A" ? "insert" : "update";
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

        const idata = {
            RecordID: recID,
            Code: values.code,
            PartyName: values.partyname,
            OrderDate: values.orderdate,
            DeliveryCharges: values.delivercharges,
            TotalPrice: values.totalprice,
            TentativeDeliveryDate: values.tentativedeliverdate,
            DeliveryYesorNo: values.deliverby,
            PaidYesorNo: values.paid,
            ProcessDate: values.processdate,
            PaidDate: values.paiddate,
            DeliveryDate: values.deliverydate,
            PaidAmount: values.paidamount,
            ORStatus: values.Status,
            PaymentMode: values.paymentmode,
            ReceiverName: values.receivername,
            ReceiverMobileNumber: values.mobilenumber,
            // SortOrder: values.sortorder,
            // Disable: isCheck,
            //   Finyear,
            CompanyID,
        };


        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);

        } else {
            toast.error(response.payload.Msg);
        }
    };

    // const handleorderlistview = (recordID, partyID, leadTitle,PartyName,LEStatus) => {
    //         navigate(`/Apps/Secondarylistview/TR306/Order/${recordID}/A`
    //             // /Apps/Secondarylistview/TR304/Leader/100/EditLeader/-1/A/S
    //             // /Secondarylistview/:accessID/:screenName/:filtertype/EditOrder/:id/:Mode/:Type
    //             // /Apps/Secondarylistview/TR304/Marketing%20Activity/5/T/EditMarketing%20Activity/8/V
    //             , {
    //             state: {
    //                 PartyID: partyID,
    //                 LeadTitle: leadTitle,
    //                 PartyName: PartyName,
    //                 LEStatus: LEStatus 
    //             },
    //         });
    //     };
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
                    navigate("/Apps/TR232/Role");
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
                                    navigate("/Apps/TR243/Party");
                                }}

                            >
                                {`Party(${state.PartyName || ""})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate(-1);
                                }}

                            >
                                {`Lead(${state.LeadTitle || ""})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}

                            >
                                Order
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
                        //  validationSchema={ DesignationSchema}
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
                                        name="orderdate"
                                        type="date"
                                        id="orderdate"
                                        label="Order Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.orderdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.orderdate && !!errors.orderdate}
                                        helperText={touched.orderdate && errors.orderdate}
                                    // required
                                    //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                                    />
                                    {CompanyAutoCode == "Y" ? (
                                        <TextField
                                            name="orderno"
                                            type="text"
                                            id="orderno"
                                            label="Order No"
                                            placeholder="Auto"
                                            variant="standard"
                                            focused
                                            // required
                                            value={values.orderno}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.orderno && !!errors.orderno}
                                            helperText={touched.orderno && errors.orderno}
                                            sx={{

                                                backgroundColor: "#ffffff",
                                                "& .MuiFilledInput-root": {
                                                    backgroundColor: "#f5f5f5 ",
                                                }
                                            }}
                                            InputProps={{ readOnly: true }}
                                        // autoFocus
                                        />
                                    ) : (
                                        <TextField
                                            name="orderno"
                                            type="text"
                                            id="orderno"
                                            label={
                                                <>
                                                    Order No<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                                </>
                                            }
                                            variant="standard"
                                            focused
                                            // required
                                            value={values.orderno}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.orderno && !!errors.orderno}
                                            helperText={touched.orderno && errors.orderno}
                                            sx={{

                                                backgroundColor: "#ffffff",
                                                "& .MuiFilledInput-root": {
                                                    backgroundColor: "#f5f5f5 ",
                                                }
                                            }}

                                            autoFocus
                                        />)}
                                    {/* <TextField
                                        name="orderno"
                                        type="text"
                                        id="orderno"
                                        label="Order No"
                                        placeholder="Auto"
                                        variant="standard"
                                        focused
                                        required
                                        value={values.orderno}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.orderno && !!errors.orderno}
                                        helperText={touched.orderno && errors.orderno}
                                        autoFocus
                                    /> */}
                                    <TextField
                                        name="partyname"
                                        type="text"
                                        id="partyname"
                                        label="Party Name"
                                        variant="standard"
                                        focused
                                        value={values.partyname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.partyname && !!errors.partyname}
                                        helperText={touched.partyname && errors.partyname}
                                        autoFocus
                                        disabled
                                    />
                                    {mode !== "A" && (
                                        <>
                                    <TextField
                                        name="delivercharges"
                                        type="number"
                                        id="delivercharges"
                                        label="Deliver Charges"
                                        variant="standard"
                                        focused
                                        value={values.delivercharges}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.delivercharges && !!errors.delivercharges}
                                        helperText={touched.delivercharges && errors.delivercharges}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="totalprice"
                                        type="number"
                                        id="totalprice"
                                        label="Total Price"
                                        variant="standard"
                                        focused
                                        value={values.totalprice}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.totalprice && !!errors.totalprice}
                                        helperText={touched.totalprice && errors.totalprice}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="tentativedeliverdate"
                                        type="date"
                                        id="tentativedeliverdate"
                                        label="Tentative Deliver Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.tentativedeliverdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.tentativedeliverdate && !!errors.tentativedeliverdate}
                                        helperText={touched.tentativedeliverdate && errors.tentativedeliverdate}
                                    />
                                    <TextField
                                        select
                                        label="Deliver By"
                                        id="deliverby"
                                        name="deliverby"
                                        value={values.deliverby}
                                        onBlur={handleBlur}
                                        // onChange={handleChange}
                                        // disabled={mode === "V"}
                                        // required
                                        onChange={(e) => {
                                            handleChange(e); // update form state (Formik)
                                            sessionStorage.setItem("deliverby", e.target.value); // save to sessionStorage
                                        }}
                                        focused
                                        variant="standard"
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </TextField>
                                    <TextField
                                        select
                                        label="Paid"
                                        id="paid"
                                        name="paid"
                                        value={values.paid}
                                        onBlur={handleBlur}
                                        // onChange={handleChange}
                                        // disabled={mode === "V"}
                                        // required
                                        onChange={(e) => {
                                            handleChange(e); // update form state (Formik)
                                            sessionStorage.setItem("paid", e.target.value); // save to sessionStorage
                                        }}
                                        focused
                                        variant="standard"
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </TextField>
                                    <TextField
                                        name="processdate"
                                        type="date"
                                        id="processdate"
                                        label="Process Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.processdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.processdate && !!errors.processdate}
                                        helperText={touched.processdate && errors.processdate}
                                    />
                                    <TextField
                                        name="paiddate"
                                        type="date"
                                        id="paiddate"
                                        label="Paid Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.paiddate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.paiddate && !!errors.paiddate}
                                        helperText={touched.paiddate && errors.paiddate}
                                    />
                                    <TextField
                                        name="deliverydate"
                                        type="date"
                                        id="deliverydate"
                                        label="Delivery Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.deliverydate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.deliverydate && !!errors.deliverydate}
                                        helperText={touched.deliverydate && errors.deliverydate}
                                    />
                                    <TextField
                                        name="paidamount"
                                        type="number"
                                        id="paidamount"
                                        label="Paid Amount"
                                        variant="standard"
                                        focused
                                        value={values.paidamount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.paidamount && !!errors.paidamount}
                                        helperText={touched.paidamount && errors.paidamount}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        select
                                        label="Status"
                                        id="status"
                                        name="status"
                                        value={values.status}
                                        onBlur={handleBlur}
                                        // onChange={handleChange}
                                        disabled={mode === "V"}
                                        // required
                                        onChange={(e) => {
                                            handleChange(e); // update form state (Formik)
                                            sessionStorage.setItem("status", e.target.value); // save to sessionStorage
                                        }}
                                        focused
                                        variant="standard"
                                    >
                                        <MenuItem value="Ordercreated">Order Created</MenuItem>
                                        <MenuItem value="ProcessedReadyfordelivery">Processed-Ready for Delivery</MenuItem>
                                        <MenuItem value="Picked">Picked</MenuItem>
                                        <MenuItem value="Delivered">Delivered</MenuItem>
                                        <MenuItem value="Paid">Paid</MenuItem>

                                    </TextField>
                                    <TextField
                                        name="paymentmode"
                                        type="text"
                                        id="paymentmode"
                                        label="Payment Mode"
                                        variant="standard"
                                        focused
                                        value={values.paymentmode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.paymentmode && !!errors.paymentmode}
                                        helperText={touched.paymentmode && errors.paymentmode}
                                        autoFocus
                                    // disabled
                                    />
                                    <TextField
                                        name="receivername"
                                        type="text"
                                        id="receivername"
                                        label="Receiver Name"
                                        variant="standard"
                                        focused
                                        value={values.receivername}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.receivername && !!errors.receivername}
                                        helperText={touched.receivername && errors.receivername}
                                        autoFocus
                                    // disabled
                                    />
                                    <TextField
                                        name="mobilenumber"
                                        id="mobilenumber"
                                        label="Receiver" Mobile Number
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
                                        sx={{ backgroundColor: "#ffffff" }}
                                    />
                                    </>
)} 
                                    {/* <TextField
                                        name="sortorder"
                                        type="number"
                                        id="sortorder"
                                        label="Sort Order"
                                        variant="standard"
                                        focused
                                        value={values.sortorder}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.sortorder && !!errors.sortorder}
                                        helperText={touched.sortorder && errors.sortorder}
                                        // sx={{ background: "#fff6c3" }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 8);
                                        }}
                                    />
                                    <Box>
                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="disable"
                                            id="disable"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Disable"
                                        />

                                        <FormLabel focused={false}>Disable</FormLabel>
                                    </Box> */}

                                </Box>
                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
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
                                        onClick={() => (navigate(-1))}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                                {/* <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <LoadingButton 
                    color="secondary" 
                    variant="contained" 
                    type="submit" 
                    loading={isLoading}
                >
                    Save
                </LoadingButton>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={() => {
                            Fnsave(values,  "harddelete");
                          }}
                >
                    Delete
                </Button>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={() => {
                          navigate("/Apps/TR133/Project");
                        }}
                >
                    Cancel
                </Button>
                </Box> */}

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

export default EditOrder;
