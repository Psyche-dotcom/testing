import React, { useEffect, useState } from "react";
import Styles from "./ToggleShowHide.module.scss";
import clsx from "clsx";
import { Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ToggleShowHide: React.FC<{
  name: string;
  centerAlign?: boolean;
  color?: string;
}> = ({ name, centerAlign, color }) => {
  const [width, setWidth] = useState<number>(140);
  const [fontSize, setFontSize] = useState<number>(12);
  return (
    <Field name={name}>
      {({ form, field }) => {
        const active = form.values[name];

        return (
          <div
            style={{
              background: "white",
              height: "23px",
              width: "70px",
              margin: centerAlign ? "5px auto" : "5px",
            }}
            onClick={() => {
              form.setFieldValue(name, !form.values[name]);
              // method && method();
            }}
            className={Styles.toggleButton}
          >
            <div
              className={Styles.container}
              style={{
                background: `${active ? "#61FF00" : "#a3a1a1"}`,
              }}
            >
              {/* Button Titles */}
              <span
                style={{
                  fontSize: fontSize + "px",
                  color: `${color && color}`,
                }}
                className={clsx(
                  Styles.title,
                  active ? Styles.title__active : Styles.title__deactive
                )}
              >
                {active ? "Hide" : "Show"}
              </span>

              {/* Button Icons */}
              {
                <div
                  style={{
                    fontSize: 16 + "px",
                    color: `${color && color}`,
                  }}
                  className={clsx(
                    Styles.icon,
                    active ? Styles.icon__active : Styles.icon__deactive
                  )}
                >
                  {active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              }
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default ToggleShowHide;
