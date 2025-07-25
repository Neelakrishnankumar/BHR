// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   TextField,
//   Paper,
//   Button,
//   IconButton,
//   Tooltip,
//   Stack,
//   useTheme,
//   LinearProgress,
//   Select,
//   MenuItem,
//   InputLabel,
//   Checkbox,
//   FormControlLabel
// } from "@mui/material";
// import Edittimesheetreport from "./Edittimesheetreport";
// import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight, formGap } from "../../../ui-components/global/utils";
// import {
//   explorePostData,
//   fetchApidata,
//   postApidata,
//   postApidatawol,
//   getDeployment,
//   postDeployment,
//   invoiceExploreGetData,
//   postData,
//   resetTrackingData,
//   empAttendance,
//   Attendance,
//   AttendanceProcess,
//   timeSheet,
//   timeSheetPostData,
// } from "../../../store/reducers/Formapireducer";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import {
//   // DataGrid,
//   GridToolbarContainer,
//   // GridToolbarColumnsButton,
//   // GridToolbarFilterButton,
//   // GridToolbarExport,
//   // GridToolbarDensitySelector,
//   GridToolbarQuickFilter,
// } from "@mui/x-data-grid";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { Formik } from "formik";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { DataGrid } from "@mui/x-data-grid";
// import { useProSidebar } from "react-pro-sidebar";
// import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
// import TimeSheetPDF from "../pdf/TimeSheetPdf"
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import { tokens } from "../../../Theme";
// import store from "../../../index";
// import { LoadingButton } from "@mui/lab";
// import { useDispatch } from "react-redux";
// import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
// import EditIcon from '@mui/icons-material/Edit';
// import { toast } from "react-hot-toast";
// import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
// import DoneIcon from '@mui/icons-material/Done';
// import CloseIcon from '@mui/icons-material/Close';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// const EditTimeSheet = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   const params = useParams();
//   const location = useLocation();
//   const mode = params.Mode;
//   const dispatch = useDispatch();
//   const isManager = sessionStorage.getItem("isManager");
//   const EMPNAME= sessionStorage.getItem("EmpName");
//   var recID = params.id;
//   var accessID = params.accessID;
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const listViewData = useSelector((state) => state.listviewApi.rowData);
//   const listViewColumn = useSelector((state) => state.listviewApi.columnData);
//   // const empAttendanceData = useSelector(
//   //   (state) => state.formApi.empAttendanceData
//   // );
//   // console.log("empAttendanceData", empAttendanceData);

//   const AttendanceData = useSelector((state) => state.formApi.timeSheetData);
//   console.log("AttendanceData", AttendanceData);
//   const companyID=sessionStorage.getItem("compID")
//   const getLoading = useSelector((state) => state.formApi.getLoading);
//   const data = useSelector((state) => state.formApi.Data);
//   const isLoading = useSelector((state) => state.formApi.loading);
//   const [pageSize, setPageSize] = useState(10);
//   const [rowCount, setRowCount] = useState(0);
//   const [show, setScreen] = React.useState("0");
//   const EMPID = sessionStorage.getItem("EmpId");
//   const theme = useTheme();
//   const [loading, setLoading] = useState(false);
//   const colors = tokens(theme.palette.mode);
//   const today = new Date();
//   const formattedDate = today.toISOString().split('T')[0];
//   console.log(formattedDate);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const handleClick=() =>{
//     navigate("/Apps/Edittimesheetreport");
//     };
//   const handleUnlock = async () => {
//     const idata = {
//       action: "update",
//       DailyTaskRecordID: selectedRow?.RecordID,
//       ApprovedBy: EMPID,
//       ApprovedStatus: "",
//       DateTime: formattedDate,
//       Remarks: reason,
//     };

//     try {
//       const response = await dispatch(timeSheetPostData({ idata }));

//       if (response.payload.Status === "Y") {
//         toast.success(response.payload.Msg);
//         dispatch(timeSheet({ data: getData }));
//         handleDialogClose();
//       } else {
//         toast.error(response.payload.Msg);
//       }
//     } catch (error) {
//       console.error("Error during timesheet post:", error);
//       toast.error("Something went wrong!");
//     }
//   };

//   // useEffect((=>{
//   //   if(AttendanceData.length>0){

//   //   }
//   // }))
//   function AttendanceTool() {
//     return (
//       <GridToolbarContainer
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Typography>Attendance</Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <GridToolbarQuickFilter />
//         </Box>
//       </GridToolbarContainer>
//     );
//   }

//   const AttColumn = [
//     {
//       field: 'RecordID',
//       headerName: 'RecordID',
//       width: 80,
//       hide:true
//     },
//     {
//       field: 'Code',
//       headerName: 'Code',
//       width: 130,
//       hide:true
//     },
//     {
//       field: 'ProjectName',
//       headerName: 'ProjectName',
//       width: 130,
//     },
//     {
//       field: 'FuntionsName',
//       headerName: 'FuntionsName',
//       width: 130,
//     },  
//     {
//       field: 'Description',
//       headerName: 'Description',
//       width: 400,
//       renderCell: (params) => {
//         const description = params.row.Description || '';
//         const comments = params.row.Comments || '';
//         return (
//           <div>
//             <p>{description} || {comments}</p>
            
//           </div>
//         );
//       }
     
//     },
   
//     {
//       field: 'ProjectCode',
//       headerName: 'ProjectCode',
//       width: 130,
//       hide:true
//     },
    
    
//     {
//       field: 'FunctionCode',
//       headerName: 'FunctionCode',
//       width: 130,
//       hide:true
//     },
//     {
//       field: 'Status',
//       headerName: 'Status',
//       width: 120,
//     },
//     // {
//     //   field: 'ApprovedStatus',
//     //   headerName: 'Approved',
//     //   width: 100,
//     //   // hide:true
//     // },
//     {
//       field: 'ApprovedStatus',
//       headerName: 'Approved',
//       width: 100,
//       renderCell: (params) => {
//         switch (params.value) {
//           case 'A':
//             return 'Approved';
//           case 'R':
//             return 'Rejected';
//           default:
//             return '';
//         }
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 120,
//       sortable: false,
//       renderCell: (params) => {
//         const isCompleted = params.row.Status === "Completed";
//         const isApproved = params.row.ApprovedStatus === "A";
//         const isRejected = params.row.ApprovedStatus === "R";
//         if (!isCompleted) return null;

//         if (isApproved || isRejected) {
//           return (
//             <Tooltip title="Approved - Locked">
//               <IconButton onClick={() => handleDialogOpen(params.row)}>
//                 <LockOpenIcon color="success" fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           );
//         }

//         return (
//           <>
//             <Tooltip title="Edit">
//               <IconButton
//                 onClick={() => {
//                   navigate(
//                     `/Apps/TR132/TimeSheet/EditTimeDailytask/${params.row.RecordID}`,
//                     { state: { data: getData } }
//                   );
//                 }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Approve">
//               <IconButton
//                 onClick={async () => {
//                   const idata = {
//                     action: "update",
//                     DailyTaskRecordID: params.row.RecordID,
//                     ApprovedBy: EMPID,
//                     ApprovedStatus: "A",
//                     DateTime: formattedDate,
//                     Remarks: "aaa",
//                   };

//                   try {
//                     const response = await dispatch(
//                       timeSheetPostData({ idata })
//                     );

//                     if (response.payload.Status === "Y") {
//                       toast.success(response.payload.Msg);
//                       dispatch(timeSheet({ data: getData }));
//                     } else {
//                       toast.error(response.payload.Msg);
//                     }
//                   } catch (error) {
//                     console.error("Error during timesheet post:", error);
//                     toast.error("Something went wrong!");
//                   }
//                 }}
//               >
//                 <DoneIcon fontSize="small" color="success" />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Reject">
//               <IconButton
//                 onClick={async () => {
//                   const idata = {
//                     action: "update",
//                     DailyTaskRecordID: params.row.RecordID,
//                     ApprovedBy: EMPID,
//                     ApprovedStatus: "R",
//                     DateTime: formattedDate,
//                     Remarks: "aaa",
//                   };

//                   try {
//                     const response = await dispatch(
//                       timeSheetPostData({ idata })
//                     );

//                     if (response.payload.Status === "Y") {
//                       toast.success(response.payload.Msg);
//                       dispatch(timeSheet({ data: getData }));
//                     } else {
//                       toast.error(response.payload.Msg);
//                     }
//                   } catch (error) {
//                     console.error("Error during timesheet post:", error);
//                     toast.error("Something went wrong!");
//                   }
//                 }}
//               >
//                 <CloseIcon fontSize="small" color="error" />
//               </IconButton>
//             </Tooltip>
//           </>
//         );
//       },
//     },

//   ];
  

//   const safeAttendanceData = Array.isArray(AttendanceData)
//   ? AttendanceData
//   : [];

// // Then:
// const ApprovedData = safeAttendanceData.filter(
//   (row) => row.ApprovedStatus === "A"
// );
// console.log(ApprovedData, "===ApprovedData");
//   /***********Attendance ************/

//   const currentMonthNumber = new Date().getMonth() + 1;
//   const currentYear = new Date().getFullYear();
//   const AttInitialvalues = {
//     code: data.Code,
//     description: data.Name,
//     Sal: data.Sal,
//     month: currentMonthNumber,
//     year: currentYear,
//   };
//   const[getData,setData]=useState("")
//   const [useCurrentEmp, setUseCurrentEmp] = useState(false);
//   const attendaceFnSave = async (values) => {
//     const data = {
//       Month: values.month.toString(),
//       Year: values.year,
//       EmployeeID: useCurrentEmp ? EMPID: empData.RecordID,
//     };
//     setData(data);
//     dispatch(timeSheet({ data }));
//   };

//   console.log(getData,'---------------------GETDATA');
  
//   const explorelistViewData = useSelector(
//     (state) => state.exploreApi.explorerowData
//   );
//   const explorelistViewColumn = useSelector(
//     (state) => state.exploreApi.explorecolumnData
//   );
//   const exploreLoading = useSelector((state) => state.exploreApi.loading);
//   const screenChange = (event) => {
//     setScreen(event.target.value);
//   };
//   const VISIBLE_FIELDS = [
//     "SLNO",
//     "OtDate",
//     "NumberOfHours",
//     "Status",
//     "action",
//   ];
//   const [funMode, setFunMode] = useState("A");
//   const columns = React.useMemo(
//     () =>
//       explorelistViewColumn
//         ? explorelistViewColumn.filter((column) =>
//             VISIBLE_FIELDS.includes(column.field)
//           )
//         : [],
//     [explorelistViewColumn]
//   );

//   const fnLogOut = (props) => {
//     Swal.fire({
//       title: `Do you want ${props}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (props === "Logout") navigate("/");
//         if (props === "Close") navigate("/Apps/TR217/EditAttendance");
//       }
//     });
//   };
//   const [empData, setempData] = useState(null);
//   const handleSelectionEmployeeChange = (newValue) => {

//     if (newValue) {
//       setempData(newValue);
//       console.log(newValue.RecordID, "--selectedproductid");
    
//     } else {
//       setempData(null);
//     }
//     setUseCurrentEmp(false)
//   };
//   const [open, setOpen] = React.useState(false);
//   const handlePdfClick = () => {
  
//   };
//   const handleDialogOpen = (row) => {
//     setSelectedRow(row);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setReason("");
//     setSelectedRow(null);
//   };
// const [reason,setReason]=useState("")
 
//   return (
//     <React.Fragment>
//       {/* {getLoading && <LinearProgress />} */}
//             <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
      
//       <Box display="flex" justifyContent="space-between" p={2}>
//         <Box display="flex" borderRadius="3px" alignItems="center">
//           {broken && !rtl && (
//             <IconButton onClick={() => toggleSidebar()}>
//               <MenuOutlinedIcon />
//             </IconButton>
//           )}
//           <Typography variant="h3">Time Sheet</Typography>
//         </Box>
//         <Box display="flex">
//           {/* <Tooltip title="Attendance ">
//             <IconButton
//               onClick={() => navigate("/Apps/TR217/Attendance")}
//               color="primary"
//             >
//               <ListAltOutlinedIcon />
//             </IconButton>
//           </Tooltip> */}
//           <Tooltip title="Close">
//             <IconButton onClick={() => fnLogOut("Close")} color="error">
//               <ResetTvIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Logout">
//             <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//               <LogoutOutlinedIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
//       </Paper>
    
//                 <Paper elevation={3} sx={{ margin: "10px" }}>
        
//         {/* <Box m="10px"> */}
//           <Formik
//             initialValues={AttInitialvalues}
//             enableReinitialize={true}
//             onSubmit={(values, { resetForm }) => {
//               setTimeout(() => {
//                 attendaceFnSave(values, resetForm);
//               }, 100);
//             }}
//           >
//             {({
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               isSubmitting,
//               values,
//               handleSubmit,
//               resetForm,
//             }) => (
//               <form
//                 onSubmit={handleSubmit}
//                 onReset={() => {
//                   resetForm();
//                   dispatch(resetTrackingData());
//                 }}
//               >
//                 <Box
//                   display="grid"
//                   gridTemplateColumns="repeat(2 , minMax(0,1fr))"
//                   // gap="70px"
//                   gap={formGap}
//                   padding={1}
//                   sx={{
//                     "& > div": {
//                       gridColumn: isNonMobile ? undefined : "span 4",
//                     },
//                   }}
//                 >
//                 <Stack direction="row" spacing={2}>
//                                     <TextField
//                                       fullWidth
//                                       variant="standard"
//                                       type="text"
//                                       id="month"
//                                       name="month"
//                                       label="Month"
//                                       value={values.month}
//                                       focused
//                                       onChange={handleChange}
//                                       onBlur={handleBlur}
//                                       select
//                                       sx={{
//                                         "& .MuiFilledInput-root": {
//                                           backgroundColor: "transparent", // optional: adjust if needed
//                                         },
//                                         width:200
//                                       }}
//                                     >
//                                       <MenuItem value={"1"}>January</MenuItem>
//                                       <MenuItem value={"2"}>February</MenuItem>
//                                       <MenuItem value={"3"}>March</MenuItem>
//                                       <MenuItem value={"4"}>April</MenuItem>
//                                       <MenuItem value={"5"}>May</MenuItem>
//                                       <MenuItem value={"6"}>June</MenuItem>
//                                       <MenuItem value={"7"}>July</MenuItem>
//                                       <MenuItem value={"8"}>August</MenuItem>
//                                       <MenuItem value={"9"}>September</MenuItem>
//                                       <MenuItem value={"10"}>October</MenuItem>
//                                       <MenuItem value={"11"}>November</MenuItem>
//                                       <MenuItem value={"12"}>December</MenuItem>
//                                     </TextField>
                                  
//                                     <TextField
//                                       fullWidth
//                                       variant="standard"
//                                       type="number"
//                                       id="year"
//                                       name="year"
//                                       label="Year"
//                                       value={values.year}
//                                       inputProps={{ min: "1900", max: "2100", step: "1" }}
//                                       focused
//                                       onChange={handleChange}
//                                       onBlur={handleBlur}
//                                       sx={{
//                                         "& .MuiFilledInput-root": {
//                                           backgroundColor: "transparent",
//                                            // optional
//                                         },
//                                         width:200
//                                       }}
//                                     />
//                                     <Employeeautocomplete
//                                                            sx={{ width: 400 }}
//                                                            name="Employee"
//                                                            label="Employee"
//                                                            id="Employee"
//                                                            value={empData}
//                                                            onChange={handleSelectionEmployeeChange}
//                                                            // url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2101","ScreenName":"EMPLOYEETEAMS","Filter":"parentID=${EmpId}","Any":"","CompId":${companyID}}}`}
//                                                            url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID=${companyID}","Any":"","CompId":""}}`}
                                   
//                                                         />
//                                       {/* <FormControlLabel
//                                                 control={
//                                                   <Checkbox
//                                                     checked={useCurrentEmp}
//                                                     onChange={(e) =>{ setUseCurrentEmp(e.target.checked);
//                                                       setempData(null)}
//                                                     }
//                                                     color="primary"
//                                                   />
//                                                 }
//                                                 label="Self"
//                                               /> */}
//                                   </Stack>
//                                   <Stack direction="row" spacing={2} display="flex" padding={1} justifyContent="end">
                                      
//                                   <Button type="submit" variant="contained" color="secondary" >
//                                     APPLY
//                                   </Button>
//                                   {/* <Button
//                                     onClick={() => attendaceProcessFnSave(values)}
//                                     type="reset"
//                                     variant="contained"
//                                     color="primary"
//                                   >
//                                     PROCESS
//                                   </Button> */}
//                                   <Button type="reset" variant="contained" color="error" size="small">
//                                     RESET
//                                   </Button>
//                                   <PictureAsPdfIcon onClick={handleClick} sx={{ fontSize: 24, opacity: 0.5 }} style={{ color: "#d32f2f", cursor: "pointer" }}/>

// {isManager === "1" && ApprovedData?.length > 0 && (
//   <PDFDownloadLink
//     document={
//       <TimeSheetPDF
//         data={ApprovedData}
//         filters={{
//           Month: values.month,
//           Year: values.year,
//           EmployeeID: empData?.Name || EMPNAME,
//         }}
//       />
//     }
//     fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
//     style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
//   >
//     {({ loading }) =>
//       loading ? (
//         <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
//       ) : (
//         <PictureAsPdfIcon sx={{ fontSize: 24 }} />
//       )
//     }
//   </PDFDownloadLink>
// )}
 
//                                   {/* {isManager === "1" && AttendanceData?.length > 0 && (
//                   <PDFDownloadLink
//                     document={
//                       <AttendanceHistoryPDF
//                         data={AttendanceData}
//                         filters={{
//                           Month: values.month,
//                           Year: values.year,
//                           EmployeeID: empData?.RecordID,
//                         }}
//                       />
//                     }
//                     fileName={`Attendance_Report_${empData?.Name || "Employee"}.pdf`}
//                     style={{
//                       textDecoration: "none",
//                       padding: "6px 12px",
//                       color: "#fff",
//                       backgroundColor: "#1976d2",
//                       borderRadius: 4,
//                     }}
//                     // onClick={() => setButtonVisible(false)}
//                   >
//                     {({ loading }) =>
//                       loading ? "Preparing document..." : "Download Attendance PDF"
                  
//                     }
//                   </PDFDownloadLink>
//                 )} */}
                                  
//                                   </Stack>
//                                 </Box>
                

//                 <Box sx={{ gridColumn: "span 4" }}>
//                   <Box
//                     height="500px"
//                     // height={dataGridHeight}
//                     marginTop={2}
//                     sx={{
//                       "& .MuiDataGrid-root": {
//                         // border: "none",
//                       },
//                       "& .MuiDataGrid-cell": {
//                         // borderBottom: "none",
//                       },
//                       "& .name-column--cell": {
//                         color: colors.greenAccent[300],
//                       },
//                       "& .MuiDataGrid-columnHeaders": {
//                         backgroundColor: colors.blueAccent[800],
//                         // borderBottom: "none",
//                       },
//                       "& .MuiDataGrid-virtualScroller": {
//                         backgroundColor: colors.primary[400],
//                       },
//                       "& .MuiDataGrid-footerContainer": {
//                         // borderTop: "none",
//                         backgroundColor: colors.blueAccent[800],
//                       },
//                       "& .MuiCheckbox-root": {
//                         color: `${colors.greenAccent[200]} !important`,
//                       },
//                       "& .odd-row": {
//                         backgroundColor: "",
//                         color: "", // Color for odd rows
//                       },
//                       "& .even-row": {
//                         backgroundColor: "#d0edec",
//                         color: "", // Color for even rows
//                       },
//                     }}
//                   >
//                     <DataGrid
//                     sx={{
//                                 "& .MuiDataGrid-footerContainer":{
//                                   height:dataGridHeaderFooterHeight,
//                                   minHeight:dataGridHeaderFooterHeight,
//                                 }
//                                }}
                              

//                                 rowHeight={dataGridRowHeight}
//                                           headerHeight={dataGridHeaderFooterHeight}


//                       rows={AttendanceData}
//                       columns={AttColumn}
//                       disableSelectionOnClick
//                       getRowId={(row) => row.RecordID}
//                       pageSize={pageSize}
//                       onPageSizeChange={(newPageSize) =>
//                         setPageSize(newPageSize)
//                       }
//                       onCellClick={(params) => {}}
//                       rowsPerPageOptions={[5, 10, 20]}
//                       pagination
//                       components={{
//                         Toolbar: AttendanceTool,
//                       }}
//                       onStateChange={(stateParams) =>
//                         setRowCount(stateParams.pagination.rowCount)
//                       }
//                       loading={exploreLoading}
//                       componentsProps={{
//                         toolbar: {
//                           showQuickFilter: true,
//                           quickFilterProps: { debounceMs: 500 },
//                         },
//                       }}

//                       getRowClassName={(params) =>
//                         params.indexRelativeToCurrentPage % 2 === 0
//                           ? 'odd-row'
//                           : 'even-row'
//                       }
//                     />
//                   </Box>
//                 </Box>
//               </form>
//             )}
//           </Formik>
//         {/* </Box> */}

//         <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>{"UnLock Reason"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To unlock this employee, please enter your reason here.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="reason"
//             name="reason"
//             label="Reason"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>CANCEL</Button>
//           <Button onClick={handleUnlock} autoFocus>
//             UNLOCK
//           </Button>
//         </DialogActions>
//       </Dialog>
    
//         </Paper>  
   
//     </React.Fragment>
//   );
// };

// export default EditTimeSheet;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
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
  timeSheet,
  timeSheetPostData,
} from "../../../store/reducers/Formapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  // DataGrid,
  GridToolbarContainer,
  // GridToolbarColumnsButton,
  // GridToolbarFilterButton,
  // GridToolbarExport,
  // GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import TimeSheetPDF from "../pdf/TimeSheetPdf";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
// import Edittimesheetreport from "./Edittimesheetreport";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import { Employeeautocomplete } from "../../../ui-components/global/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditTimeSheet = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const mode = params.Mode;
  const dispatch = useDispatch();
  const isManager = sessionStorage.getItem("isManager");
  const EMPNAME = sessionStorage.getItem("EmpName");
  var recID = params.id;
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const listViewData = useSelector((state) => state.listviewApi.rowData);
  const listViewColumn = useSelector((state) => state.listviewApi.columnData);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  useEffect(() => {
    dispatch(resetTrackingData());
  },[])

  const AttendanceData = useSelector((state) => state.formApi.timeSheetData);
  const projectName = useSelector((state) => state.formApi.projectName);
  const managerName = useSelector((state) => state.formApi.managerName);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [pageSize, setPageSize] = useState(25);
  const [rowCount, setRowCount] = useState(0);
  const [show, setScreen] = React.useState("0");
  const EMPID = sessionStorage.getItem("EmpId");
   const CompanyID = sessionStorage.getItem("compID");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleUnlock = async () => {
    const idata = {
      action: "update",
      DailyTaskRecordID: selectedRow?.RecordID,
      ApprovedBy: EMPID,
      ApprovedStatus: "",
      DateTime: formattedDate,
      Remarks: reason,
    };

    try {
      const response = await dispatch(timeSheetPostData({ idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(timeSheet({ data: getData }));
        handleDialogClose();
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      console.error("Error during timesheet post:", error);
      toast.error("Something went wrong!");
    }
  };

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


  const AttColumn = [
     {
    field: "serialNo",
    headerName: "SL#",
    width: 40,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return params.api.getRowIndex(params.id) + 1;
    },
  },
  {
      field: "RecordID",
      headerName: "RecordID",
      width: 80,
      hide: true,
    },
    {
      field: "Code",
      headerName: "Code",
      width: 130,
      hide: true,
    },
     {
      field: "Date",
      headerName: "Date",
      width: 80,
    },
    {
      field: "ProjectName",
      headerName: "Project",
      width: 130,
    },
    {
      field: "DesignationsName",
      headerName: "Function",
      width: 130,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 400,
      renderCell: (params) => {
        const description = params.row.Description || "";
        const comments = params.row.Comments || "";
        return (
          <div>
            <p>
              {description} || {comments}
            </p>
          </div>
        );
      },
    },

    {
      field: "ProjectCode",
      headerName: "ProjectCode",
      width: 130,
      hide: true,
    },

    {
      field: "FunctionCode",
      headerName: "FunctionCode",
      width: 130,
      hide: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const isCompleted = params.row.Status === "Completed";
        const isApproved = params.row.Status === "AP";
        const isRejected = params.row.Status === "RJ";
        if (!isCompleted) return null;

        if (isApproved || isRejected) {
          return (
            <Tooltip title="Approved - Locked">
              <IconButton onClick={() => handleDialogOpen(params.row)}>
                <LockOpenIcon color="success" fontSize="small" />
              </IconButton>
            </Tooltip>
          );
        }

        return (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  navigate(
                    `/Apps/TR132/TimeSheet/EditTimeDailytask/${params.row.RecordID}`,
                    { state: { data: getData } }
                  );
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Approve">
              <IconButton
                onClick={async () => {
                  const idata = {
                    action: "update",
                    DailyTaskRecordID: params.row.RecordID,
                    ApprovedBy: EMPID,
                    Status: "AP",
                    DateTime: formattedDate,
                    Remarks: "aaa",
                  };

                  try {
                    const response = await dispatch(
                      timeSheetPostData({ idata })
                    );

                    if (response.payload.Status === "Y") {
                      toast.success(response.payload.Msg);
                      dispatch(timeSheet({ data: getData }));
                    } else {
                      toast.error(response.payload.Msg);
                    }
                  } catch (error) {
                    console.error("Error during timesheet post:", error);
                    toast.error("Something went wrong!");
                  }
                }}
              >
                <DoneIcon fontSize="small" color="success" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reject">
              <IconButton
                onClick={async () => {
                  const idata = {
                    action: "update",
                    DailyTaskRecordID: params.row.RecordID,
                    ApprovedBy: EMPID,
                    Status: "RJ",
                    DateTime: formattedDate,
                    Remarks: "aaa",
                  };

                  try {
                    const response = await dispatch(
                      timeSheetPostData({ idata })
                    );

                    if (response.payload.Status === "Y") {
                      toast.success(response.payload.Msg);
                      dispatch(timeSheet({ data: getData }));
                    } else {
                      toast.error(response.payload.Msg);
                    }
                  } catch (error) {
                    console.error("Error during timesheet post:", error);
                    toast.error("Something went wrong!");
                  }
                }}
              >
                <CloseIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const safeAttendanceData = Array.isArray(AttendanceData)
    ? AttendanceData
    : [];

  // Then:
  const ApprovedData = safeAttendanceData.filter(
    (row) => row.Status === "Approved"
  );

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const AttInitialvalues = {
    code: data.Code,
    description: data.Name,
    Sal: data.Sal,
    month: currentMonthNumber,
    year: currentYear,
  };
  const [getData, setData] = useState("");
  const [useCurrentEmp, setUseCurrentEmp] = useState(false);
  const attendaceFnSave = async (values) => {
    const data = {
      Month: values.month.toString(),
      Year: values.year,
      EmployeeID: useCurrentEmp ? EMPID : empData.RecordID,
    };
    setData(data);
    dispatch(timeSheet({ data }));
  };

  console.log(getData, "---------------------GETDATA");
  const handleClick = (values) => {
    console.log(values.month, "Month");
    console.log(values.year, "Year");

    navigate("/Apps/Edittimesheetreport", {
      state: { Month: values.month, Year: values.year },
    });
  };
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewColumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const screenChange = (event) => {
    setScreen(event.target.value);
  };

  const filteredColumns = useCurrentEmp
    ? AttColumn.filter((col) => col.field !== "actions")
    : AttColumn;

 
  const VISIBLE_FIELDS = [
    "SLNO",
    "OtDate",
    "NumberOfHours",
    "Status",
    "action",
  ];
  const [funMode, setFunMode] = useState("A");
  const columns = React.useMemo(
    () =>
      explorelistViewColumn
        ? explorelistViewColumn.filter((column) =>
            VISIBLE_FIELDS.includes(column.field)
          )
        : [],
    [explorelistViewColumn]
  );

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
        if (props === "Logout") navigate("/");
        if (props === "Close") navigate("/Apps/TR217/EditAttendance");
      }
    });
  };
  const [empData, setempData] = useState(null);
  const handleSelectionEmployeeChange = (newValue) => {
    if (newValue) {
      setempData(newValue);
    } else {
      setempData(null);
    }
    setUseCurrentEmp(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setReason("");
    setSelectedRow(null);
  };
  const [reason, setReason] = useState("");

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Time Sheet</Typography>
            {/* <Typography variant="h4">
                            Timesheet ({empData?.Name})
                        </Typography> */}
          </Box>
          <Box display="flex">
            {/* <Tooltip title="Attendance ">
            <IconButton
              onClick={() => navigate("/Apps/TR217/Attendance")}
              color="primary"
            >
              <ListAltOutlinedIcon />
            </IconButton>
          </Tooltip> */}
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
                gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                // gap="70px"
                gap={formGap}
                padding={1}
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    id="month"
                    name="month"
                    label="Month"
                    value={values.month}
                    focused
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // optional: adjust if needed
                      },
                      width: 200,
                    }}
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
                    type="number"
                    id="year"
                    name="year"
                    label="Year"
                    value={values.year}
                    inputProps={{ min: "1900", max: "2100", step: "1" }}
                    focused
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{
                      "& .MuiFilledInput-root": {
                        backgroundColor: "transparent",
                      },
                      width: 200,
                    }}
                  />
                  <Employeeautocomplete
                    sx={{ width: 400 }}
                    name="Employee"
                    label="Employee"
                    id="Employee"
                    value={empData}
                    onChange={handleSelectionEmployeeChange}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2116","ScreenName":"Employee","Filter":"CompanyID='${CompanyID}'","Any":"","CompId":${CompanyID}}}`}
                  />
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={useCurrentEmp}
                        onChange={(e) => {
                          setUseCurrentEmp(e.target.checked);
                          setempData(null);
                        }}
                        color="primary"
                      />
                    }
                    label="Self"
                  /> */}
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  padding={1}
                  justifyContent="end"
                >
                  <Button type="submit" variant="contained" color="secondary">
                    APPLY
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    RESET
                  </Button>

                  {/* <PictureAsPdfIcon onClick={handleClick} sx={{ fontSize: 24, opacity: 0.5 }} style={{ color: "#d32f2f", cursor: "pointer" }}/> */}
                  <Button
                    type="reset"
                    variant="contained"
                    // color="error"
                    sx={{ color: "white", backgroundColor: "#2196f3" }}
                    // style={{ color: "#2196f3"}}
                    size="small"
                    onClick={() => handleClick(values)}
                  >
                More
                  </Button>
                
                  {/* <PictureAsPdfIcon
  onClick={() => handleClick(values)}
  sx={{ fontSize: 24, opacity: 0.5 }}
  style={{ color: "#d32f2f", cursor: "pointer" }}
/> */}

                  {ApprovedData?.length > 0 && (
                    <PDFDownloadLink
                      document={
                        <TimeSheetPDF
                          data={ApprovedData}
                          projectName={projectName}
                          managerName={managerName}
                          filters={{
                            Month: values.month,
                            Year: values.year,
                            EmployeeID: empData?.Name || EMPNAME,
                          }}
                        />
                      }
                      fileName={`Attendance_Report_${
                        empData?.Name || EMPNAME
                      }.pdf`}
                      style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
                    >
                      {({ loading }) =>
                        loading ? (
                          <PictureAsPdfIcon
                            sx={{ fontSize: 24, opacity: 0.5 }}
                          />
                        ) : (
                          <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        )
                      }
                    </PDFDownloadLink>
                 )} 
                {/* <PDFDownloadLink
                      document={
                        <InvoicePDF
                        />
                      }
                      fileName={"Invoice.pdf"}
                      style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
                    >
                      {({ loading }) =>
                        loading ? (
                          <PictureAsPdfIcon
                            sx={{ fontSize: 24, opacity: 0.5 }}
                          />
                        ) : (
                          <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                        )
                      }
                    </PDFDownloadLink> */}
                </Stack>
              </Box>

              <Box sx={{ gridColumn: "span 4" }}>
                <Box
                  height="500px"
                  // height={dataGridHeight}
                  marginTop={2}
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
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    //columns={AttColumn}
                    rows={AttendanceData}
                    columns={filteredColumns}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onCellClick={(params) => {}}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                      Toolbar: AttendanceTool,
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
              </Box>
            </form>
          )}
        </Formik>
        {/* </Box> */}

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{"UnLock Reason"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To unlock this employee, please enter your reason here.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="reason"
              name="reason"
              label="Reason"
              type="text"
              fullWidth
              variant="standard"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>CANCEL</Button>
            <Button onClick={handleUnlock} autoFocus>
              UNLOCK
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </React.Fragment>
  );
};

export default EditTimeSheet;


