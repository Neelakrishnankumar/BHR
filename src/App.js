import React from "react";
import { Routes, Route } from "react-router-dom";
import Apps from "./apps/Apps";
import Login from "./apps/Security/Login";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import SubscriptionScreen from "./apps/Security/SubscriptionRenewal";
import UnderMaintenance from "./apps/pages/UnderMaintanance";


const App = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    window.history.pushState(null, document.title, "#");
  }
  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
              <Route path="/*" element={<UnderMaintenance />} />
        {/* <Route path="/*" element={<Login />} /> */}
        <Route path="/Apps/*" element={<Apps />} />
        <Route path="/SubscriptionScreen" element={<SubscriptionScreen/>} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
