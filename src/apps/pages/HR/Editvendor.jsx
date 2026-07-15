import React from "react";
import {
  TextField,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Select,
  Stack,
  Paper,
  Breadcrumbs,
  Grid,
  Chip,
} from "@mui/material";
import Resizer from "react-image-file-resizer";
import store from "../../../index";
import {
  fileUpload,
  fnFileUpload,
  fnImageUpload,
  imageUpload,
} from "../../../store/reducers/Imguploadreducer";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import * as Yup from "yup";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Field, Formik } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  postData,
  getFetchData,
  PartyBankget,
  partyBankpostData,
  PartyContactget,
  partyContactData,
  VendorRegisterpostData,
  VendorRegisterFetchData,
  VendorDefaultPUTdata,
  VendorDefaultFetchData,
  explorePostData,
} from "../../../store/reducers/Formapireducer";
import { useEffect, useState, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../Theme";
import { formGap } from "../../../ui-components/global/utils";
import {
  CheckinAutocomplete,
  OrderItemAutocomplete,
} from "../../../ui-components/global/Autocomplete";
import { fetchExplorelitview } from "../../../store/reducers/Explorelitviewapireducer";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { dataGridHeaderFooterHeight, dataGridHeight, dataGridHeightExplore, dataGridRowHeight } from "../../../ui-components/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { breadcrumbStyles } from "../../../Theme";

const Editvendor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const location = useLocation();
  const isLoading = useSelector((state) => state.formApi.postLoading);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);
  // Redux state
  const [page, setPage] = React.useState(secondaryCurrentPage);
  const data = useSelector((state) => state.formApi.Data);
  const getLoading = useSelector((state) => state.formApi.getLoading);
  const state = location.state || {};
  const partyBankgetloading = useSelector(
    (state) => state.formApi.partyBankgetloading
  );
  const partyBankgetdata = useSelector(
    (state) => state.formApi.partyBankgetdata
  );
  const partyContactgetdata = useSelector(
    (state) => state.formApi.partyContactgetdata
  );
  const partyRegistergetdata = useSelector(
    (state) => state.formApi.vendorregisterGetData
  );
  const isPartyRegisterLoading = useSelector(
    (state) => state.formApi.vendorregisterGetDataloading
  );
  const partyDefaultgetdata = useSelector(
    (state) => state.formApi.vendorDefaultGetData
  );
  const isPartyDeaultLoading = useSelector(
    (state) => state.formApi.vendorDefaultGetDataloading
  );

  const YearFlag = sessionStorage.getItem("YearFlag");
  const Year = sessionStorage.getItem("year");
  const Finyear = sessionStorage.getItem("YearRecorid");
  const CompanyID = sessionStorage.getItem("compID");
  const CompanyAutoCode = sessionStorage.getItem("CompanyAutoCode");
  const LoginID = sessionStorage.getItem("loginrecordID");
  const SubscriptionCode = sessionStorage.getItem("SubscriptionCode") || "";
  const lastThree = SubscriptionCode?.slice(-3) || "";
  const Subscriptionlastthree = ["001", "002", "003", "004"].includes(lastThree)
    ? lastThree
    : "";
  const [panImage, setPanImage] = useState("");
  const [ID1Image, setID1Image] = useState("");
  const [ID2Image, setID2Image] = useState("");
  var secondaryCurrentPage = parseInt(
    sessionStorage.getItem("secondaryCurrentPage")
  );
  const [panUrl, setPanUrl] = useState(null);
  const [gstImage, setGstImage] = useState("");
  const [gstUrl, setGstUrl] = useState(null);
  console.log(panImage, "panImage");
  console.log(panImage.name, "panImage");
  console.log(gstImage, "gstImage");
  console.log(gstImage.name, "gstImage");
  const [show, setScreen] = React.useState("0");
  const recID = params.id;
  const mode = params.Mode;
  const accessID = params.accessID;
  const [errorMsgData, setErrorMsgData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [validationSchema2, setValidationSchema2] = useState(null);
  const [validationSchema3, setValidationSchema3] = useState(null);
  const [validationSchema4, setValidationSchema4] = useState(null);

  const [funMode, setFunMode] = useState("A");
  const [laomode, setLaoMode] = useState("A");
  const colors = tokens(theme.palette.mode);

  const [sectionsOpen, setSectionsOpen] = useState(true);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/validationcms.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch validationcms.json");
        return res.json();
      })
      .then((data) => {
        setErrorMsgData(data);

        let schemaFields = {
          name: Yup.string().trim().required(data.Party.name),

          mobilenumber: Yup.string()
            .required(data.Party.mobilenumber)
            // .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),
            .matches(/^(\d{10,11})$/, "Enter a valid Mobile or Landline Number"),

          emailid: Yup.string()
            .nullable()
            .notRequired()
            .trim()
            .test(
              "email-or-empty",
              "Invalid Email ID",
              (value) => !value || Yup.string().email().isValidSync(value)
            ),
        };
        // locality: Yup.object().required(data.Party.locality).nullable(),
        //ReferenceBy: Yup.object().required(data.Party.ReferenceBy).nullable(),
        if (CompanyAutoCode === "N") {
          schemaFields.code = Yup.string().required(data.Party.code);
        }

        // schemaFields.Pancardnumber = Yup.string()
        //   .nullable()
        //   .notRequired()
        //   .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, data.Party.Pancardnumber)
        //   .transform((value) => (value === "" ? null : value));

        // schemaFields.gstnumber = Yup.string()
        //   .nullable()
        //   .notRequired()
        //   .matches(
        //     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        //     data.Party.gstnumber
        //   )
        //   .transform((value) => (value === "" ? null : value));

        const schema = Yup.object().shape(schemaFields);
        const schema2 = Yup.object().shape({
          bankname: Yup.string().trim().required(data.BankDetails.bankname),
          branchname: Yup.string().trim().required(data.BankDetails.branchname),
          Accounttype: Yup.string().trim().required(data.BankDetails.Accounttype),
          ifsc: Yup.string()
            .required(data.BankDetails.ifsc)
            .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
          accountnumber: Yup.string()
            .required(data.BankDetails.accountnumber)
            .matches(/^\d{9,18}$/, "Invalid Account Number"),
          bankloc: Yup.string().trim().required(data.BankDetails.bankloc),
          accountholdname: Yup.string().trim().required(
            data.BankDetails.accountholdname
          ),
          bankaddress: Yup.string().trim().required(data.BankDetails.bankaddress),
        });
        const schema3 = Yup.object().shape({
          name1: Yup.string().trim().required(data.Contactdetails.name1),
          emailid1: Yup.string()
            .email("Invalid Email ID")
            .required(data.Contactdetails.emailid1),
          mobileno1: Yup.string()
            .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
            .required(data.Contactdetails.mobileno1),
          aadharcardnumber2: Yup.string()
            .nullable()
            .notRequired()
            .transform((value) => (value === "" ? null : value))
            .matches(/^\d{12}$/, data.Contactdetails.aadharcardnumber2),
          aadharcardnumber1: Yup.string()
            .nullable()
            .notRequired()
            .transform((value) => (value === "" ? null : value))
            .matches(/^\d{12}$/, data.Contactdetails.aadharcardnumber1),
        });
        const schema4 = Yup.object().shape({
          Pancardnumber: Yup.string()
            .nullable()
            .notRequired()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, data.Party.Pancardnumber)
            .transform((value) => (value === "" ? null : value)),

          gstnumber: Yup.string()
            .nullable()
            .notRequired()
            .matches(
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
              data.Party.gstnumber
            )
            .transform((value) => (value === "" ? null : value)),
        });

        setValidationSchema(schema);
        setValidationSchema2(schema2);
        setValidationSchema3(schema3);
        setValidationSchema4(schema4);
      })
      .catch((err) => console.error("Error loading validationcms.json:", err));
  }, [CompanyAutoCode]);

  // useEffect(() => {
  //   if (recID && mode === "E") {
  //     dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
  //   } else {
  //     dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
  //   }
  // }, [location.key, recID, mode]);
  useEffect(() => {
    if (show == "0") {
      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
      }
    }
  }, [location.key, recID, mode, show]);

  const explorelistViewData = useSelector(
    (state) => state.exploreApi.explorerowData
  );
  const explorelistViewcolumn = useSelector(
    (state) => state.exploreApi.explorecolumnData
  );
  const exploreLoading = useSelector((state) => state.exploreApi.loading);

  // let VISIBLE_FIELDS;

  // if (show == "5") {
  //   VISIBLE_FIELDS = [
  //     "slno",
  //     "NextRenewalRequiredDate",
  //     "Description",
  //     "Category",
  //     "action",
  //   ];
  // }
  const VISIBLE_FIELDS =
    show == "5"
      ? [
        "slno",
        "Code",
        "Documents",
        // "Party",
        // "Unit",
        "action",
      ]
      : [];
  const columns = React.useMemo(() => {
    let visibleColumns = explorelistViewcolumn.filter((column) =>
      VISIBLE_FIELDS.includes(column.field)
    );

    if (VISIBLE_FIELDS.includes("slno")) {
      const slnoColumn = {
        field: "slno",
        headerName: "SL#",
        width: 50,
        sortable: false,
        filterable: false,
        // valueGetter: (params) =>
        //   page * pageSize +
        //   params.api.getRowIndexRelativeToVisibleRows(params.id) +
        //   1,
        renderCell: (params) => params.row.SLNO,

      };
      visibleColumns = [slnoColumn, ...visibleColumns];
    }

    return visibleColumns;
  }, [explorelistViewcolumn, VISIBLE_FIELDS]);
  const [rowCount, setRowCount] = useState(0);
  const [uploadFile, setUploadFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const [empLoaData, SetEmpLoaData] = useState({
    recordID: "",
    description: "",
    category: "",
    RenewalDate: "",
    personal: false,
    renewal: false,
    Attachment: "",
  });
  if (!data && getLoading) {
    return <LinearProgress />;
  }

  const contactvalidationSchema = Yup.object().shape({
    name1: Yup.string().required("Name is required"),
    emailid1: Yup.string()
      .email("Invalid email format")
      .required("Email ID is required"),
    mobileno1: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile No must be 10 digits")
      .required("Mobile No is required"),
    // name2: Yup.string().required('Name is required'),
    // emailid2: Yup.string()
    //   .email('Invalid email format')
    //   .required('Email ID is required'),
    // mobileno2: Yup.string()
    //   .matches(/^[0-9]{10}$/, 'Mobile No must be 10 digits')
    //   .required('Mobile No is required'),
  });
  const getFileID1Change = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setID1Image(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  const getFileID2Change = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setID2Image(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  const getFilepanChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setPanImage(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };
  console.log(panImage, "does");
  const getFilegstChange = async (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      let fileInput = !!event.target.result;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            files[0],
            150,
            150,
            "JPEG",
            100,
            0,
            async (uri) => {
              const formData = { image: uri, type: "images" };
              const fileData = await dispatch(imageUpload({ formData }));
              console.log("Uploaded File Response:", fileData);

              if (fileData?.payload?.Status === "Y") {
                toast.success(fileData.payload.Msg);
                setGstImage(fileData.payload.name);
              } else {
                toast.error("File upload failed.");
              }
            },
            "base64",
            150,
            150
          );
        } catch (err) {
          console.log(err);
          toast.error("An error occurred during file processing.");
        }
      }
    };
  };

  // **********ScreenChange Function*********

  const screenChange = (event) => {
    setScreen(event.target.value);
    if (event.target.value == "0") {
      console.log(event.target.value, "--find event.target.value");

      if (recID && mode === "E") {
        dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
      } else {
        dispatch(getFetchData({ accessID: "TR243", get: "get", recID }));
      }
    }
    if (event.target.value == "3") {
      if (recID && mode === "E") {
        dispatch(VendorRegisterFetchData({ get: "get", recID }));
      } else {
        dispatch(VendorRegisterFetchData({ get: "", recID }));
      }
    }
    if (event.target.value == "4") {
      if (recID && mode === "E") {
        dispatch(VendorDefaultFetchData({ get: "get", recID }));
      } else {
        dispatch(VendorDefaultFetchData({ get: "", recID }));
      }
    }
    if (event.target.value == "5") {
      dispatch(
        fetchExplorelitview(
          "TR364",
          Subscriptionlastthree,
          "Party Documents",
          // `PartyID='${recID}' AND CompanyID='${CompanyID}'`,
          `CompanyID='${CompanyID}' AND (FIND_IN_SET('${recID}', DOC_HVRECID))`,
          ""
        )
      );

    }
    if (event.target.value == "1") {
      dispatch(PartyContactget({ VendorID: recID }));
    }

    if (event.target.value == "2") {
      dispatch(PartyBankget({ VendorID: recID }));
    }
  };


  const changeHandler = async (event) => {
    setUploading(true);   // Start loader

    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "images");

    const fileData = await dispatch(fnFileUpload(formData));
    var filePath = store.getState().globalurl.attachmentUrl + uploadFile

    console.log("fileData" + JSON.stringify(fileData));
    setUploadFile(fileData.payload.apiResponse);

    setUploading(false);  // Stop loader
  };

  const fnViewFile = (values) => {
    const baseUrl = store.getState().globalurl.attachmentUrl;

    const fileName = uploadFile || values.Attachment; // ✅ KEY FIX

    console.log("Final fileName:", fileName);

    if (!fileName) {
      toast.error("No file to view");
      return;
    }

    const encodedFileName = encodeURIComponent(fileName);
    const filePath = `${baseUrl}${encodedFileName}`;

    console.log("Opening:", filePath);

    window.open(filePath, "_blank");
  };

  function Employee() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>
            {show == "5"
              ? "List of Documents"
              : ""
            }
          </Typography>
          {show != "20" && (<Typography variant="h5">{`(${rowCount})`}</Typography>)}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <GridToolbarQuickFilter />
          {show != "5" && (
            <Tooltip title="ADD">
              <IconButton type="reset">
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>)}
        </Box>
      </GridToolbarContainer>
    );
  }
  // Page params

  const InitialValue = {
    code: data.Code || "",
    name: data.Name || "",
    Pancardnumber: data.PanCardNo || "",
    locality:
      data.LocalityID && data.LocalityID !== "0"
        ? {
          RecordID: data.LocalityID,
          Code: data.LocalityCode,
          Name: data.LocalityName,
        }
        : null,
    ReferenceBy:
      data.ReferenceID && data.ReferenceID !== "0"
        ? {
          RecordID: data.ReferenceID,
          Code: data.ReferenceByName,
          Name: data.ReferenceByName,
        }
        : null,
    address: data.Address || "",
    maplink: data.MapLocation || "",
    PanImg: data.PanImg || "",
    GstImg: data.gstImage || "",
    gstnumber: data.GstNo || "",
    mobilenumber: data.MobileNo || "",
    date: data.RegistrationDate || "",
    verifieddate: data.VerifyConfirmDate || "",
    emailid: data.EmailID || "",
    vendor: data.VendorCheckbox === "Y" ? true : false,
    customer: data.CustomerCheckbox === "Y" ? true : false,
    // prospect: data.Prospects === "Y" ? true : false,
    prospect:
      data?.RecordID
        ? data?.Prospects === "Y"   // EDIT mode
        : true,                     // ADD mode
    delete: data.DeleteFlag === "Y" ? true : false,
    BusinessPartner: data.BusinessPartner === "Y" ? true : false,
    Parent: data.ParentCheckBox === "Y" ? true : false,
    disable: data.Disable === "Y" ? true : false,
  };
  console.log(data.PanImg, "dooo");
  const Fnsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    // var isCheck = "N";
    // if (values.disable == true) {
    //   isCheck = "Y";
    // }

    // const isCheck = values.disable ? "Y" : "N";

    const idata = {
      RecordID: recID,
      Code: values.code,
      Name: values.name,
      LocalityID: values.locality?.RecordID || 0,
      LocalityName: values.locality?.Name || "",
      ReferenceID: values.ReferenceBy?.RecordID || 0,
      ReferenceName: values.ReferenceBy?.Name || "",
      PanCardNo: values.Pancardnumber,
      Address: values.address,
      MapLocation: values.maplink,
      PanImg: panImage,
      GstNo: values.gstnumber,
      GstImg: gstImage,
      MobileNo: values.mobilenumber,
      RegistrationDate: values.date,
      VerifyConfirmDate: values.verifieddate,
      EmailID: values.emailid,
      CompanyID,
      VendorCheckbox: values.vendor === true ? "Y" : "N",
      CustomerCheckbox: values.customer === true ? "Y" : "N",
      Prospects: values.prospect === true ? "Y" : "N",
      // LocalityID: "1",
      DeleteFlag: values.delete == true ? "Y" : "N",
      BusinessPartner: values.BusinessPartner == true ? "Y" : "N",
      ParentCheckBox: values.Parent == true ? "Y" : "N",
      Disable: values.disable == true ? "Y" : "N",
      Source: "Cloud",
      CreateBy: LoginID,
    };

    try {
      const response = await dispatch(postData({ accessID: "TR243V1", action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
        navigate("/Apps/TR321/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  //   const RegisterInitialValue = {
  //   Pancardnumber: data.PanCardNo || "",
  //   PanImg: data.PanImg || "",
  //   GstImg: data.gstImage || "",
  //   gstnumber: data.GstNo || "",
  // };
  const RegisterInitialValue = {
    code: partyRegistergetdata.Code || "",
    name: partyRegistergetdata.Name || "",
    Pancardnumber: partyRegistergetdata.PanCardNo || "",
    PanImg: partyRegistergetdata.PanImg || "",
    GstImg: partyRegistergetdata.GstImg || "",
    gstnumber: partyRegistergetdata.GstNo || "",
    date: partyRegistergetdata.RegistrationDate || "",
    verifieddate: partyRegistergetdata.VerifyConfirmDate || "",
    // aadharcardnumber: partyRegistergetdata.aadharcardnumber || ""
  };

  const RegisterFnsave = async (values, del) => {
    setLoading(true);
    // if (!panImage && !values.PanImg) {
    //   toast.error("Please upload PAN image before saving.");
    //   return;
    // }
    // if (!gstImage && !values.GstImg) {
    //   toast.error("Please upload GST image before saving.");
    //   return;
    // }
    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: recID,
      PanCardNo: values.Pancardnumber,
      PanImg: panImage || values.PanImg,
      GstNo: values.gstnumber,
      GstImg: gstImage || values.GstImg,
      RegistrationDate: values.date,
      VerifyConfirmDate: values.verifieddate,
      // aadharcardnumber: values.aadharcardnumber
    };

    try {
      const response = await dispatch(
        VendorRegisterpostData({ accessID: "TR243", action, idata })
      );

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  const DefaultInitialValue = {
    code: partyDefaultgetdata.Code || "",
    name: partyDefaultgetdata.Name || "",
    Product:
      partyDefaultgetdata.DefaultProductID &&
        partyDefaultgetdata.DefaultProductID !== "0"
        ? {
          RecordID: partyDefaultgetdata.DefaultProductID,
          Name: partyDefaultgetdata.DefaultProductName,
        }
        : partyDefaultgetdata.DefaultProductID == null
          ? []
          : null,
    defaultDelivery: partyDefaultgetdata.DeliveryCharge || 0,
    DefaultPaymentMode: partyDefaultgetdata.DefaultPaymentMode || "",
    // DefaultPaymentMode:
    //   partyDefaultgetdata.DefaultPaymentMode === "COD"
    //     ? "COD"
    //     : partyDefaultgetdata.DefaultPaymentMode === "UPI"
    //     ? "UPI"
    //     : partyDefaultgetdata.DefaultPaymentMode === "Others"
    //     ? "Others"
    //     : null,
  };

  const DefaultFnsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";
    const idata = {
      RecordID: recID,
      DefaultProduct: values.Product.RecordID || 0,
      DeliveryCharge: values.defaultDelivery || 0,
      DefaultPaymentMode: values.DefaultPaymentMode || "",
    };

    try {
      const response = await dispatch(
        VendorDefaultPUTdata({ accessID: "TR243", action, idata })
      );

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };
  const BankInitialValue = {
    code: partyBankgetdata.Code || "",
    name: partyBankgetdata.Name || "",
    bankname: partyBankgetdata.BankName || "",
    Accounttype: partyBankgetdata.BankAccountType || "",
    branchname: partyBankgetdata.BankBranchName || "",
    ifsc: partyBankgetdata.BankIfsc || "",
    bankloc: partyBankgetdata.BankLocation || "",
    accountnumber: partyBankgetdata.BankAccountNo || "",
    bankaddress: partyBankgetdata.BankAddress || "",
    accountholdname: partyBankgetdata.BankAccountHolderName || "",
  };

  const Banksave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      VendorID: recID,
      BankName: values.bankname,
      BankBranchName: values.branchname,
      BankAccountHolderName: values.accountholdname,
      BankAccountNo: values.accountnumber,
      BankAccountType: values.Accounttype,
      BankIfsc: values.ifsc,
      BankLocation: values.bankloc,
      BankAddress: values.bankaddress,
    };

    try {
      const response = await dispatch(partyBankpostData({ action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  //Contact Details
  const contactInitialValue = {
    code: partyContactgetdata.Code || "",
    name: partyContactgetdata.Name || "",
    name1: partyContactgetdata.ContactPerson1 || "",
    name2: partyContactgetdata.ContactPerson2 || "",
    emailid1: partyContactgetdata.ContactPersonEmailID1 || "",
    emailid2: partyContactgetdata.ContactPersonEmailID2 || "",
    mobileno1: partyContactgetdata.ContactPersonMobileNo1 || "",
    mobileno2: partyContactgetdata.ContactPersonMobileNo2 || "",
    aadharcardnumber1: partyContactgetdata.AadhatNo1 || "",
    aadharcardnumber2: partyContactgetdata.AadhatNo2 || "",
    ContactPersonIDProofImg1:
      partyContactgetdata.ContactPersonIDProofImg1 || "",
    ContactPersonIDProofImg2:
      partyContactgetdata.ContactPersonIDProofImg2 || "",
  };
  const contactsave = async (values, del) => {
    setLoading(true);

    let action =
      mode === "A" && !del
        ? "insert"
        : mode === "E" && del
          ? "harddelete"
          : "update";

    const idata = {
      VendorID: recID,
      ContactPerson1: values.name1,
      ContactPerson2: values.name2,
      ContactPersonEmailID1: values.emailid1,
      ContactPersonEmailID2: values.emailid2,
      ContactPersonMobileNo1: values.mobileno1,
      ContactPersonMobileNo2: values.mobileno2,
      AadhatNo1: values.aadharcardnumber1,
      AadhatNo2: values.aadharcardnumber2,
      // ContactPersonIDProofImg1: data.ContactPersonIDProofImg1 || ID1Image,
      // ContactPersonIDProofImg2: data.ContactPersonIDProofImg2 || ID2Image,
      ContactPersonIDProofImg1: ID1Image || partyContactgetdata.ContactPersonIDProofImg1,
      ContactPersonIDProofImg2: ID2Image || partyContactgetdata.ContactPersonIDProofImg2,
    };

    try {
      const response = await dispatch(partyContactData({ action, idata }));

      if (response.payload.Status === "Y") {
        toast.success(response.payload.Msg);
        // navigate("/Apps/TR243/Party");
      } else {
        toast.error(response.payload.Msg);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };


  const selectCellRowData = ({ rowData, mode, field, setFieldValue }) => {
    setFunMode(mode);
    setLaoMode(mode);

    if (mode == "A") {
      SetEmpLoaData({
        description: "",
        Attachment: "",
        recordID: "",
        category: "",
        RenewalDate: "",
        personal: false,
        renewal: false,
      });
    } else {

      if (field == "action") {
        SetEmpLoaData({
          description: rowData.Description,
          recordID: rowData.RecordID,
          category: rowData.Category,
          RenewalDate: rowData.NextRenewalRequiredDate,
          personal: rowData.Personal,
          renewal: rowData.RenewalRequired,
          Attachment: rowData.Attachment,
        });
      }
    }
    console.log(selectCellRowData, "Itemservices");
  };


  const AttachmentInitialValues = {
    code: data.Code,
    description: data.Name,
    LoaDescription: empLoaData.description,
    personal: empLoaData.personal === "Y" ? true : false,
    renewal: empLoaData.renewal === "Y" ? true : false,
    // category: Data.Category,
    Attachment: empLoaData.Attachment || "",
    category:
      empLoaData.category == "Education"
        ? "EC"
        : empLoaData.category == "Insurance "
          ? "IS"
          : empLoaData.category == "Award "
            ? "AD"
            : empLoaData.category == "Certificate "
              ? "CT"
              : empLoaData.category == "Warranty "
                ? "WT"
                : empLoaData.category == "Others "
                  ? "OS"
                  : "",
    RenewalDate: empLoaData.RenewalDate || "",
    Sortorder: "",
  };
  const FnAttachment = async (values, resetForm, del) => {
    let action =
      laomode === "A" && !del
        ? "insert"
        : laomode === "E" && del
          ? "harddelete"
          : "update";

    console.log(values);

    const idata = {
      RecordID: empLoaData.recordID,
      EmployeeID: recID,
      Description: values.LoaDescription,
      //  ImageName: ImageName ? ImageName:Data.ImageName,
      Attachment: uploadFile || values.Attachment || "",
      Personal: values.personal === true ? "Y" : "N",
      RenewalRequired: values.renewal === true ? "Y" : "N",
      Category: values.category,
      NextRenewalRequiredDate: values.RenewalDate,
      Sortorder: 0,
      CompanyID,
    };
    const response = await dispatch(
      explorePostData({ accessID: "TR210", action, idata })
    );
    if (response.payload.Status == "Y") {
      toast.success(response.payload.Msg);
      dispatch(
        fetchExplorelitview(
          "TR210",
          "List of Documents",
          `EmployeeID=${recID}`,
          ""
        )
      );
      resetForm();
      selectCellRowData({ rowData: {}, mode: "A", field: "" });
      resetForm();
    } else {
      toast.error(response.payload.Msg);
    }
  };


  const fnLogOut = (props) => {
    Swal.fire({
      title: errorMsgData.Warningmsg[props],
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
          // navigate("/Apps/TR243/Party");
          navigate("/Apps/TR321/Party");
        }
      }
    });
  };


  //For popup modal

  const formSections = [
    {
      value: "0",
      label: "Party",
      desc: "Basic party information and details",
      icon: "🏢",
    },
    {
      value: "3",
      label: "Registration",
      desc: "PAN, GST and registration documents",
      icon: "📝",
    },
    {
      value: "4",
      label: "Default Settings",
      desc: "Default product and payment mode",
      icon: "⚙️",
    },
    {
      value: "2",
      label: "Bank Details",
      desc: "Bank account and branch information",
      icon: "🏦",
    },
    {
      value: "1",
      label: "Contact Details",
      desc: "Contact persons and ID proofs",
      icon: "📞",
    },
    {
      value: "5",
      label: "List Of Documents",
      desc: "Uploaded party documents",
      icon: "📄",
    },
  ];

  function FormSectionsSidebar({ show, screenChange, sections, open, onToggle }) {
    return (
      <Box
        sx={{
          width: open ? 250 : 70,
          transition: "all .3s",
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 3,
          position: "sticky",
          top: 10,
          height: "calc(100vh - 20px)",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent={open ? "space-between" : "center"}
          alignItems="center"
          p={2}
          borderBottom="1px solid #E5E7EB"
        >
          {open && <Typography fontWeight={700}>Explore</Typography>}
          <IconButton size="small" onClick={onToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        <Stack spacing={0.5} p={1}>
          {sections.map((item) => {
            const active = String(show) === String(item.value);

            return (
              <Tooltip key={item.value} title={!open ? item.label : ""} placement="right">
                <Box
                  onClick={() => screenChange({ target: { value: item.value } })}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.25,
                    cursor: "pointer",
                    borderRadius: 2,
                    bgcolor: active ? "#EEF2FF" : "transparent",
                    "&:hover": {
                      bgcolor: "#F3F4F6",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: active ? "#E0E7FF" : "#F3F4F6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 18,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {open && (
                    <Box>
                      <Typography fontWeight={active ? 700 : 500} color={active ? "#4F46E5" : "inherit"}>
                        {item.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    );
  }

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "6px",
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#bfc4cc" },
      "&.Mui-focused fieldset": { borderColor: "#d1d5db", borderWidth: "1px" },
    },
    "& .MuiInputLabel-root": { color: "#6b7280" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#6b7280" },
  };



  return (
    <React.Fragment>
      {getLoading ? <LinearProgress /> : null}

      {/* BREADCRUMBS */}
      <Paper
        elevation={0}
        sx={{
          mx: 2,
          mt: 2,
          mb: 1,
          p: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          bgcolor: "#fff",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* LEFT */}
          <Box display="flex" alignItems="center" gap={2}>
            {broken && !rtl && (
              <IconButton
                onClick={() => toggleSidebar()}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}

            <Box>
            
              {/* Breadcrumb */}
              <Breadcrumbs
                separator={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                sx={breadcrumbStyles.separator}
              >
                <Typography
                  sx={breadcrumbStyles.item}
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  {mode === "E"
                    ? `Party (${state.PName})`
                    : "Party (New)"}
                </Typography>

                {show == "1" && (
                  <Typography sx={breadcrumbStyles.active}>
                    Contact Details
                  </Typography>
                )}

                {show == "2" && (
                  <Typography sx={breadcrumbStyles.active}>
                    Bank Details
                  </Typography>
                )}

                {show == "3" && (
                  <Typography sx={breadcrumbStyles.active}>
                    Registration
                  </Typography>
                )}

                {show == "4" && (
                  <Typography sx={breadcrumbStyles.active}>
                    Default Settings
                  </Typography>
                )}

                {show == "5" && (
                  <Typography sx={breadcrumbStyles.active}>
                    List Of Documents
                  </Typography>
                )}
              </Breadcrumbs>
            </Box>
          </Box>

          {/* RIGHT */}
          <Box display="flex">
            <Tooltip title="Close">
              <IconButton
                onClick={() => fnLogOut("Close")}
                sx={{
                  color: "#DC2626",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
                }}
              >
                <ResetTvIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                onClick={() => fnLogOut("Logout")}
                sx={{
                  color: "#DC2626",
                  "&:hover": {
                    bgcolor: "#FEE2E2",
                  },
                }}
              >
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>



      {/* {!getLoading ? ( */}
      {show == "0" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={InitialValue}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    Fnsave(values);
                  }, 100);
                }}
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
                    {/* ----- CARD HEADER ----- */}
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        🏢
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#4F46E5">
                          Party
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Basic party information and details
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display="grid"
                      gap="20px"
                      padding={1}
                      gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                      }}
                    >
                      {CompanyAutoCode == "Y" ? (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label="Code"
                          placeholder="Auto"
                          variant="outlined"
                          size="small"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          InputProps={{ readOnly: true }}
                          sx={textFieldSx}
                        />
                      ) : (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label={
                            <>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>*</span>
                            </>
                          }
                          variant="outlined"
                          size="small"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          sx={textFieldSx}
                          autoFocus
                        />
                      )}

                      <TextField
                        name="name"
                        type="text"
                        id="name"
                        label={
                          <>
                            Name
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={textFieldSx}
                        autoFocus={CompanyAutoCode == "Y"}
                      />

                      <TextField
                        name="mobilenumber"
                        id="mobilenumber"
                        label={
                          <>
                            Contact Mobile or Landline Number
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.mobilenumber}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,11}$/.test(value)) {
                            handleChange(e);
                          }
                        }}
                        error={!!touched.mobilenumber && !!errors.mobilenumber}
                        helperText={touched.mobilenumber && errors.mobilenumber}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          inputProps: { style: { textAlign: "left" } },
                        }}
                        sx={textFieldSx}
                      />

                      <TextField
                        name="emailid"
                        type="text"
                        id="emailid"
                        label="Email ID"
                        variant="outlined"
                        size="small"
                        value={values.emailid}
                        error={!!touched.emailid && !!errors.emailid}
                        helperText={touched.emailid && errors.emailid}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />

                      <TextField
                        name="address"
                        type="text"
                        id="address"
                        label="Address"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        value={values.address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />

                      <CheckinAutocomplete
                        id="locality"
                        name="locality"
                        label="Locality"
                        variant="outlined"
                        value={values.locality}
                        onChange={(newValue) => {
                          setFieldValue("locality", newValue);
                        }}
                        error={!!touched.locality && !!errors.locality}
                        helperText={touched.locality && errors.locality}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2128","ScreenName":"Locality","Filter":"CompanyID=${CompanyID}","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
                      />

                      <TextField
                        name="maplink"
                        type="text"
                        id="maplink"
                        label="Map Location"
                        variant="outlined"
                        size="small"
                        value={values.maplink}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />

                      <CheckinAutocomplete
                        id="ReferenceBy"
                        name="ReferenceBy"
                        label="Partner Reference"
                        variant="outlined"
                        value={values.ReferenceBy}
                        onChange={(newValue) => {
                          setFieldValue("ReferenceBy", newValue);
                        }}
                        url={`${listViewurl}?data={"Query":{"AccessID":"2131","ScreenName":"Partner Reference","Filter":"ParentID=${CompanyID}","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
                      />

                      <Box
                        sx={{
                          gridColumn: "span 2",
                          mt: 1,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          flexWrap="nowrap"
                          sx={{
                            "& > div": {
                              display: "flex",
                              alignItems: "center",
                              whiteSpace: "nowrap",
                            },
                          }}
                        >
                          <Box>
                            <Field
                              type="checkbox"
                              name="vendor"
                              id="vendor"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Vendor/Supplier</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="customer"
                              id="customer"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Customer</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="prospect"
                              id="prospect"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Prospects</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="BusinessPartner"
                              id="BusinessPartner"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Partner</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="Parent"
                              id="Parent"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Parent</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="delete"
                              id="delete"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Delete</FormLabel>
                          </Box>

                          <Box>
                            <Field
                              type="checkbox"
                              name="disable"
                              id="disable"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              as={Checkbox}
                            />
                            <FormLabel focused={false}>Disable</FormLabel>
                          </Box>
                        </Box>
                      </Box>

                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                      {YearFlag == "true" ? (
                        <LoadingButton
                          variant="contained"
                          type="submit"
                          loading={isLoading}
                          sx={{ textTransform: "none", borderRadius: 2, px: 4, bgcolor: "#0D9488", "&:hover": { bgcolor: "#0F766E" } }}
                        >
                          Save
                        </LoadingButton>
                      ) : (
                        <Button variant="contained" disabled sx={{ textTransform: "none", borderRadius: 2, px: 4 }}>
                          Save
                        </Button>
                      )}
                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => navigate("/Apps/TR321/Party")}
                        sx={{ textTransform: "none", borderRadius: 2, px: 4, bgcolor: "#F97316", "&:hover": { bgcolor: "#EA580C" } }}
                      >
                        Back
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}

      {show == "1" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={contactInitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    contactsave(values);
                  }, 100);
                }}
                validationSchema={validationSchema3}
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
                    {/* ----- CARD HEADER ----- */}
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        📞
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#4F46E5">
                          Contact Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Contact persons and ID proofs
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display="grid"
                      gap='20px'
                      padding={1}
                      gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                      }}
                    >
                      {CompanyAutoCode == "Y" ? (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          placeholder="Auto"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          InputProps={{ readOnly: true }}
                          sx={textFieldSx}
                        />
                      ) : (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label={
                            <>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          variant="outlined"
                          size="small"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          sx={textFieldSx}
                          autoFocus
                        />
                      )}
                      <TextField
                        name="name"
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        InputProps={{
                          inputProps: {
                            readOnly: true,
                          },
                        }}
                        sx={textFieldSx}
                        autoFocus={CompanyAutoCode == "Y"}
                      />

                      <Box
                        sx={{
                          padding: 1.5,
                          backgroundColor: "#b2dfdb",
                          borderRadius: 1,
                          width: "100%",
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          Contact Person 1
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          padding: 1.5,
                          backgroundColor: "#b2dfdb",
                          borderRadius: 1,
                          width: "100%",
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          Contact Person 2
                        </Typography>
                      </Box>

                      <TextField
                        name="name1"
                        label={
                          <>
                            Name
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.name1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.name1 && !!errors.name1}
                        helperText={touched.name1 && errors.name1}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="name2"
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={values.name2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.name2 && !!errors.name2}
                        helperText={touched.name2 && errors.name2}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="emailid1"
                        type="tel"
                        id="emailid1"
                        label={
                          <>
                            Email ID
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.emailid1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.emailid1 && !!errors.emailid1}
                        helperText={touched.emailid1 && errors.emailid1}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="emailid2"
                        type="text"
                        id="emailid2"
                        label="Email ID"
                        variant="outlined"
                        size="small"
                        value={values.emailid2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="mobileno1"
                        type="tel"
                        id="mobileno1"
                        label={
                          <>
                            Mobile No
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.mobileno1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.mobileno1 && !!errors.mobileno1}
                        helperText={touched.mobileno1 && errors.mobileno1}
                        inputProps={{ maxLength: 10 }}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="mobileno2"
                        type="tel"
                        id="mobileno2"
                        label="Mobile No"
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 10 }}
                        value={values.mobileno2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        id="aadharcardnumber1"
                        name="aadharcardnumber1"
                        value={values.aadharcardnumber1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Aadhar Card No"
                        error={
                          touched.aadharcardnumber1 &&
                          Boolean(errors.aadharcardnumber1)
                        }
                        helperText={
                          touched.aadharcardnumber1 && errors.aadharcardnumber1
                        }
                        sx={textFieldSx}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        id="aadharcardnumber2"
                        name="aadharcardnumber2"
                        value={values.aadharcardnumber2}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Aadhar Card No"
                        error={
                          touched.aadharcardnumber2 &&
                          Boolean(errors.aadharcardnumber2)
                        }
                        helperText={
                          touched.aadharcardnumber2 && errors.aadharcardnumber2
                        }
                        sx={textFieldSx}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Tooltip title="ID Proof">
                            <IconButton
                              size="small"
                              color="warning"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="all/*"
                                type="file"
                                onChange={getFileID1Change}
                              />
                              <PictureAsPdfOutlinedIcon />
                            </IconButton>
                          </Tooltip>

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              partyContactgetdata.ContactPersonIDProofImg1 || ID1Image
                                ? window.open(
                                  ID1Image
                                    ? store.getState().globalurl.attachmentUrl +
                                    ID1Image
                                    : store.getState().globalurl.attachmentUrl +
                                    partyContactgetdata.ContactPersonIDProofImg1,
                                  "_blank"
                                )
                                : toast.error("Please Upload File");
                            }}
                          >
                            ID Proof View
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Tooltip title="ID Proof">
                            <IconButton
                              size="small"
                              color="warning"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="all/*"
                                type="file"
                                onChange={getFileID2Change}
                              />
                              <PictureAsPdfOutlinedIcon />
                            </IconButton>
                          </Tooltip>

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              partyContactgetdata.ContactPersonIDProofImg2 || ID2Image
                                ? window.open(
                                  ID2Image
                                    ? store.getState().globalurl.attachmentUrl +
                                    ID2Image
                                    : store.getState().globalurl.attachmentUrl +
                                    partyContactgetdata.ContactPersonIDProofImg2,
                                  "_blank"
                                )
                                : toast.error("Please Upload File");
                            }}
                          >
                            ID Proof View
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                      {YearFlag == "true" ? (
                        <LoadingButton
                          variant="contained"
                          type="submit"
                          loading={isLoading}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                            bgcolor: "#0D9488",
                            "&:hover": { bgcolor: "#0F766E" },
                          }}
                        >
                          Save
                        </LoadingButton>
                      ) : (
                        <Button
                          color="secondary"
                          variant="contained"
                          disabled={true}
                          sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                        >
                          Save
                        </Button>
                      )}

                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          setScreen(0);
                        }}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 4,
                          bgcolor: "#F97316",
                          "&:hover": { bgcolor: "#EA580C" },
                        }}
                      >
                        Back
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}

      {show == "2" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={BankInitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    Banksave(values);
                  }, 100);
                }}
                validationSchema={validationSchema2}
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
                    {/* ----- CARD HEADER ----- */}
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        🏦
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#4F46E5">
                          Bank Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Bank account and branch information
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display="grid"
                      gap='20px'
                      padding={1}
                      gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                      }}
                    >
                      {CompanyAutoCode == "Y" ? (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          placeholder="Auto"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          InputProps={{ readOnly: true }}
                          sx={textFieldSx}
                        />
                      ) : (
                        <TextField
                          name="code"
                          type="text"
                          id="code"
                          label={
                            <>
                              Code
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </>
                          }
                          variant="outlined"
                          size="small"
                          value={values.code}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                          sx={textFieldSx}
                          autoFocus
                        />
                      )}
                      <TextField
                        name="name"
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        InputProps={{
                          inputProps: {
                            readOnly: true,
                          },
                        }}
                        sx={textFieldSx}
                        autoFocus={CompanyAutoCode == "Y"}
                      />
                      <TextField
                        name="bankname"
                        type="text"
                        id="bankname"
                        label={
                          <>
                            Bank Name
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.bankname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.bankname && !!errors.bankname}
                        helperText={touched.bankname && errors.bankname}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="Accounttype"
                        type="text"
                        id="Accounttype"
                        label={
                          <>
                            Account Type
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.Accounttype}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.Accounttype && !!errors.Accounttype}
                        helperText={touched.Accounttype && errors.Accounttype}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="branchname"
                        label={
                          <>
                            Branch Name
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.branchname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.branchname && !!errors.branchname}
                        helperText={touched.branchname && errors.branchname}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="ifsc"
                        label={
                          <>
                            IFSC Code
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.ifsc}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const input = e.target.value.toUpperCase();
                          if (/^[0-9A-Z]*$/.test(input) || input === "") {
                            handleChange({
                              target: {
                                name: "ifsc",
                                value: input,
                              },
                            });
                          }
                        }}
                        error={!!touched.ifsc && !!errors.ifsc}
                        helperText={touched.ifsc && errors.ifsc}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="accountholdname"
                        type="text"
                        id="accountholdname"
                        label={
                          <>
                            Account Holder Name
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.accountholdname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.accountholdname && !!errors.accountholdname
                        }
                        helperText={
                          touched.accountholdname && errors.accountholdname
                        }
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="bankloc"
                        type="text"
                        id="bankloc"
                        label={
                          <>
                            Bank Location
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.bankloc}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                        autoFocus
                        error={!!touched.bankloc && !!errors.bankloc}
                        helperText={touched.bankloc && errors.bankloc}
                      />
                      <TextField
                        name="accountnumber"
                        type="text"
                        id="accountnumber"
                        label={
                          <>
                            Account Number
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.accountnumber}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const input = e.target.value;
                          if (/^\d*$/.test(input)) {
                            handleChange({
                              target: {
                                name: "accountnumber",
                                value: input,
                              },
                            });
                          }
                        }}
                        error={!!touched.accountnumber && !!errors.accountnumber}
                        helperText={touched.accountnumber && errors.accountnumber}
                        sx={textFieldSx}
                        autoFocus
                      />
                      <TextField
                        name="bankaddress"
                        type="text"
                        id="bankaddress"
                        label={
                          <>
                            Bank Address
                            <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        value={values.bankaddress}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={textFieldSx}
                        error={!!touched.bankaddress && !!errors.bankaddress}
                        helperText={touched.bankaddress && errors.bankaddress}
                        autoFocus
                      />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                      {YearFlag == "true" ? (
                        <LoadingButton
                          variant="contained"
                          type="submit"
                          loading={isLoading}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                            bgcolor: "#0D9488",
                            "&:hover": { bgcolor: "#0F766E" },
                          }}
                        >
                          Save
                        </LoadingButton>
                      ) : (
                        <Button
                          color="secondary"
                          variant="contained"
                          disabled={true}
                          sx={{ textTransform: "none", borderRadius: 2, px: 4 }}
                        >
                          Save
                        </Button>
                      )}
                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                          setScreen(0);
                        }}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          px: 4,
                          bgcolor: "#F97316",
                          "&:hover": { bgcolor: "#EA580C" },
                        }}
                      >
                        Back
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}

      {show == "3" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={RegisterInitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    RegisterFnsave(values);
                  }, 100);
                }}
                validationSchema={validationSchema4}
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
                    {!isPartyRegisterLoading ? (
                      <>
                        {/* ----- CARD HEADER ----- */}
                        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              backgroundColor: "#EFF6FF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                            }}
                          >
                            📝
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight={700} color="#4F46E5">
                              Registration
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              PAN, GST and registration documents
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          display="grid"
                          gap='20px'
                          padding={1}
                          gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 2",
                            },
                          }}
                        >
                          {CompanyAutoCode == "Y" ? (
                            <TextField
                              name="code"
                              type="text"
                              id="code"
                              label="Code"
                              variant="outlined"
                              size="small"
                              placeholder="Auto"
                              value={values.code}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.code && !!errors.code}
                              helperText={touched.code && errors.code}
                              InputProps={{ readOnly: true }}
                              sx={textFieldSx}
                            />
                          ) : (
                            <TextField
                              name="code"
                              type="text"
                              id="code"
                              label={
                                <>
                                  Code
                                  <span style={{ color: "red", fontSize: "20px" }}>
                                    *
                                  </span>
                                </>
                              }
                              variant="outlined"
                              size="small"
                              value={values.code}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.code && !!errors.code}
                              helperText={touched.code && errors.code}
                              sx={textFieldSx}
                              autoFocus
                            />
                          )}
                          <TextField
                            name="name"
                            type="text"
                            id="name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            InputProps={{
                              inputProps: {
                                readOnly: true,
                              },
                            }}
                            sx={textFieldSx}
                            autoFocus={CompanyAutoCode == "Y"}
                          />
                          <TextField
                            name="Pancardnumber"
                            label="Pan Card Number"
                            variant="outlined"
                            size="small"
                            value={values.Pancardnumber}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              const input = e.target.value.toUpperCase();
                              if (/^[A-Z0-9]*$/.test(input) || input === "") {
                                handleChange({
                                  target: {
                                    name: "Pancardnumber",
                                    value: input,
                                  },
                                });
                              }
                            }}
                            error={
                              !!touched.Pancardnumber && !!errors.Pancardnumber
                            }
                            helperText={
                              touched.Pancardnumber && errors.Pancardnumber
                            }
                            sx={textFieldSx}
                            autoFocus
                          />
                          <TextField
                            name="gstnumber"
                            label="GST Number"
                            variant="outlined"
                            size="small"
                            value={values.gstnumber}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              const input = e.target.value.toUpperCase();
                              if (/^[0-9A-Z]*$/.test(input) || input === "") {
                                handleChange({
                                  target: {
                                    name: "gstnumber",
                                    value: input,
                                  },
                                });
                              }
                            }}
                            error={!!touched.gstnumber && !!errors.gstnumber}
                            helperText={touched.gstnumber && errors.gstnumber}
                            sx={textFieldSx}
                          />
                          <TextField
                            name="date"
                            type="date"
                            id="date"
                            label="Date of Registration"
                            variant="outlined"
                            size="small"
                            inputFormat="YYYY-MM-DD"
                            value={values.date}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                            sx={textFieldSx}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            name="verifieddate"
                            type="date"
                            id="verifieddate"
                            label="Date of Verification & Confirmation"
                            variant="outlined"
                            size="small"
                            inputFormat="YYYY-MM-DD"
                            value={values.verifieddate}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                            sx={textFieldSx}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>

                        <Box display="flex" justifyContent="end" gap={2} mt={4} flexWrap="wrap">
                          <Tooltip title="PAN Upload">
                            <IconButton
                              size="small"
                              color="warning"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="all/*"
                                type="file"
                                onChange={getFilepanChange}
                              />
                              <PictureAsPdfOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Button
                            size="small"
                            variant="contained"
                            component={"a"}
                            onClick={() => {
                              data.PanImg || panImage
                                ? window.open(
                                  panImage
                                    ? store.getState().globalurl.attachmentUrl +
                                    panImage
                                    : store.getState().globalurl.attachmentUrl +
                                    data.PanImg,
                                  "_blank"
                                )
                                : toast.error("Please Upload File");
                            }}
                          >
                            PAN Image View
                          </Button>

                          <Tooltip title="GST Upload">
                            <IconButton
                              size="small"
                              color="warning"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input
                                hidden
                                accept="all/*"
                                type="file"
                                onChange={getFilegstChange}
                              />
                              <PictureAsPdfOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Button
                            size="small"
                            variant="contained"
                            component={"a"}
                            onClick={() => {
                              data.GstImg || gstImage
                                ? window.open(
                                  gstImage
                                    ? store.getState().globalurl.attachmentUrl +
                                    gstImage
                                    : store.getState().globalurl.attachmentUrl +
                                    data.GstImg,
                                  "_blank"
                                )
                                : toast.error("Please Upload File");
                            }}
                          >
                            GST Image View
                          </Button>

                          <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={isLoading}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 4,
                              bgcolor: "#0D9488",
                              "&:hover": { bgcolor: "#0F766E" },
                            }}
                          >
                            Save
                          </LoadingButton>

                          <Button
                            color="warning"
                            variant="contained"
                            onClick={() => {
                              setScreen(0);
                            }}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 4,
                              bgcolor: "#F97316",
                              "&:hover": { bgcolor: "#EA580C" },
                            }}
                          >
                            Back
                          </Button>
                        </Box>
                      </>
                    ) : (
                      false
                    )}
                  </form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}

      {show == "4" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={DefaultInitialValue}
                onSubmit={(values, setSubmitting) => {
                  setTimeout(() => {
                    DefaultFnsave(values);
                  }, 100);
                }}
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
                    {!isPartyDeaultLoading ? (
                      <>
                        {/* ----- CARD HEADER ----- */}
                        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              backgroundColor: "#EFF6FF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                            }}
                          >
                            ⚙️
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight={700} color="#4F46E5">
                              Default Settings
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Default product and payment mode
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          display="grid"
                          gap='20px'
                          padding={1}
                          gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 2",
                            },
                          }}
                        >
                          {CompanyAutoCode == "Y" ? (
                            <TextField
                              name="code"
                              type="text"
                              id="code"
                              label="Code"
                              variant="outlined"
                              size="small"
                              placeholder="Auto"
                              value={values.code}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.code && !!errors.code}
                              helperText={touched.code && errors.code}
                              InputProps={{ readOnly: true }}
                              sx={textFieldSx}
                            />
                          ) : (
                            <TextField
                              name="code"
                              type="text"
                              id="code"
                              label={
                                <>
                                  Code
                                  <span style={{ color: "red", fontSize: "20px" }}>
                                    *
                                  </span>
                                </>
                              }
                              variant="outlined"
                              size="small"
                              value={values.code}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.code && !!errors.code}
                              helperText={touched.code && errors.code}
                              sx={textFieldSx}
                              autoFocus
                            />
                          )}
                          <TextField
                            name="name"
                            type="text"
                            id="name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            InputProps={{
                              inputProps: {
                                readOnly: true,
                              },
                            }}
                            sx={textFieldSx}
                            autoFocus={CompanyAutoCode == "Y"}
                          />
                          <OrderItemAutocomplete
                            id="Product"
                            name="Product"
                            label="Default Product"
                            variant="outlined"
                            value={values.Product}
                            onChange={(newValue) => {
                              setFieldValue("Product", newValue);
                              console.log(newValue, "--newvalue Product");
                              console.log(newValue.RecordID, "Product RecordID");
                            }}
                            error={!!touched.Product && !!errors.Product}
                            helperText={touched.Product && errors.Product}
                            url={`${listViewurl}?data={"Query":{"AccessID":"2137","ScreenName":"Product","Filter":"CompanyID='${CompanyID}' AND ItemsDesc ='Product'","Any":"","VerticalLicense":"${Subscriptionlastthree}"}}`}
                          />
                          <TextField
                            name="defaultDelivery"
                            label="Default Delivery Charges"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={values.defaultDelivery}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              !!touched.defaultDelivery && !!errors.defaultDelivery
                            }
                            helperText={
                              touched.defaultDelivery && errors.defaultDelivery
                            }
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            sx={textFieldSx}
                          />
                          <TextField
                            select
                            label="Default Payment Mode"
                            id="DefaultPaymentMode"
                            name="DefaultPaymentMode"
                            value={values.DefaultPaymentMode}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              sessionStorage.setItem(
                                "DefaultPaymentMode",
                                e.target.value
                              );
                            }}
                            variant="outlined"
                            size="small"
                            sx={textFieldSx}
                          >
                            <MenuItem value="COD">Cash On Delivery</MenuItem>
                            <MenuItem value="UPI">UPI</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                          </TextField>
                        </Box>

                        <Box display="flex" justifyContent="end" gap={2} mt={4}>
                          <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={isLoading}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 4,
                              bgcolor: "#0D9488",
                              "&:hover": { bgcolor: "#0F766E" },
                            }}
                          >
                            Save
                          </LoadingButton>

                          <Button
                            color="warning"
                            variant="contained"
                            onClick={() => {
                              setScreen(0);
                            }}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 4,
                              bgcolor: "#F97316",
                              "&:hover": { bgcolor: "#EA580C" },
                            }}
                          >
                            Back
                          </Button>
                        </Box>
                      </>
                    ) : (
                      false
                    )}
                  </form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}


      {show == "5" ? (
        <Box display="flex" gap={3} alignItems="flex-start" flexWrap="wrap" sx={{ p: 1 }}>
          {mode !== "A" && (
            <FormSectionsSidebar
              show={show}
              screenChange={screenChange}
              sections={formSections}
              open={sectionsOpen}
              onToggle={() => setSectionsOpen((p) => !p)}
            />
          )}
          <Box flex={1} minWidth={0} display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Formik
                initialValues={InitialValue}
                enableReinitialize={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  resetForm,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    onReset={() => {
                      selectCellRowData({ rowData: {}, mode: "A", field: "" });
                      resetForm();
                    }}
                  >
                    {/* ----- CARD HEADER ----- */}
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: "#EFF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        📄
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#4F46E5">
                          List Of Documents
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Uploaded party documents
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display="grid"
                      gap={formGap}
                      padding={1}
                      gridTemplateColumns="repeat(2 , minMax(0,1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="text"
                        id="code"
                        name="code"
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={textFieldSx}
                      />

                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Name"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={textFieldSx}
                      />
                    </Box>

                    <Box
                      padding={1}
                      m="5px 0 0 0"
                      height={dataGridHeightExplore}
                      sx={{
                        "& .MuiDataGrid-root": {
                          border: "none",
                        },
                        "& .cell-negative-status": {
                          color: colors.redAccent[500],
                          fontWeight: 600,
                        },
                        "& .cell-positive-status": {
                          color: colors.greenAccent[400],
                          fontWeight: 600,
                        },
                        "& .MuiDataGrid-cell": {
                          borderBottom: "none",
                        },
                        "& .name-column--cell": {
                          color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: colors.blueAccent[800],
                          borderBottom: "none",
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
                          color: "",
                        },
                        "& .even-row": {
                          backgroundColor: "",
                          color: "",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                          color: colors.blueAccent[900],
                          fontWeight: 600,
                        },
                        "& .MuiTablePagination-root": {
                          color: "#fff",
                        },
                        "& .MuiTablePagination-selectLabel": {
                          color: "#fff",
                        },
                        "& .MuiTablePagination-displayedRows": {
                          color: "#fff",
                        },
                        "& .MuiTablePagination-selectIcon": {
                          color: "#fff",
                        },
                        "& .MuiTablePagination-actions button": {
                          color: "#fff",
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
                        rows={explorelistViewData}
                        columns={columns}
                        disableSelectionOnClick
                        getRowId={(row) => row.RecordID}
                        rowHeight={dataGridRowHeight}
                        headerHeight={dataGridHeaderFooterHeight}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        onCellClick={(params) => {
                          selectCellRowData({
                            rowData: params.row,
                            mode: "E",
                            field: params.field,
                          });
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        components={{
                          Toolbar: Employee,
                        }}
                        onStateChange={(stateParams) =>
                          setRowCount(stateParams.pagination.rowCount)
                        }
                        loading={exploreLoading}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                        getRowClassName={(params) =>
                          params.indexRelativeToCurrentPage % 2 === 0
                            ? "odd-row"
                            : "even-row"
                        }
                      />
                    </Box>
                  </form>
                )}
              </Formik>

              <Box display="flex" justifyContent="space-between" padding={1}>
                <Box>
                  <Typography fontWeight={600} fontSize={15} lineHeight={1} mb={1} ml={0.5}>
                    Actions Guide
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap="15px"
                    sx={{ overflowY: "auto" }}
                  >
                    <Chip
                      icon={<VisibilityIcon color="primary" />}
                      label="Open Document"
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" padding={1}>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      setScreen("0");
                    }}
                    sx={{ textTransform: "none", borderRadius: 2, px: 4, bgcolor: "#F97316", "&:hover": { bgcolor: "#EA580C" } }}
                    
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

export default Editvendor;
