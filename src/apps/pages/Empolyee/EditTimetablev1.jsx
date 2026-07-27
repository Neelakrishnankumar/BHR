
import {
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Popover,
  Breadcrumbs,
  LinearProgress,
  Paper,
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
import WarningIcon from "@mui/icons-material/Warning";
import {
  GridActionsCellItem,
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
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
  TimeTableGenerateget,
  clearData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material";
import { breadcrumbStyles, tokens } from "../../../Theme";
import {
  CheckinAutocomplete,
  SprintEmpAutocomplete1,
} from "../../../ui-components/global/Autocomplete";
import {
  dataGridHeaderFooterHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import * as Yup from "yup";
import { getConfig } from "../../../config";

const cellKey = (rowId, colField) => `${rowId}__${colField}`;

const EditTimetablev1 = () => {
  const config = getConfig();
  const baseurl1 = config.BASE_URL;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params,"params")
  const dispatch = useDispatch();
  const recID = params.id;
  const compID = sessionStorage.getItem("compID");
  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");
  const baseurlUAAM = config.UAAM_URL;
  const mode = params.Mode;
 const paramTotalSlots = params.TotalWeekSlots;
  const data = useSelector((state) => state.formApi.Data);
  const [footerHeight, setFooterHeight] = useState(60);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);

  const YearFlag = sessionStorage.getItem("YearFlag");
  const EMPID = sessionStorage.getItem("EmpId");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const rowData = location.state || {};
  console.log(rowData,"state")

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const is003Subscription = SubscriptionCode.endsWith("003");
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  const UserName = sessionStorage.getItem("UserName");
  const sliceSubscriptionCode = SubscriptionCode.slice(-3);
  const getRawData = sessionStorage.getItem("ClassificationData");

  const [cellEdits, setCellEdits] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [draft, setDraft] = useState({ subject: null, teacher: null });
  const [saveLoading, setSaveLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // ── ref to block RemainingSlot useEffect from overwriting local edits ──────
  const userEditedPeriodsRef = useRef(false);

  let ClassificationData = [];
  try {
    const parsed = JSON.parse(getRawData || "[]");
    ClassificationData =
      typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  } catch (e) {
    console.error("ClassificationData parse failed:", getRawData);
    ClassificationData = [];
  }

  const HeaderID = rowData.HeaderID || 0;
  const ProjectID = rowData.projectID || 0;
  const TermsID = rowData.TermsID || 0;
  const GroupID = rowData.GroupID || 0;
  const Isprocess = rowData.isprocess || "N";

  const classids = ClassificationData.filter((item) =>
    ["Board Of Directors", "Teaching Staff"].includes(item.CfcName)
  ).map((item) => item.CfcID);

  const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");
  const filteredClassification = ClassificationData.filter(
    (item) => item.CfcName !== "Student"
  );
  const classificationIDs = filteredClassification.map((item) => item.CfcID);
  const classificationIDString = classificationIDs
    .map((id) => `'${id}'`)
    .join(",");

  const [showImage, setShowImage] = useState(
    params.Mode == "IM" ? true : false
  );
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);

  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ name: "", periods: "" });
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  const [rules, setRules] = useState({
    noConsecutiveSameSubject: true,
    distributeEvenly: true,
    maxPeriodsPerTeacher: 3,
  });

  // ── 1. Validation JSON fetch ─────────────────────────────────────────────
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        const schema = Yup.object().shape({
          Terms: Yup.object().required(data.Timetable.Terms).nullable(),
          Slotgroup: Yup.object()
            .required(data.Timetable.Slotgroup)
            .nullable(),
        });
        setValidationSchema(schema);
      })
      .catch((err) =>
        console.error("Error loading validationcms.json:", err)
      );
  }, []);

  // ── 2. Sync rules from API response ─────────────────────────────────────
  useEffect(() => {
    if (data?.Rules) {
      setRules({
        noConsecutiveSameSubject: data.Rules.NoConsecutiveSameSubject ?? true,
        distributeEvenly: data.Rules.DistributeEvenly ?? true,
        maxPeriodsPerTeacher: data.MaxPeriodsPerDayPerTeacher ?? 3,
      });
    }
  }, [data?.Rules, data?.MaxPeriodsPerDayPerTeacher]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const calendarData = useSelector((s) => s.formApi.Data);
  const slotIDMap = calendarData?.TimetableView?.slotID || {};
  const rawTimeSlots = calendarData?.TimetableView?.timeSlots || [];
  const rawSchedule = calendarData?.TimetableView?.schedule || [];

  // ── detailIDMap ──────────────────────────────────────────────────────────
  const detailIDMap = useMemo(() => {
    const details = calendarData?.Detail || [];
    if (!details.length || !rawTimeSlots.length || !rawSchedule.length) {
      return {};
    }

    const slotIDToIndex = {};
    Object.entries(slotIDMap).forEach(([timeSlot, slotId]) => {
      const idx = rawTimeSlots.indexOf(timeSlot);
      if (idx !== -1) {
        slotIDToIndex[Number(slotId)] = idx;
      }
    });

    const map = {};
    details.forEach((item) => {
      const rowIndex = rawSchedule.findIndex((d) => d.day === item.Day);
      const slotIndex = slotIDToIndex[Number(item.SlotID)];

      if (rowIndex !== -1 && slotIndex !== undefined) {
        const key = cellKey(rowIndex, `slot_${slotIndex}`);
        map[key] = {
          DetailID: Number(item.DetailID),
          subject: {
            RecordID: item.DepartmentID,
            Name: item.DepartmentName,
            label: item.DepartmentName,
          },
          teacher: {
            RecordID: item.EmployeeID,
            Name: item.EmployeeName,
            label: item.EmployeeName,
          },
        };
      }
    });

    return map;
  }, [calendarData?.Detail, rawTimeSlots, rawSchedule, slotIDMap]);

  // ── Grid columns/rows derived from API ──────────────────────────────────
  const getrawColumns =
    rawTimeSlots.length > 0
      ? [
        {
          field: "day",
          headerName: "Day",
          width: 110,
          sortable: false,
          headerAlign: "center",
          align: "center",
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
            if (!val)
              return (
                <span style={{ color: "#ccc", textAlign: "center" }}>
                  —
                </span>
              );
            return (
              <span
                style={{
                  background: "#27ae60",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {val}
              </span>
            );
          },
        })),
      ]
      : [];

  const getWCrows = rawSchedule.map((dayObj, index) => {
    const row = { id: index, day: dayObj.day };
    rawTimeSlots.forEach((slot, i) => {
      // row[`slot_${i}`] = dayObj.slots?.[slot] || "";
      row[`slot_${i}`] = dayObj.slots?.[slot] || "";
    });
    return row;
  });

  const WCrows = useSelector((s) => s.formApi.AutogeneraterowData);
  const timetableGenerated =
    (getWCrows?.length || 0) > 0 || (WCrows?.length || 0) > 0;
  const rawColumns = useSelector((s) => s.formApi.AutogeneratecolumnData);
  const breakSlots = Array.isArray(calendarData?.TimetableView?.BreakSlots)
    ? calendarData?.TimetableView?.BreakSlots
    : [];

  // ── 3. Footer image height calculation ──────────────────────────────────
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

  // ── 4. Initial GET fetch ─────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "A") {
      dispatch(getFetchData({ accessID: "TR368v1", get: "get", recID }));
    } else {
      dispatch(clearData());
    }
  }, []);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const assigneddDate = `${yyyy}-${mm}-${dd}`;
  const EmpName = sessionStorage.getItem("EmpName");
  const popoverOpen = Boolean(anchorEl);

  // ── State declarations ───────────────────────────────────────────────────
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const rowsRef = useRef(rows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedTermsID, setSelectedTermsID] = useState(
    data?.TermsID ? data.TermsID : 0
  );
  const [termsIDPass, setTermsIDPas] = useState(
    data?.SlotGroupID ? data?.SlotGroupID : 0
  );
  // const [totalWeekSlots, setTotalWeekSlots] = useState(0);
  const [totalWeekSlots, setTotalWeekSlots] = useState(
  () => Number(paramTotalSlots) || 0
);
  const [totalBalSlots, setTotalBalSlots] = useState(0);
  console.log("🚀 ~ EditTimetablev1 ~ totalBalSlots:", totalBalSlots)
  const [formDescription, setFormDescription] = useState(
    data?.Description ? data?.Description : ""
  );
  const [duplicateRows, setDuplicateRows] = useState(new Set());

  // ── Keep rowsRef in sync ─────────────────────────────────────────────────
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  // In Edit/View mode, lock form fields once subjects are loaded from API.
  // In Add mode, never lock.
  const hasRows = mode !== "A" && rows.length > 0;

  // ── 5. Subjects sync from API ────────────────────────────────────────────
  useEffect(() => {
    if (
      data?.Subjects &&
      Array.isArray(data.Subjects) &&
      data.Subjects.length > 0
    ) {
      const formattedSubjects = data.Subjects.map((subject, index) => ({
        id: `${subject.DepartmentID}_${index}`,
        RecordID: subject.SlNo || index + 1,
        DepartmentID: subject.DepartmentID,
        Department: {
          RecordID: subject.DepartmentID,
          Name: subject.DepartmentName,
        },
        periods: subject.Periods || 0,
        isNew: false,
      }));
      setRows(formattedSubjects);

      // Reset the guard so API values are accepted on fresh load/generate
      userEditedPeriodsRef.current = false;

      const totalUsed = formattedSubjects.reduce(
        (sum, r) => sum + Number(r.periods || 0),
        0
      );
      const maxSlots = Number(data?.TotalWeekSlots || totalWeekSlots || 0);
      setTotalBalSlots(maxSlots - totalUsed);
    } else if (
      mode === "A" &&
      (!data?.Subjects || data.Subjects.length === 0)
    ) {
      setRows([]);
      userEditedPeriodsRef.current = false;
      setTotalBalSlots(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.Subjects), data?.TotalWeekSlots]);

  // ── 6. Sync totalWeekSlots from API ─────────────────────────────────────
  // useEffect(() => {
  //   if (data?.TotalWeekSlots) {
  //     setTotalWeekSlots(data.TotalWeekSlots);
  //   }
  // }, [data?.TotalWeekSlots]);
  // ── 6. Sync totalWeekSlots from API ─────────────────────────────────────
useEffect(() => {
  if (data?.TotalWeekSlots) {
    setTotalWeekSlots(data.TotalWeekSlots);
  } else if (paramTotalSlots) {
    setTotalWeekSlots(Number(paramTotalSlots));
  }
}, [data?.TotalWeekSlots, paramTotalSlots]);

  // ── 7. Sync totalBalSlots from API ──────────────────────────────────────
  // ONLY accept API value if user hasn't made local period edits yet.
  // This prevents the useEffect from overwriting locally-computed balance
  // after the user adds/edits a row post-generate.
  useEffect(() => {
    if (
      data?.RemainingSlot !== undefined &&
      data?.RemainingSlot !== null &&
      !userEditedPeriodsRef.current
    ) {
      setTotalBalSlots(data.RemainingSlot);
    }
  }, [data?.RemainingSlot]);

  // ── Grid columns for timetable view ─────────────────────────────────────
  // const WEEKcolumns = (getrawColumns || rawColumns).map((col) => ({
  //   ...col,
  //   renderCell: (params) =>
  //     params.value ? (
  //       <Box
  //         sx={{
  //           display: "inline-flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           backgroundColor: "#f0f2ff",
  //           color: "#3a3a6e",
  //           borderRadius: "6px",
  //           px: 1.2,
  //           py: 0.4,
  //           fontSize: "11px",
  //           fontWeight: 500,
  //           whiteSpace: "normal",
  //           textAlign: "center",
  //           lineHeight: 1.4,
  //         }}
  //       >
  //         {params.value}
  //       </Box>
  //     ) : null,
  // }));
  const WEEKcolumns = (getrawColumns || rawColumns).map((col, index) => ({
    ...col,

    ...(index === 0
      ? {
        width: 140, // Fixed width for Day column
        flex: undefined,
      }
      : {
        width: undefined, // Remove any existing fixed width
        flex: 1,          // Share remaining space equally
        minWidth: 220,    // Optional
      }),

    renderCell: (params) =>
      params.value ? (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f2ff",
            color: "#3a3a6e",
            borderRadius: "6px",
            px: 1.2,
            py: 0.4,
            fontSize: "11px",
            fontWeight: 500,
            whiteSpace: "normal",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {/* {params.value} */}
          {typeof params.value === "object"
            ? params.value?.subject
            : params.value}
        </Box>
      ) : null,
  }));
  // const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {
  //   if (colIndex === 0) {
  //     return {
  //       ...col,
  //       renderCell: (params) => (
  //         <Box sx={{ fontWeight: 500, color: "#1e1e3a", fontSize: "12px" }}>
  //           {params.value || ""}
  //         </Box>
  //       ),
  //     };
  //   }

  //   return {
  //     ...col,
  //     renderCell: (params) => {
  //       const key = cellKey(params.row.id, col.field);
  //       const edit = detailIDMap[key];
  //       const rawValue = params.value;
  //       const dayField = WEEKcolumns[0]?.field;
  //       const dayName = params.row[dayField] || "";
  //       const period = col.field;

  const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {
    if (colIndex === 0) {
      return {
        ...col,
        width: 140, // fixed Day column
        renderCell: (params) => (
          <Box sx={{ fontWeight: 500, color: "#1e1e3a", fontSize: "12px" }}>
            {params.value || ""}
          </Box>
        ),
      };
    }

    return {
      ...col,
      width: undefined,
      flex: 1,
      minWidth: 220,

      renderCell: (params) => {
        const key = cellKey(params.row.id, col.field);
        const edit = detailIDMap[key];
        const rawValue = params.value || null;
        const dayField = WEEKcolumns[0]?.field;
        const dayName = params.row[dayField] || "";
        const period = col.field;
        const subject =
          typeof rawValue === "object"
            ? rawValue?.subject
            : rawValue;

        const teacher =
          typeof rawValue === "object"
            ? rawValue?.teacher
            : null;


        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              justifyContent: "center",
              px: 0.5,
              "&:hover .cell-edit-btn": { opacity: 1 },
            }}
          >
            <Tooltip
              title={
                Isprocess === "Y" ? "Processed — cannot edit" : "Edit cell"
              }
            >
              <span>
                <IconButton
                  size="small"
                  className="cell-edit-btn"
                  disabled={Isprocess === "Y"}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(e, params.row.id, col.field, dayName, period);
                  }}
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    opacity: 0,
                    transition: "opacity .15s",
                    backgroundColor: "#f0f0f8",
                    border: "0.5px solid #d0d0e8",
                    borderRadius: "4px",
                    zIndex: 1,
                    "&:hover": {
                      backgroundColor: "#e0e0f0",
                      opacity: "1 !important",
                    },
                  }}
                >
                  <EditIcon sx={{ fontSize: 10, color: "#5a5a8a" }} />
                </IconButton>
              </span>
            </Tooltip>

            {/* {edit?.subject && (
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
                {edit?.subject?.label ||
                  edit?.subject?.Name ||
                  edit?.subject ||
                  ""}
              </Box>
            )} */}

            {/* {!edit?.subject && rawValue && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f2ff",
                  color: "#3a3a6e",
                  borderRadius: "6px",
                  px: 1.2,
                  py: 0.3,
                  fontSize: "12px",
                  fontWeight: 500,
                  whiteSpace: "normal",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {rawValue}
              </Box>
            )} */}
            {edit?.subject && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: "#f0f2ff",
                  color: "#3a3a6e",
                  borderRadius: "6px",
                  px: 1,
                  py: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {edit.subject?.label || edit.subject?.Name}
                </Typography>

                {edit.teacher && (
                  <Typography
                    sx={{
                      fontSize: "10px",
                      color: "#6b7280",
                      lineHeight: 1.1,
                    }}
                  >
                    {edit.teacher?.label || edit.teacher?.Name}
                  </Typography>
                )}
              </Box>
            )}
            {!edit?.subject && !edit?.teacher && !rawValue && (
              <Typography
                sx={{ fontSize: "10px", color: "#ccc", fontStyle: "italic" }}
              >
                —
              </Typography>
            )}
          </Box>
        );
      },
    };
  });

  // ── Handlers ─────────────────────────────────────────────────────────────
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
        if (props === "Logout") navigate("/");
        if (props === "Close") navigate(-1);
      }
    });
  };

  const handleDeleteSubject = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    const maxSlots = Number(totalWeekSlots || data?.TotalWeekSlots || 0);
    if (updatedRows.length === 0) {
      setTotalBalSlots(0);
    } else {
      const totalUsedPeriods = updatedRows.reduce(
        (sum, row) => sum + Number(row.periods || 0),
        0
      );
      setTotalBalSlots(maxSlots - totalUsedPeriods);
    }
  };

  const handleRuleChange = (rule) => {
    setRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
  };

  const handleGenerateTimetable = async (values) => {
    setIsGenerating(true);
    // Reset the guard so the new RemainingSlot from generate is accepted
    userEditedPeriodsRef.current = false;

    try {
      const payload = {
        action: "autogenerate",
        data: {
          CompanyID: compID?.toString(),
          ProjectID: rowData.projectID?.toString() || "0",
          TermsID: values.Terms?.RecordID?.toString() || "0",
          SlotGroupID: values.Slotgroup?.RecordID?.toString() || "0",
          Description: values.description || "",
          TotalWeekSlots: totalWeekSlots ? totalWeekSlots : data?.TotalWeekSlots,
          RemainingSlot: totalBalSlots !== null && totalBalSlots !== undefined
            ? totalBalSlots
            : data?.RemainingSlot,
          Subjects: rows.map((s) => ({
            DepartmentID:
              s.DepartmentID?.toString() ||
              s.Department?.RecordID?.toString() ||
              "0",
            Periods: Number(s.periods || 0),
          })),
          MaxPeriodsPerDayPerTeacher: Number(rules.maxPeriodsPerTeacher) || 0,
          Rules: {
            NoConsecutiveSameSubject: rules.noConsecutiveSameSubject,
            DistributeEvenly: rules.distributeEvenly,
          },
        },
      };

      const response = await dispatch(TimeTableGenerateget(payload));
      const headerid = response?.payload?.HeaderID || recID;

      if (
        response?.payload?.Status === "Y" ||
        response?.payload?.Status === "P"
      ) {
        toast.success(response?.payload?.Msg);
        dispatch(
          getFetchData({ accessID: "TR368v1", get: "get", recID: headerid })
        );
      } else if (response?.payload?.Status == "N") {
        toast.error(response?.payload?.Msg);
        // Re-set guard since generate failed — no new API data coming
        userEditedPeriodsRef.current = true;
      }
    } catch (err) {
      console.error("Generation error:", err);
      toast.error("Error generating timetable");
      userEditedPeriodsRef.current = true;
    } finally {
      setIsGenerating(false);
    }
  };

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
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);

      const maxSlots = Number(totalWeekSlots || data?.TotalWeekSlots || 0);
      if (updatedRows.length === 0) {
        setTotalBalSlots(0);
      } else {
        const totalUsed = updatedRows.reduce(
          (sum, r) => sum + Number(r.periods || 0),
          0
        );
        setTotalBalSlots(maxSlots - totalUsed);
      }

      if (!RecordID || isNaN(Number(RecordID))) {
        toast.success("Deleted Successfully");
        return;
      }

      const response = await dispatch(
        postData({
          accessID: "TR368v1",
          action: "harddelete",
          idata: { DetailID: Number(RecordID), CompanyID: compID },
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

  const handleCancelClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.RecordID === RecordID);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.RecordID !== RecordID));
    }
  };

  // ── EditdeptAutocompleteCell ─────────────────────────────────────────────
  function EditdeptAutocompleteCell(props) {
    const { id, value, field, api, row } = props;
    const [deptlookup, setDeptlookup] = useState(
      row.Department ? row.Department : null
    );

    const handleChange = async (newValue) => {
      if (!newValue) return;
      const isDuplicate = rowsRef.current.some(
        (r) =>
          r.id !== id &&
          Number(r.Department?.RecordID) === Number(newValue.RecordID)
      );

      if (isDuplicate) {
        toast.error(`"${newValue.Name}" is already added.`);
        setDuplicateRows((prev) => new Set(prev).add(id));
      } else {
        setDuplicateRows((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }

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
        url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID} AND ProjectID=${ProjectID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""
          }"}}`}
      />
    );
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // ── Subjects DataGrid columns ────────────────────────────────────────────
  const TTColumns = [
    { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
    {
      field: "Department",
      headerName: (
        <span>
          Subject/Activity <span style={{ color: "red" }}>*</span>
        </span>
      ),
      headerAlign: "center",
      width: 150,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => params.value?.Name || "",
      renderEditCell: (params) => <EditdeptAutocompleteCell {...params} />,
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
          inputProps={{ min: 0, style: { textAlign: "right" } }}
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
              color="info"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="info"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteSubject(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  const isEditMode = mode !== "A";

  const TimeTableInitialValue = {
    class: `${rowData.projectName || ""}`,
    Terms:
      isEditMode && data?.TermsID
        ? { RecordID: data.TermsID, Name: data.TermsName || "" }
        : null,
    description: isEditMode ? data?.Description || "" : "",
    assignedPerson: UserName || "",
    Slotgroup:
      isEditMode && data?.SlotGroupID
        ? { RecordID: data.SlotGroupID, Name: data.SlotGroupName || "" }
        :{ RecordID: params.SlotID, Name: params.SlotName || "" } ,
    assignedDate: new Date().toISOString().split("T")[0],
  };

  const extractVal = (valOrEvent) =>
    valOrEvent?.target !== undefined ? valOrEvent.target.value : valOrEvent;

  const handleSubjectChange = (v) => {
    const newVal = extractVal(v);
    setDraft((prev) => ({ ...prev, subject: newVal, teacher: null }));
  };

  const handleTeacherChange = (v) => {
    setDraft((prev) => ({ ...prev, teacher: extractVal(v) }));
  };

  // ── EditToolbar ──────────────────────────────────────────────────────────
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const isAnyRowEditing = Object.values(rowModesModel).some(
        (item) => item.mode === GridRowModes.Edit
      );

      if (isAnyRowEditing) {
        toast.error(
          "Please save the current editing row before adding a new record."
        );
        return;
      }

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
          justifyContent: "space-between",
        }}
      >
        <Button
          color="primary"
          sx={{ textTransform: "none" }}
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add Subject/Activity
        </Button>
        <Button color="primary" sx={{ textTransform: "none" }}>
          Total Slots : {totalWeekSlots || data?.TotalWeekSlots || 0}
        </Button>
        <Button color="primary" sx={{ textTransform: "none" }}>
          Remaining Slots : {totalBalSlots ?? data?.RemainingSlot ?? 0}
        </Button>
      </GridToolbarContainer>
    );
  }

  // ── URLs ─────────────────────────────────────────────────────────────────
  const subjectUrl = `${listViewurl}?data=${encodeURIComponent(
    JSON.stringify({
      Query: {
        AccessID: "2149",
        ScreenName: "Subject",
        Filter: `parentID=${compID} AND ProjectID=${ProjectID}`,
        Any: "",
        VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
      },
    })
  )}`;

  const subjectId =
    draft.subject?.RecordID ?? draft.subject?.value ?? "0";

  const teacherUrl =
    subjectId && subjectId !== "0"
      ? `${listViewurl}?data=${encodeURIComponent(
        JSON.stringify({
          Query: {
            AccessID: "2175",
            ScreenName: "Teacher",
            Filter: `CompanyID='${compID}' AND DepartmentID=${subjectId}`,
            Any: "",
            VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
          },
        })
      )}`
      : null;

  // ── Popover open/close ───────────────────────────────────────────────────
  const openEdit = (event, rowId, colField, dayName, period) => {
    const slotIndex = period?.startsWith("slot_")
      ? parseInt(period.replace("slot_", ""))
      : -1;

    const timeString = slotIndex !== -1 ? rawTimeSlots[slotIndex] : period;
    const key = cellKey(rowId, period);

    const sessionEdit = cellEdits[key];
    const dbRecord = detailIDMap[key];

    let prefillSubject = null;
    let prefillTeacher = null;

    if (sessionEdit?.subject) {
      prefillSubject = sessionEdit.subject;
      prefillTeacher = sessionEdit.teacher ?? null;
    } else if (dbRecord) {
      prefillSubject = dbRecord.subject ?? null;
      prefillTeacher = dbRecord.teacher ?? null;
    }

    setDraft({ subject: prefillSubject, teacher: prefillTeacher });
    setActiveKey(key);
    setActiveMeta({ rowId, colField, dayName, period, timeString });
    setAnchorEl(event.currentTarget);
  };

  const closeEdit = () => {
    setAnchorEl(null);
    setActiveKey(null);
    setActiveMeta(null);
    setDraft({ subject: null, teacher: null });
  };

  // ── Fnsave ───────────────────────────────────────────────────────────────
  const Fnsave = async (draftValues, isExisting, storedDetailID) => {
    const action = isExisting ? "update" : "insert";
    const detailID = isExisting ? Number(storedDetailID) : -1;
    const slotIndex = activeMeta?.period?.startsWith("slot_")
      ? parseInt(activeMeta.period.replace("slot_", ""))
      : -1;
    const timeString = slotIndex !== -1 ? rawTimeSlots[slotIndex] : "";
    const slotID = slotIDMap[timeString] ?? 0;

    const idata = {
      CompanyID: compID?.toString(),
      HeaderID: recID,
      ProjectID: ProjectID?.toString() || "0",
      TermsID: mode == "E" ? TermsID?.toString() : selectedTermsID,
      SlotGroupID: mode == "E" ? GroupID?.toString() : termsIDPass,
      Assignedby: UserName || "",
      Description: rowData.Description || "",
      Detail: [
        {
          DepartmentID: (
            draftValues.subject?.RecordID ??
            draftValues.subject?.value ??
            "0"
          ).toString(),
          EmployeeID: (
            draftValues.teacher?.RecordID ??
            draftValues.teacher?.value ??
            "0"
          ).toString(),
          Day: activeMeta?.dayName || "",
          SlotID: slotID.toString(),
          Comments: draftValues.comments || "",
          DetailID: detailID,
        },
      ],
    };

    const response = await dispatch(
      postData({ accessID: "TR368v1", action, idata })
    );
    const returnedHeaderID = response?.payload?.HeaderID || recID;

    if (response?.payload?.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        getFetchData({
          accessID: "TR368v1",
          get: "get",
          recID: returnedHeaderID,
        })
      );
    } else if (
      response?.payload?.Status == "E" ||
      response?.payload?.Status == "N"
    ) {
      toast(response.payload.Msg, {
        icon: <WarningIcon style={{ color: "#f59e0b" }} />,
      });
      dispatch(
        getFetchData({
          accessID: "TR368v1",
          get: "get",
          recID: returnedHeaderID,
        })
      );
    } else {
      throw new Error(response?.payload?.Msg || "Save failed");
    }
  };

  const handleSave = async () => {
    if (!activeKey) return;
    if (!draft.subject) {
      toast.error("Please select a Subject/Activity");
      return;
    }
    if (!draft.teacher) {
      toast.error("Please select a Teacher");
      return;
    }

    setSaveLoading(true);
    try {
      const sessionDetailID = cellEdits[activeKey]?.DetailID;
      const dbDetailID = detailIDMap[activeKey]?.DetailID;
      const storedDetailID = sessionDetailID ?? dbDetailID ?? -1;
      const isExisting = Number(storedDetailID) > 0;

      await Fnsave(draft, isExisting, storedDetailID);

      // setCellEdits((prev) => ({
      //   ...prev,
      //   [activeKey]: {
      //     subject: draft.subject,
      //     teacher: draft.teacher,
      //     isExisting: true,
      //     DetailID:
      //       Number(storedDetailID) > 0 ? storedDetailID : dbDetailID ?? -1,
      //   },
      // }));

      closeEdit();
    } catch (err) {
      toast.error(err.message || "Save failed");
      closeEdit();
    } finally {
      setSaveLoading(false);
    }
  };

  const handleClear = () => {
    if (!activeKey) return;
    // setCellEdits((prev) => {
    //   const n = { ...prev };
    //   delete n[activeKey];
    //   return n;
    // });
    toast.success("Cell cleared");
    closeEdit();
  };

  // ── processRowUpdate ─────────────────────────────────────────────────────
  const processRowUpdate = (newRow) => {
    if (!newRow.Department?.RecordID) {
      toast.error("Please select a Subject/Activity before saving.");
    }

    if (
      newRow.periods === "" ||
      newRow.periods === 0 ||
      newRow.periods === null ||
      newRow.periods === undefined
    ) {
      toast.error("Periods/Week is mandatory.");
    }

    const currentRows = rowsRef.current;
    const maxSlots = Number(totalWeekSlots || data?.TotalWeekSlots || 0);

    const otherRowsTotal = currentRows
      .filter((row) => row.id !== newRow.id)
      .reduce((sum, row) => sum + Number(row.periods || 0), 0);

    const currentPeriods = Number(newRow.periods || 0);
    const finalTotal = otherRowsTotal + currentPeriods;

    if (finalTotal > maxSlots) {
      throw new Error(
        `Total Periods (${finalTotal}) cannot exceed Total Slots (${maxSlots})`
      );
    }

    const usedPeriods = otherRowsTotal + currentPeriods;
    const balslots = maxSlots - usedPeriods;

    // Mark that user has made local edits — blocks RemainingSlot useEffect
    // from overwriting this calculated value on next render
    userEditedPeriodsRef.current = true;
    setTotalBalSlots(balslots);

    const isDuplicate = currentRows.some(
      (row) =>
        row.id !== newRow.id &&
        Number(row.Department?.RecordID) ===
        Number(newRow.Department?.RecordID)
    );

    if (isDuplicate) {
      toast.error(
        `${newRow.Department?.Name} is already added. Choose a different subject.`
      );
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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}

      {/* Header */}
          <Box sx={{ height: "100vh", overflow: "auto" }}>
            <Box sx={{ p: 1, backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
              <Box sx={{ p: 1, borderRadius: 3 }}>
                <Paper sx={{ borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between"  p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#111827",
                                // mb: 0.2,
                                px: 1,
                                py: 0.2,
                              }}
                            >
                              {mode === "A"
                                ? `New Timetable`
                                : `Edit Timetable`}{" "}
                            </Typography>
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                                 sx={breadcrumbStyles.separator}
                               >
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    is003Subscription
                      ? navigate(`/Apps/SecondarylistView/TR275/Project/${params.YearID}`, { state: { ...rowData } })
                      : navigate("/Apps/TR133/Project");
                  }}
                >
                  List Of Classes ({rowData.BreadCrumb1 || ""})
                </Typography>
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => navigate(-1)}
                >
                  {mode == "A"
                    ? "List Of Time Table"
                    : `List Of Time Table (${rowData.BreadCrumb2})`}
                </Typography>
                <Typography
                  sx={breadcrumbStyles.active}
                  onClick={() => navigate(-1)}
                >
                  Timetable
                </Typography>
              </Breadcrumbs>
            </Box>
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

         </Box>
      {/* Main Content */}
       <Box
                     flex={1}
                     minWidth={0}
                     display="flex"
                     flexDirection="column"
                     gap={3}
                   >
                     <Paper
                       elevation={0}
                       sx={{
                         backgroundColor: "#fff",
                         border: "1px solid #E5E7EB",
                         borderRadius: 3,
                         p: 3,
                       }}
                     >
        <Formik
          initialValues={TimeTableInitialValue}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => { }}
          enableReinitialize={true}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            values,
            handleSubmit,
            setFieldValue,
            validateForm,
            setTouched,
          }) => (
            <form onSubmit={handleSubmit}>
                   {/* ----- CARD HEADER ----- */}
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        mb={0.5}
                                      >
                                        <Box
                                          sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: "50%",
                                            backgroundColor: "#EFF6FF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Typography sx={{ fontSize: 16 }}>📑</Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight={700}
                                            color="#0D94885"
                                          >
                                            Timetable
                                          </Typography>
              
                                          <Typography variant="body2" color="text.secondary">
                                            Overview of the project schedule and timeline
                                          </Typography>
                                        </Box>
                                      </Box>
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
                  variant="outlined"
                  size="small"
                  focused
                  disabled={hasRows}
                  value={values.class}
                  onBlur={handleBlur}
                  onChange={handleChange}
                     sx={{
                       gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                  inputProps={{ readOnly: true }}
                />

                <CheckinAutocomplete
                  sx={{ gridColumn: "span 2" }}
                  name="Terms"
                  label={
                    <>
                      Term
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
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
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                  variant="outlined"
                  size="small"
                  focused
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setFormDescription(e.target.value);
                  }}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  
                    sx={{
                       gridColumn: "span 2",
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                />

                <TextField
                  name="assignedDate"
                  type="date"
                  id="assignedDate"
                  label="Created Date"
                  variant="outlined"
                  size="small"
                  disabled={hasRows}
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.assignedDate}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{ readOnly: true }}
                    sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                              }}
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "2fr 2fr" },
                    gap: 2,
                    gridColumn: "span 4",
                    alignItems: "stretch",
                  }}
                >
                  {/* LEFT: Subjects DataGrid */}
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
                            "& .cell-negative-status": {
                              color: colors.redAccent[500],
                              fontWeight: 600,
                            },
                            "& .cell-positive-status": {
                              color: colors.greenAccent[400],
                              fontWeight: 600,
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              // backgroundColor: "#25adad",
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                              // borderColor: "#d0edec",
                              // backgroundColor: "",
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },
                            "& .odd-row": {
                              backgroundColor: "",
                              color: "", // Color for odd rows
                            },
                            "& .even-row": {
                              // backgroundColor: "#d0edec",
                              backgroundColor: "",
                              color: "", // Color for even rows
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
                            error.message
                          );
                          toast.error(error.message);
                        }}
                        components={{ Toolbar: EditToolbar }}
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

                  {/* RIGHT: Rules */}
                  <Paper
                    elevation={0}
                    sx={{
                      border: "1px solid #ecf0f1",
                      borderRadius: 2,
                      p: 3,
                      height: "95%",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 3 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#27ae60",
                          mr: 1.5,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#2c3e50" }}
                      >
                        Generation Rules
                      </Typography>
                    </Box>
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          pb: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#2c3e50" }}
                          >
                            No consecutive same subject/activity
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#7f8c8d",
                              display: "block",
                              mt: 0.5,
                            }}
                          >
                            Avoid placing the same subject back-to-back
                          </Typography>
                        </Box>
                        <Switch
                        color="success"
                          checked={rules.noConsecutiveSameSubject}
                          onChange={() =>
                            handleRuleChange("noConsecutiveSameSubject")
                          }
                        />
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          py: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#2c3e50" }}
                          >
                            Distribute evenly across week
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#7f8c8d",
                              display: "block",
                              mt: 0.5,
                            }}
                          >
                            Spread periods uniformly
                          </Typography>
                        </Box>
                        <Switch
                        color="success"
                          checked={rules.distributeEvenly}
                          onChange={() =>
                            handleRuleChange("distributeEvenly")
                          }
                        />
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          pt: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#2c3e50" }}
                          >
                            Max periods per teacher per day
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#7f8c8d",
                              display: "block",
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
                    loadingPosition="start"
                    disabled={mode == "V" || totalBalSlots !== 0}
                    onClick={async () => {
                      const validationErrors = await validateForm();
                      setTouched({ Terms: true, Slotgroup: true });
                      if (Object.keys(validationErrors).length > 0) return;
                      handleGenerateTimetable(values);
                    }}
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
                    Generate
                  </LoadingButton>
                  <Button
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
                      }}
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </Box>
              </Box>

              {/* Timetable Grid */}
              {timetableGenerated && (
                <>
                  <Box
                    sx={{
                      height: 400,
                      width: "100%",
                      padding: 3,
                      mt: -4,
                      "& .MuiDataGrid-root": {
                        border: "1px solid #e8e8f0",
                        borderRadius: "8px",
                        overflow: "hidden",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1e1e3a",
                        color: "#c8d0ea",
                        borderBottom: "none",
                      },
                      "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 500,
                        fontSize: "11px",
                        color: "#c8d0ea",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        borderRight: "1px solid #2e2e50",
                      },
                      "& .MuiDataGrid-columnHeader:last-of-type": {
                        borderRight: "none",
                      },
                      "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root":
                        { color: "#8890b8" },
                      "& .MuiDataGrid-columnSeparator": { display: "none" },
                      "& .MuiDataGrid-cell": {
                        borderRight: "0.5px solid #ebebf2",
                        borderBottom: "0.5px solid #ebebf2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "visible !important",
                      },
                      "& .MuiDataGrid-cell:last-of-type": {
                        borderRight: "none",
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#ffffff",
                      },
                      "& .odd-row": {
                        backgroundColor: "#f8f8fc",
                        color: "#2d2d4a",
                      },
                      "& .even-row": {
                        backgroundColor: "#ffffff",
                        color: "#2d2d4a",
                      },
                      "& .odd-row:hover": {
                        backgroundColor: "#eff0fa !important",
                      },
                      "& .even-row:hover": {
                        backgroundColor: "#eff0fa !important",
                      },
                      "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
                        backgroundColor: "#f0f0f8",
                        fontWeight: 500,
                        color: "#1e1e3a",
                        borderRight: "2px solid #d0d0e8",
                      },
                    }}
                  >
                    <DataGrid
                      rows={getWCrows || WCrows}
                      columns={gridColumns || []}
                      autosizeOnMount={false}
                      pageSizeOptions={[5]}
                      getRowId={(row) => row.id}
                      hideFooter
                      disableRowSelectionOnClick
                      rowHeight={60}
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "even-row"
                          : "odd-row"
                      }
                    />
                  </Box>

                  {/* Intervals + PDF */}
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
                          sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}
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
                                sx={{ fontSize: "13px", color: "#5a6080" }}
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
                        fileName={`Timetable_${rowData.projectName || "report"
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
                    </Box>
                  </Box>
                </>
              )}
            </form>
          )}
        </Formik>
      </Paper>
  </Box>
           
      {/* Popover */}
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={closeEdit}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: "10px",
            border: "0.5px solid #e2e2e8",
            p: 2,
            minWidth: 300,
            maxWidth: 360,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "13px", color: "#1e1e3a" }}
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
          name="Subject"
          label="Subject/Activity"
          id="Subject"
          value={draft.subject}
          onChange={handleSubjectChange}
          url={subjectUrl}
        />

        <CheckinAutocomplete
          key={subjectId}
          sx={{ mt: 1 }}
          name="Teacher"
          label="Teacher"
          id="Teacher"
          value={draft.teacher}
          onChange={handleTeacherChange}
          url={teacherUrl}
        />

        <Box
          sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={closeEdit}
            disabled={saveLoading}
            sx={{ fontSize: "11px", textTransform: "none", borderRadius: "6px" }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={saveLoading}
            startIcon={
              saveLoading ? (
                <CircularProgress size={12} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            onClick={handleSave}
            sx={{
              fontSize: "11px",
              textTransform: "none",
              borderRadius: "6px",
              background: "#1e1e3a",
              "&:hover": { background: "#2e2e5a" },
            }}
          >
            {saveLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Popover>
        </Box>
            </Box>
    </React.Fragment>
  );
};

export default EditTimetablev1;
