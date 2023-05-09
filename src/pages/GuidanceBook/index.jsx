import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StyledEngineProvider } from "@mui/material/styles";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GuidanceSelect from "./Select";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
// import "react/datepicker/dist/react-datepicker.css"
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Calendar from "../../assets/images/MyProfile/calendar.png";
// import Gender from "../../assets/icons/gender.png";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EastSharpIcon from "@mui/icons-material/EastSharp";
import Book_img from "../../assets/images/Guidance/Book_img.png";
import bookcounsellor from "../../assets/images/Bookcoun.png";

import Polygon1 from "../../assets/images/Guidance/Polygon1.png";
import Polygon2 from "../../assets/images/Guidance/Polygon2.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import User2 from "../../assets/icons/user2.png";
import User3 from "../../assets/icons/user3.png";
import mail2 from "../../assets/icons/mail2.png";
import phone from "../../assets/icons/phone2.png";
import "./index.scss";
import "../LoginPage/LoginForm/LoginTabs/index.scss";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import "aos/dist/aos.css";
import "animate.css";
import Aos from "aos";
import * as Yup from "yup";
import { useFormik } from "formik";
import { withFormik } from "formik";
import { Error } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { bookCounseller } from "../../store/guidance/action";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTranslation } from "react-i18next";
import axios from "axios";
import add2 from "../../assets/images/add2.jpg";
import { adsList } from "../../store/ads";
import City from "../../assets/icons/city.png";
import Edit from "../../assets/icons/edit.png";

import { Helmet } from "react-helmet-async";
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Student");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [bookCounsellorAds, setBookCounsellorAds] = useState([]);
  const [image, setImage] = useState("NA");

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const StudentInitialValues = {};
  const StudentValidationSchema = Yup.object({});
  const onStudentFormSubmit = useFormik({
    initialValues: StudentInitialValues,
    validationSchema: StudentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const {
        fullName,
        email,
        whatsappNumber,
        gender,
        location,
        instituteName,
      } = values;
      const data = {};
      try {
      } catch (error) {
      } finally {
      }
    },
  });
  const {
    values: StudentValue,
    errors: StudentError,
    touched: StudentTouched,
    handleChange: StudentHandleChnage,
    validate: StudentValidate,
    handleBlur: StudentHandleBlur,
    handleSubmit: StudentHandleSubmit,
    setFieldValue,
    setValues,
    setFieldTouched,
    isSubmitting,
  } = onStudentFormSubmit;
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
                              name=''
                            />
                            <label>, I am</label>
                            <select>
                              <option value=''>Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <label>year old and</label>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <label>My last qualifications </label>
                            <select>
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
                            <select>
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
                          <div className='form-inline sk-inline-field'>
                            <label>You can call me on </label>
                            <input type='Number' placeholder='Mobile Number' />
                            <label>or call me at </label>
                            <input type='email' placeholder='Enter Id' />
                            <label>.</label>
                          </div>
                          <div className='sk-sendMain-btn'>
                            <button type='submit' className='sk-btn-submit'>
                              Send Enquiry <EastSharpIcon />{" "}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form>
                          <div className='form-inline sk-inline-field'>
                            <label>Hey, This is </label>
                            <input
                              type='text'
                              id=''
                              placeholder='Name of Institute'
                              name=''
                            />
                            <label>, We have</label>
                            <input
                              type='text'
                              id=''
                              placeholder='No of Students'
                              name=''
                            />
                            <label>in our institution.</label>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <label>We are looking for</label>
                            <select>
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
                            <label>.</label>
                          </div>
                          <div className='form-inline sk-inline-field'>
                            <label>You can call me on </label>
                            <input type='Number' placeholder='Mobile Number' />
                            <label>or call me at </label>
                            <input type='email' placeholder='Enter Id' />
                            <label>.</label>
                          </div>
                          <div className='sk-sendMain-btn'>
                            <button type='submit' className='sk-btn-submit'>
                              Send Enquiry <EastSharpIcon />{" "}
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
