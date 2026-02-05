import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  LinearProgress,
  Paper,
  Breadcrumbs,
  Tooltip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  getFetchData,
  LeaderData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { OverheadSchema } from "../../Security/validation";
import { formGap } from "../../../ui-components/utils";
import * as Yup from "yup";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
import FileUploadIconButton from "../../../ui-components/global/Fileuploadbutton";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import store from "../../..";
import axios from "axios";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const EditLeader = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  const Type = params.Type;
  console.log(Type, "Type");
  const filtertype = params.filtertype;
  const filtertype2 = params.filtertype2;
  const Name = params.Name;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const leader = useSelector((state) => state.formApi.leaderDetails);
  console.log(leader, "leader");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [loading, setLoading] = useState(false);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const LoginID = sessionStorage.getItem("loginrecordID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // console.log("🚀 ~ file: Editoverhead.jsx:20 ~ Editoverhead ~ data:", data);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const [leaderDetails, setLeaderDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
  const state = location.state || {};
  console.log(state, "state");
  const { id, name } = useParams();
  console.log("Received Name:", decodeURIComponent(name));
  console.log(location, "location");
  const OrderType = params.OrderType;
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        // let schemaFields = {
        //   name: Yup.string().required(data.Overhead.name),
        //   OverheadType: Yup.object().required(data.Overhead.OverheadType),
        //   frequency: Yup.string().required(data.Overhead.frequency),
        // };
        let schemaFields = {
          leadtitle: Yup.string().trim().required(
            data.LeadMarketingActivity.leadtitle
          ),
          Status: Yup.string().required(data.LeadMarketingActivity.Status),
          project: Yup.object()
            .nullable()
            .shape({
              RecordID: Yup.string().required(
                data.LeadMarketingActivity.project
              ),
              Name: Yup.string().nullable(), // optional
            })
            .required(data.LeadMarketingActivity.project),
        };

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID })).then((res) => {
      console.log(res, "response");
      console.log(res.payload.Data.PartyID, "response");
      var url = store.getState().globalurl.empGetAttachmentUrl;
      axios
        .get(url, {
          params: {
            empId: res.payload.Data.PartyID,
            appId: recID,
          },
        })
        .then((response) => {
          setFiles(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch attachments.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    });
  }, []);
  const curdate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    applieddate: curdate,
    leadtitle: "",
    comments: "",
    visitdate: "",
    Status: "",
    project: null,
  });
  console.log(formData, "formdata");

  // useEffect(() => {
  //     dispatch(getFetchData({ accessID, get: "get", recID }));
  // }, [location.key]);
  useEffect(() => {
    const fetchData = async () => {
      if (Type === "T" && mode === "A") {
        try {
          setLoading(true);

          const resultAction = await dispatch(
            LeaderData({ data: { LeaderID: filtertype } })
          );

          const result = resultAction.payload;
          console.log("Leader API Redux Response:", result);

          if (result?.Status === "Y" && result?.Data?.length > 0) {
            const leaderData = result.Data[0];
            setLeaderDetails(leaderData);

            // Set form data for Formik initialValues
            setFormData({
              applieddate: curdate, // You can fill default date if required
              leadtitle: leaderData.LeadTitle || "",
              comments: "",
              visitdate: "",
              Status: "",
              project: leaderData.ProjectID
                ? {
                    RecordID: leaderData.ProjectID,
                    Name: leaderData.ProjectName,
                  }
                : null,
            });
          }
        } catch (error) {
          console.error("Error fetching Leader data:", error);
        } finally {
          setLoading(false);
        }
      }
      // else if(mode === "V"){
      //     dispatch(getFetchData({ accessID, get: "get", recID }));
      // }
      else {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      }
    };

    fetchData();
  }, [Type, recID, accessID, dispatch, filtertype]);
  useEffect(() => {
    if (!data || (Type === "T" && mode === "A")) return;

    setFormData({
      applieddate:
        mode === "E" || mode === "V" || mode === "IM" ? data.OMDate : curdate,
      leadtitle:
        mode === "E" || mode === "V" || mode === "IM" ? data.LeadTitle : "",
      comments:
        mode === "E" || mode === "V" || mode === "IM" ? data.Comments : "",
      visitdate:
        mode === "E" || mode === "V" || mode === "IM" ? data.NextVisitDate : "",
      // Status: mode === "E" || mode === "V" || mode === "IM" ? data.OMStatus : "",
      Status:
        mode === "E" || mode === "V" || mode === "IM"
          ? data.OMStatus === "Cool"
            ? "Cool"
            : data.OMStatus === "Warm"
            ? "Warm"
            : data.OMStatus === "Hot"
            ? "Hot"
            : data.OMStatus === "Opt to Order"
            ? "Opt to Order"
            : data.OMStatus === "Opt to Quote"
            ? "Opt to Quote"
            : data.OMStatus === "Close"
            ? "Close"
            : ""
          : "",
      project:
        mode === "A"
          ? null
          : data.ProjectID
          ? { RecordID: data.ProjectID, Name: data.ProjectName }
          : null,
    });
  }, [data, mode, curdate]);

  // const initialValue = {
  //     applieddate: data.OMDate,
  //     leadtitle: data.LeadTitle,
  //     comments: data.Comments,
  //     visitdate: data.NextVisitDate,
  //     // Status: mode === "AP" ? "AP" : mode === "QR" ? "QR" : Data.ApprovedStatus,
  //     Status: data.OMStatus,
  //     project: data.ProjectID
  //         ? { RecordID: data.ProjectID, Name: data.ProjectName }
  //         : null,

  // };
  // console.log(initialValue, "OverheadType");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fnSave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
        ? "harddelete"
        : "update";
    setLoading(true);

    const idata = {
      RecordID: recID,
      PartyID:
        Type === "T" ? leaderDetails?.PartyID || data.PartyID : filtertype,
      LeaderID: Type === "T" ? filtertype : 0,
      OMDate: values.applieddate,
      Comments: values.comments,
      LeadTitle: values.leadtitle,
      Status: values.Status,
      NextVisitDate: values.visitdate,
      ProjectID: values.project.RecordID || 0,
      ProjectName: values.project.Name || "",
      CompanyID,
      Latitude: 0,
      Longitude: 0,
      LoginUserID: LoginID,

      // Disable: values.disable == true ? "Y" : "N",
      // DeleteFlag: values.delete == true ? "Y" : "N",
    };
    console.log(idata, "idata");
    // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);

      const LeaderID = response.payload.LeaderID;
      // setIni(true)
      setLoading(false);
      // navigate(-1);
      console.log(Type, "Type");
      //  console.log("LeadTitle:", response.payload.LeadTitle);
      // const stateData = { LeadTitle: response.payload.LeadTitle };
      // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`)
      if (values.Status === "Opt to Order") {
        navigate(
          `/Apps/Secondarylistview/TR310/Order/${LeaderID}/Leader/O/EditOrder/-1/A`,
          {
            state: {
              ...state,
              PartyID: data.PartyID || filtertype,
              PartyName: Name || state.PartyName,
              LeadTitle: values.leadtitle,
              LEStatus: values.Status,
            },
          }
        );
      } else if (values.Status === "Opt to Quote") {
        navigate(
          `/Apps/Secondarylistview/TR310/Order/${LeaderID}/Leader/Q/EditOrder/-1/A`,
          {
            state: {
              ...state,
              PartyID: data.PartyID || filtertype,
              PartyName: Name || state.PartyName,
              LeadTitle: values.leadtitle,
              LEStatus: values.Status,
            },
          }
        );
      } else if (Type === "T") {
        // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}/T`);
        navigate(-1);
      } else if (Type === "S") {
        navigate(-1);
      } else {
        // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`);
        navigate(`/Apps/Secondarylistview/TR303/LeaderCardView/${filtertype}`);
      }
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "6px",
    backgroundColor: "#EDEDED",
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
          navigate(
            `/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`
          );
        }
      } else {
        return;
      }
    });
  };
  async function fileUpload(file, EMPID, action, id, purpose) {
    console.log("🚀 ~ fileUpload ~ file:", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("empId", data.PartyID);
    formData.append("appId", data.RecordID);
    formData.append("type", "MA");
    formData.append("source", "Self");
    formData.append("action", action);
    formData.append("id", id || "");
    formData.append("purpose", purpose);
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const respose = await dispatch(attachmentPost({ data: formData }));

    if (respose.payload.success) {
      toast.success(respose.payload.message);
      //setShowtable(true);
      var url = store.getState().globalurl.empGetAttachmentUrl;
      axios
        .get(url, {
          params: {
            empId: data.PartyID,
            appId: data.RecordID,
          },
        })
        .then((response) => {
          setFiles(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch attachments.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      toast.success(respose.payload.message);
    }

    console.log("🚀 ~ fileUpload ~ respose:", respose);
  }
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
                  onClick={() => {
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR321/Party");
                  }}
                >
                  {`Party(${state.PartyName || params.Name})`}
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {/* {`Marketing Activity(${state.PartyName || params.Name})`} */}
                  Marketing Activity
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
            initialValues={formData}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              sessionStorage.setItem("Status", values.Status);
              fnSave(values);
              setSubmitting(false);
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
                    name="applieddate"
                    type="date"
                    id="applieddate"
                    label="Applied Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.applieddate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.applieddate && !!errors.applieddate}
                    helperText={touched.applieddate && errors.applieddate}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                      // readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                    disabled={Type === "T"}
                  />
                  {/* <CheckinAutocomplete
                                        id="project"
                                        name="project"
                                        label="Product"
                                        variant="outlined"
                                        value={values.project}
                                        onChange={(newValue) => {
                                            setFieldValue("project", newValue);
                                            console.log(newValue, "--newvalue project");
                                            console.log(newValue.RecordID, "project RecordID");
                                        }}
                                        error={!!touched.project && !!errors.project}
                                        helperText={touched.project && errors.project}
                                        disabled={Type === "T"}
                                        //url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                        url={`${listViewurl}?data={"Query":{"AccessID":"2130","ScreenName":"Project","Filter":"parentID='${CompanyID}' AND ByProduct='Y'","Any":""}}`}
                                    /> */}
                  <CheckinAutocomplete
                    id="project"
                    name="project"
                    //label="Product"
                    label={
                      <>
                        Product
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="outlined"
                    value={values.project}
                    onChange={(newValue) => {
                      setFieldValue("project", newValue);
                      console.log(newValue, "--newvalue project");
                      console.log(newValue.RecordID, "project RecordID");
                    }}
                    error={!!touched.project && !!errors.project}
                    helperText={touched.project && errors.project}
                    disabled={Type === "T" && values.project?.Name !== "--"}
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                    //url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Project","Filter":"CompanyID='${CompanyID}' AND ItemsDesc ='Product'","Any":""}}`}
                  />

                  <TextField
                    // label={
                    //     <>
                    //         Lead Title<span style={{ color: "red", fontSize: "20px" }}>*</span>
                    //     </>
                    // }
                    //label="Lead Title"
                    label={
                      <>
                        Lead Title
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    id="leadtitle"
                    type="text"
                    name="leadtitle"
                    focused
                    variant="standard"
                    value={values.leadtitle}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.leadtitle && !!errors.leadtitle}
                    helperText={touched.leadtitle && errors.leadtitle}
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                    disabled={Type === "T"}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    id="comments"
                    name="comments"
                    value={values.comments}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Comments"
                    focused
                    disabled={mode === "V"}
                    // inputProps={{ readOnly: true }}
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                  />
                  <TextField
                    name="visitdate"
                    type="date"
                    id="visitdate"
                    label="Next Visit Date"
                    variant="standard"
                    focused
                    inputFormat="YYYY-MM-DD"
                    value={values.visitdate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.visitdate && !!errors.visitdate}
                    helperText={touched.visitdate && errors.visitdate}
                    disabled={mode === "V"}
                    // inputProps={{
                    //     max: new Date().toISOString().split("T")[0],
                    //     // readOnly: true,
                    // }}
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                  />
                  <TextField
                    select
                    //label="Status"
                    label={
                      <>
                        Status
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    id="Status"
                    name="Status"
                    value={values.Status}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    disabled={mode === "V"}
                    // required
                    onChange={(e) => {
                      handleChange(e); // update form state (Formik)
                      sessionStorage.setItem("Status", e.target.value); // save to sessionStorage
                    }}
                    error={!!touched.Status && !!errors.Status}
                    helperText={touched.Status && errors.Status}
                    focused
                    variant="standard"
                  >
                    <MenuItem value="Cool">Cool</MenuItem>
                    <MenuItem value="Warm">Warm</MenuItem>
                    <MenuItem value="Hot">Hot</MenuItem>
                    <MenuItem value="Opt to Order">Opt to Order</MenuItem>
                    <MenuItem value="Opt to Quote">Opt to Quote</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                  </TextField>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  padding={1}
                  gap={formGap}
                >
                  {mode == "IM" && (
                    <>
                      <TextField
                        name="purpose"
                        type="text"
                        id="purpose"
                        label="Purpose"
                        variant="standard"
                        focused
                        value={values.purpose}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.purpose && !!errors.purpose}
                        helperText={touched.purpose && errors.purpose}
                        sx={{ gridColumn: "span 2", height: "20px" }}
                        InputLabelProps={{ shrink: true }}
                      />

                      {/* <Box display="flex" alignItems="center" gap={1}> */}
                      <FileUploadIconButton
                        onFileSelect={(file) => {
                          // if (!values.purpose && mode === "IM") {
                          //   Swal.fire({
                          //     icon: "warning",
                          //     title: "Purpose Required",
                          //     text: "Please enter purpose before uploading the file.",
                          //     confirmButtonText: "OK",
                          //   });
                          //   return;
                          // }
                          // const finalPurpose =
                          //   values.purpose?.trim() ||
                          //   values.leadtitle?.trim() ||
                          //   "Attachment Upload";
                          fileUpload(
                            file,
                            data.PartyID,
                            "upload",
                            "",
                            values.purpose
                          );
                          //setFieldValue("purpose", "");
                        }}
                      />
                      {/* </Box> */}
                    </>
                  )}
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                    loading={loading}
                  >
                    SAVE
                  </LoadingButton>

                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`);
                      navigate(-1);
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        false
      )}
      {mode == "IM" && files.length > 0 ? (
        <Box mt={2}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={rowSx}>
                    <TableCell width={20}>
                      <strong>SL#</strong>
                    </TableCell>
                    <TableCell width={30}>
                      <strong></strong>
                    </TableCell>
                    <TableCell width={160}>
                      <strong>Uploaded Date</strong>
                    </TableCell>
                    <TableCell width={250}>
                      <strong>Filename</strong>
                    </TableCell>
                    <TableCell width={150}>
                      <strong>Purpose</strong>
                    </TableCell>
                    <TableCell width={100}>
                      <strong>Source</strong>
                    </TableCell>
                    <TableCell>
                      <strong>View</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No files uploaded yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    files.map((file, index) => (
                      <TableRow key={file.id || index} sx={rowSx}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {file.filename?.toLowerCase().endsWith(".pdf") && (
                            <Tooltip title="PDF File">
                              <AttachFileIcon
                                fontSize="small"
                                color="primary"
                              />
                            </Tooltip>
                          )}

                          {/\.(jpg|jpeg|png|gif)$/i.test(file.filename) && (
                            <Tooltip title="Image File">
                              <CameraAltIcon fontSize="small" color="primary" />
                            </Tooltip>
                          )}

                          {/\.(mp3|wav|ogg)$/i.test(file.filename) && (
                            <Tooltip title="Audio File">
                              <MicIcon fontSize="small" color="primary" />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>{file.uploadedDate}</TableCell>
                        <TableCell>{file.filename}</TableCell>
                        <TableCell>{file.purpose}</TableCell>
                        <TableCell>{file.source}</TableCell>
                        <TableCell>
                          <Tooltip title="Open File">
                            <IconButton
                              color="primary"
                              component="a"
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                            >
                              <OpenInNewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="delete">
                            <IconButton
                              color="error"
                              onClick={() =>
                                fileUpload(
                                  file.filename,
                                  data.PartyID,
                                  "delete",
                                  file.id,
                                  file.purpose
                                )
                              }
                              size="small"
                            >
                              <DeleteForeverIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ) : null}
    </React.Fragment>
  );
};

export default EditLeader;
