import {useEffect, useState} from "react";
import axios from "axios";
import CompactBankUser from "../essentials/CompactBankUser.jsx";


export default function Search() {
    const [search, setSearch] = useState('');
    const [bankUsers, setBankUsers] = useState([])

    const token = localStorage.getItem('token');

    function fetchUsers() {
        axios.get("http://localhost:8080/api/bank/users",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                setBankUsers(response.data);
                console.log("BANK USERS FETCHED:", response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchUsers();
        console.log(bankUsers)
    }, []);


    const filteredUsers = bankUsers.filter((bankUser) =>
        bankUser.transactionId && bankUser.transactionId.toString().includes(search)
    );


    return(
        <>
            <div className={"login-box"}>
                <div className="user-box">
                    <input
                        type="number"
                        name="search"
                        required
                        value={search}
                        placeholder={"Search with Transaction ID"}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                    />
                </div>
            </div>
            <table className="compact-user-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthdate</th>
                    <th>Transaction ID</th>
                    <th>Creation Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((bankUser) => (
                        <CompactBankUser key={bankUser.id} user={bankUser}/>
                    ))
                ) : (
                    <></>
                )}
                </tbody>
            </table>
        </>
    )
}