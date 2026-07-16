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
import { breadcrumbStyles } from "../../../Theme";

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
  const LoginID = sessionStorage.getItem("loginrecordID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const location = useLocation();
  const state = location.state || {};
  const ViewStatus = state.ViewStatus;
  console.log("🚀 ~ EditOrder ~ ViewStatus:", ViewStatus)
  const DefaultProductDeliveryChargeGetData = useSelector(
    (state) => state.formApi.DefaultProductDeliveryChargeGetData
  );
  const PartyRecordID = state.PartyID;
  console.log("🚀 ~ EditOrderitem ~ PartyRecordID:", PartyRecordID);

  useEffect(() => {
    dispatch(DefaultProductDeliveryChargeGet({ PartyRecordID }));
  }, [location.key]);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split("T")[0];
  // Extract default API data safely
  const defaultDC = DefaultProductDeliveryChargeGetData?.DeliveryCharge || 0;
  const defaultPM =
    DefaultProductDeliveryChargeGetData?.DefaultPaymentMode || "";

  // For edit modes
  const dataDC = data?.DeliveryCharges || 0;
  const dataPM = data?.PaymentMode || "";

  // Decide correct delivery charge
  const deliveryCharges =
    mode === "A"
      ? defaultDC || 0 // For ADD
      : dataDC === 0
        ? defaultDC || 0 // For EDIT when data is 0
        : dataDC; // Otherwise use DATA

  // Decide correct payment mode
  const paymentMode =
    mode === "A"
      ? defaultPM || ""
      : dataPM === "" || dataPM === null
        ? defaultPM || ""
        : dataPM;
  const InitialValue = {
    orderno: data.Code,
    orderdate: mode == "A" ? currentDate : data.OrderDate,
    partyname: state.PartyName || "",
    // sortorder: data.SortOrder,
    // disable: data.Disable === "Y" ? true : false,
    //delivercharges: data.DeliveryCharges || 0,
    delivercharges: deliveryCharges,
    totalprice: data.TotalPrice || 0,
    tentativedeliverdate: data.TentativeDeliveryDate,
    deliveredby: data.DeliveryBy,
    deliver:
      mode == "A" ? "Yes" : data.DeliveryYesorNo === "Yes" ? "Yes" : "No",
    // OrderType:
    //   mode === "A"
    //     ? ""
    //     : data.OrderType || "",
    OrderType:
      mode === "A"
        ? params.OrderType || "" // 👈 take from URL
        : data.OrderType || "",

    paid: mode == "A" ? "Yes" : data.PaidYesorNo === "Yes" ? "Yes" : "No",
    // processdate: data.ProcessDate,
    // paiddate: data.PaidDate,
    // deliverydate: data.DeliveryDate,
    deliverydate: data.DeliveryDate
      ? data.DeliveryDate.split(" ")[0] // keeps YYYY-MM-DD
      : "",
    processdate: data.ProcessDate
      ? data.ProcessDate.split(" ")[0] // keeps YYYY-MM-DD
      : "",
    paiddate: data.PaidDate
      ? data.PaidDate.split(" ")[0] // keeps YYYY-MM-DD
      : "",
    paidamount: data.PaidAmount || 0,
    // Tobepaid: 0,
    status:
      // mode === "A" ? "Ordercreated" :
      data.ORStatus === "Created"
        ? "Created"
        : data.ORStatus === "Process"
          ? "Process"
          : data.ORStatus === "Ready To Deliver"
            ? "Ready To Deliver"
            : data.ORStatus === "Picked"
              ? "Picked"
              : data.ORStatus === "Delivered"
                ? "Delivered"
                : data.ORStatus === "Yet To Deliver"
                  ? "Yet To Deliver"
                  : data.ORStatus === "Adjust From Advance"
                    ? "Adjust From Advance"
                    : data.ORStatus === "Paid"
                      ? "Paid"
                      : // : ""
                      "",
    // status: mode == "A" ? "Ordercreated": data.Status,
    paymentmode: paymentMode,
    receivername: data.ReceiverName,
    mobilenumber: data.ReceiverMobileNumber,
    DeliveryComments: data.DeliveryComments,
    PaidComments: data.PaidComments,
    PartyBalance: data.PartyBalance,
    PurchaseCheckbox: data.PurchaseCheckbox === "Y" ? true : false,
    // paid: "Yes",
    // deliverby: "Yes"
  };

  const Fnsave = async (values, del, override = {}) => {
    // let action = mode === "A" ? "insert" : "update";
    const partyBalance = Number(values.PartyBalance || 0);
    const paidAmount = Number(values.paidamount || 0);
    const status = override.ORStatus ?? values.status;
    const finalPaidAmount =
      status === "Adjust From Advance" ? 0 : values.paidamount || 0;

    if (status === "Adjust From Advance") {
      const advanceAmount = Math.abs(partyBalance);

      if (paidAmount > advanceAmount) {
        toast.error("Paid amount cannot be greater than available advance.");
        return;
      }
    }

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
      ...(mode === "E" && { Code: values.orderno || "" }),
      //   PartyRecordID: state.PartyID,
      //   EmployeeRecordID: state.PartyID,
      //LeaderID: params.filtertype || 0,
      LeaderID:
        params.Type === "Party"
          ? data.LeaderRecordID || 0
          : params.filtertype || 0,

      PartyName: values.partyname || "",
      OrderDate: values.orderdate || "",
      DeliveryCharges: values.delivercharges || 0,
      TotalPrice: values.totalprice || 0,
      TentativeDeliveryDate: values.tentativedeliverdate || "",
      DeliveryBy: values.deliveredby || "",
      DeliveryYesorNo: mode === "A" ? "N" : values.deliver || "N",
      PaidYesorNo: mode === "A" ? "No" : values.paid || "No",
      ProcessDate: values.processdate || "",
      PaidDate: values.paiddate || "",
      DeliveryDate: values.deliverydate || "",
      // PaidAmount: values.paidamount || 0,
      PaidAmount: finalPaidAmount || 0,
      // PaidAmount: values.Tobepaid || 0,
      // ORStatus: values.status || "",
      PaymentMode: values.paymentmode || "",
      ReceiverName: values.receivername || "",
      ReceiverMobileNumber: values.mobilenumber || "",
      DeliveryComments: values.DeliveryComments || "",
      PaidComments: values.PaidComments || "",
      PartyRecordID: state.PartyID || 0,
      EmployeeRecordID: LoginID,
      // SortOrder: values.sortorder,
      // Disable: isCheck,
      //   Finyear,
      CompanyID,
      // OrderType: values.OrderType || "",
      // ORStatus: override.ORStatus ?? values.status ?? "",
      ORStatus: override.ORStatus ? override.ORStatus : values.status ? values.status : "Created", //CHANGED -- AS ON 26 MARCH IT WAS "" FOR EVERY INSERT
      OrderType: override.OrderType ?? values.OrderType ?? "",
      PurchaseCheckbox: values.PurchaseCheckbox === true ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      if (mode === "A") {
        const OrderHeaderId = response.payload.OrderHeaderID;
        const OrderHeaderCode = response.payload.OrderHeaderCode;
        navigate(
          `/Apps/Secondarylistview/${params.accessID}/Order/${params.filtertype}/${params.Type}/${params.OrderType}/TR311/${OrderHeaderId}/EditOrderitem/-1/A`,
          { state: { ...state, Code: OrderHeaderCode } }
        );
      } else if (mode === "E" && params.OrderType === "O") {
        //toast.success(response.payload.Msg);
        navigate(-1);
      } else if (mode === "E" && params.OrderType === "Q") {
        //toast.success(response.payload.Msg);
        navigate(
          `/Apps/Secondarylistview/${params.accessID}/Order/${params.filtertype}/${params.Type}/O`,
          { state: { ...state } }
        );
      }
      return;
    } else {
      toast.error(response.payload.Msg);

      dispatch(getFetchData({ accessID, get: "get", recID }));
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

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "6px",
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#bfc4cc" },
      "&.Mui-focused fieldset": { borderColor: "#d1d5db", borderWidth: "1px" },
    },
    "& .MuiInputLabel-root": { color: "#6b7280" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
  };


  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}

      {/* BREADCRUMBS */}
      <Paper
        elevation={0}
        sx={{
          mx: 2,
          mt: 2,
          mb: 1,
          p: 1,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          bgcolor: "#fff",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* LEFT */}
          <Box display="flex" alignItems="center" gap={2}>
            {broken && !rtl && (
              <IconButton
                onClick={() => toggleSidebar()}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}

            <Box>
              {/* Page Title */}
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#111827",
                  px: 1,
                  py: 0.2,
                }}
              >
                {params.OrderType === "O"
                  ? mode === "A"
                    ? "Add Order"
                    : "Edit Order"
                  : mode === "A"
                    ? "Add Quotation"
                    : "Edit Quotation"}
              </Typography>

              {/* Breadcrumb */}
              <Breadcrumbs
                maxItems={4}
                separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                sx={breadcrumbStyles.separator}
              >
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    navigate("/Apps/TR321/Party");
                  }}
                >
                  {`Party (${state.PartyName || ""})`}
                </Typography>

                {params.Type === "Leader" ? (
                  <Typography
                    sx={breadcrumbStyles.item}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    {`Lead (${state.LeadTitle || ""})`}
                  </Typography>
                ) : null}

                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {params.OrderType === "O"
                    ? mode === "E"
                      ? `Order (${state.Code || ""})`
                      : "Order (New)"
                    : mode === "E"
                      ? `Quotation (${state.Code || ""})`
                      : "Quotation (New)"}
                </Typography>

                <Typography sx={breadcrumbStyles.active}>
                  {params.OrderType === "O"
                    ? mode === "A"
                      ? "Add Order"
                      : "Edit Order"
                    : mode === "A"
                      ? "Add Quotation"
                      : "Edit Quotation"}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>

          {/* RIGHT */}
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton
                onClick={() => fnLogOut("Close")}
                sx={{
                  color: "#DC2626",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
                }}
              >
                <ResetTvIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                onClick={() => fnLogOut("Logout")}
                sx={{
                  color: "#DC2626",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
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
            backgroundColor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 3,
            p: 3,
            margin: "10px",
          }}
        >
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
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
              const netPayables =
                Number(values.delivercharges || 0) + Number(values.totalprice || 0);

              return (
                <form onSubmit={handleSubmit}>
                  {/* ----- CARD HEADER ----- */}
                  <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      🧾
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#0D94885">
                        {params.OrderType === "O" ? "Order" : "Quotation"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Order details and delivery information
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="grid"
                    // gap={formGap}
                    gap='20px'
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
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
                      label={params.OrderType === "O" ? "Order Date" : "Quotation Date"}
                      variant="outlined"
                      size="small"
                      inputFormat="YYYY-MM-DD"
                      value={values.orderdate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.orderdate && !!errors.orderdate}
                      helperText={touched.orderdate && errors.orderdate}
                      sx={textFieldSx}
                    />
                    {CompanyAutoCode == "Y" ? (
                      <TextField
                        name="orderno"
                        type="text"
                        id="orderno"
                        label="Order No"
                        placeholder="Auto"
                        variant="outlined"
                        size="small"
                        value={values.orderno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.orderno && !!errors.orderno}
                        helperText={touched.orderno && errors.orderno}
                        InputProps={{ readOnly: true }}
                        sx={textFieldSx}
                      />
                    ) : (
                      <TextField
                        name="orderno"
                        type="text"
                        id="orderno"
                        label={
                          <>
                            Order No
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.orderno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.orderno && !!errors.orderno}
                        helperText={touched.orderno && errors.orderno}
                        sx={textFieldSx}
                        autoFocus
                      />
                    )}
                    <TextField
                      name="partyname"
                      type="text"
                      id="partyname"
                      label="Party Name"
                      variant="outlined"
                      size="small"
                      value={values.partyname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.partyname && !!errors.partyname}
                      helperText={touched.partyname && errors.partyname}
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                        },
                      }}
                      sx={textFieldSx}
                    />

                    <TextField
                      select
                      label="Order Type"
                      id="OrderType"
                      name="OrderType"
                      value={values.OrderType}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        sessionStorage.setItem("OrderType", e.target.value);
                      }}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={textFieldSx}
                    >
                      <MenuItem value="O">Order</MenuItem>
                      <MenuItem value="Q">Quotation</MenuItem>
                    </TextField>

                    {mode === "A" ? (
                      <>
                        <TextField
                          name="tentativedeliverdate"
                          type="date"
                          id="tentativedeliverdate"
                          label={
                            params.OrderType === "O"
                              ? "Tentative Deliver Date"
                              : "Targeted Order Date"
                          }
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.tentativedeliverdate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.tentativedeliverdate &&
                            !!errors.tentativedeliverdate
                          }
                          helperText={
                            touched.tentativedeliverdate && errors.tentativedeliverdate
                          }
                          sx={textFieldSx}
                        />

                        <Box sx={{ marginTop: "20px" }}>
                          <Field
                            type="checkbox"
                            name="PurchaseCheckbox"
                            id="PurchaseCheckbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Purchase"
                          />
                          <FormLabel focused={false}>Purchase Inward</FormLabel>
                        </Box>
                      </>
                    ) : (
                      false
                    )}

                    {mode !== "A" && params.OrderType === "O" && (
                      <>
                        <TextField
                          name="delivercharges"
                          type="number"
                          id="delivercharges"
                          label="Deliver Charges"
                          variant="outlined"
                          size="small"
                          value={values.delivercharges}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*\.?\d*$/.test(val)) {
                              setFieldValue("delivercharges", val);
                            }
                          }}
                          onBlur={(e) => {
                            let val = e.target.value;
                            if (val === "" || val === ".") {
                              setFieldValue("delivercharges", "0.00");
                              return;
                            }
                            const num = parseFloat(val);
                            if (!isNaN(num)) {
                              setFieldValue("delivercharges", num.toFixed(2));
                            }
                          }}
                          error={!!touched.delivercharges && !!errors.delivercharges}
                          helperText={touched.delivercharges && errors.delivercharges}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              readOnly: ViewStatus === "Paid" ? true : false,
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="totalprice"
                          type="number"
                          id="totalprice"
                          label="Total Price"
                          variant="outlined"
                          size="small"
                          value={values.totalprice}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.totalprice && !!errors.totalprice}
                          helperText={touched.totalprice && errors.totalprice}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              readOnly: true,
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          label="Net Payables"
                          variant="outlined"
                          size="small"
                          value={(
                            Number(values.delivercharges || 0) +
                            Number(values.totalprice || 0)
                          ).toFixed(2)}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="tentativedeliverdate"
                          type="date"
                          id="tentativedeliverdate"
                          label={
                            params.OrderType === "O"
                              ? "Tentative Deliver Date"
                              : "Targeted Order Date"
                          }
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.tentativedeliverdate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.tentativedeliverdate &&
                            !!errors.tentativedeliverdate
                          }
                          helperText={
                            touched.tentativedeliverdate && errors.tentativedeliverdate
                          }
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />

                        <TextField
                          select
                          label="Delivered"
                          id="deliver"
                          name="deliver"
                          value={values.deliver}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            sessionStorage.setItem("deliver", e.target.value);
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
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
                          onChange={(e) => {
                            handleChange(e);
                            sessionStorage.setItem("paid", e.target.value);
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={textFieldSx}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </TextField>
                        <TextField
                          name="processdate"
                          type="date"
                          id="processdate"
                          label="Process Date"
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.processdate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.processdate && !!errors.processdate}
                          helperText={touched.processdate && errors.processdate}
                          InputProps={{
                            inputProps: {
                              readOnly: true,
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="paiddate"
                          type="date"
                          id="paiddate"
                          label="Paid Date"
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.paiddate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.paiddate && !!errors.paiddate}
                          helperText={touched.paiddate && errors.paiddate}
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="deliverydate"
                          type="date"
                          id="deliverydate"
                          label="Delivery Date"
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.deliverydate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.deliverydate && !!errors.deliverydate}
                          helperText={touched.deliverydate && errors.deliverydate}
                          InputProps={{
                            inputProps: {
                              readOnly: true,
                            },
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="deliveredby"
                          type="text"
                          id="deliveredby"
                          label="Delivered By"
                          variant="outlined"
                          size="small"
                          value={values.deliveredby}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.deliveredby && !!errors.deliveredby}
                          helperText={touched.deliveredby && errors.deliveredby}
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="PartyBalance"
                          type="text"
                          id="PartyBalance"
                          label="Balance Amount"
                          variant="outlined"
                          size="small"
                          value={Math.abs(Number(values.PartyBalance || 0)).toFixed(2)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.PartyBalance && !!errors.PartyBalance}
                          helperText={touched.PartyBalance && errors.PartyBalance}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: {
                                textAlign: "right",
                                color:
                                  Number(values.PartyBalance) < 0
                                    ? "#d32f2f"
                                    : "#2e7d32",
                                fontWeight: 600,
                              },
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="paidamount"
                          type="number"
                          id="paidamount"
                          label="Paid Amount"
                          variant="outlined"
                          size="small"
                          value={values.paidamount}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*\.?\d*$/.test(val)) {
                              setFieldValue("paidamount", val);
                            }
                          }}
                          onBlur={(e) => {
                            let val = e.target.value;
                            if (val === "" || val === ".") {
                              setFieldValue("paidamount", "0.00");
                              return;
                            }
                            const num = parseFloat(val);
                            if (!isNaN(num)) {
                              setFieldValue("paidamount", num.toFixed(2));
                            }
                          }}
                          error={!!touched.paidamount && !!errors.paidamount}
                          helperText={touched.paidamount && errors.paidamount}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          select
                          label="Status"
                          id="status"
                          name="status"
                          value={values.status}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedStatus = e.target.value;
                            handleChange(e);
                            sessionStorage.setItem("status", selectedStatus);
                            if (selectedStatus === "Adjust From Advance") {
                              setFieldValue("paidamount", 0);
                            }
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        >
                          <MenuItem value="Created">Created</MenuItem>
                          <MenuItem value="Process">Confirm</MenuItem>
                          <MenuItem value="Ready To Deliver">Ready for Delivery</MenuItem>
                          <MenuItem value="Picked">Picked</MenuItem>
                          <MenuItem value="Yet To Deliver">Scheduled</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          {ViewStatus === "Paid" && (
                            <MenuItem value="Paid">Paid</MenuItem>
                          )}
                        </TextField>

                        <TextField
                          select
                          label="Payment Mode"
                          id="paymentmode"
                          name="paymentmode"
                          value={values.paymentmode}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            sessionStorage.setItem("paymentmode", e.target.value);
                          }}
                          error={!!touched.paymentmode && !!errors.paymentmode}
                          helperText={touched.paymentmode && errors.paymentmode}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={textFieldSx}
                        >
                          <MenuItem value="COD">Cash On Delivery</MenuItem>
                          <MenuItem value="UPI">UPI</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </TextField>

                        <TextField
                          name="receivername"
                          type="text"
                          id="receivername"
                          label="Receiver Name"
                          variant="outlined"
                          size="small"
                          value={values.receivername}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.receivername && !!errors.receivername}
                          helperText={touched.receivername && errors.receivername}
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />

                        <TextField
                          name="mobilenumber"
                          id="mobilenumber"
                          label="Receiver Mobile Number"
                          variant="outlined"
                          size="small"
                          value={values.mobilenumber}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleChange(e);
                            }
                          }}
                          error={!!touched.mobilenumber && !!errors.mobilenumber}
                          helperText={touched.mobilenumber && errors.mobilenumber}
                          inputProps={{ maxLength: 10 }}
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="DeliveryComments"
                          type="text"
                          id="DeliveryComments"
                          label="Delivery Comments"
                          variant="outlined"
                          size="small"
                          value={values.DeliveryComments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.DeliveryComments && !!errors.DeliveryComments
                          }
                          helperText={
                            touched.DeliveryComments && errors.DeliveryComments
                          }
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="PaidComments"
                          type="text"
                          id="PaidComments"
                          label="Paid Comments"
                          variant="outlined"
                          size="small"
                          value={values.PaidComments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.PaidComments && !!errors.PaidComments}
                          helperText={touched.PaidComments && errors.PaidComments}
                          InputProps={{
                            readOnly: ViewStatus === "Paid" ? true : false,
                          }}
                          sx={textFieldSx}
                        />
                        <Box>
                          <Field
                            type="checkbox"
                            name="PurchaseCheckbox"
                            id="PurchaseCheckbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Purchase"
                            disabled={ViewStatus === "Paid" ? true : false}
                          />
                          <FormLabel focused={false}>Purchase Inward</FormLabel>
                        </Box>
                      </>
                    )}

                    {mode !== "A" && params.OrderType === "Q" && (
                      <>
                        <TextField
                          name="delivercharges"
                          type="number"
                          id="delivercharges"
                          label="Deliver Charges"
                          variant="outlined"
                          size="small"
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
                          sx={textFieldSx}
                        />
                        <TextField
                          name="totalprice"
                          type="number"
                          id="totalprice"
                          label="Total Price"
                          variant="outlined"
                          size="small"
                          value={values.totalprice}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.totalprice && !!errors.totalprice}
                          helperText={touched.totalprice && errors.totalprice}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              readOnly: true,
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          label="Net Payables"
                          variant="outlined"
                          size="small"
                          value={(
                            Number(values.delivercharges || 0) +
                            Number(values.totalprice || 0)
                          ).toFixed(2)}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          sx={textFieldSx}
                        />
                        <TextField
                          name="tentativedeliverdate"
                          type="date"
                          id="tentativedeliverdate"
                          label="Tentative Deliver Date"
                          variant="outlined"
                          size="small"
                          inputFormat="YYYY-MM-DD"
                          value={values.tentativedeliverdate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.tentativedeliverdate &&
                            !!errors.tentativedeliverdate
                          }
                          helperText={
                            touched.tentativedeliverdate && errors.tentativedeliverdate
                          }
                          sx={textFieldSx}
                        />
                        <Box>
                          <Field
                            type="checkbox"
                            name="PurchaseCheckbox"
                            id="PurchaseCheckbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Purchase"
                          />
                          <FormLabel focused={false}>Purchase Inward</FormLabel>
                        </Box>
                      </>
                    )}
                  </Box>

                  <Box display="flex" justifyContent="end" gap={2} mt={4}>
                    {YearFlag == "true" && (mode === "A" || params.OrderType === "O") ? (
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        disabled={ViewStatus === "Paid" ? true : false}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 4,
                          bgcolor: "#0D9488",
                          "&:hover": { bgcolor: "#0F766E" },
                        }}
                      >
                        Save
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        disabled={true}
                        sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                      >
                        Save
                      </Button>
                    )}
                    {YearFlag === "true" &&
                      mode === "E" &&
                      params.OrderType === "Q" && (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() =>
                            Fnsave(values, null, {
                              OrderType: "O",
                              ORStatus: "Process",
                            })
                          }
                          sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                        >
                          Convert To Order
                        </Button>
                      )}
                    {YearFlag == "true" && mode === "E" ? (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          Fnsave(values, "harddelete");
                        }}
                        disabled={ViewStatus === "Paid" ? true : false}
                        sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        disabled={true}
                        sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": { bgcolor: "#EA580C" },
                      }}
                    >
                      Back
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

export default EditOrder;
