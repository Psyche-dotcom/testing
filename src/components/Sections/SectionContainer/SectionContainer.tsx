import React, { CSSProperties, ReactNode, useLayoutEffect } from "react";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import { useAppDispatch } from "src/redux/store/store";
import Styles from "./SectionContainer.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import clsx from "clsx";

const SectionContainer: React.FC<{
  children: ReactNode;
  title: string;
  parentSwiper?: any;
  displayOptions: any;
}> = ({ children, title, parentSwiper, displayOptions }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.sectionContainer}>
      <div className={Styles.sectionContainer__buttonTopContainer}>
        <h2 style={{ fontFamily: "headerFont" }}>{title}</h2>
        <div onClick={() => dispatch(expandMenu())}>
          <HiOutlineMenu
            className={Styles.sectionContainer__buttonTopContainer__menu}
          />
        </div>
      </div>
      <div
        className={Styles.sectionContainer__childrenContainer}
        style={
          {
            "--pheight": `${
              parentSwiper?.activeIndex !==
              parseInt(parentSwiper?.slides?.length) - 1
                ? 40
                : 0
            }px`,
          } as CSSProperties
        }
      >
        {children}
      </div>

      {parentSwiper?.activeIndex !== parseInt(parentSwiper?.slides?.length) &&
        parseInt(parentSwiper?.slides?.length) > 1 && (
          <div
            className={clsx(
              Styles.sectionContainer__buttonBottomContainer,
              parentSwiper?.activeIndex <
                parseInt(parentSwiper?.slides?.length) - 1 &&
                Styles.sectionContainer__buttonBottomContainer__down
            )}
            // onClick={() =>  parentSwiper?.activeIndex <  parseInt(parentSwiper?.slides?.length) - 1  ? parentSwiper.slideNext() : parentSwiper.slideTo(0)}
            style={
              {
                "--height": `${
                  parentSwiper?.activeIndex !==
                  parseInt(parentSwiper?.slides?.length)
                    ? 20
                    : 0
                }px`,
              } as CSSProperties
            }
          >
            {/*<img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />*/}
            <div className={Styles.arrow_container}>
              {/*<div className={Styles.arrow_down}></div>*/}
              <img
                src="/assets/icons/carrot-down.png"
                alt="Carrot Down images"
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default SectionContainer;
