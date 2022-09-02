import React, { useEffect, useState } from "react";
import { Pagination, Dropdown, Menu, Popover, Empty } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchTableData } from "../../redux/reducers/tableReducer";
import { setFilter } from "../../redux/reducers/filterReducer";
import "./index.css";
import SummaryItem from "../SummaryItem";
import FilterItem from "../FilterItem";
import constants from "../../utils/constants";
import util from "../../utils/util";

export default function TableData() {
  const fre = useSelector((state) => state.frequency.value);
  const data = useSelector((state) => state.table.data);
  const filterParams = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(
      fetchTableData({ fre, currentPage: 1, pageSize, ...filterParams })
    );
  }, [fre]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  /*
   * 下拉菜单事件
   */
  // 抽离过滤公共方法
  const filterCommonFunction = (item, field) => {
    const newFilterParams = JSON.parse(JSON.stringify(filterParams));
    newFilterParams[field] = item.key;
    setCurrentPage(1);
    dispatch(setFilter(newFilterParams));
    dispatch(
      fetchTableData({ fre, currentPage: 1, pageSize: 10, ...newFilterParams })
    );
  };
  // 时间
  const handleDateMenuClick = (item) => {
    filterCommonFunction(item, "date");
  };
  // 大小
  const handleSizeMenuClick = (item) => {
    filterCommonFunction(item, "size");
  };
  // 价格
  const handlePriceMenuClick = (item) => {
    filterCommonFunction(item, "price");
  };
  // 美元价格
  const handleNationalUsdMenuClick = (item) => {
    filterCommonFunction(item, "nationalUsd");
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
    dispatch(
      fetchTableData({ fre, currentPage: page, pageSize, ...filterParams })
    );
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
                    <Dropdown overlay={dateMenu} arrow placement="bottom">
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Client Name
                    <Popover
                      content={<FilterItem field="clientName" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Client Side
                    <Dropdown overlay={clientSideMenu} arrow placement="bottom">
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Ticker
                    <Popover
                      content={<FilterItem field="ticker" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    RIC
                    <Popover
                      content={<FilterItem field="ric" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Size
                    <Dropdown overlay={sizeMenu} arrow placement="bottom">
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Price
                    <Dropdown overlay={priceMenu} arrow placement="bottom">
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    National USD
                    <Dropdown
                      overlay={nationalUsdMenu}
                      arrow
                      placement="bottom"
                    >
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Currency
                    <Popover
                      content={<FilterItem field="currency" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Issuer Sector
                    <Popover
                      content={<FilterItem field="issuerSector" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    Salesperson
                    <Popover
                      content={<FilterItem field="salesperson" />}
                      placement="bottom"
                      title="filter setter"
                    >
                      <FilterFilled />
                    </Popover>
                  </div>
                </th>
                <th>
                  <div className="th-wrapper">
                    HT/PT
                    <Dropdown overlay={htPtMenu} arrow placement="bottom">
                      <FilterFilled />
                    </Dropdown>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!tableData.dataList || tableData.dataList.length === 0 ? (
                <tr>
                  <td colSpan={12}>
                    <Empty className="empty-table" description="Sorry, no table data !" />
                  </td>
                </tr>
              ) : (
                tableData.dataList.map((line) => {
                  return (
                    <tr key={line.trade_id}>
                      <td>{util.formatFullTime(line.trade_date)}</td>
                      <td>{line.client_name}</td>
                      <td
                        className={
                          line.client_side === "Buy"
                            ? "data-green"
                            : line.client_side === "Sell"
                            ? "data-red"
                            : ""
                        }
                      >
                        {line.client_side}
                      </td>
                      <td>{line.ticker}</td>
                      <td>{line.ric}</td>
                      <td>{line.size}</td>
                      <td>{line.price}</td>
                      <td>{line.national_usd}</td>
                      <td>{line.currency}</td>
                      <td>{line.issuer_sector_name}</td>
                      <td>{line.sales_person_name}</td>
                      <td>{line.trade_type}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="data-wrapper">
          <div className="data-items">
            <SummaryItem
              className="data-green"
              label="Total Buy: "
              value={tableData?.totalBuy ?? 0}
            ></SummaryItem>
            <SummaryItem
              className="data-red"
              label="Total Sell: "
              value={-tableData?.totalSell ?? 0}
            ></SummaryItem>
            <SummaryItem
              className="data-blue"
              label="Net Quantity: "
              value={tableData?.netQuantity ?? 0}
            ></SummaryItem>
            <SummaryItem
              className="data-green"
              label="Total Buy National: "
              value={tableData?.totalBuyNational ?? 0}
            ></SummaryItem>
            <SummaryItem
              className="data-red"
              label="Total Sell National: "
              value={-tableData?.totalSellNational ?? 0}
            ></SummaryItem>
            <SummaryItem
              className="data-blue"
              label="Net National: "
              value={tableData?.netNational ?? 0}
            ></SummaryItem>
          </div>
          <div>
            <span className="data-records">
              Records: {tableData.dataList?.length ?? 0}
            </span>
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            showTotal={(total) => `Total ${total} items`}
            current={currentPage}
            pageSize={pageSize}
            onChange={changePage}
            total={tableData.total}
          />
        </div>
      </div>
    </div>
  );
}
