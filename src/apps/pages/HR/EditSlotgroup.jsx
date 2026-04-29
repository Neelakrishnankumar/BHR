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
    MenuItem,
    InputLabel,
    Select,
    LinearProgress,
    Paper,
    Breadcrumbs
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
import { CheckBox } from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gradeSchema } from "../../Security/validation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import {
    CustomisedCaptionGet,
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
// import {  HsnSchema } from "../../Security/validation";
import Popup from "../popup";
import Listviewpopup from "../Lookup";
import { formGap } from "../../../ui-components/global/utils";
import { CheckinAutocomplete, Productautocomplete } from "../../../ui-components/global/Autocomplete";
// import CryptoJS from "crypto-js";
const EditSlotgroup = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    // var parentID = params.filtertype;
    const data = useSelector((state) => state.formApi.Data);
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const location = useLocation();
    const state = location.state || {};
    console.log(state, "checkin");
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [validationSchema, setValidationSchema] = useState(null);
    const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
    const lastThree = SubscriptionCode?.slice(-3) || "";
    const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
        ? lastThree
        : ""; console.log(SubscriptionCode, Subscriptionlastthree, "SubscriptionCode");
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/validationcms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch validationcms.json");
                return res.json();
            })
            .then((data) => {
                setErrorMsgData(data);
                let schemaFields = {
                    name: Yup.string().required(data.Slotgroup.Description).nullable(),                 
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().trim().required(data.Slotgroup.code);
                }

                const schema = Yup.object().shape(schemaFields);              
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
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
    const style = {
        height: "55px",
        border: "2px solid #1769aa ",
        borderRadius: "5px",
        backgroundColor: "#EDEDED",
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const InitialValue = {       
        disable: data.Disable === "Y" ? true : false,
        delete: data.DeleteFlag === "Y" ? true : false,
        sortorder: mode === "E" ? data.Sortorder : 0,
        name: mode === "E" ? data.Name : "",
        code: mode === "E" ? data.Code : "",       
    };

    const Fnsave = async (values, del) => {
        // let action = mode === "A" ? "insert" : "update";
        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";
        var isCheck = "N";
        if (values.disable == false) {
            isCheck = "Y";
        }

        const idata = {
            RecordID: recID || -1,
            Code: values.code || "",
            Name: values.name,                     
            Sortorder: values.sortorder || 0,
            Disable: values.disable == true ? "Y" : "N",
            DeleteFlag: values.delete == true ? "Y" : "N",
            CompanyID
        };

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);
            //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
        } else {
            toast.error(response.payload.Msg);
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
                                    navigate(-1);
                                }}
                            >
                                Slot Group
                            </Typography>

                        </Breadcrumbs>
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
                                                Description
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        variant="standard"
                                        focused
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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

export default EditSlotgroup;

