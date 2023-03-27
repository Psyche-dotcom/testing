import React, { CSSProperties, ReactNode } from "react";
import Styles from "./MainContainer.module.scss";
import useWindowDimensions from "@hooks/useWindowDimensions";

const MainContainer: React.FC<{ children: ReactNode, backgroundColor?: string }> = ({ children, backgroundColor }) => {
  const { height } = useWindowDimensions();
  return (
    <div
      className={Styles.mainContainer}
      style={
        {
          "--height": `${height * 0.01}px`,
          backgroundColor
        } as CSSProperties
      }
    >
      <div className={Styles.mainContainer__content}>{children}</div>
    </div>
  );
};

export default React.memo(MainContainer);
