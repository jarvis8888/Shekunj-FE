import React, { useState, useEffect } from "react";
import "./YouMayLikeCarousel.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import httpServices from "../../utils/ApiServices";

const YouMayLikeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);

  const fetchYouMayLikeCarouselData = async () => {
    try {
      const url = "/private_adds/you_may_like";
      const res = await httpServices.get(url);
      setData(res?.data?.you_may_like_adds || []);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };

  useEffect(() => {
    fetchYouMayLikeCarouselData();
  }, []);

  const goToSlide = (event, index) => {
    event.stopPropagation();
    setCurrentIndex(index);
  };

  const handlePrev = (event) => {
    event.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const handleNext = (event) => {
    event.stopPropagation();
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [currentIndex, data]);

  if (data.length === 0) {
    return null; // Don't render anything if there is no data
  }

  return (
    <div className='youMayLikeCarousel'>
      <div className='YouMayLikeCarouselCarousel_header'>
        <span className='sk-like-icon'>
          <FavoriteBorderOutlinedIcon />{" "}
        </span>{" "}
        You May Like
      </div>
      <button
        className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--left'
        onClick={(event) => handlePrev(event)}
      >
        <KeyboardArrowLeftRoundedIcon fontSize='medium' />
      </button>
      <div
        className='YouMayLikeCarouselCarousel__slide'
        style={{ backgroundImage: `url(${data[currentIndex]?.image})` }}
        onClick={() => {
          const currentData = data[currentIndex];
          if (currentData && currentData?.url_adds) {
            window.open(currentData?.url_adds, "_blank");
          }
        }}
        // onMouseEnter={() => clearInterval(interval)} // Pause auto-scrolling on manual interaction
        // onMouseLeave={() => {
        //   // Resume auto-scrolling after manual interaction
        //   const interval = setInterval(() => {
        //     setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
        //   }, 3000); // Change slide every 3 seconds (adjust as needed)
        // }}
      >
        <div className='YouMayLikeCarouselCarousel__nav'>
          {data.map((_, index) => (
            <button
              key={index}
              className={`carousel__dot ${
                index === currentIndex ? "active1" : ""
              }`}
              onClick={(e) => goToSlide(e, index)}
            />
          ))}
        </div>
      </div>
      <button
        className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--right'
        onClick={(event) => handleNext(event)}
      >
        <KeyboardArrowRightRoundedIcon fontSize='medium' />
      </button>
      <div className='YouMayLikeCarousel__bottom__title'>
        {data[currentIndex]?.add_title}
      </div>
    </div>
  );
};

export default YouMayLikeCarousel;
