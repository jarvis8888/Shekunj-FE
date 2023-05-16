import React, { useState, useEffect } from "react";
import "./blogPage.scss";
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
import { apiConstants, routingConstants } from "../../utils/constants";

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
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";
import { Helmet } from "react-helmet-async";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
import BlogCarousel from "../../components/Carousel/BlogCarousel";
import photo from "../../assets/icons/svgs/exphoto.png";
import AddsBanner from "../../components/AddsBanner/AddsBanner";
import FeaturedCards from "../../components/cards/FeaturedCards";
import fire from "../../assets/images/fire.svg";
import timeicon from "../../assets/images/timeicon.svg";
import { TrendingBlogsCard } from "../../components/cards/TrendingBlogsCard";
import LatestBlogCard from "../../components/cards/LatestBlogCard";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import catagorie from "../../assets/images/categoryblog.svg";
import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { DateFormat, addEmailToClient } from "../../utils/utils";

function BlogPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const pageLimit = 5;

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [blogBoxAdds, setBlogBoxAdds] = useState([]);
  const [blogRight1, bolgRight1] = useState([]);
  const [blogRight2, bolgRight2] = useState([]);
  const [blogLeft, bolgLeft] = useState([]);
  const detect = useDeviceDetect();

  const [topTrendingBlogs, setTopTrendingBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [blogsCategories, setBlogsCategories] = useState([]);
  const [currentBlogData, setCurrentBlogData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBlogsData = async (limit, offset) => {
    setLoading(true);
    try {
      const url = `${apiConstants.ALL_BLOGS.ALL_BLOGS}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { latest_blogs, trending_blogs, blog_categories } = data;

      if (latest_blogs?.results?.length > 0) {
        const num = Math.floor(Math.random() * 4);
        const res = latest_blogs?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [
          ...res.slice(0, num),
          addObjectData,
          ...res.slice(num),
        ];
        setLatestBlogs((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentBlogData(latest_blogs);
      }
      if (trending_blogs?.length > 0) {
        setTopTrendingBlogs(trending_blogs);

        const res = trending_blogs ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);
          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }
        setTrendingBlogs(newFeaturedData);
      }
      setBlogsCategories(blog_categories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogsData(pageLimit, offset);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [lan, offset]);

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
              setBlogBoxAdds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index_right1";
              });
              bolgRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index_right2";
              });
              bolgRight2(filterArray3);
              let filterArray4 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index_left";
              });
              bolgLeft(filterArray4);
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
            setBlogBoxAdds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index_right1";
            });
            bolgRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index_right2";
            });
            bolgRight2(filterArray3);
            let filterArray4 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_index_left";
            });
            bolgLeft(filterArray4);
          }
        });
      },
    );
  }, []);

  const paginationBack = () => {
    dispatch(getAllBlogs(pageLimit, offset - pageLimit));
    setOffset(offset - pageLimit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const paginationNext = () => {
    dispatch(getAllBlogs(pageLimit, offset + pageLimit));
    setOffset(offset + pageLimit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseBlogs(id, is_collapse ? false : true));
  };

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreblog' />
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
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <>
          <section>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-8 col-md-8 col-lg-8'>
                  <div className='carousel-blog'>
                    <BlogCarousel images={topTrendingBlogs?.slice(0, 5)} />
                  </div>
                </div>
                <div className='col-xl-4 col-md-4 col-lg-4'>
                  <div className='sk-blog-sidebar'>
                    {topTrendingBlogs?.length
                      ? topTrendingBlogs.slice(0, 3).map((items, index) => {
                          return (
                            <>
                              <TrendingBlogsCard
                                image={items.image}
                                id={items.id}
                                description={items.title}
                                time={items.reading_time}
                                date={DateFormat(`${items.created_at}`)}
                                category_name={items.category_name}
                              />
                            </>
                          );
                        })
                      : "no data"}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='sk-addBg-color'>
            <div className='container'>
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
            <div className='container'>
              <div className='row'>
                <div className='col-xl-9 col-md-8 col-lg-8'>
                  <div className='blog-stories'>
                    <div className='title'>
                      <img src={timeicon} alt='time' width={28} />
                      <h4>Latest Blogs</h4>
                    </div>
                    <div className='row'>
                      {latestBlogs?.map((items, index) => {
                        if (items.id === "advertisement") {
                          const randomIndex = Math.floor(
                            Math.random() * blogLeft.length,
                          );
                          return (
                            <>
                              {blogLeft.length > 0 && (
                                <div
                                  className='col-xl-6 col-md-6 col-lg-6 col-sm-12'
                                  // className='col-md-12 ads_home_cover '
                                  onClick={() =>
                                    addEmailToClient(
                                      blogLeft[randomIndex]?.add_email,
                                    )
                                  }
                                >
                                  <div className='sk-cardAdd-fix'>
                                    <a
                                      href={blogLeft[randomIndex]?.url_adds}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {detect.isMobile
                                        ? blogLeft[randomIndex]
                                            ?.image_mobile && (
                                            <img
                                              src={
                                                blogLeft[randomIndex]
                                                  ?.image_mobile
                                              }
                                              alt=''
                                              // className='ads_story_cover_img'
                                            />
                                          )
                                        : blogLeft[randomIndex]?.image && (
                                            <img
                                              src={blogLeft[randomIndex]?.image}
                                              alt=''
                                              // className='ads_story_cover_img'
                                            />
                                          )}
                                    </a>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        } else {
                          return (
                            <>
                              <div className='col-xl-6 col-md-6 col-lg-6 col-sm-12'>
                                <LatestBlogCard
                                  image={items.image}
                                  hashtags={items.hash_tags}
                                  title={items.title}
                                  description={`${items.about_blog}`}
                                  makeHtml={makeHtml}
                                  key={index}
                                  created_at={DateFormat(`${items.created_at}`)}
                                  reading_time={items.reading_time}
                                  id={items.id}
                                  blog_count={items.blog_count}
                                  category_name={items.category_name}
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
                        onClick={() => setOffset(offset + 5)}
                        disabled={currentBlogData?.results?.length === 0}
                      >
                        Explore More
                      </button>
                    </div>
                  </div>
                  <div className='pb-5'>
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

                  <div className='title'>
                    <img src={fire} alt='fire' width={28} />
                    <h4>Trending Blogs</h4>
                  </div>
                  {trendingBlogs?.map((items, index) => {
                    if (items.id === "advertisement") {
                      const randomIndex = Math.floor(
                        Math.random() * blogLeft.length,
                      );
                      return (
                        <>
                          {blogBoxAdds.length > 0 && (
                            <div className='row'>
                              <div
                                className='col-md-12'
                                // className='col-md-12 ads_home_cover '
                                onClick={() =>
                                  addEmailToClient(
                                    blogBoxAdds[randomIndex]?.add_email,
                                  )
                                }
                              >
                                <div className='card'>
                                  <a
                                    href={blogBoxAdds[randomIndex]?.url_adds}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {detect.isMobile
                                      ? blogBoxAdds[randomIndex]
                                          ?.image_mobile && (
                                          <img
                                            src={
                                              blogBoxAdds[randomIndex]
                                                ?.image_mobile
                                            }
                                            alt=''
                                            // className='ads_story_cover_img'
                                          />
                                        )
                                      : blogBoxAdds[randomIndex]?.image && (
                                          <img
                                            src={
                                              blogBoxAdds[randomIndex]?.image
                                            }
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
                            date={DateFormat(`${items.created_at}`)}
                            category_name={items.category_name}
                          />
                        </>
                      );
                    }
                  })}
                </div>

                <div className='col-xl-3 col-md-4 col-lg-4 col-sm-12'>
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

      <Footer loginPage={false} />
    </div>
  );
}

export default BlogPage;
