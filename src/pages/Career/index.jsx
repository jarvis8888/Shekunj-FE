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
import "../HomePage/index.scss";
import "./index.scss";
import Cross from "../../assets/icons/cross.png";
import Search from "../../assets/icons/search1.png";
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
  const pageLimit = 10

  useEffect(() => {
    dispatch(reSetFilterValue());

    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      dispatch(getTopCollages({ filter: false, latitude, longitude, pageLimit, offset }));
    },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(getTopCollages(false));
      }
    )
  }, []);

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

  useEffect(() => {
    dispatch(adsList())
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
                return item.image_type == "top_college_box";
              });
              setCollegeBoxAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "top_college_banner";
              });
              setCollegeBannerAds(filterArray2);
            }
          })
      }
    )
  }, [])


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
  const [searchInput, setSearchInput] = useState("");
  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(getTopCollages({ search: searchInput !== "" ? `&search=${searchInput}` : "" }));
  };
  const handleResetSearch = () => {
    dispatch(getTopCollages({ filter: true, search: "" }));
    setSearchInput("");
  };
  const paginationBack = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      dispatch(getTopCollages({ filter: true, latitude, longitude, pageLimit, offset: offset - 10, search: searchInput !== "" ? `&search=${searchInput}` : "" }));
    });
    setOffset(offset - 10)
    window.scrollTo(0, 1000);
  };
  const paginationNext = () => {

    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      dispatch(getTopCollages({ filter: true, latitude, longitude, pageLimit, offset: offset + 10, search: searchInput !== "" ? `&search=${searchInput}` : "" }));
    });
    setOffset(offset + 10);
    window.scrollTo(0, 1000);
  };

  return (
    <div>
      <SEO title={`List of Top Colleges in India & Apply - Shekunj.com`}
        link={`https://www.shekunj.com/top-colleges-in-india`}
        description={` Find list of top Colleges and Universities in
  India along with the courses offered and
  detailed information.`}
        keywords={`top colleges in india
  top educational institutions in india
  top colleges in madhya pradesh
  best universities in india
  top women colleges in india`} />
      <Header loginPage={true} page='career' subPage='colleges' />

      <Container>
        <Row>
          <div className='col-md-12'>
            {collegeBannerAds.length > 0 && (
              <div
                className='add_college_cover'
                onClick={() => addEmail(collegeBannerAds[0]?.add_email)}
              >
                <a href={collegeBannerAds[0]?.url_adds} target='_blank'>
                  {detect.isMobile ? (collegeBannerAds[0]?.image_mobile && (
                    <img src={collegeBannerAds[0]?.image_mobile} alt='Image' className=' google_add_college' />)) :
                    (collegeBannerAds[0]?.image && (
                      <img src={collegeBannerAds[0]?.image} alt='Image' className=' google_add_college' />))
                  }
                </a>
              </div>
            )}
          </div>
        </Row>
      </Container>

      <div className='mainDiv_college'>
        <Container>
          <div className='career_tit noselect'>
            <Row>
              <Col md={6} xs={12}>
                <h1>{t("careerTopColleges.heading.1")}</h1>
                <p>
                  {t("careerTopColleges.other.2")}{" "}
                  {topCollages?.collage_list?.results?.length || 0}{" "}
                  {t("careerTopColleges.other.3")}
                </p>
              </Col>
              <Col md={6} xs={12}>
                <div className='input-group searchSection'>
                  <form onSubmit={SearchFilterHandle}>
                    <div className='d-flex'>
                      <div className='wraper '>
                        <input
                          type='text'
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                          name='searchInput'
                          class='form-control searchInput'
                          placeholder='Search here...'
                        />
                      </div>
                      <div className='d-flex'>
                        <button type='submit' className='searchBtn1'>
                          <img
                            src={Search}
                            alt='Image'
                            className='searchIcon'
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
                </div>
              </Col>
            </Row>
          </div>

          <Row>
            <Col md={4} xs={12}>
              <div className='desktop_view_city_selct'>
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
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <img src={logo} alt='Image' className='filter_city_123' />
                  </AccordionSummary>
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

            <Col
              md={8}
              xs={12}
              className='top_collages_add_g top_collages_list_filter123'
            >
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

                        <div
                          className='career_box noselect'
                          style={{ height: "auto" }}
                          key={c?.id}
                        >
                          <Row>
                            <Col md={3} xs={12}>
                              <div className='college_logo_box'>
                                <Link
                                  to={routingConstants.TOP_COLLEGES + c.id}
                                  className='col-md-6'
                                  key={c?.id}
                                >
                                  <div className=' career_logo_box'>
                                    <img
                                      src={transformImg(c?.logo)}
                                      alt='...'
                                      className='career_logo_img'
                                    />
                                  </div>
                                </Link>
                              </div>
                            </Col>

                            <Col md={9} xs={12}>
                              <div className='top_col_content'>
                                <h3>
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
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {c && c.collage_type}
                                      </span>
                                    </li>
                                  )}

                                  {c.collage_type && <li>|</li>}

                                  {c.established_year && (
                                    <li>
                                      <span>
                                        {t("careerTopColleges.other.10")}
                                      </span>{" "}
                                      : {c && c.established_year}
                                    </li>
                                  )}

                                  {c.established_year && <li>|</li>}
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
                                      {t("careerTopColleges.other.13")}{"  "}
                                    </span>
                                    : {c && c.city} {c && c.state}
                                  </li>
                                </ul>

                                <ul className='mt-1'>
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
                            </Col>
                          </Row>
                        </div>

                        {collegeBoxAds.length > 0 && (
                          <div
                            className='top_clg_add_img'
                            onClick={() =>
                              addEmail(collegeBoxAds[0]?.add_email)
                            }
                          >
                            {index % 4 == 3 ? (
                              <>
                                <a
                                  href={collegeBoxAds[0]?.url_adds}
                                  target='_blank'
                                >
                                  {detect.isMobile ?
                                    (collegeBoxAds[0]?.image_mobile && (
                                      <img src={collegeBoxAds[0]?.image_mobile} alt='Image' className='college_ads_box' />
                                    ))
                                    :
                                    (collegeBoxAds[0]?.image && (
                                      <img src={collegeBoxAds[0]?.image} alt='Image' className='college_ads_box' />
                                    ))}
                                </a>{" "}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
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
                  <div>
                    <h4>Loading...</h4>
                    <ClipLoader className='loader' color='#ec498a' />
                  </div>
                ) : (
                  <div className='text-center'>{t("common.noDataFound")}</div>
                )}
              {topCollages?.collage_list?.count > pageLimit && (
                <Pagination
                  finalCount={topCollages?.collage_list?.count / pageLimit}
                  nextPage={topCollages?.collage_list?.next ? paginationNext : null}
                  backPage={topCollages?.collage_list?.previous ? paginationBack : null}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default CareerPage;
