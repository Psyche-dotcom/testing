import React from "react";
import { AccMenus, NavItemTypes } from "../MenuItems";
import { useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";

import Styles from "./AccountMenu.module.scss";
import clsx from "clsx";
import { expandAccountMenu } from "src/redux/createSlice/createMenuSlice";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { userAuthReducer } from "src/redux/createSlice/userSlice";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@redux/store/store";
import { useDispatch } from "react-redux";
const AccountMenu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userAuthToken"]);
  const { expandMenu, userAuth } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const _dispatch = useDispatch();
  const router = useRouter();
  const user = userAuth?.user;

  function handleCloseMenu() {
    _dispatch(expandAccountMenu())
  }
  return (
    <div
      className={clsx(
        Styles.generalMenu,
        expandMenu.initialAccountMenuState ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        {/* <MenuCloseBtn action={expandAccountMenu} /> */}
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <button
              onClick={() => {
                removeCookie("userAuthToken");
                dispatch(expandAccountMenu());
                dispatch(userAuthReducer(false));
                toast.success("Log Out Successfully");
                window.open("/", "_self");
              }}
              className={Styles.logOutBtn}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className={Styles.menuAccContainer}>
          <div className={Styles.menuAccContainer__header}>
            <button onClick={handleCloseMenu} className={Styles.TransparentButtonWithBorder}><img
                src="/assets/icons/arrow-right-white.svg"
                alt="Back"
            /> Back</button>
            <label style={{ color: "white" }}>Account Menu</label>
          </div>

          {AccMenus.map((item: NavItemTypes, index: number) => {
            return (
              <MenuItem
                handleClose={handleCloseMenu}
                accountMenu
                isAccount={true}
                key={index}
                item={{
                  ...item,

                }}
                isRightRound={false}
                action={handleCloseMenu}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
