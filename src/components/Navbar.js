import { Link } from "react-router-dom";

// styles
import styles from './Navbar.module.css';

// hooks
import { useLogout } from "../hooks/useLogout";

// context
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>mineMoney</li>

                {!user && <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>
                }
                {user && <>
                    <li>Hello, {user.displayName}</li>
                    <li>
                        <button className="btn" onClick={logout}>Logout</button>
                    </li>
                </>
                }


            </ul>
        </nav>
    )
}
