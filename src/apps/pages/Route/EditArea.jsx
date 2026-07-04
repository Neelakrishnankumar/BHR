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
import { ArrowBack, Description } from "@mui/icons-material";
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
import { formGap } from "../../../ui-components/utils";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
// import {
//   ManagerAppraisalPayload,
//   PeerAppraisalPayload,
//   SelfAppraisalPayload,
//   SingleFormikSkillAutocomplete,
//   SingleFormikSkillAutocompletePayload,
//   SubordinateAppraisalPayload,
// } from "./SkillGlowAutocomplete";
import { LoadingButton } from "@mui/lab";

const EditArea = () => {
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
  const RouteHdrID = params.parentID1;

  const CompanyID = sessionStorage.getItem("compID");
  const state = location.state || {};

  const answerType = state.AnswerType;

  const AssessmentType = state.AssessmentType;
  const DesignationID = state.DesignationID;

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const Data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const AssessmentAutoUrl = useSelector(
    (state) => state.globalurl.AssessmentAutoUrl
  );
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
        const schema = Yup.object().shape({
          Description: Yup.string().trim().required(data.RouteArea.Name),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode, AssessmentType]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);

  const curDate = new Date().toISOString().split("T")[0];
  const RouteAreaSaveFn = async (values, delAction) => {
    // let action =
    //   mode === "A" ? "insert" : mode === "D" ? "harddelete" : "update";
    let action = "";

    if (mode === "A") {
      action = "insert";
    } else if (mode === "E" && delAction === "harddelete") {
      action = "harddelete";
    } else if (mode === "E") {
      action = "update";
    }
    var isCheck = "N";
    if (values.Disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      RouteHdrID: RouteHdrID,
      Code: values.Code,
      Name: values.Description || "",
      Sortorder: values.Sortorder || "0",
      Disable: isCheck,
      DeleteFlag: values.DeleteFlag == true ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
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
          navigate(
            `/Apps/Secondarylistview/Route/${params.accessID}/${params.screenName}/${params.parentID1}`,
            {
              state: {
                ...state,
              },
            }
          );
        }
      } else {
        return;
      }
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { toggleSidebar, broken, rtl } = useProSidebar();

  //   FOR DATEPICKER
  const [value, setValue] = useState(null);

  const initialValues = {
    Code: Data.Code || "",
    Description: Data.Name || "",
    Sortorder: Data.Sortorder || "",
    Disable: Data.Disable == "Y" ? true : false,
    DeleteFlag: Data.DeleteFlag == "Y" ? true : false,
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
        <Paper
          elevation={0}
          sx={{
            mx: 2,
            mt: 2,
            mb: 1,
            p: 2,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            background: "#fff",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* LEFT SIDE */}
            <Box display="flex" alignItems="center" gap={1}>
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}

              <Box display={isNonMobile ? "block" : "none"}>
                <Breadcrumbs
                  maxItems={3}
                  separator={
                    <NavigateNextIcon fontSize="small" color="primary" />
                  }
                  aria-label="breadcrumb"
                >
                  {/* LEVEL 1 */}
                  <Typography
                    variant="body1"
                    onClick={() => navigate("/Apps/TR323/Route")}
                    sx={{
                      color: "#0D47A1",
                      cursor: "pointer",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    List Of Route ({state.BreadCrumb1})
                  </Typography>

                  {/* LEVEL 2 */}
                  <Typography
                    variant="body1"
                    onClick={() =>
                      navigate(
                        `/Apps/Secondarylistview/Route/${params.accessID}/${params.screenName}/${params.parentID1}`,
                        {
                          state: {
                            ...state,
                          },
                        }
                      )
                    }
                    sx={{
                      color: "#0D47A1",
                      cursor: "pointer",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {mode === "E"
                      ? `List Of Route Area (${state.BreadCrumb2})`
                      : "List Of Route Area"}
                  </Typography>

                  {/* LEVEL 3 */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#6B7280",
                      fontWeight: 600,
                    }}
                  >
                    {mode === "A"
                      ? "New"
                      : mode === "E"
                        ? "Edit"
                        : "View"}
                  </Typography>
                </Breadcrumbs>
              </Box>
            </Box>

            {/* RIGHT SIDE ICONS */}
            <Box display="flex" gap={1}>
              <Tooltip title="Close">
                <IconButton
                  onClick={() => fnLogOut("Close")}
                  sx={{
                    bgcolor: "#FEF2F2",
                    color: "#DC2626",
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
                    bgcolor: "#FEF2F2",
                    color: "#DC2626",
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
              mx: 2,
              mt: 1,
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              background: "#fff",
            }}
          >
            {/* HEADER */}
            <Box display="flex" alignItems="center" gap={1} mb={5}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🚚
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#4F46E5"
                >
                  Route
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Manage route master and route area details
                </Typography>
              </Box>
            </Box>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  RouteAreaSaveFn(values, resetForm);
                }, 100);
              }}
              enableReinitialize
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
              }) => (
                <Form onSubmit={handleSubmit}>

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, minmax(0,1fr))"
                    gap="20px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >

                    {/* CODE */}
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      name="Code"
                      label={
                        CompanyAutoCode === "Y" ? "Code (Auto)" : <>Code *</>
                      }
                      value={values.Code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      InputProps={{ readOnly: CompanyAutoCode === "Y" }}
                    />

                    {/* DESCRIPTION */}
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      name="Description"
                      label={<>Route Area *</>}
                      value={values.Description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.Description && !!errors.Description}
                      helperText={touched.Description && errors.Description}
                    />

                    {/* SORT ORDER */}
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="number"
                      name="Sortorder"
                      label="Sort Order"
                      value={values.Sortorder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                      onWheel={(e) => e.target.blur()}
                    />

                    {/* CHECKBOX */}
                    <Box display="flex" gap={3} alignItems="center" sx={{ pt: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="DeleteFlag"
                            checked={values.DeleteFlag}
                            onChange={handleChange}
                          />
                        }
                        label="Delete"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Disable"
                            checked={values.Disable}
                            onChange={handleChange}
                          />
                        }
                        label="Disable"
                      />
                    </Box>

                  </Box>

                  {/* BUTTONS */}
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                      sx={{
                        bgcolor: "#0D9488",
                        "&:hover": { bgcolor: "#0F766E" },
                        borderRadius: 2,
                        px: 4,
                      }}
                    >
                      Save
                    </LoadingButton>

                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        bgcolor: "#F97316",
                        "&:hover": { bgcolor: "#EA580C" },
                        borderRadius: 2,
                        px: 4,
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>

                </Form>
              )}
            </Formik>
          </Paper>
        ) : (
          false
        )}
      </React.Fragment>
    </>
  );
};

export default EditArea;
