import {
    Box,
    Paper,
    Typography,
    Breadcrumbs,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useProSidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BRREmpLookup } from "../../../ui-components/global/Autocomplete";
import { useSelector } from "react-redux";

function BRRForm() {
const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const params = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const mode = params.Mode;
    const compID = sessionStorage.getItem("compID");

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
                    navigate("/Apps/TR323/Route");
                }
            } else {
                return;
            }
        });
    };

    const [empData, setempData] = useState(null);
    const [empData1, setempData1] = useState(null);
    const [empData2, setempData2] = useState(null);

    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    let employeeFilter = `CompanyID='${compID}'`;

    const employeeUrl = `${listViewurl}?data=${encodeURIComponent(
        JSON.stringify({
            Query: {
                AccessID: "2117",
                ScreenName: "Employee",
                Filter: employeeFilter,
                Any: "",
                CompId: "",
            },
        }),
    )}`;

    // ================= STATE =================

    const [values, setValues] = useState({
        A: 0,
        rejections: Array(10).fill(0),
        samples: Array(3).fill(0),
        VVMRejection: 0,
        PackingRejection: 0,
    });

    // ================= CALCULATIONS =================

    const B = values.rejections.reduce((a, b) => a + Number(b || 0), 0);
    const C = values.samples.reduce((a, b) => a + Number(b || 0), 0);
    const D = B + C;
    const readyAfterProtocol = values.A - D;
    const E = D + values.VVMRejection + values.PackingRejection;
    const finalReady = values.A - E;

    // ================= HANDLERS =================

    const handleRejectionChange = (index, value) => {
        const updated = [...values.rejections];
        updated[index] = Number(value || 0);
        setValues({ ...values, rejections: updated });
    };

    const handleSampleChange = (index, value) => {
        const updated = [...values.samples];
        updated[index] = Number(value || 0);
        setValues({ ...values, samples: updated });
    };

    // ================= UI =================

    return (
        <React.Fragment>
            {/* HEADER */}
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
                                    onClick={() => navigate("/Apps/TR323/Route")}
                                >
                                    {`List Of Batch
                           (${state.BreadCrumb1 || ""})`}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate("/Apps/TR323/Route")}
                                >
                                    {`List Of Batch Reconciliation Records
                           (${state.BreadCrumb1 || ""})`}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                >
                                    Add
                                    {/* {mode == "A" ? "New" : mode == "E" ? "Edit" : "View"} */}
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

            {/* FORM */}
            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Typography
                    variant="h5"
                    sx={{ my: 2, fontWeight: "bold", textAlign: "center" }}
                >
                    BATCH RECONCILIATION RECORD FORM
                </Typography>

                <div
                    style={{
                        width: "800px",
                        border: "2px solid black",
                        padding: "10px",
                        margin: "auto",
                    }}
                >

                     <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginBottom: "10px",
                            border: "1.5px solid black",
                        }}
                        border="1"
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        width: "25%",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    Name of the Product
                                </td>

                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <input
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            outline: "none",
                                        }}
                                    />
                                </td>

                                <td
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    IP <input type="checkbox" />
                                    &nbsp;&nbsp; BP <input type="checkbox" />
                                </td>

                                <td
                                    style={{
                                        width: "15%",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    Batch No
                                </td>

                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <input
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            outline: "none",
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    Manufacturing Date
                                </td>

                                <td>
                                    <input
                                        type="date"
                                        style={{ width: "100%", border: "none", outline: "none" }}
                                    />
                                </td>

                                <td></td>

                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    Expiry Date
                                </td>

                                <td>
                                    <input
                                        type="date"
                                        style={{ width: "100%", border: "none" }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* MAIN TABLE */}
                    <table width="100%" border="1" style={{ borderCollapse: "collapse",marginBottom: "10px", }}>
                        <tbody>
                            <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                                <td>S.No</td>
                                <td>Description</td>
                                <td>Number of Vials</td>
                            </tr>

                            {/* A */}
                            <tr>
                                <td align="center">1.</td>
                                <td style={{ fontWeight: "bold" }}>Total Number of Vials Received from Stores (A)</td>
                                <td>
                                    <input
                                        type="number"
                                        value={values.A}
                                        onChange={(e) =>
                                            setValues({ ...values, A: Number(e.target.value) })
                                        }
                                        style={{ width: "100%", border: "none",textAlign: "right" }}
                                    />
                                </td>
                            </tr>

                            {/* REJECTIONS */}
                            {[
                                "Vial Washing Rejection",
                                "Depyrogenation Tunnel Rejection",
                                "After Depyrogenation Before Filling Rejection",
                                "Filling Rejection",
                                "Row by Row Rejection",
                                "Lyophilizer Unloading Rejection",
                                "Capping Rejection",
                                "Visual Inspection Rejection",
                                "QC Finished Product Sampling",
                                "Labelling Rejection",
                            ].map((item, index) => (
                                <tr key={index}>
                                    {index === 0 && (
                                        <td align="center" rowSpan={10}>
                                            2.
                                        </td>
                                    )}
                                    <td>{item}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={values.rejections[index]}
                                            onChange={(e) =>
                                                handleRejectionChange(index, e.target.value)
                                            }
                                            style={{ width: "100%", border: "none",textAlign: "right" }}
                                        />
                                    </td>
                                </tr>
                            ))}

                            {/* B */}
                            <tr style={{ fontWeight: "bold" }}>
                                <td colSpan="2">Total Rejections (B)</td>
                                <td>
                                    <input value={B} readOnly style={{ width: "100%",textAlign: "right" }} />
                                </td>
                            </tr>

                            {/* SAMPLES */}
                            {[
                                "CDL + GMSD Samples",
                                "Retention Samples",
                                "Other Samples",
                            ].map((item, index) => (
                                <tr key={index}>
                                    {index === 0 && (
                                        <td align="center" rowSpan={3}>
                                            3.
                                        </td>
                                    )}
                                    <td>{item}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={values.samples[index]}
                                            onChange={(e) =>
                                                handleSampleChange(index, e.target.value)
                                            }
                                            style={{ width: "100%", border: "none",textAlign: "right" }}
                                        />
                                    </td>
                                </tr>
                            ))}

                            {/* C */}
                            <tr style={{ fontWeight: "bold" }}>
                                <td colSpan="2">Total Samples (C)</td>
                                <td>
                                    <input value={C} readOnly style={{ width: "100%",textAlign: "right" }} />
                                </td>
                            </tr>

                            {/* D */}
                            <tr>
                                <td align="center">4.</td>
                                <td>Total Rejections and QC Samples (D = B + C)</td>
                                <td>
                                    <input value={D} readOnly style={{ width: "100%",textAlign: "right" }} />
                                </td>
                            </tr>

                            {/* A - D */}
                            <tr>
                                <td align="center">5.</td>
                                <td>
                                    Total Number of Vials Ready for Release = (A) - (D)
                                </td>
                                <td>
                                    <input
                                        value={readyAfterProtocol}
                                        readOnly
                                        style={{ width: "100%",textAlign: "right" }}
                                    />
                                </td>
                            </tr>

                            {/* VVM */}
                            <tr>
                                <td align="center">6.</td>
                                <td>VVM Rejection</td>
                                <td>
                                    <input
                                        type="number"
                                        value={values.VVMRejection}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                VVMRejection: Number(e.target.value),
                                            })
                                        }
                                        style={{ width: "100%",textAlign: "right" }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td align="center">7.</td>
                                <td>Total Number of Vials after VVM Activity</td>
                                <td>
                                    <input
                                        type="number"
                                        value={values.VVMAfterActivity}
                                        style={{ width: "100%",textAlign: "right" }}
                                    />
                                </td>
                            </tr>

                            {/* Packing */}
                            <tr>
                                <td align="center">8.</td>
                                <td>Packing Rejection</td>
                                <td>
                                    <input
                                        type="number"
                                        value={values.PackingRejection}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                PackingRejection: Number(e.target.value),
                                            })
                                        }
                                        style={{ width: "100%",textAlign: "right" }}
                                    />
                                </td>
                            </tr>

                            {/* E */}
                            <tr style={{ fontWeight: "bold" }}>
                                <td align="center">9.</td>
                                <td>
                                    Overall Rejection (E) = (D) + VVM Rejection + Packing
                                    Rejection
                                </td>
                                <td>
                                    <input value={E} readOnly style={{ width: "100%",textAlign: "right" }} />
                                </td>
                            </tr>

                            {/* FINAL */}
                            <tr style={{ fontWeight: "bold" }}>
                                <td align="center">10.</td>
                                <td>Total Number of Vials Ready for Release = (A) - (E)</td>
                                <td>
                                    <input
                                        value={finalReady}
                                        readOnly
                                        style={{ width: "100%",textAlign: "right" }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                        }}
                        border="1"
                    >
                        <tbody>
                            <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                                <td style={{ width: "20%" }}>Description</td>
                                <td style={{ width: "26%" }}>Prepared By</td>
                                <td style={{ width: "27%" }}>Reviewed By (PD)</td>
                                <td style={{ width: "27%" }}>Approved By (QA)</td>
                            </tr>

                            <tr>
                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    Name
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <BRREmpLookup
                                        name="Employee"
                                        label="Employee"
                                        id="Employee"
                                        value={empData}
                                        // onChange={handleSelectionEmployeeChange}
                                        onChange={(newValue) => {
                                            setempData(newValue);
                                        }}
                                        disablePortal={false}
                                        PopperProps={{
                                            sx: {
                                                zIndex: 1500,
                                            },
                                        }}
                                        url={employeeUrl}
                                    />
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <BRREmpLookup
                                        name="Employee"
                                        label="Employee"
                                        id="Employee"
                                        value={empData1}
                                        // onChange={handleSelectionEmployeeChange}
                                        onChange={(newValue) => {
                                            setempData1(newValue);
                                        }}
                                        disablePortal={false}
                                        PopperProps={{
                                            sx: {
                                                zIndex: 1500,
                                            },
                                        }}
                                        url={employeeUrl}
                                    />
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <BRREmpLookup
                                        name="Employee"
                                        label="Employee"
                                        id="Employee"
                                        value={empData2}
                                        // onChange={handleSelectionEmployeeChange}
                                        onChange={(newValue) => {
                                            setempData2(newValue);
                                        }}
                                        disablePortal={false}
                                        PopperProps={{
                                            sx: {
                                                zIndex: 1500,
                                            },
                                        }}
                                        url={employeeUrl}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                                    Sign & Date
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <input
                                        style={{ width: "100%", border: "none", outline: "none" }}
                                    />
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <input
                                        style={{ width: "100%", border: "none", outline: "none" }}
                                    />
                                </td>
                                <td
                                    style={{
                                        width: "30%",
                                        padding: "4px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <input
                                        style={{ width: "100%", border: "none", outline: "none" }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Paper>
        </React.Fragment>
    );
}

export default BRRForm;