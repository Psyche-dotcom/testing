import { socials } from "./socialsData";
import Styles from "../Children.module.scss";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SOCIALS_LINK, DELETE_SOCIALS_ELEMENT, EDIT_ELEMENT_HEADER, EDIT_SOCIALS_LINK, REMOVE_SOCIALS_LINK } from "@edit/Elements/schema";
import { useCookies } from "react-cookie";
import { useFormikContext } from "formik";
import { UPDATE_ELEMENT_BACKGROUND_COLOR } from "@graphql/mutations";
import useSectionLifeCycle from "@hooks/useSectionLifeCycle";
import LinkInput from "./Link";
import useDidMountEffect from "@hooks/useDidMountEffect";
import useDebounce from "@hooks/useDebounce";

interface Props {
  id: string;
  refetch: () => void;
  onRemove(id: string)
}

const Socials: React.FC<Props> = ({ refetch, id, onRemove }) => {
  const { section, refresh } = useSectionLifeCycle({
    sectionId: id,
    type: "socials",
    onFail: alert
  })
  const [selectSocialsActive, setSelectSocialsActive] = useState<boolean>(false);
  const [addSocialsLink] = useMutation(CREATE_SOCIALS_LINK);
  const [removeSocialsLink] = useMutation(REMOVE_SOCIALS_LINK);
  const [deleteElement] = useMutation(DELETE_SOCIALS_ELEMENT);
  const [editSocialsLink] = useMutation(EDIT_SOCIALS_LINK);
  const [editElementHeader] = useMutation(EDIT_ELEMENT_HEADER);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [editedStack, setEditedStack] = useState<Set<{ id: string, username: string }>>(new Set([]));
  const [currentVals, setCurrentVals] = useState<any>({});
  const [header, setHeader] = useState<string>("");
  const [socialsList, setSocialsList] = useState([]);
  const [updateBackgroundColor] = useMutation(UPDATE_ELEMENT_BACKGROUND_COLOR);
  const debounceValues = useDebounce(currentVals);
  const initialValues = {
    element__header: "",
    background: "#b3bac3",
    font: "#b3bac3",
  };

  useDidMountEffect(() => {
    handleSubmit();
  }, [debounceValues])

  // useEffect(() => {
  //   social.socials.forEach((social => {
  //     setSocialsList(prev => ({ ...prev, [social.id]: { username: social.username } }))
  //   }))
  // }, [])

  const handleSubmit = async () => {

    updateBackgroundColor({
      variables: {
        token: cookies.userAuthToken,
        elementType: "socials_element",
        elementId: id,
        backgroundColor: section.background_color
      }
    }).then((resp) => {
    })
      .catch((err) => alert(err.message))
    if (section.header !== currentVals.header) {
      editElementHeader({
        variables: {
          token: cookies.userAuthToken,
          elementId: id,
          elementType: "socials",
          header: debounceValues.header
        }
      })

    }
    for (const link of editedStack) {
      editSocialsLink({
        variables: {
          token: cookies.userAuthToken,
          linkId: link.id,
          input: {
            username: link.username
          }
        }
      })
    }
  };



  function addLink(title: string) {
    addSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        elementId: id,
        link: {
          position: 0,
          platform: title,
          username: ""
        }
      }
    }).then((res) => {
      refresh();
    })
  };

  function updateLink(id: string, username: string) {
    editSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        linkId: id,
        input: {
          username: username
        }
      }
    })
  }

  function removeLink(socialsId: string) {
    removeSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        socialsId
      }
    }).then(refresh)
  }

  function handleDeleteElement() {
    deleteElement({
      variables: {
        token: cookies.userAuthToken,
        elementId: id
      }
    }).then(() => onRemove(id))
  }



  if (!section) return <>Loading</>
  console.log(section)
  return (
    <div className={Styles.children} style={{ padding: ".5rem" }}>
      <div className={Styles.elements__left}>
        <FActionsBtn
          title="Add Social"
          padding="7px 13px"
          bgColor="#FF7A00"
          color="white"
          actions={() => {
            setSelectSocialsActive(!selectSocialsActive)
          }}
        />
      </div>
      {
        selectSocialsActive &&
        <div >
          {
            socials.map((social) => {
              return (
                <button onClick={() => addLink(social.title)}>
                  <img style={{ padding: "0.5pc" }} src={social.logo} />
                </button>
              )
            })
          }
        </div>
      }

      <FormikContainer initialValues={section}>
        {(formik) => {
          setCurrentVals(formik.values)
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control="input"
                type="text"
                name="header"
                placeholder="Element Header"
                required={true}
                elementInput={true}
              />
              <div style={{ padding: "1rem" }}>
                <FormikControl
                  control="input"
                  type="text"
                  name="background_color"
                  placeholder="Background Color"
                  required={true}
                  elementInput={true}
                  icon={false}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                {section?.socials.map((social, index) => {
                  const ui = socials.find(_social => social.platform === _social.title);
                  let i = index >= 0 ? index : social["socials"].length - 1;
                  return <LinkInput key={social.id} updateLink={updateLink} social={social} ui={ui} removeLink={removeLink} />

                })
                }
              </div>

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

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
              <div className={Styles.children__btnContainer}>
                <FActionsBtn
                  title="Delete Section"
                  padding="7px 13px"
                  bgColor="hsl(349, 91%, 50%)"
                  color="white"
                  actions={handleDeleteElement}
                />
                <FActionsBtn
                  title="Save Section"
                  padding="7px 13px"
                  bgColor="#11b03e"
                  color="white"
                  actions={handleSubmit}
                />
              </div>
            </form>
          );
        }}

      </FormikContainer>










    </div>
  );
};

export default Socials;


