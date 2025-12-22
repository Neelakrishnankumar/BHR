import {
  Box,
  Checkbox,
  useTheme,
  Divider,
  Paper,
  Stack,
  TextField,
  FormControl,
  Popover,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
  InputBase,
  InputAdornment,
  Avatar,
  Tooltip,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import store from "../..";
import { fileUpload, imageUpload } from "../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import { tokens } from "../../Theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import Header from "../../ui-components/Header";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Footer from "../../ui-components/Footer";
import ChGPassWord from "../../assets/img/ChGPassWord.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { formGap } from "../../ui-components/utils";
import { Settingsvalidation } from "./validation";
import {
  ApprovalsettingspostData,
  BiometricpostData,
  CompanydetailpostData,
  getBiometricData,
  getSettingsData,
  SettingspostData,
  setttingsApprovalsData,
} from "../../store/reducers/Formapireducer";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const Approval = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  console.log(recID, "--recID");
  const { toggleSidebar, broken, rtl } = useProSidebar();

  var mode = params.Mode;
  var accessID = params.accessID;
  const Subscriptioncode = sessionStorage.getItem("SubscriptionCode");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const CompanyID = sessionStorage.getItem("compID");
  const Username = sessionStorage.getItem("UserName");
  const data = useSelector((state) => state.formApi.Data) || {};
  console.log(data, "--data");
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [Appname, setAppname] = useState("");
  const [author, setauthor] = useState("");
  const [Apikey, setApikey] = useState("");
  const [Url, setUrl] = useState("");
  const [Input, setInput] = useState("");
  const [pulling, setpulling] = useState("");
  const [time, settime] = useState("");
  const [errorMsgData, setErrorMsgData] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    if (data) {
      setAppname(data.ApplicationName);
      setauthor(data.Authorization || "");
      setApikey(data.ApiKey || "");
      setUrl(data.Url || "");
      setInput(data.Input || "");
      setpulling(data.PullingCycle || "");
      settime(data.DailyTime || "");
    }
  }, [data]);

  useEffect(() => {
    dispatch(
      setttingsApprovalsData({
        CompanyID,
      })
    );
  }, [location.key]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const style = {
    height: "55px",
    borderBottom: "2px solid #1769aa ",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
  };
  const initialvalues = {
    // RecordID: data.RecordID,
    hrPermission: data.PermisionHRManager == "Y" ? true : false,
    financePermission: data.PermisionPFinanceManager == "Y" ? true : false,
    projectPermission: data.PermisionProjectManager == "Y" ? true : false,
    facilityPermission: data.PermisionFacilityManager == "Y" ? true : false,

    Leavehr: data.LeaveHRManager == "Y" ? true : false,
    Leavefinance: data.LeaveFinanceManager == "Y" ? true : false,
    Leaveproject: data.LeaveProjectManager == "Y" ? true : false,
    Leavefacility: data.LeaveFacilityManager == "Y" ? true : false,

    ondutyhr: data.OnDutyHRManager == "Y" ? true : false,
    ondutyfinance: data.OnDutyFinanceManager == "Y" ? true : false,
    ondutyproject: data.OnDutyProjectManager == "Y" ? true : false,
    ondutyfacility: data.OnDutyFacilityManager == "Y" ? true : false,

    overtimehr: data.OverTimeHRManager == "Y" ? true : false,
    overtimefinance: data.OverTimeFinanceManager == "Y" ? true : false,
    overtimeproject: data.OverTimeProjectManager == "Y" ? true : false,
    overtimefacility: data.OverTimeFacilityManager == "Y" ? true : false,

    reghr: data.RegularizationHRManager == "Y" ? true : false,
    regfinance: data.RegularizationFinanceManager == "Y" ? true : false,
    regproject: data.RegularizationProjectManager == "Y" ? true : false,
    regfacility: data.RegularizationFacilityManager == "Y" ? true : false,

    expensehr: data.ExpanseEntryHRManager == "Y" ? true : false,
    expensefinance: data.ExpanseEntryFinanceManager == "Y" ? true : false,
    expenseproject: data.ExpanseEntryProjectManager == "Y" ? true : false,
    expensefacility: data.ExpanseEntryFacilityManager == "Y" ? true : false,

    saladvhr: data.SalaryAdvanceHRManager == "Y" ? true : false,
    saladvfinance: data.SalaryAdvanceFinanceManager == "Y" ? true : false,
    saladvproject: data.SalaryAdvanceProjectManager == "Y" ? true : false,
    saladvfacility: data.SalaryAdvanceFacilityManager == "Y" ? true : false,
  };
  // const [value, setValues] = React.useState({
  //     showPassword: false,
  // });
  // const handleClickShowPassword = () => {
  //     setValues({
  //         ...value,
  //         showPassword: !value.showPassword,
  //     });
  // };

  //settings password save
  const fnSave = async (values) => {
    console.log(values, "00000000000000000000");
    const recordIdToSend =
      data?.RecordID && data.RecordID !== "" ? data.RecordID : "-1";

    const idata = {
      // action: "update",
      //RecordID: data.RecordID || "" || recID,
      RecordID: recordIdToSend,
      CompanyID,
      PermisionHRManager: values.hrPermission == true ? "Y" : "N",
      PermisionProjectManager: values.projectPermission == true ? "Y" : "N",
      PermisionPFinanceManager: values.financePermission == true ? "Y" : "N",
      PermisionFacilityManager: values.facilityPermission == true ? "Y" : "N",

      LeaveHRManager: values.Leavehr == true ? "Y" : "N",
      LeaveProjectManager: values.Leaveproject == true ? "Y" : "N",
      LeaveFinanceManager: values.Leavefinance == true ? "Y" : "N",
      LeaveFacilityManager: values.Leavefacility == true ? "Y" : "N",

      OnDutyHRManager: values.ondutyhr == true ? "Y" : "N",
      OnDutyProjectManager: values.ondutyproject == true ? "Y" : "N",
      OnDutyFinanceManager: values.ondutyfinance == true ? "Y" : "N",
      OnDutyFacilityManager: values.ondutyfacility == true ? "Y" : "N",

      OverTimeHRManager: values.overtimehr == true ? "Y" : "N",
      OverTimeProjectManager: values.overtimeproject == true ? "Y" : "N",
      OverTimeFinanceManager: values.overtimefinance == true ? "Y" : "N",
      OverTimeFacilityManager: values.overtimefacility == true ? "Y" : "N",

      ExpanseEntryHRManager: values.expensehr == true ? "Y" : "N",
      ExpanseEntryProjectManager: values.expenseproject == true ? "Y" : "N",
      ExpanseEntryFinanceManager: values.expensefinance == true ? "Y" : "N",
      ExpanseEntryFacilityManager: values.expensefacility == true ? "Y" : "N",

      SalaryAdvanceHRManager: values.saladvhr == true ? "Y" : "N",
      SalaryAdvanceProjectManager: values.saladvproject == true ? "Y" : "N",
      SalaryAdvanceFinanceManager: values.saladvfinance == true ? "Y" : "N",
      SalaryAdvanceFacilityManager: values.saladvfacility == true ? "Y" : "N",

      RegularizationHRManager: values.reghr == true ? "Y" : "N",
      RegularizationProjectManager: values.regproject == true ? "Y" : "N",
      RegularizationFinanceManager: values.regfinance == true ? "Y" : "N",
      RegularizationFacilityManager: values.regfacility == true ? "Y" : "N",
    };
    const response = await dispatch(ApprovalsettingspostData({ idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // navigate(" /Apps/Approval");
      dispatch(
        setttingsApprovalsData({
          CompanyID,
        })
      );
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
          //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
          navigate("/Apps/HR");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {/* <Box m="10px">
        <Typography
          variant="h2"
          fontSize="1.2rem"
          fontWeight="bold"
          marginBottom={3}
        >
          Approval
        </Typography> */}
      {getLoading ? <LinearProgress /> : null}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Breadcrumbs
              maxItems={3}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                color="#0000D1"
                sx={{ cursor: "default" }}
                variant="h5"
              >
                Approval
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
      <Paper elevation={3} sx={{ margin: "10px" }}>
        <Formik
          initialValues={initialvalues}
          onSubmit={(values, setSubmitting, resetForm) => {
            console.log(values, "8888888888");

            setTimeout(() => {
              fnSave(values);
              // resetForm(); // Reset form after submission
            }, 100);
          }}
          // onSubmit={(values, setSubmitting) => {
          //     setTimeout(() => {
          //         fnSave(values);
          //     }, 100);
          // }}
          // validationSchema={Settingsvalidation}
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
            setFieldTouched,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* <Divider variant="fullWidth" sx={{ mt: "20px" }} /> */}
              {/* <Typography variant="h5" padding={1}>Biometric Integration:</Typography> */}

              <Box
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  1. Permission
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="hrPermission"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="financePermission"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="projectPermission"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="facilityPermission"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  2. Leave
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="Leavehr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="Leavefinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="Leaveproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="Leavefacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  3. On Duty
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="ondutyhr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="ondutyfinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="ondutyproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="ondutyfacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  4. Over Time
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="overtimehr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="overtimefinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="overtimeproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="overtimefacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  5. Regularization
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="reghr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="regfinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="regproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="regfacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  6. Expense
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="expensehr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="expensefinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="expenseproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="expensefacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{ gridColumn: "span 4", fontWeight: "bold" }}
                >
                  7. Salary Advance
                </Typography>

                <Box
                  sx={{
                    gridColumn: "span 2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //   gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="saladvhr"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="HR Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="saladvfinance"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Finance Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="saladvproject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Project Manager"
                  />

                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        name="saladvfacility"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Facility Manager"
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                padding={1}
                justifyContent="end"
                // mt="10px"
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
                  color={"warning"}
                  variant="contained"
                  onClick={() => resetForm()}
                  // onClick={() => {
                  //   navigate("/Apps/TR213/LeaveType");
                  // }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
      {/* </Box> */}
    </React.Fragment>
  );
};
export default Approval;
