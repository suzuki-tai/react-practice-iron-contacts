import { Contact } from "@/interface/Contact";

export interface ButtonTableProps {
  contactsList: Contact[],
  remainContactsListRef: React.MutableRefObject<Contact[]>,
  initialContactsList: Contact[],
  addButtonDisabled: boolean,
  setContactsList: React.Dispatch<React.SetStateAction<Contact[]>>,
  setAddButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>,
};
