// Single login page for every product (HR, School/Admin ...).
// Which design, image and texts are shown is decided by resolveBrand():
//   1) REACT_APP_TARGET from the .env.<target> file   (npm run start:<target> / build:<target>)
//   2) otherwise the subdomain of the browser URL matched against SUBDOMAIN_BRAND
//   3) otherwise DEFAULT_BRAND
import {
  Stack,
  Grid,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApidata } from "../../store/reducers/LoginReducer";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import "../../index.css";

import bexAtmLogo from "../../assets/img/BexATM.png";
import adminFullBg from "../../assets/img/Adminfullimg.png";
import bosCoverBg from "../../assets/img/BOS_Coverimg2.png";

// ---------- PER-BRAND LOGIN SETTINGS ----------
//   layout: "split"  -> login form on the left, cover image on the right (HR / BOS)
//           "portal" -> full background image + floating sign-in card (School / Admin)
const LOGIN_BRANDS = {
  hr: {
    layout: "split",
    image: bosCoverBg,
    rememberMe: true,
  },
  school: {
    layout: "portal",
    image: adminFullBg,
    logo: bexAtmLogo,
    portalName: "Admin Portal",
    tagline: ["Streamline operations. Manage users.", "Empower your institution."],
    rememberMe: true,
    trust: [
      { Icon: ShieldOutlinedIcon, color: "#14C6B8", title: "Secure & Private", subtitle: "Your data is safe with us" },
      { Icon: GroupsOutlinedIcon, color: "#2F6FED", title: "Role-Based Access", subtitle: "Built for your team" },
      { Icon: AccessTimeOutlinedIcon, color: "#2F6FED", title: "Real-time Updates", subtitle: "Stay informed, always" },
    ],
  },
};

const DEFAULT_BRAND = "hr";

// 1) REACT_APP_TARGET (from .env.<target>)  ->  brand
const TARGET_BRAND = {
  admin: "school",   // .BOS_ADMIN  -> Admin Portal design
  bosuat: "hr",      // .BOS_UAT    -> Back Office System design
  boslive: "hr",     // .BOS_LIVE   -> Back Office System design
};

// 2) First part of the URL host (subdomain)  ->  brand
//    admin.bexschools.com -> "admin", bosuat.bexschools.com -> "bosuat", bos.beyondexs.com -> "bos"
const SUBDOMAIN_BRAND = {
  admin: "school",
  bosuat: "hr",
  bos: "hr",
};

const resolveBrand = () => {
  const target = (process.env.REACT_APP_TARGET || "").toLowerCase();
  const byTarget = TARGET_BRAND[target] || (LOGIN_BRANDS[target] ? target : null);
  if (byTarget) return LOGIN_BRANDS[byTarget];

  const subdomain = (window.location.hostname || "").toLowerCase().split(".")[0];
  const bySubdomain = SUBDOMAIN_BRAND[subdomain];
  return LOGIN_BRANDS[bySubdomain] || LOGIN_BRANDS[DEFAULT_BRAND];
};

const brand = resolveBrand();

// ---------- STYLED PIECES ----------
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
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      boxShadow: "none",
      borderRadius: 0,
      minHeight: "90vh",
    },
  },
}));

// HR (split layout) field + button styling
const HrTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f5f9fa",
    borderRadius: "8px",
    "& fieldset": { borderColor: "#e0e0e0" },
    "&:hover fieldset": { borderColor: "#00796b" },
    "&.Mui-focused fieldset": { borderColor: "#00796b" },
  },
  "& .MuiInputLabel-root": { color: "#666" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00796b" },
}));

const HrLoginButton = styled(LoadingButton)(() => ({
  background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
  color: "#ffffff",
  padding: "12px 0",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    background: "radial-gradient(circle, rgba(10, 64, 99, 1) 40%, rgba(6, 128, 150, 1) 100%)",
  },
  "& .MuiCircularProgress-root": { color: "#ffffff" },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    "& fieldset": { borderColor: "#e2e5ea" },
    "&:hover fieldset": { borderColor: "#2F6FED" },
    "&.Mui-focused fieldset": { borderColor: "#2F6FED" },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#a7aebb",
    opacity: 1,
  },
}));

const LoginButton = styled(LoadingButton)(() => ({
  background: "linear-gradient(90deg, #14C6B8 0%, #2F6FED 100%)",
  color: "#ffffff",
  padding: "12px 0",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  gap: "8px",
  "&:hover": {
    background: "linear-gradient(90deg, #10AFA3 0%, #2A63D9 100%)",
  },
  "& .MuiCircularProgress-root": {
    color: "#ffffff",
  },
}));

const FieldLabel = ({ children }) => (
  <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#1B2559", mb: 0.75 }}>
    {children}
  </Typography>
);

const TrustItem = ({ Icon, color, title, subtitle }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.4, flex: 1 }}>
    <Box sx={{ color, display: "flex" }}>
      <Icon fontSize="small" />
    </Box>
    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#1B2559", textAlign: "center", lineHeight: 1.3 }}>
      {title}
    </Typography>
    <Typography sx={{ fontSize: "10px", color: "#9aa5b1", textAlign: "center", lineHeight: 1.2 }}>
      {subtitle}
    </Typography>
  </Box>
);

const validate = (values) => {
  const errors = {};
  if (!values.username) errors.username = "Please enter the Username";
  if (!values.password) errors.password = "Please enter the Password";
  if (!values.license) errors.license = "Please enter the Subscription Code";
  return errors;
};

// ---------- COMPONENT ----------
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loginApi.loading);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formikRef = useRef();

  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    license: "",
    remember: false,
  });

  // "Remember me" only for brands that show the checkbox
  useEffect(() => {
    if (!brand.rememberMe) return;
    try {
      const rememberedData = localStorage.getItem("rememberMeData");
      if (rememberedData) {
        const parsed = JSON.parse(rememberedData);
        setInitialValues({
          username: parsed.username || "",
          password: parsed.password || "",
          license: parsed.license || "",
          remember: true,
        });
      }
    } catch (e) {
      localStorage.removeItem("rememberMeData");
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const fnLogin = async (values) => {
    try {
      setLoading(true);
      const data = await dispatch(
        fetchApidata(values.username, values.password, values.license)
      );
      const p = data.payload;

      if (p.Status === "Y") {
        const a = p.apiResponse;

        if (brand.rememberMe) {
          if (values.remember) {
            localStorage.setItem(
              "rememberMeData",
              JSON.stringify({
                username: values.username,
                password: values.password,
                license: values.license,
                remember: true,
              })
            );
          } else {
            localStorage.removeItem("rememberMeData");
            setInitialValues({ username: "", password: "", license: "", remember: false });
          }
        }

        // plain values (null / undefined are stored as "")
        const plain = {
          Expiryin: p.Expiryin,
          SubscriptionCode: p.SubscriptionCode,
          SubscriptionID: p.SubscriptionID,
          VerticalLicense: p.VerticalLicense,
          UserName: a.Name,
          loginRecid: a.Recordid,
          loginrecordID: a.Recordid,
          company: a.Company,
          year: a.Year,
          YearFlag: a.YearFlag,
          compID: a.CompanyRecordid,
          empID: a.Recordid,
          stockflag: a.Process,
          Cifbysea: a.Cifbysea,
          Cifbyair: a.Cifbyair,
          Fob: a.Fob,
          Overhead: a.Overhead,
          YearRecorid: a.YearRecorid,
          firstLogin: p.firstLogin,
          CompanyAutoCode: p.CompanyAutoCode,
          CompanyCode: p.CompanyCode,
          companygroupflag: p.companygroupflag,
          CompanyGraceTime: p.CompanyGraceTime,
          CompanySessionTimeOut: p.CompanySessionTimeOut,
          CompanyLogo: p.CompanyLogo,
          CompanyHeader: p.CompanyHeader,
          CompanyFooter: p.CompanyFooter,
          CompanySignature: p.CompanySignature,
          currentPage: 0,
          secondaryCurrentPage: 0,
        };
        Object.entries(plain).forEach(([key, val]) =>
          sessionStorage.setItem(key, val ?? "")
        );

        // JSON values
        const json = {
          companygroup: p.companygroup,
          ClassificationData: p.ClassificationData,
          Groupaccess: a.Groupaccess,
          BirthdayAnniversary: a.BirthdayAnniversary,
          Modules: a.Modules,
        };
        Object.entries(json).forEach(([key, val]) =>
          sessionStorage.setItem(key, JSON.stringify(val))
        );

        setLoading(false);
        if (p.firstLogin === "Y") {
          navigate("/Apps/ChangeyourPassword_1", {
            state: { uname: values.username, license: values.license },
          });
        } else {
          navigate("/Apps/HR");
        }
      } else {
        if (p.subscription === 0) {
          navigate("/SubscriptionScreen", { state: { subCode: values.license } });
        }
        toast.error(p?.Msg || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const busy = loading || isLoading;

  // ---------- LAYOUT: PORTAL (full background + floating card) ----------
  const renderPortal = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
    <JWTRoot>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          height: { xs: "auto", md: "100vh" },
          overflowY: { xs: "auto", md: "hidden" },
          overflowX: "hidden",
          backgroundImage: `url(${brand.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "center", md: "flex-end" },
          px: { xs: 1.5, sm: 3, md: 6, lg: 10 },
          py: { xs: 3, md: 0 },
        }}
      >
        {/* Logo + branding (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            position: "absolute",
            top: { md: 15, lg: 15 },
            left: { md: 30, lg: 56 },
            maxWidth: 480,
          }}
        >
          <Box
            component="img"
            src={brand.logo}
            alt="Logo"
            sx={{ height: 100, width: "auto", objectFit: "contain", mb: 1.5 }}
          />
          <Typography sx={{ fontSize: { md: "18px", lg: "20px" }, fontWeight: 600, color: "#1B2559", mb: 0.5 }}>
            Welcome to
          </Typography>
          <Typography sx={{ fontSize: { md: "40px", lg: "48px" }, fontWeight: 800, color: "#1B2559", lineHeight: 1.1, mb: 0.5 }}>
            {brand.portalName}
          </Typography>
          <Box sx={{ width: 56, height: 4, borderRadius: "2px", backgroundColor: "#2F6FED", mb: 0.5 }} />
          <Typography sx={{ fontSize: { md: "15px", lg: "16px" }, color: "#1c2b47", lineHeight: 1.6, fontWeight: 550 }}>
            {brand.tagline[0]}
            <br />
            {brand.tagline[1]}
          </Typography>
        </Box>

        {/* Floating sign-in card */}
        <ContentBox
          sx={{
            width: "100%",
            maxWidth: { xs: 380, sm: 400, md: 420, lg: 440 },
            height: "auto",
            minHeight: "unset",
            alignSelf: "center",
            flexGrow: 0,
            backgroundColor: "#ffffff",
            borderRadius: { xs: "18px", sm: "24px" },
            boxShadow: "0px 25px 60px rgba(15, 23, 42, 0.28)",
            p: { xs: 2, sm: 3, md: 3.5 },
            mx: { xs: 0, md: 3 },
          }}
        >
          <Box mb={2.5} textAlign="center">
            <Typography sx={{ fontSize: { xs: "18px", sm: "22px", md: "23px" }, fontWeight: 700, color: "#1B2559" }}>
              Sign in to your account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={1.5}>
              <Box>
                <FieldLabel>Username</FieldLabel>
                <StyledTextField
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon sx={{ color: "#9aa5b1", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <FieldLabel>Password</FieldLabel>
                <StyledTextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#9aa5b1", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#9aa5b1" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#9aa5b1" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { paddingRight: "14px", paddingLeft: "7px" },
                  }}
                />
              </Box>

              <Box>
                <FieldLabel>Subscription Code</FieldLabel>
                <StyledTextField
                  name="license"
                  id="license"
                  placeholder="Enter your subscription code"
                  value={values.license}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={!!touched.license && !!errors.license}
                  helperText={touched.license && errors.license}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberOutlinedIcon sx={{ color: "#9aa5b1", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  rowGap: 0.5,
                  mt: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      checked={values.remember}
                      onChange={handleChange}
                      sx={{ color: "#c4c9d4", "&.Mui-checked": { color: "#2F6FED" } }}
                    />
                  }
                  label={<Typography sx={{ color: "#666", fontSize: "14px" }}>Remember me</Typography>}
                />
                <Link
                  onClick={() => navigate("/Forgotpassword")}
                  sx={{
                    color: "#2F6FED",
                    fontSize: "14px",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forget Password?
                </Link>
              </Box>

              <LoginButton
                type="submit"
                loading={busy}
                variant="contained"
                fullWidth
                startIcon={!busy ? <LockOutlinedIcon sx={{ fontSize: "18px" }} /> : null}
                sx={{
                  mt: 1.5,
                  borderRadius: "10px",
                  py: 1,
                  background: "linear-gradient(90deg, #14B8A6 0%, #2563EB 100%)",
                  boxShadow: "0px 10px 20px rgba(37, 99, 235, 0.25)",
                  "&:hover": { background: "linear-gradient(90deg, #0F9C8C 0%, #1D4ED8 100%)" },
                }}
              >
                Sign In
              </LoginButton>
            </Stack>
          </form>

          {/* Trust badges */}
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              alignItems: "center",
              justifyContent: { xs: "center", sm: "space-between" },
              gap: { xs: 1.5, sm: 0 },
              mt: 2,
              pt: 2,
              borderTop: "1px solid #eef1f4",
            }}
          >
            {brand.trust.map((item, i) => (
              <React.Fragment key={item.title}>
                {i > 0 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 1, display: { xs: "none", sm: "block" } }}
                  />
                )}
                <Box
                  sx={{
                    flex: {
                      xs: i === brand.trust.length - 1 ? "1 1 100%" : "1 1 45%",
                      sm: "1 1 0",
                    },
                    minWidth: 0,
                  }}
                >
                  <TrustItem {...item} />
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </ContentBox>
      </Box>
    </JWTRoot>
  );

  // ---------- LAYOUT: SPLIT (form left, cover image right) ----------
  const renderSplit = ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
    <JWTRoot>
      <Card
        className="card"
        sx={{
          width: "100%",
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: 0,
          backgroundImage: { xs: `url(${brand.image})`, sm: "none" },
          backgroundSize: { xs: "cover", sm: "unset" },
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Grid container sx={{ height: "100vh" }}>
          {/* Left side: login form */}
          <Grid item sm={7} xs={12}>
            <ContentBox
              sx={{
                mx: "auto",
                width: "100%",
                maxWidth: { xs: "95%", sm: 420 },
                paddingRight: { xs: 2, sm: 6 },
                paddingLeft: { xs: 1, sm: 6 },
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: { xs: "rgba(255,255,255,0.85)", sm: "#ffffff" },
                backdropFilter: { xs: "blur(15px)", sm: "none" },
              }}
            >
              <Box mb={3}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "20px", sm: "30px" },
                    fontWeight: 600,
                    background: "linear-gradient(180deg,rgba(10, 64, 99, 1) 37%, rgba(6, 128, 150, 1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textAlign: "center",
                  }}
                >
                  Login to your Account
                </Typography>
              </Box>

              <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                  <HrTextField
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
                  />

                  <HrTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
                      sx: { paddingRight: "14px", paddingLeft: "7px" },
                    }}
                  />

                  <HrTextField
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
                  />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember"
                          checked={values.remember}
                          onChange={handleChange}
                          sx={{ color: "#00796b", "&.Mui-checked": { color: "#00796b" } }}
                        />
                      }
                      label={<Typography sx={{ color: "#666", fontSize: "14px" }}>Remember me</Typography>}
                    />
                    <Link
                      onClick={() => navigate("/Forgotpassword")}
                      sx={{
                        color: "#608dcb",
                        fontSize: "14px",
                        cursor: "pointer",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forget Password?
                    </Link>
                  </Box>

                  <HrLoginButton type="submit" loading={busy} variant="contained" fullWidth sx={{ mt: 3 }}>
                    Login
                  </HrLoginButton>
                </Stack>
              </form>
            </ContentBox>
          </Grid>

          {/* Right side: cover image */}
          <Grid
            item
            sm={5}
            xs={false}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${brand.image})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
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

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      enableReinitialize
      validate={validate}
      onSubmit={(values) => fnLogin(values)}
    >
      {(formik) => (brand.layout === "portal" ? renderPortal(formik) : renderSplit(formik))}
    </Formik>
  );
};

export default Login;