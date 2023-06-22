import React, { useEffect, useState, useRef } from "react";
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
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import catagorie from "../../assets/images/categoryblog.svg";
import {
  DateFormat,
  addEmailToClient,
  assignColorToCategory,
  removeHtmlTags,
} from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { HashtagAndCatagoriesForMobile } from "../../components/HastagAndCatagories/HastagAndCatagoriesForMobile";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { WhiteCircularBar } from "../../components/Loader/WhiteCircularBar";

const BlogWithCatogry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { state } = location;
  const { search } = useParams();

  const { lan } = useSelector((state) => state.languageReducer);
  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("category_id") || "";

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);
  const [blogDetailsBoxAds, setBlogDetailsBoxAds] = useState([]);
  const [currentFeaturedData, setCurrentFeaturedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [offset, setOffset] = useState(0);
  const pageLimit = 8;
  const searchRef = useRef("");

  const getBlogWithHashtagData = async (search, limit, offset) => {
    setLoading(true);
    try {
      const url = `more/blogs?category__name=${search}&limit=${limit}&offset=${offset}`;
      const data = await httpServices.get(url);
      const { filtered_blogs, blog_categories } = data;
      if (filtered_blogs?.results?.length > 0) {
        const res = filtered_blogs?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);
          if ((i + 1) % 2 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }
        if (search !== searchRef.current) {
          setData(newFeaturedData); // Set new data directly
        } else {
          setData((prevData) => [...prevData, ...newFeaturedData]); // Append new data
        }
      } else {
        setCurrentFeaturedData(filtered_blogs);
      }
      setAllHashTag(blog_categories);
      setSearchTerm(search);
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
    if (search && search !== searchRef.current) {
      setData([]); // Clear existing data
      setCurrentFeaturedData(null); // Clear existing featured data
      setOffset(0); // Reset the offset to 0
      searchRef.current = search; // Update the searchRef
      getBlogWithHashtagData(search, pageLimit, 0);
    } else if (search && search === searchRef.current && offset > 0) {
      getBlogWithHashtagData(search, pageLimit, offset);
    }
  }, [search, offset, lan]);

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

  const namesArray = allHashTag?.map((category) => category.name);

  const getCategoryColor = assignColorToCategory(namesArray);

  const handleLoadMoreClick = () => {
    if (currentFeaturedData?.results?.length === 0) {
      return;
    }
    setOffset(offset + 4);
  };

  return (
    <div>
      <section>
        <div className='container Hashtag_container sk-custom-container'>
          <HashtagAndCatagoriesForMobile
            image={hash}
            title={`Categories`}
            hashtags={allHashTag}
          />
          <div className='row'>
            <div className='col-xl-8 col-lg-8 col-md-8 Hashtag_container_cards sk-blog-detail-wa'>
              <div className='sk-topBottom-space'>
                <div className='sk-hashtag-headingtitle'>
                  <h1 className='Hashtag_container_title'>
                    {search
                      ? `${search.charAt(0).toUpperCase()}${search.slice(1)}`
                      : "NA"}
                  </h1>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal.
                  </p>
                </div>

                <div className='sk-blogCategory-detail'>
                  {data?.length
                    ? data?.map((items, index) => {
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
                                description={`${removeHtmlTags(
                                  items.about_blog,
                                )}`}
                                time={items.reading_time}
                                date={`${items.created_at}`}
                                category_name={items.category_name}
                                color={getCategoryColor(items.category_name)}
                                slug={items.slug}
                                blog_count={items.blog_count}
                              />
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
            <div div className='col-xl-4 col-lg-4 col-md-4 sk-Removeside-space'>
              <HashtagAndCatagories
                image={hash}
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
    </div>
  );
};
export default withHeaderFooter(BlogWithCatogry);
