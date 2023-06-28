import React, { useEffect, useState, useRef } from "react";
import { Footer, Header, SEO } from "../../components";
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
  const [selectedTag, setSelectedTag] = useState("");
  const [offset, setOffset] = useState(0);
  const pageLimit = 4;
  const searchRef = useRef("");

  const getSuccessStroyWithHashtagData = async (limit, offset, search) => {
    setLoading(true);
    try {
      const url = `course/success-story?limit=${limit}&offset=${offset}&search=${search}`;
      const data = await httpServices.get(url);
      const { filtered_data, all_hash_tags, selected_tag } = data;
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
        if (search !== searchRef.current) {
          setData(newFeaturedData); // Set new data directly
        } else {
          setData((prevData) => [...prevData, ...newFeaturedData]); // Append new data
        }
      } else {
        setCurrentFeaturedData(filtered_data);
      }
      setAllHashTag(all_hash_tags);
      setSelectedTag(selected_tag);

      setLoading(false);
    } catch {
      setLoading(false);
    }
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
    if (search && search !== searchRef.current) {
      setData([]); // Clear existing data
      setCurrentFeaturedData(null); // Clear existing featured data
      setOffset(0); // Reset the offset to 0
      searchRef.current = search; // Update the searchRef
      getSuccessStroyWithHashtagData(pageLimit, 0, search);
    } else if (search && search === searchRef.current && offset > 0) {
      getSuccessStroyWithHashtagData(pageLimit, offset, search);
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
    setOffset(offset + 4);
  };
  const currentUrl = window.location.href;
  return (
    <>
      <SEO
        title={`Sheकुंज - ${search}`}
        currentUrl={currentUrl}
        link={currentUrl}
      />
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
                  <div className='sk-hashtagBorder-tilte'>
                    <h1 className='Hashtag_container_title'>
                      {selectedTag ? `#${selectedTag}` : "NA"}
                    </h1>
                    {/* <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal.
                  </p> */}
                  </div>

                  <div className='row'>
                    {data?.length
                      ? data?.map((items, index) => {
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
                        })
                      : null}
                  </div>
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
    </>
  );
};
export default withHeaderFooter(SuccessStroyWithHashtag);
