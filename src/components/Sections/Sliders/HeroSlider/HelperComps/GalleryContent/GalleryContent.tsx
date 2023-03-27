import clsx from "clsx";
import { useRouter } from "next/router";
import React, { CSSProperties, useEffect, useState } from "react";
import Styles from "./GalleryContent.module.scss";

const GalleryContent = ({
  setPlaying,
  playing,
  isImage,
  setMute,
  mute,
  item,
  slide,
  isImageGallery = true,
}) => {
  const router = useRouter();
  const { cta1, cta2, desktop, mobile } = slide;
  const [text, setText] = useState(0);


  useEffect(() => {
    if (cta1 || cta2) {
      if (cta1?.link_header.length > 10 || cta2?.link_header.length > 10) {
        setText(13);
      } else {
        setText(10);
      }
    }
  }, [text]);
  return (
    <div className={Styles.media__content}>
      <div className={Styles.media__content_wrapper}>
        {/* LEFT SIDEBAR */}
        <div
          id={Styles.sideWidth}
          className={Styles.media__content_wrapper__left}
        >
          <div></div>
          <div className={Styles.media__content_wrapper__left__bottom}>
            {!isImage ? (
              <button
                onClick={() => {
                  setPlaying(!playing);
                }}
                className={
                  Styles.media__content_wrapper__left__bottom__pauseBtn
                }
              >
                {playing ? (
                  <img src="/assets/icons/pause.svg" alt="Pause Icons" />
                ) : (
                  <div
                    className={
                      Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                    }
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src="/assets/icons/play.svg"
                      alt="Play Icons"
                    />
                  </div>
                )}
              </button>
            ) : (
              <button>
                <div
                  className={
                    Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                  }
                ></div>
              </button>
            )}
            {(item.background_audio_uri || !isImage) && (
              <button
                onClick={() => {
                  setMute(!mute);
                  // if (!playing) {
                  //   setPlaying(true);
                  // }
                }}
                style={{ marginTop: "1rem" }}
                className={Styles.media__content_wrapper__left__bottom__muteBtn}
              >
                <img
                  src={`/assets/${mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                    }`}
                  alt="Mute Icon"
                />
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={Styles.media__content_wrapper__middle}
          id={Styles.middle}
        >
          <div className={Styles.media__content_wrapper__middle__container}>
            <h3>{isImageGallery ? slide.image_header : slide.video_header}</h3>
            <p>{slide.description}</p>

            {(cta1?.link_header || cta2?.link_header) && (
              <div>
                {
                  <div
                    className={Styles.button_container}
                    style={
                      {
                        "--direction": `${text > 10 ? "column" : "row"}`,
                        "--marginBottom": `${text > 10 ? ".5" : "0"}rem`,
                        "--marginRight": `${text > 10 ? "0" : "1"}rem`,
                      } as CSSProperties
                    }
                  >
                    {cta1?.link_header && (
                      <button
                        className="btn-slide"
                        onClick={() => {
                          switch (cta1?.link_type) {
                            // case "URL":
                            case "url":
                            case "URL":
                            case "":
                              if (cta1.link_url.startsWith("https://"))
                                window.open(cta1?.link_url, "_blank");
                              else router.push(cta1?.link_url);

                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        {cta1?.link_header}
                      </button>
                    )}

                    {cta2.link_header && (
                      <button
                        className="btn-slide"
                        onClick={() => {
                          switch (cta2.link_type) {
                            // case "URL":
                            case "url":
                            case "URL":
                            case "":
                              if (cta2.link_url.startsWith("https://"))
                                window.open(cta2?.link_url, "_blank");
                              else router.push(cta2?.link_url);
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        {cta2.link_header}
                      </button>
                    )}
                  </div>
                }
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div
          id={Styles.sideWidth}
          className={Styles.media__content_wrapper__right}
        ></div>
      </div>
    </div>
  );
};

export default GalleryContent;
