import React, { useState } from "react";
import "./index.scss";

import useDeviceDetect from "../../hooks/useDeviceDetect";

import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";

export const HashtagAndCatagoriesForMobile = (props) => {
  const { title, image, hashtags = [], type = "" } = props;
  const detect = useDeviceDetect();
  const history = useHistory();

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

  return (
    <div className='HashtagAndCatagories-mobile'>
      <div className='HashtagAndCatagoriesTitle-mobile'>
        <img src={image} alt='#' />
        <h5>{title}</h5>
      </div>
      <div className='HashtagAndCatagoriesTitle-mobile'>
        {type === "hashtag"
          ? hashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag)}
              >
                {type === "hashtag" ? `#${tag?.name}` : tag?.name}
              </span>
            ))
          : hashtags.map((tag) => (
              <span
                className='hashtage-item'
                key={tag.id}
                onClick={() => handleClick(tag)}
              >
                {type === "hashtag" ? `${tag?.name}` : tag?.name}
              </span>
            ))}
      </div>
    </div>
  );
};
