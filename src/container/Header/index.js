import React, { useState } from "react";
import { Dropdown, Menu, Space, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { SettingFilled } from "@ant-design/icons";
import "./index.css";
import constants from "../../utils/constants";

export default function Header() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || {});

  const handleSystemClick = (item) => {
    const key = item.key;
    if (key === "login") {
      navigate("/login", { replace: true });
    } else if (key === "logout") {
      showModal();
    } else if (key === "info") {
      navigate("/MyInfo");
    } else if (key === "stock") {
      navigate("/MyStock");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const logout = () => {
    setIsModalVisible(false);
    localStorage.removeItem("userInfo");
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu
      selectable
      onClick={handleSystemClick}
      items={userInfo ? constants.SYSTEM_ITEMS : constants.LOGIN_ITEMS}
    />
  );

  return (
    <div className="header">
      <div className="title">Welcome To Citi Stock System</div>

      <Dropdown overlay={menu} arrow>
        <Space>
          {userInfo.username ? userInfo.username : "未登录"}
          <SettingFilled />
        </Space>
      </Dropdown>

      <Modal
        title="Tips for exiting"
        visible={isModalVisible}
        onOk={logout}
        onCancel={cancelLogout}
      >
        <p>Are you sure you want to exit the system ?</p>
      </Modal>
    </div>
  );
}
