import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { title } from "process";
import { BsPlusCircle, BsX } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getCounter, RENDER_COUNTER } from "../globalCounter";
import * as AiIcons from "react-icons/ai";
import {
  addCollupse,
  removeCollupse,
} from "src/redux/createSlice/createCollapseSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";

import Styles from "./Collapse.module.scss";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import { setActiveIndex } from "@redux/createSlice/previewSlice";

const Collapse = ({ title, level, index, children }: any) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={clsx(
        Styles.innerSlideContainer,
        active ? Styles.deActiveHeight : Styles.slideContainer
      )}
    >
      <div className={Styles.collapse}>
        <div className={Styles.collapse__button}>
          <span>{title}</span>
          <span
            onClick={() => {
              setActive(!active);
            }}
          >
            {!active ? (
              <img
                src="/assets/icons/down-arrow-light.svg"
                alt="Down Arrow Icon"
              />
            ) : (
              <img
                src="/assets/icons/up-arrow-light.svg"
                alt="Up Arrow Icon"
                className={Styles.collapseIcon}
              />
            )}
          </span>
        </div>

        <div className={Styles.collapse__text}>
          <span></span>
          <span>Think Circular</span>
          <button>
            <img src="/assets/icons/dots.svg" alt="Dots" />
          </button>
        </div>
      </div>
      <div
        style={{
          height: "auto",
        }}
        className={Styles.slide}
      >
        {children}
        <div
          className={Styles.slideBody__upArrows}
          onClick={() => {
            setActive(false);
          }}
        >
          <img src="/assets/icons/up-arrow-light.svg" alt="Up Arrow" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Collapse);
