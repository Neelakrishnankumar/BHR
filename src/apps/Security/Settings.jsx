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
  Tooltip,
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
import PropTypes from 'prop-types';
import Resizer from "react-image-file-resizer";
import Tabs from '@mui/material/Tabs';
import { imageUpload } from "../../store/reducers/Imguploadreducer";
import Tab from '@mui/material/Tab';
import React, { useEffect, useState } from "react";
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
import store from "../..";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function MyTabsComponent() {
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
  const [panImage, setPanImage] = useState("");
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
  const [value1, setValue1] = useState(0);
  const getFilepanChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setPanImage(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  const formGap = "16px";

  // const [values, setValues] = useState({
  //   currentpassword: "",
  //   newpassword: "",
  //   confirmpassword: "",
  // });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  // const handleChange = (e) => {
  //   setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleBlur = (e) => {
  //   setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  //   // Add basic validation just for demo purposes
  //   if (!e.target.value) {
  //     setErrors((prev) => ({ ...prev, [e.target.name]: "Required" }));
  //   } else {
  //     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  //   }
  // };

  const setFieldTouched = (field, touched) => {
    setTouched((prev) => ({ ...prev, [field]: touched }));
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
      navigate("/Apps/settings");
    } else {
      toast.error(response.payload.Msg);
    }
  };

  return (
    <React.Fragment>
      <Box m="10px">
        <Header title="Settings" subtitle="" />
        <Paper elevation={3} sx={{ margin: "1px" }}>
          <Formik
            initialValues={initialvalues}
            onSubmit={(values, setSubmitting, resetForm) => {
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
                {/* <Box m="20px"> */}

                {/* <Divider variant="fullWidth" sx={{ mt: "20px" }} /> */}
                <Typography variant="h5">Subscriptions:</Typography>

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
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: formGap }}
                  >
                    <TextField
                      name="subscriptionStartDate"
                      type="date"
                      id="subscriptionStartDate"
                      label="Subscription Start Date"
                      variant="standard"
                      focused
                      // onChange={(e) => handleChangesub(e, Setsubfromdate)}
                      // value={subfromdate}

                      value={values.subscriptionStartDate}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.subscriptionPeriod && !!errors.subscriptionPeriod}
                      // helperText={touched.subscriptionPeriod && errors.subscriptionPeriod}
                      autoFocus
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      name="subscriptionperiod"
                      type="number"
                      id="subscriptionperiod"
                      label="Subscription Period (in months)"
                      variant="standard"
                      focused
                      // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                      // value={subperiod}

                      value={values.subscriptionperiod}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.subscriptionperiod && !!errors.subscriptionperiod}
                      // helperText={touched.subscriptionperiod && errors.subscriptionperiod}
                      autoFocus
                      sx={{
                        gridColumn: "span 2",
                        background: "",
                        input: { textAlign: "right" },

                      }}
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      name="retainDate"
                      type="date"
                      id="retainDate"
                      label="Retain Date"
                      variant="standard"
                      focused
                      value={values.retainDate}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.retainDate && !!errors.retainDate}
                      // helperText={touched.retainDate && errors.retainDate}
                      autoFocus
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      name="noofemployee"
                      type="number"
                      id="noofemployee"
                      label="No of Employee"
                      variant="standard"
                      focused
                      // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                      // value={subperiod}

                      value={values.noofemployee}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.noofemployee && !!errors.noofemployee}
                      // helperText={touched.noofemployee && errors.noofemployee}
                      autoFocus
                      sx={{
                        gridColumn: "span 2",
                        background: "",
                        input: { textAlign: "right" },

                      }}

                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: formGap }}
                  >
                    <TextField
                      name="subscriptionEndDate"
                      type="date"
                      id="subscriptionEndDate"
                      label="Subscription End Date"
                      variant="standard"
                      focused
                      // onChange={(e) => handleChangesub(e, SetsubEnddate)}
                      // value={subEnddate}

                      value={values.subscriptionEndDate}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.subscriptionEndDate && !!errors.subscriptionEndDate}
                      // helperText={touched.subscriptionEndDate && errors.subscriptionEndDate}
                      autoFocus
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      name="notificationDate"
                      type="date"
                      id="notificationDate"
                      label="Notification Date"
                      variant="standard"
                      focused
                      value={values.notificationDate}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={
                      //   !!touched.notificationDate && !!errors.notificationDate
                      // }
                      // helperText={
                      //   touched.notificationDate && errors.notificationDate
                      // }
                      autoFocus
                      inputProps={{ readOnly: true }}
                    />
                    <TextField
                      name="noofusers"
                      type="number"
                      id="noofusers"
                      label="No of Users"
                      variant="standard"
                      focused
                      // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                      // value={subperiod}

                      value={values.noofusers}
                      // onBlur={handleBlur}
                      // onChange={handleChange}
                      // error={!!touched.noofusers && !!errors.noofusers}
                      // helperText={touched.noofusers && errors.noofusers}
                      autoFocus
                      sx={{
                        gridColumn: "span 2",
                        background: "",
                        input: { textAlign: "right" },

                      }}

                    />
                  </FormControl>
                </Box>


                <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                {/* <Typography variant="h5">Change Password:</Typography>

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

                </Box> */}


                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
                      <Tab label="Company Details" {...a11yProps(0)} />
                      <Tab label="Change Password" {...a11yProps(1)} />

                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value1} index={0}>
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
                          name="address"
                          type="text"
                          id="address"
                          label="Office Address"
                          variant="standard"
                          multiline
                          rows={3}
                          focused
                          value={values.address}
                          onFocus={() => setFieldTouched("address", true)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={touched.address && !!errors.address}
                          helperText={touched.address && errors.address ? errors.address : ""}
                        />


                        <TextField
                          name="gstnumber"
                          label="GST Number"
                          variant="standard"
                          focused
                          value={values.gstnumber}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const input = e.target.value.toUpperCase();
                            if (/^[0-9A-Z]*$/.test(input) || input === "") {
                              // This updates Formik value correctly
                              handleChange({
                                target: {
                                  name: "gstnumber",
                                  value: input,
                                },
                              });
                            }
                          }}
                          error={!!touched.gstnumber && !!errors.gstnumber}
                          helperText={touched.gstnumber && errors.gstnumber}
                          sx={{
                            backgroundColor: "#ffffff",
                          }}
                          autoFocus
                        />
                         <Box display="flex" alignItems="center" gap={formGap}>
                          <Tooltip title="Logo Upload">
                            <IconButton
                              size="small"
                              color="warning"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="application/pdf"
                                type="file"
                                onChange={getFilepanChange}
                              />
                              <PictureAsPdfOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Button
                            size="small"
                            variant="contained"
                            component={"a"}
                            onClick={() => {
                              panImage
                                ? window.open(panImage, "_blank")
                                : toast.error("Please Upload File");
                            }}
                          >
                            View
                          </Button>
                        </Box>

                      </FormControl>

                    </Box>
                  </CustomTabPanel>
                  <CustomTabPanel value={value1} index={1}>
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
                  </CustomTabPanel>

                </Box>




                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  <Button
                    color={"success"}
                    variant="contained"
                    //   disabled={true}
                    type="submit" // This will trigger the onSubmit method of Formik
                    loading={isLoading}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>

                  <Button
                    color={"error"}
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

