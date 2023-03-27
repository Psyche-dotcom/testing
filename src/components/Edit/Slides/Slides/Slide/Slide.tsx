import React, { useEffect, useRef, useState } from "react";
import { FormikContainer } from "src/services/formik/FormikContainer";
import FormikControl from "src/services/formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import AdvancedSlide from "./AdvencedSlide/AdvancedSlide";
import CallToActions from "./CallToActions/CallToActions";
import Styles from "./Slide.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import { setActiveIndex } from "@redux/createSlice/previewSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import clsx from "clsx";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import useWindowDimensions from "@hooks/useWindowDimensions";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { toggleChangesFag } from "@redux/createSlice/trackChangesSlice";
import { changes } from "@edit/Layout/Mobile/MobileDashboard";
import AdvancedLinksGroup from "./AdvencedSlide/AdvancedLinksGroup";
import useDebounce from "@hooks/useDebounce";

import CollaboratorCard from "../../../../Shared/Collaborator/Slides";

import Switch, { CTAFillSwitch, CTAPositionSwitch } from "@formik/common/Switch/Switch";
import useDidMountEffect from "@hooks/useDidMountEffect";

const UPDATE_SLIDE = gql`
  mutation EditSlide($token: String!, $slideId: String!, $data: String!) {
    updateSlide(token: $token, slideId: $slideId, data: $data) {
      id
    }
  }
`;
const REMOVE_SLIDE = gql`
  mutation deleteSlide($token: String!, $slideId: String!) {
    removeSlide(token: $token, slideId: $slideId) {
      succeeded
      message
    }
  }
`;
const Slide = ({ initialValues, title, refetch, index, isRef }) => {
  const [cookies, setCookie] = useCookies();
  const [rawSlide, setRawSlide] = useState(initialValues);
  const dispatch = useDispatch();
  const [updateSlide] = useMutation(UPDATE_SLIDE);
  const [removeSlide] = useMutation(REMOVE_SLIDE);
  const ref = useRef(null);
  const [height, setHeight] = useState(false);
  const [editedMediaStack, setEditedMediaStack] = useState([]);
  const slide = useDebounce(rawSlide, 3000);
  const didMountRef = useRef(false);
  const [catOpen, setCatOpen] = useState(1);
  const handleHeight = () => {
    if (isRef) return;
    setHeight(!height);
  };
  useDidMountEffect(() => {
    editedMediaStack.map((update) => {
      const slide = { ...rawSlide };
      const { type, data } = update;
      slide[type] = data;
      updateSlide({
        variables: {
          token: cookies.userAuthToken,
          slideId: initialValues.id,
          data: JSON.stringify(slide),
        },
      })
        .then((res) => {
          console.log("slide updated");
        })
        .catch((err) => {
          toast.error("This didn't work.");
        });
    });
  }, [editedMediaStack]);


  useEffect(() => {
    if (didMountRef.current) {
      let mutSlide = { ...slide };
      const height = parseInt(slide?.advanced?.logoHeight) || 90;
      const transition_duration = parseInt(slide?.transition_duration) || 90;

      updateSlide({
        variables: {
          token: cookies.userAuthToken,
          slideId: initialValues.id,
          data: JSON.stringify({
            ...mutSlide,
            transition_duration,
            advanced: { ...slide.advanced, logoHeight: height, },
          }),
        },
      }).catch((err) => {
        toast.error("This didn't work.");
      });
    }
    didMountRef.current = true;
  }, [slide]);

  const handleSubmit = async (values: any) => {
    // updateSlide({
    //   variables: {
    //     token: cookies.userAuthToken,
    //     slideId: initialValues.id,
    //     data: JSON.stringify(values),
    //   },
    // })
    //   .then((res) => {
    //     refetch();
    //     toast.success(`${title} updated!`);
    //   })
    //   .catch((err) => {
    //     toast.error("This didn't work.");
    //   });
  };

  function setRawMediaValues(
    type: "desktop" | "mobile",
    data: { content_type: string; uri: string }
  ) {
    // console.log("data =>", data);
    setEditedMediaStack((prev) => [
      ...prev,
      {
        type,
        data: { content_type: data.content_type || "", uri: data.uri || "" },
      },
    ]);
    // setRawSlide(prev => ({ ...prev, [type]: data }));
  }

  function saveAdvancedSlide(advanced) {
    setRawSlide((prev) => ({ ...prev, advanced }));
  }

  return (
    <Draggable
      key={initialValues.id}
      draggableId={initialValues.id}
      index={index}
    >
      {(provided, snapShot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <FormikContainer initialValues={rawSlide}>
            {(formik) => {
              console.log("updated visiL: ", formik.values)
              //console.log("advanced formik values =>", formik.values);
              setRawSlide(formik.values);
              // console.log("change =>", formik.values);
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formik.values);
                    // dispatch(setPreviewObj(formik.values));
                  }}
                >
                  <div className={clsx(Styles.slideContainer)}>
                    <div className={Styles.slideContainer__collapse}>
                      <div className={Styles.slideContainer__collapse__button}>
                        <span>{title}</span>
                        <span>
                          <ToggleButton
                            name="active"
                            backgroundColor="white"
                            height="23"
                            activeTitle="Hide"
                            activeBackground="#61FF00"
                            activeIcon={<AiOutlineEye />}
                            deactiveTitle="Show"
                            deactiveBackground="#a3a1a1"
                            deactiveIcon={<AiOutlineEyeInvisible />}
                            color="black"
                          />
                        </span>

                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(setActiveIndex(index));
                            handleHeight();
                          }}
                        >
                          {height ? (
                            <img
                              src="/assets/icons/up-arrow-light.svg"
                              alt="Down Arrow Icon"
                            />
                          ) : (
                            <img
                              src="/assets/icons/down-arrow-light.svg"
                              alt="Up Arrow Icon"
                              className={Styles.collapseIcon}
                            />
                          )}
                        </span>
                      </div>

                      <div className={Styles.slideContainer__collapse__text}>
                        <span></span>
                        <span
                          className={
                            Styles.slideContainer__collapse__text__title
                          }
                        >
                          {initialValues.title.header
                            ? initialValues.title.header
                            : "No title"}
                        </span>

                        <span {...provided.dragHandleProps}>
                          <img src="/assets/icons/dots.svg" alt="Dots" />
                        </span>
                      </div>
                    </div>
                    {
                      isRef && (
                        <FActionsBtn
                          title="Remove Slide"
                          padding="7px 13px"
                          bgColor="red"
                          color="white"
                          actions={() => {
                            removeSlide({
                              variables: {
                                token: cookies.userAuthToken,
                                slideId: initialValues.id,
                              },
                            })
                              .then((res) => {
                                refetch();
                                toast.success(`${title} deleted!`);
                              })
                              .catch((err) => {
                                toast.error("This didn't work.");
                              });
                          }}
                        />
                      )
                      // <button>Delete</button>
                    }

                    {height && !isRef && (
                      <div
                        className={Styles.slide}
                        style={{ height: `${height ? "max-content" : "0"}` }}
                      >
                        <div className={Styles.slideBody} ref={ref}>
                          <div className={clsx(Styles.slideBody__titleSection)}>
                            <h3 style={{ paddingBottom: "18px" }}>Title</h3>
                            <div className="mb-10">
                              <FormikControl
                                control="input"
                                type="text"
                                name="title.header"
                                placeholder="Header"
                                slideinput={true}
                                onChange={formik.handleChange}
                              />
                            </div>
                            <FormikControl
                              control="textarea"
                              type="text"
                              name="title.description"
                              placeholder="Description"
                            />
                          </div>

                          <div className={clsx(Styles.slideBody__media)}>
                            <div className={Styles.slideBody__media__header}>
                              <h3>Media</h3>
                              <div
                                className={
                                  Styles.slideBody__media__header__toggle
                                }
                              >
                                <span
                                  style={{
                                    marginBottom: "10px",
                                    display: "block",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Selected File Sound{" "}
                                </span>
                                <SlidesToggleButton
                                  bgColor="green"
                                  width={78}
                                  height={23}
                                  firstTitle="On"
                                  secondTitle="Mute"
                                  firstInnerText="Mute"
                                  secondInnertext="On"
                                  name="muted"
                                />
                                <span>Toggle file sound on/off</span>
                              </div>
                            </div>
                            <div className={Styles.slideBody__media__content}>
                              <FormikControl
                                onMediaChange={(data) =>
                                  setRawMediaValues("mobile", {
                                    uri: data?.uri,
                                    content_type: data?.file_type,
                                  })
                                }
                                media={formik.values.mobile}
                                control="media"
                                name="mobile"
                              />
                              <div style={{ display: "flex" }}>
                                <section>
                                  <label>Start Time</label>
                                  <FormikControl
                                    type="number"
                                    control="input"
                                    name="mobile.start_time"
                                    placeHolder="Start"
                                  />
                                </section>
                                <section>
                                  <label>End Time</label>
                                  <FormikControl
                                    type="number"
                                    control="input"
                                    name="mobile.stop_time"
                                    placeHolder="End Time"
                                  />
                                </section>

                              </div>
                            </div>
                            <div className={Styles.slideBody__media__content}>
                              <FormikControl
                                onMediaChange={(data) =>
                                  setRawMediaValues("desktop", {
                                    uri: data?.uri,
                                    content_type: data?.file_type,
                                  })
                                }
                                media={formik.values.desktop}
                                control="media"
                                name="desktop"
                              />
                              <div style={{ display: "flex" }}>
                                <section>
                                  <label>Start Time</label>
                                  <FormikControl
                                    type="number"
                                    control="input"
                                    name="desktop.start_time"
                                    placeHolder="Start"
                                  />
                                </section>
                                <section>
                                  <label>End Time</label>
                                  <FormikControl
                                    type="number"
                                    control="input"
                                    name="desktop.stop_time"
                                    placeHolder="End Time"
                                  />
                                </section>

                              </div>
                            </div>
                          </div>

                          <div>
                            <h3
                              style={{
                                margin: "20px 15px",
                                fontWeight: "bold",
                              }}
                            >
                              Call-To-Action Buttons
                            </h3>
                            <h5
                              style={{
                                margin: "15px 15px",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              CTA Button Position
                            </h5>
                            <div
                              className={
                                Styles.slideBody__callToActions__toggleBtn
                              }
                            >
                              <span>
                                <CTAPositionSwitch
                                  name="cta_position"
                                  position={formik.values?.cta_position}
                                />
                              </span>
                            </div>
                            <p
                              className={
                                Styles.slideBody__callToActions__toggleBtn__note
                              }
                            >
                              Toggle button locations between center bottom &
                              right side panel
                            </p>
                            <h5
                              style={{
                                margin: "15px 15px",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              CTA Button Fill
                            </h5>
                            <div
                              className={
                                Styles.slideBody__callToActions__toggleBtn
                              }
                            >
                              <span>
                                <CTAFillSwitch
                                  name="cta_fill"
                                  position={formik.values?.cta_fill}
                                />
                              </span>
                            </div>
                            <p
                              className={
                                Styles.slideBody__callToActions__toggleBtn__note
                              }
                            >
                              Toggle button fill between transparent
                              with selected color outline and solid
                            </p>

                            <h4
                              style={{
                                margin: "15px 15px",
                                textAlign: "center",
                              }}
                            >
                              Select Button
                            </h4>
                            <div
                              style={{
                                background: "#FFF",
                                width: "80%",
                                display: "flex",
                                borderRadius: "1rem",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "auto",
                                marginRight: "auto",
                                flexWrap: "wrap",
                              }}
                            >
                              <a
                                onClick={() => {
                                  setCatOpen(1);
                                }}
                                style={{
                                  width: "25%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  backgroundColor: `${catOpen == 1
                                    ? "rgba(255, 122, 0, 1)"
                                    : "rgba(255, 122, 0, 0)"
                                    }`,
                                  color: `${catOpen == 1 ? "#ffffff" : "#000000"
                                    }`,
                                  fontSize: "1.65rem",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  borderRadius: "1rem",
                                  padding: "5%",
                                  minHeight: "30px",
                                  maxHeight: "53px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                1
                              </a>
                              <a
                                onClick={() => {
                                  setCatOpen(2);
                                  return false;
                                }}
                                style={{
                                  width: "25%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  backgroundColor: `${catOpen == 2
                                    ? "rgba(255, 122, 0, 1)"
                                    : "rgba(255, 122, 0, 0)"
                                    }`,
                                  color: `${catOpen == 2 ? "#ffffff" : "#000000"
                                    }`,
                                  fontSize: "1.65rem",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  borderRadius: "1rem",
                                  padding: "5%",
                                  minHeight: "30px",
                                  maxHeight: "53px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                2
                              </a>
                              <a
                                onClick={() => {
                                  setCatOpen(3);
                                }}
                                style={{
                                  width: "25%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  backgroundColor: `${catOpen == 3
                                    ? "rgba(255, 122, 0, 1)"
                                    : "rgba(255, 122, 0, 0)"
                                    }`,
                                  color: `${catOpen == 3 ? "#ffffff" : "#000000"
                                    }`,
                                  fontSize: "1.65rem",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  borderRadius: "1rem",
                                  padding: "5%",
                                  minHeight: "30px",
                                  maxHeight: "53px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                3
                              </a>
                              <a
                                onClick={() => {
                                  setCatOpen(4);
                                }}
                                style={{
                                  width: "25%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  backgroundColor: `${catOpen == 4
                                    ? "rgba(255, 122, 0, 1)"
                                    : "rgba(255, 122, 0, 0)"
                                    }`,
                                  color: `${catOpen == 4 ? "#ffffff" : "#000000"
                                    }`,
                                  fontSize: "1.65rem",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  borderRadius: "1rem",
                                  padding: "5%",
                                  minHeight: "30px",
                                  maxHeight: "53px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                4
                              </a>
                            </div>
                            <div
                              className={clsx(Styles.slideBody__callToActions)}
                              style={{
                                display: `${catOpen == 1 ? "block" : "none"}`,
                              }}
                            >
                              <div
                                className={
                                  Styles.slideBody__callToActions__title
                                }
                              >
                                {/*<p>Call-To-Action Button #1</p>*/}
                              </div>
                              <CallToActions
                                name="cta1"
                                link_type={
                                  formik.values.cta1.link_type
                                    ? formik.values.cta1.link_type
                                    : "URL"
                                }
                              />
                            </div>

                            <div
                              className={clsx(Styles.slideBody__callToActions)}
                              style={{
                                display: `${catOpen == 2 ? "block" : "none"}`,
                              }}
                            >
                              <div
                                className={
                                  Styles.slideBody__callToActions__title
                                }
                              >
                                {/*<p>Call-To-Action Button #2</p>*/}
                              </div>
                              <CallToActions
                                name="cta2"
                                link_type={
                                  formik.values.cta2.link_type
                                    ? formik.values.cta2.link_type
                                    : "URL"
                                }
                              />
                            </div>
                            <div
                              className={clsx(Styles.slideBody__callToActions)}
                              style={{
                                display: `${catOpen == 3 ? "block" : "none"}`,
                              }}
                            >
                              <div
                                className={
                                  Styles.slideBody__callToActions__title
                                }
                              >
                                {/*<p>Call-To-Action Button #3</p>*/}
                              </div>
                              <CallToActions
                                name="cta3"
                                link_type={
                                  formik.values?.cta3?.link_type
                                    ? formik.values.cta3.link_type
                                    : "URL"
                                }
                              />
                            </div>
                            <div
                              className={clsx(Styles.slideBody__callToActions)}
                              style={{
                                display: `${catOpen == 4 ? "block" : "none"}`,
                              }}
                            >
                              <div
                                className={
                                  Styles.slideBody__callToActions__title
                                }
                              >
                                {/*<p>Call-To-Action Button #4</p>*/}
                              </div>
                              <CallToActions
                                name="cta4"
                                link_type={
                                  formik.values?.cta4?.link_type
                                    ? formik.values.cta4.link_type
                                    : "URL"
                                }
                              />
                            </div>
                          </div>

                          <div className={clsx(Styles.slideBody__advanced)}>
                            <div className={Styles.slideBody__advanced__title}>
                              <h3>Advanced</h3>
                            </div>
                            <AdvancedSlide formik={formik} />
                          </div>

                          <div style={{ transition: "200ms" }}>
                            <AdvancedLinksGroup />
                            <div
                              className={clsx(Styles.slideBody__upArrows)}
                              onClick={handleHeight}
                            >
                              <img
                                src="/assets/icons/up-arrow-light.svg"
                                alt="Up Arrow"
                              />
                            </div>
                          </div>
                          <div>
                            <CollaboratorCard slideId={slide.id} />
                          </div>



                          <div className={clsx(Styles.slideBody__btnContainer)}>
                            <div
                              className={Styles.slideBody__btnContainer__delBtn}
                            >
                              <FActionsBtn
                                title="Delete"
                                bgColor="red"
                                color="white"
                                padding="8px 23px"
                                borderRadius="8px"
                                actions={() => {
                                  toast((t) => (
                                    <div>
                                      <p style={{ padding: "0 0 10px" }}>
                                        Are you sure to{" "}
                                        <b style={{ color: "red" }}>delete?</b>
                                      </p>
                                      <div>
                                        <button
                                          type="button"
                                          style={{
                                            background: "whitesmoke",
                                            color: "gray",
                                            padding: "3px 10px",
                                            margin: "0 5px 2px 0",
                                          }}
                                          onClick={() => toast.dismiss(t.id)}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          style={{
                                            background: "red",
                                            color: "whitesmoke",
                                            padding: "3px 10px",
                                            margin: "0 5px 2px 0",
                                          }}
                                          type="button"
                                          onClick={() => {
                                            removeSlide({
                                              variables: {
                                                token: cookies.userAuthToken,
                                                slideId: initialValues.id,
                                              },
                                            })
                                              .then((res) => {
                                                refetch();
                                                toast.success(
                                                  `${title} deleted!`
                                                );
                                              })
                                              .catch((err) => {
                                                toast.error(
                                                  "This didn't work."
                                                );
                                              });

                                            toast.dismiss(t.id);
                                          }}
                                        >
                                          Yes
                                        </button>
                                      </div>
                                    </div>
                                  ));
                                }}
                              />
                            </div>

                            <div
                              className={
                                Styles.slideBody__btnContainer__saveBtn
                              }
                            >
                              <FActionsBtn
                                title="Save"
                                bgColor="hsl(137, 82%, 38%)"
                                padding="8px 23px"
                                color="white"
                                borderRadius="8px"
                                actions={() => { }}
                                type="submit"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              );
            }}
          </FormikContainer>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Slide);
//
