import React, { useEffect, useState } from "react";
import "./index.scss";
import "../Search/index.scss";
import storyimg from "../../assets/images/storyviewall.png";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { apiConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { addEmailToClient, makeHtml } from "../../utils/utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { useParams, useHistory } from "react-router-dom";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import { SEO } from "../../components";
import banner from "../../assets/images/searchbg.jpg";

const AllSuccessStory = () => {
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  const { hashtag } = useParams();
  const history = useHistory();

  const { lan } = useSelector((state) => state.languageReducer);

  const [allSuccessStoriesData, setAllSuccessStoriesData] = useState([]);
  const [paginationCount, setPaginationCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allHashTag, setAllHashTag] = useState([]);
  const [succesStoriesBox, setSuccesStoriesBox] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [dynamicBackgroundImage, setDynamicBackgroundImage] = useState();

  const [offset, setOffset] = useState(0);
  const pageLimit = 7;

  const getAllSuccessStoryData = async (limit, offset, search = "") => {
    setLoading(true);
    try {
      const url = `${apiConstants.COURSES.ALL_SUCCESS_STORY}?limit=${limit}&offset=${offset}&search=${search}`;
      const data = await httpServices.get(url);
      const { all_hash_tags, all_success_stories } = data;
      if (all_success_stories?.results?.length > 0) {
        const res = all_success_stories?.results ?? [];
        const addObjectData = { id: "advertisement" };
        const newFeaturedData = [];

        for (let i = 0; i < res.length; i++) {
          newFeaturedData.push(res[i]);

          if ((i + 1) % 3 === 0) {
            newFeaturedData.push(addObjectData);
          }
        }
        setAllSuccessStoriesData(() => [...newFeaturedData]);
      } else {
        setAllSuccessStoriesData([]);
      }
      setAllHashTag(all_hash_tags);
      setPaginationCount(all_success_stories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getAllBannerData = async () => {
    try {
      const url = `${apiConstants.BANNERS.GET_ALL_BANNERS}`;
      const data = await httpServices.get(url);
      if (data?.data?.length > 0) {
        let filterArray1 = data?.data?.filter((item, index) => {
          return item.image_type === "inspiring-stories-of-women-page";
        });
        setDynamicBackgroundImage(filterArray1[0]?.Banner_image);
      }
    } catch (error) {
    } finally {
    }
  };
  // Calculate the total number of pages
  const totalPages = Math.ceil(paginationCount?.count / pageLimit);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * pageLimit); // Update the offset based on the clicked page number
  };

  // Handle next page click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setOffset(offset + pageLimit);
      // setEndPage(endPage + 1);
    }
    if (startPage + 1 < totalPages) {
      setStartPage(startPage + 1);
    }
  };

  // Handle previous page click
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset - pageLimit);
      // setEndPage(endPage - 1);
    }
    if (startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const visiblePages = Array.from({ length: 4 })
    .map((_, index) => startPage + index)
    .filter((pageNumber) => pageNumber <= totalPages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hashtag === "all") {
          await getAllSuccessStoryData(pageLimit, offset);
        } else {
          await getAllSuccessStoryData(pageLimit, offset, hashtag);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [offset, lan, hashtag]);
  useEffect(() => {
    getAllBannerData();
  }, [lan]);

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
              let filterArray5 = response.data.results.filter((item, index) => {
                return item.image_type === "success_stories_box";
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
            let filterArray5 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_box";
            });

            setSuccesStoriesBox(filterArray5);
          }
        });
      },
    );
  }, []);

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
      className='col-xl-4 col-lg-4 col-md-6 col-sm-6'
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

  const handleToggleView = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  const handleHashtagOnclick = (option) => {
    setCurrentPage(1);
    setOffset(0);
    setActiveTab(option);
    const path = `/inspiring-stories-of-women/${option}`;
    history.push(path);
  };
  const handleAllOnclick = (option) => {
    setActiveTab(option);
    const path = `/inspiring-stories-of-women/${option}`;
    history.push(path);
  };

  const renderedHashtags = showAll ? allHashTag : allHashTag.slice(0, 4);
  const currentUrl = window.location.href;

  const styles = {
    background: dynamicBackgroundImage
      ? `url(${dynamicBackgroundImage}) no-repeat center center`
      : `url(${banner}) no-repeat center center`,
    backgroundSize: "cover",
    position: "relative",
    padding: "60px 0 60px",
  };
  return (
    <>
      <SEO
        title='Sheकुंज -  Inspiring Stories of Women'
        link={currentUrl}
        currentUrl={currentUrl}
        keywords='women empowerment organizations, free online courses in india, free career guidance'
        description='Shekunj.com works for women empowerment by providing free online certification courses, 
      career guidance, job and internship opportunities across India.'
      />

      <div>
        <section className='sk-search-sec' style={styles}>
          <div className='container sk-custom-container'>
            <div className='row'>
              <div className='col-xl-11 mx-auto'>
                <div className='sk-content-sec'>
                  <div className='sk-title-heading mb-4'>
                    <h1>
                      Inspiring Stories of <span>Women</span>
                    </h1>
                    <p>
                      Success stories at SheKunj focus on sharing captivating
                      stories of inspiring women, encompassing diverse roles,
                      including homemakers, athletes, leaders, artists,
                      activists, professionals, and entrepreneurs, aiming to
                      uplift and motivate individuals from all walks of life.
                    </p>
                  </div>
                  <div class='sk-category mb-0'>
                    <ul>
                      <li>
                        <a
                          onClick={() => handleAllOnclick("all")}
                          className={hashtag === "all" && "active-time"}
                        >
                          All
                        </a>
                      </li>
                      {renderedHashtags.map((item) => (
                        <li key={item}>
                          <a
                            onClick={() => handleHashtagOnclick(item.slug)}
                            className={hashtag === item.slug && "active-time"}
                          >
                            {`#${item.name}`}
                          </a>
                        </li>
                      ))}
                      {allHashTag.length > 4 && (
                        <li
                          className='hashtags-item-view'
                          onClick={handleToggleView}
                        >
                          <a>
                            {showAll ? "View Less " : "View All "}
                            {showAll ? (
                              <KeyboardArrowUpRoundedIcon />
                            ) : (
                              <ExpandMoreRoundedIcon />
                            )}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='sk-viewall-img'>
            {dynamicBackgroundImage ? null : (
              <img src={storyimg} alt='storyimg' />
            )}
          </div>
        </section>
        <section className='sk-storyBoxMain-sec sk-allstory-sec'>
          <div className='container sk-custom-container'>
            <div className='row'>
              {loading ? (
                <CustomLoader />
              ) : allSuccessStoriesData.length > 0 ? (
                allSuccessStoriesData.map((items, index) => {
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
                        <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6'>
                          <FeaturedCards
                            image={items.image}
                            hashtags={
                              items.hash_tags === null ? [] : items.hash_tags
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
              ) : (
                <NoDataFound />
              )}

              <div className='col-xl-12'>
                {allSuccessStoriesData.length ? (
                  <div className='sk-pagination pagination'>
                    <span
                      className='sk-prevnext-btn'
                      onClick={previousPage}
                      disabled={startPage === 1}
                    >
                      <WestRoundedIcon />
                    </span>
                    {visiblePages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handleClick(pageNumber)}
                        className={currentPage === pageNumber ? "active" : ""}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <span
                      className='sk-prevnext-btn'
                      onClick={nextPage}
                      disabled={startPage + 3 >= totalPages}
                    >
                      <EastRoundedIcon />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withHeaderFooter(AllSuccessStory);
