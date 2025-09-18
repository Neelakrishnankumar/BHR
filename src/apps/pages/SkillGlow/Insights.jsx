import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Stack, Grid } from "@mui/material";
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

const SkillInsights = () => {
  //FOR DATA TABLE
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "SL#",
      flex: 0.5,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "assessment",
      headerName: "Assessment",
      flex: 1,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "scheduled",
      headerName: "Scheduled",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "passed",
      headerName: "Passed",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
    {
      field: "yetToAssign",
      headerName: "Yet to Assign",
      flex: 1,
      align: "right",
      headerAlign: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      assessment: "Web Development",
      scheduled: 17,
      passed: 12,
      yetToAssign: 5,
    },
    {
      id: 2,
      assessment: "Appraisal",
      scheduled: 18,
      passed: 8,
      yetToAssign: 10,
    },
    {
      id: 3,
      assessment: "Quality Assurance",
      scheduled: 18,
      passed: 15,
      yetToAssign: 3,
    },
    {
      id: 4,
      assessment: "Knowledge Based",
      scheduled: 22,
      passed: 20,
      yetToAssign: 2,
    },
  ];

  // const detailColumns = [
  //   {
  //     field: "id",
  //     headerName: "SL#",
  //     flex: 0.5,
  //     align: "right",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "employee",
  //     headerName: "Employee Name",
  //     flex: 1,
  //     align: "left",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "scheduled",
  //     headerName: "Scheduled Date",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "noOfAtt",
  //     headerName: "No.Of Attempts",
  //     flex: 1,
  //     align: "right",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "currentAttempt",
  //     headerName: "Current Attempt",
  //     flex: 1,
  //     align: "right",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "firstAttempt",
  //     headerName: "First Att Date",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "firstAttemptScore",
  //     headerName: "First Att Score",
  //     flex: 1,
  //     align: "right",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "lastAttempt",
  //     headerName: "Last Att Date",
  //     flex: 1,
  //     align: "center",
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "lastAttemptScore",
  //     headerName: "Last Att Score",
  //     flex: 1,
  //     align: "right",
  //     headerAlign: "center",
  //   },
  // ];
  
  const detailColumns = [
  { field: "id", headerName: "SL#", width: 50, align: "right", headerAlign: "center" },
  { field: "employee", headerName: "Employee Name", width: 200, align: "left", headerAlign: "center" },
  { field: "scheduled", headerName: "Scheduled Date", width: 100, align: "center", headerAlign: "center" },
  { field: "noOfAtt", headerName: "No. of Attempts", width: 100, align: "right", headerAlign: "center" },
  { field: "currentAttempt", headerName: "Current Attempt", width: 100, align: "right", headerAlign: "center" },
  { field: "firstAttempt", headerName: "First Att Date", width: 100, align: "center", headerAlign: "center" },
  { field: "firstAttemptScore", headerName: "First Att Score", width: 100, align: "right", headerAlign: "center" },
  { field: "lastAttempt", headerName: "Last Att Date", width: 100, align: "center", headerAlign: "center" },
  { field: "lastAttemptScore", headerName: "Last Att Score", width: 100, align: "right", headerAlign: "center" },
];

  
  const detailData = {
    1: [
      {
        id: 1,
        employee: "Neelakrishnan",
        scheduled: "02-09-2025",
        noOfAtt: "5",
        currentAttempt: "3",
        firstAttempt: "02-09-2025",
        firstAttemptScore: "100",
        lastAttempt: "03-09-2025",
        lastAttemptScore: "100",
      },
      {
        id: 2,
        employee: "Surya",
        scheduled: "04-09-2025",
        noOfAtt: "5",
        currentAttempt: "3",
        firstAttempt: "05-09-2025",
        firstAttemptScore: "0",
        lastAttempt: "07-09-2025",
        lastAttemptScore: "80",
      },
    ],
    2: [
      {
        id: 1,
        employee: "Sudha",
        scheduled: "01-09-2025",
        noOfAtt: "3",
        currentAttempt: "3",
        firstAttempt: "01-09-2025",
        firstAttemptScore: "66",
        lastAttempt: "04-09-2025",
        lastAttemptScore: "66",
      },
      {
        id: 2,
        employee: "Kabilan",
        scheduled: "03-09-2025",
        noOfAtt: "2",
        currentAttempt: "2",
        firstAttempt: "03-09-2025",
        firstAttemptScore: "75",
        lastAttempt: "05-09-2025",
        lastAttemptScore: "75",
      },
    ],
    3: [
      {
        id: 1,
        employee: "Keerthana",
        scheduled: "07-09-2025",
        noOfAtt: "4",
        currentAttempt: "4",
        firstAttempt: "08-09-2025",
        firstAttemptScore: "100",
        lastAttempt: "09-09-2025",
        lastAttemptScore: "100",
      },
    ],
    4: [
      {
        id: 1,
        employee: "Yogesh",
        scheduled: "05-09-2025",
        noOfAtt: "1",
        currentAttempt: "1",
        firstAttempt: "09-09-2025",
        firstAttemptScore: "50",
        lastAttempt: "10-09-2025",
        lastAttemptScore: "50",
      },
      {
        id: 2,
        employee: "Hari",
        scheduled: "08-09-2025",
        noOfAtt: "2",
        currentAttempt: "2",
        firstAttempt: "08-09-2025",
        firstAttemptScore: "0",
        lastAttempt: "09-09-2025",
        lastAttemptScore: "60",
      },
    ],
  };

  const cards = [
    {
      title: "Total Assessment",
      count: 32,
      //color: "linear-gradient(to right, #ec4899, #ef4444)", // pink-red
      color: "linear-gradient(135deg, #f7971e, #ffd200)", // pink-red
      icon: <FaHourglassHalf size={32} />,
    },
    {
      title: "Assigned Assessment",
      count: 12,
      //color: "linear-gradient(to right, #3b82f6, #1e40af)", // blue
      color: "linear-gradient(135deg, #17ead9, #6078ea)", // blue
      icon: <FaCheckCircle size={32} />,
    },
    {
      title: "Yet to assign",
      count: 20,
      //color: "linear-gradient(to right, #22c55e, #15803d)", // green
      color: "linear-gradient(135deg, #42e695, #3bb2b8)", // green
      icon: <FaSyncAlt size={32} />,
    },
  ];

  return (
    <React.Fragment>
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
                // rows={
                //   dashBoardAttenGetData.projectTaskData.leaveDetailsData
                //     .tableData
                // }
                rows={rows}
                columns={columns}
                // onRowClick={(params) => {
                //   setSelectedProject(params.row);
                //   dispatch(
                //     EmployeeEffort({
                //       data: {
                //         EmployeeID: empID,
                //         ProjectID: params.row.P_RECID,
                //       },
                //     })
                //   );
                // }}
                onRowClick={(params) => setSelectedAssessment(params.row.id)} // 👈 capture assessment
                disableSelectionOnClick
                //getRowId={(row) => row.SLNO}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onCellClick={(params) => {}}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                // components={{
                //   Toolbar: AttendanceTool,
                // }}
                // onStateChange={(stateParams) =>
                //   setRowCount(stateParams.pagination.rowCount)
                // }
                // loading={exploreLoading}
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
                // rows={empEffortGetData}
                // columns={EmployeeColumn}
                rows={detailData[selectedAssessment] || []}
                columns={detailColumns}
                disableSelectionOnClick
                //getRowId={(row) => row.SLNO}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onCellClick={(params) => {}}
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
