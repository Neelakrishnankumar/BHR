import {
    TextField,
    Box,
    useTheme,
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
import { nanoid } from "@reduxjs/toolkit";
import {
    CustomisedCaptionGet,
    fetchApidata,
    getFetchData,
    postApidata,
    postData,
    SlotGetfunction,
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
import { CheckinAutocomplete, Productautocomplete, STDMultiFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridHeightExplore, dataGridRowHeight } from "../../../ui-components/utils";
import { slotListView } from "../../../store/reducers/Explorelitviewapireducer";
import { tokens } from "../../../Theme";

// import CryptoJS from "crypto-js";
const EditSlots = () => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
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
    console.log(state, "find state in console");
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
                    name: Yup.string().required(data.Slot.Description).nullable(),
                    fromtime: Yup.string().required(data.Slot.FromTime).nullable(),
                    totime: Yup.string().nullable().required(data.Slot.ToTime),
                };

                if (CompanyAutoCode === "N") {
                    schemaFields.code = Yup.string().trim().required(data.Slot.code);
                }

                const schema = Yup.object().shape(schemaFields);
                setValidationSchema(schema);
            })
            .catch((err) => console.error("Error loading validationcms.json:", err));
    }, []);

    useEffect(() => {
        dispatch(SlotGetfunction({ GroupID: recID }));
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


    // SLOT SECTION
    const exploreLoading = useSelector((state) => state.formApi.slotLoading);
    const topslot = useSelector((state) => state.formApi.slotgetData);
    const slotRowDataheader = useSelector((state) => state.formApi.slotgetData.Header);
    console.log(slotRowDataheader, "--slotRowDataheader");

    const slotRowData = useSelector((state) => state.formApi.slotgetData.Detail);
    console.log(slotRowData, "--slotRowData");


    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = useState(15);
    const lookuplistViewurl = useSelector((state) => state.globalurl.listViewurl);

    useEffect(() => {
        if (!slotRowData) return;

        const formattedData = slotRowData.map((row) => ({
            ...row,
            Break: row.Break === "Y", //  FIX HERE
        }));

        setRows(formattedData);
    }, [slotRowData]);
    //   useEffect(() => {
    //       setRows(slotRowData || []);
    //   }, [slotRowData]);


    //   function EditTimeCell(props) {
    //     const { id, field, value, api } = props;

    //     const convertTo24Hour = (time12h) => {
    //         if (!time12h) return "";

    //         const [time, modifier] = time12h.split(" ");
    //         let [hours, minutes] = time.split(":");

    //         if (modifier === "PM" && hours !== "12") {
    //             hours = String(parseInt(hours, 10) + 12);
    //         }
    //         if (modifier === "AM" && hours === "12") {
    //             hours = "00";
    //         }

    //         return `${hours.padStart(2, "0")}:${minutes}`;
    //     };

    //     const convertTo12Hour = (time24) => {
    //         if (!time24) return "";

    //         const [hour, minute] = time24.split(":");
    //         let h = parseInt(hour);
    //         const ampm = h >= 12 ? "PM" : "AM";

    //         h = h % 12 || 12;

    //         return `${h}:${minute} ${ampm}`;
    //     };

    //     const handleChange = (event) => {
    //         const val24 = event.target.value; // 16:30
    //         const val12 = convertTo12Hour(val24); // 4:30 PM

    //         api.setEditCellValue({ id, field, value: val12 });
    //     };

    //     return (
    //         <TextField
    //             type="time"
    //             fullWidth
    //             size="small"
    //             value={convertTo24Hour(value)} // show correct time in picker
    //             onChange={handleChange}
    //         />
    //     );
    // }
    const EditTimeCell = (props) => {
        const { id, field, value, api, row } = props;

        const handleChange = (e) => {
            const newValue = e.target.value;

            api.setEditCellValue({ id, field, value: newValue });
        };

        return (
            <input
                type="time"
                value={value || ""}
                min={field === "ToTime" ? row.FromTime || "" : undefined} // KEY LINE
                onChange={handleChange}
                style={{ width: "100%" }}
            />
        );
    };
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

    // const handleSaveClick = (RecordID) => () => {
    //     setRowModesModel({
    //         ...rowModesModel,
    //         [RecordID]: { mode: GridRowModes.View },
    //     });
    // };

    const handleDeleteClick = (RecordID) => async () => {
        setRows(rows.filter((row) => row.RecordID !== RecordID));

        if (!isNaN(RecordID)) {
            const idata = {
                //RecordID: recID,
                RecordID: RecordID,
                CompanyID
            };

            const response = await dispatch(
                postData({
                    accessID: "TR377",
                    action: "harddelete",
                    idata: idata,
                }),
            );

            if (response.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
                dispatch(SlotGetfunction({ GroupID: recID }));
                console.log("🚀 ~ screenChange ~ data:", data);


                if (data.payload.Status === "Y") {
                    const resData = data.payload.Data.rows.map((value) => ({
                        ...value,
                        Break: value.Break === "Y", //  Convert Y/N → boolean
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

    //  Convert 12hr → 24hr
    // const convertTo24 = (time12h) => {
    //     if (!time12h) return "";

    //     if (
    //         !time12h.toUpperCase().includes("AM") &&
    //         !time12h.toUpperCase().includes("PM")
    //     ) {
    //         return time12h;
    //     }

    //     const [time, modifier] = time12h.split(" ");
    //     let [hours, minutes] = time.split(":");

    //     if (modifier === "PM" && hours !== "12") {
    //         hours = String(parseInt(hours, 10) + 12);
    //     }
    //     if (modifier === "AM" && hours === "12") {
    //         hours = "00";
    //     }

    //     return `${hours.padStart(2, "0")}:${minutes}`;
    // };

    //  Convert to minutes (BEST METHOD)
    // const toMinutes = (time) => {
    //     const t = convertTo24(time);
    //     const [h, m] = t.split(":").map(Number);
    //     return h * 60 + m;
    // };
    const toMinutes = (time12h) => {
        if (!time12h) return 0;

        const [time, modifierRaw] = time12h.trim().split(" ");
        const modifier = modifierRaw?.toUpperCase(); // safety

        let [h, m] = time.split(":").map(Number);

        if (modifier === "PM" && h !== 12) {
            h += 12;
        }
        if (modifier === "AM" && h === 12) {
            h = 0;
        }

        return h * 60 + m;
    };

    //  Convert 24 → 12hr
    const convertTo12 = (time24) => {
        if (!time24) return "";

        const [hour, minute] = time24.split(":");
        let h = parseInt(hour);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12 || 12;

        return `${h}:${minute} ${ampm}`;
    };

    const validateRowSlot = (row, rows) => {
        if (!row.SlotName) {
            return "Please Enter the Slot Name";
        }
        if (!row.FromTime) {
            return "Please Select the From Time";
        }
        if (!row.ToTime) {
            return "Please Select the To Time";
        }
        //  Time validation
        const from = new Date(`1970-01-01T${row.FromTime}`);
        const to = new Date(`1970-01-01T${row.ToTime}`);
        // const from = toMinutes(row.FromTime);
        // const to = toMinutes(row.ToTime);

        if (to <= from) {
            return "To Time must be greater than From Time";
        }

        //  OVERLAP CHECK (edge allowed)
        // const isOverlap = rows.some((existingRow) => {
        //     if (existingRow.RecordID === row.RecordID) return false;

        //     const existingFrom = toMinutes(existingRow.FromTime);
        //     const existingTo = toMinutes(existingRow.ToTime);
        //     console.log("existingFrom,",existingFrom)
        //     console.log("existingTo,",existingTo)
        //     console.log("from,",from)
        //     console.log("to,",to)

        //     // return from < existingTo && to > existingFrom;
        //       return (
        //     from <= existingFrom ||   // completely before
        //     to >= existingTo      // completely after
        // );
        // });

        // if (isOverlap) {
        //     return "Time slot overlaps with existing slot";
        // }

        return null;
    };

    // const validateRowSlot = (row) => {
    //     if (!row.SlotName) {
    //         return "Please Enter the Slot Name";
    //     }
    //     if (!row.FromTime) {
    //         return "Please Select the From Time";
    //     }
    //     if (!row.ToTime) {
    //         return "Please Select the To Time";
    //     }

    //     //  Time validation
    //     const from = new Date(`1970-01-01T${row.FromTime}`);
    //     const to = new Date(`1970-01-01T${row.ToTime}`);

    //     if (to <= from) {
    //         return "To Time must be greater than From Time";
    //     }

    //     return null;
    // };
    const formatTo12Hour = (time) => {
        if (!time) return "";

        //  If already formatted (contains AM/PM), return as is
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
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2157","ScreenName":"Standard","Filter":"parentID='${CompanyID}'","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
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
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2148","ScreenName":"Slot Name","Filter":"CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
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
                url={`${lookuplistViewurl}?data={"Query":{"AccessID":"2156","ScreenName":"Slot Break","Filter":"CompanyID='${CompanyID}'","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
            />
        );
    }

    const processRowUpdate = async (newRow, oldRow) => {
        console.log("🚀 processRowUpdate:", newRow);

        //  Validation
        //    const error = validateRowSlot(newRow, rows);

        // if (error) {
        //     throw new Error(error);
        //     // return oldRow; // ❗ DON'T THROW → avoids double toast
        // }
        const error = validateRowSlot(newRow);
        if (error) {

            throw new Error(error);
        }
        const isNew = newRow.isNew;
        //  Prepare payload for API
        const payload = {
            RecordID: isNew ? -1 : newRow.RecordID,   //  KEY FIX
            code: newRow.SlotCode || "",
            name: newRow.SlotName || "",
            comments: newRow.Comments || "",
            fromtime: newRow.FromTime,
            totime: newRow.ToTime,
            Breakslot: newRow.Break || false,
        };

        try {
            //  Call API (Insert / Update handled inside Fnsave)
            await Fnsave(payload, isNew);  //  pass isNew

            //  Update local state after success
            const updatedRow = { ...newRow, isNew: false };

            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.RecordID === newRow.RecordID ? updatedRow : row
                )
            );

            return updatedRow; // important

        } catch (err) {
            console.error("❌ API Save Failed:", err);
            throw err; // 🔥 keeps row in edit mode
        }
    };
    // const processRowUpdate = (newRow, oldRow) => {
    //     console.log(newRow, "--procesrowupdateterms newrow");
    //     //validation
    //     const error = validateRowSlot(newRow);
    //     if (error) {
    //         throw new Error(error);
    //     }



    //     const updatedRow = { ...newRow, isNew: false };
    //     console.log(newRow, "newRow");
    //     console.log(oldRow, "--oldRow");

    //     setRows((prevRows) =>
    //         prevRows.map((row) =>
    //             row.RecordID === newRow.RecordID ? updatedRow : row,
    //         ),
    //     );

    //     console.log(updatedRow, "--updatedRow");

    //     return updatedRow;
    // };

    const handleSaveClick = (id) => () => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: GridRowModes.View },
        }));
    };

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        // const handleClick = () => {
        //     const id = nanoid();
        //     const nextSLNO =
        //         rows.length > 0 ? Math.max(...rows.map((row) => row.SLNO || 0)) + 1 : 1;
        //     setRows((oldRows) => [
        //         ...oldRows,
        //         {
        //             RecordID: id, // Temporary ID, replaced after backend save
        //             SLNO: nextSLNO,
        //             SlotCode: "",
        //             SlotName: "",
        //             FromTime: "",
        //             ToTime: "",
        //             Comments: "",
        //             Break: false,
        //             isNew: true,

        //         },
        //     ]);
        //     setRowModesModel((oldModel) => ({
        //         ...oldModel,
        //         [id]: { mode: GridRowModes.Edit, fieldToFocus: "SlotCode" },
        //     }));
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
            field: "FromTime", //  match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            // renderCell: (params) => params.value || "",
            renderCell: (params) => formatTo12Hour(params.value),
            renderEditCell: (params) => <EditTimeCell {...params} />,
        },
        {
            // headerName: "To Time",
            headerName: (
                <span>
                    To Time <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "ToTime", //  match exact API field
            width: 150,
            align: "left",
            headerAlign: "center",
            editable: true,
            // renderCell: (params) => params.value || "",
            renderCell: (params) => formatTo12Hour(params.value),
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












    const style = {
        height: "55px",
        border: "2px solid #1769aa ",
        borderRadius: "5px",
        backgroundColor: "#EDEDED",
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const InitialValue = {
        // fromtime: mode === "E" ? data.FromTime : "",
        // totime: mode === "E" ? data.ToTime : "",
        // disable: data.Disable === "Y" ? true : false,
        // delete: data.DeleteFlag === "Y" ? true : false,
        // Breakslot: data.BreakCheckbox === "Y" ? true : false,
        // sortorder: mode === "E" ? data.Sortorder : 0,
        name: slotRowDataheader?.GroupName || "",
        code: slotRowDataheader?.GroupCode || "",
        // comments: mode === "E" ? data.Comments : "",
    };

    const Fnsave = async (values, isNew) => {
        const action = isNew ? "insert" : "update";

        const idata = {
            RecordID: isNew ? -1 : values.RecordID,
            CompanyID,
            Code: values.code || "",
            Name: values.name,
            Comments: values.comments || "",
            FromTime: values.fromtime,
            ToTime: values.totime,
            BreakCheckbox: values.Breakslot == true ? "Y" : "N",
            SlotGroupID: recID,
            SortOrder: 0,
            Disable: "N",
            DeleteFlag: "N",

        };
        console.log(idata, "--finding idata in fnsave");

        // return;
        const response = await dispatch(postData({ accessID: "TR377", action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            dispatch(SlotGetfunction({ GroupID: recID }));
            navigate(`/Apps/TR376/Slot%20Group/EditSlot/${recID}/E`, {
                state: {
                    ...state
                }
            })
        } else {
            toast.error(response.payload.Msg);
        }
    };
    const getYearRange = (academicYear) => {
        if (!academicYear) return {};

        const [start, end] = academicYear.split("-");
        const startYear = parseInt(start);
        const endYear = parseInt("20" + end); // convert 26 → 2026

        return {
            minDate: `${startYear}-01-01`,
            maxDate: `${endYear}-12-31`,
        };
    };

    const { minDate, maxDate } = getYearRange(state.AcademicYear);
    console.log(minDate, maxDate, state.AcademicYear, "minmaxdate");
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
                    //navigate(`/Apps/Secondarylistview/TR123/Check%20In/${params.parentID}`)
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
                                    navigate(`/Apps/TR376/Slot%20Group`)
                                    // navigate(-1);
                                }}
                            >
                                Slot Group({state.SlotGroupName})
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                            // onClick={() => {
                            //     navigate(-1);
                            // }}
                            >
                                Slot
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
                        // onSubmit={(values, setSubmitting) => {
                        //     setTimeout(() => {
                        //         Fnsave(values);
                        //     }, 100);
                        // }}
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
                                        inputProps={{
                                            readOnly: true
                                        }}
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
                                </Box>
                                <Box
                                    m="5px 0 0 0"
                                    // height={dataGridHeightExplore}
                                    height="70vh"
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











                                {/* <Box display="flex" justifyContent="end" padding={1} gap="20px">

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

export default EditSlots;

