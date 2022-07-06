import React from 'react';
import { useState, useRef } from 'react';
import Title from './components/Title';
import ButtonTable from './components/ButtonTable';
import ContactTable from './components/ContactTable';
import { Contact } from '@/interface/Contact';
import './App.css';
import jsonContacts from './contacts.json';

/**
 * Iron Contacts base component
 * @return {React.Component}
 */
const App = () => {
  // define contacts list from json
  const contacts: Contact[] = jsonContacts;

  // get initial 5 contacts from contacts list
  const initialContactsList = contacts.slice(0, 5);

  // declare initial state valiable and define setter function
  const [contactsList, setContactsList] = useState(initialContactsList);

  // define remain contacts list as mutable ref object
  const remainContactsListRef = useRef(contacts.slice(5));

  // declare disabled state valiable for add button (initialized false) and define setter function
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  return (
    <div className="App">
      <Title></Title>
      <ButtonTable
        contactsList={contactsList}
        remainContactsListRef={remainContactsListRef}
        initialContactsList={initialContactsList}
        addButtonDisabled={addButtonDisabled}
        setContactsList={setContactsList}
        setAddButtonDisabled={setAddButtonDisabled}
      />
      <ContactTable
        contactsList={contactsList}
        remainContactsListRef={remainContactsListRef}
        setContactsList={setContactsList}
        setAddButtonDisabled={setAddButtonDisabled}
      />
    </div>
  );
};

export default App;
