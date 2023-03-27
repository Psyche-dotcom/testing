import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import Styles from "./LinkCard.module.scss";
import FormikControl from "@formik/FormikControl";
import { useFormikContext } from "formik";
import { useSlideRefer } from "@hooks/useSlideRefer";
import { useRouter } from "next/router";
import { is } from "immer/dist/internal";
import Alert from "@shared/Alert/Alert";
import { ObjectisEqual } from "src/utils/check";
import { useMutation } from "@apollo/client";
import { REMOVE_SIMPLE_LINK } from "@edit/Elements/schema";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useCookies } from "react-cookie";

interface ItemProps {
  id: number;
  title: string;
  url?: string;
}

type TypeProps = "url" | "slide" | "element" | string;

const LinkCard: React.FC<{
  data?: any;
  index?: number;
  type: TypeProps;
  isTag: boolean;
  isSubLink?: boolean;
  onRemove(id: string): void;
  appendToStack: (o: any) => void;
}> = ({ type, data, index, isTag, isSubLink, appendToStack, onRemove }) => {
  const options: Array<ItemProps> = [
    { id: 1, title: "url", url: "/assets/calltoaction/global-line.svg" },
    { id: 2, title: "slide", url: "/assets/calltoaction/slide.svg" },
    { id: 3, title: "element", url: "/assets/calltoaction/stack-line.svg" },
  ];
  const [active, setActive] = useState(0);
  const [cookies] = useCookies(["userAuthToken"]);
  const { setFieldValue, values } = useFormikContext<any>();
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeButtonType, setActiveButtonType] = useState<TypeProps>(type);
  const [currentValue, setCurrentValue] = useState(values.links[index]);
  const [removeSimpleLink] = useMutation(REMOVE_SIMPLE_LINK);
  // const handleActive = (index: number, title) => {
  //   setFieldValue(`links[${i}].link_type`, title);
  //   setActive(index);
  //   setActiveButton(index);
  //   setActiveButtonType(title);
  // };
  function handleRemoveSimpleLink() {
    removeSimpleLink({
      variables: {
        token: cookies.userAuthToken,
        id: data.id,
      },
    })
      .then(() => {
        alert("removed simple link");
        onRemove(data.id);
      })
      .catch((err) => alert(err.message));
  }
  useEffect(() => {
    const val = values.links[index];
    if (val) {
      setCurrentValue(val);
      if (!ObjectisEqual(val, data)) {
        appendToStack({ ...values, index });
      }
    }
  }, [values]);

  useEffect(() => {
    if (currentValue) {
      if (currentValue.link_type === "url") {
        setActiveButton(0);
        setActiveButtonType("url");
      } else if (currentValue.link_type === "slide") {
        setActiveButton(1);
        setActiveButtonType("slide");
      } else if (currentValue.link_type === "element") {
        setActiveButton(2);
        setActiveButtonType("element");
      }
    }
  }, [currentValue?.link_type]);
  const router = useRouter();
  const { sectionsData, slidesContent } = useSlideRefer();
  const username = "";
  let i = index >= 0 ? index : values["links"].length - 1;

  const handleActive = (index, type) => {
    if (type) {
      if (type === "url") {
        setActiveButton(index);
        setActiveButtonType("url");
      } else if (type === "slide") {
        setActiveButton(index);
        setActiveButtonType("slide");
      } else if (type === "element") {
        setActiveButton(index);
        setActiveButtonType("element");
      }
    }
  };
  return (
    <div className={Styles.link_card}>
      {/* <Modal action1={label:'Hello',callback:()=>{}} action2={label:'Hello',callback:()=>{}} open={true} /> */}
      <div className={Styles.link_card_left}>
        <div style={{ marginBottom: "10px" }}>
          <FormikControl control="media-image" name={`links[${i}].thumbnail`} />
        </div>
        {isTag && (
          <FormikControl
            control="input"
            type="text"
            name="tag"
            placeholder="Tag"
            elementInput={true}
            icon={false}
          />
        )}

        {/* <ChildInput type='text' placeholder='Tag' /> */}
      </div>

      <div className={Styles.link_card_right}>
        <div>
          <FormikControl
            control="input"
            type="text"
            name={`links[${i}].link_header`}
            placeholder="Link Header"
            required={true}
            elementInput={true}
            icon={false}
          />
        </div>
        {isSubLink && (
          <div>
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
        )}
        <div className={Styles.options}>
          {options.map((item: ItemProps, index: number) => (
            <button
              type="button"
              key={index}
              className={clsx(
                Styles.button,
                activeButton === index && Styles.button_active
              )}
              onClick={() => {
                handleActive(index, item.title);
              }}
            >
              {/* clsx(
              Styles.button,
              activeButton === index && Styles.button_active
            ) */}
              <img src={item.url} alt="Call element Icon" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        <div className={Styles.inputWrapper}>
          {activeButtonType === "url" && (
            <FormikControl
              control="input"
              type="text"
              name={`links[${i}].url`}
              placeholder="URL"
              elementInput={true}
              icon={false}
            />
          )}
          {activeButtonType === "slide" && (
            <select
              className={Styles.select}
              defaultValue="Select Slides"
              onChange={(e) => {
                setFieldValue(`url`, e.target.value);
                // router.push(e.target.value);
              }}
            >
              <option value="none">Select Slide</option>
              {slidesContent.map((item, index) => (
                <option key={index} value={`/${username}?slide=${item.id}`}>
                  {item.title.header}
                </option>
              ))}
            </select>
          )}
          {activeButtonType === "element" && (
            <select
              className={Styles.select}
              defaultValue="Select Element"
              onChange={(e) => {
                setFieldValue(`url`, e.target.value);
                // router.push(e.target.value);
              }}
            >
              <option value="none">Select Element</option>
              {sectionsData.map((item, index) => (
                <option key={index} value={`/${username}?slide=${item.id}`}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <FActionsBtn
          title="Remove Link"
          padding="7px 13px"
          bgColor="red"
          color="white"
          actions={handleRemoveSimpleLink}
        />
      </div>
    </div>
  );
};

export default LinkCard;
