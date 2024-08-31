const filteredByProfession = (profession) => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts.filter(contact => contact.profession === profession);
};

const searchByName = (name) => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
}

export { filteredByProfession,searchByName };

