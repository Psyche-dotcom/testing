import React, { useEffect, CSSProperties, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import {
  AiFillPlayCircle,
  AiFillPlaySquare,
  AiOutlineEye,
} from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./MediaImage.module.scss";

import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import clsx from "clsx";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Alert from "@shared/Alert/Alert";
const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;


const MediaImage = ({ name, image, classname }: any) => {
  const [play, setplay] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);
  const [renameItem] = useMutation(EIDT_SCHEMA);
  const { setFieldValue, setValues, values } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [isAlertActive, setAlertActive] = useState<boolean>(false);
  const [item, setItem] = useState(values[name]);
  const [displayUri, setDisplayUri] = useState(image);
  const [displayFileName, setDisplayFileName] = useState(image?.substring(image.lastIndexOf("/") + 1, image.length));

  function set_item(item: any) {

    setDisplayUri(item.uri)
    setDisplayFileName(item.file_name)

    if (!item) {
      setItem(null);
      setFieldValue(name, "");
    } else {
      setItem(item);
      setFieldValue(name, item.uri);
    }
  }

  return (
    <div className={
      clsx(
        Styles.mediaContainer
      )
    }>
      <Alert
        text={`Are you sure you want to remove the media for ${name}?`}
        noCallback={() => {
          setAlertActive(false);
        }}
        yesCallback={() => {
          setAlertActive(false);
          set_item(null);
        }}
        open={isAlertActive}
      />
      {open && (
        <MediaSelectorGallery
          open={open}
          setOpen={setOpen}
          setItem={set_item}
        />
      )}
      <div className={Styles.mediaContainer__leftItem}>
        <Field name={name}>
          {({ }) => {
            return (
              <div style={
                {
                  width: "100%",
                  display: `${classname == 'row' ? "flex" : "block"}`,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }
              }>
                <div
                  onClick={() => setOpen(true)}
                  style={{
                    width: `${classname == 'row' ? "120px" : "100%"}`,
                    height: "110px",
                  }}
                  className={
                    Styles.mediaContainer__leftItem__mediaContainer__imgContainer__logoContent
                  }
                >
                  <img
                    style={
                      {
                        "width": `${!displayUri ? "auto" : "100%"}`,
                        "height": `${!displayUri ? "67%" : "100%"}`,
                        "objectFit": "cover",
                        "objectPosition": "top center",
                        "borderRadius": "14px",
                        "padding": `${!displayUri ? "20px 10px 0px 10px" : "0"}`,
                      } as CSSProperties
                    }
                    // src="https://soft-commerce.vercel.app/assets/images/cosmetics/Amouage%20Perfume%20Eau%20de%20toilette%20Note%20Eau%20de%20Cologne.png"
                    src={displayUri || `/assets/icons/desktop.svg`}
                    alt={
                      name === "desktop" ? "Desktop Icons" : "Mobile Icons"
                    }
                  />
                  {!displayUri &&
                    <p style={{
                      color: "#FFFFFF",
                      fontSize: "10px",
                      display: "block",
                      textAlign: "center",
                      width: "76%",
                      padding: "0px 10px 5px"
                    }}>Select {`${name}`} File</p>
                  }
                </div>
                {(displayFileName && classname == 'row') &&
                  <div style={{ "width": "calc(100% - 130px)" }}>
                    <div className={Styles.mediaContainer__leftItem__mediaContainer__input}>
                      <h3>{`${name}`} Slide Selection</h3>
                      <div className={Styles.mediaContainer__leftItem__mediaContainer__input__container}>
                        <label>File Name</label>
                        <input value={displayFileName} />
                      </div>
                    </div>
                    <div className={Styles.mediaContainer__leftItem__mediaContainer__iconsContainer} style={{ width: "100%", marginTop: "15px" }}>
                      <div className={Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer} style={{ width: "100%", maxWidth: "80%" }}>
                        <button>
                          <img
                            src="/assets/delete-bin-2-line.svg"
                            alt="Icons delete"
                          />
                        </button>
                        <button>
                          <img
                            src="/assets/ball-pen-line.svg"
                            alt="Icons rename"
                          />
                        </button>
                        <button>
                          <AiOutlineEye className={Styles.viewIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                }
                {(displayUri && classname !== 'row') &&
                  <div className={Styles.mediaContainer__leftItem__mediaContainer__iconsContainer}>
                    <div className={Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer}>
                      <button className={Styles.btn_preview}>Preview</button>
                      <button className={Styles.btn_delete}>Delete</button>
                    </div>

                  </div>

                }
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default React.memo(MediaImage);

{
  /* <CommonFile
            type={getMediaMobileLink.file_type}
            isdesktop={false}
            name="mobile"
            remove={removeMediaMobilePreview}
          >
            
          </CommonFile> */
}
