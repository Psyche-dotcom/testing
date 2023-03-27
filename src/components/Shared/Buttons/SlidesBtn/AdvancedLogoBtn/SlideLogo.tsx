import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormikControl from "@formik/FormikControl";
import {
  isDesktopShow,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "@redux/createSlice/createMobileMediaSelector";

import { RootState, useAppDispatch } from "@redux/store/store";
import Styles from "./LogoBtn.module.scss";
import MediaSelectorGallery from "@formik/common/Media/MediaSelectorGridItem/MediaSelectorGallery";
import { useFormikContext } from "formik";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import SlidesToggleButton from "../SlidesToggleButton/SlidesToggleButton";
import Switch from "@formik/common/Switch/Switch";
import ToggleShowHide from "@formik/common/ToggleShowHide/ToggleShowHide";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

const LogoBtn = ({ formik }) => {
  const [open, setOpen] = useState(false);

  const [item, setitem] = useState(formik?.values["advanced"]);

  function setItem(item: any) {
    if (!item) {
      setitem(null);
      formik.values["advanced"]["logoUrl"] = ``;
    } else {
      setitem(item);
      // values['advanced']['logoUrl']
      formik.values["advanced"]["logoUrl"] = `${item.uri}`;
      // values[name]["content_type"] = item.file_type;
    }
  }
  return (
    <div className={Styles.BtnContainer}>
      {open && (
        <MediaSelectorGallery open={open} setOpen={setOpen} setItem={setItem} />
      )}
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={Styles.BtnContainer__imgContainer}
      >
        {!formik?.values?.advanced?.logoUrl ? (
          <img src="/assets/icons/mobile.svg" alt="" />
        ) : (
          <img src={formik?.values?.advanced?.logoUrl} alt="Logo Images" />
        )}
      </div>
      <button
        type="button"
        className={Styles.BtnContainer__addLogo}
        onClick={() => {
          setOpen(true);
        }}
      >
        <span>
          {formik?.values?.advanced?.logoUrl ? "Change Logo" : "Add Logo"}
        </span>
        <img
          className={Styles.img}
          src="/assets/icons/addLogo.svg"
          alt="Add Logo Images"
        />
      </button>
      <div className={Styles.action}>
        <h4>Logo visiblity</h4>
        {/* <Switch
          bgColor="green"
          width={90}
          height={25}
          firstTitle="Hide"
          secondTitle="Show"
          firstInnerText="Show"
          secondInnertext="Hide"
          name="media_sound"
        /> */}
      </div>
    </div>
  );
};

export default LogoBtn;

export function SlideLogo() {
  const [open, setOpen] = useState(false);
  const { values, setFieldValue } = useFormikContext<any>();

  const [item, setitem] = useState(values["advanced"]);

  function setItem(item: any) {
    if (!item) {
      setitem(null);
      values["advanced"]["logoUrl"] = ``;
    } else {
      setitem(item);
      // values['advanced']['logoUrl']
      // values?.advanced?.logoUrl = `${item.uri}`;
      // values[name]["content_type"] = item.file_type;
      setFieldValue("advanced.logoUrl", item.uri);
    }
  }

  function handleRemoveLogo() {
    setItem({ uri: '' });
    setFieldValue("advanced.logoUrl", "");

  }

  return (
    <div className={Styles.BtnContainer}>
      {open && (
        <MediaSelectorGallery open={open} setOpen={setOpen} setItem={setItem} />
      )}
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={Styles.BtnContainer__imgContainer}
      >
        {!values?.advanced?.logoUrl ? (
          <img
            src="/assets/icons/mobile.svg"
            alt=""
            style={{ objectFit: "contain" }}
          />
        ) : (
          <img src={values?.advanced?.logoUrl} alt="Logo Images" />
        )}
      </div>
      <button
        type="button"
        className={Styles.BtnContainer__addLogo}
        onClick={() => {
          setOpen(true);
        }}
      >
        <span>{values?.advanced?.logoUrl ? "Change Logo" : "Add Logo"}</span>
        <img
          className={Styles.img}
          src="/assets/icons/addLogo.svg"
          alt="Add Logo Images"
        />
      </button>
      <button style={{ padding: "0.5rem", backgroundColor: "white" }} onClick={handleRemoveLogo}>Remove Logo</button>
      {/*<div className={Styles.action}>*/}
      {/*  <h4>Hide Slide Logo</h4>*/}
      {/*  /!* <ToggleShowHide name="show" color="black" /> *!/*/}
      {/*  <ToggleButton*/}
      {/*    name="logo_visible"*/}
      {/*    backgroundColor="white"*/}
      {/*    height="23"*/}
      {/*    activeTitle="Hide"*/}
      {/*    activeBackground="#61FF00"*/}
      {/*    activeIcon={<AiOutlineEye />}*/}
      {/*    deactiveTitle="Show"*/}
      {/*    deactiveBackground="#a3a1a1"*/}
      {/*    deactiveIcon={<AiOutlineEyeInvisible />}*/}
      {/*    color="black"*/}
      {/*  />*/}
      {/*  /!* <FormikControl control="toggle_show_hide" name="logo_visible" /> *!/*/}
      {/*  <p>*/}
      {/*    Toggle to turn on/off the visibility of all logo selections for this*/}
      {/*    slide{" "}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  );
}
