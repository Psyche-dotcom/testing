import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Styles from './ColorInput.module.scss';

const ColorInput: React.FC<{
  field: any;
  rest: any;
  name: string;
}> = ({ field, rest, name }) => {
  const { values } = useFormikContext();

  return (
    <div className={Styles.inputContainer}>
      <div className={Styles.colorPicker}>
        <input type='color' {...field} {...rest} />
        <div
          style={{
            backgroundColor: values[name],
          }}
          className={Styles.null__input}
        ></div>
      </div>
      <div className={Styles.colorCode}>
        <h4>{name}</h4>
        <span>{values[name]}</span>
      </div>
    </div>
  );
};

export default ColorInput;
