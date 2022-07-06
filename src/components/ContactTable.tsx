import React from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
import TableHeader from './ContactTableHeader';
import Contacts from './Contacts';
import { ContactTableProps } from "@/interface/ContactTableProps";
import { ButtonOption } from '@/interface/ButtonOption';
import { IconOption } from '@/interface/IconOption';

/**
 * contact table component
 * @param {Contact[]} contactsList コンタクトリスト(画面表示)
 * @param {React.MutableRefObject<Contact[]>} remainContactsListRef コンタクトリスト(画面非表示)
 * @param {React.Dispatch<React.SetStateAction<Contact[]>>} setContactsList コンタクトリストsetter
 * @param {React.Dispatch<React.SetStateAction<Contact[]>>} setAddButtonDisabled ランダム追加ボタン活性フラグsetter
 * @return {React.Component}
 */
const ContactTable = ({
  contactsList,
  remainContactsListRef,
  setContactsList,
  setAddButtonDisabled,
}: ContactTableProps) => {
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

  // declare icon options
  const deleteIconOption: IconOption = {
    iconType: FaRegTrashAlt,
    size: '1.5rem',
  };

  // declare button options
  const deleteContactOption: ButtonOption = {
    type: 'button',
    className: 'button delete-contact-button',
    title: 'delete',
    iconOption: deleteIconOption,
  };

  return (
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
  );
};

export default ContactTable;
