import clsx from "clsx";
import React from "react";
import Styles from "./CommonButton.module.scss";

const CommonButton: React.FC<{
  title: string;
  alt1?: string;
  alt2?: string;
  src1?: string;
  src2?: string;
  type?: any;
}> = ({ title, alt1, alt2, src1, src2, type }) => {
  return (
    <button
      type={type}
      className={clsx(
        Styles.buttonsContainer,
        src1 || src2
          ? Styles.buttonsContainer__deactiveSize
          : Styles.buttonsContainer__activeSize
      )}
    >
      {src1 && <img src={src1} alt={alt1} />}
      <span>{title}</span>
      {src2 && (
        <img src={src2} alt={alt2} className={Styles.buttonsContainer__right} />
      )}
    </button>
  );
};

export default CommonButton;
