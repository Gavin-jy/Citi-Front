import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import api from "../../api/api.js";
import util from "../../utils/util.js";
import "./index.css";
import constants from "../../utils/constants.js";

export default function TradeInputs() {
  let selectedMode = useSelector((state) => state.mode.value);

  const [nlpWords, setNlpWords] = useState("");
  const [labels, setLabels] = useState(constants.INPUT_LABELS);
  const [selectState, setSelectState] = useState(false);
  const [dealForm, setDealForm] = useState({
    clientName: "",
    ticker: "",
    ric: "",
    size: "",
    price: "",
    currency: "",
    issuerSector: "",
    salesperson: "",
    type: "",
  });

  // 为所有输入框绑定该事件
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
  }

  function nlpInputHandler(event) {
    setNlpWords(event.currentTarget.value);
  }

  async function buyStockHandler() {
    setLabels(util.updateLabels(labels, dealForm));
    if (dealForm[`type`]) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
    if (util.existEmptyProperty(dealForm)) {
      message.warn("信息不完整");
    } else {
      try {
        const res = await api.buyStock(dealForm);
        if (res.code == 2000) {
          setDealForm({
            clientName: "",
            ticker: "",
            ric: "",
            size: "",
            price: "",
            currency: "",
            issuerSector: "",
            salesperson: "",
            type: "",
          });
          message.success("购买成功");
        } else {
          message.error("购买失败，请重试");
        }
      } catch (error) {
        message.error("购买失败");
        console.log(error);
      }
    }
  }

  async function sellStockHandler() {
    if (dealForm[`type`]) {
      setSelectState(false);
    } else {
      setSelectState(true);
    }
    setLabels(util.updateLabels(labels, dealForm));
    if (util.existEmptyProperty(dealForm)) {
      message.warn("信息不完整");
    } else {
      try {
        const res = await api.sellStock(dealForm);
        if (res.code == 2000) {
          setDealForm({
            clientName: "",
            ticker: "",
            ric: "",
            size: "",
            price: "",
            currency: "",
            issuerSector: "",
            salesperson: "",
            type: "",
          });
          message.success("出售成功");
        } else {
          message.error("出售失败，请重试");
        }
      } catch (error) {
        message.error("出售失败");
        console.log(error);
      }
    }
  }

  async function nlpHandler(event) {
    if (!nlpWords) {
      message.warn("请填写nlp关键字");
    } else {
      try {
        const res = await api.nlp({
          nlpWords: nlpWords,
        });
        if (res.code == 2000) {
          setNlpWords("");
          message.success("nlp操作成功");
        } else {
          message.error("nlp操作失败，请重试");
        }
      } catch (error) {
        message.error("nlp分析失败");
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div className="action-div">
        <div className={selectedMode == 0 ? "action0" : "action0 hidden-class"}>
          <div className="action-wrapper">
            <div className="action-left">
              {labels.map((item, index) => (
                <div key={index} className="action-item">
                  <div className="action-label">{item[0]}</div>
                  <input
                    className="action-input"
                    type="text"
                    value={dealForm[item[1]]}
                    name={item[1]}
                    placeholder="text input"
                    onChange={inputHandler}
                  />
                  <div className={item[2] ? "error-class" : "visible-class"}>
                    请输入信息
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
                  请选择类型
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
                value={nlpWords}
                onChange={nlpInputHandler}
              />
            </div>
            <button className="button-nlp" onClick={nlpHandler}>
              GO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
