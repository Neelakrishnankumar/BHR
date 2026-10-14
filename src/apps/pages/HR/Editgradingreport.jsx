import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
  Paper,
  Breadcrumbs,
  Dialog,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import ReportCard from "../SkillGlow/Pdf/Reportcard";
import { useProSidebar } from "react-pro-sidebar";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import { breadcrumbStyles, tokens } from "../../../Theme";
import {
  dataGridHeaderFooterHeight,
  dataGridHeightExplore,
  dataGridRowHeight,
} from "../../../ui-components/utils";
import {
  promotionstudmarksupdate,
  promototionGET,
  promototioStudMarksGET,
  StudentReportcardget,
} from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { getConfig } from "../../../config";

/* API returns numbers as strings ("0", "100") -> normalise for the grid */
const normaliseMarksRows = (list = []) =>
  list.map((r) => ({
    ...r,
    Marks: Number(r.Marks) || 0,
    OutOfMarks: Number(r.OutOfMarks) || 0,
  }));

const EMPTY_PREVIEW = { open: false, url: "", blob: null, fileName: "" };

const EditGradingreport = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const rowData = location.state || {};
  const config = getConfig();
  const baseurl = config.BOS_URL;
  const CompanyID = sessionStorage.getItem("compID");
  const ProjectID = rowData.projectID;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /* ── Redux data ───────────────────────────────────────────────────────── */
  const promotiongetloading = useSelector((state) => state.formApi.promotiongetloading);
  const students = useSelector((state) => state.formApi.promotiongetdata.Data || []);
  const promotionstudmarksgetloading = useSelector(
    (state) => state.formApi.promotionstudmarksgetloading,
  );
  const promotionstudmarksgetdata = useSelector(
    (state) => state.formApi.promotionstudmarksgetdata.Data || [],
  );

  /* ── Local state ──────────────────────────────────────────────────────── */
  const apiRef = useGridApiRef();
  const [pageSize, setPageSize] = useState(10);
  const [marksOpen, setMarksOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null); // full student row from API
  const [subjectRows, setSubjectRows] = useState([]); // editable copy of marks API data
  const [marksPageSize, setMarksPageSize] = useState(20);
  const [saving, setSaving] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [preview, setPreview] = useState(EMPTY_PREVIEW); // report card preview dialog
  const termid = params.termid || "";
  const standardName = rowData.MilestoneName || "";
  const termName = params.termName || "";
  const academicYear = rowData.AcademicYear || "";

  /* ── Load students of the selected standard ───────────────────────────── */
  useEffect(() => {
    if (!CompanyID || !ProjectID) return;
    dispatch(promototionGET({ ProjectID, CompanyID }));
  }, [ProjectID, CompanyID, dispatch]);

  /* ── Keep the editable marks grid in sync with the marks GET response ─── */
  useEffect(() => {
    setSubjectRows(normaliseMarksRows(promotionstudmarksgetdata));
  }, [promotionstudmarksgetdata]);

  /* ── Free the preview blob URL when the page unmounts ─────────────────── */
  useEffect(() => {
    return () => {
      if (preview.url) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview.url]);

  /* ── Header handlers ──────────────────────────────────────────────────── */
  const fnLogOut = (props) => {
    Swal.fire({
      title: props === "Logout" ? "Are you sure you want to logout?" : "Are you sure you want to close?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) navigate("/");
    });
  };

  /* ── Action 1: enter marks for the clicked student ────────────────────── */
  const handleOpenMarks = (id) => () => {
    const student = students.find((s) => s.RecordID === id);
    if (!student) return;

    setActiveStudent(student);
    setSubjectRows([]); // clear previous student's rows while loading
    setMarksOpen(true);

    dispatch(
      promototioStudMarksGET({
        StudentID: student.StudentID, // StudentID of the clicked row
        ProjectID,
        CompanyID,
        TermID: termid,
      }),
    );
  };

  /* ── Marks grid logic ─────────────────────────────────────────────────── */
  const processMarksUpdate = (newRow) => {
    const marks = Number(newRow.Marks);
    if (isNaN(marks) || marks < 0) throw new Error("Marks must be a positive number");
    if (marks > Number(newRow.OutOfMarks)) throw new Error(`Marks cannot exceed ${newRow.OutOfMarks}`);
    const updated = { ...newRow, Marks: marks };
    setSubjectRows((prev) => prev.map((r) => (r.RecordID === updated.RecordID ? updated : r)));
    return updated;
  };

  const handleMarksCellClick = (p) => {
    if (p.field !== "Marks") return;
    if (apiRef.current.getCellMode(p.id, "Marks") === "edit") return;
    apiRef.current.startCellEditMode({ id: p.id, field: "Marks" });
  };

  const handleSaveMarks = async () => {
    if (!subjectRows.length) {
      toast.error("No records to save");
      return;
    }

    // A cell that is still in edit mode must be committed first
    const stillEditing = Object.entries(apiRef.current.state?.editRows || {}).length > 0;
    if (stillEditing) {
      toast.error("Please finish editing the marks (press Enter) before saving");
      return;
    }

    const idata = subjectRows.map((row) => ({
      RecordID: row.RecordID,
      Marks: row.Marks || 0,
      OutOfMarks: row.OutOfMarks || 0,
      StudentID: activeStudent?.StudentID, // API template rows come with StudentID "0"
      TermID: termid,
    }));

    setSaving(true);
    try {
      const response = await dispatch(
        promotionstudmarksupdate({ idata: { StudentMarks: idata } }),
      );

      if (response.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        setMarksOpen(false);
      } else {
        toast.error(response.payload?.Msg || "Save failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ── Action 2: report card -> preview first, download from the preview ── */
  const handlePreviewReport = (id) => async () => {
    if (pdfBusy) return;
    const student = students.find((s) => s.RecordID === id);
    if (!student) return;

    setPdfBusy(true);
    const toastId = toast.loading("Generating report card...");
    try {
      const res = await dispatch(
        StudentReportcardget({
          StudentID: student.StudentID,
          StandardID: ProjectID,
          CompanyID,
          TermID: termid,
        }),
      );

      const response = res?.payload;
      if (response?.Status !== "Y" || !response?.Data?.subjects?.length) {
        throw new Error(response?.Msg || "No marks found for this student");
      }

      const blob = await pdf(
        <ReportCard
          data={response}
          assetBase={`${baseurl}/uploads/images/`} // base URL for school.logoUrl
        />,
      ).toBlob();

      const name = response.Data.student?.name || student.StudentName;
      const fileName = `ReportCard_${name}_${response.Data.term?.termName || termName}.pdf`;

      // free the previous preview (if any), then open the new one
      if (preview.url) URL.revokeObjectURL(preview.url);
      setPreview({ open: true, url: URL.createObjectURL(blob), blob, fileName });
      toast.dismiss(toastId);
    } catch (e) {
      console.error(e);
      toast.error(e.message || "Failed to generate report card", { id: toastId });
    } finally {
      setPdfBusy(false);
    }
  };

  const handleClosePreview = () => {
    if (preview.url) URL.revokeObjectURL(preview.url);
    setPreview(EMPTY_PREVIEW);
  };

  const handleDownloadFromPreview = () => {
    if (!preview.blob) return;
    const url = URL.createObjectURL(preview.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = preview.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("Report card downloaded");
  };

  /* ── Columns ──────────────────────────────────────────────────────────── */
  const studentColumns = [
    { field: "RecordID", headerName: "Record ID", width: 100, hide: true },
    { field: "Code", headerName: "Roll No", width: 120, headerAlign: "center" },
    {
      field: "StudentName",
      headerName: "Student",
      width: 500,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      getActions: ({ id }) => [
        <Tooltip title="Enter Marks" key="marks">
          <GridActionsCellItem
            icon={<AssignmentTurnedInIcon sx={{ color: "#3a9e9e" }} />}
            label="Enter Marks"
            onClick={handleOpenMarks(id)}
          />
        </Tooltip>,
        <Tooltip title="Preview Report Card" key="pdf">
          <GridActionsCellItem
            icon={<PictureAsPdfIcon sx={{ color: "#d32f2f" }} />}
            label="Preview Report Card"
            onClick={handlePreviewReport(id)}
          />
        </Tooltip>,
      ],
    },
  ];

  const marksColumns = [
    { field: "RecordID", headerName: "Record ID", width: 100, hide: true },
    {
      field: "SLNO",
      headerName: "SL#",
      width: 70,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (p) => p.api.getRowIndexRelativeToVisibleRows(p.id) + 1,
    },
    { field: "SubjectName", headerName: "Subjects", flex: 1, minWidth: 200, headerAlign: "center", editable: false },
    {
      field: "Marks",
      headerName: "Marks",
      type: "number",
      width: 140,
      headerAlign: "center",
      align: "left",
      editable: true, // the ONLY input column
    },
    {
      field: "OutOfMarks",
      headerName: "Out Of Marks",
      type: "number",
      width: 140,
      headerAlign: "center",
      align: "left",
      editable: false,
    },
  ];

  /* ── Shared grid styling ──────────────────────────────────────────────── */
  const tealGridSx = {
    "& .MuiDataGrid-root": { border: "none" },
    "& .MuiDataGrid-columnHeaders": { backgroundColor: "#3a9e9e", color: "#fff" },
    "& .MuiDataGrid-columnHeaderTitle": { color: "#fff", fontWeight: 600 },
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    "& .MuiDataGrid-footerContainer": { backgroundColor: "#3a9e9e", color: "#fff" },
    "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectIcon, & .MuiTablePagination-actions button":
      { color: "#fff" },
    "& .even-row": { backgroundColor: "#d9f0ef" },
  };

  const StudentsToolbar = () => (
    <GridToolbarContainer sx={{ mb: "10px", justifyContent: "flex-start" }}>
      <Typography variant="body2" sx={{ color: "#1976d2" }}>
        Total Students : {students.length}
      </Typography>
    </GridToolbarContainer>
  );

  const MarksToolbar = () => (
    <GridToolbarContainer sx={{ mb: "10px" }}>
      <Typography variant="h6" fontWeight={700}>
        List Of Assessments ({subjectRows.length})
        {activeStudent ? ` — ${activeStudent.StudentName}` : ""}
      </Typography>
    </GridToolbarContainer>
  );

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <React.Fragment>
      {promotiongetloading || pdfBusy ? <LinearProgress /> : false}

      {/* Page header */}
      <Paper
        elevation={0}
        sx={{ mx: 2, mt: 1, mb: 1, p: 1, borderRadius: 3, border: "1px solid #E5E7EB", bgcolor: "#fff" }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111827", px: 1, py: 0.2 }}>
                Report Card
              </Typography>
              <Breadcrumbs
                maxItems={4}
                separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                sx={breadcrumbStyles.separator}
              >
                <Typography sx={breadcrumbStyles.item} onClick={() => navigate("/Apps/TR374/Academic%20Year")}>
                  {`Academic Year(${academicYear})`}
                </Typography>
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() =>
                    navigate(`/Apps/SecondarylistView/TR375/Terms/${rowData.AcademicYearID}`, {
                      state: { ...rowData, termName: termName, termid: termid },
                    })
                  }
                >
                  {`Terms(${termName})`}
                </Typography>
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() =>
                    navigate(
                      `/Apps/SecondarylistView/TR275/Standard/${rowData.AcademicYearID}/${termid}/${termName}`,
                      {
                        state: { ...rowData, termName: termName, termid: termid },
                      },
                    )
                  }
                >
                  {`Standard/Activities(${standardName})`}
                </Typography>
                <Typography sx={breadcrumbStyles.active}>Report Card</Typography>
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

      {/* Students grid */}
      <Box sx={{ p: 1 }}>
        <Paper
          elevation={3}
          sx={{ margin: "10px", backgroundColor: "#fff", border: "1px solid #b9bcc0", borderRadius: 3 }}
        >
          <Box display="flex" alignItems="center" gap={1} m={2}>
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
              <Typography sx={{ fontSize: 16 }}>📝</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {`Grading - ${standardName} - ${termName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter subject marks for each student and preview / download their report card.
              </Typography>
            </Box>
          </Box>

          <Box
            padding={1}
            height={"50vh"}
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
                backgroundColor: "",
                color: "",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: colors.blueAccent[900],
                fontWeight: 600,
              },
              /* PAGINATION STYLES (WHITE COLOR) */
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
              "& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount": {
                color: "#fff !important",
                fontWeight: 500,
              },
              "& .promoted-row": {
                backgroundColor: "#e0f7fa",
                color: "#555",
              },
              "& .promoted-row:hover": {
                backgroundColor: "#b2ebf2",
              },
            }}
          >
            <DataGrid
              rows={students}
              columns={studentColumns}
              getRowId={(row) => row.RecordID}
              loading={promotiongetloading}
              disableSelectionOnClick
              components={{ Toolbar: StudentsToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              pageSize={pageSize}
              onPageSizeChange={(n) => setPageSize(n)}
              getRowClassName={(p) => (p.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row")}
              rowHeight={dataGridRowHeight}
              headerHeight={dataGridHeaderFooterHeight}
              sx={{
                "& .MuiDataGrid-footerContainer": {
                  height: dataGridHeaderFooterHeight,
                  minHeight: dataGridHeaderFooterHeight,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
            m={1}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                bgcolor: "#F97316",
                "&:hover": {
                  bgcolor: "#EA580C",
                },
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* ───────── Marks entry dialog ───────── */}
      <Dialog
        open={marksOpen}
        onClose={() => setMarksOpen(false)}
        fullWidth
        PaperProps={{ sx: { width: 700, maxWidth: "95%", p: 2, overflow: "visible" } }}
      >
        <IconButton
          onClick={() => setMarksOpen(false)}
          sx={{
            position: "absolute",
            top: -14,
            right: -14,
            bgcolor: "#ef4444",
            color: "#fff",
            borderRadius: 2,
            "&:hover": { bgcolor: "#dc2626" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box padding={1} height={dataGridHeightExplore} sx={tealGridSx}>
          <DataGrid
            apiRef={apiRef}
            rows={subjectRows}
            columns={marksColumns}
            loading={promotionstudmarksgetloading}
            getRowId={(row) => row.RecordID}
            editMode="cell"
            experimentalFeatures={{ newEditingApi: true }}
            isCellEditable={(p) => p.field === "Marks"}
            processRowUpdate={processMarksUpdate}
            onProcessRowUpdateError={(e) => toast.error(e.message)}
            onCellClick={handleMarksCellClick}
            disableSelectionOnClick
            components={{ Toolbar: MarksToolbar }}
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            pageSize={marksPageSize}
            onPageSizeChange={(n) => setMarksPageSize(n)}
            getRowClassName={(p) => (p.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row")}
            rowHeight={35}
            headerHeight={dataGridHeaderFooterHeight}
            sx={{
              "& .MuiDataGrid-footerContainer": {
                height: dataGridHeaderFooterHeight,
                minHeight: dataGridHeaderFooterHeight,
              },
            }}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2} mb={1}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveMarks}
            disabled={saving || !subjectRows.length}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              bgcolor: "#0D9488",
              "&:hover": { bgcolor: "#0F766E" },
            }}
          >
            {saving ? "Saving..." : "Save Marks"}
          </Button>
        </Box>
      </Dialog>

      {/* ───────── Report card preview dialog ───────── */}
      <Dialog
        open={preview.open}
        onClose={handleClosePreview}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { height: "92vh", borderRadius: 3, overflow: "hidden" } }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, borderBottom: "1px solid #E5E7EB", bgcolor: "#fff" }}
        >
          <Typography fontWeight={700} noWrap>
            {`Report Card Preview${
              preview.fileName ? ` - ${preview.fileName.replace(/^ReportCard_/, "").replace(/\.pdf$/, "")}` : ""
            }`}
          </Typography>
          <Box display="flex" alignItems="center">
            <Tooltip title="Download PDF">
              <IconButton onClick={handleDownloadFromPreview}>
                <PictureAsPdfIcon sx={{ color: "#d32f2f" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={handleClosePreview}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ flex: 1, bgcolor: "#525659" }}>
          {preview.url && (
            <iframe
              title="Report Card Preview"
              src={`${preview.url}#toolbar=0&navpanes=0`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default EditGradingreport;


// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Tooltip,
//   LinearProgress,
//   Paper,
//   Breadcrumbs,
//   Dialog,
// } from "@mui/material";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import SaveIcon from "@mui/icons-material/Save";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import Swal from "sweetalert2";
// import React, { useState, useEffect } from "react";
// import { pdf } from "@react-pdf/renderer";
// import ReportCard from "../SkillGlow/Pdf/Reportcard";
// import { useProSidebar } from "react-pro-sidebar";
// import {
//   DataGrid,
//   GridActionsCellItem,
//   GridToolbarContainer,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import { breadcrumbStyles,tokens } from "../../../Theme";
// import {
//   dataGridHeaderFooterHeight,
//   dataGridHeightExplore,
//   dataGridRowHeight,
// } from "../../../ui-components/utils";
// import {
//   promotionstudmarksupdate,
//   promototionGET,
//   promototioStudMarksGET,
//   StudentReportcardget,
// } from "../../../store/reducers/Formapireducer";
// import { useDispatch, useSelector } from "react-redux";
// import { useTheme } from "@emotion/react";
// import { getConfig } from "../../../config";

// /* Percentage -> grade (adjust to your school's scale) */
// const getGrade = (marks, outOf) => {
//   const pct = Number(outOf) ? (Number(marks) / Number(outOf)) * 100 : 0;
//   if (pct >= 95) return "A++";
//   if (pct >= 90) return "A+";
//   if (pct >= 80) return "A";
//   if (pct >= 70) return "B+";
//   if (pct >= 60) return "B";
//   if (pct >= 50) return "C";
//   return "D";
// };

// const GRADING_SCALE = [
//   { grade: "A++", label: "Outstanding performance" },
//   { grade: "A+", label: "Excellent" },
//   { grade: "A", label: "Very good" },
//   { grade: "B+", label: "Good" },
//   { grade: "B", label: "Satisfactory" },
// ];

// /* API returns numbers as strings ("0", "100") -> normalise for the grid */
// const normaliseMarksRows = (list = []) =>
//   list.map((r) => ({
//     ...r,
//     Marks: Number(r.Marks) || 0,
//     OutOfMarks: Number(r.OutOfMarks) || 0,
//   }));

// const EditGradingreport = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const rowData = location.state || {};
//     const config = getConfig();
//     const baseurl = config.BOS_URL;
//   const CompanyID = sessionStorage.getItem("compID");
//   const ProjectID = rowData.projectID;
//     const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   /* ── Redux data ───────────────────────────────────────────────────────── */
//   const promotiongetloading = useSelector((state) => state.formApi.promotiongetloading);
//   const students = useSelector((state) => state.formApi.promotiongetdata.Data || []);
//   const promotionstudmarksgetloading = useSelector(
//     (state) => state.formApi.promotionstudmarksgetloading,
//   );
//   const promotionstudmarksgetdata = useSelector(
//     (state) => state.formApi.promotionstudmarksgetdata.Data || [],
//   );

//   /* ── Local state ──────────────────────────────────────────────────────── */
//   const apiRef = useGridApiRef();
//   const [pageSize, setPageSize] = useState(10);
//   const [marksOpen, setMarksOpen] = useState(false);
//   const [activeStudent, setActiveStudent] = useState(null); // full student row from API
//   const [subjectRows, setSubjectRows] = useState([]); // editable copy of marks API data
//   const [marksPageSize, setMarksPageSize] = useState(20);
//   const [saving, setSaving] = useState(false);
//   const [pdfBusy, setPdfBusy] = useState(false);
//   const termid = params.termid || "";
//   const standardName = rowData.MilestoneName || "";
//   const termName = params.termName || "";
//   const academicYear = rowData.AcademicYear || "";
//   const teacherName = rowData.ClassTeacher || "";

//   /* ── Load students of the selected standard ───────────────────────────── */
//   useEffect(() => {
//     if (!CompanyID || !ProjectID) return;
//     dispatch(promototionGET({ ProjectID, CompanyID }));
//   }, [ProjectID, CompanyID, dispatch]);

//   /* ── Keep the editable marks grid in sync with the marks GET response ─── */
//   useEffect(() => {
//     setSubjectRows(normaliseMarksRows(promotionstudmarksgetdata));
//   }, [promotionstudmarksgetdata]);

//   /* ── Header handlers ──────────────────────────────────────────────────── */
//   const fnLogOut = (props) => {
//     Swal.fire({
//       title: props === "Logout" ? "Are you sure you want to logout?" : "Are you sure you want to close?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) navigate("/");
//     });
//   };

//   /* ── Action 1: enter marks for the clicked student ────────────────────── */
//   const handleOpenMarks = (id) => () => {
//     const student = students.find((s) => s.RecordID === id);
//     if (!student) return;

//     setActiveStudent(student);
//     setSubjectRows([]); // clear previous student's rows while loading
//     setMarksOpen(true);

//     dispatch(
//       promototioStudMarksGET({
//         StudentID: student.StudentID, // StudentID of the clicked row
//         ProjectID,
//         CompanyID,
//         TermID:termid
//       }),
//     );
//   };

//   /* ── Marks grid logic ─────────────────────────────────────────────────── */
//   const processMarksUpdate = (newRow) => {
//     const marks = Number(newRow.Marks);
//     if (isNaN(marks) || marks < 0) throw new Error("Marks must be a positive number");
//     if (marks > Number(newRow.OutOfMarks)) throw new Error(`Marks cannot exceed ${newRow.OutOfMarks}`);
//     const updated = { ...newRow, Marks: marks };
//     setSubjectRows((prev) => prev.map((r) => (r.RecordID === updated.RecordID ? updated : r)));
//     return updated;
//   };

//   const handleMarksCellClick = (p) => {
//     if (p.field !== "Marks") return;
//     if (apiRef.current.getCellMode(p.id, "Marks") === "edit") return;
//     apiRef.current.startCellEditMode({ id: p.id, field: "Marks" });
//   };

//   const handleSaveMarks = async () => {
//     if (!subjectRows.length) {
//       toast.error("No records to save");
//       return;
//     }

//     // Commit a cell that is still in edit mode so its value is included
//     const stillEditing = Object.entries(apiRef.current.state?.editRows || {}).length > 0;
//     if (stillEditing) {
//       toast.error("Please finish editing the marks (press Enter) before saving");
//       return;
//     }

//     const idata = subjectRows.map((row) => ({
//       RecordID: row.RecordID,
//       Marks: row.Marks || 0,
//       OutOfMarks: row.OutOfMarks || 0,
//       StudentID: activeStudent?.StudentID, // API template rows come with StudentID "0"
//       TermID: termid,
//     }));

//     setSaving(true);
//     try {
//       const response = await dispatch(
//         promotionstudmarksupdate({ idata: { StudentMarks: idata } }),
//       );

//       if (response.payload?.Status === "Y") {
//         toast.success(response.payload.Msg);
//     //      dispatch(
//     //   promototioStudMarksGET({
//     //     StudentID: activeStudent?.StudentID, // StudentID of the clicked row
//     //     ProjectID,
//     //     CompanyID,
//     //     TermID:termid
//     //   }),
//     // );
//         setMarksOpen(false);
//       } else {
//         toast.error(response.payload?.Msg || "Save failed");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ── Action 2: report card PDF (direct download) ──────────────────────── */
//   // const buildReportData = (student, subjects) => {
//   //   // Show the grade in the column of the term being graded
//   //   const t = termName.toLowerCase();
//   //   const termKey = t.includes("annual") ? "annual" : t.includes("second") ? "secondTerm" : "firstTerm";

//   //   return {
//   //     school: { name: "Little Treasures Play School", location: "Ramapuram, Chennai" }, // TODO(API)
//   //     student: { name: student?.StudentName || "" },
//   //     academicYear,
//   //     className: standardName,
//   //     classTeacher: teacherName,
//   //     subjects: subjects.map((r) => ({
//   //       name: r.SubjectName,
//   //       grades: {
//   //         firstTerm: "-",
//   //         secondTerm: "-",
//   //         annual: "-",
//   //         [termKey]: getGrade(r.Marks, r.OutOfMarks),
//   //       },
//   //     })),
//   //     gradingScale: GRADING_SCALE,
//   //     remarks: [
//   //       { text: "Needs to be more active in class." },
//   //       { text: "Good improvement. Would be better if more attentive." },
//   //       { text: "All the best for next term." },
//   //     ], // TODO(API)
//   //     signatures: { parent: {}, teacher: {} },
//   //   };
//   // };

//   // const handleDownloadReport = (id) => async () => {
//   //   if (pdfBusy) return;
//   //   const student = students.find((s) => s.RecordID === id);
//   //   if (!student) return;

//   //   setPdfBusy(true);
//   //   const toastId = toast.loading("Generating report card...");
//   //   try {
//   //     // Fetch this student's saved marks
//   //     const res = await dispatch(
//   //       StudentReportcardget({ StudentID: student.StudentID, StandardID: ProjectID, CompanyID,TermID:termid }),
//   //     );
//   //     const subjects = normaliseMarksRows(res?.payload?.Data || []);
//   //     if (!subjects.length) throw new Error("No marks found for this student");

//   //     const blob = await pdf(<ReportCard data={buildReportData(student, subjects)} />).toBlob();
//   //     const url = URL.createObjectURL(blob);
//   //     const a = document.createElement("a");
//   //     a.href = url;
//   //     a.download = `ReportCard_${student.StudentName}.pdf`;
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     a.remove();
//   //     URL.revokeObjectURL(url);
//   //     toast.success("Report card downloaded", { id: toastId });
//   //   } catch (e) {
//   //     console.error(e);
//   //     toast.error(e.message || "Failed to generate report card", { id: toastId });
//   //   } finally {
//   //     setPdfBusy(false);
//   //   }
//   // };
// /* ── Action 2: report card PDF (direct download) ──────────────────────── */
// const handleDownloadReport = (id) => async () => {
//   if (pdfBusy) return;
//   const student = students.find((s) => s.RecordID === id);
//   if (!student) return;

//   setPdfBusy(true);
//   const toastId = toast.loading("Generating report card...");
//   try {
//     const res = await dispatch(
//       StudentReportcardget({
//         StudentID: student.StudentID,
//         StandardID: ProjectID,
//         CompanyID,
//         TermID: termid,
//       }),
//     );

//     const response = res?.payload;
//     if (response?.Status !== "Y" || !response?.Data?.subjects?.length) {
//       throw new Error(response?.Msg || "No marks found for this student");
//     }

//     const blob = await pdf(
//       <ReportCard
//         data={response}
//         assetBase={`${baseurl}/uploads/images/`} // base URL for school.logoUrl
//       />,
//     ).toBlob();

//     const name = response.Data.student?.name || student.StudentName;
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `ReportCard_${name}_${response.Data.term?.termName || termName}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//     toast.success("Report card downloaded", { id: toastId });
//   } catch (e) {
//     console.error(e);
//     toast.error(e.message || "Failed to generate report card", { id: toastId });
//   } finally {
//     setPdfBusy(false);
//   }
// };
//   /* ── Columns ──────────────────────────────────────────────────────────── */
//   const studentColumns = [
//     { field: "RecordID", headerName: "Record ID", width: 100, hide: true },
//     { field: "Code", headerName: "Roll No", width: 120, headerAlign: "center" },
//     { field: "StudentName", headerName: "Student", 
//       // flex: 1, 
//       width: 500, headerAlign: "center" },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 130,
//       getActions: ({ id }) => [
//         <Tooltip title="Enter Marks" key="marks">
//           <GridActionsCellItem
//             icon={<AssignmentTurnedInIcon sx={{ color: "#3a9e9e" }} />}
//             label="Enter Marks"
//             onClick={handleOpenMarks(id)}
//           />
//         </Tooltip>,
//         <Tooltip title="Report Card PDF" key="pdf">
//           <GridActionsCellItem
//             icon={<PictureAsPdfIcon sx={{ color: "#d32f2f" }} />}
//             label="Report Card PDF"
//             onClick={handleDownloadReport(id)}
//           />
//         </Tooltip>,
//       ],
//     },
//   ];

//   const marksColumns = [
//     { field: "RecordID", headerName: "Record ID", width: 100, hide: true },
//     {
//       field: "SLNO",
//       headerName: "SL#",
//       width: 70,
//       headerAlign: "center",
//       align: "right",
//       sortable: false,
//       filterable: false,
//       valueGetter: (p) => p.api.getRowIndexRelativeToVisibleRows(p.id) + 1,
//     },
//     { field: "SubjectName", headerName: "Subjects", flex: 1, minWidth: 200, headerAlign: "center", editable: false },
//     {
//       field: "Marks",
//       headerName: "Marks",
//       type: "number",
//       width: 140,
//       headerAlign: "center",
//       align: "left",
//       editable: true, // the ONLY input column
//     },
//     {
//       field: "OutOfMarks",
//       headerName: "Out Of Marks",
//       type: "number",
//       width: 140,
//       headerAlign: "center",
//       align: "left",
//       editable: false,
//     },
//   ];

//   /* ── Shared grid styling ──────────────────────────────────────────────── */
//   const tealGridSx = {
//     "& .MuiDataGrid-root": { border: "none" },
//     "& .MuiDataGrid-columnHeaders": { backgroundColor: "#3a9e9e", color: "#fff" },
//     "& .MuiDataGrid-columnHeaderTitle": { color: "#fff", fontWeight: 600 },
//     "& .MuiDataGrid-columnSeparator": { display: "none" },
//     "& .MuiDataGrid-footerContainer": { backgroundColor: "#3a9e9e", color: "#fff" },
//     "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectIcon, & .MuiTablePagination-actions button":
//       { color: "#fff" },
//     "& .even-row": { backgroundColor: "#d9f0ef" },
//   };

//   const StudentsToolbar = () => (
//     <GridToolbarContainer sx={{ mb: "10px", justifyContent: "flex-start" }}>
//       <Typography variant="body2" sx={{ color: "#1976d2" }}>
//         Total Students : {students.length}
//       </Typography>
//     </GridToolbarContainer>
//   );

//   const MarksToolbar = () => (
//     <GridToolbarContainer sx={{ mb: "10px" }}>
//       <Typography variant="h6" fontWeight={700}>
//         List Of Assessments ({subjectRows.length})
//         {activeStudent ? ` — ${activeStudent.StudentName}` : ""}
//       </Typography>
//     </GridToolbarContainer>
//   );

//   /* ── Render ───────────────────────────────────────────────────────────── */
//   return (
//     <React.Fragment>
//       {promotiongetloading || pdfBusy ? <LinearProgress /> : false}

//       {/* Page header */}
//       <Paper
//         elevation={0}
//         sx={{ mx: 2, mt: 1, mb: 1, p: 1, borderRadius: 3, border: "1px solid #E5E7EB", bgcolor: "#fff" }}
//       >
//         <Box display="flex" justifyContent="space-between">
//           <Box display="flex" alignItems="center">
//             {broken && !rtl && (
//               <IconButton onClick={() => toggleSidebar()}>
//                 <MenuOutlinedIcon />
//               </IconButton>
//             )}
//             <Box>
//               <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111827", px: 1, py: 0.2 }}>
//                 Report Card
//               </Typography>
//               <Breadcrumbs
//                 maxItems={4}
//                 separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
//                 sx={breadcrumbStyles.separator}
//               >
//                 <Typography sx={breadcrumbStyles.item} onClick={() => navigate("/Apps/TR374/Academic%20Year")}>
//                   {`Academic Year(${academicYear})`}
//                 </Typography>
//                 <Typography
//                   sx={breadcrumbStyles.item}
//                   onClick={() =>
//                     navigate(`/Apps/SecondarylistView/TR375/Terms/${rowData.AcademicYearID}`, {
//                       state: { ...rowData,termName:termName,termid:termid },
//                     })
//                   }
//                 >
//                   {`Terms(${termName})`}
//                 </Typography>
//                 <Typography
//                   sx={breadcrumbStyles.item}
//                   onClick={() =>
//                     navigate(`/Apps/SecondarylistView/TR275/Standard/${rowData.AcademicYearID}/${termid}/${termName}`, {
//                     //  /Apps/Secondarylistview/TR275/Standard/60/277/Term%201
                     
//                       state: { ...rowData,termName:termName,termid:termid },
//                     })
//                   }
//                 >
//                   {`Standard/Activities(${standardName})`}
//                 </Typography>
//                 <Typography sx={breadcrumbStyles.active}>Report Card</Typography>
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

//       {/* Students grid */}
//       <Box sx={{ p: 1 }}>
//         <Paper
//           elevation={3}
//           sx={{ margin: "10px", backgroundColor: "#fff", border: "1px solid #b9bcc0", borderRadius: 3 }}
//         >
//           <Box display="flex" alignItems="center" gap={1} m={2}>
//             <Box
//               sx={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: "50%",
//                 backgroundColor: "#EFF6FF",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Typography sx={{ fontSize: 16 }}>📝</Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle1" fontWeight={700}>
//                 {`Grading - ${standardName} - ${termName}`}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Enter subject marks for each student and download their report card.
//               </Typography>
//             </Box>
//           </Box>

         
//             <Box
//                                     padding={1}
//                                     height={"50vh"}
//                                     // height={dataGridHeightExplore}
//                                     sx={{
//                                       "& .MuiDataGrid-root": {
//                                         border: "none",
//                                       },
//                                       "& .cell-negative-status": {
//                                         color: colors.redAccent[500],
//                                         fontWeight: 600,
//                                       },
//                                       "& .cell-positive-status": {
//                                         color: colors.greenAccent[400],
//                                         fontWeight: 600,
//                                       },
//                                       "& .MuiDataGrid-cell": {
//                                         borderBottom: "none",
//                                       },
//                                       "& .name-column--cell": {
//                                         color: colors.greenAccent[300],
//                                       },
//                                       "& .MuiDataGrid-columnHeaders": {
//                                         backgroundColor: colors.blueAccent[800],
//                                         // backgroundColor: "#25adad",
//                                         borderBottom: "none",
//                                       },
//                                       "& .MuiDataGrid-virtualScroller": {
//                                         backgroundColor: colors.primary[400],
//                                       },
//                                       "& .MuiDataGrid-footerContainer": {
//                                         borderTop: "none",
//                                         backgroundColor: colors.blueAccent[800],
//                                         // borderColor: "#d0edec",
//                                         // backgroundColor: "",
//                                       },
//                                       "& .MuiCheckbox-root": {
//                                         color: `${colors.greenAccent[200]} !important`,
//                                       },
//                                       "& .odd-row": {
//                                         backgroundColor: "",
//                                         color: "", // Color for odd rows
//                                       },
//                                       "& .even-row": {
//                                         // backgroundColor: "#d0edec",
//                                         backgroundColor: "",
//                                         color: "", // Color for even rows
//                                       },
            
//                                       "& .MuiDataGrid-columnHeaderTitle": {
//                                         color: colors.blueAccent[900],
//                                         fontWeight: 600,
//                                       },
//                                       "& .MuiTablePagination-root": {
//                                         color: colors.blueAccent[900],
//                                       },
//                                       /* ✅ PAGINATION STYLES (WHITE COLOR) */
//                                       "& .MuiTablePagination-root": {
//                                         color: "#fff",
//                                       },
            
//                                       "& .MuiTablePagination-selectLabel": {
//                                         color: "#fff",
//                                       },
            
//                                       "& .MuiTablePagination-displayedRows": {
//                                         color: "#fff",
//                                       },
            
//                                       /* Dropdown icon */
//                                       "& .MuiTablePagination-selectIcon": {
//                                         color: "#fff",
//                                       },
            
//                                       /* Left & Right arrow buttons */
//                                       "& .MuiTablePagination-actions button": {
//                                         color: "#fff",
//                                       },
//                                       "& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount":
//                                       {
//                                         color: "#fff !important",
//                                         fontWeight: 500,
//                                       },
            
//                                        "& .promoted-row": {
//                 backgroundColor: "#e0f7fa", // light cyan
//                 color: "#555",
//               },
//               "& .promoted-row:hover": {
//                 backgroundColor: "#b2ebf2",
//               },
//                                     }}
//                                   >
//                                     <DataGrid
//               rows={students}
//               columns={studentColumns}
//               getRowId={(row) => row.RecordID}
//               loading={promotiongetloading}
//               disableSelectionOnClick
//               components={{ Toolbar: StudentsToolbar }}
//               rowsPerPageOptions={[5, 10, 20]}
//               pagination
//               pageSize={pageSize}
//               onPageSizeChange={(n) => setPageSize(n)}
//               getRowClassName={(p) => (p.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row")}
//               rowHeight={dataGridRowHeight}
//               headerHeight={dataGridHeaderFooterHeight}
//               sx={{
//                 "& .MuiDataGrid-footerContainer": {
//                   height: dataGridHeaderFooterHeight,
//                   minHeight: dataGridHeaderFooterHeight,
//                 },
//               }}
//             />
//           </Box>
         
//            <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end", // 👉 moves to right end
//                 gap: 2,
//                 mt: 2,
//               }}
//               m={1}
//             >
//               <Button
//             variant="contained"
//             sx={{
//               textTransform: "none",
//               borderRadius: 2,
//               px: 4,
//               bgcolor: "#F97316",
//               "&:hover": {
//                 bgcolor: "#EA580C",
//               },
//             }}
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </Button>
//             </Box>
//         </Paper>
//       </Box>

//       {/* ───────── Marks entry dialog ───────── */}
//       <Dialog
//         open={marksOpen}
//         onClose={() => setMarksOpen(false)}
//         fullWidth
//         PaperProps={{ sx: { width: 700, maxWidth: "95%", p: 2, overflow: "visible" } }}
//       >
//         <IconButton
//           onClick={() => setMarksOpen(false)}
//           sx={{
//             position: "absolute",
//             top: -14,
//             right: -14,
//             bgcolor: "#ef4444",
//             color: "#fff",
//             borderRadius: 2,
//             "&:hover": { bgcolor: "#dc2626" },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <Box padding={1} height={dataGridHeightExplore} sx={tealGridSx}>
//           <DataGrid
//             apiRef={apiRef}
//             rows={subjectRows}
//             columns={marksColumns}
//             loading={promotionstudmarksgetloading}
//             getRowId={(row) => row.RecordID}
//             editMode="cell"
//             experimentalFeatures={{ newEditingApi: true }}
//             isCellEditable={(p) => p.field === "Marks"}
//             processRowUpdate={processMarksUpdate}
//             onProcessRowUpdateError={(e) => toast.error(e.message)}
//             onCellClick={handleMarksCellClick}
//             disableSelectionOnClick
//             components={{ Toolbar: MarksToolbar }}
//             rowsPerPageOptions={[10, 20, 50]}
//             pagination
//             pageSize={marksPageSize}
//             onPageSizeChange={(n) => setMarksPageSize(n)}
//             getRowClassName={(p) => (p.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row")}
//             rowHeight={35}
//             headerHeight={dataGridHeaderFooterHeight}
//             sx={{
//               "& .MuiDataGrid-footerContainer": {
//                 height: dataGridHeaderFooterHeight,
//                 minHeight: dataGridHeaderFooterHeight,
//               },
//             }}
//           />
//         </Box>

//         <Box display="flex" justifyContent="flex-end" mt={2} mb={1}>
//           <Button
//             variant="contained"
//             startIcon={<SaveIcon />}
//             onClick={handleSaveMarks}
//             disabled={saving || !subjectRows.length}
//             sx={{
//               textTransform: "none",
//               borderRadius: 2,
//               px: 4,
//               bgcolor: "#0D9488",
//               "&:hover": { bgcolor: "#0F766E" },
//             }}
//           >
//             {saving ? "Saving..." : "Save Marks"}
//           </Button>
//         </Box>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default EditGradingreport;


