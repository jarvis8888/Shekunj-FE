import React, { memo } from "react";
import "./index.scss";

const AddsBanner = (props) => {
  const { color, data, children } = props;
  return (
    <>
      <div className='add-banner' style={{ backgroundColor: color }}>
        <div className='rectangle'>{children}</div>
      </div>
    </>
  );
};
export default memo(AddsBanner);
