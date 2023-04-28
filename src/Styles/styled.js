import styled, { css } from "styled-components";

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItem ? props.alignItem : "center")};
  ${(props) => props.flex && `flex: ${props.flex}`}
  ${(props) => props.margin && `margin:${props.margin}`}
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => (props.gap ? props.gap : "")};
  align-items: ${(props) => (props.alignItem ? props.alignItem : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : ""};
`;

export const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, auto);
  grid-gap: ${(props) => props.gap}px;

  /* Optional styling based on props */
  ${(props) =>
    props.centered &&
    css`
      justify-items: center;
      align-items: center;
    `}
`;

export const ButtonReset = css`
  cursor: pointer;
  background-color: none;
  outline: none;
  color: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  padding: 0;
  border: none;
  background-color: transparent;
`;

export const ErrorText = styled.div`
  padding: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 14px;
`;
