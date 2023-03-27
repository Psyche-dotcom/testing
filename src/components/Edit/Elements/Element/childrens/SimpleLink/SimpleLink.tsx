import React, { useEffect, useState } from "react";
import Styles from "../Children.module.scss";

import LinkCard from "./LinkCard";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import Alert from "@shared/Alert/Alert";
import {
  APPEND_LINK,
  DELETE_SIMPLE_LINKS_ELEMENT,
  EDIT_ELEMENT_HEADER,
  EDIT_SIMPLE_LINK,
} from "@edit/Elements/schema";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { FormikFormProps, useFormikContext } from "formik";
import { UPDATE_ELEMENT_BACKGROUND_COLOR } from "@graphql/mutations";
import useSectionLifeCycle from "@hooks/useSectionLifeCycle";

interface EditSimpleLinkPayload {
  id: string;
  token?: string;
  link: any;
}

const simpleLinks = {
  header: "",
  position: 0,
  links: [
    {
      id: "cb37jpi23akl6a0h3lu0",
      position: 2,
      thumbnail: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
      link_header: "Elephant",
      url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
      link_type: "url",
      tag: "elephant",
      __typename: "SimpleLink",
    },
  ],
  __typename: "SimpleLinksElement",
};
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
const SimpleLink: React.FC<{ id: string, onRemove: (id: string) => void }> = ({ id, onRemove }) => {
  const { section, refresh } = useSectionLifeCycle({
    type: "simple_links",
    sectionId: id,
    onFail: (e) => alert(e.message),
  });
  const [open, setOpen] = useState(false);
  const [appendLink] = useMutation(APPEND_LINK);
  const [editLink] = useMutation(EDIT_SIMPLE_LINK);
  const [editElementHeader] = useMutation(EDIT_ELEMENT_HEADER);
  const [deleteSimpleLinkElement] = useMutation(DELETE_SIMPLE_LINKS_ELEMENT);
  const [cookies, setCookie] = useCookies();
  const [count, setCount] = useState(0);
  const [editedStackIndexes, setEditedStackIndexes] = useState<Set<number>>(
    new Set<number>([])
  );
  const [links, setLinks] = useState<any[]>([]);
  const [currentValuesState, setCurrentValuesState] = useState(section);
  const [updateBackgroundColor] = useMutation(UPDATE_ELEMENT_BACKGROUND_COLOR);

  useEffect(() => {
    if (section) {
      setLinks(section.links);
    }
  }, [section]);

  const {
    expandMenu,
    userAuth: {
      user: { vreel, token },
    },
  } = useSelector((state: RootState) => state);
  function handleRemove(id: string) {
    setLinks((prev) => {
      return prev.filter((link) => link.id !== id);
    });
  }
  function handleCreateSimplelink() {
    const _init = {
      link_header: "",
      url: "",
      link_type: "url",
      tag: "",
      thumbnail: "",
    };
    appendLink({
      variables: {
        token,
        elementId: id,
        link: _init,
      },
    })
      .then((resp) => {
        setLinks((prev) => {
          return [...prev, _init];
        });
      })
      .catch((err) => alert(err.message));
  }

  function AppendToEditStack(link) {
    const idx = link.index;
    setEditedStackIndexes((prev) => new Set([...prev, idx]));
  }

  function handleDeleteSimpleLinkElement() {
    deleteSimpleLinkElement({
      variables: {
        token: token,
        id: id,
      },
    })
      .then(() => {
        onRemove(id);
      })
      .catch((err) => alert(err.message));
  }

  const handleSubmit = async () => {
    if (section.header !== currentValuesState.header) {
      editElementHeader({
        variables: {
          token: cookies.userAuthToken,
          elementId: id,
          elementType: "simple_links",
          header: currentValuesState.header,
        },
      });
    }
    updateBackgroundColor({
      variables: {
        token,
        elementType: "simple_link_element",
        elementId: id,
        backgroundColor: currentValuesState.background_color,
      },
    })
      .then((resp) => { })
      .catch((err) => alert(err.message));

    for (const idx of editedStackIndexes) {
      const content = currentValuesState.links[idx];

      const input = {
        position: content.position,
        thumbnail: content.thumbnail,
        link_header: content.link_header,
        url: content.url,
        tag: content.tag,
      };

      const variables = {
        token,
        input,
        elementId: content.id,
      };

      editLink({
        variables,
      })
        .then((res) => {
          setOpen(false);
          toast.success(`Link added!`);
          refresh();
          // setCount(count + 1);
        })
        .catch((err) => {
          setOpen(false);
          toast.error(err.message);
        });
    }
  };
  if (!section) return "Loading";
  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={section}>
        {(formik) => {
          setCurrentValuesState(formik.values);
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className={Styles.children__input}>
                <FormikControl
                  control="input"
                  type="text"
                  name="header"
                  placeholder="Section Header"
                  required={true}
                  elementInput={true}
                  icon={false}
                />
              </div>

              <AddTitleButton
                handler={handleCreateSimplelink}
                title="Add Link"
                style={{ margin: "1rem auto" }}
              />

              {/* {open && (
                <Alert
                  yesText="Add"
                  noText="Cancel"
                  yesCallback={() => {
                    setLinks()
                    // return;
                    // appendLink({
                    //   variables: {
                    //     token: token,
                    //     elementId: section.id,
                    //     link: formik.values.links[
                    //       formik.values.links.length - 1
                    //     ],
                    //   },
                    // })
                    //   .then((res) => {
                    //     setOpen(false);
                    //     toast.success(`Link added!`);
                    //     refresh();
                    //     // setCount(count + 1);
                    //   })
                    //   .catch((err) => {
                    //     setOpen(false);
                    //     toast.error(err.message);
                    //   });
                  }}
                  noCallback={() => setOpen(false)}
                  open={true}
                  text="Add New Link"
                  children={
                    <LinkCard
                      appendToStack={AppendToEditStack}
                      index={data.links.length}
                      data={formik.values.links[formik.values.links.lentgh - 1]}
                      type={initialValues.link_type}
                      isTag={true}
                    />
                  }
                />
              )} */}
              {links?.map((e, index) => (
                <LinkCard
                  key={e.id}
                  onRemove={handleRemove}
                  appendToStack={AppendToEditStack}
                  data={e}
                  index={index}
                  type={initialValues.link_type}
                  isTag={true}
                />
              ))}

              <div className={Styles.children__btnContainer}>
                <FActionsBtn
                  title="Delete"
                  bgColor="hsl(349, 91%, 50%)"
                  padding="8px 23px"
                  borderRadius="8px"
                  actions={handleDeleteSimpleLinkElement}
                  type="submit"
                />
                <FActionsBtn
                  title="Save"
                  bgColor="hsl(137, 82%, 38%)"
                  padding="8px 23px"
                  borderRadius="8px"
                  actions={handleSubmit}
                // type="submit"
                />
              </div>

              <div className={Styles.display__color}>
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
              </div>

              {/* <button className='sb'>Submit</button> */}
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default React.memo(SimpleLink);
