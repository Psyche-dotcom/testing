import React from "react";
import Media from "./common/Media/Media";
import MediaImage from "./common/Media/MediaImage";
import RichTextarea from "./common/RichTextarea/RichTextarea";
import Textarea from "./common/Textarea/Textarea";
import ToggleShowHide from "./common/ToggleShowHide/ToggleShowHide";

import { Input } from "./index";
import { FormikControlPropsTypes } from "./Types/FormikTypes";
const FormikControl: React.FC<{
  control:
  | "input"
  | "textarea"
  | "rich_textarea"
  | "toggle_show_hide"
  | "media"
  | string;
  [x: string]: any;
}> = ({ control, image, classname, media, onMediaChange, ...rest }: any) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "rich_textarea":
      return <RichTextarea {...rest} />;
    case "toggle_show_hide":
      return <ToggleShowHide {...rest} />;
    case "media":
      return <Media onMediaChange={onMediaChange} media={media} {...rest} />;
    case "media-image":
      return <MediaImage classname={classname} onMediaChange image={image} {...rest} />;
    default:
      return null;
  }
};
export default FormikControl;
