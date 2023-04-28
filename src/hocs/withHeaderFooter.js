import React from 'react';
import { Footer, Header } from '../components';

export const withHeaderFooter = (WrappedComponent) => {
  const WithHeaderFooter = React.memo((props) => {
    return (
      <>
       <Header/>
        <WrappedComponent {...props} />
       <Footer/>
      </>
    );
  });
  return WithHeaderFooter;
};

;
