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
  PartyBydateByamtFilter,
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
const PartyByDate = () => {
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

  const PartyFilterData = useSelector(
    (state) => state.formApi.PartyDateAndAmtFilterdata,
  );
  console.log("PartyFilterData", PartyFilterData);

  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(31);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [errorMsgData, setErrorMsgData] = useState(null);


useEffect(() => {
  // 🔥 Clear grid data when page loads
  setRows([]);

  // 🔥 Clear session stored sort also
  sessionStorage.removeItem("partySort");

  // 🔥 Clear when browser refresh / tab close
  const handleUnload = () => {
    setRows([]);
    sessionStorage.removeItem("partySort");
  };

  window.addEventListener("beforeunload", handleUnload);

  return () => {
    // 🔥 Clear when navigating away
    setRows([]);
    window.removeEventListener("beforeunload", handleUnload);
  };
}, []);
useEffect(() => {
  if (Array.isArray(PartyFilterData)) {
    setRows(PartyFilterData);
  } else {
    setRows([]);
  }
}, [PartyFilterData]);

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
          <Typography>Party Details</Typography>
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

  //   const PartyFilterColumn = [

  //     {
  //       field: "slno",
  //       headerName: "SL#",
  //       width: 60,
  //       sortable: false,
  //       filterable: false,
  //       headerAlign: "center",
  //       disableColumnMenu: true,
  //       valueGetter: (params) => {
  //         const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

  //         const totalVisibleRows = params.api.getAllRowIds().length;
  //         const totalAllRows = params.api.getRowsCount();

  //         if (totalVisibleRows < totalAllRows) {
  //           return index + 1;
  //         } else {
  //           return page * pageSize + index + 1;
  //         }
  //       },
  //     },
  //   ];
  const PartyFilterColumn = [
    {
      field: "sno",
      headerName: "SL#",
      width: 50,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.api.getRowIndex(params.id) + 1, // 🔥 Auto serial number
    },
    {
      field: "PartyName",
      headerName: "Party Name",
      width: 300,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DaysDiff",
      headerName: "Days",
      width: 100,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 100,
      align: "right",
      headerAlign: "center",
      valueFormatter: (params) => Number(params.value || 0).toFixed(2),
      renderCell: (params) => {
        const value = Number(params.value || 0);
        const displayValue = Math.abs(value).toFixed(2);

        return (
          <span
            style={{
              color:
                value < 0 ? colors.redAccent[500] : colors.greenAccent[400],
              fontWeight: 600,
            }}
          >
            {displayValue}
          </span>
        );
      },
    },
  ];

  const AttInitialvalues = {
    partySort: sessionStorage.getItem("partySort") || "",
  };
  const attendaceFnSave = async (values) => {
    dispatch(
      PartyBydateByamtFilter({
        SortType: values.partySort || "",
        CompanyID: CompanyID,
      }),
    );
  };

  const exploreLoading = useSelector(
    (state) => state.formApi.PartyDateAndAmtFilterloading,
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
        if (props === "Close") navigate("/Apps/TR321/Party");
      }
    });
  };

  console.log(proData, "--find proData");

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
            <Typography variant="h3">Aging Report</Typography>
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
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              onReset={() => {
                resetForm();
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
                    id="partySort"
                    name="partySort"
                    label="Sort Party By"
                    value={values.partySort}
                    focused
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      sessionStorage.setItem("partySort", e.target.value);
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
                    <MenuItem value={"ByDays"}>By Days</MenuItem>
                    <MenuItem value={"ByAmount"}>By Amount</MenuItem>
                  </TextField>
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
                    onClick={() => {
                      // 1️⃣ Clear Formik field
                      setFieldValue("partySort", "");

                      // 2️⃣ Clear sessionStorage
                      sessionStorage.removeItem("partySort");

                      setRows([]); // Clear displayed data
                    }}
                  >
                    RESET
                  </Button>
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
                    // rows={PartyFilterData}
                    rows={rows}
                    columns={PartyFilterColumn}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    pageSize={pageSize}
                    page={page}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onPageChange={(newPage) => setPage(newPage)}
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
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default PartyByDate;
