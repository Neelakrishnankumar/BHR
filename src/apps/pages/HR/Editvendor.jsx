import React from "react";
import {
  TextField,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Select,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import Resizer from "react-image-file-resizer";
import store from "../../../index";
import {
  fileUpload,
  fnImageUpload,
  imageUpload,
} from "../../../store/reducers/Imguploadreducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import * as Yup from "yup";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Field, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { postData, getFetchData, PartyBankget, partyBankpostData, PartyContactget, partyContactData } from "../../../store/reducers/Formapireducer";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";

const Editvendor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Redux state
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const partyBankgetloading = useSelector((state) => state.formApi.partyBankgetloading);
  const partyBankgetdata = useSelector((state) => state.formApi.partyBankgetdata);
  const partyContactgetdata = useSelector((state) => state.formApi.partyContactgetdata);
  console.log(partyContactgetdata, "--partyContactgetdata");

  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const [panImage, setPanImage] = useState("");
  const [panUrl, setPanUrl] = useState(null);
  const [gstImage, setGstImage] = useState("");
  const [gstUrl, setGstUrl] = useState(null);
  console.log(panImage, "panImage");
  console.log(panImage.name, "panImage");
  console.log(gstImage, "gstImage");
  console.log(gstImage.name, "gstImage");
  const [show, setScreen] = React.useState("0");

  const getFilepanChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setPanImage(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  console.log(panImage, "does");
  const getFilegstChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setGstImage(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };

  // **********ScreenChange Function*********

  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "", recID }));
      }
    }
    if (event.target.value == "1") {
      dispatch(PartyContactget({ VendorID: recID }));
    }

    if (event.target.value == "2") {
      dispatch(PartyBankget({ VendorID: recID }));

    }
    // if (event.target.value == "3") {
    //   dispatch(
    //     fetchExplorelitview("TR126", "Manager", `parentID=${recID}`, "")
    //   );
    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // if (event.target.value == "4") {
    //   dispatch(getDeployment({ HeaderID: recID }));
    //   // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // if (event.target.value == "5") {
    //   dispatch(invoiceExploreGetData({ accessID: "TR209", get: "get", recID }));
    // }
    // if (event.target.value == "6") {
    //   dispatch(
    //     fetchExplorelitview("TR210", "Attachment", `EmployeeID=${recID}`, "")
    //   );
    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // if (event.target.value == "7") {
    //   dispatch(
    //     fetchExplorelitview("TR212", "itemcustody", `EmployeeID=${recID}`, "")
    //   );
    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // //Contractor
    // if (event.target.value == "8") {
    //   dispatch(
    //     fetchExplorelitview(
    //       "TR244",
    //       "Contracts In",
    //       `EmployeeID='${recID}' AND Vendors='Y'`,
    //       ""
    //     )
    //   );

    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // if (event.target.value == "11") {
    //   dispatch(
    //     fetchExplorelitview(
    //       "TR244",
    //       "Contracts Out",
    //       `EmployeeID='${recID}' AND Customer='Y'`,
    //       ""
    //     )
    //   );

    //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }
    // if (event.target.value == "9") {
    //   dispatch(geolocationData({ empID: recID }));
    //   // selectCellRowData({ rowData: {}, mode: "A", field: "" });
    // }

    // if (event.target.value == "10") {
    //   dispatch(
    //     fetchExplorelitview(
    //       "TR249",
    //       "Leave Configuration",
    //       `EmployeeID='${recID}'`,
    //       ""
    //     )
    //   );
    //   // dispatch(fetchApidata(accessID, "get", recID));
    //   selectcelldata("", "A", "");
    // }
  };
  // Page params
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;

  useEffect(() => {
    if (recID && mode === "E") {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }
    else {
      dispatch(getFetchData({ accessID, get: "", recID }));
    }
  }, [location.key, recID, mode]);

  if (!data && getLoading) {
    return <LinearProgress />;
  }

  const validationSchema = Yup.object({
    Pancardnumber: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Card Number"),
      // .required("PAN card number is required"),
    gstnumber: Yup.string()
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GST Number"
      )
      // .required("GST number is required"),
  });
  const BankvalidationSchema = Yup.object({
    bankname: Yup.string().required('Bank Name is required'),
    branchname: Yup.string().required('Branch Name is required'),
    Accounttype: Yup.string().required('Account Type is required'),
    ifsc: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
      .required('IFSC Code is required'),
    bankloc: Yup.string().required('Bank Location is required'),
    accountholdname: Yup.string().required('Account Holder Name is required'),
     accountnumber: Yup.string()
    .matches(/^\d+$/, "Account number must be digits only")
    .min(9, "Account number must be at least 9 digits")
    .max(18, "Account number can't exceed 18 digits")
    .required("Account number is required"),
    bankaddress: Yup.string().required('Bank Address is required'),
  });
  const contactvalidationSchema = Yup.object().shape({
    name1: Yup.string().required('Name is required'),
    emailid1: Yup.string()
      .email('Invalid email format')
      .required('Email ID is required'),
    mobileno1: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile No must be 10 digits')
      .required('Mobile No is required'),
    // name2: Yup.string().required('Name is required'),
    // emailid2: Yup.string()
    //   .email('Invalid email format')
    //   .required('Email ID is required'),
    // mobileno2: Yup.string()
    //   .matches(/^[0-9]{10}$/, 'Mobile No must be 10 digits')
    //   .required('Mobile No is required'),
  });
  const InitialValue = {
    code: data.Code || "",
    name: data.Name || "",
    Pancardnumber: data.PanCardNo || "",
    PanImg: data.PanImg || "",
    GstImg: data.gstImage || "",
    gstnumber: data.GstNo || "",
    mobilenumber: data.MobileNo || "",
    date: data.RegistrationDate || "",
    verifieddate: data.VerifyConfirmDate || "",
    emailid: data.EmailID || "",
    vendor: data.VendorCheckbox === "Y" ? true : false,
    customer: data.CustomerCheckbox === "Y" ? true : false,
  };
  console.log(data.PanImg, "dooo");
  const Fnsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    // var isCheck = "N";
    // if (values.disable == true) {
    //   isCheck = "Y";
    // }

    // const isCheck = values.disable ? "Y" : "N";

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      PanCardNo: values.Pancardnumber,
      PanImg: panImage,
      GstNo: values.gstnumber,
      GstImg: gstImage,
      MobileNo: values.mobilenumber,
      RegistrationDate: values.date,
      VerifyConfirmDate: values.verifieddate,
      EmailID: values.emailid,
      CompanyID,
      VendorCheckbox: values.vendor === true ? "Y" : "N",
      CustomerCheckbox: values.customer === true ? "Y" : "N",
    };

    try {
      const response = await dispatch(postData({ accessID, action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };
  //Bank details 
  console.log(partyBankgetdata, "partyBankgetdata");

  const BankInitialValue = {
    bankname: partyBankgetdata.BankName || "",
    Accounttype: partyBankgetdata.BankAccountType || "",
    branchname: partyBankgetdata.BankBranchName || "",
    ifsc: partyBankgetdata.BankIfsc || "",
    bankloc: partyBankgetdata.BankLocation || "",
    accountnumber: partyBankgetdata.BankAccountNo || "",
    bankaddress: partyBankgetdata.BankAddress || "",
    accountholdname: partyBankgetdata.BankAccountHolderName || ""

  };

  const Banksave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      VendorID: recID,
      BankName: values.bankname,
      BankBranchName: values.branchname,
      BankAccountHolderName: values.accountholdname,
      BankAccountNo: values.accountnumber,
      BankAccountType: values.Accounttype,
      BankIfsc: values.ifsc,
      BankLocation: values.bankloc,
      BankAddress: values.bankaddress,
    };

    try {
      const response = await dispatch(partyBankpostData({ action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };


  //Contact Details
  const contactInitialValue = {
    name1: partyContactgetdata.ContactPerson1 || "",
    name2: partyContactgetdata.ContactPerson2 || "",
    emailid1: partyContactgetdata.ContactPersonEmailID1 || "",
    emailid2: partyContactgetdata.ContactPersonEmailID2 || "",
    mobileno1: partyContactgetdata.ContactPersonMobileNo1 || "",
    mobileno2: partyContactgetdata.ContactPersonMobileNo2 || "",

  };
  const contactsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      VendorID: recID,
      ContactPerson1: values.name1,
      ContactPerson2: values.name2,
      ContactPersonEmailID1: values.emailid1,
      ContactPersonEmailID2: values.emailid2,
      ContactPersonMobileNo1: values.mobileno1,
      ContactPersonMobileNo2: values.mobileno2,

    };

    try {
      const response = await dispatch(partyContactData({ action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
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
          navigate("/Apps/TR243/Party");
        }
      }
    });
  };

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : null}

      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          p={mode == "A" ? 2 : 1}
        >
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
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  Party
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Contact Details
                  </Typography>
                ) : (
                  false
                )}
                {show == "2" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Bank Details
                  </Typography>
                ) : (
                  false
                )}
              </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Party</MenuItem>
                  <MenuItem value={2}>Bank Details</MenuItem>
                  <MenuItem value={1}>Contact Details</MenuItem>
                  {/* {initialValues.employeetype === "CI" ? (
                                              <MenuItem value={8}>Contracts In</MenuItem>
                                            ) : null}
                                            {initialValues.employeetype === "CO" ? (
                                              <MenuItem value={11}>Contracts Out</MenuItem>
                                            ) : null}
                                            <MenuItem value={1}>Employee Process</MenuItem> */}
                  {/* <MenuItem value={3}>Managers</MenuItem>
                                            <MenuItem value={4}>Deployment</MenuItem>
                                            <MenuItem value={9}>Geo Location</MenuItem>
                                            <MenuItem value={10}>Leave Configuration</MenuItem>
                                            <MenuItem value={6}>List of Attachments</MenuItem>
                                            <MenuItem value={7}>Item Custody</MenuItem> */}
                </Select>
              </FormControl>
            ) : (
              false
            )}
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

      {/* {!getLoading ? ( */}
      {show == "0" ? (
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
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{ readOnly: true }}
                    // autoFocus
                    />
                  ) : (<TextField
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
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />)}
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
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    required
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="Pancardnumber"
                    label="Pan Card Number"
                    variant="standard"
                    focused
                    value={values.Pancardnumber}
                    onBlur={handleBlur}
                    // required
                    onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      if (/^[A-Z0-9]*$/.test(input) || input === "") {
                        handleChange({
                          target: {
                            name: "Pancardnumber",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.Pancardnumber && !!errors.Pancardnumber}
                    helperText={touched.Pancardnumber && errors.Pancardnumber}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                  // autoFocus
                  />
                  <TextField
                    name="gstnumber"
                    label="GST Number"
                    variant="standard"
                    focused
                    value={values.gstnumber}
                    // required
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      if (/^[0-9A-Z]*$/.test(input) || input === "") {
                        // This updates Formik value correctly
                        handleChange({
                          target: {
                            name: "gstnumber",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.gstnumber && !!errors.gstnumber}
                    helperText={touched.gstnumber && errors.gstnumber}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                  // autoFocus
                  />
                  <TextField
                    name="mobilenumber"
                    type="tel"
                    id="mobilenumber"
                    label="Contact Mobile Number"
                    variant="standard"
                    focused
                    required
                    value={values.mobilenumber}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers and max 10 digits
                      if (/^\d{0,10}$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    error={!!touched.mobilenumber && !!errors.mobilenumber}
                    helperText={touched.mobilenumber && errors.mobilenumber}
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  // autoFocus
                  />

                  <TextField
                    name="emailid"
                    type="text"
                    id="emailid"
                    label="Email ID"
                    variant="standard"
                    focused
                    value={values.emailid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  // autoFocus
                  />
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Date of Registration"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    // required
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                  //inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />
                  <TextField
                    name="verifieddate"
                    type="date"
                    id="verifieddate"
                    label="Date of Verification & Confirmation"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.verifieddate}
                    // required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{
                      backgroundColor: "#ffffff",
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ",
                      },
                    }}
                  />

                  {/* panimage */}

                  <Box>
                    <Field
                      //    size="small"
                      type="checkbox"
                      name="vendor"
                      id="vendor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Vendor"
                    />
                    <FormLabel focused={false}>Vendor</FormLabel>

                    <Field
                      //    size="small"
                      type="checkbox"
                      name="customer"
                      id="customer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Customer"
                    />
                    <FormLabel focused={false}>Customer</FormLabel>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="end" padding={1} gap="20px">
                  <Tooltip title="PAN Upload">
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
                    component={"a"}
                    onClick={() => {
                      data.PanImg || panImage
                        ? window.open(
                          panImage
                            ? store.getState().globalurl.attachmentUrl +
                            panImage
                            : store.getState().globalurl.attachmentUrl +
                            data.PanImg,
                          "_blank"
                        )
                        : toast.error("Please Upload File");
                    }}
                  >
                    PAN Image View
                  </Button>
                  {/* GSTimage */}
                  <Tooltip title="GST Upload">
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
                        onChange={getFilegstChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    size="small"
                    variant="contained"
                    component={"a"}
                    onClick={() => {
                      data.GstImg || gstImage
                        ? window.open(
                          gstImage
                            ? store.getState().globalurl.attachmentUrl +
                            gstImage
                            : store.getState().globalurl.attachmentUrl +
                            data.GstImg,
                          "_blank"
                        )
                        : toast.error("Please Upload File");
                    }}
                  >
                    GST Image View
                  </Button>
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
                  {YearFlag == "true" && mode == "E" ? (
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
                    // <Button color="error" variant="contained" disabled={true}>
                    //   Delete
                    // </Button>
                    null
                  )}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR243/Party");
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
      {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={contactInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                contactsave(values);
              }, 100);
            }}
            validationSchema={contactvalidationSchema}
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
                  {/* <Typography>Contact Person 1</Typography> */}
                  {/* <TextField
                                        name="code"
                                        type="text"
                                        id="code"
                                        label="Bank Name"
                                        variant="standard"
                                        focused
                                        required
                                        // value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    /> */}
                  {/* <TextField
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
                                        sx={{

                                            backgroundColor: "#ffffff", // Set the background to white
                                            "& .MuiFilledInput-root": {
                                                backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                                            }
                                        }}
                                        autoFocus
                                    /> */}

                  {/* <Box display="flex" gap={2}> */}
                  <Box
                    sx={{
                      padding: 1.5,
                      backgroundColor: '#b2dfdb', // light green
                      borderRadius: 1,
                      width: '100%',
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">Contact Person 1</Typography>
                  </Box>

                  <Box
                    sx={{
                      padding: 1.5,
                      backgroundColor: '#b2dfdb',
                      borderRadius: 1,
                      width: '100%',
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">Contact Person 2</Typography>
                  </Box>
                  {/* </Box> */}


                  {/* <Typography>Contact Person 2</Typography> */}
                  <TextField
                    name="name1"
                    label="Name"
                    variant="standard"
                    focused
                    value={values.name1}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                    //     handleChange({
                    //       target: {
                    //         name: "name1",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.name1 && !!errors.name1}
                    helperText={touched.name1 && errors.name1}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="name2"
                    label="Name"
                    variant="standard"
                    focused
                    value={values.name2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[0-9A-Z]*$/.test(input) || input === "") {
                    //     // This updates Formik value correctly
                    //     handleChange({
                    //       target: {
                    //         name: "name2",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.name2 && !!errors.name2}
                    helperText={touched.name2 && errors.name2}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="emailid1"
                    type="tel"
                    id="emailid1"
                    label="Email ID"
                    variant="standard"
                    required
                    focused
                    value={values.emailid1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   // Only allow numbers and max 10 digits
                    //   if (/^\d{0,10}$/.test(value)) {
                    //     handleChange(e);
                    //   }
                    // }}
                    error={!!touched.emailid1 && !!errors.emailid1}
                    helperText={touched.emailid1 && errors.emailid1}
                    // inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />

                  <TextField
                    name="emailid2"
                    type="text"
                    id="emailid2"
                    label="Email ID"
                    variant="standard"
                    focused
                    value={values.emailid2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="mobileno1"
                    type="tel"
                    id="mobileno1"
                    label="Mobile No"
                    variant="standard"
                    focused
                    value={values.mobileno1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="mobileno2"
                    type="tel"
                    id="mobileno2"
                    label="Mobile No"
                    variant="standard"
                    focused
                    inputProps={{ maxLength: 10 }}
                    value={values.mobileno2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
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
                    onClick={() => {
                      setScreen(0);
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
      {show == "2" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={BankInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                Banksave(values);
              }, 100);
            }}
            validationSchema={BankvalidationSchema}
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
                  <TextField
                    name="bankname"
                    type="text"
                    id="bankname"
                    label="Bank Name"
                    variant="standard"
                    focused
                    required
                    value={values.bankname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.bankname && !!errors.bankname}
                    helperText={touched.bankname && errors.bankname}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="Accounttype"
                    type="text"
                    id="Accounttype"
                    label="Account Type"
                    variant="standard"
                    focused
                    required
                    value={values.Accounttype}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Accounttype && !!errors.Accounttype}
                    helperText={touched.Accounttype && errors.Accounttype}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  <TextField
                    name="branchname"
                    label="Branch Name"
                    variant="standard"
                    focused
                    required
                    value={values.branchname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                    //     handleChange({
                    //       target: {
                    //         name: "branchname",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.branchname && !!errors.branchname}
                    helperText={touched.branchname && errors.branchname}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="ifsc"
                    label="IFSC Code"
                    variant="standard"
                    focused
                    required
                    value={values.ifsc}
                    onBlur={handleBlur}
                    //  onChange={handleChange}
                    onChange={(e) => {
                      const input = e.target.value.toUpperCase();
                      if (/^[0-9A-Z]*$/.test(input) || input === "") {
                        // This updates Formik value correctly
                        handleChange({
                          target: {
                            name: "ifsc",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.ifsc && !!errors.ifsc}
                    helperText={touched.ifsc && errors.ifsc}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="accountholdname"
                    type="text"
                    id="accountholdname"
                    label="Account Holder Name"
                    variant="standard"
                    focused
                    required
                    value={values.accountholdname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   // Only allow numbers and max 10 digits
                    //   if (/^\d{0,10}$/.test(value)) {
                    //     handleChange(e);
                    //   }
                    // }}
                    //  onChange={(e) => {
                    //   const input = e.target.value.toUpperCase();
                    //   if (/^[A-Z0-9]*$/.test(input) || input === "") {
                    //     handleChange({
                    //       target: {
                    //         name: "branchname",
                    //         value: input,
                    //       },
                    //     });
                    //   }
                    // }}
                    error={!!touched.accountholdname && !!errors.accountholdname}
                    helperText={touched.accountholdname && errors.accountholdname}
                    // inputProps={{ maxLength: 10 }}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />

                  <TextField
                    name="bankloc"
                    type="text"
                    id="bankloc"
                    label="Bank Location"
                    variant="standard"
                    focused
                    required
                    value={values.bankloc}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                  {/* <TextField
                    name="accountnumber"
                    type="number"
                    id="accountnumber"
                    label="Account Number"
                    variant="standard"
                    focused
                     required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  /> */}
                  <TextField
                    name="accountnumber"
                    type="text" // use "text" instead of "number" to preserve leading 0s and better control
                    id="accountnumber"
                    label="Account Number"
                    variant="standard"
                    focused
                    required
                    value={values.accountnumber}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Allow only digits
                      if (/^\d*$/.test(input)) {
                        handleChange({
                          target: {
                            name: "accountnumber",
                            value: input,
                          },
                        });
                      }
                    }}
                    error={!!touched.accountnumber && !!errors.accountnumber}
                    helperText={touched.accountnumber && errors.accountnumber}
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    autoFocus
                  />
                  <TextField
                    name="bankaddress"
                    type="text"
                    id="bankaddress"
                    label="Bank Address"
                    variant="standard"
                    focused
                    required
                    value={values.bankaddress}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    autoFocus
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
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
                  {/* {YearFlag == "true" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Banksave(values, "harddelete");
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
                    onClick={() => {
                      setScreen(0);
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

export default Editvendor;
