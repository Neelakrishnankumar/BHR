import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
  FormControl,
  Button,
  Paper,
  Breadcrumbs,Grid
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight, formGap } from "../../../ui-components/global/utils";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { tokens } from "../../../Theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";


export default function EditEnquiryTruck() {
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.formApi.loading);
  const columns = [
    { field: "sNo", headerName: "S.No", width: 80 },
    { field: "empNo", headerName: "Emp No", width: 100 },
    { field: "empCode", headerName: "Emp Code", width: 120 },
    { field: "empName", headerName: "Emp Name", width: 150 },
    { field: "empDesignation", headerName: "Emp Designation", width: 150 },
    { field: "toNoOfDays", headerName: "To No. Of Days", width: 150, type: 'number' },
    { field: "weekOfDays", headerName: "Week of Days", width: 150 },
    { field: "scheduledLeaveDays", headerName: "Scheduled Leave Days", width: 180, type: 'number' },
    { field: "unscheduledLeaveDays", headerName: "Unscheduled Leave Days", width: 200, type: 'number' },
    { field: "allowanceDetail", headerName: "Allowance Detail", width: 180 },
    { field: "allowanceAmount", headerName: "Allowance Amount", width: 150, type: 'number' },
    { field: "deductionDetail", headerName: "Deduction Detail", width: 180 },
    { field: "deductionAmount", headerName: "Deduction Amount", width: 150, type: 'number' },
    { field: "overtime", headerName: "Over Time", width: 150, type: 'number' },
    { field: "netSalary", headerName: "Net Salary", width: 150, type: 'number' },
  ];

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
          navigate("/Apps/TR121/Functions");
        }
      } else {
        return;
      }
    });
  };
  function PayrollTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Run Payroll</Typography>
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
  // Define rows
  const rows = [
    { id: 1, sNo: 1, empNo: "E001", empCode: "C001", empName: "John Doe", empDesignation: "Developer", toNoOfDays: 30, weekOfDays: "Week 1", scheduledLeaveDays: 2, unscheduledLeaveDays: 1, allowanceDetail: "Transport", allowanceAmount: 100, deductionDetail: "Tax", deductionAmount: 20, overtime: 5, netSalary: 2800 },
    { id: 2, sNo: 2, empNo: "E002", empCode: "C002", empName: "Jane Smith", empDesignation: "Designer", toNoOfDays: 30, weekOfDays: "Week 1", scheduledLeaveDays: 1, unscheduledLeaveDays: 0, allowanceDetail: "Food", allowanceAmount: 150, deductionDetail: "Tax", deductionAmount: 25, overtime: 10, netSalary: 2900 },
    { id: 3, sNo: 3, empNo: "E003", empCode: "C003", empName: "Mike Johnson", empDesignation: "Manager", toNoOfDays: 30, weekOfDays: "Week 2", scheduledLeaveDays: 3, unscheduledLeaveDays: 1, allowanceDetail: "Communication", allowanceAmount: 200, deductionDetail: "Tax", deductionAmount: 30, overtime: 0, netSalary: 3100 },
    { id: 4, sNo: 4, empNo: "E004", empCode: "C004", empName: "Sara Brown", empDesignation: "Analyst", toNoOfDays: 30, weekOfDays: "Week 2", scheduledLeaveDays: 0, unscheduledLeaveDays: 2, allowanceDetail: "Transport", allowanceAmount: 120, deductionDetail: "Tax", deductionAmount: 22, overtime: 8, netSalary: 2950 },
    { id: 5, sNo: 5, empNo: "E005", empCode: "C005", empName: "Tom Hanks", empDesignation: "Support", toNoOfDays: 30, weekOfDays: "Week 3", scheduledLeaveDays: 1, unscheduledLeaveDays: 1, allowanceDetail: "Food", allowanceAmount: 160, deductionDetail: "Tax", deductionAmount: 18, overtime: 15, netSalary: 3100 },
    { id: 6, sNo: 6, empNo: "E006", empCode: "C006", empName: "Lucy Liu", empDesignation: "Manager", toNoOfDays: 30, weekOfDays: "Week 3", scheduledLeaveDays: 2, unscheduledLeaveDays: 0, allowanceDetail: "Communication", allowanceAmount: 140, deductionDetail: "Tax", deductionAmount: 20, overtime: 10, netSalary: 3300 },
    { id: 7, sNo: 7, empNo: "E007", empCode: "C007", empName: "Mark Twain", empDesignation: "Developer", toNoOfDays: 30, weekOfDays: "Week 4", scheduledLeaveDays: 3, unscheduledLeaveDays: 1, allowanceDetail: "Transport", allowanceAmount: 180, deductionDetail: "Tax", deductionAmount: 35, overtime: 5, netSalary: 2800 },
    { id: 8, sNo: 8, empNo: "E008", empCode: "C008", empName: "Albert Einstein", empDesignation: "Scientist", toNoOfDays: 30, weekOfDays: "Week 4", scheduledLeaveDays: 0, unscheduledLeaveDays: 0, allowanceDetail: "Food", allowanceAmount: 200, deductionDetail: "Tax", deductionAmount: 30, overtime: 0, netSalary: 3400 },
    { id: 9, sNo: 9, empNo: "E009", empCode: "C009", empName: "Nina Simone", empDesignation: "Singer", toNoOfDays: 30, weekOfDays: "Week 5", scheduledLeaveDays: 1, unscheduledLeaveDays: 1, allowanceDetail: "Communication", allowanceAmount: 120, deductionDetail: "Tax", deductionAmount: 15, overtime: 5, netSalary: 3200 },
    { id: 10, sNo: 10, empNo: "E010", empCode: "C010", empName: "Steve Jobs", empDesignation: "Entrepreneur", toNoOfDays: 30, weekOfDays: "Week 5", scheduledLeaveDays: 2, unscheduledLeaveDays: 0, allowanceDetail: "Transport", allowanceAmount: 190, deductionDetail: "Tax", deductionAmount: 28, overtime: 20, netSalary: 3800 },
  ];


  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0",gap:"10px" }}>
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

              <Typography variant="h5" color="#0000D1"
                sx={{ cursor: "default" }}>Run Payroll</Typography>


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
        {/* Left Side: Text Fields */}
        <Grid container spacing={2}>
  {/* Hidden ID Field */}
  <Grid item xs={12} sx={{ display: "none" }}>
    <TextField
      id="outlined-basic"
      label="ID"
      variant="standard"
      focused
      fullWidth
    />
  </Grid>

  {/* Company + Icon */}
  <Grid item xs={6}>
    <FormControl fullWidth sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <TextField
        id="company"
        label="Company"
        variant="standard"
        focused
        required
        fullWidth
        inputProps={{ tabIndex: "-1" }}
      />
      <IconButton sx={{ height: 40, width: 40 }}>
        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
      </IconButton>
    </FormControl>
  </Grid>

  <Grid item xs={6}>
    <TextField
      fullWidth
      variant="standard"
      type="text"
      id="department"
      name="department"
      label="Department"
      focused
      inputProps={{ readOnly: true }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      fullWidth
      variant="standard"
      type="text"
      id="type"
      name="payroll"
      label="Payroll"
      focused
      inputProps={{ readOnly: true }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      fullWidth
      variant="standard"
      type="text"
      id="year"
      name="year"
      label="Year"
      focused
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      fullWidth
      variant="standard"
      id="month"
      label="Month"
      select
      focused
    >
      {[...Array(12)].map((_, i) => (
        <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Buttons */}
  <Grid item xs={12}>
    <Box display="flex" justifyContent="flex-end" paddingTop={1}>
      <Button color="secondary" variant="contained" sx={{ mr: 1 }}>
        Apply
      </Button>
      <Button type="reset" color="warning" variant="contained">
        Cancel
      </Button>
    </Box>
  </Grid>
</Grid>
          {/* <TextField
              name="sortorder"
              type="number"
              id="sortorder"
              label="Sort Order"
              variant="standard"
              focused
              sx={{ background: "#fff6c3" }}
              onWheel={(e) => e.target.blur()}
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
            /> */}
        {/* </FormControl> */}

        {/* Right Side: Data Grid */}
        {/* Increased width of DataGrid */}
        <Box
          m="5px 0 0 0"
          //height={dataGridHeight}
          height="50vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[800],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
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
              backgroundColor: "#D3D3D3",
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
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowHeight={dataGridRowHeight}
            headerHeight={dataGridHeaderFooterHeight}
            disableSelectionOnClick
            components={{
              Toolbar: PayrollTool,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                  ? "odd-row"
                  : "even-row"
          }
          />
        </Box>

      </Paper>
    </React.Fragment>
  );
}
