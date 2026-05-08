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
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOverflowAffectedOrders, PartyReset, postData, TimetableProcessController } from "../../../store/reducers/Formapireducer";
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


export default function Timetableprocess({ open, onClose, rowData,RecordID, EmployeeID, CompanyID,StandardID }) {
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
    const [validationSchema, setValidationSchema] = useState(null);
    const [errorMsgData, setErrorMsgData] = useState(null);

    
    const handleClickShowPassword = () => {
    };
    const initialValues = {
        reason: "",
    }

    const PartyResetSave = async (values) => {
        const data = await dispatch(TimetableProcessController({
            data: {
                HeaderID: RecordID,
                TeacherID: EmployeeID,
                Process: "Y",
                Reason: values.reason || ""
            },
        }));
        if (data.payload.Status === "Y") {
            toast.success(data.payload.Message, {
            });
            dispatch(
                fetchListview(
                    "TR368",
                    "003",
                    "Timetable",
                    `CompanyID='${CompanyID}' AND StandardID='${StandardID || 0}'`,
                    "",
                    CompanyID,
                    "003"

                )
            );
        }
        else {
            toast.error(data.payload.Message);

        }
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
                    To Unprocess Enter the Reason
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
                            // validationSchema={validationSchema}
                            validate={(values) => {
                                const errors = {};
                                if (!values.reason) {
                                    errors.reason = "Please enter the Reason";
                                }
                                return errors;
                            }}
                        >
                            {({
                                errors, touched, handleBlur,
                                handleChange, values, handleSubmit,
                                setFieldValue,
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            gap={formGap}
                                            padding={1}
                                        >
                                            <TextField
                                                name="reason"
                                                type="text"
                                                id="reason"

                                                label={
                                                    <>
                                                        Reason
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }

                                                variant="standard"
                                                focused
                                                value={values.reason}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.reason && !!errors.reason}
                                                helperText={touched.reason && errors.reason}
                                                fullWidth
                                            />
                                        </Box>

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