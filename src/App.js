import React from "react";
import { Routes, Route } from "react-router-dom";
import Apps from "./apps/Apps";
import Login from "./apps/Security/Login";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import SubscriptionScreen from "./apps/Security/SubscriptionRenewal";
import UnderMaintenance from "./apps/pages/UnderMaintanance";
import ChangeyourPassword from "./apps/Security/Passwordflow";
import ChangeyourPassword_1 from "./apps/Security/Passwordflow";
import LoginChangepass from "./apps/Security/Loginchangepassword";


const App = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    window.history.pushState(null, document.title, "#");
  }
  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
              {/* <Route path="/*" element={<UnderMaintenance />} /> */}
        <Route path="/*" element={<Login />} />
        <Route path="/Apps/*" element={<Apps />} />
        {/* <Route path="/Forgotpassword" element={<Forgotlogin />} /> */}
          <Route path="/ChangeyourPassword_2" element={<LoginChangepass />} />
         <Route path="/ChangeyourPassword_1" element={<ChangeyourPassword_1 />} />
        <Route path="/SubscriptionScreen" element={<SubscriptionScreen/>} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
