import React from "react";
import Group from "./Group/Group";
import Styles from "./Groups.module.scss";

const Groups = () => {
  return (
    <div className={Styles.groups}>
      <Group />
    </div>
  );
};

export default Groups;
