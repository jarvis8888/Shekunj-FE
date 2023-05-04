import React from "react";
import "./style.scss";
import time1 from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
      <div className='blog-card2__image'>
        <img src={image} />
      </div>
      <div className='blog-card2__content'>
        <h5 className='blog-card2__title' >
          {title}
        </h5>
        <p className='blog-card2__description'>{description}</p>
        <div className='blog-card2__meta'>
          <span>
            <AccessTimeIcon />
            {date}
          </span>
          <span>
          <MenuBookRoundedIcon />
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};
