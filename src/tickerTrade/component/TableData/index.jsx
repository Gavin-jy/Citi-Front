import React, { useEffect, useState } from "react";
import { Pagination, Dropdown, Menu } from "antd";
import { HourglassFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchTableData } from "../../redux/reducers/tableReducer";
import "./index.css";
import SummaryItem from "../SummaryItem";
import util from "../../utils/util";
import constants from "../../utils/constants";

export default function TableData() {
  const fre = useSelector((state) => state.frequency.value);
  const data = useSelector((state) => state.table.data);
  const dispatch = useDispatch();
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(fetchTableData({ fre, currentPage: 1, pageSize }));
  }, [fre]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  /*
   * 下拉菜单事件
   */
  // 排序公共方法
  const sortCommonFunction = (item, field) => {
    if (item.key == 1) {
      // 重置
      setTableData(data);
    } else {
      // 重新排列数据
      setTableData(util.sortTableData(tableData, field, item.key - 1));
    }
  };
  // 时间
  const handleDateMenuClick = (item) => {
    sortCommonFunction(item, "date");
  };
  // 大小
  const handleSizeMenuClick = (item) => {
    sortCommonFunction(item, "size");
  };
  // 价格
  const handlePriceMenuClick = (item) => {
    sortCommonFunction(item, "price");
  };
  // 美元价格
  const handleNationalUsdMenuClick = (item) => {
    sortCommonFunction(item, "nationalUsd");
  };
  // 过滤公共方法
  const filterCommonFunction = (item, field) => {
    if (item.key == "RESET") {
      setTableData(data); // 重置
    } else {
      setTableData(util.filterTableData(data, field, item.key)); // 排序
    }
  };
  // 买入或卖出
  const handleClientSideMenuClick = (item) => {
    filterCommonFunction(item, "clientSide");
  };
  // 类型
  const handleHtPtMenuClick = (item) => {
    filterCommonFunction(item, "type");
  };

  /**
   * 下拉菜单
   */
  const dateMenu = (
    <Menu
      selectable
      onClick={handleDateMenuClick}
      items={constants.SORT_MENU_ITEMS}
    />
  );
  const sizeMenu = (
    <Menu
      selectable
      onClick={handleSizeMenuClick}
      items={constants.SORT_MENU_ITEMS}
    />
  );
  const priceMenu = (
    <Menu
      selectable
      onClick={handlePriceMenuClick}
      items={constants.SORT_MENU_ITEMS}
    />
  );
  const nationalUsdMenu = (
    <Menu
      selectable
      onClick={handleNationalUsdMenuClick}
      items={constants.SORT_MENU_ITEMS}
    />
  );
  const clientSideMenu = (
    <Menu
      selectable
      onClick={handleClientSideMenuClick}
      items={constants.CLIENT_SIDE_MENU_ITEMS}
    />
  );
  const htPtMenu = (
    <Menu
      selectable
      onClick={handleHtPtMenuClick}
      items={constants.HT_PT_MENU_ITEMS}
    />
  );

  /**
   * 切页
   */
  const changePage = (page) => {
    setCurrentPage(page);
    dispatch(fetchTableData({ fre, currentPage: page, pageSize }));
  };

  return (
    <div>
      <div className="table-wrapper">
        <div className="table-div">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="th-wrapper">
                    Date
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Client Name
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Client Side
                    <Dropdown overlay={clientSideMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Ticker
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    RIC
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Size
                    <Dropdown overlay={sizeMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Prize
                    <Dropdown overlay={priceMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    National USD
                    <Dropdown overlay={nationalUsdMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Currency
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Issuer Sector
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Salesperson
                    <Dropdown overlay={dateMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    HT/PT
                    <Dropdown overlay={htPtMenu}>
                      <HourglassFilled />
                    </Dropdown>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.dataList.map((line) => {
                return (
                  <tr key={line.id}>
                    <td>{line.date}</td>
                    <td>{line.clientName}</td>
                    <td
                      className={
                        line.clientSide === "Buy"
                          ? "data-green"
                          : line.clientSide === "Sell"
                          ? "data-red"
                          : ""
                      }
                    >
                      {line.clientSide}
                    </td>
                    <td>{line.ticker}</td>
                    <td>{line.ric}</td>
                    <td>{line.size}</td>
                    <td>{line.prize}</td>
                    <td>{line.nationalUsd}</td>
                    <td>{line.currency}</td>
                    <td>{line.issuerSector}</td>
                    <td>{line.salesperson}</td>
                    <td>{line.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="data-wrapper">
          <div className="data-items">
            <SummaryItem
              className="data-green"
              label="Total Buy: "
              value={tableData.totalBuy}
            ></SummaryItem>
            <SummaryItem
              className="data-red"
              label="Total Sell: "
              value={tableData.totalSell}
            ></SummaryItem>
            <SummaryItem
              className="data-blue"
              label="Net Quantity: "
              value={tableData.netQuantity}
            ></SummaryItem>
            <SummaryItem
              className="data-green"
              label="Total Buy National: "
              value={tableData.totalBuyNational}
            ></SummaryItem>
            <SummaryItem
              className="data-red"
              label="Total Sell National: "
              value={tableData.totalSellNational}
            ></SummaryItem>
            <SummaryItem
              className="data-blue"
              label="Net National: "
              value={tableData.netNational}
            ></SummaryItem>
          </div>
          <div>
            <span className="data-records">
              Records: {tableData.dataList.length}
            </span>
          </div>
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
    </div>
  );
}
