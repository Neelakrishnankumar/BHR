// import React from "react";

// const Logopage = () => {
//   return (
//     <div style={{
//         display: "flex",
//         flexDirection: "column",  // Stack items vertically
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh"
//       }}>
//         {/* <img src="/bexlogo.jpg" alt="Logo" style={{ width: "300px", height: "auto" }} /> */}
//         <img src="/BexATM.png" alt="Logo" style={{ width: "300px", height: "auto" }} />
//         <h3 style={{ marginTop: "10px" }}>Back Office System</h3>
//       </div>

//   );
// };

// export default Logopage;
import React, { useState, useEffect, useMemo } from "react";
import BackOfficelogoV1 from "../assets/img/B2025-ATM01.png"; // adjust path if needed
// import store from "../redux/store"; // adjust path if needed
import store from "..";
import { useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CloseIcon from "@mui/icons-material/Close";

// const CelebrationReminder = () => {
//   const [celebrations, setCelebrations] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isDismissed, setIsDismissed] = useState(false); // ADD
//   useEffect(() => {
//     try {
//       const storedData = sessionStorage.getItem("BirthdayAnniversary");

//       if (!storedData) {
//         setCelebrations([]);
//         return;
//       }

//       const parsedData = JSON.parse(storedData);

//       const data = Array.isArray(parsedData)
//         ? parsedData
//         : parsedData?.Data || parsedData?.rows || [];

//       if (Array.isArray(data) && data.length > 0) {
//         setCelebrations(data);
//         setShowPopup(true);
//       }
//     } catch (error) {
//       console.error("Error reading celebration data:", error);
//       setCelebrations([]);
//       setShowPopup(false);
//     }
//   }, []);
//   if (!showPopup || celebrations.length === 0) {
//     return null;
//   }

//   const getEventDetails = (item) => {
//     const eventType = item?.EventType || "";

//     const eventDateParts = item?.EventDate
//       ? item.EventDate.split("-")
//       : [];

//     const eventDay = eventDateParts[0];
//     const eventMonth = eventDateParts[1];

//     const today = new Date();

//     const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
//     const currentDay = String(today.getDate()).padStart(2, "0");

//     const isToday =
//       eventMonth === currentMonth && eventDay === currentDay;

//     // ✅ Keep the complete DD-MM-YYYY date
//     // const formattedDate = item?.EventDate || "";
//     const formattedDate =
//       eventDay && eventMonth
//         ? `${eventDay}-${eventMonth}`
//         : "";
//     const isBirthday = eventType === "Birthday";

//     return {
//       isBirthday,
//       isToday,
//       formattedDate,
//     };
//   };

//   const getDescription = (item, details) => {
//     const classification = item?.ClassificationDesc || "";
//     const standard = item?.Standard || "";

//     let role = "";

//     if (classification === "Teaching Staff") {
//       role = standard ? `${standard} Teacher` : "Teacher";
//     } else if (classification === "Student") {
//       // ✅ Show Standard for Student
//       role = standard ? `${standard} Student` : "Student";
//     } else if (classification) {
//       role = classification;
//     } else {
//       role = "Staff";
//     }

//     const eventText = details.isBirthday
//       ? "Birthday"
//       : `${item?.EventDate ? getAnniversaryYears(item.EventDate) : ""}-year work anniversary`;

//     return `${role} • ${eventText}`;
//   };

//   const getAnniversaryYears = (eventDate) => {
//     if (!eventDate) return "";

//     const parts = eventDate.split("-");
//     const eventYear = Number(parts[2]); // ✅ DD-MM-YYYY → YYYY

//     if (!eventYear) return "";

//     const currentYear = new Date().getFullYear();

//     return currentYear - eventYear;
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: { xs: 12, sm: 20 },
//         right: { xs: 10, sm: 20 },
//         width: {
//           xs: "calc(100vw - 20px)",
//           sm: 380,
//         },
//         maxWidth: "380px",
//         backgroundColor: "#fff",
//         borderRadius: "15px",
//         boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
//         borderLeft: "4px solid #D9A441",
//         zIndex: 9999,
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "space-between",
//           padding: "18px 16px 10px 20px",
//         }}
//       >
//         <Box>
//           <Box
//             sx={{
//               fontFamily: "Georgia, serif",
//               fontSize: "19px",
//               fontWeight: 700,
//               color: "#29443D",
//               lineHeight: 1.2,
//             }}
//           >
//             Birthday/Work Anniversary 🎉
//           </Box>

//           <Box
//             sx={{
//               marginTop: "4px",
//               fontSize: "13px",
//               color: "#60766F",
//             }}
//           >
//             {celebrations.length}{" "}
//             {celebrations.length === 1 ? "person" : "people"}
//           </Box>
//         </Box>

//         <IconButton
//           size="small"
//           onClick={() => setShowPopup(false)}
//           sx={{
//             color: "#55716A",
//             marginTop: "-4px",
//             marginRight: "-6px",
//             "&:hover": {
//               backgroundColor: "#F3F5F4",
//             },
//           }}
//         >
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* Celebration list */}
//       <Box
//         sx={{
//           padding: "0 16px 2px 20px",
//           maxHeight: "250px",
//           overflowY: "auto",
//         }}
//       >
//         {celebrations.map((item, index) => {
//           const details = getEventDetails(item);

//           return (
//             <Box
//               key={`${item.RecordID}-${item.EventType}-${index}`}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 minHeight: "54px",
//                 padding: "5px 0",
//                 borderBottom:
//                   index !== celebrations.length - 1
//                     ? "1px solid #E8E4DE"
//                     : "none",
//               }}
//             >
//               {/* Person details */}
//               <Box
//                 sx={{
//                   minWidth: 0,
//                   paddingRight: "8px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     fontFamily: "Georgia, serif",
//                     fontSize: "16px",
//                     fontWeight: 700,
//                     color: "#29443D",
//                     lineHeight: 1.25,
//                   }}
//                 >
//                   {item?.Name || "Staff"}
//                 </Box>

//                 <Box
//                   sx={{
//                     marginTop: "2px",
//                     fontSize: "13px",
//                     color: "#58736B",
//                     lineHeight: 1.35,
//                   }}
//                 >
//                   {getDescription(item, details)}
//                   {" • "}
//                   {details.isToday
//                     ? `${details.isBirthday ? "Birthday" : "Anniversary"} today`
//                     : details.formattedDate}
//                 </Box>
//               </Box>

//               {/* Event icon */}
//               <Box
//                 sx={{
//                   minWidth: "30px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 {details.isBirthday ? (
//                   <Box
//                     component="span"
//                     sx={{
//                       fontSize: "21px",
//                       lineHeight: 1,
//                     }}
//                   >
//                     🎂
//                   </Box>
//                 ) : (
//                   <Box
//                     component="span"
//                     sx={{
//                       fontSize: "21px",
//                       lineHeight: 1,
//                     }}
//                   >
//                     🎖️
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>

//       {/* Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           padding: "8px 20px 14px",
//         }}
//       >
//         <Box
//           component="button"
//           onClick={() => setShowPopup(false)}
//           sx={{
//             border: "none",
//             background: "transparent",
//             color: "#D69A32",
//             fontSize: "14px",
//             fontWeight: 700,
//             cursor: "pointer",
//             padding: "4px 0",
//             fontFamily: "inherit",
//             "&:hover": {
//               color: "#B77D1F",
//             },
//           }}
//         >
//           Got it, thanks
//         </Box>
//       </Box>
//     </Box>
//     // <Box
//     //   sx={{
//     //     position: "fixed",
//     //     top: { xs: 16, sm: 24 },
//     //     right: { xs: 12, sm: 24 },
//     //     width: {
//     //       xs: "calc(100vw - 24px)",
//     //       sm: 425,
//     //     },
//     //     maxWidth: "425px",
//     //     backgroundColor: "#fff",
//     //     borderRadius: "18px",
//     //     boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
//     //     borderLeft: "5px solid #D9A441",
//     //     zIndex: 9999,
//     //     overflow: "hidden",
//     //   }}
//     // >
//     //   <Box
//     //     sx={{
//     //       display: "flex",
//     //       alignItems: "flex-start",
//     //       justifyContent: "space-between",
//     //       padding: "22px 20px 12px 24px",
//     //     }}
//     //   >
//     //     <Box>
//     //       <Box
//     //         sx={{
//     //           fontFamily: "Georgia, serif",
//     //           fontSize: "21px",
//     //           fontWeight: 700,
//     //           color: "#29443D",
//     //           lineHeight: 1.2,
//     //         }}
//     //       >
//     //         Birthday/Work Anniversary 🎉
//     //       </Box>

//     //       <Box
//     //         sx={{
//     //           marginTop: "5px",
//     //           fontSize: "14px",
//     //           color: "#60766F",
//     //         }}
//     //       >
//     //         {celebrations.length}{" "}
//     //         {celebrations.length === 1 ? "person" : "people"}
//     //       </Box>
//     //     </Box>

//     //     <IconButton
//     //       size="small"
//     //       onClick={() => setShowPopup(false)}
//     //       sx={{
//     //         color: "#55716A",
//     //         marginTop: "-4px",
//     //         marginRight: "-8px",
//     //         "&:hover": {
//     //           backgroundColor: "#F3F5F4",
//     //         },
//     //       }}
//     //     >
//     //       <CloseIcon fontSize="small" />
//     //     </IconButton>
//     //   </Box>

//     //   <Box
//     //     sx={{
//     //       padding: "0 20px 4px 24px",
//     //       maxHeight: "300px",
//     //       overflowY: "auto",
//     //     }}
//     //   >
//     //     {celebrations.map((item, index) => {
//     //       const details = getEventDetails(item);

//     //       return (
//     //         <Box
//     //           key={`${item.RecordID}-${item.EventType}-${index}`}
//     //           sx={{
//     //             display: "flex",
//     //             alignItems: "center",
//     //             justifyContent: "space-between",
//     //             minHeight: "62px",
//     //             padding: "7px 0",
//     //             borderBottom:
//     //               index !== celebrations.length - 1
//     //                 ? "1px solid #E8E4DE"
//     //                 : "none",
//     //           }}
//     //         >
//     //           <Box
//     //             sx={{
//     //               minWidth: 0,
//     //               paddingRight: "10px",
//     //             }}
//     //           >
//     //             <Box
//     //               sx={{
//     //                 fontFamily: "Georgia, serif",
//     //                 fontSize: "17px",
//     //                 fontWeight: 700,
//     //                 color: "#29443D",
//     //                 lineHeight: 1.25,
//     //               }}
//     //             >
//     //               {item?.Name || "Staff"}
//     //             </Box>

//     //             <Box
//     //               sx={{
//     //                 marginTop: "2px",
//     //                 fontSize: "14px",
//     //                 color: "#58736B",
//     //                 lineHeight: 1.35,
//     //               }}
//     //             >
//     //               {getDescription(item, details)}
//     //               {" • "}
//     //               {details.isToday
//     //                 ? `${details.isBirthday ? "Birthday" : "Anniversary"} today`
//     //                 : details.formattedDate}
//     //             </Box>
//     //           </Box>

//     //           <Box
//     //             sx={{
//     //               minWidth: "34px",
//     //               display: "flex",
//     //               justifyContent: "center",
//     //               alignItems: "center",
//     //               fontSize: "24px",
//     //             }}
//     //           >
//     //             {details.isBirthday ? (
//     //               <Box
//     //                 component="span"
//     //                 sx={{
//     //                   fontSize: "23px",
//     //                   lineHeight: 1,
//     //                 }}
//     //               >
//     //                 🎂
//     //               </Box>
//     //             ) : (
//     //               <Box
//     //                 component="span"
//     //                 sx={{
//     //                   fontSize: "23px",
//     //                   lineHeight: 1,
//     //                 }}
//     //               >
//     //                 🎖️
//     //               </Box>
//     //             )}
//     //           </Box>
//     //         </Box>
//     //       );
//     //     })}
//     //   </Box>

//     //   <Box
//     //     sx={{
//     //       display: "flex",
//     //       justifyContent: "flex-end",
//     //       padding: "10px 24px 18px",
//     //     }}
//     //   >
//     //     <Box
//     //       component="button"
//     //       onClick={() => setShowPopup(false)}
//     //       sx={{
//     //         border: "none",
//     //         background: "transparent",
//     //         color: "#D69A32",
//     //         fontSize: "15px",
//     //         fontWeight: 700,
//     //         cursor: "pointer",
//     //         padding: "5px 0",
//     //         fontFamily: "inherit",
//     //         "&:hover": {
//     //           color: "#B77D1F",
//     //         },
//     //       }}
//     //     >
//     //       Got it, thanks
//     //     </Box>
//     //   </Box>
//     // </Box>
//   );
// };
const CelebrationReminder = () => {
  const [celebrations, setCelebrations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false); // ADD
  const [activeTab, setActiveTab] = useState("today"); // "today" | "week" | "month"

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("BirthdayAnniversary");

      if (!storedData) {
        setCelebrations([]);
        return;
      }

      const parsedData = JSON.parse(storedData);

      const data = Array.isArray(parsedData)
        ? parsedData
        : parsedData?.Data || parsedData?.rows || [];

      if (Array.isArray(data) && data.length > 0) {
        setCelebrations(data);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error reading celebration data:", error);
      setCelebrations([]);
      setShowPopup(false);
    }
  }, []);

  // ✅ How many days from today until this event's NEXT occurrence
  // (handles wrap-around to next year, e.g. event in Jan when today is Dec)
  const getDaysUntilEvent = (item) => {
    const eventDateParts = item?.EventDate ? item.EventDate.split("-") : [];
    const eventDay = Number(eventDateParts[0]);
    const eventMonth = Number(eventDateParts[1]);

    if (!eventDay || !eventMonth) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextOccurrence = new Date(
      today.getFullYear(),
      eventMonth - 1,
      eventDay
    );

    if (nextOccurrence < today) {
      nextOccurrence = new Date(
        today.getFullYear() + 1,
        eventMonth - 1,
        eventDay
      );
    }

    const diffMs = nextOccurrence.getTime() - today.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  };

  // ✅ Bucket every record once, so tab counts + filtering share the same logic
  const buckets = useMemo(() => {
    const today = [];
    const week = [];
    const month = [];

    celebrations.forEach((item) => {
      const daysUntil = getDaysUntilEvent(item);
      if (daysUntil === null) return;

      if (daysUntil === 0) today.push(item);
      if (daysUntil >= 0 && daysUntil <= 7) week.push(item);
      if (daysUntil >= 0 && daysUntil <= 30) month.push(item);
    });

    return { today, week, month };
  }, [celebrations]);

  const tabs = [
    { key: "today", label: "Today", data: buckets.today },
    { key: "week", label: "This Week", data: buckets.week },
    { key: "month", label: "This Month", data: buckets.month },
  ];

  const activeData = tabs.find((t) => t.key === activeTab)?.data || [];

  if (!showPopup || celebrations.length === 0) {
    return null;
  }

  const getEventDetails = (item) => {
    const eventType = item?.EventType || "";

    const eventDateParts = item?.EventDate ? item.EventDate.split("-") : [];

    const eventDay = eventDateParts[0];
    const eventMonth = eventDateParts[1];

    const today = new Date();

    const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
    const currentDay = String(today.getDate()).padStart(2, "0");

    const isToday = eventMonth === currentMonth && eventDay === currentDay;

    // ✅ Keep the complete DD-MM-YYYY date
    // const formattedDate = item?.EventDate || "";
    const formattedDate = eventDay && eventMonth ? `${eventDay}-${eventMonth}` : "";
    const isBirthday = eventType === "Birthday";

    return {
      isBirthday,
      isToday,
      formattedDate,
    };
  };

  const getDescription = (item, details) => {
    const classification = item?.ClassificationDesc || "";
    const standard = item?.Standard || "";

    let role = "";

    if (classification === "Teaching Staff") {
      role = standard ? `${standard} Teacher` : "Teacher";
    } else if (classification === "Student") {
      // ✅ Show Standard for Student
      role = standard ? `${standard} Student` : "Student";
    } else if (classification) {
      role = classification;
    } else {
      role = "Staff";
    }

    const eventText = details.isBirthday
      ? "Birthday"
      : `${item?.EventDate ? getAnniversaryYears(item.EventDate) : ""}-year work anniversary`;

    return `${role} • ${eventText}`;
  };

  const getAnniversaryYears = (eventDate) => {
    if (!eventDate) return "";

    const parts = eventDate.split("-");
    const eventYear = Number(parts[2]); // ✅ DD-MM-YYYY → YYYY

    if (!eventYear) return "";

    const currentYear = new Date().getFullYear();

    return currentYear - eventYear;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 12, sm: 20 },
        right: { xs: 10, sm: 20 },
        width: {
          xs: "calc(100vw - 20px)",
          sm: 380,
        },
        maxWidth: "380px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
        borderLeft: "4px solid #D9A441",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "18px 16px 6px 20px",
        }}
      >
        <Box>
          <Box
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: "19px",
              fontWeight: 700,
              color: "#29443D",
              lineHeight: 1.2,
            }}
          >
            Birthday/Work Anniversary 🎉
          </Box>

          <Box
            sx={{
              marginTop: "4px",
              fontSize: "13px",
              color: "#60766F",
            }}
          >
            {activeData.length} {activeData.length === 1 ? "person" : "people"}
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={() => setShowPopup(false)}
          sx={{
            color: "#55716A",
            marginTop: "-4px",
            marginRight: "-6px",
            "&:hover": {
              backgroundColor: "#F3F5F4",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          padding: "0 20px 10px 20px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Box
              key={tab.key}
              component="button"
              onClick={() => setActiveTab(tab.key)}
              sx={{
                flex: 1,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 4px",
                borderRadius: "20px",
                backgroundColor: isActive ? "#29443D" : "#F3F5F4",
                color: isActive ? "#fff" : "#55716A",
                transition: "background-color 0.15s ease, color 0.15s ease",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              {tab.label}
              <Box
                component="span"
                sx={{
                  fontSize: "10px",
                  fontWeight: 700,
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(41,68,61,0.1)",
                  color: isActive ? "#fff" : "#29443D",
                  borderRadius: "10px",
                  padding: "1px 5px",
                  minWidth: "16px",
                  textAlign: "center",
                }}
              >
                {tab.data.length}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Celebration list */}
      <Box
        sx={{
          padding: "0 16px 2px 20px",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        {activeData.length === 0 ? (
          <Box
            sx={{
              fontSize: "13px",
              color: "#8A9A94",
              textAlign: "center",
              padding: "16px 0 18px",
            }}
          >
            No celebrations{" "}
            {activeTab === "today"
              ? "today"
              : activeTab === "week"
                ? "this week"
                : "this month"}
            .
          </Box>
        ) : (
          activeData.map((item, index) => {
            const details = getEventDetails(item);

            return (
              <Box
                key={`${item.RecordID}-${item.EventType}-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: "54px",
                  padding: "5px 0",
                  borderBottom:
                    index !== activeData.length - 1
                      ? "1px solid #E8E4DE"
                      : "none",
                }}
              >
                {/* Person details */}
                <Box
                  sx={{
                    minWidth: 0,
                    paddingRight: "8px",
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#29443D",
                      lineHeight: 1.25,
                    }}
                  >
                    {item?.Name || "Staff"}
                  </Box>

                  <Box
                    sx={{
                      marginTop: "2px",
                      fontSize: "13px",
                      color: "#58736B",
                      lineHeight: 1.35,
                    }}
                  >
                    {getDescription(item, details)}
                    {" • "}
                    {details.isToday
                      ? `${details.isBirthday ? "Birthday" : "Anniversary"} today`
                      : details.formattedDate}
                  </Box>
                </Box>

                {/* Event icon */}
                <Box
                  sx={{
                    minWidth: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {details.isBirthday ? (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "21px",
                        lineHeight: 1,
                      }}
                    >
                      🎂
                    </Box>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "21px",
                        lineHeight: 1,
                      }}
                    >
                      🎖️
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px 20px 14px",
        }}
      >
        <Box
          component="button"
          onClick={() => setShowPopup(false)}
          sx={{
            border: "none",
            background: "transparent",
            color: "#D69A32",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "4px 0",
            fontFamily: "inherit",
            "&:hover": {
              color: "#B77D1F",
            },
          }}
        >
          Got it, thanks
        </Box>
      </Box>
    </Box>
  );
};
const Logopage = () => {
  const [logoSrc, setLogoSrc] = useState(null);
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode");
  const is003Subscription = SubscriptionCode.endsWith("003");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  useEffect(() => {
    const interval = setInterval(() => {
      // Always read latest values
      const companyLogo = sessionStorage.getItem("CompanyLogo");
      const Celebration = sessionStorage.getItem("BirthdayAnniversary");
      console.log(Celebration, "Celebration");
      const sessionLogo = sessionStorage.getItem("logoimage") || companyLogo;

      const newLogo = sessionLogo
        ? store.getState().globalurl.attachmentUrl + sessionLogo
        : BackOfficelogoV1;

      setLogoSrc((prev) => (prev !== newLogo ? newLogo : prev));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <Box sx={{
        margin: "20px 0px 0px 20px"
      }}>
        {broken && !rtl && (
          <IconButton onClick={() => toggleSidebar()}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={logoSrc}
          alt="Logo"
          style={{ width: "300px", height: "auto", objectFit: "contain" }}
        />
        <h3 style={{ marginTop: "10px" }}>Back Office System</h3>
      </div>
      {is003Subscription && <CelebrationReminder /> }
    </React.Fragment>
  );
};

export default Logopage;
