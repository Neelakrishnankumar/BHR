import {
  Divider,
  Checkbox,
  InputLabel,
  useTheme,
  MenuItem,
  Menu,
  Box,
  Button,
  Breadcrumbs,
  TextField,
  Stack,
  IconButton,
  Avatar,
  FormLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Select,
  Tooltip,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CalendarToday } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import store from "../../../index";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import FileUploadIconButton from "../../../ui-components/global/Fileuploadbutton";
import {
  explorePostData,
  fetchApidata,
  postApidata,
  postApidatawol,
  getDeployment,
  postDeployment,
  invoiceExploreGetData,
  postData,
  resetTrackingData,
  empAttendance,
  Attendance,
  AttendanceProcess,
  requestMail,
  leaveAppoval,
  getLeaveentryData,
  RegGetData,
  resetregularizedata,
  getLeaveweeklyData,
} from "../../../store/reducers/Formapireducer";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import basicSchema from "../../Security/validation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Listviewpopup from "../Lookup";
import Popup from "../popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tokens } from "../../../Theme";

import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { imageUpload } from "../../../store/reducers/Imguploadreducer";
import { Code } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";

import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import { CheckinAutocomplete, Productautocomplete } from "../../../ui-components/global/Autocomplete";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from "axios";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************
const Editrequests = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const RegData = useSelector((state) => state.formApi.RegGetData);
  const leavegridData = useSelector((state) => state.formApi.leaveweeklyData);
  console.log(leavegridData, "leavegridData");
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const data = useSelector((state) => state.formApi.Data);
  const [pageSize, setPageSize] = React.useState(10);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const rowSx = { height: 36, '& td, & th': { py: 0.5 } };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const EMPID = sessionStorage.getItem("EmpId");
  const CompanyID = sessionStorage.getItem("compID");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  const UserName = sessionStorage.getItem("UserName");
  const UserRecordid = sessionStorage.getItem("loginrecordID");
  const location = useLocation();
  const state = location.state || {};
  const Finyear = sessionStorage.getItem("YearRecorid");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [openLTpopup, setOpenLTpopup] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };
  const currentDate = new Date().toISOString().split('T')[0];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [responseMsg, setResponseMsg] = useState("");
  const [checkIN, setCheckIN] = useState("");


  const YearFlag = sessionStorage.getItem("YearFlag");

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = "TR027";
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const deploymentData = useSelector((state) => state.formApi.deploymentData);
  const DataExplore = useSelector((state) => state.formApi.inviceEData);

  const [openDEPopup, setOpenDEPopup] = useState(false);
  const [openADPopup, setOpenADPopup] = useState(false);
  const [openLETPopup, setOpenLETPopup] = useState(false);

  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);


  const empAttendanceData = useSelector(
    (state) => state.formApi.empAttendanceData
  );

  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);

  const [openPROPopup, setOpenPROPopup] = useState(false);

  const [Color, setColor] = useState("");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));


  }, []);


  const [ini, setIni] = useState(true);
  const [iniProcess, setIniProcess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const validationSchema = Yup.object().shape({
    leavetype: Yup.object()
      .nullable()
      .required("Leavetype is required"),

  });
  const validationSchema2 = Yup.object().shape({

    ProName: Yup.object()
      .nullable()
      .required("Project is required"),
  });
   const validationSchema3 = Yup.object().shape({

    overhead: Yup.object()
      .nullable()
      .required("Overhead is required"),
  });
  const handleButtonClick = (params) => {
    const rowData = {
      CheckInDate: params.row.CheckInDate,
      CheckOutDate: params.row.CheckOutDate,
      EmplyeeCheckInDateTime: params.row.EmplyeeCheckInDateTime,
      EmplyeeCheckOutDateTime: params.row.EmplyeeCheckOutDateTime,
      MonthDate: params.row.MonthDate,
      Name: params.row.Name,
      NumberOfHoursWorked: params.row.NumberOfHoursWorked,
      RecordID: params.row.RecordID,
      SLNO: params.row.SLNO,
      Status: params.row.Status,
    };
    setSelectedData(rowData); // Store the selected row data (optional, for tracking)

    // Navigate to another screen, passing the data in state
    navigate(`/Apps/TR219/Regularization/${params.row.RecordID}`, {
      state: rowData,
    });
    // navigate(`/Apps/TR219/Regularization/${params.row.RecordID}`);
  };

  var userimg = store.getState().globalurl.imageUrl;
  // if (mode == "A") {
  //   userimg = userimg + "Defaultimg.jpg";
  // } else {
  //   if (
  //     Data.ImageName == undefined ||
  //     Data.ImageName == null ||
  //     Data.ImageName == ""
  //   ) {
  //     userimg = userimg + "Defaultimg.jpg";
  //   } else {
  //     userimg = userimg + Data.ImageName;
  //   }
  // }
  const [funMode, setFunMode] = useState("A");


  const [isPopupData, setisPopupdata] = React.useState(false);
  const [opendesignPopup, setOpendesignPopup] = useState(false);
  const [openOHPopup, setOpenOHPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "DE") {
      setOpenDEPopup(true);
    }

    if (type == "AD") {
      setOpenADPopup(true);
    }

    if (type == "LT") {
      setOpenLETPopup(true);
    }
    if (type == "OH") {
      setOpenOHPopup(true);
    }
  }

  const [selectLookupData, setselectLookupData] = React.useState({
    lookupRecordid: "",
    lookupCode: "",
    lookupDesc: "",
  });
  const [selectOHLookupData, setselectOHLookupData] = React.useState(null);
  const [selectleaveLookupData, setselectleaveLookupData] = React.useState(null);
  const [selectODLookupData, setselectODLookupData] = React.useState(null);
  const [expenseOHData, setExpenseOHData] = React.useState(null);
  //   {
  //   OHlookupRecordid: "",
  //   OHlookupCode: "",
  //   OHlookupDesc: "",
  // });

  const [ADLookupData, setADLookupData] = React.useState(null);
  //   {
  //   adRecordID: "",
  //   adType: "",
  //   adDesc: "",
  //   adCategory: "",
  // });
  const [selectLETLookupData, setselectLETLookupData] = React.useState(null);
  //   {
  //   letlookupRecordid: "",
  //   letlookupCode: "",
  //   letlookupDesc: "",
  // });

  // ***************  EMPLOYEE-FUNCTION LOOKUP  *************** //

  if (isPopupData == false) {
    selectLookupData.lookupRecordid = Data.DeptRecordID;
    selectLookupData.lookupCode = Data.DeptCode;
    selectLookupData.lookupDesc = Data.DeptName;
  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("Data---" + JSON.stringify(childdata));
    setisPopupdata(true);
    if (type == "Department") {
      setselectLookupData({
        lookupCode: childdata.Code,
        lookupRecordid: childdata.RecordID,
        lookupDesc: childdata.Name,
      });
      setOpenDEPopup(false);
    }
    if (type == "OverHead") {
      setisPopupdata(true);
      // setselectOHLookupData({
      //   OHlookupRecordid: childdata.RecordID,
      //   OHlookupCode: childdata.Code,
      //   OHlookupDesc: childdata.Name,
      // });
      setOpenOHPopup(false);
    }
    if (type == "Allowance" || type == "Deduction") {
      // setADLookupData({
      //   adType: childdata.Type,
      //   adRecordID: childdata.RecordID,
      //   adDesc: childdata.Name,
      //   adCategory: childdata.SalaryCategory,

      // });
      setOpenADPopup(false);
    }
    if (type == "Leave Type") {
      // setselectLETLookupData({
      //   letlookupCode: childdata.Code,
      //   letlookupRecordid: childdata.RecordID,
      //   letlookupDesc: childdata.Name,
      // });
      setOpenLETPopup(false);
    }
  };
  // **********Save Function*****************

  var apiData = "";
  apiData = {
    Code: Data.Code,
    Name: Data.Name,
    Job: Data.Job,
    Comm: Data.Comm,
    Mgr: Data.Mgr,
    Sal: Data.Sal,
    Fax: Data.Fax,
    SortOrder: Data.SortOrder || 0,
    Disable: Data.Disable,
    Password: Data.Password,
    Department: Data.DeptRecordID
      ? {
        RecordID: Data.DeptRecordID,
        Code: Data.DeptCode,
        Name: Data.DeptName,
      }
      : null,
    EmpType: Data.EmpType,
    DateOfJoin: Data.DateOfJoin,
    DateOfConfirmation: Data.DateOfConfirmation,
    // SubscriptionCode: Data.SubscriptionCode,
    ScrumMaster: Data.ScrumMaster,
    CompanyID: Data.CompanyID,
  };
  //*******Assign Employee values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    Job: apiData.Job,
    scrummaster: Data.ScrumMaster === "Y" ? true : false,
    prjmanager: Data.ProjectManager === "Y" ? true : false,
    employeetype:
      Data.EmpType === "Prohibition"
        ? "PP"
        : Data.EmpType === "Permanent"
          ? "PM"
          : Data.EmpType === "Contracts In"
            ? "CI"
            : Data.EmpType === "Contracts Out"
              ? "CO"
              : // : Data.EmpType === "Contractor"
              // ? "CT"
              "",
    joindate: Data.DateOfJoin,
    confirmdate: Data.DateOfConfirmation,
    // DeptRecordID:apiData.DeptRecordID,
    Comm: apiData.Comm,
    Mgr: apiData.Mgr,
    Sal: apiData.Sal,
    Fax: apiData.Fax,
    SortOrder: apiData.SortOrder || 0,
    checkbox: apiData.Disable,
    Password: apiData.Password,
    Department: apiData.Department,
    // ScrumMaster: apiData.ScrumMaster,
  };
  const fnSave = async (values) => {
    setLoading(true);
    setIni(false);
    if (values.Code == "") {
      toast.error("Please Enter Code");
      return;
    }
    if (values.Name == "") {
      toast.error("Please Enter Description");
      return;
    }
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }

    // console.log(locationLookup.locationRecordID, gateLookup.gateRecordID);

    var saveData = {
      RecordID: recID,
      DeptRecordID: values.Department.RecordID || 0,
      DeptName: values.Department.Name || "",
      //EmpType:"CO",
      // DeptRecordID: selectLookupData.lookupRecordid,
      Code: values.Code,
      Name: values.Name,
      SortOrder: values.SortOrder || 0,
      Disable: values.checkbox === true ? "Y" : "N",
      Job: values.Job,
      ScrumMaster: values.scrummaster === true ? "Y" : "N",
      ProjectManager: values.prjmanager === true ? "Y" : "N",
      EmpType: values.employeetype,
      DateOfJoin: values.joindate,
      DateOfConfirmation: values.confirmdate,
      Mgr: values.Mgr,
      Sal: values.Sal,
      Comm: values.Comm,
      Password: values.Password,
      DesignID: 0,
      LocationRecID: 0,
      GateRecID: 0,
      WeekOff: 0,
      CompanyID,
      //EmpType: apiData.EmpType,
      DateOfJoin: apiData.DateOfJoin,
      DateOfConfirmation: apiData.DateOfConfirmation,
      // SubscriptionCode: apiData.SubscriptionCode,
      ScrumMaster: apiData.ScrumMaster,
      CompanyID: apiData.CompanyID,
      SubscriptionCode
    };
    var type = "";

    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    const data = await dispatch(postApidatawol(accessID, type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      navigate(
        `/Apps/TR257/Employee Request/EditEmployee Request/${data.payload.apiResponse}/E`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  /**************************************Employee Process***************** */

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  const [show, setScreen] = React.useState("0");
  // material
  const [supprodata, setSupprodata] = useState({
    RecordID: "",
    Comments: "",
    SortOrder: "",
  });
  const [boMode, setBomode] = useState("A");

  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);

    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview(
          "TR206",
          "Employee Allowances",
          `${recID} AND Category='A'`,
          ""
        )
      );
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }

    if (event.target.value == "5") {
      dispatch(
        fetchExplorelitview(
          "TR206",
          "Employee Deductions",
          `${recID} AND Category='D'`,
          ""
        )
      );
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }

    if (event.target.value == "6") {
      dispatch(fetchExplorelitview("TR216", "OT", `EmployeeID=${recID}`, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }
    if (event.target.value == "10") {
      setResponseMsg("");
      dispatch(fetchExplorelitview("TR219", "Regularization", `EmployeeID=${recID}`, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({
        rowData: {},
        mode: "A",
        field: "",
      });
    }

    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    // if (event.target.value == "9") {
    //   dispatch(fetchApidata(accessID, "get", recID));
    // }
    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview("TR208", "Leave", `EmployeeID=${recID}`, "")

      );
      // dispatch(getLeaveweeklyData(`EmployeeID=${recID}`));
      dispatch(getLeaveweeklyData({ EmployeeID: recID }));

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "9") {

      dispatch(
        fetchExplorelitview("TR086", "Expense", `parentID ='E' AND Approvedby=${recID}`, "")
      );
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "8") {

      dispatch(
        fetchExplorelitview("TR242", "On Duty", `EmployeeID=${recID}`, "")
      );
      dispatch(fetchApidata(accessID, "get", recID));
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "7") {
      dispatch(
        fetchExplorelitview(
          "TR160",
          "Salary Advance",
          `EmployeeID=${recID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "11") {
      dispatch(
        fetchExplorelitview(
          "TR266",
          "Permission",
          `EmployeeID=${recID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
  };

  //*******Assign Employee values from Grid table in  Yup initial value******* */

  /******************************save  Function********** */

  //*********************Contact******************/

  let VISIBLE_FIELDS;
  if (show == "2") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LeaveTypeName",
      "LeavePart",
      "FromDate",
      "ToDate",
      "Status",
      "action",
    ];
  } else if (show == "1") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Allowances",
      "Type",
      "value",
      "EffectiveValue",
      "action",
      ""
    ];
  }
  else if (show == "8") {
    VISIBLE_FIELDS = [
      "SLNO",
      "FromDate",
      "ToDate",
      "LeavePart",
      "Status",

      "action",
    ];
  }
  else if (show == "9") {
    VISIBLE_FIELDS = [
      "SLNO",
      "Date",
      //"Name",
      "Purpose",
      "Amount",
      "Status",
      "action",
    ];
  } else if (show == "10") {
    VISIBLE_FIELDS = [
      "SLNO",
      "RegularizationDate",
      "NewCheckInDate",
      "NewCheckOutDate",
      "NewCheckInTime",
      "NewCheckOutTime",
      "Status",
      "action",
    ];
  } else if (show == "6") {
    VISIBLE_FIELDS = ["SLNO", "OtDate", "NumberOfHours", "Status", "action"];
  } else if (show == "7") {
    VISIBLE_FIELDS = [
      "SLNO",
      "SalaryAdvanceDate",
      //"OverHeadsCode",
      "OverHeads",
      "Amount",
      "Status",
      "action",
    ];
  }
  else if (show == "11") {
    VISIBLE_FIELDS = [
      "SLNO",
      "PermissionDate",
      //"OverHeadsCode",
      "FromTime",
      "ToTime",
      "Reasons",
      "Status",
      "action",
    ];
  }
  else {
    VISIBLE_FIELDS = [
      "SLNO",
      "Deductions",
      "Type",
      "value",
      "EffectiveValue",
      "action",
    ];
  }
  const fetchAttachments = async (rowData, setFiles, setError, setLoading, appId) => {
    const url = store.getState().globalurl.empGetAttachmentUrl;

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          empId: recID,
          appId: rowData.RecordID,
        },
      });
      setFiles(response.data);
    } catch (err) {
      setError('Failed to fetch attachments.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );




  const [rowCount, setRowCount] = useState(0);

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //

  function LeaveTool() {
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
            {show == "2"
              ? "List of Leave"
              : show == "6"
                ? "List of Over Time"
                : show == "7"
                  ? "List of SalaryAdvance"
                  : show == "1"
                    ? "List of Allowance"
                    : show == "8"
                      ? "List of On Duty"
                      : show == "10"
                        ? "List of Attendance"
                        : show == "11"
                          ? "List of Permission"
                          : show == "9"
                            ? "List of Expense"
                            : "List of Deductions"}
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
          <Tooltip title="ADD">
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }


  function empAttendanceTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Payroll Attendance</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }

  function AttendanceTool() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Attendance</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }

  const column = [
    {
      field: "SLNO",
      headerName: "SL.NO",
    },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
    },
    // {
    //   field: "Block",
    //   headerName: "Block",
    //   flex: 1,
    // },
    {
      field: "Day1",
      headerName: "1",
      flex: 1,
    },
    {
      field: "Day2",
      headerName: "2",
      flex: 1,
    },
    {
      field: "Day3",
      headerName: "3",
      flex: 1,
    },
    {
      field: "Day4",
      headerName: "4",
      flex: 1,
    },
    {
      field: "Day5",
      headerName: "5",
      flex: 1,
    },
    {
      field: "Day6",
      headerName: "6",
      flex: 1,
    },
    {
      field: "Day7",
      headerName: "7",
      flex: 1,
    },
    {
      field: "Day8",
      headerName: "8",
      flex: 1,
    },
    {
      field: "Day9",
      headerName: "9",
      flex: 1,
    },
    {
      field: "Day10",
      headerName: "10",
      flex: 1,
    },
    {
      field: "Day11",
      headerName: "11",
      flex: 1,
    },
    {
      field: "Day12",
      headerName: "12",
      flex: 1,
    },
    {
      field: "Day13",
      headerName: "13",
      flex: 1,
    },
    {
      field: "Day14",
      headerName: "14",
      flex: 1,
    },
    {
      field: "Day15",
      headerName: "15",
      flex: 1,
    },

    {
      field: "Day16",
      headerName: "16",
      flex: 1,
    },
    {
      field: "Day17",
      headerName: "17",
      flex: 1,
    },
    {
      field: "Day18",
      headerName: "18",
      flex: 1,
    },
    {
      field: "Day19",
      headerName: "19",
      flex: 1,
    },
    {
      field: "Day20",
      headerName: "20",
      flex: 1,
    },

    {
      field: "Day21",
      headerName: "21",
      flex: 1,
    },

    {
      field: "Day22",
      headerName: "22",
      flex: 1,
    },

    {
      field: "Day23",
      headerName: "23",
      flex: 1,
    },

    {
      field: "Day24",
      headerName: "24",
      flex: 1,
    },

    {
      field: "Day25",
      headerName: "25",
      flex: 1,
    },

    {
      field: "Day26",
      headerName: "26",
      flex: 1,
    },

    {
      field: "Day27",
      headerName: "27",
      flex: 1,
    },
    {
      field: "Day28",
      headerName: "28",
      flex: 1,
    },

    {
      field: "Day29",
      headerName: "29",
      flex: 1,
    },

    {
      field: "Day30",
      headerName: "30",
      flex: 1,
    },

    {
      field: "Day31",
      headerName: "31",
      flex: 1,
    },

    {
      field: "Present",
      headerName: "Present",
    },
    // {
    //   field: "Absent",
    //   headerName: "Absent",

    // },
    {
      field: "Leave",
      headerName: "Leave",
    },
    {
      field: "Weekoff",
      headerName: "weekoff",
    },
    {
      field: "Total",
      headerName: "Total",
    },
  ];
  const AttColumn = [
    {
      field: "SLNO",
      headerName: "SL.NO",
    },

    {
      field: "EmplyeeCheckInDateTime",
      headerName: "Emplyee CheckIn Date Time",
      flex: 1,
    },
    {
      field: "EmplyeeCheckOutDateTime",
      headerName: "Emplyee CheckOut Date Time",
      flex: 1,
    },
    {
      field: "NumberOfHoursWorked",
      headerName: "Number Of Hours Worked",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleButtonClick(params)}
          // onClick={() =>
          // {
          // handleButtonClick
          // dispatch(setReg({ params}));
          //dispatch(setReg({ params}));
          //regfn(params);
          // Navigate to the second screen for regularization
          //  navigate(`/Apps/TR219/Regularization/${params.row.RecordID}`);
          // Set the selected row data in the state
          //   setAsignReg({
          //     CheckInDate: params.row.CheckInDate,
          //     CheckOutDate: params.row.CheckOutDate,
          //     EmplyeeCheckInDateTime: params.row.EmplyeeCheckInDateTime,
          //     EmplyeeCheckOutDateTime: params.row.EmplyeeCheckOutDateTime,
          //     MonthDate: params.row.MonthDate,
          //     Name: params.row.Name,
          //     NumberOfHoursWorked: params.row.NumberOfHoursWorked,
          //     RecordID: params.row.RecordID,
          //     SLNO: params.row.SLNO,
          //     Status: params.row.Status
          //   });
          //   console.log(asignReg, "--onclick asignReg");
          //   console.log(params.row, "-- onclick setAsignReg");
          //  console.log(params.row.Name, "--Name");
          // }}
          // }
          >
            Regularization
          </Button>
        );
      },
    },
  ];

  const [itemCustodyData, setItemCustodyData] = useState({
    recordID: "",
    itemNO: "",
    itemName: "",
    assestID: "",
    itemValue: "",
    reference: "",
  });

  const [leaveData, setLeaveData] = useState({
    recordID: "",
    fromDate: "",
    toDate: "",
    LeavePart: "",
    Status: "",
    comment: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
    leavetype: ""
  });

  const [perData, setPerData] = useState({
    recordID: "",
    fromtime: "",
    totime: "",
    location: "",
    Status: "",
    reason: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
    permissiondate: ""
  });

  const [allDecData, setAllDecData] = useState({
    recordID: "",
    value: "",
    sortOrder: "",
  });

  const [otdata, setOtdata] = useState({
    RecordID: "",
    OtDate: "",
    NumberOfHours: "",
    OtType: "",
    PaymentMethod: "",
    Status: "",
    comments: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
    ReimbursementOption: ""
  });

  const [ondutydata, setOndutydata] = useState({
    RecordID: "",
    FromDate: "",
    ToDate: "",
    Status: "",
    AppliedDate: "",
    LeavePart: "",
    comment: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
    ProName: "",
    location: ""
  });

  const [saladdata, setSaladdata] = useState({
    RecordID: "",
    SalaryAdvanceDate: "",
    ReferranceIfAny: "",
    OverHeadsID: "",
    // OverHeadsCode:"",
    // OverHeadsName: "",
    Status: "",
    Amount: "",
    Comments: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
  });

  const [expensedata, setExpensedata] = useState({
    RecordID: "",
    referenceifany: "",
    Status: "",
    amount: "",
    comments: "",
    managerComments: "",
    approvedby: "",
    approvedDate: "",
    date: "",
    OverHeadsID: "",
  });

  const [regdata, setRegdata] = useState({
    RecordID: "",
    MonthDate: "",
    CheckInDate: "",
    EmplyeeCheckInDateTime: "",
    CheckOutDate: "",
    managerComments: "",
    EmplyeeCheckOutDateTime: "",
    Status: "",
    remarks: "",
    appliedStatus: "",
  });

  const selectCellRowData = ({ rowData, mode, field }) => {



    setFunMode(mode);

    if (mode == "A") {
      dispatch(resetregularizedata());
      setAllDecData({
        recordID: "",
        value: "",
        sortOrder: "",
      });
      setCheckdate("")

      setADLookupData(null);
      setselectLETLookupData(null);
      setselectOHLookupData(null);
      setselectleaveLookupData(null);
      setselectODLookupData(null);
      setExpenseOHData(null);
      //   {
      //   OHlookupRecordid: "",
      //   OHlookupCode: "",
      //   OHlookupDesc: "",
      // });

      setLeaveData({
        recordID: "",
        fromDate: "",
        toDate: "",
        LeavePart: "",
        Status: "",
        comment: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
        leavetype: ""
      });
      setOtdata({
        RecordID: "",
        OtDate: "",
        NumberOfHours: "",
        OtType: "",
        PaymentMethod: "",
        Status: "",
        comments: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
        ReimbursementOption: ""
      });
      setOndutydata({
        RecordID: "",
        LeavePart: "",
        FromDate: "",
        ToDate: "",
        Status: "",
        AppliedDate: "",
        ProName: "",
        location: "",
        comment: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
      });
      setSaladdata({
        RecordID: "",
        SalaryAdvanceDate: "",
        ReferranceIfAny: "",
        OverHeadsID: "",
        // OverHeadsCode:"",
        // OverHeadsName: "",
        Status: "",
        Amount: "",
        Comments: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
      });
      setPerData({
        recordID: "",
        fromtime: "",
        totime: "",
        location: "",
        Status: "",
        reason: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
        permissiondate: ""
      });
      setExpensedata({
        RecordID: "",
        referenceifany: "",
        Status: "",
        amount: "",
        comments: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
        date: "",
        OverHeadsID: ""
      });
      setRegdata({
        RecordID: "",
        MonthDate: "",
        CheckInDate: "",
        EmplyeeCheckInDateTime: "",
        CheckOutDate: "",
        managerComments: "",
        approvedby: "",
        approvedDate: "",
        EmplyeeCheckOutDateTime: "",
        Status: "",
        remarks: "",
        appliedStatus: ""
      });
    } else {
      if (field == "action") {
        fetchAttachments(rowData, setFiles, setError, setLoading);
        setItemCustodyData({
          recordID: rowData.RecordID,
          itemNO: rowData.ItemNumber,
          itemName: rowData.ItemName,
          assestID: rowData.ItemValue,
          itemValue: rowData.ItemValue,
          reference: rowData.ItemValue,
        });
        setLeaveData({
          recordID: rowData.RecordID,
          fromDate: rowData.FromDate,
          toDate: rowData.ToDate,
          LeavePart: rowData.LeavePart,
          Status: rowData.Status,
          comment: rowData.Comments,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
          leavetype: rowData.LeaveTypeID,
          EmployeeID: rowData.EmployeeID,
        });
        setPerData({
          recordID: rowData.RecordID,
          fromtime: rowData.FromTime,
          totime: rowData.ToTime,
          location: rowData.Location,
          Status: rowData.Status,
          reason: rowData.Reasons,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
          permissiondate: rowData.PermissionDate
        });
        setOtdata({
          RecordID: rowData.RecordID,
          OtDate: rowData.OtDate,
          NumberOfHours: rowData.NumberOfHours,
          OtType: rowData.OtType,
          PaymentMethod: rowData.PaymentMethod,
          Status: rowData.Status,
          comments: rowData.Comments,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
          ReimbursementOption: rowData.ReimbursementOption
        });
        setOndutydata({
          RecordID: rowData.RecordID,
          LeavePart: rowData.LeavePart,
          FromDate: rowData.FromDate,
          ToDate: rowData.ToDate,
          AppliedDate: rowData.AppliedDate,
          ProName: rowData.ProjectID,
          location: rowData.Location,
          Status: rowData.Status,
          comment: rowData.Comments,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
        });

        setselectLETLookupData({
          RecordID: rowData.LeaveTypeID,
          Code: rowData.LeaveTypeCode,
          Name: rowData.LeaveTypeName,
          // letlookupCode: rowData.LeaveTypeCode,
          // letlookupRecordid: rowData.LeaveTypeID,
          // letlookupDesc: rowData.LeaveTypeName,
        });
        setselectleaveLookupData({
          RecordID: rowData.LeaveTypeID,
          Code: rowData.LeaveTypeCode,
          Name: rowData.LeaveTypeName,
          // OHlookupRecordid: rowData.OverHeadsID,
          // OHlookupCode: rowData.OverHeadsCode,
          // OHlookupDesc: rowData.OverHeadsName,
        });
        setselectODLookupData({
          RecordID: rowData.ProjectID,
          Code: rowData.ProjectCode,
          Name: rowData.ProjectName,
        });
        setselectOHLookupData({
          RecordID: rowData.OverHeadsID,
          Code: rowData.OverHeadsCode,
          Name: rowData.OverHeadsName,
          // OHlookupRecordid: rowData.OverHeadsID,
          // OHlookupCode: rowData.OverHeadsCode,
          // OHlookupDesc: rowData.OverHeadsName,
        });
        setExpenseOHData({
          RecordID: rowData.OverheadRecordID,
          //Code: rowData.OverHeadsCode,
          Name: rowData.Name,
        });
        setSaladdata({
          RecordID: rowData.RecordID,
          SalaryAdvanceDate: rowData.SalaryAdvanceDate,
          ReferranceIfAny: rowData.ReferranceIfAny,
          OverHeadsID: rowData.OverHeadsID,
          Amount: rowData.Amount,
          Comments: rowData.Comments,
          Status: rowData.Status,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
        });
        setExpensedata({
          RecordID: rowData.RecordID,
          referenceifany: rowData.Referenceifany,
          date: rowData.Date,
          amount: rowData.Amount,
          comments: rowData.Comments,
          Status: rowData.Status,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
          OverHeadsID: rowData.OverheadRecordID,
        });
        setRegdata({
          RecordID: rowData.RecordID,
          MonthDate: rowData.RegularizationDate,
          // CheckInDate:rowData.CheckInDate,
          // EmplyeeCheckInDateTime: rowData.CheckInTime,
          // CheckOutDate: rowData.CheckOutDate,
          CheckInDate: rowData.NewCheckInDate,
          EmplyeeCheckInDateTime: rowData.NewCheckInTime,
          CheckOutDate: rowData.NewCheckOutDate,
          managerComments: rowData.ManagerComments,
          approvedby: rowData.ApprovedBy,
          approvedDate: rowData.ApprovedDate,
          EmplyeeCheckOutDateTime: rowData.NewCheckOutTime,
          Status: rowData.Status,
          appliedStatus: rowData.AppliedStatus,
          remarks: rowData.Remarks

        });
        setAllDecData({
          recordID: rowData.RecordID,
          value: rowData.value,
          sortOrder: rowData.Sortorder,
        });

        setADLookupData({
          // adType: rowData.Type,
          // adRecordID: rowData.SalaryComponentID,
          // adDesc: rowData.Name,
          // adCategory: rowData.Category,
          RecordID: rowData.SalaryComponentID,
          Type: rowData.Type,
          Name: rowData.Name,
          SalaryCategory: rowData.Category,
        });
      }
    }
  };



  const [ImageName, setImgName] = useState("");
  const expenseinitialValue = {
    code: Data.Code,
    description: Data.Name,
    date: formatDate(expensedata.date),
    referenceifany: expensedata.referenceifany,
    amount: expensedata.amount,
    comments: expensedata.comments,
    managerComments: expensedata.managerComments,

    approvedDate: mode != "A" ? currentDate : expensedata.approvedDate,
    Eapprovedby: UserName,
    OHRecordID: expensedata.OverHeadsID,
    //overhead: expensedata.overhead && mode != "A" ? { RecordID: expensedata.overhead, Name: expensedata.Name } : null,
    Status:
      expensedata.Status == "Applied"
        ? "AL"
        : expensedata.Status == "Rejected"
          ? "RJ"
          : expensedata.Status == "Approved"
            ? "AP"
            : expensedata.Status == "Query"
              ? "QR"
              : "",
  };
  const getExpenseFileChange = async (event) => {
    setImgName(event.target.files[0]);


    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(fileUpload({ formData }));

    setImgName(fileData.payload.name);

    if (fileData.payload.Status == "Y") {
      toast.success(fileData.payload.Msg);
    }
  };
  const expensefnSave = async (values, resetForm, del) => {
    setLoading(true);

    const idata = {
      RecordID: expensedata.RecordID,
      FEDate: values.date,
      Referenceifany: values.referenceifany,
      Amount: values.amount,
      Comments: values.comments,
      //OverheadRecordID: values.overhead.RecordID || 0,
      OverheadsRecordID: expenseOHData ? expenseOHData.RecordID : 0,
      OverHeadsCode: expenseOHData ? expenseOHData.Code : "",
      OverHeadsName: expenseOHData ? expenseOHData.Name : "",
      Attachment: ImageName ? ImageName : Data.Attachment || "",
      AppliedDate: currentDate,
      FinanceCategoryType: "E",
      Approvedby: recID,
      EApprovedBy: UserRecordid,
      ManagerComments: values.managerComments,
      ApprovedDate: values.approvedDate,
      Status: values.Status,
      Reason: "",
      Source: "HR",
      // Finyear,
      // compID,
    };
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const response = await dispatch(
      explorePostData({ accessID: "TR086", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);


      //  if (mode == "A") {
      dispatch(
        requestMail({ EmployeeID: recID, Type: "EE", RecordID: response.payload.FinanceEntryRecid })
      );

      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.FinanceEntryRecid, ManagerID: 0, "EmployeeID": recID, "Type": "EE", "Status": "AP", Reason: "" } }))
      }


      // }

      dispatch(
        //fetchExplorelitview("TR242", "On Duty", `EmployeeID=${recID}`, "",`CompId=${compID}`)
        fetchExplorelitview("TR086", "Expense", `parentID ='E' AND Approvedby=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };
  // -------------------------------- ON Duty ----------------------------------------------
  const [checkindate, setCheckdate] = useState("")
  const RegInitialValue = {
    code: Data.Code,
    description: Data.Name,
    approvedDate: mode != "A" ? currentDate : regdata.approvedDate,
    approvedby: UserName,
    CheckInDate: formatDate(regdata.CheckInDate) || checkindate,
    CheckOutDate: funMode === "A" ? RegData.CheckOutDate : formatDate(regdata.CheckOutDate),
    MonthDate: funMode === "A" ? currentDate : formatDate(regdata.MonthDate),
    EmplyeeCheckInDateTime: funMode === "A" ? RegData.CheckInTime : regdata.EmplyeeCheckInDateTime,

    EmplyeeCheckOutDateTime: funMode === "A" ? RegData.CheckOutTime : regdata.EmplyeeCheckOutDateTime,
    Status: funMode === "A" ? RegData.Status
      : regdata.Status == "Present"
        ? "P"
        : regdata.Status == "Absent"
          ? "A"
          : regdata.Status == "WeekOff"
            ? "W"
            : regdata.Status == "Irregular"
              ? "I"
              : regdata.Status == "Leave"
                ? "L"
                : "",
    appliedStatus: funMode === "A" ? RegData.AppliedStatus
      : regdata.appliedStatus == "Applied"
        ? "AL"
        : regdata.appliedStatus == "Rejected"
          ? "RJ"
          : regdata.appliedStatus == "Approved"
            ? "AP"
            : regdata.appliedStatus == "Query"
              ? "QR"
              : "",
    remarks: funMode === "A" ? RegData.Remarks : regdata.remarks,
    managerComments: regdata.managerComments,
    //  code: Data.Code,
    //     description: Data.Name,
    //   approvedDate: mode != "A" ? currentDate : regdata.approvedDate,
    //   approvedby:UserName, 
    //   CheckInDate: formatDate(regdata.CheckInDate),
    //   CheckOutDate:formatDate(regdata.CheckOutDate),
    //   MonthDate: funMode === "A" ? currentDate :formatDate(regdata.MonthDate),
    //   EmplyeeCheckInDateTime: regdata.EmplyeeCheckInDateTime,

    //   EmplyeeCheckOutDateTime:regdata.EmplyeeCheckOutDateTime,
    //   Status:regdata.Status == "Present"
    //       ? "P"
    //       : regdata.Status == "Absent"
    //         ? "A"
    //         : regdata.Status == "WeekOff"
    //           ? "W"
    //           : regdata.Status == "Irregular"
    //           ? "I"
    //           : regdata.Status == "Leave"
    //           ? "L"
    //           : "",
    //   appliedStatus:
    //     regdata.appliedStatus == "Applied"
    //       ? "AL"
    //       : regdata.appliedStatus == "Rejected"
    //         ? "RJ"
    //         : regdata.appliedStatus == "Approved"
    //           ? "AP"
    //           : regdata.appliedStatus == "Query"
    //           ? "QR"
    //           : "",
    //   remarks: regdata.remarks,
    //   managerComments: regdata.managerComments,
  };


  const RegFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      RecordID: recID,
      RegularizationDate: values.MonthDate,
      CheckInDate: funMode === "A" ? RegData.CheckInDate : formatDate(regdata.CheckInDate),
      CheckOutDate: funMode === "A" ? RegData.CheckOutDate : formatDate(regdata.CheckOutDate),
      CheckInTime: funMode === "A" ? RegData.CheckInTime : regdata.EmplyeeCheckInDateTime,
      CheckOutTime: funMode === "A" ? RegData.CheckOutTime : regdata.EmplyeeCheckOutDateTime,
      Status: funMode === "A" ? RegData.Status : regdata.Status,
      AppliedStatus: values.appliedStatus,
      Remarks: values.remarks,
      Source: "Web Application",
      NewCheckInDate: values.CheckInDate,
      NewCheckOutDate: values.CheckOutDate,
      NewCheckInTime: values.EmplyeeCheckInDateTime,
      NewCheckOutTime: values.EmplyeeCheckOutDateTime,
      NewStatus: values.Status,
      Reason: "",
      ApprovedDate: values.approvedDate,
      ApprovedBy: UserRecordid,
      ManagerComments: values.managerComments,
      EmployeeID: recID,
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR219", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      // if (mode == "A") {
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "RG",
          RecordID: response.payload.RegRecID,
        })
      );
      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.RegRecID, ManagerID: 0, "EmployeeID": recID, "Type": "RG", "Status": "AP", Reason: "" } }))
      }

      // }
      dispatch(
        fetchExplorelitview("TR219", "Regularization", `EmployeeID=${recID}`, "", `CompId=${CompanyID}`)
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      dispatch(resetregularizedata());
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };
  const ondutyInitialValue = {
    code: Data.Code,
    description: Data.Name,
    FromDate: formatDate(ondutydata.FromDate),
    ToDate: formatDate(ondutydata.ToDate),
    approvedby: UserName,
    approvedDate: mode != "A" ? currentDate : leaveData.approvedDate,
    location: ondutydata.location,
    ProName: ondutydata.ProName,
    managerComments: ondutydata.managerComments,
    comment: ondutydata.comment,
    LeavePart:
      ondutydata.LeavePart === "First half"
        ? "FH"
        : ondutydata.LeavePart === "Second Half"
          ? "SH"
          : ondutydata.LeavePart === "Full Day"
            ? "N"
            : "",
    Status:
      ondutydata.Status == "Applied"
        ? "AL"
        : ondutydata.Status == "Rejected"
          ? "RJ"
          : ondutydata.Status == "Approved"
            ? "AP"
            : ondutydata.Status == "Query"
              ? "QR"
              : "",
    //Status: ondutydata.Status,  
    //SortOrder: ondutydata.SortOrder,
    //Disable: ondutydata.Disable,
  };

  const ondutyFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: ondutydata.RecordID,
      EmployeeID: recID,
      //EmployeeID: mode == "M" ? params.parentID : EMPID,
      FromDate: values.FromDate,
      ToDate: values.ToDate,
      LeavePart: values.LeavePart,
      Comments: values.comment,
      ProjectID: selectODLookupData ? selectODLookupData.RecordID : 0,
      ProjectCode: selectODLookupData ? selectODLookupData.Code : "",
      ProjectName: selectODLookupData ? selectODLookupData.Name : "",
      Status: values.Status,
      ManagerComments: values.managerComments,
      Reason: "",
      AppliedDate: currentDate,
      Location: values.location,
      //BalanceDay: selectedLeavetypebalance || 0,
      ApprovedBy: UserRecordid,
      ApprovedDate: values.approvedDate,
      SortOrder: "1",
      Disable: "N",
      Source: "HR",


      //   LeaveTypeID: values.leavetype.RecordID || 0,
    };

    // const response = await dispatch(
    //   explorePostData({ accessID: "TR242", action, idata })
    // );
    // if (response.payload.Status == "Y") {
    //   if (mode == "A") {

    //     dispatch(requestMail({ "EmployeeID": EMPID, "Type": "OD", "RecordID": response.payload.Recid }))
    //     dispatch(leaveAppoval({ data: { "RecordID": response.payload.OndutyRecid, ManagerID: EMPID, "EmployeeID": EMPID, "Type": "OD", "Status": "AL", Reason: "" } }))

    //   }
    //   if (mode == "M") {

    //     dispatch(leaveAppoval({ data: { "RecordID": recID, ManagerID: EMPID, "EmployeeID": params.parentID, "Type": "L", "Status": values.Status == "AP" ? "Y" : "N", Reason: "" } }))

    //   }
    //   setLoading(false);
    //   //dispatch(fetchExplorelitview("TR242", "On Duty", `${EMPID}`, ""));
    //   dispatch(fetchExplorelitview("TR242", "On Duty", `EmployeeID=${recID}`, ""));

    //   toast.success(response.payload.Msg);
    //   navigate(-1);

    //   // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    //   resetForm();
    // } else {
    //   setLoading(false);
    //   toast.error(response.payload.Msg);
    // }
    const response = await dispatch(
      explorePostData({ accessID: "TR242", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      // if (mode == "A") {   
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "OD",
          RecordID: response.payload.OndutyRecid,
        })
      );


      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.OndutyRecid, ManagerID: 0, "EmployeeID": recID, "Type": "OD", "Status": "AP", Reason: "" } }))
      }


      // }
      dispatch(
        //fetchExplorelitview("TR242", "On Duty", `EmployeeID=${recID}`, "",`CompId=${compID}`)
        fetchExplorelitview("TR242", "On Duty", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  //-------------------------------------LEAVE SAVE FUNCTION---------------------------------------------//
  const Balancedayfind = async (LeaveTypeID) => {
    try {
      const response = await dispatch(
        getLeaveentryData({
          EmployeeID: recID,
          LeaveTypeID: LeaveTypeID,
        })
      );


      const balancedayvaluefind = response.payload.Data;
      setSelectedLeavetypebalance(response.payload.Data.ELC_ELIGIBLEDAYS);

      // return balancedayvaluefind; // optional if needed
    } catch (error) {
      console.error("Error in Balancedayfind:", error);
    }
  };

  const [selectedLeavetypebalance, setSelectedLeavetypebalance] = useState("");
  const permisinitialValue = {
    code: Data.Code,
    description: Data.Name,
    permissiondate: perData.permissiondate,
    location: perData.location,
    fromtime: perData.fromtime,
    totime: perData.totime,
    managerComments: perData.managerComments,
    reason: perData.reason,
    approvedby: UserName,
    //approvedDate:mode == "A" ? currentDate : perData.approvedDate,
    approvedDate: mode != "A" ? currentDate : perData.approvedDate,

    Status:
      perData.Status == "Applied"
        ? "AL"
        : perData.Status == "Rejected"
          ? "RJ"
          : perData.Status == "Approved"
            ? "AP"
            : perData.Status == "Query"
              ? "QR"
              : "",
    SortOrder: "1",
    Disable: "N",
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };
  const PerFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: perData.recordID,

      EmployeeID: recID,
      Status: values.Status,
      SortOrder: "1",
      Disable: "N",
      PermissionDate: values.permissiondate,
      Comments: values.reason,
      Location: values.location,
      Reasons: values.reason,
      FromTime: values.fromtime,
      ToTime: values.totime,
      ManagerComments: values.managerComments,
      ApprovedBy: UserRecordid,
      ApprovedDate: values.approvedDate,
      Location: values.location,
      FromTime: values.fromtime,
      ToTime: values.totime,
      CompanyID,
      //Reason: "",
      AppliedDate: currentDate,
      Source: "HR",

    };
    const response = await dispatch(
      explorePostData({ accessID: "TR266", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      // if (mode == "A") {
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "L",
          RecordID: response.payload.EleaveRecid,
        })
      );
      // }

      dispatch(
        fetchExplorelitview("TR266", "Permission", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };


  const leaveInitialValue = {
    code: Data.Code,
    description: Data.Name,
    managerComments: leaveData.managerComments,
    comment: leaveData.comment,
    approvedby: UserName,
    //approvedDate:mode == "A" ? currentDate : leaveData.approvedDate,
    approvedDate: mode != "A" ? currentDate : leaveData.approvedDate,
    FromDate: formatDate(leaveData.fromDate),
    ToDate: formatDate(leaveData.toDate),
    //leavetype:leaveData.leavetype,
    //leavetype:leaveData.leavetype && mode != "A" ? { RecordID: leaveData.leavetype, Name: leaveData.leavetype } : null,
    leavetype: leaveData.leavetype,
    LeavePart:
      leaveData.LeavePart === "First half"
        ? "FH"
        : leaveData.LeavePart === "Second Half"
          ? "SH"
          : leaveData.LeavePart === "Full Day"
            ? "N"
            : "",
    Status:
      leaveData.Status == "Applied"
        ? "AL"
        : leaveData.Status == "Rejected"
          ? "RJ"
          : leaveData.Status == "Approved"
            ? "AP"
            : leaveData.Status == "Query"
              ? "QR"
              : "",
    SortOrder: "1",
    Disable: "N",
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };

  const leaveFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: leaveData.recordID,
      FromDate: values.FromDate,
      ToDate: values.ToDate,
      LeavePart: values.LeavePart,
      EmployeeID: recID,
      Status: values.Status,
      SortOrder: "1",
      Disable: "N",
      //LeaveTypeID:values.leavetype.RecordID,
      LeaveTypeID: selectleaveLookupData ? selectleaveLookupData.RecordID : 0,
      LeaveTypeCode: selectleaveLookupData ? selectleaveLookupData.Code : "",
      LeaveTypeName: selectleaveLookupData ? selectleaveLookupData.Name : "",
      //LeaveTypeID: selectLETLookupData ? selectLETLookupData.RecordID : 0,
      Comments: values.comment,
      ManagerComments: values.managerComments,
      ApprovedBy: UserRecordid,
      ApprovedDate: values.approvedDate,
      Reason: "",
      AppliedDate: currentDate,
      BalanceDay: selectedLeavetypebalance || 0,
      Source: "HR",

    };
    const response = await dispatch(
      explorePostData({ accessID: "TR208", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "L",
          RecordID: response.payload.EleaveRecid,
        })
      );

      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.EleaveRecid, ManagerID: 0, "EmployeeID": recID, "Type": "L", "Status": "AP", Reason: "" } }))
      }




      dispatch(
        fetchExplorelitview("TR208", "Leave", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  /*OT SAVE FUNCTION*/
  //-------------------------------------OT SAVE FUNCTION---------------------------------------------//

  const otInitialValue = {
    code: Data.Code,
    description: Data.Name,
    Date: formatDate(otdata.OtDate),
    NumberOfHours: otdata.NumberOfHours,
    comments: otdata.comments,
    managerComments: otdata.managerComments,
    approvedby: UserName,
    approvedDate: mode != "A" ? currentDate : otdata.approvedDate,
    //ReimbursementOption:otdata.ReimbursementOption,
    ReimbursementOption: otdata.ReimbursementOption === "One Time and Half"
      ? "OH"
      : otdata.ReimbursementOption === "One and Half Time"
        ? "HT"
        : otdata.ReimbursementOption === "Compensatory Half"
          ? "CH"
          : "",
    //approvedDate:otdata.approvedDate,
    PaymentMethod:
      otdata.PaymentMethod === "Cash Reimbursement"
        ? "CR"
        : otdata.PaymentMethod === "Compensatory Half"
          ? "CH"
          : "",
    OtType:
      otdata.OtType === "Flexible Scheduling"
        ? "FS"
        : otdata.OtType === "Shift Swaps"
          ? "SS"
          : "",
    Status:
      otdata.Status === "Applied"
        ? "AL"
        : otdata.Status === "Approved"
          ? "AP"
          : otdata.Status === "Rejected"
            ? "RJ"
            : otdata.Status === "Query"
              ? "QR"
              : "",
  };

  const otFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      //RecordID:leaveData.recordID,
      RecordID: otdata.RecordID,
      OtDate: values.Date,
      NumberOfHours: values.NumberOfHours,
      PaymentMethod: values.PaymentMethod,
      OtType: values.OtType,
      Status: values.Status,
      Comments: values.comments,
      EmployeeID: recID,
      ManagerComments: values.managerComments,
      ApprovedBy: UserRecordid,
      ApprovedDate: values.approvedDate,
      Reason: "",
      AppliedDate: currentDate,
      //BalanceDay: selectedLeavetypebalance || 0,
      ReimbursementOption: values.ReimbursementOption,
      ProjectID: "1",
      Source: "HR",


    };

    const response = await dispatch(
      explorePostData({ accessID: "TR216", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      //  if (mode == "A") {
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "OT",
          RecordID: response.payload.EmpOtRecid,
        })
      );

      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.EmpOtRecid, ManagerID: 0, "EmployeeID": recID, "Type": "OT", "Status": "AP", Reason: "" } }))
      }


      //  }
      dispatch(fetchExplorelitview("TR216", "OT", `EmployeeID=${recID}`, ""));

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };
  // Salary Advance
  const salAdinitialValue = {
    //RecID: data.RecordID,
    code: Data.Code,
    description: Data.Name,
    OHRecordID: saladdata.OverHeadsID,
    // OHCode: saladdata.OverHeadsCode,
    // OHName: saladdata.OverHeadsName,
    date: formatDate(saladdata.SalaryAdvanceDate),
    referenceifany: saladdata.ReferranceIfAny,
    // purpose: saladdata.OverHeadsID,
    amount: saladdata.Amount,
    comments: saladdata.Comments,
    approvedby: UserName,
    managerComments: leaveData.managerComments,
    approvedDate: mode != "A" ? currentDate : saladdata.approvedDate,
    Status:
      saladdata.Status === "Applied"
        ? "AL"
        : saladdata.Status === "Approved"
          ? "AP"
          : saladdata.Status === "Rejected"
            ? "RJ"
            : saladdata.Status === "Query"
              ? "QR"
              : "",
  };
  const salAdFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: saladdata.RecordID,
      //RecordID: Data.recID,
      SalaryAdvanceDate: values.date,
      ReferranceIfAny: values.referenceifany,
      OverHeadsID: selectOHLookupData ? selectOHLookupData.RecordID : 0,
      OverHeadsCode: selectOHLookupData ? selectOHLookupData.Code : "",
      OverHeadsName: selectOHLookupData ? selectOHLookupData.Name : "",
      // OverHeadsID: selectOHLookupData.OHlookupRecordid,
      // OverHeadsCode: selectOHLookupData.OHlookupCode,
      // OverHeadsName: selectOHLookupData.OHlookupDesc,
      Status: values.Status,
      Amount: values.amount,
      Comments: values.comments,
      EmployeeID: recID,
      ManagerComments: values.managerComments,
      ApprovedBy: UserRecordid,
      ApprovedDate: values.approvedDate,
      Reason: "",
      AppliedDate: currentDate,
      Source: "HR",


    };

    const response = await dispatch(
      explorePostData({ accessID: "TR160", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      // if (mode == "A") {
      dispatch(
        requestMail({
          EmployeeID: recID,
          Type: "SA",
          RecordID: response.payload.SalaryAdvanceRecid,
        })
      );


      if (values.Status == "AP") {

        dispatch(leaveAppoval({ data: { "RecordID": response.payload.SalaryAdvanceRecid, ManagerID: 0, "EmployeeID": recID, "Type": "SA", "Status": "AP", Reason: "" } }))
      }


      // }

      dispatch(
        fetchExplorelitview(
          "TR160",
          "Salary Advance",
          `EmployeeID=${recID}`,
          ""
        )
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  // **********Save Function*****************
  const AllDedInitialValues = {
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",

    salaryCategory: ADLookupData
      ? ADLookupData.SalaryCategory === "A"
        ? "Allowances"
        : ADLookupData.SalaryCategory === "D"
          ? "Deductions"
          : "N"
      : "",

    // salaryCategory: (ADLookupData.adCategory === 'A') ? "Allowances" : (ADLookupData.adCategory === 'D') ? "Deductions" : ADLookupData.adCategory,
    type: ADLookupData ? ADLookupData.Type : "",

    // type: ADLookupData.adType,
    value: allDecData.value,
    sortorder: allDecData.sortOrder || 0,
  };

  const AllDedFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    var isCheck = "N";
    if (values.checkbox == true) {
      isCheck = "Y";
    }
    const idata = {
      RecordID: allDecData.recordID,
      // "SalaryComponentID": ADLookupData.adRecordID,
      // "SCName": ADLookupData.adDesc,
      SalaryComponentID: ADLookupData ? ADLookupData.RecordID : 0,
      SCName: ADLookupData ? ADLookupData.Name : "",
      SCType: values.type,
      SCCategory: show == "1" ? "A" : "D",
      Value: values.value,
      EffectiveValue:
        show == "1"
          ? Number(Data.Sal) + Number(values.value)
          : Number(Data.Sal) - Number(values.value),
      SortOrder: values.sortorder || 0,
      Disable: "N",

      parentID: recID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR206", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      const query =
        show == "1" ? `${recID} AND Category='A'` : `${recID} AND Category='D'`;
      dispatch(
        fetchExplorelitview("TR206", "AllowancesAndDeductions", query, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };
  // *************** ITEMCUSTODY SCREEN SAVE FUNCTION *************** //

  const itemcustodyInitialValue = {
    code: Data.Code,
    description: Data.Name,
    ItemNumber: itemCustodyData.itemNO,
    ItemName: itemCustodyData.itemName,
    AssestID: itemCustodyData.assestID,
    PurchaseReference: itemCustodyData.reference,
    ItemValue: itemCustodyData.itemValue,
    Disable: "N",
  };
  const empItemCustodyFn = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: itemCustodyData.recordID,
      EmployeeID: recID,
      ItemNumber: values.ItemNumber,
      ItemName: values.ItemName,
      AssestID: values.AssestID,
      PurchaseReference: values.PurchaseReference,
      ItemValue: values.ItemValue,
      Disable: "N",
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR146", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR146", "ItemCustody", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  // *************** PAYROLL ATTENDANCE *************** //
  const PAttInitialvalues = {
    code: Data.Code,
    description: Data.Name,
    month: "",
    year: "",
  };
  const attFnSave = async (values) => {
    const data = {
      Month: values.month.toString(),
      Year: values.year,
      EmployeeID: recID,
    };

    dispatch(empAttendance({ data }));
  };
  /***********Attendance ************/
  const AttInitialvalues = {
    code: Data.Code,
    description: Data.Name,
    Sal: Data.Sal,
    month: "",
    year: "",
  };
  const attendaceFnSave = async (values) => {
    const data = {
      Month: values.month.toString(),
      Year: values.year,
      EmployeeID: recID,
    };

    dispatch(Attendance({ data }));
  };

  /*Attendance Process Button Sve Functions*/
  // const AttProcessInitialvalues={
  //   code: Data.Code,
  //   description: Data.Name,
  //   Sal: Data.Sal,
  //   month:"",
  //   year:"",
  // }
  const attendaceProcessFnSave = async (values) => {
    // toast.success("----response.payload.Msg");


    const data = {
      Month: values.month.toString(),
      Year: values.year,
      EmployeeID: recID,
    };

    const response = await dispatch(AttendanceProcess({ data }));

    // Check if the day count is less than 15
    //   if (values.dayCount < 15) {
    //     alert("Minimum 15 days needed");

    //     // return; // Exit the function if the condition is not met
    // }

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  /*end of the Process button onclick */

  const getFileChange = async (event) => {
    // setImgName(event.target.files[0]);


    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(imageUpload({ formData }));

    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };
  const fnLogOut = (props) => {
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
          navigate("/Apps/TR257/Employee Request");
        }
      } else {
        return;
      }
    });
  };
  const type = show == "2" ? "L" : show == "6" ? "Over Time" : show == "8" ? "OD" : show == "7" ? "SA" : show == "11" ? "P" : show == "9" ? "E" : show == "10" ? "R" : "";

  async function fileUpload(file, appId, action, id, purpose) {
    console.log("🚀 ~ fileUpload ~ file:", file)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('empId', recID);
    formData.append('appId', appId);
    formData.append("action", action);
    formData.append("id", id);
    formData.append("purpose", purpose);
    //formData.append('type', "L");
    if (type) {
      formData.append('type', type);
    }
    formData.append('source', "HR");
    console.log("🚀 ~ fileUpload ~ formData:", formData)
    console.log("Uploading with:", { file, appId, action, id, purpose, recID, type });

    const respose = await dispatch(attachmentPost({ data: formData }))

    if (respose.payload.success) {
      toast.success(respose.payload.message)
      //setShowtable(true);
      var url = store.getState().globalurl.empGetAttachmentUrl;
      axios
        .get(url, {
          params: {
            empId: recID,
            appId: appId,

          }
        })
        .then((response) => {
          setFiles(response.data);
        })
        .catch((err) => {
          setError('Failed to fetch attachments.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
    else {
      toast.success(respose.payload.message)
    }

    console.log("🚀 ~ fileUpload ~ respose:", respose)
  }
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            p={mode == "A" ? 2 : 1}
          >
            <Box
              display="flex"
              borderRadius="3px"
              alignItems={"center"}
            >
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
                    {" "}
                    {mode === "E"
                      ? `Employee(${state.EmpName})`
                      : "Employee(New)"}
                  </Typography>
                  {show == "2" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Leave
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "6" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Over Time
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "7" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Salary Advance
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "8" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      On Duty
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "11" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Permission
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "9" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Expense
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "10" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Regularization
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "3" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Attendance
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "4" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Payroll Attendance
                    </Typography>
                  ) : (
                    false
                  )}
                </Breadcrumbs>
              </Box>
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
                    <MenuItem value={0}>Employee</MenuItem>
                    <MenuItem value={11}>Permission</MenuItem>
                    <MenuItem value={2}>Leave</MenuItem>
                    <MenuItem value={8}>On Duty</MenuItem>
                    <MenuItem value={6}>Over Time</MenuItem>
                    <MenuItem value={10}>Regularization</MenuItem>
                    <MenuItem value={9}>Expense</MenuItem>
                    <MenuItem value={7}>Salary Advance</MenuItem>
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
                <IconButton onClick={() => fnLogOut("Logout")} color="error">
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        {show == "0" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            {/* { <Header title="Products" subtitle="" /> } */}

            <Formik
              // onSubmit={handleFormSubmit}
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={basicSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
                          //    width: {sm:'100%',md:'100%',lg:'100%'},

                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          right: "0px",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={userimg}
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}

                    <FormControl sx={{ gap: formGap }}>
                      <Productautocomplete
                        sx={{ marginTop: "7px" }}
                        name="Department"
                        label="Department"
                        variant="outlined"
                        id="Department"
                        value={values.Department}
                        onChange={(newValue) => {
                          setFieldValue("Department", newValue);
                          console.log(newValue, "--newValue");
                          console.log(newValue.RecordID, "////");
                        }}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2010","ScreenName":"Department","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Code"
                        value={values.Code}
                        id="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Code"
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        required
                        autoFocus
                        inputProps={{ maxLength: 8 }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Name"
                        value={values.Name}
                        id="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Name"
                        // error={!!touched.Name && !!errors.Name}
                        // helperText={touched.Name && errors.Name}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="Password"
                        label="Password"
                        value={values.Password}
                        id="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Password"
                        // error={!!touched.Password && !!errors.Password}
                        // helperText={touched.Password && errors.Password}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Job"
                        value={values.Job}
                        id="Job"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Job"
                        error={!!touched.Job && !!errors.Job}
                        helperText={touched.Job && errors.Job}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                      />

                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label={<span>Employee Type</span>}
                        value={values.employeetype}
                        id="employeetype"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="employeetype"
                        required
                        focused
                        sx={{
                          gridColumn: "span 2",
                          // backgroundColor: "#ffffff",
                          // "& .MuiInputBase-root": {
                          //   backgroundColor: "",
                          // },
                        }}
                      >
                        <MenuItem value="PP">Prohibition Period</MenuItem>
                        <MenuItem value="PM">Permanent</MenuItem>
                        <MenuItem value="CI">Contracts In</MenuItem>
                        <MenuItem value="CO">Contracts Out</MenuItem>
                        {/* <MenuItem value="CT">Contractor</MenuItem> */}
                      </TextField>
                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="checkbox"
                          id="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Disable"
                        />

                        <FormLabel focused={false}>Disable</FormLabel>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="scrummaster"
                          id="scrummaster"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Scrum Master"
                        />

                        <FormLabel focused={false}>Scrum Master</FormLabel>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="prjmanager"
                          id="prjmanager"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Project Manager"
                        />

                        <FormLabel focused={false}>Project Manager</FormLabel>
                      </Box>
                    </FormControl>

                    <FormControl sx={{ gap: formGap }}>
                      {isNonMobile && (
                        <Stack
                          sx={{
                            //    width: {sm:'100%',md:'100%',lg:'100%'},

                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            right: "0px",
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            src={userimg}
                            sx={{ width: "200px", height: "155px" }}
                          />
                        </Stack>
                      )}

                      <TextField
                        name="joindate"
                        type="date"
                        id="joindate"
                        label="Date of Joining"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.joindate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.joindate && !!errors.joindate}
                        helperText={touched.joindate && errors.joindate}
                        sx={{ background: "" }}
                      //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        name="confirmdate"
                        type="date"
                        id="confirmdate"
                        label="Date of Confirmation"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.confirmdate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.confirmdate && !!errors.confirmdate}
                        helperText={touched.confirmdate && errors.confirmdate}
                        sx={{ background: "" }}
                      //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Comments"
                        value={values.Comm}
                        id="Comm"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Comm"
                        error={!!touched.Comm && !!errors.Comm}
                        helperText={touched.Comm && errors.Comm}
                        // sx={{

                        //   backgroundColor: "#ffffff", // Set the background to white
                        //   "& .MuiFilledInput-root": {
                        //     backgroundColor: "", // Ensure the filled variant also has a white background
                        //   }
                        // }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      // rows={2}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Sort Order"
                        value={values.SortOrder}
                        id="SortOrder"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="SortOrder"
                        error={!!touched.SortOrder && !!errors.SortOrder}
                        helperText={touched.SortOrder && errors.SortOrder}
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
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" padding={1} gap={2}>
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                        onClick={() => {
                          fnSave(values, false);
                        }}
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
                        onClick={() => {
                          Swal.fire({
                            title: `Do you want Delete?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              fnSave(values, true);
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
                      //  color="error"
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR027/Employees`);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box ml={2} p={2} borderRadius={2}>
                    <Typography variant="h6" align="right" color="primary">
                      <strong>Explore:</strong>&nbsp;
                      <span style={{ color: "#424242" }}>
                        Permission, Leave, On Duty, Over Time, Regularization, Expense, Salary Advance
                      </span>
                    </Typography>
                  </Box>
                  <Popup
                    title="Department"
                    openPopup={openDEPopup}
                    setOpenPopup={setOpenDEPopup}
                  >
                    <Listviewpopup
                      accessID="2010"
                      screenName="Department"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  <Popup
                    title="Location"
                    openPopup={openLOCATIONPopup}
                    setOpenPopup={setOpenLOCATIONPopup}
                  >
                    <Listviewpopup
                      accessID="2051"
                      screenName="Location"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  <Popup
                    title="Gate"
                    openPopup={openGATEPopup}
                    setOpenPopup={setOpenGATEPopup}
                  >
                    <Listviewpopup
                      accessID="2050"
                      screenName="Gate"
                      childToParent={childToParent}
                      filterName={"parentID"}
                    // filterValue={locationLookup.locationRecordID}
                    />
                  </Popup>
                  <Popup
                    title="Designation"
                    openPopup={opendesignPopup}
                    setOpenPopup={setOpendesignPopup}
                  >
                    <Listviewpopup
                      accessID="2047"
                      screenName="Designation"
                      childToParent={childToParent}
                      filterName={"parentID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}



        {show == "5" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={AllDedInitialValues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  AllDedFNsave(values, resetForm, false);
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
                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="code"
                        name="code"
                        value={values.code}
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                        // rows={[]}
                        // columns={[]}
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
                          Toolbar: LeaveTool,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>

                    <FormControl sx={{ gap: formGap }}>
                      {/* <TextField
                          id="outlined-basic"
                          label="ID"
                          variant="standard"
                          value={ADLookupData.adRecordID}
                          focused
                          sx={{ display: "none" }}
                        /> */}
                      <FormControl
                        sx={{
                          //gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {/* <TextField
                            id="outlined-basic"
                            label="Deductions"
                            variant="standard"
                            value={ADLookupData.adDesc}
                            focused
                            required
                            fullWidth
                            inputProps={{ tabIndex: "-1" }}
                          />
  
                          <IconButton
                            sx={{ height: 40, width: 40 }}
                            onClick={() => handleShow("AD")}
                          >
                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                          </IconButton> */}
                        <Productautocomplete
                          name="Deduction"
                          label={
                            <span>
                              Deductions
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </span>
                          }
                          variant="outlined"
                          id="Deduction"
                          value={ADLookupData}
                          // value={values.Deduction}
                          onChange={(newValue) => {
                            // setFieldValue("Deduction", newValue);


                            setADLookupData({
                              RecordID: newValue.RecordID,
                              Type: newValue.Type,
                              Name: newValue.Name,
                              SalaryCategory: newValue.SalaryCategory,
                            });
                          }}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2082","ScreenName":"Deduction","Filter":"SalaryCategory='D'","Any":""}}`}
                        />
                      </FormControl>

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="salaryCategory"
                        name="salaryCategory"
                        value={values.salaryCategory}
                        label="Salary Category"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="type"
                        name="type"
                        value={values.type}
                        label="Type"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="value"
                        name="value"
                        value={values.value}
                        label="Value"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        focused
                        onChange={handleChange}
                        onBlur={handleBlur}
                      // inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="effectivevalue"
                        name="effectivevalue"
                        value={Number(Data.Sal) - Number(values.value)}
                        label="Effective Value"
                        focused
                        inputProps={{ readOnly: true }}
                        //sx={{ background: "#fff6c3" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        name="sortorder"
                        type="number"
                        id="sortorder"
                        label="Sort Order"
                        variant="standard"
                        focused
                        value={values.sortorder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        //sx={{ background: "#fff6c3" }}
                        onWheel={(e) => e.target.blur()}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" padding={1} gap={2}>
                    {/* {YearFlag == "true" ? ( */}
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
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
                      )}
                      {YearFlag == "true" ? ( */}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            AllDedFNsave(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                    {/* ) : (
                        <Button color="error" variant="contained" disabled={true}>
                          Delete
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
                      title="Deduction"
                      openPopup={openADPopup}
                      setOpenPopup={setOpenADPopup}
                    >
                      <Listviewpopup
                        accessID="2082"
                        screenName="Deduction"
                        childToParent={childToParent}
                        filterName={"SalaryCategory"}
                        filterValue={"D"}
                      />
                    </Popup>
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
              initialValues={leaveInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  leaveFNsave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                      {/* Leave Box aligned below the DataGrid */}
                      <Box mt={2}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            Leave Details
                          </Typography>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Table aria-label="simple table" size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell></TableCell>
                                  <TableCell align="right">Total Leaves</TableCell>
                                  <TableCell align="right">Taken</TableCell>
                                  <TableCell align="right">Balance</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {leavegridData.LeaveDetailsData.TableData.map((row) => (
                                  <TableRow
                                    key={row.LeaveType}
                                    sx={{
                                      "& td, & th": {
                                        paddingTop: "4px",
                                        paddingBottom: "4px",
                                        height: "30px", // you can adjust this value
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.LeaveType}
                                    </TableCell>
                                    <TableCell align="right">{row.Total}</TableCell>
                                    <TableCell align="right">{row.Taken}</TableCell>

                                    <TableCell align="right">{row.Balance}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Grid>

                          {leavegridData.LeaveDetailsData.Others.map((item, index) => (
                            <Grid item xs={4} key={index}>
                              <Typography variant="body2" color="text.secondary">
                                {item.Label}
                              </Typography>
                              <Typography variant="h6" fontWeight="bold">
                                {item.Value}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                    </Box>

                    <FormControl sx={{ gap: formGap }}>
                      {/* <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label="LeaveCategory"
                          value={values.LeaveCategory}
                          id="LeaveCategory"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="LeaveCategory"
                         
                          focused
                          
                        /> */}
                      {/* <FormControl
                          sx={{
                            //gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          
  
                          <Productautocomplete
                            name="leavetype"
                            label={
                              <span>
                                Leave Type
                                <span
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            variant="outlined"
                            id="leavetype"
                            value={selectLETLookupData}
                            // value={values.leavetype}
                            onChange={(newValue) => {
                              // setFieldValue("leavetype", newValue);
                              console.log(
                                selectLETLookupData,
                                "--selectLETLookupData leavetype"
                              );
  
                              console.log(
                                newValue.RecordID,
                                "leavetype RecordID"
                              );
  
                              setselectLETLookupData({
                                RecordID: newValue.RecordID,
                                Code: newValue.Code,
                                Name: newValue.Name,
  
                              });
                            }}
                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2092","ScreenName":"Leave Type","Filter":"","Any":""}}`}
                          />
  
                        </FormControl> */}
                      {/* <Productautocomplete
                      name="leavetype"
                      label="Leave Type"
                      id="leavetype"
                      value={values.leavetype}
                      onChange={async (newValue) => {
                        setFieldValue("leavetype", newValue);
                        if (newValue?.RecordID) {
                          await Balancedayfind(newValue.RecordID);
                        }
                      }}
                      //disabled={mode == "E" && values.Status != "AL" && values.Status != "QR"}
                      url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2092","ScreenName":"Leave Type","Filter":"parentID=${compID}","Any":""}}`}
                    /> */}
                      <FormControl>
                        <Productautocomplete
                          name="leavetype"
                          label={
                            <span>
                              Leave Type
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </span>
                          }
                          variant="outlined"
                          id="leavetype"
                          value={selectleaveLookupData}
                          // value={values.leavetype}
                          onChange={async (newValue) => {
                            setFieldValue("leavetype", newValue);
                            if (newValue?.RecordID) {
                              await Balancedayfind(newValue.RecordID);
                            }
                            console.log(
                              selectleaveLookupData,
                              "--selectleaveLookupData leavetype"
                            );


                            console.log(
                              newValue.RecordID,
                              "leave RecordID"
                            );

                            setselectleaveLookupData({
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,

                            });
                          }}
                          // "Filter":"parentID='${compID}' AND EmployeeID='${params.id}'",
                          url={`${listViewurl}?data={"Query":{"AccessID":"2107","ScreenName":"Leave Type","Filter":"parentID='${CompanyID}' AND EmployeeID='${params.id}'","Any":""}}`}
                        />
                        {touched.leavetype && errors.leavetype && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                            {errors.leavetype}
                          </div>
                        )}</FormControl>
                      <FormControl focused variant="standard">
                        <InputLabel variant="standard" id="LeavePart">
                          {
                            <span>
                              Leave Part <span style={{ color: "red" }}>*</span>
                            </span>
                          }
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          fullWidth
                          variant="standard"
                          type="text"
                          // label="LeaveCategory"
                          value={values.LeavePart}
                          id="LeavePart"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="LeavePart"
                          required
                          focused
                        >
                          <MenuItem value="FH">First Half</MenuItem>
                          <MenuItem value="SH">Second Half</MenuItem>
                          <MenuItem value="N">Full Day</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="FromDate"
                        type="date"
                        id="FromDate"
                        label="From Date"
                        inputFormat="YYYY-MM-DD"
                        variant="standard"
                        focused
                        value={values.FromDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        name="ToDate"
                        type="date"
                        id="ToDate"
                        label="To Date"
                        inputFormat="YYYY-MM-DD"
                        variant="standard"
                        focused
                        value={values.ToDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        // disabled={mode == "E" && values.Status != "AL"}

                        name="comment"
                        type="comment"
                        id="comment"
                        label="Comments"
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        focused
                        required
                        value={values.comment}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.comment && !!errors.comment}
                        helperText={touched.comment && errors.comment}
                        sx={{ gridColumn: "span 2" }}
                      />
                      {/* {mode == "M" && ( */}
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Manager Comments"
                        required
                        multiline
                        rows={6}
                        value={values.managerComments}
                        id="managerComments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="managerComments"
                        sx={{
                          gridColumn: "span 2",
                        }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="approvedby"
                        name="approvedby"
                        value={values.approvedby}
                        label="Approved By"
                        focused
                        onBlur={handleBlur}
                        onChange={handleChange}
                        //inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      />
                      <TextField
                        name="approvedDate"
                        type="date"
                        id="approvedDate"
                        label="Approved Date"
                        inputFormat="YYYY-MM-DD"
                        variant="standard"
                        focused
                        value={values.approvedDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      //required
                      />

                      <FormControl focused variant="standard" required>
                        <InputLabel id="Status">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="Status"
                          name="Status"
                          value={values.Status}
                          onBlur={handleBlur}
                          onChange={handleChange}

                        >
                          <MenuItem value="AL">Applied</MenuItem>
                          <MenuItem value="RJ">Rejected</MenuItem>
                          <MenuItem value="AP">Approved</MenuItem>
                          <MenuItem value="QR">Query</MenuItem>

                        </Select>
                      </FormControl>

                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={formGap}
                  >
                    {funMode !== "A" && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                          name="purpose"
                          type="text"
                          id="purpose"
                          label="Purpose"
                          variant="standard"
                          focused
                          value={values.purpose}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.purpose && !!errors.purpose}
                          helperText={touched.purpose && errors.purpose}
                          sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                          InputLabelProps={{ shrink: true }}

                        />
                        <FileUploadIconButton onFileSelect={(file) => {
                          fileUpload(file, leaveData.recordID, "upload", "", values.purpose)
                          setFieldValue("purpose", "");
                        }}
                        />
                      </Box>
                    )}

                    {/* {YearFlag == "true" ? ( */}
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
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
                      )}
                      {YearFlag == "true" ? ( */}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            leaveFNsave(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                    {/* ) : (
                        <Button color="error" variant="contained" disabled={true}>
                          Delete
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
                      title="Leave Type"
                      openPopup={openLETPopup}
                      setOpenPopup={setOpenLETPopup}
                    >
                      <Listviewpopup
                        accessID="2092"
                        screenName="Leave Type"
                        childToParent={childToParent}
                      //filterName={"parentID"}
                      //filterValue={""}
                      />
                    </Popup>
                  </Box>
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.purpose}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            leaveData.recordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}

        {show == "6" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={otInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  otFNsave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
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

                    <FormControl sx={{ gap: formGap }}>
                      <FormControl
                        focused
                        variant="standard"
                        sx={{ gap: formGap }}
                      >
                        <TextField
                          name="Date"
                          type="date"
                          id="Date"
                          label=" Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.Date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required

                        //sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                          name="NumberOfHours"
                          type="number"
                          id="NumberOfHours"
                          label="No. of Hours"
                          variant="standard"
                          focused
                          value={values.NumberOfHours}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()}
                          required
                          //sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              min: 0,
                              max: 24,
                            },
                          }}
                        />


                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="PaymentMethod">Payment Method</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="PaymentMethod"
                            name="PaymentMethod"
                            value={values.PaymentMethod}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.PaymentMethod && !!errors.PaymentMethod}
                            helperText={touched.PaymentMethod && errors.PaymentMethod}
                          >
                            <MenuItem value="CR">Cash Reimbursement</MenuItem>
                            <MenuItem value="CH">Compensatory Half</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="OtType">Over Time Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="OtType"
                            name="OtType"
                            value={values.OtType}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.OtType && !!errors.OtType}
                            helperText={touched.OtType && errors.OtType}
                          >
                            <MenuItem value="FS">Flexible Scheduling</MenuItem>
                            <MenuItem value="SS">Shift Swaps</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          //disabled={mode == "E" && values.Status != "AL"}
                          focused
                          variant="standard"
                          sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="ReimbursementOption">Reimbursement Option</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="ReimbursementOption"
                            name="ReimbursementOption"
                            value={values.ReimbursementOption}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.ReimbursementOption && !!errors.ReimbursementOption}
                            helperText={touched.ReimbursementOption && errors.ReimbursementOption}
                            sx={{
                              gridColumn: "span 2",
                              backgroundColor: "#ffffff",
                              "& .MuiFilledInput-root": {
                                backgroundColor: "#ffffff",
                              },
                            }}
                          >

                            <MenuItem value="OH">One Time and Half</MenuItem>
                            <MenuItem value="HT">One and Half Time</MenuItem>
                            <MenuItem value="CH">Compensatory Half</MenuItem>

                          </Select>
                        </FormControl>
                        <TextField
                          // disabled={mode == "E" && values.Status != "AL"}

                          name="comments"
                          type="comments"
                          id="comments"
                          label="Comments"
                          multiline
                          rows={6}
                          variant="outlined"
                          fullWidth
                          focused
                          required
                          value={values.comments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.comments && !!errors.comments}
                          helperText={touched.comments && errors.comments}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* {mode == "M" && ( */}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Manager Comments"
                          required
                          multiline
                          rows={6}
                          value={values.managerComments}
                          id="managerComments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="managerComments"
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="approvedby"
                          name="approvedby"
                          value={values.approvedby}
                          label="Approved By"
                          focused
                          inputProps={{ readOnly: true }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        />
                        <TextField
                          name="approvedDate"
                          type="date"
                          id="approvedDate"
                          label="Approved Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.approvedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        //required
                        />
                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="Status">Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="Status"
                            name="Status"
                            value={values.Status}
                            onBlur={handleBlur}
                            required
                            onChange={handleChange}
                            error={!!touched.Status && !!errors.Status}
                            helperText={touched.Status && errors.Status}
                          // sx={{
                          //   gridColumn: "span 2",
                          //   backgroundColor: "#ffffff",
                          //   "& .MuiFilledInput-root": {
                          //     backgroundColor: "#ffffff",
                          //   }
                          // }}
                          >
                            <MenuItem value="AL">Applied</MenuItem>
                            <MenuItem value="AP">Approved</MenuItem>
                            <MenuItem value="RJ">Rejected</MenuItem>
                            <MenuItem value="QR">Query</MenuItem>
                          </Select>
                        </FormControl>
                      </FormControl>
                    </FormControl>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={formGap}

                  >
                    {funMode !== "A" && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                          name="purpose"
                          type="text"
                          id="purpose"
                          label="Purpose"
                          variant="standard"
                          focused
                          value={values.purpose}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.purpose && !!errors.purpose}
                          helperText={touched.purpose && errors.purpose}
                          sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                          InputLabelProps={{ shrink: true }}

                        />
                        <FileUploadIconButton onFileSelect={(file) => {
                          fileUpload(file, otdata.RecordID, "upload", "", values.purpose)
                          setFieldValue("purpose", "");
                        }} />
                      </Box>
                    )}

                    {/* {/ {YearFlag == "true" ? ( /} */}
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
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            otFNsave(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>

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
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            otdata.RecordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "7" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={salAdinitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema3}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  salAdFNsave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>

                    <FormControl sx={{ gap: formGap }}>
                      <FormControl
                        focused
                        variant="standard"
                        sx={{ gap: formGap }}
                      >
                        <TextField
                          name="date"
                          type="date"
                          id="date"
                          label="Date"
                          variant="standard"
                          focused
                          value={values.date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          error={!!touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                          autoFocus
                          required
                        />

                        <TextField
                          name="referenceifany"
                          type="text"
                          id="referenceifany"
                          label="Reference If Any"
                          variant="standard"
                          focused
                          value={values.referenceifany}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.referenceifany && !!errors.referenceifany
                          }
                          helperText={
                            touched.referenceifany && errors.referenceifany
                          }
                          autoFocus
                        />

                        <FormControl sx={{ display: "flex" }}>
                          {/* <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          > */}
                            {/* <TextField
                                id="outlined-basic"
                                label="ID"
                                variant="standard"
                                value={selectOHLookupData.OHRecordID}
                                focused
                                sx={{ display: "none" }}
                              />
                              <TextField
                                id="outlined-basic"
                                label="Purpose"
                                variant="standard"
                                value={selectOHLookupData.OHlookupCode}
                                focused
                                // required
                                inputProps={{ tabIndex: "-1" }}
                              /> 
                              <IconButton
                                sx={{ height: 40, width: 40 }}
                                onClick={() => handleShow("OH")}
                              >
                                <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                              </IconButton>*/}
                            {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                            {/* <TextField
                                id="outlined-basic"
                                label=""
                                variant="standard"
                                value={selectOHLookupData.OHlookupDesc}
                                fullWidth
                                inputProps={{ tabIndex: "-1" }}
                                focused
                              /> */}
                            <Productautocomplete
                              name="overhead"
                              label={
                                <span>
                                  Purpose
                                  <span
                                    style={{ color: "red" }}
                                  >
                                    *
                                  </span>
                                </span>
                              }
                              variant="outlined"
                              id="overhead"
                              value={selectOHLookupData}
                              // value={values.overhead}
                              onChange={(newValue) => {


                                setselectOHLookupData({
                                  RecordID: newValue.RecordID,
                                  Code: newValue.Code,
                                  Name: newValue.Name,

                                });
                              }}
                              url={`${listViewurl}?data={"Query":{"AccessID":"2032","ScreenName":"Overhead","Filter":"","Any":""}}`}
                            />
                             {touched.overhead && errors.overhead && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                          {errors.overhead}
                        </div>
                      )}
                          </FormControl>
                        {/* </FormControl> */}

                        <TextField
                          name="amount"
                          type="text"
                          id="amount"
                          label="Amount"
                          variant="standard"
                          focused
                          value={values.amount}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              min: 0,
                              max: 24,
                            },
                          }}
                          error={!!touched.amount && !!errors.amount}
                          helperText={touched.amount && errors.amount}
                          autoFocus
                          required
                        />
                        {/* <TextField
                            name="comments"
                            type="text"
                            id="comments"
                            label="comments"
                            variant="standard"
                            focused
                            value={values.comments}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.comments && !!errors.comments}
                            helperText={touched.comments && errors.comments}
                            autoFocus
                          /> */}

                        <TextField
                          // disabled={mode == "E" && values.Status != "AL"}

                          name="comments"
                          type="comments"
                          id="comments"
                          label="Comments"
                          multiline
                          rows={6}
                          variant="outlined"
                          fullWidth
                          focused
                          required
                          value={values.comments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.comments && !!errors.comments}
                          helperText={touched.comments && errors.comments}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* {mode == "M" && ( */}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Manager Comments"
                          required
                          multiline
                          rows={6}
                          value={values.managerComments}
                          id="managerComments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="managerComments"
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="approvedby"
                          name="approvedby"
                          value={values.approvedby}
                          label="Approved By"
                          focused
                          inputProps={{ readOnly: true }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        />
                        <TextField
                          name="approvedDate"
                          type="date"
                          id="approvedDate"
                          label="Approved Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.approvedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        //required
                        />
                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="Status">Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="Status"
                            name="Status"
                            value={values.Status}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required
                            error={!!touched.Status && !!errors.Status}
                            helperText={touched.Status && errors.Status}
                          // sx={{
                          //   gridColumn: "span 2",
                          //   backgroundColor: "#ffffff",
                          //   "& .MuiFilledInput-root": {
                          //     backgroundColor: "#ffffff",
                          //   }
                          // }}
                          >
                            <MenuItem value="AL">Applied</MenuItem>
                            <MenuItem value="AP">Approved</MenuItem>
                            <MenuItem value="RJ">Rejected</MenuItem>
                            <MenuItem value="QR">Query</MenuItem>
                          </Select>
                        </FormControl>

                      </FormControl>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={formGap}

                  >
                    {funMode !== "A" && (

                      <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                          name="purpose"
                          type="text"
                          id="purpose"
                          label="Purpose"
                          variant="standard"
                          focused
                          value={values.purpose}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.purpose && !!errors.purpose}
                          helperText={touched.purpose && errors.purpose}
                          sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                          InputLabelProps={{ shrink: true }}

                        />
                        <FileUploadIconButton onFileSelect={(file) => {
                          fileUpload(file, saladdata.RecordID, "upload", "", values.purpose)
                          setFieldValue("purpose", "")
                        }} />
                      </Box>
                    )}

                    {/* {/ {YearFlag == "true" ? ( /} */}
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
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            salAdFNsave(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>

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
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            saladdata.RecordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
            <Popup
              title="Purpose"
              openPopup={openOHPopup}
              setOpenPopup={setOpenOHPopup}
            >
              <Listviewpopup
                accessID="2032"
                screenName="OverHead"
                childToParent={childToParent}
              //filterName={"FinanceCategoryType"}
              //filterValue={parentID}
              />
            </Popup>
          </Paper>
        ) : (
          false
        )}
        {show == "8" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={ondutyInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema2}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ondutyFNsave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
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

                    <FormControl sx={{ gap: formGap }}>
                      <FormControl
                        focused
                        variant="standard"
                        sx={{ gap: formGap }}
                      // disabled={mode == "E" && values.Status != "AL"}
                      >

                        <InputLabel variant="standard" id="LeavePart">
                          {
                            <span>
                              Reason <span style={{ color: "red" }}>*</span>
                            </span>
                          }
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          fullWidth
                          variant="standard"
                          type="text"
                          value={values.LeavePart}
                          id="LeavePart"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="LeavePart"
                          required
                          focused
                        >
                          <MenuItem value="FH">First Half</MenuItem>
                          <MenuItem value="SH">Second Half</MenuItem>
                          <MenuItem value="N">Full Day</MenuItem>
                        </Select>

                        <TextField
                          //  disabled={mode == "E" && values.Status != "AL"}

                          name="FromDate"
                          type="date"
                          id="FromDate"
                          label="From Date"
                          //inputFormat="YYYY-MM-DD"

                          variant="standard"
                          focused
                          value={values.FromDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          //  disabled={mode == "E" && values.Status != "AL"}

                          name="ToDate"
                          type="date"
                          id="ToDate"
                          label="To Date"
                          //inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.ToDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          sx={{ gridColumn: "span 2" }}
                          inputProps={{
                            min:
                              values.FromDate || new Date().toISOString().split("T")[0],
                          }}
                        />
                        {/* <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gridColumn: "span 2",
                          }}
                        > */}
                        {/* <CheckinAutocomplete
                            // disabled={
                            //   mode == "E" &&
                            //   values.Status != "AL" &&
                            //   values.Status != "QR"
                            // }
                            name="ProName"
                            label="Project"
                            id="ProName"
                            value={values.ProName}
                            onChange={(newValue) => {
                              setFieldValue("ProName", newValue);
                            }}
                            error={!!touched.ProName && !!errors.ProName}
                            helperText={touched.ProName && errors.ProName}
                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${CompanyID}","Any":""}}`}
                          /> */}
                        <FormControl>
                          <Productautocomplete
                            name="ProName"
                            label={
                              <span>
                                Project
                                <span
                                  style={{ color: "red" }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            variant="outlined"
                            id="ProName"
                            value={selectODLookupData}
                            // value={values.ProName}
                            onChange={async (newValue) => {
                              setFieldValue("ProName", newValue);

                              console.log(
                                selectODLookupData,
                                "--selectODLookupData leavetype"
                              );


                              console.log(
                                newValue.RecordID,
                                "pROJECT RecordID"
                              );

                              setselectODLookupData({
                                RecordID: newValue.RecordID,
                                Code: newValue.Code,
                                Name: newValue.Name,

                              });
                            }}
                            // "Filter":"parentID='${compID}' AND EmployeeID='${params.id}'",
                            url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${CompanyID}","Any":""}}`}
                          />
                          {touched.ProName && errors.ProName && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                              {errors.ProName}
                            </div>
                          )}
                        </FormControl>
                        {/* </Box> */}
                        <TextField
                          name="location"
                          type="text"
                          id="location"
                          label="Location"
                          variant="standard"
                          focused
                          value={values.location}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.location && !!errors.location}
                          helperText={touched.location && errors.location}
                          // required
                          sx={{ gridColumn: "span 2" }}

                        />
                        <TextField
                          // disabled={mode == "E" && values.Status != "AL"}

                          name="comment"
                          type="comment"
                          id="comment"
                          label="Comments"
                          multiline
                          rows={6}
                          variant="outlined"
                          fullWidth
                          focused
                          required
                          value={values.comment}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.comment && !!errors.comment}
                          helperText={touched.comment && errors.comment}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* {mode == "M" && ( */}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Manager Comments"
                          required
                          multiline
                          rows={6}
                          value={values.managerComments}
                          id="managerComments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="managerComments"
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        {/* )} */}
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="approvedby"
                          name="approvedby"
                          value={values.approvedby}
                          label="Approved By"
                          focused
                          inputProps={{ readOnly: true }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        />
                        <TextField
                          name="approvedDate"
                          type="date"
                          id="approvedDate"
                          label="Approved Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.approvedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        //required
                        />
                        {/* {mode == "M"  && */}

                        <TextField
                          select
                          label="Status"
                          id="Status"
                          name="Status"
                          value={values.Status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          variant="standard"
                        >
                          <MenuItem value="AL">Applied</MenuItem>
                          <MenuItem value="RJ">Rejected</MenuItem>
                          <MenuItem value="AP">Approved</MenuItem>
                          <MenuItem value="QR">Query</MenuItem>
                          {/* {mode != "M" && <MenuItem value="AL">Applied</MenuItem>}
                            <MenuItem disabled={mode != "M"} value="AP">
                              Approved
                            </MenuItem>
                            <MenuItem disabled={mode != "M"} value="RJ">
                              Rejected
                            </MenuItem> */}
                        </TextField>
                        {/* } */}

                        {/* {mode == "E" && values.Status == "AP" && <Alert variant="filled" sx={{mt:1}} severity="success">Your Leave Request Was Approved.</Alert>} */}
                        {/* {mode == "E" && values.Status == "RJ" && <Alert variant="filled" sx={{mt:1}} severity="error">Your Leave Request Was Rejected.</Alert>} */}
                      </FormControl>

                      <Box display="flex" padding={1} justifyContent="flex-end" mt="2px" gridColumn="span 4" gap={2} >
                        {/* {mode != "M" && (values.Status == "AL" || mode == "A" ) &&  */}
                        {funMode !== "A" && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <TextField
                              name="purpose"
                              type="text"
                              id="purpose"
                              label="Purpose"
                              variant="standard"
                              focused
                              value={values.purpose}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.purpose && !!errors.purpose}
                              helperText={touched.purpose && errors.purpose}
                              sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                              InputLabelProps={{ shrink: true }}

                            />
                            <FileUploadIconButton onFileSelect={(file) => {
                              fileUpload(file, ondutydata.RecordID, "upload", "", values.purpose)
                              setFieldValue("purpose", "");
                            }} />
                          </Box>
                        )}

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
                            Swal.fire({
                              title: `Do you want Delete?`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Confirm",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                ondutyFNsave(values, resetForm, "harddelete");
                                // navigate(-1);
                              } else {
                                return;
                              }
                            });
                          }}
                        >
                          Delete
                        </Button>

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
                          title="Leave Type"
                          openPopup={openLTpopup}
                          setOpenPopup={setOpenLTpopup}
                        >
                          <Listviewpopup
                            accessID="2092"
                            screenName="Leave Type"
                            childToParent={childToParent}
                            filterName={"parentID"}
                            filterValue={CompanyID}
                          />
                        </Popup>
                      </Box>
                    </FormControl>
                  </Box>
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            ondutydata.RecordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "11" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={permisinitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  PerFNsave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
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
                      {funMode !== "A" && (
                        <Box mt={2}
                        >
                          <Paper elevation={3} sx={{ padding: 2 }}>
                            {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                            <TableContainer component={Paper} >
                              <Table size="small">
                                <TableHead>
                                  <TableRow sx={rowSx}>
                                    <TableCell width={20}><strong>S.No</strong></TableCell>
                                    <TableCell><strong>Uploaded Date</strong></TableCell>
                                    <TableCell ><strong>Filename</strong></TableCell>
                                    <TableCell ><strong>Purpose</strong></TableCell>
                                    <TableCell ><strong>Source</strong></TableCell>
                                    <TableCell><strong>View</strong></TableCell>


                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {files.length === 0 ? (
                                    <TableRow>
                                      <TableCell colSpan={4} align="center">
                                        No files uploaded yet.
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    files.map((file, index) => (
                                      <TableRow key={file.id || index} sx={rowSx}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{file.uploadedDate}</TableCell>
                                        <TableCell>{file.filename}</TableCell>
                                        <TableCell>{file.id}</TableCell>
                                        <TableCell>{file.source}</TableCell>
                                        <TableCell>
                                          <Tooltip title="Open File">
                                            <IconButton
                                              color="primary"
                                              component="a"
                                              href={file.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              size="small"
                                            >
                                              <OpenInNewIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="delete">
                                            <IconButton
                                              color="error"
                                              onClick={() => fileUpload(
                                                "",
                                                saladdata.RecordID,
                                                "delete",
                                                file.id,
                                                file.purpose
                                              )}
                                              size="small"
                                            >
                                              <DeleteForeverIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </TableCell>

                                      </TableRow>
                                    ))
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Paper>
                        </Box>
                      )}
                    </Box>

                    <FormControl sx={{ gap: formGap }}>
                      <FormControl
                        focused
                        variant="standard"
                        sx={{ gap: formGap }}
                      // disabled={mode == "E" && values.Status != "AL"}
                      >

                        {/* <TextField
                          name="applieddate"
                          type="date"
                          id="applieddate"
                          label="Applied Date"
                          variant="standard"
                          focused
                          inputFormat="YYYY-MM-DD"
                          value={values.applieddate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.applieddate && !!errors.applieddate}
                          helperText={touched.applieddate && errors.applieddate}
                          sx={{ gridColumn: "span 2" }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                            readOnly: true,
                          }}

                        /> */}
                        <TextField
                          name="permissiondate"
                          type="date"
                          id="permissiondate"
                          label="Permission Date"
                          variant="standard"
                          focused
                          inputFormat="YYYY-MM-DD"
                          value={values.permissiondate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.permissiondate && !!errors.permissiondate}
                          helperText={touched.permissiondate && errors.permissiondate}
                          sx={{ gridColumn: "span 2" }}
                          required
                        // inputProps={{
                        //   max: new Date().toISOString().split("T")[0],
                        //   readOnly: true,
                        // }}

                        />
                        <TextField

                          fullWidth
                          variant="standard"
                          type="time"
                          id="fromtime"
                          name="fromtime"
                          inputFormat="HH:mm:aa"
                          value={values.fromtime}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="From Time"
                          focused
                          required
                        // inputProps={{ maxLength:20}}
                        />
                        <TextField

                          fullWidth
                          variant="standard"
                          type="time"
                          id="totime"
                          name="totime"
                          inputFormat="HH:mm:aa"
                          value={values.totime}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="To Time"
                          focused
                          required
                        // inputProps={{ readOnly: true }}
                        />
                        <TextField

                          name="location"
                          type="text"
                          id="location"
                          label="Location"
                          variant="standard"
                          focused
                          value={values.location}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ gridColumn: "span 2" }}
                          required
                        />
                        <TextField


                          // disabled={mode == "E" && values.Status != "AL"}
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Reason"
                          required
                          multiline
                          rows={6}
                          value={values.reason}
                          id="reason"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="reason"
                          error={!!touched.reason && !!errors.reason}
                          helperText={touched.reason && errors.reason}
                          sx={{
                            gridColumn: "span 2",
                            backgroundColor: "",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "",
                            },
                          }}
                          focused
                        />
                        {/* {mode == "M" && ( */}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Manager Comments"
                          required
                          multiline
                          rows={6}
                          value={values.managerComments}
                          id="managerComments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="managerComments"
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        {/* )} */}
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="approvedby"
                          name="approvedby"
                          value={values.approvedby}
                          label="Approved By"
                          focused
                          inputProps={{ readOnly: true }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        />
                        <TextField
                          name="approvedDate"
                          type="date"
                          id="approvedDate"
                          label="Approved Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.approvedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        //required
                        />
                        {/* {mode == "M"  && */}

                        <TextField
                          select
                          label="Status"
                          id="Status"
                          name="Status"
                          value={values.Status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          variant="standard"
                        >
                          <MenuItem value="AL">Applied</MenuItem>
                          <MenuItem value="RJ">Rejected</MenuItem>
                          <MenuItem value="AP">Approved</MenuItem>
                          <MenuItem value="QR">Query</MenuItem>
                          {/* {mode != "M" && <MenuItem value="AL">Applied</MenuItem>}
                            <MenuItem disabled={mode != "M"} value="AP">
                              Approved
                            </MenuItem>
                            <MenuItem disabled={mode != "M"} value="RJ">
                              Rejected
                            </MenuItem> */}
                        </TextField>
                        {/* } */}

                        {/* {mode == "E" && values.Status == "AP" && <Alert variant="filled" sx={{mt:1}} severity="success">Your Leave Request Was Approved.</Alert>} */}
                        {/* {mode == "E" && values.Status == "RJ" && <Alert variant="filled" sx={{mt:1}} severity="error">Your Leave Request Was Rejected.</Alert>} */}
                      </FormControl>


                    </FormControl>
                  </Box>
                  <Box display="flex" padding={1} justifyContent="flex-end" mt="2px" gridColumn="span 4" gap={2} >
                    {/* {mode != "M" && (values.Status == "AL" || mode == "A" ) &&  */}
                    {funMode !== "A" && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TextField
                            name="purpose"
                            type="text"
                            id="purpose"
                            label="Purpose"
                            variant="standard"
                            focused
                            value={values.purpose}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.purpose && !!errors.purpose}
                            helperText={touched.purpose && errors.purpose}
                            sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                            InputLabelProps={{ shrink: true }}

                          />
                          <FileUploadIconButton onFileSelect={(file) => {
                            fileUpload(file, perData.recordID, "upload", "", values.purpose)
                            setFieldValue("purpose", "");
                          }} />
                        </Box>
                      </Box>
                    )}

                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}

                    >
                      Save
                    </LoadingButton>
                    {/* } */}
                    {/* {mode == "M" &&  */}
                    {/* <LoadingButton
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                    loading={isLoading}
              
                                  >
                                    Save
                                  </LoadingButton> */}
                    {/* } */}
                    {/* {mode != "M" && values.Status == "AL" &&   */}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: `Do you want Delete?`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            PerFNsave(values, resetForm, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                    {/* } */}
                    {/* {mode == "M" &&  */}
                    {/* <Button
                                        color="error"
                                        variant="contained"
                                        onClick={() => {
                                          Swal.fire({
                                            title: `Do you want Delete?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Confirm",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              ondutyFNsave(values, resetForm, "harddelete");
                                              // navigate(-1);
                                            } else {
                                              return;
                                            }
                                          });
                                        }}
                                      >
                                        Delete
                                      </Button> */}
                    {/* } */}
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
                      title="Leave Type"
                      openPopup={openLTpopup}
                      setOpenPopup={setOpenLTpopup}
                    >
                      <Listviewpopup
                        accessID="2092"
                        screenName="Leave Type"
                        childToParent={childToParent}
                        filterName={"parentID"}
                        filterValue={CompanyID}
                      />
                    </Popup>
                  </Box>

                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "9" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={expenseinitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema3}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  expensefnSave(values, resetForm, false);
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
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


                    <FormControl sx={{ gap: formGap }}>
                      <FormControl
                        focused
                        variant="standard"
                        sx={{ gap: formGap }}

                      >
                        <TextField
                          name="date"
                          type="date"
                          id="date"
                          label="Date"
                          variant="standard"
                          focused
                          value={values.date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputFormat="YYYY-MM-DD"
                          error={!!touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                          autoFocus
                          required
                        />
                        <TextField
                          name="referenceifany"
                          type="text"
                          id="referenceifany"
                          label="Reference If Any"
                          variant="standard"
                          focused
                          value={values.referenceifany}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.referenceifany && !!errors.referenceifany
                          }
                          helperText={
                            touched.referenceifany && errors.referenceifany
                          }
                          autoFocus
                        />

                        {/* <FormControl sx={{ gridColumn: "span 2", display: "flex" }}> */}

                          <FormControl
                            sx={{
                              gridColumn: "span 2",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {/* <Productautocomplete
                                variant="outlined"
                                name="overhead"
                                label="OverHead"
                                id="overhead"
                                value={values.overhead}
                                onChange={(newValue) => {
                                  setFieldValue("overhead", newValue)
                                }}
                                //  onChange={handleSelectionFunctionname}
                                // defaultValue={selectedFunctionName}
                                url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2032","ScreenName":"OverHead","Filter":"","Any":""}}`}
  
                              /> */}
                         
                              <Productautocomplete
                                name="overhead"
                                label={
                                  <span>
                                    Over Head
                                    <span
                                      style={{ color: "red" }}
                                    >
                                      *
                                    </span>
                                  </span>
                                }
                                variant="outlined"
                                id="overhead"
                                value={expenseOHData}
                                // value={values.overhead}
                                onChange={(newValue) => {


                                  setExpenseOHData({
                                    RecordID: newValue.RecordID,
                                    Code: newValue.Code,
                                    Name: newValue.Name,

                                  });
                                }}
                                url={`${listViewurl}?data={"Query":{"AccessID":"2032","ScreenName":"Overhead","Filter":"","Any":""}}`}
                              />
                              {touched.overhead && errors.overhead && (
                                <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                                  {errors.overhead}
                                </div>
                              )}
                           
                          </FormControl>
                        {/* </FormControl> */}

                        <TextField
                          name="amount"
                          type="text"
                          id="amount"
                          label="Amount"
                          variant="standard"
                          focused
                          value={values.amount}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.amount && !!errors.amount}
                          helperText={touched.amount && errors.amount}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                              min: 0,
                              max: 24,
                            },
                          }}
                          required
                          autoFocus
                        />
                        {/* <TextField
                            name="comments"
                            type="text"
                            id="comments"
                            label="Comments"
                            variant="standard"
                            focused
                            value={values.comments}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.comments && !!errors.comments}
                            helperText={touched.comments && errors.comments}
                            autoFocus
                          /> */}
                        <TextField
                          // disabled={mode == "E" && values.Status != "AL"}

                          name="comments"
                          type="comments"
                          id="comments"
                          label="Comments"
                          multiline
                          rows={6}
                          variant="outlined"
                          fullWidth
                          focused
                          required
                          value={values.comments}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.comments && !!errors.comments}
                          helperText={touched.comments && errors.comments}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* {mode == "M" && ( */}
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Manager Comments"
                          required
                          multiline
                          rows={6}
                          value={values.managerComments}
                          id="managerComments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="managerComments"
                          sx={{
                            gridColumn: "span 2",
                          }}
                          focused
                        />
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="Eapprovedby"
                          name="Eapprovedby"
                          value={values.Eapprovedby}
                          label="Approved By"
                          focused
                          inputProps={{ readOnly: true }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        />
                        <TextField
                          name="approvedDate"
                          type="date"
                          id="approvedDate"
                          label="Approved Date"
                          inputFormat="YYYY-MM-DD"
                          variant="standard"
                          focused
                          value={values.approvedDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        //required
                        />
                        <TextField
                          select
                          label="Status"
                          id="Status"
                          name="Status"
                          value={values.Status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          focused
                          
                          variant="standard"
                        >
                          {/* {mode != "M" && <MenuItem value="AL">Applied</MenuItem>}
                            <MenuItem disabled={mode != "M"} value="AP">
                              Approved
                            </MenuItem>
                            <MenuItem disabled={mode != "M"} value="RJ">
                              Rejected
                            </MenuItem> */}
                          <MenuItem value="AL">Applied</MenuItem>
                          <MenuItem value="RJ">Rejected</MenuItem>
                          <MenuItem value="AP">Approved</MenuItem>
                          <MenuItem value="QR">Query</MenuItem>
                        </TextField>
                      </FormControl>

                      {/* <Box display="flex" padding={1} justifyContent="end"  gap={formGap}>
                    <IconButton
                      size="small"
                      color="warning"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="all/*"
                        type="file"
                        onChange={getExpenseFileChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                        Data.Attachment || ImageName
                          ? window.open(
                              ImageName
                                ? store.getState().globalurl.attachmentUrl +
                                    ImageName
                                : store.getState().globalurl.attachmentUrl +
                                    Data.Attachment,
                              "_blank"
                            )
                          : toast.error("Please Upload File");
                      }}
                    >
                      View
                    </Button>
                    
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      SAVE
                    </LoadingButton>
                    <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    Swal.fire({
                      title: `Do you want Delete?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Confirm",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        expensefnSave(values, resetForm, "harddelete");
                        //navigate("/Apps/TR086/Finance%20Entry");
                      } else {
                        return;
                      }
                    });
                  }}
                >
                  Delete
                </Button>
                  <Button
                      variant="contained"
                       color="warning"
                      onClick={() => {
                        // navigate(
                        //   `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}`
                        // );
                      }}
                    >
                      CANCEL
                    </Button>
                  </Box> */}
                      <Box display="flex" padding={1} justifyContent="flex-end" mt="2px" gridColumn="span 4" gap={2} >
                        {/* {mode != "M" && (values.Status == "AL" || mode == "A" ) &&  */}
                        {/* <IconButton
                          size="small"
                          color="warning"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="all/*"
                            type="file"
                            onChange={getExpenseFileChange}
                          />
                          <PictureAsPdfOutlinedIcon />
                        </IconButton>
                        <Button
                          variant="contained"
                          component={"a"}
                          onClick={() => {
                            Data.Attachment || ImageName
                              ? window.open(
                                ImageName
                                  ? store.getState().globalurl.attachmentUrl +
                                  ImageName
                                  : store.getState().globalurl.attachmentUrl +
                                  Data.Attachment,
                                "_blank"
                              )
                              : toast.error("Please Upload File");
                          }}
                        >
                          View
                        </Button> */}
                        {funMode !== "A" && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <TextField
                              name="purpose"
                              type="text"
                              id="purpose"
                              label="Purpose"
                              variant="standard"
                              focused
                              value={values.purpose}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.purpose && !!errors.purpose}
                              helperText={touched.purpose && errors.purpose}
                              sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                              InputLabelProps={{ shrink: true }}

                            />
                            <FileUploadIconButton onFileSelect={(file) => {
                              fileUpload(file, expensedata.RecordID, "upload", "", values.purpose)
                              setFieldValue("purpose", "")
                            }} />
                          </Box>
                        )}

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
                            Swal.fire({
                              title: `Do you want Delete?`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Confirm",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                expensefnSave(values, resetForm, "harddelete");
                                // navigate(-1);
                              } else {
                                return;
                              }
                            });
                          }}
                        >
                          Delete
                        </Button>
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
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            expensedata.RecordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "10" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={RegInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => RegFNsave(values, resetForm, false)}
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
                setFieldValue
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
                    // gap="30px"
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
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                      />
                    </FormControl>
                    <Stack
                      sx={{
                        //    width: {sm:'100%',md:'100%',lg:'100%'},
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={userimg}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                          Toolbar: LeaveTool,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
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

                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        name="MonthDate"
                        type="date"
                        id="MonthDate"
                        label="Regularization Date"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.MonthDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        error={!!touched.MonthDate && !!errors.MonthDate}
                        helperText={touched.MonthDate && errors.MonthDate}
                      //sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                        name="CheckInDate"
                        type="date"
                        id="CheckInDate"
                        label="Check In Date"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        // inputFormat="DD-MM-YYYY"
                        value={values.CheckInDate}
                        onBlur={handleBlur}
                        required
                        //onChange={handleChange}
                        // onChange={(e) => {
                        //   setFieldValue("CheckInDate", e.target.value);
                        //   setCheckdate(e.target.value);
                        //   if (e.target.value) {
                        //     dispatch(
                        //       RegGetData({
                        //         data: {
                        //           EmployeeID: recID,
                        //           CheckInDate: e.target.value,
                        //         },
                        //       })
                        //     );
                        //   }
                        // }}
                        // onChange={(e) => {
                        //   const selectedDate = e.target.value;
                        //   if (selectedDate) {
                        //     dispatch(
                        //       RegGetData({
                        //         data: {
                        //           EmployeeID: recID,
                        //           CheckInDate: selectedDate,
                        //         },
                        //       })
                        //     ).then((response) => {
                        //       const msg = response.payload.Msg;
                        //       if (msg) {
                        //         setResponseMsg(msg);
                        //       } else {
                        //         setResponseMsg("");
                        //       }
                        //     });
                        //   }
                        //   setCheckIN(selectedDate);
                        //   setFieldValue("CheckInDate", selectedDate);
                        // }}


                        //check
                        onChange={(e) => {

                          setFieldValue("CheckInDate", e.target.value);
                          setCheckdate(e.target.value);
                          if (e.target.value) {
                            dispatch(
                              RegGetData({
                                data: {
                                  EmployeeID: recID,
                                  CheckInDate: e.target.value,
                                },
                              })
                            ).then((response) => {
                              const msg = response.payload.Msg;
                              if (msg) {
                                setResponseMsg(msg);
                              } else {
                                setResponseMsg("");
                              }
                            });

                          }
                        }}

                        error={!!touched.CheckInDate && !!errors.CheckInDate}
                        helperText={touched.CheckInDate && errors.CheckInDate}
                      //sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                        name="EmplyeeCheckInDateTime"
                        type="time"
                        id="EmplyeeCheckInDateTime"
                        label="Check In Time"
                        inputFormat="HH:mm"
                        // inputFormat="HH:mm:aa"
                        variant="standard"
                        value={values.EmplyeeCheckInDateTime}
                        // value={
                        //   values.EmplyeeCheckInDateTime
                        //     ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
                        //     : ""
                        // }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                      //sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                        name="CheckOutDate"
                        type="date"
                        id="CheckOutDate"
                        label="Check Out Date"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.CheckOutDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.CheckOutDate && !!errors.CheckOutDate}
                        helperText={touched.CheckOutDate && errors.CheckOutDate}
                      //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                      />

                      <TextField
                        name="EmplyeeCheckOutDateTime"
                        type="time"
                        id="EmplyeeCheckOutDateTime"
                        label="Check Out Time"
                        inputFormat="HH:mm:aa"
                        value={values.EmplyeeCheckOutDateTime}
                        // value={
                        //   values.EmplyeeCheckOutDateTime
                        //     ? values.EmplyeeCheckOutDateTime.split(" / ")[1] // gets "09:02"
                        //     : ""
                        // }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                        variant="standard"
                      />
                      {/* {mode == "M" && ( */}
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Manager Comments"
                        required
                        multiline
                        rows={6}
                        value={values.managerComments}
                        id="managerComments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="managerComments"
                        sx={{
                          gridColumn: "span 2",
                        }}
                        focused
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="approvedby"
                        name="approvedby"
                        value={values.approvedby}
                        label="Approved By"
                        focused
                        inputProps={{ readOnly: true }}
                        sx={{
                          backgroundColor: "#ffffff",
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      />
                      <TextField
                        name="approvedDate"
                        type="date"
                        id="approvedDate"
                        label="Approved Date"
                        inputFormat="YYYY-MM-DD"
                        variant="standard"
                        focused
                        value={values.approvedDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      //required
                      />
                      <FormControl
                        focused
                        variant="standard"
                      //sx={{ gridColumn: "span 2", backgroundColor: "#f5f5f5" }}
                      >
                        <InputLabel id="Status">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="Status"
                          name="Status"
                          value={values.Status}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="P">Present</MenuItem>
                          <MenuItem value="A">Absent</MenuItem>
                          <MenuItem value="W">WeekOff</MenuItem>
                          <MenuItem value="I">Irregular</MenuItem>
                          <MenuItem value="L">Leave</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        select
                        label="Applied Status"
                        id="appliedStatus"
                        name="appliedStatus"
                        value={values.appliedStatus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        focused
                        variant="standard"
                      >
                        {/* {mode != "M" && <MenuItem value="AL">Applied</MenuItem>}
                            <MenuItem disabled={mode != "M"} value="AP">
                              Approved
                            </MenuItem>
                            <MenuItem disabled={mode != "M"} value="RJ">
                              Rejected
                            </MenuItem> */}
                        <MenuItem value="AL">Applied</MenuItem>
                        <MenuItem value="RJ">Rejected</MenuItem>
                        <MenuItem value="AP">Approved</MenuItem>
                        <MenuItem value="QR">Query</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Remarks"
                        value={values.remarks}
                        id="remarks"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="remarks"
                        error={!!touched.remarks && !!errors.remarks}
                        helperText={touched.remarks && errors.remarks}
                        focused
                        required
                        inputProps={{ maxLength: 90 }}

                      />
                    </FormControl>

                    {responseMsg && (
                      <div
                        style={{
                          color: "#856404",
                          backgroundColor: "#fff3cd",
                          border: "1px solid #ffeeba",
                          padding: "8px",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          marginTop: "4px"
                        }}
                      >
                        {responseMsg}
                      </div>
                    )}
                  </Box>
                  {/* {responseMsg && (
        <div
          style={{
            color: "#856404",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeeba",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginTop: "4px"
          }}
        >
          {responseMsg}
        </div>
        )} */}
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={formGap}
                  >
                    {funMode !== "A" && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                          name="purpose"
                          type="text"
                          id="purpose"
                          label="Purpose"
                          variant="standard"
                          focused
                          value={values.purpose}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.purpose && !!errors.purpose}
                          helperText={touched.purpose && errors.purpose}
                          sx={{ gridColumn: "span 2", height: "20px", marginBottom: "20px" }}
                          InputLabelProps={{ shrink: true }}

                        />
                        <FileUploadIconButton onFileSelect={(file) => {
                          fileUpload(file, regdata.RecordID, "upload", "", values.purpose)
                          setFieldValue("purpose", "")
                        }} />
                      </Box>
                    )}

                    {/* {YearFlag == "true" ? ( */}
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
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
                      )}
                      {YearFlag == "true" ? ( */}
                    {/* <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          Swal.fire({
                            title: `Do you want Delete?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              RegFNsave(values, resetForm, "harddelete");
                            } else {
                              return;
                            }
                          });
                        }}
                      >
                        Delete
                      </Button> */}
                    {/* ) : (
                        <Button color="error" variant="contained" disabled={true}>
                          Delete
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
                      title="Leave Type"
                      openPopup={openLETPopup}
                      setOpenPopup={setOpenLETPopup}
                    >
                      <Listviewpopup
                        accessID="2092"
                        screenName="Leave Type"
                        childToParent={childToParent}
                      //filterName={"parentID"}
                      //filterValue={""}
                      />
                    </Popup>
                  </Box>
                  {funMode !== "A" && (
                    <Box mt={2}
                    >
                      <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={rowSx}>
                                <TableCell width={20}><strong>S.No</strong></TableCell>
                                <TableCell><strong>Uploaded Date</strong></TableCell>
                                <TableCell ><strong>Filename</strong></TableCell>
                                <TableCell ><strong>Purpose</strong></TableCell>
                                <TableCell ><strong>Source</strong></TableCell>
                                <TableCell><strong>View</strong></TableCell>


                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {files.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No files uploaded yet.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                files.map((file, index) => (
                                  <TableRow key={file.id || index} sx={rowSx}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.uploadedDate}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.source}</TableCell>
                                    <TableCell>
                                      <Tooltip title="Open File">
                                        <IconButton
                                          color="primary"
                                          component="a"
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          size="small"
                                        >
                                          <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="delete">
                                        <IconButton
                                          color="error"
                                          onClick={() => fileUpload(
                                            "",
                                            regdata.RecordID,
                                            "delete",
                                            file.id,
                                            file.purpose
                                          )}
                                          size="small"
                                        >
                                          <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>

                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  )}
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "3" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={AttInitialvalues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  attendaceFnSave(values, resetForm);
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
                    resetForm();
                    dispatch(resetTrackingData());
                  }}
                >
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
                      type="text"
                      id="code"
                      name="code"
                      value={values.code}
                      label="Code"
                      focused
                      inputProps={{ readOnly: true }}
                    // sx={{
                    //   backgroundColor: '#f5f5f5 ', // Change to your desired background color
                    //   '& .MuiFilledInput-root': {
                    //     backgroundColor: '#f5f5f5 ', // For the filled variant
                    //   },
                    // }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Salary"
                      value={values.Sal}
                      id="Sal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Sal"
                      error={!!touched.Sal && !!errors.Sal}
                      helperText={touched.Sal && errors.Sal}
                      //sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
                      focused
                      onWheel={(e) => e.target.blur()}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 8);
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="description"
                      name="description"
                      value={values.description}
                      label="Description"
                      focused
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="month"
                      id="month"
                      name="month"
                      label="Month"
                      value={values.month}
                      focused
                      // sx={{ gridColumn: "span 2" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                      <MenuItem value={"6"}>6</MenuItem>
                      <MenuItem value={"7"}>7</MenuItem>
                      <MenuItem value={"8"}>8</MenuItem>
                      <MenuItem value={"9"}>9</MenuItem>
                      <MenuItem value={"10"}>10</MenuItem>
                      <MenuItem value={"11"}>11</MenuItem>
                      <MenuItem value={"12"}>12</MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="year"
                      name="year"
                      label="Year"
                      value={values.year}
                      inputProps={{ min: "1900", max: "2100", step: "1" }}
                      focused
                      onChange={handleChange}
                      onBlur={handleBlur}

                    // sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap="20px"
                  >
                    <Button type="submit" variant="contained" color="secondary">
                      APPLY
                    </Button>
                    <Button
                      onClick={() => attendaceProcessFnSave(values)}
                      type="reset"
                      variant="contained"
                      color="primary"
                    >
                      PROCESS
                    </Button>
                    <Button type="reset" variant="contained" color="error">
                      RESET
                    </Button>
                  </Box>

                  <Box sx={{ gridColumn: "span 4" }}>
                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                        // rows={explorelistViewData}
                        // columns={columns}
                        rows={AttendanceData}
                        columns={AttColumn}
                        disableSelectionOnClick
                        getRowId={(row) => row.SLNO}
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
                          Toolbar: AttendanceTool,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
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
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}

        {show == "4" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={PAttInitialvalues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  attFnSave(values, resetForm);
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
                    resetForm();
                    dispatch(resetTrackingData());
                  }}
                >
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
                      type="text"
                      id="code"
                      name="code"
                      value={values.code}
                      label="Code"
                      focused
                      inputProps={{ readOnly: true }}
                    // sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="description"
                      name="description"
                      value={values.description}
                      label="Description"
                      focused
                      inputProps={{ readOnly: true }}
                    // sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="month"
                      id="month"
                      name="month"
                      label="Month"
                      value={values.month}
                      focused
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                      <MenuItem value={"6"}>6</MenuItem>
                      <MenuItem value={"7"}>7</MenuItem>
                      <MenuItem value={"8"}>8</MenuItem>
                      <MenuItem value={"9"}>9</MenuItem>
                      <MenuItem value={"10"}>10</MenuItem>
                      <MenuItem value={"11"}>11</MenuItem>
                      <MenuItem value={"12"}>12</MenuItem>
                    </TextField>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="year"
                      name="year"
                      value={values.year}
                      label="Year"
                      focused
                      onChange={handleChange}
                      onBlur={handleBlur}
                    // sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap="20px"
                  >
                    <Button type="submit" variant="contained" color="secondary">
                      APPLY
                    </Button>
                    {/* <Button type="reset" variant="contained" color="primary">
                  PROCESS
                </Button> */}
                    <Button type="reset" variant="contained" color="error">
                      RESET
                    </Button>
                  </Box>

                  <Box m="5px">
                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
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
                        rows={empAttendanceData}
                        columns={column}
                        disableSelectionOnClick
                        getRowId={(row) => row.SLNO}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowHeight={dataGridRowHeight}
                        headerHeight={dataGridHeaderFooterHeight}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        // loading={isLoading}
                        // onCellClick={(params) => {
                        //   const currentRow = params.row;
                        //   const currentcellField = params.field;
                        //     // selectcelldata(currentRow, "E", currentcellField);

                        //   console.log(JSON.stringify(params));
                        // }}
                        components={{
                          Toolbar: empAttendanceTool,
                        }}
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
      </Box>
    </React.Fragment>
  );
};

export default Editrequests;
