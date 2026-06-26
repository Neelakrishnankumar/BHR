import {
    TextField,
    Box,
    Grid,
    Typography,
    useTheme,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    Stack,
    FormControlLabel,
    Tooltip,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    Breadcrumbs,
    LinearProgress,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Hidden,
    Divider,
    Switch
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import WarningIcon from '@mui/icons-material/Warning';
import {
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
    getFetchData,
    getFetchFeeData,
    postData,
    requestMail,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../Theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
    CheckinAutocomplete,
    Employeeautocomplete,
    ManagerTaskEmpAutocomplete,
    MultiFormikOptimizedAutocomplete,
    Productautocomplete,
    SprintEmpAutocomplete,
    SprintEmpAutocomplete1,
} from "../../../ui-components/global/Autocomplete";
import {
    dataGridHeaderFooterHeight,
    dataGridRowHeight,
    formGap,
} from "../../../ui-components/global/utils";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import GradingIcon from "@mui/icons-material/Grading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import store from "../../..";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as Yup from "yup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getConfig } from "../../../config";

const EditTermfeestructure = () => {

    const config = getConfig();
    const baseurl1 = config.BASE_URL;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();
    console.log("Route Params:", params);
    const dispatch = useDispatch();
    var recID = params.id;
    const compID = sessionStorage.getItem("compID");
    var QA = sessionStorage.getItem("qualityassurance");
    var mode = params.Mode;
  
    const data = useSelector((state) => state.formApi.Data);
    console.log("Fetched Data:", data);
    const Status = useSelector((state) => state.formApi.Status);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const Msg = useSelector((state) => state.formApi.msg);
    const loading = useSelector((state) => state.formApi.getLoading);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const exploreLoading = useSelector((state) => state.exploreApi.loading);

    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const rowSx = { height: 36, "& td, & th": { py: 0.5 } };

    const YearFlag = sessionStorage.getItem("YearFlag");
    const EMPID = sessionStorage.getItem("EmpId");
    const Year = sessionStorage.getItem("year");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const rowData = location.state || {};
    const [subjectid, setSubjectid] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const is003Subscription = SubscriptionCode.endsWith("003");
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    const companyClassification = sessionStorage.getItem("Classification");
    const UserName = sessionStorage.getItem("UserName");
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);
    const empName = sessionStorage.getItem("EmpName");
    const getRawData = sessionStorage.getItem("ClassificationData");
//    const AcademicYearID =
//   !/\d{4}-\d{2}/.test(params.id2 || "")
//     ? params.id2
//     : !/\d{4}-\d{2}/.test(params.id4 || "")
//     ? params.id4
//     : "";
   const AcademicYearID = params.parentID3 || 0;
    let ClassificationData = [];
    try {
        const parsed = JSON.parse(getRawData || "[]");
        ClassificationData = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
    } catch (e) {
        ClassificationData = [];
    }

    const classids = ClassificationData
        .filter(item => ["Board Of Directors", "Teaching Staff"].includes(item.CfcName))
        .map(item => item.CfcID);

    const AcademicType = "T";
    const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");

    const filteredClassification = ClassificationData.filter(
        (item) => item.CfcName !== "Student"
    );
    const classificationIDs = filteredClassification.map((item) => item.CfcID);
    const classificationIDString = classificationIDs.map((id) => `'${id}'`).join(",");

    const [showImage, setShowImage] = useState(params.Mode == "IM" ? true : false);
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const [showMore, setShowMore] = React.useState(false);

    const [rowsByTerm, setRowsByTerm] = useState({});
    const [activeTerm, setActiveTerm] = useState(null);
    const [rowModesModelByTerm, setRowModesModelByTerm] = useState({});
    const [discountByTerm, setDiscountByTerm] = useState({});
    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = React.useState(0);

    // Helper – Get active term key
    const activeTermKey = activeTerm ? String(activeTerm.RecordID) : null;
    const rows = activeTermKey ? (rowsByTerm[activeTermKey] || []) : [];
    const rowModesModel = activeTermKey ? (rowModesModelByTerm[activeTermKey] || {}) : {};

    // ─── Update rows for active term ───────────────────────────────────────
    const setRows = (updater) => {
        if (!activeTermKey) return;
        setRowsByTerm((prev) => {
            const current = prev[activeTermKey] || [];
            const next = typeof updater === "function" ? updater(current) : updater;
            return { ...prev, [activeTermKey]: next };
        });
    };

    // ─── Update row modes model for active term ────────────────────────────
    const setRowModesModel = (updater) => {
        if (!activeTermKey) return;
        setRowModesModelByTerm((prev) => {
            const current = prev[activeTermKey] || {};
            const next = typeof updater === "function" ? updater(current) : updater;
            return { ...prev, [activeTermKey]: next };
        });
    };

    // ─── Discount getter/setter for term ───────────────────────────────────
    const getTermDiscount = (termKey) =>
        discountByTerm[termKey] || { DiscountType: "flat", DiscountValue: 0, Notes: "" };

    const setTermDiscount = (termKey, patch) =>
        setDiscountByTerm((prev) => ({
            ...prev,
            [termKey]: { ...getTermDiscount(termKey), ...patch },
        }));
        const getTermNumber = (termName = "") => {
        const normalized = termName.toLowerCase().replace(/\s/g, "");

        if (normalized.includes("term1") || normalized.includes("termi")) return 1;
        if (normalized.includes("term2") || normalized.includes("termii")) return 2;
        if (normalized.includes("term3") || normalized.includes("termiii")) return 3;
        if (normalized.includes("term4") || normalized.includes("termiv")) return 4;

        return null;
        };

    const [sendReminder, setSendReminder] = useState(false);
    const [autoLateFine, setAutoLateFine] = useState(false);
    const [allowPartialPayment, setAllowPartialPayment] = useState(true);

    useEffect(() => {
        dispatch(getFetchFeeData({ accessID: "TR387", get: "get", recID, AcademicType }));
    }, []);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch validationcms.json");
            return res.json();
        })
      .then((data) => {
    setErrorMsgData(data);
    const schema = Yup.object().shape({
        Terms: Yup.array()
            .min(1, data.TermFees.Terms)
            .required(data.TermFees.Terms),
        Standard: Yup.array()
            .min(1, data.TermFees.Standard)
            .required(data.TermFees.Standard),
       Structurename: Yup.string().required(data.TermFees.Structurename),
    });
    setValidationSchema(schema);
})
        .catch((err) =>
            console.error("Error loading validationcms.json:", err)
        );
    }, []);
    useEffect(() => {
        if (data && mode !== "A") {
            setSendReminder(data.SendReminderBefore === true || data.SendReminderBefore === "Y");
            setAutoLateFine(data.AutoApplyLateFine === true || data.AutoApplyLateFine === "Y");
            setAllowPartialPayment(data.AllowPartialPayment === true || data.AllowPartialPayment === "Y");
        }
    }, [data, mode]);

   useEffect(() => {
    if (mode !== "A" && data?.Terms !== undefined) {
        if (!Array.isArray(data.Terms) || data.Terms.length === 0) {
            setRowsByTerm({});
            return;
        }

        // Always rebuild fresh from API data — never skip based on existing state
        const newRowsByTerm = {};
        data.Terms.forEach((termObj) => {
            const termKey = String(termObj.TermsID);
            if (Array.isArray(termObj.Detail)) {
                newRowsByTerm[termKey] = termObj.Detail.map((item) => ({
                    id: Number(item.DetailID) || nanoid(),
                    RecordID: Number(item.DetailID) || nanoid(),
                    Component: item.Component || "",
                    HSNCode: item.HSNCode || "",
                    CGST: item.CGST || 0,
                    SGST: item.SGST || 0,
                    IGST: item.IGST || 0,
                    Amount: item.Amount || 0,
                    Fine: item.Fine || 0,
                    ON: item.IsActive === "Y" || item.IsActive === true,
                    SortOrder: item.SortOrder || 0,
                    isNew: false,
                }));
            }
        });

        // REPLACE entirely — do not merge with prev, which would keep stale term data
        setRowsByTerm(newRowsByTerm);
    }
}, [data, mode]);

useEffect(() => {
    if (
        data?.TermsList &&
        Array.isArray(data.TermsList) &&
        data.TermsList.length > 0 &&
        mode !== "A"
    ) {
        // Always reset to first term of the newly loaded record
        setActiveTerm({
            RecordID: String(data.TermsList[0].RecordID),
            Name: data.TermsList[0].Name,
        });
    } else if (mode !== "A") {
        setActiveTerm(null);
    }
}, [data, mode]); // removed !activeTerm guard — always reset on data change

    const handleTermsChange = (newValue, setFieldValue) => {
        setFieldValue("Terms", newValue, true);
        if (!activeTerm && newValue && newValue.length > 0) {
            setActiveTerm(newValue[0]);
            setPage(0);
        } else if (newValue && newValue.length > 0 && activeTerm) {
            const still = newValue.find((t) => String(t.RecordID) === String(activeTerm.RecordID));
            if (!still) {
                setActiveTerm(newValue[0]);
                setPage(0);
            }
        } else if (!newValue || newValue.length === 0) {
            setActiveTerm(null);
        }
    };

    // ─── Handle row edit stop ──────────────────────────────────────────────
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    // ─── Handle edit click ─────────────────────────────────────────────────
    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };

    // ─── Handle save click ─────────────────────────────────────────────────
    const handleSaveClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
    };

    // ─── Handle delete click ───────────────────────────────────────────────
    // const handleDeleteClick = (id) => async () => {
    //     try {
    //         const targetRow = rows.find((row) => row.id === id);
    //         const RecordID = targetRow?.RecordID;

    //         setRows((prevRows) => prevRows.filter((row) => row.id !== id));

    //         if (!RecordID || isNaN(Number(RecordID))) {
    //             toast.success("Deleted Successfully");
    //             return;
    //         }

    //         const response = await dispatch(
    //             postData({
    //                 accessID: "TR387",
    //                 action: "harddelete",
    //                 idata: {
    //                     DetailID: Number(RecordID),
    //                     CompanyID: compID,
    //                 },
    //             })
    //         );

    //         if (response?.payload?.Status === "Y") {
    //             toast.success(response.payload.Msg);
    //         } else {
    //             toast.error(response?.payload?.Msg || "Delete failed");
    //         }
    //     } catch (error) {
    //         console.error("Delete Error:", error);
    //         toast.error("Error occurred while deleting.");
    //     }
    // };
    
      const handleDeleteClick = (id) => async () => {
        console.log("🚀 ~ handleDeleteClick ~ id:", id)
        try {
          setRows((prev) => prev.filter((row) => row.RecordID !== id));
          
          console.log("🚀 ~ handleDeleteClick ~ rows:", rows)
        } catch (error) {
          console.error("Error deleting row:", error);
          toast.error("Error occurred during delete.");
        }
      };
    // ─── Handle cancel click ───────────────────────────────────────────────
    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows((prev) => prev.filter((row) => row.id !== id));
        }
    };

    // ─── Validate row ──────────────────────────────────────────────────────
    const validateRowTT = (row) => {
        if (!row.Component || String(row.Component).trim() === "") {
            return "Please enter the Component name";
        }
        return null;
    };

    // ─── Save individual row (insert/update) ───────────────────────────────
    const Fnsave = async (payload, isNew) => {
        const action = isNew ? "insert" : "update";
        const idata = {
            CompanyID: compID?.toString(),
            HeaderID: recID,
            TermsID: activeTermKey || 0,
            StandardID: 0,
            AcademicType: AcademicType,
            AcademicTypeID: params.parentID1 || 0,                                  // "T"
            Detail: [
                {
                    Component: payload.Component || "",
                    HSNCode: payload.HSNCode || "",
                    CGST: payload.CGST || 0,
                    SGST: payload.SGST || 0,
                    IGST: payload.IGST || 0,
                    Amount: payload.Amount || 0,
                    Fine: payload.Fine || 0,
                    IsActive: payload.ON ? "Y" : "N",
                    SortOrder: payload.SortOrder || 0,
                    DetailID: isNew ? -1 : Number(payload.DetailID),
                },
            ],
        };

        // Uncomment when API is ready:
        // const response = await dispatch(postData({ accessID: "TR387", action, idata }));
        // if (response?.payload?.Status === "Y") {
        //     toast.success(response.payload.Msg);
        //     return response.payload?.HeaderID;
        // } else if (response?.payload?.Status === "E") {
        //     toast(response.payload.Msg, { icon: <WarningIcon style={{ color: "#f59e0b" }} /> });
        //     return response.payload?.HeaderID;
        // } else {
        //     toast.error(response?.payload?.Msg || "Save failed");
        // }
    };

    // ─── Process row update ────────────────────────────────────────────────
    const processRowUpdate = async (newRow, oldRow) => {
        const validationError = validateRowTT(newRow);
        if (validationError) throw new Error(validationError);

        const isNew = isNaN(Number(newRow.RecordID));

        const payload = {
            Component: newRow.Component || "",
            HSNCode: newRow.HSNCode || "",
            CGST: newRow.CGST || 0,
            SGST: newRow.SGST || 0,
            IGST: newRow.IGST || 0,
            Amount: newRow.Amount || 0,
            Fine: newRow.Fine || 0,
            ON: newRow.ON !== false,
            SortOrder: newRow.SortOrder || 0,
            DetailID: isNew ? -1 : Number(newRow.RecordID),
            TermsID: activeTermKey,
        };

        try {
            const HeaderID = await Fnsave(payload, isNew);
            const updatedRow = { ...newRow, RecordID: HeaderID || newRow.RecordID, isNew: false };
            setRows((prevRows) =>
                prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
            );
            return updatedRow;
        } catch (err) {
            console.error("Row save failed:", err);
            throw err;
        }
    };

    // ─── Handle row modes model change ─────────────────────────────────────
    const handleRowModesModelChange = (newModel) => {
        setRowModesModel(newModel);
    };

    // ─── Handle logout / close ─────────────────────────────────────────────
    const fnLogOut = (props) => {
        Swal.fire({
            title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
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

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ░░░░░░░░░░░░░░░░░ DATA GRID COLUMNS ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const TTColumns = [
        { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
        {
            headerName: "Component",
            field: "Component",
            width: 250,
            editable: true,
            headerAlign: "center",
        },
        {
            headerName: "Amount (₹)",
            field: "Amount",
            width: 130,
            editable: true,
            headerAlign: "center",
            type: "number",
        },
        {
            headerName: "Fine/Day (₹)",
            field: "Fine",
            width: 130,
            editable: true,
            headerAlign: "center",
            type: "number",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            hide: mode === "V",
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" sx={{ color: "primary.main" }} onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
                    ];
                }
                return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
                ];
            },
        },
    ];

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id,
                Component: "",
                HSNCode: "",
                CGST: 0,
                SGST: 0,
                IGST: 0,
                Amount: 0,
                Fine: 0,
                ON: true,
                SortOrder: 0,
                isNew: true,
            };
            setRows((oldRows) => {
                const updatedRows = [...oldRows, newRow];
                const newPageIndex = Math.floor((updatedRows.length - 1) / pageSize);
                setPage(newPageIndex);
                return updatedRows;
            });
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "Component" },
            }));
        };

        return (
            <GridToolbarContainer sx={{ marginBottom: "10px", display: "flex", justifyContent: "flex-start" }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} disabled={!activeTerm}>
                    Add Fee Component
                </Button>
            </GridToolbarContainer>
        );
    }

    // ─── Totals for active term ────────────────────────────────────────────
    const activeRows = activeTermKey ? (rowsByTerm[activeTermKey] || []) : [];
    const activeOnlyRows = activeRows.filter((r) => r.ON !== false);
    const totalAmount = activeOnlyRows.reduce((sum, row) => sum + Number(row.Amount || 0), 0);
    const totalFinePerDay = activeOnlyRows.reduce((sum, row) => sum + Number(row.Fine || 0), 0);

    const getDiscountCalculation = () => {
        const disc = getTermDiscount(activeTermKey);
        const discAmt =
            disc.DiscountType === "percent"
                ? Math.round((totalAmount * Number(disc.DiscountValue || 0)) / 100)
                : Number(disc.DiscountValue || 0);
        return { discountAmount: discAmt, netTotal: Math.max(0, totalAmount - discAmt) };
    };

    const { discountAmount, netTotal } = getDiscountCalculation();

   
    const buildSaveJson = (values) => {
        const selectedTermsList = Array.isArray(values.Terms) ? values.Terms : [];

        // Build per-term detail arrays
        const Terms = selectedTermsList.map((term) => {
            const termKey = String(term.RecordID);
            const termRows = rowsByTerm[termKey] || [];

            const Detail = termRows.map((row, idx) => ({
                // DetailID only for update; omit (or -1) for insert
                ...(isNaN(Number(row.RecordID)) ? {} : { DetailID: Number(row.RecordID) }),
                Component: row.Component || "",
                HSNCode: row.HSNCode || "",
                CGST: Number(row.CGST || 0),
                SGST: Number(row.SGST || 0),
                IGST: Number(row.IGST || 0),
                Amount: Number(row.Amount || 0),
                Fine: Number(row.Fine || 0),
                IsActive: row.ON !== false ? "Y" : "N",
                SortOrder: row.SortOrder || idx + 1,
            }));

            return {
                TermsID: Number(term.RecordID),
                Detail,
            };
        });

        // Build FeeSummary per term
        const FeeSummary = selectedTermsList.map((term) => {
            const termKey = String(term.RecordID);
            const termRows = (rowsByTerm[termKey] || []).filter((r) => r.ON !== false);
            const termTotal = termRows.reduce((s, r) => s + Number(r.Amount || 0), 0);
            const termFine = termRows.reduce((s, r) => s + Number(r.Fine || 0), 0);
            return {
                TermsID: Number(term.RecordID),
                TotalAmount: termTotal,
                TotalFinePerDay: termFine,
            };
        });

        return {
            // accessid: "TR387",
            // action: mode === "A" ? "insert" : "update",
            AcademicType: AcademicType,
            AcademicTypeID: params.parentID1 || 0,                                  // "T"                                  // "T"
            CompanyID: compID?.toString() || "1",
            HeaderID: recID ? Number(recID) : 0,                         // 0 for new
            StructureName: values.Structurename || "",
            TermsID: selectedTermsList.map((t) => t.RecordID).join(","), // "101,102,103"
            StandardID: Array.isArray(values.Standard)
                ? values.Standard.map((d) => d.RecordID).join(",")
                : "",                                                     // "4,5"
            AcademicYearID: AcademicYearID || 0,
            Term1DueDate: values.term1duedate || null,
            Term2DueDate: values.term2duedate || null,
            Term3DueDate: values.term3duedate || null,
            Term4DueDate: values.term4duedate || null,
            AnnualDueDate:"",
            SendReminderBefore: sendReminder == false ? "N": "Y",                            // bool
            AutoApplyLateFine: autoLateFine == false ? "N": "Y",                             // bool
            AllowPartialPayment: allowPartialPayment == false ? "N": "Y",
            GSTApplicable: "N",                    // bool
            SortOrder: 1,
            Disable: "N",
            FeeSummary,
            Terms,
        };
    };

    // ─── Handle save button click ───────────────────────────────────────────
const handleSaveButtonClick = async (values, validateForm, setTouched) => {
    // 1. Run Formik validation
    const errors = await validateForm();

    // 2. Build dynamic due-date errors
    const dueDateErrors = {};
    if (Array.isArray(values.Terms)) {
        values.Terms.forEach((term) => {
            const termNumber = getTermNumber(term.Name);
            if (termNumber) {
                const fieldName = `term${termNumber}duedate`;
                if (!values[fieldName]) {
                    dueDateErrors[fieldName] = `Term ${termNumber} due date is required`;
                }
            }
        });
    }

    const allErrors = { ...errors, ...dueDateErrors };

    if (Object.keys(allErrors).length > 0) {
        // Touch all fields so errors show
        const touchedFields = {};
        Object.keys(allErrors).forEach((key) => {
            touchedFields[key] = true;
        });
        setTouched(touchedFields, false);
        // toast.error("Please fill all required fields.");
        return;
    }

    const saveJson = buildSaveJson(values);
    console.log("Save JSON:", JSON.stringify(saveJson, null, 2));

    try {
        const response = await dispatch(
            postData({
                accessID: "TR387",
                action: mode === "A" ? "insert" : "update",
                idata: saveJson,
            })
        );
        if (response?.payload?.Status === "Y") {
            setRowsByTerm({});
            setRowModesModelByTerm({});
            toast.success(response.payload.Msg);
            navigate(-1);
        } else {
            toast.error(response?.payload?.Msg || "Save failed");
        }
    } catch (error) {
        console.error("Save error:", error);
        toast.error("Error occurred during save.");
    }
};


    const TimeTableInitialValue = {
        Structurename: data?.StructureName || "",

        // TermsList from GET: [{ RecordID, Code, Name }]
        Terms: Array.isArray(data?.TermsList)
            ? data.TermsList.map((d) => ({
                RecordID: String(d.RecordID),
                Name: d.Name || d.Code || String(d.RecordID),
            }))
            : [],

        // Standards from GET: [{ RecordID, Code, Name }]
        Standard: Array.isArray(data?.Standards)
            ? data.Standards.map((d) => ({
                RecordID: String(d.RecordID),
                Name: d.Name || d.Code || String(d.RecordID),
            }))
            : [],

        academicyear: rowData.AcademicYear || "",

        // Dates: strip the time part if present (e.g. "2026-06-05T00:00:00" → "2026-06-05")
        term1duedate: data?.Term1DueDate ? data.Term1DueDate.split("T")[0] : "",
        term2duedate: data?.Term2DueDate ? data.Term2DueDate.split("T")[0] : "",
        term3duedate: data?.Term3DueDate ? data.Term3DueDate.split("T")[0] : "",
        term4duedate: data?.Term4DueDate ? data.Term4DueDate.split("T")[0] : "",
    };

    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}
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
                        <Box display={isNonMobile ? "flex" : "none"} borderRadius="3px" alignItems="center">
                            <Breadcrumbs
                                maxItems={3}
                                aria-label="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                            >
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default", marginLeft: "10px", fontSize: "17px" }}
                                    onClick={() => navigate(-1)}
                                >
                                    Term Fee Structure
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

            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Formik
                    initialValues={TimeTableInitialValue}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => { }}

                >
                    {({
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                        values,
                        handleSubmit,
                        setFieldValue,
                        validateForm,   // ← add
                        setTouched, 
                    }) => (
                        <form onSubmit={handleSubmit}>

                           <Box
                                display="grid"
                                gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4",
                                    },
                                }}
                            >
                                {/* Structure Name → data.StructureName */}
                                <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                <TextField
                                    name="Structurename"
                                    type="text"
                                    id="Structurename"
                                    label={<>Structure Name <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                    variant="standard"
                                    focused
                                    value={values.Structurename}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // error={!!touched.Structurename && !!errors.Structurename}
                                    // helperText={touched.Structurename && errors.Structurename}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                 {touched.Structurename && errors.Structurename && (
                            <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                              {errors.Structurename}
                            </div>
                          )}
                                </FormControl>
                                {/* Terms → data.TermsList */}
                                <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                <MultiFormikOptimizedAutocomplete
                                    // sx={{ gridColumn: "span 2" }}
                                    name="Terms"
                                    label={<>Term <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                    id="Terms"
                                    value={values.Terms}
                                    onChange={(e, newValue) => handleTermsChange(newValue, setFieldValue)}
                                    isOptionEqualToValue={(option, value) =>
                                        String(option.RecordID) === String(value.RecordID)
                                    }
                                    error={!!touched.Terms && !!errors.Terms}
                                    helperText={touched.Terms && errors.Terms}
                                    url={`${listViewurl}?data=${JSON.stringify({
                                        Query: {
                                            AccessID: "2169",
                                            ScreenName: "Terms",
                                            VerticalLicense: Subscriptionlastthree,
                                            Filter: `CompanyID='${compID}' AND AcademicYearID='${AcademicYearID}'`,
                                            Any: "",
                                        },
                                    })}`}
                                    multiple
                                />
                        {touched.Terms && errors.Terms && (
                            <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                              {errors.Terms}
                            </div>
                          )}
                          </FormControl>
                                {/* Standard → data.Standards */}
                                <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
                                <MultiFormikOptimizedAutocomplete
                                    // sx={{ gridColumn: "span 2" }}
                                    name="Standard"
                                    label={<>Applicable Standards <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                    id="Standard"
                                    value={values.Standard}
                                    onChange={(e, newValue) => setFieldValue("Standard", newValue, true)}
                                    isOptionEqualToValue={(option, value) =>
                                        String(option.RecordID) === String(value.RecordID)
                                    }
                                    error={!!touched.Standard && !!errors.Standard}
                                    helperText={touched.Standard && errors.Standard}
                                    url={`${listViewurl}?data=${JSON.stringify({
                                        Query: {
                                            AccessID: "2054",
                                            ScreenName: "Standard",
                                            VerticalLicense: Subscriptionlastthree,
                                            Filter: `parentID='${compID}'`,
                                            Any: "",
                                        },
                                    })}`}
                                    multiple
                                />
                                    {touched.Standard && errors.Standard && (
                                <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                                {errors.Standard}
                                </div>
                            )}
</FormControl>
                                {/* Term Due Dates → data.Term1DueDate … Term4DueDate */}
                               {values.Terms.map((term) => {
    const termNumber = getTermNumber(term.Name);
    if (!termNumber) return null;
    const fieldName = `term${termNumber}duedate`;
    return (
        <FormControl gap={1} sx={{ gridColumn: "span 2" }} key={term.RecordID}>
            <TextField
                name={fieldName}
                type="date"
                label={<>Term {termNumber} Due Date <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                variant="standard"
                focused
                value={values[fieldName] || ""}
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
                // error={!!touched[fieldName] && !values[fieldName]}
            />
            {touched[fieldName] && !values[fieldName] && (
                <div style={{ color: "red", fontSize: "10px", marginTop: "2px", gridColumn: "span 2" }}>
                    Please enter the Term {termNumber} Due Date
                </div>
            )}
        </FormControl>
    );
})}
                                  {/* <TextField
                                    name="term1duedate"
                                    type="date"
                                    id="term1duedate"
                                    label="Term I Due Date"
                                    variant="standard"
                                    focused
                                    value={values.term1duedate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="term2duedate"
                                    type="date"
                                    id="term2duedate"
                                    label="Term II Due Date"
                                    variant="standard"
                                    focused
                                    value={values.term2duedate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="term3duedate"
                                    type="date"
                                    id="term3duedate"
                                    label="Term III Due Date"
                                    variant="standard"
                                    focused
                                    value={values.term3duedate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="term4duedate"
                                    type="date"
                                    id="term4duedate"
                                    label="Term IV Due Date"
                                    variant="standard"
                                    focused
                                    value={values.term4duedate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{ shrink: true }}
                                />                                 */}
                                
                            </Box>

                            {/* ── Fee Components Section ── */}
                            <Box px={1} mt={1}>
                                {/* Term tab buttons */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mb={1}
                                    flexWrap="wrap"
                                    gap={1}
                                >
                                    {Array.isArray(values.Terms) && values.Terms.length > 0 && (
                                        <Box display="flex" gap={1} flexWrap="wrap">
                                            {values.Terms.map((term) => {
                                                const isActive =
                                                    activeTerm &&
                                                    String(activeTerm.RecordID) === String(term.RecordID);
                                                return (
                                                    <Button
                                                        key={term.RecordID}
                                                        variant={isActive ? "contained" : "outlined"}
                                                        size="small"
                                                        onClick={() => {
                                                            setActiveTerm(term);
                                                            setPage(0);
                                                        }}
                                                        sx={{
                                                            borderRadius: "20px",
                                                            textTransform: "none",
                                                            fontWeight: 600,
                                                            fontSize: "13px",
                                                            px: 2.5,
                                                            ...(isActive
                                                                ? {
                                                                    background:
                                                                        "linear-gradient(135deg, #00796b, #26a69a)",
                                                                    color: "#fff",
                                                                    border: "none",
                                                                    boxShadow:
                                                                        "0 2px 8px rgba(0,121,107,0.35)",
                                                                    "&:hover": {
                                                                        background:
                                                                            "linear-gradient(135deg, #00695c, #00897b)",
                                                                    },
                                                                }
                                                                : {
                                                                    color: "#00796b",
                                                                    borderColor: "#80cbc4",
                                                                    "&:hover": {
                                                                        borderColor: "#00796b",
                                                                        background: "#e0f2f1",
                                                                    },
                                                                }),
                                                        }}
                                                    >
                                                        {term.Name}
                                                    </Button>
                                                );
                                            })}
                                        </Box>
                                    )}
                                </Box>

                                {/* No term selected hint */}
                                {(!Array.isArray(values.Terms) || values.Terms.length === 0) && (
                                    <Box
                                        sx={{
                                            py: 4,
                                            textAlign: "center",
                                            color: "#94a3b8",
                                            border: "1px dashed #cbd5e1",
                                            borderRadius: "8px",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography>
                                            Please select one or more Terms above to add fee components.
                                        </Typography>
                                    </Box>
                                )}

                                {/* Grid + Summary (only shown when a term is active) */}
                                {activeTerm && (
                                    <Grid container spacing={2} alignItems="flex-start">
                                        {/* LEFT – DataGrid */}
                                        <Grid item xs={12} md={7.5}>
                                            <Box
                                                height="350px"
                                                sx={{
                                                    "& .MuiDataGrid-columnHeaders": {
                                                        backgroundColor: colors.blueAccent[800],
                                                    },
                                                    "& .MuiDataGrid-virtualScroller": {
                                                        backgroundColor: colors.primary[400],
                                                    },
                                                    "& .MuiDataGrid-footerContainer": {
                                                        backgroundColor: colors.blueAccent[800],
                                                    },
                                                    "& .MuiCheckbox-root": {
                                                        color: `${colors.greenAccent[200]} !important`,
                                                    },
                                                    "& .even-row": {
                                                        backgroundColor: "#d0edec",
                                                    },
                                                }}
                                            >
                                                <DataGrid
                                                    sx={{
                                                        "& .MuiDataGrid-footerContainer": {
                                                            height: dataGridHeaderFooterHeight,
                                                            minHeight: dataGridHeaderFooterHeight,
                                                        },
                                                    }}
                                                    rowHeight={dataGridRowHeight}
                                                    headerHeight={dataGridHeaderFooterHeight}
                                                    rows={rows}
                                                    columns={TTColumns}
                                                    editMode="row"
                                                    disableSelectionOnClick
                                                    rowModesModel={rowModesModel}
                                                    onRowModesModelChange={handleRowModesModelChange}
                                                    onRowEditStop={handleRowEditStop}
                                                    processRowUpdate={processRowUpdate}
                                                    getRowId={(row) => row.id}
                                                    disableRowSelectionOnClick
                                                    experimentalFeatures={{ newEditingApi: true }}
                                                    pagination
                                                    pageSize={pageSize}
                                                    page={page}
                                                    components={{ Toolbar: EditToolbar }}
                                                    componentsProps={{
                                                        toolbar: { setRows, setRowModesModel },
                                                    }}
                                                    onPageSizeChange={(newPageSize) =>
                                                        setPageSize(newPageSize)
                                                    }
                                                    onPageChange={(newPage) => setPage(newPage)}
                                                />
                                            </Box>
                                        </Grid>

                                        {/* RIGHT – Fee Summary */}
                                        <Grid item xs={12} md={4.5}>
                                            <Box
                                                mt={0}
                                                p={2.5}
                                                sx={{
                                                    backgroundColor: "#d9ece8",
                                                    border: "1px solid #58c7b6",
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    sx={{ color: "#00695c", mb: 0.5 }}
                                                >
                                                    FEE SUMMARY
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: "#26a69a", display: "block", mb: 1.5 }}
                                                >
                                                    {activeTerm.Name}
                                                </Typography>

                                                {activeRows.length === 0 ? (
                                                    <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic", mb: 1 }}>
                                                        No components added yet.
                                                    </Typography>
                                                ) : (
                                                    activeRows.map((item, index) => (
                                                        <Box key={index}>
                                                            <Box display="flex" justifyContent="space-between" py={0.75}>
                                                                <Typography
                                                                    color={item.ON === false ? "#94a3b8" : "#2f6f67"}
                                                                    sx={{
                                                                        textDecoration: item.ON === false ? "line-through" : "none",
                                                                        fontSize: "13px",
                                                                    }}
                                                                >
                                                                    {item.Component || "(unnamed)"}
                                                                </Typography>
                                                                <Typography
                                                                    fontWeight="bold"
                                                                    color={item.ON === false ? "#94a3b8" : "#004d40"}
                                                                    fontSize="13px"
                                                                >
                                                                    ₹{Number(item.Amount || 0).toLocaleString()}
                                                                </Typography>
                                                            </Box>
                                                            <Divider sx={{ borderColor: "#a8d5cf" }} />
                                                        </Box>
                                                    ))
                                                )}

                                                {/* Gross Total */}
                                                <Box display="flex" justifyContent="space-between" mt={2} mb={0.5}>
                                                    <Typography fontSize="13px" fontWeight={600} color="#004d40">
                                                        Gross Total
                                                    </Typography>
                                                    <Typography fontSize="13px" fontWeight={700} color="#004d40">
                                                        ₹{totalAmount.toLocaleString()}
                                                    </Typography>
                                                </Box>

                                                {/* Total Fine/Day */}
                                                {/* <Box display="flex" justifyContent="space-between" mb={1.5}>
                                                    <Typography fontSize="12px" color="#e65100">
                                                        Total Fine / Day
                                                    </Typography>
                                                    <Typography fontSize="12px" fontWeight={600} color="#e65100">
                                                        ₹{totalFinePerDay.toLocaleString()}
                                                    </Typography>
                                                </Box> */}

                                                {/* Net Total bar */}
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    sx={{
                                                        background: "#004d40",
                                                        borderRadius: "8px",
                                                        px: 1.5,
                                                        py: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2" fontWeight="bold" color="#80cbc4">
                                                        Per Term (Net)
                                                    </Typography>
                                                    <Typography variant="h5" fontWeight="bold" color="#fff">
                                                        ₹{netTotal.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>

                            {/* ── Toggle Options ── */}
                            {/* Mapped to INSERT fields: SendReminderBefore, AutoApplyLateFine, AllowPartialPayment, GSTApplicable */}
                            <Box
                                sx={{
                                    background: "#fff",
                                    borderRadius: "16px",
                                    p: 2,
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                                    mt: 2,
                                    mx: 1,
                                }}
                            >
                                {/* SendReminderBefore */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <NotificationsNoneIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">Send reminder 7 days before</Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>Via SMS & email to parents</Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={sendReminder}
                                        onChange={(e) => setSendReminder(e.target.checked)}
                                        color="success"
                                    />
                                </Box>
                                <Divider />

                                {/* AutoApplyLateFine */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <AccessTimeIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">Auto-apply late fine</Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>Per fine/day set in components</Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={autoLateFine}
                                        onChange={(e) => setAutoLateFine(e.target.checked)}
                                        color="success"
                                    />
                                </Box>
                                <Divider />

                                {/* AllowPartialPayment */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <CreditCardIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">Allow partial payment</Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>Students can pay in installments</Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={allowPartialPayment}
                                        onChange={(e) => setAllowPartialPayment(e.target.checked)}
                                        color="success"
                                    />
                                </Box>
                                <Divider />

                                {/* GSTApplicable */}
                                {/* <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <GradingIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">GST Applicable</Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>Apply GST on fee components</Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={gstApplicable}
                                        onChange={(e) => setGstApplicable(e.target.checked)}
                                        color="success"
                                    />
                                </Box> */}
                            </Box>

                            {/* ── Save / Cancel ── */}
                            <Box display="flex" justifyContent="end" mt="20px" gap="20px" padding={1}>
                            <LoadingButton
                                disabled={mode === "V"}
                                color="secondary"
                                variant="contained"
                                onClick={() => handleSaveButtonClick(values, validateForm, setTouched)}
                                type="button"
                                loading={isLoading}
                            >
                                Save
                            </LoadingButton>
                                <Button
                                    color="warning"
                                    variant="contained"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Paper>
        </React.Fragment>
    );
};

export default EditTermfeestructure;
// import {
//     TextField,
//     Box,
//     Grid,
//     Typography,
//     useTheme,
//     FormControl,
//     FormLabel,
//     Button,
//     IconButton,
//     Stack,
//     FormControlLabel,
//     Tooltip,
//     Checkbox,
//     InputLabel,
//     Select,
//     MenuItem,
//     Breadcrumbs,
//     LinearProgress,
//     Chip,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Hidden,
//     Divider,
//     Switch
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import CancelIcon from "@mui/icons-material/Cancel";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { nanoid } from "@reduxjs/toolkit";
// import AddIcon from "@mui/icons-material/Add";
// import WarningIcon from '@mui/icons-material/Warning';
// import {
//     GridActionsCellItem,
//     DataGrid,
//     GridRowModes,
//     GridToolbarContainer,
//     GridRowEditStopReasons,
// } from "@mui/x-data-grid";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import { Formik } from "formik";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//     getFetchData,
//     getFetchFeeData,
//     postData,
//     requestMail,
// } from "../../../store/reducers/Formapireducer";
// import React, { useState, useEffect, useRef } from "react";
// import { LoadingButton } from "@mui/lab";
// import Swal from "sweetalert2";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { tokens } from "../../../Theme";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import {
//     CheckinAutocomplete,
//     Employeeautocomplete,
//     ManagerTaskEmpAutocomplete,
//     MultiFormikOptimizedAutocomplete,
//     Productautocomplete,
//     SprintEmpAutocomplete,
//     SprintEmpAutocomplete1,
// } from "../../../ui-components/global/Autocomplete";
// import {
//     dataGridHeaderFooterHeight,
//     dataGridRowHeight,
//     formGap,
// } from "../../../ui-components/global/utils";
// import { attachmentPost } from "../../../store/reducers/LoginReducer";
// import GradingIcon from "@mui/icons-material/Grading";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import axios from "axios";
// import store from "../../..";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import * as Yup from "yup";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { getConfig } from "../../../config";

// const EditTermfeestructure = () => {

//     const config = getConfig();
//     const baseurl1 = config.BASE_URL;
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const navigate = useNavigate();
//     const params = useParams();
//     console.log("Route Params:", params);
//     const dispatch = useDispatch();
//     var recID = params.id;
//     const compID = sessionStorage.getItem("compID");
//     var QA = sessionStorage.getItem("qualityassurance");
//     var mode = params.Mode;
//     const data = useSelector((state) => state.formApi.Data);
//     console.log("Fetched Data:", data);
//     const Status = useSelector((state) => state.formApi.Status);
//     const listViewurl = useSelector((state) => state.globalurl.listViewurl);
//     const Msg = useSelector((state) => state.formApi.msg);
//     const loading = useSelector((state) => state.formApi.getLoading);
//     const isLoading = useSelector((state) => state.formApi.postLoading);
//     const getLoading = useSelector((state) => state.formApi.getLoading);
//     const exploreLoading = useSelector((state) => state.exploreApi.loading);
//     const [open, setOpen] = useState(false);
//     const [files, setFiles] = useState([]);
//     const [Loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
//     const YearFlag = sessionStorage.getItem("YearFlag");
//     const EMPID = sessionStorage.getItem("EmpId");
//     const Year = sessionStorage.getItem("year");
//     const { toggleSidebar, broken, rtl } = useProSidebar();
//     const location = useLocation();
//     const rowData = location.state || {};
//     const [subjectid, setSubjectid] = useState(null);
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
//     const is003Subscription = SubscriptionCode.endsWith("003");
//     const lastThree = SubscriptionCode?.slice(-3) || "";
//     const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
//         ? lastThree
//         : "";
//     const companyClassification = sessionStorage.getItem("Classification");
//     const UserName = sessionStorage.getItem("UserName");
//     const sliceSubscriptionCode = SubscriptionCode.slice(-3);
//     const empName = sessionStorage.getItem("EmpName");
//     const getRawData = sessionStorage.getItem("ClassificationData");

//     let ClassificationData = [];
//     try {
//         const parsed = JSON.parse(getRawData || "[]");
//         ClassificationData = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
//     } catch (e) {
//         ClassificationData = [];
//     }

//     const classids = ClassificationData
//         .filter(item => ["Board Of Directors", "Teaching Staff"].includes(item.CfcName))
//         .map(item => item.CfcID);
//         const AcademicType = "T";

//     const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");

//     const filteredClassification = ClassificationData.filter(
//         (item) => item.CfcName !== "Student"
//     );
//     const classificationIDs = filteredClassification.map(
//         (item) => item.CfcID
//     );
//     const classificationIDString = classificationIDs
//         .map((id) => `'${id}'`)
//         .join(",");

//     const [showImage, setShowImage] = useState(
//         params.Mode == "IM" ? true : false,
//     );
//     const [errorMsgData, setErrorMsgData] = useState(null);
//     const [validationSchema, setValidationSchema] = useState(null);
//     const [showMore, setShowMore] = React.useState(false);

//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     // ░░░░░░░░░░░░░░░░░ PER-TERM STATE MANAGEMENT ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
//     const [rowsByTerm, setRowsByTerm] = useState({}); 
//     const [activeTerm, setActiveTerm] = useState(null);
//     const [rowModesModelByTerm, setRowModesModelByTerm] = useState({});
//     const [discountByTerm, setDiscountByTerm] = useState({});
//     const [pageSize, setPageSize] = useState(15);
//     const [page, setPage] = React.useState(0);

//     // Helper – Get active term key
//     const activeTermKey = activeTerm ? String(activeTerm.RecordID) : null;
//     const rows = activeTermKey ? (rowsByTerm[activeTermKey] || []) : [];
//     const rowModesModel = activeTermKey ? (rowModesModelByTerm[activeTermKey] || {}) : {};

//     // ─── Update rows for active term ───────────────────────────────────────
//     const setRows = (updater) => {
//         if (!activeTermKey) return;
//         setRowsByTerm((prev) => {
//             const current = prev[activeTermKey] || [];
//             const next = typeof updater === "function" ? updater(current) : updater;
//             return { ...prev, [activeTermKey]: next };
//         });
//     };

//     // ─── Update row modes model for active term ────────────────────────────
//     const setRowModesModel = (updater) => {
//         if (!activeTermKey) return;
//         setRowModesModelByTerm((prev) => {
//             const current = prev[activeTermKey] || {};
//             const next = typeof updater === "function" ? updater(current) : updater;
//             return { ...prev, [activeTermKey]: next };
//         });
//     };

//     // ─── Discount getter/setter for term ───────────────────────────────────
//     const getTermDiscount = (termKey) =>
//         discountByTerm[termKey] || { DiscountType: "flat", DiscountValue: 0, Notes: "" };

//     const setTermDiscount = (termKey, patch) =>
//         setDiscountByTerm((prev) => ({
//             ...prev,
//             [termKey]: { ...getTermDiscount(termKey), ...patch },
//         }));

//     // ─── Form field states ─────────────────────────────────────────────────
//     const [selectedTermsID, setSelectedTermsID] = useState(data.TermsID ? data.TermsID : 0);
//     const [termsIDPass, setTermsIDPas] = useState(data?.SlotGroupID ? data?.SlotGroupID : 0);
//     const [formDescription, setFormDescription] = useState(data?.Description ? data?.Description : "");

//     // ─── Notification toggle states ────────────────────────────────────────
//     const [sendReminder, setSendReminder] = useState(true);
//     const [autoLateFine, setAutoLateFine] = useState(true);
//     const [allowPartialPayment, setAllowPartialPayment] = useState(false);
//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     // ░░░░░░░░░░░░░░░░░░░ EFFECTS ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//     useEffect(() => {
//         // if (mode == "A") {
//              dispatch(getFetchFeeData({ accessID: "TR387", get: "get", recID,AcademicType}));
//         // }
//     }, []);

//     // ─── Populate rows from API data when editing ──────────────────────────
//     useEffect(() => {
//         if (mode !== "A" && data?.Detail && activeTerm) {
//             const termKey = String(activeTerm.RecordID);
            
//             // Check if rows already loaded for this term
//             if (rowsByTerm[termKey]) return;
            
//             const filtered = data.Detail.filter(
//                 (item) => String(item.TermID || item.TermsID) === termKey
//             );
            
//             if (filtered.length === 0) return;
            
//             const formattedRows = filtered.map((item) => ({
//                 id: Number(item.DetailID),
//                 RecordID: Number(item.DetailID),
//                 Component: item.Component || "",
//                 Category: item.Category || "",
//                 Amount: item.Amount || 0,
//                 Fine: item.Fine || 0,
//                 ON: item.IsActive === "Y" || item.IsActive === true,
//                 isNew: false,
//             }));
            
//             setRowsByTerm((prev) => ({
//                 ...prev,
//                 [termKey]: formattedRows,
//             }));
//         }
//     }, [data, activeTerm, mode]);

//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     // ░░░░░░░░░░░░░░░░░░░ HANDLERS ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//     // ─── Handle Terms selection change ─────────────────────────────────────
//     const handleTermsChange = (newValue, setFieldValue) => {
//         setFieldValue("Terms", newValue, true);
//         if (!activeTerm && newValue && newValue.length > 0) {
//             setActiveTerm(newValue[0]);
//             setPage(0);
//         } else if (newValue && newValue.length > 0 && activeTerm) {
//             const still = newValue.find((t) => String(t.RecordID) === String(activeTerm.RecordID));
//             if (!still) {
//                 setActiveTerm(newValue[0]);
//                 setPage(0);
//             }
//         } else if (!newValue || newValue.length === 0) {
//             setActiveTerm(null);
//         }
//     };

//     // ─── Handle row edit stop ──────────────────────────────────────────────
//     const handleRowEditStop = (params, event) => {
//         if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//             event.defaultMuiPrevented = true;
//         }
//     };

//     // ─── Handle edit click ─────────────────────────────────────────────────
//     const handleEditClick = (id) => () => {
//         setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
//     };

//     // ─── Handle save click ─────────────────────────────────────────────────
//     const handleSaveClick = (id) => () => {
//         setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
//     };

//     // ─── Handle delete click ───────────────────────────────────────────────
//     const handleDeleteClick = (id) => async () => {
//         try {
//             const targetRow = rows.find((row) => row.id === id);
//             const RecordID = targetRow?.RecordID;

//             setRows((prevRows) => prevRows.filter((row) => row.id !== id));

//             if (!RecordID || isNaN(Number(RecordID))) {
//                 toast.success("Deleted Successfully");
//                 return;
//             }

//             const response = await dispatch(
//                 postData({
//                     accessID: "TR387",
//                     action: "harddelete",
//                     idata: {
//                         DetailID: Number(RecordID),
//                         CompanyID: compID,
//                     },
//                 })
//             );

//             if (response?.payload?.Status === "Y") {
//                 toast.success(response.payload.Msg);
//                 // dispatch(getFetchFeeData({ accessID: "TR387", get: "get", recID,AcademicType }));
//             } else {
//                 toast.error(response?.payload?.Msg || "Delete failed");
//             }
//         } catch (error) {
//             console.error("Delete Error:", error);
//             toast.error("Error occurred while deleting.");
//         }
//     };

//     // ─── Handle cancel click ───────────────────────────────────────────────
//     const handleCancelClick = (id) => () => {
//         setRowModesModel((prev) => ({
//             ...prev,
//             [id]: { mode: GridRowModes.View, ignoreModifications: true },
//         }));
//         const editedRow = rows.find((row) => row.id === id);
//         if (editedRow?.isNew) {
//             setRows((prev) => prev.filter((row) => row.id !== id));
//         }
//     };

//     // ─── Validate row ──────────────────────────────────────────────────────
//     const validateRowTT = (row) => {
//         if (!row.Component || String(row.Component).trim() === "") {
//             return "Please enter the Component name";
//         }
//         return null;
//     };

//     // ─── Save individual row (insert/update) ───────────────────────────────
//     const Fnsave = async (payload, isNew) => {
//         const action = isNew ? "insert" : "update";
// //  const TermIds =  values.Terms?.map((d) => d.RecordID) || [];
// //   const StandardIds =  values.Standard?.map((d) => d.RecordID) || [];

//         const idata = {
//             CompanyID: compID?.toString(),
//             HeaderID: recID,
//             ProjectID: rowData.projectID || 0,
//             TermsID: activeTermKey || 0,
//             // TermsID : TermI.join(","),
//             StandardID: 0,
//             AcademicType: AcademicType,
//             Detail: [
//                 {
//                     Component: payload.Component || "",
//                     Amount: payload.Amount || 0,
//                     Fine: payload.Fine || 0,
//                     DetailID: isNew ? -1 : Number(payload.DetailID),
//                 },
//             ],
//         };

//         // const response = await dispatch(
//         //     postData({ accessID: "TR387", action, idata })
//         // );

//         // if (response?.payload?.Status === "Y") {
//         //     toast.success(response.payload.Msg);
//         //     const HeaderID = response.payload?.HeaderID;
//         //     if (HeaderID) {
//         //         // dispatch(getFetchFeeData({ accessID: "TR387", get: "get", recID: HeaderID ,AcademicType}));
//         //     }
//         //     return HeaderID;
//         // } else if (response?.payload?.Status === "E") {
//         //     toast(response.payload.Msg, { icon: <WarningIcon style={{ color: "#f59e0b" }} /> });
//         //     const HeaderID = response.payload?.HeaderID;
//         //     if (HeaderID) {
//         //         // dispatch(getFetchFeeData({ accessID: "TR387", get: "get", recID: HeaderID ,AcademicType}));
//         //     }
//         //     return HeaderID;
//         // } else if (response?.payload?.Status === "N") {
//         //     toast.error(response.payload.Msg);
//         // }
//     };

//     // ─── Process row update ────────────────────────────────────────────────
//     const processRowUpdate = async (newRow, oldRow) => {
//         const validationError = validateRowTT(newRow);
//         if (validationError) throw new Error(validationError);

//         const isNew = isNaN(Number(newRow.RecordID));

//         const payload = {
//             Component: newRow.Component || "",
//             Category: newRow.Category || "",
//             Amount: newRow.Amount || 0,
//             Fine: newRow.Fine || 0,
//             ON: newRow.ON || false,
//             DetailID: isNew ? -1 : Number(newRow.RecordID),
//             TermsID: activeTermKey,
//         };

//         try {
//             const HeaderID = await Fnsave(payload, isNew);
//             const updatedRow = { ...newRow, RecordID: HeaderID || newRow.RecordID, isNew: false };
//             setRows((prevRows) =>
//                 prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
//             );
//             return updatedRow;
//         } catch (err) {
//             console.error("Row save failed:", err);
//             throw err;
//         }
//     };

//     // ─── Handle row modes model change ─────────────────────────────────────
//     const handleRowModesModelChange = (newModel) => {
//         setRowModesModel(newModel);
//     };

//     // ─── Handle logout ─────────────────────────────────────────────────────
//     const fnLogOut = (props) => {
//         Swal.fire({
//             title: errorMsgData?.Warningmsg?.[props] || `Are you sure you want to ${props}?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: props,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 if (props === "Logout") navigate("/");
//                 if (props === "Close") navigate(-1);
//             }
//         });
//     };


//     const TTColumns = [
//         { field: "RecordID", headerName: "Record ID", width: 120, hide: true },
//         {
//             headerName: "Component",
//             field: "Component",
//             width: 250,
//             editable: true,
//             headerAlign: "center",
//         },
//         // {
//         //     headerName: "Category",
//         //     field: "Category",
//         //     width: 250,
//         //     editable: true,
//         //     headerAlign: "center",
//         // },
//         {
//             headerName: "Amount (₹)",
//             field: "Amount",
//             width: 130,
//             editable: true,
//             headerAlign: "center",
//             type: "number",
//         },
//         {
//             headerName: "Fine/Day (₹)",
//             field: "Fine",
//             width: 130,
//             editable: true,
//             headerAlign: "center",
//             type: "number",
//         },
//         // {
//         //     headerName: "ON",
//         //     field: "ON",
//         //     width: 80,
//         //     editable: true,
//         //     headerAlign: "center",
//         //     type: "boolean",
//         //     renderCell: (params) => <Checkbox checked={Boolean(params.value)} disabled />,
//         // },
//         {
//             field: "actions",
//             type: "actions",
//             headerName: "Actions",
//             width: 100,
//             hide: mode === "V",
//             cellClassName: "actions",
//             getActions: ({ id }) => {
//                 const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
//                 if (isInEditMode) {
//                     return [
//                         <GridActionsCellItem icon={<SaveIcon />} label="Save" sx={{ color: "primary.main" }} onClick={handleSaveClick(id)} />,
//                         <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
//                     ];
//                 }
//                 return [
//                     <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
//                     <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
//                 ];
//             },
//         },
//     ];


//     function EditToolbar(props) {
//         const { setRows, setRowModesModel } = props;

//         const handleClick = () => {
//             const id = nanoid();
//             const newRow = {
//                 id,
//                 RecordID: id,
//                 Component: "",
//                 Category: "",
//                 Amount: 0,
//                 Fine: 0,
//                 ON: true,
//                 isNew: true,
//             };
//             setRows((oldRows) => {
//                 const updatedRows = [...oldRows, newRow];
//                 const newPageIndex = Math.floor((updatedRows.length - 1) / pageSize);
//                 setPage(newPageIndex);
//                 return updatedRows;
//             });
//             setRowModesModel((oldModel) => ({
//                 ...oldModel,
//                 [id]: { mode: GridRowModes.Edit, fieldToFocus: "Component" },
//             }));
//         };

//         return (
//             <GridToolbarContainer sx={{ marginBottom: "10px", display: "flex", justifyContent: "flex-start" }}>
//                 <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} disabled={!activeTerm}>
//                     Add Fee Component
//                 </Button>
//             </GridToolbarContainer>
//         );
//     }

//     // Calculate totals for active term
//     const activeRows = activeTermKey ? (rowsByTerm[activeTermKey] || []) : [];
//     const activeOnlyRows = activeRows.filter((r) => r.ON !== false);
//     const totalAmount = activeOnlyRows.reduce((sum, row) => sum + Number(row.Amount || 0), 0);

//     // Calculate discount for active term
//     const getDiscountCalculation = () => {
//         const disc = getTermDiscount(activeTermKey);
//         const discAmt =
//             disc.DiscountType === "percent"
//                 ? Math.round((totalAmount * Number(disc.DiscountValue || 0)) / 100)
//                 : Number(disc.DiscountValue || 0);
//         return { discountAmount: discAmt, netTotal: Math.max(0, totalAmount - discAmt) };
//     };

//     const { discountAmount, netTotal } = getDiscountCalculation();

//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//     // ░░░░░░░░░░░░░░░░ BUILD SAVE JSON ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//     // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//     const buildSaveJson = (values) => {
//         const selectedTermsList = Array.isArray(values.Terms) ? values.Terms : [];
//         const Terms = selectedTermsList.map((term) => {
//             const termKey = String(term.RecordID);
//             const termRows = rowsByTerm[termKey] || [];
//             const disc = getTermDiscount(termKey);

//             const grossTotal = termRows
//                 .filter((r) => r.ON !== false)
//                 .reduce((sum, r) => sum + Number(r.Amount || 0), 0);

//             const discountAmt =
//                 disc.DiscountType === "percent"
//                     ? Math.round((grossTotal * Number(disc.DiscountValue || 0)) / 100)
//                     : Number(disc.DiscountValue || 0);
//             const netTotalForTerm = Math.max(0, grossTotal - discountAmt);

//             const Detail = termRows.map((row) => ({
//                 DetailID: !isNaN(Number(row.RecordID)) ? Number(row.RecordID) : -1,
//                 Component: row.Component || "",
//                 Category: row.Category || "",
//                 Amount: Number(row.Amount || 0),
//                 Fine: Number(row.Fine || 0),
//             }));

//             return {
//                 TermsID: term.RecordID,
//                 TermName: term.Name,
//                 GrossTotal: grossTotal,
//                 DiscountType: disc.DiscountType,
//                 DiscountValue: Number(disc.DiscountValue || 0),
//                 DiscountAmount: discountAmt,
//                 NetTotal: netTotalForTerm,
//                 DiscountNotes: disc.Notes || "",
//                 Detail,
//             };
//         });

//         return {
//             CompanyID: compID?.toString(),
//             HeaderID: recID || 0,
//             AcademicYearID: params.id2 || "",
//             StructureName: values.Structurename || "",
//             StandardID : values.Standard?.map((d) => d.RecordID).join(",") || "",
//             TermsID: values.Terms.map((t) => t.RecordID).join(","),
//             AcademicType: "T",
//             Term1DueDate: values.term1duedate || "",
//             Term2DueDate: values.term2duedate || "",
//             Term3DueDate: values.term3duedate || "",
//             SendReminder: sendReminder ? "Y" : "N",
//             AutoLateFine: autoLateFine ? "Y" : "N",
//             AllowPartialPayment: allowPartialPayment ? "Y" : "N",
//             Terms,
//         };
//     };

//     // ─── Handle save button click ───────────────────────────────────────────
//     const handleSaveButtonClick = async (values) => {
//         const saveJson = buildSaveJson(values);
//         console.log("Save JSON:", JSON.stringify(saveJson, null, 2));

//         try {
//             const response = await dispatch(
//                 postData({
//                     accessID: "TR387",
//                     action: "insert",
//                     idata: saveJson,
//                 })
//             );
//             if (response?.payload?.Status === "Y") {
//                 setRowsByTerm({});
//                 setRowModesModelByTerm({});
//                 toast.success(response.payload.Msg);
//                 navigate(-1);
//             } else {
//                 toast.error(response?.payload?.Msg || "Save failed");
//             }
//         } catch (error) {
//             console.error("Save error:", error);
//             toast.error("Error occurred during save.");
//         }
//     };

//     const isEditMode = mode !== "A";

//     const TimeTableInitialValue = {
//         // Terms: [],
//          Terms: Array.isArray(data.TermsList)
//       ? data.TermsList.map((d) => ({
//         RecordID: String(d.RecordID),
//         Name: d.Name,
//       }))
//       : [],
//          Standard: Array.isArray(data.Standards)
//       ? data.Standards.map((d) => ({
//         RecordID: String(d.RecordID),
//         Name: d.Name,
//       }))
//       : [],
//         academicyear: rowData.AcademicYear || "",
//         Structurename: data?.StructureName || "",
//         term1duedate: data?.Term1DueDate ? data.Term1DueDate.split("T")[0] : "",
//         term2duedate: data?.Term2DueDate ? data.Term2DueDate.split("T")[0] : "",
//         term3duedate: data?.Term3DueDate ? data.Term3DueDate.split("T")[0] : "",
//     };
    
//     return (
//         <React.Fragment>
//             {getLoading ? <LinearProgress /> : false}
//             <Paper
//                 elevation={3}
//                 sx={{ margin: "0px 10px", background: "#F2F0F0", height: "50px" }}
//             >
//                 <Box display="flex" justifyContent="space-between">
//                     <Box display="flex" borderRadius="3px" alignItems="center">
//                         {broken && !rtl && (
//                             <IconButton onClick={() => toggleSidebar()}>
//                                 <MenuOutlinedIcon />
//                             </IconButton>
//                         )}
//                         <Box display={isNonMobile ? "flex" : "none"} borderRadius="3px" alignItems="center">
//                             <Breadcrumbs
//                                 maxItems={3}
//                                 aria-label="breadcrumb"
//                                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//                             >
//                                 <Typography
//                                     variant="h5"
//                                     color="#0000D1"
//                                     sx={{ cursor: "default", marginLeft: "10px", fontSize: "17px" }}
//                                     onClick={() => navigate(-1)}
//                                 >
//                                     Term Fee Structure
//                                 </Typography>
//                             </Breadcrumbs>
//                         </Box>
//                     </Box>
//                     <Box display="flex">
//                         <Tooltip title="Close">
//                             <IconButton onClick={() => fnLogOut("Close")} color="error">
//                                 <ResetTvIcon />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Logout">
//                             <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                                 <LogoutOutlinedIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Paper>

//             <Paper elevation={3} sx={{ margin: "10px" }}>
//                 <Formik
//                     initialValues={TimeTableInitialValue}
//                     onSubmit={(values, { resetForm }) => { }}
//                     enableReinitialize={true}
//                 >
//                     {({
//                         errors,
//                         touched,
//                         handleBlur,
//                         handleChange,
//                         isSubmitting,
//                         values,
//                         handleSubmit,
//                         setFieldValue,
//                     }) => (
//                         <form onSubmit={handleSubmit}>
//                             {/* ── Header Fields ── */}
//                             <Box
//                                 display="grid"
//                                 gridTemplateColumns="repeat(4 , minMax(0,1fr))"
//                                 gap={formGap}
//                                 padding={1}
//                                 sx={{
//                                     "& > div": {
//                                         gridColumn: isNonMobile ? undefined : "span 4",
//                                     },
//                                 }}
//                             >
//                                 <TextField
//                                     name="Structurename"
//                                     type="text"
//                                     id="Structurename"
//                                     label={<>Structure Name <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                     variant="standard"
//                                     focused
//                                     value={values.Structurename}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     sx={{ gridColumn: "span 2" }}
//                                 />

//                                 <MultiFormikOptimizedAutocomplete
//                                     sx={{ gridColumn: "span 2" }}
//                                     name="Terms"
//                                     label={<>Term <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                     id="Terms"
//                                     value={values.Terms}
//                                     onChange={(e, newValue) => handleTermsChange(newValue, setFieldValue)}
//                                     isOptionEqualToValue={(option, value) =>
//                                         String(option.RecordID) === String(value.RecordID)
//                                     }
//                                     error={!!touched.Terms && !!errors.Terms}
//                                     helperText={touched.Terms && errors.Terms}
//                                     url={`${listViewurl}?data=${JSON.stringify({
//                                         Query: {
//                                             AccessID: "2169",
//                                             ScreenName: "Terms",
//                                             VerticalLicense: Subscriptionlastthree,
//                                             Filter: `CompanyID='${compID}' AND AcademicYearID='${params.id2}'`,
//                                             Any: "",
//                                         },
//                                     })}`}
//                                     multiple
//                                 />

//                                 <MultiFormikOptimizedAutocomplete
//                                     sx={{ gridColumn: "span 2" }}
//                                     name="Standard"
//                                     label={<>Applicable Standards <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                     id="Standard"
//                                     value={values.Standard}
//                                     onChange={(e, newValue) => setFieldValue("Standard", newValue, true)}
//                                     isOptionEqualToValue={(option, value) =>
//                                         String(option.RecordID) === String(value.RecordID)
//                                     }
//                                     error={!!touched.Standard && !!errors.Standard}
//                                     helperText={touched.Standard && errors.Standard}
//                                     url={`${listViewurl}?data=${JSON.stringify({
//                                         Query: {
//                                             AccessID: "2054",
//                                             ScreenName: "Standard",
//                                             VerticalLicense: Subscriptionlastthree,
//                                             Filter: `parentID='${compID}'`,
//                                             Any: "",
//                                         },
//                                     })}`}
//                                 />

//                                 {/* <TextField
//                                     name="academicyear"
//                                     type="text"
//                                     id="academicyear"
//                                     label="Academic Year"
//                                     variant="standard"
//                                     focused
//                                     value={values.academicyear}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     sx={{ gridColumn: "span 2" }}
//                                     InputLabelProps={{ readOnly: true }}
//                                 /> */}
//                                 <TextField
//                                     name="term1duedate"
//                                     type="date"
//                                     id="term1duedate"
//                                     label="Term I Due Date"
//                                     variant="standard"
//                                     focused
//                                     value={values.term1duedate}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     sx={{ gridColumn: "span 2" }}
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                                 <TextField
//                                     name="term2duedate"
//                                     type="date"
//                                     id="term2duedate"
//                                     label="Term II Due Date"
//                                     variant="standard"
//                                     focused
//                                     value={values.term2duedate}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     sx={{ gridColumn: "span 2" }}
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                                 <TextField
//                                     name="term3duedate"
//                                     type="date"
//                                     id="term3duedate"
//                                     label="Term III Due Date"
//                                     variant="standard"
//                                     focused
//                                     value={values.term3duedate}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     sx={{ gridColumn: "span 2" }}
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                             </Box>

//                             {/* ── Fee Components Section ── */}
//                             <Box px={1} mt={1}>
//                                 {/* Section header with Term tab buttons */}
//                                 <Box
//                                     display="flex"
//                                     alignItems="center"
//                                     justifyContent="space-between"
//                                     mb={1}
//                                     flexWrap="wrap"
//                                     gap={1}
//                                 >
//                                     {/* Left: icon + label */}
//                                     {/* <Box display="flex" alignItems="center" gap={1}>
//                                         <Box
//                                             sx={{
//                                                 width: 32,
//                                                 height: 32,
//                                                 borderRadius: "8px",
//                                                 background: "linear-gradient(135deg, #00796b, #4db6ac)",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                             }}
//                                         >
//                                             <CreditCardIcon sx={{ color: "#fff", fontSize: 18 }} />
//                                         </Box>
//                                         <Typography fontWeight={600} fontSize="15px" color="#00695c">
//                                             Fee Components
//                                         </Typography>
//                                     </Box> */}

//                                     {/* Right: Term tab buttons (only shown when Terms selected) */}
//                                     {Array.isArray(values.Terms) && values.Terms.length > 0 && (
//                                         <Box display="flex" gap={1} flexWrap="wrap">
//                                             {values.Terms.map((term) => {
//                                                 const isActive =
//                                                     activeTerm &&
//                                                     String(activeTerm.RecordID) === String(term.RecordID);
//                                                 return (
//                                                     <Button
//                                                         key={term.RecordID}
//                                                         variant={isActive ? "contained" : "outlined"}
//                                                         size="small"
//                                                         onClick={() => {
//                                                             setActiveTerm(term);
//                                                             setPage(0);
//                                                         }}
//                                                         sx={{
//                                                             borderRadius: "20px",
//                                                             textTransform: "none",
//                                                             fontWeight: 600,
//                                                             fontSize: "13px",
//                                                             px: 2.5,
//                                                             ...(isActive
//                                                                 ? {
//                                                                     background:
//                                                                         "linear-gradient(135deg, #00796b, #26a69a)",
//                                                                     color: "#fff",
//                                                                     border: "none",
//                                                                     boxShadow:
//                                                                         "0 2px 8px rgba(0,121,107,0.35)",
//                                                                     "&:hover": {
//                                                                         background:
//                                                                             "linear-gradient(135deg, #00695c, #00897b)",
//                                                                     },
//                                                                 }
//                                                                 : {
//                                                                     color: "#00796b",
//                                                                     borderColor: "#80cbc4",
//                                                                     "&:hover": {
//                                                                         borderColor: "#00796b",
//                                                                         background: "#e0f2f1",
//                                                                     },
//                                                                 }),
//                                                         }}
//                                                     >
//                                                         {term.Name}
//                                                     </Button>
//                                                 );
//                                             })}
//                                         </Box>
//                                     )}
//                                 </Box>

//                                 {/* No term selected hint */}
//                                 {(!Array.isArray(values.Terms) || values.Terms.length === 0) && (
//                                     <Box
//                                         sx={{
//                                             py: 4,
//                                             textAlign: "center",
//                                             color: "#94a3b8",
//                                             border: "1px dashed #cbd5e1",
//                                             borderRadius: "8px",
//                                             mb: 2,
//                                         }}
//                                     >
//                                         <Typography>
//                                             Please select one or more Terms above to add fee components.
//                                         </Typography>
//                                     </Box>
//                                 )}

//                                 {/* Grid + Summary (only shown when a term is active) */}
//                                 {activeTerm && (
//                                     <Grid container spacing={2} alignItems="flex-start">
//                                         {/* LEFT – DataGrid with active term rows */}
//                                         <Grid item xs={12} md={7.5}>
//                                             <Box
//                                                 height="350px"
//                                                 sx={{
//                                                     "& .MuiDataGrid-columnHeaders": {
//                                                         backgroundColor: colors.blueAccent[800],
//                                                     },
//                                                     "& .MuiDataGrid-virtualScroller": {
//                                                         backgroundColor: colors.primary[400],
//                                                     },
//                                                     "& .MuiDataGrid-footerContainer": {
//                                                         backgroundColor: colors.blueAccent[800],
//                                                     },
//                                                     "& .MuiCheckbox-root": {
//                                                         color: `${colors.greenAccent[200]} !important`,
//                                                     },
//                                                     "& .even-row": {
//                                                         backgroundColor: "#d0edec",
//                                                     },
//                                                 }}
//                                             >
//                                                 <DataGrid
//                                                     sx={{
//                                                         "& .MuiDataGrid-footerContainer": {
//                                                             height: dataGridHeaderFooterHeight,
//                                                             minHeight: dataGridHeaderFooterHeight,
//                                                         },
//                                                     }}
//                                                     rowHeight={dataGridRowHeight}
//                                                     headerHeight={dataGridHeaderFooterHeight}
//                                                     rows={rows}
//                                                     columns={TTColumns}
//                                                     editMode="row"
//                                                     disableSelectionOnClick
//                                                     rowModesModel={rowModesModel}
//                                                     onRowModesModelChange={handleRowModesModelChange}
//                                                     onRowEditStop={handleRowEditStop}
//                                                     processRowUpdate={processRowUpdate}
//                                                     getRowId={(row) => row.id}
//                                                     disableRowSelectionOnClick
//                                                     experimentalFeatures={{ newEditingApi: true }}
//                                                     pagination
//                                                     pageSize={pageSize}
//                                                     page={page}
//                                                     components={{ Toolbar: EditToolbar }}
//                                                     componentsProps={{
//                                                         toolbar: { setRows, setRowModesModel },
//                                                     }}
//                                                     onPageSizeChange={(newPageSize) =>
//                                                         setPageSize(newPageSize)
//                                                     }
//                                                     onPageChange={(newPage) => setPage(newPage)}
//                                                 />
//                                             </Box>
//                                         </Grid>

//                                         {/* RIGHT – Fee Summary for active term */}
//                                         <Grid item xs={12} md={4.5}>
//                                             <Box
//                                                 mt={0}
//                                                 p={2.5}
//                                                 sx={{
//                                                     backgroundColor: "#d9ece8",
//                                                     border: "1px solid #58c7b6",
//                                                     borderRadius: "12px",
//                                                 }}
//                                             >
//                                                 {/* Header */}
//                                                 <Typography
//                                                     variant="h6"
//                                                     fontWeight="bold"
//                                                     sx={{ color: "#00695c", mb: 0.5 }}
//                                                 >
//                                                      FEE SUMMARY
//                                                 </Typography>
//                                                 <Typography
//                                                     variant="caption"
//                                                     sx={{ color: "#26a69a", display: "block", mb: 1.5 }}
//                                                 >
//                                                     {activeTerm.Name}
//                                                 </Typography>

//                                                 {/* Fee Items for active term */}
//                                                 {activeRows.length === 0 ? (
//                                                     <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic", mb: 1 }}>
//                                                         No components added yet.
//                                                     </Typography>
//                                                 ) : (
//                                                     activeRows.map((item, index) => (
//                                                         <Box key={index}>
//                                                             <Box display="flex" justifyContent="space-between" py={0.75}>
//                                                                 <Typography
//                                                                     color={item.ON === false ? "#94a3b8" : "#2f6f67"}
//                                                                     sx={{
//                                                                         textDecoration: item.ON === false ? "line-through" : "none",
//                                                                         fontSize: "13px",
//                                                                     }}
//                                                                 >
//                                                                     {item.Component || "(unnamed)"}
//                                                                 </Typography>
//                                                                 <Typography
//                                                                     fontWeight="bold"
//                                                                     color={item.ON === false ? "#94a3b8" : "#004d40"}
//                                                                     fontSize="13px"
//                                                                 >
//                                                                     ₹{Number(item.Amount || 0).toLocaleString()}
//                                                                 </Typography>
//                                                             </Box>
//                                                             <Divider sx={{ borderColor: "#a8d5cf" }} />
//                                                         </Box>
//                                                     ))
//                                                 )}

//                                                 {/* Gross total row */}
//                                                 <Box display="flex" justifyContent="space-between" mt={2} mb={1.5}>
//                                                     <Typography fontSize="13px" fontWeight={600} color="#004d40">
//                                                         Gross Total
//                                                     </Typography>
//                                                     <Typography fontSize="13px" fontWeight={700} color="#004d40">
//                                                         ₹{totalAmount.toLocaleString()}
//                                                     </Typography>
//                                                 </Box>

//                                                 {/* ── Discount / Concession Input ── */}
//                                                 {/* <Box
//                                                     sx={{
//                                                         background: "#fff",
//                                                         borderRadius: "8px",
//                                                         p: 1.5,
//                                                         border: "1px solid #b2dfdb",
//                                                         mb: 1.5,
//                                                     }}
//                                                 >
//                                                     <Typography
//                                                         fontSize="11px"
//                                                         fontWeight={600}
//                                                         color="#00796b"
//                                                         mb={1}
//                                                         textTransform="uppercase"
//                                                         letterSpacing="0.5px"
//                                                     >
//                                                         Discount / Concession
//                                                     </Typography>

//                                                     <Box display="flex" mb={1} gap={0.5}>
//                                                         {["flat", "percent"].map((type) => {
//                                                             const disc = getTermDiscount(activeTermKey);
//                                                             const isSelected = disc.DiscountType === type;
//                                                             return (
//                                                                 <Button
//                                                                     key={type}
//                                                                     size="small"
//                                                                     variant={isSelected ? "contained" : "outlined"}
//                                                                     onClick={() => setTermDiscount(activeTermKey, { DiscountType: type })}
//                                                                     sx={{
//                                                                         flex: 1,
//                                                                         fontSize: "11px",
//                                                                         textTransform: "none",
//                                                                         py: 0.4,
//                                                                         minWidth: 0,
//                                                                         ...(isSelected
//                                                                             ? {
//                                                                                 background: "linear-gradient(135deg,#00796b,#26a69a)",
//                                                                                 color: "#fff",
//                                                                                 border: "none",
//                                                                             }
//                                                                             : {
//                                                                                 color: "#00796b",
//                                                                                 borderColor: "#80cbc4",
//                                                                             }),
//                                                                     }}
//                                                                 >
//                                                                     {type === "flat" ? "₹ Flat" : "% Percent"}
//                                                                 </Button>
//                                                             );
//                                                         })}
//                                                     </Box>

//                                                     <TextField
//                                                         size="small"
//                                                         type="number"
//                                                         label={
//                                                             getTermDiscount(activeTermKey).DiscountType === "percent"
//                                                                 ? "Discount %"
//                                                                 : "Discount Amount (₹)"
//                                                         }
//                                                         value={getTermDiscount(activeTermKey).DiscountValue}
//                                                         onChange={(e) =>
//                                                             setTermDiscount(activeTermKey, {
//                                                                 DiscountValue: Math.max(0, Number(e.target.value)),
//                                                             })
//                                                         }
//                                                         fullWidth
//                                                         inputProps={{ min: 0 }}
//                                                         sx={{
//                                                             mb: 1,
//                                                             "& .MuiOutlinedInput-root": {
//                                                                 "& fieldset": { borderColor: "#80cbc4" },
//                                                                 "&:hover fieldset": { borderColor: "#00796b" },
//                                                                 "&.Mui-focused fieldset": { borderColor: "#00796b" },
//                                                             },
//                                                             "& .MuiInputLabel-root.Mui-focused": { color: "#00796b" },
//                                                         }}
//                                                     />

//                                                     <TextField
//                                                         size="small"
//                                                         label="Reason / Notes"
//                                                         value={getTermDiscount(activeTermKey).Notes}
//                                                         onChange={(e) =>
//                                                             setTermDiscount(activeTermKey, { Notes: e.target.value })
//                                                         }
//                                                         fullWidth
//                                                         placeholder="e.g. Staff concession"
//                                                         sx={{
//                                                             "& .MuiOutlinedInput-root": {
//                                                                 "& fieldset": { borderColor: "#80cbc4" },
//                                                                 "&:hover fieldset": { borderColor: "#00796b" },
//                                                                 "&.Mui-focused fieldset": { borderColor: "#00796b" },
//                                                             },
//                                                             "& .MuiInputLabel-root.Mui-focused": { color: "#00796b" },
//                                                         }}
//                                                     />

//                                                     {discountAmount > 0 && (
//                                                         <Box display="flex" justifyContent="space-between" mt={1}>
//                                                             <Typography fontSize="12px" color="#e53935">
//                                                                 Discount
//                                                             </Typography>
//                                                             <Typography fontSize="12px" fontWeight={600} color="#e53935">
//                                                                 − ₹{discountAmount.toLocaleString()}
//                                                             </Typography>
//                                                         </Box>
//                                                     )}
//                                                 </Box> */}

//                                                 <Box
//                                                     display="flex"
//                                                     justifyContent="space-between"
//                                                     alignItems="center"
//                                                     sx={{
//                                                         background: "#004d40",
//                                                         borderRadius: "8px",
//                                                         px: 1.5,
//                                                         py: 1,
//                                                     }}
//                                                 >
//                                                     <Typography variant="body2" fontWeight="bold" color="#80cbc4">
//                                                         Per Term (Net)
//                                                     </Typography>
//                                                     <Typography variant="h5" fontWeight="bold" color="#fff">
//                                                         ₹{netTotal.toLocaleString()}
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                         </Grid>
//                                     </Grid>
//                                 )}
//                             </Box>

//                             <Box
//                                 sx={{
//                                     background: "#fff",
//                                     borderRadius: "16px",
//                                     p: 2,
//                                     boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
//                                     mt: 2,
//                                     mx: 1,
//                                 }}
//                             >
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <NotificationsNoneIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">Send reminder 7 days before</Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>Via SMS & email to parents</Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch 
//                                         checked={sendReminder}
//                                         onChange={(e) => setSendReminder(e.target.checked)}
//                                         color="success" 
//                                     />
//                                 </Box>
//                                 <Divider />
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <AccessTimeIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">Auto-apply late fine</Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>Per fine/day set in components</Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch 
//                                         checked={autoLateFine}
//                                         onChange={(e) => setAutoLateFine(e.target.checked)}
//                                         color="success" 
//                                     />
//                                 </Box>
//                                 <Divider />
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <CreditCardIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">Allow partial payment</Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>Students can pay in instalments</Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch 
//                                         checked={allowPartialPayment}
//                                         onChange={(e) => setAllowPartialPayment(e.target.checked)}
//                                         color="success" 
//                                     />
//                                 </Box>
//                             </Box>

//                             {/* ── Save / Cancel ── */}
//                             <Box display="flex" justifyContent="end" mt="20px" gap="20px" padding={1}>
//                                 <LoadingButton
//                                     disabled={mode === "V"}
//                                     color="secondary"
//                                     variant="contained"
//                                     onClick={() => handleSaveButtonClick(values)}
//                                     type="button"
//                                     loading={isLoading}
//                                 >
//                                     Save
//                                 </LoadingButton>
//                                 <Button
//                                     color="warning"
//                                     variant="contained"
//                                     onClick={() => navigate(-1)}
//                                 >
//                                     Cancel
//                                 </Button>
//                             </Box>
//                         </form>
//                     )}
//                 </Formik>
//             </Paper>
//         </React.Fragment>
//     );
// };

// export default EditTermfeestructure;


