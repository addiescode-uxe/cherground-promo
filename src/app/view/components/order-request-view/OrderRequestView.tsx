import React from "react";
import styled from "styled-components";
import InputSelections from "app/view/widgets/InputSelections";
import ClipImgPng from "cg-promotion-attach@2x.png";

const OrderRequestView = () => {
  return (
    <>
      <Overlay>
        <OrderRequestModalLayout>
          <TitleBox>
            <span style={{ whiteSpace: "nowrap" }}>주문 의뢰서 접수</span>
            <ProgressBox>
              <ProgressBar />
            </ProgressBox>
          </TitleBox>
          <SelectionsCont>
            <CategoryInputBox>
              <span style={{ marginBottom: "12px", display: "inline-block" }}>
                카테고리*
              </span>
              <Selections />
            </CategoryInputBox>
            <DesginInputWrapper>
              <ColorInputBox>
                <span style={{ position: "absolute" }}>컬러*</span>
                <InputSelections placeholderTxt={"컬러 입력"} name={"color"} />
              </ColorInputBox>
              <QuantityInputBox>
                <span style={{ position: "absolute" }}>희망수량*</span>
                <InputSelections
                  placeholderTxt={"희망 수량 입력"}
                  name={"quantity"}
                />
              </QuantityInputBox>
            </DesginInputWrapper>
            <SelectedTab></SelectedTab>
            <Selections>컬러 추가</Selections>
          </SelectionsCont>
          <Divider />
          <FileUploadCont>
            <TextBoxInput>
              <span>비고</span>
              <TextBox type="textarea" placeholder="비고 입력" />
            </TextBoxInput>
            <AttachingImg>
              <span>첨부이미지</span>
              <ImgCont>
                <ClipImg src={ClipImgPng} />
                <GuideMsg>Drop files here or</GuideMsg>
                <Label for="upload">Browse...</Label>
              </ImgCont>
              <Img type="file" id="upload" />
            </AttachingImg>
          </FileUploadCont>
          <Divider />
          <BtnCont>
            <Cancel>취소</Cancel>
            <Apply>접수</Apply>
          </BtnCont>
        </OrderRequestModalLayout>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderRequestModalLayout = styled.div`
  margin: 64px 0;
  width: 700px;
  height: 825px;
  border-radius: 2px;
  background-color: #fff;
  z-index: 555;
  padding: 0 40px;
`;

const TitleBox = styled.div`
  font-family: NanumSquare;
  height: 99px;
  font-weight: 700;
  font-size: 28px;
  color: #1e2640;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 40px;
`;

const ProgressBox = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 28px;
  z-index: 10;
  background-color: #dfdfdf;
  position: relative;
`;

const ProgressBar = styled.span`
  position: absolute;
  width: 50%;
  height: 2px;
  z-index: 22;
  background-color: #50b12f;
`;

const SelectionsCont = styled.div`
  //width: inherit;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const CategoryInputBox = styled.div`
  margin-bottom: 20px;
`;

const DesginInputWrapper = styled.div`
  display: flex;
  //width: inherit;
  justify-content: left;
  align-items: center;
`;

const ColorInputBox = styled.div`
  position: relative;
  width: 50%;
  height: auto;
`;

const QuantityInputBox = styled.div`
  position: relative;
  margin-left: 8px;
  display: flex;
  width: 50%;
  height: auto;
`;

const SelectedTab = styled.div`
  width: 100%;
`;

const Selections = styled.div`
  width: 100%;
  height: auto;
  border-radius: 2px;
  border: solid 1px #dfdfdf;
  padding: 12px 49.6px;
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  margin: 30px 0;
`;
const FileUploadCont = styled.div`
  //width: inherit;
  display: flex;
  justify-content: flex-start;
`;

const TextBoxInput = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.textarea`
  width: auto;
  height: 254px;
  border-radius: 2px;
  margin-top: 12px;
  border: solid 1px #dfdfdf;
  padding: 16px;
  display: flex;
  outline: none;
  overflow: hidden;
  resize: none;
  &::placeholder {
    font-family: NanumSquare;
    font-size: 16px;
    color: #b9bbc1;
  }
`;

const AttachingImg = styled.div`
  flex: 2;
  margin-left: 24px;
`;

const Label = styled.label`
  width: 100px;
  height: 32px;
  border-radius: 2px;
  border: solid 1px #dfdfdf;
  padding: 8px;
  font-size: 14px;
  color: #535454;
  text-align: center;
  margin-bottom: 17px;
`;

const Img = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ImgCont = styled.div`
  border: dashed 3px #dfdfdf;
  width: auto;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ClipImg = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-top: 18px;
`;

const GuideMsg = styled.p`
  font-size: 12px;
  text-align: center;
  color: #68768d;
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Cancel = styled.button`
  margin-right: 8px;
`;
const Apply = styled.button``;

export default OrderRequestView;