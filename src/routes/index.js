//路由表配置：src/routes/index.js
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MyInfo from "../pages/MyInfo";
import MyStock from "../pages/MyStock";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/register",
    element: <Register />,
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
    path: "/myInfo",
    element: <MyInfo />,
  },
  {
    path: "/myStock",
    element: <MyStock />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
