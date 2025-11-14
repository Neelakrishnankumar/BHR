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
    Breadcrumbs
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { Field, Formik } from "formik";
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
import { formGap } from "../../../ui-components/utils";
import { CheckinAutocomplete } from "../../../ui-components/global/Autocomplete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import CryptoJS from "crypto-js";
const EditOrderitem = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const data = useSelector((state) => state.formApi.Data) || {};
    const Status = useSelector((state) => state.formApi.Status);
    const Msg = useSelector((state) => state.formApi.msg);
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();
    const state = location.state || {};
    const listViewurl = useSelector((state) => state.globalurl.listViewurl);
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);
    // *************** INITIALVALUE  *************** //
    const currentDate = new Date().toISOString().split('T')[0];

    const InitialValue = {
        quantity: data.Quantity,
        price: data.Price,
        netprice: data.NetPrice,
        amount: data.Amount,
        discount: data.Discount,
        project: data.ProductCombo
            ? { RecordID: data.ProductCombo, Name: data.ProjectName }
            : null,
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
        if (values.disable == true) {
            isCheck = "Y";
        }

        const idata = {
            RecordID: recID,
            CompanyID,
            OrderHeareID: params.filtertype,
            ProductCombo: values.product.RecordID || 0,
            Quantity: values.quantity,
            Price: values.price || 0,
            Discount: values.discount || 0,
            NetPrice: values.netprice || 0,
            Amount: values.amount,
        };

        // {
        //     "Status": "Y",
        //     "Data": {
        //         "RecordID": "",
        //         "OrderHeareID": "",
        //         "ProductCombo": "",
        //         "Quantity": "",
        //         "Price": "",
        //         "Discount": "",
        //         "NetPrice": "",
        //         "Amount": ""
        //     }
        // }
        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(-1);

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
            title: `Do you want ${props}?`,
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
                    navigate("/Apps/TR232/Role");
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
                            maxItems={2}
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                        >
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate("/Apps/TR243/Party");
                                }}

                            >
                                {`Party(${state.PartyName || ""})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate(-1);
                                }}

                            >
                                {`Lead(${state.LeadTitle || ""})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate(-1);
                                }}

                            >
                                Order
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}

                            >
                                Order Item
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
                        //  validationSchema={ DesignationSchema}
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
                                    <FormControl
                                        sx={{
                                            //gridColumn: "span 2",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CheckinAutocomplete
                                            id="product"
                                            name="product"
                                            label="Product"
                                            variant="outlined"
                                            value={values.product}
                                            onChange={(newValue) => {
                                                setFieldValue("product", newValue);
                                                console.log(newValue, "--newvalue product");
                                                console.log(newValue.RecordID, "product RecordID");
                                            }}
                                            error={!!touched.product && !!errors.product}
                                            helperText={touched.product && errors.product}
                                            url={`${listViewurl}?data={"Query":{"AccessID":"2054","ScreenName":"Productt","Filter":"parentID='${CompanyID}'","Any":""}}`}
                                        />
                                    </FormControl>
                                    <TextField
                                        name="price"
                                        type="number"
                                        id="price"
                                        label="Price"
                                        variant="standard"
                                        focused
                                        value={values.price}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.price && !!errors.price}
                                        helperText={touched.price && errors.price}
                                        InputProps={{
                                            readOnly: true,
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="discount"
                                        type="number"
                                        id="discount"
                                        label="Discount"
                                        variant="standard"
                                        focused
                                        value={values.discount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.discount && !!errors.discount}
                                        helperText={touched.discount && errors.discount}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="netprice"
                                        type="number"
                                        id="netprice"
                                        label="Net Price"
                                        variant="standard"
                                        focused
                                        value={values.netprice}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.netprice && !!errors.netprice}
                                        helperText={touched.netprice && errors.netprice}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="quantity"
                                        type="number"
                                        id="quantity"
                                        label="Quantity"
                                        variant="standard"
                                        focused
                                        value={values.quantity}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.quantity && !!errors.quantity}
                                        helperText={touched.quantity && errors.quantity}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        name="amount"
                                        type="number"
                                        id="amount"
                                        label="Amount"
                                        variant="standard"
                                        focused
                                        value={values.amount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.amount && !!errors.amount}
                                        helperText={touched.amount && errors.amount}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right" },
                                            },
                                        }}
                                        autoFocus
                                    />


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
                                    )} {YearFlag == "true" ? (
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
                                    )}
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
                                {/* <Box display="flex" justifyContent="end" mt="20px" gap="20px">
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
                            Fnsave(values,  "harddelete");
                          }}
                >
                    Delete
                </Button>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={() => {
                          navigate("/Apps/TR133/Project");
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

export default EditOrderitem;
