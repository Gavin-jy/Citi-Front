import React, { useState } from "react";
import api from "../../../api/api.js";
import util from "../../utils/util.js";
import "./index.css";
import constants from "../../utils/constants.js";


export default function SignUpInputs() {
    const [labels, setLabels] = useState(constants.SIGNUP_LABELS)
    const [signUpForm, setSignUpForm] = useState({
        clientName: "",
        tel: "",
        password: "",
        confirmPassword: "",
        nationality: ""
    });

    function signUpInputHandler(event) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value;
        let newSignUpForm = JSON.parse(JSON.stringify(signUpForm));
        newSignUpForm[name] = value;
        setSignUpForm(newSignUpForm);
    }

    async function signUpHandler() {
        setLabels(util.updateLabels(labels, signUpForm));
        if (util.existEmptyProperty(signUpForm)) {
            message.warn("注册信息不完整");
        }
        if(signUpForm.password!==setSignUpForm.confirmPassword){
            message.warn("两次输入的密码不相等，请重新输入");

        } else {
            try {
                const res = await api.signUp(signUpForm);
                if (res.code == 2000) {
                    setSignUpForm({
                        clientName: "",
                        tel: "",
                        password: "",
                        confirmPassword: "",
                        nationality: ""
                    });
                    message.success("注册成功");
                } else {
                    message.error("注册失败，请重试");
                }
            } catch (error) {
                message.error("注册失败");
                console.log(error);
            }
        }
    }

    return (
        <div className="signUpContainer">
            <div className="signUpForm">
                {labels.map((item, index) => (
                    <div key={index} className="action-item">
                        <div className="action-label">{item[0]}</div>
                        <input
                            className="action-input"
                            type="text"
                            value={signUpForm[item[1]]}
                            name={item[1]}
                            placeholder="text input"
                            onChange={signUpInputHandler}
                        />
                        <div className={item[2] ? "error-class" : "visible-class"}>
                            请填写注册信息
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button
                    className="action-button button-signUpSubmit"
                    onClick={signUpHandler}    
                >
                    SIGN UP 
                </button>
            </div>
        </div>
    )

}