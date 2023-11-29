import React from "react";

import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const Header = ({ page, subPage, newDesign = false }) => {
  return (
    <>
      <TopNavbar newDesign={newDesign} />
      <Navbar newDesign={newDesign} />
    </>
  );
};

export default Header;
