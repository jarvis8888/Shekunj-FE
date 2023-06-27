import React from "react";
import { Header, AuthContent, Footer, SEO } from "../../components";
import "../../pages/responsive.scss";

import "./LoginPage.scss";

function LoginPage() {
  return (
    <>
      <SEO title='Sheकुंज - Login' />
      <div className='noselect'>
        <Header loginPage={true} />

        <AuthContent loginPage={true} />

        <Footer loginPage={true} />
      </div>
    </>
  );
}

export default LoginPage;
