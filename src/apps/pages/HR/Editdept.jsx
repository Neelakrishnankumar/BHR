import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  Menu,
  FormControl,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormLabel,
  Tooltip,
  LinearProgress,
  Paper,
  Breadcrumbs
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../index";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { deptSchema } from "../../Security/validation";
import wallet from "../../../assets/img/wallet.jpg";
import Topbar from "../../../ui-components/global/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";

// ***********************************************
//  Developer:Gowsalya
// Purpose:To Create Department

// ***********************************************
const Editdept = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  console.log(CompanyAutoCode, "CompanyAutoCode");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const Data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.loading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
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
          Name: Yup.string().required(data.Department.Name),
          Loc: Yup.string().required(data.Department.Loc),

        };

        if (CompanyAutoCode === "N") {
          schemaFields.Code = Yup.string().required(data.Designation.Code);
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const [ini, setIni] = useState(true);
  const [loading, setLoading] = useState(false);
  var apiData = "";
  apiData = {
    Code: Data.Code,
    Name: Data.Name,
    Loc: Data.Loc,
    SortOrder: Data.SortOrder,
    Disable: Data.Disable,
  };
  //*******Assign Department values from Database in  Yup initial value******* */
  const initialValues = {
    Code: apiData.Code,
    Name: apiData.Name,
    Loc: apiData.Loc,
    SortOrder: apiData.SortOrder || 0,
    checkbox: Data.Disable === "Y" ? true : false,
    delete: Data.DeleteFlag === "Y" ? true : false
  };
  // **********Save Function*****************
  const fnSave = async (values, del) => {
    // setLoading(true);
    // setIni(false);
    // if (values.Code == "") {
    //   toast.error("Please Enter Code");
    //   return;
    // }
    // if (values.Name == "") {
    //   toast.error("Please Enter Description");
    //   return;
    // }
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
    // var isCheck = "N";
    // if (values.checkbox == true) {
    //   isCheck = "Y";
    // }
    console.log(values);

    var idata = {
      RecordID: recID,
      Name: values.Name,
      Code: values.Code,
      Loc: values.Loc,
      SortOrder: values.SortOrder,
      Disable: values.checkbox === true ? "Y" : "N",
      DeleteFlag: values.delete == true ? "Y" : "N",
      Finyear,
      CompanyID,
    };
    // var type = "";

    // if (mode == "A") {
    //   type = "insert";
    // } else {
    //   type = "update";
    // }

    // const data = await dispatch(postApidata(accessID, type, idata));
    // let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
      navigate(`/Apps/TR026/Department`);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };

  const ref = useRef(null);
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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };
  //  console.log("dept",deptSchema);
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

                >
                  Department
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
            enableReinitialize={true}
            onSubmit={(values) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={validationSchema}
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

                  {CompanyAutoCode == "Y" ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Code"
                      placeholder="Auto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Code}
                      id="Code"
                      name="Code"
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      InputProps={{ readOnly: true }}
                      // required
                      focused
                      // autoFocus
                      sx={{

                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        }
                      }}
                      inputProps={{ maxLength: 8 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Code");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                  ) : (

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label={
                        <>
                          Code<span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </>
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Code}
                      id="Code"
                      name="Code"
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      // required
                      focused
                      autoFocus
                      sx={{

                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        }
                      }}
                      inputProps={{ maxLength: 8 }}
                      onInvalid={(e) => {
                        e.target.setCustomValidity("Please Fill The Code");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                  )}


                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label={
                      <>
                        Name<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    value={values.Name}
                    id="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Name"
                    error={!!touched.Name && !!errors.Name}
                    helperText={touched.Name && errors.Name}
                    focused
                    autoFocus={CompanyAutoCode === "Y"}
                    sx={{

                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      }
                    }}
                    // required
                    inputProps={{ maxLength: 90 }}
                    multiline
                    onInvalid={(e) => {
                      e.target.setCustomValidity(
                        "Please fill the Name"
                      );
                    }}
                    onInput={(e) => {
                      e.target.setCustomValidity("");
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label={
                      <>
                        Location<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    value={values.Loc}
                    id="Loc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Loc"
                    // required
                    error={!!touched.Loc && !!errors.Loc}
                    helperText={touched.Loc && errors.Loc}
                    sx={{

                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      }
                    }} focused
                    inputProps={{ maxLength: 90 }}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="Number"
                    label="Sort Order"
                    value={values.SortOrder}
                    id="SortOrder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="SortOrder"
                    error={!!touched.SortOrder && !!errors.SortOrder}
                    helperText={touched.SortOrder && errors.SortOrder}

                    focused
                    onWheel={(e) => e.target.blur()}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right", background: "" },
                      },
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                  />
                  <FormControl>
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
                        name="checkbox"
                        id="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={Checkbox}
                        label="Disable"
                      />

                      <FormLabel focused={false}>Disable</FormLabel>
                    </Box>
                  </FormControl>

                </Box>
                <Box display="flex" justifyContent="end" padding={1} gap={2}>
                  {YearFlag == "true" ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={loading}
                    // onClick={() => {
                    //   fnSave(values);
                    // }}
                    >
                      Save
                    </LoadingButton>
                  ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      disabled={true}
                    >
                      Save
                    </Button>
                  )}
                  {/* {YearFlag == "true" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        fnSave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      variant="contained"
                      disabled={true}
                    >
                      Delete
                    </Button>
                  )} */}
                  {mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      // onClick={() => {
                      //   fnSave(values, "harddelete");
                      // }}
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
                            fnSave(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    null
                  )}
                  {/* <Button
                    color="error"
                    variant="contained"
                    
                    >
                    Delete
                  </Button> */}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(`/Apps/TR026/Department`);
                    }}
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

export default Editdept;
