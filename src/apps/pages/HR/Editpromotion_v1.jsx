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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
  promotionstudmarksupdate,
  promotionupdate,
  promototionGET,
  promototionprojGET,
  promototioStudMarksGET,
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
  PromotionprojAutocomplete,
  SprintEmpAutocomplete,
  SprintEmpAutocomplete1,
} from "../../../ui-components/global/Autocomplete";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditStopReasons,
  GridRowModes,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { breadcrumbStyles, tokens } from "../../../Theme";
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
import GradingIcon from '@mui/icons-material/Grading';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import { nanoid } from "@reduxjs/toolkit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Editpromotion_v1 = () => {
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
  const [editedAssessmentRows, setEditedAssessmentRows] = useState({});

  const [passrecid, setPassrecid] = useState(null);
  const [detailrecid, setDetailrecid] = useState(null);

  const promotiongetloading = useSelector(
    (state) => state.formApi.promotiongetloading,
  );
  const promoterows = useSelector(
    (state) => state.formApi.promotiongetdata.Data || [],
  );

  console.log(promoterows, "---find promotiongetdata");

  const [rows, setRows] = useState([]); // Pool grid (not yet promoted)
  const [selectionModel, setSelectionModel] = useState([]);

  const [assignedRows, setAssignedRows] = useState([]); // "Already assigned" grid
  const [selectionModelAssigned, setSelectionModelAssigned] = useState([]);

  console.log(assignedRows, "--find assigned rows in promotion");

  //ASSESMENT_DIALOG_SECTION

  const promotionstudmarksgetloading = useSelector(
    (state) => state.formApi.promotionstudmarksgetloading,
  );
  const promotionstudmarksgetdata = useSelector(
    (state) => state.formApi.promotionstudmarksgetdata.Data || [],
  );
  console.log(promotionstudmarksgetdata, "--find promotionstudmarksgetdata");

  const [rowModesModelAssesment, setrowModesModelAssesment] = React.useState(
    {},
  );
  const isRowEditing = Object.values(rowModesModelAssesment).some(
    (row) => row.mode === GridRowModes.Edit,
  );
  const [rowsassmnt, setRowsAssmnt] = useState([]);









    const promotionSTDgetdata = useSelector(
    (state) => state.formApi.promotionSTDgetdata.data || [],
  );
  console.log(promotionSTDgetdata, "--find lookup promotionSTDgetdata");


  useEffect(() => {
    if (promoterows.length > 0) {
      setRows(promoterows);

      // ✅ Auto select rows where IsPromoted === "Y"
      const selectedIds = promoterows
        .filter((row) => row.IsPromoted === "Y")
        .map((row) => row.RecordID);

      setSelectionModel(selectedIds);


  // const promotedOnly = promoterows
  //   .filter((row) => row.Status === "Promoted")
  //   .map((row) => ({
  //     ...row,
  //     Standard: row.PromotedStandardName || row.Standard || "", // ✅ adjust to whatever field name your API returns
  //   }));

const promotedOnly = promoterows
  .filter((row) => row.Status === "Promoted")
  .map((row) => {
    const promotedStdId =
      row.PromotedStandardID ?? row.StandardID ?? row.PromotedStandard ?? null;
console.log(promotedStdId, "-find promotedStdId in promotedStdId");

    const matchedStandard = promotionSTDgetdata.find(
      (std) => String(std.RecordID) === String(promotedStdId),
    );

    return {
      ...row,
      Standard: matchedStandard?.Name || row.Standard || row.StandardName || "",
    };
  });



setAssignedRows(promotedOnly);


    }
  }, [promoterows, promotionSTDgetdata]);

// useEffect(() => {
//   if (promoterows.length > 0) {
//     const alreadyPromoted = promoterows
//       .filter((row) => row.Status === "Promoted")
//       .map((row) => ({
//         ...row,
//         Standard: row.PromotedStandardName || row.Standard || "", // ✅ use whatever field your API returns for the promoted standard name
//       }));

//     const pool = promoterows.filter((row) => row.Status !== "Promoted");

//     setAssignedRows(alreadyPromoted);
//     setRows(pool);
//     setSelectionModel([]);
//     setSelectionModelAssigned([]);
//   }
// }, [promoterows]);



  //Marks_Assessment_GET
  useEffect(() => {
    if (promotionstudmarksgetdata.length > 0) {
      setRowsAssmnt(promotionstudmarksgetdata);
    }
  }, [promotionstudmarksgetdata]);

  const rowData = location.state || {};
  console.log(rowData, "--find state rowData");

  var screenName = rowData.name;

  const DeptLookupCheck = data.RoutineTasks === "Y" ? "A" : "S";

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



  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    if (!CompanyID || !(rowData?.projectID || recID)) return;

    const ProjectID = rowData.projectID || recID;

    dispatch(promototionGET({ ProjectID, CompanyID }));
    dispatch(promototionprojGET({ ProjectID, CompanyID }));
  }, [rowData?.projectID, CompanyID, recID, dispatch]);

  // ─── Units DataGrid state ─────────────────────────────────────────────────────
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (RecordID) => () => {
    setrowModesModelAssesment({
      ...rowModesModelAssesment,
      [RecordID]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (RecordID) => () => {
    setrowModesModelAssesment({
      ...rowModesModelAssesment,
      [RecordID]: { mode: GridRowModes.View },
    });
  };
  const handleCancelClick = (RecordID) => () => {
    setrowModesModelAssesment({
      ...rowModesModelAssesment,
      [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rowsassmnt.find((row) => row.RecordID === RecordID);
    if (editedRow.isNew) {
      setRowsAssmnt(rowsassmnt.filter((row) => row.RecordID !== RecordID));
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    const isNew = oldRow?.RecordID && isNaN(Number(oldRow.RecordID));
    const updatedRow = { ...newRow, isNew };
    setRows((prev) => {
      const index = prev.findIndex((row) => row.RecordID === newRow.RecordID);
      const updated = [...prev];
      updated[index] = updatedRow;
      return updated;
    });

    console.log(updatedRow, "--processrowupdate in updatedRow");

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

  const is003 = SubscriptionCode?.endsWith("003");
  const formikRef = useRef();

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

  const handleEditClicknew = (id) => () => {
    const student = promoterows.find((r) => r.RecordID === id);
    console.log(student, "--find student in marks get");
    
    dispatch(
      promototioStudMarksGET({
        StudentID: student.StudentID,
        ProjectID: rowData.projectID || recID,
        CompanyID: CompanyID,
      }),
    );

    setMarksDialogStudent(student);
    setSelectednewSubject("");
    setMarksValue(0);
    setOutOfValue(100);
    setSavedMarksRecords(student?.marksRecords || []); // prefill if already saved earlier
    setMarksDialogOpen(true);
  };

  const handleMarksDialogDone = () => {
    // Persist savedMarksRecords back onto the row / call your save API here
    console.log(
      "Saving marks for",
      marksDialogStudent?.Name,
      savedMarksRecords,
    );
    setMarksDialogOpen(false);
  };

  const apiRef = useGridApiRef();

  const handleCellClick = (params) => {
    // ignore clicks on selection checkbox / actions column - not part of "row data"
    if (params.field === "__check__" || params.field === "actions") return;

    // already editing this row's Reason cell? do nothing
    // if (apiRef.current.getCellMode(params.id, "Reason") === "edit") return;

    // start editing the Reason cell of whatever row was clicked,
    // regardless of which column the user actually clicked on
    apiRef.current.startCellEditMode({ id: params.id, field: "Reason" });
  };
  const handleCellEditStop = (params, event) => {
    console.log("handleCellEditStop", params);
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      // let it proceed normally — don't set event.defaultMuiPrevented = true here,
      // otherwise the save on outside-click won't happen
    }
  };

  const promotecolumn1 = [
    { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
    {
      field: "SLNO",
      headerName: "SL#",
      width: 50,
      hide: true,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      headerName: "Roll No",
      field: "Code",
      width: 100,
      hide: false,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        if (YearFlag == "true" && (!params.value || params.row.isNew))
          return "Auto Code";
        return params.value;
      },
    },
    {
      headerName: "StudentID",
      field: "StudentID",
      width: 250,
      hide: true,
      headerAlign: "center",
    },
    {
      headerName: (
        <span>
          Student
          {/* <span style={{ color: "red" }}>*</span> */}
        </span>
      ),
      field: "StudentName",
      width: 350,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    {
      headerName: "Reason",
      field: "Reason",
      width: 250,
      hide: false,
      editable: true,
      headerAlign: "center",
    },
    {
      headerName: "Status",
      field: "Status",
      width: 200,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
    
            <GridActionsCellItem
             icon={
          <Tooltip title="Mark Assessment">
            <AddTaskIcon sx={{ color: "#3a9e9e" }} />
          </Tooltip>
        }
              label="Mark Assessment"
              className="textPrimary"
              color="inherit"
              onClick={handleEditClicknew(id)}
            />
            ,
              <Tooltip title="Marksheet">
             <GridActionsCellItem
                          icon={
                           <Tooltip title="Marksheet">
                          <GradingIcon />
                           </Tooltip>
                          }
                          label="Marksheet"
                          className="textPrimary"
                          // onClick={handleCancelClickTeach(id)}
                          color="warning"
                        />
                        </Tooltip>,
        ];
      },
    },
  ];

  const Alreadyassignedcolumn = [
    { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
    {
      field: "SLNO",
      headerName: "SL#",
      width: 50,
      hide: true,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      headerName: "Roll No",
      field: "Code",
      width: 100,
      hide: false,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        if (YearFlag == "true" && (!params.value || params.row.isNew))
          return "Auto Code";
        return params.value;
      },
    },
    {
      headerName: "StudentID",
      field: "StudentID",
      width: 250,
      hide: true,
      headerAlign: "center",
    },
    {
      headerName: (
        <span>
          Student
          {/* <span style={{ color: "red" }}>*</span> */}
        </span>
      ),
      field: "StudentName",
      width: 350,
      hide: false,
      editable: false,
      headerAlign: "center",
    },
 {
    //    headerName: selectedPromotion
    // ? `Standard (${selectedPromotion.Name})`
    // : "Standard",
    headerName: "Standard",
  field: "Standard",
      width: 250,
      hide: false,
      editable: false,
      headerAlign: "center",
    },
    {
      headerName: "Reason",
      field: "Reason",
      width: 250,
      hide: false,
      editable: false,
      headerAlign: "center",
    },
    {
      headerName: "Status",
      field: "Status",
      width: 200,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     return [
    //       <Tooltip title="Assessment">
    //         <GridActionsCellItem
    //           icon={<AddTaskIcon sx={{ color: "#3a9e9e" }} />}
    //           label="Assessment"
    //           className="textPrimary"
    //           color="inherit"
    //           onClick={handleEditClicknew(id)}
    //         />
    //       </Tooltip>,
    //     ];
    //   },
    // },
  ];

  const handleCellClickassmnt = (params) => {
    // ignore clicks on selection checkbox / actions column - not part of "row data"
    if (params.field === "__check__" || params.field === "actions") return;

    // already editing this row's Reason cell? do nothing
    // if (apiRef.current.getCellMode(params.id, "Reason") === "edit") return;

    // start editing the Reason cell of whatever row was clicked,
    // regardless of which column the user actually clicked on
    apiRef.current.startCellEditMode({ id: params.id, field: "Reason" });
  };
  const handleCellEditStopAssmnt = (params, event) => {
    console.log("handleCellEditStop", params);
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      // let it proceed normally — don't set event.defaultMuiPrevented = true here,
      // otherwise the save on outside-click won't happen
    }
  };

  const alreadyAssignedRows = useMemo(
    () => rows.filter((row) => row.IsPromoted === "Y"),
    [rows],
  );
  console.log(alreadyAssignedRows, "--find alreadyAssignedRows");

  // Students not currently checked/selected in the grid
  const studentsRemainingInPool = useMemo(
    () => rows.length - selectionModel.length,
    [rows, selectionModel],
  );
  //ASSESMENT_DIALOG_SECTION
  const handleRowModesModelchangeAssesment = (newRowModesModel) => {
    setrowModesModelAssesment(newRowModesModel);
  };

  const handleRowEditStopassmnt = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdateAssment = (newRow, oldRow) => {
    const isNew = oldRow?.RecordID && isNaN(Number(oldRow.RecordID));
    const updatedRow = { ...newRow, isNew };

    setRowsAssmnt((prev) => {
      const index = prev.findIndex((row) => row.RecordID === newRow.RecordID);
      const updated = [...prev];
      updated[index] = updatedRow;
      return updated;
    });

    // Track which rows were actually edited (keyed by RecordID so re-edits overwrite, not duplicate)
    setEditedAssessmentRows((prev) => ({
      ...prev,
      [newRow.RecordID]: updatedRow,
    }));

    // ❌ removed: savemarks(newRow) — no longer fire API per cell edit
    return updatedRow;
  };

  const handleAssmntSave = async () => {
    if (!rowsassmnt.length) {
      toast.error("No records to save");
      return;
    }

    const idata = rowsassmnt.map((row) => ({
      RecordID: row.RecordID,
      Marks: row.Marks || 0,
      OutOfMarks: row.OutOfMarks || 0,
      StudentID: row.StudentID
    }));

    console.log(idata, "--SAVE MARKS PAYLOAD (array of objects)");
    // return;

    try {
      const response = await dispatch(
        promotionstudmarksupdate({ idata: { StudentMarks: idata } }),
      );

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        setEditedAssessmentRows({}); // clear tracked edits
        dispatch(
          promototioStudMarksGET({
            StudentID: marksDialogStudent?.StudentID,
            ProjectID: rowData.projectID || recID,
            CompanyID: CompanyID,
          }),
        );
        
      }
     
      else {
        toast.error(response.payload.Msg);
      }
 setMarksDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Save failed");
    }
    
  };

  // const handleAssmntSave = async () => {
  //   if (!rowsassmnt.length) {
  //     toast.error("No records to save");
  //     return;
  //   }

  //   const StudentMarks = rowsassmnt.map((row) => ({
  //     RecordID: String(row.RecordID),
  //     Marks: String(row.Marks || 0),
  //     OutOfMarks: String(row.OutOfMarks || 0),
  //   }));

  //   const payload = {
  //     StudentMarks, // ✅ matches API structure
  //   };

  //   console.log(payload, "--FINAL PAYLOAD");
  // // return;
  //   try {
  //     const response = await dispatch(
  //       promotionstudmarksupdate(payload) // ✅ send wrapped object
  //     );

  //     if (response.payload.Status === "Y") {
  //       toast.success(response.payload.Msg);
  //       setEditedAssessmentRows({});

  //       dispatch(
  //         promototioStudMarksGET({
  //           StudentID: marksDialogStudent?.RecordID,
  //           ProjectID: rowData.projectID || recID,
  //           CompanyID: CompanyID,
  //         })
  //       );
  //     } else {
  //       toast.error(response.payload.Msg);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Save failed");
  //   }
  // };
  //   const processRowUpdateAssment = (newRow, oldRow) => {
  //     const isNew = oldRow?.RecordID && isNaN(Number(oldRow.RecordID));
  //     const updatedRow = { ...newRow, isNew };

  //     setRowsAssmnt((prev) => {
  //       const index = prev.findIndex((row) => row.RecordID === newRow.RecordID);
  //       const updated = [...prev];
  //       updated[index] = updatedRow;
  //       return updated;
  //     });
  //     // fire the save using the guaranteed-fresh newRow
  //     savemarks(newRow);
  //     return updatedRow;
  //   };

  const savemarks = async (row) => {
    try {
      const payload = {
        RecordID: row.RecordID,
        Marks: row.Marks || 0,
        OutOfMarks: row.OutOfMarks || 0,
      };
      console.log(payload, "--SAVE PAYLOAD");

      const response = await dispatch(
        promotionstudmarksupdate({
          idata: payload,
        }),
      );

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(
          promototioStudMarksGET({
            StudentID: marksDialogStudent?.RecordID,
            ProjectID: rowData.projectID || recID,
            CompanyID: CompanyID,
          }),
        );
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Save failed");
    }
  };

  function EditToolbarassesment(props) {
    const { count } = props;
    // const { setRows, setRowModesModel } = props;
    // const handleClick = () => {
    //     const id = nanoid();
    //     setRows((oldRows) => [
    //         ...oldRows,
    //         { id, RecordID: id, OwnedBy: null, Name: "", Code: "", Comments: "" },
    //     ]);
    //     setRowModesModel((oldModel) => ({
    //         ...oldModel,
    //         [id]: { mode: GridRowModes.Edit, fieldToFocus: "Name" },
    //     }));
    // };
    return (
      <GridToolbarContainer
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          color="#0D94885"
          fontWeight={700}
          sx={{ cursor: "default" }}
        >
          List Of Assesments ({count})
        </Typography>

        {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Record
                </Button> */}
      </GridToolbarContainer>
    );
  }

  const Assesmentcolumns = [
    { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
    {
      field: "SLNO",
      headerName: "SL#",
      width: 10,
      hide: false,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: "ProjectID", headerName: "Project ID", width: 120, hide: true },

    {
      headerName: (
        <span>
          Subjects
          {/* <span style={{ color: "red" }}>*</span> */}
        </span>
      ),
      field: "SubjectName",
      width: 250,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    {
      headerName: "Marks",
      field: "Marks",
      width: 100,
      hide: false,
      editable: true,
      headerAlign: "center",
    },
    {
      headerName: "Out Of Marks",
      field: "OutOfMarks",
      width: 140,
      hide: false,
      editable: true,
      headerAlign: "center",
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 80,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     const isInEditMode =
    //       rowModesModelAssesment[id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           material={{ sx: { color: "primary.main" } }}
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }

    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleEditClick(id)}
    //         // onClick={handleEditClickTimeTable(id)}
    //         color="primary"
    //       />,
    //       // <GridActionsCellItem
    //       //   icon={<DeleteIcon />}
    //       //   label="Delete"
    //       //   // onClick={handleDeleteClickTimeTable(id)}
    //       //   color="error"
    //       // />,
    //     ];
    //   },
    // },
  ];

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
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          Total Students : {rows.length}
        </Typography>
      </GridToolbarContainer>
    );
  }

  function AssignedToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="body2" sx={{ color: "#1976d2" }}>
          Total Students : {assignedRows.length}
        </Typography>
      </GridToolbarContainer>
    );
  }

// const handlePromote = () => {
//   if (!selectedPromotion) return;

//   const selectedData = rows
//     .filter((row) => selectionModel.includes(row.RecordID))
//     .map((row) => ({
//       ...row,
//       Standard: selectedPromotion.Name, // ✅ add standard here
//     }));

//   setAssignedRows((prev) => [...prev, ...selectedData]);

//   // remove from first grid
//   setRows((prev) =>
//     prev.filter((row) => !selectionModel.includes(row.RecordID))
//   );

//   setSelectionModel([]);
// };

// const handlePromote = () => {
//   if (!selectedPromotion) return;
// console.log(rows, "--rows in handlepromote");

//   const selectedData = rows
//     .filter((row) => selectionModel.includes(row.RecordID))
//     .map((row) => ({
//       ...row,
//       Standard: selectedPromotion.Name,
//       PromotedStandardID: selectedPromotion.RecordID, // ✅ store per-row, not just at header level
//     }));

//     console.log(selectedData, "--find selectedData n handlepromote");
    
//   setAssignedRows((prev) => [...prev, ...selectedData]);

//   setRows((prev) =>
//     prev.filter((row) => !selectionModel.includes(row.RecordID))
//   );

//   setSelectionModel([]);
// };

const handlePromote = () => {
  if (!selectedPromotion) return;

  const selectedData = rows
    .filter(
      (row) =>
        selectionModel.includes(row.RecordID) &&
        row.Status !== "Promoted", // ✅ block already-promoted rows from being re-added
    )
    .map((row) => ({
      ...row,
      Standard: selectedPromotion.Name,
      PromotedStandardID: selectedPromotion.RecordID,
    }));

  console.log(selectedData, "--find selectedData in handlepromote");

  setAssignedRows((prev) => {
    const existingIds = new Set(prev.map((r) => r.RecordID));
    const newOnes = selectedData.filter((r) => !existingIds.has(r.RecordID)); // ✅ dedupe safety net
    return [...prev, ...newOnes];
  });

  setRows((prev) =>
    prev.filter((row) => !selectionModel.includes(row.RecordID)),
  );

  setSelectionModel([]);
};
  // const handlePromote = (values) => {
  //   if (selectionModel.length === 0) {
  //     toast.error("Please select at least one student");
  //     return;
  //   }

  //   if (!selectedPromotion) {
  //     toast.error("Please select a Standard to promote to");
  //     return;
  //   }

  //   const selectedRows = rows.filter((row) =>
  //     selectionModel.includes(row.RecordID),
  //   );
  //   const remainingRows = rows.filter(
  //     (row) => !selectionModel.includes(row.RecordID),
  //   );

  //   const promotedRows = selectedRows.map((row) => ({
  //     ...row,
  //     IsPromoted: "Y",
  //     Status: "Promoted",
  //   }));

  //   setAssignedRows((prev) => [...prev, ...promotedRows]);
  //   setRows(remainingRows);
  //   setSelectionModel([]);
  // };

  // const handlePromoteProcess = async (values) => {
  //   if (assignedRows.length === 0) {
  //     toast.error("Please promote at least one student before processing");
  //     return;
  //   }

  //   if (!selectedPromotion) {
  //     toast.error("Please select a Standard to promote to");
  //     return;
  //   }

  //   const assignedIds = new Set(assignedRows.map((r) => r.RecordID));
  //   const combined = [...assignedRows]; // for latest Reason text

  //   const idata = {
  //     header: {
  //       ProjectID: (rowData.projectID || recID)?.toString(),
  //       CompanyID: CompanyID?.toString(),
  //       PromotedStandardID: selectedPromotion?.RecordID?.toString(),
  //     },
  //     // data: promoterows.map((row) => ({
  //     //   RecordID: row.RecordID?.toString(),
  //     //   Reason:
  //     //     combined.find((r) => r.RecordID === row.RecordID)?.Reason ||
  //     //     row.Reason ||
  //     //     "",
  //     //   ispromoted: assignedIds.has(row.RecordID) ? "Y" : "N",
  //     //   StudentID: row.StudentID,
  //     // })),

  //     data: assignedRows.map((row) => ({
  //       RecordID: row.RecordID?.toString(),
  //       Reason:
  //         combined.find((r) => r.RecordID === row.RecordID)?.Reason ||
  //         row.Reason ||
  //         "",
  //       ispromoted: assignedIds.has(row.RecordID) ? "Y" : "N",
  //       StudentID: row.StudentID,
  //     })),
  //     //     data: Object.values(
  //     //   promoterows.reduce((acc, row) => {
  //     //     // keep the latest — assigned status takes priority if duplicate StudentID
  //     //     if (!acc[row.StudentID] || assignedIds.has(row.RecordID)) {
  //     //       acc[row.StudentID] = {
  //     //         RecordID: row.RecordID?.toString(),
  //     //         Reason:
  //     //           combined.find((r) => r.RecordID === row.RecordID)?.Reason ||
  //     //           row.Reason ||
  //     //           "",
  //     //         ispromoted: assignedIds.has(row.RecordID) ? "Y" : "N",
  //     //         StudentID: row.StudentID,
  //     //       };
  //     //     }
  //     //     return acc;
  //     //   }, {}),
  //     // ),
  //   };
  //   console.log(idata, "total process button idata");

  //   // return;
  //   try {
  //     const response = await dispatch(promotionupdate({ idata }));
  //     if (response.payload.Status == "Y") {
  //       toast.success(response.payload.Msg);
  //       setSelectionModel([]);
  //       setSelectionModelAssigned([]);
  //       dispatch(
  //         promototionGET({
  //           ProjectID: rowData.projectID || recID,
  //           CompanyID: CompanyID,
  //         }),
  //       );
  //     } else {
  //       toast.error(response.payload.Msg);
  //     }
  //   } catch (error) {
  //     toast.error("Error occurred while promoting students.");
  //   }
  // };
  const handlePromoteProcess = async (values) => {
  if (assignedRows.length === 0) {
    toast.error("Please promote at least one student before processing");
    return;
  }

  const idata = {
    header: {
      ProjectID: (rowData.projectID || recID)?.toString(),
      CompanyID: CompanyID?.toString(),
    },
    data: assignedRows.map((row) => ({
      RecordID: row.RecordID?.toString(),
      Reason: row.Reason || "",
      ispromoted: "Y",
      StudentID: row.StudentID,
      PromotedStandardID: row.PromotedStandardID?.toString(), // ✅ per-row, matches what you promoted them to
    })),
  };

  console.log(idata, "total process button idata");

  try {
    const response = await dispatch(promotionupdate({ idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setSelectionModel([]);
      setSelectionModelAssigned([]);
      // setAssignedRows([]); // clear the "already assigned" grid after successful process
      dispatch(
        promototionGET({
          ProjectID: rowData.projectID || recID,
          CompanyID: CompanyID,
        }),
      );
    } else {
      toast.error(response.payload.Msg);
    }
  } catch (error) {
    toast.error("Error occurred while promoting students.");
  }
};
  // const handlePromoteProcess = async (values) => {
  //   if (assignedRows.length === 0) {
  //     toast.error("Please promote at least one student before processing");
  //     return;
  //   }

  //   if (!selectedPromotion) {
  //     toast.error("Please select a Standard to promote to");
  //     return;
  //   }

  //   const idata = {
  //     header: {
  //       ProjectID: (rowData.projectID || recID)?.toString(),
  //       CompanyID: CompanyID?.toString(),
  //       PromotedStandardID: selectedPromotion?.RecordID?.toString(),
  //     },
  //     data: [...rows, ...assignedRows].map((row) => ({
  //       RecordID: row.RecordID?.toString(),
  //       Reason: row.Reason || "",
  //       ispromoted: assignedRows.some((a) => a.RecordID === row.RecordID)
  //         ? "Y"
  //         : "N",
  //       StudentID: row.StudentID,
  //     })),
  //   };

  //   try {
  //     const response = await dispatch(promotionupdate({ idata }));
  //     if (response.payload.Status == "Y") {
  //       toast.success(response.payload.Msg);
  //       setSelectionModel([]);
  //       setSelectionModelAssigned([]);
  //       dispatch(
  //         promototionGET({
  //           ProjectID: rowData.projectID || recID,
  //           CompanyID: CompanyID,
  //         }),
  //       );
  //     } else {
  //       toast.error(response.payload.Msg);
  //     }
  //   } catch (error) {
  //     toast.error("Error occurred while promoting students.");
  //   }
  // };

  // ─── Unassign: move selected rows from the assigned grid -> pool grid ───────
  const handleUnassign = () => {
    if (selectionModelAssigned.length === 0) {
      toast.error("Please select at least one student to unassign");
      return;
    }

    const selectedRows = assignedRows.filter((row) =>
      selectionModelAssigned.includes(row.RecordID),
    );
    const remainingAssigned = assignedRows.filter(
      (row) => !selectionModelAssigned.includes(row.RecordID),
    );

    const unassignedRows = selectedRows.map((row) => ({
      ...row,
      IsPromoted: "N",
      Status: "Not Promoted",
    }));

    setRows((prev) => [...prev, ...unassignedRows]);
    setAssignedRows(remainingAssigned);
    setSelectionModelAssigned([]);
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Paper
        elevation={0}
        sx={{
          mx: 2,
          mt: 1,
          mb: 1,
          p: 1,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          bgcolor: "#fff",
        }}
      >
        <Box display="flex" justifyContent="space-between">
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
                Edit Promotion
              </Typography>
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                sx={breadcrumbStyles.separator}
              >
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    navigate("/Apps/TR378/Academic%20Year");
                  }}
                >
                  {`Academic Year(${rowData.AcademicYear})`}
                </Typography>
                <Typography
                  key={8646}
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    navigate(
                      `/Apps/SecondarylistView/TR275/Project/${rowData.AcademicYearID}`,
                      { state: { ...rowData } },
                    );
                  }}
                >
                  {`Standard/Activities(${rowData.MilestoneName})`}
                </Typography>
                <Typography
                  sx={breadcrumbStyles.active}
                  onClick={() => setScreen(0)}
                >
                  Promotion
                  {/* {getBusinessCaption("ProjectTitle", "Project")} */}
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

      <Box
        display="flex"
        gap={3}
        alignItems="flex-start"
        flexWrap="wrap"
        sx={{ p: 1 }}
      >
        <Box
          flex={1}
          minWidth={0}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Paper
            elevation={3}
            sx={{
              margin: "10px",
              backgroundColor: "#ffff",
              border: "1px solid #b9bcc0",
              borderRadius: 3,
            }}
          >
            <Formik
              innerRef={formikRef}
              initialValues={{
                standard: null,
                code: "",
                name: "",
                incharge: { RecordID: 0, Name: "" },
                ServiceMaintenance: false,
                Routine: false,
                sortorder: 0,
                CurrentStatus: "",
                disable: false,
                delete: false,
                ByProduct: false,
                Onsiteactivities: false,
                actual: 0,
                price: 0,
                budget: 0,
                scheduled: 0,
                projectOwner: null,
                longitude: 0,
                latitude: 0,
                radius: 0,
                TentativeStartDate: "",
                TentativeEndDate: "",
                slotGroup: null,
              }}
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
                  {/* ----- CARD HEADER ----- */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={0.5}
                    m={2}
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
                      <Typography sx={{ fontSize: 16 }}>📈</Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0D94885"
                      >
                        Promotion
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Manage Students promotions, designation changes, and
                        effective dates.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    margin={1}
                    sx={{
                      backgroundColor: "#e6f0f2",
                      border: "1px solid #c7dfe3",
                      borderRadius: "6px",
                      padding: "10px 16px",
                    }}
                  >
                    {/* LEFT SIDE */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        sx={{ fontWeight: 600, color: "#0D9488", minWidth: 80 }}
                      >
                        Promote to
                      </Typography>
                      <PromotionprojAutocomplete
                        sx={{ minWidth: 220 }}
                        name="standard"
                        label={
                          <span>
                            Standard
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *
                            </span>
                          </span>
                        }
                        options={promotionSTDgetdata || []} // e.g. [{ RecordID, Code, Name, ... }]
                        value={selectedPromotion}
                        // id="standard"
                        // value={values.standard}
                        onChange={(newValue) => {
                          setSelectedPromotion(newValue);
                          // newValue.Name, newValue.RecordID, newValue.Code are now available here
                        }}
                        error={!!touched.standard && !!errors.standard}
                        helperText={touched.standard && errors.standard}
                      />
                    </Box>
                    {/* RIGHT SIDE */}
                    <Typography variant="body2" sx={{ color: "#5f6b6d" }}>
                      {studentsRemainingInPool} students remaining in Promotion
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid #d3d3d3", // grey border
                      borderRadius: "4px",
                      overflow: "hidden", // keeps border clean
                    }}
                  >
                    <Box
                      padding={1}
                      height={"40vh"}
                      // height={dataGridHeightExplore}
                      // sx={{
                      //   "& .MuiDataGrid-columnHeaders": {
                      //     backgroundColor: "#3a9e9e", // teal header to match image
                      //     color: "#fff",
                      //   },
                      //   "& .MuiDataGrid-columnSeparator": { display: "none" },
                      //   "& .MuiDataGrid-virtualScroller": {
                      //     backgroundColor: colors.primary[400],
                      //   },
                      //   "& .MuiDataGrid-footerContainer": {
                      //     backgroundColor: "#3a9e9e",
                      //     color: "#fff",
                      //   },

                      //   "& .odd-row": { backgroundColor: "" },
                      //   "& .even-row": { backgroundColor: "#d9f0ef" },
                      //   //checkbox

                      //   "& .MuiCheckbox-root.Mui-checked .MuiSvgIcon-root": {
                      //     backgroundColor: "#fff", // keep white even when checked
                      //     //   border: "1px solid grey",  // keep same border
                      //     color: "#3a9e9e", // tick color (optional)
                      //   },
                      // }}

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
                        "& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount":
                        {
                          color: "#fff !important",
                          fontWeight: 500,
                        },
                         "& .promoted-row": {
    backgroundColor: "#e0f7fa", // light cyan
    color: "#555",
  },
  "& .promoted-row:hover": {
    backgroundColor: "#b2ebf2",
  },
                      }}
                    >
                      <DataGrid
    
                        apiRef={apiRef}
                        editMode="cell" // must be "cell", not "column"
                        rows={rows}
                        columns={promotecolumn1}
                        loading={promotiongetloading}
                        checkboxSelection
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelection) => {
                          console.log("Selected IDs:", newSelection); // debug
                          setSelectionModel(newSelection);
                        }}
                        processRowUpdate={processRowUpdate}
                        getRowId={(row) => row.RecordID}
                         isRowSelectable={(params) => params.row.Status !== "Promoted"}
                        // isCellEditable={(params) => params.field === "Reason"}
                        isCellEditable={(params) =>
  params.field === "Reason" && params.row.Status !== "Promoted"
}
                        experimentalFeatures={{ newEditingApi: true }}
                        onCellClick={handleCellClick}
                        onCellEditStop={handleCellEditStop}
                        onProcessRowUpdateError={(error) => {
                          console.error(
                            "Row update validation failed:",
                            error.message,
                          );
                          toast.error(error.message);
                        }}
                        components={{ Toolbar: EditToolbar }}
                        componentsProps={{ toolbar: { setRows } }}
                        rowsPerPageOptions={[5, 10, 20]}
                        // getRowClassName={(params) =>
                        //   params.indexRelativeToCurrentPage % 2 === 0
                        //     ? "odd-row"
                        //     : "even-row"
                        // }
                        getRowClassName={(params) => {
  if (!params.row) return "";

  const stripeClass =
    params.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row";
  const promotedClass = params.row.Status === "Promoted" ? "promoted-row" : "";

  return `${stripeClass} ${promotedClass}`.trim();
}}
                        pagination
                        pageSize={pageSize}
                        page={page}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        onPageChange={(newPage) => setPage(newPage)}
                        sx={{
                          "& .MuiDataGrid-footerContainer": {
                            height: dataGridHeaderFooterHeight,
                            minHeight: dataGridHeaderFooterHeight,
                          },
                        }}
                        rowHeight={dataGridRowHeight}
                        headerHeight={dataGridHeaderFooterHeight}
                      />
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between" // ✅ THIS FIXES SPACING
                      gap={2}
                      padding={1}
                      sx={{ borderTop: "1px solid #eee" }}
                    >
                      <Typography sx={{ color: "#818486", fontWeight: 400 }}>
                        {selectionModel.length} Selected
                      </Typography>

                      <Button
                        variant="contained"
                        disabled={
                          selectionModel.length === 0 || !selectedPromotion
                        }
                        sx={{
                          backgroundColor: "#f88e42",
                          color: "#fff",
                          textTransform: "none",
                          fontWeight: 600,
                          px: 3,
                          borderRadius: "6px",
                          "&:hover": {
                            backgroundColor: "#f88e42",
                          },
                        }}
                        onClick={() => handlePromote(values)}
                      >
                        ▲ Promote to {selectedPromotion?.Name || ""}
                      </Button>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ px: 1, mt: 1 }}
                    >
                      Already assigned
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid #d3d3d3", // grey border
                        borderRadius: "4px",
                        overflow: "hidden", // keeps border clean
                      }}
                    >
                      <Box
                        padding={1}
                        height={"40vh"}
                        // height={dataGridHeightExplore}
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
                          "& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount":
                          {
                            color: "#fff !important",
                            fontWeight: 500,
                          },

                           "& .promoted-row": {
    backgroundColor: "#e0f7fa", // light cyan
    color: "#555",
  },
  "& .promoted-row:hover": {
    backgroundColor: "#b2ebf2",
  },
                        }}
                      >
                        <DataGrid
                          key={selectedPromotion?.Name} 
                          editMode="cell"
                          rows={assignedRows}
                          columns={Alreadyassignedcolumn}
                          loading={promotiongetloading}
                          checkboxSelection
                          selectionModel={selectionModelAssigned}
                          isRowSelectable={(params) => params.row.Status !== "Promoted"}
                          onSelectionModelChange={(newSelection) => {
                            console.log(
                              "Selected IDs (assigned):",
                              newSelection,
                            );
                            setSelectionModelAssigned(newSelection);
                          }}
                          getRowId={(row) => row.RecordID}
                          components={{ Toolbar: AssignedToolbar }}
                          rowsPerPageOptions={[5, 10, 20]}
                          // getRowClassName={(params) =>
                          //   params.indexRelativeToCurrentPage % 2 === 0
                          //     ? "odd-row"
                          //     : "even-row"
                          // }
                               getRowClassName={(params) => {
  if (!params.row) return "";

  const stripeClass =
    params.indexRelativeToCurrentPage % 2 === 0 ? "odd-row" : "even-row";
  const promotedClass = params.row.Status === "Promoted" ? "promoted-row" : "";

  return `${stripeClass} ${promotedClass}`.trim();
}}
                          pagination
                          pageSize={pageSize}
                          page={page}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          onPageChange={(newPage) => setPage(newPage)}
                          sx={{
                            "& .MuiDataGrid-footerContainer": {
                              height: dataGridHeaderFooterHeight,
                              minHeight: dataGridHeaderFooterHeight,
                            },
                          }}
                          rowHeight={dataGridRowHeight}
                          headerHeight={dataGridHeaderFooterHeight}
                        />
                      </Box>

                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        padding={1}
                        sx={{ borderTop: "1px solid #eee" }}
                      >
                        <Typography sx={{ color: "#818486", fontWeight: 400 }}>
                          {selectionModelAssigned.length} Selected
                        </Typography>

                        <Button
                          variant="contained"
                          disabled={selectionModelAssigned.length === 0}
                          sx={{
                            backgroundColor: "#5cc9d6",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            borderRadius: "6px",
                            "&:hover": {
                              backgroundColor: "#4bb7c3",
                            },
                          }}
                          onClick={handleUnassign}
                        >
                          Unassign Selected
                        </Button>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end", // 👉 moves to right end
                        gap: 2,
                        mt: 2,
                      }}
                      m={1}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#037960",
                          color: "#fff",
                          textTransform: "none",
                          fontWeight: 600,
                          px: 3,
                          borderRadius: "6px",
                          "&:hover": {
                            backgroundColor: "#037960",
                          },
                        }}
                        //                      sx={{
                        //   textTransform: "none",
                        //   fontWeight: 600,
                        //   borderRadius: "8px",
                        //   px: 3,
                        // }}
                        onClick={() => handlePromoteProcess(values)}
                      // onClick={handleProcess}
                      >
                        Process
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 4,
                          bgcolor: "#f94316",

                          "&:hover": {
                            bgcolor: "#f94316",

                          },
                        }}
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>

                  <Dialog
                    open={marksDialogOpen}
                    onClose={() => setMarksDialogOpen(false)}
                    PaperProps={{
                      sx: {
                        width: "700px",
                        maxWidth: "90%",
                        padding: 1.5,
                        position: "relative", // ✅ important
                      },
                    }}
                    fullWidth
                  >
                    {/* ✅ CLOSE ICON */}
                    <IconButton
                      onClick={() => setMarksDialogOpen(false)}
                      sx={{
                        position: "absolute",
                        top: 7,
                        right: 7,
                        backgroundColor: "#EF4444", // 🔴 red background
                        color: "#fff", // ⚪ white icon
                        borderRadius: 1.5, // ≈ borderRadius 3 (MUI spacing: 1 = 8px)
                        width: 30,
                        height: 30,
                        zIndex: 10,

                        "&:hover": {
                          backgroundColor: "#DC2626", // darker red on hover
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <Box mt={2}>
                      <Box
                        width={"100%"}
                        // margin={1}
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
                          "& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount":
                          {
                            color: "#fff !important",
                            fontWeight: 500,
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
                          rowHeight={35}
                          headerHeight={dataGridHeaderFooterHeight}
                          apiRef={apiRef}
                          editMode="cell"
                          rows={rowsassmnt}
                          columns={Assesmentcolumns}
                          loading={promotionstudmarksgetloading}
                          // processRowUpdate={processRowUpdateassmnt}
                          //   getRowId={(row) => row.RecordID}
                          //   disableSelectionOnClick
                          //   isCellEditable={(params) => params.field === "Marks"}
                          // experimentalFeatures={{ newEditingApi: true }}
                          // onCellClick={handleCellClickassmnt}
                          // onCellEditStop={handleCellEditStopAssmnt}
                          // onProcessRowUpdateError={(error) => {
                          //   console.error(
                          //     "Row update validation failed:",
                          //     error.message,
                          //   );
                          //   toast.error(error.message);
                          // }}
                          //   components={{ Toolbar: EditToolbarassesment }}
                          //     onStateChange={(stateParams) =>
                          //     setRowCount(stateParams.pagination.rowCount)

                          //   }

                          //   componentsProps={{ toolbar: { setRowsAssmnt } }}
                          //   // componentsProps={{
                          //   //   toolbar: {
                          //   //     // setTimeTablerows,
                          //   //     setrowModesModelAssesment,
                          //   //     isRowEditing,
                          //   //     setPage,
                          //   //     pageSize,
                          //   //     showQuickFilter: true,
                          //   //   },
                          //   // }}
                          //   rowsPerPageOptions={[5, 10, 20]}
                          //   getRowClassName={(params) =>
                          //     params.indexRelativeToCurrentPage % 2 === 0
                          //       ? "odd-row"
                          //       : "even-row"
                          //   }
                          //   pagination
                          //   pageSize={pageSize}
                          //   page={page}
                          //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          //   onPageChange={(newPage) => setPage(newPage)}

                          //   editMode="row"
                          disableSelectionOnClick
                          rowModesModel={rowModesModelAssesment}
                          onRowModesModelChange={
                            handleRowModesModelchangeAssesment
                          }
                          onRowEditStop={handleRowEditStop}
                          processRowUpdate={processRowUpdateAssment}
                          getRowId={(row) => row.RecordID}
                          // isCellEditable={(params) => {
                          //   if (params.field === "SLNO") return false;
                          //   if (params.field === "Code" && YearFlag == "true")
                          //     return false;
                          //   return true;
                          // }}
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
                            Toolbar: EditToolbarassesment,
                          }}
                          componentsProps={{
                            toolbar: {
                              setRowsAssmnt,
                              setrowModesModelAssesment,
                              count: rowsassmnt.length,
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

                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                        mt={2}
                        mb={2}
                      >
                        <Button
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                            bgcolor: "#0D9488",
                            "&:hover": {
                              bgcolor: "#0F766E",
                            },
                          }}
                          variant="contained"
                          onClick={handleAssmntSave}
                        >
                          Save Marks
                        </Button>

                        {/* <Button
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
                          onClick={() => {
                            setMarksDialogOpen(false);
                          }}
                        >
                          Back
                        </Button> */}
                      </Box>
                    </Box>
                  </Dialog>
                </form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Editpromotion_v1;
