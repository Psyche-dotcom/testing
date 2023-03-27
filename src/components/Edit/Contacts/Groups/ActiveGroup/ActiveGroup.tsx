import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import React, { useRef, useState } from "react";
import Styles from "./ActiveGroup.module.scss";
import * as AiIcons from "react-icons/ai";
import CommonButton from "@shared/Buttons/ContactsButton/CommonButton/CommonButton";
import FormikControl from "@formik/FormikControl";

type Props = {};

const ActiveGroup = (props: Props) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const handleHeight = () => {
    if (height === 0) setHeight(ref.current.offsetHeight);
    else {
      setHeight(0);
    }
  };

  const velues = height ? true : false;
  return (
    <div className={Styles.content}>
      <div className={Styles.content__topPart}>
        <p className={Styles.content__topPart__title}>Groups 1</p>
        <div>
          <ToggleButton
            name="show"
            backgroundColor="white"
            height="25"
            activeTitle="Hide"
            activeBackground="#61FF00"
            activeIcon={<AiIcons.AiOutlineEye style={{ color: "black" }} />}
            deactiveTitle="Show"
            deactiveBackground="#a3a1a1"
            deactiveIcon={
              <AiIcons.AiOutlineEyeInvisible style={{ color: "black" }} />
            }
            color="black"
          />
        </div>
        <button type="button" onClick={handleHeight}>
          <img
            src={`/assets/icons/${height ? "up" : "down"}-arrow-light.svg`}
            alt="Down arrow icons"
          />
        </button>
      </div>
      <p className={Styles.content__rank}>Platinum group</p>
      {!velues && (
        <div className={Styles.lastPart}>
          <p>Published: 05/22/2022</p>
          <p>Last Edited: 05/24/2022</p>
        </div>
      )}

      {/* -----------------------Collapse part------------------------ */}
      <div
        style={{ height: `${height}px` }}
        className={Styles.content__hiddenPart}
      >
        <div ref={ref} className={Styles.content__hiddenPart__body}>
          <div className={Styles.content__hiddenPart__body__wrapper}>
            <p>Members</p>
            <CommonButton
              title="Add Member"
              src1="/assets/icons/plus-icon.svg"
              alt1="Plus icons"
              src2="/assets/icons/add.svg"
              alt2="Add icons"
            />
            <div
              className={
                Styles.content__hiddenPart__body__wrapper__inputContent
              }
            >
              {[1, 2, 3].map(() => (
                <FormikControl
                  control="input"
                  type="text"
                  name={"contacts.username"}
                  placeholder="Username"
                  contacts={{
                    logo1: "/assets/icons/user.svg",
                    logo2: "/assets/icons/delete-bin-line.svg",
                  }}
                  required
                />
              ))}
            </div>
            <div
              className={Styles.content__hiddenPart__body__wrapper__subGroup}
            >
              <CommonButton
                title="Create Subgroup"
                src2="/assets/icons/subGroup.svg"
                alt2="Sub Group icons"
              />
            </div>

            <div
              className={
                Styles.content__hiddenPart__body__wrapper__diamontSubGroup
              }
            >
              <p>Diamond Sub - Group</p>
              <button type="button">
                <img
                  src="/assets/icons/down-arrow-light.svg"
                  alt="Down Arrows"
                />
              </button>
            </div>

            <div className={Styles.content__hiddenPart__body__wrapper__bottom}>
              <div className={Styles.lastPart}>
                <p style={{ paddingTop: "0px" }}>Published: 05/22/2022</p>
                <p style={{ paddingTop: "0px" }}>Last Edited: 05/24/2022</p>
              </div>
              <button type="button" onClick={handleHeight}>
                <img
                  src="/assets/icons/up-arrow-light.svg"
                  alt="up Arrow Icons"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveGroup;
