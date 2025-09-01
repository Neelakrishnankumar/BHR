import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Paper, Breadcrumbs
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Field, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { postData, getFetchData } from "../../../store/reducers/Formapireducer";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";

const Holidaylist = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();

  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Redux state
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");

  // Page params
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
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

          Date: Yup.string().required(data.Holidaylist.Date),
          oscc: Yup.string().required(data.Holidaylist.oscc),
          name: Yup.string().required(data.Holidaylist.name),

        });

        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  useEffect(() => {
    // Fetch data only when the recID or mode changes
    if (recID && mode === "E") {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }
    else {
      dispatch(getFetchData({ accessID, get: "get", recID }));

    }
  }, [location.key, recID, mode]);

  // Ensure data is available before rendering form
  if (!data && getLoading) {
    return <LinearProgress />;
  }

  const InitialValue = {
    oscc: data?.Occasion || "",
    name: data?.Description || "",
    Date: data?.HolidayDate || "",
    Sortorder: data?.SortOrder || "",
    disable: data?.Disable === "Y" ? true : false,
    delete: data.DeleteFlag === "Y" ? true : false
  };

  const Fnsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const isCheck = values.disable ? "Y" : "N";

    const idata = {
      RecordID: recID,
      Occasion: values.oscc,
      Description: values.name,
      HolidayDate: values.Date,
      SortOrder: values.Sortorder || 0,
      Disable: isCheck,
      DeleteFlag: values.delete == true ? "Y" : "N",
      Finyear,
      CompanyID,
    };

    try {
      const response = await dispatch(postData({ accessID, action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        navigate("/Apps/TR218/Holiday List");
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
          navigate("/Apps/TR218/Holiday List");
        }
      }
    });
  };

  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : null}

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
                  Holiday List
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
                    name="Date"
                    type="date"
                    id="Date"
                    label={
                      <>
                        Holiday Date<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="standard"
                    focused
                    // required
                    value={values.Date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Date && !!errors.Date}
                    helperText={touched.Date && errors.Date}
                    sx={{

                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }}
                    autoFocus
                  />
                  <TextField
                    name="oscc"
                    type="text"
                    id="oscc"
                    label={
                      <>
                        Occasion<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.oscc}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // required
                    error={!!touched.oscc && !!errors.oscc}
                    helperText={touched.oscc && errors.oscc}
                    sx={{

                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }}
                    autoFocus
                  />
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Description<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // required
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{

                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5", // Ensure the filled variant also has a white background
                      }
                    }}
                    autoFocus
                  />
                  <TextField
                    name="Sortorder"
                    type="number"
                    id="Sortorder"
                    label="Sort Order"
                    variant="standard"
                    focused
                    value={values.Sortorder}
                    onBlur={handleBlur}
                    onChange={handleChange}

                    sx={{ background: "" }}
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
                      name="delete"
                      id="delete"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                      label="Delete"
                    />

                    <FormLabel focused={false}>Delete</FormLabel>
                    <Field
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
                      loading={loading}
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
                  )}   {YearFlag == "true" && mode == "E" ? (
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
                    // <Button
                    //   color="error"
                    //   variant="contained"
                    //   disabled={true}
                    // >
                    //   Delete
                    // </Button>
                    null
                  )}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR218/Holiday List");
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

export default Holidaylist;
