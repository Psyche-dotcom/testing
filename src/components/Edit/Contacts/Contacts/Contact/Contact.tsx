import FormikControl from "@formik/FormikControl";
import CommonButton from "@shared/Buttons/ContactsButton/CommonButton/CommonButton";
import React from "react";
import Styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={Styles.inputContent}>
      <div className={Styles.inputContent__btn}>
        <CommonButton type="button" title="Download Contact List" />
        <select>
          <option>Sort By</option>
        </select>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div key={index} className={Styles.inputContent__input}>
          <FormikControl
            control="input"
            type="text"
            name={"contacts.username"}
            placeholder="Username"
            contacts={{ logo1: "/assets/icons/user.svg" }}
            required
          />
        </div>
      ))}
    </div>
  );
};

export default Contact;
