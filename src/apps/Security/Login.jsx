// import React, { useState, useEffect } from "react";
// import {
//   Select,
//   Avatar,
//   Stack,
//   Grid,
//   Paper,
//   FormLabel,
//   TextField,
//   Button,
//   Autocomplete,
//   Box,
//   Link,
//   IconButton,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   FormHelperText,
//   FormGroup,
//   MenuItem,
//   Typography,
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
//   authentication,
//   fetchApidata,
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
//   height: "55px",
//   border: "2px solid #1769aa ",
//   borderRadius: "5px",
// };

// const Login = () => {
//   const navigate = useNavigate();
//   const Data = useSelector((state) => state.loginApi.Data);
//   const Status = useSelector((state) => state.loginApi.Status);
//   const Msg = useSelector((state) => state.loginApi.msg);
//   const isLoading = useSelector((state) => state.loginApi.loading);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const CompanyCombo = useSelector((state) => state.comboApi.company);
//   const YearCombo = useSelector((state) => state.comboApi.year);

//   React.useEffect(() => {
//     dispatch(fetchComboData1("TR014", "getall", "-1", "Company"));
//     dispatch(fetchComboData1("TR015", "getall", "-1", "Year"));
//   }, []);

//   const [value, setValues] = React.useState({
//     showPassword: false,
//   });

//   const handleChanges = (prop) => (event) => {
//     setValues({ ...value, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...value,
//       showPassword: !value.showPassword,
//     });
//   };

//   const [company, setCompanycombo] = React.useState();
//   const [year, setYearcombo] = React.useState();
//   // var firstLogin = "Y";
//   const initialValues = {
//     username: "",
//     password: "",
//     company: company,
//     year: year,
//     license: ""
//   };
//   const clear = async (values) => {
//     setCompanycombo("");
//     setYearcombo("");
//   };
// const fnLogin = async (values) => {
//   // setLoading(true);

//   // if (values.company == "" || values.company == undefined) {
//   //   toast.error("Please select company");
//   //   setLoading(false);
//   //   return;
//   // }
//   // console.log("firstLogin:", firstLogin);
//   // if (firstLogin == "Y") {
//   // navigate("/ChangeyourPassword_1", { state: { uname: values.username, license: values.license } });
//   // }
//   // else{
//   //   navigate("/Apps/HR")
//   // } 
//   if (values.username == "") {
//     // toast.error("UserName should not be empty");
//     toast.error("Username should not be empty");
//     setLoading(false);
//     return;
//   }
//   if (values.password == "") {
//     toast.error("Password shoud not be empty");
//     setLoading(false);
//     return;
//   }
//   if (values.license == "" || values.license == undefined) {
//     // toast.error("Please give LicenseKey");
//     toast.error("Please provide Subscription Code");
//     setLoading(false);
//     return;
//   }
//   const data = await dispatch(fetchApidata(values.username, values.password, values.license
//     //values.company,values.year

//   ));
//   // const idata = {
//   //   username: values.username,
//   //   password: values.password,
//   //   yearrecordid: values.year,
//   //   companyrecordid: values.company,
//   // };
//   // const data = await dispatch(authentication({ idata }));
//   console.log("🚀 ~ file: Login.jsx:126 ~ Login ~ data:", data);

//   //  var UserName = data.payload.apiResponse.Name

//   sessionStorage.setItem("loginRecid", loginrecordID);
//   if (data.payload.Status == "Y") {

//     var company = data.payload.apiResponse.Company
//     var SubscriptionCode = data.payload.SubscriptionCode
//     var year = data.payload.apiResponse.Year
//     var YearFlag = data.payload.apiResponse.YearFlag
//     var compID = data.payload.apiResponse.CompanyRecordid
//     var empID = data.payload.apiResponse.Recordid
//     var stockflag = data.payload.apiResponse.Process
//     var Cifbysea = data.payload.apiResponse.Cifbysea
//     var Cifbyair = data.payload.apiResponse.Cifbyair
//     var Fob = data.payload.apiResponse.Fob
//     //  var EmpId=data.payload.apiResponse.EmpId
//     var Overhead = data.payload.apiResponse.Overhead
//     var YearRecorid = data.payload.apiResponse.YearRecorid
//     var Groupaccess = data.payload.apiResponse.Groupaccess
//     var UserName = data.payload.apiResponse.Name
//     var loginrecordID = data.payload.apiResponse.Recordid
//     var Modules = data.payload.apiResponse.Modules
//     var UserName = data.payload.apiResponse.Name
//     var SubscriptionCode = data.payload.SubscriptionCode
//     var Expiryin = data.payload.Expiryin
//     var CompanyAutoCode = data.payload.CompanyAutoCode
//     var CompanyLogo = data.payload.CompanyLogo
//     var CompanyHeader = data.payload.CompanyHeader
//     var CompanyFooter = data.payload.CompanyFooter
//     var firstLogin = data.payload.firstLogin
//     //  var firstLogin = "Y";
//     console.log(CompanyAutoCode, "--login screen CompanyAutoCode");



//     sessionStorage.setItem("Expiryin", Expiryin);
//     sessionStorage.setItem("SubscriptionCode", SubscriptionCode);
//     sessionStorage.setItem("UserName", UserName);
//     sessionStorage.setItem("loginrecordID", loginrecordID);
//     sessionStorage.setItem("SubscriptionCode", SubscriptionCode);
//     sessionStorage.setItem("company", company);
//     sessionStorage.setItem("year", year);
//     sessionStorage.setItem("YearFlag", YearFlag);
//     sessionStorage.setItem("compID", compID);
//     sessionStorage.setItem("empID", empID);
//     sessionStorage.setItem("stockflag", stockflag);
//     sessionStorage.setItem("currentPage", 0);
//     sessionStorage.setItem("secondaryCurrentPage", 0);
//     sessionStorage.setItem("Cifbysea", Cifbysea)
//     sessionStorage.setItem("Cifbyair", Cifbyair)
//     sessionStorage.setItem("Fob", Fob)
//     sessionStorage.setItem("firstLogin", firstLogin)
//     sessionStorage.setItem("CompanyAutoCode", CompanyAutoCode)
//     sessionStorage.setItem("CompanyLogo", CompanyLogo)
//     sessionStorage.setItem("CompanyHeader", CompanyHeader)
//     sessionStorage.setItem("CompanyFooter", CompanyFooter)
//     sessionStorage.setItem("Overhead", Overhead)
//     sessionStorage.setItem("YearRecorid", YearRecorid)
//     sessionStorage.setItem("Groupaccess", JSON.stringify(Groupaccess))
//     sessionStorage.setItem("Modules", JSON.stringify(Modules))

//     navigate("/Apps/HR");
//     console.log("firstLogin:", firstLogin);
//     if (firstLogin == "Y") {
//       navigate("/Apps/ChangeyourPassword_1", { state: { uname: values.username, license: values.license } });
//       // navigate("/Apps/HR")
//     }
//     else {
//       navigate("/Apps/HR")
//     }
//   }
//   else {
//     if (data.payload.subscription == 0) {
//       navigate("/SubscriptionScreen", { state: { subCode: values.license } });
//     }
//     setLoading(false);
//     toast.error(data.payload.Msg);
//   }
// };
//   return (
//     <div className="wrapper">
//       <Box display={"table"} height="99vh" width="100%">
//         <IconButton sx={{ position: "absolute", right: "20px" }} color={"info"}>
//           <HelpOutlineOutlinedIcon />
//         </IconButton>
//         <Grid
//           container
//           sx={{ display: "table-cell", verticalAlign: "middle" }}
//           rowSpacing={5}
//           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//         >
//           <Formik
//             // onSubmit={handleFormSubmit}
//             initialValues={{
//               username: "",
//               password: "",
//               license: "",
//             }}

//             validate={(values) => {
//               const errors = {};

//               // Username validation
//               if (!values.username) {
//                 errors.username = "Please enter Username";
//               }

//               // Password validation
//               if (!values.password) {
//                 errors.password = "Please enter Password";
//               }
//               // else if (
//               //   !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(values.password)
//               // ) {
//               //   errors.password =
//               //     "Password must contain uppercase, number & special character";
//               // }

//               // License validation
//               if (!values.license) {
//                 errors.license = "Please enter Subscription Code";
//               }

//               return errors;
//             }}

//             onSubmit={(values, { resetForm }) => {
//               fnLogin(values, resetForm);
//             }}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               handleSubmit,
//               resetForm,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Stack

//                   height={{ sm: "450px", md: "100%" }}
//                   width={{ sm: "291px", md: "700px" }}
//                   sx={{
//                     boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                     borderRadius: "10px",
//                     backgroundColor: "white",
//                     padding: "15px",
//                     margin: "20px auto",
//                   }}
//                   spacing={{ sm: 4, md: 2 }}
//                   autoComplete="off"
//                   direction={{ sm: "column", md: "row" }}
//                 >
//                   <Stack
//                     sx={{
//                       width: { sm: "100%", md: "100%", lg: "100%" },
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignContent: "center",
//                       justifyContent: "flexend",
//                       alignItems: "center",
//                       backgroundImage: `url(${background})`,
//                       backgroundRepeat: "no-repeat",
//                       backgroundPosition: "center",
//                       backgroundSize: "75%",
//                       padding: 1,
//                       borderRadius: "5px",
//                       height: "350px",
//                       // height: { sm: "300px", md: "350px" },
//                       // marginBottom: "50px",
//                       marginTop: "-30px",
//                       flexDirection: "column-reverse",
//                     }}
//                     spacing={2}

//                   >
//                     <Typography
//                       variant="p" 
//                       sx={{
//                         marginBottom: { sm: 3, md: 8 },
//                         // marginRight: 2,
//                         fontSize:"13px",
//                         textAlign: "center",
//                         // fontWeight: "bold",  
//                         // color:"#f1af3f",
//                         // color:"#ed9d12",
//                         // color:"#76ade4",
//                       }}
//                     >

//                       Version 1.0
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: "600",
//                         marginTop: 2,
//                         // marginRight: 2,
//                         textAlign: "center",
//                       }}
//                     >
//                       {/* ATM<br /> */}
//                       Back Office System
//                     </Typography>
//                   </Stack>


//                   <Stack
//                     sx={{
//                       width: { sm: "100%", md: "100%", lg: "100%" },
//                     }}
//                     spacing={2.5}
//                   >
//                     <FormControl sx={{ marginTop: "30px" }}>
//                       <TextField
//                         margin="normal"
//                         focused
//                         name="username"
//                         label="Username"
//                         id="username"
//                         value={values.username}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         onSubmit={handleSubmit}
//                         //  placeholder='Enter username'
//                         fullWidth
//                         error={!!touched.username && !!errors.username}
//                         helperText={touched.username && errors.username}
//                       />
//                     </FormControl>

//                     <FormControl
//                       focused
//                       margin="normal"
//                       fullWidth
//                       error={!!touched.password && !!errors.password}
//                     >
//                       <InputLabel>Password</InputLabel>

//                       <OutlinedInput
//                         id="password"
//                         name="password"
//                         type={value.showPassword ? "text" : "password"}
//                         value={values.password}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton onClick={handleClickShowPassword} edge="end">
//                               {value.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         label="Password"
//                       />

//                       {/* ✅ EXACT ERROR TEXT */}
//                       {touched.password && errors.password && (
//                         <Typography
//                           variant="caption"
//                           color="error"
//                           sx={{ ml: "14px", mt: "4px" }}
//                         >
//                           {errors.password}
//                         </Typography>
//                       )}
//                     </FormControl>

//                     <TextField
//                       margin="normal"
//                       focused
//                       label="Subscription Code"
//                       name="license"
//                       id="license"
//                       value={values.license}
//                       onBlur={handleBlur}
//                       onChange={handleChange}
//                       onSubmit={handleSubmit}
//                       //  placeholder='Enter license'
//                       fullWidth
//                       error={!!touched.license && !!errors.license}
//                       helperText={touched.license && errors.license}
//                     />
//                     {/* <Box sx={{ flexGrow: 1 }} /> */}
//                     <Stack direction={"row"} justifyContent="end" gap={"10px"} sx={{ marginTop: "50px" }}>
//                       <Typography
//                         variant="body2"
//                         color="primary"
//                         sx={{ cursor: "pointer", textDecoration: "underline", marginTop: "5px", marginRight: "25px" }}
//                         onClick={() => navigate("/Forgotpassword")}
//                       >
//                         Forgot Password?
//                       </Typography>
//                       <LoadingButton
//                         type="submit"
//                         color="success"
//                         loading={isLoading}
//                         variant="contained"
//                       >
//                         Login
//                       </LoadingButton>
//                       <Button
//                         variant="contained"
//                         color={"warning"}

//                         onClick={() => {
//                           {
//                             clear(values);
//                           }
//                           {
//                             resetForm();
//                           }
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </form>
//             )}
//           </Formik>
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default Login;
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Button,
  Box,
  Link,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchApidata } from "../../store/reducers/LoginReducer";
import { toast } from "react-hot-toast";
// import background from "../../assets/img/Back_Office_Final.png";
import background from "../../assets/img/Back_Office_Final2.png";

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loginApi.loading);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    username: "",
    password: "",
    license: "",
    remember: false,
  };

  const fnLogin = async (values) => {
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
      var CompanyGraceTime = data.payload.CompanyGraceTime
      var CompanySessionTimeOut = data.payload.CompanySessionTimeOut
      var CompanyLogo = data.payload.CompanyLogo
      var CompanyHeader = data.payload.CompanyHeader
      var CompanyFooter = data.payload.CompanyFooter
      var firstLogin = data.payload.firstLogin
      var CompanySignature = data.payload.CompanySignature
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
      sessionStorage.setItem("CompanyGraceTime", CompanyGraceTime)
      sessionStorage.setItem("CompanySessionTimeOut", CompanySessionTimeOut)
      sessionStorage.setItem("CompanyLogo", CompanyLogo)
      sessionStorage.setItem("CompanyHeader", CompanyHeader)
      sessionStorage.setItem("CompanyFooter", CompanyFooter)
      sessionStorage.setItem("Overhead", Overhead)
      sessionStorage.setItem("YearRecorid", YearRecorid)
      sessionStorage.setItem("CompanySignature", CompanySignature)
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
    <JWTRoot>
      <Card
        className="card"
        sx={{
          width: "100%",
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: { xs: 0, sm: 3 },

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

          {/* Left Side: Login Form */}
          <Grid item sm={8} xs={12}>
            <ContentBox
              sx={{
                mx: "auto",
                width: "100%",
                // maxWidth: { xs: "100%", sm: 500 },
                // px: { xs: 3, sm: 8 },
                // py: { xs: 4, sm: 8 },
                maxWidth: { xs: "95%", sm: 500 },
                px: { xs: 2, sm: 6 },
                py: { xs: 4, sm: 6 },
                backgroundColor: "#ffffff",
                // ✅ Transparent on xs so background shows
                backgroundColor: {
                  xs: "rgba(255,255,255,0.85)",
                  sm: "#ffffff",
                },
                backdropFilter: {
                  xs: "blur(10px)",
                  sm: "none",
                },
              }}
            >
              {/* Header */}
              <Box mb={5}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "30px", sm: "40px" },
                    fontWeight: 600,
                    mb: 0.5,

                    // background: "linear-gradient(180deg, rgba(10,64,99,1) 53%, rgba(6,128,150,1) 100%)",
                    background: "linear-gradient(180deg,rgba(10, 64, 99, 1) 37%, rgba(6, 128, 150, 1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textAlign: "center"
                  }}
                >
                  Login to your Account
                </Typography>
              </Box>

              {/* Form */}
              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = "Please enter Username";
                  }
                  if (!values.password) {
                    errors.password = "Please enter Password";
                  }
                  if (!values.license) {
                    errors.license = "Please enter Subscription Code";
                  }
                  return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                  fnLogin(values);
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
                    <Stack spacing={3}>
                      {/* Username Field */}
                      <StyledTextField
                        name="username"
                        label="Username"
                        id="username"
                        placeholder="Username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        error={!!touched.username && !!errors.username}
                        helperText={touched.username && errors.username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "20px" }}>#</Box>
                            </InputAdornment>
                          ),
                        }}
                      // focused
                      />

                      {/* Password Field */}
                      {/* <FormControl
                        fullWidth
                        error={!!touched.password && !!errors.password}
                      >
                        <InputLabel
                          sx={{
                            color: "#666",
                            "&.Mui-focused": { color: "#00796b" },
                          }}
                        >
                          Password
                        </InputLabel>
                        <StyledOutlinedInput
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          startAdornment={
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "18px" }}>🔒</Box>
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                sx={{ color: "#999" }}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          focused
                        />
                        {touched.password && errors.password && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ ml: "14px", mt: "4px" }}
                          >
                            {errors.password}
                          </Typography>
                        )}
                      </FormControl> */}
                      <StyledTextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "18px" }}>🔒</Box>
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      // focused
                      />

                      {/* Subscription Code Field */}
                      <StyledTextField
                        name="license"
                        label="Subscription Code"
                        id="license"
                        placeholder="Subscription Code"
                        value={values.license}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        error={!!touched.license && !!errors.license}
                        helperText={touched.license && errors.license}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box sx={{ color: "#999", fontSize: "20px" }}>#</Box>
                            </InputAdornment>
                          ),
                        }}
                      // focused
                      />

                      {/* Remember Me & Forgot Password */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="remember"
                              checked={values.remember}
                              onChange={handleChange}
                              sx={{
                                color: "#00796b",
                                "&.Mui-checked": {
                                  color: "#00796b",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: "#666", fontSize: "14px" }}>
                              Remember me
                            </Typography>
                          }
                        />
                        <Link
                          onClick={() => navigate("/Forgotpassword")}
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
                          Forget Password?
                        </Link>
                      </Box>

                      {/* Login Button */}
                      <LoginButton
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                      >
                        Login
                      </LoginButton>
                    </Stack>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
          {/* Right Side: Image */}
          <Grid
            item
            sm={4}
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

export default Login;