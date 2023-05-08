import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import {
  setCollapseSuccessStory,
  successStories as fetchSuccessStories,
} from "../../store/courses/action";
import { Header, Footer } from "../../components";

import "./index.scss";
import "../../Styles/global.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";

import { apiConstants, routingConstants } from "../../utils/constants";

import AddsBanner from "../../components/AddsBanner/AddsBanner";

import fire from "../../assets/icons/svgs/fire.png";
import FeaturedCards from "../../components/cards/FeaturedCards";

import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import TrendingCards from "../../components/cards/TrendingCards";
import hash from "../../assets/icons/svgs/hashtag.png";

import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";

function SuccessStory() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const pageLimit = 5;

  const [featuredData, setFeaturedData] = useState([]);
  const [currentFeaturedData, setCurrentFeaturedData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);
  const [loading, setLoading] = useState(false);
  const detect = useDeviceDetect();

  const getAllSuccessStoryData = async (limit, offset) => {
    setLoading(true);
    try {
      const url = `${apiConstants.COURSES.SUCCESS_STORY}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const {
        featured_success_stories,
        trending_success_stories,
        all_hash_tags,
      } = data;
      if (featured_success_stories?.results?.length > 0) {
        const num = Math.floor(Math.random() * 4);
        const res = featured_success_stories?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [
          ...res.slice(0, num),
          addObjectData,
          ...res.slice(num),
        ];
        setFeaturedData((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentFeaturedData(featured_success_stories);
      }
      if (trending_success_stories?.results?.length > 0) {
        const res = trending_success_stories?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          if (i % 3 === 0 && i !== 0) {
            newFeaturedData.push(addObjectData);
          }
          newFeaturedData.push(res[i]);
        }
        setTrendingData(newFeaturedData);
      }

      setAllHashTag(all_hash_tags);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSuccessStoryData(pageLimit, offset);
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
              let filterArray4 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_box";
              });

              setSuccesStoriesLeft(filterArray4);
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
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right1";
            });

            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right2";
            });

            setSuccesStoriesRight2(filterArray3);
            let filterArray4 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_box";
            });

            setSuccesStoriesLeft(filterArray4);
          }
        });
      },
    );
  }, []);

  // const addEmail = (email) => {
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .post("/private_adds/click_add/", {
  //         // add_email:`${adds[0]?.add_email}`
  //         add_email: email,
  //         latitude: params.latitude.toString(),
  //         longitude: params.longitude.toString(),
  //       })
  //       .then((response) => {
  //         // setAdds(response.data.results);
  //         console.log("addEmailresponse", response);
  //       });
  //   });
  // };

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

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseSuccessStory(id, is_collapse ? false : true));
  };

  return (
    <div>
      <Header loginPage={true} page='story' />
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <>
          <section className='sk-storyMain-sec'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-md-12'>
                  <div className='sk-story-content'>
                    <h1
                      className='sk-storyHeading-top'
                      dangerouslySetInnerHTML={{
                        __html: makeHtml(
                          t("phase2.SuccessStoryContent.title1"),
                        ),
                      }}
                    />
                    <h1
                      className='sk-storyHeading-top'
                      dangerouslySetInnerHTML={{
                        __html: makeHtml(
                          t("phase2.SuccessStoryContent.title2"),
                        ),
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
                                className='col-md-6'
                                // className='col-md-12 ads_home_cover '
                                // onClick={() => addEmail(succesStoriesLeft[0]?.add_email)}
                              >
                                <div className='card'>
                                  <a
                                    href={succesStoriesLeft[0]?.url_adds}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {detect.isMobile
                                      ? succesStoriesLeft[0]?.image_mobile && (
                                          <img
                                            src={
                                              succesStoriesLeft[0]?.image_mobile
                                            }
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
                              </div>
                            )}
                          </>
                        );
                      } else {
                        return (
                          <>
                            <FeaturedCards
                              image={items.image}
                              hashtags={
                                items.hash_tags === null ? [] : items.hash_tags
                              }
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
                  <div className='d-flex justify-content-center align-items-center py-4'>
                    <button
                      disabled={currentFeaturedData?.results?.length === 0}
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
                      {trendingData?.map((items, index) => {
                        if (items.id === "advertisement") {
                          return (
                            <>
                              {storiesBannerAds.length > 0 && (
                                <div
                                  className='col-md-6'
                                  // className='col-md-12 ads_home_cover '
                                  // onClick={() => addEmail(storiesBannerAds[0]?.add_email)}
                                >
                                  <div className='card'>
                                    <a
                                      href={storiesBannerAds[0]?.url_adds}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {detect.isMobile
                                        ? storiesBannerAds[0]?.image_mobile && (
                                            <img
                                              src={
                                                storiesBannerAds[0]
                                                  ?.image_mobile
                                              }
                                              alt=''
                                              // className='ads_story_cover_img'
                                            />
                                          )
                                        : storiesBannerAds[0]?.image && (
                                            <img
                                              src={storiesBannerAds[0]?.image}
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
                              <TrendingCards
                                image={items.image}
                                hashtags={
                                  items.hash_tags === null
                                    ? []
                                    : items.hash_tags
                                }
                                title={items.name}
                                description={`${items.title}`}
                                makeHtml={makeHtml}
                                key={index}
                                created_at={items.created_at}
                                id={items.id}
                              />
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <div className='col-xl-3 col-md-4 ads'>
                  <HashtagAndCatagories
                    type='hashtag'
                    image={hash}
                    title={`Trending Hastag`}
                    // addEmail={addEmail}
                    hashtags={allHashTag}
                    rightOne={succesStoriesRight1}
                    rightTwo={succesStoriesRight2}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

export default SuccessStory;
