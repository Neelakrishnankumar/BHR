import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  Tooltip,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import store from "../..";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PayslipPdf from "../../apps/pages/pdf/PaySlipPdf";
import { pdf } from "@react-pdf/renderer";

import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingTwoToneIcon from "@mui/icons-material/PendingTwoTone";
import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import workinProgress from "../../assets/img/wip.png";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { paySlipGet } from "./Formapireducer";
import { getConfig } from "../../config";

const initialState = {
  explorerowData: [],
  explorecolumnData: [],
  loading: false,
  error: "",
  clickeddata: "",
  popupOpen: false,
  Data: {},
  exploreRowDataID: [],
  exploreColumnDataID: [],
  isLookupOpen: false,
};

export const userGroupExplore = createAsyncThunk(
  "explore/listview",
  async ({ CompanyID, UsergroupID }) => {
    var url = store.getState().globalurl.userGroupUrl;
    var data = { CompanyID, UsergroupID };
    console.log("get" + JSON.stringify(data));
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response,
    );
    return response.data;
  },
);

export const getFetchUserData = createAsyncThunk(
  "allScreen/Header",
  async ({ accessID, get, recID }) => {
    var url = store.getState().globalurl.apiUrl;
    var data = {
      accessid: accessID,
      action: get,
      recid: recID,
    };

    console.log(
      "🚀 ~ file: Formapireducer.js:225 ~ data:",
      JSON.stringify(data),
    );

    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response,
    );
    return response.data;
  },
);

export const packingListView = createAsyncThunk(
  "packing/detail",
  async ({ accessID, screenName, filter, any, CompID }) => {
    var url = store.getState().globalurl.listViewurl;
    var idata = {
      Query: {
        AccessID: accessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        CompId: CompID,
      },
    };

    console.log(
      "🚀 ~ file: Formapireducer.js:225 ~ data:",
      JSON.stringify(idata),
    );
    idata = JSON.stringify(idata);
    const response = await axios.get(url, {
      params: {
        data: idata,
      },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
      },
    });
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response,
    );
    return response.data;
  },
);

//WEEKLY_TEACHER_CALENDAR
export const weeklyTeachercalendarGet = createAsyncThunk(
  "TimeTable/TeacherCal",
  async ({ EmployeeID, TermsID, CompanyID }, { rejectWithValue }) => {
    try {
      const url = store.getState().globalurl.WeeklyTeachercalendarGet;
      const requestBody = {
        EmployeeID: EmployeeID,
        TermsID: TermsID,
        CompanyID: CompanyID,
      };

      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });

      console.log("✅ weeklyTeachercaledarGet API Response:", response.data);

      return response.data;
    } catch (error) {
      console.log("❌ API Error:", error.response?.data || error.message);

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);
export const weeklyclasscaledarGet = createAsyncThunk(
  "TimeTable/classCal",
  async ({ projectID, milestonesID, TermsID, CompanyID, SlotGroupID }, { rejectWithValue }) => {
    try {
      const url = store.getState().globalurl.WeeklycaledarUrl;
      const requestBody = {
        milestonesID: milestonesID,
        projectID: projectID,
        TermsID: TermsID,
        CompanyID: CompanyID,
        SlotGroupID: SlotGroupID
      };

      console.log("🚀 Sending Body:", requestBody);

      const response = await axios.post(
        url,
        requestBody,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
          },
        }
      );

      console.log("✅ API Response:", response.data);

      return response.data;

    } catch (error) {
      console.log("❌ API Error:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const slotListView = createAsyncThunk(
  "slot/Companydetail",
  async ({ accessID, screenName, filter, any, VerticalLicense }) => {
    var url = store.getState().globalurl.listViewurl;
    var idata = {
      Query: {
        AccessID: accessID,
        ScreenName: screenName,
        Filter: filter,
        Any: any,
        VerticalLicense: VerticalLicense
        // CompId:CompID
      },
    };


    console.log("🚀 ~ file: Formapireducer.js:225 ~ data:", JSON.stringify(idata))
    idata = JSON.stringify(idata);
    const response = await axios
      .get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      })
    console.log(
      "🚀 ~ file: newFormApiReducer.js:27 ~ fetchData ~ response:",
      response
    );
    return response.data;
  }
);

export const getApiSlice = createSlice({
  name: "exploreApi",
  initialState,
  reducers: {
    lookupOpen(state, action) {
      state.isLookupOpen = !state.isLookupOpen;
    },
    userGroupRowUpdate(state, action) {
      state.explorerowData = action.payload.rowData;
    },
    packingRowUpdate(state, action) {
      console.log(
        "🚀 ~ file: Explorelitviewapireducer.js:96 ~ packingRowUpdate ~ action:",
        action,
      );
      switch (action.payload.type) {
        case "INSERTED":
          state.exploreRowDataID.push(...action.payload.data);
          break;
        case "EDITED":
          state.exploreRowDataID = action.payload.data;
          break;
        case "RESET":
          state.exploreRowDataID = action.payload.data;
          break;
      }
    },
    addtionalQtyCal(state, action) {
      console.log(
        "🚀 ~ file: Explorelitviewapireducer.js:138 ~ addtionalQtyCal ~ action:",
        action,
      );

      // for(let row of action.payload.listviewData){
      //   console.log("🚀 ~ file: Explorelitviewapireducer.js:142 ~ addtionalQtyCal ~ row:", row)

      //   return{
      //     ...row,
      //     RequiredQty:"hai"
      //   }
      // }
      const newArr = action.payload.listviewData.map((row) => {
        return {
          ...row,
          RequiredQty:
            Number(row.RequiredQty) +
            Number(action.payload.values.AdditionalQty) * Number(row.BomQty),
        };
      });

      state.explorerowData = newArr;
    },
    pending(state) {
      return {
        ...state,
        loading: true,
        explorerowData: [],
        explorecolumnData: [],
        error: false,
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
      if (action.payload.screen == "batch") {
        return {
          ...state,
          loading: false,
          error: "",
          explorerowData: action.payload.rowDataBatch,
          // explorecolumnData: action.payload.columndata,
          // clickeddata:action.payload.currentRow,
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "",
          explorerowData: action.payload.rowdata,
          explorecolumnData: action.payload.columndata,
          // clickeddata:action.payload.currentRow,
        };
      }
    },
    openPopup: (state, action) => {
      state.popupOpen = action.payload.isOpen;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userGroupExplore.pending, (state, action) => {
        state.explorerowData = [];
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(userGroupExplore.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.explorerowData = action.payload.Data;

        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(userGroupExplore.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(packingListView.pending, (state, action) => {
        state.exploreColumnDataID = [];
        state.exploreRowDataID = [];
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(packingListView.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.exploreColumnDataID = action.payload.Data.columns;
        state.exploreRowDataID = action.payload.Data.rows;
      })
      .addCase(packingListView.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
      .addCase(getFetchUserData.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
        state.Data = {};
        state.explorerowData = [];
      })
      .addCase(getFetchUserData.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        state.Data = action.payload.Data;

        if (action.payload.Data.Groupaccess) {
          state.explorerowData = action.payload.Data.Groupaccess;
        }

        // state.explorecolumnData= action.payload.columndata
      })
      .addCase(getFetchUserData.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })

      .addCase(weeklyTeachercalendarGet.pending, (state) => {
        state.Status = "loading";
        state.loading = true;
        state.Data = {};
        state.explorerowData = [];
        state.explorecolumnData = [];
      })

      .addCase(weeklyTeachercalendarGet.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        const data = action.payload;

        // ✅ Save raw response
        state.Data = data;

        // ✅ Create dynamic columns
        state.explorecolumnData = [
          {
            field: "day",
            headerName: "Days",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          ...data.timeSlots.map((slot) => ({
            field: slot,
            headerName: slot,
            flex: 1,
            headerAlign: "center",
            align: "center",
          })),
        ];

        // ✅ Create dynamic rows
        state.explorerowData = data.schedule.map((item, index) => ({
          id: index + 1,
          day: item.day,
          ...item.slots,
        }));
      })

      .addCase(weeklyTeachercalendarGet.rejected, (state) => {
        state.Status = "error";
        state.loading = false;
      })


      .addCase(weeklyclasscaledarGet.pending, (state) => {
        state.Status = "loading";
        state.loading = true;
        state.Data = {};
        state.explorerowData = [];
        state.explorecolumnData = [];
      })

      .addCase(weeklyclasscaledarGet.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;

        const data = action.payload;

        // ✅ Save raw response
        state.Data = data;

        // ✅ Create dynamic columns
        state.explorecolumnData = [
          {
            field: "day",
            headerName: "Days",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          ...data.timeSlots.map((slot) => ({
            field: slot,
            headerName: slot,
            flex: 1,
            headerAlign: "center",
            align: "center",
          })),
        ];

        // ✅ Create dynamic rows
        state.explorerowData = data.schedule.map((item, index) => ({
          id: index + 1,
          day: item.day,
          ...item.slots,
        }));
      })

      .addCase(weeklyclasscaledarGet.rejected, (state) => {
        state.Status = "error";
        state.loading = false;
      })

      //SLOT ADDCAE IN COMPANY EXPLORE
      .addCase(slotListView.pending, (state, action) => {
        state.slotcolumnData = []
        state.slotRowData = []
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(slotListView.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
        state.slotcolumnData = action.payload.Data.columns
        state.slotRowData = action.payload.Data.rows

      })
      .addCase(slotListView.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
      })
  },
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,
  packingRowUpdate,
  Success,
  openPopup,
  addtionalQtyCal,
  userGroupRowUpdate,
  lookupOpen,
} = getApiSlice.actions;

export default getApiSlice.reducer;

export const fetchExplorelitview =
  (AccessID, VerticalLicense, screenName, filter, any) =>
    async (dispatch, getState) => {
      console.log("🚀 ~ file: Explorelitviewapireducer.js:209 ~ filter:", filter);
      // const navigate = useNavigate();
      var url = store.getState().globalurl.listViewurl;

      const HeaderImg = sessionStorage.getItem("CompanyHeader");
      const FooterImg = sessionStorage.getItem("CompanyFooter");
      const CompanySignature = sessionStorage.getItem("CompanySignature");
      console.log(
        " ~ Payroll ConfigurationPayroll attendance ~ CompanySignature:",
        CompanySignature,
      );
      console.log("HeaderImg", HeaderImg, FooterImg);
      const config = getConfig();
      const baseurlUAAM = config.UAAM_URL;

      const PayslipBtn = ({ CompanyID, EmployeeID, Finyear, Month }) => {
        const dispatch = store.dispatch;
        const [payloading, setPayLoading] = React.useState(false);

        const handlePayPDFGET = async () => {
          try {
            setPayLoading(true);
            const payslip = {
              Month: Month,
              Finyear: Finyear,
              EmployeeID: EmployeeID,
              CompanyID: CompanyID,
            };

            const resultAction = await dispatch(paySlipGet(payslip));

            const data = resultAction.payload.data; // <-- this depends on how your thunk is defined
            if (!data) {
              alert("No data available for PDF");
              return;
            }
            if (!resultAction.payload) {
              console.error("No payload returned");
              return;
            }
            // Generate and download PDF
            const blob = await pdf(
              <PayslipPdf
                data={data}
                filters={{
                  Imageurl: baseurlUAAM,
                  HeaderImg: HeaderImg,
                  FooterImg: FooterImg,
                  CompanySignature: CompanySignature,
                }}
              />,
            ).toBlob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "Payslip.pdf";
            document.body.appendChild(link); // ✅ Important
            link.click();
            document.body.removeChild(link); // ✅ Cleanup
            URL.revokeObjectURL(blobUrl); // ✅ Cleanup
          } catch (err) {
            console.error("PDF generation failed", err);
          } finally {
            setPayLoading(false);
          }
        };

        return (
          <Tooltip title="Download Payslip PDF">
            <IconButton color="info" size="small" onClick={handlePayPDFGET}>
              {payloading ? (
                <CircularProgress size={20} />
              ) : (
                <PictureAsPdfIcon color="error" />
              )}
            </IconButton>
          </Tooltip>
        );
      };

      if (
        filter != "" &&
        AccessID !== "TR212" &&
        AccessID !== "TR309" &&
        AccessID !== "TR325" &&
        AccessID !== "TR302" &&
        AccessID !== "TR249" &&
        AccessID !== "2151" &&
        AccessID !== "2152" &&
        AccessID !== "2153" &&
        AccessID !== "TR350" &&
        AccessID !== "TR210" &&
        AccessID !== "TR363" &&
        AccessID !== "TR362" &&
        AccessID !== "TR364" &&
        AccessID !== "TR219" &&
        AccessID !== "TR086" &&
        AccessID !== "TR242" &&
        AccessID !== "TR237" &&
        AccessID !== "TR208" &&
        AccessID !== "TR160" &&
        AccessID !== "TR266" &&
        AccessID !== "TR216" &&
        AccessID !== "TR146" &&
        AccessID !== "TR019" &&
        AccessID !== "TR017" &&
        AccessID !== "TR088" &&
        AccessID !== "TR016" &&
        AccessID !== "TR125" &&
        AccessID !== "TR244" &&
        AccessID !== "TR369" &&
        AccessID !== "TR126" &&
        AccessID !== "TR130" &&
        AccessID !== "TR131" &&
        AccessID !== "TR139" &&
        AccessID !== "TR367" &&
        AccessID !== "TR038" &&
        // AccessID !== "TR321" &&
        AccessID !== "TR326"
      ) {
        filter = "parentID=" + filter;
      }
      if (AccessID == "TR017" || AccessID == "TR088" || AccessID == "TR367" || AccessID == "TR038" || AccessID == "TR321" || AccessID == "TR326") {
        filter = filter;
      }
      // if (AccessID == "TR019") { TR208
      //   filter = "MtlRecordID=" + filter;

      // }
      // const EMPID = sessionStorage.getItem("EmpId");
      // if((AccessID == "TR216")||(AccessID == "TR208")){
      //   filter = "EmployeeID=" + filter;
      //   // filter = ` EmployeeID=${EMPID}`;
      // }
      // if(AccessID == "TR208"){
      //   // filter = "EmployeeID=" + filter;
      //   filter = ` EmployeeID=${EMPID}`;
      // }

      const CompId = sessionStorage.getItem("compID");
      var idata = {
        Query: {
          AccessID: AccessID,
          VerticalLicense: VerticalLicense,
          ScreenName: screenName,
          Filter: filter,
          Any: any,
          CompId,
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
          console.log("without authorization---" + JSON.stringify(response.data));
          var exploreData = response.data;

          if (exploreData.Status == "Y") {
            if (AccessID != "TR077") {
              if (AccessID == "TR075") {
                // exploreData.
                var obj = {};
                var currentRow = "";
                obj = {
                  field: "lookup",
                  headerName: "",
                  width: 80,
                  align: "center",
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    return (
                      <Stack direction="row">
                        <Tooltip title="Leather">
                          <IconButton
                            onClick={() => dispatch(lookupOpen())}
                            color="info"
                            size="small"
                          >
                            <OpenInBrowserOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    );
                  },
                };

                exploreData.Data.columns.push(obj);
              }

              if (AccessID == "TR017") {
                // exploreData.
                var obj = {};
                var currentRow = "";
                obj = {
                  field: "print",
                  headerName: "",
                  width: 80,
                  align: "center",
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    return (
                      <div>
                        <Tooltip title="All BOM">
                          <IconButton
                            component="a"
                            href={`${store.getState().globalurl.pdfurl
                              }Internalorder.php?Token=${params.row.Hashtoken}`}
                            target="_blank"
                            rel="noreferrer"
                            color=""
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Internal Order">
                          <IconButton
                            component="a"
                            href={`${store.getState().globalurl.pdfurl
                              }Invoiceinternalorder.php?Token=${params.row.Hashtoken
                              }`}
                            target="_blank"
                            rel="noreferrer"
                            color="primary"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    );
                  },
                };

                exploreData.Data.columns.push(obj);
              }

              if (AccessID == "TR075") {
                // exploreData.
                var obj = {};
                var currentRow = "";
                obj = {
                  field: "action",
                  headerName: "",
                  width: 80,
                  align: "center",
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    return (
                      <Stack direction="row">
                        {params.row.Pstype == "CC" ? (
                          <Tooltip title="Edit">
                            <IconButton color="info" size="small">
                              <ModeEditOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          false
                        )}
                      </Stack>
                    );
                  },
                };

                exploreData.Data.columns.push(obj);
              }

              if (AccessID == "TR362" || AccessID === "TR364") {
                var obj = {};
                var currentRow = "";

                obj = {
                  field: "action",
                  headerName: "Action",
                  width: 70,
                  align: "center",
                  headerAlign: "center",
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    return (
                      <Stack direction="row">
                        <Tooltip title="Open Document">
                          <IconButton
                            component="a"
                            onClick={() => {
                              if (!params.row.Attachments) {
                                toast.error("No Document Avaliable!");
                                return;
                              }
                              const fileUrl = `${store.getState().globalurl.attachmentUrl}/${params.row.Attachments}`;

                              // 👇 Detect file type
                              const lower = fileUrl.toLowerCase();

                              let viewUrl = fileUrl;

                              // 👉 For DOC/DOCX use Office Online Viewer
                              if (
                                lower.endsWith(".doc") ||
                                lower.endsWith(".docx")
                              ) {
                                viewUrl =
                                  "https://view.officeapps.live.com/op/view.aspx?src=" +
                                  encodeURIComponent(fileUrl);
                              }

                              // 👉 Open in new tab
                              window.open(
                                viewUrl,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }}
                            color="primary"
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    );
                  },
                };

                exploreData.Data.columns.push(obj);
              } else {
                var obj = {};
                var currentRow = "";
                obj = {
                  field: "action",
                  headerName: "",
                  width: 50,
                  align: "center",
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    const fnedit = () => {
                      currentRow = params.row;
                      console.log(JSON.stringify(currentRow));
                    };
                    //  const fnfetch=(currentRow)=>{

                    //  }

                    return (
                      <Stack direction="row" spacing={4}>
                        <Tooltip title="Edit">
                          <IconButton color="info" size="small">
                            <ModeEditOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    );
                  },
                };
                exploreData.Data.columns.splice(2, 0, obj);

                if (AccessID == "TR012") {
                  var obj1 = {};

                  obj1 = {
                    field: "wip",
                    headerName: "",
                    width: 120,
                    sortable: false,
                    disableColumnMenu: true,
                    renderCell: (params) => {
                      return (
                        <Stack direction="row" spacing={4}>
                          {params.row.BatchStatus == "1" ? (
                            params.row.BatchCompleted == "N" ? (
                              <React.Fragment>
                                <Link
                                  to={`./Editworkinprocess/${params.row.PrdRecordID}/${params.row.parentID}/${params.row.BhRecordID}/${params.row.ProductionCardRecordID}/E`}
                                >
                                  <Tooltip title="Work Inprogress">
                                    <IconButton color="info" size="small">
                                      <PendingTwoToneIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                                <Link to={`./Timeline/${params.row.RecordID}`}>
                                  <Tooltip title="Timeline">
                                    <IconButton color="info" size="small">
                                      <TimelineIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <Link
                                  to={`./Editworkinprocess/${params.row.PrdRecordID}/${params.row.parentID}/${params.row.BhRecordID}/${params.row.ProductionCardRecordID}/E`}
                                >
                                  <Tooltip title="Batch Completed">
                                    <IconButton color="success" size="small">
                                      <CheckCircleOutlineIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>

                                <Link to={`./Timeline/${params.row.RecordID}`}>
                                  <Tooltip title="Timeline">
                                    <IconButton color="info" size="small">
                                      <TimelineIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </React.Fragment>
                            )
                          ) : (
                            false
                          )}
                        </Stack>
                      );
                    },
                  };
                  exploreData.Data.columns.push(obj1);
                }
              }

              if (AccessID == "TR367") {
                exploreData.Data.columns = exploreData.Data.columns.filter(
                  (col) => col.field !== "action",
                );
                var obj = {};
                obj = {
                  field: "action",
                  headerName: "",
                  width: 50,
                  align: "center",
                  sortable: false,
                  disableColumnMenu: true,

                  renderCell: (params) => {
                    return (
                      <Stack direction="row">
                        {params.row.Process === "P" ? (
                          <PayslipBtn
                            CompanyID={params.row.CompanyID}
                            EmployeeID={params.row.EmployeeID}
                            Finyear={params.row.Year}
                            Month={params.row.Month}
                          />
                        ) : (
                          <Tooltip title="Payslip Process pending">
                            <IconButton
                              color="error"
                              size="small"
                              sx={{ opacity: 0.5 }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    );
                  },
                };
                // exploreData.Data.columns.splice(2, 0, obj);
                // exploreData.Data.columns.push(obj);
                exploreData.Data.columns.splice(15, 0, obj);
              }
            } else {
              if (AccessID == "TR077") {
                var object2 = {};

                object2 = {
                  field: "status",
                  headerName: "",
                  headerAlign: "center",
                  width: 70,
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: (params) => {
                    return (
                      <Stack direction="row" spacing={4}>
                        {params.row.Quantity == params.row.completedQty ? (
                          <Link
                            to={`/Apps/Secondarylistview/TR074/BATCHS/${params.row.Type}/Editbatchissue/${params.row.RecordID}/E/N`}
                          >
                            <Tooltip title="Batch">
                              <IconButton color="info" size="small">
                                <ReceiptLongIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        ) : (
                          <Link
                            to={`/Apps/Secondarylistview/TR074/BATCHS/${params.row.Type}/Editbatchissue/${params.row.RecordID}/E`}
                          >
                            <Tooltip title="Batch">
                              <IconButton color="info" size="small">
                                <ReceiptLongIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        )}
                      </Stack>
                    );
                  },
                };
                exploreData.Data.columns.splice(4, 0, object2);
              }
            }
            dispatch(
              Success({
                columndata: exploreData.Data.columns,
                rowdata: exploreData.Data.rows,

                //FOR USER ACTIVITY LOG
                accessID: AccessID, // ← from Query.AccessID
                screenName: screenName, // optional but useful
                action: "get", // optional (for audit clarity)
              }),
            );
          } else {
            dispatch(
              Success({
                columndata: [],
                rowdata: [],
                accessID: AccessID,
                screenName: screenName,
                action: "get",
              }),
            );
          }
        })

        .catch((error) => {
          dispatch(errored(error.message));
        });
    };
