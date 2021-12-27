// styles
import styles from './Home.module.css';
// components
import TransactionForm from './TransactionForm';
import TransactionsList from './TransactionsList';
// context
import { useAuthContext } from "../../hooks/useAuthContext";
// hooks
import { useCollection } from '../../hooks/useCollection';

export default function Home() {
    const { user } = useAuthContext();
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        // we created 'createdAt' property to that document in useFirestore.js when we addDocument
        // order by 'createdAt' property in: descenting or ascending 
        ["createdAt", "desc"]
    );

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TransactionsList list={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}
