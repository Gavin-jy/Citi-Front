/**
 * 判断对象中是否存在空属性
 */
const existEmptyProperty = (form) => {
  for (let key of Object.keys(form)) {
    if (!form[key]) {
      return true;
    }
  }
  return false;
};

/**
 * 更新labels,提示用户输入
 */
const updateLabels = (labels, form) => {
  let newLabels = labels.map((item) => {
    if (!form[item[1]]) {
      item[2] = true;
    } else {
      item[2] = false;
    }
    return item;
  });
  return newLabels;
};

/**
 * 格式化时间
 */
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
  return `${[day, month, year].map(formatNumber).join("/")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 重新排列数据 1升序，2降序
 */
// 这里如果传递的是数组的话，不能直接对函数参数数组排序，会报错
const sortTableData = (originTableData, field, mode) => {
  let newTableData = JSON.parse(JSON.stringify(originTableData));
  if (mode == 1) {
    newTableData.dataList.sort(function (item1, item2) {
      return item1[field] < item2[field] ? -1 : 1;
    });
  } else {
    newTableData.dataList.sort(function (item1, item2) {
      return item1[field] < item2[field] ? 1 : -1;
    });
  }
  return newTableData;
};

/**
 * 过滤tableData
 * @param {String} field 过滤的字段名
 * @param {String} mode 过滤值
 */
const filterTableData = (originTableData, field, mode) => {
  // 过滤数据
  let newTableData = JSON.parse(JSON.stringify(originTableData));
  newTableData.dataList = newTableData.dataList.filter(
    (item) => item[field] == mode
  );
  // 重新计算
  newTableData["total"] = newTableData.dataList.length;
  newTableData["totalBuy"] = 0;
  newTableData["totalSell"] = 0;
  newTableData["totalBuyNational"] = 0;
  newTableData["totalSellNational"] = 0;
  newTableData.dataList.forEach((item) => {
    if (item.clientSide == "Buy") {
      newTableData["totalBuy"] += item.prize;
      newTableData["totalBuyNational"] += item.nationalUsd;
    } else if (item.clientSide == "Sell") {
      newTableData["totalSell"] += item.prize;
      newTableData["totalBuyNational"] += item.nationalUsd;
    }
  });
  newTableData["netQuantity"] =
    newTableData["totalBuy"] - newTableData["totalSell"];
  newTableData["netNational"] =
    newTableData["totalBuyNational"] - newTableData["totalSellNational"];
  return newTableData;
};

export default {
  formatTime,
  updateLabels,
  existEmptyProperty,
  sortTableData,
  filterTableData,
};
