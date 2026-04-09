import React, { useEffect, useState } from "react";
import {

    Box,

    Button,
    IconButton,

    Breadcrumbs,
    Tooltip,
    Paper,
    LinearProgress
} from "@mui/material";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ArticleIcon from '@mui/icons-material/Article';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AddCardIcon from '@mui/icons-material/AddCard';
import ArchiveIcon from '@mui/icons-material/Archive';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { fetchApidata, SopTimeLineController } from "../../../store/reducers/Formapireducer";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import StrikethroughSOutlinedIcon from '@mui/icons-material/StrikethroughSOutlined';
const BatchTimeLine = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const recID = params.RecordID;
    const mode = params.Mode;

    const location = useLocation();
    const state = location.state || {};

    const accessID = params.accessID;
    const filtertype = params.filtertype
    var invFilter = params.invFilter;
    var SopID = params.id;
    // useEffect(() => {
    //     dispatch(fetchApidata('TR077', "get", recID));
    // }, []);
    const [ini, setIni] = useState(true);
    const Data = useSelector((state) => state.formApi.SOPTimelinedata);
    console.log("🚀 ~ BatchTimeLine ~ Data:", Data)

    const SOPTimelineloading = useSelector((state) => state.formApi.SOPTimelineloading);

    useEffect(() => {
        dispatch(SopTimeLineController({ SopID: SopID }));
    }, []);
    const timelineEvents = [
        {
            label: "Picked",
            date: Data?.PickedDate,
            name: Data?.PickedName,
            // icon: <ReceiptIcon />
            icon: <TaskAltOutlinedIcon />
        },
        {
            label: "Prepared",
            date: Data?.PreparedDate,
            name: Data?.PreparedName,
            // icon: <ArticleIcon />
            icon: <CachedOutlinedIcon />
        },
        {
            label: "Reviewed",
            date: Data?.ReviewedDate,
            name: Data?.ReviewedName,
            // icon: <AutoAwesomeMosaicIcon />
            icon: <RateReviewOutlinedIcon />
        },
        {
            label: "Approved",
            date: Data?.ApprovdDate,
            name: Data?.ApprovdName,
            // icon: <RoomPreferencesIcon />
            icon: <AddTaskOutlinedIcon />
        },
        {
            label: "Striked",
            date: Data?.StrikedDate,
            name: Data?.StrikedName,
            // icon: <ArchiveIcon />
            icon: <StrikethroughSOutlinedIcon />
        }
    ]
        .filter((item) => item.date) // remove null
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <React.Fragment>
            {SOPTimelineloading ? <LinearProgress/> : false}
            <Box sx={{ height: "100vh", overflow: "auto" }}>
                <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                    <Box display="flex" justifyContent="space-between" p={2}>
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
                                        navigate("/Apps/TR336/List%20Of%20SOPs");
                                    }}
                                >
                                    List Of SOPs ({state.BreadCrumb1})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(`/Apps/Secondarylistview/${params.accessID2}/SopDocument/${params.parentID1}`, { state: { ...state } });
                                    }}
                                >
                                    List of Documents ({state.BreadCrumb2})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(`/Apps/Secondarylistview/${params.accessID2}/SopDocument/${params.parentID1}/Booklet/${params.accessID1}/${params.parentID2}`, { state: { ...state } });
                                    }}
                                >
                                    List of Log Notes (Serial#{state.BreadCrumb3})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    List of Batch Reconciliation Records({state.BreadCrumb4})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Timeline
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        <Box display="flex">
                            <Tooltip title="Close">
                                <IconButton
                                    // onClick={() =>
                                    //     navigate(
                                    //         `/Apps/secondary-list/TR011/Proforma%20Invoice/${filtertype}/${invFilter}/EditProforma%20Invoice/${proformaid}/E`
                                    //     )
                                    // }
                                    color="error"
                                >
                                    <ResetTvIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <IconButton onClick={() =>
                                    navigate(
                                        `/`
                                    )
                                }>
                                    <LogoutOutlinedIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '5px 10px' }}>
                    <Typography variant="h4">Product Name - {Data?.NameoftheProduct}</Typography>
                </Box>
                <Box m="0px 20px" >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                        gap="30px"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    ></Box>
                    {/* <Timeline position="alternate">
                        <TimelineItem>
                            <TimelineSeparator>
                                <Tooltip title="Picked" arrow>
                                    <TimelineDot color="primary">
                                        <ReceiptIcon />
                                    </TimelineDot>
                                </Tooltip>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Typography variant="h4" component="span">
                                    Picked
                                </Typography>
                                <Typography>Date: {Data?.PickedDate}</Typography>
                                <Typography>By: {Data?.PickedName}</Typography>
                            </TimelineContent>

                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                                <Tooltip title="Prepared" arrow>
                                    <TimelineDot color="primary">
                                        <ArticleIcon />
                                    </TimelineDot>
                                </Tooltip>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Typography variant="h4" component="span">
                                    Prepared
                                </Typography>
                                <Typography>Date: {Data?.PreparedDate}</Typography>
                                <Typography>By: {Data?.PreparedName}</Typography>
                            </TimelineContent>

                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                                <Tooltip title="Reviewed" arrow>
                                    <TimelineDot
                                        color={Data?.Ccenddate !== "" ? "primary" : "grey"}
                                    >
                                        <AutoAwesomeMosaicIcon />
                                    </TimelineDot>
                                </Tooltip>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Typography variant="h4" component="span">
                                    Reviewed
                                </Typography>
                                <Typography>Date:{Data?.ReviewedDate}</Typography>
                                <Typography>By: {Data?.ReviewedName}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                                <Tooltip title="Approved" arrow>
                                    <TimelineDot
                                        color={Data?.Prenddate !== "" ? "primary" : "grey"}
                                    >
                                        <RoomPreferencesIcon />
                                    </TimelineDot>
                                </Tooltip>
                                <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Typography variant="h4" component="span">
                                    Approved
                                </Typography>
                                <Typography>Date: {Data?.ApprovdDate}</Typography>
                                <Typography>By: {Data?.ApprovdName}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline> */}

                    <Timeline position="alternate">

                        {timelineEvents.map((event, index) => (

                            <TimelineItem key={index}>

                                <TimelineSeparator>
                                    <TimelineConnector sx={{ bgcolor: "secondary.main" }} />

                                    <Tooltip title={event.label} arrow>
                                        <TimelineDot color="primary">
                                            {event.icon}
                                        </TimelineDot>
                                    </Tooltip>

                                    {index !== timelineEvents.length - 1 && (
                                        <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                                    )}
                                </TimelineSeparator>

                                <TimelineContent sx={{ py: "12px", px: 2 }}>
                                    <Typography variant="h4" component="span">
                                        {event.label}
                                    </Typography>

                                    <Typography>Date: {event.date}</Typography>

                                    <Typography>By: {event.name}</Typography>
                                </TimelineContent>

                            </TimelineItem>

                        ))}

                    </Timeline>
                    <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                        <Button
                            color="warning"
                            variant="contained"
                            onClick={() => {
                                navigate(
                                    -1
                                );
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default BatchTimeLine;

