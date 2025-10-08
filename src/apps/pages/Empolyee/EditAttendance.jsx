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
  Chip,
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
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect } from "react";
const EditAttendance = () => {
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

  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  console.log("AttendanceData", AttendanceData);

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

    const savedProData = sessionStorage.getItem("proData");
    const savedEmpData = sessionStorage.getItem("empData");
    const savedMonth = sessionStorage.getItem("attmonth");
    const savedYear = Number(sessionStorage.getItem("attyear"));

    const pro = savedProData ? JSON.parse(savedProData) : null;
    const emp = savedEmpData ? JSON.parse(savedEmpData) : null;

    const month = savedMonth || currentMonthNumber;
    const year = savedYear || currentYear;

    setproData(pro);
    setempData(emp);

    const data = {
      Month: month,
      Year: year,
      EmployeeID: emp?.RecordID || "",
      ProjectID: pro?.RecordID || "",
    };

    console.log("Dispatching Attendance on load:", data);

    dispatch(Attendance({ data }));
  }, [EMPID, dispatch]); 


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
  const [proData, setproData] = useState(null);

  const handleSelectionProjectChange = (newValue) => {
    if (newValue) {
      setproData(newValue);
    } else {
      setproData(null);
    }
  };
  const AttColumn = [
    // {
    //   field: "SLNO",
    //   headerName: "SL#",
    //   width:50
    // },
    // {
    //   field: "slno",
    //   headerName: "SL#",
    //   width: 50,
    //   sortable: false,
    //   filterable: false,
    //   valueGetter: (params) =>
    //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
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
      field: "action",
      headerName: "Action",
      width: 60,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.Status === "WeekOff") {
          return <AlarmOffIcon color="primary" titleAccess="WeekOff" />;
        }
        if (params.row.Status === "Holiday") {
          return <DeckIcon color="primary" titleAccess="Holiday" />;
        }
        return null;
      },
    },
    {
      field: "EmplyeeCheckInDateTime",
      headerName: "Employee Check In Date Time",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "EmplyeeCheckOutDateTime",
      headerName: "Employee Check Out Date Time",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "NumberOfHoursWorked",
      headerName: "Worked Hours",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Commend",
      headerName: "Comments",
      width: 150,
      headerAlign: "center",

    },
  ];

  /***********Attendance ************/

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
    // code: data.Code,
    // description: data.Name,
    // Sal: data.Sal,
    // month: currentMonthNumber,
    // year: currentYear,
    attmonth: sessionStorage.getItem("attmonth") || currentMonthNumber,
    attyear: Number(sessionStorage.getItem("attyear")) || currentYear,

  };
  const attendaceFnSave = async (values) => {
    const data = {
      Month: values.attmonth.toString(),
      Year: values.attyear,
      EmployeeID: useCurrentEmp ? EMPID : empData.RecordID,
      // ProjectID: proData.RecordID
      ProjectID: proData && proData.RecordID ? proData.RecordID : 0,
      // CompanyID
    };
    console.log(data, "=====DATA");
    dispatch(Attendance({ data }));

    // setButtonVisible(true)
  };

  const exploreLoading = useSelector((state) => state.exploreApi.loading);

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
        Filter: employeeFilter,
        Any: "",
        CompId: "",
      },
    })
  )}`;

  console.log(proData, "--find proData");

  const [useCurrentEmp, setUseCurrentEmp] = useState(false);
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
            <Typography variant="h3">Monthly Attendance</Typography>
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
                setproData(null);
                setempData(null);
                setFieldValue("attmonth",currentMonthNumber)
                setFieldValue("attyear",currentYear)
                sessionStorage.removeItem("attmonth");
                sessionStorage.removeItem("attyear");
                sessionStorage.removeItem("empData");
                sessionStorage.removeItem("proData");
                dispatch(resetTrackingData());
              }}
            >
              <Box
                display="grid"
                gridTemplateColumns="repeat(2 , minMax(0,1fr))"
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
                    id="attmonth"
                    name="attmonth"
                    label="Month"
                    value={values.attmonth}
                    focused
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("attmonth", e.target.value);
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
                    id="attyear"
                    name="attyear"
                    label="Year"
                    value={values.attyear}
                    inputProps={{ min: "1900", max: "2100", step: "1" }}
                    focused
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("attyear", e.target.value);
                    }}
                    onBlur={handleBlur}
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // optional
                      },
                      width: 200,
                    }}
                  />
                  {/* <Employeeautocomplete
                     sx={{ width: 400 }}
                    name="ProName"
                    label="Project"
                    id="ProName"
                    value={proData}
                    onChange={handleSelectionProjectChange}
                    error={!!touched.ProName && !!errors.ProName}
                    helperText={touched.ProName && errors.ProName}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${companyID}","Any":""}}`}
                  />
                  
                     <Employeeautocomplete
                        sx={{ width: 400 }}
                        name="Employee"
                        label="Employee"
                        id="Employee"
                        value={empData}
                        onChange={handleSelectionEmployeeChange}
                        // url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EmpId}","Any":"","CompId":${companyID}}}`}
                       url={employeeUrl}
                        // url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID='${companyID}'","Any":"","CompId":""}}`}

                     /> */}

                  <Employeeautocomplete
                    sx={{ width: 400 }}
                    name="ProName"
                    label="Project"
                    id="ProName"
                    value={proData}
                    // onChange={handleSelectionProjectChange}
                    onChange={(newValue) => {
                      setproData(newValue);
                      if (newValue)
                        sessionStorage.setItem("proData", JSON.stringify(newValue));
                      else
                        sessionStorage.removeItem("proData");
                    }}
                    error={!!touched.ProName && !!errors.ProName}
                    helperText={touched.ProName && errors.ProName}
                    url={`${listViewurl}?data=${encodeURIComponent(
                      JSON.stringify({
                        Query: {
                          AccessID: "2054",
                          ScreenName: "Project",
                          Filter: `parentID=${CompanyID}`,
                          Any: "",
                        },
                      })
                    )}`}
                  />

                  <Employeeautocomplete
                    sx={{ width: 400 }}
                    name="Employee"
                    label="Employee"
                    id="Employee"
                    value={empData}
                    // onChange={handleSelectionEmployeeChange}
                    onChange={(newValue) => {
                      setempData(newValue);
                      if (newValue)
                        sessionStorage.setItem("empData", JSON.stringify(newValue));
                      else
                        sessionStorage.removeItem("empData");
                    }}
                    url={employeeUrl}
                  />

                  {/* {isManager === "1" ? (
                    <>
                      <Employeeautocomplete
                        sx={{ width: 400 }}
                        name="Employee"
                        label="Employee"
                        id="Employee"
                        value={empData}
                        onChange={handleSelectionEmployeeChange}
                        // url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EmpId}","Any":"","CompId":${companyID}}}`}
                        url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2048","ScreenName":"Function","Filter":"CompanyID=${compID}","Any":""}}`}

                     />
                    </>
                  ) : (
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="emp"
                      name="year"
                      label="Employee Name"
                      value={EmpName}
                      inputProps={{ min: "1900", max: "2100", step: "1" }}
                      focused
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{
                        "& .MuiFilledInput-root": {
                          backgroundColor: "transparent",
                        },
                        width: 400,
                      }}
                    />
                  )} */}
                  {/* <FormControlLabel
          control={
            <Checkbox
              checked={useCurrentEmp}
              onChange={(e) => { setUseCurrentEmp(e.target.checked);
                setempData(null)}}
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
                  <Button type="reset" variant="contained" color="error">
                    RESET
                  </Button>
                  {AttendanceData?.length > 0 && (
                    <PDFDownloadLink
                      document={
                        <AttendancePDF
                          data={AttendanceData}
                          filters={{
                            Month: values.attmonth,
                            Year: values.attyear,
                            EmployeeID: empData?.Name,
                          }}
                        />
                      }
                      fileName={`Attendance_Report_${empData?.Name || "Employee"
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
                  )}
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
                    "& .weekoff-row": {
                      backgroundColor: "#f2acb7", // light red
                      color: "#b71c1c", // dark red text
                    },
                    "& .holiday-row": {
                      backgroundColor: "#c9f5cc", // light green
                      color: "#1b5e20", // dark green text
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
                    getRowClassName={(params) => {
                      const status = params.row.Status;
                      if (status === "WeekOff") return "weekoff-row";
                      if (status === "Holiday") return "holiday-row";
                      return params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd-row"
                        : "even-row";
                    }}
                  />
                </Box>
                <Box
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
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default EditAttendance;
