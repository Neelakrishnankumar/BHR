import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Form, Formik } from "formik";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";
import { useDispatch, useSelector } from "react-redux";



const EditListOfSOPs = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const params = useParams();

  const recID = params.id;
  const accessID = params.accessID;

  const CompanyID = sessionStorage.getItem("compID");


  const SOPSaveFn = async (values) => {

    let action = "insert";
    var isCheck = "N";

    const idata = {
      RecordID: recID,
      CompanyID: CompanyID,
      Desc: values.Desc,
      Code: values.Code,
      Sortorder: values.Sortorder || "0",
      Disable: isCheck,
    };

    const response = await dispatch(postData({ accessID, action, idata }));
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      navigate(-1);
    } else {
      toast.error(response.payload.Msg ? response.payload.Msg : "Error");
    }

  }

  return (
    <>
      <React.Fragment
        sx={{
          p: 2,
          height: "100vh",
        }}
      >
        {/* BREADCRUMBS */}
        <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" borderRadius="3px" alignItems="center">

              {/* <IconButton >
                  <MenuOutlinedIcon />
                </IconButton> */}

              <Box
                // display={isNonMobile ? "flex" : "none"}
                borderRadius="3px"
                alignItems="center"
              >
                <Breadcrumbs
                  maxItems={3}
                  aria-label="breadcrumb"
                >
                  <Typography
                    variant="h5"
                    color="#0000D1"
                    sx={{ cursor: "default" }}
                  // onClick={() => navigate("/Apps/TR316/HSN%20Category")}
                  >

                    List Of SOPs
                  </Typography>

                </Breadcrumbs>
              </Box>
            </Box>

            <Box display="flex">
              <Tooltip title="Close">
                <IconButton >
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="error" >
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>


        <Paper elevation={3} sx={{ margin: "10px" }}>
          <Formik
            initialValues={{
              Code: "",
              CategoryName: "",
              Sortorder: "",
              Disable: false,
            }}
            onSubmit={(values, { resetForm }) => {
              setTimeout(() => {
                SOPSaveFn(values, resetForm);
              }, 100);
            }}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  padding={2}
                  columnGap={4}
                  rowGap={3}
                  gridTemplateColumns="1fr 1fr"
                  alignItems="center"
                >
                  {/* CODE */}
                  <TextField
                    name="Code"
                    type="text"
                    id="Code"
                    value={values.Code}
                    label={
                      <>
                        Code
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </>
                    }
                    variant="standard"
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.Code && !!errors.Code}
                    helperText={touched.Code && errors.Code}
                    autoFocus
                  />

                  {/* DESCRIPTION */}
                  <TextField
                    name="Description"
                    type="text"
                    id="Description"
                    value={values.Desc}
                    label={
                      <>
                        Description
                        <span style={{ fontSize: "20px", color: "red" }}>
                          *
                        </span>
                      </>
                    }
                    variant="standard"
                    focused
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.CategoryName && !!errors.CategoryName}
                    helperText={touched.CategoryName && errors.CategoryName}
                  />

                  {/* SORT ORDER */}
                  <TextField
                    fullWidth
                    variant="standard"
                    type="number"
                    label="Sort Order"
                    value={values.Sortorder}
                    id="Sortorder"
                    name="Sortorder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    focused
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) => {
                      e.target.value = Math.max(
                        0,
                        parseInt(e.target.value || 0)
                      )
                        .toString()
                        .slice(0, 8);
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "right" },
                      },
                    }}
                  />

                  {/* DISABLE CHECKBOX */}
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox name="Disable" />}
                      label="Disable"
                    />
                  </Box>
                </Box>

                {/* BUTTONS */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  padding={2}
                  gap={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Save
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>

      </React.Fragment>
    </>
  )
}

export default EditListOfSOPs;
