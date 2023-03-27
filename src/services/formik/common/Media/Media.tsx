import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import {
  AiFillPlayCircle,
  AiFillPlaySquare,
  AiOutlineEye,
} from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./Media.module.scss";

import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import clsx from "clsx";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Alert from "@shared/Alert/Alert";
import HLSVideoPlayer from "@shared/Video";
const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const Media = ({ name, media, onMediaChange, uriExt = "uri", }) => {
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
  const [displayData, setDisplayData] = useState(media);


  function set_item(item: any) {
    if (!item) {
      setDisplayData({ uri: "", content_type: "" });
      onMediaChange(item)
      return
    }
    setDisplayData({ uri: item?.uri || "", content_type: item.file_type })
    onMediaChange(item)

    if (!item) {
      setItem(null);
      values[name][uriExt] = ``;
      values[name]["content_type"] = ``;
    } else {
      setItem(item);
      // values[name][uriExt] = `${item.uri}`;
      // values[name]["content_type"] = item.file_type;
    }
  }

  return (
    <div className={Styles.mediaContainer}>
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
        <Field name={`${name}.${uriExt}`}>
          {({ }) => {
            return (
              <>
                <div
                  className={Styles.mediaContainer__leftItem__mediaContainer}
                >
                  <div
                    className={
                      Styles.mediaContainer__leftItem__mediaContainer__imgContainer
                    }
                  >
                    {displayData?.uri !== "" &&
                      displayData?.uri != "/waterfall.mp4" ? (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__imgContent
                        }
                      >
                        {displayData?.content_type?.includes("video") ? (
                          <HLSVideoPlayer src={displayData?.uri} />
                        ) : (
                          <img src={displayData?.uri || `/assets/icons/desktop.svg`} alt="Select Images" />
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__logoContent
                        }
                      >
                        <img
                          src={`/assets/icons/${name === "desktop" ? "desktop" : "mobile"
                            }.svg`}
                          alt={
                            name === "desktop"
                              ? "Desktop Icons"
                              : "Mobile Icons"
                          }
                        />
                        <p>Select {`${name}`} File</p>
                      </div>
                    )}
                    <div style={{ margin: "10px 10px 0 10px" }}>
                      {/* <span>{values[name]["content_type"]}</span> */}
                      {values[name]["content_type"] == "video/mp4" && (
                        <span
                          onClick={() => {
                            // if (play) {
                            //   videoRef.current.pause();
                            //   // setplay(false);
                            // } else {
                            //   videoRef.current.play();
                            //   // setplay(true);
                            // }
                          }}
                        >
                          {play ? <FiPause /> : <FiPlay />}
                        </span>
                      )}
                    </div>
                  </div>
                  {values[name][uriExt] &&
                    values[name][uriExt] != "/waterfall.mp4" && (
                      <div
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__iconsContainer
                        }
                      >
                        <div
                          className={clsx(
                            Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__title
                          )}
                        >
                          <p style={{ fontWeight: "bold" }}>{`${name}`} Selection</p>
                        </div>
                        <div>
                          <div
                            className={clsx(
                              Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__inputContainer,
                              Styles.inputActive
                            )}
                          >
                            {values[name]["content_type"] != "video/mp4" && (
                              <Field name={`${name}.background_audio_uri`}>
                                {({ form, field }) => {
                                  return (
                                    <>
                                      <label>Backgrouhd audio</label>
                                      <input
                                        onChange={(e) => {
                                          form.setFieldValue(
                                            `${name}.background_audio_uri`,
                                            e.target.value
                                          );
                                        }}
                                        // disabled={!active}
                                        defaultValue={
                                          item?.background_audio_uri
                                            ? item?.background_audio_uri
                                            : ""
                                        }
                                        type="text"
                                      />
                                    </>
                                  );
                                }}
                              </Field>
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer
                          }
                        >
                          <button
                            type="button"
                            onClick={() => {


                              setAlertActive(true);
                            }}
                          >
                            <img
                              src="/assets/delete-bin-2-line.svg"
                              alt="Icons delete"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpen(true);
                              // setActive(!active);
                              return;


                              if (active) {
                                renameItem({
                                  variables: {
                                    token: cookies["userAuthToken"],
                                    newName: inputRef?.current?.value,
                                    fileId: item.id,
                                  },
                                })
                                  .then((res) => {
                                    if (res?.data?.editFileName.succeeded) {
                                      toast.success(`File Rename Successfully`);
                                    }
                                  })
                                  .catch((error) => {
                                    toast.error(error.message);
                                  });
                                setActive(false);
                              }
                            }}
                          >
                            <img
                              src="/assets/ball-pen-line.svg"
                              alt="Icons rename"
                            />
                          </button>
                          <button type="button">
                            <a
                              href={values[name][uriExt]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineEye className={Styles.viewIcon} />
                            </a>
                          </button>
                        </div>
                      </div>
                    )}
                  {!values[name][uriExt] &&
                    <div
                      className={
                        Styles.mediaContainer__leftItem__mediaContainer__iconsContainer
                      }
                    >
                      <div
                        className={clsx(
                          Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__title
                        )}
                      >
                        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{`${name}`} Selection</p>
                        <p style={{ marginBottom: "8px", lineHeight: "1.3", fontSize: "10px" }}>Choose a file to dynamically display on all {`${name == 'mobile' ? "mobile devices" : "wide screen monitors"}`}</p>
                      </div>
                    </div>
                  }
                </div>
              </>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default React.memo(Media);

{
  /* <CommonFile
            type={getMediaMobileLink.file_type}
            isdesktop={false}
            name="mobile"
            remove={removeMediaMobilePreview}
          >
            
          </CommonFile> */
}
