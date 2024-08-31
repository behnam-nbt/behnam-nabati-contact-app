import { IoClose } from "react-icons/io5";
import styles from './MainContent.module.css';

function ContactForm({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    profession,
    setProfession,
    handleSubmit,
    isModalOpen,
    closeModal,
    isEditing
}) {
    return (
        <>
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeModal} onClick={closeModal}><IoClose /></button>
                        <div className={styles.inputContainer}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputBox}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter The Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter The Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter The Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Profession</label>
                                    <select
                                        className={styles.jobList}
                                        onChange={(e) => setProfession(e.target.value)}
                                        value={profession}
                                    >
                                        <option>Student</option>
                                        <option>Teacher</option>
                                        <option>Engineer</option>
                                        <option>Doctor</option>
                                    </select>
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    {isEditing ? 'Edit Contact' : 'Add Contact'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContactForm;
