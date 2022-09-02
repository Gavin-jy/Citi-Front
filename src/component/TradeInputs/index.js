import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message, Dropdown, Menu, Empty, Spin } from "antd";
import NlpResult from "../NlpResult";
import api from "../../api/api.js";
import util from "../../utils/util.js";
import "./index.css";
import constants from "../../utils/constants.js";

export default function TradeInputs() {
  let selectedMode = useSelector((state) => state.mode.value);
  const clientInfo = JSON.parse(sessionStorage.getItem("clientInfo") || "{}");

  const [nlpWords, setNlpWords] = useState("");
  const [labels, setLabels] = useState(constants.INPUT_LABELS);
  const [selectState, setSelectState] = useState(false);
  const [dealForm, setDealForm] = useState({
    clientName: clientInfo.clientName,
    ticker: "",
    ric: "",
    size: "",
    price: "",
    currency: "",
    issuerSector: "",
    salesperson: "",
    type: "",
  });
  const [items, setItems] = useState(constants.AUTOCOMPLETE_INIT_ITEMS);
  const [timer, setTimer] = useState(0);
  const [salespersonList, setSalespersonList] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);
  const [nlpResult, setNlpResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // 为所有输入框绑定该事件
  // 输入的时候，需要向后端请求数据，匹配提示输入
  function inputHandler(event) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let newDealForm = JSON.parse(JSON.stringify(dealForm));
    if (name == "type" && value == "select") {
      newDealForm[name] = "";
    } else {
      newDealForm[name] = value;
    }
    setDealForm(newDealForm);

    clearTimeout(timer);
    if (value !== "") {
      let newTimer = setTimeout(async () => {
        // 根据name和value向后端发请求匹配数据
        try {
          if (name === "ticker") {
            let reqData = {
              ticker: value,
            };
            const res = await api.trade.getMatchTicker(reqData);
            if (res.code === 2000) {
              let newItems = [];
              res.data.tickerList.forEach((item, index) => {
                newItems.push({
                  key: "ticker," + item + "," + index,
                  label: item,
                });
              });
              if (newItems.length > 0) {
                // 更新视图
                setItems(newItems);
              }
            } else {
              throw new Error("request error");
            }
          } else if (name === "ric") {
            let reqData = {
              ticker: dealForm.ticker,
              ric: value,
            };
            const res = await api.trade.getMatchRic(reqData);
            if (res.code === 2000) {
              let newItems = [];
              res.data.ricList.forEach((item, index) => {
                newItems.push({
                  key: "ric," + item + "," + index,
                  label: item,
                });
              });
              if (newItems.length > 0) {
                // 更新视图
                setItems(newItems);
              }
            } else {
              throw new Error("request error");
            }
          } else if (name === "salesperson") {
            let reqData = {
              key: value,
            };
            const res = await api.trade.getMatchSalesperson(reqData);
            if (res.code === 2000) {
              let newItems = [];
              setSalespersonList(res.data.salespersonList);
              res.data.salespersonList.forEach((item, index) => {
                newItems.push({
                  key: "salesperson," + item.salespersonName + "," + index,
                  label: item.salespersonName,
                });
              });
              if (newItems.length > 0) {
                // 更新视图
                setItems(newItems);
              }
            } else {
              throw new Error("request error");
            }
          }
        } catch (error) {
          message.error("match error !");
          console.log(error);
        }
      }, 500);
      setTimer(newTimer);
    }
  }

  // 输入框得到焦点
  const focusHander = () => {
    setItems(constants.AUTOCOMPLETE_INIT_ITEMS);
  };

  function nlpInputHandler(event) {
    setNlpWords(event.currentTarget.value);
  }

  /**
   * 计算买卖股票的请求体
   */
  const getReqData = () => {
    const index = salespersonList.findIndex((item) => {
      return item.salespersonName === dealForm.salesperson;
    });
    return {
      clientId: clientInfo.clientId,
      stockId: selectedStock.stock_id,
      size: dealForm.size * 1,
      type: dealForm.type,
      salespersonId: salespersonList[index].salespersonId,
    };
  };

  async function buyStockHandler() {
    if (!util.isLogin()) {
      message.warn("please login fisrtly !");
      return;
    }
    setLabels(util.updateLabels(labels, dealForm));
    if (dealForm[`type`]) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
    if (util.existEmptyProperty(dealForm)) {
      message.warn("Incomplete information");
    } else {
      try {
        const res = await api.stock.buyStock(getReqData());
        if (res.code === 2000) {
          setDealForm({
            clientName: clientInfo.clientName,
            ticker: "",
            ric: "",
            size: "",
            price: "",
            currency: "",
            issuerSector: "",
            salesperson: "",
            type: "",
          });
          message.success("buy successfully");
        } else {
          message.error(res.msg);
        }
      } catch (error) {
        message.error("buy error, please retry !");
        console.log(error);
      }
    }
  }

  async function sellStockHandler() {
    if (!util.isLogin()) {
      message.warn("please login fisrtly !");
      return;
    }
    if (dealForm[`type`]) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
    setLabels(util.updateLabels(labels, dealForm));
    if (util.existEmptyProperty(dealForm)) {
      message.warn("Incomplete information");
    } else {
      try {
        const res = await api.stock.sellStock(getReqData());
        if (res.code === 2000) {
          setDealForm({
            clientName: clientInfo.clientName,
            ticker: "",
            ric: "",
            size: "",
            price: "",
            currency: "",
            issuerSector: "",
            salesperson: "",
            type: "",
          });
          message.success("sell successfully");
        } else if (res.msg === "股票库存不足") {
          message.error("stock hold unenough !");
        } else {
          message.error("sell error, please retry !");
        }
      } catch (error) {
        message.error("sell error, please retry !");
        console.log(error);
      }
    }
  }

  async function nlpHandler(event) {
    if (!nlpWords) {
      message.warn("please input nlp key words");
    } else {
      try {
        setLoading(true);
        const res = await api.stock.nlp(nlpWords);
        setTimeout(() => {
          setLoading(false);
          if (res.length !== 0) {
            setNlpResult(res);
            message.success("nlp success");
          } else {
            message.warning("nlp compute failed !");
          }
        }, 1000);
      } catch (error) {
        message.error("nlp error !");
        console.log(error);
      }
    }
  }

  const refreshHandler = () => {
    setNlpWords("");
    setLoading(false);
    setNlpResult([]);
  };

  // 下拉提示框选中之后
  const selectMenu = async (item) => {
    let newDealForm = JSON.parse(JSON.stringify(dealForm));
    const strs = item.key.split(",");
    newDealForm[strs[0]] = strs[1];
    if (strs[0] === "ric") {
      try {
        let reqData = {
          ticker: newDealForm.ticker,
          ric: newDealForm.ric,
        };
        const res = await api.trade.getMatchStock(reqData);
        if (res.code === 2000) {
          setSelectedStock(res.data.stock);
          let stock = res.data.stock;
          newDealForm["price"] = stock.price;
          newDealForm["currency"] = stock.currency;
          newDealForm["issuerSector"] = stock.issuer_sector_name;
        } else {
          throw new Error("request error");
        }
      } catch (error) {
        message.error("autocomplete error !");
        console.log(error);
      }
    }
    setDealForm(newDealForm);
  };

  return (
    <div>
      <div className="action-div">
        <div className={selectedMode == 0 ? "action0" : "action0 hidden-class"}>
          <div className="action-wrapper">
            <div className="action-left">
              {labels.map((item, index) => (
                <div key={index} className="action-item">
                  <div className="action-label">{item[0]}</div>
                  {[
                    "clientName",
                    "size",
                    "price",
                    "currency",
                    "issuerSector",
                  ].includes(item[1]) ? (
                    <input
                      className="action-input"
                      type="text"
                      value={dealForm[item[1]]}
                      disabled={item[1] !== "size"}
                      name={item[1]}
                      autoComplete="off"
                      placeholder="text input"
                      onChange={inputHandler}
                    />
                  ) : (
                    <Dropdown
                      // 所有输入框共用一个提示menu，根据items里面的key进行区分
                      overlay={
                        <Menu selectable onClick={selectMenu} items={items} />
                      }
                      placement="bottom"
                      trigger={["click"]}
                      disabled={["clientName", "size"].includes(item[1])}
                    >
                      <input
                        className="action-input"
                        type="text"
                        value={dealForm[item[1]]}
                        disabled={item[1] === "clientName"}
                        name={item[1]}
                        autoComplete="off"
                        placeholder="text input"
                        onChange={inputHandler}
                        onFocus={focusHander}
                      />
                    </Dropdown>
                  )}
                  <div className={item[2] ? "error-class" : "visible-class"}>
                    {item[3]}
                  </div>
                </div>
              ))}
              <div className="action-item">
                <div className="action-label">HT/PT</div>
                <select
                  name="type"
                  className="action-input"
                  value={dealForm.type}
                  onChange={inputHandler}
                >
                  <option value="select">select type</option>
                  <option value="HT">HT</option>
                  <option value="PT">PT</option>
                </select>
                <div className={selectState ? "error-class" : "visible-class"}>
                  please choose type
                </div>
              </div>
            </div>
            <div className="action-right">
              <button
                className="action-button button-buy"
                onClick={buyStockHandler}
              >
                buy
              </button>
              <button
                className="action-button button-sell"
                onClick={sellStockHandler}
              >
                sell
              </button>
            </div>
          </div>
          <div className="trade-input-tip">
            tips: input ticker and ric, then other will be autocomplete !
          </div>
        </div>
        <div className={selectedMode == 1 ? "action1" : "action1 hidden-class"}>
          <div className="action-wrapper">
            <div className="action-item">
              <div className="action-label">NLP Trade</div>
              <input
                className="action-input-nlp"
                type="text"
                name="nlpWords"
                placeholder="text input"
                autoComplete="off"
                value={nlpWords}
                onChange={nlpInputHandler}
              />
            </div>
            <button className="button-nlp" onClick={nlpHandler}>
              GO
            </button>
            <button className="button-nlp" onClick={refreshHandler}>
              REFRESH
            </button>
          </div>
          <div className="nlp-tips">tips: Use space to separate keywords</div>
          {nlpResult.length === 0 ? (
            <div className="spin-nlp">
              <Spin size="large" spinning={loading} tip="loading...">
                <Empty
                  className="empty-nlp"
                  description="input nlpwords and have a try"
                />
              </Spin>
            </div>
          ) : (
            <NlpResult nlpWords={nlpWords} nlpResult={nlpResult}></NlpResult>
          )}
        </div>
      </div>
    </div>
  );
}
