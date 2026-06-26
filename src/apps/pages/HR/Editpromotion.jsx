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
  ListItemText,Dialog,DialogTitle,DialogContent,DialogActions
} from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseIcon from "@mui/icons-material/Close";
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

const Editpromotion = () => {
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
  const [selectedSubjectID, setSelectedSubjectID] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [rowModesModelunit, setRowModesModelunit] = React.useState({});
  //UNIT AREA MAPPING
  const [TimeTablerows, setTimeTablerows] = useState([]);
  const [rowModesModelTimeTable, setRowModesModelTimeTable] = React.useState(
    {},
  );

  const isRowEditing = Object.values(rowModesModelteach).some(
    (row) => row.mode === GridRowModes.Edit,
  );
  const isRowEditingUnit = Object.values(rowModesModelunit).some(
    (row) => row.mode === GridRowModes.Edit,
  );
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
      DeptID: selectedSubjectID || payload.SubjectID,

      Description: payload.data.Description || "",
      SortOrder: 1,
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
      DeptID: row.department?.RecordID || "0",
      EmpID: "",
      Day: "",
      SlotID: "",
      UnitAreaID: "",
    };

    const idata = {
        RecordID: row.RecordID || "0",
    };

    const response = await dispatch(postData({ accessID:"tr389v1", action:"harddelete", idata }));

    if (response?.payload?.Status === "Y") {
      setTimeTablerows((prev) => prev.filter((r) => r.id !== id));
      toast.success("Deleted successfully");
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
    let action = isNew ? "insert" : "update";
  // 🔹 DETAIL (row)
  const detailPayload = {
    ProjectTeamRecordID: isNew ? "-1" : newRow.RecordID,

    DeptID: newRow.department?.RecordID || "0",

    EmpID: newRow.assignedTo?.RecordID || "0",

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
      RecordID: values?.RecordID || "0",
      Code: values?.Code || "",
      Name: values?.Name || "",
      SortOrder: values?.SortOrder || "1",
      Disable: "N",
      ProjectIncharge: values?.ProjectIncharge || 0,
      ServiceMaintenanceProject: "N",
      RoutineTasks: values?.RoutineTask || "N",
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
      AcademicYearID:YearID,
      TermID: values?.TermID || 0,
      CompanyID,

      // 🔥 IMPORTANT
      Detail: [detailPayload],
  };

  try {
    const response = await dispatch(postData({ accessID:"tr389v1", action, idata }));

    if (response?.payload?.Status === "Y") {
      const updatedRow = {
        ...newRow,
        isNew: false,
      };

      setTimeTablerows((prev) =>
        prev.map((r) => (r.id === newRow.id ? updatedRow : r)),
      );

      toast.success("Saved successfully");
      return updatedRow;
    } else {
      throw new Error(response?.payload?.Msg || "Save failed");
    }
  } catch (err) {
    console.error("Row save failed:", err);
    toast.error("Save failed");
    throw err;
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

  const handleDeleteClickTeach_V1 = (id) => async () => {
    try {
      const targetRow = staffrows.find((row) => row.id === id);
      const RecordID = staffrows?.RecordID;

      setStaffrows((prevRows) => prevRows.filter((row) => row.id !== id));

      if (!RecordID || isNaN(Number(RecordID))) {
        toast.success("Deleted Successfully");
        return;
      }

      const response = await dispatch(
        postData({
          accessID: "TR389v1",
          action: "harddelete",
          idata: { ProjectTeamRecordID: Number(RecordID) },
        }),
      );

      if (response?.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(
          staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
        );
      } else {
        toast.error(response?.payload?.Msg || "Delete failed");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error occurred while deleting.");
    }
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
    const handleUnitApply = async () => {
        if(!selectedSubjectID){
            toast.error("Select select a Subject/Activity")
        }
        const payload = {
            ProjectID: recID,
            CompanyID,
            SubjectID: selectedSubjectID || 0,
        };

        const response = await dispatch(
            UnitFetchData({
                ProjectID: recID,
                CompanyID,
                SubjectID: selectedSubjectID || 0,
            }),
        );
        if (response?.payload.Status === "Y") {
            toast.success(response?.payload?.Message || "Fetched Successfully");
            setunitrows(response?.payload?.details || []);
        } else {
            setunitrows([]);
            toast.error(response.payload.Message || "No rows available please add a Record.");
        }
    };
    const processRowUpdateUnit = async (newRow, oldRow) => {
        const currentFormikValues = formikRef.current?.values ?? {};

    const isNew = isNaN(Number(newRow.RecordID));

    const payload = {
      data: {
        RecordID: isNew ? "-1" : String(newRow.RecordID),
        CompanyID,
        ProjectID: recID,
        SubjectID: oldRow.SubjectID || newRow.SubjectID || "",
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
      // setScreen("5");
      dispatch(
        UnitFetchData({
          ProjectID: recID,
          CompanyID,
          SubjectID: selectedSubjectID,
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

  // ✅ This is all handleSaveClickTeach needs to do — switch to View mode.
  //    DataGrid will call processRowUpdateTeach automatically after this.
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
            SubjectID: selectedSubjectID,
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
        url={`${listViewurl}?data={"Query":{"AccessID":"2187","ScreenName":"Department","Filter":"CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
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
        url={`${listViewurl}?data={"Query":{"AccessID":"2193","ScreenName":"assignedTo","Filter":"CompanyID='${CompanyID}' AND DepartmentID=${subjectid}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
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
        url={`${listViewurl}?data={"Query":{"AccessID":"2187","ScreenName":"Department","Filter":"CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
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
        url={`${listViewurl}?data={"Query":{"AccessID":"2200","ScreenName":"Area","Filter":"CompanyID='${CompanyID}' AND ProjectID='${recID}'","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
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
        url={`${listViewurl}?data={"Query":{"AccessID":"2201","ScreenName":"Slot","Filter":"","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
      />
    );
  }

  const Teachcolumns_v1 = [
    {
      field: "id",
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
      //   renderCell: (params) => params.value?.Name || "",
      renderCell: (params) =>
        Array.isArray(params.value)
          ? params.value.map((v) => v.Name).join(", ")
          : "",
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
      renderCell: (params) => params.value?.Name || "",
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
      width: 230,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => params.value?.Name || "",
      renderEditCell: (params) => <EditareaAutocompleteSlot {...params} />,
    },
    //   {
    //     field: "slot",
    //     headerName: (
    //         <span>
    //             Slot <span style={{ color: "red" }}>*</span>
    //         </span>
    //     ),
    //     headerAlign: "center",
    //     width: 230,
    //     hide: false,
    //     editable: true,
    //     sortable: false,
    //     renderCell: (params) => params.value?.Name || "",
    //     renderEditCell: (params) => <EditareaAutocomplete {...params} />,
    // },

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
      field: "SubjectName",
      headerName: "Subject",
      flex: 1,
      editable: false,
    },
    {
      field: "Description",
      headerName: "Units",
      flex: 2,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
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
            label="Delete"
            onClick={handleDeleteClickUnit(id)}
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

  useEffect(() => {
    if (mode !== "A" && staffmappingGetData?.Terms) {
      const formattedRows = staffmappingGetData.Terms.map((item) => ({
        id: Number(item.id),
        id: Number(item.id),
        department: { RecordID: item.DepartmentID, Name: item.DeptName },
        // Teacher: { RecordID: item.EmployeeID, Name: item.EmpName },
      }));

      setTeachrows(formattedRows);
      setRowModesModelStaff({});
      setPage(0);
    }
  }, [data]);

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


 const [marksDialogOpen, setMarksDialogOpen] = useState(false);
const [marksDialogStudent, setMarksDialogStudent] = useState(null); // { id, Name }
const [selectednewSubject, setSelectednewSubject] = useState("");
const [marksValue, setMarksValue] = useState(0);
const [outOfValue, setOutOfValue] = useState(100);
const [savedMarksRecords, setSavedMarksRecords] = useState([]); // [{ Subject, Marks, OutOf }]

const subjectOptions = ["English", "Maths", "Science", "Social Studies", "Hindi"]; // adjust to your real list

const handleEditClicknew = (id) => () => {
  const student = promoterows.find((r) => r.RecordID === id);
  setMarksDialogStudent(student);
  setSelectednewSubject("");
  setMarksValue(0);
  setOutOfValue(100);
  setSavedMarksRecords(student?.marksRecords || []); // prefill if already saved earlier
  setMarksDialogOpen(true);
};

const handleAddMarksRecord = () => {
  if (!selectednewSubject) {
    toast.error("Please select a subject");
    return;
  }
  setSavedMarksRecords((prev) => [
    ...prev,
    { Subject: selectednewSubject, Marks: marksValue, OutOf: outOfValue },
  ]);
  setSelectednewSubject("");
  setMarksValue(0);
  setOutOfValue(100);
};

const handleDeleteMarksRecord = (index) => {
  setSavedMarksRecords((prev) => prev.filter((_, i) => i !== index));
};

const handleMarksDialogDone = () => {
  // Persist savedMarksRecords back onto the row / call your save API here
  console.log("Saving marks for", marksDialogStudent?.Name, savedMarksRecords);
  setMarksDialogOpen(false);
};

const promoterows = [
  { RecordID: 1, Name: "Aarav Kumar", Code: 601, status: "Pending" },
  { RecordID: 2, Name: "Diya Sharma", Code: 602, status: "Pending" },
  { RecordID: 3, Name: "Ishaan Reddy", Code: 603, status: "Marks Entered" },
  { RecordID: 4, Name: "Saanvi Nair", Code: 604, status: "Pending" },
  { RecordID: 5, Name: "Vihaan Iyer", Code: 605, status: "Marks Entered" },
  { RecordID: 6, Name: "Anaya Menon", Code: 606, status: "Pending" },
  { RecordID: 7, Name: "Reyansh Das", Code: 607, status: "Marks Entered" },
  { RecordID: 8, Name: "Myra Pillai", Code: 608, status: "Marks Entered" },
];

 const promotecolumn1 = [
    { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
    // {
    //   field: "SLNO",
    //   headerName: "SL#",
    //   width: 50,
    //   hide: false,
    //   headerAlign: "center",
    //   align: "right",
    //   sortable: false,
    //   filterable: false,
    //   valueGetter: (params) =>
    //     params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    // },
     {
      headerName: (
        <span>
          Student Name <span style={{ color: "red" }}>*</span>
        </span>
      ),
      field: "Name",
      width: 450,
      hide: false,
      editable: true,
      headerAlign: "center",
    },
    {
      headerName: "Roll No",
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
      headerName: "Status",
      field: "Status",
      width: 250,
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
            //   onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
            //   onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
            <Tooltip title="Assessment">
          <GridActionsCellItem
            icon={<AddTaskIcon sx={{ color: "#3a9e9e" }}/>}
             label="Assessment" 
        className="textPrimary"
        color="inherit"
            // onClick={handleEditClick(id)}
            onClick={handleEditClicknew(id)}
         
          />
          </Tooltip>,
     
        ];
      },
    },
  ];

//   const columns = React.useMemo(() => {
//     let visibleColumns = explorelistViewcolumn.filter((column) =>
//       VISIBLE_FIELDS.includes(column.field),
//     );
//     if (VISIBLE_FIELDS.includes("slno")) {
//       const slnoColumn = {
//         field: "slno",
//         headerName: "SL#",
//         width: 50,
//         sortable: false,
//         filterable: false,
//         valueGetter: (params) =>
//           page * pageSize +
//           params.api.getRowIndexRelativeToVisibleRows(params.id) +
//           1,
//       };
//       visibleColumns = [slnoColumn, ...visibleColumns];
//     }
//     return visibleColumns;
//   }, [explorelistViewcolumn, VISIBLE_FIELDS]);

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
        <Button sx={{ textTransform: "none", color: "#1976d2", fontWeight: 600 }} startIcon={<AddIcon />} onClick={handleClick}>
          Add Record
        </Button>
 <Typography variant="body2" sx={{ color: "#1976d2" }}>
    Total Students : {rows.length}
  </Typography>

      </GridToolbarContainer>
    );
  }

  function EditToolbarteachstaff(props) {
    const {
      setStaffrows,
      setRowModesModelStaff,
      isRowEditing,
      pageSize,
      setPage,
    } = props;
    const [isAdding, setIsAdding] = useState(false);

    const handleClickstaff = () => {
      setIsAdding(true);
      const id = nanoid();
      const newRow = {
        id,
        id: id,
        department: null,
        area: [],
        isNew: true,
      };

      setStaffrows((oldRows) => {
        const updatedRows = [...oldRows, newRow];
        const newPage = Math.floor((updatedRows.length - 1) / pageSize);
        setPage(newPage);
        return updatedRows;
      });

      setTimeout(() => {
        setRowModesModelStaff((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "department" },
        }));
        setIsAdding(false);
      }, 100);
    };

    return (
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
      selectedSubject,
      selectedSubjectID,
    } = props;
    const [isAdding, setIsAdding] = useState(false);

        const handleClickunit = () => {

            setIsAdding(true);
            if (!selectedSubjectID) {
                toast.error("Please select a Subject/Activity");
                return;
            }
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id,
                SubjectID: selectedSubjectID,
                // SubjectName: selectedSubject?.Name || "",
                SubjectName: `${selectedSubject?.Code || ""} || ${selectedSubject?.Name || ""}`,
                Description: "",
                isNew: true
            };

      setunitrows((oldRows) => {
        const updatedRows = [...oldRows, newRow];
        const newPage = Math.floor((updatedRows.length - 1) / pageSize);
        setPage(newPage);
        return updatedRows;
      });

      setTimeout(() => {
        setRowModesModelunit((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "Description" },
        }));
        setIsAdding(false);
      }, 100);
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
                Promotion
                {/* {getBusinessCaption("ProjectTitle", "Project")} */}
              </Typography>
            
            </Breadcrumbs>
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
                                 padding={1}
  height={dataGridHeightExplore}
  sx={{
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#3a9e9e", // teal header to match image
      color: "#fff",
    },
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#3a9e9e",
      color: "#fff",
    },
    
    "& .odd-row": { backgroundColor: "" },
    "& .even-row": { backgroundColor: "#d9f0ef" },
    //checkbox


"& .MuiCheckbox-root.Mui-checked .MuiSvgIcon-root": {
  backgroundColor: "#fff",   // keep white even when checked
//   border: "1px solid grey",  // keep same border
  color: "#3a9e9e",          // tick color (optional)
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
                                   rows={promoterows}
                                //    rows={rows}
                                   columns={promotecolumn1}
                                   loading={exploreLoading}
                                   editMode="row"
                                   checkboxSelection
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
                                //    disableRowSelectionOnClick
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

                                 
                           
      
             
             
<Box
  display="flex"
  alignItems="center"
  gap={2}
  padding={2}
  mt={2}
  sx={{ borderTop: "1px solid #eee" }}
>
  <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: 500 }}>
    Selected : 10 {/* {selectedRows.length}  */}students
  </Typography>

  <Box>
    <CheckinAutocomplete
     sx={{ minWidth: 200, ml: 1 }}
      name="functionLookup"
      label={
        <span>
          Promote To Standard
          <span style={{ color: "red", fontSize: "20px" }}> *</span>
        </span>
      }
      id="functionLookup"
      value={values.functionLookup}
      onChange={(newValue) => {
        setFieldValue("functionLookup", newValue);
      }}
      error={!!touched.functionLookup && !!errors.functionLookup}
      helperText={touched.functionLookup && errors.functionLookup}
      url={`${listViewurl}?data=${JSON.stringify({
        Query: {
          AccessID: "2048",
          ScreenName: "Functions",
          VerticalLicense: Subscriptionlastthree,
          Filter: `CompanyID=${CompanyID}`,
          Any: "",
        },
      })}`}
    />
  </Box>
 <Button
    variant="contained"
    // disabled={selectedRows.length === 0 || !promoteStandard}
    // onClick={handlePromote}
    sx={{
      backgroundColor: "#f0a37a",
      "&:hover": { backgroundColor: "#e8905f" },
      textTransform: "none",
      fontWeight: 600,
      ml: 5
    }}
  >
    ▲ Promote
  </Button>

                </Box>



<Dialog
  open={marksDialogOpen}
  onClose={() => setMarksDialogOpen(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle
    sx={{
      backgroundColor: "#3a9e9e",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    Marks Entry — {marksDialogStudent?.Name}
    <IconButton
      onClick={() => setMarksDialogOpen(false)}
      sx={{ color: "#fff" }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ pt: 3 }}>
    <Box mb={2}>
      <Typography variant="caption" sx={{ color: "#666" }}>
        Subject <span style={{ color: "red" }}>*</span>
      </Typography>
      <Select
        fullWidth
        size="small"
        displayEmpty
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <MenuItem value="">-- Select Subject --</MenuItem>
        {subjectOptions.map((subj) => (
          <MenuItem key={subj} value={subj}>
            {subj}
          </MenuItem>
        ))}
      </Select>
    </Box>

    <Box display="flex" gap={2} alignItems="flex-end" mb={2}>
      <Box flex={1}>
        <Typography variant="caption" sx={{ color: "#666" }}>
          Marks <span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={marksValue}
          onChange={(e) => setMarksValue(Number(e.target.value))}
        />
      </Box>

      <Box flex={1}>
        <Typography variant="caption" sx={{ color: "#666" }}>
          Out Of
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={outOfValue}
          onChange={(e) => setOutOfValue(Number(e.target.value))}
        />
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddMarksRecord}
        sx={{
          backgroundColor: "#3a9e9e",
          "&:hover": { backgroundColor: "#2f8484" },
          textTransform: "none",
          whiteSpace: "nowrap",
          height: 40,
        }}
      >
        Add
      </Button>
    </Box>

    <Typography variant="caption" sx={{ color: "#666" }}>
      Saved Records
    </Typography>
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: 1,
        mt: 1,
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        sx={{ backgroundColor: "#3a9e9e", color: "#fff", px: 2, py: 1 }}
      >
        <Box flex={2}>Subject</Box>
        <Box flex={1}>Marks</Box>
        <Box flex={1}>Out Of</Box>
        <Box width={32} />
      </Box>

      {savedMarksRecords.length === 0 ? (
        <Box px={2} py={2}>
          <Typography variant="body2" color="textSecondary">
            No records yet
          </Typography>
        </Box>
      ) : (
        savedMarksRecords.map((rec, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            sx={{
              px: 2,
              py: 1,
              backgroundColor: idx % 2 === 0 ? "#fff" : "#f5fafa",
            }}
          >
            <Box flex={2}>{rec.Subject}</Box>
            <Box flex={1}>{rec.Marks}</Box>
            <Box flex={1}>{rec.OutOf}</Box>
            <Box width={32}>
              <IconButton
                size="small"
                onClick={() => handleDeleteMarksRecord(idx)}
              >
                <DeleteIcon fontSize="small" sx={{ color: "#e57373" }} />
              </IconButton>
            </Box>
          </Box>
        ))
      )}
    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      onClick={() => setMarksDialogOpen(false)}
      sx={{ color: "#666", textTransform: "none" }}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleMarksDialogDone}
      sx={{
        backgroundColor: "#3a9e9e",
        "&:hover": { backgroundColor: "#2f8484" },
        textTransform: "none",
      }}
    >
      Done
    </Button>
  </DialogActions>
</Dialog>


              </form>
            )}
          </Formik>
        </Paper>


    </React.Fragment>
  );
};

export default Editpromotion;
