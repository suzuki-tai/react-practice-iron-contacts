import { Contact } from '@/interface/Contact'

export interface ContactTableProps {
  contactsList: Contact[],
  remainContactsListRef: React.MutableRefObject<Contact[]>,
  setContactsList: React.Dispatch<React.SetStateAction<Contact[]>>,
  setAddButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>,
};