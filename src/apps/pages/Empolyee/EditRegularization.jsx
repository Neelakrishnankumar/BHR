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
  Paper, Breadcrumbs
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
import { postData, getFetchData, setReg } from "../../../store/reducers/Formapireducer";
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

  const [getParams, setGetparams] = useState("");
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
    MonthDate: currentDate,
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
      EmployeeID: params.id,
      RegularizationDate: values.MonthDate,
      //Name: values.Name,
      CheckInDate: passedData.CheckInDate,
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
      NewCheckInDate: values.CheckInDate,
      NewCheckOutDate: values.CheckOutDate,
      NewCheckInTime: values.EmplyeeCheckInDateTime,
      // ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
      // : "",
      NewCheckOutTime: values.EmplyeeCheckOutDateTime,
      // ? values.EmplyeeCheckOutDateTime.split(" / ")[1] 
      // : "",
      NewStatus: values.Status,
      RegularStatus: "",
      ManagerComments: "",
      AppliedStatus: "",
      Source: "",
      Reason: ""
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
      <Paper
        elevation={3}
        sx={{
          m: "10px",
          borderRadius: 3,
          background: "#fff",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
        >
          {/* Left Section */}
          <Box display="flex" alignItems="center" gap={2}>
            {broken && !rtl && (
              <IconButton
                onClick={() => toggleSidebar()}
                sx={{
                  bgcolor: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  "&:hover": {
                    bgcolor: "#E5E7EB",
                  },
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}

            <Box>
              <Box display="flex" alignItems="center" gap={1}>

                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1F2937",
                  }}
                >
                  Regularization
                </Typography>
              </Box>


            </Box>
          </Box>

          {/* Right Section */}
          <Box display="flex" gap={1}>
            <Tooltip title="Close">
              <IconButton
                onClick={() => fnLogOut("Close")}
                sx={{
                  //  bgcolor: "#FEF2F2",
                  color: "#DC2626",
                  // border: "1px solid #FECACA",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
                }}
              >
                <ResetTvIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                onClick={() => fnLogOut("Logout")}
                sx={{
                  //   bgcolor: "#FEF2F2",
                  color: "#DC2626",
                  //  border: "1px solid #FECACA",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
                }}
              >
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {!getLoading ? (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 3,
            p: 3,
            mx: 1,
            mt: 2,
          }}
        >
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

                <Box mb={3}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography sx={{ fontSize: 22 }}>
                      📝
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#1F2937",
                      }}
                    >
                      Attendance Regularization
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                  >
                    Update employee attendance details
                  </Typography>
                </Box>

                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    md: "1fr 1fr",
                  }}
                  gap={3}
                  // gap="30px"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="text"
                    id="Name"
                    name="Name"
                    value={values.Name}
                    label="EmployeeName"
                    inputProps={{ readOnly: true }}
                  //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="MonthDate"
                    type="date"
                    id="MonthDate"
                    label="Date"
                    variant="outlined"
                    size="small"
                    inputFormat="YYYY-MM-DD"
                    value={values.MonthDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.MonthDate && !!errors.MonthDate}
                    helperText={touched.MonthDate && errors.MonthDate}
                  //sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{shrink: true}}
                  />

                  <TextField
                    name="CheckInDate"
                    type="date"
                    id="CheckInDate"
                    label="Check In Date"
                    variant="outlined"
                    size="small"
                    inputFormat="YYYY-MM-DD"
                    value={values.CheckInDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.CheckInDate && !!errors.CheckInDate}
                    helperText={touched.CheckInDate && errors.CheckInDate}
                    InputLabelProps={{shrink: true}}
                  //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="EmplyeeCheckInDateTime"
                    type="time"
                    id="EmplyeeCheckInDateTime"
                    label="Check In Time"
                    inputFormat="HH:mm"
                    // inputFormat="HH:mm:aa"
                    variant="outlined"
                    size="small"
                    value={values.EmplyeeCheckInDateTime}
                    // value={
                    //   values.EmplyeeCheckInDateTime
                    //     ? values.EmplyeeCheckInDateTime.split(" / ")[1] // gets "09:02"
                    //     : ""
                    // }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{shrink: true}}
                  //sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    name="CheckOutDate"
                    type="date"
                    id="CheckOutDate"
                    label="Check Out Date"
                    variant="outlined"
                    size="small"
                    inputFormat="YYYY-MM-DD"
                    value={values.CheckOutDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.CheckOutDate && !!errors.CheckOutDate}
                    helperText={touched.CheckOutDate && errors.CheckOutDate}
                    InputLabelProps={{shrink: true}}
                  //sx={{ gridColumn: "span 2", background: "#f5f5f5" }}
                  />

                  <TextField
                    name="EmplyeeCheckOutDateTime"
                    type="time"
                    id="EmplyeeCheckOutDateTime"
                    label="Check Out Time"
                    inputFormat="HH:mm:aa"
                    value={values.EmplyeeCheckOutDateTime}
                    // value={
                    //   values.EmplyeeCheckOutDateTime
                    //     ? values.EmplyeeCheckOutDateTime.split(" / ")[1] // gets "09:02"
                    //     : ""
                    // }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{shrink: true}}
                  />

                  <FormControl
                    variant="outlined"
                    size="small"
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
                      label = "Type"
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
                    variant="outlined"
                    size="small"
                    type="text"
                    label="Remarks"
                    value={values.remarks}
                    id="remarks"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="remarks"
                    error={!!touched.remarks && !!errors.remarks}
                    helperText={touched.remarks && errors.remarks}
                    required
                    inputProps={{ maxLength: 90 }}
          InputLabelProps={{shrink: true}}
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
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  gap={2}
                  mt={4}
                  pt={2}
                  sx={{
                    borderTop: "1px solid #E5E7EB",
                  }}
                >
                  {YearFlag == "true" ? (
                    <LoadingButton
                      loading={isLoading}
                      type="submit"
                      variant="contained"
                      sx={{
                        px: 4,
                        borderRadius: 2,
                        textTransform: "none",
                        bgcolor: "#0D9488",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "#0F766E",
                        },
                      }}
                    >
                      Save
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      disabled
                    >
                      Save
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => navigate(-1)}
                    sx={{
                      px: 4,
                      borderRadius: 2,
                      textTransform: "none",
                      bgcolor: "#F97316",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#EA580C",
                      },
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
