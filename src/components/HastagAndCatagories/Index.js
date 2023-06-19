import React, { useState } from "react";
import "./index.scss";
import SocialMediaIcons from "./SocialMediaIcons";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import YouMayLikeCarousel from "../Carousel/YouMayLikeCarousel";
import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
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
      history.push(
        `${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag.name}`,
        tag.name,
      );
    } else {
      history.push(
        `${routingConstants.MORE_BLOG_CATEGORY}?category_id=${tag.name}`,
        tag.id,
      );
    }
  };

  const renderedHashtags = showAll ? hashtags : hashtags.slice(0, 3);

  return (
    <div className='HashtagAndCatagories'>
      <div className='HashtagAndCatagoriesTitle'>
        <img src={image} alt='#' />
        <h5>{title}</h5>
      </div>
      <div className='HashtagAndCatagoriesTitle'>
        {type === "hashtag"
          ? renderedHashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag)}
              >
                {type === "hashtag" ? `#${tag?.name}` : tag?.name}
              </span>
            ))
          : renderedHashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag)}
              >
                {type === "hashtag" ? `${tag?.name}` : tag?.name}
              </span>
            ))}
        {hashtags.length > 3 && (
          <span className='hashtage-item' onClick={handleToggleView}>
            {showAll ? "View Less" : "View All"}
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
