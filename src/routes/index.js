//路由表配置：src/routes/index.js
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import _404 from "../pages/404";
import Home from "../pages/Home";

export default [
  {
    path: "/",
    element: <Navigate to="/home"/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <_404 />
  }
];
