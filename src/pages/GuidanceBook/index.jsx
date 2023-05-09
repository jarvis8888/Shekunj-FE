import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import Book_img from "../../assets/images/Guidance/Book_img.png";
import bookcounsellor from "../../assets/images/Bookcoun.png";

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
            content='free online counselling in India, online free career counselling,        
 free business counselling, mental health counselling, medical counselling, best counsellors in Indore'
          />
        </Helmet>

        {
          <section className='sk-bookc-sec'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-8'>
                  <div className='sk-bookC-content'>
                    <h6>Get Free Online Counselling Session</h6>
                    <h2>From Finest Counsellors.</h2>
                    <div className='sk-toggle-btn'>
                      <span
                        className={`${
                          activeTab === "Student" && "sk-toggle-active "
                        }`}
                        onClick={() => setActiveTab("Student")}
                      >
                        Student
                      </span>
                      <span
                        className={`${
                          activeTab === "institute" && "sk-toggle-active "
                        }`}
                        onClick={() => setActiveTab("institute")}
                      >
                        institute
                      </span>
                    </div>
                    <div className='sk-bookTab-sec'>
                      {activeTab === "Student" ? (
                        <form onSubmit={StudentHandleSubmit}>
                          <div className='form-inline sk-inline-field'>
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
                            <label>, I am</label>
                            <select
                              id='age'
                              name='age'
                              value={StudentValue.age}
                              onBlur={StudentHandleBlur}
                              onChange={StudentHandleChange}
                              touched={StudentTouched}
                              autoComplete='off'
                            >
                              <option value=''>Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <label>year old and</label>
                          </div>
                          {StudentError.full_name &&
                            StudentTouched.full_name && (
                              <div className='sk-form-error'>
                                {StudentError.full_name}
                              </div>
                            )}
                          {StudentError.age && StudentTouched.age && (
                            <div className='sk-form-error'>
                              {StudentError.age}
                            </div>
                          )}
                          <div className='form-inline sk-inline-field'>
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
                          </div>
                          {StudentError.qualifications &&
                            StudentTouched.qualifications && (
                              <div className='sk-form-error'>
                                {StudentError.qualifications}
                              </div>
                            )}
                          {StudentError.guidance_purpose &&
                            StudentTouched.guidance_purpose && (
                              <div className='sk-form-error'>
                                {StudentError.guidance_purpose}
                              </div>
                            )}
                          <div className='form-inline sk-inline-field'>
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
                          </div>
                          {StudentError.mobile_number &&
                            StudentTouched.mobile_number && (
                              <div className='sk-form-error'>
                                {StudentError.mobile_number}
                              </div>
                            )}
                          {StudentError.email_address &&
                            StudentTouched.email_address && (
                              <div className='sk-form-error'>
                                {StudentError.email_address}
                              </div>
                            )}
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
                          </div>
                          {InstituteError.institute_name &&
                            InstituteTouched.institute_name && (
                              <div className='sk-form-error'>
                                {InstituteError.institute_name}
                              </div>
                            )}
                          {InstituteError.students &&
                            InstituteTouched.students && (
                              <div className='sk-form-error'>
                                {InstituteError.students}
                              </div>
                            )}
                          <div className='form-inline sk-inline-field'>
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
                          </div>
                          {InstituteError.guidance_purpose &&
                            InstituteTouched.guidance_purpose && (
                              <div className='sk-form-error'>
                                {InstituteError.guidance_purpose}
                              </div>
                            )}
                          <div className='form-inline sk-inline-field'>
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
                          </div>
                          {InstituteError.mobile_number &&
                            InstituteTouched.mobile_number && (
                              <div className='sk-form-error'>
                                {InstituteError.mobile_number}
                              </div>
                            )}
                          {InstituteError.email_address &&
                            InstituteTouched.email_address && (
                              <div className='sk-form-error'>
                                {InstituteError.email_address}
                              </div>
                            )}
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

        <section>
          <div className='container'></div>
        </section>
      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default GuidancePage;
