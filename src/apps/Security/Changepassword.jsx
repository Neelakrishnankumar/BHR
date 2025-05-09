import {
  Box,
  Checkbox,
  useTheme,
  Divider,
  Paper,
  Stack,
  TextField,
  FormControl,
  Popover,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
  InputBase,
  InputAdornment,
  Avatar,
} from "@mui/material";
import React, { useEffect } from "react";
import { tokens } from "../../Theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import Header from "../../ui-components/Header";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Footer from "../../ui-components/Footer";
import ChGPassWord from "../../assets/img/ChGPassWord.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { formGap } from "../../ui-components/utils";
import { Settingsvalidation } from "./validation";
import { getSettingsData, SettingspostData } from "../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Changepass = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Subscriptioncode = sessionStorage.getItem("SubscriptionCode");
  const Username = sessionStorage.getItem("UserName");
  const data = useSelector((state) => state.formApi.Data) || {};
 console.log(data, "--data");
  const isLoading = useSelector((state) => state.formApi.postLoading);

  useEffect(() => {
    dispatch(getSettingsData({
        SubscriptionCode: Subscriptioncode, 
        }));
  }, [location.key]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const style = {
    height: "55px",
    borderBottom: "2px solid #1769aa ",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
  };
  const initialvalues = {
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
    subscriptionStartDate: data.SBS_STARTDATE,
    subscriptionperiod: data.SBS_NOOFMONTH,
    retainDate: data.SBS_RETAINDATE,
    subscriptionEndDate: data.SBS_ENDDATE,
    notificationDate: data.SBS_NOTIFICATIONDATE,
  };

  const [value, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...value,
      showPassword: !value.showPassword,
    });
  };


//settings password save 
const fnSave = async (values) => {
    // let action = mode === "A" ? "insert" : "update";
    // let action =
    // mode === "A" && !del
    //   ? "insert"
    //   : mode === "E" && del
    //   ? "harddelete"
    //   : "update";
  
    const idata = {
        UserName: Username,
        OldPassword: values.currentpassword,
        NewPassword: values.newpassword,
    
    };

    const response = await dispatch(SettingspostData({ idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/change Password");
    } else {
      toast.error(response.payload.Msg);
    }
  };

  return (
    <React.Fragment>
      <Box m="10px">
        {/* <Header title="Change Password" subtitle=""   /> */}
        <Typography variant="h3" fontSize="1.2rem" fontWeight="bold" marginBottom={3}>
        Change Password
      </Typography>
        <Paper elevation={3} sx={{ margin: "1px" }}>
          <Formik
            initialValues={initialvalues}
            onSubmit={(values, setSubmitting,resetForm ) => {
              setTimeout(() => {
                  fnSave(values);
                  resetForm(); // Reset form after submission
              }, 100);
            }}
            validationSchema={Settingsvalidation}
            enableReinitialize={true}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              setFieldTouched,
              resetForm
            }) => (
              <form onSubmit={handleSubmit}>
                
                
                {/* <Typography variant="h5">Change Password:</Typography> */}

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
                    },
                  }}
                >
                 <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}>
  <TextField
    name="currentpassword"
    type="password"
    id="currentpassword"
    label="Current Password"
    variant="standard"
    focused
    value={values.currentpassword}
    // onFocus={() => setFieldTouched("currentpassword", true)} // Mark as touched on focus
    onBlur={handleBlur} 
    onChange={handleChange}
    error={touched.currentpassword && !!errors.currentpassword}
    helperText={touched.currentpassword && errors.currentpassword ? errors.currentpassword : ""}
  />

  <TextField
    name="newpassword"
    type="password"
    id="newpassword"
    label="New Password"
    variant="standard"
    focused
    value={values.newpassword}
    onFocus={() => setFieldTouched("newpassword", true)}
    onBlur={handleBlur}
    onChange={handleChange}
    error={touched.newpassword && !!errors.newpassword}
    helperText={touched.newpassword && errors.newpassword ? errors.newpassword : ""}
    inputProps={{ maxLength: 8 }}
  />

  <TextField
    name="confirmpassword"
    type="password"
    id="confirmpassword"
    label="Confirm Password"
    variant="standard"
    focused
    value={values.confirmpassword}
    onFocus={() => setFieldTouched("confirmpassword", true)}
    onBlur={handleBlur}
    onChange={handleChange}
    error={touched.confirmpassword && !!errors.confirmpassword}
    helperText={touched.confirmpassword && errors.confirmpassword ? errors.confirmpassword : ""}
    inputProps={{ maxLength: 8 }}
  />
</FormControl>

                </Box>
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  <Button
                    color={"secondary"}
                    variant="contained"
                    //   disabled={true}
                     type="submit" // This will trigger the onSubmit method of Formik
                     loading={isLoading}
                     disabled={isSubmitting} 
                  >
                    Save
                  </Button>

                  <Button
                    color={"warning"}
                    variant="contained"
                    onClick={() => resetForm()}
                    // onClick={() => {
                    //   navigate("/Apps/TR213/LeaveType");
                    // }}
                  >
                    Cancel
                  </Button>
                </Box>
                {/* </Box> */}
              </form>
            )}
          </Formik>
        </Paper>
      </Box>
    </React.Fragment>
  );
};
export default Changepass;
