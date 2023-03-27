import Link from "next/link";
import React from "react";
import Styles from "./CopyLinkBtn.module.scss";

const CopyLinkBtn: React.FC<{
  name: string;
  icon: boolean;
  fontSize?: string;
}> = ({ name, icon, fontSize }) => {
  return (
    <button className={Styles.copybutton}>
      <span
        style={{
          fontSize: `${fontSize && fontSize}`,
          paddingRight: `${icon && "5px"}`,
        }}
      >
        {name}
      </span>
      {icon && <img src="/assets/icons/link.svg" alt="Coipy Link Images" />}
    </button>
  );
};

export default CopyLinkBtn;
