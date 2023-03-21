import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";


import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import {
  successStoriesDetails as fetchSuccessStoriesDetails,
  
} from "../../store/courses/action";
import { useParams } from "react-router-dom";
import { Footer, Header, SEO } from "../../components";
const SuccessStoryDetails = () => {
  const { successStoriesDetails } = useSelector((state) => {
    return state.coursesReducer;
  });
  const dispatch = useDispatch();
  // ("Blogssssss", blogs);
  const { lan } = useSelector((state) => state.languageReducer);
  // ("langggggg", lan);
  const { t } = useTranslation();

  const { id } = useParams();
  // ("id!!!!!!", id);


  const [storyDetailsBoxAds, setStoryDetailsBoxAds] = useState([]);
  const detect = useDeviceDetect();

  useEffect(() => {
    dispatch(fetchSuccessStoriesDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

              return item.image_type == "success_stories_details";

            });
            setStoryDetailsBoxAds(filterArray1);
            // ("filterArray1blog_details",filterArray1)
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
                return item.image_type == "blog_details";
              });
              setStoryDetailsBoxAds(filterArray1);
              // ("filterArray1coursebox",filterArray1) 
            }
          })
      }
    )
  }, [])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // const addEmail = (email) => {
  //   // ("addEmail", email);
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .post("/private_adds/click_add/", {
  //         // add_email:`${adds[0]?.add_email}`
  //         add_email: email,
  //         latitude: params.latitude.toString(),
  //         longitude: params.longitude.toString(),
  //       })
  //       .then((response) => {
  //         // setAdds(response.data.results);
  //         // ("addEmailresponse", response);
  //       });
  //   });
  // };
  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='story' subPage='moreStory  ' />

      {/* <Container className="coverMainSecSchool">
                <div className="school_detail_cover">
                    <img src={(blogs?.image)}
                     alt='...' className="school_detail_cover_img" />
                </div>
            </Container> */}

      {/* <Container>
                <Row>
                    <div md={12} xs={12}>
                        <div className="school_logo">
                            <img src={transformImg(topSchools?.logo)} alt='...'
                                className="school_logo_img" />
                        </div>
                    </div>
                </Row>
            </Container> */}

      {/* {("blogss---", blogs)} */}
      {/* {blogs?.length > 0 ? (
            blogs?.map((blogs)=>{
              ("blogs", blogs);
              return (
                  <> */}
      <div className='DetailMainDiv_career noselect'>
        <Container>
          <Row>
            <Col md={9} xs={12}>
              <div className='deatil_box'>
                <div style={{ textAlign: "center" }}>
                <img
                    src={successStoriesDetails && successStoriesDetails.image}
                    class='card-img-top '
                    alt='...'
                    style={{ width: 500, height: 500 }}
                  />
                </div>
                <h4 className='mb-3'>{successStoriesDetails && successStoriesDetails.name}</h4>

                <Row>
                  {/* {blogs.created_at && (
                    <Col md={6} xs={12}>
                      <h6>
                        <span>created_at</span> :{" "}
                        <Moment format='D MMM YYYY' withTitle>
                          {blogs.created_at}
                        </Moment>
                      </h6>
                    </Col>
                  )}
                  {blogs && blogs?.updated_at && (
                    <Col md={6} xs={12}>
                      <span>updated_at</span> :{" "}
                      <Moment format='D MMM YYYY' withTitle>
                        {blogs && blogs?.updated_at}
                      </Moment>
                    </Col>
                  )} */}
                </Row>

                {successStoriesDetails?.description && (
                  <p style={{ textAlign: "justify" }} className='mt-3'>
                    <span></span>{" "}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div>${successStoriesDetails?.description}</div>`,
                      }}
                    />
                  </p>
                )}
                {/* <Row>
                  {blogs.url && (
                    <Col md={10} xs={12}>
                      <h6>
                        visit link:
                        <Link
                          // to={{ pathname: topSchools?.website }}
                          to={blogs?.url}
                          target='_blank'
                        // rel='noreferrer'
                        >
                          {blogs && blogs.url}
                        </Link>
                      </h6>
                    </Col>
                  )}
                </Row> */}
              </div>
            </Col>

            <hr />

            {/* <Row>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image1)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image2)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image3)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image4)} alt='Image' className='right_gallery' />
                                    </Col>
                                </Row>   */}
            <Col md={3} xs={12}>
              <Container>
                {storyDetailsBoxAds.length > 0 && (
                  <Row  style={{marginTop:"50"}}>
                    <div
                      // onClick={() => addEmail(storyDetailsBoxAds[0]?.add_email)}
                    >
                      <a
                        href={storyDetailsBoxAds[0]?.url_adds}
                        className='addimage098'
                        target='_blank'
                      >
                        { detect.isMobile ? (
                          storyDetailsBoxAds[0]?.image_mobile && (
                          <img src={ storyDetailsBoxAds[0]?.image_mobile } alt='Image' className='google_ads_home' />
                        )) : (
                          storyDetailsBoxAds[0]?.image && (
                          <img src={storyDetailsBoxAds[0]?.image} alt='Image' className='google_ads_home' style={{ width: 180, marginTop: "0px !important"}} />
                        ))}
                      </a>
                    </div>
                  </Row>
                )}
              </Container>
            </Col>
          </Row>

          {/* <>
            <div className='Row'>
              <Col md={1} xl={12}>
                {storyDetailsBoxAds.length > 0 && (
                  <div
                    className='slide-img'
                    onClick={() => addEmail(storyDetailsBoxAds[0]?.add_email)}
                  >
                    <a href={storyDetailsBoxAds[0]?.url_adds} target='_blank'>
                      <img
                        src={storyDetailsBoxAds[0]?.image}
                        alt='Image'
                        className='google_add_box_img'
                      />
                    </a>
                    <div className='overlay'></div>
                  </div>
                )}
              </Col>
            </div>
          </> */}
        </Container>
      </div>
      {/* </>
              );
            })
          ) 
          : (
            <div className='text-center'>{t("common.noDataFound")}</div>
          )} */}
      <Footer loginPage={false} />
    </div>
  );
};

export default SuccessStoryDetails;
