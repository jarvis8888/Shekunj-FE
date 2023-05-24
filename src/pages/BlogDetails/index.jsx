import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header, SEO } from "../../components";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
import { singleBlogDetails } from "../../store/blogs/action";
import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import httpServices from "../../utils/ApiServices";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import { apiConstants } from "../../utils/constants";
import catagorie from "../../assets/images/categoryblog.svg";
import fire from "../../assets/images/fire.svg";
import { DateFormat, addEmailToClient } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  InstapaperShareButton,
} from "react-share";

const BlogDetails = () => {
  const history = useHistory();
  const { blogs } = useSelector((state) => state.blogsReducer);
  const dispatch = useDispatch();

  const { lan } = useSelector((state) => state.languageReducer);

  const { t } = useTranslation();
  const trendingSectionRef = useRef(null);

  const { id } = useParams();

  const currentUrl = window.location.href;

  const [blogDetailsBoxAds, setBlogDetailsBoxAds] = useState([]);
  const detect = useDeviceDetect();
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [blogLeft, setBolgLeft] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [currentTrendingBlogData, setCurrentTrendingBlogData] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingOffset, setTrendingOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const trendingPageLimit = 6;

  useEffect(() => {
    dispatch(singleBlogDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `more/blogs`;
      const data = await httpServices.get(url);
      const { blog_categories } = data;
      // if (trending_blogs?.length > 0) {
      //   const res = trending_blogs ?? [];
      //   const addObjectData = { id: "advertisement" };
      //   const newFeaturedData = [];

      //   for (let i = 0; i < res.length; i++) {
      //     newFeaturedData.push(res[i]);
      //     if ((i + 1) % 2 === 0) {
      //       newFeaturedData.push(addObjectData);
      //     }
      //   }
      //   setTrending(newFeaturedData);
      // }
      setBlogCategories(blog_categories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getAllTrendingBlogsData = async (limit, offset) => {
    setTrendingLoading(true);
    try {
      const url = `${apiConstants.ALL_BLOGS.TRENDING_BLOGS}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { trending_blogs } = data;

      if (trending_blogs?.results?.length > 0) {
        const res = trending_blogs?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);

          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }

        setTrendingBlogs((prevFeaturedData) => [
          ...newFeaturedData,
          ...prevFeaturedData,
        ]);
      } else {
        setCurrentTrendingBlogData(trending_blogs);
      }
    } catch (error) {
    } finally {
      setTrendingLoading(false);
    }
  };
  useEffect(() => {
    getAllTrendingBlogsData(trendingPageLimit, trendingOffset);
  }, [lan, trendingOffset]);

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
                return item.image_type === "blog_index";
              });
              setBlogDetailsBoxAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right1";
              });
              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right2";
              });
              setSuccesStoriesRight2(filterArray3);
              let filterArray4 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_left";
              });
              setBolgLeft(filterArray4);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index";
            });
            setBlogDetailsBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right1";
            });
            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right2";
            });
            setSuccesStoriesRight2(filterArray3);
            let filterArray4 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_left";
            });
            setBolgLeft(filterArray4);
          }
        });
      },
    );
  }, []);

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  const blogsLeftadCount = blogLeft.length; // Total number of ads
  let blogLeftadIndex = 0; // Current ad index

  const getNextAdIndexBlogLeft = () => {
    // Increment the index and reset if it exceeds the total count
    blogLeftadIndex = (blogLeftadIndex + 1) % blogsLeftadCount;
    return blogLeftadIndex;
  };

  const renderAd = (ad) => (
    <div
      key={ad.id}
      onClick={() => addEmailToClient(ad.add_email)}
      className='col-xl-12'
    >
      <div className='card'>
        <a href={ad.url_adds} target='_blank' rel='noreferrer'>
          {detect.isMobile
            ? ad.image_mobile && <img src={ad.image_mobile} alt='' />
            : ad.image && <img src={ad.image} alt='' />}
        </a>
      </div>
    </div>
  );

  const blogLeftRenderAds = () => {
    const adsToRender = [];

    for (let i = 0; i < blogsLeftadCount; i++) {
      const adIndex = getNextAdIndexBlogLeft();
      const ad = blogLeft[adIndex];
      adsToRender.push(renderAd(ad));
    }

    return adsToRender[getNextAdIndexBlogLeft()];
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
                      <span>{blogs?.category_name}</span>
                    </div>
                    <div class='sk-blokTVE-icon'>
                      <span>
                        <AccessTimeIcon />
                        {DateFormat(`${blogs?.created_at}`)}
                      </span>
                      <span>
                        <MenuBookRoundedIcon /> {blogs?.reading_time}
                      </span>
                      <span>
                        <VisibilityOutlinedIcon /> {blogs?.blog_count}
                      </span>
                    </div>
                  </div>
                  <div className='sk-social-icon sk-mobile-view'>
                    <h6>Share this article</h6>
                    <ul>
                      <li>
                        <FacebookShareButton url={currentUrl}>
                          <img src={facebookicon} alt='Facebook' />
                        </FacebookShareButton>
                      </li>
                      <li>
                        <LinkedinShareButton url={currentUrl}>
                          <img src={linkedinicon} alt='LinkedIn' />
                        </LinkedinShareButton>
                      </li>
                      <li>
                        <TwitterShareButton url={currentUrl}>
                          <img src={twittericon} alt='Twitter' />
                        </TwitterShareButton>
                      </li>
                      <li>
                        <PinterestShareButton
                          url={currentUrl}
                          media={blogs?.image}
                        >
                          <img src={pintresticon} alt='Pinterest' />
                        </PinterestShareButton>
                      </li>
                      <li>
                        <a href='https://www.instagram.com/' target='_blank'>
                          <img src={instagramicon} alt='instagramicon' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h2 className='sk-headingblog-title'>{blogs?.title}</h2>
                <div
                  className='sk-blogDetails-content'
                  dangerouslySetInnerHTML={{
                    __html: makeHtml(`${blogs?.about_blog}`),
                  }}
                />
                <div className='sk-blogS-category'>
                  <div className='sk-social-icon pb-3'>
                    <h6 className='text-left'>Share this article</h6>
                    <ul>
                      <li>
                        <FacebookShareButton url={currentUrl}>
                          <img src={facebookicon} alt='Facebook' />
                        </FacebookShareButton>
                      </li>
                      <li>
                        <LinkedinShareButton url={currentUrl}>
                          <img src={linkedinicon} alt='LinkedIn' />
                        </LinkedinShareButton>
                      </li>
                      <li>
                        <TwitterShareButton url={currentUrl}>
                          <img src={twittericon} alt='Twitter' />
                        </TwitterShareButton>
                      </li>
                      <li>
                        <PinterestShareButton
                          url={currentUrl}
                          media={blogs?.image}
                        >
                          <img src={pintresticon} alt='Pinterest' />
                        </PinterestShareButton>
                      </li>
                      <li>
                        <InstapaperShareButton url={currentUrl}>
                          <img src={instagramicon} alt='instagramicon' />
                        </InstapaperShareButton>
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
                <div className='title' ref={trendingSectionRef}>
                  <img src={fire} alt='fire' width={28} />
                  <h4>Trending Blogs</h4>
                </div>
                <div className='sk-blogMain-inner'>
                  {trendingBlogs?.map((items, index) => {
                    if (items.id === "advertisement") {
                      return <>{blogLeft.length > 0 && blogLeftRenderAds()}</>;
                    } else {
                      return (
                        <>
                          <TrendingBlogsCard2
                            image={items.image}
                            title={items.title}
                            id={items.id}
                            description={`${items.about_blog}`}
                            time={items.reading_time}
                            date={DateFormat(`${items.created_at}`)}
                            category_name={items.category_name}
                          />
                        </>
                      );
                    }
                  })}
                  <div className='d-flex justify-content-center align-items-center py-4'>
                    <button
                      className='loadMore'
                      onClick={() => {
                        setTrendingOffset(trendingOffset + 6);
                        trendingSectionRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      disabled={currentTrendingBlogData?.results?.length === 0}
                    >
                      Explore More
                    </button>
                  </div>
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
