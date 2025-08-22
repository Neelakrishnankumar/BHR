import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridRowHeight } from "../../../ui-components/global/utils";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { tokens, ColorModeContext } from "../../../Theme";
import { useProSidebar } from "react-pro-sidebar";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { fetchListview } from "../../../store/reducers/Listviewapireducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Category, Delete, Add, Psychology } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';



const EmployeeSchedule = () => {
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const YearFlag = sessionStorage.getItem("YearFlag");
  var currentPage = parseInt(sessionStorage.getItem("currentPage"));
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  var accessID = params.accessID;
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [pageSize, setPageSize] = React.useState(15);
  const [page, setPage] = React.useState(currentPage || 0);
  const open = useSelector((state) => state.listviewApi.mailOpen);
  var screenName = params.screenName;
  const year = sessionStorage.getItem("year");
  const listViewData = useSelector((state) => state.listviewApi.rowData);

  const loading = useSelector((state) => state.listviewApi.loading);
  const listViewcolumn = useSelector((state) => state.listviewApi.columnData);
  const compID = sessionStorage.getItem("compID");
  const columns = [
    { field: "id", headerName: "S.no", width: 90, align: "right" },
    {
      field: "code",
      headerName: "Employee Code",
      width: 400,
      editable: true,
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: 400,
      editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => navigate("/Apps/SkillGlow/CandidateMain")}>
            <Tooltip title="Assessment Category">
              <CategoryOutlinedIcon />
            </Tooltip>
          </IconButton>
        </>
      ),
    },
  ];
  //const [rows, setRows] = useState([]);
  const rows = [
    { id: 1, code: "EMP01", name: "NeelaKrishnan" },
    {
      id: 2,
      code: "CAT02",
      name: "Web Development",
      
    },
    { id: 3, code: "EMP02", name: "Parkavi" },
    { id: 4, code: "EMP03", name: "Surya" },
    { id: 5, code: "EMP04", name: "Kabilan" },
  ];
  // Load from localStorage
  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("categoryData") || "[]");
  //   setRows(stored);
  // }, []);

  // const handleDelete = (id) => {
  //   const updated = rows.filter((row) => row.id !== id);
  //   setRows(updated);
  //   localStorage.setItem("categoryData", JSON.stringify(updated));
  // };

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
            navigate("/Apps/TR027/Employees");
          }
        } else {
          return;
        }
      });
    };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        key={location.key}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box sx={{ display: "flex", flexDirection: "row" ,gap:10 }}>
          <Typography variant="h3">List of Employees</Typography>

        
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />

 


            {/* <Tooltip arrow title="Add">
              <IconButton>
                <AddOutlinedIcon
                  onClick={() => {
                    navigate(
                      '/Apps/SkillGlow/CategoryMain/CreateCategoryMain',
                    );
                  }}
                />
              </IconButton>
            </Tooltip> */}
       


          <GridToolbarExport
            printOptions={{ disableToolbarButton: true }}
            csvOptions={{
              fileName: `${screenName}`,
            }}
          />

          <Tooltip arrow title="Logout">
            <IconButton onClick={() => fnLogOut("Logout")} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </GridToolbarContainer>
    );
  }

  // var filter
  // if(accessID == "TR047"){
  //   filter =`Finyear='${year}'`
  // }else {
  //   filter =""
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePagechange = (pageno) => {
    setPage(pageno);
    sessionStorage.setItem("currentPage", pageno);
  };

  return (
    <React.Fragment>
     
      <Box m="5px">
          <Box m="5px">
          <Box
          m="5px 0 0 0"
          padding={2}
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
              // borderBottom: "none",
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
              backgroundColor: "#d0edec",
              color: "", // Color for even rows
            },
          }}
        >
          <DataGrid
            sx={{
              "& .MuiDataGrid-footerContainer":{
                height:dataGridHeaderFooterHeight,
                minHeight:dataGridHeaderFooterHeight,
              }
             }}
            rows={rows}
            columns={columns}
            loading={loading}
            disableSelectionOnClick
            rowHeight={dataGridRowHeight}
            headerHeight={dataGridHeaderFooterHeight}
            getRowId={(row) => row.id}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            onPageChange={(pageno) => handlePagechange(pageno)}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? 'odd-row'
                : 'even-row'
            }
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </Box> 
        </Box>
 
          <Box display="flex" flexDirection="row" padding="25px" gap={2}>
            <Chip
              icon={<CategoryOutlinedIcon color="primary" />}
              label="Assessment Category"
              variant="outlined"
            />

          </Box>
     
      </Box>
    </React.Fragment>
  );
};
export default EmployeeSchedule;
