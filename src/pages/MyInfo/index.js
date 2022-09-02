import React from "react";
import { PageHeader, Divider, Button, Form, Input, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Header from "../../container/Header";
import api from "../../api/api";

export default function MyInfo() {
  const navigate = useNavigate();
  const clientInfo = JSON.parse(sessionStorage.getItem("clientInfo"));
  let newPassword = "";

  const backToHome = () => {
    navigate("/home", { replace: true });
  };

  const doChangePassword =  async () => {
    try {
      let reqData = {
        clientId: clientInfo.clientId,
        newPassword: newPassword,
      };
      const res = await api.user.changePassword(reqData);
      if (res.code === 2000) {
        sessionStorage.removeItem("clientInfo");
        message.success("change successfully, please login again !");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      }
    } catch (error) {
      message.error("error exist");
      console.log(error);
    }
  };
  
  const changePassword = (values) => {
    newPassword = values.newPassword;
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to change your password ?",
      okText: "confirm",
      cancelText: "cancel",
      onOk: doChangePassword,
    });
  };


  return (
    <div>
      <Header></Header>
      <PageHeader
        className="site-page-header"
        onBack={backToHome}
        title="Back"
        subTitle="go back to home page"
      />
      <div className="info-main">
        <Divider
          style={{ borderColor: "#80aff8" }}
          orientation="left"
          orientationMargin="0"
        >
          Personal information
        </Divider>
        <div className="info-wrap">
          <div className="info-tip">
            Client Name:<span className="info-text">{clientInfo.clientName}</span>
          </div>
          <div className="info-tip">
            Register-Time:<span className="info-text">{clientInfo.registerTime}</span>
          </div>
        </div>
        <Divider
          style={{ borderColor: "#80aff8" }}
          orientation="left"
          orientationMargin="0"
        >
          Change Password
        </Divider>
        <Form
          name="changePassword"
          className="changeForm"
          onFinish={changePassword}
          autoComplete="off"
        >
          <Form.Item
            name="newPassword"
            label="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="confirm newPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
