import {
    Box,
    Checkbox,
    useTheme,
    Divider,
    Paper,
    Stack,
    TextField,
    FormControl,
    Popover,
    MenuItem,
    Select,
    InputLabel,
    IconButton,
    FormControlLabel,
    FormLabel,
    Button,
    Typography,
    InputBase,
    InputAdornment,
    Avatar,
    Tooltip,
    Breadcrumbs
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridRowHeight,
    formGap,
} from "../../ui-components/utils";

import { STDMultiFormikOptimizedAutocomplete, STDCheckinAutocomplete } from "../../ui-components/global/Autocomplete";
import {
    GridActionsCellItem,
    DataGrid,
    GridRowModes,
    GridToolbarContainer,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import store from "../..";
import { fileUpload, imageUpload } from "../../store/reducers/Imguploadreducer";
import Resizer from "react-image-file-resizer";
import { tokens } from "../../Theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import Header from "../../ui-components/Header";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Footer from "../../ui-components/Footer";
import ChGPassWord from "../../assets/img/ChGPassWord.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import { Settingsvalidation } from "./validation";
import { CompanydetailpostData, getSettingsData, SettingspostData, postData, companyTermsGet, getFetchData, PolicyFetchData, PolicyUpdateData, } from "../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { slotListView } from "../../store/reducers/Explorelitviewapireducer";
// import { TbBoxMultiple1 } from "react-icons/tb";
import { nanoid } from "@reduxjs/toolkit";

const Configuration = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    let params = useParams();
    const dispatch = useDispatch();
    var recID = params.id;
    var mode = params.Mode;
    var accessID = params.accessID;
    const Subscriptioncode = sessionStorage.getItem("SubscriptionCode");
    const YearFlag = sessionStorage.getItem("YearFlag");
    const compID = sessionStorage.getItem("compID");
    const Username = sessionStorage.getItem("UserName");
    const grace = sessionStorage.getItem("CompanyGraceTime");
    const timeout = sessionStorage.getItem("CompanySessionTimeOut");
    console.log("Grace:", grace);
    console.log("Timeout:", timeout);
    const data = useSelector((state) => state.formApi.Data) || {};
    console.log(data, "--data");
    const isLoading = useSelector((state) => state.formApi.postLoading);
    const [logoimage, setlogoimage] = useState("");
    console.log("Nowlogo", logoimage);
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const slotRowData = useSelector((state) => state.exploreApi.slotRowData);
    console.log(slotRowData, "--slotRowData");
    const rowData = location.state || {};
    const [gstImage, setGstImage] = useState("");
    const [offaddress, setOffaddress] = useState("");
    const [sessiontime, setSessiontime] = useState("");
    const [gracetime, setGracetime] = useState("");
    const [gst, setGst] = useState("");
    const [autocode, setAutocode] = useState(data?.CM_AUTOCODE === "Y");
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
    const [errorMsgData, setErrorMsgData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [show, setScreen] = React.useState("0");
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = useState(15);
    const CompanyID = sessionStorage.getItem("compID");

    //TERMS_GET
    const companytermsData = useSelector((state) => state.formApi.companytermsData);
    console.log(companytermsData, "--companytermsData");
    const [termsrows, setTermsRows] = React.useState(companytermsData);
    const [termsRowModesModel, setTermsRowModesModel] = useState({});
    const lookuplistViewurl = useSelector((state) => state.globalurl.listViewurl);


    //POLICY_GET
    const PolicyData = useSelector((state) => state.formApi.PolicyData);
    const PolicygetLoading = useSelector(
        (state) => state.formApi.PolicygetLoading,
    );

    useEffect(() => {
        setRows(slotRowData || []);
    }, [slotRowData]);

    useEffect(() => {
        setTermsRows(companytermsData || []);
    }, [companytermsData]);
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
    }, [CompanyAutoCode]);

    // const handleCheckboxChange = (event) => {
    //     setAutocode(event.target.checked ? "Y" : "N");
    // };
    useEffect(() => {
        if (data) {
            setOffaddress(data.CM_ADDRESS || "");
            setGst(data.CM_GST || "");
            setlogoimage(data.CM_IMAGE || "");
            setGstImage(data.CM_GSTIMAGE || "");
            setAutocode(data.CM_AUTOCODE === "Y");
            setSessiontime(data.CM_SESSIONTIMEOUT);
            setGracetime(data.CM_GRACETIME);
        }
    }, [data]);

    useEffect(() => {
        dispatch(getSettingsData({
            SubscriptionCode: Subscriptioncode,
        }));
    }, [location.key]);
    const handleAutocodeChange = (e) => {
        const checked = e.target.checked;
        setAutocode(checked);
        sessionStorage.setItem("CompanyAutoCode", checked ? "Y" : "N");
        console.log(checked, "CompanyAutoCode")
    };


    const getFilepanChange = async (event) => {
        setlogoimage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setlogoimage(fileData.payload.name);
        sessionStorage.setItem("logoimage", fileData.payload.name);
        console.log(">>>", fileData.payload);
        console.log(
            "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
            fileData
        );
        if (fileData.payload.Status == "Y") {
            // console.log("I am here");
            toast.success(fileData.payload.Msg);
        }
    };
    const getFilegstChange = async (event) => {
        setGstImage(event.target.files[0]);

        console.log(event.target.files[0]);

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("type", "images");

        const fileData = await dispatch(fileUpload({ formData }));
        setGstImage(fileData.payload.name);
        console.log(">>>", fileData.payload);
        console.log(
            "🚀 ~ file: Editdeliverychalan.jsx:1143 ~ getFileChange ~ fileData:",
            fileData
        );
        if (fileData.payload.Status == "Y") {
            // console.log("I am here");
            toast.success(fileData.payload.Msg);
        }
    };
    const columns = [
        {
            field: "SLNO",
            headerName: "SL#",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            valueGetter: (params) => {
                const index = params.api.getRowIndexRelativeToVisibleRows(params.id);

                const totalVisibleRows = params.api.getAllRowIds().length;
                const totalAllRows = params.api.getRowsCount();

                if (totalVisibleRows < totalAllRows) {
                    return index + 1;
                } else {
                    return page * pageSize + index + 1;
                }
            },
        },
        {
            headerName: "RecordID",
            field: "RecordID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },

        // {
        //   field: "SlotCode",
        //   headerName: "Slot Code",
        //   width: 150,
        //   align: "left",
        //   headerAlign: "center",
        //   editable: false,
        // },
        {
            headerName: "Slot Code",
            field: "SlotCode",
            width: 150,
            hide: false,
            editable: true,
            headerAlign: "center",
            renderCell: (params) => {
                // show "Auto Code" only for new rows OR empty code
                if (!params.value || params.row.isNew) {
                    return "Auto Code";
                }

                return params.value;
            }
        },
        {
            field: "SlotName",
            headerName: (
                <span>
                    Slot Name <span style={{ color: "red" }}>*</span>
                </span>
            ),
            // headerName: "Slot Name",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
        },
        {
            // headerName: "From Time",
            headerName: (
                <span>
                    From Time <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "FromTime", // ✅ match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            renderCell: (params) => params.value || "",
            renderEditCell: (params) => <EditTimeCell {...params} />,
        },
        {
            // headerName: "To Time",
            headerName: (
                <span>
                    To Time <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "ToTime", // ✅ match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            renderCell: (params) => params.value || "",
            renderEditCell: (params) => <EditTimeCell {...params} />,
        },
        {
            field: "Comments",
            headerName: "Comments",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            type: "text",
        },
        {
            field: "Break",
            headerName: "Break",
            width: 120,
            align: "center",
            headerAlign: "center",
            editable: true,

            // Display checkbox in normal mode
            renderCell: (params) => (
                <Checkbox
                    // checked={Boolean(params.row.Break)}
                    checked={params.row.Break}
                    disabled
                />
            ),

            // Checkbox when row is in edit mode
            renderEditCell: (params) => {
                const { id, field, value, api } = params;

                const handleChange = (event) => {
                    const checked = event.target.checked;

                    api.setEditCellValue({
                        id,
                        field,
                        value: checked,
                    });

                    api.stopCellEditMode({ id, field }); // refresh row
                };

                return (
                    <Checkbox
                        checked={Boolean(value)}
                        onChange={handleChange}
                        color="primary"
                    />
                );
            },
        },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
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
                    // <GridActionsCellItem
                    //   icon={<AddIcon style={{ color: "#00563B" }} />}
                    //   label="Add"
                    //   // onClick={() => handleInsertInrow(id)}
                    //   color="inherit"
                    // />,
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
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    function EditTimeCell(props) {
        const { id, field, value, api } = props;

        const handleChange = (event) => {
            const newValue = event.target.value;
            api.setEditCellValue({ id, field, value: newValue });
        };

        // Remove seconds if present (09:00:00 → 09:00)
        const formattedValue = value ? value.slice(0, 5) : "";

        return (
            <TextField
                type="time"
                fullWidth
                size="small"
                value={formattedValue}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            />
        );
    }
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
        setRows(rows.filter((row) => row.RecordID !== RecordID));

        if (!isNaN(RecordID)) {
            const idata = {
                //RecordID: recID,
                RecordID: RecordID,
            };

            const response = await dispatch(
                postData({
                    accessID: "TR334",
                    action: "harddelete",
                    idata: idata,
                }),
            );

            if (response.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                const data = await dispatch(
                    slotListView({
                        accessID: "TR334",
                        screenName: "Slot",
                        filter: `CompanyID = ${CompanyID}`,
                        any: "",
                    }),
                );
                console.log("🚀 ~ screenChange ~ data:", data);


                if (data.payload.Status === "Y") {
                    const resData = data.payload.Data.rows.map((value) => ({
                        ...value,
                        Break: value.Break === "Y", // ✅ Convert Y/N → boolean
                    }));

                    setRows(resData);
                } else {
                    setRows([]);
                }
            } else {
                toast.error(response.payload?.Msg || "Operation failed");
            }
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
    const validateRowSlot = (row) => {
        if (!row.SlotName) {
            return "Please Enter the Slot Name";
        }
        if (!row.FromTime) {
            return "Please Select the From Time";
        }
        if (!row.ToTime) {
            return "Please Select the To Time";
        }

        // ✅ Time validation
        const from = new Date(`1970-01-01T${row.FromTime}`);
        const to = new Date(`1970-01-01T${row.ToTime}`);

        if (to <= from) {
            return "To Time must be greater than From Time";
        }

        return null;
    };
    const formatTo12Hour = (time) => {
        if (!time) return "";

        // ✅ If already formatted (contains AM/PM), return as is
        if (
            time.toUpperCase().includes("AM") ||
            time.toUpperCase().includes("PM")
        ) {
            return time;
        }

        const [hour, minute] = time.split(":");
        let h = parseInt(hour);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        h = h ? h : 12;

        return `${h}:${minute} ${ampm}`;
    };
    function EditfromDateCell(props) {
        const { id, field, value, api } = props;

        const formatToInputDate = (val) => {
            if (!val) return "";

            const date = new Date(val);
            if (isNaN(date.getTime())) return "";   // prevent invalid time error

            return date.toISOString().split("T")[0];
        };

        const handleChange = (event) => {
            const newValue = event.target.value;
            api.setEditCellValue({ id, field, value: newValue });
        };

        return (
            <TextField
                type="date"
                fullWidth
                size="small"
                value={formatToInputDate(value)}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            />
        );
    }
    function STDEditAutocompleteCell(props) {
        console.log(props, "");
        const { id, value, field, api, row } = props;

        const handleChange = async (event, newValue) => {
            if (!newValue) return;

            await api.setEditCellValue({
                id,
                field,
                value: newValue,
            });

            api.stopCellEditMode({ id, field });
        };

        return (
            <STDMultiFormikOptimizedAutocomplete
                name="StandardName"
                // label="Slot Name"
                id="StandardName"
                value={value || []}
                onChange={handleChange}
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2157","ScreenName":"Standard","Filter":"parentID='${CompanyID}'","Any":""}}`}
            />
        );
    }
    //SLOT LOOKUP
    function SLOTEditAutocompleteCell(props) {
        console.log(props, "");
        const { id, value, field, api, row } = props;

        const handleChange = async (event, newValue) => {
            if (!newValue) return;

            await api.setEditCellValue({
                id,
                field,
                value: newValue,
            });

            api.stopCellEditMode({ id, field });
        };

        return (
            <STDMultiFormikOptimizedAutocomplete
                name="SlotName"
                // label="Slot Name"
                id="SlotName"
                value={value || []}
                onChange={handleChange}
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2148","ScreenName":"Slot Name","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
            />
        );
    }

    //BREAK_SLOT
    function BREAKSLOTEditAutocompleteCell(props) {
        const { id, value, field, api, row } = props;

        const handleChange = async (event, newValue) => {
            if (!newValue) return;

            await api.setEditCellValue({
                id,
                field,
                value: newValue,
            });

            api.stopCellEditMode({ id, field });
        };

        return (
            <STDMultiFormikOptimizedAutocomplete
                name="SlotBreak"
                // label="Slot Break"
                id="SlotBreak"
                value={value || []}
                onChange={handleChange}
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2156","ScreenName":"Slot Break","Filter":"CompanyID='${CompanyID}'","Any":""}}`}
            />
        );
    }
    const processRowUpdate = (newRow, oldRow) => {
        console.log(newRow, "--procesrowupdateterms newrow");
        //validation
        const error = validateRowSlot(newRow);
        if (error) {
            throw new Error(error);
        }



        const updatedRow = { ...newRow, isNew: false };
        console.log(newRow, "newRow");
        console.log(oldRow, "--oldRow");

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.RecordID === newRow.RecordID ? updatedRow : row,
            ),
        );

        console.log(updatedRow, "--updatedRow");

        return updatedRow;
    };
    const handleSaveButtonClick = async (action) => {

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            const error = validateRowSlot(row);

            if (error) {
                toast.error(`${error}`);
                return; // ✅ stops entire save function
            }
        }

        const idata = rows.map((row, index) => {
            return {
                RecordID: row.isNew ? 0 : row.RecordID,
                CompanyID: CompanyID,
                Code: row.SlotCode,
                SlotName: row.SlotName,
                Comments: row.Comments,
                FromTime: formatTo12Hour(row.FromTime),
                ToTime: formatTo12Hour(row.ToTime),
                Break: row.Break ? "Y" : "N",
                SortOrder: 0,
                IsEditable: !isNaN(parseInt(row.RecordID, 10)) ? "Y" : "N"



            };
        });
        console.log(idata, "--print the idata");

        // return;
        try {
            const response = await dispatch(
                postData({
                    accessID: "TR334",
                    action: "insert",
                    idata: idata,
                }),
            );

            // Check response status for success
            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                const data = await dispatch(
                    slotListView({
                        accessID: "TR334",
                        screenName: "Slot",
                        filter: `CompanyID = ${CompanyID}`,
                        any: "",
                    }),
                );
                console.log("🚀 ~ screenChange ~ data:", data);
                if (data.payload.Status == "Y") {
                    const resData = data.payload.Data.rows.map((value) => {
                        return {
                            ...value,
                            Break: value.Break === "Y"   // convert to boolean

                        };
                    });
                    setRows(resData);

                } else {
                    setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
                }
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Error occurred during save.");
        }
    };
    //TERMS COLUMNS
    const Termscolumns = [
        {
            field: "SLNO",
            headerName: "SL#",
            width: 50,
            align: "right",
            headerAlign: "center",
            hide: false,
            sortable: false,

        },
        {
            headerName: "RecordID",
            field: "RecordID",
            width: 100,
            align: "left",
            headerAlign: "center",
            hide: true,
        },
        {
            headerName: "Code",
            field: "Code",
            width: 150,
            hide: false,
            editable: true,
            headerAlign: "center",
            renderCell: (params) => {
                // show "Auto Code" only for new rows OR empty code
                if (!params.value || params.row.isNew) {
                    return "Auto Code";
                }

                return params.value;
            }
        },
        // {
        //   field: "Code",
        //   headerName: "Code",
        //   width: 150,
        //   align: "left",
        //   headerAlign: "center",
        //   editable: false,
        //   // sortable: false,
        // },
        {
            field: "TermsName",
            headerName: (
                <span>
                    Terms Name <span style={{ color: "red" }}>*</span>
                </span>
            ),

            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
        },
        {

            headerName: (
                <span>
                    From Date <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "FromDate", // ✅ match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            renderCell: (params) => params.value || "",
            renderEditCell: (params) => {
                return <EditfromDateCell {...params} />;
            },
        },
        {

            headerName: (
                <span>
                    To Date <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "ToDate", // ✅ match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            renderCell: (params) => params.value || "",
            renderEditCell: (params) => {
                return <EditfromDateCell {...params} />;
            },
        },
        // STD Lookup
        {
            field: "StandardID",
            headerName: "StandardID",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,

        },
        {
            field: "StandardCode",
            headerName: "StandardCode",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,
        },
        {
            field: "StandardName",
            headerName: (
                <span>
                    Standard Name <span style={{ color: "red" }}>*</span>
                </span>
            ),

            width: 250,
            align: "left",
            headerAlign: "center",
            editable: true,

            sortable: false,   // ✅ add this
            renderCell: (params) => {
                console.log("StandardName params:", params);
                console.log("StandardName params value:", params.value);
                if (Array.isArray(params.value)) {
                    return params.value.map((v) => v.Name).join(", ");
                }
                return params.value?.Name || "";
            },
            renderEditCell: (params) => {
                return <STDEditAutocompleteCell {...params} />;
            },
        },
        {
            field: "SlotID",
            headerName: "SlotID",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,
        },
        {
            field: "SlotCode",
            headerName: "SlotCode",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,
        },
        {
            field: "SlotName",
            // headerName: "Slot Name",
            headerName: (
                <span>
                    Slot Name <span style={{ color: "red" }}>*</span>
                </span>
            ),
            width: 350,
            hide: false,
            editable: true,
            headerAlign: "center",
            sortable: false,
            //    renderCell: (params) => {
            //   return params.value?.Name || ""; // show only the name
            // },
            renderCell: (params) => {
                console.log("SlotName params:", params);
                console.log("SlotName params value:", params.value);
                if (Array.isArray(params.value)) {
                    return params.value.map((v) => v.Name).join(", ");
                }
                return params.value?.Name || "";
            },
            renderEditCell: (params) => {
                return <SLOTEditAutocompleteCell {...params} />;
            },

        },
        {
            field: "BreakSlotID",
            headerName: "BreakSlotID",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,
        },
        {
            field: "BreakSlotCode",
            headerName: "BreakSlotCode",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: false,
            hide: true,
        },
        {
            field: "BreakSlotName",
            headerName: "Break Slots",
            width: 350,
            align: "left",
            headerAlign: "center",
            editable: true,
            renderCell: (params) => {
                console.log("BreakSlotName params:", params);
                if (Array.isArray(params.value)) {
                    return params.value.map((v) => v.Name).join(", ");
                }
                return params.value?.Name || "";
            },
            renderEditCell: (params) => {
                return <BREAKSLOTEditAutocompleteCell {...params} />;
            },
        },

        {
            field: "Comments",
            headerName: "Comments",
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            type: "text",
        },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = termsRowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{ color: "primary.main" }}
                            onClick={handleSaveTermsClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelTermsClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditTermsClick(id)}   // ✅ FIX
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteTermsClick(id)} // also add this
                        color="inherit"
                    />,
                ];
            }
        },
    ];
    const handleRowEditTermsStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditTermsClick = (RecordID) => () => {
        setTermsRowModesModel({
            ...termsRowModesModel,
            [RecordID]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveTermsClick = (RecordID) => () => {
        setTermsRowModesModel({
            ...termsRowModesModel,
            [RecordID]: { mode: GridRowModes.View },
        });
    };


    const handleDeleteTermsClick = (RecordID) => async () => {
        setTermsRows(rows.filter((row) => row.RecordID !== RecordID));

        if (!isNaN(RecordID)) {
            const idata = {
                //RecordID: recID,
                RecordID: RecordID,
            };

            const response = await dispatch(
                postData({
                    accessID: "TR355",
                    action: "harddelete",
                    idata: idata,
                }),
            );

            if (response.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                const data = await dispatch(companyTermsGet({ CompanyID: CompanyID }));
                console.log("🚀 ~ screenChangeTerms ~ data:", data);

                if (data.payload.Status === "Y") {
                    console.log(data.payload.Data, "--data.payload.Data");

                    const resData = data.payload.Data.map((value) => ({
                        ...value,
                        // Break: value.Break === "Y", // ✅ Convert Y/N → boolean
                    }));

                    setTermsRows(resData);
                } else {
                    setTermsRows([]);
                }


            } else {
                toast.error(response.payload?.Msg || "Operation failed");
            }
        }
    };

    const handleCancelTermsClick = (RecordID) => () => {
        setTermsRowModesModel({
            ...termsRowModesModel,
            [RecordID]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRowTerms = rows.find((row) => row.RecordID === RecordID);
        if (editedRowTerms.isNew) {
            setTermsRows(rows.filter((row) => row.RecordID !== RecordID));
        }
    };

    const validateRowTerms = (row) => {
        if (!row.TermsName) {
            return "Terms Name is required";
        }

        if (!row.FromDate) {
            return "From Date is required";
        }

        if (!row.ToDate) {
            return "To Date is required";
        }

        const isEmptyArrayOrValue = (val) => {
            if (!val) return true;
            if (Array.isArray(val)) return val.length === 0;
            if (typeof val === "object") return !val.RecordID;
            return false;
        };

        if (isEmptyArrayOrValue(row.StandardName)) {
            return "Standard Name is required";
        }

        if (isEmptyArrayOrValue(row.SlotName)) {
            return "Slot Name is required";
        }

        return null;
    };
    const processRowUpdateTerms = (newRow, oldRow) => {
        console.log(newRow, "--procesrowupdateterms newrow");

        //validation
        const error = validateRowTerms(newRow);
        if (error) {
            throw new Error(error);
        }
        //  setIsRowEditedTerms(true); // ✅ mark that editing happened



        const updatedRow = { ...newRow, isNew: false };
        console.log(newRow, "newRow");
        console.log(oldRow, "--oldRow");

        setTermsRows((prevRows) =>
            prevRows.map((row) =>
                row.RecordID === newRow.RecordID ? updatedRow : row,
            ),
        );

        console.log(updatedRow, "--updatedRow");

        return updatedRow;
    };



    const handleRowModesModelChangeTerms = (newRowModesModel) => {
        setTermsRowModesModel(newRowModesModel);
    };
    const formatDate = (date) => {
        if (!date) return "";

        const d = new Date(date);

        if (isNaN(d.getTime())) {
            // Handle DD-MM-YYYY manually
            const parts = date.split("-");
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            return "";
        }

        return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };
    const handleSaveButtonClickTerms = async (action) => {
        console.log(termsrows, "--termsrows");
        for (let index = 0; index < termsrows.length; index++) {
            const row = termsrows[index];
            const error = validateRowTerms(row);

            if (error) {
                toast.error(`${error}`);
                return; // ✅ stops entire save function
            }
        }

        const idata = termsrows.map((row) => {
            const slotIDs = Array.isArray(row.SlotName)
                ? row.SlotName.map((v) => v.RecordID).join(",")
                : row.SlotID || "";

            const breakSlotIDs = Array.isArray(row.BreakSlotName)
                ? row.BreakSlotName.map((v) => v.RecordID).join(",")
                : row.BreakSlotID || "";

            const standardID = Array.isArray(row.StandardName)
                ? row.StandardName.map((v) => v.RecordID).join(",")
                : row.StandardID || "";

            return {
                RecordID: row.isNew ? 0 : row.RecordID,
                CompanyID: CompanyID,
                Code: row.Code,
                TermsName: row.TermsName,
                Comments: row.Comments,
                FromDate: formatDate(row.FromDate),
                ToDate: formatDate(row.ToDate),
                SlotID: slotIDs,
                BreakSlotID: breakSlotIDs,
                StandardID: standardID,
                IsEditable: !isNaN(parseInt(row.RecordID, 10)) ? "Y" : "N",
            };
        });

        console.log(idata, "--print the idata");

        try {
            const response = await dispatch(
                postData({
                    accessID: "TR355",
                    action: "insert",
                    idata,
                })
            );

            if (response?.payload?.Status === "Y") {
                toast.success(response.payload.Msg);

                const data = await dispatch(companyTermsGet({ CompanyID: CompanyID }));

                if (data?.payload?.Status === "Y") {
                    // setTermsRows(data.payload.Data.rows);
                } else {
                    setTermsRows([]);
                }
            } else {
                toast.error(response?.payload?.Msg || "Save failed");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Error occurred during save.");
        }
    };
    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = nanoid();
            const nextSLNO =
                rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
            setRows((oldRows) => [
                ...oldRows,
                {
                    RecordID: id, // Temporary ID, replaced after backend save
                    SLNO: nextSLNO,
                    SlotCode: "",
                    SlotName: "",
                    FromTime: "",
                    ToTime: "",
                    Comments: "",
                    Break: false,
                    isNew: true,

                },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "SlotCode" },
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

    function EditToolbarTerms(props) {
        const { setTermsRows, setTermsRowModesModel } = props;

        const handleClickTerms = () => {
            const id = nanoid();

            const nextSLNO =
                termsrows.length > 0
                    ? Math.max(...termsrows.map((row) => Number(row.SLNO) || 0)) + 1
                    : 1;

            const newRow = {
                RecordID: id,
                SLNO: nextSLNO,
                Code: "",
                TermsName: "",
                FromDate: "",
                ToDate: "",

                StandardID: "",
                StandardCode: "",
                StandardName: [],

                SlotID: "",
                SlotCode: "",
                SlotName: [],

                BreakSlotID: "",
                BreakSlotCode: "",
                BreakSlotName: [],

                Comments: "",
                isNew: true,
            };

            setTermsRows((oldRows) => [...oldRows, newRow]);

            setTermsRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "Code" },
            }));
        };

        return (
            <GridToolbarContainer sx={{ marginBottom: "10px" }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClickTerms}>
                    Add Record
                </Button>
            </GridToolbarContainer>
        );
    }
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
                    //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
                    navigate("/Apps/HR");
                }
            } else {
                return;
            }
        });
    };
    const screenChange = async (event) => {
        setScreen(event.target.value);
        if (event.target.value == "0") {
            console.log(event.target.value, "--find event.target.value");

            if (mode === "E") {
                dispatch(getFetchData({ accessID, get: "get", CompanyID: CompanyID }));
            } else {
                dispatch(getFetchData({ accessID, get: "", CompanyID: CompanyID }));
            }
        }
        if (event.target.value == "1") {
            if (mode === "E") {
                dispatch(PolicyFetchData({ get: "get", CompanyID: CompanyID }));

                const data = await dispatch(
                    slotListView({
                        accessID: "TR334",
                        screenName: "Slot",
                        filter: `CompanyID = ${CompanyID}`,
                        any: "",
                    })
                );

                if (data.payload.Status === "Y") {
                    const resData = data.payload.Data.rows.map((value) => {
                        return {
                            ...value,
                            Break: value.Break === "Y", // ✅ convert Y/N → true/false
                        };
                    });

                    setRows(resData);
                } else {
                    setRows([]);
                }
            } else {
                dispatch(PolicyFetchData({ get: "", CompanyID }));
            }
        }
        if (event.target.value == "2") {
            if (CompanyID && mode === "E") {
                dispatch(PolicyFetchData({ get: "get", CompanyID: CompanyID }));
                 dispatch(companyTermsGet({ CompanyID: CompanyID }));
                // const data = await dispatch(
                //   slotListView({
                //     accessID: "TR355",
                //     screenName: "Terms",
                //     filter: `CompanyID = ${CompanyID}`,
                //     any: "",
                //   }),
                // );
                // console.log(rows, "--finding rows inside ScreenChange");

                // setRows(slotRowData);
                console.log("🚀 ~ screenChange ~ data:", data);
            } else {
                dispatch(PolicyFetchData({ get: "get", CompanyID }));
                 dispatch(companyTermsGet({ CompanyID: CompanyID }));
            }
        }
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const style = {
        height: "55px",
        borderBottom: "2px solid #1769aa ",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
    };
    const initialvalues = {
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
        subscriptionStartDate: data.SBS_STARTDATE,
        subscriptionperiod: data.SBS_NOOFMONTH,
        retainDate: data.SBS_RETAINDATE,
        subscriptionEndDate: data.SBS_ENDDATE,
        notificationDate: data.SBS_NOTIFICATIONDATE,
        noofusers: data.CM_NOOFUSER,
        noofemployee: data.CM_NOOFEMP,
        address: data.CM_ADDRESS,
        gstnumber: data.CM_GST,
        sessiontime: data.CM_SESSIONTIMEOUT,
        gracetime: data.CM_GRACETIME,
        // address: data?.address || "", // Set default value if data.address is undefined
        // gstnumber: data?.gstnumber || "",
        logoimage: data.CM_IMAGE,
        GstImg: data.CM_GSTIMAGE,
        // checkbox: data.CM_AUTOCODE === "Y" ? "Y" : "N",

    };
    console.log(data.CM_IMAGE, "logo");
    console.log(data.CM_GSTIMAGE, "GST");
    // const [value, setValues] = React.useState({
    //     showPassword: false,
    // });
    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...value,
    //         showPassword: !value.showPassword,
    //     });
    // };


    //settings password save 
    const fnSave = async (values) => {
        // let action = mode === "A" ? "insert" : "update";
        // let action =
        // mode === "A" && !del
        //   ? "insert"
        //   : mode === "E" && del
        //   ? "harddelete"
        //   : "update";
        //let action = "update";

        const idata = {
            action: "update",
            CompanyRecordID: compID,
            Address: offaddress,
            GstNo: gst,
            Image: logoimage,
            GstImage: gstImage,
            AutoCode: autocode ? "Y" : "N",
            HeaderImg: data.CM_HEADER,
            FooterImg: data.CM_FOOTER,
            CompanyName: data.CM_NAME,
            GraceTime: gracetime || 15,
            SessionTimeOut: sessiontime || 600

        };
        console.log(offaddress, "Address");
        console.log(gst, "gst");
        const response = await dispatch(CompanydetailpostData({ idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate("/Apps/configuration");
        } else {
            toast.error(response.payload.Msg);
        }
    };
    const PolicyInitialValue = {
        code: PolicyData.Code || "",
        name: PolicyData.Name || "",
        noofpermhrs: PolicyData.PerNumberOfHours || "",
        noofpermpermonth: PolicyData.PerNumberOfMonth || "",
        lossofpayrate: PolicyData.PerLossOfPayRate || "",
        freeormonth: PolicyData.IrFreeMonth || "",
        lossofpayrate2: PolicyData.IrLossOfPayRate || "",
        salryrateorday: PolicyData.OtSalaryRatePerDay || "",
    };

    const Policysave = async (values, del) => {
        setLoading(true);

        let action =
            mode === "A" && !del
                ? "insert"
                : mode === "E" && del
                    ? "harddelete"
                    : "update";

        const idata = {
            action: "update",
            RecordID: CompanyID,
            PerNumberOfHours: values.noofpermhrs,
            PerNumberOfMonth: values.noofpermpermonth,
            PerLossOfPayRate: values.lossofpayrate,
            IrFreeMonth: values.freeormonth,
            IrLossOfPayRate: values.lossofpayrate2,
            OtSalaryRatePerDay: values.salryrateorday,
        };

        try {
            const response = await dispatch(PolicyUpdateData({ idata }));

            if (response.payload.Status === "Y") {
                toast.success(response.payload.Msg);
                // navigate("/Apps/TR243/Party");
                setScreen("3");
            } else {
                toast.error(response.payload.Msg);
            }
        } catch (error) {
            toast.error("An error occurred while saving data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>

            {/* <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
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
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                variant="h5"

                            >
                                Company Configuration
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
            </Paper> */}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Box
                        display="flex"
                        borderRadius="3px"
                        alignItems={"center"}
                        justifyContent="space-between"
                    >
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
                            <Typography variant="h5" color="#0000D1"
                                onClick={() => navigate(-1)}
                            >
                                Company Configuration
                            </Typography>
                            {show == "1" ? (
                                <Typography variant="h5" color="#0000D1">Slots</Typography>
                            ) : null}
                            {show == "2" ? (
                                <Typography variant="h5" color="#0000D1">Terms</Typography>
                            ) : null}

                        </Breadcrumbs>
                    </Box>

                    <Box display="flex">
                        {mode !== "A" ? (
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Explore</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={show}
                                    label="Explore"
                                    onChange={screenChange}
                                >
                                    <MenuItem value={0}>Company</MenuItem>
                                    <MenuItem value={1}>Slot</MenuItem>
                                    <MenuItem value={2}>Terms</MenuItem>
                                </Select>
                            </FormControl>
                        ) : (
                            false
                        )}
                        <Tooltip title="Close">
                            <IconButton onClick={() => fnLogOut("Close")} color="error">
                                <ResetTvIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Logout">
                            <IconButton onClick={() => fnLogOut("Logout")} color="error">
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
            {show == "0" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={initialvalues}
                        // onSubmit={(values, setSubmitting, resetForm) => {
                        //     setTimeout(() => {
                        //         fnSave(values);
                        //         resetForm(); // Reset form after submission
                        //     }, 100);
                        // }}
                        // onSubmit={(values, setSubmitting) => {
                        //     setTimeout(() => {
                        //         fnSave(values);
                        //     }, 100);
                        // }}
                        validationSchema={Settingsvalidation}
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
                            setFieldTouched,
                            resetForm
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <Typography variant="h5" padding={1}>Subscriptions:</Typography>

                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(4, minMax(0, 1fr))"
                                    gap={formGap}
                                    padding={1}
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 4", // Adjust for mobile view
                                        },
                                    }}
                                >
                                    <FormControl
                                        fullWidth
                                        sx={{ gridColumn: "span 2", gap: formGap }}
                                    >
                                        <TextField
                                            name="subscriptionStartDate"
                                            type="date"
                                            id="subscriptionStartDate"
                                            label="Subscription Start Date"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => handleChangesub(e, Setsubfromdate)}
                                            // value={subfromdate}

                                            value={values.subscriptionStartDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionPeriod && !!errors.subscriptionPeriod}
                                            // helperText={touched.subscriptionPeriod && errors.subscriptionPeriod}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />

                                        <TextField
                                            name="subscriptionperiod"
                                            type="number"
                                            id="subscriptionperiod"
                                            label="Subscription Period (in months)"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.subscriptionperiod}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionperiod && !!errors.subscriptionperiod}
                                            // helperText={touched.subscriptionperiod && errors.subscriptionperiod}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="retainDate"
                                            type="date"
                                            id="retainDate"
                                            label="Retain Date"
                                            variant="standard"
                                            focused
                                            value={values.retainDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.retainDate && !!errors.retainDate}
                                            // helperText={touched.retainDate && errors.retainDate}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="noofusers"
                                            type="number"
                                            id="noofusers"
                                            label="No of Users"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.noofusers}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.noofusers && !!errors.noofusers}
                                            // helperText={touched.noofusers && errors.noofusers}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />
                                        <TextField
                                            name="gracetime"
                                            type="number"
                                            id="gracetime"
                                            label="Grace Time"
                                            variant="standard"
                                            focused
                                            // value={values.gracetime}
                                            value={gracetime}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setGracetime(e.target.value)
                                                sessionStorage.setItem("gracetime", e.target.value);
                                            }}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />


                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        sx={{ gridColumn: "span 2", gap: formGap }}
                                    >
                                        <TextField
                                            name="subscriptionEndDate"
                                            type="date"
                                            id="subscriptionEndDate"
                                            label="Subscription End Date"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => handleChangesub(e, SetsubEnddate)}
                                            // value={subEnddate}

                                            value={values.subscriptionEndDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.subscriptionEndDate && !!errors.subscriptionEndDate}
                                            // helperText={touched.subscriptionEndDate && errors.subscriptionEndDate}
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />

                                        <TextField
                                            name="notificationDate"
                                            type="date"
                                            id="notificationDate"
                                            label="Notification Date"
                                            variant="standard"
                                            focused
                                            value={values.notificationDate}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={
                                            //   !!touched.notificationDate && !!errors.notificationDate
                                            // }
                                            // helperText={
                                            //   touched.notificationDate && errors.notificationDate
                                            // }
                                            autoFocus
                                            inputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            name="noofemployee"
                                            type="number"
                                            id="noofemployee"
                                            label="No of Personnel"
                                            variant="standard"
                                            focused
                                            // onChange={(e) => SubPeriodOnchange(e, Setsubperiod)}
                                            // value={subperiod}

                                            value={values.noofemployee}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                            // error={!!touched.noofemployee && !!errors.noofemployee}
                                            // helperText={touched.noofemployee && errors.noofemployee}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />
                                        <TextField
                                            name="sessiontime"
                                            type="number"
                                            id="sessiontime"
                                            label="Session Time"
                                            variant="standard"
                                            focused
                                            // value={values.sessiontime}
                                            value={sessiontime}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setSessiontime(e.target.value)
                                                sessionStorage.setItem("sessiontime", e.target.value);
                                            }}
                                            autoFocus
                                            sx={{
                                                gridColumn: "span 2",
                                                background: "",
                                                input: { textAlign: "right" },

                                            }}

                                        />


                                    </FormControl>
                                </Box>


                                <Divider variant="fullWidth" sx={{ mt: "20px" }} />
                                <Typography variant="h5" padding={1}>Company Details:</Typography>

                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    gap={formGap}
                                    padding={1}
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 4",
                                        },
                                    }}
                                >
                                    <FormControl fullWidth sx={{ gridColumn: "span 2", gap: formGap }}>
                                        {/* <TextField
                                            name="address"
                                            type="text"
                                            id="address"
                                            label="Office Address"
                                            variant="standard"
                                            multiline
                                            rows={3}
                                            focused
                                            value={values.address}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.address && !!errors.address}
                                            helperText={touched.address && errors.address}
                                            autoFocus
                                        /> */}
                                        <TextField
                                            name="address"
                                            type="text"
                                            id="address"
                                            label="Office Address"
                                            variant="standard"
                                            multiline
                                            rows={3}
                                            focused
                                            value={offaddress}
                                            onChange={(e) => setOffaddress(e.target.value)}
                                            autoFocus
                                        />


                                        {/* <TextField
                                            name="gstnumber"
                                            label="GST Number"
                                            variant="standard"
                                            focused
                                            value={values.gstnumber}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                const input = e.target.value.toUpperCase();
                                                if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                                    handleChange({
                                                        target: {
                                                            name: "gstnumber",
                                                            value: input,
                                                        },
                                                    });
                                                }
                                            }}
                                            error={!!touched.gstnumber && !!errors.gstnumber}
                                            helperText={touched.gstnumber && errors.gstnumber}
                                            sx={{ backgroundColor: "#ffffff" }}
                                        /> */}
                                        <TextField
                                            name="gstnumber"
                                            label="GST Number"
                                            variant="standard"
                                            focused
                                            value={gst}
                                            onChange={(e) => {
                                                const input = e.target.value.toUpperCase();
                                                if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                                    setGst(input);
                                                }
                                            }}
                                            sx={{ backgroundColor: "#ffffff" }}
                                        />

                                    </FormControl>
                                    <Box>
                                        {/* <Checkbox
                                            checked={autocode}
                                            onChange={(e) => setAutocode(e.target.checked)}
                                            id="checkbox"
                                            name="checkbox"
                                        />
                                        <FormLabel htmlFor="checkbox" focused={false}>
                                            Autocode
                                        </FormLabel> */}
                                        <Checkbox
                                            checked={autocode}
                                            onChange={handleAutocodeChange}
                                            id="checkbox"
                                            name="checkbox"
                                        />
                                        <FormLabel htmlFor="checkbox" focused={false}>
                                            Autocode
                                        </FormLabel>

                                    </Box>
                                </Box>

                                <Box
                                    display="flex"
                                    padding={1}
                                    justifyContent="end"
                                    mt="20px"
                                    gap="20px"
                                >
                                    {/* <Box display="flex" alignItems="center" gap={formGap}> */}
                                    <Tooltip title="Upload Logo">
                                        <IconButton
                                            size="small"
                                            color="warning"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="all/*"
                                                type="file"
                                                onChange={getFilepanChange}
                                            />
                                            <PictureAsPdfOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        component={"a"}
                                        onClick={() => {
                                            data.logoimage || logoimage
                                                ? window.open(
                                                    logoimage
                                                        ? store.getState().globalurl.attachmentUrl +
                                                        logoimage
                                                        : store.getState().globalurl.attachmentUrl +
                                                        data.logoimage,
                                                    "_blank"
                                                )
                                                : toast.error("Please Upload File");
                                        }}
                                    >
                                        View Logo
                                    </Button>
                                    <Tooltip title="Upload GST">
                                        <IconButton
                                            size="small"
                                            color="warning"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="all/*"
                                                type="file"
                                                onChange={getFilegstChange}
                                            />
                                            <PictureAsPdfOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        component={"a"}
                                        onClick={() => {
                                            data.GstImg || gstImage
                                                ? window.open(
                                                    gstImage
                                                        ? store.getState().globalurl.attachmentUrl +
                                                        gstImage
                                                        : store.getState().globalurl.attachmentUrl +
                                                        data.GstImg,
                                                    "_blank"
                                                )
                                                : toast.error("Please Upload File");
                                        }}
                                    >
                                        View GST
                                    </Button>
                                    {/* <IconButton
                      size="large"
                      color="warning"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="all/*"
                        type="file"
                        onChange={getFilegstChange}
                      />
                      <PictureAsPdfOutlinedIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      component={"a"}
                      onClick={() => {
                       data.GstImg || gstImage
                          ? window.open(
                            gstImage
                              ? store.getState().globalurl.attachmentUrl +
                              gstImage
                              : store.getState().globalurl.attachmentUrl +
                             data.GstImg,
                            "_blank"
                          )
                          : toast.error("Please Upload File");
                      }}
                    >
                      View
                    </Button> */}

                                    <LoadingButton
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        loading={isLoading}
                                        onClick={fnSave}
                                    >
                                        Save
                                    </LoadingButton>



                                    <Button
                                        color={"warning"}
                                        variant="contained"
                                        onClick={() => resetForm()}
                                    // onClick={() => {
                                    //   navigate("/Apps/TR213/LeaveType");
                                    // }}
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
            {show == "1" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={PolicyInitialValue}
                        onSubmit={(values, setSubmitting) => {
                            // setTimeout(() => {
                            //   Policysave(values);
                            // }, 100);
                        }}
                        // validationSchema={PolicyValidationSchema}
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
                                        label={<>Code</>}
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
                                        InputProps={{
                                            inputProps: {
                                                readOnly: true,
                                            },
                                        }}
                                        autoFocus
                                    />
                                    {/* )} */}
                                    <TextField
                                        name="name"
                                        type="text"
                                        id="name"
                                        label={<>Name</>}
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
                                        InputProps={{
                                            inputProps: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </Box>

                                <Box
                                    m="5px 0 0 0"
                                    height={dataGridHeight}
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
                                        rowHeight={dataGridRowHeight}
                                        headerHeight={dataGridHeaderFooterHeight}
                                        rows={rows}
                                        columns={columns}
                                        loading={exploreLoading}
                                        editMode="row"
                                        disableSelectionOnClick
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={handleRowModesModelChange}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}
                                        getRowId={(row) => row.RecordID}
                                        isCellEditable={(params) => {
                                            if (params.field === "SlotCode") return false;
                                            return true;
                                        }}
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
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        onPageChange={(newPage) => setPage(newPage)}
                                    />
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    padding={1}
                                    gap="20px"
                                >
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleSaveButtonClick}
                                    >
                                        Save
                                    </Button>

                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => {
                                            setScreen(0);
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

            {show == "2" ? (
                <Paper elevation={3} sx={{ margin: "10px" }}>
                    <Formik
                        initialValues={PolicyInitialValue}
                        onSubmit={(values, setSubmitting) => {
                            // setTimeout(() => {
                            //   Policysave(values);
                            // }, 100);
                        }}
                        // validationSchema={PolicyValidationSchema}
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
                                        label={<>Code</>}
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
                                        InputProps={{
                                            inputProps: {
                                                readOnly: true,
                                            },
                                        }}
                                        autoFocus
                                    />
                                    {/* )} */}
                                    <TextField
                                        name="name"
                                        type="text"
                                        id="name"
                                        label={<>Name</>}
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
                                        InputProps={{
                                            inputProps: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </Box>

                                <Box
                                    m="5px 0 0 0"
                                    height={dataGridHeight}
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
                                        rowHeight={dataGridRowHeight}
                                        headerHeight={dataGridHeaderFooterHeight}
                                        rows={termsrows}
                                        columns={Termscolumns}
                                        loading={exploreLoading}
                                        editMode="row"
                                        disableSelectionOnClick
                                        rowModesModel={termsRowModesModel}
                                        onRowModesModelChange={handleRowModesModelChangeTerms}
                                        onRowEditStop={handleRowEditTermsStop}
                                        processRowUpdate={processRowUpdateTerms}
                                        getRowId={(row) => row.RecordID}
                                        isCellEditable={(params) => {
                                            if (params.field === "Code") return false;
                                            return true;
                                        }}
                                        disableRowSelectionOnClick
                                        experimentalFeatures={{ newEditingApi: true }}
                                        onProcessRowUpdateError={(error) => {
                                            console.error("Row update validation failed:", error.message,);
                                            toast.error(error.message);
                                        }}
                                        components={{
                                            Toolbar: EditToolbarTerms,
                                        }}
                                        componentsProps={{
                                            toolbar: { setTermsRows, setTermsRowModesModel },
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
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        onPageChange={(newPage) => setPage(newPage)}
                                    />
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    padding={1}
                                    gap="20px"
                                >
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleSaveButtonClickTerms}
                                    >
                                        Save
                                    </Button>

                                    <Button
                                        color="warning"
                                        variant="contained"
                                        onClick={() => {
                                            setScreen(0);
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
            {/* </Box> */}
        </React.Fragment>
    );
};
export default Configuration;
