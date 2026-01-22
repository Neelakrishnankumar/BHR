import {
    Divider,
    Checkbox,
    InputLabel,
    useTheme,
    MenuItem,
    Menu,
    Box,
    Button,
    Breadcrumbs,
    TextField,
    Stack,
    IconButton,
    Avatar,
    FormLabel,
    FormControl,
    Typography,
    FormControlLabel,
    Select,
    Tooltip,
    Paper,
    Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Field, useFormikContext } from "formik";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridRowHeight,
    formGap,
} from "../../../ui-components/global/utils";
import { tokens } from "../../../Theme";
import {
    DataGrid,

} from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { CheckinAutocomplete, MultiFormikOptimizedAutocomplete } from '../../../ui-components/global/Autocomplete';
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { leaveenquiryget } from "../../../store/reducers/Formapireducer";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer"
import LeaveenqempPDF from "../pdf/Leavenquiryemppdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const EditLeaveEnquiry = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isLoading = useSelector((state) => state.formApi.loading);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const compID = sessionStorage.getItem("compID");
    const [pageSize, setPageSize] = React.useState(10);
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const [rowCount, setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    let params = useParams();
    var recID = params.id;
    const navigate = useNavigate();
    const [isPermission, setIsPermission] = useState(false);
    const location = useLocation();
    const state = location.state || {};

    const handleApplyClick = async (values) => {
        const permissionFlag = values.Permission === true;
        setIsPermission(permissionFlag);

        const leaveTypeIds = permissionFlag
            ? ""
            : Array.isArray(values.leavetype)
                ? values.leavetype.map(item => item.RecordID).join(",")
                : "";

        const payloadData = {
            FromDate: values.FromDate || "",
            ToDate: values.ToDate || "",
            LeaveTypeID: leaveTypeIds,
            CompanyID: compID,
            EmployeesID: recID,
            Permission: permissionFlag ? "Y" : "N",
        };

        console.log("API Payload:", payloadData);

        try {
            const resultAction = await dispatch(leaveenquiryget(payloadData));
            const payload = resultAction.payload;

            if (payload?.Status === "Y" && Array.isArray(payload?.Data)) {
                setRows(
                    payload.Data.map((item, index) => ({
                        ...item,
                        SLNO: index + 1,
                    }))
                );
            } else {
                setRows([]);
            }
        } catch (error) {
            console.error("Error while applying leave enquiry:", error);
            setRows([]);
        }
    };


    // const columns = [

    //     {
    //         field: "slno",
    //         headerName: "SL#",
    //         width: 50,
    //         sortable: false,
    //         filterable: false,
    //         valueGetter: (params) =>
    //             `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
    //     },
    //     {
    //         field: "FromDate",
    //         headerName: "From Date",
    //         width: 200,
    //         headerAlign: "center",
    //         align: "left",
    //     },
    //     {
    //         field: "ToDate",
    //         headerName: "To Date",
    //         width: 200,
    //         headerAlign: "center",
    //         align: "left",
    //     },
    //     {
    //         field: "DisplayPermissionDate",
    //         headerName: "Permission Date",
    //         width: 200,
    //         headerAlign: "center",
    //         align: "center",
    //     },
    //     {
    //         field: "Reason",
    //         headerName: "Reason",
    //         width: 200,
    //         headerAlign: "center",
    //         align: "left",
    //     },
    //     {
    //         field: "Status",
    //         headerName: "Status",
    //         width: 400,
    //         headerAlign: "center",
    //         align: "left",
    //     },

    // ];
    // const isPermission = filters?.Permission === "Y";

    const columns = [
        {
            field: "slno",
            headerName: "SL#",
            width: 50,
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },

        ...(isPermission
            ? [

                {
                    field: "DisplayPermissionDate",
                    headerName: "Permission Date",
                    width: 150,
                    headerAlign: "center",
                    align: "center",
                },
                {
                    field: "FromDate",
                    headerName: "From Time",
                    width: 150,
                    headerAlign: "center",
                    align: "left",
                },
                {
                    field: "ToDate",
                    headerName: "To Time",
                    width: 150,
                    headerAlign: "center",
                    align: "left",
                },

                {
                    field: "Reason",
                    headerName: "Reason",
                    width: 400,
                    headerAlign: "center",
                    align: "left",
                },
            ]
            : [
                {
                    field: "LeaveName",
                    headerName: "Leave Type",
                    width: 200,
                    headerAlign: "center",
                    align: "left",
                },
                {
                    field: "FromDate",
                    headerName: "From Date",
                    width: 150,
                    headerAlign: "center",
                    align: "left",
                },
                {
                    field: "ToDate",
                    headerName: "To Date",
                    width: 150,
                    headerAlign: "center",
                    align: "left",
                },
                {
                    field: "Comments",
                    headerName: "Reason",
                    width: 400,
                    headerAlign: "center",
                    align: "left",
                },
            ]),


        {
            field: "Status",
            headerName: "Status",
            width: 200,
            headerAlign: "center",
            align: "left",
        },
    ];

    function Custombar() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography>
                        {isPermission ? "List of Permission" : "List of Leave"}
                    </Typography>
                    <Typography variant="h5">{`(${rowCount})`}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <GridToolbarQuickFilter />

                </Box>
            </GridToolbarContainer>
        );
    }
    return (
        <React.Fragment>
            <Box sx={{ height: "100vh", overflow: "auto" }}>
                <Paper elevation={3} sx={{ height: '50px', margin: "10px 10px", background: "#F2F0F0" }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"

                    >
                        <Box display="flex" borderRadius="3px" alignItems="center">
                            <IconButton >
                            </IconButton>
                            <Box
                                borderRadius="3px"
                                alignItems="center"
                            >
                                <Breadcrumbs
                                    maxItems={3}
                                    aria-label="breadcrumb"

                                >
                                    <Typography
                                        variant="h5"
                                        color="#0000D1"
                                        sx={{ cursor: "default", margin: '10px' }}
                                    >
                                        {`Leave Enquiry (${state?.EmpName ?? ""})`}
                                    </Typography>

                                </Breadcrumbs>
                            </Box>
                        </Box>

                    </Box>
                </Paper>

                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={{
                            FromDate: "",
                            ToDate: "",
                            leavetype: [],
                            Permission: false,
                        }}
                        enableReinitialize
                        onSubmit={(values) => {
                            handleApplyClick(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            resetForm,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit} onReset={resetForm}>
                                <Box p={1}>
                                    {/* 🔹 FORM GRID */}
                                    <Box
                                        display="grid"
                                        gap={formGap}
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: { xs: "span 4", md: "span 2" },
                                            },
                                        }}
                                    >
                                        <FormControl
                                            sx={{
                                                gridColumn: { xs: "span 4", md: "span 2" },
                                                gap: formGap,
                                            }}
                                        >
                                            {/* FROM DATE */}
                                            <TextField
                                                fullWidth
                                                name="FromDate"
                                                type="date"
                                                label="From Date"
                                                variant="standard"
                                                InputLabelProps={{ shrink: true }}
                                                focused
                                                value={values.FromDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.FromDate && !!errors.FromDate}
                                                helperText={touched.FromDate && errors.FromDate}
                                            />

                                            {/* TO DATE */}
                                            <TextField
                                                fullWidth
                                                name="ToDate"
                                                type="date"
                                                label="To Date"
                                                variant="standard"
                                                InputLabelProps={{ shrink: true }}
                                                focused
                                                value={values.ToDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.ToDate && !!errors.ToDate}
                                                helperText={touched.ToDate && errors.ToDate}
                                                inputProps={{
                                                    min:
                                                        values.FromDate ||
                                                        new Date().toISOString().split("T")[0],
                                                }}
                                            />

                                            {/* LEAVE TYPE */}
                                            <MultiFormikOptimizedAutocomplete
                                                multiple
                                                fullWidth
                                                sx={{ mt: 1 }}
                                                id="leavetype"
                                                name="leavetype"
                                                label="Leave Type"
                                                disabled={values.Permission}
                                                value={Array.isArray(values.leavetype) ? values.leavetype : []}
                                                onChange={(e, newValue) => {
                                                    setFieldValue("leavetype", newValue || []);
                                                }}
                                                url={`${listViewurl}?data={"Query":{"AccessID":"2107","ScreenName":"Leave Type","Filter":"parentID='${compID}' AND EmployeeID='${recID}'","Any":""}}`}
                                            />

                                            {/* PERMISSION */}
                                            <FormControlLabel
                                                sx={{ mt: 1 }}
                                                control={
                                                    <Checkbox
                                                        checked={values.Permission}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setFieldValue("Permission", checked);
                                                            if (checked) {
                                                                setFieldValue("leavetype", []);
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Permission"
                                            />
                                        </FormControl>
                                    </Box>

                                    {/* 🔹 ACTION BUTTONS */}
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                        p={1}
                                        justifyContent="flex-end"
                                        alignItems={{ xs: "stretch", sm: "center" }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                        >
                                            APPLY
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => navigate(-1)}
                                        >
                                            CANCEL
                                        </Button>

                                        <PDFDownloadLink
                                            document={
                                                <LeaveenqempPDF
                                                    data={rows}
                                                    filters={{
                                                        fromdate: values.FromDate,
                                                        todate: values.ToDate,
                                                        permission: isPermission ? "Y" : "N",
                                                        EmpName: state?.EmpName ?? "",
                                                    }}
                                                />
                                            }
                                            fileName="Leave_Enquiry_Report.pdf"
                                            style={{ color: "#d32f2f", cursor: "pointer" }}
                                        >
                                            {({ loading }) =>
                                                loading ? (
                                                    <PictureAsPdfIcon sx={{ fontSize: 24, opacity: 0.5 }} />
                                                ) : (
                                                    <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                                                )
                                            }
                                        </PDFDownloadLink>
                                    </Stack>
                                    <Box
                                        m="5px 0 0 0"
                                        height="500px"
                                        sx={{
                                            "& .MuiDataGrid-root": {
                                                // border: "none",
                                            },
                                            "& .MuiDataGrid-cell": {
                                                // borderBottom: "none",
                                            },
                                            "& .name-column--cell": {
                                                color: colors.greenAccent[300],
                                            },
                                            "& .MuiDataGrid-columnHeaders": {
                                                backgroundColor: colors.blueAccent[800],
                                                // borderBottom: "none",
                                            },
                                            "& .MuiDataGrid-virtualScroller": {
                                                backgroundColor: colors.primary[400],
                                            },
                                            "& .MuiDataGrid-footerContainer": {
                                                // borderTop: "none",
                                                backgroundColor: colors.blueAccent[800],
                                            },
                                            "& .MuiCheckbox-root": {
                                                color: `${colors.greenAccent[200]} !important`,
                                            },
                                            "& .odd-row": {
                                                backgroundColor: "",
                                                color: "", // Color for odd rows
                                            },
                                            "& .even-row": {
                                                backgroundColor: "#d0edec",
                                                color: "", // Color for even rows
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
                                            // checkboxSelection
                                            rowHeight={dataGridRowHeight}
                                            headerHeight={dataGridHeaderFooterHeight}
                                            rows={rows}
                                            columns={columns}
                                            disableSelectionOnClick
                                            getRowId={(row) => row.SLNO}
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) =>
                                                setPageSize(newPageSize)
                                            }
                                            // onCellClick={(params) => {
                                            //   selectCellRowData({
                                            //     rowData: params.row,
                                            //     mode: "E",
                                            //     field: params.field,
                                            //   });
                                            // }}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            pagination
                                            components={{
                                                Toolbar: Custombar,
                                            }}
                                            onStateChange={(stateParams) =>
                                                setRowCount(stateParams.pagination.rowCount)
                                            }
                                            loading={exploreLoading}
                                            componentsProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                    quickFilterProps: { debounceMs: 500 },
                                                },
                                            }}
                                            getRowClassName={(params) =>
                                                params.indexRelativeToCurrentPage % 2 === 0
                                                    ? "odd-row"
                                                    : "even-row"
                                            }
                                        />
                                    </Box>
                                </Box>

                            </form>
                        )}
                    </Formik>
                </Paper>


            </Box>
        </React.Fragment >
    )
}

export default EditLeaveEnquiry
