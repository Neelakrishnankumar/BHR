import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    FormControl,
    TextField,
    Paper,
    Button,
    IconButton,
    Tooltip,
    Stack,
    useTheme,
    LinearProgress,
    Select,
    MenuItem,
    InputLabel,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    // DataGrid,
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Formik } from "formik";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { tokens } from "../../../Theme";
import store from "../../../index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
// import FileListPopup from "../../../ui-components/FIleViewDialog";
// import FileUploadIconButton from "../../../ui-components/FileUploadButton";
import { attachmentPost } from "../../../store/reducers/LoginReducer";
import GradingIcon from '@mui/icons-material/Grading';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
    fetchApidata,
    explorePostData,
    postData,
    getFetchData,
    requestMail,
    CustomisedCaptionGet,
} from "../../../store/reducers/Formapireducer";
import { toast } from "react-hot-toast";
import CryptoJS from 'crypto-js';
import { formGap } from "../../../ui-components/global/utils";
import { leaveAppoval, mailNotify } from "../../../store/reducers/Listviewapireducer";
import { CheckinAutocomplete, Productautocomplete } from "../../../ui-components/global/Autocomplete";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import ErrorMsgData from "../../Security/validationMsg.json"
import * as Yup from "yup";
import { Mode } from "@mui/icons-material";

const KEY = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte key
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');  // 16-byte IV


export function encryptDataUrlSafe(plainText) {
    const encrypted = CryptoJS.AES.encrypt(plainText, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(); // Standard base64

    // Convert to URL-safe base64
    return encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decryptData(encryptedBase64) {
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(encryptedBase64) },
        KEY,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return decrypted.toString(CryptoJS.enc.Utf8); // Original string
}
const EditPayment = ({ appId, empId }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const mode = params.Mode;
    console.log(mode, "Mode");
    const dispatch = useDispatch();
    var CompanyID = sessionStorage.getItem("companyId");
    const [open, setOpen] = useState(false);
    var recID = params.id;
    var accessID = params.accessID;
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const listViewData = useSelector((state) => state.listviewApi.rowData);
    const listViewColumn = useSelector((state) => state.listviewApi.columnData);
    const [showtable, setShowtable] = useState(false);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const data = useSelector((state) => state.formApi.Data);
    const isLoading = useSelector((state) => state.formApi.loading);
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);
    const [show, setScreen] = React.useState("0");
    const [files, setFiles] = useState([]);
    const [showImage, setShowImage] = useState(params.Mode == "IM" ? true : false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const rowSx = { height: 36, '& td, & th': { py: 0.5 } };
    const EMPID = sessionStorage.getItem("EmpId");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const filtertype = params.filtertype;
    const parentID = params.parentID;
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const state = location.state || {};
     const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";  console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");
    console.log(state, "Paymentstate");
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                const schema = Yup.object().shape({

                    paymentmode: Yup.string().required(data.Payment.paymentmode),
                    amount: Yup.string().trim().required(data.Payment.amount),
                    lastpaiddate: Yup.string().required(data.Payment.lastpaiddate),

                });

                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
      useEffect(() => {
        if (Subscriptionlastthree && accessID) {
          dispatch(
            CustomisedCaptionGet({
              Vertical: Subscriptionlastthree,
              AccessID: accessID,
            })
          );
        }
      }, [Subscriptionlastthree, accessID, dispatch]);
      const Customisedcaptiondata = useSelector(
        (state) => state.formApi.CustomisedCaptionGetData
      );
      // Ensure it's always an array
      const captionArray = Array.isArray(Customisedcaptiondata)
        ? Customisedcaptiondata
        : Customisedcaptiondata?.data || [];
      console.log(Customisedcaptiondata, captionArray, "Customisedcaptiondata");
      const getBusinessCaption = (CaptionID, defaultCaption) => {
        const match = captionArray?.find(
          (item) => item.CAPTIONID === CaptionID
        );
    
        return match?.CAPTION || defaultCaption;
      };
      
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID })).then((res) => {
            console.log(res, "response");
            console.log(res.payload.Data.EmployeeID, "response");
            var url = store.getState().globalurl.empGetAttachmentUrl;
            axios
                .get(url, {
                    params: {
                        empId: res.payload.Data.EmployeeID,
                        appId: recID
                    }
                })
                .then((response) => {
                    setFiles(response.data);
                })
                .catch((err) => {
                    setError('Failed to fetch attachments.');
                    console.error(err);
                })
                .finally(() => setLoading(false));

        })
    }, []);


    const [proName, setProName] = useState(null);

    const currentDate = new Date().toISOString().split('T')[0];
    // console.log(data.ProjectID, "--data.ProjectID");
    const convertDMYtoYMD = (dateStr) => {
        if (!dateStr) return "";

        const [day, month, year] = dateStr.split("-");

        return `${year}-${month}-${day}`;
    };

    const InitialValue = {
        lastpaiddate: convertDMYtoYMD(data.LastPaidDate),
        paymentreference: data.PaymentReference,
        amount: data.PaidAmount,
        paymentmode: data.PaymentMode,
        project: state.projectName,
        employee: state.Employee

    };
    const FNsave = async (values, resetForm, del) => {
        setLoading(true);
        // console.log(funMode, "+  funMode");
        // console.log(data, "--data.ProjectID");
        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";
        const idata = {
            //RecordID:leaveData.recordID,
            RecordID: data.RecordID || -1,
            EmployeeID: filtertype,
            PaymentMode: values.paymentmode,
            PaidAmount: values.amount,
            PaymentReference: values.paymentreference,
            LastPaidDate: values.lastpaiddate,
            InvoiceHaderID: parentID,
            ProjectID: state.ProjectID || 0,
            CompanyID

        };
        const response = await dispatch(
            postData({ accessID: "TR332", action, idata })
        );
        if (response.payload.Status == "Y") {
            setLoading(false);
            toast.success(response.payload.Msg);
            navigate(-1);
            resetForm();
        }
        else if (response.payload.Status == "N") {
            toast.error(response.payload.Msg);

            console.log(values, "--values");

        }
        else {
            setLoading(false);
            toast.error(response.payload.Msg);
        }
    };

    function LeaveTool() {
        return (
            <GridToolbarContainer
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {/* <Typography>{(show == "2" ? "List of Leave" :show == "6" ? "List of OT" : (show == "1" ? "List of Allowance" :"List of Deductions"))}</Typography> */}

                    <Typography variant="h5">List of OT{`(${rowCount}))`}</Typography>
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
    const explorelistViewData = useSelector(
        (state) => state.exploreApi.explorerowData
    );
    const explorelistViewColumn = useSelector(
        (state) => state.exploreApi.explorecolumnData
    );
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const screenChange = (event) => {
        setScreen(event.target.value);
    };
    const VISIBLE_FIELDS = [
        "SLNO",
        "OtDate",
        "NumberOfHours",
        "Status",
        "action",
    ];
    const [funMode, setFunMode] = useState("A");
    const columns = React.useMemo(
        () =>
            explorelistViewColumn
                ? explorelistViewColumn.filter((column) =>
                    VISIBLE_FIELDS.includes(column.field)
                )
                : [],
        [explorelistViewColumn]
    );

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
                if (props === "Logout") navigate("/");
                if (props === "Close") navigate(-1);
            }
        });
    };
    async function fileUpload(file, EMPID, action, id, purpose) {
        console.log("🚀 ~ fileUpload ~ file:", file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('empId', data.EmployeeID);
        formData.append('appId', data.RecordID);
        formData.append('type', "P");
        formData.append('source', "Self");
        formData.append("action", action);
        formData.append("id", id);
        formData.append("purpose", purpose);
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const respose = await dispatch(attachmentPost({ data: formData }))

        if (respose.payload.success) {
            toast.success(respose.payload.message)
            //setShowtable(true);
            var url = store.getState().globalurl.empGetAttachmentUrl;
            axios
                .get(url, {
                    params: {
                        empId: data.EmployeeID,
                        appId: data.RecordID,

                    }
                })
                .then((response) => {
                    setFiles(response.data);
                })
                .catch((err) => {
                    setError('Failed to fetch attachments.');
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
        else {
            toast.success(respose.payload.message)
        }

        console.log("🚀 ~ fileUpload ~ respose:", respose)
    }
    return (
        <React.Fragment>
            {getLoading && <LinearProgress />}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0", height: "40px" }}>
                <Box display="flex" justifyContent="space-between" >
                    <Box display="flex" borderRadius="3px" alignItems="center">
                        {broken && !rtl && (
                            <IconButton onClick={() => toggleSidebar()}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                        <Typography variant="h3" sx={{ marginLeft: "10px", fontSize: "19px" }}>{`Payment(${state.Employee})`}</Typography>
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
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            setTimeout(() => {
                                FNsave(values, resetForm, false);

                            }, 100);
                        }}
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
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap={formGap}
                                    padding={1}
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 4",
                                        },
                                    }}
                                >
                                    <TextField
                                        name="employee"
                                        type="text"
                                        id="employee"
                                        label="Personnel"
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.employee}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                        error={
                                            !!touched.employee && !!errors.employee
                                        }
                                        helperText={
                                            touched.employee && errors.employee
                                        }
                                    />
                                    <TextField
                                        name="project"
                                        type="text"
                                        id="project"
                                        label={getBusinessCaption("Project", "Project")}
                                        variant="standard"
                                        focused
                                        // required
                                        value={values.project}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}
                                        error={
                                            !!touched.project && !!errors.project
                                        }
                                        helperText={
                                            touched.project && errors.project
                                        }
                                    />

                                    <TextField
                                        select
                                        // label="Payment Mode"
                                        label={
                                            <>
                                                Payment Mode<span style={{ color: "red", fontSize: "20px" }}> * </span>
                                            </>
                                        }
                                        id="paymentmode"
                                        name="paymentmode"
                                        value={values.paymentmode}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.paymentmode && !!errors.paymentmode}
                                        helperText={touched.paymentmode && errors.paymentmode}
                                        focused
                                        sx={{ gridColumn: "span 2" }}
                                        variant="standard"
                                    >
                                        <MenuItem value="UPI">UPI</MenuItem>
                                        <MenuItem value="Cash">Cash</MenuItem>
                                        <MenuItem value="NetBanking">Net Banking</MenuItem>

                                    </TextField>

                                    <TextField
                                        name="amount"
                                        id="amount"
                                        // label="Paid Amount"
                                        label={
                                            <>
                                                Paid Amount<span style={{ color: "red", fontSize: "20px" }}> * </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        value={values.amount}
                                        error={!!touched.amount && !!errors.amount}
                                        helperText={touched.amount && errors.amount}
                                        sx={{ gridColumn: "span 2" }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*\.?\d{0,2}$/.test(val)) {
                                                setFieldValue("amount", val);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(e);
                                            let val = e.target.value;

                                            if (val === "" || val === ".") {
                                                setFieldValue("amount", "0.00");
                                                return;
                                            }
                                            if (!val.includes(".")) {
                                                val = `${val}.00`;
                                            }
                                            const num = Number(val);
                                            setFieldValue("amount", num.toFixed(2));
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                                min: 0,
                                                max: 24,
                                            },
                                        }}
                                    />
                                    <TextField
                                        name="paymentreference"
                                        type="text"
                                        id="paymentreference"
                                        label="Payment Reference"
                                        variant="standard"
                                        focused
                                        value={values.paymentreference}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ gridColumn: "span 2" }}

                                    />
                                    <TextField
                                        name="lastpaiddate"
                                        type="date"
                                        id="lastpaiddate"
                                        // label="Last Paid Date"
                                        label={
                                            <>
                                                Last Paid Date<span style={{ color: "red", fontSize: "20px" }}> * </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.lastpaiddate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.lastpaiddate && !!errors.lastpaiddate}
                                        helperText={touched.lastpaiddate && errors.lastpaiddate}
                                        sx={{ gridColumn: "span 2" }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Box
                                        display="flex"
                                        padding={1}
                                        justifyContent="flex-end"
                                        mt="2px"
                                        gridColumn="span 4"
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
                                            type="reset"
                                            color="warning"
                                            variant="contained"
                                            onClick={() => {
                                                navigate(-1);
                                            }}
                                        >
                                            Cancel
                                        </Button>

                                    </Box>
                                </Box>
                            </form>

                        )}
                    </Formik>

                    {/* </Box> */}
                </Paper>

            ) : (
                false
            )}
            {mode === "IM" && files.length > 0 ? (
                <Box mt={2}
                >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography> */}
                        <TableContainer component={Paper} >
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={rowSx}>
                                        <TableCell width={20}><strong>SL#</strong></TableCell>
                                        <TableCell width={160}><strong>Uploaded Date</strong></TableCell>
                                        <TableCell width={250}><strong>Filename</strong></TableCell>
                                        <TableCell width={150}><strong>Purpose</strong></TableCell>
                                        <TableCell width={100}><strong>Source</strong></TableCell>
                                        <TableCell ><strong>View</strong></TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {files.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No files uploaded yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        files.map((file, index) => (
                                            <TableRow key={file.id || index} sx={rowSx}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{file.uploadedDate}</TableCell>
                                                <TableCell>{file.filename}</TableCell>
                                                <TableCell>{file.purpose}</TableCell>
                                                <TableCell>{file.source}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Open File">
                                                        <IconButton
                                                            color="primary"
                                                            component="a"
                                                            href={file.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            size="small"
                                                        >
                                                            <OpenInNewIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="delete">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => fileUpload(
                                                                file.filename,
                                                                data.EmployeeID,
                                                                "delete",
                                                                file.id,
                                                                file.purpose
                                                            )}
                                                            size="small"
                                                        >
                                                            <DeleteForeverIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            ) : null}
        </React.Fragment>
    );
};

export default EditPayment;
