import React from "react";
import Styles from "../Children.module.scss";

import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import LinkCard from "../SimpleLink/LinkCard";
import clsx from "clsx";

const options = [
  { title: "b" },
  { title: "i" },
  { title: "u" },
  { title: "To Slide" },
  { title: "Link" },
];
const SuperLink: React.FC = () => {
  const simpleLinks = {
    header: "",
    position: 0,
    links: [
      {
        id: "cb37jpi23akl6a0h3lu0",
        position: 2,
        thumbnail:
          "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
        link_header: "Elephant",
        url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
        link_type: "url",
        tag: "elephant",
        __typename: "SimpleLink",
      },
    ],
    __typename: "SimpleLinksElement",
  };

  // const initialValues = {
  //   element_header: '',
  //   background: '#b3bac3',
  //   font: '#b3bac3',
  // };

  const initialValues = {
    element_header: "Simple Link 1",
    id: "cb37jpi23akl6a0h3lu0",
    position: 2,
    thumbnail: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    link_header: "Elephant",
    url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    link_type: "element",
    tag: "elephant",
    __typename: "SimpleLink",
    background: "#b3bac3",
    font: "#b3bac3",
  };

  const handleSubmit = async (values) => {

  };

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
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
                  name="link_header"
                  placeholder="Link Header"
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

              <div className={Styles.children__superLink}>
                <LinkCard
                  type={initialValues.link_type}
                  isTag={false}
                  isSubLink={true} appendToStack={function (o: any): void {
                    throw new Error("Function not implemented.");
                  }} />
                <div style={{ padding: ".5rem" }}>
                  <FormikControl
                    control="textarea"
                    type="text"
                    name="info"
                    placeholder="Info"
                    required={true}
                    elementInput={true}
                    icon={true}
                  />

                  <div className={Styles.optionWrapper}>
                    {options.map((option, index) => (
                      <button key={index} className={Styles.option}>
                        <span
                          className={clsx(
                            option.title === "b"
                              ? Styles.option_bold
                              : option.title === "i"
                                ? Styles.option_italic
                                : option.title === "u"
                                  ? Styles.option_underline
                                  : ""
                          )}
                        >
                          {option.title}
                        </span>
                      </button>
                    ))}
                  </div>
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

export default React.memo(SuperLink);
