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
  Breadcrumbs,
  MenuItem,
  InputLabel,
  Select,
  Paper,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
// import { category, CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  CustomisedCaptionGet,
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
import { SalarySchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/utils";
// import CryptoJS from "crypto-js";
import * as Yup from "yup";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";

const EditSalaryComponent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const CompanyID = sessionStorage.getItem("compID");
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [validationSchema, setValidationSchema] = useState(null);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : ""; console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");
  const location = useLocation();
  const rowData = location.state || {};
  console.log(rowData, "--rowData state");
  console.log(location, "location -----------------");
  var screenName1 = params.screenName;
  var screenName = rowData.name;
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
        //Permission
        const schema = Yup.object().shape({
          description: Yup.string().required(data.Salarycomp.Name),
          type: Yup.string().required(data.Salarycomp.Type),
          category: Yup.string().required(data.Salarycomp.Category),
        })
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    if (Subscriptionlastthree && accessID) {
      dispatch(
        CustomisedCaptionGet({
          Vertical: Subscriptionlastthree,
          AccessID: accessID,
        })
      );
    }
  }, [Subscriptionlastthree, accessID, dispatch]);
  const Customisedcaptiondata = useSelector(
    (state) => state.formApi.CustomisedCaptionGetData
  );
  // Ensure it's always an array
  const captionArray = Array.isArray(Customisedcaptiondata)
    ? Customisedcaptiondata
    : Customisedcaptiondata?.data || [];
  console.log(Customisedcaptiondata, captionArray, "Customisedcaptiondata");
  const getBusinessCaption = (CaptionID, defaultCaption) => {
    const match = captionArray?.find(
      (item) => item.CAPTIONID === CaptionID
    );

    return match?.CAPTION || defaultCaption;
  };

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    description: data.Name,
    type: data.Type == "Percentage of Allowance 1" ? "A1" :
      data.Type == "Percentage of Allowance 1 + Allowance 2 + Allowance 3" ? "A3" :
        data.Type == "Percentage of Allowance 1 + Allowance 2" ? "A2" :
          data.Type == "Fixed Amount" ? "FX" :
            data.Type == "Policy" ? "PC" : "",
    category: data.Category == "Allowance" ? "A" :
      data.Category == "Deduction" ? "D" : "",
    sortOrder: data.Sortorder || 0,
    disable: data.Disable === "Y" ? true : false,
    Policy: data.StatuaryRecordID ? { RecordID: data.StatuaryRecordID, Name: data.Policy } : null,
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
      Name: values.description || "",
      Type: values.type || "",
      Category: values.category || "",
      SortOrder: values.sortOrder,
      Disable: values.disable === true ? "Y" : "N",
      CompanyID,
      StatuaryRecordID: values.Policy?.RecordID || 0,
    };

    const response = await dispatch(postData({ accessID, action, idata }));

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);

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
          navigate(
            `/Apps/Secondarylistview/TR205/SalaryComponent/${params.row.RecordID}`
          );
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
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}

            >

              {getBusinessCaption("SalaryComponent", "Salary Component")}
            </Typography>
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
            validationSchema={validationSchema}
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
              setFieldValue
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
                    name="description"
                    type="text"
                    id="description"
                    label={
                      <span>
                        {getBusinessCaption("Name", "Name")}
                        <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </span>
                    }
                    // label="Name"
                    variant="standard"
                    focused
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{
                      //gridColumn: "span 2",
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }} />


                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        values.type === "PC"
                          ? "1fr 1fr"
                          : "1fr",
                      gap: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      label={
                        <span>
                          {getBusinessCaption("Type", "Type")}
                          <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </span>
                      }
                      id="type"
                      name="type"
                      variant="standard"
                      focused
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                      error={!!touched.type && !!errors.type}
                      helperText={touched.type && errors.type}
                    >
                      <MenuItem value="FX">Fixed Amount</MenuItem>
                      <MenuItem value="A1">Percentage Of Allowance 1</MenuItem>
                      <MenuItem value="A2">Percentage Of Allowance 1 + Allowance 2</MenuItem>
                      <MenuItem value="A3">Percentage Of Allowance 1 + Allowance 2 + Allowance 3</MenuItem>
                      <MenuItem value="PC">Policy</MenuItem>
                    </TextField>

                    {values.type === "PC" || data.Type == "Policy" ? (
                      <CheckinAutocomplete
                        fullWidth
                        variant="outlined"
                        name="Policy"
                        label="Policy"
                        // label={
                        //   <>
                        //     Policy <span style={{ color: "red", fontSize: "20px" }}> *</span>
                        //   </>
                        // }
                        id="Policy"
                        value={values.Policy}
                        onChange={(newValue) => {
                          setFieldValue("Policy", newValue);
                        }}
                        error={!!touched.Policy && !!errors.Policy}
                        helperText={touched.Policy && errors.Policy}
                        url={`${listViewurl}?data=${JSON.stringify({
                          Query: {
                            AccessID: "2150",
                            ScreenName: "Payroll Policy",
                            VerticalLicense: Subscriptionlastthree,
                            Filter: `companyID=${CompanyID}`,
                            Any: "",
                          },
                        })}`}
                      // url={`${listViewurl}?data={"Query":{"AccessID":"2150","ScreenName":"Payroll Policy","Filter":"companyID='${CompanyID}'","Any":""}}`}
                      />
                    ) : (null)}
                  </Box>
                  {/* <FormControl
                    focused
                    variant="standard"
                  //sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="category">Category<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="category"
                      name="category"
                      value={values.category}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.category && !!errors.category}
                      helperText={touched.category && errors.category}
                    >
                      <MenuItem value="A">ALLOWANCE</MenuItem>
                      <MenuItem value="D">DEDUCTION</MenuItem>
                    </Select>
                  </FormControl> */}
                  <TextField
                    label={
                      <span>
                        {getBusinessCaption("Category", "Category")}
                        <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </span>
                    }
                    id="category"
                    name="category"
                    focused
                    variant="standard"
                    value={values.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value="A">Allowance</MenuItem>
                    <MenuItem value="D">Deduction</MenuItem>
                  </TextField>
                  <TextField
                    name="sortOrder"
                    type="number"
                    id="sortOrder"
                    label="Sortorder"
                    variant="standard"
                    focused
                    value={values.sortOrder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortOrder && !!errors.sortOrder}
                    helperText={touched.sortOrder && errors.sortOrder}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  //sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                  />
                  <FormControl>
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
                    </Box>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}

                  >
                    Save
                  </LoadingButton>
                  {mode == "E" &&
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Fnsave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>
                  }
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
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

export default EditSalaryComponent;
