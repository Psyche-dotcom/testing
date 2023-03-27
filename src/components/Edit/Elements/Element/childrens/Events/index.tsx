import { useState } from "react";
import clsx from "clsx";
import Styles from "../Children.module.scss";

import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import ChildInput from "@shared/Inputs/ChildInput";

const Events: React.FC = () => {
  const [activeList, setActiveList] = useState<boolean>(true);

  return (
    <div className={Styles.children}>
      <ChildInput placeholder="Element Header" type="text" />

      <div
        className={Styles.toggleButton}
        onClick={() => setActiveList((prev) => !prev)}
      >
        <button
          className={clsx(Styles.button, !activeList && Styles.button__active)}
        >
          Calendar View
        </button>
        <button
          className={clsx(Styles.button, activeList && Styles.button__active)}
        >
          List View
        </button>
      </div>

      <span className={Styles.toggleTitle}>Toggle To Calendar Mode</span>

      <AddTitleButton handler={() => {}} title="Add Event" />
    </div>
  );
};

export default Events;
