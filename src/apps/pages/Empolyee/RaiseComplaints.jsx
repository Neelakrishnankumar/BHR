import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { postData } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import { EditAutoComplete, MultiFormikOptimizedAutocomplete } from "../../../ui-components/global/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";

export default function RaiseComplaints() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, accessID } = useParams();
  let params = useParams();
  console.log("URL Params:", params);
  var mode = params.Mode;
  var recID = params.id;
  const rowData = location.state || {};
  const isLoading = useSelector((state) => state.formApi.postLoading);

  const compID = sessionStorage.getItem("compID");

  const Subscriptionlastthree =
    sessionStorage.getItem("SubscriptionCode")?.slice(-3) || "";

  const listViewurl = useSelector(
    (state) => state.globalurl.listViewurl
  );

  const [selectedStandard, setSelectedStandard] = React.useState(null);

  const [selectedStudent, setSelectedStudent] = React.useState(null);

  React.useEffect(() => {
    if (rowData?.rowData) {
      const data = rowData.rowData;

      setFormData({
        Title: data.Title || "",
        Priority: data.Priority || "Low",
        Description: data.Description || "",
        Attachment: data.Attachments || "",
        FeedbacksResponse: data.FeedbacksResponse || "",
      });

      setSelectedStandard(data.StandardID ?? null);
      setSelectedStudent(data.StudentID ?? null);
    }
  }, [rowData]);



  const [formData, setFormData] = React.useState({
    Title: "",
    Priority: "Low",
    StudentName: "",
    Description: "",
    Attachment: "",
    FeedbacksResponse: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FILE CHANGE
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Attachment: e.target.files[0]?.name || "",
    }));
  };

  // SUBMIT
  const handleSubmit = async () => {
    let action =
      mode === "A"
        ? "insert"
        : mode === "E"
          ? "update"
          : "insert";
    const idata = {
      RecordID: recID,
      CompanyID: compID,
      CategoryID: "1",
      StandardID: selectedStandard?.RecordID || selectedStandard || 0,
      StudentID: selectedStudent?.RecordID || selectedStudent || 0,
      Title: formData.Title,
      Priority: formData.Priority,
      Attachments: "feedback_attachment.pdf",
      Description: formData.Description,
      StudentName: formData.StudentName,
      SortOrder: "1",
      Disable: "N",
      DeleteFlag: "N",

      GivenBy: "412",
      FeedbacksResponse: formData.FeedbacksResponse,
      Status: "Applied",
      Type: "T",
    };

    console.log("INSERT DATA", idata);

    const response = await dispatch(
      postData({
        accessID: 'TR391',
        action: action,
        idata,
      })
    );

    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);

      // RESET FORM
      setFormData({
        Title: "",
        Priority: "Low",
        StudentName: "",
        Description: "",
        Attachment: "",
      });

      setSelectedStandard(null);
      setSelectedStudent(null);
    } else {
      toast.error(response?.payload?.Msg || "Something went wrong");
    }
  };

  return (
    <Box sx={{ background: "#F4F7FB", minHeight: "100vh" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1, p: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              background: "#fff",
              mb: 4,
              boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              fontSize={34}
              fontWeight={700}
              color="#1F3C88"
              mb={4}
            >
              Raise New Complaint
            </Typography>

            <Grid container spacing={3}>

              {/* TITLE */}
              <Grid item xs={12} md={6}>
                <Typography mb={1} fontWeight={600}>
                  Complaint Title
                </Typography>

                <TextField
                  fullWidth
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                  placeholder="Enter complaint title"
                />
              </Grid>

              {/* PRIORITY */}
              <Grid item xs={12} md={6}>
                <Typography mb={1} fontWeight={600}>
                  Priority
                </Typography>

                <Select
                  fullWidth
                  name="Priority"
                  value={formData.Priority}
                  onChange={handleChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </Grid>

              {/* STANDARD */}
              <Grid item xs={12} md={4}>
                <Typography mb={1} fontWeight={600}>
                  Standard
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid rgba(0,0,0,0.23)",
                    borderRadius: "4px",
                    minHeight: "56px",
                    width: "100%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    px: 1.5,

                    "&:hover": {
                      borderColor: "rgba(0,0,0,0.87)",
                    },

                    "& .MuiAutocomplete-root": {
                      width: "100%",
                    },

                    "& .MuiInputBase-root": {
                      width: "100%",
                      border: "none !important",
                      boxShadow: "none !important",
                      background: "transparent !important",
                      padding: "0 !important",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                    },

                    "& .MuiInput-root:before": {
                      borderBottom: "none !important",
                    },

                    "& .MuiInput-root:after": {
                      borderBottom: "none !important",
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },

                    "& input": {
                      padding: "0 !important",
                      fontSize: "14px",
                    },

                    "& .MuiAutocomplete-input": {
                      padding: "0 !important",
                    },

                    "& .MuiAutocomplete-endAdornment": {
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "0px",
                    },

                    "& .MuiChip-root": {
                      display: "none !important",
                    },
                  }}
                >

                  {/* CUSTOM PLACEHOLDER */}
                  {!selectedStandard && (
                    <Typography
                      sx={{
                        position: "absolute",
                        color: "#9e9e9e",
                        fontSize: "14px",
                        pointerEvents: "none",
                        zIndex: 1,
                        left: "14px",
                      }}
                    >
                      Select Standard
                    </Typography>
                  )}

                  {/* <MultiFormikOptimizedAutocomplete
                    id="standard"
                    name="standard"
                    label=""
                    multiple={false}
                    value={selectedStandard}
                    onChange={(e, newValue) => {

                      // SET STANDARD
                      setSelectedStandard(newValue || null);

                      // CLEAR STUDENT FIELD
                      setSelectedStudent(null);
                    }}
                    textFieldProps={{
                      fullWidth: true,
                      variant: "standard",

                      InputProps: {
                        disableUnderline: true,
                      },
                    }}
                    url={`${listViewurl}?data=${JSON.stringify({
                      Query: {
                        AccessID: "2183",
                        ScreenName: "Standard",
                        VerticalLicense: Subscriptionlastthree,
                        Filter: `CompanyID='${compID}'`,
                        Any: "",
                      },
                    })}`}
                  /> */}
                  <EditAutoComplete
                    sx={{ width: "100%", mt: 2 }}
                    name="standard"
                    id="standard"
                    value={selectedStandard}
                    onChange={(e, newValue) => {
                      console.log("Selected Standard:", newValue);
                      console.log("Standard RecordID:", newValue?.RecordID);

                      setSelectedStandard(newValue?.RecordID || null);
                    }}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2183","ScreenName":"Standard","VerticalLicense":"${Subscriptionlastthree}","Filter":"CompanyID='${compID}'","Any":"","CompId":${compID}}}`}
                  />
                </Box>
              </Grid>

              {/* STUDENT NAME */}
              <Grid item xs={12} md={4}>
                <Typography mb={1} fontWeight={600}>
                  Student Name
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid rgba(0,0,0,0.23)",
                    borderRadius: "4px",
                    minHeight: "56px",
                    width: "100%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    px: 1.5,

                    "&:hover": {
                      borderColor: "rgba(0,0,0,0.87)",
                    },

                    "& .MuiAutocomplete-root": {
                      width: "100%",
                    },

                    "& .MuiInputBase-root": {
                      width: "100% !important",
                      minWidth: "100% !important",
                      border: "none !important",
                      boxShadow: "none !important",
                      background: "transparent !important",
                      padding: "0 !important",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                    },

                    "& .MuiAutocomplete-inputRoot": {
                      width: "100% !important",
                      flexWrap: "nowrap !important",
                    },

                    "& .MuiAutocomplete-input": {
                      width: "100% !important",
                      minWidth: "0 !important",
                      padding: "0 !important",
                      fontSize: "14px",
                    },

                    "& .MuiInput-root:before": {
                      borderBottom: "none !important",
                    },

                    "& .MuiInput-root:after": {
                      borderBottom: "none !important",
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },

                    "& .MuiAutocomplete-endAdornment": {
                      right: "0px",
                    },

                    "& .MuiChip-root": {
                      display: "none !important",
                    },
                  }}
                >
                  {/* CUSTOM PLACEHOLDER */}
                  {!selectedStudent && (
                    <Typography
                      sx={{
                        position: "absolute",
                        color: "#9e9e9e",
                        fontSize: "14px",
                        pointerEvents: "none",
                        zIndex: 1,
                        left: "14px",
                      }}
                    >
                      Select Student
                    </Typography>
                  )}
                  {/* <MultiFormikOptimizedAutocomplete
                    id="student"
                    name="student"
                    label=""
                    multiple={false}
                    value={selectedStudent}
                    onChange={(e, newValue) => {
                      setSelectedStudent(newValue || null);
                    }}
                    textFieldProps={{
                      fullWidth: true,
                      variant: "standard",
                      InputProps: {
                        disableUnderline: true,
                      },
                    }}
                    url={`${listViewurl}?data=${JSON.stringify({
                      Query: {
                        AccessID: "2182",
                        ScreenName: "Student",
                        VerticalLicense: Subscriptionlastthree,

                        // DYNAMIC STANDARD ID
                        Filter: `CompanyID='${compID}' AND ProjectID='${selectedStandard?.RecordID || ""}'`,
                        Any: "",
                      },
                    })}`}
                  /> */}
                  <EditAutoComplete
                    sx={{ width: "100%", mt: 2 }}
                    name="student"
                    id="student"
                    value={selectedStudent}
                    onChange={(e, newValue) => {
                      console.log("Selected Student:", newValue);
                      console.log("Student RecordID:", newValue?.RecordID);

                      // STORE FULL OBJECT
                      setSelectedStudent(newValue?.EmployeeID || null);
                    }}
                    url={`${listViewurl}?data={"Query":{"AccessID":"2182","ScreenName":"Student","VerticalLicense":"${Subscriptionlastthree}","Filter":"CompanyID='${compID}' AND ProjectID='${selectedStandard?.EmployeeID || selectedStandard}'","Any":"","CompId":${compID}}}`}
                  />
                </Box>
              </Grid>

              {/* FILE */}
              <Grid item xs={12} md={4}>
                <Typography mb={1} fontWeight={600}>
                  Upload Attachment
                </Typography>

                <TextField
                  fullWidth
                  type="file"
                  onChange={handleFileChange}
                />
              </Grid>

              {/* DESCRIPTION */}
              <Grid item xs={12}>
                <Typography mb={1} fontWeight={600}>
                  Description
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Enter complaint description..."
                />
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="start"
              mt="20px"
              gap="20px"
              padding={1}
            >
              <LoadingButton
                color="secondary"
                variant="contained"
                type="submit"
                loading={isLoading}
                onClick={handleSubmit}
              >
                Save
              </LoadingButton>

              <Button
                color="warning"
                variant="contained"
                onClick={() => {
                  navigate("/Apps/TR391/RaiseComplaints");
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 4, mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "#fff",
            mb: 4,
            boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            fontSize={34}
            fontWeight={700}
            color="#1F3C88"
            mb={4}
          >
            Reply Comment
          </Typography>

          <Grid container spacing={3}>

            {/* TITLE */}
            <Grid item xs={12}>
              <Typography mb={1} fontWeight={600}>
                Feedback Response
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={5}
                name="FeedbacksResponse"
                value={formData.FeedbacksResponse}
                onChange={handleChange}
                placeholder="Enter Feedback Response Here..."
              />
            </Grid>


          </Grid>

          <Box
            display="flex"
            justifyContent="start"
            mt="20px"
            gap="20px"
            padding={1}
          >
            <LoadingButton
              color="secondary"
              variant="contained"
              type="submit"
              loading={isLoading}
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>

            <Button
              color="warning"
              variant="contained"
              onClick={() => {
                navigate("/Apps/TR391/RaiseComplaints");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}