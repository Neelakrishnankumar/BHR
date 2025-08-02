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
import { useLocation, useParams } from "react-router-dom";

const Subscription = () => {
  const location = useLocation();
  if (location.pathname === "/approval/notification/T") {
    window.history.pushState(null, document.title, "#");
  }

  const params = useParams();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7f9fc"
    >
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
            Enter your subscription code to renew your plan
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                name="subCode"
                variant="outlined"
                size="medium"
                fullWidth
                label="Subscription Code"
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.2, textTransform: "uppercase", fontWeight: "bold" }}
            onClick={() => alert("Subscribed successfully!")}
          >
            Subscribe
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Subscription;
