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

const ViewLeadEnquiry = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // const accessID = params.accessID;
  const accessID = "TR304";
  const recID = params.LeadId;
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
          leadtitle: Yup.string().required(
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
  const initialValues = {
    applieddate: data.OMDate || curdate,
    leadtitle: data.LeadTitle || "",
    comments: data.Comments || "",
    visitdate: data.NextVisitDate || "",
    Status: data.OMStatus || "",
    project: data.ProjectID
      ? {
          RecordID: data.ProjectID,
          Name: data.ProjectName || "",
        }
      : null,
  }; // ✅ FIXED: Added missing closing brace here

  useEffect(() => {
    dispatch(getFetchData({ accessID: "TR304", get: "get", recID }));
  }, [location.key]); // ✅ Added missing deps

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const style = {
    height: "55px",
    border: "2px solid #1769aa ",
    borderRadius: "6px",
    backgroundColor: "#EDEDED",
  };
  const ref = useRef(null);

  const fnLogOut = (props) => {
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
          navigate(`/Apps/TR328/Lead%20Enquiry`);
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
                  onClick={() => {
                    // navigate("/Apps/TR243/Party");
                    navigate("/Apps/TR328//Lead%20Enquiry");
                  }}
                >
                  {/* {`Party(${state.PartyName || params.Name})`} */}
                  Lead Enquiry
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{ cursor: "default" }}
                >
                  {/* {`Marketing Activity(${state.PartyName || params.Name})`} */}
                  View Lead Enquiry
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
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              sessionStorage.setItem("Status", values.Status);
              //fnSave(values);
              setSubmitting(false);
            }}
            //validationSchema={validationSchema}
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
                    disabled
                  />
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
                    disabled
                    InputLabelProps={{
                      shrink: true, // ✅ prevents overlap
                    }}
                    //url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Project","Filter":"CompanyID='${CompanyID}' AND ItemsDesc ='Product'","Any":""}}`}
                  />

                  <TextField
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
    </React.Fragment>
  );
};

export default ViewLeadEnquiry;
