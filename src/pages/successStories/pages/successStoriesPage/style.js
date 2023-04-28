import styled from "styled-components";
import { ButtonReset, FlexCol, FlexRow } from "../../../../Styles/styled";
import worldMapIcon from "../../../../assets/icons/svgs/worldmap.png";

export const Wrapper = styled.div``;

export const Section1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
export const LeftSideSection = styled.div`
  width: 50%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 2.7rem;
  line-height: 120%;
  justify-content: center;
  align-items: flex-start;
  padding: 0 0 0 30px;
  span {
    color: #d3317d;
    font-style: normal;
    font-weight: 700;
  }
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 160%;
    color: #555555;
    width: 70%;
    padding: 10px 0 10px 0;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
    padding: 0 0 0 20px;
    p {
      width: 85%;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 100%;
    padding: 0 0 0 10px;
    p {
      width: 100%;
      font-size: 0.8rem;
    }
  }
`;

export const RightSideSection = styled.div`
  width: 50%;
  flex: 1;
  background-image: url(${worldMapIcon});
  background-size: cover;
  background-position: center;
  height: 60vh;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ViewAllButton = styled.button`
  ${ButtonReset}
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 24px;
  background-color: #d3317d;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.5s ease, border-color 0.5s ease,
    color 0.5s ease;
  :hover {
    background-color: #ffffff;
    border: 1px solid #d3317d;
    color: #d3317d;
  }
  @media (max-width: 768px) {
    padding: 5px 15px;
  }
`;

export const TrendingCardSectionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 70% 30%;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
export const FeaturedStoriesLeftSection = styled.div`
  padding: 20px 0 20px 40px;
  border-right: 1px solid #d9d9d9;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
export const FeaturedStoriesTitle = styled(FlexRow)`
  gap: 10px;
  h4 {
    margin-top: 7px;
    font-family: "Poppins";
    font-style: italic;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
  }
`;

export const FeaturedStoriesGrid = styled.div`
  width: 95%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 20px 0;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (max-width: 468px) {
    width: 100%;
    gap: 20px;
  }
`;

export const ButtonDiv = styled(FlexCol)`
  padding: 10px 0;
  border-bottom: 1px solid #d9d9d9;
  width: 95%;
`;
export const LoadMoreButton = styled.button`
  ${ButtonReset}
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 24px;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.5s ease, border-color 0.5s ease,
    color 0.5s ease;
  :hover {
    background-color: #ffffff;
    border: 1px solid #000;
    color: #000;
  }
  @media (max-width: 768px) {
    padding: 5px 15px;
  }
`;

export const TrendingSection = styled.div`
  padding: 10px 0 10px 0;
`;

export const TrendingCardGrid = styled.div`
  width: 95%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 468px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;
