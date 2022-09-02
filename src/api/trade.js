import { get, post } from "./fetch.js";

// trade相关api
const trade = {
  getMatchTicker: (params) => {
    return get({
      url: "/stock/getMatchTicker",
      params: params,
    });
  },

  getMatchRic: (params) => {
    return get({
      url: "/stock/getMatchRic",
      params: params,
    });
  },

  getMatchStock: (params) => {
    return get({
      url: "/stock/getMatchStock",
      params: params,
    });
  },

  getMatchSalesperson: (params) => {
    return get({
      url: "/salesPerson/getMatchSalesperson",
      params: params,
    });
  },
};

export default trade;
