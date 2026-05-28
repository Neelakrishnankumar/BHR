import {
    TextField,
    Box,
    Grid,
    Typography,
    useTheme,
    Button,
    IconButton,
    Tooltip,
    Breadcrumbs,
    LinearProgress,
    Paper,
    Divider,
    Switch,
    FormControlLabel,
    FormControl,
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
import WarningIcon from "@mui/icons-material/Warning";
import {
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import * as Yup from "yup"; // ✅ Fix: Yup was not defined
import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
    getFetchFeeData,
    postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../Theme";
import {
    MultiFormikOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import {
    dataGridHeaderFooterHeight,
    dataGridRowHeight,
    formGap,
} from "../../../ui-components/global/utils";
import { getConfig } from "../../../config";

// ✅ Fix: getTermNumber was not defined
const getTermNumber = (termName) => {
    if (!termName) return null;
    const match = String(termName).match(/\d+/);
    return match ? match[0] : null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const EditAnnualfeestructure = () => {
    const config = getConfig();
    const baseurl1 = config.BASE_URL;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const recID = params.id;
    const mode = params.Mode; // "A" = Add, "E" = Edit, "V" = View
    const isEditMode = mode !== "A";

    const compID = sessionStorage.getItem("compID");
    const UserName = sessionStorage.getItem("UserName");
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : "";
    const sliceSubscriptionCode = SubscriptionCode.slice(-3);
    const is003Subscription = SubscriptionCode.endsWith("003");

    // ── Redux state ────────────────────────────────────────────────────────────
    const data = useSelector((state) => state.formApi.Data);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);

    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const rowData = location.state || {};

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
//    const AcademicYearID =
//   !/\d{4}-\d{2}/.test(params.id2 || "")
//     ? params.id2
//     : !/\d{4}-\d{2}/.test(params.id4 || "")
//     ? params.id4
//     : "";
   const AcademicYearID = params.parentID3 || 0;
    // ── Local state ────────────────────────────────────────────────────────────
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = useState(0);
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);

    const hasRows = rows.length > 0;

    // ── Load validation messages ───────────────────────────────────────────────
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({                   
                    Standard: Yup.array()
                        .min(1, data.AnnualFees.Standard)
                        .required(data.AnnualFees.Standard),
                    Structurename: Yup.string().required(data.AnnualFees.Structurename),
                    DueDate: Yup.date().required(data.AnnualFees.DueDate),

                });
                setValidationSchema(schema);
            })
            .catch((err) =>
                console.error("Error loading validationcms.json:", err)
            );
    }, []);

    // ── Fetch existing record ──────────────────────────────────────────────────
    useEffect(() => {
        if (isEditMode) {
            dispatch(
                getFetchFeeData({ accessID: "TR387", get: "get", recID, AcademicType: "A" })
            );
        }
    }, []);

    // ── Map GET Detail → DataGrid rows ────────────────────────────────────────
    useEffect(() => {
        if (isEditMode && data?.Detail) {
            const formattedRows = data.Detail.map((item) => ({
                id: Number(item.DetailID),
                RecordID: Number(item.DetailID),
                TermsID: item.TermsID || 0,
                TermName: item.TermName || "",
                Component: item.Component || "",
                Amount: parseFloat(item.Amount || 0),
                // GET response uses "Fine"; we store as Fine, send as FinePerDay on save
                Fine: parseFloat(item.Fine || 0),
                IsActive: item.IsActive || "Y",
            }));
            setRows([]);
            setTimeout(() => setRows(formattedRows), 0);
        }
    }, [data]);

    // ─────────────────────────────────────────────────────────────────────────
    // Formik initial values — correctly maps GET response shape
    // ─────────────────────────────────────────────────────────────────────────
    const initialValues = {
        // Header fields
        Structurename: isEditMode ? data?.StructureName || "" : "",
        DueDate: isEditMode ? data?.AnnualDueDate || "" : "",
        GSTApplicable: isEditMode ? data?.GSTApplicable || "N" : "N",
        Standard:
            isEditMode && Array.isArray(data?.Standards) && data.Standards.length
                ? data.Standards.map((s) => ({ RecordID: String(s.RecordID), Name: s.Name }))
                : [],

        SendReminderBefore:
            isEditMode ? data?.SendReminderBefore === "Y" : true,
        AutoApplyLateFine:
            isEditMode ? data?.AutoApplyLateFine === "Y" : true,
        AllowPartialPayment:
            isEditMode ? data?.AllowPartialPayment === "Y" : false,
    };

    // ─────────────────────────────────────────────────────────────────────────
    // DataGrid helpers
    // ─────────────────────────────────────────────────────────────────────────
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleDeleteClick = (id) => () => {
        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const validateRow = (row) => {
        if (!row.Component || String(row.Component).trim() === "") {
            return "Component name is required";
        }
        if (row.Amount === undefined || row.Amount === null || row.Amount === "") {
            return "Amount is required";
        }
        return null;
    };

    const processRowUpdate = async (newRow, oldRow) => {
        const error = validateRow(newRow);
        if (error) throw new Error(error);

        const updatedRow = { ...newRow, isNew: false };

        setRows((prev) =>
            prev.map((row) => (row.id === newRow.id ? updatedRow : row))
        );

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Toolbar
    // ─────────────────────────────────────────────────────────────────────────
    function EditToolbar({ setRows, setRowModesModel }) {
        const handleClick = () => {
            const id = nanoid();
            const newRow = {
                id,
                RecordID: id, // temporary string — detected as new on save
                TermsID: 0,
                TermName: "",
                Component: "",
                Amount: 0,
                Fine: 0,
                IsActive: "Y",
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
            <GridToolbarContainer sx={{ mb: "10px" }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Record
                </Button>
            </GridToolbarContainer>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DataGrid columns
    // ─────────────────────────────────────────────────────────────────────────
    const TTColumns = [
        {
            field: "RecordID",
            headerName: "Record ID",
            width: 100,
            hide: true,
        },
        {
            headerName: "Component",
            field: "Component",
            width: 250,
            editable: true,
            headerAlign: "center",
        },
        {
            headerName: "Amount",
            field: "Amount",
            width: 140,
            editable: true,
            headerAlign: "center",
            type: "number",
            valueFormatter: ({ value }) =>
                value !== undefined && value !== null
                    ? `${Number(value).toLocaleString()}`
                    : "0",
        },
        {
            headerName: "Fine/Day",
            field: "Fine",
            width: 120,
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
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color="primary"
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // Logout / Close dialog
    // ─────────────────────────────────────────────────────────────────────────
    const fnLogOut = (action) => {
        const warningMsg =
            errorMsgData?.Warningmsg?.[action] ||
            (action === "Logout" ? "Are you sure you want to Logout?" : "Are you sure you want to Close?");

        Swal.fire({
            title: warningMsg,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: action,
        }).then((result) => {
            if (result.isConfirmed) {
                if (action === "Logout") navigate("/");
                if (action === "Close") navigate(-1);
            }
        });
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Save handler — receives validateForm and setTouched from Formik
    // ─────────────────────────────────────────────────────────────────────────
    const handleSaveButtonClick = async (values, validateForm, setTouched) => { // ✅ Fix: accept as parameters
        const errors = await validateForm();

        // 2. Build dynamic due-date errors
        const dueDateErrors = {};
        if (Array.isArray(values.Terms)) {
            values.Terms.forEach((term) => {
                const termNumber = getTermNumber(term.Name); // ✅ Fix: now defined above
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
            setTouched(touchedFields, false); // ✅ Fix: now received as parameter
            return;
        }

        // Validate at least one fee component
        if (rows.length === 0) {
            toast.error("Please add at least one fee component.");
            return;
        }

        // Build Detail array
        const Detail = rows.map((row) => ({
            // Temporary nanoid strings → -1 (new record); real numeric IDs kept as-is
            DetailID: !isNaN(Number(row.RecordID)) ? Number(row.RecordID) : -1,
            TermsID: Number(row.TermsID) || 0,
            Component: row.Component || "",
            Amount: Number(row.Amount || 0),
            FinePerDay: Number(row.Fine || 0),   // Fine in GET → FinePerDay on save
            IsActive: row.IsActive || "Y",
        }));

        // TermsID: send comma-separated string from multi-select
        const TermsIDValue = Array.isArray(values.Terms)
            ? values.Terms.map((t) => t.RecordID).join(",")
            : values.Terms?.RecordID || 0;

        // StandardID: send comma-separated string from multi-select
        const StandardIDValue = Array.isArray(values.Standard)
            ? values.Standard.map((s) => s.RecordID).join(",")
            : values.Standard?.RecordID || 0;

        const idata = {
            CompanyID: compID?.toString(),
            HeaderID: isEditMode ? recID : 0,
            StructureName: values.Structurename,
            AcademicYearID: AcademicYearID || "",
            AcademicType: "A",
            AcademicTypeID: params.parentID1 || "",
            // TermsID: TermsIDValue,
            StandardID: StandardIDValue,
            AnnualDueDate: values.DueDate,
            Disable: "N",
            SortOrder: 1,
            GSTApplicable: values.GSTApplicable || "N",
            SendReminderBefore: values.SendReminderBefore ? "Y" : "N",
            AutoApplyLateFine: values.AutoApplyLateFine ? "Y" : "N",
            AllowPartialPayment: values.AllowPartialPayment ? "Y" : "N",
            Detail,
            FeeSummary: [],
        };

        console.log("handleSaveButtonClick idata →", idata);

        try {
            const response = await dispatch(
                postData({
                    accessID: "TR387",
                    action: mode === "A" ? "insert" : "update",
                    idata,
                })
            );

            if (response?.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                navigate(-1);
            } else if (response?.payload?.Status === "E") {
                toast(response.payload.Msg, {
                    icon: <WarningIcon style={{ color: "#f59e0b" }} />,
                });
            } else {
                toast.error(response?.payload?.Msg || "Save failed.");
            }
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Error occurred during save.");
        }
    };

  
    return (
        <React.Fragment>
            {getLoading && <LinearProgress />}

            {/* ── Top bar ── */}
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
                        <Box display={isNonMobile ? "flex" : "none"} alignItems="center">
                            <Breadcrumbs
                                maxItems={3}
                                aria-label="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                            >
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "pointer", marginLeft: "10px", fontSize: "17px" }}
                                    onClick={() => navigate(-1)}
                                >
                                    Annual Fee Structure
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

            {/* ── Main form ── */}
            <Paper elevation={3} sx={{ margin: "10px" }}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm, validateForm, setTouched }) => {
                        handleSaveButtonClick(values, validateForm, setTouched); // ✅ Fix: pass validateForm & setTouched
                    }}
                >
                    {({
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        values,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {/* ── Header fields ── */}
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minMax(0,1fr))"
                                gap={formGap}
                                padding={1}
                                sx={{
                                    "& > div": {
                                        gridColumn: isNonMobile ? undefined : "span 4",
                                    },
                                }}
                            >
                                {/* Structure Name */}
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
                                {/* Terms — multi-select */}
                               
                                {/* Applicable Standards — multi-select */}
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

                                {/* Due Date */}
                                <FormControl gap={1} sx={{ gridColumn: "span 2" }}>

                                    <TextField
                                        name="DueDate"
                                        type="date"
                                        id="DueDate"
                                        label={<>Due Date <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
                                        variant="standard"
                                        focused
                                        value={values.DueDate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                        disabled={mode === "V"}
                                    />
                                    {touched.DueDate && errors.DueDate && (
                                        <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
                                            {errors.DueDate}
                                        </div>
                                    )}
                                </FormControl>

                            </Box>

                            {/* ── DataGrid + Fee Summary ── */}
                            <Grid container spacing={2} alignItems="flex-start" padding={1}>
                                {/* LEFT — fee components grid */}
                                <Grid item xs={12} md={9}>
                                    <Box
                                        height="350px"
                                        marginTop={1}
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
                                            "& .even-row": { backgroundColor: "#d0edec" },
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
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            onPageChange={(newPage) => setPage(newPage)}
                                            components={{
                                                Toolbar: mode !== "V" ? EditToolbar : null,
                                            }}
                                            componentsProps={{
                                                toolbar: { setRows, setRowModesModel },
                                            }}
                                            onProcessRowUpdateError={(err) => {
                                                toast.error(err.message || "Row update error");
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* RIGHT — fee summary panel */}
                                <Grid item xs={12} md={3}>
                                    <Box
                                        mt={1}
                                        p={3}
                                        sx={{
                                            backgroundColor: "#d9ece8",
                                            border: "1px solid #58c7b6",
                                            borderRadius: "12px",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ color: "#00695c", mb: 3 }}
                                        >
                                            FEE SUMMARY
                                        </Typography>

                                        {rows.map((item, index) => (
                                            <Box key={index}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    py={1}
                                                >
                                                    <Typography color="#2f6f67">
                                                        {item.Component || "—"}
                                                    </Typography>
                                                    <Typography fontWeight="bold" color="#004d40">
                                                        ₹{Number(item.Amount || 0).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <Divider sx={{ borderColor: "#a8d5cf" }} />
                                            </Box>
                                        ))}

                                        {/* Annual Total */}
                                        <Box display="flex" justifyContent="space-between" mt={3}>
                                            <Typography variant="h6" fontWeight="bold" color="#004d40">
                                                Annual Total
                                            </Typography>
                                            <Typography variant="h4" fontWeight="bold" color="#004d40">
                                                ₹
                                                {rows
                                                    .reduce((sum, row) => sum + Number(row.Amount || 0), 0)
                                                    .toLocaleString()}
                                            </Typography>
                                        </Box>

                                        {/* Total Fine/Day */}
                                        {/* <Box display="flex" justifyContent="space-between" mt={1}>
                                            <Typography variant="body2" color="#2f6f67">
                                                Total Fine/Day
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold" color="#004d40">
                                                ₹
                                                {rows
                                                    .reduce((sum, row) => sum + Number(row.Fine || 0), 0)
                                                    .toLocaleString()}
                                            </Typography>
                                        </Box> */}
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* ── Toggle switches ── */}
                            <Box
                                sx={{
                                    background: "#fff",
                                    borderRadius: "16px",
                                    p: 2,
                                    mx: 1,
                                    mt: 1,
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                                }}
                            >
                                {/* Send Reminder Before */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    py={2}
                                >
                                    <Box display="flex" gap={2} alignItems="center">
                                        <NotificationsNoneIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">
                                                Send reminder 7 days before
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                                                Via SMS &amp; email to parents
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={values.SendReminderBefore}
                                        onChange={(e) =>
                                            setFieldValue("SendReminderBefore", e.target.checked)
                                        }
                                        color="success"
                                        disabled={mode === "V"}
                                    />
                                </Box>

                                <Divider />

                                {/* Auto-apply Late Fine */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    py={2}
                                >
                                    <Box display="flex" gap={2} alignItems="center">
                                        <AccessTimeIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">
                                                Auto-apply late fine
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                                                Per fine/day set in components
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={values.AutoApplyLateFine}
                                        onChange={(e) =>
                                            setFieldValue("AutoApplyLateFine", e.target.checked)
                                        }
                                        color="success"
                                        disabled={mode === "V"}
                                    />
                                </Box>

                                <Divider />

                                {/* Allow Partial Payment */}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    py={1}
                                >
                                    <Box display="flex" gap={2} alignItems="center">
                                        <CreditCardIcon sx={{ color: "#94a3b8" }} />
                                        <Box>
                                            <Typography fontWeight={500} fontSize="14px">
                                                Allow partial payment
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                                                Students can pay in instalments
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={values.AllowPartialPayment}
                                        onChange={(e) =>
                                            setFieldValue("AllowPartialPayment", e.target.checked)
                                        }
                                        color="success"
                                        disabled={mode === "V"}
                                    />
                                </Box>
                            </Box>

                            {/* ── Action buttons ── */}
                            <Box
                                display="flex"
                                justifyContent="end"
                                mt="20px"
                                gap="20px"
                                padding={1}
                            >
                                <LoadingButton
                                    disabled={mode === "V"}
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
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

export default EditAnnualfeestructure;
// import {
//     TextField,
//     Box,
//     Grid,
//     Typography,
//     useTheme,
//     Button,
//     IconButton,0.
//     Tooltip,
//     Breadcrumbs,
//     LinearProgress,
//     Paper,
//     Divider,
//     Switch,
//     FormControlLabel,
//     FormControl,
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
// import WarningIcon from "@mui/icons-material/Warning";
// import {
//     GridActionsCellItem,
//     DataGrid,
//     GridRowModes,
//     GridToolbarContainer,
//     GridRowEditStopReasons,
// } from "@mui/x-data-grid";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import { Formik } from "formik";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//     getFetchFeeData,
//     postData,
// } from "../../../store/reducers/Formapireducer";
// import React, { useState, useEffect } from "react";
// import { LoadingButton } from "@mui/lab";
// import Swal from "sweetalert2";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { tokens } from "../../../Theme";
// import {
//     MultiFormikOptimizedAutocomplete,
// } from "../../../ui-components/global/Autocomplete";
// import {
//     dataGridHeaderFooterHeight,
//     dataGridRowHeight,
//     formGap,
// } from "../../../ui-components/global/utils";
// import { getConfig } from "../../../config";

// // ─────────────────────────────────────────────────────────────────────────────
// // Component
// // ─────────────────────────────────────────────────────────────────────────────
// const EditAnnualfeestructure = () => {
//     const config = getConfig();
//     const baseurl1 = config.BASE_URL;
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const navigate = useNavigate();
//     const params = useParams();
//     const dispatch = useDispatch();

//     const recID = params.id;
//     const mode = params.Mode; // "A" = Add, "E" = Edit, "V" = View
//     const isEditMode = mode !== "A";

//     const compID = sessionStorage.getItem("compID");
//     const UserName = sessionStorage.getItem("UserName");
//     const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
//     const lastThree = SubscriptionCode?.slice(-3) || "";
//     const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
//         ? lastThree
//         : "";
//     const sliceSubscriptionCode = SubscriptionCode.slice(-3);
//     const is003Subscription = SubscriptionCode.endsWith("003");

//     // ── Redux state ────────────────────────────────────────────────────────────
//     const data = useSelector((state) => state.formApi.Data);
//     const isLoading = useSelector((state) => state.formApi.postLoading);
//     const getLoading = useSelector((state) => state.formApi.getLoading);
//     const listViewurl = useSelector((state) => state.globalurl.listViewurl);

//     const { toggleSidebar, broken, rtl } = useProSidebar();
//     const location = useLocation();
//     const rowData = location.state || {};

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     // ── Local state ────────────────────────────────────────────────────────────
//     const [rows, setRows] = useState([]);
//     const [rowModesModel, setRowModesModel] = useState({});
//     const [pageSize, setPageSize] = useState(15);
//     const [page, setPage] = useState(0);
//     const [validationSchema, setValidationSchema] = useState(null);
//     const [errorMsgData, setErrorMsgData] = useState(null);

//     const hasRows = rows.length > 0;

//     // ── Load validation messages ───────────────────────────────────────────────
//     useEffect(() => {
//         fetch(process.env.PUBLIC_URL + "/validationcms.json")
//             .then((res) => {
//                 if (!res.ok) throw new Error("Failed to fetch validationcms.json");
//                 return res.json();
//             })
//             .then((data) => {
//                 setErrorMsgData(data);
//                 const schema = Yup.object().shape({
//                     Terms: Yup.array()
//                         .min(1, data.AnnualFees.Terms)
//                         .required(data.AnnualFees.Terms),
//                     Standard: Yup.array()
//                         .min(1, data.AnnualFees.Standard)
//                         .required(data.AnnualFees.Standard),
//                     Structurename: Yup.string().required(data.AnnualFees.Structurename),
//                     DueDate: Yup.date().required(data.AnnualFees.DueDate),

//                 });
//                 setValidationSchema(schema);
//             })
//             .catch((err) =>
//                 console.error("Error loading validationcms.json:", err)
//             );
//     }, []);

//     // ── Fetch existing record ──────────────────────────────────────────────────
//     useEffect(() => {
//         if (isEditMode) {
//             dispatch(
//                 getFetchFeeData({ accessID: "TR387", get: "get", recID, AcademicType: "A" })
//             );
//         }
//     }, []);

//     // ── Map GET Detail → DataGrid rows ────────────────────────────────────────
//     useEffect(() => {
//         if (isEditMode && data?.Detail) {
//             const formattedRows = data.Detail.map((item) => ({
//                 id: Number(item.DetailID),
//                 RecordID: Number(item.DetailID),
//                 TermsID: item.TermsID || 0,
//                 TermName: item.TermName || "",
//                 Component: item.Component || "",
//                 Amount: parseFloat(item.Amount || 0),
//                 // GET response uses "Fine"; we store as Fine, send as FinePerDay on save
//                 Fine: parseFloat(item.Fine || 0),
//                 IsActive: item.IsActive || "Y",
//             }));
//             setRows([]);
//             setTimeout(() => setRows(formattedRows), 0);
//         }
//     }, [data]);

//     // ─────────────────────────────────────────────────────────────────────────
//     // Formik initial values — correctly maps GET response shape
//     // ─────────────────────────────────────────────────────────────────────────
//     const initialValues = {
//         // Header fields
//         StructureName: isEditMode ? data?.StructureName || "" : "",
//         DueDate: isEditMode ? data?.DueDate || "" : "",
//         GSTApplicable: isEditMode ? data?.GSTApplicable || "N" : "N",

//         // Multi-select: GET returns TermsList[] and Standards[]
//         Terms: isEditMode && Array.isArray(data?.TermsList) && data.TermsList.length
//             ? data.TermsList.map((t) => ({ RecordID: String(t.RecordID), Name: t.Name }))
//             : [],

//         Standard:
//             isEditMode && Array.isArray(data?.Standards) && data.Standards.length
//                 ? data.Standards.map((s) => ({ RecordID: String(s.RecordID), Name: s.Name }))
//                 : [],

//         // Toggle switches — stored as booleans inside Formik, converted to "Y"/"N" on save
//         SendReminderBefore:
//             isEditMode ? data?.SendReminderBefore === "Y" : true,
//         AutoApplyLateFine:
//             isEditMode ? data?.AutoApplyLateFine === "Y" : true,
//         AllowPartialPayment:
//             isEditMode ? data?.AllowPartialPayment === "Y" : false,
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     // DataGrid helpers
//     // ─────────────────────────────────────────────────────────────────────────
//     const handleRowEditStop = (params, event) => {
//         if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//             event.defaultMuiPrevented = true;
//         }
//     };

//     const handleEditClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//     };

//     const handleSaveClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//     };

//     const handleCancelClick = (id) => () => {
//         setRowModesModel({
//             ...rowModesModel,
//             [id]: { mode: GridRowModes.View, ignoreModifications: true },
//         });
//         const editedRow = rows.find((row) => row.id === id);
//         if (editedRow?.isNew) {
//             setRows(rows.filter((row) => row.id !== id));
//         }
//     };

//     const handleDeleteClick = (id) => () => {
//         setRows((prev) => prev.filter((row) => row.id !== id));
//     };

//     const validateRow = (row) => {
//         if (!row.Component || String(row.Component).trim() === "") {
//             return "Component name is required";
//         }
//         if (row.Amount === undefined || row.Amount === null || row.Amount === "") {
//             return "Amount is required";
//         }
//         return null;
//     };

//     const processRowUpdate = async (newRow, oldRow) => {
//         const error = validateRow(newRow);
//         if (error) throw new Error(error);

//         const updatedRow = { ...newRow, isNew: false };

//         setRows((prev) =>
//             prev.map((row) => (row.id === newRow.id ? updatedRow : row))
//         );

//         return updatedRow;
//     };

//     const handleRowModesModelChange = (newRowModesModel) => {
//         setRowModesModel(newRowModesModel);
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     // Toolbar
//     // ─────────────────────────────────────────────────────────────────────────
//     function EditToolbar({ setRows, setRowModesModel }) {
//         const handleClick = () => {
//             const id = nanoid();
//             const newRow = {
//                 id,
//                 RecordID: id, // temporary string — detected as new on save
//                 TermsID: 0,
//                 TermName: "",
//                 Component: "",
//                 Amount: 0,
//                 Fine: 0,
//                 IsActive: "Y",
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
//             <GridToolbarContainer sx={{ mb: "10px" }}>
//                 <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//                     Add Record
//                 </Button>
//             </GridToolbarContainer>
//         );
//     }

//     // ─────────────────────────────────────────────────────────────────────────
//     // DataGrid columns
//     // ─────────────────────────────────────────────────────────────────────────
//     const TTColumns = [
//         {
//             field: "RecordID",
//             headerName: "Record ID",
//             width: 100,
//             hide: true,
//         },
//         {
//             headerName: "Component",
//             field: "Component",
//             width: 250,
//             editable: true,
//             headerAlign: "center",
//         },
//         {
//             headerName: "Amount",
//             field: "Amount",
//             width: 140,
//             editable: true,
//             headerAlign: "center",
//             type: "number",
//             valueFormatter: ({ value }) =>
//                 value !== undefined && value !== null
//                     ? `₹${Number(value).toLocaleString()}`
//                     : "₹0",
//         },
//         {
//             headerName: "Fine/Day",
//             field: "Fine",
//             width: 120,
//             editable: true,
//             headerAlign: "center",
//             type: "number",
//         },
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
//                         <GridActionsCellItem
//                             icon={<SaveIcon />}
//                             label="Save"
//                             onClick={handleSaveClick(id)}
//                             color="primary"
//                         />,
//                         <GridActionsCellItem
//                             icon={<CancelIcon />}
//                             label="Cancel"
//                             onClick={handleCancelClick(id)}
//                             color="inherit"
//                         />,
//                     ];
//                 }

//                 return [
//                     <GridActionsCellItem
//                         icon={<EditIcon />}
//                         label="Edit"
//                         onClick={handleEditClick(id)}
//                         color="inherit"
//                     />,
//                     <GridActionsCellItem
//                         icon={<DeleteIcon />}
//                         label="Delete"
//                         onClick={handleDeleteClick(id)}
//                         color="inherit"
//                     />,
//                 ];
//             },
//         },
//     ];

//     // ─────────────────────────────────────────────────────────────────────────
//     // Logout / Close dialog
//     // ─────────────────────────────────────────────────────────────────────────
//     const fnLogOut = (action) => {
//         const warningMsg =
//             errorMsgData?.Warningmsg?.[action] ||
//             (action === "Logout" ? "Are you sure you want to Logout?" : "Are you sure you want to Close?");

//         Swal.fire({
//             title: warningMsg,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: action,
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 if (action === "Logout") navigate("/");
//                 if (action === "Close") navigate(-1);
//             }
//         });
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     // Save handler — builds correct insert / update payload
//     // ─────────────────────────────────────────────────────────────────────────
//     const handleSaveButtonClick = async (values) => {
//         const errors = await validateForm();

//         // 2. Build dynamic due-date errors
//         const dueDateErrors = {};
//         if (Array.isArray(values.Terms)) {
//             values.Terms.forEach((term) => {
//                 const termNumber = getTermNumber(term.Name);
//                 if (termNumber) {
//                     const fieldName = `term${termNumber}duedate`;
//                     if (!values[fieldName]) {
//                         dueDateErrors[fieldName] = `Term ${termNumber} due date is required`;
//                     }
//                 }
//             });
//         }

//         const allErrors = { ...errors, ...dueDateErrors };

//         if (Object.keys(allErrors).length > 0) {
//             // Touch all fields so errors show
//             const touchedFields = {};
//             Object.keys(allErrors).forEach((key) => {
//                 touchedFields[key] = true;
//             });
//             setTouched(touchedFields, false);
//             // toast.error("Please fill all required fields.");
//             return;
//         }

//         // Validate at least one fee component
//         if (rows.length === 0) {
//             toast.error("Please add at least one fee component.");
//             return;
//         }

//         // Build Detail array
//         const Detail = rows.map((row) => ({
//             // Temporary nanoid strings → -1 (new record); real numeric IDs kept as-is
//             DetailID: !isNaN(Number(row.RecordID)) ? Number(row.RecordID) : -1,
//             TermsID: Number(row.TermsID) || 0,
//             Component: row.Component || "",
//             Amount: Number(row.Amount || 0),
//             FinePerDay: Number(row.Fine || 0),   // Fine in GET → FinePerDay on save
//             IsActive: row.IsActive || "Y",
//         }));

//         // TermsID: send comma-separated string from multi-select
//         const TermsIDValue = Array.isArray(values.Terms)
//             ? values.Terms.map((t) => t.RecordID).join(",")
//             : values.Terms?.RecordID || 0;

//         // StandardID: send comma-separated string from multi-select
//         const StandardIDValue = Array.isArray(values.Standard)
//             ? values.Standard.map((s) => s.RecordID).join(",")
//             : values.Standard?.RecordID || 0;

//         const idata = {
//             CompanyID: compID?.toString(),
//             HeaderID: isEditMode ? recID : 0,
//             StructureName: values.StructureName,
//             AcademicYearID: params.id2 || "",
//             AcademicType: "A",
//             TermsID: TermsIDValue,
//             StandardID: StandardIDValue,
//             AnnualDueDate: values.DueDate,
//             Disable: "N",
//             SortOrder: 1,
//             GSTApplicable: values.GSTApplicable || "N",
//             SendReminderBefore: values.SendReminderBefore ? "Y" : "N",
//             AutoApplyLateFine: values.AutoApplyLateFine ? "Y" : "N",
//             AllowPartialPayment: values.AllowPartialPayment ? "Y" : "N",
//             Detail,
//             FeeSummary: [],
//         };

//         console.log("handleSaveButtonClick idata →", idata);

//         try {
//             const response = await dispatch(
//                 postData({
//                     accessID: "TR387",
//                     action: mode === "A" ? "insert" : "update",
//                     idata,
//                 })
//             );

//             if (response?.payload?.Status === "Y") {
//                 toast.success(response.payload.Msg);
//                 navigate(-1);
//             } else if (response?.payload?.Status === "E") {
//                 toast(response.payload.Msg, {
//                     icon: <WarningIcon style={{ color: "#f59e0b" }} />,
//                 });
//             } else {
//                 toast.error(response?.payload?.Msg || "Save failed.");
//             }
//         } catch (err) {
//             console.error("Save error:", err);
//             toast.error("Error occurred during save.");
//         }
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     // Render
//     // ─────────────────────────────────────────────────────────────────────────
//     return (
//         <React.Fragment>
//             {getLoading && <LinearProgress />}

//             {/* ── Top bar ── */}
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
//                         <Box display={isNonMobile ? "flex" : "none"} alignItems="center">
//                             <Breadcrumbs
//                                 maxItems={3}
//                                 aria-label="breadcrumb"
//                                 separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
//                             >
//                                 <Typography
//                                     variant="h5"
//                                     color="#0000D1"
//                                     sx={{ cursor: "pointer", marginLeft: "10px", fontSize: "17px" }}
//                                     onClick={() => navigate(-1)}
//                                 >
//                                     Annual Fee Structure
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

//             {/* ── Main form ── */}
//             <Paper elevation={3} sx={{ margin: "10px" }}>
//                 <Formik
//                     initialValues={initialValues}
//                     enableReinitialize={true}
//                     validationSchema={validationSchema}
//                     onSubmit={(values, { resetForm, validateForm, setTouched }) => {
//                         handleSaveButtonClick(values, validateForm, setTouched);
//                     }}
//                 >
//                     {({
//                         errors,
//                         touched,
//                         handleBlur,
//                         handleChange,
//                         values,
//                         handleSubmit,
//                         setFieldValue,
//                     }) => (
//                         <form onSubmit={handleSubmit}>
//                             {/* ── Header fields ── */}
//                             <Box
//                                 display="grid"
//                                 gridTemplateColumns="repeat(4, minMax(0,1fr))"
//                                 gap={formGap}
//                                 padding={1}
//                                 sx={{
//                                     "& > div": {
//                                         gridColumn: isNonMobile ? undefined : "span 4",
//                                     },
//                                 }}
//                             >
//                                 {/* Structure Name */}
//                                 <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
//                                     <TextField
//                                         name="Structurename"
//                                         type="text"
//                                         id="Structurename"
//                                         label={<>Structure Name <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                         variant="standard"
//                                         focused
//                                         value={values.Structurename}
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         // error={!!touched.Structurename && !!errors.Structurename}
//                                         // helperText={touched.Structurename && errors.Structurename}
//                                         sx={{ gridColumn: "span 2" }}
//                                     />
//                                     {touched.Structurename && errors.Structurename && (
//                                         <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
//                                             {errors.Structurename}
//                                         </div>
//                                     )}
//                                 </FormControl>
//                                 {/* Terms — multi-select */}
//                                 <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
//                                     <MultiFormikOptimizedAutocomplete
//                                         // sx={{ gridColumn: "span 2" }}
//                                         name="Terms"
//                                         label={<>Term <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                         id="Terms"
//                                         value={values.Terms}
//                                         onChange={(e, newValue) => setFieldValue("Terms", newValue, true)}
//                                         isOptionEqualToValue={(option, value) =>
//                                             String(option.RecordID) === String(value.RecordID)
//                                         }
//                                         error={!!touched.Terms && !!errors.Terms}
//                                         helperText={touched.Terms && errors.Terms}
//                                         url={`${listViewurl}?data=${JSON.stringify({
//                                             Query: {
//                                                 AccessID: "2169",
//                                                 ScreenName: "Terms",
//                                                 VerticalLicense: Subscriptionlastthree,
//                                                 Filter: `CompanyID='${compID}' AND AcademicYearID='${params.id2}'`,
//                                                 Any: "",
//                                             },
//                                         })}`}
//                                         multiple
//                                     />
//                                     {touched.Terms && errors.Terms && (
//                                         <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
//                                             {errors.Terms}
//                                         </div>
//                                     )}
//                                 </FormControl>

//                                 {/* Applicable Standards — multi-select */}
//                                 <FormControl gap={1} sx={{ gridColumn: "span 2" }}>
//                                     <MultiFormikOptimizedAutocomplete
//                                         // sx={{ gridColumn: "span 2" }}
//                                         name="Standard"
//                                         label={<>Applicable Standards <span style={{ color: "red", fontSize: "20px" }}>*</span></>}
//                                         id="Standard"
//                                         value={values.Standard}
//                                         onChange={(e, newValue) => setFieldValue("Standard", newValue, true)}
//                                         isOptionEqualToValue={(option, value) =>
//                                             String(option.RecordID) === String(value.RecordID)
//                                         }
//                                         error={!!touched.Standard && !!errors.Standard}
//                                         helperText={touched.Standard && errors.Standard}
//                                         url={`${listViewurl}?data=${JSON.stringify({
//                                             Query: {
//                                                 AccessID: "2054",
//                                                 ScreenName: "Standard",
//                                                 VerticalLicense: Subscriptionlastthree,
//                                                 Filter: `parentID='${compID}'`,
//                                                 Any: "",
//                                             },
//                                         })}`}
//                                         multiple
//                                     />
//                                     {touched.Standard && errors.Standard && (
//                                         <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
//                                             {errors.Standard}
//                                         </div>
//                                     )}
//                                 </FormControl>

//                                 {/* Due Date */}
//                                 <FormControl gap={1} sx={{ gridColumn: "span 2" }}>

//                                     <TextField
//                                         name="DueDate"
//                                         type="date"
//                                         id="DueDate"
//                                         label="Due Date"
//                                         variant="standard"
//                                         focused
//                                         value={values.DueDate}
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         sx={{ gridColumn: "span 2" }}
//                                         disabled={mode === "V"}
//                                     />
//                                     {touched.DueDate && errors.DueDate && (
//                                         <div style={{ color: "red", fontSize: "10px", marginTop: "2px" }}>
//                                             {errors.DueDate}
//                                         </div>
//                                     )}
//                                 </FormControl>

//                             </Box>

//                             {/* ── DataGrid + Fee Summary ── */}
//                             <Grid container spacing={2} alignItems="flex-start" padding={1}>
//                                 {/* LEFT — fee components grid */}
//                                 <Grid item xs={12} md={9}>
//                                     <Box
//                                         height="350px"
//                                         marginTop={1}
//                                         sx={{
//                                             "& .MuiDataGrid-columnHeaders": {
//                                                 backgroundColor: colors.blueAccent[800],
//                                             },
//                                             "& .MuiDataGrid-virtualScroller": {
//                                                 backgroundColor: colors.primary[400],
//                                             },
//                                             "& .MuiDataGrid-footerContainer": {
//                                                 backgroundColor: colors.blueAccent[800],
//                                             },
//                                             "& .MuiCheckbox-root": {
//                                                 color: `${colors.greenAccent[200]} !important`,
//                                             },
//                                             "& .even-row": { backgroundColor: "#d0edec" },
//                                         }}
//                                     >
//                                         <DataGrid
//                                             sx={{
//                                                 "& .MuiDataGrid-footerContainer": {
//                                                     height: dataGridHeaderFooterHeight,
//                                                     minHeight: dataGridHeaderFooterHeight,
//                                                 },
//                                             }}
//                                             rowHeight={dataGridRowHeight}
//                                             headerHeight={dataGridHeaderFooterHeight}
//                                             rows={rows}
//                                             columns={TTColumns}
//                                             editMode="row"
//                                             disableSelectionOnClick
//                                             rowModesModel={rowModesModel}
//                                             onRowModesModelChange={handleRowModesModelChange}
//                                             onRowEditStop={handleRowEditStop}
//                                             processRowUpdate={processRowUpdate}
//                                             getRowId={(row) => row.id}
//                                             disableRowSelectionOnClick
//                                             experimentalFeatures={{ newEditingApi: true }}
//                                             pagination
//                                             pageSize={pageSize}
//                                             page={page}
//                                             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                                             onPageChange={(newPage) => setPage(newPage)}
//                                             components={{
//                                                 Toolbar: mode !== "V" ? EditToolbar : null,
//                                             }}
//                                             componentsProps={{
//                                                 toolbar: { setRows, setRowModesModel },
//                                             }}
//                                             onProcessRowUpdateError={(err) => {
//                                                 toast.error(err.message || "Row update error");
//                                             }}
//                                         />
//                                     </Box>
//                                 </Grid>

//                                 {/* RIGHT — fee summary panel */}
//                                 <Grid item xs={12} md={3}>
//                                     <Box
//                                         mt={1}
//                                         p={3}
//                                         sx={{
//                                             backgroundColor: "#d9ece8",
//                                             border: "1px solid #58c7b6",
//                                             borderRadius: "12px",
//                                         }}
//                                     >
//                                         <Typography
//                                             variant="h6"
//                                             fontWeight="bold"
//                                             sx={{ color: "#00695c", mb: 3 }}
//                                         >
//                                             FEE SUMMARY
//                                         </Typography>

//                                         {rows.map((item, index) => (
//                                             <Box key={index}>
//                                                 <Box
//                                                     display="flex"
//                                                     justifyContent="space-between"
//                                                     py={1}
//                                                 >
//                                                     <Typography color="#2f6f67">
//                                                         {item.Component || "—"}
//                                                     </Typography>
//                                                     <Typography fontWeight="bold" color="#004d40">
//                                                         ₹{Number(item.Amount || 0).toLocaleString()}
//                                                     </Typography>
//                                                 </Box>
//                                                 <Divider sx={{ borderColor: "#a8d5cf" }} />
//                                             </Box>
//                                         ))}

//                                         {/* Annual Total */}
//                                         <Box display="flex" justifyContent="space-between" mt={3}>
//                                             <Typography variant="h6" fontWeight="bold" color="#004d40">
//                                                 Annual Total
//                                             </Typography>
//                                             <Typography variant="h4" fontWeight="bold" color="#004d40">
//                                                 ₹
//                                                 {rows
//                                                     .reduce((sum, row) => sum + Number(row.Amount || 0), 0)
//                                                     .toLocaleString()}
//                                             </Typography>
//                                         </Box>

//                                         {/* Total Fine/Day */}
//                                         <Box display="flex" justifyContent="space-between" mt={1}>
//                                             <Typography variant="body2" color="#2f6f67">
//                                                 Total Fine/Day
//                                             </Typography>
//                                             <Typography variant="body2" fontWeight="bold" color="#004d40">
//                                                 ₹
//                                                 {rows
//                                                     .reduce((sum, row) => sum + Number(row.Fine || 0), 0)
//                                                     .toLocaleString()}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 </Grid>
//                             </Grid>

//                             {/* ── Toggle switches ── */}
//                             <Box
//                                 sx={{
//                                     background: "#fff",
//                                     borderRadius: "16px",
//                                     p: 2,
//                                     mx: 1,
//                                     mt: 1,
//                                     boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
//                                 }}
//                             >
//                                 {/* Send Reminder Before */}
//                                 <Box
//                                     display="flex"
//                                     justifyContent="space-between"
//                                     alignItems="center"
//                                     py={2}
//                                 >
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <NotificationsNoneIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">
//                                                 Send reminder 7 days before
//                                             </Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>
//                                                 Via SMS &amp; email to parents
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch
//                                         checked={values.SendReminderBefore}
//                                         onChange={(e) =>
//                                             setFieldValue("SendReminderBefore", e.target.checked)
//                                         }
//                                         color="success"
//                                         disabled={mode === "V"}
//                                     />
//                                 </Box>

//                                 <Divider />

//                                 {/* Auto-apply Late Fine */}
//                                 <Box
//                                     display="flex"
//                                     justifyContent="space-between"
//                                     alignItems="center"
//                                     py={2}
//                                 >
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <AccessTimeIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">
//                                                 Auto-apply late fine
//                                             </Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>
//                                                 Per fine/day set in components
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch
//                                         checked={values.AutoApplyLateFine}
//                                         onChange={(e) =>
//                                             setFieldValue("AutoApplyLateFine", e.target.checked)
//                                         }
//                                         color="success"
//                                         disabled={mode === "V"}
//                                     />
//                                 </Box>

//                                 <Divider />

//                                 {/* Allow Partial Payment */}
//                                 <Box
//                                     display="flex"
//                                     justifyContent="space-between"
//                                     alignItems="center"
//                                     py={1}
//                                 >
//                                     <Box display="flex" gap={2} alignItems="center">
//                                         <CreditCardIcon sx={{ color: "#94a3b8" }} />
//                                         <Box>
//                                             <Typography fontWeight={500} fontSize="14px">
//                                                 Allow partial payment
//                                             </Typography>
//                                             <Typography variant="body2" sx={{ color: "#94a3b8" }}>
//                                                 Students can pay in instalments
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                     <Switch
//                                         checked={values.AllowPartialPayment}
//                                         onChange={(e) =>
//                                             setFieldValue("AllowPartialPayment", e.target.checked)
//                                         }
//                                         color="success"
//                                         disabled={mode === "V"}
//                                     />
//                                 </Box>
//                             </Box>

//                             {/* ── Action buttons ── */}
//                             <Box
//                                 display="flex"
//                                 justifyContent="end"
//                                 mt="20px"
//                                 gap="20px"
//                                 padding={1}
//                             >
//                                 <LoadingButton
//                                     disabled={mode === "V"}
//                                     color="secondary"
//                                     variant="contained"
//                                     type="submit"
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

// export default EditAnnualfeestructure;
