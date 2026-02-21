import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
} from "@mui/material";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import {
  explorePostData,
  fetchApidata,
  postApidata,
  postApidatawol,
  getDeployment,
  postDeployment,
  invoiceExploreGetData,
  postData,
  resetTrackingData,
  empAttendance,
  Attendance,
  AttendanceProcess,
  timeSheet,
  timeSheetPostData,
  timeSheetreport,
} from "../../../store/reducers/Formapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  // DataGrid,
  GridToolbarContainer,
  // GridToolbarColumnsButton,
  // GridToolbarFilterButton,
  // GridToolbarExport,
  // GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Formik, Field } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import TimeSheetPDF from "../pdf/TimeSheetPdf";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import {
  CheckinAutocomplete,
  Employeeautocomplete,
  MultiFormikOptimizedAutocomplete,
  Productautocomplete,
} from "../../../ui-components/global/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TimeSheetreportpdf from "../pdf/TimesheetReportpdf";
//import TimeSheetreportpdf from "../../reports/TimesheetReportpdf";
import { getConfig } from "../../../config";
import TimesheetReportExcel from "../pdf/TimesheetReportExcel";
import { FaFileExcel } from "react-icons/fa";



const Edittimesheetreport = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const mode = params.Mode;
  const dispatch = useDispatch();
  const isManager = sessionStorage.getItem("isManager");
  const EMPNAME = sessionStorage.getItem("EmpName");
  var recID = params.id;
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewColumn = useSelector((state) => state.listviewApi.columnData);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  // const empAttendanceData = useSelector(
  //   (state) => state.formApi.empAttendanceData
  // );
  // console.log("empAttendanceData", empAttendanceData);
  const { Month, Year } = location.state || {};

  console.log(Month, "Received Month");
  console.log(Year, "Received Year");

  const AttendanceData = useSelector((state) => state.formApi.timeSheetData);
  const projectName = useSelector((state) => state.formApi.projectName);
  const managerName = useSelector((state) => state.formApi.managerName);
  console.log("AttendanceData", AttendanceData);
  const CompanyID = sessionStorage.getItem("compID");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = tokens(theme.palette.mode);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  console.log(formattedDate);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [empData, setempData] = useState(null);
  const [selectedPro, setSelectedPro] = useState([]);
  useEffect(() => {
    dispatch(resetTrackingData());
  }, []);
  const [errorMsgData, setErrorMsgData] = useState(null);

  // useEffect(() => {
  //     fetch(process.env.PUBLIC_URL + "/validationcms.json")
  //         .then((res) => {
  //             if (!res.ok) throw new Error("Failed to fetch validationcms.json");
  //             return res.json();
  //         })
  //         .then((data) => {
  //             setErrorMsgData(data);
  //         })
  //         .catch((err) => console.error("Error loading validationcms.json:", err));
  // }, []);
  // useEffect(() => {
  //     const savedProData = sessionStorage.getItem("proData");
  //     const savedEmpData = sessionStorage.getItem("empData");

  //     const savedCheckboxes = {
  //         checkbox1: sessionStorage.getItem("checkbox1") === "true",
  //         checkbox2: sessionStorage.getItem("checkbox2") === "true",
  //         checkbox3: sessionStorage.getItem("checkbox3") === "true",
  //         checkbox4: sessionStorage.getItem("checkbox4") === "true",
  //         checkbox5: sessionStorage.getItem("checkbox5") === "true",
  //         checkbox6: sessionStorage.getItem("checkbox6") === "true",
  //         checkbox7: sessionStorage.getItem("checkbox7") === "true",
  //         checkbox8: sessionStorage.getItem("checkbox8") === "true",
  //     };

  //     const pro = savedProData ? JSON.parse(savedProData) : null;
  //     const emp = savedEmpData ? JSON.parse(savedEmpData) : null;

  //     setSelectedPro(pro);
  //     setempData(emp);

  //     const projectID = pro
  //         ? Array.isArray(pro)
  //             ? pro.map(p => p.RecordID).join(',')
  //             : pro.RecordID
  //         : "";
  //     const employeeID = emp?.RecordID || "";

  //     // Build TaskSource and Status arrays
  //     const taskSourceArr = [];
  //     if (savedCheckboxes.checkbox1) taskSourceArr.push("S");
  //     if (savedCheckboxes.checkbox2) taskSourceArr.push("M");
  //     if (savedCheckboxes.checkbox3) taskSourceArr.push("SH");

  //     const statusArr = [];
  //     if (savedCheckboxes.checkbox4) statusArr.push("N", "SH", "A");
  //     if (savedCheckboxes.checkbox5) statusArr.push("AP");
  //     if (savedCheckboxes.checkbox6) statusArr.push("C");
  //     if (savedCheckboxes.checkbox7) statusArr.push("AS", "SH");
  //     if (savedCheckboxes.checkbox8) statusArr.push("I");

  //     // Build AttendanceFilter string
  //     let attendanceFilter = `EmployeeID=${employeeID} AND ProjectID=${projectID} AND CompanyID=${CompanyID}`;
  //     // let AttendanceFilter = `EmployeeID=${useCurrentEmp ? EMPID : empData.RecordID} AND ProjectID IN(${projecID})`;
  //     if (taskSourceArr.length && statusArr.length) {
  //         attendanceFilter += ` AND (TaskSource IN(${taskSourceArr.map(v => `'${v}'`).join(',')}) AND Status IN(${statusArr.map(v => `'${v}'`).join(',')}))`;
  //     } else if (taskSourceArr.length) {
  //         attendanceFilter += ` AND TaskSource IN(${taskSourceArr.map(v => `'${v}'`).join(',')})`;
  //     } else if (statusArr.length) {
  //         attendanceFilter += ` AND Status IN(${statusArr.map(v => `'${v}'`).join(',')})`;
  //     }

  //      dispatch(timeSheetreport({ data: { AttendanceFilter: attendanceFilter } }));
  // }, []);

  const handleUnlock = async () => {
    const idata = {
      action: "update",
      DailyTaskRecordID: selectedRow?.RecordID,
      ApprovedBy: EMPID,
      ApprovedStatus: "",
      DateTime: formattedDate,
      Remarks: reason,
    };

    try {
      const response = await dispatch(timeSheetPostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(timeSheet({ data: getData }));
        //handleDialogClose();
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      console.error("Error during timesheet post:", error);
      toast.error("Something went wrong!");
    }
  };

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
          <Typography>List of Tasks</Typography>
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

  const AttColumn = [
    //         {
    //     field: "serialNo",
    //     headerName: "SL#",
    //     width: 40,
    //     sortable: false,
    //     filterable: false,
    //     disableColumnMenu: true,
    //     renderCell: (params) => {
    //       return params.api.getRowIndex(params.id) + 1;
    //     },
    //   },
    {
      field: "slno",
      headerName: "SL#",
      width: 50,
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
    },
    {
      field: "RecordID",
      headerName: "RecordID",
      width: 80,
      hide: true,
    },
    {
      field: "Code",
      headerName: "Code",
      width: 130,
      hide: true,
    },
    {
      field: "Date",
      headerName: "Date",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "ProjectName",
      headerName: "ProjectName",
      headerAlign: "center",
      width: 130,
    },
    {
      field: "Description",
      headerName: "Description",
      headerAlign: "center",
      width: 600,
      renderCell: (params) => {
        const description = params.row.Description || "";
        const comments = params.row.Comments || "";
        const combinedText = `${description} || ${comments}`;

        return (
          <Tooltip title={combinedText} placement="top-start" arrow>
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {combinedText}
            </div>
          </Tooltip>
        );
      },
    },

    //    {
    //   field: "Description",
    //   headerName: "Description",
    //   width: 600,
    //   renderCell: (params) => {
    //     const description = params.row.Description || "";
    //     const comments = params.row.Comments || "";
    //     const combinedText = `${description} || ${comments}`;

    //     return (
    //       <div
    //         style={{
    //           width: "100%",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //           whiteSpace: "nowrap",
    //         }}
    //         title={combinedText}
    //       >
    //         {combinedText}
    //       </div>
    //     );
    //   },
    // },

    {
      field: "ProjectCode",
      headerName: "ProjectCode",
      width: 130,
      hide: true,
    },

    {
      field: "EmpStatus",
      headerName: "Status",
      headerAlign: "center",
      width: 120,
    },
  ];
    
    const HeaderImg = sessionStorage.getItem("CompanyHeader");
    const FooterImg = sessionStorage.getItem("CompanyFooter");
    console.log("HeaderImg", HeaderImg, FooterImg);
    const config = getConfig();
    const baseurlUAAM = config.UAAM_URL;


  const safeAttendanceData = Array.isArray(AttendanceData)
    ? AttendanceData
    : [];
  console.log(safeAttendanceData, "safeAttendanceData");
  // Then:
  const ApprovedData = safeAttendanceData.filter(
    (row) => row.ApprovedStatus === "A",
  );
  console.log(ApprovedData, "===ApprovedData");
  /***********Attendance ************/

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
    // checkbox1: true,
    // checkbox5: true,
    // checkbox2: false,
    // checkbox3: false,
    // checkbox4: false,
    // checkbox6: false,
    // checkbox7: false,
    // checkbox8: false,

    ProName: sessionStorage.getItem("proData")
      ? JSON.parse(sessionStorage.getItem("proData"))
      : null,
    Employee: sessionStorage.getItem("empData")
      ? JSON.parse(sessionStorage.getItem("empData"))
      : null,
    checkbox1: sessionStorage.getItem("checkbox1") === "true" || false,
    checkbox2: sessionStorage.getItem("checkbox2") === "true" || false,
    checkbox3: sessionStorage.getItem("checkbox3") === "true" || false,
    checkbox4: sessionStorage.getItem("checkbox4") === "true" || false,
    checkbox5: sessionStorage.getItem("checkbox5") === "true" || false,
    checkbox6: sessionStorage.getItem("checkbox6") === "true" || false,
    checkbox7: sessionStorage.getItem("checkbox7") === "true" || false,
    checkbox8: sessionStorage.getItem("checkbox8") === "true" || false,
  };
  const [getData, setData] = useState("");
  const [useCurrentEmp, setUseCurrentEmp] = useState(false);

  // const attendaceFnSave = async (values) => {

  //     const statusMapping = {
  //       checkbox1: 'S',
  //       checkbox2: 'MT',
  //       checkbox3: 'SH',
  //       checkbox5: 'AP',
  //       checkbox6: 'RJ'
  //     };

  //     let statusValues = [];

  //     if (values.checkbox4) {
  //       statusValues.push('N', 'SH', 'A');
  //     }

  //     for (const [key, label] of Object.entries(statusMapping)) {
  //       if (values[key]) {
  //         statusValues.push(label);
  //       }

  //     }

  //     const AttendanceFilter = `EmployeeID=${useCurrentEmp ? EMPID : empData.RecordID} AND ProjectID IN(${projecID}) AND Status IN(${statusValues.map(val => `'${val}'`).join(',')})`;

  //     const data = {
  //         AttendanceFilter
  //     };

  //     setData(data);
  //     dispatch(timeSheetreport({ data }));
  //   };

  const attendaceFnSave = async (values) => {
    const statusMapping = {
      checkbox1: "S", // TaskSource
      checkbox2: "M", // TaskSource
      checkbox3: "SH", // TaskSource
      checkbox5: "AP", // Status
      checkbox6: "C", // Status
      checkbox7: "AS,SH",
      checkbox8: "I",
    };

    let taskSourceValues = [];
    let statusValues = [];

    // Group 1: TaskSource (checkbox1-3)
    if (values.checkbox1) taskSourceValues.push("S");
    if (values.checkbox2) taskSourceValues.push("M");
    if (values.checkbox3) taskSourceValues.push("SH");

    // Group 2: Status (checkbox4-6)
    if (values.checkbox4) statusValues.push("N", "SH", "A"); // special handling for checkbox4
    if (values.checkbox5) statusValues.push("AP");
    if (values.checkbox6) statusValues.push("C");
    if (values.checkbox7) statusValues.push("AS", "SH");
    if (values.checkbox8) statusValues.push("I");

    let AttendanceFilter = `EmployeeID=${useCurrentEmp ? EMPID : empData.RecordID} AND ProjectID IN(${projecID}) AND CompanyID=${CompanyID}`;

    if (taskSourceValues.length > 0 && statusValues.length === 0) {
      AttendanceFilter += ` AND TaskSource IN(${taskSourceValues.map((val) => `'${val}'`).join(",")})`;
    } else if (statusValues.length > 0 && taskSourceValues.length === 0) {
      AttendanceFilter += ` AND Status IN(${statusValues.map((val) => `'${val}'`).join(",")})`;
    } else if (taskSourceValues.length > 0 && statusValues.length > 0) {
      AttendanceFilter += ` AND (TaskSource IN(${taskSourceValues.map((val) => `'${val}'`).join(",")}) AND Status IN(${statusValues.map((val) => `'${val}'`).join(",")}))`;
    }

    const data = { AttendanceFilter };
    setData(data);
    dispatch(timeSheetreport({ data }));
  };

  console.log(getData, "---------------------GETDATA");

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData,
  );
  const explorelistViewColumn = useSelector(
    (state) => state.exploreApi.explorecolumnData,
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const screenChange = (event) => {
    setScreen(event.target.value);
  };
  const VISIBLE_FIELDS = [
    "SLNO",
    "OtDate",
    "NumberOfHours",
    "Status",
    "action",
  ];
  const [funMode, setFunMode] = useState("A");
  const columns = React.useMemo(
    () =>
      explorelistViewColumn
        ? explorelistViewColumn.filter((column) =>
            VISIBLE_FIELDS.includes(column.field),
          )
        : [],
    [explorelistViewColumn],
  );

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
        if (props === "Close") navigate(-1);
      }
    });
  };
  const handleSelectionEmployeeChange = (newValue) => {
    if (newValue) {
      setempData(newValue);
      console.log(newValue.RecordID, "--selectedproductid");
    } else {
      setempData(null);
    }
    setUseCurrentEmp(false);
  };
  const [open, setOpen] = React.useState(false);

  const [reason, setReason] = useState("");
  const projecID = selectedPro.map((ProName) => ProName.RecordID).join(",");
  return (
    <React.Fragment>
      {/* {getLoading && <LinearProgress />} */}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Timesheet Report</Typography>
          </Box>
          <Box display="flex">
            {/* <Tooltip title="Attendance ">
            <IconButton
              onClick={() => navigate("/Apps/TR217/Attendance")}
              color="primary"
            >
              <ListAltOutlinedIcon />
            </IconButton>
          </Tooltip> */}
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
        {/* <Box m="10px"> */}
        <Formik
          initialValues={AttInitialvalues}
          enableReinitialize={true}
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
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              onReset={() => {
                resetForm();
                setSelectedPro([]);
                setempData(null);
                sessionStorage.removeItem("proData");
                sessionStorage.removeItem("empData");
                dispatch(resetTrackingData());
              }}
            >
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  sx={{ flexWrap: "wrap", gridColumn: "span 2" }}
                >
                  {/* {isManager == "1" && ( */}
                  <Box sx={{ minWidth: 250 }}>
                    <MultiFormikOptimizedAutocomplete
                      sx={{ width: "100%" }}
                      name="ProName"
                      label="Project"
                      id="ProName"
                      value={selectedPro}
                      // onChange={(e, newValue) => {
                      //     setFieldValue("block", newValue);
                      //     setSelectedPro(newValue);
                      // }}
                      onChange={(e, newValue) => {
                        setFieldValue("ProName", newValue);
                        setSelectedPro(newValue);
                        if (newValue) {
                          sessionStorage.setItem(
                            "proData",
                            JSON.stringify(newValue),
                          );
                        } else {
                          sessionStorage.removeItem("proData");
                        }
                      }}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                    />
                  </Box>

                  <Box sx={{ minWidth: 250 }}>
                    <CheckinAutocomplete
                      name="Employee"
                      label={
                        <span>
                          Employee
                          {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
                        </span>
                      }
                      variant="outlined"
                      id="Employee"
                      value={empData}
                      //disabled={isManager === "0"}
                      // onChange={handleSelectionEmployeeChange}
                      onChange={(newValue) => {
                        setempData(newValue);
                        if (newValue)
                          sessionStorage.setItem(
                            "empData",
                            JSON.stringify(newValue),
                          );
                        else sessionStorage.removeItem("empData");
                        setUseCurrentEmp(false);
                      }}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2116","ScreenName":"EMPLOYEETEAMS","Filter":"CompanyID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}
                    />
                  </Box>
                  {/* )} */}

                  {/* <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={useCurrentEmp}
                                                onChange={(e) => {
                                                    setUseCurrentEmp(e.target.checked);
                                                    setempData(null);
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Self"
                                        sx={{ marginLeft: 2 }}
                                    /> */}
                </Box>

                {/* Below: Other Checkboxes */}
                {/* <FormControl fullWidth sx={{ gridColumn: "span 1" }}>
                                    <Box sx={{ paddingX: 3, paddingY: 2 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox1" as={Checkbox} />}
                                                    label="Self Task"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox4" as={Checkbox} />}
                                                    label="Created"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox2" as={Checkbox} />}
                                                    label="Manager Assigned Task"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox5" as={Checkbox} />}
                                                    label="Approved"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox3" as={Checkbox} />}
                                                    label="Scheduled Task"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={<Field type="checkbox" name="checkbox6" as={Checkbox} />}
                                                    label="Rejected"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl> */}

                <FormControl fullWidth sx={{ gridColumn: "span 1" }}>
                  <Box sx={{ paddingX: 3, paddingY: 2 }}>
                    <Grid container spacing={2}>
                      {/* Left Section (Main Checkboxes) */}
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox1}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox1",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox1",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Self Task"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox4}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox4",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox4",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Created"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox2}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox2",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox2",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Manager Assigned Task"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox7}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox7",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox7",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Backlog"
                            />
                            {/* <FormControlLabel
              control={<Field type="checkbox" name="checkbox5" as={Checkbox} />}
              label="Approved"
            /> */}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox3}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox3",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox3",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Scheduled Task"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox8}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox8",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox8",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Inprogress"
                            />
                            {/* <FormControlLabel
              control={<Field type="checkbox" name="checkbox6" as={Checkbox} />}
              label="Rejected"
            /> */}
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Right Section (New Column for Last 2 Checkboxes) */}
                      <Grid item xs={12} sm={4}>
                        <Grid container spacing={1} direction="column">
                          <Grid item>
                            {/* <FormControlLabel
              control={<Field type="checkbox" name="checkbox7" as={Checkbox} />}
              label="In Progressnew"
            /> */}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox6}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox6",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox6",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Completed"
                            />
                          </Grid>
                          <Grid item>
                            {/* <FormControlLabel
              control={<Field type="checkbox" name="checkbox8" as={Checkbox} />}
              label="Completed new"
            /> */}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.checkbox5}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "checkbox5",
                                      e.target.checked,
                                    ); // update Formik
                                    sessionStorage.setItem(
                                      "checkbox5",
                                      e.target.checked,
                                    ); // save session
                                  }}
                                />
                              }
                              label="Approved"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              </Box>

              <Box
                mt={-6}
                display="flex"
                justifyContent="end"
                padding={1}
                gap={formGap}
              >
                <Button type="submit" variant="contained" color="secondary">
                  APPLY
                </Button>
                <Button type="reset" variant="contained" color="error">
                  RESET
                </Button>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
                <PDFDownloadLink
                  document={
                    <TimeSheetreportpdf
                      data={safeAttendanceData}
                      projectName={projectName}
                      managerName={managerName}
                      filters={{
                        Month: Month,
                        Year: Year,
                        EmployeeID: empData?.Name || EMPNAME,
                        Imageurl: baseurlUAAM,
                        HeaderImg: HeaderImg,
                        FooterImg: FooterImg,
                      }}
                    />
                  }
                  fileName={`TimeSheet_Report_${empData?.Name || "Employee"}.pdf`}
                  style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
                >
                  {({ loading }) =>
                    loading ? (
                      <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                    ) : (
                      <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                    )
                  }
                </PDFDownloadLink>

                 <FaFileExcel
                                      size={20}
                                      color="#1D6F42"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        TimesheetReportExcel(
                                          safeAttendanceData,
                                          {
                                            Month: Month,
                                            Year: Year,
                                            EmployeeID: empData?.Name || EMPNAME,
                                          },
                                          projectName,
                                          managerName,
                                        
                                        )
                                      }
                                    />
              </Box>

              <Box sx={{ gridColumn: "span 4" }}>
                <Box
                  height="450px"
                  // height={dataGridHeight}
                  //marginTop={2}
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
                      backgroundColor: "#d0edec",
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
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    rows={AttendanceData}
                    columns={AttColumn}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onCellClick={(params) => {}}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                      Toolbar: AttendanceTool,
                    }}
                    onStateChange={(stateParams) =>
                      setRowCount(stateParams.pagination.rowCount)
                    }
                    loading={exploreLoading}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd-row"
                        : "even-row"
                    }
                  />
                </Box>
              </Box>
            </form>
          )}
        </Formik>
        {/* </Box> */}
      </Paper>
    </React.Fragment>
  );
};

export default Edittimesheetreport;
