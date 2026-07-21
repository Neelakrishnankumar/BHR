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
import * as Yup from "yup";
import { breadcrumbStyles } from "../../../Theme";

// import CryptoJS from "crypto-js";
const EditAdvancePayment = () => {
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
  const DefaultProductDeliveryChargeGetData = useSelector(
    (state) => state.formApi.DefaultProductDeliveryChargeGetData
  );
  const PartyRecordID = params.partyID;
  console.log("🚀 ~ EditAdvancePayment ~ PartyRecordID:", PartyRecordID)
  const [validationSchema, setValidationSchema] = useState(null);
  const [errorMsgData, setErrorMsgData] = useState(null);

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
          // Amount: Yup.number()
          //   .typeError(data.AdvancePayment.Amount)
          //   .required(data.AdvancePayment.Amount),
          Amount: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? undefined : Number(originalValue)
            )
            .typeError(data.AdvancePayment.Amount)
            .required(data.AdvancePayment.Amount)
            .moreThan(0, "Amount must be greater than 0.00"),
          paymentdate: Yup.date()
            .typeError(data.AdvancePayment.paymentdate)
            .required(data.AdvancePayment.paymentdate),
          ModeofPayment: Yup.string()
            .typeError(data.AdvancePayment.ModeofPayment)
            .required(data.AdvancePayment.ModeofPayment)
        };

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);


  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split("T")[0];

  const InitialValue = {
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    paymentdate: data.Date ? data.Date.split(" ")[0] : "" || "",
    Amount: data.Amount || "",
    paymentComments: data.Comments || "",
    ModeofPayment: data.ModeofPayment || "",
  };

  const Fnsave = async (values, del) => {
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
      PartyID: PartyRecordID,
      Date: values.paymentdate || "",
      Amount: values.Amount || 0,
      SortOrder: values.sortorder || 0,
      Comments: values.paymentComments || "",
      ModeofPayment: values.ModeofPayment || "",
      Disable: isCheck,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
      return;
    } else {
      toast.error(response.payload.Msg);
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
          navigate(`/Apps/Secondarylistview/${params.accessID}/${params.screenName}/${params.partyID}`, {
            state: state,
          });
        }
      } else {
        return;
      }
    });
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
          background: "#fff",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" gap={1}>
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}


 <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    // mb: 0.2,
                    px: 1,
                    py: 0.2,
                  }}
                >
                  {mode === "A"
                  ? "Add Advance Payment"
                  : "View Advance Payment"}
                </Typography>
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
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

              <Typography
                     sx={breadcrumbStyles.item}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Advance Payment
              </Typography>

              <Typography
                     sx={breadcrumbStyles.active}
              >
                {mode === "A"
                  ? "Add Advance"
                  : "View Advance"}
              </Typography>
            </Breadcrumbs>
          </Box>
    </Box>
          <Box display="flex" gap={1}>
            <Tooltip title="Close">
              <IconButton
                onClick={() => fnLogOut("Close")}
                sx={{
                  // bgcolor: "#FEF2F2",
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
                  //  bgcolor: "#FEF2F2",
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
              isSubmitting,
              values,
              handleSubmit,
              setFieldValue
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" alignItems="center" gap={1} mb={3}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "#EFF6FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      💰
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0D94885"
                      >
                        Advance Payment
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Advance payment details
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="grid"
                    gap="20px"
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
                      name="paymentdate"
                      type="date"
                      id="paymentdate"
                      label={
                        <>
                          Payment Date
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      inputFormat="YYYY-MM-DD"
                      value={values.paymentdate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.paymentdate && !!errors.paymentdate}
                      helperText={touched.paymentdate && errors.paymentdate}
                      InputProps={{
                        readOnly: mode === "V" ? true : false,
                     
                      }}
                        InputLabelProps={{
    shrink: true,
  }}
                    //required
                    //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                    />

                    <TextField
                      name="Amount"
                      type="number"
                      id="Amount"
                      label={
                        <>
                          Amount
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      value={values.Amount}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(e) => {
                        // allow only numbers + decimal
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) {
                          setFieldValue("Amount", val);
                        }
                      }}
                      onBlur={(e) => {
                        let val = e.target.value;

                        if (val === "" || val === ".") {
                          setFieldValue("Amount", "0.00");
                          return;
                        }

                        const num = parseFloat(val);
                        if (!isNaN(num)) {
                          setFieldValue("Amount", num.toFixed(2)); // ✅ forces .00
                        }
                      }}
                      error={!!touched.Amount && !!errors.Amount}
                      helperText={touched.Amount && errors.Amount}
                      autoFocus
                      
                      InputProps={{
                        readOnly: mode === "V" ? true : false,
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />

                    <TextField
                      select
                      label={
                        <>
                          Payment Mode
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      id="ModeofPayment"
                      name="ModeofPayment"
                      value={values.ModeofPayment}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ModeofPayment && !!errors.ModeofPayment}
                      helperText={touched.ModeofPayment && errors.ModeofPayment}
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="COD">Cash On Delivery</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </TextField>
                    <TextField
                      name="paymentComments"
                      type="text"
                      id="paymentComments"
                      label="Payment Comments"
                      variant="outlined"
                      size="small"
                      value={values.paymentComments}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.paymentComments && !!errors.paymentComments
                      }
                      helperText={
                        touched.paymentComments && errors.paymentComments
                      }
                      autoFocus
                      InputProps={{
                        readOnly: mode === "V" ? true : false,
                      }}
                    // disabled
                    />

                    <TextField
                      name="sortorder"
                      type="number"
                      id="sortorder"
                      label="Sort Order"
                      variant="outlined"
                      size="small"
                      value={values.sortorder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortorder && !!errors.sortorder}
                      helperText={touched.sortorder && errors.sortorder}
                      // sx={{ background: "#fff6c3" }}
                      InputProps={{
                        readOnly: mode === "V" ? true : false,
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
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ pt: 1 }}
                    >
                      <Field
                        type="checkbox"
                        name="disable"
                        id="disable"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                        disabled={mode === "V"}
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={4}
                  >
                    {YearFlag == "true" && mode === "A" ? (
                      <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="contained"
                        sx={{
                          px: 4,
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "#0D9488",
                          "&:hover": {
                            bgcolor: "#0F766E",
                          },
                        }}
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
                        variant="contained"
                        onClick={() => {
                          Fnsave(values, "harddelete");
                        }}
                        sx={{
                          textTransform: "none",
                          px: 4,
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "#DC2626",
                          "&:hover": {
                            bgcolor: "#B91C1C",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button 
                      sx={{
                         textTransform: "none",
                      }}
                      color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        px: 4,
                        borderRadius: 2,
                        textTransform: "none",
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
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

export default EditAdvancePayment;
