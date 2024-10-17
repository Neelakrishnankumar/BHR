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
  } from "@mui/material";
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
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3" color="#174c4f">Run Payroll</Typography>
          </Box>
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="error">
                {/* Logout Icon Here */}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
  
        <Box display="flex" p={2}>
          {/* Left Side: Text Fields */}
          <FormControl sx={{ gridColumn: "span 3", gap: "30px" }}>
            <TextField
              id="outlined-basic"
              label="ID"
              variant="filled"
              focused
              sx={{ display: "none" }}
            />
            <FormControl
              sx={{
                gridColumn: "span 2",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Company"
                variant="filled"
                background="#f5f5f5"
                focused
                required
                fullWidth
                inputProps={{ tabIndex: "-1" }}
              />
              <IconButton sx={{ height: 40, width: 40 }}>
                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
              </IconButton>
            </FormControl>
  
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="department"
              name="department"
              label="Department"
              background="#e0e0e0"
              focused
              inputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="type"
              name="payroll"
              label="Payroll"
              background="#e0e0e0"
              focused
              inputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              id="year"
              name="year"
              label="Year"
              focused
            />
        <TextField
  fullWidth
  variant="filled"
  id="month"
  label="Month"
  focused
  select
  // Add value and onChange props to manage selection
>
  <MenuItem value={"1"}>1</MenuItem>
  <MenuItem value={"2"}>2</MenuItem>
  <MenuItem value={"3"}>3</MenuItem>
  <MenuItem value={"4"}>4</MenuItem>
  <MenuItem value={"5"}>5</MenuItem>
  <MenuItem value={"6"}>6</MenuItem>
  <MenuItem value={"7"}>7</MenuItem>
  <MenuItem value={"8"}>8</MenuItem>
  <MenuItem value={"9"}>9</MenuItem>
  <MenuItem value={"10"}>10</MenuItem>
  <MenuItem value={"11"}>11</MenuItem>
  <MenuItem value={"12"}>12</MenuItem>
</TextField>

<Box display="flex" justifyContent="flex-end" mt={2}>
            <Button   color="secondary"
                        variant="contained" sx={{ mr: 1 }}>
              Apply
            </Button>
            <Button type="reset" color="warning" variant="contained">
              Cancel
            </Button>
          </Box>

            {/* <TextField
              name="sortorder"
              type="number"
              id="sortorder"
              label="Sort Order"
              variant="filled"
              focused
              sx={{ background: "#fff6c3" }}
              onWheel={(e) => e.target.blur()}
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
            /> */}
          </FormControl>
        
          {/* Right Side: Data Grid */}
          <Box sx={{ flex: 2, ml: 2 }}> {/* Increased width of DataGrid */}
            <Box
              height="400px"
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
                  backgroundColor: colors.blueAccent[800],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                components={{
                    Toolbar: PayrollTool,
                  }}
              />
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
  