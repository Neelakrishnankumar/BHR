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
            Amount: Yup.number()
              .typeError(data.AdvancePayment.Amount)
              .required(data.AdvancePayment.Amount),
            paymentdate: Yup.date()
              .typeError(data.AdvancePayment.paymentdate)
              .required(data.AdvancePayment.paymentdate)
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
    paymentdate: data.Date || "",
    Amount: data.Amount || "",
    paymentComments: data.Comments || "",
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
                Advance Payment
                {/* {`Advance (${state.Code || ""} )`} */}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {mode === "A" ? "Add Advance" : "Edit Advance"}
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
                      variant="standard"
                      focused
                      inputFormat="YYYY-MM-DD"
                      value={values.paymentdate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.paymentdate && !!errors.paymentdate}
                      helperText={touched.paymentdate && errors.paymentdate}
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
                      variant="standard"
                      focused
                      value={values.Amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Amount && !!errors.Amount}
                      helperText={touched.Amount && errors.Amount}
                      autoFocus
                      InputProps={{
                        inputProps: {
                          textAlign: "right",
                        },
                      }}
                    />

                    <TextField
                      name="paymentComments"
                      type="text"
                      id="paymentComments"
                      label="Payment Comments"
                      variant="standard"
                      focused
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
                      // disabled
                    />

                    <TextField
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
                        type="checkbox"
                        name="disable"
                        id="disable"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                    </Box>
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

export default EditAdvancePayment;
