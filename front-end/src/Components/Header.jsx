import React from "react";
import logo from "./Images/logo.png";
import "../style.css";
const Header = () => {
  return (
    <>
      <div className="header">
        <img
          src={logo}
          alt="logo"
          height="70px"
          width="70px"
          style={{ marginRight: "20px" }}
        />
        <h1>Google Keep</h1>
      </div>
    </>
  );
};
export default Header;
