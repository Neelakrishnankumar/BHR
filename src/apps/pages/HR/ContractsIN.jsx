import {
  TextField,
  Box,
  Grid,
  Typography,
  useTheme,
  FormControl,
  Button,
  IconButton,
  Stack,
  Tooltip,
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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { GridActionsCellItem, DataGrid, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { getFetchData, postData, requestMail } from "../../../store/reducers/Formapireducer";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tokens } from "../../../Theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import ViewListIcon from "@mui/icons-material/ViewList";
import GradingIcon from "@mui/icons-material/Grading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import store from "../../..";
import {

  DailyTaskAutocomplete,
  Employeeautocomplete,
} from "../../../ui-components/global/Autocomplete";
import { formGap } from "../../../ui-components/global/utils";
import * as Yup from "yup";
import Chart from "react-apexcharts";
import InvoicePDF from "../pdf/Invoicepdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight } from "../../../ui-components/utils";
const validationSchema = Yup.object().shape({
  // FunName: Yup.object().required("Function is required").nullable(),
  ProName: Yup.object().required("Project  is required").nullable(),
  // employee: Yup.string().required("Project In Date is required").nullable(),
});
const EditContractsin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  var recID = params.id;
  const CompanyID = sessionStorage.getItem("compID");
  var mode = params.Mode;
  var accessID = params.accessID;
  const parentID = params.filtertype;
  const data = useSelector((state) => state.formApi.Data);
  const isManager = sessionStorage.getItem("isManager");
  const [inputValue, setInputValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const Status = useSelector((state) => state.formApi.Status);
  const exploreLoading = useSelector((state) => state.exploreApi.loading);
  const Msg = useSelector((state) => state.formApi.msg);
  //const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const EMPID = sessionStorage.getItem("EmpId");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const { ClickedDate } = location.state || {};
  const EmpName = sessionStorage.getItem("EmpName");
  const [empID, setEmpID] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [funMode, setFunMode] = useState("edit");
  const [rowModesModel, setRowModesModel] = useState({});
  const isReadOnlyAssigned = data.Status === "AS";
  const [Roleid, setRoleid] = useState(null);
  const [selectedRoleOptions, setSelectedRoleOptions] = useState(null);
  const [RoleName, setRoleName] = useState(null);
  // ***************  DAILY TASK  LOOKUP  *************** //
  useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const handleRowModesModelChange = (newRowModesModel) => {
    console.log("---handleRowModesModelChange calling");
    setRowModesModel(newRowModesModel);
    setSelectedRoleOptions(null);
  };
  const handleSaveButtonClick = async (action) => {



    const idata = rows.map((row, index) => {
      var formatted = null;
      if (row.ProjectPlanedDate && !isNaN(new Date(row.ProjectPlanedDate))) {
        //format Date
        const date = new Date(row.ProjectPlanedDate);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const dd = String(date.getDate()).padStart(2, "0");

        formatted = `${yyyy}-${mm}-${dd}`;
        console.log(formatted); // Output: 2025-04-30
      }



      return {
        RecordID: row.RecordID,
        TaskID: recID,
        RoleID: row.TaskDetailRoleID,
        Effort: row.TaskDetailEffort,
        Unit: row.TaskDetailUnit,
        ProjectPlanedDate: formatted,
        CompanyID,

      };

    });



    try {

      const response = await dispatch(
        postData({
          accessID: "TR237",
          // action : funMode, 
          action: funMode === "A" ? "insert" : "update",
          idata: idata,
        })
      );

      // Check response status for success
      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);



        setRows((prev) =>
          prev.map((row) => ({
            ...row,
            isNew: false,
            isUpdated: false,
          }))
        );

        // Fetch updated data based on ManualSalesID
        dispatch(fetchExplorelitview("TR237", "Task Detail", `TaskID = ${recID}`, ""));
        //dispatch(fetchExplorelitview("TR237", "Task Detail", "", ""));

      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      console.error("Error saving rows:", error);
      toast.error("Error occurred during save.");

    }
  };
  const processRowUpdate = (newRow, oldRow) => {
    const isNew = !oldRow?.RecordID;
    const updatedRow = { ...newRow, isNew };

    updatedRow.TaskDetailRoleID = Roleid;
    updatedRow.RoleName = RoleName;
    if (!updatedRow.TaskDetailRoleID || updatedRow.TaskDetailRoleID.trim() === "") {
      toast.error("Role is required.");
      return;
    }
    console.log(updatedRow, "--find updatedRow before setRows");

    setRows((prev) => {
      const index = prev.findIndex((row) => row.RecordID === updatedRow.RecordID);
      if (index !== -1) {
        const newData = [...prev];
        newData[index] = updatedRow;
        return newData;
      }
      return [...prev, updatedRow];
    });
    setSelectedRoleOptions(null);
    setRoleid("");
    setRoleName("");

    // handleSave(updatedRow.RecordID, params, funMode);

    return updatedRow;
  };
  const handleInsert = () => {
    setFunMode("A");

    console.log("----------Step 1");
    const newId = Math.round(Math.random() * 10000); // Temporary unique ID
    setRows((prevRows) => {

      const nextSLNO = prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.SLNO || 0)) + 1 : 1; // Determine next SLNO

      const newRow = {
        RecordID: newId, // Temporary ID, replaced after backend save
        SLNO: nextSLNO,
        TaskID: "",
        TaskDetailRoleID: "",
        RoleCode: "",
        RoleName: "",
        TaskDetailEffort: 0,
        TaskDetailUnit: "",
        ProjectPlanedDate: "",
        isNew: true,

      };

      console.log("----step2 setRows initializing Objects");
      console.log("Inserted row:", newRow); // Log the new row to the console

      return [...prevRows, newRow]; // Append the new row to the existing rows
    });

    console.log("----step3 setRowModesModel initializing Objects");
    setRowModesModel((prev) => ({
      ...prev,
      [newId]: { mode: GridRowModes.Edit },
    }));
  };
  const handleInsertInrow = (recordID) => {
    setFunMode("A");

    console.log("----------Step 1");

    const newId = Math.round(Math.random() * 10000); // Temporary unique ID

    setRows((prevRows) => {
      const index = prevRows.findIndex((row) => row.RecordID === recordID); // ✅ Find the clicked row's index

      if (index === -1) return prevRows; // If not found, return unchanged rows

      const nextSLNO =
        prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.SLNO || 0)) + 1 : 1;

      const newRow = {
        RecordID: newId, // Temporary ID, replaced after backend save
        SLNO: nextSLNO,
        TaskID: "",
        TaskDetailRoleID: "",
        RoleCode: "",
        RoleName: "",
        TaskDetailEffort: 0,
        TaskDetailUnit: "",
        ProjectPlanedDate: "",
        isNew: true,
      };

      console.log("----step2 setRows initializing Objects");
      console.log("Inserted row:", newRow);

      const updatedRows = [...prevRows];
      updatedRows.splice(index + 1, 0, newRow); // ✅ Insert row at the correct position

      return updatedRows;
    });

    console.log("----step3 setRowModesModel initializing Objects");
    setRowModesModel((prev) => ({
      ...prev,
      [newId]: { mode: GridRowModes.Edit },
    }));
  };
  const handleSave = (id, params, action) => () => {
    const rowToSave = params?.row;
    if (!rowToSave) {
      toast.error("Row not found.");
      return;
    }
    // const isNew = rowToSave.isNew;
    // setRows((prev) =>
    //     prev.map((row) =>
    //         row.RecordID === id
    //             ? { ...row, ...rowToSave, isNew: isNew && action !== "delete", isUpdated: !isNew }
    //             : row
    //     )
    // );

    // Update row mode to view
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));

  };
  const CIInitialValue = {
    invoiceno: data.InvoiceNO,
    vendorname: data.VendorName,
    date: data.InvoiceDate, // Ensures initial date follows DD-MM-YYYY
    grossamount: data.GrossAmount,
    total: data.TotalAmount,
    sgst: data.Sgst,
    cgst: data.Cgst,
    employee: data.EmployeeID ? { RecordID: data.EmployeeID, Code: data.EmployeeCode, Name: data.EmployeeName } : null,
  };

  console.log(data.Status, "--data.Status");

  const CISaveFn = async (values, del) => {
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    const isCheck = values.disable ? "Y" : "N";

    const idata = {
      RecordID: recID,
      EmployeeID: values.employee.RecordID,
      InvoiceNO: values.invoiceno,
      VendorName: values.vendorname,
      InvoiceDate: values.date,
      GrossAmount: values.grossamount,
      Sgst: values.sgst,
      Cgst: values.cgst,
      // TotalAmount:values.total,
      Type: "CI"
    };

    const responce = await dispatch(postData({ accessID, action, idata }));

    if (responce.payload.Status == "Y") {
      toast.success(responce.payload.Msg);
      // setIni(true)
      setLoading(false);
      navigate(-1);
    } else {
      toast.error(responce.payload.Msg);
      setLoading(false);
    }
  };
  const fnLogOut = (props) => {
    Swal.fire({
      title: `Do you want ${props}?`,
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
            -1
            // `/Apps/Secondarylistview/TR132/DailyTask/${params.filtertype}/${params.Date}`
          );
        }
      } else {
        return;
      }
    });

  };
  function EditToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          marginBottom: "10px",
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: 2, // Optional: Adds spacing between items
            px: 2,   // Optional: Padding left/right
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleInsert}
              sx={{ whiteSpace: 'nowrap' }} // Keeps text on one line
            >
              Add Record
            </Button>
          </Box>

          <Box sx={{ flex: 0.5 }}>
            <Employeeautocomplete
              name="employee"
              label="Employee"
              id="employee"
              //  value={values.employee}
              //       onChange={(newValue) => {
              //         setFieldValue("employee", newValue);
              //       }}
              //       error={!!touched.employee && !!errors.employee}
              //       helperText={touched.employee && errors.employee}
              fullWidth
              url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID=${CompanyID}","Any":"","CompId":""}}`}
            />
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

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
                  Invoice(Contracts In)
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
            enableReinitialize={true}
            initialValues={CIInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                CISaveFn(values);
              }, 100);
            }}
          // validationSchema={validationSchema}
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
                  {/* <Employeeautocomplete

                    sx={{ gridColumn: "span 2" }}
                    name="employee"
                    label="Employee"
                    id="employee"
                    value={values.employee}
                    onChange={(newValue) => {
                      setFieldValue("employee", newValue);
                    }}
                    error={!!touched.employee && !!errors.employee}
                    helperText={touched.employee && errors.employee}
                    url={`https://ess.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2024","ScreenName":"Employee","Filter":"CompanyID=${CompanyID}","Any":"","CompId":""}}`}
                  /> */}
                  <TextField
                    name="invoiceno"
                    type="text"
                    id="invoiceno"
                    label="Invoice No"
                    required
                    variant="standard"
                    fullWidth
                    focused
                    value={values.invoiceno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="date"
                    type="date"
                    id="date"
                    label="Invoice Date"
                    variant="standard"
                    focused
                    format="MM-DD-YYYY"
                    value={values.date}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{ gridColumn: "span 2", background: "" }}
                    required
                  />

                  <TextField

                    name="vendorname"
                    type="text"
                    id="vendorname"
                    label="Vendor Name"
                    variant="standard"
                    focused
                    value={values.vendorname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                    required
                  />


                  {/* <TextField

                    name="grossamount"
                    type="number"
                    id="grossamount"
                    label="Gross Amount"
                    required
                    variant="standard"
                    fullWidth
                    focused
                    value={values.grossamount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField

                    name="sgst"
                    type="number"
                    id="sgst"
                    label="SGST"
                    required
                    variant="standard"
                    fullWidth
                    focused
                    value={values.sgst}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField

                    name="cgst"
                    type="number"
                    id="cgst"
                    label="CGST"
                    required
                    variant="standard"
                    fullWidth
                    focused
                    value={values.cgst}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />
                  <TextField
                    name="total"
                    type="number"
                    id="total"
                    label="Total Amount"
                    required
                    variant="standard"
                    fullWidth
                    focused
                    value={values.total}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  /> */}
                </Box>
                <Box m="5px">
                  {/* <Typography variant="h4">Role Based Effort</Typography> */}
                  <Box
                    m="5px 0 0 0"
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
                      rows={[]}
                      columns={[]}
                      loading={exploreLoading}
                      rowModesModel={rowModesModel}
                      getRowId={(row) => row.RecordID}
                      editMode="row"
                      disableRowSelectionOnClick
                      rowHeight={dataGridRowHeight}
                      headerHeight={dataGridHeaderFooterHeight}
                      experimentalFeatures={{ newEditingApi: true }}
                      onRowModesModelChange={handleRowModesModelChange}
                      processRowUpdate={processRowUpdate}
                      components={{
                        Toolbar: EditToolbar,
                      }}
                      componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                      }}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      rowsPerPageOptions={[5, 10, 20]}
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "odd-row"
                          : "even-row"
                      }
                      pagination
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" padding={1} gap="20px">
                     <PDFDownloadLink
                    document={
                      <InvoicePDF
                      />
                    }
                    fileName={"Invoice.pdf"}
                    style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
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
                    <Button color="secondary" variant="contained" onClick={handleSaveButtonClick}>
                      Save
                    </Button>
                    <Button color="warning" variant="contained" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                  </Box>
                </Box>

                {/* <Box
                  display="flex"
                  justifyContent="end"
                  mt="20px"
                  gap="20px"
                  padding={1}
                >
                  <PDFDownloadLink
                    document={
                      <InvoicePDF
                      />
                    }
                    fileName={"Invoice.pdf"}
                    style={{ color: "#d32f2f", cursor: "pointer" }} // Red for PDF feel
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
                      CISaveFn(values, "harddelete");
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Box> */}
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

export default EditContractsin;
