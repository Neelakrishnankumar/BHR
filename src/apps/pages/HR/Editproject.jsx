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
} from "@mui/material";

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
  explorePostData,
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
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
  Employeeautocomplete,
  Productautocomplete,
  ProjectVendor,
} from "../../../ui-components/global/Autocomplete";
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../../Theme";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridHeightExplore, dataGridRowHeight } from "../../../ui-components/utils";
import { useTheme } from "@emotion/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import { nanoid } from "@reduxjs/toolkit";
import VisibilityIcon from "@mui/icons-material/Visibility"

// import CryptoJS from "crypto-js";
const Editproject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  var recID = params.id;
  var mode = params.Mode;
  // var accessID = params.accessID;
  var accessID = params.accessID;

  const data = useSelector((state) => state.formApi.Data) || {};
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
  console.log(employee, "employeelookup");
  const location = useLocation();
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema2, setValidationSchema2] = useState(null);
  let secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const [show, setScreen] = React.useState("0");
  const [funMode, setFunMode] = useState("A");
  const [laomode, setLaoMode] = useState("A");
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [rowLoading, setRowLoading] = useState(false);
  const [deletedRows, setDeletedRows] = useState([]);
  const [editedRows, setEditedRows] = useState([]);
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (!explorelistViewData) return;


    // const rowLoading = exploreLoading ? exploreLoading : false;

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

    // 🔧 reset tracking states
    setDeletedRows([]);
    setEditedRows([]);
    // setRowLoading(rowLoading);
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
          TentativeStartDate: Yup.string().required(data.Project.TentativeStartDate),
          TentativeEndDate: Yup.string().required(data.Project.TentativeEndDate),
          //budget: Yup.string().required(data.Project.budget),
          incharge: Yup.object().required(data.Project.incharge).nullable(),
          // projectOwner: Yup.object().required(data.Project.projectOwner).nullable(),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Project.code);
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
  // useEffect(() => {
  //   dispatch(getFetchData({ accessID, get: "get", recID }));
  // }, [location.key]);
  useEffect(() => {
    if (show == "0") {
      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      }
    }
  }, [show]);

  // *************** INITIALVALUE  *************** //
  // const validationSchema = Yup.object().shape({
  //   incharge: Yup.object()
  //     .nullable()
  //     .required("Owner is required"),
  // });
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
    console.log("Deleting ID:", RecordID, typeof RecordID);

    // ✅ Remove row from UI first
    setRows((prevRows) =>
      prevRows.filter((row) => row.RecordID !== RecordID)
    );

    // ✅ Only call API if RecordID is numeric
    if (!RecordID || isNaN(Number(RecordID))) {
      // toast.success("Deleted Successfully");
      return;
    }

    const numericID = Number(RecordID);

    setDeletedRows((prev) => {
      if (prev.some((d) => d.RecordID === numericID)) return prev;
      return [...prev, { RecordID: numericID }];
    });

    // 🔥 REMOVE from editedRows
    setEditedRows((prev) =>
      prev.filter((row) => row.RecordID !== numericID)
    );

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
  if (!row.Name) {
    return "Name is required";
  }
 if (!row.OwnedBy || !row.OwnedBy.Name) {
    return "Owned By is required";
  }
  
  return null;
};
  // THIS RUNS WHENEVER A ROW IS EDITED AND SAVED
  const processRowUpdate = (newRow, oldRow) => {

    //validation
  const error = UnitRowSlot(newRow);
  if (error) {
    throw new Error(error);
  }
 
    const isNew = oldRow?.RecordID && isNaN(Number(oldRow.RecordID));
    const updatedRow = { ...newRow, isNew: isNew };

    setRows((prev) => {
      const index = prev.findIndex((row) => row.RecordID === newRow.RecordID);
      const updated = [...prev];
      updated[index] = updatedRow;
      return updated;
    });

    // track edited rows
    if (!isNew) {
      setEditedRows((prev) => {
        const exists = prev.find(r => r.RecordID === newRow.RecordID);

        if (exists) {
          return prev.map(r =>
            r.RecordID === newRow.RecordID ? updatedRow : r
          );
        }

        return [...prev, updatedRow];
      });
    }

    // remove from deletedRows if it exists
    setDeletedRows((prev) =>
      prev.filter((d) => d.RecordID !== Number(newRow.RecordID))
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
    }
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview(
          "TR363",
          "Project Unit",
          `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });

    }
    if (event.target.value == "3") {
      dispatch(
        fetchExplorelitview(
          "TR363",
          "Project Unit",
          `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
          ""
        )
      );
    }
    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview(
          "TR364",
          "Project Documents",
          // `AND DOC_CMRECID = '${CompanyID}' AND (FIND_IN_SET ('${recID}', DOC_PRECID))`,
          // `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
          `CompanyID='${CompanyID}' AND (FIND_IN_SET('${recID}', DOC_PRECID))`,
          ""
        )
      );

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


  const InitialValue = {
    code: data.Code,
    name: data.Name,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    incharge: data.ProjectIncharge && data.ProjectIncharge !== "0"
      ? { RecordID: data.ProjectIncharge, Name: data.ProjectInchargeName }
      : null,
    ServiceMaintenance: data.ServiceMaintenanceProject === "Y" ? true : false,
    ByProduct: data.ByProduct === "Y" ? true : false,
    Onsiteactivities: data.EnableOnsiteactivities === "Y" ? true : false,
    Routine: data.RoutineTasks === "Y" ? true : false,
    CurrentStatus: data.CurrentStatus,
    delete: data.DeleteFlag === "Y" ? true : false,
    // budget: data.Budget ?? 0.00,
    // scheduled: data.ScheduledCost ?? 0.00,
    // actual: data.ActualCost ?? 0.00,
    // price: data.Price ?? 0.00,
    budget: data.Budget === "" ? "0.00" : data.Budget,
    scheduled:
      data.ScheduledCost === "" ? "0.00" : data.ScheduledCost,
    actual:
      data.ActualCost === "" ? "0.00" : data.ActualCost,
    price:
      data.Price === "" ? "0.00" : data.Price,
    OtherExpenses:
      data.OtherExpenses === "" ? "0.00" : data.OtherExpenses,
    projectOwner: data.ProjectOwnerID && data.ProjectOwnerID !== "0"
      ? {
        RecordID: data.ProjectOwnerID,
        Code: data.ProjectOwnerCode,
        Name: data.ProjectOwnerName,
      }
      : null,
    // OtherExpenses: data.OtherExpenses ?? 0.00,
    longitude: data.Longitude || 0,
    latitude: data.Latitude || 0,
    radius: data.Radius || 0,
    TentativeEndDate: data.TentativeEndDate || "",
    TentativeStartDate: data.TentativeStartDate || "",
  };

  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "softdelete"
          : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

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
      ByProduct: values.ByProduct == true ? "Y" : "N",
      EnableOnsiteactivities: values.Onsiteactivities == true ? "Y" : "N",
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
      TentativeStartDate: values.TentativeStartDate || "",
      TentativeEndDate: values.TentativeEndDate || ""
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      //navigate("/Apps/TR133/Project");
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const VISIBLE_FIELDS =
    show == "1"
      ? [
        "slno",
        "Code",
        "Name",
        "OwnedBy",
        "Comments",
        "action",
      ]
      : show == "2"
        ? [
          "slno",
          "Code",
          "Documents",
          // "Party",
          // "Unit",
          "action",
        ] : [];

  function EditOwnedByAutocomplete(props) {
    const { id, value, field, api, row } = props;

    const [ownedBylookup, setOwnedBylookup] = useState(value || null);

    const handleChange = async (newValue) => {
      if (!newValue) return;

      setOwnedBylookup(newValue);
      await api.setEditCellValue({
        id,
        field: "OwnedBy",
        value: newValue,
      });

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
    {
      field: "RecordID",
      headerName: "Record ID",
      width: 120,
      hide: true,
    },
    {
      field: "SLNO",
      headerName: "SL#",
      width: 50,
      hide: false,
      headerAlign: "center",
      align: "right",
      sortable: false,
      filterable: false,
      valueGetter: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
      },
    },

    {
      headerName: "Code",
      field: "Code",
      width: 150,
      hide: false,
      editable: true,
      headerAlign: "center",
      renderCell: (params) => {
        // show "Auto Code" only for new rows OR empty code
        if (YearFlag == "true" && (!params.value || params.row.isNew)) {
          return "Auto Code";
        }

        return params.value;
      }
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
      headerAlign: "center"
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
      renderCell: (params) => {
        return params.value ? `${params.value.Code || ""} || ${params.value.Name || ""}` : null;
      },
      renderEditCell: (params) => {
        return <EditOwnedByAutocomplete {...params} />;
      },

    },
    {
      headerName: "Comments",
      field: "Comments",
      width: "320",
      hide: false,
      editable: true,
      headerAlign: "center"
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
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
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
      VISIBLE_FIELDS.includes(column.field)
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
          OwnedBy: rowData.OwnedByRecordID ? {
            RecordID: rowData.OwnedByRecordID,
            Code: rowData.OwnedByCode,
            Name: rowData.OwnedByName,
          } : null,
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
            {show == "1"
              ? "List of Units"
              : ""
            }
            {show == "2"
              ? "List of Documents"
              : ""
            }
            {show == "3"
              ? "List of Units"
              : ""
            }
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
            </Tooltip>)}
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

    console.log(values);

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
      DeleteFlag: "N"
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR363", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview(
          "TR363",
          "Project Unit",
          `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
          ""
        )
      );
      resetForm();
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const fnLogOut = (props) => {
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }

    //       return
    //  }
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
      // text:data.payload.Msg,
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
          // navigate("/Apps/TR133/Project");
          navigate("/");
        }
      } else {
        return;
      }
    });
  };


  // GRID VIEW SAVE 
  const handleSaveButtonClick = async () => {
    for (let index = 0; index < rows.length; index++) {
  const row = rows[index];
  const error = UnitRowSlot(row);

  if (error) {
    toast.error(`${error}`);
    return; // ✅ stops entire save function
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
        Disable: row.Disable || "N"
      }));


    const updateRows = editedRows
      // .filter((row) => !row.isNew && !isNaN(Number(row.RecordID)))

      .filter(
        (row) =>
          !row.isNew &&
          !isNaN(Number(row.RecordID)) &&
          !deletedRows.some((d) => d.RecordID === Number(row.RecordID))
      )
      .map((row) => ({
        RecordID: row.RecordID,
        Code: row.Code || "",
        Name: row.Name || "",
        OwnedBy: row.OwnedBy?.RecordID || 0,
        Comments: row.Comments || "",
        SortOrder: row.SortOrder || 0,
        Disable: row.Disable || "N"
      }));


    const payload = {
      CompanyID: CompanyID?.toString(),
      ProjectID: recID || 0,
      insert: insertRows,
      update: updateRows,
      harddelete: deletedRows
    };

    try {

      const response = await dispatch(
        postData({
          accessID: "TR363",
          action: "batchsave",
          idata: payload
        })
      );

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);

        dispatch(
          fetchExplorelitview(
            "TR363",
            "Project Unit",
            `ProjectID='${recID}' AND CompanyID='${CompanyID}'`,
            ""
          )
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
      const nextSLNO =
        rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
      setRows((oldRows) => [
        ...oldRows,

        {
          id: id,
          RecordID: id,
          OwnedBy: null,
          Name: "",
          Code: "",
          Comments: "",
        }
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
                onClick={() => {
                  setScreen(0);
                }}

              >
                Project
              </Typography>
              {show == "1" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Units
                </Typography>) : false}
              {show == "3" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Units
                </Typography>) : false}
              {show == "2" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  List Of Documents
                </Typography>) : false}
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
                  {/* <MenuItem value={0}>Project</MenuItem>
                  <MenuItem value={3}>Units</MenuItem>
                  <MenuItem value={2}>List Of Documents</MenuItem> */}

                  <MenuItem value="0">Project</MenuItem>
                  <MenuItem value="3">Units</MenuItem>
                  <MenuItem value="2">List Of Documents</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}
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

      {show == "0" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={InitialValue}
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
                  // gap="30px"
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
                      label="Code"
                      placeholder="Auto"
                      variant="standard"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      InputProps={{ readOnly: true }}

                    // autoFocus
                    />
                  ) : (
                    <TextField
                      disabled={mode == "V"}
                      name="code"
                      type="text"
                      id="code"
                      label={
                        <>
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      autoFocus
                    />
                  )}

                  <TextField
                    disabled={mode == "V"}
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Description
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
                    // required
                    autoFocus={CompanyAutoCode == "Y"}
                  />

                  <CheckinAutocomplete
                    disabled={mode == "V"}
                    name="incharge"
                    label={
                      <>
                        Accountable Incharge
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </>
                    }
                    id="incharge"
                    value={values.incharge}
                    onChange={async (newValue) => {
                      setFieldValue("incharge", newValue);
                    }}
                    error={!!touched.incharge && !!errors.incharge}
                    helperText={touched.incharge && errors.incharge}
                    // "Filter":"parentID='${compID}' AND EmployeeID='${EMPID}'" ,
                    url={`${listViewurl}?data={"Query":{"AccessID":"2111","ScreenName":"Project Incharge","Filter":"parentID='${CompanyID}'","Any":""}}`}
                  />

                  <CheckinAutocomplete
                    disabled={mode == "V"}
                    name="projectOwner"
                    label="Project Owner"
                    // label={
                    //   <>
                    //     Project Owner
                    //     <span style={{ color: "red", fontSize: "20px" }}>
                    //       *
                    //     </span>
                    //   </>
                    // }
                    variant="outlined"
                    id="projectOwner"
                    value={values.projectOwner}
                    onChange={(newValue) => {
                      setFieldValue("projectOwner", {
                        RecordID: newValue.RecordID,
                        Code: newValue.Code,
                        Name: newValue.Name,
                      });
                      console.log(newValue, "--newvalue projectOwner");

                      console.log(newValue.RecordID, "projectOwner RecordID");
                    }}
                    // error={!!touched.projectOwner && !!errors.projectOwner}
                    // helperText={touched.projectOwner && errors.projectOwner}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Customer","Filter":"parentID=${CompanyID}","Any":""}}`}
                  />
                  {/* {touched.incharge && errors.incharge && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                          {errors.incharge}
                        </div>
                      )} */}

                  {/* <FormControl
                    focused
                    variant="standard"
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <InputLabel id="status">Current Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="currentstatus"
                      name="currentstatus"
                      value={values.currentstatus}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="Current">Current</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Old">Old</MenuItem>

                    </Select>
                  </FormControl> */}
                  {/* <FormControl
                    focused
                    variant="standard"
                  // sx={{ gridColumn: "span 2" }}
                  > */}
                  {/* <InputLabel id="CurrentStatus">Status<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel> */}

                  <TextField
                    id="TentativeStartDate"
                    name="TentativeStartDate"
                    type="date"
                    // label="Tentative Start Date"
                    label={
                      <>
                        Tentative Start Date
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </>
                    }
                    // required
                    focused
                    variant="standard"
                    error={!!touched.TentativeStartDate && !!errors.TentativeStartDate}
                    helperText={touched.TentativeStartDate && errors.TentativeStartDate}
                    value={values.TentativeStartDate}
                    // value={values.CurrentStatus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    id="TentativeEndDate"
                    name="TentativeEndDate"
                    type="date"
                    // label="Tentative End Date"
                    label={
                      <>
                        Tentative End Date
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </>
                    }
                    // required
                    focused
                    variant="standard"
                    error={!!touched.TentativeEndDate && !!errors.TentativeEndDate}
                    helperText={touched.TentativeEndDate && errors.TentativeEndDate}
                    value={values.TentativeEndDate}
                    // value={values.CurrentStatus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <TextField
                    disabled={mode == "V"}
                    labelId="demo"
                    id="CurrentStatus"
                    name="CurrentStatus"
                    type="text"
                    label="Status"
                    // label={
                    //   <>
                    //     Status
                    //     <span style={{ color: "red", fontSize: "20px" }}>
                    //       {" "}
                    //       *{" "}
                    //     </span>
                    //   </>
                    // }
                    // required
                    focused
                    select
                    variant="standard"
                    error={!!touched.CurrentStatus && !!errors.CurrentStatus}
                    helperText={touched.CurrentStatus && errors.CurrentStatus}
                    value={mode == "A" ? "CU" : values.CurrentStatus}
                    // value={values.CurrentStatus}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("CurrentStatus", e.target.value);
                      if (e.target.value == "CU") {
                        setFieldValue("disable", false);
                      } else {
                        setFieldValue("disable", true);
                      }
                    }}
                  >
                    <MenuItem value="CU">Current</MenuItem>
                    <MenuItem value="CO">Completed</MenuItem>
                    <MenuItem value="H">Hold</MenuItem>
                  </TextField>

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
                    sx={{ background: "" }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                  />

                  <Box>
                    {/* <Box display="flex" flexDirection="row" gap={formGap}>
                    <Box display="flex" alignItems="center"> */}
                    <Field
                      disabled={mode == "V"}
                      type="checkbox"
                      name="Routine"
                      id="Routine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                    // htmlFor="Routine" sx={{ ml: 1,marginLeft:0 }}
                    >
                      Routine Tasks
                    </FormLabel>
                    {/* <Field
                      type="checkbox"
                      name="ServiceMaintenance"
                      id="ServiceMaintenance"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                      // htmlFor="ServiceMaintenance"
                      // sx={{ ml: 1,marginLeft:0}}
                    >
                      Service & Maintenance
                    </FormLabel> */}
                    <Field
                      disabled={mode == "V"}
                      type="checkbox"
                      name="ByProduct"
                      id="ByProduct"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                    // htmlFor="ServiceMaintenance"
                    // sx={{ ml: 1,marginLeft:0}}
                    >
                      Product
                    </FormLabel>
                    <Field
                      disabled={mode == "V"}
                      type="checkbox"
                      name="Onsiteactivities"
                      id="Onsiteactivities"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}>Enable Onsite Activities</FormLabel>
                    <Field
                      //  size="small"
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
                      //  size="small"
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
                <Typography variant="h5" padding={1}>
                  Costing:
                </Typography>

                {values.ByProduct === true ? (
                  <Box
                    display="grid"
                    initialValues={InitialValue}
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    // gap="30px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    <TextField
                      //fullWidth
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
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />{" "}
                  </Box>
                ) : (
                  <Box
                    display="grid"
                    gap={formGap}
                    initialValues={InitialValue}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    // gap="30px"
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
                      // label="Budget"
                      label={
                        <>
                          Budget
                          {/* <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span> */}
                        </>
                      }
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      error={!!touched.budget && !!errors.budget}
                      helperText={touched.budget && errors.budget}
                      focused
                      InputProps={{
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
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
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
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
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
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
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />

                    {/* </FormControl> */}
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
                  // gap="30px"
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
                      const value = e.target.value;

                      // Allow - and one decimal only
                      if (/^-?\d*\.?\d*$/.test(value)) {
                        handleChange(e);
                      }
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
                      const value = e.target.value;

                      if (/^-?\d*\.?\d*$/.test(value)) {
                        handleChange(e);
                      }
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
                      const value = e.target.value;

                      if (/^\d*\.?\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    inputProps={{
                      inputMode: "decimal",
                      style: { textAlign: "right" },
                    }}
                  />
                  {/* <TextField
                    fullWidth
                    variant="standard"
                    focused
                    label="Radius (m)"
                    name="radius"
                    value={values.radius}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    inputProps={{
                      step: "any",
                      min: 0,
                      style: { textAlign: "right" },
                      onKeyDown: (e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                          e.preventDefault();
                        }
                      },
                      onInput: (e) => {
                        e.target.value = e.target.value.replace(
                          /[eE+\-]/g,
                          ""
                        );
                      },
                    }}
                  /> */}
                </Box>
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
                  {/* {YearFlag == "true" && mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: errorMsgData.Warningmsg.Delete,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Fnsave(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : // <Button
                    //   color="error"
                    //   variant="contained"
                    //   disabled={true}
                    // >
                    //   Delete
                    // </Button>
                    null} */}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      // navigate("/Apps/TR133/Project");
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}

      {/* {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={UnitInitialValues}
            validationSchema={validationSchema2}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, setFieldValue }) => {
              setTimeout(() => {
                FnAttachment(values, resetForm, false, setFieldValue);
              }, 100);
            }}
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
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellRowData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
                <Box>
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

                    <FormControl sx={{ gap: formGap }}>
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
                        InputProps={{
                          readOnly: true
                        }}
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
                        InputProps={{
                          readOnly: true
                        }}
                      />

                      <Box
                        m="5px 0 0 0"
                        height="50vh"
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
                            color: "", // Color for odd rows
                          },
                          "& .even-row": {
                            backgroundColor: "#D3D3D3",
                            color: "", // Color for even rows
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
                          rows={explorelistViewData}
                          columns={columns}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          rowHeight={dataGridRowHeight}
                          headerHeight={dataGridHeaderFooterHeight}
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          onCellClick={(params) => {
                            selectCellRowData({
                              rowData: params.row,
                              mode: "E",
                              field: params.field,
                            });
                          }}
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          components={{
                            Toolbar: Employee,
                          }}
                          onStateChange={(stateParams) =>
                            setRowCount(stateParams.pagination.rowCount)
                          }
                          loading={exploreLoading}
                          componentsProps={{
                            toolbar: {
                              showQuickFilter: true,
                              quickFilterProps: { debounceMs: 500 },
                            },
                          }}
                          getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0
                              ? "odd-row"
                              : "even-row"
                          }
                        />
                      </Box>
                    </FormControl>

                    <FormControl
                      sx={{
                        gap: formGap,
                        mt: { xs: "opx", md: "150px" },
                      }}
                    >

                      {CompanyAutoCode == "Y" ? (
                        <TextField
                          name="Code"
                          type="text"
                          id="Code"
                          label="Code"
                          placeholder="Auto"
                          variant="standard"
                          focused
                          // required
                          value={values.Code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.Code && !!errors.Code}
                          helperText={touched.Code && errors.Code}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5 ",
                            },
                          }}
                          InputProps={{ readOnly: true }}
                        // autoFocus
                        />
                      ) : (
                        <TextField
                          name="Code"
                          type="text"
                          id="Code"
                          label={
                            <>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          variant="standard"
                          focused
                          // required
                          value={values.Code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.Code && !!errors.Code}
                          helperText={touched.Code && errors.Code}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5 ",
                            },
                          }}
                          autoFocus
                        />
                      )}

                      <TextField
                        disabled={mode == "V"}
                        name="Name"
                        type="text"
                        id="Name"
                        label={
                          <>
                            Name
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="standard"
                        focused
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        autoFocus
                      />
                      <ProjectVendor
                        name="OwnedBy"
                        // label="Owned By"
                        label={
                          <>

                            Owned By
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="OwnedBy"
                        value={values.OwnedBy}
                        onChange={(newValue) => {
                          setFieldValue(
                            "OwnedBy",
                            newValue
                              ? {
                                RecordID: newValue.RecordID,
                                Code: newValue.Code,
                                Name: newValue.Name,
                              }
                              : null
                          );
                        }}
                        error={!!touched.OwnedBy && !!errors.OwnedBy}
                        helperText={touched.OwnedBy && errors.OwnedBy}

                        url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Vendor","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                      <TextField
                        label="Comments"
                        id="Comments"
                        name="Comments"
                        focused
                        variant="standard"
                        value={values.Comments}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Comments && !!errors.Comments}
                        helperText={touched.Comments && errors.Comments}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Sort Order"
                        value={values.sortOrder}
                        id="sortOrder"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="sortOrder"
                        sx={{ background: "" }}
                        focused
                        onWheel={(e) => e.target.blur()}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 8);
                        }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="disable"
                              checked={values.disable}
                              onChange={handleChange}
                            />
                          }
                          label="Disable"

                        />
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="end"
                        padding={1}
                        gap={2}
                      >
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
                        {YearFlag == "true" ? (
                          <Button
                            color="error"
                            variant="contained"
                            disabled={funMode == "A"}
                            onClick={() => {
                              Swal.fire({
                                title: errorMsgData.Warningmsg.Delete,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  FnAttachment(
                                    values,
                                    resetForm,
                                    "harddelete"
                                  );
                                } else {
                                  return;
                                }
                              });
                            }}
                          >
                            Delete
                          </Button>
                        ) : (
                          <Button
                            color="error"
                            variant="contained"
                            disabled={true}
                          >
                            Delete
                          </Button>
                        )}
                        <Button
                          type="reset"
                          color="warning"
                          variant="contained"
                          onClick={() => {
                            setScreen(0);
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )} */}

      {show == "3" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={UnitInitialValues}
            // validationSchema={validationSchema2}
            enableReinitialize={true}
            // onSubmit={(values, { resetForm, setFieldValue }) => {
            //   setTimeout(() => {
            //     FnAttachment(values, resetForm, false, setFieldValue);
            //   }, 100);
            // }}
            onSubmit={(values, { resetForm }) => {
              handleSaveButtonClick(values, resetForm);
            }}
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
              <form
                onSubmit={handleSubmit}
              // onReset={() => {
              //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
              //   resetForm();
              // }}
              >

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

                  {/* <FormControl sx={{ gap: formGap }}> */}
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
                    InputProps={{
                      readOnly: true
                    }}
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
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box
                padding={1}
                  // height="500px"
                  height={dataGridHeightExplore}
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
                      if (params.field === "Code" && YearFlag == "true") return false;
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

                {/* </FormControl> */}
                <Box display="flex" justifyContent="space-between" padding={1}>
                  <Box>
                    <Typography fontWeight={600} fontSize={15} lineHeight={1} mb={1} ml={0.5}>
                      Actions Guide
                    </Typography>
                    <Box display="flex"
                      flexDirection="row"
                      gap="15px"
                      sx={{ overflowY: "auto" }}>
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
                  <Box display="flex" justifyContent="space-between" padding={1} gap="20px">
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
                      onClick={() => {
                        setScreen(0);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}

      {show == "2" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={DocInitialValues}
            // validationSchema={validationSchema2}
            enableReinitialize={true}
          // onSubmit={(values, { resetForm, setFieldValue }) => {
          //   setTimeout(() => {
          //     FnAttachment(values, resetForm, false, setFieldValue);
          //   }, 100);
          // }}
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
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellRowData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >


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

                  {/* <FormControl sx={{ gap: formGap }}> */}
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
                    InputProps={{
                      readOnly: true
                    }}
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
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  {/* </FormControl> */}
                </Box>

                <Box
                padding={1}
                  m="5px 0 0 0"
                  // height="50vh"
                  // height={dataGridHeight}
                  height={dataGridHeightExplore}
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
                      color: "", // Color for odd rows
                    },
                    "& .even-row": {
                      backgroundColor: "#D3D3D3",
                      color: "", // Color for even rows
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
                    rows={explorelistViewData}
                    columns={columns}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) =>
                      setPageSize(newPageSize)
                    }
                    onCellClick={(params) => {
                      selectCellRowData({
                        rowData: params.row,
                        mode: "E",
                        field: params.field,
                      });
                    }}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                      Toolbar: Employee,
                    }}
                    onStateChange={(stateParams) =>
                      setRowCount(stateParams.pagination.rowCount)
                    }
                    componentsProps={{
                      toolbar: { setRows, setRowModesModel },
                    }}
                    loading={exploreLoading}
                    // componentsProps={{
                    //   toolbar: {
                    //     showQuickFilter: true,
                    //     quickFilterProps: { debounceMs: 500 },
                    //   },
                    // }}
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
              <Typography fontWeight={600} fontSize={15} lineHeight={1} mb={1} ml={0.5}>
                Actions Guide
              </Typography>
              <Box display="flex"
                flexDirection="row"
                gap="15px"
                sx={{ overflowY: "auto" }}>
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
                onClick={() => {
                  setScreen("0");
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editproject;
