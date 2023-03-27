import React from "react";
import Styles from "./SubmitBtn.module.scss";

const SubmitBtn = () => {
  return (
    <div className={Styles.submit}>
      <button className={Styles.submit__btn}>Submit</button>
    </div>
  );
};

export default SubmitBtn;
