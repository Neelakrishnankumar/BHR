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
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const leader = useSelector((state) => state.formApi.leaderDetails);
  console.log(leader, "leader");
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [loading, setLoading] = useState(false);
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // console.log("🚀 ~ file: Editoverhead.jsx:20 ~ Editoverhead ~ data:", data);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const [leaderDetails, setLeaderDetails] = useState(null);
  const state = location.state || {};
  console.log(state, "state");
  console.log(location, "location");
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        let schemaFields = {
          name: Yup.string().required(data.Overhead.name),
          OverheadType: Yup.object().required(data.Overhead.OverheadType),
          frequency: Yup.string().required(data.Overhead.frequency),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Overhead.code);
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  const curdate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    applieddate: curdate,
    leadtitle: "",
    comments: "",
    visitdate: "",
    Status: "",
    project: null,
    // applieddate: mode === "E" || mode === "V" ? data.OMDate : curdate,
    // leadtitle: mode === "E" || mode === "V" ? data.LeadTitle : "",
    // comments: mode === "E" || mode === "V" ? data.Comments : "",
    // visitdate: mode === "E" || mode === "V" ? data.NextVisitDate : "",
    // Status: mode === "AP" ? "AP" : mode === "QR" ? "QR" : Data.ApprovedStatus,
    // Status: mode === "E" || mode === "V" ? data.OMStatus : "",
    // project: data.ProjectID
    //     ? { RecordID: data.ProjectID, Name: data.ProjectName }
    //     : null,
    // project:
    //     mode === "A"
    //         ? null
    //         : data.ProjectID
    //             ? { RecordID: data.ProjectID, Name: data.ProjectName }
    //             : null
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
    if (!data) return;

    setFormData({
      applieddate: mode === "E" || mode === "V" ? data.OMDate : curdate,
      leadtitle: mode === "E" || mode === "V" ? data.LeadTitle : "",
      comments: mode === "E" || mode === "V" ? data.Comments : "",
      visitdate: mode === "E" || mode === "V" ? data.NextVisitDate : "",
      Status: mode === "E" || mode === "V" ? data.OMStatus : "",
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
      // Disable: values.disable == true ? "Y" : "N",
      // DeleteFlag: values.delete == true ? "Y" : "N",
      Latitude: "0",
      Longitude: "0",
    };
    console.log(idata, "idata");
    // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // setIni(true)
      setLoading(false);
      // navigate(-1);
      console.log(Type, "Type");
      //  console.log("LeadTitle:", response.payload.LeadTitle);
      // const stateData = { LeadTitle: response.payload.LeadTitle };
      // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`)
      if (Type === "T") {
        // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}/T`);
        navigate(-1);
      } else if (Type === "S") {
        // navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}/S`);
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
                  {`Marketing Activity(${state.PartyName || ""})`}
                  {/* Marketing Activity */}
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

            // validationSchema={validationSchema}
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
                    disabled={Type === "T"}
                  />
                  <CheckinAutocomplete
                    id="project"
                    name="project"
                    label="Project"
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
                    url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                  />

                  <TextField
                    // label={
                    //     <>
                    //         Lead Title<span style={{ color: "red", fontSize: "20px" }}>*</span>
                    //     </>
                    // }
                    label="Lead Title"
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
                  />
                  <TextField
                    select
                    label="Status"
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
                    focused
                    variant="standard"
                  >
                    <MenuItem value="Cool">Cool</MenuItem>
                    <MenuItem value="Warm">Warm</MenuItem>
                    <MenuItem value="Hot">Hot</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                  </TextField>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  padding={1}
                  gap={formGap}
                >
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
    </React.Fragment>
  );
};

export default EditLeader;
