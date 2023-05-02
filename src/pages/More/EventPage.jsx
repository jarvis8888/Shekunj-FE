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

function EventPage() {
  const options = [
    { label: "All", value: "all" },
    { label: "Today-Tomorrow", value: "todayTomorrow" },
    { label: "This Week", value: "thisWeek" },
    { label: "Next Week", value: "nextWeek" },
  ];

  const [eventBoxAds, setEventBoxAds] = useState([]);
  // const [events, setEvents] = useState([]);
  // const [image, setImage] = useState("NA");
  // const [adds, setAdds] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [allEventData, setAllEventData] = useState([]);
  const [todayTomorrowData, setTodayTomorrowData] = useState([]);
  const [thisWeekData, setThisWeekData] = useState([]);
  const [nextWeekData, setNextWeekData] = useState([]);
  const [genresListData, setGenresListData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("genre_id") || "";

  // const { events } = useSelector((state) => state.eventsReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  const fetchEventsData = async (search, selectedOption) => {
    setLoading(true);
    try {
      const url = `more/events?genre_id=${search}`;
      const { data } = await httpServices.get(url);
      const { event_list, today_tomorrow, this_week, next_week, genres_list } =
        data;
      setAllEventData(event_list);
      setGenresListData(genres_list);
      setTodayTomorrowData(today_tomorrow);
      setThisWeekData(this_week);
      setNextWeekData(next_week);
      setCurrentData(event_list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleTimeOptionClick = (option) => {
    setSelectedButton(option);
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
    searchParams.set("genre_id", option);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    fetchEventsData(currentSearch, selectedOption);
  }, [currentSearch, lan, selectedOption]);

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
                return item.image_type == "event_index";
              });
              setEventBoxAds(filterArray1);
              // console.log("filterArray1event_index",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "event_index";
            });
            setEventBoxAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

  const addEmail = (email) => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
      axios
        .post("/private_adds/click_add/", {
          // add_email:`${adds[0]?.add_email}`
          add_email: email,
          latitude: params.latitude.toString(),
          longitude: params.longitude.toString(),
        })
        .then((response) => {
          // setAdds(response.data.results);
          console.log("addEmailresponse", response);
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
  };

  // useEffect(() => {
  //   checkFunction();
  // }, [events?.event_list]);

  const shuffleFun = (c, index) => {
    if (c?.id === "advertistment") {
      return (
        <>
          {eventBoxAds?.length > 0 ? (
            <Grid spacing={1} className='gridContainerEvent flex'>
              <Col md={1} xl={12}>
                <Card className='EventOptionCard'>
                  {eventBoxAds?.length > 0 && (
                    <div
                      className='EventOptionCard'
                      onClick={() => addEmail(eventBoxAds[0]?.add_email)}
                    >
                      <a href={eventBoxAds[0]?.url_adds} target='_blank'>
                        <img
                          src={eventBoxAds[0]?.image}
                          alt='Image'
                          className='EventOptionCardAddImage'
                        />
                      </a>
                      <div className='overlay'></div>
                    </div>
                  )}
                </Card>
              </Col>
            </Grid>
          ) : (
            ""
          )}
        </>
      );
    } else {
      return (
        <Grid spacing={1} className='gridContainerEvent'>
          <Col md={1} xl={12}>
            <Card className='EventOptionCard noselect'>
              <CardMedia
                component='img'
                alt='image'
                // height='200'
                image={c && c.image}
                className='guidanceEventImage'
              />

              <Typography
                gutterBottom
                variant='h6'
                component='div'
                className='limited-text-event'
              >
                <Link
                  to={routingConstants.MORE_EVENT + c.id}
                  className='event-title-link center'
                  key={c?.id}
                >
                  {c && c.title}
                </Link>
              </Typography>

              <CardContent class='d-flex flex-column'>
                <Typography className='event_mode' sx={{ mb: 1.5 }} fullWidth>
                  <PublicIcon /> {c && c?.type_1}
                </Typography>
                <Typography className='event_mode' sx={{ mb: 1.5 }} fullWidth>
                  <GroupTwoToneIcon /> {c && c?.mode_of_event}
                </Typography>
                <Typography className='Date-Time'>
                  <Typography style={{ marginBottom: "10px" }}>
                    Date : {c && c?.date}
                  </Typography>
                  <Typography style={{ marginBottom: "10px" }}>
                    Time : {c && c?.time}
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant='outlined'
                  size='medium'
                  className='eventButtonAction'
                  href={c && c.form_link}
                >
                  <Link
                    to={routingConstants.MORE_EVENT + c.id}
                    className='event-button-link'
                    key={c?.id}
                  >
                    Registration and details
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Grid>
      );
    }
  };

  // const checkFunction = () => {
  //   let num = Math.floor(Math.random() * (4 - 0) + 0);
  //   let res = events?.event_list;
  //   let dummydata = {
  //     id: "advertistment",
  //   };
  //   res && res.splice(num, 0, dummydata);
  //   if (res) {
  //     setTempData(res);
  //   }
  // };
  // const checkFunction = () => {
  //   const num = Math.floor(Math.random() * 4);
  //   const res = events?.event_list || [];
  //   const dummydata = { id: "advertisement" };
  //   const newData = [...res.slice(0, num), dummydata, ...res.slice(num)];
  //   setTempData(newData);
  // };

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
                            selectedOption === items.id && "active-time"
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
            </div>
          )}
        </div>
      </section>
      <Footer loginPage={false} />
    </div>
  );
}

export default EventPage;
