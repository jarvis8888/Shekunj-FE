import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 70% 30%;
  padding: 10px 30px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.div`


`

export const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
