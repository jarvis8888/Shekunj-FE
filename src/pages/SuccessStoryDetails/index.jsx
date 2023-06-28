import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { successStoriesDetails as fetchSuccessStoriesDetails } from "../../store/courses/action";
import { useParams } from "react-router-dom";
import { Footer, Header, SEO, SocialShare } from "../../components";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TrendingCards from "../../components/cards/TrendingCards";
import fire from "../../assets/images/fire.svg";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/images/hashtag.svg";
import logo from "../../assets/images/logo.svg";
import { apiConstants, routingConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { addEmailToClient, makeHtmlWithStyles } from "../../utils/utils";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { useHistory } from "react-router-dom";
import { WhiteCircularBar } from "../../components/Loader/WhiteCircularBar";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

const SuccessStoryDetails = () => {
  const { successStoriesDetails } = useSelector((state) => {
    return state.coursesReducer;
  });
  const currentUrl = window.location.href;

  const dispatch = useDispatch();
  const trendingSectionRef = useRef(null);
  const history = useHistory();

  const { lan } = useSelector((state) => state.languageReducer);

  const { t } = useTranslation();

  const { id } = useParams();

  // const lastNumber = id.split("-").pop();

  const [trendingData, setTrendingData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [storyDetailsBoxAds, setStoryDetailsBoxAds] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingOffset, setTrendingOffset] = useState(0);
  const [currentTrendingData, setCurrentTrendingData] = useState([]);
  const detect = useDeviceDetect();
  const trendingPageLimit = 12;

  const getAllSuccessStoryData = async () => {
    setLoading(true);
    try {
      const url = `${apiConstants.COURSES.SUCCESS_STORY}`;
      const data = await httpServices.get(url);
      const { all_hash_tags } = data;
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
      const { trending_success_stories } = data;

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
    dispatch(fetchSuccessStoriesDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  useEffect(() => {
    getAllSuccessStoryTrendingData(trendingPageLimit, trendingOffset);
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
            // let filterArray1 = response.data.results.filter((item, index) => {
            //   return item.image_type == "success_stories_banner";
            // });
            // setStoriesBannerAds(filterArray1);
          }
        });
      },
    );
  }, [dispatch]);

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
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "success_stories_banner";
              });
              setStoriesBannerAds(filterArray1);
              let filterArray4 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_left";
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
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right1";
            });

            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right2";
            });

            setSuccesStoriesRight2(filterArray3);
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "success_stories_banner";
            });
            setStoriesBannerAds(filterArray1);
            let filterArray4 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_left";
            });

            setSuccesStoriesLeft(filterArray4);
          }
        });
      },
    );
  }, []);

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString.replace(/\\/g, "");
    // htmlNode.querySelectorAll("*").forEach(function (node) {
    //   node.removeAttribute("style");
    // });
    return htmlNode.innerHTML.replace(/\\/g, "");
  };

  useEffect(() => {
    getAllSuccessStoryData();
  }, [lan]);

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
  return (
    <>
      <SEO
        title={
          successStoriesDetails?.meta_title
            ? successStoriesDetails?.meta_title
            : successStoriesDetails?.title
        }
        description={successStoriesDetails?.meta_description}
        keywords={successStoriesDetails?.meta_keywords}
        image={successStoriesDetails?.image}
        currentUrl={currentUrl}
        link={
          successStoriesDetails?.canonical_tags
            ? successStoriesDetails?.canonical_tags
            : currentUrl
        }
      />
      <div>
        {loading ? (
          <CustomLoader />
        ) : (
          <section className='sk-storyDetail-sec'>
            <div className='container sk-custom-container'>
              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-8'>
                  <div className='sk-topBottom-space'>
                    <img
                      src={successStoriesDetails?.image}
                      alt={successStoriesDetails?.image_alt_tag}
                      className='sk-storyBanner-img'
                    />
                    <div className='story-bottom'>
                      <div className='hashtags-container'>
                        <div className='sk-storyD-tag'>
                          {successStoriesDetails?.hash_tags?.length
                            ? successStoriesDetails?.hash_tags.map(
                                (items, index) => {
                                  return (
                                    <span
                                      key={index}
                                      onClick={() =>
                                        history.push(
                                          `${routingConstants.SUCCESS_STORIES_HASHTAG}/${items?.slug}`,
                                          items,
                                        )
                                      }
                                    >{`#${items?.name}`}</span>
                                  );
                                },
                              )
                            : null}
                        </div>
                        <div className='sk-blokTVE-icon'>
                          <span>
                            <AccessTimeIcon />
                            {successStoriesDetails?.created_at}
                          </span>
                          {/* <span>
                          <MenuBookRoundedIcon />
                          {successStoriesDetails?.reading_time}
                        </span> */}
                          <span>
                            <VisibilityOutlinedIcon />{" "}
                            {successStoriesDetails?.ss_count}
                          </span>
                        </div>
                      </div>
                      <div className='sk-social-icon sk-mobile-view'>
                        <h6>Share this article</h6>
                        <SocialShare
                          currentUrl={currentUrl}
                          title={successStoriesDetails?.title}
                          image={successStoriesDetails?.image}
                        />
                      </div>
                    </div>
                    <div className='sk-middleContent-story'>
                      <h1 className='story-tittle'>
                        {successStoriesDetails?.name}{" "}
                        <span>{successStoriesDetails?.last_name}</span>
                      </h1>
                      <h2 className='story-sub-tittle'>
                        {successStoriesDetails &&
                          successStoriesDetails?.designation}
                        {successStoriesDetails &&
                          successStoriesDetails?.designation &&
                          successStoriesDetails?.company_name &&
                          ", "}
                        {successStoriesDetails &&
                          successStoriesDetails?.company_name}
                      </h2>
                      <h2 className='description'>
                        {successStoriesDetails?.title}
                      </h2>
                      <div
                        className='sk-successStoriesDetails'
                        dangerouslySetInnerHTML={{
                          __html: makeHtmlWithStyles(
                            `${successStoriesDetails?.description}`,
                          ),
                        }}
                      />
                      {/* Hides the backend <h1>  <h2/> for seo <element */}
                      <h1 style={{ display: "none" }}>
                        {successStoriesDetails?.h1_name}
                      </h1>
                      <h2 style={{ display: "none" }}>
                        {successStoriesDetails?.h2_heading}
                      </h2>
                      {/* Hides the backend <h1>  <h2/> for seo <element */}

                      <div className='my-4'>
                        <div className='sk-social-icon'>
                          <h6 className='text-left pb-0'>Share this article</h6>
                          <SocialShare
                            currentUrl={currentUrl}
                            title={successStoriesDetails?.title}
                            image={successStoriesDetails?.image}
                          />
                        </div>
                      </div>
                      <div className='sk-shekunj-about'>
                        <div className='row align-items-center'>
                          <div className='col-xl-3 col-lg-4 col-md-4'>
                            <div className='sk-aboutshekunj-img'>
                              <img src={logo} alt='logo' />
                            </div>
                          </div>
                          <div className='col-xl-9 col-lg-8 col-md-8'>
                            <div className='sk-shekunjAbout-content'>
                              <h5>About Shekunj</h5>
                              <p>
                                Shekunj promotes personal growth for women to
                                achieve their full potential and aims to empower
                                all the women out there - be they 16 or 60 years
                                old - through education and guidance. Reach us
                                at{" "}
                                <a
                                  href='mailto:info@shekunj.com'
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  info@shekunj.com
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <>
                        {storiesBannerAds.length > 0 && (
                          <div className='row'>
                            <div
                              className='col-xl-12'
                              // className='col-md-12 ads_home_cover '
                              onClick={() =>
                                addEmailToClient(storiesBannerAds[0]?.add_email)
                              }
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
                                            storiesBannerAds[0]?.image_mobile
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
                          </div>
                        )}
                      </>
                    </div>
                    <HashtagAndCatagoriesForMobile
                      type='hashtag'
                      image={hash}
                      title={`Trending Hashtag`}
                      hashtags={allHashTag}
                    />
                    <div className='title' ref={trendingSectionRef}>
                      <img src={fire} alt='fire' width={36} />
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
                    <div className='sk-blogbottom-border d-flex justify-content-center align-items-center py-4'>
                      <button
                        disabled={currentTrendingData?.results?.length === 0}
                        className='loadMore'
                        onClick={() => {
                          setTrendingOffset(trendingOffset + 6);
                          // trendingSectionRef.current.scrollIntoView({
                          //   behavior: "smooth",
                          // });
                        }}
                      >
                        {trendingLoading ? <WhiteCircularBar /> : `Load More`}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 sk-Removeside-space'>
                  <HashtagAndCatagories
                    type='hashtag'
                    image={hash}
                    title={`Trending Hashtag`}
                    firstAdd={succesStoriesRight1}
                    // addEmail={addEmail}
                    hashtags={allHashTag}
                    rightOne={succesStoriesRight1}
                    rightTwo={succesStoriesRight2}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default withHeaderFooter(SuccessStoryDetails);
