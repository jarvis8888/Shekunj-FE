import React from "react";
import "./style.scss";
import time1 from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { addHyphensToLink, truncateString } from "../../utils/utils";

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
    <div className='sk-blogDivider-bottom'>
      <div
        className='row my-4 align-items-center'
        onClick={() =>
          history.push(
            routingConstants.MORE_BLOG + addHyphensToLink(title) + "-" + id,
          )
        }
        style={{ cursor: "pointer" }}
      >
        <div className='col-xl-4 col-lg-6 col-md-6'>
          <img src={image} />
        </div>
        <div className='col-xl-8 col-lg-6 col-md-6'>
          <div className='sk-tradingBlog-card'>
            <h5 className='blog-card2__title'>{title}</h5>
            <span className='sk-tagBlog-name'>{category_name}</span>
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
    </div>
  );
};
