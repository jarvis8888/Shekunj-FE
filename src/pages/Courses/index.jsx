import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aos from "aos";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allCourses, setFilter } from "../../store/courses/action";

import { Header, Footer, SEO } from "../../components";

import one from "../../assets/images/Courses/01.png";
import two from "../../assets/images/Courses/02.png";
import three from "../../assets/images/Courses/03.png";
import img1 from "../../assets/images/Courses/img1.png";
import img2 from "../../assets/images/Courses/img2.png";
import img3 from "../../assets/images/Courses/img3.png";

import Cross from "../../assets/icons/cross.png";
import Reset from "../../assets/icons/reset.png";

import "./index.scss";
import "../../pages/HomePage/index.scss";
import SimpleAccordion from "./Accordian";
import { routingConstants } from "../../utils/constants";

const Courses = (props) => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.coursesReducer);
  const [isSubSelected, setIsSubSelected] = useState(false);
  const [resetState, setResetState] = useState(false);
  const dispatch = useDispatch();

  const {lan} = useSelector(state => state.careerReducer);
  useEffect(() => {debugger},[lan]);

  useEffect(() => {
    dispatch(allCourses());
  }, [dispatch]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const handleResetFilter = () => {
    if (state?.selectedFilter) {
      dispatch(allCourses(null));
    }
    dispatch(setFilter(null));
  };
  const handleResetFilterDemo = (s, obj) => {
    dispatch(allCourses(`?category_id=${s.category_id}`));
    dispatch(setFilter([obj]));
    setIsSubSelected(false);
    setResetState(true);
  };

  const checkFunction = () => {
    return state?.allCourses?.results?.map((obj) => (
      <Link
        to={routingConstants.COURSE_DETAILS + obj.id}
        className='col-md-6'
        key={obj?.id}
      >
        <div className='box box_hov'>
          <div className='slide-img'>
            <img alt='' src={obj?.image} />
            <div className='overlay'></div>
          </div>

          <div className='tag_btn'>
            <button className='btn btn-info'>{obj?.category_name}</button>
            <h6>{obj?.name}</h6>
          </div>
        </div>
      </Link>
    ));
  };
  return (
    <div>
      <SEO title='Sheकुंज - Courses' />
      <Header loginPage={true} page='courses' />
      <section className='Cors_sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7 col-md-9'>
              <div className='cors_con'>
                <h2>{t("coursesPage.banner.heading")}</h2>
                <div className='cour_box'>
                  <ul>
                    <li>
                      <img src={one} alt='' srcSet='' />
                    </li>
                    <li>
                      <img src={two} alt='' srcSet='' />
                    </li>
                    <li>
                      <img src={three} alt='' srcSet='' />
                    </li>
                  </ul>
                  <div className='rig_ul'>
                    <ul className='ulcont'>
                      <li>
                        <img src={img1} alt='' />
                      </li>
                      <li> {t("coursesPage.banner.1")}</li>
                    </ul>

                    <ul className='ulcont'>
                      <li>
                        <img src={img2} alt='' />
                      </li>
                      <li>
                        {" "}
                        {t("coursesPage.banner.2.1")} <br />
                        {t("coursesPage.banner.2.2")}
                      </li>
                    </ul>

                    <ul className='ulcont'>
                      <li>
                        <img src={img3} alt='' />
                      </li>
                      <li> {t("coursesPage.banner.3")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='Srch_sec mb-5'>
        <div className='container'>
          <Row>
            <Col md={10} xs={12}>
              <h1>{t("coursesPage.heading.1")}</h1>
              <p className='courses_para mb-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque eget pretium nisl vitae porttitor aliquet id
                posuere tortor. Id turpis neque urna elit pellentesque est
                curabitur. Tincidunt fringilla viverra ut feugiat leo porta.
                Ridiculus viverra cum aliquam curabitur.
              </p>
            </Col>
          </Row>

          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <SimpleAccordion
                isSubSelected={(val) => {
                  setIsSubSelected(val);
                }}
                isResetPressed={resetState}
                changeResetAgain={(val) => {
                  setResetState(val);
                }}
              />
            </div>
            <div className='col-md-8 col-sm-8'>
              <div className='content_right'>
                <h3 className='result_head'>
                  {t("coursesPage.other.1.1")}{" "}
                  {state?.allCourses?.results?.length || 0}{" "}
                  {t("coursesPage.other.1.2")}
                </h3>

                <Row>
                  <Col xl={9} lg={8} md={8} xs={12}>
                    <div className='filter_added mb-5'>
                      {state?.selectedFilter?.length > 0 &&
                        isSubSelected &&
                        state?.allCourses?.results?.map((s, i) => {
                          return (
                            <div key={s.id} className='filter_content'>
                              {s.name}{" "}
                              <img
                                src={Cross}
                                onClick={() =>
                                  handleResetFilterDemo(
                                    s,
                                    state?.categoryList[i],
                                  )
                                }
                                className='ml-3'
                                alt='...'
                              />
                            </div>
                          );
                        })}
                    </div>
                  </Col>

                  <Col xl={3} lg={4} md={4} xs={12}>
                    <div className='reset_content pt-2'>
                      {state?.allCourses && (
                        <p onClick={() => handleResetFilter()}>
                          <img src={Reset} className='mr-2' alt='...' />{" "}
                          {t("coursesPage.other.2")}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='filter_right_content'>
                <div className='row'>
                  {state?.allCourses?.results?.length > 0 ? (
                    checkFunction()
                  ) : (
                    <div className='text-center mt-2'>
                      {t("common.noDataFound")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer loginPage={false} />
    </div>
  );
};

export default Courses;
