import { useState, useEffect } from 'react';

// styles
import styles from './Home.module.css';
// hooks
import { useFirestore } from '../../hooks/useFirestore';
// components
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function TransactionsList({ list }) {
    const { deleteDocument, response, isPending } = useFirestore('transactions');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const handleDeleteClick = (id) => {
        setIsOpen(true);
        setSelectedId(id);
    }

    const handleDeleteDocument = () => {
        deleteDocument(selectedId);
        setSelectedId(null);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedId(null);
    }

    useEffect(() => {
        if (response.success) {
            setIsOpen(false);
            setSelectedId(null);
        }
    }, [response.success])

    return (
        <>
            <ul className={styles.transactions}>
                {list.map((item) => (
                    <li key={item.id}>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.amount}>${item.amount}</p>
                        <button onClick={() => handleDeleteClick(item.id)}>x</button>
                    </li>
                ))}
            </ul>

            {isOpen && <ConfirmDeleteModal
                closeModal={closeModal}
                handleDeleteDocument={handleDeleteDocument}
                isPending={isPending}
            />}
        </>
    )
}
