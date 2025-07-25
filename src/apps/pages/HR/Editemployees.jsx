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
} from "@mui/material";
import { subDays, differenceInDays } from "date-fns";
import * as Yup from "yup";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field, useFormikContext } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  explorePostData,
  fetchApidata,
  postApidata,
  postApidatawol,
  getDeployment,
  postDeployment,
  invoiceExploreGetData,
  postData,
  geolocationData,
  geolocUpdate,
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
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
import {
  Productautocomplete,
  ProductautocompleteLevel,
  SingleFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************

const Editemployee = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const CompanyID = sessionStorage.getItem("compID");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  console.log(SubscriptionCode, "codehr");
  const EMPID = sessionStorage.getItem("EmpId");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const YearFlag = sessionStorage.getItem("YearFlag");
  console.log(YearFlag, "--YearFlag");

  const navigate = useNavigate();
  let params = useParams();
  console.log(params, "--params");

  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data) || {};
  // console.log(Data, "geteting Data");
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const baseApiUrl = useSelector((state) => state.globalurl.baseApiUrl);
  console.log("API URL:", baseApiUrl);
  const state = location.state || {};
  console.log(state, "emnployee");
  const isLoading = useSelector((state) => state.formApi.loading);
  const deploymentData = useSelector((state) => state.formApi.deploymentData);
  console.log("deploymentData", deploymentData);
  const DataExplore = useSelector((state) => state.formApi.inviceEData);
  console.log(
    "🚀 ~ file: Editproformainvoice.jsx:110 ~ DataExplore:",
    DataExplore
  );

  const gelocData = useSelector((state) => state.formApi.exploreData);

  const [openDEPopup, setOpenDEPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);

  const [openPROPopup, setOpenPROPopup] = useState(false);

  const [Color, setColor] = useState("");
  const { toggleSidebar, broken, rtl } = useProSidebar();

  // const { setFieldValue } = useFormikContext();
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [iniProcess, setIniProcess] = useState(true);
  const [loading, setLoading] = useState(false);
  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      Data.ImageName == undefined ||
      Data.ImageName == null ||
      Data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + Data.ImageName;
    }
  }
  // console.log(Data, "--Data");

  // var apiData = "";
  // apiData = {
  //   Code: Data.Code,
  //   Name: Data.Name,
  //   Job: Data.Job,
  //   Department: Data.Department,
  //   Comm: Data.Comm,
  //   Mgr: Data.Mgr,
  //   Sal: Data.Sal,
  //   Fax: Data.Fax,
  //   SortOrder: Data.SortOrder,
  //   Disable: Data.Disable,
  //   Password: Data.Password,
  //   joindate: Data.joindate,
  //   confirmdate: Data.confirmdate,
  //   employeetype: Data.employeetype,
  // };
  //*******Assign Employee values from Database in  Yup initial value******* */
  const contactvalidationSchema = Yup.object({
    aadharcardnumber: Yup.string()
      .matches(/^\d{12}$/, 'Aadhar Number must be exactly 12 digits')
      .required('Aadhar Number is required'),
    pfnumber: Yup.string()
      .matches(/^[A-Za-z0-9]{22}$/, 'PF Number must be exactly 22 alphanumeric characters')
      .required('PF Number is required'),
    //     pfnumber: Yup.string()
    // .matches(/^[A-Z]{2}\/[A-Z]{3}\/\d{7}\/\d{3}\/\d{4}$/, 'Invalid PF Number format')
    // .required('PF Number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|co|in)$/,
        'Email must be valid'
      )
      .required('Email is required'),
    esinumber: Yup.string()
      .matches(/^\d{17}$/, 'ESI Number must be exactly 17 digits')
      .required('ESI Number is required'),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone Number must be valid')
      .required('Phone Number is required'),




  });

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to "YYYY-MM-DD"
    }
    return dateStr;
  };

  // console.log(apiData, "--apiData");
  // console.log(apiData.DeptName, "--apiData.DeptName");

  const initialValues = {
    Department: Data.DeptRecordID
      ? {
        RecordID: Data.DeptRecordID,
        Code: Data.DeptCode,
        Name: Data.DeptName,
      }
      : null,
    Code: Data.Code,
    Name: Data.Name,
    Password: Data.Password,
    Job: Data.Job,
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
    checkbox: Data.Disable,
    scrummaster: Data.ScrumMaster === "Y" ? true : false,
    prjmanager: Data.ProjectManager === "Y" ? true : false,

    joindate: Data.DateOfJoin,
    confirmdate: Data.DateOfConfirmation,
    Comm: Data.Comm,
    SortOrder: Data.SortOrder || 0,

    Mgr: Data.Mgr,
    Sal: Data.Sal,
    Fax: Data.Fax,
  };

  console.log(Data.EmpType, "--Data.EmpType");
  const [openPopup, setOpenPopup] = useState(false);
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [opendesignPopup, setOpendesignPopup] = useState(false);
  const [openvenPopup, setOpenvenPopup] = useState(false);

  const [openFunPopup, setOpenFunPopup] = useState(false);

  const [openDesPopup, setOpenDesPopup] = useState(false);
  // ************Lookup Function***************
  function handleShow(type) {
    if (type == "DE") {
      setOpenDEPopup(true);
    }
    if (type == "LOCATION") {
      setOpenLOCATIONPopup(true);
    }
    if (type == "GATE") {
      setOpenGATEPopup(true);
    }

    if (type == "PRO") {
      setOpenPROPopup(true);
    }
    if (type == "DESIGN") {
      setOpendesignPopup(true);
    }
    if (type == "FUN") {
      setOpenFunPopup(true);
    }
    if (type == "VEN") {
      setOpenvenPopup(true);
    }

    if (type == "DISG") {
      setOpenDesPopup(true);
    }
  }

  const [selectLookupData, setselectLookupData] = React.useState({
    lookupRecordid: "",
    lookupCode: "",
    lookupDesc: "",
  });
  const [designLookup, setdesignLookup] = React.useState({
    designlookupRecordid: "",
    designlookupCode: "",
    designlookupDesc: "",
  });

  const [locationLookup, SetLocationLookup] = useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [gateLookup, SetGateLookup] = useState({
    gateRecordID: "",
    gateCode: "",
    gateName: "",
  });
  // const [selectproLookupData, setselectproLookupData] = React.useState(null);

  const [LeaveconLTData, setselectLeaveconLTData] = React.useState(null);

  //   {
  //   PROlookupRecordid: "",
  //   PROlookupCode: "",
  //   PROlookupDesc: "",
  // });

  // ***************  EMPLOYEE-FUNCTION LOOKUP  *************** //
  const [customerlookup, SetCustomerlookup] = useState(null);

  const [vendorlookup, SetVendorlookup] = useState(null);
  //   {
  //   venRecordID: "",
  //   venCode: "",
  //   venName: "",
  // });
  const [functionLookup, SetFunctionLookup] = useState(null);
  //   {
  //   funRecordID: "",
  //   funCode: "",
  //   funName: "",
  // });

  const [designationLookup, SetDesignationLookup] = useState(null);
  //   desRecordID: "",
  //   desCode: "",
  //   desName: "",
  //   ManagerID: "",
  // });

  if (isPopupData == false) {
    selectLookupData.lookupRecordid = Data.DeptRecordID;
    selectLookupData.lookupCode = Data.DeptCode;
    selectLookupData.lookupDesc = Data.DeptName;

    //Designation
    console.log(deploymentData, "ispopupdeployment");
    designLookup.RecordID = deploymentData.DesignationID;
    designLookup.Code = deploymentData.DesignationCode;
    designLookup.Name = deploymentData.DesignationName;

    // Location
    locationLookup.RecordID = deploymentData.LocationID;
    locationLookup.Code = deploymentData.LocationCode;
    locationLookup.Name = deploymentData.LocationName;

    // Gate
    gateLookup.RecordID = deploymentData.StoregatemasterID;
    gateLookup.Code = deploymentData.StoregatemasterCode;
    gateLookup.Name = deploymentData.StoregatemasterName;
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

    // if (type == "Process") {
    //   // setselectproLookupData({
    //   //   PROlookupCode: childdata.Code,
    //   //   PROlookupRecordid: childdata.RecordID,
    //   //   PROlookupDesc: childdata.Name,
    //   // });
    //   setOpenPROPopup(false);
    // }
    if (type == "Designation") {
      setdesignLookup({
        designlookupRecordid: childdata.RecordID,
        designlookupCode: childdata.Code,
        designlookupDesc: childdata.Name,
      });
      setOpendesignPopup(false);
    }
    if (type == "Location") {
      SetLocationLookup({
        locationRecordID: childdata.RecordID,
        // locationRecordid: childdata.RecordID,
        locationCode: childdata.Code,
        locationName: childdata.Name,
      });
      setOpenLOCATIONPopup(false);
    }

    if (type == "Gate") {
      SetGateLookup({
        gateRecordID: childdata.RecordID,
        gateCode: childdata.Code,
        gateName: childdata.Name,
      });
      setOpenGATEPopup(false);
    }
    if (type == "Functions") {
      // SetFunctionLookup({
      //   funRecordID: childdata.RecordID,
      //   funCode: childdata.Code,
      //   funName: childdata.Name,
      // });
      setOpenFunPopup(false);
    }
    if (type == "Vendor") {
      // SetVendorlookup({
      //   venRecordID: childdata.RecordID,
      //   venCode: childdata.Code,
      //   venName: childdata.Name,
      // });
      setOpenvenPopup(false);
    }

    if (type == "Designations") {
      // SetDesignationLookup({
      //   desRecordID: childdata.DesignationID,
      //   ManagerID: childdata.RecordID,
      //   desCode: childdata.Code,
      //   desName: childdata.Name,
      // });
      setOpenDesPopup(false);
    }
  };
  // **********Save Function*****************
  const fnSave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    var isCheck = "N";
    if (values.checkbox || values.scrummaster == true) {
      isCheck = "Y";
    }

    var saveData = {
      RecordID: recID,
      //DeptRecordID: selectLookupData.lookupRecordid,
      DeptRecordID: values.Department.RecordID || 0,
      DeptName: values.Department.Name || "",
      Code: values.Code,
      Name: values.Name,
      SortOrder: values.SortOrder || 0,
      Disable: values.checkbox === true ? "Y" : "N",
      ScrumMaster: values.scrummaster === true ? "Y" : "N",
      ProjectManager: values.prjmanager === true ? "Y" : "N",
      Job: values.Job,
      Mgr: values.Mgr,
      Sal: "",
      EmpType: values.employeetype,
      DateOfJoin: values.joindate,
      DateOfConfirmation: values.confirmdate,
      Comm: values.Comm,
      Password: values.Password,
      // DesignID: 0,
      // LocationRecID: 0,
      // GateRecID: 0,
      // WeekOff: 0,
      CompanyID,
      SubscriptionCode,
    };

    const data = await dispatch(
      postData({ accessID, action, idata: saveData })
    );
    // const data = await dispatch(postApidatawol(accessID, action, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      dispatch(fetchApidata(accessID, "get", recID));

      setLoading(false);
      if (del) {
        navigate(`/Apps/TR027/Employees`);
      } else {
        navigate(
          `/Apps/TR027/Employees/EditEmployees/${data.payload.Recid}/E`,
          { state: { ...state } }
        );
      }
    } else {
      toast.error(data.payload.Msg);
      console.log(data.payload.Msg, "--error");

      setLoading(false);
    }
  };

  /**************************************Skills***************** */

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
    Skills: "",
  });

  const [boMode, setBomode] = useState("A");

  // **********ScreenChange Function*********
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "1") {
      dispatch(fetchExplorelitview("TR038", "Skills", recID, ""));
      dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }

    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview("TR125", "Function", `EmployeeID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "3") {
      dispatch(fetchApidata(accessID, "get", recID));
      dispatch(
        fetchExplorelitview("TR126", "Manager", `parentID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "4" || event.target.value == "12") {
      dispatch(getDeployment({ HeaderID: recID }));
      // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "5") {
      dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));
    }
    if (event.target.value == "6") {
      dispatch(
        fetchExplorelitview("TR210", "Attachment", `EmployeeID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "7") {
      dispatch(
        fetchExplorelitview("TR212", "itemcustody", `EmployeeID=${recID}`, "")
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    //Contractor
    if (event.target.value == "8") {
      dispatch(
        fetchExplorelitview(
          "TR244",
          "Contracts In",
          `EmployeeID='${recID}' AND Vendors='Y'`,
          ""
        )
      );

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "11") {
      dispatch(
        fetchExplorelitview(
          "TR244",
          "Contracts Out",
          `EmployeeID='${recID}' AND Customer='Y'`,
          ""
        )
      );

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "9") {
      dispatch(geolocationData({ empID: recID }));
      // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }

    if (event.target.value == "10") {
      dispatch(
        fetchExplorelitview(
          "TR249",
          "Leave Configuration",
          `EmployeeID='${recID}'`,
          ""
        )
      );
      // dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }
  };

  /******************Employee values assign a state variale******************** */
  const selectcelldata = (data, bMode, field) => {
    console.log("selectdata" + JSON.stringify(data));

    setBomode(bMode);
    setIniProcess(true);
    if (bMode == "A") {
      setSupprodata({ RecordID: "", Comments: "", SortOrder: "", Skills: "" });
      // setselectproLookupData(null);

      //   {
      //   PROlookupRecordid: "",
      //   PROlookupCode: "",
      //   PROlookupDesc: "",
      // });
    } else {
      if (field == "action") {
        console.log("selectdata" + data.Disable);
        setSupprodata({
          RecordID: data.RecordID,
          Comments: data.Comments,
          SortOrder: data.SortOrder,
          Skills: data.Skills,
        });

        // setselectproLookupData({
        //   RecordID: data.PsRecordID,
        //   Code: data.ProcessCode,
        //   Name: data.ProcessDescription,
        //   // PROlookupRecordid: data.PsRecordID,
        //   // PROlookupCode: data.ProcessCode,
        //   // PROlookupDesc: data.ProcessDescription,
        // });
      }
    }
  };
  //*******Assign Employee values from Grid table in  Yup initial value******* */
  const supprocessInitialvalues = {
    Comments: supprodata.Comments,
    SortOrder: supprodata.SortOrder,
    Skills: supprodata.Skills,
  };

  /******************************save  Function********** */
  const fnProcess = async (values, resetForm, types) => {
    setIniProcess(false);
    if (types == "harddelete") {
      if (supprodata.RecordID == "") {
        toast.error("Please select the data");
        return;
      }
    }
    // if (selectproLookupData.PROlookupCode == "") {
    //   toast.error("Please Choose Process Lookup");
    //   return;
    // }

    if (values.Comments == "") {
      toast.error("Please Enter Comments");
      return;
    }
    if (values.Skills == "") {
      toast.error("Please Enter Skills");
      return;
    }

    console.log(values);

    var saveData = "";
    var type = "";

    if (types === "harddelete") {
      type = "harddelete";
      saveData = {
        RecordID: supprodata.RecordID,
        EmpRecordID: recID,
        Skills: values.Skills,
        // PsRecordID: selectproLookupData ? selectproLookupData.RecordID : 0,
        // PsRecordID: selectproLookupData.PROlookupRecordid,
        Comments: values.Comments,
        SortOrder: values.SortOrder || 0,
      };
    } else {
      setLoading(true);
      if (boMode == "A") {
        saveData = {
          RecordID: "",
          EmpRecordID: recID,
          Skills: values.Skills,
          // PsRecordID: selectproLookupData ? selectproLookupData.RecordID : 0,
          // PsRecordID: selectproLookupData.PROlookupRecordid,
          Comments: values.Comments,
          SortOrder: values.SortOrder || 0,
          CompanyID,
        };
        type = "insert";
      } else {
        saveData = {
          RecordID: supprodata.RecordID,
          EmpRecordID: recID,
          Skills: values.Skills,
          // PsRecordID: selectproLookupData ? selectproLookupData.RecordID : 0,
          // PsRecordID: selectproLookupData.PROlookupRecordid,
          Comments: values.Comments,
          SortOrder: values.SortOrder || 0,
          CompanyID,
        };
        type = "update";
      }
    }
    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR038", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(fetchExplorelitview("TR038", "Skills", recID, ""));
      resetForm();

      // setSupprodata({ RecordID: "", Comments: "", SortOrder: "", Skills: "" });
      selectcelldata("", "A", "");
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
  //*********************Contact******************/
  const contactInitialvalues = {
    Code: Data.Code,
    Name: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    phonenumber: DataExplore.PhoneNumber,
    email: DataExplore.Email,
    aadharcardnumber: DataExplore.AadharCardNo,
    pfnumber: DataExplore.PfNo,
    esinumber: DataExplore.EsiNo,
    permanentaddress: DataExplore.PermanentAddress,
    localaddress: DataExplore.LocalAddress,
  };
  const fncontact = async (values, types) => {
    console.log(values);

    var saveData = "";
    var type = "";

    setLoading(true);

    saveData = {
      RecordID: DataExplore.RecordID,
      EmpRecordID: recID,
      PhoneNumber: values.phonenumber,
      Email: values.email,
      AadharCardNo: values.aadharcardnumber,
      PfNo: values.pfnumber,
      EsiNo: values.esinumber,
      PermanentAddress: values.permanentaddress,
      LocalAddress: values.localaddress,
    };
    type = "update";

    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR209", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));

      // dispatch(fetchExplorelitview("TR038", "Skills", recID, ""));
      // resetForm();

      // setSupprodata({ RecordID: "", Comments: "", SortOrder: "" });
      // selectcelldata("", "A", "");
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  const clrForm = () => {
    setSupprodata({ RecordID: "", Comments: "", SortOrder: "", Skills: "" });
    // setselectproLookupData(null);

    //   {
    //   PROlookupRecordid: "",
    //   PROlookupCode: "",
    //   PROlookupDesc: "",
    // });
    setselectLeaveconLTData(null);
    selectcelldata("", "A", "");
  };

  // search

  // const VISIBLE_FIELDS =
  // show === "1"
  //     ? ["SLNO", "ProcessCode", "Comments", "action"]
  //   //   : show === "6"
  //   // ? ["SLNO", "Description","action"]
  //   : show === "2"
  //   ? ["SLNO", "FunctionCode", "FunctionName", "action"]
  //   : ["SLNO", "DesignationCode", "DesignationName", "action"];
  let VISIBLE_FIELDS;

  if (show == "6") {
    VISIBLE_FIELDS = ["SLNO", "NextRenewalRequiredDate", "Description", "Category", "action"];
  } else if (show == "1") {
    VISIBLE_FIELDS = ["SLNO", "Skills", "Comments", "action"];
  } else if (show == "3") {
    VISIBLE_FIELDS = ["SLNO", "Manager", "action"];
  } else if (show == "2") {
    VISIBLE_FIELDS = ["SLNO", "Functions", "action"];
  } else if (show == "7") {
    VISIBLE_FIELDS = ["SLNO", "ItemNumber", "ItemName", "action"];
  } else if (show == "8") {
    VISIBLE_FIELDS = [
      "SLNO",
      //"VendorCode",
      //"VendorName",
      "Vendors",
      "BillingUnits",
      "UnitRate",
      "action",
    ];
  } else if (show == "11") {
    VISIBLE_FIELDS = [
      "SLNO",
      "VendorCode",
      "VendorName",
      "BillingUnits",
      "UnitRate",
      "action",
    ];
  } else if (show == "10") {
    VISIBLE_FIELDS = [
      "SLNO",
      "LeavePart",
      "AvailDays",
      "EligibleDays",
      "action",
    ];
  } else {
    VISIBLE_FIELDS = [
      "SLNO",
      "EmployeeCode",
      "EmployeeName",
      "DesignationCode",
      "DesignationName",
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
          <Typography>List of Skills</Typography>
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
            <IconButton onClick={() => selectcelldata("", "A", "")}>
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  //  function Attachments() {
  //   return (
  //     <GridToolbarContainer
  //       sx={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Box sx={{ display: "flex", flexDirection: "row" }}>
  //         <Typography>
  //           {show == "6" && "List of Documents"}
  //         </Typography>
  //         <Typography variant="h5">{`(${rowCount})`}</Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <GridToolbarQuickFilter />
  //         <Tooltip title="ADD">
  //           <IconButton type="reset">
  //             <AddOutlinedIcon />
  //           </IconButton>
  //         </Tooltip>
  //       </Box>
  //     </GridToolbarContainer>
  //   );
  // }

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //

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
          {/* <Typography>
            {show == "2" ? "List of Functions" : "List of Designation"}||{show=="6" && "List of Documents"}
            
          </Typography> */}
          <Typography>
            {show == "2"
              ? "List of Functions"
              : show == "6"
                ? "List of Documents"
                : show == "3"
                  ? "List of Managers"
                  : show == "7"
                    ? "Item Custody"
                    : show == "10"
                      ? "List of Configurations"
                      : show == "8" || show == "11"
                        ? "List of Contracts"
                        : "List of Managers"}
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
  const [laomode, setLaoMode] = useState("A");
  const [laoEmpRecID, setLaoEmpRecID] = useState("");

  const functionInitialValue = {
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };
  const [funMode, setFunMode] = useState("A");
  const [funEmpRecID, setFunEmpRecID] = useState("");

  const [itemCustodyData, setItemCustodyData] = useState({
    recordID: "",
    itemNO: "",
    itemName: "",
    assestID: "",
    itemValue: "",
    reference: "",
  });

  //Contractor

  const [contractorData, setContractorData] = useState({
    recordID: "",
    fromperiod: "",
    toperiod: "",
    units: "",
    unitrate: "",
    alertdate: "",
    renewalperiod: "",
    vendor: "",
    hsnCode: "",
    cgst: "",
    sgst: "",
    igst: "",
    tds: ""
  });
  const [LeaveCondata, setLeaveCondata] = useState({
    recordID: "",
    LeaveTypeID: "",
    totaldays: "",
    availableleave: "",
    elligibledays: "",
    Year: "",
  });

  const selectCellRowData = ({ rowData, mode, field }) => {
    setFunMode(mode);
    setLaoMode(mode);

    if (mode == "A") {
      setFunMgrRecID("");
      setFunEmpRecID("");
      SetFunctionLookup(null);
      SetVendorlookup(null);
      SetCustomerlookup(null);
      SetEmpLoaData({
        description: "",
        Attachment: "",
        recordID: "",
        category: "",
        RenewalDate: "",
        personal: false,
        renewal: false
      });
      setImgName("");
      setItemCustodyData({
        recordID: "",
        itemNO: "",
        itemName: "",
        assestID: "",
        itemValue: "",
        reference: "",
      });
      setselectLeaveconLTData(null);
      setContractorData({
        recordID: "",
        fromperiod: "",
        toperiod: "",
        units: "",
        unitrate: "",
        alertdate: "",
        renewalperiod: "",
        vendor: "",
        hsnCode: "",
        cgst: "",
        sgst: "",
        igst: "",
        tds: ""
      });

      setLeaveCondata({
        recordID: "",
        LeaveTypeID: "",
        totaldays: "",
        availableleave: "",
        elligibledays: "",
        Year: "",
      });
    } else {
      console.log(rowData, "--rowData");
      if (field == "action") {
        console.log(LeaveCondata, "--LeaveCondata");


        setFunEmpRecID(rowData.RecordID);
        SetFunctionLookup({
          RecordID: rowData.FunctionsID,
          Code: rowData.FunctionCode,
          Name: rowData.FunctionName,

          // funRecordID: rowData.FunctionsID,
          // funCode: rowData.FunctionCode,
          // funName: rowData.FunctionName,
        });
        SetVendorlookup({
          RecordID: rowData.Vendor,
          Code: rowData.VendorCode,
          Name: rowData.VendorName,
          // venRecordID: rowData.Vendor,
          // venCode: rowData.VendorCode,
          // venName: rowData.VendorName,
        });
        SetCustomerlookup({
          RecordID: rowData.Vendor,
          Code: rowData.VendorCode,
          Name: rowData.VendorName,
        });

        SetEmpLoaData({
          description: rowData.Description,
          recordID: rowData.RecordID,
          category: rowData.Category,
          RenewalDate: rowData.NextRenewalRequiredDate,
          personal: rowData.Personal,
          renewal: rowData.RenewalRequired,
          Attachment: rowData.Attachment
        });
        setImgName(rowData.Attachment);
        setItemCustodyData({
          recordID: rowData.RecordID,
          itemNO: rowData.ItemNumber,
          itemName: rowData.ItemName,
          assestID: rowData.ItemValue,
          itemValue: rowData.ItemValue,
          reference: rowData.ItemValue,
        });

        setContractorData({
          recordID: rowData.RecordID,
          fromperiod: rowData.FromPeriod,
          toperiod: rowData.ToPeriod,
          units: rowData.BillingUnits,
          unitrate: rowData.UnitRate,
          alertdate: rowData.NotificationAlertDate,
          renewalperiod: rowData.RenewableNotification,
          vendor: rowData.Vendor
            ? {
              RecordID: rowData.Vendor,
              Code: rowData.VendorCode,
              Name: rowData.VendorName,
            }
            : null,
          hsnCode: rowData.Hsn,
          cgst: rowData.Gst,
          sgst: rowData.Sgst,
          igst: rowData.Igst,
          tds: rowData.Tds,
        });
        console.log(contractorData, contractorData);
        setselectLeaveconLTData({
          RecordID: rowData.LeaveTypeID,
          Code: "",
          Name: rowData.LeavePart,
        });

        setLeaveCondata({
          recordID: rowData.RecordID,
          totaldays: rowData.TotalDays,
          availableleave: rowData.AvailDays,
          elligibledays: rowData.EligibleDays,
          LeaveTypeID: rowData.LeaveTypeID
            ? {
              RecordID: rowData.LeaveTypeID,
              Code: "",
              Name: rowData.LeavePart,
            }
            : null,
          Year: rowData.Year,
        });
      }
    }
  };

  const selectCellRowDataMGR = ({ rowData, mode, field }) => {
    console.log(
      "🚀 ~ file: Editmanager.jsx:178 ~ selectCellRowDataMGR ~ rowData:",
      rowData
    );

    setFunMode(mode);
    setLaoMode(mode);
    console.log(mode, "--mode");

    if (mode == "A") {
      SetDesignationLookup(null);
      setFunEmpRecID("");
      setLevelLookup({
        levelfield: "",
        hrmanager: "",
        financemanager: "",
        projectmanager: "",
        facilitymanager: "",
      })

    } else {
      console.log(rowData, "--rowData");
      if (field == "action") {
        SetDesignationLookup({
          RecordID: rowData.EmployeeID,
          DesignationID: rowData.DesignationID,
          Code: rowData.EmployeeCode,
          Name: rowData.EmployeeName,
        });
        setLevelLookup({
          levelfield: rowData.Level,
          hrmanager: rowData.HrManager == "Y" ? true : false,
          financemanager: rowData.FinanceManager == "Y" ? true : false,
          projectmanager: rowData.ProjectManager == "Y" ? true : false,
          facilitymanager: rowData.FacilityManager == "Y" ? true : false,
        });
        setFunMgrRecID(rowData.RecordID);
        console.log(LeaveCondata, "--LeaveCondata");
      }
    }
  };


  const empFunctionFn = async (values, resetForm, del) => {
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: funEmpRecID,
      EmployeeID: recID,
      FunctionsID: functionLookup ? functionLookup.RecordID : 0,
      FunctionName: functionLookup ? functionLookup.Name : "",
      // FunctionsID: functionLookup.funRecordID,
      CompanyID,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR125", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR125", "Function", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** ITEMCUSTODY SCREEN SAVE FUNCTION *************** //

  const itemcustodyInitialValue = {
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
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
      CompanyID,
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR212", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR212", "ItemCustody", `EmployeeID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  //contract initialvalue
  const ContractInitialValue = {
    Code: Data.Code,
    Name: Data.Name,
    FromPeriod: contractorData.fromperiod,
    ToPeriod: contractorData.toperiod,
    // BillingUnits: contractorData.units,
    BillingUnits:
      contractorData.units === "Hours"
        ? "HS"
        : contractorData.units === "Days"
          ? "DS"
          : contractorData.units === "Week"
            ? "WS"
            : contractorData.units === "Month"
              ? "MS"
              : "",
    Hsn: contractorData.hsnCode,
    Gst: contractorData.cgst,
    Sgst: contractorData.sgst,
    Igst: contractorData.igst,
    TDS: contractorData.tds,
    UnitRate: contractorData.unitrate,
    NotificationAlertDate: contractorData.alertdate,
    RenewableNotification: contractorData.renewalperiod,
  };
  // console.log(contractorData, "--get a contractorData");

  //Contractor Save Function
  const contractSavefn = async (values, resetForm, del) => {
    console.log(show, "--find show inside save ");

    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: contractorData.recordID,
      EmployeeID: recID,
      Vendor:
        show == "8"
          ? vendorlookup
            ? vendorlookup.RecordID
            : 0
          : show == "11"
            ? customerlookup
              ? customerlookup.RecordID
              : 0
            : 0,
      VendorName:
        show == "8"
          ? vendorlookup
            ? vendorlookup.Name
            : 0
          : show == "11"
            ? customerlookup
              ? customerlookup.Name
              : 0
            : 0,
      Hsn: values.Hsn,
      Gst: values.Gst,
      Sgst: values.Sgst,
      Igst: values.Igst,
      Tds: values.TDS,
      // Vendors: show == "8" ? "Y" : "N",
      // Customer: show == "11" ? "Y" : "N",
      FromPeriod: values.FromPeriod,
      ToPeriod: values.ToPeriod,
      BillingUnits: values.BillingUnits,
      UnitRate: values.UnitRate,
      NotificationAlertDate: values.NotificationAlertDate,
      RenewableNotification: values.RenewableNotification,
    };

    const response = await dispatch(
      explorePostData({ accessID: "TR244", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      show == "8"
        ? dispatch(
          fetchExplorelitview(
            "TR244",
            "Contracts In",
            `EmployeeID='${recID}' AND Vendors='Y'`,
            ""
          )
        )
        : dispatch(
          fetchExplorelitview(
            "TR244",
            "Contracts Out",
            `EmployeeID='${recID}' AND Customer='Y'`,
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

  console.log(gelocData, "--geo");

  //Geolocation
  const geolocationinitialvlues = {
    Code: Data.Code,
    Name: Data.Name,
    longitude: gelocData.EMP_LONGITUDE,
    latitude: gelocData.EMP_LATITUDE,
    radius: gelocData.EMP_RADIUS,
  };
  const geolocSavefn = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      EmployeeID: recID,
      Longtitude: values.longitude,
      Lattitude: values.latitude,
      radius: values.radius,
    };
    console.log(idata, "--idata");

    const response = await dispatch(geolocUpdate(idata));
    if (response.payload.Status == "Y") {
      setLoading(false);

      // dispatch(
      //   fetchExplorelitview("TR244", "Contractor", `EmployeeID='${recID}'`, "")
      // );
      toast.success(response.payload.Msg);
      // selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  //Leave Configuration
  const LCInitialValue = {
    Code: Data.Code,
    Name: Data.Name,
    LeaveTypeID: LeaveCondata.LeaveTypeID,
    LeavePart: "N",
    totaldays: LeaveCondata.totaldays,
    availableleave: LeaveCondata.availableleave,
    elligibledays: LeaveCondata.elligibledays,
    Year:
      LeaveCondata.Year === "2024"
        ? "2024"
        : LeaveCondata.Year === "2025"
          ? "2025"
          : LeaveCondata.Year === "2026"
            ? "2026"
            : "",
  };
  // const [funMgrRecID, setFunMgrRecID] = useState("");
  const currentYear = new Date().getFullYear();


  const LCsaveFn = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: LeaveCondata.recordID,
      CompanyID,
      Year: values.Year,
      EmployeeID: recID,
      LeaveTypeID: LeaveconLTData ? LeaveconLTData.RecordID : 0,
      LeaveTypeName: LeaveconLTData ? LeaveconLTData.Name : "",
      TotalDays: Number(values.totaldays),
      AvailDays: Number(values.availableleave),
      EligibleDays: Number(values.totaldays) - Number(values.availableleave),
      LeavePart: "N",
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR249", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      await dispatch(
        fetchExplorelitview(
          "TR249",
          "Leave Configuration",
          `EmployeeID='${recID}'`,
          ""
        )
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm()
    } else {
      toast.error(response.payload.Msg);
    }
  };

  // *************** EMPLOYEE-FUNCTION SCREEN SAVE FUNCTION *************** //
  const [levellookup, setLevelLookup] = useState({
    levelfield: "",
    hrmanager: "",
    financemanager: "",
    projectmanager: "",
    facilitymanager: "",
  });
  const managerInitialValue = {
    code: Data.Code,
    description: Data.Name,

    Horizontal: Data.Horizontal === "Y" ? true : false,
    Vertical: Data.Vertical === "Y" ? true : false,
    HorizontalMimNo: Data.HorizontalMimNo,

    VerticalMimNo: Data.VerticalMimNo,

    AutoApprovalYesOrNo: Data.AutoApprovalYesOrNo === "Y" ? true : false,
    ApprovelTolerance: Data.ApprovelTolerance,
    AutoRejectionYesOrNo: Data.AutoRejectionYesOrNo === "Y" ? true : false,
    RejectionTolerance: Data.RejectionTolerance,

    Level: levellookup.levelfield,
    //level get
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    hrmanager: levellookup.hrmanager,
    financemanager: levellookup.financemanager,
    projectmanager: levellookup.projectmanager,
    facilitymanager: levellookup.facilitymanager,
    //   hrmanager: Data.HrManager === "Y",
    // financemanager: Data.FinanceManager === "Y",
    // projectmanager: Data.ProjectManager === "Y",
    // facilitymanager: Data.FacilityManager === "Y",
    //  hrmanager: checkboxvalues.hrmanager === "Y" ? true : false,
    //   financemanager: checkboxvalues.financemanager === "Y" ? true : false,

    //   projectmanager: checkboxvalues.projectmanager === "Y" ? true : false,

    //   facilitymanager: checkboxvalues.facilitymanager === "Y" ? true : false,
  };
  console.log(Data.VerticalMimNo, "VerticalMimNo");
  const [funMgrRecID, setFunMgrRecID] = useState("");

  const mgrFunctionFn = async (values, resetForm, del, setFieldValue) => {

    // if (!designationLookup || !designationLookup.DesignationID) {
    //   toast.error("Please select a Manager.");
    //   return;
    // }
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: funMgrRecID,
      EmployeeID: recID,
      DesignationID: designationLookup.DesignationID || 0,
      ManagerID: designationLookup.RecordID || 0,
      ManagerName: designationLookup.Name || "",
      CompanyID,
      Level: values.Level,
      HrManager: values.hrmanager == true ? "Y" : "N",
      FinanceManager: values.financemanager == true ? "Y" : "N",
      ProjectManager: values.projectmanager == true ? "Y" : "N",
      FacilityManager: values.facilitymanager == true ? "Y" : "N",
      // Level: level,

    };
    console.log(values.Level, "values.Level");
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR126", action, idata })
    );
    if (response.payload.Status == "Y") {
      dispatch(
        fetchExplorelitview("TR126", "Manager", `parentID=${recID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowDataMGR({
        rowData: {},
        mode: "A",
        field: "",
        setFieldValue,
      });
      resetForm();
      //     setFieldValue("hrmanager", false);
      // setFieldValue("financemanager", false);
      // setFieldValue("projectmanager", false);
      // setFieldValue("facilitymanager", false);
      // ✅ Reset state & clear form mode
    } else {
      toast.error(response.payload.Msg);
    }
  };
  // const [level, setLevel] = useState('2');

  const deploymentInitialValue = {
    code: Data.Code,
    description: Data.Name,
    Designation: deploymentData.DesignationID
      ? {
        RecordID: deploymentData.DesignationID,
        Code: deploymentData.DesignationCode,
        Name: deploymentData.DesignationName,
      }
      : null,
    location: deploymentData.LocationID
      ? {
        RecordID: deploymentData.LocationID,
        Code: deploymentData.LocationCode,
        Name: deploymentData.LocationName,
      }
      : null,
    gate: deploymentData.StoregatemasterID
      ? {
        RecordID: deploymentData.StoregatemasterID,
        Code: deploymentData.StoregatemasterCode,
        Name: deploymentData.StoregatemasterName,
      }
      : null,
    project: deploymentData.DefaultProject
      ? {
        RecordID: deploymentData.DefaultProject,
        Code: deploymentData.ProjectCode,
        Name: deploymentData.ProjectName,
      }
      : null,
    function: deploymentData.DefaultFunction
      ? {
        RecordID: deploymentData.DefaultFunction,
        Code: deploymentData.FunctionCode,
        Name: deploymentData.FunctionName,
      }
      : null,
    shift: deploymentData.ShiftID
      ? {
        RecordID: deploymentData.ShiftID,
        Code: deploymentData.ShiftCode,
        Name: deploymentData.ShiftName,
      }
      : null,
    checkin: deploymentData.ShiftStartTime || "",
    checkout: deploymentData.ShiftEndTime || "",
    // monday: deploymentData.Monday === "Y" ? true : false,
    // tuesday: deploymentData.Tuesday === "Y" ? true : false,
    // wednesday: deploymentData.Wednesday === "Y" ? true : false,
    // thursday: deploymentData.Thursday === "Y" ? true : false,
    // friday: deploymentData.Friday === "Y" ? true : false,
    // saturday: deploymentData.Saturday === "Y" ? true : false,
    // sunday: deploymentData.Sunday === "Y" ? true : false,
    Monday: deploymentData.MondayShift === "Y" ? true : false,
    Tuesday: deploymentData.TuesdayShift === "Y" ? true : false,
    Wednesday: deploymentData.WednesdayShift === "Y" ? true : false,
    Thursday: deploymentData.ThursdayShift === "Y" ? true : false,
    Friday: deploymentData.FridayShift === "Y" ? true : false,
    Saturday: deploymentData.SaturdayShift === "Y" ? true : false,
    Sunday: deploymentData.SundayShift === "Y" ? true : false,
    // biometric: deploymentData.Biometric === "Y"? true : false,
    // mobile: deploymentData.MobileGeofencing === "Y" ? true : false,
    biometric: deploymentData.BioMetric === "Y" ? true : false,
    mobile: deploymentData.MobileGeoFencing === "Y" ? true : false,
    managermanual: deploymentData.ManagerManual === "Y" ? true : false,
    cloud: deploymentData.CloudApplication === "Y" ? true : false,
    Horizontal: true,
    Vertical: deploymentData.Vertical === "Y" ? true : false,
    HorizontalMimNo: deploymentData.HorizontalMimNo || 1,
    VerticalMimNo: deploymentData.VerticalMimNo || 3,
    AutoApprovalYesOrNo: deploymentData.AutoApprovalYesOrNo === "Y" ? true : false,
    ApprovelTolerance: deploymentData.ApprovelTolerance,
    AutoRejectionYesOrNo: deploymentData.AutoRejectionYesOrNo === "Y" ? true : false,
    RejectionTolerance: deploymentData.RejectionTolerance,

    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };
  console.log(deploymentInitialValue);
  const Fndeployment = async (values, resetForm, del) => {
    console.log(values, "--values");

    const idata = {
      HeaderID: recID,
      CheckInTime: values.shift?.ShiftStartTime || "",
      CheckOutTime: values.shift?.ShiftendTime || "",
      // CheckInTime: values.checkin || "",
      // CheckOutTime: values.checkout || "",
      Monday: values.Monday === true ? "Y" : "N",
      Tuesday: values.Tuesday === true ? "Y" : "N",
      Wednesday: values.Wednesday === true ? "Y" : "N",
      Thursday: values.Thursday === true ? "Y" : "N",
      Friday: values.Friday === true ? "Y" : "N",
      Saturday: values.Saturday === true ? "Y" : "N",
      Sunday: values.Sunday === true ? "Y" : "N",
      BioMetric: values.biometric === true ? "Y" : "N",
      ManagerManual: values.managermanual === true ? "Y" : "N",
      CloudApplication: values.cloud === true ? "Y" : "N",
      MobileGeoFencing: values.mobile === true ? "Y" : "N",
      // Monday: values.monday === true ? "Y" : "N",
      // Tuesday: values.tuesday === true ? "Y" : "N",
      // Wednesday: values.wednesday === true ? "Y" : "N",
      // Thursday: values.thursday === true ? "Y" : "N",
      // Friday: values.friday === true ? "Y" : "N",
      // Saturday: values.saturday === true ? "Y" : "N",
      // Sunday: values.sunday === true ? "Y" : "N",
      DesignationID: values.Designation.RecordID || 0,
      DesignationName: values.Designation.Name || "",
      LocationID: values.location.RecordID || 0,
      LocationName: values.location.Name || "",
      StoregatemasterID: values.gate.RecordID || 0,
      StoregatemasterName: values.gate.Name || "",
      DefaultProject: values.project.RecordID || 0,
      ProjectCode: values.project.Code || "",
      ProjectName: values.project.Name || "",
      DefaultFunction: values.function.RecordID || 0,
      FunctionCode: values.function.Code || "",
      FunctionName: values.function.Name || "",
      ShiftID: values.shift.RecordID || 0,
      ShiftCode: values.shift.Code || "",
      ShiftName: values.shift.Name || "",
      // Horizontal: values.horizontal === true ? "Y" : "N",
      // Vertical: values.vertical === true ? "Y" : "N",
      // HorizontalMimNo: values.Horizontalmin || 0,
      // VerticalMimNo: values.Verticalmin || 0,
      // DesignationID: designLookup ? designLookup.RecordID : 0,
      // LocationID: locationLookup ? locationLookup.RecordID : 0,
      // StoregatemasterID: gateLookup ? gateLookup.RecordID : 0,
      CompanyID,
      Horizontal: deploymentData.Horizontal,
      Vertical: deploymentData.Vertical,
      HorizontalMimNo: deploymentData.HorizontalMimNo || 0,
      VerticalMimNo: deploymentData.VerticalMimNo || 0,
      AutoApprovalYesOrNo: deploymentData.AutoApprovalYesOrNo,
      ApprovelTolerance: deploymentData.ApprovelTolerance || 0,
      AutoRejectionYesOrNo: deploymentData.AutoRejectionYesOrNo,
      RejectionTolerance: deploymentData.RejectionTolerance || 0,
    };

    // console.log(locationLookup.locationRecordID, "????????");
    const response = await dispatch(postDeployment({ data: idata }));
    // return;
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
    } else {
      toast.error(response.payload.Msg);
    }
  };

  //Approvals
  const FndeploymentApprovals = async (values, resetForm, del) => {
    console.log(values, "--values");

    const idata = {
      HeaderID: recID,
      CheckInTime: deploymentData.ShiftStartTime || "",
      CheckOutTime: deploymentData.ShiftEndTime || "",
      // CheckInTime: values.checkin || "",
      // CheckOutTime: values.checkout || "",
      Monday: deploymentData.MondayShift === "Y" ? true : false,
      Tuesday: deploymentData.TuesdayShift === "Y" ? true : false,
      Wednesday: deploymentData.WednesdayShift === "Y" ? true : false,
      Thursday: deploymentData.ThursdayShift === "Y" ? true : false,
      Friday: deploymentData.FridayShift === "Y" ? true : false,
      Saturday: deploymentData.SaturdayShift === "Y" ? true : false,
      Sunday: deploymentData.SundayShift === "Y" ? true : false,
      // Monday: values.monday === true ? "Y" : "N",
      // Tuesday: values.tuesday === true ? "Y" : "N",
      // Wednesday: values.wednesday === true ? "Y" : "N",
      // Thursday: values.thursday === true ? "Y" : "N",
      // Friday: values.friday === true ? "Y" : "N",
      // Saturday: values.saturday === true ? "Y" : "N",
      // Sunday: values.sunday === true ? "Y" : "N",
      DesignationID: deploymentData.DesignationID || 0,
      LocationID: deploymentData.LocationID || 0,
      StoregatemasterID: deploymentData.StoregatemasterID || 0,
      DefaultProject: deploymentData.DefaultProject || 0,
      ProjectCode: deploymentData.ProjectCode || "",
      ProjectName: deploymentData.ProjectName || "",
      DefaultFunction: deploymentData.DefaultFunction,
      FunctionCode: deploymentData.FunctionCode || "",
      FunctionName: deploymentData.FunctionName || "",
      ShiftID: deploymentData.ShiftID || 0,
      ShiftCode: deploymentData.ShiftCode || "",
      ShiftName: deploymentData.ShiftName || "",

      // Horizontal: values.horizontal === true ? "Y" : "N",
      // Vertical: values.vertical === true ? "Y" : "N",
      // HorizontalMimNo: values.Horizontalmin || 0,
      // VerticalMimNo: values.Verticalmin || 0,
      // DesignationID: designLookup ? designLookup.RecordID : 0,
      // LocationID: locationLookup ? locationLookup.RecordID : 0,
      // StoregatemasterID: gateLookup ? gateLookup.RecordID : 0,
      CompanyID,
      Horizontal: values.Horizontal === true ? "Y" : "N",
      Vertical: values.Vertical === true ? "Y" : "N",
      HorizontalMimNo: values.HorizontalMimNo,
      VerticalMimNo: values.VerticalMimNo,
      AutoApprovalYesOrNo: values.AutoApprovalYesOrNo === true ? "Y" : "N",
      ApprovelTolerance: values.ApprovelTolerance,
      AutoRejectionYesOrNo: values.AutoRejectionYesOrNo === true ? "Y" : "N",
      RejectionTolerance: values.RejectionTolerance,
      BioMetric: "N",
      MobileGeoFencing: "N",
      CloudApplication: "N",
      ManagerManual: "N"
    };

    // console.log(locationLookup.locationRecordID, "????????");
    const response = await dispatch(postDeployment({ data: idata }));
    // return;
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  /*************LOA************* */
  const [empLoaData, SetEmpLoaData] = useState({
    recordID: "",
    description: "",
    category: "",
    RenewalDate: "",
    personal: false,
    renewal: false,
    Attachment:""
  });
  const [bonotifyMode, setnotifyBomode] = useState("6");
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [ImageName, setImgName] = useState("");

  const AttachmentInitialValues = {
    code: Data.Code,
    description: Data.Name,
    LoaDescription: empLoaData.description,
    personal: empLoaData.personal === "Y" ? true : false,
    renewal: empLoaData.renewal === "Y" ? true : false,
    // category: Data.Category,
    category:
      empLoaData.category == "Education"
        ? "EC"
        : empLoaData.category == "Insurance "
          ? "IS"
          : empLoaData.category == "Award "
            ? "AD"
            : empLoaData.category == "Certificate "
              ? "CT"
              : empLoaData.category == "Warranty "
                ? "WT"
                : empLoaData.category == "Others "
                  ? "OS"
                  : "",
    RenewalDate: empLoaData.RenewalDate || "",
    Sortorder: "",
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
      RecordID: empLoaData.recordID,
      EmployeeID: recID,
      Description: values.LoaDescription,
      //  ImageName: ImageName ? ImageName:Data.ImageName,
      Attachment: ImageName ? ImageName : Data.ImageName,
      Personal: values.personal === true ? "Y" : "N",
      RenewalRequired: values.renewal === true ? "Y" : "N",
      Category: values.category,
      NextRenewalRequiredDate: values.RenewalDate,
      Sortorder: 0,
      CompanyID,
    };

    console.log("save" + JSON.stringify(idata));

    const response = await dispatch(
      explorePostData({ accessID: "TR210", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview(
          "TR210",
          "List of Documents",
          `EmployeeID=${recID}`,
          ""
        )
      );
      resetForm();
      // SetEmpLoaData({
      //   RecordID: "",
      //   LoaDescription: "",
      //   Attachment: "",
      //   Sortorder:"0"
      // });
      setUploadFile("");
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(fnFileUpload(formData));

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };
  const fnViewFile = () => {
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile;

    if (uploadFile == "" || uploadFile == undefined) {
      toast.error("Please Upload File");
      return;
    } else {
      window.open(filePath, "_blank");
    }
  };
  const getFileChange = async (event) => {
    setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(imageUpload({ formData }));
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
        {/* <Box
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
        <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{color:'#0000D1'}}/>}>
        <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={()=> {setScreen(0)}}>Employee</Typography>
{show == "5" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Contact</Typography>):false}
{show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Skills</Typography>):false}
{show == "2" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Functions</Typography>):false}
{show == "3" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Managers</Typography>):false}
{show == "4" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Deployment</Typography>):false}
{show == "6" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >List of Documents</Typography>):false} 
 {show == "7" ? (<Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  >Item Custody</Typography>):false}

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
                  <MenuItem value={0}>Employee</MenuItem>
                  <MenuItem value={5}>Contact</MenuItem>
                  <MenuItem value={1}>Skills</MenuItem>
                  <MenuItem value={2}>Functions</MenuItem>
                  <MenuItem value={3}>Managers</MenuItem>
                  <MenuItem value={4}>Deployment</MenuItem>
                   <MenuItem value={6}>List of Documents</MenuItem> 
                  <MenuItem value={7}>Item Custody</MenuItem>

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
                    {mode === "E"
                      ? `Employee(${state.EmpName})`
                      : "Employee(New)"}
                  </Typography>
                  {show == "5" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Contact
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "1" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Skills
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
                      Functions
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
                      Managers
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
                      Deployment
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
                      List of Documents
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
                      Item Custody
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
                      Contracts In
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
                      Contracts Out
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
                      Geo Location
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
                      Leave Configuration
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
                    <MenuItem value={5}>Contact</MenuItem>
                    {initialValues.employeetype === "CI" ? (
                      <MenuItem value={8}>Contracts In</MenuItem>
                    ) : null}
                    {initialValues.employeetype === "CO" ? (
                      <MenuItem value={11}>Contracts Out</MenuItem>
                    ) : null}
                    <MenuItem value={1}>Skills</MenuItem>
                    <MenuItem value={12}>Approvals</MenuItem>
                    <MenuItem value={2}>Functions</MenuItem>
                    <MenuItem value={3}>Managers</MenuItem>
                    <MenuItem value={4}>Deployment</MenuItem>
                    <MenuItem value={9}>Geo Location</MenuItem>
                    <MenuItem value={10}>Leave Configuration</MenuItem>
                    <MenuItem value={6}>List of Documents</MenuItem>
                    <MenuItem value={7}>Item Custody</MenuItem>
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
                      {CompanyAutoCode =="Y"?(
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
                        placeholder="Auto"
                        // error={!!touched.Code && !!errors.Code}
                        // helperText={touched.Code && errors.Code}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        // required
                        // autoFocus
                        inputProps={{ maxLength: 8 }}
                        InputProps={{ readOnly: true }}
                      />
                    ):(
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
                      />)}
                      

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
              initialValues={contactInitialvalues}
              enableReinitialize={true}
              validationSchema={contactvalidationSchema}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  fncontact(values, resetForm, false);
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
                        id="Code"
                        name="Code"
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
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

                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="phonenumber"
                      name="phonenumber"
                      value={values.phonenumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Phone No"
                      focused
                      error={touched.phonenumber && Boolean(errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
                      onWheel={(e) => e.target.blur()}
                      sx={
                        {
                          //gridColumn: "span 2", background: "#fff6c3"
                        }
                      }
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase().trim();
                        handleChange({
                          target: { name: 'email', value }
                        });
                      }}

                      label="Email Id"
                      focused
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        //gridColumn: "span 2",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="aadharcardnumber"
                      name="aadharcardnumber"
                      value={values.aadharcardnumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Aadhar Card No"
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={touched.aadharcardnumber && Boolean(errors.aadharcardnumber)}
                      helperText={touched.aadharcardnumber && errors.aadharcardnumber}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="pfnumber"
                      name="pfnumber"
                      value={values.pfnumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="PF No"
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={touched.pfnumber && Boolean(errors.pfnumber)}
                      helperText={touched.pfnumber && errors.pfnumber}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      inputMode="numeric"
                      id="esinumber"
                      name="esinumber"
                      value={values.esinumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="ESI No"
                      focused
                      onWheel={(e) => e.target.blur()}
                      error={touched.esinumber && Boolean(errors.esinumber)}
                      helperText={touched.esinumber && errors.esinumber}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="permanentaddress"
                      name="permanentaddress"
                      multiline
                      value={values.permanentaddress}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Permanent Address"
                      focused
                      sx={{
                        // gridColumn: "span 2",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="localaddress"
                      name="localaddress"
                      multiline
                      value={values.localaddress}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Local Address"
                      focused
                      sx={{
                        //gridColumn: "span 2",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="10px"
                    padding={1}
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
                    {/* ) : ( */}
                    {/* <Button
                        color="secondary"
                        variant="contained"
                        disabled={true}
                      >
                        Save
                      </Button> */}
                    {/* )} */}
                    {YearFlag == "true" ? (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          fnSave(values, "harddelete");
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
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
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "12" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={deploymentInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  FndeploymentApprovals(values, resetForm, false);
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
                setFieldValue,
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
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
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                  </Box>
                  {/* <Box display="flex" flexDirection="column" gap={2}> */}
                  {/* Row 1: Horizontal */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="Horizontal"
                        name="Horizontal"
                        // onChange={handleChange}
                        disabled
                        // onBlur={handleBlur}
                        as={Checkbox}
                        label="Horizontal"
                      />
                      <FormLabel focused={false}>Horizontal</FormLabel>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="HorizontalMimNo"
                        name="HorizontalMimNo"
                        value={values.HorizontalMimNo}
                        // inputProps={{readOnly:true}}
                        onBlur={handleBlur}
                        // onChange={handleChange}

                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[012345]?$/.test(val)) {
                            handleChange(e); // only allow '', '1', '2', or '3'
                          }
                        }}
                        label="Minimum managers to approve (0 for all managers)"
                        // label="No of levels to approve"
                        sx={{
                          width: "400px",
                          marginLeft: "30px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        // InputProps={{
                        //   inputProps: {
                        //     style: { textAlign: "right" },
                        //   },
                        // }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            min: 0,
                            max: 5,
                          },
                        }}

                        onKeyDown={(e) => {
                          const allowedKeys = ["0", "1", "2", "3", "4", "5", "Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                          if (!allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>

                    {/* Row 2: Vertical */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="Vertical"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="Vertical"
                        as={Checkbox}
                        label="Vertical"
                      />
                      <FormLabel focused={false}>Vertical</FormLabel>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="VerticalMimNo"
                        name="VerticalMimNo"
                        value={values.VerticalMimNo}
                        onBlur={handleBlur}


                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[123]?$/.test(val)) {
                            handleChange(e); // only allow '', '1', '2', or '3'
                          }
                        }}
                        label="No of levels to approve(minimum level of 3)"
                        // label="Minimum managers to approve (0 for all managers)"
                        sx={{
                          width: "400px",
                          marginLeft: "47px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        // InputProps={{
                        //   inputProps: {
                        //     style: { textAlign: "right" },
                        //   },
                        // }}

                        InputProps={{
                          inputProps: {
                            readOnly: values.Vertical ? false : true,
                            style: { textAlign: "right" },
                            min: 1,
                            max: 3,
                          },
                        }}
                        onKeyDown={(e) => {
                          const allowedKeys = ["1", "2", "3", "Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                          if (!allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column" marginTop={1} gap={2}>
                    {/* First AutoApprovalYesOrNo Checkbox */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="AutoApprovalYesOrNo"
                        name="AutoApprovalYesOrNo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                      />
                      <FormLabel focused={false}>Auto Approval</FormLabel>

                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="ApprovelTolerance"
                        name="ApprovelTolerance"
                        value={values.ApprovelTolerance}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        //                        onChange={(e) => {
                        //   const val = e.target.value;
                        //   if (/^[123]?$/.test(val)) {
                        //     handleChange(e); // only allow '', '1', '2', or '3'
                        //   }
                        // }}
                        label="Tolerance days"
                        sx={{
                          width: "400px",
                          marginLeft: "10px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        // InputProps={{
                        //   inputProps: {
                        //     style: { textAlign: "right" },
                        //   },
                        // }}

                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            min: 1,
                            max: 3,
                          },
                        }}
                        onKeyDown={(e) => {
                          const allowedKeys = ["1", "2", "3", "Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                          if (!allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>

                    {/* Second AutoRejectionYesOrNo Checkbox */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="AutoRejectionYesOrNo"
                        name="AutoRejectionYesOrNo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                      />
                      <FormLabel focused={false}>Auto Rejection</FormLabel>

                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="RejectionTolerance"
                        name="RejectionTolerance"
                        value={values.RejectionTolerance}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Tolerance days"
                        sx={{
                          width: "400px",
                          marginLeft: "10px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      /></Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="30px"
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
                        onClick={() => {
                          fnSave(values, "harddelete");
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
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
                  </Box>

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
                      filterName={"parentID"}
                      // filterValue={locationLookup.locationRecordID}
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
                      filterName={"parentID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  {/* <Popup
                    title="CheckIn"
                    openPopup={openCHECKINPopup}
                    setOpenPopup={setOpenCHECKINPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="CheckIn"
                      childToParent={childToParent}
                    />
                  </Popup> */}
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
              initialValues={initialValues}
              enableReinitialize={ini}
              validationSchema={basicSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
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
                          sx={{ width: "200px", height: "150px" }}
                        />
                      </Stack>
                    )}
                    {/* <Stack
                      sx={{
                        gap: formGap,
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
                    </Stack> */}
                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        inputProps={{ maxLength: 8 }}
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          // gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused

                      //  error={!!touched.Desc && !!errors.Desc}
                      //  helperText={touched.Desc && errors.Desc}
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
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />

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
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          onCellClick={(params) => {
                            const currentRow = params.row;
                            const currentcellField = params.field;
                            selectcelldata(currentRow, "E", currentcellField);
                            console.log(JSON.stringify(params));
                          }}
                          components={{
                            Toolbar: Custombar,
                          }}
                          onStateChange={(stateParams) =>
                            setRowCount(stateParams.pagination.rowCount)
                          }
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
                    </FormControl>
                    <FormControl
                      sx={{
                        //mt: "15px",
                        gap: formGap,
                        marginTop: "20px",
                      }}
                    >
                      <Formik
                        initialValues={supprocessInitialvalues}
                        enableReinitialize={iniProcess}
                        validationSchema={basicSchema}
                        onSubmit={async (values) => {
                          alert("submit", values); // <--- this is being triggered!
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
                              sx={{
                                //gridColumn: "span 2",
                                gap: formGap,
                              }}
                              style={{ width: "100%" }}
                            >
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

                              <FormControl
                                sx={{
                                  //gridColumn: "span 2",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  fullWidth
                                  variant="standard"
                                  type="text"
                                  value={values.Skills}
                                  id="Skills"
                                  name="Skills"
                                  label="Skills"
                                  required
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={!!touched.Skills && !!errors.Skills}
                                  helperText={touched.Skills && errors.Skills}
                                  sx={{
                                    //gridColumn: "span 2",
                                    backgroundColor: "#ffffff", // Set the background to white
                                    "& .MuiFilledInput-root": {
                                      backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                                    },
                                  }}
                                  focused
                                  multiline
                                  inputProps={{ maxLength: 90 }}
                                />

                              </FormControl>

                              <TextField
                                fullWidth
                                variant="standard"
                                type="text"
                                value={values.Comments}
                                id="Comments"
                                name="Comments"
                                label="Comments"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.Comments && !!errors.Comments}
                                helperText={touched.Comments && errors.Comments}
                                sx={{
                                  //gridColumn: "span 2",
                                  backgroundColor: "#ffffff", // Set the background to white
                                  "& .MuiFilledInput-root": {
                                    backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                                  },
                                }}
                                focused
                                multiline
                                inputProps={{ maxLength: 90 }}
                              />

                              <TextField
                                fullWidth
                                variant="standard"
                                type="number"
                                label="Sort Order"
                                id="SortOrder"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.SortOrder}
                                name="SortOrder"
                                error={
                                  !!touched.SortOrder && !!errors.SortOrder
                                }
                                helperText={
                                  touched.SortOrder && errors.SortOrder
                                }
                                // sx={{ gridColumn: "span 2" }}
                                focused
                                onWheel={(e) => e.target.blur()}
                                InputProps={{
                                  inputProps: {
                                    style: {
                                      textAlign: "right",
                                      //background: "#fff6c3",
                                    },
                                  },
                                }}
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 8);
                                }}
                              />
                              {/* <FormControlLabel  control={ <Field type="checkbox" name="checkbox" id="checkbox"  label="Disable" />} label="Disable" /> */}
                            </FormControl>

                            <Box
                              display="flex"
                              justifyContent="end"
                              padding={1}
                              gap={2}
                              mt={30}
                            >
                              {/* {YearFlag == "true" ? ( */}
                              <LoadingButton
                                color="secondary"
                                variant="contained"
                                // type="submit"
                                // loading={loading}
                                onClick={() => {
                                  fnProcess(values, resetForm, "");
                                  //navigate("")
                                }}
                              >
                                Save
                              </LoadingButton>
                              {/* ) : ( */}
                              {/* <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Save
                                </Button> */}
                              {/* )} */}
                              {YearFlag == "true" ? (
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    fnProcess(values, resetForm, "harddelete");
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
                            <Popup
                              title="Process"
                              openPopup={openPROPopup}
                              setOpenPopup={setOpenPROPopup}
                            >
                              <Listviewpopup
                                accessID="2001"
                                screenName="Process"
                                childToParent={childToParent}
                                filterName={"parentID"}
                                filterValue={CompanyID}
                              />
                            </Popup>
                          </form>
                        )}
                      </Formik>
                    </FormControl>
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
              initialValues={functionInitialValue}
              enableReinitialize={true}

              // onSubmit={(values, { resetForm }) => {
              //   setTimeout(() => {
              //     empFunctionFn(values, resetForm, false);
              //   }, 100);
              // }}
              onSubmit={(values, { resetForm }) => {
                if (!functionLookup || !functionLookup.RecordID) {
                  toast.error("Function is required");
                  return;
                }

                setTimeout(() => {
                  empFunctionFn(values, resetForm, false);
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
                        label="Name"
                        focused
                        inputProps={{ readOnly: true }}
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

                    {/* <Box sx={{ gridColumn: "span 2" }}> */}
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
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
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
                      {/* </Box> */}
                    </Box>
                    <FormControl sx={{ gap: formGap, marginTop: "30px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Productautocomplete
                          name="function"
                          label="function"
                          variant="outlined"
                          id="function"
                          value={functionLookup}
                          // value={values.function}
                          onChange={(newValue) => {
                            // setFieldValue("function", newValue);
                            console.log(newValue, "--newvalue function");

                            console.log(newValue.RecordID, "function RecordID");

                            SetFunctionLookup({
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                            });
                          }}
                          //  onChange={handleSelectionFunctionname}
                          // defaultValue={selectedFunctionName}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2048","ScreenName":"Functions","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                        />
                        {/* <TextField
                          id="function"
                          label="Function"
                          variant="standard"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={functionLookup.funCode}
                        />
                        <IconButton
                          onClick={() => handleShow("FUN")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="dies"
                          variant="standard"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={functionLookup.funName}
                        /> */}
                      </Box>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    style={{ marginTop: "-45px" }}
                    padding={1}
                    gap={2}
                  >
                    {/* {YearFlag == "true" ? (
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
                    )} */}
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}

                    >
                      Save
                    </LoadingButton>

                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => empFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )} */}

                    <Button
                      onClick={() => {
                        if (funMode !== "E") {
                          toast.warning("Select a function to delete.");
                          return;
                        }
                        empFunctionFn(values, resetForm, true);
                      }}
                      color="error"
                      variant="contained"
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
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                      filterName={"CompanyID"}
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

        {show == "3" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>

            {/* <Formik
              initialValues={managerInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm, setFieldValue }) => {
                setTimeout(() => {
                  mgrFunctionFn(values, resetForm, false, setFieldValue);
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
                setFieldValue,
              }) => (
                <form
                  //onSubmit={handleSubmit}

                  onReset={() => {
                    selectCellRowDataMGR({
                      rowData: {},
                      mode: "A",
                      field: "",
                      setFieldValue,
                    });
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
                          selectCellRowDataMGR({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                            setFieldValue,
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

                    <FormControl sx={{ gap: formGap, marginTop: "30px" }}>


                      <TextField
                        select
                        fullWidth
                        type="text"
                        variant="standard"
                        label={<span>Level</span>}
                        value={values.Level}
                        id="Level"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Level"
                        required
                        focused
                      >
                        {Data.VerticalMimNo >= 1 && <MenuItem value="1">Level 1</MenuItem>}
                        {Data.VerticalMimNo >= 2 && <MenuItem value="2">Level 2</MenuItem>}
                        {Data.VerticalMimNo >= 3 && <MenuItem value="3">Level 3</MenuItem>}
                      </TextField>


                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                       


                        <ProductautocompleteLevel
                          name="manager"
                          label="Manager"
                          variant="outlined"
                          id="manager"
                          value={designationLookup}
                          onChange={(newValue) => {
                            SetDesignationLookup({
                              DesignationID: newValue.DesignationID,
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                            });
                          }}
                          url={`${baseApiUrl}ManagerLevelController.php`}
                          payload={{
                            EmployeeID: recID,
                            Level: values.Level || 1,
                            CompanyID: CompanyID
                            // You can make this dynamic if needed
                          }}
                          required
                        />
                      </Box>

                     
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="hrmanager"
                              checked={values.hrmanager}
                              id="hrmanager"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="HR Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="financemanager"
                              id="financemanager"
                              checked={values.financemanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Finance Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="projectmanager"
                              id="projectmanager"
                              checked={values.projectmanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Project Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="facilitymanager"
                              id="facilitymanager"
                              checked={values.facilitymanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Facility Manager"
                        />
                      </Box>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    style={{ marginTop: "-32px" }}
                    padding={1}
                    gap={2}
                  >
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        // type="submit"
                        onClick={mgrFunctionFn}
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
                        onClick={() =>
                          mgrFunctionFn(values, resetForm, true, setFieldValue)
                        }
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
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
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                      filterName={"CompanyID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  <Popup
                    title="Designations"
                    openPopup={openDesPopup}
                    setOpenPopup={setOpenDesPopup}
                  >
                    <Listviewpopup
                      accessID="2049"
                      screenName="Designations"
                      childToParent={childToParent}
                      // filterName={"ERank"}
                      // filterValue={Data.Rank}
                      filterName={"parentID"}
                      filterValue={`${CompanyID}' AND EmployeeID='${recID}`}
                    />
                  </Popup>
                </form>
              )}
            </Formik> */}
            <Formik
              initialValues={managerInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm, setFieldValue }) => {
                setTimeout(() => {
                  mgrFunctionFn(values, resetForm, false, setFieldValue);
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
                setFieldValue,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  onReset={() => {
                    selectCellRowDataMGR({
                      rowData: {},
                      mode: "A",
                      field: "",
                      setFieldValue,
                    });
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

                    {/* <Box sx={{ gridColumn: "span 2" }}> */}
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
                          selectCellRowDataMGR({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                            setFieldValue,
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

                    <FormControl sx={{ gap: formGap, marginTop: "30px" }}>


                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label={<span>Level</span>}
                        value={values.Level}
                        id="Level"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Level"
                        // required
                        focused

                      >
                        {Data.VerticalMimNo >= 1 && <MenuItem value="1">Level 1</MenuItem>}
                        {Data.VerticalMimNo >= 2 && <MenuItem value="2">Level 2</MenuItem>}
                        {Data.VerticalMimNo >= 3 && <MenuItem value="3">Level 3</MenuItem>}
                      </TextField>


                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {/* <Productautocomplete
                          name="manager"
                          label="Manager"
                          variant="outlined"
                          id="manager"
                          value={designationLookup}
                          onChange={(newValue) => {
                            
                            SetDesignationLookup({
                              RecordID: newValue.DesignationID,
                              ManagerID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                              
                            });
                            
                          }}

                          
                          url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2049","ScreenName":"Manager","Filter":"parentID='${CompanyID}' AND EmployeeID='${recID}'","Any":""}}`}
                        /> */}


                        <ProductautocompleteLevel
                          name="manager"
                          label="Manager"
                          variant="outlined"
                          id="manager"
                          value={designationLookup}
                          onChange={(newValue) => {
                            SetDesignationLookup({
                              DesignationID: newValue.DesignationID,
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                            });
                          }}
                          url={`${baseApiUrl}ManagerLevelController.php`}
                          payload={{
                            EmployeeID: recID,
                            Level: values.Level || 1,
                            CompanyID: CompanyID
                            // You can make this dynamic if needed
                          }}
                        />
                      </Box>

                      {/* Vertical Checkboxes */}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="hrmanager"
                              checked={values.hrmanager}
                              id="hrmanager"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="HR Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="financemanager"
                              id="financemanager"
                              checked={values.financemanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Finance Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="projectmanager"
                              id="projectmanager"
                              checked={values.projectmanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Project Manager"
                        />
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="facilitymanager"
                              id="facilitymanager"
                              checked={values.facilitymanager}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label="Facility Manager"
                        />
                      </Box>
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    style={{ marginTop: "-32px" }}
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
                        onClick={() =>
                          mgrFunctionFn(values, resetForm, true, setFieldValue)
                        }
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
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
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                      filterName={"CompanyID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  <Popup
                    title="Designations"
                    openPopup={openDesPopup}
                    setOpenPopup={setOpenDesPopup}
                  >
                    <Listviewpopup
                      accessID="2049"
                      screenName="Designations"
                      childToParent={childToParent}
                      // filterName={"ERank"}
                      // filterValue={Data.Rank}
                      filterName={"parentID"}
                      filterValue={`${CompanyID}' AND EmployeeID='${recID}`}
                    />
                  </Popup>
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
              initialValues={deploymentInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  Fndeployment(values, resetForm, false);
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
                setFieldValue,
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
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
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
                      />
                      {/* <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="checkin"
                        name="checkin"
                        value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Checkin"
                        focused
                        // inputProps={{ maxLength:20}}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="checkout"
                        name="checkout"
                        value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Checkout"
                        focused
                        // inputProps={{ readOnly: true }}
                      /> */}
                      {/* <TextField
                        fullWidth
                        variant="standard"
                        label="Checkin"
                        type="text"
                        id="checkin"
                        name="checkin"
                        value={values.checkin}
                      /> */}
                    </FormControl>
                    <Stack
                      sx={{
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

                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Productautocomplete
                        name="Designation"
                        label={
                          <span>
                            Designation
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        id="Designation"
                        // value={designLookup}
                        value={values.Designation}
                        onChange={(newValue) => {
                          setFieldValue("Designation", newValue);
                          console.log(newValue, "--newvalue Designation");
                          // setdesignLookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2047","ScreenName":"Designation","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                      {/* <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={designLookup.designlookupRecordid}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Designation"
                        variant="standard"
                        value={designLookup.designlookupCode}
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
                        onClick={() => handleShow("DESIGN")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={designLookup.designlookupDesc}
                        fullWidth
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      /> */}
                    </FormControl>
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
                        label="ID"
                        variant="standard"
                        value={locationLookup.locationRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Location"
                        variant="standard"
                        value={locationLookup.locationCode}
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
                        onClick={() => handleShow("LOCATION")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={locationLookup.locationName}
                        fullWidth
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      /> */}

                      <Productautocomplete
                        name="location"
                        label={
                          <span>
                            Location
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        id="location"
                        // value={locationLookup}
                        value={values.location}
                        onChange={(newValue) => {
                          setFieldValue("location", newValue);
                          // SetLocationLookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Productautocomplete
                        name="gate"
                        label={
                          <span>
                            Gate
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        id="gate"
                        // value={gateLookup}
                        value={values.gate}
                        onChange={(newValue) => {
                          setFieldValue("gate", newValue);
                          console.log(newValue, "--newvalue gate");
                          console.log(newValue.RecordID, "gate RecordID");

                          // SetGateLookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID='${values.location ? values.location.RecordID : 0
                          }'","Any":""}}`}
                      />

                      {/* <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={gateLookup.gateRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Gate"
                        variant="standard"
                        value={gateLookup.gateCode}
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
                        onClick={() => handleShow("GATE")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={gateLookup.gateName}
                        fullWidth
                        focused
                        inputProps={{ tabIndex: "-1" }}
                      /> */}
                    </FormControl>
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Productautocomplete
                        id="function"
                        name="function"
                        label={
                          <span>
                            Function
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        value={values.function}
                        onChange={(newValue) => {
                          setFieldValue("function", newValue);
                          console.log(newValue, "--newvalue function");
                          console.log(newValue.RecordID, "function RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2048","ScreenName":"Function","Filter":"CompanyID
 ='${CompanyID}'","Any":""}}`}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Productautocomplete
                        id="project"
                        name="project"
                        label={
                          <span>
                            Project
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        value={values.project}
                        onChange={(newValue) => {
                          setFieldValue("project", newValue);
                          console.log(newValue, "--newvalue project");
                          console.log(newValue.RecordID, "project RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                    </FormControl>

                    {/* <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        //background: "#fff6c3"
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        type="time"
                        id="checkin"
                        name="checkin"
                        inputFormat="HH:mm:aa"
                        value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check In Time"
                        focused
                        // inputProps={{ maxLength:20}}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        //background: "#fff6c3"
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        type="time"
                        id="checkout"
                        name="checkout"
                        inputFormat="HH:mm:aa"
                        value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check Out Time"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
                    </FormControl> */}
                  </Box>
                  {/* <Box display="flex" flexDirection="column" gap={2}> */}
                  {/* Row 1: Horizontal */}
                  {/* <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="horizontal"
                        name="horizontal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Horizontal"
                      />
                      <FormLabel focused={false}>Horizontal</FormLabel>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="Horizontalmin"
                        name="Horizontalmin"
                        value={values.Horizontalmin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Minimum managers to approve"
                        sx={{
                          width: "420px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </Box>

                    {/* Row 2: Vertical */}
                  {/* <Box display="flex" alignItems="center" gap={1}>
                      <Field
                        type="checkbox"
                        id="vertical"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="vertical"
                        as={Checkbox}
                        label="Vertical"
                      />
                      <FormLabel focused={false}>Vertical</FormLabel>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="Verticalmin"
                        name="Verticalmin"
                        value={values.Verticalmin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Minimum managers to approve"
                        sx={{
                          width: "420px",
                          marginLeft: "15px",
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </Box>
                  </Box> */}
                  {/* </Box> */}
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5">Shift Details</Typography>

                  {/* <Typography variant="body1" sx={{ minWidth: 80 }}>
    Shift
  </Typography> */}
                  {/* <FormControl sx={{ width: 500, mb: 2 }}>
  <TextField
    select
    variant="standard"
    name="BillingUnits"
    id="BillingUnits"
    value={values.BillingUnits}
    onChange={handleChange}
    onBlur={handleBlur}
    required
    focused
    sx={{
      width: 150, // Adjust width as needed
    }}
  >
    <MenuItem value="HS">General</MenuItem>
    <MenuItem value="DS">Days</MenuItem>
    <MenuItem value="WS">Week</MenuItem>
    <MenuItem value="MS">Month</MenuItem>
  </TextField>
</FormControl>

  <FormControl sx={{ width: 500, mb: 2 }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="time"
                        id="checkin"
                        name="checkin"
                        inputFormat="HH:mm:aa"
                        value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check In Time"
                        focused
                        // inputProps={{ maxLength:20}}
                      />
                      </FormControl>
                  <FormControl sx={{ width: 500, mb: 2 }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="time"
                        id="checkout"
                        name="checkout"
                        inputFormat="HH:mm:aa"
                        value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Check Out Time"
                        focused
                        // inputProps={{ readOnly: true }}
                      />
             </FormControl> */}

                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ width: 500, mt: 2, padding: formGap }}
                  >
                    {/* Shift */}
                    <FormControl variant="standard" fullWidth>
                      {/* <TextField
    select // 👈 This is required for dropdown
    fullWidth
    type="text"
    id="checkin"
    name="checkin"
    value={values.checkin}
    onBlur={handleBlur}
    onChange={handleChange}
    label="Shift"
    focused
  >
    <MenuItem value="HS">General</MenuItem>
    <MenuItem value="DS">Days</MenuItem>
    <MenuItem value="WS">Week</MenuItem>
    <MenuItem value="MS">Month</MenuItem>
  </TextField> */}
                      <Productautocomplete
                        id="shift"
                        name="shift"
                        label={
                          <span>
                            Shift
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        value={values.shift}
                        onChange={(newValue) => {
                          //                        Monday: deploymentData.Monday === "Y" ? true : false,
                          // Tuesday: deploymentData.TuesdayTuesdayShift === "Y" ? true : false,
                          // Wednesday: deploymentData.Wednesday === "Y" ? true : false,
                          // Thursday: deploymentData.Thursday === "Y" ? true : false,
                          // Friday: deploymentData.Friday === "Y" ? true : false,
                          // Saturday: deploymentData.Saturday === "Y" ? true : false,
                          // Sunday: deploymentData.Sunday === "Y" ? true : false,
                          setFieldValue("shift", newValue);
                          setFieldValue(
                            "Monday",
                            newValue.Monday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Tuesday",
                            newValue.Tuesday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Wednesday",
                            newValue.Wednesday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Thursday",
                            newValue.Thursday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Friday",
                            newValue.Friday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Saturday",
                            newValue.Saturday === "Y" ? true : false
                          );
                          setFieldValue(
                            "Sunday",
                            newValue.Sunday === "Y" ? true : false
                          );
                          console.log(newValue, "--newvalue shift");
                          console.log(newValue.RecordID, "shift RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2108","ScreenName":"Shift","Filter":"","Any":""}}`}
                      />
                    </FormControl>

                    {/* Check In Time */}
                    <FormControl variant="standard">
                      <TextField
                        fullWidth
                        type="time"
                        id="checkin"
                        name="checkin"
                        value={values.shift?.ShiftStartTime || values.checkin}
                        // value={values.checkin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Shift Start Time"
                        inputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </FormControl>

                    {/* Check Out Time */}
                    <FormControl variant="standard">
                      <TextField
                        fullWidth
                        type="time"
                        id="checkout"
                        name="checkout"
                        value={values.shift?.ShiftendTime || values.checkout}
                        // value={values.checkout}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Shift End Time"
                        focused
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Stack>

                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>Week Off</Typography>
                  <Box>
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Monday"
                      id="Monday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Monday"
                      disabled
                    />

                    <FormLabel focused={false}>Monday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Tuesday"
                      id="Tuesday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Tuesday"
                      disabled
                    />

                    <FormLabel focused={false}>Tuesday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Wednesday"
                      id="Wednesday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Wednesday"
                      disabled
                    />

                    <FormLabel focused={false}>Wednesday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Thursday"
                      id="Thursday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Thursday"
                      disabled
                    />

                    <FormLabel focused={false}>Thursday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Friday"
                      id="Friday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Friday"
                      disabled
                    />

                    <FormLabel focused={false}>Friday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Saturday"
                      id="Saturday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Saturday"
                      disabled
                    />

                    <FormLabel focused={false}>Saturday</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Sunday"
                      id="Sunday"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Sunday"
                      disabled
                    />

                    <FormLabel focused={false}>Sunday</FormLabel>
                  </Box>
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>Checkin & Checkout Options</Typography>
                  <Box>
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="biometric"
                      id="biometric"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="biometric"
                    // disabled
                    />

                    <FormLabel focused={false}>Biometric</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="mobile"
                      id="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="mobile"
                    // disabled
                    />

                    <FormLabel focused={false}>Mobile Geofencing</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="cloud"
                      id="cloud"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="cloud"
                    // disabled
                    />

                    <FormLabel focused={false}>Cloud Application</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="managermanual"
                      id="managermanual"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="managermanual"
                    // disabled
                    />

                    <FormLabel focused={false}>Manager Manual</FormLabel>

                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="30px"
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
                        onClick={() => {
                          fnSave(values, "harddelete");
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )}
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
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
                  </Box>

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
                      filterName={"parentID"}
                      // filterValue={locationLookup.locationRecordID}
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
                      filterName={"parentID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  {/* <Popup
                    title="CheckIn"
                    openPopup={openCHECKINPopup}
                    setOpenPopup={setOpenCHECKINPopup}
                  >
                    <Listviewpopup
                      accessID=""
                      screenName="CheckIn"
                      childToParent={childToParent}
                    />
                  </Popup> */}
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
              // onSubmit={handleFormSubmit}
              initialValues={AttachmentInitialValues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                if (values.renewal && (!values.RenewalDate || values.RenewalDate === "00-00-0000")) {
                  toast.error("Renewal Date is Required");
                  return;
                }
                const updatedValues = {
                  ...values,
                  RenewalDate: values.renewal ? values.RenewalDate : "00-00-0000",
                };
                setTimeout(() => {
                  FnAttachment(updatedValues, resetForm, false);
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Code"
                          focused
                        // inputProps={{ readOnly: true }}
                        />

                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="Name"
                          name="Name"
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Name"
                          focused
                        // inputProps={{ readOnly: true }}
                        />

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
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="LoaDescription"
                          name="LoaDescription"
                          value={values.LoaDescription}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Description"
                          sx={{
                            //gridColumn: "span 2",
                            backgroundColor: "#ffffff", // Set the background to white
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                            },
                          }}
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />
                        <FormControl focused variant="standard" required>
                          <InputLabel id="category">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="category"
                            name="category"
                            value={values.category}
                            onBlur={handleBlur}
                            onChange={handleChange}

                          >
                            <MenuItem value="EC">Education</MenuItem>
                            <MenuItem value="AD">Award</MenuItem>
                            <MenuItem value="CT">Certificate</MenuItem>
                            <MenuItem value="IS">Insurance</MenuItem>
                            <MenuItem value="WT">Warranty</MenuItem>
                            <MenuItem value="OS">Others</MenuItem>
                          </Select>
                        </FormControl>
                        <Box>
                          <Field
                            //  size="small"
                            type="checkbox"
                            name="personal"
                            id="personal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as={Checkbox}
                            label="Personal"
                          />
                          <FormLabel focused={false}>Personal</FormLabel></Box>
                        {/* {values.renewal == true ? ( */}
                        <TextField
                          name="RenewalDate"
                          label="Next Renewal Required Date"
                          type="date"
                          variant="standard"
                          focused
                          value={values.RenewalDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.RenewalDate && !!errors.RenewalDate}
                          helperText={touched.RenewalDate && errors.RenewalDate}
                          disabled={!values.renewal}
                          InputProps={{
                            sx: {
                              pl: 1.5,
                            },
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />



                        <FormControl
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* <FormControlLabel 
                          control={
                          <Field 
                          type="checkbox" 
                          name="personal" 
                          id="personal"  
                          label="Personal" 
                          />}
                           label="Personal" />
                           <FormControlLabel 
                          control={
                          <Field 
                          type="checkbox" 
                          name="renewal" 
                          id="renewal"  
                          label="Renewal Required" 
                          />}
                           label="Renewal Required" /> */}

                          <Box>

                            <Field
                              //  size="small"
                              type="checkbox"
                              name="renewal"
                              id="renewal"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                              label="Renewal Required"
                            />
                            <FormLabel focused={false}>Renewal Required</FormLabel>
                            {/* <Typography variant="h6">
                              Certificate Attachment
                            </Typography> */}

                          </Box>
                        </FormControl>

                        {/* <FormControl
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                
                                <Box>
                                  <Typography variant="h6">
                                    Certificate Attachment
                                  </Typography>
                                 
                                   <IconButton
                    size="large"
                    color="warning"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="all/*"
                      type="file"
                      onChange={changeHandler}
                    />
                    <PictureAsPdfOutlinedIcon  />
                  </IconButton>
                  <Button
                    variant="contained"
                    component={"a"}
                    onClick={() => {
                      Data.ImageName || ImageName
                        ? window.open(
                          ImageName ?  store.getState().globalurl.attachmentUrl + ImageName : store.getState().globalurl.attachmentUrl +  Data.ImageName,
                            "_blank"
                          )
                        : toast.error("Please Upload File");
                    }}
                  >
                    View
                  </Button>
                                </Box>
                              </FormControl>
                             */}

                        <Box
                          display="flex"
                          justifyContent="end"
                          padding={1}
                          gap={2}
                        >
                          <IconButton
                            size="small"
                            color="warning"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept=".pdf"
                              type="file"
                              onChange={changeHandler}
                            />
                            <PictureAsPdfOutlinedIcon fontSize="small" />
                          </IconButton>
                          <Button
                            variant="contained"
                            component={"a"}
                            onClick={() => {
                              fnViewFile();
                            }}
                          >
                            View{" "}
                          </Button>
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
        )}
        {show == "7" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={itemcustodyInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  empItemCustodyFn(values, resetForm, false);
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
                        label="Name"
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
                          Toolbar: Employee,
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
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.ItemNumber}
                        id="ItemNumber"
                        name="ItemNumber"
                        label="Item No"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.ItemNumber && !!errors.ItemNumber}
                        helperText={touched.ItemNumber && errors.ItemNumber}
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                        multiline
                        inputProps={{ maxLength: 90 }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.ItemName}
                        id="ItemName"
                        name="ItemName"
                        label="Item Name"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.ItemName && !!errors.ItemName}
                        helperText={touched.ItemName && errors.ItemName}
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        multiline
                        inputProps={{ maxLength: 90 }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.AssestID}
                        id="AssestID"
                        name="AssestID"
                        label="Assest ID"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.AssestID && !!errors.AssestID}
                        helperText={touched.AssestID && errors.AssestID}
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        multiline
                        inputProps={{ maxLength: 90 }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.ItemValue}
                        id="ItemValue"
                        name="ItemValue"
                        label="Item Value"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.ItemValue && !!errors.ItemValue}
                        helperText={touched.ItemValue && errors.ItemValue}
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        multiline
                        inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.PurchaseReference}
                        id="PurchaseReference"
                        name="PurchaseReference"
                        label="Reference"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.PurchaseReference &&
                          !!errors.PurchaseReference
                        }
                        helperText={
                          touched.PurchaseReference && errors.PurchaseReference
                        }
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        multiline
                        inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    style={{ marginTop: "-40px" }}
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
                            empItemCustodyFn(values, resetForm, "harddelete");
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
                  </Box>
                  <Popup
                    title="Functions"
                    openPopup={openFunPopup}
                    setOpenPopup={setOpenFunPopup}
                  >
                    <Listviewpopup
                      accessID="2048"
                      screenName="Functions"
                      childToParent={childToParent}
                      filterName={"CompanyID"}
                      filterValue={CompanyID}
                    />
                  </Popup>
                  <Popup
                    title="Designations"
                    openPopup={openDesPopup}
                    setOpenPopup={setOpenDesPopup}
                  >
                    <Listviewpopup
                      accessID="2049"
                      screenName="Designations"
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

        {/*Contracts In */}
        {show == "8" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={ContractInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  contractSavefn(values, resetForm, false);
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
                setFieldValue,
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
                        id="Code"
                        name="Code"
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>

                    <Stack
                      sx={{
                        gap: formGap,
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

                    <Box>
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
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          components={{
                            Toolbar: Employee,
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
                    <FormControl sx={{ gap: formGap, marginTop: "30px" }}>
                      {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="vendor"
                          label="Vendor"
                          variant="standard"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={vendorlookup.venCode}
                        />
                        <IconButton
                          onClick={() => handleShow("VEN")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="dies"
                          variant="standard"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={vendorlookup.venName}
                        />
                      </Box> */}

                      <Productautocomplete
                        name="vendor"
                        label="vendor"
                        variant="outlined"
                        id="vendor"
                        value={vendorlookup}
                        // value={values.vendor}
                        onChange={(newValue) => {
                          // setFieldValue("vendor", newValue);
                          console.log(newValue, "--newvalue vendor");

                          console.log(newValue.RecordID, "vendor RecordID");

                          SetVendorlookup({
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                        }}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      {/* <SingleFormikOptimizedAutocomplete
                       
                        label="Vendor"
                        id="vendor"
                         name="vendor"
                        value={vendorlookup}
                        // value={values.vendor}
                        // onChange={(newValue) => {
                        //   setFieldValue("vendor", newValue)
                        //   console.log(newValue.RecordID, "newValue.RecordID");
                        // }}

                        onChange={(e, newValue) => {
                        
                          console.log(newValue, "---2100 newvalues");
                          console.log(vendorlookup, "---2100 matcatLookup");

                          SetVendorlookup({
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                        }}
                       
                      //  onChange={handleSelectionFunctionname}
                      // defaultValue={selectedFunctionName}
                      url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID='${CompanyID}'","Any":""}}`}

                      /> */}
                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label={<span>Billing Units</span>}
                        value={values.BillingUnits}
                        id="BillingUnits"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BillingUnits"
                        required
                        focused
                      // sx={{
                      //   gridColumn: "span 2",
                      //   backgroundColor: "#ffffff",
                      //   "& .MuiInputBase-root": {
                      //     backgroundColor: "",
                      //   },
                      // }}
                      >
                        <MenuItem value="HS">Hours</MenuItem>
                        <MenuItem value="DS">Days</MenuItem>
                        <MenuItem value="WS">Week</MenuItem>
                        <MenuItem value="MS">Month</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.UnitRate}
                        id="UnitRate"
                        name="UnitRate"
                        label="Unit Rate"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.UnitRate && !!errors.UnitRate}
                        helperText={touched.UnitRate && errors.UnitRate}
                        // sx={{
                        //   gridColumn: "span 2",
                        //   backgroundColor: "#ffffff", // Set the background to white
                        //   "& .MuiFilledInput-root": {
                        //     backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        //   }
                        // }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: {
                              textAlign: "right",
                            },
                          },
                        }}
                        onWheel={(e) => e.target.blur()}
                        multiline
                        inputProps={{ maxLength: 90 }}
                      />

                      <TextField
                        name="Hsn"
                        type="text"
                        id="Hsn"
                        label="HSN Code"
                        variant="standard"
                        focused
                        required
                        value={values.Hsn}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Hsn && !!errors.Hsn}
                        helperText={touched.Hsn && errors.Hsn}
                        autoFocus
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Sgst"
                        type="number"
                        id="Sgst"
                        label="SGST"
                        variant="standard"
                        value={values.Sgst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Sgst && !!errors.Sgst}
                        helperText={touched.Sgst && errors.Sgst}
                        sx={{
                          background: "",
                          input: { textAlign: "right" },
                        }}
                        inputprops={{
                          maxlength: 13,
                          step: 0.01,
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Gst"
                        type="number"
                        id="Gst"
                        label="CGST"
                        variant="standard"
                        value={values.Gst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Gst && !!errors.Gst}
                        helperText={touched.Gst && errors.Gst}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        inputProps={{ maxLength: 25 }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Igst"
                        type="number"
                        id="Igst"
                        label="IGST"
                        variant="standard"
                        value={values.Igst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Igst && !!errors.Igst}
                        helperText={touched.Igst && errors.Igst}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="TDS"
                        type="number"
                        id="TDS"
                        label="TDS"
                        variant="standard"
                        value={values.TDS}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.TDS && !!errors.TDS}
                        helperText={touched.TDS && errors.TDS}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />

                      <TextField
                        name="FromPeriod"
                        type="date"
                        id="FromPeriod"
                        label="From Period"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={funMode === "E" ? formatDateForInput(values.FromPeriod) : values.FromPeriod}                        // value={values.FromPeriod}

                        value={values.FromPeriod}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      // error={!!touched.FromPeriod && !!errors.FromPeriod}
                      // helperText={touched.FromPeriod && errors.FromPeriod}
                      //sx={{ background: "" }}
                      //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        name="ToPeriod"
                        type="date"
                        id="ToPeriod"
                        label="To Date"
                        variant="standard"
                        focused
                        value={values.ToPeriod}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFieldValue(name, value);

                          // Case 1: Set NotificationAlertDate to 1 day before ToDate
                          const toDate = new Date(value);
                          const alertDate = subDays(toDate, 1);
                          const formattedAlertDate = alertDate
                            .toISOString()
                            .split("T")[0];
                          console.log(
                            formattedAlertDate,
                            "--formattedAlertDate"
                          );

                          setFieldValue(
                            "NotificationAlertDate",
                            formattedAlertDate
                          );

                          // Case 2: If FromPeriod is selected, calculate difference in days
                          if (values.FromPeriod) {
                            const fromDate = new Date(values.FromPeriod);
                            const diffDays = differenceInDays(toDate, fromDate);
                            setFieldValue("RenewableNotification", diffDays); // or your target field
                          }
                        }}
                      />
                      <TextField
                        name="NotificationAlertDate"
                        type="date"
                        id="NotificationAlertDate"
                        label="Notification Alert Date"
                        variant="standard"
                        focused
                        value={values.NotificationAlertDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.NotificationAlertDate &&
                          !!errors.NotificationAlertDate
                        }
                        helperText={
                          touched.NotificationAlertDate &&
                          errors.NotificationAlertDate
                        }
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        name="RenewableNotification"
                        label="Renewal Notification Period"
                        type="number"
                        variant="standard"
                        focused
                        value={values.RenewableNotification}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.RenewableNotification &&
                          !!errors.RenewableNotification
                        }
                        helperText={
                          touched.RenewableNotification &&
                          errors.RenewableNotification
                        }
                        inputProps={{ readOnly: true }}
                      />

                      {/* <TextField
                        name="ToPeriod"
                        type="date"
                        id="ToPeriod"
                        label="To Date"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={formatDateForInput(values.ToPeriod)}
                        // value={funMode === "E" ? formatDateForInput(values.ToPeriod) : values.ToPeriod}                        // value={values.FromPeriod}

                        value={values.ToPeriod}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFieldValue("ToPeriod", value);
                          if (values.ToPeriod) {
                            const toDate = new Date(values.ToPeriod);
                            const alertDate = subDays(toDate, 1); // 1 day before
                            const formattedDate = format(alertDate, "yyyy-MM-dd");
                        
                            if (values.NotificationAlertDate !== formattedDate) {
                              setFieldValue("NotificationAlertDate", formattedDate);
                            }
                          }
                    
                      
                      />
                      <TextField
                        name="NotificationAlertDate"
                        type="date"
                        id="NotificationAlertDate"
                        label="Notification Alert Date"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={formatDateForInput(values.NotificationAlertDate)}
                        // value={funMode === "E" ? formatDateForInput(values.NotificationAlertDate) : values.NotificationAlertDate}                        // value={values.FromPeriod}

                        value={values.NotificationAlertDate}

                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.NotificationAlertDate && !!errors.NotificationAlertDate}
                        helperText={touched.NotificationAlertDate && errors.NotificationAlertDate}
                        //sx={{ background: "" }}
                        inputProps={{ readOnly: true }}
                        // inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.RenewableNotification}
                        id="RenewableNotification"
                        name="RenewableNotification"
                        label="Renewal Notification Period"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.RenewableNotification && !!errors.RenewableNotification
                        }
                        helperText={
                          touched.RenewableNotification && errors.RenewableNotification
                        }
                        // sx={{
                        //   gridColumn: "span 2",
                        //   backgroundColor: "#ffffff",
                        //   "& .MuiFilledInput-root": {
                        //     backgroundColor: "#ffffff",
                        //   }
                        // }}
                        focused
                        onWheel={(e) => e.target.blur()}
                        multiline
                        inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: {
                              textAlign: "right",
                            },
                          },
                        }}
                      /> */}
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    // style={{ marginTop: "-35px" }}
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
                            contractSavefn(values, resetForm, "harddelete");
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
                  </Box>
                  <Popup
                    title="vendor"
                    openPopup={openvenPopup}
                    setOpenPopup={setOpenvenPopup}
                  >
                    <Listviewpopup
                      accessID="2100"
                      screenName="Vendor"
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

        {/*Contracts Out */}
        {show == "11" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={ContractInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  contractSavefn(values, resetForm, false);
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
                setFieldValue,
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
                        id="Code"
                        name="Code"
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>

                    <Stack
                      sx={{
                        gap: formGap,
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

                    <Box>
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
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          components={{
                            Toolbar: Employee,
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
                    <FormControl sx={{ gap: formGap, marginTop: "30px" }}>
                      {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="vendor"
                          label="Vendor"
                          variant="standard"
                          focused
                          required
                          inputProps={{ tabIndex: "-1" }}
                          value={vendorlookup.venCode}
                        />
                        <IconButton
                          onClick={() => handleShow("VEN")}
                          sx={{ height: 40, width: 40 }}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                        <TextField
                          id="dies"
                          variant="standard"
                          fullWidth
                          inputProps={{ tabIndex: "-1" }}
                          focused
                          value={vendorlookup.venName}
                        />
                      </Box> */}

                      <Productautocomplete
                        name="customer"
                        label="Customer"
                        variant="outlined"
                        id="customer"
                        value={customerlookup}
                        // value={values.customer}
                        onChange={(newValue) => {
                          // setFieldValue("customer", newValue);
                          console.log(newValue, "--newvalue customer");

                          console.log(newValue.RecordID, "customer RecordID");

                          SetCustomerlookup({
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                        }}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Customer","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      {/* <SingleFormikOptimizedAutocomplete
                       
                        label="Vendor"
                        id="vendor"
                         name="vendor"
                        value={vendorlookup}
                        // value={values.vendor}
                        // onChange={(newValue) => {
                        //   setFieldValue("vendor", newValue)
                        //   console.log(newValue.RecordID, "newValue.RecordID");
                        // }}

                        onChange={(e, newValue) => {
                        
                          console.log(newValue, "---2100 newvalues");
                          console.log(vendorlookup, "---2100 matcatLookup");

                          SetVendorlookup({
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                        }}
                       
                      //  onChange={handleSelectionFunctionname}
                      // defaultValue={selectedFunctionName}
                      url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID='${CompanyID}'","Any":""}}`}

                      /> */}
                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label={<span>Billing Units</span>}
                        value={values.BillingUnits}
                        id="BillingUnits"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BillingUnits"
                        required
                        focused
                      // sx={{
                      //   gridColumn: "span 2",
                      //   backgroundColor: "#ffffff",
                      //   "& .MuiInputBase-root": {
                      //     backgroundColor: "",
                      //   },
                      // }}
                      >
                        <MenuItem value="HS">Hours</MenuItem>
                        <MenuItem value="DS">Days</MenuItem>
                        <MenuItem value="WS">Week</MenuItem>
                        <MenuItem value="MS">Month</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.UnitRate}
                        id="UnitRate"
                        name="UnitRate"
                        label="Unit Rate"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.UnitRate && !!errors.UnitRate}
                        helperText={touched.UnitRate && errors.UnitRate}
                        // sx={{
                        //   gridColumn: "span 2",
                        //   backgroundColor: "#ffffff", // Set the background to white
                        //   "& .MuiFilledInput-root": {
                        //     backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        //   }
                        // }}
                        focused
                        InputProps={{
                          inputProps: {
                            style: {
                              textAlign: "right",
                            },
                          },
                        }}
                        onWheel={(e) => e.target.blur()}
                        multiline
                        inputProps={{ maxLength: 90 }}
                      />
                      <TextField
                        name="Hsn"
                        type="text"
                        id="Hsn"
                        label="HSN Code"
                        variant="standard"
                        focused
                        required
                        value={values.Hsn}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Hsn && !!errors.Hsn}
                        helperText={touched.Hsn && errors.Hsn}
                        autoFocus
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Sgst"
                        type="number"
                        id="Sgst"
                        label="SGST"
                        variant="standard"
                        value={values.Sgst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Sgst && !!errors.Sgst}
                        helperText={touched.Sgst && errors.Sgst}
                        sx={{
                          background: "",
                          input: { textAlign: "right" },
                        }}
                        inputprops={{
                          maxlength: 13,
                          step: 0.01,
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Gst"
                        type="number"
                        id="Gst"
                        label="CGST"
                        variant="standard"
                        value={values.Gst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Gst && !!errors.Gst}
                        helperText={touched.Gst && errors.Gst}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        inputProps={{ maxLength: 25 }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="Igst"
                        type="number"
                        id="Igst"
                        label="IGST"
                        variant="standard"
                        value={values.Igst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Igst && !!errors.Igst}
                        helperText={touched.Igst && errors.Igst}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        // disabled={mode === "V"}
                        name="TDS"
                        type="number"
                        id="TDS"
                        label="TDS"
                        variant="standard"
                        value={values.TDS}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.TDS && !!errors.TDS}
                        helperText={touched.TDS && errors.TDS}
                        sx={{ background: "" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                        focused
                        onWheel={(e) => e.target.blur()}
                      // onInput={(e) => {
                      //   e.target.value = Math.max(0, parseInt(e.target.value))
                      //     .toString()
                      //     .slice(0, 11);
                      // }}
                      />
                      <TextField
                        name="FromPeriod"
                        type="date"
                        id="FromPeriod"
                        label="From Period"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={funMode === "E" ? formatDateForInput(values.FromPeriod) : values.FromPeriod}                        // value={values.FromPeriod}

                        value={values.FromPeriod}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      // error={!!touched.FromPeriod && !!errors.FromPeriod}
                      // helperText={touched.FromPeriod && errors.FromPeriod}
                      //sx={{ background: "" }}
                      //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        name="ToPeriod"
                        type="date"
                        id="ToPeriod"
                        label="To Date"
                        variant="standard"
                        focused
                        value={values.ToPeriod}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFieldValue(name, value);

                          // Case 1: Set NotificationAlertDate to 1 day before ToDate
                          const toDate = new Date(value);
                          const alertDate = subDays(toDate, 1);
                          const formattedAlertDate = alertDate
                            .toISOString()
                            .split("T")[0];
                          console.log(
                            formattedAlertDate,
                            "--formattedAlertDate"
                          );

                          setFieldValue(
                            "NotificationAlertDate",
                            formattedAlertDate
                          );

                          // Case 2: If FromPeriod is selected, calculate difference in days
                          if (values.FromPeriod) {
                            const fromDate = new Date(values.FromPeriod);
                            const diffDays = differenceInDays(toDate, fromDate);
                            setFieldValue("RenewableNotification", diffDays); // or your target field
                          }
                        }}
                      />
                      <TextField
                        name="NotificationAlertDate"
                        type="date"
                        id="NotificationAlertDate"
                        label="Notification Alert Date"
                        variant="standard"
                        focused
                        value={values.NotificationAlertDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.NotificationAlertDate &&
                          !!errors.NotificationAlertDate
                        }
                        helperText={
                          touched.NotificationAlertDate &&
                          errors.NotificationAlertDate
                        }
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        name="RenewableNotification"
                        label="Renewal Notification Period"
                        type="number"
                        variant="standard"
                        focused
                        value={values.RenewableNotification}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.RenewableNotification &&
                          !!errors.RenewableNotification
                        }
                        helperText={
                          touched.RenewableNotification &&
                          errors.RenewableNotification
                        }
                        inputProps={{ readOnly: true }}
                      />

                      {/* <TextField
                        name="ToPeriod"
                        type="date"
                        id="ToPeriod"
                        label="To Date"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={formatDateForInput(values.ToPeriod)}
                        // value={funMode === "E" ? formatDateForInput(values.ToPeriod) : values.ToPeriod}                        // value={values.FromPeriod}

                        value={values.ToPeriod}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFieldValue("ToPeriod", value);
                          if (values.ToPeriod) {
                            const toDate = new Date(values.ToPeriod);
                            const alertDate = subDays(toDate, 1); // 1 day before
                            const formattedDate = format(alertDate, "yyyy-MM-dd");
                        
                            if (values.NotificationAlertDate !== formattedDate) {
                              setFieldValue("NotificationAlertDate", formattedDate);
                            }
                          }
                    
                      
                      />
                      <TextField
                        name="NotificationAlertDate"
                        type="date"
                        id="NotificationAlertDate"
                        label="Notification Alert Date"
                        variant="standard"
                        focused
                        // inputFormat="YYYY-MM-DD"
                        // value={formatDateForInput(values.NotificationAlertDate)}
                        // value={funMode === "E" ? formatDateForInput(values.NotificationAlertDate) : values.NotificationAlertDate}                        // value={values.FromPeriod}

                        value={values.NotificationAlertDate}

                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.NotificationAlertDate && !!errors.NotificationAlertDate}
                        helperText={touched.NotificationAlertDate && errors.NotificationAlertDate}
                        //sx={{ background: "" }}
                        inputProps={{ readOnly: true }}
                        // inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.RenewableNotification}
                        id="RenewableNotification"
                        name="RenewableNotification"
                        label="Renewal Notification Period"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.RenewableNotification && !!errors.RenewableNotification
                        }
                        helperText={
                          touched.RenewableNotification && errors.RenewableNotification
                        }
                        // sx={{
                        //   gridColumn: "span 2",
                        //   backgroundColor: "#ffffff",
                        //   "& .MuiFilledInput-root": {
                        //     backgroundColor: "#ffffff",
                        //   }
                        // }}
                        focused
                        onWheel={(e) => e.target.blur()}
                        multiline
                        inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: {
                              textAlign: "right",
                            },
                          },
                        }}
                      /> */}
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    // style={{ marginTop: "-35px" }}
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
                            contractSavefn(values, resetForm, "harddelete");
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
                  </Box>
                  <Popup
                    title="vendor"
                    openPopup={openvenPopup}
                    setOpenPopup={setOpenvenPopup}
                  >
                    <Listviewpopup
                      accessID="2100"
                      screenName="Vendor"
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

        {show == "9" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={geolocationinitialvlues}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  geolocSavefn(values, resetForm, false);
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
                        id="Code"
                        name="Code"
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Name"
                        name="Name"
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        sx={{
                          //gridColumn: "span 2",
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                      // inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    {/* <Stack
                      sx={{
                       // gridColumn: "span 2",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        right: "0px",
                      }}

                    >

                      <img
                        src={userimg}
                        style={{ width: "200px", height: "120px" }}
                      />
                    </Stack> */}

                    <Stack
                      sx={{
                        gap: formGap,
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
                    <FormControl sx={{ gap: formGap, marginTop: "-20px" }}>
                      {/* <FormControl 
                     sx={{
                      //gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      //background: "#fff6c3"
                    }}
                    // sx={{ gap: formGap }}
                    > */}
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        id="longitude"
                        label="Longitude"
                        name="longitude"
                        focused
                        value={values.longitude}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{
                          step: "any",
                          min: -180,
                          max: 180,
                          style: { textAlign: "right" },
                        }}
                      />
                      {/* </FormControl> */}
                      {/* <FormControl 
                     sx={{
                      //gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      //background: "#fff6c3"
                    }}
                    // sx={{ gap: formGap }}
                    > */}
                      <TextField
                        fullWidth
                        variant="standard"
                        id="latitude"
                        name="latitude"
                        label="Latitude"
                        focused
                        value={values.latitude}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        inputProps={{
                          step: "any",
                          min: -90,
                          max: 90,
                          style: { textAlign: "right" },
                        }}
                      />
                      {/* </FormControl> */}
                      {/* <FormControl 
                     sx={{
                      //gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      //background: "#fff6c3"
                    }}
                    // sx={{ gap: formGap }}
                    > */}
                      <TextField
                        fullWidth
                        variant="standard"
                        focused
                        label="Radius (m)"
                        name="radius"
                        value={values.radius}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        inputProps={{
                          step: "any",
                          min: 0,
                          style: { textAlign: "right" },
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="10px"
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
                    {/* {YearFlag == "true" ? (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          geolocSavefn(values, "harddelete");
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button color="error" variant="contained" disabled={true}>
                        Delete
                      </Button>
                    )} */}
                    {/* {YearFlag == "true" ? (
                      <Button
                        onClick={() => mgrFunctionFn(values, resetForm, true)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    ) : (
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
              initialValues={LCInitialValue}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  LCsaveFn(values, resetForm, false);
                }, 100);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
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
                    {!isNonMobile && (
                      <Stack
                        sx={{
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
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        inputProps={{ maxLength: 8 }}
                        value={values.Code}
                        id="Code"
                        name="Code"
                        label="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
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
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{
                          backgroundColor: "#ffffff", 
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#ffffff", 
                          },
                        }}
                        focused
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />

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
                          rowsPerPageOptions={[5, 10, 20]}
                          pagination
                          onCellClick={(params) => {
                            selectCellRowData({
                              rowData: params.row,
                              mode: "E",
                              field: params.field,
                            });
                          }}
                          components={{
                            Toolbar: Employee,
                          }}
                          onStateChange={(stateParams) =>
                            setRowCount(stateParams.pagination.rowCount)
                          }
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
                    </FormControl>
                    <FormControl
                      sx={{
                        //mt: "15px",
                        gap: formGap,
                        marginTop: "20px",
                      }}
                    >
                      <FormControl
                        sx={{
                          gap: formGap,
                        }}
                        style={{ width: "100%" }}
                      >
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

                        <FormControl
                          focused
                          variant="filled"
                          sx={{ gridColumn: "span 2" }}
                        >
                          <Productautocomplete
                            name="leavetype"
                            label="Leave Type"
                            id="leavetype"
                            value={LeaveconLTData}
                            onChange={(newValue) => {
                              setselectLeaveconLTData({
                                RecordID: newValue.RecordID,
                                Code: newValue.Code,
                                Name: newValue.Name,
                              });
                            }}
                            url={`${listViewurl}?data={"Query":{"AccessID":"2092","ScreenName":"Leave Type","Filter":"parentID='${CompanyID}'","Any":""}}`}
                          />
                        </FormControl>

                        <TextField
                          fullWidth
                          variant="standard"
                          type="number"
                          label="Eligible Days"
                          id="totaldays"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.totaldays}
                          name="totaldays"
                          error={!!touched.totaldays && !!errors.totaldays}
                          helperText={touched.totaldays && errors.totaldays}
                          focused
                          onWheel={(e) => e.target.blur()}
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
                          variant="standard"
                          type="number"
                          label="Availed Days"
                          id="availableleave"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.availableleave}
                          name="availableleave"
                          error={
                            !!touched.availableleave && !!errors.availableleave
                          }
                          helperText={
                            touched.availableleave && errors.availableleave
                          }
                          focused
                          onWheel={(e) => e.target.blur()}
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
                          variant="standard"
                          type="number"
                          label="Balance Days"
                          id="elligibledays"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={
                            Number(values.totaldays) -
                            Number(values.availableleave)
                          }
                          name="elligibledays"
                          error={
                            !!touched.elligibledays && !!errors.elligibledays
                          }
                          helperText={
                            touched.elligibledays && errors.elligibledays
                          }
                          focused
                          onWheel={(e) => e.target.blur()}
                          InputProps={{
                            readOnly: true, // ✅ Correct way to make the field read-only
                            inputProps: {
                              style: { textAlign: "right" },
                            },
                          }}
                        />
                        <TextField
                          select
                          fullWidth
                          variant="standard"
                          label={<span>Year</span>}
                          value={values.Year}
                          id="Year"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="Year"
                          focused
                        >
                          <MenuItem value="2024">2024</MenuItem>
                          <MenuItem value="2025">2025</MenuItem>
                          <MenuItem value="2026">2026</MenuItem>
                        </TextField>
                      </FormControl>

                      <Box
                        display="flex"
                        justifyContent="end"
                        padding={1}
                        gap={2}
                        mt={10}
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
                                LCsaveFn(values, resetForm, "harddelete");
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

export default Editemployee;
