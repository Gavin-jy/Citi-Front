import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import api from "../../api/api";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register() {
  const navigate = useNavigate();

  const doRegister = async (values) => {
    try {
      const res = await api.user.register(values);
      if (res.code === 2000) {
        message.success("register successfully, login next");
        setTimeout(() => {
          backToLogin();
        }, 1000);
      } else {
        message.error(res.msg);
        console.log(res.msg);
      }
    } catch (error) {
      message.error("register error, please retry");
      console.log(error);
    }
  };

  const backToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="form-div">
      <div className="title-tip">Citi Stock System Register</div>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={doRegister}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          label="username"
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
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="confirm password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      <div className="reg-tip" onClick={backToLogin}>
        返回登录
      </div>
    </div>
  );
}
