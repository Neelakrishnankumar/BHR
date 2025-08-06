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
const Editoverhead = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // console.log("🚀 ~ file: Editoverhead.jsx:20 ~ Editoverhead ~ data:", data);
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
  // const CompanyID = sessionStorage.getItem("compID");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const initialValue = {
    code: data.Code,
    name: data.Name,
    frequency: data.Frequency,
    productCost: data.Productcost,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fnSave = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    setLoading(true);

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Frequency: values.frequency,
      Productcost: values.productCost,
      Finyear,
      CompanyID,
    };

    // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(`/Apps/TR085/Over Head`);
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
          navigate("/Apps/TR085/Over Head");
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
                   Over Head
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
            initialValues={initialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                fnSave(values);
              }, 100);
            }}
            validationSchema={OverheadSchema}
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
                 {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      placeholder="Auto"
                      variant="standard"
                      focused
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      InputProps={{readOnly:true}}
                      // autoFocus
                    />
                 ):( 
                 <TextField
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
                    />
                    )}
                    <TextField
                      name="name"
                      type="text"
                      id="name"
                      label="Overhead"
                      variant="standard"
                      focused
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      autoFocus={CompanyAutoCode=="Y"}
                      required
                    />
                    <FormControl
                      focused
                     variant="standard"
                      //sx={{ gridColumn: "span 2" }}
                    >
                      <InputLabel id="frequency">Frequency</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="frequency"
                        name="frequency"
                        value={values.frequency}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem>Select</MenuItem>
                        <MenuItem value="D">Daily</MenuItem>
                        <MenuItem value="W">Weekly</MenuItem>
                        <MenuItem value="M">Monthly</MenuItem>
                        <MenuItem value="Y">Yearly</MenuItem>
                        <MenuItem value="B">By Monthly</MenuItem>
                        <MenuItem value="S">Six Month</MenuItem>
                        <MenuItem value="Q">Quarterly</MenuItem>
                        <MenuItem value="F">Fortnightly</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl
                      focused
                     variant="standard"
                      //sx={{ gridColumn: "span 2" }}
                    >
                      <InputLabel id="productCost">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="productCost"
                        name="productCost"
                        required
                        value={values.productCost}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem value="P">Cost Of Product</MenuItem>
                        <MenuItem value="E">Cost Of Employee</MenuItem>
                        <MenuItem value="M">Cost Of Material</MenuItem>
                        <MenuItem value="F">Cost Of Fixed Assets</MenuItem>
                        <MenuItem value="S">Salary</MenuItem>
                      </Select>
                    </FormControl>
                 
                </Box>
                <Box display="flex" justifyContent="end" padding={1}  gap={formGap}>
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
                      navigate("/Apps/TR085/Over Head");
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

export default Editoverhead;
