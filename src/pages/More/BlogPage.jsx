import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  NavDropdown,
  Navbar,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { routingConstants } from "../../utils/constants";

import {
  setCollapseBlogs,
  getAllBlogs as fetchBlogs,
} from "../../store/blogs/action";
import { getAllBlogs } from "../../store/blogs";
import { Header, Footer } from "../../components";
import down1 from "../../assets/icons/down1.png";
import up from "../../assets/icons/up.png";
import double_quote from "../../assets/icons/double_quote.png";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";
import { Helmet } from "react-helmet-async";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
function BlogPage() {
  const history = useHistory();
  const { blogs } = useSelector((state) => state.blogsReducer);
  const dispatch = useDispatch();
   const [offset, setOffset] = useState(0);
  const pageLimit = 10

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   dispatch(fetchBlogs(pageLimit,offset));
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, [dispatch, lan]);
  

  useEffect(() => {
    dispatch(getAllBlogs(pageLimit,offset));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [ lan]);

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseBlogs(id, is_collapse ? false : true));
  };

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [blogBoxAdds, setBlogBoxAdds] = useState([]);
  const [adds, setAdds] = useState([]);
  const detect = useDeviceDetect();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "blog_index";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setBlogBoxAdds(filterArray);
  //         }
  //       })
  //       .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   // dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>latest code below >>>>>>>>>>>>>>>>>>>>>

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

              return item.image_type == "blog_index";

            });
            setBlogBoxAdds(filterArray1);
            // console.log("filterArray1blog_index",filterArray1)
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
                return item.image_type == "blog_index";
              });
              setBlogBoxAdds(filterArray1);
              // console.log("filterArray1coursebox",filterArray1) 
            }
          })
      }

      
    )
  }, [])



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
        }).catch((error) => {
          // setMessage("No data found");
          console.log(error);
        })
    });
  };
  const paginationBack = () => {
    dispatch(getAllBlogs(pageLimit,offset-pageLimit));
    setOffset(offset - pageLimit)
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const paginationNext = () => {
    dispatch(getAllBlogs(pageLimit,offset+pageLimit));
    setOffset(offset +pageLimit)
    window.scrollTo({top:0,behavior:'smooth'});
  };

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreblog' />
      <Helmet>

        <title>India's Leading Women Empowerment Organization - Shekunj.com</title>
        <link rel="canonical" href="https://www.shekunj.com/blogs/" />
        <meta name="description" 
        content="Shekunj.com works on women empowerment and skill development by providing free training, job-oriented courses, jobs & internships and career counseling." />
        <meta name="keywords" 
        content="women empowerment organizations women empowerment initiative free online courses free career guidance" />
      </Helmet>
      <div className='SuccStory_banner noselect'>
        <Container>
          <Row>
            <Col md={1}>
              <div className='global_img noselect' >
                <img src={global} alt='' className='vert-move' />
              </div>
            </Col>
            <Col md={6} data-aos='slide-up noselect'>
              <h2> {t("successStoriesPage.heading.1")}</h2>
              <p className='sucess_first_p'>
                {t("successStoriesPage.content.1")}
              </p>
              <p>{t("successStoriesPage.content.4")}</p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* google add */}
      <Container>
        <Row>
          <div className='col-md-12 noselect' >
            {blogBoxAdds.length > 0 && (
              <div
                className='ads_story_cover'
                onClick={() => addEmail(blogBoxAdds[0]?.add_email)}
              >
                <a href={blogBoxAdds[0]?.url_adds} target='_blank'>
                  {detect.isMobile ? (
                    blogBoxAdds[0]?.image_mobile && (
                    <img src={blogBoxAdds[0]?.image_mobile} alt='Image' className='ads_story_cover_img_blog' />
                  )) : (
                    blogBoxAdds[0]?.image && (
                    <img src={blogBoxAdds[0]?.image} alt='Image' className='ads_story_cover_img_blog' />
                  ))}
                </a>
              </div>
            )}
          </div>
        </Row>
      </Container>

      <Container className="noselect">
        {blogs?.blog_list?.results?.length > 0 &&
          blogs?.blog_list?.results
            ?.slice(0)
            .reverse()
            .map((s, idx) => {
              return (
                <>
                  <div className='suc_box_blog noselect' key={s?.id}>
                    <Row>
                      {idx % 2 === 0 ? (
                        <>
                          <Col md={4} xs={12} className="showBlog">
                            <img src={s?.image} alt='' onClick={() => history.push(routingConstants.MORE_BLOG + s.id)}/>
                          </Col>
                          <Col md={8} xs={12}>
                            <h2 className="noselect" onClick={() => history.push(routingConstants.MORE_BLOG + s.id)}>
                              <img
                                className='quote_img_blog'
                                src={double_quote}
                                style={{ width: 20, height: 20 }}
                                alt=''
                              />
                              {s?.title || t("common.n/a")}{" "}
                            </h2>
                            {/* <h6 class='card-subtitle mb-2 text-muted'>
                              <Moment format='D MMM YYYY' withTitle>
                                {s?.created_at}
                              </Moment>
                            </h6> */}
                            <p className='noselect'>
                              {/* {(s?.is_collapse
                              ? paragraph(s?.description.replace(/<br\s*[\/]?>/gi,'\n').replace(/<p\s*[\/]?>/gi,'\n'))
                              : sliceString(s?.description.replace(/<br\s*[\/]?>/gi,'\n').replace(/<p\s*[\/]?>/gi,'\n'))) || t("common.n/a")} */}
                              {s?.is_collapse === true ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${s.about_blog}</div>`,
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    maxHeight: "130px",
                                    overflow: "hidden",
                                    margin: '10px 0'
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${s.about_blog}</div>`,
                                  }}
                                />
                              )}
                              <Link
                                to={routingConstants.MORE_BLOG + s.id}
                                className='BlogReadMore noselect'
                                key={s?.id}
                              >
                                Read More
                              </Link>
                            </p>

                            {/* {s?.about_blog?.length >= 300 && (
                            <div className='suc_btn'>
                              <hr />

                              <button
                                onClick={() =>
                                  handleSetCollapse(s?.id, s?.is_collapse)
                                }
                              >
                                {console.log(
                                  "id & is_collapse",
                                  s?.id,
                                  s?.is_collapse,
                                )}
                                {t("successStoriesPage.button.1")}{" "}
                                {s?.is_collapse
                                  ? t("common.less1")
                                  : t("common.more1")}{" "}
                                <img src={s?.is_collapse ? up : down1} alt='' />
                              </button>
                              <hr />
                            </div>
                          )} */}
                          </Col>

                          <Col md={4} xs={12} className="hideBlog">
                            <img src={s?.image} alt='' onClick={() => history.push(routingConstants.MORE_BLOG + s.id)}/>
                          </Col>
                          
                        </>
                      ) : (
                        <>
                          <Col md={4} xs={12}>
                            <img src={s?.image} alt='' onClick={() => history.push(routingConstants.MORE_BLOG + s.id)}/>
                          </Col>
                          <Col md={8} xs={12} onClick={() => history.push(routingConstants.MORE_BLOG + s.id)}>
                            <h2 className="noselect">
                              <img
                                className='quote_img_blog'
                                src={double_quote}
                                style={{ width: 20, height: 20 }}
                                alt=''
                              />
                              {s?.title || t("common.n/a")}{" "}
                            </h2>
                            {/* <h6 class='card-subtitle mb-2 text-muted'>
                              <Moment format='D MMM YYYY' withTitle>
                                {s?.created_at}
                              </Moment>
        
                            </h6> */}

                            <p className='noselect' key={s?.id}>
                              {/* {(s?.is_collapse
                              ? paragraph(s?.description)
                              : sliceString(s?.description)) || t("common.n/a")} */}
                              {s?.is_collapse === true ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${s.about_blog}</div>`,
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    maxHeight: "130px",
                                    overflow: "hidden",
                                    margin: '10px 0'
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${s.about_blog}</div>`,
                                  }}
                                  key={s?.id}
                                />
                              )}
                              <Link
                                to={routingConstants.MORE_BLOG + s.id}
                                className='BlogReadMore noselect'
                                key={s?.id}
                              >
                                Read More
                              </Link>
                            </p>

                            {/* {s?.about_blog?.length >= 300 && (
                            <div className='suc_btn'>
                              <hr />
                              <button
                                onClick={() =>
                                  handleSetCollapse(s?.id, s?.is_collapse)
                                }
                              >
                                {t("successStoriesPage.button.1")}{" "}
                                {s?.is_collapse
                                  ? t("common.less1")
                                  : t("common.more1")}{" "}
                                <img src={s?.is_collapse ? up : down1} alt='' />
                              </button>
                              <hr />
                            </div>
                          )} */}
                          </Col>
                        </>
                      )}
                    </Row>

                    {/* {idx % 2 == 1 ? (
                      <>
                      {blogBoxAdds[0].length > 0 && (
                        <div
                          // className='slide-img-test'
                          className='ads_story_cover'
                          onClick={() =>
                            addEmail(blogBoxAdds[0]?.add_email)
                          }
                        >
                          <a
                            href={blogBoxAdds[0]?.url_adds}
                            target='_blank'
                          >
                            <img
                              src={blogBoxAdds[0]?.image}
                              alt='Image'
                              className='ads_succ_story'
                            />
                          </a>
                          <div className='overlay'></div>
                        </div>
                      )}
                      </>
                    ) : (
                      ""
                    )} */}
                  </div>
                </>
              );
            })}
        {blogs?.blog_list?.length === 0 && (
          <div className='text-center mt-5 noselect'>{t("common.noDataFound")}</div>
        )}
        {blogs?.blog_list?.count > pageLimit && (
                <Pagination
                  finalCount={blogs?.blog_list?.count / pageLimit}
                  nextPage={blogs?.blog_list?.next ? paginationNext : null}
                  backPage={blogs?.blog_list?.previous ? paginationBack : null}
                />
              )}
      </Container>

      <div className='want'>
        <Container>
          <h2>{t("successStoriesPage.content.2")}</h2>
          <button onClick={() => history.push("/courses")} className='want_btn noselect'>
            {t("successStoriesPage.button.2")}
          </button>
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
}

export default BlogPage;
