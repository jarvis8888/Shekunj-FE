import React, { useState, useEffect } from "react";
import "./blogCarousel.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import eye from "../../assets/icons/svgs/eye.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { DateFormat, addHyphensToLink } from "../../utils/utils";

const BlogCarousel = ({ images = [], color }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (event) => {
    event.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = (event) => {
    event.stopPropagation();
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <div
      className='carousel'
      onClick={() =>
        history.push(
          routingConstants.MORE_BLOG +
            images[currentIndex]?.category_name.toLowerCase() +
            "/" +
            addHyphensToLink(images[currentIndex]?.title) +
            "-" +
            images[currentIndex]?.id,
        )
      }
    >
      <button
        className='carousel__arrow carousel__arrow__left'
        onClick={(event) => handlePrev(event)}
      >
        &lt;
      </button>
      <button
        className='carousel__arrow carousel__arrow__right'
        onClick={(event) => handleNext(event)}
      >
        &gt;
      </button>
      <div
        className='carousel__slide'
        // style={{ backgroundImage: `url(${images[currentIndex]?.image})` }}
      >
        <img src={`${images[currentIndex]?.image}`} alt='image_blog' />
        <div className='carousel__content'>
          <h5
            className='sk-category-name'
            style={{
              background: `${color(images[currentIndex]?.category_name)}`,
            }}
          >
            {images[currentIndex]?.category_name}
          </h5>
          <h2
            style={{
              color: "#020202",
              marginBottom: "15px",
            }}
          >
            {images[currentIndex]?.title}
          </h2>
          <div className='has'>
            <span style={{ color: "#020202" }}>
              <AccessTimeIcon />
              {DateFormat(`${images[currentIndex]?.created_at}`)}
            </span>
            <span style={{ color: "#020202" }}>
              <MenuBookRoundedIcon />
              {images[currentIndex]?.reading_time}
            </span>
            <span style={{ color: "#020202" }}>
              <VisibilityOutlinedIcon />
              {images[currentIndex]?.blog_count}
            </span>
          </div>
        </div>
      </div>
      <div className='carousel__nav'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;
