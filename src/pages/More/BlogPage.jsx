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
import fire from "../../assets/icons/svgs/fire.png";
import { TrendingBlogsCard } from "../../components/cards/TrendingBlogsCard";
import LatestBlogCard from "../../components/cards/LatestBlogCard";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import catagorie from "../../assets/icons/svgs/categories.png";

function BlogPage() {
  const history = useHistory();
  const { blogs } = useSelector((state) => state.blogsReducer);
  console.log(blogs);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const pageLimit = 10;

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   dispatch(fetchBlogs(pageLimit,offset));
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, [dispatch, lan]);

  useEffect(() => {
    dispatch(getAllBlogs(pageLimit, offset));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [lan]);

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseBlogs(id, is_collapse ? false : true));
  };

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [blogBoxAdds, setBlogBoxAdds] = useState([]);
  const [blogRight1, bolgRight1] = useState([]);
  const [blogRight2, bolgRight2] = useState([]);
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
                return item.image_type == "blog_index_right1";
              });
              bolgRight2(filterArray3);
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
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
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
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
  };
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
      <div>
        <div className='grid-container'>
          <div className='carousel-blog'>
            <BlogCarousel images={blogs?.latest_blogs?.results} />
          </div>
          <div>
            {blogs?.latest_blogs?.results.length
              ? blogs?.latest_blogs?.results.map((items, index) => {
                  return (
                    <>
                      <TrendingBlogsCard
                        image={items.image}
                        id={items.id}
                        description={items.title}
                        time='5'
                        date={items.created_at}
                      />
                    </>
                  );
                })
              : "no data"}
          </div>
        </div>
        <div>
          <AddsBanner
            color='#F4F4F4'
            children={
              <>
                {blogBoxAdds.length > 0 && (
                  <div
                    className='banner-adds'
                    onClick={() => addEmail(blogBoxAdds[0]?.add_email)}
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
                              alt='Image'
                              className='ads_story_cover_img'
                            />
                          )
                        : blogBoxAdds[0]?.image && (
                            <img
                              src={blogBoxAdds[0]?.image}
                              alt='Image'
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
        <div className='grid-Latest-Blog'>
          <div className='blog-stories'>
            <div className='title'>
              <img src={fire} alt='fire' width={25} height={25} />
              <h4>Latest Blogs</h4>
            </div>
            <div className='card-gird'>
              {blogs?.latest_blogs?.results.length
                ? blogs?.latest_blogs?.results.map((items, index) => {
                    return (
                      <>
                        <LatestBlogCard
                          image={items.image}
                          hashtags={items.hash_tags}
                          title={items.title}
                          description={`${items.about_blog}`}
                          makeHtml={makeHtml}
                          key={index}
                          created_at={items.created_at}
                          reading_time={items.reading_time}
                          id={items.id}
                          blog_count={items.blog_count}
                        />
                      </>
                    );
                  })
                : "no data"}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0",
              }}
            >
              <button className='loadMore'>Explore More</button>
            </div>
            <div className='title'>
              <img src={fire} alt='fire' width={25} height={25} />
              <h4>Trending Blogs</h4>
            </div>
            {blogs?.trending_blogs?.results.length
              ? blogs?.trending_blogs?.results.map((items, index) => {
                  return (
                    <>
                      <TrendingBlogsCard2
                        image={items.image}
                        title={items.title}
                        id={items.id}
                        // description={items.about_blog}
                        time='5'
                        date={items.created_at}
                      />
                    </>
                  );
                })
              : "no data"}
          </div>
          <div className='ads'>
            <HashtagAndCatagories
              image={catagorie}
              title={"Categories"}
              hashtags={blogs?.blog_categories}
              rightOne={blogRight1}
              rightTwo={blogRight2}
            />
          </div>
        </div>
      </div>

      <Footer loginPage={false} />
    </div>
  );
}

export default BlogPage;
