// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
// import axios from "axios";

// const LeaderCardView = () => {
//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchLeaderData = async () => {
//       setLoading(true);
//       try {
//         // 🟢 Construct payload
//         const payload = {
//           Query: {
//             AccessID: "TR303",
//             ScreenName: "Leader",
//             Filter: `PartyID='${id}'`,
//             Any: "",
//           },
//         };

//         // 🟢 Encode payload
//         const url = `https://bosuat.beyondexs.com/api/wslistview_mysql.php?data=${encodeURIComponent(
//           JSON.stringify(payload)
//         )}`;

//         // 🟢 Retrieve token (adjust key name to match your app)
//         const token = localStorage.getItem("token");

//         // 🟢 Make GET request with headers
//         const response = await axios.get(url, {
//           headers: {
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
//     },
//         });

//         if (response.data.Status === "Y" && response.data.Data?.rows) {
//           setData(response.data.Data.rows);
//         } else {
//           setData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching leader data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderData();
//   }, [id]);

//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom>
//         Leader Details
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : data.length === 0 ? (
//         <Typography>No data available.</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {data.map((row, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   p: 2,
//                   borderRadius: 3,
//                   boxShadow: 3,
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <CardContent>
//                   {/* <Typography variant="h6" gutterBottom>
//                     {row.Party}
//                   </Typography> */}
//                   <Typography><strong>First Call Date:</strong> {row.FirstCallDate}</Typography>
//                   <Typography><strong>First Call Comments:</strong> {row.FirstCallComments}</Typography>
//                   <Typography><strong>Last Call Date:</strong> {row.LastCallDate}</Typography>
//                   <Typography><strong>Last Call Comments:</strong> {row.LastCallComments}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
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
import { AddCircle, Cancel } from "@mui/icons-material";
import AssistantIcon from '@mui/icons-material/Assistant';
import axios from "axios";
import store from "../../..";
import { useSelector } from "react-redux";
const LeaderCardView = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // for navigation
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const listViewUrl = useSelector((store) => store.globalurl.listViewurl);

    useEffect(() => {
        const fetchLeaderData = async () => {
            setLoading(true);
            try {
                const payload = {
                    Query: {
                        AccessID: "TR303",
                        ScreenName: "Leader",
                        Filter: `PartyID='${id}'`,
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
                    setData(response.data.Data.rows);
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
    }, [id]);
    const handleAdd = () => {
        // navigate(`/Apps/Secondarylistview/TR303/Leader/EditLeader/${id}/A`);
        navigate(`/Apps/Secondarylistview/TR304/Leader/${id}/EditLeader/-1/A`)
    };
   const handleactivitylistview = () => {
            navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${id}`);

 }; 
    // Navigate back to previous page
    const handleCancel = () => {
        navigate(-1); // go back
    };

    return (
        <Box p={3}>
            {/* Top Cancel icon */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                </IconButton>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Leader Details
                </Typography>
                <Box>
                <Tooltip title="Add Activity">                   
                <IconButton color="primary" onClick={handleAdd} size="small">
                    <AddCircle sx={{ fontSize: 32 }} />
                </IconButton>
                </Tooltip>
                <Tooltip title="Marketing Activity">                   
                <IconButton color="primary" onClick={handleactivitylistview} size="small">
                    <AssistantIcon sx={{ fontSize: 32 }} />
                </IconButton>
                 </Tooltip>
                </Box>
            </Box>

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
                                        SL No: {index + 1}
                                    </Typography>
                                    <Typography>
                                        <strong>Party Name:</strong>{" "}
                                        {row.Party || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>First Call Date:</strong>{" "}
                                        {row.FirstCallDate || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>First Call Comments:</strong>{" "}
                                        {row.FirstCallComments || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Last Call Date:</strong>{" "}
                                        {row.LastCallDate || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Last Call Comments:</strong>{" "}
                                        {row.LastCallComments || ""}
                                    </Typography>
                                    <Typography>
                                        <strong>Status:</strong>{" "}
                                        {row.LEStatus|| ""}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Bottom Cancel button */}
            <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
            >
                <Button variant="contained" color="warning" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>

        </Box>
    );
};

export default LeaderCardView;
