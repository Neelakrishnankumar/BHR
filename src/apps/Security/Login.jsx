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

const Login = () => {
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
  // var firstLogin = "Y";
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
  const fnLogin = async (values) => {
    // setLoading(true);

    // if (values.company == "" || values.company == undefined) {
    //   toast.error("Please select company");
    //   setLoading(false);
    //   return;
    // }
    // console.log("firstLogin:", firstLogin);
    // if (firstLogin == "Y") {
    // navigate("/ChangeyourPassword_1", { state: { uname: values.username, license: values.license } });
    // }
    // else{
    //   navigate("/Apps/HR")
    // } 
    if (values.username == "") {
      // toast.error("UserName should not be empty");
      toast.error("Username should not be empty");
      setLoading(false);
      return;
    }
    if (values.password == "") {
      toast.error("Password shoud not be empty");
      setLoading(false);
      return;
    }
    if (values.license == "" || values.license == undefined) {
      // toast.error("Please give LicenseKey");
      toast.error("Please provide Subscription Code");
      setLoading(false);
      return;
    }
    const data = await dispatch(fetchApidata(values.username, values.password, values.license
      //values.company,values.year

    ));
    // const idata = {
    //   username: values.username,
    //   password: values.password,
    //   yearrecordid: values.year,
    //   companyrecordid: values.company,
    // };
    // const data = await dispatch(authentication({ idata }));
    console.log("🚀 ~ file: Login.jsx:126 ~ Login ~ data:", data);

    //  var UserName = data.payload.apiResponse.Name

    sessionStorage.setItem("loginRecid", loginrecordID);
    if (data.payload.Status == "Y") {

      var company = data.payload.apiResponse.Company
      var SubscriptionCode = data.payload.SubscriptionCode
      var year = data.payload.apiResponse.Year
      var YearFlag = data.payload.apiResponse.YearFlag
      var compID = data.payload.apiResponse.CompanyRecordid
      var empID = data.payload.apiResponse.Recordid
      var stockflag = data.payload.apiResponse.Process
      var Cifbysea = data.payload.apiResponse.Cifbysea
      var Cifbyair = data.payload.apiResponse.Cifbyair
      var Fob = data.payload.apiResponse.Fob
      //  var EmpId=data.payload.apiResponse.EmpId
      var Overhead = data.payload.apiResponse.Overhead
      var YearRecorid = data.payload.apiResponse.YearRecorid
      var Groupaccess = data.payload.apiResponse.Groupaccess
      var UserName = data.payload.apiResponse.Name
      var loginrecordID = data.payload.apiResponse.Recordid
      var Modules = data.payload.apiResponse.Modules
      var UserName = data.payload.apiResponse.Name
      var SubscriptionCode = data.payload.SubscriptionCode
      var Expiryin = data.payload.Expiryin
      var CompanyAutoCode = data.payload.CompanyAutoCode
      var CompanyLogo = data.payload.CompanyLogo
      var CompanyHeader = data.payload.CompanyHeader
      var CompanyFooter = data.payload.CompanyFooter
      var firstLogin = data.payload.firstLogin
      //  var firstLogin = "Y";
      console.log(CompanyAutoCode, "--login screen CompanyAutoCode");
     


      sessionStorage.setItem("Expiryin", Expiryin);
      sessionStorage.setItem("SubscriptionCode", SubscriptionCode);
      sessionStorage.setItem("UserName", UserName);
      sessionStorage.setItem("loginrecordID", loginrecordID);
      sessionStorage.setItem("SubscriptionCode", SubscriptionCode);
      sessionStorage.setItem("company", company);
      sessionStorage.setItem("year", year);
      sessionStorage.setItem("YearFlag", YearFlag);
      sessionStorage.setItem("compID", compID);
      sessionStorage.setItem("empID", empID);
      sessionStorage.setItem("stockflag", stockflag);
      sessionStorage.setItem("currentPage", 0);
      sessionStorage.setItem("secondaryCurrentPage", 0);
      sessionStorage.setItem("Cifbysea", Cifbysea)
      sessionStorage.setItem("Cifbyair", Cifbyair)
      sessionStorage.setItem("Fob", Fob)
      sessionStorage.setItem("firstLogin", firstLogin)
      sessionStorage.setItem("CompanyAutoCode", CompanyAutoCode)
      sessionStorage.setItem("CompanyLogo", CompanyLogo)
      sessionStorage.setItem("CompanyHeader", CompanyHeader)
      sessionStorage.setItem("CompanyFooter", CompanyFooter)
      sessionStorage.setItem("Overhead", Overhead)
      sessionStorage.setItem("YearRecorid", YearRecorid)
      sessionStorage.setItem("Groupaccess", JSON.stringify(Groupaccess))
      sessionStorage.setItem("Modules", JSON.stringify(Modules))
      
      navigate("/Apps/HR");
      console.log("firstLogin:", firstLogin);
      if (firstLogin == "Y") {
        navigate("/Apps/ChangeyourPassword_1", { state: { uname: values.username, license: values.license } });
        // navigate("/Apps/HR")
      }
      else {
        navigate("/Apps/HR")
      }
    }
    else {
      if (data.payload.subscription == 0) {
        navigate("/SubscriptionScreen", { state: { subCode: values.license } });
      }
      setLoading(false);
      toast.error(data.payload.Msg);
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
            // onSubmit={handleFormSubmit}
            initialValues={{
              username: "",
              password: "",
              license: "",
            }}

            validate={(values) => {
              const errors = {};

              // Username validation
              if (!values.username) {
                errors.username = "Please enter Username";
              }

              // Password validation
              if (!values.password) {
                errors.password = "Please enter Password";
              }
              // else if (
              //   !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(values.password)
              // ) {
              //   errors.password =
              //     "Password must contain uppercase, number & special character";
              // }

              // License validation
              if (!values.license) {
                errors.license = "Please enter Subscription Code";
              }

              return errors;
            }}

            onSubmit={(values, { resetForm }) => {
              fnLogin(values, resetForm);
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
                      // height: { sm: "300px", md: "350px" },
                      // marginBottom: "50px",
                      marginTop: "-30px",
                      flexDirection: "column-reverse",
                    }}
                    spacing={2}

                  >
                    <Typography
                      variant="p" 
                      sx={{
                        marginBottom: { sm: 3, md: 8 },
                        // marginRight: 2,
                        fontSize:"13px",
                        textAlign: "center",
                        // fontWeight: "bold",  
                        // color:"#f1af3f",
                        // color:"#ed9d12",
                        // color:"#76ade4",
                      }}
                    >

                      Version 1.0
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        marginTop: 2,
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
                    <FormControl sx={{ marginTop: "30px" }}>
                      <TextField
                        margin="normal"
                        focused
                        name="username"
                        label="Username"
                        id="username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        //  placeholder='Enter username'
                        fullWidth
                        error={!!touched.username && !!errors.username}
                        helperText={touched.username && errors.username}
                      />
                    </FormControl>

                    <FormControl
                      focused
                      margin="normal"
                      fullWidth
                      error={!!touched.password && !!errors.password}
                    >
                      <InputLabel>Password</InputLabel>

                      <OutlinedInput
                        id="password"
                        name="password"
                        type={value.showPassword ? "text" : "password"}
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                              {value.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />

                      {/* ✅ EXACT ERROR TEXT */}
                      {touched.password && errors.password && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ ml: "14px", mt: "4px" }}
                        >
                          {errors.password}
                        </Typography>
                      )}
                    </FormControl>

                    <TextField
                      margin="normal"
                      focused
                      label="Subscription Code"
                      name="license"
                      id="license"
                      value={values.license}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      //  placeholder='Enter license'
                      fullWidth
                      error={!!touched.license && !!errors.license}
                      helperText={touched.license && errors.license}
                    />
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <Stack direction={"row"} justifyContent="end" gap={"10px"} sx={{ marginTop: "50px" }}>
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: "pointer", textDecoration: "underline", marginTop: "5px", marginRight: "25px" }}
                        onClick={() => navigate("/Forgotpassword")}
                      >
                        Forgot Password?
                      </Typography>
                      <LoadingButton
                        type="submit"
                        color="success"
                        loading={isLoading}
                        variant="contained"
                      >
                        Login
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

export default Login;
