import React, { useState, useRef } from "react";
import styled from "styled-components";

interface InputSelectionsProps {
  placeholderTxt: string;
  name: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirmed: boolean;
}

const InputSelections: React.FunctionComponent<InputSelectionsProps> = (
  props
) => {
  const [isValid, setIsValid] = useState("default");
  const formRef: React.RefObject<HTMLFormElement> | null | undefined = useRef();
  const onBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsValid("isNotValid");
    } else {
      setIsValid("default");
    }
  };

  const onFocusHandler = () => {
    setIsValid("isValid");
  };

  if (props.isConfirmed) {
    formRef.current.reset();
  }

  return (
    <SelectionsWrapper>
      <ErrorMsg isValid={isValid}>에러 메시지</ErrorMsg>
      <FormTagInput onChange={(e) => props.onChangeHandler(e)} ref={formRef}>
        <InputCont
          type="text"
          placeholder={props.placeholderTxt}
          isValid={isValid}
          onFocus={() => onFocusHandler()}
          onBlur={(e) => onBlurHandler(e)}
          name={props.name}
        />
      </FormTagInput>
    </SelectionsWrapper>
  );
};

const SelectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMsg = styled.div<{ isValid: string }>`
  margin-left: auto;
  font-size: 12px;
  color: #d50000;
  margin-bottom: 13px;
  visibility: ${(props) =>
    props.isValid === "isNotValid" ? "visible" : "hidden"};
`;

const FormTagInput = styled.form`
  margin-bottom: 20px;
`;

const InputCont = styled.input<{ isValid: string }>`
  width: 306px;
  height: 48px;
  border-radius: 2px;
  padding: 15px 7.7px 15px 16px;
  font-family: NanumSquare;
  font-size: 16px;
  color: #131313;

  ${(props) => {
    if (props.isValid === "isValid") {
      return `border: 1px solid #dfdfdf; border-bottom: 2px solid #1e1e1e`;
    } else if (props.isValid === "isNotValid") {
      return `border: 1px solid #d50000`;
    } else if (props.isValid === "default") {
      return `border: 1px solid #dfdfdf`;
    }
  }}

  &::placeholder {
    font-family: NanumSquare;
    font-size: 16px;
    color: #b9bbc1;
  }
`;

export default InputSelections;
