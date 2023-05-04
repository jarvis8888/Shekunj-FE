import React from "react";
import "./index.scss";
import SocialMediaIcons from "./SocialMediaIcons";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import YouMayLikeCarousel from "../Carousel/YouMayLikeCarousel";
import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";

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

  return (
    <div className='HashtagAndCatagories'>
      <div className='HashtagAndCatagoriesTitle'>
        <img src={image} alt='#' />
        <h4>{title}</h4>
      </div>
      <div className='HashtagAndCatagoriesTitle'>
        {type === "hashtag"
          ? hashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() =>
                  history.push(
                    `${routingConstants.SUCCESS_STORIES_HASHTAG}?search=${tag.name}`,
                    tag.name,
                  )
                }
              >
                {type === "hashtag" ? `#${tag?.name}` : tag?.name}
              </span>
            ))
          : hashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() =>
                  history.push(
                    `${routingConstants.MORE_BLOG_CATEGORY}?category_id=${tag.name}`,
                    tag.id,
                  )
                }
              >
                {type === "hashtag" ? `${tag?.name}` : tag?.name}
              </span>
            ))}
      </div>
      <div className='fristAdd'>
        {rightOne.length > 0 && (
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
        )}
      </div>
      <div>
        <SocialMediaIcons />
      </div>
      <div className='secondAdd'>
        {rightTwo.length > 0 && (
          
            <a href={rightTwo[0]?.url_adds} target='_blank' rel='noreferrer'>
              {detect.isMobile
                ? rightTwo[0]?.image_mobile && (
                    <img
                      src={rightTwo[0]?.image_mobile}
                      alt='Image'
                      className='ads_story_cover_img'
                    />
                  )
                : rightTwo[0]?.image && (
                    <img
                      src={rightTwo[0]?.image}
                      alt='Image'
                      className='ads_story_cover_img'
                    />
                  )}
            </a>
          
        )}
      </div>
      <div>
        <YouMayLikeCarousel />
      </div>
    </div>
  );
};
