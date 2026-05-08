// TimetableGridPanel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable timetable grid panel extracted from ProjectTimeTable.
// Used in both:
//   1. ProjectTimeTable.jsx  — standalone route page
//   2. EditTimetablev1.jsx   — embedded inside the form, below the header fields
//
// Props:
//   HeaderID    {number|string}  — timetable header PK
//   ProjectID   {number|string}  — StandardID
//   TermsID     {number|string}  — TermID
//   GroupID     {number|string}  — SlotGroupID
//   Isprocess   {string}         — "Y" | "N"
//   rowData     {object}         — full location.state (Description, projectName, etc.)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    LinearProgress,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";

// ── Helper ────────────────────────────────────────────────────────────────────
const cellKey = (rowId, colField) => `${rowId}__${colField}`;

// ─────────────────────────────────────────────────────────────────────────────
const TimetableGridPanel = ({ HeaderID, ProjectID, TermsID, GroupID, Isprocess = "N", rowData = {} }) => {

    const dispatch = useDispatch();

    // ── Session ───────────────────────────────────────────────────────────────
    const compID = sessionStorage.getItem("compID");
    const UserName = sessionStorage.getItem("UserName");

    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);

    // ── Redux ─────────────────────────────────────────────────────────────────
    const listViewurl = useSelector((s) => s.globalurl.listViewurl);
    const WCrows = useSelector((s) => s.exploreApi.explorerowData);
    const calendarData = useSelector((s) => s.exploreApi.Data);
    const rawColumns = useSelector((s) => s.exploreApi.explorecolumnData);
    const WEEKloading = useSelector((s) => s.exploreApi.loading);

    const breakSlots = Array.isArray(calendarData?.BreakSlots) ? calendarData.BreakSlots : [];
    const slotIDMap = calendarData?.slotID || {};

    // ── detailIDMap: { cellKey: DetailID } from GET response ─────────────────
    const detailIDMap = useMemo(() => {
        const rawDetailID = calendarData?.detailID || {};
        const dayField = (rawColumns || [])[0]?.field;
        const map = {};

        Object.entries(rawDetailID).forEach(([dayName, slotMap]) => {
            const matchRow = (WCrows || []).find((r) => r[dayField] === dayName);
            if (!matchRow) return;
            Object.entries(slotMap).forEach(([timeSlot, detailID]) => {
                if (detailID) map[cellKey(matchRow.id, timeSlot)] = detailID;
            });
        });

        console.log("detailIDMap:", map);
        return map;
    }, [calendarData?.detailID, WCrows, rawColumns]);

    // ── Cell edit state ───────────────────────────────────────────────────────
    const [cellEdits, setCellEdits] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
    const [activeMeta, setActiveMeta] = useState(null);
    const [draft, setDraft] = useState({ subject: null, teacher: null });
    const [saveLoading, setSaveLoading] = useState(false);

    // ── Fetch grid on mount / when HeaderID changes ───────────────────────────
    useEffect(() => {
        if (!HeaderID || HeaderID == 0) return;
        dispatch(
            weeklyclasscaledarGet({
                ProjectID,
                HeaderID,
                TermID: TermsID,
                CompanyID: compID,
                GroupID,
            })
        );
    }, [HeaderID]);

    // ── WEEKcolumns ───────────────────────────────────────────────────────────
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
        const key = cellKey(rowId, colField);
        const existing = cellEdits[key];

        let prefillSubject = existing?.subject ?? null;
        let prefillTeacher = existing?.teacher ?? null;

        if (!existing && detailIDMap[key]) {
            const scheduleDay = calendarData?.schedule?.find((s) => s.day === dayName);
            const subjectName = scheduleDay?.slots?.[period] || "";
            if (subjectName) prefillSubject = { label: subjectName, Name: subjectName };
            const teacherName = calendarData?.teacherMap?.[dayName]?.[period] || "";
            if (teacherName) prefillTeacher = { label: teacherName, Name: teacherName };
        }

        setDraft({ subject: prefillSubject, teacher: prefillTeacher });
        setActiveKey(key);
        setActiveMeta({ rowId, colField, dayName, period });
        setAnchorEl(event.currentTarget);
    };

    const closeEdit = () => {
        setAnchorEl(null);
        setActiveKey(null);
        setActiveMeta(null);
        setDraft({ subject: null, teacher: null });
    };

    // ── Refresh helper ────────────────────────────────────────────────────────
    const refreshGrid = (hid) => dispatch(weeklyclasscaledarGet({
        ProjectID, HeaderID: hid || HeaderID, TermID: TermsID, CompanyID: compID, GroupID,
    }));

    // ── Fnsave ────────────────────────────────────────────────────────────────
    const Fnsave = async (draftValues, isExisting, storedDetailID) => {
        const action = isExisting ? "update" : "insert";
        const detailID = isExisting ? Number(storedDetailID) : -1;
        const slotID = slotIDMap[activeMeta?.period] ?? 0;

        console.log("Fnsave →", action, "| SlotID:", slotID, "| DetailID:", detailID);

        const idata = {
            CompanyID: compID?.toString(),
            HeaderID: HeaderID?.toString(),
            ProjectID: ProjectID?.toString() || "0",
            TermsID: TermsID?.toString() || "0",
            SlotGroupID: GroupID?.toString() || "0",
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

        console.log(action, idata, "--TimetableGridPanel Fnsave idata");

        const response = await dispatch(postData({ accessID: "TR368v1", action, idata }));
        const returnedHeaderID = response?.payload?.HeaderID;

        if (response?.payload?.Status === "Y") {
            toast.success(response.payload.Msg);
            dispatch(
                getFetchData({
                    accessID: "TR368",
                    get: "get",
                    recID: HeaderID, // THIS IS THE FIX
                })
            );
            refreshGrid(returnedHeaderID);
            return { success: true, returnedHeaderID };
        } else if (response?.payload?.Status === "E") {
            toast.error(response.payload.Msg);
            refreshGrid(returnedHeaderID);
            return { success: false, returnedHeaderID };
        } else {
            throw new Error(response?.payload?.Msg || "Save failed");
        }
    };

    // ── handleSave ────────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!activeKey) return;
        if (!draft.subject) { toast.error("Please select a Subject"); return; }
        if (!draft.teacher) { toast.error("Please select a Teacher"); return; }

        setSaveLoading(true);
        try {
            const sessionDetailID = cellEdits[activeKey]?.DetailID;
            const getDetailID = detailIDMap[activeKey];
            const storedDetailID = sessionDetailID ?? getDetailID ?? -1;
            const isExisting = storedDetailID > 0;

            console.log("handleSave | storedDetailID:", storedDetailID, "| action:", isExisting ? "UPDATE" : "INSERT");

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
            // On E: popover stays open for correction
        } catch (err) {
            toast.error(err.message || "Save failed");
        } finally {
            setSaveLoading(false);
        }
    };

    const extractVal = (v) => v?.target !== undefined ? v.target.value : v;
    const handleSubjectChange = (v) => setDraft((p) => ({ ...p, subject: extractVal(v), teacher: null }));
    const handleTeacherChange = (v) => setDraft((p) => ({ ...p, teacher: extractVal(v) }));

    const popoverOpen = Boolean(anchorEl);

    // ── gridColumns ───────────────────────────────────────────────────────────
    const gridColumns = (WEEKcolumns || []).map((col, colIndex) => {
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

        return {
            ...col,
            renderCell: (params) => {
                const key = cellKey(params.row.id, col.field);
                const edit = cellEdits[key];
                const rawValue = params.value;
                const dayField = WEEKcolumns[0]?.field;
                const dayName = params.row[dayField] || "";
                const period = col.field;

                return (
                    <Box sx={{
                        width: "100%", height: "100%", position: "relative",
                        display: "flex", flexDirection: "column", gap: "3px",
                        justifyContent: "center", px: 0.5,
                        "&:hover .cell-edit-btn": { opacity: 1 },
                    }}>
                        <Tooltip title={Isprocess === "Y" ? "Processed — cannot edit" : "Edit cell"}>
                            <span>
                                <IconButton
                                    size="small"
                                    className="cell-edit-btn"
                                    disabled={Isprocess === "Y"}
                                    onClick={(e) => { e.stopPropagation(); openEdit(e, params.row.id, col.field, dayName, period); }}
                                    sx={{
                                        position: "absolute", top: 2, right: 2,
                                        width: 18, height: 18, opacity: 0, transition: "opacity .15s",
                                        backgroundColor: "#f0f0f8", border: "0.5px solid #d0d0e8",
                                        borderRadius: "4px", zIndex: 1,
                                        "&:hover": { backgroundColor: "#e0e0f0", opacity: "1 !important" },
                                    }}
                                >
                                    <EditIcon sx={{ fontSize: 10, color: "#5a5a8a" }} />
                                </IconButton>
                            </span>
                        </Tooltip>

                        {edit?.subject && (
                            <Box sx={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                width: "100%", backgroundColor: "#f0f2ff", color: "#3a3a6e",
                                borderRadius: "6px", px: 1, py: 0.2, fontSize: "12px", fontWeight: 500,
                                textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                                {edit.subject?.label || edit.subject?.Name || String(edit.subject)}
                            </Box>
                        )}

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

                        {!edit?.subject && !edit?.teacher && !rawValue && (
                            <Typography sx={{ fontSize: "10px", color: "#ccc", fontStyle: "italic" }}>—</Typography>
                        )}
                    </Box>
                );
            },
        };
    });

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <>
            {WEEKloading && <LinearProgress />}

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

            {/* Intervals / Break slots */}
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

            {/* Edit Popover */}
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
                        {activeMeta?.dayName ? `Edit — ${activeMeta.dayName} · ${activeMeta.period}` : "Edit Cell"}
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
                        sx={{ fontSize: "11px", textTransform: "none", borderRadius: "6px", background: "#1e1e3a", "&:hover": { background: "#2e2e5a" } }}
                    >
                        {saveLoading ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default TimetableGridPanel;
