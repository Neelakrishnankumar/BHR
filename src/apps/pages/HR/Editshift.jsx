import React from "react";
import {
    TextField,
    Box,
    Typography,
    FormControl,
    FormLabel,
    Button,
    IconButton,
    Tooltip,
    Checkbox,
    LinearProgress,
    useMediaQuery,
    useTheme,
    Paper,
    Breadcrumbs,
    Select,
    MenuItem,
    InputLabel
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Field, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { postData, getFetchData } from "../../../store/reducers/Formapireducer";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";

const Editshift = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const location = useLocation();

    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    // Redux state
    const data = useSelector((state) => state.formApi.Data);
    const getLoading = useSelector((state) => state.formApi.getLoading);
    const YearFlag = sessionStorage.getItem("YearFlag");
    const Year = sessionStorage.getItem("year");
    const Finyear = sessionStorage.getItem("YearRecorid");
    const CompanyID = sessionStorage.getItem("compID");
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    // Page params
    const recID = params.id;
    const mode = params.Mode;
    const accessID = params.accessID;

    useEffect(() => {
        // Fetch data only when the recID or mode changes
        if (recID && mode === "E") {
            dispatch(getFetchData({ accessID, get: "get", recID }));
        }
        else {
            dispatch(getFetchData({ accessID, get: "get", recID }));

        }
    }, [location.key, recID, mode]);

    // Ensure data is available before rendering form
    if (!data && getLoading) {
        return <LinearProgress />;
    }

    const InitialValue = {
        code: data.Code,
        name: data.Description,
        starttime: data.ShiftstartTime,
        endtime: data.ShiftendTime,
        weekoff: data.WeekOff,
        sortorder: data.Sortorder,
        disable: data.Disable === "Y" ? true : false,
        monday: data.Monday === "Y" ? true : false,
        tuesday: data.Tuesday === "Y" ? true : false,
        wednesday: data.Wednesday === "Y" ? true : false,
        thursday: data.Thursday === "Y" ? true : false,
        friday: data.Friday === "Y" ? true : false,
        saturday: data.Saturday === "Y" ? true : false,
        sunday: data.Sunday === "Y" ? true : false,
    };

    const Fnsave = async (values, del) => {
        setLoading(true);

        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";

        const isCheck = values.disable ? "Y" : "N";

        const idata = {
            RecordID: recID,
            Code: values.code,
            Name: values.name,
            StartTime: values.starttime,
            EndTime: values.endtime,
            SortOrder: values.sortorder,
            //WeekOff: values.weekoff,
            Monday: values.monday === true ? "Y" : "N",
            Tuesday: values.tuesday === true ? "Y" : "N",
            Wednesday: values.wednesday === true ? "Y" : "N",
            Thursday: values.thursday === true ? "Y" : "N",
            Friday: values.friday === true ? "Y" : "N",
            Saturday: values.saturday === true ? "Y" : "N",
            Sunday: values.sunday === true ? "Y" : "N",
            Disable: isCheck,
            //Finyear,
            CompanyID,
        };

        try {
            const response = await dispatch(postData({ accessID, action, idata }));

            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                navigate("/Apps/TR265/Shift");
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("An error occurred while saving data.");
        } finally {
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
                    navigate("/Apps/TR265/Shift");
                }
            }
        });
    };

    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : null}

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
                                    Shift
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
                        initialValues={InitialValue}
                        onSubmit={(values, setSubmitting) => {
                            setTimeout(() => {
                                Fnsave(values);
                            }, 100);
                        }}
                        //validationSchema={FunctionSchema}
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
                                            }
                                        }}
                                        InputProps={{readOnly:true}}
                                        // autoFocus
                                    />
                                    <TextField
                                        name="name"
                                        type="text"
                                        id="name"
                                        label="Description"
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
                                            }
                                        }}
                                        autoFocus
                                    />


                                    <FormControl
                                        sx={{
                                            //gridColumn: "span 2",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            //background: "#fff6c3"
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            type="time"
                                            id="starttime"
                                            name="starttime"
                                            inputFormat="HH:mm:aa"
                                            value={values.starttime}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Shift Start Time"
                                            focused
                                        // inputProps={{ maxLength:20}}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            //gridColumn: "span 2",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            //background: "#fff6c3"
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            type="time"
                                            id="endtime"
                                            name="endtime"
                                            inputFormat="HH:mm:aa"
                                            value={values.endtime}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Shift End Time"
                                            focused
                                        // inputProps={{ readOnly: true }}
                                        />
                                    </FormControl>
                                    {/* <Typography variant="h6">Week Off</Typography> */}
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ mb:-1, fontWeight: 'bold' }}>
                                            Week Off
                                        </Typography>
                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="monday"
                                            id="monday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Monday"
                                        />

                                        <FormLabel focused={false}>Mon</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="tuesday"
                                            id="tuesday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Tuesday"
                                        />

                                        <FormLabel focused={false}>Tues</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="wednesday"
                                            id="wednesday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Wednesday"
                                        />

                                        <FormLabel focused={false}>Wed</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="thursday"
                                            id="thursday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Thursday"
                                        />

                                        <FormLabel focused={false}>Thurs</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="friday"
                                            id="friday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Friday"
                                        />

                                        <FormLabel focused={false}>Fri</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="saturday"
                                            id="saturday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Saturday"
                                        />

                                        <FormLabel focused={false}>Sat</FormLabel>

                                        <Field
                                            //  size="small"
                                            type="checkbox"
                                            name="sunday"
                                            id="sunday"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={Checkbox}
                                            label="Sunday"
                                        />

                                        <FormLabel focused={false}>Sun</FormLabel>
                                    </Box>
                                    {/* <FormControl
                                        focused
                                        variant="standard"
                                    //sx={{ gridColumn: "span 2" }}
                                    >
                                        <InputLabel variant="filled" id="weekoff">
                                            {
                                                <span>
                                                    Weekoff <span style={{ color: "red", marginBottom: "2px" }}>*</span>
                                                </span>
                                            }
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            label=""
                                            fullWidth
                                            variant="standard"
                                            type="text"
                                            value={values.weekoff}
                                            id="weekoff"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="weekoff"
                                            required
                                            focused
                                        >
                                            <MenuItem value="SD" >Sunday</MenuItem>
                                            <MenuItem value="MD">Monday</MenuItem>
                                            <MenuItem value="TD">Tuesday</MenuItem>
                                            <MenuItem value="WD">Wednesday</MenuItem>
                                            <MenuItem value="TH">Thursday</MenuItem>
                                            <MenuItem value="FD">Friday</MenuItem>
                                            <MenuItem value="SA">Saturday</MenuItem>
                                        </Select>
                                    </FormControl> */}
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
                                    {YearFlag == "true" ? (
                                        <LoadingButton
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            loading={loading}
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
                                    )}   {YearFlag == "true" && mode=="E" ? (
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
                                        // <Button
                                        //     color="error"
                                        //     variant="contained"
                                        //     disabled={true}
                                        // >
                                        //     Delete
                                        // </Button>
                                        null
                                    )}
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/Apps/TR265/Shift");
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

export default Editshift;
