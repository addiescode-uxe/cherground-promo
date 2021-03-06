import React, { useReducer, useCallback, useState } from "react";
import styled from "styled-components";
import reducer from "app/view/reducers/orderReducers";
// import { RouteComponentProps, withRouter } from "react-router-dom";
import InputSelections from "app/view/widgets/InputSelections";
import ActionButton from "app/view/widgets/ActionButton";
import OrderRequestView from "./OrderRequestView";

interface OrderRequestIntroProps {
  close: () => void;
  isModalOpen: boolean;
  email: string;
}

const OrderRequestIntro: React.FunctionComponent<OrderRequestIntroProps> = (
  props
) => {
  const orderState = {
    brand: "",
    style: "",
  };

  const [stage, setStage] = useState(1);
  const [brandName, setBrandName] = useState<string>("");
  const [styleName, setStyleName] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, orderState);
  const { brand, style } = orderState;
  const { errorMsg } = state;

  const NameCheckHandler = useCallback((e) => {
    const { value, name } = e.target;
    console.log(dispatch);
    // dispatch({
    //   type: "NAME_INFO",
    //   name,
    //   value,
    // });
  }, []);

  const checkNextAble = () => {
    if (brandName.length > 0 && styleName.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const cancelHandler = useCallback(() => {
    props.close();
  }, []);

  const nextHandler = () => {
    // props.history.push({
    //   pathname: "/request",
    //   state: { ...state },
    // });
    setStage(2);
  };

  // let introStyle = {
  //   width: "100%",
  //   height: "2px",
  // };

  // if (props.location.pathname === "/intro") {
  //   introStyle = {
  //     width: "50%",
  //     height: "3px",
  //   };
  // }

  return (
    <>
      <Overlay isModalOpen={props.isModalOpen}>
        {stage === 1 && (
          <OrderRequestModalLayout>
            <TopLayout>
              <TitleBox>
                <span style={{ whiteSpace: "nowrap" }}>주문 의뢰서 접수</span>
                <ProgressBox>
                  <ProgressBar stage={1} />
                </ProgressBox>
              </TitleBox>
              <IntroSection>
                <IntroIcon />
                <IntroBox>
                  <IntroInputCont>Cher Ground Promotion</IntroInputCont>
                  <IntroInputSub>
                    Cher Ground로 통한 프로모션은 원하는 상품 설명과 희망 수량을
                    입력하면 제작이 가능합니다!
                  </IntroInputSub>
                </IntroBox>
              </IntroSection>
              <BrandInputBox>
                <span style={{ fontSize: "14px" }}>브랜드명*</span>
                <InputSelections
                  placeholderTxt={"브랜드명 입력"}
                  name={"brand"}
                  onChangeHandler={(e) => {
                    setBrandName(e.target.value);
                  }}
                  width={"100%"}
                  NameCheckHandler={NameCheckHandler}
                  errorMsg={errorMsg}
                />
              </BrandInputBox>
              <StyleInputBox>
                <span style={{ fontSize: "14px" }}>스타일명*</span>
                <InputSelections
                  placeholderTxt={"스타일명 입력"}
                  onChangeHandler={(e) => {
                    setStyleName(e.target.value);
                  }}
                  name={"style"}
                  width={"100%"}
                  NameCheckHandler={NameCheckHandler}
                  errorMsg={errorMsg}
                />
              </StyleInputBox>
            </TopLayout>
            <Divider />
            <BtnCont>
              <ActionButton
                buttonName={"SECONDARY"}
                isEnable
                buttonText={"취소"}
                onClick={cancelHandler}
              />
              <ActionButton
                buttonName={"PRIMARY"}
                isEnable={checkNextAble()}
                buttonText={"다음"}
                onClick={nextHandler}
                styleExist={style}
                brandExist={brand}
              />
            </BtnCont>
          </OrderRequestModalLayout>
        )}
        {stage === 2 && (
          <OrderRequestView
            brand={brandName}
            style={styleName}
            onClick={() => props.close()}
            email={props.email}
          />
        )}
      </Overlay>
    </>
  );
};

const Overlay = styled.div<{ isModalOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 666;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: ${(props) => (props.isModalOpen ? "block" : "none")};
  //visibility: ${(props) => (props.isModalOpen ? "visible" : "hidden")};
`;

const OrderRequestModalLayout = styled.div`
  width: 700px;
  height: 565px;
  border-radius: 2px;
  background-color: #fff;
  z-index: 555;
  margin: 130px auto;
  justify-content: center;
  align-items: center;
`;

const TopLayout = styled.div`
  padding: 0 40px;
`;

const TitleBox = styled.div`
  font-family: NanumSquare;
  font-weight: 700;
  font-size: 28px;
  color: #1e2640;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 40px;
`;

const ProgressBox = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 28px;
  z-index: 10;
  background-color: #dfdfdf;
  position: relative;
`;

const ProgressBar = styled.span<{ stage: number }>`
  position: absolute;
  width: ${(props) => (props.stage === 1 ? "50%" : "100%")};
  height: 2px;
  z-index: 22;
  background-color: #50b12f;
`;
const IntroSection = styled.div`
  width: 100%;
  height: 68px;
  border-radius: 2px;
  background-color: #f4f6f8;
  display: flex;
  align-items: center;
  margin: 16px 0 28px 0;
`;

const IntroIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #68768d;
  border-radius: 50%;
  margin-left: 16px;
`;

const IntroBox = styled.div`
  margin-left: 16px;
  align-items: center;
`;

const IntroInputCont = styled.p`
  height: 16px;
  font-family: NanumSquare;
  font-size: 14px;
  color: #1e2640;
  margin: 0 0 4px 0;
`;

const IntroInputSub = styled.p`
  height: 16px;
  font-family: NanumSquare;
  font-size: 14px;
  color: #1e2640;
  margin: 0;
`;

const BrandInputBox = styled.div``;

const StyleInputBox = styled.div``;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin: 50px 0 20px 0;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 32px 0 0;
`;

export default OrderRequestIntro;
