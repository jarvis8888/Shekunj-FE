import React from "react";
import "./style.scss";
import time1 from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { truncateString } from "../../utils/utils";

export const TrendingBlogsCard2 = ({
  image,
  title,
  description,
  time,
  date,
  id,
  category_name,
}) => {
  const history = useHistory();

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };
  return (
    <div
      className='row my-3'
      onClick={() => history.push(routingConstants.MORE_BLOG + id)}
      style={{ cursor: "pointer" }}
    >
      <div className='col-md-4'>
        <img src={image} />
      </div>
      <div className='col-md-8'>
        <div className="py-2">
        <h5 className='blog-card2__title'>{title}</h5>
        <span className="sk-tagBlog-name">{category_name}</span>
        <p
          className='blog-card-description'
          dangerouslySetInnerHTML={{
            __html: makeHtml(`${truncateString(description, 100)}`),
          }}
        />
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
    </div>
  );
};
