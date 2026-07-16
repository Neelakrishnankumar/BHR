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
import { breadcrumbStyles } from "../../../Theme";

// import {
//   ManagerAppraisalPayload,
//   PeerAppraisalPayload,
//   SelfAppraisalPayload,
//   SingleFormikSkillAutocomplete,
//   SingleFormikSkillAutocompletePayload,
//   SubordinateAppraisalPayload,
// } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import { CheckinAutocomplete, HSNCategoryAutocomplete, HSNMasterAutocomplete } from "../../../ui-components/global/Autocomplete";

const EditItemCategory = () => {
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
  const parentID1 = params.parentID1;

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

  const [selectedHSNCategoryID, setSelectedHSNCategoryID] = useState(null);
  const curDate = new Date().toISOString().split("T")[0];
  // Load existing selected HSN Category ID so HSNMaster loads correctly
  useEffect(() => {
    if (Data && Data.HSNCategoriesRecordID) {
      setSelectedHSNCategoryID(Data.HSNCategoriesRecordID);
    } else {
      setSelectedHSNCategoryID(null);
    }
  }, [Data]);
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : ""; console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        const schema = Yup.object().shape({
          Description: Yup.string().trim().required(data.ItemCategory.Description).nullable(),
          HSNMaster: Yup.object().required(data.ItemCategory.HSNMaster).nullable(),
          HSNCategory: Yup.object().required(data.ItemCategory.HSNCategory).nullable(),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const ItemCategorySaveFn = async (values, delAction) => {
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
      ItemGroupID: parentID1,
      Date: mode === "A" ? curDate : Data.Date,
      Image: "",
      Code: values.Code,
      Description: values.Description || "",
      HSNCategoriesRecordID: values.HSNCategory.RecordID || "",
      HSNMasterRecordID: values.HSNMaster.RecordID || "",
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
          navigate(`/Apps/Secondarylistview/Item Group/${params.accessID}/${params.screenName}/${params.parentID2}/${params.parentID1}`,
            { state: state }
          );
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    Code: Data.Code || "",
    Description: Data.Description || "",
    HSNCategory: Data.HSNCategoriesRecordID
      ? {
        RecordID: Data.HSNCategoriesRecordID,
        HSNCategory: Data.HSNCategoriesCode,
      }
      : null,
    HSNMaster: Data.HSNMasterRecordID
      ? {
        RecordID: Data.HSNMasterRecordID,
        HSNMaster: Data.HSNMasterCode,
      }
      : null,
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
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
        <Paper
          elevation={0}
          sx={{
            mx: 2,
            mt: 1,
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
            {/* Left */}
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
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    px: 1,
                    py: 0.2,
                  }}
                >
                  {mode == "A" ? "New Item Category" : "Edit Item Category"}
             
                </Typography>

                <Breadcrumbs
                  separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                  sx={breadcrumbStyles.separator}
                >
                  <Typography
                    sx={breadcrumbStyles.item}
                    onClick={() => navigate("/Apps/TR315/Item%20Group")}
                  >
                    List Of Item Group ({state.BreadCrumb1})
                  </Typography>

                  <Typography
                    sx={breadcrumbStyles.item}
                    onClick={() => navigate(-1)}
                  >
                    {mode === "E"
                      ? `List Of Item Category (${state.BreadCrumb2})`
                      : "List Of Item Category"}
                  </Typography>

                  <Typography sx={breadcrumbStyles.active}>
                    {mode === "A"
                      ? "New"
                      : mode === "E"
                        ? "Edit"
                        : "View"}
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Box>

            {/* Right */}
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
              m: 2,
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              background: "#fff",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={5}>
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
                🗂️
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#0D94885"
                >
                   Item Category
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Create and manage item category details
                </Typography>
              </Box>
            </Box>

            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemCategorySaveFn(values, resetForm);
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
                    gridTemplateColumns="repeat(2,minmax(0,1fr))"
                    gap={2.5}
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
                        variant="outlined"
                        size="small"
                        //  focused
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
                        variant="outlined"
                        size="small"
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
                      variant="outlined"
                      size="small"
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                    />

                    <HSNCategoryAutocomplete
                      id="HSNCategory"
                      name="HSNCategory"
                      //label="HSNCategory"
                      label={
                        <span>
                          HSN Category
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="outlined"
                      size="small"
                      value={values.HSNCategory}
                      onChange={(newValue) => {
                        setFieldValue("HSNCategory", newValue);

                        if (newValue) {
                          console.log(newValue.RecordID, "HSNCategory RecordID");
                          setSelectedHSNCategoryID(newValue.RecordID);
                        } else {
                          setSelectedHSNCategoryID(null);
                        }
                        //  Reset HSNMaster when category changes
                        setFieldValue("HSNMaster", null);
                        setFieldTouched("HSNMaster", false);
                      }}
                      error={!!touched.HSNCategory && !!errors.HSNCategory}
                      helperText={touched.HSNCategory && errors.HSNCategory}
                      InputLabelProps={{ shrink: true }}
                      url={`${listViewurl}?data=${JSON.stringify({
                        Query: {
                          AccessID: "2136",
                          ScreenName: "Item Category",
                          VerticalLicense: Subscriptionlastthree,
                          Filter: `CompanyID=${CompanyID}`,
                          Any: "",
                        },
                      })}`}
                    // url={`${listViewurl}?data={"Query":{"AccessID":"2136","ScreenName":"Item Category","Filter":"CompanyID=${CompanyID}","Any":""}}`}

                    />

                    <HSNMasterAutocomplete
                      id="HSNMaster"
                      name="HSNMaster"
                      label={
                        <>
                          HSN Master
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }

                      size="small"
                      value={values.HSNMaster}
                      onChange={(newValue) => {
                        setFieldValue("HSNMaster", newValue);
                        console.log(newValue, "--newvalue HSNMaster");
                        console.log(newValue.RecordID, "HSNMaster RecordID");
                      }}
                      error={!!touched.HSNMaster && !!errors.HSNMaster}
                      helperText={touched.HSNMaster && errors.HSNMaster}
                      url={`${listViewurl}?data=${JSON.stringify({
                        Query: {
                          AccessID: "2135",
                          ScreenName: "Item Category",
                          VerticalLicense: Subscriptionlastthree,
                          Filter: `CompanyID=${CompanyID}`,
                          Any: "",
                        },
                      })}`}
                    // url={`${listViewurl}?data={"Query":{"AccessID":"2135","ScreenName":"Item Category","Filter":"CompanyID=${CompanyID} AND HSNCategoryID=${selectedHSNCategoryID}","Any":""}}`}
                    />

                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
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
                      // focused
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
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={3}
                      sx={{ mt: 1 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
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
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
                      //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={4}
                  >
                    <LoadingButton
                      loading={isLoading}
                      type="submit"
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#0D9488",
                        "&:hover": {
                          bgcolor: "#0F766E",
                        },
                      }}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
                      }}
                    >
                      Back
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

export default EditItemCategory;
