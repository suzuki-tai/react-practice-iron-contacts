import React from 'react';
import { IconOption } from './IconOption';

export type ButtonHTMLAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'style'
>;

export interface ButtonOption extends ButtonHTMLAttributes {
  type: 'button';
  className: string;
  title: string;
  disabled?: boolean;
  iconOption?: IconOption;
  label?: string;
  onClick?: () => void;
}
