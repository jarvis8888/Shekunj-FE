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
import { time_left } from "../../utils/utils";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
<<<<<<< HEAD
import AddsBanner from "../../components/AddsBanner/AddsBanner";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
=======
>>>>>>> 33f2ba56 (added the event and event details page intergation)

function EventPage() {
  const options = [
    { label: "All", value: "all" },
    { label: "Today-Tomorrow", value: "todayTomorrow" },
    { label: "This Week", value: "thisWeek" },
    { label: "Next Week", value: "nextWeek" },
  ];

  const { lan } = useSelector((state) => state.languageReducer);

  const [eventBoxAds, setEventBoxAds] = useState([]);
<<<<<<< HEAD
=======
  // const [events, setEvents] = useState([]);
  // const [image, setImage] = useState("NA");
  // const [adds, setAdds] = useState([]);
  const [tempData, setTempData] = useState([]);
>>>>>>> 33f2ba56 (added the event and event details page intergation)
  const [currentData, setCurrentData] = useState([]);
  const [allEventData, setAllEventData] = useState([]);
  const [todayTomorrowData, setTodayTomorrowData] = useState([]);
  const [thisWeekData, setThisWeekData] = useState([]);
  const [nextWeekData, setNextWeekData] = useState([]);
  const [genresListData, setGenresListData] = useState([]);
<<<<<<< HEAD
  const [selectedButton, setSelectedButton] = useState("all");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const params = useQuery();
  const [selectedOption, setSelectedOption] = useState(params.get("genre_id"));
=======
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");
  const [loading, setLoading] = useState(false);
>>>>>>> 33f2ba56 (added the event and event details page intergation)

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const detect = useDeviceDetect();

<<<<<<< HEAD
  const fetchEventsData = async (genre, isAllItem) => {
=======
  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("genre_id") || "";

  // const { events } = useSelector((state) => state.eventsReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  const fetchEventsData = async (search, selectedOption) => {
>>>>>>> 33f2ba56 (added the event and event details page intergation)
    setLoading(true);
    try {
      let url = `more/events`;
      if (selectedButton == "all") {
        url += `?limit=${20}&offset=${currentOffset}`;
      }
      if (genre || selectedOption) {
        const a = genre || selectedOption;
        url += `&genre_id=${a}`;
      }
      const { data } = await httpServices.get(url);
      const { event_list, today_tomorrow, this_week, next_week, genres_list } =
        data;
<<<<<<< HEAD
=======
      setAllEventData(event_list);
>>>>>>> 33f2ba56 (added the event and event details page intergation)
      setGenresListData(genres_list);
      setTodayTomorrowData(today_tomorrow);
      setThisWeekData(this_week);
      setNextWeekData(next_week);
<<<<<<< HEAD
      if (isAllItem) {
        setAllEventData([...event_list?.results]);
      }
      setCurrentData(event_list?.results);
=======
      setCurrentData(event_list);
>>>>>>> 33f2ba56 (added the event and event details page intergation)
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleTimeOptionClick = (option) => {
    setSelectedButton(option);
<<<<<<< HEAD
    setSelectedOption(null);
    const searchParams = new URLSearchParams();
    searchParams.set("genre_id", "");
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
    switch (option) {
      case "todayTomorrow":
        setCurrentData(todayTomorrowData);
        break;
      case "thisWeek":
        setCurrentData(thisWeekData);
        break;
      case "nextWeek":
        setCurrentData(nextWeekData);
        break;
      default:
        setSelectedOption(null);
        setCurrentOffset(0);
        fetchEventsData();
        break;
    }
  };
  const handleGenerOptionClick = (option) => {
    setSelectedButton("all");
    setSelectedOption(option);
    setCurrentOffset(0);
    fetchEventsData(option);
    const searchParams = new URLSearchParams();
=======
    switch (option) {
      case "todayTomorrow":
        setCurrentData(todayTomorrowData);
        break;
      case "thisWeek":
        setCurrentData(thisWeekData);
        break;
      case "nextWeek":
        setCurrentData(nextWeekData);
        break;
      default:
        setCurrentData(allEventData);
        break;
    }
  };
  const handleGenerOptionClick = (option) => {
    setSelectedButton("all");
    setSelectedOption(option);
    const searchParams = new URLSearchParams();
>>>>>>> 33f2ba56 (added the event and event details page intergation)
    searchParams.set("genre_id", option);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    fetchEventsData(null, true);
  }, [currentOffset, lan]);

  const addEmail = async (email) => {
    try {
      const position = await navigator.geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };

      const response = await axios.post("/private_adds/click_add/", {
        add_email: email,
        latitude: params.latitude,
        longitude: params.longitude,
      });

      console.log("addEmailresponse", response);
    } catch (error) {
      console.log(error);
    }
  };
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
        setEventBoxAds(filterArray1);
      } catch (error) {
        console.error(error);
        axios.get(`/private_adds/private_add`).then((response) => {
          let filterArray1 = response.data.results.filter((item, index) => {
            return item.image_type == "event_detail_footer";
          });
          setEventBoxAds(filterArray1);
        });
      }
    };
    const errorCallback = (error) => {
      console.error("Error Code = " + error.code + " - " + error.message);
      axios.get(`/private_adds/private_add`).then((response) => {
        let filterArray1 = response.data.results.filter((item, index) => {
          return item.image_type == "event_detail_footer";
        });
        setEventBoxAds(filterArray1);
      });
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

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
<<<<<<< HEAD
            <OwlCarousel
              className='event-Carousel'
              items={4}
              margin={20}
              autoPlay
              nav={true}
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
=======
            <OwlCarousel items={4} margin={15} {...options}>
              <div>
                <img src={eventimg1} />
              </div>
              <div>
                <img src={eventimg2} />
              </div>
              <div>
                <img src={eventimg1} />
              </div>
              <div>
                <img src={eventimg2} />
              </div>
              <div>
                <img src={eventimg1} />
              </div>
              <div>
                <img src={eventimg2} />
              </div>
              <div>
                <img src={eventimg1} />
              </div>
>>>>>>> 33f2ba56 (added the event and event details page intergation)
            </OwlCarousel>
          </div>
        </div>
      </section>
      <section className='sk-card-sec sk-eventcard-sec'>
        <div className='container'>
          <div className='sk-title-heading'>
            <h2>All Events Today</h2>
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
<<<<<<< HEAD
                            selectedOption == items.id && "active-time"
=======
                            selectedOption === items.id && "active-time"
>>>>>>> 33f2ba56 (added the event and event details page intergation)
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
          {loading ? (
            <CustomLoader size='small' />
          ) : (
            <div className='row'>
<<<<<<< HEAD
              {currentData.length ? (
                currentData?.map((items, index) => {
                  return (
                    <>
                      <div className='col-md-3' key={index}>
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
                                  <SchoolRoundedIcon /> {
                                    items.enrold_students
                                  }{" "}
                                  enrolled{" "}
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
                      disabled={true}
                      type=''
                      onClick={() => {
                        setCurrentOffset(currentOffset + 1);
                      }}
                      className='sk-btn'
                    >
                      Explore More{" "}
                    </button>
                  </div>
                </div>
              )}
=======
              {currentData.length
                ? currentData?.map((items, index) => {
                    return (
                      <>
                        <div className='col-md-3' key={index}>
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
                  })
                : "no data"}
              <div className='col-md-12'>
                <div className='sk-explore-btn'>
                  <button type='' className='sk-btn'>
                    Explore More{" "}
                  </button>
                </div>
              </div>
>>>>>>> 33f2ba56 (added the event and event details page intergation)
            </div>
          )}
        </div>
      </section>
<<<<<<< HEAD
      <section className="sk-bottomAdd-sec">
        <div className="container">
          <div className="row">  
          <div className="col-md-12"> 
          <>
            {eventBoxAds.length > 0 && (
              <a href={eventBoxAds[0]?.url_adds} target='_blank' rel='noreferrer'>
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
          </>
        </div>
        </div>
        </div>

      </section>
=======
>>>>>>> 33f2ba56 (added the event and event details page intergation)
      <Footer loginPage={false} />
    </div>
  );
}

export default EventPage;
