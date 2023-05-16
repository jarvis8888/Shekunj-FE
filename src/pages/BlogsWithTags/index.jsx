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
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import catagorie from "../../assets/images/categoryblog.svg";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { routingConstants } from "../../utils/constants";
import { DateFormat, addEmailToClient } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const SuccessStroyWithHashtag = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const detect = useDeviceDetect();

  const { state } = location;

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") || "";

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [blogDetailsBoxAds, setBlogDetailsBoxAds] = useState([]);

  const getBlogWithHashtagData = async (search) => {
    setLoading(true);
    try {
      const url = `more/blogs?search=${search}`;
      const data = await httpServices.get(url);
      const { filtered_blogs, blog_categories } = data;
      if (filtered_blogs?.length > 0) {
        const res = filtered_blogs ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);
          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }
        setData(newFeaturedData);
      } else {
        setData([]);
      }
      setAllHashTag(blog_categories);
    } catch (error) {
    } finally {
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
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "blog_index";
              });
              setBlogDetailsBoxAds(filterArray1);
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right1";
              });

              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right2";
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
              return item.image_type == "blog_index";
            });
            setBlogDetailsBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right1";
            });

            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "blog_index_right2";
            });

            setSuccesStoriesRight2(filterArray3);
          }
        });
      },
    );
  }, []);
  useEffect(() => {
    if (state) {
      getBlogWithHashtagData(state);
    }
  }, [state]);

  return (
    <div>
      <Header />
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-9 col-md-8 sk-blog-detail-wa'>
              <div className='Hashtag_container_title'>
                <span className='catagories-search'>
                  {state ? `${currentSearch}` : null}{" "}
                  <CancelRoundedIcon
                    onClick={() => history.push(routingConstants.MORE_BLOG)}
                  />
                </span>
              </div>
              {loading ? (
                <div>
                  <CustomLoader />
                </div>
              ) : (
                <div>
                  {data?.length
                    ? data?.map((items, index) => {
                        if (items.id === "advertisement") {
                          const randomIndex = Math.floor(
                            Math.random() * blogDetailsBoxAds.length,
                          );
                          return (
                            <>
                              {blogDetailsBoxAds.length > 0 && (
                                <div className='row'>
                                  <div
                                    className='col-md-12'
                                    // className='col-md-12 ads_home_cover '
                                    onClick={() =>
                                      addEmailToClient(
                                        blogDetailsBoxAds[randomIndex]
                                          ?.add_email,
                                      )
                                    }
                                  >
                                    <div className='card'>
                                      <a
                                        href={
                                          blogDetailsBoxAds[randomIndex]
                                            ?.url_adds
                                        }
                                        target='_blank'
                                        rel='noreferrer'
                                      >
                                        {detect.isMobile
                                          ? blogDetailsBoxAds[randomIndex]
                                              ?.image_mobile && (
                                              <img
                                                src={
                                                  blogDetailsBoxAds[randomIndex]
                                                    ?.image_mobile
                                                }
                                                alt=''
                                                // className='ads_story_cover_img'
                                              />
                                            )
                                          : blogDetailsBoxAds[randomIndex]
                                              ?.image && (
                                              <img
                                                src={
                                                  blogDetailsBoxAds[randomIndex]
                                                    ?.image
                                                }
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
                          );
                        } else {
                          return (
                            <>
                              <TrendingBlogsCard2
                                image={items.image}
                                title={items.title}
                                id={items.id}
                                description={`${items.about_blog}`}
                                time={items.reading_time}
                                date={DateFormat(`${items.created_at}`)}
                                category_name={items.category_name}
                              />
                            </>
                          );
                        }
                      })
                    : "no data"}
                </div>
              )}
            </div>
            <div className='col-xl-3 col-md-4'>
              <HashtagAndCatagories
                image={catagorie}
                title={`Categories`}
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
