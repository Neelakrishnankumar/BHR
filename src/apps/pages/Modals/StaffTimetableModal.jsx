import React, { useEffect, useRef, useState } from "react";
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
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOverflowAffectedOrders, PartyReset, postData } from "../../../store/reducers/Formapireducer";
import { dataGridHeaderFooterHeight, dataGridRowHeight, formGap } from "../../../ui-components/utils";
import { tokens } from "../../../Theme";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { Formik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { fetchListview } from "../../../store/reducers/Listviewapireducer";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";


export default function StaffTimetableModal({ open, onClose, rowData, EmployeeID, CompanyID }) {
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
    const navigate = useNavigate();
    const state = location.state || {};
    //   const HeaderID = state.HeaderID || 0
    const HeaderID = rowData?.RecordID || 0
    const colors = tokens(theme.palette.mode);
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const commentsRef = useRef(null);
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const initialValues = {
        supplier: null,
    }

    const PartyResetSave = async (values) => {
        // const Data = {
        //     PartyID: rowData?.RecordID,
        //     Password: values.Password || "",
        //     UserID: EmployeeID,
        //     CompanyID: CompanyID

        // }
        navigate("/Apps/Staff/StaffTimetable");

    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            {/* Header */}
            <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h5" fontWeight="600">
                    Staff ({rowData?.Party}) &nbsp;
                </Typography>
            </DialogTitle>

            {/* Body */}
            <DialogContent dividers sx={{ p: 2 }}>
                {/* Loading */}
                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error */}
                {!loading && error && (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                )}

                {/* DataGrid */}
                {!loading && !error && (

                    <Box
                        sx={{
                            height: 120,
                            width: "100%",
                        }}

                    >
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                setTimeout(() => {
                                    PartyResetSave(values);
                                }, 100);
                            }}
                            enableReinitialize={true}
                        // validate={(values) => {
                        //     const errors = {};
                        //     if (!values.Password) {
                        //         errors.Password = "Please Select a Term";
                        //     }
                        //     return errors;
                        // }}
                        >
                            {({
                                errors, touched, handleBlur,
                                handleChange, values, handleSubmit,
                                setFieldValue, setFieldTouched
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            gap={formGap}
                                            padding={1}
                                        >
                                            <CheckinAutocomplete
                                                name="supplier"
                                                //label="Item"
                                                label={
                                                    <>
                                                        Term
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }
                                                id="supplier"
                                                value={values.supplier}
                                                onChange={(newValue) => {
                                                    setFieldValue("supplier", {
                                                        RecordID: newValue.RecordID,
                                                        Code: newValue.Code,
                                                        Name: newValue.Name,
                                                    });
                                                    setFieldTouched("supplier", true);

                                                    // setFieldValue(
                                                    //   "productCategoryID",
                                                    //   newValue.CrmItemCategoryID || ""
                                                    // );
                                                    setTimeout(() => {
                                                        commentsRef.current?.focus();
                                                    }, 100);
                                                }}
                                                error={!!touched.supplier && !!errors.supplier}
                                                helperText={touched.supplier && errors.supplier}
                                                // url={`${listViewurl}?data={"Query":{"AccessID":"2100","ScreenName":"Item Lead Time","Filter":"parentID=${CompanyID}","Any":""}}`}
                                                url={`${listViewurl}?data={"Query":{"AccessID":"2141","ScreenName":"Item Lead Time","Filter":"CompanyID=${CompanyID} AND ItemID='1'","Any":""}}`}
                                            />                         </Box>

                                        <Box
                                            display="flex"
                                            justifyContent="end"
                                            padding={1}
                                            gap="20px"
                                        >

                                            <LoadingButton
                                                color="secondary"
                                                variant="contained"
                                                type="submit"
                                            // loading={isLoading}
                                            >
                                                Save
                                            </LoadingButton>
                                            {" "}

                                            <Button
                                                color="warning"
                                                variant="contained"
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </form>
                                )
                            }}
                        </Formik>
                    </Box>
                )
                }
            </DialogContent>

            {/* Footer */}
            {/* <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained" disableElevation color="warning">
                    Cancel
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}