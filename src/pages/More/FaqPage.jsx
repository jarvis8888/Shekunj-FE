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
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getFaq as fetchFaq } from "../../store/faq/action";
import { adsList } from "../../store/ads";
import faqsendicon from "../../assets/images/sendfaqicon.svg"
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
import { CustomLoader } from "../../components/customLoader/CustomLoader";

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
      <Header loginPage={true} page='more' subPage='moreFAQ' newDesign />
      <section className='help-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1>
                How can we <span>help you</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div>
          <CustomLoader />
        </div>
      ) : (
        <section className='faqs-container'>
          <div className='container sk-custom-container'>
            <div className='row'>
              <div className='col-xl-2 col-md-3 col-sm-12'>
                <div className="tabs-container">
                <ul>
                {faqData?.map((tab) => (
                  <li
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.name}
                  </li>
                  
                ))}
                </ul>
                </div>
              </div>
              <div className='col-xl-7 col-md-5 questions-container-wrapper'>
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
                              <ExpandMoreRoundedIcon />
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
                      If you have some additional question, please contact our
                      Help Desk
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
                      <button type='submit'>
                        {" "}
                        <span>
                          <img src={faqsendicon} />
                        </span> Send{" "}
                      </button>
                    </div>
                    {errors.email && (
                      <div className='sk-error-message'>{errors.email}</div>
                    )}
                  </form>
                </div>
              </div>
              <div className='col-xl-3 col-md-4'>
                <a
                  href={faqBoxAdds[0]?.url_adds}
                  target='_blank'
                  rel='noreferrer'
                >
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
          </div>
        </section>
      )}
      <Footer loginPage={false} />
    </div>
  );
}
export default FaqPage;
