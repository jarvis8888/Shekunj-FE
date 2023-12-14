import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Aos from "aos";
import "animate.css";
import "aos/dist/aos.css";
import {
  setCollapseSuccessStory,
  successStories as fetchSuccessStories,
} from "../../store/courses/action";
import { Header, Footer, SEO } from "../../components";
import "./index.scss";
import "../../Styles/global.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { adsList } from "../../store/ads";
import { apiConstants, routingConstants } from "../../utils/constants";
import AddsBanner from "../../components/AddsBanner/AddsBanner";
import fire from "../../assets/images/fire.svg";
import featurestory from "../../assets/images/featurestory.svg";

import FeaturedCards from "../../components/cards/FeaturedCards";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import TrendingCards from "../../components/cards/TrendingCards";
import hash from "../../assets/images/hashtag.svg";
import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import {
  addEmailToClient,
  addHyphensToLink,
  generateSlug,
  toasterConfig,
} from "../../utils/utils";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { WhiteCircularBar } from "../../components/Loader/WhiteCircularBar";
import { toast } from "react-toastify";

function SuccessStory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const trendingSectionRef = useRef(null);

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [trendingOffset, setTrendingOffset] = useState(0);
  const [page, setPage] = useState(0);
  const pageLimit = 6;
  const trendingPageLimit = 12;

  const [featuredData, setFeaturedData] = useState([]);
  const [currentFeaturedData, setCurrentFeaturedData] = useState([]);
  const [currentTrendingData, setCurrentTrendingData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [animationTrendingData, setAnimationTrendingData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationData, setAnimationData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);
  const [succesStoriesBox, setSuccesStoriesBox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const detect = useDeviceDetect();
  // const handleOpen = () => setOpen(true);
  // const redirect = query.get("redirect");
  const getAllSuccessStoryData = async (limit, offset) => {
    setLoading(true);
    try {
      const url = `${apiConstants.COURSES.SUCCESS_STORY}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { featured_success_stories, all_hash_tags } = data;
      if (featured_success_stories?.results?.length > 0) {
        const res = featured_success_stories?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);

          if ((i + 1) % 2 === 0 && i !== res.length - 1) {
            newFeaturedData.push(addObjectData);
          }
        }

        setFeaturedData((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentFeaturedData(featured_success_stories);
      }
      setAllHashTag(all_hash_tags);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getAllSuccessStoryTrendingData = async (limit, offset) => {
    setTrendingLoading(true);
    try {
      const url = `${apiConstants.COURSES.TRENDING_SUCCESS_STORY}?limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { trending_success_stories, banner_featured_ss } = data;
      setAnimationTrendingData(banner_featured_ss);
      if (trending_success_stories?.results?.length > 0) {
        const res = trending_success_stories?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          if (i % 6 === 0 && i !== 0) {
            newFeaturedData.push(addObjectData);
          }
          newFeaturedData.push(res[i]);
        }
        newFeaturedData.push(addObjectData);

        setTrendingData((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentTrendingData(trending_success_stories);
      }
    } catch (error) {
    } finally {
      setTrendingLoading(false);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllSuccessStoryData(pageLimit, offset);
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
        await getAllSuccessStoryTrendingData(trendingPageLimit, trendingOffset);
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
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "success_stories_banner",
                  )
                );
              });
              setStoriesBannerAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "success_stories_right1",
                  )
                );
              });

              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "success_stories_right2",
                  )
                );
              });

              setSuccesStoriesRight2(filterArray3);
              let filterArray4 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "success_stories_left",
                  )
                );
              });

              setSuccesStoriesLeft(filterArray4);
              let filterArray5 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "success_stories_box",
                  )
                );
              });

              setSuccesStoriesBox(filterArray5);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "success_stories_banner",
                )
              );
            });
            setStoriesBannerAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "success_stories_right1",
                )
              );
            });

            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "success_stories_right2",
                )
              );
            });

            setSuccesStoriesRight2(filterArray3);
            let filterArray4 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "success_stories_left",
                )
              );
            });

            setSuccesStoriesLeft(filterArray4);
            let filterArray5 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "success_stories_box",
                )
              );
            });

            setSuccesStoriesBox(filterArray5);
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

  const succesStoriesLeftadCount = succesStoriesLeft.length; // Total number of ads
  let adIndex = 0; // Current ad index

  const getNextAdIndexSuccesStoriesLeft = () => {
    // Increment the index and reset if it exceeds the total count
    adIndex = (adIndex + 1) % succesStoriesLeftadCount;
    return adIndex;
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

  const succesStoriesLeftRenderAds = () => {
    const adIndex = getNextAdIndexSuccesStoriesLeft();
    const ad = succesStoriesLeft[adIndex];

    return renderAd(ad);
  };

  const succesStoriesBoxadCount = succesStoriesBox.length; // Total number of ads
  let BoxadIndex = 0; // Current ad index

  const getNextAdIndexSuccesStoriesBox = () => {
    // Increment the index and reset if it exceeds the total count
    BoxadIndex = (BoxadIndex + 1) % succesStoriesBoxadCount;
    return BoxadIndex;
  };

  const renderBoxAd = (ad) => (
    <div
      key={ad.id}
      onClick={() => addEmailToClient(ad.add_email)}
      className='col-xl-6 col-lg-6 col-md-6 col-sm-12'
    >
      <div className='sk-cardAdd-fix'>
        <span className='sk-ad-title'>Advertisement</span>
        <a
          href={ad.url_adds}
          target='_blank'
          rel='noreferrer'
          className='mx-auto'
        >
          {detect.isMobile
            ? ad.image_mobile && <img src={ad.image_mobile} alt='' />
            : ad.image && <img src={ad.image} alt='' />}
        </a>
      </div>
    </div>
  );

  const succesStoriesBoxRenderAds = () => {
    const BoxadIndex = getNextAdIndexSuccesStoriesBox();
    const ad = succesStoriesBox[BoxadIndex];

    return renderBoxAd(ad);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % animationTrendingData.length,
      );
    }, 5000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [animationTrendingData.length]);

  useEffect(() => {
    // Update the animation data when the currentIndex changes
    let endIndex; // Declare the variable outside of the if-else blocks

    if (detect.isMobile) {
      endIndex = (currentIndex + 6) % animationTrendingData.length;
    } else {
      endIndex = (currentIndex + 8) % animationTrendingData.length;
    }

    // Declare a variable to store the updated animation data
    // Check if the range falls within a single continuous section of the array
    const updatedData =
      currentIndex <= endIndex
        ? animationTrendingData.slice(currentIndex, endIndex)
        : [
            ...animationTrendingData.slice(currentIndex),
            ...animationTrendingData.slice(0, endIndex),
          ];
    // Set the updated animation data using setAnimationData
    setAnimationData(updatedData);
  }, [currentIndex, animationTrendingData]);

  const handleLoadMoreClick = () => {
    if (currentFeaturedData?.results?.length === 0) {
      toast.warn("No more data available.", toasterConfig);
      return; // Prevent further action
    }
    setOffset(offset + 6);
  };
  const handleLoadMoreClickOnTrending = () => {
    if (currentTrendingData?.results?.length === 0) {
      return; // Do not scroll if button is disabled
    }

    setTrendingOffset(trendingOffset + 12);
  };
  const currentUrl = window.location.href;
  return (
    <>
      <SEO
        title='Sheकुंज - Success Stories'
        description='Shekunj.com works on women empowerment and skill development by providing free training, job-oriented courses, jobs & internships and career counseling'
        keywords='women empowerment organizations women empowerment initiative free online courses free career guidance'
        link={currentUrl}
        currentUrl={currentUrl}
      />
      <div>
        <Header loginPage={true} page='story' newDesign />

        {pageLoading ? (
          <div>
            <CustomLoader />
          </div>
        ) : (
          <>
            <section className='sk-storyMain-sec'>
              <div className='container sk-custom-container'>
                <div className='row align-items-center'>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                    <div className='sk-story-content'>
                      <h1
                        className='sk-storyHeading-top'
                        dangerouslySetInnerHTML={{
                          __html: makeHtml(
                            t("phase2.SuccessStoryContent.title1"),
                          ),
                        }}
                      />
                      {/* <h1
                        className='sk-storyHeading-top'
                        dangerouslySetInnerHTML={{
                          __html: makeHtml(
                            t("phase2.SuccessStoryContent.title2"),
                          ),
                        }}
                      /> */}
                      <p>{t("phase2.SuccessStoryContent.description")}</p>
                      <div className='my-3'>
                        <button
                          className='sk-allStory-btn'
                          onClick={() =>
                            history.push(
                              `${routingConstants.ALL_SUCCESS_STORIES}all`,
                            )
                          }
                        >
                          {t("phase2.SuccessStoryContent.buttonTitle")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                    <div className='sk-storyS-images'>
                      <ul>
                        {animationData?.map((items, index) => {
                          return (
                            <>
                              <li
                                className='sk-scale-animate'
                                key={index}
                                onClick={() => {
                                  const hashtagNames = items?.hash_tags.map(
                                    (tag) => tag?.slug,
                                  );
                                  const generatedSlug =
                                    generateSlug(hashtagNames[0]) ||
                                    "no-hashtag";
                                  if (items.slug) {
                                    history.push(
                                      routingConstants.SUCCESS_STORIES +
                                        generatedSlug +
                                        "/" +
                                        items.slug,
                                    );
                                  } else {
                                    // Handle the case when 'slug' is empty
                                    // console.log("Slug is empty. Cannot navigate.");
                                  }
                                }}
                              >
                                <div className='sk-story-eimg'>
                                  <img src={items.image} alt='' />
                                  <span></span>
                                </div>
                                <div className='sk-story-econtent'>
                                  <div className='sk-ewoman-title'>
                                    <p>{`${items.name} ${items.last_name}`}</p>
                                    <h6>{items.designation}</h6>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='sk-successStories-sec sk-addBg-color'>
              <div className='container sk-custom-container'>
                <div className='row'>
                  <div className='col-xl-12 col-lg-12 col-md-12'>
                    <AddsBanner
                      color='#F4F4F4'
                      children={
                        <>
                          {storiesBannerAds.length > 0 && (
                            <div
                              className='ads_home_cover '
                              onClick={() =>
                                addEmailToClient(storiesBannerAds[0]?.add_email)
                              }
                            >
                              <div className='sk-add-title'>
                                <h6>Advertisement</h6>
                              </div>

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

            <section className='sk-storyBoxMain-sec'>
              <div className='container sk-custom-container'>
                <div className='row'>
                  <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 featured-stories'>
                    <div className='sk-topBottom-space'>
                      <div className='title'>
                        <div>
                          <img
                            src={featurestory}
                            alt='featurestory'
                            width={36}
                          />
                        </div>
                        <div className='sk-heading-story'>
                          <h2>Featured Stories </h2>
                          <h3>
                            Recommended stories, articles and interviews on
                            SheKunj
                          </h3>
                        </div>
                      </div>

                      <div className='row'>
                        {featuredData?.map((items, index) => {
                          if (items.id === "advertisement") {
                            return (
                              <>
                                {succesStoriesBox.length > 0 &&
                                  succesStoriesBoxRenderAds()}
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                                  <FeaturedCards
                                    image={items.image}
                                    hashtags={
                                      items.hash_tags === null
                                        ? []
                                        : items.hash_tags
                                    }
                                    title={`${items.name} ${items.last_name}`}
                                    description={`${items.title}`}
                                    key={index}
                                    created_at={items.created_at}
                                    reading_time={items.reading_time}
                                    id={items.id}
                                    slug={items.slug}
                                    ss_count={items.ss_count}
                                  />
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <div className='sk-blogbottom-border d-flex justify-content-center align-items-center py-4'>
                        <button
                          disabled={currentFeaturedData?.results?.length === 0}
                          className='loadMore'
                          onClick={handleLoadMoreClick}
                        >
                          {loading ? <WhiteCircularBar /> : `Load More`}
                        </button>
                      </div>

                      <HashtagAndCatagoriesForMobile
                        type='hashtag'
                        image={hash}
                        title={`Trending Hashtag`}
                        hashtags={allHashTag}
                      />

                      <div>
                        <div className='title'>
                          <div>
                            <img src={fire} alt='fire' width={36} />
                          </div>
                          <div className='sk-heading-story'>
                            <h2>Trending Stories </h2>
                            <h3>
                              Read the most popular success stories on SheKunj
                            </h3>
                          </div>
                        </div>

                        <div className='row'>
                          {trendingData?.map((items, index) => {
                            if (items.id === "advertisement") {
                              return (
                                <>
                                  {succesStoriesLeft.length > 0 &&
                                    succesStoriesLeftRenderAds()}
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
                                    title={`${items.name} ${items.last_name}`}
                                    description={`${items.title}`}
                                    key={index}
                                    created_at={items.created_at}
                                    id={items.id}
                                    slug={items.slug}
                                    ss_count={items.ss_count}
                                  />
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                      <div className='sk-blogbottom-border d-flex justify-content-center align-items-center py-4'>
                        <button
                          disabled={currentTrendingData?.results?.length === 0}
                          className='loadMore'
                          onClick={handleLoadMoreClickOnTrending}
                        >
                          {trendingLoading ? <WhiteCircularBar /> : `Load More`}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 ads sk-Removeside-space'>
                    <HashtagAndCatagories
                      type='hashtag'
                      image={hash}
                      title={`Trending Hashtag`}
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

        <Footer newDesign />
      </div>
    </>
  );
}

export default SuccessStory;
