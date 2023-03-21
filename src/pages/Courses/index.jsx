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
import Search from "../../assets/icons/search1.png";
import Reset from "../../assets/icons/reset.png";
import add1 from "../../assets/images/add1.png";
import "./index.scss";
import "../../pages/HomePage/index.scss";
import SimpleAccordion from "./Accordian";
import { routingConstants } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import axios from "axios";
import { adsList } from "../../store/ads";
import { Helmet } from "react-helmet-async";
// accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Courses = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.coursesReducer);
  // const {} = useSelector((state) => state.coursesReducer);
  const [isSubSelected, setIsSubSelected] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [pageLimit] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [categoryPageCount, setCategoryPageCount] = useState(0);
  const [coursesBoxAds, setCoursesBoxAds] = useState([]);
  const [coursesSideAds, setCoursesSideAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [image1, setImage1] = useState("NA");
  const [searchInput, setSearchInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [hasSuggestion, setHasSuggestion] = useState([suggestion].length > 0);
  const [flag, setFlag] = useState(true)

  const dispatch = useDispatch();

  const { lan } = useSelector((state) => state.languageReducer);
  const tempVal = [];
  useEffect(() => {
    dispatch(allCourses());
    // dispatch(allCourses(`?limit=${pageLimit}`));
  }, [dispatch, pageLimit, lan]);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 2000 });
  }, []);
  const page_adds = JSON.parse(sessionStorage.getItem('current_adds'))

  const findAdds=(addslen,len)=>{
    let x=0;
    let arr=[]
    for(let i=0;i<len;i++){
      if(x>=addslen){
       x=0
      }
     arr.push(x)
     x++
    }
      return arr
  }
  useEffect(() => {
    if (state?.allCourses?.results?.length > 0 && coursesBoxAds.length && flag) {
      const addslen = coursesBoxAds.length
      let len = state?.allCourses?.count / pageLimit;
      len = Math.trunc(len)
      console.log(len,addslen)
      
      const adds_arr=findAdds(addslen,len)
      sessionStorage.setItem('current_adds', JSON.stringify({ addIndex: 0, addsData: adds_arr }));
      setFlag(false)
    }
  }, [state, coursesBoxAds])

  const handleResetFilter = () => {
    if (state?.selectedFilter) {
      dispatch(allCourses(`?limit=${pageLimit}&offset=0`));
      setPageCount(0);
    }
    dispatch(setFilter(null));
    setCategoryId(null);
    setCategoryPageCount(0);
  };

  const handleResetFilterDemo = (s, obj) => {
    dispatch(allCourses(`?category_id=${s.category_id}&limit=${pageLimit}`));
    dispatch(setFilter([obj]));
    setIsSubSelected(false);
    setResetState(true);
  };

  const shuffleFun = (obj, index) => {

    let num = Math.floor(Math.random() * (4 - 0) + 0)
    if (obj?.id === 'advertistment') {
      return (
        <>
          {
            coursesBoxAds?.length > 0 ?
              <div className='col-md-6'>
                <div className='google_add_box box_hov'>
                  {coursesBoxAds && coursesBoxAds.length > 0 && (
                    <div className='slide-img'>
                      <a href={coursesBoxAds[page_adds?.addsData[page_adds?.addIndex]]?.url_adds} target='_blank' rel="noreferrer">
                        <img
                          src={coursesBoxAds[page_adds?.addsData[page_adds?.addIndex]]?.image}
                          alt='Image'
                          className='google_add_box_img'
                          style={{ paddingTop: 0 }}
                        />
                      </a>
                      <div className='overlay'></div>
                    </div>
                  )}
                </div>
              </div>
              :
              ""
          }
        </>
      )
    }
    else {
      return (
        <Link
          to={
            routingConstants.COURSE_DETAILS + obj?.id
          }
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
      )
    }

    // }
    // else if (index == 4) {
    //   return (
    //     <div className='col-md-6'>
    //       <div className='google_add_box box_hov'>
    //         {coursesBoxAds.length > 0 && (
    //           <div className='slide-img'>
    //             <a href={coursesBoxAds[0]?.url_adds} target='_blank'>
    //               <img
    //                 src={coursesBoxAds[0]?.image}
    //                 alt='Image'
    //                 className='google_add_box_img'
    //               />
    //             </a>
    //             <div className='overlay'></div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )
    // }
    // else if (index == 5) {
    //   return (
    //     <div className='col-md-6'>
    //       <div className='google_add_box box_hov'>
    //         {coursesBoxAds.length > 0 && (
    //           <div className='slide-img'>
    //             <a href={coursesBoxAds[0]?.url_adds} target='_blank'>
    //               <img
    //                 src={coursesBoxAds[0]?.image}
    //                 alt='Image'
    //                 className='google_add_box_img'
    //               />
    //             </a>
    //             <div className='overlay'></div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )
    // }
  }
  useEffect(() => {
    checkFunction()
  }, [state?.allCourses?.results])

  const checkFunction = () => {
    let num = Math.floor(Math.random() * (6 - 0) + 0);
    let res = state?.allCourses?.results;
    let dummydata = {
      "id": 'advertistment'
    }
    res && res.splice(num, 0, dummydata);
    if (res) {
      setTempData(res)
    }
  };

  const checkFunction1 = () => {
    return tempData && tempData.map((obj, index) => {
      return (
        <>
          {/* {Math.floor(Math.random()*(4-0)+ 0) == index && ( */}
          {
            shuffleFun(obj, index)
          }
          {/* {index % 5 == 4 ? ( */}

          {/* {Math.floor(Math.random()*(4-0)+ 0) == index ? (
            <>
              <div className='col-md-6'>
                <div className='google_add_box box_hov'>
                  {coursesBoxAds.length > 0 &&(
                  // {Math.floor(Math.random() * coursesBoxAds.length) > 0 && (
                    // {coursesBoxAds.length > 0 &&
                    <div className='slide-img'>
                      <a href={coursesBoxAds[0]?.url_adds} target='_blank'>
                        <img
                          src={coursesBoxAds[0]?.image}
                          alt='Image'
                          className='google_add_box_img'
                        />
                      </a>
                      <div className='overlay'></div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
           : (
            ""
          )
          } */}
        </>
      );
    });
  };

  const paginationBack = () => {
    if (categoryId) {
      setCategoryPageCount(categoryPageCount - pageLimit);
      dispatch(
        allCourses(
          `?category_id=${categoryId}&limit=${pageLimit}&offset=${categoryPageCount - pageLimit
          }`,
        ),
      );
    } else {
      setPageCount(pageCount - pageLimit);
      dispatch(
        allCourses(`?limit=${pageLimit}&offset=${pageCount - pageLimit}`),
      );
    }
    if (page_adds) {
      sessionStorage.setItem('current_adds', JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex - 1 }))

    }
    window.scrollTo(0, 1000);
  };
  const paginationNext = () => {
    if (categoryId) {
      setCategoryPageCount(categoryPageCount + pageLimit);
      dispatch(
        allCourses(
          `?category_id=${categoryId}&limit=${pageLimit}&offset=${categoryPageCount + pageLimit
          }`,
        ),
      );
    } else {
      setPageCount(pageCount + pageLimit);
      dispatch(
        allCourses(`?limit=${pageLimit}&offset=${pageCount + pageLimit}`),
      );
    }
    if (page_adds) {
      sessionStorage.setItem('current_adds', JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }))

    }
    window.scrollTo(0, 1000);
  };

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
                return item.image_type == "courses_box";
              });
              setCoursesBoxAds(filterArray1);

              // console.log("filterArray1courses_box", filterArray1)

              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "courses_side_ads";
              });
              setCoursesSideAds(filterArray2);
            }
          });
      },
      function (error) {
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "courses_box";
            });
            setCoursesBoxAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "courses_side_ads";
            });
            setCoursesSideAds(filterArray2);
          }
        });
      },
    );
  }, []);

  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(allCourses(`?search=${searchInput}`));
    setSuggestion([]);
  };
  const handleResetSearch = () => {
    dispatch(allCourses());
    setSearchInput("");
  };

  useEffect(() => {
    if (searchInput === "") {
      setSuggestion([]);
    } else {
      axios.get("/course/suggested_course").then((response) => {
        setSuggestion(response.data.suggested_course);
      });
    }
  }, [searchInput]);

  const searchFieldChanged = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchInput([]);
    }
    setSearchInput(value);
  };

  const suggestionClicked = (suggestion) => {
    setSearchInput(suggestion);
    setHasSuggestion(null);
  };

  return (
    <div>
      {/* <SEO
        title={``}
        description={``}
        keywords={``}
      /> */}
      <Header loginPage={true} page='courses' />
      <section className='Cors_sec noselect'>

        <Helmet>

          <link rel="canonical" href="https://www.shekunj.com/courses/" />
          <title>Best Free Online Courses
            & Certifications in India - Shekunj.
            com</title>
          <meta name="description" content="Advance your career with the free Online
  Professional development courses and
  certifications with the most in-demand skills
  specially curated for women."/>
          <meta name="keywords" content="free online courses in india
  best online certificate programs
  free online courses for girls in india
  online certification courses in india
  free online courses for women"/>
        </Helmet>


        <div className='container'>
          <div className='row'>
            <div className='col-lg-7 col-md-9'>
              <div className='cors_con'>
                <h2>{t("coursesPage.banner.heading")}</h2>
                <div className='cour_box'>
                  <ul className='num'>
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
                      <li>
                        {" "}
                        {t("coursesPage.banner.1")} <br />{" "}
                        {t("coursesPage.banner.4")}
                      </li>
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
                      <li style={{ marginTop: "-25px" }}>
                        {" "}
                        {t("coursesPage.banner.3")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='Srch_sec mb-5 noselect'>
        <div className='container'>
          <Row>
            <Col md={12} xs={12}>
              <div className='course_para'>
                <h1>{t("coursesPage.heading.1")}</h1>
                <p className='courses_para mb-3'>
                  {t("coursesPage.heading.2")}
                </p>
                <Row className='search_box_row'>
                  <Col md={6} xs={12}>
                    <Link className='shekunj_a' to='/login'>
                      {t("coursesPage.heading.3")}
                    </Link>
                  </Col>

                  <Col md={6} xs={12}>
                    <form onSubmit={SearchFilterHandle}>
                      <div className='d-flex'>
                        <div className='wraper '>
                          <input
                            type='text'
                            onChange={searchFieldChanged}
                            value={searchInput}
                            name='searchInput'
                            class='form-control searchInput'
                            placeholder='What do you want to learn ?'
                          />
                          {hasSuggestion && (
                            <div className='suggestions'>
                              {/* {suggestion.map((item) => (
                                  <div onClick={() => suggestionClicked(item)} className="suggList">{item}</div>
                                ))} */}
                              {suggestion.map((item) => (
                                <button
                                  type='submit'
                                  style={{ border: "none" }}
                                  onClick={() => suggestionClicked(item)}
                                  className='suggList'
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className='d-flex'>
                          <button type='submit' className='searchBtn1'>
                            <img
                              src={Search}
                              alt='Image'
                              className='searchIcon'
                              // onClick={() => handleResetSearch()}
                            />
                          </button>
                          <img
                            src={Cross}
                            alt='Image'
                            className='searchclose'
                            onClick={() => handleResetSearch()}
                          />
                        </div>
                      </div>
                    </form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <h5>
                <b>{t("coursesPage.accordion.1.heading")}</b>
              </h5>

              <div className='mobile_view_city_selct'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>Categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <SimpleAccordion
                        isSubSelected={(val) => {
                          setIsSubSelected(val);
                        }}
                        isResetPressed={resetState}
                        changeResetAgain={(val) => {
                          setResetState(val);
                        }}
                        categoryId={(val) => {
                          setCategoryId(val);
                          setPageCount(0);
                          setCategoryPageCount(0);
                        }}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>

              <div className='desktop_view_city_selct'>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>Categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <SimpleAccordion
                        isSubSelected={(val) => {
                          setIsSubSelected(val);
                        }}
                        isResetPressed={resetState}
                        changeResetAgain={(val) => {
                          setResetState(val);
                        }}
                        categoryId={(val) => {
                          setCategoryId(val);
                          setPageCount(0);
                          setCategoryPageCount(0);
                        }}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>

              {/* google add */}
              <div className='row'>
                {coursesSideAds.length > 0 && (
                  <div
                    className='col-md-12'
                    onClick={() => addEmail(coursesSideAds[0]?.add_email)}
                  >
                    <a href={coursesSideAds[0]?.url_adds} target='_blank' rel="noreferrer">
                      <img
                        src={coursesSideAds[0]?.image}
                        alt='Image'
                        className='google_add_courses'
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className='col-md-8 col-sm-8'>
              <div className='content_right'>
                <h3 className='result_head'>
                  {t("coursesPage.other.1.1")} {state?.allCourses?.count || 0}{" "}
                  {t("coursesPage.other.1.2")}
                </h3>

                <Row>
                  <Col xl={9} lg={8} md={8} xs={12}>
                    <div className='filter_added mb-5'>
                      {state?.selectedFilter?.length > 0 &&
                        isSubSelected &&
                        state?.allCourses?.results?.map((s) => {
                          return (
                            <div key={s.id} className='filter_content'>
                              {s.name}{" "}
                              <img
                                src={Cross}
                                onClick={() =>
                                  handleResetFilterDemo(
                                    s,
                                    state?.selectedFilter[0],
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
                          <img
                            src={Reset}
                            className='mr-2'
                            style={{ width: 20, height: 20 }}
                            alt='...'
                          />{" "}
                          {t("coursesPage.other.2")}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className='filter_right_content'>
                <div className='row'>
                  {
                    tempData && tempData.length > 0 ? (
                      checkFunction1()
                    ) : (
                      <div className='text-center mt-2'>
                        {t("common.noDataFound")}
                      </div>
                    )}
                </div>
                <div className='paginationDiv'>
                  {state?.allCourses?.count > pageLimit && (
                    <Pagination
                      finalCount={state?.allCourses?.count / pageLimit}
                      nextPage={paginationNext}
                      backPage={paginationBack}
                    />
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
