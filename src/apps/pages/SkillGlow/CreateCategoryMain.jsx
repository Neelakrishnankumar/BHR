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

const CreateCategoryMain = () => {
  const navigate = useNavigate();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const params = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const mode = params.Mode;

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
          code: Yup.string().required(data.SkillGlowCategory.Code),
          name: Yup.string().required(data.SkillGlowCategory.Name),
          assessmentType: Yup.string().required(data.SkillGlowCategory.AssessmentType),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);

  const CompanyID = sessionStorage.getItem("compID");

  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const CategorySaveFn = async (values) => {
    let action =
      mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";

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
      Disable: isCheck,
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
    assessmentType: Data.AssessmentType,
    sortOrder: Data.SortOrder,
    disable: Data.Disable == "Y" ? true : false,
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Please Enter Name Here"),
  //   code: Yup.string().required("Choose A Code"),
  //   sortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   disable: Yup.boolean(),
  // });

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box
              display={isNonMobile ? "flex" : "none"}
              borderRadius="3px"
              alignItems="center"
            >
              <Breadcrumbs
                maxItems={3}
                aria-label="breadcrumb"
                separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
              >
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                  onClick={() => navigate(-1)}
                >
                  List Of Category
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
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

      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
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
                  <TextField
                    // fullWidth
                    variant="standard"
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
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  />
                  <TextField
                    // fullWidth
                    variant="standard"
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
                      // backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  />
                    <TextField
                      focused
                      variant="standard"
                      label={
                        <>
                          Assessment Type<span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                      <MenuItem value={"SkillAssessment"}>Skill Assessment</MenuItem>
                      <MenuItem value={"Appraisal"}>Appraisal</MenuItem>
                      <MenuItem value={"Survey"}>Survey</MenuItem>
                      <MenuItem value={"Feedback"}>Feedback</MenuItem>
                    </TextField>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="Sort Order"
                    value={values.sortOrder}
                    id="sortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="sortOrder"
                    // error={!!touched.sortOrder && !!errors.sortOrder}
                    // helperText={touched.sortOrder && errors.sortOrder}
                    
                    sx={{ background: "" }}
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
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <LoadingButton
                    color={mode == "D" ? "error" : "secondary"}
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    {mode == "D" ? "Delete" : "Save"}
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default CreateCategoryMain;
