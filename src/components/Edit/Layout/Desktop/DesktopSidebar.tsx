import { createPage, setCurrentPageId } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { advanceOptions, footerOptions, regularOptions } from "../../data";
import Styles from "./Dashboard-lg-sidebar.module.scss";
import clsx from "clsx";
import PageProfileEditor, { CreatePageView } from "@shared/PageProfile/editor";

interface Props { }

const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;

const DesktopSidebar: React.FC<Props> = () => {
  const { username, id } = useSelector(
    (state: RootState) => state.userAuth.user
  );
  const { pages, currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const [cookies] = useCookies(["userAuthToken"]);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const pathName = router.asPath;
  const pathLength = pathName.split("/");
  const [isDefaultPage, setIsDefaultPage] = useState(true);
  pathLength.pop();
  const parentPath = pathLength.join("/");
  const [openClose, setOpenClose] = useState<boolean>(false);
  const handleOpenClose = () => {
    if (openClose) setOpenClose(false);
    else setOpenClose(true);
  };
  useEffect(() => {
    setIsDefaultPage(currentPageId === id);
  }, [currentPageId]);

  return (
    <div className={Styles.desktopSidebar}>
      {/* BRAND LOGO */}
      <div
        className={Styles.brandLogo}
        onClick={() => router.push(`/${username}/p/${currentPageId}`)}
      >
        <img src="/assets/icons/Vreel_logo_small.svg" alt="Brand Logo" />
      </div>
      <div
        className={clsx(
          Styles.desktopSidebar__headerWrapper,
          openClose && Styles.desktopSidebar__headerWrapper__open
        )}
      >
        <div
          className={Styles.desktopSidebar__header}
          onClick={handleOpenClose}
        >
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

      <ul className="">
        {/* REGULAR ITEMS */}
        {regularOptions.map((obj, index) => {
          if (obj.title === "View Vreel") {
            obj.href = `/${username}`;
          }
          return (
            <>
              {/*<li*/}
              {/*  onClick={() => {*/}
              {/*    router.push(obj.href);*/}
              {/*  }}*/}
              {/*  className={`${Styles.navItem} ${(obj.href == parentPath && Styles.navItem__active) ||*/}
              {/*    (obj?.pathname == parentPath && Styles.navItem__active) ||*/}
              {/*    (obj.href == pathName && Styles.navItem__active)*/}
              {/*    } `}*/}
              {/*  key={index}*/}
              {/*>*/}
              {/*  {(obj.href == pathName && (*/}
              {/*    <span className={Styles.navItem__activeSpan}></span>*/}
              {/*  )) ||*/}
              {/*    (obj?.pathname == parentPath && (*/}
              {/*      <span className={Styles.navItem__activeSpan}></span>*/}
              {/*    )) ||*/}
              {/*    (obj.href == parentPath && (*/}
              {/*      <span className={Styles.navItem__activeSpan}></span>*/}
              {/*    ))}*/}
              {/*  {obj.title}*/}
              {/*</li>*/}

              {/* IF CHILDREN EXIST */}
              {obj.children && (
                <div className={Styles.navChild}>
                  {obj.children.map((obj, index) => (
                    <li
                      onClick={() => {
                        // setCurrentChildIndex(index);
                        router.push(obj.href);
                      }}
                      key={index}
                      className={`${Styles.navChild__treeItem} ${obj.href == pathName
                        ? Styles.navChild__activeItem
                        : Styles.navChild__inactiveItem
                        }`}
                    >
                      {obj.title}
                      {obj.href == pathName ? (
                        <img
                          src="/assets/icons/arrow-right.svg"
                          alt="click to expand"
                        />
                      ) : (
                        <img
                          src="/assets/icons/arrow-left.svg"
                          alt="click to expand"
                        />
                      )}
                    </li>
                  ))}
                </div>
              )}
            </>
          );
        })}

        {/* ADVANCED ITEMS */}
        <div className={Styles.advanceEdit}>
          {/* <span className={Styles.advanceEdit_title}>Advanced Edits</span> */}
          <div className={Styles.advanceEdit__wrapper}>
            {advanceOptions.map((obj, index) => (
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                key={index}
                className={` ${Styles.advanceEdit__wrapper__treeItem} ${obj.href == pathName
                  ? Styles.advanceEdit__wrapper__activeItem
                  : Styles.advanceEdit__wrapper__inactiveItem
                  }`}
              >
                {obj.title}
              </li>
            ))}
          </div>
        </div>

        {/* FOOTER OPTIONS */}
        <div>
          {footerOptions.map((obj, index) => (
            <>
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                className={`${Styles.footerItem} ${(obj.href == parentPath && Styles.footerItem__active) ||
                  (obj.href == pathName && Styles.footerItem__active)
                  }`}
                key={index}
              >
                {(obj.href == pathName && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary"></span>
                )) ||
                  (obj.href == parentPath && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary"></span>
                  ))}
                {obj.title}
              </li>

              {/* IF CHILDREN EXIST */}
              {obj.children && (
                <div className="ml-9 pt-4 overflow-hidden">
                  {obj.children.map((obj, index) => (
                    <li
                      onClick={() => {
                        // setCurrentChildIndex(index);
                        router.push(obj.href);
                      }}
                      key={index}
                      className={`relative text-xl -mt-2  py-3 cursor-pointer dashboard-nested  ${obj.href == pathName
                        ? "text-white before:border-white z-10"
                        : "text-black"
                        }`}
                    >
                      {obj.title}
                    </li>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default DesktopSidebar;
