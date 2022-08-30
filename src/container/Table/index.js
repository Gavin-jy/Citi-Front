import React from "react";
import SecondTabs from "../../component/SecondTabs";
import TableData from "../../component/TableData";

export default function Table(props) {
  return (
    <div>
      <SecondTabs fre={props.fre} selectFre={props.selectFre}></SecondTabs>
      <TableData></TableData>
    </div>
  );
}
