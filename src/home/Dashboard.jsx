import {useEffect, useState} from "react";
import axios from "axios";
import BankUser from "../essentials/BankUser.jsx";
import {useNavigate} from "react-router-dom";
import Search from "../forms/Search.jsx";


export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/bank/data",
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )
            .then(res => {
                setCurrentUser(res.data);
                console.log("DATA FETCHED:", res.data);
            })
            .catch((error) => {
                console.log("USER DATA COULD NOT BE FETCHED")
                console.error(error);
            })
    }, [])

    function deleteAccount() {
        const token = localStorage.getItem('token');
        logoutUser()
        console.log('Token:', token);


        axios.delete("http://localhost:8080/api/bank/delete",
            { headers: {Authorization: `Bearer ${token}`} },
        ).then(response => {
            console.log("DELETED ACCOUNT:", response);
            logoutUser()
        })
            .catch((error) => {
                console.error(error);
            })
    }

    function logoutUser() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className={"dashboard-container"}>
            <div className={"user-access"}>
                <button className={"homepage-button logout"} onClick={() => {
                    logoutUser()
                    console.log("LOGGED OUT");
                    console.log(localStorage.getItem("token"));
                }}>
                    Logout
                </button>
                <button className={"homepage-button delete"} onClick={() => {
                    deleteAccount()
                    console.log("DELETED ACCOUNT");
                }}>Delete
                </button>
            </div>
            <BankUser bankUser={currentUser} setCurrentUser={setCurrentUser}/>
            <Search />
        </div>
    )
}