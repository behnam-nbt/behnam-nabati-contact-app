import React, { useState, useEffect } from 'react';

const AddEditContactForm = ({ isOpen, closeModal, saveContact, contactData }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', profession: 'student' });

    useEffect(() => {
        if (contactData) {
            setFormData(contactData);
        } else {
            setFormData({ name: '', email: '', phone: '', profession: '' });
        }
    }, [contactData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveContact(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${contactData ? styles.editModal : ''}`}>
                <button className={styles.closeModal} onClick={closeModal}>×</button>
                <h2>{contactData ? 'Edit Contact' : 'Add New Contact'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="profession"
                        placeholder="Profession"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {contactData ? 'Save Changes' : 'Add Contact'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditContactForm;
