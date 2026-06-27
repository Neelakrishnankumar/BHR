import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    FormControlLabel,
    Tooltip,
    Checkbox,
    LinearProgress,
    Paper,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Breadcrumbs,
    Chip,
    InputAdornment,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox, Schedule } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
    CustomisedCaptionGet,
    explorePostData,
    fetchApidata,
    getFetchData,
    getFetchData_v1,
    postApidata,
    postData,
    staffmappingTeacherget,
    TaskProcess,
    UnitFetchData,
} from "../../../store/reducers/Formapireducer";
import * as Yup from "yup";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/global/utils";
import {
    CheckinAutocomplete,
    CheckinAutocomplete_v12,
    Employeeautocomplete,
    EventsSingleSelect,
    MultiFormikOptimizedAutocomplete,
    MultiFormikOptimizedAutocompletestaff,
    PartySingleSelect,
    Productautocomplete,
    ProjectVendor,
    SprintEmpAutocomplete,
    SprintEmpAutocomplete1,
    SubjectAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridHeightExplore,
    dataGridRowHeight,
    menuHeight,
} from "../../../ui-components/utils";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import { nanoid } from "@reduxjs/toolkit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
const Editproject_V1 = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const YearID = params.filtertype;
    const data = useSelector((state) => state.formApi.Data) || {};
    const Department =
        useSelector((state) => state.formApi.Department.Department) || [];
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    const staffmappingGetData = useSelector(
        (state) => state.formApi.staffmappingGetData,
    );
    console.log("🚀 ~ Editproject_V1 ~ staffmappingGetData:", staffmappingGetData)
    const staffmappingGetDataloading = useSelector(
        (state) => state.formApi.staffmappingGetDataloading,
    );

    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const [employee, setEmployee] = useState("");
    const location = useLocation();
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [validationSchema2, setValidationSchema2] = useState(null);
    let secondaryCurrentPage = parseInt(
        sessionStorage.getItem("secondaryCurrentPage"),
    );
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";

    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);
    const [show, setScreen] = React.useState("0");
    const [funMode, setFunMode] = useState("A");
    const [laomode, setLaoMode] = useState("A");
    const colors = tokens(theme.palette.mode);
    const [page, setPage] = React.useState(secondaryCurrentPage);
    const [pageSize, setPageSize] = useState(7);
    const [rowCount, setRowCount] = useState(0);
    const [rowLoading, setRowLoading] = useState(false);
    const [deletedRows, setDeletedRows] = useState([]);
    const [editedRows, setEditedRows] = useState([]);
    const [passrecid, setPassrecid] = useState(null);
    const [detailrecid, setDetailrecid] = useState(null);

    const explorelistViewData = useSelector(
        (state) => state.exploreApi.explorerowData,
    );
    const explorelistViewcolumn = useSelector(
        (state) => state.exploreApi.explorecolumnData,
    );
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const [rows, setRows] = useState([]);
    const rowData = location.state || {};
    var screenName = rowData.name;

    const DeptLookupCheck = data.RoutineTasks === "Y" ? "A" : "S";
    // STUDENT-TEACHER MAPPING
    const [teachrows, setTeachrows] = useState([]);
    const [rowModesModelteach, setRowModesModelteach] = React.useState({});
    // STUDENT-TEACHER - STAFF MAPPING
    const [staffrows, setStaffrows] = useState([]);
    const [rowModesModelstaff, setRowModesModelStaff] = React.useState({});

    //UNIT AREA MAPPING
    const [unitrows, setunitrows] = useState([]);
    const [unitrows2, setunitrows2] = useState([]);
    const [selectedSubjectID, setSelectedSubjectID] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [rowModesModelunit, setRowModesModelunit] = React.useState({});
    const [rowModesModelunit2, setRowModesModelunit2] = React.useState({});
    //TIME TABLE MAPPING
    const [TimeTablerows, setTimeTablerows] = useState([]);
    console.log("🚀 ~ Editproject_V1 ~ TimeTablerows:", TimeTablerows)
    const [rowModesModelTimeTable, setRowModesModelTimeTable] = React.useState(
        {},
    );
    const [searchText, setSearchText] = useState("");

    //TIME TABLE - MODAL POP UP
    const [openProcessModal, setOpenProcessModal] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const isRowEditing = Object.values(rowModesModelteach).some(
        (row) => row.mode === GridRowModes.Edit,
    );
    const isRowEditingUnit = Object.values(rowModesModelunit).some(
        (row) => row.mode === GridRowModes.Edit,
    );
    const isRowEditingUnit2 = Object.values(rowModesModelunit2).some(
        (row) => row.mode === GridRowModes.Edit,
    );

    useEffect(() => {
        if (show === "5") {
            dispatch(
                UnitFetchData({
                    ProjectID: recID,
                    CompanyID,
                })
            ).then((response) => {
                if (response?.payload?.Status === "Y") {

                    setRowModesModelunit({}); // <- IMPORTANT

                    setunitrows(
                        response.payload.details.map((row) => ({
                            ...row,
                            id: row.RecordID,
                            Subject: {
                                RecordID: row.SubjectID,
                                Name: row.SubjectName,
                            },
                        }))
                    );
                }
            });
        }
    }, [show]);
    useEffect(() => {
        if (show === "7") {
            dispatch(
                UnitFetchData({
                    ProjectID: recID,
                    CompanyID,
                })
            ).then((response) => {
                if (response?.payload?.Status === "Y") {

                    setRowModesModelunit2({}); // <- IMPORTANT

                    setunitrows2(
                        response.payload.details.map((row) => ({
                            ...row,
                            id: row.RecordID,
                            Subject: {
                                RecordID: row.SubjectID,
                                Name: row.SubjectName,
                            },
                        }))
                    );
                }
            });
        }
    }, [show]);

    //Timetable
    useEffect(() => {
        if (show === "6" && staffmappingGetData?.entries) {

            setRowModesModelTimeTable({});

            const formattedRows = staffmappingGetData.entries.map((entry) => ({
                id: Number(entry.id),
                RecordID: Number(entry.id),

                term: entry.term || null,
                department: entry.department || null,
                assignedTo: entry.assignedTo || null,

                area: entry.area || [],
                day: entry.day || [],
                slot: entry.slot || [],

                isNew: false,
            }));

            console.log("formattedRows", formattedRows);

            setTimeTablerows(formattedRows);
        }
    }, [show, staffmappingGetData]);

    const filteredRows = useMemo(() => {
        if (!searchText.trim()) return TimeTablerows;

        const search = searchText.toLowerCase();

        return TimeTablerows.filter((row) => {
            return (
                row.term?.Name?.toLowerCase().includes(search) ||
                row.department?.Name?.toLowerCase().includes(search) ||
                row.assignedTo?.Name?.toLowerCase().includes(search) ||

                row.area?.some((x) =>
                    x.Name?.toLowerCase().includes(search)
                ) ||

                row.day?.some((x) =>
                    x.Name?.toLowerCase().includes(search)
                ) ||

                row.slot?.some((x) =>
                    x.Name?.toLowerCase().includes(search)
                )
            );
        });
    }, [TimeTablerows, searchText]);
    const validateRowTT = (row) => {
        if (!row.Department) return "Please Select the Subject";
        if (!row.Teacher) return "Please Select the Teacher";
        return null;
    };

    // ─── FnsaveTech ──────────────────────────────────────────────────────────────
    // saveAccessID controls which endpoint is hit:
    //   • "TR275" → header save (show=0, 003 subscription) — sends full header fields, no Detail
    //   • "TR389" → detail row save (show=4 grid rows)      — sends RecordID + Detail array
    //
    // payload = null  → header-only save (navigates back on success)
    // payload = {...} → detail row save  (returns ProjectTeamID for DataGrid row update)
    const FnsaveTech = async (
        values,
        del,
        payload,
        isNew,
        saveAccessID = "TR389",
    ) => {
        console.log(values, "--values find | accessID:", saveAccessID);
        const action = isNew ? "insert" : "update";

        // values may be {} when called from show=4 (TR389 detail save) —
        // disable flag is only relevant for TR275 header saves.
        var isCheck = "N";
        if (values?.disable == true) isCheck = "Y";

        console.log(passrecid, "--find inside fnsave");

        // Header RecordID: prefer passrecid (set after first insert), fall back to route param
        const headerRecordID = passrecid ? passrecid : recID ? recID : -1;

        // ── Build idata based on which endpoint we're calling ─────────────────
        let idata;

        idata = {
            RecordID: headerRecordID,
            Code: data.Code,
            Name: data.Name,
            ProjectIncharge: data.ProjectIncharge || 0,
            ProjectInchargeName: data.ProjectInchargeName || "",
            ServiceMaintenanceProject:
                data.ServiceMaintenanceProject === true ? "Y" : "N",
            RoutineTasks: data.RoutineTasks === true ? "Y" : "N",
            SortOrder: data.SortOrder || 0,
            CurrentStatus: data.CurrentStatus,
            Disable: data.Disable === true ? "Y" : "N",
            DeleteFlag: data.DeleteFlag === true ? "Y" : "N",
            ByProduct: data.ByProduct, // always N for 003
            EnableOnsiteactivities: data.EnableOnsiteactivities, // always N for 003
            ActualCost: data.ActualCost || 0,
            Price: data.Price || 0,
            Budget: data.Budget || 0,
            ScheduledCost: data.ScheduledCost || 0,
            Finyear,
            CompanyID,
            ProjectOwnerID: data.ProjectOwnerID || 0,
            Longitude: data.Longitude || 0,
            Latitude: data.Latitude || 0,
            Radius: data.Radius || 0,
            AcademicYearID: params.filtertype || 0,
            TentativeStartDate: data.TentativeStartDate || "",
            TentativeEndDate: data.TentativeEndDate || "",
            Detail: payload
                ? [
                    {
                        DeptID: payload.DeptID?.toString() || "0",
                        EmpID: payload.EmpID?.toString() || "0",
                        ProjectTeamRecordID: isNew
                            ? -1
                            : Number(payload.ProjectTeamRecordID),
                    },
                ]
                : [],
        };

        console.log(idata, "--idata in FnsaveTech | accessID:", saveAccessID);

        const response = await dispatch(
            postData({ accessID: saveAccessID, action, idata }),
        );

        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            console.log(
                response.payload.ProjectRecordID,
                "--response.payload.ProjectRecordID",
            );
            dispatch(
                getFetchData_v1({ accessID: "TR389", get: "get", recID, CompanyID }),
            );
            setPassrecid(response.payload.ProjectRecordID);
            setDetailrecid(response.payload.ProjectTeamID);

            // Detail row save → return new ID so DataGrid can update the row
            return response.payload.ProjectTeamID;
        } else {
            throw new Error(response.payload.Msg);
        }
    };
    //STAFF_MAPPING_V1
    const FnsaveTech_V1 = async (
        values,
        del,
        payload,
        isNew,
        saveAccessID = "TR389v1",
    ) => {
        const action = isNew ? "insert" : "update";

        // Header RecordID: prefer passrecid (set after first insert), fall back to route param
        const headerRecordID = passrecid ? passrecid : recID ? recID : -1;

        // ── Build idata based on which endpoint we're calling ─────────────────
        let idata;

        idata = {
            RecordID: headerRecordID,
            Code: data.Code,
            Name: data.Name,
            ProjectIncharge: data.ProjectIncharge || 0,
            ProjectInchargeName: data.ProjectInchargeName || "",
            ServiceMaintenanceProject:
                data.ServiceMaintenanceProject === true ? "Y" : "N",
            RoutineTasks: data.RoutineTasks === true ? "Y" : "N",
            SortOrder: data.SortOrder || 0,
            CurrentStatus: data.CurrentStatus,
            Disable: data.Disable === true ? "Y" : "N",
            DeleteFlag: data.DeleteFlag === true ? "Y" : "N",
            ByProduct: data.ByProduct, // always N for 003
            EnableOnsiteactivities: data.EnableOnsiteactivities, // always N for 003
            ActualCost: data.ActualCost || 0,
            Price: data.Price || 0,
            Budget: data.Budget || 0,
            ScheduledCost: data.ScheduledCost || 0,
            Finyear,
            CompanyID,
            ProjectOwnerID: data.ProjectOwnerID || 0,
            Longitude: data.Longitude || 0,
            Latitude: data.Latitude || 0,
            Radius: data.Radius || 0,
            AcademicYearID: params.filtertype || 0,
            TentativeStartDate: data.TentativeStartDate || "",
            TentativeEndDate: data.TentativeEndDate || "",
            Detail: payload
                ? [
                    {
                        DeptID: payload.DeptID?.toString() || "0",
                        EmpID: payload.EmpID?.toString() || "0",
                        ProjectTeamRecordID: isNew
                            ? -1
                            : Number(payload.ProjectTeamRecordID),
                        UnitAreaID: payload.UnitAreaID?.toString() || "0",
                        SlotID: payload.SlotID?.toString() || "0",
                        TermID: payload.TermID?.toString() || "0",
                    },
                ]
                : [],
        };


        const response = await dispatch(
            postData({ accessID: saveAccessID, action, idata }),
        );

        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            dispatch(getFetchData({ accessID, get: "get", recID }))
            dispatch(
                staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
            );
            setPassrecid(response.payload.ProjectRecordID);
            setDetailrecid(response.payload.ProjectTeamID);

            // Detail row save → return new ID so DataGrid can update the row
            return response.payload.ProjectTeamID;
        } else {
            throw new Error(response.payload.Msg);
        }
    };

    const FnsaveUnit = async (
        values,
        del,
        payload,
        isNew,
        saveAccessID = "TR402",
    ) => {
        const action = isNew ? "insert" : "update";

        var isCheck = "N";
        if (values?.disable == true) isCheck = "Y";
        let idata;

        idata = {
            RecordID: isNew ? "-1" : String(payload.data.RecordID),

            CompanyID,
            ProjectID: recID,
            DeptID: payload?.data?.SubjectID,

            Description: payload?.data?.Description || "",
            SortOrder: 1
        };

        const response = await dispatch(
            postData({ accessID: "TR402", action, idata }),
        );

        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            // setScreen("5");
            // dispatch(
            //     UnitFetchData({
            //         ProjectID: recID,
            //         CompanyID,
            //         SubjectID: selectedSubjectID,
            //     }),
            // );
            // dispatch(getFetchData({ accessID, get: "get", recID }));
            return response.payload;
        } else {
            throw new Error(response.payload.Msg);
        }
    };

    // ─── processRowUpdateTeach ────────────────────────────────────────────────────
    // Wired to <DataGrid processRowUpdate={processRowUpdateTeach}> in show=4.
    // The Save icon in Teachcolumns calls handleSaveClickTeach which just switches
    // the row to View mode; DataGrid then fires processRowUpdate automatically.
    const processRowUpdateTeach = async (newRow, oldRow) => {
        console.log(newRow, "--inside processRowUpdateTeach");
        // formikRef is attached to show=0 Formik which is unmounted in show=4.
        // TR389 detail save does not need header form values — pass {} safely.
        const currentFormikValues = formikRef.current?.values ?? {};
        console.log(currentFormikValues, "currentFormikValues");

        const error = validateRowTT(newRow);
        if (error) throw new Error(error);

        const isNew = isNaN(Number(newRow.RecordID));

        const payload = {
            ProjectTeamRecordID: isNew ? -1 : Number(newRow.RecordID),
            EmpID: newRow.Teacher?.RecordID || 0,
            DeptID: newRow.Department?.RecordID || 0,
        };

        try {
            const HeaderID = await FnsaveTech(
                currentFormikValues, // {} when show=4 — TR389 branch ignores values
                false, // del = false
                payload, // detail payload
                isNew, // isNew flag
                "TR389", // detail rows always use TR389
            );

            const updatedRow = {
                ...newRow,
                id: HeaderID,
                RecordID: HeaderID,
                isNew: false,
            };

            setTeachrows((prevRows) =>
                prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
            );

            return updatedRow;
        } catch (err) {
            console.error("Row save failed:", err);
            throw err;
        }
    };

    const handleRowEditStopTeach = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowEditStopUnit = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowEditStopUnit2 = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowEditStopTimeTable = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClickTeach = (RecordID) => () => {
        setRowModesModelteach({
            ...rowModesModelteach,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    // ✅ This is all handleSaveClickTeach needs to do — switch to View mode.
    //    DataGrid will call processRowUpdateTeach automatically after this.
    const handleSaveClickTeach = (RecordID) => () => {
        setRowModesModelteach({
            ...rowModesModelteach,
            [RecordID]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickTeach = (id) => async () => {
        try {
            const targetRow = teachrows.find((row) => row.id === id);
            const RecordID = targetRow?.RecordID;

            setTeachrows((prevRows) => prevRows.filter((row) => row.id !== id));

            if (!RecordID || isNaN(Number(RecordID))) {
                toast.success("Deleted Successfully");
                return;
            }

            const response = await dispatch(
                postData({
                    accessID: "TR389",
                    action: "harddelete",
                    idata: { ProjectTeamRecordID: Number(RecordID) },
                }),
            );

            if (response?.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                dispatch(
                    getFetchData_v1({ accessID: "TR389", get: "get", recID, CompanyID }),
                );
            } else {
                toast.error(response?.payload?.Msg || "Delete failed");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Error occurred while deleting.");
        }
    };

    const handleCancelClickTeach = (RecordID) => () => {
        setRowModesModelteach({
            ...rowModesModelteach,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = teachrows.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setTeachrows(teachrows.filter((row) => row.RecordID !== RecordID));
        }
    };

    //TIMETABLE
    const handleEditClickTimeTable = (RecordID) => () => {
        setRowModesModelTimeTable({
            ...rowModesModelTimeTable,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };
    const handleSaveClickTimeTable = (RecordID) => () => {
        setRowModesModelTimeTable({
            ...rowModesModelTimeTable,
            [RecordID]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickTimeTable = (id) => async () => {
        try {
            const values = formikRef.current?.values ?? {};
            const row = TimeTablerows.find((r) => r.id === id);

            if (!row) return;

            const isNew = isNaN(Number(row.RecordID));

            // 🔹 If not saved yet → just remove locally
            if (isNew) {
                setTimeTablerows((prev) => prev.filter((r) => r.id !== id));
                toast.success("Deleted locally");
                return;
            }

            // 🔹 DETAIL for delete
            const detailPayload = {
                ProjectTeamRecordID: row.RecordID,
                RecordID: row.id,

                DeptID: row.department?.RecordID || "0",

                EmpID: row.assignedTo?.RecordID || "0",

                TermID: row.term?.RecordID || "0",

                Day: Array.isArray(row.day)
                    ? row.day.map((d) => d.Name).join(",")
                    : "",

                SlotID: Array.isArray(row.slot)
                    ? row.slot.map((s) => s.RecordID).join(",")
                    : "",

                UnitAreaID: Array.isArray(row.area)
                    ? row.area.map((a) => a.RecordID).join(",")
                    : "",
            };

            const idata = {
                RecordID: recID || "0",
                Code: data?.Code || "",
                Name: data?.Name || "",
                SortOrder: "1",
                Disable: "N",
                ProjectIncharge: data?.ProjectIncharge || 0,
                ServiceMaintenanceProject: "N",
                RoutineTasks: data?.RoutineTask || "N",
                CurrentStatus: "Active",
                DeleteFlag: "N",
                Budget: "0",
                Price: "0",
                ByProduct: "N",
                ProjectOwnerID: values?.ProjectOwnerID || 0,
                Radius: values?.Radius || "0",
                Latitude: values?.Latitude || "",
                Longitude: values?.Longitude || "",
                EnableOnsiteactivities: "Y",
                AcademicYearID: YearID,
                CompanyID,

                Detail: [detailPayload],
            };

            const response = await dispatch(postData({ accessID: "tr389v1", action: "harddelete", idata }));

            if (response?.payload?.Status === "Y") {
                setTimeTablerows((prev) => prev.filter((r) => r.id !== id));
                toast.success("Deleted successfully");
                dispatch(getFetchData({ accessID, get: "get", recID }));
                dispatch(
                    staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
                );
            } else {
                toast.error(response?.payload?.Msg || "Delete failed");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Error deleting row");
        }
    };

    const handleCancelClickTimeTable = (RecordID) => () => {
        setRowModesModelTimeTable({
            ...rowModesModelTimeTable,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = TimeTablerows.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setTimeTablerows(
                TimeTablerows.filter((row) => row.RecordID !== RecordID),
            );
        }
    };

    //STAFF_MAPPIMNG_V1
    const processRowUpdateTeach_V1 = async (newRow, oldRow) => {
        const values = formikRef.current?.values ?? {};
        const isNew = isNaN(Number(newRow.RecordID));

        if (!newRow.term?.RecordID) {
            throw new Error("Please select a Term");
        }
        if (!newRow.department?.RecordID) {
            throw new Error("Please select a Task");
        }
        if (!Array.isArray(newRow.area) || newRow.area.length === 0) {
            throw new Error("Please select an Area");
        }

        if (!Array.isArray(newRow.day) || newRow.day.length === 0) {
            throw new Error("Please select a Day");
        }

        if (!Array.isArray(newRow.slot) || newRow.slot.length === 0) {
            throw new Error("Please select a Slot");
        }
        if (!newRow.assignedTo?.RecordID) {
            throw new Error("Please select Assigned To");
        }
        let action = isNew ? "insert" : "update";
        // 🔹 DETAIL (row)
        const detailPayload = {
            ProjectTeamRecordID: isNew ? "-1" : newRow.RecordID,
            RecordID: isNew ? "-1" : newRow.id,

            DeptID: newRow.department?.RecordID || "0",

            EmpID: newRow.assignedTo?.RecordID || "0",
            TermID: newRow.term?.RecordID || "0",

            Day: Array.isArray(newRow.day)
                ? newRow.day.map((d) => d.Name).join(",")
                : "",

            SlotID: Array.isArray(newRow.slot)
                ? newRow.slot.map((s) => s.RecordID).join(",")
                : "",

            UnitAreaID: Array.isArray(newRow.area)
                ? newRow.area.map((a) => a.RecordID).join(",")
                : "",
        };
        const idata = {
            RecordID: recID,
            Code: data.Code,
            Name: data.Name,
            ProjectIncharge: data.ProjectIncharge || 0,
            ProjectInchargeName: data.ProjectInchargeName || "",
            ServiceMaintenanceProject:
                data.ServiceMaintenanceProject,
            RoutineTasks: data.RoutineTasks || "N",
            SortOrder: data.SortOrder || 0,
            CurrentStatus: data.CurrentStatus,
            Disable: data.Disable,
            DeleteFlag: data.DeleteFlag,
            ByProduct: data.ByProduct, // always N for 003
            EnableOnsiteactivities: data.EnableOnsiteactivities, // always N for 003
            ActualCost: data.ActualCost || 0,
            Price: data.Price || 0,
            Budget: data.Budget || 0,
            ScheduledCost: data.ScheduledCost || 0,
            Finyear,
            CompanyID,
            ProjectOwnerID: data.ProjectOwnerID || 0,
            Longitude: data.Longitude || 0,
            Latitude: data.Latitude || 0,
            Radius: data.Radius || 0,
            AcademicYearID: params.filtertype || 0,
            TentativeStartDate: data.TentativeStartDate || "",
            TentativeEndDate: data.TentativeEndDate || "",

            // 🔥 IMPORTANT
            Detail: [detailPayload],
        };

        try {
            const response = await dispatch(postData({ accessID: "tr389v1", action, idata }));

            if (response?.payload?.Status === "Y") {
                const updatedRow = {
                    ...newRow,
                    isNew: false,
                };

                setTimeTablerows((prev) =>
                    prev.map((r) => (r.id === newRow.id ? updatedRow : r)),
                );


                dispatch(
                    getFetchData({ accessID: "TR275", get: "get", recID }),
                );
                dispatch(
                    staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
                );
                toast.success("Saved successfully");
                return updatedRow;
            } else {
                throw new Error(response?.payload?.Msg || "Save failed");
            }
        } catch (err) {
            toast.error(err.message);
            return oldRow; // restore original values
        }
    };
    const handleRowEditStopTeach_V1 = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowEditStopUnit_V1 = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClickTeach_V1 = (RecordID) => () => {
        setRowModesModelStaff({
            ...rowModesModelstaff,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    // ✅ This is all handleSaveClickTeach needs to do — switch to View mode.
    //    DataGrid will call processRowUpdateTeach automatically after this.
    const handleSaveClickTeach_V1 = (RecordID) => () => {
        setRowModesModelStaff({
            ...rowModesModelstaff,
            [RecordID]: { mode: GridRowModes.View },
        });
    };
    const handleCancelClickTeach_V1 = (RecordID) => () => {
        setRowModesModelStaff({
            ...rowModesModelstaff,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = staffrows.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setStaffrows(staffrows.filter((row) => row.RecordID !== RecordID));
        }
    };

    //-----------------------------------STAFF_MAPPING END--------------------------------------------

    //UNITS
    // const handleUnitApply = async () => {
    //     if (!selectedSubjectID) {
    //         toast.error("Select select a Subject/Activity")
    //     }
    //     const payload = {
    //         ProjectID: recID,
    //         CompanyID,
    //         SubjectID: selectedSubjectID || 0,
    //     };

    //     const response = await dispatch(
    //         UnitFetchData({
    //             ProjectID: recID,
    //             CompanyID,
    //             SubjectID: selectedSubjectID || 0,
    //         }),
    //     );
    //     if (response?.payload.Status === "Y") {
    //         toast.success(response?.payload?.Message || "Fetched Successfully");
    //         setunitrows(response?.payload?.details || []);
    //     } else {
    //         setunitrows([]);
    //         toast.error(response.payload.Message || "No rows available please add a Record.");
    //     }
    // };
    const processRowUpdateUnit = async (newRow, oldRow) => {
        const currentFormikValues = formikRef.current?.values ?? {};

        const isNew = isNaN(Number(newRow.RecordID));

        const payload = {
            data: {
                RecordID: isNew ? "-1" : String(newRow.RecordID),
                CompanyID,
                ProjectID: recID,
                // SubjectID: oldRow.SubjectID || newRow.SubjectID || "",
                SubjectID:
                    newRow.Subject?.RecordID ||
                    oldRow.Subject?.RecordID ||
                    "",
                Description: newRow.Description || "",
            },
        };
        try {
            const HeaderID = await FnsaveUnit(
                currentFormikValues, // {} when show=4 — TR389 branch ignores values
                false, // del = false
                payload, // detail payload
                isNew, // isNew flag
                "TR402",
            );

            // if (saved) {

            //     const response = await dispatch(
            //         UnitFetchData({
            //             ProjectID: recID,
            //             CompanyID,
            //             SubjectID: selectedSubjectID,
            //         })
            //     );

            //     if (response?.payload?.Status === "Y") {
            //         setunitrows(response.payload.details);
            //     }

            //     return {
            //         ...newRow,
            //         id: newRow.RecordID,
            //     };
            // }

            const updatedRow = {
                ...newRow,
                id: HeaderID.RecordID,
                RecordID: HeaderID.RecordID,
                isNew: false,
            };


            setunitrows((prevRows) =>
                prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
            );
            setScreen("5");
            dispatch(
                UnitFetchData({
                    ProjectID: recID,
                    CompanyID,
                }),
            );
            dispatch(getFetchData({ accessID, get: "get", recID }));
            return updatedRow;


        } catch (err) {
            console.error("Row save failed:", err);
            throw err;
        }
    };

    const handleEditClickUnit = (RecordID) => () => {
        setRowModesModelunit({
            ...rowModesModelunit,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClickUnit = (RecordID) => () => {
        setRowModesModelunit({
            ...rowModesModelunit,
            [RecordID]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickUnit = (id) => async () => {
        try {
            const targetRow = unitrows.find((row) => row.RecordID === id);
            const RecordID = targetRow?.RecordID;
            const SubjectID = targetRow?.RecordID;

            setunitrows((prevRows) => prevRows.filter((row) => row.RecordID !== id));

            if (!RecordID || isNaN(Number(RecordID))) {
                toast.success("Deleted Successfully");
                return;
            }

            const response = await dispatch(
                postData({
                    accessID: "TR402",
                    action: "harddelete",
                    idata: { RecordID: Number(RecordID) },
                }),
            );

            if (response?.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                setScreen("5");
                dispatch(
                    UnitFetchData({
                        ProjectID: recID,
                        CompanyID,
                    }),
                );
                dispatch(getFetchData({ accessID, get: "get", recID }));
            } else {
                toast.error(response?.payload?.Msg || "Delete failed");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Error occurred while deleting.");
        }
    };

    const handleCancelClickUnit = (RecordID) => () => {
        setRowModesModelunit({
            ...rowModesModelunit,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = unitrows.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setunitrows(unitrows.filter((row) => row.RecordID !== RecordID));
        }
    };


    const processRowUpdateUnit2 = async (newRow, oldRow) => {
        const currentFormikValues = formikRef.current?.values ?? {};

        const isNew = isNaN(Number(newRow.RecordID));

        const payload = {
            data: {
                RecordID: isNew ? "-1" : String(newRow.RecordID),
                CompanyID,
                ProjectID: recID,
                // SubjectID: oldRow.SubjectID || newRow.SubjectID || "",
                SubjectID:
                    newRow.Subject?.RecordID ||
                    oldRow.Subject?.RecordID ||
                    "",
                Description: newRow.Description || "",
            },
        };
        try {
            const HeaderID = await FnsaveUnit(
                currentFormikValues, // {} when show=4 — TR389 branch ignores values
                false, // del = false
                payload, // detail payload
                isNew, // isNew flag
                "TR402",
            );

            // if (saved) {

            //     const response = await dispatch(
            //         UnitFetchData({
            //             ProjectID: recID,
            //             CompanyID,
            //             SubjectID: selectedSubjectID,
            //         })
            //     );

            //     if (response?.payload?.Status === "Y") {
            //         setunitrows(response.payload.details);
            //     }

            //     return {
            //         ...newRow,
            //         id: newRow.RecordID,
            //     };
            // }

            const updatedRow = {
                ...newRow,
                id: HeaderID.RecordID,
                RecordID: HeaderID.RecordID,
                isNew: false,
            };


            setunitrows2((prevRows) =>
                prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
            );
            setScreen("7");
            dispatch(
                UnitFetchData({
                    ProjectID: recID,
                    CompanyID,
                }),
            );
            dispatch(getFetchData({ accessID, get: "get", recID }));
            return updatedRow;


        } catch (err) {
            console.error("Row save failed:", err);
            throw err;
        }
    };

    const handleEditClickUnit2 = (RecordID) => () => {
        setRowModesModelunit2({
            ...rowModesModelunit2,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClickUnit2 = (RecordID) => () => {
        setRowModesModelunit2({
            ...rowModesModelunit2,
            [RecordID]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClickUnit2 = (id) => async () => {
        try {
            const targetRow = unitrows2.find((row) => row.RecordID === id);
            const RecordID = targetRow?.RecordID;
            const SubjectID = targetRow?.RecordID;

            setunitrows2((prevRows) => prevRows.filter((row) => row.RecordID !== id));

            if (!RecordID || isNaN(Number(RecordID))) {
                toast.success("Deleted Successfully");
                return;
            }

            const response = await dispatch(
                postData({
                    accessID: "TR402",
                    action: "harddelete",
                    idata: { RecordID: Number(RecordID) },
                }),
            );

            if (response?.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                setScreen("7");
                dispatch(
                    UnitFetchData({
                        ProjectID: recID,
                        CompanyID,
                    }),
                );
                dispatch(getFetchData({ accessID, get: "get", recID }));
            } else {
                toast.error(response?.payload?.Msg || "Delete failed");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Error occurred while deleting.");
        }
    };

    const handleCancelClickUnit2 = (RecordID) => () => {
        setRowModesModelunit2({
            ...rowModesModelunit2,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = unitrows2.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setunitrows2(unitrows2.filter((row) => row.RecordID !== RecordID));
        }
    };

    const [subjectid, setSubjectid] = useState(null);

    function EditdeptAutocompleteCell(props) {
        const { id, value, field, api, row } = props;
        const [deptlookup, setDeptlookup] = useState(
            row.Department ? row.Department : null,
        );

        const handleChange = async (newValue) => {
            if (!newValue) return;
            setDeptlookup(newValue);
            setSubjectid(newValue.RecordID);
            await api.setEditCellValue({ id, field: "Department", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="Department"
                label="Department"
                id="Department"
                value={deptlookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2187","ScreenName":"Department","Filter":"Suborskill='S' AND CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    function EditSubjectAutocomplete(props) {
        const { id, field, api, row } = props;

        const [subjectLookup, setSubjectLookup] = useState(
            row.Subject || null
        );

        const handleChange = async (newValue) => {
            if (!newValue) return;

            setSubjectLookup(newValue);

            await api.setEditCellValue({
                id,
                field,
                value: newValue,
            });

            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="Subject"
                // label="Subject"
                id="Subject"
                value={subjectLookup}
                onChange={handleChange}
                url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                        AccessID: "2187",
                        ScreenName: "Subject",
                        VerticalLicense: "003",
                        Filter: `Suborskill='${DeptLookupCheck}' AND CompanyID='${CompanyID}'`,
                        Any: "",
                    },
                })}`}
            />
        );
    }
    function EditTeacherAutocomplete(props) {
        const { id, value, field, api, row } = props;
        const [Teachlookup, setTeachlookup] = useState(
            row.Teacher ? row.Teacher : null,
        );

        const handleChange = async (newValue) => {
            if (!newValue) return;
            setTeachlookup(newValue);
            await api.setEditCellValue({ id, field: "Teacher", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="Teacher"
                label="Teacher"
                id="Teacher"
                value={Teachlookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2193","ScreenName":"Teacher","Filter":"CompanyID='${CompanyID}' AND DepartmentID=${subjectid}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }
    function EditAssignedAutocomplete(props) {
        const { id, value, field, api, row } = props;
        const [Assignedlookup, setAssignedookup] = useState(
            row.assignedTo ? row.assignedTo : null,
        );

        const departmentId =
            row?.department?.RecordID || 0;
        const handleChange = async (newValue) => {
            if (!newValue) return;
            setAssignedookup(newValue);
            await api.setEditCellValue({ id, field: "assignedTo", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="assignedTo"
                label="assignedTo"
                id="assignedTo"
                value={Assignedlookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2193","ScreenName":"assignedTo","Filter":"CompanyID='${CompanyID}' AND DepartmentID=${departmentId}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    const Teachcolumns = [
        {
            field: "Slno",
            headerName: "SL#",
            align: "right",
            headerAlign: "center",
            width: 60,
            sortable: false,
            filterable: false,
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
            headerName: "RecordID",
            field: "RecordID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },
        {
            headerName: "ProjectTeamRecordID",
            field: "ProjectTeamsID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },
        {
            field: "Department",
            headerName: (
                <span>
                    Subject/Activity <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 230,
            hide: false,
            editable: true,
            sortable: false,
            renderCell: (params) => params.value?.Name || "",
            renderEditCell: (params) => <EditdeptAutocompleteCell {...params} />,
        },
        {
            field: "Teacher",
            headerName: (
                <span>
                    Assigned To <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 620,
            hide: false,
            editable: true,
            sortable: false,
            renderCell: (params) => (
                <div
                    style={{
                        height: "100%",
                        maxHeight: "38px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        width: "100%",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        lineHeight: "18px",
                        paddingTop: "5px",
                    }}
                >
                    {params.value?.Name || ""}
                </div>
            ),
            renderEditCell: (params) => <EditTeacherAutocomplete {...params} />,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 165,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModelteach[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            material={{ sx: { color: "primary.main" } }}
                            // ✅ handleSaveClickTeach switches row to View mode,
                            //    which triggers processRowUpdateTeach automatically.
                            onClick={handleSaveClickTeach(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClickTeach(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClickTeach(id)}
                        color="primary"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClickTeach(id)}
                        color="error"
                    />,
                ];
            },
        },
    ];

    function EditdeptAutocompleteCellStaff(props) {
        const { id, value, field, api, row } = props;
        const [deptlookup, setDeptlookup] = useState(
            row.department ? row.department : null,
        );

        const handleChange = async (newValue) => {
            if (!newValue) return;
            setDeptlookup(newValue);
            setSubjectid(newValue.RecordID);
            await api.setEditCellValue({ id, field: "department", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="department"
                label="department"
                id="department"
                value={deptlookup}
                onChange={handleChange}
                // url={`${listViewurl}?data={"Query":{"AccessID":"2187","ScreenName":"Department","Filter":"Suborskill='A' AND CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
                url={`${listViewurl}?data={"Query":{"AccessID":"2200","ScreenName":"Department","Filter":"ProjectID=${recID} AND CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    //Area
    function EditareaAutocomplete(props) {
        const { id, field, api, row } = props;

        // const [arealookup, setArealookup] = useState(row.area ? row.area : []);
        const [arealookup, setArealookup] = useState(
            Array.isArray(row.area) ? row.area : [],
        );

        // const handleChange = async (newValue) => {
        //   if (!newValue) return;

        //   setArealookup(newValue || []);

        //   await api.setEditCellValue({
        //     id,
        //     field: "area",
        //     value: newValue,
        //   });

        // //   api.stopCellEditMode({ id, field });
        // };
        const handleChange = async (event, newValue) => {
            if (!Array.isArray(newValue)) {
                newValue = [];
            }

            setArealookup(newValue);

            await api.setEditCellValue({
                id,
                field: "area",
                value: newValue,
            });

            // ❗ Optional (see Fix 3)
            // api.stopCellEditMode({ id, field });
        };

        return (
            <MultiFormikOptimizedAutocompletestaff
                name="area"
                label="area"
                id="area"
                value={arealookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2199","ScreenName":"Area","Filter":"CompanyID='${CompanyID}' AND ProjectID='${recID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    //Day
    function EditareaAutocompleteday(props) {
        const { id, field, api, row } = props;

        const [daylookup, setDaylookup] = useState(
            Array.isArray(row.day) ? row.day : [],
        );

        // const handleChange = async (newValue) => {
        //   if (!newValue) return;

        //   setDaylookup(newValue || []);

        //   await api.setEditCellValue({
        //     id,
        //     field: "day",
        //     value: newValue,
        //   });

        //   api.stopCellEditMode({ id, field });
        // };
        const handleChange = async (event, newValue) => {
            if (!Array.isArray(newValue)) {
                newValue = [];
            }

            setDaylookup(newValue);

            await api.setEditCellValue({
                id,
                field: "day",
                value: newValue,
            });

            // ❗ Optional (see Fix 3)
            // api.stopCellEditMode({ id, field });
        };

        return (
            <MultiFormikOptimizedAutocompletestaff
                name="day"
                label="day"
                id="day"
                value={daylookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2147","ScreenName":"Day","Filter":"","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    //slot
    function EditareaAutocompleteSlot(props) {
        const { id, field, api, row } = props;
        const [slotlookup, setSlotlookup] = useState(
            Array.isArray(row.slot) ? row.slot : [],
        );

        // const handleChange = async (newValue) => {
        //   if (!newValue) return;

        //   setSlotlookup(newValue || []);

        //   await api.setEditCellValue({
        //     id,
        //     field: "slot",
        //     value: newValue,
        //   });

        //   api.stopCellEditMode({ id, field });
        // };
        const handleChange = async (event, newValue) => {
            if (!Array.isArray(newValue)) {
                newValue = [];
            }

            setSlotlookup(newValue);

            await api.setEditCellValue({
                id,
                field: "slot",
                value: newValue,
            });

            // ❗ Optional (see Fix 3)
            // api.stopCellEditMode({ id, field });
        };

        return (
            <MultiFormikOptimizedAutocompletestaff
                name="slot"
                label="slot"
                id="slot"
                value={slotlookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2201","ScreenName":"Slot","Filter":"SlotGroupID=${data?.SlotGroupID || 0}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }

    //Terms
    function EditdeptAutocompleteCellTerm(props) {
        const { id, value, field, api, row } = props;
        const [termlookup, setTermlookup] = useState(
            row.term ? row.term : null,
        );

        const handleChange = async (newValue) => {
            if (!newValue) return;
            setTermlookup(newValue);
            await api.setEditCellValue({ id, field: "term", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <SprintEmpAutocomplete1
                name="term"
                label="term"
                id="term"
                value={termlookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2169","ScreenName":"Department","Filter":"AcademicYearID='${YearID}' AND CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
            />
        );
    }
    const Teachcolumns_v1 = [
        {
            field: "SlNo",
            headerName: "SL#",
            align: "right",
            headerAlign: "center",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            // valueGetter: (params) => {
            //     const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
            //     const totalVisibleRows = params.api.getAllRowIds().length;
            //     const totalAllRows = params.api.getRowsCount();
            //     if (totalVisibleRows < totalAllRows) {
            //         return index + 1;
            //     } else {
            //         return page * pageSize + index + 1;
            //     }
            // },
            renderCell: (params) => {
                const index = TimeTablerows.findIndex(
                    (row) => row.id === params.row.id
                );

                return page * pageSize + index + 1;
            },
        },
        // {
        //     headerName: "RecordID",
        //     field: "RecordID",
        //     width: 100,
        //     align: "left",
        //     headerAlign: "center",
        //     hide: true,
        // },
        // {
        //     headerName: "ProjectTeamRecordID",
        //     field: "ProjectTeamsID",
        //     width: 100,
        //     align: "left",
        //     headerAlign: "center",
        //     hide: true,
        // },
        {
            field: "term",
            headerName: (
                <span>
                    Term <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 230,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter: (params) => params.row.term?.Name || "",
            renderCell: (params) => params.value?.Name || "",
            renderEditCell: (params) => <EditdeptAutocompleteCellTerm {...params} />,
        },
        {
            field: "department",
            headerName: (
                <span>
                    Task <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 230,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter: (params) => params.value?.Name || "",
            renderCell: (params) => params.value?.Name || "",
            renderEditCell: (params) => <EditdeptAutocompleteCellStaff {...params} />,
        },
        {
            field: "area",
            headerName: (
                <span>
                    Area <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 400,
            // flex: 1,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter:(params) =>
            //     Array.isArray(params.value)
            //         ? params.value.map((v) => v.Name).join(", ")
            //         : "",
            renderCell: (params) =>
                Array.isArray(params.value)
                    ? params.value.map((v) => v.Name).join(", ")
                    : "",
            // renderCell: (params) => params.value || "",
            renderEditCell: (params) => <EditareaAutocomplete {...params} />,
        },
        {
            field: "day",
            headerName: (
                <span>
                    Day <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 230,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter: (params) =>
            //     Array.isArray(params.value)
            //         ? params.value.map(x => x.Name).join(", ")
            //         : "",
            renderCell: (params) =>
                Array.isArray(params.value)
                    ? params.value.map(x => x.Name).join(", ")
                    : "",
            // renderCell: (params) => params.value || "",
            renderEditCell: (params) => <EditareaAutocompleteday {...params} />,
        },
        {
            field: "slot",
            headerName: (
                <span>
                    Slot <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 300,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter:  (params) =>
            //     Array.isArray(params.value)
            //         ? params.value.map(x => x.Name).join(", ")
            //         : "",
            renderCell: (params) =>
                Array.isArray(params.value)
                    ? params.value.map(x => x.Name).join(", ")
                    : "",
            // renderCell: (params) => params.value || "",
            renderEditCell: (params) => <EditareaAutocompleteSlot {...params} />,
        },
        {
            field: "assignedTo",
            headerName: (
                <span>
                    Assigned To <span style={{ color: "red" }}>*</span>
                </span>
            ),
            headerAlign: "center",
            width: 620,
            hide: false,
            editable: true,
            sortable: false,
            // valueGetter: (params) => params.value?.Name || "",
            renderCell: (params) => (
                <div
                    style={{
                        height: "100%",
                        maxHeight: "38px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        width: "100%",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        lineHeight: "18px",
                        paddingTop: "5px",
                    }}
                >
                    {params.value?.Name || ""}
                </div>
            ),
            renderEditCell: (params) => <EditAssignedAutocomplete {...params} />,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 165,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModelTimeTable[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            material={{ sx: { color: "primary.main" } }}
                            onClick={handleSaveClickTimeTable(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClickTimeTable(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClickTimeTable(id)}
                        color="primary"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClickTimeTable(id)}
                        color="error"
                    />,
                ];
            },
        },
    ];
    const unitColumns = [
        {
            field: "Slno",
            headerName: "SL#",
            align: "right",
            headerAlign: "center",
            width: 60,
            sortable: false,
            filterable: false,
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
            field: "Subject",
            headerName: "Subject",
            headerAlign: "center",
            flex: 1,
            editable: true,
            renderCell: (params) =>
                params.value
                    ? `${params.value.Name}`
                    : "",
            renderEditCell: (params) => (
                <EditSubjectAutocomplete {...params} />
            ),
        },
        {
            field: "Description",
            headerName: "Units/Area",
            headerAlign: "center",
            flex: 2,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerAlign: "center",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModelunit[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClickUnit(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClickUnit(id)}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClickUnit(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        color="error"
                        label="Delete"
                        onClick={handleDeleteClickUnit(id)}
                    />,
                ];
            },
        },
    ];
    const unitColumns2 = [
        {
            field: "Slno",
            headerName: "SL#",
            align: "right",
            headerAlign: "center",
            width: 60,
            sortable: false,
            filterable: false,
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
            field: "Subject",
            headerName: "Subject",
            headerAlign: "center",
            flex: 1,
            editable: true,
            renderCell: (params) =>
                params.value
                    ? `${params.value.Name}`
                    : "",
            renderEditCell: (params) => (
                <EditSubjectAutocomplete {...params} />
            ),
        },
        {
            field: "Description",
            headerName: "Units/Area",
            headerAlign: "center",
            flex: 2,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerAlign: "center",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModelunit2[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClickUnit2(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClickUnit2(id)}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClickUnit2(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        color="error"
                        label="Delete"
                        onClick={handleDeleteClickUnit2(id)}
                    />,
                ];
            },
        },
    ];

    const handleRowModesModelChangeTeach = (newRowModesModel) => {
        setRowModesModelteach(newRowModesModel);
    };
    const handleRowModesModelChangeUnit = (newRowModesModel) => {
        setRowModesModelunit(newRowModesModel);
    };
    const handleRowModesModelChangeUnit2 = (newRowModesModel) => {
        setRowModesModelunit2(newRowModesModel);
    };
    const handleRowModesModelChangeTimeTable = (newRowModesModel) => {
        setRowModesModelTimeTable(newRowModesModel);
    };

    const isHeaderDisabled = teachrows.length > 0;

    useEffect(() => {
        if (!explorelistViewData) return;

        const formattedRows = explorelistViewData.map((row) => ({
            ...row,
            OwnedBy: row.OwnedByRecordID
                ? {
                    RecordID: row.OwnedByRecordID,
                    Code: row.OwnedByCode,
                    Name: row.OwnedByName,
                }
                : null,
        }));

        setRows(formattedRows);
        setDeletedRows([]);
        setEditedRows([]);
    }, [explorelistViewData]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);

                let schemaFields = {
                    name: Yup.string().trim().required(data.Project.name),
                    incharge: Yup.object().required(data.Project.incharge).nullable(),
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().required(data.Project.code);
                }

                if (Subscriptionlastthree === "003") {
                    schemaFields.name = Yup.string()
                        .trim()
                        .required(data.Project.StandardActivities);
                    schemaFields.incharge = Yup.object()
                        .required(data.Project.ClassTeacher)
                        .nullable();
                }
                if (Subscriptionlastthree !== "003") {
                    schemaFields.TentativeStartDate = Yup.string().required(
                        data.Project.TentativeStartDate,
                    );
                    schemaFields.TentativeEndDate = Yup.string().required(
                        data.Project.TentativeEndDate,
                    );
                }

                const schema = Yup.object().shape(schemaFields);

                let schemaFields2 = {
                    Name: Yup.string().trim().required(data.ProjectUnit.Name),
                    OwnedBy: Yup.object().required(data.ProjectUnit.OwnedBy).nullable(),
                };
                if (CompanyAutoCode === "N") {
                    schemaFields2.Code = Yup.string().required(data.ProjectUnit.Code);
                }
                const schema2 = Yup.object().shape(schemaFields2);

                setValidationSchema(schema);
                setValidationSchema2(schema2);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode]);

    useEffect(() => {
        if (mode !== "A" && data?.Details) {
            const formattedRows = data.Details.map((item) => ({
                id: Number(item.ProjectTeamsID),
                RecordID: Number(item.ProjectTeamsID),
                Department: { RecordID: item.DepartmentID, Name: item.DeptName },
                Teacher: { RecordID: item.EmployeeID, Name: item.EmpName },
            }));

            setTeachrows(formattedRows);
            setPage(0);
        }
    }, [data]);

    // useEffect(() => {
    //     if (mode !== "A" && staffmappingGetData?.Terms) {
    //         const formattedRows = staffmappingGetData.Terms.map((item) => ({
    //             id: Number(item.id),
    //             id: Number(item.id),
    //             department: { RecordID: item.DepartmentID, Name: item.DeptName },
    //             // Teacher: { RecordID: item.EmployeeID, Name: item.EmpName },
    //         }));

    //         setTeachrows(formattedRows);
    //         setRowModesModelStaff({});
    //         setPage(0);
    //     }
    // }, [data]);

    useEffect(() => {
        if (show == "0") {
            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
        // if (show == "0") {
        //     if (recID && mode === "E") {
        //         Subscriptionlastthree === "003"
        //             ? dispatch(getFetchData_v1({ accessID: "TR389", get: "get", recID, CompanyID }))
        //             : dispatch(getFetchData({ accessID, get: "get", recID }));
        //     } else {
        //         Subscriptionlastthree === "003"
        //             ? dispatch(getFetchData_v1({ accessID: "TR389", get: "get", recID, CompanyID }))
        //             : dispatch(getFetchData({ accessID, get: "", recID }));
        //     }
        // }
    }, [show]);

    useEffect(() => {
        if (Subscriptionlastthree && accessID) {
            dispatch(
                CustomisedCaptionGet({
                    Vertical: Subscriptionlastthree,
                    AccessID: accessID,
                }),
            );
        }
    }, [Subscriptionlastthree, accessID, dispatch]);

    // ─── Units DataGrid state ─────────────────────────────────────────────────────
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (RecordID) => () => {
        setRowModesModel({
            ...rowModesModel,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (RecordID) => () => {
        setRowModesModel({
            ...rowModesModel,
            [RecordID]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (RecordID) => async () => {
        setRows((prevRows) => prevRows.filter((row) => row.RecordID !== RecordID));

        if (!RecordID || isNaN(Number(RecordID))) return;

        const numericID = Number(RecordID);
        setDeletedRows((prev) => {
            if (prev.some((d) => d.RecordID === numericID)) return prev;
            return [...prev, { RecordID: numericID }];
        });
        setEditedRows((prev) => prev.filter((row) => row.RecordID !== numericID));
    };

    const handleCancelClick = (RecordID) => () => {
        setRowModesModel({
            ...rowModesModel,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row) => row.RecordID === RecordID);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.RecordID !== RecordID));
        }
    };

    const UnitRowSlot = (row) => {
        if (!row.Name) return "Name is required";
        if (!row.OwnedBy || !row.OwnedBy.Name) return "Owned By is required";
        return null;
    };

    const processRowUpdate = (newRow, oldRow) => {
        const error = UnitRowSlot(newRow);
        if (error) throw new Error(error);

        const isNew = oldRow?.RecordID && isNaN(Number(oldRow.RecordID));
        const updatedRow = { ...newRow, isNew };

        setRows((prev) => {
            const index = prev.findIndex((row) => row.RecordID === newRow.RecordID);
            const updated = [...prev];
            updated[index] = updatedRow;
            return updated;
        });

        if (!isNew) {
            setEditedRows((prev) => {
                const exists = prev.find((r) => r.RecordID === newRow.RecordID);
                if (exists) {
                    return prev.map((r) =>
                        r.RecordID === newRow.RecordID ? updatedRow : r,
                    );
                }
                return [...prev, updatedRow];
            });
        }

        setDeletedRows((prev) =>
            prev.filter((d) => d.RecordID !== Number(newRow.RecordID)),
        );
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const screenChange = (event) => {
        setScreen(event.target.value);
        if (event.target.value == "0") {
            if (recID && mode === "E") {
                dispatch(getFetchData({ accessID, get: "get", recID }));
            } else {
                dispatch(getFetchData({ accessID, get: "", recID }));
            }
            dispatch(
                CustomisedCaptionGet({
                    Vertical: Subscriptionlastthree,
                    AccessID: accessID,
                }),
            );
        }
        if (event.target.value == "1") {
            dispatch(
                fetchExplorelitview(
                    "TR363",
                    Subscriptionlastthree,
                    "Project Unit",
                    `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
                    "",
                ),
            );
            selectCellRowData({ rowData: {}, mode: "A", field: "" });
            dispatch(
                CustomisedCaptionGet({
                    Vertical: Subscriptionlastthree,
                    AccessID: accessID,
                }),
            );
        }
        if (event.target.value == "3") {
            dispatch(
                fetchExplorelitview(
                    "TR363",
                    Subscriptionlastthree,
                    "Project Unit",
                    `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
                    "",
                ),
            );
            dispatch(
                CustomisedCaptionGet({
                    Vertical: Subscriptionlastthree,
                    AccessID: accessID,
                }),
            );
        }
        if (event.target.value == "2") {
            dispatch(
                fetchExplorelitview(
                    "TR364",
                    Subscriptionlastthree,
                    "Project Documents",
                    `CompanyID='${CompanyID}' AND (FIND_IN_SET('${recID}', DOC_PRECID))`,
                    "",
                ),
            );
            dispatch(
                CustomisedCaptionGet({
                    Vertical: Subscriptionlastthree,
                    AccessID: accessID,
                }),
            );
        }
        if (event.target.value == "4") {
            setRowModesModelteach({});
            dispatch(
                getFetchData_v1({ accessID: "TR389", get: "get", recID, CompanyID }),
            );
        }
        if (event.target.value == "6") {
            dispatch(
                getFetchData({ accessID: "TR275", get: "get", recID }),
            );
            dispatch(
                staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
            )
            setRowModesModelTimeTable({});
        }

        if (event.target.value == "5") {
            // dispatch(UnitFetchData({ ProjectID: recID, CompanyID }));
            dispatch(getFetchData({ accessID, get: "get", recID }));
            // setSelectedSubjectID(0);
            setunitrows([]);
            setRowModesModelunit({});
            setRowModesModelteach({});
        }
        if (event.target.value == "7") {
            // dispatch(UnitFetchData({ ProjectID: recID, CompanyID }));
            dispatch(getFetchData({ accessID, get: "get", recID }));
            // setSelectedSubjectID(0);
            setunitrows2([]);
            setRowModesModelunit2({});
            setRowModesModelteach({});
        }
    };

    const [UnitData, SetUnitData] = useState({
        recordID: "",
        description: "",
        OwnedBy: null,
        Comments: "",
        sortOrder: 0,
        disable: false,
        Code: "",
        Name: "",
    });

    const is003 = SubscriptionCode?.endsWith("003");
    const formikRef = useRef();

    const InitialValue = {
        code: data.Code,
        name: data.Name,
        sortorder: data.SortOrder,
        disable: data.Disable === "Y" ? true : false,
        incharge:
            data.ProjectIncharge && data.ProjectIncharge !== "0"
                ? { RecordID: data.ProjectIncharge, Name: data.ProjectInchargeName }
                : null,
        ServiceMaintenance: data.ServiceMaintenanceProject === "Y" ? true : false,
        ByProduct: is003 ? false : data.ByProduct === "Y",
        Onsiteactivities: is003 ? false : data.EnableOnsiteactivities === "Y",
        Routine: data.RoutineTasks === "Y" ? true : false,
        CurrentStatus: data.CurrentStatus,
        delete: data.DeleteFlag === "Y" ? true : false,
        budget: data.Budget === "" ? "0.00" : data.Budget,
        scheduled: data.ScheduledCost === "" ? "0.00" : data.ScheduledCost,
        actual: data.ActualCost === "" ? "0.00" : data.ActualCost,
        price: data.Price === "" ? "0.00" : data.Price,
        OtherExpenses: data.OtherExpenses === "" ? "0.00" : data.OtherExpenses,
        projectOwner:
            data.ProjectOwnerID && data.ProjectOwnerID !== "0"
                ? {
                    RecordID: data.ProjectOwnerID,
                    Code: data.ProjectOwnerCode,
                    Name: data.ProjectOwnerName,
                }
                : null,
        longitude: data.Longitude || 0,
        latitude: data.Latitude || 0,
        radius: data.Radius || 0,
        TentativeEndDate: data.TentativeEndDate || "",
        TentativeStartDate: data.TentativeStartDate || "",
        Subject: selectedSubjectID ? {
            RecordID: selectedSubject.RecordID,
            Name: selectedSubject.Name || "",
            Code: selectedSubject.Code || "",
        } : null,
        slotGroup: data.SlotGroupID && data.SlotGroupID !== "0" ? {
            RecordID: data.SlotGroupID,
            Name: data.SlotGroupName,
            Code: data.SlotGroupCode,
        } : null,
    };

    // ─── Fnsave (non-003 header save) ────────────────────────────────────────────
    const Fnsave = async (values, del) => {
        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "softdelete"
                    : "update";

        var isCheck = "N";
        if (values.disable == true) isCheck = "Y";

        const idata = {
            RecordID: recID,
            Code: values.code,
            Name: values.name,
            ProjectIncharge: values.incharge.RecordID || 0,
            ProjectInchargeName: values.incharge.Name || "",
            ServiceMaintenanceProject: values.ServiceMaintenance === true ? "Y" : "N",
            RoutineTasks: values.Routine === true ? "Y" : "N",
            SortOrder: values.sortorder || 0,
            CurrentStatus: mode == "A" ? "CU" : values.CurrentStatus,
            Disable: isCheck,
            DeleteFlag: values.delete == true ? "Y" : "N",
            ByProduct: is003 ? "N" : values.ByProduct ? "Y" : "N",
            EnableOnsiteactivities: is003 ? "N" : values.Onsiteactivities ? "Y" : "N",
            ActualCost: values.actual || 0,
            Price: values.price || 0,
            Budget: values.budget || 0,
            ScheduledCost: values.scheduled || 0,
            Finyear,
            CompanyID,
            ProjectOwnerID: values.projectOwner?.RecordID || 0,
            Longitude: values.longitude || 0,
            Latitude: values.latitude || 0,
            Radius: values.radius || 0,
            AcademicYearID: params.filtertype || 0,
            TentativeStartDate: values.TentativeStartDate || "",
            TentativeEndDate: values.TentativeEndDate || "",
            SlotGroupID: values.slotGroup ? values.slotGroup.RecordID : 0 || 0,

        };

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response.payload.Msg);
        }
    };

    const VISIBLE_FIELDS =
        show == "1"
            ? ["slno", "Code", "Name", "OwnedBy", "Comments", "action"]
            : show == "2"
                ? ["slno", "Code", "Documents", "action"]
                : [];

    function EditOwnedByAutocomplete(props) {
        const { id, value, field, api, row } = props;
        const [ownedBylookup, setOwnedBylookup] = useState(value || null);

        const handleChange = async (newValue) => {
            if (!newValue) return;
            setOwnedBylookup(newValue);
            await api.setEditCellValue({ id, field: "OwnedBy", value: newValue });
            api.stopCellEditMode({ id, field });
        };

        return (
            <ProjectVendor
                name="OwnedBy"
                label="Owned By"
                id="OwnedBy"
                value={ownedBylookup}
                onChange={handleChange}
                url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Project Unit","Filter":"parentID='${CompanyID}'","Any":""}}`}
            />
        );
    }

    const TTColumns = [
        { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
        {
            field: "SLNO",
            headerName: "SL#",
            width: 50,
            hide: false,
            headerAlign: "center",
            align: "right",
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        {
            headerName: "Code",
            field: "Code",
            width: 150,
            hide: false,
            editable: true,
            headerAlign: "center",
            renderCell: (params) => {
                if (YearFlag == "true" && (!params.value || params.row.isNew))
                    return "Auto Code";
                return params.value;
            },
        },
        {
            headerName: (
                <span>
                    Name <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "Name",
            width: 150,
            hide: false,
            editable: true,
            headerAlign: "center",
        },
        {
            field: "OwnedBy",
            headerName: (
                <span>
                    Owned By <span style={{ color: "red" }}>*</span>
                </span>
            ),
            width: 200,
            hide: false,
            editable: true,
            headerAlign: "center",
            sortable: false,
            renderCell: (params) =>
                params.value
                    ? `${params.value.Code || ""} || ${params.value.Name || ""}`
                    : null,
            renderEditCell: (params) => <EditOwnedByAutocomplete {...params} />,
        },
        {
            headerName: "Comments",
            field: "Comments",
            width: "320",
            hide: false,
            editable: true,
            headerAlign: "center",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            material={{ sx: { color: "primary.main" } }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const columns = React.useMemo(() => {
        let visibleColumns = explorelistViewcolumn.filter((column) =>
            VISIBLE_FIELDS.includes(column.field),
        );
        if (VISIBLE_FIELDS.includes("slno")) {
            const slnoColumn = {
                field: "slno",
                headerName: "SL#",
                width: 50,
                sortable: false,
                filterable: false,
                valueGetter: (params) =>
                    page * pageSize +
                    params.api.getRowIndexRelativeToVisibleRows(params.id) +
                    1,
            };
            visibleColumns = [slnoColumn, ...visibleColumns];
        }
        return visibleColumns;
    }, [explorelistViewcolumn, VISIBLE_FIELDS]);

    const selectCellRowData = ({ rowData, mode, field, setFieldValue }) => {
        setFunMode(mode);
        setLaoMode(mode);
        if (mode == "A") {
            SetUnitData({
                recordID: "",
                description: "",
                OwnedBy: null,
                Comments: "",
                Code: "",
                Name: "",
                sortOrder: 0,
                disable: false,
            });
        } else {
            if (field == "action") {
                SetUnitData({
                    recordID: rowData.RecordID,
                    description: rowData.description,
                    OwnedBy: rowData.OwnedByRecordID
                        ? {
                            RecordID: rowData.OwnedByRecordID,
                            Code: rowData.OwnedByCode,
                            Name: rowData.OwnedByName,
                        }
                        : null,
                    sortOrder: rowData.SortOrder,
                    Comments: rowData.Comments,
                    disable: rowData.Disable,
                    Code: rowData.Code,
                    Name: rowData.Name,
                });
            }
        }
    };

    function Employee() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography>
                        {show == "1" ? "List of Units" : ""}
                        {show == "2" ? "List of Documents" : ""}
                        {show == "3" ? "List of Units" : ""}
                    </Typography>
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
                    {show != "2" && (
                        <Tooltip title="ADD">
                            <IconButton type="reset">
                                <AddOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </GridToolbarContainer>
        );
    }

    const UnitInitialValues = {
        code: data.Code,
        description: data.Name,
        Code: UnitData.Code || "",
        Name: UnitData.Name || "",
        Comments: UnitData.Comments || "",
        OwnedBy: UnitData.OwnedBy || null,
        sortOrder: UnitData.sortOrder || 0,
        disable: UnitData.disable === "Y" ? true : false,
    };

    const DocInitialValues = {
        code: data.Code,
        description: data.Name,
    };

    const FnAttachment = async (values, resetForm, del) => {
        let action =
            laomode === "A" && !del
                ? "insert"
                : laomode === "E" && del
                    ? "harddelete"
                    : "update";

        const idata = {
            ProjectID: recID || 0,
            RecordID: UnitData.recordID || "-1",
            CompanyID,
            OwnedBy: values.OwnedBy ? values.OwnedBy.RecordID : 0 || null,
            Code: values.Code || "",
            Name: values.Name || "",
            SortOrder: values.sortOrder || 0,
            Comments: values.Comments || "",
            Disable: values.disable === true ? "Y" : "N",
            DeleteFlag: "N",
        };

        const response = await dispatch(
            explorePostData({ accessID: "TR363", action, idata }),
        );
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            dispatch(
                fetchExplorelitview(
                    "TR363",
                    Subscriptionlastthree,
                    "Project Unit",
                    `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
                    "",
                ),
            );
            resetForm();
            selectCellRowData({ rowData: {}, mode: "A", field: "" });
        } else {
            toast.error(response.payload.Msg);
        }
    };

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
                if (props === "Close") navigate("/");
            } else {
                return;
            }
        });
    };

    const Customisedcaptiondata = useSelector(
        (state) => state.formApi.CustomisedCaptionGetData,
    );
    const captionArray = Array.isArray(Customisedcaptiondata)
        ? Customisedcaptiondata
        : Customisedcaptiondata?.data || [];

    const getBusinessCaption = (CaptionID, defaultCaption) => {
        const match = captionArray?.find((item) => item.CAPTIONID === CaptionID);
        return match?.CAPTION || defaultCaption;
    };

    const handleSaveButtonClick = async () => {
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            const error = UnitRowSlot(row);
            if (error) {
                toast.error(`${error}`);
                return;
            }
        }

        const insertRows = rows
            .filter((row) => row.isNew || isNaN(Number(row.RecordID)))
            .map((row) => ({
                RecordID: "",
                Code: row.Code || "",
                Name: row.Name || "",
                OwnedBy: row.OwnedBy?.RecordID || 0,
                Comments: row.Comments || "",
                SortOrder: row.SortOrder || 0,
                Disable: row.Disable || "N",
            }));

        const updateRows = editedRows
            .filter(
                (row) =>
                    !row.isNew &&
                    !isNaN(Number(row.RecordID)) &&
                    !deletedRows.some((d) => d.RecordID === Number(row.RecordID)),
            )
            .map((row) => ({
                RecordID: row.RecordID,
                Code: row.Code || "",
                Name: row.Name || "",
                OwnedBy: row.OwnedBy?.RecordID || 0,
                Comments: row.Comments || "",
                SortOrder: row.SortOrder || 0,
                Disable: row.Disable || "N",
            }));

        const payload = {
            CompanyID: CompanyID?.toString(),
            ProjectID: recID || 0,
            insert: insertRows,
            update: updateRows,
            harddelete: deletedRows,
        };

        try {
            const response = await dispatch(
                postData({ accessID: "TR363", action: "batchsave", idata: payload }),
            );
            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                dispatch(
                    fetchExplorelitview(
                        "TR363",
                        Subscriptionlastthree,
                        "Project Unit",
                        `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
                        "",
                    ),
                );
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("Error occurred during save.");
        }
    };

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;
        const handleClick = () => {
            const id = nanoid();
            setRows((oldRows) => [
                ...oldRows,
                { id, RecordID: id, OwnedBy: null, Name: "", Code: "", Comments: "" },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "Name" },
            }));
        };
        return (
            <GridToolbarContainer
                sx={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Record
                </Button>
            </GridToolbarContainer>
        );
    }

    function EditToolbarteachstaff(props) {
        const {
            setTimeTablerows,
            setRowModesModelTimeTable,
            isRowEditing,
            pageSize,
            setPage,
            showQuickFilter,
        } = props;
        const [isAdding, setIsAdding] = useState(false);

        const handleClickstaff = () => {
            setIsAdding(true);
            const id = nanoid();
            const newRow = {
                id,
                id: id,
                term: null,
                department: null,
                area: [],
                day: [],
                slot: [],
                assignedTo: null,
                isNew: true,
            };

            setTimeTablerows((oldRows) => {
                const updatedRows = [...oldRows, newRow];
                const newPage = Math.floor((updatedRows.length - 1) / pageSize);
                setPage(newPage);
                return updatedRows;
            });

            setTimeout(() => {
                setRowModesModelTimeTable((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: "term" },
                }));
                setIsAdding(false);
            }, 100);
        };

        return (
            <>
                <Box display="flex" justifyContent="space-between">
                    <Button
                        disabled={isRowEditing || isAdding}
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleClickstaff}
                        sx={{
                            color: "#1a0ce2",
                            textTransform: "none",
                            fontWeight: 400,
                            fontSize: "0.875rem",
                            "&:hover": { backgroundColor: "#E1F5EE" },
                            "&.Mui-disabled": { color: "#9FE1CB" },
                        }}
                    >
                        Add Record ({data.Project})
                    </Button>
                </Box>
            </>
        );
    }

    function EditToolbarteach(props) {
        const {
            setTeachrows,
            setRowModesModelteach,
            isRowEditing,
            pageSize,
            setPage,
        } = props;
        const [isAdding, setIsAdding] = useState(false);

        const handleClickteach = () => {
            setIsAdding(true);
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id,
                Department: null,
                Teacher: null,
                isNew: true,
            };

            setTeachrows((oldRows) => {
                const updatedRows = [...oldRows, newRow];
                const newPage = Math.floor((updatedRows.length - 1) / pageSize);
                setPage(newPage);
                return updatedRows;
            });

            setTimeout(() => {
                setRowModesModelteach((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: "Department" },
                }));
                setIsAdding(false);
            }, 100);
        };

        return (
            <Button
                disabled={isRowEditing || isAdding}
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickteach}
            >
                Add Record ({data.Project})
            </Button>
        );
    }
    function EditToolbarunit(props) {
        const {
            setunitrows,
            setRowModesModelunit,
            isRowEditing,
            pageSize,
            setPage,
        } = props;
        const [isAdding, setIsAdding] = useState(false);

        const handleClickunit = () => {

            setIsAdding(true);
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id,
                Subject: null,
                // SubjectName: selectedSubject?.Name || "",
                // SubjectName: `${selectedSubject?.Code || ""} || ${selectedSubject?.Name || ""}`,
                Description: "",
                isNew: true
            };

            setunitrows((oldRows) => {
                const updatedRows = [...oldRows, newRow];
                const newPage = Math.floor((updatedRows.length - 1) / pageSize);
                setPage(newPage);
                return updatedRows;
            });

            // setTimeout(() => {
            //     setRowModesModelunit((oldModel) => ({
            //         ...oldModel,
            //         [id]: { mode: GridRowModes.Edit, fieldToFocus: "Description" },
            //     }));
            //     setIsAdding(false);
            // }, 100);
        };

        return (
            <Button
                disabled={isRowEditing || isAdding}
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickunit}
            >
                Add Record ({data.Project})
            </Button>
        );
    }
    function EditToolbarunit2(props) {
        const {
            setunitrows2,
            setRowModesModelunit2,
            isRowEditing,
            pageSize,
            setPage,
        } = props;
        const [isAdding, setIsAdding] = useState(false);

        const handleClickunit = () => {

            setIsAdding(true);
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id,
                Subject: null,
                // SubjectName: selectedSubject?.Name || "",
                // SubjectName: `${selectedSubject?.Code || ""} || ${selectedSubject?.Name || ""}`,
                Description: "",
                isNew: true
            };

            setunitrows2((oldRows) => {
                const updatedRows = [...oldRows, newRow];
                const newPage = Math.floor((updatedRows.length - 1) / pageSize);
                setPage(newPage);
                return updatedRows;
            });

            // setTimeout(() => {
            //     setRowModesModelunit((oldModel) => ({
            //         ...oldModel,
            //         [id]: { mode: GridRowModes.Edit, fieldToFocus: "Description" },
            //     }));
            //     setIsAdding(false);
            // }, 100);
        };

        return (
            <Button
                disabled={isRowEditing || isAdding}
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickunit}
            >
                Add Record ({data.Project})
            </Button>
        );
    }

    //TIMETABLE MODAL POP UP
    const handleProcessSave = async () => {

        if (!selectedTerm?.RecordID) {
            toast.error("Please select a Term");
            return;
        }

        const data = {
            ProjectID: recID,
            CompanyID,
            TermID: selectedTerm.RecordID
        };
        const response = await dispatch(
            TaskProcess({ data })
        );
        if (response?.payload?.Status === "Y") {

            toast.success(
                response?.payload?.Msg ||
                "Processed Successfully"
            );

            setOpenProcessModal(false);

        } else {

            toast.error(
                response?.payload?.Msg ||
                "Processing Failed"
            );
        }
    };
    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        {broken && !rtl && (
                            <IconButton onClick={() => toggleSidebar()}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                        <Breadcrumbs
                            maxItems={3}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                        >
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => setScreen(0)}
                            >
                                {getBusinessCaption("ProjectTitle", "Project")}
                            </Typography>
                            {show == "1" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Units
                                </Typography>
                            )}
                            {show == "3" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Units
                                </Typography>
                            )}
                            {show == "2" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    List Of Documents
                                </Typography>
                            )}
                            {show == "4" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Staff Mapping ({data.Project})
                                </Typography>
                            )}
                            {show == "6" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Time Table({data.Project})
                                </Typography>
                            )}
                            {show == "5" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Units/Area ({data.Project})
                                </Typography>
                            )}
                            {show == "7" && (
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Units/Area ({data.Project})
                                </Typography>
                            )}
                        </Breadcrumbs>
                    </Box>

                    <Box display="flex">
                        {mode !== "A" ? (
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Explore</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={show}
                                    label="Explore"
                                    onChange={screenChange}
                                >
                                    <MenuItem value="0">
                                        {getBusinessCaption("ProjectTitle", "Project")}
                                    </MenuItem>
                                    {data.RoutineTasks === "Y" && is003Subscription ? (
                                        [
                                            <MenuItem value="5">Units/Area</MenuItem>,
                                            <MenuItem value="6">Time Table</MenuItem>
                                        ]
                                    ) :
                                        (
                                            [
                                                <MenuItem value="4">Staff Mapping</MenuItem>,
                                                // <MenuItem value="7">Units/Area</MenuItem>
                                            ]
                                        )}
                                    {/* {is003Subscription === true ? (
                                        <MenuItem value="5">Units/Area</MenuItem>
                                    ) : null}
                                    {is003Subscription === true && data.RoutineTasks === "N" ? (
                                        <MenuItem value="4">Staff Mapping</MenuItem>
                                    ) : null}
                                    {is003Subscription === true && data.RoutineTasks === "Y" ? (
                                        <MenuItem value="6">Time Table</MenuItem>
                                    ) : null} */}
                                    {is003Subscription === false ? (
                                        <MenuItem value="3">Units</MenuItem>
                                    ) : null}
                                    <MenuItem value="2">List Of Documents</MenuItem>
                                </Select>
                            </FormControl>
                        ) : null}
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

            {/* ═══════════════════════════════════════════════════════════════
                SHOW = "0"  —  Header form
                FIX: onSubmit now routes correctly:
                  • 003 subscription → FnsaveTech(values, false, null, false)
                    This saves the header only (Detail=[]) and navigates back.
                  • Other subscriptions → Fnsave(values) as before.
            ════════════════════════════════════════════════════════════════ */}
            {show == "0" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={InitialValue}
                        // onSubmit={(values) => {
                        //     setTimeout(() => {
                        //         if (Subscriptionlastthree === "003") {
                        //             // Header save for 003: uses TR275, no Detail payload → navigates back on success
                        //             FnsaveTech(values, false, null, mode === "A", "TR275");
                        //         } else {
                        //             Fnsave(values);
                        //         }
                        //     }, 100);
                        // }}
                        onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                                Fnsave(values);
                            }, 100);
                        }}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {({
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            isSubmitting,
                            values,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >
                                    {CompanyAutoCode == "Y" ? (
                                        <TextField
                                            disabled={mode == "V"}
                                            name="code"
                                            type="text"
                                            id="code"
                                            label={getBusinessCaption("ProjectCode", "Code")}
                                            placeholder="Auto"
                                            variant="standard"
                                            focused
                                            value={values.code}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.code && !!errors.code}
                                            helperText={touched.code && errors.code}
                                            InputProps={{ readOnly: true }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    ) : (
                                        <TextField
                                            disabled={mode == "V"}
                                            name="code"
                                            type="text"
                                            id="code"
                                            label={
                                                <>
                                                    Code{" "}
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
                                                </>
                                            }
                                            variant="standard"
                                            focused
                                            value={values.code}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.code && !!errors.code}
                                            helperText={touched.code && errors.code}
                                            autoFocus
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}

                                    <TextField
                                        disabled={mode == "V"}
                                        name="name"
                                        type="text"
                                        id="name"
                                        label={
                                            <>
                                                {getBusinessCaption("ProjectTitle", "Project")}
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        autoFocus={CompanyAutoCode == "Y"}
                                        InputLabelProps={{ shrink: true }}
                                    />

                                    <CheckinAutocomplete
                                        disabled={mode == "V"}
                                        name="incharge"
                                        label={
                                            <>
                                                {getBusinessCaption(
                                                    "AccountableIncharge",
                                                    "Accountable Incharge",
                                                )}
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </>
                                        }
                                        id="incharge"
                                        value={values.incharge}
                                        onChange={async (newValue) =>
                                            setFieldValue("incharge", newValue)
                                        }
                                        error={!!touched.incharge && !!errors.incharge}
                                        helperText={touched.incharge && errors.incharge}
                                        url={`${listViewurl}?data=${JSON.stringify({ Query: { AccessID: "2111", ScreenName: "Project Incharge", VerticalLicense: Subscriptionlastthree, Filter: `parentID=${CompanyID}`, Any: "" } })}`}
                                    />

                                    {is003Subscription ? (
                                        <CheckinAutocomplete
                                            disabled={mode == "V"}
                                            name="slotGroup"
                                            label={getBusinessCaption("SlotGroup", "Slot Group")}
                                            variant="outlined"
                                            id="slotGroup"
                                            value={values.slotGroup}
                                            onChange={(newValue) => {
                                                setFieldValue("slotGroup", {
                                                    RecordID: newValue.RecordID,
                                                    Code: newValue.Code,
                                                    Name: newValue.Name,
                                                });
                                            }}
                                            url={`${listViewurl}?data=${JSON.stringify({ Query: { AccessID: "2171", ScreenName: "Slot Group", VerticalLicense: Subscriptionlastthree, Filter: `CompanyID=${CompanyID}`, Any: "" } })}`}
                                        />
                                    ) : null}
                                    {is003Subscription === false ? (
                                        <CheckinAutocomplete
                                            disabled={mode == "V"}
                                            name="projectOwner"
                                            label={getBusinessCaption(
                                                "ProjectOwner",
                                                "Project Owner",
                                            )}
                                            variant="outlined"
                                            id="projectOwner"
                                            value={values.projectOwner}
                                            onChange={(newValue) => {
                                                setFieldValue("projectOwner", {
                                                    RecordID: newValue.RecordID,
                                                    Code: newValue.Code,
                                                    Name: newValue.Name,
                                                });
                                            }}
                                            url={`${listViewurl}?data=${JSON.stringify({ Query: { AccessID: "2102", ScreenName: "Customer", VerticalLicense: Subscriptionlastthree, Filter: `parentID=${CompanyID}`, Any: "" } })}`}
                                        />
                                    ) : null}

                                    {is003Subscription === false ? (
                                        <>
                                            <TextField
                                                id="TentativeStartDate"
                                                name="TentativeStartDate"
                                                type="date"
                                                label={
                                                    <>
                                                        {getBusinessCaption(
                                                            "TentativeStartDate",
                                                            "Tentative Start Date",
                                                        )}
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            {" "}
                                                            *{" "}
                                                        </span>
                                                    </>
                                                }
                                                focused
                                                variant="standard"
                                                error={
                                                    !!touched.TentativeStartDate &&
                                                    !!errors.TentativeStartDate
                                                }
                                                helperText={
                                                    touched.TentativeStartDate &&
                                                    errors.TentativeStartDate
                                                }
                                                value={values.TentativeStartDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                id="TentativeEndDate"
                                                name="TentativeEndDate"
                                                type="date"
                                                label={
                                                    <>
                                                        {getBusinessCaption(
                                                            "TentativeEndDate",
                                                            "Tentative End Date",
                                                        )}
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            {" "}
                                                            *{" "}
                                                        </span>
                                                    </>
                                                }
                                                focused
                                                variant="standard"
                                                error={
                                                    !!touched.TentativeEndDate &&
                                                    !!errors.TentativeEndDate
                                                }
                                                helperText={
                                                    touched.TentativeEndDate && errors.TentativeEndDate
                                                }
                                                value={values.TentativeEndDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </>
                                    ) : null}

                                    {Subscriptionlastthree != "003" ? (
                                        <TextField
                                            disabled={mode == "V"}
                                            labelId="demo"
                                            id="CurrentStatus"
                                            name="CurrentStatus"
                                            type="text"
                                            label="Status"
                                            focused
                                            select
                                            variant="standard"
                                            error={!!touched.CurrentStatus && !!errors.CurrentStatus}
                                            helperText={touched.CurrentStatus && errors.CurrentStatus}
                                            value={mode == "A" ? "CU" : values.CurrentStatus}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue("CurrentStatus", e.target.value);
                                                setFieldValue("disable", e.target.value !== "CU");
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <MenuItem value="CU">Current</MenuItem>
                                            <MenuItem value="CO">Completed</MenuItem>
                                            <MenuItem value="H">Hold</MenuItem>
                                        </TextField>
                                    ) : null}

                                    <TextField
                                        disabled={mode == "V"}
                                        name="sortorder"
                                        type="number"
                                        id="sortorder"
                                        label="Sort Order"
                                        variant="standard"
                                        focused
                                        value={values.sortorder}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.sortorder && !!errors.sortorder}
                                        helperText={touched.sortorder && errors.sortorder}
                                        InputProps={{
                                            inputProps: { style: { textAlign: "right" } },
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        onWheel={(e) => e.target.blur()}
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 8);
                                        }}
                                    />

                                    <Box>
                                        <Field
                                            disabled={mode == "V"}
                                            type="checkbox"
                                            name="Routine"
                                            id="Routine"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                        />
                                        {/* <FormLabel focused={false}>Routine Tasks</FormLabel> */}
                                        <FormLabel focused={false}>{is003Subscription ? "Activities" : "Routine Tasks"}</FormLabel>

                                        {!is003Subscription && (
                                            <>
                                                <Field
                                                    disabled={mode == "V"}
                                                    type="checkbox"
                                                    name="ByProduct"
                                                    id="ByProduct"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    as={Checkbox}
                                                />
                                                <FormLabel focused={false}>Product</FormLabel>
                                                <Field
                                                    disabled={mode == "V"}
                                                    type="checkbox"
                                                    name="Onsiteactivities"
                                                    id="Onsiteactivities"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    as={Checkbox}
                                                />
                                                <FormLabel focused={false}>
                                                    Enable Onsite Activities
                                                </FormLabel>
                                            </>
                                        )}

                                        <Field
                                            disabled={mode == "V"}
                                            type="checkbox"
                                            name="delete"
                                            id="delete"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Delete"
                                        />
                                        <FormLabel focused={false}>Delete</FormLabel>
                                        <Field
                                            disabled={mode == "V"}
                                            type="checkbox"
                                            name="disable"
                                            id="disable"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Disable"
                                        />
                                        <FormLabel focused={false}>Disable</FormLabel>
                                    </Box>
                                </Box>

                                {Subscriptionlastthree != "003" ? (
                                    <>
                                        <Typography variant="h5" padding={1}>
                                            Costing:
                                        </Typography>
                                        {values.ByProduct === true ? (
                                            <Box
                                                display="grid"
                                                gap={formGap}
                                                padding={1}
                                                gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                                sx={{
                                                    "& > div": {
                                                        gridColumn: isNonMobile ? undefined : "span 2",
                                                    },
                                                }}
                                            >
                                                <TextField
                                                    disabled={mode == "V"}
                                                    variant="standard"
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={values.price}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Price (If it is a product)"
                                                    sx={{
                                                        gridColumn: "span 1",
                                                        backgroundColor: "#ffffff",
                                                    }}
                                                    focused
                                                    InputProps={{
                                                        inputProps: { style: { textAlign: "right" } },
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                display="grid"
                                                gap={formGap}
                                                padding={1}
                                                gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                                sx={{
                                                    "& > div": {
                                                        gridColumn: isNonMobile ? undefined : "span 2",
                                                    },
                                                }}
                                            >
                                                <TextField
                                                    disabled={mode == "V"}
                                                    fullWidth
                                                    variant="standard"
                                                    type="number"
                                                    id="budget"
                                                    name="budget"
                                                    value={values.budget}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Budget"
                                                    sx={{
                                                        gridColumn: "span 1",
                                                        backgroundColor: "#ffffff",
                                                    }}
                                                    error={!!touched.budget && !!errors.budget}
                                                    helperText={touched.budget && errors.budget}
                                                    focused
                                                    InputProps={{
                                                        inputProps: { style: { textAlign: "right" } },
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    disabled={mode == "V"}
                                                    variant="standard"
                                                    type="number"
                                                    id="scheduled"
                                                    name="scheduled"
                                                    value={values.scheduled}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Scheduled Cost"
                                                    sx={{
                                                        gridColumn: "span 1",
                                                        backgroundColor: "#ffffff",
                                                    }}
                                                    focused
                                                    InputProps={{
                                                        readOnly: true,
                                                        inputProps: { style: { textAlign: "right" } },
                                                    }}
                                                />
                                                <TextField
                                                    disabled={mode == "V"}
                                                    fullWidth
                                                    variant="standard"
                                                    type="number"
                                                    id="actual"
                                                    name="actual"
                                                    value={values.actual}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Actual Cost"
                                                    sx={{
                                                        gridColumn: "span 1",
                                                        backgroundColor: "#ffffff",
                                                    }}
                                                    focused
                                                    InputProps={{
                                                        readOnly: true,
                                                        inputProps: { style: { textAlign: "right" } },
                                                    }}
                                                />
                                                <TextField
                                                    disabled={mode == "V"}
                                                    fullWidth
                                                    variant="standard"
                                                    type="number"
                                                    id="OtherExpenses"
                                                    name="OtherExpenses"
                                                    value={values.OtherExpenses}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Other Expenses"
                                                    sx={{
                                                        gridColumn: "span 1",
                                                        backgroundColor: "#ffffff",
                                                    }}
                                                    focused
                                                    InputProps={{
                                                        readOnly: true,
                                                        inputProps: { style: { textAlign: "right" } },
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        <Typography variant="h5" padding={1}>
                                            Location:
                                        </Typography>
                                        <Box
                                            display="grid"
                                            gap={formGap}
                                            padding={1}
                                            gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                            sx={{
                                                "& > div": {
                                                    gridColumn: isNonMobile ? undefined : "span 2",
                                                },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                label="Latitude"
                                                name="latitude"
                                                focused
                                                type="text"
                                                value={values.latitude}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    if (/^-?\d*\.?\d*$/.test(e.target.value))
                                                        handleChange(e);
                                                }}
                                                inputProps={{
                                                    inputMode: "decimal",
                                                    style: { textAlign: "right" },
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                label="Longitude"
                                                name="longitude"
                                                focused
                                                type="text"
                                                value={values.longitude}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    if (/^-?\d*\.?\d*$/.test(e.target.value))
                                                        handleChange(e);
                                                }}
                                                inputProps={{
                                                    inputMode: "decimal",
                                                    style: { textAlign: "right" },
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                focused
                                                label="Radius (m)"
                                                name="radius"
                                                type="text"
                                                value={values.radius}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    if (/^\d*\.?\d*$/.test(e.target.value))
                                                        handleChange(e);
                                                }}
                                                inputProps={{
                                                    inputMode: "decimal",
                                                    style: { textAlign: "right" },
                                                }}
                                            />
                                        </Box>
                                    </>
                                ) : null}

                                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                                    {YearFlag == "true" ? (
                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            loading={isLoading}
                                        >
                                            Save
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            disabled={true}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : null}

            {/* SHOW = "3" — Units batch-save grid */}
            {show == "3" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={UnitInitialValues}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) =>
                            handleSaveButtonClick(values, resetForm)
                        }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Code"
                                        focused
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Description"
                                        focused
                                        InputProps={{ readOnly: true }}
                                    />
                                </Box>

                                <Box
                                    padding={1}
                                    height={dataGridHeightExplore}
                                    marginTop={2}
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: colors.blueAccent[800],
                                        },
                                        "& .MuiDataGrid-virtualScroller": {
                                            backgroundColor: colors.primary[400],
                                        },
                                        "& .MuiDataGrid-footerContainer": {
                                            backgroundColor: colors.blueAccent[800],
                                        },
                                        "& .odd-row": { backgroundColor: "" },
                                        "& .even-row": { backgroundColor: "#d0edec" },
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
                                        columns={TTColumns}
                                        loading={exploreLoading}
                                        editMode="row"
                                        disableSelectionOnClick
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={handleRowModesModelChange}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}
                                        getRowId={(row) => row.RecordID}
                                        isCellEditable={(params) => {
                                            if (params.field === "SLNO") return false;
                                            if (params.field === "Code" && YearFlag == "true")
                                                return false;
                                            return true;
                                        }}
                                        disableRowSelectionOnClick
                                        experimentalFeatures={{ newEditingApi: true }}
                                        onProcessRowUpdateError={(error) => {
                                            console.error(
                                                "Row update validation failed:",
                                                error.message,
                                            );
                                            toast.error(error.message);
                                        }}
                                        components={{ Toolbar: EditToolbar }}
                                        componentsProps={{ toolbar: { setRows, setRowModesModel } }}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        getRowClassName={(params) =>
                                            params.indexRelativeToCurrentPage % 2 === 0
                                                ? "odd-row"
                                                : "even-row"
                                        }
                                        pagination
                                        pageSize={pageSize}
                                        page={page}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        onPageChange={(newPage) => setPage(newPage)}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="space-between" padding={1}>
                                    <Box>
                                        <Typography
                                            fontWeight={600}
                                            fontSize={15}
                                            lineHeight={1}
                                            mb={1}
                                            ml={0.5}
                                        >
                                            Actions Guide
                                        </Typography>
                                        <Box display="flex" flexDirection="row" gap="15px">
                                            <Chip
                                                icon={<EditIcon color="inherit" />}
                                                label="Edit"
                                                variant="outlined"
                                            />
                                            <Chip
                                                icon={<DeleteIcon color="inherit" />}
                                                label="Delete"
                                                variant="outlined"
                                            />
                                            <Chip
                                                icon={<SaveIcon color="inherit" />}
                                                label="Save"
                                                variant="outlined"
                                            />
                                            <Chip
                                                icon={<CancelIcon color="inherit" />}
                                                label="Cancel"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        padding={1}
                                        gap="20px"
                                    >
                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                        >
                                            Save
                                        </LoadingButton>
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            onClick={() => setScreen(0)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : null}

            {/* SHOW = "2" — Documents read-only grid */}
            {show == "2" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik initialValues={DocInitialValues} enableReinitialize={true}>
                        {({ values, handleBlur, handleSubmit, handleChange }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2",
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Code"
                                        focused
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Description"
                                        focused
                                        InputProps={{ readOnly: true }}
                                    />
                                </Box>

                                <Box
                                    padding={1}
                                    m="5px 0 0 0"
                                    height={dataGridHeightExplore}
                                    sx={{
                                        "& .MuiDataGrid-root": { border: "none" },
                                        "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                                        "& .odd-row": { backgroundColor: "" },
                                        "& .even-row": { backgroundColor: "#D3D3D3" },
                                    }}
                                >
                                    <DataGrid
                                        sx={{
                                            "& .MuiDataGrid-footerContainer": {
                                                height: dataGridHeaderFooterHeight,
                                                minHeight: dataGridHeaderFooterHeight,
                                            },
                                        }}
                                        rows={explorelistViewData}
                                        columns={columns}
                                        disableSelectionOnClick
                                        getRowId={(row) => row.RecordID}
                                        rowHeight={dataGridRowHeight}
                                        headerHeight={dataGridHeaderFooterHeight}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        onCellClick={(params) =>
                                            selectCellRowData({
                                                rowData: params.row,
                                                mode: "E",
                                                field: params.field,
                                            })
                                        }
                                        rowsPerPageOptions={[5, 10, 20]}
                                        pagination
                                        components={{ Toolbar: Employee }}
                                        onStateChange={(stateParams) =>
                                            setRowCount(stateParams.pagination.rowCount)
                                        }
                                        componentsProps={{ toolbar: { setRows, setRowModesModel } }}
                                        loading={exploreLoading}
                                        getRowClassName={(params) =>
                                            params.indexRelativeToCurrentPage % 2 === 0
                                                ? "odd-row"
                                                : "even-row"
                                        }
                                    />
                                </Box>
                            </form>
                        )}
                    </Formik>

                    <Box display="flex" justifyContent="space-between" padding={1}>
                        <Box>
                            <Typography
                                fontWeight={600}
                                fontSize={15}
                                lineHeight={1}
                                mb={1}
                                ml={0.5}
                            >
                                Actions Guide
                            </Typography>
                            <Box display="flex" flexDirection="row" gap="15px">
                                <Chip
                                    icon={<VisibilityIcon color="primary" />}
                                    label="Open Document"
                                    variant="outlined"
                                />
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" padding={1}>
                            <Button
                                color="warning"
                                variant="contained"
                                onClick={() => setScreen("0")}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            ) : null}

            {/* ═══════════════════════════════════════════════════════════════
                SHOW = "4"  —  Teacher-Subject mapping grid (003 subscription)
                FIX: processRowUpdate={processRowUpdateTeach} is what triggers
                     FnsaveTech on each row save. The Save icon in Teachcolumns
                     calls handleSaveClickTeach → switches row to View mode →
                     DataGrid fires processRowUpdateTeach automatically.
            ════════════════════════════════════════════════════════════════ */}
            {show == "4" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik initialValues={DocInitialValues} enableReinitialize={true}>
                        {({ values, handleBlur, handleSubmit, handleChange }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(1 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 1",
                                        },
                                    }}
                                >
                                    <Box
                                        height="60vh"
                                        m={1}
                                        sx={{
                                            "& .MuiDataGrid-root": { border: "none" },
                                            "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                                            "& .odd-row": { backgroundColor: "" },
                                            "& .even-row": { backgroundColor: "#D3D3D3" },
                                        }}
                                    >
                                        <DataGrid
                                            sx={{
                                                "& .MuiDataGrid-footerContainer": {
                                                    height: dataGridHeaderFooterHeight,
                                                    minHeight: dataGridHeaderFooterHeight,
                                                },
                                            }}
                                            rowHeight={35}
                                            headerHeight={dataGridHeaderFooterHeight}
                                            rows={teachrows}
                                            columns={Teachcolumns}
                                            loading={exploreLoading}
                                            editMode="row"
                                            disableSelectionOnClick
                                            rowModesModel={rowModesModelteach}
                                            onRowModesModelChange={handleRowModesModelChangeTeach}
                                            onRowEditStop={handleRowEditStopTeach}
                                            // ✅ FIX: This is the key wire-up.
                                            //    processRowUpdateTeach calls FnsaveTech internally.
                                            processRowUpdate={processRowUpdateTeach}
                                            getRowId={(row) => row.RecordID}
                                            disableRowSelectionOnClick
                                            experimentalFeatures={{ newEditingApi: true }}
                                            onProcessRowUpdateError={(error) => {
                                                console.error(
                                                    "Row update validation failed:",
                                                    error.message,
                                                );
                                                toast.error(error.message);
                                            }}
                                            components={{ Toolbar: EditToolbarteach }}
                                            componentsProps={{
                                                toolbar: {
                                                    setTeachrows,
                                                    setRowModesModelteach,
                                                    isRowEditing,
                                                    setPage,
                                                    pageSize,
                                                },
                                            }}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            getRowClassName={(params) =>
                                                params.indexRelativeToCurrentPage % 2 === 0
                                                    ? "odd-row"
                                                    : "even-row"
                                            }
                                            pagination
                                            pageSize={pageSize}
                                            page={page}
                                            onPageSizeChange={(newPageSize) =>
                                                setPageSize(newPageSize)
                                            }
                                            onPageChange={(newPage) => setPage(newPage)}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" padding={1}>
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            onClick={() => setScreen("0")}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : null}
            {show == "6" ? (
                <>
                    <Paper elevation={3} sx={{ margin: "10px" }}>
                        <Formik initialValues={InitialValue} enableReinitialize={true}>
                            {({ values, handleBlur, handleSubmit, handleChange }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box
                                        display="grid"
                                        gap={formGap}
                                        padding={1}
                                        gridTemplateColumns="repeat(1 , minMax(0,1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: isNonMobile ? undefined : "span 1",
                                            },
                                        }}
                                    >
                                        <Box
                                            height="60vh"
                                            m={1}
                                            sx={{
                                                "& .MuiDataGrid-root": { border: "none" },
                                                "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                                                "& .odd-row": { backgroundColor: "" },
                                                "& .even-row": { backgroundColor: "#D3D3D3" },
                                            }}
                                        >
                                            <Box display="flex" justifyContent="flex-end">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Search..."
                                                    value={searchText}
                                                    onChange={(e) => setSearchText(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{ mb: 1, maxWidth: "250px" }}
                                                />
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mb={1}
                                                >

                                                    <Tooltip title="Process Timetable">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => setOpenProcessModal(true)}
                                                        >
                                                            <SettingsSuggestIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                            <DataGrid
                                                sx={{
                                                    "& .MuiDataGrid-footerContainer": {
                                                        height: dataGridHeaderFooterHeight,
                                                        minHeight: dataGridHeaderFooterHeight,
                                                    },
                                                }}
                                                rowHeight={35}
                                                headerHeight={dataGridHeaderFooterHeight}
                                                // rows={TimeTablerows}
                                                rows={filteredRows}
                                                columns={Teachcolumns_v1}
                                                loading={staffmappingGetDataloading}
                                                editMode="row"
                                                disableSelectionOnClick
                                                rowModesModel={rowModesModelTimeTable}
                                                onRowModesModelChange={handleRowModesModelChangeTimeTable}
                                                onRowEditStop={handleRowEditStopTimeTable}
                                                processRowUpdate={processRowUpdateTeach_V1}
                                                getRowId={(row) => row.id}
                                                disableRowSelectionOnClick
                                                experimentalFeatures={{ newEditingApi: true }}
                                                onProcessRowUpdateError={(error) => {
                                                    console.error(
                                                        "Row update validation failed:",
                                                        error.message,
                                                    );
                                                    toast.error(error.message);
                                                }}
                                                components={{ Toolbar: EditToolbarteachstaff }}
                                                componentsProps={{
                                                    toolbar: {
                                                        setTimeTablerows,
                                                        setRowModesModelTimeTable,
                                                        isRowEditing,
                                                        setPage,
                                                        pageSize,
                                                        showQuickFilter: true,
                                                    },
                                                }}
                                                rowsPerPageOptions={[5, 10, 20]}
                                                getRowClassName={(params) =>
                                                    params.indexRelativeToCurrentPage % 2 === 0
                                                        ? "odd-row"
                                                        : "even-row"
                                                }
                                                pagination
                                                pageSize={pageSize}
                                                page={page}
                                                onPageSizeChange={(newPageSize) =>
                                                    setPageSize(newPageSize)
                                                }
                                                onPageChange={(newPage) => setPage(newPage)}
                                            />
                                        </Box>

                                    </Box>

                                </form>
                            )}
                        </Formik>
                        <Box display="flex" justifyContent="flex-end" padding={1} marginTop="36px">
                            <Button
                                color="warning"
                                variant="contained"
                                onClick={() => setScreen("0")}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Paper>
                    <Dialog
                        open={openProcessModal}
                        onClose={() => setOpenProcessModal(false)}
                        maxWidth="sm"
                        fullWidth
                    >
                        <DialogTitle sx={{ fontWeight: "500", fontSize: "15px" }}>
                            Process Timetable({data.Project})
                        </DialogTitle>

                        <DialogContent sx={{ mt: 1 }}>
                            <PartySingleSelect
                                id="ProcessTerm"
                                name="ProcessTerm"
                                label="Term"
                                focused
                                fullWidth
                                value={selectedTerm}
                                onChange={(newValue) =>
                                    setSelectedTerm(newValue)
                                }
                                url={`${listViewurl}?data=${JSON.stringify({
                                    Query: {
                                        // AccessID: "2024", // Term Lookup AccessID
                                        AccessID: "2204", // Term Lookup AccessID
                                        ScreenName: "Term",
                                        VerticalLicense: "003",
                                        Filter: `CompanyID='${CompanyID}' AND ProjectID='${recID}'`,
                                        Any: "",
                                    },
                                })}`}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleProcessSave}
                            >
                                Process
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setOpenProcessModal(false)}
                            >
                                Back
                            </Button>


                        </DialogActions>
                    </Dialog>
                </>
            ) : null}
            {show == "5" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik initialValues={InitialValue} enableReinitialize={true}>
                        {({
                            values,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            touched,
                            errors,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(1 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 1",
                                        },
                                    }}
                                >
                                    <Box
                                        height="60vh"
                                        m={1}
                                        sx={{
                                            "& .MuiDataGrid-root": { border: "none" },
                                            "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                                            "& .odd-row": { backgroundColor: "" },
                                            "& .even-row": { backgroundColor: "#D3D3D3" },
                                        }}
                                    >
                                        <DataGrid
                                            sx={{
                                                "& .MuiDataGrid-footerContainer": {
                                                    height: dataGridHeaderFooterHeight,
                                                    minHeight: dataGridHeaderFooterHeight,
                                                },
                                            }}
                                            rowHeight={35}
                                            headerHeight={dataGridHeaderFooterHeight}
                                            getRowId={(row) => row.RecordID}
                                            rows={unitrows || []}
                                            columns={unitColumns}
                                            loading={exploreLoading}
                                            editMode="row"
                                            disableSelectionOnClick
                                            rowModesModel={rowModesModelunit}
                                            onRowModesModelChange={handleRowModesModelChangeUnit}
                                            onRowEditStop={handleRowEditStopUnit}
                                            processRowUpdate={processRowUpdateUnit}
                                            disableRowSelectionOnClick
                                            experimentalFeatures={{ newEditingApi: true }}
                                            onProcessRowUpdateError={(error) => {
                                                console.error(
                                                    "Row update validation failed:",
                                                    error.message,
                                                );
                                                toast.error(error.message);
                                            }}
                                            components={{ Toolbar: EditToolbarunit }}
                                            componentsProps={{
                                                toolbar: {
                                                    setunitrows,
                                                    setRowModesModelunit,
                                                    isRowEditing,
                                                    setPage,
                                                    pageSize,
                                                },
                                            }}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            getRowClassName={(params) =>
                                                params.indexRelativeToCurrentPage % 2 === 0
                                                    ? "odd-row"
                                                    : "even-row"
                                            }
                                            pagination
                                            pageSize={pageSize}
                                            page={page}
                                            onPageSizeChange={(newPageSize) =>
                                                setPageSize(newPageSize)
                                            }
                                            onPageChange={(newPage) => setPage(newPage)}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" padding={1}>
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            onClick={() => setScreen("0")}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : null}
            {show == "7" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik initialValues={InitialValue} enableReinitialize={true}>
                        {({
                            values,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            touched,
                            errors,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(1 , minMax(0,1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 1",
                                        },
                                    }}
                                >
                                    <Box
                                        height="60vh"
                                        m={1}
                                        sx={{
                                            "& .MuiDataGrid-root": { border: "none" },
                                            "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                                            "& .odd-row": { backgroundColor: "" },
                                            "& .even-row": { backgroundColor: "#D3D3D3" },
                                        }}
                                    >
                                        <DataGrid
                                            sx={{
                                                "& .MuiDataGrid-footerContainer": {
                                                    height: dataGridHeaderFooterHeight,
                                                    minHeight: dataGridHeaderFooterHeight,
                                                },
                                            }}
                                            rowHeight={35}
                                            headerHeight={dataGridHeaderFooterHeight}
                                            getRowId={(row) => row.RecordID}
                                            rows={unitrows2 || []}
                                            columns={unitColumns2}
                                            loading={exploreLoading}
                                            editMode="row"
                                            disableSelectionOnClick
                                            rowModesModel={rowModesModelunit2}
                                            onRowModesModelChange={handleRowModesModelChangeUnit2}
                                            onRowEditStop={handleRowEditStopUnit2}
                                            processRowUpdate={processRowUpdateUnit2}
                                            disableRowSelectionOnClick
                                            experimentalFeatures={{ newEditingApi: true }}
                                            onProcessRowUpdateError={(error) => {
                                                console.error(
                                                    "Row update validation failed:",
                                                    error.message,
                                                );
                                                toast.error(error.message);
                                            }}
                                            // components={{ Toolbar: EditToolbarunit2 }}
                                            componentsProps={{
                                                toolbar: {
                                                    setunitrows2,
                                                    setRowModesModelunit2,
                                                    isRowEditing,
                                                    setPage,
                                                    pageSize,
                                                },
                                            }}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            getRowClassName={(params) =>
                                                params.indexRelativeToCurrentPage % 2 === 0
                                                    ? "odd-row"
                                                    : "even-row"
                                            }
                                            pagination
                                            pageSize={pageSize}
                                            page={page}
                                            onPageSizeChange={(newPageSize) =>
                                                setPageSize(newPageSize)
                                            }
                                            onPageChange={(newPage) => setPage(newPage)}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" padding={1}>
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            onClick={() => setScreen("0")}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            ) : null}
        </React.Fragment>
    );
};

export default Editproject_V1;
