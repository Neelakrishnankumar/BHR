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
    Checkbox, FormControlLabel
} from "@mui/material";
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
//import AttendancePDF from "../../reports/AttendancePdf";
import { toast } from "react-hot-toast";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AttendancePDF from "../pdf/AttendancePdf";

const EditdailyAttendance = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const isManager = sessionStorage.getItem("isManager");
    var recID = params.id;
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const EmpName = sessionStorage.getItem("EmpName");
    const companyID = sessionStorage.getItem("companyId");

    const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
    console.log("AttendanceData", AttendanceData);

    const getLoading = useSelector((state) => state.formApi.getLoading);
    const data = useSelector((state) => state.formApi.Data);
    const isLoading = useSelector((state) => state.formApi.loading);
    const [pageSize, setPageSize] = useState(31);
    const [rowCount, setRowCount] = useState(0);
    const [show, setScreen] = React.useState("0");
    const EMPID = sessionStorage.getItem("EmpId");
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const colors = tokens(theme.palette.mode);
    useEffect(() => {
        dispatch(resetTrackingData());
    }, [])

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
        {
            field: "SLNO",
            headerName: "SL.NO",
        },

        {
            field: "EmplyeeCheckInDateTime",
            headerName: "Emplyee CheckIn Date Time",
            flex: 1,
        },
        {
            field: "EmplyeeCheckOutDateTime",
            headerName: "Emplyee CheckOut Date Time",
            flex: 1,
        },
        {
            field: "NumberOfHoursWorked",
            headerName: "Worked Hours",
            flex: 1,
        },
        {
            field: "Status",
            headerName: "Status",
            flex: 1,
        },
    ];

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
            EmployeeID: useCurrentEmp ? EMPID : empData.RecordID,
        };
        console.log(data, "=====DATA");
        dispatch(Attendance({ data }));

        // setButtonVisible(true)
    };


    const exploreLoading = useSelector((state) => state.exploreApi.loading);

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
        setUseCurrentEmp(false)
    };
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
                        <Typography variant="h3">Daily Attendance</Typography>
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
                                        name="date"
                                        type="date"
                                        id="date"
                                        label="Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.date && !!errors.date}
                                        helperText={touched.date && errors.date}
                                         sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // optional: adjust if needed
                      },
                      width: 200,
                    }}
                                        inputProps={{ max: new Date().toISOString().split("T")[0] }}
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
                        url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EMPID}","Any":"","CompId":${companyID}}}`}
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
                  )}
                    <FormControlLabel
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
                                    {/* {isManager == "1" && (
                                        <Employeeautocomplete
                                            sx={{ width: 400 }}
                                            name="Employee"
                                            label="Employee"
                                            id="Employee"
                                            value={empData}
                                            onChange={handleSelectionEmployeeChange}
                                            url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EMPID}","Any":"","CompId":${companyID}}}`}
                                        />
                                    )} */}

                                    <FormControlLabel
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
                                    />
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
                                    {isManager === "1" && AttendanceData?.length > 0 && (
                                        <PDFDownloadLink
                                            document={
                                                <AttendancePDF
                                                    data={AttendanceData}
                                                    filters={{
                                                        Month: values.month,
                                                        Year: values.year,
                                                        EmployeeID: empData?.Name || EmpName,
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
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
            </Paper>
        </React.Fragment>
    );
};

export default EditdailyAttendance;

