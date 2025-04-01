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
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter,GridRowModes } from "@mui/x-data-grid";
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
    getFetchWeightage,
    postApidata,
    postData,
    postWeightage,
} from "../../../store/reducers/Formapireducer";
import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { useTheme } from "@emotion/react";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";

// import CryptoJS from "crypto-js";
const EditmileWeightage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    var recID = params.id;
    var mode = params.Mode;
    const type = params.Type;
    var accessID = params.accessID;
    const projectid = params.filtertype;
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

    const [pageSize, setPageSize] = React.useState(10);
    const [rowCount, setRowCount] = useState(0);
    const colors = tokens(theme.palette.mode);
    const explorelistViewData = useSelector(
        (state) => state.exploreApi.explorerowData
    );
    const explorelistViewcolumn = useSelector(
        (state) => state.exploreApi.explorecolumnData
    );
    // const exploreLoading = useSelector((state) => state.exploreApi.loading);
    const [rows, setRows] = useState([]);
    console.log(rows,"rowssssssssssssssssssssssssssssssssss");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getFetchWeightage({ Type: type, HeaderID: recID }));

                if (response?.payload?.Status === "Y" && Array.isArray(response.payload.Data)) {

                    const updatedRows = response.payload.Data.map((row, index) => ({
                        ...row,
                        SLNO: index + 1,
                    }));

                    setRows(updatedRows);
                } else {
                    setRows([]);
                    toast.error(response?.payload?.Msg);
                }
            } catch (error) {
                console.error("Error fetching weightage data:", error);
                setRows([]);
                toast.error("An error occurred while fetching data.");
            }
        };

        fetchData();
    }, [dispatch]);




    const columns = [
        { field: "SLNO", headerName: "Sl No", width: 70 },
        { field: "RecordID", headerName: "Record ID", width: 100, hide: "true" },
        { field: "HeaderID", headerName: "Project ID", width: 120, hide: "true" },
        { field: "Code", headerName: "Code", width: 150 },
        { field: "Name", headerName: "Name", width: 200 },
        { field: "Weightages", headerName: "Weightage", width: 130, editable: "true" },
    ];

    const selectCellData = ({ rowData, mode, field }) => {
        console.log(
            "🚀 ~ file: Editfunction.jsx:178 ~ selectcelldata ~ rowData:",
            rowData
        );
    }

    const InitialValue = {
        code: state.code,
        name: state.Desc,

    };
    const processRowUpdate = async (newRow, oldRow) => {
        const updatedRow = { ...newRow, isNew: false };
    
    
        const newData = rows.map((row) => 
            row.RecordID === updatedRow.RecordID ? updatedRow : row
        );
        const totalWeightage = newData.reduce((sum, row) => sum + (parseFloat(row.Weightages) || 0), 0);
    
   
        if (totalWeightage > 100) {
            toast.error("Total weightage cannot exceed 100");
            return oldRow; 
        }
    
        setRows(newData);
        return updatedRow;
    };
    
      
     
      
   
    const handleSaveButtonClick = async () => {
        try {
          if (!rows || rows.length === 0) {
            toast.warn("No data available to save.");
            return;
          }

          const response = await dispatch(postWeightage({Type:type,data:rows}));
      console.log(response,"checkkkkk")
          if (response.payload.Status === "Y") {
            toast.success(response.payload.Msg);

          } else {
            toast.error(response.payload?.Msg);
          }
        } 
        catch (error) {
          console.error("🚀 Error saving data:", error);
          toast.error("An error occurred while saving.");
        }
      };
    
      
      

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
                    navigate("/Apps/Secondarylistview/TR233/Milestones/2");
                }
            } else {
                return;
            }
        });
    };



    return (
        <React.Fragment>
            {/* {getLoading ? <LinearProgress /> : false} */}
            <Box display="flex" justifyContent="space-between" p={2}>
           
                <Box display="flex" borderRadius="3px" alignItems="center">
                    {broken && !rtl && (
                        <IconButton onClick={() => toggleSidebar()}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    )}
                   <Typography variant="h3" mt={2}>
    {type === "M" 
        ? "Milestone Weightage" 
        : type === "OPS" 
        ? "Stage Weightage" 
        : type === "ACT" 
        ? "Activity Weightage" 
        : type === "TK" 
        ? "Task Weightage" 
        : "Weightage"}  
</Typography>


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

  
                <Box m="20px">
                    <Formik
                        initialValues={InitialValue}

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
                                    gap="50px"
                                    marginBottom={7}
                                    gridTemplateColumns="repeat(2, 1fr)"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 4",
                                        },
                                    }}
                                >

                                    <TextField
                                        name="code"
                                        type="text"
                                        id="code"
                                        label="Code"
                                        variant="filled"
                                        focused
                                        required
                                        value={values.code}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.code && !!errors.code}
                                        helperText={touched.code && errors.code}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextField
                                        name="name"
                                        type="text"
                                        id="name"
                                        label="Description"
                                        variant="filled"
                                        focused
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        autoFocus
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                </Box>


                                <Box sx={{ width: "100%" }}>

                                    <Box
                                        m="5px 0 0 0"
                                        height="60vh"
                                        sx={{
                                            "& .MuiDataGrid-root": {
                                                border: "none",
                                                width: "100%",
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
                                        }}
                                    >
                                        <DataGrid
                                            // loading={exploreLoading}
                                            rows={rows || []}
                                            columns={columns}
                                            disableSelectionOnClick
                                            getRowId={(row) => row.RecordID}
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            experimentalFeatures={{ newEditingApi: true }}
                                            processRowUpdate={processRowUpdate} 
                                            onProcessRowUpdateError={(error) => console.error("Row update error:", error)}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            pagination
                                            onStateChange={(stateParams) => setRowCount(stateParams?.pagination?.rowCount || 0)}
                                            componentsProps={{
                                                toolbar: {
                                                    showQuickFilter: true,
                                                    quickFilterProps: { debounceMs: 500 },
                                                },
                                            }}
                                        />

                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "20px" }}>
                                        <Button color="secondary" variant="contained"
                                            onClick={handleSaveButtonClick}
                                            //navigate();
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>


                            </form>
                        )}
                    </Formik>
                </Box>
    
        </React.Fragment>
    );
};

export default EditmileWeightage;
