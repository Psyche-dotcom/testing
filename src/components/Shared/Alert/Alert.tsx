import React, { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import Styles from "./Alert.module.scss";

const Alert = ({
  open,
  yesText = "Yes",
  noText = "No",
  yesCallback,
  children = null,
  noCallback,
  text,
}) => {
  return open ? (
    <div className={Styles.alert_container}>
      <div className={Styles.alert_content}>
        <h3> {text}</h3>
        {children && <div>{children}</div>}
        <div className={Styles.button_container}>
          <button onClick={noCallback} className={Styles.alert_no_btn}>
            {noText}
          </button>
          <button className={Styles.alert_yes_btn} onClick={yesCallback}>
            {yesText}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
