import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import { truncateString } from "../../utils/utils";
import { routingConstants } from "../../utils/constants";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
    <div className="col-xl-4 col-md-6">
      <div className='card'>
        <div className='card__image'>
          <img src={image} alt={title} />
        </div>
        <div className="sk-Blogcard-content">
          <div className='card__hashtags'>
            {hashtags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h5 className=''>{title}</h5>
          <p dangerouslySetInnerHTML={{
              __html: makeHtml(`${truncateString(description, 75)}`),
            }}
          />
          <div className='card__bottom'>
            <span>
            <AccessTimeIcon /> {created_at}
            </span>
            <button
              className='card__button'
              onClick={() => history.push(routingConstants.SUCCESS_STORIES + id)}
            >
              Read More
              <svg
                width='20'
                height='13'
                viewBox='0 0 20 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19.0235 7.03033C19.3164 6.73744 19.3164 6.26256 19.0235 5.96967L14.2505 1.1967C13.9576 0.903807 13.4828 0.903807 13.1899 1.1967C12.897 1.48959 12.897 1.96447 13.1899 2.25736L17.4325 6.5L13.1899 10.7426C12.897 11.0355 12.897 11.5104 13.1899 11.8033C13.4828 12.0962 13.9576 12.0962 14.2505 11.8033L19.0235 7.03033ZM0.493164 7.25L18.4932 7.25L18.4932 5.75L0.493164 5.75L0.493164 7.25Z'
                  fill='#D3317D'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCards;
