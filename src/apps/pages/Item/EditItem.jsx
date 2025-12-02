import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { formGap } from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
// import {
//   ManagerAppraisalPayload,
//   PeerAppraisalPayload,
//   SelfAppraisalPayload,
//   SingleFormikSkillAutocomplete,
//   SingleFormikSkillAutocompletePayload,
//   SubordinateAppraisalPayload,
// } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";

const EditItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  //const accessID = "TR283";
  const screenName = params.screenName;
  const mode = params.Mode;
  const EmpId = params.parentID3;
  const QuestionID = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;

  const AssessmentType = state.AssessmentType;
  console.log("🚀 ~ CreateCandidates ~ AssessmentType:", AssessmentType);
  const DesignationID = state.DesignationID;
  console.log("🚀 ~ CreateCandidates ~ DesignationID:", DesignationID);

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector(
    (state) => state.globalurl.AssessmentAutoUrl
  );
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        const schema = Yup.object().shape({
          Description: Yup.string().required(data.ItemCategory.Description),
          HSNMasterCode: Yup.string().required(data.ItemCategory.HSNMasterCode),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const curDate = new Date().toISOString().split("T")[0];
  const ItemSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      Code: values.Code,
      Description: values.Description || "",
      Sortorder: values.Sortorder || "0",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };
  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [show, setScreen] = React.useState("0");
  // **********ScreenChange Function*********

  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "", recID }));
      }
    }
    // if (event.target.value == "3") {
    //   if (recID && mode === "E") {
    //     dispatch(VendorRegisterFetchData({ get: "get", recID }));
    //   } else {
    //     dispatch(VendorRegisterFetchData({ get: "", recID }));
    //   }
    // }
    // if (event.target.value == "4") {
    //   if (recID && mode === "E") {
    //     dispatch(VendorDefaultFetchData({ get: "get", recID }));
    //   } else {
    //     dispatch(VendorDefaultFetchData({ get: "", recID }));
    //   }
    // }
    // if (event.target.value == "1") {
    //   dispatch(PartyContactget({ VendorID: recID }));
    // }

    // if (event.target.value == "2") {
    //   dispatch(PartyBankget({ VendorID: recID }));
    // }
  };
  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    Code: Data.Code || "",
    Description: Data.Description || "",
    HSNMasterCode: Data.HSNMasterCode || "",
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };
  const FlaginitialValues = {
    Code: Data.Code || "",
    Description: Data.Description || "",
    HSNMasterCode: Data.HSNMasterCode || "",
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
  };
  const StockinitialValues = {
    Code: Data.Code || "",
    Description: Data.Description || "",
    BoxQuantity: Data.BoxQuantity || "",
    PieceQuantity: Data.PieceQuantity || "",
    PurchaseUOM: Data.PurchaseUOM || "",
    ConsumptionUOM: Data.ConsumptionUOM || "",
    ConversionQty: Data.ConversionQty || "",
    GuidelinePrice: Data.GuidelinePrice || "",
  };

  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
        {/* BREADCRUMBS */}
        <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" borderRadius="3px" alignItems="center">
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
              <Box
                display={isNonMobile ? "flex" : "none"}
                borderRadius="3px"
                alignItems="center"
              >
                <Breadcrumbs
                  maxItems={3}
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate("/Apps/TR315/ItemGroup")}
                  >
                    List Of Item Group
                    {/* ({state.BreadCrumb1}) */}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Item Category
                    {/* ({state.BreadCrumb1}) */}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Items
                    {/* ({state.BreadCrumb1}) */}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "E" ? "Edit" : "View"}
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Box>

            <Box display="flex">
              {/* {mode !== "A" ? (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Explore</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={show}
                    label="Explore"
                    onChange={screenChange}
                  >
                    <MenuItem value={0}>Main</MenuItem>
                    <MenuItem value={1}>Flag</MenuItem>
                    <MenuItem value={2}>Stock</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                false
              )} */}
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Main</MenuItem>
                  <MenuItem value={1}>Flag</MenuItem>
                  <MenuItem value={2}>Stock</MenuItem>
                </Select>
              </FormControl>
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

        {/* {!getLoading ? ( */}
        {show == "0" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    {CompanyAutoCode == "Y" ? (
                      <TextField
                        name="Code"
                        type="text"
                        id="Code"
                        label="Code"
                        placeholder="Auto"
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                        name="Code"
                        type="text"
                        id="Code"
                        label={
                          <>
                            Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                      name="Description"
                      type="text"
                      id="Description"
                      label={
                        <span>
                          Description{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                    />
                    <TextField
                      name="HSNCode"
                      type="text"
                      id="HSNCode"
                      label="HSN Code"
                      //   label={
                      //     <span>
                      //       HSN Code{" "}
                      //       <span
                      //         style={{
                      //           fontSize: "20px",
                      //           color: "red",
                      //         }}
                      //       >
                      //         *
                      //       </span>
                      //     </span>
                      //   }
                      variant="standard"
                      focused
                      value={values.HSNCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNCode && !!errors.HSNCode}
                      helperText={touched.HSNCode && errors.HSNCode}
                      autoFocus
                    />
                    <TextField
                      name="HSNIGST"
                      type="number"
                      id="HSNIGST"
                      label="IGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNIGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNIGST && !!errors.HSNIGST}
                      helperText={touched.HSNIGST && errors.HSNIGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNCGST"
                      type="number"
                      id="HSNCGST"
                      label="CGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNCGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNCGST && !!errors.HSNCGST}
                      helperText={touched.HSNCGST && errors.HSNCGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNSGST"
                      type="number"
                      id="HSNSGST"
                      label="SGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNSGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNSGST && !!errors.HSNSGST}
                      helperText={touched.HSNSGST && errors.HSNSGST}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Sort Order"
                      value={values.Sortorder}
                      id="Sortorder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Sortorder"
                      // error={!!touched.Sortorder && !!errors.Sortorder}
                      // helperText={touched.Sortorder && errors.Sortorder}

                      sx={{ background: "" }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                          //readOnly: mode == "V",
                        },
                      }}
                    />

                    {/* CHECKBOX */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                    //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "1" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    {CompanyAutoCode == "Y" ? (
                      <TextField
                        name="Code"
                        type="text"
                        id="Code"
                        label="Code"
                        placeholder="Auto"
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                        name="Code"
                        type="text"
                        id="Code"
                        label={
                          <>
                            Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                      name="Description"
                      type="text"
                      id="Description"
                      label="Description"
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                      InputProps={{
                        inputProps: { readOnly: true },
                      }}
                    />
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Tradable"
                            checked={values.Tradable}
                            onChange={handleChange}
                          />
                        }
                        label="Tradable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="UnderEmployeeCustody"
                            checked={values.UnderEmployeeCustody}
                            onChange={handleChange}
                          />
                        }
                        label="Under Employee Custody"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ByProduct"
                            checked={values.ByProduct}
                            onChange={handleChange}
                          />
                        }
                        label="ByProduct (Job Work Component)"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ExpiryApplicable"
                            checked={values.ExpiryApplicable}
                            onChange={handleChange}
                          />
                        }
                        label="Expiry Applicable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ServiceAndMaintainence"
                            checked={values.ServiceAndMaintainence}
                            //onChange={handleChange}
                            onChange={(e) => setFieldValue("ServiceAndMaintainence", e.target.checked)}

                          />
                        }
                        label="Service And Maintainence"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="SpecRequired"
                            checked={values.SpecRequired}
                            onChange={handleChange}
                          />
                        }
                        label="Spec Required"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                    </Box>

                    {/* CHECKBOX */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                    {values.ServiceAndMaintainence &&
                      (
                        <>
                          <TextField
                            name="WarrantyPeriod"
                            type="number"
                            id="WarrantyPeriod"
                            label="Warranty Period (In Months)"
                            variant="standard"
                            focused
                            value={values.WarrantyPeriod}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.WarrantyPeriod && !!errors.WarrantyPeriod}
                            helperText={touched.WarrantyPeriod && errors.WarrantyPeriod}
                            autoFocus
                            InputProps={{
                              inputProps: { textAlign: "right" },
                            }}
                          />
                          <TextField
                            name="WarrantyEndPeriod"
                            type="text"
                            id="WarrantyEndPeriod"
                            label="Warranty End Period"
                            variant="standard"
                            focused
                            value={values.WarrantyEndPeriod}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.WarrantyEndPeriod && !!errors.WarrantyEndPeriod}
                            helperText={touched.WarrantyEndPeriod && errors.WarrantyEndPeriod}
                            autoFocus
                          // InputProps={{
                          //   inputProps: { textAlign: "right" },
                          // }}
                          />

                          <TextField
                            name="ExtendedWarranty"
                            type="number"
                            id="ExtendedWarranty"
                            label="Extended Warranty(In Months)"
                            variant="standard"
                            focused
                            value={values.ExtendedWarranty}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.ExtendedWarranty && !!errors.ExtendedWarranty}
                            helperText={touched.ExtendedWarranty && errors.ExtendedWarranty}
                            autoFocus
                            InputProps={{
                              inputProps: { textAlign: "right" },
                            }}
                          />
                          <TextField
                            name="ExtendedWarrantyEnd"
                            type="number"
                            id="ExtendedWarrantyEnd"
                            label="Extended Warranty End(In Months)"
                            variant="standard"
                            focused
                            value={values.ExtendedWarrantyEnd}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.ExtendedWarrantyEnd && !!errors.ExtendedWarrantyEnd}
                            helperText={touched.ExtendedWarrantyEnd && errors.ExtendedWarrantyEnd}
                            autoFocus
                            InputProps={{
                              inputProps: { textAlign: "right" },
                            }}
                          />
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="ExtendedWarranty"
                                  checked={values.ExtendedWarranty}
                                  onChange={handleChange}
                                />
                              }
                              label="Extended Warranty Applicable"
                              sx={{
                                marginTop: "20px",
                                "@media (max-width:500px)": {
                                  marginTop: 0,
                                },
                              }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="DemandBasis"
                                  checked={values.DemandBasis}
                                  onChange={handleChange}
                                />
                              }
                              label="Demand Basis"
                              sx={{
                                marginTop: "20px",
                                "@media (max-width:500px)": {
                                  marginTop: 0,
                                },
                              }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="OnSchedule"
                                  checked={values.OnSchedule}
                                  onChange={handleChange}
                                />
                              }
                              label="On Schedule"
                              sx={{
                                marginTop: "20px",
                                "@media (max-width:500px)": {
                                  marginTop: 0,
                                },
                              }}
                            />
                          </Box>
                        </>
                      )}

                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                    //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "2" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={StockinitialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    {CompanyAutoCode == "Y" ? (
                      <TextField
                        name="Code"
                        type="text"
                        id="Code"
                        label="Code"
                        placeholder="Auto"
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                        name="Code"
                        type="text"
                        id="Code"
                        label={
                          <>
                            Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        // required
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
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
                      name="Description"
                      type="text"
                      id="Description"
                      label={
                        <span>
                          Description{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                    />
                    <TextField
                      name="BoxQuantity"
                      type="text"
                      id="BoxQuantity"
                      label={
                        <span>
                          Box Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.BoxQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.BoxQuantity && !!errors.BoxQuantity}
                      helperText={touched.BoxQuantity && errors.BoxQuantity}
                      autoFocus
                    />
                    <TextField
                      name="PieceQuantity"
                      type="text"
                      id="PieceQuantity"
                      label={
                        <span>
                          Piece Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.PieceQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.PieceQuantity && !!errors.PieceQuantity}
                      helperText={touched.PieceQuantity && errors.PieceQuantity}
                      autoFocus
                    />
                    <TextField
                      name="PurchaseUOM"
                      type="text"
                      id="PurchaseUOM"
                      label={
                        <span>
                          Purchase UOM{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.PurchaseUOM}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.PurchaseUOM && !!errors.PurchaseUOM}
                      helperText={touched.PurchaseUOM && errors.PurchaseUOM}
                      autoFocus
                    />
                    <TextField
                      name="ConsumptionUOM"
                      type="text"
                      id="ConsumptionUOM"
                      label={
                        <span>
                          Purchase UOM{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.ConsumptionUOM}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ConsumptionUOM && !!errors.ConsumptionUOM}
                      helperText={touched.ConsumptionUOM && errors.ConsumptionUOM}
                      autoFocus
                    />
                    <TextField
                      name="ConversionQty"
                      type="number"
                      id="ConversionQty"
                      label={
                        <span>
                          Purchase UOM{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.ConversionQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ConversionQty && !!errors.ConversionQty}
                      helperText={touched.ConversionQty && errors.ConversionQty}
                      autoFocus
                    />

                    <TextField
                      name="GuidelinePrice"
                      type="number"
                      id="GuidelinePrice"
                      label={
                        <span>
                          Guideline Price (Box){" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.GuidelinePrice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.GuidelinePrice && !!errors.GuidelinePrice}
                      helperText={touched.GuidelinePrice && errors.GuidelinePrice}
                      autoFocus
                    />


                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                    //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
      </React.Fragment>
    </>
  );
};

export default EditItem;
