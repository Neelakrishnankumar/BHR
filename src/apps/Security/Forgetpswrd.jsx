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

const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
};

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
        // try {
        //   const requestData = {
        //     EmployeeCode: values.usercode,
        //     EmployeeEmailID: values.mailid,
        //     LicenseKey: values.license,
        //   };
        //    const result = await ForgotPasswordRequest(requestData);

        //   if (result?.Status === "Y") {
        //     toast.success(result.Msg || "OTP sent successfully!");
        //     resetForm();
        //     navigate('/#');
        //   } else {
        //     toast.error(result?.Msg || "Failed to send OTP.");
        //   }
        // } catch (error) {
        //   console.error('Error:', error);
        //   toast.error("Something went wrong. Please try again.");
        // } finally {
        //   setLoading(false);
        // }
        navigate('/Changepassword');
    };
    return (
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
                        // onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={basicSchema}
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
                                    component="form"
                                    height={{ sm: "450px", md: "343px" }}
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


                                    <Stack
                                        sx={{
                                            width: { sm: "100%", md: "100%", lg: "100%" },
                                        }}
                                        spacing={2.5}
                                    >
                                        <Typography variant="h6" align="center" fontWeight={600}>
                                            Forget Password
                                        </Typography>
                                        <FormControl sx={{ marginTop: "30px" }}>
                                            <TextField
                                                margin="normal"
                                                focused
                                                label="Username"
                                                id="username"
                                                value={values.username}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                onSubmit={handleSubmit}
                                                //  placeholder='Enter username'
                                                fullWidth
                                                required
                                                error={!!touched.username && !!errors.username}
                                                helperText={touched.username && errors.username}
                                            />
                                        </FormControl>

                                        <TextField
                                            label="Email ID"
                                            id="mailid"
                                            name="mailid"
                                            value={values.mailid}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.mailid && !!errors.mailid}
                                            helperText={touched.mailid && errors.mailid}
                                            fullWidth
                                            required
                                            focused
                                        />
                                        <TextField
                                            margin="normal"
                                            focused
                                            label="Subscription Code"
                                            id="license"
                                            value={values.license}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            onSubmit={handleSubmit}
                                            //  placeholder='Enter license'
                                            fullWidth
                                            required
                                            error={!!touched.license && !!errors.license}
                                            helperText={touched.license && errors.license}
                                        />
                                        {/* <Box sx={{ flexGrow: 1 }} /> */}
                                        <Stack direction={"row"} justifyContent="end" gap={"10px"} sx={{ marginTop: "50px" }}>

                                            <LoadingButton
                                                onClick={() => {
                                                    handleForgotPasswordRequest(values);
                                                }}
                                                color="success"
                                                loading={isLoading}
                                                variant="contained"
                                            >
                                                SEND OTP
                                            </LoadingButton>
                                            <Button
                                                variant="contained"
                                                color={"warning"}

                                                onClick={() => {
                                                    {
                                                        clear(values);
                                                    }
                                                    {
                                                        resetForm();
                                                    }
                                                }}
                                            >
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

export default Forgetpassword_1;
