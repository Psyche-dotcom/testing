import React from "react";
import Styles from "./SlideActionsBtn.module.scss";

const FActionsBtn: React.FC<{
  title: string;
  bgColor: string;
  padding: string;
  borderRadius?: string;
  Icon?: any;
  width?: string;
  actions: Function;
  type?: any;
  color?: string;
  fontSize?:string;
}> = ({
  title,
  bgColor,
  borderRadius,
  Icon,
  padding,
  actions,
  width,
  color,
  type = "button",
    fontSize="14px"
}) => {
    const style = {
      backgroundColor: bgColor,
      padding: padding,
      width: width,
      borderRadius: borderRadius,
      color: color,
      margin: "0 auto",
      fontSize: fontSize,
    };
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px 0", width: "100%", fontSize: fontSize }}
      >
        <button
          type={type}
          style={style}
          className={Styles.deletBtn}
          onClick={() => actions()}
        >
          <span>
            {Icon && (
              <span className={Styles.icon}>
                <Icon />
              </span>
            )}
            <span style={{ color: `${color && color}` }}>{title}</span>
          </span>
        </button>
      </div>
    );
  };

export default FActionsBtn;
