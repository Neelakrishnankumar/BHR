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
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                type="text"
                                                id="code"
                                                name="code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Code"
                                                focused
                                            // inputProps={{ readOnly: true }}
                                            />

                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                type="text"
                                                id="Name"
                                                name="Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Name"
                                                focused
                                            // inputProps={{ readOnly: true }}
                                            />

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
                                                   // rows={explorelistViewData}
                                                   // columns={columns}
                                                    disableSelectionOnClick
                                                    getRowId={(row) => row.RecordID}
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
                                                mt: { xs: "opx", md: "150px" },
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
                                                label="Description"
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
                                                        Category
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
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
                                                <MenuItem value="EC">Education</MenuItem>
                                                <MenuItem value="AD">Award</MenuItem>
                                                <MenuItem value="CT">Certificate</MenuItem>
                                                <MenuItem value="IS">Insurance</MenuItem>
                                                <MenuItem value="WT">Warranty</MenuItem>
                                                <MenuItem value="OS">Others</MenuItem>
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
                                                <FormLabel focused={false}>Personal</FormLabel>
                                            </Box>
                                            {/* {values.renewal == true ? ( */}
                                            <TextField
                                                name="RenewalDate"
                                                label="Next Renewal Required Date"
                                                type="date"
                                                variant="standard"
                                                focused
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.RenewalDate && !!errors.RenewalDate}
                                                helperText={touched.RenewalDate && errors.RenewalDate}
                                                InputProps={{
                                                    sx: {
                                                        pl: 1.5,
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

                                            <FormControl
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >


                                                <Box>
                                                    <Field
                                                        //  size="small"
                                                        type="checkbox"
                                                        name="renewal"
                                                        id="renewal"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        as={Checkbox}
                                                        label="Renewal Required"
                                                    />
                                                    <FormLabel focused={false}>
                                                        Renewal Required
                                                    </FormLabel>

                                                </Box>
                                            </FormControl>



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
                                                    {/* <PictureAsPdfOutlinedIcon fontSize="small" /> */}
                                                </IconButton>
                                                <Button
                                                    variant="contained"
                                                >
                                                    View
                                                </Button>

                                                    <LoadingButton
                                                        color="secondary"
                                                        variant="contained"
                                                        type="submit"
                                                        loading={isLoading}
                                                    >
                                                        Save
                                                    </LoadingButton>
                                               
                                                 
                                                
                                              
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
