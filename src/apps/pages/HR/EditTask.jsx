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
    Breadcrumbs,
    MenuItem,
    Select,
    InputLabel,
    Paper,
} from "@mui/material";
import {
    dataGridHeaderFooterHeight,
    dataGridHeight,
    dataGridPageSize,
    dataGridPageSizeOption,
    dataGridRowHeight,
} from "../../../ui-components/global/utils";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { GridActionsCellItem, DataGrid, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
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
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../Theme"; // Adjust the path based on your project structure
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Productautocomplete } from "../../../ui-components/global/Autocomplete";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { formGap } from "../../../ui-components/global/utils";

// import CryptoJS from "crypto-js";
const Edittask = () => {
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
    var OPRecid = params.filtertype;
    const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const state = location.state || {};
    console.log(OPRecid, '====================================');
    useEffect(() => {
        dispatch(getFetchData({ accessID, get: "get", recID }));
    }, [location.key]);

    const [show, setScreen] = React.useState("0");
    const [rowModesModel, setRowModesModel] = useState({});
    const explorelistViewData = useSelector(
        (state) => state.exploreApi.explorerowData
    );
    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    useEffect(() => {
        if (explorelistViewData) {
            setRows(explorelistViewData);
        } else {
            setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
        }
    }, [explorelistViewData, location.key]);

    const [selectedCustomerOptions, setSelectedCustomerOptions] = useState(null);
    const [funMode, setFunMode] = useState("edit");


    const InitialValue = {
        code: data.Code,
        name: data.Name,
        sortorder: data.SortOrder,
        disable: data.Disable === "Y" ? true : false,
    };
    const [Roleid, setRoleid] = useState(null);
    const [selectedRoleOptions, setSelectedRoleOptions] = useState(null);
    const [RoleName, setRoleName] = useState(null);
    const handleRowModesModelChange = (newRowModesModel) => {
        console.log("---handleRowModesModelChange calling");
        setRowModesModel(newRowModesModel);
        setSelectedRoleOptions(null);
    };
    // const handleRoleChange = (newValue, id) => {
    //     setRows((prevRows) =>
    //         prevRows.map((row) => (row.id === id ? { ...row, Role: newValue } : row))
    //     );
    // };
    const handleRoleChange = (newValue, id) => {

        console.log('newvalue product', newValue);

        if (newValue) {
            setSelectedRoleOptions(newValue);
            setRoleid(newValue.RecordID);
            setRoleName(newValue.Name);
            setRows(prevRows =>
                prevRows.map((row) => (row.id === id ? { ...row, Role: newValue } : row))
            )

        } else {
            setSelectedRoleOptions(null);

        }

    };

  

    const handleSaveButtonClick = async (action) => {

        console.log("---Saving rows:", rows);
        console.log(funMode, "--finding action");
       
        const idata = rows.map((row, index) => {
            var formatted = null;
            if(row.ProjectPlanedDate && !isNaN(new Date(row.ProjectPlanedDate))){
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
                // RoleName: row.RoleName,
                Effort: row.TaskDetailEffort,
                Unit: row.TaskDetailUnit,
                TargetDate: formatted,
    //              TargetDate: row.TaskDetailTargetDate
    // ? new Date(row.TaskDetailTargetDate).toISOString().split('T')[0]
    // : null,
                // TargetDate:  new Date(row.TaskDetailTargetDate).toISOString().split('T')[0],
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

    const handleUnitChange = (e, id) => {
        const { value } = e.target;
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, Unit: value } : row
            )
        );
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
        console.log("-----Step1: Local save called");

        const rowToSave = params?.row;
        if (!rowToSave) {
            toast.error("Row not found.");
            return;
        }
        const isNew = rowToSave.isNew;
        console.log("Row to save:", rowToSave);
        setRows((prev) =>
            prev.map((row) =>
                row.RecordID === id
                    ? { ...row, ...rowToSave, isNew: isNew && action !== "delete", isUpdated: !isNew }
                    : row
            )
        );

        // Update row mode to view
        setRowModesModel((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.View },
        }));

    };

    const handleEditClick = (id) => () => {
        setFunMode("E");
        // setEditingRowId(id); 
        console.log("EditMode");
        setRowModesModel((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.Edit },
        }));

    };

    const handleDeleteClick = (id) => async () => {
        try {
            console.log("Deleting record with recID:", recID);


            setRows((prev) => prev.filter((row) => row.RecordID !== id));

            const idata = ({
                //RecordID: recID,
                RecordID: id,
            });

            const response = await dispatch(
                postData({
                    accessID: "TR237",
                    action: "harddelete",
                    idata: idata,
                })
            );

            if (Array.isArray(response.payload) && response.payload.length > 0) {
                toast.success(response.payload[0].Msg);
            } else if (response.payload?.Status === "Y") {
                toast.success(response.payload.Msg);
            } else {
                toast.error(response.payload?.Msg || "Operation failed");
            }

        } catch (error) {
            console.error("Error deleting row:", error);
            toast.error("Error occurred during delete.");
        }
    };

    const processRowUpdate = (newRow, oldRow) => {
        console.log("------inside processrowupdate");
        console.log(newRow, "--find newRow");

        const isNew = !oldRow?.RecordID;
        const updatedRow = { ...newRow, isNew };
        // updatedRow.ManualItem = selectedProductName;
        // updatedRow.ItemRecordID = selectedProductid;

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

        const params = { row: updatedRow };
        handleSave(updatedRow.RecordID, params, funMode);

        return updatedRow;
    };
    const Fnsave = async (values, del) => {

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
            Code: values.code,
            Name: values.name,
            SortOrder: values.sortorder,
            Disable: isCheck,
            ActivitesID: OPRecid,
            //   Finyear,
            CompanyID,
        };



        const response = await dispatch(postData({ accessID, action, idata }));
        if (response.payload.Status == "Y") {
            toast.success(response.payload.Msg);
            navigate(`/Apps/Secondarylistview/TR235/Task/${OPRecid}`);

        } else {
            toast.error(response.payload.Msg);
        }
    };
    const screenChange = (event) => {
        setScreen(event.target.value);
        if (event.target.value == "1") {

            console.log(recID, "--finding recID");

            dispatch(fetchExplorelitview("TR237", "Task Detail", `TaskID = ${recID}`, ""));
            // dispatch(fetchExplorelitview("TR237", "Task Detail", "", ""));
        }
    };



    const columns = [
        { field: "SLNO", headerName: "Sl No", width: 70 },
        {
            headerName: 'RecordID',
            field: 'RecordID',
            width: 100,
            align: 'left',
            headerAlign: 'center',
            hide: true
        },
        {
            headerName: "TaskID",
            field: "TaskID",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: true
        },
        {
            headerName: "Role",
            field: "TaskDetailRoleID",
            width: "200",
            align: "left",
            headerAlign: "center",
            hide: true,
            editable: "true"
        },
        {
            headerName: "RoleCode",
            field: "RoleCode",
            width: "100",
            align: "right",
            headerAlign: "center",
            hide: true
        },
        {
            headerName: "CompanyID",
            field: "CompanyID",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: true
        },
        {
            headerName: "TaskCode",
            field: "TaskCode",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: true
        },
        {
            headerName: "TaskName",
            field: "TaskName",
            width: "100",
            align: "left",
            headerAlign: "center",
            hide: true,
            editable: true,
        },

        {
            headerName: (
                <span>
                    Role <span style={{ color: "red" }}>*</span>
                </span>
            ),
            field: "RoleName",
            width: 300,
            headerAlign: "center",
            hide: false,
            editable: true,
            sortable: false,
            renderEditCell: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return (
                        <Productautocomplete
                            name="Role"
                            label="Role"
                            id="Role"
                            value={selectedRoleOptions}
                            onChange={(newValue) => handleRoleChange(newValue, params.row.RecordID)}
                            defaultValue={params.row.Role}
                            url={`https://hr.beyondexs.com/api/wslistview_mysql.php?data={"Query":{"AccessID":"2097","ScreenName":"Role","Filter":"","Any":""}}`}
                        />
                    );
                }
                return params.value || "";
            },
        },
        { field: "TaskDetailEffort", headerName: "Effort", width: 150, editable: true, type: "number" },
        {
            field: "TaskDetailUnit",
            headerName: "Unit",
            width: 200,
            align: "left",
            headerAlign: "center",
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Days', 'Month'],
            renderCell: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return (
                        <Select
                            value={params.row.Unit || ""}
                            onChange={(e) => handleUnitChange(e, params.id)}
                            displayEmpty
                            fullWidth
                            IconComponent={(props) => <ArrowDropDownIcon {...props} />} // Ensures dropdown icon is visible
                        >
                            <MenuItem value="Days">Days</MenuItem>
                            <MenuItem value="Months">Months</MenuItem>
                        </Select>
                    );
                }
                return params.value || "";
            },
        },
        {
            // field: 'TaskDetailTargetDate',
            field: 'ProjectPlanedDate',
            headerName: 'Project Plan date',
            type: 'date',
            width: 180,
            editable: true,
          },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 200,
            cellClassName: "actions",
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;


                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{ color: '#009688' }}
                            onClick={handleSave(params.id, params, funMode)}

                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={() => {
                                setRowModesModel((prev) => ({ ...prev, [params.id]: { mode: GridRowModes.View } }));
                                setSelectedRoleOptions(null);
                            }
                            }
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<AddIcon style={{ color: '#00563B' }} />}
                        label="Add"
                        onClick={() => handleInsertInrow(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon style={{ color: '#3498db' }} />}
                        label="Edit"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon style={{ color: '#e74c3c' }} />}
                        label="Delete"
                        onClick={handleDeleteClick(params.id, params, "harddelete")}
                        color="inherit"
                    />,


                ];
            }

        },Productautocomplete
    ];

    function EditToolbar() {
        return (
            <GridToolbarContainer
                sx={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Button color="primary" startIcon={<AddIcon />} onClick={handleInsert}>
                    Add Record
                </Button>
            </GridToolbarContainer>
        );
    }



    const fnLogOut = (props) => {
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
                    navigate(`/Apps/Secondarylistview/TR235/Task/${OPRecid}`);
                }
            } else {
                return;
            }
        });
    };



    return (
        <React.Fragment>
            {getLoading ? <LinearProgress /> : false}

            {/* <Box sx={{ height: "100vh", overflow: "auto" }}> */}
            {/* <Box display="flex" justifyContent="space-between" p={2}>
                   
                    <Box
                        display="flex"
                     
                        borderRadius="3px"
                        alignItems={"center"}
                    >
                        {broken && !rtl && (
                            <IconButton

                                onClick={() => toggleSidebar()}
                            >
                                <MenuOutlinedIcon />
                            </IconButton>
                        )}
                        <Box display={isNonMobile ? 'flex' : 'none'} borderRadius="3px" alignItems="center">

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
                                        navigate("/Apps/TR133/Project");
                                    }}
                                >
                                    Project
                                </Typography>

                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(`/Apps/Secondarylistview/TR233/Milestones/${state.projectID}`, { state: { ...state } })}
                                >
                                    Milestone
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(`/Apps/Secondarylistview/TR236/Stages/${state.MilestoneID}`, { state: { ...state } })}
                                >
                                    Stages
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => {
                                        navigate(`/Apps/Secondarylistview/TR234/Activities/${state.OperationStageID}`, { state: { ...state } });
                                    }}
                                >
                                    Activity
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="#0000D1"
                                    sx={{ cursor: "default" }}
                                    onClick={() => navigate(-1)}
                                //onClick={()=>navigate(`Apps/Secondarylistview/TR235/Task/14/EditTask/${OPRecid}/E`)}
                                >
                                    Task
                                </Typography>
                                {show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Task detail</Typography>) : false}
                            </Breadcrumbs>
                        </Box>
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
                                    <MenuItem value={0}>Task</MenuItem>
                                    <MenuItem value={1}>Task Detail</MenuItem>

                                </Select>
                            </FormControl>
                        ) : (
                            false
                        )}
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
                </Box> */}
            <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
                <Box display="flex" justifyContent="space-between"
                p={mode == "A" ? 2 : 1}
                >
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
                                    navigate("/Apps/TR133/Project");
                                }}
                            >
                                {`Project(${state.projectName})`}
                            </Typography>

                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => navigate(`/Apps/Secondarylistview/TR233/Milestones/${state.projectID}`, { state: { ...state } })}
                            >
                                {`Milestones(${state.MilestoneName})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => navigate(`/Apps/Secondarylistview/TR236/Stages/${state.MilestoneID}`, { state: { ...state } })}
                            >
                                {`Stages(${state.stagesName})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => {
                                    navigate(`/Apps/Secondarylistview/TR234/Activities/${state.OperationStageID}`, { state: { ...state } });
                                }}
                            >
                                 {`Activity(${state.Activityname})`}
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#0000D1"
                                sx={{ cursor: "default" }}
                                onClick={() => navigate(-1)}
                            //onClick={()=>navigate(`Apps/Secondarylistview/TR235/Task/14/EditTask/${OPRecid}/E`)}
                            >
                                {/* {`Task(${state.TaskName})`} */}
                                {mode === "E" ? `Task(${state.TaskName})` : "Task(New)"} 
                            </Typography>
                            {show == "1" ? (<Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Task detail</Typography>) : false}
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
                                    <MenuItem value={0}>Task</MenuItem>
                                    <MenuItem value={1}>Task Detail</MenuItem>

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
                            <IconButton color="error" onClick={() => fnLogOut("Logout")}>
                                <LogoutOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
            {show == "0" ? (
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
                                        variant="standard"
                                        focused
                                        required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        autoFocus
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
                                        autoFocus
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
                                            // navigate(`/Apps/Secondarylistview/TR235/Task/${OPRecid}`);
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
            {show == "1" ? (
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
                                        variant="standard"
                                        focused
                                        required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        readOnly
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
                                        autoFocus
                                        readOnly
                                    />

                                </Box>


                                <Box m="5px">
                                    <Typography variant="h4">Role Based Effort</Typography>
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
                                            rows={rows}
                                            columns={columns}
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
                                            // onProcessRowUpdateError={handleProcessRowUpdateError}
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
                                        <Button color="secondary" variant="contained" onClick={handleSaveButtonClick}>
                                            Save
                                        </Button>
                                        <Button color="warning" variant="contained" onClick={() => navigate(-1)}>
                                            Cancel
                                        </Button>
                                    </Box>
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

export default Edittask;
