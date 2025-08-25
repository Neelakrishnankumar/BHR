import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Tooltip,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  dataGridHeaderFooterHeight,
  dataGridHeight,
  dataGridRowHeight,
} from "../../../ui-components/global/utils";
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import QuizIcon from "@mui/icons-material/Quiz";

const SkillCategory = () => {
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
    //{ field: "id", headerName: "Id", width: 90 },
    {
      field: "sno",
      headerName: "SL#",
      width: 90,
      align: "right",
    },
    {
      field: "code",
      headerName: "Code",
      width: 200,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 400,
      editable: true,
    },
    {
      field: "qGroup",
      headerName: "Answer Type",
      width: 200,
      editable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() =>
              navigate(
                "/Apps/SkillGlow/SkillGlowList/SkillCategory/QuestionList",
                {
                  state: { qGroup: params.row.qGroup },
                }
              )
            }
            color="primary"
          >
            <Tooltip title="Questions">
              <QuizIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() =>
              navigate(
                "/Apps/SkillGlow/SkillGlowList/SkillCategory/CreateCategory"
              )
            }
            color="primary"
            aria-label="download"
          >
            <Tooltip title="Edit">
              <EditOutlinedIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            //onClick={() => handleDownload(params.row)}
            color="error"
            aria-label="download"
          >
            <Tooltip title="Delete">
              <Delete />
            </Tooltip>
          </IconButton>
        </>
      ),
    },
  ];
  const rows = [
    { id: 1, sno: 1, code: "QG001", name: "React Document", qGroup: "1 Of 4" },
    {
      id: 2,
      sno: 2,
      code: "QG002",
      name: "React Native Document",
      qGroup: "Any Of 4",
    },
    {
      id: 3,
      sno: 3,
      code: "QG003",
      name: "Laravel Document",
      qGroup: "True / False",
    },
    {
      id: 4,
      sno: 4,
      code: "QG004",
      name: "Node js",
      qGroup: "Yes/No",
    },
    {
      id: 5,
      sno: 5,
      code: "QG005",
      name: "Angular",
      qGroup: "10 Rates",
    },
    {
      id: 6,
      sno: 6,
      code: "QG006",
      name: "AWS",
      qGroup: "5 Rates",
    },
    {
      id: 7,
      sno: 7,
      code: "QG008",
      name: "Azure",
      qGroup: "Text",
    },
    {
      id: 8,
      sno: 8,
      code: "QG008",
      name: "Database",
      qGroup: "Number",
    },
  ];

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
        {/* <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Typography variant="h3">List of Categories</Typography>
        </Box> */}
        <Breadcrumbs
          maxItems={3}
          aria-label="breadcrumb"
          separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
        >
          <Typography
            variant="h5"
            color="#0000D1"
            sx={{ cursor: "default" }}
            onClick={() => navigate("/Apps/SkillGlow/CategoryMain")}
          >
            List Of Category (CAT01)
          </Typography>
          <Typography
            variant="h5"
            color="#0000D1"
            sx={{ cursor: "default" }}
            onClick={() => navigate("/Apps/SkillGlow/SkillGlowList")}
          >
            List Of Assessment (Quality Assurance)
          </Typography>
          <Typography variant="h5" color="#0000D1" sx={{ cursor: "default" }}>
            List Of Question Groups
          </Typography>
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />

          <Tooltip arrow title="Add">
            <IconButton>
              <AddOutlinedIcon
                onClick={() =>
                  navigate(
                    "/Apps/SkillGlow/SkillGlowList/SkillCategory/CreateCategory"
                  )
                }
              />
            </IconButton>
          </Tooltip>

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
                "& .MuiDataGrid-footerContainer": {
                  height: dataGridHeaderFooterHeight,
                  minHeight: dataGridHeaderFooterHeight,
                },
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
                  ? "odd-row"
                  : "even-row"
              }
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" padding="25px" gap={2}>
          <Chip
            icon={<QuizIcon color="primary" />}
            label="Questions"
            variant="outlined"
          />
          
          <Chip
            icon={<ModeEditOutlinedIcon color="primary" />}
            label="Edit"
            variant="outlined"
          />

          <Chip
            icon={<Delete color="error" />}
            label="Delete"
            variant="outlined"
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default SkillCategory;
