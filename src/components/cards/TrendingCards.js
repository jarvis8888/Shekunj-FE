import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import {
  addHyphensToLink,
  generateSlug,
  removeHtmlTags,
  truncateString,
} from "../../utils/utils";
import { routingConstants } from "../../utils/constants";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHistory } from "react-router-dom";
import { makeHtml } from "../../utils/utils";

const TrendingCards = (data) => {
  const {
    image,
    hashtags = [],
    title,
    description,
    key,
    reading_time,
    id,
    created_at,
    slug,
    ss_count,
  } = data;
  const history = useHistory();
  return (
    <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
      <div
        className='card'
        onClick={() => {
          const hashtagNames = hashtags.map((tag) => tag?.slug);
          const generatedSlug = generateSlug(hashtagNames[0]) || "no-hashtag";
          if (slug) {
            history.push(
              routingConstants.SUCCESS_STORIES + generatedSlug + "/" + slug,
            );
          } else {
            // Handle the case when 'slug' is empty
            // console.log("Slug is empty. Cannot navigate.");
          }
        }}
      >
        <div className='card__image'>
          <img src={image} alt={title} />
        </div>
        <div className='sk-Blogcard-content'>
          <div className='card__hashtags'>
            {hashtags.map((tag, index) => (
              <span
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  history.push(
                    `${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag?.slug}`,
                    tag,
                  );
                }}
              >{`#${tag?.name}`}</span>
            ))}
          </div>
          <h5 className=''>{title}</h5>
          <p
            dangerouslySetInnerHTML={{
              __html: makeHtml(`${removeHtmlTags(description)}`),
            }}
          />
          <div className='card__bottom'>
            <span>
              <VisibilityOutlinedIcon /> {ss_count}
            </span>
            <span>
              <button
                className='card__button'
                onClick={() => {
                  const hashtagNames = hashtags.map((tag) => tag?.slug);
                  const generatedSlug =
                    generateSlug(hashtagNames[0]) || "no-hashtag";
                  if (slug) {
                    history.push(
                      routingConstants.SUCCESS_STORIES +
                        generatedSlug +
                        "/" +
                        slug,
                    );
                  } else {
                    // Handle the case when 'slug' is empty
                    // console.log("Slug is empty. Cannot navigate.");
                  }
                }}
              >
                Read More <EastRoundedIcon />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCards;
