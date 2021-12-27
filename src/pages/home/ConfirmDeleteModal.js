// styles
import styles from './Home.module.css';

export default function ConfirmDeleteModal({ closeModal, handleDeleteDocument, isPending }) {

    return (
        <>
            <div className={styles.darkBG} onClick={closeModal} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Dialog</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={closeModal}>
                        x
                    </button>
                    <div className={styles.modalContent}>
                        Are you sure you want to delete the item?
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            {!isPending
                                ? <button className={styles.deleteBtn} onClick={handleDeleteDocument}>
                                    Delete
                                </button>
                                : <button disabled className={styles.deleteBtn}>
                                    Deleting...
                                </button>}
                            <button
                                className={styles.cancelBtn}
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
