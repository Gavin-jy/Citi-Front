import React from "react";
import "./index.css";

export default function TabItem(props) {
  const { label, active, value } = props;

  return (
    <div
      data-value={label}
      className={active ? "tab-item-1 active" : "tab-item-1"}
    >
      {value}
    </div>
  );
}
