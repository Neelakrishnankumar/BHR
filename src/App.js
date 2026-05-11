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
import Logochange from "./apps/Security/Changelogo";
import Forgetpassword_1 from "./apps/Security/Forgetpswrd";
import Forgetpassword_2 from "./apps/Security/Forgetchangepswrd";
import EditadmissionForm_v1 from "./apps/pages/Empolyee/EditadmissionForm_v1";

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
         <Route path="/AdmissionForm" element={<EditadmissionForm_v1 />} />
        {/* <Route path="/Forgotpassword" element={<Forgotlogin />} /> */}
          {/* <Route path="/ChangeyourPassword_3" element={<LoginChangepass />} />
          <Route path="/ChangeyourPassword_2" element={<Logochange />} />
         <Route path="/ChangeyourPassword_1" element={<ChangeyourPassword_1 />} /> */}
        <Route path="/SubscriptionScreen" element={<SubscriptionScreen/>} />
        <Route path="/Forgotpassword" element={<Forgetpassword_1/>} />
        <Route path="/Changepassword" element={<Forgetpassword_2/>} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
