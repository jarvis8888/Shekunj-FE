import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicIcon from "@mui/icons-material/Public";
import { Header, Footer } from "../../components";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getAllEvents } from "../../store/events";
// import Moment from "react-moment";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { adsList } from "../../store/ads";
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import { Helmet } from "react-helmet-async";
import { EventsCard } from "../../components/cards/EventsCard";
// import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

function EventPage() {
  const [eventBoxAds, setEventBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);
  const [tempData, setTempData] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { events } = useSelector((state) => state.eventsReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch, lan]);

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

  useEffect(() => {
    checkFunction();
  }, [events?.event_list]);

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

  const checkFunction = () => {
    let num = Math.floor(Math.random() * (4 - 0) + 0);
    let res = events?.event_list;
    let dummydata = {
      id: "advertistment",
    };
    res && res.splice(num, 0, dummydata);
    if (res) {
      setTempData(res);
    }
  };

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
      <div>top section</div>
      <div>
        <EventsCard />
      </div>
      <Footer loginPage={false} />
    </div>
  );
}

export default EventPage;
