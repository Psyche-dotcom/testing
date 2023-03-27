import useWindowDimensions from "@hooks/useWindowDimensions";
import MainContainer from "@sections/MainContainer/MainContainer";
import clsx from "clsx";
import React, { CSSProperties } from "react";
import {
  Audio,
  BallTriangle,
  Circles,
  Oval,
  Rings,
  TailSpin,
  ThreeDots,
} from "react-loader-spinner";
import Styles from "./Loader.module.scss";

export const Loader = () => {
  const { height } = useWindowDimensions();
  return (
    <div
      className={Styles.loaderContainer}
      style={
        {
          "--height": `${height * 0.01}px`,
        } as CSSProperties
      }
    >
      <Circles color="#ff7a00" />
    </div>
  );
};
