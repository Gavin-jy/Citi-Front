import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/filterReducer";
import { fetchTableData } from "../../redux/reducers/tableReducer";
import { Input, Button } from "antd";
import "./index.css";

export default function FilterItem(props) {
  const { field } = props;
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.filter.value);
  const fre = useSelector((state) => state.frequency.value);
  const [inputValue, setInputValue] = useState(filterParams[field]);

  useEffect(() => {
    setInputValue(filterParams[field]);
  }, [filterParams]);

  const handleInput = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const reset = () => {
    const newFilterParams = JSON.parse(JSON.stringify(filterParams));
    newFilterParams[field] = "";
    dispatch(setFilter(newFilterParams));
    dispatch(fetchTableData({ fre, currentPage: 1, pageSize: 10, ...newFilterParams}));
  };

  const filter = () => {
    const newFilterParams = JSON.parse(JSON.stringify(filterParams));
    newFilterParams[field] = inputValue;
    dispatch(setFilter(newFilterParams));
    // 重新获取数据
    dispatch(fetchTableData({ fre, currentPage: 1, pageSize: 10, ...newFilterParams}));
  };

  return (
    <div>
      <Input
        placeholder={`input ${field}`}
        value={inputValue}
        onChange={handleInput}
      />
      <div className="filter-button">
        <Button danger onClick={reset}>
          reset
        </Button>
        <Button type="primary" onClick={filter}>
          filter
        </Button>
      </div>
    </div>
  );
}
