import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
    Breadcrumbs,
    useMediaQuery,
    Chip,
} from "@mui/material";

import {
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { weeklyclasscaledarGet } from "../../../store/reducers/Explorelitviewapireducer";
import { tokens } from "../../../Theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProjectTimeTablePDF from "../pdf/ProTimetablepdf";
import { getConfig } from "../../../config";

const ProjectTimeTable = () => {
    const calendarRef = useRef(null);
    const calendarInstanceRef = useRef(null);
    const [eventsData, setEventsData] = useState([]);
    const [DialogData, setDialogData] = useState([]);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const [clickedDate, setClickedDate] = useState("");
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [footerHeight, setFooterHeight] = useState(60);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const companyClassification = sessionStorage.getItem("Classification");

    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();

    const HeaderImg = sessionStorage.getItem("CompanyHeader");
    const FooterImg = sessionStorage.getItem("CompanyFooter");
    console.log("HeaderImg", HeaderImg, FooterImg);
    const config = getConfig();
    const baseurlUAAM = config.UAAM_URL;
    useEffect(() => {
        if (!FooterImg) return;

        const url = `${baseurlUAAM}/uploads/images/${FooterImg}`;

        const img = new Image();
        img.src = url;

        img.onload = () => {
            const aspectRatio = img.height / img.width;

            const pageWidth = 595;
            const MAX_FOOTER_HEIGHT = 80; // 🔥 IMPORTANT

            const calculatedHeight = Math.min(
                pageWidth * aspectRatio,
                MAX_FOOTER_HEIGHT
            );

            setFooterHeight(calculatedHeight);
            setIsReady(true);
        };
    }, [FooterImg]);
    const state = location.state || {};
    const TermsID = state.TermsID || "";
    const SectionID = state.MilestoneID || "";
    const ProjectID = state.projectID || "";
    const HeaderID = state.HeaderID || "";
    const GroupID = state.GroupID || "";

    const empID = sessionStorage.getItem("EmpId");
    const compID = sessionStorage.getItem("compID");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        dispatch(weeklyclasscaledarGet({
            ProjectID: ProjectID,
            HeaderID: HeaderID,
            TermID: TermsID,
            CompanyID: compID,
            GroupID: GroupID,
        }));
    }, []);

    const WCrows = useSelector((state) => state.exploreApi.explorerowData);
    const calendarData = useSelector((state) => state.exploreApi.Data);
    const breakSlots = Array.isArray(calendarData?.BreakSlots)
        ? calendarData.BreakSlots
        : [];

    // Inject renderCell into every column to show a styled chip
    const rawColumns = useSelector((state) => state.exploreApi.explorecolumnData);
    const WEEKcolumns = (rawColumns || []).map((col) => ({
        ...col,
        renderCell: (params) =>
            params.value ? (
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f2ff",
                        color: "#3a3a6e",
                        borderRadius: "6px",
                        px: 1.2,
                        py: 0.4,
                        fontSize: "11px",
                        fontWeight: 500,
                        whiteSpace: "normal",
                        textAlign: "center",
                        lineHeight: 1.4,
                    }}
                >
                    {params.value}
                </Box>
            ) : null,
    }));

    const WEEKloading = useSelector((state) => state.exploreApi.loading);

    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData.Warningmsg[props],
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
                    navigate(-1);
                }
            } else {
                return;
            }
        });
    };

    return (
        <React.Fragment>
            {/* ── Top Bar ── */}
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    background: "#F2F0F0",
                    height: "50px",
                    margin: "0px 10px"
                }}
            >
                <Box display="flex" justifyContent="space-between">
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
                                    color="black"
                                    sx={{
                                        cursor: "default",
                                        marginLeft: "10px",
                                        fontSize: "19px",
                                    }}
                                >
                                    {/* Timetable{" "} ({state.Description || ""}) */}
                                    {/* Timetable({state.projectName} || {state.MilestoneName}) */}
                                    Timetable({state.projectName} || {state.TermName})

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

            {/* ── Main Card ── */}
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    p: 3,
                    borderRadius: "12px",
                    border: "0.5px solid #e2e2e8",
                    margin: "10px",
                    background: "#ffffff",
                }}
            >
                <Box
                    sx={{
                        height: 400,
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
                            alignItems: "center",
                            justifyContent: "center",
                        },
                        "& .MuiDataGrid-cell:last-of-type": {
                            borderRight: "none",
                        },
                        "& .MuiDataGrid-cellContent": {
                            whiteSpace: "pre-line",
                            wordBreak: "break-word",
                            overflow: "visible",
                            textOverflow: "unset",
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
                        rowHeight={50}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
                        }
                    />
                </Box>

                {/* ── Intervals ── */}
                <Box
                    sx={{
                        mt: 2,
                        borderTop: "1px solid #eaeaf2",
                        pt: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                            mb: 1.5,
                            fontSize: "13px",
                            color: "#444",
                        }}
                    >
                        Intervals
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                        {breakSlots.map((slot, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 2,
                                    py: 0.8,
                                    borderRadius: "20px",
                                    background: "#1e1e3a",
                                    border: "none",
                                }}
                            >
                                <Typography sx={{ fontSize: "12px", color: "#a8b2d8", fontWeight: 400 }}>
                                    {slot.SlotText}
                                </Typography>
                                <Typography sx={{ fontSize: "13px", color: "#5a6080" }}>
                                    →
                                </Typography>
                                <Typography sx={{ fontSize: "12px", color: "#dde2f5", fontWeight: 500 }}>
                                    {slot.SlotName}
                                </Typography>
                            </Box>
                        ))}
                    </Box>



                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                        <PDFDownloadLink
                            document={
                                <ProjectTimeTablePDF
                                    rows={WCrows}
                                    columns={WEEKcolumns}
                                    breakSlots={breakSlots}
                                    projectName={state.projectName}
                                    termName={state.TermName}
                                    filters={{
                                        Imageurl: baseurlUAAM,
                                        HeaderImg: HeaderImg,
                                        FooterImg: FooterImg,
                                    }}
                                    footerHeight={footerHeight}
                                />
                            }
                            fileName={`Timetable_${state.projectName || "report"}.pdf`}
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
                        <Button
                            variant="contained"
                            onClick={() => navigate(-1)}
                            // sx={{
                            //     background: "#e8550a",
                            //     color: "#fff",
                            //     borderRadius: "8px",
                            //     textTransform: "none",
                            //     fontWeight: 500,
                            //     fontSize: "13px",
                            //     px: 3,
                            //     "&:hover": { background: "#c94508" },
                            // }}
                            color="warning"
                        >
                            CANCEL
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </React.Fragment >
    );
};

export default ProjectTimeTable;