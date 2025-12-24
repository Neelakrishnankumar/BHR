import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  IconButton,
  Tooltip,
  Stack,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";
import BalanceIcon from "@mui/icons-material/Balance";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from "react-router-dom";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import {
  getOrderdetailReport,
  getProjectCosting,
  postData,
  StockProcessApi,
} from "./Formapireducer";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import Person2Icon from "@mui/icons-material/Person2";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import {
  AccessTimeOutlined,
  Category,
  Delete,
  Download,
  Psychology,
} from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import QuizIcon from "@mui/icons-material/Quiz";
import CategoryIcon from "@mui/icons-material/Category";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProjectPDF from "../../apps/pages/HR/ProjectPDF";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { pdf } from "@react-pdf/renderer";
import AssistantIcon from "@mui/icons-material/Assistant";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import SendTimeExtensionOutlinedIcon from "@mui/icons-material/SendTimeExtensionOutlined";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GridViewIcon from "@mui/icons-material/GridView";
import OrderHeaderPdf from "../../apps/pages/HR/OrderHeaderPdf";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
const initialState = {
  rowData: [],
  columnData: [],
  loading: false,
  error: "",
  mailOpen: false,
  mailData: {},
  mailGetData: {},
  materialRecID: "",
  colorsRecID: "",
  isLookupOpen: false,
  isLookupColorOpen: false,
  productionCardRecid: 0,
};

const Finyear = sessionStorage.getItem("year");
export const getMail = createAsyncThunk("mail/get", async (data) => {
  var url = store.getState().globalurl.mailContentGeturl;
  const response = await axios.post(url, data, {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
    },
  });
  console.log(
    "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
    response
  );
  return response.data;
});

export const sendMail = createAsyncThunk(
  "mail/send",
  async ({ accessID, action, idata }) => {
    const url = store.getState().globalurl.mailSendUrl;
    const data = {
      ToID: idata.ToID,
      Cc: idata.Cc,
      Subject: idata.Subject,
      Attachment: idata.Attachment,
      Message: idata.Message,
    };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    toast.success("Mail Send Successfully");
    return response.data;
  }
);

export const getApiSlice = createSlice({
  name: "listviewApi",
  initialState,
  reducers: {
    productionlookupOpen(state, action) {
      state.isLookupOpen = !state.isLookupOpen;
      //here change
      state.materialRecID = action.payload.materialRecID;
      state.productionCardRecid = action.payload.productionCardID;
    },
    productionColorlookupOpen(state, action) {
      state.isLookupColorOpen = !state.isLookupColorOpen;
      //here change
      state.materialRecID = action.payload.materialRecID;
    },
    mailOpen(state, action) {
      state.mailOpen = !state.mailOpen;
      state.mailData = action.payload;
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
        rowData: [],
        columnData: [],
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    Success(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        rowData: action.payload.rowdata,
        columnData: action.payload.columndata,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMail.fulfilled, (state, action) => {
        state.loading = false;

        state.mailGetData = action.payload;
      })
      .addCase(getMail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,
  mailOpen,
  Success,
  productionlookupOpen,
  productionColorlookupOpen,
} = getApiSlice.actions;

export default getApiSlice.reducer;

// const loader = async () => {

//     return redirect("/");

// };

const productionCardUPdate = (type, recID) => async (dispatch, getState) => {
  //  alert(type);
  const compID = sessionStorage.getItem("compID");
  var updateName = "";

  if (type === "S") {
    updateName = "Production Card Started ";

    // Swal.fire({
    //   title: `Do you want Start Production Card?`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Ok",
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     var url = store.getState().globalurl.pcdurl;
    //     var data = {
    //       accessid: "TR047",
    //       Type: type,
    //       RecordID: recID,
    //     };
    //     console.log("🚀 ~ file: Listviewapireducer.js:113 ~ data:", data);

    //     axios
    //       .post(url, data, {
    //         headers: {
    //           Authorization:
    //             "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
    //         },
    //       })

    //       .then((response) => {
    //         console.log(
    //           "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
    //           response.data
    //         );
    //         // console.log("response data" + response.data);
    //         if (response.data.Status == "Y") {
    //           toast.success(`${updateName}`);

    //           dispatch( fetchListview(
    //               "TR047",
    //               "Production Card",
    //               "",
    //               "",
    //               compID
    //             ))

    //           // window.location.href = '/Apps/TR056/Customer%20Order'
    //         } else {
    //           toast.error(`${"Error"}`);
    //         }
    //       })
    //       .catch((error) => {
    //         dispatch(errored);
    //         //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    //       });

    //     } else {
    //       return;
    //     }
    //   });
    //  return;
  }
  if (type === "P") {
    updateName = "Production Card Paused";
  }
  if (type === "C") {
    updateName = "Production Card Completed";
  }
  if (type === "R") {
    updateName = "Production Card Continued";
  }
  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };
  console.log("🚀 ~ file: Listviewapireducer.js:113 ~ data:", data);

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(`${updateName}`);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};

const fnProcess = (recID, accessid) => (dispatch, getState) => {
  var url = store.getState().globalurl.imageNameUpdateUrl;

  var data = {
    accessid: accessid,
    Recordid: recID,
    Action: "none",
    ImageName: "no",
  };
  console.log(
    "🚀 ~ file: Listviewapireducer.js:228 ~ fnProcess ~ data:",
    JSON.stringify(data)
  );

  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(`${"Error"}`);
      }
    });
};

const indentOrderSave =
  (type, recID, SupplierID, parentID) => (dispatch, getState) => {
    var url = store.getState().globalurl.indentUrl;
    const Finyear = sessionStorage.getItem("year");
    const CompanyID = sessionStorage.getItem("compID");
    const yearID = sessionStorage.getItem("YearRecorid");

    var data = {
      accessid: "TR056",
      Type: type,
      RecordID: recID,
      SupplierID,
      Finyear,
      CompanyID,
      yearID,
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());

    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // alert( JSON.stringify( response.data))
        console.log("response data" + response.data);
        console.log("response data" + response.data.Type);

        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          } else {
            if (response.data.Type == "L") {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditIndent%20Order/${response.data.RecordID}/E`;
            } else {
              window.location.href = `/Apps/Secondarylistview/TR056/Indent Order/${parentID}/${recID}/${response.data.ProdcrdNO}/${response.data.Type}/EditMaterial IndentOrder/${response.data.RecordID}/E`;
            }
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  };

const PurchaseIndent = createAsyncThunk(
  "Production Card/Indent",
  ({ RecordID }) => {
    var url = store.getState().globalurl.pIndentUrl;
    var data = {
      accessid: "TR108",
      RecordID: RecordID,
    };

    console.log("INDENTSTRUCT" + JSON.stringify(data));
    // dispatch(pending());
    axios
      .post(url, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })

      .then((response) => {
        console.log(
          "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
          response.data
        );
        // console.log("response data" + response.data);
        if (response.data.Status == "Y") {
          if (response.data.Insert == "Y") {
            toast.success(response.data.Msg);
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          } else {
            window.location.href = `/Apps/Secondarylistview/TR108/Material IndentOrder/${RecordID}/${response.data.ProdcrdNO}`;
          }
        } else {
          toast.error(response.data.Msg);
        }
      });
  }
);

const CustomerOrderSave = (type, recID) => (dispatch, getState) => {
  //  alert(type);

  var url = store.getState().globalurl.pcdurl;
  var data = {
    accessid: "TR047",
    Type: type,
    RecordID: recID,
  };

  console.log(data);
  // dispatch(pending());
  axios
    .post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    })

    .then((response) => {
      console.log(
        "🚀 ~ file: Listviewapireducer.js:96 ~ .then ~ response",
        response.data
      );
      // console.log("response data" + response.data);
      if (response.data.Status == "Y") {
        toast.success(``);
        // window.location.href = '/Apps/TR056/Customer%20Order'
      } else {
        toast.error(``);
      }
    })
    .catch((error) => {
      dispatch(errored);
      //dispatch(errored({"action":Action,"Status":apidata.Status,"apiResponse":apidata.Data,"Msg":""}))
    });
};
export const fetchListview =
  (AccessID, screenName, filter, any, CompId) => async (dispatch, getState) => {
    var url = store.getState().globalurl.listViewurl;
    var CompId = sessionStorage.getItem("compID");

    const year = sessionStorage.getItem("year");
    const company = sessionStorage.getItem("company");
    var LoggedInUserName = sessionStorage.getItem("UserName");
    const UserName = sessionStorage.getItem("UserName");

    //PROJECTPDFGET

    // const handlePDFGET = (ProjectID, EmployeeID) => {
    //   console.log("Dispatching with:", { ProjectID, EmployeeID });
    //   dispatch(getProjectCosting({ ProjectID, EmployeeID }));
    // };

    // const handlePDFGET = (ProjectID, EmployeeID) => {
    //   const dispatch = store.dispatch; // use store directly
    //   console.log("Dispatching PDF GET with:", { ProjectID, EmployeeID });
    //   dispatch(getProjectCosting({ ProjectID, EmployeeID }));
    // };

    if (
      filter != "" &&
      AccessID !== "TR115" &&
      AccessID !== "TR118" &&
      AccessID !== "TR155" &&
      AccessID !== "TR152" &&
      AccessID !== "TR280" &&
      AccessID !== "TR300" &&
      AccessID !== "TR305" &&
      AccessID !== "TR301" &&
      AccessID !== "TR295" &&
      AccessID !== "TR296" &&
      AccessID !== "TR297" &&
      AccessID !== "TR298" &&
      AccessID !== "TR279" &&
      AccessID !== "TR281" &&
      AccessID !== "TR282" &&
      AccessID !== "TR291" &&
      AccessID !== "TR283" &&
      AccessID !== "TR148"
    ) {
      if (
        AccessID == "TR011" ||
        AccessID == "TR008" ||
        AccessID == "TR054" ||
        AccessID == "TR052" ||
        AccessID == "TR060" ||
        AccessID == "TR003" ||
        AccessID == "TR021" ||
        AccessID == "TR073" ||
        AccessID == "TR050" ||
        AccessID == "TR074" ||
        AccessID == "TR077" ||
        AccessID == "TR079" ||
        AccessID == "TR080" ||
        AccessID == "TR032" ||
        AccessID == "TR128" ||
        AccessID == "TR087"
      ) {
        if (AccessID == "TR080") {
          filter =
            "parentID='" +
            filter +
            "'" +
            " " +
            "AND" +
            " " +
            "Finyear='" +
            year +
            "'";
        }
        if (AccessID != "TR080") {
          filter = "parentID= " + filter + "'";
          // console.log("---3---",filter);
        }
      }
      if (
        AccessID != "TR051" &&
        AccessID != "TR032" &&
        AccessID != "TR004" &&
        AccessID != "TR011" &&
        AccessID != "TR008" &&
        AccessID != "TR054" &&
        AccessID != "TR052" &&
        AccessID != "TR060" &&
        AccessID != "TR003" &&
        AccessID != "TR021" &&
        AccessID != "TR073" &&
        AccessID != "TR050" &&
        AccessID != "TR074" &&
        AccessID != "TR077" &&
        AccessID != "TR079" &&
        AccessID != "TR080" &&
        AccessID != "TR063" &&
        AccessID != "TR047" &&
        AccessID != "TR097" &&
        AccessID != "TR102" &&
        AccessID != "TR103" &&
        AccessID != "TR105" &&
        AccessID != "TR002" &&
        AccessID != "TR087" &&
        AccessID != "TR123" &&
        AccessID != "TR124" &&
        AccessID != "TR010" &&
        AccessID != "TR091" &&
        AccessID != "TR140" &&
        AccessID != "TR233" &&
        AccessID != "TR236" &&
        AccessID != "TR234" &&
        AccessID != "TR235" &&
        AccessID != "TR280" &&
        AccessID != "TR300" &&
        AccessID != "TR305" &&
        AccessID != "TR301" &&
        AccessID != "TR295" &&
        AccessID != "TR296" &&
        AccessID != "TR297" &&
        AccessID != "TR298" &&
        AccessID != "TR279" &&
        AccessID != "TR281" &&
        AccessID != "TR282" &&
        AccessID != "TR283" &&
        AccessID != "TR291" &&
        AccessID != "TR262" &&
        AccessID != "TR288" &&
        AccessID != "TR294" &&
        AccessID != "TR022" &&
        AccessID != "TR303" &&
        AccessID != "TR304" &&
        AccessID != "TR310" &&
        AccessID != "TR311" &&
        AccessID != "TR314" &&
        AccessID != "TR313" &&
        AccessID != "TR243" &&
        AccessID != "TR315" &&
        AccessID != "TR316" &&
        AccessID != "TR317" &&
        AccessID != "TR318" &&
        AccessID != "TR319" &&
        AccessID != "TR127"
      ) {
        filter = "parentID=" + `'${filter}'`;
        // console.log("---4---",filter);
      }

      if (
        AccessID == "TR051" ||
        AccessID == "TR047" ||
        AccessID == "TR097" ||
        AccessID == "TR063" ||
        AccessID == "TR004" ||
        AccessID == "TR103" ||
        AccessID == "TR102" ||
        AccessID == "TR105" ||
        AccessID == "TR002" ||
        //  AccessID == "TR303" ||
        AccessID == "TR091"
      ) {
        // filter = filter;
        filter = `CompanyID=${CompId}`;
      }
      if (AccessID === "TR262") {
        filter = "ProjectID=" + `'${filter}'`;
      }
      if (AccessID === "TR303") {
        filter = "PartyID=" + `'${filter}'`;
      }
      //   if (AccessID === "TR304") {
      //    filter = "LeaderID=" + `'${filter}'`;

      // }
      // if (AccessID === "TR314") {
      //    filter = "PartyID=" + `'${filter}'`;

      // }

      //  if (AccessID === "TR283") {
      //   filter = `"AssessmentType=${filter}"` + `'${filter}'`;
      // }
      //     if (AccessID === "TR288") {
      //       // filter = `"EmployeeID=${Em}"` + `'${filter}'`;
      //         const EmployeeID = sessionStorage.getItem("RecordID");
      // filter = EmployeeID ? `EmployeeID='${EmployeeID}' AND CompanyID=${CompId}` : "";
      //     }
    } else if (
      AccessID == "TR280" ||
      AccessID == "TR300" ||
      AccessID == "TR301" ||
      AccessID == "TR295" ||
      AccessID == "TR296" ||
      AccessID == "TR297" ||
      AccessID == "TR298" ||
      AccessID == "TR279" ||
      AccessID == "TR281" ||
      AccessID == "TR288" ||
      AccessID == "TR283" ||
      AccessID == "TR291" ||
      AccessID == "TR299" ||
      AccessID == "TR294" ||
      AccessID == "TR317" ||
      AccessID == "TR318" ||
      AccessID == "TR319" ||
      AccessID == "TR282"
      // AccessID == "TR304"
    ) {
      filter = filter;
    }
    // else if (AccessID == "TR283") {
    //   filter;
    // }
    else if (AccessID == "TR305" || AccessID == "TR313") {
      filter = "";
    }
    // else if (AccessID == "TR305") {
    //   filter = "";
    // }
     else {
      filter = `CompanyID=${CompId}`;
    }
    var idata = {
      Query: {
        // "ScreenName": screenName,
        AccessID: AccessID,
        ScreenName: screenName,
        Filter:
          AccessID == "TR128"
            ? `parentID=${CompId}`
            : AccessID == "TR273"
            ? "Type = 'CI'"
            : AccessID == "TR274"
            ? "Type = 'CO'"
            : filter,
        // Filter: `CompanyID=${CompId}`,
        Any: any,
        //CompId,
      },
    };

    idata = JSON.stringify(idata);
    console.log("data--" + idata);

    dispatch(pending());
    axios
      .get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })
      .then((response) => {
        var listviewData = response.data;
        if (listviewData.Status == "Y") {
          var obj = {};
          if (AccessID == "TR047") {
            obj = {
              field: "action",
              headerName: "Action",
              headerAlign: "center",
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              minWidth: 300,
              maxWidth: 300,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Number}/${params.row.Quantity}`}
                    >
                      <Tooltip title="Production Card Items">
                        <IconButton color="info">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}/${params.row.Number}`}
                    >
                      <Tooltip title="Indent Items">
                        <IconButton color="error">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link
                      to={`/Apps/TR146/Production Card/EditInspection Form/${params.row.RecordID}`}
                    >
                      <Tooltip title="Inspection Form">
                        <IconButton color="info">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    {params.row.Startdate != "" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }productioncard.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {params.row.Process != "Y" && params.row.Completeddate ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR047")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}

                    {params.row.Startdate == "" ? (
                      <Link>
                        <Tooltip title={params.row.Startdate}>
                          <IconButton
                            color="success"
                            onClick={productionCardUPdate(
                              "S",
                              params.row.RecordID
                            )}
                          >
                            <PlayCircleOutlineOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Startdate != "" &&
                      params.row.Completeddate == "" ? (
                      <Box>
                        {params.row.Pausedate == "" ? (
                          <Link>
                            <Tooltip title={params.row.Pausedate || "Pause"}>
                              <IconButton
                                color="warning"
                                onClick={productionCardUPdate(
                                  "P",
                                  params.row.RecordID
                                )}
                              >
                                <PauseCircleOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : params.row.ContinueDate == "" ? (
                          <Link>
                            <Tooltip title="Continue">
                              <IconButton
                                color="primary"
                                onClick={productionCardUPdate(
                                  "R",
                                  params.row.RecordID
                                )}
                              >
                                <NotStartedOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : (
                          false
                        )}
                        <Link>
                          <Tooltip
                            title={params.row.Completeddate || "Complete"}
                          >
                            <IconButton
                              color="success"
                              onClick={productionCardUPdate(
                                "C",
                                params.row.RecordID
                              )}
                            >
                              <TaskAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </Box>
                    ) : (
                      ""
                    )}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }PRODUCTIONCARD.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    <Tooltip title="Production Requirement">
                      <IconButton
                        component="a"
                        href={`${
                          store.getState().globalurl.pdfurl
                        }ProductionRequirement.php?Token=${
                          params.row.Hashtoken
                        }`}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: "#4615b2" }}
                        size="small"
                      >
                        <PrintOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    {params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }PRODUCTIONCARD.php?Token=${
                                  params.row.Hashtoken
                                }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_006",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {/* <Link><Tooltip title="Start"><IconButton color="success" onClick={productionCardUPdate("S",params.row.RecordID)} ><PlayCircleOutlineOutlinedIcon/></IconButton></Tooltip></Link>
             <Link><Tooltip title="Pause"><IconButton color="warning" onClick={productionCardUPdate("P",params.row.RecordID)}><PauseCircleOutlinedIcon/></IconButton></Tooltip></Link>
            <Link><Tooltip title="Complete"><IconButton color="success" onClick={productionCardUPdate("C",params.row.RecordID)}><TaskAltOutlinedIcon/></IconButton></Tooltip></Link> */}
                    {/* </Stack> */}
                  </Stack>
                );
              },
            };
          } else if (AccessID == "TR058" || AccessID == "TR059") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip
                        title={
                          AccessID == "TR058"
                            ? "List of Remarks"
                            : "List of Delivery challan"
                        }
                      >
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR146") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./EditJobWork Category/${params.row.RecordID}/E`}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to={`./EditJobwork/${params.row.RecordID}/E`}>
                      <Tooltip title={"List of Job Work"}>
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR275") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                const dispatch = store.dispatch;

                const PDFButton = ({ ProjectID, EmployeeID }) => {
                  const dispatch = store.dispatch;
                  const [loading, setLoading] = React.useState(false);

                  const handlePDFGET = async () => {
                    try {
                      setLoading(true);

                      const resultAction = await dispatch(
                        getProjectCosting({ ProjectID, EmployeeID })
                      );

                      const data = resultAction.payload; // <-- this depends on how your thunk is defined
                      if (!data?.HeaderData?.DetailData?.length) {
                        alert(
                          "No Costing available to generate PDF. Kindly add costing..."
                        );
                        return;
                      }

                      // Generate and download PDF
                      const blob = await pdf(
                        <ProjectPDF data={data} UserName={UserName} />
                      ).toBlob();
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = "Project.pdf";
                      link.click();
                    } catch (err) {
                      console.error("PDF generation failed", err);
                    } finally {
                      setLoading(false);
                    }
                  };

                  return (
                    <Tooltip title="Download PDF">
                      <IconButton
                        color="info"
                        size="small"
                        onClick={handlePDFGET}
                      >
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <PictureAsPdfIcon color="error" />
                        )}
                      </IconButton>
                    </Tooltip>
                  );
                };

                return (
                  <Box>
                    <Link to={`./EditProject/${params.row.RecordID}/E`}>
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    {/* <Tooltip title="Download PDF">
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => handlePDFGET(params.row.RecordID, params.row.InchargeID)}

                      >
                        <PDFDownloadLink
                          document={
                            <ProjectPDF
                            //data={projectCostinggetdata}
                            />
                          }
                          fileName="Project.pdf"
                        >
                          {({ loading }) =>
                            loading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <PictureAsPdfIcon color="error" />
                            )
                          }
                        </PDFDownloadLink>
                      </IconButton>
                    </Tooltip> */}

                    {/* <Tooltip title="Download PDF">
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() =>
                          handlePDFGET(
                            params.row.RecordID,
                            params.row.InchargeID,
                            dispatch
                          )
                        }
                      >
                        {projectCostingloading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <PDFDownloadLink
                            document={
                              <ProjectPDF data={projectCostinggetdata} />
                            }
                            fileName="Project.pdf"
                          >
                            {({ loading }) =>
                              loading ? (
                                <CircularProgress size={20} />
                              ) : (
                                <PictureAsPdfIcon color="error" />
                              )
                            }
                          </PDFDownloadLink>
                        )}
                      </IconButton>
                    </Tooltip> */}

                    <PDFButton
                      ProjectID={params.row.RecordID}
                      EmployeeID={params.row.InchargeID}
                    />
                  </Box>
                );
              },
            };
          }
          // else if (AccessID == "TR286") {
          //   obj = {
          //     field: "action",
          //     headerName: "Action",
          //     minWidth: 250,
          //     sortable: false,
          //     filterable: false,
          //     headerAlign: "center",
          //     align: "center",
          //     disableColumnMenu: true,
          //     disableExport: true,
          //     renderCell: (params) => {
          //       return (
          //         <Box>
          //           <IconButton
          //             color="primary"
          //             size="small"
          //             onClick={() =>
          //               navigate(
          //                 `/Apps/Secondarylistview/skillglow/:accessID/:screenName`,
          //                 {
          //                   state: {
          //                     BreadCrumb1: params.row.Code,
          //                     EmpID: params.row.RecordID,
          //                   },
          //                 }
          //               )
          //             }
          //           >
          //             <Tooltip title="Assessment Category">
          //               <CategoryOutlinedIcon />
          //             </Tooltip>
          //           </IconButton>
          //         </Box>
          //       );
          //     },
          //   };
          // }
          else if (
            AccessID == "TR278" ||
            AccessID == "TR280" ||
            AccessID == "TR301" ||
            AccessID == "TR300" ||
            AccessID == "TR305" ||
            AccessID == "TR295" ||
            AccessID == "TR296" ||
            AccessID == "TR297" ||
            AccessID == "TR298" ||
            AccessID == "TR279" ||
            AccessID == "TR281" ||
            AccessID == "TR282" ||
            AccessID == "TR288" ||
            AccessID == "TR286" ||
            AccessID == "TR291" ||
            AccessID == "TR299" ||
            AccessID == "TR294" ||
            AccessID == "TR283"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 200,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              //align: "center",
              align: "left",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => (
                <PrepareAction
                  // rights={rights}
                  params={params}
                  accessID={AccessID}
                  screenName={screenName}
                />
              ),
              // renderCell: (params) => {
              //   return (
              //     <Box>
              //       <Link
              //         // to={`/Apps/SkillGlow/SkillGlowList`}
              //         to={`/Apps/Secondarylistview/skillglow/TR280/List Of Assessment/${params.row.RecordID}`}
              //       >
              //         <IconButton color="primary" size="small">
              //           <Tooltip title="Assessment">
              //             <Psychology />
              //           </Tooltip>
              //         </IconButton>
              //       </Link>
              //       <Link
              //         to={`./EditList Of Categories/${params.row.RecordID}/E`}
              //       >
              //         <Tooltip title="Edit">
              //           <IconButton color="info" size="small">
              //             <ModeEditOutlinedIcon />
              //           </IconButton>
              //         </Tooltip>
              //       </Link>
              //       <Link
              //         to={`./EditList Of Categories/${params.row.RecordID}/D`}
              //       >
              //         <Tooltip title="Delete">
              //           <IconButton color="error" size="small">
              //             <Delete />
              //           </IconButton>
              //         </Tooltip>
              //       </Link>
              //     </Box>
              //   );
              // },
            };
          } else if (
            AccessID == "TR315" ||
            AccessID == "TR316" ||
            AccessID == "TR317" ||
            AccessID == "TR318" ||
            AccessID == "TR310" ||
            AccessID == "TR319"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              //align: "left",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => (
                <ItemAction
                  // rights={rights}
                  params={params}
                  accessID={AccessID}
                  screenName={screenName}
                />
              ),
            };
          } else if (AccessID == "TR076") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Batch">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR064") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Stock">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR049") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {/* // <Stack direction="row" spacing={1}> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of UOM">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR063") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./Edit${screenName}/${params.row.RecordID}/${params.row.YearID}/E`}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR043"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Code == "P" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR073/${params.row.ChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Code == "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR011/Proforma Invoice/${params.row.Code}/FI`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}

                    {params.row.Code == "PL" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR211/Local Invoice/${params.row.Code}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}

                    {params.row.Code == "LL" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR084/Local Invoice/${params.row.Code}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : null}

                    {/* ( <Link to={`/Apps/Secondarylistview/TR083/Local Invoce/${params.row.Type}/IN`}>
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ReceiptLongIcon />
                        </IconButton>
                      </Tooltip>
                  </Link>) */}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR044"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              sortable: false,
              filterable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List of Category">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }

          //          else if (AccessID == "TR243") {
          //   obj = {
          //     field: "action",
          //     headerName: "Action",
          //     minWidth: 100,
          //     sortable: false,
          //     headerAlign: "center",
          //     align: "center",
          //     disableColumnMenu: true,
          //     disableExport: true,
          //     filterable: false,
          //     renderCell: (params) => {
          //       const count = Number(params.row.MarketingCount || 0);
          //       const id = params.row.RecordID;

          //       console.log("Row:", id, "Count:", count, typeof count); // ✅ Debug log

          //       const leaderLink =
          //         count === 1
          //           ? `/Apps/Secondarylistview/TR303/LeaderCardView/${id}`
          //           : `/Apps/Secondarylistview/TR303/Leader/EditLeader/${id}/A`;

          //       const leaderState =
          //         count === 1
          //           ? {
          //               PartyName: params.row.Name,
          //               Count: count,
          //             }
          //           : null;

          //       return (
          //         <Box>
          //           {/* Edit Button */}
          //           <Link to={`./Edit${screenName}/${params.row.RecordID}/E`}>
          //             <Tooltip title="Edit">
          //               <IconButton color="info" size="small">
          //                 <ModeEditOutlinedIcon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>

          //           {/* Leader Button */}
          //           <Link to={leaderLink} state={leaderState}>
          //             <Tooltip title="Leader">
          //               <IconButton
          //                 color="info"
          //                 size="small"
          //                 onClick={(e) => {
          //                   e.stopPropagation();
          //                   console.log("MarketingCount:", count);
          //                 }}
          //               >
          //                 <Diversity2Icon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>
          //         </Box>
          //       );
          //     },
          //   };
          // }
          // else if (AccessID === "TR243") {
          //   obj = {
          //     field: "action",
          //     headerName: "Action",
          //     minWidth: 100,
          //     sortable: false,
          //     headerAlign: "center",
          //     align: "center",
          //     disableColumnMenu: true,
          //     disableExport: true,
          //     filterable: false,
          //     renderCell: (params) => {
          //       const count = Number(params.row.MarketingCount || 0);
          //       const id = params.row.RecordID;
          //       const PartyName = params.row.Name;
          //       // const filtertype = params.row.RecordID
          //       console.log(count, id, PartyName, "statess");
          //       const leaderLink =
          //         count >= 1
          //           ? `/Apps/Secondarylistview/TR303/LeaderCardView/${id},`
          //           // : `/Apps/Secondarylistview/TR304/Leader/EditLeader/${id}/A`
          //           : `/Apps/Secondarylistview/TR304/Leader/${id}/EditLeader/-1/A/F`;

          //       // const leaderState =
          //       // {
          //       //   PartyName: params.row.Name,
          //       //   Count: count,
          //       // }

          //       return (
          //         <Box>
          //           {/* Edit Button */}
          //           <Link
          //             to={`./Edit${screenName}/${params.row.RecordID}/E`}
          //             state={{
          //                PartyName: params.row.Party,
          //               Count: params.row.MarketingCount
          //             }}
          //           >

          //             <Tooltip title="Edit">
          //               <IconButton color="info" size="small">
          //                 <ModeEditOutlinedIcon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>

          //           {/* Leader Button */}
          //           <Link
          //             to={
          //               count >= 1
          //                 ? `/Apps/Secondarylistview/TR303/LeaderCardView/${id}`
          //                 : `/Apps/Secondarylistview/TR304/Leader/${id}/EditLeader/-1/A/F`
          //             }
          //             state={{
          //               PartyName: PartyName,
          //               Count: count
          //             }}
          //           >
          //             <Tooltip title="Leads">
          //               <IconButton
          //                 color="info"
          //                 size="small"
          //                 onClick={(e) => e.stopPropagation()}
          //               >
          //                 <Diversity2Icon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>

          //         </Box>
          //       );
          //     },
          //   };
          // }
          else if (AccessID === "TR243") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 170,
              sortable: false,
              headerAlign: "center",
              align: "left",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                const count = Number(params.row.MarketingCount || 0);
                const id = params.row.RecordID;
                const PartyName = params.row.Name;

                // Encode PartyName to make it URL-safe
                // const encodedName = encodeURIComponent(PartyName);

                return (
                  <Box>
                    {/* Edit Button */}
                    <Link
                      to={`./Edit${screenName}/${params.row.RecordID}/E`}
                      state={{
                        PartyName: params.row.Party,
                        PName: params.row.Name,
                        Count: params.row.MarketingCount,
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    {/* Leader Button */}
                    <Link
                      to={
                        count >= 1
                          ? `/Apps/Secondarylistview/TR303/LeaderCardView/${id}`
                          : `/Apps/Secondarylistview/TR304/Leader/${id}/${PartyName}/EditLeader/-1/A/F`
                      }
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Leads">
                        <IconButton color="info" size="small">
                          <Diversity2Icon />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    {/* ORDER HEADER */}
                    {/* {params.row.LeaderCount >= 1 ? ( */}
                    <Link
                      // to={
                      //   params.row.OrdHdrCount > 0
                      //     ? `/Apps/Secondarylistview/TR310/Order/${id}/Party`
                      //     : `/Apps/Secondarylistview/TR310/Order/${params.row.RecordID}/Party/EditOrder/-1/A`
                      // }
                      to={
                        params.row.OrderCount > 0
                          ? `/Apps/Secondarylistview/TR310/Order/${id}/Party/O`
                          : `/Apps/Secondarylistview/TR310/Order/${params.row.RecordID}/Party/O/EditOrder/-1/A`
                      }
                      state={{
                        PartyID: params.row.RecordID,
                        PartyName: params.row.Name,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Order">
                        <IconButton color="info" size="small">
                          <CategoryIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    {/* FOR QUOTATION */}
                    <Link
                      to={
                        params.row.QuotationCount > 0
                          ? `/Apps/Secondarylistview/TR310/Order/${id}/Party/Q`
                          : `/Apps/Secondarylistview/TR310/Order/${params.row.RecordID}/Party/Q/EditOrder/-1/A`
                      }
                      state={{
                        PartyID: params.row.RecordID,
                        PartyName: params.row.Name,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Quotation">
                        <IconButton color="info" size="small">
                          <RequestQuoteOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    {/* ) : null} */}

                    <Link
                      // to={
                      //   params.row.OrdHdrCount > 0
                      //   ? `/Apps/Secondarylistview/TR310/Order/${id}/Party`

                      //   :`/Apps/Secondarylistview/TR310/Order/${params.row.RecordID}/Party/EditOrder/-1/A`

                      //   }
                      to={`/Apps/Secondarylistview/TR314/AdvancePayment/${id}`}
                      state={{
                        PartyID: params.row.RecordID,
                        PartyName: params.row.Name,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Advance Payment">
                        <IconButton color="info" size="small">
                          <CurrencyRupeeOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }

          // else if (AccessID == "TR303") {
          //   obj = {
          //     field: "action",
          //     headerName: "Action",
          //     minWidth: 100,
          //     sortable: false,
          //     headerAlign: "center",
          //     align: "center",
          //     disableColumnMenu: true,
          //     disableExport: true,
          //     filterable: false,
          //     renderCell: (params) => {
          //       return (
          //         <Box>
          //           <Link
          //             to={`./Edit${screenName}/${params.row.RecordID}/E`}
          //             state={{
          //               PartyName: params.row.Party,
          //             }}
          //           >
          //             <Tooltip title="Edit">
          //               <IconButton color="info" size="small">
          //                 <ModeEditOutlinedIcon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>

          //           <Link
          //             //  to={`/Apps/Secondarylistview/TR304/Marketing Activity/${params.row.RecordID}`}
          //             to={`/Apps/Secondarylistview/TR304/Marketing Activity/${params.row.PartyID}/${params.row.RecordID}`}
          //             state={{
          //               PartyName: params.row.Party,
          //             }}
          //           >
          //             <Tooltip title="Marketing Activity">
          //               <IconButton color="info" size="small">
          //                 <AssistantIcon />
          //               </IconButton>
          //             </Tooltip>
          //           </Link>
          //         </Box>
          //       );
          //     },
          //   };
          // }
          //   else if (AccessID === "TR310") {
          //     obj = {
          //       field: "action",
          //       headerName: "Action",
          //       minWidth: 150,
          //       sortable: false,
          //       headerAlign: "center",
          //       align: "center",
          //       disableColumnMenu: true,
          //       disableExport: true,
          //       filterable: false,
          //       renderCell: (params) => {
          //         const count = Number(params.row.MarketingCount || 0);
          //         const id = params.row.RecordID;

          //         const PartyName = params.row.Name;

          //         const PDFButton = ({ PartyID, OrderHdrID, CompanyID }) => {
          //           const dispatch = store.dispatch;
          //           const [loading, setLoading] = React.useState(false);

          //           const handlePDFGET = async () => {
          //             try {
          //               setLoading(true);

          //               const resultAction = await dispatch(
          //                 getOrderdetailReport({ PartyID, OrderHdrID, CompanyID })
          //               );

          //               const data = resultAction.payload; // <-- this depends on how your thunk is defined
          //               if (!data?.HeaderData?.DetailData?.length) {
          //                 alert("No Order Items available for this order..");
          //                 return;
          //               }

          //               // Generate and download PDF
          //               const blob = await pdf(
          //                 <OrderHeaderPdf data={data} UserName={UserName} />
          //               ).toBlob();
          //               // const link = document.createElement("a");
          //               // link.href = URL.createObjectURL(blob);
          //               // //link.download = "OrderDeatils.pdf";
          //               // link.Open();
          //               // link.click();
          //               const blobUrl = URL.createObjectURL(blob);
          //               window.open(blobUrl, "_blank");
          //             } catch (err) {
          //               console.error("PDF generation failed", err);
          //             } finally {
          //               setLoading(false);
          //             }
          //           };

          //           return (
          //             <Tooltip title="Download PDF">
          //               <IconButton
          //                 color="info"
          //                 size="small"
          //                 onClick={handlePDFGET}
          //               >
          //                 {loading ? (
          //                   <CircularProgress size={20} />
          //                 ) : (
          //                   <PictureAsPdfIcon color="error" />
          //                 )}
          //               </IconButton>
          //             </Tooltip>
          //           );
          //         };
          //         const handleConvert = async (row) => {
          //           const action = "update";

          //           const idata = {
          //             RecordID: row.RecordID,
          //             Code: row.Code || "",

          //             LeaderID: row.LeaderID || 0,
          //             PartyRecordID: row.PartyRecordID || 0,
          //             EmployeeRecordID: row.EmployeeRecordID || 0,

          //             PartyName: row.PartyName || "",
          //             OrderDate: row.OrderDate || "",
          //             DeliveryCharges: row.DeliveryCharges || 0,
          //             TotalPrice: row.TotalPrice || 0,
          //             TentativeDeliveryDate: row.TentativeDeliveryDate || "",
          //             DeliveryBy: row.DeliveryBy || "",
          //             DeliveryYesorNo: row.DeliveryYesorNo || "N",
          //             PaidYesorNo: row.PaidYesorNo || "No",
          //             PaidDate: row.PaidDate || "",
          //             DeliveryDate: row.DeliveryDate || "",
          //             PaidAmount: row.PaidAmount || 0,

          //             PaymentMode: row.PaymentMode || "",
          //             ReceiverName: row.ReceiverName || "",
          //             ReceiverMobileNumber: row.ReceiverMobileNumber || "",
          //             DeliveryComments: row.DeliveryComments || "",
          //             PaidComments: row.PaidComments || "",

          //             CompanyID: row.CompanyID,

          //             // 🔥 CONVERSION LOGIC
          //             OrderType: "O",
          //             ORStatus: "Process",
          //           };

          //           const response = await dispatch(
          //             postData({ accessID: "TR310", action, idata })
          //           );

          //           if (response.payload.Status === "Y") {
          //             // 🔑 parse message if needed
          //             let msg = "Converted to Order successfully";
          //             if (response.payload.Result) {
          //               try {
          //                 msg = JSON.parse(response.payload.Result)?.Msg || msg;
          //               } catch {}
          //             }

          //             toast.success(msg);

          //             navigate(
          //   `/Apps/Secondarylistview/${params.accessID}/Order/${params.filtertype}/${params.Type}/O`,
          //   { state: { ...state } }
          // );
          //           } else {
          //             toast.error("Conversion failed");
          //           }
          //         };

          //         return (
          //           <Box>
          //             {/* Edit Button */}
          //             <Link
          //               to={`./Edit${screenName}/${params.row.RecordID}/E`}
          //               state={{
          //                 PartyName: params.row.PartyName,
          //                 Count: params.row.MarketingCount,
          //                 LeadTitle: params.row.LeadTitle,
          //                 PartyID: params.row.PartyRecordID,
          //                 Code: params.row.Code,
          //               }}
          //             >
          //               <Tooltip title="Edit">
          //                 <IconButton color="info" size="small">
          //                   <ModeEditOutlinedIcon />
          //                 </IconButton>
          //               </Tooltip>
          //             </Link>

          //             {/* CONVERT TO ORDER */}
          //             {params.row.OrderType === "Q" && (
          //               <Tooltip title="Convert To Order">
          //                 <IconButton
          //                   color="success"
          //                   size="small"
          //                   onClick={() => handleConvert(params.row)}
          //                 >
          //                   <CurrencyExchangeOutlinedIcon />
          //                 </IconButton>
          //               </Tooltip>
          //             )}

          //             {/* Leader Button */}
          //             <Link
          //               // to={`/Apps/Secondarylistview/TR310/Order/${id}/EditOrderitem/-1/E`}
          //               to={
          //                 params.row.OrderItemsCount >= 1
          //                   ? `./TR311/${id}`
          //                   : `./TR311/${id}/EditOrderitem/-1/A`
          //               }
          //               state={{
          //                 PartyName: params.row.PartyName,
          //                 Count: params.row.MarketingCount,
          //                 Code: params.row.Code,
          //                 LeadTitle: params.row.LeadTitle,
          //                 PartyID: params.row.PartyRecordID,
          //               }}
          //               // /Secondarylistview/:accessID/:screenName/:filtertype/EditOrderitem/:id/:Mode
          //             >
          //               <Tooltip title="Order Item">
          //                 <IconButton
          //                   color="info"
          //                   size="small"
          //                   // onClick={() =>
          //                   //   handleorderitemscreen(row.RecordID, row.PartyID, row.LeadTitle, row.PartyName, row.LEStatus)
          //                   // }
          //                 >
          //                   <GridViewIcon />
          //                 </IconButton>
          //               </Tooltip>
          //             </Link>
          //             <Link
          //               state={{
          //                 PartyName: params.row.PartyName,
          //                 Count: params.row.MarketingCount,
          //                 LeadTitle: params.row.LeadTitle,
          //                 PartyID: params.row.PartyRecordID,
          //                 Code: params.row.Code,
          //               }}
          //             >
          //               <PDFButton
          //                 PartyID={params.row.PartyRecordID}
          //                 OrderHdrID={params.row.RecordID}
          //                 CompanyID={params.row.CompanyID}
          //               />
          //             </Link>
          //           </Box>
          //         );
          //       },
          //     };
          //   }
          else if (AccessID === "TR311") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                const count = Number(params.row.MarketingCount || 0);
                const id = params.row.RecordID;
                const PartyName = params.row.Name;

                // Encode PartyName to make it URL-safe
                // const encodedName = encodeURIComponent(PartyName);

                return (
                  <Box>
                    {/* Edit Button */}
                    <Link
                      to={`./EditOrderitem/${params.row.RecordID}/E`}
                      state={{
                        PartyName: params.row.PartyName,
                        Count: params.row.MarketingCount,
                        Code: params.row.Code,
                        LeadTitle: params.row.LeadTitle,
                        PartyID: params.row.PartyRecordID,
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID === "TR314") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                const count = Number(params.row.MarketingCount || 0);
                const id = params.row.RecordID;
                const PartyName = params.row.Name;

                return (
                  <Box>
                    {/* Edit Button */}
                    <Link
                      to={`./EditAdvancePayment/${params.row.RecordID}/E`}
                      state={{
                        PartyName: params.row.PartyName,
                        Count: params.row.MarketingCount,
                        Code: params.row.Code,
                        LeadTitle: params.row.LeadTitle,
                        PartyID: params.row.PartyRecordID,
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton color="info" size="small">
                          <ModeEditOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID === "TR304") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              filterable: false,
              renderCell: (params) => {
                // Check per-row Editable value
                sessionStorage.setItem("Status", params.row.OMStatus);
                if (
                  String(params.row.Editable) === "1" &&
                  params.row.OMStatus !== "Close"
                ) {
                  return (
                    <Box>
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          PartyName: params.row.PartyName,
                          PartyID: params.row.PartyID,
                          LeadTitle: params.row.LeadTitle,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/IM`}
                        state={{
                          PartyName: params.row.PartyName,
                          PartyID: params.row.PartyID,
                          LeadTitle: params.row.LeadTitle,
                        }}
                      >
                        <Tooltip title="Attachment">
                          <IconButton color="info" size="small">
                            <AttachFileIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      {/* if (params.row.Editable === "Close") */}
                    </Box>
                  );
                }
                if (
                  String(params.row.Editable) === "0" ||
                  params.row.OMStatus === "Close"
                ) {
                  return (
                    <Box>
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/V`}
                        state={{
                          PartyName: params.row.PartyName,
                          PartyID: params.row.PartyID,
                          LeadTitle: params.row.LeadTitle,
                        }}
                      >
                        <Tooltip title="View">
                          <IconButton
                            style={{ color: "#eb710dff" }}
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/IM`}
                        state={{
                          PartyName: params.row.PartyName,
                          PartyID: params.row.PartyID,
                          LeadTitle: params.row.LeadTitle,
                        }}
                      >
                        <Tooltip title="Attachment">
                          <IconButton color="info" size="small">
                            <AttachFileIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </Box>
                  );
                }
                // If Editable is "0", render nothing
                return null;
              },
            };
          }

          // STOCKENQUIRY
          else if (
            AccessID == "TR078"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              align: "center",
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Type == "S" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.SuppChildID}/${params.row.SuppChildName}/${params.row.Type}/${params.row.Description}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "PD" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.PrdcrdChildID}/${params.row.PrdcrdChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.PrdcrdChildID}/${params.row.PrdcrdChildName}/${params.row.parentID}/${params.row.Type}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : params.row.Type == "CC" || params.row.Type == "PC" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Code}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.RemarkChildID}/${params.row.RemarkChildName}/${params.row.Code}`}
                      >
                        <Tooltip title="List Of Stock">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR072"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Description}`}
                    >
                      <Tooltip title="List Of Process">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR116"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              align: "center",
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="List Of Packing List">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR116"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                    >
                      <Tooltip title="">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          }
          //
          else if (
            AccessID == "TR087"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.parentID == "N" ? (
                      <Link to={`./EditPacking List/${params.row.RecordID}/E`}>
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/TR087/Packing List/${params.row.parentID}/EditAssorted/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }productpacking.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }productpacking.php?Token=${
                                  params.row.Hashtoken
                                }`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_010",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR072"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.Description}`}
                    >
                      <Tooltip title="List Of Process">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR073"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 150,
              sortable: false,
              headerAlign: "center",
              align: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.parentID}/${params.row.Code}`}
                    >
                      <Tooltip title={params.row.Description}>
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR079"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/TR080/Stock/${params.row.RecordID}/${params.row.Name}/${params.row.parentID}`}
                    >
                      <Tooltip title="Stock">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR051"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              align: "center",
              renderCell: (params) => {
                return (
                  <Box>
                    {/* <Tooltip title="Indent Order">
                        
                       <IconButton color="info" size="small" onClick={indentOrderSave('insert',params.row.RecordID)}>
                         <ReceiptLongIcon />
                       </IconButton>
                     </Tooltip> */}
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.MtlRecordID}/${params.row.ProductionCardNO}/${params.row.Type}`}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          color="info"
                          onClick={() =>
                            sessionStorage.setItem(
                              "indentRecID",
                              params.row.RecordID
                            )
                          }
                          size="small"
                        >
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR113"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Link
                    to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                  >
                    <Tooltip title="Edit">
                      <IconButton color="info" size="small">
                        <ListAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                );
              },
            };
          } else if (
            AccessID == "TR111"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Link
                    to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.Name}`}
                  >
                    <Tooltip title="Edit">
                      <IconButton color="info" size="small">
                        <ListAltOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                );
              },
            };
          } else if (
            AccessID == "TR101"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {params.row.Code === "CR" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Code}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List Of Invoice">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR140"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/Costing/${params.row.ProductRecordID}/${params.row.ProductDescription}/${params.row.CustomerRecordID}`}
                    >
                      <Tooltip title="List Of BOM">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR141"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./costing-product/${params.row.ReferenceNo}/${params.row.RecordID}/TR091`}
                    >
                      <Tooltip title="List Of Costing">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR103"

            // AccessID == "TR060"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Description}/${params.row.RecordID}`}
                      state={{ rowData: params.row }}
                    >
                      <Tooltip title="List Of Invoice">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR104") {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    <Link
                      to={`./${params.row.ChildID}/${params.row.ChildName}/${params.row.Code}`}
                    >
                      <Tooltip title="List Of Invoice">
                        <IconButton color="info" size="small">
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Box>
                );
              },
            };
          } else if (
            AccessID == "TR236" ||
            AccessID == "TR234" ||
            AccessID == "TR235" ||
            AccessID == "TR233"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 100,
              sortable: false,
              headerAlign: "center",
              filterable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Box>
                    {AccessID == "TR236" && (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          MilestoneID: params.row.RecordID,
                          projectID: params.row.ProjectID,
                          MilestoneName: params.row.MilestoneName,
                          Activityname: params.row.ActivitesName,
                          TaskName: params.row.Name,
                          projectName: params.row.ProjectName,
                          stagesName: params.row.OperationStageName,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                    {AccessID == "TR236" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR234/Activities/${params.row.RecordID}`}
                        state={{
                          MilestoneID: params.row.MilestoneID,
                          MilestoneName: params.row.MilestoneName,
                          stagesName: params.row.Name,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          projectName: params.row.ProjectName,
                        }}
                      >
                        <Tooltip title="Activities">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR236" ? (
                      <Link
                        to={`/Apps/TR233/weightage/Editweightage/ACT/${params.row.RecordID}/E`}
                        state={{
                          code: params.row.Code,
                          Desc: params.row.Name,
                          MilestoneID: params.row.RecordID,
                          MilestoneName: params.row.MilestoneName,
                          stagesName: params.row.Name,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          projectName: params.row.ProjectName,
                        }}
                      >
                        <Tooltip title="Activity Weightage">
                          <IconButton color="info" size="small">
                            <BalanceIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR233" && (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          MilestoneID: params.row.RecordID,
                          projectID: params.row.ProjectID,
                          //MilestoneName:params.row.MilestoneName,
                          Activityname: params.row.ActivitesName,
                          TaskName: params.row.Name,
                          projectName: params.row.ProjectName,
                          stagesName: params.row.OperationStageName,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                    {AccessID == "TR233" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR236/Stages/${params.row.RecordID}`}
                        state={{
                          MilestoneID: params.row.RecordID,
                          projectID: params.row.ProjectID,
                          MilestoneName: params.row.Name,
                          MilestoneName: params.row.Name,
                          projectName: params.row.ProjectName,
                        }}
                      >
                        <Tooltip title="Stages">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR233" ? (
                      <Link
                        to={`/Apps/TR233/weightage/Editweightage/OPS/${params.row.RecordID}/E`}
                        state={{
                          code: params.row.Code,
                          Desc: params.row.Name,
                          MilestoneID: params.row.RecordID,
                          MilestoneName: params.row.Name,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          projectName: params.row.ProjectName,
                        }}
                      >
                        <Tooltip title="Stage Weightage">
                          <IconButton color="info" size="small">
                            <BalanceIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR234" && (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          MilestoneID: params.row.RecordID,
                          Activityname: params.row.Name,
                          MilestoneName: params.row.MilestoneName,
                          projectID: params.row.ProjectID,
                          stagesName: params.row.OperationStageName,
                          projectName: params.row.ProjectName,
                          OperationStageID: params.row.OperationStageID,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                    {AccessID == "TR234" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR235/Task/${params.row.RecordID}`}
                        state={{
                          MilestoneID: params.row.MilestoneID,
                          Activityname: params.row.Name,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          MilestoneName: params.row.MilestoneName,
                          stagesName: params.row.OperationStageName,
                          projectName: params.row.ProjectName,
                        }}
                      >
                        <Tooltip title="Task">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR234" ? (
                      <Link
                        to={`/Apps/TR233/weightage/Editweightage/TK/${params.row.RecordID}/E`}
                        state={{
                          code: params.row.Code,
                          Desc: params.row.Name,
                          MilestoneID: params.row.MilestoneID,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          MilestoneName: params.row.MilestoneName,
                          stagesName: params.row.OperationStageName,
                          projectName: params.row.ProjectName,
                          Activityname: params.row.Name,
                        }}
                      >
                        <Tooltip title="Task Weightage">
                          <IconButton color="info" size="small">
                            <BalanceIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR235" && (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={{
                          TaskName: params.row.Name,
                          MilestoneID: params.row.RecordID,
                          MilestoneName: params.row.MilestoneName,
                          Activityname: params.row.ActivitesName,
                          projectID: params.row.ProjectID,
                          projectName: params.row.ProjectName,
                          OperationStageID: params.row.OperationStageID,
                          stagesName: params.row.OperationStageName,
                        }}
                        //state ={{MilestoneID:params.row.MilestoneID,projectID:params.row.ProjectID,OperationStageID:params.row.OperationStageID}}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    )}
                  </Box>
                );
              },
            };
          } else if (AccessID == "TR080") {
            listviewData.Data.columns.push(obj);
            dispatch(
              Success({
                columndata: listviewData.Data.columns,
                rowdata: listviewData.Data.rows,
              })
            );
          } else if (
            AccessID !== "TR105" &&
            AccessID !== "TR102" &&
            AccessID !== "TR111" &&
            AccessID !== "TR112" &&
            AccessID !== "TR114" &&
            AccessID !== "TR115"
          ) {
            obj = {
              field: "action",
              headerName: "Action",
              minWidth: 250,
              headerAlign: "center",
              align: "center",
              filterable: false,
              sortable: false,
              disableColumnMenu: true,
              disableExport: true,
              renderCell: (params) => {
                const indentRecID = sessionStorage.getItem("indentRecID");
                return (
                  <Stack direction="row">
                    {AccessID !== "TR119" &&
                    AccessID !== "TR118" &&
                    AccessID !== "TR032" &&
                    AccessID !== "TR099" &&
                    AccessID !== "TR048" &&
                    AccessID !== "TR010" &&
                    AccessID !== "TR083" &&
                    AccessID !== "TR097" &&
                    AccessID !== "TR135" &&
                    AccessID !== "TR136" &&
                    AccessID !== "TR091" &&
                    AccessID !== "TR151" &&
                    //AccessID !== "TR027" &&
                    AccessID !== "TR052" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E`}
                        state={
                          AccessID === "TR027"
                            ? {
                                EmpName: params.row.Name,
                              }
                            : AccessID === "TR128"
                            ? {
                                LocationName: params.row.Name,
                                CompanyName: params.row.CompanyName,
                              }
                            : AccessID === "TR127"
                            ? {
                                GateName: params.row.Name,
                                LocationName: params.row.LocationName,
                                CompanyName: params.row.CompanyName,
                              }
                            : AccessID === "TR257"
                            ? {
                                EmpName: params.row.Name,
                              }
                            : AccessID === "TR132"
                            ? {
                                proName: params.row.ProjectName,
                                Date: params.row.Date,
                                EmpName: params.row.EmployeeName,
                                Locname: params.row.LocationName,
                              }
                            : AccessID === "TR123"
                            ? {
                                EmpName: params.row.Name,
                              }
                            : AccessID === "TR134"
                            ? {
                                proName: params.row.ProjectName,
                                EmpName: params.row.EmployeeName,
                                Date: params.row.Date,
                                Locname: params.row.LocationName,
                                EmployeeID: params.row.EmployeesID,
                                checkinID: params.row.CheckinID,
                              }
                            : AccessID === "TR124"
                            ? {
                                EmpName: params.row.EmployeeName,
                                checkinID: params.row.CheckinID,
                              }
                            : // : AccessID === "TR127"
                              // ? {
                              //     GateName: params.row.Name,
                              //     LocationName: params.row.LocationName,
                              //     CompanyName: params.row.CompanyName,
                              //   }
                              // : AccessID === "TR129"
                              // ? {
                              //     bin: params.row.Name,
                              //     LocationName: params.row.LocationName,
                              //     CompanyName: params.row.CompanyName,
                              //   }
                              {
                                CustomerID: params.row.CustomerRecordID,
                                ProductID: params.row.ProductRecordID,
                                BomID: params.row.BomRecordID,
                              }
                        }
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR052" || AccessID == "TR151" ? (
                      <Link
                        to={`./EditDelivery Chalan/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {/* {AccessID == "TR027" ? (
                      <Link
                      to={`/Apps/TR027/${screenName}/Edit${screenName}/${params.row.RecordID}/E`}
                      state={{EmpName:params.row.Name}}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )} */}
                    {/* {AccessID == "TR027" ? (
                      <Link
                      to={`/Apps/TR027/Employee Payroll/EditEmployee Payroll/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )} */}
                    {AccessID == "TR091" ? (
                      <Link
                        to={`./${params.row.FirstLeatherID}/Edit${screenName}/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {params.row.Process == "Y" && AccessID == "TR052" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }deliverychallan.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {params.row.Process != "Y" &&
                    params.row.parentID == "MO" &&
                    AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                    {params.row.Process != "Y" &&
                    params.row.parentID == "LO" &&
                    AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                    {params.row.Process != "Y" &&
                    params.row.parentID == "PO" &&
                    AccessID == "TR052" ? (
                      <Link>
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR052")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}
                    {AccessID == "TR091" ? (
                      <Link
                        // to={"./price-of-other-customer"}
                        to={`./price-of-other-customer/${params.row.RecordID}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <AssessmentIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR099" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                      >
                        <Tooltip title="List of  usergroups">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR014" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}`}
                      >
                        <Tooltip title="Locations">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {/* {AccessID == "TR123" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR132/DailyTask/${params.row.RecordID}`}
                        state={{EmpName:params.row.EmployeeName,Locname:params.row.LocationName,Date:params.row.CheckInDate}}
                      >
                        <Tooltip title="Daily Task Icon">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip> 
                      </Link>
                    ) : (
                      false
                    )} */}
                    {/* {AccessID == "TR132" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR134/Daily Hour Task/${params.row.RecordID}/${params.row.parentID}`}
                        state={{EmpName:params.row.EmployeeName,Locname:params.row.LocationName,proName:params.row.ProjectName,EmployeeID:params.row.EmployeesID,Date:params.row.Date}}
                      >
                        <Tooltip title="Daily Hours Task ">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    */}
                    {AccessID == "TR234" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR235/Task/${params.row.RecordID}`}
                        state={{
                          MilestoneID: params.row.MilestoneID,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          stagesName: params.row.OperationStageName,
                          MilestoneName: params.row.MilestoneName,
                          Activityname: params.row.Name,
                        }}
                      >
                        <Tooltip title="Task">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR234" ? (
                      <Link
                        to={`/Apps/TR233/weightage/Editweightage/TK/${params.row.RecordID}/E`}
                        state={{
                          code: params.row.Code,
                          Desc: params.row.Name,
                          MilestoneID: params.row.RecordID,
                          projectID: params.row.ProjectID,
                          OperationStageID: params.row.OperationStageID,
                          stagesName: params.row.OperationStageName,
                          MilestoneName: params.row.MilestoneName,
                          Activityname: params.row.Name,
                        }}
                      >
                        <Tooltip title="Task Weightage">
                          <IconButton color="info" size="small">
                            <BalanceIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {/*                    
                    {AccessID == "TR133" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR233/Milestones/${params.row.RecordID}`}
                        state={{code:params.row.Code,Desc:params.row.Name,MilestoneID:params.row.RecordID,projectID:params.row.ProjectID,OperationStageID:params.row.OperationStageID,projectName:params.row.Name}} 
                      >
                        <Tooltip title="Milestone">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                          
                     
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR133" ? (
                      <Link
                        to={`/Apps/TR233/weightage/Editweightage/M/${params.row.RecordID}/E`}
                        state={{code:params.row.Code,Desc:params.row.Name,MilestoneID:params.row.RecordID,projectID:params.row.ProjectID,OperationStageID:params.row.OperationStageID,projectName:params.row.Name}}
                      >
                        <Tooltip title="Milestone Weightage">
                          <IconButton color="info" size="small">
                            < BalanceIcon />
                          </IconButton>
                          
                         
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
   {AccessID == "TR133" ? (
                      <Link
                      to={`/Apps/Secondarylistview/TR262/Sprint/${params.row.RecordID}`}
                        state={{code:params.row.Code,Desc:params.row.Name,MilestoneID:params.row.RecordID,projectID:params.row.ProjectID,OperationStageID:params.row.OperationStageID,projectName:params.row.Name}}
                      >
                        <Tooltip title="Sprint">
                          <IconButton color="info" size="small">
                            < ListAltOutlinedIcon />
                          </IconButton>
                          
                         
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )} */}

                    {AccessID == "TR136" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}/${params.row.RecordID}`}
                      >
                        <Tooltip title="Finance Entry">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR135" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.Type}`}
                      >
                        <Tooltip title="Fixed Asset Category">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR137" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.parentID}`}
                      >
                        <Tooltip title="Fixed Assets">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR128" ? (
                      <Box>
                        <Link
                          to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.parentID}`}
                          state={{ Locationname: params.row.Name }}
                        >
                          <Tooltip title="Gate">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        {/* <Link
                          to={`/Apps/Secondarylistview/${params.row.ChildID1}/${params.row.ChildName1}/${params.row.RecordID}/${params.row.parentID}`}
                        >
                          <Tooltip title="Bin">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link> */}
                      </Box>
                    ) : (
                      false
                    )}

                    {/* http://skillglow.beyondexs.com/trinity/tcpdf/BOMCC.php?compID=3&PBBHID=99 */}
                    {AccessID == "TR083" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors/${params.row.Type}`}
                      >
                        <Tooltip title="List of Colors">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR032" ? (
                      <Link to={`./Edit${screenName}/${params.row.RecordID}/E`}>
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {/* http://skillglow.beyondexs.com/trinity/tcpdf/BOMCC.php?compID=3&PBBHID=99 */}
                    {AccessID == "TR032" && params.row.MType === "L" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors/${params.row.RecordID}/${params.row.Description}`}
                      >
                        <Tooltip title="List of Color shades">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR033" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/Colors-customer/${params.row.RecordID}/${params.row.parentName}/${params.row.Description}`}
                      >
                        <Tooltip title="List of Customer">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR097" ? (
                      <Link
                        to={`./${params.row.ChildID}/${params.row.RecordID}/DC/${params.row.Type}/${params.row.Description}/`}
                      >
                        <Tooltip title="List of Delivery Chalan">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR109" && params.row.Process == "Y" ? (
                      <Box>
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }Leatherpackingreport.php?Token=${
                              params.row.Hashtoken
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }LEATHERPACKING.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      false
                    )}
                    {AccessID == "TR109" && params.row.Process == "Y" ? (
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {
                          dispatch(
                            mailOpen({
                              row: params.row,
                              link: `${
                                store.getState().globalurl.pdfurl
                              }Leatherpackingreport.php?Token=${
                                params.row.Hashtoken
                              }`,
                            })
                          );
                          dispatch(
                            getMail({
                              Templateid: "ET_011",
                              RecordID: params.row.RecordID,
                              UserName: "Trinity",
                            })
                          );
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    ) : null}
                    {AccessID == "TR050" && params.row.Process != "Y" ? (
                      <Link>
                        {" "}
                        <IconButton
                          color="primary"
                          variant="contained"
                          onClick={fnProcess(params.row.RecordID, "TR050")}
                          // onClick={()=>alert("hai")}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </Link>
                    ) : null}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Cutting Component">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMCC.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="primary"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Production">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMPROD.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="success"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Packing">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMPACK.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="error"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="All BOM">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }BOMALL.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color=""
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <Tooltip title="Internal Order">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }Internalorder.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color=""
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR050" && params.row.Process == "Y" ? (
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => {
                          dispatch(
                            mailOpen({
                              row: params.row,
                              link: `${
                                store.getState().globalurl.pdfurl
                              }BOMALL.php?Token=${params.row.Hashtoken}`,
                            })
                          );
                          dispatch(
                            getMail({
                              Templateid: "ET_005",
                              RecordID: params.row.RecordID,
                              UserName: "Trinity",
                            })
                          );
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    ) : (
                      false
                    )}
                    {/* {AccessID == "TR087" ?
                 <IconButton component="a"  href={`${store.getState().globalurl.pdfurl}productpackinglist.php?`} target="_blank" 
                 rel="noreferrer"  color="info" size="small" ><PrintOutlinedIcon/>
                 </IconButton>
                :false} */}

                    {AccessID == "TR074" ? (
                      params.row.Complete == "N" ? (
                        <Box>
                          <Link
                            to={`./Editbatchissue/${params.row.RecordID}/E`}
                          >
                            <Tooltip title="Issue">
                              <IconButton color="info" size="small">
                                <ListAltOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Link
                            to={`./Editbatchcompletion/${params.row.RecordID}/E`}
                          >
                            <Tooltip title="Completion">
                              <IconButton color="error" size="small">
                                <ListAltOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Batch Completed">
                            <IconButton color="success" size="small">
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )
                    ) : (
                      false
                    )}

                    {AccessID == "TR074" ? (
                      params.row.parentID == "CC" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print ">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHCC.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR074" ? (
                      params.row.parentID == "PC" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHPROD.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR074" ? (
                      params.row.parentID == "PK" &&
                      params.row.Process == "Y" ? (
                        <Tooltip title="Print">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }BATCHPACK.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}
                    {AccessID == "TR155" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }openpurchaseorder.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR152" ? (
                      <Tooltip title="Print">
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }purchaseorder.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "CC" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHCC.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_013",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "PC" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHPROD.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_014",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {AccessID == "TR074" &&
                    params.row.parentID == "PK" &&
                    params.row.Process == "Y" ? (
                      <Tooltip title="Email">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            dispatch(
                              mailOpen({
                                row: params.row,
                                link: `${
                                  store.getState().globalurl.pdfurl
                                }BATCHPACK.php?Token=${params.row.Hashtoken}`,
                              })
                            );
                            dispatch(
                              getMail({
                                Templateid: "ET_015",
                                RecordID: params.row.RecordID,
                                UserName: "Trinity",
                              })
                            );
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                    {AccessID == "TR048" ? (
                      <Box>
                        <Link
                          to={`./EditIssue/${params.row.RecordID}/${params.row.MaterialDescription}/${params.row.ItemType}/${params.row.HeaderQty}/E`}
                        >
                          <Tooltip title="Issue">
                            <IconButton color="info" size="small">
                              <SummarizeOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        {/* <Link
                       to={`./EditIssue/${params.row.RecordID}/${params.row.MaterialDescription}/${params.row.ItemType}/${params.row.HeaderQty}/E`}
                     > */}
                        <Tooltip title="Alter Material">
                          {/* //here change */}
                          <IconButton
                            onClick={() =>
                              dispatch(
                                productionlookupOpen({
                                  materialRecID: params.row.MtlRecordID,
                                  productionCardID: params.row.PcdhRecordID,
                                })
                              )
                            }
                            color="info"
                            size="small"
                          >
                            <OpenInBrowserOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        {params.row.Colourflag == "Y" ? (
                          <Tooltip title="Alter Color">
                            {/* //here change */}
                            <IconButton
                              onClick={() =>
                                dispatch(
                                  productionColorlookupOpen({
                                    materialRecID: params.row.MtlRecordID,
                                  })
                                )
                              }
                              color="info"
                              size="small"
                            >
                              <OpenInBrowserOutlinedIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          false
                        )}
                        {/* </Link> */}
                      </Box>
                    ) : (
                      false
                    )}

                    {/* {AccessID == "TR048" ?
        
                    
                   params.row.Type =="M"?
                    <Tooltip title="Indent">
                    <IconButton color="info" size="small"  onClick={()=>dispatch(PurchaseIndent({RecordID:params.row.RecordID}))}>
                       <ReceiptLongIcon />
                    </IconButton>
                  </Tooltip>
                  :false

                 
                :false} */}
                    {/* INDENT ITEM --- PRODUCTION CARD */}
                    {AccessID == "TR118" ? (
                      <Link
                        to={`./${params.row.ChildID}/${params.row.ChildName}/PC/${params.row.RecordID}/${params.row.Type}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR119" ? (
                      <Tooltip title="Indent Order">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={indentOrderSave(
                            "insert",
                            indentRecID,
                            params.row.SupplierID,
                            params.row.parentID
                          )}
                        >
                          <ListAltOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {AccessID == "TR003" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR004/List%20of%20Materials/${params.row.RecordID}/${params.row.parentID}/${params.row.Name}/${params.row.SearchPhrase}/pm`}
                      >
                        <Tooltip title="Material">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR001" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR050/List of BOM/${params.row.RecordID}/${params.row.ProductDescription}/${params.row.Description}/all-bom/${params.row.parentID}`}
                      >
                        <Tooltip title="List of BOM">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {/* {AccessID == "TR079" ?
                     <Link to={`/Apps/Secondarylistview/TR080/Material Master/${params.row.RecordID}`}>
                     <Tooltip title="Material Master">
                       <IconButton color="info" size="small">
                         <ReceiptLongIcon />
                       </IconButton>
                     </Tooltip>
                 </Link>
                :false} */}
                    {AccessID == "TR001" ? (
                      <Link
                        to={`/Apps/TR069/Editproductstock/${params.row.RecordID}/${params.row.ModelCode}/${params.row.Description}/E`}
                      >
                        <Tooltip title="Stock">
                          <IconButton color="error" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR004" ? (
                      params.row.STKType != "S" ? (
                        <Link to={`./Editstock/${params.row.RecordID}/E`}>
                          <Tooltip title="Stock">
                            <IconButton color="info" size="small">
                              <ListAltOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : (
                        false
                      )
                    ) : (
                      false
                    )}

                    {AccessID == "TR002" ? (
                      <Link
                        to={`/Apps/Secondarylistview/${params.row.ChildID}/${params.row.ChildName}/${params.row.RecordID}/${params.row.Name}`}
                      >
                        <Tooltip title="Products">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR147" ? (
                      <Link
                        to={`/Apps/Secondarylistview/TR148/Job Work/${params.row.RecordID}/${params.row.Name}`}
                      >
                        <Tooltip title="Jobwork">
                          <IconButton color="info" size="small">
                            <ListAltOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR010" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E/${0}`}
                      >
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {AccessID == "TR010" ? (
                      <Link
                        to={`./Edit${screenName}/${params.row.RecordID}/E/${2}`}
                      >
                        <Tooltip title="Customer Products">
                          <IconButton color="info" size="small">
                            <WysiwygIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}
                    {AccessID == "TR010" ? (
                      <Link
                        to={`/Apps/TR400/Editcustomerlinechart/EditCustomer Line Chart/${params.row.RecordID}/E`}
                      >
                        <Tooltip title="Customer Analysis">
                          <IconButton color="info" size="small">
                            <AssessmentIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    ) : (
                      false
                    )}

                    {/* {AccessID == "TR011" ?
                   <Link to={`/Apps/product-analysis/${params.row.CustRecordID}/E`}>
                   <Tooltip title="Customer Analysis">
                     <IconButton color="info" size="small"  >
                       <AssessmentIcon />
                     </IconButton>title={ params.row.Process == "Y" ? 'INVOICE' : 'DARFT INVOICE'}
                   </Tooltip>
                 </Link>
                :false} */}
                    {params.row.InvType == "SI" &&
                    AccessID == "TR011" &&
                    params.row.Print == "Y" ? (
                      <Tooltip
                        title={
                          params.row.Process == "Y"
                            ? "INVOICE"
                            : "DARFT INVOICE"
                        }
                      >
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }sampleinvoice.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {params.row.InvType == "FI" &&
                    AccessID == "TR011" &&
                    params.row.parentID == "P" &&
                    params.row.Print == "Y" ? (
                      <Tooltip
                        title={
                          params.row.Process == "Y"
                            ? "INVOICE"
                            : "DARFT INVOICE"
                        }
                      >
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }finalreport.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}

                    {params.row.InvType == "FI" &&
                    AccessID == "TR011" &&
                    params.row.parentID == "L" &&
                    params.row.Print == "Y" ? (
                      <Tooltip
                        title={
                          params.row.Process == "Y"
                            ? "INVOICE"
                            : "DARFT INVOICE"
                        }
                      >
                        <IconButton
                          component="a"
                          href={`${
                            store.getState().globalurl.pdfurl
                          }leatherinvoice.php?Token=${params.row.Hashtoken}`}
                          target="_blank"
                          rel="noreferrer"
                          color="info"
                          size="small"
                        >
                          <PrintOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      false
                    )}
                    {params.row.InvType == "PI" &&
                    AccessID == "TR011" &&
                    params.row.parentID == "P" &&
                    params.row.Print == "Y" ? (
                      <>
                        <Tooltip
                          title={
                            params.row.Process == "Y"
                              ? "INVOICE"
                              : "DARFT INVOICE"
                          }
                        >
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }report.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Leather Consumption">
                          <IconButton
                            component="a"
                            href={`${
                              store.getState().globalurl.pdfurl
                            }leatherconsumption.php?Token=${
                              params.row.Hashtoken
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            color="info"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      false
                    )}

                    {params.row.ImgApp == "Y" ? (
                      AccessID == "TR002" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR009" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR010" ? (
                        <Link
                          to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR027" ? (
                        <Box>
                          <Link
                            to={`/Apps/${screenName}/imageupload/${AccessID}/${params.row.RecordID}`}
                            state={{ EmpName: params.row.Name }}
                          >
                            <Tooltip title="Image upload">
                              <IconButton color="info" size="small">
                                <AddPhotoAlternateIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </Box>
                      ) : AccessID == "TR003" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/EditMaterial Category/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR004" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/${params.row.Type}/${params.row.parentName}/${params.row.SearchPhrase}/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : AccessID == "TR001" ? (
                        <Link
                          to={`/Apps/Secondarylistview/${AccessID}/${screenName}/${params.row.parentID}/${params.row.ProductDescription}/imageupload/${params.row.RecordID}`}
                        >
                          <Tooltip title="Image upload">
                            <IconButton color="info" size="small">
                              <AddPhotoAlternateIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      ) : (
                        false
                      )
                    ) : (
                      ""
                    )}
                  </Stack>
                );
              },
            };
          }

          if (AccessID == "TR027") {
            const obj = {
              field: "Type",
              headerName: "Type",
              headerAlign: "center",
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              minWidth: 60,
              maxWidth: 60,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    <Link>
                      {params.row.EmpType === "Contracts In" && (
                        <Tooltip title="Contracts In">
                          <IconButton color="info">
                            <RedoIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Link>

                    <Link>
                      {params.row.EmpType === "Contracts Out" && (
                        <Tooltip title="Contracts Out">
                          <IconButton color="info">
                            <UndoIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Link>
                  </Stack>
                );
              },
            };
            listviewData.Data.columns.splice(2, 0, obj);
          }
          if (AccessID == "TR027") {
            const obj = {
              field: "emp",
              headerName: " ",
              headerAlign: "center",
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              minWidth: 40,
              maxWidth: 40,
              disableExport: true,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    <Link>
                      <Tooltip title="Employee">
                        <IconButton color="info">
                          <Person2Icon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </Stack>
                );
              },
            };
            listviewData.Data.columns.splice(2, 0, obj);
          }
          listviewData.Data.columns.push(obj);

          dispatch(
            Success({
              columndata: listviewData.Data.columns,
              rowdata: listviewData.Data.rows,
            })
          );
        } else {
          dispatch(Success({ columndata: [], rowdata: [] }));
        }
      })

      .catch((error) => {
        dispatch(errored(error.message));
      });
  };

const PrepareAction = ({ params, accessID, screenName, rights, AsmtType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const dispatch = useDispatch();
  const ScheduleCheck = () => {
    Swal.fire({
      title: "Questions Not Adequate",
      text: "Kindly create adequate no. of questions for this assessment",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

  //TR294
  const codeIcons = {
    SK: <Psychology />, // Skill Assessment
    AP: <CategoryOutlinedIcon />, // Appraisal
    CL: <GppMaybeOutlinedIcon />, // Compliance
    SV: <QuestionAnswerOutlinedIcon />, // Survey
    FB: <FeedbackOutlinedIcon />, // Feedback
  };
  const codeLabels = {
    SK: "Skill Assessment",
    AP: "Appraisal",
    CL: "Compliance",
    SV: "Survey",
    FB: "Feedback",
  };
  const AsmtAccessId = {
    SK: "TR300",
    AP: "TR295",
    CL: "TR296",
    SV: "TR297",
    FB: "TR298",
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* EDIT ICON */}
        {accessID !== "TR279" &&
          accessID !== "TR288" &&
          accessID !== "TR286" &&
          accessID !== "TR291" &&
          accessID !== "TR299" &&
          accessID !== "TR295" &&
          accessID !== "TR305" &&
          accessID !== "TR296" &&
          accessID !== "TR297" &&
          accessID !== "TR298" &&
          accessID !== "TR281" &&
          accessID !== "TR282" &&
          accessID !== "TR283" && (
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: { ...state },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        {(accessID === "TR283" || accessID === "TR291") && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                  state: {
                    ...state,
                    AssessmentType: params.row.AssessmentType,
                    DesignationID: params.row.DesignationID,
                  },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR295" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              // onClick={() =>
              //   navigate(`./EditListOfAppraisal/${params.row.RecordID}/E`, {
              //     state: {
              //       ...state,
              //       AssessmentType: params.row.AssessmentType,
              //       DesignationID: params.row.DesignationID,
              //     },
              //   })
              // }
              onClick={() =>
                navigate(`./EditListOfAppraisal/${params.row.RecordID}/E`, {
                  state: { ...state },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {accessID === "TR305" && (
          <Tooltip title="Appraisal Schedule">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./AppraisalScheduleEMP/${params.row.RecordID}`, {
                  state: { ...state, Designation: params.row.DesignationName },
                })
              }
            >
              <SendTimeExtensionOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR305" && (
          <Tooltip title="Schedule History">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./AppraisalScheduleListEMP/${params.row.RecordID}`, {
                  state: { ...state, Designation: params.row.DesignationName },
                })
              }
            >
              <HistoryToggleOffOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {accessID === "TR281" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(
                  `./EditListOfQuestionGroups/${params.row.RecordID}/E`,
                  {
                    state: { ...state },
                  }
                )
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR296" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./EditListOfCompliance/${params.row.RecordID}/E`, {
                  state: { ...state },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR297" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./EditListOfSurvey/${params.row.RecordID}/E`, {
                  state: { ...state },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR298" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./EditListOfFeedBack/${params.row.RecordID}/E`, {
                  state: { ...state },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {accessID === "TR282" && (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              size="small"
              onClick={() =>
                navigate(`./EditListOfQuestion/${params.row.RecordID}/E`, {
                  state: { ...state },
                })
              }
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* {accessID === "TR282" && (<Tooltip title="Edit">
          <IconButton
            color="info"
            size="small"
            onClick={() =>
              navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                state: { ...state,Answertype:params.row.Answertype },
              })
            }
          >
            <ModeEditOutlinedIcon />
          </IconButton>
        </Tooltip>)} */}

        {/* VIEW FOR SCHEDULE*/}
        {/* {accessID == "TR283" && (
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate(`./Edit${screenName}/${params.row.RecordID}/V`, {
                state: { ...state },
              })
            }
          >
            <Tooltip title="View">
              <Visibility />
            </Tooltip>
          </IconButton>
        )} */}
        {/* DELETE */}
        {accessID != "TR279" &&
          accessID !== "TR278" &&
          accessID !== "TR280" &&
          accessID !== "TR301" &&
          accessID !== "TR300" &&
          accessID !== "TR305" &&
          accessID !== "TR295" &&
          accessID !== "TR296" &&
          accessID !== "TR297" &&
          accessID !== "TR298" &&
          accessID !== "TR281" &&
          accessID !== "TR282" &&
          accessID !== "TR288" &&
          accessID !== "TR291" &&
          accessID !== "TR283" &&
          accessID !== "TR299" &&
          accessID !== "TR294" &&
          accessID !== "TR286" && (
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/D`, {
                    state: { ...state },
                  })
                }
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        {accessID == "TR278" && (
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate(
                `/Apps/Secondarylistview/skillglow/TR280/List Of Assessment/${params.row.RecordID}`,
                {
                  state: {
                    BreadCrumb1: params.row.Name,
                    AssessmentType: params.row.AssessmentType,
                  },
                }
              )
            }
          >
            <Tooltip title="Assessment">
              <Psychology />
            </Tooltip>
          </IconButton>
        )}

        {/* VIEW */}
        {accessID == "TR279" && (
          // <IconButton
          //   color="primary"
          //   size="small"
          //   onClick={() =>
          //     navigate(`./Edit${screenName}/${params.row.RecordID}/V`, {
          //       state: { ...state },
          //     })
          //   }
          // >
          //   <Tooltip title="View">
          //     <Visibility />
          //   </Tooltip>
          // </IconButton>

          <Tooltip
            title={
              ["Pdf", "Ppt"].includes(params.row.ContentType)
                ? "Download"
                : "Open Link"
            }
          >
            <IconButton
              color="info"
              size="small"
              onClick={async () => {
                if (["Pdf", "Ppt"].includes(params.row.ContentType)) {
                  const url = `${
                    store.getState().globalurl.baseUrl
                  }uploads/attachments/${params.row.AttachmentName}`;

                  try {
                    const response = await fetch(url);
                    const blob = await response.blob();

                    // Create temporary URL
                    const blobUrl = window.URL.createObjectURL(blob);

                    // Create link and click
                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = params.row.AttachmentName; // filename
                    document.body.appendChild(link);
                    link.click();

                    // Cleanup
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                  } catch (err) {
                    console.error("Download failed", err);
                  }
                } else {
                  // handle other action

                  window.open(params.row.Name, "_blank", "noopener,noreferrer");
                }
              }}
            >
              {["Pdf", "Ppt"].includes(params.row.ContentType) ? (
                <Download />
              ) : (
                <OpenInNewIcon />
              )}
            </IconButton>
          </Tooltip>
        )}

        {/* ASSESSMENT CATEGORY */}
        {accessID == "TR286" && (
          <IconButton
            color="primary"
            size="small"
            // onClick={() =>
            //     sessionStorage.setItem("RecordID", params.row.RecordID);
            //   navigate(
            //     `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.row.RecordID}`,
            //     {
            //       state: {
            //         BreadCrumb1: params.row.Name,
            //       },
            //     }
            //   )
            // }
            onClick={() => {
              sessionStorage.setItem("RecordID", params.row.RecordID);
              navigate(
                `/Apps/Secondarylistview/skillglow/TR288/List Of Assessment Category/${params.row.RecordID}`,
                {
                  state: {
                    BreadCrumb1: params.row.Name,
                  },
                }
              );
            }}
          >
            <Tooltip title="Assessment Category">
              <CategoryOutlinedIcon />
            </Tooltip>
          </IconButton>
        )}
        {accessID == "TR299" && (
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              navigate(
                `/Apps/Secondarylistview/skillglow/TR294/List Of Assessment Category/${params.row.Code}`,
                {
                  state: {
                    BreadCrumb1: params.row.Name,
                    SkillAssTypeID: params.row.RecordID,
                  },
                }
              );
            }}
          >
            <Tooltip title="Assessment Category">
              <CategoryOutlinedIcon />
            </Tooltip>
          </IconButton>
        )}
        {accessID === "TR294" && (
          <>
            {params.row.SkillAssTypeCode === "SK" && (
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  navigate(`./TR300/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.Name,
                      AssessmentType: params.row.AssessmentType,
                    },
                  });
                }}
              >
                <Tooltip title="Skill Assessment">
                  <Psychology />
                </Tooltip>
              </IconButton>
            )}

            {params.row.SkillAssTypeCode === "AP" && (
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  navigate(`./TR295/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.Name,
                      AssessmentType: params.row.AssessmentType,
                    },
                  });
                }}
              >
                <Tooltip title="Appraisal">
                  <CategoryOutlinedIcon />
                </Tooltip>
              </IconButton>
            )}

            {params.row.SkillAssTypeCode === "CL" && (
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  navigate(`./TR296/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.Name,
                      AssessmentType: params.row.AssessmentType,
                    },
                  });
                }}
              >
                <Tooltip title="Compliance">
                  <GppMaybeOutlinedIcon />
                </Tooltip>
              </IconButton>
            )}

            {params.row.SkillAssTypeCode === "SV" && (
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  navigate(`./TR297/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.Name,
                      AssessmentType: params.row.AssessmentType,
                    },
                  });
                }}
              >
                <Tooltip title="Survey">
                  <QuestionAnswerOutlinedIcon />
                </Tooltip>
              </IconButton>
            )}

            {params.row.SkillAssTypeCode === "FB" && (
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  navigate(`./TR298/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.Name,
                      AssessmentType: params.row.AssessmentType,
                    },
                  });
                }}
              >
                <Tooltip title="Feedback">
                  <FeedbackOutlinedIcon />
                </Tooltip>
              </IconButton>
            )}
          </>
        )}

        {/* {accessID === "TR294" && codeIcons[params.row.SkillAssTypeCode] && (
          <IconButton
            color="primary"
            size="small"
             onClick={() =>{
              const selectedAccessId = AsmtAccessId[params.row.SkillAssTypeCode]; // Dynamically get access ID

              navigate(
                `./${selectedAccessId}/${params.row.RecordID}`,
                {
                  state: {...state,

                    BreadCrumb2: params.row.Name,
                    AssessmentType: params.row.AssessmentType,
                  },
                }
              )
            }}
          >
            <Tooltip title={codeLabels[params.row.SkillAssTypeCode]}>
              {codeIcons[params.row.SkillAssTypeCode]}
            </Tooltip>
          </IconButton>
        )} */}

        {/* ASSESSMENT CATEGORY */}
        {/* {accessID == "TR288" && (
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate(`./TR283/${params.row.RecordID}`,
                 {
                state: {
                  ...state,
                  BreadCrumb2: params.row.Name,
                  AssessmentType: params.row.AssessmentType,
                  DesignationID: params.row.DesignationID,

                },
                
              })
            }
          >
            <Tooltip title="Schedule">
              <Psychology />
            </Tooltip>
          </IconButton>
        )} */}
        {accessID == "TR288" && (
          <Tooltip title="Schedule">
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                const targetRoute =
                  params.row.AssessmentType === "Appraisal"
                    ? `./${params.row.AssessmentType}/TR291/${params.row.RecordID}`
                    : `./${params.row.AssessmentType}/TR283/${params.row.RecordID}`;

                navigate(targetRoute, {
                  state: {
                    ...state,
                    BreadCrumb2: params.row.Name,
                    AssessmentType: params.row.AssessmentType,
                    DesignationID: params.row.DesignationID,
                  },
                });
              }}
            >
              <Psychology />
            </IconButton>
          </Tooltip>
        )}

        {(accessID == "TR280" ||
          accessID == "TR300" ||
          accessID == "TR295" ||
          accessID == "TR296" ||
          accessID == "TR297" ||
          accessID == "TR298") && (
          <IconButton
            color="primary"
            size="small"
            // onClick={() =>
            //   navigate(
            //     `/Apps/Secondarylistview/skillglow/TR281/List Of Question Groups/${params.row.SkillcategoriesID}/${params.row.RecordID}`,
            //     {
            //       state: { ...state, BreadCrumb3: params.row.Name },
            //     }
            //   )
            // }
            onClick={() =>
              navigate(`./TR281/${params.row.RecordID}`, {
                state: { ...state, BreadCrumb3: params.row.Name },
              })
            }
          >
            <Tooltip title="Question Groups">
              <Category />
            </Tooltip>
          </IconButton>
        )}

        {(accessID == "TR280" ||
          accessID == "TR300" ||
          accessID == "TR295" ||
          accessID == "TR296" ||
          accessID == "TR297" ||
          accessID == "TR298") && (
          <IconButton
            color="primary"
            size="small"
            // onClick={() =>
            //   navigate(
            //     `./TR279/${params.row.SkillcategoriesID}/${params.row.RecordID}`,
            //     {
            //       state: { ...state, BreadCrumb2: params.row.Name },
            //     }
            //   )
            // }
            onClick={() =>
              navigate(`./TR279/${params.row.RecordID}`, {
                state: { ...state, BreadCrumb3: params.row.Name },
              })
            }
          >
            <Tooltip title="Session">
              <AccessTimeOutlined />
            </Tooltip>
          </IconButton>
        )}
        {/* {(accessID == "TR300" || accessID == "TR295" || accessID == "TR296" || accessID == "TR297" || accessID == "TR298") && (
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate(
                `./TR301/${params.row.RecordID}/${params.row.DesignationID}`,
                {
                  state: {
                    ...state,
                    BreadCrumb3: params.row.Name,
                    Designation: params.row.Designation,

                  },
                }
              )
            }
          >
            <Tooltip title="Schedule">
              <SendTimeExtensionOutlinedIcon />
            </Tooltip>
          </IconButton>
        )} */}
        {(accessID == "TR300" ||
          accessID == "TR296" ||
          accessID == "TR297" ||
          accessID == "TR298") &&
          params.row.AssessmentStatus === "Ready to Assign" && (
            <IconButton
              color="primary"
              size="small"
              onClick={() =>
                navigate(
                  `./TR301/${params.row.RecordID}/${params.row.DesignationID}`,
                  {
                    state: {
                      ...state,
                      BreadCrumb3: params.row.Name,
                      Designation: params.row.Designation,
                    },
                  }
                )
              }
            >
              <Tooltip title="Schedule">
                <SendTimeExtensionOutlinedIcon />
              </Tooltip>
            </IconButton>
          )}
        {(accessID == "TR300" ||
          accessID == "TR296" ||
          accessID == "TR297" ||
          accessID == "TR298") &&
          params.row.AssessmentStatus === "Ready to Assign" && (
            <IconButton
              color="primary"
              size="small"
              onClick={() =>
                navigate(`./ScheduleListAssessment/${params.row.RecordID}`, {
                  state: {
                    ...state,
                    BreadCrumb3: params.row.Name,
                    Designation: params.row.Designation,
                  },
                })
              }
            >
              <Tooltip title="Schedule History">
                <HistoryToggleOffOutlinedIcon />
              </Tooltip>
            </IconButton>
          )}
        {/* {accessID === "TR280" &&
          (params.row.AssessmentStatus === "Completed" ? (
            <IconButton color="secondary" size="small">
              <Tooltip title="Ready for schedule">
                <DoneOutlineOutlinedIcon />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton 
            color="error" 
            size="small"
            onClick={() => ScheduleCheck()}
            >
              <Tooltip title="Cannot Schedule">
                <AdjustOutlinedIcon />
              </Tooltip>
            </IconButton>
          ))} */}
        {accessID == "TR281" && (
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              navigate(`./TR282/${params.row.RecordID}`, {
                state: {
                  ...state,
                  BreadCrumb4: params.row.Name,
                  AnswerType: params.row.HiddenAnswerType,
                },
              })
            }
          >
            <Tooltip title="Question">
              <QuizIcon />
            </Tooltip>
          </IconButton>
        )}
      </div>
    </Fragment>
  );
};

const ItemAction = ({ params, accessID, screenName, rights, AsmtType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const dispatch = useDispatch();
  const UserName = sessionStorage.getItem("UserName");

  const count = Number(params.row.MarketingCount || 0);
  // const orderType = params.row.OrderType;
  const id = params.row.RecordID;

  const PartyName = params.row.Name;

  const PDFButton = ({ PartyID, OrderHdrID, CompanyID,OrderType }) => {
    const dispatch = store.dispatch;
    const [loading, setLoading] = React.useState(false);

    const handlePDFGET = async () => {
      try {
        setLoading(true);

        const resultAction = await dispatch(
          getOrderdetailReport({ PartyID, OrderHdrID, CompanyID })
        );

        const data = resultAction.payload; // <-- this depends on how your thunk is defined
        if (!data?.HeaderData?.DetailData?.length) {
          alert("No Order Items available for this order..");
          return;
        }

        // Generate and download PDF
        const blob = await pdf(
          <OrderHeaderPdf data={data} UserName={UserName} OrderType={OrderType}/>
        ).toBlob();
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // //link.download = "OrderDeatils.pdf";
        // link.Open();
        // link.click();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      } catch (err) {
        console.error("PDF generation failed", err);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Tooltip title="Download PDF">
        <IconButton color="info" size="small" onClick={handlePDFGET}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <PictureAsPdfIcon color="error" />
          )}
        </IconButton>
      </Tooltip>
    );
  };
  const handleConvert = async (row) => {
    const result = await Swal.fire({
      title: "Convert Quotation to Order?",
      text: "Do you want convert this Quotation to Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    // ❌ If user clicks NO / Cancel → stop here
    if (!result.isConfirmed) return;
    const filtertype =
      Number(row.LeaderID) > 0 ? row.LeaderID : row.PartyRecordID;

    const Type = Number(row.LeaderID) > 0 ? "Leader" : "Party";

    const action = "update";

    const idata = {
      RecordID: row.RecordID,
      Code: row.Code || "",

      LeaderID: row.LeaderID || 0,
      PartyRecordID: row.PartyRecordID || 0,
      EmployeeRecordID: row.EmployeeRecordID || 0,

      PartyName: row.PartyName || "",
      OrderDate: row.FilterOrderDate || "",
      DeliveryCharges: row.DeliveryCharges || 0,
      TotalPrice: row.TotalPrice || 0,
      TentativeDeliveryDate: row.TentativeDeliveryDate || "",
      DeliveryBy: row.DeliveryBy || "",
      DeliveryYesorNo: row.DeliveryYesorNo || "N",
      ProcessDate: row.processdate || "",

      PaidYesorNo: row.PaidYesorNo || "No",
      PaidDate: row.PaidDate || "",
      DeliveryDate: row.DeliveryDate || "",
      PaidAmount: row.PaidAmount || 0,

      PaymentMode: row.PaymentMode || "",
      ReceiverName: row.ReceiverName || "",
      ReceiverMobileNumber: row.ReceiverMobileNumber || "",
      DeliveryComments: row.DeliveryComments || "",
      PaidComments: row.PaidComments || "",

      CompanyID: row.CompanyID,

      OrderType: "O",
      ORStatus: "Process",
    };

    const response = await dispatch(
      postData({ accessID: "TR310", action, idata })
    );

    if (response.payload.Status === "Y") {
      // 🔑 parse message if needed
      let msg = "Converted to Order successfully";
      if (response.payload.Result) {
        try {
          msg = JSON.parse(response.payload.Result)?.Msg || msg;
        } catch {}
      }

      toast.success(msg);

      navigate(`/Apps/Secondarylistview/TR310/Order/${filtertype}/${Type}/O`, {
        state: {
          ...state,
          PartyID: row.PartyRecordID,
          PartyName: row.PartyName,
          Code: row.Code,
        },
      });
    } else {
      toast.error("Conversion failed");
    }
  };

  const ScheduleCheck = () => {
    Swal.fire({
      title: "Questions Not Adequate",
      text: "Kindly create adequate no. of questions for this assessment",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {accessID === "TR315" && (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: {
                      ...state,
                      BreadCrumb1: params.row.ItemGroup,
                    },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Item Category">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(
                    `/Apps/SecondarylistView/Item Group/TR318/ItemCategory/${params.row.CompanyID}/${params.row.RecordID}`,
                    {
                      state: {
                        ...state,
                        BreadCrumb1: params.row.ItemGroup,
                      },
                    }
                  )
                }
              >
                <CategoryOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {accessID === "TR316" && (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: {
                      ...state,
                      BreadCrumb1: params.row.HSNCategory,
                    },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="HSN Master">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(
                    `/Apps/Secondarylistview/HSN/TR317/HSNMaster/${params.row.CompanyID}/${params.row.RecordID}`,
                    {
                      state: {
                        ...state,
                        BreadCrumb1: params.row.HSNCategory,
                      },
                    }
                  )
                }
              >
                <QrCodeScannerOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        {accessID === "TR317" && (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.HSNMaster,
                    },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {accessID === "TR318" && (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.ItemCategory,
                    },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Item">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  // navigate(`/Apps/ItemGroup/ItemCategory/Items`, {
                  navigate(`./TR319/${params.row.RecordID}`, {
                    state: {
                      ...state,
                      BreadCrumb2: params.row.ItemCategory,
                    },
                  })
                }
              >
                <InventoryOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        {accessID === "TR319" && (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="info"
                size="small"
                onClick={() =>
                  navigate(`./Edit${screenName}/${params.row.RecordID}/E`, {
                    state: {
                      ...state,
                      BreadCrumb3: params.row.Description,
                      ItemCode: params.row.Code,
                    },
                  })
                }
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        {accessID === "TR310" && (
          <Box>
            {/* Edit Button */}
            <Link
              to={`./Edit${screenName}/${params.row.RecordID}/E`}
              state={{
                PartyName: params.row.PartyName,
                Count: params.row.MarketingCount,
                LeadTitle: params.row.LeadTitle,
                PartyID: params.row.PartyRecordID,
                Code: params.row.Code,
              }}
            >
              <Tooltip title="Edit">
                <IconButton color="info" size="small">
                  <ModeEditOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            {/* CONVERT TO ORDER */}
            {params.row.OrderType === "Q" && (
              <Tooltip title="Convert To Order">
                <IconButton
                  color="info"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConvert(params.row)}}
                >
                  <CurrencyExchangeOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Leader Button */}
            <Link
              // to={`/Apps/Secondarylistview/TR310/Order/${id}/EditOrderitem/-1/E`}
              to={
                params.row.OrderItemsCount >= 1
                  ? `./TR311/${id}`
                  : `./TR311/${id}/EditOrderitem/-1/A`
              }
              state={{
                PartyName: params.row.PartyName,
                Count: params.row.MarketingCount,
                Code: params.row.Code,
                LeadTitle: params.row.LeadTitle,
                PartyID: params.row.PartyRecordID,
              }}
              // /Secondarylistview/:accessID/:screenName/:filtertype/EditOrderitem/:id/:Mode
            >
              <Tooltip title="Order Item">
                <IconButton
                  color="info"
                  size="small"
                  // onClick={() =>
                  //   handleorderitemscreen(row.RecordID, row.PartyID, row.LeadTitle, row.PartyName, row.LEStatus)
                  // }
                >
                  <GridViewIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link
              state={{
                PartyName: params.row.PartyName,
                Count: params.row.MarketingCount,
                LeadTitle: params.row.LeadTitle,
                PartyID: params.row.PartyRecordID,
                Code: params.row.Code,
              }}
            >
              <PDFButton
                PartyID={params.row.PartyRecordID}
                OrderHdrID={params.row.RecordID}
                CompanyID={params.row.CompanyID}
                OrderType={params.row.OrderType}
              />
            </Link>
          </Box>
        )}
      </div>
    </Fragment>
  );
};
