import { useState } from 'react';

// hooks
import { useSignup } from '../../hooks/useSignup';

// styles
import styles from './Signup.module.css';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
    }

    return (
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Sign-up</h2>
            <label>
                <span>email:</span>
                <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    required
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <label>
                <span>display name:</span>
                <input
                    required
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                />
            </label>

            {isPending
                ? <button className="btn" disabled>Loading</button>
                : <button className="btn">Signup</button>
            }
            {error && <p>{error}</p>}
        </form>
    )
}
