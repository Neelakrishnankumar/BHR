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
  Alert
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
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
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************
const EditemployeePayroll = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const EMPID = sessionStorage.getItem("EmpId");
  const compID = sessionStorage.getItem("companyId");
  const CompanyID = sessionStorage.getItem("compID");
  const location = useLocation();
  const state = location.state || {};
  const Finyear = sessionStorage.getItem("YearRecorid");
  console.log(state, "emnployee");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [openLTpopup, setOpenLTpopup] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };


  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const YearFlag = sessionStorage.getItem("YearFlag");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const deploymentData = useSelector((state) => state.formApi.deploymentData);
  //  console.log("deploymentData",deploymentData);
  const DataExplore = useSelector((state) => state.formApi.inviceEData);
  console.log(
    "🚀 ~ file: Editproformainvoice.jsx:110 ~ DataExplore:",
    DataExplore
  );
  const [openDEPopup, setOpenDEPopup] = useState(false);
  const [openADPopup, setOpenADPopup] = useState(false);
  const [openLETPopup, setOpenLETPopup] = useState(false);

  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);
  const empAttendanceData = useSelector(
    (state) => state.formApi.empAttendanceData
  );
  console.log("empAttendanceData", empAttendanceData);

  const AttendanceData = useSelector((state) => state.formApi.AttendanceData);
  console.log("AttendanceData", AttendanceData);

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

    console.log("Data to be passed:", params);
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
  };
  //*******Assign Employee values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    Job: apiData.Job,
    // DeptRecordID:apiData.DeptRecordID,
    Comm: apiData.Comm,
    Mgr: apiData.Mgr,
    Sal: apiData.Sal,
    Fax: apiData.Fax,
    SortOrder: apiData.SortOrder,
    checkbox: apiData.Disable,
    Password: apiData.Password,
    Department: apiData.Department,
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
  };

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
      // DeptRecordID: selectLookupData.lookupRecordid,
      Code: values.Code,
      Name: values.Name,
      SortOrder: values.SortOrder || 0,
      Disable: values.checkbox === true ? "Y" : "N",
      ScrumMaster: values.scrummaster === true ? "Y" : "N",
      ProjectManager: values.prjmanager === true ? "Y" : "N",
      EmpType: values.employeetype,
      DateOfJoin: values.joindate,
      DateOfConfirmation: values.confirmdate,
      Job: values.Job,
      Mgr: values.Mgr,
      Sal: values.Sal,
      Comm: values.Comm,
      Password: values.Password,
      DesignID: 0,
      LocationRecID: 0,
      GateRecID: 0,
      WeekOff: 0,
      CompanyID,
      QualityAssurance: Data.QualityAssurance === "Y" ? "Y" : "N",
      DeleteFlag: Data.DeleteFlag === "Y" ? "Y" : "N",
      Module:"",
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
        // `/Apps/TR027/Employees/EditEmployees/${data.payload.apiResponse}/E`
        `/Apps/TR027/Employee%20Payroll/EditEmployee%20Payroll/${data.payload.apiResponse}/E`
      );
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  /**************************************Employee Process***************** */
  const RegInitialValue = {
    EmployeeID: params.id,
    // Name: passedData.Name,
    // CheckInDate: passedData.CheckInDate,
    // CheckOutDate: passedData.CheckOutDate,
    // MonthDate:currentDate,

    // EmplyeeCheckInDateTime: passedData.EmplyeeCheckInDateTime,
    // EmplyeeCheckOutDateTime: passedData.EmplyeeCheckOutDateTime,
    // Status: passedData.Status === "Present" 
    //         ? "P"
    //         : passedData.Status === "Absent"
    //         ? "A"
    //         : passedData.Status === "WeekOff"
    //         ? "W"
    //         : passedData.Status === "Irregular"
    //         ? "I"
    //         : passedData.Status === "Leave"
    //         ? "L"
    //         : "",
  };
  console.log(RegInitialValue, "kkkk");


  const RegFNsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    // let action =
    //   mode === "A" && !del
    //     ? "insert"
    //     : mode === "E" && del
    //     ? "harddelete"
    //     : "update";
    var isCheck = "N";
    let action = "insert";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,

      EmployeeID: params.id,
      RegularizationDate: values.MonthDate,

      // CheckInDate:passedData.CheckInDate,
      // CheckOutDate: passedData.CheckOutDate,  

      // CheckInTime: passedData.EmplyeeCheckInDateTime?.split(" / ")[1] || "", 
      // CheckOutTime: passedData.EmplyeeCheckOutDateTime?.split(" / ")[1] || "", 
      Status: values.Status,
      Remarks: values.remarks,
      NewCheckInDate: values.CheckInDate,
      NewCheckOutDate: values.CheckOutDate,
      NewCheckInTime: values.EmplyeeCheckInDateTime
        ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
        : "",
      NewCheckOutTime: values.EmplyeeCheckOutDateTime
        ? values.EmplyeeCheckOutDateTime.split(" / ")[1]
        : "",
      NewStatus: values.Status,
    };
    console.log(idata, "-idata");
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      //navigate("/Apps/TR219/Regularization");
    } else {
      toast.error(response.payload.Msg);
    }
  };
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
  };

  /******************Employee values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniProcess(true);
    if (bMode == "A") {
      setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
    } else {
      if (field == "action") {
        console.log("selectdata" + data.Disable);
        setSupprodata({
          RecordID: data.RecordID,
          Comments: data.Comments,
          SortOrder: data.SortOrder,
        });
      }
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
      "Name",
      "Type",
      "value",
      "EffectiveValue",
      "action",
    ];
  }
  else if (show == "8") {
    VISIBLE_FIELDS = [
      "SLNO",
      "FromDate",
      "ToDate",
      "LeavePart",
      "Status",
      "AppliedDate",
      "action",
    ];
  } else if (show == "6") {
    VISIBLE_FIELDS = ["SLNO", "OtDate", "NumberOfHours", "Status", "action"];
  } else if (show == "7") {
    VISIBLE_FIELDS = [
      "SLNO",
      "SalaryAdvanceDate",
      "OverHeadsCode",
      "OverHeadsName",
      "action",
    ];
  } else {
    VISIBLE_FIELDS = [
      "SLNO",
      "Name",
      "Type",
      "value",
      "EffectiveValue",
      "action",
    ];
  }

  const columns = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  // **********Grid header function************
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
                ? "List of OT"
                : show == "7"
                  ? "List of SalaryAdvance"
                  : show == "1"
                    ? "List of Allowance"
                    : show == "8"
                      ? "List of OnDuty"
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
      field: "CheckInDateTimeConcat",
      headerName: "Employee CheckIn Date Time",
      flex: 1,
    },
    {
      field: "CheckOutDateTimeConcat",
      headerName: "Employee CheckOut Date Time",
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
    Comments: "",
  });
  const [ondutydata, setOndutydata] = useState({
    RecordID: "",
    FromDate: "",
    ToDate: "",
    Status: "",
    AppliedDate: "",
    LeavePart: "",
    Comments: "",
  });
  const [saladdata, setSaladdata] = useState({
    RecordID: "",
    SalaryAdvanceDate: "",
    ReferranceIfAny: "",
    OverHeadsID: "",
    // OverHeadsCode:"",
    // OverHeadsName: "",
    Amount: "",
    Comments: "",
  });
  const selectCellRowData = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
      rowData
    );

    setFunMode(mode);
    // setLaoMode(mode);

    if (mode == "A") {
      setAllDecData({
        recordID: "",
        value: "",
        sortOrder: "",
      });

      setADLookupData(null);
      //   {
      //   adType: '',
      //   adRecordID: '',
      //   adDesc: '',
      //   adCategory: '',

      // });
      setselectLETLookupData(null);
      //   {
      //   letlookupCode: "",
      //   letlookupRecordid: "",
      //   letlookupDesc: "",
      // });
      setselectOHLookupData(null);
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
      });
      setOtdata({
        RecordID: "",
        OtDate: "",
        NumberOfHours: "",
        OtType: "",
        PaymentMethod: "",
        Status: "",
        Comments: "",
      });
      setOndutydata({
        RecordID: "",
        LeavePart: "",
        FromDate: "",
        ToDate: "",
        Status: "",
        AppliedDate: "",
        //Status: "",
        Comments: "",
      });
      setSaladdata({
        RecordID: "",
        SalaryAdvanceDate: "",
        ReferranceIfAny: "",
        OverHeadsID: "",
        // OverHeadsCode:"",
        // OverHeadsName: "",
        Amount: "",
        Comments: "",
      });
    } else {
      if (field == "action") {
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
          fromDate: rowData.HiddenFromDate,
          toDate: rowData.HiddenToDate,
          LeavePart: rowData.LeavePart,
          Status: rowData.Status,
        });
        setOtdata({
          RecordID: rowData.RecordID,
          OtDate: rowData.HiddenOtDate,
          NumberOfHours: rowData.NumberOfHours,
          OtType: rowData.OtType,
          PaymentMethod: rowData.PaymentMethod,
          Status: rowData.Status,
          Comments: rowData.Comments,
        });
        setOndutydata({
          RecordID: rowData.RecordID,
          LeavePart: rowData.LeavePart,
          FromDate: rowData.FromDate,
          ToDate: rowData.ToDate,
          AppliedDate: rowData.AppliedDate,
          //PaymentMethod: rowData.PaymentMethod,
          Status: rowData.Status,
          Comments: rowData.Comments,
        });

        setselectLETLookupData({
          RecordID: rowData.LeaveTypeID,
          Code: rowData.LeaveTypeCode,
          Name: rowData.LeaveTypeName,
          // letlookupCode: rowData.LeaveTypeCode,
          // letlookupRecordid: rowData.LeaveTypeID,
          // letlookupDesc: rowData.LeaveTypeName,
        });
        setselectOHLookupData({
          RecordID: rowData.OverHeadsID,
          Code: rowData.OverHeadsCode,
          Name: rowData.OverHeadsName,
          // OHlookupRecordid: rowData.OverHeadsID,
          // OHlookupCode: rowData.OverHeadsCode,
          // OHlookupDesc: rowData.OverHeadsName,
        });
        setSaladdata({
          RecordID: rowData.RecordID,
          SalaryAdvanceDate: rowData.HiddenSalaryAdvanceDate,
          ReferranceIfAny: rowData.ReferranceIfAny,
          OverHeadsID: rowData.OverHeadsID,
          // OverHeadsCode:rowData.OverHeadsCode,
          // OverHeadsName: rowData.OverHeadsName,
          Amount: rowData.Amount,
          Comments: rowData.Comments,
        });

        setAllDecData({
          recordID: rowData.RecordID,
          value: rowData.value,
          sortOrder: rowData.Sortorder,
        });
        console.log(rowData.Sortorder, "--rowData.Sortorder in Allowances");

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
    date: Data.FEDate,
    referenceifany: Data.Referenceifany,
    amount: Data.Amount,
    comments: Data.Comments,
    approvedby: Data.Approvedby,
    overhead: Data.OverheadsRecordID ? { RecordID: Data.OverheadsRecordID, Name: Data.Name } : null,
  };
  const getExpenseFileChange = async (event) => {
    setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(fileUpload({ formData }));

    setImgName(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };
  const expensefnSave = async (values, resetForm, del) => {
    setLoading(true);

    const idata = {
      RecordID: recID,
      FEDate: values.date,
      Referenceifany: values.referenceifany,
      Amount: values.amount,
      Comments: values.comments,
      // Approvedby:values.approvedby,
      //OverheadsRecordID: selectOHLookupData.OHlookupRecordid,
      OverheadsRecordID: values.overhead.RecordID || 0,
      Attachment: ImageName ? ImageName : Data.Attachment,

      //FinanceCategoryType: parentID,
      Approvedby: EMPID,
      Finyear,
      compID,
    };

    //   var type = "";
    //   if (mode == "A") {
    //     type = "insert";
    //   } else {
    //     type = "update";
    //   }

    // const data = await dispatch(postApidata(accessID,type,idata))
    //let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    const responce = await dispatch(postData({ accessID, action, idata }));

    if (responce.payload.Status == "Y") {
      toast.success(responce.payload.Msg);
      // setIni(true)
      setLoading(false);
      // navigate(
      //   `/Apps/Secondarylistview/TR086/Finance Entry/${parentID}`
      // );
    } else {
      toast.error(responce.payload.Msg);
      setLoading(false);
    }
  };
  // -------------------------------- ON Duty ----------------------------------------------
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const ondutyInitialValue = {
    code: Data.Code,
    description: Data.Name,
    //RecordID: Data.RecordID,
    FromDate: formatDate(ondutydata.FromDate),
    ToDate: formatDate(ondutydata.ToDate),
    //LeavePart: ondutydata.LeavePart,
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
            : "",
    //Status: ondutydata.Status,
    managerComments: ondutydata.ManagerComments,
    comment: ondutydata.Comments,
    //SortOrder: ondutydata.SortOrder,
    //Disable: ondutydata.Disable,
  };

  console.log("Data:", Data);


  const ondutyFNsave = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: recID,
      EmployeeID: recID,
      //EmployeeID: mode == "M" ? params.parentID : EMPID,
      FromDate: values.FromDate,
      ToDate: values.ToDate,
      LeavePart: values.LeavePart,
      Comments: values.comment,
      Status: mode == "A" ? "AL" : values.Status,
      ManagerComments: values.managerComments,
      //SortOrder: "1",
      //Disable: "N",


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

  const leaveInitialValue = {
    code: Data.Code,
    description: Data.Name,
    // status:leaveData.Status,

    FromDate: formatDate(leaveData.fromDate),
    ToDate: formatDate(leaveData.toDate),
    // LeaveCategory: leaveData.leaveCategory,
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
      // Type:values.Type,
      FromDate: values.FromDate,
      ToDate: values.ToDate,
      // LeaveCategory:values.LeaveCategory,
      LeavePart: values.LeavePart,
      EmployeeID: recID,
      Status: values.Status,
      SortOrder: "1",
      Disable: "N",
      // LeaveTypeID: selectLETLookupData.letlookupRecordid,
      LeaveTypeID: selectLETLookupData ? selectLETLookupData.RecordID : 0,

    };
    const response = await dispatch(
      explorePostData({ accessID: "TR208", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
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
    comments: otdata.Comments,
    PaymentMethod:
      otdata.PaymentMethod === "As it is"
        ? "AS"
        : otdata.PaymentMethod === "Time and a Half"
          ? "TH"
          : otdata.PaymentMethod === "Double Time"
            ? "DT"
            : otdata.PaymentMethod === "Compensate"
              ? "CS"
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

      // Type:values.Type,
      // FromDate:values.FromDate,
      // ToDate:values.ToDate,
      // LeaveCategory:values.LeaveCategory,
      // EmployeeID: recID,
      // SortOrder: "1",
      // Disable: "N",
      // LeaveTypeID:selectLETLookupData.letlookupRecordid,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR216", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
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
    date: saladdata.SalaryAdvanceDate,
    referenceifany: saladdata.ReferranceIfAny,
    // purpose: saladdata.OverHeadsID,
    amount: saladdata.Amount,
    comments: saladdata.Comments,
    //approvedby: Data.Approvedby,
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
      Amount: values.amount,
      Comments: values.comments,
      EmployeeID: recID,

      // Approvedby:values.approvedby,
      //OverheadsRecordID: selectOHLookupData.OHlookupRecordid,
      // Attachment: ImageName ? ImageName : data.Attachment,
      // FinanceCategoryType: parentID,
      // Approvedby: EMPID,
      // Finyear,
      // CompanyID,
      // Type:values.Type,
      // FromDate:values.FromDate,
      // ToDate:values.ToDate,
      // LeaveCategory:values.LeaveCategory,
      // EmployeeID: recID,
      // SortOrder: "1",
      // Disable: "N",
      // LeaveTypeID:selectLETLookupData.letlookupRecordid,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR160", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
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
      CompanyID,
      ManagerID: "",
      Etype: ""
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
      // ProjectID: "1"
      ProjectID: values.ProName.RecordID || 0,
      CompanyID
      // ProjectName: values.ProName.Name || "",
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

    console.log("month", values.month.toString());

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

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(imageUpload({ formData }));
    // setImgName(fileData.payload.name)
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
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
          navigate("/Apps/TR027/Employees");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        {/* <Box display="flex" justifyContent="space-between" p={2}>
         
          <Box
            display="flex"
            // backgroundColor={colors.primary[400]}
            borderRadius="3px"
            alignItems={"center"}
          >
            {broken && !rtl && (
              <IconButton

                onClick={() => toggleSidebar()}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box display={isNonMobile ? 'flex' : 'none'} borderRadius="3px" alignItems="center">
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{ color: '#0000D1' }} />}>
                <Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }} onClick={() => { setScreen(0) }}>Employee</Typography>
                {show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Allowances</Typography>) : false}
                {show == "5" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Deductions</Typography>) : false}
                {show == "2" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Leave</Typography>) : false}
                {show == "7" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Salary Advance</Typography>) : false}
                {show == "3" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Attendance</Typography>) : false}
                {show == "4" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Payroll Attendance</Typography>) : false}

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

                  <MenuItem value={1}>Allowances</MenuItem>
                  <MenuItem value={5}>Deductions</MenuItem>
                  <MenuItem value={2}>Leave</MenuItem>
                  <MenuItem value={6}>OT</MenuItem>
                  <MenuItem value={7}>Salary Advance</MenuItem>
                  <MenuItem value={3}>Attendance</MenuItem>
                  <MenuItem value={4}>Payroll Attendance</MenuItem>

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
        </Box> */}
        <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            p={mode == "A" ? 2 : 1}
          >
            <Box
              display="flex"
              // backgroundColor={colors.primary[400]}
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
                  {show == "1" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Allowances
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "5" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Deductions
                    </Typography>
                  ) : (
                    false
                  )}
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
                      OT
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

                    <MenuItem value={1}>Allowances</MenuItem>
                    <MenuItem value={5}>Deductions</MenuItem>
                    {/* <MenuItem value={2}>Leave</MenuItem>
                    <MenuItem value={6}>OT</MenuItem>
                    <MenuItem value={8}>On Duty</MenuItem>
                    <MenuItem value={7}>Salary Advance</MenuItem>
                    <MenuItem value={9}>Expense</MenuItem>
                    <MenuItem value={10}>Regularization</MenuItem> */}
                    <MenuItem value={3}>Attendance</MenuItem>
                    <MenuItem value={4}>Payroll Attendance</MenuItem>
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
        {/* {show == "0" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>

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
                setFieldValue,
              }) => (
                <form>
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
                    )}

                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={selectLookupData.lookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
                      <FormControl
                        sx={{
                          //gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                       
                        <Productautocomplete
                          sx={{ marginTop: "7px" }}
                          name="Department"
                          // label="Department"
                          label={
                            <span>
                              Department
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </span>
                          }
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
                          url={`${listViewurl}?data={"Query":{"AccessID":"2010","ScreenName":"Department","Filter":"","Any":""}}`}
                        />
                      </FormControl>

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
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
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
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
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
                          // gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
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
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                      />
                     
                      <FormControl>
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
                        </Box>
                      </FormControl>
                    </FormControl>

                    <FormControl sx={{ gap: formGap }}>
                      {isNonMobile && (
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
                      )}

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
                        sx={{
                          // gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                        rows={2}
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
                        ///sx={{ gridColumn: "span 2", background: "#fff6c3" }}
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
                          fnSave(values);
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

                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        navigate(`/Apps/TR027/Employee Payroll`);
                      }}
                    >
                      Cancel
                    </Button>
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
                    />
                  </Popup>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )} */}
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
                        url={`${listViewurl}?data={"Query":{"AccessID":"2010","ScreenName":"Department","Filter":"parentID=${compID}","Any":""}}`}
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
                    {YearFlag == "true" && mode == "E" ? (
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
                      // <Button
                      //   color="error"
                      //   variant="contained"
                      //   disabled={true}
                      // //  color="error"
                      // >
                      //   Delete
                      // </Button>
                      null
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
                      filterValue={compID}
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
                      filterValue={compID}
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
                      filterValue={compID}
                    />
                  </Popup>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}

        {show == "1" ? (
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
                setFieldValue
              }) => {
                const baseSalary = Number(Data?.Sal || 0);
                const enteredValue = Number(values.value || 0);

                const effectiveValue = (baseSalary + enteredValue).toFixed(2);
                return (
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
                          //inputProps={{ readOnly: true }}
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
                          label="Name"
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
                      {/* <Stack
                      sx={{
                        //gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}
                    >
                      <img
                        src={values.imageurl}
                        style={{ width: "200px", height: "120px" }}
                      />
                    </Stack> */}
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
                          pageSize={pageSize}
                          rowHeight={dataGridRowHeight}
                          headerHeight={dataGridHeaderFooterHeight}
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
                          getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0
                              ? "odd-row"
                              : "even-row"
                          }
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
                        />
                      </Box>

                      <FormControl sx={{ gap: formGap, marginTop: "30px" }}>
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
                          <Productautocomplete
                            name="Allowances"
                            label={
                              <span>
                                Allowances
                                <span
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            variant="outlined"
                            id="Allowances"
                            value={ADLookupData}
                            // value={values.Allowances}
                            onChange={(newValue) => {
                              // setFieldValue("Allowances", newValue);
                              console.log(
                                ADLookupData,
                                "--ADLookupData Allowances"
                              );

                              console.log(
                                newValue.RecordID,
                                "Allowances RecordID"
                              );

                              setADLookupData({
                                RecordID: newValue.RecordID,
                                Type: newValue.Type,
                                Name: newValue.Name,
                                SalaryCategory: newValue.SalaryCategory,
                              });
                            }}
                            url={`${listViewurl}?data={"Query":{"AccessID":"2082","ScreenName":"Allowances","Filter":"SalaryCategory='A'","Any":""}}`}
                          />
                          {/* <TextField
                          id="outlined-basic"
                          label="Allowances"
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
                          id="type"
                          name="type"
                          value={values.type}
                          label="Type"
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
                          id="value"
                          name="value"
                          value={values.value}
                          label="Value"
                          //sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                          // sx={{
                          //   gridColumn: "span 2",
                          //   backgroundColor: "#ffffff", // Set the background to white
                          //   "& .MuiFilledInput-root": {
                          //     backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                          //   }
                          // }}
                          focused
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          // inputProps={{ readOnly: true }}
                          onChange={(e) => {
                            // allow only numbers + decimal
                            const val = e.target.value;
                            if (/^\d*\.?\d*$/.test(val)) {
                              setFieldValue("value", val);
                            }
                          }}
                          onBlur={(e) => {
                            let val = e.target.value;

                            if (val === "" || val === ".") {
                              setFieldValue("value", "0.00");
                              return;
                            }

                            const num = parseFloat(val);
                            if (!isNaN(num)) {
                              setFieldValue("value", num.toFixed(2)); // ✅ forces .00
                            }
                          }}
                        />

                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="effectivevalue"
                          name="effectivevalue"
                          // value={Number(Data.Sal) + Number(values.value)}
                          value={effectiveValue}
                          label="Effective Value"
                          focused
                          inputProps={{ readOnly: true }}
                          //sx={{ background: "#fff6c3" }}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        // sx={{
                        //   backgroundColor: '#ffffff', // Change to your desired background color
                        //   '& .MuiFilledInput-root': {
                        //     backgroundColor: '#f5f5f5', // For the filled variant
                        //   },
                        // }}
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
                        title="Allowance"
                        openPopup={openADPopup}
                        setOpenPopup={setOpenADPopup}
                      >
                        <Listviewpopup
                          accessID="2082"
                          screenName="Allowance"
                          childToParent={childToParent}
                          filterName={"SalaryCategory"}
                          filterValue={"A"}
                        />
                      </Popup>
                    </Box>
                  </form>
                )
              }}
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
                setFieldValue
              }) => 
                {
                const baseSalary = Number(Data?.Sal || 0);
                const enteredValue = Number(values.value || 0);

                const effectiveValue = (baseSalary - enteredValue).toFixed(2);
                return  (
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
                            console.log(
                              ADLookupData,
                              "--ADLookupData Deduction"
                            );

                            console.log(
                              newValue.RecordID,
                              "Deduction RecordID"
                            );

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
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                          onChange={(e) => {
                            // allow only numbers + decimal
                            const val = e.target.value;
                            if (/^\d*\.?\d*$/.test(val)) {
                              setFieldValue("value", val);
                            }
                          }}
                          onBlur={(e) => {
                            let val = e.target.value;

                            if (val === "" || val === ".") {
                              setFieldValue("value", "0.00");
                              return;
                            }

                            const num = parseFloat(val);
                            if (!isNaN(num)) {
                              setFieldValue("value", num.toFixed(2)); // ✅ forces .00
                            }
                          }}
                      // inputProps={{ readOnly: true }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="effectivevalue"
                        name="effectivevalue"
                        // value={Number(Data.Sal) - Number(values.value)}
                        value={effectiveValue}
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
              )}}
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
                          label="LeaveType"
                          variant="standard"
                          value={selectLETLookupData.letlookupRecordid}
                          focused
                          sx={{ display: "none" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Leave Type"
                          variant="standard"
                          value={selectLETLookupData.letlookupCode}
                          focused
                          required
                          DESIGN
                          inputProps={{ tabIndex: "-1" }}
                        /> */}
                        {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                        {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                        {/* </Button> */}
                        {/* <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("LT")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="standard"
                          value={selectLETLookupData.letlookupDesc}
                          fullWidth
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        /> */}


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
                          url={`${listViewurl}?data={"Query":{"AccessID":"2092","ScreenName":"Leave Type","Filter":"","Any":""}}`}
                        />

                      </FormControl>
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

                      <FormControl focused variant="standard">
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
                          <MenuItem value="AL">Applied</MenuItem>
                          <MenuItem value="RJ">Rejected</MenuItem>
                          <MenuItem value="AP">Approved</MenuItem>
                        </Select>
                      </FormControl>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    style={{ marginTop: "-45px" }}
                    gap={2}
                  >
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
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label="Comments"
                          value={values.comments}
                          id="comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="comments"
                          error={!!touched.comments && !!errors.comments}
                          helperText={touched.comments && errors.comments}
                          focused
                        />

                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="PaymentMethod">
                            Payment Methods
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="PaymentMethod"
                            name="PaymentMethod"
                            value={values.PaymentMethod}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              !!touched.PaymentMethod &&
                              !!errors.PaymentMethod
                            }
                            helperText={
                              touched.PaymentMethod && errors.PaymentMethod
                            }
                          >
                            <MenuItem value="AS">As it is</MenuItem>
                            <MenuItem value="TH">Time and a Half</MenuItem>
                            <MenuItem value="DT">Double Time</MenuItem>
                            <MenuItem value="CS">Compensate</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          focused
                          variant="standard"
                        //sx={{ gridColumn: "span 2" }}
                        >
                          <InputLabel id="OtType">OT Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="OtType"
                            name="OtType"
                            value={values.OtType}
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
                          </Select>
                        </FormControl>
                      </FormControl>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={2}
                  // style={{ marginTop: "-45px" }}
                  >
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
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
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
                                    style={{ color: "red", fontWeight: "bold" }}
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
                                // setFieldValue("overhead", newValue);
                                console.log(
                                  selectOHLookupData,
                                  "--selectOHLookupData overhead"
                                );

                                console.log(
                                  newValue.RecordID,
                                  "overhead RecordID"
                                );

                                setselectOHLookupData({
                                  RecordID: newValue.RecordID,
                                  Code: newValue.Code,
                                  Name: newValue.Name,

                                });
                              }}
                              url={`${listViewurl}?data={"Query":{"AccessID":"2032","ScreenName":"Overhead","Filter":"","Any":""}}`}
                            />
                          </FormControl>
                        </FormControl>

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
                          autoFocus
                        />
                        <TextField
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
                        />
                        {/* <TextField
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
                   sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                   InputProps={{
                     inputProps: {
                       style: { textAlign: "right" }, 
                       min: 0, 
                       max: 24, 
                     },
                   }}
                 />
                   <TextField
                     fullWidth
                     variant="standard"
                     type="text"
                     label="Comments"
                     value={values.comments}
                     id="comments"
                     onBlur={handleBlur}
                     onChange={handleChange}
                     name="comments"
                     error={!!touched.comments && !!errors.comments}
                     helperText={touched.comments && errors.comments}
                     sx={{ 
                       gridColumn: "span 2", 
                       backgroundColor: '#f5f5f5 ', // Change to your desired background color
                   '& .MuiFilledInput-root': {
                     backgroundColor: '#f5f5f5 ', // For the filled variant
                   },
                     }}                        focused
                     
                   /> */}

                        {/* <FormControl
                 focused
                 variant="standard"
                 sx={{ gridColumn: "span 2" }}
               >
                 <InputLabel id="paymentmethods">Payment Methods</InputLabel>
                 <Select
                   labelId="demo-simple-select-filled-label"
                   id="paymentmethods"
                   name="paymentmethods"
                   value={values.paymentmethods}
                   onBlur={handleBlur}
                   onChange={handleChange}
                    error={!!touched.paymentmethods && !!errors.paymentmethods}
                     helperText={touched.paymentmethods && errors.paymentmethods}
                     sx={{ 
                       gridColumn: "span 2", 
                       backgroundColor: "#ffffff", 
                       "& .MuiFilledInput-root": {
                         backgroundColor: "#ffffff",
                       }
                     }}     
                 >
                   <MenuItem value="AS">Assitis</MenuItem>
                   <MenuItem value="TH">Time and a Half</MenuItem> 
                   <MenuItem value="DT">Double Time</MenuItem>
                   <MenuItem value="CS">Compensate</MenuItem>
                 
                 </Select>
                 
               </FormControl> */}
                        {/* <FormControl
                 focused
                 variant="standard"
                 sx={{ gridColumn: "span 2" }}
               >
                 <InputLabel id="OtType">OT Type</InputLabel>
                 <Select
                   labelId="demo-simple-select-filled-label"
                   id="OtType"
                   name="OtType"
                   value={values.OtType}
                   onBlur={handleBlur}
                   onChange={handleChange}
                    error={!!touched.OtType && !!errors.OtType}
                     helperText={touched.OtType && errors.OtType}
                     sx={{ 
                       gridColumn: "span 2", 
                       backgroundColor: "#ffffff", 
                       "& .MuiFilledInput-root": {
                         backgroundColor: "#ffffff",
                       }
                     }}     
                 >
                   <MenuItem value="FS">Flexible Scheduling</MenuItem>
                   <MenuItem value="SS">Shift Swaps</MenuItem> 
                 </Select>
               </FormControl> */}

                        {/* <FormControl
                 focused
                 variant="standard"
                 sx={{ gridColumn: "span 2" }}
               >
                
                <InputLabel id="Status">Status</InputLabel>
                 <Select
                   labelId="demo-simple-select-filled-label"
                   id="Status"
                   name="Status"
                   value={values.Status}
                   onBlur={handleBlur}
                   onChange={handleChange}
                    error={!!touched.Status && !!errors.Status}
                     helperText={touched.Status && errors.Status}
                     sx={{ 
                       gridColumn: "span 2", 
                       backgroundColor: "#ffffff", 
                       "& .MuiFilledInput-root": {
                         backgroundColor: "#ffffff",
                       }
                     }}     
                 >
                   <MenuItem value="AL">Applied</MenuItem>
                   <MenuItem value="AP">Approved</MenuItem> 
                   <MenuItem value="RJ">Rejected</MenuItem>
                 
                 </Select>
               </FormControl> */}
                      </FormControl>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={2}
                    style={{ marginTop: "-45px" }}
                  >
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
                          {mode != "M" && <MenuItem value="AL">Applied</MenuItem>}
                          <MenuItem disabled={mode != "M"} value="AP">
                            Approved
                          </MenuItem>
                          <MenuItem disabled={mode != "M"} value="RJ">
                            Rejected
                          </MenuItem>
                        </TextField>
                        {/* } */}

                        {/* {mode == "E" && values.Status == "AP" && <Alert variant="filled" sx={{mt:1}} severity="success">Your Leave Request Was Approved.</Alert>} */}
                        {/* {mode == "E" && values.Status == "RJ" && <Alert variant="filled" sx={{mt:1}} severity="error">Your Leave Request Was Rejected.</Alert>} */}
                      </FormControl>

                      <Box display="flex" padding={1} justifyContent="flex-end" mt="2px" gridColumn="span 4" gap={2} >
                        {/* {mode != "M" && (values.Status == "AL" || mode == "A" ) &&  */}
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
                            filterValue={compID}
                          />
                        </Popup>
                      </Box>
                    </FormControl>
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

                        <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>

                          <FormControl
                            sx={{
                              gridColumn: "span 2",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Productautocomplete
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
                              url={`${listViewurl}?data={"Query":{"AccessID":"2032","ScreenName":"OverHead","Filter":"","Any":""}}`}

                            />
                          </FormControl>
                        </FormControl>

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
                          autoFocus
                        />
                        <TextField
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
                        />

                      </FormControl>

                      <Box display="flex" padding={1} justifyContent="end" mt={18} gap={formGap}>
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
                                navigate("/Apps/TR086/Finance%20Entry");
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
                      </Box>
                    </FormControl>
                  </Box>

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
                setFieldValue
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
                      type="text"
                      id="description"
                      name="description"
                      value={values.description}
                      label="Description"
                      focused
                      inputProps={{ readOnly: true }}
                    />
                    <Productautocomplete
                      name="ProName"
                      label="Project"
                      id="ProName"
                      value={values.ProName}
                      onChange={(newValue) => {
                        setFieldValue("ProName", newValue)
                        console.log(newValue);
                      }}
                      //value={selectedProjectOptions}
                      //onChange={handleSelectionProjectname}
                      // defaultValue={selectedProjectName}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${CompanyID}","Any":""}}`}

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
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
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
                      <MenuItem value={"1"}>January</MenuItem>
                      <MenuItem value={"2"}>February</MenuItem>
                      <MenuItem value={"3"}>March</MenuItem>
                      <MenuItem value={"4"}>April</MenuItem>
                      <MenuItem value={"5"}>May</MenuItem>
                      <MenuItem value={"6"}>June</MenuItem>
                      <MenuItem value={"7"}>July</MenuItem>
                      <MenuItem value={"8"}>August</MenuItem>
                      <MenuItem value={"9"}>September</MenuItem>
                      <MenuItem value={"10"}>October</MenuItem>
                      <MenuItem value={"11"}>November</MenuItem>
                      <MenuItem value={"12"}>December</MenuItem>
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
                      InputProps={{
                        inputProps: {
                          style: { textAlign: "right" },
                        },
                      }}
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
        {show == "10" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={RegInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  RegFNsave(values, resetForm, false);
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
                        label="Date"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.MonthDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                        value={values.CheckInDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                        //value={values.EmplyeeCheckInDateTime}
                        value={
                          values.EmplyeeCheckInDateTime
                            ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
                            : ""
                        }
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
                        //value={values.EmplyeeCheckOutDateTime}
                        value={
                          values.EmplyeeCheckOutDateTime
                            ? values.EmplyeeCheckOutDateTime.split(" / ")[1] // gets "09:02"
                            : ""
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                        variant="standard"
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
                        >
                          <MenuItem value="P">Present</MenuItem>
                          <MenuItem value="A">Absent</MenuItem>
                          <MenuItem value="W">WeekOff</MenuItem>
                          <MenuItem value="I">Irregular</MenuItem>
                          <MenuItem value="L">Leave</MenuItem>
                        </Select>
                      </FormControl>
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
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    gap={formGap}
                  >
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
                            RegFNsave(values, resetForm, "harddelete");
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

export default EditemployeePayroll;
