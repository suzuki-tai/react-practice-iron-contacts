import React from 'react';
import './Contacts.css';
import { ButtonOption } from '@/interface/ButtonOption';
import { Contact } from '@/interface/Contact';
import { GiDiamondTrophy, GiLaurelsTrophy } from 'react-icons/gi';
import { IconOption } from '@/interface/IconOption';
import Icon from './Icon';
import Button from './Button';

export interface ContactsProps {
  contact: Contact;
  deleteContactOption: ButtonOption;
  deleteContact: Contact;
}

/**
 * IronContacts table body
 */
const Contacts = ({
  contact,
  deleteContactOption,
  deleteContact,
}: {
  contact: Contact;
  deleteContactOption: ButtonOption;
  deleteContact: (id: string) => void;
}) => {
  const wonOscar = getRandom(contact.popularity * 0.01) < 0.7 ? 0 : 1;
  const wonEmmy = getRandom(contact.popularity * 0.001) < 0.3 ? 1 : 0;

  const clickDeleteHandler = (id: string) => {
    deleteContact(id);
  };

  const oscarTrophyIconOption: IconOption = {
    iconType: GiDiamondTrophy,
    size: '1.5rem',
  };

  const emmyTrophyIconOption: IconOption = {
    iconType: GiLaurelsTrophy,
    size: '1.5rem',
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
          <h3>{wonOscar === 1 ? <Icon {...oscarTrophyIconOption} /> : ''}</h3>
        </th>
        <th scope="row">
          <h3>{wonEmmy === 1 ? <Icon {...emmyTrophyIconOption} /> : ''}</h3>
        </th>
        <th scope="row">
          <Button
            {...deleteContactOption}
            onClick={() => {
              clickDeleteHandler(contact.id);
            }}
          ></Button>
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
