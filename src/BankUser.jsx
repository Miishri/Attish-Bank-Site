import axios from "axios";
import {useState} from "react";


export default function BankUser({bankUser, setCurrentUser}) {
    const { id, firstName, lastName, birthdate, balance, transactionId, creationDate } = bankUser;
    const [deductionAmount, setDeductionAmount] = useState(0);
    const [toUser, setToUser] = useState(0);

    const formatTransactionId = (id) => {
        const idString = String(id);
        return idString.replace(/(.{4})/g, '$1 ').trim();
    };

    let transferConfig = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/bank/transfer?amount=${deductionAmount}&toBankUserId=${toUser}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    const transfer = (e) => {
        e.preventDefault();
        console.log(bankUser)

        if (deductionAmount <= balance) {
            axios.request(transferConfig)
                .then((response) => {
                    location.reload(true);
                    console.log("TRANSFERRED: ", JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div className={"user"}>
            <div className={"user-card"} key={id}>
                <div className={"card-top"}>
                    <img className={"card-logo"} src={"https://i.imgur.com/0rlkdIQ.png"} alt={"card bank logo"}/>
                    <img className={"card-contactless"} src={"https://i.imgur.com/q0mpM4M.png"} alt={"contactless logo"}/>
                </div>
                <img className={"card-chip"} src={"https://i.imgur.com/ftX0O1o.png"} alt="card chip"/>

                <div className={"card-mid"}>
                    <div className={"card-mid-data"}>
                        <h2 className={"card-number"} onClick={() => {
                            navigator.clipboard.writeText(transactionId)
                            alert("Copied Transaction ID")
                        }}>
                            {formatTransactionId(transactionId)}
                        </h2>
                        <div className={"card-mid-data-2"}>
                            <h2 className={"card-name"}>
                                {firstName} {lastName}
                            </h2>
                            <h3>
                                {balance} SEK
                            </h3>
                        </div>
                    </div>
                    <img className={"card-master"} src={"https://i.imgur.com/XbrXMGv.png"} alt="card master"/>
                </div>
            </div>

            <div className={"user-transfer lit-back"}>
                <form className={"user-transfer lit-back"} onSubmit={transfer}>
                    <div className="login-box">
                        <div className="user-box">
                            <h3>Amount</h3>
                            <input type="number" name="deductionAmount" required minLength={1} value={deductionAmount}
                                   onChange={(e) => {
                                       setDeductionAmount(parseInt(e.target.value))
                                       console.log(e.target.value)
                                   }}/>
                        </div>
                        <div className="user-box">
                            <h3>ToUser</h3>
                            <input type="number" name="toUser" required value={toUser}
                                   onChange={(e) => {
                                       setToUser(e.target.value)
                                       console.log(e.target.value)
                                   }}/>
                        </div>
                    </div>
                    <button className="homepage-button" type="submit">Transfer</button>
                </form>
            </div>
        </div>
    )
}