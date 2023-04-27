import React from "react";
import "./style.scss";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
export const TrendingBlogsCard = ({
  image,
  title,
  description,
  time,
  date,
  id
}) => {
  const history = useHistory();
  return (
    <div
      className='blog-card'
      onClick={() => history.push(routingConstants.MORE_BLOG + id)}
      style={{ cursor: "pointer" }}
    >
      <div
        className='blog-card__image'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className='blog-card__content'>
        <div className='blog-card__title'>{title}</div>
        <p className='blog-card__description'>{description}</p>
        <div className='blog-card__meta'>
          <span className='blog-card__time'>{time} min read</span>
          <span className='blog-card__date'>{date}</span>
        </div>
      </div>
    </div>
  );
};
