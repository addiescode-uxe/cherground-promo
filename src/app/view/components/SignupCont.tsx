import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import InputBox from "../widgets/InputBox";

//받아야하는 prop의 타입을 정해줄 땐 이렇게 해준다.
//widget에 둬도 된다.

interface SignupContProps {
  match: any;
  matchId: number;
  headerTxt: string;
  descTxt: string;
  userNameHandler: (parameter: any) => string;
}

const SignupCont: React.FunctionComponent<SignupContProps> = (props) => {
  const { matchId } = props;
  let boxIndexes = [];

  const checkBoxIndex = (matchId) => {
    if (matchId === 1) {
      boxIndexes = ["이름", "연락처", "기본 배송지"];
    } else if (matchId >= 2) {
      boxIndexes = ["사용자 명", "이메일", "비밀번호", "비밀번호 확인"];
    }
    return boxIndexes;
  };

  return (
    <SignupContWrapper>
      <SignupContCont>
        <HeadingArea>{props.headerTxt}</HeadingArea>
        <Desc>{props.descTxt}</Desc>
        <InputBoxCont>
          {checkBoxIndex(matchId).map((title, idx) => {
            if (idx === 0) {
              return (
                <InputBox
                  placeholderTxt={title}
                  userNameHandler={props.userNameHandler}
                />
              );
            } else {
              return <InputBox placeholderTxt={title} />;
            }
          })}
        </InputBoxCont>
      </SignupContCont>
    </SignupContWrapper>
  );
};

const SignupContWrapper = styled.div`
  margin: 0 430px;
`;
const SignupContCont = styled.div`
  margin-top: 136px;
`;
const HeadingArea = styled.h2`
  font-family: NanumSquare;
  font-weight: 700;
  font-size: 28px;
  text-align: center;
  color: #1f263e;
  margin-bottom: 16px;
`;
const Desc = styled.h5`
  font-family: NanumSquare;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #1f263e;
`;

const InputBoxCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SignupCont;