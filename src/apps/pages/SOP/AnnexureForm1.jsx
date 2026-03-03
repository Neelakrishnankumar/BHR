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


const AnnexureForm1 = () => {


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


    // const [isMobile, setIsMobile] = React.useState(
    //     window.innerWidth < 768
    // );

    // React.useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);


    const styles = {
        wrapper: {
            padding: !isNonMobile ? "8px" : "20px",
            border: "2px solid black",
            // fontFamily: "Times New Roman, serif",
            fontSize: isNonMobile ? "11px" : "14px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        thtd: {
            border: "1px solid black",
            padding: "10px",
            verticalAlign: "middle",
            fontSize: !isNonMobile ? "11px" : "17px",

        },
        inputStyle: {
            width: "100%",
            height: "35px",
            border: "none",
            outline: "none",
            // fontFamily: "Times New Roman",
            fontSize: "14px",
        }
    };




    const [formData, setFormData] = React.useState({
        facility1: false,
        facility2: false,
        sopTitle: "",
        sopNumber: "",
        rows: Array.from({ length: 8 }, () => ({
            sno: "",
            version: "",
            modification: "",
            type: "",
            issuedCopies: "",
            issuedBy: "",
            receivedBy: "",
            retrievedCopies: "",
            destructedBy: "",
            remarks: "",
        })),
    });


    const handleRowChange = (index, field, value) => {
        const updatedRows = [...formData.rows];
        updatedRows[index][field] = value;
        setFormData({ ...formData, rows: updatedRows });
    };
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
                                    {mode == "A" ? "New" : mode == "E" ? `Edit ${(state.BreadCrumb3) ? `(Annexure# ${state.BreadCrumb3})` : ""}` : "View Annexure Form1"}
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
            {/* <div style={styles.wrapper}> */}

            <TableContainer component={Paper} sx={{ m: 1 }}>
                <Table sx={{ borderCollapse: "collapse" }}>
                    <TableBody>

                        {/* Facility Row */}
                        <TableRow>
                            <TableCell sx={{ ...styles.thtd, width: "15%" }}>
                                <b>Facility:</b>
                            </TableCell>

                            <TableCell sx={{ ...styles.thtd, width: "42%" }}>
                                <b>Manufacturing facility-1</b>{" "}
                                <Checkbox
                                    checked={formData.facility1}
                                    onChange={(e) =>
                                        setFormData({ ...formData, facility1: e.target.checked })
                                    }
                                />
                            </TableCell>

                            <TableCell sx={{ ...styles.thtd, width: "43%" }}>
                                <b>Manufacturing facility-2</b>{" "}
                                <Checkbox
                                    checked={formData.facility2}
                                    onChange={(e) =>
                                        setFormData({ ...formData, facility2: e.target.checked })
                                    }
                                />
                            </TableCell>
                        </TableRow>

                        {/* SOP Title */}
                        <TableRow>
                            <TableCell sx={{ ...styles.thtd, borderRight: "none" }}>
                                <b>SOP Title:</b>
                            </TableCell>

                            <TableCell
                                colSpan={2}
                                sx={{ ...styles.thtd, borderLeft: "none" }}
                            >
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={formData.sopTitle}
                                    onChange={(e) =>
                                        setFormData({ ...formData, sopTitle: e.target.value })
                                    }
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                        </TableRow>

                        {/* SOP Number */}
                        <TableRow>
                            <TableCell sx={{ ...styles.thtd, borderRight: "none" }}>
                                <b>SOP Number:</b>
                            </TableCell>

                            <TableCell
                                colSpan={2}
                                sx={{ ...styles.thtd, borderLeft: "none" }}
                            >
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={formData.sopNumber}
                                    onChange={(e) =>
                                        setFormData({ ...formData, sopNumber: e.target.value })
                                    }
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ m: 1 }}>
                <Table sx={{ borderCollapse: "collapse" }}>

                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...styles.thtd, width: "6%", background: "#f2f2f2" }}>SL#</TableCell>
                            <TableCell sx={{ ...styles.thtd, width: "8%", background: "#f2f2f2" }}>Version No.</TableCell>
                            <TableCell sx={{ ...styles.thtd, width: "10%", background: "#f2f2f2" }}>Modification No.</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>Type of Copy</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>No of copies issued</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>Issued By sign and Date</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>Received By sign and Date</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>No. of Copies Retrieved</TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>
                                Retrieved and Destructed By sign and Date
                            </TableCell>
                            <TableCell sx={{ ...styles.thtd, background: "#f2f2f2" }}>Remarks</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {formData.rows.map((row, index) => (
                            <TableRow key={index}>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.sno}
                                        onChange={(e) =>
                                            handleRowChange(index, "sno", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.version}
                                        onChange={(e) =>
                                            handleRowChange(index, "version", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.modification}
                                        onChange={(e) =>
                                            handleRowChange(index, "modification", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.type}
                                        onChange={(e) =>
                                            handleRowChange(index, "type", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.issuedCopies}
                                        onChange={(e) =>
                                            handleRowChange(index, "issuedCopies", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.issuedBy}
                                        onChange={(e) =>
                                            handleRowChange(index, "issuedBy", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.receivedBy}
                                        onChange={(e) =>
                                            handleRowChange(index, "receivedBy", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.retrievedCopies}
                                        onChange={(e) =>
                                            handleRowChange(index, "retrievedCopies", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.destructedBy}
                                        onChange={(e) =>
                                            handleRowChange(index, "destructedBy", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={styles.thtd}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        value={row.remarks}
                                        onChange={(e) =>
                                            handleRowChange(index, "remarks", e.target.value)
                                        }
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            {/* </div> */}
        </React.Fragment>
    );
}

export default AnnexureForm1;