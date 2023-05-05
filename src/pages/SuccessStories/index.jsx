import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import {
  setCollapseSuccessStory,
  successStories as fetchSuccessStories,
} from "../../store/courses/action";
import { Header, Footer } from "../../components";
import down1 from "../../assets/icons/down1.png";
import up from "../../assets/icons/up.png";
import double_quote from "../../assets/icons/double_quote.png";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import "../../Styles/global.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";
import { Helmet } from "react-helmet-async";
import { routingConstants } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import AddsBanner from "../../components/AddsBanner/AddsBanner";

import fire from "../../assets/icons/svgs/fire.png";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { TrendingStories } from "./TrendingStories";
import YouMayLikeCarousel from "../../components/Carousel/YouMayLikeCarousel";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import TrendingCards from "../../components/cards/TrendingCards";
import hash from "../../assets/icons/svgs/hashtag.png";

function SuccessStory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { successStories } = useSelector((state) => {
    return state.coursesReducer;
  });
  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const pageLimit = 5;
  const [searchValue, setSearchValue] = useState("");

  React.useEffect(() => {
    dispatch(fetchSuccessStories(pageLimit, offset, page));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [lan, offset]);

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseSuccessStory(id, is_collapse ? false : true));
  };

  const [featuredData, setFeaturedData] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);
  const [storiesBoxAds, setStoriesBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

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
                return item.image_type == "success_stories_banner";
              });
              setStoriesBannerAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_right1";
              });

              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_right2";
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
              return item.image_type == "success_stories_banner";
            });
            setStoriesBannerAds(filterArray1);
          }
        });
      },
    );
  }, []);

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
        });
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
          if (response.data.results.length > 0) {
            let filterArray = response.data.results.filter((item, index) => {
              return item.image_type == "success_stories_box";
            });
            setStoriesBoxAds(filterArray);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_left";
            });

            setSuccesStoriesLeft(filterArray2);
            // let filterArray3 = response.data.results.filter((item, index) => {
            //   return item.image_type === "success_stories_right2";
            // });

            // setSuccesStoriesRight2(filterArray3);
          }
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
    dispatch(adsList());
  }, [dispatch]);

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };
  const paginationBack = () => {
    dispatch(fetchSuccessStories(pageLimit, offset, page - 1));
    setOffset(offset - pageLimit);
    setPage(page - 1);
    window.scrollTo(0, 1000);
  };
  const paginationNext = () => {
    dispatch(fetchSuccessStories(pageLimit, offset, page + 1));
    setOffset(offset + pageLimit);
    setPage(page + 1);
    window.scrollTo(0, 1000);
  };

  const addAddsFunction = () => {
    const num = Math.floor(Math.random() * 4);
    const res = successStories?.featured_success_stories?.results ?? [];
    const addObjectdata = { id: "advertisement" };
    const newData = [...res.slice(0, num), addObjectdata, ...res.slice(num)];
    setFeaturedData(newData);
  };

  useEffect(() => {
    addAddsFunction();
  }, [successStories]);
  return (
    <div>
      <Header loginPage={true} page='story' />
      {/* success story section1 start */}
      <section className='sk-storyMain-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-md-12'>
              <div className='sk-story-content'>
                <h1
                  className='sk-storyHeading-top'
                  dangerouslySetInnerHTML={{
                    __html: makeHtml(t("phase2.SuccessStoryContent.title1")),
                  }}
                />
                <h1
                  className='sk-storyHeading-top'
                  dangerouslySetInnerHTML={{
                    __html: makeHtml(t("phase2.SuccessStoryContent.title2")),
                  }}
                />
                <p>{t("phase2.SuccessStoryContent.description")}</p>
              </div>
              <button className='sk-allStory-btn'>
                {t("phase2.SuccessStoryContent.buttonTitle")}
              </button>
            </div>
        </div>
        </div>
      </section>

      {/* success story section1 end */}
      {/* Adds Section start */}
      <section className='sk-successStories-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <AddsBanner
                color='#F4F4F4'
                children={
                  <>
                    {storiesBannerAds.length > 0 && (
                      <div
                        className='ads_home_cover '
                        // onClick={() => addEmail(storiesBannerAds[0]?.add_email)}
                      >
                        <a
                          href={storiesBannerAds[0]?.url_adds}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {detect.isMobile
                            ? storiesBannerAds[0]?.image_mobile && (
                                <img
                                  src={storiesBannerAds[0]?.image_mobile}
                                  alt=''
                                  className='ads_story_cover_img'
                                />
                              )
                            : storiesBannerAds[0]?.image && (
                                <img
                                  src={storiesBannerAds[0]?.image}
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
      {/* Adds Section end */}
      {/* Featured Stories start */}
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-9 col-md-8 featured-stories'>
              <div className='title'>
                <img src={fire} alt='fire' width={30} height={30} />
                <h4>Featured Stories </h4>
              </div>
              <div className='row'>
                {featuredData?.map((items, index) => {
                  if (items.id === "advertisement") {
                    return (
                      <>
                        {succesStoriesLeft.length > 0 && (
                          <div
                          // className='col-md-12 ads_home_cover '
                          // onClick={() => addEmail(succesStoriesLeft[0]?.add_email)}
                          >
                            <a
                              href={succesStoriesLeft[0]?.url_adds}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {detect.isMobile
                                ? succesStoriesLeft[0]?.image_mobile && (
                                    <img
                                      src={succesStoriesLeft[0]?.image_mobile}
                                      alt=''
                                      // className='ads_story_cover_img'
                                    />
                                  )
                                : succesStoriesLeft[0]?.image && (
                                    <img
                                      src={succesStoriesLeft[0]?.image}
                                      alt=''
                                      // className='ads_story_cover_img'
                                    />
                                  )}
                            </a>
                          </div>
                        )}
                      </>
                    );
                  } else {
                    return (
                      <>
                        <FeaturedCards
                          image={items.image}
                          hashtags={items.hash_tags}
                          title={items.name}
                          description={`${items.title}`}
                          makeHtml={makeHtml}
                          key={index}
                          created_at={items.created_at}
                          reading_time={items.reading_time}
                          id={items.id}
                        />
                      </>
                    );
                  }
                })}
              </div>
              <div className='d-flex justify-content-center align-items-center py-5'>
                <button
                  className='loadMore'
                  onClick={() => setOffset(offset + 5)}
                >
                  Load More
                </button>
              </div>

              <div>
                <div className='title'>
                  <img src={fire} alt='fire' width={30} height={30} />
                  <h4>Trending Stories </h4>
                </div>
                <div className='row'>
                  {successStories?.trending_success_stories?.results.length
                    ? successStories?.trending_success_stories?.results.map(
                        (items, index) => {
                          return (
                            <>
                              <TrendingCards
                                image={items.image}
                                hashtags={items.hash_tags}
                                title={items.name}
                                description={`${items.title}`}
                                makeHtml={makeHtml}
                                key={index}
                                created_at={items.created_at}
                                id={items.id}
                              />
                            </>
                          );
                        },
                      )
                    : null}
                </div>
              </div>

              {/* <TrendingStories /> */}
            </div>
            <div className='col-xl-3 col-md-4 ads'>
              <HashtagAndCatagories
                type='hashtag'
                image={hash}
                title={`Trending Hastag`}
                addEmail={addEmail}
                hashtags={successStories?.all_hash_tags}
                rightOne={succesStoriesRight1}
                rightTwo={succesStoriesRight2}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Featured Stories end  */}
      <Footer />
    </div>
  );
}

export default SuccessStory;
