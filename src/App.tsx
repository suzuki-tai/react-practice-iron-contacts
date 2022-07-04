import React from 'react';
import { useState, useRef } from 'react';
import './App.css';
import jsonContacts from './contacts.json';
import Contacts from './components/Contacts';
import { ButtonOption } from '@/interface/ButtonOption';
import { Contact } from '@/interface/Contact';
import lo from 'lodash';
import { ImPlus } from 'react-icons/im';
import {
  FaRegTrashAlt,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import { IconOption } from '@/interface/IconOption';
import Button from './components/Button';
import TableHeader from './components/TableHeader';
import { SortCondition } from '@/interface/SortCondition';

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

  // declare initial sort condition (popularity: asc, name: asc)
  const initialSortCondition: SortCondition = {
    popularity: 'asc',
    name: 'asc',
  };
  const [sortCondition, setSortCondition] = useState(initialSortCondition);

  /**
   * pick up contact randomly and add it to table
   */
  const addRandomContact = () => {
    const remainContactsList = remainContactsListRef.current;
    const slicePosition = Math.floor(Math.random() * remainContactsList.length);
    const additionalContact = remainContactsList[slicePosition];

    // remove additional contact from remain contacts list
    remainContactsListRef.current = remainContactsList.filter(
      (contact) => contact.id !== additionalContact.id
    );

    // set add button disabled if remain contacts list length equals 0
    setAddButtonDisabled(
      remainContactsListRef.current.length === 0 ? true : false
    );

    // update contacts list to rerender table
    setContactsList(contactsList.concat(additionalContact));
  };

  /**
   * sort contacts list by popularity
   */
  const sortByPopularity = () => {
    let sortedContactsList: Contact[] = [];
    if (sortCondition.popularity === 'asc') {
      sortedContactsList = sortedContactsList.concat(
        lo.orderBy(
          [...contactsList],
          ['popularity', 'name'],
          ['desc', sortCondition.name]
        )
      );
      setSortCondition({
        key: 'popularity',
        popularity: 'desc',
        name: sortCondition.name,
      });
    } else {
      sortedContactsList = sortedContactsList.concat(
        lo.orderBy(
          [...contactsList],
          ['popularity', 'name'],
          ['asc', sortCondition.name]
        )
      );
      setSortCondition({
        key: 'popularity',
        popularity: 'asc',
        name: sortCondition.name,
      });
    }

    // update contacts list to rerender table
    setContactsList(sortedContactsList);
  };

  /**
   * sort contacts list by name
   */
  const sortByName = () => {
    let sortedContactsList: Contact[] = [];
    if (sortCondition.name === 'asc') {
      sortedContactsList = lo.orderBy(
        [...contactsList],
        ['name', 'popularity'],
        ['asc', sortCondition.popularity]
      );
      setSortCondition({
        key: 'name',
        popularity: sortCondition.popularity,
        name: 'desc',
      });
    } else {
      sortedContactsList = lo.orderBy(
        [...contactsList],
        ['name', 'popularity'],
        ['desc', sortCondition.popularity]
      );
      setSortCondition({
        key: 'name',
        popularity: sortCondition.popularity,
        name: 'asc',
      });
    }

    // update contacts list to rerender table
    setContactsList(sortedContactsList);
  };

  /**
   * delete contact from table
   */
  const deleteContact = (id: string) => {
    // remove selected contact from contacts list
    const deletedContactsList = contactsList.filter(
      (contact) => contact.id !== id
    );

    // add deleted contact to remain contacts list
    remainContactsListRef.current = remainContactsListRef.current.concat(
      contactsList.filter((contact) => contact.id === id)
    );

    // set add button available if remain contacts list length is not equal 0
    setAddButtonDisabled(
      remainContactsListRef.current.length === 0 ? true : false
    );

    // update contacts list to rerender table
    setContactsList(deletedContactsList);
  };

  /**
   * initialize contact table
   */
  const initialize = () => {
    setContactsList(initialContactsList);
  };

  // declare icon options
  const addIconOption: IconOption = {
    iconType: ImPlus,
    size: '1.5rem',
  };

  const deleteIconOption: IconOption = {
    iconType: FaRegTrashAlt,
    size: '1.5rem',
  };

  const sortPopularityIconOption: IconOption = {
    iconType:
      sortCondition.popularity === 'asc'
        ? FaSortNumericDown
        : FaSortNumericDownAlt,
    size: '1.5rem',
    color: sortCondition.key === 'popularity' ? 'black' : '#ccc',
  };

  const sortNameIconOption: IconOption = {
    iconType:
      sortCondition.name === 'asc' ? FaSortAlphaDown : FaSortAlphaDownAlt,
    size: '1.5rem',
    color: sortCondition.key === 'name' ? 'black' : '#ccc',
  };

  const refreshIconOption: IconOption = {
    iconType: TbRefresh,
    size: '1.5rem',
  };

  // declare button options
  const addContactOption: ButtonOption = {
    type: 'button',
    className: 'button add-random-contact-button',
    title: 'Add Random Contact',
    disabled: addButtonDisabled,
    iconOption: addIconOption,
    onClick: addRandomContact,
  };

  const sortByPopularityOption: ButtonOption = {
    type: 'button',
    className: 'button sort-contact-button',
    title: 'Sort by popularity',
    iconOption: sortPopularityIconOption,
    onClick: sortByPopularity,
  };

  const sortByNameOption: ButtonOption = {
    type: 'button',
    className: 'button sort-contact-button',
    title: 'Sort by Name',
    iconOption: sortNameIconOption,
    onClick: sortByName,
  };

  const deleteContactOption: ButtonOption = {
    type: 'button',
    className: 'button delete-contact-button',
    title: 'delete',
    iconOption: deleteIconOption,
  };

  const refreshOption: ButtonOption = {
    type: 'button',
    className: 'button refresh-button',
    title: 'Refresh',
    iconOption: refreshIconOption,
    onClick: initialize,
  };

  return (
    <>
      <div className="App">
        <h1 className="page-title"> IronContacts </h1>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">
                <Button {...addContactOption}>{addContactOption.title}</Button>
              </th>
              <th scope="row">
                <Button {...sortByPopularityOption}>
                  {sortByPopularityOption.title}
                </Button>
              </th>
              <th scope="row">
                <Button {...sortByNameOption}>{sortByNameOption.title}</Button>
              </th>
              <th scope="row">
                <Button {...refreshOption}></Button>
              </th>
            </tr>
          </tbody>
        </table>
        <table className="table table-borderless">
          <thead>
            <TableHeader></TableHeader>
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
