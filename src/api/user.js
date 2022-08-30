import { get, post } from "./fetch.js";

const user = {
  login: (params) => {
    return post({
      url: "/login",
      params: params,
    });
  },

  register: (params) => {
    return post({
      url: "/register",
      params: params,
    });
  },

  getMyStockData:(params)=>{
    return get({
      url: "/getMyStockData",
      params: params,
    });
  },
};

export default user;
