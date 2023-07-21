import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  addHyphensToLink,
  generateSlug,
  makeHtml,
  truncateString,
} from "../../utils/utils";
import { routingConstants } from "../../utils/constants";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useHistory } from "react-router-dom";

const FeaturedCards = (props) => {
  const {
    image,
    hashtags = [],
    title,
    description,
    // makeHtml,
    key,
    reading_time,
    created_at,
    id,
    slug,
    ss_count,
  } = props;
  const history = useHistory();
  return (
    <div
      className='card'
      key={key}
      onClick={() => {
        const hashtagNames = hashtags.map((tag) => tag.slug);
        const generatedSlug = generateSlug(hashtagNames[0]) || "no-hashtag";
        if (slug) {
          history.push(
            routingConstants.SUCCESS_STORIES + generatedSlug + "/" + slug,
          );
        } else {
          // Handle the case when 'slug' is empty
          console.log("Slug is empty. Cannot navigate.");
        }
      }}
    >
      <div className='card__image'>
        <div><img src={image} alt={title} /></div>
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
        <h3>{title}</h3>
        <p
          className=''
          dangerouslySetInnerHTML={{
            __html: makeHtml(`${truncateString(description, 100)}`),
          }}
        />
        <div className='card__bottom'>
          <span>
            <AccessTimeIcon />
            {created_at}
          </span>
          <span>
            <VisibilityOutlinedIcon />
            {ss_count}
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
  );
};

export default FeaturedCards;
