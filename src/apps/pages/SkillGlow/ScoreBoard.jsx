import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
    IconButton,
    Tooltip,
    useMediaQuery,
    Breadcrumbs,
    LinearProgress,
    CircularProgress,
} from "@mui/material";
import GaugeChart from "react-gauge-chart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Certificate from "./Pdf/Certificate";
import { useProSidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Chart from "react-apexcharts"; // ✅ ApexCharts import
import { useDispatch, useSelector } from "react-redux";
import { BlobProvider } from "@react-pdf/renderer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ScoredashBoard } from "../../../store/reducers/LoginReducer";
import { pdf } from "@react-pdf/renderer";
import { getConfig } from "../../../config";
const ScoreBoard = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const state = location.state || {};
    const empID = sessionStorage.getItem("EmpId");

    //STATE PASSING
    const AssessmentName = state.AssessmentName;
    const AssessmentID = state.AssessmentID;
    const ScheduleID = state.ScheduleID;
    const EmployeeID = state.EmployeeID;
    const Lastattdate = state.Lastattdate;
    const Firstattdate = state.Firstattdate;
    const NoofAttemp = state.NoofAttemp;
    const BreadCrumb1 = state.BreadCrumb1;
    const BreadCrumb2 = state.BreadCrumb2;


    const EmployeeName = state.EmployeeName;
    const params = useParams();
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width:600px)");
    useEffect(() => {
        dispatch(
            ScoredashBoard({
                data: {
                    EmployeeID,
                    AssessmentID,
                    ScheduleID,
                },
            })
        );
    }, [dispatch, EmployeeID, AssessmentID, ScheduleID]);

    const ScoredashBoardGetData = useSelector(
        (state) => state.loginApi.ScoredashBoardGetData
    );
    console.log(ScoredashBoardGetData, "dataaaaaaaaaaaaaaaa...");
    useEffect(() => {
        console.log("UPDATED DATA:", ScoredashBoardGetData);
    }, [ScoredashBoardGetData]);
    // SCORE
    const rawScore = ScoredashBoardGetData?.details?.LastAttemptScore
        ? parseFloat(ScoredashBoardGetData.details.LastAttemptScore)
        : null;
    console.log("🚀 ~ AssessmentDashboard ~ rawScore:", rawScore)

    const Lastattscore = rawScore !== null ? rawScore / 100 : 0;
    console.log("🚀 ~ AssessmentDashboard ~ Lastattscore:", Lastattscore)
    const series = [
        {
            name: ScoredashBoardGetData?.yaxis?.[0]?.name,
            data: ScoredashBoardGetData?.yaxis?.[0]?.Score || [],
        },
    ];

    console.log("🚀 ~ AssessmentDashboard ~ YaxisFilter:", series);

    const attemptLength = series[0]?.data?.length || 0;
    const colors =
        attemptLength > 0
            ? Array.from({ length: attemptLength }, (_, i) =>
                i === attemptLength - 1 ? "#43A047" : "#E53935"
            )
            : [];

    const ScoredashBoardGetStaus = useSelector(
        (state) => state.loginApi.ScoredashBoardGetStaus
    );
    console.log(
        "🚀 ~ AssessmentDashboard ~ ScoredashBoardGetStaus:",
        ScoredashBoardGetStaus
    );

    const ScoredashBoardGetLoading = useSelector(
        (state) => state.loginApi.ScoredashBoardGetLoading
    );
    const ScoredashBoardGetError = useSelector(
        (state) => state.loginApi.ScoredashBoardGetError
    );
    console.log(
        "🚀 ~ AssessmentDashboard ~ ScoredashBoardGetError:",
        ScoredashBoardGetError
    );
    const HeaderImg = sessionStorage.getItem("CompanyHeader");
    const FooterImg = sessionStorage.getItem("CompanyFooter");
    const CompanySignature = sessionStorage.getItem("CompanySignature");
    const config = getConfig();
    const baseurlUAAM = config.UAAM_URL;
    const fnLogOut = (props) => {
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
                    navigate("/Apps/TR026/Department");
                }
            } else {
                return;
            }
        });
    };

    return (
        <Box
            sx={{
                p: 2,
                height: "100vh",
            }}
        >
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
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
                                maxItems={2}
                                aria-label="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                            >
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                                    }}
                                >
                                    List of Assessment Type ({state.BreadCrumb1})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(
                                            `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}`,
                                            { state: { ...state } }
                                        );
                                    }}
                                >
                                    List of Category ({state.BreadCrumb2})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(
                                            `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID4}/${params.accessID1}/${params.parentID3}`,
                                            { state: { ...state } }
                                        );
                                    }}
                                >
                                    List of Assessment ({state.BreadCrumb3})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(-1)}
                                >
                                    Schedule History ({state.EmployeeName})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Score Board
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

            {ScoredashBoardGetLoading ? (
                <LinearProgress />
            ) : (
                <>
                    <Paper elevation={3} sx={{ margin: "10px", padding: "20px" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Assessment Score Board - {EmployeeName || ""}
                                </Typography>
                            </Box>

                            {/* Example Button */}

                            <Box>
                                {/* PDF BUTTON */}
                                <Box>
                                    {ScoredashBoardGetStaus === "fulfilled" && ScoredashBoardGetData?.details && (
                                        <BlobProvider
                                            document={
                                                <Certificate
                                                    AssessmentName={ScoredashBoardGetData.details?.AssessmentName || ""}
                                                    EmpName={ScoredashBoardGetData.details?.EmpName || ""}
                                                    IssueDate={ScoredashBoardGetData.details?.LastDateAttempt || ""}
                                                    baseurlUAAMS={baseurlUAAM}
                                                    HeaderImgS={HeaderImg}
                                                    FooterImgS={FooterImg}
                                                    CompanySignatureS={CompanySignature}

                                                />
                                            }
                                        >
                                            {({ url, loading }) => (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={loading}
                                                    onClick={() => {
                                                        if (!url) return;
                                                        const link = document.createElement("a");
                                                        link.href = url;
                                                        link.download = "certificate.pdf";
                                                        link.click();
                                                    }}
                                                >
                                                    {loading ? (
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            Preparing Certificate
                                                            <CircularProgress size={20} sx={{ color: "white" }} />
                                                        </Box>
                                                    ) : (
                                                        "Download Certificate"
                                                    )}
                                                </Button>
                                            )}

                                        </BlobProvider>
                                    )}

                                </Box>
                                {/* <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        const blob = await pdf(
                                            <Certificate
                                                AssessmentName={ScoredashBoardGetData?.details?.AssessmentName || ""}
                                                EmpName={ScoredashBoardGetData?.details?.EmpName || ""}
                                                IssueDate={ScoredashBoardGetData?.details?.LastDateAttempt || ""}
                                                baseurlUAAMS={baseurlUAAM}
                                                HeaderImgS={HeaderImg}
                                                FooterImgS={FooterImg}
                                                CompanySignatureS={CompanySignature}
                                            />
                                        ).toBlob();

                                        const url = URL.createObjectURL(blob);

                                        const link = document.createElement("a");
                                        link.href = url;
                                        link.download = "certificate.pdf";
                                        link.click();
                                    }}
                                >
                                    Download Certificate
                                </Button> */}
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        {/* Charts Row */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {/* Gauge Chart */}
                            <Box
                                sx={{
                                    flex: { xs: "100%", md: "60%" },
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {ScoredashBoardGetStaus === "fulfilled" && (

                                    <GaugeChart
                                        id="gauge-chart1"
                                        nrOfLevels={10}
                                        percent={Lastattscore}
                                        textColor="#000"
                                        colors={["#e53935", "#43a047"]}
                                        needleColor="#000"
                                        style={{
                                            width: "100%", // responsive width
                                            maxWidth: "350px", // cap the maximum size
                                            height: "auto",
                                        }}
                                    />
                                )}
                            </Box>
                            <Box
                                sx={{
                                    flex: { xs: "100%", md: "40%" },
                                    pl: { md: 3, xs: 0 },
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: { md: "flex-start", xs: "center" },
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    Assessment Title:{" "}
                                    <b>{ScoredashBoardGetData?.details?.AssessmentName}</b>
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {/* Score: <b>{Lastattscore * 100}</b> */}
                                    Score: <b>{rawScore}</b>
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    First Attempt Date:{" "}
                                    <b>{ScoredashBoardGetData?.details?.FirstDateAttempt}</b>
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Last Attempt Date:{" "}
                                    <b>{ScoredashBoardGetData?.details?.LastDateAttempt}</b>
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                    </Paper>

                    <Paper elevation={3} sx={{ margin: "10px", padding: "20px" }}>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="h4" gutterBottom>
                                Assessment Progress (Max Attempts:
                                {ScoredashBoardGetData?.details?.MaxNoOfAttempt})
                            </Typography>
                            {ScoredashBoardGetStaus === "fulfilled" && (
                                <Chart
                                    type="bar"
                                    height={300}
                                    //width={"80%"}
                                    options={{
                                        chart: { toolbar: { show: false } },
                                        xaxis: {
                                            categories: ScoredashBoardGetData?.xaxis || [], // ✅ Dates from API
                                        },
                                        yaxis: {
                                            min: 0,
                                            max: 100, // ✅ Fix maximum to 100
                                            tickAmount: 5, // ✅ Gives 6 ticks (0,20,40,60,80,100)
                                            labels: {
                                                formatter: (val) => `${val}`, // Optional: format labels
                                            },
                                        },
                                        plotOptions: {
                                            bar: {
                                                borderRadius: 6,
                                                columnWidth: "30%",
                                                distributed: true,
                                            },
                                        },
                                        legend: {
                                            show: false, // Disable automatic legend
                                        },
                                        dataLabels: { enabled: false },
                                        colors: colors,
                                    }}
                                    series={series} // ✅ Correct series format
                                />
                            )}
                            <Box display="flex" alignItems="center" justifyContent="center" mt={2} gap={2}>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            background: "#E53935",
                                            borderRadius: "2px",
                                            display: "inline-block",
                                        }}
                                    />
                                    <Typography>Fail</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            background: "#43A047",
                                            borderRadius: "2px",
                                            display: "inline-block",
                                        }}
                                    />
                                    <Typography>Pass</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </>
            )}
        </Box>
    );
};

export default ScoreBoard;
