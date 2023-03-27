import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import React, { useRef, useState } from 'react';
import Styles from './DisplayColor.module.scss';

const DisplayColor: React.FC = () => {
  //   const [color1, setColor1] = useState('#b3bac3');
  //   const [color2, setColor2] = useState('#b3bac3');

  const initialValues = {
    background: '#b3bac3',
    font: '#b3bac3',
  };
  const handleSubmit = async (values) => {

  };

  return (
    <FormikContainer initialValues={initialValues}>
      {(formik) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formik.values);
            }}
          >
            <FormikControl
              control='input'
              type='color'
              name='background'
              colorInput={true}
            />
            <FormikControl
              control='input'
              type='color'
              name='font'
              colorInput={true}
            />

            <button type='submit'>Save</button>
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default DisplayColor;

{
  /* <div className={Styles.display__color}>
<span className={Styles.title}>Element Display Color</span>

<div className={Styles.inputWrapper}></div>
</div> */
}
