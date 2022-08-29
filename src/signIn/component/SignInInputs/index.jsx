
export default function SignInInputs(){
    const SIGNIN_LABELS = [
        ["Tel","tel",false]
        ["Password", "password",false],
    ]
    const [labels, setLabels] = useState(SIGNIN_LABELS)
    const [signInForm, setSignInForm] = useState({
        tel: "",
        password: "",
    });

    function signInInputHandler(event) {
        const name = event.currentTarget.name
        const value = event.currentTarget.value;
        let newSignInForm = JSON.parse(JSON.stringify(signInForm));
        newSignInForm[name] = value;
        setSignInForm(newSignInForm);
    }

    async function signInHandler() {
        setLabels(util.updateLabels(labels, signInForm));
        if (util.existEmptyProperty(signInForm)) {
            message.warn("登录信息不完整");
        }else {
            try {
                const res = await api.signIn(signInForm);
                if (res.code == 2000) {
                    setSignInForm({
                        tel: "",
                        password: "",
                    });
                    message.success("登录成功");
                } else {
                    message.error("登录失败，请重试");
                }
            } catch (error) {
                message.error("登录失败");
                console.log(error);
            }
        }
    }

    return (
        <div className="signInContainer">
            <div className="signInForm">
                {labels.map((item, index) => (
                    <div key={index} className="action-item">
                        <div className="action-label">{item[0]}</div>
                        <input
                            className="action-input"
                            type="text"
                            value={signInForm[item[1]]}
                            name={item[1]}
                            placeholder="text input"
                            onChange={signInInputHandler}
                        />
                        <div className={item[2] ? "error-class" : "visible-class"}>
                            请填写手机号和密码信息
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button
                    className="action-button button-signInSubmit"
                    onClick={signInHandler}    
                >
                    SIGN IN 
                </button>
            </div>
        </div>
    )
}