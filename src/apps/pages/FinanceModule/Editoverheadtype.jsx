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


const Editoverheadtype = () => {
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

                let schemaFields = {
                    name: Yup.string().required(data.Overheadtype.name),
                   
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().required(data.Overheadtype.code);
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
        code: data.Code,
        name: data.Name,
        sortorder: data.SortOrder,      
        disable: data.Disable === "Y" ? true : false,
        delete: data.DeleteFlag === "Y" ? true : false

    };

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
            CompanyID,
            Disable: values.disable == true ? "Y" : "N",
            DeleteFlag: values.delete == true ? "Y" : "N",
            SortOrder: values.sortorder || 0,

        };

        // console.log("🚀 ~ file: Editoverhead.jsx:57 ~ fnSave ~ saveData:", saveData)

        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            // setIni(true)
            setLoading(false);
            navigate(-1);
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
                                    Overhead Type
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
                        onSubmit={(values, { resetForm }) => {
                            setTimeout(() => {
                                fnSave(values);
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
                                                Name<span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                                    {/* <FormControl
                    focused
                    variant="standard"
                  //sx={{ gridColumn: "span 2" }}
                  > */}
                                    {/* <InputLabel id="frequency">Frequency<span style={{ color: 'red', fontSize: '20px' }}>*</span></InputLabel> */}

                                    {/* </FormControl> */}

                                    {/* <FormControl
                    focused
                    variant="standard"
                  //sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel id="productCost">Type<span style={{ color: 'red',fontSize:'20px'}}>*</span></InputLabel> */}

                                    {/* </FormControl> */}
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
        </React.Fragment>
    );
};

export default Editoverheadtype;
