import {useState} from "react";
import BankLogo from "../essentials/BankLogo.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();


    const [bankUser, setBankUser] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankUser({
            ...bankUser,
            [name]: value,
        });
    };

    const login = (e) => {
        e.preventDefault();
        console.log(bankUser)

        axios.post("http://localhost:8080/login", bankUser)
            .then(response => {
                localStorage.setItem("token", response.data);
                navigate("/dashboard")
                console.log(localStorage.getItem("token"));
            })
            .catch((error) => {
            console.error(error);
        });

    }

    return (
        <div className="container">
            <a className="homepage" onClick={() => {
                navigate("/")
            }}><BankLogo/></a>

            <form className={"login-container lit-back"} onSubmit={login}>
                <div className="login-box">
                    <div className="user-box">
                        <input type="text" name="username" required minLength={1} value={bankUser.username}
                               placeholder={"username"}
                               onChange={handleChange}/>
                    </div>

                    <div className="user-box">
                        <input type={showPassword ? "text" : "password"} name="password" required minLength={1}
                               value={bankUser.password}
                               placeholder={"password"}
                               onChange={handleChange}/>
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button className="homepage-button" type="submit" >Login</button>
            </form>
        </div>
    )
}