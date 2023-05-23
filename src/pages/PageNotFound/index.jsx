import React from "react";
import "./index.scss";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import pagenotfound from"../../assets/images/pagenotf.svg" ;
import { Footer, Header } from "../../components";

const PageNotFound = () => {
  return (
    <div>
      <Header page='404' />
      <section className="sk-notFound-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-7">
              <div className="sk-notFound-box">
                  <h1>Ooops.</h1>
                  <div className="py-3">
                    <h3>Relax, take it easy</h3>
                    <h3> Keep fresh your mind!</h3>
                  </div>
                  <p>This page doesn’t exist or was removed!</p> 
                  <p>We suggest you back to home</p>
                  <div className="sk-notFound-btn">
                    <button className="sk-btn">Back to Home <EastRoundedIcon /></button>
                  </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-5">
              <div className="sk-notFound-img">
                <img src={pagenotfound} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PageNotFound;
