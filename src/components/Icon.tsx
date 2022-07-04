import React from 'react';
import { IconOption } from '@/interface/IconOption';

const Icon = (props: IconOption) => {
  return (
    <props.iconType size={props.size} color={props.color} title={props.title} />
  );
};

export default Icon;
