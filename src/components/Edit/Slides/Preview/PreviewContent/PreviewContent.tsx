import React, {useState} from "react";
import Styles from "../PreviewSliders/PreviewSlider.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const PreviewContent: React.FC<{
  item: any;
  mute: boolean;
  setMute: Function;
  isImage: boolean;
  playing: boolean;
  setPlaying: Function;
}> = ({ mute, setMute, isImage, item, playing, setPlaying }) => {
  const router = useRouter();
  const { advanced, cta1, cta2, title } = item;
  const [ctaButtonPosition, setCtaButtonPosition] = useState("side");

  return (
    <div className={Styles.media__content}>
      <div className={Styles.media__content_wrapper}>
        {/* logo */}
        <div className={Styles.media__content_wrapper__vreelLogo}>
          <img
            src={
              advanced?.logoUrl
                ? advanced?.logoUrl
                : "/assets/icons/Vreel_logo_small.svg"
            }
            alt="Brand Logo"
          />
        </div>
        {/* LEFT SIDEBAR */}
        <div className={Styles.media__content_wrapper__left}>
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
        <div className={Styles.media__content_wrapper__middle}>
          <div className={Styles.media__content_wrapper__middle__container}>
            <h3>{title?.header ? title.header : "VREEL™"}</h3>
            <p>
              {title?.description
                ? title.description
                : "We make you look better! Our Web3 interface curates and displays your story amazingly."}
            </p>
            {((cta1?.link_header || cta2?.link_header) && ctaButtonPosition === "center") && (
              <div>
                {
                  <div className={Styles.button_container}>
                    {cta1?.link_header && (
                      <button
                        style={{
                          width: "max-content",
                          backgroundColor: "white",
                          padding: "10px 20px",
                          fontWeight: "bold",
                          borderRadius: " 0.375rem",
                          fontSize: "0.875rem",
                          marginRight: "10px",
                        }}
                        onClick={() => {

                          switch (cta1?.link_type) {
                            // case "URL":
                            case "":
                              if (cta1.link_url.includes("https://www"))
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

                    {cta2?.link_header && (
                      <button
                        style={{
                          width: "max-content",
                          backgroundColor: "white",
                          padding: "10px 20px",
                          fontWeight: "bold",
                          borderRadius: " 0.375rem",
                          fontSize: "0.875rem",
                        }}
                        onClick={() => {

                          switch (cta2.link_type) {
                            // case "URL":
                            case "":
                              if (cta2.link_url.includes("https://www"))
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
            {(!cta1?.link_header || !cta1?.link_header) && (
              <div>
                <button
                  style={{
                    width: "max-content",
                    backgroundColor: "white",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    borderRadius: " 0.375rem",
                    fontSize: "0.875rem",
                    marginRight: "10px",
                  }}
                  onClick={() => router.push("/login")}
                >
                  Log in
                </button>

                <button
                  style={{
                    width: "max-content",
                    backgroundColor: "white",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    borderRadius: " 0.375rem",
                    fontSize: "0.875rem",
                  }}
                  onClick={() => router.push("/register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={Styles.media__content_wrapper__right}>
          <div className={Styles.media__content_wrapper__right__topContainer}>
            <button>
              <img src="/assets/icons/menu.svg" alt="Menu Icons" />
            </button>
            {/*  {<button
              onClick={() => {
                if (!following) {
                  follow({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      toast.success("Following succeeded!");
                      setfollowing(true);
                    })
                    .catch((err) => {});
                } else {
                  unfollow({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      toast.success("Unfollow succeeded!");
                      setfollowing(false);
                    })
                    .catch((err) => {});
                }
              }}
            >
              
              {following ? (
                <img src="/assets/following.svg" alt="Following Icon" />
              ) : (
                <img src="/assets/icons/icon-follow.svg" alt="Follow Icon" />
              )}
            </button>} */}
            {((cta1?.link_header || cta2?.link_header) && ctaButtonPosition != "center") && (
                <div>
                  {
                    <div className={Styles.button_container}>
                      {cta1?.link_header && (
                          <button
                              style={{
                                width: "max-content",
                                backgroundColor: "white",
                                padding: "10px 20px",
                                fontWeight: "bold",
                                borderRadius: " 0.375rem",
                                fontSize: "0.875rem",
                                marginRight: "10px",
                              }}
                              onClick={() => {

                                switch (cta1?.link_type) {
                                    // case "URL":
                                  case "":
                                    if (cta1.link_url.includes("https://www"))
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

                      {cta2?.link_header && (
                          <button
                              style={{
                                width: "max-content",
                                backgroundColor: "white",
                                padding: "10px 20px",
                                fontWeight: "bold",
                                borderRadius: " 0.375rem",
                                fontSize: "0.875rem",
                              }}
                              onClick={() => {

                                switch (cta2.link_type) {
                                    // case "URL":
                                  case "":
                                    if (cta2.link_url.includes("https://www"))
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
            <button
              onClick={async () => {
                // const res = await fetch("/api/vcard").then((res) =>
                //   res.json()
                // );
                // console.log({ res });
              }}
            >
              {/* &&interprise=&&employeeid= */}
              <a href="">
                <img src="/assets/icons/vcard_small.svg" alt="V-Card Icon" />
              </a>
            </button>
          </div>

          <div>
            {/*  <button onClick={() => dispatch(expandInfo())}>
          <img src="/assets/icons/icon-info.svg" alt="Info Icon" />
        </button> */}
            {/* <button
              onClick={() => {
                if (!like) {
                  like_fun({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      // toast.success("Following succeeded!");
                      setlike(true);
                    })
                    .catch((err) => {});
                } else {
                  unlike_fun({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      
                      setlike(false);
                    })
                    .catch((err) => {});
                }
              }}
            >
              <img
                src={`/assets/icons/heart-${like ? "fill" : "empty"}.svg`}
                alt="like Icon"
              />
            </button> */}
            <button>
              <img src="/assets/icons/share-plan.svg" alt="Share Icon" />
            </button>
            <button>
              <img src="/assets/icons/icons-qr-code.svg" alt="QR Icon" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={Styles.media__content__bottomSheet}
      // onClick={() => {
      //   parentSwiper.slideNext();
      // }}
      >
        <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
      </div>
    </div>
  );
};

export default PreviewContent;
