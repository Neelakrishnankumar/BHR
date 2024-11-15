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
    InputLabel,
    Select,
    MenuItem,
    Stack,
    useTheme,
    Breadcrumbs,
    LinearProgress,
  } from "@mui/material";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import ResetTvIcon from "@mui/icons-material/ResetTv";
  import { Field, Formik } from "formik";
  import { CheckBox, Description } from "@mui/icons-material";
  import { useParams, useNavigate, useLocation } from "react-router-dom";
  import { gradeSchema } from "../../Security/validation";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-hot-toast";
  import {
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
    explorePostData,
  } from "../../../store/reducers/Formapireducer";
  import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarQuickFilter,
  } from "@mui/x-data-grid";
  // import Listviewpopup from "../Lookup";
  // import Popup from "../popup";
  import { tokens } from "../../../Theme";
  import React, { useState, useEffect, useRef } from "react";
  import { LoadingButton } from "@mui/lab";
  import Swal from "sweetalert2";
  import { useProSidebar } from "react-pro-sidebar";
  import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
  import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
  import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
  import { FunctionSchema } from "../../Security/validation";
import { date } from "yup";
  // import {  HsnSchema } from "../../Security/validation";
  // import CryptoJS from "crypto-js";
  const Holidaylist = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const data = useSelector((state) => state.formApi.Data);
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(() => {
      dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    const colors = tokens(theme.palette.mode);
  
    // *************** INITIALVALUE  *************** //
  
    const InitialValue = {
      oscc: data.Occasion,
      name: data.Description,
      Date: data.HolidayDate,
      Sortorder: data.SortOrder,
      disable: data.Disable === "Y" ? true : false,
    };
  console.log(data.Occasion, "data.Occasion");
    const Fnsave = async (values,del) => {
       let action =
    mode === "A" && !del
      ? "insert"
      : mode === "E" && del
      ? "harddelete"
      : "update";
      var isCheck = "N";
      if (values.disable == true) {
        isCheck = "Y";
      }
      console.log(values,"oscc");
    
      const idata = {
        RecordID: recID,
        Occasion: values.oscc,
        Description: values.name,
        HolidayDate: values.Date, 
        SortOrder: values.Sortorder,
        Disable: isCheck,
        Finyear,
        CompanyID,
      };
  console.log(idata,"idata");
      const response = await dispatch(postData({ accessID, action, idata }));
      if (response.payload.Status == "Y") {
        toast.success(response.payload.Msg);
        navigate("/Apps/TR218/Holiday List");
      } else {
        toast.error(response.payload.Msg);
      }
    };
  
    
      const fnLogOut = (props) => {
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
            navigate("/Apps/TR218/Holiday List");
          }
        } else {
          return;
        }
      });
    };
    return (
        <React.Fragment>
        {getLoading?<LinearProgress/>:false}
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" borderRadius="3px" alignItems="center">
              {broken && !rtl && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
              <Typography variant="h3">Holiday List</Typography>
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
    
          {!getLoading ? (
            <Box m="20px">
              <Formik
                initialValues={InitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    Fnsave(values);
                  }, 100);
                }}
                //validationSchema={FunctionSchema}
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
                          name="Date"
                          type="date"
                          id="Date"
                          label="Holiday Date"
                          variant="filled"
                          focused
                          required
                          value={values.Date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          sx={{ 
                            gridColumn: "span 2", 
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
                          label="Occasion"
                          variant="filled"
                          focused
                          value={values.oscc}
                          onBlur={handleBlur}
                          onChange={handleChange}                                                                            
                          
                          sx={{ 
                            gridColumn: "span 2", 
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
                          label="Description"
                          variant="filled"
                          focused
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          
                          sx={{ 
                            gridColumn: "span 2", 
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
                          variant="filled"
                          focused
                          value={values.Sortorder}
                          onBlur={handleBlur}
                          onChange={handleChange}
                         
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
                      </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px" gap="20px">
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
                      )}   {YearFlag == "true" ? (
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            Fnsave(values,  "harddelete");
                          }}
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button
                          color="error"
                          variant="contained"
                          disabled={true}
                        >
                          Delete
                        </Button>
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
            </Box>
          ) : (
            false
          )}
          
        </React.Fragment>
      );
  };
  
  export default Holidaylist;
  