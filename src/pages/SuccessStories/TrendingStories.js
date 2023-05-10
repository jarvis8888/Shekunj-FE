import React from "react";
import "./index.scss";
import fire from "../../assets/images/fire.svg";
import TrendingCards from "../../components/cards/TrendingCards";

export const TrendingStories = () => {
  return (
    <div>
      <div className='treading-stories'>
        <div className='title'>
          <img src={fire} alt='fire' width={28} />
          <h4>Trending Stories </h4>
        </div>
        <div className='treading-card-gird'>
          {[1, 2, 3, 4, 5, 6, 7].map(() => {
            return (
              <TrendingCards
                image='https://placehold.it/400x200'
                hashtags={["react", "scss", "card"]}
                title='sameer'
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
