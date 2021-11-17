import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./index.scss";

function Carousel() {
  const divRef = React.useRef();

  const handleChange = (e) => {
    divRef.current.innerHTML = `${
      e?.relatedTarget.relative(e.relatedTarget.current()) + 1
    }/12`;
  };

  return (
    <>
      <div className='abc' ref={divRef}></div>
      <OwlCarousel
        className='owl-theme'
        loop
        margin={10}
        nav
        dots={false}
        smartSpeed='800'
        onChanged={(e) => handleChange(e)}
      >
        <div className='item'>
          <h4>1</h4>
        </div>
        <div className='item'>
          <h4>2</h4>
        </div>
        <div className='item'>
          <h4>3</h4>
        </div>
        <div className='item'>
          <h4>4</h4>
        </div>
        <div className='item'>
          <h4>5</h4>
        </div>
        <div className='item'>
          <h4>6</h4>
        </div>
        <div className='item'>
          <h4>7</h4>
        </div>
        <div className='item'>
          <h4>8</h4>
        </div>
        <div className='item'>
          <h4>9</h4>
        </div>
        <div className='item'>
          <h4>10</h4>
        </div>
        <div className='item'>
          <h4>11</h4>
        </div>
        <div className='item'>
          <h4>12</h4>
        </div>
      </OwlCarousel>
    </>
  );
}

export default Carousel;
