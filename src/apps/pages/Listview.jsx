import {
  Box,
  IconButton,
  useTheme,
  MenuItem,
  Typography,
  Menu,
  Tooltip,
  Chip,
  LinearProgress,
  Paper,
  InputBase,
  Divider,
  CircularProgress,
  TextField,
  Checkbox,
  Button,
  Stack,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import BalanceIcon from "@mui/icons-material/Balance";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
} from "../../ui-components/global/utils";
import MatxCustomizer from "./Mailpdf";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { tokens, ColorModeContext } from "../../Theme";
import { useProSidebar } from "react-pro-sidebar";
import React from "react";
import { useNavigate, useLocation, useActionData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchListview } from "../../store/reducers/Listviewapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { fnCsvFileUpload, fnCsvFileUploadnew, } from "../../store/reducers/Imguploadreducer";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { screenRightsData } from "../../store/reducers/screenRightsreducer";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import {
  ExcelFileDownload,
  ExcelFileUpload,
  searchData,
  Setup_MenuExcel,
  VendorFilterController,
} from "../../store/reducers/Formapireducer";
import toast from "react-hot-toast";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Delete, Psychology, Category, PeopleAlt } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CategoryIcon from "@mui/icons-material/Category";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Formik } from "formik";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import {
  CheckinAutocomplete,
  MultiFormikOptimizedAutocomplete,
  OrderItemAutocomplete,
} from "../../ui-components/global/Autocomplete";
import OrdEnqProductPDF from "./pdf/OrdEnqProduct";
import OrdEnqPartyPDF from "./pdf/OrdEnqParty";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import { Visibility } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import EventNoteIcon from '@mui/icons-material/EventNote';
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FileUploadIconButton from "../../ui-components/global/Fileuploadbutton";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { FaFileExcel } from "react-icons/fa";
import { getConfig } from "../../config";
import OrderEnqProdandPartyExcel from "./pdf/OrderEnqProdandPartyExcel";


const Listview = () => {
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const YearFlag = sessionStorage.getItem("YearFlag");
  var currentPage = parseInt(sessionStorage.getItem("currentPage"));
  const location = useLocation();
  console.log(location, "location -----------------");


  const HeaderImg = sessionStorage.getItem("CompanyHeader");
  const FooterImg = sessionStorage.getItem("CompanyFooter");
  console.log("HeaderImg", HeaderImg, FooterImg);
  const config = getConfig();
  const baseurlUAAM = config.UAAM_URL;
  console.log("baseurlUAAM", baseurlUAAM)



  const dispatch = useDispatch();
  const params = useParams();
  console.log(params, "-------------");
  const LoginID = sessionStorage.getItem("loginrecordID");
  const fromDate = useSelector((state) => state.listviewApi.fromDate);
  const currentDate = new Date().toISOString().split("T")[0];
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [pageSize, setPageSize] = React.useState(20);
  const [page, setPage] = React.useState(currentPage || 0);
  const [collapse, setcollapse] = React.useState(false);
  var invoice;
  const mailData = useSelector((state) => state.listviewApi.mailData);
  const searchLoading = useSelector((state) => state.formApi.searchLoading);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  var screenName = params.screenName;
  // console.log("🚀 ~ file: Listview.jsx:54 ~ Listview ~ screenName", screenName);
  const year = sessionStorage.getItem("year");
  const listViewData = useSelector((state) => state.listviewApi.rowData);

  const loading = useSelector((state) => state.listviewApi.loading);
  const { UGA_ADD, UGA_VIEW, UGA_MOD, UGA_DEL, UGA_PROCESS, UGA_PRINT } =
    useSelector((state) => state.screenRights.data);
  // console.log("🚀 ~ file: Listview.jsx:61 ~ Listview ~ UGA_MOD:", UGA_MOD)

  // console.log("🚀 ~ file: Listview.jsx:60 ~ Listview ~ rightsData:", JSON.stringify(rightsData))

  // console.log("rowdata" + JSON.stringify(listViewData));
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);

  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  const compID = sessionStorage.getItem("compID");
  const YearRecorid = sessionStorage.getItem("YearRecorid");
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [showMore, setShowMore] = React.useState(false);
  const [ImageName, setImgName] = useState({ name: "Choose File" });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fileName, setFileName] = useState();
  const [assignrecid, setAssignrecid] = useState("");

  //BULK UPLOAD
  const [showBulkUpload, setShowBulkUpload] = React.useState(false);
  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      const fileObject = {
        name: selectedFile.name,
        lastModified: selectedFile.lastModified,
        lastModifiedDate: selectedFile.lastModifiedDate,
        webkitRelativePath: selectedFile.webkitRelativePath,
        size: selectedFile.size,
      };

      //     console.log(file);

      setImgName(fileObject);
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }
      setFileName(fileObject.name);

      console.log(fileObject.name, '===============');
      setSelectedFile(selectedFile);
      console.log("Selected File:", selectedFile);
      console.log("RecordID :", assignrecid);
      // console.log("RecordID before appending to FormData:", Data.RecordID);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", "POS");
      formData.append("recordid", assignrecid);



      const fileData = await dispatch(fnCsvFileUploadnew(formData));

      console.log("fileData:", JSON.stringify(fileData));

      //   if (fileData.payload) {
      //     //setImgName(fileData.payload.apiResponse);
      //     toast.success("File uploaded successfully!");
      //   } else {
      //     console.error("Unexpected response structure:", fileData);
      //   }
      // } catch (error) {
      //   console.error("File upload failed:", error);
      // }
      if (fileData.payload && fileData.payload.Status === "Y") {
        // Extract the Data field and show it in the toast
        toast.success(fileData.payload.Data || "Process completed successfully");
      } else {
        console.error("Unexpected response structure:", fileData);
        toast.error("File upload failed!");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("Error uploading file!");
    }

  };
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);
  // console.log(
  //   "🚀 ~ file: Listview.jsx:58 ~ Listview ~ listViewcolumn",
  //   listViewcolumn
  // );
  // `compID=${compID} AND compID=${YearRecorid}`
  // React.useEffect(() => {
  //   dispatch(
  //     fetchListview(
  //       accessID,
  //       screenName,
  //       accessID == "TR010" ||
  //         accessID == "TR140" ||
  //         accessID == "TR047" ||
  //         accessID == "TR152" ||
  //         accessID == "TR155" ||
  //         accessID == "TR022"
  //         ? `compID=${compID}`
  //         : "",
  //       "",
  //       compID
  //     )
  //   );
  //   // dispatch(screenRightsData(accessID));
  // }, [location.key]);
  React.useEffect(() => {
    dispatch(
      fetchListview(
        accessID,
        screenName,
        accessID == "TR010" ||
          accessID == "TR140" ||
          accessID == "TR047" ||
          accessID == "TR152" ||
          accessID == "TR155" ||
          accessID == "TR022"
          ? `compID=${compID}`
          : accessID == "TR027" ?
            `CompanyID=${compID}`
            : "",
        "",
        compID
      )
    );
    // dispatch(screenRightsData(accessID));
  }, [location.key]);

  function filterByID(item) {
    if (item.hide !== true) {
      return true;
    }
  }
  function filterByIDShow(item) {
    if (item.field != "action") {
      return true;
    }
  }

  // const columns = React.useMemo(
  //   () => listViewcolumn.filter(filterByID),
  //   [listViewcolumn]
  // );
  //   const columns = React.useMemo(
  //   () => listViewcolumn.filter(filterByID) ? [   {
  //   field: "slno",
  //   headerName: "SL#",
  //   width: 50,
  //   sortable: false,
  //   filterable: false,
  //   valueGetter: (params) =>
  //     `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`
  // },   ,...listViewcolumn.filter(filterByID)] :[],
  //   [listViewcolumn]
  // );
  // const columns = React.useMemo(
  //   () =>
  //     listViewcolumn.filter(filterByID)
  //       ? [
  //           {
  //             field: "slno",
  //             headerName: "SL#",
  //             width: 50,
  //             sortable: false,
  //             filterable: false,
  //             valueGetter: (params) =>
  //               page * pageSize +
  //               params.api.getRowIndexRelativeToVisibleRows(params.id) +
  //               1,
  //           },
  //           ...listViewcolumn.filter(filterByID),
  //         ]
  //       : [],
  //   [listViewcolumn, page, pageSize] // include page & pageSize as deps
  // );

  const columns = React.useMemo(() => {
    const filtered = listViewcolumn.filter(filterByID);

    if (!filtered) return [];

    const enhancedColumns = filtered.map((col) => {
      if (col.field === "BalanceStatus") {
        return {
          ...col,
          cellClassName: (params) => {
            if (params.value === "Negative") return "cell-negative-status";
            if (params.value === "Positive") return "cell-positive-status";
            return "";
          },
        };
      }
      if (col.field === "Balance") {
        return {
          ...col,
          renderCell: (params) => {
            const value = Number(params.value || 0);
            const absValue = Math.abs(value); // remove minus sign

            return (
              <span
                style={{
                  color:
                    value < 0 ? colors.redAccent[500] : colors.greenAccent[400],
                  fontWeight: 600,
                }}
              >
                {absValue}
              </span>
            );
          },
        };
      }
      return col;
    });

    return [
      {
        field: "slno",
        headerName: "SL#",
        width: 50,
        sortable: false,
        filterable: false,
        valueGetter: (params) =>
          page * pageSize +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1,
      },
      ...enhancedColumns,
    ];
  }, [listViewcolumn, page, pageSize]);

  // console.log("🚀 ~ file: Listview.jsx:88 ~ Listview ~ columns:", columns)

  const columnShow = React.useMemo(
    () => columns.filter(filterByIDShow),
    [listViewcolumn]
  );
  // console.log("🚀 ~ file: Listview.jsx:94 ~ Listview ~ columnShow:", columnShow)
  const rows = React.useMemo(() => {
    return listViewData;
  }, [listViewData]);

  /*****************File upload************ */
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "csv");

    console.log("fileData" + JSON.stringify(formData));
    const fileData = await dispatch(fnCsvFileUpload(formData));

    setUploadFile(fileData.payload.apiResponse);
  };


  const [productFilter, setProductFilter] = useState();
  const searchProduct = async () => {
    if (!productFilter) {
      toast.success("Please type modelno");
      return;
    }
    const idata = {
      accessID: accessID,
      filter: productFilter,
    };

    const response = await dispatch(searchData({ data: idata }));
    if (response.payload.status == 200) {
      // toast.success(response.payload.message);

      if (accessID == "TR002") {
        navigate(
          `/Apps/Secondarylistview/TR001/Product Master/${response.payload.data.PRD_PGRID}/${response.payload.data.PGR_DESC}`
        );
      }
      if (accessID == "TR044") {
        navigate(
          `/Apps/Secondarylistview/TR004/List of Materials/${response.payload.data.MGR_ID}/${response.payload.data.MGR_TYPE}/${response.payload.data.MTL_DESC}/${response.payload.data.MGR_MGROUP}/pm/`
        );
      }
    } else {
      toast.error(
        response.payload.message ? response.payload.message : "Error"
      );
    }
  };
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
          navigate("/Apps/TR027/Employees");
        }
      } else {
        return;
      }
    });
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        key={location.key}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Typography variant="h3">{screenName}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // allow wrapping on very small screens
            gap: 2,
            width: "100%",
            alignItems: "center",
          }}
        > */}
        {broken && !rtl && (
          <IconButton onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}

        <Typography variant="h3" noWrap>
          {screenName}
        </Typography>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginLeft: "auto",
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexShrink: 0, // prevent shrinking
              marginLeft: "auto", // push to right
            }}
          >
            {accessID === "TR313" ||
              accessID === "TR243" ||
              accessID === "TR328" ||
              accessID === "TR321" ? (
              <IconButton onClick={() => setShowMore((prev) => !prev)}>
                {showMore ? (
                  <Tooltip title="Close">
                    {/* <MoreHorizIcon /> */}
                    <FilterAltOutlinedIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Open">
                    {/* <MoreVertIcon /> */}
                    <FilterAltOutlinedIcon />
                  </Tooltip>
                )}
              </IconButton>
            ) : (
              false
            )}

            <Tooltip title="Bulk Upload">
              <IconButton sx={{ cursor: "pointer" }}>
                <FaFileExcel size={20}
                  color="#1D6F42"
                  onClick={() => setShowBulkUpload((prev) => !prev)}
                />
              </IconButton>
            </Tooltip>

            <GridToolbarQuickFilter key={accessID} />
            {accessID == "TR002" ? (
              <Tooltip arrow title="Product Tracking">
                <AssessmentIcon
                  sx={{ marginTop: "10px" }}
                  color="primary"
                  onClick={() => {
                    navigate(
                      "/Apps/TR200/Editproducttracking/EditProduct Tracking/1/A"
                    );
                  }}
                />
              </Tooltip>
            ) : (
              false
            )}

            {accessID == "TR043" ? (
              <Tooltip arrow title="Product Line Chart">
                <AssessmentIcon
                  sx={{ marginTop: "10px" }}
                  color="primary"
                  onClick={() => {
                    navigate(`/Apps/product-analysis/1/E`);
                  }}
                />
              </Tooltip>
            ) : (
              false
            )}

            {screenName == "UOM Type" ? (
              false
            ) : screenName == "Invoice Category" ? (
              false
            ) : screenName == "Materials Type" ? (
              false
            ) : accessID == "TR059" ? (
              false
            ) : accessID == "TR286" ? (
              false
            ) : accessID == "TR299" ? (
              false
            ) : accessID == "TR072" ? (
              false
            ) : accessID == "TR058" ? (
              false
            ) : accessID == "TR047" ? (
              false
            ) : accessID == "TR076" ? (
              false
            ) : accessID == "TR064" ? (
              false
            ) : accessID == "TR099" ? (
              false
            ) : accessID == "TR043" ? (
              false
            ) : accessID == "TR101" ? (
              false
            ) : accessID == "TR078" ? (
              false
            ) : accessID == "TR116" ? (
              false
            ) : accessID == "TR124" ? (
              false
            ) : accessID == "TR083" ? (
              false
            ) : accessID == "TR136" ? (
              false
            ) : accessID == "TR135" ? (
              false
            ) : accessID == "TR257" ? (
              false
            ) : accessID == "TR313" ? (
              false
            ) : accessID == "TR328" ? (
              false
            ) : accessID == "TR315" ? (
              false
            ) : accessID == "TR330" ? (
              false
            ) : YearFlag == "true" ? (
              // UGA_ADD ? (

              <Tooltip arrow title="Add">
                <IconButton>
                  <AddOutlinedIcon
                    onClick={() => {
                      navigate(
                        `./Edit${screenName}/-1/A${accessID === "TR010" ? "/0" : ""
                        }`,
                        {
                          state: {
                            CustomerID: "-1",
                            ProductID: "-1",
                            BomID: "-1",
                          },
                        }
                      );
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              // ) : (
              //   false
              // )
              false
            )}

              {/* <Tooltip arrow title="Import Excel">
                <IconButton
                  size="large"
                  color="primary"
                  component="label"
                >
                  <input
                    hidden
                    accept=".xlsx,.xls"
                    type="file"
                    onChange={handleDesignationImport}
                  />

                  <FileUploadIcon />
                </IconButton>
              </Tooltip> */}
            {/* <Tooltip arrow title="Excel">
            <IconButton  color="primary">
            <input hidden accept="all/*"  type="file" onChange={changeHandler}/>
            <FileUploadIcon />
          </IconButton>
            </Tooltip> */}
            {accessID == "TR064" ? (
              <Tooltip arrow title="Excel">
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="all/*"
                    type="file"
                    onChange={changeHandler}
                  />
                  <FileUploadIcon />
                </IconButton>
              </Tooltip>
            ) : (
              false
            )}
            {accessID == "TR059" ? (
              <Tooltip arrow title="Report">
                <AssessmentIcon
                  sx={{ marginTop: "10px" }}
                  color="primary"
                  onClick={() => {
                    navigate("/Apps/TR100/Editreport/EditReport/1/A");
                  }}
                />
              </Tooltip>
            ) : (
              false
            )}

            <GridToolbarExport
              printOptions={{ disableToolbarButton: true }}
              csvOptions={{
                fileName: `${screenName}`,
              }}
            />
            {/* {accessID == "TR122" && (
              <Box display="flex" alignItems="center" gap={2} mt={3}>
                <TextField
                  value={ImageName?.name || ""}
                  size="small"
                  sx={{ width: "200px", borderRadius: "10px" }}
                />
                <input
                  type="file"
                  name="csv"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  // disabled={!saveSuccess}
                />

                <Button
                  variant="contained"
                  color="primary"
                  // disabled={!saveSuccess}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  Upload
                </Button>
              </Box>)} */}
            <Tooltip arrow title="Logout">
              <IconButton onClick={() => fnLogOut("Logout")} color="error">
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  // var filter
  // if(accessID == "TR047"){
  //   filter =`Finyear='${year}'`
  // }else {
  //   filter =""
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("currentPage", pageno);
  };
  const [selectedFileExcel, setSelectedFileExcel] = React.useState(null);

  const [selectedFileName, setSelectedFileName] = useState("");

  const fileInputRef = React.useRef(null);

  return (
    <React.Fragment>
      <input
        id="bulk-excel-input"
        type="file"
        hidden
        accept=".xlsx,.xls"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          console.log("FILE SELECTED:", file.name);

          try {
            const formattedScreenName = screenName
              .trim()
              .split(" ")
              .filter(Boolean)
              .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join("");

            const forcedFileName = `${formattedScreenName}.xlsx`;

            const formData = new FormData();
            formData.append("excel", file, forcedFileName);
            const response = await dispatch(
              ExcelFileUpload({ formData, forcedFileName })
            ).unwrap();
            if (response.Status == "Y") {
              toast.success(response.Msg);
             // window.location.reload();
            } else {
              toast.error(response.Msg ? response.Msg : "Error");
            }
          } catch (error) {
            console.error(error);
            toast.error("Upload failed");
          }

          e.target.value = null;
        }}
      />
      <Box m="5px">
        {accessID == "TR002" || accessID == "TR044" ? (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
              height: 30,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
              type="text"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              disabled={searchLoading}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              {searchLoading ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon onClick={searchProduct} />
              )}
            </IconButton>
          </Paper>
        ) : (
          false
        )}
        <Box m="5px">
          <Box
            m="5px 0 0 0"
            padding={2}
            height={dataGridHeight}
            sx={{
              display: "flex",
              direction: "row",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .cell-negative-status": {
                color: colors.redAccent[500],
                fontWeight: 600,
              },
              "& .cell-positive-status": {
                color: colors.greenAccent[400],
                fontWeight: 600,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[800],
                // borderBottom: "none",
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
                backgroundColor: "#d0edec",
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
              key={accessID}
              rows={rows}
              // columns={UGA_MOD || UGA_VIEW ? columns : columnShow}
              columns={columns}
              loading={loading}
              disableSelectionOnClick
              rowHeight={dataGridRowHeight}
              headerHeight={dataGridHeaderFooterHeight}
              getRowId={(row) => row.RecordID}
              pageSize={pageSize}
              page={page}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 15, 20]}
              onPageChange={(pageno) => handlePagechange(pageno)}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "odd-row"
                  : "even-row"
              }
              components={{
                Toolbar: CustomToolbar,
              }}
            />

            {/* WORKING AS OF 09/02/2026 --> EXCEL + PARAMS */}
            {/* {showBulkUpload && (
              <Box
                sx={{
                  width: 300,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  position: "relative",
                }}
              >
                <Formik
                  initialValues={{
                    Sync: sessionStorage.getItem(`${screenName}_Sync`) || "Y",
                  }}
                  enableReinitialize={false}
                  onSubmit={async (values, { setSubmitting }) => {
                    if (!selectedFileExcel) {
                      toast.error("Please select an Excel file");
                      setSubmitting(false);
                      return;
                    }


                    try {
                      const formData = new FormData();
                     
                      const formatScreenName = (name) => {
                        if (!name) return "";
                        return name
                          .trim()
                          .split(" ")
                          .filter(Boolean)
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join("");
                      };

                      const formattedScreenName = formatScreenName(screenName);
                      const forcedFileName = `${formattedScreenName}.xlsx`;
                      console.log("🚀 ~ Listview ~ forcedFileName:", forcedFileName)

                      formData.append("excel", selectedFileExcel, forcedFileName);
                      formData.append("CompanyID", compID);
                      formData.append("screename", screenName);
                      formData.append("Sync", values.Sync);
                      formData.append("FinYear", YearRecorid || 0);

                      await dispatch(
                        ExcelFileUpload({
                          formData,
                          forcedFileName
                        })
                      ).unwrap();


                      toast.success("Excel uploaded successfully");
                      setShowBulkUpload(false);
                    } catch (error) {
                      toast.error("Upload failed");
                    } finally {
                      setSubmitting(false);
                    }
                  }}

                >
                  {({
                    values,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>

                      <Tooltip title="Close">
                        <IconButton
                          size="small"
                          onClick={() => setShowBulkUpload(false)}
                          sx={{ position: "absolute", top: 5, right: 5 }}
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                      </Tooltip>

                      <Stack spacing={2} marginTop={2}
                        sx={{
                          width: "100%",
                        }}>

                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<FileDownloadOutlinedIcon />}
                          onClick={async () => {
                            try {
                              const formatScreenName = (name) => {
                                if (!name) return "";

                                return name
                                  .trim()                       // remove leading/trailing spaces
                                  .split(" ")                   // split words
                                  .filter(Boolean)              // remove extra empty spaces
                                  .map(word =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  )
                                  .join("");                    // join without space
                              };

                              const formattedScreenName = formatScreenName(screenName);
                              const fileName = `${formattedScreenName}.xlsx`;


                              const payload = {
                                file: `'${fileName}'`,   
                              };

                              const result = await dispatch(
                                ExcelFileDownload({ data: payload })
                              );

                              const blob = new Blob([result.payload], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              });

                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute("download", fileName);
                              document.body.appendChild(link);
                              link.click();
                              link.remove();

                              toast.success("Excel downloaded successfully");
                            } catch (error) {
                              toast.error("Download failed");
                            }
                          }}
                        >
                          Download Excel Template
                        </Button>


                        <Button
                          variant="outlined"
                          startIcon={<FileUploadIconButton />}
                          onClick={() => fileInputRef.current.click()}
                        >
                          Choose Excel File
                          <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept=".xlsx,.xls"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setSelectedFileExcel(file);
                              }
                            }}
                          />


                        </Button>
                        <Typography variant="caption">
                          Debug: {selectedFileExcel ? "File Loaded" : "No File"}
                        </Typography>

                        {selectedFileExcel && (
                          <Typography variant="caption">
                            Selected: {selectedFileExcel.name}
                          </Typography>
                        )}

                        <FormControl>
                          <RadioGroup
                            row
                            value={values.Sync}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("Sync", value);
                              sessionStorage.setItem(`${screenName}_Sync`, value);
                            }}
                          >
                            <FormControlLabel value="Y" control={<Radio />} label="Sync" />
                            <FormControlLabel value="N" control={<Radio />} label="Replace" />
                          </RadioGroup>
                        </FormControl>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          Upload
                        </Button>

                      </Stack>

                    </form>
                  )}
                </Formik>
              </Box>
            )} */}

            {/* SEPERATE API FOR EXCEL AND PARAMS */}
            {showBulkUpload && (
              <Box
                sx={{
                  width: 300,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  position: "relative",
                }}
              >
                <Formik
                  initialValues={{
                    // Sync: sessionStorage.getItem(`${screenName}_Sync`) === "Y",
                    Sync: sessionStorage.getItem(`${screenName}_Sync`) || "Y",
                  }}
                  enableReinitialize={false}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const formData = new FormData();
                      // formData.append("file", selectedFileExcel);
                      // Format screenName → remove spaces
                      const formatScreenName = (name) => {
                        if (!name) return "";
                        return name
                          .trim()
                          .split(" ")
                          .filter(Boolean)
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join("");
                      };

                      const formattedScreenName = formatScreenName(screenName);
                      const forcedFileName = `${formattedScreenName}.xlsx`;
                      console.log("🚀 ~ Listview ~ forcedFileName:", forcedFileName);

                      
                      formData.append("CompanyID", compID);
                      formData.append("screename", screenName);
                      formData.append("Sync", values.Sync);
                      formData.append("FinYear", YearRecorid || 0);
                      const excelSetUp = {
                        CompanyID: compID,
                        screename: screenName,
                        Sync: values.Sync,
                        FinYear: YearRecorid || 0,
                      };

                      const response = await dispatch(
                        Setup_MenuExcel(excelSetUp)
                      ).unwrap();

                      if (response.Status == "Y") {
                        toast.success(response.Msg);
                       // window.location.reload();
                      } else {
                        toast.error(response.Msg ? response.Msg : "Error");
                      }
                    } catch (error) {
                      toast.error("Upload failed");
                    } finally {
                      setSubmitting(false);
                    }
                  }}

                >
                  {({
                    values,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>

                      {/* Close Button */}
                      <Tooltip title="Close">
                        <IconButton
                          size="small"
                          onClick={() => setShowBulkUpload(false)}
                          sx={{ position: "absolute", top: 5, right: 5 }}
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                      </Tooltip>

                      <Stack spacing={2} marginTop={2}
                        sx={{
                          width: "100%",
                        }}>

                        {/* Download Excel Button */}
                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<FileDownloadOutlinedIcon />}
                          onClick={async () => {
                            try {
                              const formatScreenName = (name) => {
                                if (!name) return "";

                                return name
                                  .trim()                       // remove leading/trailing spaces
                                  .split(" ")                   // split words
                                  .filter(Boolean)              // remove extra empty spaces
                                  .map(word =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  )
                                  .join("");                    // join without space
                              };

                              const formattedScreenName = formatScreenName(screenName);
                              const fileName = `${formattedScreenName}.xlsx`;


                              const payload = {
                                file: `'${fileName}'`,   // 🔥 REQUIRED single quotes
                              };

                              const result = await dispatch(
                                ExcelFileDownload({ data: payload })
                              );

                              const blob = new Blob([result.payload], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              });

                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute("download", fileName);
                              document.body.appendChild(link);
                              link.click();
                              link.remove();

                              toast.success("Excel downloaded successfully");
                            } catch (error) {
                              toast.error("Download failed");
                            }
                          }}
                        >
                          Download Excel Template
                        </Button>


                        {/* ✅ File Upload Button */}
                        {/* <Button
                          variant="outlined"
                          startIcon={<FileUploadIconButton />}
                          component="label"
                        >
                          Choose Excel File
                          <input
                            type="file"
                            // ref={fileInputRef}
                            hidden
                            accept=".xlsx,.xls"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              setSelectedFileName(file.name);

                              try {
                                const formattedScreenName = screenName
                                  .trim()
                                  .split(" ")
                                  .filter(Boolean)
                                  .map(word =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  )
                                  .join("");

                                const forcedFileName = `${formattedScreenName}.xlsx`;

                                const formData = new FormData();
                                formData.append("excel", file, forcedFileName);

                                await dispatch(
                                  ExcelFileUpload({ formData, forcedFileName })
                                ).unwrap();

                                toast.success("Excel uploaded successfully");

                              } catch (error) {
                                toast.error("Upload failed");
                              }
                            }}
                          />


                        </Button> */}
                        <Button
                          variant="outlined"
                          startIcon={<FileUploadIconButton />}
                          onClick={() => document.getElementById("bulk-excel-input").click()}
                        >
                          Choose Excel File
                        </Button>
                        {/* <Typography variant="caption">
                          Debug: {selectedFileName ? "File Loaded" : "No File"}
                        </Typography> */}
                        {/* <Typography variant="caption">
                          Debug: {selectedFileName || "No File"}
                        </Typography> */}
                        {selectedFileName && (
                          <Typography variant="caption">
                            Selected: {selectedFileName.name}
                          </Typography>
                        )}


                        {/* ✅ Sync Checkbox */}
                        <FormControl>
                          <RadioGroup
                            row
                            value={values.Sync}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("Sync", value);
                              sessionStorage.setItem(`${screenName}_Sync`, value);
                            }}
                          >
                            <FormControlLabel value="Y" control={<Radio />} label="Sync" />
                            <FormControlLabel value="N" control={<Radio />} label="Replace" />
                          </RadioGroup>
                        </FormControl>

                        {/* ✅ Upload Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          Upload
                        </Button>

                      </Stack>

                    </form>
                  )}
                </Formik>
              </Box>
            )}


            {showMore && accessID === "TR313" && (
              <Box
                sx={{
                  width: 300,
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Formik
                  initialValues={{
                    fromdate: sessionStorage.getItem("FromDate") || "",
                    date: sessionStorage.getItem("ToDate") || "",
                    Created: sessionStorage.getItem("TR313_Created") === "Y",
                    Process: sessionStorage.getItem("TR313_Process") === "Y",
                    Picked: sessionStorage.getItem("TR313_Picked") === "Y",
                    ReadyToDeliver:
                      sessionStorage.getItem("TR313_ReadyToDeliver") === "Y",
                    YetToDeliver:
                      sessionStorage.getItem("TR313_YetToDeliver") === "Y",
                    Paid: sessionStorage.getItem("TR313_Paid") === "Y",
                    Scheduled:
                      sessionStorage.getItem("TR313_Scheduled") === "Y",
                    Delivered:
                      sessionStorage.getItem("TR313_Delivered") === "Y",
                    Type: "ByProduct",
                    // party: [],
                    // product: [],
                    party:
                      JSON.parse(sessionStorage.getItem("TR313_Party")) || [],
                    product:
                      JSON.parse(sessionStorage.getItem("TR313_Product")) || [],
                    ordertype: sessionStorage.getItem("ordertype") || "",
                  }}
                  enableReinitialize
                  validate={(values) => {
                    const hasAtLeastOneValue =
                      values.fromdate ||
                      values.date ||
                      values.party ||
                      values.product ||
                      values.ordertype ||
                      values.Created ||
                      values.Process ||
                      values.ReadyToDeliver ||
                      values.YetToDeliver ||
                      values.Paid ||
                      values.Scheduled ||
                      values.Delivered ||
                      values.Picked;
                  }}
                  // onSubmit={(values, { setSubmitting }) => {
                  //   const conditions = [];
                  //   const statusDateMap = {
                  //     Created: "OROrderDate",
                  //     Process: "ORProcessDate",
                  //     ReadyToDeliver: "ORTentativeDate",
                  //     YetToDeliver: "ORTentativeDate",
                  //     Picked: "ORPickedDate",
                  //     Scheduled: "ORTentativeDate",
                  //     Delivered: "ORDeliveryDate",
                  //     Paid: "ORPaidDate",
                  //   };

                  //   const fromDate = values.fromdate || "";
                  //   const toDate = values.date || "";


                  //   sessionStorage.setItem("FromDate", fromDate);
                  //   sessionStorage.setItem("ToDate", toDate);
                  //   sessionStorage.setItem("ordertype", values.ordertype);
                  //   // Store checkbox values
                  //   Object.keys(statusDateMap).forEach((status) => {
                  //     sessionStorage.setItem(
                  //       `TR313_${status}`,
                  //       values[status] ? "Y" : "N"
                  //     );
                  //   });

                  //   sessionStorage.setItem(
                  //     "TR313_Filters",
                  //     JSON.stringify(values)
                  //   );

                  //   const selectedStatuses = Object.keys(statusDateMap).filter(
                  //     (status) => values[status]
                  //   );

                  //   if (selectedStatuses.length > 0) {
                  //     conditions.push(
                  //       `Status IN (${selectedStatuses
                  //         .map((s) => `'${s}'`)
                  //         .join(", ")})`
                  //     );
                  //   }

                  //   const dateConditions = [];

                  //   selectedStatuses.forEach((status) => {
                  //     const field = statusDateMap[status];

                  //     if (fromDate && toDate) {
                  //       dateConditions.push(
                  //         `(${field} BETWEEN '${fromDate}' AND '${toDate}')`
                  //       );
                  //     } else if (fromDate) {
                  //       dateConditions.push(`(${field} >= '${fromDate}')`);
                  //     } else if (toDate) {
                  //       dateConditions.push(`(${field} <= '${toDate}')`);
                  //     }
                  //   });
                  //   if (values.party?.length > 0) {
                  //     const partyIds = values.party
                  //       .map((p) => `'${p.RecordID}'`)
                  //       .join(", ");

                  //     conditions.push(`PartyRecordID IN (${partyIds})`);
                  //   }

                  //   if (values.product?.length > 0) {
                  //     const productIds = values.product
                  //       .map((p) => `'${p.RecordID}'`)
                  //       .join(", ");

                  //     conditions.push(`ProductID IN (${productIds})`);
                  //   }
                  //   if (values.ordertype?.length > 0) {
                  //     // const ordertype = values.ordertype.map(t => t).join("','");
                  //     conditions.push(`OrderType IN ('${values.ordertype}')`);
                  //   }
                  //   if (compID) {
                  //     conditions.push(`CompanyID = '${compID}'`);
                  //   }
                  //   if (dateConditions.length > 0) {
                  //     conditions.push(`(${dateConditions.join(" OR ")})`);
                  //   }

                  //   // --------------------------
                  //   // FINAL WHERE CLAUSE
                  //   // --------------------------
                  //   const whereClause = conditions.join(" AND ");
                  //   console.log("FINAL FILTER:", whereClause);

                  //   dispatch(
                  //     fetchListview(
                  //       accessID,
                  //       screenName,
                  //       whereClause,
                  //       "",
                  //       compID
                  //     )
                  //   );

                  //   setTimeout(() => setSubmitting(false), 100);
                  // }}
                  onSubmit={(values, { setSubmitting }) => {
                    const conditions = [];

                    // --------------------------
                    // DATE VALUES (ALWAYS OROrderDate)
                    // --------------------------
                    const fromDate = values.fromdate || "";
                    const toDate = values.date || "";

                    sessionStorage.setItem("FromDate", fromDate);
                    sessionStorage.setItem("ToDate", toDate);
                    sessionStorage.setItem("ordertype", values.ordertype || "");

                    if (fromDate && toDate) {
                      conditions.push(
                        `(OROrderDate BETWEEN '${fromDate}' AND '${toDate}')`
                      );
                    } else if (fromDate) {
                      conditions.push(`(OROrderDate >= '${fromDate}')`);
                    } else if (toDate) {
                      conditions.push(`(OROrderDate <= '${toDate}')`);
                    }

                    // --------------------------
                    // STATUS FILTER
                    // --------------------------
                    const allStatuses = [
                      "Created",
                      "Process",
                      "ReadyToDeliver",
                      "YetToDeliver",
                      "Picked",
                      "Scheduled",
                      "Delivered",
                      "Paid",
                    ];

                    allStatuses.forEach((status) => {
                      sessionStorage.setItem(
                        `TR313_${status}`,
                        values[status] ? "Y" : "N"
                      );
                    });

                    const selectedStatuses = allStatuses.filter(
                      (status) => values[status]
                    );

                    if (selectedStatuses.length > 0) {
                      conditions.push(
                        `Status IN (${selectedStatuses
                          .map((s) => `'${s}'`)
                          .join(", ")})`
                      );
                    }

                    // --------------------------
                    // PARTY FILTER
                    // --------------------------
                    if (values.party?.length > 0) {
                      const partyIds = values.party
                        .map((p) => `'${p.RecordID}'`)
                        .join(", ");

                      conditions.push(`PartyRecordID IN (${partyIds})`);
                    }

                    // --------------------------
                    // PRODUCT FILTER
                    // --------------------------
                    if (values.product?.length > 0) {
                      const productIds = values.product
                        .map((p) => `'${p.RecordID}'`)
                        .join(", ");

                      conditions.push(`ProductID IN (${productIds})`);
                    }

                    // --------------------------
                    // ORDER TYPE FILTER
                    // --------------------------
                    if (values.ordertype) {
                      conditions.push(`OrderType = '${values.ordertype}'`);
                    }

                    // --------------------------
                    // COMPANY FILTER
                    // --------------------------
                    if (compID) {
                      conditions.push(`CompanyID = '${compID}'`);
                    }

                    sessionStorage.setItem(
                      "TR313_Filters",
                      JSON.stringify(values)
                    );

                    // --------------------------
                    // FINAL WHERE CLAUSE
                    // --------------------------
                    const whereClause = conditions.join(" AND ");
                    console.log("FINAL FILTER:", whereClause);

                    dispatch(
                      fetchListview(
                        accessID,
                        screenName,
                        whereClause,
                        "",
                        compID
                      )
                    );

                    setTimeout(() => setSubmitting(false), 100);
                  }}

                >
                  {({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    setFieldValue,
                    resetForm,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ height: 600, overflowY: "auto" }}>
                        <IconButton
                          size="small"
                          onClick={() => setShowMore(false)}
                          sx={{ position: "absolute", top: 5, right: 4 }}
                        >
                          <Tooltip title="Close">
                            <CancelIcon color="error" />
                          </Tooltip>
                        </IconButton>
                        <TextField
                          name="fromdate"
                          type="date"
                          id="fromdate"
                          label="Transaction From Date"
                          variant="standard"
                          value={values.fromdate || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("fromdate", newDate);
                            // dispatch(setFromDate(newDate));
                            sessionStorage.setItem("FromDate", newDate);
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                        />

                        <TextField
                          name="date"
                          type="date"
                          id="date"
                          label="Transaction To Date"
                          variant="standard"
                          value={values.date || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("date", newDate);
                            // dispatch(setToDate(newDate));
                            sessionStorage.setItem("ToDate", newDate);
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                        />

                        <MultiFormikOptimizedAutocomplete
                          sx={{ width: 250, mt: 1 }}
                          id="party"
                          name="party"
                          label="Party"
                          variant="outlined"
                          value={values.party}
                          onChange={(e, newValue) => {
                            setFieldValue("party", newValue);
                            sessionStorage.setItem(
                              "TR313_Party",
                              JSON.stringify(newValue)
                            );
                          }}
                          // error={!!touched.party && !!errors.party}
                          // helperText={touched.party && errors.party}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2140","ScreenName":"Party","Filter":"CompanyID=${compID}","Any":""}}`}
                        />

                        <MultiFormikOptimizedAutocomplete
                          sx={{ width: 250, mt: 1 }}
                          id="product"
                          name="product"
                          label="Product"
                          variant="outlined"
                          value={values.product}
                          onChange={(e, newValue) => {
                            setFieldValue("product", newValue);
                            sessionStorage.setItem(
                              "TR313_Product",
                              JSON.stringify(newValue)
                            );
                          }}
                          // error={!!touched.product && !!errors.product}
                          // helperText={touched.product && errors.product}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Product","Filter":"CompanyID='${compID}' AND ItemsDesc ='Product'","Any":""}}`}
                        />
                        <TextField
                          select
                          sx={{ width: 250, mt: 1 }}
                          focused
                          label="Order Type"
                          value={values.ordertype || ""}
                          onChange={(e) => {
                            const ordertype = e.target.value;
                            setFieldValue("ordertype", ordertype);
                            sessionStorage.setItem("ordertype", ordertype);
                          }}
                          InputProps={{
                            endAdornment: values.ordertype && (
                              <InputAdornment position="end">
                                <ClearIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setFieldValue("ordertype", "");
                                    sessionStorage.removeItem("ordertype");
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value="O">Order</MenuItem>
                          <MenuItem value="Q">Quotation</MenuItem>
                        </TextField>

                        <TextField
                          select
                          fullWidth
                          focused
                          label="Type"
                          id="Type"
                          name="Type"
                          value={values.Type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="standard"
                          sx={{ width: 250, mt: 1 }}
                        >
                          <MenuItem value="ByParty">By Party</MenuItem>
                          <MenuItem value="ByProduct">By Product</MenuItem>
                        </TextField>
                        <Typography mt={2} fontWeight="bold" color="error">
                          Status
                        </Typography>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Created"
                              checked={values.Created}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Created", checked);
                                sessionStorage.setItem(
                                  "TR313_Created",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Created"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Process"
                              checked={values.Process}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Process", checked);
                                sessionStorage.setItem(
                                  "TR313_Process",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Process"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="ReadyToDeliver"
                              checked={values.ReadyToDeliver}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("ReadyToDeliver", checked);
                                sessionStorage.setItem(
                                  "TR313_ReadyToDeliver",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Ready To Deliver"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Scheduled"
                              checked={values.Scheduled}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Scheduled", checked);
                                sessionStorage.setItem(
                                  "TR313_Scheduled",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Scheduled"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Picked"
                              checked={values.Picked}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Picked", checked);
                                sessionStorage.setItem(
                                  "TR313_Picked",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Picked"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Delivered"
                              checked={values.Delivered}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Delivered", checked);
                                sessionStorage.setItem(
                                  "TR313_Delivered",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Delivered"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Paid"
                              checked={values.Paid}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Paid", checked);
                                sessionStorage.setItem(
                                  "TR313_Paid",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Paid"
                        />
                        {/* 
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="end"
                          spacing={1}
                          mt={2}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            Apply
                          </Button>
                        </Stack> */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="end"
                          spacing={1}
                          marginTop={3}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            Apply
                          </Button>
                          {values.Type === "ByProduct" ? (
                            // <PDFDownloadLink
                            //   document={
                            //     <OrdEnqProductPDF
                            //       data={listViewData}
                            //       Product={values?.product?.Name}
                            //       Party={values?.party?.Name}
                            //       filters={{
                            //         fromdate: values?.fromdate,
                            //         todate: values?.date,
                            //         ordertype: values.ordertype,
                            //         Imageurl: baseurlUAAM,
                            //         HeaderImg: HeaderImg,
                            //         FooterImg: FooterImg,
                            //       }}
                            //     />
                            //   }
                            //   fileName={`OrderEnquirySummary_Product.pdf`}
                            //   style={{ color: "#d32f2f", cursor: "pointer" }}
                            // >
                            //   {({ loading }) =>
                            //     loading ? (
                            //       <PictureAsPdfIcon
                            //         sx={{ fontSize: 24, opacity: 0.5 }}
                            //       />
                            //     ) : (
                            //       <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                            //     )
                            //   }
                            // </PDFDownloadLink>
                            
<BlobProvider
  document={
    <OrdEnqProductPDF
      data={listViewData}
      Product={values?.product?.Name}
      Party={values?.party?.Name}
      filters={{
        fromdate: values?.fromdate,
        todate: values?.date,
        ordertype: values?.ordertype,
        // Imageurl: baseurlUAAM,
        // HeaderImg: HeaderImg,
        // FooterImg: FooterImg,
      }}
    />
  }
>
  {({ url, loading }) =>
    loading ? (
      <PictureAsPdfIcon
        sx={{ fontSize: 24, opacity: 0.5 }}
      />
    ) : (
      <PictureAsPdfIcon
        sx={{ fontSize: 24, color: "#d32f2f", cursor: "pointer" }}
        onClick={() => window.open(url, "_blank")}
      />
    )
  }
</BlobProvider>
                          ) : (
                            <PDFDownloadLink
                              document={
                                <OrdEnqPartyPDF
                                  data={listViewData}
                                  Product={values?.product?.Name}
                                  Party={values?.party?.Name}
                                  filters={{
                                    fromdate: values?.fromdate,
                                    todate: values?.date,
                                    ordertype: values.ordertype,
                                    // Imageurl: baseurlUAAM,
                                    // HeaderImg: HeaderImg,
                                    // FooterImg: FooterImg,
                                  }}
                                />
                              }
                              fileName={`OrderEnquirySummary_Party".pdf`}
                              style={{ color: "#d32f2f", cursor: "pointer" }}
                            >
                              {({ loading }) =>
                                loading ? (
                                  <PictureAsPdfIcon
                                    sx={{ fontSize: 24, opacity: 0.5 }}
                                  />
                                ) : (
                                  <PictureAsPdfIcon sx={{ fontSize: 24 }} />
                                )
                              }
                            </PDFDownloadLink>
                          )}

{/* <FaFileExcel
  size={20}
  color="#1D6F42"
  style={{ cursor: "pointer" }}
  onClick={() =>
    OrderEnqProdandPartyExcel(
      listViewData,
      {
        fromdate: values?.fromdate,
        todate: values?.todate,
        ordertype: values?.ordertype,
        product: values?.product?.Name || "",
        party: values?.party?.Name || "",
      }
    )
  }
/> */}

                          {/* <Button
                            type="button"
                            variant="contained"
                            color="error"
                            size="small"                         
                          >
                            RESET
                          </Button> */}
                          <Button
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={() => {
                              [
                                "FromDate",
                                "ToDate",
                                "ordertype",
                                "TR313_Created",
                                "TR313_Process",
                                "TR313_ReadyToDeliver",
                                "TR313_YetToDeliver",
                                "TR313_Picked",
                                "TR313_Scheduled",
                                "TR313_Delivered",
                                "TR313_Paid",
                                "TR313_Party",
                                "TR313_Product",
                                "TR313_Filters",
                              ].forEach((key) =>
                                sessionStorage.removeItem(key)
                              );

                              resetForm({
                                values: {
                                  fromdate: "",
                                  date: "",
                                  Created: false,
                                  Process: false,
                                  ReadyToDeliver: false,
                                  YetToDeliver: false,
                                  Picked: false,
                                  Scheduled: false,
                                  Delivered: false,
                                  Paid: false,
                                  party: [],
                                  product: [],
                                  Type: "ByProduct",
                                  ordertype: ""
                                },
                              });
                            }}
                          >
                            RESET
                          </Button>
                        </Stack>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            )}

            {showMore && accessID === "TR243" && (
              <Box
                sx={{
                  width: 300,
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Formik
                  initialValues={{
                    fromdate: sessionStorage.getItem("FromDate") || "",
                    date: sessionStorage.getItem("ToDate") || "",
                    Created: sessionStorage.getItem("TR243_Created") === "Y",
                    Process: sessionStorage.getItem("TR243_Process") === "Y",
                    Paid: sessionStorage.getItem("TR243_Paid") === "Y",
                    Picked: sessionStorage.getItem("TR243_Picked") === "Y",
                    ReadyToDeliver:
                      sessionStorage.getItem("TR243_ReadyToDeliver") === "Y",
                    Delivered:
                      sessionStorage.getItem("TR243_Delivered") === "Y",
                    Scheduled:
                      sessionStorage.getItem("TR243_Scheduled") === "Y",
                  }}
                  enableReinitialize
                  validate={(values) => {
                    const hasAtLeastOneValue =
                      values.fromdate ||
                      values.date ||
                      values.Created ||
                      values.Process ||
                      values.ReadyToDeliver ||
                      values.Paid ||
                      values.Scheduled ||
                      values.Delivered ||
                      values.Picked;
                  }}
                  // onSubmit={(values, { setSubmitting }) => {
                  //   const conditions = [];

                  //   const fromDate = values.fromdate || "";
                  //   const toDate = values.date || "";

                  //   sessionStorage.setItem("FromDate", fromDate);
                  //   sessionStorage.setItem("ToDate", toDate);
                  //   // sessionStorage.setItem("EmployeeID", empId);

                  //   [
                  //     "Created",
                  //     "Process",
                  //     "Ready To Deliver",
                  //     "Paid",
                  //     "Picked",
                  //     "Deivered",
                  //     "Scheduled",
                  //   ].forEach((key) => {
                  //     sessionStorage.setItem(
                  //       `TR243_${key}`,
                  //       values[key] ? "Y" : "N"
                  //     );
                  //   });

                  //   sessionStorage.setItem(
                  //     "TR243_Filters",
                  //     JSON.stringify(values)
                  //   );

                  //   // conditions.push(`EmployeesID='${empId}'`);

                  //   if (fromDate && toDate) {
                  //     conditions.push(
                  //       `HVLastOrderDate BETWEEN '${fromDate}' AND '${toDate}'`
                  //     );
                  //   } else if (fromDate) {
                  //     conditions.push(`HVLastOrderDate >= '${fromDate}'`);
                  //   } else if (toDate) {
                  //     conditions.push(`HVLastOrderDate <= '${toDate}'`);
                  //   }

                  //   const statusFilters = [];

                  //   if (values.Created) statusFilters.push("'Created'");
                  //   if (values.Process) statusFilters.push("'Process'");
                  //   if (values.ReadyToDeliver)
                  //     statusFilters.push("'Ready To Deliver'");
                  //   if (values.Picked) statusFilters.push("'Picked'");
                  //   if (values.Delivered) statusFilters.push("'Delivered'");
                  //   if (values.Scheduled) statusFilters.push("'Scheduled'");
                  //   if (values.Paid) statusFilters.push("'Paid'");

                  //   if (statusFilters.length > 0) {
                  //     conditions.push(
                  //       `LastOrderStatus IN (${statusFilters.join(", ")})`
                  //     );
                  //   }

                  //   //conditions.push(`CompanyID='${compID}'`);
                  //   //const whereClause = conditions.join(" AND ");
                  //   const filter = [
                  //     `CompanyID='${compID}'`,
                  //     ...conditions,
                  //   ].join(" AND ");
                  //   //const whereClause = [`CompanyID='${compID}'`, ...conditions].join(" AND ");

                  //   dispatch(
                  //     fetchListview(
                  //       accessID,
                  //       screenName,
                  //       filter,
                  //       "",
                  //       //whereClause,
                  //       ""
                  //     )
                  //   );
                  //   setTimeout(() => setSubmitting(false), 100);
                  // }}
                  onSubmit={(values, { setSubmitting }) => {
                    const conditions = [];
                    const statusDateMap = {
                      Created: "OROrderDate",
                      Process: "ORProcessDate",
                      ReadyToDeliver: "ORTentativeDate",
                      YetToDeliver: "ORTentativeDate",
                      Picked: "ORPickedDate",
                      Scheduled: "ORTentativeDate",
                      Delivered: "ORDeliveryDate",
                      Paid: "ORPaidDate",
                    };

                    const fromDate = values.fromdate || "";
                    const toDate = values.date || "";

                    sessionStorage.setItem("FromDate", fromDate);
                    sessionStorage.setItem("ToDate", toDate);

                    // Store checkbox values
                    Object.keys(statusDateMap).forEach((status) => {
                      sessionStorage.setItem(
                        `TR243_${status}`,
                        values[status] ? "Y" : "N"
                      );
                    });

                    sessionStorage.setItem(
                      "TR243_Filters",
                      JSON.stringify(values)
                    );

                    // --------------------------
                    // 1. STATUS IN ('A','B','C')
                    // --------------------------
                    const selectedStatuses = Object.keys(statusDateMap).filter(
                      (status) => values[status]
                    );

                    if (selectedStatuses.length > 0) {
                      conditions.push(
                        `LastOrderStatus IN (${selectedStatuses
                          .map((s) => `'${s}'`)
                          .join(", ")})`
                      );
                    }

                    // -------------------------------------------------
                    // 2. DATE FIELD CONDITIONS based on selected status
                    // -------------------------------------------------
                    const dateConditions = [];

                    selectedStatuses.forEach((status) => {
                      const field = statusDateMap[status];

                      if (fromDate && toDate) {
                        dateConditions.push(
                          `(${field} BETWEEN '${fromDate}' AND '${toDate}')`
                        );
                      } else if (fromDate) {
                        dateConditions.push(`(${field} >= '${fromDate}')`);
                      } else if (toDate) {
                        dateConditions.push(`(${field} <= '${toDate}')`);
                      }
                    });

                    if (dateConditions.length > 0) {
                      conditions.push(`(${dateConditions.join(" OR ")})`);
                    }

                    // --------------------------
                    // FINAL WHERE CLAUSE
                    // --------------------------
                    const whereClause = conditions.join(" AND ");
                    console.log("FINAL FILTER:", whereClause);

                    dispatch(
                      fetchListview(
                        accessID,
                        screenName,
                        whereClause,
                        "",
                        compID
                      )
                    );

                    setTimeout(() => setSubmitting(false), 100);
                  }}
                >
                  {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ height: 600, overflowY: "auto" }}>
                        <TextField
                          name="fromdate"
                          type="date"
                          id="fromdate"
                          label="From Date"
                          variant="standard"
                          value={values.fromdate || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("fromdate", newDate);
                            // dispatch(setFromDate(newDate));
                            sessionStorage.setItem("FromDate", newDate);
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                        />

                        <TextField
                          name="date"
                          type="date"
                          id="date"
                          label="To Date"
                          variant="standard"
                          value={values.date || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("date", newDate);
                            // dispatch(setToDate(newDate));
                            sessionStorage.setItem("ToDate", newDate);
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                        />

                        <Typography mt={2} fontWeight="bold" color="error">
                          Status
                        </Typography>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Created"
                              checked={values.Created}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Created", checked);
                                sessionStorage.setItem(
                                  "TR243_Created",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Created"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Process"
                              checked={values.Process}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Process", checked);
                                sessionStorage.setItem(
                                  "TR243_Process",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Confirm"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="ReadyToDeliver"
                              checked={values.ReadyToDeliver}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("ReadyToDeliver", checked);
                                sessionStorage.setItem(
                                  "TR243_ReadyToDeliver",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Ready To Deliver"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Scheduled"
                              checked={values.Scheduled}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Scheduled", checked);
                                sessionStorage.setItem(
                                  "TR243_Scheduled",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Scheduled"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Picked"
                              checked={values.Picked}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Picked", checked);
                                sessionStorage.setItem(
                                  "TR243_Picked",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Picked"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Delivered"
                              checked={values.Delivered}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Delivered", checked);
                                sessionStorage.setItem(
                                  "TR243_Delivered",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Delivered"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Paid"
                              checked={values.Paid}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFieldValue("Paid", checked);
                                sessionStorage.setItem(
                                  "TR243_Paid",
                                  checked ? "Y" : "N"
                                );
                              }}
                            />
                          }
                          label="Paid"
                        />

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="end"
                          spacing={1}
                          mt={2}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            Apply
                          </Button>
                        </Stack>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            )}
            {/* WORKING CODE BELOW ----- */}
            {/* {showMore && accessID === "TR321" && (
  <Box sx={{ width: 300, p: 2, borderRadius: 1, backgroundColor: "#fff" }}>
    <Formik
      initialValues={{
        days: sessionStorage.getItem("TR321_Days") || "",
        type: sessionStorage.getItem("TR321_type") || "",
        Created: sessionStorage.getItem("TR321_Created") === "Y",
        Process: sessionStorage.getItem("TR321_Process") === "Y",
        Paid: sessionStorage.getItem("TR321_Paid") === "Y",
        Picked: sessionStorage.getItem("TR321_Picked") === "Y",
        ReadyToDeliver: sessionStorage.getItem("TR321_ReadyToDeliver") === "Y",
        Delivered: sessionStorage.getItem("TR321_Delivered") === "Y",
        Scheduled: sessionStorage.getItem("TR321_Scheduled") === "Y",
        NextVisitDate: sessionStorage.getItem("TR321_NextVisitDate") === "Y",
        Prospect: sessionStorage.getItem("TR321_Prospect") === "Y",
        Balance: sessionStorage.getItem("TR321_Balance") === "Y",
      }}
      enableReinitialize
      // onSubmit={(values, { setSubmitting }) => {
      //   // ✅ SAVES TO SESSIONSTORAGE (your code is correct)
      //   sessionStorage.setItem("TR321_Days", values.days || "");
      //   sessionStorage.setItem("TR321_type", values.type || "");
      //   sessionStorage.setItem("TR321_Prospect", values.Prospect ? "Y" : "N");
      //   sessionStorage.setItem("TR321_Balance", values.Balance ? "Y" : "N");
        
      //   const statusKeys = ["Created", "Process", "Paid", "Picked", "ReadyToDeliver", "Delivered", "Scheduled", "NextVisitDate"];
      //   statusKeys.forEach(status => {
      //     sessionStorage.setItem(`TR321_${status}`, values[status] ? "Y" : "N");
      //   });

      //   if (values.Prospect || values.Balance) {
      //     let simpleWhere = `CompanyID=${compID}`;
      //     if (values.Prospect) simpleWhere += ` AND Prospects = 'Y'`;
      //     if (values.Balance) simpleWhere += ` AND Balance < 0`;
      //     dispatch(fetchListview(accessID, "Party", simpleWhere, "", compID));
      //   } else {
      //     // Your status logic (keep as is)
      //     // ... existing status code
      //   }
      //   setTimeout(() => setSubmitting(false), 100);
      // }}


      onSubmit={(values, { setSubmitting }) => {
  // SAVE ALL TO SESSIONSTORAGE
  sessionStorage.setItem("TR321_Days", values.days || "");
  sessionStorage.setItem("TR321_type", values.type || "");
  sessionStorage.setItem("TR321_Prospect", values.Prospect ? "Y" : "N");
  sessionStorage.setItem("TR321_Balance", values.Balance ? "Y" : "N");
  
  const statusKeys = ["Created", "Process", "Paid", "Picked", "ReadyToDeliver", "Delivered", "Scheduled", "NextVisitDate"];
  statusKeys.forEach(status => {
    sessionStorage.setItem(`TR321_${status}`, values[status] ? "Y" : "N");
  });

  //  CASE 1: PROSPECT/BALANCE - IMMEDIATE DISPATCH
  if (values.Prospect || values.Balance) {
    let simpleWhere = `CompanyID=${compID}`;
    if (values.Prospect) simpleWhere += ` AND Prospects = 'Y'`;
    if (values.Balance) simpleWhere += ` AND Balance < 0`;
    console.log(' APPLY - CASE 1:', simpleWhere);
    dispatch(fetchListview(accessID, "Party", simpleWhere, "", compID));
    setTimeout(() => setSubmitting(false), 100);
    return;
  }

  //  CASE 2: STATUS + DAYS - COMPLETE SUBQUERY LOGIC
  const statusDateMap = {
    Created: "OR_ORDERDATE",
    Process: "OR_PROCESSDATE",
    Paid: "OR_PAIDDATE",
    ReadyToDeliver: "OR_TENTATIVEDELIVERYDATE",
    Scheduled: "OR_TENTATIVEDELIVERYDATE",
    NextVisitDate: "OR_TENTATIVEDELIVERYDATE",
    Picked: "OR_PICKEDDATETIME",
    Delivered: "OR_DELIVERYDATE",
  };

  const whereParts = [`CompanyID=${compID}`];
  let fromdate = "", todate = "";

  if (values.days && values.type) {
    const today = new Date();
    const dToday = today.toISOString().split("T")[0];
    const shifted = new Date(today);

    if (values.type === "A") {
      shifted.setDate(today.getDate() - Number(values.days));
      fromdate = shifted.toISOString().split("T")[0];
    } else if (values.type === "L") {
      shifted.setDate(today.getDate() - Number(values.days));
      fromdate = shifted.toISOString().split("T")[0];
      todate = dToday;
    } else if (values.type === "N") {
      shifted.setDate(today.getDate() + Number(values.days));
      fromdate = dToday;
      todate = shifted.toISOString().split("T")[0];
    }

    const dateConditions = [];
    Object.keys(statusDateMap).forEach((status) => {
      if (values[status]) {
        const col = statusDateMap[status];
        if (values.type === "A") {
          dateConditions.push(`${col}='${fromdate}'`);
        } else {
          dateConditions.push(`${col} BETWEEN '${fromdate}' AND '${todate}'`);
        }
      }
    });

    if (dateConditions.length > 0) {
      whereParts.push(`(${dateConditions.join(" OR ")})`);
    }
  }

  const dynamicWhere = whereParts.join(" AND ");
  const innerWhere = dynamicWhere.replace(`CompanyID=${compID} AND `, "");
  const finalWhereClause = `CompanyID=${compID} AND HV_RECID IN (SELECT OR_HVRECID FROM ORDHDR WHERE ${innerWhere} GROUP BY RecordID)`;

  console.log(' APPLY - CASE 2:', finalWhereClause);
  dispatch(fetchListview(accessID, "Party", finalWhereClause, "", compID));
  setTimeout(() => setSubmitting(false), 100);
}}

    >
      {({
        values,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {
        const statusKeys = [
          "Created", "Process", "Paid", "Picked", 
          "ReadyToDeliver", "Delivered", "Scheduled", "NextVisitDate"
        ];
        const statusLabelMap = {
          ReadyToDeliver: "Ready For Delivery",
          NextVisitDate: "Next Visit Date",
        };
        const isStatusSelected = statusKeys.some((k) => values[k]);
        const isDateSelected = Boolean(values.days && values.type);
        const isStatusGroupActive = isStatusSelected || isDateSelected;
        const isProspectGroupActive = values.Prospect || values.Balance;

        //  FIXED: Proper Reset function with ALL variables in scope
        const handleResetFilters = () => {
          setFieldValue('days', '');
          setFieldValue('type', '');
          setFieldValue('Prospect', false);
          setFieldValue('Balance', false);
          statusKeys.forEach(k => setFieldValue(k, false));
          
          // Clear ALL sessionStorage keys
          ['Days', 'type', 'Created', 'Process', 'Paid', 'Picked', 
           'ReadyToDeliver', 'Delivered', 'Scheduled', 'NextVisitDate', 
           'Prospect', 'Balance'].forEach(k => {
            sessionStorage.removeItem(`TR321_${k}`);
          });
          
          // Reload CompanyID only
          dispatch(fetchListview(accessID, 'Party', `CompanyID=${compID}`, '', compID));
        };

        return (
          <form onSubmit={handleSubmit}>
            <Box sx={{ height: 600, overflowY: "auto" }}>
              <Typography mt={2} fontWeight="bold" color="error">Status</Typography>
              
              {statusKeys.map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={values[key]}
                      disabled={isProspectGroupActive}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setFieldValue("Prospect", false);
                          setFieldValue("Balance", false);
                          sessionStorage.setItem("TR321_Prospect", "N");
                          sessionStorage.setItem("TR321_Balance", "N");
                        }
                        setFieldValue(key, checked);
                        sessionStorage.setItem(`TR321_${key}`, checked ? "Y" : "N");
                      }}
                    />
                  }
                  label={statusLabelMap[key] || key}
                />
              ))}

              <TextField
                name="days"
                type="number"
                label="Days"
                variant="standard"
                value={values.days}
                disabled={isProspectGroupActive}
                onChange={(e) => {
                  setFieldValue("days", e.target.value);
                  sessionStorage.setItem("TR321_Days", e.target.value);
                }}
                sx={{ mt: 2 }}
                fullWidth
              />

              <TextField
                select
                name="type"
                label="Type"
                variant="standard"
                value={values.type}
                disabled={isProspectGroupActive}
                onChange={(e) => {
                  setFieldValue("type", e.target.value);
                  sessionStorage.setItem("TR321_type", e.target.value);
                }}
                sx={{ mt: 2}}
                fullWidth
              >
                <MenuItem value="A">Ago</MenuItem>
                <MenuItem value="L">Latest</MenuItem>
                <MenuItem value="N">Next</MenuItem>
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.Prospect}
                    disabled={isStatusGroupActive}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        statusKeys.forEach((k) => {
                          setFieldValue(k, false);
                          sessionStorage.setItem(`TR321_${k}`, "N");
                        });
                        setFieldValue("days", "");
                        setFieldValue("type", "");
                        sessionStorage.setItem("TR321_Days", "");
                        sessionStorage.setItem("TR321_type", "");
                      }
                      setFieldValue("Prospect", checked);
                      sessionStorage.setItem("TR321_Prospect", checked ? "Y" : "N");
                    }}
                  />
                }
                label="Prospects"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.Balance}
                    disabled={isStatusGroupActive}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        statusKeys.forEach((k) => {
                          setFieldValue(k, false);
                          sessionStorage.setItem(`TR321_${k}`, "N");
                        });
                        setFieldValue("days", "");
                        setFieldValue("type", "");
                        sessionStorage.setItem("TR321_Days", "");
                        sessionStorage.setItem("TR321_type", "");
                      }
                      setFieldValue("Balance", checked);
                      sessionStorage.setItem("TR321_Balance", checked ? "Y" : "N");
                    }}
                  />
                }
                label="Due"
              />

              <Stack direction="row" alignItems="center" justifyContent="end" spacing={1} mt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Apply
                </Button>
                <Button variant="contained" color="error" onClick={handleResetFilters} disabled={isSubmitting}>
                  Reset
                </Button>
              </Stack>
            </Box>
          </form>
        );
      }}
    </Formik>
  </Box>
)} */}

            {showMore && accessID === "TR321" && (
              <Box
                sx={{
                  width: 300,
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Formik
                  initialValues={{
                    days: sessionStorage.getItem("TR321_Days") || "",
                    type: sessionStorage.getItem("TR321_type") || "",
                    Created: sessionStorage.getItem("TR321_Created") === "Y",
                    Process: sessionStorage.getItem("TR321_Process") === "Y",
                    Paid: sessionStorage.getItem("TR321_Paid") === "Y",
                    Picked: sessionStorage.getItem("TR321_Picked") === "Y",
                    ReadyToDeliver:
                      sessionStorage.getItem("TR321_ReadyToDeliver") === "Y",
                    Delivered:
                      sessionStorage.getItem("TR321_Delivered") === "Y",
                    Scheduled:
                      sessionStorage.getItem("TR321_Scheduled") === "Y",
                    NextVisitDate:
                      sessionStorage.getItem("TR321_NextVisitDate") === "Y",
                    Prospect: sessionStorage.getItem("TR321_Prospect") === "Y",
                    Balance: sessionStorage.getItem("TR321_Balance") === "Y",
                  }}
                  enableReinitialize
                  // onSubmit={(values, { setSubmitting }) => {
                  //   // SAVE ALL TO SESSIONSTORAGE
                  //   sessionStorage.setItem("TR321_Days", values.days || "");
                  //   sessionStorage.setItem("TR321_type", values.type || "");
                  //   sessionStorage.setItem("TR321_Prospect", values.Prospect ? "Y" : "N");
                  //   sessionStorage.setItem("TR321_Balance", values.Balance ? "Y" : "N");
                  //   sessionStorage.setItem("TR321_HASFILTER", 'Y');

                  //   const statusKeys = ["Created", "Process", "Paid", "Picked", "ReadyToDeliver", "Delivered", "Scheduled", "NextVisitDate"];
                  //   statusKeys.forEach(status => {
                  //     sessionStorage.setItem(`TR321_${status}`, values[status] ? "Y" : "N");
                  //   });

                  //   // CASE 1: PROSPECT/BALANCE - IMMEDIATE DISPATCH
                  //   if (values.Prospect || values.Balance) {
                  //     let simpleWhere = `CompanyID=${compID}`;
                  //     if (values.Prospect) simpleWhere += ` AND Prospects = 'Y'`;
                  //     if (values.Balance) simpleWhere += ` AND Balance < 0`;
                  //     console.log(' APPLY - CASE 1:', simpleWhere);
                  //     dispatch(fetchListview(accessID, "Party", simpleWhere, "", compID));
                  //     setTimeout(() => setSubmitting(false), 100);
                  //     return;
                  //   }

                  //   // CASE 2: STATUS + DAYS - COMPLETE SUBQUERY LOGIC
                  //   const statusDateMap = {
                  //     Created: "OR_ORDERDATE",
                  //     Process: "OR_PROCESSDATE",
                  //     Paid: "OR_PAIDDATE",
                  //     ReadyToDeliver: "OR_TENTATIVEDELIVERYDATE",
                  //     Scheduled: "OR_TENTATIVEDELIVERYDATE",
                  //     NextVisitDate: "OR_TENTATIVEDELIVERYDATE",
                  //     Picked: "OR_PICKEDDATETIME",
                  //     Delivered: "OR_DELIVERYDATE",
                  //   };

                  //   const whereParts = [`CompanyID=${compID}`];
                  //   let fromdate = "", todate = "";

                  //   if (values.days && values.type) {
                  //     const today = new Date();
                  //     const dToday = today.toISOString().split("T")[0];
                  //     const shifted = new Date(today);

                  //     if (values.type === "A") {
                  //       shifted.setDate(today.getDate() - Number(values.days));
                  //       fromdate = shifted.toISOString().split("T")[0];
                  //     } else if (values.type === "L") {
                  //       shifted.setDate(today.getDate() - Number(values.days));
                  //       fromdate = shifted.toISOString().split("T")[0];
                  //       todate = dToday;
                  //     } else if (values.type === "N") {
                  //       shifted.setDate(today.getDate() + Number(values.days));
                  //       fromdate = dToday;
                  //       todate = shifted.toISOString().split("T")[0];
                  //     }

                  //     const dateConditions = [];
                  //     Object.keys(statusDateMap).forEach((status) => {
                  //       if (values[status]) {
                  //         const col = statusDateMap[status];
                  //         if (values.type === "A") {
                  //           dateConditions.push(`${col}='${fromdate}'`);
                  //         } else {
                  //           dateConditions.push(`${col} BETWEEN '${fromdate}' AND '${todate}'`);
                  //         }
                  //       }
                  //     });

                  //     if (dateConditions.length > 0) {
                  //       whereParts.push(`(${dateConditions.join(" OR ")})`);
                  //     }
                  //   }

                  //   const dynamicWhere = whereParts.join(" AND ");
                  //   const innerWhere = dynamicWhere.replace(`CompanyID=${compID} AND `, "");
                  //   const finalWhereClause = `CompanyID=${compID} AND HV_RECID IN (SELECT OR_HVRECID FROM ORDHDR WHERE ${innerWhere} GROUP BY RecordID)`;

                  //   console.log(' APPLY - CASE 2:', finalWhereClause);
                  //   dispatch(fetchListview(accessID, "Party", finalWhereClause, "", compID));
                  //   setTimeout(() => setSubmitting(false), 100);
                  // }}

                  onSubmit={(values, { setSubmitting }) => {
                    //  CHECK IF ANY ACTUAL FILTER SELECTED
                    const statusKeys = [
                      "Created",
                      "Process",
                      "Paid",
                      "Picked",
                      "ReadyToDeliver",
                      "Delivered",
                      "Scheduled",
                      "NextVisitDate",
                    ];
                    const hasStatusFilter = statusKeys.some(
                      (status) => values[status]
                    );
                    const hasDateFilter = values.days && values.type;
                    const hasProspectFilter = values.Prospect;
                    const hasBalanceFilter = values.Balance;

                    console.log(
                      " APPLY DEBUG - hasStatus:",
                      hasStatusFilter,
                      "hasDate:",
                      hasDateFilter,
                      "Prospect:",
                      hasProspectFilter,
                      "Balance:",
                      hasBalanceFilter
                    );

                    //  NO FILTERS SELECTED → Just CompanyID + HASFILTER=N
                    if (
                      !hasStatusFilter &&
                      !hasDateFilter &&
                      !hasProspectFilter &&
                      !hasBalanceFilter
                    ) {
                      console.log(" APPLY - NO FILTERS: CompanyID only");
                      sessionStorage.setItem("TR321_HASFILTER", "N");
                      [
                        "Days",
                        "type",
                        "Created",
                        "Process",
                        "Paid",
                        "Picked",
                        "ReadyToDeliver",
                        "Delivered",
                        "Scheduled",
                        "NextVisitDate",
                        "Prospect",
                        "Balance",
                      ].forEach((k) => sessionStorage.removeItem(`TR321_${k}`));
                      dispatch(
                        fetchListview(
                          accessID,
                          "Party",
                          `CompanyID=${compID}`,
                          "",
                          compID
                        )
                      );
                      setTimeout(() => setSubmitting(false), 100);
                      return;
                    }

                    // HAS FILTERS → Save to sessionStorage + HASFILTER=Y
                    sessionStorage.setItem("TR321_HASFILTER", "Y");
                    sessionStorage.setItem("TR321_Days", values.days || "");
                    sessionStorage.setItem("TR321_type", values.type || "");
                    sessionStorage.setItem(
                      "TR321_Prospect",
                      values.Prospect ? "Y" : "N"
                    );
                    sessionStorage.setItem(
                      "TR321_Balance",
                      values.Balance ? "Y" : "N"
                    );
                    statusKeys.forEach((status) => {
                      sessionStorage.setItem(
                        `TR321_${status}`,
                        values[status] ? "Y" : "N"
                      );
                    });

                    // CASE 1: PROSPECT/BALANCE
                    if (values.Prospect || values.Balance) {
                      let simpleWhere = `CompanyID=${compID}`;
                      if (values.Prospect)
                        simpleWhere += ` AND Prospects = 'Y'`;
                      if (values.Balance) simpleWhere += ` AND Balance < 0`;
                      console.log("APPLY - CASE 1:", simpleWhere);
                      dispatch(
                        fetchListview(
                          accessID,
                          "Party",
                          simpleWhere,
                          "",
                          compID
                        )
                      );
                      setTimeout(() => setSubmitting(false), 100);
                      return;
                    }

                    // CASE 2: STATUS + DAYS (ONLY if actual status selected)
                    if (hasStatusFilter && hasDateFilter) {
                      const statusDateMap = {
                        Created: "OR_ORDERDATE",
                        Process: "OR_PROCESSDATE",
                        Paid: "OR_PAIDDATE",
                        ReadyToDeliver: "OR_TENTATIVEDELIVERYDATE",
                        Scheduled: "OR_TENTATIVEDELIVERYDATE",
                        NextVisitDate: "OR_TENTATIVEDELIVERYDATE",
                        Picked: "OR_PICKEDDATETIME",
                        Delivered: "OR_DELIVERYDATE",
                      };

                      const whereParts = [`CompanyID=${compID}`];
                      const today = new Date();
                      const dToday = today.toISOString().split("T")[0];
                      const shifted = new Date(today);
                      let fromdate, todate;

                      if (values.type === "A") {
                        shifted.setDate(today.getDate() - Number(values.days));
                        fromdate = shifted.toISOString().split("T")[0];
                      } else if (values.type === "L") {
                        shifted.setDate(today.getDate() - Number(values.days));
                        fromdate = shifted.toISOString().split("T")[0];
                        todate = dToday;
                      } else if (values.type === "N") {
                        shifted.setDate(today.getDate() + Number(values.days));
                        fromdate = dToday;
                        todate = shifted.toISOString().split("T")[0];
                      }

                      const dateConditions = [];
                      Object.keys(statusDateMap).forEach((status) => {
                        if (values[status]) {
                          const col = statusDateMap[status];
                          if (values.type === "A") {
                            dateConditions.push(`${col}='${fromdate}'`);
                          } else {
                            dateConditions.push(
                              `${col} BETWEEN '${fromdate}' AND '${todate}'`
                            );
                          }
                        }
                      });

                      if (dateConditions.length > 0) {
                        whereParts.push(`(${dateConditions.join(" OR ")})`);
                      }

                      const dynamicWhere = whereParts.join(" AND ");
                      const innerWhere = dynamicWhere.replace(
                        `CompanyID=${compID} AND `,
                        ""
                      );
                      const finalWhereClause = `CompanyID=${compID} AND HV_RECID IN (SELECT OR_HVRECID FROM ORDHDR WHERE ${innerWhere} GROUP BY RecordID)`;

                      console.log("APPLY - CASE 2:", finalWhereClause);
                      dispatch(
                        fetchListview(
                          accessID,
                          "Party",
                          finalWhereClause,
                          "",
                          compID
                        )
                      );
                    } else {
                      // Days/Type but no status → CompanyID only
                      console.log(
                        "APPLY - Days/Type but no status: CompanyID"
                      );
                      dispatch(
                        fetchListview(
                          accessID,
                          "Party",
                          `CompanyID=${compID}`,
                          "",
                          compID
                        )
                      );
                    }

                    setTimeout(() => setSubmitting(false), 100);
                  }}
                >
                  {({ values, handleSubmit, isSubmitting, setFieldValue }) => {
                    const statusKeys = [
                      "Created",
                      "Process",
                      "Paid",
                      "Picked",
                      "ReadyToDeliver",
                      "Delivered",
                      "Scheduled",
                      "NextVisitDate",
                    ];
                    const statusLabelMap = {
                      ReadyToDeliver: "Ready For Delivery",
                      NextVisitDate: "Next Visit Date",
                    };
                    const isStatusSelected = statusKeys.some((k) => values[k]);
                    const isDateSelected = Boolean(values.days && values.type);
                    const isStatusGroupActive =
                      isStatusSelected || isDateSelected;
                    const isProspectGroupActive =
                      values.Prospect || values.Balance;

                    //  FIXED RESET with RESET FLAG
                    const handleResetFilters = () => {
                      setFieldValue("days", "");
                      setFieldValue("type", "");
                      setFieldValue("Prospect", false);
                      setFieldValue("Balance", false);
                      statusKeys.forEach((k) => setFieldValue(k, false));

                      // Clear ALL filters
                      [
                        "Days",
                        "type",
                        "Created",
                        "Process",
                        "Paid",
                        "Picked",
                        "ReadyToDeliver",
                        "Delivered",
                        "Scheduled",
                        "NextVisitDate",
                        "Prospect",
                        "Balance",
                      ].forEach((k) => {
                        sessionStorage.removeItem(`TR321_${k}`);
                      });

                      // SET NO-FILTER STATE
                      sessionStorage.setItem("TR321_RESET", "Y");
                      sessionStorage.setItem("TR321_HASFILTER", "N");
                      // NO DISPATCH → Initial load handles single CompanyID call
                    };

                    return (
                      <form onSubmit={handleSubmit}>
                        <Box sx={{ height: 600, overflowY: "auto" }}>
                          <IconButton
                            size="small"
                            onClick={() => setShowMore(false)}
                            sx={{ position: "absolute", top: 5, right: 4 }}
                          >
                            <Tooltip title="Close">
                              <CancelIcon color="error" />
                            </Tooltip>
                          </IconButton>
                          <Typography mt={2} fontWeight="bold" color="error">
                            Status
                          </Typography>

                          {statusKeys.map((key) => (
                            <FormControlLabel
                              key={key}
                              control={
                                <Checkbox
                                  checked={values[key]}
                                  disabled={isProspectGroupActive}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    if (checked) {
                                      setFieldValue("Prospect", false);
                                      setFieldValue("Balance", false);
                                      sessionStorage.setItem(
                                        "TR321_Prospect",
                                        "N"
                                      );
                                      sessionStorage.setItem(
                                        "TR321_Balance",
                                        "N"
                                      );
                                    }
                                    setFieldValue(key, checked);
                                    sessionStorage.setItem(
                                      `TR321_${key}`,
                                      checked ? "Y" : "N"
                                    );
                                  }}
                                />
                              }
                              label={statusLabelMap[key] || key}
                            />
                          ))}

                          <TextField
                            name="days"
                            type="number"
                            label="Days"
                            variant="standard"
                            value={values.days}
                            disabled={isProspectGroupActive}
                            onChange={(e) => {
                              setFieldValue("days", e.target.value);
                              sessionStorage.setItem(
                                "TR321_Days",
                                e.target.value
                              );
                            }}
                            sx={{ mt: 2 }}
                            fullWidth
                          />

                          <TextField
                            select
                            name="type"
                            label="Type"
                            variant="standard"
                            value={values.type}
                            disabled={isProspectGroupActive}
                            onChange={(e) => {
                              setFieldValue("type", e.target.value);
                              sessionStorage.setItem(
                                "TR321_type",
                                e.target.value
                              );
                            }}
                            sx={{ mt: 2 }}
                            fullWidth
                          >
                            <MenuItem value="A">Ago</MenuItem>
                            <MenuItem value="L">Latest</MenuItem>
                            <MenuItem value="N">Next</MenuItem>
                          </TextField>

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.Prospect}
                                disabled={isStatusGroupActive}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    statusKeys.forEach((k) => {
                                      setFieldValue(k, false);
                                      sessionStorage.setItem(`TR321_${k}`, "N");
                                    });
                                    setFieldValue("days", "");
                                    setFieldValue("type", "");
                                    sessionStorage.setItem("TR321_Days", "");
                                    sessionStorage.setItem("TR321_type", "");
                                  }
                                  setFieldValue("Prospect", checked);
                                  sessionStorage.setItem(
                                    "TR321_Prospect",
                                    checked ? "Y" : "N"
                                  );
                                }}
                              />
                            }
                            label="Prospects"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.Balance}
                                disabled={isStatusGroupActive}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    statusKeys.forEach((k) => {
                                      setFieldValue(k, false);
                                      sessionStorage.setItem(`TR321_${k}`, "N");
                                    });
                                    setFieldValue("days", "");
                                    setFieldValue("type", "");
                                    sessionStorage.setItem("TR321_Days", "");
                                    sessionStorage.setItem("TR321_type", "");
                                  }
                                  setFieldValue("Balance", checked);
                                  sessionStorage.setItem(
                                    "TR321_Balance",
                                    checked ? "Y" : "N"
                                  );
                                }}
                              />
                            }
                            label="Due"
                          />

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="end"
                            spacing={1}
                            mt={2}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              Apply
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={handleResetFilters}
                              disabled={isSubmitting}
                            >
                              Reset
                            </Button>
                          </Stack>
                        </Box>
                      </form>
                    );
                  }}
                </Formik>
              </Box>
            )}

            {showMore && accessID === "TR328" && (
              <Box
                sx={{
                  width: 300,
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Formik
                  initialValues={{
                    fromdate: sessionStorage.getItem("FromDate") || "",
                    date: sessionStorage.getItem("ToDate") || "",
                    party:
                      JSON.parse(sessionStorage.getItem("TR328_Party")) || [],
                    product:
                      JSON.parse(sessionStorage.getItem("TR328_Product")) || [],
                    freshCall: sessionStorage.getItem("TR328_FreshCall") || "N",
                  }}
                  enableReinitialize
                  validate={(values) => {
                    const hasAtLeastOneValue =
                      values.fromdate ||
                      values.date ||
                      values.party ||
                      values.product;
                  }}
                  onSubmit={(values, { setSubmitting }) => {

                    const conditions = [];

                    const fromDate = values.fromdate || "";
                    const toDate = values.date || "";

                    const freshCall = values.freshCall === "Y";

                    sessionStorage.setItem("FromDate", fromDate);
                    sessionStorage.setItem("ToDate", toDate);

                    sessionStorage.setItem(
                      "TR328_Filters",
                      JSON.stringify(values)
                    );



                    const field = "FilterLastCallDate";
                    if (values.party?.length > 0) {
                      const partyIds = values.party
                        .map((p) => `'${p.RecordID}'`)
                        .join(", ");

                      // conditions.push(`PartyID = ${partyIds}`);
                      conditions.push(`PartyID IN (${partyIds})`);
                    }

                    if (values.product?.length > 0) {
                      const productIds = values.product
                        .map((p) => `'${p.RecordID}'`)
                        .join(", ");

                      // conditions.push(`ProjectID = ${productIds}`);
                      conditions.push(`ProjectID IN (${productIds})`);
                    }
                    if (compID) {
                      conditions.push(
                        `HrLoginUserID='${LoginID}' AND CompanyID='${compID}'`
                      );
                    }
                    if (freshCall) {
                      // 👉 Fresh Call flow (NO DATE SENT)
                      conditions.push(`CallType = 'FC'`);   // ⚠️ change field name if backend uses different column
                    }
                    else {
                      const dateConditions = [];
                      if (fromDate && toDate) {
                        dateConditions.push(
                          `(${field} BETWEEN '${fromDate}' AND '${toDate}')`
                        );
                      } else if (fromDate) {
                        dateConditions.push(`(${field} >= '${fromDate}')`);
                      } else if (toDate) {
                        dateConditions.push(`(${field} <= '${toDate}')`);
                      }


                      if (dateConditions.length > 0) {
                        conditions.push(`(${dateConditions.join(" OR ")})`);
                      }
                    }
                    // --------------------------
                    // FINAL WHERE CLAUSE
                    // --------------------------
                    const whereClause = conditions.join(" AND ");
                    sessionStorage.setItem("TR328_WHERE", whereClause);

                    console.log("FINAL FILTER:", whereClause);

                    dispatch(
                      fetchListview(
                        accessID,
                        screenName,
                        whereClause,
                        "",
                        compID
                      )
                    );

                    setTimeout(() => setSubmitting(false), 100);
                  }}


                >
                  {({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    setFieldValue,
                    resetForm,
                  }) => (
                    <form onSubmit={handleSubmit}>

                      <Box
                        sx={{
                          height: 600,
                          overflowY: "auto",
                          marginTop: "20px",
                        }}

                      >
                        <IconButton
                          size="small"
                          onClick={() => setShowMore(false)}
                          sx={{ position: "absolute", top: 5, right: 4 }}
                        >
                          <Tooltip title="Close">
                            <CancelIcon color="error" />
                          </Tooltip>
                        </IconButton>
                        <TextField
                          name="fromdate"
                          type="date"
                          id="fromdate"
                          label="From Date"
                          variant="standard"
                          value={values.fromdate || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("fromdate", newDate);
                            // dispatch(setFromDate(newDate));
                            sessionStorage.setItem("FromDate", newDate);

                            if (newDate) {
                              setFieldValue("freshCall", "N");
                              sessionStorage.setItem("TR328_FreshCall", "N");
                            }
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                          disabled={values.freshCall === "Y"}
                        />

                        <TextField
                          name="date"
                          type="date"
                          id="date"
                          label="To Date"
                          variant="standard"
                          value={values.date || ""}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            setFieldValue("date", newDate);
                            // dispatch(setToDate(newDate));
                            sessionStorage.setItem("ToDate", newDate);

                            if (newDate) {
                              setFieldValue("freshCall", "N");
                              sessionStorage.setItem("TR328_FreshCall", "N");
                            }
                          }}
                          focused
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                          sx={{ width: 250, mt: 2 }}
                          disabled={values.freshCall === "Y"}
                        />
                        <MultiFormikOptimizedAutocomplete
                          sx={{ width: 250, mt: 1 }}
                          id="party"
                          name="party"
                          label="Party"
                          variant="outlined"
                          value={values.party}
                          onChange={(e, newValue) => {
                            setFieldValue("party", newValue);
                            sessionStorage.setItem(
                              "TR328_Party",
                              JSON.stringify(newValue)
                            );
                          }}
                          disablePortal={false}
                          PopperProps={{
                            sx: {
                              zIndex: 1500,
                            },
                          }}
                          // error={!!touched.party && !!errors.party}
                          // helperText={touched.party && errors.party}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2140","ScreenName":"Party","Filter":"CompanyID=${compID}","Any":""}}`}
                        />
                        <MultiFormikOptimizedAutocomplete
                          sx={{ width: 250, mt: 1 }}
                          id="product"
                          name="product"
                          label="Product"
                          variant="outlined"
                          value={values.product}
                          onChange={(e, newValue) => {
                            setFieldValue("product", newValue);
                            sessionStorage.setItem(
                              "TR328_Product",
                              JSON.stringify(newValue)
                            );
                          }}
                          // error={!!touched.product && !!errors.product}
                          // helperText={touched.product && errors.product}
                          url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Product","Filter":"CompanyID='${compID}' AND ItemsDesc ='Product'","Any":""}}`}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.freshCall === "Y"}
                              //disabled={Boolean(values.fromdate || values.date)}
                              onChange={(e) => {
                                const val = e.target.checked ? "Y" : "N";
                                setFieldValue("freshCall", val);
                                sessionStorage.setItem("TR328_FreshCall", val);
                                if (val === "Y") {
                                  setFieldValue("fromdate", "");
                                  setFieldValue("date", "");
                                  sessionStorage.removeItem("FromDate");
                                  sessionStorage.removeItem("ToDate");
                                }
                              }}
                            />
                          }
                          label="Fresh Calls"
                        />

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="end"
                          spacing={1}
                          marginTop={3}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            Apply
                          </Button>
                          <Button
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={() => {
                              [
                                "FromDate",
                                "ToDate",

                                "TR328_Party",
                                "TR328_Product",
                                "TR328_Filters",
                                "TR328_WHERE",
                                "TR328_FreshCall",
                              ].forEach((key) =>
                                sessionStorage.removeItem(key)
                              );

                              resetForm({
                                values: {
                                  fromdate: "",
                                  date: "",
                                  party: [],
                                  product: [],
                                },
                              });
                            }}
                          >
                            RESET
                          </Button>
                        </Stack>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            )}
          </Box>
          {accessID !== "TR313" && (
            <Box display="flex" alignItems="center" marginLeft={3}>
              <Typography fontWeight={400} fontSize={15} lineHeight={1} mb={-2}>
                Legend
              </Typography>
            </Box>)}
        </Box>
        {accessID == "TR049" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of UOM"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR072" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List Of Process"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR286" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<CategoryOutlinedIcon color="primary" />}
              label="Assessment Category"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR299" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<CategoryOutlinedIcon color="primary" />}
              label="Assessment Category"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR278" ? (
          <Box display="flex" flexDirection="row" gap={2} padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            {/* <Chip
              icon={<Delete color="error" />}
              label="Delete"
              variant="outlined"
            /> */}
            <Chip
              icon={<Psychology color="primary" />}
              label="Assessment"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR333" ? (
          <Box display="flex" flexDirection="row" gap={2} padding="25px">
            {/* <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            /> */}
            <Chip
              icon={<PictureAsPdfIcon color="error" />}
              label="Download Payslip Pdf"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR058" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Remarks"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR010" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<WysiwygIcon color="primary" />}
              label="Customer Products"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AssessmentIcon color="primary" />}
              label="Customer Analysis"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR009" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR213" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<EventNoteIcon color="primary" />}
              label="Leave Enquiry Report"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR083" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Colors"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR002" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Products"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR044" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label=" List of Category"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR064" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Stock"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR059" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Delivery Challan"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR078" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR047" ? (
          <Box
            display="flex"
            flexDirection="row"
            padding="25px"
            sx={{ overflowY: "auto" }}
          >
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Production Card Items"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="error" />}
              label="Indent Items"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<SettingsBackupRestoreIcon color="primary" />}
              label="Process"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PlayCircleOutlineOutlinedIcon color="success" />}
              label="Not yet Started"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<NotStartedOutlinedIcon color="primary" />}
              label="Inprogress"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<TaskAltOutlinedIcon color="success" />}
              label="Completed"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<PauseCircleOutlinedIcon color="warning" />}
              label="Pause"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR076" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Batch"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR116" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Packing List"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR109" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<PrintOutlinedIcon color="primary" />}
              label="Print"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EmailIcon color="primary" />}
              label="Email"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR043" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Invoice"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR101" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Order Enquiry"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR027" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />

            <Chip
              icon={<AddPhotoAlternateIcon color="primary" />}
              label="Image Upload"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<EventNoteIcon color="primary" />}
              label="Leave Enquiry"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR243" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />

            <Chip
              icon={<Diversity2Icon color="primary" />}
              label="Leads"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<CategoryIcon color="primary" />}
              label="Order"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<RequestQuoteOutlinedIcon color="primary" />}
              label="Quotation"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<CurrencyRupeeOutlinedIcon color="primary" />}
              label="Advance Payment"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR321" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />

            <Chip
              icon={<Diversity2Icon color="primary" />}
              label="Leads"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<CategoryIcon color="primary" />}
              label="Order"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<RequestQuoteOutlinedIcon color="primary" />}
              label="Quotation"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={<CurrencyRupeeOutlinedIcon color="primary" />}
              label="Advance Payment"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR313" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            {/* <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />

            <Chip
              icon={< Diversity2Icon color="primary"/>}
              label="Leads"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            />
            <Chip
              icon={< CategoryIcon color="primary"/>}
              label="Order"
              variant="outlined"
              sx={{ marginLeft: "50px" }}
            /> */}
          </Box>
        ) : accessID == "TR328" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<Visibility color="primary" />}
              label="View"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR323" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<AltRouteOutlinedIcon color="primary" />}
              label="Route Area"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR315" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<CategoryOutlinedIcon color="primary" />}
              label="Item Category"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR330" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<PeopleAltIcon color="primary" />}
              label="Personnel"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR316" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<QrCodeScannerOutlinedIcon color="primary" />}
              label="HSN Master"
              variant="outlined"
            // sx={{ marginLeft: "50px" }}
            />
          </Box>
        ) : accessID == "TR099" ? (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Usergroups"
              variant="outlined"
            />
          </Box>
        ) : accessID == "TR275" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            {/* <Chip
              icon={<BalanceIcon color="primary" />}
              label="Milestone Weightage"
              variant="outlined"
            /> */}
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<Visibility color="primary" />}
              label="View"
              variant="outlined"
            />
            <Chip
              icon={<PictureAsPdfIcon color="error" />}
              label="Download PDF"
              variant="outlined"
            />
            {/* <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="List of Milestone"
              variant="outlined"
            /> */}
          </Box>
        ) : accessID == "TR128" ? (
          <Box display="flex" flexDirection="row" padding="25px" gap="5px">

            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
            <Chip
              icon={<ListAltOutlinedIcon color="primary" />}
              label="Gate"
              variant="outlined"
            />

          </Box>
        ) : (
          <Box display="flex" flexDirection="row" padding="25px">
            <Chip
              icon={<ModeEditOutlinedIcon color="primary" />}
              label="Edit"
              variant="outlined"
            />
          </Box>
        )}
      </Box>
      <MatxCustomizer
        open={open}
        screenName={invoice}
        rowData={mailData}
        type={""}
      />
    </React.Fragment>
  );
};
export default Listview;
