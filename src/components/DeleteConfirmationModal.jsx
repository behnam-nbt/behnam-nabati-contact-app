import styles from './DeleteConfirmationModal.module.css';

function DeleteConfirmationModal({ isOpen, closeModal, confirmDelete, contact }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <p>Are you sure you want to delete {contact.name}?</p>
                <div className={styles.buttonContainer}>
                    <button onClick={confirmDelete} className={styles.confirmBtn}>Yes, Delete</button>
                    <button onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
