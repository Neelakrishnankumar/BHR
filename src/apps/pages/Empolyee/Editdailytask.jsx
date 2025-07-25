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
  Breadcrumbs,
  LinearProgress,
  Paper
} from "@mui/material";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/global/utils";
import Popup from "../popup";
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
import { DailytaskSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";

const EditDailytask = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const statenew = location.state || {};
console.log(statenew,"dailytask");
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);

  // ***************  DAILY TASK  LOOKUP  *************** //

  const [employeeLookup, SetEmployeeLookup] = useState({
    empRecordID: "",
    empCode: "",
    empName: "",
  });

  const [functionLookup, SetFunctionLookup] = useState({
    funRecordID: "",
    funCode: "",
    funName: "",
  });
  const [projectLookup, SetProjectLookup] = useState({
    proRecordID: "",
    proCode: "",
    proName: "",
  });
  const [empID, setEmpID] = useState(null);
  const [openPopup, setIsOpenPopup] = useState(false);
  const [openEMPPopup, setOpenEMPPopup] = useState(false);
  const [openFUNPopup, setOpenFUNPopup] = useState(false);
  const [openPROPopup, setOpenPROPopup] = useState(false);

  function handleOpen(type) {
    if (type == "EMP") {
      setOpenEMPPopup(true);
    }
    if (type == "FUN") {
      setOpenFUNPopup(true);
    }
    if (type == "PRO") {
      setOpenPROPopup(true);
    }
  }
  if (openPopup == false) {
    employeeLookup.empRecordID = data.EmployeesID;
    employeeLookup.empCode = data.EmployeeCode;
    employeeLookup.empName = data.EmployeeName;

    functionLookup.funRecordID = data.FunctionsID;
    functionLookup.funCode = data.FunctionsCode;
    functionLookup.funName = data.FuntionsName;

    projectLookup.proRecordID = data.ProjectID;
    projectLookup.proCode = data.ProjectCode;
    projectLookup.proName = data.ProjectName;
  }

  const childToParent = (childdata, type) => {
    console.log(
      "🚀 ~ file: Editproduct.jsx:288 ~ childToParent ~ childdata:",
      childdata
    );

    if (type == "Employee") {
      SetEmployeeLookup({
        empRecordID: childdata.RecordID,
        empCode: childdata.Code,
        empName: childdata.Name,
      });
      setOpenEMPPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Function") {
      SetFunctionLookup({
        funRecordID: childdata.RecordID,
        funCode: childdata.Code,
        funName: childdata.Name,
      });
      setOpenFUNPopup(false);
      setIsOpenPopup(true);
    }
    if (type == "Project") {
      SetProjectLookup({
        proRecordID: childdata.RecordID,
        proCode: childdata.Code,
        proName: childdata.Name,
      });
      setOpenPROPopup(false);
      setIsOpenPopup(true);
    }
  };
  // *************** INITIALVALUE  *************** //
  const dailyTaskInitialValue = {
    code: data.Code,
    description: data.Name,
    date: data.TaskDate,
    status: data.Status,
    Comment: data.Comments,
    sortOrder: data.SortOrder,
    disable: data.Disable === "Y" ? false : true,
     ProName: data.ProjectID
      ? {
          RecordID: data.ProjectID,
          Code: data.ProjectCode,
          Name: data.ProjectName,
        }
      : null, 
       FunName: data.FunctionsID
      ? {
          RecordID: data.FunctionsID,
          Code: data.FunctionCode,
          Name: data.FunctionName,
        }
      : null, 
  };

  const DTSaveFn = async (values, del) => {
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
      parentID,
      RecordID: recID,
      Code: values.code,
      Name: values.description,
      TaskDate: values.date,
      Status: values.status,
      Comments: values.Comment,
      SortOrder: values.sortOrder || 0,
      Disable: isCheck,
      //EmployeeID: values.employee.RecordID || 0,
     
      FunctionsID: values.FunName.RecordID || 0,
      FunctionName: values.FunName.Name || "s",
      ProjectID: values.ProName.RecordID || 0,
      ProjectName: values.ProName.Name || "",
      EmployeesID: employeeLookup.empRecordID,
      //FunctionsID: functionLookup.funRecordID,
      //ProjectID: projectLookup.proRecordID,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(`/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}`);
    } else {
      toast.error(response.payload.Msg);
    }
  };
  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
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
          navigate(`/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}`);
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
                navigate("/Apps/TR123/Check%20In");
              }}
            >
              Check In
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                navigate("/Apps/Secondarylistview/TR132/DailyTask/30");
              }}
            >
              DailyTask
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
                navigate("/Apps/TR027/Employee");
              }}
            >
             {`Employee(${statenew.EmpName})`}
            </Typography>
            {/* <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              onClick={() => {
                //navigate("/Apps/TR123/Check%20In");
                navigate(-1);
              }}
            >
               {`Check In(${statenew.Locname})`}
            </Typography> */}
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
              // onClick={() => {
              //   navigate("/Apps/Secondarylistview/TR132/DailyTask/30");
              // }}
            >
             {/* {`Daily Task(${statenew.proName})`} */}
             Daily Task
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
       <Paper elevation={3} sx={{ margin: "10px"}}>
          <Formik
            initialValues={dailyTaskInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                DTSaveFn(values);
              }, 100);
            }}
            validationSchema={DailytaskSchema}
            enableReinitialize={true}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit, setFieldValue
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
                  {/* <TextField
                    name="code"
                    type="text"
                    id="code"
                    label="Code"
                    variant="standard"
                    focused
                    required
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    autoFocus
                    //sx={{ gridColumn: "span 2" }}
                  /> */}

                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gridColumn: "span 2",
                    }}
                  >
                    <TextField
                      id="funCode"
                      label="Function"
                      variant="standard"
                      value={functionLookup.funCode}
                      focused
                      required
                      inputProps={{ tabIndex: "-1" }}
                    />
                    <IconButton
                      sx={{ height: 40, width: 40 }}
                      onClick={() => handleOpen("FUN")}
                    >
                      <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                    </IconButton>

                    <TextField
                      id="funDesc"
                      variant="standard"
                      value={functionLookup.funName}
                      fullWidth
                      inputProps={{ tabIndex: "-1" }}
                      focused
                    />
                  </Box> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                     
                    }}
                  >


                    <Productautocomplete
                      name="FunName"
                      label="Function"
                      id="FunName"
                      value={values.FunName}
                      onChange={(newValue) => {
                        setFieldValue("FunName", newValue)
                        console.log(newValue);
                      }}
                      //  onChange={handleSelectionFunctionname}
                      // defaultValue={selectedFunctionName}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2048","ScreenName":"Function","Filter":"CompanyID=${CompanyID}","Any":""}}`}

                    />

                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    

                    }}
                  >

                    <Productautocomplete
                      name="ProName"
                      label="Project"
                      id="ProName"
                      value={values.ProName}
                      onChange={(newValue) => {
                        setFieldValue("ProName", newValue)
                        console.log(newValue);
                      }}
                      //value={selectedProjectOptions}
                      //onChange={handleSelectionProjectname}
                      // defaultValue={selectedProjectName}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID=${CompanyID}","Any":""}}`}

                    />

                  </Box>


                  <TextField
                    name="description"
                    type="text"
                    id="description"
                    label="Description"
                    variant="standard"
                    focused
                    //sx={{ gridColumn: "span 2" }}
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    autoFocus

                  />

                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Date"
                    inputFormat="YYYY-MM-DD"
                    variant="standard"
                    focused

                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    autoFocus
                    //sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl
                    focused
                    variant="standard"
                    //sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="status"
                      name="status"
                      value={values.status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="N">Not yet started</MenuItem>
                      <MenuItem value="I">Inprogress</MenuItem>
                      <MenuItem value="C">Completed</MenuItem>
                      <MenuItem value="T">Transfer to</MenuItem>
                    </Select>
                  </FormControl>

                  {values.status == "T" ? (
                    <Box
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

                        url={`${listViewurl}?data={"Query":{"AccessID":"2024","ScreenName":"Location","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                      />
                    </Box>
                  ) : (
                    false
                  )}
                  <TextField
                    name="Comment"
                    type="text"
                    id="Comment"
                    label="Comment"
                    variant="standard"
                    focused
                    value={values.Comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Comment && !!errors.Comment}
                    helperText={touched.Comment && errors.Comment}
                    autoFocus
                    //sx={{ gridColumn: "span 2" }}

                  />
                  <TextField
                    name="sortOrder"
                    type="number"
                    id="sortOrder"
                    label="Sort Order"
                    variant="standard"
                    focused
                    value={values.sortOrder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortOrder && !!errors.sortOrder}
                    helperText={touched.sortOrder && errors.sortOrder}
                    autoFocus
                    //sx={{ gridColumn: "span 2" }}
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
                        DTSaveFn(values, "harddelete");
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
                      //navigate(`/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}`);
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
            title="Function"
            openPopup={openFUNPopup}
            setOpenPopup={setOpenFUNPopup}
          >
            <Listviewpopup
              accessID="2048"
              screenName="Function"
              childToParent={childToParent}
            />
          </Popup>

          <Popup
            title="Project"
            openPopup={openPROPopup}
            setOpenPopup={setOpenPROPopup}
          >
            <Listviewpopup
              accessID="2054"
              screenName="Project"
              childToParent={childToParent}
            />
          </Popup>

          <Popup
            title="Employee"
            openPopup={openEMPPopup}
            setOpenPopup={setOpenEMPPopup}
          >
            <Listviewpopup
              accessID="2024"
              screenName="Employee"
              childToParent={childToParent}
            />
          </Popup>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default EditDailytask;
