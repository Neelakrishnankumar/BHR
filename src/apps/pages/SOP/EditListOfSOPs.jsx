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
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Form, Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { useProSidebar } from "react-pro-sidebar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { formGap } from "../../../ui-components/utils";


const EditListOfSOPs = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const location = useLocation();
  const state = location.state || {};
  const recID = params.id;
  const accessID = params.accessID;
  const mode = params.Mode;

  const CompanyID = sessionStorage.getItem("compID");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { toggleSidebar, broken, rtl } = useProSidebar();

  const data = useSelector((state) => state.formApi.Data);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);

  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");

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
          Description: Yup.string().trim().required(data.QCSOPs.Description),
          Code: Yup.string().trim().required(data.QCSOPs.Code),
        });
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, []);


  const SOPInitialValues = {
    Code: data.Code || "",
    Description: data.Description || "",
    Sortorder: data.SortOrder || "0",
    Disable: data.Disable === "Y" ? true : false,
  }
  const SOPSaveFn = async (values) => {

    let action = "";

    if (mode === "A") action = "insert";
    else if (mode === "E") action = "update";

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      Desc: values.Description,
      Code: values.Code,
      SortOrder: values.Sortorder || "0",
      Disable: values.Disable ? "Y" : "N",
    };

    const response = await dispatch(postData({ accessID, action, idata }));

    if (response.payload.Status === "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg || "Error");
    }
  };
  const [errorMsgData, setErrorMsgData] = useState(null);

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
          navigate("/Apps/TR336/List%20Of%20SOPs");
        }
      } else {
        return;
      }
    });
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
                  maxItems={3}
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                    onClick={() => navigate("/Apps/TR336/List%20Of%20SOPs")}
                  >
                    List of SOPs
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    {mode == "A" ? "New" : mode == "E" ? "Edit" : "View"}
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
        {getLoading ? (<LinearProgress />) : false}

        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={SOPInitialValues}
            onSubmit={(values) => {
              SOPSaveFn(values);
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
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
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
                  {/* CODE */}
                  {/* {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="Code"
                      type="text"
                      id="Code"
                      label="Code"
                      placeholder="Auto"
                      variant="standard"
                      focused
                      // required
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      sx={{
                        backgroundColor: "#ffffff",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ",
                        },
                      }}
                      InputProps={{ readOnly: true }}
                    // autoFocus
                    />
                  ) : (
                    <TextField
                      name="Code"
                      type="text"
                      id="Code"
                      label={
                        <>
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </>
                      }
                      variant="standard"
                      focused
                      // required
                      value={values.Code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.Code && !!errors.Code}
                      helperText={touched.Code && errors.Code}
                      sx={{
                        backgroundColor: "#ffffff",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ",
                        },
                      }}
                      autoFocus
                    />
                  )} */}
                  <TextField
                    name="Code"
                    type="text"
                    id="Code"
                    label={
                      <>
                        Code
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.Code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Code && !!errors.Code}
                    helperText={touched.Code && errors.Code}
                    sx={{
                      backgroundColor: "#ffffff",
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ",
                      },
                    }}
                    autoFocus
                  />

                  {/* DESCRIPTION */}
                  <TextField
                    name="Description"
                    type="text"
                    id="Description"
                    value={values.Description}
                    label={
                      <>
                        Description
                        <span style={{ fontSize: "20px", color: "red" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Description && !!errors.Description}
                    helperText={touched.Description && errors.Description}
                    autoFocus
                  />
                  <TextField
                    name="VersionNo"
                    type="text"
                    id="VersionNo"
                    value={values.VersionNo}
                    label={
                      <>
                        Version No
                        <span style={{ fontSize: "20px", color: "red" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.VersionNo && !!errors.VersionNo}
                    helperText={touched.VersionNo && errors.VersionNo}
                    autoFocus
                  />
                  <TextField
                    name="ModificationNo"
                    type="text"
                    id="ModificationNo"
                    value={values.ModificationNo}
                    label={
                      <>
                        Modification No
                        <span style={{ fontSize: "20px", color: "red" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.ModificationNo && !!errors.ModificationNo}
                    helperText={touched.ModificationNo && errors.ModificationNo}
                    autoFocus
                  />
                  <TextField
                    select
                    label="Facility"
                    id="Facility"
                    name="Facility"
                    value={values.Facility}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e); // update form state (Formik)
                      sessionStorage.setItem("Facility", e.target.value); // save to sessionStorage
                    }}
                    focused
                    variant="standard"
                  >
                    <MenuItem value="ManufacturingFacility1">Manufacturing Facility 1</MenuItem>
                    <MenuItem value="ManufacturingFacility2">Manufacturing Facility 2</MenuItem>

                  </TextField>
                  <TextField
                    select
                    label="Type Of Copy"
                    id="Facility"
                    name="Facility"
                    value={values.Facility}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e); // update form state (Formik)
                      sessionStorage.setItem("Facility", e.target.value); // save to sessionStorage
                    }}
                    focused
                    variant="standard"
                  >
                    <MenuItem value="Controlled">Controlled</MenuItem>
                    <MenuItem value="Uncontrolled">Uncontrolled</MenuItem>

                  </TextField>
                  {/* SORT ORDER */}
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="Sort Order"
                    value={values.Sortorder}
                    id="Sortorder"
                    name="Sortorder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(
                        0,
                        parseInt(e.target.value || 0)
                      )
                        .toString()
                        .slice(0, 8);
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  {/* DISABLE CHECKBOX */}
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox name="Disable"
                        checked={values.Disable}
                        onChange={handleChange} />}
                      label="Disable"
                      sx={{
                        marginTop: "20px",
                        "@media (max-width:500px)": {
                          marginTop: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* BUTTONS */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={1}
                  gap={2}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={isLoading}
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
              </Form>
            )}
          </Formik>
        </Paper>

      </React.Fragment>
    </>
  )
}

export default EditListOfSOPs;
