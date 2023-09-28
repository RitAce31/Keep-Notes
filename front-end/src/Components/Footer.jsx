import React from "react";
import "../style.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer">Copyright © {year}</footer>
    </>
  );
};
export default Footer;
