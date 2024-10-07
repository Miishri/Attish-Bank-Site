
export default function CompactBankUser({user}) {

    return (
        <>
            <tr className={"compact-user"}>
                <td className="compact-user-name">{user.firstName} {user.lastName}</td>
                <td className="compact-user-birthdate">{user.birthDate}</td>
                <td className="compact-user-transaction">
                    <button className="homepage-button" onClick={() => {
                        navigator.clipboard.writeText(user.transactionId)
                    }}>
                        Transfer
                    </button>
                </td>
                <td className="compact-user-creationdate">{user.creationDate}</td>
            </tr>

        </>
    )
}