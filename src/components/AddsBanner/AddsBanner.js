import React, { memo } from "react";
import "./index.scss";

const AddsBanner = (props) => {
  const { color } = props;
  return (
    <>
      <div className='add-banner' style={{ backgroundColor: color }}>
        <div className='rectangle'>Add comes here </div>
      </div>
    </>
  );
};
export default memo(AddsBanner);
