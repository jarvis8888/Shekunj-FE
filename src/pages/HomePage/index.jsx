/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Aos from "aos";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { constants } from "../../utils";
import { Header, Footer, Carousel, SEO } from "../../components";
// import SlideContent from "./SlideContent";
import "animate.css";
import "aos/dist/aos.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
// import Swiper core and required modules
import { Navigation, Pagination} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "../../pages/responsive.scss";
import "../../pages/responsive.scss";
import firstslidebanner from "../../assets/images/happystudentbanner.png"
import "./index.scss";

import add from "../../assets/images/add.png";
import x from "../../assets/images/Career/x.png";
import desktop from "../../assets/icons/desktop.png";
import Resume from "../../assets/images/resume.png";
import Girl from "../../assets/images/job1.png";
import Community from "../../assets/images/community.png";
// import Nikita from "../../assets/images/testimonial/1.png";
// import Priya from "../../assets/images/testimonial/2.png";
import Nikita from "../../assets/images/Nikita-Sharma.png";
import Ankita from "../../assets/images/Ankita-Sharma.png";
import star from "../../assets/images/Star 2.png";
import half_star from "../../assets/images/half_star.svg";
import certif from "../../assets/images/mob_certif.jpg";
import g1 from "../../assets/images/1.png";
import g2 from "../../assets/images/2.png";
import g3 from "../../assets/images/3.png";
import g4 from "../../assets/images/4.png";
import g5 from "../../assets/images/5.png";
import g6 from "../../assets/images/6.png";
import g7 from "../../assets/images/7.png";
import g8 from "../../assets/images/8.png";
import g9 from "../../assets/images/9.png";
import g10 from "../../assets/images/10.png";
import g11 from "../../assets/images/11.png";
import g12 from "../../assets/images/12.png";
import g13 from "../../assets/images/13.png";
import g14 from "../../assets/images/14.png";
import g15 from "../../assets/images/15.png";
import g16 from "../../assets/images/16.png";
import g17 from "../../assets/images/17.png";
import g18 from "../../assets/images/18.png";
import g19 from "../../assets/images/19.png";
import g20 from "../../assets/images/20.png";
import { Box, Modal, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };
  const { t } = useTranslation();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const redirect = query.get("redirect");

  const settings = {
    dots: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    if (redirect) {
      handleOpen();
    }
  }, [redirect]);

  const [adsPosition1, setAdsPosition1] = useState([]);
  const [adsPosition2, setAdsPosition2] = useState([]);
  const [adsPosition3, setAdsPosition3] = useState([]);
  const [image, setImage] = useState("NA");
  const [newImage, setNewImage] = useState([]);
  const detect = useDeviceDetect();
  

  //   const [lat, setLat] = useState(null);
  //   const [lng, setLng] = useState(null);
  //   const [status, setStatus] = useState(null);

  //   const getLocation = () => {
  //     if (!navigator.geolocation) {
  //         setStatus('Geolocation is not supported by your browser');
  //     } else {
  //         setStatus('Locating...');
  //         navigator.geolocation.getCurrentPosition((position) => {
  //             setStatus(null);
  //             setLat(position.coords.latitude);
  //             setLng(position.coords.longitude);
  //         });
  //     }
  // }
  // console.log('longlat',lng,lat)

  // useEffect(() => {
  //     getLocation();
  //     if (lat && lng !== null) {
  //         axios.post(`/location?latitude=${lat}&longitude=${lng}`)
  //             .then((response) => {
  //                 console.log(response)
  //             });
  //     }
  // }, [lat, lng]);

  // useEffect(() => {
  // 	axios.get('/private_adds/private_add?image_type=home_position_1')
  // 		.then((response) => {
  // 			setAdsPosition1(response.data.results);
  // 		});
  // }, [])

  // useEffect(() => {
  // 	axios.get('/private_adds/private_add')
  // 		.then((response) => {

  //       if(response.data.results.length > 0)

  //       {
  //        let filterArray = response.data.results.filter((item,index)=>{
  //           return item.image_type == "home_position_1"
  //         })
  //         let findImage = filterArray.length>0 ? filterArray[0].image : "NA"
  //         setImage(findImage)
  //         setAdsPosition1(filterArray)
  //           }
  // 		});
  // }, [])
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest Code>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    dispatch(adsList())
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      }
      axios
        .get(
          `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
        )
        .then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {

              return item.image_type == "home_position_1";

            });
            setAdsPosition1(filterArray1);
            // console.log("filterArray1home_position_1",filterArray1)

            let filterArray2 = response.data.results.filter((item, index) => {

              return item.image_type == "home_position_2";

            });
            setAdsPosition2(filterArray2);
            console.log("filterArray1home_position_2", filterArray2)

            let filterArray3 = response.data.results.filter((item, index) => {

              return item.image_type == "home_position_3";

            });
            setAdsPosition3(filterArray3);
            // console.log("filterArray1home_position_3",filterArray1)


          }
        })
    },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")    
        axios
          .get(
            `/private_adds/private_add`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "home_position_1";
              });
              setAdsPosition1(filterArray1);
              // console.log("filterArray1coursebox",filterArray1)
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "home_position_2";
              });
              setAdsPosition2(filterArray2);
              console.log("filterArray1coursebox", filterArray2)

              let filterArray3 = response.data.results.filter((item, index) => {

                return item.image_type == "home_position_3";

              });
              setAdsPosition3(filterArray3);
              // console.log("filterArray1home_position_3",filterArray3)
            }
          })
      }
    )
  }, [])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      let num =  index + 1;
        return `<span class=${className}>${0 + [num]}</span>`
    },
};

  return (
    <div>
      <SEO />
      <Header loginPage={false} page='home' />


      <section className="sk-homeBanner-sec">
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation={{
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
              }}
            pagination={pagination}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            
          >
            <SwiperSlide>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="sh-bannerContent-top">
                    <h1>Crack <span> dream jobs</span> with top rated certificate courses</h1>
                    <p>Upskilling for Professionals from World’s top Universities</p>
                    <button className="sk-btn" type="button">Start Learning</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="sk-imageBanner">
                    <img src={firstslidebanner} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="sh-bannerContent-top">
                    <h1>Crack dream jobs with top rated certificate courses</h1>
                    <p>Upskilling for Professionals from World’s top Universities</p>
                    <button className="sk-btn" type="button">Start Learning</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src={firstslidebanner} />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="sh-bannerContent-top">
                    <h1>Crack dream jobs with top rated certificate courses</h1>
                    <p>Upskilling for Professionals from World’s top Universities</p>
                    <button className="sk-btn" type="button">Start Learning</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src={firstslidebanner} />
                </div>
              </div>
            </SwiperSlide>
          
          </Swiper>
          
            {/* <div class="sk-banner-navigate">
              <div class="swiper-button-next">
                  <span>NEXT</span>
              </div>
              <div class="swiper-button-prev">
                  <span>PREV</span>
              </div>
            </div> */}
          
        </div>
      </section>

      {/* slider */}

      <div id='myCarousel' className='banner_slider mb-5 noselect'>
        <div className='carousel-inner'>
          <Slider {...settings}>
            <div className='carousel-item carousel_item1'>
              <div className='container'>
                <div className='row h_set mt-5' data-aos='slide-up'>
                  <div className='col-md-7 col-12'>
                    <h4 className='mt-5 pt-lg-5 mb-1'>
                      {t("homePage.mainSlider.heading.1")}
                    </h4>
                    <h5>{t("homePage.mainSlider.heading.4")}</h5>

                    <p className='mb-4 mt-3'>
                      {" "}
                      {t("homePage.mainSlider.subHeading.1")}
                    </p>
                    <Link to='/courses' className='banner_btn'>
                      {t("homePage.mainSlider.button.1")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='carousel-item carousel_item2'>
              <div className='container'>
                <div className='row h_set mt-5'>
                  <div className='col-md-7 col-12'>
                    <h4 className='mt-5 pt-lg-5 mb-1' data-aos='zoom-in'>
                      {t("homePage.mainSlider.heading.2")}
                    </h4>
                    <h5>{t("homePage.mainSlider.heading.5")}</h5>
                    <p className='mb-4 mt-3' data-aos='zoom-in'>
                      {t("homePage.mainSlider.subHeading.2")}
                    </p>
                    <Link
                      to='/top-colleges-in-india/'
                      className='banner_btn'
                      data-aos='zoom-in'
                    >
                      {t("homePage.mainSlider.button.5")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='carousel-item carousel_item3'>
              <div className='container'>
                <div className='row h_set mt-5'>
                  <div className='col-md-7 col-12'>
                    <h4 className='mt-5 pt-lg-5 mb-1' data-aos='zoom-in'>
                      {t("homePage.mainSlider.heading.3.3.1")}
                    </h4>

                    <h5>{t("homePage.mainSlider.heading.3.3.2")}</h5>

                    <p className='mb-4 mt-3' data-aos='zoom-in'>
                      {t("homePage.mainSlider.subHeading.3")}
                    </p>

                    <Link
                      to='/online-counselling'
                      className='banner_btn'
                      data-aos='zoom-in'
                    >
                      {t("homePage.mainSlider.button.4")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='carousel-item carousel_item4'>
              <div className='container'>
                <div className='row h_set mt-5'>
                  <div className='col-md-7 col-12 offset-lg-6 offset-md-5'>
                    <h4 className='mt-5 pt-lg-5 mb-1' data-aos='zoom-in'>
                      {t("homePage.mainSlider.heading.6.1")}
                    </h4>

                    <h5>{t("homePage.mainSlider.heading.6.2")}</h5>

                    <p className='mb-4 mt-3' data-aos='zoom-in'>
                      {t("homePage.mainSlider.subHeading.4")}
                    </p>

                    <Link
                      to='/top-schools-in-india/'
                      className='banner_btn'
                      data-aos='zoom-in'
                    >
                      {t("homePage.mainSlider.button.6")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Slider 1 */}
      <Carousel
        items={5}
        page='homePage'
        title1={t("homePage.carousel1.heading.1")}
        title2={t("homePage.carousel1.heading.2")}
        type={constants.carouselConstant.COURSES}
      />

      {/* <Link to='/courses' style={{ textDecoration: "none" }}>
      <span>
        <button className='view_test_cate'>
          {t("homePage.mainSlider.button.7")}
        </button>
      </span>
      </Link> */}
      

      <div className='courses'>
        <Link
          to='/courses'
          style={{ textDecoration: "none" }}
          className='view_test_cate'
        >
          {t("homePage.mainSlider.button.7")}
        </Link>
      </div>

      {/* google add */}

      

      <section>
        <div className='container'>



          <div className='row'>
            {adsPosition1.length > 0 && (
              // <div className='col-md-12 ads_home_cover'>
              <div
                className='col-md-12 ads_home_cover'
                onClick={() => addEmail(adsPosition1[0]?.add_email)}
              >
                <a href={adsPosition1[0]?.url_adds} target='_blank'>
                  {detect.isMobile ? (
                    adsPosition1[0]?.image_mobile && (
                    <img src={ adsPosition1[0]?.image_mobile } alt='Image' className='google_ads_home' />
                  )) : (
                    adsPosition1[0]?.image && (
                    <img src={ adsPosition1[0]?.image} alt='Image' className='google_ads_home' />
                  ))}
                </a>                
              </div>
            )}
          </div>
        </div>
      </section>

      {/* resume */}
      <section className='resume same_padding mt-5 noselect'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7' data-aos='slide-up'>
              <h4>{t("homePage.resume.heading")}</h4>
              <a
                rel='noreferrer'
                href='https://octahire.com/Resume_maker'
                target='_blank'
                className='btn btn-resume mt-4'
              >
                {t("homePage.resume.button")}
              </a>
            </div>

            <div className='resumeimg'>
              <img src={Resume} alt='...' />
            </div>
          </div>
        </div>
      </section>

      {/* Slider 2 */}
      <Carousel
        items={5}
        page='homePage'
        title1={t("homePage.carousel2.heading.1")}
        title2={t("homePage.carousel2.heading.2")}
        type={constants.carouselConstant.TEST}
      />
      <div className='courses'>
        <Link
          to='/mock-test'
          // to='/mock-test'
          style={{ textDecoration: "none" }}
          className='view_test_cate  noselect'
        >
          {t("homePage.mainSlider.button.3")}
        </Link>
      </div>
      {/* <Link to='/success-career-test' style={{ textDecoration: "none" }}>
        <button className='view_test_cate noselect'>
          {t("homePage.mainSlider.button.3")}
        </button>
      </Link> */}

      {/* google add */}
      <section>
        <div className='container'>
          <div className='row'>

            {adsPosition2.length > 0 && (
              <div
                className='col-md-12 ads_home_cover'
                onClick={() => addEmail(adsPosition2[0]?.add_email)}
              >
                <a href={adsPosition2[0]?.url_adds} target='_blank'>
                  {detect.isMobile ? (
                    adsPosition2[0]?.image_mobile && (
                <img src={adsPosition2[0]?.image_mobile} alt='Image' className='google_ads_home' />
                  )): (
                    adsPosition2[0]?.image && (
                    <img src={adsPosition2[0]?.image} alt='Image' className='google_ads_home' />
                  ))}
                </a>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Job opportunity */}
      <section className='job-opprtunity same_padding mt-1 noselect'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-12 col-md-11'>
              <div className='job-opprtunity-bg'>
                <div className='row'>
                  <div className='col-lg-8' data-aos='slide-up'>
                    <h3>{t("homePage.jobopportunity.heading")}</h3>
                    <p>{t("homePage.jobopportunity.subHeading")}</p>
                    <a
                      rel='noreferrer'
                      target='_blank'
                      href='https://octahire.com/Home/candidate_register'
                      className='btn btn-job'
                    >
                      {t("homePage.jobopportunity.button")}
                    </a>
                  </div>

                  <div className='col-lg-4'>
                    <div className='jobimg'>
                      <img src={Girl} alt='...' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Carousel
        items={5}
        page='homePage'
        title1={t("homePage.carousel3.heading.1")}
        title2={t("homePage.carousel3.heading.2")}
        type={constants.carouselConstant.GOVERNMENT_SCHEMES}
      />
      <div className='courses'>
        <Link
          to='/government-schemes-in-india'
          style={{ textDecoration: "none" }}
          className='view_test_cate'
        >
          {t("homePage.mainSlider.button.2")}
        </Link>
      </div>

      {/* google add */}
      <section>
        <div className='container'>
          <div className='row'>
            {adsPosition3.length > 0 && (
              // <div className='col-md-12 ads_home_cover'>


              <div
                className='col-md-12 ads_home_cover'
                onClick={() => addEmail(adsPosition3[0]?.add_email)}
              >
                <a href={adsPosition3[0]?.url_adds} target='_blank'>
                  {detect.isMobile ? (
                    adsPosition3[0]?.image_mobile && (
                      <img src={adsPosition3[0]?.image_mobile} alt='Image' className='google_ads_home' />
                  )) : (
                    adsPosition3[0]?.image && (
                      <img src={adsPosition3[0]?.image} alt='Image' className='google_ads_home' />
                  ))}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <Link to='/government-exams' style={{ textDecoration: "none" }}>
        <button
          className='view_test_cate'
          onClick={() => <Redirect to='/government-exams' />}
        >
          {t("homePage.mainSlider.button.2")}
        </button>
      </Link> */}

      {/* career development */}
      <section className='career_community same_padding mt-5 noselect'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-12'>
              <h1 data-aos='slide-up'>{t("homePage.community.heading")}</h1>
              <h2 data-aos='slide-up'>{t("homePage.community.subHeading")}</h2>
              <p data-aos='slide-up'>{t("homePage.community.data")}</p>

              <div className='mob_comunity_img'>
                <img data-aos='slide-up' src={Community} alt='...' />
              </div>

              <div className='community-img mt-5'>
                <div className='community1 communityring'>
                  <img src={g1} alt='Image' />
                </div>

                <div className='community2 communityring'>
                  <img src={g2} alt='Image' />
                </div>

                <div className='community3 communityring'>
                  <img src={g3} alt='Image' />
                </div>

                <div className='community4 communityring'>
                  <img src={g4} alt='Image' />
                </div>

                <div className='community5 communityring'>
                  <img src={g5} alt='Image' />
                </div>

                <div className='community6 communityring'>
                  <img src={g6} alt='Image' />
                </div>

                <div className='community7 communityring'>
                  <img src={g7} alt='Image' />
                </div>

                <div className='community8 communityring'>
                  <img src={g8} alt='Image' />
                </div>

                <div className='community9 communityring'>
                  <img src={g9} alt='Image' />
                </div>

                <div className='community10 communityring'>
                  <img src={g10} alt='Image' />
                </div>

                <div className='community11 communityring'>
                  <img src={g11} alt='Image' />
                </div>

                <div className='community12 communityring'>
                  <img src={g12} alt='Image' />
                </div>

                <div className='community13 communityring'>
                  <img src={g13} alt='Image' />
                </div>

                <div className='community14 communityring'>
                  <img src={g14} alt='Image' />
                </div>

                <div className='community15 communityring'>
                  <img src={g15} alt='Image' />
                </div>

                <div className='community16 communityring'>
                  <img src={g16} alt='Image' />
                </div>

                <div className='community17 communityring'>
                  <img src={g17} alt='Image' />
                </div>

                <div className='community18 communityring'>
                  <img src={g18} alt='Image' />
                </div>

                <div className='community19 communityring'>
                  <img src={g19} alt='Image' />
                </div>

                <div className='community20 communityring'>
                  <img src={g20} alt='Image' />
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-center'>
            <div className='col-md-4 text-center mt-5'>
              <Link to='/success-stories' style={{ textDecoration: "none" }}>
                <button className='btn btn-start-course' data-aos='slide-up'>
                  {t("homePage.community.button")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className='career_community noselect'>
        <div className='container'>
          <div className='community_block d-md-block d-none'>
            <div className='career_community'>
              <div className='community1'>
                <img src={g1} alt='Image' />
              </div>

              <div className='community2'>
                <img src={g2} alt='Image' />
              </div>

              <div className='community3'>
                <img src={g3} alt='Image' />
              </div>

              <div className='community4'>
                <img src={g4} alt='Image' />
              </div>

              <div className='community5'>
                <img src={g5} alt='Image' />
              </div>

              <div className='community6'>
                <img src={g6} alt='Image' />
              </div>

              <div className='community7'>
                <img src={g7} alt='Image' />
              </div>

              <div className='community8'>
                <img src={g8} alt='Image' />
              </div>

              <div className='community9'>
                <img src={g9} alt='Image' />
              </div>

              <div className='community10'>
                <img src={g10} alt='Image' />
              </div>

              <div className='community11'>
                <img src={g11} alt='Image' />
              </div>

              <div className='community12'>
                <img src={g12} alt='Image' />
              </div>

              <div className='community13'>
                <img src={g13} alt='Image' />
              </div>

              <div className='community14'>
                <img src={g14} alt='Image' />
              </div>

              <div className='community15'>
                <img src={g15} alt='Image' />
              </div>

              <div className='community16'>
                <img src={g16} alt='Image' />
              </div>

              <div className='community17'>
                <img src={g17} alt='Image' />
              </div>

              <div className='community18'>
                <img src={g18} alt='Image' />
              </div>

              <div className='community19'>
                <img src={g19} alt='Image' />
              </div>

              <div className='community20'>
                <img src={g20} alt='Image' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* certificate */}
      <section className='certificate same_padding noselect'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='cer_img'>
                <img src={certif} alt='' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='certif_con'>
                <h4>
                  {t("homePage.certificate.heading.1")}{" "}
                  {/* {t("homePage.certificate.heading.2")} */}
                </h4>

                <p>{t("homePage.certificate.heading.3")} </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* highlight students */}
      <section className='highlight_student same_padding noselect'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-6 col-6'>
                  <div data-aos='slide-right'>
                    <div className='tes_box tes-before'>
                      {/* <img className="NikitaSharmaImage img-responsive" src={Nikita} alt='' /> */}
                      <p>{t("aboutPage.review.1")}</p>
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
                        {/* <li>
                          <img src={star} alt='' />
                        </li> */}
                      </ul>
                      <h2>{t("aboutPage.reviewerDetails.reviewerName.1")}</h2>
                      <h6>{t("aboutPage.reviewerDetails.reviewerPost.2")}</h6>
                      <img className="NikitaSharmaImage img-responsive" src={Nikita} alt='' />
                    </div>
                  </div>

                  <div className='tes_box2' data-aos='slide-up'>
                    <h2>{t("aboutPage.review.2")}</h2>
                  </div>
                </div>

                <div className='col-md-6 col-6'>
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
                      {/* <img className='AnkitaSharmaImage img-responsive' src={Ankita} alt='' /> */}
                      <p>{t("aboutPage.review.3")}</p>
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
                      <img className='AnkitaSharmaImage img-responsive' src={Ankita} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-5 offset-md-1'>
              <div className='highlig'>
                <h3 className='mb-3 mt-4'>
                  {t("homePage.highlightStudents.homeHeading")}
                </h3>

                <Link to='/courses' data-aos='slide-up' className='learn_more'>
                  {t("homePage.highlightStudents.homeButton")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='mock_test_pop' sx={style}>
          <img
            className='close_img'
            src={x}
            alt='...'
            onClick={() => handleClose()}
          />
          <img src={desktop} alt='...' />
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {t("deskTopView.heading")}
          </Typography>
          <button className='btn btn-info' onClick={() => handleClose()}>
            {t("deskTopView.button")}
          </button>
        </Box>
      </Modal>

      <Footer loginPage={false} />
    </div>
  );
}

export default HomePage;
