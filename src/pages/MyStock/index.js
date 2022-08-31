import { Table, Pagination } from 'antd';
import React, { useEffect, useState } from "react";
import "./index.css";
import { message } from "antd";
import api from "../../api/api";
import Header from "../../container/Header"

export default function MyStock() {
  const { Column } = Table;
  const pagination = false
  const pageSize = 7;
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchMyStockData(page) {
    // 发请求
    let resData = { dataList: [] };
    try {
      resData = await api.user.getMyStockData({ page, pageSize });
      setResData(resData);
    } catch (error) {
      message.error("获取失败");
      console.log(error);
    }
  };

  const [resData, setResData] = useState([]);

  useEffect(() => {
    fetchMyStockData(1)
  }, []);

  const changePage = (page) => {
    setCurrentPage(page)
    fetchMyStockData(page);
  };

  return (
    <div>
      <Header />
      <div className="myStock-container">
        <div className="title-tip">My Stock Information</div>
        <div className="separate-line"></div>
        <div>
          <Table dataSource={resData.dataList} pagination={pagination}>
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
            total={resData.total}
          />
        </div>
      </div>
    </div>
  )
}
