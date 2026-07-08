import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  LinearProgress,
  Breadcrumbs,
  MenuItem,
  InputLabel,
  Select,
  Paper,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox, Description } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  CustomisedCaptionGet,
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SatuarySchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/utils";
import * as Yup from "yup";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import store from "../../..";
// import CryptoJS from "crypto-js";
const EditSatuaryComponent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const CompanyID = sessionStorage.getItem("compID");
  const [validationSchema, setValidationSchema] = useState(null);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [logoimage, setlogoimage] = useState("");
  console.log("Nowlogo", logoimage);
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
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
          description: Yup.string().required(data.Salarycomp.Policy).nullable(),
        })
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    if (Subscriptionlastthree && accessID) {
      dispatch(
        CustomisedCaptionGet({
          Vertical: Subscriptionlastthree,
          AccessID: accessID,
        })
      );
    }
  }, [Subscriptionlastthree, accessID, dispatch]);
  const Customisedcaptiondata = useSelector(
    (state) => state.formApi.CustomisedCaptionGetData
  );
  // Ensure it's always an array
  const captionArray = Array.isArray(Customisedcaptiondata)
    ? Customisedcaptiondata
    : Customisedcaptiondata?.data || [];
  console.log(Customisedcaptiondata, captionArray, "Customisedcaptiondata");
  const getBusinessCaption = (CaptionID, defaultCaption) => {
    const match = captionArray?.find(
      (item) => item.CAPTIONID === CaptionID
    );

    return match?.CAPTION || defaultCaption;
  };
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    description: data.Policy,
    sortOrder: data.Sortorder || 0,
    disable: data.Disable === "Y" ? true : false,
    Name: data.Description,
    Attachment: data.Attachments,
  };

  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Policy: values.description,
      SortOrder: values.sortOrder,
      Description: values.Name,
      Disable: values.disable === true ? "Y" : "N",
      CompanyID,
      Attachments: logoimage ? logoimage : "",
    };


    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const getFilepanChange = async (event) => {
    setlogoimage(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(fileUpload({ formData }));
    setlogoimage(fileData.payload.name);
    sessionStorage.setItem("logoimage", fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
    }
  };

  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
      // text:data.payload.Msg,
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
          navigate(`/Apps/Secondarylistview/TR207/SatuaryComponent/${params.row.RecordID}`);
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}

       <Box sx={{ height: "100vh", overflow: "auto" }}>
              <Box sx={{ p: 1, backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
                <Box sx={{ p: 2, borderRadius: 3 }}>
                  <Paper sx={{ borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}

            >
              {getBusinessCaption("Policy", "Payroll Policy")}
            </Typography>
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
     </Box>
      {!getLoading ? (
                        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
              
                <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
                            <Paper elevation={0} sx={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 3, p: 3 }}>
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            validationSchema={validationSchema}
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
            }) => (
              <form onSubmit={handleSubmit}>


                                      {/* Header */}
                                      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                                        <Box
                                          sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            backgroundColor: "#E0E7FF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 18,
                                          }}
                                        >
                                          📋
                                        </Box>
                                        <Box>
                                          <Typography variant="h6" fontWeight={700} color="#4F46E5">
                                            {getBusinessCaption("Policy", "Payroll Policy")}
                                          </Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            Configure payroll rules, salary structures, and organization policies.
                                          </Typography>
                                        </Box>
                                      </Box>

                <Box
                  display="grid"
                  gap={formGap}
                  padding={1}
                  gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >

                  <TextField
                    name="description"
                    type="text"
                    id="description"
                    // label="Name"
                    label={
                      <span>
                        {getBusinessCaption("Policy", "Policy")}
                        <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </span>
                    }
                    variant="outlined"
                    size="small"
                    focused
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
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
                  />
                  <TextField
                    name="Name"
                    type="text"
                    id="Name"
                    // label="Name"
                    label={
                      <span>
                        Description
                      </span>
                    }
                    variant="outlined"
                    size="small"
                    focused
                    value={values.Name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Name && !!errors.Name}
                    helperText={touched.Name && errors.Name}
                    sx={{
                      //gridColumn: "span 2",
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }}
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
                  />


                  <TextField
                    name="sortOrder"
                    type="number"
                    id="sortOrder"
                    label="SortOrder"
                    variant="outlined"
                    size="small"
                    focused
                    value={values.sortOrder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortOrder && !!errors.sortOrder}
                    helperText={touched.sortOrder && errors.sortOrder}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
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
                  //sx={{ gridColumn: "span 2", background: "#fff6c3" }}
                  />
                  <FormControl>
                    <Box>
                      <Field
                        //  size="small"
                        type="checkbox"
                        name="disable"
                        id="disable"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                    </Box>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                  <Tooltip title="Upload Attachment">
                    <IconButton
                      size="small"
                      color="warning"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="all/*"
                        type="file"
                        onChange={getFilepanChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        // bgcolor: "#0D9488",
                        // "&:hover": {
                        //   bgcolor: "#0F766E",
                        // },
                      }}
                    component={"a"}
                    onClick={() => {
                      data.Attachments || logoimage
                        ? window.open(
                          logoimage
                            ? store.getState().globalurl.attachmentUrl +
                            logoimage
                            : store.getState().globalurl.attachmentUrl +
                            data.Attachments,
                          "_blank"
                        )
                        : toast.error("Please Upload File");
                    }}
                  >
                    View
                  </Button>
                  {YearFlag == "true" ? (
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
                  ) : (
                    <Button
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
                      disabled={true}
                    >
                      Save
                    </Button>
                  )} 
                  { mode == "E" &&
                    <Button
                      color="error"
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        // bgcolor: "#F97316",
                        // "&:hover": {
                        //   bgcolor: "#EA580C",
                        // },
                      }}
                      onClick={() => {
                        Fnsave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>}
                  <Button
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
                      }}
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
                    }}
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
      </Box>
          </Box>
    </React.Fragment>
  );
};

export default EditSatuaryComponent;