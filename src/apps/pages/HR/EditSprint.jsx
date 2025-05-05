import {
  TextField,
  Box,
  useTheme,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  Breadcrumbs,
  LinearProgress,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
  sprintGetData,
  sprintprojectplanGetData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Productautocomplete, SprintEmpAutocomplete } from "../../../ui-components/global/Autocomplete";
// import CryptoJS from "crypto-js";
const EditSprint = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log("🚀 ~ EditSprint ~ params:", params);
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const projectid = params.filtertype;
  const data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);

  const SprintGEtdata = useSelector((state) => state.formApi.sprintget) || {};

  const sprintPPgetloading = useSelector(
    (state) => state.formApi.sprintloading
  );
  const explorelistViewData = useSelector((state) => state.formApi.sprintPPget) || [];


  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const state = location.state || {};
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    GetSprintData()
    // dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);


  async function GetSprintData  (){
    const data = await dispatch(sprintGetData({ SprintHeaderID: recID }));
    if (
      data.payload.Status == "Y"
      ) {
      setRows(data.payload.Data.detailData);
    } else {
      setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
    }
    console.log("🚀 ~ useEffect ~ data:", data)
  }
  // *************** INITIALVALUE  *************** //
  const [rowModesModel, setRowModesModel] = useState({});
  const [funMode, setFunMode] = useState(mode);

  const [selectedRoleOptions, setSelectedRoleOptions] = useState(null);

  //Scheduled to
  const [selectedScheduledToOptions, setSelectedScheduledToOptions] =
    useState(null);

  const [rows, setRows] = useState([]);


  const InitialValue = {
    code: SprintGEtdata.Code,
    name: SprintGEtdata.Name,
    Milestone: SprintGEtdata.MilestoneID
      ? {
          RecordID: SprintGEtdata.MilestoneID,
          Name: SprintGEtdata.MilestoneName,
        }
      : "",
    OperationStage: SprintGEtdata.OperationStageID
      ? {
          RecordID: SprintGEtdata.OperationStageID,
          Name: SprintGEtdata.OperationName,
        }
      : null,
    Activities: SprintGEtdata.ActivitiesID
      ? {
          RecordID: SprintGEtdata.ActivitiesID,
          Name: SprintGEtdata.ActivitiesName,
        }
      : null,
    fromdate: SprintGEtdata.FromDate,
    todate: SprintGEtdata.ToDate,
  };

  const handleApply = async (values) => {
  const data =   await dispatch(
      sprintprojectplanGetData({
        ActivitiesID: values.Activities ? values.Activities.RecordID : 0,
        FromDate: values.fromdate,
        ToDate: values.todate,
      })
    );
    console.log("🚀 ~ handleApply ~ data:", data)
    if (
      data.payload.Status == "Y"
      ) {
      setRows(data.payload.Data);
    } else {
      setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
    }
  };

  const handleSave = (id, params, action) => () => {
    const rowToSave = params?.row;
    if (!rowToSave) {
      toast.error("Row not found.");
      return;
    }

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleEditClick = (id) => () => {
    setFunMode("E");
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleDeleteClick = (id) => async () => {
    console.log("🚀 ~ handleDeleteClick ~ id:", id)
    try {
      setRows((prev) => prev.filter((row) => row.RecordID !== id));
      
      console.log("🚀 ~ handleDeleteClick ~ rows:", rows)
    } catch (error) {
      console.error("Error deleting row:", error);
      toast.error("Error occurred during delete.");
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    console.log("🚀 ~ processRowUpdate ~ newRow:", newRow)
    const isNew = !oldRow?.RecordID;
    const updatedRow = { ...newRow, isNew };

    setRows((prev) => {
      const index = prev.findIndex(
        (row) => row.RecordID === updatedRow.RecordID
      );
      if (index !== -1) {
        const newData = [...prev];
        newData[index] = updatedRow;
        return newData;
      }
      return [...prev, updatedRow];
    });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
    setSelectedRoleOptions(null);
    setSelectedScheduledToOptions(null);
  };

  const handleSaveButtonClick = async (values, action) => {
    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      MilestoneID: values.Milestone ? values.Milestone.RecordID : 0,
      MilestoneName: values.Milestone ? values.Milestone.Name : 0,
      OperationStageID: values.OperationStage
        ? values.OperationStage.RecordID
        : 0,
      OperationStageName: values.OperationStage
        ? values.OperationStage.Name
        : 0,
      ActivitiesID: values.Activities ? values.Activities.RecordID : 0,
      ActivitiesName: values.Activities ? values.Activities.Name : 0,
      FromDate: values.fromdate,
      ToDate: values.todate,
      ProjectID: params.filtertype,
      LoginUser: 0,
      Details: rows.map((row, index) => ({
          RecordID: row.RecordID || "",
          Task: row.Task || "",
          RoleID: row.RoleID || "",
          Effort: row.Effort || "",
          ProjectPlanDate: row.ProjectPlanDate || "",
          ScheduledDate: row.ScheduledDate.substring(0, 10) || "",
          CompletedDate: row.CompletedDate || "",
          ScheduledTo: row.ScheduledTo || "0",
          Status: row.Status || "SH",
          Comments: row.Comments || "",
        })) || [],
  
    };

    try {
      const response = await dispatch(
        postData({
          accessID: "TR262",
          // action : funMode,
          action: mode === "A" ? "insert" : "update",
          idata: idata,
        })
      );

      // Check response status for success
      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);

        setRows((prev) =>
          prev.map((row) => ({
            ...row,
            isNew: false,
            isUpdated: false,
          }))
        );

        // Fetch updated data based on ManualSalesID
        // dispatch(fetchExplorelitview("TR237", "Task Detail", `TaskID = ${recID}`, ""));
        //dispatch(fetchExplorelitview("TR237", "Task Detail", "", ""));
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      console.error("Error saving rows:", error);
      toast.error("Error occurred during save.");
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
      title: `Do you want ${props}?`,
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
          navigate(-1);
        }
      } else {
        return;
      }
    });
  };

  const [rowCount, setRowCount] = useState(0);
  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Sprint Task</Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
        </Box>
      </GridToolbarContainer>
    );
  }

  function EditAutocompleteCell(props) {
    const { id, value, field, api, row } = props;

    const handleChange = (event, newValue) => {
      console.log("🚀 ~ handleChange ~ newValue:", newValue)
      setEmployee(newValue)
      api.setEditCellValue({
        id,
        field: "EmployeeName",
        value: newValue.Name,
      });
      api.setEditCellValue({
        id,
        field: "ScheduledTo",
        value: newValue.EmployeeID,
      });
      api.stopCellEditMode({ id, field });
    };
    const [Employee,setEmployee] = useState(row.ScheduledTo ? { RecordID: row.ScheduledTo, Name: row.EmployeeName } : null)

    return (
      <SprintEmpAutocomplete
        name="ScheduledTo"
        label="ScheduledTo"
        id="ScheduledTo"
        value={Employee}
        onChange={handleChange}
        url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2106","ScreenName":"Scheduled To","Filter":"ERank='${row.Rank}'","Any":""}}`}
      />
    );
  }


  const Sprintcolumns = [
    { field: "SLNO", headerName: "SL No", width: 70 },
    {
      headerName: "RecordID",
      field: "RecordID",
      width: 100,
      align: "left",
      headerAlign: "center",
      hide: true,
      editable: false,
    },
    {
      headerName: "Task",
      field: "Task",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Role",
      field: "DesignationName",
      width: "200",
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Effort",
      field: "Effort",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Project Plan Date",
      field: "ProjectPlanDate",
      type: "date",
      width: "220",
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Scheduled Date",
      field: "ScheduledDate",
      type: "date",
      width: "220",
      // align: "left",
      // headerAlign: "center",
      hide: false,
      editable: true,
    },
    {
      field: "ScheduledTo",
      headerName: (
        <span>
          Scheduled To <span style={{ color: "red" }}>*</span>
        </span>
      ),
      width: 300,
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return <EditAutocompleteCell {...params} />;
      },
      renderCell: (params) => params.row.EmployeeName
    },
    {
      headerName: "Completed Date",
      field: "CompletedDate",
      type: "date",
      width: "220",
      hide: false,
      editable: false,
    },
    {
      headerName: "Status",
      field: "Status",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Comments",
      field: "Comments",
      width: "220",
      hide: false,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "#009688" }}
              onClick={handleSave(params.id, params, funMode)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() => {
                setRowModesModel((prev) => ({
                  ...prev,
                  [params.id]: { mode: GridRowModes.View },
                }));
                setSelectedRoleOptions(null);
              }}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon style={{ color: "#3498db" }} />}
            label="Edit"
            onClick={handleEditClick(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon style={{ color: "#e74c3c" }} />}
            label="Delete"
            onClick={handleDeleteClick(params.id, params, "harddelete")}
            color="inherit"
          />,
        ];
      },
    },
  ];



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
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR133/Project");
                }}
              >
                {` Project(${state.projectName})`}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => navigate(-1)}
              >
                Sprint
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
          initialValues={InitialValue}
          onSubmit={(values, setSubmitting) => {
            setTimeout(() => {
              handleApply(values);
            }, 100);
          }}
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
                <TextField
                  name="code"
                  type="text"
                  id="code"
                  label="Code"
                  variant="standard"
                  focused
                  required
                  value={values.code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                  autoFocus
                />
                <TextField
                  name="name"
                  type="text"
                  id="name"
                  label="Description"
                  variant="standard"
                  focused
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  autoFocus
                />

                <Productautocomplete
                  sx={{ marginTop: "7px" }}
                  name="Milestone"
                  label="Milestone"
                  variant="outlined"
                  id="Milestone"
                  value={values.Milestone}
                  getOptionLabel={(option) => option?.Name || ""}
                  onChange={(newValue) => {
                    setFieldValue("Milestone", newValue);
                    console.log(newValue, "--newValue");
                    console.log(newValue.RecordID, "////");
                  }}
                  //  onChange={handleSelectionFunctionname}
                  // defaultValue={selectedFunctionName}
                  url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2105","ScreenName":"Milestone","Filter":"ParentID=${params.filtertype}","Any":""}}`}
                />
                <Productautocomplete
                  sx={{ marginTop: "7px" }}
                  name="OperationStage"
                  label="Operation Stage"
                  variant="outlined"
                  id="OperationStage"
                  value={values.OperationStage}
                  onChange={(newValue) => {
                    setFieldValue("OperationStage", newValue);
                    console.log(newValue, "--newValue");
                    console.log(newValue.RecordID, "////");
                  }}
                  //  onChange={handleSelectionFunctionname}
                  // defaultValue={selectedFunctionName}
                  url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2104","ScreenName":"Operation Stage","Filter":"parentID=${
                    values.Milestone ? values.Milestone.RecordID : 0
                  }","Any":""}}`}
                />

                <TextField
                  name="fromdate"
                  type="date"
                  id="fromdate"
                  label="From Date"
                  variant="standard"
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.fromdate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.fromdate && !!errors.fromdate}
                  helperText={touched.fromdate && errors.fromdate}
                  sx={{ background: "" }}
                  //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                />
                <Productautocomplete
                  // sx={{ marginTop: "7px" }}
                  name="Activities"
                  label="Activities"
                  variant="outlined"
                  id="Activities"
                  value={values.Activities}
                  onChange={(newValue) => {
                    setFieldValue("Activities", newValue);
                    console.log(newValue, "--newValue");
                    console.log(newValue.RecordID, "////");
                  }}
                  //  onChange={handleSelectionFunctionname}
                  // defaultValue={selectedFunctionName}
                  url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2103","ScreenName":"Activities","Filter":"parentID=${
                    values.OperationStage ? values.OperationStage.RecordID : 0
                  }","Any":""}}`}
                />
                <TextField
                  name="todate"
                  type="date"
                  id="todate"
                  label="To Date"
                  variant="standard"
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.todate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.todate && !!errors.todate}
                  helperText={touched.todate && errors.todate}
                  sx={{ background: "" }}
                  InputProps={{
                    inputProps: {
                      min: values.fromdate || undefined,
                      max: values.fromdate
                        ? dayjs(values.fromdate)
                            .add(6, "day")
                            .format("YYYY-MM-DD")
                        : undefined,
                      // max: values.fromdate
                      // ? dayjs(values.fromdate).add(6, "day").format("YYYY-MM-DD")
                      // : undefined,
                    },
                  }}

                  //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                />

                <Box display="flex" justifyContent="end" padding={1} gap={2}>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    // onClick={handleApply}
                    loading={sprintPPgetloading}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
              {!getLoading ? (
                <Box m="5px">
                  {/* <Typography variant="h4">Sprint Details</Typography> */}
                  <Box
                    m="5px 0 0 0"
                    height={dataGridHeight}
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
                      rows={rows}
                      columns={Sprintcolumns}
                      loading={sprintPPgetloading}
                      rowModesModel={rowModesModel}
                      getRowId={(row) => row.RecordID}
                      editMode="cell"
                      disableRowSelectionOnClick
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      experimentalFeatures={{ newEditingApi: true }}
                      onRowModesModelChange={handleRowModesModelChange}
                      processRowUpdate={processRowUpdate}
                      // onProcessRowUpdateError={handleProcessRowUpdateError}
                      onStateChange={(stateParams) =>
                        setRowCount(stateParams.pagination.rowCount)
                      }
                      components={{
                        Toolbar: Custombar,
                      }}
                      componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                      }}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20]}
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "odd-row"
                          : "even-row"
                      }
                      pagination
                    />
                    {/* <DataGrid
                      sx={{
                        "& .MuiDataGrid-footerContainer": {
                          height: dataGridHeaderFooterHeight,
                          minHeight: dataGridHeaderFooterHeight,
                        },
                      }}
                        rows={explorelistViewData}
                        columns={Sprintcolumns}
                        loading={sprintPPgetloading}
                       getRowId={(row) => row.RecordID}
                         editMode="row"
                         disableRowSelectionOnClick
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      experimentalFeatures={{ newEditingApi: true }}
                      onRowModesModelChange={handleRowModesModelChange}
                      processRowUpdate={processRowUpdate}
                      pageSize={pageSize}
                      // onPageSizeChange={(newPageSize) =>
                      //   setPageSize(newPageSize)
                      // }
                      // rowsPerPageOptions={[5, 10, 20]}
                      pagination
                      // onCellClick={(params) => {
                      //   const currentRow = params.row;
                      //   const currentcellField = params.field;
                      //   // selectcelldata(currentRow, "E", currentcellField);
                      //   console.log(JSON.stringify(params));
                      // }}
                      components={{
                        Toolbar: Custombar,
                      }}
                      // onStateChange={(stateParams) =>
                      //   setRowCount(stateParams.pagination.rowCount)
                      // }
                      // getRowClassName={(params) =>
                      //   params.indexRelativeToCurrentPage % 2 === 0
                      //     ? "odd-row"
                      //     : "even-row"
                      // }
                      // componentsProps={{
                      //   toolbar: {
                      //     showQuickFilter: true,
                      //     quickFilterProps: { debounceMs: 500 },
                      //   },
                      // }}
                      componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                    }
                    /> */}

                    {/* components={{
                        Toolbar: Custombar,
                      }} */}
                  </Box>
                </Box>
              ) : (
                false
              )}
              <Box display="flex" justifyContent="end" padding={1} gap="20px">
                {YearFlag == "true" ? (
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      handleSaveButtonClick(values);
                    }}
                    // type="submit"
                    // loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                ) : (
                  <Button color="secondary" variant="contained" disabled={true}>
                    Save
                  </Button>
                )}{" "}
                {/* {YearFlag == "true" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Fnsave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )} */}
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => {
                    // navigate(-1);
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
              </Box>
              {/* <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                <LoadingButton 
                    color="secondary" 
                    variant="contained" 
                    type="submit" 
                    loading={isLoading}
                >
                    Save
                </LoadingButton>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={() => {
                            Fnsave(values,  "harddelete");
                          }}
                >
                    Delete
                </Button>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={() => {
                          navigate("/Apps/TR133/Project");
                        }}
                >
                    Cancel
                </Button>
                </Box> */}
            </form>
          )}
        </Formik>
      </Paper>
      {/* // ) : (
      //   false
      // )} */}
    </React.Fragment>
  );
};

export default EditSprint;
