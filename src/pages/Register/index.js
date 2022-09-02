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
      let reqData = {
        clientName: values.clientName,
        password: values.password,
      };
      const res = await api.user.register(reqData);
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
          name="clientName"
          label="clientName"
          rules={[
            {
              required: true,
              message: "Please input your clientName!",
            },
          ]}
        >
          <Input placeholder="clientName you want" />
        </Form.Item>

        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
              message: "The password format is abnormal",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="password you want" />
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
          <Input.Password placeholder="passwrod again" />
        </Form.Item>

        <div className="password-tips">
          tips: The password must be at least eight characters, consisting of at
          least three types of digits, uppercase and lowercase letters, and
          special characters
        </div>

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
