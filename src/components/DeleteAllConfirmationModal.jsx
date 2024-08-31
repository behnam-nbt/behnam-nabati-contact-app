import React from 'react';
import styles from './DeleteAllConfirmationModal.module.css'; // Create this CSS module if needed

const DeleteAllConfirmationModal = ({ isOpen, closeModal, confirmDelete }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeModal} onClick={closeModal}>×</button>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete all contacts? This action cannot be undone.</p>
                <div className={styles.modalActions}>
                    <button className={styles.confirmBtn} onClick={confirmDelete}>Confirm</button>
                    <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAllConfirmationModal;
