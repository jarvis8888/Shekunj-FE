import React from "react";
import "./index.scss";
import globalLoader from "../../assets/icons/svgs/globalLoader.svg";

export const CustomLoader = ({ size }) => {
  return (
    <div className={`loader-wrap`}>
      <img src={globalLoader} alt='globalLoader' />
    </div>
  );
};
