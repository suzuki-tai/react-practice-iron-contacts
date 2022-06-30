import * as React from 'react';
import './Contacts.css';
import { ButtonOption } from '../interface/ButtonOption';
import { Contact } from '../interface/Contact';

/**
 * IronContacts table body
 */
const Contacts = ({ contact, deleteContactOption, deleteContact }) => {
  const wonOscar = getRandom(contact.popularity * 0.01) < 0.7 ? 0 : 1;
  const wonEmmy = getRandom(contact.popularity * 0.001) < 0.3 ? 1 : 0;

  const clickDeleteHandler = (id: string) => {
    deleteContact(id);
  };

  return (
    <>
      <tr key={contact.id}>
        <th scope="row">
          <img src={contact.pictureUrl} alt={contact.name} />
        </th>
        <th scope="row">
          <h3>{contact.name}</h3>
        </th>
        <th scope="row">
          <h3>{contact.popularity}</h3>
        </th>
        <th scope="row">
          <h3>{wonOscar === 1 ? '🏆' : ''}</h3>
        </th>
        <th scope="row">
          <h3>{wonEmmy === 1 ? '🏆' : ''}</h3>
        </th>
        <th scope="row">
          <button
            {...deleteContactOption}
            onClick={() => {
              clickDeleteHandler(contact.id);
            }}
          >
            {deleteContactOption.title}
          </button>
        </th>
      </tr>
    </>
  );
};

/**
 * get random number calculate from bernoulli shift
 */
const getRandom = (seed: number) => {
  let bernoulliShift = seed > 1.0 ? seed - 1 : seed;
  const length = seed * 1000;
  for (let i = 0; i < length; i++) {
    if (bernoulliShift < 0.5) {
      bernoulliShift = 2 * bernoulliShift - Math.pow(10, -8);
    } else {
      bernoulliShift = 2 * bernoulliShift - 1 - Math.pow(10, -8);
    }
  }
  return bernoulliShift;
};

export default Contacts;
