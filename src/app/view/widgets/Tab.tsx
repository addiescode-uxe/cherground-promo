import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  status: "진행중" | "완료";
  active: true | false;
}

// const [activeTab, setActiveTab] = useState("0");

// const activeHandler = () => {};

const Tab: React.FunctionComponent<TabProps> = (props) => {
  return (
    <TabLayout
      status={props.status}
      active={props.active}
      // onClick={() => {
      //   activeHandler();
      // }}
    >
      {props.status}
    </TabLayout>
  );
};

const TabLayout = styled.button<TabProps>`
  width: 100px;
  height: 40px;
  font-family: NanumSquare;
  font-size: 12px;
  text-align: center;
  color: #1f263e;
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 0;
  border-bottom: ${(props) =>
    props.active ? "2px solid #131313" : "1px solid #b8bbc2"};
`;

export default Tab;