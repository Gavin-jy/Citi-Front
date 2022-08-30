import { Table, Pagination } from 'antd';
import React, { useEffect, useState } from "react";
import "./index.css";
import { message } from "antd";
import api from "../../api/api";

export default function MyStock() {
  const { Column } = Table;
  const pagination = false
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchMyStockData() {
    // 发请求
    let resData = { dataList: [] };
    try {
      resData = await api.user.getMyStockData({ currentPage, pageSize });
    } catch (error) {
      message.error("获取失败");
      console.log(error);
    }
    return resData;
    debugger
  };

  const data =await fetchMyStockData();
  const [tableData, setTableData] = useState(data.dataList);
  debugger

  useEffect(() => {
    setTableData(data.dataList);
  }, [data]);

  const changePage = (page) => {
    setCurrentPage(page);
    data=await fetchMyStockData();
  };


  return (
    <div className="myStock-container">
      <div className="title-tip">My Stock Information:</div>
      <div className="separate-line"></div>
      <div>
        <Table dataSource={tableData} pagination={pagination}>
          <Column title="Ticker Name" dataIndex="tickerName" key="tickerName" />
          <Column title="RIC" dataIndex="ric" key="ric" />
          <Column title="Price" dataIndex="price" key="price" />
          <Column title="Issuer Sector" dataIndex="issuerSector" key="issuerSector" />
          <Column title="Sales Person" dataIndex="salesPerson" key="salesPerson" />
          <Column title="Hold Number" dataIndex="holdNumber" key="holdNumber" />
          <Column title="Type" dataIndex="type" key="type" />
        </Table>
      </div>
      <div className="pagination-wrapper">
        <Pagination
          showTotal={(total) => `Total ${total} items`}
          current={currentPage}
          pageSize={pageSize}
          onChange={changePage}
          total={data.total}
        />
      </div>
    </div>
  )
}
