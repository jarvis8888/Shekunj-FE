import React from "react";
import "./index.scss";
import noData from "../../assets/icons/svgs/NoData.svg";

export const NoDataFound = ({ size }) => {
  return (
    <div className={`loader-wrap ${size === "small" ? "size" : ""}`}>
      <img src={noData} alt='globalLoader' />
    </div>
  );
};
