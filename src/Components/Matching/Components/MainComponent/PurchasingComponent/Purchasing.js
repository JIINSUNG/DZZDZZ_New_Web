import React from "react";
import styled from "@emotion/styled";
import TicketPage from "./TicketPage";
import { ReactComponent as Jelly } from "assets/jelly.svg";
import { ReactComponent as DisabledTicket } from "assets/disabledTicket.svg";
import { ReactComponent as DisabledJelly } from "assets/DisabledJelly.svg";
import { ReactComponent as Ticket } from "assets/ticket.svg";
// import axios from "axios";

import { PurchasePageContainer } from "../../StyledComponent/MatchingStyled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateSlice from "../../../../../features/State/StateSlice";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../HeaderComponent/MenuHeader";
import MilePage from "./MilePage";
import InviteEventButton from "../../ReusableComponents/InviteEventButton";
import JellyButtonContainer from "../../ReusableComponents/JellyButtonContainer";
import { AxiosInstanse } from "../../../../../utils/AxiosInstance";

function Purchasing() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(0);
  const title = "충전하기";

  const getAsset = async () => {
    try {
      const Response = await AxiosInstanse.get(`/item/remain`);

      dispatch(StateSlice.actions.userAsset(Response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "notfirst", data: "" })
    );
  }, []);

  useEffect(() => {
    const messageListener = (e) => listener(e.data);

    document.addEventListener("message", messageListener);
    // iOS 플랫폼에서의 동작 설정
    window.addEventListener("message", messageListener);

    return () => {
      document.removeEventListener("message", messageListener);
      // iOS 플랫폼에서의 동작 설정
      window.removeEventListener("message", messageListener);
    };
  }, []);

  const getHistory = async (at, rt) => {
    try {
      const Response = await AxiosInstanse.get(`/item/history`);

      dispatch(StateSlice.actions.userHistory(Response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const userAt = useSelector((state) => {
    return state.Popup.userToken.accessToken;
  });

  const userRt = useSelector((state) => {
    return state.Popup.userToken.refreshToken;
  });

  const userAsset = useSelector((state) => {
    return state.Popup.userAsset;
  });

  useEffect(() => {
    if (userAt) getHistory();
  }, [userAt]);

  const listener = (event) => {
    const { data, type } = JSON.parse(event);

    switch (type) {
      case "buyComplete": {
        alert("구매 성공");
        break;
      }

      case "buyFail ": {
        alert("구매 실패");
        break;
      }

      case "back":
        navigate(-1);
        break;
      case "buyJelly":
        if (data) getAsset();
        // 만약 true라면
        // 자산 갱신
        break;
      case "buyTicket":
        if (data) getAsset();
        //만약 true라면
        // 티켓 갱신
        break;

      case "refresh": {
        getAsset();
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <PurchasePageContainer>
        <HeaderContainer>
          <MenuHeader title={title} />
        </HeaderContainer>
        <TicketMileChangeContainer>
          <MileSection
            value={0}
            selected={isSelected}
            onClick={() => {
              setIsSelected(0);
            }}
          >
            <ItemContainer>
              {isSelected ? <DisabledJelly /> : <Jelly />}
              <text>{userAsset.jelly}</text>
            </ItemContainer>
          </MileSection>
          <TicketSection
            value={1}
            selected={isSelected}
            onClick={() => {
              setIsSelected(1);
            }}
          >
            <ItemContainer>
              {isSelected ? <Ticket /> : <DisabledTicket />}
              <text>{userAsset.ticket}</text>
            </ItemContainer>{" "}
          </TicketSection>
        </TicketMileChangeContainer>
        <HeaderBottom>
          {isSelected ? <InviteEventButton /> : <JellyButtonContainer />}
        </HeaderBottom>
        <TicketBoxContainer>
          <ItemContainers>
            {isSelected === 1 ? <TicketPage /> : <MilePage />}
          </ItemContainers>
          <BottomContainer>
            <ReturnButton className="history">
              <Button
                className="history"
                onClick={() => {
                  navigate("/History", { state: { title: "이용내역" } });
                }}
              >
                <text>이용내역</text>
              </Button>
            </ReturnButton>
            <CouponContainer
              onClick={() => {
                navigate("/Coupon", {
                  state: { title: "쿠폰등록" },
                });
              }}
            >
              <text>쿠폰 등록하기</text>
            </CouponContainer>
          </BottomContainer>
        </TicketBoxContainer>
      </PurchasePageContainer>
    </>
  );
}

export default Purchasing;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  width: 100%;
  height: 19.53%;
`;

const ItemContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 89.74%;
  height: 78.11%;

  > text {
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 6.85%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 46.15%;
  height: 66.66%;

  > text {
    font-weight: 700;
    font-size: 16px;
    font-family: var(--font-Pretendard);

    // 비활성화시 시스템그레이 500
  }
`;

const MileSection = styled.div`
  display: flex;

  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;

  border-bottom: ${(props) =>
    props.value === props.selected ? "3px solid #FF477E" : ""};
`;

const TicketSection = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;

  border-bottom: ${(props) =>
    props.value === props.selected ? "3px solid #FF477E" : ""};
`;

const TicketMileChangeContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  top: 6.86%;
  width: 100%;
  height: 5.14%;
`;

const TicketBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 6px;

  position: absolute;
  width: 100%;
  height: 72.43%;
  top: 23%;
`;

const ReturnButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  width: 100%;
  height: 70.7%;
  left: 0px;
`;

const CouponContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 26.13%;
  min-width: 110px;
  height: 3.43%;
  top: 94.43%;

  /* Text Gray */

  > text {
    font-family: var(--font-Pretendard);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 24px */

    text-align: center;
    letter-spacing: 0.05em;
    text-transform: capitalize;

    /* dzz_iconGrey */

    color: #a39ea3;
    border-bottom: 1px solid #888888;
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 79.48%;
  height: 74.29%;

  /* dzz_pink */

  background: #ff477e;
  border-radius: 13px;

  > text {
    font-family: var(--font-Pretendard);
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 180%;
    /* identical to box height, or 29px */

    text-align: center;
    letter-spacing: 0.5px;

    /* Background/White */

    color: #ffffff;
  }

  &.history {
    border: 1px solid #ff477e;
    border-radius: 13px;
    background: white;

    > text {
      color: #ff477e;
    }
  }
`;

// const HeaderTop = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0px;
//   gap: 15px;

//   width: 89.74%;
//   height: 40.4%;
// `;

const HeaderBottom = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 12%;
  width: 100%;
  height: 10.85%;
`;

// const InviteContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   gap: 10px;

//   width: 89.74%;
//   height: 73.68%;

//   background: #ffe8e8;
//   border-radius: 13px;
// `;

// const InviteTextBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 0px;

//   width: 50.57%;
//   min-width: 195px;
//   height: 55.26%;
//   min-height: 21px;
//   margin-left: 4.57%;

//   > text {
//     font-family: var(--font-Pretendard);
//     font-style: normal;
//     font-weight: 400;
//     font-size: 13px;
//     line-height: 150%;
//     /* identical to box height, or 21px */

//     text-align: center;
//     letter-spacing: 0.05em;
//     text-transform: capitalize;

//     /* dzz_grey */

//     color: #49516f;

//     > span {
//       color: #ff477e;
//     }
//   }
// `;

// const InviteToggleButton = styled.div`
//   width: 22px;
//   height: 22px;
//   margin-right: 20px;
// `;

// const HeaderTopLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   padding: 0px;
//   gap: 38px;

//   width: 43.71%;
//   height: 100%;
// `;

// const HeaderTopRight = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 0px;
//   gap: 10px;

//   width: 17.71%;
//   min-width: 70px;
//   height: 60%;

//   /* Text Gray */

//   border-bottom: 1px solid #888888;

//   > text {
//     font-family: var(--font-Pretendard);
//     font-style: normal;
//     font-weight: 400;
//     font-size: 16px;
//     line-height: 150%;
//     /* identical to box height, or 24px */

//     text-align: center;
//     letter-spacing: 0.05em;
//     text-transform: capitalize;

//     /* dzz_iconGrey */

//     color: #a39ea3;
//   }
// `;

// const Ticketviewer = styled.div`
//   width: 77.78%;
//   min-width: 119px;

//   > text {
//     font-family: var(--font-Pretendard);
//     font-style: normal;
//     font-weight: 500;
//     font-size: 15px;
//     line-height: 24px;
//     color: #000000;
//   }
// `;
