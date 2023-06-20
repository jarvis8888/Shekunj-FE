import React, { useState } from "react";
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
      history.push(
        `${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag.name}`,
        tag.name,
      );
    } else {
      history.push(`${routingConstants.MORE_BLOG}${tag.name}`, tag.name);
    }
  };

  const renderedHashtags = showAll ? hashtags : hashtags.slice(0, 5);

  return (
    <div className='HashtagAndCatagories'>
      <div className='HashtagAndCatagoriesTitle'>
        <img src={image} alt='image' />
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
        {hashtags.length > 5 && (
          <span className='hashtage-item hashtage-item-view' onClick={handleToggleView}>
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
