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
        const userInfo = res.data;
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/home");
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
      <Form name="login" onFinish={doLogin} autoComplete="off">
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
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
          <Input.Password />
        </Form.Item>
        <Form.Item>
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
