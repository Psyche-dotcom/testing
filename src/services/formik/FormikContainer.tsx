import React from 'react';
import { Formik } from 'formik';

export const FormikContainer = ({
  children,
  initialValues,
  validationSchema,
}: any) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
      }}
    >
      {children}
    </Formik>
  );
};
