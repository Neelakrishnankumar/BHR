import {
  Box,
  Breadcrumbs,
  Button,
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
  Input,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { formGap } from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { fnFileUpload } from "../../../store/reducers/Imguploadreducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import store from "../../..";
const CreateSession = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Apps/SkillGlow/SkillGlowList");
  };
  const handleClick2 = () => {
    navigate("/Apps/SkillGlow/SkillGlowList/SkillGlowSession");
  };
  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  const screenName = params.screenName;
  const mode = params.Mode;
  const Assessmentid = params.parentID1;
  const CategoryId = params.parentID2;

  const CompanyID = sessionStorage.getItem("compID");
  const location = useLocation();
  const state = location.state || {};
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
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
        const schema = Yup.object().shape({
          //Code: Yup.string().required(data.ListofSession.Code),
          //Name: Yup.string().required(data.ListofSession.Name),
          Name: Yup.string().when("ContentType", {
            is: "Link",
            then: (schema) =>
              schema
                .required(data.ListofSession.Name) // still use message
                .url("Please enter a valid URL"), // 👈 custom URL validation
            otherwise: (schema) => schema.required(data.ListofSession.Name),
          }),
          ContentType: Yup.string().required(data.ListofSession.ContentType),
          AttachmentName: Yup.string().when("ContentType", {
            is: (val) => val === "Pdf" || val === "Ppt",
            then: (schema) =>
              schema.required(data.ListofSession.AttachmentName),
            otherwise: (schema) => schema.nullable(),
          }), 
          // SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
          // Disable: Yup.boolean(),
        });
        if(CompanyAutoCode === "N"){
          schema = schema.shape({
            Code: Yup.string().required(data.ListofSession.Code),
          })
        }
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const SessionSaveFn = async (values) => {
    let action =
      mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";

    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      AssessmentID: Assessmentid,
      Code: values.Code,
      Name: values.Name,
      ContentType: values.ContentType,
      SortOrder: values.SortOrder || "0",
      Disable: isCheck,
      Attachment: values.AttachmentName,
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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const initialValues = {
    Code: Data.Code || "",
    Name: Data.Name || "",
    ContentType: Data.ContentType || "",
    AttachmentName: Data.AttachmentName || "",
    SortOrder: Data.SortOrder || "",
    Disable: Data.Disable == "Y" ? true : false,
  };

  // const validationSchema = Yup.object({
  //   Code: Yup.string().required("Please Enter Code Here"),
  //   Name: Yup.string().required("Please Enter Description Here"),
  //   ContentType: Yup.string().required("Choose at least one Document Type"),
  //   //AttachmentName: Yup.string().required("Choose at least one Document"),
  //   SortOrder: Yup.number().min(0, "No negative numbers").nullable(),
  //   Disable: Yup.boolean(),
  // });
  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
        {/* BACK BUTTON */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "lightgrey",
              color: "black",
              "&:hover": {
                backgroundColor: "lightgrey",
                color: "black",
              },
            }}
          >
            Back
          </Button>
        </Box> */}
        {/* BREADCRUMBS */}
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
                    onClick={() =>
                      navigate(`/Apps/TR278/List%20Of%20Categories`)
                    }
                  >
                    List Of Category ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() =>
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR280/List Of Assessment/${params.parentID2}`,
                        {
                          state: { ...state },
                        }
                      )
                    }
                  >
                    List Of Assessment ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Session
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "V" ? "View" : Data.Name}
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
                  SessionSaveFn(values, resetForm);
                }, 100);
                console.log(values, "----Session.");
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
                <Form onSubmit={handleSubmit}>
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
                    {/* TEXTFIELD */}
                    {CompanyAutoCode === "Y" ? (
                    <TextField
                      variant="standard"
                      type="text"
                      name="Code"
                      label="Code"
                      id="Code"
                      placeholder="Auto"
                      value={values.Code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focused
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      //disabled={mode === "V"}
                      inputProps={{ readOnly: mode == "V" }}
                      sx={{
                        // backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                    />
                    ):(
                    <TextField
                      variant="standard"
                      type="text"
                      name="Code"
                      label={
                        <>
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      id="Code"
                      //placeholder="Enter Your code here......"
                      value={values.Code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focused
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      //disabled={mode === "V"}
                      inputProps={{ readOnly: mode == "V" }}
                      sx={{
                        // backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />
                    )}

                    <TextField
                      variant="standard"
                      type="text"
                      name="Name"
                      label={
                        <>
                          Name
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      id="Name"
                      //placeholder="Enter Your Description here......"
                      value={values.Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focused
                      error={!!touched.Name && !!errors.Name}
                      helperText={touched.Name && errors.Name}
                      //disabled={mode === "V"}
                      sx={{
                        // backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      inputProps={{ readOnly: mode == "V" }}
                      autoFocus={CompanyAutoCode == "Y"}

                    />

                    {/* DROPDOWN */}

                    {/* <FormControl
                      focused
                      variant="standard"
                      sx={{ background: "#ffffff" }}
                    >
                      <InputLabel id="ContentType">Document Type</InputLabel> */}
                    <TextField
                      // label="Please Select Document Type"
                      label={
                        <>
                          Document Type
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      name="ContentType"
                      id="ContentType"
                      // required
                      focused
                      variant="standard"
                      value={values.ContentType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ readOnly: mode == "V" }}
                      select
                      error={!!touched.ContentType && !!errors.ContentType}
                      helperText={touched.ContentType && errors.ContentType}
                      // MenuProps={{
                      //   PaperProps: {
                      //     sx: {
                      //       mt: 1, // Add space so the top border doesn’t get cut
                      //     },
                      //   },
                      // }}
                    >
                      <MenuItem value="Pdf">Pdf</MenuItem>
                      <MenuItem value="Ppt">Ppt</MenuItem>
                      <MenuItem value="Link">Link</MenuItem>
                      {/* ✅ unique value */}
                    </TextField>
                    {/* </FormControl> */}

                    {/* SORT ORDER */}

                    <TextField
                      variant="standard"
                      name="SortOrder"
                      id="SortOrder"
                      type="number"
                      label="Sort Order"
                      value={values.SortOrder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // error={!!touched.SortOrder && !!errors.SortOrder}
                      // helperText={touched.SortOrder && errors.SortOrder}
                      //disabled={mode === "V"}
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
                          readOnly: mode == "V",
                        },
                      }}
                    />

                    {/* CHECKBOX */}

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Disable"
                          checked={values.Disable}
                          onChange={handleChange}
                          disabled={mode === "V"}

                          //inputProps={{ readOnly: mode == "V" }}
                        />
                      }
                      label="Disable"
                      // sx={{
                      //   marginTop: "20px",
                      //   "@media (max-width:500px)": {
                      //     marginTop: 0,
                      //   },
                      // }}
                      inputProps={{ readOnly: mode == "V" }}
                    />
                  </Box>
                  {/* BUTTONS */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    {values.ContentType != "Link" && (
                      <React.Fragment>
                        <Tooltip title="Upload a file">
                          <IconButton
                            disabled={mode === "V"}
                            size="small"
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="all/*"
                              type="file"
                              onChange={(event) => {
                                const formData = new FormData();
                                formData.append("file", event.target.files[0]);
                                formData.append("type", "attachments");

                                dispatch(
                                  fnFileUpload(formData, recID, "TR031")
                                ).then((res) => {
                                  setFieldValue(
                                    "AttachmentName",
                                    res.payload.apiResponse
                                  );
                                });
                              }}
                            />
                            <CloudUpload fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                         {(values.ContentType === "Pdf" ||
                        values.ContentType === "Ppt") && (
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      )}
                      {/* Show Yup validation error here */}
                      {touched.AttachmentName && errors.AttachmentName && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "0.8rem",
                            marginTop: "4px",
                          }}
                        >
                          {errors.AttachmentName}
                        </div>
                      )}
                        <Button
                          // disabled={mode === "V"}
                          variant="contained"
                          component={"a"}
                          onClick={() => {
                            var filePath =
                              store.getState().globalurl.attachmentSkilUrl +
                              values.AttachmentName;

                            if (values.AttachmentName) {
                              window.open(filePath, "_blank");
                            } else {
                              toast.error("Please Upload File");
                            }
                          }}
                        >
                          View
                        </Button>
                      </React.Fragment>
                    )}

                    <LoadingButton
                      color={mode == "V" ? "error" : "secondary"}
                      variant="contained"
                      type="submit"
                      loading={isLoading}
                      disabled={mode == "V" ? true : false}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
      </React.Fragment>
    </>
  );
};

export default CreateSession;
