import { get, post } from "./fetch.js";

// 主页表格和图例api
const stock = {
  getTableData: (params) => {
    return get({
      url: "/getTableData",
      params: params,
    });
  },

  buyStock: (params) => {
    return post({
      url: "/buyStock",
      params: params,
    });
  },

  sellStock: (params) => {
    return post({
      url: "/sellStock",
      params: params,
    });
  },

  nlp: async (params) => {
    try {
      const res = await fetch(`http://192.168.229.150:5000/nlp/${params}`);
      return await res.json();
    } catch (err) {
      return await Promise.reject(err);
    }
  },

  getChartData: (params) => {
    return get({
      url: "/tradeStatistc/search",
      params: params,
    });
  },
};

export default stock;
