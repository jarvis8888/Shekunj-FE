import React from "react";

import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

const Header = ({ page, subPage }) => {
  return (
    <>
      <header className="">
        <TopNavbar />
        <Navbar />
      </header>
    </>
  );
};

export default Header;
