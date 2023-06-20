import React from "react";
import "./style.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import eye from "../../assets/icons/svgs/eye.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  addHyphensToLink,
  generateSlug,
  truncateString,
} from "../../utils/utils";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";

const LatestBlogCard = (props) => {
  const {
    image,
    hashtags = [],
    title,
    description,
    makeHtml,
    key,
    reading_time,
    created_at,
    blog_count,
    id,
    category_name,
    color,
    slug,
  } = props;
  const history = useHistory();
  return (
    <div
      className='card'
      key={key}
      onClick={() =>
        history.push(
          routingConstants.MORE_BLOG + generateSlug(category_name) + "/" + slug,
        )
      }
    >
      <div className='card__image'>
        <img src={image} alt={title} />
        <span className='sk-chipTag-blog' style={{ background: `${color}` }}>
          {category_name}
        </span>
      </div>
      {/* <div className='card__hashtags'>
        {hashtags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div> */}
      <div className='sk-Blogcard-content'>
        <div className='card__bottom'>
          <span>
            <AccessTimeIcon />
            {created_at}
          </span>
          <span>
            <MenuBookRoundedIcon />
            {reading_time}
          </span>
          <span>
            <VisibilityOutlinedIcon />
            {blog_count}
          </span>
        </div>
        <h5 className=''>{title}</h5>
        <div
          className='sk-blog-describe'
          dangerouslySetInnerHTML={{
            __html: makeHtml(`${description}`),
          }}
        />
        <span>
          <button
            className='card__button sk-blog-btn'
            onClick={() =>
              history.push(
                routingConstants.MORE_BLOG +
                  generateSlug(category_name) +
                  "/" +
                  slug,
              )
            }
          >
            Read More <EastRoundedIcon />
          </button>
        </span>
      </div>
    </div>
  );
};

export default LatestBlogCard;
