import React from "react";

import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const Header = ({ page, subPage }) => {
  return (
    <>
      <TopNavbar />
      <Navbar />
    </>
  );
};

export default Header;
