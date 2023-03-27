import CommonButton from "@shared/Buttons/ContactsButton/CommonButton/CommonButton";
import React from "react";
import Styles from "./MyGroups.module.scss";

type Props = {};

const MyGroups = (props: Props) => {
  return (
    <div className={Styles.myGroups}>
      <div className={Styles.myGroups__container}>
        <p className="group-title">My Groups</p>
        <div className={Styles.myGroups__container__content}>
          <div className={Styles.myGroups__container__content__wrap}>
            <div
              className={Styles.myGroups__container__content__wrap__leftSide}
            >
              <div>
                <p
                  className={
                    Styles.myGroups__container__content__wrap__leftSide__brandName
                  }
                >
                  Nike Team 1
                </p>
                <p
                  className={
                    Styles.myGroups__container__content__wrap__leftSide__authorName
                  }
                >
                  Created By: Nike
                </p>
              </div>
            </div>
            <div
              className={Styles.myGroups__container__content__wrap__rightSide}
            >
              <CommonButton
                title="View Members"
                src2="/assets/icons/contactCard.svg"
                alt2="Contact Card Icons"
              />
            </div>
          </div>
          <span className={Styles.myGroups__container__content__date}>
            Since: 05/24/2022
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
