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
//     fetchApidata,
//     ForgotPasswordRequest,
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

// const style = {
//     height: "55px",
//     border: "2px solid #1769aa ",
//     borderRadius: "5px",
// };

// const Forgetpassword_1 = () => {
//     const navigate = useNavigate();
//     const Data = useSelector((state) => state.loginApi.Data);
//     const Status = useSelector((state) => state.loginApi.Status);
//     const Msg = useSelector((state) => state.loginApi.msg);
//     const isLoading = useSelector((state) => state.loginApi.loading);
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const CompanyCombo = useSelector((state) => state.comboApi.company);
//     const YearCombo = useSelector((state) => state.comboApi.year);

//     React.useEffect(() => {
//         dispatch(fetchComboData1("TR014", "getall", "-1", "Company"));
//         dispatch(fetchComboData1("TR015", "getall", "-1", "Year"));
//     }, []);

//     const [value, setValues] = React.useState({
//         showPassword: false,
//     });

//     const handleChanges = (prop) => (event) => {
//         setValues({ ...value, [prop]: event.target.value });
//     };

//     const handleClickShowPassword = () => {
//         setValues({
//             ...value,
//             showPassword: !value.showPassword,
//         });
//     };

//     const [company, setCompanycombo] = React.useState();
//     const [year, setYearcombo] = React.useState();
//     var firstLogin = "Y";
//     const initialValues = {
//         username: "",
//         password: "",
//         mailid: "",
//         company: company,
//         year: year,
//         license: ""
//     };
//     const clear = async (values) => {
//         setCompanycombo("");
//         setYearcombo("");
//     };
//     const handleForgotPasswordRequest = async (values, resetForm) => {
//         setLoading(true);
//         try {
//             const requestData = {
//                 UserName: values.username,
//                 UserEmailID: values.mailid,
//                 LicenseKey: values.license,
//             };
//             const result = await ForgotPasswordRequest(requestData)

//             if (result?.Status === "Y") {
//                 toast.success(result.Msg || "OTP sent successfully!");
//                 resetForm();
//                 navigate('/Changepassword', {
//                     state: {
//                         userName: values.username,
//                         userRecid: result.UserRecid,
//                     },
//                 });
//             } else {
//                 toast.error(result?.Msg || "Failed to send OTP.");
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error("Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }

//     };
//     return (
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
//                             username: "",
//                             mailid: "",
//                             license: "",
//                         }}
//                         validate={(values) => {
//                             const errors = {};

//                             if (!values.username) {
//                                 errors.username = "Please enter the Username";
//                             }
//                             if (!values.mailid) {
//                                 errors.mailid = "Please enter the Email ID";
//                             } else if (
//                                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mailid)
//                             ) {
//                                 errors.mailid = "Please enter valid Email ID";
//                             }
//                             if (!values.license) {
//                                 errors.license = "Please enter the Subscription Code";
//                             }
//                             return errors;
//                         }}
//                         onSubmit={(values, { resetForm }) => {
//                             handleForgotPasswordRequest(values, resetForm);
//                         }}
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

//                                     <Stack
//                                         sx={{
//                                             width: { sm: "100%", md: "100%", lg: "100%" },
//                                         }}
//                                         spacing={2.5}
//                                     >
//                                         <Typography variant="h6" align="center" fontWeight={600}>
//                                             Forget Password
//                                         </Typography>
//                                         <FormControl sx={{ marginTop: "30px" }}>
//                                             <TextField
//                                                 name="username"
//                                                 label="Username"
//                                                 value={values.username}
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 error={touched.username && Boolean(errors.username)}
//                                                 helperText={touched.username && errors.username}
//                                                 fullWidth
//                                             />
//                                         </FormControl>

//                                         <TextField
//                                             name="mailid"
//                                             label="Email ID"
//                                             value={values.mailid}
//                                             onChange={handleChange}
//                                             onBlur={handleBlur}
//                                             error={touched.mailid && Boolean(errors.mailid)}
//                                             helperText={touched.mailid && errors.mailid}
//                                             fullWidth
//                                         />

//                                         <TextField
//                                             name="license"
//                                             label="Subscription Code"
//                                             value={values.license}
//                                             onChange={handleChange}
//                                             onBlur={handleBlur}
//                                             error={touched.license && Boolean(errors.license)}
//                                             helperText={touched.license && errors.license}
//                                             fullWidth
//                                         />

//                                         {/* <Box sx={{ flexGrow: 1 }} /> */}
//                                         <Stack direction={"row"} justifyContent="end" gap={"10px"} sx={{ marginTop: "50px" }}>

//                                             <LoadingButton
//                                                 type="submit"
//                                                 color="success"
//                                                 loading={isLoading}
//                                                 variant="contained"
//                                             >
//                                                 SEND OTP
//                                             </LoadingButton>

//                                             <Button
//                                                 variant="contained"
//                                                 color="warning"

//                                                 onClick={() => {
//                                                     {
//                                                         clear(values);
//                                                     }
//                                                     {
//                                                         resetForm();
//                                                     }
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

// export default Forgetpassword_1;

import React, { useState, useEffect } from "react";
import {
    Card,
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
    fetchApidata,
    ForgotPasswordRequest,
} from "../../store/reducers/LoginReducer";
import { fetchComboData1 } from "../../store/reducers/Comboreducer";
import { fetchyearComboData } from "../../store/reducers/LoginReducer";
import store from "../../index";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
// import background from "../../assets/img/bexlogo.jpg";
// import background from "../../assets/img/BexATM.png";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";
// import background from "../../assets/img/Back_Office_Final2.png";
import background from "../../assets/img/BOS_Coverimg2.png";

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


const Forgetpassword_1 = () => {
    const navigate = useNavigate();
    const Data = useSelector((state) => state.loginApi.Data);
    const Status = useSelector((state) => state.loginApi.Status);
    const Msg = useSelector((state) => state.loginApi.msg);
    const isLoading = useSelector((state) => state.loginApi.loading);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const CompanyCombo = useSelector((state) => state.comboApi.company);
    const YearCombo = useSelector((state) => state.comboApi.year);

    React.useEffect(() => {
        dispatch(fetchComboData1("TR014", "getall", "-1", "Company"));
        dispatch(fetchComboData1("TR015", "getall", "-1", "Year"));
    }, []);

    const [value, setValues] = React.useState({
        showPassword: false,
    });

    const handleChanges = (prop) => (event) => {
        setValues({ ...value, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const [company, setCompanycombo] = React.useState();
    const [year, setYearcombo] = React.useState();
    var firstLogin = "Y";
    const initialValues = {
        username: "",
        password: "",
        mailid: "",
        company: company,
        year: year,
        license: ""
    };
    const clear = async (values) => {
        setCompanycombo("");
        setYearcombo("");
    };
    const handleForgotPasswordRequest = async (values, resetForm) => {
        setLoading(true);
        try {
            const requestData = {
                UserName: values.username,
                UserEmailID: values.mailid,
                LicenseKey: values.license,
            };
            const result = await ForgotPasswordRequest(requestData)

            if (result?.Status === "Y") {
                toast.success(result.Msg || "OTP sent successfully!");
                resetForm();
                navigate('/Changepassword', {
                    state: {
                        userName: values.username,
                        userRecid: result.UserRecid,
                    },
                });
            } else {
                toast.error(result?.Msg || "Failed to send OTP.");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }

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
                <Grid container sx={{
                    height: "100vh",
                }}>
                    <Grid item sm={7} xs={12}>
                        <ContentBox
                            sx={{
                                mx: "auto",
                                width: "100%",
                                // maxWidth: { xs: "100%", sm: 500 },
                                // px: { xs: 3, sm: 8 },
                                // py: { xs: 4, sm: 8 },
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
                                    Forgot Password ?
                                </Typography>
                            </Box>
                            <Formik
                                initialValues={{
                                    username: "",
                                    mailid: "",
                                    license: "",
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.username) {
                                        errors.username = "Please enter the Username";
                                    }
                                    if (!values.mailid) {
                                        errors.mailid = "Please enter the Email ID";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mailid)
                                    ) {
                                        errors.mailid = "Please enter valid Email ID";
                                    }
                                    if (!values.license) {
                                        errors.license = "Please enter the Subscription Code";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    handleForgotPasswordRequest(values, resetForm);
                                }}
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
                                            spacing={2}
                                        >
                                            <StyledTextField
                                                name="username"
                                                label="Username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={touched.username && errors.username}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Box sx={{ color: "#999", fontSize: "20px" }}>#</Box>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <StyledTextField
                                                name="mailid"
                                                label="Email ID"
                                                value={values.mailid}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.mailid && Boolean(errors.mailid)}
                                                helperText={touched.mailid && errors.mailid}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Box sx={{ color: "#999", fontSize: "18px" }}>#</Box>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <StyledTextField
                                                name="license"
                                                label="Subscription Code"
                                                value={values.license}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.license && Boolean(errors.license)}
                                                helperText={touched.license && errors.license}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Box sx={{ color: "#999", fontSize: "20px" }}>#</Box>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            {/* <Box sx={{ flexGrow: 1 }} /> */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    mt: 1,
                                                }}
                                            >

                                                <Link
                                                    onClick={() => navigate(-1)}
                                                    sx={{
                                                        // color: "#00796b",
                                                        color: "warning",
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
                                                // color="success"
                                                loading={isLoading}
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 3 }}
                                            >
                                                SEND OTP
                                            </LoginButton>

                                            {/* <Button
                                                    variant="contained"
                                                    color="warning"

                                                    onClick={() => {
                                                        {
                                                            clear(values);
                                                        }
                                                        {
                                                            resetForm();
                                                        }
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

                        {/* <Box
                                  sx={{
                                    // background: "linear-gradient(93deg, #095070, #06869B)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    minHeight: "90vh",
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={background}
                                    sx={{
                                      minWidth: "95%",
                                      height: "100vh",
                                    }}
                                  />
                                </Box> */}

                    </Grid>
                </Grid>

            </Card>
        </JWTRoot >
    );
};

export default Forgetpassword_1;
