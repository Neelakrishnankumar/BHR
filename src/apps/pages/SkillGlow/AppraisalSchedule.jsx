import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { ArrowBack, AssessmentTwoTone } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchData,
  postData,
  scheduleGetData,
} from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import {
  ManagerAppraisalPayload,
  PeerAppraisalPayload,
  SelfAppraisalPayload,
  SingleFormikSkillAutocomplete,
  SingleFormikSkillAutocompletePayload,
  SubordinateAppraisalPayload,
} from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";
import {
  MultiFormikOptimizedAutocomplete,
  MultiFormikScheduleOptimizedAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import { tokens } from "../../../Theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";

const AppraisalSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;
  //const accessID = "TR283";
  const screenName = params.screenName;
  const mode = params.Mode;
  const EmpId = params.parentID3;
  //const parentID1 = params.parentID1;
  const parentID2 = params.parentID2;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const colors = tokens(theme.palette.mode);

  const answerType = state.AnswerType;
  const AssessmentName = state.BreadCrumb3;
  const Designation = state.Designation;

  const AssessmentType = state.AssessmentType;
  //const DesignationID = state.DesignationID;
  const DesignationID = params.parentID1;

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const scheduleLoading = useSelector((state) => state.formApi.scheduleloading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector(
    (state) => state.globalurl.AssessmentAutoUrl
  );
  const [selectedEmp, setselectedEmp] = useState([]);

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
        const normalSchema = Yup.object().shape({
          SelfRecordID: Yup.object()
            .nullable()
            .shape({
              RecordID: Yup.string().required(
                data.ListOfAppraisalSchedule.SelfRecordID
              ),
              Name: Yup.string().nullable(),
            })
            .required(data.ListOfAppraisalSchedule.SelfRecordID),
        });
        // SelfRecordID: Yup.object()
        //             .nullable()
        //             .test(
        //               "self-required",
        //               data.ListofAssessCat.SelfRecordID,
        //               (value) => value && value.RecordID
        //             ),

        setValidationSchema(normalSchema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);
  const [rows, setRows] = useState([]);

  const fetchScheduleData = async () => {
    try {
      const data = await dispatch(
        scheduleGetData({ AssessmentID: parentID2 || 0 })
      );

      console.log("🚀 ~ fetchScheduleData ~ data:", data);

      if (data?.payload?.Status === "Y") {
        setRows(data.payload.Data || []);
      } else {
        setRows([]); // Prevents DataGrid errors
      }
    } catch (error) {
      console.error("❌ Error fetching schedule data:", error);
      setRows([]);
    }
  };
  useEffect(() => {
    if (parentID2 !== undefined && parentID2 !== null) {
      fetchScheduleData();
    }
  }, [dispatch, parentID2]);

  const ScheduleSaveFn = async (values, delAction) => {
    let action =
      mode === "A"
        ? "insert"
        : mode === "E"
        ? delAction === "harddelete"
          ? "harddelete"
          : "update"
        : "";

    const idata = {
      Details: selectedEmp.map((emp) => ({
        AssessmentID: parentID2 || 0,
        EmployeeID: emp.RecordID,
        Date: values.Date,
        AssessmentType: AssessmentType || "",
      })),
    };

    const response = await dispatch(
      postData({ accessID, action: "insert", idata })
    );

    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);

      sessionStorage.removeItem("empData");

      fetchScheduleData();
    } else {
      toast.error(response.payload.Msg || "Error");
    }
  };

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
          navigate("/Apps/TR026/Department");
        }
      } else {
        return;
      }
    });
  };
  const [pageSize, setPageSize] = React.useState(10);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);
  const handleLocalDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Remove this schedule entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setLocalRows((prev) => prev.filter((row) => row.id !== id));
        toast.success("Row removed");
      }
    });
  };

  const Sprintcolumns = [
    {
      field: "SLNO",
      headerName: "S.No",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.api.getRowIndex(params.id) + 1,
    },
    {
      field: "EmployeeName",
      headerName: "Employee Name",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "AssessmentType",
      headerName: "Appraisal",
      //width: 200,
      headerAlign: "center",
      hide: true,
    },
    {
      field: "DisplayAssessmentType",
      headerName: "Appraisal",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Designation",
      headerName: "Designation",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "Date",
      headerName: "Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      headerAlign: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "#e74c3c" }} />}
          label="Delete"
          onClick={() => handleLocalDeleteClick(params.row.id)}
        />,
      ],
    },
  ];
  // Assume you already have states like:
  const [selectedEmployees, setSelectedEmployees] = useState([]); // Multi-select employee dropdown
  const [selectedSelf, setSelectedSelf] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedPeer, setSelectedPeer] = useState("");
  const [selectedSubordinate, setSelectedSubordinate] = useState("");
  //const [rows, setRows] = useState([]); // DataGrid rows

  const [localRows, setLocalRows] = useState([]);

  const [rowCount, setRowCount] = useState(0);

  function Custombar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>List of Schedule</Typography>
        </Box> */}
      </GridToolbarContainer>
    );
  }
  const initialValues = {
    Date:
      mode === "A"
        ? new Date().toISOString().split("T")[0] // today
        : Data.Date || new Date().toISOString().split("T")[0],
    AssessmentName: AssessmentName || "",
    Designation: Designation || "",
    SelfRecordID: Data.SelfRecordID
      ? { RecordID: Data.SelfRecordID, Name: Data.Name }
      : null,
  };

  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
        {/* BREADCRUMBS */}
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
                  maxItems={2}
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate("/Apps/TR299/List%20Of%20Assessment%20Type");
                    }}
                  >
                    List of Assessment Type ({state.BreadCrumb1})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List of Category ({state.BreadCrumb2})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => {
                      navigate(
                        `/Apps/Secondarylistview/skillglow/TR294/List%20Of%20Assessment%20Category/${params.parentID3}/${params.accessID2}/${params.parentID2}`,
                        { state: { ...state } }
                      );
                    }}
                  >
                    List of Appraisal
                    {/* ({state.BreadCrumb3}) */}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate(-1)}
                  >
                    List Of Designation ({Designation})
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Appraisal Schedule
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
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  ScheduleSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                setFieldTouched,
                validateForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {/* {JSON.stringify(errors)} */}
                  <Box
                    display="grid"
                    gap={formGap}
                    padding={1}
                    gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    {/* <TextField
                      // fullWidth
                      variant="standard"
                      type="text"
                      label="Assessment Name"
                      value={values.AssessmentName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="AssessmentName"
                      name="AssessmentName"
                      focused
                      error={!!touched.AssessmentName && !!errors.AssessmentName}
                      helperText={touched.AssessmentName && errors.AssessmentName}
                      sx={{
                        // backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{
                        inputProps: { readOnly: true }
                      }}
                    /> */}

                    <SelfAppraisalPayload
                      name="SelfRecordID"
                      //label="Self"
                      label={
                        <span>
                          Self{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </span>
                      }
                      id="SelfRecordID"
                      value={values.SelfRecordID}
                      onChange={(newValue) => {
                        setFieldValue("SelfRecordID", newValue);
                        setFieldValue("SelfLabel", newValue?.Name || ""); // 👈 store label too
                      }}
                      error={!!touched.SelfRecordID && !!errors.SelfRecordID}
                      helperText={touched.SelfRecordID && errors.SelfRecordID}
                      url={`${listViewurl}?data=${encodeURIComponent(
                        JSON.stringify({
                          Query: {
                            AccessID: "2122",
                            ScreenName: "List+Of+Question+Groups",
                            Filter: `AssessmentType='AP' AND DesignationID='${DesignationID}' AND AppraisalType='Self' AND AssessmentStatus = 'Ready to Assign'`,
                            Any: "",
                          },
                        })
                      )}`}
                    />

                    <ManagerAppraisalPayload
                      name="ManagerRecordID"
                      label="Manager"
                      id="ManagerRecordID"
                      value={values.ManagerRecordID}
                      onChange={(newValue) => {
                        setFieldValue("ManagerRecordID", newValue);
                        setFieldValue("ManagerLabel", newValue?.Name || "");
                      }}
                      error={
                        !!touched.ManagerRecordID && !!errors.ManagerRecordID
                      }
                      helperText={
                        touched.ManagerRecordID && errors.ManagerRecordID
                      }
                      url={`${listViewurl}?data=${encodeURIComponent(
                        JSON.stringify({
                          Query: {
                            AccessID: "2123",
                            ScreenName: "List+Of+Question+Groups",
                            Filter: `AssessmentType='AP' AND DesignationID='${DesignationID}' AND AppraisalType='Manager' AND AssessmentStatus = 'Ready to Assign'`,
                            Any: "",
                          },
                        })
                      )}`}
                    />

                    <PeerAppraisalPayload
                      name="PeerRecordID"
                      label="Peer"
                      id="PeerRecordID"
                      value={values.PeerRecordID}
                      onChange={(newValue) => {
                        setFieldValue("PeerRecordID", newValue);
                        setFieldValue("PeerLabel", newValue?.Name || "");
                      }}
                      error={!!touched.PeerRecordID && !!errors.PeerRecordID}
                      helperText={touched.PeerRecordID && errors.PeerRecordID}
                      url={`${listViewurl}?data=${encodeURIComponent(
                        JSON.stringify({
                          Query: {
                            AccessID: "2125",
                            ScreenName: "List+Of+Question+Groups",
                            Filter: `AssessmentType='AP' AND DesignationID='${DesignationID}' AND AppraisalType='Peer' AND AssessmentStatus = 'Ready to Assign'`,
                            Any: "",
                          },
                        })
                      )}`}
                    />

                    <SubordinateAppraisalPayload
                      name="SubordinateRecordID"
                      //   label={
                      //     <span>
                      //       Subordinate{" "}
                      //       <span style={{ color: "red", fontSize: "20px" }}>
                      //         *
                      //       </span>
                      //     </span>
                      //   }
                      label="Subordinate"
                      id="SubordinateRecordID"
                      value={values.SubordinateRecordID}
                      onChange={(newValue) => {
                        setFieldValue("SubordinateRecordID", newValue);
                        setFieldValue("SubordinateLabel", newValue?.Name || "");
                      }}
                      error={
                        !!touched.SubordinateRecordID &&
                        !!errors.SubordinateRecordID
                      }
                      helperText={
                        touched.SubordinateRecordID &&
                        errors.SubordinateRecordID
                      }
                      url={`${listViewurl}?data=${encodeURIComponent(
                        JSON.stringify({
                          Query: {
                            AccessID: "2124",
                            ScreenName: "List+Of+Question+Groups",
                            Filter: `AssessmentType='AP' AND DesignationID='${DesignationID}' AND AppraisalType='Subordinate' AND AssessmentStatus = 'Ready to Assign'`,
                            Any: "",
                          },
                        })
                      )}`}
                    />
                    <TextField
                      // fullWidth
                      variant="standard"
                      type="text"
                      label="Designation"
                      value={values.Designation}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="Designation"
                      name="Designation"
                      focused
                      error={!!touched.Designation && !!errors.Designation}
                      helperText={touched.Designation && errors.Designation}
                      sx={{
                        // backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      InputProps={{
                        inputProps: { readOnly: true },
                      }}
                    />

                    <MultiFormikScheduleOptimizedAutocomplete
                      sx={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      name="EmpName"
                      label="Employee"
                      //  label={
                      //   <span>
                      //     Employee{" "}
                      //     <span style={{ color: "red", fontSize: "20px" }}>
                      //       *
                      //     </span>
                      //   </span>
                      // }
                      id="EmpName"
                      value={selectedEmp}
                      onChange={(e, newValue) => {
                        setFieldValue("EmpName", newValue);
                        setselectedEmp(newValue);
                        if (newValue) {
                          sessionStorage.setItem(
                            "empData",
                            JSON.stringify(newValue)
                          );
                        } else {
                          sessionStorage.removeItem("empData");
                        }
                      }}
                      error={!!touched.EmpName && !!errors.EmpName}
                      helperText={touched.EmpName && errors.EmpName}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2127","ScreenName":"Edit List Of Schedule","Filter":"CompanyID='${CompanyID}' AND DesignationID='${DesignationID}'","Any":""}}`}
                    />
                    <TextField
                      name="Date"
                      type="date"
                      id="Date"
                      label={
                        <>
                          Date
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      value={values.Date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Date && !!errors.Date}
                      helperText={touched.Date && errors.Date}
                      sx={{ background: "" }}
                      InputProps={{
                        readOnly: mode === "A",
                      }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    padding={1}
                    gap={2}
                  >
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // Prevent adding empty employee selection
                        if (selectedEmp.length === 0) {
                          toast.error("Please select at least one employee");
                          return;
                        }

                        // Add selected employees as individual rows

                        // const newRows = (selectedEmp || []).map((emp, index) => ({
                        //   id: emp?.RecordID ? `${emp.RecordID}-${Date.now()}-${index}` : `${Date.now()}-${index}`,
                        //   AssessmentID: parentID2 || 0,
                        //   EmployeeID: emp?.RecordID || "",
                        //   EmployeeName: emp?.EmployeeName || emp?.Name || "N/A",
                        //   Assessment: AssessmentName || "",
                        //   Designation: Designation || "",
                        //   Date: values.Date || "",
                        //   AssessmentType: AssessmentType || "",
                        // }));
                        const newRows = (selectedEmp || [])
                          .filter(
                            (emp) =>
                              !localRows.some(
                                (r) => r.RecordID === emp.RecordID
                              )
                          )
                          .map((emp, index) => ({
                            id: emp.RecordID,
                            AssessmentID: parentID2 || 0,
                            EmployeeID: emp?.RecordID || "",

                            EmployeeName:
                              emp?.EmployeeName || emp?.Name || "N/A",
                            Assessment: AssessmentName || "",
                            Designation: Designation || "",
                            Date: values.Date || "",
                            RecordID: emp.RecordID,
                            AssessmentType: AssessmentType || "",
                          }));

                        if (newRows.length === 0) {
                          toast.error(
                            "Duplicate employees cannot be added again"
                          );
                          return;
                        }
                        // Append to local grid
                        setLocalRows((prev) => [...prev, ...newRows]);

                        // Clear employee selection
                        setselectedEmp([]);
                        setFieldValue("EmpName", []);
                      }}
                    >
                      + Add
                    </Button> */}

                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        // 1️⃣ Validate employee selection
                        if (selectedEmp.length === 0) {
                          toast.error("Please select atleast one employee");
                          return;
                        }
                        // 2️⃣ Validate Self selection (mandatory)
                        if (!values.SelfRecordID) {
                          Swal.fire(
                            "Warning",
                            "Please select Self Appraisal",
                            "warning"
                          );
                          return;
                        }

                        // 2️⃣ Collect selected assessment types (and names)
                        const selectedTypes = [];
                        selectedTypes.push({
                          type: values.SelfLabel || "Self", // ✅ actual label
                          recordID: values.SelfRecordID,
                        });
                        if (values.ManagerRecordID)
                          selectedTypes.push({
                            type: values.ManagerLabel || "Manager",
                            recordID: values.ManagerRecordID,
                          });
                        if (values.PeerRecordID)
                          selectedTypes.push({
                            type: values.PeerLabel || "Peer",
                            recordID: values.PeerRecordID,
                          });
                        if (values.SubordinateRecordID)
                          selectedTypes.push({
                            type: values.SubordinateLabel || "Subordinate",
                            recordID: values.SubordinateRecordID,
                          });

                        if (selectedTypes.length === 0) {
                          toast.error(
                            "Please select at least one assessment type"
                          );
                          return;
                        }

                        // 3️⃣ Create new rows
                        const newRows = [];

                        selectedEmp.forEach((emp) => {
                          selectedTypes.forEach((typeObj) => {
                            const exists = localRows.some(
                              (r) =>
                                r.EmployeeID === emp.RecordID &&
                                r.AssessmentType === typeObj.type
                            );

                            if (!exists) {
                              newRows.push({
                                id: `${emp.RecordID}-${
                                  typeObj.type
                                }-${Date.now()}`,
                                AssessmentID: parentID2 || 0,
                                EmployeeID: emp.RecordID || "",
                                EmployeeName:
                                  emp.EmployeeName || emp.Name || "N/A",
                                AssessmentType: "AP",
                                Designation: Designation || "",
                                Date: values.Date || "",
                                RecordID: emp.RecordID,

                                //FOR API LOAD
                                SelfRecordID: values.SelfRecordID || "0",
                                ManagerRecordID: values.ManagerRecordID || "0",
                                PeerRecordID: values.PeerRecordID || "0",
                                SubordinateRecordID:
                                  values.SubordinateRecordID || "0",
                              });
                            }
                          });
                        });

                        // 4️⃣ Duplicate check
                        if (newRows.length === 0) {
                          toast.error(
                            "Duplicate combinations cannot be added again"
                          );
                          return;
                        }

                        // 5️⃣ Append to grid
                        setLocalRows((prev) => [...prev, ...newRows]);

                        // 6️⃣ Reset employee field
                        setselectedEmp([]);
                        setFieldValue("EmpName", []);
                      }}
                    >
                      + Add
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (selectedEmp.length === 0) {
                          toast.error("Please select at least one employee");
                          return;
                        }

                        // if (!values.SelfRecordID) {
                        //   Swal.fire(
                        //     "Warning",
                        //     "Please select Self Appraisal",
                        //     "warning"
                        //   );
                        //   return;
                        // }
                        if (!values.SelfRecordID) {
                          setFieldTouched("SelfRecordID", true); // mark field as touched
                          validateForm(); // trigger validation
                          return;
                        }
                        // Collect all selected appraisal types with actual label
                        // const appraisalTypes = [];

                        // if (values.SelfRecordID)
                        //   appraisalTypes.push({
                        //     label: "Self",
                        //     id: values.SelfRecordID.RecordID,
                        //   });

                        // if (values.ManagerRecordID)
                        //   appraisalTypes.push({
                        //     label: "Manager",
                        //     id: values.ManagerRecordID.RecordID,
                        //   });

                        // if (values.PeerRecordID)
                        //   appraisalTypes.push({
                        //     label: "Peer",
                        //     id: values.PeerRecordID.RecordID,
                        //   });

                        // if (values.SubordinateRecordID)
                        //   appraisalTypes.push({
                        //     label: "Subordinate",
                        //     id: values.SubordinateRecordID.RecordID,
                        //   });
                        const appraisalTypes = [];

                        if (values.SelfRecordID)
                          appraisalTypes.push({
                            key: "Self", // ✅ fixed type key for logic
                            label: `${values.SelfRecordID.Name || ""}`, // ✅ display label
                            id: values.SelfRecordID.RecordID,
                          });

                        if (values.ManagerRecordID)
                          appraisalTypes.push({
                            key: "Manager",
                            label: `${values.ManagerRecordID.Name || ""}`,
                            id: values.ManagerRecordID.RecordID,
                          });

                        if (values.PeerRecordID)
                          appraisalTypes.push({
                            key: "Peer",
                            label: `${values.PeerRecordID.Name || ""}`,
                            id: values.PeerRecordID.RecordID,
                          });

                        if (values.SubordinateRecordID)
                          appraisalTypes.push({
                            key: "Subordinate",
                            label: `${values.SubordinateRecordID.Name || ""}`,
                            id: values.SubordinateRecordID.RecordID,
                          });

                        const newRows = [];

                        selectedEmp.forEach((emp) => {
                          appraisalTypes.forEach((type) => {
                            const exists = localRows.some(
                              (r) =>
                                r.EmployeeID === emp.RecordID &&
                                r.AssessmentType === type.label
                            );

                            if (!exists) {
                              // newRows.push({
                              //   id: `${emp.RecordID}-${
                              //     type.label
                              //   }-${Date.now()}`,
                              //   EmployeeID: emp.RecordID,
                              //   EmployeeName:
                              //     emp.EmployeeName || emp.Name || "N/A",
                              //   AssessmentType: type.label, // ✅ This will show actual selected label
                              //   Designation: Designation || "",
                              //   Date: values.Date || "",
                              //   SelfRecordID:
                              //     type.label === "Self"
                              //       ? values.SelfRecordID?.RecordID || "0"
                              //       : "0",
                              //   ManagerRecordID:
                              //     type.label === "Manager"
                              //       ? values.ManagerRecordID?.RecordID || "0"
                              //       : "0",
                              //   PeerRecordID:
                              //     type.label === "Peer"
                              //       ? values.PeerRecordID?.RecordID || "0"
                              //       : "0",
                              //   SubordinateRecordID:
                              //     type.label === "Subordinate"
                              //       ? values.SubordinateRecordID?.RecordID ||
                              //         "0"
                              //       : "0",
                              // });
                              newRows.push({
                                id: `${emp.RecordID}-${
                                  type.label
                                }-${Date.now()}`,
                                EmployeeID: emp.RecordID,
                                EmployeeName:
                                  emp.EmployeeName || emp.Name || "N/A",
                                AssessmentType: type.key,
                                DisplayAssessmentType: type.label,

                                Designation: Designation || "",
                                Date: values.Date || "",
                                SelfRecordID:
                                  type.key === "Self" ? type.id : "0",
                                ManagerRecordID:
                                  type.key === "Manager" ? type.id : "0",
                                PeerRecordID:
                                  type.key === "Peer" ? type.id : "0",
                                SubordinateRecordID:
                                  type.key === "Subordinate" ? type.id : "0",
                              });
                            }
                          });
                        });

                        if (newRows.length === 0) {
                          toast.error("Duplicate entries cannot be added");
                          return;
                        }

                        setLocalRows((prev) => [...prev, ...newRows]);
                        setselectedEmp([]);
                        setFieldValue("EmpName", []);
                        Swal.fire(
                          "Success",
                          `${newRows.length} row(s) added successfully!`,
                          "success"
                        );
                      }}
                    >
                      + Add
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            <Box m="5px">
              <Box
                m="5px 0 0 0"
                height={dataGridHeight}
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[800],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[800],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .odd-row": {
                    backgroundColor: "",
                    color: "", // Color for odd rows
                  },
                  "& .even-row": {
                    backgroundColor: "#D3D3D3",
                    color: "", // Color for even rows
                  },
                }}
              >
                <DataGrid
                  sx={{
                    "& .MuiDataGrid-footerContainer": {
                      height: dataGridHeaderFooterHeight,
                      minHeight: dataGridHeaderFooterHeight,
                    },
                  }}
                  //rows={rows}
                  rows={localRows}
                  columns={Sprintcolumns}
                  loading={scheduleLoading}
                  //rowModesModel={rowModesModel}
                  // getRowId={(row) => row.RecordID}
                  getRowId={(row) => row.id}
                  editMode="cell"
                  disableRowSelectionOnClick
                  rowHeight={dataGridRowHeight}
                  headerHeight={dataGridHeaderFooterHeight}
                  //experimentalFeatures={{ newEditingApi: true }}
                  //onRowModesModelChange={handleRowModesModelChange}
                  //processRowUpdate={processRowUpdate}
                  // onProcessRowUpdateError={handleProcessRowUpdateError}
                  onStateChange={(stateParams) =>
                    setRowCount(stateParams.pagination.rowCount)
                  }
                  components={{
                    Toolbar: Custombar,
                  }}
                  // componentsProps={{
                  //   toolbar: { setRows, setRowModesModel },
                  // }}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20]}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                      ? "odd-row"
                      : "even-row"
                  }
                  pagination
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" padding={2} gap={2}>
              {/* <LoadingButton
                variant="contained"
                color="secondary"
                loading={isLoading}
                onClick={async () => {
                  if (localRows.length === 0) {
                    toast.error("No data to save!");
                    return;
                  }

                  //   const idata = {
                  //     Details: localRows.map((row) => ({
                  //       AssessmentID: row.AssessmentID,
                  //       EmployeeID: row.EmployeeID,
                  //       Date: row.Date,
                  //       AssessmentType: row.AssessmentType,
                  //     })),
                  //   };
                  const idata = {
                    Details: localRows.map((row) => ({
                      SelfRecordID: row.SelfRecordID,
                      ManagerRecordID: row.ManagerRecordID,
                      PeerRecordID: row.PeerRecordID,
                      SubordinateRecordID: row.SubordinateRecordID,
                      EmployeeID: row.EmployeeID,
                      Date: row.Date,
                      AssessmentType: row.AssessmentType,
                    })),
                  };

                  const response = await dispatch(
                    postData({ accessID, action: "insert", idata })
                  );

                  if (response.payload?.Status === "Y") {
                    toast.success(
                      response.payload.Msg || "Saved successfully!"
                    );
                    setLocalRows([]); // clear after save
                    navigate(-1); // optional
                  } else {
                    toast.error(
                      response.payload?.Msg || "Failed to save data!"
                    );
                  }
                }}
              >
                Save
              </LoadingButton> */}
              {/* <LoadingButton
                variant="contained"
                color="secondary"
                loading={isLoading}
                onClick={async () => {
                  if (localRows.length === 0) {
                    toast.error("No data to save!");
                    return;
                  }

                  // Aggregate rows by EmployeeID for API
                  const aggregatedData = [];

                  localRows.forEach((row) => {
                    let empObj = aggregatedData.find(
                      (e) => e.EmployeeID === row.EmployeeID
                    );
                    if (!empObj) {
                      empObj = {
                        EmployeeID: row.EmployeeID,
                        Date: row.Date,
                        AssessmentType: "AP",
                        SelfRecordID: "0",
                        ManagerRecordID: "0",
                        PeerRecordID: "0",
                        SubordinateRecordID: "0",
                        DesignationRecordID: DesignationID,
                        AssessmentID: "0",
                      };
                      aggregatedData.push(empObj);
                    }

                    // Assign the correct ID based on Appraisal type
                    if (row.Appraisal === "Self")
                      empObj.SelfRecordID = row.SelfRecordID;
                    if (row.Appraisal === "Manager")
                      empObj.ManagerRecordID = row.ManagerRecordID;
                    if (row.Appraisal === "Peer")
                      empObj.PeerRecordID = row.PeerRecordID;
                    if (row.Appraisal === "Subordinate")
                      empObj.SubordinateRecordID = row.SubordinateRecordID;
                  });

                  const idata = { Details: aggregatedData };

                  try {
                    const response = await dispatch(
                      postData({ accessID, action: "insert", idata })
                    );

                    if (response.payload?.Status === "Y") {
                      toast.success(
                        response.payload.Msg || "Saved successfully!"
                      );
                      setLocalRows([]); // clear grid after save
                      navigate(-1); // optional
                    } else {
                      toast.error(
                        response.payload?.Msg || "Failed to save data!"
                      );
                    }
                  } catch (err) {
                    toast.error("Something went wrong while saving data!");
                    console.error(err);
                  }
                }}
              >
                Save
              </LoadingButton> */}
              {/* <LoadingButton
                variant="contained"
                color="secondary"
                loading={isLoading}
                onClick={async () => {
                  // 1️⃣ Validate if there is at least one employee
                  if (localRows.length === 0) {
                    toast.error("No schedule data found to save!");
                    return;
                  }

                  // 2️⃣ Ensure all employees have at least one 'Self' appraisal
                  const employeesWithoutSelf = localRows.filter(
                    (row) =>
                      row.AssessmentType === "AP" && row.SelfRecordID === "0"
                  );

                  if (employeesWithoutSelf.length > 0) {
                    toast.error(
                      "Please select 'Self' appraisal for all employees before saving!"
                    );
                    return;
                  }

                  // 3️⃣ Construct the payload
                  const idata = {
                    Details: localRows.map((row) => ({
                      AssessmentID: "0",
                      EmployeeID: row.EmployeeID,
                      Date: row.Date,
                      AssessmentType: "AP",
                      SelfRecordID: row.SelfRecordID || "0",
                      ManagerRecordID: row.ManagerRecordID || "0",
                      PeerRecordID: row.PeerRecordID || "0",
                      SubordinateRecordID: row.SubordinateRecordID || "0",
                      DesignationRecordID: DesignationID, // Add this if required by API
                    })),
                  };

                  // 4️⃣ Send the API request
                  const response = await dispatch(
                    postData({ accessID: "TR306", action: "insert", idata })
                  );

                  if (response.payload.Status === "Y") {
                    toast.success(response.payload.Msg);
                    setLocalRows([]); // Clear after success
                    fetchScheduleData();
                  } else {
                    toast.error(response.payload.Msg || "Error saving data!");
                  }
                }}
              >
                Save
              </LoadingButton> */}
              <LoadingButton
                variant="contained"
                color="secondary"
                loading={isLoading}
                onClick={async () => {
                  if (localRows.length === 0) {
                    toast.error("No schedule data found to save!");
                    return;
                  }

                  // Ensure all employees have at least one 'Self' appraisal
                  const employeesWithoutSelf = localRows.filter(
                    (row) =>
                      row.AssessmentType === "AP" && row.SelfRecordID === "0"
                  );
                  if (employeesWithoutSelf.length > 0) {
                    toast.error(
                      "Please select 'Self' appraisal for all employees before saving!"
                    );
                    return;
                  }

                  // Aggregate by EmployeeID
                  const aggregatedData = [];
                  localRows.forEach((row) => {
                    let empObj = aggregatedData.find(
                      (e) => e.EmployeeID === row.EmployeeID
                    );
                    if (!empObj) {
                      empObj = {
                        AssessmentID: "0",
                        EmployeeID: row.EmployeeID,
                        Date: row.Date,
                        AssessmentType: "AP",
                        SelfRecordID: "0",
                        ManagerRecordID: "0",
                        PeerRecordID: "0",
                        SubordinateRecordID: "0",
                        DesignationRecordID: DesignationID,
                      };
                      aggregatedData.push(empObj);
                    }

                    // Assign correct appraisal type IDs
                    if (row.AssessmentType === "Self")
                      empObj.SelfRecordID = row.SelfRecordID;
                    if (row.AssessmentType === "Manager")
                      empObj.ManagerRecordID = row.ManagerRecordID;
                    if (row.AssessmentType === "Peer")
                      empObj.PeerRecordID = row.PeerRecordID;
                    if (row.AssessmentType === "Subordinate")
                      empObj.SubordinateRecordID = row.SubordinateRecordID;
                  });

                  const idata = {
                    Details: aggregatedData,
                  };

                  try {
                    const response = await dispatch(
                      postData({ accessID: "TR306", action: "insert", idata })
                    );

                    if (response.payload.Status === "Y") {
                      toast.success(response.payload.Msg);
                      setLocalRows([]); // Clear grid after save
                      //fetchScheduleData();
                      navigate(-1);
                    } else {
                      toast.error(response.payload.Msg || "Error saving data!");
                    }
                  } catch (err) {
                    toast.error("Something went wrong while saving data!");
                    console.error(err);
                  }
                }}
              >
                Save
              </LoadingButton>

              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        ) : (
          false
        )}
      </React.Fragment>
    </>
  );
};

export default AppraisalSchedule;
