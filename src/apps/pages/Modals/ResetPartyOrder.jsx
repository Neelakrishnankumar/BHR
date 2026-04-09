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


export default function ResetPartyOrder({ open, onClose, rowData, EmployeeID, CompanyID }) {
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

    // useEffect(() => {
    //     if (!open || !rowData?.RecordID) return;

    //     const fetchData = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {

    //             dispatch(GetOverflowAffectedOrders({ HeaderID: HeaderID }));
    //         } catch (err) {
    //             setError("Failed to fetch records. Please try again.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [open, rowData?.RecordID]);

    // useEffect(() => {
    //     fetch(process.env.PUBLIC_URL + "/validationcms.json")
    //         .then((res) => {
    //             if (!res.ok) throw new Error("Failed to fetch validationcms.json");
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setErrorMsgData(data);

    //             let schemaFields = {
    //                 Password: Yup.string()
    //                     .typeError(data.ResetParty.Password)
    //                     .required(data.ResetParty.Password),
    //             };

    //             const schema = Yup.object().shape(schemaFields);
    //             setValidationSchema(schema);
    //         })
    //         .catch((err) => console.error("Error loading validationcms.json:", err));
    // }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const initialValues = {
        Password: "",
    }

    const PartyResetSave = async (values) => {
        const Data = {
            PartyID: rowData?.RecordID,
            Password: values.Password || "",
            UserID: EmployeeID,
            CompanyID: CompanyID
        }

        const response = await dispatch(PartyReset({ Data }));
        if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg, {
                duration: 6000, //  6 seconds
            });
            dispatch(
                fetchListview(
                    "TR321",
                    "Party",
                    `CompanyID=${CompanyID}`,
                    "",
                    CompanyID
                )
            );
        }
        else {
            toast.error(response.payload.Msg);

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
                    Party ({rowData?.Party}) &nbsp;
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
                                if (!values.Password) {
                                    errors.Password = "Please Enter Your Password";
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
                                                name="Password"
                                                type={showPassword ? "text" : "password"}
                                                id="Password"

                                                label={
                                                    <>
                                                        Enter Your Password
                                                        <span style={{ color: "red", fontSize: "20px" }}>
                                                            *
                                                        </span>
                                                    </>
                                                }

                                                variant="standard"
                                                focused
                                                value={values.Password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.Password && !!errors.Password}
                                                helperText={touched.Password && errors.Password}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        paddingRight: "14px",
                                                        paddingLeft: "7px",
                                                    },
                                                }}

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