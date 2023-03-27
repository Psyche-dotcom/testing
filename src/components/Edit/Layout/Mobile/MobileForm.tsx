import { advanceOptions, editOptions } from "../../data";
import MobileFormButton from "./MobileFormButton";
import Styles from "./MobileForm.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { useDispatch } from "react-redux";
import { createPage, setCurrentPageId } from "@redux/createSlice/editorSlice";
import React, { useState } from "react";
import clsx from "clsx";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useCookies } from "react-cookie";
import PageProfileEditor, { CreatePageView } from "@shared/PageProfile/editor";

const MobileForm: React.FC = () => {
  const nestedHeight = useSelector((state: RootState) => state.nestedHeight);
  const { pages, currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const { username } = useSelector((state: RootState) => state.userAuth.user);
  const [cookies] = useCookies(["userAuthToken"]);
  const dispatch = useDispatch();

  const [openClose, setOpenClose] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;
  const handleOpenClose = () => {
    if (openClose) setOpenClose(false);
    else setOpenClose(true);
  };
  function handlePageChange(id: string) {
    dispatch(setCurrentPageId(id));
  }

  return (
    <div className={Styles.mobileForm}>
      <div
        className={clsx(
          Styles.mobileForm__headerWrapper,
          openClose && Styles.mobileForm__headerWrapper__open
        )}
      >
        <div className={Styles.mobileForm__header} onClick={handleOpenClose}>
          <h2 style={{ color: "white" }}>Main Page</h2>
          <button
            className={Styles.button}
          // className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
          >
            <span className="">
              {openClose ? (
                <img
                  src="/assets/icons/down-arrow-light.svg"
                  alt="Down Arrow Icon"
                  className={Styles.collapseIcon}
                />
              ) : (
                <img
                  src="/assets/icons/up-arrow-light.svg"
                  alt="Up Arrow Icon"
                  className={Styles.collapseIcon}
                />
              )}
            </span>
          </button>
          {/*<select value={currentPageId} onChange={(e) => handlePageChange(e.target.value)}>*/}
          {/*  {*/}
          {/*    pages.map(({ id }) => (*/}
          {/*      <option>{id}</option>*/}
          {/*    ))*/}
          {/*  }*/}
          {/*</select>*/}
        </div>
        <div
          className={
            Styles.buttonWrapper__elementWrapper__Pages__Page__ButtonWrapper
          }
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.3rem 0.5rem",
          }}
        >

        </div>
        <div
          aria-checked={openClose}
          style={{
            height: `${openClose == true ? "auto" : "0px"}`,
          }}
          className={Styles.buttonWrapper__elementWrapper}
        >
          <div className={Styles.buttonWrapper__elementWrapper__NewForm}>
            <CreatePageView />

          </div>
          {pages ? (
            <div className={Styles.buttonWrapper__elementWrapper__Pages}>
              <h3
                className={Styles.buttonWrapper__elementWrapper__Pages__Title}
              >
                Active Pages
              </h3>
              {pages.map((page) => (
                <div
                  className={clsx(
                    Styles.buttonWrapper__elementWrapper__Pages__Page,
                    currentPageId === page.id &&
                    Styles.buttonWrapper__elementWrapper__Pages__Page__Active
                  )}
                  onClick={() => dispatch(setCurrentPageId(page.id))}
                >
                  <span
                    className={clsx(
                      Styles.buttonWrapper__elementWrapper__Pages__Page__Radio,
                      currentPageId === page.id &&
                      Styles.buttonWrapper__elementWrapper__Pages__Page__Radio__Active
                    )}
                  ></span>
                  <span
                    className={
                      Styles.buttonWrapper__elementWrapper__Pages__Page__Toggle
                    }
                  >
                    <img src="/assets/icons/showhide.png" alt="show-hide" />
                  </span>
                  {/*<FormikControl name="page_visible" control="toggle_show_hide" />*/}
                  <div
                    className={
                      Styles.buttonWrapper__elementWrapper__Pages__Page__ButtonWrapper
                    }
                  >
                    <PageProfileEditor page={page} />

                    <FActionsBtn
                      title={`View Page`}
                      padding="5px 5px"
                      bgColor="#ff7a00"
                      color="white"
                      actions={() => {
                        window.open(`${process.env.NEXT_PUBLIC_SITE_BASE_URL}/${username}/p/${page.id}`)
                        dispatch(setCurrentPageId(page.id))
                      }}
                    />
                    <FActionsBtn
                      title={`Copy Page URL`}
                      padding="5px 5px"
                      bgColor="#ff7a00"
                      color="white"
                      actions={() => {
                        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_BASE_URL}/${username}/p/${page.id}`)
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ marginTop: "0pc" }} className={Styles.buttonWrapper}>
        {editOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div>

      {/* <div
        className={Styles.advanceTitle}
        // className='text-secondary text-lg my-6 advance'
      >
        Advanced
      </div>
      <div className={Styles.buttonWrapper}>
        {advanceOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div> */}
    </div>
  );
};

export default MobileForm;

{
  /* <div className='text-secondary text-lg my-6 advance'>Edit Vreels</div>;
{
  regularOptions.map((obj) => {
    if (obj.children) {
      return (
        <div className='px-4 space-y-5'>
          {obj.children.map((obj, index) => (
            <MobileFormButton key={index} obj={obj} />
          ))}
        </div>
      );
    }
  });
} */
}
