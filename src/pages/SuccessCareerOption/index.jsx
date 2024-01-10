import React, { useEffect } from "react";
import { Header, Footer } from "../../components";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";

import "aos/dist/aos.css";
import "animate.css";

import TabsExams from "./TabsExams/index";
import mocktest from "../../assets/images/pencil-banner.png";
import { getCareerOption } from "../../store/guidance";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

function SuccessCareerOption() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(getCareerOption());
    Aos.init({ duration: 2000 });
  }, [dispatch, lan]);

  return (
    <div>
      <Header loginPage={true} page='guidance' subPage='careerOption' />

      <div className='noselect'>
        <Helmet>
          <link
            rel='canonical'
            href='https://www.shekunj.com/career-options/'
          />
          <title>
            Best Career Options and Occupations in India - Shekunj.com
          </title>
          <meta
            name='description'
            content='Find out the list of Top Career Options in India;
         Government Sector Finance Careers, 
        Technology Careers, Marketing Careers, JEE, NEET, etc.'
          />
          <meta
            name='keywords'
            content='Career Options in India,
 future career options,
 list of career choices,
career opportunities,'
          />
        </Helmet>

        {/* <Container> */}
        {/* <h2 data-aos='slide-up'>
            {t("successCareerOption.other.3.1")}
          </h2> */}
        {/* </Container> */}
        <section className='mocktest-sec'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-6'>
                <h3 data-aos='slide-up'>
                  {t("successCareerOption.other.3.2")}
                </h3>
              </div>
              <div className='col-md-6'>
                <div className='mocktest-img'>
                  <img src={mocktest} alt='mock banner' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='CompExams noselect'>
        <Container>
          <TabsExams />
        </Container>
      </div>
      <Footer loginPage={false} />
    </div>
  );
}

export default SuccessCareerOption;
