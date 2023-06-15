import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Header, SEO, SocialShare } from "../../components";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import httpServices from "../../utils/ApiServices";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import { apiConstants } from "../../utils/constants";
import catagorie from "../../assets/images/categoryblog.svg";
import fire from "../../assets/images/fire.svg";
import {
  DateFormat,
  addEmailToClient,
  assignColorToCategory,
  removeHtmlTags,
} from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

const BlogDetails = () => {
  const history = useHistory();
  const { blogs } = useSelector((state) => state.blogsReducer);
  const dispatch = useDispatch();

  const { lan } = useSelector((state) => state.languageReducer);

  const { t } = useTranslation();
  const trendingSectionRef = useRef(null);

  const { id } = useParams();
  // Extract the last number from the id

  const lastNumber = id.split("-").pop();
  // const parts = id.split("/");
  // console.log("🚀 ~ file: index.jsx:51 ~ BlogDetails ~ parts:", parts)
  // const lastPart = parts[parts.length - 1];
  // const lastNumber = parseInt(lastPart.match(/\d+/)[0]);

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
    dispatch(singleBlogDetails(lastNumber));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, lastNumber, lan, id]);

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
    const adIndex = getNextAdIndexBlogLeft();
    const ad = blogLeft[adIndex];

    return renderAd(ad);
  };

  const namesArray = blogCategories?.map((category) => category.name);

  const getCategoryColor = assignColorToCategory(namesArray);

  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='sk-block-details'>
          <div className='container sk-custom-container'>
            <div className='row'>
              <div className='col-xl-8 col-lg-8 col-md-8'>
                <div className='sk-topBottom-space'>
                  <img src={blogs?.image} alt='Story' className='img' />
                  <div className='story-bottom'>
                    <div className='hashtags-container'>
                      <div className='sk-bdetail-chip'>
                        <span
                          style={{
                            background: `${getCategoryColor(
                              blogs?.category_name,
                            )}`,
                          }}
                        >
                          {blogs?.category_name}
                        </span>
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
                      <SocialShare
                        currentUrl={currentUrl}
                        title={blogs?.title}
                        image={blogs?.image}
                      />
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
                      <SocialShare
                        currentUrl={currentUrl}
                        title={blogs?.title}
                        image={blogs?.image}
                      />
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
                  <HashtagAndCatagoriesForMobile
                    image={catagorie}
                    title={`Categories`}
                    hashtags={blogCategories}
                  />
                  <div className='title' ref={trendingSectionRef}>
                    <img src={fire} alt='fire' width={28} />
                    <h4>Trending Blogs</h4>
                  </div>
                  <div className='sk-blogMain-inner'>
                    {trendingBlogs?.map((items, index) => {
                      if (items.id === "advertisement") {
                        return (
                          <>{blogLeft.length > 0 && blogLeftRenderAds()}</>
                        );
                      } else {
                        return (
                          <>
                            <TrendingBlogsCard2
                              image={items.image}
                              title={items.title}
                              id={items.id}
                              description={`${removeHtmlTags(
                                items.about_blog,
                              )}`}
                              time={items.reading_time}
                              date={DateFormat(`${items.created_at}`)}
                              category_name={items.category_name}
                              color={getCategoryColor(items.category_name)}
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
                        disabled={
                          currentTrendingBlogData?.results?.length === 0
                        }
                      >
                        Explore More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-4 sk-Removeside-space'>
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
    </div>
  );
};

export default withHeaderFooter(BlogDetails);
