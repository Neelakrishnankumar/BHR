import {
  TextField,
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  FormControlLabel,
  Tooltip,
  Checkbox,
  Breadcrumbs,
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
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { LocationSchema } from "../../Security/validation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { formGap } from "../../../ui-components/utils";
import { SingleFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import store from "../../..";
import * as Yup from "yup";
// import CryptoJS from "crypto-js";
const Editlocation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  const CompanyRecordID = sessionStorage.getItem("compID");
  var accessID = params.accessID;
  var parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  // const CompanyID = sessionStorage.getItem("compID");
  //console.log(CompanyID,"comppppid");

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
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

        let schemaFields = {};

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.GeoLoc.code);
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

  const rowData = location.state || {};


  const InitialValue = {
    code: data.Code,
    name: data.Name,
    address: data.Address,
    contactmail: data.Email,
    contactnumber: data.ContactPersonNum,
    locationnumber: data.Number,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    // contactperson: data.ContactPerson ? {RecordID:data.ContactPerson,Code:data.ContactPersonCode,Name:data.ContactPersonName} : null
    delete: data.DeleteFlag === "Y" ? true : false

  };

  const Fnsave = async (values) => {
    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Address: values.address,
      Email: values.contactmail,
      ContactPersonNum: values.contactnumber,
      Number: values.locationnumber,
      SortOrder: values.sortorder || 0,
      Disable: values.disable == true ? "Y" : "N",
      DeleteFlag: values.delete == true ? "Y" : "N",
      CompanyRecordID,
      // ContactPerson: values.contactperson ? values.contactperson.RecordID : 0,
      // ContactPersonCode: values.contactperson ? values.contactperson.Code : '' ,
      // ContactPersonName: values.contactperson ? values.contactperson.Name : "",
      ContactPerson: selectCPLookupData.CPlookupRecordid || 0,
      //Finyear,
      //CompanyID,
    };

    let action = mode === "A" ? "insert" : "update";
    const data = await dispatch(postData({ accessID, action, idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);

      navigate("/Apps/TR128/Location");
    } else {
      toast.error(data.payload.Msg);
    }
  };
  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectCPLookupData, setselectCPLookupData] = React.useState({
    CPlookupRecordid: "",
    CPlookupCode: "",
    CPlookupDesc: "",
  });
  if (isPopupData == false) {
    selectCPLookupData.CPlookupRecordid = data.ContactPerson;
    selectCPLookupData.CPlookupCode = data.ContactPersonCode;
    selectCPLookupData.CPlookupDesc = data.ContactPersonName;
  }

  const [openCPPopup, setOpenCPPopup] = useState(false);
  function handleShow(type) {
    if (type == "CP") {
      setOpenCPPopup(true);
    }
  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "Employee") {
      setisPopupdata(true);
      setselectCPLookupData({
        CPlookupRecordid: childdata.RecordID,
        CPlookupCode: childdata.Code,
        CPlookupDesc: childdata.Name,
      });
      setOpenCPPopup(false);
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
          navigate("/Apps/TR128/Location");
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
              {/* <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR014/Company");
                }}
              >
             {`Company(${rowData.CompanyName})`}
              </Typography> */}
              <Typography
                variant="h5"
                color="#0000D1"
                sx={{ cursor: "default" }}
                onClick={() => {
                  navigate("/Apps/TR128/Location");
                }}
              >
                {mode === "E" ? `Location(${rowData.LocationName})` : "Location(New)"}

                {/* {`Location(${rowData.LocationName})`} */}

              </Typography>

              {/* <Typography variant="h3">Location</Typography> */}
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
              setFieldValue
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
                    sx={{ gridColumn: "span 2" }}
                    autoFocus
                  /> */}
                  {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      variant="standard"
                      placeholder="Auto"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      sx={{

                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                        },
                        gridColumn: "span 2"
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
                          Code<span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                      sx={{

                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                        },
                        gridColumn: "span 2"
                      }}
                      autoFocus

                    />
                  )}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label="Name"
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="address"
                    type="text"
                    id="address"
                    label="Address"
                    variant="standard"
                    focused
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    name="locationnumber"
                    type="number"
                    id="locationnumber"
                    label="Location Number"
                    variant="standard"
                    focused
                    value={values.locationnumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.locationnumber && !!errors.locationnumber}
                    helperText={touched.locationnumber && errors.locationnumber}
                    sx={{ gridColumn: "span 2", background: "" }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="contactnumber"
                    type="number"
                    id="contactnumber"
                    label="Contact Number"
                    variant="standard"
                    focused
                    value={values.contactnumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.locationnumber && !!errors.locationnumber}
                    helperText={touched.locationnumber && errors.locationnumber}
                    sx={{ gridColumn: "span 2", background: "" }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="contactmail"
                    type="text"
                    id="contactmail"
                    label="Contact Email ID"
                    variant="standard"
                    focused
                    value={values.contactmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.contactmail && !!errors.contactmail}
                    helperText={touched.contactmail && errors.contactmail}
                    sx={{ gridColumn: "span 2" }}
                  />
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
                    sx={{ gridColumn: "span 2", background: "" }}
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
                </Box>
                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Save
                  </LoadingButton>

                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(
                        -1
                        // `/Apps/Secondarylistview/TR128/Location/${parentID}`
                      );
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
            openPopup={openCPPopup}
            setOpenPopup={setOpenCPPopup}
          >
            <Listviewpopup
              accessID="2024"
              screenName="Employee"
              childToParent={childToParent}
              filterName={"CompanyID"}
              filterValue={CompanyRecordID}
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

export default Editlocation;
