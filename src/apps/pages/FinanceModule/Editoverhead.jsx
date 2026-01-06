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
  Avatar,
  Stack
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  explorePostData,
  fetchApidata,
  getFetchData,
  postApidata,
  postData,
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
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,

} from "../../../ui-components/global/utils";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import store from "../../../index";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
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
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  // console.log("🚀 ~ file: Editoverhead.jsx:20 ~ Editoverhead ~ data:", data);
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = React.useState(secondaryCurrentPage);
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema1, setValidationSchema1] = useState(null);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const [show, setScreen] = React.useState("0");
  const [pageSize, setPageSize] = React.useState(15);
  const [rowCount, setRowCount] = useState(0);
  const isLoading = useSelector((state) => state.formApi.loading);
  const [funMode, setFunMode] = useState("A");

  var userimg = store.getState().globalurl.imageUrl;
  if (mode == "A") {
    userimg = userimg + "Defaultimg.jpg";
  } else {
    if (
      data.ImageName == undefined ||
      data.ImageName == null ||
      data.ImageName == ""
    ) {
      userimg = userimg + "Defaultimg.jpg";
    } else {
      userimg = userimg + data.ImageName;
    }
  }
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  console.log("🚀 ~ Editoverhead ~ explorelistViewcolumn:", explorelistViewcolumn)
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  function Employee() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* <Typography>
              {show == "2" ? "List of Functions" : "List of Designation"}||{show=="6" && "List of Documents"}
              
            </Typography> */}
          <Typography>
            {show == "1"
              ? "List of Additional Expense"
              : ""}
          </Typography>
          <Typography variant="h5">{`(${rowCount})`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          <Tooltip title="ADD">
            <IconButton type="reset">
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }
  let VISIBLE_FIELDS = [];

  if (show == "1") {
    VISIBLE_FIELDS = [
      "slno", 
      "OverHeadsChild",
      "Sortorder",  
      "action",
    ];
  }

  const columns = React.useMemo(() => {
    let visibleColumns = explorelistViewcolumn.filter((column) =>
      VISIBLE_FIELDS.includes(column.field)
    );

    if (VISIBLE_FIELDS.includes("slno")) {
      const slnoColumn = {
        field: "slno",
        headerName: "SL#",
        width: 50,
        sortable: false,
        filterable: false,
        valueGetter: (params) =>
          page * pageSize +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1,
      };

      visibleColumns = [slnoColumn, ...visibleColumns];
      console.log("🚀 ~ Editoverhead ~ visibleColumns:", visibleColumns)
    }

    return visibleColumns;
  }, [explorelistViewcolumn, show, page, pageSize]);
  console.log("🚀 ~ Editoverhead ~ columns:", columns)
  
  const newcolumn = React.useMemo(
    () =>
      explorelistViewcolumn.filter((column) =>
        VISIBLE_FIELDS.includes(column.field)
      ),
    [explorelistViewcolumn]
  );

  const [LeaveCondata, setLeaveCondata] = useState({
    recordID: "",
    overhead: "",
    sortorder: "",
    checkbox: "",


  });
  const selectCellRowData = ({ rowData, mode, field, setFieldValue }) => {
    setFunMode(mode);

    if (mode == "A") {

      setLeaveCondata({
        recordID: "",
        overhead: "",
        sortorder: "",
        checkbox: "",
      });
    } else {

      if (field == "action") {
        setLeaveCondata({
          recordID: rowData.RecordID,
          sortorder: rowData.Sortorder,
          checkbox: rowData.Disable,
          overhead: rowData.ChildID
            ? {
              RecordID: rowData.ChildID,
              Code: rowData.ChildCode,
              Name: rowData.ChildName,
            }
            : null,
         
        });
        setFieldValue("overhead", {
          RecordID: rowData.ChildID,
          Code: rowData.ChildCode,
          Name: rowData.ChildName,
        });

      }
    }
    console.log(selectCellRowData, "Itemservices");
  };
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
          OverheadType: Yup.object().required(data.Overhead.OverheadType).nullable(),
          frequency: Yup.string().required(data.Overhead.frequency),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Overhead.code);
        }

        const schema = Yup.object().shape(schemaFields);
          const schema1 = Yup.object().shape({
          overhead: Yup.object().required(data.Overhead.Overhead).nullable(),       
        });
        setValidationSchema(schema);
        setValidationSchema1(schema1);

      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
  // const CompanyID = sessionStorage.getItem("compID");
  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      dispatch(fetchApidata(accessID, "get", recID));
    }
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview(
          "TR325",
          "Additional Expense",
          `parentID=${recID} AND CompanyID=${CompanyID}`,
          ""
        )
      );
      dispatch(fetchApidata(accessID, "get", recID));
      // selectcelldata("", "A", "");
    }

  };
  const initialValue = {
    code: data.Code,
    name: data.Name,
    frequency: data.Frequency,
    accounttype: data.AccountType || "Debit",

    OverheadType: data.OverHeadTypeID
      ? { RecordID: data.OverHeadTypeID, Name: data.OverHeadType }
      : null,
    disable: data.Disable === "Y" ? true : false,
    delete: data.DeleteFlag === "Y" ? true : false

  };
  console.log(initialValue, "OverheadType");
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
      Code: values.code,
      Name: values.name,
      Frequency: values.frequency,
      AccountType: values.accounttype,
      Productcost: values.productCost || "",
      OverHeadsTypeID: values.OverheadType.RecordID || 0,
      OverHeadsTypeName: values.OverheadType.Name || "",
      Finyear,
      CompanyID,
      Disable: values.disable == true ? "Y" : "N",
      DeleteFlag: values.delete == true ? "Y" : "N",

    };
    console.log(idata, "idata");
    // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(`/Apps/TR085/Overhead/EditOverhead/${response.payload.OverheadsRecid}/E`);
    } else {
      toast.error(response.payload.Msg);
      setLoading(false);
    }
  };
  const initialValue2 = {
    code: data.Code,
    description: data.Name,
    overhead: LeaveCondata.overhead || null,
    checkbox: LeaveCondata.checkbox === "Y" ? true : false,
    sortorder: LeaveCondata.sortorder,
    // delete: data.DeleteFlag === "Y" ? true : false

  };
    const AddexpFnsave = async (values, resetForm, del) => {
      setLoading(true);
      let action =
        funMode === "A" && !del
          ? "insert"
          : funMode === "E" && del
            ? "harddelete"
            : "update";
      const idata = {
        RecordID: LeaveCondata.recordID,       
        OverHeadsID: recID,
        // values.overhead.RecordID || 0,
        Code: values.overhead.Code || "",
        Name: values.overhead.Name || "",
        Sortorder: values.sortorder || 0,
        Disable: values.checkbox == true ? "Y" : "N",
        CompanyID,
      };
      // console.log("save" + JSON.stringify(saveData));
  
      const response = await dispatch(
        explorePostData({ accessID: "TR325", action, idata })
      );
      if (response.payload.Status == "Y") {
        setLoading(false);
        dispatch(
          fetchExplorelitview("TR325", "Additional Expense", `parentID=${recID} AND CompanyID=${CompanyID}`, "")
        );
  
        toast.success(response.payload.Msg);
  
        selectCellRowData({ rowData: {}, mode: "A", field: "" });
        resetForm();
      } else {
        setLoading(false);
        toast.error(response.payload.Msg);
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
          navigate(-1);
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
                  Overhead
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    Additional Expense
                  </Typography>
                ) : (
                  false
                )}

              </Breadcrumbs>
            </Box>
          </Box>

          <Box display="flex">
            {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Explore</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Overhead</MenuItem>
                  <MenuItem value={1}>Additional Expense</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}
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

      {show == "0" && !getLoading ? (

        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValue}
            // onSubmit={(values, { resetForm }) => {
            //   setTimeout(() => {
            //     fnSave(values);
            //   }, 100);
            // }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              fnSave(values);
              setSubmitting(false);
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
              setFieldValue
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
                      InputProps={{ readOnly: true }}
                    // autoFocus
                    />
                  ) : (
                    <TextField
                      name="code"
                      type="text"
                      id="code"
                      label={
                        <>
                          Code<span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </>
                      }
                      variant="standard"
                      focused
                      // required
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
                    label={
                      <>
                        Overhead<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    autoFocus={CompanyAutoCode == "Y"}
                  // required
                  />
                  {/* <FormControl
                    focused
                    variant="standard"
                  //sx={{ gridColumn: "span 2" }}
                  > */}
                  {/* <InputLabel id="frequency">Frequency<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel> */}
                  <TextField
                    label={
                      <>
                        Frequency<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    id="frequency"
                    name="frequency"
                    focused
                    variant="standard"
                    value={values.frequency}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.frequency && !!errors.frequency}
                    helperText={touched.frequency && errors.frequency}
                  // required
                  >

                    <MenuItem value="D">Daily</MenuItem>
                    <MenuItem value="W">Weekly</MenuItem>
                    <MenuItem value="M">Monthly</MenuItem>
                    <MenuItem value="Y">Yearly</MenuItem>
                    <MenuItem value="B">By Monthly</MenuItem>
                    <MenuItem value="S">Six Month</MenuItem>
                    <MenuItem value="Q">Quarterly</MenuItem>
                    <MenuItem value="F">Fortnightly</MenuItem>
                  </TextField>
                  <CheckinAutocomplete
                    sx={{ marginTop: "1px" }}
                    name="OverheadType"
                    label={
                      <>
                        Overhead Type
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="outlined"
                    id="OverheadType"
                    value={values.OverheadType}
                    onChange={(newValue) => {
                      setFieldValue("OverheadType", newValue);
                      console.log(newValue, "--newValue");
                      console.log(newValue.RecordID, "////");
                    }}
                    error={!!touched.OverheadType && !!errors.OverheadType}
                    helperText={touched.OverheadType && errors.OverheadType}
                    //  onChange={handleSelectionFunctionname}
                    // defaultValue={selectedFunctionName}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2126","ScreenName":"OverheadType","Filter":"CompanyID=${CompanyID}","Any":""}}`}
                  />
                  <TextField
                    label="Account Type"
                    // {
                    //   <>
                    //     Account Type<span style={{ color: "red", fontSize: "20px" }}>*</span>
                    //   </>
                    // }
                    select
                    id="accounttype"
                    name="accounttype"
                    focused
                    variant="standard"
                    value={values.accounttype}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.accounttype && !!errors.accounttype}
                    helperText={touched.accounttype && errors.accounttype}
                  // required
                  >

                    <MenuItem value="Debit">Debit</MenuItem>
                    <MenuItem value="Credit">Credit</MenuItem>

                  </TextField>

                  {/* </FormControl> */}

                  {/* <FormControl
                    focused
                    variant="standard"
                  //sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="productCost">Type<span style={{ color: 'red',fontSize:'20px'}}>*</span></InputLabel> */}
                  {/* <TextField
                    label={
                      <>
                        Type<span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    id="productCost"
                    name="productCost"
                    // required
                    value={values.productCost}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.productCost && !!errors.productCost}
                    helperText={touched.productCost && errors.productCost}
                    focused
                    select
                    variant="standard"
                  >
                    <MenuItem value="P">Cost Of Product</MenuItem>
                    <MenuItem value="E">Cost Of Employee</MenuItem>
                    <MenuItem value="M">Cost Of Material</MenuItem>
                    <MenuItem value="F">Cost Of Fixed Assets</MenuItem>
                    <MenuItem value="S">Salary</MenuItem>
                  </TextField> */}


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
                <Box display="flex" justifyContent="end" padding={1} gap={formGap}>
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                    loading={loading}
                  >
                    SAVE
                  </LoadingButton>
                  {/* {mode == "E" ? (
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        Swal.fire({
                          title: errorMsgData.Warningmsg.Delete,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fnSave(values, "harddelete");
                            // navigate(-1);
                          } else {
                            return;
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    null
                  )} */}
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
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
      {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={initialValue2}
            enableReinitialize={true}
           validationSchema={validationSchema1}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              AddexpFnsave(values, resetForm, false);
            }, 100);
          }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
              resetForm,
              setFieldValue
            }) => (
              <form
                onSubmit={handleSubmit}
                onReset={() => {
                  selectCellRowData({ rowData: {}, mode: "A", field: "" });
                  resetForm();
                }}
              >
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
                  <FormControl sx={{ gap: formGap }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="code"
                      name="code"
                      value={values.code}
                      label="Code"
                      focused
                      inputProps={{ readOnly: true }}
                    />

                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      id="description"
                      name="description"
                      value={values.description}
                      label="Name"
                      focused
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                  <Stack
                    sx={{
                      //    width: {sm:'100%',md:'100%',lg:'100%'},
                      //gridColumn: "span 2",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      right: "0px",
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={userimg}
                      sx={{ width: "200px", height: "120px" }}
                    />
                  </Stack>

                  <Box
                    m="5px 0 0 0"
                    //height={dataGridHeight}
                    height="50vh"
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
                      rows={explorelistViewData}
                      columns={columns}
                      // columns={explorelistViewcolumn}
                      disableSelectionOnClick
                      getRowId={(row) => row.RecordID}
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      onCellClick={(params) => {
                        selectCellRowData({
                          rowData: params.row,
                          mode: "E",
                          field: params.field,
                          setFieldValue
                        });
                      }}
                      rowsPerPageOptions={[5, 10, 20]}
                      pagination
                      components={{
                        Toolbar: Employee,
                      }}
                      onStateChange={(stateParams) =>
                        setRowCount(stateParams.pagination.rowCount)
                      }
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "odd-row"
                          : "even-row"
                      }
                      loading={exploreLoading}
                      componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                    />
                  </Box>

                  <FormControl sx={{ gap: formGap }}>
                    <CheckinAutocomplete
                      variant="outlined"
                      name="overhead"
                      label={
                        <>
                          OverHead
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </>
                      }
                      id="overhead"
                      value={values.overhead}
                      onChange={(newValue) => {
                        setFieldValue("overhead", newValue);
                      }}
                      error={!!touched.overhead && !!errors.overhead}
                      helperText={touched.overhead && errors.overhead}
                      url={`${listViewurl}?data={"Query":{"AccessID":"2032","ScreenName":"OverHead","Filter":"companyID='${CompanyID}'","Any":""}}`}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      value={values.sortorder}
                      id="sortorder"
                      name="sortorder"
                      label="Sort Order"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.sortorder && !!errors.sortorder}
                      helperText={touched.sortorder && errors.sortorder}
                      focused
                      InputProps={{
                          inputProps: {
                            style: { textAlign: "right" },
                          },
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
                    </Box></FormControl>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  padding={1}
                  style={{ marginTop: "-40px" }}
                  gap={2}
                >
                  <LoadingButton
                    color="secondary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      Swal.fire({
                        title: errorMsgData.Warningmsg.Delete,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirm",
                      }).then((result) => {
                        if (result.isConfirmed) {
                           AddexpFnsave(values, resetForm, "harddelete");
                        } else {
                          return;
                        }
                      });
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    type="reset"
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setScreen(0);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Paper >
      ) : (
        false
      )}
    </React.Fragment >
  );
};

export default Editoverhead;
