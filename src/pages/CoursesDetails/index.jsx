import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getSimilarCourses,
  singleCourseDetails,
  startCourse,
} from "../../store/courses/action";
import { Container, Row, Col } from "react-bootstrap";
import Check from "../../assets/icons/check1.png";
import monitor from "../../assets/icons/monitor.png";
import lifetime1 from "../../assets/icons/lifetime1.png";
import certificate1 from "../../assets/icons/certificate1.png";
import clipboard from "../../assets/icons/clipboard.png";
import flexible1 from "../../assets/icons/flexible1.png";
import Language1 from "../../assets/icons/Language1.png";
import add from "../../assets/images/add.png";
import { Header, Footer, SEO, Carousel } from "../../components";
import "./index.scss";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { course } = useSelector((state) => state.coursesReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(singleCourseDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  useEffect(() => {
    if (course?.category_id) {
      dispatch(getSimilarCourses(course?.category_id));
    }
  }, [dispatch, course?.category_id, lan]);

  const [courseDetailAds, setCourseDetailAds] = useState([]);
  const [image, setImage] = useState("NA");

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
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .get(
  //         `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
  //       )
  //       .then((response) => {
  //         if (response.data.results.length > 0) {
  //           let filterArray = response.data.results.filter((item, index) => {
  //             return item.image_type == "course_detail";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setCourseDetailAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code Below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "course_detail",
                  )
                );
              });
              setCourseDetailAds(filterArray1);
              // console.log("filterArray1course_detail",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "course_detail",
                )
              );
            });
            setCourseDetailAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

  const checkCourseComplete = async (id) => {
    let retryCount = 0;
    const maxRetries = 3;

    const makeRequest = async () => {
      try {
        const res = await axios.get(
          `course/start-user-course/${id}?page=${1}&progress=${100}`,
        );
        if (res) {
          console.log(`worked`);
          const redirectTo = `${routingConstants.COURSES_TEST}${id}`;
          window.location.assign(new URL(redirectTo, window.location.origin));
        }
      } catch (error) {
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`Retrying... Attempt ${retryCount} of ${maxRetries}`);
          await makeRequest();
        } else {
          console.log(`Max retry limit reached. Cannot proceed further.`);
        }
      }
    };

    await makeRequest();
  };

  const currentUrl = window.location.href;

  useEffect(() => {
    const localLanguage = localStorage.getItem("i18nextLng");
    const { pathname, search } = location;
    const updatedSearch = new URLSearchParams(search);
    updatedSearch.set("lang", localLanguage);
    const newUrl = `${pathname}?${updatedSearch.toString()}`;
    history.push(newUrl);
  }, [lan]);
  return (
    <>
      <SEO
        title={course?.meta_title ? course?.meta_title : course?.title}
        description={course?.meta_description}
        keywords={course?.meta_keywords}
        image={course?.image}
        currentUrl={currentUrl}
        link={course?.canonical_tags ? course?.canonical_tags : currentUrl}
      />
      <div>
        <Header loginPage={true} page='courses' urlLangShow={true} />
        <section className='CouDtl_ban noselect'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-7'>
                <div className='CouDtl_con'>
                  <h2>{course?.category_name}</h2>
                  <h5>{course?.name}</h5>
                  <div className='ban_rat'></div>
                  <h4>
                    {course?.course_creation}
                    {/* <span>
                      {t("coursesPage.coursesDetailsPage.heading.1.2")}
                    </span> */}
                  </h4>
                </div>
              </div>

              <div className='col-md-5'>
                <div className='CouDtl'>
                  <img src={course?.image} alt='' srcSet='' />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='Coutl_sec1 noselect'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-7'>
                <div className='sec1_des'>
                  <h2>{t("coursesPage.coursesDetailsPage.heading.2")}</h2>
                  {/* <p>{course?.description}</p> */}
                  <div
                    dangerouslySetInnerHTML={{ __html: course?.description }}
                  />
                </div>
                <div className='mt-2 mb-2'></div>
                <div className='sec1_con2 con_setSec1'>
                  <h2>{t("coursesPage.coursesDetailsPage.heading.3")}</h2>
                  <Row>
                    {course?.What_you_will_learn?.map((item) => {
                      return (
                        <Col md={6} xs={12} key={item.id}>
                          <div className='features_box'>
                            <div className='sk-features-inner'>
                              <img src={Check} alt='' srcSet='' />
                            </div>
                            <div className='sk-features-content'>
                              <p>{item?.name}</p>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className='sec1_con2'>
                  <h2>{t("coursesPage.coursesDetailsPage.heading.4")}</h2>

                  <Row>
                    <Col md={6} xs={12}>
                      <div className='features_box'>
                        <div className='sk-features-inner'>
                          <img src={monitor} alt='' srcSet='' />
                        </div>
                        <div className='sk-features-content'>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.1",
                            )}
                          </h6>
                          <p>
                            We offer 100% online courses which you can access
                            from anywhere at your own comfort!
                          </p>
                        </div>
                      </div>
                      <div className='features_box'>
                        <div>
                          <img src={lifetime1} alt='' srcSet='' />
                        </div>
                        <div>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.2",
                            )}
                          </h6>
                          <p>
                            Get the access to courses for lifetime and learn
                            from anywhere and anytime.
                          </p>
                        </div>
                      </div>
                      <div className='features_box'>
                        <div className='sk-features-img'>
                          <img src={certificate1} alt='' srcSet='' />
                        </div>
                        <div className='sk-features-content'>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.3",
                            )}
                          </h6>
                          <p>
                            Earn industry recognized certificate after the
                            completion of course.
                          </p>
                        </div>
                      </div>
                    </Col>

                    <Col md={6} xs={12}>
                      <div className='features_box'>
                        <div>
                          <img src={clipboard} alt='' srcSet='' />
                        </div>
                        <div>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.4",
                            )}
                          </h6>
                          <p>
                            Join SheKunj, a community forum that believes women
                            education and empowerment is in the mainstream.
                          </p>
                        </div>
                      </div>

                      <div className='features_box'>
                        <div>
                          <img src={flexible1} alt='' srcSet='' />
                        </div>
                        <div>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.5",
                            )}
                          </h6>
                          <p>
                            Learn and keep a practical approach towards your
                            courses by flexible timings and deadlines.
                          </p>
                        </div>
                      </div>

                      <div className='features_box'>
                        <div>
                          <img src={Language1} alt='' srcSet='' />
                        </div>
                        <div>
                          <h6>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.6.heading",
                            )}
                          </h6>
                          <p>
                            {t(
                              "coursesPage.coursesDetailsPage.heading.features.6.data",
                            )}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className='col-md-5'>
                <div className='sec2_right'>
                  {course?.redirection_link
                    ?.do_you_want_to_redirect_this_course ? (
                    <a
                      href={course?.redirection_link?.redirection_link}
                      target='_blank'
                      rel='noopener noreferrer' // Recommended for security reasons
                      className='btn btn_str_Cor'
                    >
                      {t("coursesPage.coursesDetailsPage.other.1")}
                    </a>
                  ) : (
                    <Link
                      to={routingConstants.COURSES_MODULE + course?.id}
                      className='btn btn_str_Cor'
                    >
                      {t("coursesPage.coursesDetailsPage.other.1")}
                    </Link>
                  )}
                  <a
                    className='btn btn_str_Cor'
                    onClick={() => checkCourseComplete(course?.id)}
                  >
                    Give Test / Get Certified
                  </a>

                  <h3 className='similar-coursestext'>
                    {t("coursesPage.coursesDetailsPage.other.2")}
                  </h3>
                  <div className='cou_set_similer'>
                    <Carousel page='courseDetail' set />
                  </div>
                  <Link to='/courses' className='btn_view'>
                    {t("coursesPage.coursesDetailsPage.other.3")}
                  </Link>
                </div>
              </div>

              <Container>
                <Row>
                  {courseDetailAds.length > 0 && (
                    <div
                      className='col-md-12 ads_course_detail_cover'
                      onClick={() => addEmail(courseDetailAds[0]?.add_email)}
                    >
                      <a href={courseDetailAds[0]?.url_adds} target='_blank'>
                        <img
                          src={courseDetailAds[0]?.image}
                          alt='Image'
                          className='ads_course_detail'
                        />
                      </a>
                    </div>
                  )}
                </Row>
              </Container>

              {/* <Container>
              <Row>
                <Col lg={7} md={12}>
                  <div className='sec1_con2'>
                    <h2>{t("coursesPage.coursesDetailsPage.heading.4")}</h2>

                    <Row>
                      <Col md={6} xs={12}>
                        <div className='features_box'>
                          <div>
                            <img src={monitor} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.1",
                              )}
                            </h6>
                            <p>
                              We offer 100% online courses which you can access
                              from anywhere at your own comfort!
                            </p>
                          </div>
                        </div>
                        <div className='features_box'>
                          <div>
                            <img src={lifetime1} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.2",
                              )}
                            </h6>
                            <p>
                              Get the access to courses for lifetime and learn
                              from anywhere and anytime.
                            </p>
                          </div>
                        </div>
                        <div className='features_box'>
                          <div>
                            <img src={certificate1} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.3",
                              )}
                            </h6>
                            <p>
                              Earn industry recognized certificate after the
                              completion of course.
                            </p>
                          </div>
                        </div>
                      </Col>

                      <Col md={6} xs={12}>
                        <div className='features_box'>
                          <div>
                            <img src={clipboard} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.4",
                              )}
                            </h6>
                            <p>
                              Join SheKunj, a community forum that believes
                              women education and empowerment is in the
                              mainstream.
                            </p>
                          </div>
                        </div>

                        <div className='features_box'>
                          <div>
                            <img src={flexible1} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.5",
                              )}
                            </h6>
                            <p>
                              Learn and keep a practical approach towards your
                              courses by flexible timings and deadlines.
                            </p>
                          </div>
                        </div>

                        <div className='features_box'>
                          <div>
                            <img src={Language1} alt='' srcSet='' />
                          </div>
                          <div>
                            <h6>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.6.heading",
                              )}
                            </h6>
                            <p>
                              {t(
                                "coursesPage.coursesDetailsPage.heading.features.6.data",
                              )}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container> */}
            </div>
          </div>
        </section>
        <Footer loginPage={false} />
      </div>
    </>
  );
};

export default CourseDetails;
