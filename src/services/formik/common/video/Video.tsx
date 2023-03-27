import { Field } from "formik";
import React from "react";
import ReactPlayer from "react-player";

const Video = (props: any) => {
  const { name, placeholder, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <ReactPlayer
            url={form.values[name]}
            playing={true}
            controls={true}
            muted={false}
            width="100%"
            height="100%"
            {...rest}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default Video;
