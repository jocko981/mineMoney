import { useEffect, useState } from "react";

// hooks
import { useFirestore } from "../../hooks/useFirestore";


export default function TransactionForm({ uid }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { addDocument, response, isPending } = useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({ uid: uid, name, amount });
    }

    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
        }
    }, [response.success])

    return (
        <div>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                {/* we don't need 'htmlFor' inside <label> since we are
                surrounding the input with <label> */}
                <label>
                    <span>Transaction name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Amount($):</span>
                    <input
                        required
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>

                {isPending
                    ? <button disabled>Pending</button>
                    : <button>Add transaction</button>
                }
            </form>
        </div>
    )
}
