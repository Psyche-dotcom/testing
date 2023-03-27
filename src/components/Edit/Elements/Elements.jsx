import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ElementsType } from "./ElementsData";
import Styles from "./Elements.module.scss";
import Element from "./Element/Element";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import clsx from "clsx";
import { RootState } from "@redux/store/store";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EMBED_ELEMNET, CREATE_GALLERY_ELEMENT, CREATE_SLINK_SECTION, CREATE_SOCIALS_ELEMENT, EDIT_ELEMENT_POSITION, GET_SECTIONS, REMOVE_SLIDE } from "./schema";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GET_PAGE, GET_SECTIONS_PREVIEW, GET_USER_BY_TOKEN } from "@graphql/query";
import { useCookies } from "react-cookie";
import SimpleLink from "./Element/childrens/SimpleLink/SimpleLink";
import Socials from "./Element/childrens/Socials/Socials";
import Slide from "@edit/Slides/Slides/Slide/Slide";
import GalleryEditor from "./Element/childrens/Gallery";
import Embed from "./Element/childrens/Embed";
import { CREATE_MEMBERS_ELEMENT } from "@graphql/mutations";
import MembersEditor from "./Element/childrens/Members";
import Multiselect from 'multiselect-react-dropdown';

export const callToActionsData = [
  {
    id: 1,
    title: "Links",
    src: "/assets/calltoaction/global-line.svg",
  },
  {
    id: 2,
    title: "Gallery",
    src: "/assets/icons/image.svg",
  },
  // {
  //   id: 3,
  //   title: "Text",
  //   src: "/assets/calltoaction/text.svg",
  // },
  // {
  //   id: 4,
  //   title: "Email",
  //   src: "/assets/calltoaction/mail.svg",
  // },
  {
    id: 5,
    title: "Embed",
    src: "/assets/calltoaction/stack-line.svg",
  },
  // {
  //   id: 6,
  //   title: "Videos",
  //   src: "/assets/calltoaction/slide.svg",
  // },
  // {
  //   id: 7,
  //   title: "Contact",
  //   src: "/assets/calltoaction/contact.svg",
  // },
  // {
  //   id: 8,
  //   title: "Event",
  //   src: "/assets/calltoaction/event.svg",
  // },
  {
    id: 9,
    title: "Socials",
    src: "/assets/calltoaction/Group.svg",
  },
  {
    id: 10,
    title: "Members",
    src: "/assets/calltoaction/Group.svg",
  },
  // {
  //   id: 10,
  //   title: "Products",
  //   src: "/assets/calltoaction/cart.svg",
  // },
];

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

const Elements = () => {
  const [cookies, setCookie] = useCookies(['userAuthToken'])
  const [showType, setShowType] = useState(true);
  const [elements, setElements] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const { currentPageId } = useSelector((state) => state.editorSlice);

  const { loading, error, data, refetch } = useQuery(GET_SECTIONS_PREVIEW, {
    variables: {
      token: cookies.userAuthToken,
      id: currentPageId || "",
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken
      }

    }
  });


  function parseElements(vreel) {
    const { simple_links, socials, gallery, embed, members, collab_slides } = vreel;
    const _elements = [];
    members?.forEach((e) => {
      if (!e) return;
      _elements.push({
        ...e,
        id: e?.id,
        title: e.header,
        // active: e.hidden,
        type: "members",
        component:
          <MembersEditor id={e?.id} onRemove={removeSection} token={cookies.userAuthToken} />,
      })
    })
    embed?.forEach((e) => {
      _elements.push({
        ...e,
        id: e.id,
        title: e.header,
        // active: e.hidden,
        type: "embed",
        component:
          <Embed id={e.id} onRemove={removeSection} />,
      })
    })

    gallery?.forEach((e, index) => {


      _elements.push({
        ...e,
        id: e.id,
        title: e.header,
        active: e.hidden,
        type: "gallery",
        component:
          <GalleryEditor onRemove={removeSection} collab_slides={collab_slides} token={cookies.userAuthToken} refetch={refetch} id={e.id} />,
      })


    })
    simple_links.forEach((e, index) => {
      if (!elements.some(item => item.id === e.id)) {
        _elements.push({
          ...e,
          id: e.id,
          title: e.header,
          active: e.hidden,
          type: "simple_links",
          component: <SimpleLink onRemove={removeSection} id={e.id} data={{ ...e, refetch }} />,
        })
      }
    });
    socials.forEach((e, idx) => {
      if (!elements.some(item => item.id === e.id)) {
        _elements.push({
          ...e,
          id: e.id,
          title: e.header,
          active: e.hidden,
          type: "socials",
          component: <Socials id={e.id} onRemove={removeSection} refetch={refetch} social={e} />,
        })

      }
    });

    setElements(_elements.sort((a, b) => a.position - b.position))
  }

  function removeSection(id) {
    setElements(prev => prev.filter((section) => section.id !== id))
  }

  useEffect(() => {
    if (!initialLoad) {
      refetch({
        token: cookies.userAuthToken,
        id: currentPageId
      }).then(({ data }) => {
        parseElements(data.page);
      })
    }
  }, [currentPageId])

  useEffect(() => {
    if (data) {
      setInitialLoad(false)
      parseElements(data.page)
    }


  }, [data, error])


  const inactiveElements = elements?.filter((ele) => ele.active === false);
  const ref = useRef(null);


  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr
  }
  const [createSLinksSection] = useMutation(CREATE_SLINK_SECTION);
  const [createSocialsElement] = useMutation(CREATE_SOCIALS_ELEMENT);
  const [createGalleryElement] = useMutation(CREATE_GALLERY_ELEMENT);
  const [editElementPosition] = useMutation(EDIT_ELEMENT_POSITION);
  const [createEmbedElement] = useMutation(CREATE_EMBED_ELEMNET);
  const [createMembersElement] = useMutation(CREATE_MEMBERS_ELEMENT)
  const [removeSlide] = useMutation(REMOVE_SLIDE);
  const {
    expandMenu,
    userAuth: {
      user: { vreel, token },
    },
  } = useSelector((state) => state);
  const [selectedType, setSelectedType] = useState("Links");
  const [array1, updateArray1] = useState(activeElements);
  const [array2, updateArray2] = useState(inactiveElements);


  function handleOnDragEnd1(result) {
    if (!result.destination) {
      return null;
    }
    const items = Array.from(activeElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateArray1(items);
  }

  function handleOnDragEnd2(result) {
    if (!result.destination) return;
    const items = Array.from(array2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateArray2(items);
  }
  function handleNewSectionCreate() {
    switch (selectedType) {
      case "Links":
        createSLinksSection({
          variables: {
            token: token,
            vreelId: currentPageId,
          },
        })
          .then(({ data }) => {
            const id = data?.createSimpleLinkElement?.message
            setElements(prev => [
              ...prev,
              {
                id,
                title: "Simple Links",
                active: false,
                type: "simple_links",
                component: <SimpleLink onRemove={removeSection} id={id} />,
              }
            ])
            toast.success(`New section added!`);
            // refetch();

          })
          .catch((err) => {
            toast.error(err.message);
          });
        break;
      case "Socials":

        createSocialsElement({
          variables: {
            token,
            vreelId: currentPageId
          }
        }).then(({ data }) => {
          const id = data?.createSocialsElement?.message;
          setElements(prev => [
            ...prev,
            {
              id,
              title: "Socials",
              active: false,
              type: "socials",
              component: <Socials id={id} onRemove={removeSection} refetch={refetch} />,
            }
          ])

        })
        break;
      case "Gallery":
        createGalleryElement({
          variables: {
            token: cookies.userAuthToken,
            vreelId: currentPageId
          }
        }).then(({ data }) => {
          const id = data?.createGalleryElement?.message
          setElements(prev => [
            ...prev,
            {
              id,
              title: "Gallery",
              active: false,
              type: "gallery",
              component: <GalleryEditor
                onRemove={removeSection}
                collab_slides={[]}
                token={cookies.userAuthToken}
                refetch={refetch}
                id={id} />,
            }
          ])
          toast.success(`New section added!`);
          // refetch();
        })
          .catch((err) => {
            toast.error(err.message);
          });
        break;
      case "Embed":
        createEmbedElement({
          variables: {
            token: cookies.userAuthToken,
            vreelId: currentPageId
          }
        }).then(({ data }) => {
          const id = data?.createEmbedElement?.message;
          setElements(prev => [
            ...prev,
            {
              id,
              title: "Embed",
              active: false,
              type: "embed",
              component: <Embed id={id} onRemove={removeSection} />,
            }
          ])
          toast.success(`New section added!`);
        })
          .catch((err) => {
            toast.error(err.message);
          });
      case "Members":
        createMembersElement({
          variables: {
            token: cookies.userAuthToken,
            vreelId: currentPageId
          }
        }).then(({ data }) => {
          const id = data?.createMembersElement.message;
          setElements(prev => [
            ...prev,
            {
              id,
              title: "Members",
              active: false,
              type: "members",
              component: <MembersEditor id={id} onRemove={removeSection} token={cookies.userAuthToken} />,
            }
          ])
        })
          .catch(() => { })
        break;
      default:
        break;
    }
  }
  if (loading || error || !data) {
    return <div>Loading...</div>;
  }

  function updateElementPosition(element, position) {
    editElementPosition({
      variables: {
        token: cookies.userAuthToken,
        elementId: element.id,
        elementType: element.type,
        position
      }
    })
    // .catch(err => alert(err.message))

  }

  function handleDragEnd(e) {
    const sourceIndex = e.source?.index;
    const destinationIndex = e.destination?.index;
    const temp = arraymove(elements, sourceIndex, destinationIndex);
    setElements(temp);
    temp.forEach((element, idx) => {
      updateElementPosition(element, idx + 1)
    });

    setElements(temp);
    // updateElementPosition(temp[sourceIndex], sourceIndex + 1);
    // updateElementPosition(temp[destinationIndex], destinationIndex + 1);
  }

  const activeElements = elements?.filter((ele) => ele.active === true);
  return (
    <div className={Styles.elements}>
      {/* LEFT PREVIEW */}
      <div className={Styles.elements__left}>
        {/*<FActionsBtn*/}
        {/*  title="Add New Section"*/}
        {/*  padding="7px 13px"*/}
        {/*  bgColor="#11b03e"*/}
        {/*  color="white"*/}
        {/*  actions={() => {*/}
        {/*    setShowType(!showType);*/}
        {/*  }}*/}
        {/*/>*/}
        {showType && (
          <>
            <div className={Styles.btnGrid}>
              {callToActionsData.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    selectedType === item.title
                      ? Styles.active
                      : Styles.deactive
                  )}
                  onClick={() => setSelectedType(item.title)}
                >
                  <img src={item.src} alt="Type Section Icon" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            <div className={Styles.elementNotes}>
              <p>Select a section to be added in your page</p>
              <p>Links: Section links viewers to any URL destination</p>
              <p>Gallery: Section displays pictures and video with dynamic CTAs</p>
              <p>Socials: Section links viewers to any of your social media pages</p>
              <p>Embed: Section allows you to embed anything in your page</p>
            </div>
            <FActionsBtn
              title={`Create ${selectedType} Section`}
              padding="7px 13px"
              bgColor="#11b03e"
              color="white"
              actions={handleNewSectionCreate}
            />
          </>
        )}

        {/* ACTIVE ELEMENTS */}
        {/*<div className={Styles.title}>Sections</div>*/}
        {
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="array-1">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={Styles.element_container}>
                    {elements.map((element, index) => (
                      <Draggable
                        key={`${element.title} ${index}`}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            key={index}
                            style={{
                              ...provided.draggableProps.style,
                              boxShadow: snapshot.isDragging
                                ? "0 0 .4rem #666"
                                : "none",
                            }}
                            className={clsx(Styles.dragWrapper)}
                          >
                            {/* <span {...provided.dragHandleProps}>Hello</span> */}

                            <Element
                              element={element}
                              handleDrag={provided.dragHandleProps}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
        {/* INACTIVE ELEMENTS */}

        {/* <div className={Styles.title}>Inactive Elements</div>
        <span className={Styles.sub_title}>Toggle To Activate Element</span>
        <DragDropContext onDragEnd={handleOnDragEnd2}>
          <Droppable droppableId='array-1'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className={Styles.element_container} >
                  {array2.map((element, index) => (
                    <Draggable
                      key={element.title}
                      draggableId={element.title}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          key={index}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? '0 0 .4rem #666'
                              : 'none',
                          }}
                          className={Styles.dragWrapper}
                        >
                          <Element
                              element={element}
                              handleDrag={provided.dragHandleProps}
                            />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </div>

      {/* RIGHT PREVIEW */}
      <div className={Styles.elements__right}>
        <h1>Preview</h1>
      </div>
    </div>
  );
};

export default Elements;
