import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./index.css";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();

  const doLogin = async (values) => {
    try {
      const res = await api.user.login(values);
      if (res.code === 2000) {
        message.success("login successfully");
        const { clientInfo } = res.data;
        sessionStorage.setItem("clientInfo", JSON.stringify(clientInfo));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        message.error(res.msg);
        console.log(res.msg);
      }
    } catch (error) {
      message.error("login error, please retry");
      console.log(error);
    }
  };

  const toRegister = () => {
    navigate("/register");
  };

  return (
    <div className="form-div">
      <div className="title-tip">Citi Stock System Login</div>
      <Form
        name="login"
        onFinish={doLogin}
        autoComplete="off"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Form.Item
          label="clientName"
          name="clientName"
          rules={[
            {
              required: true,
              message: "Please input your clientName!",
            },
          ]}
        >
          <Input placeholder="your clientName" />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="your password" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="reg-tip" onClick={toRegister}>
        还没有账号？点击注册
      </div>
    </div>
  );
}
