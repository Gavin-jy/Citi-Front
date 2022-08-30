const TAB_ITEMS = [
  {
    label: "1D",
    value: "1D",
    active: false,
  },
  {
    label: "1W",
    value: "1W",
    active: false,
  },
  {
    label: "2W",
    value: "2W",
    active: false,
  },
  {
    label: "1M",
    value: "1M",
    active: false,
  },
  {
    label: "3M",
    value: "3M",
    active: false,
  },
  {
    label: "6M",
    value: "6M",
    active: false,
  },
  {
    label: "1Y",
    value: "1Y",
    active: false,
  },
  {
    label: "YTD",
    value: "YTD",
    active: false,
  },
];

// 第三个属性表示是否出现未填就提交的情况
const INPUT_LABELS = [
  ["Client name", "clientName", false],
  ["Ticker", "ticker", false],
  ["RIC", "ric", false],
  ["Size", "size", false],
  ["Price", "price", false],
  ["Currency", "currency", false],
  ["Issuer Sector", "issuerSector", false],
  ["Salesperson", "salesperson", false],
];

const SORT_MENU_ITEMS = [
  {
    key: 1,
    label: "重置",
  },
  {
    key: 2,
    label: "升序",
  },
  {
    key: 3,
    label: "降序",
  },
];

const CLIENT_SIDE_MENU_ITEMS = [
  {
    key: "RESET",
    label: "重置",
  },
  {
    key: "Buy",
    label: "Buy",
  },
  {
    key: "Sell",
    label: "Sell",
  },
];

const HT_PT_MENU_ITEMS = [
  {
    key: "RESET",
    label: "重置",
  },
  {
    key: "HT",
    label: "HT",
  },
  {
    key: "PT",
    label: "PT",
  },
];

const SYSTEM_ITEMS = [
  {
    key: "info",
    label: "个人信息",
  },
  {
    key: "stock",
    label: "我的股票",
  },
  {
    key: "logout",
    label: "退出系统",
  },
];

const LOGIN_ITEMS = [
  {
    key: "login",
    label: "登陆系统",
  },
];

const constants = {
  INPUT_LABELS,
  TAB_ITEMS,
  SORT_MENU_ITEMS,
  CLIENT_SIDE_MENU_ITEMS,
  HT_PT_MENU_ITEMS,
  SYSTEM_ITEMS,
  LOGIN_ITEMS,
};

export default constants;
