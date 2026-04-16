import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    IconButton,
    ListItemText,
    CircularProgress,
    Card,
    CardContent,
    Divider,
    Typography,
    Skeleton,
    Box,
    Tooltip,
    Paper,
    useTheme,
    TextField,
    useMediaQuery,
    Breadcrumbs,
} from "@mui/material";

import {
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
// import "./Calendar.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useProSidebar } from "react-pro-sidebar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { weeklyTeachercalendarGet } from "../../../store/reducers/Explorelitviewapireducer";
import { tokens } from "../../../Theme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const StaffTimetable = () => {
      const isNonMobile = useMediaQuery("(min-width:600px)");
    
    const calendarRef = useRef(null);
    const calendarInstanceRef = useRef(null);
    const [eventsData, setEventsData] = useState([]);
    const [DialogData, setDialogData] = useState([]);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const [clickedDate, setClickedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isTodayDialog, setIsTodayDialog] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [taskLoading, setTaskLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const EMPID = sessionStorage.getItem("EmpId");
    const [currentDayTasks, setCurrentDayTasks] = useState([]);
    const [yesterdayTasks, setYesterdayTasks] = useState([]);
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [blockedTasks, setBlockedTasks] = useState([]);

    const [activeTab, setActiveTab] = useState("todo"); // or 'approved'
    const [notApprovedTasks, setNotApprovedTasks] = useState([]);
    const [isToday, setIsToday] = useState(false);
    const isManager = sessionStorage.getItem("isManager");
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
    const is003Subscription = SubscriptionCode.endsWith("003");
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);

    const calendardata = useSelector((state) => state.formApi.calendardata);
    const calenderEmpRecordID = useSelector(
        (state) => state.formApi.calenderEmpRecordID,
    );

    const dispatch = useDispatch();

    const params = useParams();
    const TermsID = params.TermsID;
    const EmployeeID = params.EmployeeID;
    const CompanyID = params.CompanyID;
  var mode = params.Mode;
    useEffect(() => {

        if (!EmployeeID || !CompanyID || !TermsID) return;
        dispatch(weeklyTeachercalendarGet({ TermsID: TermsID, EmployeeID: EmployeeID, CompanyID: CompanyID }))
    }, [EmployeeID, TermsID, CompanyID]);
    const empID = sessionStorage.getItem("EmpId");
    const compID = sessionStorage.getItem("companyId");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedEmp, setSelectedEmp] = useState(null);
    const [selectedTerms, setSelectedTerms] = useState(null);
    const [selectedfromdate, setSelectedFromdate] = useState("");
    const [selectedtodate, setSelectedtodate] = useState("");
    const [hasFetched, setHasFetched] = useState(false);


    const WCrows = useSelector((state) => state.exploreApi.explorerowData);
    const WEEKcolumns = useSelector(
        (state) => state.exploreApi.explorecolumnData,
    );
    const WEEKloading = useSelector((state) => state.exploreApi.loading);
    console.log(WCrows, "--WCrows");
    console.log(WEEKcolumns, "--WEEKcolumns");
    console.log(WEEKloading, "--WEEKloading");

      const fnLogOut = (props) => {
        //   if(Object.keys(ref.current.touched).length === 0){
        //     if(props === 'Logout'){
        //       navigate("/")}
        //       if(props === 'Close'){
        //         navigate("/Apps/TR022/Bank Master")
        //       }
    
        //       return
        //  }
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
              navigate("/Apps/TR232/Role");
            }
          } else {
            return;
          }
        });
      };
    

    return (
        <>
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
                                {/* <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate("/Apps/TR330/Classification")
                                    }}
                                >
                                   Classification
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                   Personnel
                                </Typography> */}
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(-1)}
                                >
                                   Staff Timetable
                                </Typography>
                            
                            </Breadcrumbs>
                        </Box>
                    </Box>
                    <Box display="flex">
                     
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
            <Paper
                elevation={3}
                // sx={{ margin: "10px" }}
                sx={{
                    width: "100%",
                    p: 3,
                    borderRadius: 3,
                    marginTop: 2
                }}
            >
                {/* ================= TITLE ROW ================= */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Staff Calendar
                    </Typography>
                    <Box
                        sx={{
                            height: "auto",
                            width: "100%",

                            // Outer grid border
                            "& .MuiDataGrid-root": {
                                border: "1px solid #e8e8f0",
                                borderRadius: "8px",
                                overflow: "hidden",
                            },

                            // Header
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#1e1e3a",
                                color: "#c8d0ea",
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 500,
                                fontSize: "11px",
                                color: "#c8d0ea",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                borderRight: "1px solid #2e2e50",
                            },
                            "& .MuiDataGrid-columnHeader:last-of-type": {
                                borderRight: "none",
                            },
                            // Sort/menu icons in header
                            "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
                                color: "#8890b8",
                            },
                            "& .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },

                            // Cells
                            "& .MuiDataGrid-cell": {
                                borderRight: "0.5px solid #ebebf2",
                                borderBottom: "0.5px solid #ebebf2",
                                display: "flex",
                                // alignItems: "center",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                padding: "2px 8px"
                            },
                            "& .MuiDataGrid-cell:last-of-type": {
                                borderRight: "none",
                            },
                            // "& .MuiDataGrid-cellContent": {
                            //     whiteSpace: "pre-line",
                            //     wordBreak: "break-word",
                            //     overflow: "visible",
                            //     textOverflow: "unset",
                            // },
                            "& .MuiDataGrid-cellContent": {
                                whiteSpace: "normal",        // ✅ better wrapping
                                wordBreak: "break-word",
                                lineHeight: "1.4",           // ✅ spacing between lines
                                textAlign: "center",
                            },

                            // Row stripes
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "#ffffff",
                            },
                            "& .odd-row": {
                                backgroundColor: "#f8f8fc",
                                color: "#2d2d4a",
                            },
                            "& .even-row": {
                                backgroundColor: "#ffffff",
                                color: "#2d2d4a",
                            },
                            "& .odd-row:hover": {
                                backgroundColor: "#eff0fa !important",
                            },
                            "& .even-row:hover": {
                                backgroundColor: "#eff0fa !important",
                            },

                            // Day column (first col) highlight
                            "& .MuiDataGrid-row .MuiDataGrid-cell:first-of-type": {
                                backgroundColor: "#f0f0f8",
                                fontWeight: 500,
                                color: "#1e1e3a",
                                borderRight: "2px solid #d0d0e8",
                            },
                        }}
                    >
                        <DataGrid
                            rows={WCrows}
                            columns={WEEKcolumns}
                            loading={WEEKloading}
                            pageSizeOptions={[5]}
                            hideFooter
                            disableRowSelectionOnClick
                            rowHeight={60}
                            // getRowHeight={() => "auto"}
                            autoHeight
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0
                                    ? "even-row"
                                    : "odd-row"
                            }
                        />
                    </Box>




                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default StaffTimetable;
