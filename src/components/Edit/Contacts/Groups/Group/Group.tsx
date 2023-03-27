import clsx from "clsx";
import React from "react";
import ActiveGroups from "../ActiveGroups/ActiveGroups";
import MyGroups from "../MyGroups/MyGroups";
import Styles from "./Group.module.scss";

type Props = {};

const Group = (props: Props) => {
  return (
    <div className={Styles.group}>
      {/* Group Request Design */}
      <div className={Styles.group__requests}>
        <p className="group-title">Group Requests</p>
        <div className={Styles.group__requests__content}>
          <div className={Styles.group__requests__content__left}>
            <p className={Styles.group__requests__content__left__brandName}>
              Nike Team 1
            </p>
            <p className={Styles.group__requests__content__left__authorName}>
              Created By: Nike
            </p>
          </div>
          <div className={Styles.group__requests__content__right}>
            <button type="button">
              <img src="/assets/icons/DismissCircle.svg" alt="Dismiss Circle" />
              <span>Decline</span>
            </button>
            <button type="button">
              <img
                src="/assets/icons/CheckmarkCircle.svg"
                alt="Dismiss Circle"
              />
              <span>Accept</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Groups Design */}
      <div>
        <ActiveGroups />
      </div>
      {/* My Groups Design */}
      <div>
        <MyGroups />
      </div>
    </div>
  );
};

export default Group;
