import React from "react";
import "./NewPagination.scss";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";

const NewPagination = ({
  currentPage,
  totalPages,
  visiblePages,
  previousPage,
  nextPage,
  handleClick,
}) => {

  return (
    <div className='sk-pagination pagination'>
      <span
        className='sk-prevnext-btn'
        onClick={previousPage}
        disabled={currentPage === 1}
      >
        <WestRoundedIcon />
      </span>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handleClick(pageNumber)}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      <span
        className='sk-prevnext-btn'
        onClick={nextPage}
        disabled={currentPage + 3 >= totalPages}
      >
        <EastRoundedIcon />
      </span>
    </div>
  );
};

export default NewPagination;
