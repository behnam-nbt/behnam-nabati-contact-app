import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MainContent.module.css';
import { CiCirclePlus } from "react-icons/ci";
import TableContent from './TableContent';
import ContactForm from './ContactForm';
import { ContactContext } from '../context/contactContext';

function MainContent() {
  const { contacts, setContacts, isModalOpen, setIsModalOpen, isEditing, setIsEditing, currentEditIndex, setCurrentEditIndex } = useContext(ContactContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('student');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, [setContacts]);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !profession) {
      toast.error('Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const contact = { name, email, phone, profession };

    if (isEditing) {
      const updatedContacts = contacts.map((c, index) =>
        index === currentEditIndex ? contact : c
      );
      setContacts(updatedContacts);
      toast.success('Contact updated successfully');
    } else {
      setContacts([...contacts, contact]);
      toast.success('Contact added successfully');
    }

    resetForm();
  };

  const handleEditContact = (index) => {
    const contactToEdit = contacts[index];
    setName(contactToEdit.name);
    setEmail(contactToEdit.email);
    setPhone(contactToEdit.phone);
    setProfession(contactToEdit.profession);
    setIsEditing(true);
    setCurrentEditIndex(index);
    setIsModalOpen(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setProfession('student');
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.title}>
          <h1>Contact App</h1>
          <p>BOTOSTART | Contact App Task</p>
        </div>
        {contacts.length === 0 && (
          <div className={styles.startTask}>
            <h1>Welcome To My Contact App</h1>
            <p>Add Your First Contact</p>
            <button onClick={openModal}>
              <CiCirclePlus size="5em" />
            </button>
          </div>
        )}
      </div>

      <ContactForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        profession={profession}
        setProfession={setProfession}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        isEditing={isEditing}
      />
      <TableContent
        contacts={contacts}
        setContacts={setContacts}
        openModal={openModal}
        handleEditContact={handleEditContact}
      />
      <ToastContainer />
    </div>
  );
}

export default MainContent;
