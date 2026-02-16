import {
  Divider,
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Button,
  Breadcrumbs,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Tooltip,
  Paper,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Field, useFormikContext } from "formik";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import { tokens } from "../../../Theme";
import { DataGrid } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import {
  CheckinAutocomplete,
  Employeeautocomplete,
  MultiFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { leaveenquiryget } from "../../../store/reducers/Formapireducer";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LeaveEntryPdf from "../pdf/LeaveEntryRegister";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";
import { getConfig } from "../../../config";
import { FaFileExcel } from "react-icons/fa";
import LeaveEntryRegisterExcel from "../pdf/LeaveEntryRegisterExcel";

const LeaveEntryRegister = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();
  const state = location.state || {};
  const leaveEntryData = useSelector(
    (state) => state.formApi.LeaveEntryRegdata,
  );
  const leaveEntryDataLoading = useSelector(
    (state) => state.formApi.LeaveEntryRegloading,
  );
  const isLoading = useSelector((state) => state.formApi.loading);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const compID = sessionStorage.getItem("compID");
  const [pageSize, setPageSize] = React.useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);
  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");
  console.log("HeaderImg", HeaderImg, FooterImg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();

  var recID = params.id;
  const config = getConfig();
  const baseurlUAAM = config.UAAM_URL;

  useEffect(() => {
    setRows([]);
    setempData([]);
  }, [recID]);

  const Column = [
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
      field: "Employee",
      headerName: "Employee Name",
      width: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "LeaveName",
      headerName: "Leave Type",
      width: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "FromDate",
      headerName: "From",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ToDate",
      headerName: "To",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      align: "left",
      headerAlign: "center",
    },
  ];

  const formatToDDMMYYYY = (dateStr) => {
    if (!dateStr) return "";
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  const [errorMsgData, setErrorMsgData] = useState(null);

  const [empData, setempData] = useState([]);

  const [proData, setproData] = useState(null);

  let employeeFilter = `CompanyID='${compID}'`;

  const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: "2117",
        ScreenName: "Employee",
        Filter: employeeFilter,
        Any: "",
        CompId: "",
      },
    }),
  )}`;

  const handleApplyClick = async (values) => {
    const employeeIds =
      empData && empData.length > 0
        ? empData.map((e) => e.RecordID).join(",") // 🔥 "98,132,145"
        : "";

    try {
      const resultAction = await dispatch(
        leaveenquiryget({
          FromDate: values.FromDate || "",
          ToDate: values.ToDate || "",
          LeaveTypeID: recID || "",
          CompanyID: compID,
          EmployeesID: employeeIds || "",
          Permission: "N",
        }),
      );

      const payload = resultAction.payload;

      if (payload?.Status === "Y" && Array.isArray(payload?.Data)) {
        const resData = payload.Data.map((item, index) => ({
          ...item,
          SLNO: index + 1,
        }));
        setRows(resData);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error while applying leave enquiry:", error);
      setRows([]);
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
          navigate(-1);
        }
      } else {
        return;
      }
    });
  };
  const fromPDFDate = sessionStorage.getItem("FromDatePDF");
  const toPDFDate = sessionStorage.getItem("ToDatePDF");
  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List Of Leave Entries</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
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
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Paper
          elevation={3}
          sx={{ height: "50px", margin: "10px 10px", background: "#F2F0F0" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Breadcrumbs maxItems={3} aria-label="breadcrumb">
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default", margin: "10px" }}
                >
                  Leave Enquiry Report ({state.LeaveType || ""})
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box>
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
            // onSubmit={handleFormSubmit}
            initialValues={{
              FromDate: "",
              ToDate: "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleApplyClick(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleChange,
              resetForm,
              setFieldValue,
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  //selectCellRowData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                  setRows([]);
                }}
              >
                <Box>
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                      <TextField
                        name="FromDate"
                        type="date"
                        id="FromDate"
                        label="From Date"
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        focused
                        value={values.FromDate}
                        onBlur={handleBlur}
                        // onChange={handleChange}

                        onChange={(event) => {
                          const newFromDate = event.target.value; // yyyy-mm-dd (for input)

                          // 1️⃣ Update Formik normally
                          setFieldValue("FromDate", newFromDate);

                          // 2️⃣ Convert to dd-mm-yyyy
                          const formatted = formatToDDMMYYYY(newFromDate);

                          // 3️⃣ Remember it for next page / PDF
                          sessionStorage.setItem("FromDatePDF", formatted);
                        }}
                        error={!!touched.FromDate && !!errors.FromDate}
                        helperText={touched.FromDate && errors.FromDate}
                        // required
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        name="ToDate"
                        type="date"
                        id="ToDate"
                        label="To Date"
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        focused
                        value={values.ToDate}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(event) => {
                          const newToDate = event.target.value;

                          setFieldValue("ToDate", newToDate);

                          const formatted = formatToDDMMYYYY(newToDate);
                          sessionStorage.setItem("ToDatePDF", formatted);
                        }}
                        error={!!touched.ToDate && !!errors.ToDate}
                        helperText={touched.ToDate && errors.ToDate}
                        // required
                        sx={{ gridColumn: "span 2" }}
                        inputProps={{
                          min:
                            values.FromDate ||
                            new Date().toISOString().split("T")[0],
                        }}
                      />
                      {/* <Employeeautocomplete
                        name="Employee"
                        label="Employee"
                        id="Employee"
                        value={empData}
                        multiple
                        // onChange={handleSelectionEmployeeChange}
                        onChange={(newValue) => {
                          setempData(newValue || []);
                          if (newValue && newValue.length > 0)
                            sessionStorage.setItem(
                              "empData",
                              JSON.stringify(newValue),
                            );
                          else sessionStorage.removeItem("empData");
                        }}
                        url={employeeUrl}
                      /> */}
                      <MultiFormikOptimizedAutocomplete
                        name="Employee"
                        label="Employee"
                        id="Employee"
                        value={empData}
                        multiple
                        // onChange={handleSelectionEmployeeChange}
                        onChange={(event, newValue) => {
                          setempData(newValue || []);
                          if (newValue && newValue.length > 0)
                            sessionStorage.setItem(
                              "empData",
                              JSON.stringify(newValue),
                            );
                          else sessionStorage.removeItem("empData");
                        }}
                        disablePortal={false}
                        PopperProps={{
                          sx: {
                            zIndex: 1500,
                          },
                        }}
                        url={employeeUrl}
                      />
                    </FormControl>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    display="flex"
                    padding={1}
                    justifyContent="end"
                    marginTop={-4}
                  >
                    <Button variant="contained" color="secondary" type="submit">
                      APPLY
                    </Button>
                    <Button
                      type="reset"
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        // setRows([]);
                        setempData([]);
                        setRows([]);
                      }}
                    >
                      RESET
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => {
                        setRows([]);
                        setempData([]);
                        navigate(-1);
                      }}
                    >
                      CANCEL
                    </Button>

                    {rows?.length > 0 && (
                      <PDFDownloadLink
                        document={
                          <LeaveEntryPdf
                            data={rows}
                            filters={{
                              EmployeeID: empData?.RecordID,
                              FromDate: fromPDFDate,
                              ToDate: toPDFDate,
                              HeaderImg: HeaderImg,
                              FooterImg: FooterImg,
                              Imageurl: baseurlUAAM,
                            }}
                          />
                        }
                        fileName={`LeaveEnquiry_Report.pdf`}
                        style={{ color: "#d32f2f", cursor: "pointer" }}
                      >
                        {({ leaveEntryDataLoading }) =>
                          leaveEntryDataLoading ? (
                            <PictureAsPdfIcon
                              sx={{ fontSize: 24, opacity: 0.5 }}
                            />
                          ) : (
                            <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                          )
                        }
                      </PDFDownloadLink>
                    )}

                    {rows?.length > 0 && (
                      <FaFileExcel
                        size={20}
                        color="#1D6F42"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          LeaveEntryRegisterExcel(
                            rows,
                            {
                              EmployeeID: empData?.RecordID,
                              FromDate: fromPDFDate,
                              ToDate: toPDFDate,
                            },
                         )
                        }
                      />
                    )}
                  </Stack>
                  <Box
                    m="5px 0 0 0"
                    height="500px"
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
                      // checkboxSelection
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      rows={rows}
                      columns={Column}
                      disableSelectionOnClick
                      getRowId={(row) => row.RecordID}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      // onCellClick={(params) => {
                      //   selectCellRowData({
                      //     rowData: params.row,
                      //     mode: "E",
                      //     field: params.field,
                      //   });
                      // }}
                      rowsPerPageOptions={[5, 10, 20]}
                      pagination
                      components={{
                        Toolbar: Custombar,
                      }}
                      onStateChange={(stateParams) =>
                        setRowCount(stateParams.pagination.rowCount)
                      }
                      loading={leaveEntryDataLoading}
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
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default LeaveEntryRegister;
