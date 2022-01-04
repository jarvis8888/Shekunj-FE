import React, { useEffect, useState } from "react";
import "./index.scss";
import backImage from "../../assets/icons/Pagination/back.svg";
import nextImage from "../../assets/icons/Pagination/next.svg";
import { IconButton } from "@mui/material";

const Pagination = (props) => {
  const [initialCount, setInitialCount] = useState(1);
  const [finalCount,setFinalCount] = useState(null);

  useEffect(()=>{
    setInitialCount(1);
    setFinalCount(Math.ceil(props.finalCount));
  },[props.finalCount]);

  const backButton = () => {
    if(props.backPage){
      props.backPage();
    }
    setInitialCount(initialCount - 1);
  };
  const nextButton = () => {
    if(props.nextPage){
      props.nextPage();
    }
    setInitialCount(initialCount + 1);
  };

  return (
    <div className='mainDiv'>
      <IconButton
        className='button'
        disabled={initialCount === 1}
        onClick={backButton}
      >
        <img src={backImage} alt='Back Button' />
      </IconButton>
      <div
        className='numberDiv'
        style={{ backgroundColor: "#EC498A", color: "white" }}
      >
        {initialCount}
      </div>
      <div className='ofDiv'>of</div>
      <div className='numberDiv'>{finalCount}</div>
      <IconButton
        className='button'
        disabled={initialCount === finalCount}
        onClick={nextButton}
      >
        <img src={nextImage} alt='Next Button' />
      </IconButton>
    </div>
  );
};

export default Pagination;
