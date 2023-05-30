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
import { DateFormat, addEmailToClient } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";

const BlogWithCatogry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { state } = location;

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("category_id") || "";

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [blogDetailsBoxAds, setBlogDetailsBoxAds] = useState([]);

  const getBlogWithHashtagData = async (search) => {
    setLoading(true);
    try {
      const url = `more/blogs?category_id=${search}`;
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
                return item.image_type == "blog_index_left";
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
              return item.image_type == "blog_index_left";
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

  const adCount = blogDetailsBoxAds.length; // Total number of ads
  let adIndex = 0; // Current ad index

  const getNextAdIndex = () => {
    // Increment the index and reset if it exceeds the total count
    adIndex = (adIndex + 1) % adCount;
    return adIndex;
  };

  const renderAd = (ad) => (
    <div className='row'>
      <div
        key={ad.id}
        onClick={() => addEmailToClient(ad.add_email)}
        className='col-md-12'
      >
        <div className='card'>
          <a href={ad.url_adds} target='_blank' rel='noreferrer'>
            {detect.isMobile
              ? ad.image_mobile && <img src={ad.image_mobile} alt='' />
              : ad.image && <img src={ad.image} alt='' />}
          </a>
        </div>
      </div>
    </div>
  );

  const renderAds = () => {
    const adIndex = getNextAdIndex();
    const ad = blogDetailsBoxAds[adIndex];
    return renderAd(ad);
  };

  return (
    <div>
      <Header />
      <section>
        <div className='container Hashtag_container'>
          <div className='row'>
            <div className='col-xl-9 col-md-8 Hashtag_container_cards sk-blog-detail-wa'>
              <h6 className='Hashtag_container_title'>
                {state ? `${currentSearch}` : "NA"}
              </h6>
              {loading ? (
                <div>
                  <CustomLoader />
                </div>
              ) : (
                <div className='sk-blogCategory-detail'>
                  {data?.length ? (
                    data?.map((items, index) => {
                      if (items.id === "advertisement") {
                        return (
                          <>{blogDetailsBoxAds.length > 0 && renderAds()}</>
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
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
            </div>
            <div div className='col-xl-3 col-md-4'>
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
export default BlogWithCatogry;
