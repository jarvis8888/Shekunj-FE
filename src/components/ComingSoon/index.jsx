import React from "react";
import "./index.scss";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import comingsoon from "../../assets/images/comingsoon.svg";
import { Footer, Header } from "../../components";
import { useHistory } from "react-router-dom";

const ComingSoon = () => {
  const history = useHistory();
  return (
    <div>
      <Header page='404' />
      <section className='sk-notFound-sec'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-6 col-lg-6 col-md-7 order-2 order-md-1'>
              <div className='sk-notFound-box'>
                <div className='py-3'>
                  <h3>Under</h3>
                  <h3> Construction</h3>
                </div>

                <p>
                  Our website is currently undergoing scheduled maintenance.
                </p>
                <p>We Should be back shortly. Thank you for your patience</p>
                <div className='sk-notFound-btn'>
                  <button className='sk-btn' onClick={() => history.push(`/`)}>
                    Back to Home <EastRoundedIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-5 order-1 order-md-2'>
              <div className='sk-notFound-img'>
                <img src={comingsoon} alt='comingsoon' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ComingSoon;
