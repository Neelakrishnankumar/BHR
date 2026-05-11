import React, { useState, useEffect, useMemo } from "react";
import {
    Box,
    Button,
    Breadcrumbs,
    CircularProgress,
    Divider,
    IconButton,
    LinearProgress,
    Paper,
    Popover,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
import { postData } from "../../../store/reducers/Formapireducer";
import { tokens } from "../../../Theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
import { getConfig } from "../../../config";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";

const cellKey = (rowId, colField) => `${rowId}__${colField}`;

// ─── Component ───────────────────────────────────────────────────────────────
const ProjectTimeTable = () => {

    // ── Router / session ──────────────────────────────────────────────────────
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const rowData  = location.state || {};

    console.log(rowData, "--ProjectTimeTable rowData from state");

    // Fields from listview Link state
    const HeaderID  = rowData.HeaderID  || 0;  // RecordID from listview row
    const ProjectID = rowData.projectID || 0;  // StandardID
    const TermsID   = rowData.TermsID   || 0;  // TermID
    const GroupID   = rowData.GroupID   || 0;  // SlotGroupID
    const Isprocess = rowData.isprocess || "N";

    const compID    = sessionStorage.getItem("compID");
    const UserName  = sessionStorage.getItem("UserName");
    const HeaderImg = sessionStorage.getItem("CompanyHeader");
    const FooterImg = sessionStorage.getItem("CompanyFooter");

    const SubscriptionCode      = sessionStorage.getItem("SubscriptionCode") || "";
    const is003Subscription     = SubscriptionCode.endsWith("003");
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);

    const config      = getConfig();
    const baseurlUAAM = config.UAAM_URL;

    // ── Redux selectors ───────────────────────────────────────────────────────
    const listViewurl  = useSelector((s) => s.globalurl.listViewurl);
     const WCrows       = useSelector((s) => s.exploreApi.explorerowData);
    const calendarData = useSelector((s) => s.exploreApi.Data);
     const rawColumns   = useSelector((s) => s.exploreApi.explorecolumnData);
    const WEEKloading  = useSelector((s) => s.exploreApi.loading);

    const breakSlots = Array.isArray(calendarData?.BreakSlots)
        ? calendarData.BreakSlots : [];

    // ── slotID map from GET: { "9:00 AM - 9:45 AM": 1240, ... } ─────────────
    // colField (the time string) → SlotID (number)
    const slotIDMap = calendarData?.slotID || {};
const [footerHeight, setFooterHeight] = useState(60);
    const [isReady, setIsReady] = useState(false);
    // ── detailID map from GET ─────────────────────────────────────────────────
    // GET structure: { "Monday": { "1:30 PM - 2:10 PM": 1866, ... }, ... }
    // We convert this to cellKey format: { "rowId__timeSlot": DetailID }
    // so handleSave can resolve DetailID by cellKey directly.
    //
    // This runs every time calendarData or WCrows refreshes (after each save).
    const detailIDMap = useMemo(() => {
        const rawDetailID = calendarData?.detailID || {}; // { day: { slot: DetailID } }
        const dayField    = (rawColumns || [])[0]?.field; // first col = day label field
        const map         = {};

        Object.entries(rawDetailID).forEach(([dayName, slotMap]) => {
            // Find the WCrow whose day cell value matches this dayName
            const matchRow = (WCrows || []).find(
                (r) => r[dayField] === dayName
            );
            if (!matchRow) return;

            Object.entries(slotMap).forEach(([timeSlot, detailID]) => {
                if (detailID) {
                    // cellKey uses rowId (row.id) + colField (time string)
                    map[cellKey(matchRow.id, timeSlot)] = detailID;
                }
            });
        });

        console.log("detailIDMap built from GET detailID:", map);
        return map;
    }, [calendarData?.detailID, WCrows, rawColumns]);
    // ── Derive rows and columns directly from calendarData ────────────────────

    // ── Theme ─────────────────────────────────────────────────────────────────
    const theme       = useTheme();
    const colors      = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { toggleSidebar, broken, rtl } = useProSidebar();

    // ── Per-cell local state { [cellKey]: { subject, teacher, isExisting, DetailID } }
    const [cellEdits,  setCellEdits]  = useState({});

    // ── Popover state ─────────────────────────────────────────────────────────
    const [anchorEl,   setAnchorEl]   = useState(null);
    const [activeKey,  setActiveKey]  = useState(null);
    const [activeMeta, setActiveMeta] = useState(null);
    // { rowId, colField (= time string), dayName, period (= time string) }

    const [draft,       setDraft]       = useState({ subject: null, teacher: null });
    const [saveLoading, setSaveLoading] = useState(false);

    // ── Misc ──────────────────────────────────────────────────────────────────
    const [errorMsgData, setErrorMsgData] = useState(null);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => res.json())
            .then((data) => setErrorMsgData(data))
            .catch(() => {});
    }, []);
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
    // ── Initial GET ───────────────────────────────────────────────────────────
    useEffect(() => {
        dispatch(
            weeklyclasscaledarGet({
                ProjectID,
                HeaderID,
                TermID   : TermsID,
                CompanyID: compID,
                GroupID,
            })
        );
    }, []);

    // ── WEEKcolumns (chip renderCell for display layer) ───────────────────────
    const WEEKcolumns = (rawColumns || []).map((col) => ({
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

    // ── Autocomplete URLs ─────────────────────────────────────────────────────
    const subjectUrl = `${listViewurl}?data=${encodeURIComponent(JSON.stringify({
        Query: {
            AccessID: "2149", ScreenName: "Subject",
            Filter: `parentID=${compID}`, Any: "",
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
        const key      = cellKey(rowId, colField);
        const existing = cellEdits[key];  // local edits from this session

        // Pre-fill subject/teacher from schedule data when cell was already saved in DB
        // calendarData.schedule[day].slots[timeSlot] = subject name (string)
        // calendarData.detailID[day][timeSlot]       = DetailID (number)
        // We need RecordID+label objects — look them up from schedule + subjectMap
        // For now pre-fill from cellEdits (session) first, then fall back to schedule string
        let prefillSubject = existing?.subject ?? null;
        let prefillTeacher = existing?.teacher ?? null;

        // If no local edit but cell has DB data (detailIDMap has an entry),
        // pre-fill from calendarData.schedule so the user sees what's already assigned
        if (!existing && detailIDMap[key]) {
            const scheduleDay  = calendarData?.schedule?.find((s) => s.day === dayName);
            const subjectName  = scheduleDay?.slots?.[period] || "";
            // Pre-fill subject as label-only object so autocomplete shows it
            if (subjectName) {
                prefillSubject = { label: subjectName, Name: subjectName };
            }
            // Teacher pre-fill: calendarData.teacherMap?.[dayName]?.[period] if available
            // Otherwise leave null — user selects teacher again
            const teacherName = calendarData?.teacherMap?.[dayName]?.[period] || "";
            if (teacherName) {
                prefillTeacher = { label: teacherName, Name: teacherName };
            }
        }

        setDraft({ subject: prefillSubject, teacher: prefillTeacher });
        setActiveKey(key);
        setActiveMeta({ rowId, colField, dayName, period });
        setAnchorEl(event.currentTarget);
    };

    // ── Popover close ─────────────────────────────────────────────────────────
    const closeEdit = () => {
        setAnchorEl(null);
        setActiveKey(null);
        setActiveMeta(null);
        setDraft({ subject: null, teacher: null });
    };

    // ── Fnsave ────────────────────────────────────────────────────────────────
    /**
     * isExisting  true  → DetailID is a real DB id → action = "update"
     * isExisting  false → DetailID = -1             → action = "insert"
     *
     * SlotID  — from slotIDMap[period]  (period = the time string = colField)
     * DetailID — from detailIDMap[cellKey] (GET detailID object) OR
     *            from cellEdits[key].DetailID (set after first save this session)
     */
    const Fnsave = async (draftValues, isExisting, storedDetailID) => {
        const action   = isExisting ? "update" : "insert";
        const detailID = isExisting ? Number(storedDetailID) : -1;

        // SlotID: look up the time string (period = colField) in slotIDMap
        const slotID = slotIDMap[activeMeta?.period] ?? 0;

        console.log(
            "Fnsave →", action,
            "| SlotID:", slotID,
            "| DetailID:", detailID,
            "| Day:", activeMeta?.dayName,
            "| Period:", activeMeta?.period,
        );

        const idata = {
            CompanyID  : compID?.toString(),
            HeaderID   : HeaderID?.toString(),
            ProjectID  : ProjectID?.toString() || "0",
            TermsID    : TermsID?.toString()   || "0",
            SlotGroupID: GroupID?.toString()   || "0",
            Assignedby : UserName || "",
            Description: rowData.Description   || "",
            Detail: [{
                DepartmentID: (draftValues.subject?.RecordID ?? draftValues.subject?.value ?? "0").toString(),
                EmployeeID  : (draftValues.teacher?.RecordID ?? draftValues.teacher?.value ?? "0").toString(),
                Day         : activeMeta?.dayName || "",
                SlotID      : slotID.toString(),
                Comments    : draftValues.comments || "",
                DetailID    : detailID,
            }],
        };

        console.log(action, idata, "--ProjectTimeTable Fnsave idata");

        const response = await dispatch(
            postData({ accessID: "TR368v1", action, idata })
        );

        const returnedHeaderID = response?.payload?.HeaderID;

        // Refresh grid on both Y and E so detailIDMap rebuilds with latest DB state
        const refresh = (hid) => dispatch(weeklyclasscaledarGet({
            ProjectID, HeaderID: hid, TermID: TermsID, CompanyID: compID, GroupID,
        }));

        if (response?.payload?.Status == "Y") {
            toast.success(response.payload.Msg);
            if (returnedHeaderID) refresh(returnedHeaderID);
            return { success: true, returnedHeaderID };   //  only Y = success

        } else if (response?.payload?.Status == "E") {
            toast.error(response.payload.Msg);
            if (returnedHeaderID) refresh(returnedHeaderID);
            return { success: false, returnedHeaderID };  //  E = do NOT update cellEdits

        } else {
            throw new Error(response?.payload?.Msg || "Save failed");
        }
    };

    // ── handleSave ────────────────────────────────────────────────────────────
    /**
     * DetailID resolution priority (highest → lowest):
     *   1. cellEdits[key].DetailID  — saved earlier in this browser session
     *   2. detailIDMap[key]         — from the GET response's "detailID" object
     *   3. -1                       → never saved → insert
     *
     * isExisting = DetailID > 0  →  "update"
     * isExisting = false         →  "insert"
     */
    const handleSave = async () => {
        if (!activeKey) return;

        if (!draft.subject) { toast.error("Please select a Subject"); return; }
        if (!draft.teacher) { toast.error("Please select a Teacher");  return; }

        setSaveLoading(true);
        try {
            const sessionDetailID = cellEdits[activeKey]?.DetailID;   // from this session
            const getDetailID     = detailIDMap[activeKey];            // from GET response
            const storedDetailID  = sessionDetailID ?? getDetailID ?? -1;
            const isExisting      = storedDetailID > 0;               // >0 = real DB row

            console.log(
                "handleSave →",
                "key:", activeKey,
                "| sessionDetailID:", sessionDetailID,
                "| getDetailID:", getDetailID,
                "| storedDetailID:", storedDetailID,
                "| isExisting (action):", isExisting ? "UPDATE" : "INSERT",
            );

            const result = await Fnsave(draft, isExisting, storedDetailID);

            // Only persist locally when API confirms success (Status === "Y")
            // Status === "E" means backend rejected it — do NOT show chips
            // if (result?.success == false) {
            //     setCellEdits((prev) => ({
            //         ...prev,
            //         [activeKey]: {
            //             subject   : draft.subject,
            //             teacher   : draft.teacher,
            //             isExisting: true,
            //             DetailID  : storedDetailID > 0 ? storedDetailID : (getDetailID ?? -1),
            //         },
            //     }));
            //     closeEdit();
            // }
             if (result?.success) {
                setCellEdits((prev) => ({
                    ...prev,
                    [activeKey]: {
                        subject   : draft.subject,
                        teacher   : draft.teacher,
                        isExisting: true,
                        DetailID  : storedDetailID > 0 ? storedDetailID : (getDetailID ?? -1),
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

    // ── handleClear ───────────────────────────────────────────────────────────
    const handleClear = () => {
        if (!activeKey) return;
        setCellEdits((prev) => { const n = { ...prev }; delete n[activeKey]; return n; });
        toast.success("Cell cleared");
        closeEdit();
    };

    // ── Autocomplete change handlers ──────────────────────────────────────────
    const extractVal = (valOrEvent) =>
        valOrEvent?.target !== undefined ? valOrEvent.target.value : valOrEvent;

    const handleSubjectChange = (v) =>
        setDraft((prev) => ({ ...prev, subject: extractVal(v), teacher: null }));

    const handleTeacherChange = (v) =>
        setDraft((prev) => ({ ...prev, teacher: extractVal(v) }));

    // ── Logout / close ────────────────────────────────────────────────────────
    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
            icon: "warning", showCancelButton: true,
            confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: props,
        }).then((result) => {
            if (result.isConfirmed) {
                if (props === "Logout") navigate("/");
                if (props === "Close")  navigate(-1);
            }
        });
    };

    const popoverOpen = Boolean(anchorEl);

    // ── gridColumns: DataGrid columns with edit overlay ───────────────────────
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
                const key      = cellKey(params.row.id, col.field);
                const edit     = cellEdits[key];
                const rawValue = params.value;
                const dayField = WEEKcolumns[0]?.field;
                const dayName  = params.row[dayField] || "";
                const period   = col.field; // = time string e.g. "9:00 AM - 9:45 AM"

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

    // ── JSX ───────────────────────────────────────────────────────────────────
    return (
        <React.Fragment>
            {WEEKloading && <LinearProgress />}

            {/* ── Top Bar ── */}
            <Paper elevation={3} sx={{ width: "100%", background: "#F2F0F0", height: "50px", margin: "0px 10px" }}>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        {broken && !rtl && (
                            <IconButton onClick={() => toggleSidebar()}><MenuOutlinedIcon /></IconButton>
                        )}
                        <Box display={isNonMobile ? "flex" : "none"} borderRadius="3px" alignItems="center">
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}>
                                <Typography variant="h5" color="black"
                                    sx={{ cursor: "default", marginLeft: "10px", fontSize: "19px" }}>
                                    Timetable ({rowData.projectName || ""} || {rowData.TermName || ""})
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Tooltip title="Close">
                            <IconButton onClick={() => fnLogOut("Close")} color="error"><ResetTvIcon /></IconButton>
                        </Tooltip>
                        <Tooltip title="Logout">
                            <IconButton color="error" onClick={() => fnLogOut("Logout")}><LogoutOutlinedIcon /></IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            {/* ── Main Card ── */}
            <Paper elevation={0} sx={{
                width: "100%", p: 3, borderRadius: "12px",
                border: "0.5px solid #e2e2e8", margin: "10px", background: "#ffffff",
            }}>
                {/* DataGrid */}
                <Box sx={{
                    height: 400, width: "100%",
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
                    "& .MuiDataGrid-cellContent": { whiteSpace: "pre-line", wordBreak: "break-word", overflow: "visible", textOverflow: "unset" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: "#ffffff" },
                    "& .odd-row":  { backgroundColor: "#f8f8fc", color: "#2d2d4a" },
                    "& .even-row": { backgroundColor: "#ffffff",  color: "#2d2d4a" },
                    "& .odd-row:hover":  { backgroundColor: "#eff0fa !important" },
                    "& .even-row:hover": { backgroundColor: "#eff0fa !important" },
                    "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
                        backgroundColor: "#f0f0f8", fontWeight: 500, color: "#1e1e3a", borderRight: "2px solid #d0d0e8",
                    },
                }}>
                    <DataGrid
                        rows={WCrows || []}
                        columns={gridColumns}
                        loading={WEEKloading}
                        pageSizeOptions={[5]}
                        hideFooter
                        disableRowSelectionOnClick
                        rowHeight={60}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
                        }
                    />
                </Box>

                {/* Intervals */}
                {breakSlots.length > 0 && (
                    <Box sx={{ mt: 2, borderTop: "1px solid #eaeaf2", pt: 2 }}>
                        <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: "13px", color: "#444" }}>
                            Intervals
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                            {breakSlots.map((slot, i) => (
                                <Box key={i} sx={{
                                    display: "flex", alignItems: "center", gap: 1,
                                    px: 2, py: 0.8, borderRadius: "20px", background: "#1e1e3a",
                                }}>
                                    <Typography sx={{ fontSize: "12px", color: "#a8b2d8", fontWeight: 400 }}>
                                        {slot.SlotText}
                                    </Typography>
                                    <Typography sx={{ fontSize: "13px", color: "#5a6080" }}>→</Typography>
                                    <Typography sx={{ fontSize: "12px", color: "#dde2f5", fontWeight: 500 }}>
                                        {slot.SlotName}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Footer */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <PDFDownloadLink
                        document={
                            <ProjectTimeTablePDF
                                rows={WCrows || []} columns={WEEKcolumns || []}
                                breakSlots={breakSlots}
                                footerHeight={footerHeight}
                                projectName={rowData.projectName} termName={rowData.TermName}
                                filters={{ Imageurl: baseurlUAAM, HeaderImg, FooterImg }}
                            />
                        }
                        fileName={`Timetable_${rowData.projectName || "report"}.pdf`}
                        style={{ color: "#d32f2f", cursor: "pointer" }}
                    >
                        {({ loading }) =>
                            loading ? <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                                    : <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        }
                    </PDFDownloadLink>

                    <Button variant="contained" onClick={() => navigate(-1)} color="warning">
                        CANCEL
                    </Button>
                </Box>
            </Paper>

            {/* ── Edit Popover ── */}
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
                    <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "#1e1e3a" }}>
                        {activeMeta?.dayName
                            ? `Edit — ${activeMeta.dayName} · ${activeMeta.period}`
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

export default ProjectTimeTable;



// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Breadcrumbs,
//     CircularProgress,
//     Divider,
//     IconButton,
//     LinearProgress,
//     Paper,
//     Popover,
//     Tooltip,
//     Typography,
//     useMediaQuery,
//     useTheme,
// } from "@mui/material";
// import { useProSidebar } from "react-pro-sidebar";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
// import { postData, getFetchData } from "../../../store/reducers/Formapireducer";
// import { tokens } from "../../../Theme";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import Swal from "sweetalert2";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
// import { getConfig } from "../../../config";
// import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
// import {
//     DataGrid,
// } from "@mui/x-data-grid";

// // ─── Helper ──────────────────────────────────────────────────────────────────
// const cellKey = (rowId, colField) => `${rowId}__${colField}`;

// // ─── Component ───────────────────────────────────────────────────────────────
// const ProjectTimeTable = () => {

//     // ── Router / session ──────────────────────────────────────────────────────
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const rowData = location.state || {};  // full state from Link

//     console.log(rowData, "--ProjectTimeTable rowData from state");

//     const HeaderID = rowData.HeaderID || 0;   // RecordID from listview row
//     const ProjectID = rowData.projectID || 0;   // StandardID
//     const TermsID = rowData.TermsID || 0;   // TermID
//     const GroupID = rowData.GroupID || 0;   // SlotGroupID
//     const Isprocess = rowData.isprocess || "N";
//     const compID = sessionStorage.getItem("compID");
//     const UserName = sessionStorage.getItem("UserName");
//     const HeaderImg = sessionStorage.getItem("CompanyHeader");
//     const FooterImg = sessionStorage.getItem("CompanyFooter");

//     const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
//     const is003Subscription = SubscriptionCode.endsWith("003");
//     const sliceSubscriptionCode = SubscriptionCode.slice(-3);

//     const config = getConfig();
//     const baseurlUAAM = config.UAAM_URL;

//     // ── Redux selectors ───────────────────────────────────────────────────────
//     const listViewurl = useSelector((s) => s.globalurl.listViewurl);
//     const WCrows = useSelector((s) => s.exploreApi.explorerowData);
//     const calendarData = useSelector((s) => s.exploreApi.Data);
//     const rawColumns = useSelector((s) => s.exploreApi.explorecolumnData);
//     const WEEKloading = useSelector((s) => s.exploreApi.loading);

//     const breakSlots = Array.isArray(calendarData?.BreakSlots)
//         ? calendarData.BreakSlots
//         : [];
//     const slotMap = calendarData?.slotID || {};
//     // ── Theme ─────────────────────────────────────────────────────────────────
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const { toggleSidebar, broken, rtl } = useProSidebar();

//     // ── Per-cell saved data  { [cellKey]: { subject, teacher } } ─────────────
//     const [cellEdits, setCellEdits] = useState({});

//     // ── Popover state ─────────────────────────────────────────────────────────
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [activeKey, setActiveKey] = useState(null);
//     const [activeMeta, setActiveMeta] = useState(null); // { rowId, colField, dayName, period }
//     const slotID = slotMap[activeMeta?.period] || 0;

//     /**
//      * draft holds in-progress values while the popover is open.
//      * subject / teacher are the full value objects returned by CheckinAutocomplete.
//      * When the popover closes without saving, draft is discarded.
//      */
//     const [draft, setDraft] = useState({ subject: null, teacher: null });
//     const [saveLoading, setSaveLoading] = useState(false);

//     // ── Warning messages ──────────────────────────────────────────────────────
//     const [errorMsgData, setErrorMsgData] = useState(null);

//     useEffect(() => {
//         fetch(process.env.PUBLIC_URL + "/validationcms.json")
//             .then((res) => res.json())
//             .then((data) => setErrorMsgData(data))
//             .catch(() => { });
//     }, []);

//     // ── Fetch timetable grid on mount ─────────────────────────────────────────
//     useEffect(() => {
//         dispatch(
//             weeklyclasscaledarGet({
//                 ProjectID,
//                 HeaderID,
//                 TermID: TermsID,
//                 CompanyID: compID,
//                 GroupID,
//             })
//         );
//     }, []);

//     // ── Build columns (renderCell chip — kept from original) ──────────────────
//     const WEEKcolumns = (rawColumns || []).map((col) => ({
//         ...col,
//         renderCell: (params) =>
//             params.value ? (
//                 <Box
//                     sx={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#f0f2ff",
//                         color: "#3a3a6e",
//                         borderRadius: "6px",
//                         px: 1.2,
//                         py: 0.4,
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         whiteSpace: "normal",
//                         textAlign: "center",
//                         lineHeight: 1.4,
//                     }}
//                 >
//                     {params.value}
//                 </Box>
//             ) : null,
//     }));

//     // ── URL builders (re-computed each render so Teacher URL stays fresh) ─────
//     const subjectUrl = `${listViewurl}?data=${encodeURIComponent(
//         JSON.stringify({
//             Query: {
//                 AccessID: "2149",
//                 ScreenName: "Subject",
//                 Filter: `parentID=${compID}`,
//                 Any: "",
//                 VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
//             },
//         })
//     )}`;

//     // draft.subject?.RecordID — ID from CheckinAutocomplete value object
//     const subjectId =
//         draft.subject?.RecordID ??
//         draft.subject?.value ??
//         "";

//     const teacherUrl = `${listViewurl}?data=${encodeURIComponent(
//         JSON.stringify({
//             Query: {
//                 AccessID: "2175",
//                 ScreenName: "Teacher",
//                 Filter: `CompanyID='${compID}' AND DepartmentID=${subjectId}`,
//                 Any: "",
//                 VerticalLicense: is003Subscription ? sliceSubscriptionCode : "",
//             },
//         })
//     )}`;

//     // ── Popover open ──────────────────────────────────────────────────────────
//     const openEdit = (event, rowId, colField, dayName, period) => {
//         const key = cellKey(rowId, colField);
//         const existing = cellEdits[key] || { subject: null, teacher: null };
//         setDraft({ ...existing });
//         setActiveKey(key);
//         setActiveMeta({ rowId, colField, dayName, period });
//         setAnchorEl(event.currentTarget);
//     };

//     // ── Popover close ─────────────────────────────────────────────────────────
//     const closeEdit = () => {
//         setAnchorEl(null);
//         setActiveKey(null);
//         setActiveMeta(null);
//         setDraft({ subject: null, teacher: null });
//     };

    
//     const Fnsave = async (draftValues, existingDetailID) => {
//         const isNew = !existingDetailID || existingDetailID < 0;
//         console.log(existingDetailID,"existingDetailID");
//         const action = isNew ? "insert" : "update";

//         const idata = {
//             CompanyID: compID,
//             HeaderID: HeaderID,
//             ProjectID: ProjectID || 0,
//             TermsID: TermsID || 0,
//             SlotGroupID: GroupID || 0,
//             Assignedby: UserName || "",
//             Description: rowData.Description || "",
//             Detail: [
//                 {
//                     DepartmentID: (
//                         draftValues.subject?.RecordID ??
//                         draftValues.subject?.value ??
//                         0
//                     ).toString(),
//                     EmployeeID: (
//                         draftValues.teacher?.RecordID ??
//                         draftValues.teacher?.value ??
//                         0
//                     ).toString(),
//                     Day: activeMeta?.dayName || "",
//                     SlotID: slotID.toString(),
//                     Comments: draftValues.comments || "",
//                     DetailID: isNew ? -1 : Number(existingDetailID),
//                 },
//             ],
//         };

//         console.log(action, idata, "--ProjectTimeTable Fnsave idata");

//         const response = await dispatch(
//             postData({ accessID: "TR368v1", action, idata })
//         );

//         const returnedHeaderID = response?.payload?.HeaderID;

//         if (response?.payload?.Status === "Y") {
//             toast.success(response.payload.Msg);

//             // Refresh the weekly grid with the (possibly new) HeaderID from response
//             if (returnedHeaderID) {
//                 dispatch(
//                     weeklyclasscaledarGet({
//                         ProjectID,
//                         HeaderID: returnedHeaderID,
//                         TermID: TermsID,
//                         CompanyID: compID,
//                         GroupID,
//                     })
//                 );
//             }

//             return returnedHeaderID ?? existingDetailID;

//         } else if (response?.payload?.Status === "E") {
//             toast.error(response.payload.Msg);

//             if (returnedHeaderID) {
//                 dispatch(
//                     weeklyclasscaledarGet({
//                         ProjectID,
//                         HeaderID: returnedHeaderID,
//                         TermID: TermsID,
//                         CompanyID: compID,
//                         GroupID,
//                     })
//                 );
//             }

//             return returnedHeaderID ?? existingDetailID;

//         } else {
//             throw new Error(response?.payload?.Msg || "Save failed");
//         }
//     };

//     // ── Save handler (popover Save button) ───────────────────────────────────
//     const handleSave = async () => {
//         if (!activeKey) return;

//         if (!draft.subject) {
//             toast.error("Please select a Subject");
//             return;
//         }
//         if (!draft.teacher) {
//             toast.error("Please select a Teacher");
//             return;
//         }

//         setSaveLoading(true);
//         try {
//             const existingDetailID = cellEdits[activeKey]?.DetailID ?? -1;
//             const returnedDetailID = await Fnsave(draft, existingDetailID);

//             // Persist locally — include DetailID so subsequent edits use "update"
//             setCellEdits((prev) => ({
//                 ...prev,
//                 [activeKey]: {
//                     subject: draft.subject,
//                     teacher: draft.teacher,
//                     DetailID: returnedDetailID ?? existingDetailID,
//                 },
//             }));

//             closeEdit();
//         } catch (err) {
//             toast.error(err.message || "Save failed");
//         } finally {
//             setSaveLoading(false);
//         }
//     };

//     // ── Clear cell ────────────────────────────────────────────────────────────
//     const handleClear = () => {
//         if (!activeKey) return;
//         setCellEdits((prev) => {
//             const next = { ...prev };
//             delete next[activeKey];
//             return next;
//         });
//         toast.success("Cell cleared");
//         closeEdit();
//     };

//     // ── Subject change — also resets teacher so the filtered URL refreshes ────
//     const handleSubjectChange = (valOrEvent) => {
//         const val = valOrEvent?.target !== undefined
//             ? valOrEvent.target.value
//             : valOrEvent;
//         setDraft((prev) => ({
//             ...prev,
//             subject: val,
//             teacher: null,   // clear teacher whenever subject changes
//         }));
//     };

//     const handleTeacherChange = (valOrEvent) => {
//         const val = valOrEvent?.target !== undefined
//             ? valOrEvent.target.value
//             : valOrEvent;
//         setDraft((prev) => ({ ...prev, teacher: val }));
//     };

//     // ── Logout / close ────────────────────────────────────────────────────────
//     const fnLogOut = (props) => {
//         Swal.fire({
//             title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: props,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 if (props === "Logout") navigate("/");
//                 if (props === "Close") navigate(-1);
//             }
//         });
//     };

//     const popoverOpen = Boolean(anchorEl);

//     const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {
//         // Day column — no edit button
//         if (colIndex === 0) {
//             return {
//                 ...col,
//                 renderCell: (params) => (
//                     <Box sx={{ fontWeight: 500, color: "#1e1e3a", fontSize: "12px" }}>
//                         {params.value || ""}
//                     </Box>
//                 ),
//             };
//         }

//         // Period columns — add edit button + saved chips
//         return {
//             ...col,
//             renderCell: (params) => {
//                 const key = cellKey(params.row.id, col.field);
//                 const edit = cellEdits[key];
//                 const rawValue = params.value;

//                 // Extract day name from the first field of the row
//                 const dayField = WEEKcolumns[0]?.field;
//                 const dayName = params.row[dayField] || "";
//                 // Use col.field as the period/slot identifier
//                 const period = col.field;

//                 return (
//                     <Box
//                         sx={{
//                             width: "100%",
//                             height: "100%",
//                             position: "relative",
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "3px",
//                             justifyContent: "center",
//                             px: 0.5,
//                             "&:hover .cell-edit-btn": { opacity: 1 },
//                         }}
//                     >
//                         {/* Edit icon — top-right, revealed on hover */}
//                         {/* {Isprocess == "N" && ( */}
//                         <Tooltip
//                             title="Edit cell"                          
//                         >                          
//                           <IconButton
//                             size="small"
//                             className="cell-edit-btn"
//                             disabled={Isprocess == "Y"}
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 openEdit(e, params.row.id, col.field, dayName, period);
//                             }}
//                             sx={{
//                                 position: "absolute",
//                                 top: 2,
//                                 right: 2,
//                                 width: 18,
//                                 height: 18,
//                                 opacity: 0,
//                                 transition: "opacity .15s",
//                                 backgroundColor: "#f0f0f8",
//                                 border: "0.5px solid #d0d0e8",
//                                 borderRadius: "4px",
//                                 zIndex: 1,
//                                 "&:hover": {
//                                     backgroundColor: "#e0e0f0",
//                                     opacity: "1 !important",
//                                 },
//                             }}
//                         >
//                                 <EditIcon sx={{ fontSize: 10, color: "#5a5a8a" }} />
//                             </IconButton>
//                         </Tooltip>
//                         {/* )} */}


//                         {/* Saved subject chip */}
//                         {edit?.subject && (
//                             <Box
//                                 sx={{
//                                     display: "inline-flex",
//                                     alignItems: "center",
//                                     backgroundColor: "#f0f2ff",
//                                     color: "#3a3a6e",
//                                     borderRadius: "6px",
//                                     px: 1,
//                                     py: 0.2,
//                                     fontSize: "10px",
//                                     fontWeight: 500,
//                                     maxWidth: "90%",
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap",
//                                 }}
//                             >
//                                 {edit.subject?.label || edit.subject?.Name || String(edit.subject)}
//                             </Box>
//                         )}

//                         {/* Saved teacher chip */}
//                         {/* {edit?.teacher && (
//                             <Box
//                                 sx={{
//                                     display: "inline-flex",
//                                     alignItems: "center",
//                                     backgroundColor: "#fff8e0",
//                                     color: "#7a6010",
//                                     borderRadius: "6px",
//                                     px: 1,
//                                     py: 0.2,
//                                     fontSize: "10px",
//                                     fontWeight: 400,
//                                     maxWidth: "90%",
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap",
//                                 }}
//                             >
//                                 {edit.teacher?.label || edit.teacher?.Name || String(edit.teacher)}
//                             </Box>
//                         )} */}

//                         {/* Original API value when no edit saved yet */}
//                         {!edit?.subject && !edit?.teacher && rawValue && (
//                             <Box
//                                 sx={{
//                                     display: "inline-flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     backgroundColor: "#f0f2ff",
//                                     color: "#3a3a6e",
//                                     borderRadius: "6px",
//                                     px: 1.2,
//                                     py: 0.3,
//                                     fontSize: "11px",
//                                     fontWeight: 500,
//                                     whiteSpace: "normal",
//                                     textAlign: "center",
//                                     lineHeight: 1.4,
//                                 }}
//                             >
//                                 {rawValue}
//                             </Box>
//                         )}

//                         {/* Empty placeholder */}
//                         {!edit?.subject && !edit?.teacher && !rawValue && (
//                             <Typography sx={{ fontSize: "10px", color: "#ccc", fontStyle: "italic" }}>
//                                 —
//                             </Typography>
//                         )}
//                     </Box>
//                 );
//             },
//         };
//     });

//     // ── JSX ───────────────────────────────────────────────────────────────────
//     return (
//         <React.Fragment>
//             {/* Loading bar */}
//             {WEEKloading && <LinearProgress />}

//             {/* ── Top Bar ── */}
//             <Paper
//                 elevation={3}
//                 sx={{ width: "100%", background: "#F2F0F0", height: "50px", margin: "0px 10px" }}
//             >
//                 <Box display="flex" justifyContent="space-between">
//                     <Box display="flex" borderRadius="3px" alignItems="center">
//                         {broken && !rtl && (
//                             <IconButton onClick={() => toggleSidebar()}>
//                                 <MenuOutlinedIcon />
//                             </IconButton>
//                         )}
//                         <Box display={isNonMobile ? "flex" : "none"} borderRadius="3px" alignItems="center">
//                             <Breadcrumbs
//                                 maxItems={3}
//                                 aria-label="breadcrumb"
//                                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//                             >
//                                 <Typography
//                                     variant="h5"
//                                     color="black"
//                                     sx={{ cursor: "default", marginLeft: "10px", fontSize: "19px" }}
//                                 >
//                                     Timetable ({rowData.projectName || ""} || {rowData.TermName || ""})
//                                 </Typography>
//                             </Breadcrumbs>
//                         </Box>
//                     </Box>

//                     <Box display="flex">
//                         <Tooltip title="Close">
//                             <IconButton onClick={() => fnLogOut("Close")} color="error">
//                                 <ResetTvIcon />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Logout">
//                             <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                                 <LogoutOutlinedIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Paper>

//             {/* ── Main Card ── */}
//             <Paper
//                 elevation={0}
//                 sx={{
//                     width: "100%",
//                     p: 3,
//                     borderRadius: "12px",
//                     border: "0.5px solid #e2e2e8",
//                     margin: "10px",
//                     background: "#ffffff",
//                 }}
//             >
//                 {/* ── DataGrid ── */}
//                 <Box
//                     sx={{
//                         height: 400,
//                         width: "100%",

//                         // Outer grid border
//                         "& .MuiDataGrid-root": {
//                             border: "1px solid #e8e8f0",
//                             borderRadius: "8px",
//                             overflow: "hidden",
//                         },

//                         // Header
//                         "& .MuiDataGrid-columnHeaders": {
//                             backgroundColor: "#1e1e3a",
//                             color: "#c8d0ea",
//                             borderBottom: "none",
//                         },
//                         "& .MuiDataGrid-columnHeaderTitle": {
//                             fontWeight: 500,
//                             fontSize: "11px",
//                             color: "#c8d0ea",
//                         },
//                         "& .MuiDataGrid-columnHeader": {
//                             borderRight: "1px solid #2e2e50",
//                         },
//                         "& .MuiDataGrid-columnHeader:last-of-type": {
//                             borderRight: "none",
//                         },
//                         "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
//                             color: "#8890b8",
//                         },
//                         "& .MuiDataGrid-columnSeparator": {
//                             display: "none",
//                         },

//                         // Cells
//                         "& .MuiDataGrid-cell": {
//                             borderRight: "0.5px solid #ebebf2",
//                             borderBottom: "0.5px solid #ebebf2",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             // Allow the edit button to show on hover
//                             overflow: "visible !important",
//                         },
//                         "& .MuiDataGrid-cell:last-of-type": {
//                             borderRight: "none",
//                         },
//                         "& .MuiDataGrid-cellContent": {
//                             whiteSpace: "pre-line",
//                             wordBreak: "break-word",
//                             overflow: "visible",
//                             textOverflow: "unset",
//                         },

//                         // Row stripes
//                         "& .MuiDataGrid-virtualScroller": {
//                             backgroundColor: "#ffffff",
//                         },
//                         "& .odd-row": {
//                             backgroundColor: "#f8f8fc",
//                             color: "#2d2d4a",
//                         },
//                         "& .even-row": {
//                             backgroundColor: "#ffffff",
//                             color: "#2d2d4a",
//                         },
//                         "& .odd-row:hover": {
//                             backgroundColor: "#eff0fa !important",
//                         },
//                         "& .even-row:hover": {
//                             backgroundColor: "#eff0fa !important",
//                         },

//                         "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
//                             backgroundColor: "#f0f0f8",
//                             fontWeight: 500,
//                             color: "#1e1e3a",
//                             borderRight: "2px solid #d0d0e8",
//                         },
//                     }}
//                 >
//                     <DataGrid
//                         rows={WCrows || []}
//                         columns={gridColumns}
//                         loading={WEEKloading}
//                         pageSizeOptions={[5]}
//                         hideFooter
//                         disableRowSelectionOnClick
//                         rowHeight={60}
//                         getRowClassName={(params) =>
//                             params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
//                         }
//                     />
//                 </Box>

//                 {/* ── Intervals ── */}
//                 {breakSlots.length > 0 && (
//                     <Box sx={{ mt: 2, borderTop: "1px solid #eaeaf2", pt: 2 }}>
//                         <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: "13px", color: "#444" }}>
//                             Intervals
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                             {breakSlots.map((slot, index) => (
//                                 <Box
//                                     key={index}
//                                     sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: 1,
//                                         px: 2,
//                                         py: 0.8,
//                                         borderRadius: "20px",
//                                         background: "#1e1e3a",
//                                     }}
//                                 >
//                                     <Typography sx={{ fontSize: "12px", color: "#a8b2d8", fontWeight: 400 }}>
//                                         {slot.SlotText}
//                                     </Typography>
//                                     <Typography sx={{ fontSize: "13px", color: "#5a6080" }}>→</Typography>
//                                     <Typography sx={{ fontSize: "12px", color: "#dde2f5", fontWeight: 500 }}>
//                                         {slot.SlotName}
//                                     </Typography>
//                                 </Box>
//                             ))}
//                         </Box>
//                     </Box>
//                 )}

//                 {/* ── Footer actions ── */}
//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
//                     <PDFDownloadLink
//                         document={
//                             <ProjectTimeTablePDF
//                                 rows={WCrows || []}
//                                 columns={WEEKcolumns || []}
//                                 breakSlots={breakSlots}
//                                 projectName={rowData.projectName}
//                                 termName={rowData.TermName}
//                                 filters={{ Imageurl: baseurlUAAM, HeaderImg, FooterImg }}
//                             />
//                         }
//                         fileName={`Timetable_${rowData.projectName || "report"}.pdf`}
//                         style={{ color: "#d32f2f", cursor: "pointer" }}
//                     >
//                         {({ loading }) =>
//                             loading ? (
//                                 <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
//                             ) : (
//                                 <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                             )
//                         }
//                     </PDFDownloadLink>

//                     <Button variant="contained" onClick={() => navigate(-1)} color="warning">
//                         CANCEL
//                     </Button>
//                 </Box>
//             </Paper>

//             {/* ── Edit Popover ── */}
//             <Popover
//                 open={popoverOpen}
//                 anchorEl={anchorEl}
//                 onClose={closeEdit}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//                 PaperProps={{
//                     elevation: 4,
//                     sx: {
//                         borderRadius: "10px",
//                         border: "0.5px solid #e2e2e8",
//                         p: 2,
//                         minWidth: 300,
//                         maxWidth: 360,
//                     },
//                 }}
//             >
//                 {/* Header */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//                     <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "#1e1e3a" }}>
//                         {activeMeta?.dayName
//                             ? `Edit — ${activeMeta.dayName} · ${activeMeta.period}`
//                             : "Edit Cell"}
//                     </Typography>
//                     <IconButton size="small" onClick={closeEdit}>
//                         <CancelIcon sx={{ fontSize: 16, color: "#999" }} />
//                     </IconButton>
//                 </Box>

//                 <Divider sx={{ mb: 1.5 }} />

//                 {/* Subject */}
//                 <CheckinAutocomplete
//                     name="Subject"
//                     label="Subject"
//                     id="Subject"
//                     value={draft.subject}
//                     onChange={handleSubjectChange}
//                     url={subjectUrl}
//                 />

//                 {/* Teacher — filtered by selected subject */}
//                 <CheckinAutocomplete
//                     sx={{ mt: 1 }}
//                     name="Teacher"
//                     label="Teacher"
//                     id="Teacher"
//                     value={draft.teacher}
//                     onChange={handleTeacherChange}
//                     url={teacherUrl}
//                 />

//                 {/* Actions */}
//                 <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}>
//                     <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={closeEdit}
//                         disabled={saveLoading}
//                         sx={{ fontSize: "11px", textTransform: "none", borderRadius: "6px" }}
//                     >
//                         Cancel
//                     </Button>

//                     <Button
//                         size="small"
//                         variant="contained"
//                         startIcon={saveLoading ? <CircularProgress size={12} color="inherit" /> : <SaveIcon />}
//                         onClick={handleSave}
//                         disabled={saveLoading}
//                         sx={{
//                             fontSize: "11px",
//                             textTransform: "none",
//                             borderRadius: "6px",
//                             background: "#1e1e3a",
//                             "&:hover": { background: "#2e2e5a" },
//                         }}
//                     >
//                         {saveLoading ? "Saving..." : "Save"}
//                     </Button>
//                 </Box>
//             </Popover>
//         </React.Fragment>
//     );
// };

// export default ProjectTimeTable;


// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import axios from "axios";
// import React, { useState, useEffect, useRef } from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     List,
//     ListItem,
//     IconButton,
//     ListItemText,
//     CircularProgress,
//     Card,
//     CardContent,
//     Divider,
//     Typography,
//     Skeleton,
//     Box,
//     Tooltip,
//     Paper,
//     useTheme,
//     TextField,
//     Breadcrumbs,
//     useMediaQuery,
//     Chip,
// } from "@mui/material";

// import {
//     GridActionsCellItem,
//     DataGrid,
//     GridRowModes,
//     GridToolbarContainer,
//     GridRowEditStopReasons,
// } from "@mui/x-data-grid";
// import { useProSidebar } from "react-pro-sidebar";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
// import { tokens } from "../../../Theme";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import Swal from "sweetalert2";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
// import { getConfig } from "../../../config";

// const ProjectTimeTable = () => {
//     const calendarRef = useRef(null);
//     const calendarInstanceRef = useRef(null);
//     const [eventsData, setEventsData] = useState([]);
//     const [DialogData, setDialogData] = useState([]);
//     const { toggleSidebar, broken, rtl } = useProSidebar();
//     const [clickedDate, setClickedDate] = useState("");
//     const [errorMsgData, setErrorMsgData] = useState(null);

//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const companyClassification = sessionStorage.getItem("Classification");

//     const dispatch = useDispatch();
//     const params = useParams();
//     const location = useLocation();

//     const HeaderImg = sessionStorage.getItem("CompanyHeader");
//     const FooterImg = sessionStorage.getItem("CompanyFooter");
//     console.log("HeaderImg", HeaderImg, FooterImg);
//     const config = getConfig();
//     const baseurlUAAM = config.UAAM_URL;

//     const state = location.state || {};
//     const TermsID = state.TermsID || "";
//     const SectionID = state.MilestoneID || "";
//     const ProjectID = state.projectID || "";
//     const HeaderID = state.HeaderID || "";
//     const GroupID = state.GroupID || "";

//     const empID = sessionStorage.getItem("EmpId");
//     const compID = sessionStorage.getItem("compID");
//     const listViewurl = useSelector((state) => state.globalurl.listViewurl);

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     useEffect(() => {
//         dispatch(weeklyclasscaledarGet({
//             ProjectID: ProjectID,
//             HeaderID: HeaderID,
//             TermID: TermsID,
//             CompanyID: compID,
//             GroupID: GroupID,
//         }));
//     }, []);

//     const WCrows = useSelector((state) => state.exploreApi.explorerowData);
//     const calendarData = useSelector((state) => state.exploreApi.Data);
//     const breakSlots = Array.isArray(calendarData?.BreakSlots)
//         ? calendarData.BreakSlots
//         : [];

//     // Inject renderCell into every column to show a styled chip
//     const rawColumns = useSelector((state) => state.exploreApi.explorecolumnData);
//     const WEEKcolumns = (rawColumns || []).map((col) => ({
//         ...col,
//         renderCell: (params) =>
//             params.value ? (
//                 <Box
//                     sx={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#f0f2ff",
//                         color: "#3a3a6e",
//                         borderRadius: "6px",
//                         px: 1.2,
//                         py: 0.4,
//                         fontSize: "11px",
//                         fontWeight: 500,
//                         whiteSpace: "normal",
//                         textAlign: "center",
//                         lineHeight: 1.4,
//                     }}
//                 >
//                     {params.value}
//                 </Box>
//             ) : null,
//     }));
//     console.log("WEEKcolumns", WEEKcolumns);

//     const WEEKloading = useSelector((state) => state.exploreApi.loading);

//     const fnLogOut = (props) => {
//         Swal.fire({
//             title: errorMsgData.Warningmsg[props],
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: props,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 if (props === "Logout") {
//                     navigate("/");
//                 }
//                 if (props === "Close") {
//                     navigate(-1);
//                 }
//             } else {
//                 return;
//             }
//         });
//     };

//     return (
//         <React.Fragment>
//             {/* ── Top Bar ── */}
//             <Paper
//                 elevation={3}
//                 sx={{
//                     width: "100%",
//                     background: "#F2F0F0",
//                     height: "50px",
//                     margin: "0px 10px"
//                 }}
//             >
//                 <Box display="flex" justifyContent="space-between">
//                     <Box display="flex" borderRadius="3px" alignItems="center">
//                         {broken && !rtl && (
//                             <IconButton onClick={() => toggleSidebar()}>
//                                 <MenuOutlinedIcon />
//                             </IconButton>
//                         )}
//                         <Box
//                             display={isNonMobile ? "flex" : "none"}
//                             borderRadius="3px"
//                             alignItems="center"
//                         >

//                             <Breadcrumbs
//                                 maxItems={3}
//                                 aria-label="breadcrumb"
//                                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//                             >
//                                 <Typography
//                                     variant="h5"
//                                     color="black"
//                                     sx={{
//                                         cursor: "default",
//                                         marginLeft: "10px",
//                                         fontSize: "19px",
//                                     }}
//                                 >
//                                     {/* Timetable{" "} ({state.Description || ""}) */}
//                                     {/* Timetable({state.projectName} || {state.MilestoneName}) */}
//                                     Timetable({state.projectName} || {state.TermName})

//                                 </Typography>
//                             </Breadcrumbs>

//                         </Box>
//                     </Box>
//                     <Box display="flex">

//                         <Tooltip title="Close">
//                             <IconButton onClick={() => fnLogOut("Close")} color="error">
//                                 <ResetTvIcon />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Logout">
//                             <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                                 <LogoutOutlinedIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Paper>

//             {/* ── Main Card ── */}
//             <Paper
//                 elevation={0}
//                 sx={{
//                     width: "100%",
//                     p: 3,
//                     borderRadius: "12px",
//                     border: "0.5px solid #e2e2e8",
//                     margin: "10px",
//                     background: "#ffffff",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         height: 400,
//                         width: "100%",

//                         // Outer grid border
//                         "& .MuiDataGrid-root": {
//                             border: "1px solid #e8e8f0",
//                             borderRadius: "8px",
//                             overflow: "hidden",
//                         },

//                         // Header
//                         "& .MuiDataGrid-columnHeaders": {
//                             backgroundColor: "#1e1e3a",
//                             color: "#c8d0ea",
//                             borderBottom: "none",
//                         },
//                         "& .MuiDataGrid-columnHeaderTitle": {
//                             fontWeight: 500,
//                             fontSize: "11px",
//                             color: "#c8d0ea",
//                         },
//                         "& .MuiDataGrid-columnHeader": {
//                             borderRight: "1px solid #2e2e50",
//                         },
//                         "& .MuiDataGrid-columnHeader:last-of-type": {
//                             borderRight: "none",
//                         },
//                         // Sort/menu icons in header
//                         "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
//                             color: "#8890b8",
//                         },
//                         "& .MuiDataGrid-columnSeparator": {
//                             display: "none",
//                         },

//                         // Cells
//                         "& .MuiDataGrid-cell": {
//                             borderRight: "0.5px solid #ebebf2",
//                             borderBottom: "0.5px solid #ebebf2",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                         },
//                         "& .MuiDataGrid-cell:last-of-type": {
//                             borderRight: "none",
//                         },
//                         "& .MuiDataGrid-cellContent": {
//                             whiteSpace: "pre-line",
//                             wordBreak: "break-word",
//                             overflow: "visible",
//                             textOverflow: "unset",
//                         },

//                         // Row stripes
//                         "& .MuiDataGrid-virtualScroller": {
//                             backgroundColor: "#ffffff",
//                         },
//                         "& .odd-row": {
//                             backgroundColor: "#f8f8fc",
//                             color: "#2d2d4a",
//                         },
//                         "& .even-row": {
//                             backgroundColor: "#ffffff",
//                             color: "#2d2d4a",
//                         },
//                         "& .odd-row:hover": {
//                             backgroundColor: "#eff0fa !important",
//                         },
//                         "& .even-row:hover": {
//                             backgroundColor: "#eff0fa !important",
//                         },

//                         // Day column (first col) highlight
//                         "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
//                             backgroundColor: "#f0f0f8",
//                             fontWeight: 500,
//                             color: "#1e1e3a",
//                             borderRight: "2px solid #d0d0e8",
//                         },
//                     }}
//                 >
//                     <DataGrid
//                         rows={WCrows}
//                         columns={WEEKcolumns}
//                         loading={WEEKloading}
//                         pageSizeOptions={[5]}
//                         hideFooter
//                         disableRowSelectionOnClick
//                         rowHeight={50}
//                         getRowClassName={(params) =>
//                             params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
//                         }
//                     />
//                 </Box>

//                 {/* ── Intervals ── */}
//                 <Box
//                     sx={{
//                         mt: 2,
//                         borderTop: "1px solid #eaeaf2",
//                         pt: 2,
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             fontWeight: 700,
//                             mb: 1.5,
//                             fontSize: "13px",
//                             color: "#444",
//                         }}
//                     >
//                         Intervals
//                     </Typography>

//                     <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//                         {breakSlots.map((slot, index) => (
//                             <Box
//                                 key={index}
//                                 sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 1,
//                                     px: 2,
//                                     py: 0.8,
//                                     borderRadius: "20px",
//                                     background: "#1e1e3a",
//                                     border: "none",
//                                 }}
//                             >
//                                 <Typography sx={{ fontSize: "12px", color: "#a8b2d8", fontWeight: 400 }}>
//                                     {slot.SlotText}
//                                 </Typography>
//                                 <Typography sx={{ fontSize: "13px", color: "#5a6080" }}>
//                                     →
//                                 </Typography>
//                                 <Typography sx={{ fontSize: "12px", color: "#dde2f5", fontWeight: 500 }}>
//                                     {slot.SlotName}
//                                 </Typography>
//                             </Box>
//                         ))}
//                     </Box>



//                     <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
//                         <PDFDownloadLink
//                             document={
//                                 <ProjectTimeTablePDF
//                                     rows={WCrows}
//                                     columns={WEEKcolumns}
//                                     breakSlots={breakSlots}
//                                     projectName={state.projectName}
//                                     termName={state.TermName}
//                                     filters={{
//                                         Imageurl: baseurlUAAM,
//                                         HeaderImg: HeaderImg,
//                                         FooterImg: FooterImg,
//                                     }}
//                                 />
//                             }
//                             fileName={`Timetable_${state.projectName || "report"}.pdf`}
//                             style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel

//                         >
//                             {({ loading }) =>
//                                 loading ? (
//                                     <PictureAsPdfIcon
//                                         sx={{ fontSize: 24, opacity: 0.5 }}
//                                     />
//                                 ) : (
//                                     <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//                                 )
//                             }
//                         </PDFDownloadLink>
//                         <Button
//                             variant="contained"
//                             onClick={() => navigate(-1)}
//                             // sx={{
//                             //     background: "#e8550a",
//                             //     color: "#fff",
//                             //     borderRadius: "8px",
//                             //     textTransform: "none",
//                             //     fontWeight: 500,
//                             //     fontSize: "13px",
//                             //     px: 3,
//                             //     "&:hover": { background: "#c94508" },
//                             // }}
//                             color="warning"
//                         >
//                             CANCEL
//                         </Button>
//                     </Box>
//                 </Box>
//             </Paper>
//         </React.Fragment >
//     );
// };

// export default ProjectTimeTable;