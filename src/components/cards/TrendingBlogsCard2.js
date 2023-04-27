import React from "react";
import "./style.scss";
import time1 from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";

export const TrendingBlogsCard2 = ({
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
      className='blog-card2'
      onClick={() => history.push(routingConstants.MORE_BLOG + id)}
      style={{ cursor: "pointer" }}
    >
      <div
        className='blog-card2__image'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className='blog-card2__content'>
        <h2 className='blog-card2__title' style={{ fontSize: "1.5rem" }}>
          {title}
        </h2>
        <p className='blog-card2__description'>{description}</p>
        <div className='blog-card2__meta'>
          <span style={{ margin: "0 5px" }}>
            <img src={time1} alt='time' width={14} height={14} />
            {date}
          </span>
          <span style={{ margin: "0 5px" }}>
            <img src={book} alt='time' width={14} height={14} />
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};
