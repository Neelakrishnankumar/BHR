import React, { useState, useEffect } from "react";
import {
    Select,
    Avatar,
    Stack,
    Grid,
    Paper,
    FormLabel,
    TextField,
    Button,
    Autocomplete,
    Box,
    Link,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    FormGroup,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Tabss from "../../ui-components/tabs";
//import LgemsLogo from '../../assets/img/LgemsLogo.png'
import "../../index.css";
import { useFormik } from "formik";
import basicSchema from "./validation";
import { useDispatch, useSelector } from "react-redux";
import {
    authentication,
    ChangePasswordRequest,
    fetchApidata,
} from "../../store/reducers/LoginReducer";
import { fetchComboData1 } from "../../store/reducers/Comboreducer";
import { fetchyearComboData } from "../../store/reducers/LoginReducer";
import store from "../../index";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
// import background from "../../assets/img/bexlogo.jpg";
import background from "../../assets/img/BexATM.png";
import { LoadingButton } from "@mui/lab";
import { useLocation } from 'react-router-dom';


const Forgetpassword_2 = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

    // const userRecid = sessionStorage.getItem("UserRecid");
    // const userName = sessionStorage.getItem("UserName");


    const location = useLocation();
    const { userName, userRecid } = location.state || {};

    console.log(userName, userRecid);



    const handleSave = async (values, resetForm) => {
        setLoading(true);
        try {
            const result = await ChangePasswordRequest({
                UserRecid: userRecid,
                UserName: userName,
                OldPassword: values.oldpassword,
                NewPassword: values.newpassword
            });

            if (result?.Status === "Y") {
                toast.success(result.Msg);
                resetForm();
                navigate('/');
            } else {
                toast.error(result?.Msg || "Change password failed");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
        navigate('/#');
    };
    return (
        // <Box display="flex" justifyContent="center" alignItems="center" height="100vh" className="wrapper">
        //     <IconButton sx={{ position: "absolute", top: 20, right: 20 }} color="info">
        //         <HelpOutlineOutlinedIcon />
        //     </IconButton>

        //     <Formik
        //         initialValues={{
        //             oldpassword: '',
        //             newpassword: '',
        //             confirmpassword: '',
        //         }}
        //         validate={(values) => {
        //             const errors = {};
        //             if (!values.oldpassword) {
        //                 errors.oldpassword = 'Please enter Old Password';
        //             }

        //             if (!values.newpassword) {
        //                 // errors.newpassword = 'New password is required';
        //                 errors.newpassword = 'Please enter New Password';
        //             } else if (values.newpassword.length < 8) {
        //                 errors.newpassword = 'Password must be at least 8 characters';
        //             } else if (!/[A-Z]/.test(values.newpassword)) {
        //                 errors.newpassword = 'Password must include an uppercase letter';
        //             } else if (!/[!@#$%^&*]/.test(values.newpassword)) {
        //                 errors.newpassword = 'Password must include a special character';
        //             }

        //             if (!values.confirmpassword) {
        //                 errors.confirmpassword = 'Please Confirm your password';
        //             } else if (values.newpassword !== values.confirmpassword) {
        //                 // errors.confirmpassword = 'Passwords do not match';
        //                 errors.confirmpassword = 'New Password and Confirm Password must match';
        //             }

        //             return errors;
        //         }}
        //         onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
        //     >
        //         {({
        //             values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm
        //         }) => (
        //             <form onSubmit={handleSubmit}>
        //                 <Paper
        //                     elevation={3}
        //                     sx={{
        //                         padding: 4,
        //                         width: isMobile ? '90vw' : 400,
        //                         borderRadius: 3,
        //                         backgroundColor: 'white',
        //                     }}
        //                 >
        //                     <Stack spacing={3}>
        //                         <Typography variant="h5" align="center" fontWeight={600}>
        //                             Change Password
        //                         </Typography>

        //                         {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => {
        //                             const labelMap = {
        //                                 oldpassword: 'Old Password',
        //                                 newpassword: 'New Password',
        //                                 confirmpassword: 'Confirm Password'
        //                             };
        //                             return (
        //                                 <FormControl key={field} fullWidth variant="outlined" required>
        //                                     <InputLabel htmlFor={field}>{labelMap[field]}</InputLabel>
        //                                     <OutlinedInput
        //                                         id={field}
        //                                         name={field}
        //                                         type={showPassword[field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm'] ? 'text' : 'password'}
        //                                         value={values[field]}
        //                                         onBlur={handleBlur}
        //                                         onChange={handleChange}
        //                                         error={touched[field] && Boolean(errors[field])}
        //                                         endAdornment={
        //                                             <InputAdornment position="end">
        //                                                 <IconButton onClick={() =>
        //                                                     toggleShowPassword(field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm')
        //                                                 } edge="end">
        //                                                     {showPassword[field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm']
        //                                                         ? <VisibilityOffIcon /> : <VisibilityIcon />}
        //                                                 </IconButton>
        //                                             </InputAdornment>
        //                                         }
        //                                         label={labelMap[field]}
        //                                     />
        //                                     {touched[field] && errors[field] && (
        //                                         <Typography color="error" fontSize="0.75rem" mt={0.5}>
        //                                             {errors[field]}
        //                                         </Typography>
        //                                     )}
        //                                 </FormControl>
        //                             );
        //                         })}

        //                         <Stack direction="row" justifyContent="flex-end" spacing={2}>
        //                             <LoadingButton
        //                                 type="submit"
        //                                 variant="contained"
        //                                 color="primary"
        //                                 loading={loading}
        //                             >
        //                                 Save
        //                             </LoadingButton>
        //                             <Button variant="outlined" color="secondary" onClick={resetForm}>
        //                                 Cancel
        //                             </Button>
        //                         </Stack>
        //                     </Stack>
        //                 </Paper>
        //             </form>
        //         )}
        //     </Formik>
        // </Box>
        <div className="wrapper">
            <Box display={"table"} height="99vh" width="100%">
                <IconButton sx={{ position: "absolute", right: "20px" }} color={"info"}>
                    <HelpOutlineOutlinedIcon />
                </IconButton>
                <Grid
                    container
                    sx={{ display: "table-cell", verticalAlign: "middle" }}
                    rowSpacing={5}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Formik
                        initialValues={{
                            oldpassword: '',
                            newpassword: '',
                            confirmpassword: '',
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.oldpassword) {
                                errors.oldpassword = 'Please enter Old Password';
                            }

                            if (!values.newpassword) {
                                // errors.newpassword = 'New password is required';
                                errors.newpassword = 'Please enter New Password';
                            } else if (values.newpassword.length < 8) {
                                errors.newpassword = 'Password must be at least 8 characters';
                            } else if (!/[A-Z]/.test(values.newpassword)) {
                                errors.newpassword = 'Password must include an uppercase letter';
                            } else if (!/[!@#$%^&*]/.test(values.newpassword)) {
                                errors.newpassword = 'Password must include a special character';
                            }

                            if (!values.confirmpassword) {
                                errors.confirmpassword = 'Please Confirm your password';
                            } else if (values.newpassword !== values.confirmpassword) {
                                // errors.confirmpassword = 'Passwords do not match';
                                errors.confirmpassword = 'New Password and Confirm Password must match';
                            }

                            return errors;
                        }}
                        onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack

                                    height={{ sm: "450px", md: "100%" }}
                                    width={{ sm: "291px", md: "700px" }}
                                    sx={{
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        borderRadius: "10px",
                                        backgroundColor: "white",
                                        padding: "15px",
                                        margin: "20px auto",
                                    }}
                                    spacing={{ sm: 4, md: 2 }}
                                    autoComplete="off"
                                    direction={{ sm: "column", md: "row" }}
                                >
                                    <Stack
                                        sx={{
                                            width: { sm: "100%", md: "100%", lg: "100%" },
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignContent: "center",
                                            justifyContent: "flexend",
                                            alignItems: "center",
                                            backgroundImage: `url(${background})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            backgroundSize: "75%",
                                            padding: 1,
                                            borderRadius: "5px",
                                            height: "350px",
                                            // marginBottom: "50px",
                                            marginTop: "-30px",
                                            flexDirection: "column-reverse",
                                        }}
                                        spacing={2}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                marginBottom: 8,
                                                // marginRight: 2,
                                                textAlign: "center",
                                            }}
                                        >
                                            {/* ATM<br /> */}
                                            Back Office System
                                        </Typography>
                                    </Stack>

                                    <Stack sx={{
                                        width: { sm: "100%", md: "100%", lg: "100%" },
                                    }}
                                        spacing={2.5}>
                                        <Typography variant="h6" align="center" fontWeight={600}>
                                            Change Password
                                        </Typography>

                                        {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => {
                                            const labelMap = {
                                                oldpassword: 'Old Password',
                                                newpassword: 'New Password',
                                                confirmpassword: 'Confirm Password'
                                            };
                                            return (
                                                <FormControl key={field} fullWidth variant="outlined" required>
                                                    <InputLabel
                                                        shrink
                                                        htmlFor={field}
                                                        sx={{
                                                            backgroundColor: "#fff",
                                                            px: 0.5,
                                                            color: "#1976d2",            // label text blue
                                                            "&.Mui-focused": {
                                                                color: "#1976d2",
                                                            },
                                                        }}
                                                    >
                                                        {labelMap[field]}
                                                    </InputLabel>


                                                    <OutlinedInput
                                                        id={field}
                                                        name={field}
                                                        focused
                                                        type={
                                                            showPassword[
                                                                field === 'oldpassword'
                                                                    ? 'old'
                                                                    : field === 'newpassword'
                                                                        ? 'new'
                                                                        : 'confirm'
                                                            ] ? 'text' : 'password'
                                                        }
                                                        value={values[field]}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        error={touched[field] && Boolean(errors[field])}
                                                        sx={{
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#1976d2",
                                                                borderWidth: "2px",
                                                            },
                                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#1976d2",
                                                            },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#1976d2",
                                                            },
                                                        }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={() =>
                                                                        toggleShowPassword(
                                                                            field === 'oldpassword'
                                                                                ? 'old'
                                                                                : field === 'newpassword'
                                                                                    ? 'new'
                                                                                    : 'confirm'
                                                                        )
                                                                    }
                                                                    edge="end"
                                                                >
                                                                    {showPassword[
                                                                        field === 'oldpassword'
                                                                            ? 'old'
                                                                            : field === 'newpassword'
                                                                                ? 'new'
                                                                                : 'confirm'
                                                                    ]
                                                                        ? <VisibilityOffIcon />
                                                                        : <VisibilityIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label={labelMap[field]}
                                                    />

                                                    {touched[field] && errors[field] && (
                                                        <Typography color="error" fontSize="0.75rem" mt={0.5}>
                                                            {errors[field]}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            );
                                        })}

                                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                color="success"
                                                loading={loading}
                                            >
                                                Save
                                            </LoadingButton>
                                            <Button variant="outlined" color="secondary" onClick={resetForm}>
                                                Cancel
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Box>
        </div>
    );
};

export default Forgetpassword_2;
