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
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox, Schedule } from "@mui/icons-material";
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
import * as Yup from "yup";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/global/utils";
import {
  CheckinAutocomplete,
  Employeeautocomplete,
  Productautocomplete,
} from "../../../ui-components/global/Autocomplete";

// import CryptoJS from "crypto-js";
const Editproject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  // var accessID = params.accessID;
  var accessID = params.accessID;

  const data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [employee, setEmployee] = useState("");
  console.log(employee, "employeelookup");
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
          name: Yup.string().required(data.Project.name),
          //budget: Yup.string().required(data.Project.budget),
          incharge: Yup.object().required(data.Project.incharge).nullable(),
          // projectOwner: Yup.object().required(data.Project.projectOwner).nullable(),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Project.code);
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //
  // const validationSchema = Yup.object().shape({
  //   incharge: Yup.object()
  //     .nullable()
  //     .required("Owner is required"),
  // });

  const InitialValue = {
    code: data.Code,
    name: data.Name,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    incharge: data.ProjectIncharge
      ? { RecordID: data.ProjectIncharge, Name: data.ProjectInchargeName }
      : null,
    ServiceMaintenance: data.ServiceMaintenanceProject === "Y" ? true : false,
    ByProduct: data.ByProduct === "Y" ? true : false,
    Routine: data.RoutineTasks === "Y" ? true : false,
    CurrentStatus: data.CurrentStatus,
    delete: data.DeleteFlag === "Y" ? true : false,
    budget: data.Budget || 0,
    scheduled: data.ScheduledCost || 0,
    actual: data.ActualCost || 0,
    price: data.Price || "0",
    projectOwner: data.ProjectOwnerID && data.ProjectOwnerID !== "0"
      ? {
          RecordID: data.ProjectOwnerID,
          Code: data.ProjectOwnerCode,
          Name: data.ProjectOwnerName,
        }
      : null,
    OtherExpenses: data.OtherExpenses || 0,
  };

  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
        ? "softdelete"
        : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      ProjectIncharge: values.incharge.RecordID || 0,
      ProjectInchargeName: values.incharge.Name || "",
      ServiceMaintenanceProject: values.ServiceMaintenance === true ? "Y" : "N",
      RoutineTasks: values.Routine === true ? "Y" : "N",
      SortOrder: values.sortorder || 0,
      CurrentStatus: mode == "A" ? "CU" : values.CurrentStatus,
      Disable: isCheck,
      DeleteFlag: values.delete == true ? "Y" : "N",
      ByProduct: values.ByProduct == true ? "Y" : "N",
      ActualCost: values.actual || 0,
      Price: values.price || 0,
      Budget: values.budget || 0,
      ScheduledCost: values.scheduled || 0,
      Finyear,
      CompanyID,
      ProjectOwnerID: values.projectOwner?.RecordID || 0,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      //navigate("/Apps/TR133/Project");
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
          // navigate("/Apps/TR133/Project");
          navigate("/");
        }
      } else {
        return;
      }
    });
  };
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
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Project
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

      {!getLoading ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
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
              setFieldValue,
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
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      placeholder="Auto"
                      variant="standard"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
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
                      variant="standard"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      autoFocus
                    />
                  )}

                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Description
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    // required
                    autoFocus={CompanyAutoCode == "Y"}
                  />

                  <CheckinAutocomplete
                    name="incharge"
                    label={
                      <>
                        Accountable Incharge
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </>
                    }
                    id="incharge"
                    value={values.incharge}
                    onChange={async (newValue) => {
                      setFieldValue("incharge", newValue);
                    }}
                    error={!!touched.incharge && !!errors.incharge}
                    helperText={touched.incharge && errors.incharge}
                    // "Filter":"parentID='${compID}' AND EmployeeID='${EMPID}'" ,
                    url={`${listViewurl}?data={"Query":{"AccessID":"2111","ScreenName":"Project Incharge","Filter":"parentID='${CompanyID}'","Any":""}}`}
                  />

                  <CheckinAutocomplete
                    name="projectOwner"
                    label="Project Owner"
                    // label={
                    //   <>
                    //     Project Owner
                    //     <span style={{ color: "red", fontSize: "20px" }}>
                    //       *
                    //     </span>
                    //   </>
                    // }
                    variant="outlined"
                    id="projectOwner"
                    value={values.projectOwner}
                    onChange={(newValue) => {
                      setFieldValue("projectOwner", {
                        RecordID: newValue.RecordID,
                        Code: newValue.Code,
                        Name: newValue.Name,
                      });
                      console.log(newValue, "--newvalue projectOwner");

                      console.log(newValue.RecordID, "projectOwner RecordID");
                    }}
                    // error={!!touched.projectOwner && !!errors.projectOwner}
                    // helperText={touched.projectOwner && errors.projectOwner}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2102","ScreenName":"Customer","Filter":"parentID=${CompanyID}","Any":""}}`}
                  />
                  {/* {touched.incharge && errors.incharge && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                          {errors.incharge}
                        </div>
                      )} */}

                  {/* <FormControl
                    focused
                    variant="standard"
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <InputLabel id="status">Current Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="currentstatus"
                      name="currentstatus"
                      value={values.currentstatus}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="Current">Current</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Old">Old</MenuItem>

                    </Select>
                  </FormControl> */}
                  {/* <FormControl
                    focused
                    variant="standard"
                  // sx={{ gridColumn: "span 2" }}
                  > */}
                  {/* <InputLabel id="CurrentStatus">Status<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel> */}
                  <TextField
                    labelId="demo"
                    id="CurrentStatus"
                    name="CurrentStatus"
                    type="text"
                    label={
                      <>
                        Status
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </>
                    }
                    // required
                    focused
                    select
                    variant="standard"
                    error={!!touched.CurrentStatus && !!errors.CurrentStatus}
                    helperText={touched.CurrentStatus && errors.CurrentStatus}
                    value={mode == "A" ? "CU" : values.CurrentStatus}
                    // value={values.CurrentStatus}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("CurrentStatus", e.target.value);
                      if (e.target.value == "CU") {
                        setFieldValue("disable", false);
                      } else {
                        setFieldValue("disable", true);
                      }
                    }}
                  >
                    <MenuItem value="CU">Current</MenuItem>
                    <MenuItem value="CO">Completed</MenuItem>
                    <MenuItem value="H">Hold</MenuItem>
                  </TextField>
                 

                  <TextField
                    name="sortorder"
                    type="number"
                    id="sortorder"
                    label="Sort Order"
                    variant="standard"
                    focused
                    value={values.sortorder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortorder && !!errors.sortorder}
                    helperText={touched.sortorder && errors.sortorder}
                    sx={{ background: "" }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 8);
                    }}
                  />

                   <Box>
                    {/* <Box display="flex" flexDirection="row" gap={formGap}>
                    <Box display="flex" alignItems="center"> */}
                    <Field
                      type="checkbox"
                      name="Routine"
                      id="Routine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                      // htmlFor="Routine" sx={{ ml: 1,marginLeft:0 }}
                    >
                      Routine Tasks
                    </FormLabel>
                    {/* <Field
                      type="checkbox"
                      name="ServiceMaintenance"
                      id="ServiceMaintenance"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                      // htmlFor="ServiceMaintenance"
                      // sx={{ ml: 1,marginLeft:0}}
                    >
                      Service & Maintenance
                    </FormLabel> */}
                    <Field
                      type="checkbox"
                      name="ByProduct"
                      id="ByProduct"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                      // htmlFor="ServiceMaintenance"
                      // sx={{ ml: 1,marginLeft:0}}
                    >
                      Product
                    </FormLabel>

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
                </Box>
                <Typography variant="h5" padding={1}>
                  Costing:
                </Typography>

                {values.ByProduct === true ? (
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
                      //fullWidth
                      variant="standard"
                      type="number"
                      id="price"
                      name="price"
                      value={values.price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Price (If it is a product)"
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />{" "}
                  </Box>
                ) : (
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
                      fullWidth
                      variant="standard"
                      type="number"
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="Budget"
                      label={
                        <>
                          Budget
                          {/* <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span> */}
                        </>
                      }
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      error={!!touched.budget && !!errors.budget}
                      helperText={touched.budget && errors.budget}
                      focused
                      InputProps={{
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="scheduled"
                      name="scheduled"
                      value={values.scheduled}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Scheduled Cost"
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="actual"
                      name="actual"
                      value={values.actual}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Actual Cost"
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      id="OtherExpenses"
                      name="OtherExpenses"
                      value={values.OtherExpenses}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Other Expenses"
                      sx={{
                        gridColumn: "span 1",
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#ffffff", // Ensure the filled variant also has a white background
                        },
                      }}
                      focused
                      InputProps={{
                        readOnly: true,
                        inputProps: {
                          style: {
                            textAlign: "right",
                          },
                        },
                      }}
                    />

                    {/* </FormControl> */}
                  </Box>
                )}

                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                  {YearFlag == "true" ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      type="submit"
                      loading={isLoading}
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
                  {/* {YearFlag == "true" && mode == "E" ? (
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
                            Fnsave(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : // <Button
                    //   color="error"
                    //   variant="contained"
                    //   disabled={true}
                    // >
                    //   Delete
                    // </Button>
                    null} */}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      // navigate("/Apps/TR133/Project");
                      navigate(-1);
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

export default Editproject;
