//external imports
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//internal imports
import { withHeaderFooter } from "../../../../hocs/withHeaderFooter";
import {
  LeftSideSection,
  RightSideSection,
  Section1,
  ViewAllButton,
  Wrapper,
  FeaturedStoriesGrid,
  TrendingCardSectionGrid,
  FeaturedStoriesTitle,
  FeaturedStoriesLeftSection,
  LoadMoreButton,
  ButtonDiv,
} from "./style";
import { makeHtml } from "../../../../utils/utils";
import AddsBanner from "../../../../components/AddsBanner/AddsBanner";
import { fire_icon, hashtag_icon } from "../../../../assets/sharedIcons";
import { apiConstants } from "../../../../utils/constants";
import httpServices from "../../../../utils/ApiServices";
import FeaturedCards from "../../../../components/cards/FeaturedCards";
import { HashtagAndCatagories } from "../../../../components/HastagAndCatagories/Index";
import TrendingBlogs from "../../components/TrendingBlogs";
import TrendingHashtagWithAdds from "../../components/TrendingHashtagWithAdds";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import axios from "axios";

const SuccessStoriesPage = () => {
  //variables
  const pageLimit = 5;
  //hooks
  const { t } = useTranslation();
  const detect = useDeviceDetect();
  //redux

  //states
  const [allSuccessStories, setAllSuccessStories] = useState({});
  const [featuredStoriesData, setFeaturedStoriesData] = useState([]);
  const [trendingStoriesData, setTrendingStoriesData] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [successStoriesRight1, setSuccessStoriesRight1] = useState([]);
  const [successStoriesRight2, setSuccessStoriesRight2] = useState([]);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //custom functions

  //api calls
  const getAllSuccessStories = async (limit, offset, page) => {
    setLoading(true);
    try {
      const url =
        apiConstants.COURSES.SUCCESS_STORY +
        `?limit=${limit}&offset=${offset}&p=${page}`;
      const res = await httpServices.get(url);
      setAllSuccessStories(res);
      setFeaturedStoriesData(res?.featured_success_stories);
      setTrendingStoriesData(res?.trending_success_stories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getPrivateAdds = async (latitude, longitude) => {
    try {
      const res = await httpServices.get(
        `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
      );
      if (res?.results?.length > 0) {
        const filterArray1 = res.results.filter(
          ({ image_type }) => image_type === "success_stories_details",
        );
        setStoriesBannerAds(filterArray1);
        const filterArray2 = res.results.filter(
          ({ image_type }) => image_type === "success_stories_right1",
        );
        setSuccessStoriesRight1(filterArray2);
        const filterArray3 = res.results.filter(
          ({ image_type }) => image_type === "success_stories_right2",
        );
        setSuccessStoriesRight2(filterArray3);
      }
    } catch (error) {
      console.error(error);
      const { data } = await axios.get(`/private_adds/private_add`);
      if (data?.results?.length > 0) {
        const filterArray1 = data.results.filter(
          ({ image_type }) => image_type === "blog_details",
        );
        // setStoryDetailsBoxAds(filterArray1);
      }
    }
  };

  const fetchPrivateAdds = async () => {
    try {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = coords;
      await getPrivateAdds(latitude.toString(), longitude.toString());
    } catch (error) {
      // console.error(error);
      // const { data } = await axios.get(`/private_adds/private_add`);
      // if (data?.results?.length > 0) {
      //   const filterArray1 = data.results.filter(
      //     ({ image_type }) => image_type === "blog_details",
      //   );
      //   // setStoryDetailsBoxAds(filterArray1);
      // }
    }
  };

  //effects
  useEffect(() => {
    getAllSuccessStories(pageLimit, offset, page);
  }, [pageLimit, offset, page]);

  useEffect(() => {
    fetchPrivateAdds();
  }, []);

  return (
    <Wrapper>
      <Section1>
        <LeftSideSection>
          <div
            dangerouslySetInnerHTML={{
              __html: makeHtml(t("phase2.SuccessStoryContent.title1")),
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: makeHtml(t("phase2.SuccessStoryContent.title2")),
            }}
          />
          <p>{t("phase2.SuccessStoryContent.description")}</p>
          <ViewAllButton>View All Success Stories</ViewAllButton>
        </LeftSideSection>
        <RightSideSection></RightSideSection>
      </Section1>
      <AddsBanner
        color='#F4F4F4'
        children={
          <div>
            {storiesBannerAds.length > 0 && (
              <div
                className='col-md-12 ads_home_cover'
                // onClick={() => addEmail(storiesBannerAds[0]?.add_email)}
              >
                <a
                  href={storiesBannerAds[0]?.url_adds}
                  target='_blank'
                  rel='noreferrer'
                >
                  {detect.isMobile
                    ? storiesBannerAds[0]?.image_mobile && (
                        <img
                          src={storiesBannerAds[0]?.image_mobile}
                          alt='banner'
                          className='ads_story_cover_img'
                        />
                      )
                    : storiesBannerAds[0]?.image && (
                        <img
                          src={storiesBannerAds[0]?.image}
                          alt='banner'
                          className='ads_story_cover_img'
                        />
                      )}
                </a>
              </div>
            )}
          </div>
        }
      />
      <TrendingCardSectionGrid>
        <FeaturedStoriesLeftSection>
          <FeaturedStoriesTitle>
            <img src={fire_icon} alt='fire' />
            <h4>Featured Stories</h4>
          </FeaturedStoriesTitle>
          <FeaturedStoriesGrid>
            {loading
              ? "loading"
              : featuredStoriesData?.results?.length
              ? featuredStoriesData?.results.map((items, index) => {
                  return (
                    <>
                      <FeaturedCards
                        image={items.image}
                        hashtags={items.hash_tags}
                        title={items.name}
                        description={`${items.title}`}
                        makeHtml={makeHtml}
                        key={index}
                        created_at={items.created_at}
                        reading_time={items.reading_time}
                        id={items.id}
                      />
                    </>
                  );
                })
              : "no data"}
          </FeaturedStoriesGrid>
          <ButtonDiv>
            <LoadMoreButton>Load More</LoadMoreButton>
          </ButtonDiv>
          <TrendingBlogs trendingStoriesData={trendingStoriesData?.results} />
        </FeaturedStoriesLeftSection>
        <TrendingHashtagWithAdds
          all_hash_tags={allSuccessStories?.all_hash_tags}
          successStoriesRight1={successStoriesRight1}
          successStoriesRight2={successStoriesRight2}
        />
      </TrendingCardSectionGrid>
    </Wrapper>
  );
};

export default withHeaderFooter(SuccessStoriesPage);
