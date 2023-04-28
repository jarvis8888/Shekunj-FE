import React, { memo } from "react";
import {
  FeaturedStoriesTitle,
  TrendingCardGrid,
  TrendingSection,
} from "../pages/successStoriesPage/style";
import { fire_icon } from "../../../assets/sharedIcons";
import TrendingCards from "../../../components/cards/TrendingCards";
import { makeHtml } from "../../../utils/utils";

const TrendingBlogs = (props) => {
  const { trendingStoriesData } = props;
  return (
    <div>
      <TrendingSection>
        <FeaturedStoriesTitle>
          <img src={fire_icon} alt='fire' />
          <h4>Trending Stories</h4>
        </FeaturedStoriesTitle>
      </TrendingSection>
      <TrendingCardGrid>
        {trendingStoriesData?.length
          ? trendingStoriesData.map((items, index) => {
              return (
                <>
                  <TrendingCards
                    image={items.image}
                    hashtags={items.hash_tags}
                    title={items.name}
                    description={`${items.title}`}
                    makeHtml={makeHtml}
                    key={index}
                    created_at={items.created_at}
                    id={items.id}
                  />
                </>
              );
            })
          : "no data"}
      </TrendingCardGrid>
    </div>
  );
};

export default memo(TrendingBlogs);
