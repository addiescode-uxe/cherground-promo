import React, { useReducer, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import DropDownBox from "app/view/widgets/DropDownBox";
import SearchBox from "app/view/widgets/SearchBox";
import PromotionHeader from "app/view/widgets/PromotionHeader";
import OrderStatusViewLayout from "app/view/components/orderstatus-view/OrderStatusViewLayout";
import TitleContLayout from "app/view/components/orderstatus-view/TitleContLayout";
import SelectionBox from "app/view/components/orderstatus-view/SelectionBox";
import StatusContLayout from "app/view/components/orderstatus-view/StatusContLayout";
import ListBox from "app/view/components/asset/listBox/ListBox";
import ListViewWrapper from "app/view/components/orderstatus-view/ListViewWrapper";
import OrderRequestIntro from "app/view/components/order-request-view/OrderRequestIntro";
import Tab from "app/view/widgets/Tab";
import TabContainerLayout from "app/view/components/orderstatus-view/TabContainerLayout";
import OrderInputButton from "app/view/widgets/OrderInputButton";
import InputSelections from "app/view/widgets/InputSelections";
import ActionButton from "app/view/widgets/ActionButton";
import reducer from "app/view/reducers/orderReducers";
import { OrderListViewModel } from "app/view-model";
import container from "injector";

const OrderStatusView: React.FunctionComponent<RouteComponentProps> = (
  props
) => {
  const viewModel: OrderListViewModel = container.get<OrderListViewModel>(
    "OrderListViewModel"
  );

  const loggedInEmail = props.history.location.state;
  const [tabIdxChanged, setTabIdxChanged] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [filteringText, setfilteringText] = useState<string[]>(["상태"]);
  const [filteredItems, setfilteredItems] = useState<string[]>([
    "모두1",
    "모두2",
    "모두3",
    "모두4",
    "모두5",
  ]);
  const [activeTab, setactiveTab] = useState(true);
  const labelText: string[] = [
    "대기",
    "원부자재 선택",
    "샘플 제작",
    "배송",
    "제작",
    "완료",
  ];
  const orderState = {
    brand: "",
    style: "",
  };

  const [orderList, setOrderList] = useState<Array>([]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [state, dispatch] = useReducer(reducer, orderState);
  const [isSelectBoxOpend, setIsSelectBoxOpend] = useState<boolean>(false);

  useEffect(() => {
    viewModel
      .displayOrderListView(loggedInEmail)
      .then((res) => setOrderList(res))
      .catch((err) => console.log(err));
  }, []);

  const arrowChangeHandler = () => {
    setIsSelectBoxOpend(!isSelectBoxOpend);
  };
  // 이 경우 배열 대신 객체 형태로 받는 것이 좋다.
  // 실제 데이터 호출을 할 때는 완료인 것과 완료 아닌 것 구분 해서 온다.
  // 완료 아닌 것 map을 돌리면서 label의 text만 들어가서 렌더링 되도록.

  const selectItems = (item: string, idx: number) => {
    console.log(idx);
    setSelectedIdx(idx);
    setIsSelectBoxOpend(false);
  };

  const tabChangeHandler = (status: string) => {
    setTabIdxChanged(!tabIdxChanged);
    setactiveTab(!activeTab);
  };

  const modalOpenHandler = () => {
    setModalOpen(true);
  };
  const closeBox = () => {
    setIsSelectBoxOpend(false);
  };

  const ordersView = () => {
    const notCompleteOrder = orderList.filter(
      (order) => order.requestStatusName !== "COMPLETE"
    );
    const completeOrder = orderList.filter(
      (order) => order.requestStatusName === "COMPLETE"
    );

    if (!tabIdxChanged) {
      return notCompleteOrder;
    } else {
      return completeOrder;
    }
  };

  return (
    <>
      {
        <OrderRequestIntro
          isModalOpen={isModalOpen}
          close={() => setModalOpen(false)}
          email={loggedInEmail}
        />
      }
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
          <SelectionBox>
            <DropDownBox
              closeBox={closeBox}
              selectedIdx={selectedIdx}
              selectItems={selectItems}
              filteringText={filteringText}
              filteredItems={filteredItems}
              isSelectBoxOpend={isSelectBoxOpend}
              arrowChangeHandler={arrowChangeHandler}
            />
            <OverlayBox onClick={closeBox} />
            <OrderInputButton onClick={modalOpenHandler} />
          </SelectionBox>
          <ListViewWrapper>
            {!tabIdxChanged &&
              ordersView().map((item, idx) => (
                <ListBox
                  labelStatus={item.requestStatusName}
                  key={idx}
                  styleName={item.styleName}
                  brandName={item.brandName}
                />
              ))}
            {tabIdxChanged &&
              ordersView().map((item, idx) => (
                <ListBox
                  labelStatus={item.requestStatusName}
                  key={idx}
                  styleName={item.styleName}
                  brandName={item.brandName}
                />
              ))}
          </ListViewWrapper>
        </StatusContLayout>
      </OrderStatusViewLayout>
      {/* </Overlay> */}
    </>
  );
};

export default OrderStatusView;

const OverlayBox = styled.div`
  width: 300px;
`;
