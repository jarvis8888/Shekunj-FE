import React, { memo } from "react";
import { HashtagAndCatagories } from "../../../components/HastagAndCatagories/Index";
import { hashtag_icon } from "../../../assets/sharedIcons";

const TrendingHashtagWithAdds = (props) => {
  const { all_hash_tags, successStoriesRight1, successStoriesRight2 } = props;
  return (
    <div>
      <HashtagAndCatagories
        type='hashtag'
        image={hashtag_icon}
        title={`Trending Hastag`}
        // addEmail={addEmail}
        hashtags={all_hash_tags}
        rightOne={successStoriesRight1}
        rightTwo={successStoriesRight2}
      />
    </div>
  );
};

export default memo(TrendingHashtagWithAdds);
