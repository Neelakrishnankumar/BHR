import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  Button,
  Breadcrumbs,
  IconButton,
  Tooltip,
  useTheme,
  LinearProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tokens } from "../../../Theme";
import * as Yup from "yup";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { P_columns,p_rows } from "./mockfile";
import { ML_columns, ML_rows } from "../../../dataApi/mockDataApi";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchUserData,
  userGroupExplore,
  userGroupRowUpdate,
} from "../../../store/reducers/Explorelitviewapireducer";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridPageSize,
  dataGridPageSizeOption,
  formGap,
} from "../../../ui-components/utils";

const Editusergroup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const rowDatastate = location.state || {};
  console.log(rowDatastate, "--rowDatastate");
  const [page, setPage] = useState(0);

  const recID = params.id;
  const mode = params.Mode;

  const accessID = params.accessID;
  const CompanyID = sessionStorage.getItem("compID");
  const [pageSize, setPageSize] = React.useState(20);

    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");

  // console.log("🚀 ~ file: Editusergroup.jsx:65 ~ Editusergroup ~ Year:", Year)

  useEffect(() => {
    dispatch(getFetchUserData({ accessID, get: "get", recID }));
    if (mode === "A") {
      dispatch(
        userGroupExplore({ CompanyID: CompanyID, UsergroupID: recID })
      );
    }
  }, [location.key]);

  // *************** REDUX STATES *************** //
  const data = useSelector((state) => state.exploreApi.Data);
  const status = useSelector((state) => state.formApi.Status);
  const Msgs = useSelector((state) => state.formApi.msg);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const rowData = useSelector((state) => state.exploreApi.explorerowData);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  // const YearRecorid = sessionStorage.getItem("YearRecorid");
  const Finyear = sessionStorage.getItem("YearRecorid");
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


        const schema1 = Yup.object().shape({
          name: Yup.string().required(data.Usergroup.name),
        });
        setValidationSchema(schema1);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  function handleConfirmChange1(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_ADD: event.target.checked,
          UGA_VIEW: event.target.checked,
          UGA_MOD: event.target.checked,
          UGA_DEL: event.target.checked,
          UGA_PRINT: event.target.checked,
          UGA_PROCESS: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_ADD: event.target.checked,
            UGA_VIEW: event.target.checked,
            UGA_MOD: event.target.checked,
            UGA_DEL: event.target.checked,
            UGA_PRINT: event.target.checked,
            UGA_PROCESS: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange2(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" == clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_ADD: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_ADD: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange3(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_VIEW: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_VIEW: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange4(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_MOD: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_MOD: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function handleConfirmChange5(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_DEL: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_DEL: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange6(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_PRINT: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_PRINT: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }
  function handleConfirmChange7(event, clickedRow) {
    const updatedData = rowData.map((x) => {
      if ("0" === clickedRow.SM_RECID) {
        return {
          ...x,
          UGA_PROCESS: event.target.checked,
        };
      } else {
        if (x.SM_RECID === clickedRow.SM_RECID) {
          return {
            ...x,
            UGA_PROCESS: event.target.checked,
          };
        }
      }
      return x;
    });
    dispatch(userGroupRowUpdate({ rowData: updatedData }));
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{
            fontWeight: 700,
            color: "#111827",
          }}
          >List of Screen Names</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }
  const column = [
    // {
    //   field: "SLNO",
    //   headerName: "SL#",
    //   width: 50,
    // },
    // {
    //   field: "slno",
    //   headerName: "SL#",
    //   width: 50,
    //   sortable: false,
    //   filterable: false,
    //   valueGetter: (params) =>
    //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
    // },
    {
      field: "slno",
      headerName: "SL#",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

        const totalVisibleRows = params.api.getAllRowIds().length;
        const totalAllRows = params.api.getRowsCount();

        if (totalVisibleRows < totalAllRows) {
          return index + 1;
        } else {
          return page * pageSize + index + 1;
        }
      },
    },
    {
      field: "SM_CAPTION1",
      headerName: "Screen Name",
      width: 150,
    },
    {
      field: "all",
      headerName: "All",
      // width: 10,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={
              params.row?.UGA_ADD &&
              params.row?.UGA_VIEW &&
              params.row?.UGA_MOD &&
              params.row?.UGA_DEL &&
              params.row?.UGA_PRINT &&
              params.row?.UGA_PROCESS
            }
            onChange={(event) => handleConfirmChange1(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_ADD",
      headerName: "Add",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_ADD}
            onChange={(event) => handleConfirmChange2(event, params.row)}
          />
        );
      },
    },

    {
      field: "UGA_VIEW",
      headerName: "View",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_VIEW}
            onChange={(event) => handleConfirmChange3(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_MOD",
      headerName: "Modify",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_MOD}
            onChange={(event) => handleConfirmChange4(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_DEL",
      headerName: "Delete",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_DEL}
            onChange={(event) => handleConfirmChange5(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_PROCESS",
      headerName: "Print",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_PRINT}
            onChange={(event) => handleConfirmChange6(event, params.row)}
          />
        );
      },
    },
    {
      field: "UGA_PRINT",
      headerName: "Process",
      flex: 1,
      // width: 10,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row?.UGA_PROCESS}
            onChange={(event) => handleConfirmChange7(event, params.row)}
          />
        );
      },
    },
  ];
  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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
          navigate(`/Apps/Secondarylistview/TR095/Usergroups/${CompanyID}`);
        }
      } else {
        return;
      }
    });
  };

  const userGroupInitialValue = {
    code: data.Code,
    name: data.Name,
    comments: data.Comments,
    disable: data.Disable === "Y" ? true : false,
    sortOrder: data.SortOrder,
  };

  const userGroupSavefn = async (values, resetForm) => {
    let action = mode === "A" ? "insert" : "update";
    var isCheck = "N";
    if (values.disable == true) {
      isCheck = "Y";
    }

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      Comments: values.comments,
      Company: CompanyID,
      Disable: isCheck,
      SortOrder: values.sortOrder || 0,
      Groupaccess: rowData,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
      // navigate(`/Apps/Secondarylistview/TR095/Usergroups/${CompanyID}`,{state:rowData});
    } else {
      toast.error(response.payload.Msg);
    }
  };


    const label =
  Subscriptionlastthree === "003" ? "Permission Management" : "User Group";

const text =
  mode === "E"
    ? `${label}(${data.CompanyName})`
    : `${label}(New)`;
  return (
    <React.Fragment>
      {/* {getLoading ? <LinearProgress /> : false} */}
        <Box sx={{ height: "100vh", overflow: "auto" }}>
                    <Box sx={{ p: 1, backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
                      <Box sx={{borderRadius: 3 }}>
                        <Paper sx={{ borderRadius: 3 }}>
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
                   sx={{
                     fontSize: 20,
                     fontWeight: 700,
                     color: "#111827",
                     // mb: 0.2,
                         px: 1,
           py: 0.2,
                   }}
                // onClick={() => {
                //   navigate(
                //     `/Apps/Secondarylistview/TR095/Usergroups/${CompanyID}`
                //   );
                // }}
                >
{text}
                  {/* {mode === "E" ? `User Group(${data.CompanyName})` : "User Group(New)"} */}

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
            <IconButton>
              <LogoutOutlinedIcon
                onClick={() => fnLogOut("Logout")}
                color="error"
              />
            </IconButton>
          </Box>
        </Box>
      </Paper>
           </Box>
      {/* {!getLoading && data && rowData ? ( */}
             <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
             <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
           <Paper elevation={0} sx={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: 3, p: 3 }}>
        <Box>
          <Formik
            initialValues={userGroupInitialValue}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                userGroupSavefn(values, resetForm);
              }, 100);
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
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
            }) => (
              <form onSubmit={handleSubmit}>
                  {/* Header */}
                                                      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                                                        <Box
                                                          sx={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#E0E7FF",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: 18,
                                                          }}
                                                        >
                                                          👥
                                                        </Box>
                                                        <Box>
                                                          <Typography variant="h6" fontWeight={700} color="#0D94885">
                                                           {label}
                                                          </Typography>
                                                          <Typography variant="caption" color="text.secondary">
                                                            Manage user groups, roles, and access permissions.
                                                          </Typography>
                                                        </Box>
                                                      </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                  gap={formGap}
                  padding={1}
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    name="code"
                    type="text"
                    id="code"
                    label="Code"
                    placeholder="Auto"
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    focused
                    sx={{ 
                      gridColumn: "span 2",
 "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                     }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    name="name"
                    type="text"
                    id="name"
                    label={
                      <>
                        Name<span style={{ color: "red", fontSize: "20px" }}> * </span>
                      </>
                    }
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    focused
                    // required
                    sx={{ 
                      gridColumn: "span 2",
                       "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                     }}
                    autoFocus
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  // onInvalid={(e) => {
                  //   e.target.setCustomValidity(
                  //     "Please fill the Name"
                  //   );
                  // }}
                  // onInput={(e) => {
                  //   e.target.setCustomValidity("");
                  // }}

                  />
                  <TextField
                    name="comments"
                    type="text"
                    id="comments"
                    value={values.comments}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Comments"
                    variant="outlined"
                    size="small"
                    focused
                    sx={{ 
                      gridColumn: "span 2", 
 "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },

                    }}
                  />
                  <TextField
                    name="sortOrder"
                    type="number"
                    id="sortOrder"
                    value={values.sortOrder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Sort Order"
                    variant="outlined"
                    size="small"
                    focused
                    onWheel={(e) => e.target.blur()}
                    sx={{
                      gridColumn: "span 2",
                      input: { textAlign: "right" },
                      background: "",
                       "& .MuiOutlinedInput-root": {
                                  backgroundColor: "#fff",
                                  borderRadius: "6px",

                                  "& fieldset": {
                                    borderColor: "#d1d5db", // 👈 light grey border
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#bfc4cc", // 👈 slightly darker on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#d1d5db", // 👈 keep SAME grey on focus (like your UI)
                                    borderWidth: "1px",
                                  },
                                },

                                "& .MuiInputLabel-root": {
                                  color: "#6b7280", // label grey
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#6b7280", // keep same on focus
                                },
                    }}
                  />
                  <Box sx={{ gridColumn: "span 2" }}>
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
                <Box>
                  <Box m="5px">
                    <Box
                      m="5px 0 0 0"
                      height={dataGridHeight}
                      // height="65vh"
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
                          backgroundColor: "#c4f5f2",
                          color: "", // Color for even rows
                        },
                         "& .MuiDataGrid-columnHeaderTitle": {
                              color: colors.blueAccent[900],
                              fontWeight: 600,
                            },
                            "& .MuiTablePagination-root": {
                              color: colors.blueAccent[900],
                            },
                            /* ✅ PAGINATION STYLES (WHITE COLOR) */
                            "& .MuiTablePagination-root": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-selectLabel": {
                              color: "#fff",
                            },

                            "& .MuiTablePagination-displayedRows": {
                              color: "#fff",
                            },

                            /* Dropdown icon */
                            "& .MuiTablePagination-selectIcon": {
                              color: "#fff",
                            },

                            /* Left & Right arrow buttons */
                            "& .MuiTablePagination-actions button": {
                              color: "#fff",
                            },
                      }}
                    >
                      {rowData ? (
                        <DataGrid
                          sx={{
                            "& .MuiDataGrid-footerContainer": {
                              height: dataGridHeaderFooterHeight,
                              minHeight: dataGridHeaderFooterHeight,
                            },
                          }}
                          rows={rowData}
                          columns={column}
                          loading={exploreLoading}
                          disableSelectionOnClick
                          getRowId={(row) => row.RecordID}
                          headerHeight={dataGridHeaderFooterHeight}
                          pageSize={pageSize}
                          page={page}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          onPageChange={(newPage) => setPage(newPage)}
                          rowsPerPageOptions={dataGridPageSizeOption}
                          pagination
                          // pageSize={pageSize}
                          // onPageSizeChange={(newPageSize) =>
                          //   setPageSize(newPageSize)
                          // }
                          // rowsPerPageOptions={[5, 10, 20]}
                          // pagination
                          components={{
                            Toolbar: CustomToolbar,
                          }}
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
                          rowHeight={30}
                        />
                      ) : (
                        "Loding..."
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  padding={1}
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                >
                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#0D9488",
                        "&:hover": {
                          bgcolor: "#0F766E",
                        },
                      }}
                    
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
                        bgcolor: "#F97316",
                        "&:hover": {
                          bgcolor: "#EA580C",
                        },
                      }}
                    onClick={() => {
                      navigate(
                        -1
                        // `/Apps/Secondarylistview/TR095/Usergroups/${CompanyID}`
                      );
                    }}
                  >
                  Back

                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {/* <Popup
          title="Company"
          openPopup={openUCpopup}
          setOpenPopup={setOpenUCpopup}
        >
          <Listviewpopup
            accessID="2030"
            screenName="Company"
            childToParent={childToParent}
          />
        </Popup> */}
        </Box>
      </Paper>
       </Box>
                        </Box>
                          </Box>
                            </Box>
      {/* ) : (
        "Loading..."
      )} */}
    </React.Fragment>
  );
};

export default Editusergroup;
