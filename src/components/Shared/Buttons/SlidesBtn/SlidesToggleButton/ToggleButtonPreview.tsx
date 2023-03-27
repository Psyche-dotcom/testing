import clsx from "clsx";
import React from "react";
import Styles from "./SlidesToggleButton.module.scss";

const ToggleButtonPreview = ({ on, setOn }) => {
  return (
    <div
      className={Styles.toggleBtn}
      style={{
        backgroundColor: `#61FF00`,
        width: `229px`,
        height: `38px`,
      }}
    >
      <button
        onClick={() => setOn(!on)}
        className={clsx(on ? Styles.on : Styles.off)}
        type="button"
      >
        {!on ? "Mobile" : "Desktop"}
      </button>
    </div>
  );
};

export default ToggleButtonPreview;
