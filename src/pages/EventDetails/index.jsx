import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  AccordionComponent,
  Footer,
  Header,
  Loader,
  SEO,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Moment from "react-moment";
import axios from "axios";
import { Error } from "../../components";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import TextField from "@mui/material/TextField";
import { Formik, useFormik } from "formik";
import Form from "react-bootstrap/Form";
import GuidanceSelect from "./Select";
// import { withFormik } from "formik";
import { apiConstants, routingConstants } from "../../utils/constants";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { bookEvent, localStData, fetchForm } from "../../store/events/action";
import moment from "moment";
import InputAdornment from "@mui/material/InputAdornment";
import User2 from "../../assets/icons/user2.png";
import User3 from "../../assets/icons/user3.png";
import mail2 from "../../assets/icons/mail2.png";
import phone from "../../assets/icons/phone2.png";
import eventadd01 from "../../assets/images/eventdetailsadd.jpg";
import eventadd02 from "../../assets/images/eventadd02.png";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import onlineicon from "../../assets/images/onlineicon.svg";
import offlineicon from "../../assets/images/offline-icon.svg";
import { getAllEvents, singleEventDetails } from "../../store/events/action";
import { getUserProfile } from "../../store/auth/action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import "../HomePage/index.scss";
import "./index.scss";
import eventimgdetails from "../../assets/images/eventdetails.png";
import noImageIcon from "../../assets/images/no-image.jpeg";
import eventslideimg from "../../assets/images/slideimges11.jpg";
import { adsList } from "../../store/ads";
import City from "../../assets/icons/city.png";
import { Button, Typography, Modal, Box } from "@mui/material";
import Cookies from "js-cookie";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import { ClipLoader } from "react-spinners";
import x from "../../assets/images/Career/x.png";
import CloseIcon from "@mui/icons-material/Close";
import httpServices from "../../utils/ApiServices";
import { makeHtml, time_left } from "../../utils/utils";
import YouMayLikeCarousel from "../../components/Carousel/YouMayLikeCarousel";
import { toast } from "react-toastify";
import toasterConfig from "../../utils/toasterCongig";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  InstapaperShareButton,
} from "react-share";

const Gender = ["Male", "Female", "Others"];

const EventDetails = () => {
  let a = JSON.parse(localStorage.getItem("login_data"));
  let eventData = JSON.parse(localStorage.getItem("event_data"));
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = useState(getModalStyle);
  // const [modalData, setData] = useState();
  const currentUrl = window.location.href;
  const history = useHistory();
  const { events, isLoading } = useSelector((state) => state.eventsReducer);
  const { bookEvents } = useSelector((state) => state.eventsReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { registerData } = useSelector((state) => state.eventsReducer);
  const detect = useDeviceDetect();
  const dispatch = useDispatch();

  //states
  const [eventsDetails, setEventsDetails] = useState();
  const [eventDetailsBoxAds, setEventDetailsBoxAds] = useState([]);
  const [eventDetailsBannerAds, setEventDetailsBannerAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extraInfo, setExtraInfo] = useState([]);
  //states

  // const { isLoading } = useSelector((state) => state.eventReducer);
  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const extraInfoCopy = events;
  const token = Cookies.get("sheToken");

  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("login_data")),
  );

  useEffect(() => {
    dispatch(adsList());
    const successCallback = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
        );
        const filterArray1 = response.data.results.filter(
          (item) => item.image_type === "event_detail",
        );
        setEventDetailsBoxAds(filterArray1);
        const filterArray2 = response?.data?.results?.filter(
          (item) => item.image_type === "event_detail_footer",
        );
        setEventDetailsBannerAds(filterArray2);
      } catch (error) {
        console.error(error);
        axios.get(`/private_adds/private_add`).then((response) => {
          const filterArray1 = response.data.results.filter(
            (item) => item.image_type === "event_detail",
          );
          setEventDetailsBoxAds(filterArray1);
          const filterArray2 = response?.data?.results?.filter(
            (item) => item.image_type === "event_detail_footer",
          );
          setEventDetailsBannerAds(filterArray2);
        });
      }
    };
    const errorCallback = (error) => {
      console.error("Error Code = " + error.code + " - " + error.message);
      axios.get(`/private_adds/private_add`).then((response) => {
        const filterArray1 = response.data.results.filter(
          (item) => item.image_type === "event_detail",
        );
        setEventDetailsBoxAds(filterArray1);
        const filterArray2 = response?.data?.results?.filter(
          (item) => item.image_type === "event_detail_footer",
        );
        setEventDetailsBannerAds(filterArray2);
      });
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  //logic
  const initialValues = {
    fullName: eventData == null ? user?.name : eventData?.name || "",
    email: eventData == null ? user?.email : eventData?.email || "",
    whatsappNumber: "",
    gender: "",
    location: "",
    instituteName: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    whatsappNumber: Yup.string()
      .required("Whatsapp Number is required")
      .matches(/^[0-9]*$/, "Must be a number"),
    gender: Yup.string().required("Select Gender"),
    location: Yup.string().required("Location is required"),
    instituteName: Yup.string().required("Institute Name is required"),
  });
  const onRegistrationFormSubmit = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const {
        fullName,
        email,
        whatsappNumber,
        gender,
        location,
        instituteName,
      } = values;
      const data = {
        event_id: id,
        email: email,
        name: fullName,
        last_name: "",
        city: location,
        contact: whatsappNumber,
        gender: gender,
        extra_info_reg: {
          Age: "",
          Stream: "",
          "Institute Name": instituteName,
          "Whatsapp Number": whatsappNumber,
        },
      };
      try {
        const res = await httpServices.post(
          apiConstants.ALL_EVENTS.BOOK_EVENT,
          data,
        );
        if (res?.message === "You are already registered for this event") {
          toast.warn(res.message, toasterConfig);
          resetForm();
          history.push(routingConstants.MORE_EVENT);
        } else {
          localStorage.setItem("event_data", JSON.stringify(data));
          toast.success(res.message, toasterConfig);
          handleOpen();
          resetForm();
        }
      } catch (error) {
      } finally {
      }
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    validate,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    setFieldTouched,
    isSubmitting,
  } = onRegistrationFormSubmit;

  const getEventDetailById = async (id) => {
    setLoading(true);
    try {
      const res = await httpServices.get("more/event" + "/" + id);
      setEventsDetails(res?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetailById(id);
  }, [id, lan]);

  const handleOpen = (index) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const whatsappUrl = eventsDetails?.whatsapp_group_link?.whatsapp_link;
  const whatsAppModal = () => {
    if (eventsDetails && eventsDetails?.whatsapp_group_link?.join_group) {
      return (
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={open}
          onClose={handleClose}
          className='ModalBoxEvent'
        >
          <div className='ModalBodyBoxEvent'>
            <CloseIcon className='ModalClose' onClick={handleClose} />
            <div className='ModalHeadEvent'>
              <Typography variant='h6' id='modal-title'>
                Congratulations... you have been registered!
              </Typography>
            </div>
            <div className='ModalMiddleEvent'>
              <Typography variant='h6' id='simple-modal-description'>
                You can join our whatsapp group.
              </Typography>
              <a href={whatsappUrl} target='_blank'>
                <Button variant='contained' className='ModalButtonEvent'>
                  JOIN WHATSAPP GROUP
                </Button>
              </a>
              <divider />
              <Typography variant='h4'>
                Want to learn more? <br />
                Checkout our other events
              </Typography>
              <div className='ModalLinkEvent'>
                <Link to={routingConstants.MORE_EVENT}>
                  <strong>Lets have a look... Shekunj Events!</strong>
                </Link>
              </div>
            </div>
            <div className='ModalBottomEvent'>
              <Typography variant='h6' id='modal-title'>
                are you excited to learn ? <br />
                see you soon !
              </Typography>
            </div>
          </div>
        </Modal>
      );
    } else if (
      eventsDetails &&
      eventsDetails?.whatsapp_group_link?.join_group === false
    ) {
      return (
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={open}
          onClose={handleClose}
          className='ModalBoxEvent'
        >
          <div className='ModalBodyBoxEvent2'>
            {/* <img
              className='close_img'
              src={x}
              alt='...'
              onClick={() => handleClose()}
            /> */}
            <CloseIcon className='ModalClose' onClick={handleClose} />
            <div className='ModalHeadEvent'>
              <Typography variant='h6' id='modal-title'>
                Congratulations... you have been registered!
              </Typography>
            </div>
            <div className='ModalMiddleEvent'>
              <Typography variant='h3' id='simple-modal-description'>
                Thank You !
              </Typography>
              <br />
              <divider />
              <Typography variant='h4'>
                Want to learn more? <br />
                Checkout our other events
              </Typography>
              <div className='ModalLinkEvent'>
                <Link to={routingConstants.MORE_EVENT}>
                  <strong>Lets have a look... Shekunj Events!</strong>
                </Link>
              </div>
            </div>
            <div className='ModalBottomEvent'>
              <Typography variant='h6' id='modal-title'>
                are you excited to learn ? <br />
                see you soon !
              </Typography>
            </div>
          </div>
        </Modal>
      );
    }
  };

  return (
    <div>
      {/* <SEO title='Sheकुंज - Career' /> */}
      <Header loginPage={true} page='more' />

      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='sk-eventDetails-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-9 col-md-8'>
                <div className='sk-event-imgcontent'>
                  <div className='sk-eventDetails-img'>
                    <img src={eventsDetails?.image} alt='events' />
                  </div>
                  <div className='sk-eventDetail-content'>
                    <div className='sk-eventSocial-chiptag'>
                      <div>
                        <div className='sk-edetail-chip'>
                          <span>{eventsDetails?.genre_name}</span>
                        </div>
                        <div className='sk-details-datetime'>
                          <ul>
                            <li>
                              {" "}
                              <AccessTimeIcon />{" "}
                              <span>
                                {" "}
                                {time_left(
                                  eventsDetails?.start_date,
                                  eventsDetails?.start_time,
                                  eventsDetails?.end_date,
                                  eventsDetails?.end_time,
                                )}
                              </span>{" "}
                            </li>
                            <li>
                              {eventsDetails?.mode_of_event === "offline" ? (
                                <>
                                  {" "}
                                  <img src={offlineicon} alt='' /> Offline{" "}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img src={onlineicon} alt='' /> Online{" "}
                                </>
                              )}
                            </li>
                            <li>
                              {" "}
                              <SchoolRoundedIcon />{" "}
                              {eventsDetails?.enrold_students} enrolled{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='sk-social-icon sk-desktopSocial-icon'>
                        <h6>Share this article</h6>
                        <ul>
                          <li>
                            <FacebookShareButton url={currentUrl}>
                              <img src={facebookicon} alt='Facebook' />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <LinkedinShareButton url={currentUrl}>
                              <img src={linkedinicon} alt='LinkedIn' />
                            </LinkedinShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              url={currentUrl}
                              image={eventsDetails?.image}
                            >
                              <img src={twittericon} alt='Twitter' />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <PinterestShareButton
                              url={currentUrl}
                              media={eventsDetails?.image}
                            >
                              <img src={pintresticon} alt='Pinterest' />
                            </PinterestShareButton>
                          </li>
                          <li>
                            <a
                              href='https://www.instagram.com/'
                              target='_blank'
                            >
                              <img src={instagramicon} alt='instagramicon' />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h2>{eventsDetails?.title}</h2>
                    <div
                      className='sk-card-description'
                      dangerouslySetInnerHTML={{
                        __html: makeHtml(eventsDetails?.about_event),
                      }}
                    />
                    {/* <div className='sk-work-detail'>
                      <h4>Workshop Details</h4>
                      <ul>
                        <li>
                          <span>Duration</span> - 60 min
                        </li>
                        <li>
                          <span>Language</span> - English, Hindi
                        </li>
                        <li>
                          <span>Charges</span> - Free
                        </li>
                        <li>
                          <span>Joining Link</span> - https://fsdfgsgs.com
                        </li>
                        <li>
                          <span>Awards</span> - Yes
                        </li>
                      </ul>
                    </div>
                    <div className='sk-eventImportant-info'>
                      <h5>
                        <ErrorRoundedIcon /> Important Information
                      </h5>
                      <ul>
                        <li>Covid 19 Safety Measures</li>
                        <li>Gates for the event open at 6:00 PM</li>
                        <li>No Age Limit</li>
                        <li>
                          Please carry your booking confirmation email/message
                        </li>
                      </ul>
                    </div> */}
                    <div className='sk-social-icon sk-mobileSocial-icon'>
                      <h6>Share this article</h6>
                      <ul>
                        <li>
                          <FacebookShareButton url={currentUrl}>
                            <img src={facebookicon} alt='Facebook' />
                          </FacebookShareButton>
                        </li>
                        <li>
                          <LinkedinShareButton url={currentUrl}>
                            <img src={linkedinicon} alt='LinkedIn' />
                          </LinkedinShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            url={currentUrl}
                            image={eventsDetails?.image}
                          >
                            <img src={twittericon} alt='Twitter' />
                          </TwitterShareButton>
                        </li>
                        <li>
                          <PinterestShareButton
                            url={currentUrl}
                            media={eventsDetails?.image}
                          >
                            <img src={pintresticon} alt='Pinterest' />
                          </PinterestShareButton>
                        </li>
                        <li>
                          <a href='https://www.instagram.com/' target='_blank'>
                            <img src={instagramicon} alt='instagramicon' />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='sk-event-add'>
                      <a
                        href={eventDetailsBannerAds[0]?.url_adds}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {detect.isMobile
                          ? eventDetailsBannerAds[0]?.image_mobile && (
                              <img
                                src={eventDetailsBannerAds[0]?.image_mobile}
                                alt=''
                              />
                            )
                          : eventDetailsBannerAds[0]?.image && (
                              <img
                                src={eventDetailsBannerAds[0]?.image}
                                alt=''
                              />
                            )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-xl-3 col-md-4'>
                <div className='sk-event-sidebar'>
                  <div className='sk-event-form'>
                    <h6>Registration Form</h6>

                    <form onSubmit={handleSubmit}>
                      <div className='sk-eventForm-filed'>
                        <input
                          type='text'
                          name='fullName'
                          value={values.fullName}
                          onChange={handleChange}
                          touched={touched}
                          onBlur={handleBlur}
                          className='form-control'
                          placeholder='Enter Full Name'
                        />
                        <span>
                          <AccountBoxRoundedIcon />
                        </span>
                      </div>
                      {errors.fullName && (
                        <span className='sk-error-message'>
                          {errors.fullName}
                        </span>
                      )}
                      <div className='sk-eventForm-filed'>
                        <input
                          type='email'
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                          touched={touched}
                          onBlur={handleBlur}
                          className='form-control'
                          placeholder='Email Id'
                        />
                        <span>
                          <EmailIcon />
                        </span>
                      </div>
                      {errors.email && (
                        <span className='sk-error-message'>{errors.email}</span>
                      )}
                      <div className='sk-eventForm-filed'>
                        <input
                          type='text'
                          name='whatsappNumber'
                          value={values.whatsappNumber}
                          onChange={handleChange}
                          touched={touched}
                          onBlur={handleBlur}
                          className='form-control'
                          placeholder='Whatsapp Number'
                        />
                        <span>
                          <CallIcon />
                        </span>
                      </div>
                      {errors.whatsappNumber && (
                        <span className='sk-error-message'>
                          {errors.whatsappNumber}
                        </span>
                      )}
                      <ul>
                        <div className='sk-eventForm-filed'>
                          {/* <input
                            type='text'
                            name='gender'
                            value={values.gender}
                            onChange={handleChange}
                            touched={touched}
                            onBlur={handleBlur}
                            className='form-control'
                            placeholder='Gender'
                          /> */}

                          <select
                            name='gender'
                            value={values.gender}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            touched={touched}
                            autoComplete='off'
                          >
                            <option>Select Gender</option>
                            {Gender.map((Gender) => (
                              <option key={Gender} value={Gender}>
                                {Gender}
                              </option>
                            ))}
                          </select>
                          <span>
                            <AccountBoxRoundedIcon />
                          </span>
                        </div>

                        <div className='sk-eventForm-filed'>
                          <input
                            type='text'
                            name='location'
                            value={values.location}
                            onChange={handleChange}
                            touched={touched}
                            onBlur={handleBlur}
                            className='form-control'
                            placeholder='Location'
                          />
                          <span>
                            <FmdGoodRoundedIcon />
                          </span>
                        </div>
                        {errors.gender && (
                          <span className='sk-error-message'>
                            {errors.gender}
                          </span>
                        )}
                        {errors.location && (
                          <span className='sk-error-message'>
                            {errors.location}
                          </span>
                        )}
                      </ul>
                      <div className='sk-eventForm-filed'>
                        <input
                          type='text'
                          name='instituteName'
                          value={values.instituteName}
                          onChange={handleChange}
                          touched={touched}
                          onBlur={handleBlur}
                          className='form-control'
                          placeholder='Institute Name'
                        />
                        <span>
                          <SchoolRoundedIcon />
                        </span>
                      </div>
                      {errors.instituteName && (
                        <span className='sk-error-message'>
                          {errors.instituteName}
                        </span>
                      )}
                      {eventsDetails?.id &&
                        Object.entries(eventsDetails?.extra_info).map(
                          (key, index) => {
                            return (
                              <div>
                                <div className='sk-eventForm-filed'>
                                  <input
                                    name='extra_info_reg'
                                    type='text'
                                    placeholder={key[0]}
                                    autoComplete='off'
                                    onChange={(e) => {
                                      if (extraInfo.length < 0) {
                                        extraInfo.push({
                                          [key[0]]: e.target.value,
                                        });
                                      } else {
                                        let newIndex = extraInfo.findIndex(
                                          (item) => {
                                            return (
                                              Object.keys(item)[0] === key[0]
                                            );
                                          },
                                        );

                                        if (newIndex !== -1) {
                                          extraInfo[newIndex][key[0]] =
                                            e.target.value;
                                        } else {
                                          extraInfo.push({
                                            [key[0]]: e.target.value,
                                          });
                                        }
                                      }
                                      setExtraInfo([...extraInfo]);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  {errors.extra_info_reg && (
                                    <span className='sk-error-message'>
                                      {errors.extra_info_reg}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          },
                        )}
                      <div className='sk-eventForm-filed'>
                        <button type='submit' className='sk-submit-btn'>
                          {" "}
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className='sk-add-slidebar'>
                    <a
                      href={eventDetailsBoxAds[0]?.url_adds}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {detect.isMobile
                        ? eventDetailsBoxAds[0]?.image_mobile && (
                            <img
                              src={eventDetailsBoxAds[0]?.image_mobile}
                              alt=''
                            />
                          )
                        : eventDetailsBoxAds[0]?.image && (
                            <img src={eventDetailsBoxAds[0]?.image} alt='' />
                          )}
                    </a>
                  </div>
                  <div className='sk-like-event'>
                    <YouMayLikeCarousel />
                    {/* <h5>
                    <span>
                      <FavoriteBorderIcon />
                    </span>{" "}
                    You May Like
                  </h5>
                  <div className='sk-slide-img'>
                    <img src={eventslideimg} />
                  </div>
                  <h6>10 mistakes to avoid while choosing an Ideal Career</h6> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {whatsAppModal()}

      <Footer loginPage={false} />
    </div>
  );
};

export default EventDetails;
