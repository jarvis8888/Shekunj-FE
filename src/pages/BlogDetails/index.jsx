import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { routingConstants } from "../../utils/constants";
import { getAllBlogs, singleBlogDetails } from "../../store/blogs/action";
import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import noImageIcon from "../../assets/images/no-image.jpeg";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const BlogDetails = () => {
  const history = useHistory();
  const { blogs } = useSelector((state) => state.blogsReducer);
  const dispatch = useDispatch();
  // ("Blogssssss", blogs);
  const { lan } = useSelector((state) => state.languageReducer);
  // ("langggggg", lan);
  const { t } = useTranslation();

  const { id } = useParams();
  // ("id!!!!!!", id);

  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);
  const [blogDetailsBoxAds, setBlogDetailsBoxAds] = useState([]);
  const detect = useDeviceDetect();

  useEffect(() => {
    dispatch(singleBlogDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  // useEffect(() => {
  //     dispatch(getAllBlogs());
  //   }, [dispatch, lan]);

  // const transformImg = (image) => {
  //     return image ? image : TopCollage;
  // };
  // const transformGalley = (image) => {
  //     return image ? image : noImageIcon;
  // };
  // const transformCovImg = (image) => {
  //     return image ? image : dummySchool;
  // };

  // >>>>>>>>>>>>>>>>>>>>>>>>>> code below >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "blog_details";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setBlogDetailsBoxAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         (error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

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

              return item.image_type == "blog_details";

            });
            setBlogDetailsBoxAds(filterArray1);
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
              setBlogDetailsBoxAds(filterArray1);
              // ("filterArray1coursebox",filterArray1) 
            }
          })
      }
    )
  }, [])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const addEmail = (email) => {
    // ("addEmail", email);
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
          // ("addEmailresponse", response);
        });
    });
  };

  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='more' subPage='moreblog' />

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
                <img
                  src={blogs && blogs.image}
                  class='card-img-top'
                  alt='...'
                />
                <h4 className='mb-3'>{blogs && blogs.title}</h4>

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

                {blogs.about_blog && (
                  <p style={{ textAlign: "justify" }} className='mt-3'>
                    <span></span>{" "}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<div>${blogs.about_blog}</div>`,
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
                {blogDetailsBoxAds.length > 0 && (
                  <Row  style={{marginTop:"50"}}>
                    <div
                      onClick={() => addEmail(blogDetailsBoxAds[0]?.add_email)}
                    >
                      <a
                        href={blogDetailsBoxAds[0]?.url_adds}
                        className='addimage098'
                        target='_blank'
                      >
                        { detect.isMobile ? (
                          blogDetailsBoxAds[0]?.image_mobile && (
                          <img src={ blogDetailsBoxAds[0]?.image_mobile } alt='Image' className='google_ads_home' />
                        )) : (
                          blogDetailsBoxAds[0]?.image && (
                          <img src={blogDetailsBoxAds[0]?.image} alt='Image' className='google_ads_home' style={{ width: 180, marginTop: "0px !important"}}/>
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
                {blogDetailsBoxAds.length > 0 && (
                  <div
                    className='slide-img'
                    onClick={() => addEmail(blogDetailsBoxAds[0]?.add_email)}
                  >
                    <a href={blogDetailsBoxAds[0]?.url_adds} target='_blank'>
                      <img
                        src={blogDetailsBoxAds[0]?.image}
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

export default BlogDetails;
