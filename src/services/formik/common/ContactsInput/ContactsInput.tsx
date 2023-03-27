import React from "react";
import Styles from "./ContactsInput.module.scss";

const ContactsInput: React.FC<{
  logo1: string;
  logo2?: string;
  placeholder: string;
  field: any;
  rest: any;
}> = ({ logo1, logo2, placeholder, field, rest }) => {
  return (
    <div className={Styles.contactsInputWrapper}>
      <div className={Styles.contactsInputWrapper__leftContent}>
        {logo1 && <img src={logo1} alt={`user Icon`} />}
        <input placeholder={placeholder} {...field} {...rest} />
      </div>
      {logo2 && (
        <button type="button">
          <img src={logo2} alt={`del Icon`} />
        </button>
      )}
    </div>
  );
};

export default ContactsInput;
