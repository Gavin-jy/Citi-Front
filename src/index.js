import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import createStore from "./redux/store/createStore";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);

//这段代码用于标志哪个模块接收热加载，如果是代码入口模块的话，就是入口模块接收
/*
由于Webpack的热加载会重新执行模块，如果是使用React，并且模块热加载写在入口模块里，
那么代码调整后就会重新执行render。但由于组件模块重新执行返回了新的组件，
这时前面挂在的组件状态就不能保留了，效果就等于刷新页面。
*/
if (module.hot) {
  module.hot.accept();
}
