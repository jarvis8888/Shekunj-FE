//external imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//internal imports
import { withHeaderFooter } from "../../../../hocs/withHeaderFooter";
import { apiConstants } from "../../../../utils/constants";
import httpServices from "../../../../utils/ApiServices";
import { ImageContainer, LeftSection, Wrapper } from "./style";

const SuccessStoriesDetails = () => {
  //hooks
  const { id } = useParams();

  //state
  const [blogData, setBlogData] = useState();

  //api calls
  const getAllSuccessStories = async (id) => {
    try {
      const url = apiConstants.COURSES.SUCCESS_STORY + id;
      const res = await httpServices.get(url);
      setBlogData(res?.data);
    } catch (error) {
    } finally {
    }
  };

  //effects
  useEffect(() => {
    getAllSuccessStories(id);
  }, [id]);

  return (
    <Wrapper>
      <LeftSection>
        <ImageContainer>
          <img src={blogData?.image} alt='Story' />
        </ImageContainer>
        <div>
          {blogData?.hash_tags?.length
            ? blogData?.hash_tags.map((items) => {
                return <span key={items}>{items}</span>;
              })
            : null}
        </div>
      </LeftSection>
      <div>adds</div>
    </Wrapper>
  );
};

export default withHeaderFooter(SuccessStoriesDetails);
