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

  const promotiongetloading = useSelector(
    (state) => state.formApi.promotiongetloading,
  );
  const promoterows = useSelector(
    (state) => state.formApi.promotiongetdata.Data || [],
  );

  console.log(promoterows, "---find promotiongetdata");

  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  //ASSESMENT_DIALOG_SECTION
  const [rowModesModelAssesment, setrowModesModelAssesment] = React.useState(
    {},
  );
    const isRowEditing = Object.values(rowModesModelAssesment).some(
        (row) => row.mode === GridRowModes.Edit,
    );
     const [rowsassmnt, setRowsAssmnt] = useState([]);


  useEffect(() => {
    if (promoterows.length > 0) {
      setRows(promoterows);

      // ✅ Auto select rows where IsPromoted === "Y"
      const selectedIds = promoterows
        .filter((row) => row.IsPromoted === "Y")
        .map((row) => row.RecordID);

      setSelectionModel(selectedIds);
    }
  }, [promoterows]);

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


// const { data: promotionProjData } = useSelector((state) => state.promototionprojGET);
// adjust the path above to match your actual reducer/state shape


const promotionSTDgetdata = useSelector((state) => state.formApi.promotionSTDgetdata.data || [],);
console.log(promotionSTDgetdata, "--find lookup promotionSTDgetdata");

const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    if (!CompanyID || !(rowData?.projectID || recID)) return;

    const ProjectID = rowData.projectID || recID;

    dispatch(promototionGET({ ProjectID, CompanyID }));
    dispatch(promototionprojGET({ ProjectID, CompanyID }));
  }, [rowData?.projectID, CompanyID, recID, dispatch]);

  // ─── Units DataGrid state ─────────────────────────────────────────────────────
  const [rowModesModel, setRowModesModel] = React.useState({});

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  // const handleSaveClick = (RecordID) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [RecordID]: { mode: GridRowModes.View },
  //   });
  // };

  // const handleDeleteClick = (RecordID) => async () => {
  //   setRows((prevRows) => prevRows.filter((row) => row.RecordID !== RecordID));

  //   if (!RecordID || isNaN(Number(RecordID))) return;

  //   const numericID = Number(RecordID);
  //   setDeletedRows((prev) => {
  //     if (prev.some((d) => d.RecordID === numericID)) return prev;
  //     return [...prev, { RecordID: numericID }];
  //   });
  //   setEditedRows((prev) => prev.filter((row) => row.RecordID !== numericID));
  // };

  // const handleCancelClick = (RecordID) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });
  //   const editedRow = rows.find((row) => row.RecordID === RecordID);
  //   if (editedRow.isNew) {
  //     setRows(rows.filter((row) => row.RecordID !== RecordID));
  //   }
  // };

  const processRowUpdate = (newRow, oldRow) => {
    // const error = UnitRowSlot(newRow);
    // if (error) throw new Error(error);

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
    dispatch(
      promototioStudMarksGET({
        StudentID: student.RecordID,
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

  // const handleAddMarksRecord = () => {
  //   if (!selectednewSubject) {
  //     toast.error("Please select a subject");
  //     return;
  //   }
  //   setSavedMarksRecords((prev) => [
  //     ...prev,
  //     { Subject: selectednewSubject, Marks: marksValue, OutOf: outOfValue },
  //   ]);
  //   setSelectednewSubject("");
  //   setMarksValue(0);
  //   setOutOfValue(100);
  // };

  // const handleDeleteMarksRecord = (index) => {
  //   setSavedMarksRecords((prev) => prev.filter((_, i) => i !== index));
  // };

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
          <Tooltip title="Assessment">
            <GridActionsCellItem
              icon={<AddTaskIcon sx={{ color: "#3a9e9e" }} />}
              label="Assessment"
              className="textPrimary"
              color="inherit"
              onClick={handleEditClicknew(id)}
            />
          </Tooltip>,
        ];
      },
    },
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

   //ASSESMENT_DIALOG_SECTION
  const handleRowModesModelchangeAssesment = (newRowModesModel) => {
    setrowModesModelAssesment(newRowModesModel);
  };

     const handleRowEditStopassmnt = (params, event) => {
          if (params.reason === GridRowEditStopReasons.rowFocusOut) {
              event.defaultMuiPrevented = true;
          }
      };

    //STAFF_MAPPIMNG_V1
    // const processRowUpdateassmnt = async (newRow, oldRow) => {
    //     const values = formikRef.current?.values ?? {};
    //     const isNew = isNaN(Number(newRow.RecordID));

    //     if (!newRow.term?.RecordID) {
    //         throw new Error("Please select a Term");
    //     }
    //     if (!newRow.department?.RecordID) {
    //         throw new Error("Please select a Task");
    //     }
    //     if (!Array.isArray(newRow.area) || newRow.area.length === 0) {
    //         throw new Error("Please select an Area");
    //     }

    //     if (!Array.isArray(newRow.day) || newRow.day.length === 0) {
    //         throw new Error("Please select a Day");
    //     }

    //     if (!Array.isArray(newRow.slot) || newRow.slot.length === 0) {
    //         throw new Error("Please select a Slot");
    //     }
    //     if (!newRow.assignedTo?.RecordID) {
    //         throw new Error("Please select Assigned To");
    //     }
    //     let action = isNew ? "insert" : "update";
    //     // 🔹 DETAIL (row)
    //     const detailPayload = {
    //         ProjectTeamRecordID: isNew ? "-1" : newRow.RecordID,
    //         RecordID: isNew ? "-1" : newRow.id,

    //         ProjectID: newRow.department?.RecordID || "0",

    //         StudentID: newRow.assignedTo?.RecordID || "0",
    //         Marks: newRow.term?.RecordID || "0",

    //         OutOfMarks: Array.isArray(newRow.day)
    //             ? newRow.day.map((d) => d.Name).join(",")
    //             : "",

    //         SlotID: Array.isArray(newRow.slot)
    //             ? newRow.slot.map((s) => s.RecordID).join(",")
    //             : "",

    //         UnitAreaID: Array.isArray(newRow.area)
    //             ? newRow.area.map((a) => a.RecordID).join(",")
    //             : "",
    //     };
    //     const idata = {
    //         RecordID: recID,
    //         Code: data.Code,
    //         Name: data.Name,
    //         ProjectIncharge: data.ProjectIncharge || 0,
    //         ProjectInchargeName: data.ProjectInchargeName || "",
    //         ServiceMaintenanceProject:
    //             data.ServiceMaintenanceProject,
    //         RoutineTasks: data.RoutineTasks || "N",
    //         SortOrder: data.SortOrder || 0,
    //         CurrentStatus: data.CurrentStatus,
    //         Disable: data.Disable,
    //         DeleteFlag: data.DeleteFlag,
    //         ByProduct: data.ByProduct, // always N for 003
    //         EnableOnsiteactivities: data.EnableOnsiteactivities, // always N for 003
    //         ActualCost: data.ActualCost || 0,
    //         Price: data.Price || 0,
    //         Budget: data.Budget || 0,
    //         ScheduledCost: data.ScheduledCost || 0,
    //         Finyear,
    //         CompanyID,
    //         ProjectOwnerID: data.ProjectOwnerID || 0,
    //         Longitude: data.Longitude || 0,
    //         Latitude: data.Latitude || 0,
    //         Radius: data.Radius || 0,
    //         AcademicYearID: params.filtertype || 0,
    //         TentativeStartDate: data.TentativeStartDate || "",
    //         TentativeEndDate: data.TentativeEndDate || "",

    //         // 🔥 IMPORTANT
    //         Detail: [detailPayload],
    //     };

    //     try {
    //         const response = await dispatch(postData({ accessID: "tr389v1", action, idata }));

    //         if (response?.payload?.Status === "Y") {
    //             const updatedRow = {
    //                 ...newRow,
    //                 isNew: false,
    //             };

    //             setTimeTablerows((prev) =>
    //                 prev.map((r) => (r.id === newRow.id ? updatedRow : r)),
    //             );


    //             dispatch(
    //                 getFetchData({ accessID: "TR275", get: "get", recID }),
    //             );
    //             dispatch(
    //                 staffmappingTeacherget({ ProjectID: recID, CompanyID: CompanyID }),
    //             );
    //             toast.success("Saved successfully");
    //             return updatedRow;
    //         } else {
    //             throw new Error(response?.payload?.Msg || "Save failed");
    //         }
    //     } catch (err) {
    //         toast.error(err.message);
    //         return oldRow; // restore original values
    //     }
    // };


    function EditToolbarassesment(props) {
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
                                                  color="#0000D1"
                                                  sx={{ cursor: "default" }}
                                              >
                                                  List Of Assesments ({rowCount})
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
      width: 40,
      hide: false,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
     { field: "ProjectID", headerName: "Record ID", width: 120, hide: true },

    {
      headerName: (
        <span>
          Subjects
          {/* <span style={{ color: "red" }}>*</span> */}
        </span>
      ),
      field: "Subjects",
      width: 250,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    {
      headerName: "Marks",
      field: "Marks",
      width: 150,
      hide: false,
      editable: true,
      headerAlign: "center",
    },
    {
      headerName: "Out Of",
      field: "outof",
      width: 200,
      hide: false,
      editable: false,
      headerAlign: "center",
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 165,
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
    //           // onClick={handleSaveClickTimeTable(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           // onClick={handleCancelClickTimeTable(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }

    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         // onClick={handleEditClickTimeTable(id)}
    //         color="primary"
    //       />,
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         // onClick={handleDeleteClickTimeTable(id)}
    //         color="error"
    //       />,
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

  const handlePromote = async (values) => {
    // if (selectionModel.length === 0) {
    //   toast.error("Please select at least one student");
    //   return;
    // }

    // if (!values.standard || !values.standard.RecordID) {
    //   toast.error("Please select a Standard to promote to");
    //   return;
    // }

    const selectedRows = rows.filter((row) =>
      selectionModel.includes(row.RecordID),
    );
    console.log(selectedRows, "-selectedRows");

    const idata = {
      header: {
        ProjectID: (rowData.projectID || recID)?.toString(),
        CompanyID: CompanyID?.toString(),
        PromotedStandardID: selectedPromotion?.RecordID?.toString(),
      },
      data: rows.map((row) => ({
        RecordID: row.RecordID?.toString(),
        Reason: row.Reason || "",
        ispromoted: selectionModel.includes(row.RecordID) ? "Y" : "N",
      })),
    };

    console.log(idata, "--idata in handlePromote");
    // return;
    try {
      const response = await dispatch(promotionupdate({ idata }));
      if (response.payload.Status == "Y") {
        toast.success(response.payload.Msg);
        setSelectionModel([]);
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
                sx={{
                  cursor: "default",
                  marginLeft: "10px",
                  fontSize: "17px",
                }}
                onClick={() => {
                  navigate("/Apps/TR378/Academic%20Year");
                }}
              >
                {`Academic Year(${rowData.AcademicYear})`}
              </Typography>
              <Typography
                key={8646}
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
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
                    backgroundColor: "#fff", // keep white even when checked
                    //   border: "1px solid grey",  // keep same border
                    color: "#3a9e9e", // tick color (optional)
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
                  isCellEditable={(params) => params.field === "Reason"}
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
                gap={2}
                padding={2}
                mt={2}
                sx={{ borderTop: "1px solid #eee" }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#1976d2", fontWeight: 500 }}
                >
                  Selected : {selectionModel.length} students
                </Typography>

                <Box>
                  <PromotionprojAutocomplete
                    sx={{ minWidth: 200, ml: 1 }}
                    // name="standard"
                    label={
                      <span>
                        Promote To Standard
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *
                        </span>
                      </span>
                    }
                     options={promotionSTDgetdata || []}   // e.g. [{ RecordID, Code, Name, ... }]
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
                <Button
                  variant="contained"
                  // disabled={selectionModel.length === 0 || !values.standard}
                  onClick={() => handlePromote(values)}
                  sx={{
                    backgroundColor: "#f76d23",
                    "&:hover": { backgroundColor: "#f76d23" },
                    textTransform: "none",
                    fontWeight: 600,
                    ml: 5,
                  }}
                >
                  ▲ Promote
                </Button>
              </Box>

              {/* <Dialog
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
    Marks Entry — {marksDialogStudent?.StudentName || ""}
    <IconButton
      onClick={() => setMarksDialogOpen(false)}
      sx={{ color: "#fff" }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ pt: 3 }}>
    <Box mb={2} mt={1}>

    <CheckinAutocomplete
      name="subjects"
      label={
        <span>
        Subjects
          <span style={{ color: "red", fontSize: "20px" }}> *</span>
        </span>
      }
      id="subjects"
      value={values.subjects}
      onChange={(newValue) => {
        setFieldValue("subjects", newValue);
      }}
      error={!!touched.subjects && !!errors.subjects}
      helperText={touched.subjects && errors.subjects}
      url={`${listViewurl}?data=${JSON.stringify({
        Query: {
          AccessID: "2198",
          ScreenName: "subjects",
          VerticalLicense: Subscriptionlastthree,
          // Filter: `SubjectActivity='N' AND CompanyID='${CompanyID}'`,
          Filter: `CompanyID='${CompanyID}'`,
          Any: "",
        },
      })}`}
    />
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
          id="marks"
          value={values.marks}
          placeholder="0"
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.marks && !!errors.marks}
          helperText={touched.marks && errors.marks}
          // onChange={(e) => setMarksValue(Number(e.target.value))}
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
           id="outOf"
          value={values.outOf || 100}
          placeholder="100"
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.outOf && !!errors.outOf}
          helperText={touched.outOf && errors.outOf}
          InputProps={{ readOnly: true }}
          // value={outOfValue}
          // onChange={(e) => setOutOfValue(Number(e.target.value))}
        />
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddMarksRecord}
        sx={{
          backgroundColor: "#187474",
          "&:hover": { backgroundColor: "#187474" },
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
    sx={{
      "&:hover": { backgroundColor: "warning" },
    }}
      onClick={() => setMarksDialogOpen(false)}
      variant="contained"
      color="warning"
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleMarksDialogDone}
      sx={{
        backgroundColor: "#187474",
        "&:hover": { backgroundColor: "#187474" },
        textTransform: "none",
      }}
    >
      Done
    </Button>
  </DialogActions>
</Dialog> */}

              <Dialog
                open={marksDialogOpen}
                onClose={() => setMarksDialogOpen(false)}
                // maxWidth="md"
                  PaperProps={{
    sx: {
      width: "700px",   // exact width control
      maxWidth: "90%",
    },
  }}
                fullWidth
              >
                <Box
                //  sx={{ height: 350, width: "100%", mt: 1 }}
                 >
                     <Box
                     width= {"100%"}
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
                    backgroundColor: "#fff", // keep white even when checked
                    //   border: "1px solid grey",  // keep same border
                    color: "#3a9e9e", // tick color (optional)
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
                    // loading={staffmappingGetDataloading}
                    // processRowUpdate={processRowUpdateassmnt}
                    getRowId={(row) => row.id}
                    disableSelectionOnClick
                    isCellEditable={(params) => params.field === "Reason"}
                  experimentalFeatures={{ newEditingApi: true }}
                  onCellClick={handleCellClickassmnt}
                  onCellEditStop={handleCellEditStopAssmnt}
                  onProcessRowUpdateError={(error) => {
                    console.error(
                      "Row update validation failed:",
                      error.message,
                    );
                    toast.error(error.message);
                  }}
                    components={{ Toolbar: EditToolbarassesment }}
                      onStateChange={(stateParams) =>
                      setRowCount(stateParams.pagination.rowCount)
                      
                    }

                    componentsProps={{ toolbar: { setRowsAssmnt } }}
                    // componentsProps={{
                    //   toolbar: {
                    //     // setTimeTablerows,
                    //     setrowModesModelAssesment,
                    //     isRowEditing,
                    //     setPage,
                    //     pageSize,
                    //     showQuickFilter: true,
                    //   },
                    // }}
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
  justifyContent="flex-end"
  gap={2}
  mt={2}
  mb={2}
>
  <Button
    color="secondary"
    variant="contained"
//      onClick={() => {
// handleassmntSave();
//     }}
  >
    Save
  </Button>

  <Button
    color="warning"
    variant="contained"
    onClick={() => {
setMarksDialogOpen(false);
    }}
  >
    Cancel
  </Button>
</Box>
                </Box>
              </Dialog>
            </form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default Editpromotion;
