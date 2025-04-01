import React from "react";

const Logopage = () => {
  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "column",  // Stack items vertically
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <img src="/bexlogo.jpg" alt="Logo" style={{ width: "300px", height: "auto" }} />
        <h3 style={{ marginTop: "10px" }}>HR Management</h3>  
      </div>
      
  );
};

export default Logopage;