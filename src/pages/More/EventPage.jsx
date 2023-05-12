import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicIcon from "@mui/icons-material/Public";
import { Header, Footer } from "../../components";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import "../Search/index.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getAllEvents } from "../../store/events";
// import Moment from "react-moment";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import eventimg1 from "../../assets/images/eventslide1.jpg";
import eventimg2 from "../../assets/images/eventslide2.jpg";
import eventimg4 from "../../assets/images/eventimg4.jpg";
// import eventimg5 from "../../assets/images/eventimg5.jpg";
// import eventadd from "../../assets/images/eventadd.jpg";
import offlineicon from "../../assets/images/offline-icon.svg";
import onlineicon from "../../assets/images/onlineicon.svg";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { adsList } from "../../store/ads";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import { Helmet } from "react-helmet-async";
import { EventsCard } from "../../components/cards/EventsCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import httpServices from "../../utils/ApiServices";
import { addEmailToClient, time_left } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import AddsBanner from "../../components/AddsBanner/AddsBanner";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function EventPage() {
  const options = [
    { label: "All", value: "all" },
    { label: "Today-Tomorrow", value: "todayTomorrow" },
    { label: "This Week", value: "thisWeek" },
    { label: "Next Week", value: "nextWeek" },
  ];

  const { lan } = useSelector((state) => state.languageReducer);
  const [currentData2, setCurrentData2] = useState([]);

  const [eventBoxAds, setEventBoxAds] = useState([]);
  const [eventFooterAds, setEventFooterAds] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [allEventData, setAllEventData] = useState([]);
  const [todayTomorrowData, setTodayTomorrowData] = useState([]);
  const [thisWeekData, setThisWeekData] = useState([]);
  const [nextWeekData, setNextWeekData] = useState([]);
  const [genresListData, setGenresListData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("all");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const params = useQuery();
  const [selectedOption, setSelectedOption] = useState(params.get("genre_id"));
  const [checkEventData, setCheckEventData] = useState([]);
  const [dataWithAdds, setDataWithAdds] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const detect = useDeviceDetect();

  const getAllEVentsData = async (currentOffset, genre) => {
    setLoading(true);
    try {
      let url = `more/events`;
      if (genre) {
        url += `?genre_id=${genre}`;
      } else {
        url += `?limit=${8}&offset=${currentOffset}`;
      }
      const { data } = await httpServices.get(url);
      const { event_list, today_tomorrow, this_week, next_week, genres_list } =
        data;
      setGenresListData(genres_list);
      setTodayTomorrowData(today_tomorrow);
      setThisWeekData(this_week);
      setNextWeekData(next_week);
      setCheckEventData(event_list?.results);
      let newEventData = [];
      if (genre) {
        newEventData = event_list?.results;
      } else if (currentOffset) {
        if (event_list?.results?.length > 0) {
          newEventData = [...allEventData, ...event_list?.results];
        }
      } else {
        newEventData = event_list?.results;
      }
      if (newEventData.length > 0) {
        const addObjectData = { id: "advertisement" };
        const newDataWithAds = newEventData.reduce((acc, event, index) => {
          if (index % 2 === 0 && index !== 0) {
            acc.push(addObjectData);
          }
          acc.push(event);
          if (
            newEventData.length % 2 === 0 &&
            index === newEventData.length - 1
          ) {
            acc.push(addObjectData);
          }
          return acc;
        }, []);
        setAllEventData(newEventData);
        setDataWithAdds(newDataWithAds);
      }
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleTimeOptionClick = (option) => {
    setSelectedButton(option);
    setSelectedOption(null);
    const searchParams = new URLSearchParams();
    searchParams.set("genre_id", "");
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
    switch (option) {
      case "todayTomorrow":
        setDataWithAdds(todayTomorrowData);
        break;
      case "thisWeek":
        setDataWithAdds(thisWeekData);
        break;
      case "nextWeek":
        setDataWithAdds(nextWeekData);
        break;
      case "all":
        setSelectedOption(null);
        getAllEVentsData(0, null);
        break;
      default:
        break;
    }
  };
  const handleGenerOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedButton(null);
    setCurrentOffset(0);
    const searchParams = new URLSearchParams();
    searchParams.set("genre_id", option);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  // useEffect(() => {
  //   fetchEventsData(null, true);
  // }, [currentOffset, lan]);

  useEffect(() => {
    dispatch(adsList());
    const successCallback = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
        );
        let filterArray1 = response.data.results.filter((item, index) => {
          return item.image_type == "event_detail_footer";
        });
        setEventFooterAds(filterArray1);
        let filterArray2 = response.data.results.filter((item, index) => {
          return item.image_type == "event_index";
        });
        setEventBoxAds(filterArray2);
      } catch (error) {
        console.error(error);
        axios.get(`/private_adds/private_add`).then((response) => {
          let filterArray1 = response.data.results.filter((item, index) => {
            return item.image_type == "event_detail_footer";
          });
          setEventFooterAds(filterArray1);
          let filterArray2 = response.data.results.filter((item, index) => {
            return item.image_type == "event_index";
          });
          setEventBoxAds(filterArray2);
        });
      }
    };
    const errorCallback = (error) => {
      console.error("Error Code = " + error.code + " - " + error.message);
      axios.get(`/private_adds/private_add`).then((response) => {
        let filterArray1 = response.data.results.filter((item, index) => {
          return item.image_type == "event_detail_footer";
        });
        setEventFooterAds(filterArray1);
        let filterArray2 = response.data.results.filter((item, index) => {
          return item.image_type == "event_index";
        });
        setEventBoxAds(filterArray2);
      });
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    getAllEVentsData(currentOffset, selectedOption);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentOffset, lan, selectedOption]);

  // useEffect(() => {
  //   getAllGenreEVentsData(selectedOption);
  // }, []);
  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreEvent' />

      <Helmet>
        <title>
          India's Leading Women Empowerment Organization - Shekunj.com
        </title>
        <link rel='canonical' href='https://www.shekunj.com/event/' />
        <meta
          name='description'
          content='Shekunj.com works on women empowerment and skill development by providing free training, job-oriented courses, jobs & internships and career counseling'
        />
        <meta
          name='keywords'
          content='women empowerment organizations women empowerment initiative free online courses free career guidance'
        />
      </Helmet>
      <section className='sk-event-sec'>
        <div className='container-fluid'>
          <div className='sk-event-slide'>
            <OwlCarousel
              className='event-Carousel'
              loop={true}
              autoplay={true}
              autoplayspeed={1000}
              items={4}
              margin={20}
              nav={true}
              responsive={{
                1: {
                  items: 1,
                },
                667: {
                  items: 2,
                },
                991: {
                  items: 2,
                },
                1199: {
                  items: 4,
                },
                1920: {
                  items: 4,
                },
              }}
            >
              {allEventData?.map((items, index) => {
                return (
                  <>
                    {" "}
                    <div key={index}>
                      <img src={items.image} alt='' />
                    </div>
                  </>
                );
              })}
            </OwlCarousel>
          </div>
        </div>
      </section>
      <section className='sk-card-sec sk-eventcard-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 col-lg-10 col-md-10 col-sm-12 mx-auto'>
              <div className='sk-title-heading'>
                <h1>Discover SheKunj Events</h1>
                <p>Our events are designed to inspire, educate, and empower you both personally and professionally.
                 Whether it's a networking event, conference, or workshop, we want you to leave feeling inspired and 
                 energized.</p>
              </div>
              <div className='sk-category mb-3'>
                <ul>
                  <li>Time</li>
                  {options.map((items, index) => {
                    return (
                      <>
                        <li>
                          <a
                            onClick={() => handleTimeOptionClick(items.value)}
                            className={
                              selectedButton === items.value && "active-time"
                            }
                          >
                            {items.label}
                          </a>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className='sk-category'>
                <ul>
                  <li>Genre</li>
                  {genresListData.length &&
                    genresListData.map((items, index) => {
                      return (
                        <>
                          <li key={items.id}>
                            <a
                              onClick={() => handleGenerOptionClick(items.id)}
                              className={
                                selectedOption == items.id && "active-time"
                              }
                            >
                              {items.name}
                            </a>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          {loading ? (
            <CustomLoader size='small' />
          ) : (
            <div className='row'>
              {dataWithAdds?.length ? (
                dataWithAdds?.map((items, index) => {
                  if (items.id === "advertisement") {
                    return (
                      <>
                        <div
                          className='col-xl-3 col-lg-4 col-md-6'
                          key={index}
                          onClick={() =>
                            addEmailToClient(eventBoxAds[0]?.add_email)
                          }
                        >
                          <div className='sk-eventBox-adds'>
                            {eventBoxAds.length > 0 && (
                              <a
                                href={eventBoxAds[0]?.url_adds}
                                target='_blank'
                                rel='noreferrer'
                              >
                                {detect.isMobile
                                  ? eventBoxAds[0]?.image_mobile && (
                                      <img
                                        src={eventBoxAds[0]?.image_mobile}
                                        alt=''
                                        // className='ads_story_cover_img'
                                      />
                                    )
                                  : eventBoxAds[0]?.image && (
                                      <img
                                        src={eventBoxAds[0]?.image}
                                        alt=''
                                        // className='ads_story_cover_img'
                                      />
                                    )}
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className='col-xl-3 col-lg-4 col-md-6' key={index}>
                          <div className='sk-card-box'>
                            <div className='sk-card-img'>
                              <img src={items.image} alt='' />
                            </div>
                            <div className='sk-content-card'>
                              <div className='sk-time-education'>
                                <ul>
                                  <li className='sk-chip-tag'>
                                    {" "}
                                    <span>{items.genre_name}</span>{" "}
                                  </li>
                                  <li>
                                    {items.mode_of_event === "offline" ? (
                                      <>
                                        {" "}
                                        <img src={offlineicon} /> Offline{" "}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <img src={onlineicon} /> Online{" "}
                                      </>
                                    )}
                                  </li>
                                </ul>
                              </div>
                              <h6 className='sk-card-heading'>{items.title}</h6>
                              <div className='sk-time-education'>
                                <ul>
                                  <li>
                                    {" "}
                                    <AccessTimeIcon />{" "}
                                    <span>
                                      {time_left(
                                        items.start_date,
                                        items.start_time,
                                        items.end_date,
                                        items.end_time,
                                      )}
                                    </span>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <SchoolRoundedIcon />{" "}
                                    {items.enrold_students} enrolled{" "}
                                  </li>
                                </ul>
                              </div>
                              <div className='sk-tags-event'>
                                <button
                                  type='button'
                                  className='sk-btn-register'
                                  onClick={() =>
                                    history.push(
                                      routingConstants.MORE_EVENT + items.id,
                                    )
                                  }
                                >
                                  Registration Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                })
              ) : (
                <div className='noData'>
                  <p>{"No more events available"}</p>
                </div>
              )}
              {selectedButton == "all" && (
                <div className='col-md-12'>
                  <div className='sk-explore-btn'>
                    <button
                      disabled={checkEventData?.length === 0}
                      type=''
                      onClick={() => {
                        setCurrentOffset(currentOffset + 8);
                      }}
                      className='sk-btn'
                    >
                      Explore More{" "}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <section className='sk-bottomAdd-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <>
                {eventFooterAds.length > 0 && (
                  <a
                    href={eventFooterAds[0]?.url_adds}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {detect.isMobile
                      ? eventFooterAds[0]?.image_mobile && (
                          <img
                            src={eventFooterAds[0]?.image_mobile}
                            alt=''
                            // className='ads_story_cover_img'
                          />
                        )
                      : eventFooterAds[0]?.image && (
                          <img
                            src={eventFooterAds[0]?.image}
                            alt=''
                            // className='ads_story_cover_img'
                          />
                        )}
                  </a>
                )}
              </>
            </div>
          </div>
        </div>
      </section>
      <Footer loginPage={false} />
    </div>
  );
}

export default EventPage;
