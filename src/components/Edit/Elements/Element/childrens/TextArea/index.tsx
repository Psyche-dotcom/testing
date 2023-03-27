import { useRef } from "react";
import clsx from "clsx";
import Styles from "../Children.module.scss";

import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import LinkCard from "../SimpleLink/LinkCard";

const TextArea: React.FC = () => {
  const options = [
    { title: "b" },
    { title: "i" },
    { title: "u" },
    { title: "To Slide" },
    { title: "Link" },
  ];

  // const initialValues = {
  //   header: "",
  //   info: "",
  //   background: "#b3bac3",
  //   font: "#b3bac3",
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
              <div className={Styles.children__textArea}>
                <div style={{ marginBottom: ".5rem" }}>
                  <FormikControl
                    control="input"
                    type="text"
                    name="header"
                    placeholder="Header"
                    required={true}
                    elementInput={true}
                    icon={true}
                  />
                </div>
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

              <div
                style={{
                  margin: "1rem 0 2rem 0",
                }}
              >
                <LinkCard type={initialValues.link_type} isTag={false} appendToStack={function (o: any): void {

                }} />
              </div>

              {/* <AddTitleButton title='Add Image' />
              <button
                onClick={(e) => formik.resetForm()}
                className={Styles.clearArea}
              >
                Clear Text Area
              </button> */}

              {/* <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control="input"
                    type="color"
                    name="background"
                    colorInput={true}
                  />
                  <FormikControl
                    control="input"
                    type="color"
                    name="font"
                    colorInput={true}
                  />
                </div>
              </div> */}

              {/* <button className="sb">Submit</button> */}
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default TextArea;
