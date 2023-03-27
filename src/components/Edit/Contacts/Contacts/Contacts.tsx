import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import clsx from "clsx";
import React, { useState } from "react";
import Groups from "../Groups/Groups";
import Contact from "./Contact/Contact";
import Styles from "./Contacts.module.scss";

const Contacts = () => {
  const [conatacts, setConatcts] = useState(true);

  const initialValues = {
    name: "John Doe",
  };

  const handleSubmit = async (e) => {
  };

  return (
    <div className={Styles.contacts}>
      <div className={Styles.contacts__container}>
        <div className={Styles.contacts__container__content}>
          <div className={Styles.contacts__container__content__header}>
            <p>Contacts</p>
            <div
              className={Styles.contacts__container__content__header__toggleBtn}
              onClick={() => setConatcts(!conatacts)}
            >
              <span
                className={clsx(
                  conatacts
                    ? Styles.contacts__container__content__header__toggleBtn__active
                    : Styles.contacts__container__content__header__toggleBtn__deactive
                )}
              >
                {conatacts ? "Groups" : "Contacts"}
              </span>
              <button
                className={clsx(
                  conatacts
                    ? Styles.contacts__container__content__header__toggleBtn__contacts
                    : Styles.contacts__container__content__header__toggleBtn__groups
                )}
                type="button"
              >
                {conatacts ? "Contacts" : "Groups"}
              </button>
            </div>
          </div>
          <div className={Styles.contacts__container__content__body}>
            <FormikContainer initialValues={initialValues}>
              {(formik) => {
                return (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(formik.values);
                    }}
                  >
                    <>
                      <div
                        className={
                          Styles.contacts__container__content__body__search
                        }
                      >
                        <FormikControl
                          control="input"
                          type="search"
                          name={"contacts.username"}
                          search={{ logo1: "/assets/icons/search.svg" }}
                          required
                        />
                      </div>

                      {conatacts ? <Contact /> : <Groups />}
                    </>
                  </form>
                );
              }}
            </FormikContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
