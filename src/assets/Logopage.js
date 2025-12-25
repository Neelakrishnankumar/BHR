// import React from "react";

// const Logopage = () => {
//   return (
//     <div style={{ 
//         display: "flex", 
//         flexDirection: "column",  // Stack items vertically
//         justifyContent: "center", 
//         alignItems: "center", 
//         height: "100vh" 
//       }}>
//         {/* <img src="/bexlogo.jpg" alt="Logo" style={{ width: "300px", height: "auto" }} /> */}
//         <img src="/BexATM.png" alt="Logo" style={{ width: "300px", height: "auto" }} />
//         <h3 style={{ marginTop: "10px" }}>Back Office System</h3>  
//       </div>
      
//   );
// };

// export default Logopage;
import React, { useState, useEffect } from "react";
import BackOfficelogoV1 from "../assets/img/B2025-ATM01.png"; // adjust path if needed
// import store from "../redux/store"; // adjust path if needed
import store from "..";
// const Logopage = () => {
//   const [logoSrc, setLogoSrc] = useState(BackOfficelogoV1);

//   useEffect(() => {
//     const sessionLogo = sessionStorage.getItem("logoimage");
//     const CompanyLogo = sessionStorage.getItem("CompanyLogo");
//     if (sessionLogo) {
//       setLogoSrc(
//         store.getState().globalurl.attachmentUrl + sessionLogo
//       );
//     } else {
//       setLogoSrc(BackOfficelogoV1);
//     }
//   }, []);
const Logopage = () => {
  const [logoSrc, setLogoSrc] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Always read latest values
      const companyLogo = sessionStorage.getItem("CompanyLogo");
      const sessionLogo = sessionStorage.getItem("logoimage") || companyLogo;

      const newLogo = sessionLogo
        ? store.getState().globalurl.attachmentUrl + sessionLogo
        : BackOfficelogoV1;

      setLogoSrc((prev) => (prev !== newLogo ? newLogo : prev));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={logoSrc}
        alt="Logo"
        style={{ width: "300px", height: "auto", objectFit: "contain" }}
      />
      <h3 style={{ marginTop: "10px" }}>Back Office System</h3>
    </div>
  );
};

export default Logopage;
