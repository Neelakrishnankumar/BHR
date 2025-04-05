import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Breadcrumbs,
  LinearProgress,
  Paper,
  Tooltip,
} from "@mui/material";
import { formGap } from "../../../ui-components/global/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
} from "../../../store/reducers/Formapireducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FinanceSchema } from "../../Security/validation";
import { fileUpload } from "../../../store/reducers/Imguploadreducer";
import store from "../../../index";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { financeentrySchema } from "../../Security/validation";
const EditEmpfinance = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params", params);
  const accessID = params.accessID;
  const recID = params.id;
  const mode = params.Mode;
  var parentID = params.parentID;
  const filtertype = params.filtertype;
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formApi.Data);
  const [loading, setLoading] = useState(false);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // useEffect(() => {
  //   dispatch(getFetchData({ accessID, get: "get", recID }));
  // }, [location.key]);
  const [ImageName, setImgName] = useState("");
  const initialValue = {
    date: "",
    referenceifany: "",
    amount: "",
    comments: "",
    approvedby: "",
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fnSave = async (values) => {
    setLoading(true);

    const idata = {
      RecordID: "",
      FEDate: values.date,
      Referenceifany: values.referenceifany,
      Amount: values.amount,
      Comments: values.comments,
      // Approvedby:values.approvedby,
      OverheadsRecordID: selectOHLookupData.OHlookupRecordid,
      Attachment: ImageName,
      FinanceCategoryType: "E",
      Approvedby: params.RecordID,
    };

    var type = "";
    if (mode == "A") {
      type = "insert";
    } else {
      type = "update";
    }

    // const data = await dispatch(postApidata(accessID,type,idata))
    let action = "insert";
    const responce = await dispatch(postData({ accessID: "TR086", action, idata }));

    if (responce.payload.Status == "Y") {
      toast.success(responce.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(
        `/Apps/TR027/Employees`
      );
    } else {
      toast.error(responce.payload.Msg);
      setLoading(false);
    }
  };

  const [isPopupData, setisPopupdata] = React.useState(false);
  const [selectOHLookupData, setselectOHLookupData] = React.useState({
    OHlookupRecordid: "",
    OHlookupCode: "",
    OHlookupDesc: "",
  });
  if (isPopupData == false) {
    selectOHLookupData.OHlookupRecordid = data.OverheadRecordID;
    selectOHLookupData.OHlookupCode = data.Code;
    selectOHLookupData.OHlookupDesc = data.Name;
  }
  const [selectEMPLOYEELookupData, setselectEMPLOYEELookupData] =
    React.useState({
      EMPLOYEElookupRecordid: "",
      EMPLOYEElookupCode: "",
      EMPLOYEElookupDesc: "",
    });
  if (isPopupData == false) {
    selectEMPLOYEELookupData.EMPLOYEElookupRecordid = data.Approvedby;
    selectEMPLOYEELookupData.EMPLOYEElookupCode = data.ApprovedCode;
    selectEMPLOYEELookupData.EMPLOYEElookupDesc = data.ApprovedName;
  }
  const [openOHPopup, setOpenOHPopup] = useState(false);
  const [openEMPLOYEEPopup, setOpenEMPLOYEEPopup] = useState(false);
  function handleShow(type) {
    if (type == "OH") {
      setOpenOHPopup(true);
    }
    if (type == "EMP" || type == "PRD" || type == "MAT" || type == "FIA") {
      setOpenEMPLOYEEPopup(true);
    }
  }

  //************************** Lookup value assign type based Function *****************/
  const childToParent = (childdata, type) => {
    console.log("type---" + type);
    console.log("Data---" + JSON.stringify(childdata));

    if (type == "OverHead") {
      setisPopupdata(true);
      setselectOHLookupData({
        OHlookupRecordid: childdata.RecordID,
        OHlookupCode: childdata.Code,
        OHlookupDesc: childdata.Name,
      });
      setOpenOHPopup(false);
    }
    if (
      type == "Employee" ||
      type == "Products" ||
      type == "Material" ||
      type == "Fixed Assets"
    ) {
      setisPopupdata(true);
      setselectEMPLOYEELookupData({
        EMPLOYEElookupRecordid: childdata.RecordID,
        EMPLOYEElookupCode: childdata.Code,
        EMPLOYEElookupDesc: childdata.Name,
      });
      setOpenEMPLOYEEPopup(false);
    }
  };
  const ref = useRef(null);
  // *************** GET FILES FROM INPUT *************** //

  const getFileChange = async (event) => {
    setImgName(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "attachments");

    const fileData = await dispatch(fileUpload({ formData }));
    setImgName(fileData.payload.name);
    console.log(">>>", fileData.payload);
    console.log(
      "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
      fileData
    );
    if (fileData.payload.Status == "Y") {
      // console.log("I am here");
      toast.success(fileData.payload.Msg);
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
          navigate(
            `/Apps/TR027/Employees`
          );
        }
      } else {
        return;
      }
    });
  };
  return (
    <React.Fragment>
      {/* {getLoading ? <LinearProgress /> : false} */}
      {/* <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" borderRadius="3px" alignItems="center">
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
                navigate(`/Apps/TR027/Employees`);
              }}
            >
              Employee
            </Typography>


            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
           
            >
              Expense Entry
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
            
            >
              {params.Name}
            </Typography>
            
          </Breadcrumbs>
        </Box>
        <Box display="flex">
          <IconButton color="error" onClick={() => fnLogOut("Close")}>
            <ResetTvIcon />
          </IconButton>
          <IconButton>
            <LogoutOutlinedIcon
              color="error"
              onClick={() => fnLogOut("Logout")}
            />
          </IconButton>
        </Box>
      </Box> */}
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
                navigate(`/Apps/TR027/Employees`);
              }}
            >
              Employee
            </Typography>


            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
           
            >
              Expense Entry
            </Typography>
            <Typography
              variant="h5"
              color="#0000D1"
              sx={{ cursor: "default" }}
            
            >
              {params.Name}
            </Typography>
            
          </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            {/* {mode !== "A" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Explore</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={show}
                label="Explore"
                onChange={screenChange}
              >
                <MenuItem value={0}>Function</MenuItem>
                <MenuItem value={1}>Employee</MenuItem>
              </Select>
            </FormControl>
          ) : (
            false
          )} */}
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
      {/* {!getLoading ? ( */}
      <Paper elevation={3} sx={{ margin: "10px" }}>
        <Formik
          initialValues={initialValue}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              fnSave(values);
            }, 100);
          }}
          validationSchema={financeentrySchema}
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
                // gap="30p"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 2",
                  },
                }}
              >
                
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Date"
                    variant="standard"
                    focused
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputFormat="YYYY-MM-DD"
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{  background: "#f5f5f5" }}

                    autoFocus
                  />
                  <TextField
                    name="referenceifany"
                    type="text"
                    id="referenceifany"
                    label="Reference If Any"
                    variant="standard"
                    focused
                    value={values.referenceifany}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.referenceifany && !!errors.referenceifany
                    }
                    helperText={
                      touched.referenceifany && errors.referenceifany
                    }
                    autoFocus
                  />

                  
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="ID"
                        variant="standard"
                        value={selectOHLookupData.OHRecordID}
                        focused
                        sx={{ display: "none" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Over Head"
                        variant="standard"
                        value={selectOHLookupData.OHlookupCode}
                        focused
                        // required
                        inputProps={{ tabIndex: "-1" }}
                      />
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        onClick={() => handleShow("OH")}
                      >
                        <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                      </IconButton>
                      {/* <MoreHorizIcon onClick={()=>handleShow('CTY')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="standard"
                        value={selectOHLookupData.OHlookupDesc}
                        fullWidth
                        inputProps={{ tabIndex: "-1" }}
                        focused
                      />
                    </FormControl>
                 

                  <TextField
                    name="amount"
                    type="text"
                    id="amount"
                    label="Amount"
                    variant="standard"
                    focused
                    value={values.amount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.amount && !!errors.amount}
                    helperText={touched.amount && errors.amount}
                    sx={{  background: "" }}
                    autoFocus
                  />
                  <TextField
                    name="comments"
                    type="text"
                    id="comments"
                    label="comments"
                    variant="standard"
                    focused
                    value={values.comments}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.comments && !!errors.comments}
                    helperText={touched.comments && errors.comments}
                    autoFocus
                  />
                  {/* <TextField
                    name="approvedby"
                    type="text"
                    id="approvedby"
                    label="Approved By"
                    variant="standard"
                    focused
                    value={values.approvedby}
                    onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.approvedby && !!errors.approvedby}
                    helperText={touched.approvedby && errors.approvedby}
                    
                    autoFocus
                    /> */}

              </Box>
              <Box display="flex" justifyContent="end" padding={1} gap="20px">
                <IconButton
                  size="small"
                  color="warning"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="all/*"
                    type="file"
                    onChange={getFileChange}
                  />
                  <PictureAsPdfOutlinedIcon />
                </IconButton>
                <Button
                  variant="contained"
                  component={"a"}
                  onClick={() => {
                    ImageName
                      ? window.open(

                        store.getState().globalurl.attachmentUrl +
                        ImageName,

                        "_blank"
                      )
                      : toast.error("Please Upload File");
                  }}
                >
                  View
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  SAVE
                </LoadingButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    navigate(
                      `/Apps/TR027/Employees`
                    );
                  }}
                >
                  CANCEL
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Popup
          title="OverHead"
          openPopup={openOHPopup}
          setOpenPopup={setOpenOHPopup}
        >
          <Listviewpopup
            accessID="2032"
            screenName="OverHead"
            childToParent={childToParent}
            filterName={"FinanceCategoryType"}
            filterValue={parentID}
          />
        </Popup>
        <Popup
          title={
            // parentID == "E"
            "Employee"
            // : parentID == "P"
            // ? "Products"
            // : parentID == "F"
            // ? "Fixed Assets"
            // : "Material"
          }
          openPopup={openEMPLOYEEPopup}
          setOpenPopup={setOpenEMPLOYEEPopup}
        >
          <Listviewpopup
            accessID={
              // parentID == "E"
              "2024"
              // : parentID == "P"
              // ? "2002"
              // : parentID == "F"
              // ? "2055"
              // : "2000"
            }
            screenName={
              // parentID == "E"
              "Employee"
              // : parentID == "P"
              // ? "Products"
              // : parentID == "F"
              // ? "Fixed Assets"
              // : "Material"
            }
            childToParent={childToParent}
          />
        </Popup>
      </Paper>
      {/* // ) : (
      //   false
      // )} */}
    </React.Fragment>
  );
};

export default EditEmpfinance;
