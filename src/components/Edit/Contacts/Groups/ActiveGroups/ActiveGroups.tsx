import CommonButton from "@shared/Buttons/ContactsButton/CommonButton/CommonButton";
import React from "react";
import Styles from "./ActiveGroups.module.scss";
import ActiveGroup from "../ActiveGroup/ActiveGroup";

const ActiveGroups = () => {
  return (
    <div className={Styles.activeGroups}>
      <div className={Styles.activeGroups__container}>
        <div className={Styles.activeGroups__container__header}>
          <p className="group-title">Active Groups</p>
          <div className={Styles.activeGroups__container__header__btnContainer}>
            <CommonButton
              title="Add Group"
              src2="/assets/icons/add.svg"
              alt2="Add icons"
            />
          </div>
        </div>
        {[1, 2].map((_, index) => (
          <ActiveGroup />
        ))}
      </div>
    </div>
  );
};

export default ActiveGroups;
