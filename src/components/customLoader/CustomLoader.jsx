import React from "react";
import "./index.scss";
import globalLoader from "../../assets/icons/svgs/globalLoader.svg";

export const CustomLoader = ({ size }) => {
  return (
    <div className={size === "small" ? "size" : ""}>
      <img src={globalLoader} alt='globalLoader' />
    </div>
  );
};
