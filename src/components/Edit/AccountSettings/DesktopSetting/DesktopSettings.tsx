import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Styles from "./DesktopSettings.module.scss";
import PersonalInfoFields from "../PersonalInfo/PersonalInfoFields";
import AccountCompletionStatus from "./childrens/AccountCompletionStatus/AccountCompletionStatus";
import AccountLoginInfo from "./childrens/AccountLoginInfo/AccountLoginInfo";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import AccountSensitivity from "../PersonalInfo/AccountSensitivity";
import { FormikContainer } from "@formik/FormikContainer";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@graphql/mutations";
import { dispatch } from "react-hot-toast/dist/core/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import useDebounce from "@hooks/useDebounce";

type Props = { data: any };
const AccountKeys = [
  "first_name",
  "last_name",
  "email",
  "prefix",
  "website",
  "suffix",
  "work_phone",
  "cell_phone",
  "home_phone",
  "job_title",
  "profile_picture",
  "company_name",
  "business_address",
  "home_address",
  "landing_page",
  "middle_initial",
  "self_portrait_image",
  "self_landscape_image",
  "linkedin_url",
  "note",
  "pages_ref",
  "pages",
  "v_email",
];
const DesktopSettings = ({ data }: Props) => {
  const [cookies] = useCookies(["userAuthToken"]);
  const [updateUser] = useMutation(UPDATE_USER);
  const [currentVals, setCurrentVals] = useState(data);
  const [editedFieldsStack, setEditedFieldsStack] = useState([]);
  const { editTrigger } = useSelector((state: RootState) => state.editorSlice);

  const debouncedStack = useDebounce(editedFieldsStack, 2000);

  const dispatch = useDispatch();

  function handleSubmit(values) {
    const fields = [];
    for (let [field, value] of Object.entries(values)) {
      if (field === "companyName") field = "company_name";
      if (field === "linkedinUrl") field = "linkedin_url";
      if (AccountKeys.includes(field)) {
        fields.push({ field, value });
      }
    }
    updateUser({
      variables: {
        token: cookies.userAuthToken,
        fields,
      },
    }).catch((err) => alert(err.message));
  }

  useEffect(() => {
    if (editTrigger !== 0) {
      // handleSubmit();
    }
  }, [editTrigger]);

  return (
    <FormikContainer initialValues={data}>
      {(formik) => {
        setCurrentVals(formik.values);
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //   handleLogin(formik.values);
            }}
          >
            <div className={Styles.desktop}>
              <div className={Styles.desktop__container}>
                <div className={Styles.desktop__container__usersLogo}>
                  <img src="/assets/icons/users.svg" alt="Users icons" />
                  <span>Vreel</span>
                </div>
                <div className={Styles.desktop__container__personalInfo}>
                  <div
                    className={
                      Styles.desktop__container__personalInfo__leftSides
                    }
                  >
                    <p>
                      Personal Information <br />
                      vCard
                    </p>
                    <PersonalInfoFields onSave={handleSubmit} />
                    <button onClick={handleSubmit}>Submit</button>
                  </div>

                  <div
                    className={
                      Styles.desktop__container__personalInfo__rightSides
                    }
                  >
                    {/* frist row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__firstRow
                      }
                    >
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__firstRow__fristColumn
                        }
                      >
                        <div>
                          <p>Share Your Vreel</p> <p>Login Here!</p>
                        </div>
                        <CopyLinkBtn name="Copy Link" icon={true} />
                      </div>

                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__firstRow__secondColumn
                        }
                      >
                        <img
                          src="/assets/images/female.png"
                          alt="profile Pic"
                        />
                        <Link href={"/"}>
                          <a>Change Profile Picture</a>
                        </Link>
                      </div>

                      <AccountSensitivity />
                    </div>

                    {/* second row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__secondRow
                      }
                    >
                      <h3>VREEL Account Completion Status</h3>
                      <AccountCompletionStatus />
                    </div>

                    {/* Third row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__thirdRow
                      }
                    >
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__thirdRow__firstColumn
                        }
                      >
                        <h4>Account Login Information</h4>

                        <AccountLoginInfo />
                      </div>
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__thirdRow__secondColumn
                        }
                      ></div>
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

export default DesktopSettings;
