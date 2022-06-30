import * as React from 'react';
import { useState, useRef } from 'react';
import './App.css';
import jsonContacts from './contacts.json';
import Contacts from './components/Contacts';
import { ButtonOption } from './interface/ButtonOption';
import { Contact } from './interface/Contact';

const App = () => {
  const contacts: Contact[] = jsonContacts;
  const initialContactsList = contacts.slice(0, 5);
  const [contactsList, setContactsList] = useState(initialContactsList);
  const remainContactsListRef = useRef(contacts.slice(5));
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  /**
   * pick up contact randomly and add it to table
   */
  const addRandomContact = () => {
    const remainContactsList = remainContactsListRef.current;
    const slicePosition = Math.floor(Math.random() * remainContactsList.length);
    const additionalContact = remainContactsList[slicePosition];
    remainContactsListRef.current = remainContactsList.filter(
      (contact) => contact.id !== additionalContact.id
    );
    setAddButtonDisabled(
      remainContactsListRef.current.length === 0 ? true : false
    );
    setContactsList(contactsList.concat(additionalContact));
  };

  /**
   * sort contacts list by popularity
   */
  const sortByPopularity = () => {
    const sortedContactsList = [...contactsList].sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContactsList(sortedContactsList);
  };

  /**
   * sort contacts list by name
   */
  const sortByName = () => {
    const sortedContactsList = [...contactsList].sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    setContactsList(sortedContactsList);
  };

  /**
   * delete contact from table
   */
  const deleteContact = (id: string) => {
    const deletedContactsList = contactsList.filter(
      (contact) => contact.id !== id
    );
    remainContactsListRef.current = remainContactsListRef.current.concat(
      contactsList.filter((contact) => contact.id === id)
    );
    setAddButtonDisabled(
      remainContactsListRef.current.length === 0 ? true : false
    );
    setContactsList(deletedContactsList);
  };

  const addContactOption: ButtonOption = {
    type: 'button',
    className: 'button add-random-contact-button',
    title: 'Add Random Contact',
    disabled: addButtonDisabled,
    onClick: addRandomContact,
  };

  const sortByPopularityOption: ButtonOption = {
    type: 'button',
    className: 'button sort-contact-button',
    title: 'Sort by popularity',
    onClick: sortByPopularity,
  };

  const sortByNameOption: ButtonOption = {
    type: 'button',
    className: 'button sort-contact-button',
    title: 'Sort by Name',
    onClick: sortByName,
  };

  const deleteContactOption: ButtonOption = {
    type: 'button',
    className: 'button delete-contact-button',
    title: 'Delete',
  };

  return (
    <>
      <div className="App">
        <h1> IronContacts </h1>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">
                <button {...addContactOption}>{addContactOption.title}</button>
              </th>
              <th scope="row">
                <button {...sortByPopularityOption}>
                  {sortByPopularityOption.title}
                </button>
              </th>
              <th scope="row">
                <button {...sortByNameOption}>{sortByNameOption.title}</button>
              </th>
            </tr>
          </tbody>
        </table>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">
                <h2>Picture</h2>
              </th>
              <th scope="col">
                <h2>Name</h2>
              </th>
              <th scope="col">
                <h2>Popularity</h2>
              </th>
              <th scope="col">
                <h2>
                  Won
                  <br />
                  Oscar
                </h2>
              </th>
              <th scope="col">
                <h2>
                  Won
                  <br />
                  Emmy
                </h2>
              </th>
              <th scope="col">
                <h2>Actions</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {contactsList.map((contact) => {
              return (
                <Contacts
                  key={contact.id}
                  contact={contact}
                  deleteContactOption={deleteContactOption}
                  deleteContact={(id) => deleteContact(id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
