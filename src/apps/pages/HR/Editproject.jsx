// import {
//   TextField,
//   Box,
//   Typography,
//   FormControl,
//   FormLabel,
//   Button,
//   IconButton,
//   FormControlLabel,
//   Tooltip,
//   Checkbox,
//   LinearProgress,
//   Paper
// } from "@mui/material";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import ResetTvIcon from "@mui/icons-material/ResetTv";
// import { Field, Formik } from "formik";
// import { CheckBox } from "@mui/icons-material";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { gradeSchema } from "../../Security/validation";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//   fetchApidata,
//   getFetchData,
//   postApidata,
//   postData,
// } from "../../../store/reducers/Formapireducer";
// import React, { useState, useEffect, useRef } from "react";
// import { LoadingButton } from "@mui/lab";
// import Swal from "sweetalert2";
// import { useProSidebar } from "react-pro-sidebar";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import { formGap } from "../../../ui-components/global/utils";

// // import CryptoJS from "crypto-js";
// const Editproject = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   let params = useParams();
//   const dispatch = useDispatch();
//   var recID = params.id;
//   var mode = params.Mode;
//   var accessID = params.accessID;
//   const data = useSelector((state) => state.formApi.Data) || {};
//   const Status = useSelector((state) => state.formApi.Status);
//   const Msg = useSelector((state) => state.formApi.msg);
//   const isLoading = useSelector((state) => state.formApi.postLoading);
//   const getLoading = useSelector((state) => state.formApi.getLoading);
//   const YearFlag = sessionStorage.getItem("YearFlag");
//   const Year = sessionStorage.getItem("year");
//   const Finyear = sessionStorage.getItem("YearRecorid");
//   const CompanyID = sessionStorage.getItem("compID");
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const location = useLocation();
//   useEffect(() => {
//     dispatch(getFetchData({ accessID, get: "get", recID }));
//   }, [location.key]);
//   // *************** INITIALVALUE  *************** //

//   const InitialValue = {
//     code: data.Code,
//     name: data.Name,

//     sortorder: data.SortOrder,
//     disable: data.Disable === "Y" ? true : false,
//   };

//   // const Fnsave = async (values, del) => {
//   //   // let action = mode === "A" ? "insert" : "update";
//   //   let action =
//   //     mode === "A" && !del
//   //       ? "insert"
//   //       : mode === "E" && del
//   //         ? "harddelete"
//   //         : "update";
//   //   var isCheck = "N";
//   //   if (values.disable == true) {
//   //     isCheck = "Y";
//   //   }

//   //   const idata = {
//   //     RecordID: recID,
//   //     Code: values.code,
//   //     Name: values.name,

//   //     SortOrder: values.sortorder,
//   //     Disable: isCheck,
//   //     Finyear,
//   //     CompanyID,
//   //   };

//   //   const response = await dispatch(postData({ accessID, action, idata }));
//   //   if (response.payload.Status == "Y") {
//   //     toast.success(response.payload.Msg);
//   //     //navigate("/Apps/TR133/Project");
//   //     navigate(-1);
//   //   } else {
//   //     toast.error(response.payload.Msg);
//   //   }
//   // };

//   const Fnsave = async (values, del) => {
//   let action;
//   if (del) {
//     action = "harddelete";
//   } else {
//     action = editRowId ? "update" : "insert";
//   }

//   let isCheck = "N";
//   if (values.disable === true) {
//     isCheck = "Y";
//   }

//   let accessID = "TR268";

//   const idata = {
//     RecordID: recid,
//     ProjectID: params.id,
//     DesignationID: selectedDesignation?.RecordID,
//     EmployeeID: employee?.EmployeeID || editRowId,
//     SortOrder: sortorder,
//     Disable: isCheck
//   };

//   const response = await dispatch(postData({ accessID, action, idata }));

//   if (response.payload.Status === "Y") {
//     toast.success(response.payload.Msg);

//     // Reset form only if not deleting
//     if (!del) {
//       setEditRowId(null);
//       setSelectedDesignation(null);
//       setEmployee(null);
//       setSortorder("");
//     }

//     const url = store.getState().globalurl.projectRoleurl;
//     const payload = { EmployeeProjectFilter: params.id };

//     axios
//       .post(url, payload, {
//         headers: {
//           Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//         },
//       })
//       .then((response) => {
//         setRows(response.data.Data);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch data", err);
//         setError("Failed to fetch data");
//       })
//       .finally(() => setLoading(false));
//   } else {
//     toast.error(response.payload.Msg);
//   }
// };

//   const fnLogOut = (props) => {
//     //   if(Object.keys(ref.current.touched).length === 0){
//     //     if(props === 'Logout'){
//     //       navigate("/")}
//     //       if(props === 'Close'){
//     //         navigate("/Apps/TR022/Bank Master")
//     //       }

//     //       return
//     //  }
//     Swal.fire({
//       title: `Do you want ${props}?`,
//       // text:data.payload.Msg,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: props,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (props === "Logout") {
//           navigate("/");
//         }
//         if (props === "Close") {
//           // navigate("/Apps/TR133/Project");
//           navigate("/");
//         }
//       } else {
//         return;
//       }
//     });
//   };
//   return (
//     <React.Fragment>
//       {getLoading ? <LinearProgress /> : false}
//       <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
//         <Box display="flex" justifyContent="space-between" p={2}>
//           <Box display="flex" borderRadius="3px" alignItems="center">
//             {broken && !rtl && (
//               <IconButton onClick={() => toggleSidebar()}>
//                 <MenuOutlinedIcon />
//               </IconButton>
//             )}
//             <Typography
//               variant="h5"
//               color="#0000D1"
//               sx={{ cursor: "default" }}

//             >
//               Project
//             </Typography>
//           </Box>

//           <Box display="flex">
//             <Tooltip title="Close">
//               <IconButton onClick={() => fnLogOut("Close")} color="error">
//                 <ResetTvIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Logout">
//               <IconButton color="error" onClick={() => fnLogOut("Logout")}>
//                 <LogoutOutlinedIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>
//       </Paper>

//       {!getLoading ? (
//         <Paper elevation={3} sx={{ margin: "10px" }}>
//           <Formik
//             initialValues={InitialValue}
//             onSubmit={(values, setSubmitting) => {
//               setTimeout(() => {
//                 Fnsave(values);
//               }, 100);
//             }}
//             //  validationSchema={ DesignationSchema}
//             enableReinitialize={true}
//           >
//             {({
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               isSubmitting,
//               values,
//               handleSubmit,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Box
//                   display="grid"
//                   gap={formGap}
//                   padding={1}
//                   gridTemplateColumns="repeat(2 , minMax(0,1fr))"
//                   // gap="30px"
//                   sx={{
//                     "& > div": {
//                       gridColumn: isNonMobile ? undefined : "span 2",
//                     },
//                   }}
//                 >

//                   <TextField
//                     name="code"
//                     type="text"
//                     id="code"
//                     label="Code"
//                   variant="standard"
//                     focused
//                     required
//                     value={values.code}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     error={!!touched.code && !!errors.code}
//                     helperText={touched.code && errors.code}
//                     autoFocus
//                   />
//                   <TextField
//                     name="name"
//                     type="text"
//                     id="name"
//                     label="Description"
//                   variant="standard"
//                     focused
//                     value={values.name}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     error={!!touched.name && !!errors.name}
//                     helperText={touched.name && errors.name}
//                     autoFocus
//                   />

//                   <TextField
//                     name="sortorder"
//                     type="number"
//                     id="sortorder"
//                     label="Sort Order"
//                   variant="standard"
//                     focused
//                     value={values.sortorder}
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     error={!!touched.sortorder && !!errors.sortorder}
//                     helperText={touched.sortorder && errors.sortorder}
//                     sx={{ background: "" }}
//                     InputProps={{
//                       inputProps: {
//                         style: { textAlign: "right" },
//                       },
//                     }}
//                     onWheel={(e) => e.target.blur()}
//                     onInput={(e) => {
//                       e.target.value = Math.max(0, parseInt(e.target.value))
//                         .toString()
//                         .slice(0, 8);
//                     }}
//                   />
//                   <Box>
//                     <Field
//                       //  size="small"
//                       type="checkbox"
//                       name="disable"
//                       id="disable"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       as={Checkbox}
//                       label="Disable"
//                     />

//                     <FormLabel focused={false}>Disable</FormLabel>
//                   </Box>

//                 </Box>
//                 <Box display="flex" justifyContent="end" padding={1} gap="20px">
//                   {YearFlag == "true" ? (
//                     <LoadingButton
//                       color="secondary"
//                       variant="contained"
//                       type="submit"
//                       loading={isLoading}
//                     >
//                       Save
//                     </LoadingButton>
//                   ) : (
//                     <Button
//                       color="secondary"
//                       variant="contained"
//                       disabled={true}
//                     >
//                       Save
//                     </Button>
//                   )} {YearFlag == "true" ? (
//                     <Button
//                       color="error"
//                       variant="contained"
//                       onClick={() => {
//                         Fnsave(values, "harddelete");
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   ) : (
//                     <Button
//                       color="error"
//                       variant="contained"
//                       disabled={true}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                   <Button
//                     color="warning"
//                     variant="contained"
//                     onClick={() => {
//                       // navigate("/Apps/TR133/Project");
//                       navigate(-1);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </Box>
//               </form>
//             )}
//           </Formik>
//         </Paper>
//       ) : (
//         false
//       )}
//     </React.Fragment>
//   );
// };

// export default Editproject;

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
  Paper,
  InputLabel,
<<<<<<< HEAD
  MenuItem,
  Select
=======
  Select,
  MenuItem,
>>>>>>> 5ec912de39b14b42354d4516c118eba868f101df
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
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
import { formGap } from "../../../ui-components/global/utils";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";

// import CryptoJS from "crypto-js";
const Editproject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  var mode = params.Mode;
  // var accessID = params.accessID;
  var accessID = params.accessID;

  const data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [employee, setEmployee] = useState("");
  console.log(employee, "employeelookup");
  const location = useLocation();
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //

  const InitialValue = {
    code: data.Code,
    name: data.Name,
<<<<<<< HEAD
    currentstatus: data.CurrentStatus,
=======
>>>>>>> 5ec912de39b14b42354d4516c118eba868f101df
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    incharge: data.ProjectIncharge
      ? { RecordID: data.ProjectIncharge, Name: data.ProjectInchargeName }
      : null,
    ServiceMaintenance: data.ServiceMaintenanceProject === "Y" ? true : false,
    Routine: data.RoutineTasks === "Y" ? true : false,
    CurrentStatus: data.CurrentStatus,
  };

  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
        ? "softdelete"
        : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }


    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      ProjectIncharge: values.incharge.RecordID || 0,
      ProjectInchargeName: values.incharge.Name || "",
      CurrentStatus:values.currentstatus,
      ServiceMaintenanceProject: values.ServiceMaintenance === true ? "Y" : "N",
      RoutineTasks: values.Routine === true ? "Y" : "N",
      SortOrder: values.sortorder || 0,
      CurrentStatus: values.CurrentStatus || "",
      Disable: isCheck,
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      //navigate("/Apps/TR133/Project");
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
    }
  };
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
          // navigate("/Apps/TR133/Project");
          navigate("/");
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
            <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
              Project
            </Typography>
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
            //  validationSchema={ DesignationSchema}
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
                  {CompanyAutoCode == "Y" ? (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label="Code"
                      placeholder="Auto"
                      variant="standard"
                      focused
                      // required
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      InputProps={{ readOnly: true }}
                      // autoFocus
                    />
                  ) : (
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
                    label="Description"
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  <Productautocomplete
                    name="incharge"
                    label="Owner"
                    id="incharge"
                    value={values.incharge}
                    onChange={async (newValue) => {
                      setFieldValue("incharge", newValue);
                    }}
                    // "Filter":"parentID='${compID}' AND EmployeeID='${EMPID}'" ,
                    url={`${listViewurl}?data={"Query":{"AccessID":"2111","ScreenName":"Project Incharge","Filter":"parentID='${CompanyID}'","Any":""}}`}
                  />
                  <FormControl
                    focused
                    variant="standard"
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <InputLabel id="status">Current Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="currentstatus"
                      name="currentstatus"
                      value={values.currentstatus}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="Current">Current</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Old">Old</MenuItem>

                    </Select>
                  </FormControl>
                  <Box>
                    {/* <Box display="flex" flexDirection="row" gap={formGap}>
                    <Box display="flex" alignItems="center"> */}
                    <Field
                      type="checkbox"
                      name="Routine"
                      id="Routine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel focused={false} htmlFor="Routine" sx={{ ml: 1 }}>
                      Routine Tasks
                    </FormLabel>
                    <Field
                      type="checkbox"
                      name="ServiceMaintenance"
                      id="ServiceMaintenance"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      as={Checkbox}
                    />
                    <FormLabel
                      focused={false}
                      htmlFor="ServiceMaintenance"
                      sx={{ ml: 1 }}
                    >
                      Service & Maintenance
                    </FormLabel>
                  </Box>
                  <FormControl
                    focused
                    variant="standard"
                    // sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="CurrentStatus">Status</InputLabel>
                    <Select
                      labelId="demo"
                      id="CurrentStatus"
                      name="CurrentStatus"
                      value={values.CurrentStatus}
                      onBlur={handleBlur}
                      onChange={(e) =>{
                        setFieldValue("CurrentStatus",e.target.value)
                        if(e.target.value == "CU"){

                          setFieldValue("disable",false)
                        }else{
                          setFieldValue("disable",true)

                        }
                      }}
                    >
                      <MenuItem value="CU">Current</MenuItem>
                      <MenuItem value="CO">Completed</MenuItem>
                      <MenuItem value="H">Hold</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="sortorder"
                    type="number"
                    id="sortorder"
                    label="Sort Order"
                    variant="standard"
                    focused
                    value={values.sortorder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.sortorder && !!errors.sortorder}
                    helperText={touched.sortorder && errors.sortorder}
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
                  )}
                  {YearFlag == "true" && mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Fnsave(values, "harddelete");
                      }}
                    >
                      Delete
                    </Button>
                  ) : // <Button
                  //   color="error"
                  //   variant="contained"
                  //   disabled={true}
                  // >
                  //   Delete
                  // </Button>
                  null}
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      // navigate("/Apps/TR133/Project");
                      navigate(-1);
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

export default Editproject;
