import React from "react";
import "./style.scss";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import time_icon from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";

export const TrendingBlogsCard = ({
  image,
  title,
  description,
  time,
  date,
  id,
}) => {
  const history = useHistory();
  return (
    <div
      className='blog-card'
      onClick={() => history.push(routingConstants.MORE_BLOG + id)}
      style={{ cursor: "pointer" }}
    >
      <div
        className='blog-card__image new-blog-card'
        style={{marginLeft:"10px",marginRight:"10px", backgroundImage: `url(${image})` }}
      ></div>
      <div className='blog-card__content sk-blog-side'>
        <div>Working Women</div>
        <p className='blog-card__description'>{description}</p>
        <div className='blog-card__meta'>
          <span className='blog-card__time'>
            <img src={time_icon} alt='time' width={14} height={14} />
            {date}min
          </span>
          <span className='blog-card__date sk-blog-icon2'>
            <img src={book} alt='time' width={14} height={14} />

            {time}
          </span>
        </div>
      </div>
    </div>
  );
};
