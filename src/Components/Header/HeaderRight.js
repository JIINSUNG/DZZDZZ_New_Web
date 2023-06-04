import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Appstore } from "../../assets/appstore.svg";
import { ReactComponent as Androidstore } from "../../assets/androidstore.svg";
import { ReactComponent as Logo } from "../../assets/webLogo.svg";


function HeaderRight() {
   const [Day,setDay] = useState("00");
  const [Hour, setHour] = useState("01");
  const [Minute, setMinute] = useState("00");
  const [Second, setSecond] = useState("00");

  useEffect(() => {
    setInterval(() => {
      const Dday = new Date("2023-06-07T00:00:00+0900");
      const now = new Date();
      const dis = Dday.getTime() - now.getTime(); // 잔여시간(ms단위)
      const min = 1000 * 60; //1000ms => 1s , 1s*60 = 1m
      setDay(String(Math.floor(dis/(min*60*24))).padStart(2,'0'))
      setHour(String(Math.floor((dis % (min * 60 * 24)) / (min * 60))).padStart(2,"0"));
      setMinute(String(Math.floor((dis % (min * 60)) / min)).padStart(2, "0"));
      setSecond(String(Math.floor((dis % min) / 1000)).padStart(2, "0"));
    }, 1000);
  }, [Hour,Minute, Second]);

  return (
    <ContentContainer>
      <Title>
        <span>SEASON 2</span>
        <span className="text">마감까지</span>
      </Title>
      <Description>
        <Timer>
        {/* 1일이상 남았다면 일 시간 분, 1일 이하라면 시간 분 초 */}
          {Day >= 1 ?  <>[<span>{Day}</span>:<span>{Hour}</span>:<span>{Minute}</span>]</> : <>[<span>{Hour}</span>:<span>{Minute}</span>:<span>{Second}</span>]</> }
        </Timer>
        {/* 타이머 구현필요 */}
        <DownButton>
          <span>다운로드</span>
        </DownButton>
        <Sns>
        <span>단짠단짠 앱 다운로드</span>         
          <div>
            <div><Appstore width="100%" height="auto" /></div>
            <div><Androidstore width="100%" height="auto" /></div>
          </div>
        </Sns>
        <MobileSns><SnsContainer><img onClick={()=>{window.open("https://www.instagram.com/dzzdzz_official/")}} src={require("../../assets/insta.png")} alt="이미지" /><img onClick={()=>{window.open("http://pf.kakao.com/_Wgxgxmb")}} src={require("../../assets/kakao.png")} alt="이미지" /></SnsContainer></MobileSns>
      </Description>
    </ContentContainer>
  );
}

export default HeaderRight;


const MobileSns = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 30px;
margin-top: 20px;

width: 100%;
height: 86.19px;


@media screen and (max-width: 800px) {
  display: flex;
  position: absolute;
  width : 100%;
  height : 40px;
  margin-top: 0px;
  top : 46.45%;
  align-items: center;
  justify-content: center;
}
`

const SnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;


  > img {
    width : 34px;
    height : 34px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 39.72%;
  height: 32.52%;
  min-width : 572px;
  min-height : 333px;

  > img {
    visibility: hidden;
  }

  @media screen and (max-width: 800px) {
    gap: 10px;

    > img {
      width: 120px;
      height: 63.04px;
      visibility: visible;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 408px;
  height: 36px;

  > span {
    width: 150px;
    height: 36px;
    font-family: "SF Pro";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: flex-end;
    color: #ff477e;

  }

  > span.text {
    width: 70px;
    height: 23px;
    font-family: "SF Pro";
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 150%;
    letter-spacing: 0.5px;
    color: #231815;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 330px;
    height: 29px;

    > span {
      width: 125px;
      height: 29px;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */

      display: flex;
      align-items: flex-end;
    }

    > span.text {
      width: 65px;
      height: 23px;
      font-family: "SF Pro";
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 150%;
    }
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width : 31.39%;
  min-width: 452px;
  height: 194px;
  margin-top: 20px;
  border-radius: 10px;

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 150px;
    align-items: center;
    justify-content: center;
    gap : 10px
  }
`;

const Timer = styled.div`
  width: 100%;
  height: 80px;
  font-family: 'NanumSquare';
  font-style: normal;
  font-weight: 800;
  font-size: 80px;
  line-height: 80px;
  color: #ff477e;
  text-align: start;
  letter-spacing: 0.05em;

  > span {
    color: black;
  }

  @media screen and (max-width: 800px) {
    width: 330px;
    height: 75px;
    font-size: 50px;
    line-height: 70px;
    text-align: center;
    border-radius: 10px;
    font-size: 50px;
    line-height: 70px;
  }
`;

const Sns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start; 
  text-align: start;
  width: 100%;
  margin-top: 20px;

  > span {
    font-family: 'Noto Sans';
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    font-weight: bold;

  }

  > div {
    display : flex;
    width : 100%;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap : 10px;
  }
  > div > div{
    width : 45%;
  }
  > img {
    :active {
      opacity: 0.5;
    }

  }

  @media screen and (max-width: 800px) {
    display: none;
    /* display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 147.92px;
    height: 40px;
    gap: 40px;

    > img {
      :active {
        opacity: 0.5;
      }
      width: 40px;
      height: 40px;
    }*/
  } 
`;

const DownButton = styled.div`
  visibility: hidden;

  @media screen and (max-width: 800px) {
    visibility: visible;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 10px;
    width: 330px;
    height: 48px;
    background: #ff477e;
    border-width: 1px 2px 2px 1px;
    border-style: solid;
    border-color: #49516f;
    border-radius: 6px;

    > span {
      width: 70px;
      height: 26px;
      font-family: "PFStardust";
      font-style: normal;
      font-weight: 500;
      font-size: 17px;
      line-height: 150%;
      letter-spacing: 0.05em;
      text-transform: capitalize;
      color: #ffffff;
    }
  }
`;
