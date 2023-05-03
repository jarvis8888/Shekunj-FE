import React from "react";

import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const Header = ({ page, subPage, newDesign = false, urlLangShow }) => {
  return (
    <>
      <TopNavbar newDesign={newDesign} urlLangShow={urlLangShow} />
      <Navbar newDesign={newDesign} />
    </>
  );
};

export default Header;
