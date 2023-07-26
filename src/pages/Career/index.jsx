import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { routingConstants } from "../../utils/constants";
// import ContentLoader, { Facebook } from 'react-content-loader';
import { ClipLoader } from "react-spinners";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import {
  getTopCollages,
  reSetFilterValue,
  toggleCollapseValue,
  allTopcollegeBySearch,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg";
import Search from "../../assets/images/search_white_icon.svg";
import "../HomePage/index.scss";
import "./index.scss";
import "../Career1/index.scss"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Cross from "../../assets/icons/cross.png";
// import Search from "../../assets/icons/search1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import test from "../../assets/images/test.jpg";
import logo from "../../assets/icons/filter.png";
// import { Link,Route } from "react-router-dom";
import { adsList } from "../../store/ads";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import NewPagination from "../../components/Pagination/NewPagination";

const CareerPage = () => {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   },2000);
  // }, []);

  const dispatch = useDispatch();
  const { topCollages, courseSector, ownership, isLoading } = useSelector(
    (state) => state.careerReducer,
  );

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [flag, setFlag] = useState(true);
  const pageLimit = 10;

  useEffect(() => {
    dispatch(reSetFilterValue());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;

        dispatch(
          getTopCollages({
            filter: false,
            latitude,
            longitude,
            pageLimit,
            offset,
          }),
        );
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(getTopCollages(false));
      },
    );
  }, [lan]);

  // const transformPrice = (price) => {
  //   let nf = new Intl.NumberFormat("en-US");
  //   return nf.format(
  //     Number.isNaN(parseInt(price, 10)) ? 0 : parseInt(price, 10) || 0,
  //   );
  // };

  const transformImg = (image) => {
    return image ? image : TopCollage;
  };

  // const STREAM = {
  //   name: t("careerTopColleges.listItems.1"),
  //   rows: topCollages?.collage_stream_list || [],
  // };

  const STATE = {
    name: t("careerTopColleges.listItems.2"),
    rows: topCollages?.state_list || [],
  };
  const CITY = {
    name: t("careerTopColleges.listItems.3"),
    rows: topCollages?.city_list || [],
  };

  // const ownership = {
  //   name: t("careerTopColleges.listItems.4"),
  //   rows: topCollages?.college_type || [],
  // };

  //  const ownership={
  //   name: t("careerTopColleges.listItems.4"),
  //   rows: topCollages?.state_list || [],
  //  }

  const [collegeBannerAds, setCollegeBannerAds] = useState([]);
  const [collegeBoxAds, setCollegeBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

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

  // >>>>>>>>>>>>>>>>>>latest code change>>>>>>>>>>>>>>>>>>
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
      topCollages?.collage_list?.results.length > 0 &&
      collegeBoxAds.length &&
      flag
    ) {
      const addslen = collegeBoxAds.length;
      let len = topCollages?.collage_list?.count / pageLimit;
      len = Math.trunc(len);

      const adds_arr = findAdds(addslen, len);
      sessionStorage.setItem(
        "current_adds",
        JSON.stringify({ addIndex: 0, addsData: adds_arr }),
      );
      setFlag(false);
    }
  }, [topCollages, collegeBoxAds]);
  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "top_college_box";
              });
              setCollegeBoxAds(filterArray1);

              // console.log("filterArray1top_college_box",filterArray1)
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "top_college_banner";
              });
              setCollegeBannerAds(filterArray2);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "top_college_box";
            });

            // sessionStorage.setItem('current_adds', JSON.stringify([0, 1]));
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "top_college_banner";
            });
            setCollegeBannerAds(filterArray2);
          }
        });
      },
    );
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
  //           return  item.image_type == "top_college_box"||item.image_type ="top_college_banner";
  //         });
  //         console.log('asdjsdss',filterArray[0])
  //           if (filterArray[0].image_type == "top_college_box") {
  //             let findImage =
  //           filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setCollegeBoxAds(filterArray);
  //             }else if(filterArray[0].image_type == "top_college_banner"){
  //               let findImage =
  //               filterArray.length > 0 ? filterArray[0].image : "NA";
  //               setImage(findImage);
  //               setCollegeBannerAds(filterArray);
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
  //         return  item.image_type == "top_college_box"||item.image_type == "top_college_banner";
  //       });
  //       console.log('asdjsdss',filterArray[0])
  //         if (filterArray[0].image_type == "top_college_box") {
  //           let findImage =
  //         filterArray.length > 0 ? filterArray[0].image : "NA";
  //         setImage(findImage);
  //         setCollegeBoxAds(filterArray);
  //           }else if(filterArray[0].image_type == "top_college_banner"){
  //             let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //             setImage(findImage);
  //             setCollegeBannerAds(filterArray);
  //           }
  //         }
  //       })
  //  }
  // )
  // },[])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const page_adds = JSON.parse(sessionStorage.getItem("current_adds"));
  const [searchInput, setSearchInput] = useState("");
  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(
      getTopCollages({
        search: searchInput !== "" ? `&search=${searchInput}` : "",
      }),
    );
  };
  const handleResetSearch = () => {
    dispatch(getTopCollages({ filter: true, search: "" }));
    setSearchInput("");
  };
  const paginationBack = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      dispatch(
        getTopCollages({
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
        getTopCollages({
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
  //start

  // Calculate the total number of pages
  const totalPages = Math.ceil(topCollages?.collage_list?.count / pageLimit);

  const visiblePages = Array.from({ length: 5 })
    .map((_, index) => startPage + index)
    .filter((pageNumber) => pageNumber <= totalPages);

  // Handle next page click
  const nextPage = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(
        getTopCollages({
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
        getTopCollages({
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
        getTopCollages({
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
  const currentUrl = window.location.href;
  return (
    <>
      <SEO
        title={`List of Top Colleges in India & Apply - Shekunj.com`}
        link={currentUrl}
        currentUrl={currentUrl}
        description='Find list of top Colleges and Universities in India along with the courses offered and detailed information.'
        keywords='top colleges in india top educational institutions in india top colleges in madhya pradesh best universities in india top women colleges in india'
      />
      <div>
        <section className='sk-topschool-banner'>
          <div className='container sk-custom-container'>
            <div className='row'>
              <div className='col-md-12'>
                {collegeBannerAds.length > 0 && (
                  <div
                    className='add_college_cover'
                    onClick={() => addEmail(collegeBannerAds[0]?.add_email)}
                  >
                    <a
                      href={collegeBannerAds[0]?.url_adds}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {detect.isMobile
                        ? collegeBannerAds[0]?.image_mobile && (
                          <img
                            src={collegeBannerAds[0]?.image_mobile}
                            alt='collegeBannerAds'
                            className=''
                          />
                        )
                        : collegeBannerAds[0]?.image && (
                          <img
                            src={collegeBannerAds[0]?.image}
                            alt='collegeBannerAds'
                            className=''
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
                  <h1 className='sk-storyHeading-top'>{t("careerTopColleges.heading.1")}</h1>
                  {/* <p>
                    {t("careerTopColleges.other.2")}{" "}
                    {topCollages?.collage_list?.results?.length || 0}{" "}
                    {t("careerTopColleges.other.3")}
                  </p> */}
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections</p>
                </Col>
              </div>
            </div>

            <div className='sk-Schooolborder-top'>
              <div className='row'>
                <Col md={4} xs={12}>
                  <div className='desktop_view_city_selct'>
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
                      type='colleges'
                      //stream={STREAM}
                      offset={offset}
                      limit={pageLimit}
                      stream={courseSector}
                      ownership={ownership}
                      state={STATE}
                      city={CITY}
                    />
                  </div>

                  {/* mobile menu */}
                  <div className='mobile_view_city_selct'>
                    <Accordion>
                      <div className='sk-resetFilter-bar py-0 px-3'>
                        <ul className='p-0 m-0'>
                          <li>Filter</li>
                          <li onClick={handleResetSearch}>
                            <span>
                              <RestartAltIcon />{" "}
                              <span className='me-2'>Reset Filter</span>
                            </span>
                          </li>
                          <li>
                            <AccordionSummary
                              className='p-0'
                              expandIcon={<KeyboardArrowDownRoundedIcon />}
                              aria-controls='panel1a-content'
                              id='panel1a-header'
                            />
                          </li>
                        </ul>
                      </div>
                      <AccordionDetails>
                        <Typography>
                          <div>
                            <AccordionComponent
                              type='colleges'
                              //stream={STREAM}
                              offset={offset}
                              limit={pageLimit}
                              stream={courseSector}
                              ownership={ownership}
                              state={STATE}
                              city={CITY}
                            />
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Col>

                <Col md={8} xs={12} className='top_collages_add_g top_collages_list_filter123'>
                  <Col md={12} xs={12}>
                    <div className='sk-rightlist-school'>
                      <div className='sk-all-school'>
                        <p>
                          All Colleges<span> (299)</span>
                        </p>
                      </div>
                      <form onSubmit={SearchFilterHandle}>
                        <div className='sk-serachTop-school'>
                          <input
                            type='text'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            name='searchInput'
                            class='form-control'
                            placeholder='Search here...'
                          />
                          <button type='submit' className='sk-searchSchool-filter'>
                            <img src={Search} alt='searchIcon' className='' />
                          </button>
                          {/* <img
                              src={Cross}
                              alt='searchclose'
                              className='searchclose'
                              onClick={() => handleResetSearch()}
                            /> */}
                        </div>
                      </form>
                    </div>
                  </Col>
                  {topCollages?.collage_list?.results?.length > 0 ? (
                    topCollages.collage_list?.results?.map(
                      (c, index) =>
                        c &&
                        c.name && (
                          <>
                            {/* {console.log("c",c)}
                           {loading ? (
                      <div className="loader-container">
      	              <div className="spinner"></div>
                      </div>
                      ) : ( */}
                            <div className='noselect' style={{ height: "auto" }} key={c?.id}>
                              <Row>
                                <Col md={12} xs={12}>
                                  <div className='sk-topSchoolbox-list'>
                                    <div className='sk-topLeftimg-box'>
                                      <Link to={routingConstants.TOP_COLLEGES + c.id} key={c?.id}>
                                        <img
                                          src={transformImg(c?.logo)}
                                          alt='...'
                                          className=''
                                        />
                                      </Link>
                                    </div>
                                    <div className='top_col_content'>
                                      <h3 className='sk-innerContent-design'>
                                        <Link
                                          to={routingConstants.TOP_COLLEGES + c.id}
                                          className=''
                                          key={c?.id}
                                        >
                                          {c && c.name}
                                        </Link>
                                      </h3>
                                      <ul class='list-inline list-unstyled'>
                                        {c.collage_type && (
                                          <li>
                                            <span
                                              style={{
                                                textTransform: "capitalize",
                                              }}
                                            >
                                              {c && c.collage_type}
                                            </span>
                                          </li>
                                        )}

                                        {c.established_year && (
                                          <li>
                                            <span>
                                              {t("careerTopColleges.other.10")}
                                            </span>{" "}
                                            : {c && c.established_year}
                                          </li>
                                        )}

                                        {c.gender_intech && (
                                          <li>
                                            <span>
                                              {t("careerTopColleges.other.12")}
                                            </span>{" "}
                                            : {c && c.gender_intech}
                                          </li>
                                        )}
                                      </ul>

                                      <ul>
                                        <li>
                                          <span>
                                            {t("careerTopColleges.other.13")}
                                            {"  "}
                                          </span>
                                          : {c && c.city} {c && c.state}
                                        </li>
                                      </ul>

                                      <ul>
                                        {c.contact_no && (
                                          <li>
                                            <p>
                                              <span>
                                                {t("careerTopColleges.other.4")}
                                              </span>{" "}
                                              : {c && c.contact_no}
                                            </p>
                                          </li>
                                        )}

                                        {c.website && (
                                          <li>
                                            <span>
                                              {t("careerTopColleges.other.5")}
                                            </span>
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
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            {collegeBoxAds.length > 0 && (
                              <>
                                {index === 3 && collegeBoxAds.length > 0 && (
                                  <div
                                    className='top_clg_add_img'
                                    onClick={() =>
                                      addEmail(
                                        collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][0]
                                        ]?.add_email,
                                      )
                                    }
                                  >
                                    <a
                                      href={
                                        collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][0]
                                        ]?.url_adds
                                      }
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {detect.isMobile
                                        ? collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][0]
                                        ]?.image_mobile && (
                                          <img
                                            src={
                                              collegeBoxAds[
                                                page_adds?.addsData[
                                                page_adds?.addIndex
                                                ][0]
                                              ]?.image_mobile
                                            }
                                            alt='collegeBoxAds'
                                            className='college_ads_box'
                                          />
                                        )
                                        : collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][0]
                                        ]?.image && (
                                          <img
                                            src={
                                              collegeBoxAds[
                                                page_adds?.addsData[
                                                page_adds?.addIndex
                                                ][0]
                                              ]?.image
                                            }
                                            alt='collegeBoxAds'
                                            className='college_ads_box'
                                          />
                                        )}
                                    </a>
                                  </div>
                                )}
                                {index === 7 && collegeBoxAds.length > 0 && (
                                  <div
                                    className='top_clg_add_img'
                                    onClick={() =>
                                      addEmail(
                                        collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][1]
                                        ]?.add_email,
                                      )
                                    }
                                  >
                                    <a
                                      href={
                                        collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][1]
                                        ]?.url_adds
                                      }
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {detect.isMobile
                                        ? collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][1]
                                        ]?.image_mobile && (
                                          <img
                                            src={
                                              collegeBoxAds[
                                                page_adds?.addsData[
                                                page_adds?.addIndex
                                                ][1]
                                              ]?.image_mobile
                                            }
                                            alt='collegeBoxAds'
                                            className='college_ads_box'
                                          />
                                        )
                                        : collegeBoxAds[
                                          page_adds?.addsData[
                                          page_adds?.addIndex
                                          ][1]
                                        ]?.image && (
                                          <img
                                            src={
                                              collegeBoxAds[
                                                page_adds?.addsData[
                                                page_adds?.addIndex
                                                ][1]
                                              ]?.image
                                            }
                                            alt='collegeBoxAds'
                                            className='college_ads_box'
                                          />
                                        )}
                                    </a>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        ),
                    )
                  ) : //  (
                    //   <div className='text-center'>{t("common.noDataFound")}</div>
                    // )
                    //  (
                    //   <div className="loader-container">
                    //     <div className="spinner"></div>
                    //   </div>
                    // )

                    // (
                    //   <ContentLoader viewBox="0 0 380 70">
                    //     {/* Only SVG shapes */}
                    //     <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                    //     <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                    //     <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                    //   </ContentLoader>
                    // )
                    isLoading ? (
                      <CustomLoader />
                    ) : (
                      <NoDataFound />
                    )}
                  {topCollages?.collage_list?.count > pageLimit && (
                    <>
                      {/* <Pagination
                      finalCount={topCollages?.collage_list?.count / pageLimit}
                      nextPage={() => {
                        if (topCollages?.collage_list?.next) {
                          paginationNext();
                        }
                      }}
                      backPage={() => {
                        if (topCollages?.collage_list?.previous) {
                          paginationBack();
                        }
                      }}
                    /> */}
                      <NewPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        visiblePages={visiblePages}
                        previousPage={
                          topCollages?.collage_list?.previous ? previousPage : null
                        }
                        nextPage={topCollages?.collage_list?.next ? nextPage : null}
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

export default withHeaderFooter(CareerPage);
