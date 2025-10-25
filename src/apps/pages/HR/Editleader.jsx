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
    Checkbox
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
} from "../../../store/reducers/Formapireducer";
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


const EditLeader = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const accessID = params.accessID;
    const recID = params.id;
    const mode = params.Mode;
    const filtertype = params.filtertype;
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
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const state = location.state || {};
console.log(state,"state");
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
                    OverheadType: Yup.object().required(data.Overhead.OverheadType),
                    frequency: Yup.string().required(data.Overhead.frequency),
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().required(data.Overhead.code);
                }

                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, [CompanyAutoCode]);

    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    // const YearRecorid = sessionStorage.getItem("YearRecorid");
    // const CompanyID = sessionStorage.getItem("compID");

    const initialValue = {
        applieddate: data.OMDate,
        leadtitle: data.LeadTitle,
        comments: data.Comments,
        visitdate: data.NextVisitDate,
        // Status: mode === "AP" ? "AP" : mode === "QR" ? "QR" : Data.ApprovedStatus,
        Status : data.OMStatus,
        project: data.ProjectID
            ? { RecordID: data.ProjectID, Name: data.ProjectName }
            : null,
        // OverheadType: data.OverHeadsTypeID
        //   ? {
        //     RecordID: data.RecordID,
        //     Code: data.Code,
        //     Name: data.Name,
        //   }
        //   : null,      
        // disable: data.Disable === "Y" ? true : false,
        // delete: data.DeleteFlag === "Y" ? true : false

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
            PartyID: filtertype,
            OMDate: values.applieddate,
            Comments: values.comments,
            LeadTitle: values.leadtitle,
            Status: values.Status,
            NextVisitDate:values.visitdate,
            ProjectID: values.project.RecordID || 0,
            ProjectName: values.project.Name || "",
            CompanyID,
            // Disable: values.disable == true ? "Y" : "N",
            // DeleteFlag: values.delete == true ? "Y" : "N",

        };
        console.log(idata, "idata");
        // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            // setIni(true)
            setLoading(false);
            navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`);
        } else {
            toast.error(response.payload.Msg);
            setLoading(false);
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
                    navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`);
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
                                {/* {`Marketing Activity(${state.PartyName})`} */}
                                    Marketing Activity
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

                        // validationSchema={validationSchema}
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
                                    <TextField
                                        name="applieddate"
                                        type="date"
                                        id="applieddate"
                                        label="Applied Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.applieddate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.applieddate && !!errors.applieddate}
                                        helperText={touched.applieddate && errors.applieddate}
                                        inputProps={{
                                            max: new Date().toISOString().split("T")[0],
                                            // readOnly: true,
                                        }}
                                    />
                                    <CheckinAutocomplete
                                        id="project"
                                        name="project"
                                        label="Project"
                                        variant="outlined"
                                        value={values.project}
                                        onChange={(newValue) => {
                                            setFieldValue("project", newValue);
                                            console.log(newValue, "--newvalue project");
                                            console.log(newValue.RecordID, "project RecordID");
                                        }}
                                        error={!!touched.project && !!errors.project}
                                        helperText={touched.project && errors.project}
                                        url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Project","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                    />

                                    <TextField
                                        // label={
                                        //     <>
                                        //         Lead Title<span style={{ color: "red", fontSize: "20px" }}>*</span>
                                        //     </>
                                        // }
                                        label="Lead Title"
                                        id="leadtitle"
                                        type="text"
                                        name="leadtitle"
                                        focused
                                        variant="standard"
                                        value={values.leadtitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.leadtitle && !!errors.leadtitle}
                                        helperText={touched.leadtitle && errors.leadtitle}

                                    />
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        type="text"
                                        id="comments"
                                        name="comments"
                                        value={values.comments}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Comments"
                                        focused
                                    // inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        name="visitdate"
                                        type="date"
                                        id="visitdate"
                                        label="Next Visit Date"
                                        variant="standard"
                                        focused
                                        inputFormat="YYYY-MM-DD"
                                        value={values.visitdate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.visitdate && !!errors.visitdate}
                                        helperText={touched.visitdate && errors.visitdate}                                       
                                        // inputProps={{
                                        //     max: new Date().toISOString().split("T")[0],
                                        //     // readOnly: true,
                                        // }}
                                    />
                                    <TextField
                                        select
                                        label="Status"
                                        id="Status"
                                        name="Status"
                                        value={values.Status}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // required
                                        focused
                                        variant="standard"
                                    >
                                        <MenuItem value="Cool">Cool</MenuItem>
                                        <MenuItem value="Warm">Warm</MenuItem>
                                        <MenuItem value="Hot">Hot</MenuItem>
                                        <MenuItem value="Close">Close</MenuItem>
                                    </TextField>
                                    {/* <Box>
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
                                    </Box> */}


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
                                        navigate(`/Apps/Secondarylistview/TR304/Marketing Activity/${filtertype}`);
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
        </React.Fragment>
    );
};

export default EditLeader;
