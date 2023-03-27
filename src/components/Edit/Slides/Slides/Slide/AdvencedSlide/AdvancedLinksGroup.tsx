import FormikControl from "@formik/FormikControl";
import SubmitBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SubmitBtn";
import clsx from "clsx";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Styles from "./AdvancedSlide.module.scss";

const AdvancedLinksGroup = () => {
  return (
    <div className={Styles.linksGroup}>
      {[
        // { title: "Create Slide NFT", desc: "Select Marketplace" },
        // { title: "Invite Collabrator", desc: "Search Username/Email" },
        // { title: "Add Creadits", desc: "Search Username/Email" },
        // { title: "Add Group", desc: "Search Group" },
      ].map((item, index) => (
        <div key={index} className={Styles.linksGroup__mainContent}>
          <div
            className={clsx(
              Styles.linksGroup__container,
              item.title === "Create Slide NFT"
                ? Styles.linksGroup__active
                : Styles.linksGroup__deactive
            )}
          >
            <div className={Styles.linksGroup__container__content}>
              <p className={Styles.linksGroup__container__content__title}>
                {(item.title === "Add Creadits" ||
                  item.title === "Add Group") && (
                    <FaPlus style={{ marginRight: "5px" }} />
                  )}

                {item.title}
              </p>
              <p>{item.desc}</p>

              {(item.title === "Create Slide NFT" ||
                item.title === "Add Group") && (
                  <select className={Styles.select}>
                    <option value={"audio"}>Open Source</option>
                  </select>
                )}

              {item.title === "Invite Collabrator" && (
                <FormikControl
                  name={`advanced.collabrator.username`}
                  control="input"
                  placeholder="Username/Email"
                  type="text"
                  slideinput={true}
                  advanced={true}
                />
              )}

              {item.title === "Add Creadits" && (
                <>
                  <div className="mb-10">
                    <FormikControl
                      name={`advanced.creadits.username`}
                      control="input"
                      placeholder="Username/Email"
                      type="text"
                      slideinput={true}
                      advanced={true}
                    />
                  </div>
                  <div
                    className={
                      Styles.linksGroup__container__content__addCreadits
                    }
                  >
                    <div>
                      <BiSearchAlt2 />
                    </div>
                    <p>Creadits</p>
                    <div>
                      <AiOutlineCloseCircle />
                    </div>
                  </div>
                </>
              )}

              <div style={{ marginTop: "12px" }}>
                <SubmitBtn />
              </div>
            </div>
          </div>

          {item.title !== "Create Slide NFT" && (
            <div className={Styles.linksGroup__bottom}>
              <div className={Styles.linksGroup__bottom__container}>
                <div
                  className={
                    Styles.linksGroup__bottom__container__logoContainer
                  }
                >
                  <div
                    className={
                      Styles.linksGroup__bottom__container__logoContainer__logo
                    }
                  >
                    <img src="/assets/vreel-profile.png" alt="Profile-Icon" />
                  </div>
                  <div
                    className={Styles.linksGroup__bottom__container__logo__text}
                  >
                    <p style={{ fontSize: "14px", paddingBottom: "5px" }}>
                      Vreel
                    </p>
                    <p style={{ fontSize: "10px" }}>Collaborator - Pending</p>
                  </div>
                </div>
                <button className={Styles.linksGroup__bottom__container__cross}>
                  <img src="/assets/icons/cross_icon.svg" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdvancedLinksGroup;
