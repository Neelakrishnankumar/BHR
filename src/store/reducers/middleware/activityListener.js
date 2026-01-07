import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userActivityLog } from "../Formapireducer";

export const activityListener = createListenerMiddleware();

activityListener.startListening({
  matcher: (action) =>
    action.type.endsWith("/fulfilled") &&
    !action.type.startsWith("activity/log"), // prevent loop

  effect: async (action, listenerApi) => {
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
    let Activity = "success";

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
      })
    );
  },
});
