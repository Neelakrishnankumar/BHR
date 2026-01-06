import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Breadcrumbs,
  Tooltip,
  Chip,
} from "@mui/material";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import EmailIcon from "@mui/icons-material/Email";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BalanceIcon from "@mui/icons-material/Balance";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility"
import Swal from "sweetalert2";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { tokens, ColorModeContext } from "../../Theme";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  fetchListview,
  productionColorlookupOpen,
  productionlookupOpen,
} from "../../store/reducers/Listviewapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useContext } from "react";
import MatxCustomizer from "./Mailpdf";
import Listviewpopup from "./Lookup";
import Popup from "./popup";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import axios from "axios";
import toast from "react-hot-toast";
import store from "../..";
import {
  Delete,
  Psychology,
  Category,
  Visibility,
  Download,
} from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
} from "../../ui-components/global/utils";
import QuizIcon from "@mui/icons-material/Quiz";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AssistantIcon from '@mui/icons-material/Assistant';
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GridViewIcon from '@mui/icons-material/GridView';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ListviewSecondary = () => {
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  var CompId = sessionStorage.getItem("compID");
  const state = location.state || {};
  const storedStatus = sessionStorage.getItem("Status") || state.LEStatus
  // const storedStatus = "Close";
  console.log(state.LEStatus, sessionStorage.getItem("Status"), "storedStatus");

  let BreadCrumb1 = state.BreadCrumb1 || "";
  let BreadCrumb2 = state.BreadCrumb2 || "";
  let BreadCrumb3 = state.BreadCrumb3 || "";
  let BreadCrumb4 = state.BreadCrumb4 || "";
  let Answertype = state.AnswerType || "";

  const isproductionPopupOpen = useSelector(
    (state) => state.listviewApi.isLookupOpen
  );

  const isproductionColorPopupOpen = useSelector(
    (state) => state.listviewApi.isLookupColorOpen
  );
  // console.log("🚀 file: Secondarylistview.jsx:122 ~ ListviewSecondary ~ isproductionPopupOpen:", isproductionPopupOpen)
  const YearFlag = sessionStorage.getItem("YearFlag");
  const year = sessionStorage.getItem("year");
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );

  var accessID = params.secondaryAccessID
    ? params.secondaryAccessID
    : params.accessID;
  var accessID1 = params.accessID1 ? params.accessID1 : "Error"
  var accessID2 = params.accessID2 ? params.accessID2 : "Error"
  var accessID3 = params.accessID3 ? params.accessID3 : "Error"
  console.log("🚀 ~ ListviewSecondary ~ accessID1:", accessID1)
  console.log("🚀 ~ ListviewSecondary ~ accessID2:", accessID2)
  console.log("🚀 ~ ListviewSecondary ~ accessID3:", accessID3)
  const [pageSize, setPageSize] = React.useState(20);
  const [collapse, setcollapse] = React.useState(false);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  var parentID = params.filtertype;
  var InvType = params.InvType;
  var OrderType = params.OrderType;
  var Code = params.Code;
  var parentRecID = params.parentRecID;
  var CusID = params.CusID;
  var id = params.id;
  var leaderID = params.leaderID;
  var filtertype1 = params.filtertype1;
  //var partyID = params.partyID;
  const compID = sessionStorage.getItem("compID");
  var screenName = params.screenName;
  var Type = params.Type;
  console.log(Type, "type");
  // var type = `${Type}`;
  var remarkDec = params.remarkDec;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  //const rowData = location.state || {};

  // skillglow
  const [errorMsgData, setErrorMsgData] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  let parentID1 = params.parentID1;
  let parentID2 = params.parentID2;
  let parentID3 = params.parentID3;
  let parentID4 = params.parentID4;

  var Description = params.Desc;
  var Number = params.Number;
  var filter;
  var invoiceFilter = `${parentID}' AND Invtype='${Number}'AND Finyear='${year}' AND CompID = '${compID}`;
  if (accessID == "TR087") {
    if (parentID == "A") {
      screenName = "Assorted";
    }
  }
  if (accessID == "TR011") {
    filter = invoiceFilter;
  } else if (accessID == "TR074") {
    filter = `'${parentID}' AND Finyear='${year}' AND CompID = '${compID}'`;
  } else if (accessID == "TR127") {
    filter = `parentID='${leaderID}'`;
  } else if (accessID == "TR112" || accessID == "TR112") {
    filter = `'${parentID}' AND Finyear='${year}'`;
  } else if (accessID == "TR047") {
    filter = `${parentID}' AND Finyear='${year}`;
  } else if (accessID == "TR115") {
    filter = `RemarkCode='${parentID}' AND Finyear='${year}'`;
  } else if (accessID == "TR052") {
    filter = `${parentID}' AND Finyear='${year}' AND RemarkRecordID='${parentRecID}' AND CompID = '${compID}`;
  } else if (accessID == "TR151") {
    filter = "";
  } else if (accessID == "TR233") {
    filter = `CompanyID='${CompId}' AND ProjectID='${parentID}'`;
  } else if (accessID == "TR236") {
    filter = `CompanyID='${CompId}' AND MilestoneID='${parentID}'`;
  } else if (accessID == "TR234") {
    filter = `CompanyID='${CompId}' AND OperationStageID='${parentID}'`;
  } else if (accessID == "TR235") {
    filter = `CompanyID='${CompId}' AND ActivitesID='${parentID}'`;
  } else if (accessID == "TR063") {
    filter = `Finyear='${year}'`;
  } else if (accessID == "TR004") {
    filter = `parentID='${parentID}' AND STKType='${Number}'AND (Finyear='${year}' OR Finyear IS NULL)`;
  } else if (accessID == "TR084") {
    filter = `${parentID}`;
  } else if (accessID == "TR079") {
    filter = `${parentID}' AND  Type='${Number}`;
  } else if (accessID == "TR097") {
    filter = `${parentID.slice(-1) == "I"
      ? "(DcType IN ('I','B'))"
      : parentID === "PO"
        ? "(DcType IN ('O','P'))"
        : "(DcType IN ('O','B'))"
      }`;
  } else if (accessID == "TR102") {
    filter = `InvType='${parentID}'`;
  } else if (accessID == "TR123") {
    filter = `EmployeeID='${params.filtertype}'`;
  } else if (accessID == "TR124") {
    filter = `EmployeeID='${params.filtertype}'`;
  } else if (
    accessID == "TR104" ||
    accessID == "TR113" ||
    accessID == "TR111"
  ) {
    filter = "";
  } else if (accessID == "TR105") {
    filter = `CustomerID ='${CusID}' AND InvType='${InvType}'`;
  } else if (accessID == "TR118") {
    filter = "";
  } else if (accessID == "TR051") {
    filter = `parentID='${parentID}' AND ${params.remarkDec === "L" ? "(Type IN ('L'))" : "(Type NOT IN ('L'))"
      }`;
  } else if (accessID == "TR091") {
    filter = `parentID=${params.bomID}`;
  } else if (accessID == "TR087") {
    filter = `${parentID}' AND CompID = '${compID}`;
  }
  else if (accessID == "TR314") {
    filter = `PartyID=${leaderID}`;
  }
  // else if (accessID == "TR280" || accessID == "TR295"|| accessID == "TR296"|| accessID == "TR297"|| accessID == "TR298") {
  //   filter = `SkillcategoriesID='${parentID1}' AND CompanyID = '${compID}'`;
  // }
  else if (
    accessID == "TR280" ||
    accessID == "TR300" ||
    accessID == "TR296" ||
    accessID == "TR297" ||
    accessID == "TR298"
  ) {
    filter = `SkillcategoriesID='${parentID1}' AND CompanyID = '${compID}'`;
  } else if (accessID == "TR295") {
    filter = `SkillcategoriesID='${parentID1}' AND CompanyID = '${compID}'`;
  } else if (accessID == "TR279" || accessID == "TR281") {
    filter = `AssessmentID ='${parentID1}'`;
  } else if (accessID == "TR282") {
    filter = `QuestionGroupID ='${parentID1}' AND CompanyID = '${compID}'`;
  } else if (accessID == "TR288") {
    filter = `EmployeeID ='${parentID1}'AND CompanyID = '${compID}'`;
  } else if (accessID == "TR294") {
    filter = `AssessmentType ='${parentID1}'`;
  }
  // else if (accessID == "TR305") {
  //   filter = `CompanyID = '${compID}'`;
  // }
  else if (accessID === "TR304") {

    filter = Type == "T" ? `LeaderID='${leaderID}'` : `PartyID='${leaderID}'`;
    // filter =`PartyID='${leaderID}'`;
  }
  else if (accessID === "TR310") {
    const orderTypeFilter = `OrderType='${OrderType}'`; // "O" or "Q"


    //filter = `LeaderID='${leaderID}'`;
    filter = Type === "Party" ? `PartyRecordID='${leaderID}' AND ${orderTypeFilter}` : `LeaderID='${leaderID}' AND ${orderTypeFilter}`;

    //filter = `LeaderID='${leaderID}' AND PartyRecordID='${partyID}'`;
    // filter =`PartyID='${leaderID}'`;
  }
  else if (accessID === "TR311") {

    filter = `OrderHeaderID='${filtertype1}'`;
    // filter =`PartyID='${leaderID}'`;
  }
  else if (accessID == "TR283") {
    filter = `EmployeeID ='${parentID3}' AND AssessmentType = '${parentID2}'`;
  } else if (accessID == "TR291") {
    filter = `EmployeeID ='${parentID3}' AND AssessmentType = '${parentID2}'`;
  }
  else if (accessID == "TR301") {
    filter = `AssessmentID ='${parentID2}'`;
  }
  else if (accessID == "TR317") {
    filter = `CompanyID = '${compID}' AND HSNCategoryID='${parentID1}'`;
  }
  else if (accessID == "TR318") {
    filter = `CompanyID = '${compID}' AND ItemGroupID='${parentID1}'`;
  }
  else if (accessID == "TR319") {
    filter = `CompanyID = '${compID}' AND ItemCategoryID='${parentID1}'`;
  }
  // else if (accessID == "TR283") {
  //   filter = `AssessmentID ='${parentID1}' AND EmployeeID ='${parentID2}'`;
  // }
  else {
    filter = parentID;
  }
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  const mailData = useSelector((state) => state.listviewApi.mailData);
  const loading = useSelector((state) => state.listviewApi.loading);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  //here change
  const alternateMaterialRecordID = useSelector(
    (state) => state.listviewApi.materialRecID
  );

  const productionCardRecid = useSelector(
    (state) => state.listviewApi.productionCardRecid
  );

  const alternateColorsRecordID = useSelector(
    (state) => state.listviewApi.colorsRecID
  );
  const childToParent = async (childdata, type) => {
    console.log("🚀 ~ childToParent ~ childdata:", {
      FromMatrialID: childdata.parentID,
      ToMatrialID: childdata.RecordID,
      PrCardHeaderID: productionCardRecid,
    });
    var url = store.getState().globalurl.alterNateMaterial;

    const response = await axios.post(
      url,
      {
        FromMatrialID: childdata.RecordID,
        ToMatrialID: childdata.parentID,
        PrCardHeaderID: productionCardRecid,
      },
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      }
    );

    if (response.data.status == 200) {
      toast.success(response.data.message);
      dispatch(productionlookupOpen({ materialRecID: 0, productionCardID: 0 }));
      dispatch(fetchListview(accessID, screenName, filter, "", compID));
    } else {
      toast.error(response.data.message);
      dispatch(productionlookupOpen({ materialRecID: 0, productionCardID: 0 }));
      dispatch(fetchListview(accessID, screenName, filter, "", compID));
    }
  };

  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }

  // const columns = React.useMemo(
  //   () => listViewcolumn.filter(filterByID),
  //   [listViewcolumn]
  // );

  // const columns = React.useMemo(
  //   () =>
  //     listViewcolumn.filter(filterByID)
  //       ? [
  //           {
  //             field: "slno",
  //             headerName: "SL#",
  //             width: 50,
  //             sortable: false,
  //             filterable: false,
  //             valueGetter: (params) =>
  //               `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
  //           },
  //           ,
  //           ...listViewcolumn.filter(filterByID),
  //         ]
  //       : [],
  //   [listViewcolumn]
  // );
  const columns = React.useMemo(
    () =>
      listViewcolumn.filter(filterByID)
        ? [
          {
            field: "slno",
            headerName: "SL#",
            width: 50,
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
              page * pageSize +
              params.api.getRowIndexRelativeToVisibleRows(params.id) +
              1,
          },
          ...listViewcolumn.filter(filterByID),
        ]
        : [],
    [listViewcolumn, page, pageSize] // include page & pageSize as deps
  );
  var apprval = "";
  var hderName = `Production Card(${params.Number})`;

  var to;
  var apprval = "";
  var screen;
  var invoice;

  // UOM
  if (accessID == "TR008") {
    screen = "UOM TYPE";
    to = "/Apps/TR049/UOM%20Type";
    if (parentID == "W") {
      apprval = "Weight";
    }
    if (parentID == "L") {
      apprval = "Length";
    }
    if (parentID == "C") {
      apprval = "Currency";
    }
    if (parentID == "V") {
      apprval = "Volume";
    }
    if (parentID == "S") {
      apprval = "Service";
    }
    if (parentID == "A") {
      apprval = "Area";
    }
  }

  if (accessID == "TR073") {
    to = "/Apps/TR043/Invoices";
    screen = "Invoices";
    if (parentID == "L") {
      apprval = "Leather-Export";
    }
    if (parentID == "P") {
      apprval = "Product-Export";
    }
    if (parentID == "M") {
      apprval = "Material";
    }
  }
  if (accessID == "TR084") {
    to = "/Apps/TR043/Invoices";
    screen = "Invoices";
    if (parentID == "LL") {
      apprval = "Leather-Domestic";
    }
    if (parentID == "PL") {
      apprval = "Product-Domestic";
    }
  }
  if (accessID == "TR011") {
    screen = "Invoices";
    if (parentID == "L") {
      apprval = "Leather-Export";
    }
    if (parentID == "P") {
      apprval = "Product-Export";
      to = `/Apps/Secondarylistview/TR073/Proforma%20Invoice/${parentID}`;
    }
    if (parentID == "M") {
      apprval = "Material";
    }
  }
  if (accessID == "TR011") {
    if (Number == "SI") {
      invoice = "Sample Invoice";
    }
    if (Number == "PI") {
      invoice = "Proforma Invoice";
    }
    if (Number == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR102") {
    if (parentID == "SI") {
      invoice = "Sample Invoice";
    }
    if (parentID == "PI") {
      invoice = "Proforma Invoice";
    }
    if (parentID == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR105") {
    if (InvType == "SI") {
      invoice = "Sample Invoice";
    }
    if (InvType == "PI") {
      invoice = "Proforma Invoice";
    }
    if (InvType == "FI") {
      invoice = "Final Invoice";
    }
  }
  if (accessID == "TR151" || accessID == "TR052" || accessID == "TR097") {
    screen = "Delivery Challan";
    to = "/Apps/TR059/Delivery%20Type";
    if (parentID == "LI") {
      apprval = "Leather In";
    }
    if (parentID == "LO") {
      apprval = "Leather Out";
    }
    if (parentID == "MI") {
      apprval = "Material In";
    }
    if (parentID == "MO") {
      apprval = "Material Out";
    }
    if (parentID == "PO") {
      apprval = "Product Out";
    }
  }
  var materialsecondType = "";

  if (accessID == "TR004") {
    screen = "Material Type";
    to = "/Apps/TR044/Materials%20Type";
    if (Number == "L") {
      apprval = "Leather";
      materialsecondType = "Material Type";
    }
    if (Number == "M") {
      apprval = "Material";
      materialsecondType = "Material Type";
    }
    if (Number == "S") {
      apprval = "Service";
      materialsecondType = "Material Type";
    }
    if (Number == "R") {
      apprval = "RF Material";
      materialsecondType = "Material Type";
    }
    if (Number == "P") {
      apprval = "Packing Material";
      materialsecondType = "Material Type";
    }
    if (Number == "LS") {
      apprval = "Sales-Leather";
      materialsecondType = "Material Type";
    }
  }

  if (accessID == "TR054") {
    screen = "Remarks";
    to = "/Apps/TR058/Remarks%20Type";
    if (parentID == "I") {
      apprval = "Delivery Chalan In";
    }
    if (parentID == "O") {
      apprval = "Delivery Chalan Out";
    }
    if (parentID == "P") {
      apprval = "Production Remarks";
    }
    if (parentID == "R") {
      apprval = "Returnable";
    }
    if (parentID == "N") {
      apprval = "Non-Returnable";
    }
  }
  var materialType = "";
  if (accessID == "TR003") {
    to = "/Apps/TR044/Materials Type";
    if (parentID == "L") {
      apprval = "Leather Type";
      materialType = "Material Type";
    }
    if (parentID == "M") {
      apprval = "Material";
      materialType = "Material Type";
    }
    if (parentID == "S") {
      apprval = "Service";
      materialType = "Material Type";
    }
    if (parentID == "R") {
      apprval = "RF Material";
      materialType = "Material Type";
    }
    if (parentID == "P") {
      apprval = "Packing Material";
      materialType = "Material Type";
    }
    if (parentID == "LS") {
      apprval = "Sales - Leather";
      materialType = "Material Type";
    }
  }

  if (accessID == "TR074" || accessID == "TR079") {
    to = "/Apps/TR076/Batches";
    if (parentID == "CC") {
      apprval = "Cutting Component";
    }
    if (parentID == "PC") {
      apprval = "Production";
    }
    if (parentID == "PK") {
      apprval = "Packing";
    }
  }
  if (accessID == "TR063") {
    to = "/Apps/TR064/Opening Stock";
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "L") {
      apprval = "Leather";
    }
    if (parentID == "P") {
      apprval = "Product";
    }
  }
  var abbrevation = "";
  if (accessID == "TR079") {
    to = "/Apps/TR078/Stock Enquiry";
    if (parentID == "PC") {
      abbrevation = "Material ";
    }
    if (parentID == "CC") {
      abbrevation = "Leather";
    }
  }
  if (accessID == "TR080") {
    to = "/Apps/TR078/Stock Enquiry";
    if (Description == "PC") {
      abbrevation = "Material ";
    }
    if (Description == "CC") {
      abbrevation = "Leather";
    }
  }
  if (accessID == "TR032") {
    to = "/Apps/TR083/Colors";
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "L") {
      apprval = "Leather";
    }
  }
  if (accessID == "TR138") {
    // to = `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${parentID}`;
    if (parentID == "M") {
      apprval = "Machinerys";
    }
    if (parentID == "T") {
      apprval = "Tools AND Vessles";
    }
    if (parentID == "MC") {
      apprval = "Miscellaneous";
    }
    if (parentID == "F") {
      apprval = "Fornutures";
    }
  }
  if (accessID == "TR086") {
    // to = `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${parentID}`;
    if (parentID == "P") {
      apprval = "Product";
    }
    if (parentID == "E") {
      apprval = "Employee";
    }
    if (parentID == "M") {
      apprval = "Material";
    }
    if (parentID == "F") {
      apprval = "Fixed Asset";
    }
  }
  if (accessID == "TR115") {
    to = "/Apps/TR078/Stock%20Enquiry";
    if (parentID == "R0001") {
      apprval = "(Purchase)";
    }
    if (parentID == "R0002") {
      apprval = "(Loan)";
    }
    if (parentID == "NR003") {
      apprval = "(Scrap)";
    }
    if (parentID == "R0003") {
      apprval = "(Job Work)";
    }
    if (parentID == "R0004") {
      apprval = "(Repair)";
    }
    if (parentID == "NR001") {
      apprval = "(Despatches)";
    }
    if (parentID == "NR002") {
      apprval = "(Compliments Or Samples)";
    }
  }
  if (accessID == "TR087") {
    to = "/Apps/TR078/Stock%20Enquiry";
    if (parentID == "N") {
      apprval = "Normal";
    }
    if (parentID == "A") {
      apprval = "Assorted";
    }
  }

  var openstackname = "Opening Stock";
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
          navigate("/Apps/TR027/Employees");
        }
      } else {
        return;
      }
    });
  };
  function CustomToolbar(listViewData) {
    function doesArrayContainNegative() {
      for (var arr of listViewData) {
        if (arr.Shortage < 0) return true;
      }
      return false;
    }
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {accessID == "TR008" || accessID == "TR054" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR052" || accessID == "TR151" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR059/Delivery%20Type");
                }}
              >
                Delivery Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                {apprval}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
                  );
                }}
              >
                Remarks({remarkDec})
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}}  onClick={() => {navigate(to)}}>{screen}</Typography> */}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR281" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
            {/* <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR278/List%20Of%20Categories");
                }}
              >
                List of Category ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Question Groups
              </Typography>
            </Breadcrumbs> */}
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}/${accessID1}/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb3})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Question Groups
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR282" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
            {/* <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR278/List%20Of%20Categories");
                }}
              >
                List of Category ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR281/List%20Of%20Question%20Groups/${params.parentID3}/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Question Groups ({BreadCrumb3})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Question
              </Typography>
            </Breadcrumbs> */}
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}/${accessID2}/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb3})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => navigate(-1)}
              >
                List of Question Groups ({BreadCrumb4})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Question
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR280" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR278/List%20Of%20Categories");
                }}
              >
                List of Category ({BreadCrumb1})
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Assessment
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR300" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Assessment
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR305" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}/${accessID1}/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Appraisal
                {/* ({BreadCrumb3}) */}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              //onClick={() => navigate(-1)}
              >
                List Of Designation
              </Typography>

            </Breadcrumbs>
          </Box>
        ) : accessID == "TR295" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Appraisal
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR296" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Assessment
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR297" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Assessment
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR298" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/TR097/Remarks/${params.filtertype}`
              //   );
              // }}
              >
                List of Assessment
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR279" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
            {/* <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR278/List%20Of%20Categories");
                }}
              >
                List of Category ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Session
              </Typography>
            </Breadcrumbs> */}
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of Assessment Type ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}/${accessID1}/${params.parentID2}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment ({BreadCrumb3})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              //onClick={() => navigate(-1)}
              >
                List Of Session
              </Typography>

            </Breadcrumbs>
          </Box>
        ) : accessID == "TR288" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR286/List%20of%20Employees");
                }}
              >
                List of Employees ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Assessment Category
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR283" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR286/List%20of%20Employees");
                }}
              >
                List of Employees ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID2}`,
              //     { state: { ...state } }
              //   );
              // }}
              >
                List of Schedule
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR291" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR286/List%20of%20Employees");
                }}
              >
                List of Employees ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.parentID3}`,
                    { state: { ...state } }
                  );
                }}
              >
                List of Assessment Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate(
              //     `/Apps/Secondarylistview/skillglow/TR280/List%20Of%20Assessment/${params.parentID2}`,
              //     { state: { ...state } }
              //   );
              // }}
              >
                List of Schedule
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR294" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                }}
              >
                List of AssessmentType ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Assessment Category
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR073" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR317" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR316/HSN%20Category");
                }}
              >
                List of HSN Category ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of HSN Master
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR318" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR315/Item%20Group");
                }}
              >
                List of Item Group ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Item Category
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR319" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate("/Apps/TR315/Item%20Group");
                }}
              >
                List of Item Group ({BreadCrumb1})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/SecondarylistView/Item%20Group/${params.accessID1}/${params.screenName}/${params.parentID3}/${params.parentID2}`, {
                    state: {
                      ...state,
                    }
                  });
                }}
              >
                List of Item Category ({BreadCrumb2})
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of Items
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR084" ? (
          <Box display="flex" borderRadius="3px" alignItems="center">
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
                  navigate(to);
                }}
              >
                {screen}
              </Typography>

              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR011" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR043/Invoices");
                }}
              >
                {screen}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {apprval}
              </Typography>

              {Number !== "IN" && params.filtertype != "L" ? (
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {invoice}
                </Typography>
              ) : (
                false
              )}
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR137" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR135/Fixed%20Asset%20Type");
                }}
              >
                Fixed Asset Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Fixed Asset Category
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR141" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR140/Customer-Product");
                }}
              >
                {`Customer-Product(${params.Number})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                List of BOM
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR091" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR140/Customer-Product");
                }}
              >
                {`Customer-Product(${params.productDescription})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                {`BOM(${params.bomVersion})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                List of costing
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR138" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR135/Fixed%20Asset%20Type");
                }}
              >
                Fixed Asset Type
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR137/Fixed%20Assets%20Category/${params.Number}`
                  );
                }}
              >
                Fixed Asset Category
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Fixed Asset
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR086" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  navigate("/Apps/TR136/Finance%20Category");
                }}
              >
                Finance Category
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(to);
                }}
              >
                Finance Entry
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR303" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  // navigate("/Apps/TR243/Party");
                  navigate("/Apps/TR321/Party");
                }}
              >
                {/* Party */}
                {`Party(${state.PartyName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Leads
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : accessID == "TR304" ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  // navigate("/Apps/TR243/Party");
                  navigate("/Apps/TR321/Party");
                }}
              >

                {/* {Type === "F"
                  ? "Party" 
                  : `Party(${state.PartyName})`} */}
                {`Party(${state.PartyName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  console.log(state.PartyID, "PartyID");
                  navigate(`/Apps/Secondarylistview/TR303/LeaderCardView/${state.PartyID}`, { state: { ...state } });
                }}
              >
                {/* Leader */}
                {`Lead(${state.LeadTitle})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Marketing Activities
              </Typography>
            </Breadcrumbs>
          </Box>
        )
          : accessID == "TR310" && Type === "Leader" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR321/Party");
                  }}
                >

                  {/* {Type === "F"
                  ? "Party" 
                  : `Party(${state.PartyName})`} */}
                  {`Party(${state.PartyName})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    console.log(state.PartyID, "PartyID");
                    navigate(`/Apps/Secondarylistview/TR303/LeaderCardView/${state.PartyID}`, { state: { ...state } });
                  }}
                >
                  {/* Leader */}
                  {`Lead(${state.LeadTitle})`}
                </Typography>

                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR310" && Type === "Party" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR321/Party");
                  }}
                >

                  {/* {Type === "F"
                  ? "Party" 
                  : `Party(${state.PartyName})`} */}
                  {`Party(${state.PartyName})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR311" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR321/Party");
                  }}
                >

                  {/* {Type === "F"
                  ? "Party" 
                  : `Party(${state.PartyName})`} */}
                  {`Party(${state.PartyName})`}
                </Typography>
                {params.Type === "Leader" ?
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      console.log(state.PartyID, "PartyID");
                      navigate(`/Apps/Secondarylistview/TR303/LeaderCardView/${state.PartyID}`, { state: { ...state } });
                    }}
                  >
                    {`Lead(${state.LeadTitle})`}
                  </Typography> : null}
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  //onClick={() => navigate(-1)}
                  onClick={() => {
                    navigate(`/Apps/Secondarylistview/TR310/Order/${params.filtertype}/${params.Type}/${params.OrderType}`, { state: { ...state } });
                  }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"} ({state.Code || ""})
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {params.OrderType === "O" ? "Order" : "Quotation"}{" "}Item
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR314" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR321/Party");
                  }}
                >
                  {`Party(${state.PartyName})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Advance Payment
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR102" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate("/Apps/TR101/Order%20Enquiry");
                  }}
                >
                  Order Enquiry
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {invoice}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR103" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate("/Apps/TR101/Order%20Enquiry");
                  }}
                >
                  Order Enquiry
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Customer Group
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR104" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate("/Apps/TR101/Order%20Enquiry");
                  }}
                >
                  Order Enquiry
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/Secondarylistview/TR103/Customergroup/5");
                  }}
                >
                  {parentID}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Invoice Type
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR108" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate("/Apps/TR047/Production%20Card");
                  }}
                >
                  {hderName}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Production Card Item
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {screenName}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR105" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate("/Apps/TR101/Order%20Enquiry");
                  }}
                >
                  Order Tracking
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/Secondarylistview/TR103/Customergroup/5");
                  }}
                >
                  Customer Group
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR104/Invoicegroup/007/${CusID}`
                    );
                  }}
                >
                  Invoice Type
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {invoice}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR004" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(to);
                  }}
                >
                  {materialsecondType}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR003/Material%20Category/${Number}`
                    );
                  }}
                >
                  {apprval}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(
                      `/Apps/Secondarylistview/TR003/Material%20Category/${Number}`
                    );
                  }}
                >
                  {Description}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >{`List of ${apprval}`}</Typography>
                {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{invoice}</Typography>   */}
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR074" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(to);
                  }}
                >
                  Batches
                </Typography>

                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(to);
                  }}
                >
                  {apprval}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR063" ? (
            // <Box sx={{ display: "flex", flexDirection: "row" }}>
            //   <Typography variant="h3" color="#0000D1" sx={{cursor:'pointer'}}  onClick={() => { navigate( `/Apps/TR064/Opening Stock` ); }}>{openstackname}</Typography>
            //   <Typography variant="h3" color="#0000D1" >{screenName}</Typography>

            // </Box>
            <Box display="flex" borderRadius="3px" alignItems="center">
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
                    navigate(`/Apps/TR064/Opening Stock`);
                  }}
                >
                  {openstackname}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(to);
                  }}
                >
                  {apprval}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {screenName}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR032" ? (
            <Box display="flex" borderRadius="3px" alignItems="center">
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
                    navigate(`/Apps/TR083/Colors - Material type`);
                  }}
                >
                  Colors(MT)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(to);
                  }}
                >
                  {apprval}
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR033" ? (
            <Box display="flex" borderRadius="3px" alignItems="center">
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
                    navigate(`/Apps/TR083/Colors - Material type`);
                  }}
                >
                  Colors(MT)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/Secondarylistview/TR032/Colors/L");
                  }}
                >{`Leather(${params.Number})`}</Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  Color shades
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR117" ? (
            <Box display="flex" borderRadius="3px" alignItems="center">
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
                    navigate(`/Apps/TR083/Colors - Material type`);
                  }}
                >
                  Colors(MT)
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate("/Apps/Secondarylistview/TR032/Colors/L");
                  }}
                >{`Leather(${params.Number})`}</Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >{`Color Shades(${params.Desc})`}</Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR003" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(to);
                  }}
                >
                  {materialType}
                </Typography>
                {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} onClick={() => { navigate(to); }}>{apprval}</Typography> */}
                {parentID == "L" || parentID == "LS" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {apprval}
                  </Typography>
                ) : (
                  ""
                )}
                {parentID == "M" || parentID == "S" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >{`${apprval} Categories`}</Typography>
                ) : (
                  ""
                )}
                {parentID == "R" || parentID == "P" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >{`${apprval} Categories`}</Typography>
                ) : (
                  ""
                )}
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR021" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(`/Apps/TR072/Process%20Stage`);
                  }}
                >
                  Process Stage
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => {
                    navigate(`/Apps/TR072/Process%20Stage`);
                  }}
                >
                  {Number}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  List Of Process
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR001" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(`/Apps/TR002/Categories`);
                  }}
                >
                  {`Categories (${Number})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  List of Products
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR148" ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                    navigate(`/Apps/TR147/Jobwork Category`);
                  }}
                >
                  {`Categories (${Number})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  List of Jobwork
                </Typography>
              </Breadcrumbs>
            </Box>
          ) : accessID == "TR048" ? (
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
                  navigate(`/Apps/TR047/Production%20Card`);
                }}
              >
                {" "}
                {hderName}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR056" ? (
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
                  navigate(`/Apps/TR047/Production%20Card`);
                }}
              >
                {" "}
                {hderName}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("");
                }}
              >
                Indent Items
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR051" ? (
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
                  navigate(`/Apps/TR047/Production%20Card`);
                }}
              >{`Production Card(${params.prdNumber})`}</Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR118/Indent Type/${parentID}/${params.prdNumber}`
                  );
                }}
              >
                {params.remarkDec === "L" ? "Leather" : "Material"}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Indent Items
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR118" ? (
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
                  navigate(`/Apps/TR047/Production%20Card`);
                }}
              >
                {" "}
                {`Production Card(${params.Number})`}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Indent Type
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR119" ? (
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
                  navigate(`/Apps/TR047/Production%20Card`);
                }}
              >
                {" "}
                {`Production Card(${params.Number})`}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {params.Desc === "L" ? "Leather" : "Material"}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Indent Items
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                List of supplier
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR050" ? (
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
                  navigate("/Apps/TR002/Categories");
                }}
              >
                {`Categories (${Number})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR001/Product%20Master/${params.bomproductid}/${Number}`
                  );
                }}
              >
                {Description}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR079" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {abbrevation} Category
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR080" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR079/Material%20Category/${Description}`
                  );
                }}
              >
                {abbrevation} Category{" "}
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography> */}
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {Number}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR111" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                List Of Supplier
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography> */}
            </Breadcrumbs>
          ) : accessID == "TR112" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    "/Apps/Secondarylistview/TR111/List%20of%20Supplier/S/Supplier"
                  );
                }}
              >
                List Of Supplier
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >List Of Material</Typography> */}
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {Number}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR113" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                List Of Production Card
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR115" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                List Of Material{apprval}
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR114" ? (
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
                  navigate("/Apps/TR078/Stock%20Enquiry");
                }}
              >
                Stock Enquiry
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    "/Apps/Secondarylistview/TR113/List%20of%20ProductionCard/PD"
                  );
                }}
              >
                List Of Production Card
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Product Card Items
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{Number}</Typography> */}
            </Breadcrumbs>
          ) : accessID == "TR128" ? (
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              {/* <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("/Apps/TR014/Company");
              }}
            >
              Company
            </Typography> */}
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Location
              </Typography>

              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR127" ? (
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              {/* <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("/Apps/TR014/Company");
              }}
            >
              Company
            </Typography> */}
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(`/Apps/TR128/Location`);
                }}
              >
                {/* Location */}
                {`Location(${state.Locationname})`}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Gate Entry
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR129" ? (
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
                  navigate("/Apps/TR014/Company");
                }}
              >
                Company
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR128/Location/${params.Number}`
                  );
                }}
              >
                Location
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                Bin
              </Typography>
              {/* <Typography variant="h5" color="#0000D1" sx={{cursor:'default'}} >{screenName}</Typography>
             */}
            </Breadcrumbs>
          ) : accessID == "TR097" ? (
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
                  navigate("/Apps/TR059/Delivery%20Type");
                }}
              >
                Delivery Type
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {apprval}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR233" ? (
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
                  //navigate("/Apps/TR133/Project");
                  navigate(-1);
                }}
              >
                {`Project(${state.projectName})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR236" ? (
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
                {`Project(${state.projectName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  //navigate(`/Apps/Secondarylistview/TR233/Milestones/${state.projectID}`,{state:{...state}});
                  navigate(-1);
                }}
              >
                {`Milestones(${state.MilestoneName})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR234" ? (
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
                {`Project(${state.projectName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR233/Milestones/${state.projectID}`,
                    { state: { ...state } }
                  );
                }}
              >
                {`Milestones(${state.MilestoneName})`}
                {/* Milestone */}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  //navigate(`/Apps/Secondarylistview/TR236/Stages/${state.MilestoneID}`,{state:{...state}});
                  navigate(-1);
                }}
              >
                {`Stages(${state.stagesName})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR235" ? (
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
                {`Project(${state.projectName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR233/Milestones/${state.projectID}`,
                    { state: { ...state } }
                  );
                }}
              >
                {`Milestones(${state.MilestoneName})`}
                {/* Milestone             */}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR236/Stages/${state.MilestoneID}`,
                    { state: { ...state } }
                  );
                }}
              >
                {`stages(${state.stagesName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  //navigate(`/Apps/Secondarylistview/TR234/Activities/${state.OperationStageID}`,{state:{...state}});
                  navigate(-1);
                }}
              >
                {`Activities(${state.Activityname})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR124" ? (
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
                  navigate("/Apps/TR027/Employees", { state: state });
                }}
              >
                {`Employee(${state.EmpName})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR123" ? (
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
                  navigate("/Apps/TR027/Employees", { state: state });
                }}
              >
                {/* Employee */}
                {`Employee(${state.EmpName})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR132" ? (
            <Breadcrumbs
              maxItems={2}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              {/* <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("/Apps/TR027/Employees");
              }}
            >
               {`Employee(${state.EmpName})`}
            </Typography> */}
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  //navigate("/Apps/TR123/Check%20In");
                  navigate(-1);
                }}
              >
                {`Check In(${state.Locname})`}
              </Typography>

              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR134" ? (
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
                  navigate("/Apps/TR027/Employees");
                }}
              >
                {`Employee(${state.EmpName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR123/Check%20In/${state.checkinID}`,
                    { state: { ...state } }
                  );
                }}
              >
                {`Check In(${state.Locname})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  // navigate(
                  //   `/Apps/Secondarylistview/TR132/DailyTask/${params.Number}`
                  // );
                  navigate(-1);
                }}
              >
                {/* {`DailyTask(${state.proName})`} */}
                {`DailyTask(${state.Date})`}
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                {screenName}
              </Typography>
            </Breadcrumbs>
          ) : accessID == "TR095" ? (
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
                  navigate("/Apps/TR099/Companies");
                }}
              >
                Companies
              </Typography>
              <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
                User Groups
              </Typography>
            </Breadcrumbs>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h3" color="#0000D1">
                {screenName}
              </Typography>
            </Box>
          )}
        <Box justifyContent="end" display="flex">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <GridToolbarQuickFilter />
          {accessID == "TR048" ? (
            false
          ) : accessID == "TR051" ? (
            false
          ) : accessID == "TR073" ? (
            false
          ) : accessID == "TR063" ? (
            false
          ) : accessID == "TR054" ? (
            false
          ) : accessID == "TR079" ? (
            false
          ) : accessID == "TR080" ? (
            false
          ) : accessID == "TR097" ? (
            false
          ) : accessID == "TR102" ? (
            false
          ) : accessID == "TR103" ? (
            false
          ) : accessID == "TR305" ? (
            false
          ) : accessID == "TR104" ? (
            false
          ) : accessID == "TR105" ? (
            false
          ) : accessID == "TR111" ? (
            false
          ) : accessID == "TR112" ? (
            false
          ) : accessID == "TR113" ? (
            false
          ) : accessID == "TR114" ? (
            false
          ) : accessID == "TR115" ? (
            false
          ) : accessID == "TR288" ? (
            false
            //        ) : (accessID == "TR304" && storedStatus == "Close" )? (
            // false  
          ) : accessID == "TR003" ? (
            <Box>
              <Tooltip arrow title="Stock Order">
                <IconButton
                  onClick={() => {
                    navigate("./stock-care-by");
                  }}
                >
                  <AssessmentIcon sx={{ marginTop: "10px" }} color="primary" />
                </IconButton>
              </Tooltip>

              <Tooltip arrow title="Add">
                <IconButton>
                  <AddOutlinedIcon
                    onClick={() => {
                      navigate(
                        `./Edit${screenName === "Remarks"
                          ? "Delivery Chalan"
                          : screenName
                        }/-1/A`,
                        {
                          state: { ...state },
                        }
                      );
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>

          ) : accessID === "TR304" ? (
            // state.LEStatus === "Close" ? (
            storedStatus === "Close" ? (
              false
            ) : (
              <Tooltip arrow title="Add">
                <IconButton>
                  <AddOutlinedIcon
                    onClick={() => {
                      navigate(`./EditMarketing Activity/-1/A`, {
                        state: { ...state },
                      });
                    }}
                  />
                </IconButton>
              </Tooltip>
            )

          ) : YearFlag == "true" ? (
            // <Tooltip arrow title="Add">
            //   <IconButton>
            //     <AddOutlinedIcon
            //       onClick={() => {
            //         navigate(
            //           `./Edit${
            //             screenName === "Remarks"
            //               ? "Delivery Chalan"
            //               : screenName
            //           }/-1/A`,
            //           {
            //             state: { ...state },
            //           }
            //         );
            //       }}
            //     />
            //   </IconButton>
            // </Tooltip>
            accessID === "TR295" ? (
              <>
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfAppraisal/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
                <Tooltip arrow title="Schedule">

                  <IconButton>
                    <SendTimeExtensionOutlinedIcon
                      onClick={() => {
                        navigate(`./TR305/AppraisalSchedule`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              </>
            )
              // : accessID === "TR304" && storedStatus != "Close" ? (
              //   <Tooltip arrow title="Add">
              //     <IconButton>
              //       <AddOutlinedIcon
              //         onClick={() => {
              //           navigate(`./EditMarketing Activity/-1/A`, {
              //             // state: { ...state },
              //           });
              //         }}
              //       />
              //     </IconButton>
              //   </Tooltip>
              // )

              : accessID === "TR297" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfSurvey/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR296" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfCompliance/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR298" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfFeedBack/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR281" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfQuestionGroups/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR282" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfQuestion/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR279" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditListOfSession/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : accessID === "TR311" ? (
                <Tooltip arrow title="Add">

                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(`./EditOrderitem/-1/A`, {
                          state: { ...state },
                        });
                      }}
                    />
                  </IconButton>

                </Tooltip>
              ) : (
                <Tooltip arrow title="Add">
                  <IconButton>
                    <AddOutlinedIcon
                      onClick={() => {
                        navigate(
                          `./Edit${screenName === "Remarks"
                            ? "Delivery Chalan"
                            : screenName
                          }/-1/A`,
                          {
                            state: { ...state },
                          }
                        );
                      }}
                    />
                  </IconButton>
                </Tooltip>)
          ) : (
            false
          )}
          {accessID == "TR048" && !doesArrayContainNegative() ? (
            <Tooltip arrow title="Production Card Issue">
              <PendingActionsIcon
                sx={{ marginTop: "10px" }}
                color="primary"
                onClick={() => {
                  navigate("./TR300/Editproduction");
                }}
              />
            </Tooltip>
          ) : (
            false
          )}
          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
            slotProps={{ toolbar: { csvOptions: { allColumns: true } } }}
          />

          <Tooltip arrow title="Logout">
            <IconButton onClick={() => fnLogOut("Logout")} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    dispatch(fetchListview(accessID, screenName, filter, "", compID));
  }, [location.key]);

  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("secondaryCurrentPage", pageno);
  };
  // ✅ Safely check if any record has Editable === "1"
  const hasEditable =
    Array.isArray(listViewData) &&
    listViewData.some((row) => String(row.Editable) === "1");

  // 🔍 Debug (optional)
  console.log("accessID:", accessID);
  console.log("Editable rows found:", hasEditable);

  return (
    <React.Fragment>
      <Box m="5px">
        <Box
          m="5px 0 0 0"
          padding={2}
          // height="85vh"
          height={dataGridHeight}
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
              //backgroundColor: "#8BD2CE",
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
            key={accessID}
            rows={listViewData}
            columns={columns}
            page={page}
            disableSelectionOnClick
            rowHeight={dataGridRowHeight}
            headerHeight={dataGridHeaderFooterHeight}
            getRowId={(row) => row.RecordID}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={(pageno) => handlePagechange(pageno)}
            components={{
              Toolbar: () => CustomToolbar(listViewData),
            }}
            loading={loading}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            // getRowClassName={(params) =>
            //   params.row.Rate > params.row.FixedRate ||
            //   params.row.RemarkRecordID == "24"||
            //   params.row.Colourflag == "Y"
            //     ? "gridcolor"
            //     : ""
            // }
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "odd-row"
                : "even-row"
            }
          />
        </Box>
        <Box display="flex" alignItems="center" marginLeft={3}  >
          <Typography fontWeight={400} fontSize={15} lineHeight={1}
            mb={-2} >
            Legend
          </Typography>
          </Box>
        {accessID == "TR001" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of BOM"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<ListAltOutlinedIcon color="error" />}
              label="Stock"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        )
          : accessID == "TR304" ? (
            <Box display="flex" flexDirection="row" padding="25px">
              <Chip
                icon={<ModeEditOutlinedIcon color="primary" />}
                label="Edit"
                variant="outlined"
              />
              <Chip
                icon={< VisibilityIcon style={{ color: '#eb710dff' }} />}
                label="View"
                variant="outlined"
                sx={{ marginLeft: "50px" }}
              />
              <Chip
                icon={<AttachFileIcon color="primary" />}
                label="Attachment"
                variant="outlined"
                sx={{ marginLeft: "50px" }}
              />
            </Box>
          )
            : accessID == "TR310" ? (
              <Box display="flex" flexDirection="row" padding="25px">
                <Chip
                  icon={<ModeEditOutlinedIcon color="primary" />}
                  label="Edit"
                  variant="outlined"
                />
                {params.OrderType === "Q" &&
                  <Chip
                    icon={< CurrencyExchangeOutlinedIcon color="primary" />}
                    label="Convert to Order"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />}
                <Chip
                  icon={< GridViewIcon color="primary" />}
                  label="Order Item"
                  variant="outlined"
                  sx={{ marginLeft: "50px" }}
                />
                <Chip
                  icon={< PictureAsPdfIcon color="error" />}
                  label="Order Pdf"
                  variant="outlined"
                  sx={{ marginLeft: "50px" }}
                />

              </Box>
            )
              : (accessID == "TR294" && params.parentID1 === "AP") ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  {/* <Chip
                  icon={<Psychology color="primary" />}
                  label="Skill Assessment"
                  variant="outlined"
                /> */}
                  <Chip
                    icon={<CategoryOutlinedIcon color="primary" />}
                    label="Appraisal"
                    variant="outlined"
                  />
                  {/* <Chip
                  icon={<GppMaybeOutlinedIcon color="primary" />}
                  label="Compliance"
                  variant="outlined"
                />
                <Chip
                  icon={<QuestionAnswerOutlinedIcon color="primary" />}
                  label="Survey"
                  variant="outlined"
                />
                <Chip
                  icon={<FeedbackOutlinedIcon color="primary" />}
                  label="Feedback"
                  variant="outlined"
                /> */}
                </Box>
              ) : (accessID == "TR294" && params.parentID1 === "SK") ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Psychology color="primary" />}
                    label="Skill Assessment"
                    variant="outlined"
                  />
                </Box>
              ) : (accessID == "TR294" && params.parentID1 === "SV") ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<QuestionAnswerOutlinedIcon color="primary" />}
                    label="Survey"
                    variant="outlined"
                  />
                </Box>
              ) : (accessID == "TR294" && params.parentID1 === "FB") ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<FeedbackOutlinedIcon color="primary" />}
                    label="Feedback"
                    variant="outlined"
                  />
                </Box>
              ) : (accessID == "TR294" && params.parentID1 === "CL") ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<GppMaybeOutlinedIcon color="primary" />}
                    label="Compliance"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR280" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR300" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon color="primary" />}
                    label="Schedule"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HistoryToggleOffOutlinedIcon color="primary" />}
                    label="Schedule History"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR295" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon />}
                    label="Schedule"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR305" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon color="primary" />}
                    label="Appraisal Schedule"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HistoryToggleOffOutlinedIcon color="primary" />}
                    label="Schedule History"
                    variant="outlined"
                  />

                </Box>
              ) : accessID == "TR296" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon color="primary" />}
                    label="Schedule"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HistoryToggleOffOutlinedIcon color="primary" />}
                    label="Schedule History"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR297" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon color="primary" />}
                    label="Schedule"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HistoryToggleOffOutlinedIcon color="primary" />}
                    label="Schedule History"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR298" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Category color="primary" />}
                    label="Question Group"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTimeIcon color="primary" />}
                    label="Session"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SendTimeExtensionOutlinedIcon color="primary" />}
                    label="Schedule"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HistoryToggleOffOutlinedIcon color="primary" />}
                    label="Schedule History"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR288" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<Psychology color="primary" />}
                    label="Schedule"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR283" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  {/* <Chip
              icon={<Visibility color="primary" />}
              label="View"
              variant="outlined"
            /> */}
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  {/* <Chip
              icon={<Delete color="error" />}
              label="Delete"
              variant="outlined"
            /> */}
                </Box>
              ) : accessID == "TR303" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AssistantIcon color="primary" />}
                    label="Marketing Activity"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR318" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<InventoryOutlinedIcon color="primary" />}
                    label="Item"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR291" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  {/* <Chip
              icon={<Visibility color="primary" />}
              label="View"
              variant="outlined"
            /> */}
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  {/* <Chip
              icon={<Delete color="error" />}
              label="Delete"
              variant="outlined"
            /> */}
                </Box>
              ) : accessID == "TR281" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  {/* <Chip
              icon={<Delete color="error" />}
              label="Delete"
              variant="outlined"
            /> */}
                  <Chip
                    icon={<QuizIcon color="primary" />}
                    label="Question"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR282" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  {/* <Chip
              icon={<Delete color="error" />}
              label="Delete"
              variant="outlined"
            /> */}
                </Box>
              ) : accessID == "TR279" ? (
                <Box display="flex" flexDirection="row" gap={2} padding="25px">
                  <Chip
                    icon={<Download color="primary" />}
                    label="Download"
                    variant="outlined"
                  />
                  <Chip
                    icon={<OpenInNewIcon color="primary" />}
                    label="Open Link"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR032" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Color Shades"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR033" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Customer"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR050" ? (
                <Box
                  display="flex"
                  flexDirection="row"
                  padding="25px"
                  sx={{ overflowY: "auto" }}
                >
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SettingsBackupRestoreIcon color="primary" />}
                    label="Process"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="primary" />}
                    label="Cutting Component"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="success" />}
                    label="Production"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="error" />}
                    label="Packing"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="" />}
                    label="All BOM"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="" />}
                    label="Internal Order"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<EmailIcon color="primary" />}
                    label="Email"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR003" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Material"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<AddPhotoAlternateIcon color="primary" />}
                    label="Image Upload"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR004" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Stock"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<AddPhotoAlternateIcon color="primary" />}
                    label="Image Upload"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR097" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Delivery Challan"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR079" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Stock"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR111" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR113" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR048" ? (
                <Box display="flex" flexDirection="row" padding="25px" gap={3}>
                  <Chip
                    icon={<SummarizeOutlinedIcon color="primary" />}
                    label="Issue"
                    variant="outlined"
                  />
                  <Chip
                    icon={<OpenInBrowserOutlinedIcon color="primary" />}
                    label="Alternate Material"
                    variant="outlined"
                  />
                  <Chip
                    icon={<OpenInBrowserOutlinedIcon color="warning" />}
                    label="Alternate Color"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR118" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR051" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR119" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Indent Order"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR074" ? (
                <Box
                  display="flex"
                  flexDirection="row"
                  padding="25px"
                  sx={{ overflowY: "auto" }}
                >
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Issue"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="error" />}
                    label="Completion"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<TaskAltOutlinedIcon color="success" />}
                    label="Completed"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="primary" />}
                    label="Print"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<EmailIcon color="primary" />}
                    label="Email"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR087" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="primary" />}
                    label="Print"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<EmailIcon color="primary" />}
                    label="Email"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR073" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Invoice"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR103" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Stock"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR104" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Stock"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR011" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="primary" />}
                    label="Print"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<EmailIcon color="primary" />}
                    label="Email"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="Post Shipment"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR084" ? (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<PrintOutlinedIcon color="primary" />}
                    label="Print"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                  <Chip
                    icon={<EmailIcon color="primary" />}
                    label="Email"
                    variant="outlined"
                    sx={{ marginLeft: "50px" }}
                  />
                </Box>
              ) : accessID == "TR080" ? (
                false
              ) : accessID == "TR112" ? (
                false
              ) : accessID == "TR114" ? (
                false
              ) : accessID == "TR115" ? (
                false
              ) : accessID == "TR102" ? (
                false
              ) : accessID == "TR233" ? (
                <Box display="flex" flexDirection="row" padding="25px" gap="5px">
                  <Chip
                    icon={<BalanceIcon color="primary" />}
                    label="Stage Weightage"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Stages"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR236" ? (
                <Box display="flex" flexDirection="row" padding="25px" gap="5px">
                  <Chip
                    icon={<BalanceIcon color="primary" />}
                    label="Activity Weightage"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Activities"
                    variant="outlined"
                  />
                </Box>
              ) : accessID == "TR234" ? (
                <Box display="flex" flexDirection="row" padding="25px" gap="5px">
                  <Chip
                    icon={<BalanceIcon color="primary" />}
                    label="Task Weightage"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                  <Chip
                    icon={<ListAltOutlinedIcon color="primary" />}
                    label="List of Tasks"
                    variant="outlined"
                  />
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" padding="25px">
                  <Chip
                    icon={<ModeEditOutlinedIcon color="primary" />}
                    label="Edit"
                    variant="outlined"
                  />
                </Box>
              )}
      </Box>
      <MatxCustomizer
        open={open}
        screenName={invoice}
        rowData={mailData}
        type={Number}
      />
      <Popup
        title="Material"
        openPopup={isproductionPopupOpen}
        setOpenPopup={() =>
          dispatch(productionlookupOpen({ materialRecID: "" }))
        }
      >
        <Listviewpopup
          accessID="2085"
          screenName="Material"
          childToParent={childToParent}
          filterName={"parentID"}
          filterValue={alternateMaterialRecordID}
        />
      </Popup>

      <Popup
        title="Colors"
        openPopup={isproductionColorPopupOpen}
        setOpenPopup={() =>
          dispatch(productionColorlookupOpen({ materialRecID: "" }))
        }
      >
        <Listviewpopup
          accessID="2085"
          screenName="Colors"
          childToParent={childToParent}
          filterName={"parentID"}
          filterValue={alternateMaterialRecordID}
        />
      </Popup>
    </React.Fragment>
  );
};

export default ListviewSecondary;
