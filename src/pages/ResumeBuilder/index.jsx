import React from "react";
import ComingSoon from "../../components/ComingSoon";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

const index = () => {
  return (
    <div>
      <ComingSoon />
    </div>
  );
};

export default withHeaderFooter(index);
