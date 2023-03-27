import React from "react";
import { useDispatch } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Styles from "./MenuCloseBtn.module.scss";

const MenuCloseBtn: React.FC<{ action: Function }> = ({ action }) => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.menuCloseBtn} onClick={() => dispatch(action())}>
      <IoIosCloseCircleOutline className={Styles.closeIcon} />
    </div>
  );
};

export default MenuCloseBtn;
