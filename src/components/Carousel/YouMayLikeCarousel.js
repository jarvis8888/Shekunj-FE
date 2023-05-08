import React, { useEffect, useState } from "react";
import photo from "../../assets/icons/svgs/exphoto.png";
import httpServices from "../../utils/ApiServices";
import like_icon from "../../assets/icons/like-story.png";

import "./YouMayLikeCarousel.scss";


const YouMayLikeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);

  const goToPrevSlide = () => {
    const index = currentIndex === 0 ? 3 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const index = currentIndex === 3 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };
  const YouMayLikeCarouselData = async () => {
    try {
      const url = "/private_adds/you_may_like";
      const res = await httpServices.get(url);
      setData(res?.data?.you_may_like_adds);
    } catch {}
  };
  useEffect(() => {
    YouMayLikeCarouselData();
  }, []);

  return (
    <div className='youMayLikeCarousel'>
      <div className='YouMayLikeCarouselCarousel_header'>
        <img src={like_icon} alt='fire' width={28} /> You May Like
      </div>
      <div
        className='YouMayLikeCarouselCarousel__slide'
        style={{ backgroundImage: `url(${data[currentIndex]?.image})` }}
      >
        <button
          className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--left'
          onClick={goToPrevSlide}
        >
          &#8249;
        </button>

        <div className='YouMayLikeCarouselCarousel__nav'>
          {data?.map((_, index) => (
            <button
              key={index}
              className={`carousel__dot ${
                index === currentIndex ? "active1" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <button
          className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--right'
          onClick={goToNextSlide}
        >
          &#8250;
        </button>
      </div>
      <div className='YouMayLikeCarousel__bottom__title'>
        {data[currentIndex]?.add_title}
      </div>
    </div>
  );
};

export default YouMayLikeCarousel;
