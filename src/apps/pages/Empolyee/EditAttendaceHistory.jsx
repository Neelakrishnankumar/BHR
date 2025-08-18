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
} from "@mui/material";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight, formGap } from "../../../ui-components/global/utils";
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
} from "../../../store/reducers/Formapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  // DataGrid,
  GridToolbarContainer,
  // GridToolbarColumnsButton,
  // GridToolbarFilterButton,
  // GridToolbarExport,
  // GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendanceHistoryPDF from "../pdf/AttendanceHistoryPdf"
import { toast } from "react-hot-toast";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
const EditAttendanceHistory = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const mode = params.Mode;
  const dispatch = useDispatch();
  const isManager = sessionStorage.getItem("isManager");
  var recID = params.id;
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewColumn = useSelector((state) => state.listviewApi.columnData);
  // const empAttendanceData = useSelector(
  //   (state) => state.formApi.empAttendanceData
  // );
  // console.log("empAttendanceData", empAttendanceData);

  // const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  // console.log("AttendanceData", AttendanceData);
  const AttendanceData = useSelector(
    (state) => state.formApi.empAttendanceData
  );
  console.log("AttendanceData", AttendanceData);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("empID");
  console.log(EMPID, '-------------djkvbwld')
  const CompanyID = sessionStorage.getItem("compID")
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = tokens(theme.palette.mode);


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
    { field: "SLNO", headerName: "SL#", width: 5 },
    { field: "Name", headerName: "Employee", width: 150 },
    { field: "Day1", headerName: "1", width: 5 },
    { field: "Day2", headerName: "2", width: 5 },
    { field: "Day3", headerName: "3", width: 5 },
    { field: "Day4", headerName: "4", width: 5 },
    { field: "Day5", headerName: "5", width: 5 },
    { field: "Day6", headerName: "6", width: 5 },
    { field: "Day7", headerName: "7", width: 5 },
    { field: "Day8", headerName: "8", width: 5 },
    { field: "Day9", headerName: "9", width: 5 },
    { field: "Day10", headerName: "10", width: 5 },
    { field: "Day11", headerName: "11", width: 5 },
    { field: "Day12", headerName: "12", width: 5 },
    { field: "Day13", headerName: "13", width: 5 },
    { field: "Day14", headerName: "14", width: 5 },
    { field: "Day15", headerName: "15", width: 5 },
    { field: "Day16", headerName: "16", width: 5 },
    { field: "Day17", headerName: "17", width: 5 },
    { field: "Day18", headerName: "18", width: 5 },
    { field: "Day19", headerName: "19", width: 5 },
    { field: "Day20", headerName: "20", width: 5 },
    { field: "Day21", headerName: "21", width: 5 },
    { field: "Day22", headerName: "22", width: 5 },
    { field: "Day23", headerName: "23", width: 5 },
    { field: "Day24", headerName: "24", width: 5 },
    { field: "Day25", headerName: "25", width: 5 },
    { field: "Day26", headerName: "26", width: 5 },
    { field: "Day27", headerName: "27", width: 5 },
    { field: "Day28", headerName: "28", width: 5 },
    { field: "Day29", headerName: "29", width: 5 },
    { field: "Day30", headerName: "30", width: 5 },
    { field: "Day31", headerName: "31", width: 5 },
    { field: "Present", headerName: "Present" },
    // { field: "Leave", headerName: "LEAVE" },
    { field: "UNPAID_LEAVE", headerName: "Unpaid Leave" },
    { field: "Absent", headerName: "Absent" },
    // { field: "Irregular", headerName: "IRREGULAR" },
    { field: "HOLIDAYS", headerName: "Holiday" },
    { field: "Weekoff", headerName: "Weekoff" },
    { field: "Total", headerName: "Total Days" },
  ];
  // const AttendanceData = [
  //   {
  //     id: 1,
  //     SLNO: 1,
  //     EMPLOYEE: "John Doe",
  //     "1": "P", "2": "P", "3": "P", "4": "P", "5": "P", "6": "WO", "7": "WO",
  //     "8": "P", "9": "P", "10": "P", "11": "L", "12": "P", "13": "P", "14": "WO",
  //     "15": "WO", "16": "P", "17": "P", "18": "P", "19": "P", "20": "P", "21": "L",
  //     "22": "P", "23": "A", "24": "P", "25": "P", "26": "P", "27": "H", "28": "P",
  //     "30": "P", "31": "WO",
  //     PRESENT: 24,
  //     LEAVE: 2,
  //     UNPAID_LEAVE: 0,
  //     ABSENT: 1,
  //     IRREGULAR: 0,
  //     HOLIDAYS: 1,
  //     WEEKOFF: 4,
  //     TOTAL_DAYS: 32
  //   },
  //   {
  //     id: 2,
  //     SLNO: 2,
  //     EMPLOYEE: "Jane Smith",
  //     "1": "P", "2": "P", "3": "P", "4": "A", "5": "P", "6": "WO", "7": "WO",
  //     "8": "L", "9": "L", "10": "P", "11": "P", "12": "P", "13": "P", "14": "WO",
  //     "15": "WO", "16": "P", "17": "P", "18": "P", "19": "A", "20": "P", "21": "P",
  //     "22": "P", "23": "P", "24": "P", "25": "P", "26": "P", "27": "P", "28": "P",
  //     "30": "P", "31": "WO",
  //     PRESENT: 25,
  //     LEAVE: 2,
  //     UNPAID_LEAVE: 0,
  //     ABSENT: 2,
  //     IRREGULAR: 0,
  //     HOLIDAYS: 0,
  //     WEEKOFF: 4,
  //     TOTAL_DAYS: 33
  //   }
  // ];


  /***********Attendance ************/

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
    code: data.Code,
    description: data.Name,
    Sal: data.Sal,
    month: currentMonthNumber,
    year: currentYear,
  };
  const attendaceFnSave = async (values) => {
    const data = {
      Month: values.month.toString(),
      Year: values.year,
      ManagerID: EMPID,
      Etype: "H",
      CompanyID
    };

    dispatch(empAttendance({ data }));
  };

  const attendaceProcessFnSave = async (values) => {
    // toast.success("----response.payload.Msg");

    console.log("month", values.month.toString());

    const data = {
      Month: values.month.toString(),
      Year: values.year,
      EmployeeID: recID,
    };

    const response = await dispatch(AttendanceProcess({ data }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/TR217/EditAttendance");
    } else {
      toast.error(response.payload.Msg);
    }
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
      title: `Do you want ${props}?`,
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
  const [empData, setempData] = useState(null);
  const handleSelectionEmployeeChange = (newValue) => {

    if (newValue) {
      setempData(newValue);
      console.log(newValue.RecordID, "--selectedproductid");
    } else {
      setempData(null);
    }

  };
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
            <Typography variant="h3">Attendance Register</Typography>
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
          }) => (
            <form
              onSubmit={handleSubmit}
              onReset={() => {
                resetForm();
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
                    id="month"
                    name="month"
                    label="Month"
                    value={values.month}
                    focused
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // optional: adjust if needed
                      },
                      width: 200
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
                    id="year"
                    name="year"
                    label="Year"
                    value={values.year}
                    inputProps={{ min: "1900", max: "2100", step: "1" }}
                    focused
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent",
                        // optional
                      },
                      width: 200
                    }}
                  />
                  {/* <Employeeautocomplete
                                         sx={{ width: 400 }}
                                         name="Employee"
                                         label="Employee"
                                         id="Employee"
                                         value={empData}
                                         onChange={handleSelectionEmployeeChange}
                                         // url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EmpId}","Any":"","CompId":${companyID}}}`}
                                         url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID=${companyID}","Any":"","CompId":""}}`}
                 
                                      /> */}
                </Stack>
                <Stack direction="row" spacing={2} display="flex" padding={1} justifyContent="end">

                  <Button type="submit" variant="contained" color="secondary" >
                    APPLY
                  </Button>
                  <Button type="reset" variant="contained" color="error" size="small">
                    RESET
                  </Button>
                  {AttendanceData?.length > 0 && (
                    <PDFDownloadLink
                      document={
                        <AttendanceHistoryPDF
                          data={AttendanceData}
                          filters={{
                            Month: values.month,
                            Year: values.year,
                            EmployeeID: empData?.RecordID,
                          }}
                        />
                      }
                      fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
                       style={{ color: "#d32f2f", cursor: "pointer" }} 
                    >
                      
                      {({ loading }) =>
                        loading ? (
                          <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                        ) : (
                          <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        )
                      }
                    </PDFDownloadLink>
                  )}

                </Stack>
              </Box>
              {/* <Box display="flex" padding={1} justifyContent="end" mt="10px" gap="20px">
                  <Button type="submit" variant="contained" color="secondary">
                    APPLY
                  </Button>
                  {/* <Button
                    onClick={() => attendaceProcessFnSave(values)}
                    type="reset"
                    variant="contained"
                    color="primary"
                  >
                    PROCESS
                  </Button> *
                  <Button type="reset" variant="contained" color="error">
                    RESET
                  </Button>
                  {isManager === "1" && AttendanceData?.length > 0 && (
  <PDFDownloadLink
    document={
      <AttendanceHistoryPDF
        data={AttendanceData}
        filters={{
          Month: values.month,
          Year: values.year,
          EmployeeID: empData?.RecordID,
        }}
      />
    }
    fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
    style={{
      textDecoration: "none",
      padding: "6px 12px",
      color: "#fff",
      backgroundColor: "#1976d2",
      borderRadius: 4,
    }}
    // onClick={() => setButtonVisible(false)}
  >
    {({ loading }) =>
      loading ? "Preparing document..." : "Download Attendance PDF"
  
    }
  </PDFDownloadLink>
)}
                </Box> */}

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
                      }
                    }}


                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}


                    rows={AttendanceData}
                    columns={AttColumn}
                    disableSelectionOnClick
                    getRowId={(row) => row.SLNO}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) =>
                      setPageSize(newPageSize)
                    }
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
                        ? 'odd-row'
                        : 'even-row'
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

export default EditAttendanceHistory;


