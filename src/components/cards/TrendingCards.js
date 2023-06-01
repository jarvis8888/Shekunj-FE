import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import { addHyphensToLink, truncateString } from "../../utils/utils";
import { routingConstants } from "../../utils/constants";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHistory } from "react-router-dom";

const TrendingCards = (data) => {
  const {
    image,
    hashtags = [],
    title,
    description,
    makeHtml,
    key,
    reading_time,
    id,
    created_at,
  } = data;
  const history = useHistory();
  return (
    <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
      <div
        className='card'
        onClick={() =>
          history.push(
            routingConstants.SUCCESS_STORIES +
              addHyphensToLink(title) +
              "-" +
              id,
          )
        }
      >
        <div className='card__image'>
          <img src={image} alt={title} />
        </div>
        <div className='sk-Blogcard-content'>
          <div className='card__hashtags'>
            {hashtags.map((tag, index) => (
              <span key={index}>{`#${tag}`}</span>
            ))}
          </div>
          <h5 className=''>{title}</h5>
          <p
            dangerouslySetInnerHTML={{
              __html: makeHtml(`${truncateString(description, 75)}`),
            }}
          />
          <div className='card__bottom'>
            <span>
              <AccessTimeIcon /> {created_at}
            </span>
            <span>
              <button
                className='card__button'
                onClick={() =>
                  history.push(
                    routingConstants.SUCCESS_STORIES +
                      addHyphensToLink(title) +
                      "-" +
                      id,
                  )
                }
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
