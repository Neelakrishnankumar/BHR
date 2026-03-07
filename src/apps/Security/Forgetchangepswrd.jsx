// import React, { useState, useEffect } from "react";
// import {
//     Select,
//     Avatar,
//     Stack,
//     Grid,
//     Paper,
//     FormLabel,
//     TextField,
//     Button,
//     Autocomplete,
//     Box,
//     Link,
//     IconButton,
//     FormControl,
//     InputLabel,
//     OutlinedInput,
//     InputAdornment,
//     FormHelperText,
//     FormGroup,
//     MenuItem,
//     Typography,
//     useMediaQuery,
//     useTheme
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useNavigate } from "react-router-dom";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import Tabss from "../../ui-components/tabs";
// //import LgemsLogo from '../../assets/img/LgemsLogo.png'
// import "../../index.css";
// import { useFormik } from "formik";
// import basicSchema from "./validation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     authentication,
//     ChangePasswordRequest,
//     fetchApidata,
// } from "../../store/reducers/LoginReducer";
// import { fetchComboData1 } from "../../store/reducers/Comboreducer";
// import { fetchyearComboData } from "../../store/reducers/LoginReducer";
// import store from "../../index";
// import { toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// // import background from "../../assets/img/bexlogo.jpg";
// import background from "../../assets/img/BexATM.png";
// import { LoadingButton } from "@mui/lab";
// import { useLocation } from 'react-router-dom';


// const Forgetpassword_2 = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const toggleShowPassword = (field) => {
//         setShowPassword((prev) => ({
//             ...prev,
//             [field]: !prev[field],
//         }));
//     };
//     const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

//     // const userRecid = sessionStorage.getItem("UserRecid");
//     // const userName = sessionStorage.getItem("UserName");


//     const location = useLocation();
//     const { userName, userRecid } = location.state || {};

//     console.log(userName, userRecid);



//     const handleSave = async (values, resetForm) => {
//         setLoading(true);
//         try {
//             const result = await ChangePasswordRequest({
//                 UserRecid: userRecid,
//                 UserName: userName,
//                 OldPassword: values.oldpassword,
//                 NewPassword: values.newpassword
//             });

//             if (result?.Status === "Y") {
//                 toast.success(result.Msg);
//                 resetForm();
//                 navigate('/');
//             } else {
//                 toast.error(result?.Msg || "Change password failed");
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error("Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//         navigate('/#');
//     };
//     return (
//         // <Box display="flex" justifyContent="center" alignItems="center" height="100vh" className="wrapper">
//         //     <IconButton sx={{ position: "absolute", top: 20, right: 20 }} color="info">
//         //         <HelpOutlineOutlinedIcon />
//         //     </IconButton>

//         //     <Formik
//         //         initialValues={{
//         //             oldpassword: '',
//         //             newpassword: '',
//         //             confirmpassword: '',
//         //         }}
//         //         validate={(values) => {
//         //             const errors = {};
//         //             if (!values.oldpassword) {
//         //                 errors.oldpassword = 'Please enter Old Password';
//         //             }

//         //             if (!values.newpassword) {
//         //                 // errors.newpassword = 'New password is required';
//         //                 errors.newpassword = 'Please enter New Password';
//         //             } else if (values.newpassword.length < 8) {
//         //                 errors.newpassword = 'Password must be at least 8 characters';
//         //             } else if (!/[A-Z]/.test(values.newpassword)) {
//         //                 errors.newpassword = 'Password must include an uppercase letter';
//         //             } else if (!/[!@#$%^&*]/.test(values.newpassword)) {
//         //                 errors.newpassword = 'Password must include a special character';
//         //             }

//         //             if (!values.confirmpassword) {
//         //                 errors.confirmpassword = 'Please Confirm your password';
//         //             } else if (values.newpassword !== values.confirmpassword) {
//         //                 // errors.confirmpassword = 'Passwords do not match';
//         //                 errors.confirmpassword = 'New Password and Confirm Password must match';
//         //             }

//         //             return errors;
//         //         }}
//         //         onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
//         //     >
//         //         {({
//         //             values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm
//         //         }) => (
//         //             <form onSubmit={handleSubmit}>
//         //                 <Paper
//         //                     elevation={3}
//         //                     sx={{
//         //                         padding: 4,
//         //                         width: isMobile ? '90vw' : 400,
//         //                         borderRadius: 3,
//         //                         backgroundColor: 'white',
//         //                     }}
//         //                 >
//         //                     <Stack spacing={3}>
//         //                         <Typography variant="h5" align="center" fontWeight={600}>
//         //                             Change Password
//         //                         </Typography>

//         //                         {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => {
//         //                             const labelMap = {
//         //                                 oldpassword: 'Old Password',
//         //                                 newpassword: 'New Password',
//         //                                 confirmpassword: 'Confirm Password'
//         //                             };
//         //                             return (
//         //                                 <FormControl key={field} fullWidth variant="outlined" required>
//         //                                     <InputLabel htmlFor={field}>{labelMap[field]}</InputLabel>
//         //                                     <OutlinedInput
//         //                                         id={field}
//         //                                         name={field}
//         //                                         type={showPassword[field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm'] ? 'text' : 'password'}
//         //                                         value={values[field]}
//         //                                         onBlur={handleBlur}
//         //                                         onChange={handleChange}
//         //                                         error={touched[field] && Boolean(errors[field])}
//         //                                         endAdornment={
//         //                                             <InputAdornment position="end">
//         //                                                 <IconButton onClick={() =>
//         //                                                     toggleShowPassword(field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm')
//         //                                                 } edge="end">
//         //                                                     {showPassword[field === 'oldpassword' ? 'old' : field === 'newpassword' ? 'new' : 'confirm']
//         //                                                         ? <VisibilityOffIcon /> : <VisibilityIcon />}
//         //                                                 </IconButton>
//         //                                             </InputAdornment>
//         //                                         }
//         //                                         label={labelMap[field]}
//         //                                     />
//         //                                     {touched[field] && errors[field] && (
//         //                                         <Typography color="error" fontSize="0.75rem" mt={0.5}>
//         //                                             {errors[field]}
//         //                                         </Typography>
//         //                                     )}
//         //                                 </FormControl>
//         //                             );
//         //                         })}

//         //                         <Stack direction="row" justifyContent="flex-end" spacing={2}>
//         //                             <LoadingButton
//         //                                 type="submit"
//         //                                 variant="contained"
//         //                                 color="primary"
//         //                                 loading={loading}
//         //                             >
//         //                                 Save
//         //                             </LoadingButton>
//         //                             <Button variant="outlined" color="secondary" onClick={resetForm}>
//         //                                 Cancel
//         //                             </Button>
//         //                         </Stack>
//         //                     </Stack>
//         //                 </Paper>
//         //             </form>
//         //         )}
//         //     </Formik>
//         // </Box>
//         <div className="wrapper">
//             <Box display={"table"} height="99vh" width="100%">
//                 <IconButton sx={{ position: "absolute", right: "20px" }} color={"info"}>
//                     <HelpOutlineOutlinedIcon />
//                 </IconButton>
//                 <Grid
//                     container
//                     sx={{ display: "table-cell", verticalAlign: "middle" }}
//                     rowSpacing={5}
//                     columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                 >
//                     <Formik
//                         initialValues={{
//                             oldpassword: '',
//                             newpassword: '',
//                             confirmpassword: '',
//                         }}
//                         validate={(values) => {
//                             const errors = {};
//                             if (!values.oldpassword) {
//                                 errors.oldpassword = 'Please enter the Old Password';
//                             }

//                             if (!values.newpassword) {
//                                 // errors.newpassword = 'New password is required';
//                                 errors.newpassword = 'Please enter the New Password';
//                             } else if (values.newpassword.length < 8) {
//                                 errors.newpassword = 'Password must be at least 8 characters';
//                             } else if (!/[A-Z]/.test(values.newpassword)) {
//                                 errors.newpassword = 'Password must include an uppercase letter';
//                             } else if (!/[!@#$%^&*]/.test(values.newpassword)) {
//                                 errors.newpassword = 'Password must include a special character';
//                             }

//                             if (!values.confirmpassword) {
//                                 errors.confirmpassword = 'Please Confirm your password';
//                             } else if (values.newpassword !== values.confirmpassword) {
//                                 // errors.confirmpassword = 'Passwords do not match';
//                                 errors.confirmpassword = 'New Password and Confirm Password must match';
//                             }

//                             return errors;
//                         }}
//                         onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
//                     >
//                         {({
//                             values,
//                             errors,
//                             touched,
//                             handleBlur,
//                             handleChange,
//                             handleSubmit,
//                             resetForm,
//                         }) => (
//                             <form onSubmit={handleSubmit}>
//                                 <Stack

//                                     height={{ sm: "450px", md: "100%" }}
//                                     width={{ sm: "291px", md: "700px" }}
//                                     sx={{
//                                         boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                                         borderRadius: "10px",
//                                         backgroundColor: "white",
//                                         padding: "15px",
//                                         margin: "20px auto",
//                                     }}
//                                     spacing={{ sm: 4, md: 2 }}
//                                     autoComplete="off"
//                                     direction={{ sm: "column", md: "row" }}
//                                 >
//                                     <Stack
//                                         sx={{
//                                             width: { sm: "100%", md: "100%", lg: "100%" },
//                                             height: "100%",
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             alignContent: "center",
//                                             justifyContent: "flexend",
//                                             alignItems: "center",
//                                             backgroundImage: `url(${background})`,
//                                             backgroundRepeat: "no-repeat",
//                                             backgroundPosition: "center",
//                                             backgroundSize: "75%",
//                                             padding: 1,
//                                             borderRadius: "5px",
//                                             height: "350px",
//                                             // marginBottom: "50px",
//                                             marginTop: "-30px",
//                                             flexDirection: "column-reverse",
//                                         }}
//                                         spacing={2}
//                                     >
//                                         <Typography
//                                             variant="h6"
//                                             sx={{
//                                                 marginBottom: 8,
//                                                 // marginRight: 2,
//                                                 textAlign: "center",
//                                             }}
//                                         >
//                                             {/* ATM<br /> */}
//                                             Back Office System
//                                         </Typography>
//                                     </Stack>

//                                     <Stack sx={{
//                                         width: { sm: "100%", md: "100%", lg: "100%" },
//                                     }}
//                                         spacing={2.5}>
//                                         <Typography variant="h6" align="center" fontWeight={600}>
//                                             Change Passwordv
//                                         </Typography>

//                                         {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => {
//                                             const labelMap = {
//                                                 oldpassword: 'Old Password',
//                                                 newpassword: 'New Password',
//                                                 confirmpassword: 'Confirm Password'
//                                             };
//                                             return (
//                                                 <FormControl key={field} fullWidth variant="outlined" required>
//                                                     <InputLabel
//                                                         shrink
//                                                         htmlFor={field}
//                                                         sx={{
//                                                             backgroundColor: "#fff",
//                                                             px: 0.5,
//                                                             color: "#1976d2",            // label text blue
//                                                             "&.Mui-focused": {
//                                                                 color: "#1976d2",
//                                                             },
//                                                         }}
//                                                     >
//                                                         {labelMap[field]}
//                                                     </InputLabel>


//                                                     <OutlinedInput
//                                                         id={field}
//                                                         name={field}
//                                                         focused
//                                                         type={
//                                                             showPassword[
//                                                                 field === 'oldpassword'
//                                                                     ? 'old'
//                                                                     : field === 'newpassword'
//                                                                         ? 'new'
//                                                                         : 'confirm'
//                                                             ] ? 'text' : 'password'
//                                                         }
//                                                         value={values[field]}
//                                                         onBlur={handleBlur}
//                                                         onChange={handleChange}
//                                                         error={touched[field] && Boolean(errors[field])}
//                                                         sx={{
//                                                             "& .MuiOutlinedInput-notchedOutline": {
//                                                                 borderColor: "#1976d2",
//                                                                 borderWidth: "2px",
//                                                             },
//                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
//                                                                 borderColor: "#1976d2",
//                                                             },
//                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                                                                 borderColor: "#1976d2",
//                                                             },
//                                                         }}
//                                                         endAdornment={
//                                                             <InputAdornment position="end">
//                                                                 <IconButton
//                                                                     onClick={() =>
//                                                                         toggleShowPassword(
//                                                                             field === 'oldpassword'
//                                                                                 ? 'old'
//                                                                                 : field === 'newpassword'
//                                                                                     ? 'new'
//                                                                                     : 'confirm'
//                                                                         )
//                                                                     }
//                                                                     edge="end"
//                                                                 >
//                                                                     {showPassword[
//                                                                         field === 'oldpassword'
//                                                                             ? 'old'
//                                                                             : field === 'newpassword'
//                                                                                 ? 'new'
//                                                                                 : 'confirm'
//                                                                     ]
//                                                                         ? <VisibilityOffIcon />
//                                                                         : <VisibilityIcon />}
//                                                                 </IconButton>
//                                                             </InputAdornment>
//                                                         }
//                                                         label={labelMap[field]}
//                                                     />

//                                                     {touched[field] && errors[field] && (
//                                                         <Typography color="error" fontSize="0.75rem" mt={0.5}>
//                                                             {errors[field]}
//                                                         </Typography>
//                                                     )}
//                                                 </FormControl>
//                                             );
//                                         })}

//                                         <Stack direction="row" justifyContent="flex-end" spacing={2}>
//                                             <LoadingButton
//                                                 type="submit"
//                                                 variant="contained"
//                                                 color="success"
//                                                 loading={loading}
//                                             >
//                                                 Save
//                                             </LoadingButton>
//                                             <Button variant="contained" color="warning" 
//                                             // onClick={resetForm}
//                                             onClick={() => {                                             
//                                                     resetForm();                                                   
//                                                     navigate(-1);
//                                                 }}
//                                             >
//                                                 Cancel
//                                             </Button>
//                                         </Stack>
//                                     </Stack>
//                                 </Stack>
//                             </form>
//                         )}
//                     </Formik>
//                 </Grid>
//             </Box>
//         </div>
//     );
// };

// export default Forgetpassword_2;
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
    useTheme,
    Card
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
import background from "../../assets/img/BOS_Coverimg2.png";
import { LoadingButton } from "@mui/lab";
import { useLocation } from 'react-router-dom';
import { styled } from "@mui/system";

const FlexBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
    height: "100%",
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
        minHeight: "100vh",
        justifyContent: "center",
    },
}));

const JWTRoot = styled(JustifyBox)(({ theme }) => ({
    minHeight: "90vh",
    "& .card": {
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        // borderRadius: 12,
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            boxShadow: "none",
            borderRadius: 0,
            minHeight: "90vh",
        },
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f5f9fa",
        borderRadius: "8px",
        "& fieldset": {
            borderColor: "#e0e0e0",
        },
        "&:hover fieldset": {
            borderColor: "#00796b",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00796b",
        },
    },
    "& .MuiInputLabel-root": {
        color: "#666",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#00796b",
    },
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    backgroundColor: "#f5f9fa",
    borderRadius: "8px",
    "& fieldset": {
        borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
        borderColor: "#00796b",
    },
    "&.Mui-focused fieldset": {
        borderColor: "#00796b",
    },
}));


const LoginButton = styled(LoadingButton)(({ theme }) => ({
    // backgroundColor: "#00796b",
    background: "#0A4063",
    background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
    color: "#ffffff",
    padding: "12px 0",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",
    // "&:hover": {
    //   backgroundColor: "#00695c",
    // },
    "&:hover": {
        background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
    },

    "& .MuiCircularProgress-root": {
        color: "#ffffff",
    },
}));

const Forgetpassword_2 = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

        <JWTRoot>
            <Card
                className="card"
                sx={{
                    width: "100%",
                    boxShadow: { xs: "none", sm: 3 },
                    borderRadius: { xs: 0, sm: 0 },

                    // ✅ Add this
                    backgroundImage: {
                        xs: `url(${background})`,
                        sm: "none",
                    },
                    backgroundSize: {
                        xs: "cover",
                        sm: "unset",
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <Grid container sx={{ height: "100vh" }}>

                    <Grid item sm={7} xs={12}>

                        <ContentBox
                            sx={{
                                mx: "auto",
                                width: "100%",
                                maxWidth: { xs: "95%", sm: 420 },
                                // px: { xs: 2, sm: 6 },
                                // py: { xs: 4, sm: 6 },
                                paddingRight: { xs: 2, sm: 6 },
                                paddingLeft: { xs: 1, sm: 6 },
                                paddingTop: { xs: 0, sm: 0 },
                                paddingBottom: { xs: 0, sm: 0 },
                                backgroundColor: "#ffffff",
                                // ✅ Transparent on xs so background shows
                                backgroundColor: {
                                    xs: "rgba(255,255,255,0.85)",
                                    sm: "#ffffff",
                                },
                                backdropFilter: {
                                    xs: "blur(15px)",
                                    sm: "none",
                                },

                            }}
                        >
                            {/* Header */}
                            <Box mb={2}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "20px", sm: "30px" },
                                        fontWeight: 600,
                                        // mb: 0.5,

                                        // background: "linear-gradient(180deg, rgba(10,64,99,1) 53%, rgba(6,128,150,1) 100%)",
                                        background: "linear-gradient(180deg,rgba(10, 64, 99, 1) 37%, rgba(6, 128, 150, 1) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        textAlign: "center"
                                    }}
                                >
                                    Change Password
                                </Typography>
                            </Box>

                            <Formik
                                initialValues={{
                                    oldpassword: '',
                                    newpassword: '',
                                    confirmpassword: '',
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.oldpassword) {
                                        errors.oldpassword = 'Please enter the Old Password';
                                    }

                                    if (!values.newpassword) {
                                        // errors.newpassword = 'New password is required';
                                        errors.newpassword = 'Please enter the New Password';
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
                                        <Stack spacing={2}>

                                            {['oldpassword', 'newpassword', 'confirmpassword'].map((field, index) => {
                                                const labelMap = {
                                                    oldpassword: 'Old Password',
                                                    newpassword: 'New Password',
                                                    confirmpassword: 'Confirm Password'
                                                };
                                                return (
                                                    <FormControl key={field} fullWidth variant="outlined" required>
                                                        {/* <InputLabel
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
                                                        </InputLabel> */}


                                                        <StyledTextField
                                                            id={field}
                                                            name={field}
                                                            // focused
                                                            fullWidth
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
                                                            // sx={{
                                                            //     "& .MuiOutlinedInput-notchedOutline": {
                                                            //         borderColor: "#1976d2",
                                                            //         borderWidth: "2px",
                                                            //     },
                                                            //     "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            //         borderColor: "#1976d2",
                                                            //     },
                                                            //     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            //         borderColor: "#1976d2",
                                                            //     },
                                                            // }}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Box sx={{ color: "#999", fontSize: "17px" }}>🔒</Box>
                                                                    </InputAdornment>
                                                                ),
                                                                endAdornment: (
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
                                                                ),
                                                                sx: {
                                                                    paddingRight: "14px",
                                                                    paddingLeft: "7px",
                                                                },
                                                            }}
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
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    mt: 1,
                                                }}
                                            >

                                                <Link
                                                    onClick={() => navigate('/')}
                                                    sx={{
                                                        // color: "#00796b",
                                                        color: "#608dcb",
                                                        fontSize: "14px",
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        "&:hover": {
                                                            textDecoration: "underline",
                                                        },
                                                    }}
                                                >
                                                    Back
                                                </Link>

                                            </Box>
                                            <LoginButton
                                                type="submit"
                                                variant="contained"
                                                // color="success"
                                                loading={loading}
                                                fullWidth
                                            >
                                                Save
                                            </LoginButton>
                                            {/* <Button variant="contained" color="warning" 
                                            // onClick={resetForm}
                                            onClick={() => {                                             
                                                    resetForm();                                                   
                                                    navigate(-1);
                                                }}
                                            >
                                                Cancel
                                            </Button> */}

                                        </Stack>

                                    </form>
                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                    {/* Right Side: Image */}
                    <Grid
                        item
                        sm={5}
                        xs={false}
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            alignItems: "center", // CHANGED: Added to center vertically
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage: `url(${background})`,
                                // backgroundSize: "cover",
                                backgroundSize: "contain",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                // height: "100%",
                                height: "98vh",
                                minHeight: "100vh",
                                width: "100%",
                            }}

                        />
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default Forgetpassword_2;