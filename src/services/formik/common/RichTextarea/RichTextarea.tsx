import React, { useState } from "react";
import { Field, useFormikContext } from "formik";
import Styles from "./RichTextarea.module.scss";

const RichTextarea = (props: any) => {
  const { placeholder, name, elementInput, icon, ...rest } = props;
  const [selectText, setSelectText] = useState("");

  const { setFieldValue, getFieldProps } = useFormikContext();

  const selecttionText = (e: any) => {
    const selection = e.target.value.substring(
      e.target.selectionStart,
      e.target.selectionEnd
    );
    if (selection) setSelectText(selection);
  };

  const handleStyle = (style: string) => {
    let desc = getFieldProps(name).value;
    const styleText = `<${style}>${selectText}</${style}>`;
    const finalDesc = desc.replace(selectText, styleText);
    setFieldValue(name, finalDesc);
  };

  const handleLink = (style: string) => {
    let href = prompt("Enter your Link");
    let desc = getFieldProps(name).value;
    const createLink = `<${style} href="${href}">${selectText}</${style}>`;
    const finalDesc = desc.replace(selectText, createLink);
    setFieldValue(name, finalDesc);
  };

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <textarea
              // style={{ backgroundColor: "white" }}
              rows={4}
              {...field}
              {...rest}
              placeholder={`${placeholder} `}
              onChange={(e) => {
                setFieldValue(name, e.target.value);
              }}
              className={Styles.textarea}
              onSelect={selecttionText}
            />
            <div className={Styles.moreInfoBtn}>
              <button
                type="button"
                className={Styles.moreInfoBtn__infoBtn}
                onClick={() => handleStyle("b")}
              >
                <span className={Styles.bold}>b</span>
              </button>
              <button
                type="button"
                className={Styles.moreInfoBtn__infoBtn}
                onClick={() => handleStyle("i")}
              >
                <span className={Styles.italic}>i</span>
              </button>
              <button
                type="button"
                className={Styles.moreInfoBtn__infoBtn}
                onClick={() => handleStyle("u")}
              >
                <span className={Styles.underline}>u</span>
              </button>
              <button
                type="button"
                className={Styles.moreInfoBtn__infoBtn}
                onClick={() => handleStyle("b")}
              >
                To Slide
              </button>
              <button
                type="button"
                className={Styles.moreInfoBtn__infoBtn}
                onClick={() => handleLink("a")}
              >
                Link
              </button>
            </div>
          </>
        );
      }}
    </Field>
  );
};

export default RichTextarea;
