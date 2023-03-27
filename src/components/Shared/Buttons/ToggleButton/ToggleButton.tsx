import React, { useEffect, useState } from "react";
import Styles from "./ToggleButton.module.scss";
import clsx from "clsx";
import { Field } from "formik";

const ToggleButton: React.FC<{
  name: string;
  backgroundColor?: string;
  activeTitle: string;
  activeSubtile?: String;
  activeIcon?: React.ReactNode;
  activeBackground: string;
  deactiveTitle: string;
  deactiveSubtile?: String;
  deactiveIcon?: React.ReactNode;
  deactiveBackground: string;
  height: "23" | "25" | "30" | "35" | "40" | "50" | "60";
  centerAlign?: boolean;
  method?: Function;
  color?: string;
}> = ({
  name,
  backgroundColor,
  activeTitle,
  activeSubtile,
  activeIcon,
  activeBackground,
  deactiveTitle,
  deactiveSubtile,
  deactiveIcon,
  deactiveBackground,
  height,
  centerAlign,
  method,
  color,
}) => {
  const [width, setWidth] = useState<number>(140);
  const [fontSize, setFontSize] = useState<number>(12);

  useEffect(() => {
    switch (height) {
      case "23":
        setWidth(48);
        setFontSize(8);
        break;
      case "25":
        setWidth(70);
        setFontSize(10);
        break;

      case "30":
        setWidth(80);
        setFontSize(12);
        break;

      case "35":
        setWidth(100);
        setFontSize(12);
        break;

      case "40":
        setWidth(120);
        setFontSize(14);
        break;

      case "50":
        setWidth(140);
        setFontSize(16);
        break;

      case "60":
        setWidth(160);
        setFontSize(18);
        break;

      default:
        setWidth(140);
        setFontSize(12);
    }
  }, [height]);

  return (
    <Field name={name}>
      {({ form, field }) => {
        const active = form.values[name];

        return (
          <div
            style={{
              background: backgroundColor ? backgroundColor : "#d9d9d9",
              height: height + "px",
              width: width + "px",
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
                background: `${active ? activeBackground : deactiveBackground}`,
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
                {active ? activeTitle : deactiveTitle}
              </span>

              {/* Button Subtitles */}
              {(activeSubtile && (
                <div
                  style={{ fontSize: fontSize + "px" }}
                  className={clsx(
                    Styles.subtitle,
                    active ? Styles.subtitle__active : Styles.subtitle__deactive
                  )}
                >
                  {active ? activeSubtile : deactiveSubtile}
                </div>
              )) ||
                (deactiveSubtile && (
                  <div
                    style={{ fontSize: fontSize + "px" }}
                    className={clsx(
                      Styles.subtitle,
                      active
                        ? Styles.subtitle__active
                        : Styles.subtitle__deactive
                    )}
                  >
                    {active ? activeSubtile : deactiveSubtile}
                  </div>
                ))}

              {/* Button Icons */}
              {(activeIcon && (
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
                  {active ? activeIcon : deactiveIcon}
                </div>
              )) ||
                (deactiveIcon && (
                  <div
                    style={{
                      fontSize: 16 + "px",
                    }}
                    className={clsx(
                      Styles.icon,
                      active ? Styles.icon__active : Styles.icon__deactive
                    )}
                  >
                    {active ? activeIcon : deactiveIcon}
                  </div>
                ))}
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default ToggleButton;
