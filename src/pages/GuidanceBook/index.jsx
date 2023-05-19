import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import Book_img from "../../assets/images/Guidance/Book_img.png";
import bookcounsellor from "../../assets/images/Bookcoun.png";
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
  const [activeTab, setActiveTab] = useState("Student");
  const targetSectionRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const StudentInitialValues = {
    full_name: "",
    email_address: "",
    mobile_number: "",
    age: "",
    qualifications: "",
    guidance_purpose: "",
  };
  const StudentValidationSchema = Yup.object({
    full_name: Yup.string().required("Full Name is required"),
    age: Yup.string().required("Age is required"),
    email_address: Yup.string()
      .required(t("login.form1.emailError.required"))
      .email(t("login.form1.emailError.invalid")),
    mobile_number: Yup.number().positive().required("Number is required"),
    qualifications: Yup.string().required("Qualifications is required"),
    guidance_purpose: Yup.string().required("Select the purpose"),
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
    institute_name: Yup.string().required("Institute is required"),
    students: Yup.number().positive().required("No of students is required"),
    email_address: Yup.string()
      .required(t("login.form1.emailError.required"))
      .email(t("login.form1.emailError.invalid")),
    mobile_number: Yup.number().positive().required("Number is required"),
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

  useEffect(() => {
    targetSectionRef.current.focus();
  }, []);
  return (
    <div>
      <Header loginPage={true} page='guidance' subPage='bookCounsller' />
      <div className='guidance_book noselect'>
        <Helmet>
          <title>
            Get Free Online Counselling For Women in India - Shekunj.com
          </title>
          <link
            rel='canonical'
            href='https://www.shekunj.com/online-counselling'
          />
          <meta
            name='description'
            content='Choose the right path for you to get free
         online counselling by the best counsellors in India, career counselling, business
          counselling, mental health counselling.'
          />
          <meta
            name='keywords'
            content='free online counselling in India, online free career counselling, free business counselling, mental health counselling, medical counselling, best counsellors in Indore'
          />
        </Helmet>{
          <section className='sk-bookc-sec'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-8'>
                  <div className='sk-bookC-content'>
                    <h6>Get Free Online Counselling Session</h6>
                    <h2>From Finest Counsellors.</h2>
                    <div className='sk-toggle-btn'>
                      <span className={`${activeTab === "Student" && "sk-toggle-active"}`} onClick={() => setActiveTab("Student")}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1504 14.6227L13.7331 13.0308C13.4549 11.9335 12.543 11.1144 11.4148 10.9753L10.4103 10.8363L10.1013 9.93991C10.163 9.89355 10.2403 9.84719 10.3022 9.80084C11.2913 9.66177 12.3577 9.44541 13.0068 9.07446C13.1305 8.99717 13.1614 8.84268 13.0841 8.70352C12.775 8.16255 12.5123 7.35898 12.3577 6.7871C12.4504 6.57074 12.5277 6.32343 12.5277 5.968C12.5277 5.27256 12.4195 4.85525 12.1723 4.63888C12.1259 4.57711 12.0641 4.54617 12.0177 4.51523C11.8323 2.35162 10.1168 0.666992 7.99947 0.666992C5.88219 0.666992 4.16668 2.33611 3.98122 4.51523C3.93487 4.54617 3.87299 4.577 3.84216 4.62347C3.59485 4.85525 3.47121 5.27257 3.47121 5.96801C3.47121 6.32344 3.54851 6.57074 3.64122 6.78711C3.48663 7.35891 3.22391 8.16259 2.91485 8.70353C2.85307 8.8426 2.86849 8.9972 2.99214 9.07447C3.64124 9.44542 4.70762 9.66178 5.69673 9.80085C5.7585 9.8472 5.8358 9.89356 5.89767 9.93992L5.58861 10.8363L4.5841 10.9754C3.45593 11.13 2.54401 11.9335 2.26588 13.0308L1.84858 14.6227C1.80222 14.8081 1.83316 14.9781 1.95681 15.1173C2.06505 15.2564 2.23494 15.3337 2.40495 15.3337H13.6406C13.826 15.3337 13.996 15.2564 14.0887 15.1173C14.1659 14.9782 14.1968 14.7927 14.1505 14.6227L14.1504 14.6227ZM5.71206 4.08252C5.75842 4.19075 5.85113 4.25253 5.95936 4.25253H10.024C10.1322 4.25253 10.2249 4.19075 10.2713 4.08252L10.503 3.47978C10.5494 3.85072 10.5803 4.28346 10.6885 4.71619H5.29475C5.40299 4.28346 5.43382 3.86615 5.48018 3.47978L5.71206 4.08252ZM10.0703 5.19526L10.024 6.09164C10.024 6.24623 9.88488 6.36977 9.73028 6.36977H8.94212C8.78753 6.36977 8.66399 6.26153 8.64845 6.10705L8.54021 5.17971H10.0703L10.0703 5.19526ZM7.42749 5.19526L7.31925 6.1226C7.30383 6.2772 7.18018 6.38532 7.02558 6.38532H6.23741C6.08282 6.38532 5.94375 6.26167 5.94375 6.10719L5.89739 5.21081L7.42744 5.21071L7.42749 5.19526ZM6.14474 11.1608L6.45381 10.2644C6.93288 10.4808 7.44291 10.6199 7.99929 10.6199C8.54026 10.6199 9.05015 10.4808 9.52934 10.2644L9.8384 11.1608C8.72566 11.949 7.24206 11.949 6.14471 11.1608H6.14474ZM7.96846 9.95533C6.43841 9.95533 5.10932 8.76529 4.80023 7.14256C4.76929 7.01891 4.67658 6.91079 4.55293 6.87985C4.50657 6.86443 4.10479 6.74078 4.10479 5.95251C4.10479 5.288 4.22845 5.118 4.29022 5.07153C4.29022 5.07153 4.32116 5.07153 4.33657 5.05611C4.46023 5.30341 4.63024 5.65885 4.69201 6.06062C4.89295 5.76695 5.03201 5.47331 5.14014 5.17964H5.41827L5.46463 6.10698C5.48004 6.52429 5.82006 6.83336 6.23737 6.83336H7.02553C7.4119 6.83336 7.73651 6.53969 7.78284 6.15332L7.9065 5.17964H8.0765L8.20016 6.15332C8.24651 6.53969 8.5711 6.83336 8.95747 6.83336H9.74563C10.1629 6.83336 10.4874 6.50875 10.5184 6.10698L10.5647 5.17964H10.8584C10.9666 5.47331 11.1057 5.76695 11.3065 6.06062C11.3683 5.65882 11.5383 5.30331 11.662 5.05611C11.6929 5.05611 11.7237 5.05611 11.7393 5.07153C11.7702 5.10247 11.8939 5.27247 11.8939 5.93697C11.8939 6.70971 11.4921 6.84877 11.4457 6.86431C11.3221 6.89525 11.2139 7.00338 11.1984 7.12703C10.8585 8.76532 9.52938 9.95525 7.96837 9.95525L7.96846 9.95533Z" />
                          <path d="M8.80296 7.73006C8.49389 8.101 7.47385 8.101 7.16478 7.73006C7.08748 7.63735 6.933 7.62183 6.84017 7.69912C6.74746 7.77642 6.73194 7.9309 6.80923 8.02373C7.05654 8.3174 7.50467 8.4874 7.98377 8.4874C8.46287 8.4874 8.91111 8.30197 9.15831 8.02373C9.2356 7.93102 9.2356 7.77643 9.12737 7.69912C9.03476 7.62183 8.89567 7.62183 8.80296 7.73006Z" />
                          <path d="M7.01067 5.7823C7.01067 5.97861 6.85155 6.13773 6.65524 6.13773C6.45893 6.13773 6.2998 5.97861 6.2998 5.7823C6.2998 5.58588 6.45892 5.42676 6.65524 5.42676C6.85155 5.42676 7.01067 5.58588 7.01067 5.7823Z" />
                          <path d="M9.66887 5.7823C9.66887 5.97861 9.50975 6.13773 9.31344 6.13773C9.11713 6.13773 8.95801 5.97861 8.95801 5.7823C8.95801 5.58588 9.11713 5.42676 9.31344 5.42676C9.50975 5.42676 9.66887 5.58588 9.66887 5.7823Z" />
                        </svg>
                        Student
                      </span>
                      <span className={`${activeTab === "institute" && "sk-toggle-active"}`} onClick={() => setActiveTab("institute")}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.0957 12.6791V15.0362H11.1433V12.6791C11.1433 12.4919 11.0435 12.319 10.8814 12.2254C10.7194 12.1319 10.5197 12.1319 10.3576 12.2254C10.1956 12.319 10.0957 12.4919 10.0957 12.6791Z" />
                          <path d="M7.47656 12.6791V15.0362H8.52418V12.6791C8.52418 12.4919 8.42433 12.319 8.26228 12.2254C8.10022 12.1319 7.90052 12.1319 7.73847 12.2254C7.57642 12.319 7.47656 12.4919 7.47656 12.6791Z" />
                          <path d="M3.28566 5.86963C3.28566 5.78076 3.33068 5.69798 3.40527 5.64969L4.85709 4.71034V2.46484H1.19043V12.1553H1.71424C1.80263 12.1553 1.89056 12.1664 1.97614 12.1884V9.79819H2.49995V12.5108C2.6689 12.7017 2.76209 12.9479 2.76186 13.2029V13.7423C2.95069 13.7724 3.13005 13.8459 3.28567 13.957L3.28566 5.86963ZM3.54757 2.98867H4.07138V4.5601H3.54757V2.98867ZM2.49995 9.27439H1.97614V6.39343H2.49995V9.27439ZM2.49995 5.86963H1.97614V2.98867H2.49995V5.86963Z" />
                          <path d="M4.85742 12.6791V15.0362H5.90504V12.6791C5.90504 12.4919 5.80519 12.319 5.64314 12.2254C5.48108 12.1319 5.28138 12.1319 5.11933 12.2254C4.95727 12.319 4.85742 12.4919 4.85742 12.6791Z" />
                          <path d="M3.80957 6.01232V9.53651H4.33338V7.04841C4.33338 6.72093 4.50806 6.41831 4.7917 6.25453C5.07535 6.09083 5.4247 6.09083 5.70836 6.25453C5.99202 6.41834 6.16668 6.72093 6.16668 7.04841V9.53651H6.69049V6.13175C6.69049 5.66394 6.94012 5.23157 7.34525 4.99771C7.75038 4.76375 8.24965 4.76375 8.65478 4.99771C9.05991 5.23156 9.30954 5.66394 9.30954 6.13175V9.53651H9.83335V7.04841C9.83335 6.72093 10.008 6.41831 10.2917 6.25453C10.5753 6.09083 10.9247 6.09083 11.2083 6.25453C11.492 6.41834 11.6666 6.72093 11.6666 7.04841V9.53651H12.1905V6.01232L7.99998 3.30078L3.80957 6.01232Z" />
                          <path d="M2.43509 14.25C2.24415 14.2502 2.06106 14.3261 1.926 14.4612C1.79096 14.5962 1.71508 14.7793 1.71484 14.9702V15.0357H3.28627V14.9702C3.28604 14.7793 3.21015 14.5962 3.07511 14.4612C2.94007 14.3261 2.75696 14.2502 2.56603 14.25H2.43509Z" />
                          <path d="M14.2864 12.1553H14.8102V2.46484H11.1436V4.71034L12.5954 5.64969C12.67 5.69798 12.715 5.78076 12.715 5.86962V13.9569C12.8706 13.8459 13.05 13.7723 13.2388 13.7423V13.2029C13.2386 12.9479 13.3317 12.7017 13.5007 12.5107V9.79814H14.0245V12.1884C14.1101 12.1664 14.198 12.1553 14.2864 12.1553L14.2864 12.1553ZM12.4531 4.56008H11.9293V2.98865H12.4531V4.56008ZM13.5007 2.98865H14.0245V5.8696H13.5007V2.98865ZM13.5007 9.27436V6.39341H14.0245V9.27436H13.5007Z" />
                          <path d="M12.7149 14.9702V15.0357H14.2863V14.9702C14.286 14.7793 14.2102 14.5962 14.0751 14.4612C13.9401 14.3261 13.757 14.2502 13.566 14.25H13.4351C13.2442 14.2502 13.0611 14.3261 12.926 14.4612C12.791 14.5962 12.7151 14.7793 12.7149 14.9702Z" />
                          <path d="M12.1905 15.036V11.1074H3.80957V15.036H4.33338V12.6788C4.33338 12.3046 4.53308 11.9587 4.85719 11.7716C5.18129 11.5845 5.5807 11.5845 5.90481 11.7716C6.22891 11.9587 6.42862 12.3046 6.42862 12.6788V15.036H6.95243V12.6788C6.95243 12.3046 7.15213 11.9587 7.47624 11.7716C7.80034 11.5845 8.19975 11.5845 8.52385 11.7716C8.84796 11.9587 9.04766 12.3046 9.04766 12.6788V15.036H9.57147V12.6788C9.57147 12.3046 9.77117 11.9587 10.0953 11.7716C10.4194 11.5845 10.8188 11.5845 11.1429 11.7716C11.467 11.9587 11.6667 12.3046 11.6667 12.6788V15.036H12.1905Z" />
                          <path d="M0.666992 1.41699H5.38128V1.9408H0.666992V1.41699Z" />
                          <path d="M8.00057 5.3457C7.79221 5.34594 7.5925 5.42883 7.44518 5.57604C7.29797 5.72336 7.21508 5.92307 7.21484 6.13143V9.53619H8.78627V6.13143C8.78604 5.92307 8.70314 5.72336 8.55594 5.57604C8.40861 5.42883 8.20892 5.34594 8.00057 5.3457Z" />
                          <path d="M10.7503 6.65527C10.5334 6.65551 10.3577 6.83124 10.3574 7.04813V9.53622H11.1431V7.04813C11.1429 6.83124 10.9672 6.65551 10.7503 6.65527Z" />
                          <path d="M1.19079 14.9704C1.19114 14.6746 1.29672 14.3886 1.4887 14.1635C1.68069 13.9385 1.94633 13.789 2.23841 13.7419V13.2025C2.23829 13.0636 2.18299 12.9306 2.08477 12.8323C1.98656 12.7341 1.8535 12.6788 1.7146 12.6787H1.1908C1.05189 12.6788 0.918837 12.7341 0.820627 12.8323C0.722417 12.9306 0.667109 13.0636 0.666992 13.2025V15.0358H1.1908L1.19079 14.9704Z" />
                          <path d="M0.666992 15.5596H15.3337V16.0834H0.666992V15.5596Z" />
                          <path d="M3.80957 10.0596H12.1905V10.5834H3.80957V10.0596Z" />
                          <path d="M14.8103 12.6787H14.2865C14.1476 12.6788 14.0145 12.7341 13.9163 12.8323C13.8181 12.9306 13.7628 13.0636 13.7627 13.2025V13.7419C14.0548 13.789 14.3204 13.9384 14.5124 14.1635C14.7044 14.3886 14.81 14.6746 14.8103 14.9704V15.0359H15.3341V13.2025C15.334 13.0636 15.2787 12.9306 15.1805 12.8324C15.0823 12.7342 14.9492 12.6788 14.8103 12.6787Z" />
                          <path d="M5.25028 6.65527C5.03339 6.65551 4.85766 6.83124 4.85742 7.04813V9.53622H5.64314V7.04813C5.6429 6.83124 5.46717 6.65551 5.25028 6.65527Z" />
                          <path d="M10.6191 1.41699H15.3334V1.9408H10.6191V1.41699Z" />
                        </svg>
                        institute
                      </span>
                    </div>
                    <div
                      className='sk-bookTab-sec'
                      ref={targetSectionRef}
                      tabIndex='-1'
                    >
                      {activeTab === "Student" ? (
                        <form onSubmit={StudentHandleSubmit}>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>Hey, My name is </label>
                                <input
                                  type='text'
                                  id=''
                                  placeholder='Full Name'
                                  name='full_name'
                                  value={StudentValue.full_name}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                {StudentError.full_name &&
                                  StudentTouched.full_name && (
                                    <div className='sk-form-error'>
                                      {StudentError.full_name}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <label>, I am</label>
                                <select
                                  id='age'
                                  name='age'
                                  value={StudentValue.age}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'>
                                  <option value=''>Year</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                                <label>year old and</label>
                                {StudentError.age && StudentTouched.age && (
                                  <div className='sk-form-error'>
                                    {StudentError.age}
                                  </div>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>My last qualifications </label>
                                <select
                                  id='qualifications'
                                  name='qualifications'
                                  value={StudentValue.qualifications}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                >
                                  <option>Qualification</option>
                                  {highEducation.map((highEducation) => (
                                    <option
                                      key={highEducation}
                                      value={highEducation}
                                    >
                                      {highEducation}
                                    </option>
                                  ))}
                                </select>
                                {StudentError.qualifications &&
                                  StudentTouched.qualifications && (
                                    <div className='sk-form-error'>
                                      {StudentError.qualifications}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <label>. I am looking for </label>
                                <label>, I am</label>
                                <select
                                  id='guidance_purpose'
                                  name='guidance_purpose'
                                  value={StudentValue.guidance_purpose}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                >
                                  <option>Select Purpose</option>
                                  {GuidancePurpose.map((GuidancePurpose) => (
                                    <option
                                      key={GuidancePurpose}
                                      value={GuidancePurpose}
                                    >
                                      {GuidancePurpose}
                                    </option>
                                  ))}
                                </select>
                                <label>.</label>
                                {StudentError.guidance_purpose &&
                                  StudentTouched.guidance_purpose && (
                                    <div className='sk-form-error'>
                                      {StudentError.guidance_purpose}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>You can call me on </label>
                                <input
                                  type='number'
                                  placeholder='Mobile Number'
                                  id='mobile_number'
                                  name='mobile_number'
                                  value={StudentValue.mobile_number}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                {StudentError.mobile_number &&
                                  StudentTouched.mobile_number && (
                                    <div className='sk-form-error'>
                                      {StudentError.mobile_number}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <label>or call me at </label>
                                <input
                                  type='email'
                                  placeholder='Enter Id'
                                  name='email_address'
                                  value={StudentValue.email_address}
                                  onBlur={StudentHandleBlur}
                                  onChange={StudentHandleChange}
                                  touched={StudentTouched}
                                  autoComplete='off'
                                />
                                <label>.</label>
                                {StudentError.email_address &&
                                  StudentTouched.email_address && (
                                    <div className='sk-form-error'>
                                      {StudentError.email_address}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='sk-sendMain-btn'>
                            <button type='submit' className='sk-btn-submit'>
                              {StudentIsSubmitting ? (
                                <>
                                  Sending... <EastSharpIcon />
                                </>
                              ) : (
                                <>
                                  Send Enquiry <EastSharpIcon />
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={InstituteHandleSubmit}>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>Hey, This is </label>
                                <input
                                  type='text'
                                  id='institute_name'
                                  placeholder='Name of Institute'
                                  name='institute_name'
                                  value={InstituteValue.institute_name}
                                  onBlur={InstituteHandleBlur}
                                  onChange={InstituteHandleChange}
                                  touched={InstituteTouched}
                                  autoComplete='off'
                                />
                                <label>, We have</label>
                                {InstituteError.institute_name &&
                                  InstituteTouched.institute_name && (
                                    <div className='sk-form-error'>
                                      {InstituteError.institute_name}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <input
                                  type='text'
                                  id='students'
                                  placeholder='No of Students'
                                  name='students'
                                  value={InstituteValue.students}
                                  onBlur={InstituteHandleBlur}
                                  onChange={InstituteHandleChange}
                                  touched={InstituteTouched}
                                  autoComplete='off'
                                />
                                <label>in our institution.</label>

                                {InstituteError.students &&
                                  InstituteTouched.students && (
                                    <div className='sk-form-error'>
                                      {InstituteError.students}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>We are looking for</label>
                                <select
                                  id='guidance_purpose'
                                  name='guidance_purpose'
                                  value={InstituteValue.guidance_purpose}
                                  onBlur={InstituteHandleBlur}
                                  onChange={InstituteHandleChange}
                                  touched={InstituteTouched}
                                  autoComplete='off'
                                >
                                  <option>Select Purpose</option>
                                  {GuidancePurpose.map((GuidancePurpose) => (
                                    <option
                                      key={GuidancePurpose}
                                      value={GuidancePurpose}
                                    >
                                      {GuidancePurpose}
                                    </option>
                                  ))}
                                </select>
                                <label>.</label>
                                {InstituteError.guidance_purpose &&
                                  InstituteTouched.guidance_purpose && (
                                    <div className='sk-form-error'>
                                      {InstituteError.guidance_purpose}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <ul>
                              <li>
                                <label>You can call me on </label>
                                <input
                                  type='number'
                                  placeholder='Mobile Number'
                                  id='mobile_number'
                                  name='mobile_number'
                                  value={InstituteValue.mobile_number}
                                  onBlur={InstituteHandleBlur}
                                  onChange={InstituteHandleChange}
                                  touched={InstituteTouched}
                                  autoComplete='off'
                                />
                                {InstituteError.mobile_number &&
                                  InstituteTouched.mobile_number && (
                                    <div className='sk-form-error'>
                                      {InstituteError.mobile_number}
                                    </div>
                                  )}
                              </li>
                              <li>
                                <label>or call me at </label>
                                <input
                                  type='email'
                                  placeholder='Enter Id'
                                  name='email_address'
                                  value={InstituteValue.email_address}
                                  onBlur={InstituteHandleBlur}
                                  onChange={InstituteHandleChange}
                                  touched={InstituteTouched}
                                  autoComplete='off'
                                />
                                <label>.</label>
                                {InstituteError.email_address &&
                                  InstituteTouched.email_address && (
                                    <div className='sk-form-error'>
                                      {InstituteError.email_address}
                                    </div>
                                  )}
                              </li>
                            </ul>
                          </div>
                          <div className='sk-sendMain-btn'>
                            <button type='submit' className='sk-btn-submit'>
                              {InstituteIsSubmitting ? (
                                <>
                                  Sending... <EastSharpIcon />
                                </>
                              ) : (
                                <>
                                  Send Enquiry <EastSharpIcon />
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='sk-bookC-img'>
                    <img src={bookcounsellor} alt='' />
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
        <section className="sk-bookC-counter">
          <div className='container'>
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
        </section>
      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default GuidancePage;
