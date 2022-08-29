import React from "react";

export default function SummaryItem(props) {
  const { label, value, className } = props;

  return (
    <div>
      <span className="data-item">
        <span className={className}>{label}</span>
        {value}
      </span>
    </div>
  );
}
