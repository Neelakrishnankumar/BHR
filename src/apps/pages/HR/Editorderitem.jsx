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
  Breadcrumbs,
  MenuItem,
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
  replacementQtyGet,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";
import {
  CheckinAutocomplete,
  OrderItemAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as Yup from "yup";

// import CryptoJS from "crypto-js";
const EditOrderitem = () => {
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
  const DefaultProductDeliveryChargeGetData = useSelector(
    (state) => state.formApi.DefaultProductDeliveryChargeGetData
  );
  const DefaultProductDeliveryChargeGetDataloading = useSelector(
    (state) => state.formApi.DefaultProductDeliveryChargeGetDataloading
  );
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const state = location.state || {};
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const [validationSchema, setValidationSchema] = useState(null);

  const [errorMsgData, setErrorMsgData] = useState(null);
  const ReplacementQtyGet = useSelector((state) => state.formApi.replacementQtyGetdata);
  const ReplacementQty = ReplacementQtyGet?.ReplacementQty || 0;
  console.log("🚀 ~ EditOrderitem ~ ReplacementQty:", ReplacementQty)
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

        // let schemaFields = {
        //   discount: Yup.number()
        //     .typeError(data.OrderItem.discount)
        //     .required(data.OrderItem.discount),
        //   product: Yup.object()
        //     .nullable()
        //     .shape({
        //       RecordID: Yup.string().required(data.OrderItem.product),
        //       Name: Yup.string().nullable(), // optional
        //     })
        //     .required(data.OrderItem.product),
        //   quantity: Yup.number()
        //     .typeError(data.OrderItem.quantity)
        //     .required(data.OrderItem.quantity)
        //     .min(1, "Quantity must be greater than 0"),
        // };
        let schemaFields = {
          discount: Yup.number()
            .typeError(data.OrderItem.discount)
            .required(data.OrderItem.discount),

          product: Yup.object()
            .nullable()
            .shape({
              RecordID: Yup.string().required(data.OrderItem.product),
              Name: Yup.string().nullable(),
            })
            .required(data.OrderItem.product),

          // ⭐ PURCHASE QUANTITY
          quantity: Yup.number().when("PurchaseType", {
            is: "Purchase",
            then: (schema) =>
              schema
                .typeError(data.OrderItem.quantity)
                .required(data.OrderItem.quantity)
                .min(1, "Quantity must be greater than 0"),
            otherwise: (schema) => schema.nullable(),
          }),

          // ⭐ DAMAGE QTY
          damageqty: Yup.number().when("PurchaseType", {
            is: "Damage",
            then: (schema) =>
              schema
                .required("Please enter the Damage Quantity")
                .min(1, "Damage Quantity must be greater than 0"),
            otherwise: (schema) => schema.nullable(),
          }),

          // ⭐ RETURN QTY
          returnQuantity: Yup.number().when("PurchaseType", {
            is: "Return",
            then: (schema) =>
              schema
                .required("Please enter the Return Quantity")
                .min(1, "Return Quantity must be greater than 0"),
            otherwise: (schema) => schema.nullable(),
          }),
        };

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);

  useEffect(() => {
    dispatch(replacementQtyGet({ PartyID: params.filtertype || 0, CompanyID: CompanyID }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split("T")[0];
  const PartyRecordID = state.PartyID;
  console.log("🚀 ~ EditOrderitem ~ PartyRecordID:", PartyRecordID);

  useEffect(() => {
    dispatch(DefaultProductDeliveryChargeGet({ PartyRecordID }));
  }, [location.key]);

  const InitialValue = {
    quantity: data.Quantity || 1,
    damageqty: data.DamageQty,
    returnQuantity: data.ReturnQty,
    price:
      mode === "A"
        ? DefaultProductDeliveryChargeGetData?.Price || 0
        : data.Price || 0,
    //netprice: data.NetPrice,
    netprice:
      data.NetPrice ||
      (data.Discount == 0
        ? (mode === "A"
          ? DefaultProductDeliveryChargeGetData?.Price
          : data.Price) || 0
        : 0),
    amount: data.Amount,
    discount: data.Discount || 0,
    // PurchaseType: data.PurchaseType || "Purchase",
    PurchaseType: data.DamageQty > 0 ? "Damage" : data.ReturnQty > 0 ? "Return" : "Purchase",
    product:
      mode === "A"
        ? DefaultProductDeliveryChargeGetData?.RecordID &&
          DefaultProductDeliveryChargeGetData?.RecordID !== "0"
          ? {
            RecordID: DefaultProductDeliveryChargeGetData.RecordID,
            Name: DefaultProductDeliveryChargeGetData.Name,
            Price: DefaultProductDeliveryChargeGetData.Price,
          }
          : null
        : data.ProductComboID
          ? {
            RecordID: data.ProductComboID,
            Name: data.ProductComboName,
            Price: data.ProductComboPrice,
          }
          : null,
  };

  const Fnsave = async (values, del, actions) => {
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
      CompanyID,
      OrderHeareID: params.filtertype1,
      ProductCombo: values.product.RecordID || 0,
      Quantity: values.quantity || 0,
      DeliverdQty: values.quantity || 0,
      Price: values.price || 0,
      Discount: values.discount || 0,
      NetPrice: values.netprice || 0,
      Amount: values.amount || 0,
      DamageQty: values.PurchaseType === "Damage" ? values.damageqty : 0,
      ReturnQty: values.PurchaseType === "Return" ? values.returnQuantity : 0,
      ReplacementQty: ReplacementQty || 0,
    };

    // {
    //     "Status": "Y",
    //     "Data": {
    //         "RecordID": "",
    //         "OrderHeareID": "",
    //         "ProductCombo": "",
    //         "Quantity": "",
    //         "Price": "",
    //         "Discount": "",
    //         "NetPrice": "",
    //         "Amount": ""
    //     }
    // }
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // navigate(`/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/TR311/${params.filtertype1}`, {
      //   state: { ...state },
      // });

      // actions.resetForm();
      //     actions.setSubmitting(false);
      // ⭐ CASE 1 → Add Mode → stay on same page
      // if (mode === "A") {
      //   actions.resetForm();
      //   actions.setSubmitting(false);
      //   return; // VERY IMPORTANT → do NOT run navigate()
      // }
      if (mode === "A") {
        if (params.Type === "Party") {
          navigate(
            `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/Party/${params.OrderType}/TR311/${params.filtertype1}/EditOrderitem/-1/A`,
            { state: { ...state } }
          );
        } else {
          navigate(
            `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/Leader/${params.OrderType}/TR311/${params.filtertype1}/EditOrderitem/-1/A`,
            { state: { ...state } }
          );
        }
        return;
      }

      // ⭐ CASE 2 → Edit or Delete → Redirect back to OrderItem list
      if (mode === "E" || del === "harddelete") {
        navigate(
          `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}/TR311/${params.filtertype1}`,
          { state: { ...state } }
        );
      }
    } else {
      toast.error(response.payload.Msg);
    }
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
                  // onClick={() => {
                  //   navigate(-1);
                  // }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR303/LeaderCardView/${state.PartyID}`,
                      { state: { ...state } }
                    );
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
                  navigate(
                    `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}`,
                    { state: { ...state } }
                  );
                }}
              >
                {params.OrderType === "O" ? "Order" : "Quotation"} (
                {state.Code || ""})
              </Typography>
              {params.Type === "Party" && mode === "E" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}/TR311/${params.filtertype1}`,
                      { state: { ...state } }
                    );
                  }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"} Item
                </Typography>
              ) : null}
              {params.Type === "Leader" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}/TR311/${params.filtertype1}`,
                      { state: { ...state } }
                    );
                  }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"} Item
                </Typography>
              ) : null}
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {/* {mode === "A" ? "Add Order Item" : "Edit Order Item"} */}
                {params.OrderType === "O"
                  ? mode === "A"
                    ? "Add Order Item"
                    : "Edit Order Item"
                  : mode === "A"
                    ? "Add Quotation Item"
                    : "Edit Quotation Item"}
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
            //sinitialValues={mode === "A" ? blankInitial : InitialValue}

            onSubmit={(values, setSubmitting, actions) => {
              setTimeout(() => {
                Fnsave(values, actions);
              }, 100);
            }}
            validationSchema={validationSchema}
            //enableReinitialize={mode === "E"}
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
              setFieldTouched,
            }) => {

              const netQuantity = Number(values.quantity || 0) + Number(ReplacementQty || 0);
              // const recalc = (changedField, newValue) => {
              //   const price = parseFloat(values.price || 0);
              //   const net = parseFloat(values.netprice || 0);
              //   const qty = parseFloat(values.quantity || 0);

              //   switch (changedField) {
              //     case "discount": {
              //       const disc = parseFloat(newValue || 0);
              //       const newNet = price - (price * disc) / 100;
              //       setFieldValue("discount", newValue);
              //       setFieldValue("netprice", newNet.toFixed(2));
              //       setFieldValue("amount", (newNet * qty).toFixed(2));
              //       break;
              //     }

              //     case "quantity": {
              //       const q = parseFloat(newValue || 0);
              //       setFieldValue("quantity", newValue);
              //       setFieldValue("amount", (net * q).toFixed(2));
              //       break;
              //     }

              //     case "amount": {
              //       const newAmt = parseFloat(newValue || 0);
              //       const newNet = qty > 0 ? newAmt / qty : 0;
              //       const newDisc = price
              //         ? ((price - newNet) / price) * 100
              //         : 0;

              //       setFieldValue("amount", newValue);
              //       setFieldValue("netprice", newNet.toFixed(2));
              //       setFieldValue("discount", newDisc.toFixed(2));
              //       break;
              //     }
              //   }
              // };
              const recalc = (changedField, newValue) => {
                const price = parseFloat(values.price || 0);
                const qty = parseFloat(values.quantity || 0);
                const discount = parseFloat(values.discount || 0);
                const net = parseFloat(values.netprice || 0);

                // 🔥 Helper → calculate net from price & discount
                const computeNet = (p, d) => p - (p * d) / 100;

                switch (changedField) {
                  case "discount": {
                    const disc = parseFloat(newValue || 0);
                    const newNet = computeNet(price, disc);

                    setFieldValue("discount", newValue);
                    setFieldValue("netprice", newNet.toFixed(2));
                    setFieldValue("amount", (newNet * qty).toFixed(2));
                    break;
                  }

                  case "quantity": {
                    const q = parseFloat(newValue || 0);
                    setFieldValue("quantity", newValue);
                    const netp = discount === 0 ? price : net;
                    setFieldValue("amount", (netp * q).toFixed(2));
                    break;
                  }

                  case "amount": {
                    const newAmt = parseFloat(newValue || 0);
                    const newNet = qty > 0 ? newAmt / qty : 0;
                    const newDisc = price
                      ? ((price - newNet) / price) * 100
                      : 0;

                    setFieldValue("amount", newValue);
                    setFieldValue("netprice", newNet.toFixed(2));
                    setFieldValue("discount", newDisc.toFixed(2));
                    break;
                  }

                  // ⭐ SPECIAL CASE → When PRICE changes (due to product selection)
                  case "price": {
                    const newPrice = parseFloat(newValue || 0);

                    setFieldValue("price", newValue);

                    // default behaviour: if discount = 0 → net price = price
                    if (discount === 0) {
                      setFieldValue("netprice", newPrice.toFixed(2));
                      setFieldValue("amount", (newPrice * qty).toFixed(2));
                    } else {
                      const newNet = computeNet(newPrice, discount);
                      setFieldValue("netprice", newNet.toFixed(2));
                      setFieldValue("amount", (newNet * qty).toFixed(2));
                    }
                    break;
                  }
                }
              };

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
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/* <OrderItemAutocomplete
                        id="product"
                        name="product"
                        //label="Product"
                        label={
                          <>
                            Product
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="outlined"
                        value={values.product}
                        onBlur={() => setFieldTouched("product", true)}
                        onChange={(newValue) => {
                          const prevProduct = values.product;
                          // Set the selected product
                          setFieldValue("product", newValue);

                          // If nothing selected (cleared)
                          if (!newValue) {
                            setFieldValue("price", "");
                            setFieldValue("discount", "");
                            setFieldValue("netprice", "");
                            setFieldValue("quantity", "");
                            setFieldValue("amount", "");
                            return;
                          }

                          //  If SAME product is selected again — DO NOTHING
                          if (
                            prevProduct &&
                            prevProduct.RecordID === newValue.RecordID
                          ) {
                            console.log("Same product selected — no reset");
                            return;
                          }

                          // ★ If NEW product selected → reset all dependent fields
                          setFieldValue("price", newValue.Price);
                          setFieldValue("discount", "");
                          setFieldValue("netprice", "");
                          setFieldValue("quantity", "");
                          setFieldValue("amount", "");
                        }}
                        error={!!touched.product && !!errors.product}
                        helperText={touched.product && errors.product}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2130","ScreenName":"Product","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      /> */}
                      <OrderItemAutocomplete
                        id="product"
                        name="product"
                        //label="Product"
                        label={
                          <>
                            Product
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="outlined"
                        value={values.product}
                        onBlur={() => setFieldTouched("product", true)}
                        onChange={(newValue) => {
                          const prevProduct = values.product;
                          // Set the selected product
                          setFieldValue("product", newValue);

                          // If nothing selected (cleared)
                          if (!newValue) {
                            setFieldValue("price", "");
                            setFieldValue("discount", "");
                            setFieldValue("netprice", "");
                            setFieldValue("quantity", "");
                            setFieldValue("amount", "");
                            return;
                          }

                          //  If SAME product is selected again — DO NOTHING
                          if (
                            prevProduct &&
                            prevProduct.RecordID === newValue.RecordID
                          ) {
                            console.log("Same product selected — no reset");
                            return;
                          }

                          // ★ If NEW product selected → reset all dependent fields
                          setFieldValue("price", newValue.Price);
                          setFieldValue("discount", "");
                          setFieldValue("netprice", "");
                          setFieldValue("quantity", "");
                          setFieldValue("amount", "");
                        }}
                        error={!!touched.product && !!errors.product}
                        helperText={touched.product && errors.product}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Product","Filter":"CompanyID='${CompanyID}' AND ItemsDesc ='Product'","Any":""}}`}
                      />
                    </FormControl>
                    <TextField
                      name="price"
                      type="number"
                      id="price"
                      label="Price"
                      variant="standard"
                      focused
                      value={values.price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      autoFocus
                    />
                    <TextField
                      name="discount"
                      type="number"
                      id="discount"
                      //label="Discount (In Percentage)"
                      label={
                        <>
                          Discount / Add On(%)
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.discount}
                      onBlur={handleBlur}
                      //onChange={handleChange}
                      onChange={(e) => recalc("discount", e.target.value)}
                      error={!!touched.discount && !!errors.discount}
                      helperText={touched.discount && errors.discount}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      autoFocus
                    />
                    <TextField
                      name="netprice"
                      type="number"
                      id="netprice"
                      label="Net Price"
                      variant="standard"
                      focused
                      value={values.netprice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.netprice && !!errors.netprice}
                      helperText={touched.netprice && errors.netprice}
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      select
                      label="Quantity Type"
                      id="PurchaseType"
                      name="PurchaseType"
                      value={values.PurchaseType}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const type = e.target.value;

                        handleChange(e);
                        sessionStorage.setItem("PurchaseType", type);

                        // RESET / RECALCULATE AMOUNT BASED ON TYPE
                        if (type === "Damage" || type === "Return") {
                          setFieldValue("amount", "0.00");
                          setFieldValue("quantity", "0");
                        } else {
                          const price = parseFloat(values.price || 0);
                          const qty = parseFloat(values.quantity || 0);
                          const disc = parseFloat(values.discount || 0);

                          const netPrice = price - (price * disc) / 100;
                          const amt = netPrice * qty;

                          setFieldValue("netprice", netPrice.toFixed(2));
                          setFieldValue("amount", amt.toFixed(2));
                        }
                      }}

                      focused
                      variant="standard"
                    >
                      <MenuItem value="Purchase">Purchase</MenuItem>
                      <MenuItem value="Damage">Damage</MenuItem>
                      <MenuItem value="Return">Return</MenuItem>
                    </TextField>

                    {(values.PurchaseType === "Damage") ? (
                      <TextField
                        name="damageqty"
                        type="number"
                        id="damageqty"
                        label={
                          <>
                            Damage Quantity
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.damageqty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // onChange={(e) => recalc("damageqty", e.target.value)}
                        error={!!touched.damageqty && !!errors.damageqty}
                        helperText={touched.damageqty && errors.damageqty}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        autoFocus
                      />
                    ) : values.PurchaseType === "Return" ? (
                      <TextField
                        name="returnQuantity"
                        type="number"
                        id="returnQuantity"
                        label={
                          <>
                            Return Quantity
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.returnQuantity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // onChange={(e) => recalc("returnQuantity", e.target.value)}
                        error={!!touched.returnQuantity && !!errors.returnQuantity}
                        helperText={touched.returnQuantity && errors.returnQuantity}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        autoFocus
                      />) : (<TextField
                        name="quantity"
                        type="number"
                        id="quantity"
                        label={
                          <>
                            Quantity
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.quantity}
                        onBlur={handleBlur}
                        //onChange={handleChange}
                        onChange={(e) => recalc("quantity", e.target.value)}
                        error={!!touched.quantity && !!errors.quantity}
                        helperText={touched.quantity && errors.quantity}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        autoFocus
                      />)}

                    {(values.PurchaseType === "Damage" || values.PurchaseType === "Return") ? (
                      <TextField
                        name="amount"
                        type="number"
                        id="amount"
                        label="Amount"
                        variant="standard"
                        focused
                        value={values.amount}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          const discount = e.target.value;
                          setFieldValue("discount", discount);

                          const price = parseFloat(values.price || 0);
                          const disc = parseFloat(discount || 0);

                          const netPrice = price - (price * disc) / 100;
                          const fixedNet = parseFloat(netPrice.toFixed(2));

                          setFieldValue("netprice", fixedNet);

                          // ★ Recalculate amount if quantity already entered
                          const qty = parseFloat(values.quantity || 0);
                          const amt = 0;

                          setFieldValue("amount", amt.toFixed(2));
                        }}
                        error={!!touched.amount && !!errors.amount}
                        helperText={touched.amount && errors.amount}
                        InputProps={{
                          readOnly: true,
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    ) : (<TextField
                      name="amount"
                      type="number"
                      id="amount"
                      label="Amount"
                      variant="standard"
                      focused
                      value={values.amount}
                      onBlur={handleBlur}
                      //onChange={handleChange}
                      onChange={(e) => {
                        const discount = e.target.value;
                        setFieldValue("discount", discount);

                        const price = parseFloat(values.price || 0);
                        const disc = parseFloat(discount || 0);

                        const netPrice = price - (price * disc) / 100;
                        const fixedNet = parseFloat(netPrice.toFixed(2));

                        setFieldValue("netprice", fixedNet);

                        // ★ Recalculate amount if quantity already entered
                        const qty = parseFloat(values.quantity || 0);
                        const amt = fixedNet * qty;

                        setFieldValue("amount", amt.toFixed(2));
                      }}
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />)}

                    {(mode === "A" && ReplacementQty > 0) ? (
                      <>
                        <TextField
                          name="replacementQty"
                          type="number"
                          id="replacementQty"
                          label="Replacement Qty"
                          variant="standard"
                          focused
                          value={ReplacementQty}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                        <TextField
                          name="netQty"
                          type="number"
                          id="netQty"
                          label="Net Quantity"
                          variant="standard"
                          focused
                          value={netQuantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.netQty && !!errors.netQty}
                          helperText={touched.netQty && errors.netQty}
                          InputProps={{
                            readOnly: true,
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />

                      </>) : null}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap="20px"
                  >
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
                    )}{" "}
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
                    {params.Type === "Party" ? (
                      <Button
                        color="warning"
                        variant="contained"
                        // onClick={() => {
                        //   navigate(
                        //     `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}`,
                        //     { state: { ...state } }
                        //   );
                        // }}
                        onClick={() => {
                          navigate(
                            `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}/${accessID}/${params.filtertype1}`,
                            { state: { ...state } }
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          navigate(
                            `/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}/${accessID}/${params.filtertype1}`,
                            { state: { ...state } }
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    )}
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
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditOrderitem;
