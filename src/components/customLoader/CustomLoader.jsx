import React from "react";
import "./index.scss";
import globalLoader from "../../assets/icons/svgs/globalLoader.svg";

export const CustomLoader = ({ size }) => {
  return (
    <div className={`loader-wrap ${size === "small" ? "size" : ""}`}>
      <img src={globalLoader} alt='globalLoader' />
    </div>
  );
};
