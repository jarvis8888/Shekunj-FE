import React, { useEffect } from "react";
import Aos from "aos";
import { useTranslation } from "react-i18next";

import { Header, Footer } from "../../components";
import half_star from "../../assets/images/half_star.svg";
import img1 from "../../assets/images/About/img1.png";
import Nikita from "../../assets/images/Nikita-Sharma.png";
import Ankita from "../../assets/images/Ankita-Sharma.png";
import star from "../../assets/images/Star 2.png";
import mob_banner from "../../assets/images/About/mob_banner.png";
import axios from "axios";

import "../HomePage/index.scss";
import "./index.scss";
import "aos/dist/aos.css";
import "animate.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../../components/SEO/index";

const AboutusPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // useEffect(() => {
  //   dispatch(adsList())
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     }
  //     axios
  //     .get(
  //       `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
  //     )
  //     .then((response) => {
  //       if (response.data.results.length > 0) {
  //         let filterArray = response.data.results.filter((item, index) => {
  //           return  item.image_type == "home_position_1"||item.image_type == "home_position_2" || item.image_type == "home_position_3";
  //         });
  //         console.log('asdjsdss',filterArray[0])
  //           if (filterArray[0].image_type == "home_position_3") {
  //             let findImage =
  //           filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setAdsPosition3(filterArray);
  //             }else if(filterArray[0].image_type == "home_position_1"){
  //               let findImage =
  //               filterArray.length > 0 ? filterArray[0].image : "NA";
  //               setImage(findImage);
  //               setAdsPosition1(filterArray);
  //             }else if (filterArray[0].image_type == "home_position_2") {
  //               let findImage =
  //               filterArray.length > 0 ? filterArray[0].image : "NA";
  //               setImage(findImage);
  //               setAdsPosition2(filterArray);
  //             }
  //           }
  //         })

  //   } ,
  //   function(error) {
  //     console.error("Error Code = " + error.code + " - " + error.message);
  //     // alert("Your location is blocked")
  //   axios
  //   .get(
  //     `/private_adds/private_add`,
  //   )
  //   .then((response) => {
  //     if (response.data.results.length > 0) {
  //       let filterArray = response.data.results.filter((item, index) => {
  //         return  item.image_type == "home_position_1"||item.image_type == "home_position_2" || item.image_type == "home_position_3";
  //       });
  //       console.log('asdjsdss',filterArray[0])
  //         if (filterArray[0].image_type == "home_position_3") {
  //           let findImage =
  //         filterArray.length > 0 ? filterArray[0].image : "NA";
  //         setImage(findImage);
  //         setAdsPosition3(filterArray);
  //           }else if(filterArray[0].image_type == "home_position_1"){
  //             let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //             setImage(findImage);
  //             setAdsPosition1(filterArray);
  //           }else if (filterArray[0].image_type == "home_position_2") {
  //             let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //             setImage(findImage);
  //             setAdsPosition2(filterArray);
  //           }
  //         }
  //       })
  //     }

  //   )

  // },[])

  const addEmail = (email) => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
      axios
        .post("/private_adds/click_add/", {
          // add_email:`${adds[0]?.add_email}`
          add_email: email,
          latitude: params.latitude.toString(),
          longitude: params.longitude.toString(),
        })
        .then((response) => {
          // setAdds(response.data.results);
          console.log("addEmailresponse", response);
        });
    });
  };

  return (
    <>
      <SEO
        title='Shekunj a Leading Women Empowerment Organization | About Us'
        link='https://www.shekunj.com/about-us'
        keywords='Women empowerment organizations, Free online courses in india, Advertise your business, Free career guidance, Online certification courses, Free online counselling in India, Display ad, Banners ads'
        description='SheKunj is a women empowerment organization that provides free online courses & counselling in India while boosting your business through impactful display & banner 
ads.'
      />
      <h1 style={{ display: "none" }}>
        {
          "SheKunj - India’s Leading Women Empowerment Organization for Uplifting Women"
        }
      </h1>
      <div className='noselect'>
        <Header loginPage={false} page='about-us' />
        <section className='about_ban'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-0 col-md-0'>
                <div className='mob_abo_banner'>
                  <img src={mob_banner} class='img-responsive' alt='' />
                </div>
              </div>
              <div className='col-lg-6 col-md-7'>
                <div className='about_Con noselect'>
                  <h2>{t("aboutPage.heading.1")}</h2>
                  <h5>{t("aboutPage.heading.2")}</h5>
                  <p>{t("aboutPage.content1")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='ban_sec2 noselect'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 noselect'>
                <img src={img1} class='img-responsive' alt='' srcSet='' />
              </div>

              <div className='col-md-6 noselect'>
                <div className='our_his'>
                  <h2>{t("aboutPage.heading.3")}</h2>
                  <h5>{t("aboutPage.heading.4")}</h5>
                  <p> {t("aboutPage.content2")}</p>

                  {/* <p>{t("aboutPage.content3")}</p> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='about_testim'>
          <div className='container'>
            <div className='row'>
              {/* <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div data-aos='slide-right'>
                      <div className='tes_box tes-before'>
                        <p>"{t("aboutPage.review.1")}"</p>
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
                         
                        </ul>
                        <h2>{t("aboutPage.reviewerDetails.reviewerName.1")}</h2>
                        <h6>{t("aboutPage.reviewerDetails.reviewerPost.2")}</h6>
                        <img
                          className='NikitaSharmaImage img-responsive'
                          src={Nikita}
                          alt=''
                        />
                      </div>
                    </div>

                    <div className='tes_box2' data-aos='slide-up'>
                      <h2>"{t("aboutPage.review.2")}"</h2>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div data-aos='slide-down'>
                      <div className='tes_box3'>
                        <h2>4.9</h2>
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
                            <img src={half_star} alt='' />
                          </li>
                        </ul>
                        <h6>{t("aboutPage.salesNumber")}</h6>
                      </div>
                    </div>

                    <div data-aos='slide-left'>
                      <div className='tes_box_ankita heg_cha'>
                        <p>“{t("aboutPage.review.3")}"</p>
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
                        <h2>{t("aboutPage.reviewerDetails.reviewerName.2")}</h2>
                        <h6>{t("aboutPage.reviewerDetails.reviewerPost.1")}</h6>
                        <img
                          className='AnkitaSharmaImage img-responsive'
                          src={Ankita}
                          alt=''
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className='col-md-12 noselect'>
                <div className='our_his'>
                  <h2>{t("homePage.highlightStudents.aboutHeading")}</h2>
                  <h5>{t("homePage.highlightStudents.1")}</h5>
                  <p className='mb-3'>
                    {t("homePage.highlightStudents.aboutDescription")}
                  </p>
                  <Link to='/contact-us'>
                    <a
                      data-aos='zoom-in'
                      href='#!'
                      className='learn_more aos-init'
                    >
                      {t("homePage.highlightStudents.aboutButton")}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer loginPage={false} />
      </div>
    </>
  );
};

export default AboutusPage;
