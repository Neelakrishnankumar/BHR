import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    FormControlLabel,
    Tooltip,
    Checkbox,
    LinearProgress,
  } from "@mui/material";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from "@mui/icons-material/ResetTv";
  import { Field, Formik } from "formik";
  import { CheckBox } from "@mui/icons-material";
  import { useParams, useNavigate, useLocation } from "react-router-dom";
 import { ratingsSchema } from "../../Security/validation";
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
  // ***********************************************
  // Developer:Priya
  // Purpose:To Create Grade
  // ***********************************************
  const EditPurchaseOrderParameter = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const Data = useSelector((state) => state.formApi.Data);
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.loading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
  
  
    const location = useLocation();
    const { toggleSidebar, broken, rtl } = useProSidebar();
    useEffect(() => {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    const [ini, setIni] = useState(true);
    const [loading, setLoading] = useState(false);
    var apiData = "";
    apiData = {
      Code: Data.Code,
      Name: Data.Name,
      SortOrder: Data.SortOrder,
      Disable: Data.Disable,
    };
    //*******Assign Grage values from Database in  Yup initial value******* */
    const initialValues = {
      Code: Data.Code,
      Name: apiData.Name,
      SortOrder: apiData.SortOrder,
      checkbox: apiData.Disable === "Y" ? true : false ,
    };
    // **********Save Function*****************
    const fnSave = async (values) => {
      setLoading(true);
      setIni(false);
      // if (values.Code == "") {
      //   toast.error("Please Enter Code");
      //   return;
      // }
  
      if (values.Name == "") {
        toast.error("Please Enter Purchase Order Parameter");
        return;
      }
      var isCheck = "N";
      if (values.checkbox == true) {
        isCheck = "Y";
      }
  
      console.log(values);
  
      var idata = {
        RecordID: recID,
        Code: values.Code,
        Name: values.Name,
        SortOrder: values.SortOrder,
        Disable: isCheck,
        YearID: Year,
        Finyear,
        CompanyID,
        
      };
      // var type = "";
  
      // if (mode == "A") {
      //   type = "insert";
      // } else {
      //   type = "update";
      // }
      let action = mode === "A" ? "insert" : "update";
      const data = await dispatch(postData({ accessID, action, idata }));
  
      // const data = await dispatch(postApidata(accessID, type, idata));
      if (data.payload.Status == "Y") {
        toast.success(data.payload.Msg);
        setIni(true);
        setLoading(false);
        navigate(`/Apps/TR157/Paurchase Order Parameter`);
      } else {
        toast.error(data.payload.Msg);
        setLoading(false);
      }
    };
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
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
            navigate("/Apps/TR157/Paurchase Order Parameter");
          }
        } else {
          return;
        }
      });
    };
    return (
      <React.Fragment>
        {getLoading ? <LinearProgress /> : false}
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" borderRadius="3px" alignItems="center">
            {broken && !rtl && (
              <IconButton onClick={() => toggleSidebar()}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h3">Purchase Order Parameter</Typography>
          </Box>
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton onClick={() => fnLogOut("Close")} color="error">
                <ResetTvIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={() => fnLogOut("Logout")} color="error">
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
  
        {!getLoading ? (
          <Box m="20px">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, setSubmitting) => {
                setTimeout(() => {
                  fnSave(values);
                }, 100);
              }}
              validationSchema={ratingsSchema}
              enableReinitialize={ini}
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
                    gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                    gap="30px"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <FormControl
                      fullWidth
                      sx={{ gridColumn: "span 2", gap: "40px" }}
                    >
                      <TextField
                        name="Code"
                        type="text"
                        id="Code"
                        label="Code"
                        variant="filled"
                        focused
                        value={values.Code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Code && !!errors.Code}
                        helperText={touched.Code && errors.Code}
                        autoFocus
                        onInvalid={(e) => {
                          e.target.setCustomValidity("Please Fill The Code");
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      <TextField
                        name="Name"
                        type="text"
                        id="Name"
                        label="Name"
                        variant="filled"
                        focused
                        value={values.Name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                        required
                        inputProps={{ maxLength: 25 }}
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            "Please Fill The Name"
                          );
                        }}
                        onInput={(e) => {
                          e.target.setCustomValidity("");
                        }}
                      />
                      <TextField
                        name="SortOrder"
                        type="number"
                        id="SortOrder"
                        label="Sort Order"
                        variant="filled"
                        focused
                        value={values.SortOrder}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.SortOrder && !!errors.SortOrder}
                        helperText={touched.SortOrder && errors.SortOrder}
                        sx={{ background: "#fff6c3" }}
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
                          name="checkbox"
                          id="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          as={Checkbox}
                          label="Disable"
                        />
  
                        <FormLabel focused={false}>Disable</FormLabel>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="20px">
                    {YearFlag == "true" ? (
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        loading={loading}
                        disabled={isSubmitting}
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
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        navigate("/Apps/TR157/Paurchase Order Parameter");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
      </React.Fragment>
    );
  };
  
  export default EditPurchaseOrderParameter;
  