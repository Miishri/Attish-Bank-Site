import {useEffect, useState} from "react";
import BankLogo from "./BankLogo.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [bankUser, setBankUser] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        balance: 0,
        username: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankUser({
            ...bankUser,
            [name]: value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        console.log(bankUser)

        axios
            .post("http://localhost:8080/register", bankUser)
            .then((r) => {
                alert("ACCOUNT REGISTERED")
            })
            .catch((error) => {
                console.error(error);
            });

    }
    return (
        <div className={"container"}>
            <a className="homepage" onClick={() => {
                navigate("/")
            }}><BankLogo/></a>

            <div className="login-container lit-back">
                <form className="login-box" onSubmit={register}>
                    <div className="user-box">
                        <input
                            type="text"
                            name="username"
                            required
                            minLength={6}
                            value={bankUser.username}
                            placeholder={"username"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="user-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            minLength={1}
                            value={bankUser.password}
                            placeholder={"password"}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={bankUser.firstName}
                            placeholder={"first name"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="user-box">
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={bankUser.lastName}
                            placeholder={"lastname"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="user-box">
                        <input
                            type="date"
                            name="birthdate"
                            required
                            value={bankUser.birthdate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="user-box">
                        <input
                            type={"number"}
                            name="balance"
                            required
                            value={bankUser.balance}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="homepage-button" type="submit" style={{alignSelf: "center"}}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}