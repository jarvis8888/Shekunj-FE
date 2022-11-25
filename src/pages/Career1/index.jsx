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


import { useTranslation } from "react-i18next";
import TopSchool from "../../assets/images/Career/scl.jpg";
import logo from "../../assets/icons/filter.png";
import Cross from "../../assets/icons/cross.png";
import Search from "../../assets/icons/search1.png";
import { Link } from "react-router-dom";
import axios from "axios";
// import ContentLoader, { Facebook } from 'react-content-loader';
import { adsList } from "../../store/ads";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CareerPage1 = () => {
  // const [loading, setLoading] = useState(false);

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
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
    dispatch(getTopSchools(false, latitude, longitude));
  },
  function(error) {
    console.error("Error Code = " + error.code + " - " + error.message);
    dispatch(getTopSchools(false));
  }
  ) 
  }, [dispatch, lan]);

  const transformImg = (image) => {
    return image ? image : TopSchool;
  };

  const handleCollapse = (id, checked) => {
    dispatch(toggleCollapseValue(id, checked ? false : true, "topSchools"));
  };

  const [schoolBannerAds, setSchoolBannerAds] = useState([]);
  const [schoolBoxAds, setSchoolBoxAds] = useState([]);
  const [image, setImage] = useState("NA");

  // useEffect(() => {
  //   axios.get('/private_adds/private_add?image_type=top_school_banner')
  //     .then((response) => {
  //       setSchoolBannerAds(response.data.results);
  //     });
  // }, [])

  const addEmail = (email) => {
    console.log("addEmail", email);
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
           
            return item.image_type == "top_school_box";
  
          });
          setSchoolBoxAds(filterArray1);
          // console.log("filterArray1top_school_box",filterArray1)

          let filterArray2 = response.data.results.filter((item, index) => {
            
            return item.image_type == "top_school_banner";
           
          });
          setSchoolBannerAds(filterArray2);
          console.log("filterArray1top_school_banner",filterArray2)
            }
          })   
    } ,
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
      // alert("Your location is blocked")    
    axios
    .get(
      `/private_adds/private_add`,
    )
    .then((response) => {
      if (response && response.data.results.length > 0) {
          let filterArray1 = response.data.results.filter((item, index) => {   
            return item.image_type == "top_school_box";
          });
          setSchoolBoxAds(filterArray1);
          // console.log("filterArray1coursebox",filterArray1)
          let filterArray2 = response.data.results.filter((item, index) => {
            return item.image_type == "top_school_banner"; 
          });
          setSchoolBannerAds(filterArray2);
          console.log("filterArray1coursebox",filterArray2)  
          }
        })
   }
  )
  },[])
 
 
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [searchInput, setSearchInput] = useState("");
  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(getTopSchools(`?search=${searchInput}`));
  };
  const handleResetSearch = () => {
    dispatch(getTopSchools());
    setSearchInput("");
  };

  return (
    <div>
      <SEO  title={`Find Top Schools in India
& Apply - Shekunj.com`}

  description={`Give high-quality education to your children.
  Find the list of best schools in India and their
  detailed information.`}
  keywords={`top schools in india
  list of best schools
  best boys schools
  top schools in mp
  boys schools in india
  girls schools in india`} />
      <Header loginPage={true} page='career' subPage='schools' />

      <Container>
        <Row>
          <div className='col-md-12'>
            {schoolBannerAds.length > 0 && (
              <div
                className='ads_school_cover'
                onClick={() => addEmail(schoolBannerAds[0]?.add_email)}
              >
                <a href={schoolBannerAds[0]?.url_adds} target='_blank'>
                  <img
                    src={schoolBannerAds[0]?.image}
                    alt='Image'
                    className='ads_school'
                  />
                </a>
              </div>
            )}
          </div>
        </Row>
      </Container>

      <div className='mainDiv_school'>
        {/* {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) : ( */}
        <Container>
          <div className='career_tit noselect'>
            <Row>
              <Col md={6} xs={12}>
                <h2>{t("careerTopSchools.heading.1")}</h2>
                <p>
                  {t("careerTopSchools.other.12")}{" "}
                  {topSchools?.result?.length || 0}{" "}
                  {t("careerTopSchools.other.11")}
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
                />
                {console.log("citiessss", topSchools?.city_list)}
              </div>

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
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Col>

            <Col md={8} xs={12}>
              {topSchools?.result?.length > 0 ? (
                topSchools?.result?.map(
                  (c, index) =>
                    c?.name && (
                      <>
                        <div
                          className='career_box noselect'
                          style={{ height: "auto" }}
                        >
                          <Row>
                            <Col md={3} xs={12}>
                              <div className='school_logo_box'>
                                <Link
                                  to={routingConstants.TOP_SCHOOL + c.id}
                                  className='col-md-6'
                                  key={c?.id}
                                >
                                  <div className='career_logo_box'>
                                    <img
                                      src={transformImg(c?.logo)}
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
                                      : {c && c.board_type}
                                    </li>
                                  )}
                                  {c.board_type && <li>|</li>}

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
                                        <span>
                                          {t("careerTopSchools.other.10")}
                                        </span>{" "}
                                        : {c?.gender_intech}
                                      </span>
                                    </li>
                                  )}
                                </ul>

                                <ul>
                                  <li>
                                    <span>
                                      {c && c.city}, {c && c.state}
                                    </span>
                                  </li>
                                </ul>

                                <ul className='mt-1'>
                                  {c.contact_no && (
                                    <li>
                                      <p>
                                        <span>
                                          <span>
                                            {t("careerTopSchools.other.2")}
                                          </span>{" "}
                                          : {c?.contact_no}{" "}
                                        </span>
                                      </p>
                                    </li>
                                  )}

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
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Row>
                          {index % 4 == 3 ? (
                            <>
                              {schoolBoxAds.length > 0 && (
                                <div
                                  onClick={() =>
                                    addEmail(schoolBoxAds[0]?.add_email)
                                  }
                                >
                                  <a
                                    href={schoolBoxAds[0]?.url_adds}
                                    target='_blank'
                                  >
                                    <img
                                      src={schoolBoxAds[0]?.image}
                                      alt='Image'
                                      className='ads_school_box'
                                    />
                                  </a>
                                </div>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </Row>
                      </>
                    ),
                )
              ) : //  (
              //   <div className='text-center'>{t("common.noDataFound")}</div>
              // )
              // <ContentLoader viewBox="0 0 380 70">
              //   {/* Only SVG shapes */}
              //   <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
              //   <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              //   <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              // </ContentLoader>
              isLoading ? (
                <div>
                  <h4>Loading...</h4>
                  <ClipLoader className='loader' color='#ec498a' />
                </div>
              ) : (
                <div className='text-center'>{t("common.noDataFound")}</div>
              )}
            </Col>
          </Row>
        </Container>
        {/* )} */}
      </div>

      <Footer loginPage={false} />
    </div>
  );
};

export default CareerPage1;
