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
import photo from "../../assets/icons/svgs/exphoto.png";
import { TrendingStories } from "../SuccessStories/TrendingStories";
import twitter1 from "../../assets/images/twitter1.png";
import facebook from "../../assets/images/facebook.png";
import youTube from "../../assets/images/youTube.png";
import linkedinlogo from "../../assets/images/linkedinlogo.png";
import instagram from "../../assets/images/instagram.png";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import httpServices from "../../utils/ApiServices";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import { apiConstants } from "../../utils/constants";
import catagorie from "../../assets/icons/svgs/categories.png";
import fire from "../../assets/icons/svgs/fire.png";
import { DateFormat, addEmailToClient } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";

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
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const pageLimit = 10;

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `more/blogs`;
      const data = await httpServices.get(url);
      const { trending_blogs, blog_categories } = data;
      if (trending_blogs?.length > 0) {
        const res = trending_blogs ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);
          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }
        setTrending(newFeaturedData);
      }
      setBlogCategories(blog_categories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [lan]);

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
                return item.image_type == "blog_index";
              });
              setBlogDetailsBoxAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index_right1";
              });
              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index_right2";
              });
              setSuccesStoriesRight2(filterArray3);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index";
            });
            setBlogDetailsBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index_right1";
            });
            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index_right2";
            });
            setSuccesStoriesRight2(filterArray3);
          }
        });
      },
    );
  }, []);

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

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='more' subPage='moreblog' />
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='sk-block-details'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-9 col-md-8'>
                <img src={blogs?.image} alt='Story' className='img' />
                <div className='story-bottom'>
                  <div className='hashtags-container'>
                    <div className='sk-bdetail-chip'>
                      <span>Parenting Tips</span>
                    </div>
                    <div class='sk-blokTVE-icon'>
                      <span>
                        <AccessTimeIcon />
                        {DateFormat(`${blogs?.created_at}`)}
                      </span>
                      <span>
                        <MenuBookRoundedIcon /> 5 mins to read
                      </span>
                      <span>
                        <VisibilityOutlinedIcon /> 828
                      </span>
                    </div>
                  </div>
                  <div className='sk-social-icon'>
                    <h6>Share this article</h6>
                    <ul>
                      <li>
                        <a href='javascript:;'>
                          <img src={facebookicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={linkedinicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={twittericon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={pintresticon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={instagramicon} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h2 className="sk-headingblog-title">{blogs?.title}</h2>
                <div
                  className='sk-blogDetails-content'
                  dangerouslySetInnerHTML={{
                    __html: makeHtml(`${blogs?.about_blog}`),
                  }}
                />
                <div className='sk-blogS-category'>
                  <div className='sk-social-icon'>
                    <h6 className='text-left'>Share this article</h6>
                    <ul>
                      <li>
                        <a href='javascript:;'>
                          <img src={facebookicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={linkedinicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={twittericon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={pintresticon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={instagramicon} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='catagorie_search_container'>
                    {blogs?.tags?.length
                      ? blogs?.tags.map((items) => {
                          return (
                            <span
                              key={items}
                              className='catagorie_search'
                              onClick={() =>
                                history.push(
                                  `${routingConstants.MORE_BLOG_TAGS}?search=${items}`,
                                  items,
                                )
                              }
                            >
                              {items}
                            </span>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className='title'>
                  <img src={fire} alt='fire' height={35} />
                  <h4>Trending Blogs</h4>
                </div>
                <div>
                  {trending?.map((items, index) => {
                    if (items.id === "advertisement") {
                      return (
                        <>
                          {blogDetailsBoxAds.length > 0 && (
                            <div className='row'>
                              <div
                                className='col-md-12'
                                // className='col-md-12 ads_home_cover '
                                onClick={() =>
                                  addEmailToClient(
                                    blogDetailsBoxAds[0]?.add_email,
                                  )
                                }
                              >
                                <div className='card'>
                                  <a
                                    href={blogDetailsBoxAds[0]?.url_adds}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {detect.isMobile
                                      ? blogDetailsBoxAds[0]?.image_mobile && (
                                          <img
                                            src={
                                              blogDetailsBoxAds[0]?.image_mobile
                                            }
                                            alt=''
                                            // className='ads_story_cover_img'
                                          />
                                        )
                                      : blogDetailsBoxAds[0]?.image && (
                                          <img
                                            src={blogDetailsBoxAds[0]?.image}
                                            alt=''
                                            // className='ads_story_cover_img'
                                          />
                                        )}
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <TrendingBlogsCard2
                            image={items.image}
                            title={items.title}
                            id={items.id}
                            description={`${items.about_blog}`}
                            time='5 min'
                            date={items.created_at}
                          />
                        </>
                      );
                    }
                  })}
                </div>
              </div>
              <div className='col-xl-3 col-md-4'>
                <HashtagAndCatagories
                  image={catagorie}
                  title={`Categories`}
                  // addEmail={addEmail}
                  hashtags={blogCategories}
                  rightOne={succesStoriesRight1}
                  rightTwo={succesStoriesRight2}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer loginPage={false} />
    </div>
  );
};

export default BlogDetails;
