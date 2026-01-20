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
import { CheckinAutocomplete } from '../../../ui-components/global/Autocomplete';
import useMediaQuery from "@mui/material/useMediaQuery";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { leaveenquiryget } from "../../../store/reducers/Formapireducer";
import { useParams, useNavigate, useLocation } from "react-router-dom";

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
    const handleApplyClick = async (values) => {
        try {
            const resultAction = await dispatch(
                leaveenquiryget({
                    FromDate: values.FromDate || "",
                    ToDate: values.ToDate || "",
                    LeaveTypeID: values.leavetype?.RecordID || "",
                    CompanyID: compID,
                    EmployeesID: recID,
                    Permission: values.Permission ? "Y" : "N",
                })
            );

            const payload = resultAction.payload;

            if (payload?.Status === "Y" && Array.isArray(payload?.Data)) {
                const resData = payload.Data.map((item, index) => ({
                    ...item,
                    SLNO: index + 1,
                }));
                setRows(resData);
            } else {
                setRows([]);
            }
        } catch (error) {
            console.error("Error while applying leave enquiry:", error);
            setRows([]);
        }
    };

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
                    <Typography>List of Approvals</Typography>
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
                                        Leave Enquiry
                                    </Typography>

                                </Breadcrumbs>
                            </Box>
                        </Box>

                    </Box>
                </Paper>

                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        // onSubmit={handleFormSubmit}
                        initialValues={[]}
                        enableReinitialize={true}
                    // onSubmit={(values, { resetForm }) => {
                    //   setTimeout(() => {
                    //     FnApproval(values, resetForm, false);
                    //   }, 100);
                    // }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            resetForm,
                            setFieldValue
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                onReset={() => {
                                    //selectCellRowData({ rowData: {}, mode: "A", field: "" });
                                    resetForm();
                                }}
                            >
                                <Box>
                                    <Box
                                        display="grid"
                                        gap={formGap}
                                        padding={1}
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: isNonMobile ? undefined : "span 4",
                                            },
                                        }}
                                    >
                                        <FormControl sx={{ gridColumn: "span 2", gap: formGap }}>
                                            <TextField

                                                name="FromDate"
                                                type="date"
                                                id="FromDate"
                                                label="From Date"
                                                variant="standard"
                                                InputLabelProps={{ shrink: true }}
                                                focused
                                                value={values.FromDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.FromDate && !!errors.FromDate}
                                                helperText={touched.FromDate && errors.FromDate}
                                                // required
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                name="ToDate"
                                                type="date"
                                                id="ToDate"
                                                label="To Date"
                                                variant="standard"
                                                InputLabelProps={{ shrink: true }}
                                                focused
                                                value={values.ToDate}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.ToDate && !!errors.ToDate}
                                                helperText={touched.ToDate && errors.ToDate}
                                                // required
                                                sx={{ gridColumn: "span 2" }}
                                                inputProps={{
                                                    min:
                                                        values.FromDate ||
                                                        new Date().toISOString().split("T")[0],
                                                }}
                                            />
                                            <CheckinAutocomplete
                                                name="leavetype"
                                                label="Leave Type"
                                                id="leavetype"
                                                // required
                                                value={values.leavetype}
                                                onChange={async (newValue) => {
                                                    setFieldValue("leavetype", newValue);
                                                    // if (newValue?.RecordID) {
                                                    //     await Balancedayfind(newValue.RecordID);
                                                    // }
                                                }}
                                                error={!!touched.leavetype && !!errors.leavetype}
                                                helperText={touched.leavetype && errors.leavetype}
                                                url={`${listViewurl}?data={"Query":{"AccessID":"2107","ScreenName":"Leave Type","Filter":"parentID='${compID}' AND EmployeeID='${recID}'","Any":""}}`}
                                            />
                                            <Box>
                                                <Field
                                                    //  size="small"
                                                    type="checkbox"
                                                    name="Permission"
                                                    id="Permission"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    as={Checkbox}
                                                    label="Permission"
                                                />

                                                <FormLabel focused={false}>Permission</FormLabel>
                                            </Box>
                                        </FormControl>

                                    </Box>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        display="flex"
                                        padding={1}
                                        justifyContent="end"
                                        marginTop={-4}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                            onClick={(e) => {
                                                handleApplyClick(values);
                                            }}
                                        >
                                            APPLY
                                        </Button>
                                        <Button
                                            type="reset"
                                            variant="contained"
                                            color="error"
                                            size="small"
                                        >
                                            RESET
                                        </Button>

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
                                            rows={[]}
                                            columns={[]}
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
        </React.Fragment>
    )
}

export default EditLeaveEnquiry
