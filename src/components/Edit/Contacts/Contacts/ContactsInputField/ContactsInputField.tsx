import FormikControl from "@formik/FormikControl";
import React from "react";
import Styles from "./ContactsInputField.module.scss";

type Props = {};

const ContactsInputField = (props: Props) => {
  return (
    <div>
      <FormikControl
        control="input"
        name="contacts.username"
        placeholder="Username"
        required
      />
    </div>
  );
};

export default ContactsInputField;
