import React from 'react';
import { Field } from 'formik';

const Images = (props: any) => {
  const { name, placeholder, ...rest } = props;
  const item = {
    id: 2,
    file_type: 'image/png',
    uri: '/assets/images/female.png',
  };
  return (
    <Field name={name}>
      {({ field, form }) => {
        return <img alt={`${placeholder} `} src={item.uri} />;
      }}
    </Field>
  );
};

export default Images;
