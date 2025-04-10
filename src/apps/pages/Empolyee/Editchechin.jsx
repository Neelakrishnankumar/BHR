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
  MenuItem,
  InputLabel,
  Select,
  LinearProgress,
  Paper,
  Breadcrumbs
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
import { formGap } from "../../../ui-components/global/utils";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";
// import CryptoJS from "crypto-js";
const Editcheckin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  // var parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const location = useLocation();
  const state=location.state || {};
  console.log(state,"checkin");
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "5px",
    backgroundColor: "#EDEDED",
  };
console.log(data.EmployeeName);
  // *************** INITIALVALUE  *************** //
  const currentDate = new Date().toISOString().split('T')[0];
  const InitialValue = {
    checkintype: data.CheckInType,
    date: mode == "A" ? currentDate : data.HiddenDate,
    comment: data.CheckInComment,
    checkintime: data.CheckInTime,
    disable: data.WorkAtHome === "Y" ? false : true,
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
    if (values.disable == false) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CheckInType: values.checkintype,
      CheckInDate: values.date,
      CheckInComment: values.comment,
      //EmployeeID: selectEMPLOYEELookupData.EMPLOYEElookupRecordid,
      EmployeeID:values.employee.RecordID || 0,
      WorkAtHome: isCheck,
      // LocationRecID: locationLookup.locationRecordID,
      // GateRecID: gateLookup.gateRecordID,
      LocationRecID: values.location.RecordID || 0,
      GateRecID: values.gate.RecordID || 0,
      CheckInTime: values.checkintime,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
      //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
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
  const [locationLookup, SetLocationLookup] = React.useState({
    locationRecordID: "",
    locationCode: "",
    locationName: "",
  });
  const [gateLookup, SetGateLookup] = React.useState({
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
  const [locgate, setLocgate] = useState(null);
  const [empID, setEmpID] = useState(null);
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
      if (mode == "A") {
        SetLocationLookup({
          locationCode: childdata.LocationCode,
          locationName: childdata.LocationName,
          locationRecordID: childdata.LocationRecID,
        });
        SetGateLookup({
          gateRecordID: childdata.GateRecID,
          gateCode: childdata.GateCode,
          gateName: childdata.GateName,
        });
      }
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
    //   if(Object.keys(ref.current.touched).length === 0){
    //     if(props === 'Logout'){
    //       navigate("/")}
    //       if(props === 'Close'){
    //         navigate("/Apps/TR022/Bank Master")
    //       }

    //       return
    //  }
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
          //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
          navigate("/Apps/TR123/Check In");
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      {/* <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
          {broken && !rtl && (
            <IconButton onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h3">Check In</Typography>
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
      </Box> */}
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
                navigate(-1);
              }}
            >
              {`Employee(${state.EmpName})`}
            </Typography>
            <Typography
              color="#0000D1"
              sx={{ cursor: "default" }}
             
            >
              Check In
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
              setFieldValue
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
                  {/* <FormControl sx={{ gridColumn: "span 2", display: "flex" }}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
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
                      {mode == "A" ? (
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("EMPLOYEE")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ height: 40, width: 40 }}
                          onClick={() => handleShow("EMPLOYEE")}
                        >
                          <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                        </IconButton>
                      )}

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={selectEMPLOYEELookupData.EMPLOYEElookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                  </FormControl> */}
                  <FormControl
                    sx={{
                     
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Productautocomplete
                      name="employee"
                      label="Employee"
                      id="employee"
                      value={values.employee}
                      onChange={(newValue) => {
                        setFieldValue("employee", newValue);
                        setEmpID(newValue.RecordID);
                        console.log(newValue.RecordID, "recid");

                      }}
                      
                      url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Location","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                    />
                  </FormControl>
                  <FormControl
                    sx={{
                      
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Productautocomplete
                      name="location"
                      label="Location"
                      id="location"
                      value={values.location}
                      onChange={(newValue) => {
                        setFieldValue("location", newValue);
                        setLocgate(newValue.RecordID);
                        console.log(newValue.RecordID, "recid");

                      }}
                      
                      url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2051","ScreenName":"Location","Filter":"parentID=${CompanyID}","Any":""}}`}
                    />
                  </FormControl>
                  {/* <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
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
                    />
                  
                    <IconButton
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
                    />
                  </FormControl> */}                 
                  {/* <FormControl
                    sx={{
                      gridColumn: "span 2",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
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
                    />
                    <IconButton
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
                    />
                  </FormControl> */}
                   <FormControl
                    sx={{
                     
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Productautocomplete
                      name="gate"
                      label="Gate"
                      id="gate"
                      value={values.gate}
                      onChange={(newValue) => {
                        setFieldValue("gate", newValue)

                      }}
                      //  onChange={handleSelectionFunctionname}
                      // defaultValue={selectedFunctionName}
                      url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID=${locgate}","Any":""}}`}
                      //url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2050","ScreenName":"Gate","Filter":"parentID=${locgate} AND CompanyID=${CompId}","Any":""}}`}

                    />
                  </FormControl>
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Check In Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{background: "#f5f5f5" }}
                    inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />

                  <FormControl
                    focused
                    variant="standard"
                   
                  >
                    <InputLabel id="status">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="checkintype"
                      name="checkintype"
                      value={values.checkintype}
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
                    name="checkintime"
                    type="time"
                    id="checkintime"
                    label="Check In Time"
                    inputFormat="HH:mm:aa"
                    variant="standard"
                    value={values.checkintime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    sx={{  background: "#f5f5f5" }}
                  />
                  <TextField
                    name="comment"
                    type="text"
                    id="comment"
                    label="Check In Comment"
                    variant="standard"
                    focused
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    sx={{
                     
                      backgroundColor: "#f5f5f5", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }} />
                  <Box>
                    <Field
                      //  size="small"
                      type="checkbox"
                      name="disable"
                      id="disable"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Work From Home"
                    />
                    <FormLabel focused={true}>Work From Home</FormLabel>
                  </Box>
                </Box>
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
                  )} {YearFlag == "true" ? (
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
                    <Button
                      color="error"
                      variant="contained"
                      disabled={true}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
                      navigate(-1);
                      // navigate("/Apps/Secondarylistview/TR123/Check In/");
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
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editcheckin;
