import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    Typography,
    Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOverflowAffectedOrders } from "../../../store/reducers/Formapireducer";
import { dataGridHeaderFooterHeight, dataGridRowHeight } from "../../../ui-components/utils";
import { tokens } from "../../../Theme";
import { useTheme } from "@emotion/react";


export default function OrderHeaderModal({ open, onClose, rowData }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    var secondaryCurrentPage = parseInt(
        sessionStorage.getItem("secondaryCurrentPage")
    );
    const [pageSize, setPageSize] = React.useState(20);
    const [page, setPage] = React.useState(secondaryCurrentPage);
    const params = useParams();
    const location = useLocation();
    const theme = useTheme();
    const state = location.state || {};
    //   const HeaderID = state.HeaderID || 0
    const HeaderID = rowData?.RecordID || 0
    const colors = tokens(theme.palette.mode);
    const Data = useSelector((state) => state.formApi.GetOverflowAffectedOrdersdata);
    const Gridloading = useSelector((state) => state.formApi.GetOverflowAffectedOrdersloading);
    useEffect(() => {
        if (!open || !rowData?.RecordID) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {

                dispatch(GetOverflowAffectedOrders({ HeaderID: HeaderID }));
            } catch (err) {
                setError("Failed to fetch records. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [open, rowData?.RecordID]);


    const columns = [
        {
            field: "SLNO",
            headerName: "SL#",
            width: 50,
            sortable: false,
            filterable: false,
            valueGetter: (params) =>
                page * pageSize +
                params.api.getRowIndexRelativeToVisibleRows(params.id) +
                1,


        },
        { field: "RecordID", headerName: "RecordID", hide: true },
        { field: "OrderDate", headerName: "Order Date", width: 120, headerAlign: "center", align: "center" },
        { field: "Code", headerName: "Code", width:100, headerAlign: "center" },
        { field: "Description", headerName: "Description", width: 300, headerAlign: "center" },
        { field: "OrderTotal", headerName: "Order Total", width: 120, headerAlign: "center", align: "right" },
        {
            field: "Status",
            headerName: "Status",
            width: 170,
            headerAlign: "center",
            // renderCell: (params) => (
            //     <Chip
            //         label={params.value}
            //         size="small"
            //         color={params.value === "Paid" ? "success" : "default"}
            //     />
            // ),
        },
        {
            field: "PaidAmount",
            headerName: "Paid Amount",
            headerAlign: "center",
            align: "right",
            width: 120,
        },
        {
            field: "PendingAmount",
            headerName: "Pending Amount",
            headerAlign: "center",
            align: "right",
            width: 120,
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            {/* Header */}
            <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h5" fontWeight="600">
                    Party ({rowData?.PartyName}) &nbsp;|&nbsp; Order Number ({rowData?.Code}) &nbsp;
                </Typography>
            </DialogTitle>

            {/* Body */}
            <DialogContent dividers sx={{ p: 2 }}>
                {/* Loading */}
                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error */}
                {!loading && error && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                )}

                {/* DataGrid */}
                {!loading && !error && (

                    <Box
                        sx={{
                            height: 420,
                            width: "100%",

                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[800],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
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
                                backgroundColor: "#D3D3D3",
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

                            rows={Data ?? []}
                            columns={columns}
                            loading={Gridloading}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            rowHeight={dataGridRowHeight}
                            headerHeight={dataGridHeaderFooterHeight}
                            pagination
                            pageSize={pageSize}
                            pageSizeOptions={[5, 10, 25]}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                            }
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
                )}
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained" disableElevation color="warning">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}