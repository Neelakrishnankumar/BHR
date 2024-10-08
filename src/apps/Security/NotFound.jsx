import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotFounds from "../../assets/icon/404error.svg"

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 320,
  flexDirection: 'column',
  justifyContent: 'center',
}));

const IMG = styled('img')(() => ({
  width: '100%',
  marginBottom: '32px',
}));

const NotFoundRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh !important',
}));

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <JustifyBox>
        <IMG src={NotFounds} alt="" />
        {/* <IMG  >Inprogress</IMG> */}

        <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
};

export default NotFound;
