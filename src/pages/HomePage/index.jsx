/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Aos from "aos";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { constants } from "../../utils";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";
import { Header, Footer, Carousel, SEO } from "../../components";
// import SlideContent from "./SlideContent";
import "animate.css";
import "aos/dist/aos.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../pages/responsive.scss";
import vectorimg from "../../assets/images/storyvector.svg";
import vectorimg1 from "../../assets/images/storyvector1.svg";
import firstslidebanner from "../../assets/images/happystudentbanner.png";
import successstoryimg from "../../assets/images/storysuccess.png";
import "./index.scss";
import arrowbicon from "../../assets/images/arrowicon.svg";

import begainimg from "../../assets/images/begainimg.png";

import addbannerhome from "../../assets/images/homeaddbanner.png";

import mocktesttimg from "../../assets/images/mocktest.png";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import cousreimg from "../../assets/images/courseimg.png";
import { Box, Modal, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import useDeviceDetect from "../../hooks/useDeviceDetect";

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

  

  useEffect(() => {
    Aos.init({ duration: 2000 });
    if (redirect) {
      handleOpen();
    }
  }, [redirect]);

 
  const detect = useDeviceDetect();

  
 

 
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      let num = index + 1;
      return `<span class=${className}>${0 + [num]}</span>`;
    },
  };
  SwiperCore.use([Autoplay]);

  return (
    <div>
      <SEO />
      <Header loginPage={false} page='home' />

      <section className='sk-homeBanner-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                simulateTouch={true}
                effect={"fade"}
                speed={1500}
                autoplay={{ delay: 5500 }}
                navigation={{
                  navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                }}
                pagination={pagination}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-xl-8 col-lg-8 col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          Crack <span> dream jobs</span> with top rated
                          certificate courses
                        </h1>
                        <p>
                          Upskilling for Professionals from World’s top
                          Universities
                        </p>
                        <button className='sk-btn' type='button'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4'>
                      <div className='sk-imageBanner'>
                        <img src={firstslidebanner} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          Crack dream jobs with top rated certificate courses
                        </h1>
                        <p>
                          Upskilling for Professionals from World’s top
                          Universities
                        </p>
                        <button className='sk-btn' type='button'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <img src={firstslidebanner} />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          Crack dream jobs with top rated certificate courses
                        </h1>
                        <p>
                          Upskilling for Professionals from World’s top
                          Universities
                        </p>
                        <button className='sk-btn' type='button'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <img src={firstslidebanner} />
                    </div>
                  </div>
                </SwiperSlide>
                <div class='sk-banner-navigate'>
                  <div class='swiper-button-next'>
                    <span>NEXT</span>
                  </div>
                  <div class='swiper-button-prev'>
                    <span>PREV</span>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-course-sec sk-slide-arrow sk-bg-color'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mx-auto'>
              <div className='sk-heading-title'>
                <h2>Courses In India</h2>
                <p>
                  Courses focused on building strong foundational skills for
                  career growth
                </p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                spaceBetween={30}
                navigation={true}
                speed={1500}
                autoplay={{ delay: 4000 }}
                className='sk-mySwiper-slide'
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  639: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  865: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1500: {
                    slidesPerView: 4,
                  },
                  1920: {
                    slidesPerView: 5,
                  },
                }}
              >
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={cousreimg} />
                      <div className='sk-certificate-box'>
                        {" "}
                        <WorkspacePremiumSharpIcon /> Certificate
                      </div>
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Skill Based</span>
                      <h6>Basic of Interview</h6>
                      <p className='sk-smallBox-description'>
                        Lorem Ipsum has been the industry's in the standard
                        dummy text ever since the
                      </p>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn'>More Info</button>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={cousreimg} />
                      <div className='sk-certificate-box'>
                        {" "}
                        <WorkspacePremiumSharpIcon /> Certificate
                      </div>
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Skill Based</span>
                      <h6>Basic of Interview</h6>
                      <p className='sk-smallBox-description'>
                        Lorem Ipsum has been the industry's in the standard
                        dummy text ever since the
                      </p>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn'>More Info</button>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={cousreimg} />
                      <div className='sk-certificate-box'>
                        {" "}
                        <WorkspacePremiumSharpIcon /> Certificate
                      </div>
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Skill Based</span>
                      <h6>Basic of Interview</h6>
                      <p className='sk-smallBox-description'>
                        Lorem Ipsum has been the industry's in the standard
                        dummy text ever since the
                      </p>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn'>More Info</button>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={cousreimg} />
                      <div className='sk-certificate-box'>
                        {" "}
                        <WorkspacePremiumSharpIcon /> Certificate
                      </div>
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Skill Based</span>
                      <h6>Basic of Interview</h6>
                      <p className='sk-smallBox-description'>
                        Lorem Ipsum has been the industry's in the standard
                        dummy text ever since the
                      </p>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn'>More Info</button>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={cousreimg} />
                      <div className='sk-certificate-box'>
                        {" "}
                        <WorkspacePremiumSharpIcon /> Certificate
                      </div>
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Skill Based</span>
                      <h6>Basic of Interview</h6>
                      <p className='sk-smallBox-description'>
                        Lorem Ipsum has been the industry's in the standard
                        dummy text ever since the
                      </p>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn'>More Info</button>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='col-xl-12'>
              <div className='sk-testCourse-btn'>
                <button className='loadMore'>Explore More Courses</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-addHome-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-9 mx-auto'>
              <div className='text-center'>
                <img src={addbannerhome} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-begain-sec'>
        <div class='container'>
          <div className='row'>
            <div className='col-md-6 mx-auto'>
              <div className='sk-heading-title'>
                <h2>Not Sure Where To Begin?</h2>
                <p>What is your mail goal on SheKunj’s</p>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-md-4'>
              <div class='sk-begain-box'>
                <div class='sk-begain-content'>
                  <h6>I want to</h6>
                  <h5>
                    Upskill <img src={arrowbicon} />{" "}
                  </h5>
                </div>
                <div class='sk-begain-img'>
                  <img src={begainimg} />
                </div>
              </div>
            </div>
            <div class='col-md-4'>
              <div class='sk-begain-box'>
                <div class='sk-begain-content'>
                  <h6>I want to</h6>
                  <h5>
                    Change Career <img src={arrowbicon} />{" "}
                  </h5>
                </div>
                <div class='sk-begain-img'>
                  <img src={begainimg} />
                </div>
              </div>
            </div>
            <div class='col-md-4'>
              <div class='sk-begain-box'>
                <div class='sk-begain-content'>
                  <h6>I want to crack</h6>
                  <h5>
                    Government Exam <img src={arrowbicon} />{" "}
                  </h5>
                </div>
                <div class='sk-begain-img'>
                  <img src={begainimg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-mockTest-sec sk-slide-arrow'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mx-auto'>
              <div className='sk-heading-title'>
                <h2>Online Mock Test</h2>
                <p>
                  Courses focused on building strong foundational skills for
                  career growth
                </p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                spaceBetween={30}
                speed={1500}
                autoplay={{ delay: 4000 }}
                navigation={true}
                className='sk-mockSwiper'
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  639: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  865: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1500: {
                    slidesPerView: 4,
                  },
                  1920: {
                    slidesPerView: 5,
                  },
                }}
              >
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={mocktesttimg} />
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Government</span>
                      <h6>AFCAT (Air Force Common Admission Test)</h6>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>40 Minutes</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={mocktesttimg} />
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Government</span>
                      <h6>AFCAT (Air Force Common Admission Test)</h6>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>40 Minutes</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={mocktesttimg} />
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Government</span>
                      <h6>AFCAT (Air Force Common Admission Test)</h6>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>40 Minutes</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={mocktesttimg} />
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Government</span>
                      <h6>AFCAT (Air Force Common Admission Test)</h6>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>40 Minutes</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='sk-course-box'>
                    <div className='sk-course-img'>
                      <img src={mocktesttimg} />
                    </div>
                    <div className='sk-course-content'>
                      <span className='sk-smallBox-heading'>Government</span>
                      <h6>AFCAT (Air Force Common Admission Test)</h6>
                      <div className='sk-time-education'>
                        <ul>
                          <li>
                            <AccessTimeIcon /> <span>40 Minutes</span>{" "}
                          </li>
                          <li>
                            <SchoolRoundedIcon /> 282,55 enrolled{" "}
                          </li>
                        </ul>
                      </div>
                      <div className='sk-course-btn'>
                        <button className='sk-course-btn sk-courseBg-color'>
                          Attempt
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='col-xl-12'>
              <div className='sk-testCourse-btn'>
                <button className='loadMore'>Explore More Courses</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-changeBothhire-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6'>
              <div className='sk-hireStory-box'>
                <div className='sk-hireSotory-innerbox'>
                  <h2>Seeking for a Chance and a Change?</h2>
                  <p>
                    Go nowhere. We here at Shekunj offer the best job
                    opportunities from the best companies. Find a job and move
                    towards your bright future.
                  </p>
                  <div className='sk-hireChanges-btn'>
                    <button className='loadMore'>Start Learning</button>
                  </div>
                </div>
                <div className='sk-vectorImg-inner'>
                  <img src={vectorimg} />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6'>
              <div className='sk-hireStory-box'>
                <div className='sk-hireSotory-innerbox sk-woman-story'>
                  <h2>Get hired for your dream job!</h2>
                  <p>
                    Land your dream job by designing a perfect resume in a
                    print-ready <br /> format
                  </p>
                  <div className='sk-thireChangescolor-btn'>
                    <button className='loadMore'>Create Your CV Now</button>
                  </div>
                </div>
                <div className='sk-vectorImg-inner'>
                  <img src={vectorimg1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-homeStory-sec sk-bg-color'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto'>
              <div className='sk-heading-title'>
                <h2>Success Story</h2>
                <p>Real Stories of Real Women Around the World. Hear it.</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-9 col-md-10 col-sm-12 mx-auto'>
              <div className='sk-success-story'>
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className='sk-swiperSuccess-story'
                >
                  <SwiperSlide>
                    <div className='sk-story-testmonial'>
                      <div className='sk-story-content'>
                        <img src={successstoryimg} />
                      </div>
                      <div className='sk-story-content'>
                        <h4>
                          Dipti is very hard-working as well as dedicated to her
                          work, and this sincerity helped her get promoted to an
                          HR Manager!
                        </h4>
                        <div className='sk-bottom-box'>
                          <div className='sk-storySuccess-testmonial'>
                            <span>
                              <AccessTimeIcon />1 Week Ago
                            </span>
                            <span>
                              <MenuBookRoundedIcon />5 min
                            </span>
                            <span>
                              <VisibilityOutlinedIcon />
                              12,234
                            </span>
                          </div>
                          <div className='sk-readmore-story'>
                            <button className='sk-storyRead-more'>
                              Read More <EastRoundedIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='sk-story-testmonial'>
                      <div className='sk-story-content'>
                        <img src={successstoryimg} />
                      </div>
                      <div className='sk-story-content'>
                        <h4>
                          Dipti is very hard-working as well as dedicated to her
                          work, and this sincerity helped her get promoted to an
                          HR Manager!
                        </h4>
                        <div className='sk-bottom-box'>
                          <div className='sk-storySuccess-testmonial'>
                            <span>
                              <AccessTimeIcon />1 Week Ago
                            </span>
                            <span>
                              <MenuBookRoundedIcon />5 min
                            </span>
                            <span>
                              <VisibilityOutlinedIcon />
                              12,234
                            </span>
                          </div>
                          <div className='sk-readmore-story'>
                            <button className='sk-storyRead-more'>
                              Read More <EastRoundedIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='sk-story-testmonial'>
                      <div className='sk-story-content'>
                        <img src={successstoryimg} />
                      </div>
                      <div className='sk-story-content'>
                        <h4>
                          Dipti is very hard-working as well as dedicated to her
                          work, and this sincerity helped her get promoted to an
                          HR Manager!
                        </h4>
                        <div className='sk-bottom-box'>
                          <div className='sk-storySuccess-testmonial'>
                            <span>
                              <AccessTimeIcon />1 Week Ago
                            </span>
                            <span>
                              <MenuBookRoundedIcon />5 min
                            </span>
                            <span>
                              <VisibilityOutlinedIcon />
                              12,234
                            </span>
                          </div>
                          <div className='sk-readmore-story'>
                            <button className='sk-storyRead-more'>
                              Read More <EastRoundedIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='sk-addHome-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-10 mx-auto'>
              <div className='text-center'>
                <img src={addbannerhome} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* slider */}

      <Footer loginPage={false} />
    </div>
  );
}

export default HomePage;
