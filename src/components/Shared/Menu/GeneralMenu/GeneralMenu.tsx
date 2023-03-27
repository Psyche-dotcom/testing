import React from "react";
import { NavItem, NavItemTypes } from "../MenuItems";

import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";
import { useRouter } from "next/router";
import { RootState } from "../../../../redux/store/store";
import clsx from "clsx";
import Styles from "./GeneralMenu.module.scss";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import { gmenu } from "src/components/Sections/Sections";
import Link from "next/link";
const GeneralMenu = () => {
  const router = useRouter();
  const { username } = router?.query;
  const { initMenuState } = useSelector((state: RootState) => state.expandMenu);
  const dispatch = useDispatch();

  const items = gmenu?.filter((item) => item?.id).map((item) => {
    if (!item) return;
    const { header, id } = item;
    return {
      title: header,
      id: id,
    };
  });
  function handleClose() {
    dispatch(expandMenu());
  }
  return (
    <div
      className={clsx(
        Styles.generalMenu,
        initMenuState ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={expandMenu} />
        <div className={Styles.logoContainer}>
          <div
            onClick={() => {
              dispatch(expandMenu());
              router.push("/");
            }}
            className={Styles.logo}
          >
            <p>Powered By</p>
            <div>
              <img src="/assets/images/vreel-logo.png" />
            </div>
          </div>
        </div>
        <div className={Styles.menuContainer}>
          <div className={Styles.menuContainer__menu}>
            {items.map((item: NavItemTypes, index: number) => (
              <MenuItem
                handleClose={handleClose}
                key={index}
                item={item}
                isRightRound={true}
                action={expandMenu}
              />
            ))}
          </div>
          {/*<div className={Styles.menuContainer__menuLink}>*/}
          {/*   <button>Follow</button> */}
          {/*  <Link href="/api/vcard?">*/}
          {/*    <button>Add To Contacts</button>*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
export default GeneralMenu;
