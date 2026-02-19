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
  Grid,
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
  ModuleUrl,
  partyContactData,
  PartyContactget,
  EmployeeVendorGetController,
  EmployeeVendorContactGet,
  partypost
} from "../../../store/reducers/Formapireducer";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import { fetchComboData1 } from "../../../store/reducers/Comboreducer";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  CheckinAutocomplete,
  CusListRunGrpOptimizedAutocomplete,
  CusListRunGrpOptimizedAutocomplete1,
  MultiSelectDropdown,
  ModuleAutocomplete,
  MultiFormikOptimizedAutocomplete,
  Productautocomplete,
  ProductautocompleteLevel,
  SingleFormikOptimizedAutocomplete,
  ItemGroupLookup,
  ItemsLookup,
} from "../../../ui-components/global/Autocomplete";
import Resizer from "react-image-file-resizer";
import ContactsIcon from '@mui/icons-material/Contacts';

// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Employee

// ***********************************************

const Editemployee = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const [pageSize, setPageSize] = React.useState(15);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  const [pageSize2, setPageSize2] = React.useState(15);
  const [pageSize1, setPageSize1] = React.useState(15);
  const [page1, setPage1] = React.useState(secondaryCurrentPage);
  const [page2, setPage2] = React.useState(secondaryCurrentPage);
  const [ID1Image, setID1Image] = useState("");
  const [ID2Image, setID2Image] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const CompanyID = sessionStorage.getItem("compID");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  const is003Subscription = SubscriptionCode.endsWith("003");
  const is00123Subscription = ["001", "002", "003"].some(code =>
    SubscriptionCode?.endsWith(code)
  );
  console.log(SubscriptionCode, "codehr");
  const EMPID = sessionStorage.getItem("EmpId");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [selectedPro, setSelectedPro] = useState([]);
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
  // FOR ITEM SERVICES DATA GRID
  const ItemdataGridHeight = "57vh";
  const partyContactgetdata = useSelector(
    (state) => state.formApi.partyContactgetdata
  );
  const navigate = useNavigate();
  let params = useParams();
  console.log(params, "--params");

  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var mode = params.Mode;
  var parentID = params.filtertype;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data) || {};
  // console.log(Data, "geteting Data");
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const baseApiUrl = useSelector((state) => state.globalurl.baseApiUrl);
  const fetchedData = useSelector((state) => state.formApi.data);
  console.log(fetchedData, "fetcheddata");
  console.log("API URL:", baseApiUrl);
  const state = location.state || {};
  console.log(state, "emnployee");
  const isLoading = useSelector((state) => state.formApi.loading);
  const ParentgetData = useSelector((state) => state.formApi.Partygetdata);
  console.log("ParentgetData", ParentgetData);
  const ParentcontactgetData = useSelector((state) => state.formApi.Partycontactgetdata);
  console.log("ParentcontactgetData", ParentcontactgetData);
  const deploymentData = useSelector((state) => state.formApi.deploymentData);
  console.log("deploymentData", deploymentData);
  const DataExplore = useSelector((state) => state.formApi.inviceEData);

  console.log(
    "🚀 ~ file: Editproformainvoice.jsx:110 ~ DataExplore:",
    DataExplore
  );
  const LoginID = sessionStorage.getItem("loginrecordID");
  const [panImage, setPanImage] = useState("");
  const [gstImage, setGstImage] = useState("");
  const gelocData = useSelector((state) => state.formApi.exploreData);
  const [moduleValue, setModuleValue] = useState([]);
  console.log(moduleValue, "modulevalues");
  const [moduleOptions, setModuleOptions] = useState([]);
  const [openDEPopup, setOpenDEPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);
  const [openPROPopup, setOpenPROPopup] = useState(false);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [showContacts, setShowContacts] = useState(false);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema1, setValidationSchema1] = useState(null);
  const [validationSchema2, setValidationSchema2] = useState(null);
  const [validationSchema3, setValidationSchema3] = useState(null);
  const [validationSchema4, setValidationSchema4] = useState(null);
  const [validationSchema5, setValidationSchema5] = useState(null);
  const [validationSchema6, setValidationSchema6] = useState(null);
  const [validationSchema7, setValidationSchema7] = useState(null);
  const [validationSchema8, setValidationSchema8] = useState(null);
  const [validationSchema9, setValidationSchema9] = useState(null);
  const [validationSchema10, setValidationSchema10] = useState(null);
  const [validationSchema11, setValidationSchema11] = useState(null);
  const [validationSchema12, setValidationSchema12] = useState(null);
  const [validationSchema13, setValidationSchema13] = useState(null);
  const [validationSchema14, setValidationSchema14] = useState(null);
  const [validationSchema17, setValidationSchema17] = useState(null);


  const dropdownData = [
    { ID: "All", Name: "All" },
    { ID: "Selected", Name: "Selected" },
    { ID: "Task", Name: "Task" },
    { ID: "NK", Name: "NK" },
  ];


  const baseUrl = store.getState().globalurl.imageUrl;
  const [viewImage, setViewImage] = React.useState(
    baseUrl + "Defaultimg.jpg"
  );
  useEffect(() => {
    const vendor =
      is003Subscription === true &&
        ParentgetData?.RecordID &&
        ParentgetData.RecordID !== "0"
        ? {
          RecordID: ParentgetData.RecordID,
          Code: ParentgetData.Code,
          Name: ParentgetData.Name,
        }
        : null;

    setContractorData((prev) => ({
      ...prev,
      vendor,
    }));
  }, [ParentgetData, is003Subscription]);

  useEffect(() => {
    if (Data?.ImageName) {
      setViewImage(baseUrl + Data.ImageName);
    }
  }, [Data?.ImageName]);



  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        //Employee
        let schemaFields = {
          Name: Yup.string().trim().required(data.Employee.Name),
          Department: Yup.object()
            .nullable()
            .required(data.Employee.Department),
          employeetype: Yup.string().required(data.Employee.employeetype),
          Password: Yup.string().trim().required(data.Employee.Password),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.Code = Yup.string().required(data.Employee.Code);
        }
        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);

        //Contact
        let schemaFields1 = {
          email: Yup.string()
            .required(data.Employeecontact.email)
            .matches(
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|co|in)$/,
              "Invalid Email Id"
            ),
        };

        schemaFields1.aadharcardnumber = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^\d{12}$/, data.Employeecontact.aadharcardnumber);

        schemaFields1.pfnumber = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^[A-Za-z0-9]{22}$/, data.Employeecontact.pfnumber);

        schemaFields1.esinumber = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^\d{17}$/, data.Employeecontact.esinumber);

        schemaFields1.phonenumber = Yup.string()
          .nullable()
          .notRequired()
          .transform((value) => (value === "" ? null : value))
          .matches(/^\d{10}$/, data.Employeecontact.phonenumber);

        schemaFields1.Branch = Yup.string()
          .trim()
          .notRequired(data.Employeecontact.Branch);

        schemaFields1.AccountHoldersName = Yup.string()
          .trim()
          .notRequired(data.Employeecontact.AccountHoldersName);

        schemaFields1.AccountNumber = Yup.string()
          .trim()
          .notRequired(data.Employeecontact.AccountNumber)
          .matches(/^\d{9,18}$/, data.Employeecontact.AccountNumber);

        schemaFields1.IfscCode = Yup.string()
          .trim()
          .notRequired(data.Employeecontact.IfscCode)
          .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, data.Employeecontact.IfscCode);

        const schema1 = Yup.object().shape(schemaFields1);
        setValidationSchema1(schema1);

        //Deployment
        const schema2 = Yup.object().shape({
          location: Yup.object().required(data.Deployment.location).nullable(),
          Designation: Yup.object()
            .nullable()
            .required(data.Deployment.Designation),
          // function: Yup.object().required(data.Deployment.function).nullable(),
          gate: Yup.object().required(data.Deployment.gate).nullable(),
          shift: Yup.object().required(data.Deployment.shift).nullable(),
          // costofemployee: Yup.string().required(data.Deployment.costofemployee),
          // costofcompany: Yup.string().required(data.Deployment.costofcompany),
        });
        setValidationSchema2(schema2);

        //Skills
        const schema3 = Yup.object().shape({
          Skills: Yup.string().trim().required(data.Skills.Skills),
          Comments: Yup.string().trim().required(data.Skills.Comments),
        });

        setValidationSchema3(schema3);
        //Function
        const schema4 = Yup.object().shape({
          functionLookup: Yup.object()
            .required(data.EmpFunction.function)
            .nullable(),
        });

        setValidationSchema4(schema4);
        //Attachment
        const schema5 = Yup.object().shape({
          category: Yup.string().required(data.Documents.category),
        });

        setValidationSchema5(schema5);
        //Itemcustody
        const schema6 = Yup.object().shape({
          ItemNumber: Yup.string().required(data.Itemcustody.ItemNumber),
          ItemName: Yup.string().trim().required(data.Itemcustody.ItemName),
          AssestID: Yup.string().required(data.Itemcustody.AssestID),
          PurchaseReference: Yup.string().trim().required(
            data.Itemcustody.PurchaseReference
          ),
          ItemValue: Yup.string().required(data.Itemcustody.ItemValue),
        });
        setValidationSchema6(schema6);
        //Leaveconfiguration

        const schema7 = Yup.object().shape({
          totaldays: Yup.string().required(data.Leaveconfiguration.totaldays),
          leavetype: Yup.object()
            .required(data.Leaveconfiguration.leavetype)
            .nullable(),
        });

        setValidationSchema7(schema7);

        //Manager
        const schema8 = Yup.object().shape({
          Level: Yup.string().required(data.Manager.Level),
          manager: Yup.object().required(data.Manager.manager).nullable(),
        });

        setValidationSchema8(schema8);
        const schema9 = Yup.object().shape({
          vendor: Yup.object().required(data.ContractsIN.vendor).nullable(),
          shift: Yup.object().required(data.ContractsIN.shift).nullable(),
          project: Yup.object().required(data.ContractsIN.project).nullable(),
          BillingUnits: Yup.string().required(data.ContractsIN.BillingUnits),
          BillingType: Yup.string().required(data.ContractsIN.BillingType),
          UnitRate: Yup.string().required(data.ContractsIN.UnitRate),
          Hsn: Yup.string().required(data.ContractsIN.Hsn),
        });
        setValidationSchema9(schema9);
        const schema10 = Yup.object().shape({
          customer: Yup.object().required(data.ContractsIN.customer).nullable(),
          BillingUnits: Yup.string().required(data.ContractsIN.BillingUnits),
          UnitRate: Yup.string().required(data.ContractsIN.UnitRate),
          Hsn: Yup.string().required(data.ContractsIN.Hsn),
        });
        setValidationSchema10(schema10);

        // const schema11 = Yup.object().shape({
        //   localitycode: Yup.string().required(data.Locality.code),
        //   // Pincode: Yup.string().required(data.Locality.pincode),
        // });
        let schemaFields2 = {
          localityname: Yup.string().trim().required(data.Locality.name),
        };
        if (CompanyAutoCode === "N") {
          schemaFields2.localitycode = Yup.string().required(
            data.Locality.localitycode
          );
        }

        const schema11 = Yup.object().shape(schemaFields2);

        setValidationSchema11(schema11);

        //ITEM SERIVICES
        const schema12 = Yup.object().shape({
          items: Yup.object().required(data.ItemServices.items).nullable(),
          vendors: Yup.object().required(data.ItemServices.vendors).nullable(),
          servicedate: Yup.string().required(data.ItemServices.servicedate),
          returndate: Yup.string().required(data.ItemServices.returndate),
          complaints: Yup.string().trim().required(data.ItemServices.complaints),
          tentativecharge: Yup.string().trim().required(
            data.ItemServices.tentativecharge
          ),
        });

        setValidationSchema12(schema12);
        const schema13 = Yup.object().shape({
          name1: Yup.string().trim().required(data.Contactdetails.name1),
          emailid1: Yup.string()
            .email("Invalid Email ID")
            .required(data.Contactdetails.emailid1),
          mobileno1: Yup.string()
            .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
            .required(data.Contactdetails.mobileno1),
          aadharcardnumber2: Yup.string()
            .nullable()
            .notRequired()
            .transform((value) => (value === "" ? null : value))
            .matches(/^\d{12}$/, data.Contactdetails.aadharcardnumber2),
          aadharcardnumber1: Yup.string()
            .nullable()
            .notRequired()
            .transform((value) => (value === "" ? null : value))
            .matches(/^\d{12}$/, data.Contactdetails.aadharcardnumber1),
        });
        setValidationSchema13(schema13);
        let schemaFields14 = {
          name1: Yup.string()
            .trim()
            .required(data.Party.name),

          mobilenumber: Yup.string()
            .required(data.Party.mobilenumber)
            .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),

          emailid: Yup.string()
            .nullable()
            .notRequired()
            .trim()
            .test(
              "email-or-empty",
              "Invalid Email ID",
              (value) => !value || Yup.string().email().isValidSync(value)
            ),
        };

        if (CompanyAutoCode === "N") {
          schemaFields14.code1 = Yup.string().required(data.Party.code);
        }

        if (CompanyAutoCode === "N") {
          schemaFields14.code = Yup.string().required(data.Party.code);
        }
        const schema14 = Yup.object().shape(schemaFields14);
        setValidationSchema14(schema14);



        const schema17 = Yup.object().shape({
          itemGroup: Yup.object().required(data.Itemcustody1.itemGroup).nullable(),
          items: Yup.object().required(data.Itemcustody1.items).nullable(),
          AssestID: Yup.string().required(data.Itemcustody1.AssestID),
          PurchaseReference: Yup.string().trim().required(
            data.Itemcustody1.PurchaseReference
          ),
          ItemValue: Yup.string().required(data.Itemcustody1.ItemValue),
        });
        setValidationSchema17(schema17);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  useEffect(() => {
    dispatch(ModuleUrl({ CompanyID: CompanyID }));
  }, [dispatch]);

  // useEffect(() => {
  //   if (fetchedData && fetchedData.Status === "Y") {
  //     const formattedData = fetchedData.Data.map((item) => ({
  //       label: item.Name,
  //       value: item.ID,
  //     }));
  //     setModuleOptions(formattedData);
  //   }
  // }, [fetchedData]);
  // const deployvalidationSchema = Yup.object().shape({
  //   Designation: Yup.object()
  //     .nullable()
  //     .required("Designation is required"),
  //   location: Yup.object()
  //     .nullable()
  //     .required("Location is required"),
  //   gate: Yup.object()
  //     .nullable()
  //     .required("Gate is required"),
  //   function: Yup.object()
  //     .nullable()
  //     .required("Function is required"),

  //   shift: Yup.object()
  //     .nullable()
  //     .required("Shift is required"),
  // });

  const [Color, setColor] = useState("");
  const { toggleSidebar, broken, rtl } = useProSidebar();

  // const validationSchema = Yup.object().shape({
  //   Department: Yup.object()
  //     .nullable()
  //     .required("Department is required"),

  // });
  // const LcvalidationSchema = Yup.object().shape({
  //   leavetype: Yup.object()
  //     .nullable()
  //     .required("Leave Type is required"),
  // });
  // const { setFieldValue } = useFormikContext();
  useEffect(() => {
    dispatch(fetchApidata(accessID, "get", recID));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  // const [iniProcess, setIniProcess] = useState(true);
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

  // const contactvalidationSchema = Yup.object({
  //   aadharcardnumber: Yup.string()
  //     .nullable()
  //     .notRequired()
  //     .test(
  //       'aadharcardnumber',
  //       'Aadhar Number must be exactly 12 digits',
  //       (value) => !value || /^\d{12}$/.test(value)
  //     ),

  //   pfnumber: Yup.string()
  //     .nullable()
  //     .notRequired()
  //     .test(
  //       'pfnumber',
  //       'PF Number must be exactly 22 alphanumeric characters',
  //       (value) => !value || /^[A-Za-z0-9]{22}$/.test(value)
  //     ),

  //   email: Yup.string()
  //     .email('Invalid email format')
  //     .matches(
  //       /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|co|in)$/,
  //       'Email must be valid'
  //     )
  //     .required('Email is required'), // Email is still required

  //   esinumber: Yup.string()
  //     .nullable()
  //     .notRequired()
  //     .test(
  //       'esinumber',
  //       'ESI Number must be exactly 17 digits',
  //       (value) => !value || /^\d{17}$/.test(value)
  //     ),

  //   phonenumber: Yup.string()
  //     .nullable()
  //     .notRequired()
  //     .test(
  //       'phonenumber',
  //       'Phone Number must be valid',
  //       (value) => !value || /^\d{10}$/.test(value)
  //     ),
  // });

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
  // const moduleIDs = (Data.Module || "")
  //   .split(",")
  //   .map(v => v.trim())
  //   .filter(v => v !== "" && v.toLowerCase() !== "selected")
  //   .map(name => {
  //     const match = fetchedData?.Data.find(item => item.Name === name);
  //     return match ? match.ID : null;
  //   })
  //   .filter(id => id !== null);

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
              : Data.EmpType === "Student"
                ? "ST"
                : Data.EmpType === "Intern"
                  ? "IN"
                  : "",
    checkbox: Data.Disable,
    scrummaster: Data.ScrumMaster === "Y" ? true : false,
    prjmanager: Data.ProjectManager === "Y" ? true : false,
    qualityassurance: Data.QualityAssurance === "Y" ? true : false,
    joindate: Data.DateOfJoin,
    dateofbirth: Data.DateOfBirth,
    confirmdate: Data.DateOfConfirmation,
    Comm: Data.Comm,
    SortOrder: Data.SortOrder || 0,
    delete: Data.DeleteFlag === "Y" ? true : false,
    Mgr: Data.Mgr,
    Sal: Data.Sal,
    Fax: Data.Fax,
    //module:Data.Module,
    // module: Data.Module
    //   ? Data.Module.split(",")
    //     .map(v => v.trim())
    //     .filter(v => v !== "")
    //   : []

    // moduleSelect: mode === "E" ? Data.Module : ""
    //  moduleSelect:moduleIDs,
  };

  console.log(
    "🚀 ~ Editemployee ~ Data.Module:",
    initialValues.employeetype,
    Data.EmpType
  );
  // const [apiReturnValue, setApiReturnValue] = useState(null);

  // // 2. Initialize state
  const [apiReturnValue, setApiReturnValue] = useState("");

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
  const [itemslookup, SetItemslookup] = useState(null);

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
      QualityAssurance: values.qualityassurance === true ? "Y" : "N",
      Job: values.Job,
      Mgr: values.Mgr,
      Sal: "",
      EmpType: values.employeetype,
      DateOfJoin: values.joindate,
      DateOfBirth: values.dateofbirth,
      DateOfConfirmation: values.confirmdate,
      Comm: values.Comm,
      Password: values.Password,
      DeleteFlag: values.delete == true ? "Y" : "N",
      Module: apiReturnValue,
      // DesignID: 0,
      // LocationRecID: 0,
      // GateRecID: 0,
      // WeekOff: 0,
      CompanyID,
      SubscriptionCode,
      ClassificationID: parentID ? parentID : 0,
    };
    console.log("🚀 ~ fnSave ~ saveData:", saveData);
    console.log(apiReturnValue, "moduleselect");
    //  return;
    const data = await dispatch(
      // postData({ accessID, action, idata: saveData })
      postData({ accessID: "TR027V1", action, idata: saveData })
    );
    // const data = await dispatch(postApidatawol(accessID, action, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      dispatch(fetchApidata(accessID, "get", recID));

      setLoading(false);
      if (del) {
        // navigate(`/Apps/TR027/Personnel`);
        navigate(`/Apps/SecondarylistView/Classification/TR027/Personnel/${parentID}`, { state: { ...state } });
      } 
      // else {
      //   navigate(
      //     // `/Apps/TR027/Personnel/EditPersonnel/${data.payload.Recid}/E`,
      //     `/Apps/SecondarylistView/Classification/TR027/Personnel/${parentID}/EditPersonnel/${data.payload.Recid}/E`, { state: { ...state } });
      // }
      else {

    navigate(
      is00123Subscription
        ? `/Apps/SecondarylistView/Classification/TR027/Personnel/${parentID}/EditPersonnel/${data.payload.Recid}/E`
        : `/Apps/TR027/Personnel/EditPersonnel/${data.payload.Recid}/E`,
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
      dispatch(
        fetchExplorelitview(
          "TR038",
          "Skills",
          `${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      dispatch(fetchApidata(accessID, "get", recID));
      selectcelldata("", "A", "");
    }
    if (event.target.value == "13") {
      dispatch(
        fetchExplorelitview(
          "TR302",
          "Locality",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "2") {
      dispatch(
        fetchExplorelitview(
          "TR125",
          "Function",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "3") {
      dispatch(fetchApidata(accessID, "get", recID));
      dispatch(
        fetchExplorelitview(
          "TR126",
          "Manager",
          `parentID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
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
        fetchExplorelitview(
          "TR210",
          "Attachment",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "7") {
      dispatch(
        fetchExplorelitview(
          "TR212",
          "itemcustody",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "17") {
      dispatch(
        fetchExplorelitview(
          "TR212",
          "itemcustody",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    //ITEMSERVICES
    if (event.target.value == "14") {
      dispatch(
        fetchExplorelitview(
          "TR309",
          "itemservices",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    //Contractor
    // if (event.target.value == "8") {
    //   dispatch(
    //     fetchExplorelitview(
    //       "TR244",
    //       "Contracts In",
    //       `EmployeeID='${recID}' AND Vendors='Y' AND CompanyID=${CompanyID}`,
    //       ""
    //     )
    //   );

    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    if (event.target.value == "8") {

      dispatch(getDeployment({ HeaderID: recID }));
      dispatch(EmployeeVendorGetController({ EmployeeID: recID, CompanyID: CompanyID, action: "get" }))
      const designationName =
        Data?.DesignDesc ||
        deploymentInitialValue?.Designation?.Name ||
        "";

      const isStudent = designationName === "Student";
      // const isStudent =
      //   Data.DesignationName === "Student" ||
      //   deploymentInitialValue?.Designation?.Name === "Student";

      const filterCondition = isStudent
        ? `EmployeeID='${recID}' AND ParentCheckBox='Y' AND CompanyID=${CompanyID}`
        : `EmployeeID='${recID}' AND Vendors='Y' AND CompanyID=${CompanyID}`;

      console.log("filterCondition", filterCondition);

      dispatch(
        fetchExplorelitview("TR244", "Contracts In", filterCondition, "")
      );

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }

    if (event.target.value == "11") {
      dispatch(
        fetchExplorelitview(
          "TR244",
          "Contracts Out",
          `EmployeeID='${recID}' AND Customer='Y' AND CompanyID=${CompanyID}`,
          ""
        )
      );

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "9") {
      dispatch(geolocationData({ empID: recID }));
      // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "15") {
      dispatch(EmployeeVendorGetController({ EmployeeID: recID, CompanyID: CompanyID, action: "get" }))
      // setShowContacts(false);
      // dispatch(
      //   fetchExplorelitview(
      //     "TR321",
      //     "Party",
      //     // `ParentCheckBox = "Y" AND CompanyID=${CompanyID}`,
      //     `CompanyID=${CompanyID}`,
      //     ""
      //   )
      // );

      // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    }
    if (event.target.value == "16") {
      dispatch(EmployeeVendorGetController({ EmployeeID: recID, CompanyID: CompanyID, action: "get" }))
      dispatch(EmployeeVendorContactGet({ EmployeeID: recID, VendorID: ParentgetData.RecordID, CompanyID: CompanyID, action: "get" }));
    }
    if (event.target.value == "10") {
      dispatch(
        fetchExplorelitview(
          "TR249",
          "Leave Configuration",
          `EmployeeID='${recID}' AND CompanyID=${CompanyID}`,
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
    // setIniProcess(true);
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
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };

  /******************************save  Function********** */
  const fnProcess = async (values, resetForm, types) => {


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
      setLoading(false);
      dispatch(fetchExplorelitview("TR038", "Skills", recID, ""));
      resetForm();
      toast.success(data.payload.Msg);
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
    phonenumber: DataExplore.PhoneNumber,
    imageurl: viewImage,
    email: DataExplore.Email,
    aadharcardnumber: DataExplore.AadharCardNo,
    pfnumber: DataExplore.PfNo,
    esinumber: DataExplore.EsiNo,
    permanentaddress: DataExplore.PermanentAddress,
    localaddress: DataExplore.LocalAddress,
    FatherName: DataExplore.FathersName,
    AccountNumber: DataExplore.AccountNumber,
    AccountHoldersName: DataExplore.AccountHoldersName,
    IfscCode: DataExplore.IfscCode,
    Branch: DataExplore.Branch,
  };


  const fncontact = async (values, resetForm) => {
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
      FathersName: values.FatherName,
      Branch: values.Branch,
      IfscCode: values.IfscCode,
      AccountHoldersName: values.AccountHoldersName,
      AccountNumber: values.AccountNumber,
    };
    type = "update";

    console.log("save" + JSON.stringify(saveData));

    const data = await dispatch(postApidata("TR209", type, saveData));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));
      selectCellRowData({
        rowData: DataExplore,
        mode: "E",
        field: "",
      });

      resetForm({
        values: {
          ...contactInitialvalues,
        },
      });

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
    VISIBLE_FIELDS = [
      "slno",
      "NextRenewalRequiredDate",
      "Description",
      "Category",
      "action",
    ];
  } else if (show == "1") {
    VISIBLE_FIELDS = ["slno", "Skills", "Comments", "action"];
  } else if (show == "3") {
    VISIBLE_FIELDS = ["slno", "Manager", "action"];
  } else if (show == "2") {
    VISIBLE_FIELDS = ["slno", "Functions", "action"];
  } else if (show == "7") {
    VISIBLE_FIELDS = ["slno", "ItemNumber", "ItemName", "ItemValue", "PurchaseReference", "AssestID", "action"];
  } else if (show == "17") {
    VISIBLE_FIELDS = ["slno", "Itemgroup", "Item", "ItemValue", "PurchaseReference", "AssestID", "action"];
  } else if (show == "13") {
    VISIBLE_FIELDS = ["slno", "Locality", "Pincode", "action"];
  } else if (show == "14") {
    VISIBLE_FIELDS = [
      "slno",
      "Item",
      "Party",
      "EISDate",
      "Complaints",
      "CompletedDate",
      "ExpectedReturnDate",
      "ActualReturnDate",
      "TentativeCharges",
      "ActualCharges",
      "Comments",
      "action",
    ];
  } else if (show == "8") {
    VISIBLE_FIELDS = [
      "slno",
      "VendorName",
      "Description",
      "BillingUnits",
      "UnitRate",
      "action",
    ];
  }
  else if (show == "15") {
    VISIBLE_FIELDS = [
      "slno",
      "Party",
      "LocalityName",
      "HrMobileNo",
      "HrEmailID",
      "action",
    ];
  } else if (show == "11") {
    VISIBLE_FIELDS = [
      "slno",
      "VendorCode",
      "VendorName",
      "Description",
      "BillingUnits",
      "UnitRate",
      "action",
    ];
  } else if (show == "10") {
    VISIBLE_FIELDS = [
      "slno",
      "LeavePart",
      "AvailDays",
      "EligibleDays",
      "action",
    ];
  } else {
    VISIBLE_FIELDS = [
      "slno",
      "EmployeeCode",
      "EmployeeName",
      "DesignationCode",
      "DesignationName",
      "action",
    ];
  }

  // const columns = React.useMemo(
  //   () =>
  //     explorelistViewcolumn.filter((column) =>
  //       VISIBLE_FIELDS.includes(column.field)
  //     ),
  //   [explorelistViewcolumn]
  // );
  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };
  const handlePagechange1 = (pageno) => {
    setPage1(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };
  const handlePagechange2 = (pageno) => {
    setPage2(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };
  const columns = React.useMemo(() => {
    let visibleColumns = explorelistViewcolumn.filter((column) =>
      VISIBLE_FIELDS.includes(column.field)
    );

    if (VISIBLE_FIELDS.includes("slno")) {
      //  const slnoColumn = {
      //   field: "slno",
      //   headerName: "SL#",
      //   width: 50,
      //   sortable: false,
      //   filterable: false,
      //   valueGetter: (params) =>
      //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
      // };
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
  const columns1 = React.useMemo(() => {
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
          page1 * pageSize1 +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1,
      };
      visibleColumns = [slnoColumn, ...visibleColumns];
    }

    return visibleColumns;
  }, [explorelistViewcolumn, VISIBLE_FIELDS]);
  const columns2 = React.useMemo(() => {
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
          page2 * pageSize2 +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1,
      };
      visibleColumns = [slnoColumn, ...visibleColumns];
    }

    return visibleColumns;
  }, [explorelistViewcolumn, VISIBLE_FIELDS]);
  // **********Grid header function************
  const [rowCount, setRowCount] = useState(0);
  const formatTwoDecimals = (value) => {
    if (value === "" || value === null || value === undefined) return "0.00";
    const num = Number(value);
    if (isNaN(num)) return "0.00";
    return num.toFixed(2);
  };

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
                      : show == "13"
                        ? "List of Localities"
                        : show == "14"
                          ? "List of Services"
                          : show == "15"
                            ? "List of Parent"
                            : show == "17"
                              ? "List of Item Custody"
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
    functionLookup: null,
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
  const [itemCustodyData1, setItemCustodyData1] = useState({
    recordID: "",
    itemGroup: null,
    items: null,
    assestID: "",
    itemValue: "",
    reference: "",
  });
  console.log("🚀 ~ Editemployee ~ itemCustodyData:", itemCustodyData);

  // const [itemServicesData, setItemServicesData] = useState({
  //   recordID: "",
  //   servicedate: "",
  //   complaints: "",
  //   tentativecharge: "",
  //   returndate: "",
  //   completeddate: "",
  //   actualreturndate: "",
  //   actualcharges: "",
  //   servicecomments: "",
  //   vendors: "",
  //   items: "",
  // });
  const [localityData, setLocalityData] = useState({
    recordID: "",
    localitycode: "",
    localityname: "",
    LCpincode: "",
  });

  //Contractor

  const [contractorData, setContractorData] = useState({
    recordID: "",
    Description: "",
    fromperiod: "",
    toperiod: "",
    units: "",
    BillingType: "",
    unitrate: "",
    alertdate: "",
    renewalperiod: "",
    vendor: "",
    hsnCode: "",
    cgst: "",
    sgst: "",
    igst: "",
    tds: "",
    shift: "",
    shift2: "",
    project: "",
  });
  const [LeaveCondata, setLeaveCondata] = useState({
    recordID: "",
    LeaveTypeID: "",
    totaldays: "",
    availableleave: "",
    elligibledays: "",
    Year: "",
  });
  const [empLoaData, SetEmpLoaData] = useState({
    recordID: "",
    description: "",
    category: "",
    RenewalDate: "",
    personal: false,
    renewal: false,
    Attachment: "",
  });
  const [ParentData, setParentData] = useState({
    recordID: "",
    code1: "",
    name1: "",
    mobilenumber: "",
    emailid: "",
    address: "",
    locality: "",
    maplink: "",
    ReferenceBy: ""
  });
  const selectCellRowData = ({ rowData, mode, field, setFieldValue }) => {
    setFunMode(mode);
    setLaoMode(mode);

    if (mode == "A") {
      dispatch(EmployeeVendorGetController({ EmployeeID: recID, CompanyID: CompanyID, action: "get" }))

      setFunMgrRecID("");
      setFunEmpRecID("");
      SetFunctionLookup(null);
      SetVendorlookup(null);
      SetItemslookup(null);
      SetCustomerlookup(null);
      SetEmpLoaData({
        description: "",
        Attachment: "",
        recordID: "",
        category: "",
        RenewalDate: "",
        personal: false,
        renewal: false,
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
      setItemCustodyData1({
        recordID: "",
        itemGroup: null,
        items: null,
        assestID: "",
        itemValue: "",
        reference: "",
      });
      setParentData({
        recordID: "",
        code1: "",
        name1: "",
        mobilenumber: "",
        emailid: "",
        address: "",
        locality: "",
        maplink: "",
        ReferenceBy: ""
      });
      setItemServicesData({
        recordID: "",
        servicedate: "",
        complaints: "",
        tentativecharge: "",
        returndate: "",
        completeddate: "",
        actualreturndate: "",
        actualcharges: "",
        servicecomments: "",
        vendors: "",
        items: "",
      });
      setLocalityData({
        recordID: "",
        localitycode: "",
        localityname: "",
        LCpincode: "",
      });
      setselectLeaveconLTData(null);
      setContractorData({
        recordID: "",
        Description: "",
        fromperiod: "",
        toperiod: "",
        units: "",
        BillingType: "",
        unitrate: "",
        alertdate: "",
        renewalperiod: "",
        vendor: is003Subscription === true &&
          ParentgetData?.RecordID &&
          ParentgetData.RecordID !== "0"
          ? {
            RecordID: ParentgetData.RecordID,
            Code: ParentgetData.Code,
            Name: ParentgetData.Name,
          }
          : null,

        hsnCode: "",
        cgst: "",
        sgst: "",
        igst: "",
        tds: "",
        shift: "",
        shift2: "",
        project: "",
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
      console.log(rowData.Description, "rowData.Description");
      console.log(rowData.Category, "rowData.Category");
      if (field == "action") {
        setFunEmpRecID(rowData.RecordID);
        // SetFunctionLookup({
        // RecordID: rowData.FunctionsID,
        // Code: rowData.FunctionCode,
        // Name: rowData.FunctionName,
        // });

        // SetVendorlookup({
        //   RecordID: rowData.Vendor,
        //   Code: rowData.VendorCode,
        //   Name: rowData.VendorName,

        // });
        // SetCustomerlookup({
        //   RecordID: rowData.Vendor,
        //   Code: rowData.VendorCode,
        //   Name: rowData.VendorName,
        // });

        SetEmpLoaData({
          description: rowData.Description,
          recordID: rowData.RecordID,
          category: rowData.Category,
          RenewalDate: rowData.NextRenewalRequiredDate,
          personal: rowData.Personal,
          renewal: rowData.RenewalRequired,
          Attachment: rowData.Attachment,
        });
        setImgName(rowData.Attachment);
        setItemCustodyData({
          recordID: rowData.RecordID,
          itemNO: rowData.ItemNumber,
          itemName: rowData.ItemName,
          assestID: rowData.AssestID,
          itemValue: rowData.ItemValue,
          reference: rowData.PurchaseReference,
        });
        setItemCustodyData1({
          recordID: rowData.RecordID,
          itemGroup: rowData.ItemGroupID
            ? {
              RecordID: rowData.ItemGroupID,
              Itemgroup: rowData.Itemgroup,
            }
            : null,
          items: rowData.ItemID
            ? {
              RecordID: rowData.ItemID,
              Code: rowData.Item,
            }
            : null,
          assestID: rowData.AssestID,
          itemValue: rowData.ItemValue,
          reference: rowData.PurchaseReference,
        });
        // setParentData({
        //   recordID: rowData.RecordID,
        //   code1: rowData.Code,
        //   name1: rowData.Name,
        //   mobilenumber: rowData.HrMobileNo,
        //   emailid: rowData.HrEmailID,
        //   address: rowData.Address,
        //   locality: rowData.LocalityID
        //     ? {
        //       RecordID: rowData.LocalityID,
        //       Code: rowData.LocalityCode,
        //       Name: rowData.LocalityName,
        //     }
        //     : null,
        //   maplink: rowData.MapLocation,
        //   ReferenceBy: rowData.ReferenceID
        //     ? {
        //       RecordID: rowData.ReferenceID,
        //       Code: rowData.ReferenceCode,
        //       Name: rowData.ReferenceName,
        //     }
        //     : null,
        // });
        const formatDateForInputItems = (dateStr) => {
          if (!dateStr) return "";
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month}-${day}`;
        };
        setItemServicesData({
          recordID: rowData.RecordID,
          servicedate: formatDateForInputItems(rowData.EISDate) || "",
          complaints: rowData.Complaints || "",
          tentativecharge: rowData.TentativeCharges || "",
          returndate: formatDateForInputItems(rowData.ExpectedReturnDate) || "",
          completeddate: formatDateForInputItems(rowData.CompletedDate) || "",
          actualreturndate:
            formatDateForInputItems(rowData.ActualReturnDate) || "",
          actualcharges: rowData.ActualCharges || "",
          servicecomments: rowData.Comments || "",
          vendors: rowData.PartyID
            ? {
              RecordID: rowData.PartyID,
              Code: rowData.PartyCode || "",
              Name: rowData.PartyName || "",
            }
            : null,
          // items: rowData.ItemcustodyID
          //   ? {
          //     RecordID: rowData.ItemcustodyID,
          //     Code: rowData.ItemCode || "",
          //     Name: rowData.ItemName || "",
          //   }
          //   : null,
          items: rowData.ItemID
            ? {
              RecordID: rowData.ItemID,
              Code: rowData.Item || "",
              Name: rowData.ItemName || "",
            }
            : null,
        });
        setLocalityData({
          recordID: rowData.RecordID,
          localitycode: rowData.Code,
          localityname: rowData.Name,
          LCpincode: rowData.Pincode,
        });

        setContractorData({
          recordID: rowData.RecordID,
          Description: rowData.Description,
          fromperiod: rowData.FromPeriod,
          toperiod: rowData.ToPeriod,
          units: rowData.BillingUnits,
          BillingType: rowData.BillingType,
          unitrate: rowData.UnitRate,
          alertdate: rowData.NotificationAlertDate,
          renewalperiod: rowData.RenewableNotification,
          vendor: rowData.VendorID
            ? {
              RecordID: rowData.VendorID,
              Code: rowData.VendorCode,
              Name: rowData.VendorName,
            }
            : null,
          project: rowData.ProjectID
            ? {
              RecordID: rowData.ProjectID,
              Code: rowData.ProjectCode,
              Name: rowData.ProjectName,
            }
            : null,
          hsnCode: rowData.Hsn,
          cgst: rowData.Gst,
          sgst: rowData.Sgst,
          igst: rowData.Igst,
          tds: rowData.Tds,
          shift: rowData.ShiftID
            ? {
              RecordID: rowData.ShiftID,
              Code: rowData.ShiftCode,
              Name: rowData.ShiftName,
            }
            : null,
          shift2: rowData.ShiftID
            ? {
              RecordID: rowData.ShiftID2,
              Code: rowData.ShiftCode2,
              Name: rowData.ShiftName2,
            }
            : null,
        });
        setselectLeaveconLTData({
          RecordID: rowData.LeaveTypeID,
          Code: "",
          Name: rowData.LeavePart,
        });
        // setFieldValue("leavetype", {
        //   RecordID: rowData.LeaveTypeID,
        //   Code: "",
        //   Name: rowData.LeavePart,
        // })

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
        setFieldValue("functionLookup", {
          RecordID: rowData.FunctionsID,
          Code: rowData.FunctionCode,
          Name: rowData.FunctionName,
        });

        setFieldValue("vendors", {
          RecordID: rowData.PartyID,
          Code: rowData.PartyCode,
          Name: rowData.PartyName,
        });
        setFieldValue("items", {
          RecordID: rowData.RecordID,
          Code: rowData.ItemNumber,
          Name: rowData.ItemName,
        });
        setFieldValue("customer", {
          RecordID: rowData.VendorID,
          Code: rowData.VendorCode,
          Name: rowData.VendorName,
        });
        setFieldValue("vendor", {
          RecordID: rowData.VendorID,
          Code: rowData.VendorCode,
          Name: rowData.VendorName,
        });
        setFieldValue("project", {
          RecordID: rowData.ProjectID,
          Code: rowData.ProjectCode,
          Name: rowData.ProjectName,
        });
        setFieldValue("shift", {
          RecordID: rowData.ShiftID,
          Code: rowData.ShiftCode,
          Name: rowData.ShiftName,
        });
        setFieldValue("shift2", {
          RecordID: rowData.ShiftID2,
          Code: rowData.ShiftCode2,
          Name: rowData.ShiftName2,
        });
        setFieldValue("locality", {
          RecordID: rowData.LocalityID,
          Code: rowData.LocalityCode,
          Name: rowData.LocalityName,
        });
        setFieldValue("ReferenceBy", {
          RecordID: rowData.ReferenceID,
          Code: rowData.ReferenceCode,
          Name: rowData.ReferenceName,
        });
      }
    }
    console.log(selectCellRowData, "Itemservices");
  };

  const selectCellRowDataMGR = ({ rowData, mode, field, setFieldValue }) => {
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
      });
    } else {
      if (field == "action") {
        SetDesignationLookup({
          RecordID: rowData.EmployeeID,
          DesignationID: rowData.DesignationID,
          Code: rowData.EmployeeCode,
          Name: rowData.EmployeeName,
        });
        // setFieldValue("manager", {
        //   RecordID: rowData.EmployeeID,
        //   DesignationID: rowData.DesignationID,
        //   Code: rowData.EmployeeCode,
        //   Name: rowData.EmployeeName,
        // });
        setLevelLookup({
          levelfield: rowData.Level,
          hrmanager: rowData.HrManager == "Y" ? true : false,
          financemanager: rowData.FinanceManager == "Y" ? true : false,
          projectmanager: rowData.ProjectManager == "Y" ? true : false,
          facilitymanager: rowData.FacilityManager == "Y" ? true : false,
        });
        setFunMgrRecID(rowData.RecordID);
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
      // FunctionsID: functionLookup ? functionLookup.RecordID : 0,
      // FunctionName: functionLookup ? functionLookup.Name : "",
      // FunctionsID: values.function.Code || "",
      FunctionName: values?.functionLookup?.Name || "",
      FunctionsID: values?.functionLookup?.RecordID,
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
  const ParentInitialValue = {
    // code: ParentgetData.Code,
    // description: ParentgetData.Name,
    code1: ParentgetData.Code || "",
    name1: ParentgetData.Name || "",
    locality: ParentgetData.LocalityID && ParentgetData.LocalityID !== "0"
      ? {
        RecordID: ParentgetData.LocalityID,
        Code: ParentgetData.LocalityCode,
        Name: ParentgetData.LocalityName,
      }
      : null,
    ReferenceBy:
      ParentgetData.ReferenceID && ParentgetData.ReferenceID !== "0"
        ? {
          RecordID: ParentgetData.ReferenceID,
          Code: ParentgetData.ReferenceByName,
          Name: ParentgetData.ReferenceByName,
        }
        : null, address: ParentgetData.Address || "",
    maplink: ParentgetData.MapLocation || "",
    mobilenumber: ParentgetData.MobileNo || "",
    emailid: ParentgetData.EmailID || "",
    address: ParentgetData.Address || "",
    maplink: ParentgetData.MapLocation || "",
    PanImg: ParentgetData.PanImg || "",
    GstImg: ParentgetData.gstImage || "",
    gstnumber: ParentgetData.GstNo || "",
    mobilenumber: ParentgetData.MobileNo || "",
    date: ParentgetData.RegistrationDate || "",
    verifieddate: ParentgetData.VerifyConfirmDate || "",
    emailid: ParentgetData.EmailID || "",
    vendor: ParentgetData.VendorCheckbox === "Y" ? true : false,
    customer: ParentgetData.CustomerCheckbox === "Y" ? true : false,
    prospect: ParentgetData.Prospects === "Y" ? true : false,
    delete: ParentgetData.DeleteFlag === "Y" ? true : false,
    BusinessPartner: ParentgetData.BusinessPartner === "Y" ? true : false,
    Parent: ParentgetData.ParentCheckBox === "Y" ? true : false,
    disable: ParentgetData.Disable === "Y" ? true : false,
  };
  console.log(ParentInitialValue, "ParentInitialValue");
  const Fnsave = async (values, resetForm, del) => {
    setLoading(true);

    // let action =
    //   funMode === "A" && !del
    //     ? "insert"
    //     : funMode === "E" && del
    //       ? "harddelete"
    //       : "update";
    const recordId = ParentgetData?.RecordID ?? -1;

    let action;
    if (del) {
      action = "harddelete";
    } else if (recordId !== -1 && recordId !== "-1") {
      action = "update";
    } else {
      action = "insert";
    }

    const payload = {
      action,
      data: {
        RecordID: ParentgetData.RecordID || -1,
        // RecordID: "-1",
        Code: values.code1 || "",
        Name: values.name1 || "",
        LocalityID: values.locality?.RecordID || 0,
        LocalityName: values.locality?.Name || "",
        ReferenceID: values.ReferenceBy?.RecordID || 0,
        ReferenceName: values.ReferenceBy?.Name || "",
        PanCardNo: values.Pancardnumber || "0",
        Address: values.address || "",
        MapLocation: values.maplink || "",
        PanImg: panImage || "",
        GstNo: values.gstnumber || "0",
        GstImg: gstImage || "",
        MobileNo: values.mobilenumber || "",
        RegistrationDate: values.date || "",
        VerifyConfirmDate: values.verifieddate || "",
        EmailID: values.emailid || "",
        CompanyID,
        VendorCheckbox: values.vendor ? "Y" : "N",
        CustomerCheckbox: values.customer ? "Y" : "N",
        Prospects: values.prospect ? "Y" : "N",
        DeleteFlag: values.delete ? "Y" : "N",
        BusinessPartner: values.BusinessPartner ? "Y" : "N",
        ParentCheckBox: "Y",
        Disable: values.disable ? "Y" : "N",
        Source: "Cloud",
        CreateBy: LoginID,
        EmployeeID: recID
      }
    };


    try {
      const response = await dispatch(partypost(payload));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        // navigate(-1)
        dispatch(EmployeeVendorGetController({ EmployeeID: recID, CompanyID: CompanyID, action: "get" }))
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };
  const parentcontactInitialValue = {
    code: Data.Code || "",
    name: Data.Name || "",
    name1: ParentcontactgetData.ContactPerson1 || "",
    name2: ParentcontactgetData.ContactPerson2 || "",
    emailid1: ParentcontactgetData.ContactPersonEmailID1 || "",
    emailid2: ParentcontactgetData.ContactPersonEmailID2 || "",
    mobileno1: ParentcontactgetData.ContactPersonMobileNo1 || "",
    mobileno2: ParentcontactgetData.ContactPersonMobileNo2 || "",
    aadharcardnumber1: ParentcontactgetData.AadhaarNoOne || "",
    aadharcardnumber2: ParentcontactgetData.AadhaarNoTwo || "",
    ContactPersonIDProofImg1:
      ParentcontactgetData.ContactPersonIDProofImg1 || "",
    ContactPersonIDProofImg2:
      ParentcontactgetData.ContactPersonIDProofImg2 || "",
  };
  console.log("parentcontactInitialValue:", parentcontactInitialValue);
  const contactsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      VendorID: ParentgetData.RecordID,
      ContactPerson1: values.name1,
      ContactPerson2: values.name2,
      ContactPersonEmailID1: values.emailid1,
      ContactPersonEmailID2: values.emailid2,
      ContactPersonMobileNo1: values.mobileno1,
      ContactPersonMobileNo2: values.mobileno2,
      AadhatNo1: values.aadharcardnumber1,
      AadhatNo2: values.aadharcardnumber2,
      // ContactPersonIDProofImg1: data.ContactPersonIDProofImg1 || ID1Image,
      // ContactPersonIDProofImg2: data.ContactPersonIDProofImg2 || ID2Image,
      ContactPersonIDProofImg1: ID1Image || ParentcontactgetData.ContactPersonIDProofImg1 || "",
      ContactPersonIDProofImg2: ID2Image || ParentcontactgetData.ContactPersonIDProofImg2 || "",
    };

    try {
      const response = await dispatch(partyContactData({ action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // setShowContacts(false)
        // navigate("/Apps/TR243/Party");
        dispatch(EmployeeVendorContactGet({ EmployeeID: recID, VendorID: ParentgetData.RecordID, CompanyID: CompanyID, action: "get" }));

      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };
  const getFileID1Change = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setID1Image(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  const getFileID2Change = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setID2Image(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  // locality screen
  const localityinitialValue = {
    code: Data.Code,
    description: Data.Name,
    localitycode: localityData.localitycode,
    localityname: localityData.localityname,
    LCpincode: localityData.LCpincode,
  };
  const FnLocalilty = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: localityData.recordID,
      EmployeeID: recID,
      Name: values.localityname,
      Code: values.localitycode || "",
      Pincode: values.LCpincode,
      CompanyID,
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR302", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      dispatch(
        fetchExplorelitview(
          "TR302",
          "Locality",
          `EmployeeID=${recID} AND CompanyID=${CompanyID}`,
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
  // *************** ITEMCUSTODY SCREEN SAVE FUNCTION *************** //

  const itemcustodyInitialValue = useMemo(() => ({
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    Disable: "N",
    recordID: itemCustodyData.recordID || "",
    ItemNumber: itemCustodyData.itemNO || "",
    ItemName: itemCustodyData.itemName || "",
    AssestID: itemCustodyData.assestID || "",
    ItemValue: itemCustodyData.itemValue || "",
    PurchaseReference: itemCustodyData.reference || "",
  }), [Data, itemCustodyData]);

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
  const [itemServicesData, setItemServicesData] = useState({
    recordID: "",
    servicedate: "",
    complaints: "",
    tentativecharge: "",
    returndate: "",
    completeddate: "",
    actualreturndate: "",
    actualcharges: "",
    servicecomments: "",
    vendors: "",
    items: "",
  });
  console.log("🚀 ~ Editemployee ~ itemServicesData:", itemServicesData);

  // const itemservicesInitialValue = {
  //   code: Data.Code,
  //   description: Data.Name,
  //   imageurl: Data.ImageName
  //     ? store.getState().globalurl.imageUrl + Data.ImageName
  //     : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  //   items: itemServicesData.items || null,
  // vendors: itemServicesData.vendors || null,
  // servicedate: itemServicesData.servicedate || "",
  // complaints: itemServicesData.complaints || "",
  // tentativecharge: itemServicesData.tentativecharge || "",
  // returndate: itemServicesData.returndate || "",
  // completeddate: itemServicesData.completeddate || "",
  // actualreturndate: itemServicesData.actualreturndate || "",
  // actualcharges: itemServicesData.actualcharges || "",
  // servicecomments: itemServicesData.servicecomments || "",
  // };
  const itemservicesInitialValue = useMemo(
    () => ({
      code: Data.Code,
      description: Data.Name,
      imageurl: Data.ImageName
        ? store.getState().globalurl.imageUrl + Data.ImageName
        : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
      recordID: itemServicesData.recordID || "",
      servicedate: itemServicesData.servicedate || "",
      complaints: itemServicesData.complaints || "",
      tentativecharge: itemServicesData.tentativecharge || "",
      returndate: itemServicesData.returndate || "",
      completeddate: itemServicesData.completeddate || "",
      actualreturndate: itemServicesData.actualreturndate || "",
      actualcharges: itemServicesData.actualcharges || "",
      servicecomments: itemServicesData.servicecomments || "",
      vendors: itemServicesData.vendors || null,
      items: itemServicesData.items || null,
    }),
    [Data, itemServicesData]
  );

  const empItemServicesFn = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: itemServicesData.recordID,
      EmployeeID: recID,
      ItemcustodyID: values?.items?.RecordID || 0,
      PartyID: values?.vendors?.RecordID || 0,
      PartyName: values?.vendors?.Name || "",
      PartyCode: values?.vendors?.Code || "",
      EISDate: values.servicedate,
      Complaints: values.complaints || "",
      CompletedDate: values.completeddate || "",
      ExpectedReturnDate: values.returndate || "",
      ActualReturnDate: values.actualreturndate || "",
      TentativeCharges: values.tentativecharge || "0",
      ActualCharges: values.actualcharges || "0",
      Comments: values.servicecomments || "",
      CompanyID,
    };
    // console.log("save" + JSON.stringify(saveData));

    const response = await dispatch(
      explorePostData({ accessID: "TR309", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      dispatch(
        fetchExplorelitview("TR309", "ItemServices", `EmployeeID=${recID}`, "")
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
    vendor: contractorData.vendor || null,
    customer: contractorData.vendor || null,
    BillingUnits:
      contractorData.units === "Hours"
        ? "HS"
        : contractorData.units === "Days"
          ? "DS"
          : contractorData.units === "Weeks"
            ? "WS"
            : contractorData.units === "Months"
              ? "MS"
              : "",
    BillingType:
      contractorData.BillingType === "CashMemo"
        ? "CashMemo"
        : contractorData.BillingType === "GSTInvoice"
          ? "GSTInvoice"
          : "",
    Hsn: funMode === "A" ? "000000" : contractorData.hsnCode,
    Gst: contractorData.cgst,
    Sgst: contractorData.sgst,
    Igst: contractorData.igst,
    TDS: contractorData.tds,
    UnitRate: contractorData.unitrate || "0.00",
    NotificationAlertDate: contractorData.alertdate,
    RenewableNotification: contractorData.renewalperiod || "",
    Description: contractorData.Description,
    project: contractorData.project || null,
    shift: contractorData.shift || null,
    shift2: contractorData.shift2 || null,
  };
  // console.log(contractorData, "--get a contractorData");
  console.log(Data.DesignationName, "--contract idata");

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
      // Vendor:
      //   show == "8"
      //     ? vendorlookup
      //       ? vendorlookup.RecordID
      //       : 0
      //     : show == "11"
      //       ? customerlookup
      //         ? customerlookup.RecordID
      //         : 0
      //       : 0,
      // VendorName:
      //   show == "8"
      //     ? vendorlookup
      //       ? vendorlookup.Name
      //       : 0
      //     : show == "11"
      //       ? customerlookup
      //         ? customerlookup.Name
      //         : 0
      //       : 0,
      Vendor:
        show == "8"
          ? values?.vendor?.RecordID || 0
          : show == "11"
            ? values?.customer?.RecordID || 0
            : 0,

      VendorName:
        show == "8"
          ? values?.vendor?.Name || ""
          : show == "11"
            ? values?.customer?.Name || ""
            : "",
      Description: values.Description,
      Hsn: values.Hsn || "000000",
      Gst: values.Gst || 0,
      Sgst: values.Sgst || 0,
      Igst: values.Igst || 0,
      Tds: values.TDS || 0,
      // Vendors: show == "8" ? "Y" : "N",
      // Customer: show == "11" ? "Y" : "N",
      FromPeriod: values.FromPeriod,
      ToPeriod: values.ToPeriod,
      BillingUnits: values.BillingUnits,
      BillingType: values.BillingType,
      UnitRate: values.UnitRate,
      NotificationAlertDate: values.NotificationAlertDate,
      RenewableNotification: values.RenewableNotification || 0,
      ShiftID: values?.shift?.RecordID || 0,
      // ShiftCode: values?.shift?.Code || "",
      // ShiftName: values?.shift?.Name || "",
      ShiftID2: values?.shift2?.RecordID || 0,
      ProjectID: values?.project?.RecordID || 0,
      ProjectCode: values?.project?.Code || 0,
      ProjectName: values?.project?.Name || "",
    };
    console.log(idata, "--contract idata");
    // const isStudent =
    //   Data.DesignationName === "Student" ||
    //   deploymentInitialValue?.Designation?.Name === "Student";
    const designationName =
      Data?.DesignDesc ||
      deploymentInitialValue?.Designation?.Name ||
      "";

    const isStudent = designationName === "Student";

    const filterCondition = isStudent
      ? `EmployeeID='${recID}' AND ParentCheckBox='Y' AND CompanyID=${CompanyID}`
      : `EmployeeID='${recID}' AND Vendors='Y' AND CompanyID=${CompanyID}`;
    console.log("filterCondition", Data.DesignDesc);
    const response = await dispatch(
      explorePostData({ accessID: "TR244V1", action, idata })
    );
    if (response.payload.Status == "Y") {
      setLoading(false);
      show == "8"
        ? dispatch(
          fetchExplorelitview("TR244", "Contracts In", filterCondition, "")
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
    longitude: gelocData.EMP_LONGITUDE == null ? "" : gelocData.EMP_LONGITUDE,
    latitude: gelocData.EMP_LATITUDE == null ? "" : gelocData.EMP_LATITUDE,
    radius: gelocData.EMP_RADIUS == null ? "" : gelocData.EMP_RADIUS,
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
      //resetForm();
      setScreen("9");
      dispatch(geolocationData({ empID: recID }));
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };

  //Leave Configuration
  const LCInitialValue = {
    Code: Data.Code,
    Name: Data.Name,
    leavetype: LeaveconLTData ? LeaveconLTData : null,
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
    // if (funMode === "E" && del && LeaveCondata.recordID === "") {
    //   toast.error("Please select the data to delete");
    //   setLoading(false);
    //   return;
    // }
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
      // LeaveTypeID: LeaveconLTData ? LeaveconLTData.RecordID : 0,
      // LeaveTypeName: LeaveconLTData ? LeaveconLTData.Name : "",
      LeaveTypeID: values?.leavetype?.RecordID,
      LeaveTypeName: values?.leavetype?.Name || "",
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
          `EmployeeID='${recID}'AND CompanyID=${CompanyID}`,
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
    manager: designationLookup ? designationLookup : null,
    Horizontal: Data.Horizontal === "Y" ? true : false,
    Vertical: Data.Vertical === "Y" ? true : false,
    HorizontalMimNo: Data.HorizontalMimNo,
    VerticalMimNo: Data.VerticalMimNo,
    AutoApprovalYesOrNo: Data.AutoApprovalYesOrNo === "Y" ? true : false,
    ApprovelTolerance: Data.ApprovelTolerance,
    AutoRejectionYesOrNo: Data.AutoRejectionYesOrNo === "Y" ? true : false,
    RejectionTolerance: Data.RejectionTolerance,
    Level: levellookup.levelfield,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    hrmanager: levellookup.hrmanager,
    financemanager: levellookup.financemanager,
    projectmanager: levellookup.projectmanager,
    facilitymanager: levellookup.facilitymanager,
  };
  const [funMgrRecID, setFunMgrRecID] = useState("");

  const mgrFunctionFn = async (values, resetForm, del, setFieldValue) => {
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: funMgrRecID,
      EmployeeID: recID,
      DesignationID: values.manager.DesignationID || 0,
      // ManagerID: designationLookup.RecordID || 0,
      // ManagerName: designationLookup.Name || "",
      ManagerID: values?.manager?.RecordID,
      ManagerName: values?.manager?.Name,
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
    project:
      deploymentData.DefaultProject && deploymentData.DefaultProject !== "0"
        ? {
          RecordID: deploymentData.DefaultProject,
          Code: deploymentData.ProjectCode,
          Name: deploymentData.ProjectName,
        }
        : null,
    function: deploymentData.DefaultFunction && deploymentData.DefaultFunction !== "0"
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
    shift2: deploymentData.ShiftID2
      ? {
        RecordID: deploymentData.ShiftID2,
        Code: deploymentData.ShiftCode2,
        Name: deploymentData.ShiftName2,
      }
      : null,
    checkin: deploymentData.ShiftStartTime || "",
    checkout: deploymentData.ShiftEndTime || "",
    checkin2: deploymentData.ShiftStartTime2 || "",
    checkout2: deploymentData.ShiftEndTime2 || "",
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
    office: deploymentData.Office === "Y" ? true : false,
    workfromhome: deploymentData.WorkFromHome === "Y" ? true : false,
    hybrid: deploymentData.Hybrid === "Y" ? true : false,
    onsite: deploymentData.OnSite === "Y" ? true : false,

    Onsitedateflag: deploymentData.OnsiteDateFlag === "Y" ? true : false,
    Geninvoice: deploymentData.GenerateInvoice === "Y" ? true : false,
    Essaccess: deploymentData.EssAccess === "Y" ? true : false,
    Onsiterole: deploymentData.OnsiteActivityRole || "Project",
    biometric: deploymentData.BioMetric === "Y" ? true : false,
    mobile: deploymentData.MobileGeoFencing === "Y" ? true : false,
    managermanual: deploymentData.ManagerManual === "Y" ? true : false,
    defaultpresent: deploymentData.AutoPresent === "Y" ? true : false,
    costofemployee: deploymentData.CostOfBudget || 0,
    costofcompany: deploymentData.CostOfCompany || 0,
    costofbudgethour: deploymentData.CostOfBudgetHours || 0.00,
    costofcompanyhour: deploymentData.CostOfCompanyHours || 0.00,
    cloud: deploymentData.CloudApplication === "Y" ? true : false,
    Horizontal: true,
    Vertical: deploymentData.Vertical === "Y" ? true : false,
    HorizontalMimNo: deploymentData.HorizontalMimNo || 1,
    VerticalMimNo: deploymentData.VerticalMimNo || 3,
    AutoApprovalYesOrNo:
      deploymentData.AutoApprovalYesOrNo === "Y" ? true : false,
    ApprovelTolerance: deploymentData.ApprovelTolerance,
    AutoRejectionYesOrNo:
      deploymentData.AutoRejectionYesOrNo === "Y" ? true : false,
    RejectionTolerance: deploymentData.RejectionTolerance,
    Taskmailescalation:
      deploymentData?.TaskMailEscalation === "N" ? false : true,
    Requestmailescalation:
      deploymentData?.RequestMailEscalation === "N" ? false : true,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
  };

  console.log(deploymentInitialValue.Designation, "--deploymentInitialValue");
  const Fndeployment = async (values, resetForm, del) => {
    console.log(values, "--values");

    const idata = {
      HeaderID: recID,
      CheckInTime: values.shift?.ShiftStartTime || "",
      CheckOutTime: values.shift?.ShiftendTime || "",
      CheckInTime2: values.shift2?.ShiftStartTime2 || "",
      CheckOutTime2: values.shift2?.ShiftendTime2 || "",
      // CheckInTime: values.checkin || "",
      // CheckOutTime: values.checkout || "",
      Monday: values.Monday === true ? "Y" : "N",
      Tuesday: values.Tuesday === true ? "Y" : "N",
      Wednesday: values.Wednesday === true ? "Y" : "N",
      Thursday: values.Thursday === true ? "Y" : "N",
      Friday: values.Friday === true ? "Y" : "N",
      Saturday: values.Saturday === true ? "Y" : "N",
      Sunday: values.Sunday === true ? "Y" : "N",

      Office: values.office === true ? "Y" : "N",
      WorkFromHome: values.workfromhome === true ? "Y" : "N",
      Hybrid: values.hybrid === true ? "Y" : "N",
      OnSite: values.onsite === true ? "Y" : "N",

      OnsiteDateFlag: values.Onsitedateflag === true ? "Y" : "N",
      GenerateInvoice: values.Geninvoice === true ? "Y" : "N",
      EssAccess: values.Essaccess === true ? "Y" : "N",
      OnsiteActivityRole: values.Onsiterole,
      BioMetric: values.biometric === true ? "Y" : "N",
      ManagerManual: values.managermanual === true ? "Y" : "N",
      AutoPresent: values.defaultpresent === true ? "Y" : "N",
      CloudApplication: values.cloud === true ? "Y" : "N",
      MobileGeoFencing: values.mobile === true ? "Y" : "N",
      CostOfBudget: values.costofemployee || 0,
      CostOfCompany: values.costofcompany || 0,
      CostOfCompanyHours: values.costofcompanyhour || 0,
      CostOfBudgetHours: values.costofbudgethour,

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
      DefaultProject: values.project?.RecordID || 0,
      ProjectCode: values.project?.Code || "",
      ProjectName: values.project?.Name || "",
      // DefaultFunction: values.function?.RecordID || 0,
      // FunctionCode: values.function.Code || "",
      // FunctionName: values.function.Name || "",
      DefaultFunction: values.function?.RecordID ?? 0,
      FunctionCode: values.function?.Code ?? "",
      FunctionName: values.function?.Name ?? "",
      ShiftID: values.shift?.RecordID || 0,
      ShiftID2: values.shift2?.RecordID || 0,
      TaskMailEscalation: values.Taskmailescalation === true ? "Y" : "N",
      RequestMailEscalation: values.Requestmailescalation === true ? "Y" : "N",
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
      dispatch(getDeployment({ HeaderID: recID }));
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
      OnsiteDateFlag: deploymentData.Onsitedateflag === "Y" ? true : false,
      GenerateInvoice: deploymentData.GenerateInvoice === "Y" ? "Y" : "N",
      EssAccess: deploymentData.EssAccess === "Y" ? "Y" : "N",
      // OnsiteActivityRole: values.onsiterole,
      OnsiteActivityRole: deploymentData.OnsiteActivityRole || "Project",
      Sunday: deploymentData.SundayShift === "Y" ? true : false,
      CostOfBudget: values.costofemployee,
      CostOfCompany: values.costofcompany || 0,
      CostOfCompanyHours: values.costofcompanyhour || 0,
      CostOfBudgetHours: values.costofbudgethour,
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
      DefaultFunction: deploymentData.DefaultFunction || 0,
      FunctionCode: deploymentData.FunctionCode || "",
      FunctionName: deploymentData.FunctionName || "",
      ShiftID: deploymentData.ShiftID || 0,
      ShiftCode: deploymentData.ShiftCode || "",
      ShiftName: deploymentData.ShiftName || "",
      ShiftID2: deploymentData.ShiftID2 || 0,
      TaskMailEscalation:
        deploymentData.TaskMailEscalation === "Y" ? "Y" : "N" || "",
      RequestMailEscalation:
        deploymentData.RequestMailEscalation === "Y" ? "Y" : "N" || "",
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
      BioMetric: values.biometric === true ? "Y" : "N",
      ManagerManual: values.managermanual === true ? "Y" : "N",
      AutoPresent: values.defaultpresent === true ? "Y" : "N",
      CloudApplication: values.cloud === true ? "Y" : "N",
      MobileGeoFencing: values.mobile === true ? "Y" : "N",
    };

    const response = await dispatch(postDeployment({ data: idata }));
    // return;
    if (response.payload.Status == "Y") {
      dispatch(getDeployment({ HeaderID: recID }));
      toast.success(response.payload.Msg);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  /*************LOA************* */

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
    Attachment: empLoaData.Attachment || "",
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
  console.log(AttachmentInitialValues, "Attini");
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
      Attachment: uploadFile || values.Attachment || "",
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
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);
  };
  const fnViewFile = (values) => {
    const baseUrl = store.getState().globalurl.attachmentUrl;

    const fileName = uploadFile || values.Attachment; // ✅ KEY FIX

    console.log("Final fileName:", fileName);

    if (!fileName) {
      toast.error("No file to view");
      return;
    }

    const encodedFileName = encodeURIComponent(fileName);
    const filePath = `${baseUrl}${encodedFileName}`;

    console.log("Opening:", filePath);

    window.open(filePath, "_blank");
  };

  const getFileChange = async (event) => {
    setImgName(event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(imageUpload({ formData }));
    setImgName(fileData.payload.name);

    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };
  const fnLogOut = (props) => {
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
          // navigate("/Apps/TR027/Personnel");
          navigate(`/Apps/SecondarylistView/Classification/TR027/Personnel/${parentID}`);

        }
      } else {
        return;
      }
    });
  };

  const itemcustody1InitialValue = useMemo(() => ({
    code: Data.Code,
    description: Data.Name,
    imageurl: Data.ImageName
      ? store.getState().globalurl.imageUrl + Data.ImageName
      : store.getState().globalurl.imageUrl + "Defaultimg.jpg",
    Disable: "N",
    recordID: itemCustodyData1.recordID || "",
    itemGroup: itemCustodyData1.itemGroup || null,
    items: itemCustodyData1.items || null,
    AssestID: itemCustodyData1.assestID || "",
    ItemValue: itemCustodyData1.itemValue || "",
    PurchaseReference: itemCustodyData1.reference || "",
  }), [Data, itemCustodyData1]);

  const empItemCustody1Fn = async (values, resetForm, del) => {
    setLoading(true);
    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: itemCustodyData1.recordID,
      EmployeeID: recID,
      ItemGroupID: values.itemGroup?.RecordID,
      ItemID: values.items?.RecordID,
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
        fetchExplorelitview("TR212", "ItemCustody", `EmployeeID=${recID} AND CompanyID=${CompanyID}`, "")
      );

      toast.success(response.payload.Msg);

      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      setLoading(false);
      toast.error(response.payload.Msg);
    }
  };


  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", overflow: "auto" }}>
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
                      setScreen(1);
                    }}
                  >
                    {/* {mode === "E"
                      ? `Personnel(${state.EmpName})`
                      : "Personnel(New)"} */}
                    {
                      mode === "E"
                        ? `Personnel(${state?.EmpName || Data?.Name})`
                        : "Personnel(New)"
                    }

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
                  {show == "17" ? (
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

                  {show == "15" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Parent
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "16" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Parent Contact Details
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
                  {show == "12" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Approvals
                    </Typography>
                  ) : (
                    false
                  )}
                  {show == "13" ? (
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Locality
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
                    <MenuItem value={0}>Personnel</MenuItem>
                    {/* {mode !== "E"&&(<MenuItem value={0}>Personnel</MenuItem>)} */}
                    <MenuItem value={5}>Contact</MenuItem>
                    {initialValues.employeetype === "CI" ? (
                      <MenuItem value={8}>Contracts In</MenuItem>
                    ) : null}
                    {initialValues.employeetype === "CO" ? (
                      <MenuItem value={11}>Contracts Out</MenuItem>
                    ) : null}
                    {is003Subscription === true ? (
                      <MenuItem value={15}>Parent</MenuItem>
                    ) : null}
                    {is003Subscription === true ? (
                      <MenuItem value={16}>Parent Contact Details</MenuItem>
                    ) : null}
                    <MenuItem value={1}>Skills</MenuItem>
                    <MenuItem value={12}>Approvals</MenuItem>
                    <MenuItem value={2}>Functions</MenuItem>
                    <MenuItem value={3}>Managers</MenuItem>
                    <MenuItem value={4}>Deployment</MenuItem>
                    <MenuItem value={9}>Geo Location</MenuItem>
                    <MenuItem value={10}>Leave Configuration</MenuItem>
                    <MenuItem value={6}>List of Documents</MenuItem>
                    {/* <MenuItem value={7}>Item Custody</MenuItem> */}
                    <MenuItem value={17}>Item Custody</MenuItem>
                    <MenuItem value={14}>Item Services</MenuItem>
                    <MenuItem value={13}>Locality</MenuItem>
                    
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
              //validationSchema={basicSchema}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                fnSave(values, false);
              }}
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
                      <FormControl>
                        <CheckinAutocomplete
                          sx={{ marginTop: "7px" }}
                          name="Department"
                          label={
                            <>
                              Department
                              <span style={{ color: "red", fontSize: "20px" }}>
                                {" "}
                                *{" "}
                              </span>
                            </>
                          }
                          variant="outlined"
                          id="Department"
                          value={values.Department}
                          onChange={(newValue) => {
                            setFieldValue("Department", newValue);
                            console.log(newValue, "--newValue");
                            console.log(newValue.RecordID, "////");
                          }}
                          error={!!touched.Department && !!errors.Department}
                          helperText={touched.Department && errors.Department}
                          //  onChange={handleSelectionFunctionname}
                          // defaultValue={selectedFunctionName}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2010","ScreenName":"Department","Filter":"parentID=${CompanyID}","Any":""}}`}
                        />
                        {/* {touched.Department && errors.Department && (
                          <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                            {errors.Department}
                          </div>
                        )} */}
                      </FormControl>
                      {CompanyAutoCode == "Y" ? (
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
                      ) : (
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label={
                            <>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          value={values.Code}
                          id="Code"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="Code"
                          error={!!touched.Code && !!errors.Code}
                          helperText={touched.Code && errors.Code}
                          sx={{
                            backgroundColor: "#ffffff", // Set the background to white
                            "& .MuiFilledInput-root": {
                              backgroundColor: "", // Ensure the filled variant also has a white background
                            },
                          }}
                          focused
                          // required
                          autoFocus
                          inputProps={{ maxLength: 8 }}
                        />
                      )}

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label={
                          <>
                            Name
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.Name}
                        id="Name"
                        onBlur={handleBlur}
                        //onChange={handleChange}
                        onChange={(e) => {
                          const value = e.target.value;
                          // allow letters, spaces, and dot
                          if (/^[a-zA-Z\s.]*$/.test(value)) {
                            handleChange(e);
                          }
                        }}
                        name="Name"
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "", // Ensure the filled variant also has a white background
                          },
                        }}
                        focused
                        // required
                        inputProps={{ maxLength: 90 }}
                        multiline
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="Password"
                        label={
                          <>
                            Password
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.Password}
                        id="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Password"
                        // required
                        error={!!touched.Password && !!errors.Password}
                        helperText={touched.Password && errors.Password}
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
                        // required
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
                        label={
                          <>
                            Type
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.employeetype}
                        id="employeetype"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="employeetype"
                        error={!!touched.employeetype && !!errors.employeetype}
                        helperText={touched.employeetype && errors.employeetype}
                        // required
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
                        {/* <MenuItem value="ST">Student</MenuItem> */}
                        <MenuItem value="CI">Contracts In</MenuItem>
                        <MenuItem value="CO">Contracts Out</MenuItem>
                        <MenuItem value="IN">Intern</MenuItem>
                        {/* <MenuItem value="CT">Contractor</MenuItem> */}
                      </TextField>
                      <Box>
                        {/* <CusListRunGrpOptimizedAutocomplete
                          name="module"
                          id="module"
                          label="Module"
                          value={values.module}      
                          onChange={(event, newValue) => {setFieldValue("module", newValue)}}
                          url={"https://bos.beyondexs.com/api/CompanyModuleGetController.php"}
                          companyID="204"
                        /> */}

                        {/* <MultiSelectDropdown
                          id="moduleSelect"
                          name="Select Module"
                          data={fetchedData?.Data || []}
                          apiValue={apiReturnValue}     // example: "1,3,5"
                          onChange={(val) => {
                            console.log("Send this to API =>", val); // e.g. "1,3,5"
                            setApiReturnValue(val);
                          }}
                        /> */}

                        {/* <MultiSelectDropdown
                          id="moduleSelect"
                          name="Module Select"
                          data={fetchedData?.Data || []}
                          apiValue={apiReturnValue}   // "1,2,5"
                          onChange={(val) => {
                            console.log("Send this to API =>", val);
                            setApiReturnValue(val);   // store "1,2,5"
                          }}
                        /> */}

                        {/* <CusListRunGrpOptimizedAutocomplete
                          name="module"
                          label="Module"
                          variant="outlined"
                          id="module"
                          value={values.module} // must be array []
                          onChange={(newValue) => {
                            setFieldValue("module", newValue);  // ✔ set whole array
                          }}
                          url={"https://bos.beyondexs.com/api/CompanyModuleGetController.php"}
                          companyID="204"
                        /> */}

                        <MultiSelectDropdown
                          id="module"
                          name="Module"
                          data={fetchedData?.Data || []} // from API
                          apiValue={Data.Module} // from API
                          onChange={(val) => {
                            console.log("Send this to API:", val);
                            setApiReturnValue(val);
                          }}
                        />
                      </Box>
                      <Box>
                        <Field
                          //  size="small"
                          type="checkbox"
                          name="qualityassurance"
                          id="qualityassurance"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Quality Assurance"
                        />

                        <FormLabel focused={false}>Quality Assurance</FormLabel>
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
                      <Box>
                        <Field
                          //  size="small"
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
                        name="dateofbirth"
                        type="date"
                        id="dateofbirth"
                        label="Date of Birth"
                        variant="standard"
                        focused
                        inputFormat="YYYY-MM-DD"
                        value={values.dateofbirth}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.dateofbirth && !!errors.dateofbirth}
                        helperText={touched.dateofbirth && errors.dateofbirth}
                        sx={{ background: "" }}
                      // required
                      //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                      />
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
                      // required
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
                      // required
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
                    {/* <Button
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={loading}
                      onClick={() => {
                        fnSave(values, false);
                      }}
                    >
                      Save
                    </Button> */}
                    <Button
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={loading}
                    >
                      Save
                    </Button>

                    {/* {YearFlag == "true" ? (
                     
                    ) : (
                      
                    )} */}
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
                              fnSave(values, true);
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
                      // //  color="error"
                      // >
                      //   Delete
                      // </Button>
                      null} */}
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => {
                        // is00123Subscription
                        //   ? navigate(`/Apps/SecondarylistView/Classification/TR027/Personnel/${parentID}`)
                        //   : navigate(`/Apps/TR027/Personnel`);
                        navigate(-1)
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
              validationSchema={validationSchema1}
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
                        src={viewImage}
                        sx={{ width: "200px", height: "120px" }}
                      />
                    </Stack>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="FatherName"
                      name="FatherName"
                      value={values.FatherName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Father's Name"
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
                          target: { name: "email", value },
                        });
                      }}
                      label={
                        <>
                          Email Id
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      focused
                      // required
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
                      error={
                        touched.aadharcardnumber &&
                        Boolean(errors.aadharcardnumber)
                      }
                      helperText={
                        touched.aadharcardnumber && errors.aadharcardnumber
                      }
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
                      //type="text"
                      type="number"
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

                    <Typography
                      variant="h5"
                      sx={{
                        gridColumn: "span 2",   // 👈 makes it occupy full row
                        mt: 2
                      }}
                    >
                      Bank Details:
                    </Typography>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="AccountHoldersName"
                      name="AccountHoldersName"
                      value={values.AccountHoldersName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Account Holder Name"
                      // label={
                      //   <>
                      //     Account Holder Name
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      focused
                      error={touched.AccountHoldersName && Boolean(errors.AccountHoldersName)}
                      helperText={touched.AccountHoldersName && errors.AccountHoldersName}
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
                      type="number"
                      id="AccountNumber"
                      name="AccountNumber"
                      value={values.AccountNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Account Number"
                      // label={
                      //   <>
                      //     Account Number
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      focused
                      error={touched.AccountNumber && Boolean(errors.AccountNumber)}
                      helperText={touched.AccountNumber && errors.AccountNumber}
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
                      id="IfscCode"
                      name="IfscCode"
                      value={values.IfscCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="IFSC Code"
                      // label={
                      //   <>
                      //     IFSC Code
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      focused
                      error={touched.IfscCode && Boolean(errors.IfscCode)}
                      helperText={touched.IfscCode && errors.IfscCode}
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
                      id="Branch"
                      name="Branch"
                      value={values.Branch}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Branch"
                      // label={
                      //   <>
                      //     Branch
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      focused
                      error={touched.Branch && Boolean(errors.Branch)}
                      helperText={touched.Branch && errors.Branch}
                      onWheel={(e) => e.target.blur()}
                      sx={
                        {
                          //gridColumn: "span 2", background: "#fff6c3"
                        }
                      }
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
                        // onClick={() => {
                        //   fnSave(values, "harddelete");
                        // }}
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
                              fnSave(values, "harddelete");
                              // navigate(-1);
                            } else {
                              return;
                            }
                          });
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
                          const allowedKeys = [
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                          ];
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
                          const allowedKeys = [
                            "1",
                            "2",
                            "3",
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                          ];
                          if (!allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginTop={1}
                    gap={2}
                  >
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
                          const allowedKeys = [
                            "1",
                            "2",
                            "3",
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                          ];
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
                      />
                    </Box>
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
                        // onClick={() => {
                        //   fnSave(values, "harddelete");
                        // }}
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
                              fnSave(values, "harddelete");
                              // navigate(-1);
                            } else {
                              return;
                            }
                          });
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
              enableReinitialize={true}
              validationSchema={validationSchema3}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
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
                        columns={columns1}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        rowHeight={dataGridRowHeight}
                        headerHeight={dataGridHeaderFooterHeight}
                        pageSize={pageSize1}
                        page={page1}
                        onPageChange={(pageno) => handlePagechange1(pageno)}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize1(newPageSize)
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
                      // enableReinitialize={iniProcess}
                      enableReinitialize={true}
                      validationSchema={validationSchema3}
                      onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                          fnProcess(values, resetForm, false);
                        }, 100);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        resetForm,
                        handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
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
                                  src={viewImage}
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
                                label={
                                  <>
                                    Skills
                                    <span
                                      style={{ color: "red", fontSize: "20px" }}
                                    >
                                      *
                                    </span>
                                  </>
                                }
                                // required

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
                                //            onInvalid={(e) => {
                                //   e.target.setCustomValidity(
                                //     "Please fill the Name"
                                //   );
                                // }}
                                // onInput={(e) => {
                                //   e.target.setCustomValidity("");
                                // }}
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
                              label={
                                <>
                                  Comments
                                  <span
                                    style={{ color: "red", fontSize: "20px" }}
                                  >
                                    *
                                  </span>
                                </>
                              }
                              // required
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
                              error={!!touched.SortOrder && !!errors.SortOrder}
                              helperText={touched.SortOrder && errors.SortOrder}
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
                              type="submit"
                              loading={loading}
                            // onClick={() => {
                            //   fnProcess(values, resetForm, "");
                            //   //navigate("")
                            // }}
                            >
                              Save
                            </LoadingButton>
                            {YearFlag == "true" ? (
                              <Button
                                color="error"
                                variant="contained"
                                disabled={boMode == "A"}
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
                                      fnProcess(
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
                            {/* ) : ( */}
                            {/* <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={true}
                                >
                                  Save
                                </Button> */}
                            {/* )} */}
                            {/* {YearFlag == "true" ? (
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
              validationSchema={validationSchema4}
              onSubmit={(values, { resetForm }) => {
                console.log("Submitting values:", values);
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
                setFieldValue,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  onReset={() => {
                    selectCellRowData({
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
                        label="Name"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>

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
                            setFieldValue,
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
                        <CheckinAutocomplete
                          name="functionLookup"
                          label={
                            <span>
                              Function
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          variant="outlined"
                          id="functionLookup"
                          // value={functionLookup}
                          value={values.functionLookup}
                          onChange={(newValue) => {
                            setFieldValue("functionLookup", {
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                            });
                            // SetFunctionLookup({
                            //   RecordID: newValue.RecordID,
                            //   Code: newValue.Code,
                            //   Name: newValue.Name,
                            // });
                          }}
                          error={
                            !!touched.functionLookup && !!errors.functionLookup
                          }
                          helperText={
                            touched.functionLookup && errors.functionLookup
                          }
                          url={`${listViewurl}?data={"Query":{"AccessID":"2048","ScreenName":"Functions","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                        />
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
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </LoadingButton>

                    <Button
                      // onClick={() => {
                      //   // if (funMode !== "E") {
                      //   //   toast.warning("Select a function to delete.");
                      //   //   return;
                      //   // }
                      //   empFunctionFn(values, resetForm, true);
                      // }}
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
                            empFunctionFn(values, resetForm, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                      disabled={funMode == "A"}
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
            <Formik
              initialValues={managerInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema8}
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
                        columns={columns2}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        rowHeight={dataGridRowHeight}
                        headerHeight={dataGridHeaderFooterHeight}
                        page={page2}
                        pageSize={pageSize2}
                        onPageChange={(pageno) => handlePagechange2(pageno)}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize2(newPageSize)
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
                        label={
                          <span>
                            Level
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        value={values.Level}
                        id="Level"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="Level"
                        // required
                        focused
                        error={!!touched.Level && !!errors.Level}
                        helperText={touched.Level && errors.Level}
                      >
                        {Data.VerticalMimNo >= 1 && (
                          <MenuItem value="1">Level 1</MenuItem>
                        )}
                        {Data.VerticalMimNo >= 2 && (
                          <MenuItem value="2">Level 2</MenuItem>
                        )}
                        {Data.VerticalMimNo >= 3 && (
                          <MenuItem value="3">Level 3</MenuItem>
                        )}
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
                          label={
                            <span>
                              Manager
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          variant="outlined"
                          id="manager"
                          // value={designationLookup}
                          value={values.manager}
                          onChange={(newValue) => {
                            setFieldValue("manager", {
                              DesignationID: newValue.DesignationID,
                              RecordID: newValue.RecordID,
                              Code: newValue.Code,
                              Name: newValue.Name,
                            });
                            // SetDesignationLookup({
                            //   DesignationID: newValue.DesignationID,
                            //   RecordID: newValue.RecordID,
                            //   Code: newValue.Code,
                            //   Name: newValue.Name,
                            // });
                          }}
                          url={`${baseApiUrl}ManagerLevelController.php`}
                          payload={{
                            EmployeeID: recID,
                            Level: values.Level || 1,
                            CompanyID: CompanyID,
                          }}
                          error={!!touched.manager && !!errors.manager}
                          helperText={touched.manager && errors.manager}
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
                        // onClick={() =>
                        //   mgrFunctionFn(values, resetForm, true, setFieldValue)
                        // }
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
                              mgrFunctionFn(values, resetForm, "harddelete");
                              // navigate(-1);
                            } else {
                              return;
                            }
                          });
                        }}
                        disabled={funMode == "A"}
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
              validationSchema={validationSchema2}
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
                    <Box sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          flexDirection: "column", // Stack vertically
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckinAutocomplete
                          name="Designation"
                          label={
                            <span>
                              Designation
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          variant="outlined"
                          id="Designation"
                          value={values.Designation}
                          onChange={(newValue) => {
                            setFieldValue("Designation", newValue);
                          }}
                          error={!!touched.Designation && !!errors.Designation}
                          helperText={touched.Designation && errors.Designation}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2047","ScreenName":"Designation","Filter":"parentID='${CompanyID}'","Any":""}}`}
                        />
                      </FormControl>

                      {/* {touched.Designation && errors.Designation && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{
                            marginTop: "4px",
                            marginLeft: "14px", // align with field
                            fontSize: "10px",
                          }}
                        >
                          {errors.Designation}
                        </Typography>
                      )} */}
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormControl
                        sx={{
                          //gridColumn: "span 2",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <CheckinAutocomplete
                          name="location"
                          label={
                            <span>
                              Location
                              <span style={{ color: "red", fontSize: "20px" }}>
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
                          error={!!touched.location && !!errors.location}
                          helperText={touched.location && errors.location}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID='${CompanyID}'","Any":""}}`}
                        />
                      </FormControl>
                    </Box>

                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CheckinAutocomplete
                        name="gate"
                        label={
                          <span>
                            Gate
                            <span style={{ color: "red", fontSize: "20px" }}>
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
                        error={!!touched.gate && !!errors.gate}
                        helperText={touched.gate && errors.gate}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID='${values.location ? values.location.RecordID : 0
                          }'","Any":""}}`}
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
                      <CheckinAutocomplete
                        id="function"
                        name="function"
                        label="Function"
                        // label={
                        //   <span>
                        //     Function
                        //     <span style={{ color: "red", fontSize: "20px" }}>
                        //       *
                        //     </span>
                        //   </span>
                        // }
                        variant="outlined"
                        value={values.function}
                        onChange={(newValue) => {
                          setFieldValue("function", newValue);
                          console.log(newValue, "--newvalue function");
                          console.log(newValue.RecordID, "function RecordID");
                        }}
                        // error={!!touched.function && !!errors.function}
                        // helperText={touched.function && errors.function}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2048","ScreenName":"Function","Filter":"CompanyID
 ='${CompanyID}'","Any":""}}`}
                      />
                    </FormControl>
                  </Box>
                    <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Work Location
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
  <Box>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="office"
                        id="office"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="office"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Office
                      </FormLabel>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="workfromhome"
                        id="workfromhome"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="workfromhome"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Work From Home
                      </FormLabel>
                       <Field
                        //  size="small"
                        type="checkbox"
                        name="hybrid"
                        id="hybrid"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="hybrid"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Hybrid
                      </FormLabel>
                       <Field
                        //  size="small"
                        type="checkbox"
                        name="onsite"
                        id="onsite"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="onsite"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Onsite
                      </FormLabel>
                    </Box>
                  </Box>

                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Project Details
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
                    <FormControl
                      sx={{
                        //gridColumn: "span 2",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CheckinAutocomplete
                        id="project"
                        name="project"
                        label="Project"
                        variant="outlined"
                        value={values.project}
                        onChange={(newValue) => {
                          setFieldValue("project", newValue);
                          console.log(newValue, "--newvalue project");
                          console.log(newValue.RecordID, "project RecordID");
                        }}
                        error={!!touched.project && !!errors.project}
                        helperText={touched.project && errors.project}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                    </FormControl>
                    <TextField
                      label="Onsite Activities Role"
                      id="Onsiterole"
                      name="Onsiterole"
                      focused
                      variant="standard"
                      value={values.Onsiterole}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                    // error={!!touched.Onsiterole && !!errors.Onsiterole}
                    // helperText={touched.Onsiterole && errors.Onsiterole}
                    >
                      <MenuItem value="Project">Project</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                    </TextField>
                    <Box>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="Onsitedateflag"
                        id="Onsitedateflag"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Onsitedateflag"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Allow Backlog Data Entry
                      </FormLabel>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="Geninvoice"
                        id="Geninvoice"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Geninvoice"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Generate Invoice
                      </FormLabel> <Field
                        //  size="small"
                        type="checkbox"
                        name="Essaccess"
                        id="Essaccess"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Essaccess"
                      // disabled
                      />

                      <FormLabel focused={false}>
                        Self Service Access
                      </FormLabel>
                    </Box>
                  </Box>
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Shift Details
                  </Typography>
                  {/* <Stack
                    direction="column"
                    spacing={2}
                    sx={{ width: 500, padding: formGap }}
                  > */}
                  <Grid container spacing={2}>
                    {/* Shift 1 */}
                    <Grid item xs={6}>
                      <Stack direction="column" spacing={2} padding={2}>
                        {/* Shift 1*/}
                        <FormControl variant="standard" fullWidth>
                          <CheckinAutocomplete
                            id="shift"
                            name="shift"
                            label={
                              <span>
                                Shift 1
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            variant="outlined"
                            value={values.shift}
                            error={!!touched.shift && !!errors.shift}
                            helperText={touched.shift && errors.shift}
                            onChange={(newValue) => {
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
                            url={`${listViewurl}?data={"Query":{"AccessID":"2108","ScreenName":"Shift","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                          />
                        </FormControl>

                        {/* Check In Time */}
                        <FormControl variant="standard">
                          <TextField
                            fullWidth
                            type="time"
                            id="checkin"
                            name="checkin"
                            value={
                              values.shift?.ShiftStartTime || values.checkin
                            }
                            // value={values.checkin}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shift Start Time 1"
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
                            value={
                              values.shift?.ShiftendTime || values.checkout
                            }
                            // value={values.checkout}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shift End Time 1"
                            focused
                            inputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </Stack>
                    </Grid>

                    {/* Shift 2*/}
                    <Grid item xs={6}>
                      <Stack direction="column" spacing={2} padding={2}>
                        <FormControl variant="standard" fullWidth>
                          <CheckinAutocomplete
                            id="shift2"
                            name="shift2"
                            label="Shift 2"
                            variant="outlined"
                            value={values.shift2}
                            // error={!!touched.shift2 && !!errors.shift2}
                            // helperText={touched.shift2 && errors.shift2}
                            onChange={(newValue) => {
                              setFieldValue("shift2", newValue);
                            }}
                            url={`${listViewurl}?data={"Query":{"AccessID":"2108","ScreenName":"Shift","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                          />
                        </FormControl>

                        {/* Check In Time */}
                        <FormControl variant="standard">
                          <TextField
                            fullWidth
                            type="time"
                            id="checkin2"
                            name="checkin2"
                            value={
                              values.shift2?.ShiftStartTime || values.checkin2
                            }
                            // value={values.checkin}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shift Start Time 2"
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
                            id="checkout2"
                            name="checkout2"
                            value={
                              values.shift2?.ShiftendTime || values.checkout2
                            }
                            // value={values.checkout}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Shift End Time 2"
                            focused
                            inputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Week Off
                  </Typography>
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
                  <Typography variant="h5" padding={1}>
                    Checkin & Checkout Options
                  </Typography>
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
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="defaultpresent"
                      id="defaultpresent"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="defaultpresent"
                    // disabled
                    />

                    <FormLabel focused={false}>Default Present</FormLabel>
                  </Box>
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Mail Confirmation
                  </Typography>
                  <Box>
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Taskmailescalation"
                      id="Taskmailescalation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Taskmailescalation"
                    />

                    <FormLabel focused={false}>Task Mail Escalation</FormLabel>

                    <Field
                      //  size="small"
                      type="checkbox"
                      name="Requestmailescalation"
                      id="Requestmailescalation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Requestmailescalation"
                    />

                    <FormLabel focused={false}>
                      Request Mail Escalation
                    </FormLabel>
                  </Box>
                  <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                  <Typography variant="h5" padding={1}>
                    Costing
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
                      type="number"
                      id="costofcompany"
                      name="costofcompany"
                      value={values.costofcompany}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Cost to Company"
                      // label={
                      //   <>
                      //     Cost to Company
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      focused
                      error={!!touched.costofcompany && !!errors.costofcompany}
                      helperText={touched.costofcompany && errors.costofcompany}
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
                      id="costofemployee"
                      name="costofemployee"
                      value={values.costofemployee}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Cost to Budget"
                      // label={
                      //   <>
                      //     Cost to Budget
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      error={
                        !!touched.costofemployee && !!errors.costofemployee
                      }
                      helperText={
                        touched.costofemployee && errors.costofemployee
                      }
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
                      id="costofcompanyhour"
                      name="costofcompanyhour"
                      value={values.costofcompanyhour}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Cost to Company(Hours)"
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
                      fullWidth
                      variant="standard"
                      type="number"
                      id="costofbudgethour"
                      name="costofbudgethour"
                      value={values.costofbudgethour}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Cost to Budget(Hours)"
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
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="30px"
                    padding={1}
                    gap={2}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                    >
                      Save
                    </Button>
                    {/* {YearFlag == "true" ? (
                      
                    ) : (
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
              validationSchema={validationSchema5}
              enableReinitialize={true}
              onSubmit={(values, { resetForm, setFieldValue }) => {
                if (
                  values.renewal &&
                  (!values.RenewalDate || values.RenewalDate === "00-00-0000")
                ) {
                  toast.error("Renewal Date is Required");
                  return;
                }
                const updatedValues = {
                  ...values,
                  RenewalDate: values.renewal
                    ? values.RenewalDate
                    : "00-00-0000",
                };
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
                        {/* <FormControl focused variant="standard" required>
                          <InputLabel id="category">Category</InputLabel> */}
                        <TextField
                          label={
                            <>
                              Category
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          id="category"
                          name="category"
                          focused
                          variant="standard"
                          value={values.category}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          select
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                        >
                          <MenuItem value="EC">Education</MenuItem>
                          <MenuItem value="AD">Award</MenuItem>
                          <MenuItem value="CT">Certificate</MenuItem>
                          <MenuItem value="IS">Insurance</MenuItem>
                          <MenuItem value="WT">Warranty</MenuItem>
                          <MenuItem value="OS">Others</MenuItem>
                        </TextField>
                        {/* </FormControl> */}
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
                          <FormLabel focused={false}>Personal</FormLabel>
                        </Box>
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
                            <FormLabel focused={false}>
                              Renewal Required
                            </FormLabel>
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
                              // accept=".pdf"
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                changeHandler(e);
                                setFieldValue("Attachment", file.name); // UI display only
                              }}
                            />
                            <PictureAsPdfOutlinedIcon fontSize="small" />
                          </IconButton>
                          <Button
                            variant="contained"
                            onClick={() => fnViewFile(values)}
                          >
                            View
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
        )}
        {show == "7" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={itemcustodyInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema6}
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

                    <FormControl sx={{
                      gap: formGap,
                      marginTop: "20px"
                    }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.ItemNumber}
                        id="ItemNumber"
                        name="ItemNumber"
                        label={
                          <>
                            Item No{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                        // multiline
                        // inputProps={{ maxLength: 90 }}
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
                        value={values.ItemName}
                        id="ItemName"
                        name="ItemName"
                        label={
                          <>
                            Item Name{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                        type="number"
                        value={values.ItemValue}
                        id="ItemValue"
                        name="ItemValue"
                        label={
                          <>
                            Item Value{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                        // multiline
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
                        //type="text"
                        type="number"
                        value={values.AssestID}
                        id="AssestID"
                        name="AssestID"
                        label={
                          <>
                            Assest ID{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                        //multiline
                        //inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: { maxLength: 90, textAlign: "right" }
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.PurchaseReference}
                        id="PurchaseReference"
                        name="PurchaseReference"
                        label={
                          <>
                            Reference{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                            style: { textAlign: "left" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    //style={{ marginTop: "-40px" }}
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
        {show == "14" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={itemservicesInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema12}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  empItemServicesFn(values, resetForm, false);
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
                      //height="50vh"
                      height={ItemdataGridHeight}
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

                    <FormControl
                      sx={{ gap: formGap, height: { ItemdataGridHeight } }}
                    >
                      <ItemsLookup
                        name="items"
                        label={
                          <>
                            Item
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="items"
                        // value={itemslookup}
                        value={values.items}
                        onChange={(newValue) => {
                          setFieldValue("items", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue items");
                          console.log(newValue.RecordID, "items RecordID");
                        }}
                        error={!!touched.items && !!errors.items}
                        helperText={touched.items && errors.items}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2129","ScreenName":"Items","Filter":"CompanyID=${CompanyID} AND EmployeeID =${recID}","Any":""}}`}
                      />
                      <CheckinAutocomplete
                        name="vendors"
                        label={
                          <>
                            Vendor
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="vendors"
                        // value={vendorlookup}
                        value={values.vendors}
                        onChange={(newValue) => {
                          setFieldValue("vendors", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue vendors");

                          console.log(newValue.RecordID, "vendors RecordID");

                          // SetVendorlookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        error={!!touched.vendors && !!errors.vendors}
                        helperText={touched.vendors && errors.vendors}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="date"
                        id="servicedate"
                        name="servicedate"
                        label={
                          <>
                            Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
                        value={values.servicedate}
                        inputFormat="YYYY-MM-DD"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.servicedate && !!errors.servicedate}
                        helperText={touched.servicedate && errors.servicedate}
                        focused
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="complaints"
                        name="complaints"
                        label={
                          <>
                            Complaints{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
                        value={values.complaints}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.complaints && !!errors.complaints}
                        helperText={touched.complaints && errors.complaints}
                        focused
                        multiline
                      />

                      {/* <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.tentativecharge}
                        id="tentativecharge"
                        name="tentativecharge"
                        label={
                          <>
                            Tentative Charges{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.tentativecharge && !!errors.tentativecharge
                        }
                        helperText={
                          touched.tentativecharge && errors.tentativecharge
                        }
                        sx={{
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
                      /> */}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {/* <TextField
                            fullWidth
                            variant="standard"
                            type="date"
                            value={values.returndate}
                            id="returndate"
                            name="returndate"
                            label={
                              <>
                                Expected Return Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                              </>
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputFormat="YYYY-MM-DD"
                            error={!!touched.returndate && !!errors.returndate}
                            helperText={touched.returndate && errors.returndate}
                            sx={{ backgroundColor: "#ffffff" }}
                            focused

                          /> */}
                          <TextField
                            fullWidth
                            name="returndate"
                            type="date"
                            id="returndate"
                            label={
                              <>
                                Expected Return Date{" "}
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </>
                            }
                            variant="standard"
                            focused
                            inputFormat="YYYY-MM-DD"
                            value={values.returndate}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.returndate && !!errors.returndate}
                            helperText={touched.returndate && errors.returndate}
                            sx={{ background: "" }}
                          // required
                          //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="text"
                            value={values.tentativecharge}
                            id="tentativecharge"
                            name="tentativecharge"
                            label={
                              <>
                                Tentative Charges{" "}
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </>
                            }
                            // required
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            onChange={(e) => {
                              // allow only numbers + decimal
                              const val = e.target.value;
                              if (/^\d*\.?\d*$/.test(val)) {
                                setFieldValue("tentativecharge", val);
                              }
                            }}
                            onBlur={(e) => {
                              let val = e.target.value;

                              if (val === "" || val === ".") {
                                setFieldValue("tentativecharge", "0.00");
                                return;
                              }

                              const num = parseFloat(val);
                              if (!isNaN(num)) {
                                setFieldValue("tentativecharge", num.toFixed(2)); // ✅ forces .00
                              }
                            }}
                            error={
                              !!touched.tentativecharge &&
                              !!errors.tentativecharge
                            }
                            helperText={
                              touched.tentativecharge && errors.tentativecharge
                            }
                            sx={{
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
                        </Grid>
                      </Grid>
                      {show == "14" && funMode === "E" ? (
                        <>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              variant="standard"
                              type="date"
                              value={values.completeddate}
                              id="completeddate"
                              name="completeddate"
                              label="Completed Date"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputFormat="YYYY-MM-DD"
                              error={
                                !!touched.completeddate &&
                                !!errors.completeddate
                              }
                              helperText={
                                touched.completeddate && errors.completeddate
                              }
                              sx={{ backgroundColor: "#ffffff" }}
                              focused
                            />
                          </Grid>

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                variant="standard"
                                type="date"
                                value={values.actualreturndate}
                                id="actualreturndate"
                                name="actualreturndate"
                                label="Actual Return Date"
                                // required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputFormat="YYYY-MM-DD"
                                error={
                                  !!touched.actualreturndate &&
                                  !!errors.actualreturndate
                                }
                                helperText={
                                  touched.actualreturndate &&
                                  errors.actualreturndate
                                }
                                focused
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                variant="standard"
                                type="text"
                                value={values.actualcharges}
                                id="actualcharges"
                                name="actualcharges"
                                label="Actual Charges"
                                // required
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                onChange={(e) => {
                                  // allow only numbers + decimal
                                  const val = e.target.value;
                                  if (/^\d*\.?\d*$/.test(val)) {
                                    setFieldValue("actualcharges", val);
                                  }
                                }}
                                onBlur={(e) => {
                                  let val = e.target.value;

                                  if (val === "" || val === ".") {
                                    setFieldValue("actualcharges", "0.00");
                                    return;
                                  }

                                  const num = parseFloat(val);
                                  if (!isNaN(num)) {
                                    setFieldValue("actualcharges", num.toFixed(2)); // ✅ forces .00
                                  }
                                }}
                                error={
                                  !!touched.actualcharges &&
                                  !!errors.actualcharges
                                }
                                helperText={
                                  touched.actualcharges && errors.actualcharges
                                }
                                sx={{
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
                            </Grid>
                          </Grid>
                          <TextField
                            fullWidth
                            variant="standard"
                            type="text"
                            value={values.servicecomments}
                            id="servicecomments"
                            name="servicecomments"
                            label="Comments"
                            // required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              !!touched.servicecomments &&
                              !!errors.servicecomments
                            }
                            helperText={
                              touched.servicecomments && errors.servicecomments
                            }
                            sx={{
                              backgroundColor: "#ffffff",
                              "& .MuiFilledInput-root": {
                                backgroundColor: "#ffffff",
                              },
                            }}
                            focused
                            multiline
                            inputProps={{ maxLength: 90 }}
                          />
                        </>
                      ) : null}
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    // style={{ marginTop: "-40px" }}
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
                      disabled={funMode === "A" ? true : false}
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
                            empItemServicesFn(values, resetForm, "harddelete");
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
        {show == "15" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={ParentInitialValue}
              validationSchema={validationSchema14}
              enableReinitialize={true}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  Fnsave(values);
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
                        name="code1"
                        type="text"
                        id="code1"
                        label="Code"
                        variant="standard"
                        placeholder="Auto"
                        focused
                        // required
                        value={values.code1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.code1 && !!errors.code1}
                        helperText={touched.code1 && errors.code1}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        InputProps={{ readOnly: true }}
                      // autoFocus
                      />
                    ) : (
                      <TextField
                        name="code1"
                        type="text"
                        id="code1"
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
                        value={values.code1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.code1 && !!errors.code1}
                        helperText={touched.code1 && errors.code1}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        autoFocus
                      />
                    )}
                    <TextField
                      name="name1"
                      type="text"
                      id="name1"
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
                      value={values.name1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name1 && !!errors.name1}
                      helperText={touched.name1 && errors.name1}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      // required
                      autoFocus={CompanyAutoCode == "Y"}
                    />

                    <TextField
                      name="mobilenumber"
                      id="mobilenumber"
                      label={
                        <>
                          Contact Mobile Number
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.mobilenumber}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and max 10 digits
                        if (/^\d{0,10}$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      error={!!touched.mobilenumber && !!errors.mobilenumber}
                      helperText={touched.mobilenumber && errors.mobilenumber}
                      inputProps={{ maxLength: 10 }}
                      sx={{ backgroundColor: "#ffffff" }}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'left' }
                        }
                      }}
                    />
                    <TextField
                      name="emailid"
                      type="text"
                      id="emailid"
                      label="Email ID"
                      variant="standard"
                      focused
                      value={values.emailid}
                      error={!!touched.emailid && !!errors.emailid}
                      helperText={touched.emailid && errors.emailid}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                    // autoFocus
                    />

                    <TextField
                      name="address"
                      type="text"
                      id="address"
                      label="Address"
                      variant="standard"
                      focused
                      multiline
                      rows={2}
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={!!touched.address && !!errors.address}
                      // helperText={touched.address && errors.address}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                    />

                    {/* <CheckinAutocomplete
                      id="locality"
                      name="locality"
                      label="Locality"
                      // label={
                      //   <>
                      //     Locality
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </>
                      // }
                      variant="outlined"
                      value={values.locality}
                      onChange={(newValue) => {
                        setFieldValue("locality", newValue);
                        console.log(newValue, "--newvalue locality");
                        console.log(newValue.RecordID, "locality RecordID");
                      }}
                      error={!!touched.locality && !!errors.locality}
                      helperText={touched.locality && errors.locality}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2128","ScreenName":"Locality","Filter":"EmployeeID=${recID} AND CompanyID=${CompanyID}","Any":""}}`}
                    /> */}


                    <TextField
                      name="maplink"
                      type="text"
                      id="maplink"
                      label="Map Location"
                      variant="standard"
                      focused
                      value={values.maplink}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={!!touched.maplink && !!errors.maplink}
                      // helperText={touched.maplink && errors.maplink}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                    />
                    {/* <CheckinAutocomplete
                      id="ReferenceBy"
                      name="ReferenceBy"
                      label="Partner Reference"
                      variant="outlined"
                      value={values.ReferenceBy}
                      onChange={(newValue) => {
                        setFieldValue("ReferenceBy", newValue);
                        // console.log(newValue, "--newvalue ReferenceBy");
                        // console.log(newValue.RecordID, "ReferenceBy RecordID");
                      }}
                      // error={!!touched.ReferenceBy && !!errors.ReferenceBy}
                      // helperText={touched.ReferenceBy && errors.ReferenceBy}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2131","ScreenName":"Partner Reference","Filter":"EmployeeID=${recID} AND ParentID=${CompanyID}","Any":""}}`}
                    /> */}

                    {/* panimage */}
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
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "16" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={parentcontactInitialValue}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  contactsave(values);
                }, 100);
              }}
              validationSchema={validationSchema13}
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
                        name="code"
                        type="text"
                        id="code"
                        label="Code"
                        variant="standard"
                        placeholder="Auto"
                        focused
                        // required
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.code && !!errors.code}
                        helperText={touched.code && errors.code}
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        InputProps={{ readOnly: true }}
                      // autoFocus
                      />
                    ) : (
                      <TextField
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
                        sx={{
                          backgroundColor: "#ffffff", // Set the background to white
                          "& .MuiFilledInput-root": {
                            backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                          },
                        }}
                        autoFocus
                      />
                    )}
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label={
                        <>
                          Name
                          {/* <span style={{ color: "red", fontSize: "20px" }}>
                                     *
                                   </span> */}
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                        },
                      }}
                      // required
                      autoFocus={CompanyAutoCode == "Y"}
                    />
                    <Box
                      sx={{
                        padding: 1.5,
                        backgroundColor: "#b2dfdb", // light green
                        borderRadius: 1,
                        width: "100%",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        Contact Person 1
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        padding: 1.5,
                        backgroundColor: "#b2dfdb",
                        borderRadius: 1,
                        width: "100%",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        Contact Person 2
                      </Typography>
                    </Box>
                    {/* </Box> */}

                    {/* <Typography>Contact Person 2</Typography> */}
                    <TextField
                      name="name1"
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
                      value={values.name1}
                      // required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // onChange={(e) => {
                      //   const input = e.target.value.toUpperCase();
                      //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                      //     handleChange({
                      //       target: {
                      //         name: "name1",
                      //         value: input,
                      //       },
                      //     });
                      //   }
                      // }}
                      error={!!touched.name1 && !!errors.name1}
                      helperText={touched.name1 && errors.name1}
                      sx={{
                        backgroundColor: "#ffffff",
                      }}
                      autoFocus
                    />
                    <TextField
                      name="name2"
                      label="Name"
                      variant="standard"
                      focused
                      value={values.name2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // onChange={(e) => {
                      //   const input = e.target.value.toUpperCase();
                      //   if (/^[0-9A-Z]*$/.test(input) || input === "") {
                      //     // This updates Formik value correctly
                      //     handleChange({
                      //       target: {
                      //         name: "name2",
                      //         value: input,
                      //       },
                      //     });
                      //   }
                      // }}
                      error={!!touched.name2 && !!errors.name2}
                      helperText={touched.name2 && errors.name2}
                      sx={{
                        backgroundColor: "#ffffff",
                      }}
                      autoFocus
                    />
                    <TextField
                      name="emailid1"
                      type="tel"
                      id="emailid1"
                      label={
                        <>
                          Email ID
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
                      // required
                      focused
                      value={values.emailid1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // onChange={(e) => {
                      //   const value = e.target.value;
                      //   // Only allow numbers and max 10 digits
                      //   if (/^\d{0,10}$/.test(value)) {
                      //     handleChange(e);
                      //   }
                      // }}
                      error={!!touched.emailid1 && !!errors.emailid1}
                      helperText={touched.emailid1 && errors.emailid1}
                      // inputProps={{ maxLength: 10 }}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />

                    <TextField
                      name="emailid2"
                      type="text"
                      id="emailid2"
                      label="Email ID"
                      variant="standard"
                      focused
                      value={values.emailid2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />
                    <TextField
                      name="mobileno1"
                      type="tel"
                      id="mobileno1"
                      label={
                        <>
                          Mobile No
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.mobileno1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.mobileno1 && !!errors.mobileno1}
                      helperText={touched.mobileno1 && errors.mobileno1}
                      // required
                      inputProps={{ maxLength: 10 }}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />
                    <TextField
                      name="mobileno2"
                      type="tel"
                      id="mobileno2"
                      label="Mobile No"
                      variant="standard"
                      focused
                      inputProps={{ maxLength: 10 }}
                      value={values.mobileno2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="aadharcardnumber1"
                      name="aadharcardnumber1"
                      value={values.aadharcardnumber1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Aadhar Card No"
                      focused
                      // onWheel={(e) => e.target.blur()}
                      error={
                        touched.aadharcardnumber1 &&
                        Boolean(errors.aadharcardnumber1)
                      }
                      helperText={
                        touched.aadharcardnumber1 && errors.aadharcardnumber1
                      }
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="aadharcardnumber2"
                      name="aadharcardnumber2"
                      value={values.aadharcardnumber2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Aadhar Card No"
                      focused
                      // onWheel={(e) => e.target.blur()}
                      error={
                        touched.aadharcardnumber2 &&
                        Boolean(errors.aadharcardnumber2)
                      }
                      helperText={
                        touched.aadharcardnumber2 && errors.aadharcardnumber2
                      }
                    />
                  </Box>
                  <Grid container spacing={2}>
                    {/* ID Proof (Left side – 50%) */}
                    <Grid item xs={12} md={6}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Tooltip title="ID Proof">
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
                              // onChange={getFilepanChange}
                              onChange={getFileID1Change}
                            />
                            <PictureAsPdfOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Button
                          size="small"
                          variant="contained"
                          // onClick={() => {
                          //   data.ContactPersonIDProofImg1 || ID1Image
                          //     ? window.open(
                          //         ID1Image
                          //           ? store.getState().globalurl.attachmentUrl +
                          //               ID1Image
                          //           : store.getState().globalurl.attachmentUrl +
                          //               data.ContactPersonIDProofImg1,
                          //         "_blank"
                          //       )
                          //     : toast.error("Please Upload File");
                          // }}
                          onClick={() => {
                            partyContactgetdata.ContactPersonIDProofImg1 || ID1Image
                              ? window.open(
                                ID1Image
                                  ? store.getState().globalurl.attachmentUrl +
                                  ID1Image
                                  : store.getState().globalurl.attachmentUrl +
                                  partyContactgetdata.ContactPersonIDProofImg1,
                                "_blank"
                              )
                              : toast.error("Please Upload File");
                          }}
                        >
                          ID Proof View
                        </Button>
                      </Box>
                    </Grid>

                    {/* GST Proof (Right side – 50%) */}
                    <Grid item xs={12} md={6}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Tooltip title="ID Proof">
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
                              // onChange={getFilegstChange}
                              onChange={getFileID2Change}
                            />
                            <PictureAsPdfOutlinedIcon />
                          </IconButton>
                        </Tooltip>

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            partyContactgetdata.ContactPersonIDProofImg2 || ID2Image
                              ? window.open(
                                ID2Image
                                  ? store.getState().globalurl.attachmentUrl +
                                  ID2Image
                                  : store.getState().globalurl.attachmentUrl +
                                  partyContactgetdata.ContactPersonIDProofImg2,
                                "_blank"
                              )
                              : toast.error("Please Upload File");
                          }}
                        >
                          ID Proof View
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap="20px"
                  >
                    {/* GSTimage */}

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

        {/*Contracts In */}
        {show == "8" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={ContractInitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema9}
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
                      <CheckinAutocomplete
                        name="vendor"
                        disabled={is003Subscription === true}
                        label={
                          is003Subscription === true ? (
                            "Parent"
                          ) : (
                            <>
                              Vendor
                              <span style={{ color: "red", fontSize: "20px" }}> *</span>
                            </>
                          )
                        }
                        variant="outlined"
                        id="vendor"
                        // value={vendorlookup}
                        value={values.vendor}
                        onChange={(newValue) => {
                          setFieldValue("vendor", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue vendor");

                          console.log(newValue.RecordID, "vendor RecordID");

                          // SetVendorlookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        error={!!touched.vendor && !!errors.vendor}
                        helperText={touched.vendor && errors.vendor}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={
                          Data.DesignationName === "Student" ||
                            deploymentInitialValue?.Designation?.Name ===
                            "Student"
                            ? `${listViewurl}?data={"Query":{"AccessID":"2133","ScreenName":"Parent","Filter":"parentID=${CompanyID}","Any":""}}`
                            : `${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID=${CompanyID}","Any":""}}`
                        }

                      //  url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Vendor","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      <CheckinAutocomplete
                        id="project"
                        name="project"
                        label={
                          <>
                            Project
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="outlined"
                        value={values.project}
                        onChange={(newValue) => {
                          setFieldValue("project", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                        }}
                        error={!!touched.project && !!errors.project}
                        helperText={touched.project && errors.project}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />

                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Description"
                        name="Description"
                        value={values.Description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Description"
                        focused
                      // inputProps={{ readOnly: true }}
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
                        label={
                          <span>
                            Billing Units
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        value={values.BillingUnits}
                        id="BillingUnits"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BillingUnits"
                        error={!!touched.BillingUnits && !!errors.BillingUnits}
                        helperText={touched.BillingUnits && errors.BillingUnits}
                        // required
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
                        {/* <MenuItem value="WS">Week</MenuItem> */}
                        <MenuItem value="MS">Month</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.UnitRate}
                        id="UnitRate"
                        name="UnitRate"
                        label={
                          <span>
                            Unit Rate
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        // required
                        onChange={(e) => {
                          const val = e.target.value;

                          // Allow numbers with optional decimal (up to 2 digits)
                          if (/^\d*\.?\d{0,2}$/.test(val)) {
                            setFieldValue("UnitRate", val);
                          }
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          let val = e.target.value;

                          if (val === "" || val === ".") {
                            setFieldValue("UnitRate", "0.00");
                            return;
                          }

                          // Ensure decimal exists
                          if (!val.includes(".")) {
                            val = `${val}.00`;
                          }

                          const num = Number(val);

                          // ✅ Force exactly 2 decimals
                          setFieldValue("UnitRate", num.toFixed(2));
                        }}
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
                        // onWheel={(e) => e.target.blur()}
                        // multiline
                        inputProps={{ maxLength: 90 }}
                      />
                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label={
                          <span>
                            Billing Type
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        value={values.BillingType}
                        id="BillingType"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BillingType"
                        error={!!touched.BillingType && !!errors.BillingType}
                        helperText={touched.BillingType && errors.BillingType}
                        // required
                        focused
                      >
                        <MenuItem value="CashMemo">Cash Memo</MenuItem>
                        <MenuItem value="GSTInvoice">GST Invoice</MenuItem>
                      </TextField>
                      <TextField
                        name="Hsn"
                        type="text"
                        id="Hsn"
                        label={
                          <span>
                            HSN Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="standard"
                        focused
                        // required
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
                      <CheckinAutocomplete
                        id="shift"
                        name="shift"
                        label={
                          <span>
                            Shift 1
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="outlined"
                        value={values.shift}
                        error={!!touched.shift && !!errors.shift}
                        helperText={touched.shift && errors.shift}
                        onChange={(newValue) => {
                          setFieldValue("shift", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue shift");
                          console.log(newValue.RecordID, "shift RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2108","ScreenName":"Shift","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                      />
                      <CheckinAutocomplete
                        id="shift2"
                        name="shift2"
                        label="Shift 2"
                        variant="outlined"
                        value={values.shift2}
                        error={!!touched.shift2 && !!errors.shift2}
                        helperText={touched.shift2 && errors.shift2}
                        onChange={(newValue) => {
                          setFieldValue("shift2", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue shift2");
                          console.log(newValue.RecordID, "shift2 RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2108","ScreenName":"Shift2","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                      />
                      <TextField
                        name="FromPeriod"
                        type="date"
                        id="FromPeriod"
                        label="From Period"
                        variant="standard"
                        focused
                        value={values.FromPeriod}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFieldValue(name, value);

                          // 🔁 Run same logic if ToDate already exists
                          if (values.ToPeriod) {
                            const toDate = new Date(values.ToPeriod);
                            const fromDate = new Date(value);

                            // Renewal days
                            const diffDays = differenceInDays(toDate, fromDate);
                            setFieldValue("RenewableNotification", diffDays);

                            // Notification Alert Date (still based on ToDate)
                            const alertDate = subDays(toDate, 1);
                            setFieldValue(
                              "NotificationAlertDate",
                              alertDate.toISOString().split("T")[0]
                            );
                          }
                        }}
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
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
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
                          title: errorMsgData.Warningmsg.Delete,
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
              validationSchema={validationSchema10}
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

                      <CheckinAutocomplete
                        name="customer"
                        label={
                          <>
                            Customer
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="customer"
                        // value={customerlookup}
                        value={values.customer}
                        onChange={(newValue) => {
                          setFieldValue("customer", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          console.log(newValue, "--newvalue customer");

                          console.log(newValue.RecordID, "customer RecordID");

                          // SetCustomerlookup({
                          //   RecordID: newValue.RecordID,
                          //   Code: newValue.Code,
                          //   Name: newValue.Name,
                          // });
                        }}
                        error={!!touched.customer && !!errors.customer}
                        helperText={touched.customer && errors.customer}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Customer","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Description"
                        name="Description"
                        value={values.Description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Description"
                        focused
                      // inputProps={{ readOnly: true }}
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
                        label={
                          <span>
                            Billing Units
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        value={values.BillingUnits}
                        id="BillingUnits"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="BillingUnits"
                        // required
                        focused
                        error={!!touched.BillingUnits && !!errors.BillingUnits}
                        helperText={touched.BillingUnits && errors.BillingUnits}
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
                        {/* <MenuItem value="WS">Week</MenuItem> */}
                        <MenuItem value="MS">Month</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        value={values.UnitRate}
                        id="UnitRate"
                        name="UnitRate"
                        label={
                          <span>
                            Unit Rate
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        // required
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
                        // multiline
                        inputProps={{ maxLength: 90 }}
                      />
                      <TextField
                        name="Hsn"
                        type="text"
                        id="Hsn"
                        label={
                          <span>
                            HSN Code
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </span>
                        }
                        variant="standard"
                        focused
                        // required
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
                          title: errorMsgData.Warningmsg.Delete,
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
                        src={viewImage}
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
              validationSchema={validationSchema7}
              enableReinitialize={true}
              // onSubmit={(values, { resetForm }) => {
              //   if (!LeaveconLTData || !LeaveconLTData.RecordID) {
              //     toast.error("Please select the Leave Type");
              //     return;
              //   }
              //   setTimeout(() => {
              //     LCsaveFn(values, resetForm, false);
              //   }, 100);
              // }}
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
                        InputProps={{
                          inputProps: { readOnly: true }
                        }}
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
                        //inputProps={{ maxLength: 90 }}
                        multiline
                        InputProps={{
                          inputProps: { readOnly: true, maxLength: 90 }
                        }}
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
                          loading={exploreLoading}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          rowHeight={dataGridRowHeight}
                          headerHeight={dataGridHeaderFooterHeight}
                          pageSize={pageSize}
                          page={page}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 15, 20]}
                          onPageChange={(pageno) => handlePagechange(pageno)}
                          pagination
                          onCellClick={(params) => {
                            selectCellRowData({
                              rowData: params.row,
                              mode: "E",
                              field: params.field,
                              setFieldValue,
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
                          <CheckinAutocomplete
                            name="leavetype"
                            label={
                              <span>
                                Leave Type
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            id="leavetype"
                            // value={LeaveconLTData}
                            value={values.leavetype}
                            onChange={(newValue) => {
                              setFieldValue("leavetype", {
                                RecordID: newValue.RecordID,
                                Code: newValue.Code,
                                Name: newValue.Name,
                              });
                            }}
                            error={!!touched.leavetype && !!errors.leavetype}
                            helperText={touched.leavetype && errors.leavetype}
                            url={`${listViewurl}?data={"Query":{"AccessID":"2092","ScreenName":"Leave Type","Filter":"parentID='${CompanyID}'","Any":""}}`}
                          />
                        </FormControl>
                        {/* {touched.leavetype && errors.leavetype && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
                              {errors.leavetype}
                            </div>
                          )} */}

                        <TextField
                          fullWidth
                          variant="standard"
                          type="number"
                          label={
                            <span>
                              Eligible Days
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          id="totaldays"
                          // onBlur={handleBlur}
                          onBlur={(e) => {
                            handleBlur(e);

                            const formatted = formatTwoDecimals(e.target.value);
                            setFieldValue("totaldays", formatted);
                          }}
                          onChange={handleChange}
                          value={values.totaldays}
                          name="totaldays"
                          error={!!touched.totaldays && !!errors.totaldays}
                          helperText={touched.totaldays && errors.totaldays}
                          focused
                          // required
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
                          label="Avail Days"
                          id="availableleave"
                          // onBlur={handleBlur}
                          onBlur={(e) => {
                            handleBlur(e);

                            const formatted = formatTwoDecimals(e.target.value);
                            setFieldValue("availableleave", formatted);
                          }}
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
                          // value={
                          //   Number(values.totaldays) -
                          //   Number(values.availableleave)
                          // }
                          value={formatTwoDecimals(
                            Number(values.totaldays) - Number(values.availableleave)
                          )}
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
                                  LCsaveFn(values, resetForm, "harddelete");
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
                        {/* {YearFlag == "true" ? (
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              LCsaveFn(values, resetForm, "harddelete");
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
                    </FormControl>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "13" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              //  onSubmit={handleFormSubmit}
              initialValues={localityinitialValue}
              validationSchema={validationSchema11}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                console.log("Submitting values:", values);
                setTimeout(() => {
                  FnLocalilty(values, resetForm, false);
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
                        {/* <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="localitycode"
                          name="localitycode"
                          value={values.localitycode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // label="Code"
                          label={
                            <span>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          error={!!touched.localitycode && !!errors.localitycode}
                          helperText={touched.localitycode && errors.localitycode}
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        /> */}
                        {CompanyAutoCode == "Y" ? (
                          <TextField
                            name="localitycode"
                            type="text"
                            id="localitycode"
                            label="Locality Code"
                            placeholder="Auto"
                            variant="standard"
                            focused
                            // required
                            value={values.localitycode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              !!touched.localitycode && !!errors.localitycode
                            }
                            helperText={
                              touched.localitycode && errors.localitycode
                            }
                            sx={{
                              backgroundColor: "#ffffff", // Set the background to white
                              "& .MuiFilledInput-root": {
                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                              },
                            }}
                            InputProps={{ readOnly: true }}
                          // autoFocus
                          />
                        ) : (
                          <TextField
                            name="localitycode"
                            type="text"
                            id="localitycode"
                            label={
                              <>
                                Locality Code
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              </>
                            }
                            variant="standard"
                            focused
                            // required
                            value={values.localitycode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              !!touched.localitycode && !!errors.localitycode
                            }
                            helperText={
                              touched.localitycode && errors.localitycode
                            }
                            sx={{
                              backgroundColor: "#ffffff", // Set the background to white
                              "& .MuiFilledInput-root": {
                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                              },
                            }}
                            autoFocus
                          />
                        )}
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          id="localityname"
                          name="localityname"
                          value={values.localityname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // label="Name"
                          label={
                            <span>
                              Name
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </span>
                          }
                          error={
                            !!touched.localityname && !!errors.localityname
                          }
                          helperText={
                            touched.localityname && errors.localityname
                          }
                          focused
                          inputProps={{ tabIndex: "-1" }}
                        />

                        <TextField
                          fullWidth
                          variant="standard"
                          type="number"
                          id="LCpincode"
                          name="LCpincode"
                          label="Pincode"
                          value={values.LCpincode}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 6) {
                              handleChange(e);
                            }
                          }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "#ffffff",
                            },
                          }}
                          focused
                          error={!!touched.LCpincode && !!errors.LCpincode}
                          helperText={touched.LCpincode && errors.LCpincode}
                          inputProps={{
                            tabIndex: "-1",
                          }}
                        />

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
                                    FnLocalilty(
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


        {show == "17" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={itemcustody1InitialValue}
              enableReinitialize={true}
              validationSchema={validationSchema17}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  empItemCustody1Fn(values, resetForm, false);
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

                    <FormControl sx={{
                      gap: formGap,
                      marginTop: "20px"
                    }}>

                      <ItemGroupLookup
                        sx={{ marginTop: "7px" }}
                        name="itemGroup"
                        label={
                          <>
                            Item Group
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="itemGroup"
                        value={values.itemGroup}
                        onChange={(newValue) => {
                          setFieldValue("itemGroup", newValue);
                          setFieldValue("itemGroupID", newValue.RecordID);
                          console.log(newValue, "--newValue");
                          console.log(newValue.RecordID, "////");

                          setFieldValue("items", null);
                        }}
                        error={!!touched.itemGroup && !!errors.itemGroup}
                        helperText={touched.itemGroup && errors.itemGroup}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2144","ScreenName":"Department","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                      />


                      <ItemsLookup
                        // sx={{ marginTop: "7px" }}
                        name="items"
                        label={
                          <>
                            Item
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </>
                        }
                        variant="outlined"
                        id="items"
                        value={values.items}
                        onChange={(newValue) => {
                          setFieldValue("items", newValue);
                        }}
                        error={!!touched.items && !!errors.items}
                        helperText={touched.items && errors.items}
                        //  onChange={handleSelectionFunctionname}
                        // defaultValue={selectedFunctionName}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2145","ScreenName":"Items","Filter":"ItemGroupID='${values.itemGroup ? values.itemGroup.RecordID : ""}' AND CompanyID='${CompanyID}'","Any":""}}`}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.ItemValue}
                        id="ItemValue"
                        name="ItemValue"
                        label={
                          <>
                            Item Value{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                       onChange={(e) => {
                            // allow only numbers + decimal
                            const val = e.target.value;
                            if (/^\d*\.?\d*$/.test(val)) {
                              setFieldValue("ItemValue", val);
                            }
                          }}
                          onBlur={(e) => {
                            let val = e.target.value;

                            if (val === "" || val === ".") {
                              setFieldValue("ItemValue", "0.00");
                              return;
                            }

                            const num = parseFloat(val);
                            if (!isNaN(num)) {
                              setFieldValue("ItemValue", num.toFixed(2)); // ✅ forces .00
                            }
                          }}
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
                        // multiline
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
                        //type="text"
                        type="number"
                        value={values.AssestID}
                        id="AssestID"
                        name="AssestID"
                        label={
                          <>
                            Asset ID{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                        //multiline
                        //inputProps={{ maxLength: 90 }}
                        InputProps={{
                          inputProps: {
                            style: { maxLength: 90, textAlign: "right" }
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        value={values.PurchaseReference}
                        id="PurchaseReference"
                        name="PurchaseReference"
                        label={
                          <>
                            Purchase Reference{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        // required
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
                            style: { textAlign: "left" },
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    padding={1}
                    //style={{ marginTop: "-40px" }}
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
                            empItemCustody1Fn(values, resetForm, "harddelete");
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
