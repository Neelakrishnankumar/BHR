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
  Breadcrumbs,
  Paper,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
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
import { HsnSchema } from "../../Security/validation";
import { GateSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { formGap } from "../../../ui-components/utils";
// import CryptoJS from "crypto-js";
import * as Yup from "yup";
const Editgate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recid = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  var parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  console.log(data);

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const rowData = location.state || {};
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

        let schemaFields = {
          name: Yup.string().trim().required(data.Geogate.name),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Geogate.code);
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID: recid }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    code: data.Code,
    name: data.Name,
    comment: data.Comments,
    sortorder: data.SortOrder,
    readercode: data.ReaderCode,
    readername: data.ReaderName,
    disable: data.Disable === "Y" ? true : false,
    delete: data.DeleteFlag === "Y" ? true : false,
    latitude: data.Latitude,
    longitude: data.Longitude,
  };

  const Fnsave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recid,
      Code: values.code,
      Name: values.name,
      Comments: values.comment,
      SortOrder: values.sortorder || 0,
      Disable: isCheck,
      DeleteFlag: values.delete == true ? "Y" : "N",
      LocRecordID: parentID,
      ReaderCode: values.readercode,
      ReaderName: values.readername,
      Latitude: values.latitude,
      Longitude: values.longitude,
      // Finyear,
      // CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // navigate(
      //   `/Apps/Secondarylistview/TR127/Gate Entry/${params.filtertype}/${params.parentID}`, { state: rowData }
      // );
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const fnLogOut = (props) => {
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }

    //       return
    //  }
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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
          navigate(-1);
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
    
    
              <Box sx={{borderRadius: 3, }}>
      <Paper sx={{ borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}

            <Breadcrumbs
              maxItems={3}
              aria-label="breadcrumb"
              separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
            >
              {/* <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR014/Company",{state: rowData});
                }}
              >
               {`Company(${rowData.CompanyName})`}
              </Typography> */}
              {/* <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate(
                    "/Apps/TR128/Location", { state: rowData }
                  );
                }}
              >
                {`Location(${rowData.LocationName})`}
              </Typography> */}
              <Typography
                sx={{
                     fontSize: 20,
                     fontWeight: 700,
                     color: "#111827",
                     // mb: 0.2,
                         px: 1,
           py: 0.2,
                   }}
                onClick={() => {
                  navigate(
                    `/Apps/Secondarylistview/TR127/Gate Entry/${params.filtertype}/${params.parentID}`,
                    { state: rowData }
                  );
                }}
              >
                {mode === "E" ? `Gate(${rowData.GateName})` : "Gate(New)"}

                {/* {`Gate(${rowData.GateName})`} */}
              </Typography>
            </Breadcrumbs>
            {/* <Typography variant="h3">Gate</Typography> */}
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
                 <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 0 }}>
           
                  <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
           
           <Paper elevation={3} sx={{ margin: "10px",backgroundColor: "#ffff", border: "1px solid #b9bcc0", borderRadius: 3, }}>
           

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
                  {/* ----- CARD HEADER ----- */}
                                                  <Box
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                  mb={1}
                  sx={{ px: 2, pt: 2 }}
                >
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
                    <Typography sx={{ fontSize: 18 }}>
                 🚪
                    </Typography>
                  </Box>
                
                  {/* TITLE + SUBTITLE */}
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                     color="#0D94885"
                    >
                     Gate
                    </Typography>
                
                    <Typography variant="body2" color="text.secondary">
                      
                       Manage gate entries, exits, and access control records
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {/* <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2", gap: formGap }}
                  > */}
                  {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="outlined"
                      size="small"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                        gridColumn: "span 2",
                      }}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label={
                        <>
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                        gridColumn: "span 2",
                      }}
                      autoFocus
                    />
                  )}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    // label="Name"
                    label={
                      <>
                        Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="outlined"
                      size="small"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ 
                      gridColumn: "span 2",
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
                    // autoFocus
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="readercode"
                    type="text"
                    id="readercode"
                    label="Reader Code"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.readercode}
                    onChange={handleChange}
                    sx={{ 
                      gridColumn: "span 2",
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
                    name="readername"
                    type="text"
                    id="readername"
                    label="Reader Name"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.readername}
                    onChange={handleChange}
                    sx={{ 
                      gridColumn: "span 2",
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
                    name="latitude"
                    type="number"
                    id="latitude"
                    label="Latitude"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.latitude}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.latitude && !!errors.latitude}
                    helperText={touched.latitude && errors.latitude}
                    sx={{ 
                      gridColumn: "span 2",
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
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  <TextField
                    name="longitude"
                    type="number"
                    id="longitude"
                    label="Longitude"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.longitude}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.longitude && !!errors.longitude}
                    helperText={touched.longitude && errors.longitude}
                    sx={{ 
                      gridColumn: "span 2",
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
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right",


                         },
                      },
                    }}
                  />
                  <TextField
                    name="comment"
                    type="text"
                    id="comment"
                    label="Comment"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    sx={{ 
                      gridColumn: "span 2",
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
                    name="sortorder"
                    type="number"
                    id="sortorder"
                    label="Sort Order"
                    variant="outlined"
                      size="small"
                    focused
                    value={values.sortorder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortorder && !!errors.sortorder}
                    helperText={touched.sortorder && errors.sortorder}
                    sx={{ 
                      gridColumn: "span 2",
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
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                  />
                  <Box>
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="delete"
                      id="delete"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Delete"
                    />

                    <FormLabel focused={false}>Delete</FormLabel>
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
                  {/* </FormControl> */}
                </Box>
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  {/* {YearFlag == "true" ? ( */}
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
                  {/* ) : ( */}
                  {/* <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button> */}
                  {/* )} */}
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
                      navigate(
                        -1
                        // `/Apps/Secondarylistview/TR127/Gate Entry/${params.filtertype}/${params.parentID}`,{state:rowData}
                      );
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

export default Editgate;
