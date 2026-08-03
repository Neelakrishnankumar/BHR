import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    FormControl,
    TextField,
    Paper,
    Checkbox,
    Button,
    IconButton,
    Tooltip,
    Stack,
    useTheme,
    LinearProgress,
    Select,
    MenuItem,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Chip
} from "@mui/material";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridRowHeight,
    formGap,
} from "../../../ui-components/global/utils";
import LockOpenIcon from "@mui/icons-material/LockOpen";
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
    AttendanceEntryPost,
    AttendanceEntryLog,
    // AttendanceEntryGet,
} from "../../../store/reducers/Formapireducer";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CheckinAutocomplete, Employeeautocomplete, MultiFormikOptimizedAutocomplete, Productautocomplete } from "../../../ui-components/global/Autocomplete";
import {
    GridToolbarContainer,
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridRowEditStopReasons,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useProSidebar } from "react-pro-sidebar";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import {
    AttendanceEntryGet,
    AttendanceEntryLockGet,
    fetchExplorelitview,
} from "../../../store/reducers/Explorelitviewapireducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import AttendanceHistoryPDF from "../../reports/AttendanceHistoryPdf";
import { toast } from "react-hot-toast";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { nanoid } from "@reduxjs/toolkit";
import ScheduleIcon from "@mui/icons-material/Schedule";
const EditAttendanceEntry = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const mode = params.Mode;
    const dispatch = useDispatch();
    const isManager = sessionStorage.getItem("isManager");
    // const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    var recID = params.id;
    var accessID = params.accessID;
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const deploymentData = useSelector((state) => state.formApi.deploymentData);
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    const [show, setScreen] = React.useState("0");

    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorDialogData, setErrorDialogData] = useState("");
    //FOR OVERALL PRESENT CHECKBOX
    const [selectAllPresent, setSelectAllPresent] = useState(false);
    const EMPID = sessionStorage.getItem("EmpId");
    console.log(EMPID, "--EMPID");
    const CompanyID = sessionStorage.getItem("compID");
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [errorMsgData, setErrorMsgData] = useState(null);

    const [openUnlockDialog, setOpenUnlockDialog] = useState(false);
    const [unlockReason, setUnlockReason] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedProjectID, setSelectedProjectID] = useState(null);

    const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");
    const ClassificationData = JSON.parse(
        sessionStorage.getItem("ClassificationData") || "[]"
    );
    const UserRecordid = sessionStorage.getItem("loginrecordID");

    console.log(ClassificationData, "--find getItem ClassificationData");

    const filteredClassification = ClassificationData.filter(
        (item) => item.CfcName !== "Student"
    );
    const classificationIDs = filteredClassification.map(
        (item) => item.CfcID
    );

    const classificationIDString = classificationIDs
        .map((id) => `'${id}'`)
        .join(",");


    //TeacherID Filter Passing
    // const MangerEmpDetails = sessionStorage.getItem("MangerEmpDetails" || "[]");
    const MangerEmpDetails = JSON.parse(
        sessionStorage.getItem("MangerEmpDetails") || "[]"
    );
    console.log(MangerEmpDetails, "--MangerEmpDetails");

    const mgrEMPIDs = MangerEmpDetails.map(
        (item) => item.ID
    );

    const mgrEMPIDString = mgrEMPIDs
        .map((id) => `'${id}'`)
        .join(",");
    console.log(mgrEMPIDString, "--find mgrEMPIDString");


    // useEffect(() => {
    //    dispatch(getDeployment({HeaderID: "",}));
    //   }, []);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);





    const handleLockClick = (row, projectID) => {
        setSelectedRow(row);
        setSelectedProjectID(projectID);
        setOpenUnlockDialog(true);

    };
    const handleUnlockSubmit = async () => {
        if (!unlockReason.trim()) {
            alert("Please enter reason"); // or snackbar
            return;
        }

        const idata = {
            EmpID: EMPID,
            Reason: unlockReason,
            ManagerID: EMPID
        };
        console.log(idata, "Attendance entry log post");

        // return;
        const response = await dispatch(
            AttendanceEntryLog({ data: idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            const Lockget = await dispatch(AttendanceEntryLockGet({
                ManagerID: "",
                ProjectID: selectedProjectID,
                Checkindate: formatDateToDDMMYYYY(selectedDate),
                CompanyID: CompanyID,
            }));
            console.log(Lockget, "--find Lockget");
            const payload = Lockget?.payload;

            if (payload?.Status === "Y" && Array.isArray(payload?.Data)) {
                const LockgetData = payload.Data.map((value, index) => ({
                    ...value,
                    SLNO: index + 1,
                }));
                setRows(LockgetData);



                // ✅ set header checkbox immediately
                const allSelected = LockgetData.every(
                    (row) => Number(row.Present) === 1
                );
                setSelectAllPresent(allSelected);
            } else {
                setRows([]);
            }
            setOpenUnlockDialog(false);
            setUnlockReason("");
            setSelectedRow(null);
        } else {

            toast.error(response.payload.Msg);
        }
    };


    //get rowsdata
    // const AttendanceEntryrow = useSelector(
    //   (state) => state.formApi.AttendanceEntryrow
    // );
    // console.log("AttendanceEntryrow", AttendanceEntryrow);

    //post data
    const data = useSelector((state) => state.formApi.Data);
    console.log(data, "--data");

    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedPro, setSelectedPro] = useState([]);

    const formatDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months start from 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const [rows, setRows] = React.useState([]);

    // const handleApplyClick = (values) => {
    //   dispatch(AttendanceEntryGet({
    //     ManagerID: EMPID,
    //     Checkindate: formatDateToDDMMYYYY(selectedDate),
    //     CompanyID: companyID
    //   }));
    // };


    const handleApplyClick = async (values) => {

        const projecID = selectedPro
            ?.map((proj) => proj.RecordID)
            .join(",");

        console.log("PROJECT ID:", projecID);

        try {
            const resultAction = await dispatch(
                AttendanceEntryGet({

                    ClassificationID: values?.ProName?.map((C) => C.RecordID )|| [],
                    Checkindate: formatDateToDDMMYYYY(selectedDate),
                    CompanyID: CompanyID,
                })
            );

            const payload = resultAction?.payload;

            if (payload?.Status === "Y" && Array.isArray(payload?.Data)) {
                const resData = payload.Data.map((value, index) => ({
                    ...value,
                    SLNO: index + 1,
                }));

                setRows(resData);

                // ✅ Enable save only if data exists
                setIsSaveEnabled(resData.length > 0);

                // ✅ set header checkbox immediately
                const allSelected = resData.every(
                    (row) => Number(row.Present) === 1
                );
                setSelectAllPresent(allSelected);
            } else {
                setRows([]);
                setIsSaveEnabled(false);
            }
        } catch (error) {
            console.error("Error while applying attendance entry:", error);
            setRows([]);
        }
    };


    //post
    const handleSaveButtonClick = async () => {


        // ❌ Find rows with missing ShiftName
        const invalidRows = rows.filter(
            (row) => !row.ShiftName || row.ShiftName === null
        );


        if (invalidRows.length > 0) {
            // const names = invalidRows.map(r => r.EmpName).join(", ");
            const names = invalidRows
                .map((r) => r.EmpName?.split("||")[0]?.trim())
                .join(", ");
            setErrorDialogData(names);
            setOpenErrorDialog(true);
            return;
        }


        const formattedData = rows.map((row) => {
            const isShiftAdjusted = row.ShiftCheck === "Y";

            return {
                EmpID: row.EmpID,
                EntryDate: selectedDate,
                // Present: row.Present === 1 ? "Y" : "N",
                Present: Number(row.Present) === 1 ? "Y" : "N",
                Remarks: row.Remarks || "",
                AdminID: UserRecordid,
                // ProjectID: row.ProjectID || "",
                CompanyID: CompanyID,
                ShiftFromTime: isShiftAdjusted
                    ? row.ShiftFromTime
                    : row.ShiftStartTime,

                ShiftToTime: isShiftAdjusted
                    ? row.ShiftToTime
                    : row.ShiftEndTime,
            };
        });

        try {
            const response = await dispatch(
                AttendanceEntryPost({ AttendanceEntry: formattedData })
            );
            console.log(response, "--response");

            // if (response.payload.Status.Status === "Y") {
            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                // toast.success(response.payload.MailMsg);
                // navigate("/Apps/EditAttendanceentry");
                setRows([]);
                dispatch(resetTrackingData());
                setSelectAllPresent(false);
            } else if (response.payload.Status === "N") {
                toast.error(response.payload.Msg);
            } else {
                toast.error(response.payload.Msg || "Failed to save data.");
            }
        } catch (error) {
            console.error("Dispatch error:", error);
            toast.error("Something went wrong while saving.");
        }
    };

    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        // if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        // }
    };

    const handleEditClick = (EmpID) => () => {
        console.log("--calling Editclick");
        // Force DataGrid to re-evaluate editable state
        // setRowModesModel((prevModel) => ({
        //   ...prevModel,
        //   [updatedRow.EmpID]: { mode: GridRowModes.Edit },
        // }));
        setRowModesModel({
            ...rowModesModel,
            [EmpID]: { mode: GridRowModes.Edit },
        });
    };



    const processRowUpdate = (newRow, oldRow) => {
        const { EmpID, EmpName, Remarks, Present, SLNO } = newRow;
        const updatedRow = { ...newRow, isNew: false };

        setRows((prevRows) =>
            prevRows.map((row) => (row.EmpID === newRow.EmpID ? updatedRow : row))
        );
        console.log(updatedRow, "--processRowUpdate updatedRow");

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const handleSelectAllPresent = (checked) => {
        setSelectAllPresent(checked);

        setRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                Present: checked ? 1 : 0,
                ShiftCheck: checked ? row.ShiftCheck : "N",
                shiftChecked: checked ? row.shiftChecked : false,
                ShiftFromTime: checked ? row.ShiftFromTime : "",
                ShiftToTime: checked ? row.ShiftToTime : "",
            }))
        );
    };

    function AttendanceTool(props) {
        const { setRows, setRowModesModel } = props;
        const handleClick = () => {
            const id = nanoid();
            const nextSLNO =
                rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
            setRows((oldRows) => [
                ...oldRows,
                {
                    RecordID: id, // Temporary ID, replaced after backend save
                    SLNO: nextSLNO,
                    TaskID: "",
                    TaskDetailRoleID: "",
                    RoleCode: "",
                    RoleName: "",
                    TaskDetailEffort: 0,
                    TaskDetailUnit: "",
                    ProjectPlanedDate: "",
                    isNew: true,
                },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "TaskDetailRoleID" },
            }));
        };
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

    // const handlePresentCheckboxChange = (updatedRow) => {
    //   setRows((prevRows) =>
    //     prevRows.map((row) => (row.EmpID === updatedRow.EmpID ? updatedRow : row))
    //   );
    // };
    const handlePresentCheckboxChange = (updatedRow) => {
        const isPresent = Number(updatedRow.Present) === 1;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.EmpID === updatedRow.EmpID
                    ? {
                        ...row,
                        ...updatedRow,

                        // If Present becomes 0 → reset shift fields
                        shiftChecked: isPresent ? row.shiftChecked : false,
                        ShiftCheck: isPresent ? row.ShiftCheck : "N",
                        // ShiftFromTime: isPresent ? row.ShiftFromTime : "",
                        // ShiftToTime: isPresent ? row.ShiftToTime : "",
                        Present: updatedRow.Present,
                        ShiftFromTime: updatedRow.ShiftFromTime,
                        ShiftToTime: updatedRow.ShiftToTime,
                        Fromtime: isPresent ? row.Fromtime : "",
                        Totime: isPresent ? row.Totime : "",
                    }
                    : row
            )
        );
    };

    const [shiftList, setShiftList] = useState([]);
    const [openShiftPopup, setOpenShiftPopup] = useState(false);
    const [shiftPopupData, setShiftPopupData] = useState({
        empID: "",
        ShiftID: "",
        ShiftName: "",
        ShiftStartTime: "",
        ShiftEndTime: "",
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
        DesignationID: "",
        LocationID: "",
        StoregatemasterID: "",
        DefaultProject: "",
        ProjectCode: "",
        ProjectName: "",
        DefaultFunction: "",
        FunctionCode: "",
        FunctionName: "",
        Horizontal: false,
        Vertical: false,
        HorizontalMimNo: "",
        VerticalMimNo: "",
    });

    const AttColumn = [
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
            headerName: "Employee ID",
            field: "EmpID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },
        {
            headerName: "Project ID",
            field: "ProjectID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },
        {
            field: "EmpName",
            headerName: "Personnel",
            headerAlign: "center",
            width: 250,
        },
        {
            field: "Department",
            headerName: "Department",
            headerAlign: "center",
            width: 150,
            hide: is003Subscription ? true : false
        },
        {
            field: "Present",
            headerName: "Present",
            width: 100,
            sortable: false,
            headerAlign: "center",
            editable: false,
            renderHeader: () => (
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                    <Checkbox
                        checked={selectAllPresent}
                        indeterminate={
                            rows.some((r) => Number(r.Present) === 1) &&
                            !rows.every((r) => Number(r.Present) === 1)
                        }
                        onChange={(e) => handleSelectAllPresent(e.target.checked)}
                        size="small"
                    />
                    <Typography variant="body2">Present</Typography>
                </Box>
            ),
            renderCell: (params) => (
                <Checkbox
                    checked={Boolean(Number(params.row.Present))}
                    onChange={(e) => {
                        const isChecked = e.target.checked;

                        // Open popup only when checked
                        if (isChecked) {
                            setShiftPopupData({
                                SLNO: params.row.SLNO,
                                ShiftStartTime: params.row.ShiftStartTime,
                                ShiftEndTime: params.row.ShiftEndTime,
                                shiftChecked: params.row.shiftChecked || false,
                            });
                        }

                        //  Update Present and reset ShiftCheck when unchecked
                        setRows((prevRows) =>
                            prevRows.map((r) =>
                                r.SLNO === params.row.SLNO
                                    ? {
                                        ...r,
                                        Present: isChecked ? 1 : 0,
                                        ShiftCheck: isChecked ? r.ShiftCheck : "N",
                                        shiftChecked: isChecked ? r.shiftChecked : false,
                                        ShiftFromTime: isChecked ? r.ShiftFromTime : "",
                                        ShiftToTime: isChecked ? r.ShiftToTime : "",
                                    }
                                    : r
                            )
                        );
                    }}
                    color="primary"
                />
            ),
        },

        {
            field: "shift",
            headerName: "Shift",
            width: 100,
            sortable: false,
            headerAlign: "center",
            align: "center",
            editable: false,

            renderCell: (params) => (
                <IconButton
                    color="primary"
                    disabled={Number(params.row.Present) !== 1}
                    onClick={() => {
                        setShiftPopupData({
                            SLNO: params.row.SLNO,
                            ShiftStartTime: params.row.shiftChecked
                                ? params.row.ShiftFromTime
                                : params.row.ShiftStartTime,
                            ShiftEndTime: params.row.shiftChecked
                                ? params.row.ShiftToTime
                                : params.row.ShiftEndTime,
                        });
                        setOpenShiftPopup(true);
                    }}
                >
                    <ScheduleIcon />
                </IconButton>
            )

        },
        {
            field: "ShiftName",
            headerName: "Shift Name",
            headerAlign: "center",
            width: 150,
        },

        {
            field: "ShiftStartTime",
            headerName: "From Time",
            width: 150,
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    {params.row.shiftChecked ? params.row.ShiftFromTime : params.row.ShiftStartTime}
                </>
            ),
        },

        {
            field: "ShiftEndTime",
            headerName: "To Time",
            width: 100,
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    {params.row.shiftChecked ? params.row.ShiftToTime : params.row.ShiftEndTime}
                </>
            ),
        },

        {
            field: "Remarks",
            headerName: "Remarks",
            headerAlign: "center",
            width: 680,
            editable: true,
        },


    ];

    const entrows = [
        {
            SLNO: 1,
            Name: "John Doe",
            Present: "Yes",
            Remarks: "Attended all meetings",
        },
        {
            SLNO: 2,
            Name: "Jane Smith",
            Present: "No",
            Remarks: "On leave",
        },
    ];
    /***********Attendance ************/

    // const currentMonthNumber = new Date().getMonth() + 1;
    // const currentYear = new Date().getFullYear();
    const AttInitialvalues = {
        fromDate: today,
        ProName:[]
        // description: data.Name,
        // Sal: data.Sal,
        // month: currentMonthNumber,
        // year: currentYear,
    };
    const attendaceFnSave = async (values) => {
        const data = {
            Month: values.month.toString(),
            Year: values.year,
            ManagerID: EMPID,
            EmployeeID: EMPID,
            Etype: "E",
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


    const screenChange = (event) => {
        setScreen(event.target.value);
    };

    const [funMode, setFunMode] = useState("A");

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
    };
    return (
        <React.Fragment>
            {/* {getLoading && <LinearProgress />} */}
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
                                >Team Attendance</Typography>
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

                    <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
                        <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
                            <Paper elevation={0} sx={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 3, p: 3 }}>
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
                                                dispatch(resetTrackingData());
                                            }}
                                        >

                                            {/* ----- CARD HEADER ----- */}
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={1.5}
                                                mb={1}
                                            // sx={{ px: 2, pt: 2 }}
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
                                                        ☑️
                                                    </Typography>
                                                </Box>

                                                {/* TITLE + SUBTITLE */}
                                                <Box>
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight={700}
                                                        color="#0D94885"
                                                    >
                                                        Team Attendance
                                                    </Typography>

                                                    <Typography variant="body2" color="text.secondary">
                                                        Attendance Entry
                                                    </Typography>
                                                </Box>
                                            </Box>


                                            <Box
                                                sx={{
                                                    display: "grid",
                                                    gridTemplateColumns: {
                                                        xs: "1fr",
                                                        md: "1fr auto",
                                                    },
                                                    gap: 2,
                                                    alignItems: "center",
                                                    width: "100%",
                                                    p: 1,
                                                }}
                                            >
                                                <Stack
                                                    direction={{ xs: "column", lg: "row" }}
                                                    spacing={2}
                                                    alignItems={{ xs: "stretch", lg: "center" }}
                                                    sx={{
                                                        width: "100%",
                                                    }}
                                                >
                                                    <TextField
                                                        name="fromDate"
                                                        type="date"
                                                        size="small"
                                                        label="Date"
                                                        variant="outlined"
                                                        focused
                                                        value={selectedDate}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setSelectedDate(newDate);
                                                            setRows((prev) =>
                                                                prev.map((r) => ({
                                                                    ...r,
                                                                    Present: 0,
                                                                    ShiftFromTime: "",
                                                                    ShiftToTime: "",
                                                                    shiftChecked: false,
                                                                }))
                                                            );
                                                        }}
                                                        InputLabelProps={{ shrink: true }}
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: 220,
                                                            },
                                                            flexShrink: 0,

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
                                                    />

                                                    <Box
                                                        sx={{
                                                            width: {
                                                                xs: "100%",
                                                                sm: 280,
                                                                md: 320,
                                                                lg: 350,
                                                            },
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {/* <CheckinAutocomplete
                                                            sx={{
                                                                width: "100%",

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
                                                            }}
                                                            name="ProName"
                                                            label="Classification"
                                                            id="ProName"
                                                            value={values.ProName}
                                                            onChange={(newValue) => {
                                                                setFieldValue("ProName", newValue);
                                                            }}
                                                            error={!!touched.ProName && !!errors.ProName}
                                                            helperText={touched.ProName && errors.ProName}
                                                            url={`${listViewurl}?data=${JSON.stringify({
                                                                Query: {
                                                                    AccessID: "2209",
                                                                    ScreenName: "Classification",
                                                                    VerticalLicense: Subscriptionlastthree,
                                                                    Filter: `CompanyID='${CompanyID}'`,
                                                                    Any: "",
                                                                },
                                                            })}`}
                                                        /> */}
                                                        <MultiFormikOptimizedAutocomplete
                                                            sx={{
                                                                width: "100%",
                                                                "& .MuiOutlinedInput-root": {
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#fff",
                                                                    minHeight: "40px",
                                                                },
                                                                "& .MuiInputLabel-root": {
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                            name="ProName"
                                                            label="Classification"                                                            
                                                            id="ProName"
                                                            value={values.ProName}
                                                            onChange={(e, newValue) =>
                                                                setFieldValue(
                                                                    "ProName",
                                                                    newValue,
                                                                    true,
                                                                )
                                                            }                                                           
                                                            url={`${listViewurl}?data=${JSON.stringify(
                                                                {
                                                                    Query: {
                                                                        AccessID: "2209",
                                                                        ScreenName: "Classification",
                                                                        VerticalLicense:
                                                                            Subscriptionlastthree,
                                                                        Filter: `CompanyID=${CompanyID}`,
                                                                        Any: "",
                                                                    },
                                                                },
                                                            )}`}
                                                        />
                                                    </Box>

                                                    {/* {is003Subscription && (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: {
                                                                    xs: "flex-start",
                                                                    lg: "center",
                                                                },
                                                            }}
                                                        >
                                                            <Tooltip title="Review">
                                                                <IconButton
                                                                    color="success"
                                                                    onClick={() =>
                                                                        handleLockClick(params.row, values?.ProName?.RecordID)
                                                                    }
                                                                >
                                                                    <LockOpenIcon sx={{ fontSize: 30 }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    )} */}
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    justifyContent={{
                                                        xs: "flex-start",
                                                        md: "flex-end",
                                                    }}
                                                    sx={{
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={() => handleApplyClick(values)}
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
                                                </Stack>
                                            </Box>
                                            <Box sx={{ gridColumn: "span 4" }}>
                                                <Box
                                                    // padding={1}
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
                                                        "& .leave-row": {
                                                            backgroundColor: "#f3cd9b", // light green
                                                            color: "#a16a03", // dark green text
                                                        },
                                                        "& .MuiDataGrid-columnHeaderTitle": {
                                                            color: colors.blueAccent[900],
                                                            fontWeight: 600,
                                                        },
                                                        "& .MuiTablePagination-root": {
                                                            color: colors.blueAccent[900],
                                                        },
                                                        /* ✅ PAGINATION STYLES (WHITE COLOR) */
                                                        "& .MuiTablePagination-root": {
                                                            color: "#fff",
                                                        },

                                                        "& .MuiTablePagination-selectLabel": {
                                                            color: "#fff",
                                                        },

                                                        "& .MuiTablePagination-displayedRows": {
                                                            color: "#fff",
                                                        },

                                                        /* Dropdown icon */
                                                        "& .MuiTablePagination-selectIcon": {
                                                            color: "#fff",
                                                        },

                                                        /* Left & Right arrow buttons */
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
                                                        // rows={AttendanceEntryrow}
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
                                                        // loading={getLoading}
                                                        componentsProps={{
                                                            toolbar: {
                                                                showQuickFilter: true,
                                                                quickFilterProps: { debounceMs: 500 },
                                                            },
                                                        }}

                                                        getRowClassName={(params) => {
                                                            const status = params.row.Status;
                                                            if (status === "Week Off") return "weekoff-row";
                                                            if (status === "Holiday") return "holiday-row";
                                                            // if (status === "Casual leave" || status === "Sick leave" || status === "Medical leave") return "leave-row";
                                                            const leaveStatuses = [
                                                                "casual leave",
                                                                "sick leave",
                                                                "medical leave",
                                                            ];

                                                            if (leaveStatuses.includes(status?.trim().toLowerCase())) {
                                                                return "leave-row";
                                                            }

                                                            return params.indexRelativeToCurrentPage % 2 === 0
                                                                ? "odd-row"
                                                                : "even-row";
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                                mt="15px"
                                                gap="20px"
                                                padding={1}
                                            >

                                                <Box display="flex" flexDirection="row" padding="15px" gap={formGap}>
                                                    <LoadingButton
                                                        // color="secondary"
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
                                                        loading={isLoading}
                                                        onClick={handleSaveButtonClick}
                                                    // disabled={isSaveEnabled}
                                                    >
                                                        Save
                                                    </LoadingButton>


                                                </Box>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </Paper>
                        </Box>
                    </Box>

                    <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
                        <DialogTitle sx={{ fontWeight: 600 }}>
                            Missing Data
                        </DialogTitle>

                        <DialogContent>
                            <Typography sx={{ mb: 1, fontWeight: 700 }}>
                                Please Configure Shift Timings & Course Assignment for:
                            </Typography>

                            <Box
                                sx={{
                                    maxHeight: 200,
                                    overflowY: "auto",
                                    bgcolor: "#fff4f4",
                                    p: 1.5,
                                    borderRadius: 1,
                                    border: "1px solid #f5c2c2",
                                }}
                            >
                                {errorDialogData.split(",").map((name, index) => (
                                    <Typography
                                        key={index}
                                        sx={{
                                            color: "#d32f2f",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                        }}
                                    >
                                        • {name.trim()}
                                    </Typography>
                                ))}
                            </Box>
                        </DialogContent>

                        <DialogActions>
                            <Button
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 2,
                                    color: "#fff",
                                    px: 2,
                                    bgcolor: "#0D9488",
                                    "&:hover": {
                                        bgcolor: "#0F766E",
                                    },
                                }}
                                onClick={() => setOpenErrorDialog(false)}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openShiftPopup} onClose={() => setOpenShiftPopup(false)}>
                        <DialogTitle>Update Shift</DialogTitle>
                        <DialogContent sx={{ width: 400 }}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Shift Start Time"
                                variant="standard"
                                value={shiftPopupData.ShiftStartTime}
                                onChange={(e) =>
                                    setShiftPopupData({ ...shiftPopupData, ShiftStartTime: e.target.value })
                                }
                                focused
                                sx={{ mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                type="time"
                                label="Shift End Time"
                                variant="standard"
                                value={shiftPopupData.ShiftEndTime}
                                onChange={(e) =>
                                    setShiftPopupData({ ...shiftPopupData, ShiftEndTime: e.target.value })
                                }
                                focused
                                sx={{ mt: 2 }}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setOpenShiftPopup(false)}>Cancel</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    // setRows((prevRows) =>
                                    //   prevRows.map((r) =>
                                    //     r.SLNO === shiftPopupData.SLNO
                                    //       ? {
                                    //         ...r,
                                    //         shiftChecked: true,
                                    //         ShiftFromTime: shiftPopupData.ShiftStartTime,
                                    //         ShiftToTime: shiftPopupData.ShiftEndTime,
                                    //         Fromtime: shiftPopupData.ShiftStartTime,
                                    //         Totime: shiftPopupData.ShiftEndTime,
                                    //       }
                                    //       : r
                                    //   )
                                    // );
                                    setRows((prevRows) =>
                                        prevRows.map((r) =>
                                            r.SLNO === shiftPopupData.SLNO
                                                ? {
                                                    ...r,
                                                    shiftChecked: true,
                                                    ShiftCheck: "Y",
                                                    ShiftFromTime: shiftPopupData.ShiftStartTime,
                                                    ShiftToTime: shiftPopupData.ShiftEndTime,
                                                    Fromtime: shiftPopupData.ShiftStartTime,
                                                    Totime: shiftPopupData.ShiftEndTime,
                                                }
                                                : r
                                        )
                                    );

                                    setOpenShiftPopup(false);
                                }}
                            >
                                Apply
                            </Button>

                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>


        </React.Fragment>
    );
};

export default EditAttendanceEntry;




