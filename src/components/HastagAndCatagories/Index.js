import React, { useEffect, useState } from "react";
import "./index.scss";
import SocialMediaIcons from "./SocialMediaIcons";
import blogcategoryicon from "../../assets/images/blogcategoryicon.svg";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import YouMayLikeCarousel from "../Carousel/YouMayLikeCarousel";
import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { addEmailToClient } from "../../utils/utils";

export const HashtagAndCatagories = (props) => {
  const {
    title,
    image,
    hashtags = [],
    rightOne = [],
    rightTwo = [],
    addEmail,
    type = "",
  } = props;
  const detect = useDeviceDetect();
  const history = useHistory();
  const [showAll, setShowAll] = useState(false);

  const handleToggleView = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleClick = (tag) => {
    if (type === "hashtag") {
      history.push(`${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag}`);
    } else {
      history.push(`${routingConstants.MORE_BLOG}${tag}`);
    }
  };

  const renderedHashtags = showAll ? hashtags : hashtags.slice(0, 5);

  const [stopPosition, setStopPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const rightColElement = document.getElementById('right-col');
      // const headerElement = document.querySelector('.header-class');
      const stickyHeight = rightColElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const headerHeight = 0;
      const adjustedViewportHeight = viewportHeight - headerHeight;
      const stop = viewportHeight - stickyHeight;

      if (stickyHeight > adjustedViewportHeight) {
        setStopPosition(stop);
      } else {
        setStopPosition(headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='HashtagAndCatagories' id="right-col" style={{ top: `${stopPosition}px` }}>
      <div className='HashtagAndCatagoriesTitle'>
      <div><img src={image} alt='image' /></div>
        <h2>{title}</h2>
      </div>
      <div className='HashtagAndCatagoriesTitle'>
        {type === "hashtag"
          ? renderedHashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag?.slug)}
              >
                {type === "hashtag" ? `#${tag?.name}` : tag?.name}
              </span>
            ))
          : renderedHashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag?.slug)}
              >
                {type === "hashtag" ? `${tag?.name}` : tag?.name}
              </span>
            ))}
        {hashtags.length > 5 && (
          <span
            className='hashtage-item hashtage-item-view'
            onClick={handleToggleView}
          >
            {showAll ? "View Less " : "View All "}
            {showAll ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <ExpandMoreRoundedIcon />
            )}
          </span>
        )}
      </div>
      <div className='fristAdd'>
        {rightOne.length > 0 && (
          <div onClick={() => addEmailToClient(rightOne[0]?.add_email)}>
            <a href={rightOne[0]?.url_adds} target='_blank' rel='noreferrer'>
              {detect.isMobile
                ? rightOne[0]?.image_mobile && (
                    <img
                      src={rightOne[0]?.image_mobile}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )
                : rightOne[0]?.image && (
                    <img
                      src={rightOne[0]?.image}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )}
            </a>
          </div>
        )}
      </div>
      <div>
        <SocialMediaIcons />
      </div>
      <div className='secondAdd'>
        {rightTwo.length > 0 && (
          <div onClick={() => addEmailToClient(rightTwo[0]?.add_email)}>
            <a href={rightTwo[0]?.url_adds} target='_blank' rel='noreferrer'>
              {detect.isMobile
                ? rightTwo[0]?.image_mobile && (
                    <img
                      src={rightTwo[0]?.image_mobile}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )
                : rightTwo[0]?.image && (
                    <img
                      src={rightTwo[0]?.image}
                      alt=''
                      className='ads_story_cover_img'
                    />
                  )}
            </a>
          </div>
        )}
      </div>
      <div>
        <YouMayLikeCarousel />
      </div>
    </div>
  );
};
