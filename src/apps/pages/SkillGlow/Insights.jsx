import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Stack, Grid, LinearProgress } from "@mui/material";
import { FaHourglassHalf, FaSyncAlt, FaCheckCircle } from "react-icons/fa";
// import {
//   dataGridHeight,
//   dataGridHeaderFooterHeight,
//   formGap,
//   dataGridRowHeight,
// } from "../../ui-components/global/utils";
import {
  dataGridHeight,
  dataGridHeaderFooterHeight,
  formGap,
  dataGridRowHeight,
} from "../../../ui-components/utils";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../Theme";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getInsights1,
  getInsights2,
} from "../../../store/reducers/Formapireducer";

const SkillInsights = () => {
  //FOR DATA TABLE
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [rowCount, setRowCount] = useState(0);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getInsights1()); // no arguments needed
  },[dispatch]);

  // ✅ rename selector variable
  const insightsData = useSelector(
    (state) => state.formApi.skillInsights1getdata
  );
  const loading = useSelector((state) => state.formApi.skillInsights1loading);
  const error=useSelector((state) => state.formApi.error);

  
  console.log("🚀 ~ SkillInsights ~ loading:", loading)
  console.log("🚀 ~ SkillInsights ~ getInsights1:", insightsData);


  const insightsData2 = useSelector(
    (state) => state.formApi.skillInsights2getdata
  );
  console.log("🚀 ~ SkillInsights ~ insightsData2:", insightsData2);
  const loading2 = useSelector((state) => state.formApi.skillInsights2loading);

  const columns = [
    {
      field: "id",
      headerName: "SL#",
      flex: 0.5,
      align: "right",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      valueGetter: (params) =>
        `${params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}`,
    },
    {
      field: "Assessment",
      headerName: "Assessment",
      flex: 1,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "Scheduled",
      headerName: "Scheduled",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "Passed",
      headerName: "Passed",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "Failed",
      headerName: "Failed",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
    // {
    //   field: "yetToAssign",
    //   headerName: "Yet to Assign",
    //   flex: 1,
    //   align: "right",
    //   headerAlign: "center",
    // },
    {
      field: "NotAttended",
      headerName: "Not Attended",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
  ];

 
  const detailColumns = [
    {
      field: "SLNO",
      headerName: "SL#",
      width: 50,
      align: "right",
      headerAlign: "center",
      sortable: false,
      filterable: false,
    },
     
    {
      field: "EmpName",
      headerName: "Employee Name",
      width: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "Date",
      headerName: "Scheduled Date",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NoofAttemp",
      headerName: "No. of Attempts",
      width: 100,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "CurrentAttempt",
      headerName: "Current Attempt",
      width: 100,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "Firstattdate",
      headerName: "First Att Date",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Firstattscore",
      headerName: "First Att Score",
      width: 100,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "Lastattdate",
      headerName: "Last Att Date",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Lastattscore",
      headerName: "Last Att Score",
      width: 100,
      align: "right",
      headerAlign: "center",
    },
  ];



  const cards = [
    {
      title: "Total Assessment",
      count: insightsData?.TotalNoOfAssessment || 0,
      //color: "linear-gradient(to right, #ec4899, #ef4444)", // pink-red
      color: "linear-gradient(135deg, #f7971e, #ffd200)", // pink-red
      icon: <FaHourglassHalf size={32} />,
    },
    {
      title: "Assigned Assessment",
      count: insightsData?.AssignedAssessment || 0,
      //color: "linear-gradient(to right, #3b82f6, #1e40af)", // blue
      color: "linear-gradient(135deg, #17ead9, #6078ea)", // blue
      icon: <FaCheckCircle size={32} />,
    },
    {
      title: "Yet to assign",
      count: insightsData?.YetToAssessment || 0,
      //color: "linear-gradient(to right, #22c55e, #15803d)", // green
      color: "linear-gradient(135deg, #42e695, #3bb2b8)", // green
      icon: <FaSyncAlt size={32} />,
    },
  ];
const handleID=(id)=>{

  dispatch(getInsights2(id));
}
  return (
    <React.Fragment>
       {(loading && loading2) ? <LinearProgress /> : false}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          padding: "15px",
        }}
      >
        INSIGHTS
      </Typography>
      <Grid container spacing={3} sx={{ p: "0px 10px" }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              //key={index}
              sx={{
                background: card.color,
                color: "#fff",
                borderRadius: "16px",
                boxShadow: 4,
                height: 100,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {card.count}
                    </Typography>
                  </Box>

                  <Box sx={{ opacity: 0.9 }}>{card.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABLE */}
      <Grid
        container
        spacing={1}
        mt={5}
        wrap="nowrap"
        sx={{
          padding: "0px 10px",
        }}
      >
    
        <Grid item sx={{ width: "50%" }}>
          <Typography variant="h4">List Of Assessment</Typography>
          <Card sx={{ borderRadius: 2, boxShadow: 2, height: "100%" }}>
            <Box
              height={300}
              sx={{
                "& .MuiDataGrid-root": {
                  // border: "none",
                },
                "& .MuiDataGrid-cell": {
                  // borderBottom: "none",
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
                  overflowY: "auto !important",
                  overflowX: "auto !important", // horizontal scroll
                },
                "& .MuiDataGrid-footerContainer": {
                  // borderTop: "none",
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
                rowHeight={dataGridRowHeight}
                headerHeight={dataGridHeaderFooterHeight}
                rows={
                  insightsData?.ASSESSMENTLIST?.map((row, index) => ({
                    id: row.RecordID,
                    ...row,
                  })) || []
                }
                columns={columns}
               
                onRowClick={(params)=>handleID(params.row.RecordID)}
                getRowId={(row) => row.RecordID} // 👈 ensures uniqueness
                disableSelectionOnClick
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onCellClick={(params) => {}}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                
                onStateChange={(stateParams) =>
                  setRowCount(stateParams.pagination.rowCount)
                }
                loading={loading}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                // getRowClassName={(params) =>
                //   params.indexRelativeToCurrentPage % 2 === 0
                //     ? "odd-row"
                //     : "even-row"
                // }
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "odd-row"
                    : "even-row"
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item sx={{ width: "50%" }}>
          <Typography variant="h4">Employee Performance</Typography>

          <Card sx={{ borderRadius: 2, boxShadow: 2, height: "100%" }}>
            <Box
              height={300}
              sx={{
                "& .MuiDataGrid-root": {
                  // border: "none",
                },
                "& .MuiDataGrid-cell": {
                  // borderBottom: "none",
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
                  overflowY: "auto !important",
                  overflowX: "auto !important", // horizontal scroll
                },
                "& .MuiDataGrid-footerContainer": {
                  // borderTop: "none",
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
                "& .weekoff-row": {
                  backgroundColor: "#f2acb7", // light red
                  color: "#b71c1c", // dark red text
                },
                "& .holiday-row": {
                  backgroundColor: "#c9f5cc", // light green
                  color: "#1b5e20", // dark green text
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
                columns={detailColumns}
                loading={loading2}
                rows={insightsData2}
                 getRowId={(row) => row.RecordID}
               // getRowId={(row) => row.RecordID} // match the id field
                
                disableSelectionOnClick
              
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                // onCellClick={(params) => {}}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                // components={{
                //   Toolbar: EmployeeTool,
                // }}
                // onStateChange={(stateParams) =>
                //   setRowCount(stateParams.pagination.rowCount)
                // }
                // loading={exploreLoading}
                // componentsProps={{
                //   toolbar: {
                //     showQuickFilter: true,
                //     quickFilterProps: { debounceMs: 500 },
                //   },
                // }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "odd-row"
                    : "even-row"
                }
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SkillInsights;
