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

// import CryptoJS from "crypto-js";
const EditOHPayment = () => {
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
  console.log("🚀 ~ EditOrder ~ ViewStatus:", ViewStatus);
  const DefaultProductDeliveryChargeGetData = useSelector(
    (state) => state.formApi.DefaultProductDeliveryChargeGetData,
  );
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
    dispatch(DefaultProductDeliveryChargeGet({ PartyRecordID }));
  }, [location.key]);

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


  useEffect(() => {
    const fetchDueList = async () => {
      try {
        setDueLoading(true);

        const response = await dispatch(
          PartyOrderPendingGet({
            CompanyID: CompanyID,
            PartyID: PartyRecordID,
            OrderID: recID,
          })
        );

        if (response.payload?.Data) {
          setDueRows(response.payload.Data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDueLoading(false);
      }
    };

    fetchDueList();
  }, [location.key]);


  // const fetchDueDetails = async () => {
  //   try {
  //     setDueLoading(true);

  //     const response = await dispatch(
  //       PartyOrderPendingGet({
  //         CompanyID: CompanyID,
  //         PartyID: PartyRecordID,
  //         OrderID: recID
  //       })
  //     );

  //     if (response.payload?.Data) {
  //       setDueRows(response.payload.Data);
  //       setShowDueGrid(true);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setDueLoading(false);
  //   }
  // };


  const Sprintcolumns = [
    { field: "SLNO", headerName: "SL#", width: 40 },
    {
      headerName: "Order Date",
      field: "OrderDate",
      // type: "date",
      width: "100",
      align: "center",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Order Number",
      field: "Code",
      width: "200",
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Total Amount",
      field: "TotalPrice",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Pending Amount",
      field: "PendingAmount",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Already Paid",
      field: "AlreadyPaid",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Status",
      field: "Status",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },

  ];

  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Pending Orders</Typography>
        </Box>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }
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
  // const InitialValue = {
  //   orderno: data.Code,
  //   orderdate: mode == "A" ? currentDate : data.OrderDate,
  //   partyname: state.PartyName || "",
  //   // sortorder: data.SortOrder,
  //   // disable: data.Disable === "Y" ? true : false,
  //   //delivercharges: data.DeliveryCharges || 0,
  //   delivercharges: deliveryCharges,
  //   totalprice: data.TotalPrice || 0,
  //   tentativedeliverdate: data.TentativeDeliveryDate,
  //   deliveredby: data.DeliveryBy,
  //   deliver:
  //     mode == "A" ? "Yes" : data.DeliveryYesorNo === "Yes" ? "Yes" : "No",
  //   // OrderType:
  //   //   mode === "A"
  //   //     ? ""
  //   //     : data.OrderType || "",
  //   OrderType:
  //     mode === "A"
  //       ? params.OrderType || "" // 👈 take from URL
  //       : data.OrderType || "",

  //   paid: mode == "A" ? "Yes" : data.PaidYesorNo === "Yes" ? "Yes" : "No",
  //   // processdate: data.ProcessDate,
  //   // paiddate: data.PaidDate,
  //   // deliverydate: data.DeliveryDate,
  //   deliverydate: data.DeliveryDate
  //     ? data.DeliveryDate.split(" ")[0] // keeps YYYY-MM-DD
  //     : "",
  //   processdate: data.ProcessDate
  //     ? data.ProcessDate.split(" ")[0] // keeps YYYY-MM-DD
  //     : "",
  //   paiddate: data.PaidDate
  //     ? data.PaidDate.split(" ")[0] // keeps YYYY-MM-DD
  //     : "",
  //   paidamount: data.PaidAmount || 0,
  //   // Tobepaid: 0,
  //   status:
  //     // mode === "A" ? "Ordercreated" :
  //     data.ORStatus === "Created"
  //       ? "Created"
  //       : data.ORStatus === "Process"
  //       ? "Process"
  //       : data.ORStatus === "Ready To Deliver"
  //       ? "Ready To Deliver"
  //       : data.ORStatus === "Picked"
  //       ? "Picked"
  //       : data.ORStatus === "Delivered"
  //       ? "Delivered"
  //       : data.ORStatus === "Yet To Deliver"
  //       ? "Yet To Deliver"
  //       : data.ORStatus === "Adjust From Advance"
  //       ? "Adjust From Advance"
  //       : data.ORStatus === "Paid"
  //       ? "Paid"
  //       : // : ""
  //         "",
  //   // status: mode == "A" ? "Ordercreated": data.Status,
  //   paymentmode: paymentMode,
  //   receivername: data.ReceiverName,
  //   mobilenumber: data.ReceiverMobileNumber,
  //   DeliveryComments: data.DeliveryComments,
  //   PaidComments: data.PaidComments,
  //   PartyBalance: data.PartyBalance,
  //   PurchaseCheckbox: data.PurchaseCheckbox === "Y" ? true : false,
  //   // paid: "Yes",
  //   // deliverby: "Yes"
  // };
  const InitialValue = {
    orderno: data.Code,
    orderdate: mode == "A" ? currentDate : data.OrderDate,
    NextOrdDate: currentDate || "",
    partyname: state.PartyName || "",

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
    // paidamount: data.PaidAmount || 0,
    paidamount: "",
    status: " ",
    paymentmode: "",
    receivername: "",
    mobilenumber: "",
    DeliveryComments: "",
    PaidComments: "",
    PartyBalance: data.PartyBalance,
    Rating: "",
    RatingComments: "",
    AlreadyPaidAmount: data.AlreadyPaidAmount || 0,
  };

  // const calculatePayable = (values) => {
  //   const netPayable =
  //     Number(values.delivercharges || 0) + Number(values.totalprice || 0);

  //   const Balance = Number(values.PartyBalance || 0);

  //   // let totalPayable = Number(values.AlreadyPaidAmount || 0);
  //   let AlreadyPaid = Number(values.AlreadyPaidAmount || 0);
  //   let totalPayable = 0;
  //   if (Balance > 0) {
  //     // advance available
  //     totalPayable = Math.max(netPayable - Balance, 0);
  //     if (AlreadyPaid !== 0) {
  //       totalPayable = totalPayable - AlreadyPaid;
  //     }
  //   } else {
  //     // previous due
  //     totalPayable = netPayable + Math.abs(Balance);
  //   }

  //   const paidAmount = Number(values.paidamount || 0);

  //   const toBePaid = netPayable - totalPayable;

  //   return {
  //     netPayable,
  //     totalPayable,
  //     toBePaid,
  //   };
  // };
  const calculatePayable = (values) => {
    const netPayable =
      Number(values.delivercharges || 0) + Number(values.totalprice || 0);

    const balance = Number(values.PartyBalance || 0);
    const alreadyPaid = Number(values.AlreadyPaidAmount || 0);
    const paidAmount = Number(values.paidamount || 0); //USER INPUT

    let totalPayable = Math.abs(Number(values.PartyBalance || 0));
    // let totalPayable = netPayable - balance;
    // Scenario 1: Advance available
    // if (balance > 0) {
    //   totalPayable = netPayable - balance;
    // }

    // Scenario 2: Previous due
    // else if (balance < 0) {
    //   totalPayable = netPayable + Math.abs(balance);
    // }

    // Scenario 3: No balance
    // else {
    //   totalPayable = Number(values.PartyBalance || 0);
    // }

    // Subtract already paid
    // totalPayable = totalPayable - alreadyPaid;

    // Prevent negative payable
    // if (totalPayable < 0) {
    //   totalPayable = 0;
    // }

    // Remaining to be paid after current payment
    let toBePaid = totalPayable - paidAmount;
    // if (balance > 0) {
    //   // toBePaid = Math.abs(totalPayable - paidAmount);
    //   toBePaid = totalPayable - paidAmount;
    // }
    // else {
    //   // toBePaid = Math.abs(totalPayable + paidAmount);
    //   // toBePaid = totalPayable + paidAmount;
    //   toBePaid = totalPayable - paidAmount;
    // }

    // const remainingBalance = Math.abs(balance - paidAmount);

    // const toBePaid =
    //   remainingBalance < 0 ? Math.abs(remainingBalance) : 0;

    return {
      netPayable,
      totalPayable,
      toBePaid,
      balance
    };
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
    const rating = Number(values.Rating || 0);

    // If rating <= 2, comments must be provided
    if (rating > 0 && rating <= 2 && !values.RatingComments?.trim()) {
      toast.error("Please provide comments for low rating.");
      return;
    }

    // const netPayable =
    //   Number(values.delivercharges || 0) + Number(values.totalprice || 0);
    const { netPayable, totalPayable, toBePaid } = calculatePayable(values);
    // if (totalPayable > values.paidamount) {
    //   toast.error("Please provide the remaining amount only.");
    //   return;
    // }
    const Balance = Number(values.PartyBalance || 0);


    if (Balance < 0 && values.paidamount === "0.00") {
      toast.error("Paid Amount cannot be 0.00");
      return;
    }
    // const totalBalance = netPayable + Balance;
    // const toBePaid = totalBalance - Number(values.paidamount || 0);
    const idata = {
      PaymentMethod: values.paymentmode || "",
      Amount: netPayable || 0,
      ReceiverName: values.receivername || "",
      ReceiverMobile: values.mobilenumber || "",
      OrderHeaderID: recID,
      EmpID: LoginID,
      DeliveryComments: values.DeliveryComments || "",
      PaidComments: values.PaidComments || "",
      NextOrdDate: values.NextOrdDate || "",
      Balance: Balance || 0,
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
                  // navigate("/Apps/TR243/Party");
                  navigate("/Apps/TR321/Party");
                }}
              >
                {`Party(${state.PartyName || ""})`}
              </Typography>

              {params.Type === "Leader" ? (
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
              ) : null}
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                {/* {mode === "E"
                  ? `Order (${state.Code || ""} )`
                  : `Order(New)` || ""} */}
                {params.OrderType === "O"
                  ? mode === "E"
                    ? `Order (${state.Code || ""} )`
                    : `Order(New)` || ""
                  : mode === "E"
                    ? `Quotation (${state.Code || ""} )`
                    : `Quotation(New)` || ""}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(-1);
              // }}
              >
                Payment
                {/* {params.OrderType === "O"
                  ? mode === "A"
                    ? "Add Order"
                    : "Edit Order"
                  : mode === "A"
                  ? "Add Quotation"
                  : "Edit Quotation"} */}
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


              // const netPayable =
              //   Number(values.delivercharges || 0) +
              //   Number(values.totalprice || 0);

              // const Balance = Number(values.PartyBalance || 0);

              // const totalBalance = netPayable + Balance;
              // const toBePaid = totalBalance - Number(values.paidamount || 0);
              const { netPayable, totalPayable, toBePaid } = calculatePayable(values);


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
                      name="orderdate"
                      type="date"
                      id="orderdate"
                      //label="Order Date"
                      label={
                        params.OrderType === "O"
                          ? "Order Date"
                          : "Quotation Date"
                      }
                      variant="standard"
                      focused
                      inputFormat="YYYY-MM-DD"
                      value={values.orderdate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.orderdate && !!errors.orderdate}
                      helperText={touched.orderdate && errors.orderdate}
                      InputProps={{
                        readOnly: true,
                      }}
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
                          },
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
                            Order No
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
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
                          },
                        }}
                        autoFocus
                      />
                    )}
                    <TextField
                      name="NextOrdDate"
                      type="date"
                      id="NextOrdDate"
                      label="Next Order Date"
                      variant="standard"
                      focused
                      inputFormat="YYYY-MM-DD"
                      value={values.NextOrdDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.NextOrdDate && !!errors.NextOrdDate}
                      helperText={touched.NextOrdDate && errors.NextOrdDate}
                    />
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
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                        },
                      }}
                    />

                    {mode !== "A" && params.OrderType === "O" && (
                      <>
                        <TextField
                          label="Net Payables"
                          variant="standard"
                          focused
                          // value={(
                          //   Number(values.delivercharges || 0) +
                          //   Number(values.totalprice || 0)
                          // ).toFixed(2)}
                          value={netPayable.toFixed(2)}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                        <TextField
                          name="PartyBalance"
                          // type="number"
                          type="text"
                          id="PartyBalance"
                          label="Due"
                          variant="standard"
                          focused
                          value={Math.abs(Number(values.PartyBalance || 0))}
                          // value={Math.abs(Balance || 0)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.PartyBalance && !!errors.PartyBalance
                          }
                          helperText={
                            touched.PartyBalance && errors.PartyBalance
                          }
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: {
                                textAlign: "right",
                                color:
                                  Number(values.PartyBalance) < 0
                                    ? "#d32f2f"
                                    : // ? "#db4f4a"
                                    "#2e7d32", // red : green
                                fontWeight: 600,
                              },
                            },

                            // endAdornment:
                            //   // Number(values.PartyBalance) < 0 && (
                            //     <InputAdornment position="end">
                            //       <Tooltip title="View Due Details">
                            //         <IconButton
                            //           size="small"
                            //           onClick={fetchDueDetails}
                            //         >
                            //           <InfoOutlinedIcon color="error" />
                            //         </IconButton>
                            //       </Tooltip>
                            //     </InputAdornment>
                            // ),
                          }}
                          autoFocus
                        />
                        <TextField
                          label="Total Payable"
                          variant="standard"
                          focused
                          value={Math.abs(totalPayable.toFixed(2))}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        //  InputProps={{
                        //   readOnly: true,
                        //   inputProps: {
                        //     style: {
                        //       textAlign: "right",
                        //       color:
                        //         Number(values.PartyBalance) < 0
                        //           ? "#d32f2f"
                        //           : // ? "#db4f4a"
                        //           "#2e7d32", // red : green
                        //       fontWeight: 600,
                        //     },
                        //   },
                        // }}
                        />

                        <TextField
                          type="number"
                          label="To Be Paid"
                          variant="standard"
                          focused
                          value={toBePaid.toFixed(2)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          autoFocus
                        />
                        <TextField
                          name="paidamount"
                          type="number"
                          id="paidamount"
                          // label="Paid Amount"
                          label={
                            <>
                              Paid Amount
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          variant="standard"
                          focused
                          value={values.paidamount}
                          // onBlur={handleBlur}
                          // onChange={handleChange}
                          onChange={(e) => {
                            // allow only numbers + decimal
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
                              setFieldValue("paidamount", num.toFixed(2)); // ✅ forces .00
                            }
                          }}
                          error={!!touched.paidamount && !!errors.paidamount}
                          helperText={touched.paidamount && errors.paidamount}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          autoFocus
                        />
                        {/* <TextField
                          select
                          label="Status"
                          id="status"
                          name="status"
                          value={values.status}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedStatus = e.target.value;

                            // Update status
                            handleChange(e);
                            sessionStorage.setItem("status", selectedStatus);

                            // ✅ ONLY when Adjust From Advance → reset paid amount
                            if (selectedStatus === "Adjust From Advance") {
                              setFieldValue("paidamount", 0);
                            }
                          }}
                          focused
                          variant="standard"
                        >
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                        </TextField> */}
                        <TextField
                          select
                          // label="Payment Mode"
                          label={
                            <>
                              Payment Mode
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          id="paymentmode"
                          name="paymentmode"
                          value={values.paymentmode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // onChange={(e) => {
                          //   handleChange(e); // update form state (Formik)
                          //   sessionStorage.setItem(
                          //     "paymentmode",
                          //     e.target.value,
                          //   ); // save to sessionStorage
                          // }}
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
                          name="PaidComments"
                          type="text"
                          id="PaidComments"
                          label="Paid Comments"
                          variant="standard"
                          focused
                          value={values.PaidComments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.PaidComments && !!errors.PaidComments
                          }
                          helperText={
                            touched.PaidComments && errors.PaidComments
                          }
                          autoFocus
                        />
                        <TextField
                          name="DeliveryComments"
                          type="text"
                          id="DeliveryComments"
                          label="Delivery Comments"
                          variant="standard"
                          focused
                          value={values.DeliveryComments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.DeliveryComments &&
                            !!errors.DeliveryComments
                          }
                          helperText={
                            touched.DeliveryComments && errors.DeliveryComments
                          }
                          autoFocus
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
                          error={
                            !!touched.receivername && !!errors.receivername
                          }
                          helperText={
                            touched.receivername && errors.receivername
                          }
                          autoFocus
                        />
                        <TextField
                          name="mobilenumber"
                          type="number"
                          id="mobilenumber"
                          label="Mobile Number"
                          variant="standard"
                          focused
                          value={values.mobilenumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.mobilenumber && !!errors.mobilenumber
                          }
                          helperText={
                            touched.mobilenumber && errors.mobilenumber
                          }
                          autoFocus
                        />
                        <Box>
                          <FormControl>
                            <FormLabel focused={true} sx={{ fontSize: "11px" }}>
                              Rating
                            </FormLabel>
                            <Rating
                              name="Rating"
                              value={Number(values.Rating || 0)}
                              size="large"
                              onChange={(e, newValue) => {
                                setFieldValue("Rating", newValue || "");
                              }}
                              focused
                            />
                          </FormControl>
                        </Box>
                        <TextField
                          name="RatingComments"
                          type="text"
                          id="RatingComments"
                          label={
                            Number(values.Rating) > 0 &&
                              Number(values.Rating) <= 2 ? (
                              <>
                                Rating Comments
                                <span
                                  style={{ color: "red", fontSize: "18px" }}
                                >
                                  {" "}*</span>
                              </>
                            ) : (
                              "Rating Comments (Optional)"
                            )
                          }
                          variant="standard"
                          focused
                          value={values.RatingComments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            Number(values.Rating) > 0 &&
                            Number(values.Rating) <= 2 &&
                            touched.RatingComments &&
                            !values.RatingComments
                          }
                          helperText={
                            Number(values.Rating) > 0 &&
                              Number(values.Rating) <= 2 &&
                              !values.RatingComments ? (
                              <>
                                <span style={{ color: "red" }}>
                                  Comments are required for low ratings
                                </span>
                              </>
                            ) : (
                              ""
                            )
                          }
                        />
                      </>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap="20px"
                  >
                    {YearFlag == "true" &&
                      (mode === "A" || params.OrderType === "O") ? (
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
                    )}{" "}
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
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => navigate(-1)}
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
              );
            }}
          </Formik>

          {!dueLoading && dueRows.length > 0 && (
            <Paper elevation={3} sx={{ margin: "10px" }}>
              <Box m="5px">
                <Box
                  m="5px 0 0 0"
                  height={dataGridHeight}
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[800],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[800],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .odd-row": {
                      backgroundColor: "",
                      color: "", // Color for odd rows
                    },
                    "& .even-row": {
                      backgroundColor: "#D3D3D3",
                      color: "", // Color for even rows
                    },
                  }}
                >
                  <DataGrid
                    sx={{
                      "& .MuiDataGrid-footerContainer": {
                        height: dataGridHeaderFooterHeight,
                        minHeight: dataGridHeaderFooterHeight,
                      },
                    }}
                    rows={dueRows}
                    columns={Sprintcolumns}
                    loading={dueLoading}
                    //rowModesModel={rowModesModel}
                    getRowId={(row) => row.RecordID}
                    editMode="cell"
                    disableRowSelectionOnClick
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    components={{
                      Toolbar: Custombar,
                    }}
                    // componentsProps={{
                    //   toolbar: { setRows, setRowModesModel },
                    // }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd-row"
                        : "even-row"
                    }
                    pagination
                  />
                </Box>
              </Box>
            </Paper>
          )}
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditOHPayment;
