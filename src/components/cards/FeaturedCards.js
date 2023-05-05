import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { truncateString } from "../../utils/utils";
import { routingConstants } from "../../utils/constants";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
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
  } = props;
  const history = useHistory();
  return (
    <div className="col-md-6">
      <div className='card' key={key}>
        <div className='card__image'>
          <img src={image} alt={title} />
        </div>
        <div className="sk-Blogcard-content">
          <div className="card__hashtags">
            {hashtags.map((tag) => (
              <span key={tag}>{`#${tag}`}</span>
            ))}
          </div>
          <h5>{title}</h5>
          <p className=''  dangerouslySetInnerHTML={{
              __html: makeHtml(`${truncateString(description, 100)}`),
            }}
          />
          <div className='card__bottom'>
            <span>
              <AccessTimeIcon />
              {created_at}
            </span>
            <span>
              <MenuBookRoundedIcon />
              {reading_time} to read
            </span>
            <button
              className='card__button'
              onClick={() => history.push(routingConstants.SUCCESS_STORIES + id)}
            >
              Read More <EastRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
