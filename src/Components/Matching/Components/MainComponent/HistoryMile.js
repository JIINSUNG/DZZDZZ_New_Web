import React from 'react'
import styled from 'styled-components';
function HistoryMile() {
  return (
    <>
              <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>
              <ListItemContainer>                <ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>
              <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1 </text></ItemRight></ItemBox></ListItemContainer>
            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>매칭 참여 (이전매칭)</text></ItemLeft><ItemRight><text className="title">티켓</text><text className='use'>-1</text></ItemRight></ItemBox></ListItemContainer>
                <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>매칭 참여 (혼성)</text></ItemLeft><ItemRight><text className="title">티켓</text><text className='use'>-1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>            <ListItemContainer><ItemBox>
                <ItemLeft><text className="time">23.05.14 12:44</text><text>친구 초대 이벤트 보상</text></ItemLeft><ItemRight><text className="title">티켓</text><text>+1</text></ItemRight></ItemBox></ListItemContainer>
                </>  
  )
}

export default HistoryMile


const ListItemContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  left: 0px;
  border-bottom: 0.7px solid #EEEEEE;
`;

const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  width: 30%;
  min-width: 150px;
  height: 100%;
  margin-left : 4.57%;

  > text {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* identical to box height, or 21px */
text-align: center;
letter-spacing: 0.05em;
text-transform: capitalize;
/* Text Black */
color: #000000;

}

  > text.time {
    font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* identical to box height, or 21px */

text-align: center;
letter-spacing: 0.05em;
text-transform: capitalize;

/* Text Gray */

color: #888888;
  }


`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
  margin-right : 4.57%;

  width: 23.6%;
  min-width : 72px;
  height: 100%;
  
> text {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;

  /* SystemRed/Light */

  color: #FF3B30;

    &.use {
   color: #49516F;
    }
}

  > text.title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */


  color: #888888;
  }



  > text > span {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: capitalize;

    /* SystemRed/Light */

    color: #FF3B30;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 89.74%;
  height: 70%;
`;
