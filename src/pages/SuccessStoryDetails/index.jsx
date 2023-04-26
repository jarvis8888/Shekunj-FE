import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import "../HomePage/index.scss";
import "./index.scss";
import { adsList } from "../../store/ads";
import axios from "axios";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { successStoriesDetails as fetchSuccessStoriesDetails } from "../../store/courses/action";
import { useParams } from "react-router-dom";
import { Footer, Header, SEO } from "../../components";
import photo from "../../assets/icons/svgs/exphoto.png";
import { TrendingStories } from "../SuccessStories/TrendingStories";
import twitter1 from "../../assets/images/twitter1.png";
import facebook from "../../assets/images/facebook.png";
import youTube from "../../assets/images/youTube.png";
import linkedinlogo from "../../assets/images/linkedinlogo.png";
import instagram from "../../assets/images/instagram.png";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";

const SuccessStoryDetails = () => {
  const { successStoriesDetails } = useSelector((state) => {
    return state.coursesReducer;
  });
  const dispatch = useDispatch();
  // ("Blogssssss", blogs);
  const { lan } = useSelector((state) => state.languageReducer);
  // ("langggggg", lan);
  const { t } = useTranslation();

  const { id } = useParams();
  

  const [storyDetailsBoxAds, setStoryDetailsBoxAds] = useState([]);
  const detect = useDeviceDetect();

  useEffect(() => {
    dispatch(fetchSuccessStoriesDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
                return item.image_type == "success_stories_details";
              });
              setStoryDetailsBoxAds(filterArray1);
              // ("filterArray1blog_details",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "blog_details";
            });
            setStoryDetailsBoxAds(filterArray1);
            // ("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // const addEmail = (email) => {
  //   // ("addEmail", email);
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .post("/private_adds/click_add/", {
  //         // add_email:`${adds[0]?.add_email}`
  //         add_email: email,
  //         latitude: params.latitude.toString(),
  //         longitude: params.longitude.toString(),
  //       })
  //       .then((response) => {
  //         // setAdds(response.data.results);
  //         // ("addEmailresponse", response);
  //       });
  //   });
  // };
  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='story' subPage='moreStory  ' />
      <div className='story-details-container'>
        <div className='story-image-container'>
          <img src={photo} alt='Story' className='img' />
          <div className='story-bottom'>
            <div className='hashtags-container'>
              <div>
                <span>#travel</span>
                <span>#adventure</span>
                <span>#photography</span>
              </div>
              <div>
                <span>
                  <img src={time} alt='time' width={14} height={14} />1 week
                </span>
                <span>
                  <img src={book} alt='time' width={14} height={14} />5 mins to
                  read
                </span>
              </div>
            </div>
            <div class='social-media'>
              <h6>Share this article</h6>
              <a href='#'>
                <i class='fa fa-facebook'>
                  <img src={facebook} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-twitter'>
                  {" "}
                  <img
                    src={linkedinlogo}
                    alt='twitter1'
                    width={34}
                    height={34}
                  />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={twitter1} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={instagram} alt='twitter1' width={34} height={34} />
                </i>
              </a>
              <a href='#'>
                <i class='fa fa-instagram'>
                  {" "}
                  <img src={youTube} alt='twitter1' width={34} height={34} />
                </i>
              </a>
            </div>
          </div>
          <h4 className='story-tittle'>Dipti Sangare</h4>
          <h5 className='story-sub-tittle'>HR Manager, Company Name</h5>
          <h6 className='description'>
            Meet Dipti Sangare, one of our potential members!
          </h6>
          <div>
            Dipti is quite diligent and visionary, these qualities of hers make
            her unique from others. Being a Fresh Postgraduate, she started her
            career by doing multiple internships and working as a Freelancer.
            Later on, she got the chance by Shekunj.com to work with R Dot
            Ventures as Human Resources Executive. Dipti is very hard-working as
            well as dedicated to her work, and this sincerity helped her get
            promoted to an HR Manager! She was provided with profound erudition
            in every possible way by us.
          </div>
          <div>
            The knowledge and experience she acquired, now delivering and
            empowering other women in the field of Human Resources as she's now
            the Official Trainer of Shekunj.com.
          </div>
          {/* <TrendingStories /> */}
        </div>
        <div className='add-section-container'>
          <img src='path-to-add-image' alt='Advertisement' />
        </div>
      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default SuccessStoryDetails;
