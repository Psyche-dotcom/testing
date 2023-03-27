import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import QR, { QrCode } from "@sections/Sliders/HeroSlider/HelperComps/QR";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import clsx from "clsx";
import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import Styles from "./QrCodes.module.scss";

const QrCodes = () => {
  const [active, setActive] = useState("Slide");
  const data = [
    { id: 1, src: "/assets/calltoaction/slide.svg", title: "Slide" },
    { id: 2, src: "/assets/calltoaction/global-line.svg", title: "URL" },
  ];
  return (
    <FormikContainer>
      {(formik) => {
        return (
          <form>
            <div className={Styles.qrCodes}>
              <p className={Styles.qrCodes__titles}>Qr Codes</p>

              {/* Dynamic tags section */}
              <section className={Styles.dynamicTags}>
                <p className="group-title">Dynamic Tags</p>
                <div className={Styles.dynamicTags__container}>
                  <p className={Styles.dynamicTags__container__title}>
                    Target Slide
                  </p>
                  <div className={Styles.dynamicTags__container__btnContainer}>
                    <div
                      className={
                        Styles.dynamicTags__container__btnContainer__leftBtn
                      }
                    >
                      {data.map((item: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => setActive(item.title)}
                          className={clsx(
                            active.toLocaleLowerCase() ===
                              item.title.toLocaleLowerCase()
                              ? Styles.active
                              : Styles.deactive
                          )}
                        >
                          <img src={item.src} alt="Url Images" />
                          <span>{item.title}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <FActionsBtn
                        title="Save"
                        padding="4px 14px"
                        bgColor="green"
                        color="white"
                        actions={() => {}}
                      />
                    </div>
                  </div>

                  <div className={Styles.dynamicTags__container__selectFile}>
                    {active.toLocaleLowerCase() === "slide" ? (
                      <select>
                        <option>Slide 1</option>
                      </select>
                    ) : (
                      <FormikControl
                        name="qrcode"
                        control="input"
                        placeholder="URL"
                        type="url"
                        slideinput={true}
                      />
                    )}
                  </div>

                  <div
                    className={Styles.dynamicTags__container__qrImgContainer}
                  >
                    <QrCode />
                    <div
                      className={
                        Styles.dynamicTags__container__qrImgContainer__qrCodeBtn
                      }
                    >
                      <FActionsBtn
                        bgColor="#FF7A00"
                        padding="10px"
                        title="Copy URL"
                        color="white"
                        borderRadius="7px"
                        width="138px"
                        actions={() => {}}
                      />
                      <FActionsBtn
                        bgColor="#FF7A00"
                        padding="10px"
                        title="Download Qr Code"
                        color="white"
                        borderRadius="7px"
                        width="138px"
                        actions={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Slide Qr Codes Section */}
              <section className={Styles.slideQrTags}>
                <p className="group-title">Slide Qr Codes</p>
                <div className={Styles.slideQrTags__container}>
                  {[
                    {
                      id: 1,
                      title: "Slide 1",
                      desc: "Vreel",
                      link: "https://vreel.page/vreel/sZ9Ixgj",
                    },
                    {
                      id: 1,
                      title: "Slide 2",
                      desc: "The Vreel Box",
                      link: "https://vreel.page/vreel/Zjk9Ixgj",
                    },
                  ].map((item: any, index: number) => (
                    <div
                      key={index}
                      className={Styles.slideQrTags__container__slide}
                    >
                      <div
                        className={
                          Styles.slideQrTags__container__slide__content
                        }
                      >
                        <div>
                          <img
                            src="/assets/icons/qr.svg"
                            alt="Qr Code Images"
                          />
                        </div>
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                          <div style={{ marginBottom: "5px" }}>
                            <FActionsBtn
                              bgColor="#FF7A00"
                              padding="6px"
                              title="Copy URL"
                              color="white"
                              borderRadius="7px"
                              width="120px"
                              actions={() => {}}
                            />
                          </div>
                          <FActionsBtn
                            bgColor="#FF7A00"
                            padding="6px 3px"
                            title="Download Qr Code"
                            color="white"
                            borderRadius="7px"
                            width="120px"
                            actions={() => {}}
                          />
                        </div>
                      </div>

                      <span
                        className={Styles.slideQrTags__container__slide__link}
                      >
                        {item.link}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default QrCodes;
