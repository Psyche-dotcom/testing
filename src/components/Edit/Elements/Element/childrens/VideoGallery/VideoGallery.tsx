import FileInput from "@edit/Files/FileInput/FileInput";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import clsx from "clsx";
import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Styles from "../Children.module.scss";

interface ItemProps {
  id: number;
  title: string;
  url?: string;
}

const options: Array<ItemProps> = [
  { id: 1, title: "url", url: "/assets/calltoaction/global-line.svg" },
  { id: 2, title: "slide", url: "/assets/calltoaction/slide.svg" },
  { id: 3, title: "element", url: "/assets/calltoaction/stack-line.svg" },
];

const VideoGallery = () => {
  const handleSubmit = async (values) => {
  };
  const [activeButtonLeft, setActiveButtonLeft] = useState<{
    index: number;
    title: string;
  }>({ index: 0, title: "" });
  const [activeButtonRight, setActiveButtonRight] = useState<{
    index: number;
    title: string;
  }>({ index: 0, title: "" });
  return (
    <div>
      <FormikContainer initialValues={{ name: "" }}>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <div className={Styles.children__input}>
                <FormikControl
                  control="input"
                  type="text"
                  name="element_header"
                  placeholder="Element Header"
                  required={true}
                  elementInput={true}
                  icon={false}
                />
              </div>

              <AddTitleButton
                handler={() => { }}
                title="Add Link"
                style={{ margin: "1rem auto" }}
              />

              <div className={Styles.children__videoContainer}>
                <div>
                  <p>Video-1</p>
                  <div className={Styles.children__videoContainer__content}>
                    <div style={{ marginRight: ".5rem" }}>
                      <img src="/assets/images/female.png" alt="Images" />
                    </div>
                    <div
                      className={
                        Styles.children__videoContainer__content__selection
                      }
                    >
                      <p>Mobile Selecetion</p>
                      <div
                        className={clsx(
                          Styles.children__videoContainer__content__selection__inputContainer
                        )}
                      >
                        <label>Filename</label>
                        <input type="text" placeholder="Filename" />
                      </div>
                      <div
                        className={
                          Styles.children__videoContainer__content__selection__fileBtnContainer
                        }
                      >
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <span
                            className={
                              Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons__icon
                            }
                          >
                            <img
                              src="/assets/delete-bin-2-line.svg"
                              alt="Icons delete"
                            />
                          </span>
                        </button>
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <span
                            className={
                              Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons__icon
                            }
                          >
                            <img
                              src="/assets/ball-pen-line.svg"
                              alt="Icons rename"
                            />
                          </span>
                        </button>
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <AiOutlineEye className={Styles.viewIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.children__videoContainer__content}>
                    <div style={{ marginRight: ".5rem" }}>
                      <img src="/assets/images/female.png" alt="Images" />
                    </div>
                    <div
                      className={
                        Styles.children__videoContainer__content__selection
                      }
                    >
                      <p>Desktop Selecetion</p>
                      <div
                        className={clsx(
                          Styles.children__videoContainer__content__selection__inputContainer
                        )}
                      >
                        <label>Filename</label>
                        <input type="text" placeholder="Filename" />
                      </div>
                      <div
                        className={
                          Styles.children__videoContainer__content__selection__fileBtnContainer
                        }
                      >
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <span
                            className={
                              Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons__icon
                            }
                          >
                            <img
                              src="/assets/delete-bin-2-line.svg"
                              alt="Icons delete"
                            />
                          </span>
                        </button>
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <span
                            className={
                              Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons__icon
                            }
                          >
                            <img
                              src="/assets/ball-pen-line.svg"
                              alt="Icons rename"
                            />
                          </span>
                        </button>
                        <button
                          className={
                            Styles.children__videoContainer__content__selection__fileBtnContainer__iconButtons
                          }
                        >
                          <AiOutlineEye className={Styles.viewIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.children__videoContainer__videoInput}>
                  <div>
                    <div style={{ marginBottom: ".5rem" }}>
                      <FormikControl
                        control="input"
                        type="text"
                        name="btn_1"
                        placeholder="Button-1 Title"
                        elementInput={true}
                        icon={false}
                      />
                    </div>

                    <div
                      className={
                        Styles.children__videoContainer__videoInput__options
                      }
                    >
                      {options.map((item: ItemProps, index: number) => (
                        <button
                          type="button"
                          key={index}
                          className={clsx(
                            Styles.children__videoContainer__videoInput__options__button,
                            activeButtonLeft.index === index &&
                            Styles.children__videoContainer__videoInput__options__button__active
                          )}
                          onClick={() =>
                            setActiveButtonLeft({ index, title: item.title })
                          }
                        >
                          <img src={item.url} alt="Call element Icon" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>

                    {activeButtonLeft.title.toLowerCase() !== "url" ? (
                      <select
                        className={
                          Styles.children__videoContainer__videoInput__select
                        }
                        defaultValue="Select Slides"
                      >
                        <option value="none">Select Slide</option>
                        <option value={1}>1</option>
                      </select>
                    ) : (
                      <FormikControl
                        control="input"
                        type="text"
                        name="url"
                        placeholder="url"
                        elementInput={true}
                        icon={false}
                      />
                    )}
                  </div>
                  <div>
                    <div style={{ marginBottom: ".5rem" }}>
                      <FormikControl
                        control="input"
                        type="text"
                        name="btn_2"
                        placeholder="Button-2 Title"
                        elementInput={true}
                        icon={false}
                      />
                    </div>
                    <div
                      className={
                        Styles.children__videoContainer__videoInput__options
                      }
                    >
                      {options.map((item: ItemProps, index: number) => (
                        <button
                          type="button"
                          key={index}
                          className={clsx(
                            Styles.children__videoContainer__videoInput__options__button,
                            activeButtonRight.index === index &&
                            Styles.children__videoContainer__videoInput__options__button__active
                          )}
                          onClick={() =>
                            setActiveButtonRight({ index, title: item.title })
                          }
                        >
                          <img src={item.url} alt="Call element Icon" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>

                    {activeButtonRight.title.toLowerCase() !== "url" ? (
                      <select
                        className={
                          Styles.children__videoContainer__videoInput__select
                        }
                        defaultValue="Select Slides"
                      >
                        <option value="none">Select Slide</option>
                        <option value={1}>1</option>
                      </select>
                    ) : (
                      <FormikControl
                        control="input"
                        type="text"
                        name="url"
                        placeholder="url"
                        elementInput={true}
                        icon={false}
                      />
                    )}
                  </div>
                </div>

                <div style={{ margin: ".5rem 0" }}>
                  <FormikControl
                    control="input"
                    type="text"
                    name="image_header"
                    placeholder="Image Header"
                    required={true}
                    elementInput={true}
                    icon={false}
                  />
                </div>

                <div>
                  <FormikControl
                    control="textarea"
                    type="textarea"
                    name="desc"
                    placeholder="Description"
                    required={true}
                    elementInput={true}
                    icon={false}
                  />
                </div>

                <div className={Styles.children__btnContainer}>
                  <FActionsBtn
                    title="Save"
                    bgColor="#61ff00"
                    padding="8px 23px"
                    borderRadius="8px"
                    actions={() => { }}
                    type="submit"
                  />
                  <FActionsBtn
                    title="Delete"
                    bgColor="red"
                    padding="8px 23px"
                    borderRadius="8px"
                    actions={() => { }}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default VideoGallery;
