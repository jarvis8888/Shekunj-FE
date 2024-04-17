import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import Book_img from "../../assets/images/Guidance/Book_img.png";
import bookcounsellor from "../../assets/images/animationbanner.png";
import usericon from "../../assets/images/usericon.svg";
import emailidicon from "../../assets/images/emailicon.svg";
import wnoicon from "../../assets/images/wicon.svg";
import qualificationsicon from "../../assets/images/qualificationicon.svg";
import purposeicon from "../../assets/images/purpuseicon.svg";
import dobicon from "../../assets/images/calendaricon.svg";
import logo from "../../assets/icons/logo_white.svg";
import video from "../../assets/images/bookvideo.png";
import CloseIcon from "@mui/icons-material/Close";

import CountUp from "react-countup";
import "./index.scss";
import "../LoginPage/LoginForm/LoginTabs/index.scss";
import "aos/dist/aos.css";
import "animate.css";
import Aos from "aos";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { apiConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import { toast } from "react-toastify";
import toasterConfig from "../../utils/toasterCongig";
import { blockInvalidChar } from "../../utils/utils";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { SEO } from "../../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
// import Calendar from "../../../assets/icons/calendar.png";
function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

// const today = new Date();

const days = range(1, 31);
const years = range(1970, 2023);
const highEducation = ["10th", "12th", "Graduation", "Post Graduation"];
const GenderCategory = ["Male", "Female"];
const GuidancePurpose = [
  "Career Guidance",
  "Business Support",
  "Medical Guidance",
  "Personal issues",
  "other",
];
// const courseLookingFor = ["Java", "Python", "JavaScript", ".Net"];

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const GuidancePage = () => {
  const { t } = useTranslation();
  const detect = useDeviceDetect();

  const [open, setOpen] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const getAllPopUpData = async (latitude, longitude) => {
    try {
      const url = `private_adds/popup_adds?latitude=${latitude}&longitude=${longitude}`;
      const res = await httpServices.get(url);
      const { popup_adds } = res;
      const homePagePopups = popup_adds.filter(
        (item) => item.popup_adds_on_page === "book_counsellor_page",
      );
      if (homePagePopups.length > 0) {
        const firstPopup = homePagePopups[0];

        if (firstPopup.popup_type === "image") {
          setMediaType("image");
          setAdvertiser(firstPopup);
        } else if (firstPopup.popup_type === "video") {
          setMediaType("video");
          setAdvertiser(firstPopup);
        }
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getAllPopUpData(latitude, longitude);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")

        // If the location is blocked, you can set default values for latitude and longitude
        const defaultLatitude = 0;
        const defaultLongitude = 0;
        getAllPopUpData(defaultLatitude, defaultLongitude);
      },
    );
  }, []);

  const StudentInitialValues = {
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    date_of_birth: "",
    qualifications: "",
    guidance_purpose: "",
    institute_name: "",
    message: "",
    gender: "",
  };
  const StudentValidationSchema = Yup.object({
    first_name: Yup.string()
      .trim()
      .required("Frist Name is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Full Name should not contain numbers or special characters",
      ),
    last_name: Yup.string()
      .trim()
      .required("Last Name is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Full Name should not contain numbers or special characters",
      ),
    date_of_birth: Yup.string().required("DOB is required"),
    email_address: Yup.string()
      .required(t("login.form1.emailError.required"))
      .email(t("login.form1.emailError.invalid")),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Number must be 10 digits")
      .required("Number is required"),
    qualifications: Yup.string().required("Qualifications is required"),
    guidance_purpose: Yup.string().required("Select the purpose"),
    institute_name: Yup.string().trim(),
    message: Yup.string().trim().required("Message is required"),
    gender: Yup.string().required("Gender is required"),
  });
  const onStudentFormSubmit = useFormik({
    initialValues: StudentInitialValues,
    // validationSchema: StudentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await httpServices.post(
          apiConstants.GUIDANCE.BOOK_SESSION,
          values,
        );
        if (res.status_code === 200) {
          toast.success(res.message, toasterConfig);
          resetForm();
          setOpen(true);
        }
      } catch (error) {
      } finally {
      }
    },
  });
  const {
    values: StudentValue,
    errors: StudentError,
    touched: StudentTouched,
    handleChange: StudentHandleChange,
    validate: StudentValidate,
    handleBlur: StudentHandleBlur,
    handleSubmit: StudentHandleSubmit,
    isSubmitting: StudentIsSubmitting,
  } = onStudentFormSubmit;

  const InstituteInitialValues = {
    institute_name: "",
    students: "",
    email_address: "",
    guidance_purpose: "",
    mobile_number: "",
  };
  const InstituteValidationSchema = Yup.object({
    institute_name: Yup.string()
      .trim()
      .required("Institute is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Institute Name should not contain numbers or special characters",
      ),
    students: Yup.number().positive().required("No of students is required"),
    email_address: Yup.string()
      .required(t("login.form1.emailError.required"))
      .email(t("login.form1.emailError.invalid")),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Number must be 10 digits")
      .required("Number is required"),
    guidance_purpose: Yup.string().required("Select the purpose"),
  });
  const onInstituteFormSubmit = useFormik({
    initialValues: InstituteInitialValues,
    validationSchema: InstituteValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await httpServices.post(
          apiConstants.GUIDANCE.BOOK_SESSION_INSTITUTE,
          values,
        );
        if (res.status_code === 200) {
          toast.success(res.message, toasterConfig);

          resetForm();
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });
  const {
    values: InstituteValue,
    errors: InstituteError,
    touched: InstituteTouched,
    handleChange: InstituteHandleChange,
    validate: InstituteValidate,
    handleBlur: InstituteHandleBlur,
    handleSubmit: InstituteHandleSubmit,
    isSubmitting: InstituteIsSubmitting,
  } = onInstituteFormSubmit;

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  const FormSuccessModal = () => {
    return (
      <>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={open}
          onClose={() => setOpen(false)}
          className='ModalBoxEvent'
        >
          <div className='ModalBodyBoxEvent'>
            <CloseIcon className='ModalClose' onClick={() => setOpen(false)} />
            <section>
              <div className='bookCpopup'>
                <div className='row align-items-center'>
                  <div className={advertiser ? "col-md-4" : "col-md-4 mx-auto"}>
                    <div className='BookContentBox'>
                      <h3>Thank You</h3>
                      <p>for reaching out for counseling with </p>
                      <img src={logo} alt='logo' />
                      <p>
                        Our team will connect with you shortly. Please ensure
                        you're available to make the most of your upcoming
                        session.{" "}
                      </p>
                    </div>
                  </div>
                  {advertiser ? (
                    <div className='col-md-8'>
                      <div className='videoBox'>
                        {mediaType === "image" &&
                          (detect.isMobile ? (
                            <>
                              {" "}
                              <img
                                src={advertiser?.file_mobile}
                                alt='advertiser'
                              />
                            </>
                          ) : (
                            <>
                              <img src={advertiser?.file} alt='advertiser' />
                            </>
                          ))}
                        {mediaType === "video" &&
                          (detect.isMobile ? (
                            <video controls>
                              <source
                                src={advertiser?.file_mobile}
                                type='video/mp4'
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <video controls>
                              <source src={advertiser?.file} type='video/mp4' />
                              Your browser does not support the video tag.
                            </video>
                          ))}
                        <div className='sk-open-btn'>
                          <button
                            className='sk-btn-submit'
                            onClick={() => handleRedirect(advertiser?.url_adds)}
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </Modal>
      </>
    );
  };

  const currentUrl = window.location.href;
  return (
    <>
      <SEO
        title=' Get Free Online Counselling For Women in India - Shekunj.com'
        currentUrl={currentUrl}
        link={currentUrl}
        description='Choose the right path for you to get free
         online counselling by the best counsellors in India, career counselling, business
          counselling, mental health counselling.'
        keywords='free online counselling in India, online free career counselling, free business counselling, mental health counselling, medical counselling, best counsellors in Indore'
      />
      <div>
        <div className='guidance_book noselect'>
          {
            <section className='sk-bookc-sec'>
              <div className='container sk-custom-container'>
                <div className='row align-items-center'>
                  <div className='col-md-6 col-xl-6 col-lg-6'>
                    <div className='sk-bookC-content'>
                      <div className='mb-4'>
                        <h6>Get Free Online Counselling Session</h6>
                        <h3>From Finest Counsellors.</h3>
                      </div>

                      <div className='sk-bookTab-sec'>
                        <form onSubmit={StudentHandleSubmit}>
                          <div className='sk-inline-field'>
                            <ul>
                              <li>
                                <input
                                  type='text'
                                  id=''
                                  placeholder='Enter First Name*'
                                  name='first_name'
                                  value={StudentValue.first_name}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={usericon} alt='usericon' />
                                </span>
                                {StudentError.first_name &&
                                  StudentTouched.first_name && (
                                    <div className='sk-form-error'>
                                      {StudentError.first_name}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='text'
                                  id=''
                                  placeholder='Enter Last Name*'
                                  name='last_name'
                                  value={StudentValue.last_name}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={usericon} alt='usericon' />
                                </span>
                                {StudentError.last_name &&
                                  StudentTouched.last_name && (
                                    <div className='sk-form-error'>
                                      {StudentError.last_name}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='email'
                                  placeholder='Email Id*'
                                  name='email_address'
                                  value={StudentValue.email_address}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={emailidicon} alt='emailidicon' />
                                </span>
                                {StudentError.email_address &&
                                  StudentTouched.email_address && (
                                    <div className='sk-form-error'>
                                      {StudentError.email_address}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='number'
                                  placeholder='Whatsapp Number*'
                                  id='mobile_number'
                                  name='mobile_number'
                                  value={StudentValue.mobile_number}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  onKeyDown={blockInvalidChar}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={wnoicon} alt='wnoicon' />
                                </span>
                                {StudentError.mobile_number &&
                                  StudentTouched.mobile_number && (
                                    <div className='sk-form-error'>
                                      {StudentError.mobile_number}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <select
                                  id='gender'
                                  className='sk-custom-select'
                                  name='gender'
                                  value={StudentValue.gender}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched.gender}
                                  autoComplete='off'
                                >
                                  <option>Gender*</option>
                                  {GenderCategory.map((gender) => (
                                    <option key={gender} value={gender}>
                                      {gender}
                                    </option>
                                  ))}
                                </select>
                                <span className='sk-filed-icon'>
                                  <img src={usericon} alt='gendericon' />
                                </span>
                                {StudentError.gender &&
                                  StudentTouched.gender && (
                                    <div className='sk-form-error'>
                                      {StudentError.gender}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <DatePicker
                                  selected={
                                    StudentValue.date_of_birth
                                      ? new Date(StudentValue.date_of_birth)
                                      : null
                                  }
                                  id='date_of_birth'
                                  name='date_of_birth'
                                  placeholderText={
                                    StudentValue.date_of_birth === ""
                                      ? "DOB*"
                                      : ""
                                  }
                                  onBlur={StudentHandleBlur}
                                  onChange={(date) => {
                                    const formattedDate = date
                                      ? date.toISOString().split("T")[0]
                                      : "";
                                    onStudentFormSubmit.setFieldValue(
                                      "date_of_birth",
                                      formattedDate,
                                    );
                                  }}
                                  autoComplete='off'
                                  showYearDropdown // Show the year dropdown
                                  showMonthDropdown // Show the month dropdown
                                  dropdownMode='select'
                                  // dateFormat='yyyy-MM-dd'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={dobicon} alt='calendar' />
                                </span>
                                {StudentError.date_of_birth &&
                                  StudentTouched.date_of_birth && (
                                    <div className='sk-form-error'>
                                      {StudentError.date_of_birth}
                                    </div>
                                  )}
                              </li>

                              <li>
                                <select
                                  className='sk-custom-select'
                                  id='qualifications'
                                  name='qualifications'
                                  value={StudentValue.qualifications}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                >
                                  <option>Qualification*</option>
                                  {highEducation.map((highEducation) => (
                                    <option
                                      key={highEducation}
                                      value={highEducation}
                                    >
                                      {highEducation}
                                    </option>
                                  ))}
                                </select>
                                <span className='sk-filed-icon'>
                                  <img
                                    src={qualificationsicon}
                                    alt='qualificationsicon'
                                  />
                                </span>
                                {StudentError.qualifications &&
                                  StudentTouched.qualifications && (
                                    <div className='sk-form-error'>
                                      {StudentError.qualifications}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='text'
                                  id='institute_name'
                                  placeholder='Institute Name'
                                  name='institute_name'
                                  value={StudentValue.institute_name}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched.institute_name}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img
                                    src={qualificationsicon}
                                    alt='qualificationsicon'
                                  />
                                </span>
                                {StudentError.institute_name &&
                                  StudentTouched.institute_name && (
                                    <div className='sk-form-error'>
                                      {StudentError.institute_name}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <select
                                  className='sk-custom-select'
                                  id='guidance_purpose'
                                  name='guidance_purpose'
                                  value={StudentValue.guidance_purpose}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                >
                                  <option>Select Purpose*</option>
                                  {GuidancePurpose.map((GuidancePurpose) => (
                                    <option
                                      key={GuidancePurpose}
                                      value={GuidancePurpose}
                                    >
                                      {GuidancePurpose}
                                    </option>
                                  ))}
                                </select>
                                <span className='sk-filed-icon'>
                                  <img src={purposeicon} alt='purposeicon' />
                                </span>
                                {StudentError.guidance_purpose &&
                                  StudentTouched.guidance_purpose && (
                                    <div className='sk-form-error'>
                                      {StudentError.guidance_purpose}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='text'
                                  placeholder='Message'
                                  id='message'
                                  name='message'
                                  value={StudentValue.message}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                <span className='sk-filed-icon'>
                                  <img src={purposeicon} alt='purposeicon' />
                                </span>
                                {StudentError.message &&
                                  StudentTouched.message && (
                                    <div className='sk-form-error'>
                                      {StudentError.message}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='sk-sendMain-btn'>
                            <button
                              type='submit'
                              className='sk-btn-submit'
                              disabled={StudentIsSubmitting}
                            >
                              {StudentIsSubmitting ? "Submitting..." : "Submit"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 col-xl-6 col-lg-6'>
                    <div className='sk-bookC-img'>
                      <img src={bookcounsellor} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

          {/* <section className='sk-bookC-counter'>
            <div className='container sk-custom-container '>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='sk-bookC-contentinner'>
                    <ul>
                      <li>
                        <h3>
                          <CountUp end={1800} duration={5} separator=',' />+
                        </h3>
                        <p>highly renowned Career Counsellor</p>
                      </li>
                      <li>
                        <h3>
                          <CountUp end={250} duration={5} separator=',' />M
                        </h3>
                        <p>Students Impacted</p>
                      </li>
                      <li>
                        <h3>
                          <CountUp end={250} duration={5} separator=',' />+
                        </h3>
                        <p>Partner Schools & college</p>
                      </li>
                      <li>
                        <h3>
                          <CountUp end={1200} duration={5} separator=',' />+
                        </h3>
                        <p>Courses & Mock Test</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
      {FormSuccessModal()}
    </>
  );
};

export default withHeaderFooter(GuidancePage);
