import React, { useEffect, useState } from "react";
import "./index.scss";
import "../Search/index.scss";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { apiConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { addEmailToClient, makeHtml } from "../../utils/utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { CustomLoader } from "../../components/customLoader/CustomLoader";

const AllSuccessStory = () => {
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { lan } = useSelector((state) => state.languageReducer);

  const [allSuccessStoriesData, setAllSuccessStoriesData] = useState([]);
  const [paginationCount, setPaginationCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allHashTag, setAllHashTag] = useState([]);
  const [succesStoriesBox, setSuccesStoriesBox] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
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
      }
      setAllHashTag(all_hash_tags);
      setPaginationCount(all_success_stories);
    } catch (error) {
    } finally {
      setLoading(false);
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
    }
  };

  // Handle previous page click
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset - pageLimit);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "All") {
          await getAllSuccessStoryData(pageLimit, offset);
        } else {
          await getAllSuccessStoryData(pageLimit, offset, activeTab);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [offset, lan, activeTab]);

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

  return (
    <div>
      <section className='sk-search-sec'>
        <div className='container sk-custom-container'>
          <div className='row'>
            <div className='col-xl-10 mx-auto'>
              <div className='sk-content-sec'>
                <div className='sk-title-heading mb-4'>
                  <h1>
                    Inspiring Stories of <span>Women</span>
                  </h1>
                  <p>
                    Success stories at SheKunj focus on sharing captivating
                    stories of inspiring women, encompassing diverse roles,
                    including homemakers, athletes, leaders, artists, activists,
                    professionals, and entrepreneurs, aiming to uplift and
                    motivate individuals from all walks of life.
                  </p>
                </div>
                <div class='sk-category mb-0'>
                  <ul>
                    <li>
                      <a
                        onClick={() => setActiveTab("All")}
                        className={activeTab === "All" && "active-time"}
                      >
                        All
                      </a>
                    </li>
                    {allHashTag.map((item) => (
                      <li key={item}>
                        <a
                          onClick={() => {
                            setCurrentPage(1);
                            setOffset(0);
                            setActiveTab(item.name);
                          }}
                          className={activeTab === item.name && "active-time"}
                        >
                          {`#${item.name}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            {loading ? (
              <CustomLoader />
            ) : (
              allSuccessStoriesData?.map((items, index) => {
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
            )}
          </div>
        </div>
      </section>
      <section>
        {/* Render pagination */}
        <div className='pagination'>
          <button onClick={previousPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handleClick(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            );
          })}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default withHeaderFooter(AllSuccessStory);
