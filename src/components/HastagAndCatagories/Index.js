import React from "react";
import "./index.scss";
import SocialMediaIcons from "./SocialMediaIcons";
import useDeviceDetect from "../../hooks/useDeviceDetect";

export const HashtagAndCatagories = (props) => {
  const {
    title,
    image,
    firstAdd,
    hashtags = [],
    rightOne = [],
    rightTwo = [],
    addEmail,
  } = props;
  const detect = useDeviceDetect();
  return (
    <div className='HashtagAndCatagories'>
      <div className='title'>
        <img src={image} alt='#' />
        <h4>Trending Hastag</h4>
      </div>
      <div className='hashtags'>
        {hashtags.map((tag) => (
          <span className='hashtage-item' key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
      <div className='fristAdd'>
        {" "}
        {rightOne.length > 0 && (
          <div
            className='col-md-12 ads_home_cover'
            onClick={() => addEmail(rightOne[0]?.add_email)}
          >
            <a href={rightOne[0]?.url_adds} target='_blank' rel='noreferrer'>
              {detect.isMobile
                ? rightOne[0]?.image_mobile && (
                    <img
                      src={rightOne[0]?.image_mobile}
                      alt='Image'
                      className='ads_story_cover_img'
                    />
                  )
                : rightOne[0]?.image && (
                    <img
                      src={rightOne[0]?.image}
                      alt='Image'
                      className='ads_story_cover_img'
                    />
                  )}
            </a>
          </div>
        )}
      </div>
      <div>{/* <SocialMediaIcons /> */}</div>
      <div className='secondAdd'>
        {" "}
        {rightTwo.length > 0 && (
          <div
            className='col-md-12 ads_home_cover'
            onClick={() => addEmail(rightTwo[0]?.add_email)}
          >
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
          </div>
        )}
      </div>
    </div>
  );
};
