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
  SocialShare,
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
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import locationicon from "../../assets/images/location.svg";
import eventemailsend from "../../assets/images/eventemailsend.svg";
import gendericon from "../../assets/images/gendericon.svg";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import onlineicon from "../../assets/images/onlineicon.svg";
import offlineicon from "../../assets/images/offline-icon.svg";
import { getAllEvents, singleEventDetails } from "../../store/events/action";
import { getUserProfile } from "../../store/auth/action";
import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import { Button, Typography, Modal, Box } from "@mui/material";
import Cookies from "js-cookie";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import CloseIcon from "@mui/icons-material/Close";
import httpServices from "../../utils/ApiServices";
import { makeHtml, time_left } from "../../utils/utils";
import YouMayLikeCarousel from "../../components/Carousel/YouMayLikeCarousel";
import { toast } from "react-toastify";
import toasterConfig from "../../utils/toasterCongig";
import { CustomLoader } from "../../components/customLoader/CustomLoader";

const Gender = ["Male", "Female", "Others"];

const EventDetails = () => {
  let a = JSON.parse(localStorage.getItem("login_data"));
  let eventData = JSON.parse(localStorage.getItem("event_data"));
  const { id } = useParams();
  const lastNumber = id.split("-").pop();
  const [open, setOpen] = useState(false);

  const currentUrl = window.location.href;
  const history = useHistory();
  const { events, isLoading } = useSelector((state) => state.eventsReducer);
  const { bookEvents } = useSelector((state) => state.eventsReducer);
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

  //logic
  const initialValues = {
    fullName: eventData == null ? localData?.name : eventData?.name || "",
    email: eventData == null ? localData?.email : eventData?.email || "",
    gender: "",
    location: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Select Gender"),
    location: Yup.string().required("Location is required"),
  });
  const onRegistrationFormSubmit = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { fullName, email, gender, location } = values;

      const extraInfoReg = {}; // Initialize the extra_info_reg object

      // Construct the extra_info_reg object with key-value pairs
      for (const [key, value] of Object.entries(extraInfo)) {
        extraInfoReg[key] = value;
      }

      const data = {
        event_id: lastNumber,
        email: email,
        name: fullName,
        last_name: "",
        city: location,
        contact: "",
        gender: gender,
        extra_info_reg: extraInfoReg,
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
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = onRegistrationFormSubmit;

  const getEventDetailById = async (id) => {
    setLoading(true);
    try {
      const res = await httpServices.get("more/event" + "/" + id);
      setEventsDetails(res?.data);
      setExtraInfo(res?.data?.extra_info);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetailById(lastNumber);
  }, [lastNumber, lan, id]);

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
      <Header loginPage={true} page='more' />
      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='sk-eventDetails-sec'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-8 col-md-8'>
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
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: time_left(
                                    eventsDetails?.start_date,
                                    eventsDetails?.start_time,
                                    eventsDetails?.end_date,
                                    eventsDetails?.end_time,
                                  ),
                                }}
                              ></span>{" "}
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
                        <SocialShare
                          currentUrl={currentUrl}
                          title={eventsDetails?.title}
                          image={eventsDetails?.image}
                        />
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
                      <SocialShare
                        currentUrl={currentUrl}
                        title={eventsDetails?.title}
                        image={eventsDetails?.image}
                      />
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
              <div class='col-xl-4 col-md-4'>
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
                        <span className='sk-icon-set'>
                          <img src={gendericon} />
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
                        <span className='sk-icon-set'>
                          <img src={eventemailsend} />
                        </span>
                      </div>
                      {errors.email && (
                        <span className='sk-error-message'>{errors.email}</span>
                      )}
                      <ul>
                        <div className='sk-eventForm-filed'>
                          <select
                            name='gender'
                            value={values.gender}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            touched={touched}
                            autoComplete='off'
                          >
                            <option>Gender</option>
                            {Gender.map((Gender) => (
                              <option key={Gender} value={Gender}>
                                {Gender}
                              </option>
                            ))}
                          </select>
                          <span className='sk-icon-set'>
                            <img src={gendericon} />
                          </span>
                          {errors.gender && (
                            <span className='sk-error-message'>
                              {errors.gender}
                            </span>
                          )}
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
                          <span className='sk-icon-set'>
                            <img src={locationicon} />
                          </span>
                          {errors.location && (
                            <span className='sk-error-message'>
                              {errors.location}
                            </span>
                          )}
                        </div>
                      </ul>

                      {eventsDetails?.id &&
                        Object.entries(eventsDetails?.extra_info).map(
                          (key, index) => {
                            const propertyName = key[0];

                            return (
                              <>
                                <div className='sk-eventForm-filed'>
                                  <input
                                    name='extra_info_reg'
                                    type='text'
                                    placeholder={propertyName}
                                    // value={extraInfo[key[0]] || ""}
                                    autoComplete='off'
                                    onChange={(e) => {
                                      const updatedValue = e.target.value;
                                      if (!extraInfo.hasOwnProperty(key[0])) {
                                        extraInfo[key[0]] = updatedValue;
                                      } else {
                                        extraInfo[key[0]] = updatedValue;
                                      }
                                      setExtraInfo((prevExtraInfo) => ({
                                        ...prevExtraInfo,
                                        [key[0]]: updatedValue,
                                      }));
                                    }}
                                  />
                                  <span className='sk-icon-set'>
                                    <CircleRoundedIcon />
                                  </span>
                                </div>
                                {errors.extra_info_reg && (
                                  <span className='sk-error-message'>
                                    {errors.extra_info_reg}
                                  </span>
                                )}
                              </>
                            );
                          },
                        )}
                      <div className='sk-eventForm-filed'>
                        <button
                          type='submit'
                          className='sk-submit-btn'
                          disabled={isSubmitting}
                        >
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
