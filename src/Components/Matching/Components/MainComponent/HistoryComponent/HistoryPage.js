import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Jelly } from "assets/jelly.svg";
import { ReactComponent as DisabledTicket } from "assets/disabledTicket.svg";
import { ReactComponent as DisabledJelly } from "assets/DisabledJelly.svg";
import { ReactComponent as Ticket } from "assets/ticket.svg";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateSlice from "features/State/StateSlice";
import { useNavigate, useLocation } from "react-router-dom";
import MenuHeader from "../../HeaderComponent/MenuHeader";
import HistoryTicket from "./HistoryTicket";
import HistoryMile from "./HistoryMile";
// import axios from "axios";
import { AxiosInstanse } from "../../../../../utils/AxiosInstance";

function HistoryPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(0);

  const getHistory = async () => {
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

  useEffect(() => {
    if (userAt != null) getHistory();
  }, [userAt]);

  // useEffect(() => {
  //   console.log(userHistory);
  // }, [userHistory]);

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
    }
  };

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

  const userAsset = useSelector((state) => {
    return state.Popup.userAsset;
  });

  const userHistory = useSelector((state) => {
    return state.Popup.userAsset;
  });

  return (
    <>
      <PurchasePageContainer>
        <HeaderContainer>
          <MenuHeader title={location.state.title} />
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
        <ListContainer>
          {isSelected ? <HistoryTicket /> : <HistoryMile />}
        </ListContainer>
      </PurchasePageContainer>
    </>
  );
}

export default HistoryPage;

const HeaderContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 6.85%;
`;

const ListContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 13.43%;
  width: 100%;
  height: 86.57%;
  overflow-y: scroll;
`;

const PurchasePageContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
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
