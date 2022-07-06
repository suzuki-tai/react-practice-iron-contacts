import React from 'react';
import { GiDiamondTrophy, GiLaurelsTrophy } from 'react-icons/gi';
import Icon from './Icon';
import Button from './Button';
import { ContactsProps } from '@/interface/ContactProps';
import { IconOption } from '@/interface/IconOption';

import './Contacts.css';

/**
 * contacts table row component
 * @param {Contact} contact　コンタクト(画面表示)
 * @param {ButtonOption} deleteContactOption 削除ボタンオプション
 * @param {(id: string) => void} deleteContact 削除ボタンクリックアクション
 * @return {React.Component}
 */
const Contacts = ({
  contact,
  deleteContactOption,
  deleteContact,
}: ContactsProps) => {
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
