import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,
  Grid
} from "@mui/material";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import DeckIcon from "@mui/icons-material/Deck";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import {
  resetTrackingData,
  Attendance,
  AttendanceProcess,
  auditUserActivityGET,
  auditScreennameGET,
} from "../../../store/reducers/Formapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
import { useDispatch } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendancePDF from "../pdf/AttendancePdf";
import { toast } from "react-hot-toast";
import { Employeeautocomplete, MultiFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect } from "react";
import axios from "axios";
import AuditPDF from "../pdf/AuditPDF";
import { getConfig } from "../../../config";


const EditAudit = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isManager = sessionStorage.getItem("isManager");
  var recID = params.id;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const EmpName = sessionStorage.getItem("EmpName");
  const EmpId = sessionStorage.getItem("EmpId");
  const CompanyID = sessionStorage.getItem("compID");
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);

  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  const company = sessionStorage.getItem("company");
console.log(company, "--company");

  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";


const HeaderImg = sessionStorage.getItem("CompanyHeader");
const FooterImg = sessionStorage.getItem("CompanyFooter");

console.log("HeaderImg", HeaderImg, FooterImg);
const config = getConfig();
const baseurlUAAM = config.UAAM_URL;


  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  console.log("AttendanceData", AttendanceData);

  //apply getData
  const Auditgetdata = useSelector((state) => state.formApi.Auditgetdata);


  //ScreenName GET
  const AuditScreennamegetdata = useSelector((state) => state.formApi.AuditScreennamegetdata);
  console.log("AuditScreennamegetdata", AuditScreennamegetdata);
  
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(31);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [errorMsgData, setErrorMsgData] = useState(null);
  
const [finalAuditData, setFinalAuditData] = useState([]);
  console.log("Auditgetdata", Auditgetdata);
  console.log("finalAuditData", finalAuditData);
//user
const [userLookupData, setUserLookupData] = useState([]);
console.log("FULL 2143 USER LOOKUP:", userLookupData);

const Getuserdata = userLookupData;
console.log(Getuserdata, "--Getuserdata");

//Employee
const [employeeLookupData, setEmployeeLookupData] = useState([]);
console.log("FULL 2117 employeeLookupDataLOOKUP:", employeeLookupData);

const Getemployeedata = employeeLookupData;
console.log(Getemployeedata, "--Getemployeedata");

//User
useEffect(() => {
  const fetchUsers = async () => {
    const payload = {
      Query: {
        AccessID: "2143",
        ScreenName: "User",
         VerticalLicense: Subscriptionlastthree,
        Filter: `CompanyID=${CompanyID}`,
        Any: "",
      },
    };

    const res = await axios.get(listViewurl, {
  params: {
    data: JSON.stringify(payload),
  },
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
  },
});

  console.log(res.data, "--res.data");

    setUserLookupData(res.data.Data.rows); // ✅ FULL API RESPONSE
  };

  if (CompanyID) fetchUsers();
}, [CompanyID]);

//Employee
useEffect(() => {
  const fetchEmployee = async () => {
    const payload = {
      Query: {
        AccessID: "2117",
        ScreenName: "Employee",
         VerticalLicense: Subscriptionlastthree,
        Filter: `CompanyID='${CompanyID}' GROUP BY RecordID`,
        Any: "",
      },
    };

    const res = await axios.get(listViewurl, {
  params: {
    data: JSON.stringify(payload),
  },
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
  },
});

  console.log(res.data, "--res.data");

    setEmployeeLookupData(res.data.Data.rows); // ✅ FULL API RESPONSE
  };

  if (CompanyID) fetchEmployee();
}, [CompanyID]);

//ScreenName_Get
useEffect(() => {
    dispatch(auditScreennameGET());
  }, [dispatch]); 


function handleOk() {
  const finalData = Auditgetdata.map((apiItem, index) => {
    const screen = AuditScreennamegetdata.find(
      (s) => s.Code?.toLowerCase() === apiItem.AccessID?.toLowerCase()
    );

    const user = userLookupData.find(
      (u) => String(u.RecordID) === String(apiItem.UserID)
    );

    const employee = employeeLookupData.find(
      (e) => String(e.RecordID) === String(apiItem.UserID)
    );

    const isUser = apiItem.Type === "B";
    const isEmployee = apiItem.Type === "E";
console.log(isEmployee,isUser, "---isUserisEmployee,isUser");

    return {
      id: apiItem.RecordID ?? index + 1,
      SLNO: apiItem.SLNO ?? index + 1,
      Date: apiItem.Date,
      CompanyName: company,
      ScreenName: screen ? screen.Desc1 : apiItem.AccessID,

      // ✅ Name resolution (with fallback)
      Name: isUser
        ? user?.Name 
        : isEmployee
        ? employee?.Name 
        :  "",

        // Name: apiItem.Type === "B"?user?.Name :apiItem.Type === "E"?"ESS":"",
      Activity: apiItem.Activity,

      // ✅ Module resolution (never empty)
      // Module: isUser
      //   ? "Back Office"
      //   : isEmployee
      //   ? "ESS"
      //   : user
      //   ? "Back Office"
      //   : employee
      //   ? "ESS"
      //   : "Unknown",
      Module: apiItem.Type === "B"?"BOS":apiItem.Type === "E"?"ESS":""
    };
  });

  setFinalAuditData(finalData);
  console.log("✅ FINAL AUDIT GRID DATA:", finalData);
}



  function AttendanceTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
           sx={{
              fontWeight: 700,
            }}
          >List Of Audits </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }
  const [proData, setproData] = useState(null);
  const [uservalue,setUservalue] = useState([]);

console.log(uservalue, "--uservalue");



  const AuditColumn = [
  { field: "SLNO", headerName: "SL#", width: 30,align: "right" },
 {field: "Module",headerName: "Module",width: 150},
  // { field: "CompanyName", headerName: "Company", width: 200 },
  { field: "ScreenName", headerName: "Screen Name", width: 200 },
  { field: "Name", headerName: "User", width: 200 },
  // { field: "UserName", headerName: "User", width: 160 },
  // { field: "EmployeeName", headerName: "Employee", width: 160 },
  { field: "Activity", headerName: "Activity", width: 130 },
  
   { field: "Date", headerName: "Date Time", width: 120,align: "right" },

];
 

  /***********Attendance ************/

const formatLocalDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const today = new Date();
console.log(today, "--find today");

const firstDay = formatLocalDate(
  new Date(today.getFullYear(), today.getMonth(), 1)
);

const lastDay = formatLocalDate(
  new Date(today.getFullYear(), today.getMonth() + 1, 0)
);

console.log(firstDay, "--find firstDay"); // ✅ 2026-01-01
console.log(lastDay, "--find lastDay");   // ✅ 2026-01-31
  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
      // company: [],
  user: [],
  Employee: [],
  fromdate: "",
  todate: "",
  };

  const [exploreLoading, setExploreLoading] = useState(false);

//   const attendaceFnSave = async (values) => {
//   console.log(values, "=====values");

//   setExploreLoading(true); // ✅ Start loader

//   try {
//     const data = {
//       UserID: values.user?.map(u => u.RecordID).join(","),
//       EmployeeID: values.Employee?.map(e => e.RecordID).join(","),
//       FromDate: values.fromdate,
//       Todate: values.todate,
//       CompanyID: CompanyID
//     };

//     console.log(data, "=====DATA");

//     const responsedata = await dispatch(auditUserActivityGET({ data }));
//     console.log(responsedata.payload.Data, "=====responsedata");

//     const finalData = responsedata.payload.Data.map((apiItem, index) => {
//       const screen = AuditScreennamegetdata.find(
//         (s) => s.Code?.toLowerCase() === apiItem.AccessID?.toLowerCase()
//       );

//       const user = userLookupData.find(
//         (u) => String(u.RecordID) === String(apiItem.UserID)
//       );

//       const employee = employeeLookupData.find(
//         (e) => String(e.RecordID) === String(apiItem.UserID)
//       );

//       const type = String(apiItem.Type).toUpperCase();

//       return {
//         id: apiItem.RecordID ?? index + 1,
//         SLNO: apiItem.SLNO ?? index + 1,
//         Date: apiItem.Date,
//         CompanyName: company,
//         ScreenName: screen?.Desc1 || apiItem.AccessID,

//         Name:
//           type === "B"
//             ? user?.Name || "-"
//             : type === "E"
//             ? employee?.Name || "-"
//             : "-",

//         Activity: apiItem.Activity,

//         Module:
//           type === "B"
//             ? "BOS"
//             : type === "E"
//             ? "ESS"
//             : "Unknown",
//       };
//     });

//     setFinalAuditData(finalData);
//     console.log("FINAL AUDIT GRID DATA:", finalData);
//   } catch (err) {
//     console.error("Audit fetch error", err);
//   } finally {
//     setExploreLoading(false); // ✅ Stop loader
//   }
// };

  const attendaceFnSave = async (values) => {
        console.log(values, "=====values");
         setExploreLoading(true);
    const data = {
      UserID: values.user?.map(u => u.RecordID).join(","), 
      EmployeeID: values.Employee?.map(e => e.RecordID).join(","),
      FromDate: values.fromdate,
      Todate: values.todate,
      CompanyID: CompanyID
    };
    console.log(data, "=====DATA");
    const responsedata=await dispatch(auditUserActivityGET({ data }));
       console.log(responsedata.payload.Data, "=====responsedata");
      //  return;
const finalData = responsedata.payload.Data.map((apiItem, index) => {
    const screen = AuditScreennamegetdata.find(
      (s) => s.Code?.toLowerCase() === apiItem.AccessID?.toLowerCase()
    );

    const user = userLookupData.find(
      (u) => String(u.RecordID) === String(apiItem.UserID)
    );

    const employee = employeeLookupData.find(
      (e) => String(e.RecordID) === String(apiItem.UserID)
    );

    const isUser = apiItem.Type === "B";
    const isEmployee = apiItem.Type === "E";
console.log(isEmployee,isUser, "---isUserisEmployee,isUser");

    return {
      id: apiItem.RecordID ?? index + 1,
      SLNO: apiItem.SLNO ?? index + 1,
      Date: apiItem.Date,
      CompanyName: company,
      ScreenName: screen ? screen.Desc1 : apiItem.AccessID,
      Name: isUser
        ? user?.Name 
        : isEmployee
        ? employee?.Name 
        :  "",
     Activity: apiItem.Activity,
      Module: apiItem.Type === "B"?"BOS":apiItem.Type === "E"?"ESS":""
    };
  });

  setFinalAuditData(finalData);
  console.log("✅ FINAL AUDIT GRID DATA:", finalData);
   setExploreLoading(false);
    // handleOk();
    // setButtonVisible(true)
  };

  // const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") navigate("/");
        if (props === "Close") navigate("/Apps/TR217/EditAudit");
      }
    });
  };
  const [empData, setempData] = useState(null);
  const handleSelectionEmployeeChange = (newValue) => {
    if (newValue) {
      setempData(newValue);
      console.log(newValue.RecordID, "--selectedproductid");
    } else {
      setempData(null);
    }
    setUseCurrentEmp(false);
  };

  let employeeFilter = `CompanyID='${CompanyID}'`;
  if (proData) {
    employeeFilter += ` AND ProjectID='${proData.RecordID}' GROUP BY RecordID`;
  }
  if (!proData) {
    employeeFilter = `CompanyID='${CompanyID}' GROUP BY RecordID`;
  }

  const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: proData ? "2024" : "2117", // or "2101" if you're using EMPLOYEETEAMS
        ScreenName: "Employee",
        VerticalLicense: Subscriptionlastthree,
        Filter: employeeFilter,
        Any: "",
        CompId: "",
      },
    })
  )}`;

  console.log(proData, "--find proData");

  const [useCurrentEmp, setUseCurrentEmp] = useState(false);


const [openDialog, setOpenDialog] = React.useState(false);
const [dialogMessage, setDialogMessage] = React.useState("");


const getDiffInDays = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const diffTime = toDate.getTime() - fromDate.getTime();
  return diffTime / (1000 * 60 * 60 * 24);
};




  return (
    <React.Fragment>
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
        <Box display="flex" justifyContent="space-between" p={1}>

     

          <Box display="flex" borderRadius="3px" alignItems="center">
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
                                                        Audit
                                                        </Typography>
          </Box>
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
          initialValues={AttInitialvalues}
          enableReinitialize={true}
  //         onSubmit={(values, { resetForm }) => {

  //   const payload = {
  //     CompanyID: values.company?.map(c => c.CompanyID).join(","), 
  //     UserID: values.user?.map(u => u.UserID).join(","), 
  //     EmployeeID: values.Employee?.map(e => e.EmployeeID).join(","),

  //     ActivityType: "B",

  //     FromDate: values.fromdate,
  //     Todate: values.todate,
  //   };

  //   dispatch(auditUserActivityGET(payload));

  // }}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              attendaceFnSave(values, resetForm);
            }, 100);
          }}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            isSubmitting,
            values,
            handleSubmit,
            resetForm, 
            setFieldValue
          }) => (
            <form
              onSubmit={handleSubmit}
              // onReset={() => {
              //   resetForm();
              //   setproData(null);
              //   setempData(null);
              //   setFieldValue("attmonth",currentMonthNumber)
              //   setFieldValue("attyear",currentYear)
              //   sessionStorage.removeItem("attmonth");
              //   sessionStorage.removeItem("attyear");
              //   sessionStorage.removeItem("empData");
              //   sessionStorage.removeItem("proData");
              //   dispatch(resetTrackingData());
              // }}
            >  
            
              <Box p={2}>
  <Grid container spacing={2} alignItems="center">

    {/* From Date */}
    <Grid item xs={12} sm={6} md={2.2}>
       <TextField
  fullWidth
  variant="outlined"
  size="small"
  type="date"
  id="fromdate"
  name="fromdate"
  label="From Date"
  value={values.fromdate}
   InputLabelProps={{ shrink: true }}
  // focused
  onChange={(e) => {
    handleChange(e);
    sessionStorage.setItem("fromdate", e.target.value);
  }}
  // sx={{ width: 600 }}
/>
    </Grid>

    {/* To Date */}
    <Grid item xs={12} sm={6} md={2.2}>
     
 <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
>
  <DialogTitle>Invalid Date Selection</DialogTitle>

  <DialogContent>
    <DialogContentText>
      {dialogMessage}
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      onClick={() => {
        setFieldValue("todate", "");      // ✅ clear To Date
        sessionStorage.removeItem("todate");
        setOpenDialog(false);
      }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>


<TextField
  fullWidth
  variant="outlined"
  size="small"
  type="date"
  id="todate"
  name="todate"
  label="To Date"
   InputLabelProps={{ shrink: true }}
  value={values.todate}
  // focused
  onChange={(e) => {
    const selectedToDate = e.target.value;

    // 🚫 Ignore empty changes (calendar open / clear)
    if (!selectedToDate) {
      handleChange(e);
      return;
    }

    const fromDate = values.fromdate;

    if (!fromDate) {
      setDialogMessage("Please select From Date first");
      setOpenDialog(true);
      return;
    }

    const diffInDays = getDiffInDays(fromDate, selectedToDate);

    if (diffInDays < 0) {
      setDialogMessage("To Date cannot be before From Date");
      setOpenDialog(true);
      return;
    }

    if (diffInDays > 30) {
      setDialogMessage("You can select only 1 month date range");
      setOpenDialog(true);
      return;
    }

    handleChange(e);
    sessionStorage.setItem("todate", selectedToDate);
  }}
  inputProps={{
    min: values.fromdate || undefined,
  }}
  // sx={{ width: 600 }}
/>
    </Grid>

    {/* Company */}
    {/* <Grid item xs={12} sm={6} md={2}>
     <MultiFormikOptimizedAutocomplete
                    // sx={{ width: 500 }}
                    name="company"
                    label="Company"
                    id="company"
                    value={values.company}
                    // onChange={handleSelectionProjectChange}
                    onChange={(e,newValue) => {
                       if (newValue.length > 3) {
    return; // ❌ block 4th selection
  }
                       setFieldValue("company", newValue);
                      // setCompanyvalue(newValue);
          
                    }}
                    error={!!touched.company && !!errors.company}
                    helperText={touched.company && errors.company}
                    url={`${listViewurl}?data=${encodeURIComponent(
                      JSON.stringify({
                        Query: {
                          AccessID: "2030",
                          ScreenName: "Company",
                          Filter: "",
                          Any: "",
                        },
                      })
                    )}`}
                  />
    </Grid> */}

    {/* User */}
    <Grid item xs={12} sm={6} md={2.2}>
    <MultiFormikOptimizedAutocomplete
                    // sx={{ width: 500 }}
                    name="user"
                    label="User"
                    id="user"
                    value={values.user}
                    // value={uservalue}
                    // onChange={handleSelectionProjectChange}
                    onChange={(e,newValue) => {
                       if (newValue.length > 3) {
    return; // ❌ block 4th selection
  }
                       setFieldValue("user", newValue);
                      setUservalue(newValue);
                      console.log(uservalue, "643--uservalue");
                      
          
                    }}
                    error={!!touched.user && !!errors.user}
                    helperText={touched.user && errors.user}
                    url={`${listViewurl}?data=${encodeURIComponent(
                      JSON.stringify({
                        Query: {
                          AccessID: "2143",
                          ScreenName: "User",
                           VerticalLicense: Subscriptionlastthree,
                          Filter: `CompanyID=${CompanyID}`,
                          Any: "",
                        },
                      })
                    )}`}
                  />
    </Grid>

    {/* Employee */}
    <Grid item xs={12} sm={6} md={2.2}>
      <MultiFormikOptimizedAutocomplete
        fullWidth
        name="Employee"
        label="Employee"
        value={values.Employee}
        // onChange={(e, newValue) => {
        //   setFieldValue("Employee", newValue);
        //   setEmployeevalue(newValue);
        // }}
        onChange={(e, newValue) => {
  if (newValue.length > 3) {
    return; // ❌ block 4th selection
  }

  setFieldValue("Employee", newValue);
  // setEmployeevalue(newValue);
}}
        url={employeeUrl}
      />
    </Grid>

    {/* Buttons */}
    <Grid
      item
      xs={12}
      md={2}
      display="flex"
      justifyContent="flex-end"
      gap={1}
      ml={10}
    >
      <Button type="submit"
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
        Apply
      </Button>

  {/* <Button 
  onClick={handleOk}
   variant="contained" color="secondary">
        ok
      </Button> */}
      <Button
       type="reset" 
       variant="contained" 
       color="error"
        sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        color: "#ffff",
                        // bgcolor: "#0D9488",
                        "&:hover": {
                          color: "#ffff",
                          // bgcolor: "#0F766E",
                        },
                      }}
        onClick={() => {
    resetForm();                 // ✅ Clear Formik values
    setFinalAuditData([]);       // ✅ Clear DataGrid
    setUservalue([]);            // ✅ Clear User lookup state (if used)
    // setEmployeevalue([]);      // ✅ If you have employee local state

    // Clear session storage
    sessionStorage.removeItem("fromdate");
    sessionStorage.removeItem("todate");

    console.log("Form Reset Done");
  }}
       >
        Reset
      </Button>

      {/* <PDFDownloadLink
        // document={<AttendancePDF filters={filters} />}
        fileName="Attendance_Report.pdf"
      >
        <PictureAsPdfIcon sx={{ fontSize: 26, color: "#d32f2f" }} />
      </PDFDownloadLink> */}
      <PDFDownloadLink
                      document={
                        <AuditPDF
                         data={finalAuditData}
                          filters={{
                            FromDate: values.fromdate || "",
                            ToDate: values.todate || "",
                            Imageurl: baseurlUAAM,
                            HeaderImg: HeaderImg,
                            FooterImg: FooterImg
                          }}
                        />
                      }
                      fileName={`Audit_Report_${empData?.Name || "Employee"
                        }.pdf`}
                      style={{ color: "#d32f2f", cursor: "pointer" }}
                    >
                      {({ loading }) =>
                        loading ? (
                          <PictureAsPdfIcon
                            sx={{ fontSize: 24, opacity: 0.5 }}
                          />
                        ) : (
                          <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        )
                      }
                    </PDFDownloadLink>
    </Grid>

  </Grid>
</Box>

              <Box sx={{ gridColumn: "span 4",p: 1 }}>
                <Box
                  height="500px"
                  // height={dataGridHeight}
                  // marginTop={2}
                  sx={{
                    "& .MuiDataGrid-root": {
                      // border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      // borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.blueAccent[800],
                      // borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      // borderTop: "none",
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
                              // backgroundColor: "#d0edec",
                              backgroundColor: "",
                              color: "", // Color for even rows
                            },
                    "& .weekoff-row": {
                      backgroundColor: "#f2acb7", // light red
                      color: "#b71c1c", // dark red text
                    },
                    "& .holiday-row": {
                      backgroundColor: "#c9f5cc", // light green
                      color: "#1b5e20", // dark green text
                    },
 "& .MuiDataGrid-columnHeaderTitle": {
                              color: colors.blueAccent[900],
                              fontWeight: 600,
                            },
                      /* ✅ PAGINATION STYLES (WHITE COLOR) */
                            "& .MuiTablePagination-root": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-selectLabel": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-displayedRows": {
                              color: "#fff",
                            },
                     /* Dropdown icon */
                            "& .MuiTablePagination-selectIcon": {
                              color: "#fff",
                            },

                            /* Left & Right arrow buttons */
                            "& .MuiTablePagination-actions button": {
                              color: "#fff",
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
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    rows={finalAuditData}
                    columns={AuditColumn}
                    disableSelectionOnClick
                    getRowId={(row) => row.SLNO}
                    pageSize={pageSize}
                    page={page}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onPageChange={(newPage) => setPage(newPage)}
                    onCellClick={(params) => { }}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                      Toolbar: AttendanceTool,
                    }}
                    onStateChange={(stateParams) =>
                      setRowCount(stateParams.pagination.rowCount)
                    }
                    loading={exploreLoading}
                    localeText={{
                      noRowsLabel: exploreLoading ? "Loading audit data..." : "No records found"
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    // getRowClassName={(params) =>
                    //   params.indexRelativeToCurrentPage % 2 === 0
                    //     ? "odd-row"
                    //     : "even-row"
                    // }
                    // getRowClassName={(params) => {
                    //   const status = params.row.Status;
                    //   if (status === "WeekOff") return "weekoff-row";
                    //   if (status === "Holiday") return "holiday-row";
                    //   return params.indexRelativeToCurrentPage % 2 === 0
                    //     ? "odd-row"
                    //     : "even-row";
                    // }}
                  />
                </Box>
                {/* <Box
                  display="flex"
                  flexDirection="row"
                  padding="15px"
                  gap={formGap}
                >
                  <Chip
                    icon={<AlarmOffIcon color="primary" />}
                    label="WeekOff"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#f2acb7",
                      borderColor: "#ef5350",
                    }}
                  />
                  <Chip
                    icon={<DeckIcon color="primary" />}
                    label="Holiday"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#c9f5cc",
                      borderColor: "#66bb6a",
                    }}
                  />
                </Box> */}
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default EditAudit;
