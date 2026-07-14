import {
  Box,
  Breadcrumbs,
  Button,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useProSidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import { formGap } from "../../../ui-components/utils";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { breadcrumbStyles } from "../../../Theme";

const NewCreateCategoryMain = () => {
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const params = useParams();
  console.log(params, "--find Params");
  
  const { state } = useLocation();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const recID = params.id;
  const accessID = params.accessID;
  const AssessmentType = params.parentID1;
  //const parentID2 = params.parentID2;
  const SkillAssTypeID = state.SkillAssTypeID;
  console.log("🚀 ~ NewCreateCategoryMain ~ SkillAssTypeID: & AssessmentType", SkillAssTypeID,AssessmentType)
  const screenName = params.screenName;
  const mode = params.Mode;

  //AUTOCODE
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");

  //VALIDATION
  const [errorMsgData, setErrorMsgData] = useState(null);

  const [validationSchema, setValidationSchema] = useState(null);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        //Permission
        const schema = Yup.object().shape({
          //code: Yup.string().required(data.SkillGlowCategory.Code),
          name: Yup.string().required(data.SkillGlowCategory.Name),
          // assessmentType: Yup.string().required(
          //   data.SkillGlowCategory.AssessmentType
          // ),
        });
        if (CompanyAutoCode === "N") {
          schema = schema.shape({
            code: Yup.string().required(data.SkillGlowCategory.Code),
          });
        }
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  const CompanyID = sessionStorage.getItem("compID");

  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  useEffect(() => {
    dispatch(getFetchData({ accessID: "TR278", get: "get", recID }));
  }, []);

  const CategorySaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }

    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      Code: values.code,
      Name: values.name,
      AssessmentType: values.assessmentType,
      SortOrder: values.sortOrder || "0",
      SkillAssTypeID: SkillAssTypeID || "0",
      Disable: isCheck,
      DeleteFlag: values.delete == true ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: props,
    }).then((result) => {
      if (result.isConfirmed) {
        if (props === "Logout") {
          navigate("/");
        }
        if (props === "Close") {
          navigate(-1);
        }
      } else {
        return;
      }
    });
  };

  const initialValues = {
    name: Data.Name,
    code: Data.Code,
    assessmentType: AssessmentType || "",
    sortOrder: Data.SortOrder,
    disable: Data.Disable == "Y" ? true : false,
    delete: Data.DeleteFlag == "Y" ? true : false,
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Please Enter Name Here"),
  //   code: Yup.string().required("Choose A Code"),
  //   sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   disable: Yup.boolean(),
  // });

  const assessmentConfig = {
  SK: {
    icon: "🎯",
    title: "Skill Assessment",
    summary:
      "Evaluate and track employee skills to identify strengths and areas for improvement",
  },
  AP: {
    icon: "📈",
    title: "Appraisal",
    summary:
      "Assess employee performance and growth to support career development",
  },
  CL: {
    icon: "🛡️",
    title: "Compliance",
    summary:
      "Ensure adherence to policies, standards, and regulatory requirements",
  },
  SV: {
    icon: "📋",
    title: "Survey",
    summary:
      "Collect feedback and insights to improve processes and decision-making",
  },
  FB: {
    icon: "💬",
    title: "Feedback",
    summary:
      "Gather opinions and suggestions to enhance performance and engagement",
  },
};
      const current = assessmentConfig[AssessmentType] || assessmentConfig.SK;

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
         <Paper
                   elevation={0}
                   sx={{
                     mx: 2,
                     mt: 1,
                     mb: 1,
                     p: 1,
                     borderRadius: 3,
                     border: "1px solid #E5E7EB",
                     bgcolor: "#fff",
                   }}
                 >
                   <Box
                     display="flex"
                     justifyContent="space-between"
                     alignItems="center"
                   >
                     {/* Left */}
                     <Box display="flex" alignItems="center" gap={2}>
                       {broken && !rtl && (
                         <IconButton
                           onClick={() => toggleSidebar()}
                           sx={{
                             border: "1px solid #E5E7EB",
                             borderRadius: 2,
                           }}
                         >
                           <MenuOutlinedIcon />
                         </IconButton>
                       )}
           
                       <Box>
                         <Typography
                           sx={{
                             fontSize: 20,
                             fontWeight: 700,
                             color: "#111827",
                             // mb: 0.2,
                                 px: 1,
                   py: 0.2,
                           }}
                         >
                           {mode === "A" ? "New Assesment" : "Edit Assessment"}
                         </Typography>
           
                         <Breadcrumbs
                           separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                            sx={breadcrumbStyles.separator}
                    >
                <Typography
           sx={breadcrumbStyles.item}
                  onClick={() => navigate("/Apps/TR299/List%20Of%20Assessment%20Type")}
                >
                  List Of Assessment Type ({(state.BreadCrumb1)})
                </Typography>
                <Typography
                       sx={breadcrumbStyles.item}
                  onClick={() => navigate(-1)}
                >
                  List Of Category 
                </Typography>
                <Typography
                   sx={breadcrumbStyles.active}
                >
                  {mode == "A" ? "New" : mode == "D" ? "Delete" : "Edit"}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            <Tooltip title="Close">
              <IconButton onClick={() => fnLogOut("Close")} color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="error" onClick={() => fnLogOut("Logout")}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
  {/* </Box> */}
      {!getLoading ? (
             <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
                       
                              <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
                       
                       <Paper elevation={3} sx={{ margin: "10px",backgroundColor: "#ffff", border: "1px solid #b9bcc0", borderRadius: 3, }}>
                   <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                CategorySaveFn(values, resetForm);
              }, 100);
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
            }) => (
              <form onSubmit={handleSubmit}>

              {/* ----- CARD HEADER ----- */}

<Box display="flex" alignItems="center" gap={1.5} mb={1} sx={{ px: 2, pt: 2 }}>
  {/* ICON */}
  <Box
    sx={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      backgroundColor: "#EFF6FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography  sx={{  width: 36, height: 36, borderRadius: "50%",
  bgcolor: "#CCFBF1", // teal-100
  display: "flex", alignItems: "center", justifyContent: "center" }}>
      {current.icon}
    </Typography>
  </Box>

  {/* TITLE + SUBTITLE */}
  <Box>
    <Typography variant="subtitle1" fontWeight={700} color="#0D94885">
      {current.title}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {current.summary}
    </Typography>
  </Box>
</Box>

                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {CompanyAutoCode == "Y" ? (
                    <TextField
                      // fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      label="Code"
                      // label={
                      //   <span>
                      //     Code{" "}
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </span>
                      // }
                      placeholder="Auto"
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="code"
                      name="code"
                      focused
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                       sx={{
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",

                                    "& fieldset": {
                                      borderColor: "#d1d5db", // 👈 light grey border
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                      borderWidth: "1px",
                                    },
                                  },

                                  "& .MuiInputLabel-root": {
                                    color: "#6b7280", // label grey
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6b7280", // keep same on focus
                                  },
                                }}
                      InputProps={{ readOnly: true }}

                    />
                  ) : (
                    <TextField
                      // fullWidth
                      variant="outlined"
                      size="small"
                      type="text"
                      //label="Code"
                      label={
                        <span>
                          Code{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </span>
                      }
                      //placeholder="Category Code"
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="code"
                      name="code"
                      focused
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                       sx={{
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",

                                    "& fieldset": {
                                      borderColor: "#d1d5db", // 👈 light grey border
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                      borderWidth: "1px",
                                    },
                                  },

                                  "& .MuiInputLabel-root": {
                                    color: "#6b7280", // label grey
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6b7280", // keep same on focus
                                  },
                                }}
                      autoFocus
                    />
                  )}

                  <TextField
                    // fullWidth
                    variant="outlined"
                      size="small"
                    type="text"
                    //label="Name"
                    label={
                      <span>
                        Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </span>
                    }
                    //placeholder="Category Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    focused
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                     sx={{
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",

                                    "& fieldset": {
                                      borderColor: "#d1d5db", // 👈 light grey border
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                      borderWidth: "1px",
                                    },
                                  },

                                  "& .MuiInputLabel-root": {
                                    color: "#6b7280", // label grey
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6b7280", // keep same on focus
                                  },
                                }}
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  {/* <TextField
                    focused
                    variant="standard"
                    label={
                      <>
                        Assessment Type
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    name="assessmentType"
                    id="assessmentType"
                    value={values.assessmentType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    select
                    error={!!touched.assessmentType && !!errors.assessmentType}
                    helperText={touched.assessmentType && errors.assessmentType}
                  >
                    <MenuItem value={"SkillAssessment"}>
                      Skill Assessment
                    </MenuItem>
                    <MenuItem value={"Appraisal"}>Appraisal</MenuItem>
                    <MenuItem value={"Compliance"}>Compliance</MenuItem>
                    <MenuItem value={"Survey"}>Survey</MenuItem>
                    <MenuItem value={"Feedback"}>Feedback</MenuItem>
                  </TextField> */}

                   {/* <TextField
                    // fullWidth
                    variant="standard"
                    type="text"
                    //label="Name"
                    label={
                      <span>
                        Assessment Type{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </span>
                    }
                    //placeholder="Category Name"
                    value={values.assessmentType}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="assessmentType"
                    name="assessmentType"
                    focused
                    error={!!touched.assessmentType && !!errors.assessmentType}
                    helperText={touched.assessmentType && errors.assessmentType}
                    sx={{
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    InputProps={{
                      inputProps:{
                        readOnly:true
                      }
                    }}
                  /> */}

                  <TextField
                    fullWidth
                    variant="outlined"
                      size="small"
                    type="number"
                    label="Sort Order"
                    value={values.sortOrder}
                    id="sortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="sortOrder"
                    // error={!!touched.sortOrder && !!errors.sortOrder}
                    // helperText={touched.sortOrder && errors.sortOrder}

                     sx={{
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",

                                    "& fieldset": {
                                      borderColor: "#d1d5db", // 👈 light grey border
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                      borderWidth: "1px",
                                    },
                                  },

                                  "& .MuiInputLabel-root": {
                                    color: "#6b7280", // label grey
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#6b7280", // keep same on focus
                                  },
                                }}
                    focused
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="delete"
                          checked={values.delete}
                          onChange={handleChange}
                        />
                      }
                      label="Delete"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="disable"
                          checked={values.disable}
                          onChange={handleChange}
                        />
                      }
                      label="Disable"
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <LoadingButton
                    sx={{
                                  textTransform: "none",
                                  borderRadius: 2,
                                  px: 4,
                                  bgcolor: "#0D9488",
                                  "&:hover": {
                                    bgcolor: "#0F766E",
                                  },
                                }}
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                  {/* {mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: errorMsgData.Warningmsg.Delete,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            CategorySaveFn(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : null} */}
                  <Button
                    variant="contained"
                    sx={{
                                  textTransform: "none",
                                  borderRadius: 2,
                                  px: 4,
                                  bgcolor: "#F97316",
                                 
                                  "&:hover": {
                                    bgcolor: "#EA580C",
                                  
                                  },
                                }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
            </Box>
                                    </Box>
      ) : (
        false
      )}
          {/* </Box>
                                  </Box> */}
    </React.Fragment>
  );
};

export default NewCreateCategoryMain;
