import React, { createContext, useState } from 'react';

// Create the context
const ContactContext = createContext();

// Create a provider component
function ContactProvider({ children }) { // Renamed the function to 'ContactProvider'
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  return (
    <ContactContext.Provider value={{ 
      contacts, 
      setContacts, 
      isModalOpen, 
      setIsModalOpen, 
      isEditing, 
      setIsEditing, 
      currentEditIndex, 
      setCurrentEditIndex 
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export { ContactContext, ContactProvider };
