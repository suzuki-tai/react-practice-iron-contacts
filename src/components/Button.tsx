import React from 'react';
import { ButtonOption } from '@/interface/ButtonOption';
import Icon from './Icon';

const Button = (props: ButtonOption) => {
  return (
    <button {...props}>
      {props.label}
      {props.iconOption && <Icon {...props.iconOption} />}
    </button>
  );
};

export default Button;
