import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./index.scss";
import httpServices from "../../utils/ApiServices";
import { useHistory, useLocation, useParams } from "react-router-dom";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/images/hashtag.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { addEmailToClient } from "../../utils/utils";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { WhiteCircularBar } from "../../components/Loader/WhiteCircularBar";

const SuccessStroyWithHashtag = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { state } = location;
  const { search } = useParams();

  const { lan } = useSelector((state) => state.languageReducer);

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);
  const [currentFeaturedData, setCurrentFeaturedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [offset, setOffset] = useState(0);
  const pageLimit = 4;

  const getSuccessStroyWithHashtagData = async (limit, offset, search) => {
    setLoading(true);
    try {
      const url = `course/success-story?limit=${limit}&offset=${offset}&search=${search}`;
      const data = await httpServices.get(url);
      const { filtered_data, all_hash_tags } = data;
      if (filtered_data?.results?.length > 0) {
        const res = filtered_data?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          if (i % 2 === 0 && i !== 0) {
            newFeaturedData.push(addObjectData);
          }
          newFeaturedData.push(res[i]);
        }
        if (res.length % 2 === 0) {
          newFeaturedData.push(addObjectData);
        }
        setData((prevFeaturedData) => [
          ...prevFeaturedData,
          ...newFeaturedData,
        ]);
      } else {
        setCurrentFeaturedData(filtered_data);
      }
      setAllHashTag(all_hash_tags);
      setSearchTerm(search);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

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

  useEffect(() => {
    if (search) {
      if (search === searchTerm) {
        getSuccessStroyWithHashtagData(pageLimit, offset, search);
      } else {
        setData([]); // Clear existing data
        setCurrentFeaturedData(null); // Clear existing featured data
        getSuccessStroyWithHashtagData(pageLimit, 0, search);
      }
    }
  }, [search, offset, lan]);

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
      className='col-xl-6 col-lg-6 col-md-12 col-sm-12'
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

  const succesStoriesLeftRenderAds = () => {
    const adIndex = getNextAdIndexSuccesStoriesLeft();
    const ad = succesStoriesLeft[adIndex];

    return renderAd(ad);
  };

  const handleLoadMoreClick = () => {
    if (currentFeaturedData?.results?.length === 0) {
      return;
    }
    setOffset(offset + 6);
  };

  return (
    <div>
      <section className='sk-hashtag-sec'>
        <div className='container sk-custom-container'>
          <HashtagAndCatagoriesForMobile
            type='hashtag'
            image={hash}
            title={`Trending Hashtag`}
            hashtags={allHashTag}
          />
          <div className='row'>
            <div className='col-xl-8 col-lg-8 col-md-8'>
              <div className='sk-topBottom-space'>
                <h4 className='Hashtag_container_title'>
                  {search
                    ? `#${search.charAt(0).toUpperCase()}${search.slice(1)}`
                    : "NA"}
                </h4>

                {
                  <div className='row'>
                    {data?.length ? (
                      data?.map((items, index) => {
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
                              <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                <FeaturedCards
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
                                  reading_time={items.reading_time}
                                  id={items.id}
                                  slug={items.slug}
                                  ss_count={items.ss_count}
                                />
                              </div>
                            </>
                          );
                        }
                      })
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                }
              </div>
              <div className='sk-blogbottom-border d-flex justify-content-center align-items-center '>
                <button
                  disabled={currentFeaturedData?.results?.length === 0}
                  className='loadMore'
                  onClick={handleLoadMoreClick}
                >
                  {loading ? <WhiteCircularBar /> : `Load More`}
                </button>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-4 sk-Removeside-space'>
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
    </div>
  );
};
export default withHeaderFooter(SuccessStroyWithHashtag);
