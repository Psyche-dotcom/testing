import React, { useEffect, useRef, useState } from "react";
import Styles from "./AdvancedSlide.module.scss";
import FormikControl from "src/services/formik/FormikControl";
import { SlideLogo } from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import SubmitBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SubmitBtn";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Field, useFormikContext } from "formik";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import Switch from "@formik/common/Switch/Switch";
import useDebounce from "@hooks/useDebounce";
import { AudioSelector } from "@shared/InputForm/InputForm";

const AdvancedSlide: React.FC<{ formik: any }> = ({ formik }) => {
  const { values, setFieldValue, getFieldMeta } = useFormikContext();
  const backgroundAudio = getFieldMeta("advanced.background_audio_url").value;
  function setIconVisibility(name: string, value: "on" | "off") {
    const visible = value !== "on";
    console.log("setting::", name, "::", value)
    setFieldValue(name, visible);
  }
  return (
    <div>
      <div className={Styles.moreInfo}>
        <div className={Styles.timiningInfo}>
          <div className={Styles.slideTiming}>
            <div className={Styles.slideTiming__label}>Set Slide Timing</div>
            <div className={Styles.slideTiming__rotate}>Rotate in</div>
            <div className={Styles.slideTiming__input}>
              <FormikControl
                control="input"
                type="text"
                name="transition_duration"
                placeholder="15"
                slideinput={true}
              />
            </div>
            <div className={Styles.slideTiming__select}>
              <p>Seconds</p>
              {/* <select style={{ col }}>
              <option value={"seconds"}>seconds</option>
              <option value={"min"}>min</option>
              <option value={"hrs"}>hrs</option>
            </select> */}
            </div>
          </div>
          <p className={Styles.slideTiming__note}>
            Selected media will play on this slide for entire duration before
            rotating to the next slide
          </p>
          <div className={clsx(
            Styles.slideTiming,
            Styles.slideTiming__Expiration
          )}>
            <div className={Styles.slideTiming__label}>Slide Expiration</div>
            <div className={Styles.slideTiming__rotate}>Expires on</div>
            <div className={Styles.slideTiming__Expiration__input}>
              <FormikControl
                control="input"
                type="text"
                name="transition_expire_date"
                placeholder="Apr 22, 2023"
                slideinput={true}
              />
              <FormikControl
                control="input"
                type="text"
                name="transition_expire_time"
                placeholder="12:00 AM"
                slideinput={true}
              />
            </div>

          </div>
          <p className={Styles.slideTiming__note}>
            Slide will disappear from after date chosen
          </p>
        </div>
        <div className={Styles.moreInfo__backgroundAudio}>
          <p style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            Slide Background Audio
          </p>
          <Field as="select" name="advanced.background_audio_source">
            <option value={"audio"}>Source Audio File</option>
            <option value={"icecast"}>Icecast</option>
            <option value={"mp3"}>Mp3</option>
          </Field>
          {/* <select onChange={(e) => updateAdvanced({ background_audio_source: e.target.value })} value={advanced?.background_audio_source} className={Styles.select}>
                <option value={"audio"}>Source Audio File</option>
                <option value={"icecast"}>IceCast</option>
                <option value={"mp3"}>Mp3</option>
              </select> */}

          <AudioSelector
            placeholder="Slide Background Audio"
            setAudio={({ value }) => {
              setFieldValue("advanced.background_audio_url", value)
            }}
            value={backgroundAudio}
          />
          {/* <FormikControl
              name="advanced.background_audio_url"
              control="input"
              placeholder="URL"
              type="text"
              slideinput={true}
              advanced={true}
          /> */}
        </div>

        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <label>Slide Color Selector</label>
            <br /><br />
            <FormikControl
              control="input"
              type="color"
              name="TEXT"
              colorInput={true}
            /><br />
            <FormikControl
              control="input"
              type="color"
              name="BUTTON"
              colorInput={true}
            /><br />
            <FormikControl
              control="input"
              type="color"
              name="CTA TEXT"
              colorInput={true}
            />
            {/*<div>*/}
            {/*  <p>Switch For Dark Mode</p>*/}
            {/*  <div className={Styles.moreInfo__toggleBtn}>*/}
            {/*    <span>*/}
            {/*      <Switch*/}
            {/*        name="advanced.isDarkMode"*/}
            {/*        firstTitle={"Light"}*/}
            {/*        secondTitle={"Dark"}*/}
            {/*        firstInnerText={"Dark"}*/}
            {/*        secondInnertext={"Light"}*/}
            {/*      />*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <p>Dark mode for light media backgrounds, icons turn black</p>*/}
            {/*</div>*/}


            {/*<div>*/}
            {/*  <p style={{ paddingTop: "1rem" }}>Background Audio Credit</p>*/}
            {/*  <div style={{ padding: "0 21px" }}>*/}
            {/*    <FormikControl*/}
            {/*      name={`advanced.link_url`}*/}
            {/*      control="input"*/}
            {/*      placeholder="Username / Email"*/}
            {/*      type="email"*/}
            {/*      slideinput={true}*/}
            {/*      advanced={true}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <div className={Styles.moreInfo__flex__left__submit}>*/}
            {/*    <select className={Styles.select}>*/}
            {/*      <option value={"Creadit"}>Creadit</option>*/}
            {/*    </select>*/}
            {/*    <span style={{ marginLeft: "5px" }}>*/}
            {/*      <SubmitBtn />*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>


        </div>
        <div className={Styles.moreInfo__flex}>
          <label>Logo Visible</label>
          <div>
        <FormikControl
              name="logo_visible"
              control="toggle_show_hide"
            />
            </div>
        <SlideLogo />
          </div>
        {/* Toggle Hide Icons */}
        <div
          className={Styles.moreInfo__ShowHideButtonGroup}
        >
          <section style={{ display: "flex" }}>
            <label style={{ paddingTop: "0.5rem" }}>
              Contact
            </label>
            <FormikControl
              name="contact_visible"
              control="toggle_show_hide"
            />
          </section>
          <section style={{ display: "flex" }}>
            <label style={{ paddingTop: "0.5rem" }}>
              Share
            </label>
            <FormikControl
              name="share_visible"
              control="toggle_show_hide"
            />
          </section>
          <section style={{ display: "flex" }}>
            <label style={{ paddingTop: "0.5rem" }}>
              Qr Code
            </label>
            <FormikControl
              name="qrcode_visible"
              control="toggle_show_hide"
            />
          </section>
        </div>
        <div className={Styles.moreInfo__withBorder}>

          <p className={Styles.moreInfo__text}>More Info</p>
          <p className={Styles.slideTiming__note}>
            Describe more about your slide that you might not have had space to do
            & connect others to this slide with credits and collabs
          </p>
          <div className={Styles.moreInfo__richText}>
            <div className="mb-10">
              <FormikControl
                control="input"
                type="text"
                name="info.title"
                placeholder="Header"
                slideinput={true}
              />
            </div>
            <div>
              <FormikControl
                control="rich_textarea"
                type="text"
                name="info.description"
                placeholder="Info"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className={Styles.display__color}>
            <span className={Styles.fonttitle}>Element Display Color</span>

            <div className={Styles.inputWrapper}>
              <FormikControl
                control="input"
                type="color"
                name="background"
                colorInput={true}
              />
              <FormikControl
                control="input"
                type="color"
                name="font"
                colorInput={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSlide;
//  <label>Slide Elements</label><br /><br />
//           <section style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", alignItems: "center" }}>
//             <label style={{ width: "30%", fontSize: "12px" }}>
//               Contact Button
//             </label>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "45%", marginRight: "0px" }}>
//               <label htmlFor={"match_cta_contact_button"}>Match CTA Button</label>
//               <input type={"radio"} name={"match_cta_contact_button"} id={"match_cta_contact_button"} />
//             </div>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "20%" }}>
//               <label htmlFor={"contact_visible"}>Hide</label>
//               <input value={getFieldMeta<string>("contact_visible") ? "on" : false} onChange={e => setIconVisibility("contact_visible", e.target.value as any)} type={"radio"} name={"contact_visible"} id={"contact_visible"} />
//             </div>
//             {/*<FormikControl*/}
//             {/*    name="contact_visible"*/}
//             {/*    control="toggle_show_hide"*/}
//             {/*/>*/}

//           </section>
//           <section style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", alignItems: "center" }}>
//             <label style={{ width: "30%", fontSize: "12px" }}>
//               Share Button
//             </label>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "45%", marginRight: "0px" }}>
//               <label htmlFor={"match_cta_share_button"}>Match CTA Button</label>
//               <input type={"radio"} name={"match_cta_share_button"} id={"match_cta_share_button"} />
//             </div>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "20%" }}>
//               <label htmlFor={"share_visible"}>Hide</label>
//               <input type={"radio"} name={"share_visible"} id={"share_visible"} />
//             </div>
//             {/*<FormikControl*/}
//             {/*    name="share_visible"*/}
//             {/*    control="toggle_show_hide"*/}
//             {/*/>*/}

//           </section>
//           <section style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", alignItems: "center" }}>
//             <label style={{ width: "30%", fontSize: "12px" }}>
//               Logo
//             </label>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "20%" }}>
//               <label htmlFor={"logo_visible"}>Hide</label>
//               <input type={"radio"} name={"logo_visible"} id={"logo_visible"} />
//             </div>
//             {/*<FormikControl*/}
//             {/*    name="logo_visible"*/}
//             {/*    control="toggle_show_hide"*/}
//             {/*/>*/}
//           </section>
//           <section style={{ display: "flex", justifyContent: "space-between", justifyItems: "center", alignItems: "center" }}>
//             <label style={{ width: "30%", fontSize: "12px" }}>
//               Qr Code
//             </label>
//             <div className={Styles.moreInfo__ShowHideButtonGroup__inputGroup} style={{ width: "20%" }}>
//               <label htmlFor={"qrcode_visible"}>Hide</label>
//               <input onChange={(e) => alert(e.target.value)} type={"radio"} name={"qrcode_visible"} id={"qrcode_visible"} />
//             </div>
//             {/*<FormikControl*/}
//             {/*    name="qrcode_visible"*/}
//             {/*    control="toggle_show_hide"*/}
//             {/*/>*/}
//           </section>