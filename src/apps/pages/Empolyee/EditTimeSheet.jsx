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
import { Formik } from "formik";
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
// import Edittimesheetreport from "./Edittimesheetreport";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
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
import { getConfig } from "../../../config";

const EditTimeSheet = () => {
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
  useEffect(() => {
    dispatch(resetTrackingData());
  }, []);

  const AttendanceData = useSelector((state) => state.formApi.timeSheetData);
  const projectName = useSelector((state) => state.formApi.projectName);
  const managerName = useSelector((state) => state.formApi.managerName);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = React.useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
  const CompanyID = sessionStorage.getItem("compID");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMsgData, setErrorMsgData] = useState(null);

  // useEffect(() => {
  //   fetch(process.env.PUBLIC_URL + "/validationcms.json")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch validationcms.json");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setErrorMsgData(data);
  //     })
  //     .catch((err) => console.error("Error loading validationcms.json:", err));
  // }, []);
  useEffect(() => {
    // Get session values
    const savedEmpData = sessionStorage.getItem("timeempData");
    const savedMonth = sessionStorage.getItem("timemonth");
    const savedYear = Number(sessionStorage.getItem("timeyear"));

    // Default to current month/year if session is empty

    const emp = savedEmpData ? JSON.parse(savedEmpData) : null;

    const month = savedMonth || currentMonthNumber;
    const year = savedYear || currentYear;

    // Update states
    settimeempData(emp);

    const data = {
      Month: month,
      Year: year,
      EmployeeID: emp?.RecordID || "",
      CompanyID
    };


    dispatch(timeSheet({ data }));
  }, []);

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
        handleDialogClose();
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
          <Typography>Attendance</Typography>
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
    //    {
    //   field: "serialNo",
    //   headerName: "SL#",
    //   width: 40,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => {
    //     return params.api.getRowIndex(params.id) + 1;
    //   },
    // },
    // {
    //   field: "slno",
    //   headerName: "SL#",
    //   width: 50,
    //   sortable: false,
    //   filterable: false,
    //   valueGetter: (params) =>
    //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
    // },
    {
      field: "slno",
      headerName: "SL#",
      width: 60,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      disableColumnMenu: true,
      valueGetter: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

        const totalVisibleRows = params.api.getAllRowIds().length;
        const totalAllRows = params.api.getRowsCount();

        if (totalVisibleRows < totalAllRows) {
          return index + 1;
        } else {
          return page * pageSize + index + 1;
        }
      },
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
      width: 80,
      headerAlign: "center",
    },
    {
      field: "ProjectName",
      headerName: "Project",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "DesignationsName",
      headerName: "Function",
      width: 130,
      hide: true,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 600,
      headerAlign: "center",
      renderCell: (params) => {
        const description = params.row.Description || "";
        const comments = params.row.Comments || "";
        return (
          <div>
            <p>
              {description} || {comments}
            </p>
          </div>
        );
      },
    },

    {
      field: "ProjectCode",
      headerName: "ProjectCode",
      width: 130,
      hide: true,
    },

    {
      field: "FunctionCode",
      headerName: "FunctionCode",
      width: 130,
      hide: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 120,
    //   sortable: false,
    //   renderCell: (params) => {
    //     const isCompleted = params.row.Status === "Completed";
    //     const isApproved = params.row.Status === "AP";
    //     const isRejected = params.row.Status === "RJ";
    //     if (!isCompleted) return null;

    //     if (isApproved || isRejected) {
    //       return (
    //         <Tooltip title="Approved - Locked">
    //           <IconButton onClick={() => handleDialogOpen(params.row)}>
    //             <LockOpenIcon color="success" fontSize="small" />
    //           </IconButton>
    //         </Tooltip>
    //       );
    //     }

    //     return (
    //       <>
    //         <Tooltip title="Edit">
    //           <IconButton
    //             onClick={() => {
    //               navigate(
    //                 `/Apps/TR132/TimeSheet/EditTimeDailytask/${params.row.RecordID}`,
    //                 { state: { data: getData } }
    //               );
    //             }}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton>
    //         </Tooltip>

    //         <Tooltip title="Approve">
    //           <IconButton
    //             onClick={async () => {
    //               const idata = {
    //                 action: "update",
    //                 DailyTaskRecordID: params.row.RecordID,
    //                 ApprovedBy: EMPID,
    //                 Status: "AP",
    //                 DateTime: formattedDate,
    //                 Remarks: "aaa",
    //               };

    //               try {
    //                 const response = await dispatch(
    //                   timeSheetPostData({ idata })
    //                 );

    //                 if (response.payload.Status === "Y") {
    //                   toast.success(response.payload.Msg);
    //                   dispatch(timeSheet({ data: getData }));
    //                 } else {
    //                   toast.error(response.payload.Msg);
    //                 }
    //               } catch (error) {
    //                 console.error("Error during timesheet post:", error);
    //                 toast.error("Something went wrong!");
    //               }
    //             }}
    //           >
    //             <DoneIcon fontSize="small" color="success" />
    //           </IconButton>
    //         </Tooltip>

    //         <Tooltip title="Reject">
    //           <IconButton
    //             onClick={async () => {
    //               const idata = {
    //                 action: "update",
    //                 DailyTaskRecordID: params.row.RecordID,
    //                 ApprovedBy: EMPID,
    //                 Status: "RJ",
    //                 DateTime: formattedDate,
    //                 Remarks: "aaa",
    //               };

    //               try {
    //                 const response = await dispatch(
    //                   timeSheetPostData({ idata })
    //                 );

    //                 if (response.payload.Status === "Y") {
    //                   toast.success(response.payload.Msg);
    //                   dispatch(timeSheet({ data: getData }));
    //                 } else {
    //                   toast.error(response.payload.Msg);
    //                 }
    //               } catch (error) {
    //                 console.error("Error during timesheet post:", error);
    //                 toast.error("Something went wrong!");
    //               }
    //             }}
    //           >
    //             <CloseIcon fontSize="small" color="error" />
    //           </IconButton>
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
  ];

  const safeAttendanceData = Array.isArray(AttendanceData)
    ? AttendanceData
    : [];

  // Then:
  const ApprovedData = safeAttendanceData.filter(
    (row) => row.Status === "Approved"
  );


      const HeaderImg = sessionStorage.getItem("CompanyHeader");
      const FooterImg = sessionStorage.getItem("CompanyFooter");
      console.log("HeaderImg", HeaderImg, FooterImg);
      const config = getConfig();
      const baseurlUAAM = config.UAAM_URL;


  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
    timemonth: sessionStorage.getItem("timemonth") || currentMonthNumber,
    timeyear: Number(sessionStorage.getItem("timeyear")) || currentYear,
  };
  const [getData, setData] = useState("");
  const [useCurrentEmp, setUseCurrentEmp] = useState(false);
  const attendaceFnSave = async (values) => {
    const data = {
      Month: values.timemonth.toString(),
      Year: values.timeyear,
      EmployeeID: useCurrentEmp ? EMPID : timeempData.RecordID,
      CompanyID
    };
    setData(data);
    dispatch(timeSheet({ data }));
  };

  console.log(getData, "---------------------GETDATA");
  const handleClick = (values) => {
    console.log(values.timemonth, "Month");
    console.log(values.timeyear, "Year");

    navigate("/Apps/Edittimesheetreport", {
      state: { Month: values.timemonth, Year: values.timeyear },
    });
  };
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewColumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const screenChange = (event) => {
    setScreen(event.target.value);
  };

  const filteredColumns = useCurrentEmp
    ? AttColumn.filter((col) => col.field !== "actions")
    : AttColumn;

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
          VISIBLE_FIELDS.includes(column.field)
        )
        : [],
    [explorelistViewColumn]
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
        if (props === "Close") navigate("/Apps/TR217/EditAttendance");
      }
    });
  };
  const [timeempData, settimeempData] = useState(null);
  const handleSelectionEmployeeChange = (newValue) => {
    if (newValue) {
      settimeempData(newValue);
    } else {
      settimeempData(null);
    }
    setUseCurrentEmp(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setReason("");
    setSelectedRow(null);
  };
  const [reason, setReason] = useState("");

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Time Sheet</Typography>
            {/* <Typography variant="h4">
                            Timesheet ({empData?.Name})
                        </Typography> */}
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
            setFieldValue
          }) => (
            <form
              onSubmit={handleSubmit}
              onReset={() => {
                resetForm();
                settimeempData(null)
                sessionStorage.removeItem("timeempData");
                setFieldValue("timemonth", currentMonthNumber);
                sessionStorage.removeItem("timemonth");
                sessionStorage.removeItem("timeyear");
                setFieldValue("timeyear", currentYear);
                dispatch(resetTrackingData());
              }}
            >
              <Box
                display="grid"
                gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                // gap="70px"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    id="timemonth"
                    name="timemonth"
                    label="Month"
                    value={values.timemonth}
                    focused
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("timemonth", e.target.value);
                    }}
                    onBlur={handleBlur}
                    select
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // optional: adjust if needed
                      },
                      width: 200,
                    }}
                  >
                    <MenuItem value={"1"}>January</MenuItem>
                    <MenuItem value={"2"}>February</MenuItem>
                    <MenuItem value={"3"}>March</MenuItem>
                    <MenuItem value={"4"}>April</MenuItem>
                    <MenuItem value={"5"}>May</MenuItem>
                    <MenuItem value={"6"}>June</MenuItem>
                    <MenuItem value={"7"}>July</MenuItem>
                    <MenuItem value={"8"}>August</MenuItem>
                    <MenuItem value={"9"}>September</MenuItem>
                    <MenuItem value={"10"}>October</MenuItem>
                    <MenuItem value={"11"}>November</MenuItem>
                    <MenuItem value={"12"}>December</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    id="timeyear"
                    name="timeyear"
                    label="Year"
                    value={values.timeyear}
                    inputProps={{ min: "1900", max: "2100", step: "1" }}
                    focused
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("timeyear", e.target.value);
                    }}
                    onBlur={handleBlur}
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent",
                      },
                      width: 200,
                    }}
                  />
                  <Employeeautocomplete
                    sx={{ width: 400 }}
                    name="Employee"
                    label="Employee"
                    id="Employee"
                    value={timeempData}
                    // onChange={handleSelectionEmployeeChange}
                    onChange={(newValue) => {
                      settimeempData(newValue);
                      if (newValue)
                        sessionStorage.setItem("timeempData", JSON.stringify(newValue));
                      else
                        sessionStorage.removeItem("timeempData");
                    }}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2116","ScreenName":"Employee","Filter":"CompanyID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}
                  />
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
                  /> */}
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  padding={1}
                  justifyContent="end"
                >
                  <Button type="submit" variant="contained" color="secondary">
                    APPLY
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    RESET
                  </Button>

                  {/* <PictureAsPdfIcon onClick={handleClick} sx={{ fontSize: 24, opacity: 0.5 }} style={{ color: "#d32f2f", cursor: "pointer" }}/> */}
                  <Button
                    type="reset"
                    variant="contained"
                    // color="error"
                    sx={{ color: "white", backgroundColor: "#2196f3" }}
                    // style={{ color: "#2196f3"}}
                    size="small"
                    onClick={() => handleClick(values)}
                  >
                    More
                  </Button>
                  

                  {/* <PictureAsPdfIcon
  onClick={() => handleClick(values)}
  sx={{ fontSize: 24, opacity: 0.5 }}
  style={{ color: "#d32f2f", cursor: "pointer" }}
/> */}

                  {ApprovedData?.length > 0 && (
                    <PDFDownloadLink
                      document={
                        <TimeSheetPDF
                          data={ApprovedData}
                          projectName={projectName}
                          managerName={managerName}
                          filters={{
                            Month: values.timemonth,
                            Year: values.timeyear,
                            EmployeeID: timeempData?.Name || EMPNAME,
                             Imageurl: baseurlUAAM,
                            HeaderImg: HeaderImg,
                            FooterImg: FooterImg,
                          }}
                        />
                      }
                      fileName={`Attendance_Report_${timeempData?.Name || EMPNAME
                        }.pdf`}
                      style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
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
                  )}
                  {/* <PDFDownloadLink
                      document={
                        <InvoicePDF
                        />
                      }
                      fileName={"Invoice.pdf"}
                      style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
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
                    </PDFDownloadLink> */}
                </Stack>
              </Box>

              <Box sx={{ gridColumn: "span 4" }}>
                <Box
                  height="500px"
                  // height={dataGridHeight}
                  marginTop={2}
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
                    //columns={AttColumn}
                    rows={AttendanceData}
                    columns={filteredColumns}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
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

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{"UnLock Reason"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To unlock this employee, please enter your reason here.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="reason"
              name="reason"
              label="Reason"
              type="text"
              fullWidth
              variant="standard"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>CANCEL</Button>
            <Button onClick={handleUnlock} autoFocus>
              UNLOCK
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </React.Fragment>
  );
};

export default EditTimeSheet;
