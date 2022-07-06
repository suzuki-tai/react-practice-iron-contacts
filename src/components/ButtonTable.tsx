import React from "react";
import { useState } from "react";
import { ImPlus } from 'react-icons/im';
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import Button from './Button';
import { ButtonTableProps } from "@/interface/ButtonTableProps";
import { Contact } from '@/interface/Contact';
import { ButtonOption } from '@/interface/ButtonOption';
import { IconOption } from '@/interface/IconOption';
import { SortCondition } from '@/interface/SortCondition';

import lo from 'lodash';

/**
 * button table component
 * @param {Contact[]} contactsList コンタクトリスト(画面表示)
 * @param {React.MutableRefObject<Contact[]>} remainContactsListRef コンタクトリスト(非表示)
 * @param {Contact[]} initialContactsList コンタクトリスト(初期描画)
 * @param {boolean} addButtonDisabled ランダム追加ボタン活性フラグ
 * @param {React.Dispatch<React.SetStateAction<Contact[]>>} setContactsList コンタクトリストsetter
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setAddButtonDisabled ランダム追加ボタン活性フラグsetter
 * @return {React.Component}
 */
const ButtonTable = ({
  contactsList,
  remainContactsListRef,
  initialContactsList,
  addButtonDisabled,
  setContactsList,
  setAddButtonDisabled,
}: ButtonTableProps) => {
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
   * initialize contact table and button state
   */
  const initialize = () => {
    setContactsList(initialContactsList);
    setAddButtonDisabled(false);
    setSortCondition(initialSortCondition);
  };

  // declare icon options
  const addIconOption: IconOption = {
    iconType: ImPlus,
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

  const refreshOption: ButtonOption = {
    type: 'button',
    className: 'button refresh-button',
    title: 'Refresh',
    iconOption: refreshIconOption,
    onClick: initialize,
  };

  return (
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
  );
};

export default ButtonTable;
