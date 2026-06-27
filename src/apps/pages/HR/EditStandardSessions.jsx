import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Divider,
    Paper,
    Breadcrumbs,
    useMediaQuery,
    Tooltip,
    CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProSidebar } from "react-pro-sidebar";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Swal from "sweetalert2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import { TaskSessionGet, TaskSessionUpdate } from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import SessionAccordion from "./SessionAccordion";

// Example shape coming from API:
// { recordID, subject, sessionName, sessionDescription }
const MOCK_SESSIONS = [
    { recordID: 1, subject: "Mathematics", sessionName: "Algebra Basics", sessionDescription: "Intro to variables and equations" },
    { recordID: 2, subject: "Mathematics", sessionName: "Quadratic Equations", sessionDescription: "Solving and graphing" },
    { recordID: 3, subject: "Physics", sessionName: "Newton's Laws", sessionDescription: "Three laws of motion explained" },
    { recordID: 4, subject: "Physics", sessionName: "Kinematics", sessionDescription: "Motion in one dimension" },
];

export default function EditStandardSessions() {
    const navigate = useNavigate();
    let params = useParams();

    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const rowData = location.state || {};
    const ProjectID = rowData.ProjectID;
    const HeaderID = rowData.HeaderID;
    const TermID = rowData.TermID;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    var mode = params.Mode;
    const [sessions, setSessions] = useState({});
    const [editingSession, setEditingSession] = useState(null); // holds the row being edited
    const [formData, setFormData] = useState({ RecordID: "", sessionDescription: "" });
    const [expandedSubject, setExpandedSubject] = useState(false);
    const [errorMsgData, setErrorMsgData] = useState(null);

    const sessionLoadingGet = useSelector((state) => state.formApi.TaskSessionGetloading)
    // Group sessions by subject
    // const groupedBySubject = useMemo(() => {
    //     return sessions.reduce((acc, session) => {
    //         if (!acc[session.subject]) acc[session.subject] = [];
    //         acc[session.subject].push(session);
    //         return acc;
    //     }, {});
    // }, [sessions]);

    const fetchSessions = async () => {
        try {
            const response = await dispatch(
                TaskSessionGet({
                    ProjectID: ProjectID,
                    TermID: TermID,
                    HeaderID: HeaderID,
                })
            );

            if (response?.payload?.Status === "Y") {
                setSessions(response?.payload?.data || []);
            } else {
                setSessions({});
                toast.error(response?.payload?.Msg || "No data available");
            }
        } catch (error) {
            setSessions({});
        }
    };

    useEffect(() => {
        if (!HeaderID || !ProjectID || !TermID) return;

        fetchSessions();
    }, [HeaderID, ProjectID, TermID, dispatch]);
    // const handleAccordionChange = (subject) => (event, isExpanded) => {
    //     setExpandedSubject(isExpanded ? subject : false);
    // };
    const handleAccordionChange = useCallback((subject, isExpanded) => {
        setExpandedSubject(isExpanded ? subject : false);
    }, []);

    const handleEditClick = useCallback((session) => {
        setEditingSession(session);

        setFormData({
            RecordID: session.recordID,
            sessionDescription: session.sessionDescription,
        });
    }, []);

    // const handleFormChange = (field) => (event) => {
    //     setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    // };
    const handleFormChange = useCallback(
        (field) => (event) => {
            setFormData((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        },
        []
    );

    const handleCancel = useCallback(() => {
        setEditingSession(null);
    }, []);

    const handleSave = async (values) => {
        if (!values.sessionDescription) {
            toast.error("Please enter Session Description");
            return;
        }

        const response = await dispatch(TaskSessionUpdate({ RecordID: values.RecordID, sessionDescription: values.sessionDescription }));
        if (response.payload.Status === "Y") {
            setEditingSession(null);
            toast.success("Session Edited Successfully");
            await fetchSessions();
        }
        else {
            toast.error(response.payload.Message || response.payload.Msg || "Something went wrong")
        }
        // setSessions((prev) =>
        //     prev.map((s) =>
        //         s.recordID === editingSession.recordID
        //             ? {
        //                 ...s,
        //                 // sessionName: formData.sessionName, 
        //                 sessionDescription: formData.sessionDescription
        //             }
        //             : s
        //     )
        // );
        // setEditingSession(null);
    };

    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData?.Warningmsg?.[props] || "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: props,
        }).then((result) => {
            if (result.isConfirmed) {
                if (props === "Logout") navigate("/");
                if (props === "Close") navigate(-1);
            }
        });
    };

    return (
        <React.Fragment>

            <Paper
                elevation={3}
                sx={{ margin: "0px 10px", background: "#F2F0F0", height: "50px" }}
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
                                    color="#0000D1"
                                    sx={{
                                        cursor: "default",
                                        marginLeft: "10px",
                                        fontSize: "17px",
                                    }}
                                    // onClick={() => {
                                    //     is003Subscription
                                    //         ? navigate("/Apps/TR133/Classes")
                                    //         : navigate("/Apps/TR133/Project");
                                    // }}
                                    onClick={() => {
                                            navigate(`/Apps/SecondarylistView/TR275/Project/${params.YearID}`,{ state: { ...rowData } });
                                    }}
                                >
                                    List Of Standard/Activities ({rowData.BreadCrumb1 || ""})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{
                                        cursor: "default",
                                        marginLeft: "10px",
                                        fontSize: "17px",
                                    }}
                                    onClick={() => navigate(-1)}
                                >
                                    {mode == "A"
                                        ? "List Of Time Table"
                                        : `List Of Time Table (${rowData.BreadCrumb2 || ""})`}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{
                                        cursor: "default",
                                        marginLeft: "10px",
                                        fontSize: "17px",
                                    }}
                                    onClick={() => navigate(-1)}
                                >
                                    List Of Sessions
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
            <Paper elevation={3} sx={{ minHeight: "80vh", margin: "10px" }}>
                {sessionLoadingGet ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}> <CircularProgress /></Box> :
                    (<Box sx={{ p: 2 }}>
                        {Object.entries(sessions).map(([subject, subjectSessions]) => (
                            // <Accordion
                            //     key={subject}
                            //     expanded={expandedSubject === subject}
                            //     onChange={handleAccordionChange(subject)}
                            //     sx={{ mb: 1 }}
                            // >
                            //     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            //         <Typography sx={{ fontWeight: 500 }}>{subject}</Typography>
                            //         <Chip
                            //             label={subjectSessions.length}
                            //             size="small"
                            //             sx={{ ml: 1.5 }}
                            //         />
                            //     </AccordionSummary>

                            //     <AccordionDetails sx={{ p: 0 }}>
                            //         <List disablePadding>
                            //             {subjectSessions.map((session, idx) => (
                            //                 <React.Fragment key={session.recordID}>
                            //                     <ListItem
                            //                         secondaryAction={
                            //                             <IconButton edge="end" onClick={() => handleEditClick(session)}>
                            //                                 <EditIcon fontSize="small" />
                            //                             </IconButton>
                            //                         }
                            //                     >
                            //                         {/* <ListItemText
                            //                             primary={session.sessionName}
                            //                             secondary={session.sessionDescription}
                            //                         /> */}
                            //                         <ListItemText
                            //                             primary={session.sessionDescription}
                            //                             secondary={`${session.Date} • ${session.Teacher}`}
                            //                         />
                            //                     </ListItem>
                            //                     {idx < subjectSessions.length - 1 && <Divider component="li" />}
                            //                 </React.Fragment>
                            //             ))}
                            //         </List>
                            //     </AccordionDetails>
                            // </Accordion>
                            <SessionAccordion
                                key={subject}
                                subject={subject}
                                sessions={subjectSessions}
                                expanded={expandedSubject === subject}
                                onExpand={handleAccordionChange}
                                onEdit={handleEditClick}
                            />
                        ))}

                        {/* Edit Dialog */}
                        <Dialog open={Boolean(editingSession)} onClose={handleCancel} fullWidth maxWidth="sm">
                            <DialogTitle>Edit Session</DialogTitle>
                            <DialogContent>
                                {editingSession && (
                                    <>
                                        <Box>
                                            <Chip
                                                label={editingSession.subject}
                                                size="small"
                                                sx={{ mb: 1 }}
                                            />

                                            <Typography sx={{ mb: 1 }}>
                                                {editingSession?.Date || ""} - {editingSession?.Teacher || ""}
                                            </Typography>

                                        </Box>
                                    </>
                                )}
                                <TextField
                                    label={
                                        <>
                                            Session Description
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>

                                        </>
                                    }
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={formData.sessionDescription}
                                    onChange={handleFormChange("sessionDescription")}
                                    focused
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="warning" onClick={handleCancel}>Cancel</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleSave(formData)}>
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>)}
            </Paper>

        </React.Fragment>
    );
}