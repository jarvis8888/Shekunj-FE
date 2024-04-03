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

  useEffect(() => {
    Aos.init({ duration: 2000 });
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
    validationSchema: StudentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await httpServices.post(
          apiConstants.GUIDANCE.BOOK_SESSION,
          values,
        );
        if (res.status_code === 200) {
          toast.success(res.message, toasterConfig);
          resetForm();
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
          <section>
            <div className='bookCpopup'>
              <div className='row align-items-center'>
                <div className='col-md-4'>
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
                <div className='col-md-8'>
                  <div className='videoBox'>
                    <img src={video} alt='video' />
                    <div className='sk-open-btn'>
                      <button className='sk-btn-submit'>Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
    </>
  );
};

export default withHeaderFooter(GuidancePage);
