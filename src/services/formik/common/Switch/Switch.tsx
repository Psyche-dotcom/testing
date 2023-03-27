import clsx from "clsx";
import { Field, useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import Styles from "./Switch.module.scss";

export const CTAFillSwitch = ({ position, name }) => {
    const { setFieldValue } = useFormikContext<any>();
    const buttonStyles = {
        padding: "0.5rem",
        color: "black",
        width: "8rem",

    }

    function handleSwitch(pos: string) {
        setFieldValue(name, pos);
    }

    return (
        <div>
            <button
                onClick={() => handleSwitch("Solid")}
                style={{ ...buttonStyles, backgroundColor: position !== "Solid" ? "gray" : "white" }}>Solid</button>
            <button
                onClick={() => handleSwitch("Transparent")}

                style={{ ...buttonStyles, backgroundColor: position === "Solid" ? "gray" : "white" }}>Transparent</button>

        </div>
    )
}

export const CTAPositionSwitch = ({ position, name }) => {
  const { setFieldValue } = useFormikContext<any>();
  const buttonStyles = {
    padding: "0.5rem",
    color: "black",
    width: "8rem",

  }

  function handleSwitch(pos: string) {
    setFieldValue(name, pos);
  }

  return (
    <div style={{position: ""}}>
      <button
        onClick={() => handleSwitch("center")}
        style={{ ...buttonStyles, backgroundColor: position !== "center" ? "gray" : "white" }}>Center</button>
      <button
        onClick={() => handleSwitch("side")}

        style={{ ...buttonStyles, backgroundColor: position === "center" ? "gray" : "white" }}>Side</button>

    </div>
  )
}

const Switch = ({
  bgActive = "green",
  bgDeActive = "#a3a1a1",
  height = 25,
  width = 90,
  firstInnerText = "Off",
  secondInnertext = "On",
  firstTitle = "On",
  secondTitle = "Off",
  name,
}) => {
  const { setFieldValue, getFieldMeta, values } = useFormikContext();
  const [active, setActive] = useState(getFieldMeta(name).value);

  return (
    <div
      className={Styles.toggleBtn}
      style={{
        backgroundColor: `${active ? bgActive : bgDeActive}`,
        boxShadow: `inset 5px 5px 5px 6px ${active ? bgActive : bgDeActive}`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => {
        setFieldValue(name, !active);
        setActive(!active);
      }}
    >
      {firstInnerText && (
        <span
          className={clsx(
            Styles.toggleBtn__switchText,
            active ? Styles.active : Styles.deactive
          )}
          style={{ width: `${width / 3}px`, color: "white" }}
        >
          {active ? firstInnerText : secondInnertext}
        </span>
      )}
      <button className={clsx(active ? Styles.on : Styles.off)} type="button">
        {active ? firstTitle : secondTitle}
      </button>
    </div>
  );
};

export default React.memo(Switch);
