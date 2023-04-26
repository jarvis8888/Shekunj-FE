import React, { useState } from "react";

import "./YouMayLikeCarousel.scss";

const YouMayLikeCarousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentItem((prevItem) =>
      prevItem === 0 ? items.length - 1 : prevItem - 1,
    );
  };

  const handleRightArrowClick = () => {
    setCurrentItem((prevItem) =>
      prevItem === items.length - 1 ? 0 : prevItem + 1,
    );
  };

  return (
    <div className='you-may-like-carousel'>
      <div
        className='you-may-like-carousel__arrow'
        onClick={handleLeftArrowClick}
      >
        sa
      </div>
      <div className='you-may-like-carousel__items'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`you-may-like-carousel__item ${
              index === currentItem ? "is-active" : ""
            }`}
          >
            <div className='you-may-like-carousel__title'>{item.title}</div>
          </div>
        ))}
      </div>
      <div
        className='you-may-like-carousel__arrow'
        onClick={handleRightArrowClick}
      >
        me
      </div>
      <div className='you-may-like-carousel__line'></div>
    </div>
  );
};

export default YouMayLikeCarousel;
