import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setCollapseSuccessStory,
  successStories as fetchSuccessStories,
} from "../../store/courses/action";

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

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [faqBoxAdds, setFaqBoxAdds] = useState([]);
  const [adds, setAdds] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [expandedQuestions, setExpandedQuestions] = useState([]);

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
                return item.image_type == "Faq_index";
              });
              setFaqBoxAdds(filterArray1);
              // console.log("filterArray1Faq_index",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "Faq_index";
            });
            setFaqBoxAdds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

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
          console.log("addEmailresponse", response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
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

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreFAQ' />
      <div className='help-container'>
        <h1>
          HOW CAN WE <span>HELP YOU</span>
        </h1>
      </div>
      <div className='faqs-container'>
        <div className='tabs-container'>
          {tabs.map((tab) => (
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
            {questions
              .filter((q) => q.tabId === activeTab)
              .map((q) => (
                <div key={q.id} className='question'>
                  <div
                    className='question-header'
                    onClick={() => toggleQuestion(q.id)}
                  >
                    <div className='question-text'>{q.question}</div>
                    <div>
                      <img src={downArrow_icon} alt='arrow' />
                    </div>
                  </div>
                  {expandedQuestions.includes(q.id) && (
                    <div className='faqs-question-answer'>{q.answer}</div>
                  )}
                </div>
              ))}
          </div>
          <div className='technical-support'>
            <div>
              <div className='technical-title'>Technical Support</div>
              <div className='technical-description'>
                If you have some additional question, please contact our Help
                Desk
              </div>
            </div>
            <div class='input-container'>
              <input type='email' placeholder='Email id' />
              <button>Send</button>
            </div>
          </div>
        </div>

        <div>adds</div>
      </div>
      <Footer loginPage={false} />
    </div>
  );
}
export default FaqPage;
