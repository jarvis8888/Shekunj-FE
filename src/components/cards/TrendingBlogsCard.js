import React from "react";
import "./style.scss";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import time_icon from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import { addHyphensToLink, generateSlug } from "../../utils/utils";

export const TrendingBlogsCard = ({
  image,
  title,
  description,
  time,
  date,
  id,
  category_name,
  key,
  color,
}) => {
  console.log("🚀 ~ file: TrendingBlogsCard.js:23 ~ color:", color);
  const history = useHistory();
  return (
    <div
      className='blog-card'
      onClick={() =>
        history.push(
          routingConstants.MORE_BLOG +
            generateSlug(category_name) +
            "/" +
            generateSlug(description) +
            "-" +
            id,
        )
      }
      style={{ cursor: "pointer" }}
    >
      <div className='blog-card__image new-blog-card'>
        <img src={image} alt='images' />
      </div>
      <div className='blog-card__content sk-blog-side'>
        <span
          className='sk-treadingBlog-one'
          style={{ background: `${color}` }}
        >
          {category_name}
        </span>
        <p className='blog-card__description'>{description}</p>
        <div className='blog-card__meta'>
          <span className='blog-card__time'>
            <AccessTimeIcon />
            {date}
          </span>
          <span className='blog-card__date sk-blog-icon2'>
            <MenuBookRoundedIcon />
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};
