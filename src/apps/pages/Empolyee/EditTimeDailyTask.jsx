import {
  TextField,
  Box,
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
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  LinearProgress,
  Chip,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormHelperText from "@mui/material/FormHelperText";

import basicSchema, { DailyHoursTaskSchema } from "../../Security/validation";

import Listviewpopup from "../Lookup";
import Popup from "../popup";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
  explorePostData,
  timeSheetPostData,
  timeSheet,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { HsnSchema } from "../../Security/validation";
import { DailytaskSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { tokens } from "../../../Theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";
import { formGap } from "../../../ui-components/global/utils";
//import Productautocomplete from "../../../ui-components/global/Autocomplete";
const EditTimeDailytask = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  var recID = params.id;
  var compID = sessionStorage.getItem("companyId");
  console.log(recID, "=======");
  //var checkindate = params.Date;
  console.log(params.Date, "-----");
  //const [datedata, setDatedata] = useState(params.Date);
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const YearFlag = sessionStorage.getItem("YearFlag");
  const EMPID = sessionStorage.getItem("EmpId");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
const rowData = location.state || {};
console.log(rowData, "--rowData");
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  // ***************  DAILY TASK  LOOKUP  *************** //

  const [employeeLookup, SetEmployeeLookup] = useState({
    empRecordID: "",
    empCode: "",
    empName: "",
  });

  const [functionLookup, SetFunctionLookup] = useState({
    funRecordID: "",
    funCode: "",
    funName: "",
  });
  const [projectLookup, SetProjectLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
  });

  const [openPopup, setIsOpenPopup] = useState(false);
  const [openEMPPopup, setOpenEMPPopup] = useState(false);
  const [openFUNPopup, setOpenFUNPopup] = useState(false);
  const [openPROPopup, setOpenPROPopup] = useState(false);

  const [selectedProjectOptions, setSelectedProjectOptions] = useState(null);
  const [selectedProjectid, setSelectedProjectid] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);

  const handleSelectionProjectname = (newValue) => {
    if (newValue) {
      //Project
      setSelectedProjectOptions(newValue);
      console.log(newValue, "--setSelectedProjectOptions");
      setSelectedProjectid(newValue.RecordID);

      //setSelectedProjectid(newValue.ProjectRecordID);
      setSelectedProjectName(newValue.Name);
    } else {
      setSelectedProjectOptions(null);
      setSelectedProjectid(null);
      setSelectedProjectName(null);
    }
    console.log(selectedFunctionName, "====");
    console.log(selectedProjectName, "-------");
  };
  const [selectedFunctionOptions, setSelectedFunctionOptions] = useState(null);
  const [selectedFunctionid, setSelectedFunctionid] = useState(
    data.FunctionsID
  );
  const [selectedFunctionName, setSelectedFunctionName] = useState(
    data.FuntionsName
  );

  const handleSelectionFunctionname = (newValue) => {
    if (newValue) {
      //Function
      setSelectedFunctionOptions(newValue);
      console.log(newValue, "--setSelectedFunctionOptions");
      // setSelectedFunctionid(newValue.RecordID);

      setSelectedFunctionid(newValue.RecordID);
      setSelectedFunctionName(newValue.Name);
      console.log(setSelectedFunctionName, "--setSelectedFunctionOptions");
    } else {
      setSelectedFunctionOptions(null);
      setSelectedFunctionid(null);
      setSelectedFunctionName(null);
    }
  };
  function handleOpen(type) {
    if (type == "EMP") {
      setOpenEMPPopup(true);
    }
    if (type == "FUN") {
      setOpenFUNPopup(true);
    }
    if (type == "PRO") {
      setOpenPROPopup(true);
    }
  }
  if (openPopup == false) {
    employeeLookup.empRecordID = data.EmployeesID;
    employeeLookup.empCode = data.EmployeeCode;
    employeeLookup.empName = data.EmployeeName;

    functionLookup.funRecordID = data.FunctionsID;
    functionLookup.funCode = data.FunctionsCode;
    functionLookup.funName = data.FuntionsName;

    projectLookup.proRecordID = data.ProjectID;
    projectLookup.proCode = data.ProjectCode;
    projectLookup.proName = data.ProjectName;
  }

  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );

    if (type == "Employee") {
      SetEmployeeLookup({
        empRecordID: childdata.RecordID,
        empCode: childdata.Code,
        empName: childdata.Name,
      });
      setOpenEMPPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Function") {
      SetFunctionLookup({
        funRecordID: childdata.RecordID,
        funCode: childdata.Code,
        funName: childdata.Name,
      });
      setOpenFUNPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Project") {
      SetProjectLookup({
        proRecordID: childdata.RecordID,
        proCode: childdata.Code,
        proName: childdata.Name,
      });
      setOpenPROPopup(false);
      setIsOpenPopup(true);
    }
  };
  // ***************  DAILY HOURS TASK  LOOKUP  *************** //

  const [employeesLookup, SetEmployeesLookup] = useState({
    empRecordID: "",
    empCode: "",
    empName: "",
  });

  const [functionsLookup, SetFunctionsLookup] = useState({
    funRecordID: "",
    funCode: "",
    funName: "",
  });
  const [projectsLookup, SetProjectsLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
  });

  const childToParents = (childdata, type) => {
    console.log(
      "🚀  file: Editproduct.jsx:288  childToParent ~ childdata:",
      childdata
    );

    if (type == "Employees") {
      SetEmployeesLookup({
        empRecordID: childdata.RecordID,
        empCode: childdata.Code,
        empName: childdata.Name,
      });
      setOpenEMPPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Functions") {
      SetFunctionsLookup({
        funRecordID: childdata.RecordID,
        funCode: childdata.Code,
        funName: childdata.Name,
      });
      setOpenFUNPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Projects") {
      SetProjectsLookup({
        proRecordID: childdata.RecordID,
        proCode: childdata.Code,
        proName: childdata.Name,
      });
      setOpenPROPopup(false);
      setIsOpenPopup(true);
    }
  };
  const [show, setScreen] = React.useState("0");
  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview("TR134", "DailyHourTask", `parentID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
  };
  const [dhtMode, setDhtMode] = useState("A");
  const [dhtData, setDhtData] = useState({
    RecordID: "",
    Comments: "",
    FromTime: "",
    ToTime: "",
    Status: "",
    EmpDate: "",
  });
  const selectCellRowData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
      rowData
    );
    setDhtMode(mode);
    if (mode == "A") {
      setDhtData({
        RecordID: "",
        Comments: "",
        FromTime: "",
        ToTime: "",
        Status: "N",
        EmpDate: "",
      });
      SetFunctionsLookup({
        funRecordID: "",
        funCode: "",
        funName: "",
      });
      SetProjectsLookup({
        proRecordID: "",
        proCode: "",
        proName: "",
      });
      SetEmployeesLookup({
        empRecordID: "",
        empCode: "",
        empName: "",
      });
    } else {
      if (field == "action") {
        setDhtData({
          RecordID: rowData.RecordID,
          Comments: rowData.Comments,
          FromTime: rowData.FromTime,
          ToTime: rowData.ToTime,
          Status:
            rowData.Status == "Transfer to"
              ? "T"
              : rowData.Status == "Inprogress"
              ? "I"
              : rowData.Status == "Completed"
              ? "C"
              : "N",
          EmpDate: rowData.EmpDate,
        });
        console.log(rowData.Comments, "comment");
        console.log(rowData.FromTime, "comment");
        SetFunctionsLookup({
          funRecordID: rowData.FunctionsID,
          funCode: rowData.FunctionsCode,
          funName: rowData.FuntionsName,
        });
        SetProjectsLookup({
          proRecordID: rowData.ProjectID,
          proCode: rowData.ProjectCode,
          proName: rowData.ProjectName,
        });
        SetEmployeesLookup({
          empRecordID: rowData.EmployeesID,
          empCode: rowData.EmployeeCode,
          empName: rowData.EmployeeName,
        });
      }
    }
  };
  let VISIBLE_FIELDS;

  if (show == "1") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Description",
      "ProjectCode",
      "ProjectName",
      "FunctionsCode",
      "FuntionsName",
      "action",
    ];
  }
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );
  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
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
          <Typography>DailyHoursTask</Typography>
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
          <Tooltip title="Add">
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  // *************** INITIALVALUE  *************** //

  // const formattedDate = params.Date
  //   ? dayjs(params.Date, "YYYY-MM-DD").format("DD-MM-YYYY")
  //   : dayjs().format("DD-MM-YYYY");
  //const formattedDate = dayjs(params.Date, "YYYY-MM-DD").format("DD-MM-YYYY");
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to "YYYY-MM-DD"
    }
    return dateStr;
  };
  const taskDate =data.TaskDate;
  const formattedDate = new Date(taskDate).toLocaleDateString("en-GB"); // "02/04/2025"
  const finalDate = formattedDate.replace(/\//g, "-"); // "02-04-2025"
  
  console.log(finalDate);
  // const [taskDate, setTaskDate] = useState(formattedDate);
  // console.log(taskDate,"taskDate");
  const dailyTaskInitialValue = {
    code: "0",
    description: data.Name,
    date: finalDate, // Ensures initial date follows DD-MM-YYYY
    status: mode === "A" ? "N" : data.Status,
    Comment: data.Comments,
    sortOrder: data.SortOrder,
    disable: data.Disable === "Y",
    FunName: data.FunctionsID
      ? { RecordID: data.FunctionsID, Name: data.FuntionsName }
      : null,
    ProName: data.ProjectID
      ? { RecordID: data.ProjectID, Name: data.ProjectName }
      : null,
  };
  const today = new Date();
  const formattedDates = today.toISOString().split('T')[0];
  console.log(formattedDates);
const getData=location.state.data || "";
console.log(getData,'=======GET');

  const EmpName = sessionStorage.getItem("EmpName");

  const DTSaveFn = async (statusFlag) => {

    const idata = {
            "action":"update",
            "DailyTaskRecordID":recID,
            "ApprovedBy":EMPID,
            "ApprovedStatus":statusFlag,
            "DateTime":formattedDates,
            "Remarks":"aaa"
    };
console.log(idata,'====idata')
// return;
    const response = await dispatch(timeSheetPostData({idata}));
    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);
      navigate(
       -1
      );
      dispatch(timeSheet({ data:getData }));
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const dailyHourTaskInitialValue = {
    code: "0",
    description: data.Name,
    fromtime: dhtData.FromTime,
    totime: dhtData.ToTime,
    status: dhtMode == "A" ? "N" : dhtData.Status,
    comment: dhtData.Comments,
    empDate: dhtData.EmpDate,
    // sortOrder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
  };

  const DHTSaveFn = async (values, resetForm) => {
    // let action =
    //   dhtMode === "A"
    //     ? "insert"
    //     : dhtMode === "E"
    //     ? "update";
    let action = dhtMode === "A" ? "insert" : dhtMode === "E" ? "update" : null;

    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: dhtData.RecordID,
      Code: "0",
      Name: values.description,
      FromTime: values.fromtime,
      ToTime: values.totime,
      Status: values.status,
      Comments: values.comment,
      SortOrder: "0",
      Disable: isCheck,
      EmpDate: values.empDate || 0,
      EmployeesID: employeesLookup.empRecordID,
      FunctionsID: selectedFunctionid,
      ProjectID: selectedProjectid,
      parentID: recID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR134", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview("TR134", "DailyHourTask", `parentID=${recID}`, "")
      );
      //      setDhtData({ RecordID: "",
      //   Comments: "",
      //   FromTime: "",
      //   ToTime:"",
      //  Status:"",});
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
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
          navigate(
            `/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}/${params.Date}`
          );
        }
      } else {
        return;
      }
    });
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
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    setScreen(0);
                  }}
                >


                {mode === "E" ? `Daily Task(${rowData.DTCheckinDate})` : "Daily Task(New)"}
                </Typography>
                {/* <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {params.Date}
                </Typography> */}
                {/* {show == "1" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  DailyHourTask
                </Typography>
              ) : (
                false
              )} */}
              </Breadcrumbs>
            </Box>
          </Box>
          <Box display="flex">
            {/* {mode !== "A" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={screenChange}
              >
                <MenuItem value={0}>DailyTask</MenuItem>
                <MenuItem value={1}>DailyHourTask</MenuItem>
              </Select>
            </FormControl>
          ) : (
            false
          )} */}
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
          {/* <Box display="flex">
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
        </Box> */}
        </Box>
      </Paper>
      {show == "0" && !getLoading ? (
      <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={dailyTaskInitialValue}
            // onSubmit={(values, setSubmitting) => {
            //   setTimeout(() => {
            //     DTSaveFn();
            //   }, 100);
            // }}
            // validationSchema={DailytaskSchema}
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
                {data.Status == "T" ? (
                  <Stack
                    sx={{ mb: 4 }}
                    spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Chip label={EmpName} variant="outlined" />
                    <ArrowForwardIcon />
                    <Chip label={data.EmployeeName} variant="outlined" />
                  </Stack>
                ) : (
                  false
                )}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Date"
                    variant="standard"
                    focused
                    //value = {values.date}
                    value={formatDateForInput(values.date)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{ gridColumn: "span 2", background: "" }}
                    disabled
                    />

                  <TextField
                    name="description"
                    type="text"
                    id="description"
                    label="Description"
                    variant="standard"
                    focused
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                    disabled

                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    {/* <TextField
                      id="funCode"
                      label="Function"
                      variant="filled"
                      value={functionLookup.funCode}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("FUN")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>

                    <TextField
                      id="funDesc"
                      variant="filled"
                      value={functionLookup.funName}
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    /> */}

                    <Productautocomplete
                            disabled

                      name="FunName"
                      label="Function"
                      id="FunName"
                      value={values.FunName}
                      onChange={(newValue) => {
                        setFieldValue("FunName", newValue);
                      }}
                      //  onChange={handleSelectionFunctionname}
                      // defaultValue={selectedFunctionName}
                      url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2048","ScreenName":"Function","Filter":"CompanyID=${compID}","Any":""}}`}
                    />

                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    {/* <TextField
                      id="prjCode"
                      label="Project"
                      variant="filled"
                      value={projectLookup.proCode}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("PRO")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>

                    <TextField
                      id="prjDesc"
                      variant="filled"
                      value={projectLookup.proName}
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    /> */}

                    <Productautocomplete
                            disabled

                      name="ProName"
                      label="Project"
                      id="ProName"
                      value={values.ProName}
                      onChange={(newValue) => {
                        setFieldValue("ProName", newValue);
                      }}
                      //value={selectedProjectOptions}
                      //onChange={handleSelectionProjectname}
                      // defaultValue={selectedProjectName}
                      url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${compID}","Any":""}}`}
                    />
                  </Box>

                  <TextField
                    name="Comment"
                    type="text"
                    id="Comment"
                    label="Comment"
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    focused
                    disabled

                    required
                    value={values.Comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Comment && !!errors.Comment}
                    helperText={touched.Comment && errors.Comment}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl
                    focused
                    variant="standard"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="status"
                      name="status"
                      value={values.status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled

                    >
                      <MenuItem value="N">Not yet started</MenuItem>
                      <MenuItem value="I">Inprogress</MenuItem>
                      <MenuItem value="C">Completed</MenuItem>
                      <MenuItem value="T">Transfer to</MenuItem>
                    </Select>
                  </FormControl>

                  {values.status == "T" ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gridColumn: "span 2",
                      }}
                    >
                      <TextField
                        id="empCode"
                        label="Employee"
                        variant="filled"
                        value={employeeLookup.empCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleOpen("EMP")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>

                      <TextField
                        id="empDesc"
                        variant="filled"
                        value={employeeLookup.empName}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </Box>
                  ) : (
                    false
                  )}
                  {values.status == "T" ? (
                    <TextField
                      name="empDate"
                      type="date"
                      id="empDate"
                      label="Transfer Date"
                      inputFormat="YYYY-MM-DD"
                      variant="filled"
                      focused
                      value={values.empDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.empDate && !!errors.empDate}
                      helperText={touched.empDate && errors.empDate}
                      sx={{ gridColumn: "span 2" }}
                    />
                  ) : (
                    false
                  )}
                </Box>
                <Box display="flex" justifyContent="end" mt="-30px" gap="20px" padding={1}>
                  {/* {YearFlag == "true" ? ( */}
                  <LoadingButton
  color="secondary"
  variant="contained"
  type="submit"
  loading={isLoading}
  onClick={() => {
    DTSaveFn("A"); // A for Approve
  }}
>
  Approve
</LoadingButton>

<LoadingButton
  color="secondary"
  variant="contained"
  type="submit"
  loading={isLoading}
  onClick={() => {
    DTSaveFn("R"); // R for Reject
  }}
>
  Re-Work
</LoadingButton>
                  {/* ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )} */}
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      navigate(
                        -1
                        // `/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}/${params.Date}`
                      );
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Function"
            openPopup={openFUNPopup}
            setOpenPopup={setOpenFUNPopup}
          >
            <Listviewpopup
              accessID="2048"
              screenName="Function"
              childToParent={childToParent}
            />
          </Popup>

          <Popup
            title="Project"
            openPopup={openPROPopup}
            setOpenPopup={setOpenPROPopup}
          >
            <Listviewpopup
              accessID="2054"
              screenName="Project"
              childToParent={childToParent}
            />
          </Popup>

          <Popup
            title="Employee"
            openPopup={openEMPPopup}
            setOpenPopup={setOpenEMPPopup}
          >
            <Listviewpopup
              accessID="2024"
              screenName="Employee"
              childToParent={childToParent}
            />
          </Popup>
        </Paper>
      ) : (
        false
      )}

      {show == "1" && !getLoading ? (
        <Box m=" 20px" sx={{ m: 2 }}>
          <Formik
            initialValues={dailyTaskInitialValue}
            enableReinitialize={true}
            validationSchema={DailytaskSchema}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                DHTSaveFn(values, resetForm);
              }, 100);
            }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
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
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <TextField
                      name="description"
                      type="text"
                      id="description"
                      label="Description"
                      variant="filled"
                      focused
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </FormControl>
                  <Stack
                    sx={{
                      gridColumn: "span 2",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      right: "0px",
                    }}
                  >
                    {/* <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "150px" }}
                      />  */}
                  </Stack>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <Box
                      height="350px"
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
                      }}
                    >
                      <DataGrid
                        // checkboxSelection
                        rows={explorelistViewData}
                        columns={columns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
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
                      />
                    </Box>
                  </Box>
                  <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                    <Formik
                      initialValues={dailyHourTaskInitialValue}
                      enableReinitialize={true}
                      validationSchema={DailyHoursTaskSchema}
                      onSubmit={async (values) => {
                        alert("submit", values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        resetForm,
                      }) => (
                        <form>
                          <FormControl
                            sx={{ gridColumn: "span 2", gap: "40px" }}
                            style={{ width: "100%" }}
                          >
                            {/* {isNonMobile && (
                                <Stack
                                  sx={{
                                    //    width: {sm:'100%',md:'100%',lg:'100%'},
                                    gridColumn: "span 2",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    right: "0px",
                                  }}
                                > */}
                            {/* <Avatar
                                    variant="rounded"
                                    src={userimg}
                                    sx={{ width: "200px", height: "150px" }}
                                  /> */}
                            {/* </Stack>
                              )} */}

                            <FormControl
                              sx={{
                                gridColumn: "span 2",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                // marginTop: "50px",
                              }}
                            >
                              {/* <TextField
                        id="funCode"
                        label="Function"
                        variant="filled"
                        value={functionLookup.funRecordID}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      /> */}
                              <TextField
                                id="funCode"
                                label="Function"
                                variant="filled"
                                value={functionsLookup.funCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleOpen("FUN")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>

                              <TextField
                                id="funDesc"
                                variant="filled"
                                value={functionsLookup.funName}
                                fullWidth
                                inputProps={{ tabIndex: "-1" }}
                                focused
                              />
                            </FormControl>
                            <FormControl
                              sx={{
                                gridColumn: "span 2",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                // marginTop: "50px",
                              }}
                            >
                              {/* <TextField
                        id="proRecordID"
                        label="Project"
                        variant="filled"
                        value={projectLookup.proRecordID}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      /> */}
                              <TextField
                                id="proCode"
                                label="Project"
                                variant="filled"
                                value={projectsLookup.proCode}
                                focused
                                required
                                inputProps={{ tabIndex: "-1" }}
                              />
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleOpen("PRO")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>

                              <TextField
                                id="proDesc"
                                variant="filled"
                                value={projectsLookup.proName}
                                fullWidth
                                inputProps={{ tabIndex: "-1" }}
                                focused
                              />
                            </FormControl>
                            <TextField
                              name="fromtime"
                              type="time"
                              id="fromtime"
                              label="From"
                              inputFormat="HH:mm:aa"
                              value={values.fromtime}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              focused
                              sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                              name="totime"
                              type="time"
                              id="totime"
                              label="To"
                              inputFormat="HH:mm:aa"
                              value={values.totime}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              focused
                              sx={{ gridColumn: "span 2" }}
                            />
                            <FormControl
                              focused
                              variant="filled"
                              sx={{ gridColumn: "span 2" }}
                            >
                              <InputLabel id="status">Status</InputLabel>
                              <Select
                                labelId="demo-simple-select-filled-label"
                                id="status"
                                name="status"
                                // label="Status"
                                value={values.status}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <MenuItem value="N">Not yet started</MenuItem>
                                <MenuItem value="I">Inprogress</MenuItem>
                                <MenuItem value="C">Completed</MenuItem>
                                <MenuItem value="T">Transfer to</MenuItem>
                              </Select>
                            </FormControl>
                            {values.status == "T" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gridColumn: "span 2",
                                }}
                              >
                                <TextField
                                  id="empCode"
                                  label="Employee"
                                  variant="filled"
                                  value={employeesLookup.empCode}
                                  focused
                                  required
                                  inputProps={{ tabIndex: "-1" }}
                                />
                                <IconButton
                                  sx={{ height: 40, width: 40 }}
                                  onClick={() => handleOpen("EMP")}
                                >
                                  <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                </IconButton>

                                <TextField
                                  id="empDesc"
                                  variant="filled"
                                  value={employeesLookup.empName}
                                  fullWidth
                                  inputProps={{ tabIndex: "-1" }}
                                  focused
                                />
                              </Box>
                            ) : (
                              false
                            )}
                            {values.status == "T" ? (
                              <TextField
                                name="empDate"
                                type="date"
                                id="empDate"
                                label="Transfer Date"
                                inputFormat="YYYY-MM-DD"
                                variant="filled"
                                focused
                                value={values.empDate}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.empDate && !!errors.empDate}
                                helperText={touched.empDate && errors.empDate}
                                sx={{ gridColumn: "span 2" }}
                              />
                            ) : (
                              false
                            )}
                            <TextField
                              name="comment"
                              type="text"
                              id="comment"
                              label="comment"
                              variant="filled"
                              focused
                              required
                              value={values.comment}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              autoFocus
                              error={!!touched.comment && !!errors.comment}
                              helperText={touched.comment && errors.comment}
                              sx={{ gridColumn: "span 2" }}
                            />
                          </FormControl>

                          <Box
                            display="flex"
                            justifyContent="end"
                            mt="30px"
                            gap={2}
                          >
                            {/* {YearFlag == "true" ? ( */}
                            <LoadingButton
                              color="secondary"
                              variant="contained"
                              type="submit"
                              loading={isLoading}
                              onClick={() => {
                                DHTSaveFn(values, resetForm);
                              }}
                            >
                              Save
                            </LoadingButton>
                            {/* ) : (
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Save
                                </Button>
                              )} */}

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

                            <Popup
                              title="Functions"
                              openPopup={openFUNPopup}
                              setOpenPopup={setOpenFUNPopup}
                            >
                              <Listviewpopup
                                accessID="2048"
                                screenName="Functions"
                                childToParent={childToParents}
                              />
                            </Popup>
                            <Popup
                              title="Projects"
                              openPopup={openPROPopup}
                              setOpenPopup={setOpenPROPopup}
                            >
                              <Listviewpopup
                                accessID="2054"
                                screenName="Projects"
                                childToParent={childToParents}
                              />
                            </Popup>
                            <Popup
                              title="Employees"
                              openPopup={openEMPPopup}
                              setOpenPopup={setOpenEMPPopup}
                            >
                              <Listviewpopup
                                accessID="2024"
                                screenName="Employees"
                                childToParent={childToParents}
                              />
                            </Popup>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditTimeDailytask;
