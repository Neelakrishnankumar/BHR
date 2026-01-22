import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userActivityLog } from "../Formapireducer";

export const activityListener = createListenerMiddleware();

activityListener.startListening({
  // matcher: (action) =>
  //   action.type.endsWith("/fulfilled") &&
  //   !action.type.startsWith("activity/log"), // prevent loop

  matcher: (action) =>
    (action.type.endsWith("/fulfilled") &&
      !action.type.startsWith("activity/log")) ||
       action.type === "exploreApi/Success" ||
       action.type === "imageApi/Success" ||
    action.type === "loginApi/Success" ||
    action.type === "loginApi/logout" ||
    action.type === "formApi/Success",

  effect: async (action, listenerApi) => {
    if (action.type === "loginApi/logout") {
      listenerApi.dispatch(
        userActivityLog({
          RecordID: "-1",
          UserID: sessionStorage.getItem("loginrecordID") || "0",
          CompanyID: sessionStorage.getItem("compID") || "0",
          AccessID: "Logout",
          Activity: "logout",
          Type:"B",
        })
      );

      // Optional cleanup
      sessionStorage.clear();
      localStorage.clear();

      return;
    }

    if (action.type === "loginApi/Success") {
      listenerApi.dispatch(
        userActivityLog({
          RecordID: "-1",
          UserID: action.payload?.apiResponse?.Recordid || "0",
          CompanyID: action.payload?.apiResponse?.CompanyRecordid || "0",
          AccessID: "Login",
          Activity: "login",
          Type:"B",
        })
      );
      return; // ✅ VERY IMPORTANT (prevents double logging)
    }
    if (action.type === "formApi/Success") {
      listenerApi.dispatch(
        userActivityLog({
          RecordID: "-1",
          UserID:
            sessionStorage.getItem("loginrecordID") ||
            listenerApi.getState().loginApi?.userID ||
            "0",
          CompanyID:
            sessionStorage.getItem("compID") ||
            listenerApi.getState().loginApi?.CompanyID ||
            "0",
          AccessID: action.payload?.accessID || "fetchApidata",
          Activity: action.payload?.action || "success",
          Type:"B",
        })
      );
      return; // ✅ VERY IMPORTANT
    }


    if (action.type === "exploreApi/Success") {
      listenerApi.dispatch(
        userActivityLog({
          RecordID: "-1",
          UserID:
            sessionStorage.getItem("loginrecordID") ||
            listenerApi.getState().loginApi?.userID ||
            "0",
          CompanyID:
            sessionStorage.getItem("compID") ||
            listenerApi.getState().loginApi?.CompanyID ||
            "0",
          AccessID: action.payload?.accessID || "formApi",
          Activity: action.payload?.action || "success",
          Type:"B",
        })
      );
      return;
    }
    if (action.type === "imageApi/Success") {
      listenerApi.dispatch(
        userActivityLog({
          RecordID: "-1",
          UserID:
            sessionStorage.getItem("loginrecordID") ||
            listenerApi.getState().loginApi?.userID ||
            "0",
          CompanyID:
            sessionStorage.getItem("compID") ||
            listenerApi.getState().loginApi?.CompanyID ||
            "0",
          AccessID: action.payload?.accessid || "formApi",
          Activity: action.payload?.action || "success",
          Type:"B",
        })
      );
      return;
    }

    const arg = action.meta?.arg || {};

    /* ================================
       1️⃣ USER & COMPANY (SESSION FIRST)
    ================================= */
    const UserID =
      sessionStorage.getItem("loginrecordID") ||
      listenerApi.getState().loginApi?.userID ||
      "0";

    const CompanyID =
      sessionStorage.getItem("compID") ||
      listenerApi.getState().loginApi?.CompanyID ||
      "0";

    const thunkName = action.type.split("/")[0]; // 👈 Party, allScreen, etc.

    /* ================================
       2️⃣ ACCESS ID OR SCREEN NAME
    ================================= */
    const AccessOrScreen =
      arg.accessID ||
      arg.AccessID ||
      arg.screenName ||
      // sessionStorage.getItem("ScreenName") ||
      // listenerApi.getState().screenRights?.currentScreenName ||
      thunkName ||
      "NA";

    /* ================================
       3️⃣ ACTIVITY (FULLY FLEXIBLE)
    ================================= */
    let Activity = action.type.split("/")[1] || "success";

    // Highest priority: explicitly passed activity
    if (arg.activity) {
      Activity = arg.activity; // edit / detail / pdf / custom
    }
    // Next: action
    else if (arg.action) {
      Activity = arg.action; // insert / update / delete
    }
    // Next: GET
    else if (arg.get === "get") {
      Activity = "get";
    }

    /* ================================
       4️⃣ DISPATCH ACTIVITY LOG
    ================================= */
    listenerApi.dispatch(
      userActivityLog({
        RecordID: "-1",
        UserID,
        CompanyID,
        AccessID: AccessOrScreen, // may be AccessID or ScreenName
        Activity,
        Type:"B",
      })
    );
  },
});
