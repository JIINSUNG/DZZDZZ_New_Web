import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
// import axios from "axios";
import { useDispatch } from "react-redux";
import StateSlice from "features/State/StateSlice";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import Logo from "assets/matching_logo2.json";
import { AxiosInstanse } from "../../../../../../utils/AxiosInstance";

var Spinner = require("react-spinkit");

// 3가지 케이스 매칭완료 -> 결과확인 (성사, 실패, 거절) 결과대기 -> 나 승인
// 나의 매칭 상태를 가져오고, 나의 매칭 결과를 가져온다.
// 자원이 로드되는대로 바로 이동 한다.

function ChoiceLoading() {
  const location = useLocation();
  const Theme = location.state.theme; // Theme-> 0이면 커플, 1이면 친구임
  const Category = location.state.Result; // Category -> 0이면 상대방정보 불러오기, Category ->1 이면 결과 가져오기
  const matchingType = ["Couple", "Friend"];
  const [loading, setLoading] = useState(true);
  const [MatchedUserData, setMatchedUserData] = useState(null);
  const [MatchResult, setMatchResult] = useState("");
  const [domain, setDomain] = useState();
  const [isReject, setReject] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAt = useSelector((state) => {
    return state.Popup.userToken.accessToken;
  });

  const userRt = useSelector((state) => {
    return state.Popup.userToken.refreshToken;
  });

  const FriendmatchResult = useSelector((state) => {
    return state.Popup.FriendmatchResult;
  });

  const CouplematchResult = useSelector((state) => {
    return state.Popup.CouplematchResult;
  });

  // 현재 데이터 가져오는 API 수정중, 추후 대체하기

  const getReason = async () => {
    try {
      const Response = await AxiosInstanse.get(
        `/matching/user/reject-reason/preview?matchingType=${matchingType[Theme]}` // 매칭타입 가변적으로 만들어주기
      );
      //  거절사유가 있는 경우
      if (Response.data.data.exists) {
        setReject(true);
        dispatch(StateSlice.actions.rejectReason(Response.data.data));
      } else {
        setReject(false);
      }

      // 매칭상대방 정보 불러오기
    } catch (error) {
      console.log(error);
    }
  };
  const getMatchedUserInfo = async () => {
    try {
      const Response = await AxiosInstanse.get(
        `${domain}${matchingType[Theme]}`
      );
      // dispatch(StateSlice.actions.matchParticipate(Response.data.data));
      dispatch(StateSlice.actions.MatchedUserInfo(Response.data.data));
      setMatchedUserData(Response.data.data);

      // 매칭상대방 정보 불러오기
    } catch (error) {
      console.log(error);
    }
  };

  // 커플, 친구 매칭결과 조회 (받은 테마에 따라)
  useEffect(() => {
    if (Theme === 0) {
      setMatchResult(CouplematchResult);
    } else {
      setMatchResult(FriendmatchResult);
    }
  }, []);

  useEffect(() => {
    // 도메인정하기
    if (MatchResult) {
      if (MatchResult.matchingResult === "RoundSuccess") {
        setDomain("/matching/user/success/info?matchingType=");
      }
      // 상대방을 거절한 경우
      else if (MatchResult.myChoice === "Reject") {
        setDomain("/matching/user/fail/info?matchingType=");
      } else if (MatchResult.matchingResult === "RoundFail") {
        //  상대방이 나를 거절한 경우
        setDomain("/matching/user/fail/info?matchingType=");
        getReason();
      } else if (MatchResult.matchingResult === "WaitRoundResult") {
        // 나는 상대방을 선택했는데 아직 상대방이 나를 선택안한 경우
        setDomain("/matching/user/info?matchingType=");
      }
    }
  }, [MatchResult]);

  useEffect(() => {
    if (!MatchedUserData && domain) {
      getMatchedUserInfo(); //토큰값 넣어주기
    } else {
      setLoading(false);
    }
  }, [MatchedUserData, domain]);

  // 매칭성공한 경우는 상대방 정보를 불러와 전송 (현재 어떤식으로 데이터가 들어올지 모르는 상태)
  // 그 외 라면 나랑 매칭된 상대방 정보를 불러와 전송
  // 나랑 매칭된 상대방의 정보 자원이 로딩되면 바로 화면 넘길거임

  useEffect(() => {
    {
      if (MatchedUserData !== null && domain) {
        setLoading(false);
        // 매칭이 성사된 경우

        if (MatchResult.matchingResult === "RoundSuccess") {
          navigate("/choice", { state: { Result: 0, Direct: false } });
        }
        // 상대방을 거절한 경우
        else if (MatchResult.myChoice === "Reject") {
          navigate("/choice", { state: { Result: 3, Direct: false } });
        } else if (MatchResult.matchingResult === "RoundFail") {
          //  상대방이 나를 거절한 경우
          if (isReject) {
            navigate("/choice", {
              state: {
                Result: 2,
                Direct: false,
                rejectReason: true,
                matchingType: Theme,
              },
            });
          } else if (!isReject) {
            navigate("/choice", {
              state: { Result: 2, Direct: false, rejectReason: false },
            });
          }
        } else if (MatchResult.matchingResult === "WaitRoundResult") {
          // 나는 상대방을 선택했는데 아직 상대방이 나를 선택안한 경우
          navigate("/choice", {
            state: { Result: 1, Direct: true, Selected: false },
          });
        }
      }
    }
  }, [MatchedUserData]);

  //
  // 내가 선택했는데 상대방은 아직 나를 선택안한경우 -> 나랑매칭된상대방정보 조회 API
  // 내가 상대방 거절했을때, 상대방이 나를 거졀했을때 -> 실패API (누가 거절했는지 구분필요)
  // 나도 상대방을 승락, 상대방도 나를 승락 (매칭성사시) -> 성공한 API필요
  //

  return (
    <MatchingContainer>
      {loading ? (
        <SpinnerContainer>
          <Spinners name="line-spin-fade-loader" />
        </SpinnerContainer>
      ) : (
        <></>
      )}
      <CardContainer>
        <CardContents theme={Theme}>
          <LottieContainer>
            {" "}
            <Lottie animationData={Logo} />
          </LottieContainer>
          {Category === 0 ? (
            <text>
              나의<br></br>
              <span>매칭 정보를</span>
              <br />
              불러와요!
            </text>
          ) : (
            <text>
              드디어<br></br>
              <span>매칭결과</span>가<br />
              나왔어요!
            </text>
          )}
        </CardContents>
      </CardContainer>

      <MatchingConfirmContainer theme={Theme}>
        {
          loading ? (
            <text>
              불러오는중...
              <br />
              자동으로 이동 예정이에요.
            </text>
          ) : (
            <></>
          ) // 로딩되면 자동으로 결과페이지로 이동
        }
      </MatchingConfirmContainer>
    </MatchingContainer>
  );
}

export default ChoiceLoading;

const LottieContainer = styled.div`
  width: 65px;
  height: 65px;
`;

const MatchingContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  min-width: 375px;
  min-height: 700px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  //padding: 20px;
  //gap: 10px;
  position: absolute;
  width: 100px;
  height: 100px;
  top: 54.62%;

  border-radius: 5px;
`;

const CardContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 38px;
  top: 19.71%;
  width: 66.66%;
  height: 26%;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 30px;
  width: 46.9%;
  height: 100%;

  > text {
    font-family: var(--font-Pretendard-SemiBold);
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    text-align: center;

    /* dzz_black */
    color: #333333;
  }

  > text > span {
    color: ${(props) => (props.theme === 1 ? "#0094FF" : "#FF477E")};
  }

  > img {
    width: 50px;
    height: 50px;
  }
`;

const MatchingConfirmContainer = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7.14%;
  min-height: 50px;
  top: 72.57%;
  /* or 156% */
  text-align: center;
  /* dzz_pink */

  > text {
    font-family: var(--font-Pretendard);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    /* or 156% */
    text-align: center;
    /* dzz_pink */
    color: ${(props) => (props.theme === 1 ? "#0094FF" : "#FF477E")};
  }
`;

const MatchingConfirm = styled.div``;

const ConfirmButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10px;
  left: 16.67%;
  width: 66.66%;
  height: 100%;
  /* dzz_pink */
  background: ${(props) => (props.theme === 1 ? "#0094FF" : "#FF477E")};
  border-radius: 13px;

  > text {
    font-family: var(--font-Pretendard-SemiBold);
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    text-align: center;
    letter-spacing: 0.05em;
    text-transform: capitalize;

    color: #ffffff;
  }
`;

export const Spinners = styled(Spinner)`
  display: "flex";
  left: 35px;
  top: 30px;
  color: lightgray;
  width: 80px;
  height: 80px;
`;
