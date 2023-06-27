import React from "react";

import "../Common.scss";

import { Header, AuthContent, Footer, SEO } from "../../components";

import "./SignupPage.scss";

function SignupPage() {
  return (
    <>
    <SEO title='Sheकुंज - Signup' />
      <div className="noselect">
        
        <Header loginPage={true} />

        <AuthContent />

        <Footer loginPage={true} />
      </div>
    </>
  );
}

export default SignupPage;
