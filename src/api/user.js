import { get, post } from "./fetch.js";

// 用户相关api
const user = {
  login: (params) => {
    return post({
      url: "/client/login",
      params: params,
    });
  },

  register: (params) => {
    return post({
      url: "/client/register",
      params: params,
    });
  },

  changePassword: (params) => {
    return post({
      url: "/client/changePassword",
      params: params,
    });
  },

  getMyStockData: (params) => {
    return get({
      url: "/getStockHold",
      params: params
    })
  }
};

export default user;
