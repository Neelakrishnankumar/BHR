import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Tabs,
  Tab,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import {
  resetTrackingData,
  BirthdayAnniversaryGet,
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
//import AttendancePDF from "../../reports/AttendancePdf";
import { toast } from "react-hot-toast";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttendancePDF from "../pdf/AttendancePdf";
import BirthdayAnniversaryPDF from "../pdf/Reminderpdf";
import { getConfig } from "../../../config";

const REMINDER_TABS = ["Today", "This week", "This month"];
const REMINDER_PERIODS = ["Today", "This Week", "This Month"];
const CATEGORY_OPTIONS = ["Birthday", "Work Anniversary"];

const EditRemainder = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isManager = sessionStorage.getItem("isManager");
  var recID = params.id;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const EmpName = sessionStorage.getItem("EmpName");
  const CompanyID = sessionStorage.getItem("compID");

  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");

  console.log("HeaderImg", HeaderImg, FooterImg);
  const config = getConfig();
  const baseurlUAAM = config.UAAM_URL;
  console.log(baseurlUAAM, "--find baseurlUAAM");

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const AttendanceData = useSelector(
    (state) => state.formApi.BirthdayAnniversaryData
  );
  console.log("AttendanceData length", AttendanceData?.length);

  const rows = React.useMemo(() => AttendanceData || [], [AttendanceData]);

  const [page, setPage] = React.useState(0);

  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY_OPTIONS[0]
  );

  const getLoading = useSelector(
    (state) => state.formApi.BirthdayAnniversaryGetloading
  );
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [pageSize, setPageSize] = useState(31);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [footerHeight, setFooterHeight] = useState(60);
  const [isReady, setIsReady] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [errorMsgData, setErrorMsgData] = useState(null);

  // Which of the 3 tabs (Today / This week / This month) is active.
  const [tabValue, setTabValue] = useState(0);

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
  // useEffect(() => {
  //   dispatch(resetTrackingData());
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          BirthdayAnniversaryGet({
            data: {
              CompanyID,
              Type: CATEGORY_OPTIONS[0],
              Period: REMINDER_PERIODS[0],
            },
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (!FooterImg) return;

    const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      const aspectRatio = img.height / img.width;

      const pageWidth = 595;
      const MAX_FOOTER_HEIGHT = 80; // 🔥 IMPORTANT

      const calculatedHeight = Math.min(
        pageWidth * aspectRatio,
        MAX_FOOTER_HEIGHT
      );

      setFooterHeight(calculatedHeight);
      setIsReady(true);
    };
  }, [FooterImg]);
  //  useEffect(() => {
  //     const savedDate = sessionStorage.getItem("date");
  //     const restoredDate = savedDate || new Date().toISOString().split("T")[0];

  //     const data = {
  //       Date: restoredDate,
  //       CompanyID
  //     };

  //     console.log("Dispatching MonthlyAttendance:", data);
  //     dispatch(MonthlyAttendance({ data }));
  //   }, []);

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
          <Typography>List of Personnel</Typography>
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

  const isBirthday = selectedCategory === "Birthday";
  const ReminderColumns = [
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
    // {
    //   field: "Code",
    //   headerName: "Employee Code",
    //   flex: 1,
    //   headerAlign: "center",
    // },
    {
      field: "Personnel",
      headerName: "Personnel",
      flex: 0.5,
      headerAlign: "center",
    },
    // {
    //   field: "Job",
    //   headerName: "Designation",
    //   flex: 1,
    //   headerAlign: "center",
    // },
    {
      field: "ClassificationDesc",
      headerName: "Classification",
      flex: 0.5,
      headerAlign: "center",
    },
    {
      field: "EventDate",
      headerName: isBirthday ? "Date of Birth" : "Date of Join",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) =>
        isBirthday
          ? params.row.DateOfBirth
          : params.row.DateOfJoining,
    },
  ];

  /***********Reminder list ************/

  const ReminderInitialValues = {
    category: CATEGORY_OPTIONS[0],
  };

  const reminderFnSave = async (values) => {
    const data = {
      CompanyID,
      Type: values.category, // "Birthday" | "Work Anniversary"
      Period: REMINDER_PERIODS[tabValue], // "Today" | "This Week" | "This Month"
    };
    console.log(data, "=====REMINDER DATA");
    dispatch(BirthdayAnniversaryGet({ data }));
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
        if (props === "Close") navigate("/Apps/Chart");
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
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const getReminderDateRange = (tabIndex) => {
    const today = new Date();
    // Format as DD-MM-YYYY 
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear(); return `${day}-${month}-${year}`;
    };
    // Today 
    if (tabIndex === 0) { return formatDate(today); }
    // This week - Monday to Sunday 
    if (tabIndex === 1) {
      const currentDay = today.getDay();
      // Sunday = 0 
      const monday = new Date(today);
      monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
      const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
      return `${formatDate(monday)} - ${formatDate(sunday)}`;
    }
    // This month - 1st to last day 
    if (tabIndex === 2) {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      console.log(today.getMonth(), "monthname");

      return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
    }
    return "";

  };
  console.log(getReminderDateRange(tabValue), "getReminderDateRange");
  const [useCurrentEmp, setUseCurrentEmp] = useState(false);
  const generatePDFInBackground = (PdfComponent) => {
    return new Promise((resolve) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(async () => {
          try {
            const { pdf } = await import("@react-pdf/renderer");
            const blob = await pdf(PdfComponent).toBlob();
            resolve(blob);
          } catch (error) {
            resolve(null);
          }
        }, { timeout: 5000 });
      } else {
        setTimeout(async () => {
          try {
            const { pdf } = await import("@react-pdf/renderer");
            const blob = await pdf(PdfComponent).toBlob();
            resolve(blob);
          } catch (error) {
            resolve(null);
          }
        }, 100);
      }
    });
  };
  return (
    <React.Fragment>

      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Box sx={{ p: 1.5, backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
          <Paper sx={{ borderRadius: 3, border: "1px solid #E5E7EB" }}>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Box display="flex" borderRadius="3px" alignItems="center">
                {broken && !rtl && (
                  <IconButton onClick={() => toggleSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                )}
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111827",
                    // mb: 0.2,
                    px: 1,
                    py: 0.2,
                  }}
                >Celebration</Typography>
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

          <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap">

            <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>

              <Paper elevation={3} sx={{ margin: "10px", backgroundColor: "#ffff", border: "1px solid #b9bcc0", borderRadius: 3, }}>
                <Formik
                  initialValues={ReminderInitialValues}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    setTimeout(() => {
                      reminderFnSave(values, resetForm);
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
                        setTabValue(0);
                        setSelectedCategory(CATEGORY_OPTIONS[0]);
                        dispatch(resetTrackingData());
                      }}
                    >


                      {/* ----- CARD HEADER ----- */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        mb={1}
                        sx={{ px: 2, pt: 2 }}
                      >
                        {/* ICON */}
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: "#EFF6FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: 18 }}>
                            🎉
                          </Typography>
                        </Box>

                        {/* TITLE + SUBTITLE */}
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            color="#0D94885"
                          >
                            Celebration
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Celebration Reminder List
                          </Typography>
                        </Box>
                      </Box>

                      {/* ----- DATE RANGE TABS ----- */}
                      <Box sx={{ px: 2, pt: 1 }}>
                        <Tabs
                          value={tabValue}
                          onChange={(e, newValue) => setTabValue(newValue)}
                          sx={{
                            minHeight: 40,
                            borderBottom: "1px solid #E5E7EB",
                            "& .MuiTabs-indicator": {
                              backgroundColor: "#0D9488",
                              height: 3,
                              borderRadius: "3px 3px 0 0",
                            },
                            "& .MuiTab-root": {
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: 14,
                              minHeight: 40,
                              color: "#6b7280",
                            },
                            "& .Mui-selected": {
                              color: "#0D9488 !important",
                            },
                          }}
                        >
                          {REMINDER_TABS.map((label) => (
                            <Tab key={label} label={label} />
                          ))}
                        </Tabs>
                      </Box>

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
                          {/* ----- CATEGORY COMBO (Birthday / Anniversary) ----- */}
                          <FormControl
                            size="small"
                            focused
                            sx={{
                              width: 220,
                              marginTop: 2,
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#fff",
                                borderRadius: "6px",
                                "& fieldset": {
                                  borderColor: "#d1d5db",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#bfc4cc",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#d1d5db",
                                  borderWidth: "1px",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#6b7280",
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#6b7280",
                              },
                            }}
                          >
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                              labelId="category-label"
                              id="category"
                              name="category"
                              label="Category"
                              value={values.category}
                              onChange={(e) => {
                                handleChange(e);
                                setSelectedCategory(e.target.value);
                              }}
                              onBlur={handleBlur}
                            >
                              {CATEGORY_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={2}
                          display="flex"
                          padding={1}
                          justifyContent="end"
                        >
                          <Button
                            type="submit"
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
                          <Button
                            type="reset"
                            variant="contained"
                            color="error"
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 4,
                            }}
                          >
                            Reset
                          </Button>
                          {AttendanceData?.length > 0 && (
                            <Button
                              onClick={async () => {
                                try {
                                  setPdfGenerating(true);
                                  toast.loading("Generating PDF...");

                                  const period = REMINDER_PERIODS[tabValue];
                                  const monthName = new Date().toLocaleString("en-US", {
                                    month: "long",
                                  });

                                  const filePeriod =
                                    tabValue === 2
                                      ? monthName
                                      : period
                                  const pdfComponent = (
                                    <BirthdayAnniversaryPDF
                                      data={AttendanceData}
                                      filters={{
                                        Category: values.category,
                                        Date: getReminderDateRange(tabValue),
                                        Period: filePeriod,
                                        Imageurl: baseurlUAAM,
                                        HeaderImg: HeaderImg,
                                        FooterImg: FooterImg
                                      }}
                                      footerHeight={footerHeight}
                                    />
                                  );

                                  // Generate in background without blocking UI
                                  const blob = await generatePDFInBackground(pdfComponent);

                                  if (blob) {
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = `${values.category}_Reminders_${filePeriod}.pdf`;
                                    link.click();
                                    URL.revokeObjectURL(url);
                                    toast.dismiss();

                                  } else {
                                    toast.dismiss();
                                    toast.error("PDF generation failed");
                                  }
                                } catch (error) {
                                  toast.error("Error generating PDF");
                                } finally {
                                  setPdfGenerating(false);
                                }
                              }}
                              disabled={pdfGenerating}
                              sx={{ color: "#d32f2f" }}
                            >
                              {pdfGenerating ? <CircularProgress size={24} /> : <PictureAsPdfIcon sx={{ fontSize: 24 }} />}
                            </Button>
                          )}
                        </Stack>
                      </Box>
                      <Box sx={{ gridColumn: "span 4" }}>
                        <Box
                          padding={1}
                          height="500px"
                          marginTop={2}
                          sx={{
                            "& .MuiDataGrid-root": {
                            },
                            "& .MuiDataGrid-cell": {
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
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
                            "& .odd-row": {
                              backgroundColor: "",
                              color: "",
                            },
                            "& .even-row": {
                              backgroundColor: "#d0edec",
                              color: "",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                              color: colors.blueAccent[900],
                              fontWeight: 600,
                            },
                            "& .MuiTablePagination-root": {
                              color: colors.blueAccent[900],
                            },
                            "& .MuiTablePagination-root": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-selectLabel": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-displayedRows": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-selectIcon": {
                              color: "#fff",
                            },

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
                            rows={rows}
                            columns={ReminderColumns}
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
                            loading={getLoading}
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
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default EditRemainder;
