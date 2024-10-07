import BankLogo from "../essentials/BankLogo.jsx";
import {useNavigate} from "react-router-dom";


export default function Homepage() {
    const navigate = useNavigate();

    return (
        <div className={"container"}>
            <BankLogo />
            <div className={"button-container lit-back"}>
                <div className="homepage-button" onClick={() => navigate("/login")} >Login</div>
                <div className="homepage-button" onClick={() => navigate("/register")} >Register</div>
            </div>
        </div>
    )
}