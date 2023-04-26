import React, { useState, useEffect } from "react";
import "./blogCarousel.scss";

const BlogCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className='carousel'>
      <div
        className='carousel__slide'
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
      >
        <div className='carousel__content'>
          <h2>{images[currentIndex].title}</h2>
          <p>{images[currentIndex].description}</p>
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
