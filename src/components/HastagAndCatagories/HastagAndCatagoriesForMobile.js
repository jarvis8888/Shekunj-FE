import React from "react";
import "./index.scss";

import useDeviceDetect from "../../hooks/useDeviceDetect";

import { useHistory } from "react-router-dom";
import { routingConstants } from "../../utils/constants";

export const HashtagAndCatagoriesForMobile = (props) => {
  const { title, image, hashtags = [], type = "" } = props;
  const detect = useDeviceDetect();
  const history = useHistory();

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
                onClick={() =>
                  history.push(
                    `${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag.name}`,
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
    </div>
  );
};
