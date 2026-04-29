import { Box, Breadcrumbs, Tooltip, Button, TextField, Stack, IconButton, Avatar, FormLabel, FormControl, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormGroup, RadioGroup, Radio, Typography, Paper } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import React, { useState, useEffect } from 'react'
import { fnImageUpload, fnFetchImage } from "../../store/reducers/Imguploadreducer";
import store from '../../index';
import LoadingSpinner from '../../ui-components/LoadingSpinner';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import Swal from "sweetalert2";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useProSidebar } from "react-pro-sidebar";

const Imageupload = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state || {};
  var recID = params.id;
  var accessID = params.accessID;
  var screenName = params.screenName;
  var parentID = params.parentID;
  var parentName = params.parentName;
  var Type = params.Type;
  var SearchPhrase = params.SearchPhrase;

  const [img, setImg] = useState();
  const [isImgChanged, setImgChanged] = useState(false);
  const [errorMsgData, setErrorMsgData] = useState(null);

  /********** for imgupload ***********/
  const uploadedImage = useSelector((state) => state.imageApi.uploadedImgName);
  const imgStatus = useSelector((state) => state.imageApi.imgStatus);
  const isImgLoading = useSelector((state) => state.imageApi.imgLoading);


  var userimg = store.getState().globalurl.imageUrl;
  userimg = userimg + uploadedImage;

  console.log("imgname--" + uploadedImage);
  console.log("img--" + userimg);

  //************* Image upload to the server ************//
  function imgUpload(e) {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      console.log(event.target.result);
      let fileInput = false;
      if (event.target.result) {
        console.log(event.target.result);
        fileInput = true;
      }
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            e.target.files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log(uri);
              const formData = { image: uri, type: "images" };
              console.log("---" + JSON.stringify(formData));
              dispatch(fnImageUpload(formData, recID, accessID));
            },
            "base64",
            150,
            150
          );

        } catch (err) {
          console.log(err);
        }
      }
      setImg(event.target.result)
      setImgChanged(true)



      //  dispatch(fnImageUpload(formData,recID,accessID));


    };
  }

  const fnCancel = () => {

    if ((accessID != "TR003") && (accessID != "TR004") && (accessID != "TR001") && (accessID != "TR027")) {
      navigate(`/Apps/${accessID}/${screenName}`);
    }

    if (accessID == "TR003") {
      navigate(`/Apps/Secondarylistview/${accessID}/${screenName}/${Type}`);
    }

    if (accessID == "TR004") {
      navigate(`/Apps/Secondarylistview/${accessID}/${screenName}/${parentID}/${Type}/${parentName}/${SearchPhrase}/pm`);

    }

    if (accessID == "TR001") {
      navigate(`/Apps/Secondarylistview/${accessID}/${screenName}/${parentID}/${parentName}`);
    }
    if (accessID == "TR027") {
      navigate(-1)

    }
  }

  useEffect(() => {

    dispatch(fnFetchImage(accessID, recID));

  }, []);

  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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
          navigate(`/Apps/Secondarylistview/HSN/${params.accessID}/${screenName}/${params.parentID2}/${params.parentID1}`,
            { state: state }
          );
        }
      } else {
        return;
      }
    });
  };

  const { toggleSidebar, broken, rtl } = useProSidebar();


  return (
    // <Box m="20px">
    <Box>

      {isImgLoading == true ? <LoadingSpinner /> :
        <React.Fragment>

          {/* <Box display="flex" justifyContent="space-between" p={2}>

            <Box
              display="flex"

              borderRadius="3px"
              alignItems={"center"}
            >
              <Box display={isNonMobile ? 'flex' : 'none'} borderRadius="3px" alignItems="center">



                <Breadcrumbs maxItems={3} aria-label="breadcrumb" separator={<NavigateNextIcon sx={{ color: '#0000D1' }} />}>
                  <Typography variant="h5" color="#0000D1" sx={{ cursor: 'default' }}  >Image Upload</Typography>

                </Breadcrumbs>

              </Box>



            </Box>



            <Box display="flex">

              <Tooltip title="Close">
                <IconButton onClick={() => fnCancel()} color="error">
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={() => navigate("/")} color="error">
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>

            </Box>
          </Box> */}
          <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Box display="flex" borderRadius="3px" alignItems="center">
                {broken && !rtl && (
                  <IconButton onClick={() => toggleSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                )}
                <Box
                  // display={isNonMobile ? "flex" : "none"}
                  display="flex"
                  borderRadius="3px"
                  alignItems="center"
                >
                  <Breadcrumbs
                    maxItems={3}
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon sx={{ color: "#0000D1" }} />}
                  >
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                      onClick={() => navigate(-1)}
                    >
                      Personnel
                      ({state?.EmpName || ""})
                    </Typography>
                    <Typography
                      variant="h5"
                      color="#0000D1"
                      sx={{ cursor: "default" }}
                    >
                      Image Upload
                    </Typography>
                  </Breadcrumbs>
                </Box>
              </Box>

              <Box display="flex">
                <Tooltip title="Close">
                  <IconButton onClick={() => fnCancel()} color="error">
                    <ResetTvIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton onClick={() => navigate("/")} color="error">
                    <LogoutOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
          <Box sx={{ margin: "20px 10px", padding: "20px" }}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },

            }}
          >
            <FormControl sx={{ gridColumn: "span 2" }}>

              <Stack

                sx={{
                  //    width: {sm:'100%',md:'100%',lg:'100%'},
                  gridColumn: "span 2",
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  right: '0px',
                  gap: '10px'

                }}
              >
                <Avatar variant="rounded" src={isImgChanged == true ? img : userimg} sx={{ width: '200px', height: '150px' }} />
                <IconButton size="large" sx={{ position: 'absolute' }} color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={imgUpload} />
                  <AddPhotoAlternateIcon fontSize="large" color="secondary" />
                </IconButton>
                {/* <Typography variant="h4" color="red"> Maximum Image Size is 2 MB </Typography> */}
              </Stack>

            </FormControl>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px" gap={2}>
            {/* <Button type="submit" color="secondary" variant="contained" >
                Save
              </Button> */}
            <Button color="warning" variant="contained" onClick={fnCancel}>
              Cancel
            </Button>
          </Box>
          </Box>
        </React.Fragment>
      }

    </Box>

  );
};



export default Imageupload;