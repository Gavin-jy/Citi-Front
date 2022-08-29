import { get, post } from "./fetch.js";

const api = {
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

  nlp: (params) => {
    return post({
      url: "/nlp",
      params: params,
    });
  },

  getChartData: () => {
    return get({
      url: "/getChartData",
      params: {},
    });
  },
};

export default api;
