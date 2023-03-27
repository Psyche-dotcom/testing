import React from "react";
import Link from "next/link";
import Styles from "./PersonalInfo.module.scss";
import PersonalInfoFields from "./PersonalInfoFields";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";

import LogoBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import AccountSensitivity from "./AccountSensitivity";
import { FormikContainer } from "@formik/FormikContainer";

type Props = {};

const PersonalInfo = (props: Props) => {
  return (
    <FormikContainer>
      {(formik) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //   handleLogin(formik.values);
            }}
          >
            <div className={Styles.personalInfoContainer}>
              <div className={Styles.personalInfoContainer__title}>
                <span>Personal Information</span>
                <FActionsBtn
                  actions={() => {}}
                  bgColor="#61FF00"
                  padding="10px 24px"
                  title="Save"
                  borderRadius="8px"
                  color="#002116"
                />
              </div>

              <div className={Styles.personalInfoContainer__inputContainer}>
                <div
                  className={
                    Styles.personalInfoContainer__inputContainer__topText
                  }
                >
                  <Link href={"/"}>
                    <span className={Styles.linkText}>
                      www.vreel.page/vreel
                    </span>
                  </Link>
                  <CopyLinkBtn name="Copy Link" icon={true} />
                </div>

                <div
                  className={
                    Styles.personalInfoContainer__inputContainer__inputField
                  }
                >
                  <PersonalInfoFields />
                  <div
                    className={
                      Styles.personalInfoContainer__inputContainer__inputField__addLogoContainer
                    }
                  >
                    <div
                      className={
                        Styles.personalInfoContainer__inputContainer__inputField__addLogoContainer__logoContent
                      }
                    >
                      {/* <LogoBtn /> */}
                    </div>
                    <div>
                      <AccountSensitivity />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default PersonalInfo;
