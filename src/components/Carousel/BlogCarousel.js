import React, { useState, useEffect } from "react";
import "./blogCarousel.scss";
import time from "../../assets/icons/svgs/time.png";
import book from "../../assets/icons/svgs/book.png";
import eye from "../../assets/icons/svgs/eye.png";
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
      <div
        className='carousel__slide'
        style={{ backgroundImage: `url(${images[currentIndex]?.image})` }}
      >
        <div className='carousel__content'>
          <h2 style={{ color: "#000", fontSize: "1.3rem" }}>
            {images[currentIndex]?.title}
          </h2>
          <div className='has'>
            <span style={{ color: "#000" }}>
              <img src={time} alt='time' width={14} height={14} />
              {images[currentIndex]?.created_at}
            </span>
            <span style={{ color: "#000" }}>
              <img src={book} alt='time' width={14} height={14} />
              {images[currentIndex]?.reading_time
                ? images[currentIndex]?.reading_time
                : "5 min"}
            </span>
            <span style={{ color: "#000" }}>
              <img src={eye} alt='time' width={14} height={14} />
              {images[currentIndex]?.blog_count}
            </span>
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
      </div>
    </div>
  );
};

export default BlogCarousel;
