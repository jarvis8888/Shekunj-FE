import React, { useState, useEffect } from "react";
import "./blogCarousel.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import eye from "../../assets/icons/svgs/eye.png";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";

const BlogCarousel = ({ images = [] }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <div className='carousel'>
      <div className='carousel__slide' 
      // style={{ backgroundImage: `url(${images[currentIndex]?.image})` }}
      >
        <img src={`${images[currentIndex]?.image}`} alt="image_blog" />
        <div className='carousel__content'>
          <h2 style={{ color: "#020202", fontSize: "1.3rem", marginBottom: "15px" }}>
            {images[currentIndex]?.title}
          </h2>
          <div className='has'>
            <span style={{ color: "#020202" }}>
              <AccessTimeIcon />
              {images[currentIndex]?.created_at}
            </span>
            <span style={{ color: "#020202" }}>
              <MenuBookRoundedIcon />
              {images[currentIndex]?.reading_time
                ? images[currentIndex]?.reading_time
                : "5 min"}
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
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;
