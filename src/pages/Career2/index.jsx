import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { routingConstants } from "../../utils/constants";
import Ankita from "../../assets/images/Ankita-Sharma.png";
// import {ClipLoader} from "react-spinners";

import { AccordionComponent, Footer, Header, SEO } from "../../components";
import {
  getGovernmentExams,
  reSetFilterValue,
  toggleCollapseValue,
} from "../../store/career";
import { noImage } from "../../utils/ApiServices";
import { adsList } from "../../store/ads";
import "../HomePage/index.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useDeviceDetect from "../../hooks/useDeviceDetect";
const CareerPage2 = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { governmentExams, isLoading } = useSelector(
    (state) => state.careerReducer,
  );
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(reSetFilterValue());
    dispatch(getGovernmentExams());
  }, [dispatch, lan]);

  const transformPrice = (price) => {
    let nf = new Intl.NumberFormat("en-US");
    return nf.format(
      Number.isNaN(parseInt(price, 10)) ? 0 : parseInt(price, 10) || 0,
    );
  };

  const transformImg = (image) => {
    return image ? image : noImage;
  };

  const handleCollapse = (id, checked) => {
    dispatch(
      toggleCollapseValue(id, checked ? false : true, "governmentExams"),
    );
  };

  const [govBannerAds, setGovBannerAds] = useState([]);
  const [govBoxAds, setGovBoxAds] = useState([]);
  const [govtScmSideAdds, setGovtScmSideAdds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();
  // useEffect(() => {
  //   axios.get('/private_adds/private_add?image_type=govt_scm_cover')
  //     .then((response) => {
  //       setGovBannerAds(response.data.results);
  //     });
  // }, [])

  // useEffect(() => {
  // 	axios.get('/private_adds/private_add')
  // 		.then((response) => {

  //       if(response.data.results.length > 0)

  //       {
  //        let filterArray = response.data.results.filter((item,index)=>{
  //           return item.image_type == "govt_scm_cover"
  //         })
  //         let findImage = filterArray.length>0 ? filterArray[0].image : "NA"
  //         setImage(findImage)
  //         setGovBannerAds(filterArray)
  //           }
  // 		});

  // }, [])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
          if (response.data.results.length > 0) {
            let filterArray = response.data.results.filter((item, index) => {
              return item.image_type == "govt_scm_cover";
            });
            let findImage =
              filterArray.length > 0 ? filterArray[0].image : "NA";
            setImage(findImage);
            setGovBannerAds(filterArray);
          }
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
    dispatch(adsList());
  }, [dispatch]);

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

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "govt_scm_side_ads";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setGovtScmSideAdds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
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
  //             return item.image_type == "govt_scm_box";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setGovBoxAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code below >>>>>>>>>>>>>>>>>>>>>>>>

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
                return item.image_type == "govt_scm_box";
              });
              setGovBoxAds(filterArray1);

              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "govt_scm_side_ads";
              });
              setGovtScmSideAdds(filterArray2);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "govt_scm_box";
            });
            setGovBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "govt_scm_side_ads";
            });
            setGovtScmSideAdds(filterArray2);
          }
        });
      },
    );
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <div>
      {/* <SEO
        title={``}
        description={``}
        keywords={``}
      /> */}

      <Helmet>
        <link rel="canonical" href="https://www.shekunj.com/government-schemes-in-india/" />
        <title>List of Government Schemes in India - Benefits - Shekunj.com</title>
        <meta name="description" content="List of Government Schemes: Women Empowerment Schemes, Beti Bachao Beti Padhao, Start Up India Scheme, Bima
          Yojana, women helpline scheme."/>
        <meta name="keywords" content="government policies and Schemes in india government
          schemes and programs new government schemes in india central government schemes"/>
      </Helmet>


      <Header loginPage={true} page='career' subPage='govExams' />
      <Container>
        <Row>
          {govBannerAds.length > 0 && (
            <div
              className='col-md-12 ads_gov_cover'
              onClick={() => addEmail(govBannerAds[0]?.add_email)}
            >
              <a href={govBannerAds[0]?.url_adds} target='_blank'>
                {detect.isMobile ? (
                  govBannerAds[0]?.image_mobile && (
                  <img
                  src={ govBannerAds[0]?.image_mobile }
                    // src={govBannerAds[0]?.image}
                    alt='Image'
                    className='ads_gov'
                  />)
                ) : (
                  govBannerAds[0]?.image && (
                  <img
                  src={ govBannerAds[0]?.image}
                    // src={govBannerAds[0]?.image}
                    alt='Image'
                    className='ads_gov'
                  />)
                )}
             
              </a>
            </div>
          )}
        </Row>
      </Container>

      <div className='mainDiv_gov'>
        <Container>
          <div className='career_tit noselect'>
            <h2>{t("careerGovExams.heading.1")}</h2>
          </div>
          <Row>
            <Col md={4} xs={12}>
              <AccordionComponent
                type='governmentExams'
                categories={{
                  name: t("careerGovExams.listItems.1"),
                  rows: governmentExams?.govt_category || [],
                }}
              />
              <div className='row'>
                {govtScmSideAdds.length > 0 && (
                  <div
                    className='col-md-12'
                    onClick={() => addEmail(govtScmSideAdds[0]?.add_email)}
                  >
                    <a href={govtScmSideAdds[0]?.url_adds} target='_blank'>
                      <img
                        src={govtScmSideAdds[0]?.image}
                        alt='Image'
                        className='google_add_courses'
                      />
                    </a>
                  </div>
                )}
                {/* <div className='row'>
                  <div className='col-md-12'>
                    <img
                      src={govtScmSideAdds[0]?.image}
                      alt='Image'
                      className='google_add_courses'
                    />
                  </div>
                </div> */}
              </div>
            </Col>

            <Col md={8} xs={12}>
              {governmentExams?.govt_list?.length > 0 ? (
                governmentExams?.govt_list?.map(
                  (c, index) =>
                    c?.name && (
                      <>
                        <div
                          className='career_box noselect'
                          style={{ height: "auto" }}
                        >
                          <Row>
                            <Col md={3} xs={12}>
                              <div className='gov_logo_box'>
                                <Link
                                  to={
                                    routingConstants.GOVERNMENT_SCHEMES + c.id
                                  }
                                  className='col-md-6'
                                  key={c?.id}
                                >
                                  <div className='career_logo_box'>
                                    <img
                                      srcSet={transformImg(c?.logo)}
                                      alt='...'
                                      className='career_logo_img img-responsive'
                                    />
                                  </div>
                                </Link>
                              </div>
                            </Col>
                            <Col md={9} xs={12}>
                              <div className='top_col_content'>
                                <h3>
                                  <Link
                                    to={
                                      routingConstants.GOVERNMENT_SCHEMES + c.id
                                      // c.name.split(" ").join("_")
                                    }
                                    className=''
                                    key={c?.id}
                                  >
                                    {c && c.name}
                                  </Link>
                                </h3>

                                <ul class='list-inline list-unstyled'>
                                  {c.state && (
                                    <li>
                                      <span>{t("careerGovExams.other.8")}</span>{" "}
                                      : {c && c.state}
                                    </li>
                                  )}
                                  {c.state && <li>|</li>}
                                  {c.scheme_level && (
                                    <li>
                                      <span>{t("careerGovExams.other.4")}</span>{" "}
                                      : {c && c.scheme_level}
                                    </li>
                                  )}

                                  {c.scheme_level && <li>|</li>}

                                  {c.age_criteria && (
                                    <li>
                                      <span>{t("careerGovExams.other.6")}</span>{" "}
                                      : {c && c.age_criteria}
                                    </li>
                                  )}
                                </ul>

                                <Row>
                                  {c.whom_this_scheme_for && (
                                    <Col md={12} xs={12}>
                                      <span className='gov_scm_heading'>
                                        {t("careerGovExams.other.5")}
                                      </span>{" "}
                                      : {c && c.whom_this_scheme_for}
                                    </Col>
                                  )}
                                  {c.benefits && (
                                    <Col md={12} xs={12}>
                                      <span className='gov_scm_heading'>
                                        {t("careerGovExams.other.7")}
                                      </span>{" "}
                                      {/* : {c && c.benefits} */}
                                      <p style={{ textAlign: "justify" }}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: `<div>${c && c.benefits.substr(0, 150)
                                              }</div>`,
                                          }}
                                        />
                                      </p>
                                      <Link
                                        to={
                                          routingConstants.GOVERNMENT_SCHEMES + c.id
                                          // c.name.split(" ").join("_")
                                        }
                                        className='BlogReadMore'
                                        key={c?.id}
                                      >
                                        <h6>Read More...</h6>
                                      </Link>
                                    </Col>
                                  )}
                                  {/* {c.official_link && (
                                    <Col md={12} xs={12}>
                                      <span className='gov_scm_heading'>
                                        {t("careerGovExams.other.9")}
                                      </span>{" "}
                                      :{" "}
                                      <Link
                                        to={{ pathname: c?.official_link }}
                                        target='_blank'
                                        rel='noreferrer'
                                      >
                                        {c && c.official_link}
                                      </Link>
                                    </Col>
                                  )} */}
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Row>
                          {index % 4 == 3 ? (
                            <>
                              <div
                                className='career_box_add'
                                onClick={() =>
                                  addEmail(govBoxAds[0]?.add_email)
                                }
                              >
                                {govBoxAds.length > 0 && (
                                  <a href={govBoxAds[0]?.url_adds} target='_blank'>
                                    { detect.isMobile ? (
                                      govBoxAds[0]?.image_mobile && (
                                        <img src={govBoxAds[0]?.image_mobile} alt='Image' className='ads_gov_box'/>)
                                    ) : (
                                      <img src={govBoxAds[0]?.image} alt='Image' className='ads_gov_box'/>
                                    )}
                                  </a>
                                )}
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </Row>
                      </>
                    ),
                )
              ) : (
                <div className='text-center'>{t("common.noDataFound")}</div>

                //  isLoading ? (
                // <ClipLoader className="loader" color="#ec498a" />
                // ):(
                //   <div className='text-center'>{t("common.noDataFound")}</div>
                // )
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
};

export default CareerPage2;
