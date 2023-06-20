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
    makeHtml,
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
      onClick={() => history.push(routingConstants.SUCCESS_STORIES + slug)}
    >
      <div className='card__image'>
        <img src={image} alt={title} />
      </div>
      <div className='sk-Blogcard-content'>
        <div className='card__hashtags'>
          {hashtags.map((tag) => (
            <span
              key={tag}
              onClick={(event) => {
                event.stopPropagation();
                history.push(
                  `${routingConstants.SUCCESS_STORIES_HASHTAG}/${tag}`,
                  tag,
                );
              }}
            >{`#${tag}`}</span>
          ))}
        </div>
        <h5>{title}</h5>
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
              onClick={() =>
                history.push(routingConstants.SUCCESS_STORIES + slug)
              }
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
