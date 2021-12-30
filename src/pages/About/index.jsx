import React, { useEffect } from "react";
import Aos from "aos";
import { useTranslation } from "react-i18next";

import { Header, Footer, SEO } from "../../components";

import img1 from "../../assets/images/About/img1.png";
import Nikita from "../../assets/images/Nikita-Sharma.png";
import star from "../../assets/images/Star 2.png";
import mob_banner from "../../assets/images/About/mob_banner.png";

import "../HomePage/index.scss";
import "./index.scss";
import "aos/dist/aos.css";
import "animate.css";

const AboutusPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <SEO title='Sheकुंज - About us' />
      <Header loginPage={false} page='about' />
      <section className='about_ban'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-0 col-md-0'>
              <div className='mob_abo_banner'>
                <img src={mob_banner} alt='' />
              </div>
            </div>
            <div className='col-lg-5 col-md-7'>
              <div className='about_Con'>
                <h2>{t("aboutPage.heading")}</h2>
                <p>{t("aboutPage.content1")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='ban_sec2'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img src={img1} alt='' srcSet='' />
            </div>

            <div className='col-md-6'>
              <div className='sec2_con'>
                <p> {t("aboutPage.content2")}</p>

                <p>{t("aboutPage.content3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about_testim'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-6 col-6'>
                  <div data-aos='slide-right'>
                    <div className='tes_box tes-before'>
                      <img src={Nikita} alt='' />
                      <p>
                        "{t("aboutPage.review.1")}" SSMSMSMS
                      </p>
                      <ul className='star'>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                      </ul>
                      <h2>{t("aboutPage.reviewerDetails.reviewerName.1")}</h2>
                      <h6>{t("aboutPage.reviewerDetails.reviewerPost.1")}</h6>
                    </div>
                  </div>

                  <div className='tes_box2' data-aos='slide-up'>
                    <h2>
                      "{t("aboutPage.review.2")}"
                    </h2>
                  </div>
                </div>

                <div className='col-md-6 col-6'>
                  <div data-aos='slide-down'>
                    <div className='tes_box3'>
                      <h2>4.9/5</h2>
                      <ul className='star'>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                      </ul>
                      <h6>{t("aboutPage.salesNumber")}</h6>
                    </div>
                  </div>

                  <div data-aos='slide-left'>
                    <div className='tes_box heg_cha'>
                      <img src={Nikita} alt='' />
                      <p>
                        “{t("aboutPage.review.3")}"
                      </p>
                      <ul className='star'>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                        <li>
                          <img src={star} alt='' />
                        </li>
                      </ul>
                      <h2>{t("aboutPage.reviewerDetails.reviewerName.1")}</h2>
                      <h6>{t("aboutPage.reviewerDetails.reviewerPost.1")}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='our_his'>
                <h2>{t("homePage.highlightStudents.heading")}</h2>
                <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
                  donec molestie sit diam aliquam egestas erat tincidunt magna.
                  Tincidunt et faucibus a curabitur sed at sagittis orci id.
                  Odio nunc, purus a, ut integer. Ultricies orci nulla eu,
                  libero ornare ipsum. Tincidunt erat pulvinar viverra pharetra.
                </p>
                <a data-aos='zoom-in' href='#!' className='learn_more aos-init'>
                  {t("homePage.highlightStudents.button")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer loginPage={false} />
    </div>
  );
};

export default AboutusPage;
