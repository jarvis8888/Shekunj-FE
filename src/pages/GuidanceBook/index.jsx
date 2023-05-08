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
import EastSharpIcon from '@mui/icons-material/EastSharp';
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
const years = range(1970, 2021);
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
  const { isLoading } = useSelector((state) => state.guidanceReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    first_name: Yup.string().required(t("login.form1.firstNameError.required")),
    last_name: Yup.string().required(t("login.form1.lastNameError.required")),
    // City: Yup.string().required(t("login.form1.CityError.required")),
    email_address: Yup.string()
      .required(t("login.form1.emailError.required"))
      .email(t("login.form1.emailError.invalid")),
    mobile_number: Yup.number().positive(),
    message: Yup.string().required(t("login.form1.message.required")),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      mobile_number: "",
      city: "",
      // day: "",
      // month: "",
      // year: "",
      date_of_birth: "",
      qualifications: "",
      gender: "",
      guidance_purpose: "",
      // course_looking_for: "",
      message: "",
      // date:"",
      // value:""
    },
    validationSchema,
    onSubmit(values) {
      // const dateOfBirth = moment(
      //   `${values?.year}-${values.month}-${values?.day}`,
      // ).format("YYYY-MM-DD");
      // const date_of_birth = moment(values.date_of_birth, 'DD-MM-YYYY').format('YYYY-MM-DD')
      const date_of_birth = moment(`${values.date_of_birth}`).format(
        "YYYY-MM-DD",
      );
      values = {
        ...values,
        // date_of_birth: dateOfBirth,
        date_of_birth: date_of_birth,
        qualifications: values?.qualifications,
        gender: values?.gender,
      };
      dispatch(bookCounseller(values));
    },
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const ValidatedForm = withFormik({
    mapPropsToValues: () => ({
      date: null,
    }),

    validate: (values) => {
      const errors = {};

      if (!values.date) {
        errors.date = "please select a date";
      }
      return errors;
    },
  });

  const [bookCounsellorAds, setBookCounsellorAds] = useState([]);
  const [image, setImage] = useState("NA");
  // const [value,setValue]= React.useState(null);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  // useEffect(() => {
  // 	axios.get('/private_adds/private_add?image_type=book_counsellor')
  // 		.then((response) => {
  // 			setBookCounsellorAds(response.data.results);
  // 		});
  // }, [])

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
        });
    });
  };
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
  //             return item.image_type == "book_counsellor";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setBookCounsellorAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>latest code below>>>>>>>>>>>>>>>>>>>>>>>>>>

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
                return item.image_type == "book_counsellor";
              });
              setBookCounsellorAds(filterArray1);
              // console.log("filterArray1book_counsellor",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "book_counsellor";
            });
            setBookCounsellorAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

  return (
    <div>
      <Header loginPage={true} page='guidance' subPage='bookCounsller' />
      <div className='guidance_book noselect'>

      <Helmet>
        <title>Get Free Online Counselling For Women in India - Shekunj.com</title>
        <link rel="canonical" href="https://www.shekunj.com/online-counselling" />
        <meta name="description" content="Choose the right path for you to get free
         online counselling by the best counsellors in India, career counselling, business
          counselling, mental health counselling."/>
        <meta name="keywords" content="free online counselling in India, online free career counselling,        
 free business counselling, mental health counselling, medical counselling, best counsellors in Indore"/>
      </Helmet>

       <section className="sk-bookc-sec">
        <div className="container">
          <div className="row align-items-center">
              <div className="col-md-8">
                <div className="sk-bookC-content">
                  <h6>Get Free Online Counselling Session</h6>
                  <h2>From Finest Counsellors.</h2>
                  <div className="sk-toggle-btn">

                  </div>
                  <div className="sk-bookTab-sec">
                  <form>
                    <div className="form-inline sk-inline-field">
                      <label>Hey, My name is </label>
                      <input type="text" placeholder="Full Name" />
                      <label>, I am</label>
                        <select>
                          <option>Year</option>
                          <option>1991</option>
                          <option>1992</option>
                        </select>
                        <label>year old and</label>
                    </div>
                    <div className="form-inline sk-inline-field">
                      <label>My last qualifications </label>
                      <select>
                          <option>Qualification</option>
                          <option>BCA</option>
                          <option>MCA</option>
                      </select>
                      <label>. I am looking for  </label>
                      <label>, I am</label>
                        <select>
                          <option>Select Purpose</option>
                          <option>1991</option>
                          <option>1992</option>
                        </select>
                        <label>.</label>
                    </div>
                    <div className="form-inline sk-inline-field">
                      <label>You can call me on </label>
                      <input type="Number" placeholder="Mobile Number" />
                      <label>or call me at </label>
                      <input type="email" placeholder="Enter Id" />
                      <label>.</label>
                    </div>
                    <div className="sk-sendMain-btn">
                      <button type="submit" className="sk-btn-submit">Send Enquiry <EastSharpIcon /> </button>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sk-bookC-img">
                  <img src={bookcounsellor} />
                </div>
              </div>
          </div>
        </div>
       </section>

       <section>
          <div className="container">
            
          </div>
       </section>

      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default GuidancePage;
