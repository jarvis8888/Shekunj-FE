import React from "react";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./index.scss";

import Pro1 from "../../assets/images/P-1.png";
import Profile from '../../assets/images/testimonial/1.png'
import star from "../../assets/images/Star 2.png";
import timer from "../../assets/images/timer.png";
import list from "../../assets/images/list.png";
import level from "../../assets/images/level.png";

function Carousel(props) {
  const divRef = React.useRef();

  const coursesArray = [
    {
      img: Pro1,
      title: "Design",
      subTitle: "Adobe photoshop training: From beginner to PRO",
      rating: "4.5",
      people: "104,716",
      students: "46,995",
      time: "11 hr 20 mins",
      lectures: "20",
    },
    {
      img: Pro1,
      title: "Life Style",
      subTitle: "Cat behaviour, Psychology and Care training to Pro",
      rating: "4.5",
      people: "104,716",
      students: "46,995",
      time: "11 hr 20 mins",
      lectures: "20",
    },
    {
      img: Pro1,
      title: "Development",
      subTitle: "Python Programming Masterclass Beginner to Advanced",
      rating: "4.5",
      people: "104,716",
      students: "36,995",
      time: "08 hr 20 mins",
      lectures: "32",
    },
  ];

  const handleChange = (e) => {
    const carousel = e?.relatedTarget;
    divRef.current.innerHTML = `${carousel.relative(carousel.current()) + 1}/${
      coursesArray.length
    }`;
  };

  return (
    <>
      <div className='container Our_text'>
        <p>{props.title1}</p>
        <h2>{props.title2}</h2>
      </div>
      <div className='set'>
        <div className='abc_box'>
          <div className='abc' ref={divRef}></div>
        </div>

        <OwlCarousel
          className='owl-theme'
          loop
          margin={150}
          nav={true}
          items={4}
          dots={false}
          smartSpeed='800'
          onChanged={(e) => handleChange(e)}
        >
          {coursesArray.map((obj, ind) => (
            <div className='item' key={ind}>
              <div className='box'>
                <div className='slide-img'>
                  <img alt='' src={Pro1} />
                  <div className='overlay'></div>
                </div>
                {props.details ? (
                  <>
                    <div className='tag_btn'>
                      <button className='btn btn-info'>{obj?.title}</button>
                      <h2>{obj?.subTitle}</h2>
                    </div>
                    <div className='detail-box'>
                      <div className='type'>
                        <a href='#!'>
                          {obj.rating} <img src={star} alt='' />{" "}
                          <span>({obj?.people})</span>
                        </a>
                        <span className='std'>{obj?.students} Students</span>
                      </div>
                      <div className='time'>
                        <p>
                          <img src={timer} alt='' /> {obj?.time}
                        </p>
                        <p>
                          <img src={list} alt='' /> {obj?.lectures} lectures
                        </p>
                        <p>
                          <img src={level} alt='' /> All level
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='tag_btn'>
                      <button className='btn btn-info'>1 Test Set</button>
                      <h2>Banking and Insurance</h2>
                    </div>
                  </>
                )}

                <hr className='line' />
                <div className='names'>
                  <p>
                    <img src={Profile} alt='...'/> Ramadhir Krishna
                  </p>
                  <span>Free</span>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </>
  );
}

export default Carousel;
