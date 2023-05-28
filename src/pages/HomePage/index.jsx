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
// import "../../pages/responsive.scss";
import quatesicon from "../../assets/images/quate.svg";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import testmonailimg from "../../assets/images/testmonial.png";
import agricultureicon from "../../assets/images/agriculture.svg";
import vectorimg from "../../assets/images/storyvector.svg";
import vectorimg1 from "../../assets/images/storyvector1.svg";
import firstslidebanner from "../../assets/images/happystudentbanner.png";
import successstoryimg from "../../assets/images/storysuccess.png";
// import "../More/blogPage.scss";
import "./index.scss";
import arrowbicon from "../../assets/images/arrowicon.svg";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import begainimg from "../../assets/images/skillgirl.png";
import addbannerhome from "../../assets/images/homeaddbanner.png";
import mocktesttimg from "../../assets/images/mocktest.png";
import google from "../../assets/images/google-icon.svg";
import trustpilot from "../../assets/images/trustpilot-logo.svg";
import glassdrop from "../../assets/images/glassdrop.svg";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import cousreimg from "../../assets/images/courseimg.png";
import { Box, Modal, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import {
  DateFormat,
  addEmailToClient,
  formatDateRange,
  formatTimeRange,
  truncateString,
} from "../../utils/utils";
import httpServices from "../../utils/ApiServices";
import { apiConstants, routingConstants } from "../../utils/constants";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import LatestBlogCard from "../../components/cards/LatestBlogCard";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detect = useDeviceDetect();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { lan } = useSelector((state) => state.languageReducer);
  const [adsPosition1, setAdsPosition1] = useState([]);
  const [adsPosition2, setAdsPosition2] = useState([]);
  const [adsPosition3, setAdsPosition3] = useState([]);
  const [adsPosition4, setAdsPosition4] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [successData, setSuccessData] = useState([]);
  const [govtData, setGovtData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [courseLoader, setCourseLoader] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [googleActiveTab, setGoogleActiveTab] = useState("google-reviews");

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

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  const navigation = {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      let num = index + 1;
      return `<span class=${className}>${0 + [num]}</span>`;
    },
  };
  SwiperCore.use([Autoplay]);

  const openTab = (tabName) => {
    setGoogleActiveTab(tabName);
  };

  const handleWriteReview = () => {
    window.open(
      "https://www.google.com/maps/place/SheKunj+%7C+India%27s+Leading+Women+Empowerment+Organization/@22.7469274,75.891115,17z/data=!4m8!3m7!1s0x3962fde887718c3f:0x5493aa5072c50c99!8m2!3d22.7469274!4d75.8936899!9m1!1b1!16s%2Fg%2F11sjlpmgl6?entry=ttu",
      "_blank",
    );
  };
  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type === "home_position_1";
              });
              setAdsPosition1(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "home_position_2";
              });
              setAdsPosition2(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "home_position_3";
              });
              setAdsPosition3(filterArray3);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type === "home_position_1";
            });
            setAdsPosition1(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "home_position_2";
            });
            setAdsPosition2(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "home_position_3";
            });
            setAdsPosition3(filterArray3);
          }
        });
      },
    );
  }, []);

  const getCategoryList = async () => {
    try {
      const res = await httpServices.get(apiConstants.COURSES.CATEGORY_LIST);
      setCategoryList(res?.results);
    } catch (error) {
      console.error(error);
    }
  };

  const allHomeCourses = async () => {
    try {
      const res = await httpServices.get(apiConstants.COURSES.HOME);
      const popularCareerTests = res?.data?.popular_career_test
        ? res?.data?.popular_career_test?.map((c) => ({
            ...c,
            image: c.image ? c?.image : httpServices.noImage,
          }))
        : [];

      setMockData(popularCareerTests);
    } catch (error) {
      console.error(error);
    }
  };

  const allCourses = async (filter) => {
    setCourseLoader(true);
    try {
      const res = await httpServices.get(
        filter
          ? `${apiConstants.COURSES.COURSE_LIST}` + `?category_id=${filter}`
          : `${apiConstants.COURSES.COURSE_LIST}?limit=10`,
      );
      const courses = {
        ...res,
        results: res?.results
          ? res?.results?.map((c) => ({
              ...c,
              image: c.image ? c?.image : httpServices.noImage,
            }))
          : [],
      };
      setCourseData(courses?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setCourseLoader(false);
    }
  };

  const getAllSuccessStoryData = async () => {
    try {
      const url = `${
        apiConstants.COURSES.SUCCESS_STORY
      }?limit=${6}&offset=${0}`;
      const data = await httpServices.get(url);
      const { featured_success_stories } = data;
      setSuccessData(featured_success_stories?.results);
    } catch (error) {
    } finally {
    }
  };

  const getAllGovtCatagoriesData = async () => {
    try {
      const url = `${apiConstants.CAREER.GOVERNMENT_SCHEMES}`;
      const data = await httpServices.get(url);
      const { govt_category } = data;
      setGovtData(govt_category);
    } catch (error) {
    } finally {
    }
  };

  const getAllEVentsData = async () => {
    try {
      let url = `more/events?limit=${20}&offset=${0}`;
      const { data } = await httpServices.get(url);
      const { event_list, today_tomorrow, this_week, next_week, genres_list } =
        data;
      const setEventsDataUnique = Array.from(
        new Set([...today_tomorrow, ...this_week, ...next_week]),
      );

      const filteredData = setEventsDataUnique.reduce((accumulator, item) => {
        if (!accumulator.find((existingItem) => existingItem.id === item.id)) {
          accumulator.push(item);
        }
        return accumulator;
      }, []);
      setEventsData(filteredData);
    } catch (error) {
      // handle error
    } finally {
    }
  };

  const getAllBlogsData = async () => {
    try {
      const url = `${
        apiConstants.ALL_BLOGS.TRENDING_BLOGS
      }?limit=${10}&offset=${0}`;
      const data = await httpServices.get(url);
      const { trending_blogs } = data;
      setBlogsData(trending_blogs?.results);
    } catch (error) {
    } finally {
    }
  };

  const getAllReviewsData = async () => {
    try {
      const url = `${apiConstants.REVIEWS.ALL_REVIEWS}`;
      const data = await httpServices.get(url);
      const { reviews_list, reviews_on } = data;
      setTestimonialData(reviews_list);
      setReviewsData(reviews_on);
    } catch (error) {
    } finally {
    }
  };

  const handleCategoryOptionClick = (option) => {
    setCategoryName(option);
  };

  useEffect(() => {
    getCategoryList();
    allHomeCourses();
    getAllSuccessStoryData();
    getAllGovtCatagoriesData();
    getAllEVentsData();
    getAllBlogsData();
    getAllReviewsData();
  }, [lan]);

  useEffect(() => {
    allCourses(categoryName);
  }, [categoryName, lan]);

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
                simulateTouch={true}
                effect={"fade"}
                speed={1500}
                autoplay={{ delay: 3000 }}
                navigation={navigation}
                pagination={pagination}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-xl-8 col-lg-8 col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          {t("homePage.mainSlider.heading.1")}{" "}
                          {t("homePage.mainSlider.heading.4")}
                        </h1>
                        <p>{t("homePage.mainSlider.subHeading.1")}</p>
                        <div className='sk-thireChangescolor-btn'>
                          <button
                            className='loadMore'
                            type='button'
                            onClick={() =>
                              history.push(routingConstants.COURSES)
                            }
                          >
                            {t("homePage.mainSlider.button.1")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4'>
                      <div className='sk-imageBanner'>
                        <img src={firstslidebanner} alt='' />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          {t("homePage.mainSlider.heading.2")}{" "}
                          {t("homePage.mainSlider.heading.5")}
                        </h1>
                        <p>{t("homePage.mainSlider.subHeading.2")}</p>
                        <div className='sk-thireChangescolor-btn'>
                          <button
                            className='loadMore'
                            type='button'
                            onClick={() =>
                              history.push(routingConstants.TOP_COLLEGES)
                            }
                          >
                            {t("homePage.mainSlider.button.5")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <img src={firstslidebanner} alt='' />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='row align-items-center'>
                    <div className='col-md-8'>
                      <div className='sh-bannerContent-top'>
                        <h1>
                          {" "}
                          {t("homePage.mainSlider.heading.3.3.1")}{" "}
                          {t("homePage.mainSlider.heading.3.3.2")}
                        </h1>
                        <p>{t("homePage.mainSlider.subHeading.3")}</p>
                        <div className='sk-thireChangescolor-btn'>
                          <button
                            className='loadMore'
                            type='button'
                            onClick={() =>
                              history.push(routingConstants.GUIDANCE_BOOK)
                            }
                          >
                            {t("homePage.mainSlider.button.4")}
                          </button>
                        </div>
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
                          {" "}
                          {t("homePage.mainSlider.heading.6.1")}{" "}
                          {t("homePage.mainSlider.heading.6.2")}
                        </h1>
                        <p> {t("homePage.mainSlider.subHeading.4")}</p>
                        <div className='sk-thireChangescolor-btn'>
                          <button
                            className='loadMore'
                            type='button'
                            onClick={() =>
                              history.push(routingConstants.TOP_SCHOOLS)
                            }
                          >
                            {t("homePage.mainSlider.button.6")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <img src={firstslidebanner} alt='' />
                    </div>
                  </div>
                </SwiperSlide>
                <div className='sk-banner-navigate'>
                  <div className='swiper-button-next'>
                    <span>NEXT</span>
                  </div>
                  <div className='swiper-button-prev'>
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
            <div className='col-xl-8 col-md-10 mx-auto'>
              <div className='sk-heading-title'>
                <h2>Courses In India</h2>
                <p>
                  Courses focused on building strong foundational skills for
                  career growth
                </p>
                <div className='sk-tabBtn-home'>
                  <ul>
                    {categoryList.map((items, index) => {
                      return (
                        <>
                          <li key={index}>
                            <a
                              onClick={() => {
                                handleCategoryOptionClick(items.id);
                                setActiveTab(items.id);
                              }}
                              className={
                                activeTab === items.id && "active-time"
                              }
                            >
                              {items.name}
                            </a>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xl-12'>
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                spaceBetween={30}
                // centeredSlides={true}
                navigation={true}
                speed={1500}
                autoHeight={true}
                autoplay={{ delay: 3000 }}
                className='sk-mySwiper-slide'
                breakpoints={{
                  0: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1199: {
                    slidesPerView: 4,
                  },
                  1250: {
                    slidesPerView: 4,
                  },
                  1920: {
                    slidesPerView: 4,
                  },
                }}
              >
                {courseLoader ? (
                  <CustomLoader size='small' />
                ) : courseData?.length ? (
                  courseData?.map((items, index) => {
                    return (
                      <>
                        <SwiperSlide>
                          <div className='sk-course-box' key={index}>
                            <div className='sk-inner-box'>
                              <div className='sk-course-img'>
                                <img src={items?.image} alt='cousreimg' />
                                {items?.has_certificate ? (
                                  <>
                                    <div className='sk-certificate-box'>
                                      <WorkspacePremiumSharpIcon /> Certificate
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              <div className='sk-course-content'>
                                <div className='sk-category-describe'>
                                  <span className='sk-smallBox-heading'>
                                    {items?.category_name}
                                  </span>
                                  <h6>{items?.name}</h6>
                                  <p
                                    className='sk-smallBox-description'
                                    dangerouslySetInnerHTML={{
                                      __html: makeHtml(
                                        `${truncateString(
                                          items?.description,
                                          100,
                                        )}`,
                                      ),
                                    }}
                                  />
                                </div>
                                <div className='sk-time-education'>
                                  <ul>
                                    <li>
                                      <AccessTimeIcon />{" "}
                                      <span>{items?.reading_time}</span>{" "}
                                    </li>
                                    <li>
                                      <SchoolRoundedIcon /> {items?.enrold}{" "}
                                      enrolled{" "}
                                    </li>
                                  </ul>
                                </div>
                                <div className='sk-courseboth-btn'>
                                  <button
                                    className='sk-course-btn'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.COURSE_DETAILS +
                                          items?.id,
                                      )
                                    }
                                  >
                                    More Info
                                  </button>
                                  <button
                                    className='sk-course-btn sk-courseBg-color'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.COURSES_MODULE +
                                          items?.id,
                                      )
                                    }
                                  >
                                    Start Learning
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className='sk-innerHover-box'>
                              <div className='sk-course-content'>
                                <div className='sk-category-describe'>
                                  <span className='sk-smallBox-heading'>
                                    {items?.category_name}
                                  </span>
                                  <h6>{items?.name}</h6>
                                  <p
                                    className='sk-smallBox-description'
                                    dangerouslySetInnerHTML={{
                                      __html: makeHtml(
                                        `${truncateString(
                                          items?.description,
                                          100,
                                        )}`,
                                      ),
                                    }}
                                  />
                                </div>
                                <div className='sk-time-education'>
                                  <ul>
                                    <li>
                                      <AccessTimeIcon />{" "}
                                      <span>{items?.reading_time}</span>{" "}
                                    </li>
                                    <li>
                                      <SchoolRoundedIcon /> {items?.enrold}{" "}
                                      enrolled{" "}
                                    </li>
                                  </ul>
                                </div>
                                <div className='sk-content-point'>
                                  <h6>What you will learn</h6>
                                  <ul>
                                    {items?.What_you_will_learn?.length
                                      ? items?.What_you_will_learn.map(
                                          (list, index) => {
                                            return (
                                              <li key={index}>{list?.name}</li>
                                            );
                                          },
                                        )
                                      : null}
                                  </ul>
                                </div>
                                <div className='sk-courseboth-btn'>
                                  <button
                                    className='sk-course-btn'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.COURSE_DETAILS +
                                          items?.id,
                                      )
                                    }
                                  >
                                    More Info
                                  </button>
                                  <button
                                    className='sk-course-btn sk-courseBg-color'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.COURSES_MODULE +
                                          items?.id,
                                      )
                                    }
                                  >
                                    Start Learning
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </>
                    );
                  })
                ) : (
                  <>
                    <NoDataFound size='small' />
                  </>
                )}
              </Swiper>
            </div>
            <div className='col-xl-12'>
              <div className='sk-testCourse-btn'>
                <button
                  className='loadMore'
                  onClick={() => history.push(routingConstants.COURSES)}
                >
                  Explore More Courses
                </button>
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
                {
                  <>
                    {adsPosition1.length > 0 && (
                      <div
                        className='ads_home_cover '
                        onClick={() =>
                          addEmailToClient(adsPosition1[0]?.add_email)
                        }
                      >
                        <a
                          href={adsPosition1[0]?.url_adds}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {detect.isMobile
                            ? adsPosition1[0]?.image_mobile && (
                                <img
                                  src={adsPosition1[0]?.image_mobile}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )
                            : adsPosition1[0]?.image && (
                                <img
                                  src={adsPosition1[0]?.image}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )}
                        </a>
                      </div>
                    )}
                  </>
                }
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
              <div
                class='sk-begain-box'
                onClick={() => history.push(routingConstants.GUIDANCE_BOOK)}
              >
                <div class='sk-begain-content'>
                  <h6>I want to</h6>
                  <h5>
                    Upskill <EastRoundedIcon />{" "}
                  </h5>
                </div>
                <div class='sk-begain-img'>
                  <img src={begainimg} />
                </div>
              </div>
            </div>

            <div class='col-md-4'>
              <div
                class='sk-begain-box'
                onClick={() => history.push(routingConstants.GUIDANCE_BOOK)}
              >
                <div class='sk-begain-content'>
                  <h6>I want to</h6>
                  <h5>
                    Change Career <EastRoundedIcon />{" "}
                  </h5>
                </div>
                <div class='sk-begain-img'>
                  <img src={begainimg} />
                </div>
              </div>
            </div>

            <div class='col-md-4'>
              <div
                class='sk-begain-box'
                onClick={() => history.push(routingConstants.GUIDANCE_BOOK)}
              >
                <div class='sk-begain-content'>
                  <h6>I want to crack</h6>
                  <h5>
                    Government Exam <EastRoundedIcon />{" "}
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
                // centeredSlides={true}
                speed={1500}
                autoplay={{ delay: 3000 }}
                navigation={true}
                className='sk-mockSwiper'
                breakpoints={{
                  0: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1199: {
                    slidesPerView: 4,
                  },
                  1250: {
                    slidesPerView: 4,
                  },
                  1920: {
                    slidesPerView: 4,
                  },
                }}
              >
                {mockData?.length ? (
                  mockData?.map((items, index) => {
                    return (
                      <>
                        <SwiperSlide>
                          <div className='sk-course-box'>
                            <div classNam='sk-inner-box'>
                              <div className='sk-course-img'>
                                <img src={items?.image} alt='' />
                              </div>
                              <div className='sk-course-content'>
                                <span className='sk-smallBox-heading'>
                                  Government
                                </span>
                                <h6>{items?.name}</h6>
                                <div className='sk-time-education'>
                                  <ul>
                                    <li>
                                      <AccessTimeIcon />{" "}
                                      <span>
                                        {items?.career_test_time} Minutes
                                      </span>{" "}
                                    </li>
                                    <li>
                                      <SchoolRoundedIcon /> {items?.enrolled}{" "}
                                      enrolled{" "}
                                    </li>
                                  </ul>
                                </div>
                                <div className='sk-courseboth-btn'>
                                  <button
                                    className='sk-course-btn sk-courseBg-color'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.MOCKTEST + items?.id,
                                      )
                                    }
                                  >
                                    Attempt
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className='sk-innerHover-box'>
                              <div className='sk-course-content'>
                                <span className='sk-smallBox-heading'>
                                  Government
                                </span>
                                <h6>{items?.name}</h6>
                                <div className='sk-time-education'>
                                  <ul>
                                    <li>
                                      <AccessTimeIcon />{" "}
                                      <span>
                                        {items?.career_test_time} Minutes
                                      </span>{" "}
                                    </li>
                                    <li>
                                      <SchoolRoundedIcon /> {items?.enrolled}{" "}
                                      enrolled{" "}
                                    </li>
                                  </ul>
                                </div>
                                <div className='sk-number-q'>
                                  <ul>
                                    <li>No. Question</li>
                                    <li>{items?.no_of_questions}</li>
                                    <li>Total Score</li>
                                    <li>{items?.total_score}</li>
                                    <li>languages</li>
                                    <li> Hindi, English</li>
                                  </ul>
                                </div>
                                <div className='sk-courseboth-btn'>
                                  <button
                                    className='sk-course-btn sk-courseBg-color'
                                    onClick={() =>
                                      history.push(
                                        routingConstants.MOCKTEST + items?.id,
                                      )
                                    }
                                  >
                                    Attempt
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </>
                    );
                  })
                ) : (
                  <>
                    <NoDataFound size='small' />
                  </>
                )}
              </Swiper>
            </div>
            <div className='col-xl-12'>
              <div className='sk-testCourse-btn'>
                <button
                  className='loadMore'
                  onClick={() => history.push(routingConstants.MOCKTEST)}
                >
                  Explore More Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-changeBothhire-sec'>
        <div className='sk-hire-container'>
          <div className='sk-hireStory-box'>
            <div className='sk-hireSotory-innerbox'>
              <h2>Seeking for a Chance and a Change?</h2>
              <p>
                Go nowhere. We here at Shekunj offer the best job opportunities
                from the best companies. Find a job and move towards your bright
                future.
              </p>
              <div className='sk-hireChanges-btn'>
                <a
                  href='https://octahire.com/Home/candidate_register'
                  target='_blank'
                  rel='noreferrer'
                >
                  <button className='loadMore'>
                    View All Job Opportunities
                  </button>
                </a>
              </div>
            </div>
            <div className='sk-vectorImg-inner'>
              <img src={vectorimg} />
            </div>
          </div>
          <div className='sk-hireInner-box'>
            <div className='sk-hireStory-box'>
              <div className='sk-hireSotory-innerbox sk-woman-story'>
                <h2>Get hired for your dream job!</h2>
                <p>
                  Land your dream job by designing a perfect resume in a
                  print-ready <br /> format
                </p>
                <div className='sk-thireChangescolor-btn'>
                  <a
                    href='https://octahire.com/Home/candidate_register'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <button className='loadMore'>Create Your CV Now</button>
                  </a>
                </div>
              </div>
              <div className='sk-vectorImg-inner'>
                <img src={vectorimg1} />
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
                {
                  <>
                    {adsPosition2.length > 0 && (
                      <div
                        className='ads_home_cover '
                        onClick={() =>
                          addEmailToClient(adsPosition2[0]?.add_email)
                        }
                      >
                        <a
                          href={adsPosition2[0]?.url_adds}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {detect.isMobile
                            ? adsPosition2[0]?.image_mobile && (
                                <img
                                  src={adsPosition2[0]?.image_mobile}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )
                            : adsPosition2[0]?.image && (
                                <img
                                  src={adsPosition2[0]?.image}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )}
                        </a>
                      </div>
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-scheme-sec sk-bg-color'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='sk-heading-title'>
                <h2>Government Scheme</h2>
                <p>
                  Courses focused on building strong foundational skills for
                  career growth
                </p>
              </div>
              <div className='sk-gScheme-box'>
                {govtData?.length ? (
                  <ul>
                    {govtData?.map((items, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            history.push(routingConstants.GOVERNMENT_SCHEMES)
                          }
                        >
                          <h5 className='sk-gScheme-title'>
                            {items?.schemes_count ? items?.schemes_count : 0}{" "}
                            Schemes
                          </h5>
                          <h4 className='sk-gScheme-heading'>{items?.name}</h4>
                          <div className='sk-readmore-story'>
                            <button
                              className='sk-storyRead-more'
                              onClick={() =>
                                history.push(
                                  routingConstants.GOVERNMENT_SCHEMES,
                                )
                              }
                            >
                              View All <EastRoundedIcon />
                            </button>
                          </div>
                          <span>
                            {items?.image && (
                              <img src={items?.image} alt='agricultureicon' />
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <NoDataFound size='small' />
                )}
              </div>
            </div>

            <div className='col-xl-12'>
              <div className='sk-testCourse-btn'>
                <button
                  className='loadMore'
                  onClick={() =>
                    history.push(routingConstants.GOVERNMENT_SCHEMES)
                  }
                >
                  Explore More Scheme
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-blogHome-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-4'>
              <div className='sk-blogSidebar-event'>
                <div className='sk-blogHeadinghome-title'>
                  <h3>Upcoming Event</h3>
                </div>
                <div className='sk-eventDatetime-detail'>
                  <ul>
                    {eventsData?.length ? (
                      eventsData?.map((items, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              onClick={() =>
                                history.push(
                                  routingConstants.MORE_EVENT + items.id,
                                )
                              }
                            >
                              <div
                                className='sk-eventDate'
                                dangerouslySetInnerHTML={{
                                  __html: makeHtml(
                                    formatDateRange(
                                      items.start_date,
                                      items.end_date,
                                    ),
                                  ),
                                }}
                              />

                              <div className='sk-eventTime-detail'>
                                <h6>
                                  {formatTimeRange(
                                    items.start_time,
                                    items.end_time,
                                  )}
                                </h6>
                                <h4>{items?.title}</h4>
                              </div>
                            </li>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <NoDataFound size='small' />
                      </>
                    )}
                  </ul>
                  <div className='sk-readmore-story text-right mt-2'>
                    <button
                      className='sk-storyRead-more'
                      onClick={() => history.push(routingConstants.MORE_EVENT)}
                    >
                      View All <EastRoundedIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-8'>
              <div className='sk-blog-slider sk-slide-arrow'>
                <div className='sk-blogHeadinghome-title'>
                  <h3>Blog</h3>
                </div>
                <div className='sk-blogSlider-home'>
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={4}
                    spaceBetween={24}
                    // centeredSlides={true}
                    navigation={true}
                    speed={1500}
                    autoHeight={true}
                    autoplay={{ delay: 3000 }}
                    className='sk-mySwiper-slide'
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      767: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      991: {
                        slidesPerView: 2,
                      },
                      1199: {
                        slidesPerView: 2,
                      },
                      1250: {
                        slidesPerView: 2,
                      },
                      1920: {
                        slidesPerView: 2,
                      },
                    }}
                  >
                    {courseLoader ? (
                      <CustomLoader size='small' />
                    ) : blogsData?.length ? (
                      blogsData?.map((items, index) => {
                        return (
                          <>
                            <SwiperSlide>
                              <LatestBlogCard
                                image={items.image}
                                hashtags={items.hash_tags}
                                title={items.title}
                                description={`${items.about_blog}`}
                                makeHtml={makeHtml}
                                key={index}
                                created_at={DateFormat(`${items.created_at}`)}
                                reading_time={items.reading_time}
                                id={items.id}
                                blog_count={items.blog_count}
                                category_name={items.category_name}
                              />
                            </SwiperSlide>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <NoDataFound size='small' />
                      </>
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className='col-xl-12 mx-auto'>
              <div className='text-center pt-4'>
                {
                  <>
                    {adsPosition3.length > 0 && (
                      <div
                        className='ads_home_cover '
                        onClick={() =>
                          addEmailToClient(adsPosition3[0]?.add_email)
                        }
                      >
                        <a
                          href={adsPosition3[0]?.url_adds}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {detect.isMobile
                            ? adsPosition3[0]?.image_mobile && (
                                <img
                                  src={adsPosition3[0]?.image_mobile}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )
                            : adsPosition3[0]?.image && (
                                <img
                                  src={adsPosition3[0]?.image}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )}
                        </a>
                      </div>
                    )}
                  </>
                }
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
                  speed={1500}
                  autoplay={{ delay: 3000 }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className='sk-swiperSuccess-story'
                >
                  {successData?.length ? (
                    successData?.slice(0, 6).map((items, index) => {
                      return (
                        <>
                          <SwiperSlide>
                            <div
                              className='sk-story-testmonial'
                              onClick={() =>
                                history.push(
                                  routingConstants.SUCCESS_STORIES + items?.id,
                                )
                              }
                            >
                              <div className='sk-story-content'>
                                <img src={items?.image} alt='' />
                              </div>
                              <div className='sk-story-content'>
                                <h4>{items?.title}</h4>
                                <div className='sk-bottom-box'>
                                  <div className='sk-storySuccess-testmonial'>
                                    <span>
                                      <AccessTimeIcon />
                                      {items.created_at}
                                    </span>
                                    <span>
                                      <MenuBookRoundedIcon />
                                      {items.reading_time}
                                    </span>
                                    <span>
                                      <VisibilityOutlinedIcon />
                                      {items?.ss_count}
                                    </span>
                                  </div>
                                  <div className='sk-readmore-story'>
                                    <button
                                      className='sk-storyRead-more'
                                      onClick={() =>
                                        history.push(
                                          routingConstants.SUCCESS_STORIES +
                                            items?.id,
                                        )
                                      }
                                    >
                                      Read More <EastRoundedIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <NoDataFound size='small' />
                    </>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-testmonail-sec sk-homeStory-sec sk-slide-arrow'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='sk-heading-title mb-0'>
                <h2>
                  Why our students{" "}
                  <span className='sk-favorite-icon'>
                    L <FavoriteRoundedIcon /> VE{" "}
                  </span>{" "}
                  us?
                </h2>
                <p className='mb-0'>Hear itfrom our Alumni</p>
              </div>
            </div>
            <div className='col-xl-12'>
              <div className='sk-success-story'>
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={3}
                  spaceBetween={30}
                  // centeredSlides={true}
                  speed={1500}
                  autoplay={{ delay: 3000 }}
                  navigation={true}
                  className='sk-mockSwiper'
                  breakpoints={{
                    0: {
                      slidesPerView: 1.5,
                      spaceBetween: 15,
                    },
                    767: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    991: {
                      slidesPerView: 3,
                    },
                    1199: {
                      slidesPerView: 3,
                    },
                    1250: {
                      slidesPerView: 3,
                    },
                    1920: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  <>
                    {testimonialData?.length
                      ? testimonialData?.map((items, index) => {
                          const ratingStars = [];
                          for (let i = 0; i < items?.rating; i++) {
                            ratingStars.push(<GradeRoundedIcon key={i} />);
                          }
                          return (
                            <>
                              <SwiperSlide>
                                <div className='sk-studentlove-box'>
                                  <p>{items?.description}</p>
                                  <div className='sk-userReview-box'>
                                    <span>
                                      <img src={items?.image} alt='' />
                                    </span>
                                    <span>
                                      <h5>{items?.name}</h5>
                                      <h6>{items?.job_title}</h6>
                                      <span className='sk-review-home'>
                                        {ratingStars.map((star, index) => (
                                          <a key={index}>{star}</a>
                                        ))}
                                      </span>
                                    </span>
                                  </div>
                                  <span className='sk-qoutesicon'>
                                    <img src={quatesicon} />
                                  </span>
                                </div>
                              </SwiperSlide>
                            </>
                          );
                        })
                      : null}
                  </>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='tabs'>
                <button
                  className={`tab-link ${
                    googleActiveTab === "google-reviews" ? "active" : ""
                  }`}
                  onClick={() => openTab("google-reviews")}
                >
                  <img src={google} alt='google' />
                </button>
                <button
                  className={`tab-link ${
                    googleActiveTab === "trustpilot" ? "active" : ""
                  }`}
                  onClick={() => openTab("trustpilot")}
                >
                  <img src={trustpilot} alt='trustpilot' />
                </button>
                <button
                  className={`tab-link ${
                    googleActiveTab === "glassdoor" ? "active" : ""
                  }`}
                  onClick={() => openTab("glassdoor")}
                >
                  <img src={glassdrop} alt='glassdrop' />
                </button>
              </div>

              <div
                id='google-reviews'
                className={`tab-content ${
                  googleActiveTab === "google-reviews" ? "active" : ""
                }`}
              >
                <div className='sk-review-main'>
                  <div className='sk-rating-overall'>
                    <h5>Overall Rating</h5>
                    <div>
                      <span className='sk-view-no'>4.8</span>
                      <span className='sk-review-home'>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                      </span>
                      <span className='sk-view-rating'>1,189 reviews</span>
                    </div>
                  </div>
                  <div className='sk-button-write'>
                    <button className='sk-btn' onClick={handleWriteReview}>
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>

              <div
                id='trustpilot'
                className={`tab-content ${
                  googleActiveTab === "trustpilot" ? "active" : ""
                }`}
              >
                <div className='sk-review-main'>
                  <div className='sk-rating-overall'>
                    <h5>Overall Rating</h5>
                    <div>
                      <span className='sk-view-no'>5.0</span>
                      <span className='sk-review-home'>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                      </span>
                      <span className='sk-view-rating'>1099 reviews</span>
                    </div>
                  </div>
                  <div className='sk-button-write'>
                    <button className='sk-btn'>Write a Review</button>
                  </div>
                </div>
              </div>

              <div
                id='glassdoor'
                className={`tab-content ${
                  googleActiveTab === "glassdoor" ? "active" : ""
                }`}
              >
                <div className='sk-review-main'>
                  <div className='sk-rating-overall'>
                    <h5>Overall Rating</h5>
                    <div>
                      <span className='sk-view-no'>3.2</span>
                      <span className='sk-review-home'>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                        <a href='javascript:;'>
                          <GradeRoundedIcon />
                        </a>
                      </span>
                      <span className='sk-view-rating'>1,289 reviews</span>
                    </div>
                  </div>
                  <div className='sk-button-write'>
                    <button className='sk-btn'>Write a Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='sk-addHome-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 mx-auto'>
              <div className='text-center'>
                {
                  <>
                    {adsPosition1.length > 0 && (
                      <div
                        className='ads_home_cover '
                        onClick={() =>
                          addEmailToClient(adsPosition1[0]?.add_email)
                        }
                      >
                        <a
                          href={adsPosition1[0]?.url_adds}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {detect.isMobile
                            ? adsPosition1[0]?.image_mobile && (
                                <img
                                  src={adsPosition1[0]?.image_mobile}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )
                            : adsPosition1[0]?.image && (
                                <img
                                  src={adsPosition1[0]?.image}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )}
                        </a>
                      </div>
                    )}
                  </>
                }
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
