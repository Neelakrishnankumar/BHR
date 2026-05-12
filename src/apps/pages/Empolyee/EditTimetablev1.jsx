import {
  TextField,
  Box,
  Grid,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Stack,
  FormControlLabel,
  Tooltip,
  Checkbox,
  Popover,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  LinearProgress,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Divider,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import WarningIcon from '@mui/icons-material/Warning';
import {
  GridActionsCellItem,
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getFetchData,
  postData,
  requestMail,
  TimeTableGenerateget,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../Theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  CheckinAutocomplete,
  Employeeautocomplete,
  ManagerTaskEmpAutocomplete,
  MultiFormikOptimizedAutocomplete,
  Productautocomplete,
  SprintEmpAutocomplete,
  SprintEmpAutocomplete1,
} from "../../../ui-components/global/Autocomplete";
import {
  dataGridHeaderFooterHeight,
  dataGridRowHeight,
  formGap,
  dataGridHeight,
} from "../../../ui-components/global/utils";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import GradingIcon from "@mui/icons-material/Grading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import store from "../../..";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as Yup from "yup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getConfig } from "../../../config";
import TimetableGridPanel from "./TimetableGridPanel";
import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { clearData } from "../../../store/reducers/Formapireducer";
const cellKey = (rowId, colField) => `${rowId}__${colField}`;

const EditTimetablev1 = () => {
  const config = getConfig();
  const baseurl1 = config.BASE_URL;
  console.log(baseurl1, "url path");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  const compID = sessionStorage.getItem("compID");
  console.log(compID, "---sessionStorage compID");
  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");

  const baseurlUAAM = config.UAAM_URL;
  var QA = sessionStorage.getItem("qualityassurance");
  var mode = params.Mode;
  const data = useSelector((state) => state.formApi.Data);
  const [footerHeight, setFooterHeight] = useState(60);

  const Status = useSelector((state) => state.formApi.Status);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const Msg = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  // const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
  const YearFlag = sessionStorage.getItem("YearFlag");
  const EMPID = sessionStorage.getItem("EmpId");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const rowData = location.state || {};
  console.log(rowData, "---rowData");
  var mode = params.Mode;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const is003Subscription = SubscriptionCode.endsWith("003");
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  console.log(SubscriptionCode, is003Subscription, "SubscriptionCode");
  const companyClassification = sessionStorage.getItem("Classification");
  const UserName = sessionStorage.getItem("UserName");
  console.log(companyClassification, UserName, "--sessionStorage companyClassification", "UserName");
  const sliceSubscriptionCode = SubscriptionCode.slice(-3);
  const empName = sessionStorage.getItem("EmpName");
  const getRawData = sessionStorage.getItem("ClassificationData");
  const [cellEdits, setCellEdits] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);

  const [draft, setDraft] = useState({ subject: null, teacher: null });
  const [saveLoading, setSaveLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  let ClassificationData = [];
  try {
    const parsed = JSON.parse(getRawData || "[]");
    ClassificationData = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  } catch (e) {
    console.error("ClassificationData parse failed:", getRawData);
    ClassificationData = [];
  }
  console.log(rowData, "--ProjectTimeTable rowData from state");

  // Fields from listview Link state
  const HeaderID = rowData.HeaderID || 0;  // RecordID from listview row
  const ProjectID = rowData.projectID || 0;  // StandardID
  const TermsID = rowData.TermsID || 0;  // TermID
  const GroupID = rowData.GroupID || 0;  // SlotGroupID
  const Isprocess = rowData.isprocess || "N";
  const classids = ClassificationData
    .filter(item => ["Board Of Directors", "Teaching Staff"].includes(item.CfcName))
    .map(item => item.CfcID);

  console.log(classids, "--classids");
  const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");
  console.log(ClassificationRecID, "--sessionStorage ClassificationRecID");

  const filteredClassification = ClassificationData.filter(
    (item) => item.CfcName !== "Student"
  );
  const classificationIDs = filteredClassification.map(
    (item) => item.CfcID
  );

  const classificationIDString = classificationIDs
    .map((id) => `'${id}'`)
    .join(",");

  const [showImage, setShowImage] = useState(
    params.Mode == "IM" ? true : false,
  );
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [showMore, setShowMore] = React.useState(false);

  // ━━━ Subject Management State ━━━
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ name: '', periods: '' });
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  // ━━━ Rules State ━━━
  const [rules, setRules] = useState({
    noConsecutiveSameSubject: true,
    distributeEvenly: true,
    maxPeriodsPerTeacher: 3,
  });

  // ━━━ Generation & Display State ━━━
  const [isGenerating, setIsGenerating] = useState(false);
  // FIX 1: Track generation success separately
  // const [timetableGenerated, setTimetableGenerated] = useState(false);

  const [generationStep, setGenerationStep] = useState(0);

  const calendarData = useSelector((s) => s.formApi.Data);
  // const breakSlots = useSelector((s) => s.formApi.breakSlots);
  const slotIDMap = calendarData?.TimetableView?.slotID || {};
  const rawTimeSlots = calendarData?.TimetableView?.timeSlots || [];
  const rawSchedule = calendarData?.TimetableView?.schedule || [];

  const getrawColumns = rawTimeSlots.length > 0
    ? [
      {
        field: "day",
        headerName: "Day",
        width: 110,
        sortable: false,
        headerAlign: "center",
        align: "center"
      },
      ...rawTimeSlots.map((slot, index) => ({
        field: `slot_${index}`,
        headerName: slot,
        width: 140,
        sortable: false,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          const val = params.value;
          if (!val) return <span style={{ color: "#ccc", textAlign: "center" }}>—</span>;
          return (
            <span style={{
              background: "#27ae60",
              color: "#fff",
              borderRadius: "4px",
              padding: "2px 8px",
              fontSize: "12px",
              fontWeight: 600,
            }}>
              {val}
            </span>
          );
        },
      })),
    ]
    : [];

  // BUILD ROWS: one row per day
  const getWCrows = rawSchedule.map((dayObj, index) => {
    const row = { id: index, day: dayObj.day };
    rawTimeSlots.forEach((slot, i) => {
      row[`slot_${i}`] = dayObj.slots?.[slot] || "";
    });
    return row;
  });
  console.log(getWCrows, getrawColumns, "getrows&columnstimetable--------")
  const WCrows = useSelector((s) => s.formApi.AutogeneraterowData);
  const rawColumns = useSelector((s) => s.formApi.AutogeneratecolumnData);
  const WEEKloading = useSelector((s) => s.formApi.loading);
  const breakSlots = Array.isArray(calendarData?.TimetableView?.BreakSlots) ? calendarData?.TimetableView?.BreakSlots : [];
  console.log(calendarData, "calendarData");
  console.log(breakSlots, "breakSlots");
  console.log(WCrows, "rows&columns1");
  console.log(rawColumns, "rows&columns2");
  const timetableGenerated =
    (getWCrows?.length || 0) > 0 ||
    (WCrows?.length || 0) > 0;
  const detailIDMap = useMemo(() => {
    const rawDetailID = calendarData?.TimetableView?.detailID || {}; // { day: { timeSlot: DetailID } }
    const map = {};

    rawSchedule.forEach((dayObj, rowIndex) => {
      const dayName = dayObj.day;
      const dayDetailMap = rawDetailID[dayName] || {};

      Object.entries(dayDetailMap).forEach(([timeSlot, detailID]) => {
        if (detailID) {
          // rowId = index in getWCrows (same as rawSchedule index)
          // colField = slot_N (the field key we assigned in getrawColumns)
          const slotIndex = rawTimeSlots.indexOf(timeSlot);
          if (slotIndex !== -1) {
            const key = cellKey(rowIndex, `slot_${slotIndex}`);
            map[key] = detailID;
          }
        }
      });
    });

    console.log("detailIDMap built:", map);
    return map;
  }, [calendarData?.TimetableView?.detailID, rawTimeSlots, rawSchedule]);
  useEffect(() => {
    if (!FooterImg) return;

    const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      const aspectRatio = img.height / img.width;

      const pageWidth = 595;
      const MAX_FOOTER_HEIGHT = 80;

      const calculatedHeight = Math.min(
        pageWidth * aspectRatio,
        MAX_FOOTER_HEIGHT
      );

      setFooterHeight(calculatedHeight);
      setIsReady(true);
    };
  }, [FooterImg]);
  useEffect(() => {
    if (mode !== "A") {
      dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
    } else {
      dispatch(clearData()); // clears stale data from previous record
    }
  }, []);

  const targettoday = new Date().toISOString().split("T")[0];

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(today.getDate()).padStart(2, "0")}`;
  };
  console.log(mode, "mode");
  const assigneddDate = `${yyyy}-${mm}-${dd}`;
  const EmpName = sessionStorage.getItem("EmpName");
  const popoverOpen = Boolean(anchorEl);
  const WEEKcolumns = (getrawColumns || rawColumns).map((col) => ({
    ...col,
    renderCell: (params) =>
      params.value ? (
        <Box sx={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "#f0f2ff", color: "#3a3a6e", borderRadius: "6px",
          px: 1.2, py: 0.4, fontSize: "11px", fontWeight: 500,
          whiteSpace: "normal", textAlign: "center", lineHeight: 1.4,
        }}>
          {params.value}
        </Box>
      ) : null,
  }));
  const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {

    // First column = day label, no edit button
    if (colIndex === 0) {
      return {
        ...col,
        renderCell: (params) => (
          <Box sx={{ fontWeight: 500, color: "#1e1e3a", fontSize: "12px" }}>
            {params.value || ""}
          </Box>
        ),
      };
    }

    // Period columns
    return {
      ...col,
      renderCell: (params) => {
        const key = cellKey(params.row.id, col.field);
        const edit = cellEdits[key];
        const rawValue = params.value;
        const dayField = WEEKcolumns[0]?.field;
        const dayName = params.row[dayField] || "";
        const period = col.field; // = time string e.g. "9:00 AM - 9:45 AM"

        // Show whether this cell has a DB record (for debugging; remove in prod)
        const hasDB = !!(detailIDMap[key] || edit?.DetailID > 0);

        return (
          <Box sx={{
            width: "100%", height: "100%", position: "relative",
            display: "flex", flexDirection: "column", gap: "3px",
            justifyContent: "center", px: 0.5,
            "&:hover .cell-edit-btn": { opacity: 1 },
          }}>
            {/* Edit icon — top-right, revealed on hover */}
            <Tooltip title={Isprocess === "Y" ? "Processed — cannot edit" : "Edit cell"}>
              <span> {/* span wrapper needed when button is disabled */}
                <IconButton
                  size="small"
                  className="cell-edit-btn"
                  disabled={Isprocess === "Y"}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(e, params.row.id, col.field, dayName, period);
                  }}
                  sx={{
                    position: "absolute", top: 2, right: 2,
                    width: 18, height: 18, opacity: 0,
                    transition: "opacity .15s",
                    backgroundColor: "#f0f0f8",
                    border: "0.5px solid #d0d0e8",
                    borderRadius: "4px", zIndex: 1,
                    "&:hover": { backgroundColor: "#e0e0f0", opacity: "1 !important" },
                  }}
                >
                  <EditIcon sx={{ fontSize: 10, color: "#5a5a8a" }} />
                </IconButton>
              </span>
            </Tooltip>

            {/* Saved subject chip (from this session) */}
            {edit?.subject && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: "#f0f2ff",
                  color: "#3a3a6e",
                  borderRadius: "6px",
                  px: 1,
                  py: 0.2,
                  fontSize: "12px",
                  fontWeight: 500,
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {edit.subject?.label || edit.subject?.Name || String(edit.subject)}
              </Box>
            )}

            {/* Saved teacher chip (from this session) */}
            {/* {edit?.teacher && (
                            <Box sx={{
                                display: "inline-flex", alignItems: "center",
                                backgroundColor: "#fff8e0", color: "#7a6010",
                                borderRadius: "6px", px: 1, py: 0.2, fontSize: "10px",
                                fontWeight: 400, maxWidth: "90%",
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                                {edit.teacher?.label || edit.teacher?.Name || String(edit.teacher)}
                            </Box>
                        )} */}

            {/* Original API value (no local edit yet) */}
            {!edit?.subject && !edit?.teacher && rawValue && (
              <Box sx={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "#f0f2ff", color: "#3a3a6e", borderRadius: "6px",
                px: 1.2, py: 0.3, fontSize: "12px", fontWeight: 500,
                whiteSpace: "normal", textAlign: "center", lineHeight: 1.4,
              }}>
                {rawValue}
              </Box>
            )}

            {/* Empty placeholder */}
            {!edit?.subject && !edit?.teacher && !rawValue && (
              <Typography sx={{ fontSize: "10px", color: "#ccc", fontStyle: "italic" }}>
                —
              </Typography>
            )}
          </Box>
        );
      },
    };
  });
  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData?.Warningmsg?.[props] || "Are you sure?",
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

  // ━━━ Subject Management Functions ━━━
  const handleAddSubject = () => {
    if (subjectForm.name.trim() && subjectForm.periods) {
      if (editingSubjectId) {
        setRows((prev) =>
          prev.map((s) =>
            s.id === editingSubjectId
              ? { ...s, name: subjectForm.name, periods: parseInt(subjectForm.periods) }
              : s
          )
        );
        setEditingSubjectId(null);
      } else {
        setRows((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: subjectForm.name,
            periods: parseInt(subjectForm.periods),
          },
        ]);
      }
      setSubjectForm({ name: '', periods: '' });
      setOpenSubjectDialog(false);
    }
  };

  const handleEditSubject = (subject) => {
    setSubjectForm({ name: subject.name, periods: subject.periods });
    setEditingSubjectId(subject.id);
    setOpenSubjectDialog(true);
  };

  const handleDeleteSubject = (id) => {

    setRows((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRuleChange = (rule) => {
    setRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
  };

  // ━━━ Timetable Generation ━━━
  const handleGenerateTimetable = async (values) => {
    setIsGenerating(true);
    // FIX 1: Reset generation flag at start
    // setTimetableGenerated(false);

    try {
      // API payload structure
      const payload = {
        action: "autogenerate",
        data: {
          CompanyID: compID?.toString(),
          ProjectID: rowData.projectID?.toString() || "0",
          TermsID: values.Terms?.RecordID?.toString() || "0",
          SlotGroupID: values.Slotgroup?.RecordID?.toString() || "0",
          Description: values.description || "",
          TotalWeekSlots: mode == "E" ? data?.TotalWeekSlots : totalWeekSlots,
          Subjects: rows.map((s) => ({
            DepartmentID:
              s.DepartmentID?.toString() ||
              s.Department?.RecordID?.toString() ||
              "0",
            Periods: Number(s.periods || 0),
          })),
          MaxPeriodsPerDayPerTeacher:
            Number(rules.maxPeriodsPerTeacher) || 0,
          Rules: {
            NoConsecutiveSameSubject:
              rules.noConsecutiveSameSubject,
            DistributeEvenly:
              rules.distributeEvenly,
          },
        },
      };

      console.log(payload, "-- GENERATE PAYLOAD");

      // API call
      const response = await dispatch(
        TimeTableGenerateget(payload)
      );
      const headerid = response?.payload?.HeaderID || recID;
      console.log(response, "-- generate response");

      if (response?.payload?.Status === "Y" || response?.payload?.Status === "P") {
        toast.success(response?.payload?.Msg);

        // FIX 1: Set timetable as generated ONLY on success
        // setTimetableGenerated(true);

        // FIX 2: Store initial rows BEFORE fetching
        const rowsSnapshot = [...rows];

        dispatch(
          getFetchData({
            accessID: "TR368v1",
            get: "get",
            recID: headerid,
          })
        );

        // FIX 2: Restore rows after a brief delay to ensure data is set
        setTimeout(() => {
          setRows(rowsSnapshot);
        }, 100);
      }
      else if (response?.payload?.Status == "N") {
        toast.error(response?.payload?.Msg);
        // setTimetableGenerated(false);
      }
    } catch (err) {
      console.error("Generation error:", err);
      toast.error("Error generating timetable");
      // setTimetableGenerated(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const rowsRef = useRef(rows);
  // Keep ref in sync whenever rows changes
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);
  const hasRows = rows.length > 0;
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedTermsID, setSelectedTermsID] = useState(data?.TermsID ? data.TermsID : 0);
  const [termsIDPass, setTermsIDPas] = useState(data?.SlotGroupID ? data?.SlotGroupID : 0);
  const [totalWeekSlots, setTotalWeekSlots] = useState(null);
  const [formDescription, setFormDescription] = useState(data?.Description ? data?.Description : "");

  //FIXED: Initialize subjects DataGrid from Subjects array (NOT Detail array)
  useEffect(() => {
    if (mode !== "A" && data?.Subjects && Array.isArray(data.Subjects)) {
      const formattedSubjects = data.Subjects.map((subject, index) => ({
        id: subject.SlNo || index,
        RecordID: subject.SlNo || index,
        DepartmentID: subject.DepartmentID,
        Department: {
          RecordID: subject.DepartmentID,
          Name: subject.DepartmentName,
        },
        periods: subject.Periods || 0,
        isNew: false,
      }));

      setRows(formattedSubjects);
    }
    // else if (mode === "A") {
    //   // In Add mode, start with empty rows

    //   setRows([]);
    // }
  }, [data?.Subjects, mode]);

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

  const handleDeleteClick = (id) => async () => {
    try {
      const targetRow = rows.find((row) => row.id === id);
      const RecordID = targetRow?.RecordID;

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));

      if (!RecordID || isNaN(Number(RecordID))) {
        toast.success("Deleted Successfully");
        return;
      }

      const response = await dispatch(
        postData({
          accessID: "TR368v1",
          action: "harddelete",
          idata: {
            DetailID: Number(RecordID),
            CompanyID: compID,
          }
        })
      );

      if (response?.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
      } else {
        toast.error(response?.payload?.Msg || "Delete failed");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error occurred while deleting.");
    }
  };
  const [duplicateRows, setDuplicateRows] = useState(new Set());
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

  // function EditdeptAutocompleteCell(props) {
  //   const { id, value, field, api, row } = props;

  //   const handleChange = async (newValue) => {
  //     if (!newValue) return;

  //     setDeptlookup(newValue);
  //     await api.setEditCellValue({
  //       id,
  //       field: "Department",
  //       value: newValue,
  //     });

  //     api.stopCellEditMode({ id, field });
  //   };
  //   const [deptlookup, setDeptlookup] = useState(row.Department ? row.Department : null);
  //   return (
  //     <SprintEmpAutocomplete1
  //       name="Department"
  //       label="Department"
  //       id="Department"
  //       value={deptlookup}
  //       onChange={handleChange}
  //       url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
  //     />
  //   );
  // }
  function EditdeptAutocompleteCell(props) {
    const { id, value, field, api, row } = props;
    const [deptlookup, setDeptlookup] = useState(row.Department ? row.Department : null);

    const handleChange = async (newValue) => {
      if (!newValue) return;

      const isDuplicate = rowsRef.current.some(
        (r) =>
          r.id !== id &&
          Number(r.Department?.RecordID) === Number(newValue.RecordID)
      );

      if (isDuplicate) {
        // toast.error(`"${newValue.Name}" is already added.`);
        toast(`${newValue.Name} is already added. Choose a different subject.`, {
          icon: <WarningIcon style={{ color: "#f59e0b" }} />
        });
        // ━━━ Mark this row as duplicate — disables Save icon ━━━
        setDuplicateRows((prev) => new Set(prev).add(id));
      } else {
        // ━━━ Clear duplicate flag if valid subject chosen ━━━
        setDuplicateRows((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }

      // ━━━ Always set the value (show what user picked) but don't stopCellEditMode ━━━
      setDeptlookup(newValue);
      await api.setEditCellValue({ id, field: "Department", value: newValue });
    };

    return (
      <SprintEmpAutocomplete1
        name="Department"
        label="Department"
        id="Department"
        value={deptlookup}
        onChange={handleChange}
        url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID} AND ProjectID=${ProjectID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
      />
    );
  }
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //  FIXED: Removed Days, Teacher, Slots columns - Only Subject and Periods for Subjects grid
  const TTColumns = [
    {
      field: "RecordID",
      headerName: "Record ID",
      width: 120,
      hide: true,
    },
    {
      field: "Department",
      headerName: (
        <span>
          Subject <span style={{ color: "red" }}>*</span>
        </span>
      ),
      headerAlign: "center",
      width: 150,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return params.value?.Name || "";
      },
      renderEditCell: (params) => {
        return <EditdeptAutocompleteCell {...params} />;
      },
    },
    {
      headerName: (
        <span>
          Periods/Week <span style={{ color: "red" }}>*</span>
        </span>
      ),
      field: "periods",
      width: 100,
      editable: true,
      align: "right",
      headerAlign: "right",
      renderEditCell: (params) => (
        <TextField
          value={params.value ?? ""}
          type="number"
          size="small"
          fullWidth
          inputProps={{
            min: 0,
            style: { textAlign: "right" },
          }}
          onChange={(e) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            });
          }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      hide: mode == "V" ? true : false,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          const isDuplicate = duplicateRows.has(id);

          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              disabled={isDuplicate}
              sx={{
                color: isDuplicate ? "#ccc" : "inherit",
                cursor: isDuplicate ? "not-allowed" : "pointer",
              }}
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
            onClick={() => handleDeleteSubject(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const isEditMode = mode !== "A";

  const TimeTableInitialValue = {
    class: `${rowData.projectName || ""}`,

    Terms: isEditMode && data?.TermsID
      ? {
        RecordID: data.TermsID,
        Name: data.TermsName || "",
      }
      : null,

    description: isEditMode ? data?.Description || "" : "",
    assignedPerson: UserName || "",
    Slotgroup: isEditMode && data?.SlotGroupID ?
      {
        RecordID: data.SlotGroupID,
        Name: data.SlotGroupName || "",
      } : null,
    assignedDate: new Date().toISOString().split("T")[0],
  };
  const extractVal = (valOrEvent) =>
    valOrEvent?.target !== undefined ? valOrEvent.target.value : valOrEvent;

  const handleSubjectChange = (v) =>
    setDraft((prev) => ({ ...prev, subject: extractVal(v), teacher: null }));
  const handleTeacherChange = (v) =>
    setDraft((prev) => ({ ...prev, teacher: extractVal(v) }));
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = nanoid();

      const newRow = {
        id,
        RecordID: id,
        Department: null,
        periods: 0,
        isNew: true,
      };

      setRows((oldRows) => {
        const updatedRows = [...oldRows, newRow];
        const newTotal = updatedRows.length;
        const newPageIndex = Math.floor((newTotal - 1) / pageSize);
        setPage(newPageIndex);
        return updatedRows;
      });

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "Department" },
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Button
          color="primary"
          sx={{ textTransform: "none" }}
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add Subject
        </Button>

        <Button
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Total Slots : {totalWeekSlots || data?.TotalWeekSlots || 0}
        </Button>
      </GridToolbarContainer>
    );
  }
  const subjectUrl = `${listViewurl}?data=${encodeURIComponent(JSON.stringify({
    Query: {
      AccessID: "2149", ScreenName: "Subject",
      Filter: `parentID=${compID} AND ProjectID=${ProjectID}`, Any: "",
      VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
    },
  }))}`;

  const subjectId = draft.subject?.RecordID ?? draft.subject?.value ?? "";

  const teacherUrl = `${listViewurl}?data=${encodeURIComponent(JSON.stringify({
    Query: {
      AccessID: "2175", ScreenName: "Teacher",
      Filter: `CompanyID='${compID}' AND DepartmentID=${subjectId}`, Any: "",
      VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
    },
  }))}`;

  // ── Popover open ──────────────────────────────────────────────────────────
  const openEdit = (event, rowId, colField, dayName, period) => {
    const slotIndex = period?.startsWith("slot_")
      ? parseInt(period.replace("slot_", ""))
      : -1;

    const timeString =
      slotIndex !== -1 ? rawTimeSlots[slotIndex] : period;

    const key = cellKey(rowId, period);
    const existing = cellEdits[key];

    let prefillSubject = existing?.subject ?? null;
    let prefillTeacher = existing?.teacher ?? null;

    if (!existing && detailIDMap[key]) {
      const scheduleDay = rawSchedule.find(
        (s) => s.day === dayName
      );

      const subjectName =
        scheduleDay?.slots?.[timeString] || "";

      if (subjectName) {
        prefillSubject = {
          label: subjectName,
          Name: subjectName,
        };
      }
    }

    // setDraft({
    //   subject: prefillSubject,
    //   teacher: prefillTeacher,
    // });

    setActiveKey(key);

    // store both field + actual time
    setActiveMeta({
      rowId,
      colField,
      dayName,
      period,       // slot_3
      timeString,   // 11:40 AM - 12:30 PM
    });

    setAnchorEl(event.currentTarget);
  };
  const closeEdit = () => {
    setAnchorEl(null);
    setActiveKey(null);
    setActiveMeta(null);
    setDraft({ subject: null, teacher: null });
  };

  // FIX 3: Add delete cell function
  const handleDeleteCell = async () => {
    if (!activeKey) return;

    const sessionDetailID = cellEdits[activeKey]?.DetailID;
    const getDetailID = detailIDMap[activeKey];
    const storedDetailID = sessionDetailID ?? getDetailID ?? -1;

    // If it's just a local edit (no DB record), just clear it
    if (storedDetailID <= 0) {
      setCellEdits((prev) => {
        const n = { ...prev };
        delete n[activeKey];
        return n;
      });
      toast.success("Cell cleared");
      closeEdit();
      return;
    }

    // Otherwise, delete from DB
    setSaveLoading(true);
    try {
      const response = await dispatch(
        postData({
          accessID: "TR368v1",
          action: "harddelete",
          idata: {
            DetailID: Number(storedDetailID),
            CompanyID: compID,
          }
        })
      );

      if (response?.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        setCellEdits((prev) => {
          const n = { ...prev };
          delete n[activeKey];
          return n;
        });
        closeEdit();
        // Refresh to get latest state
        dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
      } else {
        toast.error(response?.payload?.Msg || "Delete failed");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Error deleting cell");
    } finally {
      setSaveLoading(false);
    }
  };

  const Fnsave = async (draftValues, isExisting, storedDetailID) => {
    const action = isExisting ? "update" : "insert";
    const detailID = isExisting ? Number(storedDetailID) : -1;
    const slotIndex = activeMeta?.period?.startsWith("slot_")
      ? parseInt(activeMeta.period.replace("slot_", ""))
      : -1;
    const timeString = slotIndex !== -1 ? rawTimeSlots[slotIndex] : "";
    const slotID = slotIDMap[timeString] ?? 0;  //now looks up correctly

    console.log(
      "Fnsave →", action,
      "| period field:", activeMeta?.period,
      "| timeString:", timeString,
      "| slotID:", slotID,
      "| DetailID:", detailID,
    );

    const idata = {
      CompanyID: compID?.toString(),
      HeaderID: recID,
      ProjectID: ProjectID?.toString() || "0",
      TermsID: mode == "E" ? TermsID?.toString() : selectedTermsID,
      SlotGroupID: mode == "E" ? GroupID?.toString() : termsIDPass,
      Assignedby: UserName || "",
      Description: rowData.Description || "",
      Detail: [{
        DepartmentID: (draftValues.subject?.RecordID ?? draftValues.subject?.value ?? "0").toString(),
        EmployeeID: (draftValues.teacher?.RecordID ?? draftValues.teacher?.value ?? "0").toString(),
        Day: activeMeta?.dayName || "",
        SlotID: slotID.toString(),
        Comments: draftValues.comments || "",
        DetailID: detailID,
      }],
    };

    console.log(action, idata, "--ProjectTimeTable Fnsave idata");

    const response = await dispatch(
      postData({ accessID: "TR368v1", action, idata })
    );

    // const returnedHeaderID = response?.payload?.HeaderID;
    const returnedHeaderID = response?.payload?.HeaderID || recID;

    // Refresh grid on both Y and E so detailIDMap rebuilds with latest DB state
    // const refresh = (hid) => dispatch(weeklyclasscaledarGet({
    //   ProjectID, HeaderID: hid, TermID: TermsID, CompanyID: compID, GroupID,
    // }));

    if (response?.payload?.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID: returnedHeaderID }));

    } else if (response?.payload?.Status == "E" || response?.payload?.Status == "N") {
      // toast.error(response.payload.Msg);
      toast(response.payload.Msg, {
        icon: <WarningIcon style={{ color: "#f59e0b" }} />
      });
      dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID: returnedHeaderID }));

    } else {
      throw new Error(response?.payload?.Msg || "Save failed");
    }
  };

  const handleSave = async () => {
    if (!activeKey) return;

    if (!draft.subject) { toast.error("Please select a Subject"); return; }
    if (!draft.teacher) { toast.error("Please select a Teacher"); return; }

    setSaveLoading(true);
    try {
      const sessionDetailID = cellEdits[activeKey]?.DetailID;   // from this session
      const getDetailID = detailIDMap[activeKey];            // from GET response
      const storedDetailID = sessionDetailID ?? getDetailID ?? -1;
      const isExisting = storedDetailID > 0;               // >0 = real DB row

      console.log(
        "handleSave →",
        "key:", activeKey,
        "| sessionDetailID:", sessionDetailID,
        "| getDetailID:", getDetailID,
        "| storedDetailID:", storedDetailID,
        "| isExisting (action):", isExisting ? "UPDATE" : "INSERT",
      );

      const result = await Fnsave(draft, isExisting, storedDetailID);


      if (result?.success) {
        setCellEdits((prev) => ({
          ...prev,
          [activeKey]: {
            subject: draft.subject,
            teacher: draft.teacher,
            isExisting: true,
            DetailID: storedDetailID > 0 ? storedDetailID : (getDetailID ?? -1),
          },
        }));
        closeEdit();
      }
      if (!result?.success) {
        closeEdit();
      }
      // On E: popover stays open, user can correct and retry
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaveLoading(false);
    }
  };
  const handleClear = () => {
    if (!activeKey) return;
    setCellEdits((prev) => { const n = { ...prev }; delete n[activeKey]; return n; });
    toast.success("Cell cleared");
    closeEdit();
  };
  // const processRowUpdate = (newRow) => {
  //   const updatedRow = {
  //     ...newRow,
  //     periods: Number(newRow.periods || 0),
  //     isNew: false,
  //   };

  //   setRows((prevRows) =>
  //     prevRows.map((row) =>
  //       row.id === newRow.id ? updatedRow : row
  //     )
  //   );

  //   return updatedRow;
  // };
  const processRowUpdate = (newRow) => {
    // ━━━ Empty Subject Validation ━━━
    if (!newRow.Department?.RecordID) {
      toast.error("Please select a subject before saving.");
      // throw new Error("Subject is required.");
    }

    // Periods Validation
    if (newRow.periods === "" || newRow.periods === 0 || newRow.periods === null || newRow.periods === undefined) {
      toast.error("Periods/Week is mandatory.");
    }

    const currentRows = rowsRef.current;
    const maxSlots = Number(
      totalWeekSlots || data?.TotalWeekSlots || 0
    );

    const otherRowsTotal = currentRows
      .filter((row) => row.id !== newRow.id)
      .reduce(
        (sum, row) => sum + Number(row.periods || 0),
        0
      );

    const currentPeriods = Number(newRow.periods || 0);

    const finalTotal =
      otherRowsTotal + currentPeriods;

    if (finalTotal > maxSlots) {
      throw new Error(
        `Total Periods ${finalTotal} cannot exceed Total Slots ${maxSlots}`
      );

    }
    const isDuplicate = currentRows.some(
      (row) =>
        row.id !== newRow.id &&
        Number(row.Department?.RecordID) === Number(newRow.Department?.RecordID)
    );

    if (isDuplicate) {
      // toast.error(`${newRow.Department?.Name} is already added. Choose a different subject.`);
      toast(`${newRow.Department?.Name} is already added. Choose a different subject.`, {
        icon: <WarningIcon style={{ color: "#f59e0b" }} />
      });
      // throw new Error("Duplicate subject."); // keeps row in edit mode
    }

    const updatedRow = {
      ...newRow,
      periods: Number(newRow.periods || 0),
      isNew: false,
    };

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );

    return updatedRow;
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}

      {/* Header Paper */}
      <Paper
        elevation={3}
        sx={{ margin: "0px 10px", background: "#F2F0F0", height: "50px" }}
      >
        <Box display="flex" justifyContent="space-between">
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
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => {
                    is003Subscription ?
                      navigate("/Apps/TR133/Classes") :
                      navigate("/Apps/TR133/Project");
                  }}
                >
                  List Of Classes ({rowData.BreadCrumb1 || ""})
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  {mode == "A" ? "List Of Time Table" : `List Of Time Table (${rowData.BreadCrumb2})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Timetable
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

      {/* Main Content Paper */}
      <Paper elevation={3} sx={{ margin: "10px" }}>
        <Formik
          initialValues={TimeTableInitialValue}
          onSubmit={(values, { resetForm }) => { }}
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
                gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                gap={formGap}
                padding={2}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >

                <TextField
                  name="class"
                  type="text"
                  id="class"
                  label="Class"
                  variant="standard"
                  focused
                  disabled={hasRows}
                  value={values.class}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{ readOnly: true }}
                />

                <CheckinAutocomplete
                  sx={{ gridColumn: "span 2" }}
                  name="Terms"
                  label={
                    <>
                      Term
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </>
                  }
                  id="Terms"
                  value={values.Terms}
                  disabled={hasRows}
                  onChange={(newValue) => {
                    if (newValue) {
                      setFieldValue("TermsCode", newValue.Code);
                      setFieldValue("Terms", newValue);
                      setSelectedTermsID(newValue.RecordID);
                    } else {
                      setFieldValue("TermsCode", "");
                      setFieldValue("Terms", newValue);
                      setSelectedTermsID(0);
                    }
                  }}
                  error={!!touched.Terms && !!errors.Terms}
                  helperText={touched.Terms && errors.Terms}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2169",
                      ScreenName: "Terms",
                      VerticalLicense: Subscriptionlastthree,
                      Filter: `CompanyID='${compID}' AND AcademicYearID='${params.YearID}'`,
                      Any: "",
                    },
                  })}`}
                />

                <CheckinAutocomplete
                  sx={{ gridColumn: "span 2" }}
                  name="Slotgroup"
                  label={
                    <>
                      Slot Group
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </>
                  }
                  id="Slotgroup"
                  value={values.Slotgroup}
                  disabled={hasRows}
                  onChange={(newValue) => {
                    if (newValue) {
                      setTermsIDPas(newValue.RecordID);
                      setTotalWeekSlots(newValue.TotalWeekSlots);
                      setFieldValue("SlotRecordID", newValue.RecordID);
                      setFieldValue("Slotgroup", newValue);
                    } else {
                      setFieldValue("Slotgroup", newValue);
                    }
                  }}
                  error={!!touched.Slotgroup && !!errors.Slotgroup}
                  helperText={touched.Slotgroup && errors.Slotgroup}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2171",
                      ScreenName: "Slotgroup",
                      VerticalLicense: Subscriptionlastthree,
                      Filter: `CompanyID='${compID}'`,
                      Any: "",
                    },
                  })}`}
                />

                <TextField
                  disabled={mode === "V" || hasRows}
                  name="description"
                  type="text"
                  id="description"
                  label="Description"
                  variant="standard"
                  focused
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setFormDescription(e.target.value);
                  }}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  name="assignedDate"
                  type="date"
                  id="assignedDate"
                  label="Created Date"
                  variant="standard"
                  disabled={hasRows}
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.assignedDate}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{ readOnly: true }}
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "2fr 2fr",
                    },
                    gap: 2,
                    gridColumn: "span 4",
                    alignItems: "stretch",
                  }}
                >

                  {/* ━━━ LEFT SIDE : SUBJECTS DATAGRID ━━━ */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #ecf0f1",
                      height: "95%",
                    }}
                  >
                    <Box
                      height="280px"
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
                          color: "",
                        },
                        "& .even-row": {
                          backgroundColor: "#d0edec",
                          color: "",
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
                        columns={TTColumns}
                        editMode="row"
                        disableSelectionOnClick
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
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
                        components={{
                          Toolbar: EditToolbar,
                        }}
                        componentsProps={{
                          toolbar: { setRows, setRowModesModel },
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
                  </Paper>

                  {/* ━━━ RIGHT SIDE : RULES ━━━ */}
                  <Paper
                    elevation={0}
                    sx={{
                      border: '1px solid #ecf0f1',
                      borderRadius: 2,
                      p: 3,
                      height: "95%",
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#27ae60',
                          mr: 1.5,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#2c3e50',
                        }}
                      >
                        Generation Rules
                      </Typography>
                    </Box>

                    <Stack spacing={1}>

                      {/* Rule 1 */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          pb: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: '#2c3e50',
                            }}
                          >
                            No consecutive same subject
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: '#7f8c8d',
                              display: 'block',
                              mt: 0.5,
                            }}
                          >
                            Avoid placing the same subject back-to-back
                          </Typography>
                        </Box>

                        <Switch
                          checked={rules.noConsecutiveSameSubject}
                          onChange={() =>
                            handleRuleChange('noConsecutiveSameSubject')
                          }
                        />
                      </Box>

                      <Divider />

                      {/* Rule 2 */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          py: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: '#2c3e50',
                            }}
                          >
                            Distribute evenly across week
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: '#7f8c8d',
                              display: 'block',
                              mt: 0.5,
                            }}
                          >
                            Spread periods uniformly
                          </Typography>
                        </Box>

                        <Switch
                          checked={rules.distributeEvenly}
                          onChange={() =>
                            handleRuleChange('distributeEvenly')
                          }
                        />
                      </Box>

                      <Divider />

                      {/* Rule 3 */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          pt: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: '#2c3e50',
                            }}
                          >
                            Max periods per teacher per day
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: '#7f8c8d',
                              display: 'block',
                              mt: 0.5,
                            }}
                          >
                            Limit teacher workload per day
                          </Typography>
                        </Box>

                        <TextField
                          type="number"
                          value={rules.maxPeriodsPerTeacher}
                          onChange={(e) =>
                            setRules((prev) => ({
                              ...prev,
                              maxPeriodsPerTeacher: parseInt(e.target.value),
                            }))
                          }
                          variant="standard"
                          size="small"
                          inputProps={{
                            min: 1,
                            max: 10,
                            style: { textAlign: "right" },
                          }}
                          sx={{ width: 80 }}
                        />
                      </Box>

                    </Stack>
                  </Paper>

                </Box>

                {/* Action Buttons */}
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    loading={isGenerating}
                    disabled={Isprocess === "Y"}
                    loadingPosition="start"
                    onClick={() => handleGenerateTimetable(values)}
                    sx={{
                      backgroundColor: '#27ae60',
                      '&:hover': { backgroundColor: '#229954' },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    GENERATE
                  </LoadingButton>
                  <Button
                    color="warning"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>

                </Box>
              </Box>

              {/* FIX 1: Generated Timetable Grid - Show ONLY if timetableGenerated is true */}
              {timetableGenerated && (
                <Box sx={{
                  height: 400, width: "100%", padding: 3, mt: -4,
                  "& .MuiDataGrid-root": { border: "1px solid #e8e8f0", borderRadius: "8px", overflow: "hidden" },
                  "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1e1e3a", color: "#c8d0ea", borderBottom: "none" },
                  "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 500, fontSize: "11px", color: "#c8d0ea" },
                  "& .MuiDataGrid-columnHeader": { borderRight: "1px solid #2e2e50" },
                  "& .MuiDataGrid-columnHeader:last-of-type": { borderRight: "none" },
                  "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": { color: "#8890b8" },
                  "& .MuiDataGrid-columnSeparator": { display: "none" },
                  "& .MuiDataGrid-cell": {
                    borderRight: "0.5px solid #ebebf2", borderBottom: "0.5px solid #ebebf2",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "visible !important",
                  },
                  "& .MuiDataGrid-cell:last-of-type": { borderRight: "none" },
                  "& .MuiDataGrid-virtualScroller": { backgroundColor: "#ffffff" },
                  "& .odd-row": { backgroundColor: "#f8f8fc", color: "#2d2d4a" },
                  "& .even-row": { backgroundColor: "#ffffff", color: "#2d2d4a" },
                  "& .odd-row:hover": { backgroundColor: "#eff0fa !important" },
                  "& .even-row:hover": { backgroundColor: "#eff0fa !important" },
                  "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
                    backgroundColor: "#f0f0f8", fontWeight: 500, color: "#1e1e3a", borderRight: "2px solid #d0d0e8",
                  },
                }}>
                  <DataGrid
                    rows={getWCrows || WCrows}
                    columns={gridColumns || []}
                    pageSizeOptions={[5]}
                    getRowId={(row) => row.id}
                    hideFooter
                    disableRowSelectionOnClick
                    rowHeight={60}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
                    }
                  />
                </Box>
              )}

              {/* FIX 1: Break Slots and PDF - Show ONLY if timetableGenerated is true */}
              {timetableGenerated && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    px: 3,
                    borderTop: "1px solid #eaeaf2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Left Side - Break Slots */}
                  {breakSlots.length > 0 && (
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          fontSize: "13px",
                          color: "#444",
                        }}
                      >
                        Intervals
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          flexWrap: "wrap",
                        }}
                      >
                        {breakSlots.map((slot, i) => (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              px: 2,
                              py: 0.8,
                              borderRadius: "20px",
                              background: "#1e1e3a",
                              marginBottom: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#a8b2d8",
                                fontWeight: 400,
                              }}
                            >
                              {slot.SlotText}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "#5a6080",
                              }}
                            >
                              →
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#dde2f5",
                                fontWeight: 500,
                              }}
                            >
                              {slot.SlotName}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Right Side - PDF Icon */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PDFDownloadLink
                      document={
                        <ProjectTimeTablePDF
                          rows={getWCrows || WCrows}
                          columns={gridColumns || []}
                          breakSlots={breakSlots}
                          footerHeight={footerHeight}
                          projectName={rowData.projectName}
                          termName={rowData.TermName}
                          filters={{
                            Imageurl: baseurlUAAM,
                            HeaderImg,
                            FooterImg,
                          }}
                        />
                      }
                      fileName={`Timetable_${rowData.projectName || "report"}.pdf`}
                      style={{ color: "#d32f2f", cursor: "pointer" }}
                    >
                      {({ loading }) =>
                        loading ? (
                          <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                        ) : (
                          <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        )
                      }
                    </PDFDownloadLink>
                  </Box>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </Paper>

      {/* FIX 3: Popover with Delete Cell Option */}
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={closeEdit}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          elevation: 4,
          sx: { borderRadius: "10px", border: "0.5px solid #e2e2e8", p: 2, minWidth: 300, maxWidth: 360 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "13px",
              color: "#1e1e3a",
            }}
          >
            {activeMeta?.dayName
              ? `Edit — ${activeMeta.dayName} · ${activeMeta.timeString}`
              : "Edit Cell"}
          </Typography>
          <IconButton size="small" onClick={closeEdit}>
            <CancelIcon sx={{ fontSize: 16, color: "#999" }} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <CheckinAutocomplete
          name="Subject" label="Subject" id="Subject"
          value={draft.subject}
          onChange={handleSubjectChange}
          url={subjectUrl}
        />

        <CheckinAutocomplete
          sx={{ mt: 1 }}
          name="Teacher" label="Teacher" id="Teacher"
          value={draft.teacher}
          onChange={handleTeacherChange}
          url={teacherUrl}
        />

        <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}>
          <Button size="small" variant="outlined" onClick={closeEdit} disabled={saveLoading}
            sx={{ fontSize: "11px", textTransform: "none", borderRadius: "6px" }}>
            Cancel
          </Button>
          {/* FIX 3: Delete button in popover */}
          <Tooltip title="Delete this cell record">
            <span>
              <Button
                size="small" variant="outlined" disabled={saveLoading}
                onClick={handleDeleteCell}
                sx={{
                  fontSize: "11px", textTransform: "none", borderRadius: "6px",
                  color: "#d32f2f", borderColor: "#d32f2f",
                  "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" },
                }}
              >
                <DeleteIcon sx={{ fontSize: 14, mr: 0.5 }} /> Delete
              </Button>
            </span>
          </Tooltip>
          <Button
            size="small" variant="contained" disabled={saveLoading}
            startIcon={saveLoading ? <CircularProgress size={12} color="inherit" /> : <SaveIcon />}
            onClick={handleSave}
            sx={{
              fontSize: "11px", textTransform: "none", borderRadius: "6px",
              background: "#1e1e3a", "&:hover": { background: "#2e2e5a" },
            }}
          >
            {saveLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default EditTimetablev1;
// import {
//   TextField,
//   Box,
//   Grid,
//   Typography,
//   useTheme,
//   FormControl,
//   FormLabel,
//   Button,
//   IconButton,
//   Stack,
//   FormControlLabel,
//   Tooltip,
//   Checkbox,
//   Popover,
//   InputLabel,
//   Select,
//   MenuItem,
//   Breadcrumbs,
//   LinearProgress,
//   Chip,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Hidden,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Switch,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { nanoid } from "@reduxjs/toolkit";
// import AddIcon from "@mui/icons-material/Add";
// import WarningIcon from '@mui/icons-material/Warning';
// import {
//   GridActionsCellItem,
//   DataGrid,
//   GridRowModes,
//   GridToolbarContainer,
//   GridRowEditStopReasons,
// } from "@mui/x-data-grid";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import { Formik } from "formik";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//   getFetchData,
//   postData,
//   requestMail,
//   TimeTableGenerateget,
// } from "../../../store/reducers/Formapireducer";
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { LoadingButton } from "@mui/lab";
// import Swal from "sweetalert2";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { tokens } from "../../../Theme";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import {
//   CheckinAutocomplete,
//   Employeeautocomplete,
//   ManagerTaskEmpAutocomplete,
//   MultiFormikOptimizedAutocomplete,
//   Productautocomplete,
//   SprintEmpAutocomplete,
//   SprintEmpAutocomplete1,
// } from "../../../ui-components/global/Autocomplete";
// import {
//   dataGridHeaderFooterHeight,
//   dataGridRowHeight,
//   formGap,
//   dataGridHeight,
// } from "../../../ui-components/global/utils";
// import { attachmentPost } from "../../../store/reducers/LoginReducer";
// import GradingIcon from "@mui/icons-material/Grading";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import axios from "axios";
// import store from "../../..";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import * as Yup from "yup";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { getConfig } from "../../../config";
// import TimetableGridPanel from "./TimetableGridPanel";
// import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { clearData } from "../../../store/reducers/Formapireducer";
// const cellKey = (rowId, colField) => `${rowId}__${colField}`;

// const EditTimetablev1 = () => {
//   const config = getConfig();
//   const baseurl1 = config.BASE_URL;
//   console.log(baseurl1, "url path");
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   let params = useParams();
//   const dispatch = useDispatch();
//   var recID = params.id;
//   const compID = sessionStorage.getItem("compID");
//   console.log(compID, "---sessionStorage compID");
//   const HeaderImg = sessionStorage.getItem("CompanyHeader");
//   const FooterImg = sessionStorage.getItem("CompanyFooter");

//   const baseurlUAAM = config.UAAM_URL;
//   var QA = sessionStorage.getItem("qualityassurance");
//   var mode = params.Mode;
//   const data = useSelector((state) => state.formApi.Data);
//   const [footerHeight, setFooterHeight] = useState(60);

//   const Status = useSelector((state) => state.formApi.Status);
//   const listViewurl = useSelector((state) => state.globalurl.listViewurl);
//   const Msg = useSelector((state) => state.formApi.msg);
//   const loading = useSelector((state) => state.formApi.getLoading);
//   const isLoading = useSelector((state) => state.formApi.postLoading);
//   const getLoading = useSelector((state) => state.formApi.getLoading);
//   // const exploreLoading = useSelector((state) => state.exploreApi.loading);
//   const [open, setOpen] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [Loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
//   const YearFlag = sessionStorage.getItem("YearFlag");
//   const EMPID = sessionStorage.getItem("EmpId");
//   const Year = sessionStorage.getItem("year");
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const location = useLocation();
//   const rowData = location.state || {};
//   console.log(rowData, "---rowData");
//   var mode = params.Mode;

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
//   const is003Subscription = SubscriptionCode.endsWith("003");
//   const lastThree = SubscriptionCode?.slice(-3) || "";
//   const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
//     ? lastThree
//     : "";
//   console.log(SubscriptionCode, is003Subscription, "SubscriptionCode");
//   const companyClassification = sessionStorage.getItem("Classification");
//   const UserName = sessionStorage.getItem("UserName");
//   console.log(companyClassification, UserName, "--sessionStorage companyClassification", "UserName");
//   const sliceSubscriptionCode = SubscriptionCode.slice(-3);
//   const empName = sessionStorage.getItem("EmpName");
//   const getRawData = sessionStorage.getItem("ClassificationData");
//   const [cellEdits, setCellEdits] = useState({});

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeKey, setActiveKey] = useState(null);
//   const [activeMeta, setActiveMeta] = useState(null);

//   const [draft, setDraft] = useState({ subject: null, teacher: null });
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [isReady, setIsReady] = useState(false);
//   let ClassificationData = [];
//   try {
//     const parsed = JSON.parse(getRawData || "[]");
//     ClassificationData = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
//   } catch (e) {
//     console.error("ClassificationData parse failed:", getRawData);
//     ClassificationData = [];
//   }
//   console.log(rowData, "--ProjectTimeTable rowData from state");

//   // Fields from listview Link state
//   const HeaderID = rowData.HeaderID || 0;  // RecordID from listview row
//   const ProjectID = rowData.projectID || 0;  // StandardID
//   const TermsID = rowData.TermsID || 0;  // TermID
//   const GroupID = rowData.GroupID || 0;  // SlotGroupID
//   const Isprocess = rowData.isprocess || "N";
//   const classids = ClassificationData
//     .filter(item => ["Board Of Directors", "Teaching Staff"].includes(item.CfcName))
//     .map(item => item.CfcID);

//   console.log(classids, "--classids");
//   const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");
//   console.log(ClassificationRecID, "--sessionStorage ClassificationRecID");

//   const filteredClassification = ClassificationData.filter(
//     (item) => item.CfcName !== "Student"
//   );
//   const classificationIDs = filteredClassification.map(
//     (item) => item.CfcID
//   );

//   const classificationIDString = classificationIDs
//     .map((id) => `'${id}'`)
//     .join(",");

//   const [showImage, setShowImage] = useState(
//     params.Mode == "IM" ? true : false,
//   );
//   const [errorMsgData, setErrorMsgData] = useState(null);
//   const [validationSchema, setValidationSchema] = useState(null);
//   const [showMore, setShowMore] = React.useState(false);

//   // ━━━ Subject Management State ━━━
//   const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
//   const [subjectForm, setSubjectForm] = useState({ name: '', periods: '' });
//   const [editingSubjectId, setEditingSubjectId] = useState(null);

//   // ━━━ Rules State ━━━
//   const [rules, setRules] = useState({
//     noConsecutiveSameSubject: true,
//     distributeEvenly: true,
//     maxPeriodsPerTeacher: 3,
//   });

//   // ━━━ Generation & Display State ━━━
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [timetableGenerated, setTimetableGenerated] = useState(false);
//   const [generationStep, setGenerationStep] = useState(0); // 0: form, 1: generated, 2: approved

//   const calendarData = useSelector((s) => s.formApi.Data);
//   // const breakSlots = useSelector((s) => s.formApi.breakSlots);
//   const slotIDMap = calendarData?.TimetableView?.slotID || {};
//   const rawTimeSlots = calendarData?.TimetableView?.timeSlots || [];
//   const rawSchedule = calendarData?.TimetableView?.schedule || [];

//   const getrawColumns = rawTimeSlots.length > 0
//     ? [
//       {
//         field: "day",
//         headerName: "Day",
//         width: 110,
//         sortable: false,
//         headerAlign: "center",
//         align: "center"
//       },
//       ...rawTimeSlots.map((slot, index) => ({
//         field: `slot_${index}`,
//         headerName: slot,
//         width: 140,
//         sortable: false,
//         headerAlign: "center",
//         align: "center",
//         renderCell: (params) => {
//           const val = params.value;
//           if (!val) return <span style={{ color: "#ccc", textAlign: "center" }}>—</span>;
//           return (
//             <span style={{
//               background: "#27ae60",
//               color: "#fff",
//               borderRadius: "4px",
//               padding: "2px 8px",
//               fontSize: "12px",
//               fontWeight: 600,
//             }}>
//               {val}
//             </span>
//           );
//         },
//       })),
//     ]
//     : [];

//   // BUILD ROWS: one row per day
//   const getWCrows = rawSchedule.map((dayObj, index) => {
//     const row = { id: index, day: dayObj.day };
//     rawTimeSlots.forEach((slot, i) => {
//       row[`slot_${i}`] = dayObj.slots?.[slot] || "";
//     });
//     return row;
//   });
//   console.log(getWCrows, getrawColumns, "getrows&columnstimetable--------")
//   const WCrows = useSelector((s) => s.formApi.AutogeneraterowData);
//   const rawColumns = useSelector((s) => s.formApi.AutogeneratecolumnData);
//   const WEEKloading = useSelector((s) => s.formApi.loading);
//   const breakSlots = Array.isArray(calendarData?.TimetableView?.BreakSlots) ? calendarData?.TimetableView?.BreakSlots : [];
//   console.log(calendarData, "calendarData");
//   console.log(breakSlots, "breakSlots");
//   console.log(WCrows, "rows&columns1");
//   console.log(rawColumns, "rows&columns2");
//   const detailIDMap = useMemo(() => {
//     const rawDetailID = calendarData?.TimetableView?.detailID || {}; // { day: { timeSlot: DetailID } }
//     const map = {};

//     rawSchedule.forEach((dayObj, rowIndex) => {
//       const dayName = dayObj.day;
//       const dayDetailMap = rawDetailID[dayName] || {};

//       Object.entries(dayDetailMap).forEach(([timeSlot, detailID]) => {
//         if (detailID) {
//           // rowId = index in getWCrows (same as rawSchedule index)
//           // colField = slot_N (the field key we assigned in getrawColumns)
//           const slotIndex = rawTimeSlots.indexOf(timeSlot);
//           if (slotIndex !== -1) {
//             const key = cellKey(rowIndex, `slot_${slotIndex}`);
//             map[key] = detailID;
//           }
//         }
//       });
//     });

//     console.log("detailIDMap built:", map);
//     return map;
//   }, [calendarData?.TimetableView?.detailID, rawTimeSlots, rawSchedule]);
//   useEffect(() => {
//     if (!FooterImg) return;

//     const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

//     const img = new Image();
//     img.src = url;

//     img.onload = () => {
//       const aspectRatio = img.height / img.width;

//       const pageWidth = 595;
//       const MAX_FOOTER_HEIGHT = 80;

//       const calculatedHeight = Math.min(
//         pageWidth * aspectRatio,
//         MAX_FOOTER_HEIGHT
//       );

//       setFooterHeight(calculatedHeight);
//       setIsReady(true);
//     };
//   }, [FooterImg]);
//   useEffect(() => {
//     if (mode !== "A") {
//       dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
//     } else {
//       dispatch(clearData()); // clears stale data from previous record
//     }
//   }, []);

//   const targettoday = new Date().toISOString().split("T")[0];

//   const today = new Date();
//   const dd = String(today.getDate()).padStart(2, "0");
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const yyyy = today.getFullYear();

//   const getCurrentDate = () => {
//     const today = new Date();
//     return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
//       2,
//       "0",
//     )}-${String(today.getDate()).padStart(2, "0")}`;
//   };
//   console.log(mode, "mode");
//   const assigneddDate = `${yyyy}-${mm}-${dd}`;
//   const EmpName = sessionStorage.getItem("EmpName");
//   const popoverOpen = Boolean(anchorEl);
//   const WEEKcolumns = (getrawColumns || rawColumns).map((col) => ({
//     ...col,
//     renderCell: (params) =>
//       params.value ? (
//         <Box sx={{
//           display: "inline-flex", alignItems: "center", justifyContent: "center",
//           backgroundColor: "#f0f2ff", color: "#3a3a6e", borderRadius: "6px",
//           px: 1.2, py: 0.4, fontSize: "11px", fontWeight: 500,
//           whiteSpace: "normal", textAlign: "center", lineHeight: 1.4,
//         }}>
//           {params.value}
//         </Box>
//       ) : null,
//   }));
//   const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {

//     // First column = day label, no edit button
//     if (colIndex === 0) {
//       return {
//         ...col,
//         renderCell: (params) => (
//           <Box sx={{ fontWeight: 500, color: "#1e1e3a", fontSize: "12px" }}>
//             {params.value || ""}
//           </Box>
//         ),
//       };
//     }

//     // Period columns
//     return {
//       ...col,
//       renderCell: (params) => {
//         const key = cellKey(params.row.id, col.field);
//         const edit = cellEdits[key];
//         const rawValue = params.value;
//         const dayField = WEEKcolumns[0]?.field;
//         const dayName = params.row[dayField] || "";
//         const period = col.field; // = time string e.g. "9:00 AM - 9:45 AM"

//         // Show whether this cell has a DB record (for debugging; remove in prod)
//         const hasDB = !!(detailIDMap[key] || edit?.DetailID > 0);

//         return (
//           <Box sx={{
//             width: "100%", height: "100%", position: "relative",
//             display: "flex", flexDirection: "column", gap: "3px",
//             justifyContent: "center", px: 0.5,
//             "&:hover .cell-edit-btn": { opacity: 1 },
//           }}>
//             {/* Edit icon — top-right, revealed on hover */}
//             <Tooltip title={Isprocess === "Y" ? "Processed — cannot edit" : "Edit cell"}>
//               <span> {/* span wrapper needed when button is disabled */}
//                 <IconButton
//                   size="small"
//                   className="cell-edit-btn"
//                   disabled={Isprocess === "Y"}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openEdit(e, params.row.id, col.field, dayName, period);
//                   }}
//                   sx={{
//                     position: "absolute", top: 2, right: 2,
//                     width: 18, height: 18, opacity: 0,
//                     transition: "opacity .15s",
//                     backgroundColor: "#f0f0f8",
//                     border: "0.5px solid #d0d0e8",
//                     borderRadius: "4px", zIndex: 1,
//                     "&:hover": { backgroundColor: "#e0e0f0", opacity: "1 !important" },
//                   }}
//                 >
//                   <EditIcon sx={{ fontSize: 10, color: "#5a5a8a" }} />
//                 </IconButton>
//               </span>
//             </Tooltip>

//             {/* Saved subject chip (from this session) */}
//             {edit?.subject && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%",
//                   backgroundColor: "#f0f2ff",
//                   color: "#3a3a6e",
//                   borderRadius: "6px",
//                   px: 1,
//                   py: 0.2,
//                   fontSize: "12px",
//                   fontWeight: 500,
//                   textAlign: "center",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {edit.subject?.label || edit.subject?.Name || String(edit.subject)}
//               </Box>
//             )}

//             {/* Saved teacher chip (from this session) */}
//             {/* {edit?.teacher && (
//                             <Box sx={{
//                                 display: "inline-flex", alignItems: "center",
//                                 backgroundColor: "#fff8e0", color: "#7a6010",
//                                 borderRadius: "6px", px: 1, py: 0.2, fontSize: "10px",
//                                 fontWeight: 400, maxWidth: "90%",
//                                 overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                             }}>
//                                 {edit.teacher?.label || edit.teacher?.Name || String(edit.teacher)}
//                             </Box>
//                         )} */}

//             {/* Original API value (no local edit yet) */}
//             {!edit?.subject && !edit?.teacher && rawValue && (
//               <Box sx={{
//                 display: "inline-flex", alignItems: "center", justifyContent: "center",
//                 backgroundColor: "#f0f2ff", color: "#3a3a6e", borderRadius: "6px",
//                 px: 1.2, py: 0.3, fontSize: "12px", fontWeight: 500,
//                 whiteSpace: "normal", textAlign: "center", lineHeight: 1.4,
//               }}>
//                 {rawValue}
//               </Box>
//             )}

//             {/* Empty placeholder */}
//             {!edit?.subject && !edit?.teacher && !rawValue && (
//               <Typography sx={{ fontSize: "10px", color: "#ccc", fontStyle: "italic" }}>
//                 —
//               </Typography>
//             )}
//           </Box>
//         );
//       },
//     };
//   });
//   const fnLogOut = (props) => {
//     Swal.fire({
//       title: errorMsgData?.Warningmsg?.[props] || "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (props === "Logout") {
//           navigate("/");
//         }
//         if (props === "Close") {
//           navigate(-1);
//         }
//       } else {
//         return;
//       }
//     });
//   };

//   // ━━━ Subject Management Functions ━━━
//   const handleAddSubject = () => {
//     if (subjectForm.name.trim() && subjectForm.periods) {
//       if (editingSubjectId) {
//         setRows((prev) =>
//           prev.map((s) =>
//             s.id === editingSubjectId
//               ? { ...s, name: subjectForm.name, periods: parseInt(subjectForm.periods) }
//               : s
//           )
//         );
//         setEditingSubjectId(null);
//       } else {
//         setRows((prev) => [
//           ...prev,
//           {
//             id: Date.now(),
//             name: subjectForm.name,
//             periods: parseInt(subjectForm.periods),
//           },
//         ]);
//       }
//       setSubjectForm({ name: '', periods: '' });
//       setOpenSubjectDialog(false);
//     }
//   };

//   const handleEditSubject = (subject) => {
//     setSubjectForm({ name: subject.name, periods: subject.periods });
//     setEditingSubjectId(subject.id);
//     setOpenSubjectDialog(true);
//   };

//   const handleDeleteSubject = (id) => {

//     setRows((prev) => prev.filter((s) => s.id !== id));
//   };

//   const handleRuleChange = (rule) => {
//     setRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
//   };

//   // ━━━ Timetable Generation ━━━
//   const handleGenerateTimetable = async (values) => {
//     setIsGenerating(true);

//     try {
//       // API payload structure
//       const payload = {
//         action: "autogenerate",
//         data: {
//           CompanyID: compID?.toString(),
//           ProjectID: rowData.projectID?.toString() || "0",
//           TermsID: values.Terms?.RecordID?.toString() || "0",
//           SlotGroupID: values.Slotgroup?.RecordID?.toString() || "0",
//           Description: values.description || "",
//           TotalWeekSlots: mode == "E" ? data?.TotalWeekSlots : totalWeekSlots,
//           Subjects: rows.map((s) => ({
//             DepartmentID:
//               s.DepartmentID?.toString() ||
//               s.Department?.RecordID?.toString() ||
//               "0",
//             Periods: Number(s.periods || 0),
//           })),
//           MaxPeriodsPerDayPerTeacher:
//             Number(rules.maxPeriodsPerTeacher) || 0,
//           Rules: {
//             NoConsecutiveSameSubject:
//               rules.noConsecutiveSameSubject,
//             DistributeEvenly:
//               rules.distributeEvenly,
//           },
//         },
//       };

//       console.log(payload, "-- GENERATE PAYLOAD");

//       // API call
//       const response = await dispatch(
//         TimeTableGenerateget(payload)
//       );
//       const headerid = response?.payload?.HeaderID || recID;
//       console.log(response, "-- generate response");

//       if (response?.payload?.Status === "Y" || response?.payload?.Status === "P") {
//         toast.success(response?.payload?.Msg);

//         setTimetableGenerated(true);
//         dispatch(
//           getFetchData({
//             accessID: "TR368v1",
//             get: "get",
//             recID: headerid,
//           })
//         );
//       }
//       else if (response?.payload?.Status == "N") {
//         toast.error(response?.payload?.Msg);
//       }
//     } catch (err) {
//       console.error("Generation error:", err);
//       toast.error("Error generating timetable");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const [pageSize, setPageSize] = useState(15);
//   const [page, setPage] = React.useState(0);
//   const [rows, setRows] = React.useState([]);
//   const rowsRef = useRef(rows);
//   // Keep ref in sync whenever rows changes
//   useEffect(() => {
//     rowsRef.current = rows;
//   }, [rows]);
//   const hasRows = rows.length > 0;
//   const [rowModesModel, setRowModesModel] = React.useState({});
//   const [selectedTermsID, setSelectedTermsID] = useState(data?.TermsID ? data.TermsID : 0);
//   const [termsIDPass, setTermsIDPas] = useState(data?.SlotGroupID ? data?.SlotGroupID : 0);
//   const [totalWeekSlots, setTotalWeekSlots] = useState(null);
//   const [formDescription, setFormDescription] = useState(data?.Description ? data?.Description : "");

//   //FIXED: Initialize subjects DataGrid from Subjects array (NOT Detail array)
//   useEffect(() => {
//     if (mode !== "A" && data?.Subjects && Array.isArray(data.Subjects)) {
//       const formattedSubjects = data.Subjects.map((subject, index) => ({
//         id: subject.SlNo || index,
//         RecordID: subject.SlNo || index,
//         DepartmentID: subject.DepartmentID,
//         Department: {
//           RecordID: subject.DepartmentID,
//           Name: subject.DepartmentName,
//         },
//         periods: subject.Periods || 0,
//         isNew: false,
//       }));

//       setRows(formattedSubjects);
//     }
//     else if (mode === "A") {
//       // In Add mode, start with empty rows
//       setRows([]);
//     }
//   }, [data?.Subjects, mode]);

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (RecordID) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [RecordID]: { mode: GridRowModes.Edit },
//     });
//   };

//   const handleSaveClick = (RecordID) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [RecordID]: { mode: GridRowModes.View },
//     });
//   };

//   const handleDeleteClick = (id) => async () => {
//     try {
//       const targetRow = rows.find((row) => row.id === id);
//       const RecordID = targetRow?.RecordID;

//       setRows((prevRows) => prevRows.filter((row) => row.id !== id));

//       if (!RecordID || isNaN(Number(RecordID))) {
//         toast.success("Deleted Successfully");
//         return;
//       }

//       const response = await dispatch(
//         postData({
//           accessID: "TR368v1",
//           action: "harddelete",
//           idata: {
//             DetailID: Number(RecordID),
//             CompanyID: compID,
//           }
//         })
//       );

//       if (response?.payload?.Status === "Y") {
//         toast.success(response.payload.Msg);
//         dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
//       } else {
//         toast.error(response?.payload?.Msg || "Delete failed");
//       }
//     } catch (error) {
//       console.error("Delete Error:", error);
//       toast.error("Error occurred while deleting.");
//     }
//   };
//   const [duplicateRows, setDuplicateRows] = useState(new Set());
//   const handleCancelClick = (RecordID) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.RecordID === RecordID);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.RecordID !== RecordID));
//     }
//   };

//   // function EditdeptAutocompleteCell(props) {
//   //   const { id, value, field, api, row } = props;

//   //   const handleChange = async (newValue) => {
//   //     if (!newValue) return;

//   //     setDeptlookup(newValue);
//   //     await api.setEditCellValue({
//   //       id,
//   //       field: "Department",
//   //       value: newValue,
//   //     });

//   //     api.stopCellEditMode({ id, field });
//   //   };
//   //   const [deptlookup, setDeptlookup] = useState(row.Department ? row.Department : null);
//   //   return (
//   //     <SprintEmpAutocomplete1
//   //       name="Department"
//   //       label="Department"
//   //       id="Department"
//   //       value={deptlookup}
//   //       onChange={handleChange}
//   //       url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
//   //     />
//   //   );
//   // }
//   function EditdeptAutocompleteCell(props) {
//     const { id, value, field, api, row } = props;
//     const [deptlookup, setDeptlookup] = useState(row.Department ? row.Department : null);

//     const handleChange = async (newValue) => {
//       if (!newValue) return;

//       const isDuplicate = rowsRef.current.some(
//         (r) =>
//           r.id !== id &&
//           Number(r.Department?.RecordID) === Number(newValue.RecordID)
//       );

//       if (isDuplicate) {
//         toast.error(`"${newValue.Name}" is already added.`);
//         // ━━━ Mark this row as duplicate — disables Save icon ━━━
//         setDuplicateRows((prev) => new Set(prev).add(id));
//       } else {
//         // ━━━ Clear duplicate flag if valid subject chosen ━━━
//         setDuplicateRows((prev) => {
//           const next = new Set(prev);
//           next.delete(id);
//           return next;
//         });
//       }

//       // ━━━ Always set the value (show what user picked) but don't stopCellEditMode ━━━
//       setDeptlookup(newValue);
//       await api.setEditCellValue({ id, field: "Department", value: newValue });
//     };

//     return (
//       <SprintEmpAutocomplete1
//         name="Department"
//         label="Department"
//         id="Department"
//         value={deptlookup}
//         onChange={handleChange}
//         url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID} AND ProjectID=${ProjectID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
//       />
//     );
//   }
//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   //  FIXED: Removed Days, Teacher, Slots columns - Only Subject and Periods for Subjects grid
//   const TTColumns = [
//     {
//       field: "RecordID",
//       headerName: "Record ID",
//       width: 120,
//       hide: true,
//     },
//     {
//       field: "Department",
//       headerName: (
//         <span>
//           Subject <span style={{ color: "red" }}>*</span>
//         </span>
//       ),
//       headerAlign: "center",
//       width: 150,
//       hide: false,
//       editable: true,
//       sortable: false,
//       renderCell: (params) => {
//         return params.value?.Name || "";
//       },
//       renderEditCell: (params) => {
//         return <EditdeptAutocompleteCell {...params} />;
//       },
//     },
//     {
//       headerName: (
//         <span>
//           Periods/Week <span style={{ color: "red" }}>*</span>
//         </span>
//       ),
//       field: "periods",
//       width: 100,
//       editable: true,
//       align: "right",
//       headerAlign: "right",
//       renderEditCell: (params) => (
//         <TextField
//           value={params.value ?? ""}
//           type="number"
//           size="small"
//           fullWidth
//           inputProps={{
//             min: 0,
//             style: { textAlign: "right" },
//           }}
//           onChange={(e) => {
//             params.api.setEditCellValue({
//               id: params.id,
//               field: params.field,
//               value: e.target.value,
//             });
//           }}
//         />
//       ),
//     },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       hide: mode == "V" ? true : false,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           const isDuplicate = duplicateRows.has(id);

//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               onClick={handleSaveClick(id)}
//               disabled={isDuplicate}
//               sx={{
//                 color: isDuplicate ? "#ccc" : "inherit",
//                 cursor: isDuplicate ? "not-allowed" : "pointer",
//               }}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={() => handleDeleteSubject(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   const isEditMode = mode !== "A";

//   const TimeTableInitialValue = {
//     class: `${rowData.projectName || ""}`,

//     Terms: isEditMode && data?.TermsID
//       ? {
//         RecordID: data.TermsID,
//         Name: data.TermsName || "",
//       }
//       : null,

//     description: isEditMode ? data?.Description || "" : "",
//     assignedPerson: UserName || "",
//     Slotgroup: isEditMode && data?.SlotGroupID ?
//       {
//         RecordID: data.SlotGroupID,
//         Name: data.SlotGroupName || "",
//       } : null,
//     assignedDate: new Date().toISOString().split("T")[0],
//   };
//   const extractVal = (valOrEvent) =>
//     valOrEvent?.target !== undefined ? valOrEvent.target.value : valOrEvent;

//   const handleSubjectChange = (v) =>
//     setDraft((prev) => ({ ...prev, subject: extractVal(v), teacher: null }));
//   const handleTeacherChange = (v) =>
//     setDraft((prev) => ({ ...prev, teacher: extractVal(v) }));
//   function EditToolbar(props) {
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//       const id = nanoid();

//       const newRow = {
//         id,
//         RecordID: id,
//         Department: null,
//         periods: 0,
//         isNew: true,
//       };

//       setRows((oldRows) => {
//         const updatedRows = [...oldRows, newRow];
//         const newTotal = updatedRows.length;
//         const newPageIndex = Math.floor((newTotal - 1) / pageSize);
//         setPage(newPageIndex);
//         return updatedRows;
//       });

//       setRowModesModel((oldModel) => ({
//         ...oldModel,
//         [id]: { mode: GridRowModes.Edit, fieldToFocus: "Department" },
//       }));
//     };

//     return (
//       <GridToolbarContainer
//         sx={{
//           mb: 1,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between"
//         }}
//       >
//         <Button
//           color="primary"
//           sx={{ textTransform: "none" }}
//           startIcon={<AddIcon />}
//           onClick={handleClick}
//         >
//           Add Subject
//         </Button>

//         <Button
//           color="primary"
//           sx={{ textTransform: "none" }}
//         >
//           Total Slots : {totalWeekSlots || data?.TotalWeekSlots || 0}
//         </Button>
//       </GridToolbarContainer>
//     );
//   }
//   const subjectUrl = `${listViewurl}?data=${encodeURIComponent(JSON.stringify({
//     Query: {
//       AccessID: "2149", ScreenName: "Subject",
//       Filter: `parentID=${compID} AND ProjectID=${ProjectID}`, Any: "",
//       VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
//     },
//   }))}`;

//   const subjectId = draft.subject?.RecordID ?? draft.subject?.value ?? "";

//   const teacherUrl = `${listViewurl}?data=${encodeURIComponent(JSON.stringify({
//     Query: {
//       AccessID: "2175", ScreenName: "Teacher",
//       Filter: `CompanyID='${compID}' AND DepartmentID=${subjectId}`, Any: "",
//       VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
//     },
//   }))}`;

//   // ── Popover open ──────────────────────────────────────────────────────────
//   const openEdit = (event, rowId, colField, dayName, period) => {
//     const slotIndex = period?.startsWith("slot_")
//       ? parseInt(period.replace("slot_", ""))
//       : -1;

//     const timeString =
//       slotIndex !== -1 ? rawTimeSlots[slotIndex] : period;

//     const key = cellKey(rowId, period);
//     const existing = cellEdits[key];

//     let prefillSubject = existing?.subject ?? null;
//     let prefillTeacher = existing?.teacher ?? null;

//     if (!existing && detailIDMap[key]) {
//       const scheduleDay = rawSchedule.find(
//         (s) => s.day === dayName
//       );

//       const subjectName =
//         scheduleDay?.slots?.[timeString] || "";

//       if (subjectName) {
//         prefillSubject = {
//           label: subjectName,
//           Name: subjectName,
//         };
//       }
//     }

//     setDraft({
//       subject: prefillSubject,
//       teacher: prefillTeacher,
//     });

//     setActiveKey(key);

//     // store both field + actual time
//     setActiveMeta({
//       rowId,
//       colField,
//       dayName,
//       period,       // slot_3
//       timeString,   // 11:40 AM - 12:30 PM
//     });

//     setAnchorEl(event.currentTarget);
//   };
//   const closeEdit = () => {
//     setAnchorEl(null);
//     setActiveKey(null);
//     setActiveMeta(null);
//     setDraft({ subject: null, teacher: null });
//   };
//   const Fnsave = async (draftValues, isExisting, storedDetailID) => {
//     const action = isExisting ? "update" : "insert";
//     const detailID = isExisting ? Number(storedDetailID) : -1;
//     const slotIndex = activeMeta?.period?.startsWith("slot_")
//       ? parseInt(activeMeta.period.replace("slot_", ""))
//       : -1;
//     const timeString = slotIndex !== -1 ? rawTimeSlots[slotIndex] : "";
//     const slotID = slotIDMap[timeString] ?? 0;  //now looks up correctly

//     console.log(
//       "Fnsave →", action,
//       "| period field:", activeMeta?.period,
//       "| timeString:", timeString,
//       "| slotID:", slotID,
//       "| DetailID:", detailID,
//     );

//     const idata = {
//       CompanyID: compID?.toString(),
//       HeaderID: recID,
//       ProjectID: ProjectID?.toString() || "0",
//       TermsID: mode == "E" ? TermsID?.toString() : selectedTermsID,
//       SlotGroupID: mode == "E" ? GroupID?.toString() : termsIDPass,
//       Assignedby: UserName || "",
//       Description: rowData.Description || "",
//       Detail: [{
//         DepartmentID: (draftValues.subject?.RecordID ?? draftValues.subject?.value ?? "0").toString(),
//         EmployeeID: (draftValues.teacher?.RecordID ?? draftValues.teacher?.value ?? "0").toString(),
//         Day: activeMeta?.dayName || "",
//         SlotID: slotID.toString(),
//         Comments: draftValues.comments || "",
//         DetailID: detailID,
//       }],
//     };

//     console.log(action, idata, "--ProjectTimeTable Fnsave idata");

//     const response = await dispatch(
//       postData({ accessID: "TR368v1", action, idata })
//     );

//     // const returnedHeaderID = response?.payload?.HeaderID;
//       const returnedHeaderID = response?.payload?.HeaderID || recID;

//     // Refresh grid on both Y and E so detailIDMap rebuilds with latest DB state
//     // const refresh = (hid) => dispatch(weeklyclasscaledarGet({
//     //   ProjectID, HeaderID: hid, TermID: TermsID, CompanyID: compID, GroupID,
//     // }));

//     if (response?.payload?.Status == "Y") {
//       toast.success(response.payload.Msg);
//       dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID:returnedHeaderID }));

//     } else if (response?.payload?.Status == "E" || response?.payload?.Status == "N") {
//       // toast.error(response.payload.Msg);
//        toast(response.payload.Msg, {
//                 icon: <WarningIcon style={{ color: "#f59e0b" }} />
//               });
//       dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID: returnedHeaderID }));

//     } else {
//       throw new Error(response?.payload?.Msg || "Save failed");
//     }
//   };

//   const handleSave = async () => {
//     if (!activeKey) return;

//     if (!draft.subject) { toast.error("Please select a Subject"); return; }
//     if (!draft.teacher) { toast.error("Please select a Teacher"); return; }

//     setSaveLoading(true);
//     try {
//       const sessionDetailID = cellEdits[activeKey]?.DetailID;   // from this session
//       const getDetailID = detailIDMap[activeKey];            // from GET response
//       const storedDetailID = sessionDetailID ?? getDetailID ?? -1;
//       const isExisting = storedDetailID > 0;               // >0 = real DB row

//       console.log(
//         "handleSave →",
//         "key:", activeKey,
//         "| sessionDetailID:", sessionDetailID,
//         "| getDetailID:", getDetailID,
//         "| storedDetailID:", storedDetailID,
//         "| isExisting (action):", isExisting ? "UPDATE" : "INSERT",
//       );

//       const result = await Fnsave(draft, isExisting, storedDetailID);


//       if (result?.success) {
//         setCellEdits((prev) => ({
//           ...prev,
//           [activeKey]: {
//             subject: draft.subject,
//             teacher: draft.teacher,
//             isExisting: true,
//             DetailID: storedDetailID > 0 ? storedDetailID : (getDetailID ?? -1),
//           },
//         }));
//         closeEdit();
//       }
//       if (!result?.success) {
//         closeEdit();
//       }
//       // On E: popover stays open, user can correct and retry
//     } catch (err) {
//       toast.error(err.message || "Save failed");
//     } finally {
//       setSaveLoading(false);
//     }
//   };
//   const handleClear = () => {
//     if (!activeKey) return;
//     setCellEdits((prev) => { const n = { ...prev }; delete n[activeKey]; return n; });
//     toast.success("Cell cleared");
//     closeEdit();
//   };
//   // const processRowUpdate = (newRow) => {
//   //   const updatedRow = {
//   //     ...newRow,
//   //     periods: Number(newRow.periods || 0),
//   //     isNew: false,
//   //   };

//   //   setRows((prevRows) =>
//   //     prevRows.map((row) =>
//   //       row.id === newRow.id ? updatedRow : row
//   //     )
//   //   );

//   //   return updatedRow;
//   // };
//   const processRowUpdate = (newRow) => {
//     // ━━━ Empty Subject Validation ━━━
//     if (!newRow.Department?.RecordID) {
//       toast.error("Please select a subject before saving.");
//       // throw new Error("Subject is required.");
//     }

//     // Periods Validation
//     if (newRow.periods === "" || newRow.periods === 0 ||newRow.periods === null || newRow.periods === undefined) {
//       toast.error("Periods/Week is mandatory.");
//     }

//     const currentRows = rowsRef.current;
//     const maxSlots = Number(
//       totalWeekSlots || data?.TotalWeekSlots || 0
//     );

//     const otherRowsTotal = currentRows
//       .filter((row) => row.id !== newRow.id)
//       .reduce(
//         (sum, row) => sum + Number(row.periods || 0),
//         0
//       );

//     const currentPeriods = Number(newRow.periods || 0);

//     const finalTotal =
//       otherRowsTotal + currentPeriods;

//     if (finalTotal > maxSlots) {
//       throw new Error(
//         `Total Periods (${finalTotal}) cannot exceed Total Slots (${maxSlots})`
//       );
//     }
//     const isDuplicate = currentRows.some(
//       (row) =>
//         row.id !== newRow.id &&
//         Number(row.Department?.RecordID) === Number(newRow.Department?.RecordID)
//     );

//     if (isDuplicate) {
//       toast.error(`${newRow.Department?.Name} is already added. Choose a different subject.`);
//       // throw new Error("Duplicate subject."); // keeps row in edit mode
//     }

//     const updatedRow = {
//       ...newRow,
//       periods: Number(newRow.periods || 0),
//       isNew: false,
//     };

//     setRows((prevRows) =>
//       prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
//     );

//     return updatedRow;
//   };
//   return (
//     <React.Fragment>
//       {getLoading ? <LinearProgress /> : false}

//       {/* Header Paper */}
//       <Paper
//         elevation={3}
//         sx={{ margin: "0px 10px", background: "#F2F0F0", height: "50px" }}
//       >
//         <Box display="flex" justifyContent="space-between">
//           <Box display="flex" borderRadius="3px" alignItems="center">
//             {broken && !rtl && (
//               <IconButton onClick={() => toggleSidebar()}>
//                 <MenuOutlinedIcon />
//               </IconButton>
//             )}
//             <Box
//               display={isNonMobile ? "flex" : "none"}
//               borderRadius="3px"
//               alignItems="center"
//             >
//               <Breadcrumbs
//                 maxItems={3}
//                 aria-label="breadcrumb"
//                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//               >
//                 <Typography
//                   variant="h5"
//                   color="#0000D1"
//                   sx={{
//                     cursor: "default",
//                     marginLeft: "10px",
//                     fontSize: "17px",
//                   }}
//                   onClick={() => {
//                     is003Subscription ?
//                       navigate("/Apps/TR133/Classes") :
//                       navigate("/Apps/TR133/Project");
//                   }}
//                 >
//                   List Of Classes ({rowData.BreadCrumb1 || ""})
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#0000D1"
//                   sx={{
//                     cursor: "default",
//                     marginLeft: "10px",
//                     fontSize: "17px",
//                   }}
//                   onClick={() => navigate(-1)}
//                 >
//                   {mode == "A" ? "List Of Time Table" : `List Of Time Table (${rowData.BreadCrumb2})`}
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   color="#0000D1"
//                   sx={{
//                     cursor: "default",
//                     marginLeft: "10px",
//                     fontSize: "17px",
//                   }}
//                   onClick={() => navigate(-1)}
//                 >
//                   Timetable
//                 </Typography>
//               </Breadcrumbs>
//             </Box>
//           </Box>
//           <Box display="flex">
//             <Tooltip title="Close">
//               <IconButton onClick={() => fnLogOut("Close")} color="error">
//                 <ResetTvIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Logout">
//               <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                 <LogoutOutlinedIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Main Content Paper */}
//       <Paper elevation={3} sx={{ margin: "10px" }}>
//         <Formik
//           initialValues={TimeTableInitialValue}
//           onSubmit={(values, { resetForm }) => { }}
//           enableReinitialize={true}
//         >
//           {({
//             errors,
//             touched,
//             handleBlur,
//             handleChange,
//             isSubmitting,
//             values,
//             handleSubmit,
//             setFieldValue,
//           }) => (
//             <form onSubmit={handleSubmit}>
//               <Box
//                 display="grid"
//                 gridTemplateColumns="repeat(4 , minMax(0,1fr))"
//                 gap={formGap}
//                 padding={2}
//                 sx={{
//                   "& > div": {
//                     gridColumn: isNonMobile ? undefined : "span 4",
//                   },
//                 }}
//               >

//                 <TextField
//                   name="class"
//                   type="text"
//                   id="class"
//                   label="Class"
//                   variant="standard"
//                   focused
//                   disabled={hasRows}
//                   value={values.class}
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   sx={{ gridColumn: "span 2" }}
//                   inputProps={{ readOnly: true }}
//                 />

//                 <CheckinAutocomplete
//                   sx={{ gridColumn: "span 2" }}
//                   name="Terms"
//                   label={
//                     <>
//                       Term
//                       <span style={{ color: "red", fontSize: "20px" }}>
//                         {" "}
//                         *{" "}
//                       </span>
//                     </>
//                   }
//                   id="Terms"
//                   value={values.Terms}
//                   disabled={hasRows}
//                   onChange={(newValue) => {
//                     if (newValue) {
//                       setFieldValue("TermsCode", newValue.Code);
//                       setFieldValue("Terms", newValue);
//                       setSelectedTermsID(newValue.RecordID);
//                     } else {
//                       setFieldValue("TermsCode", "");
//                       setFieldValue("Terms", newValue);
//                       setSelectedTermsID(0);
//                     }
//                   }}
//                   error={!!touched.Terms && !!errors.Terms}
//                   helperText={touched.Terms && errors.Terms}
//                   url={`${listViewurl}?data=${JSON.stringify({
//                     Query: {
//                       AccessID: "2169",
//                       ScreenName: "Terms",
//                       VerticalLicense: Subscriptionlastthree,
//                       Filter: `CompanyID='${compID}' AND AcademicYearID='${params.YearID}'`,
//                       Any: "",
//                     },
//                   })}`}
//                 />

//                 <CheckinAutocomplete
//                   sx={{ gridColumn: "span 2" }}
//                   name="Slotgroup"
//                   label={
//                     <>
//                       Slot Group
//                       <span style={{ color: "red", fontSize: "20px" }}>
//                         *
//                       </span>
//                     </>
//                   }
//                   id="Slotgroup"
//                   value={values.Slotgroup}
//                   disabled={hasRows}
//                   onChange={(newValue) => {
//                     if (newValue) {
//                       setTermsIDPas(newValue.RecordID);
//                       setTotalWeekSlots(newValue.TotalWeekSlots);
//                       setFieldValue("SlotRecordID", newValue.RecordID);
//                       setFieldValue("Slotgroup", newValue);
//                     } else {
//                       setFieldValue("Slotgroup", newValue);
//                     }
//                   }}
//                   error={!!touched.Slotgroup && !!errors.Slotgroup}
//                   helperText={touched.Slotgroup && errors.Slotgroup}
//                   url={`${listViewurl}?data=${JSON.stringify({
//                     Query: {
//                       AccessID: "2171",
//                       ScreenName: "Slotgroup",
//                       VerticalLicense: Subscriptionlastthree,
//                       Filter: `CompanyID='${compID}'`,
//                       Any: "",
//                     },
//                   })}`}
//                 />

//                 <TextField
//                   disabled={mode === "V" || hasRows}
//                   name="description"
//                   type="text"
//                   id="description"
//                   label="Description"
//                   variant="standard"
//                   focused
//                   value={values.description}
//                   onBlur={handleBlur}
//                   onChange={(e) => {
//                     handleChange(e);
//                     setFormDescription(e.target.value);
//                   }}
//                   error={!!touched.description && !!errors.description}
//                   helperText={touched.description && errors.description}
//                   sx={{ gridColumn: "span 2" }}
//                 />

//                 <TextField
//                   name="assignedDate"
//                   type="date"
//                   id="assignedDate"
//                   label="Created Date"
//                   variant="standard"
//                   disabled={hasRows}
//                   focused
//                   inputFormat="YYYY-MM-DD"
//                   value={values.assignedDate}
//                   sx={{ gridColumn: "span 2" }}
//                   InputLabelProps={{ readOnly: true }}
//                 />

//                 <Box
//                   sx={{
//                     display: "grid",
//                     gridTemplateColumns: {
//                       xs: "1fr",
//                       md: "2fr 2fr",
//                     },
//                     gap: 2,
//                     gridColumn: "span 4",
//                     alignItems: "stretch",
//                   }}
//                 >

//                   {/* ━━━ LEFT SIDE : SUBJECTS DATAGRID ━━━ */}
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       border: "1px solid #ecf0f1",
//                       height: "95%",
//                     }}
//                   >
//                     <Box
//                       height="280px"
//                       sx={{
//                         "& .MuiDataGrid-root": {
//                           border: "none",
//                         },
//                         "& .MuiDataGrid-cell": {
//                           borderBottom: "none",
//                         },
//                         "& .name-column--cell": {
//                           color: colors.greenAccent[300],
//                         },
//                         "& .MuiDataGrid-columnHeaders": {
//                           backgroundColor: colors.blueAccent[800],
//                           borderBottom: "none",
//                         },
//                         "& .MuiDataGrid-virtualScroller": {
//                           backgroundColor: colors.primary[400],
//                         },
//                         "& .MuiDataGrid-footerContainer": {
//                           borderTop: "none",
//                           backgroundColor: colors.blueAccent[800],
//                         },
//                         "& .MuiCheckbox-root": {
//                           color: `${colors.greenAccent[200]} !important`,
//                         },
//                         "& .odd-row": {
//                           backgroundColor: "",
//                           color: "",
//                         },
//                         "& .even-row": {
//                           backgroundColor: "#d0edec",
//                           color: "",
//                         },
//                       }}
//                     >
//                       <DataGrid
//                         sx={{
//                           "& .MuiDataGrid-footerContainer": {
//                             height: dataGridHeaderFooterHeight,
//                             minHeight: dataGridHeaderFooterHeight,
//                           },
//                         }}
//                         rowHeight={dataGridRowHeight}
//                         headerHeight={dataGridHeaderFooterHeight}
//                         rows={rows}
//                         columns={TTColumns}
//                         editMode="row"
//                         disableSelectionOnClick
//                         rowModesModel={rowModesModel}
//                         onRowModesModelChange={handleRowModesModelChange}
//                         onRowEditStop={handleRowEditStop}
//                         processRowUpdate={processRowUpdate}
//                         getRowId={(row) => row.id}
//                         disableRowSelectionOnClick
//                         experimentalFeatures={{ newEditingApi: true }}
//                         onProcessRowUpdateError={(error) => {
//                           console.error(
//                             "Row update validation failed:",
//                             error.message,
//                           );

//                           toast.error(error.message);
//                         }}
//                         components={{
//                           Toolbar: EditToolbar,
//                         }}
//                         componentsProps={{
//                           toolbar: { setRows, setRowModesModel },
//                         }}
//                         rowsPerPageOptions={[5, 10, 20]}
//                         getRowClassName={(params) =>
//                           params.indexRelativeToCurrentPage % 2 === 0
//                             ? "odd-row"
//                             : "even-row"
//                         }
//                         pagination
//                         pageSize={pageSize}
//                         page={page}
//                         onPageSizeChange={(newPageSize) =>
//                           setPageSize(newPageSize)
//                         }
//                         onPageChange={(newPage) => setPage(newPage)}
//                       />
//                     </Box>
//                   </Paper>

//                   {/* ━━━ RIGHT SIDE : RULES ━━━ */}
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       border: '1px solid #ecf0f1',
//                       borderRadius: 2,
//                       p: 3,
//                       height: "95%",
//                     }}
//                   >
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                       <Box
//                         sx={{
//                           width: 8,
//                           height: 8,
//                           borderRadius: '50%',
//                           backgroundColor: '#27ae60',
//                           mr: 1.5,
//                         }}
//                       />
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 700,
//                           color: '#2c3e50',
//                         }}
//                       >
//                         Generation Rules
//                       </Typography>
//                     </Box>

//                     <Stack spacing={1}>

//                       {/* Rule 1 */}
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'flex-start',
//                           pb: 1,
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               fontWeight: 600,
//                               color: '#2c3e50',
//                             }}
//                           >
//                             No consecutive same subject
//                           </Typography>

//                           <Typography
//                             variant="caption"
//                             sx={{
//                               color: '#7f8c8d',
//                               display: 'block',
//                               mt: 0.5,
//                             }}
//                           >
//                             Avoid placing the same subject back-to-back
//                           </Typography>
//                         </Box>

//                         <Switch
//                           checked={rules.noConsecutiveSameSubject}
//                           onChange={() =>
//                             handleRuleChange('noConsecutiveSameSubject')
//                           }
//                         />
//                       </Box>

//                       <Divider />

//                       {/* Rule 2 */}
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'flex-start',
//                           py: 2,
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               fontWeight: 600,
//                               color: '#2c3e50',
//                             }}
//                           >
//                             Distribute evenly across week
//                           </Typography>

//                           <Typography
//                             variant="caption"
//                             sx={{
//                               color: '#7f8c8d',
//                               display: 'block',
//                               mt: 0.5,
//                             }}
//                           >
//                             Spread periods uniformly
//                           </Typography>
//                         </Box>

//                         <Switch
//                           checked={rules.distributeEvenly}
//                           onChange={() =>
//                             handleRuleChange('distributeEvenly')
//                           }
//                         />
//                       </Box>

//                       <Divider />

//                       {/* Rule 3 */}
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'flex-start',
//                           pt: 2,
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               fontWeight: 600,
//                               color: '#2c3e50',
//                             }}
//                           >
//                             Max periods per teacher per day
//                           </Typography>

//                           <Typography
//                             variant="caption"
//                             sx={{
//                               color: '#7f8c8d',
//                               display: 'block',
//                               mt: 0.5,
//                             }}
//                           >
//                             Limit teacher workload per day
//                           </Typography>
//                         </Box>

//                         <TextField
//                           type="number"
//                           value={rules.maxPeriodsPerTeacher}
//                           onChange={(e) =>
//                             setRules((prev) => ({
//                               ...prev,
//                               maxPeriodsPerTeacher: parseInt(e.target.value),
//                             }))
//                           }
//                           variant="standard"
//                           size="small"
//                           inputProps={{
//                             min: 1,
//                             max: 10,
//                             style: { textAlign: "right" },
//                           }}
//                           sx={{ width: 80 }}
//                         />
//                       </Box>

//                     </Stack>
//                   </Paper>

//                 </Box>

//                 {/* Action Buttons */}
//                 <Box
//                   sx={{
//                     gridColumn: "span 4",
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 2,
//                     mt: 2,
//                     mb: 2,
//                   }}
//                 >
//                   <LoadingButton
//                     variant="contained"
//                     loading={isGenerating}
//                     loadingPosition="start"
//                     onClick={() => handleGenerateTimetable(values)}
//                     sx={{
//                       backgroundColor: '#27ae60',
//                       '&:hover': { backgroundColor: '#229954' },
//                       textTransform: 'none',
//                       fontWeight: 600,
//                     }}
//                   >
//                     GENERATE
//                   </LoadingButton>
//                   <Button
//                     color="warning"
//                     variant="contained"
//                     startIcon={<ArrowBackIcon />}
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </Button>

//                 </Box>
//               </Box>

//               {/* Generated Timetable Grid */}
//               {/* {isGenerating == true && ( */}
//               <Box sx={{
//                 height: 400, width: "100%", padding: 3, mt: -4,
//                 "& .MuiDataGrid-root": { border: "1px solid #e8e8f0", borderRadius: "8px", overflow: "hidden" },
//                 "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1e1e3a", color: "#c8d0ea", borderBottom: "none" },
//                 "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 500, fontSize: "11px", color: "#c8d0ea" },
//                 "& .MuiDataGrid-columnHeader": { borderRight: "1px solid #2e2e50" },
//                 "& .MuiDataGrid-columnHeader:last-of-type": { borderRight: "none" },
//                 "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": { color: "#8890b8" },
//                 "& .MuiDataGrid-columnSeparator": { display: "none" },
//                 "& .MuiDataGrid-cell": {
//                   borderRight: "0.5px solid #ebebf2", borderBottom: "0.5px solid #ebebf2",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   overflow: "visible !important",
//                 },
//                 "& .MuiDataGrid-cell:last-of-type": { borderRight: "none" },
//                 "& .MuiDataGrid-virtualScroller": { backgroundColor: "#ffffff" },
//                 "& .odd-row": { backgroundColor: "#f8f8fc", color: "#2d2d4a" },
//                 "& .even-row": { backgroundColor: "#ffffff", color: "#2d2d4a" },
//                 "& .odd-row:hover": { backgroundColor: "#eff0fa !important" },
//                 "& .even-row:hover": { backgroundColor: "#eff0fa !important" },
//                 "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
//                   backgroundColor: "#f0f0f8", fontWeight: 500, color: "#1e1e3a", borderRight: "2px solid #d0d0e8",
//                 },
//               }}>
//                 <DataGrid
//                   rows={getWCrows || WCrows}
//                   // columns={getrawColumns || rawColumns}
//                   //  rows={mode == "E" ? getWCrows : WCrows}
//                   columns={gridColumns || []}
//                   // loading={WEEKloading}
//                   pageSizeOptions={[5]}
//                   getRowId={(row) => row.id}
//                   hideFooter
//                   disableRowSelectionOnClick
//                   rowHeight={60}
//                   getRowClassName={(params) =>
//                     params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
//                   }
//                 />
//                 {/* Intervals / Break slots */}

//               </Box>
//               {/* )} */}
//               <Box
//                 sx={{
//                   mt: 2,
//                   pt: 2,
//                   px: 3,
//                   borderTop: "1px solid #eaeaf2",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   gap: 2,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 {/* Left Side - Break Slots */}
//                 {breakSlots.length > 0 && (
//                   <Box>
//                     <Typography
//                       sx={{
//                         fontWeight: 700,
//                         mb: 1.5,
//                         fontSize: "13px",
//                         color: "#444",
//                       }}
//                     >
//                       Intervals
//                     </Typography>

//                     <Box
//                       sx={{
//                         display: "flex",
//                         gap: 1.5,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       {breakSlots.map((slot, i) => (
//                         <Box
//                           key={i}
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             px: 2,
//                             py: 0.8,
//                             borderRadius: "20px",
//                             background: "#1e1e3a",
//                             marginBottom: 2,
//                           }}
//                         >
//                           <Typography
//                             sx={{
//                               fontSize: "12px",
//                               color: "#a8b2d8",
//                               fontWeight: 400,
//                             }}
//                           >
//                             {slot.SlotText}
//                           </Typography>

//                           <Typography
//                             sx={{
//                               fontSize: "13px",
//                               color: "#5a6080",
//                             }}
//                           >
//                             →
//                           </Typography>

//                           <Typography
//                             sx={{
//                               fontSize: "12px",
//                               color: "#dde2f5",
//                               fontWeight: 500,
//                             }}
//                           >
//                             {slot.SlotName}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}

//                 {/* Right Side - PDF Icon */}
//                 {/* {timetableGenerated  && ( */}
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <PDFDownloadLink
//                     document={
//                       <ProjectTimeTablePDF
//                         rows={getWCrows || WCrows}
//                         columns={gridColumns || []}
//                         breakSlots={breakSlots}
//                         footerHeight={footerHeight}
//                         projectName={rowData.projectName}
//                         termName={rowData.TermName}
//                         filters={{
//                           Imageurl: baseurlUAAM,
//                           HeaderImg,
//                           FooterImg,
//                         }}
//                       />
//                     }
//                     fileName={`Timetable_${rowData.projectName || "report"}.pdf`}
//                     style={{ color: "#d32f2f", cursor: "pointer" }}
//                   >
//                     {({ loading }) =>
//                       loading ? (
//                         <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
//                       ) : (
//                         <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                       )
//                     }
//                   </PDFDownloadLink>
//                 </Box>
//              {/* )}  */}
//               </Box>
//               {/* {breakSlots.length > 0 && (
//                 <Box sx={{ mt: 2, borderTop: "1px solid #eaeaf2", pt: 2, px: 3 }}>
//                   <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: "13px", color: "#444" }}>
//                     Intervals
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                     {breakSlots.map((slot, i) => (
//                       <Box key={i} sx={{
//                         display: "flex", alignItems: "center", gap: 1,
//                         px: 2, py: 0.8, borderRadius: "20px", background: "#1e1e3a", marginBottom: 2
//                       }}>
//                         <Typography sx={{ fontSize: "12px", color: "#a8b2d8", fontWeight: 400 }}>
//                           {slot.SlotText}
//                         </Typography>
//                         <Typography sx={{ fontSize: "13px", color: "#5a6080" }}>→</Typography>
//                         <Typography sx={{ fontSize: "12px", color: "#dde2f5", fontWeight: 500 }}>
//                           {slot.SlotName}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//               <PDFDownloadLink
//                 document={
//                   <ProjectTimeTablePDF
//                     rows={getWCrows || WCrows}
//                     columns={gridColumns || []}
//                     breakSlots={breakSlots}
//                     footerHeight={footerHeight}
//                     projectName={rowData.projectName} termName={rowData.TermName}
//                     filters={{ Imageurl: baseurlUAAM, HeaderImg, FooterImg }}
//                   />
//                 }
//                 fileName={`Timetable_${rowData.projectName || "report"}.pdf`}
//                 style={{ color: "#d32f2f", cursor: "pointer" }}
//               >
//                 {({ loading }) =>
//                   loading ? <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
//                     : <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                 }
//               </PDFDownloadLink> */}
//             </form>
//           )}
//         </Formik>
//       </Paper>
//       <Popover
//         open={popoverOpen}
//         anchorEl={anchorEl}
//         onClose={closeEdit}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "left" }}
//         PaperProps={{
//           elevation: 4,
//           sx: { borderRadius: "10px", border: "0.5px solid #e2e2e8", p: 2, minWidth: 300, maxWidth: 360 },
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//           <Typography
//             sx={{
//               fontWeight: 600,
//               fontSize: "13px",
//               color: "#1e1e3a",
//             }}
//           >
//             {activeMeta?.dayName
//               ? `Edit — ${activeMeta.dayName} · ${activeMeta.timeString}`
//               : "Edit Cell"}
//           </Typography>
//           <IconButton size="small" onClick={closeEdit}>
//             <CancelIcon sx={{ fontSize: 16, color: "#999" }} />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb: 1.5 }} />

//         <CheckinAutocomplete
//           name="Subject" label="Subject" id="Subject"
//           value={draft.subject}
//           onChange={handleSubjectChange}
//           url={subjectUrl}
//         />

//         <CheckinAutocomplete
//           sx={{ mt: 1 }}
//           name="Teacher" label="Teacher" id="Teacher"
//           value={draft.teacher}
//           onChange={handleTeacherChange}
//           url={teacherUrl}
//         />

//         <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}>
//           <Button size="small" variant="outlined" onClick={closeEdit} disabled={saveLoading}
//             sx={{ fontSize: "11px", textTransform: "none", borderRadius: "6px" }}>
//             Cancel
//           </Button>
//           <Button
//             size="small" variant="contained" disabled={saveLoading}
//             startIcon={saveLoading ? <CircularProgress size={12} color="inherit" /> : <SaveIcon />}
//             onClick={handleSave}
//             sx={{
//               fontSize: "11px", textTransform: "none", borderRadius: "6px",
//               background: "#1e1e3a", "&:hover": { background: "#2e2e5a" },
//             }}
//           >
//             {saveLoading ? "Saving..." : "Save"}
//           </Button>
//         </Box>
//       </Popover>
//     </React.Fragment>
//   );
// };

// export default EditTimetablev1;

