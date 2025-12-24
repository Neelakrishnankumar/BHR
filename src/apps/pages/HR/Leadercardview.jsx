import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
// import AssistantIcon from "@mui/icons-material/Assistant";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import axios from "axios";
import { useSelector } from "react-redux";
import CategoryIcon from "@mui/icons-material/Category";
import GridViewIcon from "@mui/icons-material/GridView";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const LeaderCardView = () => {
  // const { id } = useParams();
  const location = useLocation();
  const { partyID } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [partyName, setPartyName] = useState(""); // ✅ new state for party name
  const listViewUrl = useSelector((store) => store.globalurl.listViewurl);
  const state = location.state || {};
  console.log(state, "state");

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

          //  Set the Party Name (assuming it’s the same for all rows)
          if (rows.length > 0 && rows[0].PartyName) {
            setPartyName(rows[0].PartyName);
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
    navigate(
      `/Apps/Secondarylistview/TR304/Leader/${partyID}/${partyName}/EditLeader/-1/A/S`,
      {
        state: { ...state },
      }
    );
  };

  // const handleactivitylistview = () => {
  //     navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${partyID}`);
  // };
  // const handleactivitylistview = (recordID, partyID) => {
  //     // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${partyID}/${recordID}`);
  //     navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${recordID}/T`);
  // };

  const handleactivitylistview = (
    recordID,
    partyID,
    leadTitle,
    PartyName,
    LEStatus
  ) => {
    navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${recordID}/T`, {
      state: {
        PartyID: partyID,
        LeadTitle: leadTitle,
        PartyName: PartyName,
        LEStatus: LEStatus,
      },
    });
  };

//  const handleorderscreen = (recordID, partyID, leadTitle, PartyName, LEStatus, OrdHdrCount) => {
//         // if (OrdHdrCount == 0) {
//             // Case 1: No order yet → go to Add Order
//             navigate(`/Apps/Secondarylistview/TR310/Order/${recordID}/Leader/EditOrder/-1/A`, {
//                 state: {
//                     PartyID: partyID,
//                     LeadTitle: leadTitle,
//                     PartyName: PartyName,
//                     LEStatus: LEStatus,
//                     OrderCount: OrdHdrCount,
//                 },
//             // });
 
//         }
//     )
  
  const handleorderscreen = (
    recordID,
    partyID,
    leadTitle,
    PartyName,
    LEStatus,
    OrdHdrCount,
    OrderCount,
  ) => {
    if (OrderCount == 0) {
      // Case 1: No order yet → go to Add Order
      navigate(
        `/Apps/Secondarylistview/TR310/Order/${recordID}/Leader/O/EditOrder/-1/A`,
        {
          state: {
            PartyID: partyID,
            LeadTitle: leadTitle,
            PartyName: PartyName,
            LEStatus: LEStatus,
            OrderCount: OrderCount,
          },
        }
      );
    } else if (OrderCount >= 1) {
      // Case 2: Existing order(s) → go to Order List or Edit
      navigate(`/Apps/Secondarylistview/TR310/Order/${recordID}/Leader/O`, {
        state: {
          PartyID: partyID,
          LeadTitle: leadTitle,
          PartyName: PartyName,
          LEStatus: LEStatus,
          OrderCount: OrderCount,
        },
      });
    }
  };
  const handleorderscreen1 = (
    recordID,
    partyID,
    leadTitle,
    PartyName,
    LEStatus,
    OrdHdrCount,
    QuotationCount
  ) => {
    if (QuotationCount == 0) {
      // Case 1: No order yet → go to Add Order
      navigate(
        `/Apps/Secondarylistview/TR310/Order/${recordID}/Leader/Q/EditOrder/-1/A`,
        {
          state: {
            PartyID: partyID,
            LeadTitle: leadTitle,
            PartyName: PartyName,
            LEStatus: LEStatus,
            OrderCount: QuotationCount,
          },
        }
      );
    } else if (QuotationCount >= 1) {
      // Case 2: Existing order(s) → go to Order List or Edit
      navigate(`/Apps/Secondarylistview/TR310/Order/${recordID}/Leader/Q`, {
        state: {
          PartyID: partyID,
          LeadTitle: leadTitle,
          PartyName: PartyName,
          LEStatus: LEStatus,
          OrderCount: QuotationCount,
        },
      });
    }
  };
  const handleorderitemscreen = (
    recordID,
    partyID,
    leadTitle,
    PartyName,
    LEStatus
  ) => {
    navigate(
      `/Apps/Secondarylistview/TR306/Orderitem/${recordID}/EditOrderitem/-1/A`,
      {
        state: {
          PartyID: partyID,
          LeadTitle: leadTitle,
          PartyName: PartyName,
          LEStatus: LEStatus,
        },
      }
    );
  };

  const handleCancel = () => {
    // navigate("/Apps/TR243/Party");
    navigate("/Apps/TR321/Party");
  };

  return (
    <Box p={3}>
      {/* Top Cancel icon */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Tooltip title="Close">
        <IconButton color="error" onClick={handleCancel}>
          <CancelIcon />
        </IconButton>
        </Tooltip>
      </Box>

      {/* ✅ Title with Party Name beside "Leader Details" */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Leads
          </Typography>
          {partyName && (
            <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 700 }}>
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
                    #SL: {index + 1} {row.LeadTitle || ""}
                  </Typography>
                  <Typography>
                    <strong>Product Name:</strong> {row.ProjectName || ""}
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
                  <Typography>
                    <strong>No of Visits:</strong> {row.NoOfVisits || ""}
                  </Typography>
                  <Typography>
                    <strong>Next Visit Date:</strong> {row.NextVisitDate || ""}
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
                    {/* <IconButton
                                            color="primary"
                                            onClick={() => handleactivitylistview(row.RecordID, row.PartyID)} // ✅ pass both
                                            size="small"
                                            // disabled={row.LEStatus === "Close"}
                                        >
                                            <ListAltOutlinedIcon sx={{ fontSize: 30 }} />
                                        </IconButton> */}
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleactivitylistview(
                          row.RecordID,
                          row.PartyID,
                          row.LeadTitle,
                          row.PartyName,
                          row.LEStatus
                        )
                      }
                      size="small"
                      //disabled={row.LEStatus === "Close"}
                    >
                      <ListAltOutlinedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                  {row.LEStatus === "Close" && (
                    <>
                      <Tooltip title="Order">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleorderscreen(
                              row.RecordID,
                              row.PartyID,
                              row.LeadTitle,
                              row.PartyName,
                              row.LEStatus,
                              row.OrdHdrCount,
                              row.OrderCount,
                            )
                          }
                          size="small"
                        >
                          <CategoryIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Quotation">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleorderscreen1(
                              row.RecordID,
                              row.PartyID,
                              row.LeadTitle,
                              row.PartyName,
                              row.LEStatus,
                              row.OrdHdrCount,
                              row.QuotationCount
                            )
                          }
                          size="small"
                        >
                          <RequestQuoteOutlinedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  {row.LEStatus === "Opt to Order" && (
                    
                      <Tooltip title="Order">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleorderscreen(
                              row.RecordID,
                              row.PartyID,
                              row.LeadTitle,
                              row.PartyName,
                              row.LEStatus,
                              row.OrdHdrCount,
                              row.OrderCount,
                            )
                          }
                          size="small"
                        >
                          <CategoryIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                    
                  )}
                  {row.LEStatus === "Opt to Quote" && (
                    
                       <Tooltip title="Quotation">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleorderscreen1(
                              row.RecordID,
                              row.PartyID,
                              row.LeadTitle,
                              row.PartyName,
                              row.LEStatus,
                              row.OrdHdrCount,
                              row.QuotationCount
                            )
                          }
                          size="small"
                        >
                          <RequestQuoteOutlinedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                    
                  )}
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
