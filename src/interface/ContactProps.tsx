import { Contact } from '@/interface/Contact'
import { ButtonOption } from '@/interface/ButtonOption'

export interface ContactsProps {
  contact: Contact;
  deleteContactOption: ButtonOption;
  deleteContact: (id: string) => void;
}