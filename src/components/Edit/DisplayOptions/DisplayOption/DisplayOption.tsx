import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import * as AiIcons from "react-icons/ai";
import Styles from "../DisplayOptions.module.scss";
import { displayData } from "./displayData";
import { Field, useFormikContext } from "formik";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import { RootState } from "@redux/store/store";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_DISPLAY_OPTIONS,
  GET_DISPLAY_OPTIONS_BY_PAGE,
} from "@graphql/query";
import { useCookies } from "react-cookie";
import { UPDATE_VREEL_FIELDS } from "@graphql/mutations";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { AudioSelector, FontSelector } from "@shared/InputForm/InputForm";
import useDebounce from "@hooks/useDebounce";
import { ObjectisEqual } from "src/utils/check";
import { Slider } from 'rsuite';
import useDidMountEffect from "@hooks/useDidMountEffect";

const DisplaySettingsKeys = [
  "display_options/background_audio",
  "display_options/default_logo",
  "display_options/default_logo_height",
  "display_options/audio_type",
  "display_options/slides/title/family",
  "display_options/slides/title/uri",
  "display_options/slides/button/uri",
  "display_options/slides/button/family",
  "display_options/slides/description/family",
  "display_options/slides/description/uri",
  "display_options/sections/title/family",
  "display_options/sections/title/uri",
  "display_options/sections/button/uri",
  "display_options/sections/button/family",
  "display_options/sections/description/family",
  "display_options/sections/description/uri",
  "display_options/sections/header/family",
  "display_options/sections/header/uri",
];

const DisplayOption: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const { currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const { data, error, refetch } = useQuery(GET_DISPLAY_OPTIONS_BY_PAGE, {
    variables: {
      id: currentPageId,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken
      }

    },
  });
  const [updateDisplayOptions] = useMutation(UPDATE_VREEL_FIELDS);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const [displayContent, setDisplayContent] = useState<any>();
  const dispatch = useDispatch();
  const [currentVals, setCurrentVals] = useState<any>({});
  const [editedFontsStack, setFontsStack] = useState([]);
  //compiling databases; [concept zero] rendering complex sequences
  //registering housing systems: initiating journey module
  //Definitive effectequals [zero factor invertion]
  //speed mudlators - [17% ranging formila add ons]
  //stirring and differentiating'enegizing'
  //energizing quantum recalibrators
  //unsopporting spam reconbobultors [initializing processors, '7,9,0']
  //unpopulating parsecsystems; revitalizing organic structures
  //inderationalizing pargisystems wired combobulators
  //[12,7,9]... grating systems... grating systems
  //76% initialization; parsecting cloning systems
  //ondulating retaliation cycles
  //Climbing structural ladders
  //cloning john; database ; Aaron cloning process 99%
  //rejuvinated life systems
  //complete
  function FormikAudioSelecter() {
    const { setFieldValue, getFieldMeta } = useFormikContext();
    const { value } = getFieldMeta('background_audio')
    return (
      <AudioSelector
        placeholder="Background Audio"
        setAudio={({ value }) => {
          setFieldValue('background_audio', value)
        }}
        value={value}
      />
    )
  }

  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);
  const didMountRef = useRef(false);
  const isLarge = useMediaQuery({ query: "(min-width: 1020px)" });
  const refetchValues = useDebounce(currentVals, 2000);
  const fontsDebounceValue = useDebounce(editedFontsStack);
  useDidMountEffect(() => {
    const fields = [];
    fontsDebounceValue.forEach(({ key, uri, label }) => {
      fields.push({
        field: `display_options/${key}/uri`,
        value: uri,
      });

      fields.push({
        field: `display_options/${key}/family`,
        value: label,
      });
    });
    for (const [key, value] of Object.entries(currentVals)) {
      const field = `display_options/${key}`;
      if (DisplaySettingsKeys.includes(field)) {
        fields.push({
          field,
          value: value?.toString(),
        });
      }
    }
    updateDisplayOptions({
      variables: {
        token: cookies.userAuthToken,
        vreelId: currentPageId,
        fields,
      },
    }).catch(console.log);
  }, [fontsDebounceValue, refetchValues]);

  function setAudioType(type: string) {
    updateDisplayOptions({
      variables: {
        token: cookies.userAuthToken,
        vreelId: currentPageId,
        fields: [{ key: "display_options/audio_type", value: type }],
      },
    }).catch((err) => alert(err.message));
  }

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data) {
      setDisplayContent(data.page.display_options);
      setCurrentVals(data.page.display_options);
    }
  }, [data, error]);

  useEffect(() => {
    setDisplayContent(null);
    if (didMountRef.current === true) {
      refetch({
        id: currentPageId,
      })
        .then(({ data }) => {
          setDisplayContent(data.page.display_options);
          setCurrentVals(data.page.display_options);
        })
        .catch((err) => alert(err.message));
    }
    didMountRef.current = true;
  }, [currentPageId]);

  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: currentParent?.index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: "Display Options",
        })
      );

      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height - wrapperRef.current.offsetHeight,
          title: "Display Options",
        })
      );

      setHeight(0);
    }
  };

  useEffect(() => {
    setCurrentParent(parent.find((obj) => obj.title === "Display Options"));
  }, [handleSetHeight, collapse]);

  const initialValues = {};

  function handleSetFont({ uri, label, key }) {
    setFontsStack((prev) => [...prev, { key, uri, label }]);
  }

  return (
    <div className={Styles.displayOptionWrapper}>
      {displayContent && (
        <FormikContainer initialValues={displayContent}>
          {(formik) => {
            const values = formik.values;
            setCurrentVals(values);
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleSubmit(formik.values);
                }}
              >
                <div
                  style={{
                    height: "auto",
                    overflow: "hidden",
                    width: "100%",
                    transition: "all 1.5s ease",
                  }}
                >
                  <div ref={wrapperRef}>
                    <div className={Styles.title}>Home</div>
                    <div className={Styles.displayDataWrapper}>
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>Slide Title Font</h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.title.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/title",
                            })
                          }
                        />
                      </div>
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>
                            Slide Description Font
                          </h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.description.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/description",
                            })
                          }
                        />
                      </div>
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>Slide Button Font</h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.button.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/button",
                            })
                          }
                        />
                      </div>
                      <div></div>
                    </div>
                    <div className={Styles.title}>Sections</div>
                    <div>
                      <div className={Styles.displayDataWrapper}>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Section Header Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.header.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/header",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Title Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.title.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/title",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Description Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={
                              displayContent.sections?.description.family
                            }
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/description",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Button Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.button.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/button",
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className={Styles.display__color}>
                        <span className={Styles.fonttitle}>Element Display Color</span>

                        <div className={Styles.inputWrapper}>
                          <FormikControl
                            control="input"
                            type="color"
                            name="background_color"
                            colorInput={true}
                          />
                          <FormikControl
                            control="input"
                            type="color"
                            name="font"
                            colorInput={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={Styles.title}>Advanced</div>
                    <div className={Styles.displayAdvanceDataWrapper}>
                      <div className={Styles.displayAdvanceDataWrapper__left}>
                        <div>
                          <p style={{ color: "white" }}>{values.default_logo_height}</p>
                          <input value={values.default_logo_height} onChange={e => formik.setFieldValue("default_logo_height", e.target.value)} type="range" min="1" max="100" id="myRange" />
                          <section>
                            <p>Control Logo Size</p>
                          </section>
                        </div>
                        <div className={Styles.displayDataImageWrapper} style={{ padding: `${currentVals?.default_logo ? "0" : "6px"}` }}>
                          {/* <img
                            src={currentVals?.default_logo}
                            alt="Picture of a Lady"
                          /> */}
                          {/* {!currentVals?.default_logo && */}
                          <FormikControl
                            control="media-image"
                            name="default_logo"
                            image={currentVals?.default_logo}
                          />
                          {/* } */}

                        </div>
                        <p>Select logo file to show
                          as the default on all slides</p>
                      </div>

                      <div className={Styles.displayDataAudioWrapper}>
                        <div className={Styles.displayBackgroundAudio}>
                          <span>VReel Background Audio</span>
                          <p>Choose an audio file to play as the default sound on your VREEL</p>
                          {/*<div className={Styles.buttonWrapper}>*/}
                          {/*  <button>Add Track</button>*/}
                          {/*  <button>Add Stream</button>*/}
                          {/*</div>*/}
                        </div>
                        {/*<FormikControl
                          control="input"
                          type="text"
                          name="background_color"
                          placeholder="Background Color"
                          required={true}
                          elementInput={true}
                        />*/}
                        <Field as="select" name="audio_type">
                          <option value={"audio"}>Source Audio File</option>
                          <option value={"icecast"}>Icecast</option>
                          <option value={"mp3"}>Mp3</option>
                        </Field>

                        <FormikAudioSelecter />


                      </div>

                      {/* <ToggleButton /> */}
                    </div>
                  </div>

                </div>
              </form>
            );
          }}
        </FormikContainer>
      )}
    </div>
  );
};

export default DisplayOption;
