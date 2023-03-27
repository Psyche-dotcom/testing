import { useSlideRefer } from "@hooks/useSlideRefer";
import clsx from "clsx";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import FormikControl from "src/services/formik/FormikControl";
import { callToActionsData, SlidesDataType } from "../../../SlidesData";
import Styles from "./CallToActions.module.scss";
import { Field } from "formik"
import MediaSelectorGallery from "@formik/common/Media/MediaSelectorGridItem/MediaSelectorGallery";
import Select from 'react-select';
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
const textInputLinkTypes = ["url", "call", "text", "email"]

function nameToPath(object, name) {
  const l = name.split(".");
  let prev = object;
  l.forEach((i) => {
    prev = prev[i];
  })

  return prev
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL

function DocumentSelector({ name }: { name: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { setFieldValue, values, getFieldMeta } = useFormikContext();
  const [selected, setSelected] = useState(nameToPath(values, `${name}.link_url`));
  function set_item(item) {
    try {
      const { uri } = item;
      setFieldValue(`${name}.link_url`, uri);
      setSelected(uri)
    } catch (err) {

    }
  }


  return (
    <div>
      <MediaSelectorGallery
        open={open}
        setOpen={setOpen}
        setItem={set_item}
        file_type="docs"
        prefill={selected}
      />
    </div>
  )
}

const CallToActions = ({ name, link_type }) => {
  const [type, settype] = useState(callToActionsData[0].title);
  const { setFieldValue, handleChange, values } = useFormikContext();
  const { pages } = useSelector((state: RootState) => state.editorSlice);
  const { user } = useSelector((state: RootState) => state.userAuth)
  const username = user.username;
  const handleActive = useCallback(
    (index: number, title) => {
      settype(title);
      setFieldValue(`${name}.link_type`, title);
    },
    [link_type]
  );
  const { sectionsData, slidesContent, employees } = useSlideRefer();

  return (
    <div className={Styles.callToActionsContainer}>
      <FormikControl
        name={`${name}.link_header`}
        control="input"
        placeholder="Link Header"
        type="text"
        slideinput={true}
      />
      <h4 style={{ margin: "15px 0", textAlign: "center" }}>Link Type</h4>
      <div className={Styles.callToActionsContainer__btnGrid}>
        {callToActionsData.map((item: SlidesDataType, index: number) => (
          <div
            key={index}
            className={clsx(
              link_type === item.title ? Styles.active : Styles.deactive
            )}
            onClick={() => handleActive(index, item.title)}
          >
            <img src={item.src} alt="Call element Icon" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      {/* ----------------------------- Select Tag -----------------------*/}
      {
        (() => {
          switch (link_type.toLowerCase()) {
            case "slide":
              console.log("name =>", name)
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {slidesContent.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.title.header}
                    </option>)
                  )}
                </Field>
              )
            case "employee":
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  <option value={null}>Select Employee</option>
                  {employees.map(({ first_name, last_name, id }, index) => (
                    <option key={index} value={id}>
                      {`${first_name} ${last_name}`}
                    </option>
                  ))}
                </Field>
              )
            case "sections":
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {sectionsData.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Field>)

            case "document":
              return (
                <DocumentSelector name={name} />
              )
            case "url":
              return (
                <FormikControl
                  name={`${name}.link_url`}
                  control="input"
                  placeholder={type}
                  onChange={handleChange}
                  type="text"
                  slideinput={true}
                />
              )
            case "call":
              return (
                <FormikControl
                  name={`${name}.link_url`}
                  control="input"
                  placeholder={type}
                  onChange={handleChange}
                  type="text"
                  slideinput={true}
                />
              )
            case "text":
              return (
                <FormikControl
                  name={`${name}.link_url`}
                  control="input"
                  placeholder={type}
                  onChange={handleChange}
                  type="text"
                  slideinput={true}
                />
              )
            case "email":
              return (
                <FormikControl
                  name={`${name}.link_url`}
                  control="input"
                  placeholder={type}
                  onChange={handleChange}
                  type="text"
                  slideinput={true}
                />
              )
            case "page":
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {pages.map((item, index) => (
                    <option
                      key={index}
                      value={`${baseUrl}/${username}/p/${item.id}`}
                    >
                      {item.name}
                    </option>
                  ))}
                </Field>
              )
          }

        })()
      }


      {/* ----------------------------- Group Elemsnts Option-----------------------*/}
      {/* {
        link_type?.toLowerCase() === "document" &&
        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          onChange={handleChange}
          type="text"
          slideinput={true}
        />
      }
      {
        textInputLinkTypes.includes(link_type?.toLowerCase()) &&

        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          onChange={handleChange}
          type="text"
          slideinput={true}
        />

      } */}

    </div >
  );
};

export default CallToActions;
