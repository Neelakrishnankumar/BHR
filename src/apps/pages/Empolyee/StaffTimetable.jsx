// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import axios from "axios";
// import { useState, useEffect, useRef } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   List,
//   ListItem,
//   IconButton,
//   ListItemText,
//   CircularProgress,
//   Card,
//   CardContent,
//   Divider,
//   Typography,
//   Skeleton,
//   Box,
//   Tooltip,
//   Paper,
//   useTheme,
//   TextField,
// } from "@mui/material";

import { Typography } from "@mui/material";

// import {
//   GridActionsCellItem,
//   DataGrid,
//   GridRowModes,
//   GridToolbarContainer,
//   GridRowEditStopReasons,
// } from "@mui/x-data-grid";
// import "./Calendar.css";
// import CloseIcon from "@mui/icons-material/Close";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import { useProSidebar } from "react-pro-sidebar";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import {
//   CalendarpostData,
//   DashcalpostData,
// } from "../../store/reducers/Formapireducer";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import {
//   CheckinAutocomplete,
//   Employeeautocomplete,
// } from "../../ui-components/global/Autocomplete";
// import { tokens } from "../../Theme";
// import {
//   weeklyclasscaledarGet,
//   weeklyTeachercaledarGet,
// } from "../../store/reducers/Explorelitviewapireducer";
// const StaffTimetable = () => {
//   const calendarRef = useRef(null);
//   const calendarInstanceRef = useRef(null);
//   const [eventsData, setEventsData] = useState([]);
//   const [DialogData, setDialogData] = useState([]);
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const [clickedDate, setClickedDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isTodayDialog, setIsTodayDialog] = useState(false);
//   const [taskData, setTaskData] = useState([]);
//   const [taskLoading, setTaskLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const EMPID = sessionStorage.getItem("EmpId");
//   const [currentDayTasks, setCurrentDayTasks] = useState([]);
//   const [yesterdayTasks, setYesterdayTasks] = useState([]);
//   const [backlogTasks, setBacklogTasks] = useState([]);
//   const [blockedTasks, setBlockedTasks] = useState([]);

//   const [activeTab, setActiveTab] = useState("todo"); // or 'approved'
//   const [notApprovedTasks, setNotApprovedTasks] = useState([]);
//   const [isToday, setIsToday] = useState(false);
//   const isManager = sessionStorage.getItem("isManager");
//   const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
//   const is003Subscription = SubscriptionCode.endsWith("003");
//   const sliceSubscriptionCode = SubscriptionCode.slice(-3);

//   const calendardata = useSelector((state) => state.formApi.calendardata);
//   const calenderEmpRecordID = useSelector(
//     (state) => state.formApi.calenderEmpRecordID,
//   );

//   const dispatch = useDispatch();

//   const empID = sessionStorage.getItem("EmpId");
//   const compID = sessionStorage.getItem("companyId");
//   const listViewurl = useSelector((state) => state.globalurl.listViewurl);

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [selectedEmp, setSelectedEmp] = useState(null);
//   const [selectedTerms, setSelectedTerms] = useState(null);
//   const [selectedfromdate, setSelectedFromdate] = useState("");
//   const [selectedtodate, setSelectedtodate] = useState("");
//   const [hasFetched, setHasFetched] = useState(false);
//   //  const formatDate = (date) => {
//   //   const d = new Date(date);
//   //   return d.toLocaleDateString("en-GB").split("/").join("-");
//   // };
//   //    useEffect(() => {
//   //   // if (!selectedEmp) return;
//   //   dispatch(
//   //     weeklyTeachercaledarGet({
//   //       EmployeeID: EMPID,
//   //     })
//   //   );
//   // }, []);

//   const handleApply = () => {
//     setHasFetched(true);
//     if (!selectedEmp) {
//       toast.error("Please select Personnel");
//       return;
//     }

//     dispatch(
//       weeklyTeachercaledarGet({
//         EmployeeID: selectedEmp?.RecordID || selectedEmp,
//         TermsID: selectedTerms?.RecordID || selectedTerms,
//         // FromDate: selectedfromdate,
//         // ToDate: selectedtodate,
//         CompanyID: compID,
//       }),
//     );
//   };

//   const handleReset = () => {
//     setSelectedEmp(null);
//     setSelectedTerms(null);
//     setHasFetched(false);
//     // setSelectedFromdate("");
//     // setSelectedtodate("");
//   };

//   const WCrows = useSelector((state) => state.exploreApi.explorerowData);
//   const WEEKcolumns = useSelector(
//     (state) => state.exploreApi.explorecolumnData,
//   );
//   const WEEKloading = useSelector((state) => state.exploreApi.loading);
//   console.log(WCrows, "--WCrows");
//   console.log(WEEKcolumns, "--WEEKcolumns");
//   console.log(WEEKloading, "--WEEKloading");

//   return (
//     <Paper
//       elevation={3}
//       // sx={{ margin: "10px" }}
//       sx={{
//         width: "100%",
//         p: 3,
//         borderRadius: 3,
//         marginTop:2
//       }}
//     >
//       {/* ================= TITLE ROW ================= */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 3,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           Staff Calendar
//         </Typography>

//         {/* RIGHT SIDE - LOOKUPS + BUTTONS */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             flexWrap: "wrap",
//           }}
//         >
//           {/* <TextField
//             name="fromdate"
//             type="date"
//             label="From Date"
//             variant="standard"
//             focused
//          value={selectedfromdate}
//   onChange={(e) => setSelectedFromdate(e.target.value)}
//   InputLabelProps={{ shrink: true }}
//           sx={{ width: 220 }}
//           />

//          <TextField
//                     name="todate"
//                     type="date"
//                     label="To Date"
//                     variant="standard"
//                     focused
//                    value={selectedtodate}
//   onChange={(e) => setSelectedtodate(e.target.value)}
//   InputLabelProps={{ shrink: true }}
//                    sx={{ width: 220 }}
                    
//                   /> */}

//           <Employeeautocomplete
//             sx={{ width: 220 }}
//             name="Terms"
//             label="Terms"
//             id="Terms"
//             value={selectedTerms}
//             onChange={(newValue) => {
//               setSelectedTerms(newValue);
//             }}
//             url={`${listViewurl}?data={"Query":{"AccessID":"2155","ScreenName":"Terms","Filter":"","Any":"","CompId":${compID},"VerticalLicense": "${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
//           />

//           <Employeeautocomplete
//             sx={{ width: 220 }}
//             name="empName"
//             label="Staff"
//             id="empName"
//             value={selectedEmp}
//             onChange={(newValue) => {
//               setSelectedEmp(newValue);
//             }}
//             url={`${listViewurl}?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${empID}","Any":"","CompId":${compID},"VerticalLicense": "${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
//           />

//           <Button
//             variant="contained"
//             onClick={handleApply}
//             sx={{
//               backgroundColor: "#2e7c67",
//               height: 35,
//               "&:hover": {
//                 backgroundColor: "#256b59",
//               },
//             }}
//           >
//             Apply
//           </Button>

//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleReset}
//             sx={{ height: 35 }}
//           >
//             Reset
//           </Button>
//         </Box>
//       </Box>

//       {/* <Box
//         sx={{
//           height: 358,
//           width: "100%",

//           "& .MuiDataGrid-root": {
//             border: "1px solid #ccc",
//           },

//           // Header styling
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.greenAccent[900],
//             color: "#111",
//             borderBottom: "1px solid #ccc",
//           },

//           "& .MuiDataGrid-columnHeaderTitle": {
//             fontWeight: 700,
//             fontSize: "13px",
//           },

//           "& .MuiDataGrid-columnHeader": {
//             borderRight: "1px solid #ccc",
//           },

//           // Body cell styling (Table look)
//           "& .MuiDataGrid-cell": {
//             borderRight: "1px solid #ccc",
//             borderBottom: "1px solid #ccc",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             // py: 5,        // vertical padding
//             // px: 4.5,      // horizontal padding
//           },

//           // Remove last column right border (optional clean look)
//           "& .MuiDataGrid-columnHeader:last-of-type": {
//             borderRight: "none",
//           },
//           "& .MuiDataGrid-cell:last-of-type": {
//             borderRight: "none",
//           },

//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: "#fff",
//           },
//           "& .odd-row": {
//             backgroundColor: "",
//             color: "#111", // Color for odd rows
//           },
//           "& .even-row": {
//             backgroundColor: "",
//             color: "", // Color for even rows
//           },
//           "& .even-row:hover": {
//             backgroundColor: "", // hover color
//           },
//         }}
//       >
//         <DataGrid
//           rows={WCrows || []}
//           columns={WEEKcolumns}
//           loading={WEEKloading}
//           pageSizeOptions={[5]}
//           hideFooter
//           disableRowSelectionOnClick
//           rowHeight={50}
//           getRowClassName={(params) =>
//             params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
//           }
//         />
//       </Box> */}
//       {hasFetched && (
//         <>
//           <Box
//             sx={{
//               height: 400,
//               width: "100%",

//               // Outer grid border
//               "& .MuiDataGrid-root": {
//                 border: "1px solid #e8e8f0",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//               },

//               // Header
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#1e1e3a",
//                 color: "#c8d0ea",
//                 borderBottom: "none",
//               },
//               "& .MuiDataGrid-columnHeaderTitle": {
//                 fontWeight: 500,
//                 fontSize: "11px",
//                 color: "#c8d0ea",
//               },
//               "& .MuiDataGrid-columnHeader": {
//                 borderRight: "1px solid #2e2e50",
//               },
//               "& .MuiDataGrid-columnHeader:last-of-type": {
//                 borderRight: "none",
//               },
//               // Sort/menu icons in header
//               "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
//                 color: "#8890b8",
//               },
//               "& .MuiDataGrid-columnSeparator": {
//                 display: "none",
//               },

//               // Cells
//               "& .MuiDataGrid-cell": {
//                 borderRight: "0.5px solid #ebebf2",
//                 borderBottom: "0.5px solid #ebebf2",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               },
//               "& .MuiDataGrid-cell:last-of-type": {
//                 borderRight: "none",
//               },
//               "& .MuiDataGrid-cellContent": {
//                 whiteSpace: "pre-line",
//                 wordBreak: "break-word",
//                 overflow: "visible",
//                 textOverflow: "unset",
//               },

//               // Row stripes
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: "#ffffff",
//               },
//               "& .odd-row": {
//                 backgroundColor: "#f8f8fc",
//                 color: "#2d2d4a",
//               },
//               "& .even-row": {
//                 backgroundColor: "#ffffff",
//                 color: "#2d2d4a",
//               },
//               "& .odd-row:hover": {
//                 backgroundColor: "#eff0fa !important",
//               },
//               "& .even-row:hover": {
//                 backgroundColor: "#eff0fa !important",
//               },

//               // Day column (first col) highlight
//               "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
//                 backgroundColor: "#f0f0f8",
//                 fontWeight: 500,
//                 color: "#1e1e3a",
//                 borderRight: "2px solid #d0d0e8",
//               },
//             }}
//           >
//             <DataGrid
//               rows={WCrows}
//               columns={WEEKcolumns}
//               loading={WEEKloading}
//               pageSizeOptions={[5]}
//               hideFooter
//               disableRowSelectionOnClick
//               rowHeight={50}
//               getRowClassName={(params) =>
//                 params.indexRelativeToCurrentPage % 2 === 0
//                   ? "even-row"
//                   : "odd-row"
//               }
//             />
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
//             <Button
//               variant="contained"
//               color="warning"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default StaffTimetable;
export default function StaffTimetable ()  {
    return(
        <Typography>
            Staff Calendar
        </Typography>
    )
}
