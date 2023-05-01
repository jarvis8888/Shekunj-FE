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
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import { TrendingBlogsCard } from "../../components/cards/TrendingBlogsCard";
import httpServices from "../../utils/ApiServices";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import { apiConstants } from "../../utils/constants";
import catagorie from "../../assets/icons/svgs/categories.png";
import fire from "../../assets/icons/svgs/fire.png";

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
    try {
      const url = `more/blogs`;
      const res = await httpServices.get(url);
      setBlogCategories(res?.blog_categories);
      setTrending(res?.trending_blogs?.results);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
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
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_right1";
              });

              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_right2";
              });

              setSuccesStoriesRight2(filterArray3);
              // ("filterArray1blog_details",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_details";
            });
            setBlogDetailsBoxAds(filterArray1);
            // ("filterArray1coursebox",filterArray1)
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

      <div className='story-details-container'>
        <div className='story-image-container'>
          <img src={blogs?.image} alt='Story' className='img' />
          <div className='story-bottom'>
            <div className='hashtags-container'>
              <div>
                <span>
                  <img src={time} alt='time' width={14} height={14} />
                  {blogs?.created_at}
                </span>
                <span>
                  <img src={book} alt='time' width={14} height={14} />5 mins to
                  read
                </span>
              </div>
            </div>
            <div class='social-media'>
              <h6>Share this article</h6>
              <a href='#'>
                <i class='fa fa-facebook'>
                  <img src={facebook} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-twitter'>
                  {" "}
                  <img
                    src={linkedinlogo}
                    alt='twitter1'
                    width={34}
                    height={34}
                  />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={twitter1} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={instagram} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={youTube} alt='twitter1' width={34} height={34} />
                </i>
              </a>
            </div>
          </div>
          <h4>{blogs?.title}</h4>
          <div
            className='card__description'
            dangerouslySetInnerHTML={{
              __html: makeHtml(`${blogs?.about_blog}`),
            }}
          />
          <div>
            <div class='social-media'>
              <h6>Share this article</h6>
              <a href='#'>
                <i class='fa fa-facebook'>
                  <img src={facebook} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-twitter'>
                  {" "}
                  <img
                    src={linkedinlogo}
                    alt='twitter1'
                    width={34}
                    height={34}
                  />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={twitter1} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={instagram} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={youTube} alt='twitter1' width={34} height={34} />
                </i>
              </a>
            </div>
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
                          `${routingConstants.MORE_BLOG_TAG}?search=${items}`,
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
          <div className='title'>
            <img src={fire} alt='fire' height={35} />
            <h4>Trending Blogs</h4>
          </div>
          <div>
            {trending.map((items, index) => {
              return (
                <TrendingBlogsCard
                  image={items.image}
                  id={items.id}
                  title='Lorem ipsum dolor sit amet'
                  description='Lorem ipsum dolor sInteger nec lobortis nisi.'
                  time='5'
                  date='1 week ago'
                />
              );
            })}
          </div>
        </div>
        <div className='add-section-container'>
          <HashtagAndCatagories
            image={catagorie}
            title={`Categories`}
            addEmail={addEmail}
            hashtags={blogCategories}
            rightOne={succesStoriesRight1}
            rightTwo={succesStoriesRight2}
          />
        </div>
      </div>

      <Footer loginPage={false} />
    </div>
  );
};

export default BlogDetails;
