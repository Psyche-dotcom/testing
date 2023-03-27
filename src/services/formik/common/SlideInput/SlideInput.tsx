import React from 'react';
import Styles from './slideinput.module.scss';

const slideinput = ({ placeholder, name, type }: any) => {
  return (
    <input
      className={Styles.slideinput}
      placeholder={placeholder}
      name={name}
      type={type}
    />
  );
};

export default slideinput;
