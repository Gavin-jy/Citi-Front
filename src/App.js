import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  return (
    <div>
      {/* 注册路由 */}
      {element}
    </div>
  );
}
