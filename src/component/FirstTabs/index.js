import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../../redux/reducers/modeReducer";
import "./index.css";

export default function FirstTabs() {
  const dispatch = useDispatch();
  let tableIndex = useSelector((state) => state.mode.value);

  function onClickHandler(event) {
    const index = event.target.dataset.value;
    dispatch(setMode(index));
  }

  return (
    <div>
      <div className="tabs-wrapper" onClick={onClickHandler}>
        <div
          data-value={0}
          className={tableIndex == 0 ? "tab-item active" : "tab-item"}
        >
          Traditional Trade
        </div>
        <div
          data-value={1}
          className={tableIndex == 1 ? "tab-item active" : "tab-item"}
        >
          NLP Trade
        </div>
      </div>
    </div>
  );
}
