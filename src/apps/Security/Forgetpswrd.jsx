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
    ForgotPasswordRequest,
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
                            username: "",
                            mailid: "",
                            license: "",
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.username) {
                                errors.username = "Please Enter Username";
                            }
                            if (!values.mailid) {
                                errors.mailid = "Please Enter Mailid";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mailid)
                            ) {
                                errors.mailid = "Please enter valid Email ID";
                            }
                            if (!values.license) {
                                errors.license = "Please Enter Subscription Code";
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
                                                name="username"
                                                label="Username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={touched.username && errors.username}
                                                fullWidth
                                            />
                                        </FormControl>

                                        <TextField
                                            name="mailid"
                                            label="Email ID"
                                            value={values.mailid}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.mailid && Boolean(errors.mailid)}
                                            helperText={touched.mailid && errors.mailid}
                                            fullWidth
                                        />

                                        <TextField
                                            name="license"
                                            label="Subscription Code"
                                            value={values.license}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.license && Boolean(errors.license)}
                                            helperText={touched.license && errors.license}
                                            fullWidth
                                        />

                                        {/* <Box sx={{ flexGrow: 1 }} /> */}
                                        <Stack direction={"row"} justifyContent="end" gap={"10px"} sx={{ marginTop: "50px" }}>

                                            <LoadingButton
                                                type="submit"
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
