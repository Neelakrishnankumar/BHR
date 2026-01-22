import React from 'react'
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
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";



const EditLeaveEnquiry = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isLoading = useSelector((state) => state.formApi.loading);


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
                        // initialValues={AttachmentInitialValues}
                        enableReinitialize={true}

                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                            >
                                <Box>
                                    <Box
                                        display="grid"
                                        gap={formGap}
                                        padding={1}
                                        gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                                    // gap="30px"
                                    // sx={{
                                    //     "& > div": {
                                    //         gridColumn: isNonMobile ? undefined : "span 2",
                                    //     },
                                    // }}
                                    >
                                        <FormControl sx={{ gap: formGap }}>

                                            <Box
                                                m="5px 0 0 0"
                                                //height={dataGridHeight}
                                                height="50vh"
                                                sx={{
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
                                                    rows={[]}
                                                    columns={[]}
                                                    disableSelectionOnClick
                                                    getRowId={(row) => row.RecordID ?? Math.random()}
                                                    rowHeight={dataGridRowHeight}
                                                    headerHeight={dataGridHeaderFooterHeight}
                                                    //  pageSize={pageSize}
                                                    // onPageSizeChange={(newPageSize) =>
                                                    //     setPageSize(newPageSize)
                                                    // }
                                                    // onCellClick={(params) => {
                                                    //     selectCellRowData({
                                                    //         rowData: params.row,
                                                    //         mode: "E",
                                                    //         field: params.field,
                                                    //     });
                                                    // }}
                                                    rowsPerPageOptions={[5, 10, 20]}
                                                    pagination
                                                    // components={{
                                                    //     Toolbar: Employee,
                                                    // }}
                                                    // onStateChange={(stateParams) =>
                                                    //     setRowCount(stateParams.pagination.rowCount)
                                                    // }
                                                    //  loading={exploreLoading}
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
                                        </FormControl>

                                        <FormControl
                                            sx={{
                                                gap: formGap,
                                                mt: { xs: "opx", md: "10px" },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                type="text"
                                                id="LoaDescription"
                                                name="LoaDescription"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="From Date"
                                                sx={{
                                                    //gridColumn: "span 2",
                                                    backgroundColor: "#ffffff", // Set the background to white
                                                    "& .MuiFilledInput-root": {
                                                        backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                                                    },
                                                }}
                                                focused
                                                inputProps={{ tabIndex: "-1" }}
                                            />

                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                type="text"
                                                id="LoaDescription"
                                                name="LoaDescription"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="To Date"
                                                sx={{
                                                    //gridColumn: "span 2",
                                                    backgroundColor: "#ffffff", // Set the background to white
                                                    "& .MuiFilledInput-root": {
                                                        backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                                                    },
                                                }}
                                                focused
                                                inputProps={{ tabIndex: "-1" }}
                                            />

                                            <TextField
                                                label={
                                                    <>
                                                        Leave Type
                                                    </>
                                                }
                                                id="category"
                                                name="category"
                                                focused
                                                variant="standard"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                select
                                                error={!!touched.category && !!errors.category}
                                                helperText={touched.category && errors.category}
                                            >
                                                <MenuItem value="">Casual Leave</MenuItem>
                                                <MenuItem value="">Medical Leave</MenuItem>
                                                <MenuItem value="">Sick Leave</MenuItem>

                                            </TextField>
                                            {/* </FormControl> */}
                                            <Box>
                                                <Field
                                                    //  size="small"
                                                    type="checkbox"
                                                    name="personal"
                                                    id="personal"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    as={Checkbox}
                                                    label="Personal"
                                                />
                                                <FormLabel focused={false}>Permission</FormLabel>
                                            </Box>
                                            {/* {values.renewal == true ? ( */}


                                            <Box
                                                display="flex"
                                                justifyContent="end"
                                                padding={1}
                                                gap={2}
                                            >
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    aria-label="upload picture"
                                                    component="label"
                                                >
                                                    <input
                                                        hidden
                                                        // accept=".pdf"
                                                        type="file"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (!file) return;

                                                            // changeHandler(e);
                                                            setFieldValue("Attachment", file.name); // UI display only
                                                        }}
                                                    />
                                                    <PictureAsPdfOutlinedIcon fontSize="small" />
                                                </IconButton>
                                                <Button
                                                    variant="contained"
                                                >
                                                    Apply
                                                </Button>

                                                <Button
                                                    type="reset"
                                                    color="warning"
                                                    variant="contained"
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </FormControl>
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
