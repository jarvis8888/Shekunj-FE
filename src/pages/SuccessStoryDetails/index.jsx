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
import TrendingCards from "../../components/cards/TrendingCards";
import fire from "../../assets/icons/svgs/fire.png";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/icons/svgs/hashtag.png";

const SuccessStoryDetails = () => {
  const { successStoriesDetails } = useSelector((state) => {
    return state.coursesReducer;
  });
  const { successStories } = useSelector((state) => {
    return state.coursesReducer;
  });
  const dispatch = useDispatch();
  // ("Blogssssss", blogs);
  const { lan } = useSelector((state) => state.languageReducer);
  // ("langggggg", lan);
  const { t } = useTranslation();

  const { id } = useParams();
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);

  console.log(successStoriesDetails, "successStoriesDetails");

  const [storyDetailsBoxAds, setStoryDetailsBoxAds] = useState([]);
  const detect = useDeviceDetect();

  useEffect(() => {
    dispatch(fetchSuccessStoriesDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
          if (response.data.results.length > 0) {
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right1";
            });

            setSuccesStoriesRight1(filterArray2);
            let filterArray3 = response.data.results.filter((item, index) => {
              return item.image_type === "success_stories_right2";
            });

            setSuccesStoriesRight2(filterArray3);
          }
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
    dispatch(adsList());
  }, [dispatch]);

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

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

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
          <img src={successStoriesDetails?.image} alt='Story' className='img' />
          <div className='story-bottom'>
            <div className='hashtags-container'>
              <div>
                {successStoriesDetails?.hash_tags?.length
                  ? successStoriesDetails?.hash_tags.map((items) => {
                      return <span key={items}>{items}</span>;
                    })
                  : null}
              </div>
              <div>
                <span>
                  <img src={time} alt='time' width={14} height={14} />
                  {successStoriesDetails?.created_at}
                </span>
                <span>
                  <img src={book} alt='time' width={14} height={14} />
                  {successStoriesDetails?.reading_time} to read
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
          <h4 className='story-tittle'>{successStoriesDetails?.name}</h4>
          <h5 className='story-sub-tittle'>
            {successStoriesDetails?.designation}
          </h5>
          <h6 className='description'>{successStoriesDetails?.title}</h6>
          <div
            className='card__description'
            dangerouslySetInnerHTML={{
              __html: makeHtml(`${successStoriesDetails?.description}`),
            }}
          />
          {/* <div>{successStoriesDetails?.description}</div> */}
          <div>
            The knowledge and experience she acquired, now delivering and
            empowering other women in the field of Human Resources as she's now
            the Official Trainer of Shekunj.com.
          </div>
          <div style={{ padding: "20px 0" }}>
            <div className='title'>
              <img src={fire} alt='fire' width={25} height={25} />
              <h4>Trending Stories </h4>
            </div>
            <div className='treading-card-gird'>
              {successStories?.trending_success_stories?.results.length
                ? successStories?.trending_success_stories?.results.map(
                    (items, index) => {
                      return (
                        <>
                          <TrendingCards
                            image={items.image}
                            hashtags={items.hash_tags}
                            title={items.name}
                            description={`${items.title}`}
                            makeHtml={makeHtml}
                            key={index}
                            created_at={items.created_at}
                          />
                        </>
                      );
                    },
                  )
                : null}
            </div>
          </div>

          {/* <TrendingStories /> */}
        </div>
        <div className='add-section-container'>
          <HashtagAndCatagories
            image={hash}
            tittle={`Trending Hastag`}
            firstAdd={succesStoriesRight1}
            addEmail={addEmail}
            hashtags={successStories?.all_hash_tags}
            rightOne={succesStoriesRight1}
            rightTwo={succesStoriesRight2}
          />
        </div>
      </div>
      <Footer loginPage={false} />
    </div>
  );
};

export default SuccessStoryDetails;
