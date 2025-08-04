import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { subscriptionRenewal } from "../../store/reducers/Formapireducer";
import { toast } from "react-toastify";

const Subscription = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const location = useLocation();
  const subCode = location.state
//   if (location.pathname === "/approval/notification/T") {
//     window.history.pushState(null, document.title, "#");
//   }

  const params = useParams();

async function Fnsave (values){


const response = await dispatch(subscriptionRenewal({data:{License:subCode.subCode}}))
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);

      // navigate(-1);

    } else {
      toast.error(response.payload.Msg);
    }

}

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7f9fc"
    >
      <Formik
        initialValues={{subCode:""}}
        onSubmit={(values, setSubmitting) => {
          setTimeout(() => {
            Fnsave(values);
          }, 100);
        }}
        // validationSchema={LocationSchema}
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
            <Card
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 5,
                width: 350,
              }}
            >
              <CardContent>
                <CheckCircleIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Subscription Renewal
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                 Your subscription has expried, Do you want Renew ?
                </Typography>

                {/* <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                      name="subCode"
                      variant="outlined"
                      size="medium"
                      fullWidth
                      label="Subscription Code"
                      onChange={handleChange}
                      value={values.subCode}
                    />
                  </Grid>
                </Grid> */}
              </CardContent>

              <CardActions  sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    py: 1.2,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                  type="submit"
                     disabled={isSubmitting}
                >
                  yes
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => navigate(-1)}
                  sx={{
                    py: 1.2,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
            
                >
                  No
                </Button>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Subscription;
