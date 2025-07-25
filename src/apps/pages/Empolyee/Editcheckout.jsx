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
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Breadcrumbs,
  Paper,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
// import {  HsnSchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/utils";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";
// import CryptoJS from "crypto-js";
const Editcheckout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  console.log("Editcheckout hi");
  const navigate = useNavigate();
  let params = useParams();
  console.log(
    "🚀 ~ file: Editcheckout.jsx:45 ~ Editcheckout ~ params:",
    params
  );
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  const location = useLocation();
  const state = location.state || {};

  console.log(state, "checkout");
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };

  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split("T")[0];
  console.log("checkout", data.EmployeeName);
  const InitialValue = {
    checkouttype: data.CheckOutType,
    date: data.HiddenDate,
    comment: data.CheckOutComment,
    checkouttime: data.CheckOutTime,
    Employee: data.EmployeeID
      ? {
          RecordID: data.EmployeeID,
          Code: data.EmployeeCode,
          Name: data.EmployeeName,
        }
      : null,
      Location: data.LocationRecID
      ? {
          RecordID: data.LocationRecID,
          Code: data.LocationCode,
          Name: data.LocationName,
        }
      : null, 
      Gate: data.GateRecID
      ? {
          RecordID: data.GateRecID,
          Code: data.GateCode,
          Name: data.GateName,
        }
      : null, 
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
      CheckOutType: values.checkouttype,
      CheckOutDate: values.date,
      CheckOutComment: values.comment,
      EmployeeID: values.Employee.RecordID || 0,
      EmployeeName:values.Employee.Name || "",
      // EmployeeID: selectEMPLOYEELookupData.EMPLOYEElookupRecordid,
      LocationRecID:  values.Location.RecordID || 0,
      LocationName: values.Location.Name || "",
      GateName: values.Gate.Name || 0,
      // LocationRecID: locationLookup.locationRecordID,
      GateRecID: values.Gate.RecordID || 0,
      // GateRecID: gateLookup.gateRecordID,
      CheckOutTime: values.checkouttime,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectEMPLOYEELookupData, setselectEMPLOYEELookupData] =
    React.useState({
      EMPLOYEElookupRecordid: "",
      EMPLOYEElookupCode: "",
      EMPLOYEElookupDesc: "",
    });
  const [locationLookup, SetLocationLookup] = useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [gateLookup, SetGateLookup] = useState({
    gateRecordID: "",
    gateCode: "",
    gateName: "",
  });
  if (isPopupData == false) {
    selectEMPLOYEELookupData.EMPLOYEElookupRecordid = data.EmployeeID;
    selectEMPLOYEELookupData.EMPLOYEElookupCode = data.EmployeeCode;
    selectEMPLOYEELookupData.EMPLOYEElookupDesc = data.EmployeeName;

    //Location
    locationLookup.locationRecordID = data.LocationRecID;
    locationLookup.locationCode = data.LocationCode;
    locationLookup.locationName = data.LocationName;

    //Gate
    gateLookup.gateRecordID = data.GateRecID;
    gateLookup.gateCode = data.GateCode;
    gateLookup.gateName = data.GateName;
  }

  const [openEMPLOYEEPopup, setOpenEMPLOYEEPopup] = useState(false);
  const [openLOCATIONPopup, setOpenLOCATIONPopup] = useState(false);
  const [openGATEPopup, setOpenGATEPopup] = useState(false);
  function handleShow(type) {
    if (type == "EMPLOYEE") {
      setOpenEMPLOYEEPopup(true);
    }
    if (type == "LOCATION") {
      setOpenLOCATIONPopup(true);
    }
    if (type == "GATE") {
      setOpenGATEPopup(true);
    }
  }
  /************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Employee") {
      setisPopupdata(true);
      setselectEMPLOYEELookupData({
        EMPLOYEElookupRecordid: childdata.RecordID,
        EMPLOYEElookupCode: childdata.Code,
        EMPLOYEElookupDesc: childdata.Name,
      });
      setOpenEMPLOYEEPopup(false);
    }
    if (type == "Location") {
      setisPopupdata(true);
      SetLocationLookup({
        locationCode: childdata.Code,
        locationName: childdata.Name,
        locationRecordID: childdata.RecordID,
      });
      // console.log(locationLookup)
      setOpenLOCATIONPopup(false);
    }
    if (type == "Gate") {
      setisPopupdata(true);
      SetGateLookup({
        gateRecordID: childdata.RecordID,
        gateCode: childdata.Code,
        gateName: childdata.Name,
      });

      setOpenGATEPopup(false);
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
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
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
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR027/Employee");
                }}
              >
                {`Employee(${state.EmpName})`}
              </Typography>
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
              >
                Check Out
              </Typography>
            </Breadcrumbs>
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
          {/* // <Box m="20px"> */}
          <Formik
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            //  validationSchema={ HsnSchema}
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
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Productautocomplete
                        name="Employee"
                        label=
                       
                        {
                          <span>
                            Employee Id
                            <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                          </span>
                        }
                        variant="outlined"
                        id="Employee"
                        // value={selectEMPLOYEELookupData}
                        value={values.Employee}
                        onChange={(newValue) => {
                          setFieldValue("Employee", newValue);
                          console.log(newValue, "--newvalue Employee");
                          console.log(newValue.RecordID, "Employee RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
                      />
                      {/* <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={selectEMPLOYEELookupData.EMPLOYEERecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Employee Id"
                        variant="standard"
                        value={selectEMPLOYEELookupData.EMPLOYEElookupCode}
                        focused
                        required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                         onClick={() => handleShow("EMPLOYEE")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton> */}
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                      {/* <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      /> */}
                    </FormControl>
                  </FormControl>
                  <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* <TextField
                      id="outlined-basic"
                      label="ID"
                      variant="standard"
                      value={locationLookup.locationRecordID}
                      focused
                      sx={{ display: "none" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Location"
                      variant="standard"
                      value={locationLookup.locationCode}
                      focused
                      required
                      DESIGN
                      inputProps={{ tabIndex: "-1" }}
                    /> */}
                    {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                    {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                    {/* </Button> */}
                    {/* <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("LOCATION")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="standard"
                      value={locationLookup.locationName}
                      fullWidth
                      focused
                      inputProps={{ tabIndex: "-1" }}
                    /> */}
                     <Productautocomplete
                        name="Location"
                        label=
                        {
                          <span>
                           Location 
                           <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                           </span>
                        }
                        variant="outlined"
                        id="Location"
                        // value={selectLocationLookupData}
                        value={values.Location}
                        onChange={(newValue) => {
                          setFieldValue("Location", newValue);
                          console.log(newValue, "--newvalue Location");
                          console.log(newValue.RecordID, "Location RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID='${CompanyID}'","Any":""}}`}
                      />
                  </FormControl>
                  <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* <TextField
                      id="outlined-basic"
                      label="ID"
                      variant="standard"
                      value={gateLookup.gateRecordID}
                      focused
                      sx={{ display: "none" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Gate"
                      variant="standard"
                      value={gateLookup.gateCode}
                      focused
                      required
                      DESIGN
                      inputProps={{ tabIndex: "-1" }}
                    /> */}
                    {/* <Button  variant='contained'  sx={{height:'30px',width:'30px',mt:'9px'}} > */}
                    {/* <MoreHorizIcon onClick={()=>handleShow('DE')} color='white' sx={{height:'30px',}} mt='15px' fontSize='medium' /> */}
                    {/* </Button> */}
                    {/* <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleShow("GATE")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="standard"
                      value={gateLookup.gateName}
                      fullWidth
                      focused
                      inputProps={{ tabIndex: "-1" }}
                    /> */}
<Productautocomplete
                        name="Gate"
                        label=
                        {
                          <span>
                           Gate 
                           <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                           </span>
                        }
                        variant="outlined"
                        id="Gate"
                        // value={selectGateLookupData}
                        value={values.Gate}
                        onChange={(newValue) => {
                          setFieldValue("Gate", newValue);
                          console.log(newValue, "--newvalue Gate");
                          console.log(newValue.RecordID, "Gate RecordID");
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID='${values.Location ? values.Location.RecordID : 0}'","Any":""}}`}
                      />


                  </FormControl>
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Check Out Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{ gridColumn: "span 2", background: "" }}
                    inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />
                  <FormControl
                    focused
                    variant="standard"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="checkouttype"
                      name="checkouttype"
                      value={values.checkouttype}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="R">Regular</MenuItem>
                      <MenuItem value="L">Late</MenuItem>
                      <MenuItem value="P">Permission</MenuItem>
                      <MenuItem value="O">Onduty</MenuItem>
                      <MenuItem value="V">Leave</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="checkouttime"
                    type="time"
                    id="checkouttime"
                    label="Check Out Time"
                    inputFormat="HH:mm:aa"
                    value={values.checkouttime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    sx={{ gridColumn: "span 2", background: "" }}
                    variant="standard"
                  />
                  <TextField
                    name="comment"
                    type="text"
                    id="comment"
                    label="Check Out Comment"
                    variant="standard"
                    focused
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    sx={{
                      gridColumn: "span 2",
                      backgroundColor: "", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "", // Ensure the filled variant also has a white background
                      },
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
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
                  )}{" "}
                  {YearFlag == "true" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Fnsave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button color="error" variant="contained" disabled={true}>
                      Delete
                    </Button>
                  )}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Popup
            title="Employee"
            openPopup={openEMPLOYEEPopup}
            setOpenPopup={setOpenEMPLOYEEPopup}
          >
            <Listviewpopup
              accessID="2024"
              screenName="Employee"
              childToParent={childToParent}
              filterName={"CompanyID"}
              filterValue={CompanyID}
            />
          </Popup>
          <Popup
            title="Location"
            openPopup={openLOCATIONPopup}
            setOpenPopup={setOpenLOCATIONPopup}
          >
            <Listviewpopup
              accessID="2051"
              screenName="Location"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={CompanyID}
            />
          </Popup>
          <Popup
            title="Gate"
            openPopup={openGATEPopup}
            setOpenPopup={setOpenGATEPopup}
          >
            <Listviewpopup
              accessID="2050"
              screenName="Gate"
              childToParent={childToParent}
              filterName={"parentID"}
              filterValue={locationLookup.locationRecordID}
            />
          </Popup>
          {/* </Box> */}
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editcheckout;
