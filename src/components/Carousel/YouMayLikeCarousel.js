import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../assets/icons/svgs/exphoto.png";
import httpServices from "../../utils/ApiServices";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import like_icon from "../../assets/images/likestory.svg";
import "./YouMayLikeCarousel.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const YouMayLikeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  const history = useHistory();

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

  const goToPrevSlide = (event) => {
    event.stopPropagation();
    const index = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(index);
  };

  const goToNextSlide = (event) => {
    event.stopPropagation();
    const index = (currentIndex + 1) % data.length;
    setCurrentIndex(index);
  };

  const handleCarouselClick = () => {
    const currentData = data[currentIndex];
    if (currentData && currentData?.url_adds) {
      window.open(currentData?.url_adds, "_blank");
    }
  };

  if (data?.length === 0) {
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
      <div
        className='YouMayLikeCarouselCarousel__slide'
        style={{ backgroundImage: `url(${data[currentIndex]?.image})` }}
        onClick={handleCarouselClick}
      >
        <button
          className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--left'
          onClick={goToPrevSlide}
        >
          <KeyboardArrowLeftRoundedIcon fontSize="medium" />
        </button>

        <div className='YouMayLikeCarouselCarousel__nav'>
          {data?.map((_, index) => (
            <button
              key={index}
              className={`carousel__dot ${
                index === currentIndex ? "active1" : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>

        <button
          className='YouMayLikeCarouselCarousel__button YouMayLikeCarouselCarousel--right'
          onClick={goToNextSlide}
        >
           <KeyboardArrowRightRoundedIcon fontSize="medium" />
        </button>
      </div>
      <div className='YouMayLikeCarousel__bottom__title'>
        {data[currentIndex]?.add_title}
      </div>
    </div>
  );
};

export default YouMayLikeCarousel;
