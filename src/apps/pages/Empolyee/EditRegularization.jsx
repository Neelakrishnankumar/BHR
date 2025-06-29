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
  MenuItem,
  Select,
  LinearProgress,
  Paper,Breadcrumbs
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
import { postData,getFetchData, setReg } from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { formGap } from "../../../ui-components/utils";

 const Regularization = ({ onCancel }) => {
  //const Regularization = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const { toggleSidebar, broken, rtl } = useProSidebar();
 
const[getParams, setGetparams] = useState("");
const currentDate = new Date().toISOString().split('T')[0];
const location = useLocation();
const passedData = location.state;  // Get the passed data


  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);


  const InitialValue = {
    EmployeeID: params.id,
    Name: passedData.Name,
    CheckInDate: passedData.CheckInDate,
    CheckOutDate: passedData.CheckOutDate,
    MonthDate:currentDate,
    //MonthDate: passedData.MonthDate,
    EmplyeeCheckInDateTime: passedData.EmplyeeCheckInDateTime,
    EmplyeeCheckOutDateTime: passedData.EmplyeeCheckOutDateTime,
    Status: passedData.Status === "Present" 
            ? "P"
            : passedData.Status === "Absent"
            ? "A"
            : passedData.Status === "WeekOff"
            ? "W"
            : passedData.Status === "Irregular"
            ? "I"
            : passedData.Status === "Leave"
            ? "L"
            : "",
  };



  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    // let action =
    //   mode === "A" && !del
    //     ? "insert"
    //     : mode === "E" && del
    //     ? "harddelete"
    //     : "update";
     var isCheck = "N";
    let action = "insert"; 
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      //RecordID: values.EmployeeID,
      EmployeeID:params.id,
      RegularizationDate: values.MonthDate,
      //Name: values.Name,
      CheckInDate:passedData.CheckInDate,
      CheckOutDate: passedData.CheckOutDate,  
      //MonthDate: values.MonthDate,
      // CheckInTime: values.EmplyeeCheckInDateTime,
      // CheckOutTime: values.EmplyeeCheckOutDateTime,
      // CheckInTime: getTimeFromSplit(passedData.EmplyeeCheckInDateTime),
      // CheckOutTime: getTimeFromSplit(passedData.EmplyeeCheckOutDateTime),
      CheckInTime: passedData.EmplyeeCheckInDateTime?.split(" / ")[1] || "", 
      CheckOutTime: passedData.EmplyeeCheckOutDateTime?.split(" / ")[1] || "", 
      Status: values.Status,
      Remarks: values.remarks,
      NewCheckInDate : values.CheckInDate,
      NewCheckOutDate: values.CheckOutDate,
      NewCheckInTime:values.EmplyeeCheckInDateTime
      ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
      : "",
      NewCheckOutTime:  values.EmplyeeCheckOutDateTime
      ? values.EmplyeeCheckOutDateTime.split(" / ")[1] 
      : "",
      NewStatus: values.Status,
    };
    console.log(idata, "-idata");
    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      //navigate("/Apps/TR219/Regularization");
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
          navigate("/Apps/TR219/Regularization");
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
                  Regularization
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
            initialValues={InitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Fnsave(values);
              }, 100);
            }}
            //  validationSchema={ DesignationSchema}
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
                    type="text"
                    id="Name"
                    name="Name"
                    value={values.Name}
                    label="EmployeeName"
                    focused
                    inputProps={{ readOnly: true }}
                   //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="MonthDate"
                    type="date"
                    id="MonthDate"
                    label="Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.MonthDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.MonthDate && !!errors.MonthDate}
                    helperText={touched.MonthDate && errors.MonthDate}
                   //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="CheckInDate"
                    type="date"
                    id="CheckInDate"
                    label="Check In Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.CheckInDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.CheckInDate && !!errors.CheckInDate}
                    helperText={touched.CheckInDate && errors.CheckInDate}
                   //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="EmplyeeCheckInDateTime"
                    type="time"
                    id="EmplyeeCheckInDateTime"
                    label="Check In Time"
                      inputFormat="HH:mm"
                    // inputFormat="HH:mm:aa"
                    variant="standard"
                    //value={values.EmplyeeCheckInDateTime}
                    value={
                      values.EmplyeeCheckInDateTime
                        ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
                        : ""
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                   //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="CheckOutDate"
                    type="date"
                    id="CheckOutDate"
                    label="Check Out Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.CheckOutDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.CheckOutDate && !!errors.CheckOutDate}
                    helperText={touched.CheckOutDate && errors.CheckOutDate}
                    //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                  />

                  <TextField
                    name="EmplyeeCheckOutDateTime"
                    type="time"
                    id="EmplyeeCheckOutDateTime"
                    label="Check Out Time"
                    inputFormat="HH:mm:aa"
                    //value={values.EmplyeeCheckOutDateTime}
                    value={
                      values.EmplyeeCheckOutDateTime
                        ? values.EmplyeeCheckOutDateTime.split(" / ")[1] // gets "09:02"
                        : ""
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                    variant="standard"
                  />

                  <FormControl
                    focused
                    variant="standard"
                    //sx={{ gridColumn: "span 2", backgroundColor: "#f5f5f5" }}
                  >
                    <InputLabel id="Status">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="Status"
                      name="Status"
                      value={values.Status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="P">Present</MenuItem>
                      <MenuItem value="A">Absent</MenuItem>
                      <MenuItem value="W">WeekOff</MenuItem>
                      <MenuItem value="I">Irregular</MenuItem>
                      <MenuItem value="L">Leave</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                   variant="standard"
                    type="text"
                    label="Remarks"
                    value={values.remarks}
                    id="remarks"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="remarks"
                    error={!!touched.remarks && !!errors.remarks}
                    helperText={touched.remarks && errors.remarks}
                    focused
                    required
                    inputProps={{ maxLength: 90 }}
                   
                  />
                  {/* <Box>
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
                    </Box> */}
                </Box>
                <Box display="flex" justifyContent="end" padding={1} gap={2}>
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
                  {/* {YearFlag == "true" ? (
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
                  )} */}
                  <Button
                    color="warning"
                    variant="contained"
                    //onClick={onCancel}
                    onClick={() => {
                      // navigate(
                      //   `/Apps/TR027/Employee%20Payroll/EditEmployee%20Payroll/${recID}/E/M`
                      // );
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

export default Regularization;
