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
  }, [lan]);

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseSuccessStory(id, is_collapse ? false : true));
  };

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [storiesBoxAds, setStoriesBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "success_stories_banner";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setStoriesBannerAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>latest code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
            let findImage =
              filterArray.length > 0 ? filterArray[0].image : "NA";
            setImage(findImage);
            setStoriesBoxAds(filterArray);
            // let filterArray2 = response.data.results.filter((item, index) => {
            //   return item.image_type === "success_stories_right1";
            // });

            // setSuccesStoriesRight1(filterArray2);
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

  return (
    <div>
      <Header loginPage={true} page='story' />
      {/* success story section1 start */}
      <div className='Section1'>
        <div className='section1-item'>
          <div className='center'>
            <div
              className='title'
              dangerouslySetInnerHTML={{
                __html: makeHtml(t("phase2.SuccessStoryContent.title1")),
              }}
            />
            <div
              className='title'
              dangerouslySetInnerHTML={{
                __html: makeHtml(t("phase2.SuccessStoryContent.title2")),
              }}
            />
            <p>{t("phase2.SuccessStoryContent.description")}</p>
            <button className='.button'>
              {t("phase2.SuccessStoryContent.buttonTitle")}
            </button>
          </div>
        </div>
        <div className='section1-item'>
          <div className='BackgroundImage'></div>
        </div>
      </div>
      {/* success story section1 end */}
      {/* Adds Section start */}
      <AddsBanner
        color='#F4F4F4'
        children={
          <>
            {storiesBannerAds.length > 0 && (
              <div
                className='col-md-12 ads_home_cover'
                onClick={() => addEmail(storiesBannerAds[0]?.add_email)}
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
                          alt='Image'
                          className='ads_story_cover_img'
                        />
                      )
                    : storiesBannerAds[0]?.image && (
                        <img
                          src={storiesBannerAds[0]?.image}
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
      {/* Adds Section end */}
      {/* Featured Stories start */}
      <div className='grid-container'>
        <div className='featured-stories'>
          <div className='title'>
            <img src={fire} alt='fire' width={30} height={30} />
            <h4>Featured Stories </h4>
          </div>
          <div className='card-gird'>
            {successStories?.featured_success_stories?.results.length
              ? successStories?.featured_success_stories?.results.map(
                  (items, index) => {
                    return (
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
                    );
                  },
                )
              : null}
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
            <button className='loadMore'>Load More</button>
          </div>
          <div>
            <div>
              <div className='title'>
                <img src={fire} alt='fire' width={30} height={30} />
                <h4>Trending Stories </h4>
              </div>
              <div className='treading-card-gird'>
                {successStories?.trending_success_stories?.results.length
                  ? successStories?.trending_success_stories?.results.map(
                      (items, index) => {
                        console.log(items);
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
          </div>
          {/* <TrendingStories /> */}
        </div>
        <div className='ads'>
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
      {/* Featured Stories end  */}
      <Footer />
    </div>
  );
}

export default SuccessStory;
