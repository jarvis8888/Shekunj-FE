import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { successStoriesDetails as fetchSuccessStoriesDetails } from "../../store/courses/action";
import { useParams } from "react-router-dom";
import { Footer, Header, SEO } from "../../components";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import TrendingCards from "../../components/cards/TrendingCards";
import fire from "../../assets/images/fire.svg";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/images/hashtag.svg";
import { apiConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { addEmailToClient } from "../../utils/utils";

const SuccessStoryDetails = () => {
  const { successStoriesDetails } = useSelector((state) => {
    return state.coursesReducer;
  });

  const dispatch = useDispatch();

  const { lan } = useSelector((state) => state.languageReducer);

  const { t } = useTranslation();

  const { id } = useParams();
  const [trendingData, setTrendingData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [storyDetailsBoxAds, setStoryDetailsBoxAds] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const detect = useDeviceDetect();

  const getAllSuccessStoryData = async () => {
    setLoading(true);
    try {
      const url = `${apiConstants.COURSES.SUCCESS_STORY}`;
      const data = await httpServices.get(url);
      const { trending_success_stories, all_hash_tags } = data;
      if (trending_success_stories?.length > 0) {
        const res = trending_success_stories ?? [];
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
    dispatch(fetchSuccessStoriesDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

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

  useEffect(() => {
    getAllSuccessStoryData();
  }, [lan]);

  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='story' subPage='moreStory' />
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='sk-storyDetail-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-9 col-md-8'>
                <img
                  src={successStoriesDetails?.image}
                  alt='Story'
                  className='sk-storyBanner-img'
                />
                <div className='story-bottom'>
                  <div className='hashtags-container'>
                    <div className='sk-storyD-tag'>
                      {successStoriesDetails?.hash_tags?.length
                        ? successStoriesDetails?.hash_tags.map((items) => {
                            return <span key={items}>{`#${items}`}</span>;
                          })
                        : null}
                    </div>
                    <div className='sk-blokTVE-icon'>
                      <span>
                        <AccessTimeIcon />
                        {successStoriesDetails?.created_at}
                      </span>
                      <span>
                        <MenuBookRoundedIcon />
                        {successStoriesDetails?.reading_time} to read
                      </span>
                    </div>
                  </div>
                  <div className='sk-social-icon sk-mobile-view'>
                    <h6>Share this article</h6>
                    <ul>
                      <li>
                        <a href='javascript:;'>
                          <img src={facebookicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={linkedinicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={twittericon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={pintresticon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={instagramicon} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='sk-middleContent-story'>
                  <h4 className='story-tittle'>
                    {successStoriesDetails?.name}
                  </h4>
                  <h5 className='story-sub-tittle'>
                    {successStoriesDetails?.designation}
                  </h5>
                  <h6 className='description'>
                    {successStoriesDetails?.title}
                  </h6>
                  <div
                    className=''
                    dangerouslySetInnerHTML={{
                      __html: makeHtml(`${successStoriesDetails?.description}`),
                    }}
                  />
                  <div className="my-4">
                  <div className='sk-social-icon'>
                    <h6 className="text-left pb-0">Share this article</h6>
                    <ul>
                      <li>
                        <a href='javascript:;'>
                          <img src={facebookicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={linkedinicon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={twittericon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={pintresticon} />
                        </a>
                      </li>
                      <li>
                        <a href='javascript:;'>
                          <img src={instagramicon} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  </div> 
                </div>
                  
                <div className='title'>
                  <img src={fire} alt='fire' width={28} />
                  <h4>Trending Stories </h4>
                </div>
                <div className='row'>
                  {trendingData?.map((items, index) => {
                    if (items.id === "advertisement") {
                      return (
                        <>
                          {storiesBannerAds.length > 0 && (
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
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <TrendingCards
                            image={items.image}
                            hashtags={
                              items.hash_tags === null ? [] : items.hash_tags
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
                {/* <TrendingStories /> */}
              </div>
              <div className='col-xl-3 col-md-4'>
                <HashtagAndCatagories
                  type='hashtag'
                  image={hash}
                  title={`Trending Hastag`}
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
      <Footer loginPage={false} />
    </div>
  );
};

export default SuccessStoryDetails;
