import React from "react";

import { TopFooter } from "./TopFooter";

const Footer = ({ loginPage, subPage, newDesign = false }) => {
  return (
    <>
      <TopFooter newDesign={newDesign} />
    </>
  );
};

export default Footer;
