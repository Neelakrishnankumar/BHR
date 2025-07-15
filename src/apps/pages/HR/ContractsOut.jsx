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
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/Invoicepdf";
const validationSchema = Yup.object().shape({
  // FunName: Yup.object().required("Function is required").nullable(),
  ProName: Yup.object().required("Project  is required").nullable(),
  // employee: Yup.string().required("Project In Date is required").nullable(),
});
const EditContractsout = () => {
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

  const Status = useSelector((state) => state.formApi.Status);
  const Msg = useSelector((state) => state.formApi.msg);
  //const loading = useSelector((state) => state.formApi.getLoading);
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const EMPID = sessionStorage.getItem("EmpId");
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const { ClickedDate } = location.state || {};
  const EmpName = sessionStorage.getItem("EmpName");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const rowSx = { height: 36, "& td, & th": { py: 0.5 } };
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isReadOnlyAssigned = data.Status === "AS";

  // ***************  DAILY TASK  LOOKUP  *************** //
 useEffect(() => {
    dispatch(getFetchData({ accessID, get: "get", recID }));
  }, [location.key]);
  const COInitialValue = {
    invoiceno: data.InvoiceNO,
    customername: data.VendorName,
    date: data.InvoiceDate, // Ensures initial date follows DD-MM-YYYY
    grossamount: data.GrossAmount,
    sgst: data.Sgst,
    cgst: data.Cgst,
    employee:data.EmployeeID?{RecordID:data.EmployeeID,Code:data.EmployeeCode,Name:data.EmployeeName}:null,
    total:data.TotalAmount
  };

  console.log(data.Status, "--data.Status");

  const COSaveFn = async (values) => {
    let action = mode === "A" ? "insert" : "update";
    const isCheck = values.disable ? "Y" : "N";

    const idata = {
      RecordID: recID,
       EmployeeID: values.employee.RecordID,
     InvoiceNO:values.invoiceno,
     VendorName: values.customername,
     InvoiceDate: values.date,
     GrossAmount: values.grossamount,
     Sgst: values.sgst,
     Cgst: values.cgst,
     Type:"CO",
    //  TotalAmount:values.total

    };
    const response = await dispatch(postData({ accessID, action, idata }));

    if (response.payload.Status === "Y") {
      if (mode == "C" || mode == "B") {
        dispatch(
          requestMail({
            EmployeeID: EMPID,
            Type: "DT",
            RecordID: recID,
          })
        );
        console.log("--calling mail function");

      }
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg);
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
                  Invoice(Contracts Out)
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
            initialValues={COInitialValue}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                COSaveFn(values);
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
                {data.Status == "T" ? (
                  <Stack
                    sx={{ mb: 4 }}
                    spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Chip label={EmpName} variant="outlined" />
                    <ArrowForwardIcon />
                    <Chip label={data.EmployeeName} variant="outlined" />
                  </Stack>
                ) : (
                  false
                )}
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
                  <Employeeautocomplete

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
                  />
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

                    name="customername"
                    type="text"
                    id="customername"
                    label="Customer Name"
                    variant="standard"
                    focused
                    value={values.customername}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: "span 2" }}
                    required
                  />


                  <TextField

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
                  />
                </Box>


                <Box
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
      ) : (
        false
      )}

    </React.Fragment>
  );
};

export default EditContractsout;
