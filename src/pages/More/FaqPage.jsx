import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setCollapseSuccessStory,
  successStories as fetchSuccessStories,
} from "../../store/courses/action";
import * as Yup from "yup";
import { Header, Footer } from "../../components";
import down1 from "../../assets/icons/down1.png";
import up from "../../assets/icons/up.png";
import double_quote from "../../assets/icons/double_quote.png";
import global from "../../assets/images/Success/global.png";
import "./faq.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getFaq as fetchFaq } from "../../store/faq/action";
import { adsList } from "../../store/ads";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import downArrow_icon from "../../assets/icons/svgs/downArrow.png";
import add_icon from "../../assets/icons/svgs/exAddPhoto.png";

import httpServices from "../../utils/ApiServices";
import { constants } from "../../utils";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useFormik } from "formik";
import { apiConstants } from "../../utils/constants";
import { toast } from "react-toastify";
import toasterConfig from "../../utils/toasterCongig";

const tabs = [
  { id: 1, name: "About Us" },
  { id: 2, name: "Courses" },
  { id: 3, name: "Mock Test" },
  { id: 4, name: "Events" },
  { id: 5, name: "Profile" },
];
const questions = [
  {
    id: 1,
    tabId: 1,
    question: "What is your company's mission?",
    answer: "Our mission is to provide quality education to everyone.",
  },
  {
    id: 2,
    tabId: 1,
    question: "What is your company's history?",
    answer:
      "We were founded in 2010 and have since grown to become one of the leading education providers in the country.",
  },
  {
    id: 3,
    tabId: 2,
    question: "What courses do you offer?",
    answer:
      "We offer a wide range of courses in various fields such as computer science, business, and engineering.",
  },
  {
    id: 4,
    tabId: 2,
    question: "What are the prerequisites for your courses?",
    answer:
      "The prerequisites vary depending on the course. Please refer to the course description for more information.",
  },
  {
    id: 5,
    tabId: 3,
    question: "Do you offer mock tests for exams?",
    answer:
      "Yes, we offer mock tests for various exams such as GRE, GMAT, and TOEFL.",
  },
  {
    id: 6,
    tabId: 3,
    question: "How can I access the mock tests?",
    answer: "You can access the mock tests through our online platform.",
  },
  {
    id: 7,
    tabId: 4,
    question: "What kind of events do you organize?",
    answer:
      "We organize various events such as workshops, seminars, and conferences.",
  },
  {
    id: 8,
    tabId: 4,
    question: "How can I participate in your events?",
    answer: "You can register for our events through our website.",
  },
  {
    id: 9,
    tabId: 5,
    question: "How can I update my profile information?",
    answer:
      "You can update your profile information through your account settings.",
  },
  {
    id: 10,
    tabId: 5,
    question: "How can I delete my account?",
    answer: "You can delete your account through your account settings.",
  },
];

function FaqPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [faqBoxAdds, setFaqBoxAdds] = useState([]);
  const [adds, setAdds] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [faqQuestionsData, setFaqQuestionsData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const getFaqsData = async () => {
    setLoading(true);
    try {
      const url = `more/faqs`;
      const { data } = await httpServices.get(url);
      const { faq_categories, Faqs_list } = data;
      setFaqData(faq_categories);
      setFaqQuestionsData(Faqs_list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqsData();
  }, [lan]);

  useEffect(() => {
    dispatch(adsList());
    const successCallback = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
        );
        const filterArray1 = response.data.results.filter(
          (item) => item.image_type === "Faq_index",
        );
        setFaqBoxAdds(filterArray1);
      } catch (error) {
        console.error(error);
        axios.get(`/private_adds/private_add`).then((response) => {
          const filterArray1 = response.data.results.filter(
            (item) => item.image_type === "Faq_index",
          );
          setFaqBoxAdds(filterArray1);
        });
      }
    };
    const errorCallback = (error) => {
      console.error("Error Code = " + error.code + " - " + error.message);
      axios.get(`/private_adds/private_add`).then((response) => {
        const filterArray1 = response.data.results.filter(
          (item) => item.image_type === "Faq_index",
        );
        setFaqBoxAdds(filterArray1);
      });
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const addEmail = async (email) => {
    try {
      const position = await navigator.geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };

      const response = await axios.post("/private_adds/click_add/", {
        add_email: email,
        latitude: params.latitude,
        longitude: params.longitude,
      });

      console.log("addEmailresponse", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const toggleQuestion = (id) => {
    if (expandedQuestions.includes(id)) {
      setExpandedQuestions((prev) => prev.filter((q) => q !== id));
    } else {
      setExpandedQuestions((prev) => [...prev, id]);
    }
  };
  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onSupportFormSubmit = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email } = values;
      const data = {
        email_address: email,
      };

      try {
        const res = await httpServices.post(
          apiConstants.FAQ.FAQ_TECHNICAL_SUPPORT,
          data,
        );
        toast.success(res.message, toasterConfig);
        resetForm();
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
  } = onSupportFormSubmit;

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreFAQ' />
      <div className='help-container'>
        <h1>
          HOW CAN WE <span>HELP YOU</span>
        </h1>
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className='faqs-container'>
          <div className='tabs-container'>
            {faqData?.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className='questions-container-wrapper'>
            <div className='questions-container'>
              {faqQuestionsData.filter((q) => q.id === activeTab).length ? (
                faqQuestionsData
                  .filter((q) => q.id === activeTab)
                  .map((q) => (
                    <div key={q.id} className='question'>
                      <div
                        className='question-header'
                        onClick={() => toggleQuestion(q.id)}
                      >
                        <div
                          className='question-text'
                          dangerouslySetInnerHTML={{
                            __html: makeHtml(q.question),
                          }}
                        />

                        <div>
                          <img src={downArrow_icon} alt='arrow' />
                        </div>
                      </div>
                      {expandedQuestions.includes(q.id) && (
                        <div
                          className='faqs-question-answer'
                          dangerouslySetInnerHTML={{
                            __html: makeHtml(q.answer),
                          }}
                        />
                      )}
                    </div>
                  ))
              ) : (
                <p>No questions available.</p>
              )}
            </div>
            <div className='technical-support'>
              <div>
                <div className='technical-title'>Technical Support</div>
                <div className='technical-description'>
                  If you have some additional question, please contact our Help
                  Desk
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div class='input-container'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email id'
                    value={values.email}
                    onChange={handleChange}
                    touched={touched}
                    onBlur={handleBlur}
                  />
                  <button type='submit'>Send</button>
                </div>
                {errors.email && (
                  <div className='sk-error-message'>{errors.email}</div>
                )}
              </form>
            </div>
          </div>

          <div>
            <a href={faqBoxAdds[0]?.url_adds} target='_blank' rel='noreferrer'>
              {detect.isMobile
                ? faqBoxAdds[0]?.image_mobile && (
                    <img
                      src={faqBoxAdds[0]?.image_mobile}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )
                : faqBoxAdds[0]?.image && (
                    <img
                      src={faqBoxAdds[0]?.image}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )}
            </a>
          </div>
        </div>
      )}
      <Footer loginPage={false} />
    </div>
  );
}
export default FaqPage;
