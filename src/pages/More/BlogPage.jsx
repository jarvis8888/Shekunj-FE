import React, { useState, useEffect, useRef } from "react";
import "./blogPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { apiConstants, routingConstants } from "../../utils/constants";
import { Header, Footer } from "../../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";
import { Helmet } from "react-helmet-async";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import BlogCarousel from "../../components/Carousel/BlogCarousel";
import AddsBanner from "../../components/AddsBanner/AddsBanner";
import fire from "../../assets/images/fire.svg";
import timeicon from "../../assets/images/timeicon.svg";
import { TrendingBlogsCard } from "../../components/cards/TrendingBlogsCard";
import LatestBlogCard from "../../components/cards/LatestBlogCard";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import catagorie from "../../assets/images/categoryblog.svg";
import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import {
  DateFormat,
  addEmailToClient,
  assignColorToCategory,
  removeHtmlTags,
} from "../../utils/utils";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { WhiteCircularBar } from "../../components/Loader/WhiteCircularBar";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

function BlogPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [trendingOffset, setTrendingOffset] = useState(0);

  const pageLimit = 4;
  const trendingPageLimit = 6;
  const sectionRef = useRef(null);
  const trendingSectionRef = useRef(null);

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [blogBoxAdds, setBlogBoxAdds] = useState([]);
  const [blogRight1, bolgRight1] = useState([]);
  const [blogRight2, bolgRight2] = useState([]);
  const [blogLeft, setBolgLeft] = useState([]);
  const [blogGrid, setBolgGrid] = useState([]);
  const detect = useDeviceDetect();

  const [topTrendingBlogs, setTopTrendingBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [blogsCategories, setBlogsCategories] = useState([]);
  const [currentBlogData, setCurrentBlogData] = useState([]);
  const [currentTrendingBlogData, setCurrentTrendingBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const getAllBlogsData = async (limit, offset) => {
    setLoading(true);
    try {
      const url = `${apiConstants.ALL_BLOGS.ALL_BLOGS}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { latest_blogs, blog_categories } = data;

      if (latest_blogs?.results?.length > 0) {
        const res = latest_blogs?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);

          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }

        setLatestBlogs((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentBlogData(latest_blogs);
      }
      setBlogsCategories(blog_categories);
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
      const { trending_blogs, banner_featured_blogs } = data;
      setTopTrendingBlogs(banner_featured_blogs);

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
          ...prevFeaturedData,
          ...newFeaturedData,
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
    const fetchData = async () => {
      try {
        await getAllBlogsData(pageLimit, offset);
        setPageLoading(false);
      } catch (error) {
        // Handle error
        setPageLoading(false);
      }
    };

    fetchData();
  }, [lan, offset]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        await getAllTrendingBlogsData(trendingPageLimit, trendingOffset);
        setPageLoading(false);
      } catch (error) {
        // Handle error
        setPageLoading(false);
      }
    };

    fetchTrendingData();
  }, [lan, trendingOffset]);

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
              setBlogBoxAdds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right1";
              });
              bolgRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right2";
              });
              bolgRight2(filterArray3);
              let filterArray4 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_left";
              });
              setBolgLeft(filterArray4);
              let filterArray5 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_trending_grid";
              });
              setBolgGrid(filterArray5);
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
            setBlogBoxAdds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right1";
            });
            bolgRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right2";
            });
            bolgRight2(filterArray3);
            let filterArray4 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_left";
            });
            setBolgLeft(filterArray4);
            let filterArray5 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_trending_grid";
            });
            setBolgGrid(filterArray5);
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

  const blogsGridadCount = blogGrid.length; // Total number of ads
  let blogGridadIndex = 0; // Current ad index

  const getNextAdIndexBlogGrid = () => {
    // Increment the index and reset if it exceeds the total count
    blogGridadIndex = (blogGridadIndex + 1) % blogsGridadCount;
    return blogGridadIndex;
  };

  const renderBoxAd = (ad) => (
    <div
      key={ad.id}
      onClick={() => addEmailToClient(ad.add_email)}
      className='col-xl-6 col-lg-6 col-md-12 col-sm-12'
    >
      <div className='sk-cardAdd-fix'>
      <span className="sk-ad-title">Advertisement</span>
        <a href={ad.url_adds} target='_blank' rel='noreferrer' className="mx-auto">
          {detect.isMobile
            ? ad.image_mobile && <img src={ad.image_mobile} alt='' />
            : ad.image && <img src={ad.image} alt='' />}
        </a>
      </div>
    </div>
  );

  const blogGridRenderAds = () => {
    const BoxadIndex = getNextAdIndexBlogGrid();
    const ad = blogGrid[BoxadIndex];

    return renderBoxAd(ad);
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

  const handleLoadMoreClick = () => {
    if (currentBlogData?.results?.length === 0) {
      return; // Do not scroll if button is disabled
    }

    // setTimeout(() => {
    //   sectionRef.current.scrollIntoView({
    //     behavior: "smooth",
    //   });
    // }, 10); // Minimal delay for rendering update

    setOffset(offset + 4);
  };

  const namesArray = blogsCategories?.map((category) => category.name);

  const getCategoryColor = assignColorToCategory(namesArray);

  return (
    <div>
      <Helmet>
        <title>
          India's Leading Women Empowerment Organization - Shekunj.com
        </title>
        <link rel='canonical' href='https://www.shekunj.com/blogs/' />
        <meta
          name='description'
          content='Shekunj.com works on women empowerment and skill development by providing free training, job-oriented courses, jobs & internships and career counseling.'
        />
        <meta
          name='keywords'
          content='women empowerment organizations women empowerment initiative free online courses free career guidance'
        />
      </Helmet>

      {pageLoading ? (
        <CustomLoader />
      ) : (
        <>
          <section className='sk-blogTopbar-sec'>
            <div className='container sk-custom-container'>
              <div className='row'>
                <div className='col-xl-8 col-md-8 col-lg-8'>
                  <div className='carousel-blog'>
                    <BlogCarousel
                      images={topTrendingBlogs?.slice(0, 5)}
                      color={getCategoryColor}
                    />
                  </div>
                </div>
                <div className='col-xl-4 col-md-4 col-lg-4'>
                  <div className='sk-blog-sidebar'>
                    {topTrendingBlogs?.length ? (
                      topTrendingBlogs.slice(0, 3).map((items, index) => {
                        return (
                          <>
                            <TrendingBlogsCard
                              image={items.image}
                              id={items.id}
                              description={items.title}
                              time={items.reading_time}
                              date={DateFormat(`${items.created_at}`)}
                              category_name={items.category_name}
                              key={index}
                              color={getCategoryColor(items.category_name)}
                            />
                          </>
                        );
                      })
                    ) : (
                      <>
                        <NoDataFound size='small' />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='sk-addBg-color'>
            <div className='container sk-custom-container'>
              <div className='row'>
                <div className='col-md-12'>
                  <AddsBanner
                    color='#F4F4F4'
                    children={
                      <>
                        {blogBoxAdds.length > 0 && (
                          <div
                            className='banner-adds'
                            onClick={() =>
                              addEmailToClient(blogBoxAdds[0]?.add_email)
                            }
                          >
                            <a
                              href={blogBoxAdds[0]?.url_adds}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {detect.isMobile
                                ? blogBoxAdds[0]?.image_mobile && (
                                    <img
                                      src={blogBoxAdds[0]?.image_mobile}
                                      alt=''
                                      className='ads_story_cover_img'
                                    />
                                  )
                                : blogBoxAdds[0]?.image && (
                                    <img
                                      src={blogBoxAdds[0]?.image}
                                      alt=''
                                      className='ads_story_cover_img'
                                    />
                                  )}
                            </a>
                          </div>
                        )}
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='container sk-custom-container'>
              <div className='row'>
                <div className='col-xl-8 col-md-6 col-lg-8'>
                  <div className='sk-topBottom-space'>
                    <div className='blog-stories'>
                      <div className='title' ref={sectionRef}>
                        <img src={timeicon} alt='time' width={28} />
                        <h4>Latest Blogs</h4>
                      </div>

                      <div className='row'>
                        {latestBlogs?.map((items, index) => {
                          if (items.id === "advertisement") {
                            return (
                              <>{blogGrid.length > 0 && blogGridRenderAds()}</>
                            );
                          } else {
                            return (
                              <>
                                <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12'>
                                  <LatestBlogCard
                                    image={items.image}
                                    hashtags={items.hash_tags}
                                    title={items.title}
                                    description={`${removeHtmlTags(
                                      items.about_blog,
                                    )}`}
                                    makeHtml={makeHtml}
                                    key={index}
                                    created_at={DateFormat(
                                      `${items.created_at}`,
                                    )}
                                    reading_time={items.reading_time}
                                    id={items.id}
                                    blog_count={items.blog_count}
                                    category_name={items.category_name}
                                    color={getCategoryColor(
                                      items.category_name,
                                    )}
                                  />
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>

                      <div className='d-flex justify-content-center align-items-center py-4'>
                        <button
                          className='loadMore'
                          onClick={handleLoadMoreClick}
                          disabled={currentBlogData?.results?.length === 0}
                        >
                          {loading ? <WhiteCircularBar /> : `Explore More`}
                        </button>
                      </div>
                    </div>
                    <div className='pb-4'>
                      <AddsBanner
                        color='#F4F4F4'
                        children={
                          <>
                            {blogBoxAdds.length > 0 && (
                              <div
                                className='banner-adds'
                                onClick={() =>
                                  addEmailToClient(blogBoxAdds[0]?.add_email)
                                }
                              >
                                <a
                                  href={blogBoxAdds[0]?.url_adds}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {detect.isMobile
                                    ? blogBoxAdds[0]?.image_mobile && (
                                        <img
                                          src={blogBoxAdds[0]?.image_mobile}
                                          alt=''
                                          className='ads_story_cover_img'
                                        />
                                      )
                                    : blogBoxAdds[0]?.image && (
                                        <img
                                          src={blogBoxAdds[0]?.image}
                                          alt=''
                                          className='ads_story_cover_img'
                                        />
                                      )}
                                </a>
                              </div>
                            )}
                          </>
                        }
                      />
                    </div>
                    <HashtagAndCatagoriesForMobile
                      image={catagorie}
                      title={"Categories"}
                      hashtags={blogsCategories}
                    />
                    <div className='title' ref={trendingSectionRef}>
                      <img src={fire} alt='fire' width={28} />
                      <h4>Trending Blogs</h4>
                    </div>
                    <>
                      {" "}
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
                                time={items?.reading_time}
                                date={DateFormat(`${items.created_at}`)}
                                category_name={items.category_name}
                                color={getCategoryColor(items.category_name)}
                              />
                            </>
                          );
                        }
                      })}
                    </>

                    <div className='d-flex justify-content-center align-items-center py-4'>
                      <button
                        className='loadMore'
                        onClick={() => {
                          setTrendingOffset(trendingOffset + 6);
                          // trendingSectionRef.current.scrollIntoView({
                          //   behavior: "smooth",
                          // });
                        }}
                        disabled={
                          currentTrendingBlogData?.results?.length === 0
                        }
                      >
                        {trendingLoading ? (
                          <WhiteCircularBar />
                        ) : (
                          `Explore More`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-md-6 col-lg-4 col-sm-12 sk-Removeside-space'>
                  <HashtagAndCatagories
                    image={catagorie}
                    title={"Categories"}
                    hashtags={blogsCategories}
                    rightOne={blogRight1}
                    rightTwo={blogRight2}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default withHeaderFooter(BlogPage);
