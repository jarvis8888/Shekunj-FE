import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./index.scss";
import httpServices from "../../utils/ApiServices";
import { useHistory, useLocation } from "react-router-dom";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/images/hashtag.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { addEmailToClient } from "../../utils/utils";

const SuccessStroyWithHashtag = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { state } = location;

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [succesStoriesLeft, setSuccesStoriesLeft] = useState([]);

  const getSuccessStroyWithHashtagData = async (search) => {
    setLoading(true);
    try {
      const url = `course/success-story?search=${search}`;
      const data = await httpServices.get(url);
      const { filtered_data, all_hash_tags } = data;
      if (filtered_data?.length > 0) {
        const num = Math.floor(Math.random() * 4);
        const res = filtered_data ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [
          ...res.slice(0, num),
          addObjectData,
          ...res.slice(num),
        ];
        setData(newFeaturedData);
      } else {
        setData([]);
      }
      setAllHashTag(all_hash_tags);
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
    if (state) {
      getSuccessStroyWithHashtagData(state);
    }
  }, [state]);

  return (
    <div>
      <Header />
      <section className='sk-hashtag-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-9 col-md-8'>
              <h4 className='Hashtag_container_title'>
                {state ? `#${state}` : "NA"}
              </h4>

              {loading ? (
                <div>
                  <CustomLoader />
                </div>
              ) : (
                <div className='row'>
                  {data?.map((items, index) => {
                    if (items.id === "advertisement") {
                      const randomIndex = Math.floor(
                        Math.random() * succesStoriesLeft.length,
                      );
                      return (
                        <>
                          {succesStoriesLeft.length > 0 && (
                            <div
                              className='col-md-6'
                              // className='col-md-12 ads_home_cover '
                              onClick={() =>
                                addEmailToClient(
                                  succesStoriesLeft[randomIndex]?.add_email,
                                )
                              }
                            >
                              <div className='sk-cardAdd-fix'>
                                <a
                                  href={
                                    succesStoriesLeft[randomIndex]?.url_adds
                                  }
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {detect.isMobile
                                    ? succesStoriesLeft[randomIndex]
                                        ?.image_mobile && (
                                        <img
                                          src={
                                            succesStoriesLeft[randomIndex]
                                              ?.image_mobile
                                          }
                                          alt=''
                                          // className='ads_story_cover_img'
                                        />
                                      )
                                    : succesStoriesLeft[randomIndex]?.image && (
                                        <img
                                          src={
                                            succesStoriesLeft[randomIndex]
                                              ?.image
                                          }
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
              )}
            </div>
            <div className='col-xl-3 col-md-4'>
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
      <Footer />
    </div>
  );
};
export default SuccessStroyWithHashtag;
