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
  Breadcrumbs,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Field, Formik } from "formik";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
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
import { HsnSchema } from "../../Security/validation";
import { DesignationSchema } from "../../Security/validation";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight } from "../../../ui-components/utils";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tokens } from "../../../Theme";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { useTheme } from "@emotion/react";

// import CryptoJS from "crypto-js";
const Editdesignation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  var recID = params.id;
  var mode = params.Mode;
  var accessID = params.accessID;
  const data = useSelector((state) => state.formApi.Data) || {};
  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const location = useLocation();
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const [show, setScreen] = React.useState("0");

  const [funMode, setFunMode] = useState("A");
  const [laomode, setLaoMode] = useState("A");
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        console.log(data, "errormsgdta");
        let schemaFields = {
          name: Yup.string().trim().required(data.Designation.name),
          rank: Yup.string().trim().required(data.Designation.rank),
        };

        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().trim().required(data.Designation.code);
        }

        const schema = Yup.object().shape(schemaFields);
        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  // *************** INITIALVALUE  *************** //

  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID, get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID, get: "", recID }));
      }
    }
    if (event.target.value == "1") {
      dispatch(
        fetchExplorelitview(
          "TR364",
          "Designation Documents",
          // `PartyID='${recID}' AND CompanyID='${CompanyID}'`,
          `CompanyID='${CompanyID}' AND (FIND_IN_SET('${recID}', DOC_DRECID))`,
          ""
        )
      );

    }

  };
  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);


  const VISIBLE_FIELDS =
    show == "1"
      ? [
        "slno",
        "Code",
        "Documents",
        // "Party",
        // "Unit",
        "action",
      ]
      : [];
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
        // valueGetter: (params) =>
        //   page * pageSize +
        //   params.api.getRowIndexRelativeToVisibleRows(params.id) +
        //   1,
        renderCell: (params) => params.row.SLNO,

      };
      visibleColumns = [slnoColumn, ...visibleColumns];
    }

    return visibleColumns;
  }, [explorelistViewcolumn, VISIBLE_FIELDS]);
  const [rowCount, setRowCount] = useState(0);
  const [uploadFile, setUploadFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const InitialValue = {
    code: data.Code,
    name: data.Description,
    rank: data.DesignationRank,
    hoursrate: data.HoursRate,
    sortorder: data.SortOrder,
    disable: data.Disable === "Y" ? true : false,
    delete: data.DeleteFlag === "Y" ? true : false,
  };
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
          <Typography>
            {show == "1"
              ? "List of Documents"
              : ""
            }
          </Typography>
          {show == "1" && (<Typography variant="h5">{`(${rowCount})`}</Typography>)}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          {show != "1" && (
            <Tooltip title="ADD">
              <IconButton type="reset">
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>)}
        </Box>
      </GridToolbarContainer>
    );
  }
  const Fnsave = async (values, del) => {
    // let action = mode === "A" ? "insert" : "update";
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

    const idata = {
      RecordID: recID,
      Code: values.code,
      Description: values.name,
      DesignationRank: values.rank,
      SortOrder: values.sortorder || 0,
      HoursRate: values.hoursrate || 0,
      Disable: isCheck,
      DeleteFlag: values.delete == true ? "Y" : "N",
      Finyear,
      CompanyID,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate("/Apps/TR122/Designation");
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
          navigate("/Apps/TR122/Designation");
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
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  Designation
                </Typography>
                {show == "1" ? (
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  >
                    List Of Documents
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
                  <MenuItem value={0}>Designation</MenuItem>
                  <MenuItem value={1}>List Of Documents</MenuItem>
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

      {show == "0" ? (
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
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
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
                          Code
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
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
                      sx={{
                        backgroundColor: "#ffffff", // Set the background to white
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                        },
                      }}
                      autoFocus
                    />
                  )}
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.name}
                    onBlur={handleBlur}
                    //onChange={handleChange}
                    onChange={(e) => {
                      const value = e.target.value;
                      // allow only letters and spaces
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      backgroundColor: "#ffffff", // Set the background to white
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#f5f5f5 ", // Ensure the filled variant also has a white background
                      },
                    }}
                    // required
                    autoFocus={CompanyAutoCode == "Y"}
                  />
                  <TextField
                    name="rank"
                    type="number"
                    id="rank"
                    label={
                      <>
                        Rank
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    value={values.rank}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    // required
                    error={!!touched.rank && !!errors.rank}
                    helperText={touched.rank && errors.rank}
                  />
                  <TextField
                    name="hoursrate"
                    type="number"
                    id="hoursrate"
                    label="Hours Rate"
                    // label={
                    //   <>
                    //     Hours Rate<span style={{ color: "red", fontSize: "20px" }}>*</span>
                    //   </>
                    // }
                    variant="standard"
                    focused
                    value={values.hoursrate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                    // required
                    error={!!touched.hoursrate && !!errors.hoursrate}
                    helperText={touched.hoursrate && errors.hoursrate}
                  />
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
                  {/* {YearFlag === "true" && mode !== "A" ? (
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
                    <Button
                      color="error"
                      variant="contained"
                      disabled={true}
                    >
                      Delete
                    </Button>
                  )} */}
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
                            Fnsave(values,"harddelete");
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
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate("/Apps/TR122/Designation");
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

      {show == "1" ? (
        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={InitialValue}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
              // onReset={() => {
              //   selectCellRowData({ rowData: {}, mode: "A", field: "" });
              //   resetForm();
              // }}
              >


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

                  {/* <FormControl sx={{ gap: formGap }}> */}
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    id="code"
                    name="code"
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Code"
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Name"
                    focused
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  {/* </FormControl> */}
                </Box>

                <Box
                  m="5px 0 0 0"
                  // height="50vh"
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
                    rows={explorelistViewData}
                    columns={columns}
                    disableSelectionOnClick
                    getRowId={(row) => row.RecordID}
                    rowHeight={dataGridRowHeight}
                    headerHeight={dataGridHeaderFooterHeight}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) =>
                      setPageSize(newPageSize)
                    }
                    // onCellClick={(params) => {
                    //   selectCellRowData({
                    //     rowData: params.row,
                    //     mode: "E",
                    //     field: params.field,
                    //   });
                    // }}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    components={{
                      Toolbar: Employee,
                    }}
                    onStateChange={(stateParams) =>
                      setRowCount(stateParams.pagination.rowCount)
                    }
                    loading={exploreLoading}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "odd-row"
                        : "even-row"
                    }
                  />
                </Box>



              </form>
            )}

          </Formik>
          <Box display="flex" justifyContent="end" padding={1} gap="20px">
            <Button
              color="warning"
              variant="contained"
              onClick={() => {
                setScreen("0");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editdesignation;
