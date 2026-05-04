import {
  TextField,
  Box,
  Grid,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Stack,
  FormControlLabel,
  Tooltip,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  LinearProgress,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Hidden,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import {
  GridActionsCellItem,
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getFetchData,
  postData,
  requestMail,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../Theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  CheckinAutocomplete,
  Employeeautocomplete,
  ManagerTaskEmpAutocomplete,
  MultiFormikOptimizedAutocomplete,
  Productautocomplete,
  SprintEmpAutocomplete,
  SprintEmpAutocomplete1,
} from "../../../ui-components/global/Autocomplete";
import {
  dataGridHeaderFooterHeight,
  dataGridRowHeight,
  formGap,
} from "../../../ui-components/global/utils";
//import Productautocomplete from "../../../ui-components/global/Autocomplete";
// import FileListPopup from "../../../ui-components/FIleViewDialog";
// import FileUploadIconButton from "../../../ui-components/FileUploadButton";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import GradingIcon from "@mui/icons-material/Grading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import store from "../../..";
// import ErrorMsgData from "../../Security/validationMsg.json"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as Yup from "yup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getConfig } from "../../../config";
// const validationSchema = Yup.object().shape({
//   TargetDate: Yup.string().required(ErrorMsgData.Managertask.TargetDate).nullable(),
//   date: Yup.string().required(ErrorMsgData.Managertask.date),
//   TaskType: Yup.string().required(ErrorMsgData.Managertask.TaskType),
//   TaskPriority: Yup.string().required(ErrorMsgData.Managertask.TaskPriority),
//   Comment: Yup.string().required(ErrorMsgData.Managertask.Comment),
// });

const EditTimetablev1 = () => {

  const config = getConfig();
  const baseurl1 = config.BASE_URL;
  console.log(baseurl1, "url path");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  const compID = sessionStorage.getItem("compID");
  console.log(compID, "---sessionStorage compID");

  var QA = sessionStorage.getItem("qualityassurance");
  var mode = params.Mode;
  const data = useSelector((state) => state.formApi.Data);
  // console.log(data.Detail, "--Detail get listview");

  const Status = useSelector((state) => state.formApi.Status);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  const Msg = useSelector((state) => state.formApi.msg);
  const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
  const YearFlag = sessionStorage.getItem("YearFlag");
  const EMPID = sessionStorage.getItem("EmpId");
  const Year = sessionStorage.getItem("year");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const rowData = location.state || {};
  console.log(rowData, "---rowData");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const is003Subscription = SubscriptionCode.endsWith("003");
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  console.log(SubscriptionCode, is003Subscription, "SubscriptionCode");
  const companyClassification = sessionStorage.getItem("Classification");
  const UserName = sessionStorage.getItem("UserName");
  console.log(companyClassification, UserName, "--sessionStorage companyClassification", "UserName");
  const sliceSubscriptionCode = SubscriptionCode.slice(-3);
  const empName = sessionStorage.getItem("EmpName");
  const getRawData = sessionStorage.getItem("ClassificationData");

  let ClassificationData = [];
  try {
    const parsed = JSON.parse(getRawData || "[]");
    // Handle double-stringified case
    ClassificationData = typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  } catch (e) {
    console.error("ClassificationData parse failed:", getRawData);
    ClassificationData = [];
  }

  const classids = ClassificationData
    .filter(item => ["Board Of Directors", "Teaching Staff"].includes(item.CfcName))
    .map(item => item.CfcID);

  console.log(classids, "--classids");
  const ClassificationRecID = sessionStorage.getItem("ClassificationRecID");
  console.log(ClassificationRecID, "--sessionStorage ClassificationRecID");

  // const ClassificationData = sessionStorage.getItem("ClassificationData");


  console.log(ClassificationData, "--find getItem ClassificationData");

  const filteredClassification = ClassificationData.filter(
    (item) => item.CfcName !== "Student"
  );
  const classificationIDs = filteredClassification.map(
    (item) => item.CfcID
  );

  const classificationIDString = classificationIDs
    .map((id) => `'${id}'`)
    .join(",");

  const [showImage, setShowImage] = useState(
    params.Mode == "IM" ? true : false,
  );
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  //FOR ADDITONAL DROPDOWNS
  const [showMore, setShowMore] = React.useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);
        const schema = Yup.object().shape({
          ProName: Yup.object().required(data.Managertask.ProName).nullable(),
          empName: Yup.object().required(data.Managertask.empName).nullable(),
          TargetDate: Yup.string()
            .required(data.Managertask.TargetDate)
            .nullable(),
          date: Yup.string().required(data.Managertask.date),
          TaskType: Yup.string().required(data.Managertask.TaskType),
          TaskPriority: Yup.string().required(data.Managertask.TaskPriority),
          Comment: Yup.string().required(data.Managertask.Comment),
          estimatedHours: Yup.string().required(
            data.Managertask.estimatedHours,
          ),
        });

        setValidationSchema(schema);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, []);

  useEffect(() => {
    if (mode !== "A") {
      dispatch(getFetchData({ accessID: "TR368", get: "get", recID }));
    }
  }, []);


  const targettoday = new Date().toISOString().split("T")[0];

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const yyyy = today.getFullYear();

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(today.getDate()).padStart(2, "0")}`;
  };
  console.log(mode, "mode");
  const assigneddDate = `${yyyy}-${mm}-${dd}`;
  const EmpName = sessionStorage.getItem("EmpName");


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
          navigate(-1);
        }
      } else {
        return;
      }
    });
  };

  async function fileUpload(file, EmpId, action, id, purpose) {
    if (!EmpId) {
      toast.error("Please choose Personnel");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("empId", EmpId);
    formData.append("appId", data.RecordID);
    formData.append("type", "T");
    formData.append("source", "Manager");
    formData.append("action", action);
    formData.append("id", id);
    formData.append("purpose", purpose);
    const respose = await dispatch(attachmentPost({ data: formData }));

    if (respose.payload.success) {
      toast.success(respose.payload.message);
      var url = store.getState().globalurl.empGetAttachmentUrl;
      axios
        .get(url, {
          params: {
            empId: EmpId,
            appId: recID,
          },
        })
        .then((response) => {
          setFiles(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch attachments.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      toast.success(respose.payload.message);
    }
  }


  //---------------------------Time Table Screen ----------START------------>

  const TTrows = [
    {
      id: 1,
      RecordID: 1,
      Days: { RecordID: 1, Name: "Monday" },
      Department: { RecordID: 1, Name: "Maths" },
      Slots: { RecordID: 1, Name: "Slot 1" },
      Comments: "Morning",
    },
    {
      id: 2,
      RecordID: 2,
      Days: { RecordID: 2, Name: "Tuesday" },
      Department: { RecordID: 2, Name: "Science" },
      Slots: { RecordID: 3, Name: "Slot 3" },
      Comments: "Middle",
    },
    {
      id: 3,
      RecordID: 3,
      Days: { RecordID: 3, Name: "Wednesday" },
      Department: { RecordID: 4, Name: "English" },
      Slots: { RecordID: 4, Name: "Slot 4" },
      Comments: "Afternoon",
    },
  ];


  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = React.useState(0);

  const [rows, setRows] = React.useState([]);
  const hasRows = rows.length > 0;
  const [rowModesModel, setRowModesModel] = React.useState({});


  useEffect(() => {
    if (mode !== "A" && data?.Detail) {
      const formattedRows = data.Detail.map((item) => ({
        id: Number(item.DetailID),
        RecordID: Number(item.DetailID),
        Days: { RecordID: item.Day, Name: item.Day },
        Department: { RecordID: item.DepartmentID, Name: item.DepartmentName },
        Teacher: { RecordID: item.EmployeeID, Name: item.EmployeeName },
        Slots: { RecordID: item.SlotID, Name: item.SlotName },
        Comments: item?.Comments,
      }));

      setRows([]);              // ✅ clear old buggy state
      setTimeout(() => {
        setRows(formattedRows); // ✅ set fresh
      }, 0);
    }
  }, [data]);


  // React.useEffect(() => {
  //   if (mode !== "A" && data?.Detail) {
  //     const formattedRows = data.Detail.map((item, index) => ({
  //       id: item.DetailID,
  //       RecordID: item.DetailID,
  //       Days: { RecordID: item.Day, Name: item.Day },
  //       Department: { RecordID: item.DepartmentID, Name: item.DepartmentName },
  //       Teacher: { RecordID: item.EmployeeID, Name: item.EmployeeName },
  //       Slots: { RecordID: item.SlotID, Name: item.SlotName },
  //       Comments: item?.Comments,
  //     }));
  // console.log(formattedRows, "--formattedRows");

  //     setRows(formattedRows);
  //   }
  // }, [data, mode]);



  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.View },
    });
  };


  const handleDeleteClick = (RecordID) => async () => {
    try {
      console.log("Deleting ID:", RecordID, typeof RecordID);

      // ✅ Remove row from UI first
      setRows((prevRows) =>
        prevRows.filter((row) => row.RecordID !== RecordID)
      );

      // ✅ Only call API if RecordID is numeric
      if (!RecordID || isNaN(Number(RecordID))) {
        // console.log("Temporary row deleted locally only");
        toast.success("Deleted Successfully");
        return;
      }


      const response = await dispatch(
        postData({
          accessID: "TR368",   // ⚠ use correct case
          action: "harddelete",
          idata: {             // ⚠ use data instead of idata if backend expects data
            DetailID: Number(RecordID),
          },
        })
      );

      if (response?.payload?.Status === "Y") {
        toast.success(response.payload.Msg);
        dispatch(getFetchData({ accessID: "TR368", get: "get", recID }));

      } else {
        toast.error(response?.payload?.Msg || "Delete failed");
      }

    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error occurred while deleting.");
    }
  };

  const handleCancelClick = (RecordID) => () => {
    setRowModesModel({
      ...rowModesModel,
      [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.RecordID === RecordID);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.RecordID !== RecordID));
    }
  };


  const validateRowTT = (row) => {
    if (!row.Days) {
      return "please Select the Days";
    }
    if (!row.Department) {
      return "Please Select the Subject";
    }
    if (!row.Teacher) {
      return "Please Select the Teacher";
    }
    if (!row.Slots) {
      return "Please Select the Slots";
    }

    return null;
  };

  const processRowUpdate = (newRow, oldRow) => {
    console.log(rows, "--inside proceeess");

    //validation
    const error = validateRowTT(newRow);
    if (error) {
      throw new Error(error);
    }
    const isNew = !oldRow?.RecordID;
    const updatedRow = { ...newRow, isNew };

    setRows((prev) => {
      const index = prev.findIndex(
        (row) => row.RecordID === updatedRow.RecordID
      );
      if (index !== -1) {
        const newData = [...prev];
        newData[index] = updatedRow;
        return newData;
      }
      return [...prev, updatedRow];
    });
    console.log(updatedRow, "--updatedRow");

    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function EditDaysAutocompleteCell(props) {
    const { id, value, field, api, row } = props;

    const handleChange = async (newValue) => {
      console.log("🚀 ~ Days  handleChange ~ Days newValue:", newValue);
      if (!newValue) return;

      setDayslookup(newValue);
      await api.setEditCellValue({
        id,
        field: "Days",
        value: newValue,
      });

      api.stopCellEditMode({ id, field });
    };
    const [dayslookup, setDayslookup] = useState(row.Days ? row.Days : null);
    return (
      <SprintEmpAutocomplete1
        name="Days"
        label="Days"
        id="Days"
        value={dayslookup}
        onChange={handleChange}
        url={`${listViewurl}?data={"Query":{"AccessID":"2147","ScreenName":"Days","Filter":"","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
      />
    );
  }
  const [termsIDPass, setTermsIDPas] = useState(data?.SlotGroupID || []);
  console.log(termsIDPass, "termsIDPass");

  function EditdeptAutocompleteCell(props) {
    const { id, value, field, api, row } = props;

    const handleChange = async (newValue) => {
      console.log("🚀 ~ Department handleChange ~ Department newValue:", newValue);
      if (!newValue) return;

      setDeptlookup(newValue);
      await api.setEditCellValue({
        id,
        field: "Department",
        value: newValue,
      });

      api.stopCellEditMode({ id, field });
    };
    const [deptlookup, setDeptlookup] = useState(row.Department ? row.Department : null);
    return (
      <SprintEmpAutocomplete1
        name="Department"
        label="Department"
        id="Department"
        value={deptlookup}
        onChange={handleChange}
        url={`${listViewurl}?data={"Query":{"AccessID":"2149","ScreenName":"Department","Filter":"parentID=${compID}","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
      />
    );
  }
  function EditSlotsAutocompleteCell(props) {
    const { id, value, field, api, row } = props;

    const handleChange = async (newValue) => {
      console.log("🚀 ~ Slots handleChange ~ Slots newValue:", newValue);
      if (!newValue) return;

      setSlotslookup(newValue);
      await api.setEditCellValue({
        id,
        field: "Slots",
        value: newValue,
      });

      api.stopCellEditMode({ id, field });
    };
    const [slotslookup, setSlotslookup] = useState(row.Slots ? row.Slots : null);
    return (
      <SprintEmpAutocomplete1
        name="Slots"
        label="Slots"
        id="Slots"
        value={slotslookup}
        onChange={handleChange}
        // url={`${listViewurl}?data={"Query":{"AccessID":"2171","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}","ScreenName":"Slots","Filter":"parentID='${termsIDPass}'","Any":""}}`}
        url={`${listViewurl}?data=${JSON.stringify({
          Query: {
            AccessID: "2170",
            ScreenName: "Slots",
            VerticalLicense: Subscriptionlastthree,
            Filter: `parentID='${termsIDPass}'`,
            Any: "",
          },
        })}`}
      />
    );
  }


  function EditTeacherAutocomplete(props) {
    const { id, value, field, api, row } = props;

    const handleChange = async (newValue) => {
      console.log("🚀 ~ Teacher handleChange ~ Teacher newValue:", newValue);
      if (!newValue) return;

      setTeachlookup(newValue);
      await api.setEditCellValue({
        id,
        field: "Teacher",
        value: newValue,
      });

      api.stopCellEditMode({ id, field });
    };
    const [Teachlookup, setTeachlookup] = useState(row.Teacher ? row.Teacher : null);
    return (
      <SprintEmpAutocomplete1
        name="Teacher"
        label="Teacher"
        id="Teacher"
        value={Teachlookup}
        onChange={handleChange}
        url={`${listViewurl}?data={"Query":{"AccessID":"2167","ScreenName":"Teacher","Filter":"CompanyID='${compID}' AND ClassificationID IN(${classids})","Any":"","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}"}}`}
      />
    );
  }

  const TTColumns = [
    {
      field: "RecordID",
      headerName: "Record ID",
      width: 120,
      hide: true,
    },
    {
      field: "Days",
      headerName: (
        <span>
          Days <span style={{ color: "red" }}>*</span>
        </span>
      ),

      headerAlign: "center",
      align: "left",
      width: 100,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return params.value?.Name || ""; // show only the name
      },
      renderEditCell: (params) => {
        return <EditDaysAutocompleteCell {...params} />;
      },

    },
    {
      field: "Department",
      headerName: (
        <span>
          Subjects <span style={{ color: "red" }}>*</span>
        </span>
      ),
      headerAlign: "center",
      width: 260,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return params.value?.Name || ""; // show only the name
      },
      renderEditCell: (params) => {
        return <EditdeptAutocompleteCell {...params} />;
      },
    },
    {
      field: "Teacher",
      headerName: (
        <span>
          Teacher <span style={{ color: "red" }}>*</span>
        </span>
      ),

      headerAlign: "center",
      width: 260,
      hide: false,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return params.value?.Name || ""; // show only the name
      },
      renderEditCell: (params) => {
        return <EditTeacherAutocomplete {...params} />;
      },
    },
    {
      field: "Slots",
      headerName: (
        <span>
          Slots <span style={{ color: "red" }}>*</span>
        </span>
      ),
      width: 200,
      hide: false,
      editable: true,
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return params.value?.Name || ""; // show only the name
      },
      renderEditCell: (params) => {
        return <EditSlotsAutocompleteCell {...params} />;
      },

    },
    {
      headerName: "Comments",
      field: "Comments",
      width: "320",
      hide: false,
      editable: true,
      headerAlign: "center"
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const isEditMode = mode !== "A";

  const TimeTableInitialValue = {
    // class: `${rowData.projectName || ""} || ${rowData.MilestoneName || ""}`,
    class: `${rowData.projectName || ""}`,

    Terms: isEditMode && data?.TermsID
      ? {
        RecordID: data.TermsID,
        Name: data.TermsName || "",
      }
      : null,

    description: isEditMode ? data?.Description || "" : "",
    // assignedPerson: isEditMode ? data?.AssignedByName || "" : "",
    assignedPerson: UserName || "",
    Slotgroup: data?.SlotGroupID ?
      {
        RecordID: data.SlotGroupID,
        Name: data.SlotGroupName || "",
      } : null,
    assignedDate: new Date().toISOString().split("T")[0],
  };

console.log(data.SlotGroupID,data.SlotGroupName, "--data.SlotGroupID");
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    // const handleClick = () => {
    //   const id = nanoid();
    //   const nextSLNO =
    //     rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
    //   setRows((oldRows) => [
    //     ...oldRows,
    //     {
    //       //  id: id,
    //       id,
    //       RecordID: id,
    //       Days: null,
    //       Department: null,
    //       Teacher: null,
    //       Slots: null,
    //       Comments: "",
    //       isNew: true,
    //     }
    //   ]);
    //   setRowModesModel((oldModel) => ({
    //     ...oldModel,
    //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "Days" },
    //   }));
    // };
    const handleClick = () => {
      const id = nanoid();

      const newRow = {
        id,
        RecordID: id,
        Days: null,
        Department: null,
        Teacher: null,
        Slots: null,
        Comments: "",
        isNew: true,
      };

      setRows((oldRows) => {
        const updatedRows = [...oldRows, newRow];

        //  Calculate new page
        const newTotal = updatedRows.length;
        const newPageIndex = Math.floor((newTotal - 1) / pageSize);

        //  Move to that page
        setPage(newPageIndex);

        return updatedRows;
      });

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "Days" },
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Record
        </Button>
      </GridToolbarContainer>
    );
  }


  const handleSaveButtonClick = async (values, resetForm) => {
    console.log(rows, "--inside save");


    const Detail = rows.map((row, index) => {
      return {
        DepartmentID: row.Department?.RecordID || 0,
        SlotID: row.Slots?.RecordID || 0,
        EmployeeID: row.Teacher?.RecordID || 0,
        Day: row.Days?.Name || "",
        Comments: row.Comments,
        // DetailID: row.RecordID
        DetailID: !isNaN(Number(row.RecordID)) ? Number(row.RecordID) : -1
      };
    });

    console.log(Detail, "--handleSaveButtonClick Detail");
    // 🔹 Build full API structure
    const idata = {

      CompanyID: compID?.toString(),
      HeaderID: recID,
      ProjectID: rowData.projectID || 0,
      MileStoneID: rowData.MilestoneID || 0,
      TermsID: values.Terms?.RecordID || 0,
      SlotGroupID: values.Slotgroup?.RecordID || 0,
      Assignedby: UserName || "",
      Description: values.description,
      Detail: Detail,
    };

    console.log(idata, "-- Final data");
    // return;
    try {
      const response = await dispatch(
        postData({
          accessID: "TR368",
          action: "insert",
          idata: idata,
        })
      );
      // const response = await dispatch(postData(payload));
      // Check response status for success
      if (response.payload.Status === "Y") {
        setRows([]);
        toast.success(response.payload.Msg);
        navigate(-1);
        // ✅ Clear DataGrid


        // // ✅ Reset Formik fields
        // resetForm();

      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("Error occurred during save.");
    }
  };
  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : false}
      <Paper
        elevation={3}
        sx={{ margin: "0px 10px", background: "#F2F0F0", height: "50px" }}
      >
        <Box display="flex" justifyContent="space-between">
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
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => {
                    is003Subscription ?
                      navigate("/Apps/TR133/Classes") :
                      navigate("/Apps/TR133/Project");
                  }}
                >
                  List Of Classes ({rowData.BreadCrumb1 || ""})
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  {

                    mode == "A" ? "List Of Time Table" : `List Of Time Table (${rowData.BreadCrumb2 || ""})`
                  }
                </Typography>
                <Typography
                  variant="h5"
                  color="#0000D1"
                  sx={{
                    cursor: "default",
                    marginLeft: "10px",
                    fontSize: "17px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  {/* Timetable */}
                  {
                    mode == "A"
                      ? "Time Table"
                      // : `Timetable(${rowData.projectName} || ${rowData.MilestoneName})`
                      : `Time Table(${rowData.BreadCrumb3 || ""})`
                  }
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




      <Paper elevation={3} sx={{ margin: "10px" }}>
        <Formik
          initialValues={TimeTableInitialValue}
          onSubmit={(values, { resetForm }) => {
          }}
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
                  name="class"
                  type="text"
                  id="class"
                  label="Class"
                  variant="standard"
                  focused
                  disabled={hasRows}
                  value={values.class}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  // disabled
                  inputProps={{ readOnly: true }}
                />


                <CheckinAutocomplete

                  sx={{ gridColumn: "span 2" }}
                  name="Terms"
                  label={
                    <>
                      Term
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </>
                  }
                  id="Terms"
                  value={values.Terms}
                  disabled={hasRows}
                  onChange={(newValue) => {
                    if (newValue) {
                      // setTermsIDPas(newValue.RecordID);
                      console.log(termsIDPass, "--termsIDPass");
                      setFieldValue("TermsCode", newValue.Code);
                      setFieldValue("Terms", newValue);
                    } else {
                      setFieldValue("TermsCode", "");
                      setFieldValue("Terms", newValue);
                    }
                  }}
                  error={!!touched.Terms && !!errors.Terms}
                  helperText={touched.Terms && errors.Terms}
                  // url={`${listViewurl}?data={"Query":{"AccessID":"2169","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}","ScreenName":"Terms","Filter":"CompanyID='${compID}'","Any":"","CompId":${compID}}}`}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2169",
                      ScreenName: "Terms",
                      VerticalLicense: Subscriptionlastthree,
                      Filter: `CompanyID='${compID}' AND AcademicYearID='${params.YearID}'`,
                      Any: "",
                    },
                  })}`}
                />
                <CheckinAutocomplete

                  sx={{ gridColumn: "span 2" }}
                  name="Slotgroup"
                  label={
                    <>
                      Slot Group
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </>
                  }
                  id="Slotgroup"
                  value={values.Slotgroup}
                  disabled={hasRows}
                  onChange={(newValue) => {
                    if (newValue) {
                      setTermsIDPas(newValue.RecordID);
                      // setFieldValue("SlotRecordID", newValue.RecordID);
                      setFieldValue("Slotgroup", newValue);
                    } else {
                      setFieldValue("Slotgroup", newValue);
                    }
                  }}
                  error={!!touched.Slotgroup && !!errors.Slotgroup}
                  helperText={touched.Slotgroup && errors.Slotgroup}
                  // url={`${listViewurl}?data={"Query":{"AccessID":"2170","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}","ScreenName":"Slotgroup","Filter":"CompanyID='${compID}'","Any":"","CompId":${compID}}}`}
                  url={`${listViewurl}?data=${JSON.stringify({
                    Query: {
                      AccessID: "2171",
                      ScreenName: "Slotgroup",
                      VerticalLicense: Subscriptionlastthree,
                      Filter: `CompanyID='${compID}'`,
                      Any: "",
                    },
                  })}`}
                />

                <TextField
                  disabled={mode === "V" || hasRows}
                  name="description"
                  type="text"
                  id="description"
                  label="Description"
                  variant="standard"
                  focused
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 2" }}
                />


                {/* <TextField
                  name="assignedPerson"
                  type="text"
                  id="assignedPerson"
                  label="Created By"
                  variant="standard"
                  focused
                  value={values.assignedPerson}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    readOnly: true
                  }}
                // disabled
                /> */}
                <TextField
                  name="assignedDate"
                  type="date"
                  id="assignedDate"
                  label="Created Date"
                  variant="standard"
                  disabled={hasRows}
                  focused
                  inputFormat="YYYY-MM-DD"
                  value={values.assignedDate}
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{ readOnly: true }}
                // disabled
                />


                <Box sx={{ gridColumn: "span 4" }}>
                  <Box
                    height="500px"
                    // height={dataGridHeight}
                    marginTop={2}
                    sx={{
                      "& .MuiDataGrid-root": {
                        // border: "none",
                      },
                      "& .MuiDataGrid-cell": {
                        // borderBottom: "none",
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
                        // borderTop: "none",
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
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      rows={rows}
                      columns={TTColumns}
                      editMode="row"
                      disableSelectionOnClick
                      rowModesModel={rowModesModel}
                      onRowModesModelChange={handleRowModesModelChange}
                      onRowEditStop={handleRowEditStop}
                      processRowUpdate={processRowUpdate}
                      // getRowId={(row) => row.RecordID}
                      getRowId={(row) => row.id}
                      // getRowId={(row) => row.id}
                      disableRowSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      onProcessRowUpdateError={(error) => {
                        console.error(
                          "Row update validation failed:",
                          error.message,
                        );

                        toast.error(error.message);
                      }}
                      components={{
                        Toolbar: EditToolbar,
                      }}
                      componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                      }}
                      rowsPerPageOptions={[5, 10, 20]}
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "odd-row"
                          : "even-row"
                      }
                      pagination
                      pageSize={pageSize}
                      page={page}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      onPageChange={(newPage) => setPage(newPage)}
                    />
                  </Box>
                </Box>

              </Box>

              <Box
                display="flex"
                justifyContent="end"
                mt="20px"
                gap="20px"
                padding={1}
              >
                <LoadingButton
                  disabled={mode === "V"}
                  color="secondary"
                  variant="contained"
                  onClick={() => handleSaveButtonClick(values)}
                  type="submit"

                  loading={isLoading}
                >
                  Generate
                </LoadingButton>

                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => {
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

    </React.Fragment>
  );
};

export default EditTimetablev1;
