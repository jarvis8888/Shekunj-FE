import React from "react";
import { Footer, Header } from "../components";

export const withHeaderFooter = (WrappedComponent, urlLangShow= false) => {
  const WithHeaderFooter = React.memo((props) => {
    return (
      <>
        <Header newDesign urlLangShow={urlLangShow} />
        <WrappedComponent {...props} />
        <Footer newDesign />
      </>
    );
  });
  return WithHeaderFooter;
};
