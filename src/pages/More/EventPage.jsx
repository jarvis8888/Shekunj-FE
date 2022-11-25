import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicIcon from '@mui/icons-material/Public';
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
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
// import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

function EventPage() {
  const history = useHistory();
  const { events } = useSelector((state) => state.eventsReducer);
  const dispatch = useDispatch();

  console.log("Eventsssssss", events);

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch, lan]);

  // const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [eventBoxAds, setEventBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .get(
  //         `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
  //       )
  //       .then((response) => {
  //         if (response.data.results.length > 0) {
  //           let filterArray = response.data.results.filter((item, index) => {
  //             return item.image_type == "event_index";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setStoriesBoxAds(filterArray);
  //         }
  //       }).catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>latest code below >>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    dispatch(adsList())
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      } 
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
          })   
    } ,
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
      // alert("Your location is blocked")    
    axios
    .get(
      `/private_adds/private_add`,
    )
    .then((response) => {
      if (response && response.data.results.length > 0) {
          let filterArray1 = response.data.results.filter((item, index) => {   
            return item.image_type == "event_index";
          });
          setEventBoxAds(filterArray1);
          // console.log("filterArray1coursebox",filterArray1) 
          }
        })
   }
  )
  },[])


  const addEmail = (email) => {
    console.log("addEmail", email);
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
        }).catch((error) => {
          // setMessage("No data found");
          console.log(error);
      })
    });
  };

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreEvent' />
      <div className='SuccStory_banner noselect'>
        {" "}
        <Container>
          <Row>
            <Col md={1}>
              <div className='global_img'>
                <img src={global} alt='' className='vert-move' />
              </div>
            </Col>
            <Col md={6} data-aos='slide-up'>
              <h2> {t("Shekunj Events..")}</h2>
              <p> Have a look how SheKunj has played an important role</p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className='Home'> */}
        <Container className="eventContainer event_responsive12">
          {events?.event_list?.length > 0 ? (
            events?.event_list?.map((c, index) => {
              console.log("c", c);
              return (
                <>
                
                  <Grid spacing={1} className='gridContainerEvent'>
                  {/* <Grid spacing={1} className='gridContainerEvent flex'> */}
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
                              className='event-title-link'
                              key={c?.id}
                            >
                              {c && c.title}
                            </Link>
                          </Typography>

                        <CardContent class='d-flex flex-column'>
                         
                          <Typography className="event_mode" sx={{ mb: 1.5 }} fullWidth>
                          <PublicIcon />{" "}{c && c?.type_1}
                          </Typography>
                          <Typography className="event_mode" sx={{ mb: 1.5 }} fullWidth>
                          <LocalLibraryTwoToneIcon />{" "}{c && c?.type_2}
                          </Typography>
                          <Typography className="event_mode" sx={{ mb: 1.5 }} fullWidth>
                          <GroupTwoToneIcon/>{" "}{c && c?.mode_of_event}
                          </Typography>
                          <Typography className="Date-Time">
                            <Typography>
                               Date : {" "}
                            {c && c?.date}
                            </Typography>
                            <Typography
                             >
                               Time : {" "}
                            {c && c?.time}
                            </Typography>
                          </Typography>
                        </CardContent>
                                               <CardActions>
                          <Button
                          variant="outlined"
                            size='medium'
                            className='eventButtonAction'
                            style={{color:"pink",backgroundColor:"white"}}
                            href={c && c.form_link}
                          >
                             <Link
                              to={routingConstants.MORE_EVENT + c.id}
                              className='event-title-link'
                              key={c?.id}
                            >
                            Registration and details
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Col>
                  </Grid>
                  {index % 2 == 1 ? (
                    <>
                      <Grid spacing={1} className='gridContainerEvent flex'>
                        {/*  */}
                        <Col md={1} xl={12}>
                          <Card className='EventOptionCard'>
                          {eventBoxAds.length > 0 && (
                            <div
                              className='EventOptionCard'
                              onClick={() =>
                                addEmail(eventBoxAds[0]?.add_email)
                              }
                            >
                              <a
                                href={eventBoxAds[0]?.url_adds}
                                target='_blank'
                              >
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
                    </>
                  ) : (
                    ""
                  )}
                  
                </>
              );
            })
          ) : (
      
            <div className='text-center'>{t("common.noDataFound")}</div>
          )}
        </Container>
      {/* </div> */}
      {/* <div className='want'>
        <Container>
          <h2>{t("successStoriesPage.content.2")}</h2>
          <button onClick={() => history.push("/courses")} className='want_btn'>
            {t("successStoriesPage.button.2")}
          </button>
        </Container>
      </div> */}

      <Footer loginPage={false} />
    </div>
  );
}

export default EventPage;
