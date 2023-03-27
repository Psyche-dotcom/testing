import clsx from "clsx";
import { Field } from "formik";
import React, { useCallback, useState } from "react";
import Styles from "./SlidesToggleButton.module.scss";

const SlidesToggleButton: React.FC<{
  bgColor: string;
  height: number;
  width: number;
  firstInnerText?: string;
  secondInnertext?: string;
  firstTitle: string;
  secondTitle: string;
  name: string;
}> = ({
  bgColor,
  height,
  width,
  firstInnerText,
  secondInnertext,
  firstTitle,
  secondTitle,
  name,
}) => {
  return (
    <Field name={name}>
      {({ form, field }) => {
        const handlevalue = useCallback(() => {
          form.setFieldValue(name, !form.values[name]);
        }, [form.values[name]]);
        return (
          <div
            className={Styles.toggleBtn}
            style={{
              backgroundColor: `${bgColor}`,
              boxShadow: `inset 5px 5px 5px 6px ${bgColor}`,
              width: `${width}px`,
              height: `${height}px`,
            }}
            onClick={handlevalue}
          >
            {firstInnerText && (
              <span
                className={clsx(
                  Styles.toggleBtn__switchText,
                  form.values[name] ? Styles.active : Styles.deactive
                )}
                style={{ width: `${width / 3}px` }}
              >
                {form.values[name] ? firstInnerText : secondInnertext}
              </span>
            )}
            <button
              className={clsx(form.values[name] ? Styles.on : Styles.off)}
              type="button"
            >
              {form.values[name] ? firstTitle : secondTitle}
            </button>
          </div>
        );
      }}
    </Field>
  );
};

export default React.memo(SlidesToggleButton);

/* 
 <div
      className={Styles.toggleBtn}
      style={{
        backgroundColor: `${bgColor}`,
        boxShadow: `inset 5px 5px 5px 6px ${bgColor}`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => setOn(!on)}
    >
      {firstInnerText && (
        <span
          className={clsx(
            Styles.toggleBtn__switchText,
            on ? Styles.active : Styles.deactive
          )}
          style={{ width: `${width / 3}px` }}
        >
          {on ? firstInnerText : secondInnertext}
        </span>
      )}
      <button className={clsx(on ? Styles.on : Styles.off)}>
        {on ? firstTitle : secondTitle}
      </button>
    </div>
*/
