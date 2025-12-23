import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  LinearProgress,
  FormLabel,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import {
  dataGridHeaderFooterHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchData,
  ItemFlagFetchData,
  ItemFlagMenuPut,
  ItemMainGETFetchData,
  ItemMainMenuFetchData,
  ItemMainpostData,
  ItemStockMenuGet,
  ItemStockMenuPut,
  postData,
  VendorRegisterFetchData,
} from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
// import {
//   ManagerAppraisalPayload,
//   PeerAppraisalPayload,
//   SelfAppraisalPayload,
//   SingleFormikSkillAutocomplete,
//   SingleFormikSkillAutocompletePayload,
//   SubordinateAppraisalPayload,
// } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
import {
  fetchExplorelitview,
  getFetchUserData,
} from "../../../store/reducers/Explorelitviewapireducer";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tokens } from "../../../Theme";
import { useTheme } from "@emotion/react";
const EditItem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  //const accessID = "TR283";
  const screenName = params.screenName;
  const mode = params.Mode;
  const EmpId = params.parentID3;
  const QuestionID = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;

  const AssessmentType = state.AssessmentType;
  console.log("🚀 ~ CreateCandidates ~ AssessmentType:", AssessmentType);
  const DesignationID = state.DesignationID;
  console.log("🚀 ~ CreateCandidates ~ DesignationID:", DesignationID);

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const ItemGetData = useSelector(
    (state) => state.formApi.itemMainGETFetchData
  );
  const ItemMainData = useSelector((state) => state.formApi.itemMainGetData);
  const ItemFlagData = useSelector((state) => state.formApi.itemFlagGetData);
  const ItemStockData = useSelector((state) => state.formApi.itemStockGetData);

  const ItemMainDataLoading = useSelector(
    (state) => state.formApi.itemMainGetDataloading
  );
  const ItemFlagDataLoading = useSelector(
    (state) => state.formApi.itemFlagGetDataloading
  );
  const ItemStockDataLoading = useSelector(
    (state) => state.formApi.itemStockGetDataloading
  );
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector(
    (state) => state.globalurl.AssessmentAutoUrl
  );
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema2, setValidationSchema2] = useState(null);
  const [validationSchema3, setValidationSchema3] = useState(null);

  const ItemCategorID = params.parentID1;
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        const schema = Yup.object().shape({
          Description: Yup.string().required(data.Item.Description),
        });
        const schema2 = Yup.object().shape({
          PurchaseUOM: Yup.string().required(data.Item.PurchaseUOM),
          ConsumptionUOM: Yup.string().required(data.Item.ConsumptionUOM),
          BoxQuantity: Yup.string().required(data.Item.BoxQuantity),
          PieceQuantity: Yup.string().required(data.Item.PieceQuantity),
          ConversionQty: Yup.string().required(data.Item.ConversionQty),
          GuidelinePrice: Yup.string().required(data.Item.GuidelinePrice),
          MinStock: Yup.string().required(data.Item.MinStock),
          ReorderLevel: Yup.string().required(data.Item.ReorderLevel),
        });
        const schema3 = Yup.object().shape({
          supplier: Yup.object().nullable().required(data.Item.supplier).shape({
            RecordID: Yup.string().required(),
            Name: Yup.string().required(),
          }),
          MinOrderQty: Yup.string().required(data.Item.MinOrderQty),
          LeadTime: Yup.string().required(data.Item.LeadTime),
          AgreedPrice: Yup.string().required(data.Item.AgreedPrice),
        });
        setValidationSchema(schema);
        setValidationSchema2(schema2);
        setValidationSchema3(schema3);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  useEffect(() => {
    dispatch(
      ItemMainMenuFetchData({
        get: "get",
        CompanyID: CompanyID,
        ItemCategoryID: ItemCategorID,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(ItemMainGETFetchData({ get: "get", recID: recID }));
  }, []);

  const curDate = new Date().toISOString().split("T")[0];
  const [show, setScreen] = React.useState("0");

  const [funMode, setFunMode] = useState("A");
  const [laomode, setLaoMode] = useState("A");
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const commentsRef = useRef(null);

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector(
    (state) => state.exploreApi.loading
  );

  // **********ScreenChange Function*********
  const [leadData, setLeadData] = useState({
    recordID: "",
    MinOrderQty: "",
    supplier: "",
    LeadTime: "",
    AgreedPrice: "",
    LastOrderDate: "",
    LastOrderNo: "",
    LastOrderPrice: "",
    LastOrderQty: "",
    LastOrderRating: "",
    Sortorder: "",
    Disable: "",
  });

  // const LeadInitialValues = {
  //   Description: leadData.Name,
  //   Code: leadData.TaskDate,
  //   supplier: leadData.supplier || null,
  //   MinOrderQty: leadData.MinOrderQty || null,
  //   LeadTime: leadData.LeadTime || null,
  //   AgreedPrice: leadData.AgreedPrice || null,
  //   LastOrderDate: leadData.LastOrderDate || null,
  //   LastOrderNo: leadData.LastOrderNo || null,
  //   LastOrderPrice: leadData.LastOrderPrice || null,
  //   LastOrderQty: leadData.LastOrderQty || null,
  //   LastOrderRating: leadData.LastOrderRating || null,
  // };
  const LeadInitialValues = {
    Description: state.BreadCrumb3 || "",
    Code: state.ItemCode || "",
    supplier: null,
    MinOrderQty: "",
    LeadTime: "",
    AgreedPrice: "",
    LastOrderDate: "",
    LastOrderNo: "",
    LastOrderPrice: "",
    LastOrderQty: "",
    LastOrderRating: "",
  };

  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(ItemMainGETFetchData({ get: "get", recID: recID }));
      } else {
        dispatch(ItemMainGETFetchData({ get: "get", recID: recID }));
      }
    }
    if (event.target.value == "1") {
      if (recID && mode === "E") {
        dispatch(ItemFlagFetchData({ get: "get", recID }));
      } else {
        dispatch(ItemFlagFetchData({ get: "", recID }));
      }
    }
    if (event.target.value == "2") {
      if (recID && mode === "E") {
        dispatch(ItemStockMenuGet({ get: "get", recID }));
      } else {
        dispatch(ItemStockMenuGet({ get: "", recID }));
      }
    }
    if (event.target.value === 3) {
      if (recID && mode === "E") {
        dispatch(
          fetchExplorelitview(
            "TR326",
            "Lead Time",
            `CompanyID='${CompanyID}' AND ItemID='${recID}'`,
            ""
          )
        );
      } else {
        dispatch(
          fetchExplorelitview({
            AccessID: "",
            Filter: `CompanyID='${CompanyID}'`,
          })
        );
      }
    }

    // if (event.target.value == "2") {
    //   dispatch(PartyBankget({ VendorID: recID }));
    // }
  };

  const ItemMainSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      ItemCategoryID: ItemCategorID,
      Code: values.Code,
      Description: values.Description || "",
      Sortorder: values.Sortorder || "0",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",
    };

    const response = await dispatch(ItemMainpostData({ action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // if (mode === "A") {
      //   navigate(-1);
      // } else if (mode === "E") {
      //   setScreen("0");
      // }
      // setScreen("2");
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };
  const ItemSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      ItemCategoryRecordID: ItemCategorID,
      PurchaseUOM: values.PurchaseUOM || "",
      ConsumptionUOM: values.ConsumptionUOM || "",
      ConsumptionUOMQty: values.PieceQuantity || "",
      PurchaseUOMQty: values.BoxQuantity || "",
      ConversionQty: values.ConversionQty || "",
      Price: values.GuidelinePrice || "",
      MinStock: values.MinStock || "",
      ReorderLevel: values.ReorderLevel || "",
    };

    const response = await dispatch(ItemStockMenuPut({ action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setScreen("2");
      // navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };
  const ItemFlagSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      ItemCategoryID: ItemCategorID,
      Tradable: values.Tradable == true ? "Y" : "N",
      UnderEmployeeCustody: values.UnderEmployeeCustody == true ? "Y" : "N",
      IfExpiryApplicable: values.ExpiryApplicable == true ? "Y" : "N",
      ByProduct: values.ByProduct == true ? "Y" : "N",
      ServiceAndMaintenance: values.ServiceAndMaintenance == true ? "Y" : "N",
      SpecRequired: values.SpecRequired == true ? "Y" : "N",
      ExtendedWarrentyApplicable:
        values.ExtendedWarrentyApplicable == true ? "Y" : "N",
      OnDemand: values.OnDemand == true ? "Y" : "N",
      ScheduledService: values.ScheduledService == true ? "Y" : "N",
      ExtendedWarrentyPeriod: values.ExtendedWarranty || "",
      ExtendedWarrentyEndPeriod: values.ExtendedWarrantyEnd || "",
      ToatalWarretyPeriod: values.WarrantyPeriod || "",
      WarretyEndPeriod: values.WarrantyEndPeriod || "",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",
    };

    const response = await dispatch(ItemFlagMenuPut({ action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      setScreen("1");
      // navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };
  const LeadSaveFn = async (values, resetForm, del) => {
    setLoading(true);
    const isCheck = values.disable ? "Y" : "N";

    let action =
      funMode === "A" && !del
        ? "insert"
        : funMode === "E" && del
        ? "harddelete"
        : "update";
    const idata = {
      RecordID: funMode === "A" ? "-1" : leadData.recordID,
      CompanyID: CompanyID,
      PartyID: values.supplier.RecordID || "",
      ItemID: recID || "",
      MinimunOrdQty: values.MinOrderQty || "",
      LeadTimeinDays: values.LeadTime || "0",
      AggreedPrice: values.AgreedPrice || "0",
      LastOrdDate: values.LastOrderDate || "",
      LastOrdNumber: values.LastOrderNo || "0",
      LastOrdRating: values.LastOrderRating || "0",
      LastOrdQty: values.LastOrderQty || "0",
      LastOrdPrice: values.LastOrderPrice || "0",
      Sortorder: values.Sortorder || "0",

      // LastOrdNumber: 1 || "",
      // LastOrdQty: 5 || "",
      // LastOrdPrice: 100 || "",
      // LastOrdRating: 10 || "",
      // Sortorder: 1 || "",

      Disable: values.Disable || "N",
    };

    const response = await dispatch(
      postData({ accessID: "TR326B", action, idata })
    );

    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);
      setLoading(false);
      dispatch(
        fetchExplorelitview(
          "TR326",
          "Lead Time",
          `CompanyID='${CompanyID}' AND ItemID='${recID}'`,
          ""
        )
      );
      selectCellRowData({ rowData: {}, mode: "A", field: "", type: "product" });
      resetForm();
      dispatch(ItemMainGETFetchData({ get: "get", recID: recID }));
    } else {
      toast.error(response.payload.Msg);
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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    Code: ItemGetData.Code || "",
    //Description: ItemMainData?.HSNDetails?.HSNDescription || ItemGetData.HSNDescription || "",
    Description: ItemGetData.Description || "",
    HSNCode:
      ItemMainData?.HSNDetails?.HSNMasterCode ||
      ItemGetData.HSNMasterCode ||
      "",
    HSNIGST: ItemMainData?.HSNDetails?.IGST || ItemGetData.IGST || "",
    HSNCGST: ItemMainData?.HSNDetails?.CGST || ItemGetData.CGST || "",
    HSNSGST: ItemMainData?.HSNDetails?.SGST || ItemGetData.SGST || "",
    Sortorder: ItemGetData.Sortorder || "",
    Disable: ItemGetData.Disable == "Y" ? true : false,
    DeleteFlag: ItemGetData.DeleteFlag == "Y" ? true : false,
  };
  const FlaginitialValues = {
    Code: ItemFlagData?.Code || "",
    Description: ItemFlagData?.Description || "",

    ExtendedWarrantyEnd: ItemFlagData?.ExtendedWarrentyEndPeriod || "",
    ExtendedWarranty: ItemFlagData?.ExtendedWarrentyPeriod || "",
    WarrantyPeriod: ItemFlagData?.ToatalWarretyPeriod || "",
    WarrantyEndPeriod: ItemFlagData?.WarretyEndPeriod || "",
    ExtendedWarrentyApplicable:
      ItemFlagData?.ExtendedWarrentyApplicable == "Y" ? true : false,
    OnDemand: ItemFlagData?.OnDemand == "Y" ? true : false,
    ScheduledService: ItemFlagData?.ScheduledService == "Y" ? true : false,

    ByProduct: ItemFlagData?.ByProduct == "Y" ? true : false,
    ExpiryApplicable: ItemFlagData?.IfExpiryApplicable == "Y" ? true : false,
    ServiceAndMaintenance:
      ItemFlagData?.ServiceAndMaintenance == "Y" ? true : false,
    SpecRequired: ItemFlagData?.SpecRequired == "Y" ? true : false,
    UnderEmployeeCustody:
      ItemFlagData?.UnderEmployeeCustody == "Y" ? true : false,
    Tradable: ItemFlagData?.Tradable == "Y" ? true : false,
  };
  const StockinitialValues = {
    Code: ItemStockData?.Code || "",
    Description: ItemStockData?.Description || "",
    BoxQuantity: ItemStockData?.PurchaseUOMQty || "",
    PieceQuantity: ItemStockData?.ConsumptionUOMQty || "",
    PurchaseUOM: ItemStockData?.PurchaseUOM || "",
    ConsumptionUOM: ItemStockData?.ConsumptionUOM || "",
    ConversionQty: ItemStockData?.ConversionQty || "",
    GuidelinePrice: ItemStockData?.Price || "",
    majCusstkQty: ItemStockData?.MajorCusStockQty || "",
    minCusstkQty: ItemStockData?.MinorCusStockQty || "",
    majvendorstkQty: ItemStockData?.MajorVenStockQty || "",
    minvendorstkQty: ItemStockData?.MinorVenStockQty || "",
    MinStock: ItemStockData?.MinStock || "",
    ReorderLevel: ItemStockData?.ReorderLevel || "",
  };
  // const selectCellRowData = ({ rowData, mode, field, setFieldValue, type }) => {
  //   setFunMode(mode);
  //   setLaoMode(mode);

  //   if (mode == "A") {
  //     setLeadData({
  //       recordID: "",
  //       MinOrderQty: "",
  //       supplier: "",
  //       LeadTime: "",
  //       AgreedPrice: "",
  //       LastOrderDate: "",
  //       LastOrderNo: "",
  //       LastOrderPrice: "",
  //       LastOrderQty: "",
  //       LastOrderRating: "",
  //       Sortorder: "",
  //       Disable: "",
  //     });
  //   } else {
  //     if (field == "action") {
  //       setLeadData({
  //         recordID: rowData.RecordID,
  //         supplier: rowData.PartyID
  //           ? {
  //               RecordID: rowData.PartyID,
  //               Code: rowData.PartyCode || "",
  //               Name: rowData.PartyName || "",
  //             }
  //           : null,
  //         MinOrderQty: rowData.MinimunOrdQty,
  //         LeadTime: rowData.LeadTimeinDays,
  //         AgreedPrice: rowData.AggreedPrice,
  //         LastOrderDate: rowData.LastOrdDate,
  //         LastOrderNo: rowData.LastOrdNumber,
  //         LastOrderPrice: rowData.LastOrdPrice,
  //         LastOrderQty: rowData.LastOrdQty,
  //         LastOrderRating: rowData.LastOrdRating,
  //         Sortorder: rowData.Sortorder,
  //         Disable: rowData.Disable,
  //       });
  //       setFieldValue("supplier", {
  //         RecordID: rowData.PartyID,
  //         Code: rowData.PartyCode,
  //         Name: rowData.PartyName,
  //       });
  //     }
  //   }

  //   console.log(selectCellRowData, "Itemservices");
  // };
  const selectCellRowData = ({ rowData, mode, setFieldValue }) => {
    setFunMode(mode);
    setLaoMode(mode);

    if (mode === "A") {
      return;
    }

    if (mode === "E") {
      setFieldValue("supplier", {
        RecordID: rowData.PartyID,
        Code: rowData.PartyCode || "",
        Name: rowData.PartyName || "",
      });

      setFieldValue("MinOrderQty", rowData.MinimunOrdQty || "");
      setFieldValue("LeadTime", rowData.LeadTimeinDays || "");
      setFieldValue("AgreedPrice", rowData.AgreedPrice || "");
      setFieldValue("LastOrderDate", rowData.LastOrdDate || "");
      setFieldValue("LastOrderNo", rowData.LastOrdNumber || "");
      setFieldValue("LastOrderQty", rowData.LastOrdQty || "");
      setFieldValue("LastOrderPrice", rowData.LastOrdPrice || "");
      setFieldValue("LastOrderRating", rowData.LastOrdRating || "");
setLeadData((prev) => ({
  ...prev,
  recordID: rowData.RecordID,
}));
    }
  };

  let VISIBLE_FIELDS = []; // <-- default always array

  if (show == "3") {
    VISIBLE_FIELDS = [
      "SLNO",
      "PartyName",
      "LeadTimeinDays",
      "MinimunOrdQty",
      "AgreedPrice",
      "action",
    ];
  }
  const newcolumn = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

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
          <Typography>{show == "3" ? "List of Leads" : ""}</Typography>
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

  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
        {ItemMainDataLoading ? <LinearProgress /> : null}
        {ItemFlagDataLoading ? <LinearProgress /> : null}
        {ItemStockDataLoading ? <LinearProgress /> : null}
        {isLoading ? <LinearProgress /> : null}

        {/* BREADCRUMBS */}
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
                    onClick={() => navigate("/Apps/TR315/ItemGroup")}
                  >
                    List Of Item Group ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() =>
                      navigate(
                        `/Apps/SecondarylistView/Item%20Group/${params.accessID1}/${params.screenName}/${params.parentID3}/${params.parentID2}`,
                        {
                          state: {
                            ...state,
                          },
                        }
                      )
                    }
                  >
                    List Of Item Category ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    {mode === "E"
                      ? `List Of Items
                    (${state.BreadCrumb3})`
                      : `List Of Item`}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "E" ? "Edit" : "View"}
                  </Typography>
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
                    <MenuItem value={0}>Main</MenuItem>
                    <MenuItem value={1}>Flag</MenuItem>
                    <MenuItem value={2}>Stock</MenuItem>
                    {/* <MenuItem value={3}>Lead Time</MenuItem> */}
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

        {/* {!getLoading ? ( */}
        {show == "0" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemMainSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
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
                      name="Description"
                      type="text"
                      id="Description"
                      label={
                        <span>
                          Description{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      //InputProps={{ readOnly: true }}

                      autoFocus
                    />
                    <TextField
                      name="HSNCode"
                      type="text"
                      id="HSNCode"
                      label="HSN Code"
                      //   label={
                      //     <span>
                      //       HSN Code{" "}
                      //       <span
                      //         style={{
                      //           fontSize: "20px",
                      //           color: "red",
                      //         }}
                      //       >
                      //         *
                      //       </span>
                      //     </span>
                      //   }
                      variant="standard"
                      focused
                      value={values.HSNCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNCode && !!errors.HSNCode}
                      helperText={touched.HSNCode && errors.HSNCode}
                      autoFocus
                    />
                    <TextField
                      name="HSNIGST"
                      type="number"
                      id="HSNIGST"
                      label="IGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNIGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNIGST && !!errors.HSNIGST}
                      helperText={touched.HSNIGST && errors.HSNIGST}
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNCGST"
                      type="number"
                      id="HSNCGST"
                      label="CGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNCGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNCGST && !!errors.HSNCGST}
                      helperText={touched.HSNCGST && errors.HSNCGST}
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    <TextField
                      name="HSNSGST"
                      type="number"
                      id="HSNSGST"
                      label="SGST(In Percentage)"
                      variant="standard"
                      focused
                      value={values.HSNSGST}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.HSNSGST && !!errors.HSNSGST}
                      helperText={touched.HSNSGST && errors.HSNSGST}
                      InputProps={{
                        inputProps: {
                          readOnly: true,
                          style: { textAlign: "right" },
                        },
                      }}
                    />
                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      label="Sort Order"
                      value={values.Sortorder}
                      id="Sortorder"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Sortorder"
                      // error={!!touched.Sortorder && !!errors.Sortorder}
                      // helperText={touched.Sortorder && errors.Sortorder}

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
                          //readOnly: mode == "V",
                        },
                      }}
                    />

                    {/* CHECKBOX */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                      //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "1" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={FlaginitialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemFlagSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              //validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
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
                      name="Description"
                      type="text"
                      id="Description"
                      label="Description"
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      autoFocus
                      InputProps={{
                        inputProps: { readOnly: true },
                      }}
                    />
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Tradable"
                            checked={values.Tradable}
                            onChange={handleChange}
                          />
                        }
                        label="Tradable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="UnderEmployeeCustody"
                            checked={values.UnderEmployeeCustody}
                            onChange={handleChange}
                          />
                        }
                        label="Under Employee Custody"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ByProduct"
                            checked={values.ByProduct}
                            onChange={handleChange}
                          />
                        }
                        label="ByProduct (Job Work Component)"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ExpiryApplicable"
                            checked={values.ExpiryApplicable}
                            onChange={handleChange}
                          />
                        }
                        label="Expiry Applicable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ServiceAndMaintenance"
                            checked={values.ServiceAndMaintenance}
                            //onChange={handleChange}
                            onChange={(e) =>
                              setFieldValue(
                                "ServiceAndMaintenance",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label="Service And Maintainence"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="SpecRequired"
                            checked={values.SpecRequired}
                            onChange={handleChange}
                          />
                        }
                        label="Spec Required"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                      />
                    </Box>

                    {/* CHECKBOX */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                        sx={{
                          marginTop: "20px",
                          "@media (max-width:500px)": {
                            marginTop: 0,
                          },
                        }}
                        //inputProps={{ readOnly: mode == "V" }}
                      />
                    </Box>
                    {values.ServiceAndMaintenance && (
                      <>
                        <TextField
                          name="WarrantyPeriod"
                          type="number"
                          id="WarrantyPeriod"
                          label="Warranty Period (In Months)"
                          variant="standard"
                          focused
                          value={values.WarrantyPeriod}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.WarrantyPeriod && !!errors.WarrantyPeriod
                          }
                          helperText={
                            touched.WarrantyPeriod && errors.WarrantyPeriod
                          }
                          autoFocus
                          InputProps={{
                            inputProps: { textAlign: "right" },
                          }}
                        />
                        <TextField
                          name="WarrantyEndPeriod"
                          type="text"
                          id="WarrantyEndPeriod"
                          label="Warranty End Period"
                          variant="standard"
                          focused
                          value={values.WarrantyEndPeriod}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.WarrantyEndPeriod &&
                            !!errors.WarrantyEndPeriod
                          }
                          helperText={
                            touched.WarrantyEndPeriod &&
                            errors.WarrantyEndPeriod
                          }
                          autoFocus
                          // InputProps={{
                          //   inputProps: { textAlign: "right" },
                          // }}
                        />

                        <TextField
                          name="ExtendedWarranty"
                          type="number"
                          id="ExtendedWarranty"
                          label="Extended Warranty(In Months)"
                          variant="standard"
                          focused
                          value={values.ExtendedWarranty}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.ExtendedWarranty &&
                            !!errors.ExtendedWarranty
                          }
                          helperText={
                            touched.ExtendedWarranty && errors.ExtendedWarranty
                          }
                          autoFocus
                          InputProps={{
                            inputProps: { textAlign: "right" },
                          }}
                        />
                        <TextField
                          name="ExtendedWarrantyEnd"
                          type="number"
                          id="ExtendedWarrantyEnd"
                          label="Extended Warranty End(In Months)"
                          variant="standard"
                          focused
                          value={values.ExtendedWarrantyEnd}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.ExtendedWarrantyEnd &&
                            !!errors.ExtendedWarrantyEnd
                          }
                          helperText={
                            touched.ExtendedWarrantyEnd &&
                            errors.ExtendedWarrantyEnd
                          }
                          autoFocus
                          InputProps={{
                            inputProps: { textAlign: "right" },
                          }}
                        />
                        <Box>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="ExtendedWarrentyApplicable"
                                checked={values.ExtendedWarrentyApplicable}
                                onChange={handleChange}
                              />
                            }
                            label="Extended Warranty Applicable"
                            sx={{
                              marginTop: "20px",
                              "@media (max-width:500px)": {
                                marginTop: 0,
                              },
                            }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="OnDemand"
                                checked={values.OnDemand}
                                onChange={handleChange}
                              />
                            }
                            label="Demand Basis"
                            sx={{
                              marginTop: "20px",
                              "@media (max-width:500px)": {
                                marginTop: 0,
                              },
                            }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="ScheduledService"
                                checked={values.ScheduledService}
                                onChange={handleChange}
                              />
                            }
                            label="On Schedule"
                            sx={{
                              marginTop: "20px",
                              "@media (max-width:500px)": {
                                marginTop: 0,
                              },
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                      //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      //onClick={() => navigate(-1)}
                      onClick={() => setScreen("0")}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "2" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={StockinitialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ItemSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema2}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
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
                      name="Description"
                      type="text"
                      id="Description"
                      label={
                        <span>
                          Description{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                      InputProps={{ readOnly: true }}
                      autoFocus
                    />
                    {/* <TextField
                      name="BoxQuantity"
                      type="number"
                      id="BoxQuantity"
                      label={
                        <span>
                          Major Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.BoxQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.BoxQuantity && !!errors.BoxQuantity}
                      helperText={touched.BoxQuantity && errors.BoxQuantity}
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                    <TextField
                      name="PieceQuantity"
                      type="number"
                      id="PieceQuantity"
                      label={
                        <span>
                          Minor Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.PieceQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.PieceQuantity && !!errors.PieceQuantity}
                      helperText={touched.PieceQuantity && errors.PieceQuantity}
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    /> */}
                    <TextField
                      name="PurchaseUOM"
                      type="text"
                      id="PurchaseUOM"
                      label={
                        <span>
                          Major UOM{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.PurchaseUOM}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.PurchaseUOM && !!errors.PurchaseUOM}
                      helperText={touched.PurchaseUOM && errors.PurchaseUOM}
                      autoFocus
                    />
                    <TextField
                      name="ConsumptionUOM"
                      type="text"
                      id="ConsumptionUOM"
                      label={
                        <span>
                          Minor UOM{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.ConsumptionUOM}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.ConsumptionUOM && !!errors.ConsumptionUOM
                      }
                      helperText={
                        touched.ConsumptionUOM && errors.ConsumptionUOM
                      }
                      autoFocus
                    />
                    <TextField
                      name="ConversionQty"
                      type="number"
                      id="ConversionQty"
                      label={
                        <span>
                          Conversion Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.ConversionQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ConversionQty && !!errors.ConversionQty}
                      helperText={touched.ConversionQty && errors.ConversionQty}
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />

                    <TextField
                      name="GuidelinePrice"
                      type="number"
                      id="GuidelinePrice"
                      label={
                        <span>
                          Guideline Price (Box){" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.GuidelinePrice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.GuidelinePrice && !!errors.GuidelinePrice
                      }
                      helperText={
                        touched.GuidelinePrice && errors.GuidelinePrice
                      }
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                    <TextField
                      name="MinStock"
                      type="number"
                      id="MinStock"
                      label={
                        <span>
                          Minimum Item Quantity{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.MinStock}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.MinStock && !!errors.MinStock}
                      helperText={touched.MinStock && errors.MinStock}
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                    <TextField
                      name="ReorderLevel"
                      type="number"
                      id="ReorderLevel"
                      label={
                        <span>
                          Reorder Level{" "}
                          <span
                            style={{
                              fontSize: "20px",
                              color: "red",
                            }}
                          >
                            *
                          </span>
                        </span>
                      }
                      variant="standard"
                      focused
                      value={values.ReorderLevel}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ReorderLevel && !!errors.ReorderLevel}
                      helperText={touched.ReorderLevel && errors.ReorderLevel}
                      autoFocus
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                      //disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      //onClick={() => navigate(-1)}
                      onClick={() => setScreen("0")}
                    >
                      Cancel
                    </Button>
                  </Box>
                  {/* ===== STOCK ===== */}
                  <Divider sx={{ mt: 2 }} />
                  <Typography variant="h6" padding={1}>
                    Stock
                  </Typography>

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
                    <TextField
                      name="BoxQuantity"
                      type="number"
                      label="Major Quantity"
                      variant="standard"
                      value={values.BoxQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      focused
                      error={!!touched.BoxQuantity && !!errors.BoxQuantity}
                      helperText={touched.BoxQuantity && errors.BoxQuantity}
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />

                    <TextField
                      name="PieceQuantity"
                      type="number"
                      label="Minor Quantity"
                      variant="standard"
                      focused
                      value={values.PieceQuantity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.PieceQuantity && !!errors.PieceQuantity}
                      helperText={touched.PieceQuantity && errors.PieceQuantity}
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                  </Box>

                  {/* ===== CUSTOMER STOCK ===== */}
                  <Divider sx={{ mt: 2 }} />
                  <Typography variant="h6" padding={1}>
                    Customer Stock
                  </Typography>

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
                    <TextField
                      name="majCusstkQty"
                      type="number"
                      label="Major Quantity"
                      variant="standard"
                      focused
                      value={values.majCusstkQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.majCusstkQty && !!errors.majCusstkQty}
                      helperText={touched.majCusstkQty && errors.majCusstkQty}
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />

                    <TextField
                      name="minCusstkQty"
                      type="number"
                      label="Minor Quantity"
                      variant="standard"
                      focused
                      value={values.minCusstkQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.minCusstkQty && !!errors.minCusstkQty}
                      helperText={touched.minCusstkQty && errors.minCusstkQty}
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                  </Box>

                  {/* ===== VENDOR STOCK ===== */}
                  <Divider sx={{ mt: 2 }} />
                  <Typography variant="h6" padding={1}>
                    Vendor Stock
                  </Typography>

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
                    <TextField
                      name="majvendorstkQty"
                      type="number"
                      label="Major Quantity"
                      variant="standard"
                      focused
                      value={values.majvendorstkQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.majvendorstkQty && !!errors.majvendorstkQty
                      }
                      helperText={
                        touched.majvendorstkQty && errors.majvendorstkQty
                      }
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />

                    <TextField
                      name="minvendorstkQty"
                      type="number"
                      label="Minor Quantity"
                      variant="standard"
                      focused
                      value={values.minvendorstkQty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.minvendorstkQty && !!errors.minvendorstkQty
                      }
                      helperText={
                        touched.minvendorstkQty && errors.minvendorstkQty
                      }
                      InputProps={{
                        readOnly: true,
                        inputProps: { style: { textAlign: "right" } },
                      }}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
        {show == "3" ? (
          <Paper elevation={3} sx={{ margin: "10px" }}>
            <Formik
              initialValues={LeadInitialValues}
              enableReinitialize={false}
              validationSchema={validationSchema3}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  LeadSaveFn(values, resetForm, false);
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
                setFieldTouched,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  onReset={() => {
                    selectCellRowData({
                      rowData: {},
                      mode: "A",
                      field: "",
                      type: "product",
                    });
                    resetForm({
                      values: {
                        Description: "",
                        Code: "",
                        supplier: null,
                        MinOrderQty: "",
                        LeadTime: "",
                        AgreedPrice: "",
                        LastOrderDate: "",
                        LastOrderNo: "",
                        LastOrderPrice: "",
                        LastOrderQty: "",
                        LastOrderRating: "",
                      },
                    });
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
                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Code"
                        name="Code"
                        value={values.Code}
                        label="Code"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                    <FormControl sx={{ gap: formGap }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        id="Description"
                        name="Description"
                        value={values.Description}
                        label="Description"
                        focused
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>

                    <Box
                      m="5px 0 0 0"
                      //height={dataGridHeight}
                      height="65vh"
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
                        columns={newcolumn}
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
                            type: "product",
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
                      sx={{
                        gap: formGap,
                        marginTop: "10px",
                        // justifyContent:"space-evenly"
                      }}
                    >
                      <CheckinAutocomplete
                        name="supplier"
                        //label="Item"
                        label={
                          <>
                            Supplier
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        id="supplier"
                        value={values.supplier}
                        onChange={(newValue) => {
                          setFieldValue("supplier", {
                            RecordID: newValue.RecordID,
                            Code: newValue.Code,
                            Name: newValue.Name,
                          });
                          setFieldTouched("supplier", true);

                          // setFieldValue(
                          //   "productCategoryID",
                          //   newValue.CrmItemCategoryID || ""
                          // );
                          setTimeout(() => {
                            commentsRef.current?.focus();
                          }, 100);
                        }}
                        error={!!touched.supplier && !!errors.supplier}
                        helperText={touched.supplier && errors.supplier}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Item Lead Time","Filter":"parentID=${CompanyID}","Any":""}}`}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        id="MinOrderQty"
                        name="MinOrderQty"
                        //label="Min Order Qty"
                        label={
                          <>
                            Min Order Qty
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.MinOrderQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.MinOrderQty && !!errors.MinOrderQty}
                        helperText={touched.MinOrderQty && errors.MinOrderQty}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        id="AgreedPrice"
                        name="AgreedPrice"
                        //label="Agreed Price"
                        label={
                          <>
                            Agreed Price
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.AgreedPrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.AgreedPrice && !!errors.AgreedPrice}
                        helperText={touched.AgreedPrice && errors.AgreedPrice}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        id="LeadTime"
                        name="LeadTime"
                        //label="Lead Time (In days)"
                        label={
                          <>
                            Lead Time (In days)
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </>
                        }
                        value={values.LeadTime}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.LeadTime && !!errors.LeadTime}
                        helperText={touched.LeadTime && errors.LeadTime}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        focused
                        type="date"
                        variant="standard"
                        id="LastOrderDate"
                        name="LastOrderDate"
                        label="Last Order Date"
                        inputFormat="YYYY-MM-DD"
                        value={values.LastOrderDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.LastOrderDate && !!errors.LastOrderDate
                        }
                        helperText={
                          touched.LastOrderDate && errors.LastOrderDate
                        }
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            readOnly: true,
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        variant="standard"
                        id="LastOrderNo"
                        name="LastOrderNo"
                        label="Last Order No."
                        value={values.LastOrderNo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.LastOrderNo && !!errors.LastOrderNo}
                        helperText={touched.LastOrderNo && errors.LastOrderNo}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            readOnly: true,
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        id="LastOrderQty"
                        name="LastOrderQty"
                        label="Last Order Qty"
                        value={values.LastOrderQty}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={!!touched.LastOrderQty && !!errors.LastOrderQty}
                        helperText={touched.LastOrderQty && errors.LastOrderQty}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            readOnly: true,
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        variant="standard"
                        id="LastOrderPrice"
                        name="LastOrderPrice"
                        label="Last Order Price"
                        value={values.LastOrderPrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={
                          !!touched.LastOrderPrice && !!errors.LastOrderPrice
                        }
                        helperText={
                          touched.LastOrderPrice && errors.LastOrderPrice
                        }
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            readOnly: true,
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        variant="standard"
                        id="LastOrderRating"
                        name="LastOrderRating"
                        label="Last Order Rating"
                        value={values.LastOrderRating}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        focused
                        error={
                          !!touched.LastOrderRating && !!errors.LastOrderRating
                        }
                        helperText={
                          touched.LastOrderRating && errors.LastOrderRating
                        }
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                            readOnly: true,
                          },
                        }}
                      />
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
                            LeadSaveFn(values, resetForm, "harddelete");
                          } else {
                            return;
                          }
                        });
                      }}
                      disabled={funMode === "A"}
                      // disabled={funMode === "A" || (data.TaskSource === "Sprint" && data.Status === "AP")}
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
      </React.Fragment>
    </>
  );
};

export default EditItem;
