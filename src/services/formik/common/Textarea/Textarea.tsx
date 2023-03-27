import React from "react";
import { Field } from "formik";
import Styles from "./Textarea.module.scss";

import ElementInput from "../ElementInput/ElementInput";

const Textarea = (props: any) => {
  const { placeholder, name, elementInput, personalInfo, icon, ...rest } =
    props;

  return (
    <div className={""}>
      <Field name={name}>
        {({ field, form }) => {
          if (elementInput) {
            return (
              <ElementInput
                type="textarea"
                placeholder={placeholder}
                field={field}
                rest={rest}
                icon={icon}
              />
            );
          }

          return (
            <div>
              <textarea
                rows={4}
                // style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={Styles.textarea}
                style={{ padding: `${personalInfo && "11px 15px"}` }}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Textarea;
