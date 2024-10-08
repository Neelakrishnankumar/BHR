import React from 'react'
import { useNavigate  } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const LoadingSpinner = () => {
 
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};
export default LoadingSpinner;