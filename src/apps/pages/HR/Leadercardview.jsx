// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     CircularProgress,
//     IconButton,
//     Button,
//     Tooltip,
// } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { AddCircle, Cancel } from "@mui/icons-material";
// import AssistantIcon from '@mui/icons-material/Assistant';
// import axios from "axios";
// import store from "../../..";
// import { useSelector } from "react-redux";
// const LeaderCardView = () => {
//     const { id } = useParams();
//     const navigate = useNavigate(); // for navigation
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const listViewUrl = useSelector((store) => store.globalurl.listViewurl);

//     useEffect(() => {
//         const fetchLeaderData = async () => {
//             setLoading(true);
//             try {
//                 const payload = {
//                     Query: {
//                         AccessID: "TR303",
//                         ScreenName: "Leader",
//                         Filter: `PartyID='${id}'`,
//                         Any: "",
//                     },
//                 };

//                 const url = `${listViewUrl}?data=${encodeURIComponent(
//                     JSON.stringify(payload)
//                 )}`;
//                 const response = await axios.get(url, {
//                     headers: {
//                         Authorization:
//                             "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
//                     },
//                 });

//                 if (response.data.Status === "Y" && response.data.Data?.rows) {
//                     setData(response.data.Data.rows);
//                 } else {
//                     setData([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching leader data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLeaderData();
//     }, [id]);
//     const handleAdd = () => {
//         // navigate(`/Apps/Secondarylistview/TR303/Leader/EditLeader/${id}/A`);
//         navigate(`/Apps/Secondarylistview/TR304/Leader/${id}/EditLeader/-1/A`)
//     };
//    const handleactivitylistview = () => {
//             navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${id}`);

//  }; 
//     // Navigate back to previous page
//     const handleCancel = () => {
//         navigate(-1); // go back
//     };

//     return (
//         <Box p={3}>
//             {/* Top Cancel icon */}
//             <Box display="flex" justifyContent="flex-end" mb={2}>
//                 <IconButton color="error" onClick={handleCancel}>
//                     <CancelIcon />
//                 </IconButton>
//             </Box>

//             <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>
//                     Leader Details
//                 </Typography>
//                 <Box>
//                 <Tooltip title="Add Activity">                   
//                 <IconButton color="primary" onClick={handleAdd} size="small">
//                     <AddCircle sx={{ fontSize: 32 }} />
//                 </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Marketing Activity">                   
//                 <IconButton color="primary" onClick={handleactivitylistview} size="small">
//                     <AssistantIcon sx={{ fontSize: 32 }} />
//                 </IconButton>
//                  </Tooltip>
//                 </Box>
//             </Box>

//             {loading ? (
//                 <Box display="flex" justifyContent="center" mt={4}>
//                     <CircularProgress />
//                 </Box>
//             ) : data.length === 0 ? (
//                 <Typography>No data available.</Typography>
//             ) : (
//                 <Grid container spacing={2}>
//                     {data.map((row, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                             <Card
//                                 sx={{
//                                     p: 2,
//                                     borderRadius: 3,
//                                     boxShadow: 4,
//                                     background: index % 2 === 0 ? "#E3F2FD" : "#FCE4EC",
//                                     transition: "all 0.3s ease",
//                                     "&:hover": {
//                                         transform: "scale(1.03)",
//                                         boxShadow: 6,
//                                         background: index % 2 === 0 ? "#BBDEFB" : "#F8BBD0",
//                                     },
//                                 }}
//                             >
//                                 <CardContent>
//                                     <Typography
//                                         variant="h6"
//                                         sx={{ mb: 1, color: "#1565C0", fontWeight: "bold" }}
//                                     >
//                                         SL No: {index + 1}
//                                     </Typography>
//                                     {/* <Typography>
//                                         <strong>Party Name:</strong>{" "}
//                                         {row.Party || ""}
//                                     </Typography> */}
//                                     <Typography>
//                                         <strong>First Call Date:</strong>{" "}
//                                         {row.FirstCallDate || ""}
//                                     </Typography>
//                                     <Typography>
//                                         <strong>First Call Comments:</strong>{" "}
//                                         {row.FirstCallComments || ""}
//                                     </Typography>
//                                     <Typography>
//                                         <strong>Last Call Date:</strong>{" "}
//                                         {row.LastCallDate || ""}
//                                     </Typography>
//                                     <Typography>
//                                         <strong>Last Call Comments:</strong>{" "}
//                                         {row.LastCallComments || ""}
//                                     </Typography>
//                                     <Typography>
//                                         <strong>Status:</strong>{" "}
//                                         {row.LEStatus|| ""}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}

//             {/* Bottom Cancel button */}
//             <Box
//                 display="flex"
//                 justifyContent="flex-end"
//                 mt={4}
//             >
//                 <Button variant="contained" color="warning" onClick={handleCancel}>
//                     Cancel
//                 </Button>
//             </Box>

//         </Box>
//     );
// };

// export default LeaderCardView;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    IconButton,
    Button,
    Tooltip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { AddCircle } from "@mui/icons-material";
import AssistantIcon from "@mui/icons-material/Assistant";
import axios from "axios";
import { useSelector } from "react-redux";

const LeaderCardView = () => {
    // const { id } = useParams();
    const { recordID, partyID } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [partyName, setPartyName] = useState(""); // ✅ new state for party name
    const listViewUrl = useSelector((store) => store.globalurl.listViewurl);

    useEffect(() => {
        const fetchLeaderData = async () => {
            setLoading(true);
            try {
                const payload = {
                    Query: {
                        AccessID: "TR303",
                        ScreenName: "Leader",
                        Filter: `PartyID='${partyID}'`,
                        Any: "",
                    },
                };

                const url = `${listViewUrl}?data=${encodeURIComponent(
                    JSON.stringify(payload)
                )}`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization:
                            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
                    },
                });

                if (response.data.Status === "Y" && response.data.Data?.rows) {
                    const rows = response.data.Data.rows;
                    setData(rows);

                    // ✅ Set the Party Name (assuming it’s the same for all rows)
                    if (rows.length > 0 && rows[0].Party) {
                        setPartyName(rows[0].Party);
                    }
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching leader data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderData();
    }, [partyID, listViewUrl]);

    const handleAdd = () => {
        navigate(`/Apps/Secondarylistview/TR304/Leader/${partyID}/EditLeader/-1/A/S`);
    };

    // const handleactivitylistview = () => {
    //     navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${partyID}`);
    // };
    const handleactivitylistview = (recordID, partyID) => {
        // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${partyID}/${recordID}`);
         navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${recordID}/T`);
   };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box p={3}>
            {/* Top Cancel icon */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                </IconButton>
            </Box>

            {/* ✅ Title with Party Name beside "Leader Details" */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Leader Details
                    </Typography>
                    {partyName && (
                        <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", fontWeight: 800 }}
                        >
                            ({partyName})
                        </Typography>
                    )}
                </Box>

                <Box>
                    <Tooltip title="Add Activity">
                        <IconButton color="primary" onClick={handleAdd} size="small">
                            <AddCircle sx={{ fontSize: 32 }} />
                        </IconButton>
                    </Tooltip>

                </Box>
            </Box>

            {/* Data Section */}
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : data.length === 0 ? (
                <Typography>No data available.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {data.map((row, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: 4,
                                    background: index % 2 === 0 ? "#E3F2FD" : "#FCE4EC",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                        boxShadow: 6,
                                        background: index % 2 === 0 ? "#BBDEFB" : "#F8BBD0",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 1, color: "#1565C0", fontWeight: "bold" }}
                                    >
                                        #SL: {index + 1}   {row.LeadTitle || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Project Name:</strong>  {row.ProjectName || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>First Call Date:</strong> {row.FirstCallDate || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>First Call Comments:</strong>{" "}
                                        {row.FirstCallComments || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Last Call Date:</strong> {row.LastCallDate || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Last Call Comments:</strong>{" "}
                                        {row.LastCallComments || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Status:</strong> {row.LEStatus || ""}
                                    </Typography>
                                </CardContent>
                                <Box display="flex" justifyContent="flex-end" mt={-4}>
                                    <Tooltip title="Marketing Activity">
                                        {/* <IconButton
                                            color="primary"
                                            onClick={handleactivitylistview}
                                            size="small"
                                            disabled={row.LEStatus === "Close"}
                                        >
                                            <AssistantIcon sx={{ fontSize: 30 }} />
                                        </IconButton> */}
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleactivitylistview(row.RecordID, row.PartyID)} // ✅ pass both
                                            size="small"
                                            disabled={row.LEStatus === "Close"}
                                        >
                                            <AssistantIcon sx={{ fontSize: 30 }} />
                                        </IconButton>

                                    </Tooltip>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Bottom Cancel button */}
            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button variant="contained" color="warning" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default LeaderCardView;

