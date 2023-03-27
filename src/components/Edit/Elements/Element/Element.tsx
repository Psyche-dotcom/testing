import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import { ElementsType } from "../ElementsData";
import Styles from "../Elements.module.scss";

import { RootState } from "@redux/store/store";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import { FormikContainer } from "@formik/FormikContainer";
import { useMutation } from "@apollo/client";
import { SET_SECTION_VISIBILITY } from "@graphql/mutations";
import { useCookies } from "react-cookie";
import useDidMountEffect from "@hooks/useDidMountEffect";

const Element: React.FC<{ element: ElementsType; handleDrag?: any }> = ({
  element,
  handleDrag,
}) => {
  const [height, setHeight] = useState<boolean>(false);
  const [setVisibility] = useMutation(SET_SECTION_VISIBILITY);
  const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
  const [sectionIsHidden, setSectionIsHidden] = useState<boolean>(
    element.hidden
  );
  const handleSetHeight = () => {
    setHeight(!height);
  };

  useDidMountEffect(() => {
    const payload = {
      token,
      hidden: sectionIsHidden,
      sectionId: element.id,
      sectionType: element.type,
    };

    setVisibility({
      variables: payload,
    }).then((response) => {});
    // .catch((err) => console.log(err))
  }, [sectionIsHidden]);

  const handleSubmit = async (values) => {};

  if (!element?.component) {
    return (
      <div className={Styles.elementWrapper}>
        <div className={Styles.element}>
          <div className={Styles.buttonWrapper}>
            <span
              {...handleDrag}
              style={{
                cursor: "pointer",
              }}
            >
              <img src="/assets/icons/drag.svg" alt="Drag & Drop Icon2" />
            </span>

            <FormikContainer
              initialValues={{
                show: !element.hidden,
              }}
            >
              {(formik) => {
                return (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(formik.values);
                    }}
                  >
                    <ToggleButton
                      name="hidden"
                      backgroundColor="white"
                      height="30"
                      activeTitle="Hide"
                      activeBackground="#61FF00"
                      activeIcon={<AiIcons.AiOutlineEye />}
                      deactiveTitle="Show"
                      deactiveBackground="#a3a1a1"
                      deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                    />
                  </form>
                );
              }}
            </FormikContainer>
          </div>

          <span className={Styles.element__title} onClick={handleSetHeight}>
            {element.title.slice(0, 18)}
          </span>
          <button onClick={handleSetHeight}>
            {height ? (
              <img
                src="/assets/icons/up-arrow-light.svg"
                alt="Icon Up arrow"
                className={Styles.collapseIcon}
              />
            ) : (
              <img
                src="/assets/icons/down-arrow-light.svg"
                alt="Icon Down arrow"
                className={Styles.collapseIcon}
              />
              // <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
              // <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
            )}
          </button>
        </div>

        <div
          style={{
            height: `${height ? "auto" : "0px"}`,
          }}
        >
          <div className={Styles.empty_component}>No Component</div>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.elementWrapper}>
      <div className={Styles.element}>
        <div className={Styles.buttonWrapper}>
          <span
            {...handleDrag}
            style={{
              cursor: "pointer",
            }}
          >
            <img src="/assets/icons/drag.svg" alt="Drag & Drop Icon" />
          </span>
          <FormikContainer
            initialValues={{
              hidden: element.hidden,
            }}
          >
            {({ values }) => {
              setSectionIsHidden(values.hidden);
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(values);
                  }}
                >
                  <ToggleButton
                    name="hidden"
                    backgroundColor="white"
                    height="30"
                    activeTitle="Hide"
                    activeBackground="#61FF00"
                    activeIcon={<AiIcons.AiOutlineEye />}
                    deactiveTitle="Show"
                    deactiveBackground="#a3a1a1"
                    deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                  />
                </form>
              );
            }}
          </FormikContainer>
        </div>
        {/* <div onClick={() => setShow(!show)}>
          {show ? <BtnShow /> : <BtnHide />}
        </div> */}
        <span className={Styles.element__title} onClick={handleSetHeight}>
          {element.title.slice(0, 18)}
        </span>
        <button onClick={handleSetHeight}>
          {height ? (
            <img
              src="/assets/icons/up-arrow-light.svg"
              alt="Icon Up arrow"
              className={Styles.collapseIcon}
            />
          ) : (
            <img
              src="/assets/icons/down-arrow-light.svg"
              alt="Icon Down arrow"
              className={Styles.collapseIcon}
            />
            // <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
            // <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
          )}
        </button>
      </div>

      <div
        style={{
          height: `${height ? "auto" : "0px"}`,
        }}
      >
        {height && <div>{element.component}</div>}
      </div>
    </div>
  );
};

export default Element;
