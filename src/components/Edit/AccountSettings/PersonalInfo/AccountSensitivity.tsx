import ToggleButton from "@edit/DisplayOptions/Buttons/ToggleButton";
import Link from "next/link";
import React from "react";
import Styles from "./AccountSensitivity.module.scss";

const AccountSensitivity = () => {
  return (
    <div className={Styles.accountSensitivity}>
      <p>Vreel Account</p>
      <Link href={"/"}>
        <a className={Styles.active}>ACtive</a>
      </Link>
      <p style={{ paddingBottom: "0px" }}>Vreel Account</p>
      <p>Level</p>
      <div className={Styles.accountSensitivity__help}>
        <Link href={"/"}>
          <a> Basic</a>
        </Link>
        <img src="/assets/icons/help.svg" alt="help icons" />
      </div>
      <p>Account Sensitivity </p>
      <ToggleButton />
    </div>
  );
};

export default AccountSensitivity;
