import React, { useState } from "react";
import "./index.css";
import TabItem from "../TabItem";
import constants from "../../utils/constants";

export default function SecondTabs(props) {
  const { fre, selectFre } = props;

  const [tabItems, setTabItems] = useState(
    constants.TAB_ITEMS.map((item) => {
      if (item.label == fre) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    })
  );

  // 第二个标签栏点击事件
  function onClickHandler(event) {
    console.log(event);
    const selected = event.target.dataset.value;
    tabItems.forEach((item) => {
      item.active = item.label == selected ? true : false;
    });
    setTabItems(JSON.parse(JSON.stringify(tabItems)));
    selectFre(selected);
  }

  return (
    <div>
      <div className="tabs-wrapper-1" onClick={onClickHandler}>
        {tabItems.map((tabItem) => {
          return <TabItem key={tabItem.label} {...tabItem}></TabItem>;
        })}
      </div>
    </div>
  );
}
