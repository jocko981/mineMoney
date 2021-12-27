import { useState } from 'react';

// styles
import styles from './Login.module.css';

// hooks
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isPending } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            {isPending
                ? <button className="btn" disabled>Pending</button>
                : <button className="btn">Login</button>
            }
            {error && <p>{error}</p>}
        </form>
    )
}
