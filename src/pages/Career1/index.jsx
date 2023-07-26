import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import { routingConstants } from "../../utils/constants";
import { ClipLoader } from "react-spinners";
import {
  getTopSchools,
  reSetFilterValue,
  toggleCollapseValue,
} from "../../store/career";
import "../HomePage/index.scss";
import "./index.scss";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import TopSchool from "../../assets/images/Career/scl.jpg";
import logo from "../../assets/icons/filter.png";
import Cross from "../../assets/icons/cross.png";
import Search from "../../assets/images/search_white_icon.svg";
import { Link } from "react-router-dom";
import axios from "axios";
// import ContentLoader, { Facebook } from 'react-content-loader';
import { adsList } from "../../store/ads";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
import NewPagination from "../../components/Pagination/NewPagination";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { capitalizeFirstLetter } from "../../utils/utils";

const CareerPage1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [flag, setFlag] = useState(true);
  const [stopPosition, setStopPosition] = useState(0);
  const pageLimit = 10;

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);
  const dispatch = useDispatch();
  const { topSchools, courseSector, ownership, isLoading } = useSelector(
    (state) => state.careerReducer,
  );

  const { t } = useTranslation();
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(reSetFilterValue());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        dispatch(
          getTopSchools({
            filter: false,
            latitude,
            longitude,
            pageLimit,
            offset,
            search: searchInput !== "" ? `&search=${searchInput}` : "",
          }),
        );
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(getTopSchools({ filter: false, pageLimit, offset }));
      },
    );
    window.scrollTo(0, 0);
  }, [lan]);

  const transformImg = (image) => {
    return image ? image : TopSchool;
  };
  const page_adds = JSON.parse(sessionStorage.getItem("current_adds"));
  const handleCollapse = (id, checked) => {
    dispatch(toggleCollapseValue(id, checked ? false : true, "topSchools"));
  };

  const [schoolBannerAds, setSchoolBannerAds] = useState([]);
  const [schoolBoxAds, setSchoolBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

  // useEffect(() => {
  //   axios.get('/private_adds/private_add?image_type=top_school_banner')
  //     .then((response) => {
  //       setSchoolBannerAds(response.data.results);
  //     });
  // }, [])

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
  // >>>>>>>>>>>>>>>>>>>>>>>>>code below >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "top_school_banner";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setSchoolBannerAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })

  //   }) ;
  //   dispatch(adsList());

  // }, [dispatch]);

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
  //             return item.image_type == "top_school_box";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setSchoolBoxAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code below >>>>>>>>>>>>>>>>>>>>>>>>
  const findAdds = (addslen, len) => {
    let x = 0;

    let arr = [];
    for (let i = 0; i < len; i++) {
      let y;
      if (x + 1 >= addslen) {
        y = 0;
      } else {
        y = x + 1;
      }
      if (x >= addslen) {
        x = 0;
        y = 1;
      }

      arr.push([x, y]);
      if (x + 1 >= addslen) {
        x = 1;
      } else {
        x += 2;
      }
    }
    return arr;
  };
  useEffect(() => {
    if (
      topSchools?.result?.results?.length > 0 &&
      schoolBoxAds.length &&
      flag
    ) {
      const addslen = schoolBoxAds.length;
      let len = topSchools?.result?.count / pageLimit;
      len = Math.trunc(len);

      const adds_arr = findAdds(addslen, len);
      sessionStorage.setItem(
        "current_adds",
        JSON.stringify({ addIndex: 0, addsData: adds_arr }),
      );
      setFlag(false);
    }
  }, [topSchools, schoolBoxAds]);

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
                return item.image_type == "top_school_box";
              });
              setSchoolBoxAds(filterArray1);
              // console.log("filterArray1top_school_box",filterArray1)

              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "top_school_banner";
              });
              setSchoolBannerAds(filterArray2);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "top_school_box";
            });
            setSchoolBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "top_school_banner";
            });
            setSchoolBannerAds(filterArray2);
          }
        });
      },
    );
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [searchInput, setSearchInput] = useState("");
  const SearchFilterHandle = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setOffset(0);
    dispatch(
      getTopSchools({
        search: searchInput !== "" ? `&search=${searchInput}` : "",
      }),
    );
  };
  const handleResetSearch = () => {
    setSearchInput("");
    dispatch(reSetFilterValue());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        dispatch(
          getTopSchools({
            filter: false,
            latitude,
            longitude,
            pageLimit,
            offset,
            search: searchInput !== "" ? `&search=${searchInput}` : "",
          }),
        );
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(getTopSchools({ filter: false, pageLimit, offset }));
      },
    );
    // window.scrollTo(0, 0);
  };

  const paginationBack = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopSchools({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset - 10,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex - 1 }),
        );
      }, 500);
    }
    setOffset(offset - 10);
    window.scrollTo(0, 1000);
  };
  const paginationNext = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopSchools({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset + 10,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
        );
      }, 500);
    }
    setOffset(offset + 10);
    window.scrollTo(0, 1000);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(topSchools?.result?.count / pageLimit);

  const visiblePages = Array.from({ length: 5 })
    .map((_, index) => startPage + index)
    .filter((pageNumber) => pageNumber <= totalPages);

  // Handle next page click
  const nextPage = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopSchools({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset + pageLimit,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
        );
      }, 500);
    }
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setOffset(offset + pageLimit);
      // setEndPage(endPage + 1);
    }
    if (startPage + 1 < totalPages) {
      setStartPage(startPage + 1);
    }
  };

  // Handle previous page click
  const previousPage = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopSchools({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset - pageLimit,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex - 1 }),
        );
      }, 500);
    }
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset - pageLimit);
      // setEndPage(endPage - 1);
    }
    if (startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newOffset = (pageNumber - 1) * pageLimit;
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopSchools({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: (pageNumber - 1) * pageLimit,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
        );
      }, 500);
    }
    setOffset(newOffset);
  };

  useEffect(() => {
    const handleScroll = () => {
      const rightColElement = document.getElementById("school-left-col");
      // const headerElement = document.querySelector('.header-class');
      const stickyHeight = rightColElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const headerHeight = 0;
      const adjustedViewportHeight = viewportHeight - headerHeight;
      const stop = viewportHeight - stickyHeight;

      if (stickyHeight > adjustedViewportHeight) {
        setStopPosition(stop);
      } else {
        setStopPosition(headerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentUrl = window.location.href;
  return (
    <>
      <SEO
        title={`List of Top Schools in India & Apply - Shekunj.com`}
        link={currentUrl}
        currentUrl={currentUrl}
        description='Find list of top Schools and Universities in India along with the courses offered and detailed information.'
        keywords='top Schools in india top educational institutions in india top Schools in madhya pradesh best universities in india top women Schools in india'
      />

      <div>
        <Helmet>
          <link
            rel='canonical'
            href='https://www.shekunj.com/top-schools-in-india/'
          />
          <title>Find Top Schools in India & Apply - Shekunj.com</title>
          <meta
            name='description'
            content='Give high-quality education to your children.
          Find the list of best schools in India and their
          detailed information.'
          />
          <meta
            name='keywords'
            content='top schools in india list of best schools best boys schools top schools in mp 
          boys schools in india girls schools in india'
          />
        </Helmet>
        <section className='sk-topschool-banner'>
          <div className='container sk-custom-container'>
            <div className='row'>
              <div className='col-md-12'>
                {schoolBannerAds.length > 0 && (
                  <div
                    className='ads_school_cover'
                    onClick={() => addEmail(schoolBannerAds[0]?.add_email)}
                  >
                    <a href={schoolBannerAds[0]?.url_adds} target='_blank'>
                      {detect.isMobile ? (
                        schoolBannerAds[0]?.image_mobile && (
                          <img
                            src={schoolBannerAds[0]?.image_mobile}
                            alt='schoolBannerAds'
                            className='ads_school'
                          />
                        )
                      ) : (
                        <img
                          src={schoolBannerAds[0]?.image}
                          alt='schoolBannerAds'
                          className='ads_school'
                        />
                      )}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className='sk-Topmiddle-sec'>
          <div className='container sk-custom-container'>
            <div className='noselect sk-spaceBottom-school'>
              <div className='row'>
                <Col md={12} xs={12}>
                  <h1 className='sk-storyHeading-top'>
                    {t("careerTopSchools.heading.1")}
                  </h1>
                  {/* <p>
                  {t("careerTopSchools.other.12")}{" "}
                  {topSchools?.result?.results?.length || 0}{" "}
                  {t("careerTopSchools.other.11")}
                </p> */}
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                  </p>
                </Col>
              </div>
            </div>
            <div className='sk-Schooolborder-top'>
              <div className='row'>
                <Col md={4} xs={12}>
                  <div
                    className='desktop_view_city_selct'
                    id='school-left-col'
                    style={{ top: `${stopPosition}px` }}
                  >
                    <div className='sk-resetFilter-bar'>
                      <ul>
                        <li>Filter</li>
                        <li onClick={handleResetSearch}>
                          <span>
                            <RestartAltIcon />{" "}
                            <span className='me-2'>Reset Filter</span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <AccordionComponent
                      type='schools'
                      states={{
                        name: t("careerTopSchools.listItems.1"),
                        rows: topSchools?.state_list,
                      }}
                      cities={{
                        name: t("careerTopSchools.listItems.3"),
                        rows: topSchools?.city_list || [],
                      }}
                      // ownership={{
                      //   name: t("careerTopSchools.listItems.5"),
                      //   rows: topSchools?.school_type || [],
                      // }}
                      ownership={ownership}
                      educationBoard={{
                        name: t("careerTopSchools.listItems.2"),
                        rows: topSchools?.board_list || [],
                      }}
                      category={{
                        name: t("careerTopSchools.listItems.4"),
                        rows: topSchools?.gender_intech,
                      }}
                      offset={offset}
                      limit={pageLimit}
                    />
                  </div>

                  <div className='mobile_view_city_selct'>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <img
                          src={logo}
                          alt='Image'
                          className='filter_city_123'
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <AccordionComponent
                            type='schools'
                            states={{
                              name: t("careerTopSchools.listItems.1"),
                              rows: topSchools?.state_list,
                            }}
                            cities={{
                              name: t("careerTopSchools.listItems.3"),
                              rows: topSchools?.city_list,
                            }}
                            ownership={{
                              name: t("careerTopSchools.listItems.5"),
                              rows: topSchools?.school_type,
                            }}
                            educationBoard={{
                              name: t("careerTopSchools.listItems.2"),
                              rows: topSchools?.board_list || [],
                            }}
                            category={{
                              name: t("careerTopSchools.listItems.4"),
                              rows: topSchools?.gender_intech,
                            }}
                            offset={offset}
                            limit={pageLimit}
                          />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Col>

                <Col md={8} xs={12}>
                  <Row>
                    <Col md={12} xs={12}>
                      <div className='sk-rightlist-school'>
                        <div className='sk-all-school'>
                          <p>
                            All School{" "}
                            <span>
                              (
                              {topSchools?.result?.count > 999
                                ? "999+"
                                : topSchools?.result?.count}
                              )
                            </span>
                          </p>
                        </div>
                        <form>
                          <div className='sk-serachTop-school'>
                            <input
                              type='text'
                              onChange={(e) => setSearchInput(e.target.value)}
                              value={searchInput}
                              name='searchInput'
                              class='form-control'
                              placeholder='Search here...'
                            />
                            <button
                              onClick={SearchFilterHandle}
                              className='sk-searchSchool-filter'
                            >
                              <img src={Search} alt='Search' className='' />
                            </button>

                            {/* <div className='d-flex'> */}

                            {/* <span className='closeBtn1' onClick={handleResetSearch}>
                              <img
                                src={Cross}
                                alt='Image'
                                className='searchclose'
                              />
                            </span> */}
                            {/* </div> */}
                          </div>
                        </form>
                      </div>
                    </Col>
                  </Row>
                  {isLoading ? (
                    <CustomLoader />
                  ) : topSchools?.result?.results?.length > 0 ? (
                    topSchools?.result?.results?.map(
                      (c, index) =>
                        c?.name && (
                          <>
                            <Row>
                              <Col md={12} xs={12}>
                                <div className='sk-topSchoolbox-list'>
                                  <div className='sk-topLeftimg-box'>
                                    <Link
                                      to={routingConstants.TOP_SCHOOL + c.id}
                                      key={c?.id}
                                    >
                                      <img
                                        src={transformImg(c?.logo)}
                                        className=''
                                        alt='logo'
                                      />
                                    </Link>
                                  </div>
                                  <div className='top_col_content'>
                                    <h3 className='sk-innerContent-design'>
                                      <Link
                                        to={routingConstants.TOP_SCHOOL + c.id}
                                        className=''
                                        key={c?.id}
                                      >
                                        {c && c.name}
                                      </Link>
                                    </h3>
                                    <ul class='list-inline list-unstyled'>
                                      {c.board_type && (
                                        <li>
                                          <span>
                                            {t("careerTopSchools.other.1")}
                                          </span>{" "}
                                          : {c && c.board_type?.toUpperCase()}
                                        </li>
                                      )}
                                      {/* {c.board_type && <li>|</li>} */}

                                      {c.established_year && (
                                        <li>
                                          <span>
                                            {t("careerTopColleges.other.10")}
                                          </span>{" "}
                                          : {c && c.established_year}
                                        </li>
                                      )}
                                      {/* {c.established_year && <li>|</li>} */}
                                      {c.gender_intech && (
                                        <li>
                                          <span>
                                            {t("careerTopSchools.other.10")}
                                          </span>{" "}
                                          : {c?.gender_intech.toUpperCase()}
                                        </li>
                                      )}
                                    </ul>

                                    <ul>
                                      <li>
                                        <span>
                                          {t("careerTopColleges.other.13")}{" "}
                                        </span>
                                        : {c && capitalizeFirstLetter(c.city)},{" "}
                                        {c && capitalizeFirstLetter(c.state)}
                                      </li>
                                      {c.school_type && (
                                        <li>
                                          <span>
                                            {t("careerTopColleges.other.16")}{" "}
                                          </span>
                                          :{" "}
                                          {c &&
                                            capitalizeFirstLetter(
                                              c.school_type,
                                            )}
                                        </li>
                                      )}
                                    </ul>

                                    <ul>
                                      {/* {c.contact_no && (
                                      <li>
                                        <p>
                                          <span>
                                            {t("careerTopSchools.other.2")}{" "}
                                          </span>
                                          : {c?.contact_no}{" "}
                                        </p>
                                      </li>
                                    )} */}

                                      {c.website && (
                                        <li>
                                          <span>
                                            {t("careerTopSchools.other.3")}
                                          </span>{" "}
                                          :{" "}
                                          {/* <Link
                                        to={{ pathname: c?.website }}
                                        target='_blank'
                                        rel='noreferrer'>
                                        {c && c.website}
                                      </Link> */}
                                          <a
                                            rel='noreferrer'
                                            target='_blank'
                                            href={`https:/${c?.website}`}
                                          >
                                            {c && c?.website}
                                          </a>
                                        </li>
                                      )}
                                    </ul>
                                    <div className='sk-Topview-more'>
                                      <a
                                        href={
                                          routingConstants.TOP_SCHOOL + c.id
                                        }
                                      >
                                        View More
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              {index === 3 && schoolBoxAds?.length && (
                                <div
                                  onClick={() =>
                                    addEmail(
                                      schoolBoxAds[
                                        page_adds?.addsData[
                                          page_adds?.addIndex
                                        ][0]
                                      ]?.add_email,
                                    )
                                  }
                                >
                                  <a
                                    href={
                                      schoolBoxAds[
                                        page_adds?.addsData[
                                          page_adds?.addIndex
                                        ][0]
                                      ]?.url_adds
                                    }
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {detect.isMobile
                                      ? schoolBoxAds[
                                          page_adds?.addsData[
                                            page_adds?.addIndex
                                          ][0]
                                        ]?.image_mobile && (
                                          <img
                                            src={
                                              schoolBoxAds[
                                                page_adds?.addsData[
                                                  page_adds?.addIndex
                                                ][0]
                                              ]?.image_mobile
                                            }
                                            alt='schoolBoxAds'
                                            className='ads_school_box'
                                          />
                                        )
                                      : schoolBoxAds[
                                          page_adds?.addsData[
                                            page_adds?.addIndex
                                          ][0]
                                        ]?.image && (
                                          <img
                                            src={
                                              schoolBoxAds[
                                                page_adds?.addsData[
                                                  page_adds?.addIndex
                                                ][0]
                                              ]?.image
                                            }
                                            alt='schoolBoxAds'
                                            className='ads_school_box'
                                          />
                                        )}
                                  </a>
                                </div>
                              )}
                              {index === 7 && schoolBoxAds?.length && (
                                <div
                                  onClick={() =>
                                    addEmail(
                                      schoolBoxAds[
                                        page_adds?.addsData[
                                          page_adds?.addIndex
                                        ][1]
                                      ]?.add_email,
                                    )
                                  }
                                >
                                  <a
                                    href={
                                      schoolBoxAds[
                                        page_adds?.addsData[
                                          page_adds?.addIndex
                                        ][1]
                                      ]?.url_adds
                                    }
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {detect.isMobile
                                      ? schoolBoxAds[
                                          page_adds?.addsData[
                                            page_adds?.addIndex
                                          ][1]
                                        ]?.image_mobile && (
                                          <img
                                            src={
                                              schoolBoxAds[
                                                page_adds?.addsData[
                                                  page_adds?.addIndex
                                                ][1]
                                              ]?.image_mobile
                                            }
                                            alt='schoolBoxAds'
                                            className='ads_school_box'
                                          />
                                        )
                                      : schoolBoxAds[
                                          page_adds?.addsData[
                                            page_adds?.addIndex
                                          ][1]
                                        ]?.image && (
                                          <img
                                            src={
                                              schoolBoxAds[
                                                page_adds?.addsData[
                                                  page_adds?.addIndex
                                                ][1]
                                              ]?.image
                                            }
                                            alt='schoolBoxAds'
                                            className='ads_school_box'
                                          />
                                        )}
                                  </a>
                                </div>
                              )}
                            </Row>
                          </>
                        ),
                    )
                  ) : (
                    <NoDataFound />
                  )}
                  {topSchools?.result?.count > pageLimit && (
                    <>
                      {/* <Pagination
                    finalCount={topSchools?.result?.count / pageLimit}
                    nextPage={topSchools?.result?.next ? paginationNext : null}
                    backPage={
                      topSchools?.result?.previous ? paginationBack : null
                    }
                  /> */}

                      <NewPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        visiblePages={visiblePages}
                        previousPage={
                          topSchools?.result?.previous ? previousPage : null
                        }
                        nextPage={topSchools?.result?.next ? nextPage : null}
                        handleClick={handleClick}
                      />
                    </>
                  )}
                </Col>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withHeaderFooter(CareerPage1);
