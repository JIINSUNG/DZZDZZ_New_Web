import React from "react";
import styled from "styled-components";
import { ReactComponent as Jelly } from "../../../assets/webJelly.svg";

function Statistic() {
  return (
    <ReportContainer>
      <Jelly />
      <text className="ready">페이지 준비중 입니다.</text>
      <text className="description">
        새로운 컨텐츠로 만날 수 있도록 <br />
        단짠지기가 더 발빠르게 움직이고 있어요!
      </text>
    </ReportContainer>
  );
}

export default Statistic;

const ReportContainer = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  > img {
    width: 50px;
    height: 50px;
  }
  > text.ready {
    font-family: var(--font-Pretendard-Bold);
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    letter-spacing: 0.05em;
    text-align: left;
  }

  > text.description {
    font-family: var(--font-Pretendard);
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.05em;
    text-align: center;
    color: #888888;
  }
`;
