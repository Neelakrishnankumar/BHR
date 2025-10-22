import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    Paper,
    IconButton,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack, AssessmentTwoTone } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridRowHeight,
    formGap,
} from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getFetchData,
    postData,
    scheduleGetData,
} from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import {
    ManagerAppraisalPayload,
    PeerAppraisalPayload,
    SelfAppraisalPayload,
    SingleFormikSkillAutocomplete,
    SingleFormikSkillAutocompletePayload,
    SubordinateAppraisalPayload,
} from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import {
    MultiFormikOptimizedAutocomplete,
    MultiFormikScheduleOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import { tokens } from "../../../Theme";
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowModes,
} from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";

const NewScheduleLatest = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const params = useParams();

    const recID = params.id;
    const accessID = params.accessID;
    //const accessID = "TR283";
    const screenName = params.screenName;
    const mode = params.Mode;
    const EmpId = params.parentID3;
    const parentID1 = params.parentID1;
    const parentID2 = params.parentID2;
    console.log("🚀 ~ NewSchedule ~ parentID2:", parentID2);

    const CompanyID = sessionStorage.getItem("compID");
    const state = location.state || {};
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //const colors = tokens(theme.palette.mode);

    const answerType = state.AnswerType;
    const AssessmentName = state.BreadCrumb3;
    const Designation = state.Designation;

    const AssessmentType = state.AssessmentType;
    console.log("🚀 ~ CreateCandidates ~ AssessmentType:", AssessmentType);
    const DesignationID = state.DesignationID;
    console.log("🚀 ~ CreateCandidates ~ DesignationID:", DesignationID);

    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const Data = useSelector((state) => state.formApi.Data);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const scheduleLoading = useSelector((state) => state.formApi.scheduleloading);
    console.log("🚀 ~ NewSchedule ~ scheduleLoading:", scheduleLoading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const AssessmentAutoUrl = useSelector(
        (state) => state.globalurl.AssessmentAutoUrl
    );
    const [selectedEmp, setselectedEmp] = useState([]);

    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const normalSchema = Yup.object().shape({
                    Date: Yup.string()
                        .required(data.ListofAssessCat1.Date)
                        .test(
                            "valid-date",
                            "Invalid Date",
                            (value) => !!value && !isNaN(new Date(value))
                        ),
                    EmpName: Yup.array()
                        .min(1, "Please select at least one employee")
                        .required(data.ListofAssessCat1.EmpName),
                });

                setValidationSchema(normalSchema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode, AssessmentType]);
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, []);
    const [rows, setRows] = useState([]);
    // useEffect(() => {
    //   const fetchScheduleData = async () => {
    //     try {
    //       const data = await dispatch(
    //         scheduleGetData({
    //           AssessmentID: parentID2 ? parentID2 : 0,
    //         })
    //       );

    //       console.log("🚀 ~ fetchScheduleData ~ data:", data);

    //       if (data?.payload?.Status === "Y") {
    //         setRows(data.payload.Data || []);
    //       } else {
    //         setRows([]); // Prevents DataGrid errors
    //       }
    //     } catch (error) {
    //       console.error("❌ Error fetching schedule data:", error);
    //       setRows([]);
    //     }
    //   };

    //   // ✅ Only run if parentID2 is valid
    //   if (parentID2 !== undefined && parentID2 !== null) {
    //     fetchScheduleData();
    //   }
    // }, [dispatch, parentID2]);

    //   const ScheduleSaveFn = async (values, delAction) => {
    //     // let action =
    //     //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    //     let action = "";

    //     if (mode === "A") {
    //       action = "insert";
    //     } else if (mode === "E" && delAction === "harddelete") {
    //       action = "harddelete";
    //     } else if (mode === "E") {
    //       action = "update";
    //     }
    //     var isCheck = "N";
    //     if (values.Disable == true) {
    //       isCheck = "Y";
    //     }
    // const empIDs = selectedEmp.map((emp) => emp.RecordID).join(",");

    // const idata = {
    //   Details: selectedEmp.map((emp) => ({
    //     AssessmentID: parentID2 || 0,
    //     EmployeeID: emp.RecordID,
    //     Date: values.Date,
    //     AssessmentType: AssessmentType || "",
    //   })),
    // };

    //     const response = await dispatch(postData({ accessID, action, idata }));
    //     if (response.payload.Status == "Y") {
    //       toast.success(response.payload.Msg);
    //       navigate(-1);
    //     } else {
    //       toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    //     }
    //   };
    // define it at the top of your component
    const fetchScheduleData = async () => {
        try {
            const data = await dispatch(
                scheduleGetData({ AssessmentID: parentID2 || 0 })
            );

            console.log("🚀 ~ fetchScheduleData ~ data:", data);

            if (data?.payload?.Status === "Y") {
                setRows(data.payload.Data || []);
            } else {
                setRows([]); // Prevents DataGrid errors
            }
        } catch (error) {
            console.error("❌ Error fetching schedule data:", error);
            setRows([]);
        }
    };
    useEffect(() => {
        if (parentID2 !== undefined && parentID2 !== null) {
            fetchScheduleData();
        }
    }, [dispatch, parentID2]);

    const ScheduleSaveFn = async (values, delAction) => {
        let action =
            mode === "A"
                ? "insert"
                : mode === "E"
                    ? delAction === "harddelete"
                        ? "harddelete"
                        : "update"
                    : "";

        const idata = {
            Details: selectedEmp.map((emp) => ({
                AssessmentID: parentID2 || 0,
                EmployeeID: emp.RecordID,
                Date: values.Date,
                AssessmentType: AssessmentType || "",
            })),
        };

        const response = await dispatch(postData({ accessID, action: "insert", idata }));

        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);

            sessionStorage.removeItem("empData");

            fetchScheduleData();
        } else {
            toast.error(response.payload.Msg || "Error");
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
                    navigate("/Apps/TR026/Department");
                }
            } else {
                return;
            }
        });
    };
    const [pageSize, setPageSize] = React.useState(10);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { toggleSidebar, broken, rtl } = useProSidebar();

    //   FOR DATEPICKER
    const [value, setValue] = useState(null);

    // const handleDeleteClick = (id) => async () => {
    //   console.log("🚀 ~ handleDeleteClick ~ id:", id)
    //   try {
    //     setRows((prev) => prev.filter((row) => row.RecordID !== id));

    //     console.log("🚀 ~ handleDeleteClick ~ rows:", rows)
    //   } catch (error) {
    //     console.error("Error deleting row:", error);
    //     toast.error("Error occurred during delete.");
    //   }
    // };
    // inside your component

    // const handleDeleteClick = (row) => async () => {
    //   try {
    //     const confirmDelete = window.confirm(
    //       "Are you sure you want to delete this record?"
    //     );
    //     if (!confirmDelete) return;

    //     const idata = {
    //       RecordID: row.RecordID,
    //       AssessmentID: row.AssessmentID || parentID2 || 0,
    //       EmployeeID: row.EmployeeID,
    //       Date: row.DATE,
    //       AssessmentType: row.AssessmentType || "",
    //     };

    //     const response = await dispatch(
    //       postData({ accessID, action: "harddelete", idata })
    //     );

    //     if (response.payload?.Status === "Y") {
    //       toast.success(response.payload.Msg || "Record deleted successfully!");
    //       fetchScheduleData(); // 🔹 refresh the grid after delete
    //     } else {
    //       toast.error(response.payload?.Msg || "Failed to delete record!");
    //     }
    //   } catch (error) {
    //     console.error("❌ Error deleting row:", error);
    //     toast.error("Error occurred during delete.");
    //   }
    // };

    const handleDeleteClick = (row) => async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this schedule?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) return;

            const idata = {
                RecordID: row.RecordID,
                AssessmentID: row.AssessmentID || parentID2 || 0,
                EmployeeID: row.EmployeeID,
                Date: row.DATE,
                AssessmentType: row.AssessmentType || "",
            };

            const response = await dispatch(
                postData({ accessID: "TR301", action: "harddelete", idata })
            );

            if (response.payload?.Status === "Y") {
                toast.success(response.payload.Msg || "Record deleted successfully!");
                fetchScheduleData(); // 🔹 refresh the grid after delete
            } else {
                toast.error(response.payload?.Msg || "Failed to delete record!");
            }
        } catch (error) {
            console.error("❌ Error deleting row:", error);
            toast.error("Error occurred during delete.");
        }
    };

    const [rowCount, setRowCount] = useState(0);
    const Sprintcolumns = [
        { field: "SLNO", headerName: "#SL", width: 70 },
        {
            headerName: "Employee Name",
            field: "EmployeeName",
            width: "150",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },
        {
            headerName: "Assessment",
            field: "Assessment",
            width: "200",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },
        {
            headerName: "Current Attempt",
            field: "CurrentAllowedAttempt",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },
        {
            headerName: "Targeted Date",
            field: "Targeteddate",
            type: "date",

            width: "100",
            align: "right",
            headerAlign: "center",
            hide: false,
            editable: false,
        },

        {
            headerName: "Last Att Date",
            field: "Lastattdate",
            type: "date",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },
        {
            headerName: "Last Att Score",
            field: "Lastattscore",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },
        {
            headerName: "Status",
            field: "STATUS",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: false,
            editable: false,
        },

        // {
        //     field: "actions",
        //     type: "actions",
        //     headerName: "Actions",
        //     width: 150,
        //     cellClassName: "actions",
        //     getActions: (params) => [
        //         <GridActionsCellItem
        //             key="delete"
        //             icon={<DeleteIcon style={{ color: "#e74c3c" }} />}
        //             label="Delete"
        //             onClick={handleDeleteClick(params.row)}
        //             color="inherit"
        //         />,
        //     ],
        // },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            cellClassName: "actions",
            getActions: (params) => [
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon style={{ color: "#e74c3c", opacity: params.row.STATUS === "Not Attended" ? 1 : 0.3 }} />}
                    label="Delete"
                    disabled={params.row.STATUS !== "Not Attended"}
                    onClick={
                        params.row.STATUS === "Not Attended"
                            ? handleDeleteClick(params.row)   // ✅ Correct
                            : undefined
                    }
                    color="inherit"
                />,
            ],
        }



    ];

    function Custombar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography>List of Schedule</Typography>
                </Box> */}
            </GridToolbarContainer>
        );
    }
    const initialValues = {
        Date:
            mode === "A"
                ? new Date().toISOString().split("T")[0] // today
                : Data.Date || new Date().toISOString().split("T")[0],
        AssessmentName: AssessmentName || "",
        Designation: Designation || "",
    };

    return (
        <>
            <React.Fragment
                sx={{
                    p: 2,
                    height: "100vh",
                }}
            >
                {/* BREADCRUMBS */}
                <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
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
                                <Breadcrumbs
                                    maxItems={2}
                                    aria-label="breadcrumb"
                                    separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                                >
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                        onClick={() => {
                                            navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                                        }}
                                    >
                                        List of Assessment Type ({state.BreadCrumb1})
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                        onClick={() => {
                                            navigate(
                                                `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}`,
                                                { state: { ...state } }
                                            );
                                        }}
                                    >
                                        List of Category ({state.BreadCrumb2})
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                        onClick={() => {
                                            navigate(
                                                `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}/${params.accessID1}/${params.parentID3}`,
                                                { state: { ...state } }
                                            );
                                        }}
                                    >
                                        List of Assessment ({state.BreadCrumb3})
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default" }}
                                    >
                                        Schedule History
                                    </Typography>
                                </Breadcrumbs>
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

                {!getLoading ? (
                    <Paper elevation={3} sx={{ margin: "10px" }}>
                        <Box m="5px">
                            <Box
                                m="5px 0 0 0"
                                height={dataGridHeight}
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
                                    columns={Sprintcolumns}
                                    loading={scheduleLoading}
                                    //rowModesModel={rowModesModel}
                                    getRowId={(row) => row.RecordID}
                                    editMode="cell"
                                    disableRowSelectionOnClick
                                    rowHeight={dataGridRowHeight}
                                    headerHeight={dataGridHeaderFooterHeight}
                                    //experimentalFeatures={{ newEditingApi: true }}
                                    //onRowModesModelChange={handleRowModesModelChange}
                                    //processRowUpdate={processRowUpdate}
                                    // onProcessRowUpdateError={handleProcessRowUpdateError}
                                    onStateChange={(stateParams) =>
                                        setRowCount(stateParams.pagination.rowCount)
                                    }
                                    components={{
                                        Toolbar: Custombar,
                                    }}
                                    // componentsProps={{
                                    //   toolbar: { setRows, setRowModesModel },
                                    // }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0
                                            ? "odd-row"
                                            : "even-row"
                                    }
                                    pagination
                                />
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" padding={2}>

                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Paper>
                ) : (
                    false
                )}
            </React.Fragment>
        </>
    );
};

export default NewScheduleLatest;
