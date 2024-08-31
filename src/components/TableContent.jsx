import { useState, useEffect } from 'react';
import styles from './MainContent.module.css';
import DeleteAllConfirmationModal from './DeleteAllConfirmationModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ContactForm from './ContactForm';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';

function TableContent({ contacts, setContacts }) {
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [search, setSearch] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
    const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [isAddEditFormOpen, setIsAddEditFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [contactFormData, setContactFormData] = useState({ name: '', email: '', phone: '', profession: 'Student' });
    const [uniqueProfessions, setUniqueProfessions] = useState([]);

    const handleDeleteClick = (contact) => {
        setContactToDelete(contact);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        const updatedContacts = contacts.filter(c => c !== contactToDelete);
        setContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        toast.success(`${contactToDelete.name} has been deleted successfully!`);
        setIsDeleteModalOpen(false);
        setContactToDelete(null);
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setContactToDelete(null);
    };

    const deleteAllContacts = () => {
        setIsDeleteAllModalOpen(true);
    };

    const confirmDeleteAll = () => {
        setContacts([]);
        localStorage.removeItem('contacts');
        toast.success('All contacts have been deleted successfully!');
        setIsDeleteAllModalOpen(false);
    };

    const closeDeleteAllModal = () => {
        setIsDeleteAllModalOpen(false);
    };

    const handleEditContact = (index) => {
        setIsEditing(true);
        setContactFormData(contacts[index]);
        setIsAddEditFormOpen(true);
    };

    const handleAddContact = () => {
        setIsEditing(false);
        setContactFormData({ name: '', email: '', phone: '', profession: 'Student' });
        setIsAddEditFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedContacts = contacts.map(c =>
                c.name === contactFormData.name ? contactFormData : c
            );
            setContacts(updatedContacts);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
            toast.success('Contact updated successfully!');
        } else {
            if (contactFormData.profession.trim() === '') {
                toast.error('Profession cannot be empty.');
                return;
            }
            const updatedContacts = [...contacts, contactFormData];
            setContacts(updatedContacts);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
            toast.success('Contact added successfully!');
        }
        closeAddEditForm();
    };

    const closeAddEditForm = () => {
        setIsAddEditFormOpen(false);
        setContactFormData({ name: '', email: '', phone: '', profession: 'Student' });
    };

    useEffect(() => {
        // Update the list of unique professions
        const professions = Array.from(new Set(contacts.map(contact => contact.profession).filter(p => p)));
        setUniqueProfessions(professions);
    }, [contacts]);

    useEffect(() => {
        if (search) {
            const filtered = contacts.filter(contact =>
                contact.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredContacts(filtered);
            setIsSearchActive(true);
        } else {
            setFilteredContacts(contacts);
            setIsSearchActive(false);
        }
    }, [search, contacts]);

    const handleFilterByProfession = (profession) => {
        if (!isSearchActive) {
            const filtered = contacts.filter(contact => contact.profession === profession);
            setFilteredContacts(filtered);
        }
    };

    const handleResetFilter = () => {
        setFilteredContacts(contacts);
        setSearch('');
        setIsSearchActive(false);
    };

    const toggleSearchInput = () => {
        setIsSearchInputVisible(!isSearchInputVisible);
    };

    return (
        <div className={styles.contactListContainer}>
            {contacts.length > 0 && (
                <>
                    <div className={styles.contactList}>
                        <div className={styles.buttonContainer}>
                            <div>
                                <button className={styles.contactBtn} onClick={handleAddContact}>
                                    Add New Contact
                                </button>
                                <button className={styles.resetBtn} onClick={handleResetFilter}>
                                    Show All Contacts
                                </button>
                                <button className={styles.resetBtn} onClick={deleteAllContacts}>
                                    Delete All Contacts
                                </button>
                            </div>
                            <div style={{ marginLeft: "2rem" }}>
                                {uniqueProfessions.map((profession, index) => (
                                    profession && (
                                        <button
                                            key={index}
                                            className={styles.filteredBtn}
                                            onClick={() => handleFilterByProfession(profession)}
                                            disabled={isSearchActive}
                                            style={{
                                                backgroundColor: isSearchActive ? '#ccc' : '#1a73e8',
                                                cursor: isSearchActive ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {profession}
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                            <h1>Contact List</h1>
                            <div className={styles.searchContainer}>
                                <button onClick={toggleSearchInput} className={styles.searchIconBtn}>
                                    <CiSearch />
                                </button>
                                {isSearchInputVisible && (
                                    <input
                                        type="text"
                                        placeholder="Search By Name"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                )}
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Profession</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.profession || 'N/A'}</td>
                                        <td>
                                            <button
                                                className={styles.editBtn}
                                                onClick={() => handleEditContact(index)}>
                                                Edit
                                            </button>
                                            <button className={styles.deleteBtn} onClick={() => handleDeleteClick(contact)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                closeModal={closeModal}
                confirmDelete={confirmDelete}
                contact={contactToDelete}
            />
            <DeleteAllConfirmationModal
                isOpen={isDeleteAllModalOpen}
                closeModal={closeDeleteAllModal}
                confirmDelete={confirmDeleteAll}
            />
            <ContactForm
                name={contactFormData.name}
                setName={(name) => setContactFormData(prev => ({ ...prev, name }))}
                email={contactFormData.email}
                setEmail={(email) => setContactFormData(prev => ({ ...prev, email }))}
                phone={contactFormData.phone}
                setPhone={(phone) => setContactFormData(prev => ({ ...prev, phone }))}
                profession={contactFormData.profession}
                setProfession={(profession) => setContactFormData(prev => ({ ...prev, profession }))}
                handleSubmit={handleSubmit}
                isModalOpen={isAddEditFormOpen}
                closeModal={closeAddEditForm}
                isEditing={isEditing}
            />
        </div>
    );
}

export default TableContent;
