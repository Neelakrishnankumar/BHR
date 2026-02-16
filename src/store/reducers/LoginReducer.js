import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import store from "../../index";
import { toast } from "react-toastify";
import { createAction } from "@reduxjs/toolkit";

const initialState = {
  loginData: {},
  Status: "N",
  msg: "",
  loading: false,
  error: "",
};

export const authentication = createAsyncThunk(
  "lgems/authentication",
  async ({ idata }) => {
    var url = store.getState().globalurl.authUrl;
    var data = {
      ...idata
    };
    console.log("🚀 ~ file: Formapireducer.js:334 ~ data:", JSON.stringify(data))

    const response = await axios.post(url, data, {
      method: "POST",

      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    console.log("🚀 ~ file: Formapireducer.js:345 ~ response:", response)
    return response.data;
  }
);


//API Forgot Password

export const ForgotPasswordRequest = async (requestData) => {
  const url = store.getState().globalurl.forgotPasswordUrl;
  console.log('find the url', url);

  if (!url) {
    console.error("Forgot password URL not found in Redux store");
    throw new Error("API URL missing");
  }
  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error in ForgotPasswordRequest:", error);
    throw error;
  }
};


//Change Password

export const ChangePasswordRequest = async (requestData) => {
  const url = store.getState().globalurl.settingsPostUrl; // URL from the store
  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
      },
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error in ForgotPasswordRequest:", error);
    throw error;
  }
};


export const getApiSlice = createSlice({
  name: "loginApi",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    Success(state, action) {
      console.log(
        "stage6--LoginReducer--inside Sucess reducer data" +
        JSON.stringify(action.payload)
      );

      return {
        ...state,
        loading: false,
        error: "",
        loginData: action.payload.apiResponse,
        Status: action.payload.Status,
        msg: action.payload.Msg,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authentication.pending, (state, action) => {
        state.Status = "idle";
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.Status = "success";
        state.loading = false;
      })
      .addCase(authentication.rejected, (state, action) => {
        state.Status = "Error";
        state.loading = false;
        toast.error('Something Went Wrong')
      })
  }
});

// Destructure and export the plain action creators
export const {
  pending,
  errored,

  Success,
} = getApiSlice.actions;

export default getApiSlice.reducer;

export function fetchApidata(emailID, password, license, company, year) {
  return async (dispatch) => {
    function onSuccess(success) {
      console.log("2---" + JSON.stringify(success.data));
      localStorage.setItem("loginUserData", JSON.stringify(success.data.Data));
      const datawait = dispatch(
        Success({
          Status: success.data.Status,
          apiResponse: success.data.Data,
          Msg: success.data.Msg,
          SubscriptionCode: success.data.SubscriptionCode,
          Expiryin: success.data.Expiryin,
          CompanyAutoCode: success.data.CompanyAutoCode,
          CompanyGraceTime: success.data.CompanyGraceTime,
          CompanySessionTimeOut: success.data.CompanySessionTimeOut,
          CompanyLogo: success.data.CompanyLogo,
          CompanyHeader: success.data.CompanyHeader,
          CompanyFooter: success.data.CompanyFooter,
          firstLogin: success.data.FirstTime,
          subscription: success.data.subscription
        })
      );
      return datawait;
    }
    function onError(error) {
      const errorMsg = error.response.data.Msg || "Something went wrong!";
      dispatch(errored(errorMsg));
      toast.error(errorMsg);
      return errorMsg;
    }

    try {
      var url = store.getState().globalurl.loginUrl;
      var idata = {
        Query: {
          username: emailID,
          password: password,
          //yearrecordid: year,
          LicenseKey: license,
        },
      };
      dispatch(pending());
      idata = JSON.stringify(idata);
      // console.log("🚀 ~ file: LoginReducer.js:94 ~ r eturn ~ idata:", idata)
      const success = await axios.get(url, {
        params: {
          data: idata,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };

}
export const attachmentPost = createAsyncThunk(
  "attachmentPost/postdata",
  async ({ data }, thunkAPI) => {
    try {
      var url = store.getState().globalurl.empAttachmentUrl;
      console.log("get" + JSON.stringify(data));
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
        },
      });
      console.log("🚀 ~ response.data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAction("loginApi/logout");
