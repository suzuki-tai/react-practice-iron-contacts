import * as React from 'react';

export type ButtonHTMLAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'style'
>;

export interface ButtonOption extends ButtonHTMLAttributes {
  type: 'button';
  className: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}
