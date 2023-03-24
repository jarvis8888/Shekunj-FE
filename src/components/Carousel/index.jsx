import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { allHomeCourses } from "../../store/courses";
import { getGovernmentExams } from "../../store/career";
import { constants } from "../../utils";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./index.scss";

function Carousel(props) {
  const { carouselConstant, routingConstants } = constants;
  const divRef = React.useRef(null);
  const { courses, course, tests, similarCourses } = useSelector(
    (state) => state.coursesReducer,
  );
  const { governmentExams } = useSelector((state) => state.careerReducer);
  const { lan } = useSelector((state) => state.languageReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allHomeCourses());
  }, [dispatch, course?.category_id, lan]);

  useEffect(() => {
    dispatch(getGovernmentExams());
  }, [dispatch, lan]);

  const handleChange = (e) => {
    const carousel = e?.relatedTarget;
    let totalItems = 0;
    if (props.type === carouselConstant.COURSES) {
      totalItems = courses?.length || 0;
    } else if (props.type === carouselConstant.TEST) {
      totalItems = tests?.length || 0;
    } else if (props.type === carouselConstant.GOVERNMENT_SCHEMES) {
      totalItems = governmentExams?.govt_list?.results?.length || 0;
    }
    if (props.page === carouselConstant.HOMEPAGE) {
      if (divRef.current) {
        divRef.current.innerHTML = `${carousel.relative(carousel.current()) + 1 || 0
          }/${totalItems}`;
      }
    }
  };

  return (
    <div className='noselect'>
      <div className='container Our_text'>
        <p>{props.title1}</p>
        <h2>{props.title2}</h2>
      </div>
      <div className={!props.set && 'set'}>
        {props.page === carouselConstant.HOMEPAGE && (
          <div className='abc_box'>
            <div className='abc' ref={divRef}></div>
          </div>
        )}

        <OwlCarousel
          className={
            props.page === carouselConstant.COURSE_DETAIL
              ? "similar-coursesslider"
              : "owl-theme"
          }
          loop={true}
          // loop={courses?.length > 5}
          margin={props.page === carouselConstant.COURSE_DETAIL ? 10 : 210}
          nav={props.page === carouselConstant.COURSE_DETAIL ? false : true}
          items={props.page === carouselConstant.COURSE_DETAIL ? 1.4 : 4}
          dots={false}
          autoplay={true}
          autoplayTimeout='1500'
          autoplayHoverPause={false}
          smartSpeed='800'
          onChanged={(e) => handleChange(e)}
          responsive={{
            0: {
              items: 1,
              nav: true,
            },
            768: {
              items: 2,
              nav: true,
            },
            375: {
              items: 1.5,
              nav: true,
              margin: 50,
            },
            1024: {
              items: props.page === carouselConstant.COURSE_DETAIL ? 1.4 : 3,
              nav: true,
            },
            1200: {
              items: props.page === carouselConstant.COURSE_DETAIL ? 1.4 : 4,
              nav: true,
            },
            1366: {
              items: props.page === carouselConstant.COURSE_DETAIL ? 1.4 : 4,
              nav: true,
              margin: 250,
            },
            1920: {
              items: 5,
              margin: 250,
              nav: true,
            },
          }}
        >
          {props.page === carouselConstant.COURSE_DETAIL && (
            <>
              {similarCourses?.map((course, ind) => {
                if (course?.id === Number(id)) {
                  return null;
                }
                return (
                  <Link
                    to={routingConstants.COURSE_DETAILS + course?.id}
                    className='item'
                    key={ind}
                  >
                    <div key={course?.id} className='boxnew'>
                      <div className='slide-img1'>
                        <img alt='...' src={course?.image} />
                        <div className='overlay'></div>
                      </div>
                      <div className='tag_btn'>
                        <p>{course?.name}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
          {props.type === carouselConstant.COURSES && (
            <>
              {courses?.map((obj, ind) => (
                <Link
                  to={routingConstants.COURSE_DETAILS + obj?.id}
                  className='item'
                  key={ind}
                >
                  <div className='box'>
                    <div className='slide-img'>
                      <img alt='' src={obj?.image} />
                      <div className='overlay'></div>
                    </div>
                    <div className='tag_btn'>
                      <button className='btn btn-info'>
                        {obj?.category_name}
                      </button>
                      <h2>{obj?.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
          {props.type === carouselConstant.GOVERNMENT_SCHEMES && (
            <>
              {governmentExams?.govt_list?.results?.map((obj) => (
                <Link
                  to={routingConstants.GOVERNMENT_SCHEMES + obj.id}
                  className='item'
                  key={obj.id}
                >
                  <div className='box'>
                    <div className='slide-img'>
                      <img alt='' src={obj?.logo} />
                      <div className='overlay'></div>
                    </div>
                    <div className='tag_btn'>
                      <button className='btn btn-info'>{obj?.exam}</button>
                      <h2>{obj?.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
          {props.type === carouselConstant.TEST && (
            <>
              {tests?.map((obj, ind) => (
                <Link to='/mock-test'>
                  <div className='item' key={ind}>
                    <div className='box'>
                      <div className='slide-img'>
                        <img alt='' src={obj?.image} />
                        <div className='overlay'></div>
                      </div>
                      <div className='tag_btn'>
                        <h2>{obj?.name}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default Carousel;
