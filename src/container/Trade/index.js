import React from "react";
import "./index.css";

import FirstTabs from "../../component/FirstTabs";
import TradeInputs from "../../component/TradeInputs";

export default function Trade() {
  return (
    <div>
      <FirstTabs></FirstTabs>
      <TradeInputs></TradeInputs>
      <div className="separate-line"></div>
    </div>
  );
}
