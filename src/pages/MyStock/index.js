import { Table, Pagination, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { message } from "antd";
import api from "../../api/api";
import Header from "../../container/Header";

export default function MyStock() {
  const { Column } = Table;
  const pageSize = 10;
  const clientInfo = JSON.parse(sessionStorage.getItem("clientInfo"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [myStockData, setMyStockData] = useState({});

  async function fetchMyStockData(page) {
    try {
      const res = await api.user.getMyStockData({
        clientId: clientInfo.clientId,
        currentPage: page,
        pageSize,
      });
      setMyStockData(res.data);
    } catch (error) {
      message.error("request error");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyStockData(1);
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
    fetchMyStockData(page);
  };

  const backToHome = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div>
      <Header />
      <PageHeader
        className="site-page-header"
        onBack={backToHome}
        title="Back"
        subTitle="go back to home page"
      />
      <div className="myStock-container">
        <div className="title-stock">My Stock Information</div>
        <div className="separate-line-stock"></div>
        <div>
          <Table
            dataSource={myStockData?.dataList ?? []}
            pagination={false}
            bordered
          >
            <Column title="Ticker Name" dataIndex="ticker" key="tickerName" />
            <Column title="RIC" dataIndex="ric" key="ric" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column title="Currency" dataIndex="currency" key="currency" />
            <Column
              title="national Usd"
              dataIndex="national_usd"
              key="nationalUsd"
            />
            <Column
              title="Issuer Sector"
              dataIndex="issuer_sector_name"
              key="issuerSector"
            />
            <Column
              title="Hold Number"
              dataIndex="hold_number"
              key="holdNumber"
            />
          </Table>
        </div>
        <div className="pagination-wrapper-stock">
          <Pagination
            showTotal={(total) => `Total ${total} items`}
            current={currentPage}
            pageSize={pageSize}
            onChange={changePage}
            total={myStockData?.total ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
