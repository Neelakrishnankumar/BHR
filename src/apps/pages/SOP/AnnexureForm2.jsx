import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    Paper,
    IconButton,
    Tooltip,
    LinearProgress,
    TableRow,
    TableCell,
    TableHead,
    Table,
    TableContainer,
    TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Form, Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFetchData, postData, SOPProcessPost } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { useProSidebar } from "react-pro-sidebar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { formGap } from "../../../ui-components/utils";
import { SOPDocLookup, SOPEMPLookup } from "../../../ui-components/global/Autocomplete";
import { SOPfileUpload } from "../../../store/reducers/Imguploadreducer";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import store from "../../../index";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const AnnexureForm2 = () => {

    
        const navigate = useNavigate();
        const dispatch = useDispatch();
    
        const params = useParams();
        const location = useLocation();
        const state = location.state || {};
        const recID = params.id;
        const accessID = params.accessID;
        const mode = params.Mode;
    
        const CompanyID = sessionStorage.getItem("compID");
        const isNonMobile = useMediaQuery("(min-width:600px)");
        const { toggleSidebar, broken, rtl } = useProSidebar();
    
        const data = useSelector((state) => state.formApi.Data);
        const isLoading = useSelector((state) => state.formApi.postLoading);
        const getLoading = useSelector((state) => state.formApi.getLoading);
    
        const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    
        const [validationSchema, setValidationSchema] = useState(null);
    
        const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    
    


    const [isMobile, setIsMobile] = React.useState(
        window.innerWidth < 768
    );

    // React.useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    const styles = {
        wrapper: {
            padding: !isNonMobile ? "8px" : "30px",
            display: "flex",
            justifyContent: "center",
        },
        container: {
            width: "100%",
            padding: !isNonMobile ? "8px" : "20px",
            border: "2px solid black",
            // fontFamily: "Times New Roman, serif",
            fontSize: !isNonMobile ? "11px" : "14px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        inputStyle: {
            width: "100%",
            height: "35px",
            border: "none",
            outline: "none",
            // fontFamily: "Times New Roman",
            fontSize: "14px",
        }
    }
    const [errorMsgData, setErrorMsgData] = useState(null);

    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData.Warningmsg[props],
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
                    navigate("/Apps/TR336/List%20Of%20SOPs");
                }
            } else {
                return;
            }
        });
    };
    return (

        <React.Fragment
            sx={{
                p: 2,
                height: "100vh",
            }}
        >
            {/* BREADCRUMBS */}
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
                                maxItems={3}
                                aria-label="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                            >
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate("/Apps/TR336/List%20Of%20SOPs")}
                                >
                                    List of SOPs ({state.BreadCrumb1 || ""})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(`/Apps/Secondarylistview/TR338/SopDocument/${params.parentID1}`, {
                                        state: {
                                            ...state,
                                        },
                                    })}
                                >
                                    List of Documents ({state.BreadCrumb2 || ""})
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(-1)}
                                >
                                    List of Log Notes
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    {mode == "A" ? "New" : mode == "E" ? `Edit ${(state.BreadCrumb3) ? `(Annexure# ${state.BreadCrumb3})` : ""}` : "View Annexure Form2"}
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
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <table style={{ ...styles.table, marginBottom: "20px" }}>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid black", fontSize: "17px", borderRight: "none", padding: "10px", }}>
                                    <b>SOP Title:</b>
                                </td>
                                <td
                                    colSpan="2"
                                    style={{ border: "1px solid black", borderLeft: "none", padding: "10px" }}
                                >
                                    <input type="text" style={{ ...styles.inputStyle, width: "60%" }} />
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black", fontSize: "17px", borderRight: "none", padding: "10px", width: "15%" }}>
                                    <b>SOP Number:</b>
                                </td>
                                <td
                                    colSpan="2"
                                    style={{ border: "1px solid black", borderLeft: "none", padding: "10px" }}
                                >
                                    <input type="text" style={styles.inputStyle} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* ================= ANNEXURE TABLE ================= */}

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px",
                        }}
                    >
                        <thead>
                            <tr>
                                {[
                                    "SL#",
                                    "Annexure No.",
                                    "Requested Date",
                                    "No. of Copies Issued",
                                    "Issued Logbook No.",
                                    "Issued By (Sign and Date)",
                                    "Received By (Sign and Date)",
                                    "Additional Info",
                                ].map((heading, index) => (
                                    <th
                                        key={index}
                                        style={{
                                            border: "1px solid black",
                                            background: "#f2f2f2",
                                            padding: "8px",
                                            fontSize: "18px",
                                            width: index === 0 ? "5%" : index === 1 ? "7%" : "auto"
                                        }}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 10 }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({ length: 8 }).map((_, colIndex) => (
                                        <td
                                            key={colIndex}
                                            style={{
                                                border: "1px solid black",
                                                padding: "10px",
                                            }}
                                        >
                                            <input
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    outline: "none",
                                                    fontFamily: "Times New Roman",
                                                    fontSize: "13px",
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            {/* Remarks Row Inside Same Table */}
                            <tr>
                                <td
                                    colSpan="8"
                                    style={{
                                        border: "1px solid black",
                                        padding: "10px",
                                    }}
                                >
                                    <b>Remarks:</b>{" "}
                                    <input
                                        type="text"
                                        style={{
                                            width: "70%",
                                            marginLeft: "15px",
                                            border: "none",
                                            outline: "none",
                                            fontFamily: "Times New Roman",
                                            fontSize: "17px",
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </React.Fragment>
    );
}

export default AnnexureForm2;