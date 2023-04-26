import React from "react";
import "./style.scss";

export const TrendingBlogsCard = ({
  image,
  title,
  description,
  time,
  date,
}) => {
  return (
    <div className='blog-card'>
      <div
        className='blog-card__image'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className='blog-card__content'>
        <h2 className='blog-card__title'>{title}</h2>
        <p className='blog-card__description'>{description}</p>
        <div className='blog-card__meta'>
          <span className='blog-card__time'>{time} min read</span>
          <span className='blog-card__date'>{date}</span>
        </div>
      </div>
    </div>
  );
};
