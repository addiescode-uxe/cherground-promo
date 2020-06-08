import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import DropDownBox from "app/view/widgets/DropDownBox";
import SearchBox from "app/view/widgets/SearchBox";
import PromotionHeader from "app/view/widgets/PromotionHeader";
import OrderStatusViewLayout from "app/view/components/orderstatus-view/OrderStatusViewLayout";
import TitleContLayout from "app/view/components/orderstatus-view/TitleContLayout";
import StatusContLayout from "app/view/components/orderstatus-view/StatusContLayout";
import ListBox from "app/view/components/asset/listBox/ListBox";
import Tab from "app/view/widgets/Tab";
import TabContainerLayout from "app/view/components/orderstatus-view/TabContainerLayout";
import OrderInputButton from "app/view/widgets/OrderInputButton";

const OrderStatusView: React.FunctionComponent<RouteComponentProps> = (
  props
) => {
  const [tabIdxChanged, setTabIdxChanged] = useState(false);

  const [activeTab, setactiveTab] = useState(true);

  const labelText: string[] = [
    "대기",
    "원부자재 선택",
    "샘플 제작",
    "배송",
    "제작",
    "완료",
  ];
  // 이 경우 배열 대신 객체 형태로 받는 것이 좋다.
  // 실제 데이터 호출을 할 때는 완료인 것과 완료 아닌 것 구분 해서 온다.
  // 완료 아닌 것 map을 돌리면서 label의 text만 들어가서 렌더링 되도록.

  const tabChangeHandler = (status: string) => {
    setTabIdxChanged(!tabIdxChanged);
    setactiveTab(!activeTab);
  };

  const arrc = labelText.filter((item, idx) => idx <= 4);

  return (
    <>
      <PromotionHeader />
      <OrderStatusViewLayout>
        <TitleContLayout>제작 주문</TitleContLayout>
        <TabContainerLayout>
          <Tab
            status={"진행중"}
            active={activeTab}
            onClickHandler={tabChangeHandler}
          />
          <Tab
            status={"완료"}
            active={!activeTab}
            onClickHandler={tabChangeHandler}
          />
        </TabContainerLayout>
        <StatusContLayout>
          <DropDownBox />
          <SearchBox />
          <OrderInputButton />
        </StatusContLayout>
        {!tabIdxChanged && arrc.map((item) => <ListBox labelStatus={item} />)}
        {tabIdxChanged && <ListBox labelStatus={labelText[5]} />}
      </OrderStatusViewLayout>
    </>
  );
};

export default OrderStatusView;
